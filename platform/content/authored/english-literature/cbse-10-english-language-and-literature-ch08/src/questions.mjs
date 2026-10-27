// CBSE 10 English Language and Literature, ch08 "Glimpses of India" — question bank.
// Part I: A Baker from Goa (Lucio Rodrigues). Part II: Coorg (Lokesh Abrol). Part III: Tea from Assam
// (Arup Kumar Datta).
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the three pieces
// appears here. Passages are SOYL commentary (passage_origin: soyl-commentary); no dialogue is reproduced.
// Students read the pieces in their textbook, First Flight.
// Topics: t01 context and summary · t02 themes (cultural and regional features; tone) · t03 exam practice.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the chapter, not an extract from it. Read the chapter itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the piece (event, fact or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the piece', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the chapter, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the chapter', 1], ['Organisation and expression; within 100–120 words', 2]];
const BAKER = '*A Baker from Goa* (Lucio Rodrigues).';
const COORG = '*Coorg* (Lokesh Abrol).';
const TEA = '*Tea from Assam* (Arup Kumar Datta).';

// ================================================================ extract-based (source-based, SOYL commentary)
// ---- Part I: A Baker from Goa
Q('src_pader', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: `${BAKER} ${SRC_STEM}`,
  passage: 'Rodrigues begins with the older generation of Goa, who look back fondly on the Portuguese era and, above all, on its bread. The Portuguese rulers are long gone, he observes, but the bread-making they introduced has survived them. Traditional furnaces are still lit, the baker\'s bamboo staff can still be heard announcing his rounds in some villages, and in many families a son has taken over the trade from his father. Goans still call such a baker a pader. The opening sets the mood of the whole piece: a tradition that links the present with the past.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What is a traditional baker called in Goa?', opts: ['a pader', 'a kabai', 'a bol', 'a mahout'], sol: 'Goans call the traditional baker a *pader*. (A *kabai* is his dress; *bol* is a sweet bread; a mahout is an elephant-keeper.)' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which era do the elders of Goa remember fondly?', opts: ['the Portuguese era', 'the Mughal era', 'the British era', 'the Maratha era'], sol: 'They look back on the days of Portuguese rule and its famous bread.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'In many families, the baking trade has passed from father to ___.', acc: [['son']], sol: 'The **son** carries on the family profession.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *a tradition that links the present with the past*?', model: 'Bread-making begun under the Portuguese still continues today, so the old way of life lives on in modern Goa.', sol: 'The continuing craft connects today\'s Goa with its Portuguese history.', scheme: [['The old craft continues into the present', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'According to the commentary, what still announces the baker\'s arrival in some places?', opts: ['the sound of his bamboo staff', 'a bell on his bicycle', 'a loud song', 'a horn on his cart'], sol: 'His bamboo staff still announces his rounds in some villages.' })),
  ],
  sol: 'Parts (a)–(c) and (e) are facts; (d) interprets the opening\'s mood.',
}));
Q('src_childhood', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${BAKER} ${SRC_STEM}`,
  passage: 'For the young Rodrigues, the baker was far more than a tradesman; he was a favourite visitor and almost a member of the household. He came at least twice a day, once on his morning round and again on his way back with an empty basket. The children rushed to meet him, though not for the loaves, which were bought by the servants. What they wanted were the bread-bangles, or a special sweet bread. The writer remembers being pushed aside, climbing up to peek into the basket, and the smell of fresh bread. He also jokes that the children hardly bothered to clean their teeth. The memories are warm, comic and a little exaggerated.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'How often did the baker come to the writer\'s house?', opts: ['at least twice a day', 'once a week', 'only on festivals', 'once a month'], sol: 'He came at least twice a day: on his morning round and on his return.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did the children run to meet the baker?', opts: ['for the bread-bangles and sweet bread', 'to pay his monthly bill', 'to buy loaves for the family', 'to learn baking from him'], sol: 'The loaves were for the elders; the children wanted the bread-bangles.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The loaves themselves were bought by the ___ of the house.', acc: [['servants', 'servant', 'maid', 'maidservant', 'maid-servant']], sol: 'The **servants** (the maid) bought the loaves.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Give one detail from the commentary that makes the memories *comic*.', model: 'The children being pushed aside and climbing up to peep into the basket, or not bothering to clean their teeth.', sol: 'Any one of the playful, exaggerated childhood details.', scheme: [['One comic detail', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which word best describes the writer\'s feelings about these memories?', opts: ['affectionate', 'bitter', 'indifferent', 'fearful'], sol: 'The memories are warm and fond: the baker was a friend and guide.' })),
  ],
  sol: 'Note the difference between the loaves (for elders) and the bread-bangles (for children).',
}));
Q('src_trade', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${BAKER} ${SRC_STEM}`,
  passage: 'Rodrigues shows that bread in Goa is woven into every celebration. A marriage gift is incomplete without the sweet bread called bol, a mother prepares sandwiches for her daughter\'s engagement, and Christmas needs cakes and bolinhas. No wonder every village needs its baker\'s furnace. The baker\'s dress was once a knee-length frock called the kabai; later, bakers wore shirts with trousers ending near the knee, a style still teasingly linked with bakers today. Accounts were kept on a wall in pencil and settled at the end of the month. The trade paid well, and the well-fed look of bakers proved it.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which sweet bread is essential for a Goan marriage gift?', opts: ['bol', 'bolinhas', 'kabai', 'pader'], sol: '*Bol* is the sweet bread that marriage gifts must include.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The baker\'s traditional knee-length frock was called the ___.', acc: [['kabai']], sol: 'It was called the **kabai**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How did the baker keep his accounts?', opts: ['written in pencil on a wall, settled monthly', 'in a printed bill book, paid daily', 'on a computer, paid weekly', 'he kept no accounts at all'], sol: 'Monthly accounts were noted in pencil on a wall and collected at the month\'s end.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why, according to the commentary, does every village need its baker\'s furnace?', model: 'Because bread is part of every celebration, from marriage gifts to engagements and Christmas.', sol: 'Social and religious occasions depend on the baker.', scheme: [['Bread is needed for every celebration', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What showed that baking was a profitable trade?', opts: ['the well-fed, prosperous look of bakers and their families', 'the large houses they built in the city', 'their gold jewellery', 'the cars they drove'], sol: 'Their plump, healthy appearance showed they never went hungry.' })),
  ],
  sol: 'Link each fact (bol, kabai, accounts, prosperity) to what it shows about the baker\'s place in Goan life.',
}));
// ---- Part II: Coorg
Q('src_land', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: `${COORG} ${SRC_STEM}`,
  passage: 'Abrol introduces Coorg, or Kodagu, as a small district of Karnataka lying between Mysore and the coastal city of Mangalore. He describes it in glowing terms, as a hill country of evergreen forest, coffee and spices, and his admiration is obvious from the first sentence. The practical facts are woven in: rainforest covers nearly a third of the district, the monsoon rain is heavy enough to keep tourists away, and the best season runs from September to March. Coffee estates and old colonial bungalows sit among the trees. It reads like a travel writer\'s invitation.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which state is Coorg?', opts: ['Karnataka', 'Kerala', 'Goa', 'Assam'], sol: 'Coorg (Kodagu) is the smallest district of Karnataka.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Between which two places does Coorg lie?', opts: ['Mysore and Mangalore', 'Goa and Mumbai', 'Delhi and Agra', 'Chennai and Madurai'], sol: 'It lies between Mysore and the coastal town of Mangalore.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The best season to visit Coorg runs from September to ___.', acc: [['March']], sol: 'From September to **March**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the piece *reads like a travel writer\'s invitation*?', model: 'It praises Coorg\'s beauty while giving useful facts for visitors, such as the best season.', sol: 'Admiration plus practical tourist information.', scheme: [['Praise plus practical information for visitors', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why do many visitors stay away during the monsoon?', opts: ['The rain is very heavy.', 'The roads are closed by law.', 'It is too hot.', 'The coffee estates are shut.'], sol: 'Heavy monsoon rain keeps many tourists away.' })),
  ],
  sol: 'Separate the facts (a, b, c, e) from the commentary\'s description of the writer\'s purpose (d).',
}));
Q('src_kodavus', source({
  t: [2, 1], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${COORG} ${SRC_STEM}`,
  passage: 'The people of Coorg, the Kodavus, interest Abrol as much as the landscape. Two stories are told about their origins. One says they descend from soldiers of Alexander\'s army who settled here when returning home became impossible. The other suggests Arab roots, pointing to the long black coat with an embroidered belt that Kodavus wear, the kuppia, which resembles the kuffia worn by Arabs and Kurds. Whatever their origin, they are known for hospitality and for courage. The Coorg Regiment is among the Indian Army\'s most decorated, and Kodavus may carry firearms without a licence.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'According to one story, the Kodavus descend from…', opts: ['soldiers of Alexander\'s army', 'Portuguese traders', 'Tibetan monks', 'British planters'], sol: 'One theory traces them to part of Alexander\'s army that settled in the region.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The long black coat worn by the Kodavus is called the ___.', acc: [['kuppia']], sol: 'It is the **kuppia**, said to resemble the Arab *kuffia*.' })),
    child('c', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What evidence is given for the theory of Arab origin?', opts: ['the resemblance of the kuppia to the kuffia', 'the Kodavus\' Arabic language', 'Arab coins found in Coorg', 'the coffee trade with Arabia'], sol: 'The similarity in dress is offered as support for the Arab theory.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Give one fact from the commentary that shows the Kodavus\' tradition of courage.', model: 'The Coorg Regiment is one of the most decorated in the Indian Army.', sol: 'Also acceptable: Kodavus may carry firearms without a licence.', scheme: [['One fact showing courage', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'recall', stem: 'What special right do the Kodavus have?', opts: ['to carry firearms without a licence', 'to pay no taxes', 'to hunt elephants', 'to vote twice'], sol: 'They are the only people in India allowed to carry firearms without a licence.' })),
  ],
  sol: 'Keep the two origin theories and their evidence apart; they are theories, not proven facts.',
}));
Q('src_kaveri', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${COORG} ${SRC_STEM}`,
  passage: 'Abrol turns next to Coorg\'s wild life and outdoor pleasures. The river Kaveri draws its water from these hills and forests, and its clear pools hold the mahaseer, a large freshwater fish. Kingfishers, squirrels, langurs and elephants all appear, the elephants enjoying a scrub from their mahouts. For the energetic visitor there is trekking, mountain biking, rock climbing, rappelling, canoeing and rafting. Quieter pleasures include the view from the Brahmagiri hills, the rope bridge to the island of Nisargadhama, and the sight of Buddhist monks from Bylakuppe, India\'s largest Tibetan settlement. Coorg, in this account, has something for every kind of traveller.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which river gets its water from the hills and forests of Coorg?', opts: ['the Kaveri', 'the Ganga', 'the Brahmaputra', 'the Narmada'], sol: 'The Kaveri rises in and is fed by Coorg\'s hills and forests.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The large freshwater fish found in the Kaveri is the ___.', acc: [['mahaseer']], sol: 'The **mahaseer**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where is India\'s largest Tibetan settlement, mentioned in the piece?', opts: ['Bylakuppe', 'Brahmagiri', 'Nisargadhama', 'Mangalore'], sol: 'Buddhist monks come from Bylakuppe, India\'s largest Tibetan settlement.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How does the commentary support its claim that Coorg has *something for every kind of traveller*?', model: 'It lists adventure sports for energetic visitors and quiet pleasures like views, the rope bridge and wildlife for others.', sol: 'Both adventure and calm attractions are named.', scheme: [['Adventure and quiet attractions both listed', 1]] })),
    child('e', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What leads to the island of Nisargadhama?', opts: ['a rope bridge', 'a ferry', 'a cable car', 'a tunnel'], sol: 'A walk across a rope bridge takes you to Nisargadhama.' })),
  ],
  sol: 'Most parts are facts the commentary repeats; part (d) asks how it supports its claim.',
}));
// ---- Part III: Tea from Assam
Q('src_train', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: `${TEA} ${SRC_STEM}`,
  passage: 'The story begins on a train. Rajvir is travelling with his classmate Pranjol, whose father manages a tea garden in Upper Assam, to spend the summer vacation there. When the boys buy tea from a vendor at a station, Rajvir cannot resist sharing a statistic about how many cups the world drinks every day. Pranjol is buried in a detective novel. Then the view changes: rows of tea bushes stretch into the distance under tall shade trees, with pluckers moving between them and a factory sending up smoke. Rajvir is thrilled. Pranjol, who grew up on a plantation, is not.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where are Rajvir and Pranjol going?', opts: ['to the tea garden Pranjol\'s father manages in Assam', 'to a school trip in Delhi', 'to Rajvir\'s grandparents in Goa', 'to a coffee estate in Coorg'], sol: 'They are going to Pranjol\'s home on a tea garden in Upper Assam.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was Pranjol doing while Rajvir looked out of the window?', opts: ['reading a detective novel', 'sleeping', 'buying more tea', 'talking to the vendor'], sol: 'Pranjol was absorbed in a detective book.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Rajvir says that over eighty ___ cups of tea are drunk around the world every day.', acc: [['crore']], sol: 'Over eighty **crore** cups a day.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why is Pranjol not as excited as Rajvir by the view?', model: 'Pranjol grew up on a plantation, so tea gardens are ordinary to him, while they are new to Rajvir.', sol: 'Familiarity makes the view unremarkable for Pranjol.', scheme: [['Familiar to Pranjol, new to Rajvir', 1]] })),
    child('e', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does the smoking building in the distance most likely tell us?', opts: ['It is a tea factory where leaves are processed.', 'It is a house on fire.', 'It is a railway station.', 'It is a school.'], sol: 'A factory with chimneys among the gardens processes the tea.' })),
  ],
  sol: 'Contrast the two boys\' reactions; the facts come from the opening journey.',
}));
Q('src_legends', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${TEA} ${SRC_STEM}`,
  passage: 'Rajvir has read up on tea before the trip, and he tells Pranjol two legends about its discovery. The Chinese one credits an accident: leaves from the fire under an emperor\'s pot of boiling water dropped in and flavoured it. The Indian one is stranger. Bodhidharma, a Buddhist monk determined to stay awake through his meditation, cut off his eyelids, and from them sprang ten tea plants whose leaves, steeped in hot water, keep drinkers alert. Rajvir adds some history: tea was drunk in China around 2700 BC and reached Europe only in the sixteenth century, at first as a medicine.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'In the Chinese legend, how did tea leaves get into the emperor\'s water?', opts: ['They fell from the burning twigs under the pot.', 'A servant added them by mistake.', 'The wind blew them from a tree.', 'The emperor planted them in the pot.'], sol: 'Leaves from the twigs burning beneath the pot fell into the boiling water.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'In the Indian legend, the Buddhist ascetic who cut off his eyelids was ___.', acc: [['Bodhidharma']], sol: 'It was **Bodhidharma**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'recall', stem: 'When did tea first reach Europe, according to Rajvir?', opts: ['in the sixteenth century', 'around 2700 BC', 'in the twentieth century', 'in the first century'], sol: 'Tea came to Europe in the sixteenth century, drunk at first as medicine.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What quality of the tea leaves does the Indian legend explain?', model: 'That tea drives away sleep, since the plants grew from the eyelids of a monk fighting drowsiness.', sol: 'The legend explains tea\'s power to keep people awake.', scheme: [['Tea banishes sleep / keeps people alert', 1]] })),
    child('e', mcq({ t: 1, d: 3, c: 'analysis', stem: 'What does Rajvir\'s knowledge of these legends show about him?', opts: ['He prepared carefully by reading before the trip.', 'He had grown up on a tea estate.', 'He had visited China.', 'He did not care about tea.'], sol: 'He had read widely about tea before coming.' })),
  ],
  sol: 'Keep the two legends distinct (China: leaves in boiling water; India: Bodhidharma\'s eyelids).',
}));
Q('src_garden', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: `${TEA} ${SRC_STEM}`,
  passage: 'At Mariani junction, Pranjol\'s parents meet the boys and drive them to Dhekiabari, the estate Pranjol\'s father manages. On both sides, tea bushes have been clipped to a uniform height. Pluckers in aprons, baskets on their backs, are gathering the tender new shoots, and the car has to slow down for a tractor loaded with leaves. Rajvir identifies the season as the second flush, lasting from May to July and giving the best tea. Pranjol\'s father, Mr Barua, is surprised that the visitor has done his homework. Rajvir replies that he hopes to learn much more.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'At which station did Pranjol\'s parents meet the boys?', opts: ['Mariani junction', 'Dhekiabari', 'Bylakuppe', 'Mangalore'], sol: 'They met the boys at Mariani junction.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What are the pluckers picking?', opts: ['the fresh, newly sprouted leaves', 'ripe tea berries', 'dry fallen leaves', 'the roots of the bushes'], sol: 'They pick the newly sprouted leaves.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The second-flush season lasts from May to ___.', acc: [['July']], sol: 'From May to **July**, giving the best tea.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why is Mr Barua surprised by Rajvir?', model: 'A visitor from Delhi already knows technical facts about tea, such as the second-flush season.', sol: 'Rajvir\'s preparation impresses the tea-garden manager.', scheme: [['Rajvir already knows expert facts', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'What does Rajvir\'s reply that he hopes to learn more suggest?', opts: ['He is curious and modest about his knowledge.', 'He is boasting about his reading.', 'He is bored by the tea garden.', 'He wants to go home soon.'], sol: 'Despite his reading, he is eager to learn: curious and humble.' })),
  ],
  sol: 'Facts: Mariani, Dhekiabari, pluckers, second flush. Inference: Rajvir is well-prepared, curious and modest.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_baker_friend', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: `${BAKER} Why was the baker such an important figure in the writer\'s childhood? Answer in 40–50 words.`,
  model: 'The baker visited at least twice a day, and the children rushed to greet him at the sound of his bamboo staff. He brought the bread-bangles and sweet bread they loved. His regular, cheerful visits made him a familiar and much-loved part of their daily lives.',
  sol: 'His frequent visits + what he brought for the children + why he became part of their lives.',
}));
Q('sa_baker_occasions', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: `${BAKER} Why is the baker\'s furnace considered essential in a Goan village? Answer in 40–50 words.`,
  model: 'Bread is part of every Goan celebration. Marriage gifts are incomplete without the sweet bread called bol, a mother makes sandwiches for her daughter\'s engagement, and Christmas needs cakes and bolinhas. Without the baker, the social and religious life of the village would lose much of its charm.',
  sol: 'Occasions that need bread (marriage, engagement, Christmas) + why that makes the furnace essential.',
}));
Q('sa_baker_dress', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: `${BAKER} Describe how the baker\'s dress changed over time, and how it is remembered today. Answer in 40–50 words.`,
  model: 'Earlier, bakers wore the kabai, a one-piece frock that came down to the knees. In the writer\'s childhood they wore a shirt with trousers ending around the knee. Even now, someone wearing such knee-length shorts may be teased for dressing like a baker.',
  sol: 'The kabai + the later shirt and knee-length trousers + the joke that survives today.',
}));
Q('sa_baker_tone', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: `${BAKER} How would you describe the tone of the piece? Support your view in 40–50 words.`,
  model: 'The tone is nostalgic and gently humorous. The writer looks back fondly on the Portuguese loaves and on the baker as a childhood friend. Comic touches, such as children climbing to peek into the basket and skipping tooth-brushing, keep the memories light and affectionate.',
  sol: 'Name the tone (nostalgic, humorous, affectionate) + two supporting details.',
}));
Q('sa_coorg_people', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: `${COORG} What are the two theories about the origin of the Kodavus, and what evidence supports each? Answer in 40–50 words.`,
  model: 'One theory says the Kodavus descend from Greek soldiers of Alexander\'s army who settled in Coorg when they could not return home; their martial traditions are linked to this. The other suggests Arab origins, because their kuppia coat resembles the kuffia worn by Arabs and Kurds.',
  sol: 'Greek theory (Alexander\'s soldiers; martial culture) + Arab theory (kuppia like the kuffia).',
}));
Q('sa_coorg_valour', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: `${COORG} What evidence does the writer give of the Kodavus\' courage and hospitality? Answer in 40–50 words.`,
  model: 'Kodavu homes are famous for welcoming guests and telling stories of their brave sons and fathers. The Coorg Regiment is among the most decorated in the Indian Army, General Cariappa, the first Indian to head the army, was a Kodavu, and Kodavus may carry guns without a licence.',
  sol: 'Hospitality (welcoming homes, stories of valour) + courage (the Regiment, Cariappa, firearms without licence).',
}));
Q('sa_coorg_adventure', short({
  ...SA3, t: [1, 3], d: 3, c: 'application',
  stem: `${COORG} A group of college students wants an active holiday. Using details from the piece, explain what Coorg can offer them. Answer in 40–50 words.`,
  model: 'Coorg offers plenty of adventure. Students can ride mountain bikes, try rock climbing and rappelling, or go canoeing and river rafting. Walking trails attract trekkers, and the climb up the Brahmagiri hills rewards them with a sweeping view over the whole district.',
  sol: 'Activities from the piece matched to the students\' wish for action (four or five named) + the Brahmagiri climb or the trails.',
}));
Q('sa_coorg_style', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: `${COORG} How does the writer make Coorg sound attractive to readers? Answer in 40–50 words.`,
  model: 'Abrol uses glowing, almost exaggerated praise, presenting Coorg as a heavenly land. He piles up appealing details: forests, coffee, rivers, wildlife and adventure sports. He also adds practical travel facts, like the best season, so the description reads like an invitation to visit.',
  sol: 'Technique (praise, exaggeration) + rich details + practical information + the effect.',
}));
Q('sa_tea_boys', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: `${TEA} Compare Rajvir\'s and Pranjol\'s attitudes towards the tea gardens. Answer in 40–50 words.`,
  model: 'Rajvir is excited and curious; he has read about tea, admires the view and shares facts and legends. Pranjol, born and raised on a plantation, finds the gardens ordinary and prefers his detective novel. Familiarity makes Pranjol indifferent, while novelty makes Rajvir eager to learn.',
  sol: 'Rajvir (excited, informed) + Pranjol (indifferent, absorbed in his book) + the reason for the difference.',
}));
Q('sa_tea_legends', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: `${TEA} Narrate briefly the two legends about tea that Rajvir tells Pranjol. Answer in 40–50 words.`,
  model: 'The Chinese legend says tea was found by chance, when leaves from the fire beneath an emperor\'s pot dropped into his boiling water and flavoured it. The Indian legend says the monk Bodhidharma, desperate to stay awake while meditating, cut off his eyelids, and ten tea plants sprouted from them.',
  sol: 'The Chinese legend (leaves in the boiling water) + the Indian legend (Bodhidharma; ten plants; sleep).',
}));
Q('sa_tea_homework', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: `${TEA} Mr Barua remarks that Rajvir has done his homework. What had Rajvir done, and what does it show about him? Answer in 40–50 words.`,
  model: 'Before the trip, Rajvir had read about tea: its history, the legends of its discovery and the second-flush season from May to July. This shows that he is curious, well-prepared and eager to learn, and also modest, since he hopes to learn more.',
  sol: 'What he had read + what it shows (curious, prepared, modest).',
}));
Q('sa_compare_tone', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Compare the tone of the three pieces in *Glimpses of India*. Answer in 40–50 words.',
  model: '*A Baker from Goa* is nostalgic and humorous, a fond memory of childhood. *Coorg* is admiring and descriptive, almost like a travel brochure. *Tea from Assam* is light and informative, mixing a story about two boys with facts and legends about tea.',
  sol: 'One accurate tone for each piece, with a brief reason.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_bangles', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: `${BAKER} What did the children look forward to when the baker came, and who bought the loaves? Answer in 30–40 words.`,
  model: 'The children looked forward to the bread-bangles, which they chose with care, and sometimes a special sweet bread. The ordinary loaves were bought by the servant of the house for the elders.',
  sol: 'Bread-bangles / sweet bread for children + loaves bought by the servant.',
}));
Q('sb_accounts', short({
  ...SA2, t: [1, 2], d: 3, c: 'analysis',
  stem: `${BAKER} How did the baker keep his accounts, and how do we know baking was profitable? Answer in 30–40 words.`,
  model: 'The baker marked his monthly accounts in pencil on a wall and collected payment at the end of the month. Bakers and their families never went hungry, and their well-fed, prosperous look proved the trade paid well.',
  sol: 'The wall accounts, settled monthly + the evidence of prosperity.',
}));
Q('sb_coorg_location', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: `${COORG} Where is Coorg, and when is the best time to visit? Answer in 30–40 words.`,
  model: 'Coorg, or Kodagu, is Karnataka\'s smallest district. It sits between Mysore and the coastal city of Mangalore. Visitors are advised to come from September to March, once the heavy monsoon rains are over.',
  sol: 'Location (Karnataka, between Mysore and Mangalore) + season (September–March).',
}));
Q('sb_coorg_wildlife', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: `${COORG} Name some of the creatures a visitor may see in Coorg. Answer in 30–40 words.`,
  model: 'Visitors may see the mahaseer fish in the Kaveri, kingfishers diving for food, squirrels and langurs, and elephants being bathed by their mahouts. Macaques, Malabar squirrels and the slender loris live in the trees.',
  sol: 'Any five creatures named in the piece.',
}));
Q('sb_tea_history', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: `${TEA} What facts about the history of tea does Rajvir share? Answer in 30–40 words.`,
  model: 'Rajvir says tea was drunk in China as early as 2700 BC, and that words like chai and chini come from Chinese. Tea reached Europe only in the sixteenth century, when it was taken mainly as medicine.',
  sol: 'China around 2700 BC + Chinese origin of words + Europe in the sixteenth century, as medicine.',
}));
Q('sb_tea_pluckers', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: `${TEA} What did Rajvir see on the drive to Dhekiabari? Answer in 30–40 words.`,
  model: 'He saw endless tea bushes, clipped level like garden hedges. Workers, baskets strapped to their backs, were picking the tender new leaves, and the car had to slow down for a tractor loaded with leaves.',
  sol: 'Pruned bushes + pluckers with baskets and aprons + the tractor with leaves.',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_baker_tradition', long({
  ...LA, t: [2, 3], d: 3, c: 'analysis',
  stem: `${BAKER} How does the piece show that the baker was an important part of Goan life and culture? Answer in 100–120 words.`,
  model: 'Rodrigues shows the baker at the centre of Goan life. The bread-making begun under the Portuguese still survives, often passed from father to son, and the baker is still called a pader. In the writer\'s childhood, the baker came at least twice a day, and children rushed to him for bread-bangles. Bread marked every occasion: bol for marriage gifts, sandwiches for a daughter\'s engagement, and cakes and bolinhas for Christmas. The baker even had his own dress, the kabai, and kept accounts on the wall, collecting payment monthly. His trade was profitable, as the healthy look of bakers showed. In all these ways, the baker was woven into Goa\'s social and cultural fabric.',
  sol: 'Trace his roles: a living tradition (pader, father to son); a daily visitor and children\'s friend; essential to celebrations; a distinctive dress and way of business; a prosperous trade. Conclude on his cultural importance.',
}));
Q('la_baker_memory', long({
  ...LA, t: [3, 2], d: 4, c: 'application', bloom: 'create',
  stem: `${BAKER} Like Rodrigues, write a short piece recalling a vendor or tradesperson who was part of your childhood, in 100–120 words.`,
  model: 'Every evening of my childhood began with the bell of Ramu kaka\'s cycle. He sold kulfi from a box wrapped in red cloth, and the moment we heard him, my cousins and I raced down three flights of stairs. My grandmother called him a thief for charging two rupees more each summer, yet she always bought one for herself. Ramu kaka never wrote anything down; he simply remembered who owed what and collected on Sundays. He knew our names, our exam dates and even our quarrels. Today the lane has a supermarket with glass doors and no bell. The kulfi there is colder, perhaps, but it does not taste of evenings.',
  sol: 'A personal recollection in the first person: a named or described vendor, sensory details, the vendor\'s place in daily life, humour or nostalgia, and a contrast with the present, as in the chapter. Originality and tone earn credit.',
}));
Q('la_coorg_brochure', long({
  ...LA, t: [3, 2], d: 4, c: 'application', bloom: 'create',
  stem: `${COORG} Using details from the piece, write a short article inviting school students to Coorg for an adventure camp, in 100–120 words.`,
  model: 'Adventure Awaits in Coorg!\n\nLooking for an unforgettable holiday? Come to Coorg, the hill district of Karnataka between Mysore and Mangalore. Plan your trip between September and March, when the monsoon has passed. Raft and canoe on rivers fed by the Kaveri, try rappelling and rock climbing, or ride a mountain bike along forest tracks. Trekkers can climb the Brahmagiri hills for a sweeping view over the district, and then cross the rope bridge to the island of Nisargadhama. Watch kingfishers dive and elephants enjoy their bath. Meet the warm, brave Kodavus and hear their stories of valour. Book your place at the SOYL Adventure Camp today!',
  sol: 'Article or invitation format with a heading. Accurate details from the piece (location, season, adventure sports, Brahmagiri, Nisargadhama, wildlife, the Kodavus); persuasive tone.',
}));
Q('la_coorg_land', long({
  ...LA, t: [2, 3], d: 3, c: 'analysis',
  stem: `${COORG} Coorg is a land of natural beauty and of proud, brave people. Discuss with reference to the piece, in 100–120 words.`,
  model: 'Abrol presents Coorg as both beautiful and remarkable for its people. Its natural beauty includes evergreen rainforests covering nearly a third of the district, coffee estates, and the Kaveri, home to the mahaseer. Wildlife abounds, from kingfishers and langurs to elephants bathed by mahouts, and the Brahmagiri hills offer a view over the whole district. The people, the Kodavus, are just as striking. They may be of Greek or Arab descent, and they keep distinct traditions. They are famous for hospitality and courage: the Coorg Regiment is highly decorated, General Cariappa was a Kodavu, and they may carry firearms without a licence. Land and people together make Coorg unique.',
  sol: 'Two halves: nature (forest, coffee, river, wildlife, hills) and people (origins, hospitality, valour, Cariappa, firearms). A conclusion that unites them.',
}));
Q('la_tea_rajvir', long({
  ...LA, t: [2, 3], d: 3, c: 'analysis',
  stem: `${TEA} Rajvir is a curious and well-prepared traveller. Do you agree? Answer in 100–120 words.`,
  model: 'I agree. Rajvir prepares for his visit to Assam by reading about tea. On the train he surprises Pranjol with the fact that the world drinks over eighty crore cups every day. While Pranjol reads a detective novel, Rajvir admires the endless rows of tea bushes. He tells two legends about the discovery of tea, from China and India, and adds that tea reached Europe only in the sixteenth century. At Dhekiabari he recognises the second-flush season, which impresses Mr Barua. Yet he is not boastful: he says he hopes to learn much more. Rajvir shows how preparation and curiosity can turn an ordinary holiday into a real education.',
  sol: 'A stand + evidence (the statistic, admiration of the view, the legends, history, the second flush) + his modesty + a conclusion.',
}));
Q('la_tea_diary', long({
  ...LA, t: [3, 1], d: 4, c: 'application', bloom: 'create',
  stem: `${TEA} Imagine you are Rajvir. Write a diary entry on your first evening at Dhekiabari, in 100–120 words.`,
  model: 'Dhekiabari, first evening\n\nWhat a day! From the train I saw tea bushes running on for miles, with tall trees shading them and a factory chimney smoking in the distance. Pranjol barely looked up from his detective novel. I suppose when you grow up here, it all seems ordinary. His parents met us at Mariani and drove us to the estate. Pluckers with baskets on their backs were picking the tender leaves. When I mentioned the second flush, Mr Barua said I had done my homework. I felt proud, but I know so little. Tomorrow I hope to see the factory and learn how leaves become tea.',
  sol: 'Diary format (place/time, first person, feelings). Content consistent with the story: the view from the train, Pranjol\'s indifference, Mariani, Dhekiabari, the pluckers, the second flush, Mr Barua\'s remark, a wish to learn.',
}));
Q('la_compare_three', long({
  ...LA, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'How does *Glimpses of India* show the variety of India\'s regions? Compare the three pieces in 100–120 words.',
  model: 'The three pieces take us to three very different corners of India. *A Baker from Goa* shows a coastal culture shaped by Portuguese rule, where bread marks every festival and the pader is a beloved figure; its tone is nostalgic and humorous. *Coorg* describes a hill district of Karnataka with rainforests, coffee and the river Kaveri, home to the proud Kodavus with their martial traditions; its tone is admiring, like a travelogue. *Tea from Assam* takes us to the vast tea gardens of the north-east through the eyes of a curious schoolboy, mixing legends and facts. Together, the pieces show India\'s diversity of food, landscape, history, occupations and people.',
  sol: 'For each piece: region, a cultural or natural feature, and the tone. Conclude on India\'s diversity. Accurate comparison of tone is rewarded.',
}));

// ================================================================ objective items
Q('mc_pader_name', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who wrote *A Baker from Goa*?', opts: ['Lucio Rodrigues', 'Lokesh Abrol', 'Arup Kumar Datta', 'Anne Frank'], sol: '*A Baker from Goa* is by Lucio Rodrigues; *Coorg* by Lokesh Abrol; *Tea from Assam* by Arup Kumar Datta.' }));
Q('mc_bangles', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What did the children in *A Baker from Goa* want most from the baker?', opts: ['bread-bangles', 'loaves for breakfast', 'cakes for Christmas', 'his bamboo staff'], sol: 'They longed for the bread-bangles; loaves were for the elders.' }));
Q('mc_bolinhas', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In Goa, cakes and bolinhas are especially needed for…', opts: ['Christmas and other festivals', 'school examinations', 'the monsoon', 'funerals'], sol: 'Cakes and bolinhas are a must for Christmas and other festivals.' }));
Q('mc_baker_tone', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which word best describes the tone of *A Baker from Goa*?', opts: ['nostalgic', 'angry', 'scientific', 'tragic'], sol: 'The writer looks back fondly on a past way of life.' }));
Q('mc_cariappa', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which famous soldier from Coorg is mentioned in the piece?', opts: ['General Cariappa', 'Bodhidharma', 'Mr Barua', 'Alexander'], sol: 'General (later Field Marshal) K. M. Cariappa, the first Indian to head the Indian Army, was a Kodavu.' }));
Q('mc_coorg_style', mcq({ t: 2, d: 3, c: 'application', stem: 'Which of these SOYL-written sentences about a different place uses the same kind of admiring exaggeration as the writer of *Coorg*?', opts: ['Every lane of this old town seems to hold a story more charming than the last.', 'The town has a population of about forty thousand.', 'The first bus to the town leaves at six in the morning.', 'The town has two schools and a hospital.'], sol: 'Only the first sentence praises the place with mild exaggeration, as Abrol does; the others are plain facts.' }));
Q('mc_coorg_genre', mcq({ t: 2, d: 3, c: 'analysis', stem: 'The piece *Coorg* is closest in style to…', opts: ['a travelogue', 'a diary', 'a detective story', 'a fable'], sol: 'It describes a place and invites visitors, like travel writing.' }));
Q('mc_apply_coorg', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A school wants a trip offering both adventure sports and the chance to see wildlife and a Tibetan settlement. Which place from the chapter suits it best?', opts: ['Coorg', 'a Goan village bakery', 'a train to Assam', 'Mariani junction'], sol: 'Coorg offers rafting, climbing and trekking, wildlife, and the Tibetan settlement at Bylakuppe.' }));
Q('mc_rajvir', mcq({ t: 2, d: 2, c: 'analysis', stem: 'Which word best describes Rajvir in *Tea from Assam*?', opts: ['curious', 'indifferent', 'lazy', 'rude'], sol: 'He reads up on tea, admires the gardens and asks about the season.' }));
Q('mc_bodhidharma', mcq({ t: 1, d: 2, c: 'recall', stem: 'According to the Indian legend, what grew from Bodhidharma\'s eyelids?', opts: ['ten tea plants', 'a coffee bush', 'a lotus', 'a banyan tree'], sol: 'Ten tea plants grew from the eyelids he had cut off.' }));
Q('mc_flush', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why is the second-flush period important?', opts: ['It yields the best tea.', 'It is when the bushes are cut down.', 'It is when the factory closes.', 'It is the only time tea can be drunk.'], sol: 'The second flush, May to July, gives the best tea.' }));
Q('mc_pranjol', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does Pranjol show little interest in the tea gardens?', opts: ['He grew up on a plantation, so they are familiar to him.', 'He dislikes tea.', 'He is ill on the journey.', 'He has never seen a tea garden.'], sol: 'Familiarity makes them ordinary to him.' }));
Q('mc_assam_fact', mcq({ t: 1, d: 2, c: 'recall', stem: 'According to *Tea from Assam*, Assam has…', opts: ['more tea plantations packed together than any other region on Earth', 'the world\'s oldest tea legend', 'the only tea factories in India', 'no tea gardens at all'], sol: 'No other region in the world has so many tea plantations so close together.' }));
Q('mc_three_tones', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which statement about the three pieces is most accurate?', opts: ['Each shows a different region of India in a different tone.', 'All three are written as diaries.', 'All three are set in Karnataka.', 'All three are about food.'], sol: 'Goa (nostalgic), Coorg (admiring travelogue) and Assam (light and informative) differ in region and tone.' }));
Q('mc_kodavu_coat', mcq({ t: 1, d: 2, c: 'understanding', stem: 'The kuppia worn by the Kodavus is said to resemble…', opts: ['the kuffia worn by Arabs and Kurds', 'the kabai worn by Goan bakers', 'the robes of Tibetan monks', 'the uniform of the Coorg Regiment'], sol: 'The resemblance to the kuffia supports the theory of Arab origin.' }));

Q('fb_kabai', fb({ t: 1, d: 1, c: 'recall', stem: 'The Goan baker\'s traditional dress, a frock reaching the knees, was called the ___.', acc: [['kabai']], sol: 'The **kabai**.' }));
Q('fb_kodagu', fb({ t: 1, d: 1, c: 'recall', stem: 'Coorg is also called ___, and it is the smallest district of Karnataka.', acc: [['Kodagu']], sol: 'Coorg is also called **Kodagu**.' }));
Q('fb_brahmagiri', fb({ t: 1, d: 2, c: 'recall', stem: 'A climb up the ___ hills gives visitors a view over the whole of Coorg.', acc: [['Brahmagiri']], sol: 'The **Brahmagiri** hills.' }));
Q('fb_dhekiabari', fb({ t: 1, d: 2, c: 'recall', stem: 'The tea garden managed by Pranjol\'s father is called ___.', acc: [['Dhekiabari']], sol: 'It is **Dhekiabari**.' }));
Q('fb_three', fb({ t: [1, 2], d: 2, c: 'understanding', marks: 1, stem: 'The three pieces are set in Goa, Coorg and ___, and the first is about a ___.', acc: [['Assam'], ['baker', 'pader']], sol: 'Goa, Coorg and **Assam**; the first is about a **baker** (pader).', scheme: [['Assam', 0.5], ['baker', 0.5]] }));

Q('ar_bread', ar({ t: 2, d: 3, c: 'analysis', a: 'The baker\'s furnace is considered essential in a Goan village.', r: 'Bread such as bol and bolinhas is needed for marriages, engagements and festivals.', key: 'a', sol: 'Both are true, and R explains A: celebrations depend on the baker.' }));
Q('ar_kodavu', ar({ t: 1, d: 3, c: 'analysis', a: 'Kodavus are allowed to carry firearms without a licence.', r: 'Coorg lies between Mysore and Mangalore.', key: 'b', sol: 'Both are true, but Coorg\'s location does not explain the Kodavus\' special right.' }));
Q('ar_pranjol', ar({ t: 2, d: 3, c: 'analysis', a: 'Pranjol is thrilled by his first sight of a tea garden.', r: 'Pranjol was born and brought up on a tea plantation.', key: 'd', sol: 'A is false: he is not excited, because he grew up among tea gardens. R is true.' }));
Q('ar_monsoon', ar({ t: 1, d: 3, c: 'analysis', a: 'The best season to visit Coorg is from September to March.', r: 'Coorg receives very little rain during the monsoon.', key: 'c', sol: 'A is true. R is false: the monsoon rain is heavy enough to keep many visitors away, which is why the pleasant season begins only in September.' }));

Q('tf_twice', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: in the writer\'s childhood, the Goan baker came at least twice a day.', ans: true, sol: 'He came on his morning round and again on his way back.' }));
Q('tf_bills', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: the Goan baker collected his money every day after each delivery.', ans: false, sol: 'He collected his bills at the end of the month.' }));
Q('tf_coorg_rain', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: the Kodavus\' customs, such as their marriage and religious rites, are described as distinct from the Hindu mainstream.', ans: true, sol: 'The piece says their traditions and rites are distinct from mainstream Hindu practice.' }));
Q('tf_tea_europe', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: when tea first reached Europe, it was drunk mainly as a medicine.', ans: true, sol: 'In the sixteenth century, Europeans drank it more as medicine than as a beverage.' }));

Q('ord_baker', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `${BAKER} Arrange the baker's morning visit in the order the writer remembers it.`,
  items: ['The jingle of the bamboo staff announces the baker.', 'The children run out to meet him.', 'He greets the lady of the house.', 'He rests his basket on his upright bamboo.', 'The children are pushed aside and the loaves go to the servant.', 'The children climb up to peep into the basket.'],
  sol: 'The sound → the children run out → the greeting → the basket on the bamboo → the children pushed aside, loaves to the servant → peeping into the basket.',
}));
Q('ord_tea', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `${TEA} Arrange the events in the order in which they happen.`,
  items: ['The boys buy tea from a vendor at a station.', 'Rajvir sees tea bushes stretching into the distance.', 'Rajvir tells the two legends of tea.', 'Pranjol\'s parents meet the boys at Mariani junction.', 'They drive past pluckers to Dhekiabari.', 'Mr Barua praises Rajvir\'s homework.'],
  sol: 'Tea at the station → the view → the legends → Mariani → the drive and pluckers → Mr Barua\'s remark.',
}));

Q('mt_pieces', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each item with the piece or place it belongs to.',
  pairs: [['Lucio Rodrigues', 'author of *A Baker from Goa*'], ['Lokesh Abrol', 'author of *Coorg*'], ['Arup Kumar Datta', 'author of *Tea from Assam*'], ['Bylakuppe', 'India\'s largest Tibetan settlement, near Coorg']],
  sol: 'Authors and a key place from the chapter.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word from the chapter with its meaning.',
  pairs: [['pader', 'a traditional baker in Goa'], ['bol', 'a sweet bread for Goan marriage gifts'], ['mahout', 'a person who looks after and rides an elephant'], ['flush', 'a period when new tea leaves sprout']],
  sol: 'Words from the three pieces with their meanings.',
}));
Q('mt_tones', match({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each piece with the description of its tone and style.',
  pairs: [['*A Baker from Goa*', 'nostalgic and humorous childhood memory'], ['*Coorg*', 'admiring, descriptive travel writing'], ['*Tea from Assam*', 'light story mixing dialogue, facts and legends'], ['*Glimpses of India* as a whole', 'a portrait of regional variety']],
  sol: 'Tone and style of each piece.',
}));
