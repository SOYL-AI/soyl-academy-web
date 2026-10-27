// CBSE 10 English Language and Literature, ch09 "Mijbil the Otter" (Gavin Maxwell) — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the extract appears
// here. Passages are SOYL commentary about an episode (passage_origin: soyl-commentary); stems refer to
// events in SOYL's own words. Students read the text itself in their textbook, First Flight.
// Topics: t01 context and summary · t02 themes and message · t03 characters (Mij's behaviour and the
// author's responses) · t04 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the size of the travel box, clock
// times, the length of the flights, and the full list of guesses made by Londoners.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on Gavin Maxwell's account, not an extract from it. Read the chapter itself in your textbook, First Flight.)*";
const SRC_STEM = `*Mijbil the Otter*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the account (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the account', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the account, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the account', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_arrival', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Maxwell's otter does not arrive by accident. Before the journey to southern Iraq, he had already decided that an otter would suit his remote Scottish home, where water lay all around the house. A friend assured him that otters were plentiful in the Tigris marshes and that local people sometimes raised them as pets. The two men stopped at Basra, where letters from home were expected, and Maxwell's were slow to come. Then, returning to his room one day, the writer found two Arab men waiting for him. They carried a sack, the sack held a young otter, and the otter was a gift from that same friend. A wish had suddenly become a responsibility.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which region did Maxwell get his otter?', opts: ['the marshes of southern Iraq', 'the highlands of Scotland', 'the riverbanks of London', 'the coast of France'], sol: 'The otter came from the Tigris marshes of southern Iraq; Maxwell received it at Basra.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The friend said otters were common in the marshes of the river ___.', acc: [['Tigris']], sol: 'Otters were plentiful in the **Tigris** marshes.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why were Maxwell and his friend staying in Basra?', opts: ['to wait for letters from home', 'to buy an otter at the market', 'to catch a flight to London at once', 'to visit a sheikh in the city'], sol: 'They stopped at Basra because letters from home were expected there.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *a wish had suddenly become a responsibility*?', model: 'Maxwell had only wanted an otter in theory; now a live animal depended on him for food, care and safety.', sol: 'Owning the animal brings duties that merely wishing for it did not.', scheme: [['The wish is now a living creature that depends on him', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why did an otter seem a suitable pet for Maxwell’s home in Scotland?', opts: ['The house was surrounded by water, which otters need.', 'Otters are cheaper to feed than dogs.', 'Dogs were not allowed in Scotland.', 'His neighbours already kept otters.'], sol: 'His Scottish home had water on every side, an ideal setting for an animal that lives in and around it.' })),
  ],
  sol: 'Parts (a)–(c) are facts from the account; parts (d) and (e) ask for inference.',
}));
Q('src_first_days', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The first meeting between man and otter is cautious. For a full day Mij keeps to himself, showing no warmth and no aggression, and sleeps on the floor at the far side of the room. Maxwell does not force himself on the animal. On the second night, however, Mij climbs onto the bed, curls up beside the sleeping writer and stays there till morning. Trust, once given, grows fast. In the bathroom the otter discovers the tub, and his happiness is obvious as he splashes, dives and rolls. Before long he has even worked out how to turn on the tap by himself.",
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'How did Mij behave during his first day with Maxwell?', opts: ['He kept to himself, showing no warmth and no aggression.', 'He bit Maxwell repeatedly.', 'He followed Maxwell everywhere.', 'He refused to eat and fell ill.'], sol: 'For a day he kept to himself, showing no warmth and no aggression, and slept away from the bed.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did Mij sleep on the second night?', opts: ['on Maxwell’s bed, close to him', 'inside the bathtub', 'in the sack he had arrived in', 'outside the door of the room'], sol: 'On the second night he climbed onto the bed and slept against the writer until morning.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Mij soon learnt to turn on the bath ___ on his own.', acc: [['tap']], sol: 'He worked out how to turn on the **tap** himself.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Maxwell’s behaviour on the first day show about him as an owner?', model: 'He is patient; he lets the frightened animal approach him in its own time instead of forcing it.', sol: 'Patience: he gives the otter space and lets trust come naturally.', scheme: [['Patient / respects the animal’s pace', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does Mij’s delight in the bathtub suggest about him?', opts: ['Water is his natural element and gives him great joy.', 'He was dirty and needed a wash.', 'He was trying to escape through the drain.', 'He was afraid of the water.'], sol: 'An otter is a water animal; the bath let his true nature come out.' })),
  ],
  sol: 'Track the change: distance on day one, trust on night two, joy in the water.',
}));
Q('src_play', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Much of the charm of the account comes from watching Mij play. He spends long stretches of time with a rubber ball and with marbles, and he can keep small objects moving from paw to paw with the skill of a circus performer. He invents games of his own instead of waiting for a human to entertain him. Maxwell describes all this closely and with obvious affection, the way a parent might describe a lively child. The reader comes away with a picture of an animal that is clever, curious and full of energy, and of an owner who never tires of watching him.",
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'Which toys did Mij enjoy playing with?', opts: ['a rubber ball and marbles', 'a skipping rope and blocks', 'a tin drum and a whistle', 'paper boats and kites'], sol: 'He played for long stretches with a rubber ball and marbles.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'Mij kept small objects moving from paw to paw, almost as if he were ___.', acc: [['juggling']], sol: 'His paw-play looked like **juggling**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What do Mij’s self-invented games show about him?', opts: ['He is intelligent and inventive.', 'He is lonely and bored.', 'He is lazy and slow.', 'He is aggressive towards people.'], sol: 'Making up his own games shows intelligence and an inventive mind.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary compare Maxwell’s descriptions to those of a parent?', model: 'He watches Mij’s games with the fond, patient attention a parent gives a lively child.', sol: 'The comparison points to his affection and close attention.', scheme: [['Shows his fond, close attention, like a parent’s', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is the main effect of these descriptions of play on the reader?', opts: ['Mij comes alive as a lovable individual with a personality.', 'The reader learns the rules of new games.', 'The reader is warned that otters are dangerous.', 'Maxwell is shown to be strict and cold.'], sol: 'Close, affectionate detail turns Mij into a character the reader cares about.' })),
  ],
  sol: 'Separate recall of the games (a, b) from what they reveal (c–e).',
}));
Q('src_box', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The journey to England is where Maxwell's troubles begin. The British airline will not carry animals, so he has to fly to Paris first and then on to London, and the airline insists that the otter travel in a small box placed on the floor at its owner's feet. Maxwell decides that Mij should spend some time in the box before the journey, to grow used to it, and leaves him alone while he eats. It is a mistake. Mij fights desperately to get out, destroying the box's inner lining and injuring himself until he bleeds. The writer's guilt is plain, and so is the lesson: a wild creature does not accept a cage quietly.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Why could Maxwell not fly straight to London with the otter?', opts: ['The British airline would not carry animals.', 'There were no flights to London that week.', 'Otters were banned in Britain.', 'He wanted to visit friends in Paris.'], sol: 'Animals were not allowed on the British airline, so he had to travel via Paris.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Maxwell had to fly first to ___ and then to London.', acc: [['Paris']], sol: 'The route went through **Paris**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What happened while Mij was left alone in the box?', opts: ['He destroyed its lining and hurt himself.', 'He fell fast asleep and stayed calm.', 'He escaped into the street.', 'The airline took the box away.'], sol: 'His frantic efforts to get out wrecked the lining and left him bleeding.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What lesson does the commentary draw from the episode of the box?', model: 'A wild animal suffers terribly when shut in, so owners must think about the creature’s nature, not just their convenience.', sol: 'Confinement is torture to a wild creature; an owner must respect that.', scheme: [['Wild animals cannot bear confinement; owners must respect their nature', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why did Maxwell put Mij in the box well before leaving?', opts: ['He hoped Mij would grow used to it.', 'He wanted to punish Mij for misbehaving.', 'The airline had asked him to do so.', 'He needed Mij to sleep during dinner.'], sol: 'He meant well: he thought time in the box would help the otter settle.' })),
  ],
  sol: 'Parts (a)–(c) recall the episode; (d) and (e) interpret Maxwell’s intention and its result.',
}));
Q('src_flight', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "On the aeroplane the trouble becomes comedy. Mij gets out of the box and disappears along the cabin, and passengers who glimpse a strange dark animal racing past react with alarm; one woman decides it must be a rat. Maxwell, trying to recover his pet, ends up more embarrassed than anyone. What saves the day is the calm kindness of the air hostess. She helps him get the otter back and lets him keep Mij close to him for the rest of the flight. Maxwell's warm memory of her is one of the account's quiet tributes to ordinary human decency.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did one frightened passenger take Mij to be?', opts: ['a rat', 'a cat', 'a snake', 'a puppy'], sol: 'One woman mistook the otter for a rat.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes the air hostess in this episode?', opts: ['understanding', 'angry', 'frightened', 'careless'], sol: 'She stays calm, helps Maxwell and lets him keep the otter with him.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Instead of panicking, the air hostess stayed ___ and helped Maxwell.', acc: [['calm', 'composed', 'cool']], sol: 'She remained **calm** while the passengers panicked.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say that *the trouble becomes comedy*?', model: 'Panicking passengers, a vanished otter and a flustered owner make a funny scene to read, though it was stressful at the time.', sol: 'Danger turns into a comic scene of chaos and embarrassment.', scheme: [['The chaos is told humorously, not tragically', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does Maxwell’s warm memory of the air hostess suggest?', opts: ['He values kindness shown by strangers.', 'He thought she should have been punished.', 'He had known her for many years.', 'He believed she was afraid of animals.'], sol: 'His gratitude shows how much a stranger’s calm help meant to him.' })),
  ],
  sol: 'Notice the shift in tone: from the guilt of the box to the comedy of the cabin.',
}));
Q('src_london', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Once in London, Maxwell takes Mij out for walks on a lead, much as another owner would walk a dog. The otter is a puzzle to everyone they meet. Few Londoners have ever seen such an animal, and their guesses about what it might be range from the reasonable to the absurd, which the writer reports with obvious enjoyment. The joke has a serious edge. Mij was not merely unfamiliar to the public: zoologists later decided that his kind of otter had never been described before, and they named it after Maxwell himself. A pet bought out of a whim turned out to be a small contribution to natural history.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'How did Maxwell take Mij out in London?', opts: ['on a lead, like a dog', 'in a covered basket', 'inside his coat pocket', 'in the box from the journey'], sol: 'He walked the otter on a lead through the streets.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Why were Londoners puzzled by Mij?', opts: ['They had never seen such an animal and could not identify it.', 'He spoke like a parrot.', 'He was painted in bright colours.', 'He was far larger than a horse.'], sol: 'The animal was unfamiliar, so people made wild guesses about it.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'Mij’s race of otter was new to science and was named after ___.', acc: [['Maxwell', 'Gavin Maxwell', 'the author', 'the writer']], sol: 'It became known as Maxwell’s otter, after **Maxwell**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What is the *serious edge* to the joke about the Londoners’ guesses?', model: 'Mij was genuinely unknown, even to scientists, who later recognised a new race of otter and named it after Maxwell.', sol: 'The public’s ignorance mirrors a real gap in scientific knowledge.', scheme: [['Even science had not known his race; it was named after Maxwell', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What tone does Maxwell use when he reports the guesses of passers-by?', opts: ['amused', 'bitter', 'fearful', 'mournful'], sol: 'He enjoys their confusion and reports it with gentle humour.' })),
  ],
  sol: 'Link the comic guesses to the scientific discovery that follows.',
}));
Q('src_bond', source({
  t: [2, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Read as a whole, the account is a study of a relationship. It begins with distance and ends with a closeness in which the otter follows his owner, plays at his feet and sleeps beside him. Maxwell earns this through patience, through close attention to what the animal likes, and through a readiness to put up with wet floors and public embarrassment. Yet the episode of the box reminds us that love alone is not enough. Keeping a wild animal far from its home asks a great deal of the owner and of the animal, and a thoughtful reader may wonder whether such a creature truly belongs in a city flat.",
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, how does the relationship between Maxwell and Mij change?', opts: ['from distance to closeness', 'from friendship to hatred', 'from fear to indifference', 'from play to boredom'], sol: 'It moves from Mij’s early aloofness to a close bond.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality of Maxwell’s does the commentary stress most?', opts: ['patience', 'strictness', 'wealth', 'impatience'], sol: 'Patience and attention are what win the otter’s trust.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary suggests that love alone is not ___ when keeping a wild animal.', acc: [['enough', 'sufficient']], sol: 'Love alone is not **enough**; the animal’s nature also matters.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Do you think a wild animal like Mij belongs in a city flat? Give one reason.', model: 'Probably not; an otter needs water and space, and the box episode shows how much it suffers when confined.', sol: 'Either view is acceptable if supported by the account (the box episode, or the bond and care Maxwell gives).', scheme: [['A view supported by one reason from the account', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which episode does the commentary use to show that love alone is not enough?', opts: ['the episode of the box before the flight', 'the games with marbles', 'the walks in London', 'the joy in the bathtub'], sol: 'The box episode shows the suffering confinement causes, despite Maxwell’s affection.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_why_otter', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Gavin Maxwell want an otter rather than a dog, and how did he come to own Mij? Answer in 40–50 words.',
  model: 'Maxwell lived in a remote Scottish house with water on every side, a fitting place for an otter. A friend told him otters were common in the Tigris marshes. While they waited for letters in Basra, two Arabs brought him an otter in a sack, a gift from that friend.',
  sol: 'The reason (water all around his Scottish home) + the friend’s advice + how Mij actually reached him in Basra.',
}));
Q('sa_trust', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'How did Mij come to trust Maxwell within his first two days? What does this tell you about both of them? Answer in 40–50 words.',
  model: 'For a day Mij kept apart, sleeping on the floor far from the bed. Maxwell let him be. On the second night the otter climbed onto the bed and slept against him. Mij was cautious but quick to bond, and Maxwell was patient enough to let trust grow.',
  sol: 'Day one (aloof) + night two (on the bed) + inference about both (cautious otter; patient owner).',
}));
Q('sa_water', short({
  ...SA3, t: [3, 2], d: 2, c: 'understanding',
  stem: 'Describe Mij’s behaviour with water in the bathroom. What does it reveal about him? Answer in 40–50 words.',
  model: 'In the bathroom Mij was overjoyed, rolling, splashing and diving in the tub. He soon worked out by himself how to turn on the tap. This shows that water is his natural home and that he is clever, observant and quick to learn new skills.',
  sol: 'What he did (wild play in the bath; learnt to turn the tap) + what it reveals (water-loving; intelligent).',
}));
Q('sa_box', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'What happened when Maxwell left Mij alone in the travelling box before the flight, and why did it happen? Answer in 40–50 words.',
  model: 'Maxwell shut Mij in the box early so he could settle, and went to eat. Meanwhile Mij, desperate to get out, wrecked the box’s lining and hurt himself until he bled. A wild animal used to freedom panicked at being trapped and fought to escape.',
  sol: 'Why the box was used early + what Maxwell found + the reason (a wild creature’s panic at confinement).',
}));
Q('sa_hostess', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'What part did the air hostess play during Mij’s flight, and how does Maxwell feel about her? Answer in 40–50 words.',
  model: 'When Mij escaped and passengers panicked, the air hostess stayed calm and helped Maxwell recover him. Instead of complaining, she allowed him to keep the otter close to him for the rest of the journey. Maxwell remembers her kindness with real gratitude.',
  sol: 'What she did (stayed calm, helped recover Mij, let him keep the otter) + Maxwell’s gratitude.',
}));
Q('sa_chaos', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'Why is the scene on the aeroplane both alarming and funny? Answer in 40–50 words.',
  model: 'It was alarming because a wild animal was loose in a crowded cabin and Maxwell feared losing him. It is funny because passengers panicked, one woman mistook Mij for a rat, and the writer himself was flustered and red-faced. Maxwell tells it lightly, so readers laugh at the confusion.',
  sol: 'The real danger + the comic details + how Maxwell’s light telling makes it humorous.',
}));
Q('sa_london_guesses', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'How did people in London react to Mij, and why did their reactions amuse Maxwell? Answer in 40–50 words.',
  model: 'Londoners had never seen an otter like Mij, so they stopped and guessed what he could be, often getting it absurdly wrong. Maxwell found their confusion entertaining. Their ignorance was also understandable, because scientists themselves had not yet identified Mij’s race of otter.',
  sol: 'Reaction (wild guesses) + why it amused him + the link to science not knowing the race either.',
}));
Q('sa_mij_character', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Mij is more than a pet; he has a personality. Mention three traits of Mij, each with evidence. Answer in 40–50 words.',
  model: 'Mij is playful, spending hours with his ball and marbles. He is intelligent, learning to turn on the bath tap without help. He is also affectionate once he trusts someone, sleeping beside Maxwell from the second night. His fierce struggle in the box shows a wild, independent spirit.',
  sol: 'Any three traits with evidence: playful, intelligent, affectionate, independent/wild, curious, water-loving.',
}));
Q('sa_maxwell_owner', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of pet owner is Maxwell? Support your answer with evidence. Answer in 40–50 words.',
  model: 'Maxwell is patient, giving Mij time to come to him on the first day. He is attentive, noticing every detail of Mij’s games. He makes mistakes, as the box episode shows, but he admits them honestly. He also accepts trouble and embarrassment cheerfully for his pet’s sake.',
  sol: 'A judgement + two or three supported points (patient, attentive, honest about mistakes, tolerant).',
}));
Q('sa_science', short({
  ...SA3, t: [1, 2], d: 3, c: 'application',
  stem: 'Scientists had never described Mij’s kind of otter before. Why is this detail important in the account? Answer in 40–50 words.',
  model: 'It shows that Mij was a truly rare animal, not an ordinary pet. Maxwell’s curiosity ended up adding to scientific knowledge, since the race was named after him. It also explains why Londoners could not identify him: even experts had never described such an otter.',
  sol: 'Rarity of Mij + Maxwell’s contribution to science (the name) + link to the Londoners’ puzzlement.',
}));
Q('sa_humour', short({
  ...SA3, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'Maxwell’s account is full of humour. Do you agree? Give two examples in 40–50 words.',
  model: 'Yes. The flight scene is comic: Mij disappears down the cabin, one passenger thinks he is a rat, and the author is left flustered and embarrassed. In London, people’s wild guesses about Mij are reported with gentle amusement. Even mishaps are told lightly, so we smile while sympathising.',
  sol: 'A stand + two examples (the flight, the London guesses, the bath chaos) + how the telling creates humour.',
}));
Q('sa_responsibility', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'What does the chapter teach about the responsibilities of keeping an unusual pet? Answer in 40–50 words.',
  model: 'An unusual pet needs patience, time and constant attention, as Maxwell gives Mij. The owner must understand the animal’s nature, such as an otter’s need for water and its horror of confinement. He must also accept inconvenience and embarrassment, as Maxwell does on the flight.',
  sol: 'Two or three responsibilities drawn from the account (patience, understanding its nature, accepting trouble).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_name', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Where did Maxwell receive his otter, and from whom did it come? Answer in 30–40 words.',
  model: 'Maxwell received the otter at Basra in southern Iraq. It was sent to him by the friend who had suggested the Tigris marshes, and two Arabs delivered it to his room in a sack.',
  sol: 'Place (Basra, southern Iraq) + source (the friend; delivered in a sack).',
}));
Q('sb_second_night', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What change in Mij’s behaviour did Maxwell notice on the second night? Answer in 30–40 words.',
  model: 'On the first night Mij had kept to the floor, far from his new owner. On the second night he climbed onto the bed and slept curled up close to Maxwell until morning, a clear sign of growing trust.',
  sol: 'The change (from the floor to the bed beside Maxwell) + what it signals (trust).',
}));
Q('sb_airline', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'What rules did the airline set for Mij’s journey? Answer in 30–40 words.',
  model: 'The British airline would not take animals, so Maxwell had to fly via Paris. That airline insisted the otter travel in a small box kept on the floor at its owner’s feet throughout the flight.',
  sol: 'No animals on the British airline (so via Paris) + the box at the owner’s feet.',
}));
Q('sb_toys', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How did Mij amuse himself with toys? Answer in 30–40 words.',
  model: 'Mij played for long periods with a rubber ball and marbles. He could keep little objects moving from one paw to the other, almost like a juggler, and he made up games of his own.',
  sol: 'The toys (ball, marbles) + how he played (juggling-like paw play, inventing games).',
}));
Q('sb_guilt', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'Why did Maxwell feel guilty after the episode of the box? Answer in 30–40 words.',
  model: 'He had shut Mij in the box himself, meaning well, and then left him alone. The otter’s torn lining and bleeding showed how much he had suffered, so Maxwell felt responsible for that distress.',
  sol: 'His own decision + the suffering it caused + his sense of responsibility.',
}));
Q('sb_lead', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'Walking an otter on a lead in a city is unusual. What does this tell you about Maxwell? Answer in 30–40 words.',
  model: 'It shows that Maxwell was unconventional and did not mind public attention. He treated Mij as a companion who needed daily exercise, and he cared more for his pet’s needs than for what strangers thought.',
  sol: 'An inference (unconventional, devoted) + a reason linked to the walks.',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_mij_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Mij, the otter, as Maxwell presents him. Answer in 100–120 words.',
  model: 'Mij comes across as a creature with a real personality. At first he is cautious, keeping his distance from his new owner for a whole day. Once he trusts Maxwell, he is deeply affectionate, sleeping beside him from the second night. He is playful and inventive, spending hours with his ball and marbles and keeping small objects moving from paw to paw. He is clever too, teaching himself to turn on the bath tap. Water makes him blissfully happy, which reminds us of his true nature. That wildness shows painfully in the box, where he fights to escape. Mij is lovable, intelligent and independent: a companion, but never simply a toy.',
  sol: 'Four or five traits with evidence in your own words: cautious, affectionate, playful/inventive, intelligent, water-loving, wild/independent. End with an overall judgement.',
}));
Q('la_bond', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'Trace how the relationship between Maxwell and Mij develops through the account. Answer in 100–120 words.',
  model: 'The relationship begins with distance. When the otter arrives in a sack at Basra, he keeps away from Maxwell for a whole day. Maxwell wisely leaves him alone, and by the second night Mij is sleeping close to him. The bathroom becomes their shared playground, and the writer watches every game with delight. The journey tests the bond: Maxwell’s decision to shut Mij in the box causes the animal great distress, and the writer is full of remorse. On the aeroplane he chases and rescues his pet. In London they walk the streets together like a dog and owner. Patience on one side and trust on the other turn a stranger into a companion.',
  sol: 'Stages in order: aloofness → trust on the second night → play and attention → the test of the journey → companionship in London. Conclude with what made the bond possible.',
}));
Q('la_wild_pets', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Should wild animals like otters be kept as pets? Give your view, using evidence from *Mijbil the Otter*, in 100–120 words.',
  model: 'In my view, wild animals should not normally be kept as pets, even by loving owners. Maxwell clearly cared for Mij: he was patient, attentive and willing to put up with chaos. Yet the account itself shows the problem. Mij was happiest in water, which a city flat can offer only in a bathtub. When shut in a travelling box, he fought so hard to escape that he bled. Passengers panicked, and strangers could not even tell what he was. A wild creature has needs that ordinary homes cannot meet. Love for animals is better shown by protecting their habitats, as in the marshes Mij came from, than by taking them far away from them.',
  sol: 'A clear stand + evidence from the account (the box, the need for water, the flight, the bond) + a conclusion. A reasoned opposite view (with proper care, such a bond enriches both) can also earn full marks.',
}));
Q('la_diary_hostess', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the air hostess on Maxwell’s flight. Write a diary entry about the day an otter escaped in the cabin, in 100–120 words.',
  model: 'Tonight\n\nWhat a flight! A polite gentleman was travelling with an otter in a box at his feet, and I had promised to help if needed, never imagining I would. Halfway through, the animal slipped out and shot off down the cabin. Passengers panicked, and one lady was convinced it was a rat. The poor gentleman was red with embarrassment as he tried to catch it. I helped him find the little creature and, seeing how frightened it was, let him hold it for the rest of the journey. It settled at once. I learnt something today: a calm voice can end a panic, and a frightened animal needs comfort, not a cage.',
  sol: 'Diary format (date/time, first person, past tense, feelings). Content consistent with the account: Maxwell’s confidence, the escape, the panic, the rat mistake, her help in letting him keep the otter. A personal reflection at the end.',
}));
Q('la_letter_friend', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Write a letter from Maxwell to the friend who sent him Mij, describing the otter’s first weeks with him. Answer in 100–120 words.',
  model: 'Dear friend,\n\nI must thank you for the most remarkable gift of my life. When your otter arrived in a sack, he ignored me for a whole day, and I feared we would never be friends. By the second night he was curled up beside me on the bed. I have named him Mijbil, Mij for short. Water makes him blissfully happy; he has even learnt to turn on the tap himself. He plays for hours with marbles, passing them from paw to paw. The journey home frightened me: he tore his box apart before the flight and escaped in the cabin. Now he walks beside me through London, puzzling everyone.\n\nWith gratitude,\nGavin',
  sol: 'Informal letter format (greeting, body, sign-off). Content: arrival, early aloofness, the second night, water and play, the journey, London. Warm, personal tone consistent with the account.',
}));
Q('la_techniques', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Maxwell make his account of an otter so engaging for readers? Discuss his methods in 100–120 words.',
  model: 'Maxwell writes in the first person, so we share his feelings directly, from delight to guilt. He observes closely, describing Mij’s games, his joy in water and his way of sleeping in vivid detail, so the otter becomes a real character. Humour runs through the account: the chaos in the aeroplane cabin and the Londoners’ absurd guesses make us laugh. He is honest about his own mistakes, especially the episode of the box, which makes him trustworthy and human. He also gives the story a structure of small adventures, from Basra to Paris to London. Detail, humour and honesty together turn a simple pet story into a memorable account.',
  sol: 'Methods with examples: first-person narration, close observation and detail, humour (flight, guesses), honesty about mistakes, episodic structure. Conclude with the overall effect.',
}));
Q('la_title_mij', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Is *Mijbil the Otter* a suitable title for this chapter, or would one focused on Maxwell suit it better? Give your view in 100–120 words.',
  model: 'The title suits the chapter well, because Mij is its true centre. Almost every episode is about him: his arrival in a sack, his slow trust, his joy in water, his games with marbles, his struggle in the box and his escape on the aeroplane. Even the comedy in London depends on people’s confusion about him. Maxwell is important as the narrator, and his patience matters, but he mostly watches and responds to the otter. Naming the chapter after the animal also hints at Maxwell’s respect for Mij as an individual with a name and personality, not simply a pet. A title about Maxwell would shift attention away from the creature who makes the account memorable.',
  sol: 'A clear stand + evidence that Mij drives the episodes + Maxwell’s role as narrator + a conclusion. A reasoned case for a title about their friendship can also earn full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*Mijbil the Otter* is taken from a book by…', opts: ['Gavin Maxwell', 'Liam O’Flaherty', 'Anton Chekhov', 'Robert Frost'], sol: 'The chapter is an extract from Gavin Maxwell’s *Ring of Bright Water*.' }));
Q('mc_book', mcq({ t: 1, d: 2, c: 'recall', stem: 'From which of Gavin Maxwell’s books is the Mijbil chapter drawn?', opts: ['*Ring of Bright Water*', '*Long Walk to Freedom*', '*The Diary of a Young Girl*', '*The Jungle Book*'], sol: 'It comes from *Ring of Bright Water* (1960).' }));
Q('mc_home', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where was Maxwell’s home, for which he wanted an otter?', opts: ['in a remote part of Scotland', 'in the centre of London', 'in Basra', 'in Paris'], sol: 'His home was in the remote West Highlands of Scotland, surrounded by water.' }));
Q('mc_aloof', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes Mij during his first day with Maxwell?', opts: ['aloof', 'aggressive', 'affectionate', 'sleepy'], sol: 'He kept his distance, showing neither warmth nor aggression.' }));
Q('mc_tap', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Mij learning to turn on the bath tap by himself shows that he was…', opts: ['intelligent and observant', 'naughty and destructive', 'thirsty all the time', 'afraid of the dark'], sol: 'He worked the tap out for himself, a sign of intelligence.' }));
Q('mc_box_reason', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Mij need to travel in a box on his journey to England?', opts: ['The airline required animals to travel in a box at the owner’s feet.', 'Maxwell wanted to hide him from customs officers.', 'Mij was ill and needed to be kept warm.', 'The box was a gift from the friend in Basra.'], sol: 'It was the airline’s condition for carrying the otter.' }));
Q('mc_box_feeling', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How did Maxwell most likely feel when he saw that Mij had hurt himself in the box?', opts: ['horrified and guilty', 'proud and pleased', 'bored and indifferent', 'angry with the airline staff'], sol: 'He had shut Mij in himself; seeing the injuries, he felt shock and remorse.' }));
Q('mc_rat', mcq({ t: 1, d: 1, c: 'recall', stem: 'When Mij ran loose in the aeroplane, what did one woman passenger think he was?', opts: ['a rat', 'a monkey', 'a ferret', 'a lizard'], sol: 'She took him for a rat.' }));
Q('mc_science', mcq({ t: 1, d: 2, c: 'recall', stem: 'What was special about Mij’s race of otter?', opts: ['Scientists had never described it before, and it was named after Maxwell.', 'It was the largest otter ever recorded.', 'It could live without water.', 'It had been bred in a London zoo.'], sol: 'Zoologists recognised it as a new race and named it Maxwell’s otter.' }));
Q('mc_tone_mij', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which phrase best describes the tone of Maxwell’s account of Mij?', opts: ['affectionate and humorous', 'angry and bitter', 'formal and scientific throughout', 'gloomy and fearful'], sol: 'He writes with warmth and gentle humour, even about mishaps.' }));
Q('mc_theme_mij', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does the story of Maxwell and Mij most strongly suggest?', opts: ['A bond with an animal grows through patience, care and respect for its nature.', 'Wild animals can never be friends with humans.', 'Pets should be kept in boxes for their own safety.', 'Travelling with animals is always easy.'], sol: 'Maxwell wins Mij’s trust by patience and care, but learns to respect his wild nature.' }));
Q('mc_apply_pet', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A family adopts a nervous rescue dog. Which action follows the approach Maxwell used with Mij on the first day?', opts: ['letting the dog keep its distance until it chooses to come closer', 'holding the dog tightly so it gets used to people', 'shutting the dog in a crate for the whole day', 'inviting many visitors to play with the dog at once'], sol: 'Maxwell let Mij keep away until trust came; giving the dog space follows the same approach.' }));
Q('mc_narration', mcq({ t: 2, d: 2, c: 'understanding', stem: 'From whose point of view is *Mijbil the Otter* told?', opts: ['Maxwell, in the first person', 'Mij, the otter', 'the air hostess', 'an unnamed third-person narrator'], sol: 'Maxwell narrates his own experiences, so it is first-person non-fiction.' }));
Q('mc_genre_mij', mcq({ t: 1, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'What kind of writing is *Mijbil the Otter*?', opts: ['a fable with a moral', 'a science-fiction story', 'a true, first-person account of a pet', 'a play in one act'], sol: 'It is non-fiction: Maxwell recounts his real experience with Mij.' }));

Q('fb_city', fb({ t: 1, d: 1, c: 'recall', stem: 'Maxwell received the otter in the city of ___ in southern Iraq.', acc: [['Basra']], sol: 'He was in **Basra** when the otter arrived.' }));
Q('fb_sack', fb({ t: 1, d: 1, c: 'recall', stem: 'The two Arabs brought the otter to Maxwell’s room in a ___.', acc: [['sack', 'bag']], sol: 'The otter came in a **sack**.' }));
Q('fb_route', fb({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Mij flew to England by way of ___, ending his journey in ___.', acc: [['Paris'], ['London']], sol: 'The route was via **Paris** to **London**.', scheme: [['Paris', 0.5], ['London', 0.5]] }));
Q('fb_name_otter', fb({ t: 1, d: 2, c: 'recall', stem: 'Zoologists named Mij’s newly identified race of otter after ___.', acc: [['Maxwell', 'Gavin Maxwell']], sol: 'It became known as **Maxwell**’s otter.' }));

Q('ar_bath', ar({ t: 3, d: 3, c: 'analysis', a: 'Mij was overjoyed when he was first taken to the bathroom.', r: 'Otters are water animals, and the bathtub gave Mij a chance to play in water.', key: 'a', sol: 'Both are true, and R explains A: the tub let a water-loving animal do what came naturally.' }));
Q('ar_box', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Mij tore the lining of his travelling box.', r: 'Mij had been trained to open boxes by his previous owners in the marshes.', key: 'c', sol: 'A is true. R is false: nothing in the account says Mij was trained; he panicked at being shut in.' }));
Q('ar_london', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Londoners could not tell what kind of animal Mij was.', r: 'Maxwell took Mij from Paris to London by air.', key: 'b', sol: 'Both are true, but the route of the flight does not explain the confusion; Mij was simply an unfamiliar animal.' }));
Q('ar_hostile', ar({ t: 3, d: 3, c: 'understanding', a: 'Mij attacked Maxwell fiercely during his first day.', r: 'For his first day Mij kept his distance from Maxwell.', key: 'd', sol: 'A is false: Mij did not attack; he simply kept away. R is true.' }));

Q('tf_first_night', tf({ t: 3, d: 1, c: 'recall', stem: 'True or false: on his very first night, Mij slept snuggled against Maxwell.', ans: false, sol: 'That happened on the second night; on the first he slept on the floor, away from the bed.' }));
Q('tf_friend', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Maxwell’s friend told him that otters were common in the Tigris marshes.', ans: true, sol: 'The friend said otters were plentiful there and that local people sometimes kept them as pets.' }));
Q('tf_hostess_angry', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: the air hostess was angry with Maxwell and refused to help when Mij escaped.', ans: false, sol: 'She was calm and kind; she helped and let him keep the otter with him.' }));
Q('tf_unknown', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Mij belonged to a race of otter that scientists had already described before Maxwell’s time.', ans: false, sol: 'The race was new to science and was named after Maxwell.' }));

Q('ord_mij', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these episodes from Maxwell’s account of Mij in the order in which they happen.',
  items: ['A friend tells Maxwell that otters are common in the Tigris marshes.', 'Two Arabs bring an otter to Maxwell’s room in Basra.', 'Mij sleeps on Maxwell’s bed for the first time.', 'Mij tears the lining of the travelling box.', 'Mij escapes inside the aeroplane cabin.', 'Maxwell walks Mij through the streets of London.'],
  sol: 'The friend’s advice → arrival in Basra → the second night → the box → the flight → London.',
}));
Q('ord_trust', ord({
  t: [3, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the stages of Mij’s growing trust in Maxwell.',
  items: ['Mij keeps his distance and sleeps on the floor.', 'Mij climbs onto the bed and sleeps beside Maxwell.', 'Mij plays freely in front of Maxwell in the bathroom.', 'Mij settles calmly with Maxwell during the flight.', 'Mij walks beside Maxwell on a lead in London.'],
  sol: 'Distance → sleeping close → open play → comfort during the flight → companionship in London.',
}));

Q('mt_places', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each place with its part in the story of Mij.',
  pairs: [['Tigris marshes', 'where otters were plentiful'], ['Basra', 'where the otter was delivered in a sack'], ['Paris', 'the stop on the way to London'], ['Scotland', 'Maxwell’s home, surrounded by water']],
  sol: 'The places in Mij’s journey and Maxwell’s life.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words used when studying *Mijbil the Otter* with their meanings.',
  pairs: [['aloof', 'distant and uninvolved'], ['marsh', 'low, wet, waterlogged land'], ['zoologist', 'a scientist who studies animals'], ['remorse', 'deep regret for a wrong one has done']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_traits', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each of Mij’s actions with the trait it reveals.',
  pairs: [['Turning on the bath tap himself', 'intelligence'], ['Sleeping beside Maxwell on the second night', 'growing trust'], ['Keeping marbles moving from paw to paw', 'playfulness'], ['Tearing apart the lining of the box', 'a wild, freedom-loving nature']],
  sol: 'Each action and the side of Mij’s personality it shows.',
}));
