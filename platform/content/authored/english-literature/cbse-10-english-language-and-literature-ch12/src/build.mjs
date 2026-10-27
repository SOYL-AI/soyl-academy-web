// Build CBSE 10 English Language and Literature ch12 "The Proposal" (Anton Chekhov). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch12/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; no line of dialogue or
// stage direction from the play is quoted or closely paraphrased. Speech is reported and attributed by
// name. Students read the play in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch12', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the play itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the play's dialogue or stage directions.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract (often dialogue) with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words', '3 each'],
    ['Long answer', '100–120 words: character, theme, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight play is examined: a five-mark reference to context extract, often of dialogue; three-mark short answers of forty to fifty words; and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthor = table(
  ['About the play', ''],
  [
    ['Author', 'Anton Chekhov (1860–1904), Russian dramatist and short-story writer, a doctor by training'],
    ['Form', 'a one-act comic play: a farce'],
    ['Setting', 'the drawing room of Chubukov\'s country house in nineteenth-century Russia'],
    ['Read as', 'an English translation from Russian'],
  ],
  'Table of facts: the author is Anton Chekhov, 1860 to 1904, a Russian dramatist and short-story writer who trained as a doctor; the play is a one-act farce; it is set in the drawing room of Chubukov\'s country house in nineteenth-century Russia; it is read in English translation.',
);
const vCast = table(
  ['Character', 'Who they are (SOYL summary)'],
  [
    ['Stepan Stepanovitch Chubukov', 'a landowner; Natalya\'s father'],
    ['Natalya Stepanovna', 'his daughter; proud, sharp and eager to marry'],
    ['Ivan Vassilevitch Lomov', 'a neighbouring landowner; nervous, anxious about his health'],
    ['Guess and Squeezer (mentioned)', 'Lomov\'s dog and the Chubukovs\' dog'],
  ],
  'Table of the characters: Chubukov is a landowner and Natalya\'s father; Natalya is his daughter, proud and eager to marry; Lomov is a nervous neighbouring landowner; Guess and Squeezer are the two dogs mentioned in the play.',
);
const vStages = flow('LR', ['Lomov arrives to propose', 'Lomov alone: why he must marry', 'Quarrel 1: the Oxen Meadows', 'Lomov leaves; the truth comes out', 'Quarrel 2: Guess versus Squeezer', 'Collapse, engagement, more quarrelling'], 'Flow of the play in six movements: Lomov arrives to propose; Lomov alone explains why he must marry; the first quarrel over the Oxen Meadows; Lomov leaves and the truth comes out; the second quarrel over the dogs; collapse, engagement and more quarrelling.', 'The play in six movements (SOYL summary).');
const vQuarrels = table(
  ['', 'Quarrel 1', 'Quarrel 2'],
  [
    ['Subject', 'who owns the Oxen Meadows', 'whose dog is better, Guess or Squeezer'],
    ['How it starts', 'Lomov calls the Meadows his', 'Lomov praises Guess'],
    ['Chubukov', 'joins in, backing Natalya', 'joins in again'],
    ['How it ends', 'Lomov storms out', 'Lomov collapses; then the engagement'],
  ],
  'Comparison table of the two quarrels: the first is about who owns the Oxen Meadows, begins when Lomov calls them his, draws in Chubukov, and ends with Lomov storming out; the second is about whose dog is better, begins when Lomov praises Guess, draws in Chubukov again, and ends with Lomov collapsing before the engagement.',
  'The same pattern, an even smaller cause (SOYL summary).',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Marriage of convenience', 'Lomov\'s reasons are practical; love is never mentioned.'],
    ['Pride and possessiveness', 'Fights over land and dogs, not over anything that matters.'],
    ['Quarrelsome human nature', 'Two disputes, and a third begins at the engagement.'],
    ['Hypocrisy', 'Chubukov\'s warm welcome hides his suspicion.'],
    ['Materialism', 'Property shapes every relationship in the play.'],
  ],
  'Table of five themes with where each appears: marriage of convenience, pride and possessiveness, quarrelsome human nature, hypocrisy, and materialism.',
);
const vCharacters = table(
  ['Character', 'Traits (in SOYL\'s words)', 'Evidence'],
  [
    ['Lomov', 'nervous, hypochondriac, stubborn, easily provoked', 'stammers; complains of his heart; will not yield on land or dogs; collapses'],
    ['Natalya', 'proud, sharp-tongued, possessive, eager to marry', 'fights for the Meadows and Squeezer; hysterics on learning of the proposal'],
    ['Chubukov', 'hypocritical, hot-tempered, eager to marry off his daughter', 'private suspicion behind a warm welcome; insults; rushes the engagement'],
  ],
  'Table of the three characters: Lomov is nervous, a hypochondriac, stubborn and easily provoked; Natalya is proud, sharp-tongued, possessive and eager to marry; Chubukov is hypocritical, hot-tempered and eager to marry off his daughter.',
);
const vIrony = table(
  ['Kind of irony', 'Meaning', 'In the play (SOYL summary)'],
  [
    ['Situational', 'the outcome is the opposite of what is expected', 'a proposal turns into quarrels; champagne amid shouting'],
    ['Dramatic', 'the audience knows what a character does not', 'Natalya fights Lomov without knowing why he came'],
    ['Revealed through an aside', 'words and private thoughts differ', 'Chubukov\'s welcome versus his suspicion about a loan'],
  ],
  'Table of irony in the play: situational irony, where a proposal becomes a quarrel; dramatic irony, where Natalya does not know why Lomov came; and irony revealed through an aside, where Chubukov\'s welcome hides his suspicion.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['farce', 'a comedy built on exaggeration and absurd situations'],
    ['satire', 'humour used to mock human folly'],
    ['aside', 'a remark to the audience that other characters do not hear'],
    ['stage direction', 'an instruction about action, movement or manner of speaking'],
    ['hypochondriac', 'a person always anxious about imagined illness'],
    ['palpitations', 'a fast or irregular heartbeat'],
    ['convenience', 'what is practical or advantageous'],
  ],
  'Table of word meanings: farce, satire, aside, stage direction, hypochondriac, palpitations, and convenience.',
  'Key words for this play with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme or technique', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme or technique, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Proposal',
  goals: [
    'Retell the events of the play in sequence, in your own words',
    'Explain how the play satirises quarrelsome behaviour and marriages of convenience',
    'Describe Lomov, Natalya and Chubukov and the comic conflict between them',
    'Identify farce, irony and stage directions and explain their effect',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'The Proposal — Anton Chekhov', {
      b: `*First Flight*, drama · one-act farce · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Proposal, a one-act comedy by the Russian writer Anton Chekhov, in which a marriage proposal keeps collapsing into ridiculous quarrels. Please read the play itself in your textbook, First Flight. This lesson does not repeat its dialogue. Instead we will follow the action, understand the characters, and see how Chekhov makes us laugh at pride and greed.',
    }),
    sl('concept', 'How to study a play', {
      bl: [
        'Read the play once in *First Flight*; if you can, read it aloud with friends, one part each.',
        'Notice the **stage directions** as well as the dialogue: they show feelings and actions.',
        'In answers, **report** what characters say in your own words; never quote lines.',
        'Practise the extract questions, which use SOYL commentary on key exchanges.',
      ],
      n: 'A play is written to be performed, so study it a little differently. Read it in your textbook, and if possible read it aloud with friends. Pay attention to the stage directions, which show how characters feel and move. In answers, report what characters say in your own words instead of quoting them. Then practise with our extract questions on key exchanges.',
    }),
    sl('concept', 'The author and the play', {
      v: vAuthor,
      n: 'Anton Chekhov lived from eighteen sixty to nineteen oh four. He trained as a doctor and became one of Russia\'s greatest writers of plays and short stories. The Proposal is a one-act farce, a fast comedy built on exaggeration. It is set in the drawing room of a country house in nineteenth-century Russia, and we read it in English translation.',
    }),
    sl('concept', 'The characters', {
      v: vCast,
      n: 'There are only three characters. Chubukov is a landowner, and Natalya is his daughter. Lomov is their neighbour, also a landowner, and very nervous about his health. Two dogs are mentioned, Lomov\'s dog Guess and the Chubukovs\' dog Squeezer, and they matter more than you might expect. Learn the names well, because answers must say clearly who does what.',
    }),
    sl('diagram', 'The play in six movements', {
      b: 'One visit, two quarrels, one hurried engagement. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The play moves in six steps. Lomov arrives to propose. Alone, he explains to himself why he must marry. He and Natalya quarrel over the Oxen Meadows. He leaves, and the truth comes out. Brought back, he quarrels again, this time about dogs. He collapses, revives, and is engaged, and the quarrelling starts again. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: the arrival and the request', {
      b: 'Lomov arrives at Chubukov\'s house dressed formally. Chubukov welcomes him warmly but, in an aside to the audience, suspects he wants a loan. Nervously, Lomov explains that he has come to ask for Natalya\'s hand. Chubukov is delighted, embraces him and goes to call his daughter. Alone, Lomov reasons that he is at an age to marry and needs an orderly life, while worrying aloud about his health.',
      n: 'Lomov arrives in formal clothes. Chubukov greets him warmly, though privately he suspects his neighbour wants money. Nervously, Lomov explains that he wants to marry Natalya. Chubukov is delighted and goes to fetch her. Left alone, Lomov reasons that it is time to marry and that he needs a calm, orderly life. He never mentions love, but he mentions his heart many times.',
    }),
    sl('concept', 'Summary 2: the first quarrel', {
      b: 'Natalya enters, not knowing why Lomov has come. Leading up to his proposal, he recalls the families\' long friendship and refers to the Oxen Meadows as his. Natalya insists the Meadows belong to her family. The argument grows heated, and Chubukov returns and sides with his daughter. Threats of court action and insults about each other\'s relatives follow, and Lomov leaves, clutching his heart.',
      n: 'Natalya comes in, with no idea why Lomov is there. He takes the long road to his proposal, recalling the families\' friendship, and calls the Oxen Meadows his. Natalya says they belong to her family. Neither gives way. Chubukov joins in on his daughter\'s side, and soon there are threats of court and insults about relatives. Lomov staggers out.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_proposal',
      n: 'Your turn. Six events of the play are shuffled. Put them in the order in which they happen, from Lomov\'s arrival to the engagement.',
    }),
    sl('concept', 'Summary 3: the truth comes out', {
      b: 'After Lomov leaves, Chubukov lets slip that he had come to propose. Natalya becomes hysterical and demands that he be brought back. Chubukov fetches him, and Natalya, now all sweetness, concedes that the Meadows are his.',
      n: 'Once Lomov has gone, Chubukov reveals that he had come to propose. Natalya\'s anger turns instantly to despair, and she demands that her father bring him back. When Lomov returns, she is gentle and gives way about the Meadows. For a moment, it seems the proposal can finally be made. But Chekhov has another quarrel waiting.',
    }),
    sl('concept', 'Summary 4: the dogs, the collapse and the engagement', {
      b: 'Talk turns to hunting. Lomov praises his dog Guess; Natalya insists her family\'s Squeezer is better, and Lomov finds fault with Squeezer\'s jaw. Chubukov joins in, and the quarrel grows until Lomov collapses into a chair. Thinking him dead, the others panic. When he revives, Chubukov hurries the couple into an engagement, but they start arguing about the dogs again, and Chubukov calls for champagne.',
      n: 'Then the talk turns to hunting dogs. Lomov praises his dog Guess, and Natalya insists that Squeezer is better. Chubukov joins in, and the quarrel grows until Lomov collapses. The others think he is dead. When he revives, Chubukov rushes them into an engagement. Within moments they are arguing about the dogs again, and Chubukov calls for champagne.',
    }),
    sl('two-column', 'Theme 1: a marriage of convenience', {
      b: 'Chekhov mocks marriage treated as a practical bargain.',
      cols: [
        '**What drives the match**\n\n- Lomov feels it is time to marry\n- he wants an orderly life\n- Chubukov wants his daughter settled with a neighbour of property\n- Natalya is eager not to lose a suitor',
        '**What is missing**\n\n- any word of love\n- patience or tenderness\n- willingness to give way\n- harmony, even at the engagement',
      ],
      n: 'The first theme is the marriage of convenience. Lomov wants a wife because it is time and he needs an orderly life. Chubukov wants his daughter settled with a neighbour who owns land. Natalya does not want to lose a suitor. What is missing? Love, tenderness, and any willingness to give way. Chekhov makes us laugh, but the criticism is serious.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that theme sit others. Pride and possessiveness, because the characters fight over land and dogs. Quarrelsome human nature, because even the engagement starts an argument. Hypocrisy, in Chubukov\'s warm welcome and private suspicion. And materialism, because property shapes every relationship. In long answers, link two or three of these themes with clear evidence.',
    }),
    sl('check', 'Check: the play in everyday life', {
      chk: 'mc_apply_proposal',
      n: 'Check yourself. Two cousins planning a party fall out over a cake design. Which aspect of the play does their situation most resemble?',
    }),
    sl('concept', 'The three characters', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vCharacters,
      n: 'Let us sketch the characters. Lomov is nervous and a hypochondriac, yet stubborn and easily provoked. Natalya is proud, sharp-tongued and possessive, but desperate to marry. Chubukov is hypocritical, hot-tempered and eager to see his daughter married. None of them will give way, and that is exactly what makes the comedy work.',
    }),
    sl('two-column', 'Two quarrels, one pattern', {
      v: vQuarrels,
      cols: [
        '**What repeats**\n\n- a claim, a counter-claim, rising anger\n- Chubukov joining in\n- Lomov\'s heart troubles getting worse',
        '**What changes**\n\n- the subject grows even more trivial\n- the second quarrel ends in a collapse\n- the engagement is made, yet the quarrel goes on',
      ],
      n: 'Compare the two quarrels. The pattern repeats: a claim, a counter-claim, rising anger, Chubukov joining in, and Lomov\'s heart getting worse. What changes is the subject, which becomes even sillier, moving from land to dogs. The second quarrel ends in a collapse and an engagement, but the arguing goes on. Repetition is one of Chekhov\'s main comic tools.',
    }),
    sl('check', 'Check: Natalya\'s tears', {
      chk: 'ar_hysterics',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Technique 1: farce', {
      bl: [
        '**Exaggeration:** a proposal swallowed by disputes over a meadow and two dogs.',
        '**Extreme mood swings:** affection to fury, fury to tears.',
        '**Physical comedy:** clutching the chest, staggering out, collapsing as if dead.',
        '**Fast pace and repetition:** two quarrels on the same pattern, a third beginning at the end.',
        '**Satire:** laughter that exposes greed, pride and pettiness.',
      ],
      n: 'Why is the play a farce? It exaggerates, letting a proposal be swallowed by fights over a meadow and dogs. Moods swing wildly. There is physical comedy, from clutching the chest to collapsing as if dead. The pace is fast, and the quarrels repeat. All of this makes us laugh, and through laughter Chekhov mocks greed, pride and pettiness.',
    }),
    sl('concept', 'Technique 2: irony and stage directions', {
      v: vIrony,
      bl: [
        '**Stage directions** tell actors how to move and speak; they reveal nerves, anger, tears and collapse.',
        '**Asides** let the audience hear a character\'s private thoughts.',
      ],
      n: 'Irony runs through the play. The situation is ironic, because a proposal becomes a quarrel. There is dramatic irony, because Natalya fights Lomov without knowing why he came. And an aside reveals the gap between Chubukov\'s warm words and his suspicion. Stage directions matter too: they show nervousness, anger, tears and the collapse, which the dialogue alone cannot show.',
    }),
    sl('example', 'Asides and stage directions: SOYL\'s own scene', {
      b: 'A tiny scene written by SOYL (not from the play) to show how the devices work. A shopkeeper greets a customer:',
      bl: [
        '*Stage direction:* the shopkeeper bows low and rubs his hands together.',
        '*Spoken aloud:* the shopkeeper says how honoured he is by such a fine visitor.',
        '*Aside:* he mutters to the audience that the man still owes him for last month.',
        '*Effect:* the audience sees the gap between his words and his thoughts, which is the source of the comedy.',
      ],
      n: 'Here is a tiny scene of our own. A stage direction tells us the shopkeeper bows and rubs his hands. Aloud, he says he is honoured by his fine visitor. In an aside, he tells the audience the man still owes him money. The gap between words and thoughts makes us laugh. Now look for the same device when Chubukov welcomes Lomov in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the play. A farce is a comedy of exaggeration, and satire mocks human folly. An aside is a remark to the audience. A stage direction tells actors what to do. A hypochondriac is always anxious about imagined illness, and palpitations are a racing heartbeat. Convenience means what is practical or advantageous.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *The quarrels in* The Proposal *reveal more about the characters than the proposal does.* Discuss.',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + evidence:** the Meadows quarrel shows pride and possessiveness; Chubukov\'s switch shows hypocrisy; the dog quarrel shows that none of them can yield.',
        '**Link:** satire of quarrelsome human nature; farce through repetition.',
        '**Conclusion:** the proposal is the occasion; the quarrels are the portrait.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree. Give three points: the Meadows quarrel shows pride, Chubukov\'s switch shows hypocrisy, and the dog quarrel shows that nobody can yield. Link to the theme of quarrelsome human nature and to farce. End with one line: the proposal is only the occasion; the quarrels are the real portrait of the characters.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Lomov comes to propose; Chubukov, privately suspecting a loan, is delighted.',
        'Quarrel 1: the Oxen Meadows; Chubukov joins; Lomov leaves; Natalya learns the truth and demands his return.',
        'Quarrel 2: Guess versus Squeezer; Lomov collapses; Chubukov hurries the engagement; the quarrel resumes; champagne.',
        'Themes: marriage of convenience, pride, quarrelsomeness, hypocrisy. Techniques: farce, irony, asides, stage directions.',
        'Read the play in *First Flight*; report what characters say in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Lomov comes to propose, and Chubukov is delighted. A quarrel over the Oxen Meadows drives Lomov out, until Natalya learns why he came. A second quarrel, over the dogs, ends in a collapse and a hurried engagement, and then more quarrelling. Through farce and irony, Chekhov mocks pride, greed and marriages of convenience. Read the play, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: identify the speaker and situation first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → link to theme or technique → conclusion.',
        'Facts often confused: Guess is Lomov\'s dog, Squeezer the Chubukovs\'; Natalya does not know of the proposal during the first quarrel; she concedes the Meadows later.',
        'Name techniques precisely: farce, situational and dramatic irony, aside, stage direction.',
      ],
      n: 'Exam tips. In extract questions, first identify who is speaking and in what situation. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right: Guess is Lomov\'s dog and Squeezer the Chubukovs\'. And name techniques precisely, such as farce, dramatic irony and aside.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Proposal — study notes',
  sections: [
    {
      h: '1. About the play and the author',
      t: 1,
      b: `${READ}\n\n**Anton Chekhov** (1860–1904) was a Russian dramatist and short-story writer who trained as a doctor. *The Proposal* is a **one-act farce** set in the drawing room of Chubukov's country house in nineteenth-century Russia, read in English translation. Its three characters are **Chubukov**, a landowner; **Natalya**, his daughter; and **Lomov**, a nervous neighbouring landowner.`,
      v: vAuthor,
      terms: [['One-act play', 'A short play that takes place in a single act, without breaks between acts.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The request.** Lomov arrives formally dressed. Chubukov welcomes him while privately suspecting he wants a loan. Lomov asks for Natalya\'s hand; Chubukov is delighted and fetches her. Alone, Lomov reasons that it is time to marry and that he needs an orderly life, worrying aloud about his health.\n\n**Quarrel 1.** Natalya, unaware of the proposal, disputes Lomov\'s claim to the Oxen Meadows. Chubukov joins in on her side; threats and insults about relatives follow; Lomov leaves, clutching his heart.\n\n**The truth.** Chubukov reveals that Lomov had come to propose. Natalya becomes hysterical and demands his return. When he comes back she concedes the Meadows.\n\n**Quarrel 2.** Talk of hunting leads to a dispute over whose dog is better, Lomov\'s Guess or the Chubukovs\' Squeezer. Chubukov joins in; Lomov collapses and is thought dead.\n\n**The ending.** Lomov revives; Chubukov hurries the couple into an engagement; they resume arguing about the dogs; Chubukov calls for champagne.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Marriage of convenience:** practical reasons, no mention of love.\n- **Pride and possessiveness:** fights over land and dogs.\n- **Quarrelsome human nature:** two quarrels, and a third at the engagement.\n- **Hypocrisy:** Chubukov\'s warm welcome and private suspicion.\n- **Materialism:** property shapes every relationship.\n\n**Message:** pride and greed make people quarrel over trifles, even at moments that should be joyful; marriage built on convenience promises little harmony.',
      v: vThemes,
      terms: [['Marriage of convenience', 'A marriage made for practical or financial advantage rather than love.']],
    },
    {
      h: '4. Characters',
      t: 3,
      b: '**Lomov:** nervous (stammers his request), a hypochondriac (always worrying about his heart), practical about marriage, yet stubborn and easily provoked (will not yield on land or dogs; threatens court; collapses).\n\n**Natalya:** proud and sharp-tongued (defends the Meadows and Squeezer), possessive, eager to marry (hysterics on learning of the proposal), changeable (concedes the Meadows, then fights about dogs).\n\n**Chubukov:** hypocritical (warm words, private suspicion), hot-tempered (joins both quarrels with insults), eager to marry off his daughter (rushes the engagement).',
      v: vCharacters,
    },
    {
      h: '5. Techniques: farce, irony and stage directions',
      t: 4,
      b: '- **Farce:** exaggeration, extreme mood swings, physical comedy, fast pace, repetition.\n- **Situational irony:** a proposal becomes a quarrel; champagne amid shouting.\n- **Dramatic irony:** Natalya fights Lomov without knowing why he came.\n- **Aside:** Chubukov\'s private suspicion is shared only with the audience.\n- **Stage directions:** reveal nerves, anger, tears and the collapse.\n- **Satire:** comedy that exposes greed, pride and pettiness.',
      v: vIrony,
      terms: [
        ['Farce', 'A comedy built on exaggeration, absurd situations and physical humour.'],
        ['Dramatic irony', 'When the audience knows something a character does not.'],
      ],
    },
    {
      h: '6. The two quarrels and word meanings',
      t: 4,
      b: 'The two quarrels follow the same pattern (claim, counter-claim, rising anger, Chubukov joining in, Lomov\'s heart troubles), but the second has an even smaller cause. Repetition is a key comic tool and a comment on the characters.\n\nKey words: farce, satire, aside, stage direction, hypochondriac, palpitations, convenience.',
      v: vQuarrels,
      vs: [vWords],
    },
    {
      h: '7. Answering exam questions',
      t: 5,
      b: '**Extract-based (5 marks):** the board prints an extract, often of dialogue; SOYL practice uses commentary on key exchanges instead. Identify the speaker and situation first, then answer from the passage and your knowledge of the play.\n\n**Short answers (3 marks, 40–50 words):** point + evidence + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with evidence in your own words; a link to a theme or technique; a one-line conclusion. Extrapolation tasks (Natalya\'s diary) must stay consistent with the play.\n\nPractise with the real textbook extracts from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant events and speeches, accurately reported), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Swapping the dogs: Guess is Lomov\'s, Squeezer is the Chubukovs\'.\n2. Saying Natalya knew of the proposal during the first quarrel: she learns of it only after Lomov leaves.\n3. Forgetting that Natalya concedes the Meadows before the dog quarrel.\n4. Calling the play a tragedy or a romance: it is a farce.\n5. Quoting dialogue from memory instead of reporting it in your own words.\n\n**Remember:** read the play in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Proposal*?', 'Anton Chekhov (1860–1904), Russian dramatist and short-story writer.', 'fact', 1],
  ['What kind of play is it?', 'A one-act farce.', 'fact', 4],
  ['Where is it set?', 'The drawing room of Chubukov\'s country house in nineteenth-century Russia.', 'fact', 1],
  ['Who is Chubukov?', 'A landowner, Natalya\'s father.', 'fact', 3],
  ['Who is Lomov?', 'A nervous neighbouring landowner who comes to propose.', 'fact', 3],
  ['Who is Natalya?', 'Chubukov\'s daughter.', 'fact', 3],
  ['What does Chubukov privately suspect at first?', 'That Lomov has come to borrow money.', 'fact', 1],
  ['How does Chubukov react to the proposal?', 'With delight; he embraces Lomov and fetches Natalya.', 'fact', 1],
  ['Lomov\'s reasons for marrying', 'He feels it is time and wants an orderly life; love is never mentioned.', 'concept', 2],
  ['Lomov\'s health worry', 'Palpitations and other nervous complaints: he is a hypochondriac.', 'concept', 3],
  ['First quarrel', 'Who owns the Oxen Meadows.', 'fact', 1],
  ['Does Natalya know of the proposal during the first quarrel?', 'No; she learns of it only after Lomov leaves.', 'fact', 1],
  ['What does Lomov threaten?', 'To take the matter to court.', 'fact', 1],
  ['Natalya\'s reaction to the truth', 'Hysterics; she demands that Lomov be brought back.', 'fact', 3],
  ['What does Natalya concede when Lomov returns?', 'That the Oxen Meadows are his.', 'fact', 1],
  ['Second quarrel', 'Whose dog is better: Lomov\'s Guess or the Chubukovs\' Squeezer.', 'fact', 1],
  ['What fault does Lomov find in Squeezer?', 'A defect in the shape of his jaw (he calls him overshot).', 'fact', 1],
  ['What happens at the climax?', 'Lomov collapses and is thought dead.', 'fact', 1],
  ['How does the play end?', 'A hurried engagement, renewed quarrelling and a call for champagne.', 'fact', 1],
  ['Central satire', 'Marriage of convenience and quarrelsome, possessive human nature.', 'concept', 2],
  ['Example of dramatic irony', 'Natalya quarrels with Lomov without knowing he came to propose.', 'concept', 4],
  ['Example of situational irony', 'Champagne for an engagement while the couple are still quarrelling.', 'concept', 4],
  ['What is an aside?', 'A remark to the audience that other characters do not hear.', 'definition', 4],
  ['Role of stage directions', 'They show actions and feelings (nerves, anger, tears, collapse).', 'concept', 4],
  ['Three traits of Chubukov', 'Hypocritical, hot-tempered, eager to marry off his daughter.', 'concept', 3],
  ['Three traits of Natalya', 'Proud, possessive, eager to marry.', 'concept', 3],
  ['*farce*', 'a comedy built on exaggeration and absurd situations', 'definition', 4],
  ['*hypochondriac*', 'a person always anxious about imagined illness', 'definition', 3],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to theme or technique → conclusion (100–120 words).', 'exam-tip', 5],
  ['Most common factual slip', 'Swapping Guess and Squeezer, or saying Natalya knew of the proposal from the start.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — The Proposal',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary on an exchange in the play; read the play in First Flight.)', items: ['src_meadows'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_lomov_reasons', 'sa_natalya_reacts', 'sa_farce', 'sa_chubukov_char'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_satire', 'la_lomov_sketch'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — The Proposal',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary on exchanges in the play.)', items: [{ attempt: 1, keys: ['src_arrival', 'src_lomov_alone'] }, { attempt: 1, keys: ['src_dogs', 'src_ending'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_characters', 'sb_meadows_claim', 'sb_collapse', 'sb_champagne'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_chubukov_suspects', 'sa_meadows_cause', 'sa_dogs_quarrel', 'sa_stage_directions', 'sa_irony_proposal'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_farce_elements', 'la_stage_irony'] }, { attempt: 1, keys: ['la_diary_natalya', 'la_property_love'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 only; no removed topics for 2026-27',
    literature_rule: 'no line of dialogue, stage direction, sentence or distinctive phrase of the play; speech reported and attributed by name; summaries in SOYL words; extract items use SOYL commentary on exchanges (passage_origin soyl-commentary); devices illustrated with a SOYL-written mini-scene; single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the play',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
