// Build CBSE 10 English Language and Literature ch17 "The Ball Poem". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch17/src/build.mjs
// LITERATURE RULE: the poem (in copyright) is never quoted or paraphrased line by line; only single words
// and the title appear. Students read the poem in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch17', 'english-literature');
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
    ['Poet', 'John Berryman (1914–1972), American poet'],
    ['Linked with', 'the Confessional poets, who wrote openly about personal experience'],
    ['Honours', 'Pulitzer Prize for Poetry, for *77 Dream Songs*'],
  ],
  'Table of facts about John Berryman: an American poet, 1914 to 1972, linked with the Confessional poets, who won the Pulitzer Prize for Poetry for 77 Dream Songs.',
);
const vGlance = table(
  ['Feature', 'The Ball Poem'],
  [
    ['Form', 'free verse: no regular rhyme scheme or metre; one continuous stanza'],
    ['Speaker', 'an adult who watches the incident (first person)'],
    ['Event', 'a boy\'s ball bounces away into a harbour and is lost'],
    ['Movement', 'a concrete incident → an abstract lesson about loss'],
    ['Key symbol', 'the ball: childhood and everything we treasure'],
    ['Tone', 'gentle, sympathetic, reflective, philosophical'],
  ],
  'Table of the poem at a glance: free verse in one continuous stanza, an adult first-person speaker, a boy’s ball lost in a harbour, a movement from a concrete incident to an abstract lesson, the ball as a symbol of childhood, and a gentle, reflective tone.',
);
const vJourney = flow('LR', ['Carefree play', 'The ball bounces away into the harbour\'s water', 'Frozen grief', 'No replacement offered', 'First lesson: loss and responsibility', 'A lesson everyone must learn'], 'Flow of the poem: carefree play, the ball bounces away into the harbour\'s water, frozen grief, no replacement offered, the first lesson in loss and responsibility, and a lesson everyone must learn.', 'The poem from incident to lesson (SOYL summary).');
const vSymbol = table(
  ['', 'On the surface', 'Underneath'],
  [
    ['The ball', 'a child\'s toy', 'childhood, innocence, anything treasured'],
    ['The harbour\'s water', 'a harbour', 'permanent loss: what goes in does not come back'],
    ['The coin or new ball', 'an easy fix', 'money, which cannot buy back what was loved'],
    ['The boy\'s stare', 'shock', 'the first moment of a lifelong lesson'],
  ],
  'Table of surface and deeper meanings: the toy ball stands for childhood and anything treasured; the harbour\'s water is a harbour but stands for permanent loss; a coin or new ball looks like an easy fix but stands for money that cannot buy back what was loved; the boy’s stare is shock and also the start of a lifelong lesson.',
);
const vDevices = table(
  ['Device', 'Where in the poem (described)', 'A SOYL example of the device'],
  [
    ['Rhetorical question', 'the opening asks what the boy can do now', 'What can a kite do once its string has snapped?'],
    ['Repetition', 'the ball\'s cheerful movement described twice', 'Gone, gone, the summer was gone.'],
    ['Symbolism', 'the ball for childhood and treasured things', 'The *empty swing* stood for the friend who had moved away.'],
    ['Imagery', 'the bouncing ball; the boy staring into the harbour\'s water', 'A paper boat spinning slowly down a drain.'],
    ['Enjambment', 'lines run on, breaking mid-thought', 'A sentence that keeps going past the end of the line.'],
    ['Free verse', 'no regular rhyme or metre', 'Lines of any length, following the voice of thought.'],
  ],
  'Table of poetic devices in the poem, described, each with a SOYL example: rhetorical question, repetition, symbolism, imagery, enjambment and free verse.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['harbour', 'a sheltered stretch of water where ships anchor'],
    ['rigid', 'stiff; unable to move'],
    ['intrude', 'interfere where one is not wanted'],
    ['dime', 'a ten-cent American coin'],
    ['epistemology', 'the study of knowledge: how we come to know things'],
    ['external', 'outside; not part of the real experience'],
  ],
  'Table of word meanings: harbour, rigid, intrude, dime, epistemology and external.',
  'Single words from the poem with their meanings.',
);
const vShortPlan = flow('LR', ['Key word of the question', 'Point in one sentence', 'Incident in your own words', 'Lesson or symbol that supports it'], 'Flow for a forty to fifty word answer: find the key word, state the point, give the incident in your own words, add a supporting lesson or symbol.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Ball Poem — John Berryman',
  goals: [
    'Explain the central idea of the poem in your own words',
    'Explain the boy\'s first experience with loss and responsibility',
    'Interpret the symbolism of the ball and describe the tone',
    'Explain why the speaker does not replace the ball',
    'Answer extract-based and 40–50 word questions on the poem',
  ],
  slides: [
    sl('title', 'The Ball Poem — John Berryman', {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today’s poem is The Ball Poem by John Berryman. It looks simple, a boy loses a ball, but it carries one of the deepest ideas in your book. Please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will understand the incident, the lesson, the symbol and the tone.',
    }),
    sl('concept', 'How to read this poem', {
      bl: [
        'Read it aloud twice from *First Flight*; follow the thought, not a rhyme.',
        'Ask: what happens? how does the boy react? what does the watching adult decide?',
        'Then ask: what does the poem really mean, beyond a ball?',
        'In answers, explain in your own words; never copy lines.',
      ],
      n: 'This poem does not rhyme, so read it for its thought. Read it aloud twice. Ask what happens, how the boy reacts, and what the watching adult decides. Then ask the big question: what is this poem really about, beyond a ball? When you answer in the exam, explain in your own words. Copying lines does not earn marks.',
    }),
    sl('concept', 'The poet: John Berryman', {
      v: vPoet,
      n: 'John Berryman was an American poet who lived from nineteen fourteen to nineteen seventy-two. He is linked with the Confessional poets, who wrote openly about personal feelings and experience. He won the Pulitzer Prize for Poetry for his book 77 Dream Songs. In this poem he takes a tiny event and finds in it a lesson about life.',
    }),
    sl('concept', 'The poem at a glance', {
      v: vGlance,
      n: 'Here is the poem at a glance. It is free verse, with no regular rhyme or metre, in one continuous stanza. The speaker is an adult who watches. The event is simple: a boy’s ball bounces away into a harbour. But the poem moves from that concrete incident to an abstract lesson about loss. The tone is gentle and reflective.',
    }),
    sl('concept', 'The incident', {
      b: 'In SOYL\'s words: the poem opens by wondering what a boy can do now that the ball has gone. The speaker recalls watching the ball bounce cheerfully along a street before dropping into a harbour\'s water, beyond recovery.',
      n: 'The poem opens with a question, as if the speaker were thinking aloud: what can the boy do now? Then he recalls what he watched. The ball bounced cheerfully along a street before dropping into a harbour\'s water, beyond recovery. Its cheerful movement is described twice, which makes the sudden loss feel sharper.',
    }),
    sl('concept', 'The boy\'s grief', {
      b: 'In SOYL\'s words: the boy is gripped by a deep, final grief. He remains frozen and trembling as he stares into the harbour\'s water as if his whole childhood had gone with the ball. The poem treats this grief with complete seriousness.',
      n: 'Look at the boy. He does not cry out or run. He remains frozen and trembling as he stares into the harbour\'s water, as if his whole childhood had gone down with the ball. An adult might say there are plenty of balls in the shops. The poem disagrees. For the boy this is the first time something he loves has gone for good.',
    }),
    sl('check', 'Check: the speaker\'s choice', {
      chk: 'mc_speaker_choice',
      n: 'Your turn. The adult watching could easily buy the boy a replacement. Why does he decide not to? Choose the best answer.',
    }),
    sl('concept', 'The speaker\'s decision', {
      b: 'In SOYL\'s words: the speaker could offer a coin or a new ball, but he decides not to step in. A replacement would miss the point. The boy must face, for the first time, the fact that things can disappear and cannot be bought back.',
      n: 'Now the speaker’s decision. He could offer a coin or a new ball. He chooses not to step in. This is not coldness. He understands that a replacement would miss the point. The boy has met, for the first time, the fact that things can disappear and cannot be bought back, and he must face that himself.',
    }),
    sl('concept', 'The lesson: responsibility and loss', {
      b: 'In SOYL\'s words: the boy is getting his first lesson in the responsibility that comes with owning things. Money cannot bring back what was loved. Near the end, a philosophical word for the study of knowledge shows that he is discovering what loss is and how to bear it, as everyone must, again and again.',
      n: 'Here is the lesson. Owning things brings responsibility: we must care for them and accept that they can disappear. Money cannot bring back what was loved. Near the end, the poet uses a philosophical word meaning the study of knowledge. The boy is discovering what loss is and how to bear it. Everyone must learn this, most people many times.',
    }),
    sl('diagram', 'From incident to lesson', {
      v: vJourney,
      n: 'Here is the whole poem as a flow. Carefree play. The ball bounces away into the harbour\'s water. Frozen grief. No replacement offered. The first lesson in loss and responsibility. And finally a lesson everyone must learn. Notice how the poem moves from a concrete event to an abstract idea. That movement is the poem’s shape.',
    }),
    sl('two-column', 'Surface and depth', {
      cols: [
        '**On the surface**\n\n- a toy ball\n- a harbour\n- a coin or new ball\n- a boy staring',
        '**Underneath**\n\n- childhood, innocence\n- permanent loss\n- money that cannot buy back love\n- the start of a lifelong lesson',
      ],
      v: vSymbol,
      n: 'Every element has a surface and a depth. On the surface, a toy ball; underneath, childhood and innocence. On the surface, a harbour; underneath, permanent loss. On the surface, a coin or a new ball; underneath, money that cannot buy back what was loved. And the boy’s stare is shock, but also the start of a lesson for life.',
    }),
    sl('check', 'Check: assertion and reason', {
      chk: 'ar_money',
      n: 'Check yourself with an assertion and reason. Both statements may be true, but does the second really explain the first? Think about why the speaker holds back.',
    }),
    sl('concept', 'Themes and message', {
      bl: [
        '**Loss is part of life:** it must be accepted and borne.',
        '**Money cannot replace what we love:** some things cannot be bought back.',
        '**Responsibility:** owning things brings a duty of care.',
        '**Growing up:** maturity begins with the first real loss.',
      ],
      n: 'The themes follow. Loss is part of life and must be accepted. Money cannot replace what we love. Owning things brings responsibility. And growing up begins with the first real loss. In answers, state a theme and support it with the incident: the ball, the frozen boy, the adult who chooses not to replace it.',
    }),
    sl('concept', 'Poetic devices, with SOYL\'s own examples', {
      b: 'Each device is described in the poem and illustrated with a SOYL sentence, not with the poem\'s lines.',
      v: vDevices,
      n: 'Now the devices. A rhetorical question opens the poem. Repetition describes the ball’s cheerful movement twice. Symbolism makes the ball stand for childhood. Imagery shows the bouncing ball and the staring boy. Enjambment runs the lines on. And the whole poem is free verse. The examples on the right are our own sentences.',
    }),
    sl('example', 'Worked point: the ball as a symbol', {
      b: 'The poem never says that the ball stands for anything. The meaning grows from how the boy reacts and how the speaker responds.',
      bl: [
        '**Clue 1:** the boy\'s grief is far deeper than a toy would explain.',
        '**Clue 2:** the speaker says a replacement would be worthless.',
        '**Meaning:** the ball stands for childhood and for anything precious we lose.',
        '**Why it matters:** a child\'s small loss becomes a lesson for everyone.',
      ],
      n: 'Here is a worked point. The poem never calls the ball a symbol. We work it out from clues. The boy’s grief is far deeper than a toy alone would explain. And the speaker says a replacement would be worthless. So the ball must stand for something more: childhood, and anything precious we lose. That is how a small loss becomes universal.',
    }),
    sl('concept', 'Tone', {
      b: 'Gentle, sympathetic and reflective, becoming philosophical. The speaker never mocks the boy\'s grief; his compassion takes the form of restraint.',
      n: 'Listen to the tone. It is gentle and sympathetic. The speaker never mocks the boy for grieving over a ball. As the poem moves from the incident to its lesson, the tone becomes reflective and philosophical. His compassion shows as restraint: he cares enough to let the boy learn, rather than rushing in to fix things.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'A few words to know. Harbour, a sheltered stretch of water where ships anchor. Rigid, stiff and unable to move. Intrude, to interfere where one is not wanted. Dime, a ten-cent American coin. Epistemology, the study of knowledge. And external, outside, not part of the real experience. Epistemology is the word examiners love to ask about.',
    }),
    sl('check', 'Check: free verse', {
      chk: 'fb_verse',
      n: 'Quick check. What kind of verse has no regular rhyme scheme or metre? Complete both blanks.',
    }),
    sl('example', 'Worked example: a 40–50 word answer', {
      b: '*Question:* What does the boy learn from losing the ball?',
      v: vShortPlan,
      bl: [
        '**Point:** he learns his first lesson about loss.',
        '**Incident (own words):** the ball bounces into a harbour; no one replaces it.',
        '**Support:** money cannot bring back what he loved; he must bear it.',
        '**Model (45 words):** *Watching the ball vanish into a harbour, the boy meets permanent loss for the first time. No adult rushes to replace it, so he discovers that money cannot bring back something loved. He begins to understand that loss must be accepted, borne and lived through.*',
      ],
      n: 'Here is how to build a three mark answer. Find the key word: learn. State the point: his first lesson about loss. Give the incident in your own words: the ball vanishes, and nobody replaces it. Add support: money cannot bring it back, and he must bear it. The model is forty-five words and copies nothing.',
    }),
    sl('check', 'Check: the philosophical word', {
      chk: 'fb_epistemology',
      n: 'One more. Near the end the poet uses the word epistemology. It means the study of what? Fill in the blank.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'A boy\'s ball bounces away into a harbour and is lost for good.',
        'He remains frozen with grief; the watching adult does not replace the ball.',
        'He begins to learn responsibility, and that money cannot buy back what we love.',
        'The ball symbolises childhood; free verse, a rhetorical opening, repetition.',
        'Message: learning to bear loss is part of growing up. Read the poem in *First Flight*.',
      ],
      v: vJourney,
      n: 'Let us sum up. A boy’s ball bounces away into a harbour. He remains frozen with grief, and the watching adult chooses not to replace it. The boy begins to learn responsibility, and that money cannot buy back what we love. The ball symbolises childhood. The message: learning to bear loss is part of growing up.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never write out the poem\'s lines; explain the idea in your own words.',
        'Always go beyond the ball: explain loss, responsibility and growing up.',
        'Explain *epistemology* in plain words: the boy is gaining knowledge about loss.',
        '40–50 word answers: point + incident + lesson or symbol.',
        'Common slips: confusing the speaker with the boy; that the speaker gets the boy a new ball; that the speaker is unkind.',
      ],
      n: 'Exam tips. Never write out the lines; explain in your own words. Always go beyond the ball to loss, responsibility and growing up. Explain epistemology in plain words. Keep three mark answers to point, incident and lesson. And avoid the common slips: the speaker and the boy are different people, no replacement arrives, and the speaker is wise, not unkind.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Ball Poem — study notes',
  sections: [
    {
      h: '1. The poet and the poem',
      t: 1,
      b: `${READ}\n\n**John Berryman** (1914–1972) was an American poet linked with the Confessional poets, who wrote openly about personal experience. He won the Pulitzer Prize for Poetry for *77 Dream Songs*. *The Ball Poem* turns a child\'s small loss into a lesson about life.`,
      v: vPoet,
    },
    {
      h: '2. What happens (SOYL summary)',
      t: 1,
      b: '**The incident:** the poem opens by wondering what a boy can do now that the ball has gone. The speaker recalls the ball bouncing cheerfully along a street before dropping into a harbour\'s water.\n\n**The grief:** the boy remains frozen and trembling as he stares into the harbour\'s water.\n\n**The decision:** the watching adult chooses not to offer a coin or a new ball; a replacement would be worthless.\n\n**The lesson:** the boy is getting his first lesson in responsibility and loss: things can disappear, money cannot bring back what was loved, and loss must be borne. Everyone learns this, most people many times.',
      v: vJourney,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Loss is part of life:** it must be accepted and borne.\n- **Money cannot replace what we love.**\n- **Responsibility:** owning things brings a duty of care and learning to accept loss.\n- **Growing up:** maturity begins with the first real loss.\n- **Universality:** a child\'s small grief stands for a lesson everyone must learn.',
    },
    {
      h: '4. Symbolism, devices and form',
      t: 3,
      b: '**The ball:** childhood, innocence and anything we treasure; its loss marks the end of innocence. **The harbour\'s water:** permanent loss.\n\n**Devices:** rhetorical question (the opening); repetition (the ball\'s cheerful movement described twice); symbolism; imagery (the bouncing ball, the staring boy); enjambment.\n\n**Form:** free verse in one continuous stanza; the language moves from concrete things (ball, street, harbour) to abstract ideas (responsibility, possessions, knowledge), mirroring the move from incident to lesson.',
      vs: [vSymbol, vDevices],
      terms: [
        ['Free verse', 'Poetry without a regular rhyme scheme or metre.'],
        ['Rhetorical question', 'A question asked for effect, not for an answer.'],
        ['Symbol', 'An object that stands for an idea (the ball for childhood).'],
      ],
    },
    {
      h: '5. Tone',
      t: 3,
      b: 'Gentle, sympathetic and reflective, becoming philosophical. The speaker treats the boy\'s grief seriously and shows compassion through restraint.',
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the poem with their meanings. *Epistemology* (the study of knowledge) is the word examiners most often ask about.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints the poem\'s lines; SOYL practice uses commentary passages instead. Expect questions on the incident, the boy\'s reaction, the speaker\'s decision, the lesson and the key philosophical word.\n\n**Short answers (3 marks, 40–50 words):** point + incident in your own words + lesson or symbol.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.',
      v: vShortPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Treating the poem as only about a ball.\n3. Saying the speaker gets the boy a new ball or is unkind.\n4. Confusing the speaker with the boy.\n5. Leaving *epistemology* unexplained.\n\n**Remember:** read the poem in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Ball Poem*?', 'John Berryman (1914–1972), American poet.', 'fact', 1],
  ['Two facts about John Berryman', 'Linked with the Confessional poets; Pulitzer Prize for *77 Dream Songs*.', 'fact', 1],
  ['What happens to the ball?', 'It bounces along a street, then on into a harbour\'s water, lost for good.', 'concept', 1],
  ['How does the boy react?', 'He remains frozen and trembling as he stares into the harbour\'s water.', 'concept', 1],
  ['Who is the speaker?', 'An adult who watches the incident (first person).', 'fact', 1],
  ['What does the speaker decide?', 'Not to offer a coin or a new ball.', 'concept', 1],
  ['Why no replacement?', 'The boy must learn that some things cannot be bought back.', 'concept', 2],
  ['Central idea', 'Learning to accept and bear loss is part of growing up.', 'concept', 2],
  ['What responsibility does the boy begin to learn?', 'Owning things means caring for them and accepting that they can go missing.', 'concept', 2],
  ['What can money not do?', 'Bring back the particular thing we loved, or the feeling tied to it.', 'concept', 2],
  ['Who must learn this lesson?', 'Everyone, and most people many times.', 'concept', 2],
  ['What does the ball symbolise?', 'Childhood, innocence and anything precious we may lose.', 'concept', 3],
  ['What does the harbour\'s water symbolise?', 'Permanent loss: what goes in does not come back.', 'concept', 3],
  ['Form of the poem', 'Free verse in one continuous stanza.', 'fact', 3],
  ['How does the poem open?', 'With a rhetorical question about what the boy can do now.', 'concept', 3],
  ['Repetition in the poem', 'The ball\'s cheerful movement is described twice: the loss feels sharper.', 'concept', 3],
  ['Concrete to abstract', 'Ball, street, water → responsibility, possessions, knowledge.', 'concept', 3],
  ['Tone', 'Gentle, sympathetic, reflective, philosophical.', 'concept', 3],
  ['How does the speaker show compassion?', 'Through restraint: he lets the boy learn.', 'concept', 3],
  ['*epistemology*', 'the study of knowledge: here, the boy gaining knowledge about loss', 'definition', 4],
  ['*dime*', 'a ten-cent American coin', 'definition', 4],
  ['*intrude*', 'interfere where one is not wanted', 'definition', 4],
  ['*rigid*', 'stiff; unable to move', 'definition', 4],
  ['*harbour*', 'a sheltered stretch of water where ships anchor', 'definition', 4],
  ['*external*', 'outside; not part of the real experience', 'definition', 4],
  ['Plan for a 40–50 word answer', 'Point + incident in own words + lesson or symbol.', 'exam-tip', 4],
  ['Most common slip', 'Treating the poem as only about a ball.', 'exam-tip', 4],
  ['Should you quote the poem in answers?', 'No. Explain in your own words; name devices and what they do.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — The Ball Poem',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)', items: ['src_incident'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_what_happens', 'sa_no_new_ball', 'sa_epistemology', 'sa_ball_symbol'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_growing_up', 'la_symbolism'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — The Ball Poem',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_grief', 'src_no_money'] }, { attempt: 1, keys: ['src_responsibility', 'src_learning_loss'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_where', 'sb_dime', 'sb_rigid', 'sb_free_verse'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_responsibility', 'sa_money', 'sa_universal', 'sa_speaker', 'sa_devices'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_boy_diary', 'la_speaker_choice'] }, { attempt: 1, keys: ['la_letter', 'la_relevance'] }] },
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
    literature_rule: 'poem in copyright: no line or phrase reproduced (only the title and single words: harbour, rigid, intrude, dime, epistemology, external); the incident, grief, decision and lesson described in SOYL words, not paraphrased line by line; the key philosophical phrase taught by meaning, never quoted; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem',
    accuracy: 'form (free verse, one continuous stanza) and incident facts checked; the speaker is an adult observer, not the boy',
    re_solve: 'author verifier pass: every item re-answered from its stem',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
