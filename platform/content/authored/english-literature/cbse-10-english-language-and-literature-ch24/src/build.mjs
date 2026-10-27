// Build CBSE 10 English Language and Literature ch24 "The Thief's Story" (Ruskin Bond). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch24/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased, and its dialogue is only reported. Students read it in Footprints without Feet.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { guard } from '../../cbse-10-english-language-and-literature-ch23/src/guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch24', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the story itself in your textbook, *Footprints without Feet* (NCERT supplementary reader).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints)', '100–120 words: character, theme, values, diary, letter or speech', '6'],
    ['Extract (reference to context)', 'not set from this reader; SOYL tests use commentary items only as comprehension checks', '—'],
  ],
  'Table of how a Footprints without Feet story is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme, values, or a diary, letter or speech. Extracts are not set from this reader.',
  'CBSE 2026-27, Section C (literature), questions on the supplementary reader.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'Ruskin Bond (born 1934), Indian writer of short stories, novels and children’s books'],
    ['Known for', 'gentle stories of ordinary people in the hill towns and small towns of north India'],
    ['Genre', 'short story told in the first person by the thief himself'],
    ['Setting', 'a town in north India, with a railway line to Lucknow'],
    ['Main characters', 'Hari Singh, a young thief (the narrator); Anil, a young writer'],
  ],
  'Table of facts: the author is Ruskin Bond, born 1934, an Indian writer known for gentle stories of ordinary people in north India; the story is told in the first person by the thief; it is set in a north Indian town with a railway line to Lucknow; the main characters are Hari Singh, a young thief, and Anil, a young writer.',
);
const vStages = flow('LR', ['A thief finds a target', 'Food, cooking and lessons', 'Money under the mattress', 'The theft and the station', 'Thinking in the rain', 'A wet note and a smile'], 'Flow of the story in six stages: a thief finds a target; food, cooking and lessons; money under the mattress; the theft and the station; thinking in the rain; a wet note and a smile.', 'The story in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Trust transforms', 'Anil’s faith makes betrayal unbearable for Hari.'],
    ['Education as a way up', 'Writing his name opens a future for Hari.'],
    ['Conscience', 'Hari cannot board the train.'],
    ['Forgiveness without words', 'The wet note and the silence.'],
    ['Kindness over punishment', 'Anil teaches instead of dismissing or reporting.'],
    ['People above money', 'Anil cares little for money and much for people.'],
  ],
  'Table of six themes with where each appears: trust transforms, education as a way up, conscience, forgiveness without words, kindness over punishment, and people above money.',
);
const vHari = table(
  ['Hari at the start', 'Hari at the end'],
  [
    ['Changes his name to suit his plans', 'Smiles openly at the man he wronged'],
    ['Flatters and lies to get work', 'Returns what he took'],
    ['Skims the shopping money', 'Chooses learning over easy money'],
    ['Sees Anil as a target', 'Sees Anil as a teacher and friend'],
  ],
  'Table contrasting Hari at the start and at the end: from changing names, lying and skimming money, and seeing Anil as a target, to smiling openly, returning the money, choosing learning, and seeing Anil as a teacher and friend.',
);
const vAnil = table(
  ['Anil’s trait', 'Evidence (in SOYL’s words)'],
  [
    ['Generous', 'Feeds a stranger though he cannot pay wages.'],
    ['Patient', 'Teaches cooking after a disastrous first meal.'],
    ['Careless with money', 'Earns irregularly; keeps notes under a mattress.'],
    ['Trusting', 'Lets Hari handle the shopping money.'],
    ['Forgiving', 'Says nothing about the theft; pays him and starts the next lesson.'],
  ],
  'Table of Anil’s traits with evidence: generous, patient, careless with money, trusting and forgiving.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['conscience', 'the inner sense of right and wrong'],
    ['remorse', 'deep regret for a wrong done'],
    ['reform', 'to change for the better'],
    ['betray', 'to break someone’s trust'],
    ['flatter', 'to praise insincerely to gain favour'],
    ['irregular', 'not happening at fixed times'],
    ['redemption', 'being saved from wrongdoing'],
    ['transformation', 'a complete change'],
  ],
  'Table of word meanings: conscience, remorse, reform, betray, flatter, irregular, redemption and transformation.',
  'Key words for this story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a value or theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a value or theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'The Thief’s Story',
  goals: [
    'Retell the events of the story, from the first meeting to the wet note, in your own words',
    'Explain how trust and education change the thief',
    'Describe Hari Singh’s inner conflict and Anil’s trusting nature with evidence',
    'Discuss the values of trust, forgiveness and education',
    'Write 3-mark and 6-mark answers within the word limits',
  ],
  slides: [
    sl('title', 'The Thief’s Story — Ruskin Bond', {
      b: `*Footprints without Feet* (supplementary reader) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study The Thief’s Story by Ruskin Bond, in which a young thief is changed by a man who trusts him. Please read the story in your textbook, Footprints without Feet, before you go on. This lesson does not repeat the text. In the board exam, this reader is tested through short and long answers on character, theme and values.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *Footprints without Feet*.',
        'Use these slides for the sequence of events, the themes and the two characters.',
        'The board asks 3-mark and 6-mark questions on this reader, not extracts: practise those most.',
        'Explain events **in your own words**; do not memorise lines.',
      ],
      n: 'Here is how to use this lesson. Read the story first. Then use these slides for the order of events, the themes and the two characters, Hari and Anil. The board does not print extracts from this reader; it asks short and long answers. So focus on explaining, in your own words, why Hari changes and what Anil’s silence means.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Ruskin Bond, born in nineteen thirty-four, is one of India’s best-loved writers in English. His stories are gentle and observant, often about ordinary people in small towns and hill stations. This story is told in the first person by the thief himself, so we hear his clever plans and, later, his doubts, directly from him.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'A theft that is undone, and a change of heart. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves through six stages. A young thief finds a target in Anil. He gets food, cooking practice and lessons. Anil brings home money and hides it under his mattress. Hari steals it and goes to the station. In the rain he thinks again. And the next morning, a wet note and a smile end the story. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: a thief finds a target', {
      b: 'The narrator is a young, practised thief who changes his name whenever it suits him; for now he is Hari Singh. He picks out Anil, a young writer, at a wrestling match, flatters him and asks for work. Anil cannot pay wages but offers food if Hari will cook. Hari says he can, which is a lie.',
      n: 'Our narrator is a young thief, experienced at his trade, who changes his name to suit his plans. At present he calls himself Hari Singh. At a wrestling match he spots Anil, a young writer, flatters him and asks for work. Anil cannot pay, but he offers food in return for cooking. Hari claims he can cook, though he cannot.',
    }),
    sl('concept', 'Summary 2: food, cooking and lessons', {
      b: 'Hari’s first meal is so bad that Anil gives it to a stray dog, yet he teaches the boy to cook. He also teaches him to write his name and promises full sentences and sums. Hari is grateful, but he still keeps a little of the shopping money. Anil, paid irregularly for his writing, hardly notices.',
      n: 'Hari’s first meal is a disaster; Anil hands it to a stray dog. But instead of sending him away, Anil teaches him to cook, then to write his name, and promises to teach him sentences and sums. Hari is grateful, yet he still keeps a little of the shopping money. Anil, who is paid only now and then for his writing, hardly notices.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in order, from the meeting at the wrestling match to the morning of the wet note.',
    }),
    sl('concept', 'Summary 3: the theft and the station', {
      b: 'One day Anil sells a book and brings home a bundle of notes, which he puts under his mattress. That night Hari takes the money and hurries to the station to catch a train to Lucknow. But as the train pulls out, he does not get on.',
      n: 'Then comes the test. Anil sells a book and brings home a bundle of notes, which he tucks under his mattress. That night Hari slides the money out and hurries to the station, planning to take a train to Lucknow and vanish. Yet when the train starts to move, something holds him back, and he lets it leave without him.',
    }),
    sl('concept', 'Summary 4: thinking in the rain', {
      b: 'Wandering in the rain, Hari imagines how Anil will feel: not angry, but sad that his trust was betrayed. He also realises that learning to read and write could make him a respected person, worth more than any stolen money. He goes back and slips the damp notes under the mattress.',
      n: 'Out in the rain, Hari thinks. He imagines Anil waking up, not angry about the money but saddened that the boy he trusted has betrayed him. He also sees that reading and writing could make him a respected person one day, which stolen money never could. So he returns, and quietly slips the damp notes back under the mattress.',
    }),
    sl('concept', 'Summary 5: a wet note and a smile', {
      b: 'Next morning Anil has made tea. He hands Hari a fifty-rupee note and says he will be paid regularly now. The note is still damp, so Hari knows Anil found out. Anil says only that they will start writing sentences today. Hari smiles, and neither speaks of the theft.',
      n: 'The next morning, Anil has made tea. He gives Hari a fifty-rupee note and says that from now on he will be paid regularly. Hari notices the note is still damp, and realises Anil knows everything. Yet Anil says nothing about it; he simply announces that today they will begin writing sentences. Hari smiles. The theft is never mentioned.',
    }),
    sl('two-column', 'Theme 1: trust and education change a thief', {
      b: 'Two forces work together on Hari.',
      cols: [
        '**Trust**\n\n- a stranger taken in without questions\n- money placed in his hands\n- betrayal becomes painful\n- silent forgiveness at the end',
        '**Education**\n\n- writing his own name\n- the promise of sentences and sums\n- a vision of a respected future\n- worth more than stolen notes',
      ],
      n: 'The central theme is how trust and education change Hari. Trust makes him feel valued, so betraying Anil becomes painful, and silent forgiveness seals the change. Education shows him a future as a respected person, worth more than any stolen money. In answers, show how both forces work on him, especially at the station and in the rain.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that centre sit other themes. Conscience, which stops Hari boarding the train. Forgiveness without words, in the wet note and the silence. Kindness over punishment, because Anil teaches rather than reports. And people above money, since Anil cares little for wealth and a great deal for people. Each theme can anchor a six mark answer.',
    }),
    sl('check', 'Check: Anil’s method today', {
      chk: 'mc_apply_teacher',
      n: 'Check yourself. A teacher finds a student has copied homework, speaks to him privately and offers extra help instead of punishment. Whose approach from the story does this resemble?',
    }),
    sl('concept', 'Character: Hari’s change', {
      b: 'Show the change with evidence from the beginning and the end.',
      v: vHari,
      n: 'Hari changes more than anyone else in the story. At the start he changes his name, flatters and lies, skims money and sees Anil as a target. By the end he has returned what he took, chosen learning over easy money, and smiles openly at the man he wronged. A good answer traces this journey step by step, with evidence.',
    }),
    sl('two-column', 'Hari’s inner conflict', {
      cols: [
        '**The thief in him**\n\n- sees an easy chance\n- takes the notes\n- heads for the train',
        '**The learner in him**\n\n- values Anil’s trust\n- wants an educated future\n- cannot board; returns the money',
      ],
      n: 'Your syllabus asks about Hari’s inner conflict. One side of him is the practised thief who sees a chance, takes the notes and heads for the train. The other side is a grateful learner who values Anil’s trust and wants an educated future. The struggle peaks on the platform and in the rain, and the learner wins.',
    }),
    sl('concept', 'Character: Anil', {
      v: vAnil,
      n: 'Anil is generous, feeding a stranger he cannot pay. He is patient, teaching cooking after a disastrous first meal. He is careless with money, which makes him an easy target. Above all, he is trusting and forgiving. His silence after the theft is not ignorance; it is a deliberate kindness that lets Hari keep his dignity.',
    }),
    sl('check', 'Check: the train', {
      chk: 'ar_station',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Narration and the ending', {
      bl: [
        '**First-person narrator:** we share the thief’s plans and doubts.',
        '**Understatement:** big feelings, few words.',
        '**A telling detail:** the damp note reveals everything without dialogue.',
        '**An open, silent ending:** forgiveness is shown, not spoken.',
        '**Irony:** the robbed man pays the robber the next morning.',
      ],
      n: 'How does Bond tell the story? Through the thief’s own voice, so we share his plans and doubts. He uses understatement: big feelings, few words. A single detail, the damp note, reveals the truth without a conversation. The ending is silent and open; forgiveness is shown, not spoken. And there is irony, since the man who was robbed pays the robber.',
    }),
    sl('example', 'A telling detail: SOYL’s own examples', {
      b: 'Practise spotting how one small detail can reveal a whole truth. These sentences are SOYL’s own, not from the story:',
      bl: [
        '*Mother said nothing about the broken vase, but the next day a tube of glue sat on my desk.* — a detail that shows she knew',
        '*The coach handed me the captain’s armband, still warm from his own hand.* — a detail that shows trust passed on',
        '*My friend returned the borrowed book with a new bookmark inside, at the page I had stopped reading.* — a detail that shows care',
      ],
      n: 'Here are three sentences of our own. A tube of glue shows that mother knew about the vase. A warm armband shows trust passed on. A bookmark at the right page shows care. In each, one small object speaks louder than words. Now look at how Bond uses the damp note in your textbook in the same way.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. Conscience is your inner sense of right and wrong. Remorse is deep regret. To reform is to change for the better, and to betray is to break trust. To flatter is to praise insincerely. Irregular means not at fixed times. Redemption is being saved from wrongdoing, and a transformation is a complete change.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *How do trust and education change Hari?*',
      v: vLongPlan,
      bl: [
        '**Stand:** together they turn a thief towards honesty.',
        '**Points + evidence:** Anil’s trust (money in his hands); lessons (his name, the promise of sentences); the station and the rain.',
        '**Turn:** he returns the money; Anil forgives silently.',
        '**Value + conclusion:** kindness reforms better than punishment.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: together, trust and education turn Hari towards honesty. Give points with evidence: Anil trusts him with money, teaches him his name, and promises more. Then show the turn at the station and in the rain, and the silent forgiveness. Finish with a value: kindness reforms better than punishment.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Hari Singh, a young thief, gets work with Anil, a writer, by flattery and a lie.',
        'Anil feeds him, teaches him to cook and to write his name.',
        'Hari steals Anil’s money but cannot board the train; in the rain he decides to return it.',
        'A damp fifty-rupee note shows Anil knew; he forgives without a word.',
        'Read the story in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Hari, a young thief, gets work with Anil through flattery and a lie. Anil feeds and teaches him. Hari steals Anil’s money but cannot leave, and in the rain he decides to return it. The next morning, a damp note shows that Anil knew, and forgave him without a word. Read the story in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → value or theme → conclusion.',
        'Facts often confused: Hari never boarded the train; Anil never mentioned the theft; the note was damp from the rain.',
        'For conflict questions, show both sides of Hari and say which wins and why.',
        'Value questions: trust, forgiveness, education, reform without punishment.',
      ],
      n: 'Exam tips. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand, give three supported points, and link to a value. Get the facts right: Hari never boarded the train, Anil never mentioned the theft, and the note was damp from the rain. In conflict questions, show both sides of Hari.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Thief’s Story — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Ruskin Bond** (born 1934) is an Indian writer in English, known for gentle, observant stories of ordinary people in the small towns and hills of north India. This story is told in the first person by the thief himself, so we follow his plans and his change of heart from the inside.`,
      v: vAuthor,
      terms: [['First-person narrator', 'A character who tells the story using “I”.']],
    },
    {
      h: '2. Summary (in SOYL’s words)',
      t: 1,
      b: '**The target.** A young, practised thief, calling himself Hari Singh, flatters Anil, a young writer, at a wrestling match and asks for work. Anil offers food instead of wages if Hari will cook; Hari falsely says he can.\n\n**Lessons.** Hari’s first meal goes to a stray dog, but Anil teaches him to cook, to write his name, and promises sentences and sums. Hari still keeps a little of the shopping money.\n\n**The theft.** Anil sells a book and puts the money under his mattress. At night Hari takes it and goes to the station to catch a train to Lucknow, but he does not board.\n\n**The return.** In the rain he thinks of Anil’s sadness at broken trust and of the future education could give him. He returns the damp notes.\n\n**The ending.** Next morning Anil gives him a fifty-rupee note, still damp, and promises regular pay. Hari realises Anil knows. Anil only says they will start writing sentences, and Hari smiles.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Trust transforms:** Anil’s faith makes betrayal unbearable.\n- **Education as a way up:** writing his name shows Hari a future.\n- **Conscience:** Hari cannot board the train.\n- **Forgiveness without words:** the damp note and the silence.\n- **Kindness over punishment:** Anil teaches instead of reporting.\n- **People above money:** Anil cares little for wealth.\n\n**Message:** trust, kindness and education can reform a wrongdoer more surely than punishment.',
      v: vThemes,
      terms: [['Reform', 'To change a person, especially for the better.']],
    },
    {
      h: '4. Hari Singh: inner conflict and change',
      t: 3,
      b: '**At the start:** changes his name, flatters, lies about cooking, skims the shopping money, sees Anil as a target.\n\n**The conflict:** the thief sees an easy chance; the learner values Anil’s trust and wants an educated future. The struggle peaks on the platform and in the rain.\n\n**At the end:** returns the money, chooses learning, smiles openly at the man he wronged.',
      v: vHari,
    },
    {
      h: '5. Anil',
      t: 3,
      b: '**Generous** (feeds a stranger). **Patient** (teaches after a bad first meal). **Careless with money** (irregular income; notes under a mattress). **Trusting** (lets Hari handle money). **Forgiving** (silent about the theft; pays him; starts the next lesson). His silence is a deliberate kindness, not ignorance.',
      v: vAnil,
    },
    {
      h: '6. Narration and technique',
      t: 2,
      b: '- **First person:** the thief’s own voice.\n- **Understatement:** few words for big feelings.\n- **A telling detail:** the damp note reveals the truth.\n- **Silent, open ending:** forgiveness shown, not spoken.\n- **Irony:** the robbed man pays the robber.\n\nSOYL practice sentence (not from the story): *Mother said nothing about the broken vase, but the next day a tube of glue sat on my desk* (a detail that shows she knew).',
      terms: [['Understatement', 'Saying less than is meant, so that the reader feels more.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the story: conscience, remorse, reform, betray, flatter, irregular, redemption, transformation. Use them in your own sentences, for example: *Anil’s trust awakened Hari’s conscience.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this reader is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) on *Footprints without Feet*. It does not print extracts from this reader; SOYL’s commentary items are comprehension practice only.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a value or theme; a one-line conclusion. Extrapolation tasks (Anil’s diary, a letter from Hari years later, an assembly speech) must stay consistent with the story.\n\nRe-read the story in *Footprints without Feet* before a test.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** Footprints short answers (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) (CBSE 2026-27, Section C). No extracts from this reader.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Hari escaped on the train: he never boarded it.\n2. Saying Anil scolded Hari or called the police: he never mentioned the theft.\n3. Missing why the note was damp: it was the returned money, soaked in the rain.\n4. Forgetting education as a reason for Hari’s return; trust is only half the answer.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the story in your textbook, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Thief’s Story*?', 'Ruskin Bond (born 1934).', 'fact', 1],
  ['Who narrates the story?', 'The young thief himself, in the first person.', 'fact', 1],
  ['What name is the thief using?', 'Hari Singh (he changes names as it suits him).', 'fact', 1],
  ['Who is Anil?', 'A young writer who takes Hari in.', 'fact', 1],
  ['Where does Hari meet Anil?', 'At a wrestling match.', 'fact', 1],
  ['What did Anil offer instead of wages?', 'Food, if Hari would cook.', 'fact', 1],
  ['What lie did Hari tell?', 'That he could cook.', 'fact', 3],
  ['What happened to the first meal?', 'Anil gave it to a stray dog.', 'fact', 1],
  ['What did Anil teach Hari?', 'To cook and to write his name; he promised sentences and sums.', 'fact', 2],
  ['Hari’s old habit at Anil’s', 'Keeping a little of the shopping money.', 'fact', 3],
  ['How did Anil earn money?', 'Writing for magazines, paid irregularly.', 'fact', 3],
  ['Where did Anil keep the book money?', 'Under his mattress.', 'fact', 1],
  ['Where did Hari go with the money?', 'To the station, to catch a train to Lucknow.', 'fact', 1],
  ['What happened at the station?', 'Hari let the train leave without him.', 'fact', 1],
  ['Two thoughts in the rain', 'Anil’s sadness at broken trust; the future education could give him.', 'concept', 3],
  ['What did Hari do after the rain?', 'Put the damp notes back under the mattress.', 'fact', 1],
  ['What did Anil give Hari next morning?', 'A fifty-rupee note, with a promise of regular pay.', 'fact', 1],
  ['What did the damp note reveal?', 'That Anil knew about the theft.', 'concept', 2],
  ['Anil’s response to the theft', 'Silence, and the next lesson: writing sentences.', 'concept', 3],
  ['Central theme', 'Trust and education reform the thief.', 'concept', 2],
  ['Hari’s inner conflict', 'The thief who sees a chance vs the learner who values trust.', 'concept', 3],
  ['Three traits of Anil', 'Generous, trusting, forgiving (also patient, careless with money).', 'concept', 3],
  ['Irony of the ending', 'The robbed man pays the robber the next morning.', 'concept', 2],
  ['Tone of the story', 'Quiet, warm and reflective.', 'concept', 2],
  ['*conscience*', 'the inner sense of right and wrong', 'definition', 1],
  ['*betray*', 'to break someone’s trust', 'definition', 1],
  ['*redemption*', 'being saved from wrongdoing', 'definition', 1],
  ['How this reader is examined', '3-mark short answers (40–50 words) and a 6-mark long answer; no extracts.', 'exam-tip', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → value or theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Hari escaped on the train, or that Anil scolded him.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
// Supplementary-reader blueprints (catalog chapter override, 2026-10-27): no extract section; the board sets
// Footprints without Feet only as 3-mark short answers (two of three) and a 6-mark long answer.
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short-supplementary',
  title: 'Chapter test (short) — The Thief’s Story',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_cooking', 'sa_station', 'sa_narrator'] }, { attempt: 2, keys: ['sa_anil_trust', 'sa_wet_note', 'sa_anil_money'] }] },
    { id: 'B', title: 'Section B — Long answer (6 marks)', instr: 'Answer any one of two questions in 100–120 words.', items: [{ attempt: 1, keys: ['la_trust_education', 'la_anil_sketch'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long-supplementary',
  title: 'Chapter test (long) — The Thief’s Story',
  duration: 80,
  sections: [
    { id: 'A', title: 'Section A — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_who', 'sb_lessons', 'sb_rain', 'sb_smile'] }] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Two sets of three questions; in each set answer any two in 40–50 words.', items: [{ attempt: 2, keys: ['sa_approach', 'sa_education', 'sa_title'] }, { attempt: 2, keys: ['sa_reflection', 'sa_hari_conflict', 'sa_reform'] }] },
    { id: 'C', title: 'Section C — Long answers (6 marks each)', instr: 'Answer one question from each of the three pairs in 100–120 words.', items: [{ attempt: 1, keys: ['la_hari_sketch', 'la_ending'] }, { attempt: 1, keys: ['la_diary_anil', 'la_letter_hari'] }, { attempt: 1, keys: ['la_values', 'la_forgive_debate'] }] },
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
    pattern: 'Footprints without Feet is examined by 3-mark short answers (Q9) and a 6-mark long answer, not extracts; the bank is weighted to those (14 three-mark, 9 long); the 5 commentary items fill the chapter-test blueprints’ extract slots as comprehension checks',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the text; dialogue reported, never quoted; summaries in SOYL words; commentary items use passage_origin soyl-commentary; single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the story',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});

// D-036 reproduction guard: short distinctive phrases (at most 4 words) that must never appear.
guard(DIR, [
  'fairly successful hand', 'fits and starts', 'easiest man', 'touch of sadness', 'loss of trust', 'wad of notes',
  'clever, educated man', 'a big man', 'whole sentences', 'add figures', "night's rain", 'a greedy man',
  'shows fear', 'covered market', 'clock tower', 'a full-grown man', 'educated man', 'grown man',
]);
