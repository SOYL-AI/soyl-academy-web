// Build CBSE 10 English Language and Literature ch10 "Madam Rides the Bus" (Vallikkannan). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch10/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased, and its dialogue is reported, never reproduced. Students read it in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch10', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the story itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words', '3 each'],
    ['Long answer', '100–120 words: character, theme, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight story is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthor = table(
  ['About the story', ''],
  [
    ['Author', 'Vallikkannan, pen name of the Tamil writer R. S. Krishnaswamy'],
    ['Original language', 'Tamil (read in English translation)'],
    ['Genre', 'short story, told in the third person, closely following Valli'],
    ['Setting', 'a village in Tamil Nadu, the bus route to the nearest town, and the town itself'],
    ['Main character', 'Valli (Valliammai), an eight-year-old girl'],
  ],
  'Table of facts: the author is Vallikkannan, pen name of the Tamil writer R. S. Krishnaswamy; the story was written in Tamil; it is a third-person short story; it is set in a village, on the bus route and in the nearest town; the main character is Valli, an eight-year-old girl.',
);
const vStages = flow('LR', ['The doorway and the dream', 'Research and saving', 'Boarding: madam', 'The joyful outward ride', 'The town, seen from the bus', 'The dead cow on the way back', 'Home, with a secret'], 'Flow of the story in seven stages: the doorway and the dream; research and saving; boarding, where Valli is called madam; the joyful outward ride; the town seen from the bus; the dead cow on the way back; home, with a secret.', 'The story in seven stages (SOYL summary).');
const vJourneys = table(
  ['', 'Outward journey', 'Return journey'],
  [
    ['The young cow', 'running ahead of the bus; Valli laughs', 'lying dead by the road'],
    ['The view', 'every sight a wonder', 'no longer of interest'],
    ['Valli\'s mood', 'excited, proud, delighted', 'shocked, sad, thoughtful'],
    ['What it means', 'the joy of discovering the world', 'the first encounter with death'],
  ],
  'Comparison table of the two journeys: on the way out the cow runs ahead and Valli laughs, every sight is a wonder, and she is delighted; on the way back the cow lies dead, the view no longer interests her, and she is sad and thoughtful.',
  'Same road, opposite moods (SOYL summary).',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Curiosity', 'The passing bus makes Valli long to see the world beyond her street.'],
    ['Planning and determination', 'She researches the trip and saves every coin.'],
    ['Independence and self-respect', 'She refuses help, a treat and fussing.'],
    ['Life and death', 'The cow that made her laugh is later found dead.'],
    ['Growing up', 'She returns home a little older in mind.'],
    ['Childhood and the adult world', 'Adults tease or fuss; Valli insists on equality.'],
  ],
  'Table of six themes with where each appears: curiosity, planning and determination, independence and self-respect, life and death, growing up, and childhood and the adult world.',
);
const vValli = table(
  ['Valli\'s trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Curious', 'Longs to know what lies at the end of the bus route.'],
    ['Resourceful planner', 'Learns every detail from overheard talk and careful questions.'],
    ['Self-controlled', 'Saves every coin and skips the fair\'s treats.'],
    ['Independent and proud', 'Refuses help, the drink and the elderly woman\'s fussing.'],
    ['Observant and joyful', 'Delights in every sight on the outward ride.'],
    ['Sensitive', 'The dead cow takes away all her pleasure.'],
  ],
  'Table of Valli\'s traits with evidence: curious, a resourceful planner, self-controlled, independent and proud, observant and joyful, and sensitive.',
);
const vAdults = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['The conductor', 'Good-humoured and kind; teases her as madam, later offers her a drink'],
    ['The elderly woman', 'Fussy and curious; treats Valli as a helpless child'],
    ['Valli\'s mother', 'Naps through the adventure and never learns of it'],
    ['Other passengers', 'Amused by a small girl travelling alone'],
  ],
  'Table of the adult characters: the conductor is good-humoured and kind; the elderly woman is fussy; Valli\'s mother naps and never learns of the trip; other passengers are amused.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['pastime', 'an activity done for enjoyment'],
    ['fare', 'the money paid for a journey'],
    ['conductor', 'the person who sells tickets on a bus'],
    ['temptation', 'a strong wish to do something one should not'],
    ['dignity', 'a calm, serious manner that commands respect'],
    ['mock respect', 'pretend respect, used as a joke'],
    ['mature', 'grown-up in thinking and behaviour'],
  ],
  'Table of word meanings: pastime, fare, conductor, temptation, dignity, mock respect, and mature.',
  'Key words for this story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Madam Rides the Bus',
  goals: [
    'Retell Valli\'s adventure in sequence, in your own words',
    'Explain Valli\'s curiosity and planning, and the lesson about life and death she learns',
    'Sketch Valli\'s character with evidence from her bus ride',
    'Compare the outward and return journeys and explain the contrast',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Madam Rides the Bus — Vallikkannan', {
      b: `*First Flight*, prose · short story (translated from Tamil) · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study Madam Rides the Bus, a story by the Tamil writer Vallikkannan about a village girl who secretly plans her first bus ride. Please read the story itself in your textbook, First Flight. This lesson does not repeat it. Instead we will follow Valli\'s adventure, understand her character, and see how a happy outing becomes a lesson about life and death.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *First Flight*, straight through.',
        'Use these slides for the sequence, Valli\'s character and the themes.',
        'Explain events **in your own words**; report what characters say instead of quoting it.',
        'Practise the extract questions, which use SOYL commentary on the story.',
      ],
      n: 'Here is how to use this lesson. Read the story in your textbook first. Then use these slides for the order of events, Valli\'s character and the themes. In answers, explain what happens in your own words, and report what characters say rather than quoting it. Finally, practise with our extract questions, which are based on commentary written by SOYL.',
    }),
    sl('concept', 'The author and the story', {
      v: vAuthor,
      n: 'Vallikkannan is the pen name of the Tamil writer R. S. Krishnaswamy. The story was written in Tamil, and we read it in English translation. It is told in the third person, but the narrator stays very close to Valli, so we share her thoughts and feelings. It is set in a village, on the bus road, and in the nearest town.',
    }),
    sl('diagram', 'The story in seven stages', {
      b: 'A short trip with a long reach: from a dream at the doorway to a secret brought home. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves in seven stages. Valli dreams of the bus from her doorway. She researches and saves. She boards the bus and is nicknamed madam. The outward ride is pure joy. She sees the town from her seat. On the way back she sees something that saddens her. And she comes home carrying a secret. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: the dream and the plan', {
      b: 'Valli, an eight-year-old village girl with nobody her age to play with, spends her time watching the street from her front door. The bus to the nearest town fascinates her. She quietly listens to people who use it, asks a few careful questions, and learns the distance, the time and the fare. She saves every coin, resisting the treats of the village fair, and picks the time of her mother\'s afternoon nap for her secret trip.',
      n: 'Valli is eight, and her entertainment is the view from her front door. The bus that runs to the nearest town fascinates her. So she makes a plan. She listens to people who use the bus, asks a few careful questions, and learns everything she needs. Then she saves every coin, even when the village fair tempts her, and chooses her mother\'s afternoon nap as the time to go.',
    }),
    sl('concept', 'Summary 2: boarding the bus', {
      b: 'At the bus stop Valli refuses the conductor\'s help and climbs in by herself. Amused by her grown-up manner, he addresses her with mock respect as madam, the word in the title. She pays her fare and takes her seat with great seriousness. An elderly woman passenger fusses over her, and Valli, who wants to be treated as a proper traveller, keeps her replies short.',
      n: 'At the bus stop, Valli refuses the conductor\'s help and climbs in on her own. He is amused by her serious, grown-up manner and starts to call her madam, with mock respect. That is where the title comes from. She pays her own fare. When an elderly woman fusses over her, Valli is irritated. She wants to be treated as a passenger, not as a little child.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_valli',
      n: 'Your turn. Six events from Valli\'s adventure are shuffled. Put them in the order in which they happen, from the doorway to the road home.',
    }),
    sl('concept', 'Summary 3: the outward ride', {
      b: 'On the way to the town Valli is enchanted by everything she sees through the window. A young cow is trapped on the road ahead of the bus, and the horn only frightens it into running harder; Valli is helpless with laughter.',
      n: 'On the way to the town, Valli is enchanted. Trees, water and distant hills pass the window, and each sight is a wonder. Then a young cow gets stuck on the road ahead of the bus. The horn only frightens it into running harder, and Valli laughs and laughs. Remember this cow. The writer will bring it back.',
    }),
    sl('concept', 'Summary 4: the town', {
      b: 'At the town Valli does not get off. She had planned a ride, not a visit, and must be home before her mother wakes, so she buys a ticket for the return journey and watches the busy town from her seat. The conductor, now fond of her, offers to buy her a drink; she politely refuses.',
      n: 'When the bus reaches the town, Valli surprises the conductor by staying in her seat. Her plan was a ride, not a visit, and she must be home before her mother wakes. So she buys a return ticket and watches the town through the window. The conductor, who now likes her, offers her a drink. She politely says no.',
    }),
    sl('concept', 'Summary 5: the return and home', {
      b: 'On the way back Valli sees the same young cow lying dead by the road, killed by a passing vehicle. Her joy disappears and the view loses all its charm. She reaches home safely, and the trip remains her own secret.',
      n: 'On the way back, Valli sees the same young cow lying dead beside the road. A passing vehicle has killed it. Her happiness disappears, and she turns away from the window. She reaches home safely, and nobody learns about her journey. But she is not quite the same girl who set out. She has had her first real meeting with death.',
    }),
    sl('two-column', 'Theme 1: joy and sorrow on the same road', {
      b: 'The two journeys mirror each other.',
      v: vJourneys,
      cols: [
        '**Going out**\n\n- the cow alive and running\n- every sight a wonder\n- laughter and pride',
        '**Coming back**\n\n- the cow dead by the road\n- the view ignored\n- shock and silence',
      ],
      n: 'The heart of the story is a contrast. On the way out, the cow is alive and funny, the view is wonderful, and Valli is proud and happy. On the way back, the same road brings the dead cow, and Valli falls silent. The same journey holds both joy and sorrow. That is the lesson about life and death she learns without any adult explaining it.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that contrast sit other themes. Curiosity, which starts the whole adventure. Planning and determination, in her research and saving. Independence and self-respect, in the way she refuses help and fussing. Life and death, through the cow. Growing up, because she returns a little older in mind. And the gap between children and adults, who either tease or fuss.',
    }),
    sl('check', 'Check: Valli\'s quality today', {
      chk: 'mc_apply_valli',
      n: 'Check yourself. Four present-day students are described. Which one shows the same quality that Valli shows while she prepares for her ride?',
    }),
    sl('concept', 'Character: Valli', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vValli,
      n: 'Let us sketch Valli. She is curious and a resourceful planner. She is self-controlled, saving every coin. She is independent and proud, refusing help and favours. She is observant and full of joy on the outward ride. And she is sensitive, as the dead cow shows. In answers, always pair a trait with a moment from the story.',
    }),
    sl('concept', 'Character: the adults around Valli', {
      v: vAdults,
      n: 'The adults help us see Valli more clearly. The conductor is good-humoured and kind; his teasing turns into fondness. The elderly woman is fussy and treats Valli as helpless, which Valli resents. Her mother naps through the whole adventure. Each adult underestimates her, and each time Valli shows that she can manage on her own.',
    }),
    sl('two-column', 'Was Valli right to go alone?', {
      cols: [
        '**Yes: admirable independence**\n\n- she planned carefully and paid her own way\n- she behaved sensibly among strangers\n- she gained knowledge no lesson could teach',
        '**No: a real risk**\n\n- an eight-year-old travelling secretly could be lost or hurt\n- her mother would not know where to look\n- true independence includes judging safety',
      ],
      n: 'A common long question asks whether Valli was right to travel alone and in secret. One side praises her careful planning, her sensible behaviour and what she learnt. The other side points out the danger to a small child and her mother\'s ignorance of where she was. The best answers take a stand and still show they understand the other side.',
    }),
    sl('check', 'Check: Valli at the bus step', {
      chk: 'ar_refuse_help',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and narrative technique', {
      bl: [
        '**Third-person narration close to Valli:** we see the world through a child\'s eyes.',
        '**Gentle humour:** a small girl behaving like an important adult passenger.',
        '**Contrast:** the outward and return journeys mirror each other.',
        '**Foreshadowing:** the running cow prepares for the dead cow.',
        '**Simple, vivid description** of village, road and town.',
      ],
      n: 'How is the story told? A third-person narrator stays close to Valli, so we see the world through a child\'s eyes. Gentle humour comes from a little girl behaving like an important passenger. The two journeys are built as a contrast. The running cow is an example of foreshadowing, because it prepares us for what comes later. And the descriptions are simple and vivid.',
    }),
    sl('example', 'Contrast and foreshadowing: SOYL\'s own examples', {
      b: 'Practise the two devices that shape this story. These sentences are SOYL\'s own, not from the story:',
      bl: [
        '*In the morning the kite danced above the rooftops; by evening its torn string hung from a wire.* — contrast between two moments',
        '*Ravi waved cheerfully at the old boat tied by the river, not knowing he would need it that night.* — foreshadowing',
        '*The same street that echoed with the wedding band at noon was silent at midnight.* — contrast of place and mood',
      ],
      n: 'Here are three sentences of our own. A kite dances in the morning and hangs torn by evening: a contrast between two moments. Ravi waves at an old boat he will need that night: foreshadowing, because an early detail prepares for a later event. A street loud at noon and silent at midnight: contrast of mood. Now find the same devices in Valli\'s two journeys.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the story. A pastime is something you do for fun. The fare is the money paid for a journey, and the conductor sells tickets. A temptation is a strong wish to do something you should not. Dignity is a calm, serious manner. Mock respect is pretend respect, used as a joke. And mature means grown-up in thinking.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Valli is a child with a grown-up mind.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** agree, with one qualification.',
        '**Points + evidence:** researches and saves like an adult; insists on being treated as an equal passenger; keeps to her plan in the town.',
        '**Qualification:** her laughter and her shock at the cow show she is still a child.',
        '**Link + conclusion:** the trip moves her a step towards real maturity.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree, with a qualification. Give three points: she plans and saves like an adult, she insists on equal treatment, and she sticks to her plan in the town. Then qualify it: her laughter and her shock at the cow show a child\'s heart. Link this to growing up, and end with one clear line.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Valli, eight, longs to ride the village bus; she researches the trip and saves every coin.',
        'She slips out during her mother\'s nap; the conductor nicknames her madam; she pays her own fare.',
        'Outward ride: wonder and laughter at a young cow; in the town she stays on the bus and refuses a treat.',
        'Return ride: the same cow lies dead; joy turns to sorrow; she comes home with a secret.',
        'Read the story in *First Flight*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Valli longs to ride the bus, plans carefully and saves. She slips away while her mother naps, is nicknamed madam, and pays her own way. The outward ride is full of wonder and laughter. The return brings the dead cow and her first meeting with death. She comes home safely, a little wiser. Read the story in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → link to theme → conclusion.',
        'Facts often confused: Valli does not get off in the town; she refuses the drink; the cow is seen alive going out and dead coming back.',
        'Report what characters say in your own words; do not quote dialogue.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right: Valli stays on the bus in the town and refuses the drink, and the cow is alive going out and dead coming back.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Madam Rides the Bus — study notes',
  sections: [
    {
      h: '1. About the story and the author',
      t: 1,
      b: `${READ}\n\n**Vallikkannan** is the pen name of the Tamil writer R. S. Krishnaswamy. *Madam Rides the Bus* was written in Tamil and is read in English translation. It is a short story told in the third person, with the narrator staying close to the thoughts and feelings of its eight-year-old heroine, Valli.`,
      v: vAuthor,
      terms: [['Pen name', 'A name a writer uses instead of their real name.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The dream.** Valli, with nobody her age to play with, watches the street from her front door. The bus to the nearest town fascinates her.\n\n**The plan.** She listens to neighbours and passengers, asks a few questions, and learns the distance, the time and the fare. She saves every coin, ignoring the village fair, and chooses the time of her mother\'s afternoon nap.\n\n**Boarding.** She refuses the conductor\'s help and climbs in alone. Amused, he calls her madam with mock respect. She pays her fare and resents an elderly woman\'s fussing.\n\n**The outward ride.** She delights in the view and laughs helplessly at a young cow running on the road ahead of the bus.\n\n**The town.** She stays on the bus, buys a return ticket and politely refuses the conductor\'s offer of a drink.\n\n**The return.** She sees the same cow lying dead, killed by a vehicle. Her joy vanishes. She reaches home safely, and the trip stays her secret.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Curiosity:** the wish to see the world beyond home.\n- **Planning and determination:** research, saving and timing.\n- **Independence and self-respect:** refusing help, favours and fussing.\n- **Life and death:** the cow, alive and then dead.\n- **Growing up:** a child returns a little wiser.\n- **Childhood and the adult world:** adults tease or fuss; Valli insists on equality.\n\n**Message:** growing up means discovering both the wonders and the sorrows of the world, often in the same day.',
      v: vJourneys,
      terms: [['Rite of passage', 'An experience that marks a step from one stage of life to the next.']],
    },
    {
      h: '4. Valli\'s character',
      t: 3,
      b: '**Curious** (longs to see the town). **A resourceful planner** (learns every detail quietly). **Self-controlled** (saves, skips the fair). **Independent and proud** (refuses help, the drink and fussing). **Observant and joyful** (delights in every sight). **Sensitive** (the dead cow ends her joy).\n\nShe is mature in mind, yet still a child at heart: her laughter and her shock show it.',
      v: vValli,
    },
    {
      h: '5. The adults around Valli',
      t: 3,
      b: '**The conductor** is good-humoured and kind; his teasing turns into fondness. **The elderly woman** is fussy and treats Valli as helpless. **Valli\'s mother** naps through the adventure. Each adult underestimates Valli; each time she shows she can manage.',
      v: vAdults,
    },
    {
      h: '6. Narrative technique and language',
      t: 2,
      b: '- **Third-person narration close to Valli:** the world through a child\'s eyes.\n- **Gentle humour:** a small girl acting like an important passenger.\n- **Contrast:** the outward and return journeys mirror each other.\n- **Foreshadowing:** the running cow prepares for the dead cow.\n- **Simple, vivid description.**\n\nSOYL practice sentence (not from the story): *In the morning the kite danced above the rooftops; by evening its torn string hung from a wire* (contrast).',
      v: vWords,
      terms: [
        ['Foreshadowing', 'An early detail that hints at a later event.'],
        ['Contrast', 'Placing opposite situations or moods side by side for effect.'],
      ],
    },
    {
      h: '7. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints a passage from the story; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the story.\n\n**Short answers (3 marks, 40–50 words):** point + evidence + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with evidence in your own words; a link to a theme; a one-line conclusion. Extrapolation tasks (Valli\'s diary, the conductor describing his passenger) must stay consistent with the story.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Valli explored the town: she stayed on the bus.\n2. Saying she accepted the conductor\'s drink: she refused it.\n3. Forgetting that the same cow appears twice, alive and then dead.\n4. Treating madam as Valli\'s real name rather than the conductor\'s joke.\n5. Quoting dialogue from memory instead of reporting it in your own words.\n\n**Remember:** read the story in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Madam Rides the Bus*?', 'Vallikkannan, pen name of the Tamil writer R. S. Krishnaswamy.', 'fact', 1],
  ['Original language of the story', 'Tamil.', 'fact', 1],
  ['Who is Valli?', 'An eight-year-old village girl (full name Valliammai).', 'fact', 1],
  ['Valli\'s favourite pastime', 'Watching the street from her front doorway.', 'fact', 1],
  ['What did Valli long for?', 'A ride on the bus to the nearest town.', 'fact', 1],
  ['How did Valli gather information?', 'By listening to neighbours and passengers and asking a few careful questions.', 'fact', 3],
  ['How did she get the money?', 'She saved every coin, resisting the treats of the village fair.', 'fact', 3],
  ['When did she slip out?', 'During her mother\'s afternoon nap.', 'fact', 1],
  ['How did she react to the conductor\'s offer of help?', 'She refused and climbed in by herself.', 'fact', 3],
  ['Why did the conductor call her madam?', 'He was amused by her grown-up, dignified manner.', 'concept', 3],
  ['How did Valli treat the elderly woman?', 'Coolly; she resented being treated as a helpless child.', 'concept', 3],
  ['What made Valli laugh on the way out?', 'A young cow running on the road ahead of the bus, frightened by the horn.', 'fact', 1],
  ['What did Valli do in the town?', 'Stayed on the bus and bought a return ticket.', 'fact', 1],
  ['Did Valli accept the conductor\'s drink?', 'No, she politely refused.', 'fact', 3],
  ['What did she see on the way back?', 'The same young cow, lying dead by the road.', 'fact', 1],
  ['Effect of the dead cow on Valli', 'Her joy vanished; the view lost all its charm.', 'concept', 2],
  ['Did her mother find out?', 'No; the trip remained Valli\'s secret.', 'fact', 1],
  ['Central lesson Valli learns', 'Life can end suddenly; joy and sorrow sit side by side.', 'concept', 2],
  ['The key contrast in the story', 'The outward ride (joy, live cow) versus the return (sorrow, dead cow).', 'concept', 2],
  ['Example of foreshadowing', 'The running cow on the way out prepares for the dead cow later.', 'concept', 2],
  ['Six traits of Valli', 'Curious, resourceful, self-controlled, independent, observant, sensitive.', 'concept', 3],
  ['The conductor\'s character', 'Good-humoured and kind; his teasing turns into fondness.', 'concept', 3],
  ['Narrative point of view', 'Third person, staying close to Valli\'s thoughts and feelings.', 'concept', 2],
  ['Tone of the story', 'Light and humorous at first, then quietly serious.', 'concept', 2],
  ['*fare*', 'the money paid for a journey', 'definition', 1],
  ['*mock respect*', 'pretend respect, used as a joke', 'definition', 1],
  ['*mature*', 'grown-up in thinking and behaviour', 'definition', 1],
  ['Why the title fits', 'It echoes the conductor\'s joke and names the main event; it hints at irony too.', 'concept', 2],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Valli got off in the town or accepted the drink.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Madam Rides the Bus',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the story in First Flight.)', items: ['src_planning'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_madam', 'sa_dead_cow', 'sa_conductor', 'sa_risk'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_valli_sketch', 'la_life_death'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Madam Rides the Bus',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_doorway', 'src_boarding'] }, { attempt: 1, keys: ['src_town', 'src_return'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_who', 'sb_fair', 'sb_when', 'sb_window'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_plan', 'sa_old_woman', 'sa_town_stay', 'sa_independence', 'sa_mirror'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_symbol_cow', 'la_valli_adults'] }, { attempt: 1, keys: ['la_diary_valli', 'la_independence_safety'] }] },
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
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the story; dialogue reported, never quoted; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the story',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
