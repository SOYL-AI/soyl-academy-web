// CBSE 10 English Language and Literature, ch11 "The Sermon at Benares" (Betty Renshaw) — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the chapter appears
// here. The sermon's comparisons and Kisa Gotami's closing reflection are explained as ideas, never rebuilt.
// Passages are SOYL commentary (passage_origin: soyl-commentary). Students read the chapter in First Flight.
// Topics: t01 context and summary · t02 themes and message (the Buddha's teaching on death and suffering
// through Kisa Gotami's story; characters are taught here, as the syllabus has no separate topic) ·
// t03 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): the Buddha's dates, his age at each
// stage of his life, the number of years he wandered and the number of days he meditated.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the chapter, not an extract from it. Read the chapter itself in your textbook, First Flight.)*";
const SRC_STEM = `*The Sermon at Benares*: read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the chapter (event or idea)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the chapter', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the chapter, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the chapter', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_prince', source({
  t: 1, d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The chapter begins not with a sermon but with a life. Siddhartha Gautama was born a prince in northern India and was raised in comfort, schooled in the sacred texts, married to a princess and blessed with a son. A palace can keep suffering out of sight, but not for ever. On going out into the world he met, one after another, a man who was ill, a man bent with age, a body being carried to the cremation ground, and a holy man who owned nothing and begged for his food. These encounters unsettled him so deeply that he gave up his royal life to search for an answer to human sorrow.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Into what kind of family was Siddhartha Gautama born?', opts: ['a royal family', 'a family of farmers', 'a family of merchants', 'a family of potters'], sol: 'He was born a prince.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which of these was NOT among the sights that moved the prince?', opts: ['a soldier returning from war', 'a sick man', 'an old man', 'a funeral'], sol: 'The sights were illness, old age, a funeral and a holy man begging; a soldier is not among them.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'The fourth sight was a holy man who owned nothing and begged for ___.', acc: [['food', 'alms']], sol: 'He begged for his **food** (alms).' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *a palace can keep suffering out of sight, but not for ever*?', model: 'Wealth sheltered the prince from pain for a time, but once he went out he could not avoid seeing sickness, age and death.', sol: 'Comfort hid suffering from him only until he met it in the world.', scheme: [['Wealth hid suffering only for a while', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why did the prince give up his royal life?', opts: ['to search for the cause of and answer to human suffering', 'because his family had lost their wealth', 'because he wanted to become a soldier', 'because he was ordered to leave the palace'], sol: 'The four sights made him seek an understanding of sorrow.' })),
  ],
  sol: 'Parts (a)–(c) recall the prince’s life; (d) and (e) explain why he left.',
}));
Q('src_enlightenment', source({
  t: 1, d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Leaving the palace did not bring instant wisdom. Gautama spent years wandering and searching, and the answer came only when he settled beneath a peepal tree, determined to meditate there for as long as it took. When understanding came, the tree became known as the Bodhi tree, the tree of wisdom, and Gautama became the Buddha, the awakened or enlightened one. He then began to teach what he had learnt, and the chapter tells us that his first sermon was given at Benares, a holy city on the Ganga. Teaching, for the Buddha, was the natural next step after learning.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Under which tree did Gautama sit until he gained understanding?', opts: ['a peepal tree', 'a banyan tree', 'a mango tree', 'a neem tree'], sol: 'He meditated beneath a peepal tree.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The tree under which he gained wisdom came to be called the ___ tree.', acc: [['Bodhi']], sol: 'It became known as the **Bodhi** tree, the tree of wisdom.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does the title *Buddha* mean?', opts: ['the awakened or enlightened one', 'the king of kings', 'the wandering monk', 'the teacher of princes'], sol: 'Buddha means one who has awakened, or been enlightened.' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say that teaching was *the natural next step after learning* for the Buddha?', model: 'Having found an answer to sorrow, he wanted to share it so that others could be freed from suffering too.', sol: 'His wisdom was meant to help others, so he began to preach.', scheme: [['He shared his understanding to help others', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did the Buddha preach his first sermon, according to the chapter?', opts: ['at Benares', 'at Lumbini', 'at Pataliputra', 'at Kapilavastu'], sol: 'The chapter names Benares, the holy city on the Ganga.' })),
  ],
  sol: 'Note the sequence: search → meditation → enlightenment → teaching.',
}));
Q('src_grief', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Kisa Gotami's story begins at the worst moment of her life. Her only son has died, and she cannot accept it. Instead of mourning, she carries the child's body from one neighbour to the next, begging for a medicine that will make him well. The neighbours, seeing a dead child in a mother's arms, conclude that grief has driven her out of her mind. Their reaction is understandable, but it offers her nothing. It takes a stranger to point her towards the one person who might help: the Buddha. Her search for a cure is really a refusal to accept death, and the rest of the story is about how that refusal ends.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Whom had Kisa Gotami lost?', opts: ['her only son', 'her husband', 'her mother', 'her brother'], sol: 'Her only son had died.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did Kisa Gotami ask her neighbours for?', opts: ['medicine to cure her son', 'money for the funeral', 'food for the journey', 'a place to stay'], sol: 'Unable to accept the death, she begged for medicine to make the child well.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'The neighbours thought that grief had driven Kisa Gotami out of her ___.', acc: [['mind', 'senses', 'wits']], sol: 'They believed she had lost her **mind** (senses).' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call her search for a cure *a refusal to accept death*?', model: 'Her son is already dead, so asking for medicine shows she cannot yet face the truth of his death.', sol: 'Seeking a cure for the dead child is denial, not hope.', scheme: [['The search shows she denies the reality of death', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Who directed Kisa Gotami to the Buddha?', opts: ['a man she met in her search', 'her husband', 'the king', 'a priest at the temple'], sol: 'A man she approached sent her to Sakyamuni, the Buddha.' })),
  ],
  sol: 'Parts (a)–(c) and (e) are facts; (d) interprets her state of mind.',
}));
Q('src_mustard', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The Buddha does not tell Kisa Gotami that her son is dead and cannot be revived. He gives her a task instead. She must bring him a handful of mustard seed, a spice found in almost every home, but it must come from a house where death has never taken anyone. The request sounds simple and hopeful. In fact it is the medicine she needs, though not the one she expects. A lecture might have been rejected by a grieving mother; a search she undertakes herself will let her discover the truth with her own eyes. The Buddha teaches not by argument but by experience.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did the Buddha ask Kisa Gotami to bring?', opts: ['a handful of mustard seed', 'a pot of water from the Ganga', 'a lamp from the temple', 'a flower from the Bodhi tree'], sol: 'He asked for a handful of mustard seed.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What condition did the Buddha attach to the seed?', opts: ['It had to come from a house where no one had ever died.', 'It had to be bought in the market.', 'It had to be grown by Kisa herself.', 'It had to come from the king’s palace.'], sol: 'The seed had to come from a home death had never visited.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The Buddha teaches Kisa Gotami not by argument but by ___.', acc: [['experience']], sol: 'He lets her learn through **experience**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why might a lecture have failed where the task succeeded?', model: 'A grieving mother would not accept being told her son was gone; discovering it for herself made the truth undeniable.', sol: 'Self-discovery convinces where instruction would be resisted.', scheme: [['Self-discovery convinces; a lecture would be resisted', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why did the Buddha choose mustard seed for the task?', opts: ['It was common, so the only real difficulty would be the condition about death.', 'It was a rare and costly spice.', 'It was a known cure for all illnesses.', 'It was used in funeral rites only.'], sol: 'Because the seed was everywhere, the search tested only the condition, which no home could meet.' })),
  ],
  sol: 'Focus on the Buddha’s method: a task that leads to self-discovery.',
}));
Q('src_houses', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Kisa Gotami goes from door to door, and at every door the same thing happens. People pity her and gladly offer the seed, but when she asks whether anyone in the house has died, each family names someone dear whom death has taken. No home can meet the Buddha's condition. Slowly the search changes its meaning. She set out looking for a cure for one death and finds instead that death has touched every family she knows. Exhausted, she gives up the search and rests beside the road as darkness gathers, no longer searching but thinking.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How did people respond when Kisa Gotami asked for mustard seed?', opts: ['They pitied her and were willing to give it.', 'They laughed at her and shut their doors.', 'They said they had no seed at all.', 'They asked her to pay a high price.'], sol: 'People felt sorry for her and readily offered the seed.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why could Kisa Gotami not take the seed from any house?', opts: ['Every family had lost someone to death.', 'No family had any seed.', 'The seed was spoilt everywhere.', 'The Buddha had changed his mind.'], sol: 'No household met the condition; death had visited every home.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Instead of a cure, Kisa Gotami discovered that death had touched ___ family.', acc: [['every', 'each']], sol: 'Death had touched **every** family.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How does the meaning of Kisa Gotami’s search change, according to the commentary?', model: 'She begins by seeking a cure for her son but ends by learning that death comes to all families.', sol: 'The search turns from a hunt for a cure into a lesson about death’s universality.', scheme: [['From seeking a cure to discovering death is universal', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does Kisa Gotami’s sitting down by the roadside suggest?', opts: ['She has stopped searching and begun to reflect.', 'She has found the seed and is resting.', 'She is waiting for her husband.', 'She has decided to return to the Buddha at once.'], sol: 'Exhausted and hopeless, she turns from searching to thinking.' })),
  ],
  sol: 'Note the repetition (every door, the same answer) and its effect.',
}));
Q('src_lights', source({
  t: [1, 2], d: 4, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The turning point of the story comes quietly. Resting alone as the night deepens, Kisa Gotami sees the lamps of the town go out one by one. In this ordinary sight she recognises a picture of human life: every life, too, comes to its end. She sees, too, that her grief has been wholly about her own loss, while sorrow of the same kind lives in every house she has visited. The realisation does not bring back her son, but it frees her from the belief that her suffering is unique. Acceptance begins at this moment.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Kisa Gotami watch as she sat by the roadside?', opts: ['the lamps of the town going dark', 'the river flowing past', 'children playing in the street', 'the Buddha preaching'], sol: 'She watched the town’s lights being lit and going out at nightfall.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What did the lights come to represent for her?', opts: ['human lives, which last a while and then end', 'the wealth of the town', 'the Buddha’s wisdom', 'the hope of finding a cure'], sol: 'She saw the lamps as a picture of human lives.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Kisa Gotami realised that her grief had been concerned only with her own ___.', acc: [['loss', 'sorrow', 'pain']], sol: 'She had thought only of her own **loss**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary say that acceptance *begins* here rather than being complete?', model: 'Understanding that death is universal is the first step; learning to live calmly with grief takes longer.', sol: 'The insight starts a process of healing; it does not end her sorrow at once.', scheme: [['Insight is a beginning; healing continues', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which literary device is at work when an ordinary sight stands for a larger truth about life?', opts: ['symbolism', 'alliteration', 'onomatopoeia', 'hyperbole'], sol: 'The lamps are a symbol: a concrete sight standing for the brevity of life.' })),
  ],
  sol: 'Explain the lamps as a symbol, in your own words; do not reproduce the chapter’s sentences.',
}));
Q('src_teaching', source({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The sermon that follows puts Kisa Gotami's discovery into general terms. In the Buddha's view, human existence is brief and never free of suffering, and birth always ends in death; no one is spared, whatever their age or their learning. Love cannot shield anyone from this law. He uses familiar comparisons from daily life to make this certain fate easy to grasp. Tears change nothing for the one who has died, while the one who weeps only adds to their own pain. The wise accept this law of life rather than drowning in sorrow, and calm acceptance, not mourning without end, is the road to peace.",
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the Buddha’s teaching, who is subject to death?', opts: ['everyone who is born, without exception', 'only the old and the sick', 'only those who do wrong', 'only people who do not pray'], sol: 'Death is certain for all who are born.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does the Buddha say weeping does to a mourner?', opts: ['It increases the mourner’s suffering without helping the dead.', 'It brings the dead back to life.', 'It cures illness.', 'It makes the mourner wise.'], sol: 'Grief harms the griever and does nothing for the dead.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, calm acceptance rather than endless mourning is the road to ___.', acc: [['peace', 'inner peace']], sol: 'Acceptance leads to **peace**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Is the Buddha’s teaching hard-hearted or compassionate? Give a one-sentence view.', model: 'Compassionate: he wants to free mourners from suffering that only harms them, not to deny their love.', sol: 'Either view needs a reason; the stronger answer sees compassion in the wish to end useless suffering.', scheme: [['A supported view', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the Buddha use comparisons from everyday life in the sermon?', opts: ['to make an abstract truth about death easy to understand', 'to show off his knowledge of farming', 'to change the subject from death', 'to entertain the listeners'], sol: 'Familiar examples make the certainty of death concrete and clear.' })),
  ],
  sol: 'Explain the ideas in your own words; read the sermon’s comparisons in the textbook.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_four_sights', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What sights changed the life of Prince Siddhartha Gautama, and why did they affect him so deeply? Answer in 40–50 words.',
  model: 'Outside the palace, the prince saw a sick man, an aged man, a funeral and a wandering holy man begging for food. Sheltered from pain all his life, he was shaken to learn that sickness, age and death await everyone. He left home to understand and overcome such suffering.',
  sol: 'The four sights + why they shocked him (a sheltered life) + the result (he left to seek an answer).',
}));
Q('sa_buddha_name', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How did Gautama come to be called the Buddha? Answer in 40–50 words.',
  model: 'After leaving the palace, Gautama searched for years for an answer to suffering. Finally he sat beneath a peepal tree, resolving to stay until he understood. When enlightenment came, he became the Buddha, the awakened one, and the tree was called the Bodhi tree, the tree of wisdom.',
  sol: 'The long search + meditation under the peepal tree + enlightenment + the meaning of Buddha (and Bodhi).',
}));
Q('sa_kisa_neighbours', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What did Kisa Gotami do after her son died, and how did her neighbours react? Answer in 40–50 words.',
  model: 'Unable to accept her only son’s death, Kisa Gotami carried his body from house to house, begging for medicine to revive him. Her neighbours thought grief had driven her mad, since the boy was clearly dead. A man finally sent her to the Buddha.',
  sol: 'Her action (carrying the body, begging for medicine) + the neighbours’ view (grief had driven her mad) + the man who sent her to the Buddha.',
}));
Q('sa_mustard_task', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why did the Buddha ask Kisa Gotami to fetch mustard seed instead of telling her plainly that her son could not be saved? Answer in 40–50 words.',
  model: 'A grieving mother would probably not have believed a plain statement that her son was beyond help. By sending her for seed from a house untouched by death, the Buddha let her see for herself that every family loses someone. Discovering the truth herself made it acceptable.',
  sol: 'Why telling would fail + what the task made her discover + why self-discovery works.',
}));
Q('sa_no_house', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'What did Kisa Gotami find as she went from house to house? Answer in 40–50 words.',
  model: 'Everyone pitied Kisa Gotami and was ready to give her mustard seed. Yet whenever she asked whether anyone in the household had died, the answer was always yes: every family had buried someone it loved. She could not find a single house free of death.',
  sol: 'People’s willingness + the universal answer (every family had lost someone) + the result (no seed could be taken).',
}));
Q('sa_selfish', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why did Kisa Gotami come to see her grief as self-centred? Answer in 40–50 words.',
  model: 'Her search showed her that every family had suffered the same kind of loss. Until then she had treated her sorrow as unique and had thought only of herself. Realising that death comes to everyone, she saw that her grief had shut out the suffering of others.',
  sol: 'What the search revealed + how she had viewed her grief + what she realised.',
}));
Q('sa_lamps', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'What did Kisa Gotami understand while watching the lights of the town at night? Answer in 40–50 words.',
  model: 'As the town’s lamps went out one after another, Kisa Gotami saw in them an image of human life, which also comes to an end. She understood that death comes to all, and her sense of unique loss began to fade.',
  sol: 'The sight (lamps lit and going out) + what they symbolised (brief human lives) + its effect on her.',
}));
Q('sa_grieving_harm', short({
  ...SA3, t: 2, d: 3, c: 'understanding',
  stem: 'According to the Buddha, why is it useless to keep weeping for the dead? Answer in 40–50 words.',
  model: 'The Buddha teaches that tears cannot bring the dead back. Mourning without end hurts only the person who mourns, and can even make him ill. Since nobody escapes death, the wise accept it calmly, and that acceptance, rather than weeping, is what brings them peace.',
  sol: 'Weeping does not help the dead + it harms the mourner + the wise accept death and find peace.',
}));
Q('sa_method', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'The Buddha is a wise teacher. How does his way of helping Kisa Gotami prove this? Answer in 40–50 words.',
  model: 'Instead of lecturing a grieving mother, the Buddha gave her a task that seemed hopeful. Through it she discovered for herself that death touches every home. Because the lesson came from her own experience, she accepted it fully. He healed her grief with patience, kindness and insight.',
  sol: 'A stand + the method (a task, not a lecture) + why it worked (self-discovery) + the qualities it shows.',
}));
Q('sa_universal', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'How can the message of *The Sermon at Benares* help someone who has lost a loved one today? Answer in 40–50 words.',
  model: 'The chapter reminds a mourner that loss is shared by every family, so they are not alone. Grief is natural, but endless weeping only harms the grieving person. Accepting death calmly, and drawing strength from others who have suffered, can help them recover peace and continue living.',
  sol: 'Two or three applications: loss is shared; endless grief harms; acceptance and support bring peace.',
}));
Q('sa_compare_lives', short({
  ...SA3, t: 2, d: 4, c: 'analysis',
  stem: 'Both Prince Siddhartha and Kisa Gotami learn something about suffering. How are their experiences similar? Answer in 40–50 words.',
  model: 'Both meet suffering face to face: the prince through the four sights, Kisa through her son’s death. Both go on a search, he for an answer to sorrow, she for a cure. And both end with understanding, that death and pain are part of every life.',
  sol: 'Shared pattern: meeting suffering → a search → understanding. One point of comparison for each stage.',
}));
Q('sa_title_sermon', short({
  ...SA3, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'Is *The Sermon at Benares* a suitable title for this chapter? Give your view in 40–50 words.',
  model: 'Yes. The chapter centres on the Buddha’s first sermon, preached at Benares, about death and suffering. Kisa Gotami’s story is the illustration that gives the sermon its force. Some may feel her name deserves a place in the title, since her experience makes the teaching real.',
  sol: 'A stand + what the title refers to + the role of Kisa’s story + a reasoned alternative or qualification.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_prince_life', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Describe Gautama’s life before he left the palace. Answer in 30–40 words.',
  model: 'Gautama was born into a royal family in northern India. As a young man he was educated in sacred learning, took a princess as his wife and became a father, all within the shelter of palace comfort.',
  sol: 'Birth as a prince + education, marriage and son + a sheltered, comfortable life.',
}));
Q('sb_bodhi', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'What is the Bodhi tree, and why is it given that name? Answer in 30–40 words.',
  model: 'The Bodhi tree is the peepal tree under which Gautama sat in meditation until he finally gained enlightenment. Because Bodhi refers to wisdom or awakening, people call it the tree of wisdom.',
  sol: 'What it is (the peepal tree of his meditation) + why the name (Bodhi means wisdom).',
}));
Q('sb_sakyamuni', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Kisa Gotami go to the Buddha? Answer in 30–40 words.',
  model: 'Her neighbours could not help her, and a man she met told her that Sakyamuni, the Buddha, might have the medicine she wanted. Still hoping to save her son, she went to him.',
  sol: 'The neighbours’ failure + the man’s advice + her hope of a cure.',
}));
Q('sb_condition', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What condition did the Buddha place on the mustard seed, and why could Kisa Gotami not meet it? Answer in 30–40 words.',
  model: 'The seed had to come from a house in which no one had ever died. She could not meet this condition because every single household she visited had lost someone dear to death.',
  sol: 'The condition (a house untouched by death) + why it was impossible (every home had lost someone).',
}));
Q('sb_wise', short({
  ...SA2, t: 2, d: 3, c: 'analysis',
  stem: 'According to the sermon, why do the wise not grieve? Answer in 30–40 words.',
  model: 'The wise understand that death is the law of the world and comes to everyone. Knowing that grief cannot change this, they accept loss calmly instead of harming themselves with endless sorrow.',
  sol: 'They understand death is universal + grief cannot change it + so they accept calmly.',
}));
Q('sb_change_kisa', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'How did Kisa Gotami change from the beginning to the end of her story? Answer in 30–40 words.',
  model: 'At first she was frantic, denying her son’s death and begging for medicine. By the end she was calm and reflective, understanding that death touches every family and that her grief was not unique.',
  sol: 'Beginning (denial, frantic) + end (calm acceptance, understanding).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_kisa_journey', long({
  ...LA, t: [3, 2], d: 4, c: 'analysis',
  stem: 'Trace Kisa Gotami’s journey from denial to acceptance. Answer in 100–120 words.',
  model: 'When her only son dies, Kisa Gotami refuses to accept it. She carries his body from house to house, begging for medicine, and her neighbours think she has lost her mind. A man sends her to the Buddha, who asks for mustard seed from a home that death has never visited. Hopeful, she knocks on door after door, but every family has lost someone. Exhausted, she sits by the roadside at nightfall and watches the town’s lamps go out one by one. She sees that human lives also end, and that her grief has been for herself alone. Her denial gives way to understanding, and she becomes ready to accept death calmly.',
  sol: 'Stages in order: denial (begging for medicine) → the Buddha’s task → the search → the lamps at nightfall → understanding and acceptance. Conclude with the change in her.',
}));
Q('la_buddha_teacher', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'How does the Buddha show himself to be a wise and compassionate teacher in this chapter? Answer in 100–120 words.',
  model: 'The Buddha’s wisdom shows first in his understanding of grief. He knows that a heartbroken mother will not accept being told that her son is beyond saving. So he sets her a gentle task: to bring mustard seed from a house untouched by death. The task gives her hope, keeps her busy, and leads her to discover the truth herself. His compassion shows in the fact that he does not scold or dismiss her, as others did. Afterwards, his sermon explains that death comes to all and that grief only deepens pain. His method combines patience, kindness and insight. He heals Kisa Gotami not by argument but by guiding her to understanding.',
  sol: 'Wisdom (understanding grief; the task; self-discovery) + compassion (no scolding; gentle guidance) + the sermon’s teaching + a conclusion on his method.',
}));
Q('la_death_universal', long({
  ...LA, t: [3, 2], d: 4, c: 'analysis',
  stem: 'Explain the Buddha’s teaching about death and grief as presented in the chapter. Answer in 100–120 words.',
  model: 'At the heart of the Buddha’s teaching is a simple truth: every living being will die. Age, cleverness and love make no difference, and family ties protect no one. He makes this certainty concrete with familiar examples from daily life. He then turns to grief. Mourning, he explains, does nothing for the one who has died; it only adds to the suffering of the living and can even damage their health. A wise person therefore accepts death as part of life instead of being crushed by sorrow. Calm acceptance is what finally brings peace. The teaching is not cold; it aims to release mourners from pain that helps nobody.',
  sol: 'Life is brief and painful + death certain for all + no one can save another + grief harms the mourner + the wise accept + peace through letting go. In your own words.',
}));
Q('la_diary_kisa', long({
  ...LA, t: [3, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Kisa Gotami. Write a diary entry on the night you understood the truth about death, in 100–120 words.',
  model: 'Tonight\n\nThis morning I believed my son could still be saved. The great teacher asked only for a handful of mustard seed, and my heart leapt. Every door I knocked on opened kindly, and every hand offered seed. But in every home someone had died: a baby girl, a grandmother, a soldier son. By evening my feet ached and my hope was gone. I sat by the road and watched the lamps of the town go out, one after another. Then I understood. My son’s life has ended as all lives end. I have wept as if I alone had lost a child. Tomorrow I shall go back to the teacher, with empty hands but a clearer heart.',
  sol: 'Diary format (date/time, first person, past tense, feelings). Content consistent with the chapter: the task, the search, every home’s loss, the lamps, the realisation. Personal reflection at the end.',
}));
Q('la_letter_grief', long({
  ...LA, t: [3, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Your friend has recently lost a grandparent and cannot stop grieving. Write a letter to comfort them, drawing on the lessons of *The Sermon at Benares*. Answer in 100–120 words.',
  model: 'Dear Ishaan,\n\nI have been thinking of you since your grandfather passed away. This week we read the story of Kisa Gotami, a mother who could not accept her son’s death. The Buddha sent her to find mustard seed from a home where nobody had died, and she found that every family had lost someone. I am not saying your sorrow is small. But you are not alone in it, and your grandfather would not want you to make yourself ill with grief. Let us remember his stories and his laughter together. When you are ready, come over and we will walk by the lake as he loved to do.\n\nWith love,\nRohan',
  sol: 'Informal letter format. Content: sympathy + Kisa Gotami’s story briefly + the lessons (loss is shared; endless grief harms) + practical comfort. Warm, sensitive tone.',
}));
Q('la_selfishness', long({
  ...LA, t: [3, 2], d: 4, c: 'evaluation',
  stem: 'Kisa Gotami comes to see her grief as self-centred. Do you think grief can ever be selfish? Give your view, with reference to the chapter, in 100–120 words.',
  model: 'Grief is a natural expression of love, and I do not think it is wrong to mourn. Kisa Gotami’s sorrow for her only son was deep and real. However, the chapter suggests that grief can become self-centred when we forget that others suffer too. She treated her loss as unique, carried her dead child about and demanded a cure, as if the laws of life should change for her. Her search showed her that every family carried the same pain. In that sense, grief turns selfish when it shuts out the world. Mourning with an open heart, aware of others’ losses, can actually bring us closer to them and lead to peace.',
  sol: 'A clear stand + the chapter’s view (her grief ignored others’ sorrow) + evidence (the search, the realisation) + a balanced conclusion.',
}));
Q('la_relevance', long({
  ...LA, t: [3, 2], d: 4, c: 'application',
  stem: 'Is the Buddha’s message about death and grief still relevant today? Answer in 100–120 words, with reference to the chapter.',
  model: 'The Buddha’s message remains deeply relevant. Medicine has advanced, yet death still comes to every family, as Kisa Gotami discovered when no home could give her the seed. Today many people struggle with grief alone, sometimes for years, and their health suffers, just as the sermon warns. The idea that loss is shared can comfort them and encourage them to seek support from others. The Buddha’s method also matters: people often learn best through experience and gentle guidance rather than lectures. Counsellors and friends can follow his example by listening patiently. Accepting death calmly is not coldness; it allows us to honour those we have lost while continuing to live fully.',
  sol: 'A clear stand + why death and grief remain universal + modern applications (shared loss, health, support, gentle guidance) + a conclusion.',
}));

// ================================================================ objective items
Q('mc_author_sermon', mcq({ t: 1, d: 1, c: 'recall', stem: 'The chapter *The Sermon at Benares* is credited in *First Flight* to…', opts: ['Betty Renshaw', 'Vallikkannan', 'Gavin Maxwell', 'Anton Chekhov'], sol: 'The chapter is by Betty Renshaw.' }));
Q('mc_birth_name', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was the Buddha’s name as a prince?', opts: ['Siddhartha Gautama', 'Sakyamuni Ananda', 'Ashoka Maurya', 'Kisa Gotama'], sol: 'He was born Siddhartha Gautama.' }));
Q('mc_leave', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What made Prince Gautama leave his royal life?', opts: ['seeing sickness, old age, death and a holy man who begged', 'a quarrel with his father', 'a war that destroyed his kingdom', 'a dream about a golden tree'], sol: 'The four sights showed him a suffering he had never known.' }));
Q('mc_benares', mcq({ t: 1, d: 2, c: 'recall', stem: 'Benares, where the Buddha preached the sermon in the chapter, lies on the banks of which river?', opts: ['the Ganga', 'the Yamuna', 'the Narmada', 'the Godavari'], sol: 'Benares (Varanasi) is a holy city on the Ganga.' }));
Q('mc_kisa_loss', mcq({ t: 1, d: 1, c: 'recall', stem: 'Why was Kisa Gotami in despair at the start of her story?', opts: ['Her only son had died.', 'Her house had burnt down.', 'She had lost all her money.', 'Her husband had left her.'], sol: 'The death of her only son plunged her into grief.' }));
Q('mc_seed', mcq({ t: 1, d: 1, c: 'recall', stem: 'What did the Buddha send Kisa Gotami to collect?', opts: ['mustard seed', 'rice grains', 'holy water', 'lotus flowers'], sol: 'He asked for a handful of mustard seed.' }));
Q('mc_why_seed', mcq({ t: 2, d: 3, c: 'analysis', stem: 'The real purpose of the Buddha’s request for mustard seed was to…', opts: ['help Kisa Gotami discover for herself that death comes to every family', 'prepare a medicine that would revive her son', 'test whether Kisa Gotami was honest', 'keep her away from the city'], sol: 'The task was designed to lead her to the truth through her own experience.' }));
Q('mc_realise', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did Kisa Gotami finally realise?', opts: ['Death comes to all, and her grief had been only for herself.', 'Mustard seed could not be found anywhere.', 'Her neighbours had lied to her.', 'The Buddha could not be trusted.'], sol: 'She understood the universality of death and the self-centredness of her grief.' }));
Q('mc_grief_effect', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'Since his brother died, a man has stopped eating and weeps all day. Applying the Buddha’s teaching, what is most likely if he continues?', opts: ['His own health will suffer, and his brother will gain nothing from it.', 'His brother will be honoured and helped by his tears.', 'He will become wise through weeping alone.', 'His sorrow will end sooner.'], sol: 'The sermon teaches that endless grieving harms the mourner and does nothing for the dead.' }));
Q('mc_symbol_lamps', mcq({ t: 2, d: 3, c: 'analysis', stem: 'In Kisa Gotami’s story, the lamps of the town going out at night stand for…', opts: ['human lives that end one by one', 'the end of the Buddha’s sermon', 'the town’s poverty', 'Kisa Gotami’s anger'], sol: 'The lamps symbolise the brief lives of human beings.' }));
Q('mc_method_sermon', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which phrase best describes the Buddha’s way of teaching Kisa Gotami?', opts: ['teaching through personal experience', 'teaching through punishment', 'teaching through reading scriptures aloud', 'teaching through debate with scholars'], sol: 'He lets her learn by doing, not by being told.' }));
Q('mc_message_sermon', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *The Sermon at Benares* most strongly convey?', opts: ['Death is universal; accepting it calmly brings peace.', 'The wealthy can escape death.', 'Grief should be hidden from others.', 'Medicine can cure every loss.'], sol: 'Acceptance of death’s universality frees one from useless suffering.' }));
Q('mc_apply_sermon', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A student’s pet dog has died, and he refuses to talk to anyone. Which response follows the Buddha’s approach with Kisa Gotami?', opts: ['Gently encourage him to hear how classmates coped with their own losses.', 'Tell him sharply that crying is foolish.', 'Promise him that the dog will come back.', 'Ignore him until he forgets.'], sol: 'Like the Buddha, it helps him discover that loss is shared, without scolding or false promises.' }));
Q('mc_genre_sermon', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'c', stem: 'What kind of writing is *The Sermon at Benares*?', opts: ['a one-act play', 'a scientific essay on medicine', 'a prose retelling of the Buddha’s life and teaching', 'a travel diary'], sol: 'It retells the Buddha’s life and presents his teaching through Kisa Gotami’s story.' }));

Q('fb_bodhi', fb({ t: 1, d: 1, c: 'recall', stem: 'Gautama gained enlightenment while meditating beneath a ___ tree.', acc: [['peepal', 'pipal', 'Bodhi']], sol: 'He sat under a **peepal** tree, later called the Bodhi tree.' }));
Q('fb_sakya', fb({ t: 1, d: 2, c: 'recall', stem: 'The man Kisa Gotami met told her to go to ___, the Buddha.', acc: [['Sakyamuni', 'Shakyamuni']], sol: 'He sent her to **Sakyamuni**, the Buddha.' }));
Q('fb_awake', fb({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'The word Buddha means the ___ or ___ one.', acc: [['awakened', 'awakened one'], ['enlightened', 'enlightened one']], sol: 'Buddha means the **awakened** or **enlightened** one.', scheme: [['awakened', 0.5], ['enlightened', 0.5]] }));
Q('fb_peace', fb({ t: 2, d: 2, c: 'understanding', stem: 'In the Buddha’s teaching, calm acceptance of death, not endless weeping, leads to ___.', acc: [['peace', 'peace of mind']], sol: 'Acceptance leads to **peace**.' }));

Q('ar_neighbours', ar({ t: 1, d: 3, c: 'analysis', a: 'Kisa Gotami’s neighbours believed grief had driven her mad.', r: 'She was asking for medicine for a child who was already dead.', key: 'a', sol: 'Both are true, and R explains A: seeking a cure for a dead child made them think grief had driven her mad.' }));
Q('ar_seed_found', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Kisa Gotami returned to the Buddha with the mustard seed he had asked for.', r: 'Every family she visited had lost someone to death.', key: 'd', sol: 'A is false: she could not take seed from any house. R is true.' }));
Q('ar_prince', ar({ t: 1, d: 3, c: 'analysis', a: 'Gautama gave up his life as a prince.', r: 'The Buddha preached his first sermon at Benares.', key: 'b', sol: 'Both are true, but the sermon does not explain why he left the palace; the four sights did.' }));
Q('ar_weeping', ar({ t: 2, d: 3, c: 'understanding', a: 'The Buddha teaches that the wise accept death calmly.', r: 'The Buddha teaches that weeping for the dead brings them peace.', key: 'c', sol: 'A is true. R is false: weeping helps neither the dead nor the mourner.' }));

Q('tf_kisa_mad', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Kisa Gotami’s neighbours offered her a medicine that could revive her son.', ans: false, sol: 'They had no such medicine and thought grief had driven her mad.' }));
Q('tf_buddha_told', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: the Buddha told Kisa Gotami at once that her son could never be brought back to life.', ans: false, sol: 'He set her a task instead, so that she could discover the truth herself.' }));
Q('tf_pity', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the people Kisa Gotami visited felt pity for her and were willing to give mustard seed.', ans: true, sol: 'They pitied her and offered the seed, but no house met the condition.' }));
Q('tf_wise_grieve', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: the Buddha teaches that the wise do not drown themselves in grief.', ans: true, sol: 'Understanding that death is universal, the wise accept loss calmly.' }));

Q('ord_buddha', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these stages of Gautama Buddha’s life in the order the chapter presents them.',
  items: ['He grows up as a prince, studies, marries and has a son.', 'He sees sickness, old age, a funeral and a begging holy man.', 'He leaves his royal life to seek an answer to suffering.', 'He meditates beneath a peepal tree and gains enlightenment.', 'He preaches his first sermon at Benares.'],
  sol: 'Princely life → the four sights → leaving home → enlightenment → the first sermon.',
}));
Q('ord_kisa', ord({
  t: [1, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the events of Kisa Gotami’s story in order.',
  items: ['Her only son dies.', 'She carries him to her neighbours, asking for medicine.', 'A man sends her to the Buddha.', 'The Buddha asks for mustard seed from a home untouched by death.', 'She finds that every family has lost someone.', 'At nightfall she watches the town’s lamps go out and understands.'],
  sol: 'The death → the neighbours → the man’s advice → the task → the search → the realisation.',
}));

Q('mt_terms_sermon', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each name or term from *The Sermon at Benares* with its meaning.',
  pairs: [['Siddhartha Gautama', 'the Buddha’s name as a prince'], ['Bodhi tree', 'the tree of wisdom'], ['Sakyamuni', 'a name for the Buddha'], ['Benares', 'the holy city of the sermon']],
  sol: 'Names and terms from the chapter.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words useful for writing about the Buddha and Kisa Gotami with their meanings.',
  pairs: [['enlightenment', 'a state of deep spiritual understanding'], ['sermon', 'a talk on a religious or moral subject'], ['lamentation', 'loud expression of grief'], ['mortal', 'a being who must die']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_ideas_sermon', match({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each element of Kisa Gotami’s story with what it teaches.',
  pairs: [['The search for mustard seed', 'death has touched every family'], ['The lamps going out', 'human lives end one by one'], ['The neighbours’ pity', 'others share and understand sorrow'], ['The Buddha’s task', 'truth is best learnt through experience']],
  sol: 'Each element of the story and its lesson, in SOYL’s words.',
}));
