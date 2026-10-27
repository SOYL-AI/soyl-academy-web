// CBSE 10 English Language and Literature, ch26 "A Question of Trust" (Victor Canning) — question bank.
// Footprints without Feet (supplementary reader). LITERATURE RULE (CONTEXT §8, D-036): no sentence, close
// paraphrase or distinctive phrase of the story appears here; speech is reported, never quoted. Passages
// are SOYL commentary (passage_origin: soyl-commentary). Students read the story in their textbook.
// PATTERN: the board examines Footprints through 3-mark short answers (Q9, 40–50 words) and a 6-mark long
// answer on character, theme and values; it prints no Footprints extract. The bank is weighted that way
// (14 three-mark, 9 long) with only the 5 commentary items the chapter-test blueprints' extract slots need.
// Topics: t01 context and summary · t02 themes (the irony of a thief tricked by another thief) · t03
// characters (Horace Danby) · t04 exam practice.
// Left out (cannot be confirmed without the text): the value of the jewels, the dog's name and how Horace
// handled it, where the safe was hidden, how Horace entered the house, how long he had planned, the
// woman's exact words and excuse, and his prison sentence.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on Victor Canning's story, not an extract from it. Read the story itself in your textbook, Footprints without Feet. The board paper does not print extracts from this reader; use this item as a comprehension check.)*";
const SRC_STEM = `*A Question of Trust*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view or value supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary items (source-based)
Q('src_horace', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Canning's hero is an unusual criminal. Horace Danby is a middle-aged, unmarried man who makes locks for a living and is regarded by his neighbours as thoroughly respectable. His one passion is collecting rare, costly books, and to pay for them he commits a single, carefully planned robbery each year. He thinks of himself almost as a gentleman: polite, tidy and opposed to violence. Yet the comfortable picture hides a contradiction. A man who earns trust by making locks also earns his luxuries by breaking them, and the story will test whether such a man can himself be fooled.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did Horace Danby do for a living in *A Question of Trust*?', opts: ['He made locks.', 'He sold books.', 'He was a police officer.', 'He worked as a butler.'], sol: 'Horace was a locksmith.' })),
    child('b', fb({ t: 3, d: 1, c: 'recall', stem: 'Horace robbed a single safe each year to pay for his collection of rare ___.', acc: [['books']], sol: 'His passion was rare **books**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Horace’s neighbours regard him?', opts: ['as a respectable man', 'as a known criminal', 'as a dangerous stranger', 'as a lazy idler'], sol: 'To others he seemed entirely respectable.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What contradiction in Horace’s life does the commentary point out?', model: 'He makes locks to keep people safe, yet he breaks into safes to fund his hobby.', sol: 'Lock-maker by day, safe-breaker by plan.', scheme: [['Makes locks yet breaks safes', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which idea does this opening of *A Question of Trust* prepare the reader for?', opts: ['The clever deceiver may himself be deceived.', 'Horace will become a famous author.', 'Respectable people never commit crimes.', 'Locksmiths are always honest.'], sol: 'It hints at the coming irony.' })),
  ],
  sol: 'Parts (a)–(c) recall the portrait; (d) and (e) interpret it.',
}));
Q('src_plan', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "This year Horace's target is Shotover Grange, a large country house with a safe full of valuable jewellery. He has done his homework thoroughly. He knows that the owners are away in London and that the servants will be out, so the house should be empty. Everything about the plan reflects his character: patience, precision and confidence in his own skill. There is only one weakness in the scheme, and it is not in the house at all. It is in Horace himself, for he suffers from hay fever, and the rooms of a fine country house are often full of flowers.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which house did Horace plan to rob in *A Question of Trust*?', opts: ['Shotover Grange', 'Baskerville Hall', 'Thornfield House', 'Kensington Manor'], sol: 'His target was Shotover Grange.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Why did Horace expect Shotover Grange to be empty?', opts: ['The owners were in London and the servants were out.', 'The house had been sold.', 'A party was being held elsewhere.', 'The police had closed it.'], sol: 'The family was away and the servants had gone out.' })),
    child('c', fb({ t: 3, d: 2, c: 'recall', stem: 'Horace suffered from hay ___, which made flowers a problem for him.', acc: [['fever']], sol: 'He had hay **fever**.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does Horace’s careful preparation show about him?', model: 'He is patient, methodical and confident in his skill as a thief.', sol: 'Patience and precision.', scheme: [['Patient / methodical / confident', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary say the weakness in the plan lies in Horace himself?', opts: ['His hay fever could give him away among the flowers.', 'He had forgotten the address.', 'He was afraid of the dark.', 'He did not know how to open safes.'], sol: 'His allergy is the flaw he cannot plan away.' })),
  ],
  sol: 'Note how the plan reflects Horace’s character, and where it is weak.',
}));
Q('src_lady', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Just as Horace begins work, a young woman appears in the doorway, calm and amused rather than alarmed. She lets him believe she is the lady of the house. Instead of calling the police at once, she makes him an offer: she has, she says, forgotten the combination of the safe and needs her jewels, so if he opens it for her, she will let him go. Horace, embarrassed and eager to escape trouble, agrees. Her poise, her fine manners and her apparent ownership of the house all persuade him. It never crosses his mind that she might be playing the very game he plays himself.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who surprised Horace while he was in the house?', opts: ['a young woman', 'the butler', 'a police officer', 'the owner’s son'], sol: 'A young woman appeared in the doorway.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Who did Horace believe the young woman to be?', opts: ['the lady of the house', 'a maid', 'a police detective', 'his own assistant'], sol: 'She let him think she was the lady of the house.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The woman said she had forgotten the ___ of the safe.', acc: [['combination', 'code']], sol: 'She claimed to have forgotten the **combination**.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why did Horace trust the young woman so easily?', model: 'Her calm, polished manner and her air of owning the house made her story seem natural.', sol: 'Her poise and apparent ownership persuaded him.', scheme: [['Her poise and apparent ownership convinced him', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about Horace being taken in by the woman?', opts: ['A practised deceiver fails to see that he is being deceived.', 'The woman is afraid of Horace.', 'Horace refuses to open the safe.', 'The safe is empty.'], sol: 'The trickster is tricked by someone playing his own game.' })),
  ],
  sol: 'Separate what happens (a–c) from why it works and what it means (d, e).',
}));
Q('src_safe', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Opening the safe is Horace's chance to show his skill, and he cannot resist doing it well. Under the woman's admiring eye he sets to work, and in his eagerness he handles the safe without the protection of his gloves. The lock gives way, the jewels are handed over, and Horace leaves, relieved to have escaped so lightly. Meanwhile his allergy has troubled him throughout, a reminder that the careful planner could not control everything. He goes home believing the episode is over. In fact he has left behind exactly the evidence that a careful thief should never leave.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Horace do for the woman in the house?', opts: ['He opened the safe for her.', 'He fixed her car.', 'He called the police for her.', 'He wrote her a cheque.'], sol: 'He opened the safe and gave her the jewels.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'Because he worked without gloves, Horace left his ___ on the safe.', acc: [['fingerprints', 'prints', 'finger prints']], sol: 'He left his **fingerprints**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Horace feel as he left the house?', opts: ['relieved to have escaped trouble', 'proud of a rich haul', 'angry with the woman', 'worried about his books'], sol: 'He thought he had got off lightly.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say Horace could not resist doing the job well?', model: 'He took pride in his skill and enjoyed showing it off to an admiring audience.', sol: 'Professional pride.', scheme: [['Pride in his skill made him careless', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does this part of *A Question of Trust* suggest about Horace’s downfall?', opts: ['His pride and trust made him careless.', 'He was unlucky with the weather.', 'The woman forced him at gunpoint.', 'He wanted to be caught.'], sol: 'Vanity and misplaced trust undo the careful planner.' })),
  ],
  sol: 'Link the missing gloves to the ending.',
}));
Q('src_prison', source({
  t: [1, 2], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The truth arrives with the police. The jewels are gone, Horace's fingerprints are on the safe, and the charming young woman was never the lady of the house at all: she was a thief who had let Horace do the difficult part for her. He is arrested and sent to prison. There, working among books once more, he finds it hard to accept that he, the careful professional, was so neatly used. The title now reads as a bitter joke. Horace trusted a stranger because she seemed respectable, exactly as his own neighbours had always trusted him.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What happened to Horace Danby at the end of *A Question of Trust*?', opts: ['He was arrested and sent to prison.', 'He married the young woman.', 'He became a police officer.', 'He escaped abroad.'], sol: 'He was caught and imprisoned.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Who was the young woman really?', opts: ['a thief, not the lady of the house', 'the owner’s daughter', 'an undercover police officer', 'Horace’s former assistant'], sol: 'She was another thief.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'A situation in which the opposite of what is expected happens is called ___.', acc: [['irony', 'situational irony']], sol: 'This is **irony**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Do you feel sorry for Horace at the end? Give one reason.', model: 'Not really; he was a thief himself, so he suffered the same deception he practised on others.', sol: 'Either view, if supported (he deserved it, or he was cruelly used).', scheme: [['A view supported by one reason', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary call the title a bitter joke?', opts: ['Horace’s trust in a stranger led to his ruin.', 'Horace never trusted anyone.', 'The woman trusted Horace.', 'The police trusted Horace.'], sol: 'Trust, the question in the title, is what destroys him.' })),
  ],
  sol: 'Link the ending to the title and to how others had trusted Horace.',
}));

// ================================================================ short answers, 3 marks (40–50 words): board Q9 pattern
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_horace_life', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Describe Horace Danby’s life before the robbery at Shotover Grange. Answer in 40–50 words.',
  model: 'Horace was a middle-aged, unmarried locksmith whom everyone thought respectable. He loved collecting rare, expensive books, which his business could not pay for. So, once a year, he carefully planned and carried out one robbery, using the money to buy books for the year ahead.',
  sol: 'His respectable public life + his passion for books + the yearly robbery that funded it.',
}));
Q('sa_why_steal', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Why did Horace Danby steal, and how did he justify it to himself? Answer in 40–50 words.',
  model: 'Horace stole to pay for rare, costly books. He saw himself as a gentleman thief: he was polite, avoided violence and robbed only once a year. Because he did not think of himself as a common criminal, he believed his crimes were harmless and almost respectable.',
  sol: 'His motive (books) + his self-image (careful, non-violent, occasional) + the self-deception.',
}));
Q('sa_plan', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How had Horace planned the robbery at Shotover Grange? Answer in 40–50 words.',
  model: 'Horace studied Shotover Grange carefully before acting. He learnt that the family would be away in London and that the servants would be out, so the house would be empty. He knew there was a safe full of jewels. The plan shows his patience and thoroughness.',
  sol: 'What he found out (family in London, servants out, the safe) + what it shows.',
}));
Q('sa_hayfever', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'What part does Horace’s hay fever play in *A Question of Trust*? Answer in 40–50 words.',
  model: 'Horace suffered from hay fever, and the flowers in the house set him sneezing. This weakness made him uncomfortable and less alert inside the house. It shows that even the most careful planner cannot control everything, and it adds a touch of humour to the tense situation.',
  sol: 'The allergy + its effect in the house + what it suggests (limits of planning; humour).',
}));
Q('sa_lady_trick', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'How did the young woman trick Horace Danby? Answer in 40–50 words.',
  model: 'The young woman appeared calmly and let Horace think she owned the house. She claimed she had forgotten the safe’s combination and offered not to call the police if he opened it. Horace agreed, handed over the jewels and left, unaware she was a thief herself.',
  sol: 'Her pretended identity + her offer + Horace opening the safe + the truth.',
}));
Q('sa_why_trust', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Why did Horace trust the young woman in *A Question of Trust*? Answer in 40–50 words.',
  model: 'She was young, elegant and perfectly composed, and she behaved as if she owned the house. Horace, caught in the act and anxious to avoid the police, was eager to believe her. Her charm and confidence, together with his fear, stopped him from questioning her story.',
  sol: 'Her manner and apparent ownership + Horace’s fear + how both blinded him.',
}));
Q('sa_caught', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How was Horace Danby caught after the robbery? Answer in 40–50 words.',
  model: 'When the jewels were found missing, the police examined the safe and found Horace’s fingerprints on it, since he had opened it without gloves. The real thief, the young woman, had left no trace. Horace was arrested and sent to prison for a theft he did not profit from.',
  sol: 'The fingerprints (no gloves) + the woman’s escape + his arrest.',
}));
Q('sa_irony', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Explain the irony at the heart of *A Question of Trust*. Answer in 40–50 words.',
  model: 'Horace was a clever thief who fooled his neighbours with his respectable image. Yet he himself was fooled by a woman who seemed respectable but was also a thief. The deceiver was deceived, and he went to prison for jewels he never kept.',
  sol: 'Horace as deceiver + being deceived in the same way + the outcome.',
}));
Q('sa_title', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'Is *A Question of Trust* a suitable title for Victor Canning’s story? Answer in 40–50 words.',
  model: 'Yes. The story turns on whether Horace should trust the young woman. His mistake was to believe her because she seemed respectable. The title also raises a wider question, since Horace himself had abused the trust of those who believed him an honest locksmith.',
  sol: 'A stand + the trust Horace misplaces + the trust he betrays.',
}));
Q('sa_horace_traits', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Mention three traits of Horace Danby with evidence from *A Question of Trust*. Answer in 40–50 words.',
  model: 'Horace is methodical, planning one careful robbery a year. He is cultured, spending his loot on rare books. He is also gullible and vain: he believes a stranger because of her charm, and proudly opens the safe without gloves to show his skill, leaving fingerprints behind.',
  sol: 'Three traits (methodical, cultured, gullible, vain, non-violent) each with evidence.',
}));
Q('sa_lady_traits', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of person is the young woman in *A Question of Trust*? Answer in 40–50 words.',
  model: 'The young woman is clever, cool and highly confident. She stays perfectly calm on finding a burglar and quickly turns the situation to her advantage. Her charm hides her cunning. By getting Horace to open the safe, she takes the jewels while leaving him to bear the blame.',
  sol: 'Two or three traits (cool, cunning, charming, confident) with evidence.',
}));
Q('sa_crime_pays', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Does *A Question of Trust* suggest that crime does not pay? Answer in 40–50 words.',
  model: 'Yes. Horace had committed robberies for years, believing his careful methods made him safe. In the end he lost everything: he gained nothing from the jewels and went to prison. His fate suggests that dishonesty eventually catches up with a person, however clever or respectable they seem.',
  sol: 'A stand + Horace’s past and his fall + a general lesson.',
}));
Q('sa_appearances', short({
  ...SA3, t: 2, d: 4, c: 'application',
  stem: 'What does *A Question of Trust* teach about judging people by their appearance? Answer in 40–50 words.',
  model: 'The story warns that appearances can hide the truth. Horace looked like a respectable locksmith but was a thief, and the young woman looked like a lady but was a thief too. We should judge people by their actions, and check claims, before placing our trust in them.',
  sol: 'Two examples of misleading appearance + the practical lesson.',
}));
Q('sa_prison', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How does Horace Danby feel in prison at the end of the story, and why? Answer in 40–50 words.',
  model: 'In prison Horace finds it hard to accept what happened. He, the careful professional, had been used by a stranger who walked away with the jewels while he took the punishment. His pride is hurt, and he is bitter about how easily his trust was exploited.',
  sol: 'His feelings (bitterness, wounded pride) + the reason (used and blamed).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_who', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who is Horace Danby in *A Question of Trust*? Answer in 30–40 words.',
  model: 'Horace Danby is a middle-aged, unmarried locksmith who seems respectable to everyone. Secretly he is a thief who robs one safe each year to pay for his collection of rare and expensive books.',
  sol: 'His public role (locksmith, respectable) + his secret (yearly robbery for books).',
}));
Q('sb_target', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'What was at Shotover Grange that attracted Horace Danby? Answer in 30–40 words.',
  model: 'Shotover Grange had a safe containing valuable jewellery. Horace learnt that the owners would be away in London and the servants out, so it seemed the perfect target for his yearly robbery.',
  sol: 'The safe of jewels + why the timing suited him.',
}));
Q('sb_offer', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What offer did the young woman make to Horace Danby? Answer in 30–40 words.',
  model: 'She said she would not report him to the police if he opened the safe for her, claiming she had forgotten its combination and needed her jewels. Horace, eager to escape, accepted the offer.',
  sol: 'Her promise (no police) + her request (open the safe) + his acceptance.',
}));
Q('sb_gloves', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'Why was opening the safe without gloves a serious mistake for Horace? Answer in 30–40 words.',
  model: 'Without gloves he left fingerprints on the safe. When the jewels disappeared, the police could identify him easily, while the real thief left no trace. A careful planner had been careless at the worst moment.',
  sol: 'Fingerprints as evidence + the contrast with the woman + the irony of carelessness.',
}));
Q('sb_books', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What does Horace’s love of rare books tell us about him? Answer in 30–40 words.',
  model: 'It shows that Horace was cultured and had refined tastes. However, his passion for expensive books was also his weakness, because it led him to steal in order to afford a pleasure his honest income could not support.',
  sol: 'Cultured taste + how it drives his crime.',
}));
Q('sb_lesson', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'State one lesson for readers from Horace Danby’s fate in *A Question of Trust*. Answer in 30–40 words.',
  model: 'One lesson is that dishonesty, however carefully managed, eventually brings ruin. Another is that we should not trust strangers merely because they look respectable. Horace learnt both lessons too late.',
  sol: 'One clear lesson linked to Horace’s fate.',
}));

// ================================================================ long answers, 6 marks (100–120 words): board pattern
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_horace_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Horace Danby in *A Question of Trust*. Answer in 100–120 words.',
  model: 'Horace Danby is a man of contradictions. To the world he is a respectable, unmarried locksmith, polite and tidy. Secretly he is a thief who robs one safe each year to pay for rare, expensive books. He is cultured and methodical, planning each robbery with patience, as his study of Shotover Grange shows. He dislikes violence and thinks of himself almost as a gentleman. Yet he is also vain and gullible. When a charming young woman catches him, he believes her claim to own the house, and he proudly opens the safe without gloves. His trust and pride lead to his arrest. Horace is clever, but not clever enough to see through someone like himself.',
  sol: 'Public vs secret life + four traits with evidence (methodical, cultured, non-violent, vain, gullible) + how they cause his downfall.',
}));
Q('la_irony_theme', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'A Question of Trust is the story of a thief who is cheated by another thief. Discuss the irony of the story. Answer in 100–120 words.',
  model: 'The story is built on irony. Horace Danby deceives the world by appearing to be a respectable locksmith while secretly robbing safes. He is proud of his careful planning and believes he cannot be caught. Yet at Shotover Grange he meets a young woman who deceives him exactly as he deceives others. She seems to be the lady of the house, so he trusts her and opens the safe without gloves. She takes the jewels and vanishes, while his fingerprints send him to prison. The man who earns his living from locks is undone by a stranger’s key words. The irony delivers the moral: those who exploit trust may find their own trust exploited.',
  sol: 'Horace as deceiver + how he is deceived + the outcome + the moral of the irony.',
}));
Q('la_trust', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Discuss the role of trust in *A Question of Trust*. Whose trust is betrayed, and by whom? Answer in 100–120 words.',
  model: 'Trust is at the centre of the story in more than one way. Horace’s neighbours and customers trust him as an honest locksmith, yet he betrays that trust by breaking into safes every year. At Shotover Grange the roles reverse. Horace trusts a young woman because she seems wealthy, calm and at home, and believes her promise not to call the police. She betrays him completely, taking the jewels and leaving him to face the charges. Even the owners of the house, who trusted their servants and their safe, are betrayed. The title asks whether anyone can be trusted, and suggests that people who abuse trust should not expect it to protect them.',
  sol: 'Trust placed in Horace and betrayed + trust Horace places and loses + a wider comment on the title.',
}));
Q('la_horace_diary', long({
  ...LA, t: [4, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Horace Danby in prison. Write a diary entry reflecting on the robbery at Shotover Grange. Answer in 100–120 words.',
  model: 'Prison library, evening\n\nI still cannot believe how foolish I was. For years I planned every job with care, and nobody suspected the quiet locksmith with his rare books. At Shotover Grange everything seemed perfect: the family away, the servants out. Then that young woman appeared, so calm and elegant that I never doubted she owned the house. When she asked me to open the safe, I was flattered and relieved. I even took off my gloves to work faster. She walked away with the jewels; I walked into prison. I deceived others for years, and one clever smile deceived me. Perhaps this is the justice I always managed to avoid.',
  sol: 'Diary format (place/time, first person, reflection). Content consistent with the story: his yearly habit, the plan, the woman, the gloves, the arrest + a moral insight.',
}));
Q('la_lady_letter', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the young woman in *A Question of Trust*. Write a letter to a friend describing how you obtained the jewels. Answer in 100–120 words.',
  model: 'Dear Kate,\n\nYou will never guess what happened at Shotover Grange. I had heard the family was away, so I slipped in to look at the safe, and found a burglar already there! He was a polite, middle-aged man, sneezing at the flowers. I pretended to be the lady of the house and said I had forgotten the combination. The poor man was so relieved not to be reported that he opened the safe for me, and without gloves too. I took the jewels, thanked him sweetly and let him go. By now the police will have found his fingerprints. Sometimes the best way to open a lock is to find someone who trusts you.\n\nLove,\nJ.',
  sol: 'Informal letter format (greeting, body, close). Content consistent with the story (her pretence, the forgotten combination, Horace opening the safe without gloves, the fingerprints). Her voice: confident and amused.',
}));
Q('la_crime_debate', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Horace Danby thought his crimes were harmless because he was polite and non-violent. Was he right? Give your view with reference to *A Question of Trust*. Answer in 100–120 words.',
  model: 'Horace was wrong to think his crimes were harmless. It is true that he avoided violence, robbed only once a year and behaved politely. But every robbery still took away property that belonged to someone else, and it betrayed the trust of people who believed he was an honest locksmith. His good manners did not change the nature of the act; they only made it easier for him to deceive himself. The story itself passes judgement. When Horace is fooled by a polite, charming thief, he learns how it feels to be the victim of a pleasant-mannered crime. A crime does not become innocent because it is committed courteously.',
  sol: 'A clear stand + his justifications + why they fail (property, trust, self-deception) + evidence from the ending + conclusion.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Comment on the appropriateness of the title *A Question of Trust*. Answer in 100–120 words.',
  model: 'The title is highly appropriate because trust drives every turn of the story. Horace has built a respectable life on the trust of others, who never suspect the locksmith of robbing safes. The central question arises at Shotover Grange: should he trust the young woman who catches him? He decides to believe her, because she looks and behaves like the owner, and that decision ruins him. The title also invites readers to ask how far appearances can be trusted, since both thieves hide behind respectable faces. Finally, it carries irony, because a man who abused trust is destroyed by trusting. The title therefore captures both the plot and the moral of the story.',
  sol: 'A stand + trust others placed in Horace + the trust he places + appearance and irony + conclusion.',
}));
Q('la_values', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'What values and lessons does *A Question of Trust* offer young readers? Answer in 100–120 words.',
  model: 'The story offers several clear lessons. First, honesty matters more than cleverness. Horace planned every robbery carefully, but his skill could not protect him in the end. Second, crime does not pay: he went to prison and gained nothing from the jewels. Third, we should not judge people by their appearance. Horace looked respectable and so did the young woman, yet both were thieves. Fourth, pride can make us careless; Horace’s wish to show his skill led him to work without gloves. Finally, the story teaches that trust is precious. Those who exploit it, as Horace did for years, may one day find their own trust exploited in return.',
  sol: 'Four or five values (honesty, crime does not pay, appearances, pride, trust) each linked to the story + a conclusion.',
}));
Q('la_ending', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does Victor Canning make the ending of *A Question of Trust* surprising yet fitting? Answer in 100–120 words.',
  model: 'The ending surprises because Canning leads us to accept the young woman exactly as Horace does. She seems calm, wealthy and at home, so her story about the forgotten combination appears believable. Only when the police arrest Horace do we learn that she was a thief, and that his fingerprints have condemned him. Yet the ending also feels fitting. Throughout the story Horace has deceived others by seeming respectable, so it is just that he is deceived the same way. His pride in his skill, shown when he works without gloves, prepares us for his fall. The surprise completes the irony and delivers the moral without any lecture.',
  sol: 'Why it surprises (we share Horace’s view) + why it fits (poetic justice, pride, irony) + the effect.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*A Question of Trust* in *Footprints without Feet* was written by…', opts: ['Victor Canning', 'Robert Arthur', 'Ruskin Bond', 'James Herriot'], sol: 'Victor Canning wrote the story.' }));
Q('mc_passion', mcq({ t: 3, d: 1, c: 'recall', stem: 'What was Horace Danby’s great passion in *A Question of Trust*?', opts: ['rare and expensive books', 'fast cars', 'gambling', 'fine paintings'], sol: 'He loved collecting rare books.' }));
Q('mc_frequency', mcq({ t: 1, d: 2, c: 'recall', stem: 'How often did Horace Danby commit a robbery?', opts: ['once a year', 'once a week', 'every month', 'only once in his life'], sol: 'He robbed one safe each year.' }));
Q('mc_owners', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where were the owners of Shotover Grange on the day of the robbery?', opts: ['in London', 'in their garden', 'at the police station', 'upstairs asleep'], sol: 'The family was away in London.' }));
Q('mc_allergy', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why were the flowers in the house a problem for Horace?', opts: ['He suffered from hay fever.', 'They hid the safe.', 'They belonged to the woman.', 'They set off an alarm.'], sol: 'His hay fever made him sneeze.' }));
Q('mc_claim', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did the young woman claim in order to get Horace to open the safe?', opts: ['that she had forgotten its combination', 'that she was a police officer', 'that the jewels were fake', 'that Horace had robbed her before'], sol: 'She said she had forgotten the combination.' }));
Q('mc_evidence', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What evidence led the police to Horace Danby?', opts: ['his fingerprints on the safe', 'a witness who saw his car', 'a letter he left behind', 'a photograph of him'], sol: 'His fingerprints were on the safe.' }));
Q('mc_woman_really', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Who was the young woman in *A Question of Trust* really?', opts: ['a thief', 'the owner’s wife', 'a detective', 'a maid'], sol: 'She was a thief who used Horace.' }));
Q('mc_trait', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which weakness most directly led to Horace Danby’s downfall?', opts: ['misplaced trust in a stranger', 'laziness', 'fear of the dark', 'lack of skill with locks'], sol: 'He believed the woman without question.' }));
Q('mc_irony', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which statement best expresses the irony of *A Question of Trust*?', opts: ['A deceiver is himself deceived.', 'A policeman becomes a thief.', 'A rich man loses his books.', 'A servant becomes the owner.'], sol: 'Horace is tricked the way he tricks others.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *A Question of Trust* most strongly convey?', opts: ['Dishonesty eventually brings its own punishment.', 'Careful thieves are never caught.', 'Book collectors are always honest.', 'Everyone should own a safe.'], sol: 'Horace’s crimes catch up with him.' }));
Q('mc_apply_online', mcq({ t: [2, 4], d: 3, c: 'application', stem: 'A man who often cheats others online shares his password with a polite stranger and loses his savings. Which character’s fate in *A Question of Trust* does this most resemble?', opts: ['Horace Danby’s', 'the young woman’s', 'the owners’ in London', 'the police officers’'], sol: 'Like Horace, a deceiver is undone by trusting a charming deceiver.' }));
Q('mc_tone', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What is the tone of *A Question of Trust*?', opts: ['lightly ironic and humorous', 'tragic and gloomy', 'angry and bitter', 'solemn and religious'], sol: 'Canning tells the story with gentle irony.' }));
Q('mc_respect', mcq({ t: 3, d: 2, c: 'understanding', fixed: true, key: 'c', stem: 'How did Horace Danby appear to the people around him before his arrest?', opts: ['as a dangerous criminal', 'as a wealthy landowner', 'as a respectable locksmith', 'as a famous author'], sol: 'To others he was an honest, respectable tradesman.' }));

Q('fb_name', fb({ t: 1, d: 1, c: 'recall', stem: 'In *A Question of Trust*, the locksmith who robs a single safe each year is Horace ___.', acc: [['Danby']], sol: 'He is Horace **Danby**.' }));
Q('fb_house', fb({ t: 1, d: 1, c: 'recall', stem: 'Horace planned to rob a country house called Shotover ___.', acc: [['Grange']], sol: 'The house was Shotover **Grange**.' }));
Q('fb_items', fb({ t: 1, d: 2, c: 'recall', marks: 2, stem: 'The safe held valuable ___, and Horace opened it without his ___.', acc: [['jewels', 'jewellery', 'jewelry'], ['gloves']], sol: 'The safe held **jewels**, and he worked without **gloves**.', scheme: [['jewels', 1], ['gloves', 1]] }));
Q('fb_where_end', fb({ t: 1, d: 2, c: 'recall', stem: 'At the end of the story Horace Danby is in ___.', acc: [['prison', 'jail', 'gaol']], sol: 'He ends up in **prison**.' }));

Q('ar_books', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Horace Danby robbed one safe every year.', r: 'Horace needed money to buy rare and expensive books.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_owner', ar({ t: [1, 2], d: 3, c: 'understanding', a: 'The young woman was the owner of Shotover Grange.', r: 'The young woman told Horace she had forgotten the combination of the safe.', key: 'd', sol: 'A is false: she was a thief. R is true: that was her claim.' }));
Q('ar_police', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'The police arrested Horace after the jewels went missing.', r: 'Horace had a long record of being caught by the police.', key: 'c', sol: 'A is true. R is false: nothing suggests a record; his careful planning had kept him unsuspected until now.' }));
Q('ar_flowers', ar({ t: [1, 3], d: 3, c: 'analysis', a: 'Horace sneezed while he was in the house.', r: 'Horace’s neighbours thought he was a respectable man.', key: 'b', sol: 'Both are true, but his reputation does not explain the sneezing, which came from his hay fever.' }));

Q('tf_violent', tf({ t: 3, d: 1, c: 'recall', stem: 'True or false: in *A Question of Trust*, Horace Danby often used violence in his robberies.', ans: false, sol: 'He disliked violence and prided himself on careful methods.' }));
Q('tf_lady', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: the young woman who met Horace was really the lady of the house.', ans: false, sol: 'She was a thief pretending to be the owner.' }));
Q('tf_jewels', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Horace Danby kept none of the jewels from Shotover Grange.', ans: true, sol: 'He handed them to the woman.' }));
Q('tf_neighbours', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: Horace’s neighbours believed he was an honest, respectable man.', ans: true, sol: 'His public image was respectable.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of *A Question of Trust* in the order in which they happen.',
  items: ['Horace chooses Shotover Grange as this year’s target.', 'He enters the empty house.', 'A young woman appears in the doorway.', 'She asks him to open the safe.', 'He opens the safe without gloves.', 'The police arrest Horace.'],
  sol: 'Target → entry → the woman → her request → the safe → arrest.',
}));
Q('ord_downfall', ord({
  t: [3, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the steps of Horace Danby’s downfall in *A Question of Trust*.',
  items: ['Horace is caught in the act by a stranger.', 'He believes her claim to own the house.', 'He accepts her offer to avoid the police.', 'Proud of his skill, he works without gloves.', 'His fingerprints lead the police to him.'],
  sol: 'Surprise → belief → bargain → carelessness → arrest.',
}));

Q('mt_people', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each person or place in *A Question of Trust* with their part in the story.',
  pairs: [['Horace Danby', 'the locksmith who robs safes'], ['the young woman', 'the thief who tricks him'], ['Shotover Grange', 'the house with the jewels'], ['the owners', 'away in London']],
  sol: 'People and places of the story.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for discussing *A Question of Trust* with their meanings.',
  pairs: [['respectable', 'regarded as honest and decent'], ['gullible', 'easily deceived'], ['irony', 'an outcome opposite to what is expected'], ['allergy', 'a bodily reaction to a substance such as pollen']],
  sol: 'Key words for writing about this story.',
}));
Q('mt_actions', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each action in *A Question of Trust* with the trait it reveals.',
  pairs: [['Horace plans one robbery a year', 'caution and method'], ['Horace buys rare books', 'cultured taste'], ['Horace believes the woman at once', 'gullibility'], ['The woman stays calm and makes a bargain', 'cunning']],
  sol: 'Each action and what it shows.',
}));
