// Build CBSE 10 English Language and Literature ch30 "Bholi" (K. A. Abbas). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch30/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary, written at the level of
// events and ideas; the story is never quoted or closely paraphrased and speech is reported.
// SENSITIVITY: disability, appearance, stammering, dowry and gender discrimination are handled with respect
// and age-appropriately (see questions.mjs header).
// Students read the chapter in Footprints without Feet (NCERT supplementary reader).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { checkForbidden } from '../../cbse-10-english-language-and-literature-ch27/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch30', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the chapter itself in your supplementary reader, *Footprints without Feet* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// Short distinctive phrases (four words or fewer) that must not appear anywhere in this chapter's files.
const GUARD = ['her masterpiece', 'contemptible coward', 'pock-mark', 'Bh-Bh', 'simpleton', 'dumb animal', 'dumb cow'];

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
    ['Author', 'K. A. (Khwaja Ahmad) Abbas (1914–1987), writer, journalist and film-maker'],
    ['Genre', 'short story with a social message'],
    ['Setting', 'a village in northern India'],
    ['Main characters', 'Bholi (Sulekha); her father, Ramlal; her mother; the teacher; the Tehsildar; Bishamber Nath'],
    ['Issues', 'girls\' education, disability and mockery, dowry, consent in marriage'],
  ],
  'Table of facts: the author is K. A. Abbas, 1914 to 1987, a writer, journalist and film-maker; it is a short story with a social message set in a north Indian village; the main characters are Bholi, whose real name is Sulekha, her father Ramlal, her mother, the teacher, the Tehsildar and Bishamber Nath; the issues are girls\' education, disability and mockery, dowry, and consent in marriage.',
);
const vStages = flow('LR', ['A neglected child', 'A school opens', 'A kind teacher', 'Years of learning', 'The proposal', 'The wedding and the refusal'], 'Flow of the story in six stages: a neglected child; a school opens; a kind teacher; years of learning; the proposal; the wedding and the refusal.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Education as empowerment', 'School turns a silent child into a confident woman.'],
    ['Dowry', 'A last-minute demand humiliates a family; Bholi rejects it.'],
    ['Gender discrimination', 'Girls valued mainly for marriage; no one asks Bholi.'],
    ['Disability and mockery', 'A child silenced by how others treat her.'],
    ['The power of kindness', 'One patient teacher changes a life.'],
    ['Self-respect', 'Bholi chooses dignity over a humiliating marriage.'],
  ],
  'Table of six themes with where each appears: education as empowerment, dowry, gender discrimination, disability and mockery, the power of kindness, and self-respect.',
);
const vChange = table(
  ['', 'Before school', 'On her wedding day'],
  [
    ['Speech', 'stammers; barely speaks', 'speaks clearly before everyone'],
    ['Self-image', 'feels like a burden', 'knows her own worth'],
    ['Others\' view', 'pitied, mocked, ignored', 'admired by her teacher'],
    ['Future', 'decided by others', 'chosen by herself: teaching, caring for her parents'],
  ],
  'Table of Bholi\'s transformation: before school she stammers, feels like a burden, is mocked, and others decide her future; on her wedding day she speaks clearly, knows her worth, is admired by her teacher and chooses her own future.',
);
const vOthers = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['Ramlal', 'Village official; sends Bholi to school under pressure; humbles himself at the wedding'],
    ['Bholi\'s mother', 'Sees a girl\'s worth in marriage; fears schooling harms it'],
    ['The Tehsildar', 'Urges Ramlal to set an example by sending his daughters to school'],
    ['The teacher', 'Gentle and patient; gives Bholi hope and a voice'],
    ['Bishamber Nath', 'Prosperous, much older grocer; demands dowry on seeing her face'],
  ],
  'Table of the other characters: Ramlal, the village official; Bholi\'s mother; the Tehsildar; the teacher; and Bishamber Nath.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['stammer', 'to speak with involuntary pauses and repeated sounds'],
    ['dowry', 'money or goods demanded from a bride\'s family'],
    ['Tehsildar', 'a revenue officer in charge of a tehsil'],
    ['numberdar', 'a village headman who collects land revenue'],
    ['neglect', 'failure to give proper care'],
    ['empowerment', 'gaining the confidence and means to control one\'s own life'],
    ['transformation', 'a complete change'],
  ],
  'Table of word meanings: stammer, dowry, Tehsildar, numberdar, neglect, empowerment and transformation.',
  'Key words for discussing this chapter.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme or value', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme or value, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Bholi',
  goals: [
    'Retell Bholi\'s story from a neglected childhood to her wedding day, in your own words',
    'Explain how education gives Bholi the confidence to reject a greedy groom',
    'Discuss dowry and discrimination against girls as the story presents them',
    'Trace Bholi\'s transformation with evidence',
    'Answer 3-mark short and 6-mark long questions within the word limits',
  ],
  slides: [
    sl('title', 'Bholi — K. A. Abbas', {
      b: `*Footprints without Feet*, supplementary reader · short story · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study Bholi by K. A. Abbas, the story of a neglected village girl who finds her voice through education. Please read the chapter in your supplementary reader first; this lesson does not repeat it. The board tests this book through three mark short answers and a six mark long answer on character, theme and values, so we will practise those most.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *Footprints without Feet*, straight through.',
        'Use these slides for the order of events, the themes and Bholi\'s transformation.',
        'Explain events **in your own words**; do not memorise lines.',
        'Write about disability, appearance and dowry respectfully, as the story itself does.',
        'Practise the 3-mark and 6-mark questions most: that is how the board tests this book.',
      ],
      n: 'Here is how to use this lesson. Read the story first. Use these slides for the order of events, the themes and Bholi\'s change. Explain events in your own words. When you write about her disability, her appearance or dowry, write respectfully. And spend most of your practice on short and long answers, because the board does not set extracts from this book.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'K. A. Abbas, Khwaja Ahmad Abbas, lived from nineteen fourteen to nineteen eighty-seven. He was a writer, journalist and film-maker who cared deeply about social justice. Bholi is set in a north Indian village. It raises issues that still matter: the education of girls, how we treat people with disabilities, dowry, and a girl\'s right to a say in her own marriage.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'From silence to a voice. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. We meet a neglected child. A school opens in the village. Bholi meets a kind teacher. Years of learning pass. A marriage proposal arrives. And at the wedding, Bholi refuses a greedy groom. The whole story is a journey from silence to a voice.',
    }),
    sl('concept', 'Summary 1: a neglected child', {
      b: 'Sulekha, known as Bholi, is a daughter of Ramlal, a village official. A fall in infancy affected her development, smallpox left deep marks on her face, and she stammers. Other children mock her and she grows silent. Her sisters are married off, but her parents assume no one will ever marry her.',
      n: 'Sulekha is a daughter of Ramlal, an official in the village, but everyone calls her Bholi, a nickname meaning a simple one. A fall when she was a baby affected her development, smallpox left marks on her face, and she stammers. Other children mock her, so she speaks less and less. Her parents assume nobody will ever marry her.',
    }),
    sl('concept', 'Summary 2: a school opens', {
      b: 'A primary school for girls opens in the village. The Tehsildar tells Ramlal to set an example by sending his daughters. Bholi\'s mother fears schooling will spoil the other girls\' marriage chances, so they send Bholi, since they believe no one will marry her anyway. Bathed and dressed for once, Bholi is frightened: the family cow had been cleaned up like this before it was sold.',
      n: 'A girls\' school opens in the village, and the Tehsildar tells Ramlal to set an example by sending his daughters. Bholi\'s mother fears school will spoil the other girls\' marriage chances. So they send Bholi, because they think no one will marry her anyway. Bathed and dressed for once, Bholi is frightened. She remembers the family cow being cleaned up before it was sold.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from the opening of the school to Bholi\'s refusal.',
    }),
    sl('concept', 'Summary 3: a kind teacher', {
      b: 'At school Bholi meets a teacher who speaks gently and does not laugh when she struggles to say her name. The teacher gives her a book full of pictures and promises that, if she keeps coming and learning, she will one day speak without stammering and be respected. For the first time, someone expects something good of her.',
      n: 'At school Bholi meets someone new: a teacher who speaks to her gently. When Bholi struggles to say her name, the teacher does not laugh. She gives her a picture book and promises that if Bholi keeps learning, she will speak freely one day and be respected by all. For the first time in her life, someone believes in her.',
    }),
    sl('concept', 'Summary 4: the proposal and the wedding', {
      b: 'Years later Bishamber Nath, a prosperous grocer from another village, offers to marry Bholi without a dowry. He is much older, walks with a limp and has grown-up children, but her parents accept without asking her. At the wedding, seeing the marks on her face, he demands 5,000 rupees. Ramlal pleads, then pays. Bholi refuses to marry such a greedy man, speaking clearly and without stammering. She will care for her parents and teach at her school, while her teacher watches with pride.',
      n: 'Years later, a prosperous grocer named Bishamber offers to marry Bholi without dowry. He is much older and has grown-up children, but her parents accept without asking her. At the wedding, seeing the marks on her face, he demands five thousand rupees. Her father begs, then pays. Bholi refuses to marry such a greedy man. She speaks clearly, without stammering, and chooses her own future.',
    }),
    sl('two-column', 'Theme 1: education gives Bholi a voice', {
      b: 'School does not just teach Bholi to read; it teaches her that she matters.',
      cols: [
        '**What education gave Bholi**\n\n- a teacher who believed in her\n- confidence, built over years\n- the ability to speak clearly\n- a future she can choose',
        '**What it let her do**\n\n- judge Bishamber for what he is\n- refuse a humiliating marriage\n- protect her family\'s dignity\n- plan to teach and support her parents',
      ],
      n: 'The central theme is education as empowerment. School gave Bholi a teacher who believed in her, confidence built over years, a clear voice and a future she could choose. That is why, at the wedding, she can see Bishamber clearly, refuse him, protect her family\'s dignity and plan to teach. In answers, connect each of these to her years at school.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that idea sit other themes. Dowry, which humiliates Bholi\'s family. Gender discrimination, because girls are valued mainly for marriage and nobody asks Bholi\'s opinion. Disability and mockery, which silence a child. The power of kindness, in her teacher. And self-respect, as Bholi chooses dignity over a humiliating marriage. Remember that giving or taking dowry is a crime in India.',
    }),
    sl('check', 'Check: the teacher\'s example today', {
      chk: 'mc_apply',
      n: 'Check yourself. A classmate who stammers is laughed at in your class. Which response follows the example of Bholi\'s teacher?',
    }),
    sl('concept', 'Character: Bholi\'s transformation', {
      b: 'Show the change with evidence from both ends of the story.',
      v: vChange,
      n: 'The syllabus asks you to trace Bholi\'s transformation. Before school, she stammers, feels like a burden, is mocked, and others decide her future. On her wedding day, she speaks clearly, knows her own worth, earns her teacher\'s admiration and chooses her own future. Always show both ends of the change and explain what caused it.',
    }),
    sl('concept', 'The other characters', {
      v: vOthers,
      n: 'Ramlal sends Bholi to school only under pressure, but he humbles himself to protect the family at the wedding. Bholi\'s mother believes a girl\'s worth lies in marriage. The Tehsildar pushes Ramlal to set an example. The teacher is gentle and patient, and gives Bholi her voice. And Bishamber shows his greed when he demands money on seeing her face.',
    }),
    sl('two-column', 'Was Bholi right to refuse?', {
      cols: [
        '**Why her refusal was right**\n\n- Bishamber demanded dowry, a crime\n- he showed no respect for her or her family\n- marriage needs consent and dignity\n- she had a plan for her future',
        '**What her parents feared**\n\n- that no one else would marry her\n- shame before the guests\n- an uncertain future for a single woman\n- (the story answers these through her plans)',
      ],
      n: 'A common long question asks whether Bholi was right to refuse. Her reasons were strong: Bishamber demanded dowry, showed no respect, and marriage needs consent and dignity. Her parents feared that no one else would marry her and that they would be shamed. The story answers those fears through Bholi\'s calm plan to teach and care for her parents.',
    }),
    sl('check', 'Check: Bholi\'s refusal', {
      chk: 'ar_refuse',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and narrative technique', {
      bl: [
        '**Third-person narrator** who lets us feel Bholi\'s fear and hope.',
        '**Contrast:** the silent child and the outspoken bride.',
        '**Symbolism:** the cow, the picture book, the teacher\'s promise.',
        '**Irony:** the girl called simple shows the most wisdom.',
        '**Social realism:** village attitudes to girls, disability and dowry.',
      ],
      n: 'How does Abbas tell the story? A third-person narrator lets us feel Bholi\'s fear and hope. He uses contrast between the silent child and the outspoken bride. Objects carry meaning: the cow, the picture book, the teacher\'s promise. There is irony, because the girl called simple shows the most wisdom. And it is realistic about village attitudes to girls and dowry.',
    }),
    sl('example', 'Contrast and symbol: SOYL\'s own examples', {
      b: 'Practise spotting contrast and symbolism. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*The boy who once hid behind the classroom door now led the morning assembly.* — contrast that shows growth',
        '*The library card in her pocket felt heavier, and more precious, than any jewel.* — an object as a symbol of a new life',
        '*They called him the quiet one, until the day his question silenced the whole hall.* — irony in a label',
      ],
      n: 'Here are three examples of our own. The boy who hid behind a door now leads the assembly: contrast that shows growth. A library card feels more precious than a jewel: an object as a symbol of a new life. A boy called the quiet one asks a question that silences the hall: irony in a label. Find the same techniques in Bholi.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. To stammer is to speak with involuntary pauses. Dowry is money or goods demanded from a bride\'s family. A Tehsildar is a revenue officer, and a numberdar is a village headman. Neglect means failing to give proper care. Empowerment is gaining control of one\'s own life. And transformation is a complete change.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Bholi\'s teacher is the real hero of the story.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** partly agree: the teacher made the change possible; Bholi made the choice.',
        '**The teacher:** gentleness, the picture book, the promise, years of patience.',
        '**Bholi:** the courage to speak and refuse at the decisive moment.',
        '**Link + conclusion:** education empowers, but the empowered must act.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: partly agree. Give the teacher\'s part: gentleness, the picture book, the promise and years of patience. Then give Bholi\'s part: the courage to speak and refuse at the decisive moment. Conclude that education empowers, but it is the empowered person who must act.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Bholi, mocked for her stammer and her marked face, grows up silent and neglected.',
        'She is sent to the new girls\' school only because her parents think no one will marry her.',
        'A kind teacher gives her hope; years of learning give her confidence.',
        'When the groom demands dowry at the wedding, Bholi refuses him and chooses to teach and care for her parents.',
        'Read the chapter in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Bholi grows up silent and neglected. She is sent to school almost by accident, and a kind teacher gives her hope. Years of learning give her confidence. When the groom demands dowry at the wedding, she refuses him and chooses her own future. Read the chapter in your reader, and write about it in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The board sets no extracts from this book: practise 3-mark answers (40–50 words) and the 6-mark long answer (100–120 words).',
        '3-mark answers: point + evidence + explanation.',
        '6-mark answers: stand → 3 points with evidence → link to a theme or value → conclusion.',
        'Facts often confused: the Tehsildar urged the schooling; Bishamber first asked no dowry, then demanded 5,000 rupees; Bholi refused, she was not rejected.',
        'For value questions, link the story to girls\' education and the law against dowry today.',
      ],
      n: 'Exam tips. This book is tested through short and long answers, not extracts. In three mark answers, give a point, evidence and an explanation. In six mark answers, take a stand and support it with three points. Get the facts right: the Tehsildar urged the schooling, and Bholi refused the groom. And link the story to girls\' education and the law against dowry.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Bholi — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**K. A. (Khwaja Ahmad) Abbas** (1914–1987) was a writer, journalist and film-maker known for his concern with social justice. *Bholi* is set in a north Indian village and raises the education of girls, the treatment of people with disabilities, dowry, and a girl\'s right to a say in her own marriage.`,
      v: vAuthor,
      terms: [['Social realism', 'Writing that shows real social problems and the lives of ordinary people.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**A neglected child.** Sulekha, called Bholi, is a daughter of Ramlal, a village official. A fall in infancy affected her development, smallpox marked her face, and she stammers. Mocked by other children and seen as unmarriageable, she grows silent.\n\n**A school opens.** The Tehsildar urges Ramlal to send his daughters to the new girls\' school. Fearing for the other girls\' marriage chances, the parents send Bholi instead. Bathed and dressed, she fears she is being sent away like the family cow.\n\n**A kind teacher.** The teacher speaks gently, does not mock her stammer, gives her a picture book and promises that learning will help her speak freely and be respected.\n\n**The proposal.** Years later, Bishamber Nath, an older, well-off grocer with grown-up children, offers to marry her without dowry; her parents accept without asking her.\n\n**The wedding.** Seeing the marks on her face, Bishamber demands 5,000 rupees. Ramlal pleads, then pays. Bholi refuses to marry him, speaking clearly, and says she will care for her parents and teach at her school. Her teacher watches with pride.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Education as empowerment:** school gives Bholi a voice.\n- **Dowry:** a greedy demand humiliates a family; it is a crime under Indian law (Dowry Prohibition Act, 1961).\n- **Gender discrimination:** girls valued for marriage; no consent sought.\n- **Disability and mockery:** cruelty silences a child.\n- **The power of kindness:** one teacher changes a life.\n- **Self-respect:** dignity over a humiliating marriage.\n\n**Message:** education and encouragement can give a neglected girl the confidence to resist injustice and shape her own life.',
      v: vThemes,
      terms: [['Empowerment', 'Gaining the confidence and means to make decisions about one\'s own life.']],
    },
    {
      h: '4. Bholi\'s transformation',
      t: 3,
      b: '**Before school:** silent, fearful, stammering, treated as a burden, her future decided by others.\n\n**The turning point:** a gentle teacher who believes in her; years of learning.\n\n**On her wedding day:** confident and clear-spoken; refuses a greedy groom; chooses to teach and care for her parents.\n\nIn answers, show both ends of the change and the cause (education and encouragement).',
      v: vChange,
    },
    {
      h: '5. The other characters',
      t: 3,
      b: '**Ramlal** sends Bholi to school under pressure and accepts an unsuitable match without asking her, yet humbles himself to protect the family at the wedding. **Bholi\'s mother** sees a girl\'s worth in marriage. **The Tehsildar** pushes for girls\' schooling. **The teacher** is gentle, patient and encouraging. **Bishamber Nath** is prosperous but greedy and disrespectful.',
      v: vOthers,
    },
    {
      h: '6. Style and narrative technique',
      t: 2,
      b: '- **Third-person narrator** sharing Bholi\'s feelings.\n- **Contrast:** the silent child and the outspoken bride.\n- **Symbolism:** the cow, the picture book, the teacher\'s promise.\n- **Irony:** the girl called simple is the wisest.\n- **Social realism.**\n\nSOYL practice sentence (not from the chapter): *The boy who once hid behind the classroom door now led the morning assembly* (contrast that shows growth).',
      terms: [['Irony', 'A contrast between what is expected and what actually happens.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the chapter: stammer, dowry, Tehsildar, numberdar, neglect, empowerment, transformation. Use them in your own sentences, for example: *Bholi\'s transformation shows the power of education.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this book is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) from *Footprints without Feet*, on character, theme and values. It does not set extracts from this book. SOYL chapter tests add commentary passages only as extra practice.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a theme or value; a one-line conclusion. Extrapolation tasks (Bholi\'s diary, the teacher\'s letter, a speech) must stay consistent with the story.\n\n**Write respectfully** about disability and appearance: describe, do not label.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** *Footprints without Feet* is tested through 3-mark short answers (40–50 words) and a 6-mark long answer (100–120 words) on character, theme and values (CBSE 2026-27, Section C). No extracts are set from this book.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view on character, theme or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Bholi\'s parents sent her to school because they valued education: they thought no one would marry her.\n2. Saying Bishamber demanded dowry from the start: he first asked none, then demanded 5,000 rupees at the wedding.\n3. Saying Bholi was rejected: she refused the groom.\n4. Using her nickname or condition as an insult in answers.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your supplementary reader, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Bholi*?', 'K. A. (Khwaja Ahmad) Abbas (1914–1987).', 'fact', 1],
  ['Bholi\'s real name', 'Sulekha.', 'fact', 1],
  ['What does the nickname Bholi suggest?', 'A simple one: how others undervalued her.', 'concept', 3],
  ['Bholi\'s father', 'Ramlal, a village official (numberdar).', 'fact', 1],
  ['Why was Bholi slow to speak and mocked?', 'A fall in infancy affected her development; she stammered; smallpox marked her face.', 'fact', 1],
  ['How did other children treat her?', 'They mocked her, so she grew silent.', 'fact', 3],
  ['Who urged Ramlal to send his daughters to school?', 'The Tehsildar.', 'fact', 1],
  ['Why was Bholi the daughter chosen for school?', 'Her parents thought no one would marry her anyway.', 'fact', 2],
  ['Why was Bholi frightened when bathed and dressed?', 'The cow Lakshmi had been cleaned up before being sold.', 'fact', 1],
  ['How did the teacher treat Bholi?', 'Gently; she did not mock her stammer and gave her hope.', 'fact', 3],
  ['What did the teacher give Bholi?', 'A book full of pictures.', 'fact', 1],
  ['What did the teacher promise?', 'If she kept learning, she would speak freely and be respected.', 'fact', 3],
  ['Who proposed marriage?', 'Bishamber Nath, a prosperous grocer from another village.', 'fact', 1],
  ['Why did her parents accept?', 'He asked no dowry, and they feared no one else would marry her.', 'fact', 2],
  ['Was Bholi asked about the match?', 'No.', 'fact', 2],
  ['What did Bishamber demand at the wedding?', 'A dowry of 5,000 rupees.', 'fact', 1],
  ['Why did he demand it?', 'He saw the marks on her face.', 'fact', 1],
  ['What did Ramlal do?', 'Pleaded with him, then paid.', 'fact', 1],
  ['What did Bholi do?', 'Refused to marry him, speaking clearly without stammering.', 'fact', 3],
  ['Bholi\'s plans for her future', 'Care for her parents and teach at the school.', 'fact', 3],
  ['Central theme', 'Education empowers a neglected girl.', 'concept', 2],
  ['Bholi\'s transformation in one line', 'From a silent, mocked child to a confident, self-respecting woman.', 'concept', 3],
  ['What does Indian law say about dowry?', 'Giving or taking dowry is a crime (Dowry Prohibition Act, 1961).', 'concept', 2],
  ['The main irony', 'The girl called simple shows the most wisdom.', 'concept', 2],
  ['*stammer*', 'to speak with involuntary pauses and repeated sounds', 'definition', 1],
  ['*Tehsildar*', 'a revenue officer in charge of a tehsil', 'definition', 1],
  ['*empowerment*', 'gaining the confidence and means to control one\'s own life', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to a theme or value → conclusion (100–120 words).', 'exam-tip', 4],
  ['How the board tests this book', '3-mark short answers and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Writing about Bholi respectfully', 'Describe her condition plainly; never use it or the nickname as an insult.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — Bholi',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_why_school', 'sa_transformation', 'sa_proposal'] }, { attempt: 2, keys: ['sa_refusal', 'sa_dowry_evil', 'sa_bholi_future'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_bholi_sketch', 'la_dowry_essay'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — Bholi',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_name', 'sb_first_day', 'sb_pleads', 'sb_law'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_neglected', 'sa_cow', 'sa_mother'] }, { attempt: 2, keys: ['sa_teacher_role', 'sa_ramlal', 'sa_education'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_education_theme', 'la_teacher_tribute'] }, { attempt: 1, keys: ['la_diary_bholi', 'la_ramlal_letter'] }, { attempt: 1, keys: ['la_gender', 'la_bholi_speech'] }] },
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
    board_pattern: 'supplementary reader: board sets 3-mark short answers and a 6-mark long answer (no extracts); bank weighted to 14 three-mark and 9 long items; 5 commentary passages fill the generic chapter-test blueprint Section A slots',
    literature_rule: 'written in SOYL words at the level of events and ideas; no sentence, phrase or dialogue of the story; speech reported; commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem; guard list of short distinctive phrases (ch27 src/guard.mjs)',
    sensitivity: 'disability, appearance and stammering described plainly and never used as labels; mockery presented as wrong; dowry identified as a crime under Indian law; girls\' consent and education treated as rights',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
checkForbidden(DIR, GUARD);
