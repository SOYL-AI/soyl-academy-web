// Build CBSE 10 English Language and Literature ch07 "From the Diary of Anne Frank". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch07/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the diary is never
// quoted or closely paraphrased. Students read the extract in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch07', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the chapter itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL\'s explanation and analysis; it does not reproduce the diary.';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words, any 4 of 5', '3 each'],
    ['Long answer', '100–120 words: character, theme, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight prose lesson is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Writer', 'Anne Frank (1929–1945), a Jewish girl born in Frankfurt, Germany, who grew up in Amsterdam'],
    ['The diary', 'a present for her thirteenth birthday, 12 June 1942; she wrote to an imaginary friend, Kitty'],
    ['This extract', 'entries from June 1942, written a few weeks before the family went into hiding'],
    ['Publication', 'published by her father, Otto Frank, in 1947; known in English as *The Diary of a Young Girl*'],
    ['Genre', 'diary: first person, dated entries, private and informal'],
    ['People named', 'her parents, sister Margot, grandmother, Mrs Kuperus, Mr Keesing, friends G.Z. and Sanne'],
  ],
  'Table of facts: Anne Frank, 1929 to 1945, a Jewish girl born in Frankfurt who grew up in Amsterdam; the diary was a thirteenth birthday present in June 1942, addressed to Kitty; this extract dates from June 1942, before the family hid; it was published by her father Otto Frank in 1947; it is a first-person diary; people named include her family, Mrs Kuperus, Mr Keesing, G.Z. and Sanne.',
);
const vTimeline = flow('LR', ['1929: born in Frankfurt', '1933–34: family moves to Holland', 'June 1942: the diary begins', 'July 1942: into hiding in Amsterdam', 'August 1944: arrested', '1945: dies in Bergen-Belsen', '1947: diary published'], 'Timeline of Anne Frank\'s life: born in Frankfurt in 1929; family moves to Holland in 1933 and 1934; the diary begins in June 1942; the family goes into hiding in July 1942; arrested in August 1944; she dies in Bergen-Belsen in 1945; the diary is published in 1947.', 'Historical background (SOYL summary).');
const vParts = flow('LR', ['Why a diary?', 'No true friend', 'Kitty', 'A sketch of her life', 'School and the promotion bets', 'Mr Keesing\'s three essays'], 'Flow of the extract in six parts: why a diary; no true friend; naming the diary Kitty; a sketch of her life; school and the promotion bets; Mr Keesing\'s three essays.', 'The extract in six parts (SOYL summary).');
const vContest = flow('LR', ['Too much talking; warnings', 'Essay 1: A Chatterbox', 'Essay 2: An Incorrigible Chatterbox', 'Essay 3: a silly title about quacking', 'A poem written with Sanne', 'He reads it out; no more punishment'], 'Flow of the contest with Mr Keesing: warnings about talking; essay one, A Chatterbox; essay two, An Incorrigible Chatterbox; essay three, a silly title about quacking; a poem written with Sanne; he reads it out and stops the punishments.', 'Anne versus Mr Keesing (SOYL summary).');
const vAnne = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Talkative and lively', 'Her chatter in maths lessons earns three punishments.'],
    ['Witty and intelligent', 'She argues her case and answers the silliest title with a poem.'],
    ['Lonely and reflective', 'She feels she has no true friend despite many companions.'],
    ['Honest and self-aware', 'She wonders whether the distance is partly her own fault.'],
    ['Affectionate and sensitive', 'She still loves her late grandmother; she parted from Mrs Kuperus in tears.'],
    ['Confident', 'She expects to move up, unsure only about maths.'],
  ],
  'Table of Anne\'s traits with evidence: talkative and lively, witty and intelligent, lonely and reflective, honest and self-aware, affectionate and sensitive, and confident.',
);
const vKeesing = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Strict', 'He warns Anne repeatedly and sets punishment essays.'],
    ['Persistent', 'Each time she keeps talking, he sets a new essay.'],
    ['Humorous', 'He laughs at her arguments and invents a comic third title.'],
    ['Fair and open-minded', 'He enjoys her poem, reads it to several classes and stops the punishments.'],
  ],
  'Table of Mr Keesing\'s traits with evidence: strict, persistent, humorous, and fair and open-minded.',
);
const vForm = table(
  ['Feature of the diary form', 'Effect'],
  [
    ['First person (*I*)', 'we hear Anne\'s own voice and feelings'],
    ['Private, for no other reader', 'complete honesty about loneliness and doubt'],
    ['Addressed to Kitty', 'warm, conversational tone, like a letter to a friend'],
    ['Past and present mixed', 'her life story and the day\'s school news side by side'],
    ['Informal style', 'a lively schoolgirl\'s voice, full of humour'],
  ],
  'Table of features of the diary form and their effects: first person, private, addressed to Kitty, past and present mixed, and informal style, giving honesty, warmth and liveliness.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['musings', 'quiet, thoughtful reflections'],
    ['listless', 'lacking energy or interest'],
    ['brooding', 'thinking deeply about something that makes one unhappy'],
    ['confide', 'to share secrets or private feelings with someone'],
    ['emigrated', 'left one country to live in another'],
    ['incorrigible', 'impossible to correct or reform'],
    ['fogey', 'an old-fashioned, dull person'],
    ['ingenuity', 'cleverness in finding new ideas'],
  ],
  'Table of word meanings: musings, listless, brooding, confide, emigrated, incorrigible, fogey and ingenuity.',
  'Single words from the chapter with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Trait or point + incident (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with incidents in your own words, link to a theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'From the Diary of Anne Frank',
  goals: [
    'Retell the main ideas and events of the diary extract in sequence, in your own words',
    'Explain why Anne valued a diary and her views on friendship and loneliness',
    'Describe Anne\'s personality and her relationship with Mr Keesing',
    'Identify features of the diary form and the humour in the extract',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'From the Diary of Anne Frank', {
      b: `*First Flight*, prose · diary (extract) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study entries from the diary of Anne Frank, one of the most widely read books in the world. Before anything else, please read the chapter itself in your textbook, First Flight. This lesson does not repeat the diary. Instead we will understand Anne\'s ideas, her personality, her teacher Mr Keesing, the diary form, and how to answer board questions.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the extract once in *First Flight*, straight through.',
        'Then use these slides for the background, ideas, characters and the diary form.',
        'In answers, describe events **in your own words**; do not memorise lines.',
        'Practise the extract questions, which use SOYL commentary on the chapter.',
      ],
      n: 'Here is how to study this chapter. Read the extract once in your textbook, straight through. Then use these slides for the background, the main ideas, the characters and the diary form. In your answers, describe events in your own words, because examiners reward understanding, not memorised lines. Finally, practise with our extract questions and short answers.',
    }),
    sl('concept', 'Who was Anne Frank?', {
      v: vAuthor,
      n: 'Anne Frank was a Jewish girl, born in Frankfurt in Germany in nineteen twenty-nine. Her family moved to Amsterdam to escape Nazi persecution. On her thirteenth birthday, in June nineteen forty-two, she was given the notebook that became her diary. Our extract comes from the first weeks of that diary. Her father published it after the war, in nineteen forty-seven.',
    }),
    sl('diagram', 'Background: Anne\'s life and times', {
      b: 'The extract was written in June 1942, *before* the family went into hiding. Readers know what Anne could not.',
      v: vTimeline,
      n: 'This timeline matters. Anne was born in nineteen twenty-nine, and her family moved to Holland to escape persecution. In June nineteen forty-two she began her diary. A few weeks later the family went into hiding in Amsterdam. In August nineteen forty-four they were arrested, and Anne died in a camp in nineteen forty-five. The extract comes before all that sadness.',
    }),
    sl('diagram', 'The extract in six parts', {
      b: 'Three parts about the diary itself, one about her past, two about school. (A SOYL summary, not the text.)',
      v: vParts,
      n: 'The extract moves in six parts. First, why keep a diary at all. Second, Anne\'s feeling that she has no true friend. Third, her decision to name the diary Kitty. Fourth, a short sketch of her life. Fifth, school, where the whole class is betting on promotions. And sixth, the funny contest with her maths teacher, Mr Keesing. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: why a diary?', {
      b: 'Anne admits that keeping a diary feels strange: she has never written like this, and she suspects nobody will care about a young girl\'s thoughts. But the urge to write wins, because she has feelings she cannot share aloud. She recalls an old saying comparing the patience of paper with the patience of people, and agrees with it. Since she means to show the diary to no one, it can hold anything.',
      n: 'In your own words, the extract begins with a question: why write a diary? Anne admits it feels strange. She has never written like this, and she doubts anyone will care. But she wants to write, because she has feelings she cannot share aloud. She recalls an old saying about paper being more patient than people, and she agrees. A private diary can hold anything.',
    }),
    sl('concept', 'Summary 2: no true friend, so Kitty', {
      b: 'Anne lists what she has: loving parents, a sixteen-year-old sister, relatives, a good home and many friends and admirers. But with them she talks only about everyday things, and nobody is close enough to confide in. She even wonders if the fault is partly hers. So she decides that the diary itself will be her friend, and she names it Kitty.',
      n: 'Next comes the heart of the extract. Anne has a loving family, a good home and many friends. But she cannot talk to anyone about anything deeper than everyday things. Nobody is truly close. She even wonders if this is partly her fault. So she decides that the diary will be the friend she lacks, and she names it Kitty.',
    }),
    sl('concept', 'Summary 3: a sketch of her life', {
      b: 'Because Kitty is a new friend, Anne gives some background. Her parents married when her father was thirty-six and her mother twenty-five. Margot was born in Frankfurt in 1926, Anne in 1929. Being Jewish, her father moved to Holland in 1933 to run the Opekta Company; the girls stayed with their grandmother in Aachen before joining him. Anne went to a Montessori nursery school, and later Mrs Kuperus, the headmistress, taught her. Her grandmother died in January 1942.',
      n: 'Since Kitty is a new friend, Anne gives some background. Margot was born in Frankfurt in nineteen twenty-six, and Anne in nineteen twenty-nine. Because they were Jewish, the family moved to Holland, the girls first staying with their grandmother in Aachen. Anne went to a Montessori school, and parted from her headmistress, Mrs Kuperus, in tears. Her grandmother died in January nineteen forty-two.',
    }),
    sl('check', 'Check: Anne\'s life in order', {
      chk: 'ord_life',
      n: 'Your turn. Six events from Anne\'s sketch of her life are shuffled. Put them in the order in which they happened. Use the dates you have just learnt as your guide.',
    }),
    sl('concept', 'Summary 4: school and the promotion bets', {
      b: 'At school, the whole class is anxious about the teachers\' meeting that will decide who moves up to the next form. Half the class is betting on the outcome. Anne and her friend G.Z. laugh at two boys who have bet all their holiday savings. Anne is fairly confident about herself and her friends; only maths worries her.',
      n: 'Then Anne turns to school news. Everyone is nervous about the meeting where teachers decide who moves up to the next form. Half the class is betting, and Anne and her friend G.Z. find two boys who have bet all their holiday savings very funny. Anne feels quite confident about herself and her friends. Her one worry is maths.',
    }),
    sl('diagram', 'Summary 5: the contest with Mr Keesing', {
      b: 'Mr Keesing, the maths teacher, is annoyed by Anne\'s talking. Three punishment essays follow; the third is answered with a poem.',
      v: vContest,
      n: 'The extract ends with a battle of wits. Mr Keesing is fed up with Anne\'s talking and sets an essay on being a chatterbox. Anne argues that talking runs in her family, and he laughs. She keeps talking, so he sets a second essay, and then a third with a silly title about quacking. With her friend Sanne, Anne answers in verse, and wins him over.',
    }),
    sl('two-column', 'Theme 1: why Anne valued a diary', {
      b: 'The diary gives Anne what people around her do not.',
      cols: [
        '**What people offered**\n\n- fun and everyday chatter\n- company, but not closeness\n- listeners who might tire or judge',
        '**What the diary offered**\n\n- complete privacy\n- patience: it accepts every mood\n- a friend, Kitty, to confide in',
      ],
      n: 'Why did Anne value her diary so much? Compare what people offered her with what the diary offered. People gave her fun and company, but not closeness, and they might tire or judge. The diary offered complete privacy and endless patience, and by naming it Kitty, Anne turned it into the friend she lacked. That is the key to the first part of the extract.',
    }),
    sl('two-column', 'Theme 2: friendship and loneliness', {
      b: 'It is possible to be lonely in a crowd.',
      cols: [
        '**Seen from outside**\n\n- a loving family and a good home\n- many friends and admirers\n- a lively, popular schoolgirl',
        '**Felt inside**\n\n- no one to share secrets with\n- conversations that stay on the surface\n- a longing for one true friend',
      ],
      n: 'The second theme is friendship and loneliness. From the outside, Anne seems lucky: a loving family, many friends, and a lively, popular personality. Inside, she feels alone, because her conversations stay on the surface and she has no one to share secrets with. Anne shows us that the number of friends matters less than the depth of one friendship.',
    }),
    sl('check', 'Check: why the diary became a friend', {
      chk: 'ar_diary',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Character: Anne', {
      b: 'Every trait in an answer needs an incident, described in your own words.',
      v: vAnne,
      n: 'Let us sketch Anne. She is talkative and lively, which gets her into trouble. She is witty and intelligent, as her essays and poem show. She is lonely and reflective, and honest enough to ask whether the fault is hers. She is affectionate, remembering her grandmother and Mrs Kuperus with love. And she is confident about school. Back every trait with an incident.',
    }),
    sl('concept', 'Character: Mr Keesing', {
      v: vKeesing,
      n: 'Now Mr Keesing. Anne calls him old-fashioned, but he is more than that. He is strict, warning her and setting punishments. He is persistent, setting a new essay each time she keeps talking. He has a sense of humour, laughing at her arguments and inventing a comic title. And he is fair, because when her poem beats him, he enjoys it and stops punishing her.',
    }),
    sl('check', 'Check: Mr Keesing\'s approach today', {
      chk: 'mc_apply_keesing',
      n: 'Check yourself. A student keeps drawing cartoons in class. Which teacher\'s response is most like Mr Keesing\'s final approach to Anne? Think about how the contest ended.',
    }),
    sl('concept', 'The diary form', {
      v: vForm,
      n: 'Now the form. A diary is written in the first person, so we hear Anne\'s own voice. It is private, so she can be completely honest. Anne adds a twist by addressing Kitty, which makes it warm and conversational, like a letter. She mixes her past with the day\'s news. And her informal style gives us the voice of a real schoolgirl, full of humour.',
    }),
    sl('concept', 'Humour in the extract', {
      bl: [
        '**Situation:** two boys bet all their holiday savings on the promotion results.',
        '**Escalation:** each punishment title is sillier than the last.',
        '**Reversal:** the punished pupil wins; the joke ends up on the teacher.',
        '**Self-mockery:** Anne laughs at her own chatter and its supposed family origin.',
        '**Light tone** that contrasts with the dark history readers know.',
      ],
      n: 'The extract is genuinely funny. There is comedy of situation, in the two boys who bet all their holiday savings. There is escalation, as each punishment title gets sillier. There is reversal, because the punished pupil wins and the joke ends up on the teacher. Anne laughs at herself too. And this light tone moves us all the more because we know what came later.',
    }),
    sl('example', 'Writing a diary entry: SOYL\'s own model lines', {
      b: 'Board extrapolation tasks often ask for a diary entry. These lines are SOYL\'s own, showing the features of the form:',
      bl: [
        '*Tuesday, 14 March, 9 p.m.* — date and time',
        '*Dear Diary, today I finally said sorry to Riya, and the knot in my stomach has gone.* — first person, feelings, a friendly address',
        '*Tomorrow I must remember to return her book.* — a look ahead to end the entry',
      ],
      n: 'Board papers often ask you to write a diary entry. Here are some lines of our own showing the features. Start with a date and time. Then write in the first person, with feelings, perhaps addressing the diary as a friend, as Anne does with Kitty. End by looking ahead. Keep header lines short, and write the entry in your own words, never copying the textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words from the chapter are worth learning. Musings are quiet thoughts. Listless means without energy. Brooding is thinking unhappily. To confide is to share secrets. Emigrated means moved to another country to live. Incorrigible means impossible to correct. A fogey is an old-fashioned, dull person. And ingenuity is cleverness, which Anne certainly had.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Anne was witty as well as thoughtful.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + incidents:** turns punishments into clever arguments; answers the silliest title with a poem; reflects honestly on loneliness and her own part in it.',
        '**Link:** wit and reflection together make the diary\'s voice real.',
        '**Conclusion:** a lively girl with a deep inner life.',
      ],
      n: 'Here is how to plan a six mark answer. Take a clear stand: agree. Give three points with incidents in your own words: her clever essay arguments, her poem, and her honest reflection on loneliness. Link this to the theme of the diary\'s honest voice. End with a one-line conclusion. That plan becomes an answer of about one hundred and ten words.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Context: a Jewish girl in Amsterdam, writing in June 1942, weeks before hiding; died 1945; diary published 1947.',
        'Why a diary: no true friend; paper\'s patience; complete privacy; Kitty.',
        'Life sketch: Frankfurt (Margot 1926, Anne 1929) → Holland 1933 → Montessori → Mrs Kuperus; grandmother died 1942.',
        'School: promotion bets; Mr Keesing\'s three essays; the poem with Sanne wins him over.',
        'Read the chapter in *First Flight*; write about it in your own words.',
      ],
      v: vParts,
      n: 'Let us sum up. Anne began her diary in June nineteen forty-two, weeks before going into hiding. She wanted a true friend, so the diary became Kitty. She sketched her life from Frankfurt to Holland. Then came school news: the promotion bets, and Mr Keesing\'s three essays, ending with her winning poem. Remember: read the chapter in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + incident + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with incidents → link to theme → conclusion.',
        'Facts often confused: Kitty is the diary, Sanne the friend, Margot the sister; Mr Keesing taught maths; the extract predates the hiding.',
        'Diary-entry tasks: date, first person, feelings, reflection; short header lines.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, an incident and an explanation. In six mark answers, take a stand with three incidents. Get the names right: Kitty is the diary, Sanne the friend, Margot the sister, and Mr Keesing taught maths. And remember the extract was written before the family went into hiding.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'From the Diary of Anne Frank — study notes',
  sections: [
    {
      h: '1. About the text and the writer',
      t: 1,
      b: `${READ}\n\n**Anne Frank** (1929–1945) was a Jewish girl born in Frankfurt, Germany. Her family moved to Amsterdam in 1933–34 to escape Nazi persecution. She received the notebook that became her diary on her thirteenth birthday, 12 June 1942, and wrote it as letters to an imaginary friend, Kitty. The extract comes from June 1942, a few weeks before the family went into hiding (July 1942) in the Secret Annex behind her father\'s business premises in Amsterdam. They were arrested in August 1944; Anne died in the Bergen-Belsen camp in early 1945. Her father, Otto Frank, the only member of the family to survive, published the diary in 1947.`,
      vs: [vAuthor, vTimeline],
      terms: [['Holocaust', 'The murder of about six million Jews by Nazi Germany and its collaborators during the Second World War.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**Why a diary.** Writing a diary feels strange to Anne, and she suspects nobody will care about a young girl\'s thoughts, but she wants to write and needs a place for her feelings. She recalls an old saying about paper being more patient than people. Since no one else will read it, the diary can hold anything.\n\n**No true friend.** She has a loving family, a home and many friends and admirers, but talks with them only about everyday things; no one is close enough to confide in, and she wonders whether that is partly her fault. So the diary will be her friend, named Kitty.\n\n**A sketch of her life.** Her parents married when her father was thirty-six and her mother twenty-five; Margot was born in 1926 and Anne in 1929, both in Frankfurt. Being Jewish, her father moved to Holland in 1933 and ran the Opekta Company; the girls stayed with their grandmother in Aachen before joining the family. Anne attended a Montessori nursery school and was later taught by the headmistress, Mrs Kuperus, from whom she parted in tears. Her grandmother died in January 1942.\n\n**School.** The class is anxious about promotion; half are betting, and two boys have staked their holiday savings. Anne is confident except about maths.\n\n**Mr Keesing.** Annoyed by her talking, the maths teacher sets an essay on being a chatterbox. Anne argues that talking comes naturally to students and runs in her family. He laughs, but sets a second essay and then a third with a silly title about quacking. Anne and her friend Sanne answer with a poem about a swan father and his noisy ducklings. He reads it to several classes and stops the punishments.',
      v: vParts,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **The value of a diary:** privacy, patience and a listener who never judges.\n- **Friendship and loneliness:** many companions are not the same as one true friend.\n- **Wit and creativity:** a sharp mind turns punishment into victory.\n- **Teachers and pupils:** humour and recognition resolve conflict better than punishment.\n- **Childhood under a shadow:** an ordinary school life, read in the light of the tragedy that followed.\n\n**Message:** true friendship means being understood; honesty with oneself, and a sense of humour, help us through difficult times.',
      vs: [],
      terms: [['Confidant', 'A trusted person with whom one shares secrets.']],
    },
    {
      h: '4. Characters',
      t: 3,
      b: '**Anne:** talkative and lively; witty and intelligent; lonely and reflective; honest and self-aware; affectionate and sensitive; confident.\n\n**Mr Keesing:** strict and persistent, but humorous, fair and open-minded; he enjoys her poem and stops punishing her.\n\n**Others:** Margot (elder sister), her parents, her grandmother (died January 1942), Mrs Kuperus (headmistress), G.Z. (a friend who laughs with Anne at the betting boys), Sanne (who helps with the poem).',
      vs: [vAnne, vKeesing],
    },
    {
      h: '5. The diary form and humour',
      t: 4,
      b: '- **First person**, private and informal: complete honesty.\n- **Addressed to Kitty:** a warm, conversational, letter-like tone.\n- **Past and present mixed:** her life story and the day\'s school news.\n- **Humour:** the betting boys; ever-sillier punishment titles; the reversal in which the joke ends up on the teacher; Anne\'s self-mockery.\n- **Dramatic irony for today\'s reader:** we know what Anne could not.',
      v: vForm,
      terms: [
        ['Diary', 'A private, dated, first-person record of events, thoughts and feelings.'],
        ['Reversal', 'A turn in which a situation becomes its opposite.'],
      ],
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the chapter, with meanings. Learn the words; describe the sentences they appear in in your own words.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 5,
      b: '**Extract-based (5 marks):** the board prints a passage from the chapter; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the chapter.\n\n**Short answers (3 marks, 40–50 words):** point + incident + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with incidents in your own words; a link to a theme; a conclusion. Extrapolation tasks (Mr Keesing\'s diary, your own diary addressed to a friend) must stay consistent with the characters. Keep header lines short.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant incidents, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Mixing up names: Kitty is the diary, Sanne the friend, Margot the sister.\n2. Saying the extract was written in hiding: it dates from June 1942, before the hiding.\n3. Saying Mr Keesing taught English: he taught maths.\n4. Saying Anne had no friends at all: she had many, but no confidant.\n5. Quoting long lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who was Anne Frank?', 'A Jewish girl (1929–1945), born in Frankfurt, who grew up in Amsterdam and kept a diary.', 'fact', 1],
  ['When did Anne receive her diary?', 'On her thirteenth birthday, 12 June 1942.', 'fact', 1],
  ['When was this extract written?', 'June 1942, a few weeks before the family went into hiding.', 'fact', 1],
  ['What name did Anne give her diary?', 'Kitty.', 'fact', 2],
  ['Why did Anne feel writing a diary was strange?', 'She had never written like this and doubted anyone would care about her thoughts.', 'concept', 2],
  ['What does the old saying Anne recalls compare?', 'The patience of paper with the patience of people.', 'concept', 2],
  ['Why did Anne want a diary?', 'She had no true friend to confide in; the diary would be that friend.', 'concept', 2],
  ['Did Anne have no friends at all?', 'No: she had many friends and admirers, but no confidant.', 'concept', 2],
  ['Where and when were Margot and Anne born?', 'Frankfurt; Margot in 1926, Anne on 12 June 1929.', 'fact', 1],
  ['Why did the family move to Holland?', 'They were Jewish and faced persecution in Germany (father moved in 1933).', 'fact', 1],
  ['What was her father\'s company?', 'The Dutch Opekta Company, making products for jam-making.', 'fact', 1],
  ['Where did the girls stay while the parents settled?', 'With their grandmother in Aachen.', 'fact', 1],
  ['Who was Mrs Kuperus?', 'The headmistress who taught Anne in the sixth form; they parted in tears.', 'fact', 3],
  ['When did Anne\'s grandmother die?', 'January 1942.', 'fact', 1],
  ['Why was the class nervous?', 'The teachers were about to decide who would move up to the next form.', 'fact', 1],
  ['Which subject worried Anne?', 'Maths.', 'fact', 1],
  ['Why did Mr Keesing punish Anne?', 'She talked too much in his maths lessons.', 'fact', 3],
  ['Titles of the first two essays', '*A Chatterbox*; *An Incorrigible Chatterbox*.', 'fact', 3],
  ['Anne\'s argument in the first essay', 'Talking is natural to students; she would try to talk less; the habit came from her mother.', 'concept', 3],
  ['How did Anne answer the third essay?', 'With a poem, written with her friend Sanne, about a swan father and his noisy ducklings.', 'fact', 3],
  ['How did Mr Keesing react to the poem?', 'He enjoyed it, read it to several classes and stopped punishing her.', 'fact', 3],
  ['Five traits of Anne', 'Talkative, witty, lonely and reflective, honest, affectionate.', 'concept', 3],
  ['Three traits of Mr Keesing', 'Strict, humorous, fair.', 'concept', 3],
  ['Features of the diary form', 'First person, private, informal, addressed to Kitty, past and present mixed.', 'concept', 4],
  ['Main theme of the extract', 'Friendship and loneliness: many companions are not one true friend.', 'concept', 2],
  ['*incorrigible*', 'impossible to correct or reform', 'definition', 4],
  ['*listless*', 'lacking energy or interest', 'definition', 4],
  ['*confide*', 'to share secrets or private feelings with someone', 'definition', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with incidents → link to theme → conclusion (100–120 words).', 'exam-tip', 5],
  ['Most common factual slip', 'Mixing up Kitty, Sanne and Margot, or saying the extract was written in hiding.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — From the Diary of Anne Frank',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the chapter in First Flight.)', items: ['src_friend'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_why_diary', 'sa_essay1', 'sa_keesing_change', 'sa_promotion'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_anne', 'la_value'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — From the Diary of Anne Frank',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_strange', 'src_sketch'] }, { attempt: 1, keys: ['src_keesing', 'src_poem'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_family', 'sb_holland', 'sb_why_punished', 'sb_after'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_lonely', 'sa_kitty', 'sa_grandma', 'sa_poem_trick', 'sa_humour'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_keesing', 'la_form_humour'] }, { attempt: 1, keys: ['la_keesing_diary', 'la_lonely_teens'] }] },
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
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the diary; summaries in SOYL words; essay titles named only as titles; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the extract and the historical record',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
