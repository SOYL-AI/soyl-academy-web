// CBSE 10 English Language and Literature, ch27 "Footprints without Feet" (H. G. Wells, NCERT adaptation)
// — question bank.
// LITERATURE RULE (CONTEXT §8): everything is written in SOYL's own words at the level of events and ideas.
// No sentence, phrase or dialogue of the adaptation appears; speech is reported. Passages are SOYL
// commentary (passage_origin: soyl-commentary). Students read the story in Footprints without Feet.
// BOARD PATTERN: the supplementary reader is examined through 3-mark short answers (40–50 words) and a
// 6-mark long answer (100–120 words) on character, theme and values, not through extracts. The bank is
// weighted that way (14 three-mark, 9 long); the 5 commentary passages exist only to fill the generic
// chapter-test blueprint's Section A slots, and their parts ask about character, theme and values.
// Topics: t01 context and summary · t02 themes (invisibility, lawlessness, misuse of science) ·
// t03 Griffin's character · t04 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the month, the London street of the
// theatrical shop, the name of the inn, the clergyman's name, the store's departments and the food Griffin ate.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the story, not an extract from it. Read the chapter itself in your supplementary reader, Footprints without Feet.)*";
const SRC_STEM = `*Footprints without Feet* (H. G. Wells): read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view on character, theme or values, supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary passages (blueprint Section A slots)
Q('src_opening', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Wells opens with a puzzle instead of an explanation. Two boys in London notice marks of bare feet on the steps of a house, and new marks keep forming in front of them although nobody can be seen. Curious rather than frightened, they follow the trail along the street until it fades and is gone. Only then does the writer tell us what the boys could not know: the walker was Griffin, a scientist who had made his own body invisible. Starting with the effect and holding back the cause is a simple trick, but it makes the reader as eager to follow the prints as the boys are.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did the two boys in *Footprints without Feet* see on the steps of the London house?', opts: ['prints of bare feet forming with nobody in sight', 'a man in bandages and dark glasses', 'a trail of coins leading to a door', 'a burning house and a crowd'], sol: 'Footprints kept appearing although no walker could be seen.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The invisible walker whose prints the boys followed was the scientist ___.', acc: [['Griffin']], sol: 'The walker was **Griffin**, who had made his body invisible.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did the trail that the boys followed come to an end?', opts: ['The prints grew fainter until none were left.', 'Griffin turned round and chased the boys away.', 'A policeman stopped the boys.', 'It began to snow and covered the street.'], sol: 'The prints faded along the street and then disappeared.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does Wells show the footprints before he explains who made them?', model: 'Holding back the cause creates mystery and suspense, so the reader wants to read on and learn the truth.', sol: 'Effect before cause builds curiosity and suspense.', scheme: [['Creates mystery / suspense that makes the reader read on', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'How did the boys react to the mysterious footprints?', opts: ['with curiosity, following the trail', 'with terror, running home at once', 'with anger, calling the police', 'with boredom, ignoring them'], sol: 'They were curious and followed the prints until they vanished.' })),
  ],
  sol: 'Parts (a)–(c) recall the opening; (d) and (e) ask how it works on the reader.',
}));
Q('src_lawless', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Griffin's discovery is a triumph of the laboratory, yet the story never treats him as a hero. He has learnt how to make a living body transparent by taking certain rare drugs, a feat no one else could match. But the same man respects no rule except his own will. When his landlord dislikes him and tries to turn him out of his lodgings, Griffin answers by setting fire to the house. To slip away unseen he must strip off every piece of clothing, and so the great inventor ends up unclothed, penniless and without a roof, with the London winter closing in. Genius without a conscience, Wells suggests, quickly turns into trouble.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'How had Griffin made his body invisible?', opts: ['by swallowing certain rare drugs', 'by wearing a special cloak', 'by standing under a strange light', 'by casting a magic spell'], sol: 'He took certain rare drugs that made his body transparent.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Griffin do when his landlord tried to turn him out?', opts: ['He set fire to the house.', 'He paid the rent he owed.', 'He complained to the police.', 'He moved quietly to a hotel.'], sol: 'In revenge he set the house on fire.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Griffin was a gifted scientist, but he had no respect for the ___.', acc: [['law', 'laws', 'rules']], sol: 'He was clever but had no respect for the **law**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *genius without a conscience*?', model: 'Griffin is brilliant, but he has no sense of right and wrong, so his cleverness leads him into harmful acts.', sol: 'Talent with no moral sense becomes dangerous.', scheme: [['Great intelligence without moral sense, which leads to harm', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why did Griffin have to take off his clothes after the fire?', opts: ['Clothes could be seen, but his body could not.', 'His clothes had caught fire.', 'The landlord had taken them away.', 'He wanted to sell them for money.'], sol: 'Only his body was invisible; clothes would have given him away.' })),
  ],
  sol: 'Link his discovery (a) and his revenge (b) to the theme of misused talent (d).',
}));
Q('src_store', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Invisibility sounds like freedom, but Wells shows how miserable it can be. It is winter, and Griffin, who cannot wear clothes without being noticed, is freezing. He creeps into a London department store to get warm and waits for it to close. Once the doors are locked he helps himself to warm clothes and food and settles down to sleep inside. In the morning the staff arrive, spot a stranger and chase him, and the only way he can escape is to throw off everything he has taken. He is out in the cold again with nothing. Each comfort he steals is lost almost at once.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Why did Griffin go into the London department store?', opts: ['to get warm in the cold weather', 'to look for a job', 'to meet a friend', 'to buy a present'], sol: 'He was freezing and went in to get warm.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did Griffin do once the store had closed for the night?', opts: ['He took warm clothes and food and slept there.', 'He set the store on fire.', 'He left by the back door at once.', 'He waited for the manager to return.'], sol: 'He helped himself to clothes and food and stayed the night.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'To escape from the store staff next morning, Griffin had to take off his ___ again.', acc: [['clothes', 'clothing']], sol: 'Only by shedding his **clothes** could he vanish from his pursuers.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'According to the commentary, why is invisibility not the freedom it seems for Griffin?', model: 'He can hide only by going without clothes, so he suffers cold and hunger and keeps losing what he takes.', sol: 'Being unseen means being cold, hungry and homeless.', scheme: [['Hiding forces him to go without clothes, warmth and comfort', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which idea does the store episode best support?', opts: ['A power that cuts a person off from society can make life harder.', 'Big stores should hire more guards.', 'Winter in London is always mild.', 'Stealing always leads to wealth.'], sol: 'His power leaves him cold, hunted and alone.' })),
  ],
  sol: 'The episode turns a fantasy of power into a story of discomfort.',
}));
Q('src_iping', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "After robbing a shop that sells costumes for the theatre, Griffin leaves London disguised in a false nose, a wide hat, whiskers, dark glasses and bandages. He takes rooms at the inn in the village of Iping, where the landlady, Mrs Hall, and her neighbours find him impossible to ignore. He hides his face, keeps to his rooms with his bottles and chemicals, and is short-tempered with anyone who disturbs him. The villagers whisper and invent explanations of their own. Wells enjoys the comedy of a small community trying to make sense of something it cannot imagine, while the reader, who knows the secret, waits for it to come out.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did Griffin go to stay after leaving London?', opts: ['an inn in the village of Iping', 'a hotel in Paris', 'a farm in Scotland', 'his old lodgings in London'], sol: 'He took rooms at the inn at Iping.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The landlady of the inn at Iping was Mrs ___.', acc: [['Hall']], sol: 'The landlady was Mrs **Hall**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Griffin behave towards the people at Iping?', opts: ['He kept to himself and was short-tempered.', 'He was friendly and talkative.', 'He gave money to the poor.', 'He invited them to his experiments.'], sol: 'He stayed in his rooms and was irritable with anyone who disturbed him.' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Why did Griffin need bandages, dark glasses and a false nose?', model: 'Without them his head would show nothing at all, so the disguise let him move among people as if he were visible.', sol: 'The disguise gives an invisible man a face.', scheme: [['To give himself a visible face and avoid alarming people', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Where does the humour of the Iping scenes mainly come from?', opts: ['the villagers guessing at a secret the reader already knows', 'Griffin telling jokes to Mrs Hall', 'a comic song at the inn', 'the clergyman falling into a pond'], sol: 'The reader knows the truth while the villagers make wild guesses.' })),
  ],
  sol: 'The disguise (d) explains the villagers’ curiosity (c, e).',
}));
Q('src_unmasked', source({
  t: [1, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The village mystery ends in uproar. Money vanishes from the clergyman's desk although no thief can be seen, and on the same morning the Halls find the stranger's room empty while his things seem to fly about by themselves. When Mrs Hall finally demands an explanation, Griffin loses his temper and pulls off his disguise, and the onlookers are faced with a man who appears to have no head. The constable, Jaffers, tries to arrest him, but Griffin throws off his clothes and fights unseen, knocking Jaffers senseless before he escapes. His temper, more than any detective, has given his secret away.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What strange thing happened at the clergyman’s house in Iping?', opts: ['Money was taken from his desk by a thief no one could see.', 'His study caught fire at midnight.', 'His cow was stolen from the field.', 'A letter arrived for Griffin.'], sol: 'Money disappeared from the desk, but no thief was visible.' })),
    child('b', fb({ t: 3, d: 1, c: 'recall', stem: 'The village constable who tried to arrest Griffin was ___.', acc: [['Jaffers']], sol: 'The constable was **Jaffers**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What made Griffin reveal his secret in front of the villagers?', opts: ['He lost his temper when Mrs Hall demanded an explanation.', 'He wanted to become famous.', 'A doctor examined him.', 'He was tired of hiding and confessed calmly.'], sol: 'Angered by her questions, he tore off his disguise.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Do you agree that Griffin’s temper, more than anything else, gave his secret away? Give one reason.', model: 'Yes; had he answered Mrs Hall calmly, the villagers would only have stayed curious, but his rage made him unmask himself.', sol: 'Either view, supported: his outburst caused the unmasking; or the thefts and the room would have exposed him anyway.', scheme: [['A view with one reason from the story', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How did Griffin escape from Jaffers?', opts: ['He threw off his clothes and fought unseen.', 'He bribed him with stolen money.', 'He hid in the clergyman’s study.', 'He ran away in his disguise.'], sol: 'Without clothes he was invisible; he knocked Jaffers out and got away.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words) — the board's Q9 form
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_footprints', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What puzzled the two boys at the start of *Footprints without Feet*, and how was the puzzle explained? Answer in 40–50 words.',
  model: 'The boys saw bare footprints forming on the steps of a London house, yet nobody was there. They followed the trail until it faded away. The explanation was that Griffin, a scientist, had made himself invisible and had walked through mud, so only his prints showed.',
  sol: 'The puzzle (prints with no walker) + the trail + the explanation (invisible Griffin, muddy feet).',
}));
Q('sa_invisible_how', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Griffin become invisible, and why did he end up homeless in London? Answer in 40–50 words.',
  model: 'Griffin swallowed certain rare drugs that made his body transparent. When his landlord tried to evict him, he burnt the house down for revenge. To slip away unseen he had to remove all his clothes, so he was left homeless and penniless as well as unclothed.',
  sol: 'The drugs + the revenge fire + why he had to go without clothes and so became homeless.',
}));
Q('sa_lawless', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Griffin is a gifted scientist but a lawless man. Give two examples of his lawlessness from the story. Answer in 40–50 words.',
  model: 'Griffin treats every rule as something to break. He takes revenge on his landlord by setting the house on fire. Later he takes the costume-shop owner by surprise, knocks him down and takes his cash. In Iping he even robs the clergyman. His intelligence serves only his own wants.',
  sol: 'Any two: the fire, the attack and robbery at the costume shop, the theft from the store, the theft from the clergyman, the attack on Jaffers. Add a comment.',
}));
Q('sa_store', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Describe what happened to Griffin in the London department store. Answer in 40–50 words.',
  model: 'Desperate to escape the cold, Griffin sneaked into a department store and stayed hidden after it shut. He took warm clothes and food and slept there. Next morning the staff noticed him and gave chase, so he had to throw off the clothes and flee naked.',
  sol: 'Why he went in + what he took + the chase next morning and the loss of the clothes.',
}));
Q('sa_disguise', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How did Griffin get his disguise, and what does this episode show about him? Answer in 40–50 words.',
  model: 'At a shop selling theatre costumes, Griffin took a false nose, a hat, whiskers, dark glasses and bandages to give himself a visible face. To leave without paying, he took the owner by surprise, struck him and robbed him. This shows he is cunning, violent and completely selfish.',
  sol: 'What he took + the attack and robbery + an inference about his character.',
}));
Q('sa_iping_curious', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why were the people of Iping so curious about the stranger staying at the inn? Answer in 40–50 words.',
  model: 'The stranger hid his face completely under bandages, dark glasses and a hat, and never showed himself properly. He stayed shut in his rooms with bottles and chemicals and snapped at anyone who disturbed him. A small village had never seen anyone so mysterious.',
  sol: 'His disguise + his secretive habits and bad temper + the setting of a small village.',
}));
Q('sa_room', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'What did Mr and Mrs Hall experience in the stranger’s room at the inn, and what did Mrs Hall conclude? Answer in 40–50 words.',
  model: 'Finding the stranger’s door open and his room empty, the Halls went in. Suddenly his hat flew at Mrs Hall’s face and a chair charged at them, pushing them out. Mrs Hall believed the room was haunted, though really the invisible Griffin was moving the things.',
  sol: 'What they found + the flying hat and chair + Mrs Hall’s belief + the real cause.',
}));
Q('sa_clergyman', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Describe the theft at the clergyman’s house in Iping. How did it point to the invisible Griffin? Answer in 40–50 words.',
  model: 'Before daylight one day, the clergyman and his wife discovered that cash was disappearing from his desk, though the room seemed empty. Then an invisible someone sneezed close by. An unseen thief who sneezes points to the invisible Griffin, whose money had run out.',
  sol: 'What happened + the clue of an unseen thief who sneezes + Griffin’s motive (no money).',
}));
Q('sa_jaffers', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How did Griffin escape when Jaffers tried to arrest him at Iping? Answer in 40–50 words.',
  model: 'When constable Jaffers came to arrest him, Griffin quickly threw off his clothes and became completely invisible. Jaffers struggled with an opponent he could not see. Griffin knocked him unconscious and escaped, leaving the villagers frightened and helpless in front of a power they did not understand.',
  sol: 'Shedding his clothes + the unseen struggle + Jaffers knocked out + the escape.',
}));
Q('sa_misery', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Invisibility brought Griffin more suffering than power. Do you agree? Answer in 40–50 words.',
  model: 'Yes. To stay unseen Griffin had to go without clothes in winter, so he froze. He had no home and had to steal food. He lost everything he took in the store. Even at Iping he lived hidden and friendless. His power left him cold, hungry and alone.',
  sol: 'A stand + two or three examples of hardship (cold, homelessness, hunger, isolation) + a conclusion.',
}));
Q('sa_science_misuse', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'What does *Footprints without Feet* suggest about the misuse of science? Answer in 40–50 words.',
  model: 'The story warns that a discovery is only as good as the person using it. Griffin’s invisibility could have served knowledge, but he used it to burn, steal and attack. Science without moral responsibility becomes dangerous, both to society and to the scientist himself.',
  sol: 'The warning + how Griffin used his discovery + the moral (science needs ethics).',
}));
Q('sa_griffin_sympathy', short({
  ...SA3, t: 3, d: 4, c: 'evaluation',
  stem: 'Does Griffin deserve any sympathy from the reader? Give a reasoned view in 40–50 words.',
  model: 'Only a little. We may pity Griffin when he shivers without clothes and has nowhere to sleep. However, he causes most of his suffering himself, by burning his landlord’s house and robbing people. His cruelty to the shopkeeper and Jaffers makes it hard to feel sorry for him.',
  sol: 'Any reasoned view: some pity for his hardship, balanced against crimes he chose to commit.',
}));
Q('sa_humour', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Find two moments of humour in *Footprints without Feet* and say what makes them funny. Answer in 40–50 words.',
  model: 'The Iping scenes are comic because the villagers make wild guesses about the bandaged stranger while we know the truth. The flying hat and charging chair are funny too, since Mrs Hall blames spirits. In both, the humour comes from people misreading what the reader understands.',
  sol: 'Two moments (villagers’ guesses, the haunted room, the unmasking, the chase) + the source of humour (irony).',
}));
Q('sa_title', short({
  ...SA3, t: [2, 4], d: 3, c: 'evaluation',
  stem: 'Is *Footprints without Feet* a suitable title for the story? Give reasons in 40–50 words.',
  model: 'Yes. The title describes the strange sight that opens the story: prints appear with no visible feet. It creates curiosity at once. It also sums up Griffin himself, a man who leaves traces of harm everywhere while staying unseen and escaping responsibility for what he does.',
  sol: 'A stand + the literal link (the opening scene) + a deeper link (Griffin’s hidden harm).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_boys', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'What did the two boys in London do when they saw the strange footprints? Answer in 30–40 words.',
  model: 'Instead of running away, the boys were curious and followed the prints along the street. They kept following until the marks became faint and finally disappeared, leaving them without any answer.',
  sol: 'Their reaction (curiosity) + what happened to the trail.',
}));
Q('sb_fire', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why did Griffin set fire to his landlord’s house? Answer in 30–40 words.',
  model: 'Griffin’s landlord disliked him and tried to make him leave his lodgings. Griffin, who obeyed no law, took revenge by burning the house, showing how dangerous his temper and selfishness were.',
  sol: 'The landlord’s action + Griffin’s revenge + what it shows.',
}));
Q('sb_winter', short({
  ...SA2, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why was winter a bad time for Griffin to become invisible? Answer in 30–40 words.',
  model: 'To stay unseen Griffin could not wear clothes, because clothes would show. In the freezing weather he suffered terribly from the cold and had to look for warmth and food.',
  sol: 'Invisibility needs no clothes + the cold of winter.',
}));
Q('sb_shopkeeper', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'What does Griffin’s treatment of the theatrical shopkeeper reveal about him? Answer in 30–40 words.',
  model: 'Instead of paying, Griffin caught the shopkeeper off guard, beat him and took his money. It shows that he was violent and selfish, and willing to hurt innocent people to meet his own needs.',
  sol: 'The act (attack and theft) + the traits it shows.',
}));
Q('sb_spirits', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Mrs Hall believe her inn was haunted? Answer in 30–40 words.',
  model: 'In the stranger’s empty room, objects moved by themselves: a hat flew at her and a chair pushed the Halls out. With no visible cause, she blamed spirits rather than an invisible man.',
  sol: 'The flying objects + no visible cause → spirits.',
}));
Q('sb_headless', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'What did the people at the inn see when Griffin removed his disguise? Answer in 30–40 words.',
  model: 'When Griffin angrily pulled off his nose, glasses and bandages, the onlookers saw clothes with no head above them. They were horrified, because the man seemed to have no head at all.',
  sol: 'The unmasking + what they saw (no head) + their horror.',
}));

// ================================================================ long answers, 6 marks (100–120 words) — the board's long-answer form
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_griffin_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Griffin in *Footprints without Feet*. Answer in 100–120 words.',
  model: 'Griffin is a brilliant but deeply flawed man. His scientific skill is remarkable: he finds a way to make the human body transparent. Yet he respects no law. When his landlord tries to evict him, he burns the house down. He is selfish and violent, overpowering the costume-shop owner and robbing him, and later knocking out constable Jaffers. He is also cunning, using bandages and a false nose to pass as an ordinary man. His quick temper finally betrays him at Iping. Invisibility brings him only cold, hunger and loneliness. Griffin shows that intelligence without moral sense harms others and, in the end, the person who has it.',
  sol: 'Traits with evidence: brilliant, lawless, vengeful, violent, selfish, cunning, short-tempered, lonely. End with a judgement linked to the theme.',
}));
Q('la_science_ethics', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Science is a blessing only when it is used responsibly. Discuss with reference to *Footprints without Feet*. Answer in 100–120 words.',
  model: 'Griffin’s discovery is extraordinary. Used wisely, research into making tissue transparent might have helped medicine or deepened human knowledge. Griffin, however, uses it only for himself. With his power he burns his landlord’s house, takes clothes and food from a store, robs a shopkeeper and a clergyman, and attacks a policeman. Instead of serving people, his science makes him a danger to them. It does not even help him: he is cold, hunted and alone. The same is true today of discoveries such as artificial intelligence, gene editing or nuclear energy, which can heal or destroy. Wells reminds us that scientists need conscience as well as cleverness, and societies need rules for powerful inventions.',
  sol: 'A clear stand + Griffin’s misuse with examples + the cost to him and to others + a modern link + conclusion.',
}));
Q('la_invisible_day', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'If you could become invisible for a day, how would you use the power? Contrast your choices with Griffin’s in *Footprints without Feet*. Answer in 100–120 words.',
  model: 'If I were invisible for a day, I would use the power to help, not to take. I might quietly watch how a busy hospital or a wildlife reserve works, to learn without disturbing anyone. I could follow and report people who mistreat animals or harass others, giving the evidence to the police. Griffin made the opposite choices. He used invisibility to burn a house, rob shops and a clergyman and knock out a constable. His power gave him freedom from rules, and he used it selfishly, which left him hunted and alone. The story shows that what matters is not the power we have but the values with which we use it.',
  sol: 'Own responsible uses + contrast with Griffin’s acts (fire, robberies, attack) + the lesson about values.',
}));
Q('la_diary_hall', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Mrs Hall, the landlady at Iping. Write a diary entry on the day the stranger at your inn was unmasked. Answer in 100–120 words.',
  model: 'Tonight\n\nI can hardly hold my pen steady. For weeks that bandaged gentleman has kept to his rooms, snapping at me whenever I knocked. This morning his room stood empty, yet his hat flew at my face and a chair drove us out of the door. I was sure the house was haunted. When he came back, I asked him plainly what was going on. He flew into a rage and tore off his bandages and nose, and there was nothing underneath, no head at all! Poor Jaffers tried to arrest him and was knocked senseless by someone nobody could see. I shall never let a room to a stranger again without a proper look at his face.',
  sol: 'Diary format (date/time, first person, past tense, feelings). Content consistent with the story: the secretive lodger, the haunted room, the demand for an explanation, the unmasking, Jaffers. A personal reflection.',
}));
Q('la_jaffers_report', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'As constable Jaffers, write a report to your superior officer about your attempt to arrest the stranger at the Iping inn. Answer in 100–120 words.',
  model: 'Subject: Failed arrest of the stranger at the village inn, Iping\n\nSir, I was called to the inn after money disappeared from the clergyman’s desk and the landlady reported strange events in her lodger’s room. On arrival I found a crowd terrified by the lodger, who had removed his bandages and false nose and appeared to have no head. I tried to arrest him. He at once threw off his clothes and became wholly invisible. I grappled with him, but I could not see my opponent, and he struck me unconscious. When I came round, he had escaped. I believe he is dangerous and request help to warn nearby villages and towns.\n\nConstable Jaffers',
  sol: 'Report format (subject, factual account in sequence, request, signature). Content: why he was called, the unmasking, the struggle, his injury, the escape, a recommendation.',
}));
Q('la_power_isolation', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Griffin’s power cut him off from other people in *Footprints without Feet*? Discuss in 100–120 words.',
  model: 'Griffin’s invisibility sets him apart from everyone. In London he cannot wear clothes without being noticed, so he has no home, no warmth and no ordinary life. He must hide even to eat and sleep, and when the store staff find him he is chased away. In Iping he hides behind bandages and avoids company, and his secrecy turns curious villagers into suspicious ones. He trusts no one and treats everyone as an obstacle, whether the landlord, the shopkeeper or Jaffers. By the end he is a hunted outsider with nowhere to belong. Wells shows that a power used only for oneself makes a person lonely, not free.',
  sol: 'Points: no home or clothes, hiding in the store, disguise and secrecy at Iping, hostility to everyone, a hunted outsider. Conclude with the theme of isolation.',
}));
Q('la_techniques', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Wells make *Footprints without Feet* exciting and amusing for readers? Discuss his methods in 100–120 words.',
  model: 'Wells begins with a mystery: footprints form on a London step with no walker in sight. By showing the effect before the cause, he makes us as curious as the two boys. He then explains Griffin’s past in a quick flashback before moving to Iping. The story is full of action, from the fire to the chase in the store and the struggle with Jaffers. Humour comes from irony: the villagers and Mrs Hall misread events that the reader understands, such as the flying hat and chair. Finally, Wells mixes science with the impossible, which makes the tale feel strangely believable. Mystery, action and irony keep readers turning the page.',
  sol: 'Methods with examples: mystery opening, flashback, fast action, irony and humour, science fiction. Conclude with the overall effect.',
}));
Q('la_griffin_letter', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine Griffin, after his escape from Iping, writes a letter to a fellow scientist about what invisibility has really been like. Write the letter in 100–120 words.',
  model: 'Dear friend,\n\nYou always envied my talent, so let me tell you the truth about my great discovery. Being unseen is not the triumph I imagined. To hide, I must give up clothes, and this winter I have nearly frozen. I slept one night in a London store, only to be chased out at dawn with nothing. I wear bandages and a false nose just to rent a room, and even then the villagers whisper. My temper betrayed me at Iping, and now the police hunt me. I have stolen and struck people, and I am more alone than ever. Perhaps a discovery needs a better man than I have been.\n\nGriffin',
  sol: 'Informal letter format. Content consistent with the story (cold, the store, the disguise, Iping, the escape) + a reflective tone on what the power cost him.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Would *The Lawless Scientist* be a better title for *Footprints without Feet*? Give your view in 100–120 words.',
  model: 'In my view, the original title is better. It comes straight from the opening scene, where two boys see prints forming with no visible feet, so it hooks the reader at once with mystery. It also works as a symbol: Griffin leaves a trail of fire, theft and injury while staying hidden and avoiding punishment. A title such as The Lawless Scientist would describe Griffin accurately, since he burns, robs and attacks, but it would give away the moral before the story begins and lose the suspense. The present title holds both the puzzle and the meaning, inviting readers to discover for themselves what kind of man leaves footprints without feet.',
  sol: 'A clear stand + literal and symbolic links of the original title + what the alternative gains and loses + conclusion. A reasoned case for the alternative can also earn full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*Footprints without Feet* is adapted from a novel by…', opts: ['H. G. Wells', 'Guy de Maupassant', 'James Herriot', 'Ruskin Bond'], sol: 'It is adapted from H. G. Wells’s *The Invisible Man*.' }));
Q('mc_novel', mcq({ t: 1, d: 2, c: 'recall', stem: 'From which H. G. Wells novel is the story of Griffin in *Footprints without Feet* taken?', opts: ['*The Invisible Man*', '*The Time Machine*', '*Treasure Island*', '*Frankenstein*'], sol: 'Griffin is the hero of *The Invisible Man* (1897).' }));
Q('mc_genre', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which genre does *Footprints without Feet* belong to?', opts: ['science fiction', 'a true biography', 'a fable with animals', 'a historical record'], sol: 'It imagines what an impossible scientific discovery would lead to.' }));
Q('mc_trait', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which pair of words best describes Griffin?', opts: ['gifted but lawless', 'kind but foolish', 'poor but honest', 'shy but brave'], sol: 'He is a clever scientist who respects no law.' }));
Q('mc_why_iping', mcq({ t: 1, d: 3, c: 'analysis', stem: 'Why did Griffin most likely leave London for Iping?', opts: ['to put distance between himself and the city where his crimes had happened', 'to visit his family there', 'to take up a job at the inn', 'to give a lecture to the villagers'], sol: 'After his thefts and the attack, a quiet village was safer for him.' }));
Q('mc_room_irony', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Mrs Hall blames spirits for the flying hat and chair. What does this create for the reader of *Footprints without Feet*?', opts: ['dramatic irony, because the reader knows the real cause', 'a tragic ending', 'a flashback to Griffin’s childhood', 'a moral about honesty'], sol: 'We know an invisible man is moving the things; Mrs Hall does not.' }));
Q('mc_sneeze', mcq({ t: 1, d: 3, c: 'analysis', stem: 'What clue in the theft at the clergyman’s house points to an invisible thief rather than spirits?', opts: ['a sneeze from someone no one could see', 'a footprint in blood', 'a letter left on the desk', 'a broken window'], sol: 'A sneeze shows a living person was there, though unseen.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does Griffin’s story most strongly suggest?', opts: ['Knowledge without moral responsibility does harm.', 'Scientists should never experiment.', 'Villagers are always foolish.', 'Invisibility guarantees happiness.'], sol: 'Griffin’s genius harms others and himself because he has no conscience.' }));
Q('mc_apply', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A hacker finds a way to read other people’s messages unseen. Which choice would repeat Griffin’s mistake?', opts: ['using the method to steal money and settle scores', 'reporting the weakness so it can be fixed', 'publishing a warning to help people stay safe', 'refusing to use the method at all'], sol: 'Like Griffin, he would turn a hidden power into a tool for crime.' }));
Q('mc_end', mcq({ t: 1, d: 2, c: 'recall', fixed: true, key: 'c', stem: 'How does the NCERT adaptation of *Footprints without Feet* end?', opts: ['Griffin is arrested and jailed.', 'Griffin becomes visible again.', 'Griffin knocks out Jaffers and escapes.', 'Griffin apologises to Mrs Hall.'], sol: 'The chapter ends with Griffin escaping after the struggle with Jaffers.' }));
Q('mc_temper', mcq({ t: 3, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'Which weakness of Griffin’s leads directly to his unmasking at the inn?', opts: ['his poor memory', 'his quick temper', 'his fear of the dark', 'his love of music'], sol: 'Angered by Mrs Hall’s questions, he tore off his disguise.' }));
Q('mc_narrator', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'd', stem: 'How is *Footprints without Feet* narrated?', opts: ['by Griffin, in the first person', 'by Mrs Hall, as a diary', 'by one of the boys, as a letter', 'by a third-person narrator who tells the events'], sol: 'An outside narrator tells the story, including a flashback to Griffin’s past.' }));

Q('fb_drugs', fb({ t: 1, d: 1, c: 'recall', stem: 'Griffin made his body invisible by swallowing certain rare ___.', acc: [['drugs', 'medicines', 'chemicals']], sol: 'He took certain rare **drugs**.' }));
Q('fb_village', fb({ t: 1, d: 1, c: 'recall', stem: 'After leaving London, Griffin stayed at an inn in the village of ___.', acc: [['Iping']], sol: 'He took rooms at the inn in **Iping**.' }));
Q('fb_store_shop', fb({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Griffin spent a night in a London department ___ and later got his disguise from a ___ company’s shop.', acc: [['store'], ['theatrical', 'theatre']], sol: 'He slept in a London department **store** and robbed a **theatrical** company’s shop.', scheme: [['store', 0.5], ['theatrical', 0.5]] }));
Q('fb_constable', fb({ t: 1, d: 2, c: 'recall', stem: 'Griffin knocked out the constable, ___, and escaped.', acc: [['Jaffers']], sol: 'Constable **Jaffers** was knocked unconscious.' }));

Q('ar_clothes', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Griffin had to take off his clothes whenever he wanted to escape unseen.', r: 'Griffin’s body was invisible, but the clothes he wore were not.', key: 'a', sol: 'Both are true, and R explains A: only his body was transparent.' }));
Q('ar_fire', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Griffin set fire to his landlord’s house.', r: 'Griffin wanted to destroy evidence of his scientific experiments.', key: 'c', sol: 'A is true. R is false: he did it in revenge because the landlord tried to turn him out.' }));
Q('ar_iping', ar({ t: 1, d: 3, c: 'analysis', a: 'The people of Iping were curious about the stranger at the inn.', r: 'Griffin had been chased out of a London store by its staff.', key: 'b', sol: 'Both are true, but the store chase in London does not explain the villagers’ curiosity, which came from his disguise and secrecy.' }));
Q('ar_jaffers', ar({ t: 3, d: 3, c: 'understanding', a: 'Griffin surrendered quietly when Jaffers came to arrest him.', r: 'Griffin threw off his clothes and fought Jaffers unseen.', key: 'd', sol: 'A is false: he resisted. R is true.' }));

Q('tf_boys_scared', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the two boys in *Footprints without Feet* ran away in fear when they saw the footprints.', ans: false, sol: 'They were curious and followed the prints.' }));
Q('tf_store', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Griffin spent a night inside a London department store after it closed.', ans: true, sol: 'He hid there, took clothes and food, and slept.' }));
Q('tf_paid', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: Griffin paid the theatrical shopkeeper for his bandages and false nose.', ans: false, sol: 'He attacked the shopkeeper and robbed him.' }));
Q('tf_haunted', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Mrs Hall thought spirits were moving the furniture in Griffin’s room.', ans: true, sol: 'She blamed spirits, not knowing an invisible man was there.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events in Griffin’s story in the order in which they happen.',
  items: ['Griffin burns his landlord’s house in revenge.', 'Griffin spends a night inside a London department store.', 'Griffin robs a theatrical shopkeeper to get a disguise.', 'Griffin takes rooms at the inn in Iping.', 'Money vanishes from the clergyman’s desk.', 'Griffin knocks out Jaffers and escapes.'],
  sol: 'The fire → the store → the costume shop → Iping → the clergyman’s money → the escape.',
}));
Q('ord_iping', ord({
  t: [1, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the events at Iping in *Footprints without Feet* in order.',
  items: ['The bandaged stranger arrives and keeps to his rooms.', 'Money disappears from the clergyman’s study.', 'A hat and a chair drive the Halls out of the empty room.', 'Griffin loses his temper and pulls off his disguise.', 'Jaffers tries to arrest him and is knocked out.'],
  sol: 'Arrival → the theft → the haunted room → the unmasking → the struggle with Jaffers.',
}));

Q('mt_people', match({
  t: [1, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each person in *Footprints without Feet* with their part in Griffin’s story.',
  pairs: [['the landlord', 'tried to turn Griffin out of his lodgings'], ['Mrs Hall', 'kept the inn where Griffin stayed'], ['the clergyman', 'lost money from his desk'], ['Jaffers', 'tried to arrest Griffin']],
  sol: 'Each character’s role.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words used when studying *Footprints without Feet* with their meanings.',
  pairs: [['transparent', 'allowing light through, so it can be seen through'], ['lawless', 'not obeying any rules or laws'], ['constable', 'a police officer of the lowest rank'], ['disguise', 'a costume or covering that hides who someone is']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_traits', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each of Griffin’s actions with the trait it reveals.',
  pairs: [['Discovering how to make the body transparent', 'scientific brilliance'], ['Burning his landlord’s house', 'vengefulness'], ['Wearing bandages and a false nose at Iping', 'cunning'], ['Tearing off his disguise when questioned', 'a violent temper']],
  sol: 'Each action and the side of Griffin it shows.',
}));
