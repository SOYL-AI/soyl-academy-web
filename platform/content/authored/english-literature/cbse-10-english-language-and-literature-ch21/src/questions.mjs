// CBSE 10 English Language and Literature, ch21 "The Tale of Custard the Dragon" (Ogden Nash) — question bank.
// LITERATURE RULE (CONTEXT §8): the poem is in copyright. No line or phrase of it is reproduced; only the
// title, the characters' names and single words (realio, trulio, cutlass, flagon, grog, gyrate, winda,
// pyrate, mouseholed, Percival) appear, never side by side as in the poem. The story is retold by event, the
// similes are described, not quoted, and the name pair is always given as "Blink and Ink". Passages are SOYL
// commentary (passage_origin: soyl-commentary). build.mjs runs a short forbidden-phrase guard (ch18's guard).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";

const NOTE = "*(This passage is SOYL's commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*";
const SRC_STEM = `Read the commentary on Ogden Nash's *The Tale of Custard the Dragon* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [["Relevant point about the poem", 1], ["Explanation or interpretation linked to the question", 1], ["Expression and accuracy within 40–50 words", 1]];
const SCHEME2 = [["Correct point about the poem", 1], ["Explanation in own words within 30–40 words", 1]];
const LONG_SCHEME = [["Content: accurate points about the poem", 3], ["Interpretation / extrapolation: a clear, supported view", 1], ["Organisation and expression; within 100–120 words", 2]];

// ================================================================ extract-based (SOYL commentary)
Q("src_household", source({
  t: [1, 2], d: 2, c: "understanding", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Nash opens like a nursery tale. A girl called Belinda shares a small house with a household of pets: a kitten named Ink, a mouse named Blink, a dog named Mustard and, most surprisingly, a dragon named Custard. Every pet, and even the family's toy cart, is described as small and given a bright colour, which makes the scene feel cosy and cheerful. The names are clever too. Ink is black, Mustard is yellow and sharp-tempered, and Custard, named after a soft, wobbly pudding, is the one pet everyone expects to be timid.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In Ogden Nash's ballad, what is the name of Belinda's dragon?", opts: ["Custard", "Mustard", "Blink", "Ink"], sol: "The dragon is Custard." })),
    child("b", mcq({ t: 1, d: 1, c: "recall", stem: "Which pet in *The Tale of Custard the Dragon* is called Blink?", opts: ["the mouse", "the kitten", "the dog", "the dragon"], sol: "Blink is the mouse." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says Custard is named after a soft, wobbly ___.", acc: [["pudding", "dessert"]], sol: "He is named after a soft **pudding**." })),
    child("d", short({ t: 3, d: 3, c: "analysis", marks: 1, stem: "Why do Ogden Nash's pet names suit the animals, according to the commentary?", model: "They match colour or nature: Ink is black, Mustard yellow and sharp, Custard soft and timid.", sol: "Names reflect colour and character.", scheme: [["Names match colour or character", 1]] })),
    child("e", mcq({ t: 3, d: 2, c: "understanding", stem: "What effect do the small, brightly coloured things in Belinda's house have, according to the commentary?", opts: ["They make the scene cosy and cheerful.", "They make the scene frightening.", "They make the house seem huge.", "They show that Belinda is poor."], sol: "Small, bright details create a cheerful, childlike scene." })),
  ],
  sol: "Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.",
}));
Q("src_appearance", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "On paper, Custard should be the bravest pet of all. Nash gives him everything a fearsome dragon needs: rows of pointed teeth, spikes along his back, a scaly underside, a mouth compared to a fireplace, a nose compared to a chimney, and claws as sharp as knives. Yet this terrifying body houses a nervous heart. While the others boast of their courage, Custard begs for a secure cage to hide in. The joke depends on the gap between how he looks and how he behaves, and that gap is the seed of the whole story.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "In *The Tale of Custard the Dragon*, what does Custard ask for?", opts: ["a secure cage to hide in", "a bigger house", "more food", "a sword"], sol: "He begs for a secure cage." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "In Ogden Nash's ballad, Custard's mouth is compared to…", opts: ["a fireplace", "a cave", "a drum", "a door"], sol: "His mouth is likened to a fireplace." })),
    child("c", fb({ t: 3, d: 2, c: "understanding", stem: "The commentary says Custard's terrifying body houses a ___ heart.", acc: [["nervous", "timid", "fearful"]], sol: "He has a **nervous** heart." })),
    child("d", short({ t: 2, d: 4, c: "analysis", marks: 1, stem: "What gap does the joke about Custard depend on, according to the commentary?", model: "The gap between his fearsome appearance and his timid behaviour.", sol: "Appearance versus behaviour.", scheme: [["Fierce looks vs timid behaviour", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "What lesson does Custard's appearance in Ogden Nash's ballad prepare us for?", opts: ["Looks do not show what someone is really like.", "Dragons are always dangerous.", "Pets should live in cages.", "Spikes protect a dragon."], sol: "Appearance and character can differ." })),
  ],
  sol: "Describe his appearance in your own words, then explain the contrast.",
}));
Q("src_teasing", source({
  t: [2, 1], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The rest of the household think very highly of themselves. Belinda's courage is compared to a container packed with bears, Mustard's to a furious tiger, and the kitten and the mouse claim to hunt lions. None of this is ever tested. Instead, they spend their time mocking Custard. Belinda tickles him without mercy, the pets give him a silly, grand-sounding nickname, Percival, and they all laugh at him from their toy cart. The more they boast and tease, the bigger the surprise that is coming.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "In Ogden Nash's ballad, what nickname do the pets use to mock Custard?", opts: ["Percival", "Pirate", "Puddle", "Prince"], sol: "They mock him as Percival." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "Belinda's courage in *The Tale of Custard the Dragon* is compared to a container packed with…", opts: ["bears", "lions", "wolves", "snakes"], sol: "Her bravery is likened to a container packed with bears." })),
    child("c", fb({ t: 2, d: 2, c: "understanding", stem: "The commentary says the boasting of Belinda and her pets is never ___.", acc: [["tested"]], sol: "Their bravery is never **tested**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "Why does the commentary say the boasting in Ogden Nash's ballad makes the coming surprise bigger?", model: "The more they claim courage, the more striking it is when they flee and Custard fights.", sol: "Boasting sets up ironic reversal.", scheme: [["Boasting sets up the reversal", 1]] })),
    child("e", mcq({ t: 2, d: 3, c: "analysis", stem: "What do Belinda and the pets do instead of proving their courage in *The Tale of Custard the Dragon*?", opts: ["They mock Custard.", "They train for battle.", "They guard the house.", "They hunt for pirates."], sol: "They spend their time teasing him." })),
  ],
  sol: "Link the boasting and teasing to the irony that follows.",
}));
Q("src_pirate", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Suddenly an alarming noise interrupts the fun. A pirate is climbing in through the window, and Nash even bends the spelling of the word for window to keep his rhyme. The pirate is a comic-book villain: two pistols, a curved sword gripped between his teeth, a black beard and a wooden leg. The brave household falls apart at once. Belinda turns pale and screams for help, Mustard runs off yelping, the kitten slips away out of sight, and the mouse vanishes into a hole in the wall.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "How does the pirate enter Belinda's house in Ogden Nash's ballad?", opts: ["through the window", "through the front door", "down the chimney", "through the cellar"], sol: "He climbs in through the window." })),
    child("b", mcq({ t: 1, d: 2, c: "understanding", stem: "What does the pirate in *The Tale of Custard the Dragon* hold between his teeth?", opts: ["a curved sword", "a pistol", "a key", "a rope"], sol: "He grips a cutlass, a curved sword, between his teeth." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "Nash bends the spelling of *window* into *___* to keep his rhyme with Belinda.", acc: [["winda"]], sol: "He writes **winda**." })),
    child("d", short({ t: 2, d: 3, c: "analysis", marks: 1, stem: "What does the household's reaction to the pirate reveal in Ogden Nash's ballad?", model: "Their earlier boasts were empty; faced with real danger, they all flee or hide.", sol: "Boasts exposed as hollow.", scheme: [["Their boasted courage was empty", 1]] })),
    child("e", mcq({ t: 1, d: 2, c: "understanding", stem: "What does Mustard do when the pirate appears in *The Tale of Custard the Dragon*?", opts: ["runs off yelping", "attacks the pirate", "barks bravely", "hides behind Custard"], sol: "Mustard flees with a frightened yelp." })),
  ],
  sol: "Describe the pirate, then each character's reaction, in your own words.",
}));
Q("src_hero", source({
  t: [1, 2], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Then the timid dragon does what nobody expected. Custard leaps up, snorting like a steam machine, and his tail clangs like chains in a prison. With a great clatter he charges at the pirate the way a bird goes for a worm. The pirate stares, takes a gulp from a flask he carries, and fires twice, but misses. Custard swallows him whole. Nash describes this violence so cheerfully that it feels like a cartoon, not a horror story. The coward has become the only hero in the house.",
  parts: [
    child("a", mcq({ t: 1, d: 1, c: "recall", stem: "What does Custard do to the pirate in Ogden Nash's ballad?", opts: ["swallows him whole", "chases him away", "ties him up", "makes friends with him"], sol: "Custard eats the pirate." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "Custard's attack on the pirate in *The Tale of Custard the Dragon* is compared to a bird going for…", opts: ["a worm", "a fish", "a seed", "a nest"], sol: "He goes at the pirate as a robin goes for a worm." })),
    child("c", fb({ t: 1, d: 2, c: "understanding", stem: "The commentary says the pirate fires twice but ___.", acc: [["misses"]], sol: "His shots **miss**: he **misses**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "Why does Custard's attack in Ogden Nash's ballad feel like a cartoon rather than a horror story?", model: "Nash tells it cheerfully, with comic sounds and similes, so the violence is funny, not frightening.", sol: "Comic tone softens the violence.", scheme: [["Cheerful, comic telling", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "Which device is used when Custard's snort is compared to a steam machine?", opts: ["simile", "pun", "oxymoron", "alliteration"], sol: "A comparison with like is a simile." })),
  ],
  sol: "Explain Custard's sudden courage and the comic way it is told.",
}));
Q("src_ending", source({
  t: [2, 3], d: 4, c: "evaluation", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "Afterwards Belinda hugs Custard, Mustard licks him, nobody feels sorry for the pirate, and the kitten and the mouse dance in circles around the dragon. Then the final stanzas return almost exactly to the poem's opening. Life goes back to normal. The others once again describe themselves as tremendously brave, and Custard once again asks for his secure cage. Nobody admits what really happened. The ending is gently ironic: true courage goes unrecognised, the boasters keep boasting, and the real hero stays modest.",
  parts: [
    child("a", mcq({ t: 1, d: 2, c: "understanding", stem: "How do Belinda and the pets react after Custard defeats the pirate in Ogden Nash's ballad?", opts: ["They hug, lick and dance around him.", "They punish him.", "They run away from him.", "They call the police."], sol: "They celebrate him, for a moment." })),
    child("b", mcq({ t: 3, d: 3, c: "analysis", stem: "What is ironic about the ending of *The Tale of Custard the Dragon*?", opts: ["The boasters still claim to be brave and Custard still asks for a cage.", "Custard becomes the boldest boaster.", "The pirate returns as a friend.", "Belinda moves to a new house."], sol: "Nothing changes in how they talk, despite what happened." })),
    child("c", fb({ t: 4, d: 2, c: "understanding", stem: "To dance in circles is to ___, a word Nash uses for the kitten and mouse's celebration.", acc: [["gyrate"]], sol: "They **gyrate**." })),
    child("d", short({ t: 2, d: 4, c: "evaluation", marks: 1, stem: "What does the ending of Ogden Nash's ballad suggest about true courage?", model: "Real courage is often modest and unrecognised, while boasters keep their reputation.", sol: "Modest courage goes unrecognised.", scheme: [["True courage is modest and unrecognised", 1]] })),
    child("e", mcq({ t: 3, d: 3, c: "analysis", stem: "How do the final stanzas of *The Tale of Custard the Dragon* relate to its opening?", opts: ["They return almost exactly to it.", "They contradict it completely.", "They introduce new characters.", "They are written in prose."], sol: "The circular ending echoes the opening." })),
  ],
  sol: "Explain the circular ending and its irony.",
}));
Q("src_form", source({
  t: [3, 4], d: 3, c: "analysis", origin: "soyl-commentary",
  stem: SRC_STEM,
  passage: "The poem is a ballad: it tells a story in short stanzas of four lines, using simple language and a strong beat that makes it easy to read aloud. Each stanza is built from two rhyming couplets, so the rhyme scheme is aabb. Nash, famous for his comic verse, delights in silly sounds: cat and mouse noises, clanks and clatters, and words he simply makes up or misspells to force a rhyme. All this keeps the tone light. Even the swallowing of a villain becomes something to giggle at rather than fear.",
  parts: [
    child("a", fb({ t: 3, d: 1, c: "recall", stem: "A story told in short, rhythmic stanzas, like Ogden Nash's tale of Custard, is called a ___.", acc: [["ballad"]], sol: "It is a **ballad**." })),
    child("b", mcq({ t: 3, d: 2, c: "understanding", stem: "What is the rhyme scheme of each stanza of *The Tale of Custard the Dragon*?", opts: ["aabb", "abab", "abcb", "abba"], sol: "Two rhyming couplets: aabb." })),
    child("c", mcq({ t: 3, d: 2, c: "understanding", stem: "Animal noises and clanking sounds in Ogden Nash's ballad are examples of…", opts: ["onomatopoeia", "metaphor", "personification", "hyperbole"], sol: "Words that imitate sounds are onomatopoeia." })),
    child("d", short({ t: 3, d: 4, c: "analysis", marks: 1, stem: "Why does Nash invent or misspell words in *The Tale of Custard the Dragon*?", model: "To force comic rhymes and keep the tone light and playful.", sol: "Comic rhymes, light tone.", scheme: [["For comic rhymes / light tone", 1]] })),
    child("e", mcq({ t: 4, d: 2, c: "understanding", stem: "What does the commentary say Ogden Nash was famous for?", opts: ["comic verse", "war poetry", "religious hymns", "tragic plays"], sol: "Nash was known for humorous, light verse." })),
  ],
  sol: "For form questions, name the form, give the rhyme scheme and link the style to the tone.",
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q("sa_pets", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "Who lives with Belinda in Ogden Nash's ballad, and how is each described? Answer in 40–50 words.",
  model: "Belinda lives with four pets. Ink is a kitten as black as its name and Blink is a mouse. Mustard, a dog, is yellow and sharp-tempered. Custard is a dragon who looks terrifying but is thought to be a coward. Everything in their small house is bright and cheerful.",
  sol: "Each pet named with its kind and a detail + the overall picture.",
}));
Q("sa_appearance", short({
  ...SA3, t: [1, 3], d: 3, c: "analysis",
  stem: "Describe Custard's appearance in *The Tale of Custard the Dragon*. Why is it ironic? Answer in 40–50 words.",
  model: "Custard looks truly fearsome: pointed teeth, spikes down his back, a scaly belly, a mouth compared to a fireplace, a nose compared to a chimney and claws as sharp as knives. The irony is that this frightening creature is considered the household coward and keeps begging for a secure cage.",
  sol: "Appearance in own words + the contrast with his behaviour.",
}));
Q("sa_mocked", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "Why, and how, do the others make fun of Custard in Ogden Nash's ballad? Answer in 40–50 words.",
  model: "They mock Custard because he seems cowardly and keeps asking for a secure cage, while they consider themselves brave. Belinda tickles him without mercy, the pets give him the silly nickname Percival, they rudely tease him about how old he is and they laugh at him from their toy cart.",
  sol: "The reason + the ways they tease him.",
}));
Q("sa_pirate", short({
  ...SA3, t: 1, d: 2, c: "understanding",
  stem: "Describe the pirate in *The Tale of Custard the Dragon* and how the household reacts to him. Answer in 40–50 words.",
  model: "The pirate climbs in through the window armed with two pistols and holding a cutlass between his teeth; he has a black beard and a wooden leg. Belinda turns pale and screams, Mustard flees, Ink slips away and Blink disappears into a mousehole.",
  sol: "The pirate's appearance + each character's reaction.",
}));
Q("sa_courage", short({
  ...SA3, t: 2, d: 4, c: "evaluation",
  stem: "What does Ogden Nash's ballad of Custard suggest about true courage? Answer in 40–50 words.",
  model: "The poem suggests that true courage is shown in action, not in words. Belinda and her pets boast loudly but flee when danger comes, while Custard, who admits his fear, fights the pirate. Real bravery can exist alongside fear, and it rarely needs to advertise itself.",
  sol: "Action vs words + evidence + the wider idea.",
}));
Q("sa_ending", short({
  ...SA3, t: [2, 3], d: 4, c: "evaluation",
  stem: "Comment on the ending of *The Tale of Custard the Dragon*. Answer in 40–50 words.",
  model: "The last stanzas nearly repeat the opening: life returns to normal, the others still describe themselves as brave and Custard still asks for a cage. Nobody acknowledges his heroism. This circular ending is ironic and funny, showing that boasters rarely change and modest heroes often go unpraised.",
  sol: "What happens + the circular structure + the irony and its meaning.",
}));
Q("sa_humour", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "How does Ogden Nash create humour in *The Tale of Custard the Dragon*? Answer in 40–50 words.",
  model: "Nash uses absurd situations, such as a dragon kept as a pet and a comic pirate, invented and misspelled words to force rhymes, funny sound words for the animals, and exaggerated similes for the boasters' courage. The irony of the timid dragon turning hero adds to the fun.",
  sol: "Situation + language (coinages, sounds, similes) + irony.",
}));
Q("sa_ballad", short({
  ...SA3, t: [3, 4], d: 3, c: "analysis",
  stem: "Why is Ogden Nash's tale of Custard called a ballad? Answer in 40–50 words.",
  model: "A ballad tells a story in short, regular stanzas with simple language and a strong rhythm. This poem narrates a complete adventure, from a peaceful household through a pirate attack to a happy ending, in four-line stanzas rhyming aabb. It is lively and easy to read aloud or sing.",
  sol: "Definition of a ballad + how the poem fits it.",
}));
Q("sa_title", short({
  ...SA3, t: [2, 3], d: 3, c: "evaluation",
  stem: "Is *The Tale of Custard the Dragon* a suitable title for Ogden Nash's poem? Give reasons in 40–50 words.",
  model: "Yes. The word tale signals a light, story-like poem, close to a fairy tale. Naming Custard places the supposed coward at the centre, and he becomes the hero. The gentle name for a fearsome creature also hints at the humour and irony that follow.",
  sol: "A clear view + 'tale' + why Custard is named + the hint of irony.",
}));
Q("sa_devices", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Name two poetic devices used in *The Tale of Custard the Dragon* and explain their effect. Answer in 40–50 words.",
  model: "Similes compare Belinda's courage to a container of bears and Custard's attack to a bird going for a worm, making the action vivid and comic. Onomatopoeia, in the animals' cries and the dragon's clanking tail, brings the scene alive with sound. Both keep the story lively and humorous.",
  sol: "Two devices named + where they occur (described) + effect of each.",
}));
Q("sa_apply", short({
  ...SA3, t: 2, d: 3, c: "application",
  stem: "Describe a situation from school life that teaches the same lesson as Ogden Nash's ballad of Custard. Answer in 40–50 words.",
  model: "During a school trip, the boys who bragged about being fearless refuse to help when a classmate slips near a stream. Quiet Riya, often teased for being nervous, climbs down carefully and helps her up. Like Custard, she proves that real courage appears in action, not in talk.",
  sol: "A suitable situation + boasters who fail + a quiet hero + the lesson.",
}));
Q("sa_tone", short({
  ...SA3, t: 3, d: 3, c: "analysis",
  stem: "Describe the tone of *The Tale of Custard the Dragon*. Answer in 40–50 words.",
  model: "The tone is light-hearted, playful and humorous throughout. Even dangerous moments, like the pirate's attack and his swallowing, are told cheerfully, with comic sounds and made-up words. Beneath the fun there is gentle irony, aimed at the boasters who never admit that the timid dragon saved them.",
  sol: "Name the tone + evidence + the underlying irony.",
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q("sb_poet", short({
  ...SA2, t: 1, d: 1, c: "recall",
  stem: "Who wrote *The Tale of Custard the Dragon*? Mention two facts about the poet in 30–40 words.",
  model: "Ogden Nash (1902–1971), an American poet, wrote it. He is famous for humorous light verse that children and adults both enjoy, and for unusual rhymes, often created by inventing or deliberately misspelling words.",
  sol: "Name + any two facts (American; 1902–1971; humorous light verse; unusual rhymes and coinages).",
}));
Q("sb_cage", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "What does Custard keep asking for in Ogden Nash's ballad, and what does this show? Answer in 30–40 words.",
  model: "Custard keeps asking for a secure cage. This shows that he is timid and admits his fears openly, which is why the others think of him as a coward and laugh at him.",
  sol: "What he asks for + what it reveals.",
}));
Q("sb_percival", short({
  ...SA2, t: [4, 1], d: 2, c: "understanding",
  stem: "Why do the pets call Custard Percival in *The Tale of Custard the Dragon*? Answer in 30–40 words.",
  model: "Percival sounds grand and old-fashioned, the name of a noble knight. Using it for a dragon they think is a coward is mockery: they are making fun of him by calling him something he does not seem to deserve.",
  sol: "What the name suggests + why it is mocking.",
}));
Q("sb_pirate_fight", short({
  ...SA2, t: 1, d: 2, c: "understanding",
  stem: "How does the pirate try to defend himself against Custard in Ogden Nash's ballad? Answer in 30–40 words.",
  model: "The astonished pirate stares at the charging dragon, gulps a drink from a flask he carries and fires his pistols twice. Both shots miss, and Custard swallows him completely, leaving nothing behind at all.",
  sol: "His actions + the result.",
}));
Q("sb_coinages", short({
  ...SA2, t: [4, 3], d: 3, c: "analysis",
  stem: "Give two examples of words invented or misspelled by Ogden Nash in the Custard poem, and say why he uses them. Answer in 30–40 words.",
  model: "Nash bends window into winda and pirate into pyrate, and invents realio and trulio from really and truly. He uses such words to make comic rhymes and to give the poem a playful, childlike sound.",
  sol: "Two examples + the reason (rhyme, humour).",
}));
Q("sb_message", short({
  ...SA2, t: 2, d: 2, c: "understanding",
  stem: "State the central message of *The Tale of Custard the Dragon* in 30–40 words.",
  model: "Appearances and boasts can be misleading. Those who brag about courage may run in a crisis, while a quiet, fearful person may act bravely. True courage shows in action, and it deserves recognition.",
  sol: "The main idea + supporting point.",
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q("la_courage", long({
  ...LA, t: 2, d: 3, c: "analysis",
  stem: "How does Ogden Nash contrast real and boastful courage in *The Tale of Custard the Dragon*? Answer in 100–120 words.",
  model: "Nash builds the poem on a contrast between talk and action. Belinda and her pets describe themselves in grand terms: her courage is compared to a container full of bears, Mustard's to a furious tiger, and the kitten and mouse claim to hunt lions. They mock Custard, who openly asks for a secure cage. But when a pirate climbs in through the window, their bravery vanishes. Belinda screams, Mustard flees, Ink hides and Blink dives into a mousehole. Only Custard acts, charging at the pirate and swallowing him. Even afterwards, the boasters go on boasting and nobody admits the truth. Nash shows that real courage is proved in danger, not announced in comfortable times.",
  sol: "The boasts → the mocking → the crisis and who flees → Custard's action → the ending → conclusion. Do not quote the poem.",
}));
Q("la_custard_diary", long({
  ...LA, t: [4, 2], d: 4, c: "application", bloom: "create",
  stem: "Imagine you are Custard in Ogden Nash's ballad. Write a diary entry about the night of the pirate, in 100–120 words.",
  model: "Late at night\n\nWhat a day. This morning Belinda tickled me till I cried, and the others called me Percival again and laughed. I asked, very politely, for my secure cage. Then this evening we heard a horrible noise, and a pirate climbed in with pistols, a sword between his teeth and a wooden leg. Everyone vanished, even brave Mustard. I was terrified too, but somebody had to do something. Before I could think, I was charging. He fired at me twice and missed, and then, well, I ate him. Belinda hugged me and Mustard licked me. By bedtime they were boasting again. I don't mind. I still want my cage.",
  sol: "Diary format (time marker, first person). Content fits the poem: the teasing, the pirate's arrival and appearance, everyone fleeing, Custard's fear and action, the celebration, the unchanged ending. No lines quoted.",
}));
Q("la_appearance", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "Ogden Nash's ballad suggests that we should not judge others by appearances. Do you agree? Give a reasoned answer in 100–120 words.",
  model: "I agree. In Nash's poem, Custard has every outward sign of a fierce dragon, yet everyone, including the reader at first, judges him a coward because he admits his fear. Belinda and her pets, who look small and harmless, describe themselves as hugely brave. The pirate's attack reveals the truth: the boasters run, and the timid-looking dragon saves them. In real life too, quiet people are often underestimated, while confident talkers are trusted too easily. However, appearances are not always misleading; sometimes a fierce-looking dog really is dangerous. The wiser lesson is to judge people by their actions over time, not by their looks or their words. That is exactly the poem's point.",
  sol: "A clear view → evidence from the poem → a real-life link → a balancing point → conclusion.",
}));
Q("la_report", long({
  ...LA, t: [1, 4], d: 3, c: "application", bloom: "create",
  stem: "Write a short, light-hearted news report on the pirate attack at Belinda's house, based on *The Tale of Custard the Dragon*, in 100–120 words.",
  model: "DRAGON SAVES HOUSEHOLD FROM PIRATE\nBy a Staff Reporter\n\nA pirate who broke into a cheerful small house on Tuesday night was defeated by an unlikely hero: Custard, a dragon kept as a pet long mocked as a coward. The intruder, who had a black beard and a wooden leg, climbed in through a window armed with two pistols and a sword. Witnesses say the household's self-declared brave members fled at once. Custard later said he simply had to act. The dragon charged, the pirate's shots missed, and the attacker was swallowed. Residents celebrated briefly. By the next morning, however, the other pets were again describing themselves as fearless, and Custard had politely requested a secure cage.",
  sol: "Report format (headline, byline, who/what/where/when); content consistent with the poem; a light tone; the ironic ending.",
}));
Q("la_humour_irony", long({
  ...LA, t: 3, d: 4, c: "analysis",
  stem: "Discuss how Ogden Nash uses humour and irony in *The Tale of Custard the Dragon*. Answer in 100–120 words.",
  model: "Nash makes the poem funny on every level. The situation is absurd: a girl keeps a dragon as a pet, and a cartoon pirate with a wooden leg climbs through the window. The language is playful, with invented and misspelled words that force comic rhymes, cheerful sound words for the animals' cries and clanking tail, and exaggerated similes for the boasters' courage. The central irony is that the dragon everyone calls a coward is the only one who fights, while the boasters flee. A second irony comes at the end, when the old boasts return as if nothing had happened. Humour keeps even the violence light, and irony carries the poem's serious point about courage.",
  sol: "Situational humour → verbal humour → central irony → ending irony → how humour and irony work together.",
}));
Q("la_relevance", long({
  ...LA, t: 2, d: 4, c: "evaluation",
  stem: "In the light of *The Tale of Custard the Dragon*, do people who admit their fears deserve more respect than they usually get? Answer in 100–120 words.",
  model: "Ogden Nash's poem suggests that they do. Custard openly asks for a secure cage, and for this he is mocked by Belinda and her pets, who constantly boast. Yet when the pirate arrives, he is the only one who acts. Admitting fear is a form of honesty, and courage means acting despite fear, not feeling none. In schools and workplaces today, people who say they are nervous are often seen as weak, while confident talkers win praise. That can be unfair and even dangerous, because talk is not action. Of course, someone who only complains and never tries also deserves little credit. The poem teaches us to respect honesty and judge courage by deeds.",
  sol: "A clear view → evidence from the poem → why admitting fear matters → today's world → a balancing point → conclusion.",
}));

// ================================================================ objective items
Q("mc_poet", mcq({ t: 1, d: 1, c: "recall", stem: "Who wrote the ballad about Custard the dragon in *First Flight*?", opts: ["Ogden Nash", "Carl Sandburg", "W. B. Yeats", "Robin Klein"], sol: "Ogden Nash, the American comic poet. The others wrote other poems in the Class 10 textbook." }));
Q("mc_nash", mcq({ t: 1, d: 1, c: "recall", stem: "Ogden Nash, the poet of *The Tale of Custard the Dragon*, is best known for…", opts: ["humorous light verse", "war poetry", "religious poetry", "epic poems"], sol: "Nash wrote comic, light verse with playful rhymes." }));
Q("mc_mustard", mcq({ t: 1, d: 1, c: "recall", stem: "In Ogden Nash's ballad, which animal is Mustard?", opts: ["a dog", "a cat", "a mouse", "a dragon"], sol: "Mustard is the dog, yellow like its name." }));
Q("mc_coward", mcq({ t: 1, d: 2, c: "analysis", stem: "Why is Custard called a coward in *The Tale of Custard the Dragon*?", opts: ["He keeps asking for a secure cage.", "He runs from the pirate.", "He is the smallest pet.", "He cannot breathe fire."], sol: "His wish for a secure cage makes the others mock him." }));
Q("mc_window", mcq({ t: 1, d: 2, c: "understanding", stem: "In Ogden Nash's ballad, how does the pirate get into the house?", opts: ["He climbs in through the window.", "He breaks down the door.", "He comes down the chimney.", "He is invited in by Belinda."], sol: "He climbs through the window." }));
Q("mc_hero", mcq({ t: 2, d: 2, c: "understanding", stem: "Who saves the household from the pirate in *The Tale of Custard the Dragon*?", opts: ["Custard", "Mustard", "Belinda", "Ink"], sol: "Only Custard fights." }));
Q("mc_irony", mcq({ t: 3, d: 3, c: "analysis", stem: "What is the central irony of Ogden Nash's ballad of Custard?", opts: ["The supposed coward is the only one who is brave.", "The pirate is kind.", "The mouse is the biggest animal.", "Belinda is afraid of her pets."], sol: "The mocked dragon proves the true hero." }));
Q("mc_rhyme", mcq({ t: 3, d: 2, c: "understanding", stem: "The rhyme scheme of each stanza of *The Tale of Custard the Dragon* is…", opts: ["aabb", "abab", "abcb", "free verse, no rhyme"], sol: "Each stanza is two rhyming couplets." }));
Q("mc_theme", mcq({ t: 2, d: 2, c: "understanding", stem: "Which is the central theme of Ogden Nash's ballad of Custard?", opts: ["true courage is shown in action, not boasts", "pirates are always defeated", "dragons make good pets", "mice are cleverer than cats"], sol: "The boasters flee; the timid dragon acts." }));
Q("mc_apply", mcq({ t: 2, d: 3, c: "application", stem: "Which SOYL-written situation matches the lesson of *The Tale of Custard the Dragon*?", opts: ["Arjun, mocked for being nervous, calmly leads his class out when the fire alarm rings, while the boasters panic.", "Arjun wins a running race easily.", "Arjun brags about his marks.", "Arjun gets a new pet dog."], sol: "A quiet, nervous person proving brave in a crisis mirrors Custard." }));
Q("mc_percival", mcq({ t: 4, d: 3, c: "analysis", stem: "Why is calling Custard Percival in Ogden Nash's ballad a form of mockery?", opts: ["It is a grand knight's name given to a supposed coward.", "It is the pirate's name.", "It means dragon in Latin.", "It is the name of Belinda's father."], sol: "The grand name is used sarcastically." }));
Q("mc_ending", mcq({ t: 3, d: 3, c: "analysis", stem: "How does *The Tale of Custard the Dragon* end?", opts: ["Life returns to normal, with the old boasts and Custard's wish for a cage.", "Custard leaves the house for ever.", "Belinda gives Custard a medal.", "The pets admit they were cowards."], sol: "The circular ending repeats the opening situation." }));
Q("mc_onomatopoeia", mcq({ t: 3, d: 2, c: "understanding", stem: "The clanking of Custard's tail and the animals' cries in Ogden Nash's ballad are examples of…", opts: ["onomatopoeia", "metaphor", "oxymoron", "allusion"], sol: "Sound-imitating words are onomatopoeia." }));
Q("mc_tone", mcq({ t: 3, d: 3, c: "analysis", stem: "Which word best describes the tone of *The Tale of Custard the Dragon*?", fixed: true, key: "c", opts: ["tragic", "solemn", "humorous", "bitter"], sol: "The poem is light-hearted and comic throughout." }));

Q("fb_ballad", fb({ t: 3, d: 1, c: "recall", marks: 1, stem: "Ogden Nash's tale of Custard is a ___ whose stanzas rhyme in ___ couplets.", acc: [["ballad"], ["two", "2"]], sol: "A **ballad** whose stanzas rhyme in **two** couplets (aabb).", scheme: [["ballad", 0.5], ["two", 0.5]] }));
Q("fb_simile", fb({ t: 3, d: 2, c: "understanding", stem: "A comparison using *like* or *as*, such as Custard's snort compared to a machine in *The Tale of Custard the Dragon*, is a ___.", acc: [["simile"]], sol: "It is a **simile**." }));
Q("fb_poet", fb({ t: 1, d: 1, c: "recall", stem: "*The Tale of Custard the Dragon* was written by the American poet Ogden ___.", acc: [["Nash"]], sol: "The poet is Ogden **Nash**." }));
Q("fb_cutlass", fb({ t: 4, d: 2, c: "understanding", stem: "The short, curved sword that the pirate holds between his teeth in Ogden Nash's ballad is a ___.", acc: [["cutlass"]], sol: "It is a **cutlass**." }));

Q("ar_custard", ar({ t: 2, d: 3, c: "analysis", a: "Custard in Ogden Nash's ballad is mocked by Belinda and her pets.", r: "Custard openly asks for a secure cage, so the others think he is a coward.", key: "a", sol: "Both are true, and R explains why they mock him." }));
Q("ar_mustard", ar({ t: 1, d: 2, c: "understanding", a: "Mustard fights the pirate bravely in *The Tale of Custard the Dragon*.", r: "Mustard is described as a dog in Ogden Nash's ballad.", key: "d", sol: "A is false: Mustard runs away yelping. R is true." }));
Q("ar_rhyme", ar({ t: 3, d: 2, c: "understanding", a: "*The Tale of Custard the Dragon* is a ballad.", r: "Ogden Nash wrote the poem in unrhymed free verse.", key: "c", sol: "A is true. R is false: the stanzas rhyme aabb." }));
Q("ar_ending", ar({ t: 2, d: 3, c: "analysis", a: "At the end of Ogden Nash's ballad, Custard still asks for a secure cage.", r: "Belinda lives in a small, cheerful house in *The Tale of Custard the Dragon*.", key: "b", sol: "Both are true, but R does not explain A." }));

Q("tf_belinda", tf({ t: 1, d: 1, c: "recall", stem: "True or false: in Ogden Nash's ballad, Belinda fights the pirate.", ans: false, sol: "She turns pale and cries for help." }));
Q("tf_bullets", tf({ t: 1, d: 1, c: "recall", stem: "True or false: in *The Tale of Custard the Dragon*, the pirate's shots miss Custard.", ans: true, sol: "Both shots miss." }));
Q("tf_admit", tf({ t: 2, d: 3, c: "analysis", stem: "True or false: at the end of Ogden Nash's ballad, the others admit that Custard is the bravest.", ans: false, sol: "They return to boasting about their own courage." }));
Q("tf_ink", tf({ t: 1, d: 2, c: "understanding", stem: "True or false: Ink in *The Tale of Custard the Dragon* is a kitten.", ans: true, sol: "Ink is the kitten, black like its name." }));

Q("ord_events", ord({
  t: [1, 2], d: 2, c: "understanding", marks: 2,
  stem: "Arrange these events of Ogden Nash's ballad of Custard in order (SOYL summary).",
  items: ["Belinda and her pets boast of their courage and mock Custard.", "A pirate climbs in through the window.", "Belinda screams and the pets flee or hide.", "Custard charges at the pirate.", "The pirate fires twice and misses.", "Custard swallows the pirate.", "Life returns to normal, boasts and all."],
  sol: "Boasting → pirate → panic → charge → missed shots → swallowed → circular ending.",
}));
Q("ord_answer", ord({
  t: 4, d: 2, c: "application", marks: 2,
  stem: "Arrange the steps for answering a 40–50 word question on the irony in *The Tale of Custard the Dragon*.",
  items: ["Underline the key word: irony.", "State what is expected of Custard.", "Describe what actually happens, in your own words.", "Explain what the contrast shows about courage.", "Check the word count and remove any copied phrases."],
  sol: "Key word → expectation → reality → meaning → check.",
}));

Q("mt_pets", match({
  t: 1, d: 1, c: "recall", marks: 2,
  stem: "Match each character in Ogden Nash's ballad with what they are.",
  pairs: [["Ink", "the kitten"], ["Blink", "the mouse"], ["Mustard", "the dog"], ["Custard", "a dragon"]],
  sol: "The household of the poem.",
}));
Q("mt_reactions", match({
  t: 1, d: 3, c: "analysis", marks: 2,
  stem: "Match each character in *The Tale of Custard the Dragon* with their reaction to the pirate.",
  pairs: [["Belinda", "turns pale and screams for help"], ["Mustard", "runs off yelping"], ["Blink", "hides in a mousehole"], ["Custard", "charges and swallows him"]],
  sol: "Only Custard acts; the others flee or panic.",
}));
Q("mt_words", match({
  t: 4, d: 2, c: "understanding", marks: 2,
  stem: "Match each word from Ogden Nash's ballad with its meaning.",
  pairs: [["flagon", "a flask or bottle for drink"], ["grog", "a strong drink, often rum and water"], ["gyrate", "move round in circles"], ["winda", "window, misspelt for rhyme"]],
  sol: "Single words from the poem with their meanings.",
}));
