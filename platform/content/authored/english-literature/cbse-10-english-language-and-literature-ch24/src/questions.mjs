// CBSE 10 English Language and Literature, ch24 "The Thief's Story" (Ruskin Bond) — question bank.
// Footprints without Feet (supplementary reader). LITERATURE RULE (CONTEXT §8, D-036): no sentence, close
// paraphrase or distinctive phrase of the story appears here; speech is reported, never quoted. Passages
// are SOYL commentary (passage_origin: soyl-commentary). Students read the story in their textbook.
// PATTERN: the board examines Footprints through 3-mark short answers (Q9, 40–50 words) and a 6-mark long
// answer on character, theme and values; it prints no Footprints extract. The bank is weighted that way
// (14 three-mark, 9 long) with only the 5 commentary items the chapter-test blueprints' extract slots need.
// Topics: t01 context and summary · t02 themes (how trust and education change the thief) · t03 characters
// (Hari Singh's inner conflict and Anil's trusting nature) · t04 exam practice.
// Left out (cannot be confirmed without the text): the sum stolen, how much Hari kept from the shopping,
// clock times, where Hari sheltered from the rain, and the title of Anil's book.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on Ruskin Bond's story, not an extract from it. Read the story itself in your textbook, Footprints without Feet. The board paper does not print extracts from this reader; use this item as a comprehension check.)*";
const SRC_STEM = `*The Thief's Story*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view or value supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary items (source-based)
Q('src_meeting', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Bond's narrator introduces himself without shame: he is a young thief, practised at his trade, and he uses whatever name suits him at the moment. When we meet him he is calling himself Hari Singh. He picks out Anil, a young writer, in a crowd watching a wrestling match, flatters him and asks for work. Anil admits he cannot pay a wage but offers food in return for cooking. Hari claims he can cook, which is untrue. His first meal is so poor that Anil hands it to a stray dog, yet instead of sending the boy away, Anil patiently teaches him how to cook.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where did Hari Singh first approach Anil in *The Thief’s Story*?', opts: ['at a wrestling match', 'at a railway station', 'at a cricket ground', 'at a temple fair'], sol: 'Hari picked Anil out in the crowd at a wrestling match.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'Instead of wages, Anil offered Hari ___ in return for cooking.', acc: [['food', 'meals']], sol: 'Anil could offer only **food**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What happened to the first meal Hari cooked for Anil?', opts: ['Anil gave it to a stray dog.', 'Anil praised it to his friends.', 'Hari ate it all himself.', 'It was sold in the market.'], sol: 'It was so bad that Anil gave it to a stray dog.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Anil’s response to the poor first meal show about him?', model: 'He is patient and kind; he teaches the boy instead of dismissing him.', sol: 'Patience and generosity.', scheme: [['Patient / kind: teaches rather than dismisses', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does Hari keep changing his name?', opts: ['A changing name helps a thief avoid being traced.', 'He has forgotten his real name.', 'Anil asked him to use a new name.', 'Names are changed every month by law.'], sol: 'Changing names hides his past and protects him as a thief.' })),
  ],
  sol: 'Parts (a)–(c) recall the opening; (d) and (e) interpret it.',
}));
Q('src_learning', source({
  t: [2, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Life with Anil gives Hari more than meals. Anil teaches him to write his name and promises to go further, to full sentences and to sums. For a boy who has never been to school, this is a door opening. Hari is grateful, yet old habits survive: he still keeps a little of the shopping money for himself. Anil, who earns his living by writing for magazines, is paid only now and then, borrowing when he is short and spending freely when he is not. He seems hardly to notice money at all, which makes him, from a thief's point of view, an easy target.",
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'recall', stem: 'What was the first thing Anil taught Hari to write?', opts: ['his own name', 'a letter home', 'a shopping list', 'a newspaper story'], sol: 'Anil began by teaching him to write his name.' })),
    child('b', fb({ t: 3, d: 2, c: 'recall', stem: 'Hari still kept a small part of the ___ money for himself.', acc: [['shopping', 'marketing', 'grocery']], sol: 'He took a little from the **shopping** money.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Anil earn his living?', opts: ['by writing for magazines', 'by teaching in a school', 'by running a shop', 'by working in a bank'], sol: 'He was a writer, paid irregularly for his work.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call Anil’s lessons a door opening for Hari?', model: 'Learning to read and write could give Hari a respectable future instead of a life of crime.', sol: 'Education offers him a new, honest life.', scheme: [['Education offers a new, respectable life', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does Anil seem an easy target to Hari?', opts: ['He is careless about money and trusts people.', 'He keeps a guard dog.', 'He is very rich and has many servants.', 'He never leaves his room.'], sol: 'His casual attitude to money and his trust make theft easy.' })),
  ],
  sol: 'Note the two pulls on Hari: gratitude for learning and the habit of stealing.',
}));
Q('src_theft', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The turning point comes when Anil sells a book and brings home a bundle of notes, which he tucks beneath his mattress before going to sleep. To Hari this is an opportunity he has been trained by experience to take. At night he slides the money out and slips away to the railway station, intending to board a train to Lucknow and disappear. Yet when the train begins to move, he does not get on. Something holds him back, and he is left standing on the platform as the carriages pull away, a thief who has succeeded and somehow failed at the same moment.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where did Anil keep the money from his book in *The Thief’s Story*?', opts: ['beneath his mattress', 'in a locked trunk', 'in a bank account', 'inside a book'], sol: 'He put the notes under his mattress.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Hari planned to escape on a train to ___.', acc: [['Lucknow']], sol: 'He meant to catch the train to **Lucknow**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What did Hari do when the train started moving?', opts: ['He stayed on the platform and let it go.', 'He jumped on at the last moment.', 'He bought a ticket for the next day.', 'He asked a guard to stop it.'], sol: 'He hesitated and did not board.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say Hari has succeeded and failed at the same moment?', model: 'He has the money, but he cannot complete the escape, because his conscience will not let him.', sol: 'The theft works, but his conscience stops the escape.', scheme: [['He has the money but cannot escape (conscience)', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does Hari’s failure to board the train suggest?', opts: ['His conscience and his bond with Anil are stronger than his greed.', 'He was afraid of trains.', 'He had no money for a ticket.', 'He wanted to steal more first.'], sol: 'His hesitation shows an inner change beginning.' })),
  ],
  sol: 'Parts (a)–(c) recall the theft; (d) and (e) interpret the hesitation.',
}));
Q('src_return', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Out in the rain, Hari thinks about what he has done. He imagines how Anil will feel on waking: not angry about the money, but saddened that the boy he trusted has betrayed him. He also realises what he is giving up. With reading and writing, he could one day become a respected, educated person, while the stolen notes would last only a short while. These thoughts settle the matter. He returns to the room, where Anil is still asleep, and pushes the damp notes back under the mattress. The theft is undone, and no one but Hari, it seems, knows it ever happened.",
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What did Hari imagine Anil would feel on finding the money gone?', opts: ['sadness that his trust had been betrayed', 'anger that would bring the police', 'relief that he could stop working', 'joy at being free of Hari'], sol: 'He pictured Anil’s sorrow at broken trust, not anger about money.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did Hari realise he would lose by running away?', opts: ['the chance to become an educated person', 'a large wage', 'his family home', 'a place in a wrestling team'], sol: 'He would lose the education Anil was giving him.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Hari returned and put the ___ notes back under the mattress.', acc: [['damp', 'wet']], sol: 'The notes were **damp** from the rain.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Which mattered more in Hari’s change of heart: education or trust? Give one reason.', model: 'Trust, because Anil’s faith in him made betrayal painful; the hope of learning then gave him a reason to stay.', sol: 'Either view, if supported from his reflections in the rain.', scheme: [['A view supported by one reason from the story', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does Hari’s decision to return the money show?', opts: ['He has chosen honesty and a better future over quick gain.', 'He has been caught by the police.', 'He wants Anil to reward him.', 'He has found a richer victim.'], sol: 'Returning the money marks his moral turning point.' })),
  ],
  sol: 'Link the two reasons for his return: trust and education.',
}));
Q('src_morning', source({
  t: [1, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The ending is quietly brilliant. Next morning Anil has already made tea, and he hands Hari a fifty-rupee note, saying that he will pay him regularly from now on. Hari notices that the note is still damp from the rain, and he understands at once: Anil knows about the theft. Yet Anil says nothing of it. He simply announces that today they will begin writing sentences. Hari smiles in return, and neither of them ever mentions the money. Silence, in this ending, is not a cover-up but a form of forgiveness, and it binds the two together more firmly than any lecture could.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did Anil give Hari on the morning after the theft?', opts: ['a fifty-rupee note', 'a new set of clothes', 'a train ticket', 'a written warning'], sol: 'He gave Hari a fifty-rupee note.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Hari know that Anil had discovered the theft?', opts: ['The note Anil gave him was still wet from the rain.', 'Anil shouted at him.', 'A neighbour told him.', 'The police came to the room.'], sol: 'The wet note revealed that Anil had found the returned money.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Anil said that from that day they would begin writing ___.', acc: [['sentences']], sol: 'Their next lesson was writing **sentences**.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Was Anil wise to say nothing about the theft? Give one reason.', model: 'Yes; his silent forgiveness preserved Hari’s dignity and strengthened the trust that was changing him.', sol: 'Either view, if supported (silence as forgiveness, or the need to address wrongdoing).', scheme: [['A view supported by one reason', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary mean by calling the silence a form of forgiveness?', opts: ['By not mentioning it, Anil shows he has forgiven Hari.', 'Anil has not noticed the theft.', 'Anil plans to report Hari later.', 'Hari has forgiven Anil for being poor.'], sol: 'Anil’s silence is deliberate kindness, not ignorance.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words): board Q9 pattern
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_approach', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Hari Singh manage to get work with Anil? What does this show about him at the start? Answer in 40–50 words.',
  model: 'Hari spotted Anil at a wrestling match, flattered him and asked for work. When Anil offered food instead of wages for cooking, Hari falsely claimed he could cook. This shows that he was a clever, smooth-talking boy who lied easily to win a new victim’s trust.',
  sol: 'How he approached Anil (flattery, the lie about cooking) + what it shows (cunning, practised deceit).',
}));
Q('sa_cooking', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'What happened when Hari first cooked for Anil, and how did Anil respond? Answer in 40–50 words.',
  model: 'Hari’s first meal was so badly cooked that Anil fed it to a stray dog. Instead of dismissing the boy for lying, Anil patiently taught him how to cook. His reaction shows that he was kind, tolerant and willing to give a second chance.',
  sol: 'The failed meal + Anil’s patient teaching + what it shows about Anil.',
}));
Q('sa_education', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why did learning to read and write matter so much to Hari Singh? Answer in 40–50 words.',
  model: 'Hari had never been to school, so his only skill was stealing. Learning to write his name, and soon sentences and sums, showed him that education could make him a respected man. The stolen money would soon be spent, but learning offered a lasting, honest future.',
  sol: 'His uneducated past + what education promised (respect, a future) + contrast with stolen money.',
}));
Q('sa_anil_money', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'Describe Anil’s attitude to money in *The Thief’s Story*. Why did this matter to Hari? Answer in 40–50 words.',
  model: 'Anil was paid irregularly for his writing. He borrowed when he was short and spent freely when he had money, rarely keeping careful track. To Hari this carelessness made Anil an easy victim, but it also showed that Anil cared more about people than wealth.',
  sol: 'Anil’s carefree, irregular finances + why it mattered (easy target; values people over money).',
}));
Q('sa_station', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Why did Hari fail to board the train after stealing Anil’s money? Answer in 40–50 words.',
  model: 'At the station Hari hesitated as the train moved off. His conscience was troubled: he kept thinking of Anil’s trust and kindness, and of the lessons he would lose. These feelings were stronger than his habit of stealing, so he let the train leave without him.',
  sol: 'The hesitation + its causes (trust, conscience, education) + the outcome.',
}));
Q('sa_reflection', short({
  ...SA3, t: [3, 2], d: 3, c: 'analysis',
  stem: 'What did Hari think about while wandering in the rain after the theft? Answer in 40–50 words.',
  model: 'Hari imagined Anil waking to find the money gone. He felt Anil would not be angry, only sad that his trust had been betrayed. He also realised that learning to read and write could make him a respected man, a future far worth more than stolen notes.',
  sol: 'Two thoughts: Anil’s sorrow at broken trust + the value of education.',
}));
Q('sa_wet_note', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'What is the significance of the wet fifty-rupee note at the end of *The Thief’s Story*? Answer in 40–50 words.',
  model: 'The note was still wet from the rain, so Hari realised Anil had found the money he had stolen and returned. Anil knew everything but chose to say nothing. The wet note quietly reveals Anil’s awareness and his silent forgiveness, without a single word of blame.',
  sol: 'What the wet note reveals (Anil knew) + Anil’s silent forgiveness.',
}));
Q('sa_anil_trust', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Anil is a trusting man. Give two examples from *The Thief’s Story* and say how his trust affects Hari. Answer in 40–50 words.',
  model: 'Anil takes in a stranger without asking questions and lets him handle the shopping money. Later he forgives the theft without a word. This trust makes Hari feel valued for the first time, so betraying Anil becomes painful, and it helps turn him away from crime.',
  sol: 'Two examples of trust + its effect on Hari (feels valued; cannot betray).',
}));
Q('sa_hari_conflict', short({
  ...SA3, t: 3, d: 4, c: 'analysis',
  stem: 'Describe the inner conflict Hari Singh faces on the night of the theft. Answer in 40–50 words.',
  model: 'One part of Hari is a practised thief who sees an easy chance and takes the money. Another part is a grateful boy who values Anil’s trust and lessons. The struggle shows at the station and in the rain, until conscience wins and he returns the money.',
  sol: 'The two sides (thief vs grateful learner) + where the struggle shows + the outcome.',
}));
Q('sa_silence', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Neither Anil nor Hari ever mentions the theft. Was this the best ending for *The Thief’s Story*? Answer in 40–50 words.',
  model: 'Yes. A lecture or punishment might have humiliated Hari and pushed him back to crime. Silence lets him keep his dignity and shows that Anil has forgiven him. The unspoken understanding makes their bond stronger and leaves the reader to sense the change for themselves.',
  sol: 'A stand + why silence works (dignity, forgiveness, bond) + effect on the reader. A reasoned contrary view also earns credit.',
}));
Q('sa_reform', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'What does *The Thief’s Story* suggest about how wrongdoers can be reformed? Answer in 40–50 words.',
  model: 'The story suggests that trust, kindness and education reform people better than punishment. Anil never scolds Hari; he teaches him, trusts him and forgives him. Because Hari is treated as worth something, he begins to value himself and chooses honesty over the easy money he once lived on.',
  sol: 'The method (trust, kindness, education vs punishment) + evidence from Anil + the result in Hari.',
}));
Q('sa_narrator', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'Why is *The Thief’s Story* told by the thief himself? How does this help the reader? Answer in 40–50 words.',
  model: 'First-person narration lets us see the theft through Hari’s eyes, including his cunning thoughts and growing doubts. We share his inner conflict and understand why he returns the money. This makes us sympathise with a thief, and makes his change of heart believable and moving.',
  sol: 'Why first person + how it helps (access to thoughts, sympathy, credible change).',
}));
Q('sa_title', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'Is *The Thief’s Story* a suitable title? Answer in 40–50 words.',
  model: 'The title suits the story because the thief himself narrates it, and it is about his life. Yet it is also ironic: by the end, Hari is no longer really a thief. The title reminds us where he began, which makes his transformation more striking.',
  sol: 'A stand + narrator and subject + the irony of the ending.',
}));
Q('sa_compare', short({
  ...SA3, t: 3, d: 4, c: 'evaluation',
  stem: 'Compare Hari Singh and Anil in *The Thief’s Story*. Answer in 40–50 words.',
  model: 'Hari begins as a cunning, deceitful thief who sees people as targets. Anil is open, generous and trusting, valuing people above money. Hari is alert to every chance of gain; Anil is careless of gain. By the end, Anil’s goodness has begun to change Hari.',
  sol: 'Contrasting traits with evidence + how Anil influences Hari.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_who', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who are the two main characters of *The Thief’s Story*? Answer in 30–40 words.',
  model: 'The narrator is Hari Singh, a young thief who changes his name as it suits him. The other is Anil, a young writer who takes him in, feeds him and begins to teach him to read and write.',
  sol: 'Hari Singh (the young thief, narrator) + Anil (the writer who employs and teaches him).',
}));
Q('sb_lessons', short({
  ...SA2, t: [1, 2], d: 2, c: 'recall',
  stem: 'What did Anil teach Hari, and what did he promise to teach next? Answer in 30–40 words.',
  model: 'Anil taught Hari to cook and to write his own name. He promised that he would soon teach him to write full sentences and to do sums, which gave Hari hope of an educated future.',
  sol: 'Cooking and writing his name + the promised sentences and sums.',
}));
Q('sb_money_source', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'How did Anil come to have a bundle of notes on the night of the theft? Answer in 30–40 words.',
  model: 'Anil had just been paid for a book he had sold to a publisher. He brought the bundle of notes home and casually tucked it under his mattress before going to sleep, an easy chance for a thief.',
  sol: 'Payment for his book + where he kept it.',
}));
Q('sb_rain', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What part does the rain play in *The Thief’s Story*? Answer in 30–40 words.',
  model: 'The rain drives Hari to shelter and reflect, so it helps his change of heart. It also soaks the stolen notes, and the still-wet note next morning tells him that Anil knew about the theft.',
  sol: 'Rain as time for reflection + the wet note as the clue.',
}));
Q('sb_shopping', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'Hari kept a little of the shopping money for himself. What does this show about him at that stage? Answer in 30–40 words.',
  model: 'It shows that his thieving habits were still alive even though he liked Anil. He was grateful for food and lessons, yet he could not resist small gains, so his reform had not yet begun.',
  sol: 'Old habits persist + reform has not begun yet.',
}));
Q('sb_smile', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'Why does Hari smile at Anil at the end of *The Thief’s Story*? Answer in 30–40 words.',
  model: 'Hari smiles because he understands that Anil knows about the theft and has forgiven him. The smile expresses his gratitude and relief, and his silent promise to keep learning and stay honest.',
  sol: 'Understanding of Anil’s forgiveness + gratitude and a new commitment.',
}));

// ================================================================ long answers, 6 marks (100–120 words): board pattern
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_trust_education', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'How do trust and education together change Hari Singh in *The Thief’s Story*? Answer in 100–120 words.',
  model: 'Hari begins as a practised thief who sees Anil only as an easy target. Two forces slowly change him. The first is trust. Anil takes him in without questions, lets him handle money and teaches him patiently, so Hari feels valued for the first time. When he steals the notes, he cannot bear the thought of Anil’s sadness at being betrayed. The second is education. Learning to write his name shows Hari that reading and writing could make him a respected man, a future worth far more than stolen money. At the station and in the rain, these two forces defeat his greed. He returns the money, and Anil’s silent forgiveness completes his transformation.',
  sol: 'Starting point + trust (examples, effect) + education (examples, effect) + the turning point and the ending.',
}));
Q('la_anil_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Anil in *The Thief’s Story*. Answer in 100–120 words.',
  model: 'Anil is a young writer whose goodness quietly changes a thief. He is generous, giving Hari food and shelter even though he cannot pay wages. He is patient, teaching the boy to cook after a disastrous first meal and to write his name. He is careless about money, earning irregularly and spending freely, which makes him an easy target. Above all, he is trusting and forgiving. When he realises Hari has stolen and returned his money, he says nothing; instead he pays him and announces the next lesson. Anil believes in people more than in punishment. His kindness, not any lecture, is what turns Hari towards an honest life.',
  sol: 'Four or five traits with evidence (generous, patient, careless with money, trusting, forgiving) + his effect on Hari.',
}));
Q('la_hari_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Trace the change in Hari Singh’s character from the beginning to the end of *The Thief’s Story*. Answer in 100–120 words.',
  model: 'At the start Hari is a confident young thief who changes his name to suit his plans. He flatters Anil, lies about cooking and keeps part of the shopping money. Yet living with Anil awakens something new. He enjoys learning to write and begins to imagine becoming an educated person. When Anil brings home a bundle of notes, the old Hari takes them and heads for the station. But he cannot board the train. Wandering in the rain, he thinks of Anil’s trust and of the future learning could bring. He returns the money. By the end, smiling at Anil over the wet note, he has chosen honesty and growth over theft.',
  sol: 'The beginning (cunning thief) → signs of change (learning, gratitude) → the crisis (theft, station, rain) → the end (return, honesty).',
}));
Q('la_diary_anil', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Anil. Write a diary entry on the morning you discovered that Hari had stolen your money and then put it back. Answer in 100–120 words.',
  model: 'This morning\n\nA strange night. When I woke, I reached under my mattress and found the notes there, but they were damp, though no rain could have reached them indoors. Hari must have taken them and gone out into the storm, and then he came back. I felt a stab of hurt that he had stolen from me, but a much greater joy that he had returned. He is not a bad boy; he has simply never had a chance. I decided to say nothing. Instead I paid him properly and told him we would start writing sentences today. His smile told me he understood. Trust, I believe, will teach him more than anger ever could.',
  sol: 'Diary format (time, first person, feelings). Content consistent with the story: the damp notes, his inference, hurt and joy, the decision to stay silent, the payment and the next lesson. Anil’s voice: calm, generous, reflective.',
}));
Q('la_letter_hari', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Years later, Hari Singh has become an educated person. Write a letter from him to Anil, thanking him for what he did. Answer in 100–120 words.',
  model: 'Dear Anil,\n\nI write to you today with a pen you first taught me to hold. When I came to you, I was a thief who lied about cooking and kept some of your shopping money. You fed me, taught me to write my name and trusted me with everything. One rainy night I took your money and ran to the station, but I could not leave. I thought of your trust and of the lessons I would lose. Next morning you handed me a wet note and said nothing. That silence changed my life. Today I earn an honest living and teach others to read. Everything I am began with your kindness.\n\nWith lifelong gratitude,\nHari',
  sol: 'Letter format (salutation, body, close). Content consistent with the story (the lie, the lessons, the theft, the station, the wet note) + an imagined but plausible future + gratitude.',
}));
Q('la_values', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'What values does *The Thief’s Story* teach us? Discuss with reference to Anil and Hari Singh. Answer in 100–120 words.',
  model: 'The story teaches several lasting values. First, trust has the power to transform. Anil treats a thief as a person worth believing in, and that belief makes betrayal impossible for Hari. Second, forgiveness can be stronger than punishment. Anil’s silence after the theft protects Hari’s dignity and binds them closer. Third, education is the path to self-respect. Hari realises that learning to read and write could make him a respected man, a future no stolen money could buy. Finally, the story shows that conscience lives even in someone who has done wrong. Given kindness and a chance, people can choose honesty. These values matter for families, schools and society alike.',
  sol: 'Three or four values (trust, forgiveness, education, conscience) each linked to the story + a wider conclusion.',
}));
Q('la_forgive_debate', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Should Anil have reported Hari to the police instead of forgiving him silently? Give your view with reference to *The Thief’s Story*. Answer in 100–120 words.',
  model: 'In my view, Anil was right not to report Hari. The boy had already returned the money of his own free will, which showed genuine remorse. Handing him to the police would have punished a thief who had just chosen honesty, and might have pushed him back into crime for good. Anil’s silence, together with the wet note and the promise of regular wages, told Hari that he was trusted and forgiven. It also kept open the door of education. Of course, society needs laws, and some may say wrongdoing must always be reported. But justice aims at reform, and here kindness achieved reform more surely than any punishment could have done.',
  sol: 'A clear stand + evidence (the return, remorse, the ending) + acknowledgement of the other side + conclusion. A reasoned opposite view also earns full marks.',
}));
Q('la_ending', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Ruskin Bond make the ending of *The Thief’s Story* so effective? Answer in 100–120 words.',
  model: 'Bond ends the story with a quiet surprise instead of a dramatic confrontation. Anil makes tea and hands Hari a fifty-rupee note, promising regular wages. Hari notices the note is still wet from the rain and realises that Anil knows everything. This single physical detail does the work of a whole conversation. Anil then simply announces the next lesson, writing sentences, and Hari smiles. Nothing is explained, yet both understand. Because the narrator is Hari, we discover the truth at the same moment he does, which makes it moving. The silence suggests forgiveness and a new beginning. Bond trusts readers to understand, just as Anil trusts Hari.',
  sol: 'Features of the ending (the wet note, silence, the next lesson, the smile) + narration + the effect and its link to the theme of trust.',
}));
Q('la_speech', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Using *The Thief’s Story*, write a short speech for your school assembly on the topic: “Education is the best reform.” Answer in 100–120 words.',
  model: 'Good morning, everyone.\n\nToday I want to talk about why education is the best reform. In Ruskin Bond’s story, Hari Singh is a young thief who has never been to school. A kind writer, Anil, feeds him and teaches him to write his name. One night Hari steals Anil’s money, but he cannot escape. He realises that learning could make him a respected man, while stolen money would soon be gone. He returns the money. No prison changed Hari; a pen and a patient teacher did. Education gives people a future worth protecting. Let us value our own learning and share it with those who have never had the chance. Thank you.',
  sol: 'Speech format (greeting, clear topic, close). Uses the story as evidence (Hari’s past, Anil’s teaching, the turning point) + a wider message for the audience.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*The Thief’s Story* in *Footprints without Feet* was written by…', opts: ['Ruskin Bond', 'James Herriot', 'Victor Canning', 'H. G. Wells'], sol: 'Ruskin Bond wrote the story.' }));
Q('mc_name', mcq({ t: 1, d: 1, c: 'recall', stem: 'What name was the thief using when he met Anil in *The Thief’s Story*?', opts: ['Hari Singh', 'Anil Kumar', 'Ram Lal', 'Mohan Das'], sol: 'He called himself Hari Singh at the time.' }));
Q('mc_anil_job', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Anil’s occupation in *The Thief’s Story*?', opts: ['a writer', 'a wrestler', 'a shopkeeper', 'a policeman'], sol: 'Anil earned his living by writing.' }));
Q('mc_lie', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What lie did Hari tell Anil when he asked for work?', opts: ['that he could cook', 'that he was a student', 'that he had a family nearby', 'that he was a wrestler'], sol: 'He falsely claimed he could cook.' }));
Q('mc_target', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did Hari consider Anil an easy person to rob?', opts: ['Anil was trusting and careless about money.', 'Anil was often away for weeks.', 'Anil was very old and weak.', 'Anil kept his money in the street.'], sol: 'His trust and casual attitude to money made theft easy.' }));
Q('mc_station', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did Hari go immediately after taking the money from under Anil’s mattress?', opts: ['to the railway station', 'to the bus stop', 'to a friend’s house', 'to the bazaar to spend it'], sol: 'He hurried to the station to catch a train.' }));
Q('mc_why_return', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which reason best explains why Hari returned the stolen money?', opts: ['He valued Anil’s trust and the chance of an education.', 'He was afraid the police were following him.', 'The money turned out to be fake.', 'Anil offered him a reward.'], sol: 'Trust and the promise of learning outweighed the money.' }));
Q('mc_knew', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did the wet note tell Hari the next morning?', opts: ['Anil knew about the theft.', 'It had rained inside the room.', 'Anil had been out all night.', 'The money was counterfeit.'], sol: 'It showed Anil had found the returned, rain-soaked money.' }));
Q('mc_anil_trait', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which quality of Anil does the ending of *The Thief’s Story* reveal most clearly?', opts: ['forgiveness', 'suspicion', 'greed', 'anger'], sol: 'He forgives without a word.' }));
Q('mc_theme', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Thief’s Story* most strongly convey?', opts: ['Trust and kindness can reform a wrongdoer.', 'Thieves can never change their ways.', 'Money is the key to happiness.', 'Writers are poor judges of character.'], sol: 'Anil’s trust and kindness transform Hari.' }));
Q('mc_apply_teacher', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'A teacher finds that a student has copied homework, speaks to him privately and offers extra help instead of punishing him. Whose approach in *The Thief’s Story* does this resemble?', opts: ['Anil’s', 'Hari’s at the start', 'a police officer’s', 'none of the characters’'], sol: 'Like Anil, the teacher chooses trust and help over punishment.' }));
Q('mc_irony', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about the ending of *The Thief’s Story*?', opts: ['The victim rewards the thief with wages the morning after the theft.', 'The thief is caught by the police.', 'Anil steals from Hari.', 'The train returns for Hari.'], sol: 'Instead of punishment, Anil pays Hari, the very morning after being robbed.' }));
Q('mc_tone', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What is the tone of *The Thief’s Story*?', opts: ['quiet, warm and reflective', 'loud and comic', 'angry and bitter', 'formal and technical'], sol: 'Bond’s tone is gentle and reflective.' }));
Q('mc_narration', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'Who narrates *The Thief’s Story*?', opts: ['Anil', 'the thief, in the first person', 'a police inspector', 'an unnamed neighbour'], sol: 'Hari Singh, the thief, tells his own story.' }));

Q('fb_name', fb({ t: 1, d: 1, c: 'recall', stem: 'In *The Thief’s Story*, the young thief was calling himself Hari ___.', acc: [['Singh']], sol: 'He used the name Hari **Singh**.' }));
Q('fb_dog', fb({ t: 3, d: 1, c: 'recall', stem: 'Hari’s first meal was so bad that Anil gave it to a stray ___.', acc: [['dog']], sol: 'A stray **dog** got the meal.' }));
Q('fb_lessons', fb({ t: 2, d: 2, c: 'recall', marks: 2, stem: 'Anil taught Hari to write his ___ and promised to teach him full sentences and ___.', acc: [['name'], ['sums', 'figures', 'arithmetic', 'numbers']], sol: 'First his **name**, then sentences and **sums**.', scheme: [['name', 1], ['sums', 1]] }));
Q('fb_note', fb({ t: 1, d: 2, c: 'understanding', stem: 'Next morning Anil gave Hari a fifty-rupee note that was still ___ from the rain.', acc: [['wet', 'damp']], sol: 'The note was still **wet**.' }));

Q('ar_station', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Hari did not board the train after stealing Anil’s money.', r: 'Hari’s conscience and his attachment to Anil held him back.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_police', ar({ t: [1, 3], d: 3, c: 'understanding', a: 'Anil reported the theft to the police.', r: 'Anil discovered that his money had been taken and returned.', key: 'd', sol: 'A is false: Anil said nothing to anyone. R is true: the wet note shows he knew.' }));
Q('ar_writer', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Anil earned money only now and then.', r: 'Anil taught Hari to write his name.', key: 'b', sol: 'Both are true, but teaching Hari does not explain Anil’s irregular income, which came from writing for magazines.' }));
Q('ar_cook', ar({ t: 3, d: 3, c: 'analysis', a: 'Anil had to teach Hari how to cook.', r: 'Hari had worked as a cook in a hotel before he met Anil.', key: 'c', sol: 'A is true. R is false: Hari had lied about cooking; nothing in the story says he had ever worked as a cook.' }));

Q('tf_wages', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: in *The Thief’s Story*, Anil paid Hari good wages from his first day.', ans: false, sol: 'Anil could offer only food at first; regular pay came at the end.' }));
Q('tf_boarded', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: Hari boarded the train to Lucknow with Anil’s money.', ans: false, sol: 'He let the train leave without him.' }));
Q('tf_returned', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Hari put the stolen notes back under Anil’s mattress.', ans: true, sol: 'He returned them before Anil woke.' }));
Q('tf_scolded', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: Anil scolded Hari angrily for the theft the next morning.', ans: false, sol: 'Anil never mentioned the theft.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *The Thief’s Story* in the order in which they happen.',
  items: ['Hari approaches Anil at a wrestling match.', 'Anil teaches Hari to cook and to write his name.', 'Anil brings home money from selling a book.', 'Hari takes the notes and goes to the station.', 'Hari returns and puts the money back.', 'Anil gives Hari a wet fifty-rupee note.'],
  sol: 'Meeting → lessons → the money → the theft → the return → the wet note.',
}));
Q('ord_night', ord({
  t: [1, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the stages of Hari’s night after the theft in *The Thief’s Story*.',
  items: ['Hari slides the notes from under the mattress.', 'He waits at the station for the train.', 'He lets the train leave without him.', 'He wanders in the rain, thinking.', 'He slips the damp notes back into place.'],
  sol: 'Theft → waiting → hesitation → reflection → return.',
}));

Q('mt_people', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each item from *The Thief’s Story* with its part in the story.',
  pairs: [['Hari Singh', 'the young thief who narrates'], ['Anil', 'the writer who trusts him'], ['the stray dog', 'eats the first bad meal'], ['the wet note', 'reveals that Anil knew']],
  sol: 'Characters and key objects of the story.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for discussing *The Thief’s Story* with their meanings.',
  pairs: [['conscience', 'the inner sense of right and wrong'], ['remorse', 'deep regret for a wrong done'], ['reform', 'to change for the better'], ['betray', 'to break someone’s trust']],
  sol: 'Key words for writing about this story.',
}));
Q('mt_actions', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each action in *The Thief’s Story* with the quality it reveals.',
  pairs: [['Anil teaches Hari after the bad meal', 'patience'], ['Hari keeps part of the shopping money', 'old thieving habits'], ['Hari returns the money', 'awakened conscience'], ['Anil says nothing about the theft', 'forgiveness']],
  sol: 'Each action and what it shows.',
}));
