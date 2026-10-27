// Build CBSE 10 English Language and Literature ch15 "A Tiger in the Zoo". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch15/src/build.mjs
// LITERATURE RULE: the poem (in copyright) is never quoted or paraphrased line by line; only single words
// and the title appear. Students read the poem in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch15', 'english-literature');
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
    ['Poet', 'Leslie Norris (1921–2006)'],
    ['From', 'Wales (United Kingdom)'],
    ['Wrote', 'poems and short stories'],
    ['Often writes about', 'animals and the natural world, with close, sympathetic attention'],
  ],
  'Table of facts about Leslie Norris: a Welsh poet, 1921 to 2006, who wrote poems and short stories, often about animals and nature.',
);
const vGlance = table(
  ['Feature', 'A Tiger in the Zoo'],
  [
    ['Length', '5 stanzas of 4 lines (quatrains)'],
    ['Rhyme', 'loose: in most stanzas lines 2 and 4 rhyme or nearly rhyme'],
    ['Speaker', 'an observer describing the tiger (third person)'],
    ['Setting', 'a zoo enclosure; imagined forest scenes; the zoo after dark'],
    ['Structure', 'cage → wild → wild → cage → night'],
    ['Tone', 'sympathetic: sad, then vivid, then wistful'],
  ],
  'Table of the poem at a glance: five quatrains, loose rhyme mainly in lines two and four, a third-person observer, settings of the zoo, the imagined forest and the zoo after dark, a structure of cage, wild, wild, cage, night, and a sympathetic tone.',
);
const vStructure = flow('LR', ['Stanza 1: pacing in the enclosure', 'Stanza 2: hunting unseen near water', 'Stanza 3: feared at the forest edge', 'Stanza 4: shut in, ignoring the crowds', 'Stanza 5: after dark, gazing at the stars'], 'Flow of the poem’s five stanzas: pacing in the enclosure, hunting unseen near water, feared at the forest edge, shut in and ignoring the crowds, and after dark gazing at the stars.', 'The poem stanza by stanza (SOYL summary).');
const vContrast = table(
  ['', 'In the zoo (stanzas 1, 4)', 'In the wild (stanzas 2, 3)'],
  [
    ['Space', 'a few strides from wall to wall', 'forest, water, the edge of villages'],
    ['Movement', 'pacing to and fro', 'hiding, gliding, prowling'],
    ['Strength', 'held back, wasted', 'used to hunt and to frighten'],
    ['People', 'crowds who stare; he ignores them', 'villagers who fear him'],
    ['Feeling', 'silent fury, frustration', 'confidence, power'],
  ],
  'Table contrasting the tiger in the zoo, with little space, pacing, wasted strength, staring crowds and silent fury, against the tiger in the wild, with forest and water, hiding and prowling, strength used to hunt, villagers who fear him, and confidence.',
);
const vDevices = table(
  ['Device', 'Where in the poem (described)', 'A SOYL example of the device'],
  [
    ['Oxymoron', 'a word for silence paired with a word for fury (stanza 1)', 'The prisoner sat in loud stillness.'],
    ['Alliteration', 'repeated s sounds in stanza 1', 'Six slim snakes slid silently south.'],
    ['Metaphor', 'the paws compared to a soft, rich fabric', 'Her voice was honey after a long day.'],
    ['Contrast', 'cage stanzas around wild stanzas', 'The bird sang of skies it could only see through wire.'],
    ['Repetition', 'one shining adjective for the eyes and the stars', 'A cold wind, a cold room, a cold welcome.'],
    ['Imagery', 'sight (markings, eyes, stars) and sound (night voices, vehicles)', 'Lanterns bobbing; a dog barking far away.'],
  ],
  'Table of poetic devices in the poem, described, each with a SOYL example: oxymoron, alliteration, metaphor, contrast, repetition and imagery.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['stalks', 'walks with stiff, angry strides (also: follows prey stealthily)'],
    ['lurking', 'waiting hidden, ready to attack'],
    ['snarling', 'growling with bared teeth'],
    ['fangs', 'long, sharp teeth'],
    ['terrorising', 'filling with fear'],
    ['patrolling', 'going round an area to guard it'],
  ],
  'Table of word meanings: stalks, lurking, snarling, fangs, terrorising and patrolling.',
  'Single words from the poem with their meanings.',
);
const vShortPlan = flow('LR', ['Key word of the question', 'Point in one sentence', 'Zoo or wild in your own words', 'Device or feeling that supports it'], 'Flow for a forty to fifty word answer: find the key word, state the point, describe the zoo or the wild in your own words, add a supporting device or feeling.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'A Tiger in the Zoo — Leslie Norris',
  goals: [
    'Explain the central idea of the poem stanza by stanza, in your own words',
    'Contrast the tiger\'s life in the zoo with his life in the wild',
    'Identify imagery, alliteration, oxymoron and contrast and say what they do',
    'Explain the significance of the final stanza',
    'Answer extract-based and 40–50 word questions on the poem',
  ],
  slides: [
    sl('title', 'A Tiger in the Zoo — Leslie Norris', {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today’s poem is A Tiger in the Zoo by Leslie Norris. It is twenty short lines, so please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will follow the tiger from his enclosure to the forest he ought to be in and back again, and learn how to answer board questions on the poem.',
    }),
    sl('concept', 'How to read this poem', {
      bl: [
        'Read it aloud twice from *First Flight*.',
        'For each stanza ask: is the tiger in the zoo, or in the wild?',
        'Notice the sounds in the first stanza and the light in the final.',
        'In answers, explain in your own words; never copy lines.',
      ],
      n: 'Here is a simple way in. Read the poem aloud twice. Then for each stanza ask one question: is the tiger in the zoo here, or in the wild? Notice the sounds of the first stanza and the light in the final. When you answer in the exam, explain in your own words. Copying lines does not earn marks.',
    }),
    sl('concept', 'The poet: Leslie Norris', {
      v: vPoet,
      n: 'Leslie Norris was a Welsh poet and short-story writer who lived from nineteen twenty-one to two thousand and six. His work often looks closely, and kindly, at animals and the natural world. In this poem he does not lecture us about zoos. He simply watches a tiger, imagines its true life, and lets us feel the difference.',
    }),
    sl('concept', 'The poem at a glance', {
      v: vGlance,
      n: 'Here is the poem at a glance. Five stanzas of four lines. The rhyme is loose; in most stanzas the second and fourth lines rhyme or nearly rhyme. An observer describes the tiger. The settings move from the enclosure to imagined forest scenes and back to the zoo after dark. Remember the shape: cage, wild, wild, cage, night.',
    }),
    sl('concept', 'Stanza 1: the enclosure', {
      b: 'In SOYL\'s words: the tiger walks up and down a space so small that a few strides cross it. His bold markings are on show, his paws make no sound, and beneath the silence he is furious.',
      n: 'The poem opens in the enclosure. The tiger walks to and fro in a space so small that a few strides take him from wall to wall. His striking markings are on display. His paws fall silently. But he is not calm. Beneath the silence there is fury, an anger he has no way of acting on.',
    }),
    sl('concept', 'Stanzas 2 and 3: the life he should have', {
      b: 'In SOYL\'s words: twice the poet insists on what the tiger ought to be doing. He ought to be a hidden hunter, waiting unseen near water for deer. He ought to be prowling at the forest\'s edge near villages, showing teeth and claws, feared by the people who live there.',
      n: 'Now the poet imagines. Twice he insists on what the tiger ought to be doing. First, hunting: hidden, silent and patient near water where deer come. Second, prowling at the edge of the forest near villages, baring teeth and claws and filling people with fear. These pictures are alive with energy, the opposite of the enclosure.',
    }),
    sl('check', 'Check: what do the middle stanzas show?', {
      chk: 'mc_wild_place',
      n: 'Your turn. In the middle stanzas the poet imagines the tiger somewhere else. Where does he picture the tiger hunting? Choose the best answer.',
    }),
    sl('concept', 'Stanza 4: back to the cage', {
      b: 'In SOYL\'s words: a single word of contrast returns us to reality. The tiger is shut in a bare, hard enclosure; his power is held back by iron. He paces again and takes no notice of the people who come to stare.',
      n: 'Then one word of contrast snaps us back to reality. The tiger is shut in a bare, hard enclosure. All that power, so useful in the wild, is held back by iron. He paces again. And he takes no notice of the visitors. That indifference is not dullness; it is dignity. He will not perform for those who keep him.',
    }),
    sl('concept', 'Stanza 5: after dark', {
      b: 'In SOYL\'s words: after dark the tiger listens to the final human sounds of the day and the vehicles that guard the grounds. Then he gazes up at the stars. One shining adjective describes both his eyes and the stars.',
      n: 'The final stanza is set after dark. The crowds have gone. The tiger listens to the final human sounds of the day and the vehicles that guard the zoo. Then he gazes up at the stars. The poet uses the same shining word for the tiger’s eyes and for the stars, linking the prisoner with the freest things in the sky.',
    }),
    sl('diagram', 'The poem stanza by stanza', {
      v: vStructure,
      n: 'Here is the whole poem as a flow. Pacing in the enclosure. Hunting near water. Feared at the forest edge. Shut in again, ignoring the crowds. And after dark, gazing at the stars. Notice that the two wild stanzas sit between the two cage stanzas, just as the tiger’s memory of freedom is surrounded by walls.',
    }),
    sl('two-column', 'Zoo versus wild', {
      cols: [
        '**In the zoo**\n\n- a few strides of space\n- pacing to and fro\n- strength held back\n- crowds stare; he ignores them\n- silent fury',
        '**In the wild**\n\n- forest, water, villages\n- hiding, gliding, prowling\n- strength used to hunt\n- villagers fear him\n- confidence and power',
      ],
      v: vContrast,
      n: 'Set the two lives side by side. In the zoo: a few strides of space, endless pacing, wasted strength, staring crowds and silent fury. In the wild: forest and water, hiding and prowling, strength used to hunt, villagers who fear him, and confidence. This contrast is the poem’s whole argument, and it is the answer to most board questions.',
    }),
    sl('check', 'Check: assertion and reason', {
      chk: 'ar_ignore',
      n: 'Check yourself with an assertion and reason. Both statements may be true, but does the second really explain the first? Think about why the tiger takes no notice of the visitors.',
    }),
    sl('concept', 'Themes and message', {
      bl: [
        '**Captivity versus freedom:** the cage wastes everything the tiger is.',
        '**Dignity:** the tiger refuses to perform for his captors.',
        '**Longing:** the stars stand for the life he has lost.',
        '**A question for readers:** is it right to cage wild animals for display?',
      ],
      n: 'The themes follow. Captivity versus freedom: the cage wastes everything the tiger is. Dignity: he refuses to perform. Longing: the stars stand for his lost life. And a question for readers: is it right to cage wild animals for our entertainment? The poet never answers it directly. The contrast does the arguing.',
    }),
    sl('concept', 'Poetic devices, with SOYL\'s own examples', {
      b: 'Each device is described in the poem and illustrated with a SOYL sentence, not with the poem\'s lines.',
      v: vDevices,
      n: 'Now the devices. An oxymoron pairs a word for silence with a word for fury. Alliteration repeats s sounds in the first stanza. A metaphor compares the paws to soft, rich fabric. Contrast sets cage against wild. Repetition uses one shining word for eyes and stars. And imagery appeals to sight and sound. The examples on the right are our own.',
    }),
    sl('example', 'Worked point: the silent fury', {
      b: 'In the first stanza the poet joins a word meaning silence to a word meaning fury. Find the pair in *First Flight*.',
      bl: [
        '**Device:** oxymoron, two opposite ideas side by side.',
        '**What it shows:** the tiger is furious but cannot act on it.',
        '**Why silent:** no prey, no forest, no escape; the anger has no outlet.',
        '**Link:** the pacing is the only sign of the fury inside.',
      ],
      n: 'Here is a worked point. In the first stanza the poet joins a word for silence to a word for fury. That is an oxymoron. It shows that the tiger is furious but cannot act on his anger: there is no prey, no forest and no escape. So the fury stays silent, and the only outward sign of it is the restless pacing.',
    }),
    sl('concept', 'Imagery and sound', {
      bl: [
        '**Sight:** bold markings; teeth and claws; shining eyes; stars.',
        '**Sound:** silence of the paws; the hissing s sounds; night voices and vehicles.',
        '**Movement:** pacing in the cage versus gliding and prowling in the wild.',
      ],
      n: 'The poem works through the senses. We see bold markings, teeth and claws, shining eyes and stars. We hear the silence of the paws, the hissing s sounds, and after dark the voices and vehicles of the zoo. And we feel movement: pacing in the cage, but gliding and prowling in the wild. Use these details, in your own words, in answers.',
    }),
    sl('concept', 'Tone', {
      b: 'Sympathetic throughout. Sad and restrained in the cage stanzas; vivid and energetic in the wild stanzas; quiet, lonely and wistful in the final stanza.',
      n: 'Listen to the tone. The poet is sympathetic from start to finish. In the cage stanzas the tone is sad and restrained. In the wild stanzas it becomes vivid and energetic, celebrating the tiger’s power. And in the final stanza it turns quiet, lonely and wistful. The poem ends not with anger but with longing, which makes it more moving.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'A few words to know. Stalks, walks with stiff, angry strides. Lurking, waiting hidden, ready to attack. Snarling, growling with bared teeth. Fangs, long, sharp teeth. Terrorising, filling with fear. And patrolling, going round an area to guard it. These single words carry much of the poem’s energy.',
    }),
    sl('check', 'Check: the device', {
      chk: 'fb_oxymoron',
      n: 'Quick check. What do we call two words of opposite meaning placed side by side, as the poet does to describe the tiger’s anger? Write the term.',
    }),
    sl('example', 'Worked example: a 40–50 word answer', {
      b: '*Question:* Why does the tiger stare at the stars at the end of the poem?',
      v: vShortPlan,
      bl: [
        '**Point:** the stars stand for the freedom he has lost.',
        '**Situation (own words):** alone after dark, guarded, unable to roam.',
        '**Support:** one shining word links his eyes to the stars.',
        '**Model (46 words):** *Left alone after dark, guarded and unable to roam, the tiger looks up at the stars because they are free and far away, like the forest life he has lost. A single shining adjective connects his eyes to them, showing that his wild spirit still survives.*',
      ],
      n: 'Here is how to build a three mark answer. Find the key word: why. State the point: the stars stand for lost freedom. Describe the situation in your own words: alone, guarded, unable to roam. Add support: one shining word links his eyes to the stars. The model is forty-six words and copies nothing from the poem.',
    }),
    sl('check', 'Check: a word from the poem', {
      chk: 'mc_lurking',
      n: 'One more. What does the word lurking mean? It tells you how the tiger would behave while hunting in the wild.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Stanza 1: pacing a tiny enclosure in silent fury.',
        'Stanzas 2–3: he ought to be hunting near water and feared near villages.',
        'Stanza 4: shut in, strength wasted, ignoring the crowds.',
        'Stanza 5: after dark he gazes at the stars; one shining word links eyes and stars.',
        'Message: wild animals belong in the wild. Read the poem in *First Flight*.',
      ],
      v: vStructure,
      n: 'Let us sum up. The tiger paces a tiny enclosure in silent fury. He ought to be hunting near water and feared near villages. Instead he is shut in, his power wasted, ignoring the crowds. After dark he gazes at the stars, which stand for his lost freedom. The message: wild animals belong in the wild, not on display.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never write out the poem\'s lines; explain the idea in your own words.',
        'Always set the zoo against the wild: that contrast is the heart of the poem.',
        'Name devices **and** say what they do: *the oxymoron shows anger with no outlet*.',
        '40–50 word answers: point + zoo or wild in your own words + device or feeling.',
        'Common slips: saying the tiger escapes; that he is happy; that stanzas 2–3 really happen.',
      ],
      n: 'Exam tips. Never write out the lines; explain in your own words. Always set the zoo against the wild. When you name a device, say what it does. Keep three mark answers to point, situation and device. And avoid the common slips: the tiger does not escape, he is not content, and the forest scenes are imagined, not real.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'A Tiger in the Zoo — study notes',
  sections: [
    {
      h: '1. The poet and the poem',
      t: 1,
      b: `${READ}\n\n**Leslie Norris** (1921–2006) was a Welsh poet and short-story writer whose work often looks closely and sympathetically at animals and the natural world. *A Tiger in the Zoo* contrasts a tiger\'s life in captivity with the life he ought to be living in the wild.`,
      v: vPoet,
    },
    {
      h: '2. What happens (SOYL summary)',
      t: 1,
      b: '**Stanza 1 — the enclosure:** the tiger paces a tiny space; his paws are silent but he is furious.\n\n**Stanzas 2 and 3 — the life he should have:** he ought to be hunting unseen near water, and prowling at the forest\'s edge, feared by villagers.\n\n**Stanza 4 — back to reality:** he is shut in, his power held back by iron; he paces and ignores the visitors.\n\n**Stanza 5 — after dark:** he listens to the final human sounds and the guarding vehicles, and gazes at the stars.\n\nAn observer describes the tiger; the wild stanzas are imagined.',
      v: vStructure,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Captivity versus freedom:** the zoo wastes the tiger\'s strength and instincts.\n- **Dignity:** he ignores the crowds and will not perform.\n- **Longing:** the stars stand for the free life he has lost.\n- **The ethics of zoos:** the poem never argues directly; the contrast makes readers question captivity. (Some modern zoos support conservation; a balanced answer may mention this.)',
      v: vContrast,
    },
    {
      h: '4. Devices, imagery and form',
      t: 3,
      b: '**Devices:** oxymoron (a word for silence paired with a word for fury); alliteration (repeated s sounds in stanza 1); metaphor (paws compared to soft, rich fabric); contrast (cage stanzas around wild stanzas); repetition (one shining adjective for the eyes and the stars); imagery of sight and sound.\n\n**Form:** five quatrains; loose rhyme, mainly in lines 2 and 4 of each stanza; the shape cage, wild, wild, cage, night mirrors the tiger\'s confinement.',
      v: vDevices,
      terms: [
        ['Oxymoron', 'Two words of opposite meaning placed together (loud silence).'],
        ['Alliteration', 'Repetition of the same consonant sound at the start of nearby words.'],
        ['Contrast', 'Placing opposites side by side to sharpen both.'],
      ],
    },
    {
      h: '5. Tone',
      t: 3,
      b: 'Sympathetic throughout: sad and restrained in the cage stanzas, vivid and energetic in the wild stanzas, quiet, lonely and wistful at the end. The poem closes on longing rather than anger.',
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
      b: '**Extract-based (5 marks):** the board prints the poem\'s lines; SOYL practice uses commentary passages instead. Expect questions on the contrast, devices (oxymoron, alliteration), the visitors and the stars.\n\n**Short answers (3 marks, 40–50 words):** point + zoo or wild in your own words + device or feeling.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.',
      v: vShortPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Treating the forest stanzas as things that really happen.\n3. Saying the tiger escapes or is content.\n4. Naming the oxymoron without explaining the silent anger.\n5. Forgetting what the stars stand for.\n\n**Remember:** read the poem in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *A Tiger in the Zoo*?', 'Leslie Norris (1921–2006), Welsh poet and short-story writer.', 'fact', 1],
  ['Where is the tiger at the start?', 'In a tiny zoo enclosure, pacing to and fro.', 'fact', 1],
  ['What do stanzas 2 and 3 describe?', 'The life he should have: hunting near water; prowling near villages, feared.', 'concept', 1],
  ['What happens in stanza 4?', 'Back to reality: shut in, strength held back, pacing, ignoring the visitors.', 'concept', 1],
  ['What happens in stanza 5?', 'After dark he listens to the night sounds and gazes at the stars.', 'concept', 1],
  ['Who speaks the poem?', 'An observer describing the tiger (third person).', 'fact', 1],
  ['Central idea', 'Wild animals belong in the wild; captivity wastes their strength and dignity.', 'concept', 2],
  ['Why does the tiger ignore the visitors?', 'Resentment and dignity: he will not perform for his captors.', 'concept', 2],
  ['What do the stars stand for?', 'Freedom and the wild life he has lost.', 'concept', 2],
  ['Does the poet state his view of zoos?', 'No: the contrast between cage and wild makes the point.', 'concept', 2],
  ['Why is the tiger\'s anger silent?', 'He cannot act on it: no prey, no forest, no escape.', 'concept', 2],
  ['A point in favour of zoos', 'Some modern zoos help save endangered species.', 'concept', 2],
  ['Number of stanzas and lines', 'Five stanzas of four lines (20 lines).', 'fact', 3],
  ['Rhyme', 'Loose: mainly lines 2 and 4 of each stanza rhyme or nearly rhyme.', 'fact', 3],
  ['Structure', 'Cage → wild → wild → cage → night.', 'fact', 3],
  ['How the structure mirrors the meaning', 'The wild stanzas are enclosed by cage stanzas, as freedom is enclosed by walls.', 'concept', 3],
  ['Oxymoron in the poem', 'A word for silence paired with a word for fury: anger with no outlet.', 'concept', 3],
  ['Alliteration in the poem', 'Repeated s sounds in stanza 1 imitate soft, restless pacing.', 'concept', 3],
  ['Metaphor in the poem', 'The paws compared to a soft, rich fabric: silent movement.', 'concept', 3],
  ['Repetition at the end', 'One shining adjective for both the eyes and the stars: links him to freedom.', 'concept', 3],
  ['Tone', 'Sympathetic: sad, then vivid, then quiet and wistful.', 'concept', 3],
  ['*stalks*', 'walks with stiff, angry strides', 'definition', 4],
  ['*lurking*', 'waiting hidden, ready to attack', 'definition', 4],
  ['*terrorising*', 'filling with fear', 'definition', 4],
  ['*patrolling*', 'going round an area to guard it', 'definition', 4],
  ['Plan for a 40–50 word answer', 'Point + zoo or wild in own words + device or feeling.', 'exam-tip', 4],
  ['Most common slip', 'Treating the imagined forest stanzas as real events.', 'exam-tip', 4],
  ['Should you quote the poem in answers?', 'No. Explain in your own words; name devices and what they do.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — A Tiger in the Zoo',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)', items: ['src_pacing'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_contrast', 'sa_rage', 'sa_visitors', 'sa_stars'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_contrast', 'la_ending'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — A Tiger in the Zoo',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_wild', 'src_cell'] }, { attempt: 1, keys: ['src_stars', 'src_devices'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_stanzas', 'sb_villagers', 'sb_strength', 'sb_eyes_stars'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_should_be', 'sa_night_sounds', 'sa_alliteration', 'sa_middle_stanzas', 'sa_zoo_debate'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_tiger_diary', 'la_zoo_debate'] }, { attempt: 1, keys: ['la_letter', 'la_devices'] }] },
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
    literature_rule: 'poem in copyright: no line or phrase reproduced (only the title and single words: stalks, lurking, snarling, fangs, terrorising, patrolling); stanzas described in SOYL words, not paraphrased line by line; the oxymoron and the repeated adjective are described, not quoted; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem',
    accuracy: 'form facts checked (5 quatrains, loose rhyme mainly in lines 2 and 4, structure cage-wild-wild-cage-night)',
    re_solve: 'author verifier pass: every item re-answered from its stem',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
