// Build CBSE 10 English Language and Literature ch31 "The Book That Saved the Earth" (Claire Boiko). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch31/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary, written at the level of
// events and ideas; the play is never quoted or closely paraphrased, dialogue is reported, and the nursery
// rhymes inside the play are described, never reproduced. Students read the play in Footprints without Feet.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { checkForbidden } from '../../cbse-10-english-language-and-literature-ch27/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch31', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the play itself in your supplementary reader, *Footprints without Feet* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// D-036 guard: short distinctive phrases (four words or fewer) that must not appear in this chapter's files,
// including the opening words of the nursery rhymes the play uses.
const GUARD = ['era of the book', 'great and mighty', 'diddle diddle', 'cat and the fiddle', 'dish ran away', 'sat on a wall', 'a great fall', "king's horses", 'nincompoop', 'earthlings'];

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints without Feet)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints without Feet)', '100–120 words on character, theme or values: sketch, opinion, diary, letter or report; one of two', '6'],
  ],
  'Table of how a Footprints without Feet chapter is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme or values.',
  'CBSE 2026-27, Section C (literature): the supplementary reader is not used for extracts.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Playwright', 'Claire Boiko, an American writer of plays for young people'],
    ['Form', 'a short play: dialogue and stage directions, framed by a narrator'],
    ['Genre', 'comic science fiction with gentle satire'],
    ['Setting', 'Mars, and a public library in a small town on Earth; framed from the distant future'],
    ['Main characters', 'Think-Tank, the leader of Mars; Noodle, his assistant; Captain Omega, Lieutenant Iota and Sergeant Oop; the Historian'],
  ],
  'Table of facts about the play: written by Claire Boiko, an American writer of plays for young people; a short comic science-fiction play framed by a narrator; set on Mars and in a small-town library on Earth, framed from the distant future; characters Think-Tank, Noodle, Captain Omega, Lieutenant Iota, Sergeant Oop and the Historian.',
);
const vStages = flow('LR', ['A historian looks back', 'Mars plans an invasion', 'The crew land at a library', 'Wrong guesses about books', 'Reading the nursery rhymes', 'Panic and retreat'], 'Flow of the play in six stages: a historian looks back; Mars plans an invasion; the crew land at a library; wrong guesses about books; reading the nursery rhymes; panic and retreat.', 'The play in six stages (SOYL summary).');
const vCast = table(
  ['Character', 'Where', 'Role'],
  [
    ['Historian', 'the distant future', 'narrator who frames the story'],
    ['Think-Tank', 'Mars', 'leader who plans the invasion and directs it from a screen'],
    ['Noodle', 'Mars', 'Think-Tank\'s young assistant, quiet and sensible'],
    ['Captain Omega', 'Earth', 'commander of the advance crew'],
    ['Lieutenant Iota, Sergeant Oop', 'Earth', 'crew members who carry out orders'],
  ],
  'Table of the characters, where each is and their role: the Historian in the future as narrator; Think-Tank on Mars as the leader; Noodle on Mars as his assistant; Captain Omega on Earth as commander; Lieutenant Iota and Sergeant Oop on Earth as crew.',
);
const vMisreadings = table(
  ['What the Martians meet', 'Think-Tank\'s reading', 'What it really is'],
  [
    ['shelves of books', 'food, then devices to listen to', 'books, meant to be read'],
    ['a rhyme about a cow and the moon', 'proof that Earth has advanced space travel', 'a nonsense verse for small children'],
    ['a picture of an egg-shaped figure', 'a portrait of Think-Tank and a plan to make him fall', 'a nursery-rhyme character'],
  ],
  'Table of the Martians\' misreadings: shelves of books taken as food and listening devices; a rhyme about a cow and the moon taken as proof of space travel; a picture of an egg-shaped figure taken as a threat to Think-Tank. In reality these are books, a nonsense verse and a nursery-rhyme character.',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Misunderstanding', 'Books, rhymes and pictures are all misread.'],
    ['Pride before a fall', 'Think-Tank\'s certainty makes him foolish and then afraid.'],
    ['Wisdom is not rank', 'The junior Noodle has the sensible idea.'],
    ['Blind obedience', 'The crew follow absurd orders without a question.'],
    ['The power of books', 'A children\'s book stops an invasion.'],
    ['Fear of the unknown', 'The Martians imagine danger in what they do not understand.'],
  ],
  'Table of six themes with where each appears: misunderstanding, pride before a fall, wisdom is not rank, blind obedience, the power of books, and fear of the unknown.',
);
const vThinkTank = table(
  ['Think-Tank\'s trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Arrogant, vain', 'Boasts constantly about his huge head and brain.'],
    ['Rude, bossy', 'Talks down to Noodle and the crew.'],
    ['Overconfident', 'Announces wrong guesses as certain truth.'],
    ['Ignorant', 'Reads nursery rhymes as military reports.'],
    ['Cowardly', 'Panics at a picture and calls off the invasion.'],
  ],
  'Table of Think-Tank\'s traits with evidence: arrogant and vain, rude and bossy, overconfident, ignorant and cowardly.',
);
const vNoodle = table(
  ['Noodle\'s trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Observant', 'Notices the marks inside the books.'],
    ['Sensible', 'Suggests that books are meant to be looked at.'],
    ['Humble, polite', 'Offers ideas courteously, even when brushed aside.'],
    ['Patient', 'Puts up with Think-Tank\'s rudeness.'],
  ],
  'Table of Noodle\'s traits with evidence: observant, sensible, humble and polite, and patient.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['invasion', 'an attack to take over a place'],
    ['probe', 'a small spacecraft sent to explore'],
    ['arrogant', 'having too high an opinion of oneself'],
    ['apprentice', 'a young person learning from an expert'],
    ['literal', 'taking words in their plainest sense'],
    ['satire', 'humour that mocks human faults'],
    ['retreat', 'a withdrawal from danger'],
    ['nursery rhyme', 'a short traditional verse for small children'],
  ],
  'Table of word meanings: invasion, probe, arrogant, apprentice, literal, satire, retreat and nursery rhyme.',
  'Key words for this play with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a value or theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a value or theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Book That Saved the Earth',
  goals: [
    'Retell the play\'s events in sequence, in your own words',
    'Explain how a book of nursery rhymes foils a Martian invasion',
    'Describe Think-Tank\'s arrogance and Noodle\'s role, with evidence',
    'Discuss the humour of misunderstanding and the play\'s values',
    'Write 3-mark and 6-mark answers within the word limits',
  ],
  slides: [
    sl('title', 'The Book That Saved the Earth — Claire Boiko', {
      b: `*Footprints without Feet* (supplementary reader) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Book That Saved the Earth by Claire Boiko, a comic play in which Mars tries to invade the Earth and is stopped by a book of nursery rhymes. Please read the play in your textbook, Footprints without Feet, before you go on. This lesson does not repeat the text. The board tests this reader through short and long answers, so that is our focus.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the play once in *Footprints without Feet*.',
        'Use these slides for the sequence of events, the themes and the characters.',
        'The board asks 3-mark and 6-mark questions on this reader, not extracts: practise those most.',
        'Describe events **in your own words**; do not memorise lines.',
      ],
      n: 'Here is how to use this lesson. Read the play first. Then use these slides for the order of events, the themes, and the two key characters, Think-Tank and Noodle. The board does not print extracts from this reader; it asks short and long answers. So practise explaining, in your own words, how the Martians misread a book and why their invasion collapses.',
    }),
    sl('concept', 'The playwright and the text', {
      v: vAuthor,
      n: 'Claire Boiko was an American writer of plays for young people. This short play mixes science fiction and comedy. Most of the action happens on Mars and in a small-town library on Earth, but the whole story is framed by a historian looking back from the distant future. The characters are Martians, and their leader, Think-Tank, is one of the most comic figures in your reader.',
    }),
    sl('diagram', 'The play in six stages', {
      b: 'A powerful planet, a children\'s book. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The play moves through six stages. A historian looks back. Mars plans to invade the Earth. An advance crew lands beside a library. The Martians make wrong guesses about books. They read a book of nursery rhymes. And their leader panics and calls the whole thing off. Keep this map in mind as we go through each stage.',
    }),
    sl('concept', 'The cast', {
      v: vCast,
      n: 'Meet the cast. The Historian narrates from the future. On Mars sits Think-Tank, the boastful leader, with his young assistant Noodle beside him. On Earth is the advance crew: Captain Omega in command, with Lieutenant Iota and Sergeant Oop. Notice the arrangement: the leader stays safely at home and gives orders through a screen, while the crew do whatever he says.',
    }),
    sl('concept', 'Summary 1: a historian looks back', {
      b: 'A historian from the distant future introduces the story as history: the time a book saved the Earth from an invasion from Mars.',
      n: 'The play opens far in the future. A historian tells the audience that the Earth was once nearly invaded by Mars, and that it was saved, not by armies, but by a book. This frame makes us curious at once, because a book seems the least likely of heroes. It also tells us that the danger is past, so we can relax and laugh at what follows.',
    }),
    sl('concept', 'Summary 2: the crew land at a library', {
      b: 'Think-Tank sends an advance crew under Captain Omega. Their probe lands beside a small-town public library, full of shelves of books that the Martians have never seen before.',
      n: 'Think-Tank plans the invasion and sends an advance crew under Captain Omega to explore. Their probe lands beside a public library in a small town. To the Martians it looks like a storehouse full of strange objects on shelves. They have never seen a book. So the crew report to Mars, and everything now depends on how Think-Tank explains what they have found.',
    }),
    sl('concept', 'Summary 3: wrong guesses', {
      b: 'Think-Tank confidently declares that the books are food, then devices for listening, and the crew obey each order. Noodle quietly suggests that the marks inside are meant to be looked at.',
      n: 'Think-Tank announces one confident explanation after another. First he decides that the books are food, and the crew obey. Then he treats them as devices for listening, and the crew hold them to their ears. Each guess is wrong. It is Noodle, quiet and polite, who suggests that the marks inside are meant to be looked at. Finally, the crew read a book.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the play are shuffled. Put them in order, from the historian’s introduction to the end of the invasion.',
    }),
    sl('concept', 'Summary 4: the nursery rhymes', {
      b: 'The book is *Mother Goose*. Think-Tank reads its rhymes as facts: a cow that jumps over the moon proves Earth has advanced space travel.',
      v: vMisreadings,
      n: 'The book the crew read is Mother Goose, a collection of nursery rhymes. Think-Tank reads the rhymes as if they were military reports. A rhyme about a cow jumping over the moon convinces him that Earth has an advanced space programme, so advanced that even its animals travel in space. The audience laughs, because we know these are nonsense verses for small children.',
    }),
    sl('concept', 'Summary 5: panic and retreat', {
      b: 'A picture of an egg-shaped figure looks like Think-Tank himself. The rhyme tells of the figure\'s fall, and Think-Tank takes it as a threat. In a panic he calls off the invasion. Earth is saved.',
      n: 'Then Think-Tank sees a picture of an egg-shaped figure sitting on a wall. It looks very like him, with his huge head. When the rhyme tells of the figure’s fall, he believes Earth is planning to destroy him. The boastful leader panics and orders the Martians to abandon the invasion. And so, as the historian promised, a book has saved the Earth.',
    }),
    sl('two-column', 'Theme 1: the comedy of misunderstanding', {
      b: 'The whole plot is a chain of misreadings.',
      cols: [
        '**What the Martians think**\n\n- books are food\n- books are for listening\n- rhymes are reports\n- a picture is a threat',
        '**What the audience knows**\n\n- books are for reading\n- the marks are words\n- rhymes are nonsense verse\n- the picture is a children\'s character',
      ],
      n: 'The central theme is misunderstanding. On one side is what the Martians think: books are food, books are for listening, rhymes are reports, and a picture is a threat. On the other side is what we know: books are for reading, and rhymes are nonsense for children. The comedy comes from that gap. In answers, set the two side by side to show how the plot works.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that centre sit other themes. Pride before a fall, as Think-Tank’s certainty makes him foolish and then afraid. Wisdom is not rank, since the junior Noodle has the sensible idea. Blind obedience, as the crew follow absurd orders. The power of books, which can stop an invasion. And fear of the unknown, as the Martians imagine danger in what they do not understand.',
    }),
    sl('check', 'Check: the same mistake today', {
      chk: 'mc_apply',
      n: 'Check yourself. A team captain ignores a junior player’s sensible tactic, insists on his own plan and loses the match. Which pair of characters in the play does this most resemble?',
    }),
    sl('concept', 'Character: Think-Tank', {
      b: 'Your syllabus asks you to describe Think-Tank\'s arrogance, with evidence.',
      v: vThinkTank,
      n: 'Let us sketch Think-Tank. He is arrogant and vain, boasting constantly about his huge head and brain. He is rude and bossy, talking down to Noodle and the crew. He is overconfident, announcing wrong guesses as certain truth. He is ignorant, reading rhymes as reports. And in the end he is cowardly, panicking at a picture. Through him, the play mocks leaders who never admit a mistake.',
    }),
    sl('concept', 'Character: Noodle', {
      b: 'Noodle\'s role: the quiet voice of sense.',
      v: vNoodle,
      n: 'Noodle is Think-Tank’s opposite. He is young and low in rank, but he is observant, noticing the marks inside the books. He is sensible, suggesting that books are meant to be looked at. He is humble and polite, offering ideas courteously even when they are brushed aside. And he is patient with his rude master. Noodle shows that wisdom does not depend on position.',
    }),
    sl('two-column', 'Think-Tank and Noodle side by side', {
      cols: [
        '**Think-Tank**\n\n- the leader\n- talks, never listens\n- certain, often wrong\n- ends in panic',
        '**Noodle**\n\n- the assistant\n- listens, then speaks\n- modest, usually right\n- keeps his head',
      ],
      n: 'Put the two side by side and the play’s message is clear. Think-Tank is the leader, but he talks and never listens, and he is certain yet usually wrong. Noodle is only the assistant, but he listens before he speaks, and he is modest yet usually right. One ends in panic; the other keeps his head. A common long question asks you to compare them.',
    }),
    sl('check', 'Check: why the invasion ends', {
      chk: 'ar_retreat',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'How the play creates humour', {
      bl: [
        '**Dramatic irony:** we know what books are for; the Martians do not.',
        '**Literal reading:** nonsense rhymes treated as facts.',
        '**Character comedy:** a boastful leader who is easily frightened.',
        '**Blind obedience:** a crew that follows every absurd order.',
        '**Satire:** gentle mockery of pride and of following without thinking.',
      ],
      n: 'How does Boiko make us laugh? Through dramatic irony, because we know what books are for and the Martians do not. Through literal reading, as nonsense rhymes are treated as facts. Through character comedy, as a boastful leader turns out to be easily frightened. Through a crew that obeys every absurd order. And beneath it all lies satire, a gentle mockery of pride and of following without thinking.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the play. An invasion is an attack to take over a place. A probe is a small spacecraft sent to explore. Arrogant means having too high an opinion of oneself. An apprentice is a young learner. Literal means taking words in their plainest sense. Satire mocks human faults, a retreat is a withdrawal, and a nursery rhyme is a verse for small children.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Pride goes before a fall.* How does this apply to Think-Tank?',
      v: vLongPlan,
      bl: [
        '**Stand:** the saying fits Think-Tank exactly.',
        '**Points + evidence:** his boasts about his brain; his certainty about the books; ignoring Noodle; seeing himself in the egg-shaped figure.',
        '**Turn:** his pride produces the fear that ends the invasion.',
        '**Value + conclusion:** humility and listening are wiser than certainty.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: the saying fits Think-Tank exactly. Give points with evidence: his boasting, his certainty about the books, the way he ignores Noodle, and how he sees himself in the egg-shaped figure. Then show the turn: his pride produces the fear that ends the invasion. Finish with a value: humility and listening are wiser than certainty.',
    }),
    sl('example', 'Worked example: a 3-mark answer, step by step', {
      b: '*Question:* What part does Noodle play in the play? (40–50 words)',
      bl: [
        '**Point:** Noodle is the voice of sense.',
        '**Evidence:** he suggests that the marks in the books are meant to be looked at, when Think-Tank\'s guesses fail.',
        '**Explanation:** the humble assistant is wiser than the boastful leader, which is part of the play\'s message.',
        '**Check:** 40–50 words; own words; no quotation.',
      ],
      n: 'Now a three mark answer. Begin with a clear point: Noodle is the voice of sense. Add evidence: when Think-Tank’s guesses fail, Noodle suggests that the marks in the books are meant to be looked at. Then explain: the humble assistant is wiser than the boastful leader. Check the length, about forty to fifty words, and make sure every word is your own.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'A historian from the future tells how a book saved the Earth from Mars.',
        'The Martian crew land at a library; Think-Tank mistakes books for food, then for listening devices.',
        'Noodle suggests reading them; the crew read *Mother Goose*.',
        'Think-Tank reads the rhymes as facts, sees himself in the egg-shaped figure and calls off the invasion.',
        'Read the play in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. A historian from the future tells how a book saved the Earth. The Martian crew land at a library, and Think-Tank mistakes books for food and then for listening devices. Noodle suggests reading them, and the crew read Mother Goose. Think-Tank takes the rhymes as facts, sees himself in the egg-shaped figure and calls off the invasion. Read the play in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → value or theme → conclusion.',
        'Facts often confused: Think-Tank stays on Mars; there is no battle; the book is a children\'s rhyme book.',
        'Character questions: contrast Think-Tank\'s pride with Noodle\'s good sense.',
        'Describe the rhymes; never write them out.',
      ],
      n: 'Exam tips. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand, give three supported points, and link to a value. Get the facts right: Think-Tank stays on Mars, there is no battle, and the book is a children’s rhyme book. In character answers, contrast Think-Tank’s pride with Noodle’s good sense. Describe the rhymes; never write them out.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Book That Saved the Earth — study notes',
  sections: [
    {
      h: '1. About the text and the playwright',
      t: 1,
      b: `${READ}\n\n**Claire Boiko** was an American writer of plays for young people. *The Book That Saved the Earth* is a short comic science-fiction play, framed by a narrator from the distant future. The action takes place on Mars and in a public library in a small town on Earth.`,
      v: vAuthor,
      terms: [['Frame story', 'A story placed inside another; here a future historian introduces the events.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The frame.** A historian from the future tells the audience how a book once saved the Earth from an invasion from Mars.\n\n**The landing.** Think-Tank, the leader of Mars, sends an advance crew under Captain Omega, with Lieutenant Iota and Sergeant Oop, while he directs them from a screen with his assistant Noodle beside him. The crew land beside a small-town public library.\n\n**The guesses.** Think-Tank declares that the books are food, then devices to listen to; the crew obey each time. Noodle suggests that the marks inside are meant to be looked at.\n\n**The rhymes.** The crew read *Mother Goose*. Think-Tank takes a rhyme about a cow jumping over the moon as proof that Earth has advanced space travel.\n\n**The retreat.** A picture of an egg-shaped figure (Humpty Dumpty) looks like Think-Tank, and the rhyme tells of its fall. Believing Earth means to destroy him, he calls off the invasion. Earth is saved.',
      v: vStages,
      vs: [vCast],
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Misunderstanding:** books, rhymes and a picture are all misread.\n- **Pride before a fall:** Think-Tank\'s certainty makes him foolish and then afraid.\n- **Wisdom is not rank:** the junior Noodle has the sensible idea.\n- **Blind obedience:** the crew follow absurd orders.\n- **The power of books:** a children\'s book stops an invasion.\n- **Fear of the unknown:** the Martians imagine danger in what they do not understand.\n\n**Message:** humility, listening and careful thinking matter more than power or confidence.',
      v: vThemes,
      vs: [vMisreadings],
      terms: [['Dramatic irony', 'When the audience knows something the characters do not.']],
    },
    {
      h: '4. Think-Tank',
      t: 3,
      b: '**Arrogant and vain** (boasts about his huge head and brain). **Rude and bossy** (talks down to Noodle and the crew). **Overconfident** (announces wrong guesses as truth). **Ignorant** (reads nursery rhymes as reports). **Cowardly** (panics at a picture). He is the comic villain through whom the play mocks proud leaders who never admit a mistake.',
      v: vThinkTank,
    },
    {
      h: '5. Noodle and the crew',
      t: 3,
      b: '**Noodle:** observant, sensible, humble, polite and patient. His suggestion that books are meant to be looked at is the one that works, showing that wisdom does not depend on rank.\n\n**Captain Omega, Lieutenant Iota and Sergeant Oop:** an obedient crew who carry out every order without question. Their obedience adds to the comedy and shows what happens when nobody questions a foolish leader.',
      v: vNoodle,
    },
    {
      h: '6. Humour, satire and form',
      t: 2,
      b: '- **Dramatic irony:** the audience knows what books are for.\n- **Literal reading:** nonsense verse treated as fact.\n- **Character comedy:** a boastful leader who is easily frightened.\n- **Satire:** gentle mockery of pride and blind obedience.\n- **Form:** a play told through dialogue and stage directions, framed by a narrator.\n\nWhen writing about the rhymes, describe them (*the rhyme about a cow and the moon*); do not write out their lines.',
      terms: [['Satire', 'Humour that mocks human faults in order to expose them.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the play: invasion, probe, arrogant, apprentice, literal, satire, retreat, nursery rhyme. Use them in your own sentences, for example: *Think-Tank\'s literal reading of a nursery rhyme turned a planned invasion into a hasty retreat.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this reader is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) on *Footprints without Feet*. It does not print extracts from this reader.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a value or theme; a one-line conclusion. Extrapolation tasks (Noodle\'s diary, Captain Omega\'s report, a speech on books) must stay consistent with the play.\n\nRe-read the play in *Footprints without Feet* before a test.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** Footprints short answers (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) (CBSE 2026-27, Section C). No extracts from this reader.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Think-Tank lands on Earth: he stays on Mars and directs the crew from a screen.\n2. Saying Earth wins a battle: there is no battle; a misread book ends the invasion.\n3. Giving Think-Tank credit for the idea of reading the books: it comes from Noodle.\n4. Writing out lines of the nursery rhymes instead of describing them.\n5. Quoting lines of the play from memory instead of explaining in your own words.\n\n**Remember:** read the play in your textbook, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Book That Saved the Earth*?', 'Claire Boiko, an American writer of plays for young people.', 'fact', 1],
  ['What kind of text is it?', 'A short comic science-fiction play.', 'fact', 1],
  ['Who frames the story?', 'A historian from the distant future.', 'fact', 1],
  ['Who plans to invade the Earth?', 'Mars, led by Think-Tank.', 'fact', 1],
  ['Where is Think-Tank during the mission?', 'On Mars, directing the crew from a screen.', 'fact', 3],
  ['Who is Noodle?', 'Think-Tank\'s young, sensible assistant.', 'fact', 3],
  ['Who lands on Earth?', 'Captain Omega, Lieutenant Iota and Sergeant Oop.', 'fact', 1],
  ['Where does the crew land?', 'Beside a public library in a small town.', 'fact', 1],
  ['Think-Tank\'s first guess about books', 'That they are food.', 'fact', 1],
  ['His second guess', 'That they are devices for listening.', 'fact', 1],
  ['Whose idea is it to look at the marks inside?', 'Noodle\'s.', 'fact', 3],
  ['Which book do the Martians read?', '*Mother Goose*, a book of nursery rhymes.', 'fact', 1],
  ['The cow-and-moon rhyme, as Think-Tank reads it', 'Proof that Earth has advanced space travel.', 'concept', 2],
  ['Why does the egg-shaped figure frighten Think-Tank?', 'It looks like him, and the rhyme tells of its fall.', 'concept', 2],
  ['How does the play end?', 'Think-Tank calls off the invasion; Earth is saved without a battle.', 'fact', 1],
  ['Central theme', 'The comedy and danger of misunderstanding.', 'concept', 2],
  ['Four traits of Think-Tank', 'Arrogant, rude, overconfident, cowardly.', 'concept', 3],
  ['Four traits of Noodle', 'Observant, sensible, humble, patient.', 'concept', 3],
  ['What the Think-Tank and Noodle contrast teaches', 'Wisdom does not depend on rank; leaders should listen.', 'concept', 2],
  ['Meaning of the title', 'A children\'s book, misread by the invaders, saves the planet.', 'concept', 2],
  ['Dramatic irony in the play', 'We know what books are for; the Martians do not.', 'concept', 2],
  ['What does the play satirise?', 'Pride, and obedience without thinking.', 'concept', 2],
  ['Tone of the play', 'Light-hearted and satirical.', 'concept', 2],
  ['*arrogant*', 'having too high an opinion of oneself', 'definition', 1],
  ['*literal*', 'taking words in their plainest sense', 'definition', 1],
  ['*satire*', 'humour that mocks human faults', 'definition', 1],
  ['How this reader is examined', '3-mark short answers (40–50 words) and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → value or theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Think-Tank lands on Earth, or that Earth wins a battle.', 'exam-tip', 4],
  ['Writing about the rhymes', 'Describe them; never write out their lines.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — The Book That Saved the Earth',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_mission', 'sa_noodle_idea', 'sa_humpty'] }, { attempt: 2, keys: ['sa_title', 'sa_tt_traits', 'sa_historian'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_tt_sketch', 'la_misunderstanding'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — The Book That Saved the Earth',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_tt_who', 'sb_landing', 'sb_mother_goose', 'sb_ending'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_food_listen', 'sa_cow', 'sa_pride'] }, { attempt: 2, keys: ['sa_noodle_traits', 'sa_humour', 'sa_saved'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_contrast', 'la_title'] }, { attempt: 1, keys: ['la_noodle_diary', 'la_omega_report'] }, { attempt: 1, keys: ['la_humour', 'la_values'] }] },
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
    board_pattern: 'supplementary reader: board sets 3-mark short answers and a 6-mark long answer (no extracts); bank weighted to 14 three-mark and 9 long items; 5 commentary passages are question-bank practice only; the chapter tests follow the supplementary-reader blueprints, which have no extract section',
    literature_rule: 'written in SOYL words at the level of events and ideas; no line, phrase or dialogue of the play; speech reported; the nursery rhymes described, never written out; commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem; guard list of short distinctive phrases (ch27 src/guard.mjs)',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the play',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
checkForbidden(DIR, GUARD);
