// CBSE 10 English Language and Literature, ch25 "The Midnight Visitor" (Robert Arthur) — question bank.
// Footprints without Feet (supplementary reader). LITERATURE RULE (CONTEXT §8, D-036): no sentence, close
// paraphrase or distinctive phrase of the story appears here; speech is reported, never quoted. Passages
// are SOYL commentary (passage_origin: soyl-commentary). Students read the story in their textbook.
// PATTERN: the board examines Footprints through 3-mark short answers (Q9, 40–50 words) and a 6-mark long
// answer on character, theme and values; it prints no Footprints extract. The bank is weighted that way
// (14 three-mark, 9 long) with only the 5 commentary items the chapter-test blueprints' extract slots need.
// Topics: t01 context and summary · t02 themes (how Ausable outwits Max with presence of mind) · t03
// characters (Ausable's appearance against his intelligence) · t04 exam practice.
// Left out (cannot be confirmed without the text): the floor number and the city, how long Ausable has lived
// there, the languages he speaks, Max's appearance, how Max got into the room, and whether Max survived the fall.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on Robert Arthur's story, not an extract from it. Read the story itself in your textbook, Footprints without Feet. The board paper does not print extracts from this reader; use this item as a comprehension check.)*";
const SRC_STEM = `*The Midnight Visitor*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view or value supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary items (source-based)
Q('src_fowler', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Arthur begins by puncturing a fantasy. Fowler, a young writer, has longed to meet a real secret agent, and he has imagined glamour: beautiful strangers, coded whispers, gunfire in the night. Instead he is led by Ausable, a heavy, untidy man who looks nothing like the hero of a spy film, up to an ordinary hotel room high in the building. Ausable himself seems to agree that the work is mostly dull, a matter of papers and waiting. The reader shares Fowler's disappointment, which is exactly what the writer wants, because the story is about to prove that appearances can be badly misleading.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Fowler’s profession in *The Midnight Visitor*?', opts: ['a writer', 'a police officer', 'a hotel waiter', 'a soldier'], sol: 'Fowler was a young writer.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why was Fowler disappointed when he met Ausable?', opts: ['Ausable looked fat and ordinary, not like a glamorous spy.', 'Ausable refused to speak to him.', 'Ausable was rude to the hotel staff.', 'Ausable had forgotten their meeting.'], sol: 'Ausable did not match Fowler’s romantic image of a secret agent.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'Fowler had expected the life of a secret agent to be full of ___ and excitement.', acc: [['glamour', 'romance', 'adventure', 'mystery']], sol: 'He imagined **glamour** and excitement.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the writer want the reader to share Fowler’s disappointment at first?', model: 'So that Ausable’s later cleverness comes as a surprise, proving that looks can mislead.', sol: 'It sets up the contrast between appearance and ability.', scheme: [['Sets up the surprise: appearance vs ability', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which theme of *The Midnight Visitor* does this opening prepare us for?', opts: ['Appearances can be deceptive.', 'Writers make the best spies.', 'Hotels are dangerous places.', 'Money matters more than wit.'], sol: 'The ordinary-looking agent will prove brilliant.' })),
  ],
  sol: 'Parts (a)–(c) recall the opening; (d) and (e) interpret its purpose.',
}));
Q('src_max', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The moment the light goes on, the dull evening changes. A man named Max is waiting inside Ausable's room, and he is holding a pistol. He is another agent, and he has come for a report about new missiles that Ausable is expecting to receive that night. Fowler is thrilled and frightened at once: here, at last, is the drama he wanted. Ausable, by contrast, shows almost no surprise. He speaks to the intruder calmly, even with mild irritation, as if Max were a nuisance rather than a threat. That calm is the first real sign that this unimpressive man is more formidable than he looks.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who was waiting in Ausable’s room in *The Midnight Visitor*?', opts: ['Max, another agent, with a pistol', 'Henry, the waiter, with a tray', 'a police officer', 'the hotel manager'], sol: 'Max was waiting inside with a pistol.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Max had come to take a report about new ___.', acc: [['missiles']], sol: 'The report concerned new **missiles**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Ausable react to finding Max in his room?', opts: ['calmly, with only mild irritation', 'with terror and pleading', 'by shouting for help', 'by attacking Max at once'], sol: 'He stayed calm and unruffled.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call Ausable’s calm the first real sign of his ability?', model: 'Staying cool before a gun shows the steady nerve of an experienced, capable agent.', sol: 'Calm under threat shows skill and experience.', scheme: [['Calm under threat shows nerve and experience', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How do Fowler’s feelings differ from Ausable’s in this scene?', opts: ['Fowler is thrilled and afraid; Ausable is calm.', 'Both are terrified.', 'Fowler is bored; Ausable is excited.', 'Both are angry with Max.'], sol: 'Fowler reacts emotionally; Ausable stays composed.' })),
  ],
  sol: 'Contrast the two reactions to the same danger.',
}));
Q('src_balcony', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Ausable's weapon is a story. Grumbling as if to himself, he complains about the balcony outside his window, the one, he says, that lets intruders into his room, and he claims he has already protested to the hotel about it. Max listens and accepts every word. There is, in fact, no balcony at all. Ausable has invented it on the spot, choosing a detail so ordinary and so casually mentioned that it never occurs to Max to doubt it. A man with a gun believes he is in control, yet it is the unarmed man, armed only with words and a quick mind, who is quietly setting the trap.",
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'recall', stem: 'What did Ausable complain about in front of Max?', opts: ['a balcony outside his window', 'the noise of the traffic', 'the price of the room', 'the slow lift'], sol: 'He grumbled about a balcony that let intruders in.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was the truth about the balcony in *The Midnight Visitor*?', opts: ['It did not exist; Ausable made it up.', 'It belonged to Max’s room.', 'It had just been repaired.', 'It was guarded by the police.'], sol: 'There was no balcony; it was Ausable’s invention.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Ausable overcame Max not with a weapon but with his presence of ___.', acc: [['mind']], sol: 'His **presence of mind** saved him.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why did Max believe the story of the balcony?', model: 'Ausable mentioned it casually as a familiar annoyance, so it sounded like an ordinary fact, not a trick.', sol: 'The casual, grumbling manner made the lie convincing.', scheme: [['The casual way it was mentioned made it convincing', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about this part of *The Midnight Visitor*?', opts: ['The armed man is in danger; the unarmed man is in control.', 'Max hands his gun to Ausable.', 'Fowler turns out to be a spy.', 'The balcony collapses under Ausable.'], sol: 'The power in the room is the reverse of how it looks.' })),
  ],
  sol: 'Separate the facts of the lie (a–c) from why it works (d, e).',
}));
Q('src_knock', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Then comes a knock at the door. Ausable explains, with a show of reluctance, that it must be the police, whom he had asked to look in on him because of the important report. The pressure on Max is suddenly enormous. Trapped between a closed door and a policeman he cannot afford to meet, he decides to hide on the balcony until the visitors leave, warning Ausable to get rid of them. He climbs over the window sill, and a moment later a scream rises from the street far below. The trap has closed, and Ausable has not lifted a finger.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who did Ausable say was knocking at the door?', opts: ['the police', 'his landlord', 'a newspaper reporter', 'another spy'], sol: 'He claimed the police had come to check on him.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did Max decide to do when he heard the knock?', opts: ['hide on the balcony until the visitors left', 'shoot through the door', 'surrender to Ausable', 'hide under the bed'], sol: 'He chose to wait on the balcony.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'After Max climbed over the window sill, a ___ was heard from below.', acc: [['scream', 'cry', 'shriek']], sol: 'A **scream** rose from the street.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say Ausable has not lifted a finger?', model: 'He defeats Max purely by words and planning, without any physical action or weapon.', sol: 'Victory by wit alone.', scheme: [['He wins by words and wit, not force', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'How does the knock increase the suspense?', opts: ['It puts sudden pressure on Max to act quickly.', 'It lets Fowler escape.', 'It reveals Max’s real name.', 'It ends the danger at once.'], sol: 'The knock forces a hurried decision, which springs the trap.' })),
  ],
  sol: 'Track cause and effect: the knock → Max’s choice → the fall.',
}));
Q('src_henry', source({
  t: [1, 2], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "When the door finally opens, the visitor is not a policeman at all. It is Henry, a waiter, bringing up the drinks Ausable had ordered earlier. In one stroke the reader understands everything: Ausable had known all along who would be at the door, and he had used the expected knock to make his invented police, and his invented balcony, work together. Fowler is left astonished. The young man who came looking for thrilling spies has seen something better: a fat, unglamorous man winning a deadly contest with nothing but calm thinking and a convincing story.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who was really at the door at the end of *The Midnight Visitor*?', opts: ['Henry, a waiter, with drinks', 'two police officers', 'Max’s partner', 'the hotel manager'], sol: 'It was Henry, the waiter, bringing drinks.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does the twist at the door reveal about Ausable’s plan?', opts: ['He knew the knock was the waiter and used it to frighten Max.', 'He had really called the police.', 'He did not expect anyone to come.', 'He wanted Fowler to answer the door.'], sol: 'He turned an ordinary, expected knock into part of his trap.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'A sudden, surprising turn at the end of a story is called a ___ ending.', acc: [['twist', 'surprise']], sol: 'This is a **twist** ending.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Do you think Fowler’s view of secret agents changed by the end? Give one reason.', model: 'Yes; he saw that a plain, calm man could beat an armed enemy by quick thinking alone.', sol: 'Either view, if supported by the ending.', scheme: [['A view supported by one reason from the ending', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does the commentary mean by saying Fowler has seen something better than thrilling spies?', opts: ['Real intelligence and calm are more impressive than glamour.', 'Fowler prefers waiters to spies.', 'Fowler has decided to become a policeman.', 'Max was a more exciting character.'], sol: 'Ausable’s wit outshines any glamorous fantasy.' })),
  ],
  sol: 'Link the twist to the theme of appearance and reality.',
}));

// ================================================================ short answers, 3 marks (40–50 words): board Q9 pattern
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_fowler_expect', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'What had Fowler expected a secret agent’s life to be like, and why was he disappointed by Ausable? Answer in 40–50 words.',
  model: 'Fowler had imagined an exciting world of beautiful strangers, secret messages and gunfights at night. Instead he met Ausable, a fat, untidy man in an ordinary hotel room, who described his work as dull. Nothing about him matched the glamorous hero Fowler had pictured from stories.',
  sol: 'Fowler’s romantic expectations + what he found in Ausable + why they clashed.',
}));
Q('sa_max_purpose', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Who was Max in *The Midnight Visitor*, and what did he want from Ausable? Answer in 40–50 words.',
  model: 'Max was a rival secret agent who had slipped into Ausable’s room before he returned. Armed with a pistol, he was waiting to seize an important report about new missiles that Ausable was expecting that night. He meant to take the paper by threat of force.',
  sol: 'Who Max was + his weapon + what he wanted (the missile report).',
}));
Q('sa_balcony_trick', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How did Ausable use an imaginary balcony to defeat Max? Answer in 40–50 words.',
  model: 'Ausable casually grumbled that intruders kept reaching his room from a balcony outside his window. Max believed him. When a knock came, Ausable said it was the police, so Max climbed out to hide on the balcony. Since there was none, he fell, and Ausable was saved.',
  sol: 'The invented balcony + the claimed police + Max’s fatal choice.',
}));
Q('sa_knock', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'Why was the knock at the door so important to Ausable’s plan? Answer in 40–50 words.',
  model: 'Ausable knew the waiter was due with his drinks, so he expected the knock. By claiming it was the police, he frightened Max into hiding quickly. The knock gave Max no time to think, which pushed him onto the imaginary balcony and sprang the trap.',
  sol: 'Ausable expected it + he disguised it as the police + the pressure it put on Max.',
}));
Q('sa_appearance', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Contrast Ausable’s appearance with his intelligence in *The Midnight Visitor*. Answer in 40–50 words.',
  model: 'Ausable looked fat, untidy and unremarkable, nothing like a heroic spy. Yet his mind was sharp and quick. Faced with an armed enemy, he stayed calm, invented a balcony and used an expected knock to trap Max. His ordinary looks hid an extraordinary intelligence.',
  sol: 'His appearance + evidence of intelligence + the contrast.',
}));
Q('sa_presence', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'What is presence of mind? How does Ausable show it in *The Midnight Visitor*? Answer in 40–50 words.',
  model: 'Presence of mind is the ability to think clearly and act wisely in a sudden crisis. Ausable shows it when he finds Max holding a gun. Instead of panicking, he calmly invents a balcony and claims the police are coming, turning the danger against his enemy.',
  sol: 'Definition + evidence of calm thinking under threat.',
}));
Q('sa_max_trait', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What weaknesses in Max’s character led to his downfall? Answer in 40–50 words.',
  model: 'Max was overconfident because he held a gun, so he never doubted Ausable. He was also nervous of the police and acted hastily when the knock came. Being gullible and panicky, he believed an imaginary balcony without checking it, and that mistake cost him dearly.',
  sol: 'Two or three weaknesses (overconfidence, gullibility, panic) + how they caused his fall.',
}));
Q('sa_henry', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'Who was Henry, and why is his arrival a surprise at the end of *The Midnight Visitor*? Answer in 40–50 words.',
  model: 'Henry was a waiter bringing the drinks Ausable had ordered. His arrival is a surprise because both Max and the reader had been led to expect the police. Only then do we realise Ausable knew all along who was coming and used the knock as a trick.',
  sol: 'Who Henry was + why we expected police + what the surprise reveals.',
}));
Q('sa_fowler_role', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What is Fowler’s role in *The Midnight Visitor*? Answer in 40–50 words.',
  model: 'Fowler is the observer through whose eyes we see events. His romantic expectations of spies match the reader’s, so his disappointment and later amazement guide our responses. He takes almost no action himself, but he highlights the contrast between how Ausable looks and what he achieves.',
  sol: 'Observer / reader’s stand-in + how his reactions guide ours + the contrast he highlights.',
}));
Q('sa_suspense', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How does Robert Arthur build suspense in *The Midnight Visitor*? Answer in 40–50 words.',
  model: 'Arthur builds suspense by placing an armed intruder in a small room with an unarmed hero. Ausable’s mysterious talk of a balcony makes us wonder what he plans. The knock adds sudden pressure. Finally, the scream and the waiter’s arrival release the tension with a twist.',
  sol: 'Two or three techniques (danger, mystery, the knock, the twist) with their effect.',
}));
Q('sa_title', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'Is *The Midnight Visitor* a suitable title for the story? Answer in 40–50 words.',
  model: 'Yes. The story centres on Max, an unwelcome visitor waiting in Ausable’s room late at night. The title creates mystery and suspense from the start. It also has a quiet irony, since there is a second visitor, the waiter, whose ordinary arrival finally decides Max’s fate.',
  sol: 'A stand + link to Max and the night setting + suspense + the second visitor.',
}));
Q('sa_brains', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'The Midnight Visitor shows that brains can beat force. Do you agree? Answer in 40–50 words.',
  model: 'Yes. Max had a pistol and the advantage of surprise, while Ausable had no weapon at all. Yet by staying calm and inventing a convincing story, Ausable made Max defeat himself. Clear thinking proved far more powerful than a gun in a moment of danger.',
  sol: 'A stand + contrast of Max’s force and Ausable’s wit + the outcome.',
}));
Q('sa_lesson', short({
  ...SA3, t: 2, d: 4, c: 'application',
  stem: 'What lesson about handling a crisis can students learn from Ausable in *The Midnight Visitor*? Answer in 40–50 words.',
  model: 'Ausable teaches that panic makes a crisis worse, while calm thinking can find a way out. In an emergency, students should stay composed, observe the situation and look for a clever solution. Like Ausable, they can use what they know, such as an expected knock, to their advantage.',
  sol: 'The lesson (stay calm, think) + a practical application + a link to the story.',
}));
Q('sa_reality', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'How does *The Midnight Visitor* contrast the real life of a spy with the image in films and books? Answer in 40–50 words.',
  model: 'Films show spies as handsome, glamorous figures in constant danger. Ausable’s life seems dull: a plain hotel room, papers and waiting. Yet the story shows that real agents need sharp wits and calm nerves, not good looks. The true excitement lies in intelligence rather than glamour.',
  sol: 'The popular image + Ausable’s reality + what the story suggests matters.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_who', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who are Ausable and Fowler in *The Midnight Visitor*? Answer in 30–40 words.',
  model: 'Ausable is a secret agent who is fat, untidy and ordinary in appearance but very clever. Fowler is a young writer who accompanies him, hoping to see the thrilling life of a spy at first hand.',
  sol: 'Ausable (the agent) + Fowler (the young writer who observes).',
}));
Q('sb_report', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'What was the important paper in *The Midnight Visitor*, and why did Max want it? Answer in 30–40 words.',
  model: 'The paper was a report about new missiles, which Ausable expected to receive that night. Max, a rival agent, wanted to steal it because such secret military information would be extremely valuable to the people he worked for.',
  sol: 'The missile report + why it mattered to Max.',
}));
Q('sb_police', short({
  ...SA2, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why did Ausable claim that the knock at the door was the police? Answer in 30–40 words.',
  model: 'He wanted to frighten Max into acting quickly. An agent holding a gun could not risk meeting the police, so the claim pushed Max to hide on the imaginary balcony instead of thinking clearly.',
  sol: 'Purpose: to frighten Max + the effect: a hasty, fatal decision.',
}));
Q('sb_scream', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What happened when Max climbed out of the window in *The Midnight Visitor*? Answer in 30–40 words.',
  model: 'Max stepped out expecting to stand on a balcony, but there was nothing there. He fell towards the street below, and a scream was heard. Ausable’s invented balcony had trapped him completely.',
  sol: 'No balcony + Max fell + the trap had worked.',
}));
Q('sb_calm', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'How did Ausable’s calmness help him against Max? Answer in 30–40 words.',
  model: 'Because Ausable stayed calm, Max did not suspect a trick. His relaxed grumbling about the balcony sounded natural, and his steady manner let him think clearly enough to plan Max’s defeat.',
  sol: 'Calm made the lie believable + let him think clearly.',
}));
Q('sb_fowler_end', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How did Fowler feel at the end of *The Midnight Visitor*, and why? Answer in 30–40 words.',
  model: 'Fowler was astonished. He had seen an ordinary-looking man defeat an armed spy using only quick thinking, and he realised that real secret agents depend on intelligence, not on glamour or weapons.',
  sol: 'His astonishment + what he realised.',
}));

// ================================================================ long answers, 6 marks (100–120 words): board pattern
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_ausable_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Ausable in *The Midnight Visitor*, showing how his appearance hides his abilities. Answer in 100–120 words.',
  model: 'Ausable is a secret agent who looks nothing like one. He is fat, untidy and unimpressive, and he lives in an ordinary hotel room, which disappoints Fowler. Yet behind this plain exterior is a brilliant mind. When he finds Max waiting with a pistol, he stays perfectly calm, showing steady nerves. He is quick-witted, inventing a balcony on the spot and mentioning it so casually that Max believes him. He is also a careful planner, using the expected knock of the waiter as part of his trap. He defeats an armed enemy without any weapon or violence. Ausable proves that real ability lies in the mind, not in looks.',
  sol: 'Appearance (with evidence) + four traits (calm, quick-witted, imaginative, planner) with evidence + conclusion about appearance and ability.',
}));
Q('la_appearance_theme', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Appearances can be deceptive. Discuss this idea with reference to *The Midnight Visitor*. Answer in 100–120 words.',
  model: 'The Midnight Visitor proves that we should never judge by appearances. Fowler expects a secret agent to be glamorous, but Ausable is fat, untidy and dull-looking, so Fowler is disappointed. Max, too, is misled. Holding a pistol, he feels in control and underestimates the plain man in front of him. Yet Ausable outwits him completely, inventing a balcony and turning a waiter’s knock into a police visit. Even the balcony itself is an appearance with nothing behind it. The story shows that intelligence, calm and courage often hide behind ordinary faces. In real life too, we should value people for their qualities and actions, not for how they look.',
  sol: 'A stand + evidence (Fowler’s view, Max’s mistake, Ausable’s success, the balcony) + a real-life application.',
}));
Q('la_fowler_diary', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Fowler. Write a diary entry about the night you spent with Ausable. Answer in 100–120 words.',
  model: 'Late at night\n\nWhat an evening! I went with Ausable hoping for beautiful strangers and gunfire, and at first I was bitterly disappointed. He is fat and untidy, and his room is perfectly ordinary. Then we found a man called Max waiting there with a pistol, demanding a report about new missiles. My heart was pounding, yet Ausable stayed calm and grumbled about a balcony outside his window. When someone knocked, he said it was the police. Max climbed out to hide, and I heard a terrible scream. There was no balcony! The visitor was only the waiter with drinks. Tonight I learnt that real courage lives in a quick mind.',
  sol: 'Diary format (time, first person, feelings). Content consistent with the story (expectations, Max, the balcony, the knock, the scream, the waiter) + Fowler’s changed view.',
}));
Q('la_max_mistakes', long({
  ...LA, t: [4, 3], d: 4, c: 'analysis',
  stem: 'Max had a gun and Ausable had none, yet Max lost. Explain why, with reference to *The Midnight Visitor*. Answer in 100–120 words.',
  model: 'Max had every physical advantage: he arrived first, surprised Ausable and held a pistol. Yet he lost because he relied on force and underestimated his opponent. Seeing a fat, ordinary man, he assumed Ausable was harmless. He accepted the story of the balcony without checking it, showing that he was gullible. When the knock came, his fear of the police made him panic and act in haste. Ausable, on the other hand, used calm thinking and an expected event to his advantage. He never threatened Max; he let Max’s own mistakes trap him. The contest shows that a weapon is useless in the hands of someone who stops thinking clearly.',
  sol: 'Max’s advantages + his mistakes (underestimation, gullibility, panic) + Ausable’s strengths + conclusion.',
}));
Q('la_report_police', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Ausable. Write a short report to your chief describing how you protected the missile report from Max. Answer in 100–120 words.',
  model: 'To: The Chief\nSubject: Attempt to seize the missile report\n\nLast night, on returning to my hotel room with a young writer, Fowler, I found an enemy agent, Max, waiting with a pistol. He demanded the report on new missiles that I was due to receive. Having no weapon, I relied on a story. I complained casually that intruders kept using a balcony outside my window, which Max believed. I knew the waiter was about to bring my drinks, so when he knocked, I claimed it was the police. Max chose to hide on the non-existent balcony and fell. The report remains safe. I recommend no changes to procedure.\n\nAusable',
  sol: 'Report format (to, subject, sign-off; factual, past tense). Content consistent with the story: Max, the missile report, the balcony story, the waiter’s knock, the outcome.',
}));
Q('la_twist', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does the twist ending of *The Midnight Visitor* make the story effective? Answer in 100–120 words.',
  model: 'The twist ending turns a tense scene into a satisfying surprise. Throughout the story, Ausable’s talk of a balcony seems like mere grumbling, and the knock seems to bring the police. Only when Max has vanished over the sill and Henry the waiter walks in with drinks do we understand everything. Ausable had known who was coming and had built his trap around that ordinary event. The twist forces readers to look back and see how cleverly every detail was planned. It also completes the theme of appearance and reality, since the balcony, the police and Ausable’s dullness were all different from how they seemed. A predictable ending would have lost this delight.',
  sol: 'What the twist is + how earlier details are reinterpreted + link to theme + effect on the reader.',
}));
Q('la_values', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'What qualities does *The Midnight Visitor* show are needed to face danger? Answer in 100–120 words.',
  model: 'The story shows that facing danger needs qualities of the mind more than strength. The first is calmness. Ausable does not panic at the sight of Max’s pistol, so he can think. The second is presence of mind: he invents the balcony on the spot. The third is careful observation and planning, since he uses the waiter’s expected knock as part of his trap. Fourth, he shows confidence and self-control, never revealing his plan through his face or voice. Max, by contrast, has a weapon but loses because he panics and believes too easily. These qualities matter for everyone, whether in exams, emergencies or arguments, because clear thinking is our best protection.',
  sol: 'Three or four qualities (calm, presence of mind, planning, self-control) with evidence + contrast with Max + wider application.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Comment on the suitability of the title *The Midnight Visitor*. Suggest an alternative title and justify it. Answer in 100–120 words.',
  model: 'The title suits the story well. It refers to Max, the uninvited visitor who waits in Ausable’s room late at night, and it creates an atmosphere of mystery and danger from the first word. It also hints at a second visitor, the waiter, whose ordinary knock decides the outcome, so the title carries a quiet irony. However, it focuses on the visitor rather than on the hero’s cleverness. An alternative title could be “The Balcony That Wasn’t There”. This would point to the central trick, add humour and highlight the theme of appearance and reality. Still, the original title keeps the ending secret, which makes it the better choice for suspense.',
  sol: 'Evaluation of the title (Max, night, mystery, second visitor) + an alternative with reasons + a final judgement.',
}));
Q('la_debate', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Was Ausable right to trick Max in a way that put Max in danger? Give your view with reference to *The Midnight Visitor*. Answer in 100–120 words.',
  model: 'In my view, Ausable was justified. Max broke into his room, threatened him with a pistol and tried to steal secret military information. Ausable was unarmed, and Fowler was with him, so both lives were at risk. He did not attack Max; he only told a story, and Max chose to climb out of the window. A trained agent in his position had a duty to protect the report. Some may argue that he should have found a way that did not risk a life, perhaps by delaying until help arrived. But in a sudden crisis, with a gun pointed at him, Ausable used the only weapon he had: his mind.',
  sol: 'A clear stand + evidence (the threat, the report, Max’s own choice) + the opposing view + conclusion. A reasoned opposite view also earns full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*The Midnight Visitor* in *Footprints without Feet* was written by…', opts: ['Robert Arthur', 'Ruskin Bond', 'James Herriot', 'Victor Canning'], sol: 'Robert Arthur wrote the story.' }));
Q('mc_ausable_job', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Ausable’s occupation in *The Midnight Visitor*?', opts: ['a secret agent', 'a hotel manager', 'a detective writer', 'a police chief'], sol: 'Ausable was a secret agent.' }));
Q('mc_looks', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which description best fits Ausable’s appearance?', opts: ['fat and untidy', 'tall and handsome', 'thin and athletic', 'smartly uniformed'], sol: 'He was heavy and unremarkable to look at.' }));
Q('mc_weapon', mcq({ t: 1, d: 1, c: 'recall', stem: 'What weapon did Max hold when Ausable found him in the room?', opts: ['a pistol', 'a knife', 'a stick', 'a rope'], sol: 'Max held a pistol.' }));
Q('mc_invented', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did Ausable invent to trap Max in *The Midnight Visitor*?', opts: ['a balcony outside the window', 'a secret staircase', 'a hidden alarm bell', 'a second report'], sol: 'He made up a balcony.' }));
Q('mc_why_believe', mcq({ t: [2, 3], d: 3, c: 'analysis', stem: 'Why did Max believe Ausable’s story about the balcony?', opts: ['Ausable mentioned it casually, as a familiar annoyance.', 'Max could see the balcony clearly.', 'Fowler confirmed it.', 'The hotel manager had told Max about it.'], sol: 'The casual grumbling made the lie sound true.' }));
Q('mc_door', mcq({ t: 1, d: 2, c: 'recall', stem: 'Who actually knocked at Ausable’s door?', opts: ['Henry, a waiter', 'the police', 'Fowler’s friend', 'Max’s partner'], sol: 'It was the waiter bringing drinks.' }));
Q('mc_trait', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which quality of Ausable does *The Midnight Visitor* highlight most?', opts: ['presence of mind', 'physical strength', 'wealth', 'good looks'], sol: 'Quick, calm thinking defeats Max.' }));
Q('mc_theme', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Midnight Visitor* most strongly convey?', opts: ['Intelligence matters more than appearance or force.', 'Spies always carry guns.', 'Hotels should have balconies.', 'Writers should not meet spies.'], sol: 'Ausable’s mind defeats Max’s gun.' }));
Q('mc_apply_quiz', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'In a quiz final, a quiet student who looks nervous beats the confident favourite by staying calm and thinking clearly. Which character in *The Midnight Visitor* does the quiet student resemble?', opts: ['Ausable', 'Max', 'Fowler', 'Henry'], sol: 'Like Ausable, the student wins by calm thinking despite looking unimpressive.' }));
Q('mc_fowler_role', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What is Fowler’s main role in *The Midnight Visitor*?', opts: ['an observer whose expectations mirror the reader’s', 'the villain of the story', 'the agent who traps Max', 'the waiter who brings drinks'], sol: 'He watches events and reacts as the reader might.' }));
Q('mc_irony', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about the visitor at the door at the end of *The Midnight Visitor*?', opts: ['The feared police turn out to be a harmless waiter.', 'The waiter is actually a spy.', 'Fowler had invited the police.', 'Max returns through the door.'], sol: 'An ordinary visit becomes the decisive part of the trap.' }));
Q('mc_genre', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What kind of story is *The Midnight Visitor*?', opts: ['a spy story with a twist ending', 'a fable about animals', 'a historical biography', 'a comic play'], sol: 'It is a short spy thriller with a surprise ending.' }));
Q('mc_mood', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'd', stem: 'How does the mood of *The Midnight Visitor* change once Max is discovered in the room?', opts: ['from tense to dull', 'from joyful to sad', 'from calm to comic', 'from dull to tense'], sol: 'The ordinary evening suddenly becomes dangerous.' }));

Q('fb_agent', fb({ t: 1, d: 1, c: 'recall', stem: 'In *The Midnight Visitor*, the fat, untidy secret agent is called ___.', acc: [['Ausable']], sol: 'The agent is **Ausable**.' }));
Q('fb_waiter', fb({ t: 1, d: 1, c: 'recall', stem: 'The waiter who knocked at Ausable’s door was named ___.', acc: [['Henry']], sol: 'The waiter was **Henry**.' }));
Q('fb_visitor', fb({ t: 1, d: 2, c: 'recall', marks: 2, stem: 'The armed intruder, ___, had come for a report about new ___.', acc: [['Max'], ['missiles']], sol: '**Max** wanted the report on new **missiles**.', scheme: [['Max', 1], ['missiles', 1]] }));
Q('fb_device', fb({ t: 2, d: 2, c: 'understanding', stem: 'The surprise arrival of the waiter gives *The Midnight Visitor* a ___ ending.', acc: [['twist', 'surprise']], sol: 'It has a **twist** ending.' }));

Q('ar_calm', ar({ t: [2, 3], d: 3, c: 'analysis', a: 'Ausable remained calm when he found Max in his room.', r: 'Ausable’s calm manner made his story about the balcony believable.', key: 'b', sol: 'Both are true, but R describes an effect of his calm, not the reason he was calm.' }));
Q('ar_balcony', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Max fell when he climbed out of the window.', r: 'There was no balcony outside Ausable’s window.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_police', ar({ t: 1, d: 3, c: 'understanding', a: 'The police knocked at Ausable’s door at the end of the story.', r: 'Henry, the waiter, brought the drinks Ausable had ordered.', key: 'd', sol: 'A is false: it was the waiter, not the police. R is true.' }));
Q('ar_fowler', ar({ t: 3, d: 3, c: 'analysis', a: 'Fowler was disappointed when he first met Ausable.', r: 'Fowler had once worked as a secret agent himself.', key: 'c', sol: 'A is true. R is false: Fowler was a young writer, not an agent.' }));

Q('tf_glamour', tf({ t: 3, d: 1, c: 'recall', stem: 'True or false: in *The Midnight Visitor*, Ausable looked exactly like a glamorous film spy.', ans: false, sol: 'He was fat and untidy.' }));
Q('tf_unarmed', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: Ausable defeated Max without using any weapon.', ans: true, sol: 'He used only words and quick thinking.' }));
Q('tf_balcony_real', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: the balcony Ausable described was real.', ans: false, sol: 'He invented it.' }));
Q('tf_report', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Max wanted a report concerning new missiles.', ans: true, sol: 'That was the paper he came for.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *The Midnight Visitor* in the order in which they happen.',
  items: ['Fowler is disappointed by Ausable’s appearance.', 'Max is found waiting in the room with a pistol.', 'Ausable grumbles about the balcony.', 'There is a knock at the door.', 'Max climbs out of the window.', 'Henry the waiter enters with drinks.'],
  sol: 'Disappointment → Max → the balcony → the knock → the fall → the waiter.',
}));
Q('ord_trap', ord({
  t: [2, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the steps of Ausable’s trap in *The Midnight Visitor*.',
  items: ['Ausable stays calm before the pistol.', 'He mentions an imaginary balcony.', 'He claims the knock is the police.', 'Max decides to hide outside.', 'Max steps into empty air.'],
  sol: 'Calm → the invented balcony → the false police → Max’s choice → the fall.',
}));

Q('mt_people', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each character in *The Midnight Visitor* with their role.',
  pairs: [['Ausable', 'the secret agent'], ['Fowler', 'the young writer'], ['Max', 'the armed intruder'], ['Henry', 'the waiter at the door']],
  sol: 'The four characters of the story.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for discussing *The Midnight Visitor* with their meanings.',
  pairs: [['intruder', 'a person who enters without permission'], ['gullible', 'easily tricked'], ['composure', 'calmness under pressure'], ['deceptive', 'giving a false impression']],
  sol: 'Key words for writing about this story.',
}));
Q('mt_actions', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each action in *The Midnight Visitor* with the quality it reveals.',
  pairs: [['Ausable ignores the pistol’s threat', 'composure'], ['Ausable invents the balcony', 'quick wit'], ['Max believes the story at once', 'gullibility'], ['Max rushes to hide', 'panic']],
  sol: 'Each action and the quality it reveals.',
}));
