// Build CBSE 10 English Language and Literature ch06 "Two Stories About Flying" (Part I: His First Flight,
// Liam O'Flaherty; Part II: The Black Aeroplane, Frederick Forsyth). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch06/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; neither story is
// quoted or closely paraphrased. Students read the stories in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch06', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the stories themselves in your textbook, *First Flight* (NCERT).** This lesson is SOYL\'s explanation and analysis; it does not reproduce the text.';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words, any 4 of 5', '3 each'],
    ['Long answer', '100–120 words: character, theme, comparison, diary, letter or opinion', '6'],
  ],
  'Table of how a First Flight prose lesson is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vAuthorHFF = table(
  ['About Part I', ''],
  [
    ['Story', '*His First Flight*'],
    ['Author', 'Liam O\'Flaherty (1896–1984), Irish novelist and short-story writer from the Aran Islands, who wrote in English and in Irish'],
    ['Known for', 'the novel *The Informer* (1925) and many short stories about animals and the natural world'],
    ['Genre', 'short story about nature, told by a third-person narrator who follows the young bird\'s feelings'],
    ['Setting', 'sea cliffs: the young gull\'s ledge, a plateau on the opposite cliff, and the sea below'],
    ['Characters', 'the young seagull, his mother and father, his two brothers and his sister'],
  ],
  'Table of facts about Part One: His First Flight by Liam O\'Flaherty, 1896 to 1984, an Irish writer from the Aran Islands known for The Informer and for animal stories; a third-person nature story set on sea cliffs; characters the young seagull, his parents, two brothers and a sister.',
);
const vAuthorBA = table(
  ['About Part II', ''],
  [
    ['Story', '*The Black Aeroplane*'],
    ['Author', 'Frederick Forsyth (1938–2025), English novelist and former journalist, who trained as a pilot in the Royal Air Force'],
    ['Known for', 'thrillers such as *The Day of the Jackal* (1971)'],
    ['Genre', 'short mystery story told in the first person by the pilot'],
    ['Setting', 'a night flight in an old Dakota from France towards England'],
    ['Characters', 'the narrator (a pilot), the voice of Paris Control, a woman in the control centre, and the unseen pilot of the black aeroplane'],
  ],
  'Table of facts about Part Two: The Black Aeroplane by Frederick Forsyth, 1938 to 2025, an English novelist and former RAF pilot known for The Day of the Jackal; a first-person mystery set on a night flight from France to England in an old Dakota; characters the narrator, Paris Control, a woman in the control centre and the pilot of the black aeroplane.',
);
const vStagesHFF = flow('LR', ['Alone and afraid on the ledge', 'A day of hunger and mockery', 'Mother hovers with fish', 'The fall, then flight', 'Down on the sea, afloat'], 'Flow of His First Flight in five stages: alone and afraid on the ledge; a day of hunger and mockery; the mother hovers with fish; the fall, then flight; down on the sea, afloat.', 'His First Flight in five stages (SOYL summary).');
const vStagesBA = flow('LR', ['Happy flight home', 'Storm ahead: the risky choice', 'Lost: instruments dead', 'The black aeroplane leads', 'Safe landing', 'No other plane on radar'], 'Flow of The Black Aeroplane in six stages: a happy flight home; a storm ahead and a risky choice; lost with dead instruments; the black aeroplane leads; a safe landing; no other plane on the radar.', 'The Black Aeroplane in six stages (SOYL summary).');
const vThemesHFF = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Fear and self-doubt', 'He can fly but believes he cannot.'],
    ['Confidence through action', 'One leap turns terror into joy.'],
    ['Need as a teacher', 'Hunger succeeds where scolding fails.'],
    ['Family and tough love', 'His family pushes, mocks, then praises and feeds him.'],
    ['Growing up', 'A fledgling becomes an independent bird of air and sea.'],
  ],
  'Table of five themes of His First Flight: fear and self-doubt, confidence through action, need as a teacher, family and tough love, and growing up.',
);
const vSeagull = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Timid, lacking confidence', 'He retreats from the edge although his wings are strong.'],
    ['Lonely and ashamed', 'He spends a day alone while his family mocks him.'],
    ['Attention-seeking', 'He pretends to fall asleep to make them notice him.'],
    ['Driven by need', 'Hunger makes him dive at the fish.'],
    ['Quick to grow in confidence', 'Once flying, he swoops and calls with joy.'],
  ],
  'Table of the young seagull\'s traits with evidence: timid, lonely and ashamed, attention-seeking, driven by need, and quick to grow in confidence.',
);
const vWordsHFF = table(
  ['Word', 'Meaning'],
  [
    ['ledge', 'a narrow shelf on the face of a cliff'],
    ['brink', 'the very edge of a steep place'],
    ['plateau', 'an area of flat, high ground'],
    ['herring', 'a small sea fish'],
    ['preening', 'cleaning and arranging feathers with the beak'],
    ['upbraiding', 'scolding or criticising sharply'],
    ['derisively', 'in a mocking way'],
    ['plaintively', 'in a sad, pleading way'],
  ],
  'Table of word meanings for His First Flight: ledge, brink, plateau, herring, preening, upbraiding, derisively and plaintively.',
  'Single words from the story with their meanings.',
);
const vExplain = table(
  ['Possible explanation', 'Evidence for', 'Evidence against'],
  [
    ['A ghost or guardian angel', 'appears at the worst moment; no lights; vanishes; not on the radar', 'no proof; the story never says so'],
    ['The pilot\'s imagination', 'fear, darkness and exhaustion can cause visions', 'he really did reach a runway safely'],
    ['Pure luck', 'storms can clear suddenly near an airport', 'he was guided step by step'],
  ],
  'Table of three possible explanations of the black aeroplane with evidence for and against: a ghost or guardian angel, the pilot\'s imagination, and pure luck.',
  'The story leaves the question open; any reasoned view earns credit.',
);
const vPilot = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Cheerful, family-loving', 'He looks forward to his holiday and breakfast at home.'],
    ['Impatient, risk-taking', 'He enters the storm instead of returning to Paris.'],
    ['Experienced but fallible', 'He knows the safe choice yet ignores it.'],
    ['Trusting when helpless', 'He follows a stranger with no instruments to check.'],
    ['Puzzled, thoughtful', 'He ends the story asking who saved him.'],
  ],
  'Table of the pilot\'s traits with evidence: cheerful and family-loving, impatient and risk-taking, experienced but fallible, trusting when helpless, puzzled and thoughtful.',
);
const vCompare = table(
  ['', 'His First Flight', 'The Black Aeroplane'],
  [
    ['Flier', 'a young seagull, a beginner', 'an experienced pilot'],
    ['Problem', 'inner fear: he doubts his own wings', 'outer danger: a storm he chose to enter'],
    ['Helper', 'his mother, using his hunger', 'a mysterious black aeroplane'],
    ['Turning point', 'the dive at the fish', 'the signal to follow'],
    ['Ending', 'joy, praise and food', 'safety, then an unsolved mystery'],
    ['Narrator', 'third person', 'first person'],
  ],
  'Comparison table of the two stories: a young beginner seagull versus an experienced pilot; inner fear versus outer danger; the mother versus a mysterious aeroplane as helper; the dive at the fish versus the signal to follow; a joyful ending versus an unsolved mystery; third-person versus first-person narration.',
);
const vWordsBA = table(
  ['Word', 'Meaning'],
  [
    ['Dakota', 'a twin-engine propeller aeroplane first built in the 1930s'],
    ['compass', 'an instrument that shows direction'],
    ['instruments', 'the dials and devices a pilot uses to fly safely'],
    ['control centre', 'the place on the ground that guides aircraft'],
    ['radar', 'a system that detects aircraft using radio waves'],
    ['runway', 'the strip on which aeroplanes land and take off'],
    ['fuel', 'what an engine burns to run (for aircraft, aviation fuel)'],
  ],
  'Table of word meanings for The Black Aeroplane: Dakota, compass, instruments, control centre, radar, runway and fuel.',
  'Words to know for the story.',
);
const vLongPlan = flow('LR', ['State the shared idea', 'Story 1: point + incident', 'Story 2: point + incident', 'Key difference', 'One-line conclusion'], 'Flow for planning a six-mark comparison answer: state the shared idea, give a point and incident from each story, name the key difference, and conclude.');

// ---------------------------------------------------------------- deck, Part 1
const D1 = deck({
  part: 1,
  title: 'Two Stories About Flying — Part 1: His First Flight (Liam O\'Flaherty)',
  goals: [
    'Retell the events of *His First Flight* in sequence, in your own words',
    'Explain how fear is overcome in the story, and the part hunger plays',
    'Describe the young seagull and judge his family\'s methods',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Two Stories About Flying — Part 1: His First Flight', {
      b: `*First Flight*, prose · two short stories · Class 10 CBSE English. Part 1: *His First Flight* by Liam O\'Flaherty. Part 2: *The Black Aeroplane* by Frederick Forsyth.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. This chapter has two short stories about flying. In this first part we study His First Flight, by the Irish writer Liam O\'Flaherty. Before anything else, please read the story itself in your textbook, First Flight. This lesson does not repeat the text. Instead we will understand its events, themes and characters, and how to answer board questions on it.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read *His First Flight* once in *First Flight*, straight through.',
        'Then use these slides for the events, themes, characters and language.',
        'In answers, describe incidents **in your own words**; do not memorise lines.',
        'Part 2 covers *The Black Aeroplane* and compares the two stories.',
      ],
      n: 'Here is how to study this part. Read the story once in your textbook, just to enjoy it. Then come back to these slides for its structure and meaning. In answers, describe incidents in your own words, because examiners reward understanding, not memorised lines. Part two of the lesson covers the second story and compares the two, which is a favourite exam question.',
    }),
    sl('concept', 'The author and the story', {
      v: vAuthorHFF,
      n: 'Liam O\'Flaherty lived from eighteen ninety-six to nineteen eighty-four. He came from the Aran Islands off the west coast of Ireland and wrote in both English and Irish. He is known for the novel The Informer and for many stories about animals and nature. This story is told in the third person, but it follows the young bird\'s feelings closely.',
    }),
    sl('diagram', 'The story in five stages', {
      b: 'Five stages, from fear to flight. (A SOYL summary, not the text.)',
      v: vStagesHFF,
      n: 'The story moves in five stages. First, the young seagull is alone and afraid on his ledge. Second, he spends a day hungry while his family mocks him. Third, his mother hovers near him with a piece of fish. Fourth, he dives, falls, and then flies. Fifth, he comes down on the sea and floats. Keep these stages in mind as a map.',
    }),
    sl('concept', 'Summary 1: alone and afraid', {
      b: 'A young seagull is alone on his ledge on a sea cliff. The day before, his two brothers and his sister made their first flights; even his sister, whose wings were shorter than his, managed it. Each time he ran to the edge, the drop to the sea frightened him and he was sure his wings would fail, so he went back. His parents scolded him and threatened to let him starve there.',
      n: 'In your own words, the story begins with loneliness. A young seagull is the only one of the young birds who has not flown. His brothers and sister flew the day before, even his sister with her shorter wings. He tried, but the drop to the sea frightened him, and he was sure his wings would fail. His parents scolded him and threatened to let him starve.',
    }),
    sl('concept', 'Summary 2: a day of hunger and mockery', {
      b: 'For a whole day nobody comes near him. He watches his parents teaching the others to fly over the water and catch fish, and sees his elder brother eat his first herring. All morning the family, on a plateau across the way, mocks his cowardice. He has eaten nothing since the previous evening. He even pretends to fall asleep to get attention, but only his mother watches him.',
      n: 'The second stage is a day of hunger. Nobody comes near him. He watches his parents train the other young birds, and sees his elder brother catch and eat his first herring. His family mocks him from across the way. He has not eaten since the evening before. He even pretends to fall asleep to get their attention, but only his mother keeps watching him.',
    }),
    sl('concept', 'Summary 3: the fish and the fall', {
      b: 'His mother is tearing at a piece of fish, and the sight makes him desperate. He cries to her for food. She picks up a piece of fish and flies towards him, but stops in mid-air just beyond his reach. Too hungry to think, he dives at the fish and falls off the ledge. For a moment he is terrified; then his wings spread and the air holds him up.',
      n: 'Now comes the turning point. His mother is eating a piece of fish, and the sight drives him wild with hunger. He begs her for food. She flies towards him with a piece of fish, but stops in mid-air just out of his reach. Without thinking, he dives at it and falls off the ledge. He is terrified for a moment, and then his wings open.',
    }),
    sl('concept', 'Summary 4: flight, and down on the sea', {
      b: 'His fear vanishes. He flies, swoops and calls out, and his parents, brothers and sister fly around him. Flying soon feels natural. Then, seeing his family settled on the sea, he tries to stand on the green water and panics when his legs sink. Too tired to rise, he discovers that he floats. His family gathers round, praising him and offering him food. He has made his first flight.',
      n: 'In the last stage, his fear disappears. He flies, swoops and calls out, and his family flies around him. Flying soon feels natural. Then he sees his family resting on the sea and tries to stand on the water, as if it were ground. His legs sink and he panics, but he floats. His family gathers round, praising and feeding him. He has made his first flight.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_hff',
      n: 'Your turn. Six events from the story are shuffled. Put them in the order in which they happen. Use the five stages as your guide: alone and afraid, hungry and mocked, the fish, the fall and flight, and the sea.',
    }),
    sl('two-column', 'Theme 1: fear and confidence', {
      b: 'The young gull\'s problem is not his wings but his belief in them.',
      cols: [
        '**Before the leap**\n\n- certain his wings will fail\n- retreats from the edge\n- alone, hungry and ashamed',
        '**After the leap**\n\n- fear gone in a moment\n- flies, swoops and calls out\n- even the sea becomes his home',
      ],
      n: 'The central theme is fear and confidence. Before the leap, the young gull is certain his wings will fail, so he retreats, and ends up alone, hungry and ashamed. After the leap, his fear is gone in a moment. He flies, swoops and calls out, and even the sea becomes his home. The story suggests that confidence comes from action, not from waiting.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemesHFF,
      n: 'Around fear and confidence sit other themes. Need as a teacher, because hunger succeeds where scolding fails. Family and tough love, because his family pushes and mocks him, then praises and feeds him. And growing up, because a dependent fledgling becomes a bird of both air and sea. In long answers, connect at least two of these themes to show depth.',
    }),
    sl('check', 'Check: what made him fly?', {
      chk: 'mc_hunger',
      n: 'Check yourself. What finally made the young seagull fly? Think about what the scolding could not do, and what his mother did instead.',
    }),
    sl('concept', 'Character: the young seagull', {
      b: 'Every trait in an answer needs an incident, described in your own words.',
      v: vSeagull,
      n: 'Let us sketch the young seagull. He is timid and lacks confidence, retreating from the edge though his wings are strong. He is lonely and ashamed during his day alone. He seeks attention, pretending to fall asleep. He is driven by need when hunger makes him dive. And once he flies, his confidence grows quickly. Notice that every trait is backed by an incident.',
    }),
    sl('two-column', 'The family: harsh or wise?', {
      cols: [
        '**Harsh**\n\n- they scold him and threaten starvation\n- they leave him alone and hungry for a day\n- they mock his fear',
        '**Wise**\n\n- comfort would keep him on the ledge\n- the mother uses hunger to make him leap\n- once he flies, they praise and feed him',
      ],
      n: 'A favourite exam debate: is the family cruel or wise? They do seem harsh. They scold him, threaten starvation, leave him hungry and mock his fear. But they may be wise. Comfort would only keep him on the ledge, and a seagull that cannot fly cannot survive. The mother\'s fish finally works, and afterwards they praise and feed him. Take a clear stand.',
    }),
    sl('check', 'Check: could he really fly?', {
      chk: 'ar_wings',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion. Think about his sister\'s wings.',
    }),
    sl('concept', 'Narrative technique and language', {
      bl: [
        '**Third-person narrator** who stays close to the young bird\'s feelings, so we share his fear.',
        '**Animals with human feelings:** shame, loneliness, pride and joy.',
        '**Sound words** for the birds\' cries.',
        '**Contrast:** a long, slow day of fear against one quick, thrilling moment of flight.',
        '**Gentle humour** at the end, when he tries to stand on the sea.',
      ],
      n: 'How does O\'Flaherty tell the story? A third-person narrator stays close to the young bird, so we feel his fear. The birds have human feelings like shame, pride and joy. Sound words imitate their cries. There is a strong contrast between a long, slow day of fear and one quick moment of flight. And the ending has gentle humour, when he tries to stand on water.',
    }),
    sl('example', 'Spotting devices: SOYL\'s own examples', {
      b: '**Onomatopoeia** uses words that imitate sounds; **personification** gives human qualities to an animal or thing. These sentences are SOYL\'s own:',
      bl: [
        '*The kettle hissed and spluttered on the stove.* — onomatopoeia',
        '*The old tree sighed as the wind pushed past it.* — personification',
        '*The puppy hung its head, ashamed of the torn cushion.* — an animal given human feelings',
      ],
      n: 'Here are three sentences of our own. The kettle hissed and spluttered: hissed and spluttered imitate sounds, so that is onomatopoeia. The old tree sighed: a tree cannot sigh, so that is personification. The puppy hung its head, ashamed: an animal is given a human feeling, as O\'Flaherty does with the young gull. Now find the sound words and feelings in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWordsHFF,
      n: 'These words from the story are worth learning. A ledge is a narrow shelf on a cliff, and the brink is the very edge. A plateau is flat high ground. A herring is a small sea fish. Preening is cleaning feathers with the beak. Upbraiding means scolding. Derisively means mockingly. And plaintively means in a sad, pleading way, like the young gull begging for food.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Five stages: alone and afraid → hungry and mocked → mother hovers with fish → fall, then flight → floating on the sea.',
        'The young seagull: timid, lonely, attention-seeking, driven by hunger, then confident.',
        'Themes: fear and self-doubt, confidence through action, need as a teacher, tough love, growing up.',
        'Facts often confused: two brothers and a sister; his sister\'s wings were shorter; it was his mother with the fish.',
        'Read the story in *First Flight*; write about it in your own words.',
      ],
      v: vStagesHFF,
      n: 'Let us sum up. The young seagull moves from fear on his ledge, through a day of hunger and mockery, to the moment his mother hovers with fish, then to the fall, flight and the sea. He grows from timid to confident. The themes are fear, confidence through action, need, tough love and growing up. Remember: read the story in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + incident + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with incidents → link to theme → conclusion.',
        'Do not call the mother cruel without explaining her purpose; do not say the wind or his father pushed him.',
        'Comparison questions with *The Black Aeroplane* are common: see Part 2.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, an incident and an explanation. In six mark answers, take a stand and support it with three incidents. Get the facts right: it was hunger and his mother\'s fish that made him fly, not the wind or a push. And prepare to compare this story with the second one.',
    }),
  ],
});

// ---------------------------------------------------------------- deck, Part 2
const D2 = deck({
  part: 2,
  title: 'Two Stories About Flying — Part 2: The Black Aeroplane (Frederick Forsyth) and comparing the stories',
  goals: [
    'Retell the events of *The Black Aeroplane* in sequence, in your own words',
    'Discuss the mystery of the black aeroplane and the narrator\'s experience',
    'Compare the young seagull\'s fear with the pilot\'s situation',
    'Answer extract-based, short and long questions, including comparisons',
  ],
  slides: [
    sl('title', 'Two Stories About Flying — Part 2: The Black Aeroplane', {
      b: `*First Flight*, prose · Part 2: *The Black Aeroplane* by Frederick Forsyth, and comparing the two stories.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Now we study The Black Aeroplane by the English writer Frederick Forsyth, and then compare it with His First Flight. Please read the story in your textbook, First Flight, before you continue. This lesson does not repeat the text. We will look at its events, its mystery, the pilot, and how the two flying stories mirror each other.',
    }),
    sl('concept', 'The author and the story', {
      v: vAuthorBA,
      n: 'Frederick Forsyth lived from nineteen thirty-eight to twenty twenty-five. He was a journalist and a famous writer of thrillers, such as The Day of the Jackal, and as a young man he trained as a pilot in the Royal Air Force. This story is very different from his thrillers: it is a short mystery told in the first person by a pilot flying an old Dakota at night.',
    }),
    sl('diagram', 'The story in six stages', {
      b: 'Six stages, from confidence to mystery. (A SOYL summary, not the text.)',
      v: vStagesBA,
      n: 'The story moves in six stages. A happy flight home. A storm ahead, and a risky choice. Being lost, with every instrument dead. A black aeroplane that leads the way. A safe landing. And finally a mystery: no other aeroplane appeared on the radar. Notice how the mood moves from confidence, to fear, to relief, and finally to wonder.',
    }),
    sl('concept', 'Summary 1: a happy flight and a risky choice', {
      b: 'The narrator is flying his old Dakota from France back to England at night, thinking happily of his holiday, his family and breakfast at home. After talking to Paris Control by radio, he sees enormous storm clouds ahead. He cannot get above them and does not have the fuel to go round them. The safe choice is to return to Paris, but he wants to get home, so he decides to take the risk and fly into the storm.',
      n: 'The story opens in high spirits. The pilot is flying his old Dakota home from France to England at night, dreaming of his holiday and breakfast with his family. Then he sees huge storm clouds ahead. He cannot fly over them, and he lacks the fuel to go round. He should turn back to Paris, but he wants to get home, so he flies straight in.',
    }),
    sl('concept', 'Summary 2: lost in the storm', {
      b: 'Inside the storm everything is dark. His compass stops working, and so do his other instruments. He tries the radio, but he cannot reach Paris Control. He is lost, and his fuel is running low; he has only minutes of flying left.',
      n: 'Inside the storm, everything turns black. His compass stops working, and so do his other instruments. He tries the radio, but he cannot reach Paris Control. Now he is completely lost, and his fuel is running low. A confident pilot has become helpless in a matter of minutes. This is the moment of greatest danger, and the story slows down to let us feel it.',
    }),
    sl('concept', 'Summary 3: the black aeroplane', {
      b: 'Then he sees another aeroplane beside him in the clouds. It is black and has no lights on its wings. Its pilot signals to him to follow, and he does, gratefully. The black aeroplane leads him down out of the cloud until he sees the two lines of lights of a runway. He lands safely, but when he looks for his guide, it has gone.',
      n: 'Just when all hope seems lost, he sees another aeroplane flying beside him. It is black, with no lights on its wings. Its pilot signals to him to follow, and he obeys gratefully. The black aeroplane leads him down out of the cloud until he sees the lights of a runway. He lands safely. But when he looks for his guide, the sky is empty.',
    }),
    sl('concept', 'Summary 4: the mystery', {
      b: 'In the control centre, he asks a woman about the other aeroplane. She tells him that no other aeroplane was flying that night; only his showed on the radar. The pilot is left wondering who guided him to safety without a compass, a radio or fuel to spare. The story ends on that question.',
      n: 'The ending turns relief into mystery. In the control centre, the pilot asks a woman about the black aeroplane. She tells him that no other aeroplane was flying that night; only his appeared on the radar. So who guided him to safety? The story ends with that question, and Forsyth gives no answer. Each reader has to decide.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_ba',
      n: 'Your turn. Six events from The Black Aeroplane are shuffled. Put them in order. Use the six stages as your guide: the happy flight, the storm, the dead instruments, the black aeroplane, the landing and the radar.',
    }),
    sl('two-column', 'Theme 1: risk and its consequences', {
      b: 'The danger in this story is partly the pilot\'s own making.',
      cols: [
        '**The choice**\n\n- the safe option: turn back to Paris\n- the risky option: fly into the storm\n- his reason: eagerness to get home',
        '**The consequences**\n\n- instruments and radio fail\n- lost, with fuel running out\n- saved only by a mysterious helper',
      ],
      n: 'One theme is risk and its consequences. The pilot knows the safe option, turning back to Paris, but chooses the risky one because he is eager to get home. The consequences are severe: his instruments and radio fail, he is lost, and his fuel runs low. He survives only because a mysterious helper appears. The story quietly warns against letting impatience override good judgement.',
    }),
    sl('concept', 'Theme 2: the mystery of the black aeroplane', {
      b: 'Forsyth never explains the black aeroplane. Weigh the possibilities:',
      v: vExplain,
      n: 'The second theme is mystery. Forsyth never explains the black aeroplane, so readers weigh possibilities. It might be a ghost or guardian angel, because it appears at the worst moment, has no lights and vanishes. It might be the pilot\'s imagination, though he really did reach a runway. Or it might be luck. In an exam, any reasoned view earns credit if you support it.',
    }),
    sl('check', 'Check: the kind of ending', {
      chk: 'mc_open_ending',
      n: 'Check yourself. The story ends with a question that is never answered. What do we call that kind of ending?',
    }),
    sl('concept', 'Character: the pilot', {
      b: 'Every trait in an answer needs an incident, described in your own words.',
      v: vPilot,
      n: 'Let us sketch the pilot. He is cheerful and family-loving, dreaming of breakfast at home. He is impatient and willing to take risks, flying into the storm. He is experienced but fallible, because he knows the safe choice and ignores it. When helpless, he is trusting, following a stranger. And at the end he is puzzled and thoughtful, asking who saved him.',
    }),
    sl('concept', 'Comparing the two stories', {
      v: vCompare,
      n: 'Now let us compare the two stories. The seagull is a beginner; the pilot is experienced. The seagull\'s problem is inner fear; the pilot\'s is an outer danger he chose. The seagull\'s helper is his mother; the pilot\'s is a mystery. One ends in joy, the other in an unsolved question. And one has a third-person narrator, the other a first-person narrator.',
    }),
    sl('two-column', 'What each flier needed', {
      cols: [
        '**The young seagull needed courage**\n\n- he already had the ability\n- hunger pushed him past his fear\n- one leap changed everything',
        '**The pilot needed rescue and humility**\n\n- his skill was useless without instruments\n- his own impatience put him in danger\n- he had to trust a stranger',
      ],
      n: 'What did each flier need? The young seagull needed courage. He already had the ability, and hunger finally pushed him past his fear. The pilot needed rescue, and perhaps humility. His skill was useless without instruments, his own impatience had put him in danger, and he had to trust a stranger completely. Use this contrast in comparison answers.',
    }),
    sl('check', 'Check: comparing the problems', {
      chk: 'mc_compare',
      n: 'Try this. How is the seagull\'s problem different from the pilot\'s? Think about where each problem comes from: inside the flier, or outside.',
    }),
    sl('concept', 'Narrative technique and language', {
      bl: [
        '**First-person narrator:** we know only what the pilot knows, so we share his confusion.',
        '**Short, plain sentences** in the storm build tension.',
        '**Suspense:** dead instruments, low fuel and a stranger with no lights.',
        '**An open ending:** a question the reader must answer.',
        '**Contrast of mood:** cheerful → frightened → relieved → puzzled.',
      ],
      n: 'How does Forsyth tell the story? The pilot narrates in the first person, so we know only what he knows and share his confusion. In the storm, short plain sentences build tension. Suspense grows through dead instruments, low fuel and a stranger with no lights. The ending is open. And the mood moves from cheerful, to frightened, to relieved, to puzzled.',
    }),
    sl('example', 'Building suspense: SOYL\'s own examples', {
      b: 'Short sentences speed up the reader and build tension; an open ending leaves a question unanswered. These lines are SOYL\'s own:',
      bl: [
        '*The lights went out. The lift stopped. Nobody spoke.* — short sentences for tension',
        '*When she turned round, the stranger on the bench was gone, and the snow showed no footprints.* — an open, mysterious ending',
        '*The phone rang at midnight, though nobody had the number.* — a puzzling detail that builds suspense',
      ],
      n: 'Here are some lines of our own. The lights went out. The lift stopped. Nobody spoke. Three short sentences, and the tension rises. When she turned round, the stranger was gone, and the snow showed no footprints. That is an open, mysterious ending. Forsyth uses both techniques. Look for his short sentences in the storm when you read the story in your textbook.',
    }),
    sl('concept', 'Words to know', {
      v: vWordsBA,
      n: 'Some flying words help with this story. A Dakota is an old twin-engine propeller aeroplane, first built in the nineteen thirties. A compass shows direction, and instruments are the dials a pilot depends on. The control centre guides aircraft from the ground. Radar detects aircraft with radio waves. A runway is the strip where planes land. And fuel, of course, is what keeps the engines running.',
    }),
    sl('example', 'Worked example: planning a 6-mark comparison', {
      b: '*Question:* *Both stories show that help can come when we least expect it.* Compare them.',
      v: vLongPlan,
      bl: [
        '**Shared idea:** a flier in danger is saved by a helper.',
        '**Story 1:** the mother hovers with fish; hunger makes the gull leap and fly.',
        '**Story 2:** a black aeroplane leads the lost pilot to a runway.',
        '**Key difference:** the mother is known and natural; the black aeroplane is never explained.',
        '**Conclusion:** both fliers learn they cannot do everything alone.',
      ],
      n: 'Here is how to plan a comparison answer. State the shared idea: a flier in danger is saved by a helper. Give one incident from each story: the mother\'s fish, and the black aeroplane\'s guidance. Then name the key difference: one helper is known, the other a mystery. End with a one-line conclusion. That plan becomes about one hundred and fifteen words.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Six stages: happy flight → storm and risky choice → lost, instruments dead → black aeroplane leads → safe landing → no other plane on radar.',
        'The pilot: cheerful, impatient, experienced but fallible, trusting, puzzled.',
        'Themes: risk and consequences; mystery and the unexplained; help in danger.',
        'Comparison: inner fear vs outer danger; known helper vs mysterious helper.',
        'Read both stories in *First Flight*; write about them in your own words.',
      ],
      v: vCompare,
      n: 'Let us sum up. The pilot flies happily, takes a risk, loses his instruments, follows a black aeroplane to safety, and learns that no other plane was flying. He is cheerful but impatient, and finally puzzled. The themes are risk, mystery and help in danger. Compared with the seagull, his problem was outer, not inner. Read both stories in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + incident + explanation.',
        'Mystery questions: give a clear view and support it with details (timing, no lights, vanishing, radar).',
        'Facts often confused: he flew from France to England; he could have returned to Paris; only his plane was on the radar.',
        'Comparison answers: shared idea, one incident from each story, the key difference, a conclusion.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. For the mystery, take a clear view and support it with details like the missing lights and the radar. Get the facts right: he was flying from France to England, he could have turned back to Paris, and only his plane was on the radar. In comparisons, always name the key difference.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Two Stories About Flying — study notes',
  sections: [
    {
      h: '1. About the chapter and the authors',
      t: 1,
      b: `${READ}\n\nThe chapter has two short stories about flying.\n\n**Part I, *His First Flight*,** is by **Liam O\'Flaherty** (1896–1984), an Irish novelist and short-story writer from the Aran Islands who wrote in English and in Irish, known for *The Informer* (1925) and for stories about animals and nature. It is told by a third-person narrator.\n\n**Part II, *The Black Aeroplane*,** is by **Frederick Forsyth** (1938–2025), an English novelist and former journalist who trained as a pilot in the Royal Air Force, best known for thrillers such as *The Day of the Jackal* (1971). It is told in the first person by a pilot.`,
      vs: [vAuthorHFF, vAuthorBA],
    },
    {
      h: '2. Part I: His First Flight — summary (in SOYL\'s words)',
      t: 1,
      b: '**Alone and afraid.** A young seagull is alone on his ledge. His two brothers and his sister flew the day before; even his sister, with shorter wings, managed it. The drop to the sea frightened him and he was sure his wings would fail. His parents scolded him and threatened to let him starve.\n\n**Hunger and mockery.** For a day nobody comes near him. He watches his family train over the water and his elder brother eat his first herring; the family mocks him. He has not eaten since the previous evening. He pretends to fall asleep, but only his mother watches.\n\n**The fish and the fall.** He begs for food. His mother flies towards him with a piece of fish but stops just beyond his reach. Desperate with hunger, he dives at it, falls, is terrified for a moment, and then his wings spread and he flies.\n\n**The sea.** He flies with his family, then tries to stand on the sea and panics when his legs sink. Too tired to rise, he finds he floats. His family praises him and feeds him.',
      v: vStagesHFF,
    },
    {
      h: '3. Part I: themes and characters',
      t: 2,
      b: '- **Fear and self-doubt:** he can fly but believes he cannot.\n- **Confidence through action:** one leap turns terror into joy.\n- **Need as a teacher:** hunger succeeds where scolding fails.\n- **Family and tough love:** they push and mock, then praise and feed him.\n- **Growing up:** a fledgling becomes independent.\n\n**The young seagull:** timid, lonely, attention-seeking, driven by need, then quickly confident. **His mother:** harsh but wise; her fish ends his fear. **The family:** mocking but supportive once he flies.\n\n**Message:** fear often exaggerates difficulty; the ability may already be there, waiting for one brave step.',
      vs: [vThemesHFF, vSeagull],
      terms: [['Fledgling', 'A young bird that has just grown the feathers it needs to fly.']],
    },
    {
      h: '4. Part II: The Black Aeroplane — summary (in SOYL\'s words)',
      t: 1,
      b: '**A risky choice.** The narrator flies his old Dakota from France to England at night, happily thinking of his holiday and breakfast with his family. He sees huge storm clouds; he cannot go above them or round them. The safe choice is to return to Paris, but he wants to get home and flies into the storm.\n\n**Lost.** Inside, everything is dark. His compass and other instruments fail and the radio cannot reach Paris Control. His fuel is low.\n\n**The guide.** A black aeroplane with no lights on its wings appears beside him; its pilot signals him to follow. It leads him down until he sees runway lights. He lands safely; the black aeroplane has vanished.\n\n**The mystery.** A woman in the control centre tells him no other aeroplane was flying that night; only his was on the radar. Who helped him remains unanswered.',
      v: vStagesBA,
    },
    {
      h: '5. Part II: themes, the pilot and the mystery',
      t: 2,
      b: '- **Risk and consequences:** impatience leads him into danger.\n- **Mystery and the unexplained:** the black aeroplane is never explained.\n- **Help in danger:** rescue comes from an unexpected source.\n- **Humility:** an expert learns he cannot always save himself.\n\n**The pilot:** cheerful and family-loving; impatient and risk-taking; experienced but fallible; trusting when helpless; puzzled at the end.\n\n**Explanations readers offer:** a ghost or guardian angel; the pilot\'s imagination under stress; luck. The open ending makes any reasoned view acceptable.',
      vs: [vPilot, vExplain],
      terms: [['Open ending', 'An ending that leaves the central question unanswered for the reader to decide.']],
    },
    {
      h: '6. Comparing the two stories',
      t: 3,
      b: '**Similar:** both are about flying, fear and help; both fliers face terror and end safely.\n\n**Different:** the seagull is a beginner, the pilot an expert; the seagull\'s problem is inner fear, the pilot\'s an outer danger he chose; the seagull\'s helper (his mother) is known and natural, the pilot\'s is a mystery; the seagull needs courage, the pilot needs rescue and humility; third-person narration versus first-person narration; a joyful ending versus an unsolved one.',
      v: vCompare,
    },
    {
      h: '7. Language and word meanings',
      t: 1,
      b: '**Part I:** animals given human feelings; sound words for the birds\' cries; contrast between a slow day of fear and a quick moment of flight; gentle humour at the end.\n\n**Part II:** first-person narration; short, plain sentences in the storm; suspense; an open ending.\n\nSOYL practice sentences (not from the stories): *The kettle hissed and spluttered on the stove* (onomatopoeia); *The lights went out. The lift stopped. Nobody spoke.* (short sentences for tension).',
      vs: [vWordsHFF, vWordsBA],
      terms: [
        ['Onomatopoeia', 'A word that imitates the sound it describes.'],
        ['Personification', 'Giving human qualities to an animal, object or idea.'],
        ['Suspense', 'Anxious uncertainty about what will happen next.'],
      ],
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints a passage from a story; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the story.\n\n**Short answers (3 marks, 40–50 words):** point + incident + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with incidents in your own words; a link to a theme; a conclusion. For comparisons: the shared idea, one incident from each story, the key difference, a conclusion. Extrapolation tasks (the seagull\'s diary, the pilot\'s letter) must stay consistent with the story.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant incidents, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Saying the wind or his father pushed the seagull: hunger and his mother\'s fish made him leap.\n2. Forgetting that his sister\'s wings were shorter than his: proof that he could fly.\n3. Saying Paris Control told the pilot to enter the storm: it was his own choice.\n4. Saying the woman saw the black aeroplane on the radar: only his plane appeared.\n5. Retelling a story instead of answering the question asked.\n\n**Remember:** read both stories in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *His First Flight*?', 'Liam O\'Flaherty (1896–1984), an Irish writer.', 'fact', 1],
  ['Who wrote *The Black Aeroplane*?', 'Frederick Forsyth (1938–2025), an English novelist.', 'fact', 1],
  ['Who had flown before the young seagull?', 'His two brothers and his sister, the day before.', 'fact', 1],
  ['Why did the young seagull not fly at first?', 'He was sure his wings would not support him over the long drop.', 'concept', 3],
  ['What did his parents threaten?', 'To let him starve on the ledge unless he flew.', 'fact', 1],
  ['What did his elder brother catch?', 'His first herring.', 'fact', 1],
  ['When had the young gull last eaten?', 'The previous evening (nightfall).', 'fact', 1],
  ['How did he try to attract attention?', 'He pretended to fall asleep; only his mother watched.', 'fact', 1],
  ['What did his mother do with the fish?', 'Flew towards him and stopped just beyond his reach.', 'fact', 1],
  ['What finally made him fly?', 'Hunger: he dived at the fish and his wings opened.', 'concept', 2],
  ['Why did he panic on the sea?', 'He tried to stand on it and his legs sank; then he found he floated.', 'fact', 1],
  ['Main theme of *His First Flight*', 'Overcoming fear; confidence comes through action.', 'concept', 2],
  ['Proof that the gull could fly', 'His sister had shorter wings and still flew.', 'concept', 3],
  ['What was the narrator of *The Black Aeroplane* flying?', 'An old Dakota, from France to England, at night.', 'fact', 1],
  ['Why did the pilot enter the storm?', 'He wanted to get home for his holiday and breakfast with his family.', 'concept', 3],
  ['What was the safe choice he rejected?', 'Turning back to Paris.', 'fact', 1],
  ['What failed inside the storm?', 'His compass, his other instruments and his radio.', 'fact', 1],
  ['What was strange about the black aeroplane?', 'It had no lights on its wings, and it vanished after guiding him.', 'fact', 1],
  ['What did the woman in the control centre say?', 'No other aeroplane was flying; only his was on the radar.', 'fact', 1],
  ['Type of ending in *The Black Aeroplane*', 'Open ending: the mystery is never explained.', 'concept', 2],
  ['Point of view of each story', '*His First Flight*: third person. *The Black Aeroplane*: first person.', 'concept', 2],
  ['Three traits of the pilot', 'Impatient (risk-taking), experienced but fallible, trusting when helpless.', 'concept', 3],
  ['Seagull vs pilot: the key difference', 'Inner fear of something he can do vs outer danger he chose.', 'concept', 3],
  ['Helpers in the two stories', 'The mother (known, natural) vs the black aeroplane (mysterious).', 'concept', 3],
  ['What each flier needed', 'The seagull: courage. The pilot: rescue and humility.', 'concept', 3],
  ['*plaintively*', 'in a sad, pleading way', 'definition', 1],
  ['*derisively*', 'in a mocking way', 'definition', 1],
  ['*radar*', 'a system that detects aircraft using radio waves', 'definition', 1],
  ['Plan for a 6-mark comparison', 'Shared idea → incident from each story → key difference → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slips', 'Saying his father pushed the gull; saying the woman saw the black plane on radar.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Two Stories About Flying',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the stories in First Flight.)', items: ['src_trick'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_why_afraid', 'sa_hunger', 'sa_helpless', 'sa_radar'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_seagull', 'la_reckless'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Two Stories About Flying',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_alone', 'src_risk'] }, { attempt: 1, keys: ['src_sea', 'src_guide'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_pretend', 'sb_landing', 'sb_journey', 'sb_runway'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_parents', 'sa_fall', 'sa_take_risk', 'sa_follow', 'sa_compare_fear'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_mother', 'la_mystery'] }, { attempt: 1, keys: ['la_compare', 'la_seagull_diary'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D1, D2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 only; no removed topics for 2026-27; both parts covered (Part 1 deck: His First Flight; Part 2 deck: The Black Aeroplane and the comparison)',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of either story; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on both title slides, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the stories\' events',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
