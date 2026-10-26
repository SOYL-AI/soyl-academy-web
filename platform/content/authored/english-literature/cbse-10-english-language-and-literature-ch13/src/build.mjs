// Build CBSE 10 English Language and Literature ch13 "Dust of Snow". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch13/src/build.mjs
// LITERATURE RULE: the poem (eight lines) is never quoted or paraphrased line by line; only single words
// and the title appear. Students read the poem in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch13', 'english-literature');
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
    ['Known for', 'poems set in the farms and woods of New England, in plain everyday language with deeper meanings'],
    ['Honours', 'Pulitzer Prize for Poetry, four times'],
    ['Other well-known poems', '*The Road Not Taken*, *Stopping by Woods on a Snowy Evening*, *Fire and Ice*'],
    ['This poem', 'collected in *New Hampshire* (1923)'],
  ],
  'Table of facts about Robert Frost: American poet, 1874 to 1963, known for New England poems in plain language, four-time Pulitzer Prize winner, author of The Road Not Taken and Fire and Ice; Dust of Snow appears in New Hampshire, 1923.',
);
const vGlance = table(
  ['Feature', 'Dust of Snow'],
  [
    ['Length', '8 short lines in 2 stanzas of 4 (quatrains)'],
    ['Sentence', 'one sentence running through the whole poem'],
    ['Rhyme scheme', 'abab cdcd'],
    ['Speaker', 'a person outdoors on a winter day, in a low mood'],
    ['Setting', 'beneath a snow-covered hemlock, with a crow above'],
    ['Tone', 'plain report → quiet gratitude and relief'],
  ],
  'Table of the poem at a glance: eight lines in two quatrains, a single sentence, rhyme scheme abab cdcd, a speaker in a low mood outdoors in winter, a hemlock and a crow, and a tone moving from plain report to gratitude.',
);
const vSymbols = table(
  ['Element', 'Usual association', 'What it does in the poem'],
  [
    ['Crow', 'black, harsh-voiced: an ill omen', 'causes the snow to fall: brings cheer'],
    ['Hemlock', 'name of a poisonous plant (Socrates): sorrow, death', 'holds the snow that refreshes the speaker'],
    ['Snow', 'cold, bleak winter', 'a light, cool touch that wakes him up'],
  ],
  'Table of symbols: the crow usually means ill omen but brings cheer; the hemlock suggests sorrow and death but holds the refreshing snow; snow suggests bleak winter but gives a cool, waking touch.',
  'The poem reverses the usual meanings.',
);
const vShift = flow('LR', ['Low, regretful mood', 'A tiny event: snow falls from a branch', 'A cold, sudden touch', 'Mood lifts', 'Rest of the day rescued'], 'Flow of the speaker’s experience: a low mood, a tiny event as snow falls from a branch, a cold sudden touch, the mood lifts, and the rest of the day is rescued.', 'The speaker\'s experience (SOYL summary).');
const vDevices = table(
  ['Device', 'Where in the poem (described)', 'A SOYL example of the device'],
  [
    ['Symbolism', 'crow and hemlock stand for gloom', 'The *owl* on the gate stood for every fear of the night.'],
    ['Imagery', 'sight of the dark bird and white snow; touch of cold', 'Cold drops of rain on a dusty neck.'],
    ['Enjambment', 'one sentence runs across all eight lines', 'A sentence that runs on without a stop at the line end.'],
    ['Rhyme scheme', 'alternate lines rhyme: abab cdcd', 'day / road / play / load'],
    ['Irony / contrast', 'gloomy symbols bring cheer', 'The thunderclap that frightened us also brought the rain we longed for.'],
  ],
  'Table of poetic devices in the poem, described, each with a SOYL example: symbolism, imagery, enjambment, rhyme scheme abab cdcd, and irony or contrast.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['crow', 'a large black bird; in folklore, often an ill omen'],
    ['hemlock', 'an evergreen conifer of North America; also the name of a poisonous plant'],
    ['dust', 'here, fine powdery particles (of snow)'],
    ['rued', 'regretted'],
    ['mood', 'a state of mind or feeling'],
  ],
  'Table of word meanings: crow, hemlock, dust, rued and mood.',
  'Single words from the poem with their meanings.',
);
const vShortPlan = flow('LR', ['Key word of the question', 'Point in one sentence', 'Incident in your own words', 'Device or symbol that supports it'], 'Flow for a forty to fifty word answer: find the key word, state the point, give the incident in your own words, add a supporting device or symbol.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Dust of Snow — Robert Frost',
  goals: [
    'Explain the central idea of the poem stanza by stanza, in your own words',
    'Explain how a small event changes the speaker\'s mood',
    'Interpret the symbolism of the crow and the hemlock',
    'Identify the rhyme scheme, enjambment and imagery',
    'Answer extract-based and 40–50 word questions on the poem',
  ],
  slides: [
    sl('title', 'Dust of Snow — Robert Frost', {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today’s poem is Dust of Snow by Robert Frost. It is one of the shortest poems in your book, just eight lines, so please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will understand what happens, why it matters, the symbols Frost chooses, and how to answer board questions on it.',
    }),
    sl('concept', 'How to read a short poem', {
      bl: [
        'Read it aloud twice from *First Flight*; notice where the sentence ends.',
        'Ask: what happens? how does the speaker feel before and after?',
        'Then ask: why these images, this bird, this tree?',
        'In answers, explain in your own words; never copy lines.',
      ],
      n: 'Short poems reward slow reading. First, read it aloud twice and notice where the sentence ends. Then ask two simple questions: what happens, and how does the speaker feel before and after? Finally ask why Frost chose these particular images. When you answer in the exam, explain in your own words. Copying lines does not earn marks.',
    }),
    sl('concept', 'The poet: Robert Frost', {
      v: vPoet,
      n: 'Robert Frost was an American poet who lived from eighteen seventy-four to nineteen sixty-three. He wrote about farms, woods and ordinary country life in New England, in plain language that hides deep ideas. He won the Pulitzer Prize for Poetry four times. You may know his poem The Road Not Taken, and Fire and Ice is also in your book.',
    }),
    sl('concept', 'The poem at a glance', {
      v: vGlance,
      n: 'Here is the poem at a glance. Eight short lines in two stanzas of four. Remarkably, the whole poem is one sentence. The rhyme scheme is a b a b, c d c d. The speaker is outdoors on a winter day, in a low mood, under a snowy hemlock with a crow above. The tone moves from a plain report to quiet gratitude.',
    }),
    sl('concept', 'Stanza 1: the incident', {
      b: 'In SOYL\'s words: a crow perched in a snow-laden hemlock disturbs a branch, and a light sprinkle of snow falls on the speaker standing below. That is all that happens: a second-long event, reported plainly.',
      n: 'The first stanza records the incident. A crow sitting in a hemlock moves, and some fine snow from the branch falls on the speaker below. Nothing more happens. Notice how ordinary it is, and how plainly it is told. Frost gives a whole stanza to an event that lasts barely a second, as if to say that small moments deserve our attention.',
    }),
    sl('concept', 'Stanza 2: the effect', {
      b: 'In SOYL\'s words: the speaker had been regretting the day. The cold touch of snow lifts his spirits, and he feels that the remainder of that unhappy day has been rescued. The change is quiet, not wild joy.',
      n: 'The second stanza gives the effect. The speaker had been having a day he regretted. The sudden cold touch of the snow jolts him out of that mood, and he feels that the rest of the day has been rescued. Notice that he does not claim great happiness. The change is real but quiet, which is typical of Frost.',
    }),
    sl('check', 'Check: what changed the speaker\'s mood?', {
      chk: 'mc_irony',
      n: 'Your turn. Think about where the speaker’s better mood comes from. Is it something we would normally expect to cheer a person up? Choose the answer that captures the surprise.',
    }),
    sl('diagram', 'The speaker\'s experience', {
      v: vShift,
      n: 'Here is the whole experience as a flow. A low, regretful mood. A tiny event, snow falling from a branch. A cold and sudden touch. The mood lifts. And the rest of the day is rescued. If you can explain these five steps in your own words, you can answer almost any question on the poem.',
    }),
    sl('concept', 'Symbols: the crow and the hemlock', {
      b: 'Frost could have chosen a songbird and a flowering tree. He chose two things readers link with gloom, and let them bring cheer.',
      v: vSymbols,
      n: 'Why a crow and a hemlock? In folklore the crow, black and harsh voiced, is often an ill omen. The hemlock shares its name with a poisonous plant, the one linked with the death of Socrates, so it suggests sorrow and death. Snow suggests bleak winter. Yet together they lift the speaker’s mood. Frost reverses their usual meanings.',
    }),
    sl('two-column', 'Expectation versus outcome', {
      cols: [
        '**What we expect**\n\n- a crow: bad luck\n- a hemlock: poison, death\n- snow: cold, bleakness\n- a bad day: stays bad',
        '**What happens**\n\n- the crow causes a helpful surprise\n- the hemlock holds the refreshing snow\n- the snow wakes the speaker up\n- the rest of the day is rescued',
      ],
      n: 'Set expectation beside outcome and the irony is clear. We expect the crow to bring bad luck, the hemlock to suggest death, the snow to feel bleak, and a bad day to stay bad. Instead, each of them helps. This contrast carries the message: comfort can come from unlikely places, so we should not judge things only by their usual meanings.',
    }),
    sl('check', 'Check: symbols and their meaning', {
      chk: 'ar_symbol',
      n: 'Check yourself with an assertion and reason. Both statements may be true, but does the second really explain the first? Think about what actually lifts the speaker’s mood.',
    }),
    sl('concept', 'Themes and message', {
      bl: [
        '**Small moments matter:** a second-long event changes a day.',
        '**Nature as healer:** no person comforts the speaker; nature does.',
        '**Hope from unlikely sources:** gloomy symbols bring cheer.',
        '**Moods can change:** one bad morning need not spoil the whole day.',
      ],
      n: 'The themes follow naturally. Small moments matter, since a second long event changes a day. Nature heals, because no person comforts the speaker; nature does. Hope can come from unlikely sources, even gloomy ones. And moods are not fixed: one bad morning need not spoil the whole day. In answers, state a theme and support it with the incident.',
    }),
    sl('concept', 'Poetic devices, with SOYL\'s own examples', {
      b: 'Each device is described in the poem and illustrated with a SOYL sentence, not with the poem\'s lines.',
      v: vDevices,
      n: 'Now the devices. Symbolism, in the crow and hemlock. Imagery of sight and touch: the dark bird, the white powder, the cold. Enjambment, as one sentence runs across all eight lines. A rhyme scheme of a b a b, c d c d. And irony, as gloomy symbols bring cheer. The examples in the right column are our own sentences, made to show each device.',
    }),
    sl('example', 'Why enjambment suits this poem', {
      b: 'The poem\'s single sentence never pauses until the end. Read it aloud from *First Flight* and notice that you hardly stop for breath.',
      bl: [
        '**Form:** one unbroken sentence across eight short lines.',
        '**Experience:** the snow falls and the mood changes almost at once.',
        '**Link:** the quick, unbroken movement of the sentence mirrors the swift change.',
      ],
      n: 'Here is a worked point you can use in answers. The poem is a single sentence that runs on from line to line. Read aloud, it barely pauses. That quick, unbroken movement mirrors the experience: the snow falls and, almost at once, the mood changes. When form and meaning match like this, say so in your answer. It shows real understanding.',
    }),
    sl('concept', 'Tone and mood', {
      b: 'Stanza 1 is plain and descriptive. Stanza 2 is reflective, grateful and relieved. Frost never names the cause of the bad mood, so every reader can supply their own bad day.',
      n: 'Listen to the tone. The first stanza is plain, almost like a report. The second is reflective and grateful. Notice too what Frost leaves out: he never tells us why the speaker was unhappy. That silence is clever. It lets every reader imagine their own bad day, a failed test or a quarrel, and so the poem feels personal to everyone.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'A few words to know. Crow, a large black bird often seen as an ill omen. Hemlock, an evergreen tree whose name is shared with a poisonous plant. Dust, here meaning fine powdery snow. Rued, meaning regretted. And mood, a state of mind. Rued is the word students most often get wrong, so learn it well.',
    }),
    sl('check', 'Check: the rhyme scheme', {
      chk: 'fb_scheme',
      n: 'Quick check. Write the rhyme scheme of the poem using letters. Look at which lines in each stanza end with matching sounds, in your textbook.',
    }),
    sl('example', 'Worked example: a 40–50 word answer', {
      b: '*Question:* How does a small incident lift the speaker\'s spirits?',
      v: vShortPlan,
      bl: [
        '**Point:** a tiny natural event ends his gloom.',
        '**Incident (own words):** a crow in a hemlock shakes snow onto him while he is regretting his day.',
        '**Support:** the cold touch jolts him; the rest of the day feels rescued.',
        '**Model (46 words):** *The speaker is in a gloomy mood, regretting how his day has gone. A crow in a hemlock shakes some snow onto him. The sudden, cold touch of nature jolts him out of his sadness, and he feels that the rest of the day has been rescued.*',
      ],
      n: 'Here is how to build a three mark answer. Find the key word: lift. State the point: a tiny natural event ends his gloom. Describe the incident in your own words. Add support: the cold touch jolts him, and the day feels rescued. The model answer is forty-six words, inside the limit, and it does not copy a single line of the poem.',
    }),
    sl('check', 'Check: the word rued', {
      chk: 'mc_rued',
      n: 'One more. What does the word rued mean? It tells you how the speaker felt about his day before the snow fell.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Incident: a crow in a hemlock shakes snow onto the speaker.',
        'Effect: his regretful mood lifts; the rest of the day is rescued.',
        'Symbols reversed: crow and hemlock (gloom) bring cheer.',
        'Form: 8 lines, 2 quatrains, one sentence, abab cdcd, enjambment.',
        'Message: small moments of nature can change our outlook. Read the poem in *First Flight*.',
      ],
      v: vShift,
      n: 'Let us sum up. A crow in a hemlock shakes snow onto the speaker. His regretful mood lifts, and the rest of his day is rescued. The crow and hemlock, usually symbols of gloom, bring cheer. The poem is eight lines, two quatrains, one sentence, rhyming a b a b, c d c d. Its message: small moments of nature can change our outlook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never write out the poem\'s lines; explain the idea in your own words.',
        'Name devices **and** say what they do: *the crow is a symbol of ill omen, but here it brings cheer*.',
        'For the hemlock, mention the association with poison and death (Socrates).',
        '40–50 word answers: point + incident + device or symbol.',
        'Common slips: saying the crow attacks the speaker; *rued* as "ruined"; calling the rhyme scheme aabb.',
      ],
      n: 'Exam tips. Never write out the lines; explain in your own words. When you name a device, also say what it does. For the hemlock, mention its link with poison and death. Keep three mark answers to point, incident and device. And avoid the common slips: the crow does not attack anyone, rued means regretted, not ruined, and the rhyme scheme is a b a b.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Dust of Snow — study notes',
  sections: [
    {
      h: '1. The poet and the poem',
      t: 1,
      b: `${READ}\n\n**Robert Frost** (1874–1963) was an American poet who wrote about country life in New England in plain, everyday language with deeper meanings. He won the Pulitzer Prize for Poetry four times. *Dust of Snow* is a short lyric collected in *New Hampshire* (1923).`,
      v: vPoet,
    },
    {
      h: '2. What happens (SOYL summary)',
      t: 1,
      b: '**Stanza 1 — the incident:** on a winter day, a crow perched in a snow-covered hemlock disturbs a branch, and a light sprinkle of snow falls on the speaker below.\n\n**Stanza 2 — the effect:** the speaker had been regretting how the day had gone. The sudden cold touch lifts his spirits, and he feels that the rest of that unhappy day has been rescued.\n\nThe poem is told in the first person, looking back on a moment and its effect.',
      v: vShift,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Small moments matter:** a second-long incident changes the course of a day.\n- **Nature as healer:** the speaker is helped by nature, not by people.\n- **Hope from unlikely sources:** symbols of gloom bring cheer.\n- **Moods can change:** a bad beginning need not mean a bad day.\n\nBecause the cause of the bad mood is never named, every reader can apply the poem to their own life.',
    },
    {
      h: '4. Symbols, imagery and devices',
      t: 3,
      b: '**Crow:** traditionally an ill omen (black, harsh-voiced). **Hemlock:** the North American tree is a harmless evergreen conifer, but it shares its name with a poisonous plant used to put Socrates to death, so readers take it as a symbol of sorrow or death. **Snow:** usually bleak winter; here a light, refreshing touch. The poem reverses all three.\n\n**Devices:** symbolism; imagery of sight (dark bird, white powder) and touch (cold); enjambment (one sentence across eight lines); rhyme scheme abab cdcd; irony / contrast (gloomy symbols, cheerful effect).\n\n**Form:** eight short lines, two quatrains, a single sentence; plain words.',
      vs: [vSymbols, vDevices],
      terms: [
        ['Enjambment', 'The running-on of a sentence from one line to the next without a pause.'],
        ['Quatrain', 'A stanza of four lines.'],
        ['Symbol', 'An object that stands for an idea (the crow for ill omen).'],
      ],
    },
    {
      h: '5. Tone',
      t: 3,
      b: 'Stanza 1 is plain and matter-of-fact; stanza 2 is reflective, grateful and relieved. The change is quiet rather than joyful: the speaker says the day was rescued, not that he became ecstatic.',
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the poem with their meanings. *Rued* (regretted) is often misread as *ruined*.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints the poem\'s lines; SOYL practice uses commentary passages instead. Expect questions on meaning, tone, devices and the rhyme scheme.\n\n**Short answers (3 marks, 40–50 words):** point + incident in your own words + a device or symbol.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.',
      v: vShortPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Saying the crow attacks the speaker or that he falls ill from the cold.\n3. Reading *rued* as *ruined*.\n4. Giving the rhyme scheme as aabb.\n5. Naming a device without saying what it does in the poem.\n\n**Remember:** read the poem in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Dust of Snow*?', 'Robert Frost (1874–1963), American poet.', 'fact', 1],
  ['Two facts about Robert Frost', 'Wrote about rural New England; won the Pulitzer Prize for Poetry four times.', 'fact', 1],
  ['In which collection does the poem appear?', '*New Hampshire* (1923).', 'fact', 1],
  ['Season of the poem', 'Winter — snow lies on the hemlock.', 'fact', 1],
  ['What happens in stanza 1?', 'A crow in a hemlock disturbs a branch; a light sprinkle of snow falls on the speaker.', 'concept', 1],
  ['What happens in stanza 2?', 'The speaker\'s regretful mood lifts; the rest of the day feels rescued.', 'concept', 1],
  ['Speaker\'s mood before the incident', 'Gloomy and regretful about the day.', 'fact', 1],
  ['Central idea', 'A small moment of nature can change one\'s mood and outlook.', 'concept', 2],
  ['Who comforts the speaker?', 'No person — nature (crow, hemlock, snow) does.', 'concept', 2],
  ['Why is the cause of the bad mood not named?', 'So every reader can supply their own bad day: the poem becomes universal.', 'concept', 2],
  ['Four themes', 'Small moments matter; nature heals; hope from unlikely sources; moods can change.', 'concept', 2],
  ['What does the crow usually symbolise?', 'Ill omen, bad luck, gloom.', 'concept', 3],
  ['Why is the hemlock linked with death?', 'It shares its name with a poisonous plant used to put Socrates to death.', 'concept', 3],
  ['Is Frost\'s hemlock itself poisonous?', 'No — it is a harmless North American evergreen; the association comes from the name.', 'fact', 3],
  ['How does the poem use its symbols?', 'It reverses them: gloomy symbols bring cheer (irony).', 'concept', 3],
  ['Rhyme scheme', 'abab cdcd.', 'fact', 3],
  ['Number of lines and stanzas', 'Eight lines; two stanzas of four (quatrains).', 'fact', 3],
  ['How many sentences?', 'One — it runs through all eight lines.', 'fact', 3],
  ['Enjambment', 'A sentence running on from one line to the next without a pause; the whole poem is enjambed.', 'definition', 3],
  ['How does the form mirror the meaning?', 'The quick, unbroken sentence mirrors the swift shift in mood.', 'concept', 3],
  ['Senses in the imagery', 'Sight (dark bird, white snow) and touch (cold).', 'concept', 3],
  ['Tone of stanza 1 vs stanza 2', 'Plain report → quiet gratitude and relief.', 'concept', 3],
  ['*rued*', 'regretted (not "ruined")', 'definition', 4],
  ['*dust* in the title', 'fine powdery particles — a light sprinkle of snow', 'definition', 4],
  ['*hemlock*', 'an evergreen conifer; also the name of a poisonous plant', 'definition', 4],
  ['Plan for a 40–50 word answer', 'Point + incident in own words + device or symbol.', 'exam-tip', 4],
  ['Most common slip about the crow', 'It does not attack the speaker; it only disturbs a branch.', 'exam-tip', 4],
  ['Should you quote the poem in answers?', 'No. Explain in your own words; name devices and what they do.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Dust of Snow',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)', items: ['src_incident'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_mood_change', 'sa_crow_symbol', 'sa_rued', 'sa_rhyme'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_small_moments', 'la_symbols'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Dust of Snow',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_effect', 'src_symbols'] }, { attempt: 1, keys: ['src_form', 'src_tone'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_season', 'sb_tone_shift', 'sb_hemlock_tree', 'sb_message'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_hemlock', 'sa_dust', 'sa_nature', 'sa_title', 'sa_irony'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_diary', 'la_relevance'] }, { attempt: 1, keys: ['la_letter', 'la_style'] }] },
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
    literature_rule: 'no line or phrase of the poem reproduced (only the title and single words: crow, hemlock, dust, rued, mood); stanza summaries in SOYL words; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem',
    accuracy: 'form facts checked (8 lines, 2 quatrains, one sentence, abab cdcd); hemlock symbolism stated with the tree/poison distinction',
    re_solve: 'author verifier pass: every item re-answered from its stem',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
