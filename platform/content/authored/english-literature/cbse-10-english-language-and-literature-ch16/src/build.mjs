// Build CBSE 10 English Language and Literature ch16 "How to Tell Wild Animals". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch16/src/build.mjs
// LITERATURE RULE: the poem is never quoted or paraphrased line by line; only the title, the animals'
// names and single words appear; the respelt words are described, not quoted. Students read the poem in
// First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch16', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL\'s explanation; it does not reproduce the poem.';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions on meaning, tone and devices (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words, any 4 of 5', '3 each'],
  ],
  'Table of how a First Flight poem is examined: a five-mark reference to context extract and three-mark short answers of forty to fifty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vPoet = table(
  ['About the poet', ''],
  [
    ['Poet', 'Carolyn Wells (1862–1942), American writer'],
    ['Known for', 'humorous and nonsense verse, parodies and riddles'],
    ['Also', 'edited collections of comic poetry; wrote many mystery novels'],
  ],
  'Table of facts about Carolyn Wells: an American writer, 1862 to 1942, known for humorous and nonsense verse, who edited collections of comic poetry and wrote many mystery novels.',
);
const vGlance = table(
  ['Feature', 'How to Tell Wild Animals'],
  [
    ['Length', '6 stanzas of 6 lines (sestets)'],
    ['Rhyme scheme', 'ababcc in every stanza: the couplet is the punchline'],
    ['Speaker', 'a mock expert advising "you", the reader'],
    ['Pattern', 'one animal per stanza (stanza 5 has two)'],
    ['Language', 'grand words, old-fashioned contractions, playful spellings'],
    ['Tone', 'light-hearted, mock-serious, ironic'],
  ],
  'Table of the poem at a glance: six stanzas of six lines rhyming a b a b c c, a mock expert advising the reader, one animal per stanza with two in stanza five, grand words and playful spellings, and a light-hearted, mock-serious, ironic tone.',
);
const vAnimals = table(
  ['Stanza', 'Animal', 'Real feature used', 'The poem\'s "test" (SOYL summary)'],
  [
    ['1', 'Asiatic lion', 'tawny coat; roar; eastern forests', 'it roars over you as you lie dying'],
    ['2', 'tiger', 'dark stripes across yellow fur', 'observe whether it makes a meal of you'],
    ['3', 'leopard', 'spotted coat; leaps on prey', 'it springs on you, and keeps springing'],
    ['4', 'bear', 'powerful embrace', 'a crushing hug; in doubt, another one'],
    ['5', 'hyena / crocodile', 'laugh-like call / crocodile tears', 'the grinning one is the hyena; the weeping one, the crocodile'],
    ['6', 'chameleon', 'camouflage; no external ears', 'the branch looks empty'],
  ],
  'Table of the animals stanza by stanza: the Asiatic lion, known when it roars over you as you lie dying; the tiger, by whether it makes a meal of you; the leopard, by springing on you; the bear, by its hug; the hyena by its grin and the crocodile by its tears; and the chameleon, by finding the branch apparently empty.',
);
const vPattern = flow('LR', ['An animal appears', 'Its looks or behaviour', 'The absurd test', 'Punchline in the couplet'], 'Flow of a typical stanza: an animal appears, its looks or behaviour are described, the absurd test is given, and the punchline arrives in the closing couplet.', 'The pattern of a typical stanza (SOYL summary).');
const vDevices = table(
  ['Device', 'Where in the poem (described)', 'A SOYL example of the device'],
  [
    ['Situational irony', 'each animal is identified only when it attacks', 'The fire-safety talk was cancelled because the hall caught fire.'],
    ['Verbal irony', 'the bear\'s deadly hug is called a caress', 'Calling a twelve-hour exam "a little chat".'],
    ['Poetic licence', 'a word clipped to rhyme with lion; a verb respelt to echo leopard', 'The moon is bright, the night is dark, / I hear a dog that\'s goin\' bark.'],
    ['Idiom taken literally', 'the crocodile known by its tears', 'He let the cat out of the bag, and it ran straight to the neighbours.'],
    ['Mock-serious tone', 'grand words (discern, nonplus) on a silly subject', 'It is my solemn duty to inform you that your sandwich is missing.'],
    ['Rhyme', 'ababcc; the couplet delivers the joke', 'light / day / night / play / tree / me'],
  ],
  'Table of poetic devices in the poem, described, each with a SOYL example: situational irony, verbal irony, poetic licence, an idiom taken literally, a mock-serious tone and the a b a b c c rhyme.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['tawny', 'yellowish-brown'],
    ['discern', 'make out; recognise'],
    ['peppered', 'sprinkled all over (here, by spots)'],
    ['caress', 'a gentle, loving touch'],
    ['novice', 'a beginner'],
    ['nonplus', 'puzzle; confuse'],
  ],
  'Table of word meanings: tawny, discern, peppered, caress, novice and nonplus.',
  'Single words from the poem with their meanings.',
);
const vShortPlan = flow('LR', ['Key word of the question', 'Point in one sentence', 'The animal and its test in your own words', 'Why it is funny'], 'Flow for a forty to fifty word answer: find the key word, state the point, give the animal and its test in your own words, explain why it is funny.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'How to Tell Wild Animals — Carolyn Wells',
  goals: [
    'Explain the central idea of the poem stanza by stanza, in your own words',
    'Explain the humorous ways of identifying each animal',
    'Identify humour, rhyme, irony and deliberate misspelling and say what they do',
    'Describe the poem\'s form and its punchline couplets',
    'Answer extract-based and 40–50 word questions on the poem',
  ],
  slides: [
    sl('title', 'How to Tell Wild Animals — Carolyn Wells', {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today’s poem is How to Tell Wild Animals by Carolyn Wells, the funniest poem in your book. Please read it in First Flight now, aloud, twice, and enjoy it. We will not repeat its lines here. Instead we will see how the joke works in every stanza, what each animal’s test is, and how to answer board questions on the poem.',
    }),
    sl('concept', 'How to read a humorous poem', {
      bl: [
        'Read it aloud twice from *First Flight*, with a straight face.',
        'For each stanza ask: which animal? what is the test? why is it funny?',
        'Notice the last two lines of every stanza: that is where the joke lands.',
        'In answers, explain in your own words; never copy lines.',
      ],
      n: 'Humorous poems are best read aloud, with a straight face, like a serious lecture. For each stanza ask three questions: which animal is it, what is the test, and why is it funny? Watch the last two lines of every stanza, because that is where the joke lands. In the exam, explain in your own words. Copying lines does not earn marks.',
    }),
    sl('concept', 'The poet: Carolyn Wells', {
      v: vPoet,
      n: 'Carolyn Wells was an American writer who lived from eighteen sixty-two to nineteen forty-two. She loved comic and nonsense verse, wrote parodies and riddles, and edited collections of funny poems. She also wrote many mystery novels. This poem shows her favourite trick: saying something silly in a perfectly serious voice.',
    }),
    sl('concept', 'The poem at a glance', {
      v: vGlance,
      n: 'Here is the poem at a glance. Six stanzas of six lines, each rhyming a b a b c c, so every stanza ends with a rhyming couplet that delivers the punchline. The speaker is a mock expert advising you, the reader. There is one animal in each stanza, except the fifth, which has two. And the tone is light-hearted and mock-serious.',
    }),
    sl('concept', 'The joke behind every stanza', {
      b: 'The title promises a practical guide. But almost every test identifies the animal only when it is already attacking you, so the knowledge arrives too late to help. That is situational irony, delivered in a calm, teacherly voice.',
      n: 'Before we meet the animals, notice the single joke behind the poem. The title promises a useful guide. But almost every test tells you which animal it is only when it is already attacking you. By then the knowledge is useless. That is situational irony, and the calm, polite voice of the speaker makes it even funnier.',
    }),
    sl('concept', 'Stanzas 1 and 2: the lion and the tiger', {
      b: 'In SOYL\'s words: wandering in eastern forests, if a huge yellowish-brown animal roars over you as you lie dying, you have met the Asiatic lion. If a handsome striped animal welcomes you on a walk, observe whether it makes a meal of you; that will settle that you have met the tiger.',
      n: 'The first two stanzas deal with the big cats of Asia. In eastern forests, if a huge yellowish-brown animal roars over you as you lie dying, you may conclude you have met the Asiatic lion. And if a handsome striped animal welcomes you on your walk, simply observe whether it makes a meal of you. That will tell you that you have met the tiger.',
    }),
    sl('concept', 'Stanzas 3 and 4: the leopard and the bear', {
      b: 'In SOYL\'s words: an animal with a spotted coat that springs on you must be the leopard, and crying out is useless, since it will keep springing. An animal met close to home that crushes you in a hug is the bear. Should you still doubt, it will hug you again, and the poet calls this a caress.',
      n: 'Next, the leopard. If an animal with a spotted coat springs on you, you have met the leopard, and there is no point crying out, because it will only keep springing. Then the bear, met close to home. Its crushing hug identifies it, and if you are still unsure, it will hug you again. The poet calls that deadly squeeze a caress.',
    }),
    sl('check', 'Check: the bear', {
      chk: 'mc_bear',
      n: 'Your turn. How, according to the poem, can you be certain that you have met a bear? Choose the answer that matches the poet’s test.',
    }),
    sl('concept', 'Stanzas 5 and 6: the crocodile, the hyena and the chameleon', {
      b: 'In SOYL\'s words: a beginner may be puzzled by hunting animals, but there is a rule: the one that comes grinning is the hyena; the one that weeps is the crocodile. Last, the chameleon: a small lizard with no ears and no wings. If you look at a branch and see nothing, you are looking at a chameleon.',
      n: 'The fifth stanza admits that beginners may be puzzled, then offers a rule. The animal that comes grinning is the hyena; the one that weeps is the crocodile. The last stanza changes the pattern. The chameleon, by contrast, stays tiny and harmless, a little lizard with no ears and no wings. If you look at a branch and see nothing at all, you have found a chameleon.',
    }),
    sl('concept', 'Each animal and its test', {
      v: vAnimals,
      n: 'Here is every stanza in one table. Notice the real feature behind each joke: the lion’s coat and roar, the tiger’s stripes, the leopard’s spots and leap, the bear’s strength, the hyena’s laugh-like call, the idiom crocodile tears, and the chameleon’s camouflage. The poet starts from facts and pushes each one into absurdity.',
    }),
    sl('diagram', 'The pattern of a stanza', {
      v: vPattern,
      n: 'Almost every stanza follows the same pattern. An animal appears. Its looks or behaviour are described. Then comes the absurd test. And the rhyming couplet at the end delivers the punchline. Once you spot this pattern, you can explain any stanza in an exam, and you can even write a funny stanza of your own.',
    }),
    sl('check', 'Check: assertion and reason', {
      chk: 'ar_croc',
      n: 'Check yourself with an assertion and reason. Both statements may be true, but does the second really explain the first? Think about what the crocodile’s tears are based on.',
    }),
    sl('concept', 'Themes and message', {
      bl: [
        '**Humour and wordplay:** the poem\'s main aim is delight.',
        '**Parody:** it mocks guides that promise more than they deliver.',
        '**A quiet reminder:** wild animals are powerful; close encounters can be fatal.',
        '**Language as fun:** rhyme, spelling and idiom are played with.',
      ],
      n: 'What is the poem about? Mainly delight: it wants us to laugh. The poem is also a parody, mocking guides that promise more than they deliver. Underneath, there is a quiet reminder that wild animals are powerful, and that meeting one up close can be fatal. And it celebrates language as play. In answers, say that its purpose is to entertain.',
    }),
    sl('concept', 'Poetic devices, with SOYL\'s own examples', {
      b: 'Each device is described in the poem and illustrated with a SOYL sentence, not with the poem\'s lines.',
      v: vDevices,
      n: 'Now the devices. Situational irony: each animal is known only when it attacks. Verbal irony: a deadly hug called a caress. Poetic licence: words clipped or respelt for rhyme and fun. An idiom taken literally: crocodile tears. A mock-serious tone. And the a b a b c c rhyme. The examples on the right are our own sentences.',
    }),
    sl('example', 'Worked point: deliberate misspellings', {
      b: 'Find two unusual spellings in *First Flight*: one in the lion stanza and one in the leopard stanza. They are not mistakes.',
      bl: [
        '**Lion stanza:** a word for dying is clipped with an apostrophe so that it rhymes with the animal\'s name.',
        '**Leopard stanza:** the verb for jumping is respelt so that it echoes the first syllable of the animal\'s name.',
        '**Term:** poetic licence, a poet\'s freedom to bend the rules for rhyme, rhythm or effect.',
        '**Effect:** the rhyme stays neat and the playful spelling adds to the comedy.',
      ],
      n: 'Here is a worked point. In the lion stanza, a word for dying is clipped with an apostrophe so that it rhymes with the animal’s name. In the leopard stanza, the verb for jumping is respelt to echo the first syllable of the animal’s name. These are not mistakes. They are poetic licence, used for rhyme, rhythm and fun.',
    }),
    sl('concept', 'Tone', {
      b: 'Light-hearted and mock-serious. The speaker sounds like a polite expert giving sensible advice, with grand words and old-fashioned contractions, while the advice itself is absurd and comes too late.',
      n: 'Listen to the tone. The speaker sounds like a polite expert, calm and confident, using grand words like discern and nonplus and old-fashioned contractions. But the advice is absurd and arrives too late. This gap between a serious manner and a silly message is called a mock-serious tone, and that gap drives the poem’s comedy.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'A few words to know. Tawny, yellowish-brown. Discern, to make out or recognise. Peppered, sprinkled all over. Caress, a gentle, loving touch. Novice, a beginner. And nonplus, to puzzle or confuse. Several of these grand words add to the mock-serious tone, so mention that when you explain them.',
    }),
    sl('check', 'Check: the rhyme scheme', {
      chk: 'fb_scheme',
      n: 'Quick check. Write the rhyme scheme of one stanza using letters. Look in your textbook at which line endings share a sound, and notice the last two lines.',
    }),
    sl('example', 'Worked example: a 40–50 word answer', {
      b: '*Question:* How does the poet make the bear stanza funny?',
      v: vShortPlan,
      bl: [
        '**Point:** a deadly encounter is described as if it were affectionate.',
        '**Animal and test (own words):** the bear, met close to home, is known by its crushing hug.',
        '**Why funny:** if you still doubt, it hugs again; the squeeze is called a caress.',
        '**Model (46 words):** *The poet turns a deadly meeting into a joke. A bear met close to home is known by its crushing hug, and if you still have doubts, it will hug you again. Calling this killing squeeze a caress, a tender touch, is irony that makes us laugh.*',
      ],
      n: 'Here is how to build a three mark answer. Find the key word: funny. State the point: a deadly meeting is treated as affectionate. Give the animal and its test in your own words. Then say why it is funny: the second hug, and the ironic word caress. The model is forty-six words and quotes nothing.',
    }),
    sl('check', 'Check: the idiom', {
      chk: 'mc_idiom',
      n: 'One more. Which well-known idiom does the crocodile and hyena stanza take literally? Think about how the crocodile is identified.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'A mock guide: almost every animal is identified only when it attacks.',
        'Lion, tiger, leopard, bear, crocodile and hyena, chameleon: each with an absurd test.',
        'Form: 6 stanzas of 6 lines, ababcc; the couplet is the punchline.',
        'Devices: situational and verbal irony, poetic licence, idiom taken literally, mock-serious tone.',
        'Purpose: to entertain, with a quiet reminder that wild animals are dangerous. Read the poem in *First Flight*.',
      ],
      v: vPattern,
      n: 'Let us sum up. The poem is a mock guide in which almost every animal is identified only when it attacks. Six stanzas of six lines, rhyming a b a b c c, with a punchline couplet. Irony, poetic licence, an idiom taken literally and a mock-serious tone make it funny. Its purpose is to entertain, with a quiet reminder about real danger.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never write out the poem\'s lines; describe each animal\'s test in your own words.',
        'Explain why each test is funny: it comes too late, or it rests on a paradox.',
        'Name devices **and** say what they do: *calling the hug a caress is irony*.',
        '40–50 word answers: point + animal and test + why it is funny.',
        'Common slips: calling the spellings mistakes; saying the chameleon attacks; mixing up hyena and crocodile.',
      ],
      n: 'Exam tips. Never write out the lines; describe each test in your own words. Always explain why it is funny. When you name a device, say what it does. Keep three mark answers to point, test and humour. And avoid the common slips: the spellings are deliberate, the chameleon does no harm, and the hyena is the one that grins while the crocodile weeps.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'How to Tell Wild Animals — study notes',
  sections: [
    {
      h: '1. The poet and the poem',
      t: 1,
      b: `${READ}\n\n**Carolyn Wells** (1862–1942) was an American writer of humorous and nonsense verse, parodies and riddles. She edited collections of comic poetry and also wrote many mystery novels. *How to Tell Wild Animals* pretends to be a practical guide to recognising dangerous animals.`,
      v: vPoet,
    },
    {
      h: '2. What happens (SOYL summary)',
      t: 1,
      b: '**Stanza 1 — the Asiatic lion:** the huge yellowish-brown animal that roars over you in an eastern forest as you lie dying.\n\n**Stanza 2 — the tiger:** the handsome striped animal that welcomes you; observe whether it makes a meal of you.\n\n**Stanza 3 — the leopard:** the spotted animal that springs on you; crying out is useless, since it keeps springing.\n\n**Stanza 4 — the bear:** met close to home, known by its crushing hug, which it repeats if you doubt; the poet calls it a caress.\n\n**Stanza 5 — the hyena and the crocodile:** a rule for beginners: the grinning one is the hyena, the weeping one the crocodile.\n\n**Stanza 6 — the chameleon:** a small lizard without ears or wings; if a branch looks empty, you have found a chameleon.',
      v: vAnimals,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Humour:** the main purpose is to entertain.\n- **Parody:** the poem mocks guidebooks that promise expert knowledge but are useless in a real emergency.\n- **A quiet reminder:** wild animals are powerful, and close encounters can be fatal.\n- **Delight in language:** rhyme, playful spellings and idioms taken literally.',
    },
    {
      h: '4. Devices, humour and form',
      t: 3,
      b: '**Situational irony:** the tests identify each animal (apart from the harmless chameleon) only when it attacks.\n\n**Verbal irony:** the bear\'s deadly hug is called a caress.\n\n**Poetic licence (deliberate misspelling):** in the lion stanza a word for dying is clipped to rhyme with the animal\'s name; in the leopard stanza the verb for jumping is respelt to echo the first syllable of the animal\'s name. Old-fashioned contractions and inverted word order also fit the rhyme.\n\n**Idiom taken literally:** crocodile tears (false sorrow) becomes the crocodile\'s identifying mark; the hyena\'s laugh-like call explains its grin.\n\n**Form:** six stanzas of six lines; rhyme scheme ababcc; the closing couplet delivers the punchline.',
      v: vDevices,
      terms: [
        ['Poetic licence', 'A poet\'s freedom to bend spelling, grammar or word order for rhyme, rhythm or effect.'],
        ['Situational irony', 'When what happens is the opposite of what was expected (a guide that helps only when it is too late).'],
        ['Mock-serious', 'Treating a silly subject in a solemn, learned manner for comic effect.'],
      ],
    },
    {
      h: '5. Tone',
      t: 3,
      b: 'Light-hearted and mock-serious. The speaker addresses the reader like a polite expert, using grand words (*discern, nonplus*) and old-fashioned contractions, while the advice is absurd. The gap between manner and message creates comic irony.',
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the poem with their meanings.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints the poem\'s lines; SOYL practice uses commentary passages instead. Expect questions on each animal\'s test, the misspellings, irony, the idiom and the rhyme scheme.\n\n**Short answers (3 marks, 40–50 words):** point + animal and test in your own words + why it is funny.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.',
      v: vShortPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Calling the unusual spellings mistakes instead of poetic licence.\n3. Mixing up the hyena (grins) and the crocodile (weeps).\n4. Saying the chameleon attacks.\n5. Describing the tests without explaining why they are funny.\n\n**Remember:** read the poem in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *How to Tell Wild Animals*?', 'Carolyn Wells (1862–1942), American writer of humorous verse.', 'fact', 1],
  ['What does the poem pretend to be?', 'A practical guide to recognising dangerous animals.', 'concept', 1],
  ['The lion\'s test (stanza 1)', 'A huge yellowish-brown animal roars over you as you lie dying.', 'concept', 1],
  ['The tiger\'s test (stanza 2)', 'Observe whether the striped animal makes a meal of you.', 'concept', 1],
  ['The leopard\'s test (stanza 3)', 'A spotted animal springs on you, and keeps springing.', 'concept', 1],
  ['The bear\'s test (stanza 4)', 'A crushing hug, repeated if you doubt: called a caress.', 'concept', 1],
  ['Hyena or crocodile? (stanza 5)', 'The grinning one is the hyena; the weeping one, the crocodile.', 'concept', 1],
  ['The chameleon\'s test (stanza 6)', 'The branch looks empty: perfect camouflage.', 'concept', 1],
  ['Central joke', 'Each animal is identified only when it is already attacking: too late to help.', 'concept', 2],
  ['Main purpose of the poem', 'To entertain, through absurd tests and playful language.', 'concept', 2],
  ['Serious reminder under the fun', 'Wild animals are powerful; close encounters can be fatal.', 'concept', 2],
  ['What does the poem parody?', 'Guidebooks that promise more than they deliver.', 'concept', 2],
  ['Number of stanzas and lines', 'Six stanzas of six lines (36 lines).', 'fact', 3],
  ['Rhyme scheme', 'ababcc in every stanza.', 'fact', 3],
  ['Role of the final couplet', 'It delivers the punchline of each stanza.', 'concept', 3],
  ['Poetic licence in the lion stanza', 'A word for dying clipped with an apostrophe to rhyme with lion.', 'concept', 3],
  ['Poetic licence in the leopard stanza', 'The verb for jumping respelt to echo the start of leopard.', 'concept', 3],
  ['Verbal irony in the poem', 'The bear\'s deadly hug called a caress.', 'concept', 3],
  ['Idiom taken literally', 'Crocodile tears: the crocodile is known by its weeping.', 'concept', 3],
  ['Why does the hyena grin?', 'The spotted hyena\'s call sounds like laughter.', 'concept', 3],
  ['Tone', 'Light-hearted, mock-serious, ironic.', 'concept', 3],
  ['*tawny*', 'yellowish-brown', 'definition', 4],
  ['*discern*', 'make out; recognise', 'definition', 4],
  ['*novice*', 'a beginner', 'definition', 4],
  ['*nonplus*', 'puzzle; confuse', 'definition', 4],
  ['Plan for a 40–50 word answer', 'Point + animal and test in own words + why it is funny.', 'exam-tip', 4],
  ['Most common slip', 'Calling the misspellings errors instead of poetic licence.', 'exam-tip', 4],
  ['Should you quote the poem in answers?', 'No. Describe the tests in your own words; name devices and what they do.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — How to Tell Wild Animals',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)', items: ['src_guidebook'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_humour', 'sa_bear', 'sa_chameleon', 'sa_spelling'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_humour', 'la_poetic_licence'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — How to Tell Wild Animals',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_big_cats', 'src_leopard_bear'] }, { attempt: 1, keys: ['src_croc', 'src_chameleon'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_animals', 'sb_caress', 'sb_couplet', 'sb_crocodile_tears'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_lion_tiger', 'sa_leopard', 'sa_croc_hyena', 'sa_tone', 'sa_title'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_guide', 'la_safety'] }, { attempt: 1, keys: ['la_tone_language', 'la_favourite'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 only; no removed topics for 2026-27',
    literature_rule: 'no line or phrase of the poem reproduced (only the title, the animals\' names and single words: tawny, discern, peppered, caress, novice, nonplus); each stanza\'s test described in SOYL words; the respelt words described, not quoted; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem',
    accuracy: 'form facts checked (6 stanzas of 6 lines, ababcc); animals in order; hyena grins, crocodile weeps; chameleon harmless',
    re_solve: 'author verifier pass: every item re-answered from its stem',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
