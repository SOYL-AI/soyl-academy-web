// CBSE 10 English Language and Literature, ch31 "The Book That Saved the Earth" (Claire Boiko) — question bank.
// Footprints without Feet (supplementary reader), a play. LITERATURE RULE (CONTEXT §8, D-036): no line, close
// paraphrase or distinctive phrase of the play appears here; dialogue is reported, never quoted, and the nursery
// rhymes the Martians read are described, not reproduced. Passages are SOYL commentary (passage_origin
// soyl-commentary). Students read the play in their textbook.
// PATTERN: the board examines Footprints through 3-mark short answers (Q9, 40–50 words) and a 6-mark long answer
// on character, theme and values; it prints no Footprints extract. The bank is weighted that way (14 three-mark,
// 9 long) with only the 5 commentary items that the chapter-test blueprints' Section A slots need.
// Topics: t01 context and summary · t02 themes and message · t03 characters (Think-Tank, Noodle) · t04 exam practice.
// Left out (cannot be confirmed without the text): the town's name, any year the Historian gives, Think-Tank's
// full titles, the exact order and wording of the crew's guesses, where Think-Tank flees at the end, how many
// scenes the play has, and every line of the nursery rhymes.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on Claire Boiko's play, not an extract from it. Read the play itself in your textbook, Footprints without Feet. The board paper does not print extracts from this reader; use this item as a comprehension check on character and theme.)*";
const SRC_STEM = `*The Book That Saved the Earth*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the play (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the play', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the play, accurately used', 3], ['Interpretation / extrapolation: a clear view or value supported by the play', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary items (source-based)
Q('src_frame', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Boiko does not begin on Mars or on Earth but in the distant future. A historian, looking back across several centuries, introduces the story as a piece of history: the time when an invasion from Mars was stopped, not by soldiers or scientists, but by a book. This frame does two jobs. It makes the audience curious at once, because a book seems the least likely of heroes. It also tells us that the danger is safely past, so we can laugh at what follows instead of fearing it. From the first moment, the play promises comedy wrapped in a science-fiction adventure.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who introduces the story in *The Book That Saved the Earth*?', opts: ['a historian from the future', 'the commander of Mars', 'a librarian on Earth', 'a soldier from the Martian crew'], sol: 'A historian from the future frames the play.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'In the play, the planet that plans to invade Earth is ___.', acc: [['Mars']], sol: 'The invaders come from **Mars**.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why does the historian\'s introduction make the audience curious?', opts: ['A book seems an unlikely thing to save a planet.', 'The historian refuses to tell the story.', 'The audience already knows the ending.', 'The historian is a Martian in disguise.'], sol: 'An ordinary book as the saviour of Earth is a surprising promise.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How does the frame help the audience enjoy the comedy that follows?', model: 'It tells us that the danger is already past, so we can laugh instead of worrying.', sol: 'The frame removes suspense about Earth\'s survival.', scheme: [['Danger is past, so we can laugh', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What kind of play does the opening of *The Book That Saved the Earth* lead us to expect?', opts: ['a comedy set within a science-fiction adventure', 'a tragedy about the end of the world', 'a historical play about real wars', 'a mystery about a stolen book'], sol: 'Future setting + Martians + a book as hero signals light comedy.' })),
  ],
  sol: 'Parts (a)–(b) recall the frame; (c)–(e) interpret its purpose.',
}));
Q('src_landing', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The Martian invasion begins with a small advance party. Captain Omega leads a crew that includes Lieutenant Iota and Sergeant Oop, while the leader of Mars, Think-Tank, stays at home and directs them from a screen, with his young assistant Noodle at his side. The crew's probe comes down beside a public library in a small town. To the Martians, the building full of shelves looks like a storehouse, and they have no idea what the rows of books are for. Everything now depends on how Think-Tank, who believes he knows everything, explains these strange objects.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where does the Martian crew land on Earth in *The Book That Saved the Earth*?', opts: ['beside a public library in a small town', 'outside a city hospital', 'in the middle of a desert', 'on the roof of a school'], sol: 'The probe lands beside a small-town public library.' })),
    child('b', fb({ t: 3, d: 1, c: 'recall', stem: 'Think-Tank\'s young assistant on Mars is called ___.', acc: [['Noodle']], sol: 'His assistant is **Noodle**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does Think-Tank give orders to the crew on Earth?', opts: ['He directs them from Mars through a screen.', 'He travels with them in the probe.', 'He sends them written letters.', 'He gives no orders at all.'], sol: 'He stays on Mars and guides them from a screen.' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Why are the Martians puzzled by the library?', model: 'They have never seen books, so they cannot tell what the objects on the shelves are for.', sol: 'Books are completely unknown to them.', scheme: [['Books are unknown to them', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the commentary say that everything now depends on Think-Tank?', opts: ['The crew must rely on the explanations of a leader who thinks he knows everything.', 'Think-Tank is the only Martian who has visited Earth before.', 'Think-Tank is hiding inside the library.', 'The crew have no screen to contact him.'], sol: 'The comedy rests on a confident leader explaining what he does not understand.' })),
  ],
  sol: 'Note the chain of command (Think-Tank on Mars, the crew on Earth) and the setting.',
}));
Q('src_guesses', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Faced with the books, Think-Tank announces one confident explanation after another. First he decides that they must be some kind of food, and the obedient crew act on his word. When that fails, he treats them as devices for listening, and the crew solemnly hold them up to their ears. Each guess is delivered with total certainty, and each is completely wrong. It is Noodle, quiet and polite, who suggests that the marks inside might be meant to be looked at. The audience laughs because we know at once what a book is for, while the most powerful mind on Mars does not.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What does Think-Tank first decide the books are?', opts: ['some kind of food', 'weapons', 'maps of Earth', 'toys for children'], sol: 'His first guess is that they are food.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What do the crew do when Think-Tank treats the books as devices for listening?', opts: ['They hold the books up to their ears.', 'They throw the books away.', 'They take the books back to Mars.', 'They ask a librarian for help.'], sol: 'They obediently try to listen to the books.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The character who suggests that the marks in the books are meant to be looked at is ___.', acc: [['Noodle']], sol: 'The sensible idea comes from **Noodle**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the audience find these scenes funny?', model: 'We know what books are for, yet the confident Martian leader keeps getting it absurdly wrong.', sol: 'Dramatic irony: the audience knows more than the characters.', scheme: [['The audience knows more than Think-Tank', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What do Think-Tank\'s wrong guesses show about him?', opts: ['His confidence is far greater than his knowledge.', 'He is too shy to give orders.', 'He has read many Earth books.', 'He wants Noodle to lead the mission.'], sol: 'Certainty without understanding is the joke at the centre of his character.' })),
  ],
  sol: 'Separate what happens (a–c) from why it is funny and what it shows (d, e).',
}));
Q('src_rhymes', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The book the Martians finally read is a collection of nursery rhymes, the kind every Earth child knows. Think-Tank reads them as if they were military reports. A rhyme about a cow jumping over the moon convinces him that Earth has an advanced space programme, so advanced that even its animals travel in space. Then he sees the picture of an egg-shaped figure perched on a wall, a figure that looks very like Think-Tank himself. The rhyme ends with the figure taking a fall, and he takes it as a personal threat. In a panic, he orders the invasion abandoned. Earth is saved by a children's book.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What kind of book do the Martians finally read in *The Book That Saved the Earth*?', opts: ['a book of nursery rhymes', 'a science textbook', 'a dictionary', 'a book of maps'], sol: 'It is a book of nursery rhymes, *Mother Goose*.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does Think-Tank conclude from the rhyme about the cow and the moon?', opts: ['that Earth has an advanced space programme', 'that cows are dangerous animals', 'that the moon belongs to Mars', 'that Earth people cannot read'], sol: 'He takes a nonsense rhyme as evidence of advanced space travel.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The egg-shaped figure in the picture looks like ___, who takes the rhyme as a threat.', acc: [['Think-Tank', 'Think Tank', 'Thinktank']], sol: 'It resembles **Think-Tank** himself.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does Think-Tank call off the invasion?', model: 'He believes the rhyme about the egg-shaped figure is a threat to destroy him.', sol: 'He reads the figure\'s fall as Earth\'s plan for him.', scheme: [['He reads the rhyme as a threat to himself', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about the way Earth is saved?', opts: ['A harmless children\'s book defeats a powerful invading force.', 'The Martians win the war but lose their ship.', 'Earth\'s armies defeat the Martians in battle.', 'Noodle invades Earth on his own.'], sol: 'The most innocent of books becomes Earth\'s defence.' })),
  ],
  sol: 'Link each misreading to the conclusion Think-Tank draws and to the irony of the title.',
}));
Q('src_noodle', source({
  t: [3, 2], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Think-Tank and Noodle are opposites. Think-Tank boasts constantly about his huge brain, talks down to everyone around him and never admits a mistake. Noodle is young and low in rank, yet he notices things, thinks before he speaks and offers his ideas politely, even when they are brushed aside. The play shows that rank and intelligence are not the same thing. Again and again the sensible suggestion comes from the humble assistant, while the leader's certainty leads the mission astray. By the end, the audience trusts Noodle far more than the mighty-sounding ruler of Mars.",
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'What does Think-Tank constantly boast about?', opts: ['his huge brain', 'his strength in battle', 'his wealth', 'his singing'], sol: 'He keeps praising his own intelligence.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How does Noodle offer his ideas?', opts: ['politely, after thinking', 'loudly and rudely', 'only in writing', 'never at all'], sol: 'Noodle is thoughtful and courteous.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Think-Tank is arrogant, whereas Noodle is ___.', acc: [['humble', 'modest', 'polite', 'sensible']], sol: 'Noodle is **humble** (modest and sensible).' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What does the contrast between the two characters suggest about leadership?', model: 'A good leader listens to others; high rank does not guarantee good judgement.', sol: 'Rank is not wisdom; listening matters.', scheme: [['Rank is not wisdom / leaders should listen', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the audience come to trust Noodle more than Think-Tank?', opts: ['Noodle\'s suggestions are sensible, while Think-Tank\'s guesses keep failing.', 'Noodle is older than Think-Tank.', 'Noodle is the ruler of Mars.', 'Noodle never speaks.'], sol: 'Results, not rank, earn trust.' })),
  ],
  sol: 'Compare the two characters through what they say and how the play rewards them.',
}));

// ================================================================ short answers, 3 marks (40–50 words): board Q9 pattern
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_historian', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Who is the Historian in *The Book That Saved the Earth*, and why does Claire Boiko use this character? Answer in 40–50 words.',
  model: 'The Historian is a person from the distant future who looks back and tells the audience how a book once saved Earth from Mars. The character frames the play, makes us curious about an unlikely hero, and assures us the danger is past, so we can enjoy the comedy.',
  sol: 'Who the Historian is + the framing role + its effect on the audience.',
}));
Q('sa_mission', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Describe the Martian mission to Earth in *The Book That Saved the Earth*. Answer in 40–50 words.',
  model: 'Mars planned to invade Earth and sent an advance crew under Captain Omega, with Lieutenant Iota and Sergeant Oop. Their leader, Think-Tank, stayed on Mars with his assistant Noodle and directed them from a screen. The crew landed beside a small-town public library to gather information first.',
  sol: 'The aim (invasion) + who went + who directed them + where they landed.',
}));
Q('sa_food_listen', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'How did the Martians try to use the books before they began reading them, and what does this show? Answer in 40–50 words.',
  model: 'On Think-Tank\'s orders, the crew first treated the books as food and then held them to their ears as if they were listening devices. Both attempts failed. This shows how blindly the crew obeyed their leader and how confidently Think-Tank explained things he did not understand.',
  sol: 'The two misuses + what they reveal about the crew and about Think-Tank.',
}));
Q('sa_noodle_idea', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'What part does Noodle play in helping the Martians understand the books? Answer in 40–50 words.',
  model: 'While Think-Tank kept making wrong guesses, Noodle quietly suggested that the marks inside the books were meant to be looked at. His sensible idea let the Martians finally read one. Ironically, the humble assistant\'s good idea is what led the mighty leader to his foolish retreat.',
  sol: 'Noodle\'s suggestion + its result + the irony.',
}));
Q('sa_cow', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How does Think-Tank interpret the nursery rhyme about the cow and the moon? Answer in 40–50 words.',
  model: 'Think-Tank reads the nonsense rhyme as a factual report. He decides that if even a cow can jump over the moon, Earth must have an extremely advanced space programme. The misreading is funny because he treats a children\'s rhyme as serious military intelligence.',
  sol: 'His literal reading + the conclusion he draws + why it is comic.',
}));
Q('sa_humpty', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Why does Think-Tank panic when he sees the picture of the egg-shaped figure on the wall? Answer in 40–50 words.',
  model: 'The egg-shaped figure looks very like Think-Tank himself, with his oversized head. When the rhyme describes the figure falling, he believes Earth is planning to destroy him. Afraid for his own safety, the boastful leader immediately orders the invasion to be abandoned.',
  sol: 'The resemblance + his reading of the fall as a threat + his reaction.',
}));
Q('sa_tt_traits', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Mention three traits of Think-Tank, with evidence from *The Book That Saved the Earth*. Answer in 40–50 words.',
  model: 'Think-Tank is arrogant, boasting constantly about his enormous brain. He is rude, talking down to Noodle and the crew. He is also foolish and cowardly, confidently mistaking books for food and then fleeing in panic because a nursery rhyme seems to threaten him.',
  sol: 'Three traits (arrogant, rude, foolish, cowardly, vain), each with evidence.',
}));
Q('sa_noodle_traits', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of person is Noodle in *The Book That Saved the Earth*? Answer in 40–50 words.',
  model: 'Noodle is intelligent, humble and patient. Though low in rank, he observes carefully and makes sensible suggestions, such as looking at the marks inside the books. He stays polite even when Think-Tank brushes him aside, showing that wisdom does not depend on position.',
  sol: 'Two or three traits (humble, intelligent, patient, polite) with evidence.',
}));
Q('sa_title', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'Is *The Book That Saved the Earth* a suitable title for the play? Answer in 40–50 words.',
  model: 'Yes. The title states the play\'s central surprise: a book of nursery rhymes, not an army, stops the Martian invasion. It arouses curiosity at once and carries the irony of the plot, since the most harmless book imaginable becomes the planet\'s defence.',
  sol: 'A stand + what the title points to + its irony or effect.',
}));
Q('sa_humour', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How does Claire Boiko create humour in *The Book That Saved the Earth*? Answer in 40–50 words.',
  model: 'Humour comes from the gap between Think-Tank\'s certainty and his ignorance: he confidently mistakes books for food and listening devices. The Martians\' literal readings of nursery rhymes, the obedient crew\'s antics and the bossy leader fleeing from a picture all add to the comedy.',
  sol: 'Two or three sources of humour (misunderstanding, literal reading, character contrast) with examples.',
}));
Q('sa_misunderstanding', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Explain how misunderstanding drives the plot of *The Book That Saved the Earth*. Answer in 40–50 words.',
  model: 'Every turn of the plot rests on a misunderstanding. The Martians cannot tell what books are for, then read nonsense rhymes as facts. Think-Tank concludes that Earth is technologically advanced and that it plans to destroy him, so the invasion collapses through a misreading.',
  sol: 'Misunderstandings in sequence + how they lead to the ending.',
}));
Q('sa_pride', short({
  ...SA3, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'How does Think-Tank\'s pride lead to the failure of the Martian invasion? Answer in 40–50 words.',
  model: 'Think-Tank\'s pride makes him trust his own guesses and ignore others. He never admits that he does not understand Earth, so he reads childish rhymes as serious threats. Proud and self-centred, he sees himself in the egg-shaped figure and abandons the invasion out of fear.',
  sol: 'His pride + how it distorts his judgement + the result.',
}));
Q('sa_saved', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'In what sense does a book save the Earth in Claire Boiko\'s play? Answer in 40–50 words.',
  model: 'The book does not fight; it is simply misread. Because the Martians cannot understand nursery rhymes, Think-Tank decides that Earth is powerful and dangerous, and calls off the attack. The book saves Earth through the invaders\' ignorance, which makes the ending both funny and ironic.',
  sol: 'How the book works (through misreading) + the outcome + the irony.',
}));
Q('sa_crew', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'What role do Captain Omega, Lieutenant Iota and Sergeant Oop play in *The Book That Saved the Earth*? Answer in 40–50 words.',
  model: 'They form the advance crew that lands on Earth. They carry out Think-Tank\'s orders without question, trying to use the books in whatever way he commands. Their obedience adds to the comedy, and it shows how a whole team suffers when no one questions a foolish leader.',
  sol: 'Their task + their obedience + its effect on the play.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_tt_who', short({
  ...SA2, t: 3, d: 1, c: 'recall',
  stem: 'Who is Think-Tank in *The Book That Saved the Earth*? Answer in 30–40 words.',
  model: 'Think-Tank is the leader of Mars, who plans the invasion of Earth. He has an enormous head, boasts about his great intelligence and directs the Martian crew from Mars through a screen.',
  sol: 'His position + his appearance or nature + his role in the mission.',
}));
Q('sb_landing', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Where did the Martian crew land, and why did the place puzzle them? Answer in 30–40 words.',
  model: 'They landed beside a public library in a small town. The building was full of shelves of books, and since the Martians had never seen books, they could not work out what these objects were for.',
  sol: 'The place + the reason for their confusion.',
}));
Q('sb_mother_goose', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What is *Mother Goose*, and why is it important in the play? Answer in 30–40 words.',
  model: 'It is a book of traditional nursery rhymes for young children. It is the book the Martians finally read, and their misreading of its rhymes leads Think-Tank to call off the invasion.',
  sol: 'What the book is + its role in the plot.',
}));
Q('sb_ending', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What happens to the Martian invasion at the end of the play? Answer in 30–40 words.',
  model: 'The invasion is abandoned. Frightened by a nursery rhyme that he believes is a threat to himself, Think-Tank orders the crew to leave Earth, and the planet is saved without a single battle.',
  sol: 'The outcome + its cause.',
}));
Q('sb_listen', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'Why did the crew obey Think-Tank even when his orders seemed strange? Answer in 30–40 words.',
  model: 'Think-Tank was their all-powerful leader, and he presented every guess as certain truth. The crew were trained to obey, not to question, so they followed his orders even when they seemed absurd.',
  sol: 'His authority and confidence + the crew\'s habit of obedience.',
}));
Q('sb_lesson', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'State one lesson that students can learn from Think-Tank\'s behaviour. Answer in 30–40 words.',
  model: 'We should admit what we do not know and listen to others, whatever their rank. Think-Tank\'s refusal to doubt himself or value Noodle\'s ideas led him to foolish conclusions and a humiliating retreat.',
  sol: 'One clear lesson linked to Think-Tank\'s conduct.',
}));

// ================================================================ long answers, 6 marks (100–120 words): board pattern
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_tt_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Think-Tank in *The Book That Saved the Earth*. Answer in 100–120 words.',
  model: 'Think-Tank, the leader of Mars, is the comic villain of the play. He is extremely proud of his enormous head and the brain inside it, and he boasts about his intelligence at every opportunity. He is also rude, talking down to Noodle and expecting the crew to obey without question. Yet his knowledge is far smaller than his confidence. He declares that books are food, then listening devices, and reads nonsense rhymes as military reports. When he sees an egg-shaped figure that resembles him, his courage vanishes and he orders a hasty retreat. Through Think-Tank, Boiko mocks leaders who mistake loud certainty for wisdom and never admit that they might be wrong.',
  sol: 'Position + three or four traits with evidence (proud, rude, ignorant, cowardly) + what the character represents.',
}));
Q('la_contrast', long({
  ...LA, t: [4, 3], d: 4, c: 'analysis',
  stem: 'Compare and contrast Think-Tank and Noodle. What does the contrast suggest? Answer in 100–120 words.',
  model: 'Think-Tank and Noodle stand at opposite ends of Martian society and of human nature. Think-Tank is the powerful ruler of Mars, yet he is arrogant, rude and quick to jump to conclusions. He insists that books are food and treats nursery rhymes as threats. Noodle is only a junior assistant, but he is thoughtful, polite and observant. It is his quiet suggestion that the marks in the books are meant to be looked at that finally makes sense. Think-Tank never listens to him and never admits a mistake. The contrast suggests that wisdom does not depend on rank, and that a leader who ignores sensible advice can bring disaster on everyone.',
  sol: 'Each character with evidence + the contrast drawn clearly + the message about rank, humility and listening.',
}));
Q('la_misunderstanding', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: '*The Book That Saved the Earth* shows how misunderstanding can change the course of events. Discuss. Answer in 100–120 words.',
  model: 'The whole play turns on misunderstanding. The Martians arrive knowing nothing about books, so Think-Tank confidently mistakes them for food and then for devices to listen to. When the crew finally read a book of nursery rhymes, they take every line literally. A cow jumping over the moon becomes proof of Earth\'s advanced space travel, and an egg-shaped figure who falls becomes a plot against Think-Tank. Each misreading pushes the Martians further from the truth, until fear makes them abandon the invasion. The play is comic, but its point is serious: when we judge an unfamiliar culture by our own assumptions, and refuse to ask questions, we can draw absurd and costly conclusions.',
  sol: 'A stand + the chain of misunderstandings + their effect on the outcome + a wider comment.',
}));
Q('la_title', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Comment on the appropriateness of the title *The Book That Saved the Earth*. Answer in 100–120 words.',
  model: 'The title is apt because it states, in a few words, the surprising heart of the play. Earth is not saved by armies, weapons or scientists, but by a book of nursery rhymes found in a small-town library. The title makes the audience curious from the start, since a book seems the least likely of heroes. It also carries the play\'s irony. The book saves Earth not because of its wisdom, but because the Martians completely misunderstand it. Finally, the title hints at a wider idea about the power of books and of reading. In these ways the title captures the plot, the humour and the message of the play.',
  sol: 'A stand + the plot point the title names + curiosity and irony + the wider message + conclusion.',
}));
Q('la_humour', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Claire Boiko use humour and satire in *The Book That Saved the Earth*? Answer in 100–120 words.',
  model: 'Boiko builds the comedy mainly on misunderstanding. Think-Tank, who boasts about his huge brain, confidently mistakes books for food and then for listening devices, while the obedient crew act on every order. The audience knows what books are for, so we laugh at the gap between his certainty and his ignorance. The literal readings of nursery rhymes add more humour, especially when the boastful leader flees from a picture of an egg-shaped figure. Beneath the fun lies satire. Through Think-Tank, Boiko mocks arrogant leaders who refuse advice, and through the crew she mocks blind obedience. The humour therefore entertains young audiences while quietly teaching them about pride, humility and clear thinking.',
  sol: 'Sources of humour with examples + the targets of the satire + the effect on the audience.',
}));
Q('la_noodle_diary', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Noodle. Write a diary entry on the evening the invasion of Earth was called off. Answer in 100–120 words.',
  model: 'Mars, late evening\n\nWhat a strange day! Our crew landed beside an Earth building full of shelves, and the great Think-Tank declared that the objects on them were food, and the crew obediently tested them. Then they were supposed to be devices for listening. I wondered whether the marks inside were meant to be looked at, and at last the crew read one. It was a book of children\'s rhymes, but Think-Tank read them as war reports. When he saw a picture of an egg-shaped figure that looked like him, he panicked and called everyone home. I did not dare to laugh. I only hope that one day our leader learns to listen before he decides.',
  sol: 'Diary format (place/time, first person, reflection). Content consistent with the play: the landing, the wrong guesses, Noodle\'s suggestion, the rhymes, the panic + Noodle\'s humble, observant voice.',
}));
Q('la_omega_report', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Captain Omega. Write a report to the Martian high command explaining why the mission to Earth failed. Answer in 100–120 words.',
  model: 'Report on the Earth mission\nFrom: Captain Omega\n\nOur crew landed safely beside a building on Earth that held thousands of identical objects on shelves. Acting on Think-Tank\'s orders, we tested them first as food and then as listening devices, without success. On a suggestion from his assistant, we examined the marks inside and managed to read one volume. Think-Tank interpreted its verses as evidence that Earth has advanced space travel and a plan against him personally, and he ordered an immediate withdrawal. In my view, the mission failed because we did not understand Earth before acting. I recommend that any future mission study the planet\'s language and customs first, and question every guess before obeying it.',
  sol: 'Report format (title, from, factual account, recommendation). Content consistent with the play + a reasoned explanation of the failure.',
}));
Q('la_values', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'What values and lessons does *The Book That Saved the Earth* offer young readers? Answer in 100–120 words.',
  model: 'Beneath its comedy, the play teaches several lessons. The first is humility. Think-Tank believes his brain is the greatest in the universe, yet his pride makes him look foolish. The second is the value of listening, since the best idea comes from Noodle, the junior whom Think-Tank ignores. Third, the play warns against blind obedience: the crew follow absurd orders without asking a single question. Fourth, it shows the danger of jumping to conclusions about something unfamiliar, as the Martians do with books and rhymes. Finally, it celebrates books themselves, which carry a culture\'s imagination. Young readers learn that open minds, modesty and careful thinking matter more than power or confidence.',
  sol: 'Four or five values (humility, listening, questioning, not jumping to conclusions, the worth of books), each linked to the play + a conclusion.',
}));
Q('la_books', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'In the play, a book saves the Earth. Do books still matter in a world of screens? Give your view with reference to the play. Answer in 100–120 words.',
  model: 'Books still matter, and the play hints at why. For the Martians, books are mysterious objects, yet they hold a whole culture\'s imagination, even in a simple collection of nursery rhymes. That is what makes Earth seem powerful to the invaders. Today we read on screens as well as on paper, but the need for books remains. A book asks for patient, careful reading, the very skill Think-Tank lacks when he jumps to conclusions. Libraries, like the one where the Martians land, give everyone free access to stories and knowledge. Screens are useful, but books train attention and imagination. In my view, a society that stops reading would be as easy to fool as Think-Tank.',
  sol: 'A clear stand + reference to the play (the library, the rhymes, careless reading) + reasons + a conclusion.',
}));

// ================================================================ objective items (12 MCQs, keys 3/3/3/3)
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*The Book That Saved the Earth* in *Footprints without Feet* was written by…', opts: ['Claire Boiko', 'H. G. Wells', 'Victor Canning', 'Robert Arthur'], sol: 'Claire Boiko wrote the play.' }));
Q('mc_genre', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which description best fits *The Book That Saved the Earth*?', opts: ['a comic science-fiction play', 'a tragic historical drama', 'a detective short story', 'a poem about nature'], sol: 'It is a funny play about a Martian invasion.' }));
Q('mc_base', mcq({ t: 1, d: 1, c: 'recall', stem: 'From where does Think-Tank direct the invasion in the play?', opts: ['from Mars', 'from the Moon', 'from inside the library', 'from the probe on Earth'], sol: 'He stays on Mars and gives orders through a screen.' }));
Q('mc_noodle_role', mcq({ t: 3, d: 1, c: 'recall', stem: 'What is Noodle\'s position in *The Book That Saved the Earth*?', opts: ['Think-Tank\'s young assistant', 'the captain of the crew', 'a librarian on Earth', 'the ruler of Mars'], sol: 'Noodle assists Think-Tank on Mars.' }));
Q('mc_first_guess', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was Think-Tank\'s first explanation of the books in the library?', opts: ['They were some kind of food.', 'They were weapons.', 'They were maps.', 'They were musical instruments.'], sol: 'He first decided the books were food.' }));
Q('mc_book', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which book do the Martians read in the play?', opts: ['*Mother Goose*, a book of nursery rhymes', 'an encyclopedia of space', 'a book on Earth\'s armies', 'a dictionary of Earth languages'], sol: 'They read *Mother Goose*.' }));
Q('mc_cow', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did the rhyme about the cow and the moon make Think-Tank believe about Earth?', opts: ['that Earth had advanced space travel', 'that Earth\'s cows were dangerous', 'that Earth had no moon', 'that Earth people were friendly'], sol: 'He took the nonsense rhyme as evidence of advanced space travel.' }));
Q('mc_humpty', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why did the picture of the egg-shaped figure frighten Think-Tank?', opts: ['It looked like him, and the rhyme told of its fall.', 'It showed an Earth soldier.', 'It was a map of Mars.', 'It showed Noodle taking his place.'], sol: 'He saw himself in the figure and read its fall as a threat.' }));
Q('mc_trait', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which trait of Think-Tank most directly causes the failure of the invasion?', opts: ['his pride and refusal to doubt his own guesses', 'his kindness to the crew', 'his love of reading', 'his patience with Noodle'], sol: 'Overconfidence leads to every misreading.' }));
Q('mc_theme', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'd', stem: 'Which theme is most central to *The Book That Saved the Earth*?', opts: ['the pain of losing a family', 'the struggle between rich and poor', 'the beauty of the countryside', 'the comedy and danger of misunderstanding'], sol: 'The plot moves through one misunderstanding after another.' }));
Q('mc_apply', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'A team captain ignores a junior player\'s sensible tactic, insists on his own plan and loses the match. Which pair from *The Book That Saved the Earth* does this situation most resemble?', fixed: true, key: 'b', opts: ['Captain Omega and Lieutenant Iota', 'Think-Tank and Noodle', 'the Historian and the audience', 'Sergeant Oop and the librarian'], sol: 'A proud leader who ignores a sensible junior mirrors Think-Tank and Noodle.' }));
Q('mc_tone', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What is the overall tone of *The Book That Saved the Earth*?', fixed: true, key: 'c', opts: ['tragic and gloomy', 'angry and bitter', 'light-hearted and satirical', 'solemn and religious'], sol: 'The play is comic, with gentle satire of pride and blind obedience.' }));

Q('fb_assistant', fb({ t: 3, d: 1, c: 'recall', stem: 'In *The Book That Saved the Earth*, Think-Tank\'s humble young assistant is ___.', acc: [['Noodle']], sol: 'The assistant is **Noodle**.' }));
Q('fb_planet', fb({ t: 1, d: 1, c: 'recall', stem: 'The would-be invaders in Claire Boiko\'s play come from the planet ___.', acc: [['Mars']], sol: 'They are from **Mars**.' }));
Q('fb_place', fb({ t: 1, d: 2, c: 'recall', marks: 2, stem: 'The Martian crew land beside a public ___, where they find shelves full of ___.', acc: [['library'], ['books', 'book']], sol: 'They land beside a **library** full of **books**.', scheme: [['library', 1], ['books', 1]] }));
Q('fb_book_name', fb({ t: 1, d: 2, c: 'recall', stem: 'The book of nursery rhymes that the Martians read is called *Mother ___*.', acc: [['Goose']], sol: 'The book is *Mother **Goose***.' }));

Q('ar_retreat', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Think-Tank ordered the Martians to abandon the invasion of Earth.', r: 'Think-Tank believed that a nursery rhyme described a plan to destroy him.', key: 'a', sol: 'Both are true, and his fear of the rhyme explains the retreat.' }));
Q('ar_noodle', ar({ t: 3, d: 3, c: 'understanding', a: 'Noodle was the leader of the Martian expedition to Earth.', r: 'Noodle suggested that the marks in the books were meant to be looked at.', key: 'd', sol: 'A is false: Think-Tank led; Noodle was his assistant. R is true.' }));
Q('ar_listen', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'The crew held the books up to their ears.', r: 'The crew were experts in Earth\'s languages and customs.', key: 'c', sol: 'A is true. R is false: the crew knew nothing about Earth, which is why they misused the books.' }));
Q('ar_humour', ar({ t: 2, d: 3, c: 'analysis', a: 'Think-Tank has an unusually large head.', r: 'The play is set partly in the distant future.', key: 'b', sol: 'Both are true, but the future frame has nothing to do with the size of Think-Tank\'s head.' }));

Q('tf_tt_earth', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: in *The Book That Saved the Earth*, Think-Tank travels to Earth with the crew.', ans: false, sol: 'He stays on Mars and directs them from a screen.' }));
Q('tf_battle', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Earth\'s armies defeat the Martians in a great battle.', ans: false, sol: 'There is no battle; the invasion collapses because of a misread book.' }));
Q('tf_noodle_polite', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: Noodle stays polite even when Think-Tank brushes his ideas aside.', ans: true, sol: 'Noodle remains courteous and patient throughout.' }));
Q('tf_rhymes', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: Think-Tank understands that nursery rhymes are nonsense verses for children.', ans: false, sol: 'He reads them as factual military reports.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *The Book That Saved the Earth* in the order in which they happen.',
  items: ['A historian from the future introduces the story.', 'The Martian crew land beside a small-town library.', 'Think-Tank declares that the books are food.', 'The crew try to listen to the books.', 'The Martians read a book of nursery rhymes.', 'Think-Tank calls off the invasion in panic.'],
  sol: 'Frame → landing → food → listening → reading → retreat.',
}));
Q('ord_reasoning', ord({
  t: [2, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the steps of Think-Tank\'s reasoning that lead to the end of the invasion.',
  items: ['He reads the rhymes as factual reports.', 'He concludes that Earth has advanced space travel.', 'He sees an egg-shaped figure that resembles him.', 'He takes the figure\'s fall as a threat to himself.', 'He orders the Martians to leave Earth.'],
  sol: 'Literal reading → wrong conclusion → resemblance → fear → retreat.',
}));

Q('mt_people', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character in *The Book That Saved the Earth* with their part in the play.',
  pairs: [['Think-Tank', 'the boastful leader of Mars'], ['Noodle', 'the humble, sensible assistant'], ['Captain Omega', 'commander of the crew on Earth'], ['the Historian', 'narrator from the future']],
  sol: 'The characters and their roles.',
}));
Q('mt_misreadings', match({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each thing the Martians meet in *The Book That Saved the Earth* with how Think-Tank interprets it.',
  pairs: [['the books on the shelves', 'food'], ['the books held to the ear', 'listening devices'], ['the rhyme of the cow and the moon', 'proof of advanced space travel'], ['the egg-shaped figure', 'a threat to himself']],
  sol: 'Each object or rhyme and Think-Tank\'s misreading of it.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for writing about *The Book That Saved the Earth* with their meanings.',
  pairs: [['arrogant', 'having too high an opinion of oneself'], ['apprentice', 'a young person learning from an expert'], ['invasion', 'an attack to take over a place'], ['satire', 'humour that mocks human faults']],
  sol: 'Key words for writing about the play.',
}));
