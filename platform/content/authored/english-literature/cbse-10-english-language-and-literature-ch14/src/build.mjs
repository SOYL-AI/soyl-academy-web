// Build CBSE 10 English Language and Literature ch14 "Fire and Ice". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch14/src/build.mjs
// LITERATURE RULE: the poem (nine lines) is never quoted or paraphrased line by line; only single words
// and the title appear. Students read the poem in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch14', 'english-literature');
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
    ['Poet', 'Robert Frost (1874–1963), American poet'],
    ['Known for', 'poems of New England country life, in plain everyday language with deeper meanings'],
    ['Honours', 'Pulitzer Prize for Poetry, four times'],
    ['Also in your book', '*Dust of Snow* (Chapter 13)'],
    ['This poem', 'collected in *New Hampshire* (1923)'],
  ],
  'Table of facts about Robert Frost: American poet, 1874 to 1963, known for New England poems in plain language, four-time Pulitzer Prize winner, also the poet of Dust of Snow; Fire and Ice appears in New Hampshire, 1923.',
);
const vGlance = table(
  ['Feature', 'Fire and Ice'],
  [
    ['Length', '9 lines in a single stanza'],
    ['Rhyme scheme', 'aba abc bcb: only three rhyme sounds'],
    ['Line lengths', 'mostly moderate; three very short lines, including the last two'],
    ['Speaker', 'first person, judging from his own experience'],
    ['Subject', 'how everything might finally be destroyed: by heat or by cold'],
    ['Tone', 'calm, casual, ironic'],
  ],
  'Table of the poem at a glance: nine lines in one stanza, rhyme scheme a b a, a b c, b c b with three rhyme sounds, three very short lines including the last two, a first-person speaker, the subject of final destruction by heat or cold, and a calm, ironic tone.',
);
const vSymbols = table(
  ['Symbol', 'Stands for', 'Shared qualities', 'How it destroys'],
  [
    ['Fire', 'desire: greed, lust, ambition, craving', 'hot, fast, spreading, never satisfied', 'consumes everything it reaches; wars over land, wealth, power'],
    ['Ice', 'hatred: coldness, indifference, rigidity', 'cold, hard, slow, numbing', 'freezes sympathy; cracks families, communities, nations'],
  ],
  'Table of the two symbols: fire stands for desire, sharing heat, speed and endless hunger, and destroys by consuming; ice stands for hatred, sharing coldness, hardness and slowness, and destroys by freezing sympathy and cracking relationships.',
);
const vArgument = flow('LR', ['Two popular views: heat or cold', 'His experience with desire', 'Sides with fire', 'Imagines a second destruction', 'His knowledge of hatred', 'Ice would be just as effective'], 'Flow of the speaker’s argument: two popular views, his experience with desire, he sides with fire, he imagines a second destruction, his knowledge of hatred, and his conclusion that ice would be just as effective.', 'The speaker\'s argument (SOYL summary).');
const vDevices = table(
  ['Device', 'Where in the poem (described)', 'A SOYL example of the device'],
  [
    ['Symbolism', 'fire for desire; ice for hatred', 'The *locked gate* stood for every chance he had missed.'],
    ['Metaphor', 'desire described as something tasted', 'She had sampled fame and could not stop wanting more.'],
    ['Contrast (antithesis)', 'hot against cold, fast against slow', 'His anger was a storm; her silence was a frozen lake.'],
    ['Understatement', 'a mild last word for total destruction', 'After the cyclone flattened the town, he said the weather had been a little rough.'],
    ['Irony', 'a calm voice on a terrifying subject', 'The pilot announced the engine fire as if reading the lunch menu.'],
    ['Rhyme', 'aba abc bcb, three interlocking sounds', 'night / rain / light / sight / plain …'],
  ],
  'Table of poetic devices in the poem, described, each with a SOYL example: symbolism, metaphor, contrast, understatement, irony and an interlocking rhyme scheme.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['desire', 'strong wanting; craving; greed'],
    ['hate', 'intense dislike; hatred'],
    ['perish', 'die; be destroyed'],
    ['destruction', 'complete ruin'],
    ['suffice', 'be enough (not "suffer")'],
  ],
  'Table of word meanings: desire, hate, perish, destruction and suffice.',
  'Single words from the poem with their meanings.',
);
const vShortPlan = flow('LR', ['Key word of the question', 'Point in one sentence', 'Symbol and its meaning', 'Effect or message'], 'Flow for a forty to fifty word answer: find the key word, state the point, explain the symbol and its meaning, add the effect or message.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Fire and Ice — Robert Frost',
  goals: [
    'Explain the central idea of the poem in your own words',
    'Explain the symbolism of fire (desire) and ice (hatred)',
    'Identify symbolism, irony and understatement and say what they do',
    'Describe the poem\'s form and rhyme scheme',
    'Answer extract-based and 40–50 word questions on the poem',
  ],
  slides: [
    sl('title', 'Fire and Ice — Robert Frost', {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today’s poem is Fire and Ice by Robert Frost, the poet of Dust of Snow. It is only nine lines long, so please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will understand its argument, its two great symbols, its calm and ironic tone, and how to answer board questions on it.',
    }),
    sl('concept', 'How to read a very short poem', {
      bl: [
        'Read it aloud twice from *First Flight*; notice where the lines become short.',
        'Ask: what question does the poem raise? what answer does the speaker give, and why?',
        'Then ask: what might fire and ice stand for?',
        'In answers, explain in your own words; never copy lines.',
      ],
      n: 'A nine line poem can carry a big idea, so read slowly. First read it aloud twice and notice where the lines suddenly become short. Then ask what question the poem raises, and what answer the speaker gives. Finally ask what fire and ice might stand for. In the exam, explain in your own words. Copying lines does not earn marks.',
    }),
    sl('concept', 'The poet: Robert Frost', {
      v: vPoet,
      n: 'You met Robert Frost in Dust of Snow. He was an American poet who lived from eighteen seventy-four to nineteen sixty-three, and he wrote about country life in New England in plain language that hides deep ideas. He won the Pulitzer Prize for Poetry four times. Fire and Ice was collected in his book New Hampshire, published in nineteen twenty-three.',
    }),
    sl('concept', 'The poem at a glance', {
      v: vGlance,
      n: 'Here is the poem at a glance. Nine lines, one stanza. The rhyme scheme is a b a, a b c, b c b, so only three rhyme sounds weave through it. Most lines are of moderate length, but three are very short, including the last two. The speaker talks in the first person. The subject is enormous: how everything might finally be destroyed. Yet the tone is calm.',
    }),
    sl('concept', 'The opening: an old question', {
      b: 'In SOYL\'s words: the poem begins with a debate people have had for centuries. Will everything finally be destroyed by burning heat, or by freezing cold? Both answers are mentioned straight away.',
      n: 'The poem opens with an old debate. People have long wondered whether everything will finally be destroyed by burning heat or by freezing cold. Religious stories and scientific theories have offered both answers. Frost mentions the two opinions straight away, briefly, as if they were familiar to everyone. But he is about to give the question a very personal twist.',
    }),
    sl('concept', 'The speaker\'s first choice: fire', {
      b: 'In SOYL\'s words: the speaker weighs the two opinions against his own life. He has known desire, and that knowledge makes him side with the people who expect fire.',
      n: 'Next the speaker judges the debate by his own experience. He describes desire as something he has tasted, as if he has sampled it like food. What he has learnt about desire makes him side with the people expecting a fiery end. Notice the move: a question about the earth has become a question about the human heart.',
    }),
    sl('check', 'Check: what does fire stand for?', {
      chk: 'mc_fire_symbol',
      n: 'Your turn. The speaker links fire with something he has known in his own life. What does fire stand for in this poem? Choose the best answer.',
    }),
    sl('concept', 'The second ending: ice', {
      b: 'In SOYL\'s words: the speaker then imagines everything being destroyed a second time. His knowledge of hatred convinces him that ice would do that job just as well. He closes with a mild word meaning only that ice would be enough.',
      n: 'Then the speaker imagines a second destruction. If everything had to be destroyed again, he says in effect, he has seen so much hatred that he knows ice would work equally well. Ice stands for hatred. And he ends with a very mild word, one that simply means be enough. Hold on to that word; it is the key to the tone.',
    }),
    sl('diagram', 'The speaker\'s argument', {
      v: vArgument,
      n: 'Here is the whole argument as a flow. Two popular views, heat or cold. The speaker recalls desire and sides with fire. Then he imagines a second destruction, recalls hatred, and concludes that ice would be just as effective. If you can explain these six steps in your own words, you can answer almost any question on the poem.',
    }),
    sl('concept', 'Symbols: fire and ice', {
      b: 'Fire and ice begin as physical forces and become symbols of two human emotions.',
      v: vSymbols,
      n: 'Why fire for desire? Fire is hot and fast, it spreads to everything near it, and it is never satisfied. Greed, lust and ambition behave the same way. Why ice for hatred? Ice, by contrast, feels cold, hard and slow. It numbs and cracks. Hatred freezes sympathy and slowly breaks families and nations apart. Two opposite forces, one result: destruction.',
    }),
    sl('two-column', 'Fire versus ice', {
      cols: [
        '**Fire: desire**\n\n- hot, quick, fierce\n- greed for money, land, power\n- grows the more it is fed\n- destroys by consuming',
        '**Ice: hatred**\n\n- cold, slow, silent\n- grudges, prejudice, indifference\n- hardens over time\n- destroys by freezing and cracking',
      ],
      n: 'Set the two side by side. Fire is hot, quick and fierce, like greed for money, land or power, which grows the more it is fed. Ice, by contrast, feels cold, slow and silent, like grudges, prejudice and indifference, which harden over time. They work in opposite ways, yet the speaker treats them as equally dangerous. That is the heart of the poem.',
    }),
    sl('check', 'Check: assertion and reason', {
      chk: 'ar_symbol',
      n: 'Check yourself with an assertion and reason. Both statements may be true, but does the second really explain the first? Think about what actually convinces the speaker that ice could destroy everything.',
    }),
    sl('concept', 'Themes and message', {
      bl: [
        '**Human emotions are the real danger:** desire and hatred, not comets or frozen ages.',
        '**Opposites can destroy equally:** hot desire and cold hatred lead to the same end.',
        '**Experience as evidence:** the speaker trusts what he has felt.',
        '**A warning, not a sermon:** the poem lets readers draw their own conclusion.',
      ],
      n: 'The themes follow. Human emotions are the real danger, not natural disasters. Opposite feelings, hot desire and cold hatred, can destroy equally. The speaker trusts his own experience as evidence. And the poem is a warning, not a sermon; it lets us draw the conclusion. In answers, state a theme and support it with the symbols.',
    }),
    sl('concept', 'Poetic devices, with SOYL\'s own examples', {
      b: 'Each device is described in the poem and illustrated with a SOYL sentence, not with the poem\'s lines.',
      v: vDevices,
      n: 'Now the devices. Symbolism, in fire and ice. A metaphor, as desire is something tasted. Contrast, hot against cold. Understatement, a mild word for total destruction. Irony, a calm voice on a terrifying subject. And an interlocking rhyme scheme. The examples in the right column are our own sentences, written to show each device.',
    }),
    sl('example', 'Understatement and irony at the close', {
      b: 'The poem ends with a modest word meaning *be enough*, applied to the destruction of everything. Read the ending aloud in *First Flight* and notice how flat and quiet it sounds.',
      bl: [
        '**What is said:** ice would be enough.',
        '**What is meant:** hatred could wipe out everything.',
        '**The gap:** a tiny word for a vast catastrophe is understatement; the mismatch creates irony.',
        '**Effect:** the ending sounds calm, and that calm is chilling.',
      ],
      n: 'Here is a worked point you can use in answers. The poem ends with a modest word that simply means be enough, applied to the destruction of everything. What is said is small; what is meant is huge. That gap is understatement, and the mismatch creates irony. The calm makes the ending chilling, as if the speaker had already accepted the danger.',
    }),
    sl('concept', 'Tone', {
      b: 'Calm, casual and conversational, almost like a person giving an opinion over tea. The subject is catastrophe; the voice never rises. That mismatch is the source of the poem\'s irony and its chill.',
      n: 'Listen to the tone. The speaker sounds calm and casual, almost like someone giving an opinion over a cup of tea. Yet the subject is the end of everything. His voice never rises. That mismatch between a gentle voice and a terrible subject is the source of the irony, and it is why the poem feels so chilling.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'A few words to know. Desire, strong wanting or craving. Hate, intense dislike. Perish, to die or be destroyed. Destruction, complete ruin. And suffice, to be enough. Students often confuse suffice with suffer, so learn it well. It is the most important word in the poem for questions on tone.',
    }),
    sl('check', 'Check: the rhyme scheme', {
      chk: 'fb_scheme',
      n: 'Quick check. Write the rhyme scheme of the poem using letters. Look in your textbook at which line endings share a sound. There are only three sounds in all.',
    }),
    sl('example', 'Worked example: a 40–50 word answer', {
      b: '*Question:* Why does the speaker believe that both fire and ice could destroy everything?',
      v: vShortPlan,
      bl: [
        '**Point:** both forces stand for powerful human emotions.',
        '**Symbols:** fire is desire, which consumes; ice stands for hatred, which freezes and divides.',
        '**Support:** he judges from his own experience of both feelings.',
        '**Model (47 words):** *The speaker treats fire and ice as symbols. Fire is desire, which consumes everything and is never satisfied; ice represents hatred, which freezes sympathy and breaks people apart. Having known both feelings himself, he believes either emotion, left unchecked, could bring about total destruction.*',
      ],
      n: 'Here is how to build a three mark answer. Find the key word: both. State the point: the forces stand for emotions. Explain each symbol: fire is desire, ice stands for hatred. Add support: his own experience. The model is forty-seven words, inside the limit, and it does not copy a single line of the poem.',
    }),
    sl('check', 'Check: the last word', {
      chk: 'mc_suffice',
      n: 'One more. The poem’s final word is suffice. What does it mean? It tells you how calmly the speaker sums up the power of hatred.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Opening: two old views, destruction by heat or by cold.',
        'Fire = desire; the speaker\'s experience makes him side with it.',
        'Ice = hatred; it would be just as effective a second time.',
        'Form: 9 lines, one stanza, aba abc bcb; short final lines; understatement and irony.',
        'Message: uncontrolled human emotions are the real threat. Read the poem in *First Flight*.',
      ],
      v: vArgument,
      n: 'Let us sum up. The poem opens with two old views, heat or cold. Fire stands for desire, and the speaker’s experience makes him side with it. Ice stands for hatred, which would be just as effective. Nine lines, one stanza, three rhyme sounds, and a mild final word that creates understatement and irony. The message: our own emotions are the real threat.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never write out the poem\'s lines; explain the idea in your own words.',
        'Always give the symbolic meaning: fire = desire, ice = hatred.',
        'Name devices **and** say what they do: *the mild last word understates total destruction, creating irony*.',
        '40–50 word answers: point + symbol + effect or message.',
        'Common slips: reading the poem only literally; saying the speaker rejects fire; *suffice* as "suffer".',
      ],
      n: 'Exam tips. Never write out the lines; explain in your own words. Always give the symbolic meaning, fire for desire and ice for hatred. When you name a device, say what it does. Keep three mark answers to point, symbol and effect. And avoid the common slips: the poem is not only literal, the speaker does not reject fire, and suffice does not mean suffer.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Fire and Ice — study notes',
  sections: [
    {
      h: '1. The poet and the poem',
      t: 1,
      b: `${READ}\n\n**Robert Frost** (1874–1963) was an American poet who wrote about country life in New England in plain, everyday language with deeper meanings. He won the Pulitzer Prize for Poetry four times. *Fire and Ice* is a short lyric collected in *New Hampshire* (1923); his *Dust of Snow* is Chapter 13 of your book.`,
      v: vPoet,
    },
    {
      h: '2. What the poem says (SOYL summary)',
      t: 1,
      b: '**The opening:** the poem begins with an old debate: will everything finally be destroyed by burning heat or by freezing cold?\n\n**The first choice:** judging from his own experience with desire, the speaker sides with the people who expect fire.\n\n**The second ending:** he then imagines a second destruction and, from what he knows of hatred, concludes that ice would be just as effective. He ends with a mild word meaning *be enough*.\n\nThe poem is spoken in the first person and moves from a cosmic question to the human heart.',
      v: vArgument,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Human emotions are the real danger:** desire and hatred, left unchecked, can destroy individuals and civilisations.\n- **Opposites can destroy equally:** hot, fast desire and cold, slow hatred lead to the same end.\n- **Experience as evidence:** the speaker trusts what he has felt, not what experts say.\n- **A warning, not a sermon:** the poem offers no cure; the reader draws the conclusion.',
    },
    {
      h: '4. Symbols, devices and form',
      t: 3,
      b: '**Fire:** desire (greed, lust, ambition, craving): hot, spreading, never satisfied. **Ice:** hatred (coldness, indifference, rigidity): cold, slow, numbing, cracking.\n\n**Devices:** symbolism; metaphor (desire as something tasted); contrast or antithesis (hot vs cold); understatement (a mild last word for total destruction); irony (a calm voice on a terrifying subject).\n\n**Form:** nine lines in a single stanza; rhyme scheme aba abc bcb (three interlocking sounds); mostly moderate lines with three very short ones, including the last two, which slow the ending.',
      vs: [vSymbols, vDevices],
      terms: [
        ['Symbol', 'An object that stands for an idea (fire for desire).'],
        ['Understatement', 'Saying something deliberately less strongly than the facts deserve.'],
        ['Irony', 'A gap between what is said and what is meant, or between tone and subject.'],
      ],
    },
    {
      h: '5. Tone',
      t: 3,
      b: 'Calm, casual and conversational. The speaker discusses the end of everything as if giving an everyday opinion. The mismatch between the gentle voice and the terrible subject creates irony, and the mild final word makes the ending chilling rather than dramatic.',
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the poem with their meanings. *Suffice* (be enough) is often confused with *suffer*.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints the poem\'s lines; SOYL practice uses commentary passages instead. Expect questions on meaning, symbols, tone, devices and the rhyme scheme.\n\n**Short answers (3 marks, 40–50 words):** point + symbol and its meaning + effect or message.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.',
      v: vShortPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Explaining fire and ice only literally, without desire and hatred.\n3. Saying the speaker rejects fire and chooses ice.\n4. Reading *suffice* as *suffer*.\n5. Naming understatement or irony without saying what it does.\n\n**Remember:** read the poem in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Fire and Ice*?', 'Robert Frost (1874–1963), American poet.', 'fact', 1],
  ['Two facts about Robert Frost', 'Wrote about rural New England; won the Pulitzer Prize for Poetry four times.', 'fact', 1],
  ['Which other Frost poem is in *First Flight*?', '*Dust of Snow* (Chapter 13).', 'fact', 1],
  ['What debate does the poem begin with?', 'Whether everything will finally be destroyed by heat or by cold.', 'concept', 1],
  ['Which ending does the speaker support first?', 'Fire, because of his own experience with desire.', 'concept', 1],
  ['What does he say about ice?', 'If everything had to be destroyed again, ice (hatred) would be just as effective.', 'concept', 1],
  ['Person of the poem', 'First person: the speaker judges from his own experience.', 'fact', 1],
  ['Central idea', 'Uncontrolled human emotions, desire and hatred, can destroy humanity.', 'concept', 2],
  ['What does fire symbolise?', 'Desire: greed, lust, ambition, craving.', 'concept', 2],
  ['What does ice symbolise?', 'Hatred: coldness, indifference, rigidity.', 'concept', 2],
  ['Why is fire a good symbol for desire?', 'Both are hot, spread fast and are never satisfied.', 'concept', 2],
  ['Why is ice a good symbol of hatred?', 'Both are cold, slow and hard; they numb and crack.', 'concept', 2],
  ['Is the poem a sermon?', 'No: it warns without preaching and lets readers draw the conclusion.', 'concept', 2],
  ['Number of lines and stanzas', 'Nine lines; one stanza.', 'fact', 3],
  ['Rhyme scheme', 'aba abc bcb (three rhyme sounds).', 'fact', 3],
  ['Line lengths', 'Mostly moderate; three very short, including the last two.', 'fact', 3],
  ['Effect of the short final lines', 'They slow the reader and make the closing judgment land quietly but firmly.', 'concept', 3],
  ['Understatement in the poem', 'A mild last word (be enough) for total destruction.', 'concept', 3],
  ['Irony in the poem', 'A calm, casual voice on the most terrifying subject.', 'concept', 3],
  ['Metaphor in the poem', 'Desire described as something tasted, as if sampled like food.', 'concept', 3],
  ['Contrast in the poem', 'Hot, fast fire against cold, slow ice: opposites with one result.', 'concept', 3],
  ['Tone', 'Calm, casual, conversational and ironic.', 'concept', 3],
  ['*suffice*', 'be enough (not "suffer")', 'definition', 4],
  ['*perish*', 'die; be destroyed', 'definition', 4],
  ['*desire*', 'strong wanting; craving', 'definition', 4],
  ['Plan for a 40–50 word answer', 'Point + symbol and meaning + effect or message.', 'exam-tip', 4],
  ['Most common slip about the poem', 'Explaining fire and ice only literally, without desire and hatred.', 'exam-tip', 4],
  ['Should you quote the poem in answers?', 'No. Explain in your own words; name devices and what they do.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Fire and Ice',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)', items: ['src_views'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_fire_symbol', 'sa_ice_symbol', 'sa_understatement', 'sa_rhyme_form'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_emotions_destroy', 'la_symbols'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Fire and Ice',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_fire', 'src_ice'] }, { attempt: 1, keys: ['src_form', 'src_tone'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_two_ends', 'sb_desire_examples', 'sb_hate_examples', 'sb_suffice'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_why_fire_first', 'sa_tasted', 'sa_tone', 'sa_title', 'sa_message'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_speech', 'la_relevance'] }, { attempt: 1, keys: ['la_article', 'la_style'] }] },
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
    literature_rule: 'no line or phrase of the poem reproduced (only the title and single words: fire, ice, desire, hate, perish, destruction, suffice); summary in SOYL words; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem',
    accuracy: 'form facts checked (9 lines, 1 stanza, aba abc bcb, three short lines including the last two); symbolism fire = desire, ice = hatred',
    re_solve: 'author verifier pass: every item re-answered from its stem',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
