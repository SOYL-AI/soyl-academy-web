// CBSE 10 English Language and Literature, ch17 "The Ball Poem" (John Berryman) — question bank.
// LITERATURE RULE (CONTEXT §8): the poem is in copyright. No line or phrase of it is reproduced; only the
// title and single words (dime, harbour, intrude, rigid, epistemology, external, possessions,
// responsibility) appear. The poem is described by what happens and what it means, never paraphrased line
// by line. Passages are SOYL commentary (passage_origin: soyl-commentary).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary on *The Ball Poem* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point about the poem', 1], ['Explanation or interpretation linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point about the poem', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: accurate points about the poem', 3], ['Interpretation / extrapolation: a clear, supported view', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (SOYL commentary)
Q('src_incident', source({
  t: [4, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Berryman begins with a question, as if the speaker were thinking aloud: what is a boy to do now that the ball has gone? Then the speaker recalls what he watched. The ball bounced along a street, cheerfully, almost playfully, and then over the edge into a harbour\'s water. The poet describes the ball\'s cheerful movement twice, and the repetition makes its sudden disappearance more painful. One moment the ball seems a lively companion; the next it is gone for ever, and the boy is left with nothing but the harbour\'s water.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where does the ball finally go in *The Ball Poem*?', opts: ['into a harbour\'s water', 'into a neighbour\'s garden', 'up onto a roof', 'under a parked car'], sol: 'It bounces along a street, then on into a harbour\'s water.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How does *The Ball Poem* begin, according to the commentary?', opts: ['with a question', 'with a description of the sea', 'with the boy\'s name', 'with a conversation'], sol: 'It opens with a question, as if the speaker were thinking aloud.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says the poet describes the ball\'s cheerful movement ___.', acc: [['twice', 'two times']], sol: 'It is described **twice**: repetition.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the repetition make the ball\'s disappearance more painful, according to the commentary?', model: 'The ball seems lively and cheerful just before it is suddenly gone for ever.', sol: 'Contrast between lively play and sudden loss.', scheme: [['Lively ball, then sudden loss', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Who tells us what happened to the ball in *The Ball Poem*?', opts: ['a speaker who watched it happen', 'the boy himself', 'the boy\'s mother', 'a policeman'], sol: 'An adult speaker recalls what he watched.' })),
  ],
  sol: 'Answer from the commentary; parts (a) and (e) also follow from your reading of the poem.',
}));
Q('src_grief', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Adults might say the boy is overreacting: there are plenty of balls in the shops. The poem disagrees. The speaker sees that the boy is gripped by a deep, final kind of grief. He remains frozen and shaking, staring into the harbour\'s water as if his whole childhood had gone down with the ball. For a child, a favourite toy is not simply an object; it is bound up with days of play and memory. Losing it is his first real experience of something precious being gone for good, and the poem treats that grief with complete seriousness.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'How does the boy in *The Ball Poem* react to the loss?', opts: ['He remains frozen and shaking, staring into the harbour\'s water.', 'He laughs and runs home.', 'He jumps in after the ball.', 'He blames another child.'], sol: 'He is overwhelmed: still, trembling and staring.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the poem take the boy\'s grief seriously, according to the commentary?', opts: ['It is his first experience of something precious gone for good.', 'The ball was very expensive.', 'The boy was badly hurt.', 'His parents punished him.'], sol: 'The first experience of permanent loss is deeply significant.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says a favourite toy is bound up with days of play and ___.', acc: [['memory', 'memories']], sol: 'It is bound up with play and **memory**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What view of the boy\'s grief does the commentary reject?', model: 'The adult view that he is overreacting because balls can easily be replaced.', sol: 'It rejects the idea that the loss is trivial.', scheme: [['Rejects the view that he is overreacting', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does the commentary suggest the boy feels has gone down with the ball?', opts: ['his whole childhood', 'his school books', 'his pocket money', 'his friends'], sol: 'It is as if his childhood went down with the ball.' })),
  ],
  sol: 'Explain the boy\'s reaction and why the loss matters so much to him.',
}));
Q('src_no_money', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The speaker could easily end the boy\'s sorrow, or seem to, by handing him a coin or buying him a new ball. He decides not to. This is not coldness. He understands that a replacement would miss the point. The boy has not just lost a toy; he has met, for the first time, the fact that things can disappear and cannot be bought back. If an adult rushes in with money, the lesson is postponed, not avoided. So the speaker stays back and lets the boy face the moment himself.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does the speaker of *The Ball Poem* decide not to do?', opts: ['give the boy money or a new ball', 'watch the boy', 'think about the boy', 'write about the boy'], sol: 'He decides not to offer a coin or a replacement.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'According to the commentary, why is the speaker\'s decision not coldness?', opts: ['He understands that a replacement would miss the point.', 'He has no money.', 'He dislikes children.', 'He is in a hurry.'], sol: 'He wants the boy to learn, not to be distracted.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says that if an adult rushes in with money, the lesson is ___, not avoided.', acc: [['postponed', 'delayed']], sol: 'The lesson is only **postponed**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What fact has the boy met for the first time, according to the commentary?', model: 'That things can disappear and cannot be bought back.', sol: 'Permanent loss that money cannot undo.', scheme: [['Things lost cannot be bought back', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which parent acts most like the speaker of *The Ball Poem*?', opts: ['One who comforts a child over a broken toy but lets her understand it cannot be undone.', 'One who replaces the toy at once so the child stops crying.', 'One who scolds the child for crying.', 'One who pretends the toy was never broken.'], sol: 'Support without hiding the reality of the loss matches the speaker.' })),
  ],
  sol: 'Explain the speaker\'s choice and the lesson it protects.',
}));
Q('src_responsibility', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem now widens from one boy to everyone. We live surrounded by things we own, and owning things brings a duty: to care for them, and to accept that they will sometimes be taken or go missing. The boy is getting his first lesson in that kind of responsibility. The speaker even turns, briefly, to address the boy directly, as if passing on hard-won wisdom. Money, he suggests, stands outside the real experience; it can buy another object but not the one that was loved, and not the feeling that went with it.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, what first lesson does the boy in *The Ball Poem* get?', opts: ['a lesson in responsibility for what we own', 'a lesson in swimming', 'a lesson in saving money', 'a lesson in sharing toys'], sol: 'His first lesson in the responsibility that comes with owning things.' })),
    child('b', fb({ t: 2, d: 2, c: 'recall', stem: 'Things that a person owns are called ___.', acc: [['possessions', 'belongings']], sol: 'They are **possessions**.' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How does the speaker of *The Ball Poem* briefly change his way of speaking?', opts: ['He addresses the boy directly.', 'He starts to sing.', 'He speaks to the ball.', 'He speaks to the reader\'s parents.'], sol: 'For a moment he speaks to the boy himself.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What can money not buy, according to the commentary?', model: 'The particular object that was loved, and the feeling that went with it.', sol: 'Money pays for a replacement, not the loved original.', scheme: [['The loved object itself / the feeling', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'How does the poem widen at this point, according to the commentary?', opts: ['from one boy to everyone', 'from a city to a village', 'from summer to winter', 'from the past to the future'], sol: 'The lesson becomes universal.' })),
  ],
  sol: 'Theme questions: state the idea, then connect it to the boy, then to everyone.',
}));
Q('src_learning_loss', source({
  t: [3, 2], d: 4, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Near the end the poet reaches for a surprising, philosophical word, epistemology, which means the study of knowledge: how we come to know things. Joined to the idea of losing, it suggests that the boy is not just feeling sad; he is gaining knowledge. He is discovering what loss is, how it feels, and how a person can bear it and carry on. The speaker adds that everyone must learn this sooner or later, and most people must learn it again and again. The ball has become a first teacher.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *The Ball Poem*, *epistemology* means…', opts: ['the study of knowledge', 'the study of sports', 'the study of the sea', 'the study of money'], sol: 'Epistemology is the branch of philosophy that studies knowledge.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does joining this word to the idea of losing suggest about the boy?', opts: ['He is gaining knowledge of what loss is and how to bear it.', 'He is studying philosophy at school.', 'He has forgotten the ball.', 'He wants to become a scientist.'], sol: 'Grief becomes a kind of learning.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says most people must learn about loss again and ___.', acc: [['again']], sol: 'Again and **again**: loss recurs throughout life.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary call the ball a first teacher?', model: 'Losing it gives the boy his first lesson in what loss means and how to bear it.', sol: 'The loss teaches a lifelong lesson.', scheme: [['First lesson in loss and coping', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why is a philosophical word surprising in a poem about a child\'s ball, according to the commentary?', opts: ['It lifts a small event to a universal lesson.', 'It is a spelling mistake.', 'It is the name of the boy.', 'It describes a harbour.'], sol: 'The grand word shows the event\'s deeper significance.' })),
  ],
  sol: 'Explain the key word and how it turns the incident into a lesson.',
}));
Q('src_form', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem is written in free verse, without a regular rhyme scheme or metre. Its lines run on into one another, often breaking in the middle of a thought, which gives the feeling of a mind working things out as it goes. The language moves from the simple and concrete, a ball, a street, the harbour\'s water, to the abstract and philosophical: responsibility, possessions, knowledge. That movement mirrors the poem\'s meaning, as a small, physical event opens out into a lesson about life itself.',
  parts: [
    child('a', fb({ t: 3, d: 1, c: 'recall', stem: 'Poetry without a regular rhyme scheme or metre, like *The Ball Poem*, is called ___ verse.', acc: [['free']], sol: 'It is **free** verse.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Lines that run on into the next line without a pause are an example of…', opts: ['enjambment', 'alliteration', 'hyperbole', 'onomatopoeia'], sol: 'The running-on of lines is enjambment.' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What feeling do the run-on lines of *The Ball Poem* give, according to the commentary?', opts: ['a mind working things out as it goes', 'a song with a strong beat', 'a crowd shouting', 'a list of rules'], sol: 'The broken, flowing lines suggest thinking in progress.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'How does the movement of the poem\'s language mirror its meaning?', model: 'It moves from concrete things to abstract ideas, as a small event opens into a life lesson.', sol: 'Concrete to abstract mirrors incident to lesson.', scheme: [['Concrete to abstract = event to lesson', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which of these is an abstract word of the kind the commentary says the poem moves towards?', opts: ['responsibility', 'street', 'ball', 'water'], sol: 'Responsibility is abstract; the others are concrete.' })),
  ],
  sol: 'For form questions, name the verse form, describe the lines and link the language to the meaning.',
}));
Q('src_speaker', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The speaker is an adult who watches the incident from nearby. He is observant: he notices the ball\'s cheerful bouncing and the boy\'s frozen grief. He is wise: he knows that a new ball would not help. And he is compassionate, though his compassion takes the form of restraint. The tone is gentle and reflective, never mocking. Many readers feel that the speaker remembers losses of his own; that is why he understands the boy so well, and why he can see in one small moment a lesson every person must learn.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the speaker of *The Ball Poem*?', opts: ['an adult watching from nearby', 'the boy', 'the ball', 'the boy\'s teacher'], sol: 'An adult observer narrates the poem.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes the tone of *The Ball Poem*, according to the commentary?', opts: ['gentle and reflective', 'mocking and harsh', 'angry and loud', 'cheerful and comic'], sol: 'The commentary calls the tone gentle and reflective.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'The commentary says the speaker\'s compassion takes the form of ___.', acc: [['restraint']], sol: 'His compassion shows as **restraint**: he holds back.' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Name two qualities of the speaker of *The Ball Poem* that the commentary identifies.', model: 'He is observant and wise (also compassionate).', sol: 'Any two of observant, wise, compassionate.', scheme: [['Any two of: observant, wise, compassionate', 1]] })),
    child('e', mcq({ t: 1, d: 3, c: 'analysis', stem: 'Why, according to many readers, does the speaker understand the boy so well?', opts: ['He remembers losses of his own.', 'He is the boy\'s father.', 'He owned the ball.', 'He is a doctor.'], sol: 'His own experience with loss gives him insight.' })),
  ],
  sol: 'Speaker questions rely on clues: what he notices, what he decides, how he speaks.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_what_happens', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What happens to the boy\'s ball in *The Ball Poem*, and how does he react? Answer in 40–50 words.',
  model: 'While the boy is playing, the ball bounces cheerfully along a street before falling into a harbour\'s water, lost for good. The boy is shocked and overwhelmed with grief. He remains frozen and trembling as he stares into the harbour\'s water where his favourite toy has vanished.',
  sol: 'The incident in own words + the boy\'s reaction.',
}));
Q('sa_no_new_ball', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why does the speaker of *The Ball Poem* not offer the boy money or a new ball? Answer in 40–50 words.',
  model: 'The speaker feels that a replacement would be pointless. The boy is facing his first real loss, and he must learn that some things cannot be bought back. Rushing in with money would only delay this lesson. So the speaker holds back and lets the boy experience it.',
  sol: 'Reason (replacement is pointless) + the lesson the boy must learn + why the speaker holds back.',
}));
Q('sa_responsibility', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'What kind of responsibility does the boy in *The Ball Poem* begin to understand? Answer in 40–50 words.',
  model: 'The boy begins to understand the responsibility that comes with owning things. Possessions can go missing or be taken, and when that happens, money cannot bring back what was loved. He must take care of what he has and also learn to accept loss and carry on.',
  sol: 'Responsibility of ownership + the reality of the loss + what he must do.',
}));
Q('sa_epistemology', short({
  ...SA3, t: [3, 4], d: 4, c: 'analysis',
  stem: 'Near the end of *The Ball Poem* the poet uses the word *epistemology*. What does it mean, and what does it tell us about the boy? Answer in 40–50 words.',
  model: 'Epistemology means the study of knowledge, of how we come to know things. Linked to loss, it shows that the boy is not merely sad but learning: he is discovering what loss truly is, how it feels and how a person can bear it and move on.',
  sol: 'Meaning of the word + its link to loss + what the boy is discovering.',
}));
Q('sa_ball_symbol', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What does the ball symbolise in *The Ball Poem*? Answer in 40–50 words.',
  model: 'The ball symbolises the boy\'s childhood, his innocence and the carefree days of play. More widely, it stands for anything we treasure and may lose, such as people, places or opportunities. Its disappearance into the harbour\'s water marks the end of innocence and the beginning of maturity.',
  sol: 'Personal meaning (childhood, innocence) + wider meaning (anything treasured) + what the loss marks.',
}));
Q('sa_money', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'The speaker of *The Ball Poem* suggests that money cannot really replace what is lost. Explain his view. Answer in 40–50 words.',
  model: 'Money can pay for a second ball, but not the particular ball the boy loved, with all the memories of play attached to it. Money stands outside the real experience of losing. The speaker suggests that grief must be faced and understood; it cannot simply be bought away.',
  sol: 'What money can and cannot buy + why + the speaker\'s view on facing grief.',
}));
Q('sa_universal', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'How does *The Ball Poem* turn a small incident into a lesson for everyone? Answer in 40–50 words.',
  model: 'The poem begins with one child\'s lost ball, but the speaker sees in it a lesson every person must learn: that loss is part of life and must be borne. He adds that most people learn it many times, so a child\'s small grief becomes universal.',
  sol: 'From the particular incident + to the general lesson + why it applies to everyone.',
}));
Q('sa_speaker', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'Describe the speaker of *The Ball Poem*. Answer in 40–50 words.',
  model: 'The speaker is a thoughtful adult who watches the incident. He is observant, noticing both the ball\'s cheerful bouncing and the boy\'s frozen grief. He is wise and compassionate: he understands the boy\'s pain but deliberately does not interfere, because he knows the boy must learn from it.',
  sol: 'Who he is + two or three qualities with evidence in own words.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *The Ball Poem* a suitable title for the poem? Give reasons in 40–50 words.',
  model: 'Yes. The plain title names the ordinary object at the centre of the poem. Its simplicity suits a poem that begins with a child\'s toy, yet the ball becomes a symbol of childhood and of everything we lose. The modest title hides a deep meaning, as the poem does.',
  sol: 'A clear view + link to the object + link to its symbolic meaning.',
}));
Q('sa_devices', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Name two poetic devices used in *The Ball Poem* and explain their effect. Answer in 40–50 words.',
  model: 'The poem opens with a rhetorical question about what the boy can do now, which draws us into his helplessness. Repetition describes the ball\'s cheerful movement twice, making its sudden loss more painful. Both devices make the reader share the boy\'s shock and sorrow.',
  sol: 'Two devices named + where they occur (described) + effect of each.',
}));
Q('sa_apply', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'Describe a situation from a teenager\'s life that teaches the same lesson as *The Ball Poem*. Answer in 40–50 words.',
  model: 'A student loses a notebook full of carefully made notes the day before exams. Her parents could buy a new notebook, but not the hours of work inside it. She must accept the loss, rebuild what she can, and learn to look after important things more carefully.',
  sol: 'A suitable situation + why money cannot fully replace the loss + the lesson learnt.',
}));
Q('sa_tone', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe the tone of *The Ball Poem*. Answer in 40–50 words.',
  model: 'The tone is gentle, sympathetic and reflective. The speaker never mocks the boy\'s grief over a mere ball; he treats it as serious and meaningful. As the poem moves from the incident to its lesson, the tone becomes philosophical, though it remains quiet and compassionate throughout.',
  sol: 'Name the tone + evidence + how it develops.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_poet', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who wrote *The Ball Poem*? Mention two facts about the poet in 30–40 words.',
  model: 'The poem was written by John Berryman (1914–1972), an American poet. He is linked with the Confessional poets, who wrote about personal experience, and he won the Pulitzer Prize for Poetry for 77 Dream Songs.',
  sol: 'Name + any two facts (American; 1914–1972; Confessional poets; Pulitzer Prize for 77 Dream Songs).',
}));
Q('sb_where', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Where does the ball go in *The Ball Poem*, and can the boy get it back? Answer in 30–40 words.',
  model: 'The ball bounces along a street before dropping into a harbour\'s water. The boy cannot get it back; it is lost for good, which is why his grief is so deep and final.',
  sol: 'Where it goes + that it cannot be recovered.',
}));
Q('sb_dime', short({
  ...SA2, t: [4, 2], d: 2, c: 'understanding',
  stem: 'What does the word *dime* mean, and why does the speaker of *The Ball Poem* think it would be worthless to offer one? Answer in 30–40 words.',
  model: 'The dime is a small American coin worth ten cents. Offering one, or a new ball, would be worthless because it could not replace the loved ball or teach the boy anything about loss.',
  sol: 'Meaning + why money cannot help here.',
}));
Q('sb_rigid', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What does the boy\'s frozen, trembling stillness in *The Ball Poem* show about his feelings? Answer in 30–40 words.',
  model: 'It shows that he is in shock and overwhelmed by grief. He cannot move or speak; he simply stares into the harbour\'s water, unable to accept that something he loved is gone for ever.',
  sol: 'Shock and grief + the inability to accept the loss.',
}));
Q('sb_free_verse', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What is free verse, and why does it suit *The Ball Poem*? Answer in 30–40 words.',
  model: 'Free verse has no regular rhyme scheme or metre. It suits this poem because its loose, run-on lines sound like a person thinking aloud, working out the meaning of what he has just watched.',
  sol: 'Definition + why it suits the reflective content.',
}));
Q('sb_message', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'State the central message of *The Ball Poem* in 30–40 words.',
  model: 'Loss is an unavoidable part of life. Money cannot replace what we truly value, so we must learn to accept loss, bear it with courage and carry on. Growing up means learning this lesson.',
  sol: 'The main idea + one supporting point (money cannot replace; growing up).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_growing_up', long({
  ...LA, t: 2, d: 3, c: 'analysis',
  stem: 'How does *The Ball Poem* show a child\'s first step towards growing up? Answer in 100–120 words.',
  model: 'The Ball Poem shows a boy taking his first step towards maturity through a small but painful loss. The ball bounces cheerfully along a street before disappearing into a harbour\'s water. He is overwhelmed and remains frozen, staring after it. The adult speaker could buy him a second ball but chooses not to, because a replacement would teach nothing. The boy is discovering that possessions can go missing, that money cannot bring back what was loved, and that he must accept the loss and carry on. The poet uses the philosophical word epistemology to show that grief is becoming knowledge. Growing up, the poem suggests, begins when we first learn to bear loss.',
  sol: 'The incident → the boy\'s grief → the speaker\'s restraint → the lessons learnt → the key word → the conclusion. Do not quote the poem.',
}));
Q('la_boy_diary', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the boy in *The Ball Poem*. Write a diary entry about the day you lost your ball, in 100–120 words.',
  model: 'Saturday evening\n\nToday I lost my red ball, the one I have played with every day since my birthday. I was bouncing it near the boats when it leapt away from me, rolled away down the road before dropping into the dark harbour. I just stood there. I could not move. I kept staring at the spot where it had gone, hoping it would float up again. It did not. A man was watching me, but he did not offer to buy me another, and somehow I was glad. A new ball would not be my ball. I feel empty tonight, but I think I understand something now: some things, once gone, are gone for good.',
  sol: 'Diary format (first person, time marker). Content must fit the poem: the ball, a street, a harbour, the frozen grief, the watching adult, the lesson. Invented details (colour, birthday) must not contradict it. No lines quoted.',
}));
Q('la_speaker_choice', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: 'Do you agree with the speaker of *The Ball Poem* that it is better not to replace the boy\'s ball? Give a reasoned answer in 100–120 words.',
  model: 'I largely agree with the speaker. In The Ball Poem, the boy is facing his first experience of permanent loss. If an adult rushed in with a coin or a new ball, the tears might stop, but the boy would learn only that money can cover up sorrow. By holding back, the speaker allows him to understand that some things cannot be bought back, and that he must learn to accept loss and carry on. This is a lesson he will need many times in life. However, holding back should not mean ignoring the child. A kind word or a comforting presence can support him while he learns, without taking the lesson away.',
  sol: 'A clear view → the speaker\'s reasoning in own words → why the lesson matters → a balancing point (comfort without replacement) → conclusion.',
}));
Q('la_letter', long({
  ...LA, t: [2, 4], d: 3, c: 'application', bloom: 'create',
  stem: 'A younger cousin is upset after losing a favourite toy. Using ideas from *The Ball Poem*, write a letter to comfort and guide him, in 100–120 words.',
  model: 'Dear Aarav,\n\nMaasi told me you lost your toy aeroplane at the fair, and that you have been sad ever since. I understand; it was special to you. In English class we read a poem called The Ball Poem, about a boy whose ball bounced away into the sea. A man watching him did not buy him a new one, because he knew the boy needed to learn something: that some things, once lost, cannot be bought back. It hurts, but learning to accept it makes us stronger. Remember the fun you had with your aeroplane, and take good care of the things you love. I will see you on Sunday.\n\nWith love,\nDidi',
  sol: 'Informal letter format; sympathy; the poem\'s idea in own words; advice (accept, remember, care for possessions); warm close.',
}));
Q('la_symbolism', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'Discuss the symbolism of the ball in *The Ball Poem*. Answer in 100–120 words.',
  model: 'In The Ball Poem, the ball means far more than a toy. For the boy it symbolises his childhood: the carefree days of play, the innocence of our world, where nothing important is ever lost. When it bounces cheerfully away and vanishes into the harbour\'s water, that innocence goes with it. The boy\'s frozen grief shows that he feels something larger than a toy has gone. More widely, the ball stands for anything we treasure and may lose, such as friends, family, places or opportunities. The speaker\'s refusal to replace it shows that such things cannot be bought back. Through this simple object, Berryman makes a child\'s loss a symbol of a universal human experience.',
  sol: 'The ball as childhood and innocence → its loss as the end of innocence → wider symbolism → link to money and replacement → conclusion.',
}));
Q('la_relevance', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: 'Many parents today replace a lost or broken item immediately. In the light of *The Ball Poem*, is this always wise? Answer in 100–120 words.',
  model: 'Replacing a lost or broken item at once seems kind, but The Ball Poem suggests it is not always wise. When the boy\'s ball disappears into a harbour, the watching adult chooses not to buy him another, because the boy must learn that some things cannot be bought back. Children who always receive instant replacements may grow up careless with their belongings and unprepared for losses that money cannot fix, such as friendships, opportunities or loved ones. Of course, some items, like school shoes or spectacles, must be replaced. The wise approach is to comfort the child, let them feel and understand the loss, and teach care for possessions before rushing to the shops.',
  sol: 'A clear view → the poem\'s lesson in own words → consequences of instant replacement → a balancing point → conclusion.',
}));

// ================================================================ objective items
Q('mc_poet', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the poet of *The Ball Poem*?', opts: ['John Berryman', 'Robert Frost', 'Leslie Norris', 'Carolyn Wells'], sol: 'John Berryman, the American poet. The others wrote other poems in the Class 10 textbook.' }));
Q('mc_nationality', mcq({ t: 1, d: 1, c: 'recall', stem: 'John Berryman, the poet of *The Ball Poem*, was from…', opts: ['the United States', 'England', 'Wales', 'India'], sol: 'Berryman was American.' }));
Q('mc_where', mcq({ t: 1, d: 1, c: 'recall', stem: 'In *The Ball Poem*, where does the ball end up?', opts: ['in a harbour\'s water', 'on a rooftop', 'in a shop window', 'in the boy\'s schoolbag'], sol: 'It bounces into a harbour\'s water.' }));
Q('mc_reaction', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does the boy in *The Ball Poem* react to losing the ball?', opts: ['He remains frozen with grief, staring at the harbour\'s water.', 'He laughs and forgets about it.', 'He dives in to fetch it.', 'He asks the speaker for money.'], sol: 'He is overwhelmed: still, trembling and staring.' }));
Q('mc_speaker_choice', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the speaker of *The Ball Poem* not buy the boy a new ball?', opts: ['The boy must learn that loss cannot be undone with money.', 'The speaker has no money.', 'Balls are not sold nearby.', 'The boy did not ask for one.'], sol: 'A replacement would prevent the lesson.' }));
Q('mc_dime', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *The Ball Poem*, the word *dime* refers to…', opts: ['a small American coin', 'a kind of ball', 'a toy boat', 'a street in a harbour town'], sol: 'The dime is a ten-cent coin of the United States.' }));
Q('mc_intrude', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *The Ball Poem*, *intrude* means…', opts: ['interfere where one is not wanted', 'leave quickly', 'shout loudly', 'search carefully'], sol: 'To intrude is to step in uninvited.' }));
Q('mc_symbol', mcq({ t: 3, d: 2, c: 'understanding', stem: 'In *The Ball Poem*, the ball mainly symbolises…', opts: ['childhood and the things we treasure', 'wealth and power', 'sport and competition', 'danger and fear'], sol: 'It stands for childhood, innocence and anything precious we may lose.' }));
Q('mc_form', mcq({ t: 3, d: 2, c: 'recall', stem: '*The Ball Poem* is written in…', opts: ['free verse', 'rhyming couplets', 'quatrains rhyming abab', 'a sonnet form'], sol: 'It has no regular rhyme scheme or metre.' }));
Q('mc_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the central theme of *The Ball Poem*?', opts: ['learning to accept loss as part of growing up', 'the joy of playing football', 'the danger of harbours', 'the value of saving money'], sol: 'The boy\'s first loss begins his understanding of life.' }));
Q('mc_apply', mcq({ t: 2, d: 3, c: 'application', stem: 'Which SOYL-written situation teaches the lesson of *The Ball Poem*?', opts: ['Meera\'s grandfather\'s old watch is lost; a new watch cannot replace what it meant to her.', 'Meera wins a prize at the science fair.', 'Meera gets a new pen because hers ran out of ink.', 'Meera\'s team practises for a match.'], sol: 'A treasured object that money cannot truly replace mirrors the poem.' }));
Q('mc_opening', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What effect does opening *The Ball Poem* with a question have?', opts: ['It draws the reader into the boy\'s helplessness.', 'It shows the speaker does not care.', 'It tells the reader the boy\'s name.', 'It makes the poem rhyme.'], sol: 'The rhetorical question makes us share the boy\'s helpless situation.' }));
Q('mc_tone', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which word best describes the tone of *The Ball Poem*?', opts: ['sympathetic', 'sarcastic', 'humorous', 'angry'], sol: 'The speaker treats the boy\'s grief with gentle sympathy.' }));
Q('mc_money', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the speaker of *The Ball Poem* suggest about money and loss?', fixed: true, key: 'c', opts: ['Money solves every problem.', 'Money should be saved for toys.', 'Money cannot buy back what we truly lose.', 'Money matters more than toys.'], sol: 'Money stands outside the real experience of losing.' }));

Q('fb_verse', fb({ t: 3, d: 1, c: 'recall', marks: 1, stem: '*The Ball Poem* is written in ___ verse, with no regular ___ scheme.', acc: [['free'], ['rhyme']], sol: '**Free** verse, with no regular **rhyme** scheme.', scheme: [['free', 0.5], ['rhyme', 0.5]] }));
Q('fb_symbol', fb({ t: 3, d: 2, c: 'understanding', stem: 'An object that stands for an idea, as the ball in *The Ball Poem* stands for childhood, is called a ___.', acc: [['symbol']], sol: 'It is a **symbol**.' }));
Q('fb_poet', fb({ t: 1, d: 1, c: 'recall', stem: '*The Ball Poem* was written by the American poet John ___.', acc: [['Berryman']], sol: 'The poet is John **Berryman**.' }));
Q('fb_epistemology', fb({ t: 4, d: 3, c: 'understanding', stem: 'The word *epistemology*, used near the end of *The Ball Poem*, means the study of ___.', acc: [['knowledge']], sol: 'Epistemology is the study of **knowledge**.' }));

Q('ar_money', ar({ t: 2, d: 3, c: 'analysis', a: 'The speaker of *The Ball Poem* does not offer the boy a new ball.', r: 'The ball in *The Ball Poem* falls into a harbour\'s water.', key: 'b', sol: 'Both are true, but R does not explain A. The speaker holds back because the boy must learn about loss, not because of where the ball fell.' }));
Q('ar_lesson', ar({ t: 2, d: 3, c: 'analysis', a: 'The boy in *The Ball Poem* is discovering something important from his loss.', r: 'Through the lost ball, he discovers that some things cannot be bought back.', key: 'a', sol: 'Both are true, and R states exactly what he is discovering.' }));
Q('ar_form', ar({ t: 3, d: 2, c: 'understanding', a: '*The Ball Poem* is written in free verse.', r: '*The Ball Poem* follows a strict abab rhyme scheme.', key: 'c', sol: 'A is true: free verse. R is false: there is no regular rhyme scheme.' }));
Q('ar_reaction', ar({ t: 1, d: 2, c: 'understanding', a: 'The boy in *The Ball Poem* quickly forgets the ball and goes on playing.', r: 'The speaker of *The Ball Poem* watches the boy\'s reaction closely.', key: 'd', sol: 'A is false: he remains frozen with grief. R is true.' }));

Q('tf_speaker_buys', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the speaker of *The Ball Poem* buys the boy a new ball.', ans: false, sol: 'He deliberately does not; a replacement would be worthless.' }));
Q('tf_harbour', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the ball in *The Ball Poem* is lost in a harbour\'s water.', ans: true, sol: 'It bounces along a street, then into a harbour.' }));
Q('tf_universal', tf({ t: 2, d: 3, c: 'analysis', stem: 'True or false: *The Ball Poem* suggests that only children experience loss.', ans: false, sol: 'It says everyone must learn about loss, most people many times.' }));
Q('tf_question', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: *The Ball Poem* opens with a question.', ans: true, sol: 'It begins by asking what the boy can do now.' }));

Q('ord_events', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these stages of *The Ball Poem* in order (SOYL summary).',
  items: ['The ball bounces cheerfully along a street.', 'It drops into a harbour\'s water.', 'The boy remains frozen, staring after it.', 'The speaker decides not to offer money or a new ball.', 'The boy begins to understand responsibility and loss.', 'The speaker reflects that everyone must learn this.'],
  sol: 'Bouncing → into the harbour\'s water → frozen grief → restraint → the lesson → the universal reflection.',
}));
Q('ord_answer', ord({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps for writing a 40–50 word answer on the lesson of *The Ball Poem*.',
  items: ['Read the question and underline its key word.', 'State the lesson in one sentence.', 'Describe the incident in your own words.', 'Explain why money cannot help.', 'Check the word count and remove any quoted lines.'],
  sol: 'Understand the question → main point → incident → support → check length and originality.',
}));

Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word used in *The Ball Poem* with its meaning.',
  pairs: [['dime', 'a ten-cent American coin'], ['harbour', 'a sheltered stretch of water for ships'], ['rigid', 'stiff; unable to move'], ['epistemology', 'the study of knowledge']],
  sol: 'Single words from the poem with their meanings.',
}));
Q('mt_symbols', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each element of *The Ball Poem* with what it suggests.',
  pairs: [['the ball', 'childhood and things we treasure'], ['the harbour\'s water that swallows it', 'permanent loss'], ['the speaker\'s restraint', 'wise compassion'], ['the boy\'s frozen stare', 'the shock of first grief']],
  sol: 'Each element carries part of the poem\'s meaning.',
}));
Q('mt_devices', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of *The Ball Poem* with the correct term.',
  pairs: [['opening by asking what the boy can do', 'rhetorical question'], ['the ball\'s cheerful movement described twice', 'repetition'], ['lines running on without a pause', 'enjambment'], ['no regular rhyme or metre', 'free verse']],
  sol: 'Name the device by what it does in the poem.',
}));
