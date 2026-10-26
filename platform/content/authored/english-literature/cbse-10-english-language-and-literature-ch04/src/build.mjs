// Build CBSE 10 English Language and Literature ch04 "A Letter to God". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch04/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; the story is never
// quoted or closely paraphrased. Students read the text in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch04', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the story itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL\'s explanation and analysis; it does not reproduce the text.';

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
    ['Author', 'G. L. Fuentes (Gregorio López y Fuentes, 1897–1966), Mexican novelist, poet and journalist'],
    ['Known for', 'writing about rural Mexico and its farming and indigenous communities; best-known novel *El Indio* (1935)'],
    ['Original language', 'Spanish; read in English translation'],
    ['Genre', 'short story with an ironic ending'],
    ['Setting', 'a farming valley; the currency (pesos) and the author place it in rural Mexico'],
    ['Characters', 'Lencho, his wife and children, a postman, the postmaster'],
  ],
  'Table of facts about the story: author G. L. Fuentes, a Mexican writer; originally in Spanish; a short story with an ironic ending, set in a farming valley in rural Mexico; characters Lencho, his family, a postman and the postmaster.',
);
const vStages = flow('LR', ['Hope: the crop needs one rain', 'Ruin: hail destroys the crop', 'Faith: a letter to God for 100 pesos', 'Kindness: the postmaster raises 70 pesos', 'Irony: Lencho accuses the post office'], 'Flow of the story in five stages: hope for rain, ruin by hail, a letter to God for a hundred pesos, the postmaster raising seventy pesos, and Lencho accusing the post office.', 'The story in five stages (SOYL summary).');
const vIrony = table(
  ['What Lencho believes', 'What really happened'],
  [
    ['God read his letter and sent money.', 'The postmaster read it and organised the reply.'],
    ['God sent the full hundred pesos.', 'Only seventy could be collected.'],
    ['Post office staff stole thirty pesos.', 'Post office staff gave their own money.'],
    ['The staff are thieves.', 'The staff are his only benefactors.'],
  ],
  'Two-column table contrasting what Lencho believes, that God sent a hundred pesos and the staff stole thirty, with what really happened, that the postmaster and staff collected seventy pesos from their own money.',
  'The gap between belief and fact is the irony.',
);
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Faith', 'Lencho writes to God and expects a reply without doubt.'],
    ['Irony', 'The helpers are accused of theft.'],
    ['Human kindness', 'Strangers give their own money and seek no credit.'],
    ['Nature as giver and destroyer', 'Rain brings joy; hail brings ruin.'],
    ['Poverty and dependence', 'One lost crop means a year of hunger.'],
    ['Gratitude and suspicion', 'Lencho cannot see the goodness of people around him.'],
  ],
  'Table of six themes of the story with where each appears: faith, irony, human kindness, nature as giver and destroyer, poverty and dependence, and gratitude versus suspicion.',
);
const vLencho = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Hard-working, experienced', 'He reads his land and the sky closely; his year\'s work is in the field.'],
    ['Optimistic', 'He sees the first rain as money arriving.'],
    ['Deep, simple faith', 'He writes to God and is not surprised when money comes.'],
    ['Practical', 'He asks only for what he needs to replant and survive.'],
    ['Naive and suspicious', 'He blames the post office for the missing thirty pesos.'],
  ],
  'Table of Lencho’s traits with evidence: hard-working, optimistic, deeply faithful, practical, and naive and suspicious.',
);
const vPostmaster = table(
  ['Trait', 'Evidence (in SOYL\'s words)'],
  [
    ['Good-humoured', 'He laughs at first at a letter addressed to God.'],
    ['Sensitive, respectful', 'He quickly grows serious and respects the faith behind it.'],
    ['Generous', 'He gives part of his own salary.'],
    ['Resourceful', 'He organises a collection from staff and friends.'],
    ['Humble', 'He signs the reply as God and takes no credit.'],
  ],
  'Table of the postmaster’s traits with evidence: good-humoured, respectful of faith, generous, resourceful and humble.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['crest', 'the top of a hill'],
    ['downpour', 'a heavy fall of rain'],
    ['hailstones', 'small balls of ice that fall like rain'],
    ['locusts', 'insects that travel in swarms and destroy crops'],
    ['conscience', 'the inner sense of right and wrong'],
    ['amiable', 'friendly and pleasant'],
    ['correspondence', 'an exchange of letters'],
    ['contentment', 'a feeling of quiet satisfaction'],
    ['crooks', 'dishonest people; cheats'],
  ],
  'Table of word meanings: crest, downpour, hailstones, locusts, conscience, amiable, correspondence, contentment and crooks.',
  'Single words from the story with their meanings.',
);
const vLongPlan = flow('LR', ['Take a clear stand', 'Trait or point + incident (own words)', 'Two or three such points', 'Link to theme or irony', 'One-line conclusion'], 'Flow for planning a six-mark long answer: take a stand, give points with incidents in your own words, link to the theme, and conclude.');

// ---------------------------------------------------------------- deck
const D = deck({
  title: 'A Letter to God — G. L. Fuentes',
  goals: [
    'Retell the main events of the story in sequence, in your own words',
    'Explain the themes of unshakeable faith and human kindness',
    'Explain the irony of the ending and its effect on the reader',
    'Describe Lencho and the postmaster with evidence from the story',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'A Letter to God — G. L. Fuentes', {
      b: `*First Flight*, prose · short story · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Today we study A Letter to God by the Mexican writer G. L. Fuentes. Before anything else, please read the story itself in your textbook, First Flight. This lesson does not repeat the text. Instead we will understand it: the events, the themes, the characters, the irony at the end, and how to answer board questions on it.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the story once in *First Flight*, straight through, for enjoyment.',
        'Then use these slides for the events, themes, characters and devices.',
        'In answers, describe incidents **in your own words**; do not memorise lines.',
        'Practise the extract questions, which use SOYL commentary on the story.',
      ],
      n: 'Here is the best way to study a literature lesson. First, read the story in your textbook, once, just to enjoy it. Then come back to these slides to understand its structure and meaning. When you write answers, describe incidents in your own words, because examiners reward understanding, not memorised lines. Finally, practise with our extract questions and short answers.',
    }),
    sl('concept', 'The author and the setting', {
      v: vAuthor,
      n: 'The author, Gregorio López y Fuentes, was a Mexican writer who lived from eighteen ninety-seven to nineteen sixty-six. He wrote about the lives of farmers and villagers in rural Mexico. This story was first written in Spanish, and we read it in translation. It is set in a farming valley, and the money in the story is the peso, the Mexican currency.',
    }),
    sl('diagram', 'The story in five stages', {
      b: 'Five stages, each a turn in Lencho\'s fortunes. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'The story moves in five clear stages. Hope, as a farmer waits for the one rain his crop needs. Ruin, when hail destroys that crop. Faith, when he writes to God for a hundred pesos. Kindness, when the postmaster raises seventy pesos to reply. And irony, when Lencho accuses the very people who helped him. Keep these five words in mind as a map.',
    }),
    sl('concept', 'Summary 1: hope, then ruin', {
      b: 'Lencho\'s family farm a valley where everything depends on the harvest. The maize is ripe and the crop looks excellent; it needs only one good rain. When rain finally arrives, Lencho is overjoyed and pictures the drops as money. But the wind rises and hail falls for about an hour, leaving the crop destroyed. By night the family fears a year of hunger.',
      n: 'In your own words, the first part is about hope turning into ruin. Lencho is a farmer whose whole year depends on one harvest. His crop is ripe and promising, and it needs just one good rain. When the rain begins, he is delighted and imagines the drops as money. Then hail falls for about an hour and destroys everything. The family now faces hunger.',
    }),
    sl('concept', 'Summary 2: a letter to God', {
      b: 'Grief does not turn into despair, because the family still trusts that God will help. Lencho, a farmer who can write, decides to ask God directly. On a Sunday he writes asking for a hundred pesos to replant and to feed his family until the next harvest, addresses the envelope to God, and posts it in town.',
      n: 'The second part is about faith. Even after the disaster, the family holds on to one hope: that God will help them. Lencho can write, so he decides to ask God directly. On a Sunday he writes a letter asking for a hundred pesos, enough to replant and to feed his family until the next harvest. He addresses it to God and posts it in town.',
    }),
    sl('concept', 'Summary 3: the post office responds', {
      b: 'A postman finds the address funny and shows it to the postmaster, who laughs too, but then grows serious, moved by a faith stronger than his own. Not wanting that faith to be crushed, he decides to reply. He collects money from his staff and friends and adds part of his own salary, but raises only seventy pesos. He sends it with a note signed simply *God*.',
      n: 'The third part is about kindness. At the post office the letter first causes laughter. But the postmaster soon becomes serious, because he is moved by such complete faith. He decides that it must not be crushed by silence. So he collects money from his staff and friends, adds part of his own salary, and manages seventy pesos. He signs the reply as God.',
    }),
    sl('concept', 'Summary 4: the ironic ending', {
      b: 'The next Sunday Lencho collects the envelope. He is not surprised to find money, but counting it makes him angry: sure that God cannot have sent less, he decides the missing thirty pesos were stolen. He writes again, asking God for the rest and warning God not to send it by post, because he suspects the post office staff.',
      n: 'The last part is the irony. When Lencho opens the envelope, he is calm, because he expected God to answer. But when he counts seventy pesos instead of a hundred, he is angry. Certain that God could not send less, he decides someone stole the rest. So he writes again, asking for the remaining money, and tells God not to use the post office, whose staff he now suspects.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_events',
      n: 'Your turn. Six events from the story are shuffled. Put them in the order they happen. Use the five stages, hope, ruin, faith, kindness and irony, as your guide.',
    }),
    sl('two-column', 'Theme 1: faith', {
      b: 'Lencho\'s faith is total: he writes to God as if to a person who will reply, and he is calm when the reply comes. The story shows both sides of such faith.',
      cols: [
        '**Faith as strength**\n\n- keeps the family going after the storm\n- moves the postmaster to act\n- leads, in a roundabout way, to real help',
        '**Faith as blindness**\n\n- Lencho cannot imagine God sending less\n- so he assumes people stole from him\n- he never sees the kindness that saved him',
      ],
      n: 'The central theme is faith. Lencho believes so completely that he writes to God as he would to a person, and he is not surprised by the reply. This faith gives him strength after the storm, and it even inspires the postmaster. But it also blinds him. Because God cannot be wrong in his eyes, he assumes people must have cheated him.',
    }),
    sl('two-column', 'Theme 2: irony, belief versus fact', {
      b: 'Situational irony: the outcome is the opposite of what we expect. Dramatic irony: the reader knows the truth that Lencho does not.',
      v: vIrony,
      cols: ['**Expected:** a grateful farmer thanks God and, unknowingly, the kind people who helped.', '**Actual:** the farmer accuses those very people of theft and asks God to bypass them.'],
      n: 'Irony is the heart of the ending. We expect Lencho to be grateful. Instead, he accuses the post office staff, the only people who actually helped him, of stealing. That is situational irony. There is also dramatic irony, because we, the readers, know where the money came from, while Lencho does not. The result is funny and sad at the same time.',
    }),
    sl('concept', 'A web of themes', {
      v: vThemes,
      n: 'Around faith and irony sit other themes. Human kindness, in strangers who give their own money and want no credit. Nature as both giver and destroyer. The poverty of a farmer for whom one lost crop means a year of hunger. And the contrast between gratitude and suspicion. In long answers, connect at least two themes to show depth.',
    }),
    sl('check', 'Check: name the device', {
      chk: 'mc_dramatic',
      n: 'Check yourself. The reader knows the money came from the postmaster and his staff, but Lencho does not. What is this kind of irony called?',
    }),
    sl('concept', 'Character: Lencho', {
      b: 'Every trait in an answer needs an incident, described in your own words.',
      v: vLencho,
      n: 'Let us sketch Lencho. He is hard-working and experienced, watching his land and the sky closely. He is optimistic, seeing rain as money. His faith is deep and simple. He is practical, asking only for what he needs. But he is also naive and suspicious, blaming the post office for the shortfall. Notice that every trait is backed by an incident.',
    }),
    sl('concept', 'Character: the postmaster', {
      v: vPostmaster,
      n: 'Now the postmaster. He is good-humoured, laughing at first at the strange address. But he is also sensitive, quickly seeing the faith behind it and respecting it. He is generous, giving part of his salary, and resourceful, organising a collection. Above all he is humble, signing the reply as God. Many readers see him as the real hero of the story.',
    }),
    sl('two-column', 'Was Lencho ungrateful?', {
      cols: [
        '**Yes, in effect**\n\n- he insults the people who helped him\n- he shows no doubt about his own judgement\n- he demands the rest rather than giving thanks',
        '**Not deliberately**\n\n- he never learns who sent the money\n- his anger comes from faith, not greed\n- he asked only for what he needed',
      ],
      n: 'A favourite exam debate: was Lencho ungrateful? In effect, yes. He insults his helpers and demands the rest of the money. But he is not deliberately ungrateful, because he never learns the truth, and his anger comes from his faith, not greed. The best answers take a clear position and still acknowledge the other side.',
    }),
    sl('check', 'Check: Lencho in the second letter', {
      chk: 'mc_lencho_flaw',
      n: 'Try this. Which phrase best describes Lencho when he writes his second letter? Think about what he knows and what he does not know.',
    }),
    sl('concept', 'Narrative technique and language', {
      bl: [
        '**Third-person narrator:** we see Lencho\'s home and the post office, so we know more than Lencho.',
        '**Comparison:** raindrops pictured as coins; hailstones as pearls (metaphor and simile).',
        '**Contrast and reversal:** joy at rain → ruin by hail; kindness → accusation.',
        '**Irony:** situational and dramatic, left without comment at the end.',
        '**Plain, simple style** that suits a simple, sincere hero.',
      ],
      n: 'How does Fuentes tell the story? A third-person narrator shows us both Lencho’s home and the post office, so we know more than Lencho does. He uses comparisons, raindrops as coins and hailstones as pearls. He builds contrasts, joy then ruin, kindness then accusation. And he ends with irony, without any comment. The plain style suits a sincere, simple hero.',
    }),
    sl('example', 'Spotting comparisons: SOYL\'s own examples', {
      b: 'A **simile** compares using *like* or *as*; a **metaphor** says one thing *is* another. These sentences are SOYL\'s own, to practise the device:',
      bl: [
        '*The fireflies were tiny lanterns over the paddy.* — metaphor',
        '*Her laugh rang out like a temple bell.* — simile',
        '*The exam hall was an oven by noon.* — metaphor',
      ],
      n: 'Here are three sentences of our own to practise. The fireflies were tiny lanterns: a metaphor, because it says they are lanterns. Her laugh rang out like a temple bell: a simile, because it uses like. The exam hall was an oven: a metaphor again. In the story, Lencho turns raindrops into coins in the same way. Find that moment in your textbook.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words from the story often appear in questions. Crest means the top of a hill. A downpour is heavy rain. Locusts are insects that destroy crops in swarms. Conscience is the inner sense of right and wrong. Amiable means friendly. Correspondence is an exchange of letters. And crooks are cheats, the word Lencho uses for the post office staff.',
    }),
    sl('example', 'Worked example: planning a 6-mark answer', {
      b: '*Question:* *The postmaster is the real hero of the story.* Do you agree?',
      v: vLongPlan,
      bl: [
        '**Stand:** agree.',
        '**Points + incidents:** respects faith instead of mocking it; collects money and gives his own salary; signs as God, seeking no credit.',
        '**Link:** the irony of being called a thief makes his goodness stand out.',
        '**Conclusion:** his humility and generosity make him the true hero.',
      ],
      n: 'Here is how to plan a six mark answer. Take a clear stand: agree. Then give three points, each with an incident in your own words: he respects Lencho’s faith, he collects money and gives his own salary, and he signs as God. Link this to the irony of being called a thief. End with a one-line conclusion. That plan becomes about one hundred and twenty words.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Five stages: hope → ruin → faith → kindness → irony.',
        'Lencho: hard-working, optimistic, deeply faithful, practical, naive and suspicious.',
        'Postmaster: respectful, generous, resourceful, humble: the quiet hero.',
        'Themes: faith (strength and blindness), irony, human kindness, nature, poverty.',
        'Read the story in *First Flight*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. The story moves from hope to ruin, to faith, to kindness, and finally to irony. Lencho is hard-working and faithful but naive. The postmaster is the quiet hero, generous and humble. The themes are faith as both strength and blindness, irony, kindness, nature, and poverty. And remember: read the story in your textbook, and write about it in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + incident + explanation.',
        '6-mark answers (100–120 words): stand → 3 points with incidents → link to theme → conclusion.',
        'Facts that are often confused: 100 pesos asked, 70 received; the postman hands over the envelope; the reply is signed *God*.',
        'Do not call the postmaster dishonest or Lencho greedy; explain the irony instead.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, an incident and a short explanation. In six mark answers, take a stand and support it with three incidents. Get the facts right: a hundred pesos asked, seventy received, signed God. And never call the postmaster dishonest or Lencho greedy. Explain the irony instead.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'A Letter to God — study notes',
  sections: [
    {
      h: '1. About the story and the author',
      t: 1,
      b: `${READ}\n\n*A Letter to God* is a short story by **G. L. Fuentes** (Gregorio López y Fuentes, 1897–1966), a Mexican novelist, poet and journalist who wrote about rural Mexico and its farming and indigenous communities; his best-known novel is *El Indio* (1935). The story was written in Spanish and is read in English translation. It is set in a farming valley; the currency, pesos, places it in rural Mexico.`,
      v: vAuthor,
      terms: [['Peso', 'The currency of Mexico (and some other Latin American countries).']],
    },
    {
      h: '2. Summary (in SOYL\'s words)',
      t: 1,
      b: '**Hope and ruin.** Lencho\'s family farm a valley and depend entirely on their harvest. The maize is ripe and needs only one good rain. When it rains, Lencho is overjoyed and pictures the drops as money, but a storm of hail lasting about an hour destroys the crop, and the family fears a year of hunger.\n\n**Faith.** The family still trusts that God will help. Lencho, who can write, asks God for a hundred pesos to replant and feed his family until the next harvest, addresses the envelope to God and posts it.\n\n**Kindness.** At the post office, the postman and the postmaster first laugh; the postmaster then grows serious, moved by the farmer\'s faith. To protect that faith he replies, collecting money from his staff and friends and from his own salary. He raises seventy pesos and signs the note *God*.\n\n**Irony.** Lencho is not surprised to receive money, but is angry that thirty pesos are missing. He writes again asking God for the rest and not to send it by post, because he suspects the post office staff.',
      v: vStages,
    },
    {
      h: '3. Themes',
      t: 2,
      b: '- **Faith:** total, simple faith gives Lencho strength and inspires the postmaster, but also blinds him to human goodness.\n- **Irony:** the helpers are accused of theft (situational); the reader knows what Lencho does not (dramatic).\n- **Human kindness:** strangers give quietly, seeking no credit.\n- **Nature as giver and destroyer:** rain brings joy, hail brings ruin.\n- **Poverty and dependence:** one lost crop means a year of hunger.\n- **Gratitude and suspicion:** Lencho cannot see the kindness around him.\n\n**Message:** faith in God and trust in people should go together; kindness is often unrecognised, yet worth doing.',
      v: vThemes,
      terms: [
        ['Situational irony', 'When the outcome is the opposite of what is expected.'],
        ['Dramatic irony', 'When the reader knows something a character does not.'],
      ],
    },
    {
      h: '4. Characters',
      t: 3,
      b: '**Lencho:** a hard-working, experienced farmer; optimistic; deeply and simply faithful; practical in his request; but naive and suspicious, so that he unknowingly wrongs his helpers.\n\n**The postmaster:** good-humoured, then sensitive and respectful of faith; generous (gives his own salary); resourceful (organises the collection); humble (signs as God). He is often seen as the real hero.\n\n**Others:** Lencho\'s wife and children share the family\'s hope for rain and its grief after the storm; the postman finds the letter amusing and hands over the reply.',
      vs: [vLencho, vPostmaster],
    },
    {
      h: '5. Narrative technique and language',
      t: 4,
      b: '- **Third-person narrator**, moving between Lencho\'s home and the post office, so the reader knows more than Lencho.\n- **Comparisons:** raindrops pictured as coins, hailstones as pearls.\n- **Contrast and reversal:** joy → ruin; kindness → accusation.\n- **Irony** at the end, left without comment, so the reader judges.\n- **Plain, simple style** suited to a simple, sincere hero; gentle humour (the address *To God*).\n\nSOYL practice sentences for comparisons (not from the story): *The fireflies were tiny lanterns over the paddy* (metaphor); *Her laugh rang out like a temple bell* (simile).',
      v: vIrony,
      terms: [
        ['Metaphor', 'A comparison that says one thing is another.'],
        ['Simile', 'A comparison using like or as.'],
      ],
    },
    {
      h: '6. Word meanings',
      t: 4,
      b: 'Single words from the story, with meanings. Learn the words; describe the sentences they appear in in your own words.',
      v: vWords,
    },
    {
      h: '7. Answering exam questions',
      t: 5,
      b: '**Extract-based (5 marks):** the board prints a passage from the story; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the story.\n\n**Short answers (3 marks, 40–50 words):** point + incident + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand; three points with incidents in your own words; a link to a theme or the irony; a one-line conclusion. Extrapolation tasks (diary of the postmaster, Lencho\'s letter after learning the truth) must stay consistent with the characters.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant incidents, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Wrong amounts: Lencho asks for 100 pesos and receives 70.\n2. Saying the postmaster handed over the letter: the postman did; the postmaster watched.\n3. Calling the postmaster dishonest, or Lencho greedy.\n4. Retelling the story instead of answering the question asked.\n5. Quoting long lines from memory instead of explaining in your own words.\n\n**Remember:** read the story in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *A Letter to God*?', 'G. L. Fuentes (Gregorio López y Fuentes), a Mexican writer (1897–1966).', 'fact', 1],
  ['In what language was the story first written?', 'Spanish; we read it in English translation.', 'fact', 1],
  ['Where is the story set?', 'A farming valley in rural Mexico (the currency is pesos).', 'fact', 1],
  ['What did the crop need just before the storm?', 'One good rain.', 'fact', 1],
  ['What destroyed Lencho\'s crop?', 'A hailstorm lasting about an hour.', 'fact', 1],
  ['How much did Lencho ask God for, and why?', 'A hundred pesos — to replant and to feed his family until the next harvest.', 'fact', 1],
  ['How did Lencho address the envelope?', 'To God.', 'fact', 1],
  ['How much money did the postmaster send?', 'Seventy pesos — just over half.', 'fact', 1],
  ['Where did the postmaster get the money?', 'From his employees, his friends and part of his own salary.', 'fact', 1],
  ['How was the reply signed?', 'With one word: God.', 'fact', 1],
  ['Who handed the envelope to Lencho?', 'The postman; the postmaster watched from his office.', 'fact', 1],
  ['Why was Lencho angry?', 'He received 70, not 100 pesos, and, sure God cannot err, he believed the post office staff stole the rest.', 'concept', 1],
  ['Five stages of the story', 'Hope → ruin → faith → kindness → irony.', 'concept', 1],
  ['Central theme', 'Faith — as strength and as blindness.', 'concept', 2],
  ['Main message', 'Faith in God and trust in people should go together; kindness is often unrecognised.', 'concept', 2],
  ['What is the situational irony of the ending?', 'The only people who helped Lencho are the ones he accuses of theft.', 'concept', 4],
  ['What is the dramatic irony?', 'The reader knows the money came from the postmaster and staff; Lencho does not.', 'concept', 4],
  ['Two comparisons in the story', 'Raindrops pictured as coins; hailstones as pearls.', 'concept', 4],
  ['Point of view of the story', 'Third-person narrator.', 'fact', 4],
  ['Three traits of Lencho', 'Hard-working, deeply faithful, naive and suspicious.', 'concept', 3],
  ['Three traits of the postmaster', 'Generous, resourceful, humble.', 'concept', 3],
  ['Why did the postmaster sign as God?', 'To keep Lencho\'s faith intact and to take no credit himself.', 'concept', 3],
  ['Was Lencho deliberately ungrateful?', 'No — he never learned the truth; his anger came from faith, not greed.', 'exam-tip', 3],
  ['*amiable*', 'friendly and pleasant', 'definition', 4],
  ['*conscience*', 'the inner sense of right and wrong', 'definition', 4],
  ['*correspondence*', 'an exchange of letters', 'definition', 4],
  ['*crooks*', 'dishonest people; cheats', 'definition', 4],
  ['Plan for a 6-mark answer', 'Stand → three points with incidents → link to theme/irony → conclusion (100–120 words).', 'exam-tip', 5],
  ['Plan for a 3-mark answer', 'Point + incident + explanation (40–50 words).', 'exam-tip', 5],
  ['Most common factual slip', 'Mixing up the amounts (100 asked, 70 received) or who handed over the envelope (the postman).', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — A Letter to God',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the story in First Flight.)', items: ['src_rain'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_why_letter', 'sa_postmaster_change', 'sa_angry', 'sa_sign_god'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_lencho', 'la_nature'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — A Letter to God',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_letter', 'src_postmaster'] }, { attempt: 1, keys: ['src_money', 'src_irony'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_hundred', 'sb_house', 'sb_not_mail', 'sb_wife'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_coins', 'sa_collection', 'sa_no_surprise', 'sa_irony_crooks', 'sa_literate'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_hero', 'la_irony'] }, { attempt: 1, keys: ['la_diary', 'la_faith'] }] },
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
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the story; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on the title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the story\'s events',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
