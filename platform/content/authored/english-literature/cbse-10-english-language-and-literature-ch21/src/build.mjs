// Build CBSE 10 English Language and Literature ch21 "The Tale of Custard the Dragon". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch21/src/build.mjs
// LITERATURE RULE: the poem (in copyright) is never quoted or paraphrased line by line; only single words,
// names and the title appear. Students read the poem in First Flight. After build(), a short forbidden-phrase
// guard (ch18's src/guard.mjs; each entry 4 words or fewer) fails the build on any hit.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";
import { checkForbidden } from "../../cbse-10-english-language-and-literature-ch18/src/guard.mjs";

setUnit("cbse-10-english-language-and-literature-ch21", "english-literature");
await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const READ = "**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL's explanation; it does not reproduce the poem.";

// Short distinctive phrases of the poem that must never appear (reproduction guard; 4 words or fewer each).
const FORBID = [
  "white house", "black kitten", "gray mouse", "grey mouse", "yellow dog", "red wagon", "pet dragon",
  "realio trulio", "ink and blink", "sharp as mustard", "was a coward", "big sharp teeth", "spikes on top",
  "scales underneath", "chimney for a nose", "daggers on his toes", "barrel full of bears", "chased lions",
  "chase lions", "down the stairs", "tiger in a rage", "safe cage", "tickled him unmerciful", "rudely called",
  "cowardly dragon", "shook the house", "giggling for a mouse", "asked his age", "nasty sound",
  "in the winda", "pistol in his", "cutlass bright", "beard was black", "leg was wood", "meant no good", "in his teeth",
  "belinda paled", "terrified yelp", "trickled down", "strategically mouseholed", "up jumped custard",
  "snorting like an engine", "irons in a dungeon", "robin at a worm", "jangling squirm", "pocket flagon",
  "two bullets", "gobbled him", "every bit", "no one mourned", "pirate victim", "did gyrate", "ate the pyrate",
  "still lives", "keeps crying",
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
    ["Poet", "Ogden Nash (1902–1971), American poet"],
    ["Known for", "humorous light verse"],
    ["Trademark", "unusual rhymes, often made by inventing or misspelling words"],
  ],
  "Table of facts about Ogden Nash: an American poet, 1902 to 1971, known for humorous light verse and unusual rhymes made by inventing or misspelling words.",
);
const vCast = table(
  ["Character", "What it is", "Claims or reputation", "When the pirate comes"],
  [
    ["Belinda", "a girl", "very brave", "turns pale, screams for help"],
    ["Ink", "a kitten (black, like ink)", "hunts lions, it says", "slips away out of sight"],
    ["Blink", "a mouse", "hunts lions, it says", "dives into a mousehole"],
    ["Mustard", "a dog (yellow, sharp-tempered)", "as fierce as a tiger", "runs off yelping"],
    ["Custard", "a dragon", "a coward who wants a cage", "charges and swallows the pirate"],
  ],
  "Table of the characters: Belinda, a girl, claims to be very brave but screams; Ink the kitten and Blink the mouse claim to hunt lions but hide; Mustard the dog claims to be fierce but runs off; Custard the dragon is called a coward but charges and swallows the pirate.",
);
const vGlance = table(
  ["Feature", "The Tale of Custard the Dragon"],
  [
    ["Form", "a comic ballad in four-line stanzas, rhyming aabb"],
    ["Story", "a timid dragon kept as a pet saves his boastful household from a pirate"],
    ["Ending", "circular: life, and the boasting, return to how they were"],
    ["Main devices", "simile, onomatopoeia, invented words, irony, repetition"],
    ["Tone", "light-hearted, playful, gently ironic"],
  ],
  "Table of the poem at a glance: a comic ballad in four-line stanzas rhyming a a b b, the story of a timid dragon who saves his boastful household from a pirate, a circular ending, devices including simile, onomatopoeia, invented words, irony and repetition, and a light-hearted tone.",
);
const vJourney = flow("LR", ["A cheerful household; Custard mocked", "Boasts of courage", "A pirate climbs in", "Everyone flees except Custard", "Custard swallows the pirate", "Back to normal: boasts and a cage"], "Flow of the poem: a cheerful household in which Custard is mocked, boasts of courage, a pirate climbs in, everyone flees except Custard, Custard swallows the pirate, and life returns to normal with the boasts and Custard's wish for a cage.", "The story in six steps (SOYL summary).");
const vDevices = table(
  ["Device", "Where in the poem (described)", "A SOYL example of the device"],
  [
    ["Simile", "Belinda's courage, Custard's snort, his charge at the pirate", "He ran like a firecracker with its fuse lit."],
    ["Onomatopoeia", "the animals' cries; clanks and clatters of the tail", "The pressure cooker went whoosh and hiss."],
    ["Invented or misspelt words", "words bent to rhyme with names", "My cat Rani is a bit of a meowny."],
    ["Irony", "the mocked coward is the only hero", "The boy who boasted loudest fainted at the injection."],
    ["Repetition", "the closing stanzas echo the opening", "Monday again: same bus, same jokes, same rain."],
    ["Rhyme (aabb)", "each stanza is two rhyming couplets", "The cat sat on the mat. / It wore a paper hat."],
  ],
  "Table of devices in the poem, described, each with a SOYL example: simile, onomatopoeia, invented or misspelt words, irony, repetition and rhyme in couplets.",
);
const vWords = table(
  ["Word", "Meaning"],
  [
    ["cutlass", "a short, curved sword used by sailors and pirates"],
    ["flagon", "a flask or bottle for drink"],
    ["grog", "a strong drink, often rum mixed with water"],
    ["gyrate", "move round and round in circles"],
    ["winda", "window, misspelt to rhyme with Belinda"],
    ["realio", "an invented, childlike form of *really*"],
    ["Percival", "a grand knight's name, used to mock Custard"],
  ],
  "Table of word meanings: cutlass, flagon, grog, gyrate, winda, realio and Percival.",
  "Single words from the poem with their meanings.",
);
const vShortPlan = flow("LR", ["Key word of the question", "Point in one sentence", "Event in your own words", "What it shows about courage"], "Flow for a forty to fifty word answer: find the key word, state the point, describe the event in your own words, and explain what it shows about courage.");

// ---------------------------------------------------------------- deck
const D = deck({
  title: "The Tale of Custard the Dragon — Ogden Nash",
  goals: [
    "Retell the story of the poem stanza by stanza in your own words",
    "Explain the irony of the dragon thought a coward who proves brave",
    "Identify ballad form, humour, rhyme and repetition",
    "Explain what the poem says about true courage",
    "Answer extract-based and 40–50 word questions on the poem",
  ],
  slides: [
    sl("title", "The Tale of Custard the Dragon — Ogden Nash", {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: "Welcome. Today's poem is The Tale of Custard the Dragon by Ogden Nash. It is a funny story in verse about a dragon everyone calls a coward, until a pirate arrives. Please read it in First Flight now, aloud, twice. It is great fun to read aloud. We will not repeat its lines here. Instead we will follow the story, the irony and the humour.",
    }),
    sl("concept", "How to read this poem", {
      bl: [
        "Read it aloud twice from *First Flight*; enjoy the rhythm and the rhymes.",
        "Ask: who boasts? who is mocked? who acts when danger comes?",
        "Then ask: what does the ending tell us about courage?",
        "In answers, explain in your own words; never copy lines.",
      ],
      n: "This poem has a strong beat and lots of rhymes, so read it aloud and enjoy it. As you read, ask who boasts, who is mocked, and who actually acts when danger comes. Then ask what the ending tells us about courage. In the exam, explain in your own words. Copying lines earns no marks, however catchy they are.",
    }),
    sl("concept", "The poet: Ogden Nash", {
      v: vPoet,
      n: "Ogden Nash was an American poet who lived from nineteen oh two to nineteen seventy-one. He is famous for humorous light verse and for very unusual rhymes. When no real word would rhyme, he simply invented one or misspelled an ordinary word. You will find several of his invented words in this poem.",
    }),
    sl("concept", "The poem at a glance", {
      v: vGlance,
      n: "Here is the poem at a glance. It is a comic ballad in four-line stanzas, each made of two rhyming couplets. A timid dragon kept as a pet saves his boastful household from a pirate. The ending is circular: everything returns to how it was. The devices include simile, onomatopoeia, invented words and irony. The tone is light and playful.",
    }),
    sl("concept", "The household", {
      v: vCast,
      b: "In SOYL's words: Belinda lives in a small, cheerful house with a kitten called Ink, a mouse called Blink, a dog called Mustard and a dragon called Custard. Everything is small and brightly coloured. Custard looks terrifying, with teeth, spikes, scales and claws, but he is thought to be a coward.",
      n: "Meet the household. Belinda lives with a kitten called Ink, a mouse called Blink, a dog called Mustard and a dragon called Custard. The names fit: Ink is black, Mustard is yellow. Custard looks terrifying, with teeth, spikes, scales and claws. His mouth is compared to a fireplace and his nose to a chimney. Yet everyone thinks he is a coward.",
    }),
    sl("concept", "Boasts and teasing", {
      b: "In SOYL's words: the others think they are very brave. Belinda's courage is compared to a container packed with bears, Mustard's to a furious tiger, and the kitten and the mouse claim to hunt lions. Custard keeps asking for a secure cage, so they tickle him, call him Percival and laugh at him.",
      n: "Now the boasting. Belinda's courage is compared to a container packed with bears. Mustard's is compared to a furious tiger. The kitten and the mouse claim to hunt lions. Custard, meanwhile, keeps asking for a secure cage. So the others tease him. Belinda tickles him without mercy, they call him Percival, and they laugh at him.",
    }),
    sl("check", "Check: the hero", {
      chk: "mc_hero",
      n: "Your turn. When the pirate comes, who actually saves the household? Choose the best answer.",
    }),
    sl("concept", "The pirate arrives", {
      b: "In SOYL's words: a frightening noise, and a pirate climbs in through the window, with two pistols, a curved sword between his teeth, a black beard and a wooden leg. Belinda turns pale and screams, Mustard runs off yelping, the kitten slips away and the mouse dives into a hole.",
      n: "Then a frightening noise. A pirate climbs in through the window. He has two pistols, a curved sword between his teeth, a black beard and a wooden leg. And the brave household? Belinda turns pale and screams for help. Mustard runs off yelping. The kitten slips away. The mouse dives into a hole.",
    }),
    sl("concept", "Custard the hero", {
      b: "In SOYL's words: Custard leaps up, snorting like a steam machine and clanging his tail like chains in a prison, and charges at the pirate as a bird goes for a worm. The pirate gulps from his flask and fires twice, but misses. Custard swallows him whole.",
      n: "Now the surprise. Custard leaps up, snorting like a steam machine, clanging his tail like chains in a prison. He charges at the pirate the way a bird goes for a worm. The pirate gulps a drink from his flask and fires twice, but misses. And Custard swallows him whole. The coward is the only hero.",
    }),
    sl("diagram", "The story in six steps", {
      v: vJourney,
      n: "Here is the whole story as a flow. A cheerful household where Custard is mocked. Boasts of courage. A pirate climbs in. Everyone flees except Custard. Custard swallows the pirate. And then, back to normal: the same boasts and the same wish for a cage. Notice how the end loops back to the beginning.",
    }),
    sl("two-column", "Talk and action", {
      cols: [
        "**What they say**\n\n- Belinda: hugely brave\n- Mustard: fierce as a tiger\n- kitten and mouse: lion-hunters\n- Custard: wants a cage",
        "**What they do**\n\n- Belinda screams\n- Mustard runs off\n- they hide\n- Custard fights",
      ],
      n: "Put what they say beside what they do. Belinda says she is hugely brave, and she screams. Mustard says he is fierce as a tiger, and he runs. The kitten and the mouse say they hunt lions, and they hide. Custard says he wants a cage, and he fights. That reversal is the heart of the poem.",
    }),
    sl("check", "Check: assertion and reason", {
      chk: "ar_custard",
      n: "Check yourself with an assertion and reason. Are both statements true? And does the second explain why the first happens?",
    }),
    sl("concept", "The ending and its irony", {
      b: "In SOYL's words: everyone hugs and celebrates Custard and nobody mourns the pirate. Then the last stanzas return almost exactly to the opening: the others again describe themselves as brave, and Custard again asks for his secure cage. Nobody admits what happened.",
      n: "After the battle, Belinda hugs Custard, Mustard licks him, and the kitten and mouse dance round him. Nobody mourns the pirate. Then the final stanzas return almost exactly to the opening. The others again describe themselves as brave, and Custard again asks for his cage. Nobody admits what happened. That is gentle irony.",
    }),
    sl("concept", "Themes and devices", {
      v: vDevices,
      bl: [
        "**True courage:** shown in action, not in boasts.",
        "**Appearances deceive:** the fearsome-looking coward is the hero; the boasters are not.",
        "**Modesty:** Custard never brags; his courage goes unrecognised.",
      ],
      n: "The themes: true courage shows in action, not in boasts. Appearances deceive. And modest heroes are often unrecognised. Now the devices, with our own examples. Similes for courage and for the charge. Onomatopoeia for cries and clanks. Invented words for comic rhymes. Irony at the centre. Repetition in the ending. And couplet rhyme throughout.",
    }),
    sl("example", "Worked point: a circular ending", {
      b: "Why does the poem end almost where it began?",
      bl: [
        "**Clue 1:** the last stanzas nearly repeat the first ones.",
        "**Clue 2:** the boasters still boast; Custard still wants his cage.",
        "**Meaning:** nothing has changed in how they see themselves or him.",
        "**Why it matters:** the irony is sharper: the real hero stays modest and unpraised.",
      ],
      n: "Here is a worked point. Why does the poem end almost where it began? The last stanzas nearly repeat the opening. The boasters still boast and Custard still wants his cage. So nothing has changed in how they see themselves or him. That makes the irony sharper. The real hero stays modest and unpraised.",
    }),
    sl("concept", "Tone", {
      b: "Light-hearted, playful and comic throughout, with gentle irony. Even the pirate's fate is told like a cartoon.",
      n: "Listen to the tone. It is light-hearted, playful and comic from beginning to end. Even dangerous moments, the pirate's attack and his swallowing, are told like a cartoon, with funny sounds and made-up words. Under the fun is gentle irony, aimed at the boasters. The poem laughs at them, and with Custard.",
    }),
    sl("concept", "Word meanings", {
      v: vWords,
      n: "A few words to know. Cutlass, a short curved sword. Flagon, a flask or bottle. Grog, a strong drink, often rum and water. Gyrate, move round in circles. Winda, the poet's misspelling of window, to rhyme with Belinda. Realio, an invented form of really. And Percival, a grand knight's name, used to mock Custard.",
    }),
    sl("check", "Check: the form", {
      chk: "fb_ballad",
      n: "Quick check. What kind of poem tells a story in short, rhythmic stanzas, and how many couplets make each stanza here? Complete both blanks.",
    }),
    sl("example", "Worked example: a 40–50 word answer", {
      b: "*Question:* Why is the poem's central situation ironic?",
      v: vShortPlan,
      bl: [
        "**Point:** the supposed coward is the only brave one.",
        "**Event (own words):** the boasters flee; Custard fights the pirate.",
        "**What it shows:** courage is proved in action.",
        "**Model (45 words):** *Everyone expects Custard to be useless because he begs for a cage, while the others call themselves fearless. When the pirate breaks in, the boasters scatter and only Custard attacks. This reversal is ironic, and it shows that courage is proved by deeds, not by boasting.*",
      ],
      n: "Here is how to build a three mark answer. Find the key word: ironic. State the point: the supposed coward is the only brave one. Give the event in your own words: the boasters flee and Custard fights. Say what it shows: courage is proved in action. The model is forty-five words and copies nothing.",
    }),
    sl("check", "Check: simile", {
      chk: "fb_simile",
      n: "One more. Custard's snort is compared to a machine, using like. What is that device called? Fill in the blank.",
    }),
    sl("summary", "Summary", {
      bl: [
        "Belinda, Ink, Blink and Mustard boast of their courage and mock Custard, who wants a cage.",
        "A pirate climbs in; the boasters scream, flee or hide.",
        "Custard charges and swallows the pirate.",
        "Life returns to normal: boasts and a cage, and nobody admits the truth.",
        "Message: true courage is in action. Read the poem in *First Flight*.",
      ],
      v: vJourney,
      n: "Let us sum up. Belinda and her pets boast of their courage and mock Custard, who wants a cage. A pirate climbs in, and the boasters scream, flee or hide. Custard charges and swallows the pirate. Then life returns to normal, and nobody admits the truth. The message: true courage is shown in action.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: [
        "Never write out the poem's lines; retell the events in your own words.",
        "Explain the irony: the mocked coward is the only hero, and nothing changes afterwards.",
        "Describe the similes; do not quote them.",
        "40–50 word answers: point + event in own words + what it shows.",
        "Common slips: saying Mustard fights; that the others thank Custard at the end; that the poem is free verse.",
      ],
      n: "Exam tips. Never write out the lines; retell the events in your own words. Explain the irony clearly. Describe the similes rather than quoting them. Keep three mark answers to point, event and meaning. And avoid the slips: Mustard runs away, nobody thanks Custard at the end, and the poem rhymes in couplets.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "The Tale of Custard the Dragon — study notes",
  sections: [
    {
      h: "1. The poet and the poem",
      t: 1,
      b: `${READ}\n\n**Ogden Nash** (1902–1971) was an American poet famous for humorous light verse and for unusual rhymes, often made by inventing or misspelling words. *The Tale of Custard the Dragon* is a comic ballad about a dragon everyone calls a coward.`,
      v: vPoet,
    },
    {
      h: "2. What happens (SOYL summary)",
      t: 1,
      b: "**The household:** Belinda lives in a small, cheerful house with a kitten (Ink), a mouse (Blink), a dog (Mustard) and a dragon (Custard). Custard looks fearsome but is thought a coward.\n\n**Boasts and teasing:** the others claim great courage; Custard keeps asking for a secure cage, so they tickle him, call him Percival and laugh.\n\n**The pirate:** he climbs in through the window, armed with pistols and a curved sword, bearded and with a wooden leg. Belinda screams; the pets flee or hide.\n\n**The hero:** Custard charges; the pirate fires twice and misses; Custard swallows him.\n\n**The ending:** a brief celebration, then life, and the boasting, return to how they were; Custard still wants his cage.",
      v: vJourney,
    },
    {
      h: "3. Themes and message",
      t: 2,
      b: "- **True courage:** shown in action, not in words; it can exist alongside fear.\n- **Appearances deceive:** the fearsome-looking dragon is gentle; the small boasters are not brave.\n- **Boasting vs modesty:** Custard never brags; the boasters never admit the truth.\n- **Unrecognised heroism:** the real hero goes unpraised.",
      v: vCast,
    },
    {
      h: "4. Form, devices and humour",
      t: 3,
      b: "**Form:** a comic ballad in four-line stanzas, each two rhyming couplets (aabb), with a strong, bouncy rhythm.\n\n**Devices:** similes (the boasters' courage; Custard's snort and charge); onomatopoeia (animal cries, clanks and clatters); invented or misspelt words to force rhymes; irony (the coward as hero; the unchanged ending); repetition (the closing stanzas echo the opening).\n\n**Humour:** an absurd situation (a dragon kept as a pet, a cartoon pirate), playful language and a cheerful treatment of violence.",
      v: vDevices,
      terms: [
        ["Ballad", "A poem that tells a story in short, rhythmic stanzas."],
        ["Onomatopoeia", "A word that imitates a sound."],
        ["Irony", "A contrast between what is expected and what happens."],
      ],
    },
    {
      h: "5. Tone",
      t: 3,
      b: "Light-hearted, playful and comic, with gentle irony aimed at the boasters. Violence is told like a cartoon.",
    },
    {
      h: "6. Word meanings",
      t: 4,
      b: "Single words from the poem with their meanings. Nash also invents *trulio*, a childlike form of *truly*, and misspells *pirate* as *pyrate* and *window* as *winda* to make rhymes.",
      v: vWords,
    },
    {
      h: "7. Answering exam questions",
      t: 4,
      b: "**Extract-based (5 marks):** the board prints the poem's lines; SOYL practice uses commentary passages instead. Expect questions on the characters, Custard's appearance, the pirate, the reactions, the irony and the devices.\n\n**Short answers (3 marks, 40–50 words):** point + event in your own words + what it shows about courage.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.",
      v: vShortPlan,
    },
  ],
  tips: "**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out lines and similes instead of describing them.\n2. Saying Mustard or Belinda fights the pirate.\n3. Saying the others praise Custard at the end.\n4. Missing the irony of the circular ending.\n5. Calling the poem free verse.\n\n**Remember:** read the poem in your textbook, *First Flight*.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Who wrote *The Tale of Custard the Dragon*?", "Ogden Nash (1902–1971), American poet.", "fact", 1],
  ["What is Ogden Nash known for?", "Humorous light verse and unusual, invented rhymes.", "fact", 1],
  ["Who are Ink, Blink and Mustard?", "A kitten, a mouse and a dog.", "fact", 1],
  ["Who is Custard?", "Belinda's dragon, thought to be a coward.", "fact", 1],
  ["What does Custard keep asking for?", "A secure cage.", "concept", 1],
  ["How do the others tease Custard?", "Tickling, the nickname Percival, laughter.", "concept", 1],
  ["Describe the pirate", "Two pistols, a sword between his teeth, a black beard, a wooden leg.", "concept", 1],
  ["How do the others react to the pirate?", "Belinda screams; Mustard runs; the kitten and mouse hide.", "concept", 1],
  ["What does Custard do?", "Charges and swallows the pirate whole.", "concept", 1],
  ["Central idea", "True courage is shown in action, not in boasts.", "concept", 2],
  ["The central irony", "The mocked coward is the only hero.", "concept", 2],
  ["How does the poem end?", "Back to normal: the same boasts, and Custard still wants his cage.", "concept", 2],
  ["Lesson about appearances", "Looks and boasts do not show what someone is really like.", "concept", 2],
  ["Form", "Comic ballad; four-line stanzas rhyming aabb.", "fact", 3],
  ["Similes in the poem (described)", "Courage like a container of bears; a snort like a machine; a charge like a bird at a worm.", "concept", 3],
  ["Onomatopoeia in the poem", "Animal cries; clanks and clatters of Custard's tail.", "concept", 3],
  ["Why invented words?", "To force comic rhymes and keep the tone playful.", "concept", 3],
  ["Tone", "Light-hearted, playful, gently ironic.", "concept", 3],
  ["*cutlass*", "a short, curved sword", "definition", 4],
  ["*flagon*", "a flask or bottle for drink", "definition", 4],
  ["*grog*", "a strong drink, often rum and water", "definition", 4],
  ["*gyrate*", "move round and round in circles", "definition", 4],
  ["*winda*", "window, misspelt to rhyme with Belinda", "definition", 4],
  ["*Percival*", "a grand knight's name, used to mock Custard", "definition", 4],
  ["Plan for a 40–50 word answer", "Point + event in own words + what it shows about courage.", "exam-tip", 4],
  ["Most common slip", "Saying the others praise Custard at the end; they go back to boasting.", "exam-tip", 4],
  ["Second common slip", "Calling the poem free verse; it rhymes aabb.", "exam-tip", 4],
  ["Should you quote the similes?", "No. Describe what is compared, in your own words.", "exam-tip", 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-short",
  title: "Chapter test (short) — The Tale of Custard the Dragon",
  duration: 40,
  sections: [
    { id: "A", title: "Section A — Extract-based (5 marks)", instr: "Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)", items: ["src_household"] },
    { id: "B", title: "Section B — Short answers (3 marks each)", instr: "Answer any three of four in 40–50 words.", items: [{ attempt: 3, keys: ["sa_pets", "sa_appearance", "sa_mocked", "sa_pirate"] }] },
    { id: "C", title: "Section C — Long answer (6 marks)", instr: "Answer any one in 100–120 words.", items: [{ attempt: 1, keys: ["la_courage", "la_humour_irony"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-long",
  title: "Chapter test (long) — The Tale of Custard the Dragon",
  duration: 90,
  sections: [
    { id: "A", title: "Section A — Extract-based (2 × 5 marks)", instr: "In each pair, answer one passage. (Passages are SOYL commentary.)", items: [{ attempt: 1, keys: ["src_appearance", "src_teasing"] }, { attempt: 1, keys: ["src_pirate", "src_hero"] }] },
    { id: "B", title: "Section B — Short answers (2 marks each)", instr: "Answer any three of four in 30–40 words.", items: [{ attempt: 3, keys: ["sb_cage", "sb_percival", "sb_pirate_fight", "sb_coinages"] }] },
    { id: "C", title: "Section C — Short answers (3 marks each)", instr: "Answer any four of five in 40–50 words.", items: [{ attempt: 4, keys: ["sa_courage", "sa_ending", "sa_humour", "sa_ballad", "sa_devices"] }] },
    { id: "D", title: "Section D — Long answers (6 marks each)", instr: "Answer one question from each pair in 100–120 words.", items: [{ attempt: 1, keys: ["la_custard_diary", "la_appearance"] }, { attempt: 1, keys: ["la_report", "la_relevance"] }] },
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
    literature_rule: "poem in copyright: no line or phrase reproduced (only the title, the characters' names and single words: realio, cutlass, flagon, trulio, grog, gyrate, winda, pyrate, Percival); the story retold by event in SOYL words, not paraphrased line by line; similes described, never quoted; the poem's paired coinage never printed as a pair; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem; forbidden-phrase guard (ch18 src/guard.mjs) run after the build",
    accuracy: "form (ballad, quatrains rhyming aabb), the characters, the reactions to the pirate and the circular ending checked; stanza count left out (see README)",
    re_solve: "author verifier pass: every item re-answered from its stem",
    gate: "npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter",
  },
});
checkForbidden(DIR, FORBID);
