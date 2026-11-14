// Build CBSE 11 English Core ch04 "The Portrait of a Lady" (Khushwant Singh). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-11-english-core-ch04/src/build.mjs
// LITERATURE RULE (D-036): everything here is SOYL's own summary, analysis and commentary; the memoir is never
// quoted or closely paraphrased. Students read it in Hornbill.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-11-english-core-ch01/src/lib.mjs';
import { guard } from '../../../english-language/cbse-11-english-core-ch01/src/guard.mjs';

setUnit('cbse-11-english-core-ch04', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the memoir itself in your textbook, *Hornbill* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the school paper', 'Question form', 'Marks'],
  [
    ['Hornbill prose extract', 'a passage with short questions', '3'],
    ['Short answers (Hornbill)', 'answer in a few sentences', '2 and 3'],
    ['Long answer', 'about 100-120 words: character, theme, diary, letter or opinion', '6'],
    ['SOYL chapter tests', 'a 4-mark commentary set; 2- and 3-mark shorts; 5-mark long answers', 'as set'],
  ],
  'Table of how a Hornbill prose piece is examined: a three-mark prose extract, short answers of two and three marks, a long answer of about one hundred to one hundred and twenty words, and the SOYL chapter-test pattern.',
  'CBSE Class 11 school annual examination, Section C (literature).',
);
const vText = table(
  ['About the text', ''],
  [
    ['Author', 'Khushwant Singh (1915-2014), Indian novelist, journalist and editor; best known for the novel *Train to Pakistan*'],
    ['Form', 'a memoir: the author recalls his grandmother'],
    ['Narrator', 'first person: the author as her grandson'],
    ['Structure', 'four stages in time order, then her death and its close'],
    ['Tone', 'affectionate, gentle, with quiet humour'],
  ],
  'Table of facts about the memoir: author Khushwant Singh, an Indian novelist and journalist; a memoir told in the first person by the grandson; four stages in time order; an affectionate, gently humorous tone.',
);
const vStages = flow('LR', ['Village: close companions', 'City: a gap opens', 'University: friendship thins', 'Abroad and return: joy, then illness', 'Death: the sparrows gather'], 'Flow of the memoir in five stages: village companionship, the gap in the city, thinning friendship at university, the return from abroad followed by illness, and her death with the sparrows gathering.', 'The memoir in five stages (SOYL summary).');
const vCompare = table(
  ['', 'Village', 'City'],
  [
    ['School', 'attached to the temple', 'an English school reached by bus'],
    ['Her part', 'walks him there; reads the scriptures', 'cannot accompany him or help with lessons'],
    ['After school', 'feeds the village dogs', 'later, feeds the sparrows in the afternoons'],
    ['Her view of learning', 'content: scriptures beside lessons', 'upset: science, English, music, no religion'],
  ],
  'Table comparing the village and the city: the kind of school, the grandmother’s part, what she does after school, and her view of what is taught.',
);
const vEnd = flow('LR', ['He returns from abroad', 'That evening she sings and drums with neighbours', 'Next morning: fever', 'She says her end has come and prays', 'She dies peacefully; sparrows gather'], 'Flow of the last stage: his return, the evening of singing, the fever the next morning, her prayers and peaceful death, and the gathering of the sparrows.', 'Her last days (SOYL summary).');
const vDistance = table(
  ['Stage', 'What they share', 'What is lost'],
  [
    ['Village', 'walks, scriptures, the dogs', 'nothing yet'],
    ['City', 'the same house', 'her place as helper; common ideas about learning'],
    ['University', 'little daily time', 'the shared routine'],
    ['Abroad', 'letters of the heart, not daily life', 'five years together'],
    ['Return', 'her joy at his coming home', 'time left'],
  ],
  'Table of the changing relationship by stage, showing what they share and what is lost at each stage, from the village to his return.',
  'The distance grows, but the affection does not.',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Changing relationship', 'daily companions become distant friends'],
    ['Old age and faith', 'her prayers, rosary and calm to the end'],
    ['Change across generations', 'her views on school and music against his new world'],
    ['Distance without loss of love', 'her joy when he returns'],
    ['Death', 'a peaceful end, mourned in silence by the sparrows'],
  ],
  'Table of five themes of the memoir with where each appears: the changing relationship, old age and faith, change across generations, distance without loss of love, and death.',
);
const vSparrows = table(
  ['What the birds do', 'What it suggests'],
  [
    ['gather around her body in large numbers', 'they were part of her daily world'],
    ['stay silent', 'respect and shared sorrow'],
    ['ignore the crumbs', 'they have not come for food'],
    ['leave quietly', 'the farewell is complete'],
  ],
  'Two-column table of what the sparrows do at her death and what each action suggests: belonging to her world, shared sorrow, not coming for food, and a quiet farewell.',
);
const vPlanCase = flow('LR', ['Read the commentary first', 'Read each question', 'Find the idea in the commentary', 'Answer in your own words', 'Add the memoir where asked'], 'Flow for answering a commentary-passage set: read the commentary, read each question, find the idea, answer in your own words, and add knowledge of the memoir where asked.');
const vPlanLong = flow('LR', ['Take a clear stand', 'Point and incident (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a long answer: take a stand, give points with incidents in your own words, link to a theme, and conclude.');

const vGrand = table(
  ['Trait', 'Evidence (in SOYL’s words)'],
  [
    ['Devout and serene', 'prayers and rosary every day; a calm, peaceful look'],
    ['Caring', 'feeds the village dogs, later the sparrows'],
    ['Traditional', 'values learning that goes with scriptures; dislikes music lessons'],
    ['Accepting', 'quiet at her spinning wheel; calm at the station'],
    ['Warm beneath the calm', 'sings and drums for hours on his return'],
    ['Peaceful and strong at the end', 'faces death in prayer, without fear'],
  ],
  'Table of the grandmother’s traits with evidence: devout and serene, caring, traditional, accepting, warm beneath her calm, and peaceful at the end.',
);
const vNarrator = table(
  ['Stage', 'The narrator'],
  [
    ['Village', 'a child, dependent on her and fond of her'],
    ['City', 'absorbed in a new school and its subjects'],
    ['University', 'independent, with a room of his own'],
    ['Abroad', 'away five years, in a new world'],
    ['Return and after', 'welcomed home; he records her last days with affection'],
  ],
  'Table of the narrator’s development by stage: a dependent child, a pupil absorbed in a new school, an independent student, a man abroad, and a grandson who records her last days with affection.',
);
const vCompareChars = table(
  ['', 'Grandmother', 'Narrator'],
  [
    ['Learning', 'religious teaching and the scriptures', 'English, science, music'],
    ['Way of showing feeling', 'routine, prayer and, once, song', 'time spent together, then a loving memoir'],
    ['Response to distance', 'quiet acceptance', 'moves on, but remembers with affection'],
    ['Bond', 'steady and warm', 'real, though less visible while he is young'],
  ],
  'Table comparing the grandmother and the narrator on learning, the way of showing feeling, response to distance and the bond between them.',
);
const vCraft = table(
  ['Device or choice', 'Effect'],
  [
    ['First-person memoir', 'closeness and honesty; he admits the drift'],
    ['Time-ordered stages', 'shows the distance growing step by step'],
    ['Gentle humour', 'keeps the tone warm, never mocking'],
    ['Recurring detail: feeding creatures', 'prepares the closing image'],
    ['Restraint at death', 'the sparrows carry the emotion'],
  ],
  'Table of craft choices in the memoir and their effects: first-person closeness, time-ordered stages, gentle humour, the recurring detail of feeding creatures, and restraint at her death.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['serene', 'calm and peaceful'],
    ['resignation', 'quiet acceptance of what cannot be changed'],
    ['devout', 'deeply religious'],
    ['scriptures', 'holy writings'],
    ['rosary', 'a string of beads used to count prayers'],
    ['cremation', 'burning of the body as a funeral rite'],
    ['verandah', 'a roofed, open space along the side of a house'],
  ],
  'Table of word meanings: serene, resignation, devout, scriptures, rosary, cremation and verandah.',
  'Single words from the memoir with their meanings.',
);
const vDiaryPlan = flow('LR', ['Day, date, salutation', 'What happened today', 'How I felt', 'A thought about the future', 'Sign off'], 'Flow for planning a diary entry: day and salutation, what happened, how I felt, a thought about the future, and a sign-off.');
const vSketch = flow('LR', ['Opening line: overall impression', 'Trait one and incident', 'Trait two and incident', 'Trait three and incident', 'Closing judgement'], 'Flow for planning a character sketch: an opening impression, three traits each with an incident, and a closing judgement.');
const vOpinion = table(
  ['For the view', 'Against the view'],
  [
    ['prayers fill her days and she faces death calmly', 'she also draws comfort from the neighbours, the sparrows and her grandson'],
    ['she meets change with faith', 'her joy at his return comes from love, not only faith'],
  ],
  'Two-column table for an opinion answer on whether her faith was her only comfort: points for the view and points against it.',
);

// ---------------------------------------------------------------- deck 1
const D1 = deck({
  part: 1,
  title: 'The Portrait of a Lady, Part 1: context, summary and themes (Khushwant Singh)',
  goals: [
    'Place the memoir: author, form, narrator and tone',
    'Retell the main events of the memoir in sequence, in your own words',
    'Explain how the relationship between grandson and grandmother changes',
    'Explain themes of old age, faith, change across generations and death',
    'Answer a commentary-passage set and plan a long answer',
  ],
  slides: [
    sl('title', 'The Portrait of a Lady: Khushwant Singh', {
      b: `*Hornbill*, prose · memoir · Class 11 CBSE English Core.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. In this lesson we study The Portrait of a Lady by Khushwant Singh, a memoir of his grandmother. Please read the memoir itself in your textbook, Hornbill. This lesson does not repeat the text. Instead we will understand it: the events, the changing relationship, the themes, and how to answer exam questions on it.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the memoir once in *Hornbill*, straight through.',
        'Use these slides for the stages, the relationship and the themes.',
        'Describe incidents **in your own words**; never memorise sentences.',
        'Practise the commentary sets, which are SOYL commentary, not extracts.',
      ],
      n: 'Here is the best way to study a literature lesson. First read the memoir in your textbook, once, just to enjoy it. Then come back to these slides to understand its stages and meaning. When you write answers, use your own words, because examiners reward understanding, not memory. Finally, practise with our commentary sets.',
    }),
    sl('concept', 'The author and the text', {
      v: vText,
      n: 'Khushwant Singh was an Indian novelist, journalist and editor, best known for his novel Train to Pakistan. This piece is a memoir, which means the author looks back on real people and events. The narrator is the author himself, speaking in the first person as her grandson. The tone is affectionate and gently humorous.',
    }),
    sl('diagram', 'The memoir in five stages', {
      b: 'Each stage changes the relationship a little. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The memoir moves through five stages. The village, where the two are close companions. The city, where a gap opens. The university years, when the friendship thins. Then the return from abroad, with a burst of joy and a sudden illness. And finally her death, when the sparrows gather. Keep these five stages as your map.',
    }),
    sl('concept', 'Stage 1: the village', {
      b: 'The narrator lives with his grandmother in the village while his parents are in the city. She wakes him, gets him ready and walks with him to the school attached to the village temple. While he learns, she reads the scriptures. On the way home she feeds the village dogs with leftover chapatis. They are good friends.',
      n: 'In your own words, stage one is about companionship. The boy lives with his grandmother in the village, because his parents are in the city. She wakes him, gets him ready and walks with him to the temple school. While he studies, she reads the scriptures. On the way home she feeds the village dogs. They are close friends.',
    }),
    sl('concept', 'Stage 2: the city', {
      b: 'The parents send for them. He now goes to an English school by bus, and she can no longer accompany him or help with his lessons. She dislikes what is taught there, since it leaves out God and the scriptures, and she is upset to hear that he is learning music, which she links with low company. She grows distant and talks to him less.',
      v: vCompare,
      n: 'In the city everything changes. He goes to an English school by bus, and she cannot go with him or help with his lessons. She dislikes the subjects, because they leave out religious teaching, and she is upset that he learns music, which she connects with low company. She becomes distant and talks to him less.',
    }),
    sl('concept', 'Stages 3 and 4: university and abroad', {
      b: 'At university he gets a room of his own and their friendship thins. She accepts her loneliness with quiet resignation: the spinning wheel, her prayers and the sparrows in the afternoon. When he leaves for five years of study abroad, she sees him off at the station calmly, still praying.',
      n: 'At university the narrator has a room of his own, and their friendship thins. She accepts her loneliness quietly, with her spinning wheel, her prayers and the sparrows in the afternoon. Then he goes abroad for five years. At the railway station she sees him off without any show of emotion, and she goes on praying.',
    }),
    sl('concept', 'Her last days and the sparrows', {
      b: 'On his return she welcomes him. That evening she sets aside her prayers, gathers neighbourhood women and sings and drums for hours. Next morning she has a fever, says that her end has come, refuses to talk with the family and lies praying until she dies peacefully. Her body is laid on the floor and covered, and sparrows come in large numbers and stay silent. They ignore the crumbs from the narrator\'s mother and fly away quietly when the body is taken for cremation.',
      v: vEnd,
      n: 'When he returns, she welcomes him. That evening she sets aside her prayers and sings and drums with neighbourhood women for hours. Next morning she has a fever, says her end has come and lies praying. She dies peacefully. Sparrows then gather around her body, silent, ignoring the crumbs the mother offers, and leave quietly when the body is taken away.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_events',
      n: 'Your turn. Six events are shuffled. Put them in the order in which they happen. Use the five stages as your guide.',
    }),
    sl('concept', 'Theme: the changing relationship', {
      b: 'The relationship moves from daily closeness to distance without any quarrel. Affection survives.',
      v: vDistance,
      n: 'The first theme is the changing relationship. In the village they share everything. In the city she loses her place as helper. At university the shared routine ends, and abroad they are apart for five years. But there is no quarrel and no bitterness. When he returns, her joy shows that the affection was there all along.',
    }),
    sl('two-column', 'Theme: tradition and modern education', {
      b: 'The memoir shows a gap between generations, and the author takes neither side.',
      cols: [
        '**Her view**\n\n- learning belongs with scriptures and prayer\n- music suggests low company\n- the city school teaches the wrong things',
        '**His new world**\n\n- English and science open doors\n- the school is reached by bus\n- music is a normal subject',
      ],
      n: 'Another theme is the gap between generations. For the grandmother, learning belongs together with scriptures and prayer, and music suggests low company. For the boy, English, science and music are part of a new world. The author does not mock either side. The gentle humour falls on the situation, and we understand both views.',
    }),
    sl('check', 'Check: why the distance grows', {
      chk: 'm_bus',
      n: 'Check yourself. In the city, why can the grandmother no longer take the narrator to school? Think about how his school day has changed.',
    }),
    sl('concept', 'Themes: old age, faith and death', {
      b: 'Her faith gives her calm in loneliness, in separation and in death.',
      v: vThemes,
      n: 'Old age and faith run through the memoir. She prays daily, counts her rosary, and meets loneliness, separation and even death with calm. Her peaceful end, mourned in silence by the sparrows, is the closing image. In long answers, link at least two themes, for example faith and the changing relationship.',
    }),
    sl('check', 'Check: match stage and behaviour', {
      chk: 'match_stages',
      n: 'Now match each stage of the memoir with what the grandmother does in it. Think about her routine in each stage.',
    }),
    sl('example', 'Worked example 1: a commentary set', {
      b: '*Commentary:* The opening description gives us a very old, small woman dressed in white and always at prayer, yet it is the word beautiful, used in a calm and peaceful sense, that stays with the reader. The author is preparing us to see a quiet kind of beauty.\n\n*Question:* What kind of beauty does the commentary describe, and why?',
      v: vPlanCase,
      bl: [
        '**Find the idea:** a calm, peaceful beauty, not youthful beauty.',
        '**Why:** the description builds a gentle, devout picture.',
        '**Answer:** it is a serene beauty of character, which prepares us for her quiet strength.',
      ],
      n: 'Here is how to answer a commentary set. Read the passage and the question. Find the idea in the passage: the beauty is calm and peaceful, not youthful. Then answer in your own words: it is a serene beauty of character, which prepares us for her quiet strength. Always check which part asks for the commentary and which asks for the memoir.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: '*Question:* Why does the grandmother\'s opinion of the city school matter to the memoir? Answer in 100-120 words.',
      v: vPlanLong,
      bl: [
        '**Stand:** it shows the generation gap and her values.',
        '**Points + incidents:** she dislikes the subjects; she is upset about music.',
        '**Link:** a theme of change across generations.',
        '**Conclusion:** the author understands both without taking sides.',
      ],
      n: 'Plan a five mark answer like this. Take a stand: her opinion shows the gap between generations and her own values. Give points with incidents in your own words: she dislikes the subjects, and she is upset about music. Link to the theme of change across generations. End with one line: the author understands both sides without taking sides.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Five stages: village, city, university, abroad and return, death.',
        'The relationship thins without a quarrel; affection survives.',
        'Gap between traditional learning and a modern English school.',
        'Faith gives the grandmother calm to the end.',
        'Read the memoir in *Hornbill*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. The memoir moves through five stages. The relationship thins without any quarrel, and affection survives. There is a gap between traditional learning and a modern school. Her faith gives her calm to the end. And remember: read the memoir in your textbook and write about it in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Commentary sets: answer from the commentary first, then from the memoir.',
        'Describe events in your own words; do not copy lines.',
        'Name the stage when you describe an incident.',
        'Facts often confused: five years abroad; the school in the village is at the temple; the school in the city is reached by bus.',
        'Do not say she was bitter or cold: say she was accepting.',
      ],
      n: 'Exam tips. In commentary sets, answer from the commentary first. Describe events in your own words and name the stage. Get the facts right: five years abroad, a temple school in the village, an English school reached by bus in the city. And never call her bitter or cold. She is accepting.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const D2 = deck({
  part: 2,
  title: 'The Portrait of a Lady, Part 2: characters, craft and exam practice (Khushwant Singh)',
  goals: [
    'Sketch the grandmother and the narrator with an incident for every trait',
    'Explain craft: the memoir form, stages, tone and the closing image',
    'Write a diary entry, a character sketch and an opinion answer',
    'Handle statements and scenarios that need your own interpretation',
  ],
  slides: [
    sl('title', 'Characters, craft and exam practice', {
      b: `*The Portrait of a Lady*, Part 2.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Here we sketch the two main characters, look at how the author tells the story, and practise the kinds of answers the exam asks for: a character sketch, a diary entry and an opinion. Remember to read the memoir in your textbook, Hornbill, and to write in your own words.',
    }),
    sl('concept', 'The grandmother: traits and evidence', {
      b: 'Every trait in an answer needs an incident, described in your own words.',
      v: vGrand,
      n: 'Let us sketch the grandmother. She is devout and serene, with prayers and a rosary every day. She is caring, feeding dogs and later sparrows. She is traditional, valuing learning that goes with scriptures. She is accepting at her spinning wheel and at the station. She is warm beneath her calm, as her singing shows. And she is peaceful at the end.',
    }),
    sl('two-column', 'Calm outside, warmth inside', {
      b: 'The memoir never says in words that she loves him; her actions show it.',
      cols: [
        '**What we see on the surface**\n\n- steady prayers and routine\n- calm at the station\n- little speech about feelings',
        '**What lies beneath**\n\n- her care for dogs and sparrows\n- the long evening of song on his return\n- the way she refuses distraction at the end',
      ],
      n: 'A key idea for character answers: calm outside, warmth inside. On the surface she is prayerful and calm, and she says little about feelings. Beneath, there is care for dogs and sparrows, a long evening of song when he returns, and a determined focus at the end. Use both sides to show depth in a character sketch.',
    }),
    sl('check', 'Check: spot the weak sentence', {
      chk: 'c_weak',
      n: 'Check yourself. Four sentences could appear in a character sketch. Which one would earn the fewest marks on its own? Think about what the examiner can credit.',
    }),
    sl('concept', 'The narrator: development across the stages', {
      v: vNarrator,
      n: 'Now the narrator. As a child in the village he depends on his grandmother and is fond of her. In the city he is absorbed in a new school. At university he is independent. He spends five years abroad. When he returns he is welcomed home, and when he writes about her, he writes with affection. His development is growth without loss of love.',
    }),
    sl('concept', 'Grandmother and narrator compared', {
      v: vCompareChars,
      n: 'Compare the two on four points. On learning, she values religious teaching, and he studies English, science and music. In showing feeling, she uses routine, prayer and once a song, while he uses time together and later a loving memoir. Facing distance, she accepts quietly, and he moves on but remembers. Through all this, the bond is steady and warm.',
    }),
    sl('concept', 'Craft: how the memoir is told', {
      v: vCraft,
      n: 'Notice the craft. A first-person memoir gives closeness and honesty, and the narrator admits the drift. Time-ordered stages show distance growing step by step. Gentle humour keeps the tone warm. The recurring detail of feeding creatures prepares the closing image. And restraint at her death lets the sparrows carry the emotion.',
    }),
    sl('check', 'Check: the grandmother and the new school', {
      chk: 'ar_school',
      n: 'Check yourself with an assertion and reason. Read both statements about the grandmother and the new school, then choose the correct option.',
    }),
    sl('concept', 'The closing image: the sparrows', {
      b: 'The author ends on the birds rather than on the family\'s weeping.',
      v: vSparrows,
      n: 'The closing image deserves its own slide. The birds gather around her in large numbers, stay silent and ignore the crumbs. They leave quietly. Each action suggests something: belonging to her world, respect and shared sorrow, not coming for food, and a quiet farewell. This is why many readers find the ending powerful.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words often appear in answers. Serene means calm and peaceful. Resignation is quiet acceptance of what cannot be changed. Devout means deeply religious. Scriptures are holy writings. A rosary is a string of beads used to count prayers. Cremation is the burning of a body as a funeral rite, and a verandah is a roofed, open space along the side of a house.',
    }),
    sl('check', 'Check: the grandmother at the station', {
      chk: 'tf_wept',
      n: 'True or false. At the railway station, when the narrator leaves for his studies abroad, the grandmother weeps openly. Decide, and think about what her calm shows.',
    }),
    sl('example', 'Worked example 1: a diary entry', {
      b: '*Task:* As the narrator, write a diary entry on the day your family moves to the city and you first see your school there.',
      v: vDiaryPlan,
      bl: [
        '**Format:** day and date, salutation, first person.',
        '**Content:** the bus, the English school, how Grandmother would react.',
        '**Feelings:** excitement, and a small worry about her.',
        '**Ending:** a hope that she will find something to do.',
      ],
      n: 'Here is a diary plan. Start with the day, the date and a salutation. Write in the first person. Describe what happened: the bus ride and the English school. Add how you felt, perhaps excited but also a little worried about Grandmother. End with a hope for the future. Keep your content consistent with the memoir, and extend it only where it fits her character.',
    }),
    sl('example', 'Worked example 2: a character sketch', {
      b: '*Task:* Write a character sketch of the narrator. Plan before you write.',
      v: vSketch,
      bl: [
        '**Opening:** a boy who grows from dependence to independence.',
        '**Traits and incidents:** fond of her in the village; absorbed in school in the city; independent at university and abroad.',
        '**Close:** affectionate in memory.',
      ],
      n: 'Plan a character sketch like this. Open with one line that gives an overall impression, here a boy growing from dependence to independence. Then give three traits, each with an incident: fond of her in the village, absorbed in his new school in the city, independent at university and abroad. Close with a judgement: he remembers her with deep affection.',
    }),
    sl('example', 'Worked example 3: an opinion answer', {
      b: '*Statement:* Her faith was the grandmother\'s only comfort. Do you agree?',
      v: vOpinion,
      bl: [
        '**Stand:** partly agree.',
        '**For:** prayers fill her days and she faces death calmly.',
        '**Against:** she is also comforted by the neighbours, the sparrows and her grandson.',
        '**Conclusion:** faith is central, but not the only comfort.',
      ],
      n: 'For an opinion answer, plan both sides. Take a stand, here partly agree. Give evidence for the view: prayers fill her days and she faces death calmly. Give evidence against: she also finds comfort in the neighbours, the sparrows and her grandson. End with a balanced conclusion: faith is central but not the only comfort.',
    }),
    sl('check', 'Check: afternoons in the university years', {
      chk: 'fb_sparrows',
      n: 'Fill in the blank. In the narrator\'s university years, which creatures does the grandmother feed in the afternoons? Type your answer.',
    }),
    sl('concept', 'Extrapolation tasks: what to do', {
      bl: [
        'Stay faithful to the facts: stages, events, the order of events.',
        'Extend only in ways that suit her character (quiet, devout, warm beneath calm).',
        'Use the right format: diary, letter, speech or sketch.',
        'Do not add events that the memoir does not suggest.',
      ],
      v: vDiaryPlan,
      n: 'Extrapolation tasks ask you to go beyond the text. Stay faithful to the facts: the stages, the events and their order. Extend only in ways that suit her character, quiet, devout and warm beneath the calm. Use the right format, and do not add events that the memoir does not suggest.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Grandmother: devout, caring, traditional, accepting, warm beneath her calm.',
        'Narrator: from dependent child to independent young man; affection remains.',
        'Craft: first-person memoir, stages, gentle humour, restraint, the sparrows.',
        'Every trait needs an incident, in your own words.',
        'Use the right format for diary, letter, speech or sketch.',
      ],
      v: vGrand,
      n: 'Let us sum up. The grandmother is devout, caring, traditional, accepting and warm beneath her calm. The narrator grows from a dependent child into an independent young man, with affection intact. The craft includes a first-person memoir, stages, gentle humour, restraint and the closing image of the sparrows. Remember: every trait needs an incident.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Character sketch: trait, incident, then link to the theme.',
        'Diary entry: day, salutation, first person, feelings.',
        'Opinion: take a stand, give both sides, conclude.',
        'Stay within the word limit; plan in one minute.',
        'Never copy lines from the memoir.',
      ],
      n: 'Exam tips. In a character sketch, give a trait and an incident, then link to a theme. In a diary entry, use the day, a salutation, the first person and feelings. In an opinion, take a stand, give both sides and conclude. Stay within the word limit and plan for a minute. And never copy lines from the memoir.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Portrait of a Lady: study notes',
  sections: [
    {
      h: '1. About the memoir and the author',
      t: 1,
      b: `${READ}\n\n*The Portrait of a Lady* is a prose piece in *Hornbill* by **Khushwant Singh** (1915-2014), an Indian novelist, journalist and editor, best known for the novel *Train to Pakistan*. It is a **memoir**: the author, as a grown man, recalls his grandmother. He speaks in the first person as her grandson, and the tone is affectionate, gentle and quietly humorous.`,
      v: vText,
      terms: [['Memoir', 'A writer\'s account of people and events from his or her own life.'], ['First-person narrator', 'A narrator who says I and tells the story from his own point of view.']],
    },
    {
      h: '2. Summary in SOYL\'s words, by stage',
      t: 1,
      b: '**Village.** The narrator lives with his grandmother while his parents live in the city. She wakes him, gets him ready and walks with him to the school attached to the temple; she reads the scriptures while he learns, and feeds the dogs on the way home.\n\n**City.** The parents send for them. He goes to an English school by bus. She cannot accompany him or help with lessons, dislikes the subjects taught and is upset by the music lessons; she grows distant and talks to him less.\n\n**University.** He has a room of his own and their friendship thins. She accepts loneliness quietly, with her spinning wheel, prayers and the sparrows.\n\n**Abroad and return.** He is away for five years; she sees him off calmly, praying. On his return she sets aside prayer and sings and drums with neighbours for hours. Next morning she is feverish, declares that her end has come, refuses to talk to the family and prays until she dies peacefully.\n\n**After her death.** Her body is laid on the floor and covered; sparrows gather in large numbers, silent, ignoring crumbs, and leave quietly as the body is carried for cremation.',
      v: vStages,
      terms: [['Cremation', 'Burning of the body as a funeral rite.'], ['Scriptures', 'Holy writings of a religion.']],
    },
    {
      h: '3. The changing relationship',
      t: 2,
      b: 'The relationship moves through stages: daily companions in the village; a gap in the city over school and values; thinning friendship at university; five years apart; a joyful reunion; her death. There is **no quarrel**. The distance grows because their lives move in different directions, and the affection survives, as her joy at his return shows.',
      v: vDistance,
      terms: [['Companionship', 'Sharing time and activities with someone regularly.'], ['Drift', 'A gradual moving apart without a quarrel.']],
    },
    {
      h: '4. Themes and message',
      t: 2,
      b: '- **Old age and faith:** prayers, rosary and calm to the end.\n- **Change across generations:** her idea of learning (with scriptures) against his new school (English, science, music).\n- **Distance without loss of love:** affection outlasts the physical distance.\n- **Death:** met peacefully; mourned by the sparrows.\n\n**Message:** love between generations can survive change and distance, and quiet, faithful people deserve to be understood.',
      v: vThemes,
      terms: [['Generation gap', 'A difference in outlook between older and younger people.'], ['Resignation', 'Quiet acceptance of what cannot be changed.']],
    },
    {
      h: '5. The grandmother',
      t: 3,
      b: 'She is **devout and serene** (daily prayers, rosary, calm), **caring** (feeds dogs, then sparrows), **traditional** (values learning with scriptures; dislikes music lessons), **accepting** (spinning wheel, calm at the station) and **warm beneath her calm** (sings and drums on his return). At the end she is **peaceful and strong**, facing death in prayer. Support every trait with an incident, in your own words.',
      v: vGrand,
      terms: [['Devout', 'Deeply religious.'], ['Serene', 'Calm and peaceful.']],
    },
    {
      h: '6. The narrator and the craft',
      t: 3,
      b: 'The narrator grows from a dependent child into an independent young man, and he writes about her with affection and honesty about the drift.\n\n**Craft:** a first-person memoir; stages in time order, so the distance grows step by step; gentle humour that never mocks; the recurring detail of feeding creatures; and restraint at her death, so that the sparrows carry the emotion.',
      vs: [vNarrator, vCraft],
      terms: [['Restraint', 'Holding back, so that feeling is shown rather than stated.'], ['Closing image', 'The final picture a writer leaves in the reader\'s mind.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Learn these single words from the memoir; describe the sentences they appear in in your own words.',
      v: vWords,
      terms: [['Rosary', 'A string of beads used to count prayers.'], ['Verandah', 'A roofed, open space along the side of a house.']],
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**Commentary sets (4 marks):** read the commentary, then each question; answer from the commentary first and from your knowledge of the memoir where asked.\n\n**Short answers (2 and 3 marks):** point, incident, explanation, within the limit.\n\n**Long answers (about 100-120 words in school papers; SOYL 5-mark practice is 80-120):** a stand, two or three points with incidents in your own words, a link to a theme, a one-line conclusion. For a diary entry or letter, use the correct format and stay faithful to the facts.',
      v: vPlanLong,
      terms: [['Extrapolation', 'Going beyond the text in a way that fits its facts and characters.'], ['Commentary set', 'Questions on a short passage written about a text, not taken from it.']],
    },
  ],
  tips: '**Board weight:** Hornbill prose extract (3 marks), short answers (2 and 3 marks) and long answers (6 marks) in Section C of the school annual paper (CBSE Class 11 English Core, 2026-27).\n\n**How marks are awarded:** content (relevant incidents, accurately used), interpretation (a clear, supported view) and expression within the limit; for diaries, letters and speeches, format counts too.\n\n**Common mistakes**\n1. Describing her as bitter or cold: she is accepting and faithful.\n2. Mixing up the schools: the village school is attached to the temple; the city school is an English school reached by bus.\n3. Giving traits without incidents.\n4. Placing the sparrows before her death, or the song after it.\n5. Copying sentences from the textbook instead of writing in your own words.\n6. Ignoring the word limit.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *The Portrait of a Lady*?', 'Khushwant Singh, an Indian novelist and journalist.', 'fact', 1],
  ['What kind of writing is this piece?', 'A memoir: the author recalls his grandmother.', 'fact', 1],
  ['Who is the narrator?', 'The author himself, speaking in the first person as her grandson.', 'fact', 1],
  ['Where does the narrator live with his grandmother in the first stage?', 'In a village; his parents live in a city.', 'fact', 1],
  ['Where is the narrator\'s village school?', 'It is attached to the temple.', 'fact', 1],
  ['What does the grandmother do while he studies at the temple school?', 'She reads the scriptures.', 'fact', 1],
  ['What does she do for the dogs on the way home?', 'She feeds them with leftover chapatis.', 'fact', 1],
  ['How does the narrator travel to school in the city?', 'By bus, to an English school.', 'fact', 1],
  ['Why does she dislike the city school?', 'It teaches subjects such as science and English but nothing about God or the scriptures.', 'concept', 2],
  ['Why is she upset about the music lessons?', 'She associates music with low company.', 'concept', 2],
  ['How does the move to the city change her part in his schooling?', 'She can no longer go with him or help with his lessons.', 'fact', 2],
  ['What changes when he reaches university?', 'He has a room of his own, and the friendship thins.', 'fact', 2],
  ['How does she spend her days at that stage?', 'At the spinning wheel, in prayer, and feeding sparrows in the afternoon.', 'fact', 3],
  ['How long is he abroad?', 'Five years.', 'fact', 1],
  ['How does she behave at the station?', 'She sees him off calmly, still praying.', 'fact', 3],
  ['What happens on the evening of his return?', 'She sets aside prayer, gathers neighbourhood women and drums and sings for hours.', 'fact', 1],
  ['What happens the next morning?', 'She has a fever, says her end has come and refuses to talk with the family.', 'fact', 1],
  ['How does she die?', 'Peacefully, lying in prayer and counting her rosary.', 'fact', 1],
  ['What do the sparrows do after her death?', 'They gather silently, ignore the crumbs and fly away quietly after the body is removed.', 'fact', 1],
  ['What is the central theme?', 'The changing relationship between grandson and grandmother, with affection surviving distance.', 'concept', 2],
  ['Which two themes does the gap with the city school show?', 'Change across generations and tradition against modern education.', 'concept', 2],
  ['How does the memoir treat the generation gap?', 'Without blame: neither side is mocked.', 'concept', 2],
  ['What does her calm at the station show?', 'Acceptance shaped by faith, not coldness.', 'concept', 3],
  ['What does the song on his return show?', 'Warmth and joy beneath her calm.', 'concept', 3],
  ['Why are the sparrows a powerful ending?', 'They show shared grief in silence, without telling the reader how to feel.', 'concept', 2],
  ['Name three traits of the grandmother.', 'Devout and serene, caring, accepting (also traditional and warm).', 'concept', 3],
  ['How does the narrator change?', 'From a dependent child to an independent young man; affection remains.', 'concept', 3],
  ['*serene*', 'calm and peaceful', 'definition', 1],
  ['*resignation*', 'quiet acceptance of what cannot be changed', 'definition', 2],
  ['Plan for a long answer', 'Stand, points with incidents in own words, link to theme, conclusion.', 'exam-tip', 4],
  ['Most common slip about the schools', 'Mixing the village temple school with the city English school reached by bus.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): The Portrait of a Lady',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_author', 'c_counter', 'c_hostel', 'ar_feed'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'About 30-50 words for 2-mark and 50-80 words for 3-mark answers.', items: ['s2_routine', 's2_room', 's3_routine'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any one of the two questions (80-120 words).', items: [{ attempt: 1, keys: ['l_sketch', 'l_distance'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the commentary and answer all parts; one sub-part has an internal choice. (The passage is SOYL commentary; read the memoir in Hornbill.)', items: ['c_city'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): The Portrait of a Lady',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_parents', 'm_music', 'm_silence', 'm_edu', 'c_honest', 'c_dogs_role', 'c_outofplace', 'c_belief', 'ar_dist', 'ar_gap'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_music', 's2_station', { attempt: 1, keys: ['s2_sing', 's2_sparrows'] }, 's3_resign', { attempt: 1, keys: ['s3_gap', 's3_birds'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_diary', { attempt: 1, keys: ['l_letter', 'l_compare'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each commentary and answer all parts. (Passages are SOYL commentary; read the memoir in Hornbill.)', items: ['c_village', 'c_sparrows'] },
  ],
});

build({
  dir: DIR,
  decks: [D1, D2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 only; no removed topics for 2026-27',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the memoir; summaries in SOYL words; passage items are SOYL commentary (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on title slides, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused',
    re_solve: 'writer pass: every item re-answered from its stem and checked against the memoir events',
    gate: 'content lint (lintExemplar) runs inside the build',
  },
});

// Reproduction guard (D-036): short distinctive phrases of the memoir that must never appear in the chapter's files.
guard(DIR, [
  'winter landscape',
  'silvery white hair',
  'criss-cross of wrinkles',
  'wisps of silver',
  'homecoming of warriors',
  'old drum',
  'telling her beads',
  'stale chapatis',
  'thousands of sparrows',
  'scattered on the floor',
  'not even chirp',
  'sparrows sat',
  'beating the drum',
  'did not pray',
  'turning point',
]);
