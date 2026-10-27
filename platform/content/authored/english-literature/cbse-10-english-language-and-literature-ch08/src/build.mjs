// Build CBSE 10 English Language and Literature ch08 "Glimpses of India" (Part I: A Baker from Goa,
// Lucio Rodrigues; Part II: Coorg, Lokesh Abrol; Part III: Tea from Assam, Arup Kumar Datta). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch08/src/build.mjs
// LITERATURE RULE: everything here is SOYL's own summary, analysis and commentary; none of the three pieces
// is quoted or closely paraphrased. Students read the chapter in First Flight.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch08', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = '**Read the chapter itself in your textbook, *First Flight* (NCERT).** This lesson is SOYL\'s explanation and analysis; it does not reproduce the text.';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the board paper', 'Question form', 'Marks'],
  [
    ['Reference to context', 'an extract with short questions (answer A or B)', '5'],
    ['Short answer (First Flight)', '40–50 words, any 4 of 5', '3 each'],
    ['Long answer', '100–120 words: theme, comparison, article, diary or opinion', '6'],
  ],
  'Table of how a First Flight prose lesson is examined: a five-mark reference to context extract, three-mark short answers of forty to fifty words, and a six-mark long answer of one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section C (literature).',
);
const vOverview = table(
  ['Piece', 'Writer', 'Region', 'Kind of writing'],
  [
    ['*A Baker from Goa*', 'Lucio Rodrigues', 'Goa (west coast)', 'personal memoir'],
    ['*Coorg*', 'Lokesh Abrol', 'Kodagu, Karnataka (Western Ghats)', 'travel writing'],
    ['*Tea from Assam*', 'Arup Kumar Datta', 'Upper Assam (north-east)', 'short story with facts and legends'],
  ],
  'Table of the three pieces: A Baker from Goa by Lucio Rodrigues, a personal memoir set in Goa; Coorg by Lokesh Abrol, travel writing about Kodagu in Karnataka; Tea from Assam by Arup Kumar Datta, a short story with facts and legends set in Upper Assam.',
  'Glimpses of India: three regions, three kinds of writing.',
);
const vBakerFacts = table(
  ['About Part I', ''],
  [
    ['Piece', '*A Baker from Goa* by Lucio Rodrigues, a Goan writer'],
    ['Kind', 'a personal memoir, first person, looking back on childhood'],
    ['Setting', 'Goa, once ruled by Portugal (until 1961); its villages and their bakers'],
    ['Key words', '*pader* (baker), *kabai* (his old dress), *bol* (sweet bread), *bolinhas* (coconut cookies)'],
  ],
  'Table of facts about Part One: A Baker from Goa by the Goan writer Lucio Rodrigues, a first-person memoir set in Goa, once ruled by Portugal until 1961; key words pader, kabai, bol and bolinhas.',
);
const vBakerStages = flow('LR', ['Elders miss the Portuguese loaves', 'The pader still bakes', 'Childhood: the baker\'s daily visits', 'Bread for every occasion', 'Dress, accounts and prosperity'], 'Flow of A Baker from Goa: elders miss the Portuguese loaves; the pader still bakes; the baker\'s daily visits in the writer\'s childhood; bread for every occasion; the baker\'s dress, accounts and prosperity.', 'A Baker from Goa in five stages (SOYL summary).');
const vOccasions = table(
  ['Occasion', 'What the baker supplies'],
  [
    ['Marriage gifts', '*bol*, a sweet bread'],
    ['A daughter\'s engagement', 'bread for the sandwiches her mother makes'],
    ['Christmas and other festivals', 'cakes and *bolinhas*'],
    ['Children\'s daily treat', 'bread-bangles and sweet bread'],
    ['Every household', 'loaves, bought by the servants'],
  ],
  'Table of occasions and what the baker supplies: bol for marriage gifts, bread for engagement sandwiches, cakes and bolinhas for Christmas, bread-bangles for children, and loaves for every household.',
  'Why every Goan village needs its baker.',
);
const vWordsBaker = table(
  ['Word', 'Meaning'],
  [
    ['pader', 'the traditional baker of Goa'],
    ['kabai', 'the baker\'s old knee-length, one-piece frock'],
    ['bol', 'a sweet bread essential to Goan marriage gifts'],
    ['nostalgic', 'longing fondly for the past'],
    ['heralding', 'announcing the arrival of'],
    ['rebuke', 'a sharp expression of disapproval'],
    ['physique', 'the form and size of a person\'s body'],
    ['testimony', 'evidence or proof'],
  ],
  'Table of word meanings for A Baker from Goa: pader, kabai, bol, nostalgic, heralding, rebuke, physique and testimony.',
  'Words for this piece with their meanings.',
);
const vCoorgFacts = table(
  ['About Part II', ''],
  [
    ['Piece', '*Coorg* by Lokesh Abrol'],
    ['Kind', 'travel writing: descriptive, admiring, informative'],
    ['Place', 'Coorg (Kodagu), the smallest district of Karnataka, between Mysore and Mangalore'],
    ['Land', 'rolling hills; evergreen rainforest over about 30 per cent of the district; coffee and spices'],
    ['Seasons', 'heavy monsoon rain; best season September to March'],
    ['People', 'the Kodavus: hospitable, brave, with a martial tradition'],
  ],
  'Table of facts about Part Two: Coorg by Lokesh Abrol, travel writing about Kodagu, the smallest district of Karnataka, between Mysore and Mangalore; hills, rainforest over about thirty per cent of the district, coffee and spices; heavy monsoon, best season September to March; the Kodavu people.',
);
const vCoorgStages = flow('LR', ['Where Coorg is', 'Climate and seasons', 'The Kodavus', 'The Kaveri and its wildlife', 'Adventure and sights'], 'Flow of Coorg in five parts: where Coorg is; climate and seasons; the Kodavus; the Kaveri and its wildlife; adventure and sights.', 'Coorg in five parts (SOYL summary).');
const vOrigins = table(
  ['Theory of Kodavu origin', 'The story', 'Evidence offered'],
  [
    ['Greek', 'soldiers of Alexander\'s army settled here when they could not return home', 'martial traditions; marriage and religious rites distinct from the Hindu mainstream'],
    ['Arab', 'descent from Arab peoples', 'the *kuppia*, a long black coat with an embroidered waist-belt, resembles the Arab and Kurdish *kuffia*'],
  ],
  'Table of the two theories of Kodavu origin: Greek, from soldiers of Alexander\'s army, supported by martial traditions and distinct rites; and Arab, supported by the resemblance of the kuppia coat to the kuffia.',
  'Two theories, neither proven.',
);
const vWordsCoorg = table(
  ['Word', 'Meaning'],
  [
    ['martial', 'relating to war or fighting'],
    ['descent', 'family origin or ancestry'],
    ['valour', 'great courage in danger'],
    ['hospitality', 'friendly welcome to guests'],
    ['canopy', 'the layer formed by the tops of trees'],
    ['mahout', 'a person who looks after and rides an elephant'],
    ['panoramic', 'giving a wide view of a whole area'],
    ['rappelling', 'coming down a rock face on a rope'],
  ],
  'Table of word meanings for Coorg: martial, descent, valour, hospitality, canopy, mahout, panoramic and rappelling.',
  'Words for this piece with their meanings.',
);
const vTeaFacts = table(
  ['About Part III', ''],
  [
    ['Piece', '*Tea from Assam* by Arup Kumar Datta, an Assamese writer of stories for young readers'],
    ['Kind', 'short story in the third person, with dialogue, facts and legends'],
    ['Characters', 'Rajvir (a curious visitor from Delhi), his classmate Pranjol, Pranjol\'s parents (Mr Barua manages the tea garden)'],
    ['Setting', 'a train journey to Upper Assam; Mariani junction; the Dhekiabari tea estate'],
  ],
  'Table of facts about Part Three: Tea from Assam by Arup Kumar Datta, a third-person short story with dialogue, facts and legends; characters Rajvir, Pranjol and Pranjol\'s parents, with Mr Barua managing the garden; set on a train to Upper Assam, at Mariani junction and the Dhekiabari tea estate.',
);
const vTeaStages = flow('LR', ['Tea on the train', 'The first sight of the gardens', 'Two legends and some history', 'Met at Mariani', 'Dhekiabari and the second flush'], 'Flow of Tea from Assam: tea on the train; the first sight of the gardens; two legends and some history; met at Mariani; Dhekiabari and the second flush.', 'Tea from Assam in five stages (SOYL summary).');
const vLegends = table(
  ['Story or fact', 'In SOYL\'s words'],
  [
    ['Chinese legend', 'leaves from the fire under an emperor\'s pot fell into his boiling water and flavoured it'],
    ['Indian legend', 'Bodhidharma cut off his eyelids to stay awake; ten tea plants grew from them'],
    ['Earliest tea', 'drunk in China around 2700 BC; *tea*, *chai* and *chini* come from Chinese'],
    ['Tea in Europe', 'arrived in the sixteenth century, drunk at first as a medicine'],
    ['Assam today', 'more tea plantations close together than anywhere else in the world'],
    ['Second flush', 'May to July: the sprouting season that gives the best tea'],
  ],
  'Table of tea legends and facts from the story: the Chinese legend of leaves falling into an emperor\'s boiling water; the Indian legend of Bodhidharma\'s eyelids; tea first drunk in China around 2700 BC; reaching Europe in the sixteenth century as medicine; Assam\'s many plantations; and the second flush from May to July.',
);
const vCompare = table(
  ['', '*A Baker from Goa*', '*Coorg*', '*Tea from Assam*'],
  [
    ['Region', 'Goa, west coast', 'Kodagu, Karnataka', 'Upper Assam, north-east'],
    ['Focus', 'a traditional trade', 'land, people and nature', 'an industry and its history'],
    ['Narration', 'first person, memory', 'descriptive, guide-like', 'third person, story with dialogue'],
    ['Tone', 'nostalgic, humorous', 'admiring, lyrical', 'light, informative'],
    ['Cultural feature', 'bread in every celebration', 'martial Kodavu traditions', 'tea legends and plantation life'],
  ],
  'Comparison table of the three pieces: regions Goa, Kodagu and Upper Assam; focus on a trade, on land and people, and on an industry; first-person memory, descriptive guide, and third-person story; tones nostalgic and humorous, admiring and lyrical, and light and informative; cultural features of bread in celebrations, Kodavu martial traditions, and tea legends and plantation life.',
);
const vWordsTea = table(
  ['Word', 'Meaning'],
  [
    ['plantation', 'a large estate where one crop is grown'],
    ['legend', 'a traditional story, not proven to be true'],
    ['ascetic', 'a person who gives up comforts for religious reasons'],
    ['beverage', 'a drink'],
    ['pruned', 'trimmed by cutting off branches'],
    ['flush', 'a period when new tea leaves sprout'],
  ],
  'Table of word meanings for Tea from Assam: plantation, legend, ascetic, beverage, pruned and flush.',
  'Words for this piece with their meanings.',
);
const vLongPlan = flow('LR', ['State the shared idea', 'Piece 1: feature + detail', 'Piece 2: feature + detail', 'Piece 3: feature + detail', 'Conclusion: India\'s variety'], 'Flow for planning a six-mark comparison of the three pieces: state the shared idea, give a feature and detail from each piece, and conclude on India\'s variety.');

// ---------------------------------------------------------------- deck, Part 1
const D1 = deck({
  part: 1,
  title: 'Glimpses of India — Part 1: A Baker from Goa (Lucio Rodrigues)',
  goals: [
    'Retell the main ideas of *A Baker from Goa* in sequence, in your own words',
    'Describe the cultural features of Goa shown through the baker',
    'Identify the nostalgic, humorous tone of the piece',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Glimpses of India — Part 1: A Baker from Goa', {
      b: `*First Flight*, prose · three pieces about three regions · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. Glimpses of India is three short pieces about three very different regions: Goa, Coorg and Assam. In this first part, we study A Baker from Goa. Before anything else, please read the chapter itself in your textbook, First Flight. This lesson does not repeat the text. We will understand its ideas, its picture of Goan culture, its tone, and how to answer board questions.',
    }),
    sl('concept', 'The chapter at a glance', {
      b: 'Three regions, three writers, three kinds of writing. Part 1 covers Goa, Part 2 Coorg, Part 3 Assam and a comparison of all three.',
      v: vOverview,
      n: 'Here is the whole chapter at a glance. A Baker from Goa is a personal memoir of childhood. Coorg is travel writing about a hill district of Karnataka. Tea from Assam is a short story that mixes dialogue, facts and legends. In exams, you may be asked about one piece, or to compare the three. Read all three in your textbook, once each, before using these slides.',
    }),
    sl('concept', 'The piece and its setting', {
      v: vBakerFacts,
      n: 'A Baker from Goa is by the Goan writer Lucio Rodrigues. It is a memoir, so the writer speaks in the first person and looks back on his own childhood. Goa was ruled by Portugal for centuries, until nineteen sixty-one, and the Portuguese brought their bread with them. Learn four Goan words: pader, the baker; kabai, his old dress; bol, a sweet bread; and bolinhas, coconut cookies.',
    }),
    sl('diagram', 'The piece in five stages', {
      b: 'From the Portuguese past to the writer\'s childhood to the baker\'s place in village life. (A SOYL summary, not the text.)',
      v: vBakerStages,
      n: 'The piece moves in five stages. Older Goans miss the famous loaves of Portuguese times. Yet the pader still bakes today. The writer remembers the baker\'s daily visits in his childhood. He explains how bread is needed for every occasion. And finally he describes the baker\'s dress, his way of keeping accounts, and how well the trade paid. Keep this map in mind.',
    }),
    sl('concept', 'Summary 1: the Portuguese past and the pader today', {
      b: 'Older Goans look back fondly on the days of Portuguese rule and especially on its bread. The rulers are gone, but the bread-makers remain: traditional furnaces are still in use, the baker\'s bamboo staff still announces him in some villages, and sons often continue their fathers\' trade. Goans still call the baker a *pader*.',
      n: 'In your own words, the piece begins with nostalgia. Older Goans remember the Portuguese days and their famous bread. The Portuguese have gone, but the bakers have not. Their furnaces are still lit, the sound of the baker\'s bamboo staff can still be heard in some villages, and often a son carries on his father\'s trade. In Goa, such a baker is still called a pader.',
    }),
    sl('concept', 'Summary 2: the baker in the writer\'s childhood', {
      b: 'In the writer\'s childhood, the baker came at least twice a day: on his morning round and on his way back with an empty basket. The children ran to meet him at the sound of his staff, not for the loaves, which the servants bought, but for bread-bangles and sweet bread. Pushed aside, they climbed up to peep into his basket. The writer jokes that children hardly bothered to clean their teeth.',
      n: 'Next, the writer remembers his childhood. The baker came at least twice a day. At the sound of his bamboo staff, the children ran out to greet him. They did not care about the loaves, which the servants bought. They wanted the bread-bangles and sweet bread. Pushed aside by the adults, they climbed up to peep into his basket. The memories are fond and funny.',
    }),
    sl('check', 'Check: the baker\'s visit in order', {
      chk: 'ord_baker',
      n: 'Your turn. Six moments from the baker\'s morning visit are shuffled. Put them in the order the writer remembers them, from the first sound of the bamboo staff to the children peeping into the basket.',
    }),
    sl('concept', 'Summary 3: bread, dress, accounts and prosperity', {
      b: 'Bread is part of every celebration: *bol* for marriage gifts, sandwiches for a daughter\'s engagement, cakes and *bolinhas* for Christmas. So every village needs its baker\'s furnace. Bakers once wore the *kabai*, a knee-length frock; later, shirts with knee-length trousers, a style still jokingly linked with bakers. Accounts were kept in pencil on a wall and paid monthly. The trade paid well, and bakers looked well-fed and prosperous.',
      n: 'The last stage explains the baker\'s place in village life. Bread is needed for every celebration, from marriage gifts of sweet bol, to engagement sandwiches, to Christmas cakes. Bakers once wore a knee-length frock called the kabai. They kept monthly accounts in pencil on a wall. And the trade paid well: bakers and their families never went hungry, and they looked it.',
    }),
    sl('concept', 'Bread for every occasion', {
      v: vOccasions,
      n: 'This table shows why the baker matters so much. Marriage gifts need bol. A mother needs bread for the sandwiches at her daughter\'s engagement. Christmas and other festivals need cakes and bolinhas. Children want their bread-bangles, and every household buys loaves. Bread runs through Goan social and religious life, so a village without a baker would feel incomplete.',
    }),
    sl('check', 'Check: what the children wanted', {
      chk: 'mc_bangles',
      n: 'Check yourself. When the baker came, what did the children want most? Remember who bought the loaves.',
    }),
    sl('two-column', 'Theme: tradition and change', {
      b: 'The piece is about a tradition that has outlived the rulers who began it.',
      cols: [
        '**What has changed**\n\n- Portuguese rule has ended\n- the *kabai* has given way to shirts and knee-length trousers\n- the elders\' favourite loaves are a memory',
        '**What survives**\n\n- the furnaces and the bakers\n- the sound of the bamboo staff in some villages\n- bread at every celebration; the name *pader*',
      ],
      n: 'The main theme is tradition and change. Some things have changed: Portuguese rule is over, the baker\'s dress has changed, and the elders\' favourite loaves are now a memory. But much survives: the furnaces, the bakers themselves, the sound of the bamboo staff in some places, and bread at every Goan celebration. A tradition can outlive the people who started it.',
    }),
    sl('example', 'Tone: nostalgic and humorous (SOYL\'s own examples)', {
      b: 'Rodrigues writes with **nostalgia** (fond longing for the past) and **gentle humour**. These lines are SOYL\'s own, showing the same tones:',
      bl: [
        '*Those summer evenings at my grandmother\'s house still smell of jasmine and frying pakoras.* — nostalgia',
        '*We never did our homework before the ice-cream man had come and gone; priorities were priorities.* — gentle humour',
        '*The old cinema is a mall now, but I can still hear the creak of its wooden seats.* — nostalgia with a sense of change',
      ],
      n: 'Rodrigues writes with nostalgia and gentle humour. Here are lines of our own showing the same tones. Those summer evenings at my grandmother\'s house still smell of jasmine and pakoras: that is nostalgia. We never did homework before the ice-cream man had come and gone: that is gentle humour. Now find similar moments in your textbook, such as the joke about brushing teeth.',
    }),
    sl('check', 'Check: why the furnace is essential', {
      chk: 'ar_bread',
      n: 'Try this assertion and reason item. Decide whether each statement is true, and whether the reason really explains why every Goan village needs its baker.',
    }),
    sl('concept', 'Word meanings', {
      v: vWordsBaker,
      n: 'Learn these words for this piece. A pader is a Goan baker, and a kabai was his old knee-length frock. Bol is a sweet bread for marriage gifts. Nostalgic means fondly longing for the past. Heralding means announcing. A rebuke is a scolding. Physique means body shape. And testimony means proof, like the baker\'s well-fed look proving his trade was profitable.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Older Goans miss the Portuguese loaves; the *pader* still bakes, often son after father.',
        'Childhood: the baker came twice a day; children wanted bread-bangles, not loaves.',
        'Bread for every occasion: *bol* (marriage gifts), sandwiches (engagements), cakes and *bolinhas* (Christmas).',
        'The *kabai*; accounts on a wall, paid monthly; a profitable trade.',
        'Tone: nostalgic and humorous. Read the piece in *First Flight*.',
      ],
      v: vBakerStages,
      n: 'Let us sum up. Older Goans miss the Portuguese loaves, but the pader still bakes. In the writer\'s childhood, the baker came twice a day and the children wanted bread-bangles. Bread marks every celebration. The baker wore the kabai, kept accounts on a wall, and prospered. The tone is nostalgic and humorous. Remember to read the piece in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        '3-mark answers (40–50 words): point + detail + explanation.',
        'Learn the Goan words exactly: *pader*, *kabai*, *bol*, *bolinhas*.',
        'Facts often confused: the servants bought the loaves; bills were paid monthly, not daily.',
        'Tone questions: nostalgic and humorous, with one detail for each.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. In three mark answers, give a point, a detail and an explanation. Learn the Goan words exactly, because they are often tested. Remember that the servants bought the loaves, and that bills were paid monthly. And for tone questions, say nostalgic and humorous, and give one detail for each.',
    }),
  ],
});

// ---------------------------------------------------------------- deck, Part 2
const D2 = deck({
  part: 2,
  title: 'Glimpses of India — Part 2: Coorg (Lokesh Abrol)',
  goals: [
    'Retell the main features of Coorg described in the piece, in your own words',
    'Describe the land, wildlife and people (the Kodavus) of Coorg',
    'Identify the features of travel writing and the admiring tone',
    'Answer extract-based, short and long questions within the word limits',
  ],
  slides: [
    sl('title', 'Glimpses of India — Part 2: Coorg', {
      b: `*First Flight*, prose · Part 2: *Coorg* by Lokesh Abrol.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Now we travel to Coorg, a hill district in Karnataka, through a piece by Lokesh Abrol. Please read it in your textbook, First Flight, before you continue. This lesson does not repeat the text. We will look at the land, the wildlife, the Kodavu people, the features of travel writing, and how to answer board questions.',
    }),
    sl('concept', 'The piece and the place', {
      v: vCoorgFacts,
      n: 'Coorg, also called Kodagu, is the smallest district of Karnataka, lying between Mysore and the coastal city of Mangalore. It is a land of hills, evergreen rainforest, coffee and spices. The monsoon is very heavy, so the best time to visit is from September to March. The piece describes all this with open admiration, like a travel writer inviting us to come.',
    }),
    sl('diagram', 'The piece in five parts', {
      b: 'A guided tour: place, seasons, people, river and wildlife, adventure. (A SOYL summary, not the text.)',
      v: vCoorgStages,
      n: 'The piece reads like a guided tour in five parts. First, where Coorg is. Second, its climate and seasons. Third, its people, the Kodavus. Fourth, the river Kaveri and its wildlife. And fifth, the adventures and sights waiting for visitors. Keep this map in mind as we go through each part.',
    }),
    sl('concept', 'Summary 1: land and seasons', {
      b: 'Abrol presents Coorg as a beautiful hill country. Evergreen rainforest covers about thirty per cent of the district. The monsoon rain is heavy enough to keep many visitors away, and the pleasant season runs from September to March, with only occasional showers. Coffee estates and old colonial bungalows stand among the trees.',
      n: 'The piece opens with the land. Coorg is described as a place of great natural beauty. Rainforest covers about a third of the district. The monsoon is heavy, so many visitors stay away then. From September to March the weather is pleasant, with only some showers. Coffee estates and old colonial bungalows sit among the trees.',
    }),
    sl('concept', 'Summary 2: the Kodavus', {
      b: 'The Kodavus are proud, independent people, possibly of Greek or Arab descent. Their homes are known for hospitality and for stories of brave sons and fathers. The Coorg Regiment is among the most decorated in the Indian Army; General Cariappa, the first Indian to head the Indian Army, was a Kodavu; and Kodavus are the only people in India allowed to carry firearms without a licence.',
      n: 'Next come the people. The Kodavus are proud and independent, and two theories, Greek and Arab, are offered for their origin. They are famous for hospitality, and for courage. The Coorg Regiment is one of the Indian Army\'s most decorated, General Cariappa, the first Indian to head the army, was a Kodavu, and Kodavus may carry firearms without a licence.',
    }),
    sl('concept', 'Where did the Kodavus come from?', {
      v: vOrigins,
      n: 'There are two theories about the Kodavus\' origin. The Greek theory says part of Alexander\'s army settled here when going home became impossible, and points to their martial traditions and distinct customs. The Arab theory points to their long black coat, the kuppia, which looks like the kuffia worn by Arabs and Kurds. Remember: these are theories, not proven facts.',
    }),
    sl('check', 'Check: the Kodavu coat', {
      chk: 'mc_kodavu_coat',
      n: 'Check yourself. The Kodavus wear a long black coat called the kuppia. What is it said to resemble, and which theory does that support?',
    }),
    sl('concept', 'Summary 3: the Kaveri and its wildlife', {
      b: 'The river Kaveri draws its water from Coorg\'s hills and forests. Its clear waters hold the mahaseer, a large freshwater fish. Kingfishers dive for fish, squirrels and langurs play in the trees, and elephants get a wash in the river from their mahouts. The forest is home to macaques and langurs, the Malabar squirrel, the shy slender loris, and countless birds and butterflies.',
      n: 'The third part is about the river and wildlife. The Kaveri gets its water from Coorg\'s hills and forests, and its clear pools hold a big fish called the mahaseer. Kingfishers dive, squirrels and langurs play, and elephants enjoy being bathed by their mahouts. The forest is full of birds, butterflies, monkeys and the shy slender loris.',
    }),
    sl('concept', 'Summary 4: adventure and sights', {
      b: 'Coorg offers plenty for adventurous visitors: mountain biking, rock climbing, rappelling, canoeing and river rafting, as well as walking trails for trekkers. The Brahmagiri hills give a view over the whole district; a rope bridge leads to the island of Nisargadhama; and visitors may meet Buddhist monks from Bylakuppe, India\'s largest Tibetan settlement.',
      n: 'Finally, adventure and sights. Coorg offers mountain biking, rock climbing, rappelling, canoeing, river rafting and trekking. A climb up the Brahmagiri hills gives a view over the whole district. A rope bridge leads to the island of Nisargadhama. And visitors may meet Buddhist monks from Bylakuppe, the largest Tibetan settlement in India.',
    }),
    sl('check', 'Check: the monsoon in Coorg', {
      chk: 'ar_monsoon',
      n: 'Try this assertion and reason item. Read both statements about Coorg\'s weather carefully, and decide whether each is true.',
    }),
    sl('two-column', 'Theme: a land and its people', {
      b: 'Coorg is shown as remarkable for both its nature and its people.',
      cols: [
        '**The land**\n\n- hills, rainforest, coffee and spices\n- the Kaveri and the mahaseer\n- elephants, langurs, kingfishers, the slender loris',
        '**The people**\n\n- the Kodavus, possibly of Greek or Arab descent\n- famous hospitality and stories of valour\n- the Coorg Regiment; General Cariappa',
      ],
      n: 'The main theme is that Coorg is special in two ways. The land is rich: hills, forest, coffee, a great river and wonderful wildlife. The people are just as remarkable: the Kodavus, with their mysterious origins, their hospitality and their proud military tradition. In long answers, cover both the land and the people, with details for each.',
    }),
    sl('concept', 'Style: features of travel writing', {
      bl: [
        '**Admiring description:** Coorg is presented as almost heavenly.',
        '**Vivid detail:** colours, smells, sounds and creatures.',
        '**Practical facts:** location, size, seasons, how much forest.',
        '**History and legend:** the theories of Kodavu origin.',
        '**An invitation:** adventure for the energetic, calm for the rest.',
      ],
      n: 'Coorg is a good example of travel writing. It describes the place with admiration, almost as a paradise. It uses vivid details of colours, smells and creatures. It gives practical facts like location and seasons. It mixes in history and legend. And it ends up as an invitation, offering adventure for the energetic and quiet beauty for everyone else.',
    }),
    sl('example', 'Writing like a travel writer: SOYL\'s own examples', {
      b: 'Travel writers combine **vivid description**, **practical facts** and **mild exaggeration**. These lines are SOYL\'s own, about an imaginary hill town:',
      bl: [
        '*Morning mist pours down the valley like milk, and the tea stalls fill with the smell of ginger.* — vivid description with a simile',
        '*The town lies four hours by road from the nearest airport; visit between October and February.* — practical facts',
        '*Every bend in the road seems to reveal a view more beautiful than the last.* — mild exaggeration',
      ],
      n: 'Here are travel-writing lines of our own, about an imaginary hill town. Morning mist pours down the valley like milk: vivid description with a simile. The town lies four hours from the airport; visit between October and February: practical facts. Every bend reveals a view more beautiful than the last: mild exaggeration. Abrol uses all three. Find them in your textbook.',
    }),
    sl('check', 'Check: choosing a destination', {
      chk: 'mc_apply_coorg',
      n: 'Check yourself. A school wants a trip with adventure sports, wildlife and a Tibetan settlement. Which place from the chapter suits it best?',
    }),
    sl('concept', 'Word meanings', {
      v: vWordsCoorg,
      n: 'Learn these words for Coorg. Martial means relating to fighting. Descent means family origin. Valour is great courage. Hospitality is a warm welcome to guests. A canopy is the roof formed by treetops. A mahout looks after an elephant. Panoramic means giving a wide view. And rappelling means coming down a rock face on a rope.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Coorg (Kodagu): smallest district of Karnataka, between Mysore and Mangalore; rainforest, coffee, spices.',
        'Heavy monsoon; best season September to March.',
        'Kodavus: Greek or Arab origin (theories); hospitality; valour; the Coorg Regiment; General Cariappa; firearms without licence.',
        'The Kaveri and the mahaseer; elephants, langurs, kingfishers; adventure sports; Brahmagiri, Nisargadhama, Bylakuppe.',
        'Style: admiring travel writing. Read the piece in *First Flight*.',
      ],
      v: vCoorgStages,
      n: 'Let us sum up. Coorg is the smallest district of Karnataka, rich in forest, coffee and spices, best visited from September to March. Its people, the Kodavus, may be of Greek or Arab descent and are known for hospitality and courage. The Kaveri, its wildlife and its adventure sports complete the picture. The style is admiring travel writing. Read the piece in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        'Learn names exactly: Kodagu, Kodavus, *kuppia*, Kaveri, mahaseer, Brahmagiri, Nisargadhama, Bylakuppe.',
        'Origin questions: present both theories as theories, each with its evidence.',
        'Facts often confused: the best season is September to March; Cariappa was the first Indian to head the army.',
        'Long answers: cover both the land and the people.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. Learn the names exactly, because spelling matters. For origin questions, present both theories as theories, each with its evidence. Remember the best season is September to March. And in long answers about Coorg, always cover both the land and the people.',
    }),
  ],
});

// ---------------------------------------------------------------- deck, Part 3
const D3 = deck({
  part: 3,
  title: 'Glimpses of India — Part 3: Tea from Assam (Arup Kumar Datta) and comparing the pieces',
  goals: [
    'Retell the events of *Tea from Assam* in sequence, in your own words',
    'Explain the legends and facts about tea in the story',
    'Compare Rajvir and Pranjol',
    'Compare the regions and tones of the three pieces',
  ],
  slides: [
    sl('title', 'Glimpses of India — Part 3: Tea from Assam', {
      b: `*First Flight*, prose · Part 3: *Tea from Assam* by Arup Kumar Datta, and comparing all three pieces.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part three. Now we travel to the tea gardens of Assam with two schoolboys, in a story by Arup Kumar Datta. Then we compare all three pieces of Glimpses of India. Please read the story in your textbook, First Flight, first. This lesson does not repeat the text; it explains the events, the facts and legends, the characters and the comparison.',
    }),
    sl('concept', 'The story and its setting', {
      v: vTeaFacts,
      n: 'Tea from Assam is a short story told in the third person. Rajvir, a boy from Delhi, travels with his classmate Pranjol to Pranjol\'s home in Upper Assam, where Pranjol\'s father, Mr Barua, manages a tea garden. The story mixes the boys\' conversation with facts and legends about tea. The places to remember are Mariani junction and the Dhekiabari tea estate.',
    }),
    sl('diagram', 'The story in five stages', {
      b: 'A journey that is also a lesson about tea. (A SOYL summary, not the text.)',
      v: vTeaStages,
      n: 'The story moves in five stages. The boys drink tea on the train. Rajvir sees the tea gardens for the first time. He tells Pranjol two legends and some history of tea. Pranjol\'s parents meet them at Mariani junction. And on the drive to Dhekiabari, Rajvir impresses Mr Barua with what he knows about the tea season.',
    }),
    sl('concept', 'Summary 1: the journey', {
      b: 'Rajvir and Pranjol, classmates in Delhi, travel by train to Pranjol\'s home in Upper Assam for the summer vacation. At a station they buy tea from a vendor, and Rajvir shares a fact: over eighty crore cups of tea are drunk around the world every day. Pranjol is absorbed in a detective novel. Soon Rajvir sees tea bushes stretching into the distance, shaded by tall trees, with pluckers at work and a factory\'s chimneys smoking.',
      n: 'The story begins on a train. Rajvir is going with his classmate Pranjol to spend the summer vacation on a tea estate in Assam. They buy tea at a station, and Rajvir says the world drinks over eighty crore cups every day. Pranjol keeps reading his detective novel. Then Rajvir sees tea gardens stretching into the distance, and he is thrilled.',
    }),
    sl('concept', 'Summary 2: legends and history of tea', {
      b: 'Pranjol explains that Assam has more tea plantations close together than anywhere in the world. Rajvir, who has read about tea, tells two legends of its discovery and adds some history.',
      v: vLegends,
      n: 'Pranjol tells Rajvir that Assam has more tea plantations than anywhere else in the world. Rajvir then shares what he has read. In a Chinese legend, leaves fell into an emperor\'s boiling water by accident. In an Indian legend, the monk Bodhidharma cut off his eyelids to stay awake, and tea plants grew from them. Tea reached Europe in the sixteenth century, as a medicine.',
    }),
    sl('concept', 'Summary 3: Dhekiabari and the second flush', {
      b: 'Pranjol\'s parents meet the boys at Mariani junction and drive them to Dhekiabari, the estate Pranjol\'s father manages. Tea bushes clipped to an even height line the road; pluckers with baskets on their backs pick the new leaves; a tractor carries a load of leaves. Rajvir names the season, the second flush, from May to July, which gives the best tea. Mr Barua is surprised by his preparation; Rajvir says he hopes to learn more.',
      n: 'At Mariani junction, Pranjol\'s parents meet the boys and drive them to the Dhekiabari tea estate. Neat rows of tea bushes line the road, and pluckers with baskets on their backs are picking new leaves. Rajvir explains that this is the second flush, from May to July, which gives the best tea. Mr Barua is impressed, and Rajvir modestly says he hopes to learn more.',
    }),
    sl('check', 'Check: the story in order', {
      chk: 'ord_tea',
      n: 'Your turn. Six events from Tea from Assam are shuffled. Put them in order, from tea at the station to Mr Barua\'s comment about Rajvir\'s homework.',
    }),
    sl('two-column', 'Characters: Rajvir and Pranjol', {
      b: 'Two boys see the same view very differently.',
      cols: [
        '**Rajvir**\n\n- curious and well-read about tea\n- excited by his first sight of the gardens\n- shares facts and legends; impresses Mr Barua\n- modest: wants to learn more',
        '**Pranjol**\n\n- born and brought up on a plantation\n- finds the gardens ordinary\n- absorbed in a detective novel\n- shares one fact about Assam, then leaves the talking to Rajvir',
      ],
      n: 'Compare the two boys. Rajvir is curious, well-read and excited; he shares facts and legends and impresses Mr Barua, yet he is modest. Pranjol grew up on a plantation, so the gardens are ordinary to him, and he prefers his detective novel. The contrast shows how familiarity can dull our interest, while a curious visitor sees everything fresh.',
    }),
    sl('check', 'Check: why Pranjol is not excited', {
      chk: 'mc_pranjol',
      n: 'Check yourself. Why does Pranjol show so little interest in the tea gardens that thrill Rajvir?',
    }),
    sl('concept', 'Comparing the three pieces', {
      v: vCompare,
      n: 'Now let us compare all three pieces. They cover three regions: Goa on the west coast, Kodagu in Karnataka, and Upper Assam in the north-east. One focuses on a trade, one on land and people, and one on an industry. One is a memory in the first person, one a guide-like description, one a story. And their tones differ: nostalgic, admiring, and light and informative.',
    }),
    sl('two-column', 'What the chapter shows about India', {
      cols: [
        '**Variety**\n\n- three landscapes: coast, hills, plains of tea\n- three cultures: Portuguese-influenced Goa, martial Kodavus, tea-garden Assam\n- three livelihoods: baking, coffee and tourism, tea',
        '**Shared threads**\n\n- pride in local tradition\n- food and drink at the heart of culture (bread, coffee, tea)\n- the past alive in the present',
      ],
      n: 'What does the chapter show about India? Variety, first of all: three landscapes, three cultures and three ways of making a living. But there are shared threads too. Each piece shows pride in local tradition, each puts food or drink at the heart of culture, with bread, coffee and tea, and each shows the past alive in the present.',
    }),
    sl('check', 'Check: matching the tones', {
      chk: 'mt_tones',
      n: 'Try this matching item. Match each piece with the description of its tone and style. Think about who is speaking in each, and why.',
    }),
    sl('concept', 'Word meanings', {
      v: vWordsTea,
      n: 'Learn these words for Tea from Assam. A plantation is a large estate growing one crop. A legend is a traditional story that may not be true. An ascetic gives up comforts for religious reasons, like Bodhidharma. A beverage is a drink. Pruned means trimmed. And a flush is a period when new tea leaves sprout.',
    }),
    sl('example', 'Worked example: planning a 6-mark comparison', {
      b: '*Question:* *Glimpses of India shows the rich variety of India.* Discuss with reference to all three pieces.',
      v: vLongPlan,
      bl: [
        '**Shared idea:** each piece shows a different region and culture.',
        '**Goa:** Portuguese-influenced bread culture; the *pader*; nostalgic tone.',
        '**Coorg:** forests, coffee, the Kaveri; the martial Kodavus; admiring tone.',
        '**Assam:** tea gardens, legends and history; a curious visitor; light tone.',
        '**Conclusion:** different food, landscape, history and people, one country.',
      ],
      n: 'Here is how to plan a comparison answer on all three pieces. State the shared idea: each shows a different region. Then give one cultural feature and the tone for Goa, for Coorg and for Assam. End with a conclusion about India\'s variety. Keep each piece to about thirty words, and the whole answer will fit within one hundred and twenty.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Rajvir visits Pranjol\'s tea estate in Upper Assam; eighty crore cups a day; Pranjol absorbed in his novel.',
        'Legends: leaves in the Chinese emperor\'s water; Bodhidharma\'s eyelids. History: China c. 2700 BC; Europe in the sixteenth century.',
        'Mariani junction; Dhekiabari; pluckers; the second flush (May to July); Mr Barua impressed.',
        'Rajvir curious and modest; Pranjol indifferent through familiarity.',
        'Three pieces, three regions, three tones. Read the chapter in *First Flight*.',
      ],
      v: vCompare,
      n: 'Let us sum up. Rajvir travels to Pranjol\'s tea estate in Assam, shares facts and legends about tea, and impresses Mr Barua with his knowledge of the second flush. Rajvir is curious and modest; Pranjol is indifferent through familiarity. Across the chapter, three pieces show three regions in three tones. Remember to read the whole chapter in your textbook.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Extract questions: answer from the passage first; quote at most a word or two.',
        'Learn names exactly: Rajvir, Pranjol, Mr Barua, Mariani, Dhekiabari, Bodhidharma.',
        'Facts often confused: Rajvir (not Pranjol) tells the legends; the second flush is May to July.',
        'Comparison answers: region + feature + tone for each piece, then a conclusion.',
        'Do not reproduce dialogue; report what characters say in your own words.',
      ],
      n: 'Exam tips. In extract questions, answer from the passage first. Learn the names exactly. Remember that Rajvir, not Pranjol, tells the legends, and that the second flush is from May to July. In comparison answers, give the region, a feature and the tone for each piece. And never reproduce dialogue: report what the characters say in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Glimpses of India — study notes',
  sections: [
    {
      h: '1. About the chapter',
      t: 1,
      b: `${READ}\n\n*Glimpses of India* brings together three short pieces about three regions: **Part I, *A Baker from Goa*** by Lucio Rodrigues, a personal memoir; **Part II, *Coorg*** by Lokesh Abrol, a piece of travel writing; and **Part III, *Tea from Assam*** by Arup Kumar Datta, a short story mixing dialogue, facts and legends.`,
      v: vOverview,
    },
    {
      h: '2. Part I: A Baker from Goa (in SOYL\'s words)',
      t: 1,
      b: '**The past and the present.** Older Goans miss the Portuguese era and its bread. The rulers are gone, but the bakers remain: furnaces are still lit, the bamboo staff still announces the baker in some villages, and sons often carry on the trade. The baker is still called a *pader*.\n\n**Childhood.** The baker came at least twice a day. Children ran to him for bread-bangles and sweet bread; servants bought the loaves. Pushed aside, the children climbed up to peep into the basket.\n\n**Bread in Goan life.** *Bol* is essential to marriage gifts; mothers make sandwiches for a daughter\'s engagement; Christmas needs cakes and *bolinhas*. Every village needs its baker\'s furnace.\n\n**Dress, accounts, prosperity.** Bakers once wore the *kabai*, a knee-length frock, and later shirts with knee-length trousers. Accounts were kept in pencil on a wall and paid monthly. The trade was profitable, and bakers looked well-fed.\n\n**Tone:** nostalgic and gently humorous.',
      vs: [vBakerStages, vOccasions],
      terms: [['Nostalgia', 'A fond, sometimes sad, longing for the past.']],
    },
    {
      h: '3. Part II: Coorg (in SOYL\'s words)',
      t: 1,
      b: '**The land.** Coorg (Kodagu), the smallest district of Karnataka, lies between Mysore and Mangalore. Rainforest covers about thirty per cent of it; coffee and spices grow there. The monsoon is heavy; the best season is September to March.\n\n**The people.** The Kodavus may be of Greek descent (from Alexander\'s soldiers) or Arab descent (their *kuppia* coat resembles the *kuffia*). They are known for hospitality and valour: the Coorg Regiment is among the Indian Army\'s most decorated, General Cariappa (the first Indian to head the army) was a Kodavu, and Kodavus may carry firearms without a licence.\n\n**River and wildlife.** The Kaveri draws its water from Coorg; the mahaseer lives in it. Kingfishers, squirrels, langurs, elephants with their mahouts, macaques, Malabar squirrels and the slender loris appear.\n\n**Adventure and sights.** Rafting, canoeing, rappelling, rock climbing, mountain biking, trekking; the Brahmagiri hills; the rope bridge to Nisargadhama; Buddhist monks from Bylakuppe, India\'s largest Tibetan settlement.\n\n**Tone:** admiring, descriptive travel writing.',
      vs: [vCoorgFacts, vOrigins],
      terms: [['Travelogue', 'Writing that describes a place and the experience of travelling there.']],
    },
    {
      h: '4. Part III: Tea from Assam (in SOYL\'s words)',
      t: 1,
      b: '**The journey.** Rajvir travels with his classmate Pranjol to Pranjol\'s home on a tea estate in Upper Assam. At a station they buy tea; Rajvir says over eighty crore cups are drunk worldwide every day. Pranjol reads a detective novel. Rajvir is thrilled by his first view of the tea gardens.\n\n**Legends and history.** Pranjol says Assam has more plantations close together than anywhere else. Rajvir tells the Chinese legend (leaves from the fire fell into an emperor\'s boiling water) and the Indian legend (Bodhidharma cut off his eyelids to stay awake; ten tea plants grew from them). Tea was drunk in China around 2700 BC and reached Europe in the sixteenth century, first as medicine.\n\n**Dhekiabari.** Pranjol\'s parents meet the boys at Mariani junction and drive to Dhekiabari, managed by Pranjol\'s father, Mr Barua. Pluckers pick new leaves; Rajvir identifies the second flush (May to July, the best tea). Mr Barua is impressed; Rajvir hopes to learn more.\n\n**Tone:** light, informative, conversational.',
      vs: [vTeaFacts, vLegends],
      terms: [['Flush', 'A period of new growth of tea leaves; the second flush (May to July) gives the best tea.']],
    },
    {
      h: '5. Themes: regional and cultural features',
      t: 2,
      b: '- **Goa:** a coastal culture shaped by Portuguese rule; bread in every celebration; the *pader* as a beloved figure; tradition outliving its origins.\n- **Coorg:** forest, coffee and spice country; the martial, hospitable Kodavus; the Kaveri and rich wildlife; adventure tourism.\n- **Assam:** the world\'s greatest cluster of tea plantations; tea legends and history; plantation life.\n\n**Message:** India is a country of great variety in landscape, food, history, livelihoods and people, and each region takes pride in its traditions.',
    },
    {
      h: '6. Comparing the three pieces: tone and narration',
      t: 2,
      b: '| | Narration | Tone |\n|---|---|---|\n| *A Baker from Goa* | first person, memory | nostalgic, humorous |\n| *Coorg* | descriptive, guide-like | admiring, lyrical |\n| *Tea from Assam* | third person, story with dialogue | light, informative |\n\nRajvir and Pranjol: Rajvir is curious, well-prepared and modest; Pranjol, raised on a plantation, is indifferent through familiarity.',
      v: vCompare,
      terms: [['Tone', 'The writer\'s attitude to the subject, as shown by the language.']],
    },
    {
      h: '7. Word meanings',
      t: 1,
      b: 'Words for the three pieces, with meanings. Learn the words; describe the sentences they appear in in your own words.',
      vs: [vWordsBaker, vWordsCoorg, vWordsTea],
    },
    {
      h: '8. Answering exam questions',
      t: 3,
      b: '**Extract-based (5 marks):** the board prints a passage from one piece; SOYL practice uses commentary passages instead. Answer from the passage, then from your knowledge of the chapter.\n\n**Short answers (3 marks, 40–50 words):** point + detail + explanation.\n\n**Long answers (6 marks, 100–120 words):** a clear stand or shared idea; three points with details in your own words; a conclusion. For comparisons, give the region, a feature and the tone of each piece. Extrapolation tasks (an article inviting students to Coorg, Rajvir\'s diary, your own memory of a vendor) must stay consistent with the chapter.\n\nPractise with the real textbook passages from *First Flight*.',
      v: vLongPlan,
    },
  ],
  tips: '**Board weight:** reference-to-context extract (5), short answers (3 marks, 40–50 words) and long answers (6 marks, 100–120 words) from *First Flight* (CBSE 2026-27, Section C).\n\n**How marks are awarded:** content (relevant details, accurately used), interpretation (a clear, supported view), and expression within the word limit.\n\n**Common mistakes**\n1. Mixing up the Goan words: *pader* (baker), *kabai* (dress), *bol* (sweet bread), *bolinhas* (cookies).\n2. Stating a Kodavu origin theory as fact.\n3. Saying Pranjol tells the legends: Rajvir does.\n4. Getting the seasons wrong: Coorg September to March; the second flush May to July.\n5. Reproducing dialogue or description instead of explaining in your own words.\n\n**Remember:** read the chapter in your textbook, *First Flight*.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['The three pieces and their writers', '*A Baker from Goa* (Lucio Rodrigues), *Coorg* (Lokesh Abrol), *Tea from Assam* (Arup Kumar Datta).', 'fact', 1],
  ['What is a *pader*?', 'The traditional baker of Goa.', 'definition', 1],
  ['What do Goan elders miss?', 'The Portuguese days and their famous loaves of bread.', 'fact', 1],
  ['How often did the baker come in the writer\'s childhood?', 'At least twice a day.', 'fact', 1],
  ['What did the children want from the baker?', 'Bread-bangles and sweet bread (the servants bought the loaves).', 'fact', 1],
  ['What is *bol*?', 'A sweet bread essential to Goan marriage gifts.', 'definition', 1],
  ['What is the *kabai*?', 'The baker\'s old one-piece frock reaching the knees.', 'definition', 1],
  ['How did the baker keep accounts?', 'In pencil on a wall, paid at the end of the month.', 'fact', 1],
  ['Tone of *A Baker from Goa*', 'Nostalgic and gently humorous.', 'concept', 2],
  ['Where is Coorg?', 'The smallest district of Karnataka, between Mysore and Mangalore; also called Kodagu.', 'fact', 1],
  ['Best season to visit Coorg', 'September to March (the monsoon is very heavy).', 'fact', 1],
  ['How much of Coorg is rainforest?', 'About thirty per cent.', 'fact', 1],
  ['Two theories of Kodavu origin', 'Greek (Alexander\'s soldiers) and Arab (the *kuppia* resembles the *kuffia*).', 'concept', 2],
  ['Evidence of Kodavu valour', 'The decorated Coorg Regiment; General Cariappa; firearms without a licence.', 'fact', 2],
  ['Which river is fed by Coorg\'s hills?', 'The Kaveri, home of the mahaseer.', 'fact', 1],
  ['Adventure sports in Coorg', 'Rafting, canoeing, rappelling, rock climbing, mountain biking, trekking.', 'fact', 1],
  ['What is Bylakuppe?', 'India\'s largest Tibetan settlement, near Coorg.', 'fact', 1],
  ['Tone of *Coorg*', 'Admiring, descriptive travel writing.', 'concept', 2],
  ['Where are Rajvir and Pranjol going?', 'To the tea estate Pranjol\'s father manages in Upper Assam (Dhekiabari).', 'fact', 1],
  ['Rajvir\'s statistic on the train', 'Over eighty crore cups of tea are drunk in the world every day.', 'fact', 1],
  ['The Chinese legend of tea', 'Leaves from the fire under an emperor\'s pot fell into his boiling water.', 'fact', 1],
  ['The Indian legend of tea', 'Bodhidharma cut off his eyelids to stay awake; ten tea plants grew from them.', 'fact', 1],
  ['When did tea reach Europe?', 'The sixteenth century, drunk at first as medicine.', 'fact', 1],
  ['What is the second flush?', 'The May to July sprouting season, which gives the best tea.', 'definition', 1],
  ['Rajvir vs Pranjol', 'Rajvir: curious, well-read, modest. Pranjol: indifferent, having grown up on a plantation.', 'concept', 2],
  ['Tone of *Tea from Assam*', 'Light, informative and conversational.', 'concept', 2],
  ['What the chapter shows about India', 'Great variety of region, food, history, livelihood and people.', 'concept', 2],
  ['*martial*', 'relating to war or fighting', 'definition', 1],
  ['Plan for a 6-mark comparison', 'Shared idea → region, feature and tone for each piece → conclusion (100–120 words).', 'exam-tip', 3],
  ['Most common factual slips', 'Mixing up the Goan words; saying Pranjol tells the legends; wrong seasons.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-short',
  title: 'Chapter test (short) — Glimpses of India',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (5 marks)', instr: 'Read the commentary and answer all parts. (The passage is SOYL commentary; read the chapter in First Flight.)', items: ['src_trade'] },
    { id: 'B', title: 'Section B — Short answers (3 marks each)', instr: 'Answer any three of four in 40–50 words.', items: [{ attempt: 3, keys: ['sa_baker_friend', 'sa_coorg_valour', 'sa_tea_boys', 'sa_compare_tone'] }] },
    { id: 'C', title: 'Section C — Long answer (6 marks)', instr: 'Answer any one in 100–120 words.', items: [{ attempt: 1, keys: ['la_coorg_land', 'la_tea_rajvir'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-english-language-and-literature-chapter-test-long',
  title: 'Chapter test (long) — Glimpses of India',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Extract-based (2 × 5 marks)', instr: 'In each pair, answer one passage. (Passages are SOYL commentary.)', items: [{ attempt: 1, keys: ['src_childhood', 'src_kodavus'] }, { attempt: 1, keys: ['src_land', 'src_legends'] }] },
    { id: 'B', title: 'Section B — Short answers (2 marks each)', instr: 'Answer any three of four in 30–40 words.', items: [{ attempt: 3, keys: ['sb_bangles', 'sb_coorg_location', 'sb_tea_history', 'sb_accounts'] }] },
    { id: 'C', title: 'Section C — Short answers (3 marks each)', instr: 'Answer any four of five in 40–50 words.', items: [{ attempt: 4, keys: ['sa_baker_occasions', 'sa_baker_dress', 'sa_coorg_people', 'sa_tea_legends', 'sa_tea_homework'] }] },
    { id: 'D', title: 'Section D — Long answers (6 marks each)', instr: 'Answer one question from each pair in 100–120 words.', items: [{ attempt: 1, keys: ['la_baker_tradition', 'la_compare_three'] }, { attempt: 1, keys: ['la_coorg_brochure', 'la_tea_diary'] }] },
  ],
});

build({
  dir: DIR,
  decks: [D1, D2, D3],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 only; no removed topics for 2026-27; all three pieces covered (one deck each; Part 3 adds the comparison)',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the three pieces; no dialogue reproduced; summaries in SOYL words; extract items use SOYL commentary passages (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on every title slide, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused (stems reframed where a classic question exists)',
    re_solve: 'author verifier pass: every item re-answered from its stem and checked against the three pieces',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
