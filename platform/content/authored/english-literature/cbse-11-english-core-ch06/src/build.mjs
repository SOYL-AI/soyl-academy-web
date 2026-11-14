// Build CBSE 11 English Core ch06 "We're Not Afraid to Die... if We Can All Be Together" (Gordon Cook and Alan East).
// Run from platform/:
//   npx tsx content/authored/english-literature/cbse-11-english-core-ch06/src/build.mjs
// LITERATURE RULE (D-036): everything here is SOYL's own summary, analysis and commentary; the account is never
// quoted or closely paraphrased. Students read it in Hornbill.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-11-english-core-ch01/src/lib.mjs';
import { guard } from '../../../english-language/cbse-11-english-core-ch01/src/guard.mjs';

setUnit('cbse-11-english-core-ch06', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the account itself in your textbook, *Hornbill* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

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
    ['Writers', 'Gordon Cook and Alan East'],
    ['Book', 'NCERT *Hornbill*, prose'],
    ['Form', 'a first-person account of a real sea voyage'],
    ['Narrator', 'the father of the family, one of the two writers'],
    ['Setting', 'the southern Indian Ocean, after Cape Town; January'],
    ['Main subject', 'a family and crew facing an enormous storm'],
  ],
  'Table about the text: the two writers, the book, the form as a first-person account of a real voyage, the narrator, the setting in the southern Indian Ocean, and the main subject.',
  'Facts about the text (SOYL summary).',
);
const vStages = flow('LR', ['Setting out from Plymouth', 'Gales after Cape Town', 'Preparing on 2 January', 'The wave and the night', 'Days to the island, landing'], 'Flow of five stages of the voyage: setting out from Plymouth, gales after Cape Town, preparations on 2 January, the wave and the night of pumping, and the days that lead to the island and the landing.', 'The voyage in five stages (SOYL summary).');
const vSetting = table(
  ['Fact', 'Detail'],
  [
    ['When and where', 'July 1976, from Plymouth, England'],
    ['The family', 'the narrator, his wife Mary, son Jonathan (about six), daughter Suzanne (about seven)'],
    ['The aim', 'to repeat Captain James Cook\'s round-the-world voyage of two hundred years before'],
    ['The boat', 'Wavewalker, a wooden-hulled boat of about 23 metres, built professionally and tested in gales'],
    ['The crew', 'Larry Vigil (American) and Herb Seigler (Swiss) join for the hardest part'],
    ['First leg', 'to Cape Town, without trouble'],
  ],
  'Table of the setting: when and where the voyage began, the family members, the aim of repeating Captain Cook\'s voyage, the boat, the two crewmen, and the first leg to Cape Town.',
  'Setting out (SOYL summary).',
);
const vPrep = table(
  ['Step on 2 January', 'Purpose (what the step does)'],
  [
    ['Slow the boat and reduce sail', 'less strain on the boat in huge waves'],
    ['Let out a heavy rope behind', 'steadies the boat'],
    ['Go through the life-raft routine', 'everyone knows what to do'],
    ['Put on protective clothing and life jackets', 'safety in the water'],
  ],
  'Table of the preparations on 2 January and what each step does: slowing the boat and reducing sail, letting out a rope behind it, rehearsing the life-raft routine, and putting on protective clothing and life jackets.',
  'Preparations (SOYL summary).',
);
const vWave = flow('LR', ['Evening: enormous wave', 'Narrator swept off the deck and back aboard', 'Deck damaged; water pours in', 'Mary raises the alarm', 'Larry and Herb pump; narrator patches'], 'Flow of the wave episode: an enormous wave in the evening, the narrator swept off the deck and back aboard, damage to the deck and water pouring in, Mary raising the alarm, and Larry and Herb pumping while the narrator patches the damage.', 'The wave (SOYL summary).');
const vAfter = table(
  ['Stage', 'What happens'],
  [
    ['The night', 'pumping goes on until morning; an electric pump is connected later that night'],
    ['The next days', 'the water is slowly brought down, but the weather worsens again; Jonathan makes his remark'],
    ['Navigation', 'the narrator, exhausted, works out the position with great care, aiming for Ile Amsterdam'],
    ['Suzanne', 'her injuries prove worse than she let on; she gives her parents a drawn card with funny pictures'],
    ['Landing', 'Ile Amsterdam is sighted; Jonathan praises his father; the base community welcomes them'],
  ],
  'Table of the stages after the wave: the night of pumping, the next days when the weather worsens again and Jonathan makes his remark, careful navigation, Suzanne\'s injuries and her drawn card, and the landing at Ile Amsterdam with its welcome.',
  'After the wave (SOYL summary).',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Courage and calm leadership', 'the narrator patches the holes and works out the position'],
    ['Optimism', 'the family keeps hoping for the island through the days of strain'],
    ['Teamwork', 'Mary, the crewmen and the narrator each do a job at once'],
    ['The children\'s bravery', 'Suzanne hides her injury; Jonathan\'s remark'],
    ['Endurance against nature', 'the night of pumping and the long days after'],
    ['Preparation and seamanship', 'the steps on 2 January; careful navigation'],
  ],
  'Table of six themes with where each appears: courage and calm leadership, optimism, teamwork, the children\'s bravery, endurance against nature, and preparation and seamanship.',
);
const vNature = table(
  ['What the sea does', 'What the people do'],
  [
    ['raises enormous waves', 'reduce sail and trail a rope'],
    ['sweeps the narrator off the deck', 'he returns aboard as the boat rights itself'],
    ['wrecks the deck and floods the boat', 'pump, patch and later rig an electric pump'],
    ['hides a small island in a wide ocean', 'work out the position with care'],
  ],
  'Two-column table of what the sea does and what the people do in response: enormous waves and reduced sail, the narrator swept off and returning, a wrecked deck and pumping and patching, and a small island and careful navigation.',
);
const vPlanCase = flow('LR', ['Read the commentary first', 'Read each question', 'Find the idea in the commentary', 'Answer in your own words', 'Add the account where asked'], 'Flow for answering a commentary-passage set: read the commentary, read each question, find the idea, answer in your own words, and add knowledge of the account where asked.');
const vPlanLong = flow('LR', ['Take a clear stand', 'Point and incident (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a long answer: take a stand, give points with incidents in your own words, link to a theme, and conclude.');

const vNarrator = table(
  ['Role', 'Evidence (in SOYL\'s words)'],
  [
    ['Father', 'takes his wife and two young children on the voyage; receives Suzanne\'s card and Jonathan\'s praise'],
    ['Skipper', 'decides on the preparations; covers the holes after the wave'],
    ['Navigator', 'works out the position with care and aims for Ile Amsterdam'],
    ['Narrator', 'tells the story in the first person, as one of its two writers'],
  ],
  'Table of the narrator\'s roles with evidence: father, skipper, navigator, and first-person narrator.',
);
const vCrew = table(
  ['Person', 'Part in the account'],
  [
    ['Mary', 'the narrator\'s wife; raises the alarm that the boat is taking in water'],
    ['Larry Vigil', 'American crewman; pumps for hours'],
    ['Herb Seigler', 'Swiss crewman; pumps for hours'],
  ],
  'Table of Mary, Larry Vigil and Herb Seigler with the part each plays in the account.',
);
const vKids = table(
  ['Child', 'What the account shows'],
  [
    ['Suzanne (about seven)', 'hurt in the wave, with a swelling on her head and a cut; says little about it so as not to worry her parents; later gives a drawn card with funny pictures of her parents'],
    ['Jonathan (about six)', 'makes the remark that gives the account its title; at the end praises his father as a captain'],
  ],
  'Table of the two children: Suzanne, her injury, her silence and her drawn card; and Jonathan, his remark that gives the title and his praise of his father.',
);
const vAction = table(
  ['Adults: action', 'Children: feeling'],
  [
    ['pump for hours', 'Suzanne keeps her pain to herself'],
    ['patch the holes with canvas', 'Suzanne draws a card for her parents'],
    ['navigate towards the island', 'Jonathan speaks of being together'],
    ['rig an electric pump', 'Jonathan praises his father at the end'],
  ],
  'Two-column table of adults and children: the adults pump, patch, navigate and rig a pump, while the children keep pain to themselves, draw a card, speak of being together and praise the father.',
);
const vCraft = table(
  ['Feature', 'Where it appears'],
  [
    ['First-person account', 'the narrator tells his own experience of the voyage'],
    ['Time order', 'from Plymouth to Cape Town, the storm, the wave, the days after, and the landing'],
    ['A real event', 'a voyage with named people and places'],
    ['The title', 'taken from a remark made by one of the children'],
    ['Detail of seamanship', 'sail, a rope behind the boat, pumps, the position and the island'],
  ],
  'Table of features of the account and where each appears: first-person account, time order, a real event, the title taken from a child\'s remark, and the detail of seamanship.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['voyage', 'a long journey, especially by sea'],
    ['gale', 'a very strong wind'],
    ['crewman', 'a member of a ship\'s crew'],
    ['caricature', 'a funny drawing that exaggerates a person\'s features'],
    ['ordeal', 'a long, painful or frightening experience'],
    ['navigate', 'to work out and follow a route'],
    ['endurance', 'the ability to bear hardship over a long time'],
  ],
  'Table of word meanings: voyage, gale, crewman, caricature, ordeal, navigate and endurance.',
  'Single words with their meanings.',
);
const vDiaryPlan = flow('LR', ['Day, date, salutation', 'What happened today', 'How I felt', 'A thought about the future', 'Sign off'], 'Flow for planning a diary entry: day and salutation, what happened, how I felt, a thought about the future, and a sign-off.');
const vLetterPlan = flow('LR', ['Address and date', 'Salutation', 'Opening: why I write', 'Body: events and feelings', 'Closing and name'], 'Flow for planning an informal letter: address and date, salutation, an opening that says why I write, a body with events and feelings, and a closing with the name.');
const vOpinion = table(
  ['For the view', 'Against the view'],
  [
    ['Suzanne hides her pain and stays calm', 'Jonathan says aloud what he feels and is still brave'],
    ['the adults keep working without complaint', 'the narrator\'s position work needs steady attention, not hiding of fear'],
  ],
  'Two-column table for an opinion answer on whether courage means not showing fear: points for the view and points against it.',
);
const vRules = table(
  ['Stay with', 'Add freely'],
  [
    ['names, places, dates and order of events', 'feelings that suit the character'],
    ['who did what in the account', 'small, believable details of the moment'],
    ['the character\'s age and situation', 'the right format: diary, letter, speech'],
  ],
  'Table for extrapolation tasks: what to stay with, namely names, places, dates, order of events and each character\'s situation, and what you may add freely, namely suitable feelings, small believable details and the right format.',
);

// ---------------------------------------------------------------- deck 1
const D1 = deck({
  part: 1,
  title: 'We\'re Not Afraid to Die… if We Can All Be Together, Part 1: context, summary and themes (Gordon Cook and Alan East)',
  goals: [
    'Place the account: writers, form, narrator and setting',
    'Retell the main events of the voyage in sequence, in your own words',
    'Explain the themes: courage, optimism, teamwork and endurance',
    'Answer a commentary-passage set and plan a long answer',
  ],
  slides: [
    sl('title', 'We\'re Not Afraid to Die… if We Can All Be Together', {
      b: `By Gordon Cook and Alan East. *Hornbill*, prose, Class 11 CBSE English Core.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. In this lesson we study the account by Gordon Cook and Alan East, titled We are Not Afraid to Die, if We Can All Be Together. Please read the account itself in your textbook, Hornbill. This lesson does not repeat the text. We will understand it: the events, the themes, and how to answer exam questions on it.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the account once in *Hornbill*, straight through.',
        'Use these slides for the stages, the people and the themes.',
        'Describe incidents **in your own words**; never memorise sentences.',
        'Practise the commentary sets, which are SOYL commentary, not extracts.',
      ],
      v: vPlanCase,
      n: 'Here is the best way to study this lesson. First read the account in your textbook, once, to feel the story. Then come back to these slides to understand its stages and meaning. When you write answers, use your own words, because examiners reward understanding, not memory. Finally, practise with our commentary sets.',
    }),
    sl('concept', 'The writers and the text', {
      v: vText,
      n: 'The account is by Gordon Cook and Alan East. It is a first-person account of a real sea voyage. The narrator is the father of the family, one of the two writers. The voyage goes into the southern Indian Ocean after Cape Town, and the main subject is how a family and crew face an enormous storm.',
    }),
    sl('diagram', 'The voyage in five stages', {
      b: 'Each stage raises the stakes. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The voyage moves through five stages. Setting out from Plymouth. Gales after Cape Town. Preparing on the second of January. The wave and the night of pumping. And the days that lead to the island and the landing. Keep these five stages as your map.',
    }),
    sl('concept', 'Stage 1: setting out', {
      b: 'In July 1976 the narrator, his wife Mary and their two young children set sail from Plymouth, hoping to repeat Captain James Cook\'s round-the-world voyage made two hundred years before. Their boat, Wavewalker, was built by professionals and tested in gales. Two crewmen, Larry Vigil and Herb Seigler, join for the hardest part. The first leg, to Cape Town, goes well.',
      v: vSetting,
      n: 'In July 1976 the narrator, his wife Mary and their two young children sail from Plymouth. They hope to repeat the round the world voyage of Captain James Cook, made two hundred years before. Their boat, Wavewalker, is professionally built and tested in gales. Two crewmen, Larry and Herb, join them. The first leg, to Cape Town, goes well.',
    }),
    sl('concept', 'Stage 2: the day of preparation', {
      b: 'East of Cape Town the family meets strong gales and huge waves. On 2 January the waves grow enormous. They slow the boat, reduce sail, let out a heavy rope behind it, go through the life-raft routine and put on protective clothing and life jackets.',
      v: vPrep,
      n: 'After Cape Town the family sails east into the southern Indian Ocean, and meets strong gales. On the second of January the waves become enormous. The crew slow the boat, reduce sail and let out a heavy rope behind it. They go through the life raft routine, and everyone puts on protective clothing and life jackets.',
    }),
    sl('concept', 'Stage 3: the wave and the night', {
      b: 'In the evening an enormous wave strikes. The narrator is swept off the deck and carried back aboard as the boat rights itself. The deck is badly damaged and water pours in. Mary raises the alarm; Larry and Herb pump for hours; the narrator covers the openings with canvas. Later that night an electric pump is connected. They pump until morning.',
      v: vWave,
      n: 'In the evening of that day an enormous wave strikes. The narrator is swept off the deck and carried back aboard as the boat rights itself. The deck is badly damaged and water pours in. Mary raises the alarm. Larry and Herb pump for hours, and the narrator covers the openings with canvas. They pump all night.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_events',
      n: 'Your turn. Six events are shuffled. Put them in the order in which they happen. Use the five stages as your guide.',
    }),
    sl('concept', 'Stage 4: the days to the island', {
      b: 'The water is slowly brought down, but the weather worsens again and the danger returns; in these days Jonathan makes the remark that gives the account its title. The exhausted narrator works out their position with great care, aiming for Ile Amsterdam, a small French island with a scientific base. Suzanne, whose injuries prove worse than she let on, gives her parents a drawn card with funny pictures. After days of struggle they sight the island. Jonathan praises his father as a captain, and the small community at the base welcomes them.',
      v: vAfter,
      n: 'The water is slowly brought down, but the weather worsens again, and in these days Jonathan makes the remark that gives the account its title. The exhausted narrator works out the position with great care, aiming for Ile Amsterdam, a small French island with a scientific base. Suzanne draws a card with funny pictures of her parents. At last they sight the island, Jonathan praises his father as a captain, and the island community welcomes the family.',
    }),
    sl('check', 'Check: where the first leg ends', {
      chk: 'm_firstleg',
      n: 'Check yourself. The first leg of the voyage goes well. Where does it end, before the family sails east into the southern Indian Ocean?',
    }),
    sl('concept', 'Themes at a glance', {
      b: 'Six themes run through the account. Each needs an incident in your own words.',
      v: vThemes,
      n: 'Here are the themes. Courage and calm leadership. Optimism through days of strain. Teamwork, as everyone does a job at once. The children\'s bravery. Endurance against nature, in the night of pumping and the long days after. And preparation and seamanship. In long answers, link at least two themes.',
    }),
    sl('check', 'Check: when the wave struck', {
      chk: 'tf_wave',
      n: 'True or false. The enormous wave struck in the early morning of the second of January. Think about the day of preparation and the order of events.',
    }),
    sl('two-column', 'The sea and the people', {
      b: 'The account sets the power of nature beside the work of people.',
      cols: [
        '**What the sea does**\n\n- raises enormous waves\n- sweeps the narrator off the deck\n- wrecks the deck and floods the boat\n- hides a small island',
        '**What the people do**\n\n- reduce sail, trail a rope\n- he returns aboard as the boat rights\n- pump, patch, rig an electric pump\n- work out the position with care',
      ],
      v: vNature,
      n: 'Look at the account as a contest between the sea and the people. The sea raises enormous waves, sweeps the narrator off the deck, wrecks the deck and floods the boat, and hides a small island. The people reduce sail, return aboard, pump, patch and rig an electric pump, and work out the position with care.',
    }),
    sl('check', 'Check: match stage and event', {
      chk: 'match_events',
      n: 'Now match each stage of the voyage with what happens in it. Think about the order of the five stages.',
    }),
    sl('example', 'Worked example 1: a commentary set', {
      b: '*Commentary:* The narrator brings two crewmen aboard for the hardest part of the voyage. This is a decision of judgement: he trusts his boat, yet he accepts that the work ahead will need more hands than the family can supply.\n\n*Question:* Why does the commentary call the decision one of judgement?',
      v: vPlanCase,
      bl: [
        '**Find the idea:** he trusts the boat but accepts that more hands are needed.',
        '**Why:** a sensible leader plans for the work ahead.',
        '**Answer:** it shows a balanced view of strength and limits.',
      ],
      n: 'Here is how to answer a commentary set. Read the passage and the question. Find the idea in the passage: he trusts his boat but accepts that more hands are needed. Then answer in your own words: it shows a balanced view of what the family can and cannot do. Always check which part asks for the commentary and which asks for the account.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: '*Question:* How does the account show the narrator in the double role of father and captain? Answer in 100-120 words.',
      v: vPlanLong,
      bl: [
        '**Stand:** both roles appear in the same crisis.',
        '**Points + incidents:** as captain, patching and navigating; as father, the children\'s card and praise.',
        '**Link:** a theme of calm leadership.',
        '**Conclusion:** the two roles meet in one person.',
      ],
      n: 'Plan a five mark answer like this. Take a stand: both roles appear in the same crisis. Give points with incidents in your own words: as captain he patches and navigates, and as father he receives his daughter\'s card and his son\'s praise. Link to the theme of calm leadership. End with one line: the two roles meet in one person.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Five stages: setting out, gales, preparation, the wave and night, the days to the island.',
        'Everyone has a job after the wave; the work is shared.',
        'Six themes: courage, optimism, teamwork, the children, endurance, preparation.',
        'Read the account in *Hornbill*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. The voyage has five stages. After the wave everyone has a job and the work is shared. Six themes run through it: courage, optimism, teamwork, the children, endurance and preparation. And remember: read the account in your textbook and write about it in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Commentary sets: answer from the commentary first, then from the account.',
        'Describe events in your own words; do not copy lines.',
        'Name the stage when you describe an incident.',
        'Facts often confused: the wave struck in the evening of 2 January; the crewmen are Larry (American) and Herb (Swiss).',
        'Do not say the family was fearless: they were prepared.',
      ],
      v: vPrep,
      n: 'Exam tips. In commentary sets, answer from the commentary first. Describe events in your own words and name the stage. Get the facts right: the wave struck in the evening of the second of January, and the crewmen are Larry, an American, and Herb, a Swiss. And never call the family fearless. They were prepared.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const D2 = deck({
  part: 2,
  title: 'We\'re Not Afraid to Die… if We Can All Be Together, Part 2: people and exam practice (Gordon Cook and Alan East)',
  goals: [
    'Describe the narrator, Mary, the crewmen and the children with an incident for each',
    'Distinguish the courage of action from the courage of feeling',
    'Write a diary entry, a letter and an opinion answer',
    'Handle statements and scenarios that need your own interpretation',
  ],
  slides: [
    sl('title', 'People and exam practice', {
      b: `*We're Not Afraid to Die… if We Can All Be Together*, Part 2.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Here we look at the people in the account, how the story is told, and the kinds of answers the exam asks for: a diary entry, a letter and an opinion. Remember to read the account in your textbook, Hornbill, and to write in your own words.',
    }),
    sl('concept', 'The narrator: roles and evidence', {
      b: 'Every role in an answer needs an incident, described in your own words.',
      v: vNarrator,
      n: 'Let us look at the narrator. He is the father, who takes his wife and two young children to sea. He is the skipper, who decides on the preparations and covers the holes after the wave. He is the navigator, who works out the position with care. And he is the narrator, telling the story in the first person.',
    }),
    sl('concept', 'Mary and the crewmen', {
      v: vCrew,
      n: 'Now the others aboard. Mary, the narrator\'s wife, raises the alarm that the boat is taking in water. Larry Vigil, an American, and Herb Seigler, a Swiss, are the two crewmen who join for the hardest part of the voyage. Both pump for hours. Each person has a clear part, and the work is shared.',
    }),
    sl('concept', 'Suzanne and Jonathan', {
      v: vKids,
      n: 'The two children. Suzanne is about seven. She is hurt in the wave, with a swelling on her head and a cut, but says little about it so as not to worry her parents. Later she gives a drawn card with funny pictures of her parents. Jonathan is about six. He makes the remark that gives the account its title, and at the end he praises his father as a captain.',
    }),
    sl('check', 'Check: danger in the account', {
      chk: 'ar_cook',
      n: 'Check yourself with an assertion and reason. Read both statements about the danger of the voyage, then choose the correct option.',
    }),
    sl('two-column', 'Action and feeling', {
      b: 'Two kinds of response appear side by side.',
      cols: [
        '**Adults: action**\n\n- pump for hours\n- patch the holes\n- navigate to the island\n- rig an electric pump',
        '**Children: feeling**\n\n- Suzanne keeps her pain to herself\n- Suzanne draws a card\n- Jonathan speaks of being together\n- Jonathan praises his father',
      ],
      v: vAction,
      n: 'Notice the two kinds of response. The adults act. They pump for hours, patch the holes, navigate to the island and rig an electric pump. The children respond in feeling. Suzanne keeps her pain to herself and draws a card. Jonathan speaks of being together, and at the end he praises his father. Use both in your answers.',
    }),
    sl('concept', 'How the account is told', {
      v: vCraft,
      n: 'Notice how the account is told. It is in the first person, so the narrator tells his own experience. It follows time order, from Plymouth to the landing. It is about a real event, with named people and places. The title comes from a remark made by one of the children. And there is plenty of detail of seamanship.',
    }),
    sl('check', 'Check: the island', {
      chk: 'm_ile',
      n: 'Check yourself. The narrator hopes to reach Ile Amsterdam. What kind of place is it?',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words often appear in answers. A voyage is a long journey, especially by sea. A gale is a very strong wind. A crewman is a member of a ship\'s crew. A caricature is a funny drawing that exaggerates a person\'s features. An ordeal is a long, painful or frightening experience. To navigate is to work out and follow a route. Endurance is the ability to bear hardship over a long time.',
    }),
    sl('check', 'Check: the crewmen', {
      chk: 'fb_crew',
      n: 'Fill in the blank. The two crewmen were Larry Vigil, an American, and Herb, blank, a Swiss. Type the missing surname.',
    }),
    sl('example', 'Worked example 1: a diary entry', {
      b: '*Task:* As Mary, write a diary entry for the morning after the wave, when the pumping has at last slowed.',
      v: vDiaryPlan,
      bl: [
        '**Format:** day and date, salutation, first person.',
        '**Content:** the wave, the alarm you raised, the children, the pumps.',
        '**Feelings:** fear, tiredness, pride in the family.',
        '**Ending:** a hope that the island is near.',
      ],
      n: 'Here is a diary plan. Start with the day, the date and a salutation. Write in the first person as Mary. Describe what happened: the wave, the alarm you raised, the children and the pumps. Add how you felt, perhaps afraid and tired but proud of the family. End with a hope that the island is near. Keep your facts consistent with the account.',
    }),
    sl('example', 'Worked example 2: a letter', {
      b: '*Task:* As Suzanne, write a letter to a school friend about the voyage so far.',
      v: vLetterPlan,
      bl: [
        '**Format:** address, date, salutation, closing.',
        '**Content:** the boat, the gales, the crewmen, the card you drew.',
        '**Tone:** a young child, friendly and simple.',
        '**Facts:** stay with the account; add only feelings.',
      ],
      n: 'Plan an informal letter like this. Put the address and the date, then a salutation. Say why you are writing. In the body, write about the boat, the gales, the crewmen and the card you drew, in a simple, friendly tone suited to a child. Close with your name. Stay with the facts of the account, and add only feelings.',
    }),
    sl('example', 'Worked example 3: an opinion answer', {
      b: '*Statement:* Courage means never showing fear. Do you agree?',
      v: vOpinion,
      bl: [
        '**Stand:** disagree, with some sympathy for the view.',
        '**For:** Suzanne stays quiet about her pain.',
        '**Against:** Jonathan speaks of being together, and is still brave.',
        '**Conclusion:** courage can be quiet or spoken.',
      ],
      n: 'For an opinion answer, plan both sides. Take a stand, here disagree with some sympathy. Give evidence for the view: Suzanne stays quiet about her pain. Give evidence against: Jonathan speaks of being together, and is still brave. End with a balanced conclusion: courage can be quiet or spoken.',
    }),
    sl('check', 'Check: the ending and the title', {
      chk: 'm_end_cf',
      n: 'Check yourself. Imagine the account stopped at the night of pumping, without the landing. What would the title lose most? Think about what the title promises.',
    }),
    sl('concept', 'Extrapolation tasks: what to do', {
      bl: [
        'Stay faithful to the facts: names, places and the order of events.',
        'Extend only in ways that suit the character and age.',
        'Use the right format: diary, letter, speech or sketch.',
        'Do not add events that the account does not suggest.',
      ],
      v: vRules,
      n: 'Extrapolation tasks ask you to go beyond the text. Stay faithful to the facts: names, places and the order of events. Extend only in ways that suit the character and age. Use the right format, and do not add events that the account does not suggest.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Narrator: father, skipper, navigator; Mary raises the alarm; crew pump.',
        'Suzanne keeps her pain quiet; Jonathan speaks and praises his father.',
        'Adults act; children respond in feeling.',
        'Use the right format for diary, letter, speech or sketch.',
      ],
      v: vCrew,
      n: 'Let us sum up. The narrator is father, skipper and navigator. Mary raises the alarm and the crewmen pump. Suzanne keeps her pain quiet, and Jonathan speaks and praises his father. The adults act and the children respond in feeling. Remember to use the right format for a diary, a letter, a speech or a sketch.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Diary entry: day, salutation, first person, feelings.',
        'Letter: address, date, salutation, closing.',
        'Opinion: take a stand, give both sides, conclude.',
        'Stay within the word limit; plan in one minute.',
        'Never copy lines from the account.',
      ],
      v: vOpinion,
      n: 'Exam tips. In a diary entry, use the day, a salutation, the first person and feelings. In a letter, give the address, the date, a salutation and a closing. In an opinion, take a stand, give both sides and conclude. Stay within the word limit and plan for a minute. And never copy lines from the account.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'We\'re Not Afraid to Die… if We Can All Be Together: study notes',
  sections: [
    {
      h: '1. About the account and the writers',
      t: 1,
      b: `${READ}\n\n*We're Not Afraid to Die… if We Can All Be Together* is a prose piece in *Hornbill* by **Gordon Cook and Alan East**. It is a **first-person account** of a real sea voyage. The narrator is the father of the family, one of the two writers. The family sails into the southern Indian Ocean after Cape Town and meets an enormous storm.`,
      v: vText,
      terms: [['Account', 'A telling of real events, here in the first person.'], ['First-person narrator', 'A narrator who says I and tells the story from his own point of view.']],
    },
    {
      h: '2. Summary in SOYL\'s words: setting out',
      t: 1,
      b: 'In July 1976 the narrator, a businessman, sets sail from Plymouth, England, with his wife Mary, their son Jonathan (about six) and daughter Suzanne (about seven). They hope to repeat the round-the-world voyage made by Captain James Cook two hundred years earlier. Their boat, **Wavewalker**, is a wooden-hulled vessel of about 23 metres, built by professionals and tested in gales. Two crewmen, **Larry Vigil** (an American) and **Herb Seigler** (a Swiss), join for the hardest part. The first leg, to Cape Town, goes well; they then sail east into the southern Indian Ocean and meet strong gales and huge waves.',
      v: vSetting,
      terms: [['Voyage', 'A long journey, especially by sea.'], ['Crewman', 'A member of a ship\'s crew.']],
    },
    {
      h: '3. Summary: 2 January, the wave and the night',
      t: 1,
      b: 'On **2 January** the waves become enormous. The crew slow the boat, reduce sail, let out a heavy rope behind it, go through the life-raft routine and put on protective clothing and life jackets. In the **evening** an enormous wave strikes. The narrator is swept off the deck and carried back aboard as the boat rights itself. The deck is badly damaged and water pours in. Mary raises the alarm. Larry and Herb pump for hours, and the narrator covers the openings with canvas. Later that night an electric pump is connected to help. They pump until morning.',
      v: vWave,
      terms: [['Gale', 'A very strong wind.'], ['Ordeal', 'A long, painful or frightening experience.']],
    },
    {
      h: '4. Summary: the days to the island',
      t: 1,
      b: 'Over the next days the water is slowly brought down, but the boat stays badly damaged, everyone is exhausted, and the weather worsens again. As the danger returns, Jonathan makes the remark that gives the account its title. The narrator works out their position with great care, hoping to reach **Ile Amsterdam**, a small French island with a scientific base. Suzanne, hurt in the wave, has said little about it; her parents find later that her injuries are worse than she let on, and she explains that she did not want to worry them while they fought for the boat. She gives her father a drawn card with funny pictures of her parents. After days of struggle they sight the island. Jonathan praises his father as a captain, and the small community at the base welcomes the family.',
      v: vAfter,
      terms: [['Navigate', 'To work out and follow a route.'], ['Caricature', 'A funny drawing that exaggerates a person\'s features.']],
    },
    {
      h: '5. Themes',
      t: 2,
      b: '- **Courage and calm leadership:** the narrator patches the holes and works out the position.\n- **Optimism:** the family keeps hoping for the island through the days of strain.\n- **Teamwork:** Mary, the crewmen and the narrator each do a job at the same time.\n- **The children\'s bravery and the adults\' respect for it:** Suzanne\'s silence about her injury; Jonathan\'s remark; the card; the praise.\n- **Endurance against nature:** the night of pumping and the long days after.\n- **Preparation and seamanship:** the steps on 2 January; careful navigation.',
      v: vThemes,
      terms: [['Endurance', 'The ability to bear hardship over a long time.'], ['Optimism', 'Hope that things will turn out well.']],
    },
    {
      h: '6. The narrator, Mary and the crewmen',
      t: 3,
      b: 'The **narrator** is father, skipper and navigator, and tells the account himself. **Mary**, his wife, raises the alarm that the boat is taking in water. **Larry Vigil** and **Herb Seigler** pump for hours. After the wave each person has a separate job, and the jobs go on at the same time. Support every statement about a person with an incident, in your own words.',
      v: vCrew,
      terms: [['Skipper', 'The person in command of a boat.'], ['Seamanship', 'Skill in handling a boat at sea.']],
    },
    {
      h: '7. The children',
      t: 3,
      b: '**Suzanne** (about seven) is hurt in the wave, with a swelling on her head and a cut. She says little about it, because she does not want to worry her parents. Later she gives a drawn card with funny pictures of her parents. **Jonathan** (about six) makes the remark that gives the account its title and, at the end, praises his father as a captain. The adults show courage through action: pumping, patching, navigating. The children show it through feeling: Suzanne keeps her pain to herself and draws a card; Jonathan speaks of being together.',
      vs: [vKids, vAction],
      terms: [['Composure', 'Calmness and self-control in a difficult moment.'], ['Extrapolation', 'Going beyond the text in a way that fits its facts and characters.']],
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**Commentary sets (4 marks):** read the commentary, then each question; answer from the commentary first and from your knowledge of the account where asked.\n\n**Short answers (2 and 3 marks):** point, incident, explanation, within the limit.\n\n**Long answers (about 100-120 words in school papers; SOYL 5-mark practice is 80-120):** a stand, two or three points with incidents in your own words, a link to a theme, a one-line conclusion. For a diary entry or letter, use the correct format and stay faithful to the facts.',
      v: vPlanLong,
      terms: [['Commentary set', 'Questions on a short passage written about a text, not taken from it.'], ['Format', 'The layout and features of a diary entry, letter, speech or sketch.']],
    },
  ],
  tips: '**Board weight:** Hornbill prose extract (3 marks), short answers (2 and 3 marks) and long answers (6 marks) in Section C of the school annual paper (CBSE Class 11 English Core, 2026-27).\n\n**How marks are awarded:** content (relevant incidents, accurately used), interpretation (a clear, supported view) and expression within the limit; for diaries, letters and speeches, format counts too.\n\n**Common mistakes**\n1. Saying the family was fearless: they prepared carefully.\n2. Placing the wave in the morning: it struck in the evening of 2 January.\n3. Mixing up the crewmen: Larry Vigil is American, Herb Seigler is Swiss.\n4. Placing Jonathan\'s remark on the night of the wave: it comes in the following days, when the weather worsens again.\n5. Giving a theme without an incident.\n6. Adding invented events in a diary or letter.\n7. Copying sentences from the textbook instead of writing in your own words.\n8. Ignoring the word limit.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *We\'re Not Afraid to Die… if We Can All Be Together*?', 'Gordon Cook and Alan East.', 'fact', 1],
  ['What kind of writing is this piece?', 'A first-person account of a real sea voyage.', 'fact', 1],
  ['Who is the narrator?', 'The father of the family, one of the two writers.', 'fact', 1],
  ['When and from where does the voyage begin?', 'July 1976, from Plymouth, England.', 'fact', 1],
  ['What was the family hoping to do?', 'Repeat Captain James Cook\'s round-the-world voyage made two hundred years earlier.', 'fact', 1],
  ['Who sets sail with the narrator?', 'His wife Mary, son Jonathan (about six) and daughter Suzanne (about seven).', 'fact', 1],
  ['What is the boat called?', 'Wavewalker, a wooden-hulled boat of about 23 metres.', 'fact', 1],
  ['What had been done to the boat before the voyage?', 'It was professionally built and tested in gales.', 'fact', 1],
  ['Who are the two crewmen?', 'Larry Vigil, an American, and Herb Seigler, a Swiss.', 'fact', 1],
  ['Where does the first leg end?', 'At Cape Town; it goes well.', 'fact', 1],
  ['Where do they meet strong gales and huge waves?', 'In the southern Indian Ocean, sailing east from Cape Town.', 'fact', 1],
  ['What happens on 2 January?', 'The waves become enormous and the crew prepare for the worst.', 'fact', 1],
  ['Name three steps of preparation.', 'Reduced sail, a rope let out behind the boat, the life-raft routine (also protective clothing and life jackets).', 'fact', 1],
  ['When does the enormous wave strike?', 'In the evening of 2 January.', 'fact', 1],
  ['What happens to the narrator in the wave?', 'He is swept off the deck and carried back aboard as the boat rights itself.', 'fact', 1],
  ['What damage does the wave do?', 'The deck is badly damaged and water pours in.', 'fact', 1],
  ['What does Mary do after the wave?', 'She raises the alarm that the boat is taking in water.', 'fact', 3],
  ['What do Larry and Herb do?', 'They pump the water out for hours.', 'fact', 3],
  ['How does the narrator deal with the openings in the deck?', 'He covers them with canvas.', 'fact', 3],
  ['What is connected later that night to help with the water?', 'An electric pump.', 'fact', 1],
  ['What is Suzanne\'s injury?', 'A swelling on her head and a cut.', 'fact', 3],
  ['Why does Suzanne say little about her injuries?', 'She does not want to worry her parents.', 'fact', 3],
  ['What gives the account its title, and when?', 'A remark Jonathan makes in the days after the wave, when the weather worsens again.', 'fact', 3],
  ['What does Suzanne give her father?', 'A card she has drawn, with funny pictures of her parents.', 'fact', 3],
  ['Where is the narrator aiming to reach?', 'Ile Amsterdam, a small French island with a scientific base.', 'fact', 1],
  ['What does Jonathan say at the end?', 'He praises his father as a captain.', 'fact', 3],
  ['Who welcomes the family on the island?', 'The small community at the scientific base.', 'fact', 1],
  ['Name three themes.', 'Courage and calm leadership, optimism, teamwork (also the children\'s bravery, endurance, preparation).', 'concept', 2],
  ['*endurance*', 'the ability to bear hardship over a long time', 'definition', 2],
  ['Plan for a long answer', 'Stand, points with incidents in own words, link to theme, conclusion.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): We\'re Not Afraid to Die… if We Can All Be Together',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_start', 'm_prep', 'm_cf_complain', 'ar_prep'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'About 30-50 words for 2-mark and 50-80 words for 3-mark answers.', items: ['s2_suz', 's2_pump', 's3_summary'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any one of the two questions (80-120 words).', items: [{ attempt: 1, keys: ['l_diary', 'l_speech'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the commentary and answer all parts; one sub-part has an internal choice. (The passage is SOYL commentary; read the account in Hornbill.)', items: ['c_prep'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): We\'re Not Afraid to Die… if We Can All Be Together',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_aim', 'm_mary', 'm_why_title', 'm_flaw_leader', 'm_cf_crew', 'm_compare_cap', 'm_flaw_children', 'm_inf_praise', 'ar_crew', 'ar_gale'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_why_prep', 's2_cf_cap', { attempt: 1, keys: ['s2_two_cards', 's2_ev_hide'] }, 's3_themes', { attempt: 1, keys: ['s3_lead_cf', 's3_children_adults'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_letter', { attempt: 1, keys: ['l_opinion', 'l_sketch'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each commentary and answer all parts. (Passages are SOYL commentary; read the account in Hornbill.)', items: ['c_wave', 'c_child'] },
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
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the account; summaries in SOYL words; passage items are SOYL commentary (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on title slides, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused',
    re_solve: 'writer pass: every item re-answered from its stem and checked against the account events',
    gate: 'content lint (lintExemplar) runs inside the build',
  },
});

// Reproduction guard (D-036): short distinctive phrases of the account that must never appear in the chapter's files.
guard(DIR, [
  'heavy mooring rope',
  'dropped the storm jib',
  'life-raft drill',
  'donned oilskins',
  'torrent of green',
  'hurled her upright',
  'lifeline jerked taut',
  'like a rag doll',
  'blood and broken teeth',
  "we're sinking",
  'decks are smashed',
  'pumping like madmen',
  'gaping holes',
  'big bump',
  'two enormous black eyes',
  'save us all',
  'impending doom',
  'some funny people',
  'laughed a lot',
  'best daddy',
]);
