// Build ICSE 9 History & Civics ch14 Medieval India: Composite Culture. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch14/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch14', 'social-science');
const { factorsFigure, saintsMapFigure, compareFigure, archFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Why cultures blended', 'The Bhakti movement', 'Saints and regions'], 'Route map of Part 1: the factors behind composite culture, the principles of the Bhakti movement, and the Bhakti saints with their regions', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The Sufi movement', 'Bhakti and Sufi compared', 'Impact and examples', 'Christian missionaries'], 'Route map of Part 2: the Sufi movement, the two movements compared, the impact and examples of composite culture, and the Christian missionaries', 'Part 2 at a glance');
const vFactors = factorsFigure('Web diagram with composite culture at the centre and six factors around it: long living together, patronage by rulers, the Bhakti and Sufi movements, trade and towns, the meeting of languages, and artisans working for many patrons', 'Six factors behind composite culture.');
const vMap = saintsMapFigure('Schematic outline of India, not to scale, with nine numbered pins and a legend: Guru Nanak in Punjab, Mirabai in Rajasthan, Surdas in the Braj region, Tulsidas in the Awadh region, Ramananda and Kabir in north India, Chaitanya in Bengal and Odisha, Sankardeva in Assam, Namdev and Tukaram in Maharashtra, and the earlier Alvars and Nayanars in the south', 'Bhakti saints and their regions (schematic, not to scale).');
const vCompareFig = compareFigure('Three boxes comparing the Bhakti and Sufi movements: Bhakti with devotion to a personal God, saints in many regions, kirtan and bhajan, the guru and regional languages; both with love and devotion, simple living and service, equality, music and openness to all groups; Sufi with mystics within Islam, pir and murid, khanqahs, the Chishti and Suhrawardi orders, and sama and qawwali', 'The Bhakti and Sufi movements compared.');
const vArch = archFigure('Schematic gateway with six numbered features: dome, pointed arch and minaret in blue for the Indo-Islamic style, and chhatri, brackets and carved motifs in green for Indian features', 'Features of composite architecture (schematic).');

const vCompose = flow('LR', ['Many traditions meet', 'People live and work together', 'Shared language, art and music', 'Composite culture'], 'Flow: many traditions meet, people live and work together, they share language, art and music, and a composite culture grows', 'How composite culture grows.');
const vLiving = table(['Factor', 'How it helped'], [
  ['Long living together', 'Neighbours of different faiths shared festivals, food and work'],
  ['Trade and towns', 'Markets and workshops brought many people into daily contact'],
  ['Artisans for many patrons', 'Designs and skills passed from one tradition to another'],
], 'Table of three factors: long living together, with neighbours sharing festivals, food and work; trade and towns, bringing people into daily contact; and artisans working for many patrons, so that designs and skills passed between traditions');
const vPatron = flow('LR', ['Rulers honour artists, poets and scholars', 'Different traditions meet at court', 'Ideas and styles are shared'], 'Flow: rulers honour artists, poets and scholars, different traditions meet at court, and ideas and styles are shared', 'Patronage by rulers.');
const vLang = table(['Language', 'What happened'], [
  ['Hindavi, or Khari Boli', 'Everyday speech of the Delhi region'],
  ['Persian, Arabic, Turkish', 'Many words came into daily speech'],
  ['Urdu', 'Grew from this meeting of languages'],
], 'Table on the meeting of languages: Hindavi or Khari Boli was everyday speech of the Delhi region, Persian, Arabic and Turkish words came into daily speech, and Urdu grew from the meeting');
const vSort = table(['Imagined scene', 'Factor'], [
  ['A lane where shops of many faiths stand side by side', 'Trade and towns'],
  ['A king invites poets of many faiths to his court', 'Patronage by rulers'],
  ['A carver works for a temple and a mosque in one year', 'Artisans for many patrons'],
  ['Everyday speech takes in new words', 'Meeting of languages'],
], 'Table sorting four imagined scenes into factors: a lane of shops is trade and towns, a king inviting poets is patronage, a carver working for a temple and a mosque is artisans for many patrons, and speech taking in new words is the meeting of languages');
const vBhaktiDef = table(['Idea', 'Meaning'], [
  ['Bhakti', 'Devotion and love for a personal God'],
  ['Sincere devotion', 'Counts for more than elaborate ritual'],
  ['The saints', 'Teachers and poets from many regions'],
], 'Table of the meaning of Bhakti: devotion and love for a personal God, sincere devotion counting for more than elaborate ritual, and the saints as teachers and poets from many regions');
const vPrinc1 = table(['Principle', 'In brief'], [
  ['Devotion', 'Love for one personal God'],
  ['Sincerity', 'God is reached by sincere devotion, not elaborate ritual'],
  ['The guru', 'A teacher guides the devotee'],
], 'Table of three Bhakti principles: devotion and love for one personal God, sincere devotion rather than elaborate ritual, and the importance of the guru');
const vPrinc2 = table(['Principle', 'In brief'], [
  ['Equality', 'Many saints rejected caste distinctions'],
  ['Regional languages', 'Songs and poems in the speech of the people, not only Sanskrit'],
  ['Pure living and service', 'Devotion shown in conduct towards others'],
], 'Table of three more Bhakti principles: equality with caste distinctions rejected by many saints, regional languages rather than only Sanskrit, and pure living and service');
const vNorth = table(['Saint', 'Region', 'Known for'], [
  ['Ramananda', 'North India', 'A Bhakti teacher of the north'],
  ['Kabir', 'Varanasi', 'Weaver; one God and unity; criticised empty ritual in all faiths'],
  ['Surdas', 'Braj region', 'A Bhakti poet-saint'],
  ['Tulsidas', 'Awadh region', 'Wrote the Ramcharitmanas in Awadhi'],
  ['Mirabai', 'Rajasthan', 'Devotion to Krishna'],
], 'Table of Bhakti saints of the north: Ramananda of north India, Kabir of Varanasi, Surdas of the Braj region, Tulsidas of the Awadh region who wrote the Ramcharitmanas in Awadhi, and Mirabai of Rajasthan devoted to Krishna');
const vGuru = table(['Saint', 'Ideas, in paraphrase'], [
  ['Kabir', 'A weaver of Varanasi; one God, unity, and criticism of empty ritual in all faiths'],
  ['Guru Nanak (1469 to 1539)', 'First Sikh Guru, of Punjab; one God, equality, honest work, service and langar'],
], 'Table of two saints: Kabir, a weaver of Varanasi who stressed one God and unity, and Guru Nanak, 1469 to 1539, the first Sikh Guru of Punjab who stressed one God, equality, honest work, service and langar');
const vOther = table(['Saint', 'Region', 'Note'], [
  ['Chaitanya Mahaprabhu', 'Bengal and Odisha', 'About 1486 to 1534; kirtan'],
  ['Namdev and Tukaram', 'Maharashtra', 'Saint-poets of the region'],
  ['Sankardeva', 'Assam', 'Saint of the north-east'],
  ['Alvars and Nayanars', 'South India', 'Earlier devotional saints'],
], 'Table of more saints: Chaitanya Mahaprabhu of Bengal and Odisha, about 1486 to 1534, linked with kirtan; Namdev and Tukaram of Maharashtra; Sankardeva of Assam; and the earlier Alvars and Nayanars of south India');
const vScene = table(['Imagined scene', 'Principle'], [
  ['A farmer sings in the speech of his village', 'Regional languages'],
  ['A potter and a scholar sit in one row to sing', 'Equality'],
  ['A woman prays at home without any costly rite', 'Sincere devotion'],
  ['A disciple walks to her teacher each dawn', 'Importance of the guru'],
], 'Table sorting four imagined scenes into principles: a farmer singing in village speech is regional languages, a potter and a scholar sitting in one row is equality, a woman praying without a costly rite is sincere devotion, and a disciple visiting her teacher is the importance of the guru');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three principles of Bhakti'],
  ['(ii)', '3', 'Three saints, each with a region'],
  ['(iii)', '4', 'The teachings of Kabir and of Guru Nanak'],
], 'Table planning a ten-mark answer on the Bhakti movement: part (i) three principles for 3 marks, part (ii) three saints with regions for 3 marks, part (iii) the teachings of Kabir and Guru Nanak for 4 marks');
const vPrincAll = table(['Six Bhakti principles', 'Key word'], [
  ['Love for one personal God', 'Devotion'],
  ['Sincere devotion over elaborate ritual', 'Sincerity'],
  ['Caste distinctions rejected by many saints', 'Equality'],
  ['Regional languages', 'Language'],
  ['A teacher as guide', 'Guru'],
  ['Pure living and service', 'Conduct'],
], 'Table of six Bhakti principles with a key word each: devotion, sincerity, equality, language, guru and conduct');

const vSufiDef = table(['Idea', 'Meaning'], [
  ['Sufis', 'Mystics within Islam'],
  ['Their stress', 'Love and devotion to God'],
  ['Their way of life', 'A simple life and service to humanity'],
], 'Table on the Sufis: mystics within Islam who stressed love and devotion to God, a simple life and service to humanity');
const vSufiFlow = flow('LR', ['Love and devotion to God', 'A simple life', 'Service to humanity'], 'Flow of Sufi principles: love and devotion to God, a simple life, and service to humanity', 'Sufi principles.');
const vTerms = table(['Term', 'Meaning'], [
  ['Pir or sheikh', 'A spiritual teacher'],
  ['Murid', 'A disciple of a pir'],
  ['Khanqah', 'A hospice, open to all'],
  ['Sama', 'A gathering with devotional music, in some orders'],
], 'Table of Sufi terms: pir or sheikh is a spiritual teacher, murid is a disciple, khanqah is a hospice open to all, and sama is a gathering with devotional music in some orders');
const vSilsila = table(['Silsila (order)', 'Note'], [
  ['Chishti', 'Among the best known orders in India'],
  ['Suhrawardi', 'Also among the best known orders in India'],
], 'Table of two Sufi silsilas: the Chishti and the Suhrawardi, both among the best known orders in India');
const vSaints2 = table(['Saint', 'Place', 'Date'], [
  ['Khwaja Moinuddin Chishti', 'Ajmer', 'Died about 1236'],
  ['Nizamuddin Auliya', 'Delhi', 'Died 1325'],
], 'Table of two Chishti saints: Khwaja Moinuddin Chishti of Ajmer, who died about 1236, and Nizamuddin Auliya of Delhi, who died in 1325');
const vKhusrau = table(['Point', 'Fact'], [
  ['Who', 'Amir Khusrau, poet and musician'],
  ['Dates', '1253 to 1325'],
  ['Teacher', 'Nizamuddin Auliya'],
  ['Link', 'Qawwali; traditionally credited with some musical innovations'],
], 'Table on Amir Khusrau: poet and musician, 1253 to 1325, disciple of Nizamuddin Auliya, linked with qawwali and traditionally credited with some musical innovations');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three similarities'],
  ['(ii)', '3', 'Three differences, such as terms and practices'],
  ['(iii)', '4', 'How both helped a villager; no ranking'],
], 'Table planning a ten-mark comparison answer: part (i) three similarities for 3 marks, part (ii) three differences for 3 marks, part (iii) how both helped a villager without ranking for 4 marks');
const vHarmony = flow('LR', ['Saints stress love and service', 'People of many groups meet and respect one another', 'Social harmony and a message of equality'], 'Flow: saints stress love and service, people of many groups meet and respect one another, and social harmony and a message of equality follow', 'Impact on society.');
const vLangImpact = table(['Impact', 'Examples'], [
  ['Regional languages grew', 'Hindi, Punjabi, Bengali, Marathi and others'],
  ['Literature grew', 'Songs and poems in the speech of the people'],
], 'Table on language and literature: regional languages such as Hindi, Punjabi, Bengali and Marathi grew, and songs and poems in the speech of the people grew with them');
const vMusic = table(['Impact', 'Example'], [
  ['Devotional music', 'Kirtan, bhajan, qawwali'],
  ['Simpler forms of worship', 'Less stress on elaborate ceremony'],
  ['Shrines and dargahs', 'Visited by people of many faiths'],
], 'Table of three impacts: devotional music such as kirtan, bhajan and qawwali; simpler forms of worship; and shrines and dargahs visited by people of many faiths');
const vExamples = table(['Field', 'Example of composite culture'], [
  ['Architecture', 'Indo-Islamic style; Fatehpur Sikri'],
  ['Music', 'Hindustani classical traditions; Tansen at Akbar\'s court'],
  ['Painting', 'Mughal miniatures blending Persian and Indian styles'],
  ['Language and literature', 'Urdu; Persian translations of Sanskrit works'],
], 'Table of composite culture by field: architecture with the Indo-Islamic style and Fatehpur Sikri; music with Hindustani classical traditions and Tansen; painting with Mughal miniatures; and language and literature with Urdu and Persian translations of Sanskrit works');
const vClassify = table(['Imagined observation', 'Field'], [
  ['A hall with arches and a dome, and carved brackets and chhatris', 'Architecture'],
  ['A singer in a royal court trained in a classical tradition', 'Music'],
  ['A small painting that mixes a Persian style with Indian scenes', 'Painting'],
  ['A book in which Persian and Hindavi words sit together', 'Language'],
], 'Table sorting four imagined observations into fields: a hall with arches, dome, brackets and chhatris is architecture, a court singer is music, a small painting mixing styles is painting, and a book mixing Persian and Hindavi words is language');
const vMissionTime = table(['Year', 'Event'], [
  ['1498', 'The Portuguese reach India under Vasco da Gama'],
  ['1542', 'St Francis Xavier comes to Goa'],
  ['About 1556', 'A printing press is set up in Goa'],
  ['About 1580', 'Jesuit priests visit Akbar\'s court'],
  ['From 1800', 'William Carey at Serampore; presses and translations'],
], 'Table of dates: 1498 the Portuguese reach India under Vasco da Gama, 1542 St Francis Xavier comes to Goa, about 1556 a printing press in Goa, about 1580 Jesuit priests visit Akbar\'s court, and from 1800 William Carey at Serampore with presses and translations');
const vService = table(['Area', 'Contribution'], [
  ['Printing and translation', 'Presses at Goa and Serampore; texts translated, including into Bengali'],
  ['Education', 'Schools and colleges'],
  ['Social service', 'Hospitals and orphanages; some opposed social evils'],
], 'Table of missionary contributions: printing and translation with presses at Goa and Serampore and texts translated including into Bengali, education through schools and colleges, and social service through hospitals and orphanages, with some missionaries opposing social evils');
const vSumm2 = table(['Topic', 'Key points'], [
  ['Sufism', 'Love of God, simple life, service; pir and murid; khanqahs; silsilas'],
  ['Impact', 'Harmony, equality, regional languages, music, simpler worship, shrines'],
  ['Composite culture', 'Architecture, music, painting, language'],
  ['Missionaries', 'Presses, translations, schools, hospitals, orphanages'],
], 'Summary table of Part 2: Sufism, impact, composite culture and the missionaries, each with its key points');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Composite Culture — Part 1: Why Cultures Blended, and the Bhakti Movement',
  goals: [
    'Explain the factors responsible for the growth of a composite culture in medieval India',
    'State the main principles of the Bhakti movement',
    'Name some Bhakti saints with their regions and describe their ideas',
  ],
  slides: [
    sl('title', 'Composite culture and the Bhakti movement', {
      b: 'Part 1 — why traditions blended, and what the Bhakti saints taught.',
      v: vRoute1,
      n: 'In medieval India, people of many faiths and languages lived side by side. Over time their ways of life blended into a composite culture. In this part we look at the factors that helped it grow, and then at the Bhakti movement, its principles and its saints.',
    }),
    sl('concept', 'What is composite culture?', {
      b: 'A shared way of life that grows when different traditions meet.',
      v: vCompose,
      n: 'A composite culture is a shared way of life formed when people of different traditions meet, live together and mingle their ideas, arts and languages. Nothing is forced on anyone. Each tradition keeps its own character, yet each also borrows from the others, and something new grows.',
    }),
    sl('diagram', 'Six factors behind composite culture', {
      b: 'Several factors worked together.',
      v: vFactors,
      n: 'Look at the web. Six factors helped composite culture grow. People of different faiths lived together for a long time. Rulers gave patronage. The Bhakti and Sufi movements spread love and equality. Trade and towns brought people together. Languages met. And artisans worked for many patrons.',
    }),
    sl('concept', 'Living together, trade and artisans', {
      bl: [
        '**Long living together**: shared festivals, food and work.',
        '**Trade and towns**: markets brought people into contact.',
        '**Artisans** worked for **many patrons**.',
      ],
      v: vLiving,
      n: 'When neighbours of different faiths live together for generations, they share festivals, food and work. Trade and towns add to this, because markets and workshops bring many people together every day. Artisans such as carvers and weavers worked for many patrons, so designs and skills passed from one tradition to another.',
    }),
    sl('concept', 'Patronage by rulers', {
      b: 'Akbar\'s policy of tolerance is a well known example.',
      v: vPatron,
      n: 'Rulers who honoured artists, poets, musicians and scholars gave them a place at court. Artists of different traditions met there and shared ideas and styles. The policy of tolerance followed by the emperor Akbar is a well known example of such patronage.',
    }),
    sl('concept', 'The meeting of languages', {
      bl: [
        '**Hindavi**, also called **Khari Boli**, was everyday speech of the Delhi region.',
        '**Persian, Arabic and Turkish** words came into it.',
        '**Urdu** grew from this meeting.',
      ],
      v: vLang,
      n: 'Languages also met. In the Delhi region people spoke Hindavi, also called Khari Boli. Many Persian, Arabic and Turkish words came into daily speech. Urdu grew from this meeting of languages. Remember that Urdu has roots in the speech of the region itself.',
    }),
    sl('check', 'Quick check: which factor?', {
      b: 'Read the imagined heritage walk and choose the factor.',
      chk: 'm_factor_trade',
      n: 'Read the guide\'s words about the lane of shops. Think about which factor brought different people into daily contact.',
    }),
    sl('example', 'Worked example 1: sort the scene into a factor', {
      b: 'Match each imagined scene with the factor it shows.',
      bl: [
        'Step 1 — Read the scene carefully.',
        'Step 2 — Ask: is it about people, rulers, words or work?',
        'Step 3 — Name the factor.',
        'Step 4 — Give a one-line reason.',
      ],
      v: vSort,
      n: 'Here is a method. Read the scene. Ask whether it is about people, rulers, words or work. Name the factor and give a one line reason. Shops of many faiths side by side show trade and towns. A king inviting poets shows patronage. A carver working for a temple and a mosque shows artisans for many patrons.',
    }),
    sl('concept', 'The Bhakti movement', {
      b: 'Devotion and love for a personal God.',
      v: vBhaktiDef,
      n: 'Bhakti means devotion and love for a personal God. The Bhakti movement was led by saints and poets in many regions. They taught that sincere devotion counts for more than elaborate ritual. In the next slides we look at six principles, three on each slide.',
    }),
    sl('concept', 'Bhakti principles: devotion, sincerity, the guru', {
      bl: [
        'Devotion and love for **one personal God**.',
        'God reached by **sincere devotion**, not elaborate ritual.',
        'The **guru** guides the devotee.',
      ],
      v: vPrinc1,
      n: 'First, devotion and love for one personal God. Second, God can be reached through sincere devotion rather than elaborate ritual. Third, the guru is important. A teacher guides the devotee on the path of love and right conduct.',
    }),
    sl('concept', 'Bhakti principles: equality, language, service', {
      bl: [
        'Many saints **rejected caste distinctions**.',
        '**Regional languages** rather than Sanskrit alone.',
        '**Pure living** and **service**.',
      ],
      v: vPrinc2,
      n: 'Fourth, many saints rejected caste distinctions and stressed the equality of all. Fifth, they used regional languages, so ordinary people could understand them, rather than Sanskrit alone. Sixth, they asked for pure living and service. Devotion was shown in how a person treated others.',
    }),
    sl('check', 'Quick check: a principle in a scene', {
      b: 'Which Bhakti principle does the gathering show?',
      chk: 'm_bhakti_caste',
      n: 'Look at who is sitting together in the imagined gathering. Decide which principle of the Bhakti movement this shows.',
    }),
    sl('diagram', 'Bhakti saints and their regions', {
      b: 'A **schematic** map; positions are approximate and not to scale.',
      v: vMap,
      n: 'This schematic map is not to scale. It shows saints linked with different regions. Guru Nanak is linked with Punjab, Mirabai with Rajasthan, Chaitanya with Bengal and Odisha, Sankardeva with Assam, and Namdev and Tukaram with Maharashtra. Ramananda and Kabir belong to north India.',
    }),
    sl('concept', 'Saints of north India', {
      b: 'Teachers and poets of the north.',
      v: vNorth,
      n: 'Ramananda is remembered as a Bhakti teacher of north India. Kabir was a weaver of Varanasi. Surdas was a Bhakti poet of the Braj region. Tulsidas wrote the Ramcharitmanas in Awadhi, a language of the region. Mirabai of Rajasthan is remembered for her devotion to Krishna.',
    }),
    sl('concept', 'Kabir and Guru Nanak', {
      bl: [
        '**Kabir**: a weaver; **one God** and unity; criticised empty ritual in every faith.',
        '**Guru Nanak** (1469 to 1539): first Sikh Guru; one God, equality, honest work, service, **langar**.',
      ],
      v: vGuru,
      n: 'Kabir was a weaver of Varanasi. He taught that there is one God, stressed unity among people, and criticised empty ritual in every faith. Guru Nanak, who lived from fourteen sixty nine to fifteen thirty nine, was the first Sikh Guru. He taught one God, equality, honest work and service, and the community meal called langar.',
    }),
    sl('concept', 'More saints', {
      b: 'One line on the earlier saints of the south.',
      v: vOther,
      n: 'Chaitanya Mahaprabhu, who lived about fourteen eighty six to fifteen thirty four, is linked with Bengal, Odisha and kirtan. Namdev and Tukaram were saint poets of Maharashtra. Sankardeva is linked with Assam. Earlier, in south India, the Alvars and the Nayanars were devotional saints.',
    }),
    sl('check', 'Quick check: saints and regions', {
      b: 'Match each saint with the region.',
      chk: 'mt_saint_region',
      n: 'Use the map and the table. Match each saint with the region that you remember.',
    }),
    sl('example', 'Worked example 2: from scene to principle', {
      b: 'Match each imagined scene with the principle it shows.',
      bl: [
        'Step 1 — Read what the person does.',
        'Step 2 — Ask: is it about words, rank, ritual or a teacher?',
        'Step 3 — Name the principle.',
      ],
      v: vScene,
      n: 'Use three steps. Read what the person does. Ask whether it is about words, rank, ritual or a teacher. Then name the principle. A farmer singing in village speech shows regional languages. A potter and a scholar sitting in one row show equality. A woman praying without a costly rite shows sincere devotion.',
    }),
    sl('example', 'Worked example 3: planning a 10-mark answer', {
      b: 'Question: (i) Three principles. [3] (ii) Three saints with regions. [3] (iii) Kabir and Guru Nanak. [4]',
      bl: [
        '(i) Devotion, equality, regional languages.',
        '(ii) Three saints, each with a region.',
        '(iii) Two or three points for each saint.',
        'One clear point for each mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one gives three principles. Part two names three saints with their regions. Part three explains the teachings of Kabir and of Guru Nanak, with two points for each.',
    }),
    sl('check', 'Quick check: regional languages', {
      b: 'Decide whether the assertion and the reason are true.',
      chk: 'ar_regional',
      n: 'Check each statement alone first. Then ask whether the reason is correct.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Factors: **living together**, **patronage**, **Bhakti and Sufi movements**, **trade**, **languages**, **artisans**.',
        'Bhakti: **devotion**, **sincerity**, **equality**, **regional languages**, **guru**, **service**.',
        'Saints: Kabir, Guru Nanak, Mirabai, Tulsidas, Chaitanya and others.',
      ],
      v: vPrincAll,
      n: 'To sum up. Composite culture grew from long living together, patronage, the Bhakti and Sufi movements, trade, the meeting of languages and artisans working for many patrons. The Bhakti movement stressed devotion, sincerity, equality, regional languages, the guru, and pure living and service.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Name **each factor** and add a short reason.',
        'Give a **region** with every saint.',
        'Use **neutral, respectful words** for every faith and saint.',
        '**Paraphrase** the ideas; do not try to quote verses.',
        'Say **about** with approximate dates.',
      ],
      n: 'Some exam habits. Name each factor and add a short reason. Give a region with every saint. Use neutral and respectful words for every faith and every saint. Put the ideas in your own words and do not try to quote verses. Say about with dates that are approximate.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Composite Culture — Part 2: The Sufi Movement, Impact and Examples',
  goals: [
    'Explain the main principles of Sufism and name some Sufi saints and orders in India',
    'Explain the impact of the Bhakti and Sufi movements on society, language and religion',
    'Give examples of composite culture and describe the contribution of Christian missionaries',
  ],
  slides: [
    sl('title', 'The Sufi movement, impact and examples', {
      b: 'Part 2 — the Sufis, what the movements left behind, and the missionaries.',
      v: vRoute2,
      n: 'In this part we study the Sufi movement and compare it with the Bhakti movement. Then we look at the impact of both movements, at examples of composite culture, and at the contribution of Christian missionaries to education and social service.',
    }),
    sl('concept', 'Who were the Sufis?', {
      v: vSufiDef,
      bl: [
        'Mystics **within Islam**.',
        'Stressed **love and devotion to God**.',
      ],
      n: 'The Sufis were mystics within Islam. They stressed love and devotion to God, a simple life and service to humanity. Many Sufi teachers settled in towns across India, and their message reached people of many groups.',
    }),
    sl('concept', 'Sufi principles', {
      bl: [
        '**Love and devotion** to God.',
        'A **simple life**.',
        '**Service** to humanity.',
      ],
      v: vSufiFlow,
      n: 'Sufi teaching rests on three ideas. The first is love and devotion to God. The second is a simple life. The third is service to humanity. Together they led many Sufis to open their doors to the poor and to travellers of every group.',
    }),
    sl('concept', 'Pir, murid, khanqah and sama', {
      v: vTerms,
      bl: [
        'A **pir** guides **murids**.',
        'A **khanqah** is open to all.',
        '**Sama**: devotional music in some orders.',
      ],
      n: 'A spiritual teacher, called a pir or a sheikh, guides his disciples, who are called murids. Khanqahs were hospices open to all. Travellers and the poor found food, rest and teaching there. Some orders held sama, a gathering with devotional music.',
    }),
    sl('check', 'Quick check: the hospice', {
      b: 'Name the place described in the imagined traveller\'s notebook.',
      chk: 'm_khanqah',
      n: 'Read the notebook. The place gives food and rest to travellers of every faith. Recall the Sufi word for it.',
    }),
    sl('concept', 'Silsilas, or orders', {
      v: vSilsila,
      bl: [
        'A **silsila** is a Sufi **order**.',
        'The **Chishti** and the **Suhrawardi** are among the best known.',
      ],
      n: 'Sufis were organised in groups called silsilas, or orders. A silsila is a line of teachers and disciples. In India, the Chishti and the Suhrawardi are among the best known. Each had its own centres and followers.',
    }),
    sl('concept', 'Two Chishti saints', {
      v: vSaints2,
      bl: [
        '**Khwaja Moinuddin Chishti**: Ajmer; died about **1236**.',
        '**Nizamuddin Auliya**: Delhi; died **1325**.',
      ],
      n: 'Khwaja Moinuddin Chishti is linked with Ajmer. He is remembered as having died about twelve thirty six. Nizamuddin Auliya lived in Delhi and died in thirteen twenty five. Both are remembered by people of many faiths, and their shrines are visited to this day.',
    }),
    sl('concept', 'Amir Khusrau', {
      v: vKhusrau,
      bl: [
        'Poet and musician, **1253 to 1325**.',
        'A disciple of **Nizamuddin Auliya**.',
        'Linked with **qawwali**.',
      ],
      n: 'Amir Khusrau, who lived from twelve fifty three to thirteen twenty five, was a poet and a musician. He was a disciple of Nizamuddin Auliya. He is linked with the qawwali tradition and is traditionally credited with some musical innovations.',
    }),
    sl('diagram', 'The Bhakti and Sufi movements compared', {
      b: 'Compare in **three boxes**: Bhakti, both, Sufi.',
      v: vCompareFig,
      n: 'This chart compares the two movements. Both stressed love and devotion to God, a simple life and service, a message of equality, and music and song. Bhakti saints spoke of the guru and used regional languages. Sufis had the pir, the murids, the khanqahs and the orders. Compare without ranking.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark comparison', {
      b: 'Question: (i) Three similarities. [3] (ii) Three differences. [3] (iii) How both helped a villager. [4]',
      bl: [
        '(i) Love of God, simple life, equality.',
        '(ii) Guru or pir; kirtan or qawwali; regions or silsilas.',
        '(iii) One point for each movement; then a note: no ranking.',
      ],
      v: vPlan2,
      n: 'To plan this answer, give three points to the similarities, three to the differences and four to the last part. In the last part, explain how a villager could join either movement in a language he understood and be received without regard to birth. End with a note that both are studied on their merits.',
    }),
    sl('concept', 'Impact: harmony and equality', {
      b: 'A message of equality and respect.',
      v: vHarmony,
      n: 'Both movements stressed love and service and set aside narrow divisions. People of different groups learned to meet and respect one another. The result was social harmony and a message of equality that is remembered in the history of the period.',
    }),
    sl('concept', 'Impact: language and literature', {
      bl: [
        'Saints composed in **regional languages**.',
        '**Hindi, Punjabi, Bengali, Marathi** and others grew.',
        '**Literature** in the speech of the people grew.',
      ],
      v: vLangImpact,
      n: 'Saints composed songs and poems in the speech of ordinary people. This helped regional languages such as Hindi, Punjabi, Bengali and Marathi to grow, and with them their literature. More people could now hear and read devotional writing in their own language.',
    }),
    sl('concept', 'Impact: music, worship and shrines', {
      bl: [
        '**Kirtan**, **bhajan**, **qawwali**.',
        '**Simpler forms of worship**.',
        '**Shrines and dargahs** visited by people of many faiths.',
      ],
      v: vMusic,
      n: 'Devotional music grew in the forms of kirtan, bhajan and qawwali. Worship became simpler, with less stress on elaborate ceremony. Shrines and dargahs became places that people of many faiths visit. All of this shows the impact of the two movements on religion and society.',
    }),
    sl('diagram', 'Composite architecture', {
      b: 'A **schematic** gateway: blue for Indo-Islamic features, green for Indian features.',
      v: vArch,
      n: 'This schematic drawing is not a real building. The pointed arch, the dome and the minarets are features of the Indo-Islamic style. The chhatris, the brackets and the carved motifs are Indian features. A building that joins them is a fine example of composite culture. Fatehpur Sikri is one such example.',
    }),
    sl('check', 'Quick check: Fatehpur Sikri', {
      b: 'How should the imagined club describe the building?',
      chk: 'm_fatehpur',
      n: 'Think about the features the student lists. Decide what kind of culture they show.',
    }),
    sl('concept', 'Examples of composite culture', {
      v: vExamples,
      bl: [
        '**Architecture**: Indo-Islamic style.',
        '**Music**: Hindustani classical; Tansen.',
        '**Painting**: Mughal miniatures.',
        '**Language**: Urdu; Persian translations of Sanskrit works.',
      ],
      n: 'Here are four fields. In architecture, the Indo-Islamic style. In music, Hindustani classical traditions, and Tansen at the court of Akbar. In painting, Mughal miniatures, which blended Persian and Indian styles. In language and literature, Urdu, and Persian translations of Sanskrit works.',
    }),
    sl('example', 'Worked example 5: sort the observation', {
      b: 'Decide which field each imagined observation belongs to.',
      bl: [
        'Step 1 — Read the observation.',
        'Step 2 — Is it about buildings, sound, pictures or words?',
        'Step 3 — Name the field and one example.',
      ],
      v: vClassify,
      n: 'Use three steps. Read the observation. Ask whether it is about buildings, sound, pictures or words. Then name the field and an example. A hall with arches, a dome, brackets and chhatris is architecture. A court singer is music. A small painting mixing styles is painting. A book mixing Persian and Hindavi words is language.',
    }),
    sl('concept', 'Christian missionaries: a timeline', {
      b: 'Dates are as commonly taught; some are approximate.',
      v: vMissionTime,
      n: 'The Portuguese reached India in fourteen ninety eight under Vasco da Gama. Saint Francis Xavier came to Goa in fifteen forty two, and about fifteen fifty six a printing press was set up there. About fifteen eighty, Jesuit priests visited the court of Akbar. From eighteen hundred, William Carey worked at Serampore.',
    }),
    sl('concept', 'Education and social service', {
      bl: [
        '**Printing presses** and **translations**, including into **Bengali**.',
        '**Schools and colleges**.',
        '**Hospitals and orphanages**; some opposed social evils.',
      ],
      v: vService,
      n: 'Missionaries set up printing presses at Goa and later at Serampore, and translated texts into Indian languages, including Bengali. They founded schools and colleges. They also opened hospitals and orphanages, and some spoke against social evils of their time. These are their contributions to education and social service.',
    }),
    sl('check', 'Quick check: match the dates', {
      b: 'Match each event with its year.',
      chk: 'mt_missionary_events',
      n: 'Use the timeline you just studied. Match each event with the year that goes with it.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Sufis: **love of God**, **simple life**, **service**; **pir and murid**; **khanqahs**; **Chishti and Suhrawardi**.',
        'Impact: **harmony**, **equality**, **regional languages**, **music**, **shrines**.',
        'Examples: **Fatehpur Sikri**, **Tansen**, **Mughal miniatures**, **Urdu**.',
        'Missionaries: **presses**, **schools**, **hospitals**, **orphanages**.',
      ],
      v: vSumm2,
      n: 'To sum up. The Sufis stressed love of God, a simple life and service, with pirs, murids, khanqahs and orders. The two movements brought harmony, equality, regional languages, music and shared shrines. Composite culture shows in architecture, music, painting and language. Missionaries contributed printing, translation, schools, hospitals and orphanages.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Link every **Sufi term** with its meaning.',
        'Give **two examples** when asked for composite culture.',
        'For missionaries, write only about **education and social service**.',
        'In a comparison, give **both** movements in each point and **do not rank**.',
        'Never quote verses; **paraphrase** the ideas.',
      ],
      n: 'Some exam habits. Link every Sufi term with its meaning. Give two examples when you are asked about composite culture. For missionaries, write about education and social service. In a comparison, give both movements in every point and do not rank them. Never quote verses; put the ideas in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Medieval India: Composite Culture — notes',
  sections: [
    {
      h: '1. Factors for the growth of a composite culture',
      t: 1,
      b: '- **Composite culture:** a shared way of life that grew where different traditions met and mingled.\n- **Long living together** of people of different faiths.\n- **Patronage by rulers**, for example **Akbar\'s** policy of tolerance.\n- The **Bhakti and Sufi movements**.\n- **Trade and towns**.\n- **Meeting of languages:** **Urdu** grew from **Hindavi (Khari Boli)** with Persian, Arabic and Turkish words.\n- **Artisans** working for many patrons.',
      terms: [['Composite culture', 'A culture formed by the blending of different traditions.'], ['Hindavi', 'Everyday speech of the Delhi region, also called Khari Boli.'], ['Patronage', 'Support given to artists and scholars by rulers.']],
      v: vFactors,
      vs: [vLang, vPatron],
    },
    {
      h: '2. The Bhakti movement: principles',
      t: 2,
      b: '- **Bhakti** means devotion and love for one personal God.\n- God can be reached through sincere devotion rather than elaborate ritual.\n- Many saints rejected caste distinctions and stressed equality.\n- They used regional languages rather than Sanskrit alone.\n- The guru is important.\n- Pure living and service.',
      terms: [['Bhakti', 'Devotion and love for a personal God.'], ['Guru', 'A spiritual teacher who guides the devotee.']],
      v: vPrincAll,
      vs: [vPrinc1, vPrinc2],
    },
    {
      h: '3. Bhakti saints and their regions',
      t: 2,
      b: '- **Ramananda:** north India.\n- **Kabir:** a weaver of Varanasi; taught one God and unity and criticised empty ritual in every faith.\n- **Guru Nanak (1469 to 1539):** first Sikh Guru; Punjab; taught one God, equality, honest work, service and the community kitchen called **langar**.\n- **Chaitanya Mahaprabhu (Bengal and Odisha, about 1486 to 1534):** kirtan.\n- **Mirabai:** Rajasthan; devotion to Krishna.\n- **Tulsidas:** wrote the Ramcharitmanas in Awadhi.\n- **Surdas**; **Namdev and Tukaram** (Maharashtra); **Sankardeva** (Assam).\n- Earlier south Indian saints: the **Alvars** and **Nayanars**.',
      terms: [['Kirtan', 'Devotional group singing.'], ['Langar', 'The community kitchen of the Sikh tradition, open to all.']],
      v: vMap,
      vs: [vGuru, vOther],
    },
    {
      h: '4. The Sufi movement: principles and terms',
      t: 3,
      b: '- **Sufis** were mystics within Islam who stressed love and devotion to God, a simple life and service to humanity.\n- A spiritual teacher, the **pir** or **sheikh**, guides disciples called **murids**.\n- **Khanqahs** (hospices) were open to all.\n- **Sama:** devotional music in some orders.\n- **Silsilas** (orders): the **Chishti** and the **Suhrawardi** are among the best known in India.',
      terms: [['Pir', 'A Sufi spiritual teacher, also called a sheikh.'], ['Murid', 'A disciple of a pir.'], ['Khanqah', 'A Sufi hospice, open to all.'], ['Silsila', 'A Sufi order.']],
      v: vTerms,
      vs: [vSilsila],
    },
    {
      h: '5. Sufi saints and Amir Khusrau',
      t: 3,
      b: '- **Khwaja Moinuddin Chishti:** linked with **Ajmer**; died about **1236**.\n- **Nizamuddin Auliya:** of **Delhi**; died **1325**.\n- **Amir Khusrau (1253 to 1325):** poet and musician; a disciple of Nizamuddin Auliya; linked with the **qawwali** tradition and traditionally credited with some musical innovations.\n- Shrines of Sufi saints are visited by people of many faiths.',
      terms: [['Qawwali', 'Devotional music of the Sufi tradition.'], ['Dargah', 'The shrine of a Sufi saint.']],
      v: vSaints2,
      vs: [vKhusrau],
    },
    {
      h: '6. Impact of the Bhakti and Sufi movements',
      t: 4,
      b: '- **Social harmony** and a message of equality.\n- Growth of **regional languages and literature**: Hindi, Punjabi, Bengali, Marathi and others.\n- **Devotional music:** kirtan, bhajan, qawwali.\n- **Simpler forms of worship.**\n- **Shrines and dargahs** visited by people of many faiths.\n- **Similarities:** love and devotion, simple life and service, equality, music, local speech.\n- **Differences:** guru versus pir and murid; kirtan and bhajan versus sama and qawwali; saints of many regions versus silsilas and khanqahs.',
      terms: [['Bhajan', 'A devotional song.'], ['Regional language', 'A language spoken by the people of a region.']],
      v: vCompareFig,
      vs: [vMusic, vLangImpact],
    },
    {
      h: '7. Composite culture in practice, and Christian missionaries',
      t: 4,
      b: '- **Architecture:** the Indo-Islamic style joins arches, domes and minarets with brackets, chhatris and carved motifs; **Fatehpur Sikri** is a good example.\n- **Music:** Hindustani classical traditions; **Tansen** at Akbar\'s court.\n- **Painting:** Mughal miniatures blended Persian and Indian styles.\n- **Language and literature:** Urdu; Persian translations of Sanskrit works.\n- **Missionaries:** Portuguese reach India 1498 (Vasco da Gama); **St Francis Xavier** at Goa 1542; a printing press at Goa about 1556; Jesuits at Akbar\'s court about 1580; **William Carey** at Serampore from 1800, with presses and translations including into Bengali.\n- They founded **schools and colleges, hospitals and orphanages**, and some opposed social evils.',
      terms: [['Indo-Islamic style', 'A style of building that blends features of Islamic and Indian architecture.'], ['Chhatri', 'A small domed pavilion on pillars.'], ['Jesuits', 'Members of a Catholic order of priests.']],
      v: vArch,
      vs: [vExamples, vMissionTime],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the saints and their regions, or giving a saint without a region.\n- Writing that Amir Khusrau was a disciple of Moinuddin Chishti (he was a disciple of Nizamuddin Auliya).\n- Writing that Urdu has no link with the speech of the region.\n- Ranking one faith or saint above another, or using unkind words.\n- Quoting verses instead of paraphrasing the ideas.\n- Writing about the missionaries beyond education and social service.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Composite culture', 'A shared way of life formed when **different traditions** met and mingled.', 'definition', 1],
  ['Six factors for composite culture', 'Living together; **patronage**; **Bhakti and Sufi** movements; **trade and towns**; **languages**; **artisans**.', 'fact', 1],
  ['Akbar and composite culture', 'His **policy of tolerance** is an example of patronage by rulers.', 'fact', 1],
  ['How Urdu grew', 'From **Hindavi (Khari Boli)** with Persian, Arabic and Turkish words.', 'fact', 1],
  ['Artisans and composite culture', 'They worked for **many patrons**, so designs crossed between traditions.', 'concept', 1],
  ['Bhakti', '**Devotion** and love for a personal God.', 'definition', 2],
  ['Bhakti and ritual', 'God reached by **sincere devotion** rather than elaborate ritual.', 'concept', 2],
  ['Bhakti and caste', 'Many saints **rejected caste distinctions** and stressed equality.', 'concept', 2],
  ['Bhakti and language', 'Saints used **regional languages**, not Sanskrit alone.', 'concept', 2],
  ['Bhakti and the guru', 'The **guru** is important as a guide.', 'concept', 2],
  ['Bhakti and conduct', '**Pure living** and **service**.', 'concept', 2],
  ['Ramananda', 'A Bhakti saint of **north India**.', 'fact', 2],
  ['Kabir', 'A **weaver of Varanasi**; one God and unity; criticised empty ritual in every faith.', 'fact', 2],
  ['Guru Nanak', '**1469 to 1539**; first Sikh Guru; Punjab; one God, equality, honest work, service, langar.', 'fact', 2],
  ['Langar', 'The **community kitchen** open to all.', 'definition', 2],
  ['Chaitanya Mahaprabhu', 'Bengal and Odisha; about **1486 to 1534**; kirtan.', 'fact', 2],
  ['Mirabai', '**Rajasthan**; devotion to Krishna.', 'fact', 2],
  ['Tulsidas', 'Wrote the **Ramcharitmanas** in **Awadhi**.', 'fact', 2],
  ['Namdev and Tukaram', 'Saint-poets of **Maharashtra**.', 'fact', 2],
  ['Sankardeva', 'A saint of **Assam**.', 'fact', 2],
  ['Alvars and Nayanars', 'Earlier devotional saints of **south India**.', 'fact', 2],
  ['Sufis', 'Mystics **within Islam**: love of God, simple life, service.', 'definition', 3],
  ['Pir and murid', 'A **pir** (or sheikh) is a teacher; a **murid** is a disciple.', 'definition', 3],
  ['Khanqah', 'A Sufi **hospice**, open to all.', 'definition', 3],
  ['Sama', '**Devotional music** in some Sufi orders.', 'definition', 3],
  ['Silsilas', 'Sufi **orders**: the **Chishti** and the **Suhrawardi** among the best known.', 'fact', 3],
  ['Khwaja Moinuddin Chishti', 'Linked with **Ajmer**; died about **1236**.', 'fact', 3],
  ['Nizamuddin Auliya', 'Of **Delhi**; died **1325**.', 'fact', 3],
  ['Amir Khusrau', '**1253 to 1325**; poet and musician; disciple of Nizamuddin Auliya; qawwali.', 'fact', 3],
  ['Impact: society and language', 'Social **harmony**, equality, and growth of **regional languages** and literature.', 'concept', 4],
  ['Impact: music and worship', '**Kirtan, bhajan, qawwali**; simpler worship; shrines visited by people of many faiths.', 'concept', 4],
  ['Composite architecture', '**Indo-Islamic style**: arches, domes, minarets with brackets, chhatris, carved motifs; Fatehpur Sikri.', 'concept', 4],
  ['Other examples of composite culture', 'Tansen and Hindustani music; **Mughal miniatures**; Urdu; Persian translations of Sanskrit works.', 'concept', 4],
  ['Missionary dates', '**1498** Portuguese; **1542** Xavier at Goa; **about 1556** Goa press; **about 1580** Jesuits at Akbar\'s court; **1800** Carey at Serampore.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Medieval India: Composite Culture',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_factor_akbar', 'm_bhakti_ritual', 'm_pir_murid', 'm_dargah', 'ar_patron', 's_kabir', 's3_impact'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_bhakti', 'l_composite'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Medieval India: Composite Culture',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_factor_urdu', 'm_not_factor', 'm_guru', 'm_tulsidas', 'm_moinuddin', 'm_tansen', 'm_xavier', 'ar_kabir_tulsi', 's_composite_two', 's_nanak', 's_sufi_meaning', 's3_bhakti_principles', 's3_missionary_edu'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sufi', 'l_compare_bs', 'l_missionaries'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch14 only (factors for composite culture; principles of the Bhakti movement with saints and regions; principles of the Sufi movement with saints and orders; impact of the movements, examples of composite culture, and Christian missionaries in education and social service)',
    originality: 'every walk, notebook, panel, school and town is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no verse, hymn or saying of any saint is quoted, ideas are paraphrased',
    data: 'Guru Nanak 1469 to 1539; Chaitanya about 1486 to 1534; Moinuddin Chishti died about 1236; Nizamuddin Auliya died 1325; Amir Khusrau 1253 to 1325; death order asserted in code; missionary dates 1498, 1542, about 1556, about 1580, 1800; map and architecture figure carry schematic-not-to-scale notes',
    facts: 'factors of composite culture; Urdu from Hindavi with Persian, Arabic and Turkish words; Bhakti principles; saints and regions; Sufi principles, pir, murid, khanqah, sama, silsilas; Chishti and Suhrawardi; Indo-Islamic features at Fatehpur Sikri; Tansen; Mughal miniatures; Portuguese 1498, Francis Xavier 1542, Goa press about 1556, Jesuits at Akbar\'s court about 1580, William Carey at Serampore from 1800',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
