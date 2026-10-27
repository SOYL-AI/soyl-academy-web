// Build CBSE 10 English Language and Literature ch09 "Mijbil the Otter" (Gavin Maxwell). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch09/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the text is never
// quoted or closely paraphrased. Students read the chapter in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch09', 'english-literature');
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
  ['About the text', ''],
  [
    ['Author', 'Gavin Maxwell (1914–1969), Scottish naturalist and writer'],
    ['Source', 'his book *Ring of Bright Water* (1960), about life with otters at his remote home in the West Highlands of Scotland'],
    ['Genre', 'non-fiction: a true, first-person account of an animal and its owner'],
    ['Setting', 'southern Iraq (the Tigris marshes and Basra), the journey via Paris, and London'],
    ['Main characters', 'Mijbil (Mij), a young otter; Maxwell, the narrator'],
  ],
  'Table of facts: the author is Gavin Maxwell, 1914 to 1969, a Scottish naturalist; the chapter comes from his 1960 book Ring of Bright Water; it is a true first-person account; it is set in southern Iraq, on the journey via Paris, and in London; the main characters are the otter Mij and Maxwell.',
);
const vStages = flow('LR', ['The wish for an otter', 'Mij arrives at Basra', 'First days: trust and water', 'Play and personality', 'The box and the flight', 'London and a new kind of otter'], 'Flow of the chapter in six stages: the wish for an otter; Mij arrives at Basra; first days of trust and water; play and personality; the box and the flight; London and a new kind of otter.', 'The chapter in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Bond between human and animal', 'Distance on day one becomes closeness and companionship.'],
    ['Patience and care', 'Maxwell lets trust come in its own time and watches every need.'],
    ['Respect for an animal\'s nature', 'Water delights Mij; confinement torments him.'],
    ['Responsibility', 'Owning a wild creature brings trouble, cost and duty.'],
    ['Humour', 'Chaos in the cabin and puzzled Londoners.'],
    ['Curiosity and discovery', 'Mij\'s kind of otter turns out to be new to science.'],
  ],
  'Table of six themes with where each appears: the bond between human and animal, patience and care, respect for an animal\'s nature, responsibility, humour, and curiosity and discovery.',
);
const vMij = table(
  ['Mij\'s trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Cautious at first', 'Keeps away from Maxwell for his whole first day.'],
    ['Affectionate', 'From the second night sleeps beside his owner.'],
    ['Playful and inventive', 'Long games with a ball and marbles; makes up his own games.'],
    ['Intelligent', 'Works out how to turn on the bath tap by himself.'],
    ['Water-loving', 'Overjoyed by the bathtub.'],
    ['Wild and freedom-loving', 'Fights the travelling box until he is hurt.'],
  ],
  'Table of Mij\'s traits with evidence: cautious at first, affectionate, playful and inventive, intelligent, water-loving, and wild and freedom-loving.',
);
const vMaxwell = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['Maxwell', 'Patient, observant, affectionate, honest about his mistakes, able to laugh at himself'],
    ['The friend', 'Suggests the Tigris marshes and sends Mij to Maxwell'],
    ['The air hostess', 'Calm and kind in a crisis; helps Maxwell and lets him keep Mij close'],
    ['Passengers and Londoners', 'Alarmed or puzzled by an animal they cannot identify'],
  ],
  'Table of the human characters: Maxwell is patient, observant, affectionate and honest; the friend suggests the marshes and sends the otter; the air hostess is calm and kind; passengers and Londoners are alarmed or puzzled.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['otter', 'a fish-eating mammal that lives in and near water'],
    ['marsh', 'low, wet, waterlogged land'],
    ['aloof', 'distant; not friendly or involved'],
    ['zoologist', 'a scientist who studies animals'],
    ['confinement', 'being shut in a small space'],
    ['remorse', 'deep regret for a wrong one has done'],
    ['naturalist', 'an expert on plants and animals'],
    ['species / race', 'a distinct group of animals of one kind'],
  ],
  'Table of word meanings: otter, marsh, aloof, zoologist, confinement, remorse, naturalist, and species or race.',
  'Key words for this chapter with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Mijbil the Otter',
  goals: [
    'Retell how Maxwell got Mij and what happened on the way to London, in your own words',
    'Explain the bond between Maxwell and Mij and how it grows',
    'Describe Mij\'s behaviour and Maxwell\'s responses with evidence',
    'Discuss the responsibility of keeping a wild animal',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Mijbil the Otter — Gavin Maxwell', {
      b: `*First Flight*, prose · true account · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study Mijbil the Otter, a true story by the naturalist Gavin Maxwell about a young otter he brought home from Iraq. Please read the chapter itself in your textbook, First Flight, before you go on. This lesson does not repeat the text. Instead we will understand its events, its humour, the bond between man and animal, and how to answer board questions.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *First Flight*, straight through.',
        'Use these slides for the sequence of events, the themes and the two main characters.',
        'Explain events **in your own words**; do not memorise lines.',
        'Practise the extract questions, which use SOYL commentary on the chapter.',
      ],
      n: 'Here is how to use this lesson. Read the chapter in your textbook first. Then use these slides for the order of events, the themes, and the characters of Mij and Maxwell. In answers, explain what happens in your own words, because examiners reward understanding. Finally, practise with our extract questions, which are based on commentary written by SOYL.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'Gavin Maxwell was a Scottish naturalist and writer who lived from nineteen fourteen to nineteen sixty-nine. This chapter comes from his best-known book, Ring of Bright Water, published in nineteen sixty, about his life with otters in a remote corner of Scotland. It is a true story told in the first person, so we see everything through Maxwell\'s eyes.',
    }),
    sl('diagram', 'The chapter in six stages', {
      b: 'A journey in place (Iraq → Paris → London) and a journey in trust. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The chapter moves through six stages. Maxwell wishes for an otter. An otter arrives at Basra. In the first days, trust grows and Mij discovers water. We see his play and personality. Then comes the difficult journey, with the box and the flight. Finally, Mij lives in London, where he turns out to be a new kind of otter. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: the wish and the arrival', {
      b: 'Maxwell had decided that an otter would suit his Scottish home, which had water all around it. On a journey to southern Iraq, a friend told him that otters were plentiful in the Tigris marshes. While Maxwell was at Basra, two Arab men brought a young otter to his room in a sack: a gift from that friend. Maxwell named the otter Mijbil, Mij for short.',
      n: 'Maxwell wanted an otter because his home in Scotland was surrounded by water. While he was travelling in southern Iraq, a friend told him that the Tigris marshes were full of otters. At Basra, two men turned up at his room with a sack, and inside was a young otter sent by that friend. Maxwell named him Mijbil, or Mij for short.',
    }),
    sl('concept', 'Summary 2: the first days', {
      b: 'For his first day Mij kept away from Maxwell and slept on the floor. On the second night he climbed onto the bed and slept beside him. In the bathroom he discovered water and was overjoyed, splashing and rolling in the tub, and he soon learnt to turn on the tap by himself.',
      n: 'At first Mij was cautious. For a whole day he kept away from Maxwell and slept on the floor. Maxwell did not force him. On the second night, Mij climbed onto the bed and slept beside his new owner. Then he discovered the bathtub and was overjoyed by the water. Before long he had even learnt to turn on the tap by himself.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_mij',
      n: 'Your turn. Six episodes from Maxwell\'s account are shuffled. Put them in the order in which they happen, from the friend\'s advice to the walks in London.',
    }),
    sl('concept', 'Summary 3: play and personality', {
      b: 'Mij spent long stretches playing with a rubber ball and marbles. He could keep small objects moving from paw to paw like a juggler, and he invented games of his own. Maxwell describes these games closely and fondly.',
      n: 'Mij was a born player. He spent hours with a rubber ball and marbles, and he could pass little objects from paw to paw like a juggler. He did not wait to be entertained; he made up his own games. Maxwell describes all of this in loving detail, and that is why Mij comes alive for the reader as a real personality.',
    }),
    sl('concept', 'Summary 4: the box and the flight', {
      b: 'The British airline would not carry animals, so Maxwell had to fly via Paris, with Mij in a small box at his feet. Left in the box before the journey, Mij fought to escape, tore up its lining and hurt himself. On the aeroplane he got loose; passengers panicked and one woman took him for a rat. A kind air hostess helped Maxwell and let him keep Mij close for the rest of the flight.',
      n: 'Then came the journey to England. No British airline would carry animals, so Maxwell flew via Paris, with Mij in a small box at his feet. Left in the box before the flight, Mij fought to get out and hurt himself. On the aeroplane he escaped, and the passengers panicked; one woman thought he was a rat. A calm, kind air hostess helped Maxwell.',
    }),
    sl('concept', 'Summary 5: London and a new kind of otter', {
      b: 'In London Maxwell walked Mij on a lead like a dog. Passers-by could not tell what he was and made wild guesses. In fact zoologists later decided that Mij belonged to a kind of otter never described before, and named it after Maxwell: Maxwell\'s otter.',
      n: 'In London, Maxwell took Mij for walks on a lead, just as you might walk a dog. People stopped and stared, and their guesses about what he was were often absurd. The joke had a serious side. Zoologists later decided that Mij belonged to a kind of otter nobody had described before, and they named it after Maxwell.',
    }),
    sl('two-column', 'Theme 1: the bond between man and otter', {
      b: 'The bond is earned, not given.',
      cols: [
        '**What Maxwell gives**\n\n- time and patience on the first day\n- close attention to Mij\'s needs and games\n- tolerance of mess and embarrassment',
        '**What Mij gives back**\n\n- trust from the second night\n- open, joyful play in front of him\n- companionship on walks in London',
      ],
      n: 'The central theme is the bond between a human and an animal, and it is earned. Maxwell gives time, patience and attention, and he puts up with mess and embarrassment. Mij gives back trust, joyful play and companionship. In answers, show that the bond grows step by step, from distance on the first day to friendship in London.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around the bond sit other themes. Patience and care, in the way Maxwell lets trust come slowly. Respect for an animal\'s nature, because water delights Mij and confinement torments him. Responsibility, because a wild pet brings trouble as well as joy. Humour, in the cabin chaos and the puzzled Londoners. And discovery, because Mij turned out to be new to science.',
    }),
    sl('check', 'Check: Maxwell\'s method today', {
      chk: 'mc_apply_pet',
      n: 'Check yourself. A family adopts a nervous rescue dog. Which of their choices follows the approach Maxwell took with Mij on that first, cautious day?',
    }),
    sl('concept', 'Character: Mij', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vMij,
      n: 'Let us sketch Mij. He is cautious at first, then deeply affectionate. He is playful and inventive, and intelligent enough to work out the bath tap. He loves water above all. And he has a wild, freedom-loving nature, which shows painfully in the episode of the box. Remember to back every trait with a specific moment from the chapter.',
    }),
    sl('concept', 'Character: Maxwell and the others', {
      v: vMaxwell,
      n: 'Maxwell is patient, observant and affectionate. He is also honest: he admits that shutting Mij in the box was a mistake, and he laughs at his own embarrassment on the aeroplane. The friend sets the story going. The air hostess shows calm kindness in a crisis. And the passengers and Londoners show how strange Mij seemed to ordinary people.',
    }),
    sl('two-column', 'Should wild animals be pets?', {
      cols: [
        '**A case for Maxwell**\n\n- he gave Mij devoted care and attention\n- the bond enriched both their lives\n- his account helped science and readers understand otters',
        '**A case against**\n\n- Mij suffered badly when shut in the box\n- a city flat cannot replace a marsh\n- strangers panicked or could not even identify him',
      ],
      n: 'A common long question asks whether wild animals should be kept as pets. One side says Maxwell gave Mij devoted care, the bond enriched both lives, and his writing helped people understand otters. The other side points to Mij\'s suffering in the box and asks whether a city can ever replace a marsh. Take a clear stand, but show you see the other side.',
    }),
    sl('check', 'Check: Mij in the bathroom', {
      chk: 'ar_bath',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and narrative technique', {
      bl: [
        '**First-person, true account:** we share Maxwell\'s delight, worry and guilt directly.',
        '**Close observation:** a naturalist\'s eye for small details of behaviour.',
        '**Humour:** chaos and embarrassment told lightly.',
        '**Honesty:** the writer admits his own mistakes.',
        '**Episodic structure:** a chain of small adventures from Basra to London.',
      ],
      n: 'How does Maxwell write? He tells a true story in the first person, so we share his feelings. He observes like a naturalist, noticing small details of behaviour. He uses gentle humour, especially when things go wrong. He is honest about his mistakes. And the chapter is built as a chain of small adventures, from Basra to Paris to London.',
    }),
    sl('example', 'Humour and observation: SOYL\'s own examples', {
      b: 'Practise spotting the two techniques Maxwell relies on. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*The kitten studied the moving shoelace for a full minute, then pounced as if it had planned the attack for weeks.* — close observation with gentle humour',
        '*By the time we caught the puppy, three chairs, one teacher and my dignity had all been knocked over.* — comic exaggeration',
        '*The parrot listened politely to my lecture and then repeated only the rude word.* — humour from an animal\'s point of view',
      ],
      n: 'Here are three sentences of our own. A kitten studies a shoelace and then pounces as if it had planned the attack for weeks: close observation with humour. Three chairs, one teacher and my dignity were knocked over: comic exaggeration. A parrot repeats only the rude word: humour from the animal\'s side. Now find Maxwell\'s own moments of humour in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the chapter. An otter is a fish-eating mammal of rivers and coasts. A marsh is low, wet land. Aloof means distant. A zoologist studies animals, and a naturalist is an expert on nature. Confinement means being shut in. Remorse is deep regret. And a species, or race, is a distinct kind of animal.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Maxwell was a responsible and caring owner.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** mostly agree, with one reservation.',
        '**Points + evidence:** lets Mij keep his distance on day one; watches and enjoys every game; puts up with mess and public embarrassment.',
        '**Reservation:** the box episode was a painful misjudgement, which he admits.',
        '**Link + conclusion:** care means respecting an animal\'s nature, a lesson Maxwell learns on the journey.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: mostly agree. Give three points with evidence: he was patient on the first day, attentive to Mij\'s games, and tolerant of mess and embarrassment. Add a reservation: the box was a mistake, though he admits it. Link to the theme of respecting an animal\'s nature, and finish with one clear line.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Maxwell wanted an otter for his Scottish home by the water; a friend sent him one at Basra.',
        'Trust grew from distance on day one to sleeping beside him on night two; Mij loved water and play.',
        'The journey: no British airline would carry animals; the box; the escape in the cabin; a kind air hostess.',
        'London: walks on a lead, puzzled passers-by, and a kind of otter new to science named after Maxwell.',
        'Read the chapter in *First Flight*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. Maxwell got Mij at Basra, a gift from a friend. Trust grew quickly, and Mij revealed a playful, clever, water-loving nature. The journey to England tested them both, with the box and the escape on the aeroplane. In London, Mij puzzled everyone and turned out to be new to science. Read the chapter in your textbook, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + evidence + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with evidence → link to theme → conclusion.',
        'Facts often confused: the otter came at Basra, not in the marshes themselves; the route was via Paris; trust came on the second night, not the first.',
        'For character questions, pair each trait of Mij or Maxwell with a specific episode.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right: Mij reached Maxwell at Basra, the flight went via Paris, and trust came on the second night. And always pair a trait with an episode.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Mijbil the Otter — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**Gavin Maxwell** (1914–1969) was a Scottish naturalist and writer. The chapter is an extract from his book *Ring of Bright Water* (1960), which describes his life with otters at a remote house in the West Highlands of Scotland. It is non-fiction, told in the first person, so the events are seen through Maxwell's eyes.`,
      v: vAuthor,
      terms: [['Naturalist', 'An expert who studies plants and animals, often in the wild.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The wish.** Maxwell had decided to keep an otter, because his Scottish home was surrounded by water. Travelling in southern Iraq, he heard from a friend that otters were plentiful in the Tigris marshes.\n\n**The arrival.** At Basra two Arab men delivered a young otter to Maxwell\'s room in a sack, sent by that friend. Maxwell named him Mijbil (Mij).\n\n**The first days.** Mij kept away from Maxwell for a day, then slept beside him from the second night. He was overjoyed by the bathtub and soon learnt to turn on the tap.\n\n**Play.** He played for hours with a ball and marbles, kept small objects moving from paw to paw, and invented his own games.\n\n**The journey.** No British airline would carry animals, so Maxwell flew via Paris, with Mij in a small box at his feet. Left in the box beforehand, Mij tore its lining and hurt himself. On the aeroplane he escaped, causing panic; one woman thought he was a rat. A kind air hostess helped Maxwell.\n\n**London.** Maxwell walked Mij on a lead; Londoners could not identify him. Zoologists later decided his kind of otter had never been described and named it after Maxwell.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **The bond between human and animal:** distance becomes trust, then companionship.\n- **Patience and care:** Maxwell lets trust come in its own time.\n- **Respect for an animal\'s nature:** water delights Mij; confinement torments him.\n- **Responsibility:** a wild pet brings duty, cost and embarrassment as well as joy.\n- **Humour:** mishaps told lightly.\n- **Curiosity and discovery:** Mij\'s kind of otter is new to science.\n\n**Message:** a bond with an animal is earned through patience and care, and true care respects the animal\'s nature.',
      v: vThemes,
      terms: [['Companionship', 'A close, friendly relationship of spending time together.']],
    },
    {
      h: '4. Mij: character and behaviour',
      t: 3,
      b: '**Cautious** at first (keeps away for a day). **Affectionate** once he trusts (sleeps beside Maxwell). **Playful and inventive** (ball, marbles, his own games). **Intelligent** (works out the tap). **Water-loving** (overjoyed by the bath). **Wild and freedom-loving** (fights the box until he is hurt).\n\nIn answers, pair each trait with a specific episode.',
      v: vMij,
    },
    {
      h: '5. Maxwell and the other characters',
      t: 3,
      b: '**Maxwell** is patient, observant and affectionate. He accepts mess and embarrassment for Mij\'s sake, and he is honest about his mistake with the box. **The friend** suggests the marshes and sends Mij. **The air hostess** is calm and kind in a crisis. **Passengers and Londoners** are alarmed or puzzled by an unfamiliar animal.',
      v: vMaxwell,
    },
    {
      h: '6. Style and narrative technique',
      t: 2,
      b: '- **First-person true account:** feelings are shared directly.\n- **Close observation:** a naturalist\'s eye for detail.\n- **Humour:** chaos and embarrassment told lightly.\n- **Honesty:** the writer admits mistakes.\n- **Episodic structure:** a chain of small adventures (Basra, Paris, London).\n\nSOYL practice sentence (not from the chapter): *By the time we caught the puppy, three chairs, one teacher and my dignity had all been knocked over* (comic exaggeration).',
      terms: [['Anecdote', 'A short, often amusing account of a real incident.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the chapter: otter, marsh, aloof, zoologist, naturalist, confinement, remorse, species. Use them in your own sentences, for example: *Mij\'s confinement in the box caused him great distress.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**Extract-based (5 marks):** the board prints a passage from the chapter; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the chapter.\n\n**Short answers (3 marks, 40–50 words):** point + evidence + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with evidence in your own words; a link to a theme; a one-line conclusion. Extrapolation tasks (a diary entry by the air hostess, a letter from Maxwell to his friend) must stay consistent with the chapter.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Maxwell caught Mij himself in the marshes: the otter was delivered to him at Basra.\n2. Saying Mij was friendly from the start: he kept his distance for his first day.\n3. Forgetting why the flight went via Paris: the British airline would not carry animals.\n4. Treating the box episode as Mij\'s naughtiness rather than a wild animal\'s panic.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Mijbil the Otter*?', 'Gavin Maxwell (1914–1969), a Scottish naturalist.', 'fact', 1],
  ['From which book is the chapter taken?', '*Ring of Bright Water* (1960).', 'fact', 1],
  ['Why did Maxwell want an otter?', 'His Scottish home had water all around it, ideal for an otter.', 'concept', 1],
  ['Who suggested the Tigris marshes?', 'A friend travelling with Maxwell in southern Iraq.', 'fact', 1],
  ['Where did Mij reach Maxwell?', 'At Basra, delivered in a sack by two Arab men.', 'fact', 1],
  ['Who sent Mij?', 'Maxwell\'s friend.', 'fact', 1],
  ['How did Mij behave on his first day?', 'He kept his distance and slept on the floor.', 'fact', 3],
  ['What changed on the second night?', 'Mij climbed onto the bed and slept beside Maxwell.', 'fact', 3],
  ['How did Mij react to the bathtub?', 'He was overjoyed, splashing and rolling in the water.', 'fact', 3],
  ['What skill did Mij teach himself?', 'Turning on the bath tap.', 'fact', 3],
  ['Mij\'s favourite toys', 'A rubber ball and marbles.', 'fact', 3],
  ['Why fly via Paris?', 'The British airline would not carry animals.', 'fact', 1],
  ['What was the airline\'s condition?', 'Mij had to travel in a small box at Maxwell\'s feet.', 'fact', 1],
  ['What happened when Mij was left in the box?', 'He fought to escape, tore the lining and hurt himself.', 'fact', 1],
  ['What does the box episode show?', 'A wild animal cannot bear confinement.', 'concept', 2],
  ['What did one passenger think Mij was?', 'A rat.', 'fact', 1],
  ['Role of the air hostess', 'Calm and kind; she helped Maxwell and let him keep Mij close.', 'concept', 3],
  ['How did Maxwell exercise Mij in London?', 'He walked him on a lead, like a dog.', 'fact', 1],
  ['How did Londoners react to Mij?', 'They could not identify him and made wild guesses.', 'fact', 1],
  ['What was special about Mij\'s kind of otter?', 'It was new to science and named after Maxwell (Maxwell\'s otter).', 'fact', 1],
  ['Central theme', 'The bond between a human and an animal, earned through patience and care.', 'concept', 2],
  ['Five traits of Mij', 'Cautious at first, affectionate, playful, intelligent, freedom-loving.', 'concept', 3],
  ['Four traits of Maxwell', 'Patient, observant, affectionate, honest about mistakes.', 'concept', 3],
  ['Tone of the chapter', 'Affectionate and gently humorous.', 'concept', 2],
  ['Narrative point of view', 'First person: Maxwell tells his own true experience.', 'concept', 2],
  ['*aloof*', 'distant; not friendly or involved', 'definition', 1],
  ['*zoologist*', 'a scientist who studies animals', 'definition', 1],
  ['*confinement*', 'being shut in a small space', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to theme → conclusion (100–120 words).', 'exam-tip', 4],
  ['Most common factual slip', 'Saying Mij trusted Maxwell from the first night, or that Maxwell caught him in the marshes.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Mijbil the Otter',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the chapter in First Flight.)', items: ['src_arrival'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_trust', 'sa_box', 'sa_hostess', 'sa_humour'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_mij_sketch', 'la_wild_pets'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Mijbil the Otter',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_first_days', 'src_play'] }, { attempt: 1, keys: ['src_box', 'src_london'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_name', 'sb_second_night', 'sb_airline', 'sb_guilt'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_why_otter', 'sa_water', 'sa_london_guesses', 'sa_maxwell_owner', 'sa_responsibility'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_bond', 'la_techniques'] }, { attempt: 1, keys: ['la_diary_hostess', 'la_letter_friend'] }] },
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
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the text; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
