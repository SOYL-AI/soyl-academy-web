// CBSE 10 English Language and Literature, ch13 "Dust of Snow" (Robert Frost) — question bank.
// LITERATURE RULE (CONTEXT §8): no line or phrase of the poem is reproduced. The poem is eight lines
// long, so even short phrases are avoided; only single words (crow, hemlock, rued, mood) and the title
// appear. Passages are SOYL commentary (passage_origin: soyl-commentary).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point about the poem', 1], ['Explanation or interpretation linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point about the poem', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: accurate points about the poem', 3], ['Interpretation / extrapolation: a clear, supported view', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (SOYL commentary)
Q('src_incident', source({
  t: [4, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The first half of Frost\'s poem records an incident that lasts barely a second. A crow, perched in a hemlock, disturbs a branch, and a light shower of snow falls on the speaker standing below. Nothing dramatic happens; no words are spoken. Yet Frost gives this tiny moment a whole stanza, as if to say that the smallest events deserve our attention. The details are chosen with care: a bird and a tree that readers often link with gloom, and snow that touches the speaker gently rather than burying him. The stage is set for a surprise.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which bird appears in the poem?', opts: ['a crow', 'a sparrow', 'a pigeon', 'a cuckoo'], sol: 'A crow, sitting in a hemlock, causes the snow to fall.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What actually happens in the first stanza, according to the commentary?', opts: ['Snow from a branch falls on the speaker when a crow disturbs it.', 'The speaker shoots the crow.', 'A storm uproots the hemlock.', 'The speaker climbs the tree.'], sol: 'The crow disturbs a snowy branch and a little snow falls on the speaker.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says the crow and the tree are things readers often link with ___.', acc: [['gloom']], sol: 'Both are traditionally associated with **gloom** (sadness, ill omen).' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why, according to the commentary, does Frost give a whole stanza to such a brief moment?', model: 'To suggest that even the smallest events deserve our attention.', sol: 'The space given to the moment shows its importance.', scheme: [['Small events deserve attention', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The last sentence of the commentary suggests that the second stanza will bring…', opts: ['a surprise', 'a funeral', 'a long journey', 'an argument'], sol: 'The commentary ends: the stage is set for a surprise (the unexpected lift in mood).' })),
  ],
  sol: 'Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.',
}));
Q('src_effect', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The second half of the poem turns from the event to its effect. Before the snow fell, the speaker had been in low spirits, regretting the way the day had gone. The cold touch of snow jolts him out of that mood. He does not say he becomes joyful; he says, in effect, that the rest of the day is rescued. This modesty is typical of Frost. The change is real but quiet, the kind of shift we all experience when something small, a breeze, a song or a stranger\'s smile, breaks a chain of gloomy thoughts.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How was the speaker feeling before the snow fell?', opts: ['low and regretful', 'excited and cheerful', 'angry with the crow', 'sleepy and bored'], sol: 'He was in low spirits, regretting the day.' })),
    child('b', fb({ t: 4, d: 2, c: 'recall', stem: 'The word in the poem that means *regretted* is ___.', acc: [['rued']], sol: '**Rued** means regretted; the speaker had regretted the day.' })),
    child('c', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary mean by calling the change *real but quiet*?', opts: ['His mood improves, but not into wild joy.', 'Nothing changes at all.', 'He shouts with happiness.', 'He forgets the incident at once.'], sol: 'The speaker\'s mood lifts and the day is redeemed, but the poem does not claim great joy.' })),
    child('d', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Give one example the commentary offers of a small thing that can break a chain of gloomy thoughts.', model: 'A breeze (or a song, or a stranger\'s smile).', sol: 'The commentary lists a breeze, a song or a stranger\'s smile.', scheme: [['Any one example from the commentary', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Which word best describes the effect of the snow on the speaker?', opts: ['refreshing', 'frightening', 'painful', 'boring'], sol: 'The cold touch jolts him out of his gloom: it refreshes him.' })),
  ],
  sol: 'Separate the before (regret) and after (the day rescued) and note how modest Frost keeps the change.',
}));
Q('src_symbols', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Frost could have chosen a robin and a rose bush. Instead he chose a crow and a hemlock. In much folklore the crow, black and harsh-voiced, is a bad omen. The hemlock shares its name with a poisonous plant, the one associated with the death of the Greek philosopher Socrates, so readers often take it as a sign of sorrow or death, even though the tree Frost knew is a harmless evergreen of North America. By letting these gloomy symbols bring cheer, Frost overturns our expectations. Comfort, he suggests, can come from the most unlikely sources.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'In folklore, the crow is often seen as…', opts: ['a bad omen', 'a sign of wealth', 'a symbol of spring', 'a messenger of peace'], sol: 'Black, harsh-voiced crows are traditionally linked with bad luck or death.' })),
    child('b', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why do readers often take the hemlock as a sign of sorrow or death?', opts: ['Its name is shared with a poisonous plant linked to the death of Socrates.', 'It grows only in graveyards.', 'Its leaves are black.', 'Crows never sit on it.'], sol: 'The association comes from the poisonous plant also called hemlock.' })),
    child('c', fb({ t: 3, d: 2, c: 'recall', stem: 'The Greek philosopher associated with poison hemlock is ___.', acc: [['Socrates']], sol: '**Socrates** was put to death with a drink made from poison hemlock.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'What does the commentary mean by *Frost overturns our expectations*?', model: 'Symbols we expect to bring gloom instead bring cheer to the speaker.', sol: 'The usual meanings of the crow and hemlock are reversed.', scheme: [['Gloomy symbols bring cheer instead', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does the commentary draw from the choice of symbols?', opts: ['Comfort can come from the most unlikely sources.', 'Crows should be driven away.', 'Hemlocks should be cut down.', 'Snow is always dangerous.'], sol: 'The commentary\'s last sentence states this message.' })),
  ],
  sol: 'Know the usual meaning of each symbol, then explain how the poem reverses it.',
}));
Q('src_form', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'For all its simplicity, the poem is carefully built. Its eight short lines fall into two stanzas of four, and the alternate lines of each stanza rhyme. More surprising, the whole poem is a single sentence: the thought runs on from line to line without a full stop until the very end. This running-on, called enjambment, mirrors the experience itself. The snow falls, and before we can pause, the speaker\'s mood has already lifted. Form and meaning move together, quickly and lightly, like the snow.',
  parts: [
    child('a', fb({ t: 3, d: 1, c: 'recall', stem: 'The poem has ___ stanzas of four lines each.', acc: [['two', '2']], sol: '**Two** stanzas (quatrains), eight lines in all.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What is the rhyme scheme of the poem?', opts: ['abab cdcd', 'aabb ccdd', 'abba cddc', 'no rhyme'], sol: 'Alternate lines rhyme in each stanza: abab cdcd.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'The running-on of a sentence from one line to the next without a pause is called…', opts: ['enjambment', 'alliteration', 'personification', 'hyperbole'], sol: 'Enjambment carries the sentence across line breaks.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'How does the poem\'s single sentence *mirror the experience itself*?', model: 'The sentence runs on without a pause, just as the mood lifts quickly the moment the snow falls.', sol: 'The unbroken sentence imitates the swift change.', scheme: [['Unbroken sentence matches the quick shift in mood', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How many lines does the poem have?', opts: ['eight', 'four', 'twelve', 'fourteen'], sol: 'Two stanzas of four lines: eight lines.' })),
  ],
  sol: 'For form questions, count stanzas and lines, mark the rhymes as letters, and look for where sentences end.',
}));
Q('src_tone', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The tone of the poem shifts between the stanzas. The opening is plain and matter-of-fact: a report of something that happened. The closing carries a note of gratitude and quiet relief. Frost never names the cause of the speaker\'s bad mood; we do not need to know it. Leaving it unnamed lets every reader fill in their own bad day, a failed test, a quarrel, a disappointment. That openness is one reason the poem feels personal to so many readers, a century after it was written.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How does the commentary describe the tone of the opening stanza?', opts: ['plain and matter-of-fact', 'angry and bitter', 'loud and excited', 'mysterious and frightening'], sol: 'The commentary calls the opening a plain, matter-of-fact report.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which feelings does the closing stanza carry, according to the commentary?', opts: ['gratitude and quiet relief', 'fear and panic', 'jealousy and pride', 'boredom and fatigue'], sol: 'The closing has a note of gratitude and quiet relief.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why, according to the commentary, does Frost not name the cause of the bad mood?', model: 'So that every reader can fill in their own bad day, which makes the poem feel personal.', sol: 'Leaving the cause open makes the poem universal.', scheme: [['Readers supply their own bad day; universal appeal', 1]] })),
    child('d', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary gives a failed test, a quarrel and a ___ as examples of a reader\'s bad day.', acc: [['disappointment']], sol: 'The third example is a **disappointment**.' })),
    child('e', mcq({ t: 2, d: 4, c: 'evaluation', stem: 'Which statement best explains why the poem still appeals to readers today?', opts: ['It describes a universal experience in an open way.', 'It gives detailed facts about crows.', 'It is written in modern slang.', 'It tells a long adventure story.'], sol: 'Its unnamed sadness and simple uplift are something every reader recognises.' })),
  ],
  sol: 'Tone questions: name the feeling in each stanza and the shift between them.',
}));
Q('src_theme', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Read quickly, the poem seems almost too slight to study. Read slowly, it carries one of Frost\'s favourite ideas: that nature can speak to us in small ways if we are open to it. The speaker does not climb a mountain or watch a sunset. He simply receives what the moment gives him, and he lets it change him. In an age of screens and timetables, the poem quietly asks whether we notice such moments at all, or whether we are too busy regretting our days to let them be rescued.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, what is one of Frost\'s favourite ideas?', opts: ['Nature can speak to us in small ways.', 'Cities are better than villages.', 'Birds are dangerous.', 'Winter should be avoided.'], sol: 'The commentary names this idea directly.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary mention a mountain and a sunset?', opts: ['To contrast grand experiences with the poem\'s small one', 'To describe the poem\'s setting', 'To name other poems by Frost', 'To show where the crow lives'], sol: 'The speaker is changed by something small, not by a grand view.' })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What question does the commentary say the poem asks modern readers?', model: 'Whether we notice small moments at all, or are too busy regretting our days.', sol: 'The commentary ends with this question.', scheme: [['Do we notice such moments, or are we too busy?', 1]] })),
    child('d', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the speaker simply ___ what the moment gives him.', acc: [['receives']], sol: 'He **receives** the moment and lets it change him.' })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which situation is closest to the poem\'s message?', opts: ['A worried student cheers up when a sudden drizzle cools a hot afternoon.', 'A student wins a scholarship after years of work.', 'A team practises for a tournament.', 'A family moves to a new city.'], sol: 'A small, unexpected touch of nature lifting a low mood matches the poem.' })),
  ],
  sol: 'Theme questions: state the idea, then connect it to the speaker\'s experience and to life today.',
}));
Q('src_speaker', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Who is the speaker? The poem gives us only a few clues. He is outdoors on a winter day, near a hemlock, with no other person mentioned, only a crow. He has been carrying a heavy mood, and he is honest enough to admit it. He is also open enough to be changed by something small, and grateful enough to record it. Many readers take the speaker to be Frost himself, a poet who spent much of his life on New England farms, but the poem works for anyone who has ever had a bad day.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which season is the poem set?', opts: ['winter', 'summer', 'spring', 'monsoon'], sol: 'Snow on the branches shows it is winter.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Where is the speaker when the incident takes place?', opts: ['outdoors, near a hemlock', 'inside his study', 'on a crowded train', 'beside the sea'], sol: 'The commentary places him outdoors near a hemlock.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Frost spent much of his life on farms in the region of the United States called New ___.', acc: [['England']], sol: '**New England** (north-eastern United States).' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Name two qualities of the speaker that the commentary identifies.', model: 'He is honest about his mood and open to being changed (also grateful).', sol: 'Honest, open and grateful are the three named.', scheme: [['Any two of: honest, open, grateful', 1]] })),
    child('e', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, for whom does the poem work?', opts: ['anyone who has ever had a bad day', 'only farmers in New England', 'only poets', 'only people who like crows'], sol: 'The commentary ends with this point.' })),
  ],
  sol: 'Character-of-speaker questions rely on clues: setting, mood, response.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_mood_change', short({
  ...SA3, t: [2, 1], d: 2, c: 'understanding',
  stem: 'Why is the speaker\'s day not entirely lost, in the end? Answer in 40–50 words.',
  model: 'Until then the day had gone badly and the speaker was weighed down by regret. Then a crow perched in a hemlock dislodged some snow, which fell on him. That brief, chilly shock broke his gloomy train of thought, so the hours that remained could still be enjoyed.',
  sol: 'Say what had already gone wrong (regret about the earlier part of the day), name the small natural incident in your own words, and explain how it changed the rest of the day.',
}));
Q('sa_crow_symbol', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What does the crow usually symbolise, and how is it used differently in this poem? Answer in 40–50 words.',
  model: 'The crow is usually a symbol of bad luck, gloom or even death because of its black colour and harsh voice. In this poem, however, the crow brings about something good: by shaking the snow onto the speaker, it lifts his spirits and redeems his day.',
  sol: 'Usual meaning (ill omen) + reversal in the poem (source of cheer) + effect.',
}));
Q('sa_hemlock', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Why is the hemlock an unusual choice of tree for a poem about a happier mood? Answer in 40–50 words.',
  model: 'The name hemlock recalls a poisonous plant, linked with the death of Socrates, so it suggests sorrow and death. A poet writing about cheer would normally choose a flowering tree. Frost deliberately uses a gloomy symbol to show that comfort can come from unexpected sources.',
  sol: 'Association (poison, death) + expectation (a cheerful tree) + Frost\'s purpose (unexpected comfort).',
}));
Q('sa_dust', short({
  ...SA3, t: [3, 4], d: 3, c: 'analysis',
  stem: 'Why does the poet call the snow *dust* in the title? What does this suggest? Answer in 40–50 words.',
  model: 'Dust here means fine, light particles, so the title suggests only a light sprinkling of snow, not a heavy fall. It shows how small and gentle the incident was. Yet this tiny touch is enough to change the speaker\'s mood, which is the poem\'s central idea.',
  sol: 'Meaning of dust (fine particles) + what it suggests (a tiny, gentle event) + link to theme.',
}));
Q('sa_rued', short({
  ...SA3, t: [1, 4], d: 2, c: 'understanding',
  stem: 'What does the word *rued* tell us about the speaker\'s day before the incident? Answer in 40–50 words.',
  model: 'Rued means regretted, so it tells us that the speaker had been having a bad day that he wished had gone differently. He was sad and disappointed. This makes the change at the end more striking, because part of that unhappy day is rescued by a small incident.',
  sol: 'Meaning (regretted) + what it reveals (a bad, disappointing day) + effect on the poem (sharper contrast).',
}));
Q('sa_rhyme', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'Describe the structure and rhyme scheme of the poem. Answer in 40–50 words.',
  model: 'The poem has eight short lines arranged in two stanzas of four lines each. The rhyme scheme is abab cdcd, as alternate lines rhyme. The whole poem is a single sentence that runs on across the lines, which gives it a quick, light movement.',
  sol: 'Lines and stanzas + rhyme scheme + one more feature (single sentence, enjambment).',
}));
Q('sa_nature', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'How does the poem show nature as a healer? Answer in 40–50 words.',
  model: 'The speaker is unhappy, but no person comforts him. Instead, a crow, a hemlock and a light fall of snow, all parts of nature, break his gloom. The poem suggests that nature can heal a troubled mind through even its smallest moments, if we are open to them.',
  sol: 'His troubled state + nature (not people) as the source of change + the general idea.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *Dust of Snow* a suitable title for the poem? Give reasons in 40–50 words.',
  model: 'Yes. The title names the small, light fall of snow that causes the change in the speaker\'s mood. The word dust stresses how slight the event was, which is exactly the poem\'s point: a tiny moment of nature can have a large effect on us.',
  sol: 'A clear view + link between title and event + link between title and theme.',
}));
Q('sa_universal', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Why does the poem not tell us the cause of the speaker\'s bad mood? What is the effect? Answer in 40–50 words.',
  model: 'Frost leaves the cause unstated because the poem is about the change, not the problem. As a result, every reader can imagine their own bad day in its place. This makes the poem universal and personal: anyone can relate to the sudden lift in mood.',
  sol: 'Reason (focus on the change) + effect (readers supply their own experience) + result (universal appeal).',
}));
Q('sa_irony', short({
  ...SA3, t: [3, 2], d: 4, c: 'analysis',
  stem: 'What is ironic about the way the speaker\'s mood improves? Answer in 40–50 words.',
  model: 'It is ironic because the change is brought about by a crow and a hemlock, things usually linked with bad omens, sorrow and death. Instead of deepening his gloom, they lift it. The poem reverses our expectations to show that cheer can come from unlikely places.',
  sol: 'Expectation (gloomy symbols) + outcome (cheer) + what the irony shows.',
}));
Q('sa_imagery', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Which senses does the poem\'s imagery appeal to? Explain with reference to the incident. Answer in 40–50 words.',
  model: 'The poem appeals mainly to sight and touch. We picture a dark crow in a snow-covered hemlock and the white powder falling, and we can almost feel the sudden cold of the snow on the speaker. This touch is what jolts him out of his mood.',
  sol: 'Senses (sight, touch) + examples from the incident in own words + link to the change.',
}));
Q('sa_lesson', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'What lesson can a student preparing for board exams take from the poem? Answer in 40–50 words.',
  model: 'During stressful exam days, a student may feel that a whole day has been wasted. The poem suggests noticing small pleasures, a cool breeze, birdsong, a short walk, which can break the chain of negative thoughts. One small positive moment can rescue the rest of the day.',
  sol: 'Apply the theme to the student\'s situation with concrete examples.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_poet', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who wrote *Dust of Snow*? Mention two facts about the poet in 30–40 words.',
  model: 'The poem was written by Robert Frost, an American poet (1874–1963). He is known for poems set in the countryside of New England, and he won the Pulitzer Prize for Poetry four times.',
  sol: 'Name + any two facts (American; New England settings; four Pulitzer Prizes; dates).',
}));
Q('sb_season', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'In which season is the poem set? How do you know? Answer in 30–40 words.',
  model: 'The poem is set in winter. The branches of the hemlock are covered with snow, and some of it falls on the speaker when the crow disturbs the branch. Snow on the trees shows the season clearly.',
  sol: 'Season + the evidence (snow on the branches).',
}));
Q('sb_tone_shift', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How does the tone of the poem change from the first stanza to the second? Answer in 30–40 words.',
  model: 'The first stanza is plain and descriptive, simply reporting the incident. The second stanza is reflective and grateful, as the speaker realises that the small event has lifted his mood and rescued his day.',
  sol: 'Stanza 1 (plain, descriptive) → stanza 2 (reflective, grateful).',
}));
Q('sb_hemlock_tree', short({
  ...SA2, t: 3, d: 3, c: 'understanding',
  stem: 'What kind of tree is a hemlock, and why is it linked with poison? Answer in 30–40 words.',
  model: 'The hemlock Frost knew is an evergreen conifer of North America and is not poisonous. It is linked with poison because a different, poisonous plant has the same name; that plant was used to put Socrates to death.',
  sol: 'The real tree (harmless evergreen) + the source of the association (poison hemlock, Socrates).',
}));
Q('sb_single', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What is unusual about the sentence structure of the poem? Answer in 30–40 words.',
  model: 'The whole poem is one sentence. It runs across all eight lines without a full stop until the end. This enjambment gives the poem a quick, flowing movement, like the sudden fall of snow.',
  sol: 'Feature (single sentence) + term (enjambment) + effect.',
}));
Q('sb_message', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'State the central message of the poem in 30–40 words.',
  model: 'Small, ordinary moments can change our mood and outlook. Even something linked with gloom can bring cheer. If we remain open to nature, a bad day need not stay bad all the way through.',
  sol: 'The main idea + one supporting point (unlikely sources; openness).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_small_moments', long({
  ...LA, t: 2, d: 3, c: 'analysis',
  stem: 'How does *Dust of Snow* show that small moments can have a big effect on our lives? Answer in 100–120 words.',
  model: 'Dust of Snow describes an incident that lasts only a second. A crow sitting in a hemlock shakes a light shower of snow onto the speaker, who has been in a gloomy, regretful mood. This tiny event jolts him out of his sadness and rescues the rest of his day. Frost gives such a brief moment a whole stanza, showing that the smallest happenings deserve attention. The title itself, with the word dust, stresses how slight the event was. Yet its effect is real: it changes how the speaker feels about his whole day. The poem reminds us that our moods are not fixed, and that a small, unexpected touch of nature can turn things around.',
  sol: 'Describe the incident in own words → its effect → how the poem\'s form and title stress smallness → the general message. Do not quote the poem.',
}));
Q('la_symbols', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'Discuss Frost\'s use of symbols in *Dust of Snow*. Answer in 100–120 words.',
  model: 'Frost uses two symbols that readers usually connect with gloom. The crow, with its black feathers and harsh voice, is often seen as a bad omen. The hemlock recalls a poisonous plant of the same name, the one linked with the death of Socrates, so it suggests sorrow and death. Snow, too, belongs to cold, bleak winter. Yet in this poem these very things bring cheer. When the crow shakes snow from the hemlock onto the speaker, his low mood lifts. Frost reverses the usual meanings of his symbols to make his point: comfort and joy can come from the most unlikely sources, and we should not judge things only by their usual associations.',
  sol: 'Each symbol: usual meaning → role in the poem; then the reversal and the message it carries.',
}));
Q('la_diary', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the speaker of the poem. Write a diary entry about the day the snow fell on you, in 100–120 words.',
  model: 'Tuesday, late evening\n\nThis morning began badly. Everything seemed to go wrong, and by noon I was sure the day was wasted. I went out for a walk, lost in gloomy thoughts, and stopped beneath a snowy hemlock at the edge of the field. A crow, settling on a branch above me, sent a shower of powdery snow onto my head and shoulders. It was so sudden and so cold that I laughed out loud. Strangely, the dark bird and the dark tree had cheered me up. I walked home lighter, and the afternoon went far better than the morning. Perhaps a day is never entirely lost.',
  sol: 'Diary format (day/time, first person). Content must fit the poem: winter, hemlock, crow, snow, low mood, the lift. Invented details (the walk, laughing) must be consistent with the poem. No lines quoted.',
}));
Q('la_relevance', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: 'Many teenagers today feel stressed by studies and screens. How is *Dust of Snow* relevant to them? Answer in 100–120 words.',
  model: 'Dust of Snow is highly relevant to stressed teenagers. Its speaker is having a day he regrets, much like a student after a poor test or a quarrel. What changes his mood is not a big event but a tiny touch of nature: snow shaken down by a crow. Teenagers who spend long hours with books and screens often miss such moments. The poem suggests stepping outside, noticing a breeze, a bird or rain, and letting it break a chain of negative thoughts. It also teaches that one bad morning need not spoil the whole day. In this way the poem offers a simple, practical lesson in resilience and mindfulness.',
  sol: 'A clear view + the poem\'s situation in own words + connection to teenage stress + practical application + conclusion.',
}));
Q('la_letter', long({
  ...LA, t: [2, 4], d: 3, c: 'application', bloom: 'create',
  stem: 'Write a letter to a friend who has been feeling low, recommending *Dust of Snow* and explaining why it might help, in 100–120 words.',
  model: 'Dear Ishaan,\n\nYou sounded low on the phone yesterday, so I want to share a poem we studied: Dust of Snow by Robert Frost. It is only eight lines long, but it stayed with me. The speaker is having a day he regrets when a crow in a hemlock shakes some snow onto him. That small, cold surprise lifts his mood and rescues his day. What I like is that the change comes from things we usually think of as gloomy. Please read it in our textbook. Then go for a walk and notice small things around you. One good moment can change a whole day.\n\nYour friend,\nNeha',
  sol: 'Informal letter format; a summary of the poem in own words; the reason it helps; a practical suggestion; the textbook pointer.',
}));
Q('la_style', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'How does Frost\'s simple style suit the theme of *Dust of Snow*? Answer in 100–120 words.',
  model: 'Frost writes Dust of Snow in plain, everyday words, with eight short lines in two stanzas and a regular rhyme scheme, abab cdcd. There are few difficult words besides rued and hemlock. The whole poem is a single sentence that runs on from line to line. This simplicity suits the theme perfectly. The poem is about a small, ordinary incident that has a quiet but real effect, so a grand or complicated style would feel wrong. The quick, unbroken sentence mirrors how swiftly the speaker\'s mood changes. Like the light dust of snow itself, the style is brief and gentle, yet it leaves a lasting impression on the reader.',
  sol: 'Features of style (diction, length, rhyme, single sentence) → how each suits the theme of a small, quick change.',
}));

// ================================================================ objective items
Q('mc_poet', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the poet of *Dust of Snow*?', opts: ['Robert Frost', 'Leslie Norris', 'Ogden Nash', 'Carolyn Wells'], sol: 'Robert Frost, the American poet. The others wrote other poems in the Class 10 textbook.' }));
Q('mc_nationality', mcq({ t: 1, d: 1, c: 'recall', stem: 'Robert Frost was a poet from…', opts: ['the United States', 'England', 'India', 'Mexico'], sol: 'He was American, known for poems of rural New England.' }));
Q('mc_tree', mcq({ t: 1, d: 1, c: 'recall', stem: 'On which tree is the crow sitting?', opts: ['a hemlock', 'a banyan', 'an oak', 'a maple'], sol: 'The crow is in a hemlock.' }));
Q('mc_rued', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In the poem, *rued* means…', opts: ['regretted', 'enjoyed', 'forgot', 'planned'], sol: '*Rue* = to regret.' }));
Q('mc_dust', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In the title, *dust* refers to…', opts: ['fine particles of snow', 'dirt from the road', 'smoke from a chimney', 'sand from a desert'], sol: 'Dust here means fine, powdery snow.' }));
Q('mc_scheme', mcq({ t: 3, d: 2, c: 'recall', stem: 'The rhyme scheme of the poem is…', opts: ['abab cdcd', 'aabb ccdd', 'abcd abcd', 'abba cddc'], sol: 'Alternate lines rhyme in each stanza: abab cdcd.' }));
Q('mc_device_enj', mcq({ t: 3, d: 3, c: 'understanding', stem: 'The poem is a single sentence running across eight lines. Which device is this?', opts: ['enjambment', 'simile', 'onomatopoeia', 'refrain'], sol: 'Enjambment: a sentence continuing across line breaks.' }));
Q('mc_crow_omen', mcq({ t: 3, d: 2, c: 'understanding', stem: 'The crow is traditionally regarded as a symbol of…', opts: ['bad luck or gloom', 'wisdom and learning', 'wealth and prosperity', 'love and romance'], sol: 'In folklore, crows are often omens of misfortune.' }));
Q('mc_mood_before', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Before the incident, the speaker\'s mood was…', opts: ['gloomy and regretful', 'joyful and excited', 'curious and playful', 'angry and violent'], sol: 'He had been regretting his day.' }));
Q('mc_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the central theme of the poem?', opts: ['A small moment of nature can change one\'s mood.', 'Birds should be protected in winter.', 'Winter is the cruellest season.', 'Trees are useful to humans.'], sol: 'The poem shows a tiny natural event lifting a low mood.' }));
Q('mc_irony', mcq({ t: [3, 2], d: 3, c: 'analysis', stem: 'What is surprising about the source of the speaker\'s improved mood?', opts: ['It comes from things usually linked with gloom.', 'It comes from a letter from a friend.', 'It comes from a holiday.', 'It comes from a sunny sky.'], sol: 'The crow and hemlock usually suggest gloom, yet they bring cheer.' }));
Q('mc_apply', mcq({ t: 2, d: 3, c: 'application', stem: 'Which of these SOYL-written situations best illustrates the idea of the poem?', opts: ['Upset after a match loss, Kabir smiles when a kitten curls up on his feet.', 'Kabir buys a new cricket bat for the next season.', 'Kabir\'s team wins the district final.', 'Kabir studies for six hours without a break.'], sol: 'A small, unexpected natural moment lifting a low mood mirrors the poem.' }));
Q('mc_stanza2', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does the second stanza mainly describe?', opts: ['the effect of the incident on the speaker', 'the crow\'s nest', 'the speaker\'s journey home', 'a conversation with a friend'], sol: 'Stanza 1 gives the incident; stanza 2 gives its effect.' }));
Q('mc_tone_end', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which word best describes the tone at the end of the poem?', opts: ['grateful', 'bitter', 'fearful', 'mocking'], sol: 'The speaker is thankful that his day has been rescued.' }));

Q('fb_lines', fb({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'The poem has ___ lines arranged in ___ stanzas.', acc: [['eight', '8'], ['two', '2']], sol: '**Eight** lines in **two** stanzas (quatrains).', scheme: [['eight', 0.5], ['two', 0.5]] }));
Q('fb_scheme', fb({ t: 3, d: 2, c: 'recall', stem: 'Write the rhyme scheme of the poem: ___', acc: [['abab cdcd', 'abab, cdcd', 'ababcdcd']], sol: 'Alternate lines rhyme: **abab cdcd**.' }));
Q('fb_poet', fb({ t: 1, d: 1, c: 'recall', stem: 'Robert Frost won the ___ Prize for Poetry four times.', acc: [['Pulitzer']], sol: 'He won the **Pulitzer** Prize for Poetry four times.' }));
Q('fb_symbol', fb({ t: 3, d: 2, c: 'understanding', stem: 'Things that stand for ideas, such as the crow for ill omen, are called ___.', acc: [['symbols', 'symbol']], sol: 'They are **symbols**; the device is symbolism.' }));

Q('ar_symbol', ar({ t: 3, d: 3, c: 'analysis', a: 'The crow and the hemlock bring about a positive change in the speaker.', r: 'The crow and the hemlock are usually associated with gloom and death.', key: 'b', sol: 'Both are true, but R does not explain A; R is the usual meaning that the poem reverses. The explanation for A is the snow they shake down.' }));
Q('ar_title', ar({ t: [3, 4], d: 3, c: 'analysis', a: 'The title uses the word dust to describe the snow.', r: 'Only a light sprinkling of snow falls on the speaker.', key: 'a', sol: 'Both are true, and the lightness of the snowfall is why it is called dust.' }));
Q('ar_rhyme', ar({ t: 3, d: 2, c: 'understanding', a: 'The poem is written in two stanzas of four lines each.', r: 'The poem has no rhyme.', key: 'c', sol: 'A is true: two quatrains. R is false: the rhyme scheme is abab cdcd.' }));
Q('ar_mood', ar({ t: 2, d: 3, c: 'analysis', a: 'The speaker\'s whole day becomes joyful from morning to night.', r: 'The incident helps rescue the remainder of the day.', key: 'd', sol: 'A is false: the poem says only the rest of the day was rescued; the earlier part had already been regretted. R is true.' }));

Q('tf_winter', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the poem is set on a winter day.', ans: true, sol: 'Snow on the hemlock places it in winter.' }));
Q('tf_people', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: a friend of the speaker comforts him in the poem.', ans: false, sol: 'No person appears; only a crow, a hemlock and snow.' }));
Q('tf_sentence', tf({ t: 3, d: 2, c: 'recall', stem: 'True or false: the poem consists of a single sentence.', ans: true, sol: 'It runs across all eight lines with one full stop at the end.' }));
Q('tf_poison', tf({ t: 3, d: 4, c: 'analysis', stem: 'True or false: the North American hemlock that Frost knew is itself the poisonous plant that killed Socrates.', ans: false, sol: 'They share a name only: the tree is a harmless evergreen conifer; the poison came from a different plant called hemlock. Readers still treat the name as a symbol of death.' }));

Q('ord_experience', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the stages of the speaker\'s experience in order (SOYL summary).',
  items: ['The speaker is in a regretful mood.', 'He is standing under a snowy hemlock.', 'A crow disturbs a branch above him.', 'Fine snow falls on him.', 'His spirits lift.', 'He feels the rest of the day is rescued.'],
  sol: 'Mood → setting → crow → snow → lift → day rescued.',
}));
Q('ord_answer', ord({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps for writing a 40–50 word answer on the poem\'s message.',
  items: ['Read the question and underline its key word.', 'State the message in one sentence.', 'Support it with the incident in your own words.', 'Add one line on how the symbols or form help.', 'Check the word count and remove any quoted lines.'],
  sol: 'Understand the question → main point → evidence in own words → literary support → check length and originality.',
}));

Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word with its meaning in the context of the poem.',
  pairs: [['rued', 'regretted'], ['dust', 'fine particles'], ['hemlock', 'an evergreen tree whose name recalls a poison'], ['mood', 'a state of mind or feeling']],
  sol: 'Single words from the poem with their meanings.',
}));
Q('mt_symbols', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each element of the poem with what it usually symbolises or suggests.',
  pairs: [['crow', 'ill omen, bad luck'], ['hemlock', 'sorrow, death'], ['dust of snow', 'a small, refreshing touch of nature'], ['the rescued day', 'renewed hope']],
  sol: 'The first two are traditional associations that the poem reverses; the last two are what the poem itself suggests.',
}));
Q('mt_devices', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of the poem with the correct term.',
  pairs: [['one sentence running across eight lines', 'enjambment'], ['alternate lines rhyming', 'rhyme scheme abab cdcd'], ['the crow standing for misfortune', 'symbolism'], ['cheer coming from gloomy symbols', 'irony']],
  sol: 'Name the device by what it does in the poem.',
}));
