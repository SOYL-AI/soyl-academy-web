// Build CBSE 10 English Language and Literature ch11 "The Sermon at Benares" (Betty Renshaw). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch11/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the chapter is never
// quoted or closely paraphrased. The sermon's comparisons and Kisa Gotami's reflection are explained as
// ideas, not rebuilt. Students read the chapter in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch11', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the chapter itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words', '3 each'],
    ['Long answer', '100–120 words: character, theme, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight prose lesson is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthor = table(
  ['About the chapter', ''],
  [
    ['Author', 'Betty Renshaw (as credited in *First Flight*)'],
    ['Genre', 'prose retelling: a short life of the Buddha followed by a teaching story'],
    ['Main figures', 'Gautama Buddha; Kisa Gotami, a grieving mother'],
    ['Setting', 'ancient northern India; the sermon at Benares, on the Ganga'],
    ['Style', 'formal and old-fashioned, with older forms of address in the dialogue'],
  ],
  'Table of facts: the chapter is credited to Betty Renshaw; it is a prose retelling of the Buddha\'s life followed by a teaching story; the main figures are the Buddha and Kisa Gotami; it is set in ancient northern India with the sermon at Benares on the Ganga; the style is formal and old-fashioned.',
);
const vBuddha = flow('LR', ['Prince Siddhartha', 'The four sights', 'Leaving the palace', 'Years of searching', 'Enlightenment under the peepal tree', 'Teaching: the first sermon'], 'Flow of the Buddha\'s life as the chapter presents it: Prince Siddhartha; the four sights; leaving the palace; years of searching; enlightenment under the peepal tree; teaching, beginning with the first sermon.', 'The Buddha\'s path (SOYL summary).');
const vKisa = flow('LR', ['Her only son dies', 'Denial: begging for medicine', 'The Buddha\'s task', 'Door after door', 'The lamps at nightfall', 'Acceptance'], 'Flow of Kisa Gotami\'s journey: her only son dies; in denial she begs for medicine; the Buddha sets a task; she goes door after door; at nightfall she watches the lamps; she reaches acceptance.', 'Kisa Gotami: from denial to acceptance (SOYL summary).');
const vSights = table(
  ['The sight', 'What it showed the prince'],
  [
    ['A sick man', 'the body can fail through illness'],
    ['An aged man', 'youth and strength do not last'],
    ['A funeral', 'every life ends in death'],
    ['A holy man begging for food', 'a life given up to seeking the truth'],
  ],
  'Table of the four sights and their meaning: a sick man shows illness, an aged man shows that youth fades, a funeral shows that every life ends, and a begging holy man shows a life devoted to seeking truth.',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Death is universal', 'No household can give the seed.'],
    ['Grief and self-centredness', 'Kisa sees she mourned as if only she had suffered.'],
    ['Acceptance and peace', 'Calm acceptance, not endless weeping, brings peace.'],
    ['Learning through experience', 'The Buddha sets a task instead of giving a lecture.'],
    ['Compassion', 'The Buddha guides a grieving mother gently.'],
    ['The search for truth', 'The prince leaves comfort to understand suffering.'],
  ],
  'Table of six themes with where each appears: death is universal, grief and self-centredness, acceptance and peace, learning through experience, compassion, and the search for truth.',
);
const vPeople = table(
  ['Figure', 'Qualities (in SOYL\'s words)', 'Evidence'],
  [
    ['Kisa Gotami', 'loving, desperate, then reflective and accepting', 'begs for medicine; searches tirelessly; understands at nightfall'],
    ['The Buddha', 'wise, patient, compassionate, a skilled teacher', 'sets the seed task; does not scold; explains death calmly'],
    ['The neighbours', 'sympathetic but helpless', 'think grief has driven her mad; offer seed willingly'],
  ],
  'Table of the figures in the chapter: Kisa Gotami is loving and desperate, then reflective; the Buddha is wise, patient and compassionate; the neighbours are sympathetic but helpless.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['sermon', 'a talk on a religious or moral subject'],
    ['enlightenment', 'a state of deep spiritual understanding'],
    ['alms', 'money or food given to the poor or to holy people'],
    ['mortal', 'a being who must die'],
    ['lamentation', 'loud expression of grief'],
    ['composed', 'calm and in control of one\'s feelings'],
    ['parable', 'a short story that teaches a moral or spiritual lesson'],
  ],
  'Table of word meanings: sermon, enlightenment, alms, mortal, lamentation, composed, and parable.',
  'Key words for this chapter with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Sermon at Benares',
  goals: [
    'Outline the Buddha\'s life up to his first sermon, in your own words',
    'Retell Kisa Gotami\'s story in sequence',
    'Explain the Buddha\'s teaching on death and suffering through her story',
    'Describe Kisa Gotami and the Buddha with evidence',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'The Sermon at Benares — Betty Renshaw', {
      b: `*First Flight*, prose · the Buddha's life and teaching · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Sermon at Benares, which tells how a prince became the Buddha and how he helped a grieving mother, Kisa Gotami, understand death. Please read the chapter itself in your textbook, First Flight. This lesson does not repeat it. Instead we will follow its events, understand its teaching, and learn how to answer board questions.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *First Flight*, straight through.',
        'Use these slides for the two stories (the Buddha\'s path; Kisa Gotami\'s search) and the teaching.',
        'Explain the teaching **in your own words**; do not memorise the sermon\'s sentences.',
        'Practise the extract questions, which use SOYL commentary on the chapter.',
      ],
      n: 'Here is how to use this lesson. Read the chapter in your textbook first. Then use these slides for its two stories: the Buddha\'s path to enlightenment, and Kisa Gotami\'s search. Explain the teaching in your own words rather than memorising the sermon. Finally, practise with our extract questions, which are based on commentary written by SOYL.',
    }),
    sl('concept', 'About the chapter', {
      v: vAuthor,
      n: 'The chapter is credited to Betty Renshaw. It has two parts. First, a short account of how Prince Siddhartha Gautama became the Buddha. Second, a teaching story about a mother named Kisa Gotami. The style is formal and old-fashioned, which suits a story from ancient India. It is set in northern India, with the sermon at Benares, on the Ganga.',
    }),
    sl('diagram', 'The Buddha\'s path', {
      b: 'From comfort to understanding. (A SOYL summary, not the text.)',
      v: vBuddha,
      n: 'Here is the Buddha\'s path as the chapter presents it. He begins as Prince Siddhartha. Four sights shake him. He leaves the palace and searches for years. He meditates under a peepal tree and gains enlightenment. Then he begins to teach, and his first sermon is given at Benares. Keep this path in mind as the background to Kisa Gotami\'s story.',
    }),
    sl('concept', 'Summary 1: the prince and the four sights', {
      b: 'Siddhartha Gautama was born a prince in northern India. He studied the sacred texts, married a princess and had a son, living in royal comfort. Going out into the world, he met illness, old age and death, and a holy man who begged for his food. Deeply disturbed, he left the palace to understand human suffering.',
      v: vSights,
      n: 'Siddhartha Gautama grew up as a prince, studied, married and had a son. His life was comfortable and sheltered. Then, outside the palace, he saw four things: a sick man, an old man, a funeral, and a holy man who begged for food. Sickness, age and death were suddenly real to him. He gave up his royal life to understand why people suffer.',
    }),
    sl('concept', 'Summary 2: enlightenment and the first sermon', {
      b: 'After years of wandering, Gautama meditated beneath a peepal tree until understanding came. The tree became known as the Bodhi tree, the tree of wisdom, and he became the Buddha, the awakened or enlightened one. He began to teach, and the chapter places his first sermon at Benares.',
      n: 'Gautama searched for years. At last he sat under a peepal tree and meditated until he understood. That tree came to be called the Bodhi tree, the tree of wisdom, and Gautama became the Buddha, which means the awakened or enlightened one. Then he began to teach. According to the chapter, his first sermon was given at Benares.',
    }),
    sl('check', 'Check: the Buddha\'s path in order', {
      chk: 'ord_buddha',
      n: 'Your turn. Five stages of the Buddha\'s life are shuffled. Put them in the order in which the chapter presents them, from palace to sermon.',
    }),
    sl('diagram', 'Kisa Gotami: from denial to acceptance', {
      b: 'The heart of the chapter is a mother\'s search. (A SOYL summary, not the text.)',
      v: vKisa,
      n: 'Now the teaching story. Kisa Gotami\'s only son dies. In denial, she begs for medicine. The Buddha gives her a task. She goes from door to door. At nightfall she watches the lamps of the town. And she reaches acceptance. Six steps, from refusing the truth to understanding it.',
    }),
    sl('concept', 'Summary 3: grief and the task', {
      b: 'When her only son died, Kisa Gotami could not accept it. She carried his body to her neighbours, begging for medicine, and they thought grief had driven her mad. A man sent her to Sakyamuni, the Buddha. He asked her to bring a handful of mustard seed, but only from a house where no one had ever died.',
      n: 'Kisa Gotami\'s only son dies, and she cannot accept it. She carries him from house to house, asking for medicine, and her neighbours think grief has driven her mad. A man sends her to the Buddha. He does not tell her the truth directly. Instead he asks for mustard seed, from a house where nobody has ever died.',
    }),
    sl('concept', 'Summary 4: the search and the realisation', {
      b: 'People pitied her and offered the seed, but every family had lost someone, so she could take none. Exhausted, she rested by the road as night fell and watched the town\'s lamps go out one by one. She saw in them a picture of human lives, understood that death comes to everyone, and recognised that her grief had been only for her own loss.',
      n: 'Kisa Gotami goes from door to door. Everyone pities her and offers seed, but every family has lost someone. Exhausted, she rests by the road as night falls and watches the lamps of the town go out one by one. She sees in them a picture of human lives. Death comes to all, she realises, and she had been grieving as if she alone had suffered.',
    }),
    sl('concept', 'Summary 5: the Buddha\'s teaching (in SOYL\'s words)', {
      bl: [
        '**Death is certain:** everyone who is born will die; age, learning and love protect no one.',
        '**Familiar comparisons** from daily life make this certainty clear (read them in your textbook).',
        '**Grief does not help the dead;** it adds to the mourner\'s suffering and can harm health.',
        '**The wise accept** this law of life calmly.',
        '**Peace** comes through letting go of lamentation.',
      ],
      n: 'Here is the teaching in our own words. Death is certain for everyone, whatever their age, learning or love. The Buddha uses comparisons from daily life to make this clear; read them in your textbook. Grieving does not help the dead, and it harms the one who grieves. The wise accept death calmly, and peace comes from letting go of lamentation.',
    }),
    sl('two-column', 'Theme 1: from denial to acceptance', {
      b: 'Kisa Gotami\'s change carries the chapter\'s message.',
      cols: [
        '**Denial**\n\n- carries her dead son about\n- begs for a cure\n- feels her loss is hers alone',
        '**Acceptance**\n\n- learns that every family has lost someone\n- sees human lives in the lamps going out\n- understands that death comes to all',
      ],
      n: 'The central theme is the movement from denial to acceptance. At first Kisa Gotami carries her dead son and begs for a cure, sure her loss is unique. By the end she knows that every family has lost someone and that death comes to all. In answers, show this change step by step, with evidence from her search.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that change sit other themes. Death is universal. Grief can become self-centred. Acceptance brings peace. People learn best through experience, which is why the Buddha sets a task. Compassion shapes his whole approach. And the prince\'s own story is a search for truth that begins with the same discovery Kisa makes: that suffering is part of every life.',
    }),
    sl('check', 'Check: the Buddha\'s approach today', {
      chk: 'mc_apply_sermon',
      n: 'Check yourself. A student is grieving for his pet and will not talk to anyone. Which response follows the Buddha\'s approach with Kisa Gotami?',
    }),
    sl('concept', 'The figures in the chapter', {
      b: 'Every quality in an answer needs evidence, described in your own words.',
      v: vPeople,
      n: 'Let us look at the figures. Kisa Gotami is loving and desperate, then reflective and accepting. The Buddha is wise, patient and compassionate, a teacher who guides rather than lectures. The neighbours are sympathetic but cannot help. In answers, pair each quality with an action from the story.',
    }),
    sl('two-column', 'Is grief ever selfish?', {
      cols: [
        '**Grief is natural**\n\n- it expresses love for the person lost\n- Kisa\'s sorrow for her son was real\n- mourning is part of healing',
        '**Grief can turn inward**\n\n- Kisa forgot that others had suffered too\n- she demanded that life\'s law change for her\n- endless grief harms the mourner',
      ],
      n: 'A common long question asks whether grief can be selfish. One side says grief is natural and expresses love; Kisa\'s sorrow was real. The other side says grief can turn inward, as hers did when she forgot that every family had suffered. The best answers say both: mourning is human, but it should not shut out the world.',
    }),
    sl('check', 'Check: the neighbours\' view', {
      chk: 'ar_neighbours',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and technique', {
      bl: [
        '**Parable:** a simple story that carries a spiritual lesson.',
        '**Teaching through a task:** the reader learns with Kisa Gotami.',
        '**Symbolism:** the lamps going out stand for human lives ending.',
        '**Simile:** the sermon compares human life to familiar things.',
        '**Formal, old-fashioned style** suited to an ancient story.',
      ],
      n: 'How is the chapter written? Kisa Gotami\'s story is a parable, a simple tale that carries a lesson. The reader learns alongside her, through her task. The lamps going out are a symbol of human lives ending. The sermon uses similes, comparing life to familiar things. And the formal, old-fashioned style suits a story from ancient India.',
    }),
    sl('example', 'Symbol and simile: SOYL\'s own examples', {
      b: 'Practise the two devices the chapter relies on. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*Each autumn the old tree let its leaves go without a struggle.* — the falling leaves can symbolise letting go',
        '*Our worries are like clouds: heavy for a while, then gone.* — simile',
        '*The candle on the table burned lower all evening as the guests talked of the friend they had lost.* — a symbol of a life ending',
      ],
      n: 'Here are three sentences of our own. A tree lets its leaves go each autumn: the falling leaves can symbolise letting go. Worries are like clouds, heavy for a while, then gone: a simile. A candle burns lower as guests remember a lost friend: a symbol of a life ending. Now find the chapter\'s own symbol and similes in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the chapter. A sermon is a talk on a religious or moral subject. Enlightenment is deep spiritual understanding. Alms are gifts of food or money to holy people or the poor. A mortal is a being who must die. Lamentation is loud grief. Composed means calm. And a parable is a short story that teaches a lesson.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *The Buddha heals Kisa Gotami\'s grief without telling her a single hard truth.* Discuss.',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + evidence:** he sets a hopeful task; the search shows her that every home has lost someone; the lamps at nightfall complete her understanding.',
        '**Link:** learning through experience; compassion.',
        '**Conclusion:** the truth she finds herself is the one she can accept.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree. Give three points: the Buddha sets a hopeful task, the search shows her that every home has lost someone, and the lamps complete her understanding. Link this to learning through experience and to compassion. End with one clear line: the truth she discovers herself is the truth she can accept.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Prince Siddhartha left the palace after the four sights; enlightened under the peepal (Bodhi) tree, he became the Buddha and preached at Benares.',
        'Kisa Gotami\'s only son died; in denial she begged for medicine; the Buddha asked for mustard seed from a home untouched by death.',
        'Every family had lost someone; at nightfall the lamps going out showed her that death comes to all.',
        'Teaching: death is certain; grief harms the mourner; acceptance brings peace.',
        'Read the chapter in *First Flight*; write about it in your own words.',
      ],
      v: vKisa,
      n: 'Let us sum up. A prince saw suffering, left his palace, gained enlightenment and became the Buddha. Kisa Gotami, grieving her only son, was sent to find mustard seed from a home untouched by death. Every family had lost someone, and at nightfall she understood. The teaching: death is certain, and acceptance brings peace. Read the chapter in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → link to theme → conclusion.',
        'Facts often confused: the seed is mustard; the condition is a home untouched by death, not a cure; Bodhi means wisdom.',
        'Explain the sermon\'s teaching in your own words; do not reproduce its sentences or comparisons.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right: the seed is mustard, and the condition is a home untouched by death. And always explain the teaching in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Sermon at Benares — study notes',
  sections: [
    {
      h: '1. About the chapter',
      t: 1,
      b: `${READ}\n\n*The Sermon at Benares*, credited in *First Flight* to **Betty Renshaw**, has two parts: a short account of how Prince Siddhartha Gautama became the Buddha, and a teaching story about a grieving mother, **Kisa Gotami**, through which the Buddha's first sermon is presented. The style is formal and old-fashioned, suited to a story from ancient India.`,
      v: vAuthor,
      terms: [['Parable', 'A short story that teaches a moral or spiritual lesson.']],
    },
    {
      h: '2. The Buddha\'s path (in SOYL\'s words)',
      t: 1,
      b: 'Siddhartha Gautama was born a prince in northern India. He studied the sacred texts, married a princess and had a son. Going out into the world, he saw a sick man, an aged man, a funeral and a holy man begging for food. Disturbed by this suffering, he left his royal life. After years of searching, he meditated beneath a peepal tree until he gained enlightenment; the tree became known as the **Bodhi tree** (tree of wisdom), and he became the **Buddha** (the awakened or enlightened one). He began to teach; the chapter places his first sermon at **Benares**, a holy city on the Ganga.',
      v: vBuddha,
      terms: [['Enlightenment', 'A state of deep spiritual understanding.']],
    },
    {
      h: '3. Kisa Gotami\'s story (in SOYL\'s words)',
      t: 1,
      b: '**Grief and denial.** Kisa Gotami\'s only son died. She carried his body to her neighbours, begging for medicine; they thought grief had driven her mad.\n\n**The task.** A man sent her to Sakyamuni, the Buddha, who asked for a handful of mustard seed from a house where no one had ever died.\n\n**The search.** People pitied her and offered seed, but every family had lost someone.\n\n**The realisation.** Exhausted, she rested by the road at nightfall and watched the town\'s lamps go out one by one. She saw in them a picture of human lives, understood that death comes to all, and recognised that her grief had been only for her own loss.',
      v: vKisa,
    },
    {
      h: '4. The teaching and the themes',
      t: 2,
      b: '**The teaching, in SOYL\'s words:** everyone who is born will die; age, learning and love protect no one. Familiar comparisons from daily life make this clear (read them in your textbook). Grieving does not help the dead; it increases the mourner\'s suffering and can harm health. The wise accept this law of life calmly, and peace comes through letting go of lamentation.\n\n**Themes:** death is universal · grief can become self-centred · acceptance brings peace · learning through experience · compassion · the search for truth.\n\n**Message:** suffering and death are part of every life; accepting them calmly frees us from useless sorrow.',
      v: vThemes,
      terms: [['Mortal', 'A being who must die.']],
    },
    {
      h: '5. Kisa Gotami and the Buddha',
      t: 2,
      b: '**Kisa Gotami:** loving and desperate (begs for a cure), persistent (searches house after house), finally reflective and accepting (understands at nightfall).\n\n**The Buddha:** wise (understands that a grieving mother would reject a lecture), patient and compassionate (sets a gentle task, never scolds), a skilled teacher (lets her discover the truth herself).\n\n**The neighbours:** sympathetic but helpless.',
      v: vPeople,
    },
    {
      h: '6. Style, devices and word meanings',
      t: 1,
      b: '- **Parable:** a simple story carrying a lesson.\n- **Symbolism:** the lamps going out stand for human lives ending.\n- **Simile:** the sermon compares human life to familiar things.\n- **Teaching through experience:** the reader learns with Kisa.\n- **Formal, old-fashioned style.**\n\nSOYL practice sentence (not from the chapter): *Our worries are like clouds: heavy for a while, then gone* (simile).',
      v: vWords,
      terms: [
        ['Symbol', 'A concrete thing that stands for an idea.'],
        ['Simile', 'A comparison using like or as.'],
      ],
    },
    {
      h: '7. Answering exam questions',
      t: 3,
      b: '**Extract-based (5 marks):** the board prints a passage from the chapter; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the chapter.\n\n**Short answers (3 marks, 40–50 words):** point + evidence + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with evidence in your own words; a link to a theme; a one-line conclusion. Extrapolation tasks (Kisa Gotami\'s diary, a letter comforting a grieving friend) must stay consistent with the chapter.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant events and ideas, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Saying the Buddha promised to cure Kisa Gotami\'s son: he set a task that led her to the truth.\n2. Saying she brought back the seed: no house could meet the condition.\n3. Confusing the Bodhi tree with a banyan: it was a peepal tree.\n4. Retelling the sermon\'s comparisons word for word instead of explaining the idea.\n5. Forgetting the four sights that made the prince leave home.\n\n**Remember:** read the chapter in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['To whom is *The Sermon at Benares* credited?', 'Betty Renshaw.', 'fact', 1],
  ['The Buddha\'s name as a prince', 'Siddhartha Gautama.', 'fact', 1],
  ['The four sights', 'A sick man, an aged man, a funeral and a holy man begging for food.', 'fact', 1],
  ['Why did the prince leave the palace?', 'To understand and overcome the suffering he had seen.', 'concept', 1],
  ['Where did he gain enlightenment?', 'Beneath a peepal tree, later called the Bodhi tree.', 'fact', 1],
  ['Meaning of *Bodhi*', 'Wisdom or awakening (the tree of wisdom).', 'definition', 1],
  ['Meaning of *Buddha*', 'The awakened or enlightened one.', 'definition', 1],
  ['Where was the first sermon, according to the chapter?', 'At Benares, a holy city on the Ganga.', 'fact', 1],
  ['Whom did Kisa Gotami lose?', 'Her only son.', 'fact', 1],
  ['What did she ask her neighbours for?', 'Medicine to cure her dead son.', 'fact', 1],
  ['What did the neighbours think?', 'That grief had driven her mad.', 'fact', 1],
  ['Who sent her to the Buddha?', 'A man she met during her search.', 'fact', 1],
  ['Another name for the Buddha in the story', 'Sakyamuni.', 'fact', 1],
  ['What did the Buddha ask for?', 'A handful of mustard seed.', 'fact', 1],
  ['The condition attached', 'It had to come from a house where no one had ever died.', 'fact', 1],
  ['What did every house reveal?', 'Each family had lost someone.', 'fact', 1],
  ['What did she watch at nightfall?', 'The town\'s lamps going out one by one.', 'fact', 1],
  ['What did the lamps symbolise?', 'Human lives, which end one by one.', 'concept', 2],
  ['What did Kisa Gotami realise about her grief?', 'It had been only for her own loss, though every family suffers.', 'concept', 2],
  ['Core of the Buddha\'s teaching', 'Death is certain for all; grief harms the mourner; acceptance brings peace.', 'concept', 2],
  ['Why do the wise not grieve endlessly?', 'They accept death as the law of life.', 'concept', 2],
  ['The Buddha\'s method', 'Teaching through experience: a task, not a lecture.', 'concept', 2],
  ['Three qualities of the Buddha', 'Wise, patient, compassionate.', 'concept', 2],
  ['Kisa Gotami\'s change', 'From frantic denial to calm acceptance.', 'concept', 2],
  ['A parable is…', 'a short story that teaches a moral or spiritual lesson.', 'definition', 1],
  ['*alms*', 'money or food given to the poor or to holy people', 'definition', 1],
  ['*lamentation*', 'loud expression of grief', 'definition', 1],
  ['*mortal*', 'a being who must die', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to theme → conclusion (100–120 words).', 'exam-tip', 3],
  ['Most common factual slip', 'Saying the Buddha promised a cure, or that Kisa found the seed.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — The Sermon at Benares',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the chapter in First Flight.)', items: ['src_mustard'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_four_sights', 'sa_no_house', 'sa_lamps', 'sa_method'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_kisa_journey', 'la_letter_grief'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — The Sermon at Benares',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_prince', 'src_grief'] }, { attempt: 1, keys: ['src_houses', 'src_teaching'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_bodhi', 'sb_sakyamuni', 'sb_condition', 'sb_wise'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_buddha_name', 'sa_kisa_neighbours', 'sa_mustard_task', 'sa_selfish', 'sa_grieving_harm'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_buddha_teacher', 'la_death_universal'] }, { attempt: 1, keys: ['la_diary_kisa', 'la_selfishness'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 only; no removed topics for 2026-27',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the chapter; the sermon taught as ideas, its comparisons and Kisa Gotami\'s reflection never rebuilt; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
