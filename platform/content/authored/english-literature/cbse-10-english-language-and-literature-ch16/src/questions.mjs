// CBSE 10 English Language and Literature, ch16 "How to Tell Wild Animals" (Carolyn Wells) — question bank.
// LITERATURE RULE (CONTEXT §8): no line or phrase of the poem is reproduced. Only the title, the animals'
// names and single words (tawny, peppered, caress, novice, nonplus, discern) appear; the respelt words are
// described, not quoted. Passages are SOYL commentary (passage_origin: soyl-commentary).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary on *How to Tell Wild Animals* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point about the poem', 1], ['Explanation or interpretation linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point about the poem', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: accurate points about the poem', 3], ['Interpretation / extrapolation: a clear, supported view', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (SOYL commentary)
Q('src_guidebook', source({
  t: [4, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Carolyn Wells dresses her poem up as a practical guide. Its title promises useful advice, and each stanza seems to teach the reader how to recognise one more dangerous animal. But the advice is a trap. Again and again, the sure sign that you have met a particular animal is that it is already attacking you. By the time you can name it, you are in no position to use the knowledge. The joke works because the poem keeps a straight face, offering absurd tests in the calm voice of a schoolteacher.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What kind of writing does *How to Tell Wild Animals* pretend to be, according to the commentary?', opts: ['a practical guide', 'a love letter', 'a news report', 'a diary'], sol: 'It is dressed up as a practical guide to recognising animals.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What is the sure sign of each animal, according to the commentary?', opts: ['that it is already attacking you', 'the colour of its eyes', 'the sound of its footsteps', 'the shape of its tail'], sol: 'The joke is that you identify the animal only when it attacks.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the advice in the poem is a ___.', acc: [['trap']], sol: 'The advice is a **trap**: it comes too late to be useful.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the joke works?', model: 'Because the poem keeps a straight face, giving absurd tests in a calm, teacherly voice.', sol: 'Mock-seriousness makes the absurdity funnier.', scheme: [['Straight face / calm voice with absurd tests', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Whose voice does the commentary say the poem imitates?', opts: ['a schoolteacher\'s', 'a hunter\'s', 'a child\'s', 'a lion\'s'], sol: 'The calm voice of a schoolteacher.' })),
  ],
  sol: 'Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.',
}));
Q('src_big_cats', source({
  t: [4, 1], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The first two stanzas deal with the big cats of Asia. If, wandering through eastern forests, you are approached by a huge animal with a yellowish-brown coat that roars over you as you lie dying, you may conclude that you have met the Asiatic lion. If an elegant striped animal welcomes you on your walk, the poem advises you to observe whether it makes a meal of you; that will identify the tiger. In both cases the identification and the disaster arrive together. The humour is dark, but it is delivered so politely that we laugh.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which two animals do the first two stanzas of *How to Tell Wild Animals* describe?', opts: ['the lion and the tiger', 'the bear and the leopard', 'the crocodile and the hyena', 'the chameleon and the lion'], sol: 'Stanzas 1 and 2 cover the Asiatic lion and the tiger.' })),
    child('b', fb({ t: 4, d: 2, c: 'understanding', stem: 'The word *tawny*, used for the lion\'s coat, means yellowish-___.', acc: [['brown']], sol: 'Tawny = yellowish-**brown**.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, how does the poem say you can identify the tiger?', opts: ['by observing whether it makes a meal of you', 'by counting its stripes from far away', 'by listening for its roar at dawn', 'by looking at its footprints'], sol: 'The absurd test is whether it makes a meal of you.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by the identification and the disaster arriving together?', model: 'You can name the animal only at the moment it attacks you, when it is too late.', sol: 'Identification comes too late to help.', scheme: [['Naming happens only during the attack', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What kind of humour does the commentary say these stanzas contain?', opts: ['dark humour delivered politely', 'slapstick about falling down', 'puns about food', 'jokes about school'], sol: 'Death and danger are treated in a polite, cheerful tone.' })),
  ],
  sol: 'Explain each identification test and why it comes too late.',
}));
Q('src_leopard_bear', source({
  t: [4, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The leopard and the bear stanzas push the joke further. The leopard is recognised by its spotted coat, but only once it has sprung on you; crying out will be useless, because it will simply keep springing. Here the poet bends the spelling of the verb so that it echoes the first syllable of the animal\'s name, a bit of play that adds to the comedy. The bear, met unexpectedly close to home, is recognised by its crushing embrace. If you are still unsure, it will hug you again, and the poet calls that deadly squeeze a caress.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'In *How to Tell Wild Animals*, how does the reader recognise the leopard?', opts: ['by its spotted coat, once it has sprung on you', 'by its long mane', 'by its laughing call', 'by its colour-changing skin'], sol: 'Its spots identify it, but only after it leaps on you.' })),
    child('b', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why, according to the commentary, does the poet bend the spelling of the verb in the leopard stanza?', opts: ['to echo the first syllable of the animal\'s name', 'because she did not know the correct spelling', 'to make the stanza longer', 'to show the leopard is old'], sol: 'The respelling plays on the sound of the animal\'s name, adding comedy.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The poet calls the bear\'s deadly squeeze a ___.', acc: [['caress']], sol: 'She calls it a **caress**, a gentle, loving touch: irony.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'Why is calling the bear\'s squeeze a caress ironic?', model: 'A caress is gentle and loving, but the bear\'s hug is crushing and deadly.', sol: 'The word says the opposite of what is meant.', scheme: [['Gentle word for a deadly act', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Where does the reader meet the bear in *How to Tell Wild Animals*, according to the commentary?', opts: ['unexpectedly close to home', 'deep in a desert', 'on a mountain top', 'in a zoo'], sol: 'The bear appears close to home, which adds to the surprise.' })),
  ],
  sol: 'Explain the test for each animal and the wordplay that makes it funny.',
}));
Q('src_croc', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'In the fifth stanza the poet admits that a beginner might be puzzled when telling apart animals that hunt, and then offers a neat rule for two of them. One, she says, arrives with a cheerful grin; the other sheds tears. The rule depends on two things readers already know. The spotted hyena has a call that sounds like laughter, and the phrase crocodile tears means pretended sorrow. So the stanza turns a familiar idiom into a field guide. The humour is in the logic: the rule is perfectly tidy and perfectly useless.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which two animals does the fifth stanza of *How to Tell Wild Animals* teach you to tell apart?', opts: ['the crocodile and the hyena', 'the lion and the tiger', 'the bear and the chameleon', 'the leopard and the lion'], sol: 'Stanza 5 contrasts the crocodile and the hyena.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What does the idiom crocodile tears mean?', opts: ['pretended sorrow', 'tears of joy', 'tears caused by smoke', 'a crocodile\'s cry for help'], sol: 'Crocodile tears are false, insincere tears.' })),
    child('c', fb({ t: 4, d: 2, c: 'recall', stem: 'A beginner, or someone new to a task, is called a ___.', acc: [['novice']], sol: '**Novice** means a beginner.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Which real-life fact about the hyena does the rule depend on?', model: 'The spotted hyena\'s call sounds like laughter.', sol: 'Its laugh-like call explains the grin.', scheme: [['Hyena\'s laugh-like call', 1]] })),
    child('e', mcq({ t: 3, d: 4, c: 'evaluation', stem: 'Why does the commentary call the rule perfectly tidy and perfectly useless?', opts: ['It is neat and logical but would never help anyone in danger.', 'It is written in very neat handwriting.', 'It is both scientific and practical.', 'It works only in zoos.'], sol: 'The joke is a logical-sounding rule with no practical value.' })),
  ],
  sol: 'Explain the rule, the facts or idioms behind it, and why it is funny.',
}));
Q('src_chameleon', source({
  t: [4, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The final stanza changes the pattern. For once, the animal described is tiny and harmless: a kind of lizard with no ears and, naturally, no wings. Its test is the cleverest in the poem. If you look at a branch and see nothing there, says the poet, you are looking at a chameleon. The joke rests on the chameleon\'s real talent for blending into its background. After five stanzas of being attacked, the reader is rewarded with an animal that cannot be seen, and the poem ends on a light, puzzling note.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which animal is described in the final stanza of *How to Tell Wild Animals*?', opts: ['the chameleon', 'the bear', 'the hyena', 'the leopard'], sol: 'The last stanza describes the chameleon.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How is the final stanza different from the others, according to the commentary?', opts: ['The animal is tiny and harmless.', 'The animal is the most dangerous.', 'It has no rhyme.', 'It is about a bird.'], sol: 'For once the animal does not attack.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The joke depends on the chameleon\'s real talent for ___ into its background.', acc: [['blending']], sol: 'Chameleons are good at **blending** in (camouflage).' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Explain the test for the chameleon in your own words.', model: 'If a branch looks empty, it must hold a chameleon, because it is perfectly camouflaged.', sol: 'Seeing nothing is the proof, because of camouflage.', scheme: [['Seeing nothing = perfect camouflage', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the commentary call the chameleon test the cleverest in the poem?', opts: ['It turns invisibility itself into the proof.', 'It describes the most dangerous animal.', 'It uses a scientific instrument.', 'It requires touching the animal.'], sol: 'Seeing nothing becomes the evidence: a witty paradox.' })),
  ],
  sol: 'Explain how the last stanza breaks the pattern and why its test is witty.',
}));
Q('src_form', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem has six stanzas of six lines, and each follows the rhyme scheme ababcc. The first four lines set the scene and describe the animal; the closing couplet delivers the punchline, like the last line of a joke. Wells also takes liberties with spelling. In the lion stanza, a word is clipped with an apostrophe so that it rhymes with the animal\'s name. Old-fashioned contractions and grand words such as discern and nonplus add a mock-serious air, as if a learned professor were lecturing on a deeply silly subject.',
  parts: [
    child('a', fb({ t: 3, d: 1, c: 'recall', stem: '*How to Tell Wild Animals* has ___ stanzas of six lines each.', acc: [['six', '6']], sol: 'It has **six** stanzas (sestets).' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What is the rhyme scheme of each stanza of *How to Tell Wild Animals*?', opts: ['ababcc', 'aabbcc', 'abcabc', 'abbacc'], sol: 'Each six-line stanza rhymes ababcc.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What does the closing couplet of each stanza do, according to the commentary?', opts: ['delivers the punchline', 'introduces a new animal', 'describes the setting', 'asks the reader a question'], sol: 'The rhyming couplet works like the last line of a joke.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'Why does the poet clip a word with an apostrophe in the lion stanza?', model: 'So that it rhymes with the animal\'s name (poetic licence).', sol: 'The clipped word is made to rhyme with lion.', scheme: [['To make the rhyme with the animal\'s name', 1]] })),
    child('e', mcq({ t: 4, d: 3, c: 'analysis', stem: 'What effect do grand words like discern and nonplus have, according to the commentary?', opts: ['They add a mock-serious air.', 'They make the poem frightening.', 'They make the poem sad.', 'They explain the science of animals.'], sol: 'Learned words on a silly subject create mock-seriousness.' })),
  ],
  sol: 'For form questions, count stanzas and lines, mark the rhymes as letters and explain the couplet.',
}));
Q('src_message', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Is there anything serious under the fun? Perhaps a little. The poem mocks guidebooks that promise more than they deliver, and it gently reminds us that wild animals are not toys or curiosities: they are powerful, and close encounters can be fatal. But Wells does not preach. Her real gift to the reader is delight in language: in rhyme that snaps shut at the end of each stanza, in playful spellings, in idioms taken literally. This poem is meant to be read aloud, enjoyed and remembered, perhaps the first poem in the book that students laugh at.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What, according to the commentary, does *How to Tell Wild Animals* mock?', opts: ['guidebooks that promise more than they deliver', 'zoos and circuses', 'scientists who study animals', 'hunters and poachers'], sol: 'It parodies useless guidebooks.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which serious reminder does the commentary find under the fun?', opts: ['Wild animals are powerful and close encounters can be fatal.', 'All animals are harmless.', 'Animals should be kept as pets.', 'Only experts may visit forests.'], sol: 'The poem quietly shows that wild animals are dangerous.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the poet\'s real gift to the reader is delight in ___.', acc: [['language']], sol: 'Delight in **language**: rhyme, spelling and idiom.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Give one feature of language the commentary says readers can enjoy.', model: 'Rhyme that snaps shut at the end of each stanza (or playful spellings, or idioms taken literally).', sol: 'Any one: rhyme, playful spellings, literal idioms.', scheme: [['Any one feature named in the commentary', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which activity would best suit *How to Tell Wild Animals* in a classroom?', opts: ['reading it aloud and acting out each stanza', 'memorising a list of tiger facts', 'writing a scientific report on lions', 'drawing a map of Asia'], sol: 'A poem meant to be read aloud and enjoyed suits a lively performance.' })),
  ],
  sol: 'Theme questions: state the idea, then connect it to the humour and the language of the poem.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_humour', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What makes *How to Tell Wild Animals* a humorous poem? Answer in 40–50 words.',
  model: 'The poem pretends to be a serious guide, but each test identifies the animal only when it is already attacking you, too late to help. The calm tone, playful misspellings, ironic words such as caress and idioms taken literally all add to the fun.',
  sol: 'The central joke (too-late identification) + two features of language that add humour.',
}));
Q('sa_lion_tiger', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How, according to *How to Tell Wild Animals*, can you identify the Asiatic lion and the tiger? Answer in 40–50 words.',
  model: 'The lion, the poet suggests, is the huge yellowish-brown animal roaring over you in an eastern forest as you lie dying. The tiger is the handsome striped animal that welcomes you on a walk; it is recognised by whether it makes a meal of you. Both tests come too late.',
  sol: 'Each animal\'s description and test in own words + the point that the tests come too late.',
}));
Q('sa_leopard', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'How does *How to Tell Wild Animals* say you can identify the leopard, and why is it useless to cry out? Answer in 40–50 words.',
  model: 'The leopard is the animal with a spotted coat, and you can be certain once it has jumped on you. Crying out in pain is useless, the poet says, because the leopard will not stop; it will simply keep leaping on you again and again.',
  sol: 'Identification (spots, leaping on you) + why crying is useless (it keeps leaping).',
}));
Q('sa_bear', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How does the poet of *How to Tell Wild Animals* describe meeting a bear, and where is the irony? Answer in 40–50 words.',
  model: 'A bear, met unexpectedly in your own garden, is recognised by its crushing hug. If you still doubt, it will hug you again. The irony lies in calling this deadly squeeze a caress, a word for a gentle, loving touch, so the opposite of what happens.',
  sol: 'The meeting and the test in own words + the ironic word + why it is ironic.',
}));
Q('sa_croc_hyena', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How does *How to Tell Wild Animals* help a beginner tell the crocodile and the hyena apart? Answer in 40–50 words.',
  model: 'The poet offers a neat rule: the animal that comes grinning is the hyena, and the one that weeps is the crocodile. It plays on the hyena\'s laugh-like call and on the idiom crocodile tears, meaning false sorrow. The rule is neat but useless in real danger.',
  sol: 'The rule + the fact and idiom it rests on + why it is funny.',
}));
Q('sa_chameleon', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How, according to *How to Tell Wild Animals*, can you identify the chameleon? Why is this test witty? Answer in 40–50 words.',
  model: 'The poet describes the chameleon as a small lizard with no ears and no wings. If you look at a branch and see nothing, you are seeing a chameleon. The test is witty because it turns the animal\'s perfect camouflage, its invisibility, into the proof of its presence.',
  sol: 'Description + the test in own words + why it is witty (camouflage as proof).',
}));
Q('sa_spelling', short({
  ...SA3, t: 3, d: 4, c: 'analysis',
  stem: 'Why does the poet of *How to Tell Wild Animals* use deliberate misspellings? Give two examples, described in your own words. Answer in 40–50 words.',
  model: 'The poet bends spelling for rhyme, rhythm and fun, which is poetic licence. In the lion stanza a word for dying is clipped with an apostrophe to rhyme with lion. In the leopard stanza the verb for jumping is respelt to echo the first syllable of the animal\'s name.',
  sol: 'Purpose (rhyme, rhythm, humour; poetic licence) + two examples described, not quoted.',
}));
Q('sa_rhyme', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'Describe the form and rhyme scheme of *How to Tell Wild Animals*. How does the rhyme help the humour? Answer in 40–50 words.',
  model: 'The poem has six stanzas of six lines, each rhyming ababcc. The first four lines describe the animal and set up the situation, while the closing rhyming couplet delivers the punchline. This snapping final rhyme works like the last line of a joke and makes it memorable.',
  sol: 'Stanzas and lines + rhyme scheme + how the couplet works as a punchline.',
}));
Q('sa_tone', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe the tone of *How to Tell Wild Animals*. Answer in 40–50 words.',
  model: 'The tone is light-hearted and mock-serious. The speaker sounds like a calm teacher giving sensible advice, using grand words such as discern and nonplus, yet the advice is absurd and arrives too late. This polite, straight-faced voice describing danger and death creates the poem\'s comic irony.',
  sol: 'Name the tone + how the voice creates it + effect (comic irony).',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *How to Tell Wild Animals* a suitable title for the poem? Give reasons in 40–50 words.',
  model: 'Yes. The title sounds like a serious handbook promising useful advice, which is exactly what the poem pretends to be. The humour comes from the gap between that promise and the useless tests that follow. The title therefore sets up the joke before the first stanza begins.',
  sol: 'A clear view + what the title promises + the gap between promise and content.',
}));
Q('sa_message', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Is *How to Tell Wild Animals* only a joke, or does it carry a message? Give a reasoned answer in 40–50 words.',
  model: 'It is mainly a joke, written to delight readers with wordplay. However, under the fun lies a reminder that wild animals are powerful and dangerous, not curiosities to approach casually. It also gently mocks guidebooks that promise expert knowledge but offer nothing useful in a real emergency.',
  sol: 'A clear view + the serious reminder + the parody of guidebooks.',
}));
Q('sa_apply', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'Suggest a seventh stanza idea for *How to Tell Wild Animals*: choose an animal and describe its humorous test in prose. Answer in 40–50 words.',
  model: 'The animal could be the porcupine. If, while resting in a forest, you lean against something that suddenly fills your back with sharp quills, you may be certain you have found a porcupine. Like the other tests, this one identifies the animal only after the harm is done.',
  sol: 'A suitable animal + a test in the poem\'s style (identification too late) + link to the pattern.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_poet', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who wrote *How to Tell Wild Animals*? Mention two facts about the poet in 30–40 words.',
  model: 'The poem was written by Carolyn Wells (1862–1942), an American writer. She is known for her humorous and nonsense verse and for editing collections of comic poetry; she also wrote many mystery novels.',
  sol: 'Name + any two facts (American; 1862–1942; humorous verse; anthologies; mystery novels).',
}));
Q('sb_animals', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Name the animals described in *How to Tell Wild Animals*, in the order in which they appear. Answer in 30–40 words.',
  model: 'The poem describes seven animals in this order: the Asiatic lion, the tiger, the leopard, the bear, then the crocodile and the hyena together in one stanza, and finally the small, harmless chameleon in the last stanza.',
  sol: 'All seven animals in the poem\'s order.',
}));
Q('sb_caress', short({
  ...SA2, t: [3, 4], d: 2, c: 'understanding',
  stem: 'What does the word *caress* mean, and why is it used ironically in *How to Tell Wild Animals*? Answer in 30–40 words.',
  model: 'A caress is a gentle, loving touch. The poet uses it for the bear\'s crushing, possibly deadly hug. Calling a dangerous squeeze a tender gesture is ironic and makes the situation comic rather than frightening.',
  sol: 'Meaning + what it describes in the poem + why that is ironic.',
}));
Q('sb_couplet', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What is the role of the final couplet in each stanza of *How to Tell Wild Animals*? Answer in 30–40 words.',
  model: 'The final rhyming couplet delivers the punchline of each stanza. After four lines of description, the last two lines reveal the absurd test or its result, so the rhyme snaps shut on the joke.',
  sol: 'The couplet as punchline + how it follows the description.',
}));
Q('sb_crocodile_tears', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'How does *How to Tell Wild Animals* use the idiom crocodile tears? Answer in 30–40 words.',
  model: 'The idiom means false sorrow. The poet takes it literally, as if crocodiles really wept, and turns it into a rule: the animal that weeps is the crocodile. Taking an idiom literally is a source of humour.',
  sol: 'Meaning of the idiom + how the poem takes it literally + the effect.',
}));
Q('sb_message', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'State the main purpose of *How to Tell Wild Animals* in 30–40 words.',
  model: 'The main purpose is to entertain. Using a mock-serious guidebook style, absurd tests and playful language, the poem makes readers laugh, while quietly reminding them that wild animals are dangerous and deserve respect.',
  sol: 'Main purpose (to entertain) + how + the quiet reminder.',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_humour', long({
  ...LA, t: 2, d: 3, c: 'analysis',
  stem: 'Discuss the different sources of humour in *How to Tell Wild Animals*. Answer in 100–120 words.',
  model: 'How to Tell Wild Animals is funny in several ways. Its central joke is situational irony: each animal is identified only when it is already attacking you, so the advice is useless. The tone adds to this, because the speaker calmly explains these deadly tests like a polite teacher, using grand words such as discern and nonplus. Verbal irony appears when a bear\'s crushing hug is called a caress. The poet also plays with language: she clips and respells words for rhyme and puns, and turns the idiom crocodile tears into a rule. Finally, the chameleon test makes invisibility itself the proof. Each stanza ends with a rhyming couplet that snaps shut on the punchline.',
  sol: 'Situational irony → tone → verbal irony → wordplay and spelling → idiom → the chameleon paradox → the couplet. Do not quote the poem.',
}));
Q('la_guide', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Write a short humorous guide in prose, in the spirit of *How to Tell Wild Animals*, on how to identify three creatures of an Indian city or village. Answer in 100–120 words.',
  model: 'A Beginner\'s Guide to Neighbourhood Creatures\n\nIf you are relaxing on your terrace with a plate of pakoras and a grey shape snatches one from your hand before vanishing over the wall, you have met the monkey. Do not chase it; it will return tomorrow with relatives. If, on a quiet lane, a white bird with a long neck chases you, honking furiously, all the way to the corner, you have identified the goose. And if your new shoes, left outside overnight, are missing in the morning with only a few bite marks remaining, congratulations: you have discovered the puppy who lives next door.',
  sol: 'A mock-serious guide format; three creatures; each test identifies the creature only after something has gone wrong; light, polite tone. No lines of the poem quoted.',
}));
Q('la_tone_language', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'How do the language and tone of *How to Tell Wild Animals* make it different from a real guide to wildlife? Answer in 100–120 words.',
  model: 'A real wildlife guide gives accurate, practical information so that readers can recognise animals safely and from a distance. How to Tell Wild Animals copies the confident, instructive voice of such a guide, addressing the reader directly and using learned words such as discern and nonplus. But its content is absurd: each test works only during an attack, the bear\'s deadly hug is called a caress, crocodiles are recognised by their tears, and the chameleon by not being seen. Old-fashioned contractions, clipped and respelt words, and a punchline couplet in every stanza show that the poem is a performance, not a manual. The gap between serious tone and silly content creates the parody.',
  sol: 'Features of a real guide → how the poem imitates the voice → how the content subverts it → language features → the effect (parody).',
}));
Q('la_safety', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: '*How to Tell Wild Animals* is a funny poem, but meeting wild animals is no joke. Write an article for your school magazine on staying safe and respectful around wildlife, using the poem as your starting point, in 100–120 words.',
  model: 'Laugh at the Poem, Respect the Animal\n\nCarolyn Wells\'s How to Tell Wild Animals makes us laugh because every animal is identified only once it attacks. In real life, that is no laughing matter. Whether we visit a national park or come across a monkey in our colony, a few rules keep both people and animals safe. Watch from a distance and never feed wild animals. Follow the instructions of forest guides. Keep food covered and avoid sudden movements. Remember that animals attack mostly when they feel threatened or cornered. Above all, respect their space: we are visitors in their home. Enjoy the poem, but leave the identification tests to the page.',
  sol: 'Article title + link to the poem in own words + practical safety rules + respect for wildlife + conclusion.',
}));
Q('la_favourite', long({
  ...LA, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Which stanza of *How to Tell Wild Animals* do you find the funniest, and why? Answer in 100–120 words, describing the stanza in your own words.',
  model: 'The funniest stanza for me is the last one, about the chameleon. After five stanzas in which the reader is roared at, eaten, leapt on, hugged or fooled, the poet finally describes a small, harmless lizard. She notes, very seriously, that it has no ears and no wings, as if anyone might expect lizards to fly. Then comes the cleverest test of all: if you look at a branch and see nothing, you have found a chameleon. The joke turns the animal\'s perfect camouflage into proof of its presence. It is witty rather than violent, and it ends the poem with a puzzled smile instead of a scream.',
  sol: 'A clear choice → the stanza described in own words → why it is funny (contrast, paradox, tone) → a concluding judgment.',
}));
Q('la_poetic_licence', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'What is poetic licence? How does Carolyn Wells use it in *How to Tell Wild Animals*? Answer in 100–120 words.',
  model: 'Poetic licence is the freedom a poet takes to break the ordinary rules of language, spelling or grammar for the sake of rhyme, rhythm or effect. Carolyn Wells uses it playfully. In the lion stanza, a word for dying is clipped with an apostrophe so that it rhymes with the animal\'s name. In the leopard stanza, the verb for jumping is respelt in two forms that echo the first syllable of the animal\'s name, a sly pun. She also uses old-fashioned contractions and inverted word order, as in poetry of earlier times, to fit her rhyme scheme. These liberties are never careless; they are part of the comedy and make the poem bouncy and memorable.',
  sol: 'Definition → examples described (clipped word, respelt verb, contractions, inversion) → purpose (rhyme, rhythm, humour) → effect.',
}));

// ================================================================ objective items
Q('mc_poet', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the poet of *How to Tell Wild Animals*?', opts: ['Carolyn Wells', 'Leslie Norris', 'Robert Frost', 'John Berryman'], sol: 'Carolyn Wells, the American writer of humorous verse. The others wrote other poems in the Class 10 textbook.' }));
Q('mc_stanzas', mcq({ t: 3, d: 1, c: 'recall', stem: 'How many stanzas does *How to Tell Wild Animals* have?', opts: ['six', 'four', 'five', 'eight'], sol: 'Six stanzas of six lines each.' }));
Q('mc_scheme', mcq({ t: 3, d: 2, c: 'recall', stem: 'The rhyme scheme of each stanza of *How to Tell Wild Animals* is…', opts: ['ababcc', 'aabbcc', 'abcabc', 'abccba'], sol: 'Each six-line stanza rhymes ababcc.' }));
Q('mc_bear', mcq({ t: 1, d: 2, c: 'understanding', stem: 'In *How to Tell Wild Animals*, how can you be certain you have met a bear?', opts: ['It squeezes you in a crushing hug.', 'It laughs at you.', 'It changes colour.', 'It weeps as it comes.'], sol: 'The bear is known by its crushing hug.' }));
Q('mc_hyena', mcq({ t: 1, d: 2, c: 'understanding', stem: 'According to *How to Tell Wild Animals*, the animal that arrives grinning is the…', opts: ['hyena', 'crocodile', 'bear', 'tiger'], sol: 'The hyena, known for its laugh-like call, comes grinning.' }));
Q('mc_chameleon', mcq({ t: 1, d: 2, c: 'understanding', stem: 'In *How to Tell Wild Animals*, how do you know you are looking at a chameleon?', opts: ['The branch looks empty.', 'It roars loudly.', 'It has bright spots.', 'It crushes you.'], sol: 'Perfect camouflage: seeing nothing is the proof.' }));
Q('mc_caress', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Calling the bear\'s crushing hug a caress, as *How to Tell Wild Animals* does, is an example of…', opts: ['irony', 'alliteration', 'simile', 'onomatopoeia'], sol: 'A gentle word for a deadly act is (verbal) irony.' }));
Q('mc_tawny', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *How to Tell Wild Animals*, *tawny* means…', opts: ['yellowish-brown', 'jet black', 'pure white', 'striped'], sol: 'Tawny = yellowish-brown, the colour of the lion\'s coat.' }));
Q('mc_novice', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *How to Tell Wild Animals*, the word *novice* means…', opts: ['a beginner', 'an expert', 'a hunter', 'a zoo keeper'], sol: 'Novice means someone new to an activity.' }));
Q('mc_spelling', mcq({ t: 3, d: 3, c: 'analysis', stem: 'In *How to Tell Wild Animals*, why does the poet clip the word for dying in the lion stanza?', opts: ['to make it rhyme with the animal\'s name', 'because she made a spelling mistake', 'to show the lion has an accent', 'to make the line shorter for printing'], sol: 'Poetic licence: the clipped word rhymes with lion.' }));
Q('mc_tone', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes the tone of *How to Tell Wild Animals*?', opts: ['mock-serious', 'tragic', 'angry', 'mournful'], sol: 'Serious-sounding advice on a silly subject is mock-serious.' }));
Q('mc_apply', mcq({ t: 2, d: 3, c: 'application', stem: 'Which SOYL-written rule is most like the humour of *How to Tell Wild Animals*?', opts: ['You can tell a wasp from a fly because only one leaves you with a swollen hand.', 'Wasps are insects with six legs.', 'Flies are found near rubbish.', 'Both wasps and flies have wings.'], sol: 'Identifying an insect only after it has harmed you mirrors the poem\'s joke.' }));
Q('mc_idiom', mcq({ t: 3, d: 3, c: 'analysis', stem: 'The crocodile and hyena stanza of *How to Tell Wild Animals* takes which idiom literally?', opts: ['crocodile tears', 'a bear hug', 'the lion\'s share', 'a leopard cannot change its spots'], sol: 'Weeping identifies the crocodile, from the idiom crocodile tears.' }));
Q('mc_irony_pattern', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is ironic about most of the identification tests in *How to Tell Wild Animals*?', fixed: true, key: 'c', opts: ['They need expensive equipment.', 'They are copied from science books.', 'They work only when the animal is already attacking you.', 'They work only in daylight.'], sol: 'The knowledge arrives too late to be useful.' }));

Q('fb_form', fb({ t: 3, d: 1, c: 'recall', marks: 1, stem: '*How to Tell Wild Animals* has ___ stanzas, each of ___ lines.', acc: [['six', '6'], ['six', '6']], sol: '**Six** stanzas of **six** lines each.', scheme: [['six stanzas', 0.5], ['six lines', 0.5]] }));
Q('fb_scheme', fb({ t: 3, d: 2, c: 'recall', stem: 'Using letters, show how the line endings rhyme within one stanza of *How to Tell Wild Animals*: ___', acc: [['ababcc', 'a b a b c c', 'abab cc']], sol: 'Each stanza rhymes **ababcc**.' }));
Q('fb_poet', fb({ t: 1, d: 1, c: 'recall', stem: '*How to Tell Wild Animals* was written by the American writer Carolyn ___.', acc: [['Wells']], sol: 'The poet is Carolyn **Wells**.' }));
Q('fb_licence', fb({ t: 3, d: 2, c: 'understanding', stem: 'A poet\'s freedom to bend spelling or grammar for rhyme or effect, as in *How to Tell Wild Animals*, is called poetic ___.', acc: [['licence', 'license']], sol: 'It is poetic **licence**.' }));

Q('ar_croc', ar({ t: 3, d: 3, c: 'analysis', a: 'In *How to Tell Wild Animals*, the animal that weeps is said to be the crocodile.', r: 'The hyena in *How to Tell Wild Animals* is said to come grinning.', key: 'b', sol: 'Both are true, but R does not explain A. A rests on the idiom crocodile tears, not on how the hyena behaves.' }));
Q('ar_irony', ar({ t: 2, d: 3, c: 'analysis', a: 'The identification tests in *How to Tell Wild Animals* are of no practical use.', r: 'In *How to Tell Wild Animals*, most animals can be recognised only once they are attacking.', key: 'a', sol: 'Both are true, and the timing of the tests is exactly why they are useless.' }));
Q('ar_form', ar({ t: 3, d: 2, c: 'understanding', a: 'Each stanza of *How to Tell Wild Animals* ends with a rhyming couplet.', r: '*How to Tell Wild Animals* is written in free verse without rhyme.', key: 'c', sol: 'A is true: each stanza ends cc. R is false: the scheme is ababcc.' }));
Q('ar_chameleon', ar({ t: 1, d: 3, c: 'analysis', a: 'The chameleon in *How to Tell Wild Animals* attacks the reader like the other animals.', r: 'In *How to Tell Wild Animals*, you identify the chameleon by the fact that you cannot see it.', key: 'd', sol: 'A is false: this lizard is tiny and harmless. R is true: seeing nothing is the test.' }));

Q('tf_serious', tf({ t: 2, d: 1, c: 'recall', stem: 'True or false: *How to Tell Wild Animals* is meant to be a serious scientific guide.', ans: false, sol: 'It only pretends to be a guide; it is really a humorous poem.' }));
Q('tf_hyena', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: in *How to Tell Wild Animals*, the hyena and the crocodile share one stanza.', ans: true, sol: 'Stanza 5 offers a rule for telling them apart.' }));
Q('tf_spelling', tf({ t: 3, d: 3, c: 'analysis', stem: 'True or false: the unusual spellings in *How to Tell Wild Animals* are printing errors.', ans: false, sol: 'They are deliberate: poetic licence for rhyme, rhythm and humour.' }));
Q('tf_couplet', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: each stanza of *How to Tell Wild Animals* ends with a pair of rhyming lines.', ans: true, sol: 'The ababcc scheme ends every stanza with a couplet.' }));

Q('ord_animals', ord({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Arrange the animals in the order in which *How to Tell Wild Animals* describes them.',
  items: ['the Asiatic lion', 'the tiger', 'the leopard', 'the bear', 'the crocodile and the hyena', 'the chameleon'],
  sol: 'Lion → tiger → leopard → bear → crocodile and hyena → chameleon.',
}));
Q('ord_stanza', ord({
  t: [3, 4], d: 2, c: 'application', marks: 2,
  stem: 'Arrange the parts of a typical stanza of *How to Tell Wild Animals* in order (SOYL summary).',
  items: ['A situation in which the animal appears', 'A description of the animal\'s appearance or behaviour', 'The absurd identification test', 'The punchline in the rhyming couplet'],
  sol: 'Situation → description → test → punchline couplet.',
}));

Q('mt_tests', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each animal in *How to Tell Wild Animals* with its humorous identification test (SOYL summary).',
  pairs: [['tiger', 'whether it makes a meal of you'], ['leopard', 'it keeps leaping on you'], ['bear', 'a crushing hug, repeated'], ['chameleon', 'the branch looks empty']],
  sol: 'Each test identifies the animal at the worst possible moment, except the chameleon, which is never seen.',
}));
Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word used in *How to Tell Wild Animals* with its meaning.',
  pairs: [['discern', 'make out; recognise'], ['nonplus', 'puzzle; confuse'], ['peppered', 'sprinkled all over'], ['caress', 'a gentle, loving touch']],
  sol: 'Single words from the poem with their meanings.',
}));
Q('mt_devices', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of *How to Tell Wild Animals* with the correct term.',
  pairs: [['a deadly hug called a caress', 'irony'], ['a clipped word made to rhyme with lion', 'poetic licence'], ['the crocodile known by its tears', 'idiom taken literally'], ['serious advice on a silly subject', 'mock-serious tone']],
  sol: 'Name the device by what it does in the poem.',
}));
