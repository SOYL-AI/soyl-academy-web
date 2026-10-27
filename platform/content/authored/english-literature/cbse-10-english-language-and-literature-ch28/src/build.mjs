// Build CBSE 10 English Language and Literature ch28 "The Making of a Scientist" (Robert W. Peterson). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch28/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary, written at the level of
// events and ideas; the account is never quoted or closely paraphrased and remarks are reported.
// Students read the chapter in Footprints without Feet (NCERT supplementary reader).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { checkForbidden } from '../../cbse-10-english-language-and-literature-ch27/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch28', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the chapter itself in your supplementary reader, *Footprints without Feet* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// Short distinctive phrases (four words or fewer) that must not appear anywhere in this chapter's files.
const GUARD = ['first-rate mind', 'for the right reasons', 'neat displays', "bird's lunch", 'hint of what real', 'DNA blueprint', 'read their DNA', 'basement full of'];

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints without Feet)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints without Feet)', '100–120 words on character, theme or values: sketch, opinion, diary, letter or speech; one of two', '6'],
    ['SOYL chapter tests only', 'commentary passages with short parts on character and theme (extra practice; no extract is set from this book)', '5'],
  ],
  'Table of how a Footprints without Feet chapter is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme or values. SOYL chapter tests also include five-mark commentary passages for extra practice.',
  'CBSE 2026-27, Section C (literature): the supplementary reader is not used for extracts.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Robert W. Peterson'],
    ['Subject', 'Richard H. Ebright, an American scientist'],
    ['Genre', 'non-fiction: a biographical account'],
    ['Span', 'from Ebright\'s childhood collecting to his research at Harvard'],
    ['People', 'Ebright; his mother; Dr Frederick Urquhart (monarch research); a classmate and a college room-mate'],
  ],
  'Table of facts: the author is Robert W. Peterson; the subject is the American scientist Richard H. Ebright; it is a biographical account; it runs from his childhood collecting to his research at Harvard; the people include Ebright, his mother, Dr Frederick Urquhart, a classmate and a college room-mate.',
);
const vStages = flow('LR', ['A boy who collects', 'A mother who encourages', 'A book and the tagging', 'A lost fair and a new method', 'Experiments and the gold spots', 'College and the cell theory'], 'Flow of the account in six stages: a boy who collects; a mother who encourages; a book and the tagging; a lost fair and a new method; experiments and the gold spots; college and the cell theory.', 'The account in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Curiosity', 'Collecting, tagging and asking what the gold spots are for.'],
    ['Encouragement', 'His mother\'s trips, equipment, time and the monarch book.'],
    ['Learning from failure', 'A lost fair and a project with no result lead to better science.'],
    ['Real science', 'Questions tested by experiment, not displays.'],
    ['The right motive', 'Competing to learn, not only for prizes.'],
    ['All-round growth', 'Debating, public speaking, canoeing, photography.'],
  ],
  'Table of six themes with where each appears: curiosity, encouragement, learning from failure, real science, the right motive, and all-round growth.',
);
const vEbright = table(
  ['Ebright\'s quality', 'Evidence (in SOYL\'s words)'],
  [
    ['Curious', 'Wants to know everything about each find.'],
    ['Persistent', 'Learns from defeat and keeps testing new questions.'],
    ['Original', 'Asks what the gold spots do, which no one had asked.'],
    ['Well motivated', 'Competes to learn and do good work.'],
    ['Well-rounded', 'Debater, speaker, canoeist, photographer.'],
  ],
  'Table of Ebright\'s qualities with evidence: curious, persistent, original, well motivated and well-rounded.',
);
const vProjects = table(
  ['Stage', 'Project (SOYL summary)', 'What it taught him'],
  [
    ['Childhood', 'Tagging monarchs for Dr Urquhart', 'A hobby can serve real research'],
    ['Seventh grade', 'A display at a county fair: no prize', 'Science needs experiments'],
    ['Next', 'The cause of a caterpillar disease: no clear result', 'Keep going after a failed test'],
    ['Next', 'Why viceroys resemble monarchs', 'Test an explanation'],
    ['High school', 'The role of the gold spots on the pupa', 'A real discovery'],
  ],
  'Table of Ebright\'s projects and their lessons: tagging monarchs; a display that lost at a county fair; the cause of a caterpillar disease, with no clear result; why viceroys resemble monarchs; and the role of the gold spots, a real discovery.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['monarch', 'a large orange-and-black migrating butterfly'],
    ['migration', 'seasonal movement from one region to another'],
    ['pupa', 'the stage between caterpillar and adult'],
    ['hormone', 'a chemical messenger in a living body'],
    ['mimicry', 'one species resembling another'],
    ['tagging', 'marking animals to track them'],
    ['persistence', 'continuing despite difficulty'],
  ],
  'Table of word meanings: monarch, migration, pupa, hormone, mimicry, tagging and persistence.',
  'Key words for discussing this chapter.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme or value', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme or value, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Making of a Scientist',
  goals: [
    'Retell the stages of Richard Ebright\'s growth from collector to scientist, in your own words',
    'Explain the roles of curiosity, his mother\'s encouragement and persistence in his success',
    'Describe Ebright\'s qualities with evidence',
    'Discuss what students can learn from his life',
    'Answer 3-mark short and 6-mark long questions within the word limits',
  ],
  slides: [
    sl('title', 'The Making of a Scientist — Robert W. Peterson', {
      b: `*Footprints without Feet*, supplementary reader · biographical account · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Making of a Scientist, Robert W. Peterson\'s account of the American scientist Richard Ebright. Please read the chapter in your supplementary reader first; this lesson does not repeat it. The board tests this book through three mark short answers and a six mark long answer on character, theme and values, so we will practise those most.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *Footprints without Feet*, straight through.',
        'Use these slides for the stages of Ebright\'s life, the themes and his qualities.',
        'Explain events **in your own words**; do not memorise lines.',
        'Practise the 3-mark and 6-mark questions most: that is how the board tests this book.',
      ],
      n: 'Here is how to use this lesson. Read the chapter first. Then use these slides for the stages of Ebright\'s life, the themes, and his qualities. Explain events in your own words in every answer. And spend most of your practice on short and long answers, because the board does not set extracts from this book.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'This chapter is non-fiction. Robert W. Peterson tells the true story of Richard Ebright, who grew from a boy collecting butterflies into a scientist with new ideas about how living cells work. We meet Ebright\'s mother, the researcher Dr Frederick Urquhart, and the friends who worked with him.',
    }),
    sl('diagram', 'The account in six stages', {
      b: 'A scientist is made step by step. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The account moves through six stages. A boy collects everything he finds. His mother encourages him. A book leads him to tag monarch butterflies. He loses a science fair and learns a new method. Experiments lead to the discovery about the gold spots. And at college he develops a theory about cells. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: a collector and his mother', {
      b: 'As a child, Ebright collected butterflies above all, along with coins, fossils and stones, and wanted to know about everything he found. He was an only child. After his father died while Richard was still young, his mother became his companion and guide. She took him on trips, bought him instruments for close study and encouraged every question.',
      n: 'Richard Ebright was a born collector, especially of butterflies, and he wanted to understand everything he found. He was an only child, and his father died while he was still young. His mother then became his companion and his guide. She took him on outings, bought him equipment for studying things closely, and made sure his questions were taken seriously.',
    }),
    sl('concept', 'Summary 2: a book and the tagging', {
      b: 'His mother gave him *The Travels of Monarch X*, about the long migration of monarch butterflies. It invited readers to help research by tagging monarchs for Dr Frederick Urquhart of the University of Toronto. Ebright raised and tagged monarchs. In time the tagging became tiresome, but it had turned a hobby into a contribution to science.',
      n: 'A gift from his mother changed everything. The book, The Travels of Monarch X, described how monarch butterflies migrate, and it invited readers to tag monarchs for Dr Frederick Urquhart\'s research. Ebright began raising and tagging monarchs. The work grew dull after a while, but it had shown him that his hobby could help real science.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_life',
      n: 'Your turn. Five stages of Ebright\'s life are shuffled. Put them in order, from the young collector to the college researcher.',
    }),
    sl('concept', 'Summary 3: a lost fair and a new method', {
      b: 'In seventh grade Ebright entered a county science fair and won nothing. Studying the winners, he saw that they had carried out real experiments, not just set out displays. He changed his approach. A later project on a disease that killed monarch caterpillars gave no clear answer, but he moved on and tested the idea that viceroys benefit from resembling monarchs.',
      n: 'In seventh grade Ebright entered a county science fair and won nothing. Instead of giving up, he looked at the winners and saw that they had done real experiments rather than displays. So he changed his method. One later project, on a disease that killed monarch caterpillars, gave no clear answer. He simply moved on and tested an idea about viceroys and monarchs.',
    }),
    sl('concept', 'Summary 4: the gold spots and beyond', {
      b: 'In high school Ebright asked what the small gold spots on a monarch pupa are for. With a classmate he built equipment and showed that the spots produce a hormone the butterfly needs to develop fully. The work won honours, including at an international fair, and a chance to work in a research laboratory. At Harvard he and his room-mate studied the hormone further and proposed a theory about how cells use the instructions in DNA.',
      n: 'In high school Ebright asked a question no one had asked: what are the gold spots on a monarch pupa for? With a classmate he built equipment and found that the spots produce a hormone the butterfly needs to develop fully. This won him honours and laboratory experience. At Harvard he went further, with a new theory about how cells use their DNA.',
    }),
    sl('concept', 'Ebright\'s projects and their lessons', {
      v: vProjects,
      n: 'This table lines up Ebright\'s projects with what each taught him. Tagging showed that a hobby could serve research. The lost fair taught him to experiment. The failed disease project taught him to keep going. The viceroy project taught him to test an explanation. And the gold spots gave him a real discovery. Use these stages in long answers.',
    }),
    sl('two-column', 'Theme 1: a scientist is made, not born', {
      b: 'Talent grows when it is fed.',
      cols: [
        '**What Ebright brought**\n\n- endless curiosity\n- a sharp, original mind\n- persistence after setbacks',
        '**What helped him grow**\n\n- a mother who encouraged without pushing\n- a book that linked a hobby to research\n- science fairs, a laboratory, collaborators',
      ],
      n: 'The central theme is in the title. A scientist is made, not born. Ebright brought curiosity, a sharp mind and persistence. But he also needed help: a mother who encouraged without pushing, a book that linked his hobby to research, and science fairs and laboratories that gave him chances. In answers, show both sides of this partnership.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that idea sit other themes. Curiosity, from collecting to the gold spots. Encouragement, from his mother. Learning from failure, after the lost fair. Real science, which means testing questions by experiment. The right motive, competing to learn rather than for prizes. And all-round growth, in his debating, speaking, canoeing and photography.',
    }),
    sl('check', 'Check: Ebright\'s example today', {
      chk: 'mc_apply',
      n: 'Check yourself. A student\'s first robotics entry loses at a school fair. Which response would follow Ebright\'s example?',
    }),
    sl('concept', 'Character: Richard Ebright', {
      b: 'Every quality in an answer needs evidence, described in your own words.',
      v: vEbright,
      n: 'Let us sketch Ebright. He is curious, wanting to know about everything he finds. He is persistent, learning from defeat. He is original, asking what the gold spots do. He is well motivated, competing to learn rather than for trophies. And he is well-rounded, with interests far beyond science. Always pair each quality with an episode from the account.',
    }),
    sl('two-column', 'Ebright\'s mother: a model parent?', {
      cols: [
        '**What she did**\n\n- became his companion after his father\'s death\n- provided trips, equipment and books\n- let his interests stay his own',
        '**Questions for discussion**\n\n- Is money needed, or mainly time and attention?\n- Where does encouragement end and pressure begin?\n- What can teachers do for children without such support?',
      ],
      n: 'Ebright\'s mother is often the subject of long questions. She became his companion, gave him trips, equipment and books, and let his interests remain his own. Think about the questions on the right. Does support mainly need money, or time and attention? When does encouragement become pressure? And how can teachers help children who lack such a parent?',
    }),
    sl('check', 'Check: his mother\'s part', {
      chk: 'ar_mother',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'How Peterson tells the story', {
      bl: [
        '**Biographical account:** a true life, told by an outside writer.',
        '**Chronological order:** childhood → school → college.',
        '**Cause and effect:** each experience leads to the next.',
        '**Explanation of science:** terms like migration, pupa and hormone made clear for general readers.',
        '**A message for readers:** the qualities that make a scientist.',
      ],
      n: 'How does Peterson tell the story? It is a biographical account, a true life told by an outside writer. He follows time order, from childhood to college. He shows cause and effect, each experience leading to the next. He explains scientific ideas simply for ordinary readers. And he ends with a message about the qualities that make a scientist.',
    }),
    sl('example', 'Cause and effect: SOYL\'s own examples', {
      b: 'Practise tracing how one step leads to the next, as Peterson does. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*A torn kite made her wonder how kites fly; a library book led to a model glider; the glider won a district prize.* — a chain of cause and effect',
        '*He lost the quiz by one point, read every evening that winter, and won the next year.* — failure as a turning point',
        '*Her grandmother gave her a magnifying glass, and the garden became a laboratory.* — encouragement opening a door',
      ],
      n: 'Here are three examples of our own. A torn kite leads to a book, then a glider, then a prize: a chain of cause and effect. A boy loses a quiz, studies all winter and wins the next year: failure as a turning point. A gift of a magnifying glass turns a garden into a laboratory: encouragement opening a door. Find the same patterns in Ebright\'s story.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the chapter. A monarch is a large orange and black butterfly that migrates. Migration is seasonal travel. A pupa is the stage between caterpillar and adult. A hormone is a chemical messenger in the body. Mimicry means one species looking like another. Tagging marks animals to track them. And persistence means carrying on despite difficulty.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Ebright\'s success owed more to his mother than to himself.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** partly agree: both mattered.',
        '**Her part:** trips, equipment, the monarch book, support without pressure.',
        '**His part:** curiosity, learning from the lost fair, the gold-spot question, the right motive.',
        '**Link + conclusion:** encouragement opens the door, but effort walks through it.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: partly agree, because both mattered. Give her part: trips, equipment, the monarch book and support without pressure. Give his part: curiosity, learning from the lost fair, the gold spot question and the right motive. Then conclude: encouragement opens the door, but effort walks through it.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Ebright was a curious young collector, above all of butterflies.',
        'After his father\'s death, his mother encouraged him with trips, equipment and the monarch book.',
        'Tagging monarchs linked his hobby to research; losing a fair taught him to experiment.',
        'He discovered the hormone role of the gold spots and later proposed a theory about cells and DNA.',
        'Read the chapter in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Ebright was a curious collector. His mother encouraged him, and a book led him to tag monarchs for research. Losing a science fair taught him to experiment, and persistence led him to discover what the gold spots do. At college he developed a theory about cells. Read the chapter in your reader, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The board sets no extracts from this book: practise 3-mark answers (40–50 words) and the 6-mark long answer (100–120 words).',
        '3-mark answers: point + evidence + explanation.',
        '6-mark answers: stand → 3 points with evidence → link to a theme or value → conclusion.',
        'Facts often confused: the book came from his mother; Dr Urquhart led the tagging research; the gold spots produce a hormone, not a poison.',
        'For value questions, link Ebright\'s choices to your own learning.',
      ],
      n: 'Exam tips. This book is tested through short and long answers, not extracts. In three mark answers, give a point, evidence and an explanation. In six mark answers, take a stand and support it with three points. Get the facts right, especially about the book, Dr Urquhart and the gold spots. And for value questions, link Ebright\'s choices to your own learning.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Making of a Scientist — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Robert W. Peterson** wrote this biographical account of **Richard H. Ebright**, an American scientist. It follows Ebright from his childhood as a collector of butterflies to his research at Harvard, and asks what qualities make a scientist.`,
      v: vAuthor,
      terms: [['Biographical account', 'A true account of a person\'s life written by someone else.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The collector.** Ebright collected butterflies above all, as well as coins, fossils and stones, and wanted to understand each find.\n\n**His mother.** An only child whose father died while he was young, he was guided by his mother, who gave him trips, equipment and encouragement.\n\n**The book and the tagging.** Her gift, *The Travels of Monarch X*, invited readers to tag monarchs for Dr Frederick Urquhart\'s migration research. Ebright raised and tagged monarchs until the work grew tiresome.\n\n**The lost fair.** In seventh grade he won nothing at a county science fair and learnt that winners did real experiments. A project on a caterpillar disease gave no clear result; another tested why viceroys resemble monarchs.\n\n**The gold spots.** In high school he and a classmate showed that the gold spots on a monarch pupa produce a hormone needed for full development. The work brought honours and laboratory experience.\n\n**College.** At Harvard he and his room-mate studied the hormone and proposed a theory about how cells use the instructions in DNA.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Curiosity:** the engine of his work.\n- **Encouragement:** his mother\'s support.\n- **Learning from failure:** the lost fair and the failed project.\n- **Real science:** experiments, not displays.\n- **The right motive:** competing to learn.\n- **All-round growth:** wide interests beyond science.\n\n**Message:** a scientist is made by curiosity, support and persistence working together.',
      v: vThemes,
      terms: [['Persistence', 'Continuing with a task in spite of difficulty or failure.']],
    },
    {
      h: '4. Richard Ebright: qualities',
      t: 2,
      b: '**Curious** (wants to know about every find). **Persistent** (learns from defeat). **Original** (asks what the gold spots do). **Well motivated** (competes to learn). **Well-rounded** (debating, public speaking, canoeing, photography).\n\nIn answers, pair each quality with a specific episode.',
      v: vEbright,
    },
    {
      h: '5. His mother and other helpers',
      t: 2,
      b: '**His mother** became his companion and guide after his father\'s death, providing trips, equipment, books and encouragement without pressure. **Dr Frederick Urquhart**\'s tagging programme linked his hobby to real research. **A classmate** helped build equipment for the gold-spot work, and **his college room-mate** worked with him on the hormone. Science fairs and a research laboratory gave him opportunities.',
      v: vProjects,
    },
    {
      h: '6. How the account is written',
      t: 2,
      b: '- **Biographical account:** a true life told by an outside writer.\n- **Chronological order:** childhood → school → college.\n- **Cause and effect:** each step leads to the next.\n- **Simple explanation of science** for general readers.\n- **A message** about the qualities of a scientist.\n\nSOYL practice sentence (not from the chapter): *Her grandmother gave her a magnifying glass, and the garden became a laboratory* (encouragement opening a door).',
      terms: [['Chronological', 'Arranged in the order in which events happened.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the chapter: monarch, migration, pupa, hormone, mimicry, tagging, persistence. Use them in your own sentences, for example: *Ebright\'s persistence turned a lost science fair into a lesson.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 3,
      b: '**How this book is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) from *Footprints without Feet*, on character, theme and values. It does not set extracts from this book. SOYL chapter tests add commentary passages only as extra practice.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a theme or value; a one-line conclusion. Extrapolation tasks (Ebright\'s diary, a letter to Dr Urquhart, a speech) must stay consistent with the account.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** *Footprints without Feet* is tested through 3-mark short answers (40–50 words) and a 6-mark long answer (100–120 words) on character, theme and values (CBSE 2026-27, Section C). No extracts are set from this book.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view on character, theme or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Ebright won his first science fair: he lost, and learnt from it.\n2. Saying the gold spots produce a poison or a colour: they produce a hormone needed for full development.\n3. Mixing up who led the tagging research: Dr Frederick Urquhart.\n4. Treating his mother as pushy: she encouraged without pressure.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your supplementary reader, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Making of a Scientist*?', 'Robert W. Peterson.', 'fact', 1],
  ['Whom is the account about?', 'Richard H. Ebright, an American scientist.', 'fact', 1],
  ['Genre of the chapter', 'A biographical account (non-fiction).', 'concept', 1],
  ['What did Ebright collect as a child?', 'Butterflies above all; also coins, fossils and stones.', 'fact', 1],
  ['Who guided Ebright after his father died?', 'His mother.', 'fact', 1],
  ['Three ways his mother helped', 'Trips, equipment for close study, books (and her time).', 'concept', 2],
  ['Which book changed his hobby?', '*The Travels of Monarch X*.', 'fact', 1],
  ['What was the book about?', 'The migration of monarch butterflies.', 'fact', 1],
  ['For whom did Ebright tag monarchs?', 'Dr Frederick Urquhart of the University of Toronto.', 'fact', 1],
  ['Why did tagging lose its appeal?', 'It became dull and repetitive.', 'fact', 1],
  ['What happened at his seventh-grade county fair?', 'He won nothing.', 'fact', 1],
  ['Lesson from the lost fair', 'Real science means experiments, not displays.', 'concept', 2],
  ['The caterpillar-disease project', 'He looked for the cause (a beetle was suspected); no clear result.', 'fact', 1],
  ['The viceroy theory he tested', 'Viceroys benefit from resembling monarchs, which birds avoid.', 'fact', 1],
  ['What do the gold spots on a monarch pupa produce?', 'A hormone needed for the butterfly\'s full development.', 'fact', 1],
  ['Who helped build the gold-spot equipment?', 'A classmate.', 'fact', 1],
  ['A reward of the gold-spot research', 'Honours at fairs and work in a research laboratory while at school.', 'fact', 1],
  ['Where did Ebright go to college?', 'Harvard.', 'fact', 1],
  ['His college research', 'With his room-mate, a theory about how cells use the instructions in DNA.', 'fact', 1],
  ['Ebright\'s interests outside science', 'Debating, public speaking, canoeing, photography.', 'fact', 2],
  ['Central theme', 'A scientist is made by curiosity, support and persistence.', 'concept', 2],
  ['Five qualities of Ebright', 'Curious, persistent, original, well motivated, well-rounded.', 'concept', 2],
  ['Why did Ebright compete?', 'To learn and do good work, not just for prizes.', 'concept', 2],
  ['How is the account organised?', 'In time order, from childhood to college.', 'concept', 2],
  ['*pupa*', 'the stage between caterpillar and adult', 'definition', 1],
  ['*mimicry*', 'one species resembling another', 'definition', 1],
  ['*migration*', 'seasonal movement from one region to another', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to a theme or value → conclusion (100–120 words).', 'exam-tip', 3],
  ['How the board tests this book', '3-mark short answers and a 6-mark long answer; no extracts.', 'exam-tip', 3],
  ['Most common factual slip', 'Saying Ebright won his first fair, or that the gold spots make a poison.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — The Making of a Scientist',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_mother', 'sa_gold_spots', 'sa_viceroy'] }, { attempt: 2, keys: ['sa_all_rounder', 'sa_motive', 'sa_title'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_ebright_sketch', 'la_curiosity_today'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — The Making of a Scientist',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_collections', 'sb_tagging', 'sb_disease', 'sb_photography'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_book', 'sa_fair_lesson', 'sa_cell_theory'] }, { attempt: 2, keys: ['sa_curiosity', 'sa_failure', 'sa_mother_today'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_mother_role', 'la_failure_success'] }, { attempt: 1, keys: ['la_diary_fair', 'la_speech_fair'] }, { attempt: 1, keys: ['la_qualities', 'la_title_long'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 only (the syllabus has no separate character topic for this chapter; Ebright\'s qualities are taught under t02); no removed topics for 2026-27',
    board_pattern: 'supplementary reader: board sets 3-mark short answers and a 6-mark long answer (no extracts); bank weighted to 14 three-mark and 9 long items; 5 commentary passages fill the generic chapter-test blueprint Section A slots',
    literature_rule: 'written in SOYL words at the level of events and ideas; no sentence, phrase or quoted remark of the account; commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem; guard list of short distinctive phrases (ch27 src/guard.mjs)',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
checkForbidden(DIR, GUARD);
