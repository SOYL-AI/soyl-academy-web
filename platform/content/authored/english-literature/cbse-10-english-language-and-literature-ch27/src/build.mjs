// Build CBSE 10 English Language and Literature ch27 "Footprints without Feet" (H. G. Wells). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch27/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary, written at the level of
// events and ideas; the adaptation is never quoted or closely paraphrased and speech is reported.
// Students read the chapter in Footprints without Feet (NCERT supplementary reader).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';
import { checkForbidden } from './guard.mjs';

setUnit('cbse-10-english-language-and-literature-ch27', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the chapter itself in your supplementary reader, *Footprints without Feet* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// Short distinctive phrases (four words or fewer) that must not appear anywhere in this chapter's files.
const GUARD = ['fresh muddy imprints', 'homeless wanderer', 'rather a lawless', 'pile of quilts', 'bushy side-whiskers', 'chink of money', 'sheet of glass', 'big London store', 'shopkeeper from behind', 'remarkable sight met'];

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Short answer (Footprints without Feet)', '40–50 words; answer two of three', '3 each'],
    ['Long answer (Footprints without Feet)', '100–120 words on character, theme or values: sketch, opinion, diary, letter or report; one of two', '6'],
    ['SOYL chapter tests only', 'commentary passages with short parts on character and theme (extra practice; no extract is set from this book)', '5'],
  ],
  'Table of how a Footprints without Feet chapter is examined: three-mark short answers of forty to fifty words, two of three to be answered, and a six-mark long answer of one hundred to one hundred and twenty words on character, theme or values. SOYL chapter tests also include five-mark commentary passages for extra practice.',
  'CBSE 2026-27, Section C (literature): the supplementary reader is not used for extracts.',
);
const vAuthor = table(
  ['About the text', ''],
  [
    ['Author', 'H. G. Wells (1866–1946), English writer, a pioneer of science fiction'],
    ['Source', 'adapted from his novel *The Invisible Man* (1897)'],
    ['Genre', 'science fiction: a story built on an imagined scientific discovery'],
    ['Setting', 'London, then the village of Iping'],
    ['Main characters', 'Griffin, the invisible scientist; Mrs Hall, the landlady at Iping; Jaffers, the village constable'],
  ],
  'Table of facts: the author is H. G. Wells, 1866 to 1946, a pioneer of science fiction; the chapter is adapted from his 1897 novel The Invisible Man; it is science fiction; it is set in London and the village of Iping; the main characters are Griffin, Mrs Hall and the constable Jaffers.',
);
const vStages = flow('LR', ['Footprints on a London step', 'How Griffin became invisible', 'The fire and a homeless winter', 'The store and the costume shop', 'The stranger at Iping', 'Unmasked and escaped'], 'Flow of the chapter in six stages: footprints on a London step; how Griffin became invisible; the fire and a homeless winter; the store and the costume shop; the stranger at Iping; unmasked and escaped.', 'The chapter in six stages (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Misuse of science', 'A great discovery serves only crime and revenge.'],
    ['Lawlessness', 'Fire, theft and assault, with no sense of right and wrong.'],
    ['Power and its price', 'Being unseen means cold, hunger and constant flight.'],
    ['Isolation', 'Griffin trusts no one and belongs nowhere.'],
    ['Curiosity and fear', 'Boys, villagers and the Halls try to explain the unexplainable.'],
    ['Humour and irony', 'Characters misread events the reader understands.'],
  ],
  'Table of six themes with where each appears: misuse of science, lawlessness, power and its price, isolation, curiosity and fear, and humour and irony.',
);
const vGriffin = table(
  ['Griffin\'s trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Brilliant', 'Finds a way to make a living body transparent.'],
    ['Lawless and vengeful', 'Burns the house of a landlord who wants him out.'],
    ['Violent', 'Overpowers and robs a costume-shop owner; knocks out Jaffers.'],
    ['Cunning', 'Builds a face from a false nose, glasses and bandages.'],
    ['Short-tempered', 'Unmasks himself in a rage when questioned.'],
    ['Lonely', 'Hides from everyone; ends as a hunted outsider.'],
  ],
  'Table of Griffin\'s traits with evidence: brilliant, lawless and vengeful, violent, cunning, short-tempered and lonely.',
);
const vOthers = table(
  ['Character', 'What we learn (SOYL summary)'],
  [
    ['The two boys', 'Curious, not frightened; they follow the trail of prints.'],
    ['The landlord', 'Dislikes Griffin and tries to turn him out; his house is burnt.'],
    ['Mrs Hall', 'The Iping landlady; curious, then frightened; blames spirits.'],
    ['The clergyman and his wife', 'Hear money being taken by a thief they cannot see.'],
    ['Jaffers', 'The brave constable who tries to arrest Griffin and is knocked out.'],
  ],
  'Table of the other characters: the curious boys, the landlord, Mrs Hall the landlady, the clergyman and his wife, and the constable Jaffers.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['transparent', 'allowing light through; able to be seen through'],
    ['invisible', 'impossible to see'],
    ['lawless', 'not obeying laws or rules'],
    ['evict', 'to force someone to leave a home'],
    ['disguise', 'a costume or covering that hides who someone is'],
    ['constable', 'a police officer of the lowest rank'],
    ['landlady', 'a woman who rents out rooms'],
    ['science fiction', 'stories based on imagined science'],
  ],
  'Table of word meanings: transparent, invisible, lawless, evict, disguise, constable, landlady and science fiction.',
  'Key words for discussing this chapter.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Point + evidence (own words)', 'Two or three such points', 'Link to a theme or value', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with evidence in your own words, link to a theme or value, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'Footprints without Feet',
  goals: [
    'Retell Griffin\'s story from the London footprints to his escape at Iping, in your own words',
    'Explain how Griffin\'s invisibility leads to lawlessness and the misuse of science',
    'Describe Griffin as a brilliant but lawless scientist, with evidence',
    'Discuss the values the story raises about knowledge and responsibility',
    'Answer 3-mark short and 6-mark long questions within the word limits',
  ],
  slides: [
    sl('title', 'Footprints without Feet — H. G. Wells', {
      b: `*Footprints without Feet*, supplementary reader · science fiction · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study Footprints without Feet, adapted from The Invisible Man by H. G. Wells. Please read the chapter in your supplementary reader before you go on; this lesson does not repeat the text. In the board paper, this book is tested through three mark short answers and a six mark long answer on character, theme and values, so that is what we will practise most.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the chapter once in *Footprints without Feet*, straight through.',
        'Use these slides for the order of events, the themes and Griffin\'s character.',
        'Explain events **in your own words**; do not memorise lines.',
        'Practise the 3-mark and 6-mark questions most: that is how the board tests this book.',
      ],
      n: 'Here is how to use this lesson. Read the chapter first. Then use these slides for the sequence of events, the themes, and the character of Griffin. In your answers, explain what happens in your own words. Spend most of your practice on short and long answers, because the board does not set extracts from this book.',
    }),
    sl('concept', 'The author and the text', {
      v: vAuthor,
      n: 'H. G. Wells was an English writer who lived from eighteen sixty-six to nineteen forty-six. He is one of the pioneers of science fiction. This chapter is adapted from his novel The Invisible Man, published in eighteen ninety-seven. The story moves from London to a small village called Iping, and its central figure is Griffin, a scientist who has made himself invisible.',
    }),
    sl('diagram', 'The chapter in six stages', {
      b: 'A mystery first, then the explanation, then a chain of adventures. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The chapter moves through six stages. It opens with footprints appearing on a London step. Then we learn how Griffin became invisible, and how a fire left him homeless in winter. Next come the department store and the costume shop. Then Griffin arrives as a mysterious stranger at Iping, where he is finally unmasked, and escapes.',
    }),
    sl('concept', 'Summary 1: footprints with no feet', {
      b: 'Two boys in London notice prints of bare feet on the steps of a house. More prints keep forming in front of them, yet nobody can be seen. They follow the trail down the street until it fades away. The walker was Griffin, a scientist who had made himself invisible.',
      n: 'The story begins with a mystery. Two boys in London see bare footprints on the steps of a house, and new prints keep appearing though no one is there. The boys are curious, not scared, and they follow the trail until it fades. Only then does Wells tell us the secret. The walker was Griffin, an invisible scientist.',
    }),
    sl('concept', 'Summary 2: the discovery and the fire', {
      b: 'Griffin had found that certain rare drugs could make a living body transparent, and he had taken them. He was clever but obeyed no law. When his landlord tried to turn him out, Griffin set fire to the house. To escape unseen he had to strip off his clothes, and he was left homeless and penniless in the cold.',
      n: 'How did this happen? Griffin had discovered that some rare drugs could make the body transparent, and he swallowed them. But he was a man who obeyed no law. When his landlord tried to make him leave, Griffin burnt the house in revenge. To get away unseen he had to take off his clothes, so now he had no home and no money.',
    }),
    sl('check', 'Check: the order of events', {
      chk: 'ord_events',
      n: 'Your turn. Six events from Griffin\'s story are shuffled. Put them in the order in which they happen, from the fire in London to the escape at Iping.',
    }),
    sl('concept', 'Summary 3: the store and the costume shop', {
      b: 'It was winter, and an unclothed invisible man was freezing. Griffin hid in a London department store until it shut, then took warm clothes and food and slept there. Next morning the staff spotted him and chased him, and he had to throw everything off to escape. Later, at a shop selling theatre costumes, he took a false nose, dark glasses, whiskers, a hat and bandages, and robbed the owner after knocking him down.',
      n: 'Invisibility brought misery. It was winter, and Griffin could not wear clothes without being seen. He hid in a department store, took warm clothes and food, and slept there. In the morning the staff chased him, and he had to throw everything off. Then he robbed a costume shop of a disguise: a false nose, glasses, whiskers, a hat and bandages. He hurt the owner too.',
    }),
    sl('concept', 'Summary 4: the stranger at Iping', {
      b: 'In disguise, Griffin left London and took rooms at the inn in the village of Iping, kept by Mrs Hall. He hid his face, stayed in his rooms with bottles and chemicals, and was short-tempered with anyone who disturbed him. The villagers were full of curiosity and made up explanations of their own.',
      n: 'Wearing his disguise, Griffin moved to the village of Iping and took rooms at the inn. The landlady was Mrs Hall. He hid his face, worked alone with his bottles and chemicals, and snapped at anyone who disturbed him. Naturally, the villagers were curious. They guessed and gossiped, while we, the readers, already know the truth.',
    }),
    sl('concept', 'Summary 5: unmasked and escaped', {
      b: 'His money ran out. One day, before it was light, the clergyman and his wife realised that cash was vanishing from his desk, yet they could see no thief; then someone unseen sneezed. That same day the Halls found the stranger\'s room empty, and his hat and a chair seemed to attack them. When Mrs Hall demanded an explanation, Griffin lost his temper and pulled off his disguise: there seemed to be no head. Constable Jaffers tried to arrest him, but Griffin threw off his clothes, knocked Jaffers out and escaped.',
      n: 'Then things went wrong. Money vanished from the clergyman\'s desk, though no thief could be seen, and a sneeze gave a clue. The Halls found the stranger\'s room empty, yet a hat and a chair flew at them. When Mrs Hall demanded an explanation, Griffin lost his temper and tore off his disguise. The constable, Jaffers, tried to arrest him, but Griffin stripped, knocked him out and escaped.',
    }),
    sl('two-column', 'Theme 1: the misuse of science', {
      b: 'A discovery is only as good as the person who uses it.',
      cols: [
        '**What Griffin\'s discovery could have been**\n\n- a step forward in human knowledge\n- a subject for careful, shared research\n- a source of respect for its inventor',
        '**What he made of it**\n\n- a tool for revenge, theft and assault\n- a secret that cut him off from everyone\n- a life of cold, hunger and flight',
      ],
      n: 'The central theme is the misuse of science. Griffin\'s discovery could have advanced human knowledge and earned him respect. Instead he used it for revenge, theft and violence, and it cut him off from everyone. In answers, show the contrast between what science can do and what Griffin chose to do with it. That contrast is the moral of the story.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around that central idea sit other themes. Lawlessness, in the fire, the thefts and the attacks. Power and its price, because being unseen means being cold and hunted. Isolation, since Griffin trusts no one. Curiosity and fear, in the boys, the villagers and the Halls. And humour and irony, because characters keep misreading what the reader understands.',
    }),
    sl('check', 'Check: Griffin\'s mistake today', {
      chk: 'mc_apply',
      n: 'Check yourself. A hacker finds a way to read other people\'s messages without being seen. Which of the choices would repeat Griffin\'s mistake?',
    }),
    sl('concept', 'Character: Griffin', {
      b: 'Every trait in an answer needs evidence, described in your own words.',
      v: vGriffin,
      n: 'Let us sketch Griffin. He is brilliant, because he solved a problem no one else could. But he is lawless and vengeful, as the fire shows, and violent, as the costume shop owner and Jaffers discover. He is cunning enough to build himself a face. His quick temper betrays him. And in the end he is lonely and hunted. Always pair a trait with an episode.',
    }),
    sl('concept', 'The other characters', {
      v: vOthers,
      n: 'The other characters mostly react to Griffin. The two boys are curious and follow the prints. The landlord loses his house. Mrs Hall is curious, then terrified, and blames spirits. The clergyman and his wife are robbed by someone they cannot see. And Jaffers, the constable, bravely tries to arrest a man he cannot see, and pays for it.',
    }),
    sl('two-column', 'Gift or curse? Invisibility in the story', {
      cols: [
        '**A gift (what Griffin hoped)**\n\n- go anywhere without being stopped\n- take what he wanted\n- escape every pursuer',
        '**A curse (what Wells shows)**\n\n- no clothes, so cold and hunger in winter\n- no home, no friends, no trust\n- every crime makes him more hunted',
      ],
      n: 'A common long question asks whether invisibility is a gift or a curse. Griffin hoped it would let him go anywhere, take anything and escape everyone. Wells shows the opposite. Being unseen meant going without clothes in winter, having no home and no friends, and being hunted more after every crime. Take a clear stand and support it with episodes.',
    }),
    sl('check', 'Check: why the clothes had to go', {
      chk: 'ar_clothes',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and then whether the reason really explains the assertion.',
    }),
    sl('concept', 'Style and narrative technique', {
      bl: [
        '**Mystery opening:** the effect (footprints) comes before the cause (Griffin).',
        '**Flashback:** Griffin\'s discovery and the fire are explained after the opening scene.',
        '**Fast action:** fire, chase, robbery and a struggle keep the pace high.',
        '**Dramatic irony and humour:** characters misread events the reader understands.',
        '**Science fiction:** an impossible discovery made to feel believable.',
      ],
      n: 'How does Wells tell the story? He opens with a mystery, showing the effect before the cause. He then uses a flashback to explain the discovery and the fire. The action is fast: a fire, a chase, a robbery and a fight. Humour comes from dramatic irony, because the villagers misread what we understand. And it is science fiction, made to feel believable.',
    }),
    sl('example', 'Suspense and irony: SOYL\'s own examples', {
      b: 'Practise spotting the techniques Wells relies on. These sentences are SOYL\'s own, not from the chapter:',
      bl: [
        '*The swing in the empty park kept moving long after the wind had dropped.* — effect before cause, creating suspense',
        '*The guard proudly told everyone the vault was the safest place in town, while the coins quietly floated out of it.* — dramatic irony',
        '*Her umbrella opened by itself, sneezed, and walked off down the road.* — comedy from the impossible',
      ],
      n: 'Here are three sentences of our own. A swing keeps moving after the wind has dropped: effect before cause, which creates suspense. A guard boasts about a safe vault while the coins float out of it: dramatic irony, because we see what he cannot. An umbrella sneezes and walks away: comedy from the impossible. Now find Wells\'s own moments in your reader.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words will help you write about the chapter. Transparent means able to be seen through, and invisible means impossible to see. Lawless means obeying no rules. To evict is to force someone out of a home. A disguise hides who someone is. A constable is a junior police officer, and a landlady rents out rooms.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *Griffin\'s brilliance made him dangerous, not great.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + evidence:** a real discovery; then the fire, the costume-shop robbery and the attack on Jaffers.',
        '**The price:** cold, hunger, loneliness and flight.',
        '**Link + conclusion:** knowledge needs a conscience; without one, genius harms others and its owner.',
      ],
      n: 'Here is how to plan a six mark answer. Take a stand: agree. Give evidence: his discovery was real, but he used it for a fire, a robbery and an attack on Jaffers. Show the price he paid: cold, hunger, loneliness and flight. Link to the value at the heart of the story, that knowledge needs a conscience, and end with one clear line.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Footprints appear on a London step; the walker is Griffin, an invisible scientist.',
        'Rare drugs made him transparent; he burnt his landlord\'s house and was left with nothing.',
        'Winter misery: the department store, the chase, the robbery for a disguise.',
        'Iping: a secretive stranger, a theft, a haunted room, an unmasking, and an escape from Jaffers.',
        'Read the chapter in *Footprints without Feet*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. The footprints in London belong to Griffin, a scientist who made himself invisible with rare drugs. After burning his landlord\'s house, he faced a freezing winter, a chase in a store and a robbery for a disguise. At Iping his secret came out, and he escaped from Jaffers. Read the chapter in your reader, and write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The board sets no extracts from this book: practise 3-mark answers (40–50 words) and the 6-mark long answer (100–120 words).',
        '3-mark answers: point + evidence + explanation.',
        '6-mark answers: stand → 3 points with evidence → link to a theme or value → conclusion.',
        'Facts often confused: Griffin became invisible through drugs, not a cloak; he burnt the house in revenge; Jaffers was knocked out, not killed.',
        'For value questions, link Griffin\'s choices to responsibility in science today.',
      ],
      n: 'Exam tips. Remember that this book is tested through short and long answers, not extracts. In three mark answers, give a point, evidence and a short explanation. In six mark answers, take a stand and support it with three points. Get the facts right. And for value questions, link Griffin\'s choices to responsible science in our own time.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Footprints without Feet — study notes',
  sections: [
    {
      h: '1. About the text and the author',
      t: 1,
      b: `${READ}\n\n**H. G. Wells** (1866–1946) was an English writer and one of the founders of science fiction. The chapter is adapted from his novel *The Invisible Man* (1897), the story of a scientist who discovers how to make himself invisible. It is told by a third-person narrator and moves from London to the village of Iping.`,
      v: vAuthor,
      terms: [['Science fiction', 'Fiction built on imagined scientific discoveries or technology.']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**The mystery.** Two boys in London see bare footprints forming on a house\'s steps with no one in sight, follow them, and lose the trail when it fades.\n\n**The explanation.** The walker is Griffin, a scientist who took rare drugs that made his body transparent. Lawless by nature, he burnt his landlord\'s house when the landlord tried to turn him out, and had to strip to escape unseen.\n\n**Winter in London.** Freezing and homeless, he hid in a department store overnight, taking clothes and food, but was chased out in the morning and lost them. He then robbed a costume shop of a disguise, hurting the owner.\n\n**Iping.** Disguised, he took rooms at the village inn kept by Mrs Hall, stayed hidden with his chemicals and was rude to anyone who disturbed him. The villagers were curious.\n\n**The end of the secret.** Short of money, he took cash from the clergyman\'s desk unseen; the Halls found his room empty while his things seemed to attack them. Questioned by Mrs Hall, he lost his temper and unmasked himself. Constable Jaffers tried to arrest him, but Griffin stripped, knocked him out and escaped.',
      v: vStages,
    },
    {
      h: '3. Themes and message',
      t: 2,
      b: '- **Misuse of science:** a great discovery serves only crime.\n- **Lawlessness:** fire, theft and assault.\n- **Power and its price:** being unseen means cold, hunger and flight.\n- **Isolation:** Griffin trusts no one and belongs nowhere.\n- **Curiosity and fear:** ordinary people try to explain the impossible.\n- **Humour and irony:** characters misread what the reader understands.\n\n**Message:** knowledge without moral responsibility harms others and, in the end, the one who holds it.',
      v: vThemes,
      terms: [['Ethics', 'Moral principles about what is right and wrong, for example in science.']],
    },
    {
      h: '4. Griffin: character',
      t: 3,
      b: '**Brilliant** (discovers how to make the body transparent). **Lawless and vengeful** (burns the landlord\'s house). **Violent** (robs and hurts the costume-shop owner; knocks out Jaffers). **Cunning** (builds a face from a disguise). **Short-tempered** (unmasks himself in anger). **Lonely** (ends as a hunted outsider).\n\nIn answers, pair each trait with a specific episode.',
      v: vGriffin,
    },
    {
      h: '5. The other characters',
      t: 3,
      b: '**The two boys** are curious and follow the prints. **The landlord** tries to evict Griffin and loses his house. **Mrs Hall**, the Iping landlady, is curious, then frightened, and blames spirits for the moving furniture. **The clergyman and his wife** are robbed by an unseen thief. **Jaffers**, the constable, bravely tries to arrest Griffin and is knocked unconscious.',
      v: vOthers,
    },
    {
      h: '6. Style and narrative technique',
      t: 2,
      b: '- **Mystery opening:** effect before cause.\n- **Flashback:** the discovery and the fire are explained after the opening.\n- **Fast action:** fire, chase, robbery, struggle.\n- **Dramatic irony and humour:** the villagers and Mrs Hall misread events.\n- **Science fiction:** the impossible made believable.\n\nSOYL practice sentence (not from the chapter): *The swing in the empty park kept moving long after the wind had dropped* (effect before cause).',
      terms: [['Dramatic irony', 'When the reader knows something that the characters do not.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Key words for discussing the chapter: transparent, invisible, lawless, evict, disguise, constable, landlady, science fiction. Use them in your own sentences, for example: *Griffin\'s disguise gave an invisible man a face the villagers could see.*',
      v: vWords,
    },
    {
      h: '8. Answering exam questions',
      t: 4,
      b: '**How this book is examined:** the board sets 3-mark short answers (40–50 words; two of three) and a 6-mark long answer (100–120 words) from *Footprints without Feet*, on character, theme and values. It does not set extracts from this book. SOYL chapter tests add commentary passages only as extra practice.\n\n**Short answers (3 marks):** point + evidence + explanation.\n\n**Long answers (6 marks):** a clear stand; three points with evidence in your own words; a link to a theme or value; a one-line conclusion. Extrapolation tasks (Mrs Hall\'s diary, Jaffers\'s report, a letter from Griffin) must stay consistent with the chapter.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** *Footprints without Feet* is tested through 3-mark short answers (40–50 words) and a 6-mark long answer (100–120 words) on character, theme and values (CBSE 2026-27, Section C). No extracts are set from this book.\n\n**How marks are awarded:** content (relevant events, accurately used), interpretation (a clear, supported view on character, theme or value), and expression within the word limit.\n\n**Common mistakes**\n1. Saying Griffin used a cloak or magic: he took rare drugs.\n2. Forgetting why he had to remove his clothes: only his body was invisible.\n3. Saying the fire was an accident: it was revenge on his landlord.\n4. Saying Griffin was caught at the end: he knocked out Jaffers and escaped.\n5. Quoting lines from memory instead of explaining in your own words.\n\n**Remember:** read the chapter in your supplementary reader, *Footprints without Feet*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote the story on which *Footprints without Feet* is based?', 'H. G. Wells (1866–1946).', 'fact', 1],
  ['From which novel is the chapter adapted?', '*The Invisible Man* (1897).', 'fact', 1],
  ['Genre of the story', 'Science fiction.', 'concept', 2],
  ['What did the two boys see in London?', 'Bare footprints forming on a house\'s steps with nobody in sight.', 'fact', 1],
  ['What happened to the trail the boys followed?', 'It faded and disappeared.', 'fact', 1],
  ['Who made the footprints?', 'Griffin, a scientist who had made himself invisible.', 'fact', 1],
  ['How did Griffin become invisible?', 'By swallowing certain rare drugs.', 'fact', 1],
  ['Why did Griffin burn his landlord\'s house?', 'In revenge, because the landlord tried to turn him out.', 'fact', 3],
  ['Why did Griffin have to remove his clothes to escape?', 'His body was invisible, but clothes could be seen.', 'concept', 2],
  ['Why was winter a bad time to be invisible?', 'Without clothes he froze.', 'concept', 2],
  ['What did Griffin do in the department store?', 'Hid until closing, took clothes and food, and slept there.', 'fact', 1],
  ['What happened in the store next morning?', 'The staff chased him; he threw off the clothes to escape.', 'fact', 1],
  ['Where did Griffin get his disguise?', 'From a shop selling theatre costumes, which he robbed.', 'fact', 1],
  ['Name three parts of Griffin\'s disguise', 'Any three: false nose, dark glasses, whiskers, hat, bandages.', 'fact', 1],
  ['Where did Griffin go after London?', 'The inn at the village of Iping.', 'fact', 1],
  ['Who kept the inn at Iping?', 'Mrs Hall, with her husband.', 'fact', 1],
  ['What clue followed the theft at the clergyman\'s house?', 'A sneeze from someone no one could see.', 'fact', 1],
  ['What attacked the Halls in the empty room?', 'A hat and a chair, moved by the invisible Griffin.', 'fact', 1],
  ['What did Mrs Hall blame for the moving furniture?', 'Spirits.', 'fact', 3],
  ['What made Griffin unmask himself?', 'He lost his temper when Mrs Hall demanded an explanation.', 'fact', 3],
  ['Who tried to arrest Griffin?', 'Constable Jaffers.', 'fact', 1],
  ['How does the chapter end?', 'Griffin knocks Jaffers out and escapes.', 'fact', 1],
  ['Central theme', 'The misuse of science: knowledge without moral responsibility.', 'concept', 2],
  ['Five traits of Griffin', 'Brilliant, lawless, violent, cunning, short-tempered.', 'concept', 3],
  ['Is invisibility a gift in the story?', 'No: it brings cold, hunger, loneliness and flight.', 'concept', 2],
  ['Where does the humour come from?', 'Dramatic irony: characters misread what the reader understands.', 'concept', 2],
  ['*transparent*', 'able to be seen through', 'definition', 1],
  ['*evict*', 'to force someone to leave a home', 'definition', 1],
  ['Plan for a 6-mark answer', 'Stand → three points with evidence → link to a theme or value → conclusion (100–120 words).', 'exam-tip', 4],
  ['How the board tests this book', '3-mark short answers and a 6-mark long answer; no extracts.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Footprints without Feet',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Commentary passage (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary on character and theme; read the chapter in Footprints without Feet.)', items: ['src_lawless'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_invisible_how', 'sa_room', 'sa_misery', 'sa_griffin_sympathy'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_griffin_sketch', 'la_invisible_day'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Footprints without Feet',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Commentary passages (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary on character and theme.)', items: [{ attempt: 1, keys: ['src_opening', 'src_store'] }, { attempt: 1, keys: ['src_iping', 'src_unmasked'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_fire', 'sb_winter', 'sb_shopkeeper', 'sb_spirits'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_lawless', 'sa_disguise', 'sa_clergyman', 'sa_science_misuse', 'sa_title'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_science_ethics', 'la_power_isolation'] }, { attempt: 1, keys: ['la_diary_hall', 'la_jaffers_report'] }] },
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
    literature_rule: 'written in SOYL words at the level of events and ideas; no sentence, phrase or dialogue of the adaptation; speech reported; commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem; guard list of short distinctive phrases (guard.mjs)',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the chapter',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
checkForbidden(DIR, GUARD);
