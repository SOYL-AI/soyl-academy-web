// CBSE 12 History, ch04 Thinkers, Beliefs and Buildings: Cultural Developments (c. 600 BCE to 600 CE), question
// bank. Every source, diary, letter, museum note and summary is imagined or summarised by SOYL in its own words
// (and labelled as such). No NCERT text, source box, caption, map, figure or exercise and no board or
// sample-paper item is reused or closely paraphrased (D-036); no verse of the Rigveda, the Upanishads, the
// Tipitaka, the Therigatha, the Jaina texts or the Puranas is quoted or translated; no real person is quoted.
// Every religious tradition is described factually, as a historian would, never judged against another, and
// scholarly disagreements (the woman with lotuses and elephants, the Mahabalipuram relief, readings of Sanchi)
// are presented as debates. Places are named in words only: no map work (OA-23 pending).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// Chronology used by the timeline figure (checked in build.mjs). Years before the Common Era are negative.
export const SPAN = [
  [-600, 'Ferment of ideas | Buddha and | Mahavira'],
  [-250, "Ashoka's time | Great Stupa | at Sanchi"],
  [100, 'Buddha images | at Mathura | and Taxila'],
  [450, 'Dashavatara | temple at | Deogarh'],
  [750, 'Kailashnatha | temple at | Ellora'],
];
for (let i = 1; i < SPAN.length; i++) if (SPAN[i][0] <= SPAN[i - 1][0]) throw new Error('SPAN out of order');

// ================================================================ t01 Sanchi; the age of ferment; sacrifices and debates
Q('m_sanchi_loc', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The Great Stupa of Sanchi lies in present-day',
  opts: ['Madhya Pradesh, not far from Bhopal', 'Andhra Pradesh, near Amaravati', 'Bihar, near Gaya', 'Uttar Pradesh, near Deogarh'],
  sol: 'Sanchi stands on a hill close to Bhopal. The other regions are linked with different monuments.',
}));
Q('m_sultan', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these did Sultan Jehan Begum of Bhopal do for the preservation of Sanchi?',
  opts: [
    'She funded a museum and a guesthouse at the site and the printing of John Marshall\'s volumes',
    'She let the French take the eastern gateway to Paris',
    'She had the stupa taken apart and its sculptures sent to Calcutta',
    'She had Sanchi declared a World Heritage site',
  ],
  sol: 'The request for a gateway went to her predecessor, Shahjehan Begum, and ended in casts. Taking a stupa apart is what happened at Amaravati, and the World Heritage listing came long after her time.',
}));
Q('m_ferment', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these thinkers taught in China at about the time of the Buddha?',
  opts: ['Kong Zi', 'Socrates', 'Zarathustra', 'Aristotle'],
  sol: 'Kong Zi is the Chinese thinker; Zarathustra is linked with Iran, and Socrates and Aristotle with Greece.',
}));
Q('m_survive', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Many accounts say that Sanchi survived mainly because the rulers of Bhopal protected it. Which new evidence would most weaken this claim?',
  opts: [
    'Letters showing that the gateways were far too heavy and costly for any foreign party to carry away, whatever the rulers decided',
    'Records that Sultan Jehan Begum paid for a museum at the site',
    'Proof that the stupa at Amaravati was taken apart in the nineteenth century',
    'Plaster casts of the Sanchi gateways displayed in a European museum',
  ],
  sol: 'If removal was never practicable, the rulers\' decisions were not what kept the gateways in place. The other finds fit the claim, or concern a different site, or show only that casts were made.',
}));
Q('m_cole', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'H. H. Cole argued that remains such as those of Amaravati should be left where they stood and copied in plaster. Which reason would a historian studying how a stupa was used find most convincing?',
  opts: [
    'Carvings taken away lose their setting, so questions about where each panel stood and how worshippers met it can no longer be answered',
    'Plaster is a more lasting material than stone',
    'Museums overseas have no room for large objects',
    'The carvings had no religious meaning',
  ],
  sol: 'Position and surroundings belong to the evidence, just as the context of any find does. The other options are untrue or have nothing to do with the method of history.',
}));
Q('m_sacrifice', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How did the sacrifices of the Vedic tradition change over time?',
  opts: [
    'Household sacrifices were joined by large ones, such as the rajasuya and ashvamedha, performed by chiefs and kings',
    'Large royal sacrifices gave way to purely household worship',
    'Sacrifices to Agni gave way to sacrifices to the Buddha',
    'Priests stopped taking part in sacrifices',
  ],
  sol: 'The earliest sacrifices were domestic matters. Later, rulers sponsored grander rites that Brahmana priests conducted. The other options reverse or invent the change.',
}));
Q('m_first_nun', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Who was the first woman to be ordained as a bhikkhuni?',
  opts: ['Mahapajapati Gotami', 'Maya', 'Gargi', 'Yashodhara'],
  sol: 'The Buddha\'s foster mother was admitted first, after Ananda spoke on her behalf. Maya was the Buddha\'s mother, not a bhikkhuni.',
}));
Q('m_jain_vows', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which of these is NOT one of the five vows of a Jaina monk?',
  opts: ['To compose texts in Prakrit', 'Not to kill', 'Not to steal', 'To own no property'],
  sol: 'The five vows are not killing, not stealing, not lying, owning no property and celibacy. Writing in Prakrit was a custom of Jaina authors, not a vow.',
}));
Q('m_middle_path', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A wandering teacher tells a young man to avoid both starving the body and a life of pleasure. Which idea of the Buddha does this advice reflect?',
  opts: ['The middle path', 'Anatta, the absence of a permanent soul', 'Ahimsa as practised by Jaina monks', 'The ashvamedha sacrifice'],
  sol: 'Avoiding the extremes of severe penance and self-indulgence is the path set out in the Sutta Pitaka. The other options concern a soulless world, non-injury and a royal rite.',
}));
Q('m_reject', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which statement would a person following the Buddha\'s teaching, as described in the Sutta Pitaka, be most likely to reject?',
  opts: [
    'A person\'s future depends wholly on the will of the gods, so effort and conduct make no difference',
    'Everything in the world keeps changing',
    'Sorrow is a part of life',
    'Right action helps a person escape rebirth',
  ],
  sol: 'The teaching stresses individual effort and treats social institutions as human creations, so a claim that conduct is irrelevant clashes with it. The other statements match its ideas of transience, sorrow and right action.',
}));
Q('m_sangha_equal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an imagined monastery a former slave, a former king and a former merchant join the sangha in the same season. How should they be regarded inside it?',
  opts: [
    'As equals, whatever their earlier standing',
    'In the order of their earlier rank, with the king first',
    'With the king as head of the monastery',
    'With the slave as servant to the other two',
  ],
  sol: 'Members were regarded as equal within the sangha, which drew followers from many social groups, from kings to slaves.',
}));
Q('m_spread_ev', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which new find would best show that Buddhism had reached the oasis towns of Central Asia?',
  opts: [
    'The ruins of a monastery there, with inscriptions in a local script that mention the sangha',
    'A statue of the Buddha in a museum in Delhi',
    'A Jaina text in Prakrit kept in a library',
    'The remains of a temple at Deogarh',
  ],
  sol: 'Evidence has to come from the region in question and show Buddhist practice there. The other items are located elsewhere or belong to other traditions.',
}));
Q('m_text_fit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A historian wants to learn how Buddhism reached Sri Lanka and who supported its early monks there. Which source would be most useful?',
  opts: [
    'The Dipavamsa and Mahavamsa, chronicles written in Sri Lanka',
    'The Vinaya Pitaka, the rules for the sangha',
    'The Abhidhamma Pitaka, the philosophical collection',
    'The Rigveda, the oldest Vedic collection',
  ],
  sol: 'Chronicles from the island recount its own history, though later writing needs care. The rule-book and philosophical texts address other matters, and the Rigveda is far older than Buddhism.',
}));
Q('m_stupa_shape', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'At an imagined site a hemispherical mound has, at its core, a small casket holding a few bone fragments and a polished crystal bead. A railing pillar nearby records a gift by a guild of weavers. Which conclusion is best supported?',
  opts: [
    'The mound was probably a stupa raised over relics, though the finds alone do not say whose relics they were',
    'The mound was the tomb of the master of the weavers\' guild',
    'The mound was a temple with a tall shikhara',
    'The mound proves that Ashoka himself visited the site',
  ],
  sol: 'A mound with a relic casket and gifts on its railing fits the pattern of Buddhist stupas. Naming the person would need an inscription on the casket or a text. A shikhara belongs to a different kind of building.',
}));
Q('m_relic', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What was usually placed inside the mound of an early Buddhist stupa?',
  opts: [
    'Relics, such as bodily remains or objects used by the Buddha',
    'Copies of the Vinaya Pitaka',
    'Coins of the donor kings',
    'Images of Puranic gods',
  ],
  sol: 'A stupa was a mound raised over relics, and that made it a venerated place.',
}));
Q('m_clockwise', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Devotees showed respect at a stupa by walking round it in which way?',
  opts: [
    'Clockwise, an act called pradakshina',
    'Anticlockwise, an act called vedika',
    'Straight through each torana without turning',
    'Only along the outer railing in a single line',
  ],
  sol: 'Walking round the mound with the right side towards it is pradakshina. The vedika is the railing, not a form of walking.',
}));
Q('m_ashoka_claim', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A text composed long after Ashoka says that he divided the relics of the Buddha among important towns and ordered a stupa raised over each portion. Which finding would best support the text?',
  opts: [
    'Early stupas at several towns, each with a relic casket and railing inscriptions from about the time of the Mauryas',
    'Another text that repeats the same story in the same words',
    'A statue of the Buddha made in the first century CE',
    'A temple carved at Ellora',
  ],
  sol: 'Independent physical evidence of the right date and kind counts for more than a second text that may simply copy the first. Objects of other periods say nothing about Ashoka\'s time.',
}));
Q('m_donations', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined survey of 120 donation records at one stupa, 70 name individual townspeople (men and women), 30 name monks and nuns, 14 name guilds or traders, and 6 name officials or kings. Which conclusion does the survey best support?',
  opts: [
    'Most recorded gifts came from people who were not rulers, though gifts that were never inscribed are not counted',
    'The stupa was built entirely by kings',
    'Monks and nuns paid for every part of the stupa',
    'Guilds were the largest group of donors',
  ],
  sol: 'Only six of the 120 records name an official or a king, so royal gifts were a small share of what was recorded. A count of inscriptions cannot include gifts that left no record.',
}));
Q('m_fit_donor', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'A historian asks which groups of townspeople helped to build stupas and how they described themselves. Which source would be most useful?',
  opts: [
    'Inscriptions on railings and gateways recording gifts',
    'The Ashokavadana, a text about Ashoka',
    'The Vinaya Pitaka, the rules for the sangha',
    'A Jataka story about an earlier birth of the Buddha',
  ],
  sol: 'Donor inscriptions give names, places and occupations. The Ashokavadana tells of a king\'s acts, and the other texts concern monastic rules or stories.',
}));
Q('m_empty_seat', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Two undated panels come from the same region. Panel P shows an empty seat under a tree, with worshippers bowing towards it. Panel Q shows a human figure of the Buddha seated in meditation. Which statement is most reasonable?',
  opts: [
    'P was probably carved earlier, since the Buddha began to be shown in human form only from about the first century CE',
    'Q was probably carved earlier, since images always came before symbols',
    'They must be of the same date because they come from one region',
    'P cannot be Buddhist because it shows no person',
  ],
  sol: 'Early sculptors indicated the Buddha through symbols, and image worship grew later at centres such as Mathura and Taxila. A symbol-only panel therefore points to the earlier practice, though a workshop could have kept using symbols for some time.',
}));
Q('m_maya', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Some historians read a Sanchi relief of a woman with lotuses, flanked by elephants sprinkling water, as Maya, the mother of the Buddha; others read it as Gajalakshmi, a goddess of good fortune. Which new discovery would most favour the second reading?',
  opts: [
    'Seals and coins from non-Buddhist sites showing the same woman between elephants, with no link to the Buddha\'s story',
    'A Buddhist text describing the birth of the Buddha',
    'A donor inscription at Sanchi naming a bhikkhuni',
    'A stupa railing with a wheel carved on it',
  ],
  sol: 'If the same image was used widely where the Buddha\'s story had no place, it points to a popular symbol of good fortune. The other finds concern Buddhist stories, donors or symbols and do not separate the two readings.',
}));
Q('m_identify_scene', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How do art historians usually identify a scene carved at Sanchi as a Jataka story?',
  opts: [
    'By matching its figures and events with a story known from the texts',
    'By reading a name cut beside every figure',
    'By asking priests of today to name it',
    'By comparing it with Greek sculpture',
  ],
  sol: 'Few panels carry labels, so historians compare a scene with stories preserved in texts, taking care where the details differ.',
}));
Q('m_mahayana', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Which find would best show that Mahayana ideas had reached an imagined monastery?',
  opts: [
    'Images of Bodhisattvas worshipped there alongside images of the Buddha',
    'A relic casket under a mound',
    'A railing carved with a wheel symbol and an empty seat',
    'A copy of the Vinaya rules for monks',
  ],
  sol: 'Devotion to Bodhisattvas and to images marks the newer tradition. A relic mound, symbol-only carving and a rule-book belong to older and more general Buddhist practice.',
}));
Q('m_theravada', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Followers of the older Buddhist tradition call it Theravada. Why do many of them avoid the name Hinayana?',
  opts: [
    'Hinayana, meaning lesser vehicle, was a term used by followers of Mahayana for the older tradition',
    'Hinayana is the title of a Pitaka',
    'Hinayana refers to Jaina monks',
    'Hinayana was the name of a Sri Lankan chronicle',
  ],
  sol: 'The label came from outside the older tradition and carried the sense of a smaller path, so its own followers prefer their own name.',
}));
Q('m_puranas', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why were the Puranas composed in simple Sanskrit and meant to be read aloud?',
  opts: [
    'So that listeners of all kinds, including women and Shudras, could follow the stories of the gods',
    'So that only learned priests could follow them',
    'So that they could be carved on temple walls',
    'So that they could be sung in the sangha',
  ],
  sol: 'Plain language and reading aloud widened the audience beyond those who could study difficult texts.',
}));
Q('m_vaishnava', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The outer wall of an imagined shrine carries panels of a boar lifting the earth on its tusks, a lion-headed figure and a prince with a bow. Which conclusion is best supported?',
  opts: [
    'The shrine was probably Vaishnava, but the panels alone do not show when it was built',
    'The shrine was certainly Shaiva, because it has a lion-headed figure',
    'The shrine was Jaina, because it shows animals',
    'The shrine was certainly built in the fifth century CE, because it shows avatars',
  ],
  sol: 'A boar, a lion-headed form and a prince with a bow match avatars of Vishnu, so a Vaishnava shrine is likely. Subject matter does not date a building; that needs inscriptions, style or other evidence.',
}));
Q('m_temple_dev', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Archaeologists record two imagined shrines. Shrine A is a small square room with a single doorway and a flat roof. Shrine B has the same kind of sanctum under a tall tower, with carved walls. Which is the better judgement?',
  opts: [
    'A probably shows an earlier stage, since towers were added over the sanctum in later temples, though local dates must be checked',
    'B is earlier, because towers came before sanctums',
    'A and B must be of equal age',
    'A cannot be a temple because it has no tower',
  ],
  sol: 'Early temples were plain rooms, and the shikhara and carved walls came later. A single pair of buildings cannot settle the matter without evidence of date.',
}));
Q('m_rock', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'The Kailashnatha temple at Ellora was carved out of a single rock. Which inference about its builders is best supported?',
  opts: [
    'They had to plan the whole design in advance, because stone once cut away could not be put back',
    'They joined separate blocks with mortar',
    'They built the base last and the tower first from the ground',
    'They copied a built temple from a distant region',
  ],
  sol: 'Working by removing stone leaves no room for mistakes, which implies careful planning. The other options contradict the method or add facts we do not have.',
}));
Q('m_mahabalipuram', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A large relief at Mahabalipuram is read by some as the descent of the river Ganga and by others as the penance of Arjuna. Which discovery would most favour the first reading?',
  opts: [
    'A record of the period describing the carving of a sacred river coming down from heaven at this very site',
    'Many other reliefs of the same period showing shrines',
    'A text that names Arjuna among the Pandavas',
    'Proof that the relief is cut in granite',
  ],
  sol: 'Only a contemporary record that speaks of this kind of scene at this place bears directly on which story was intended. The other findings fit either reading.',
}));

// ---- assertion-reason
Q('ar_gate', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The foreign claimants for the eastern gateway of Sanchi were content to take plaster-cast copies.',
  r: 'A cast reproduces the carved surface closely enough for study and display, without removing the original from its place.',
  sol: 'Because a cast could serve a museum or a scholar almost as well while the gateway stayed where it was, it gives a reason for their acceptance.',
}));
Q('ar_cole', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'The Great Stupa of Sanchi was dismantled in the nineteenth century and its sculptures sent to Calcutta, Madras and London.',
  r: 'H. H. Cole argued that remains of this kind should not be removed from their sites and that plaster casts should be made instead.',
  sol: 'The dismantling and dispersal describe Amaravati, so the first statement is false. Cole\'s argument is correctly reported.',
}));
Q('ar_therigatha', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The Therigatha is a collection of verses composed by bhikkhunis.',
  r: 'Women were not admitted to the sangha during the Buddha\'s lifetime.',
  sol: 'The first statement is accurate. The second is false, since Mahapajapati Gotami was ordained in his lifetime.',
}));
Q('ar_donors', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  pre: 'In an imagined survey of the records at one large stupa, almost all inscribed gifts came from townspeople, guilds, monks and nuns, and none came from a king.\n\n',
  a: 'A large stupa could be raised without a king paying for it.',
  r: 'Gifts at the stupa came from many different people and groups, each giving a share.',
  sol: 'The survey shows that the building was funded by numerous gifts from non-royal donors, and that spread of small shares is exactly what made a royal payment unnecessary.',
}));
Q('ar_temple', ar({
  t: 4, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Tall towers over the sanctum are found on later temples.',
  r: 'Early temples were small square rooms with a single doorway.',
  sol: 'Both statements are accurate, but a description of the early plan does not tell us why a tower was added later, so it does not explain the first statement.',
}));
Q('ar_barabar', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Barabar caves suggest that rulers in the time of Ashoka supported religious groups other than the Buddhists.',
  r: 'The caves were excavated for the Ajivikas, a separate group of renouncers.',
  sol: 'Caves cut for a different group in a reign remembered for Buddhist stupas are the very evidence for the broader support described.',
}));
Q('ar_gandhara', ar({
  t: 5, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A historian who judges Indian sculpture only by its likeness to Greek models may misread many images.',
  r: 'Images with many arms or heads carried meanings in Indian traditions that Greek art had no use for.',
  sol: 'If an image\'s features were meant to express ideas outside the Greek tradition, measuring it against a Greek standard misses what it was made to say, so the second statement supports the first.',
}));

// ---- true-false
Q('tf_gateway', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Both the French and the English carried away a gateway of the Great Stupa of Sanchi.',
  sol: 'Each was given a plaster-cast copy, and the originals remained in place.',
}));
Q('tf_vinaya', tf({
  t: 2, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? The Buddha laid down rules for the sangha in his lifetime, so the Vinaya Pitaka must have been written down in his lifetime too.',
  sol: 'Rules may go back to his time, but the Tipitaka was compiled after his death. A text can record earlier rules and still be later than them.',
}));
Q('tf_donor_women', tf({
  t: 3, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? Because gifts by women are recorded on stupa railings, historians can conclude that women had the same rights as men in society.',
  sol: 'Such gifts show that some women had means and chose to give. Rights concern property, marriage, ritual and law, which donor records cannot establish.',
}));
Q('tf_barabar', tf({
  t: 4, d: 2, c: 'recall', ans: false,
  stem: 'True or false? The Barabar caves in Bihar were excavated for Jaina monks.',
  sol: 'They were cut for the Ajivikas in the time of Ashoka.',
}));

// ---- fill-blank
Q('fb_unesco', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Sanchi was declared a UNESCO World Heritage site in ___.',
  acc: [['1989']],
  sol: 'The year of the listing was 1989.',
}));
Q('fb_kusinagara', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'According to Buddhist tradition, the Buddha attained mahaparinibbana, his final passing away, at ___.',
  acc: [['Kusinagara', 'Kushinagar', 'Kushinagara', 'Kusinara']],
  sol: 'Kusinagara is the place of his passing; Bodh Gaya and Sarnath mark his enlightenment and first sermon.',
}));
Q('fb_harmika', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The balcony-like structure on top of a stupa\'s dome, regarded as the abode of the gods, is called the ___.',
  acc: [['harmika']],
  sol: 'The harmika sits above the dome and the mast rises from it.',
}));

// ---- match
Q('mt_symbols', match({
  t: 3, d: 2, c: 'recall',
  stem: 'Match each symbol used by early sculptors with what it stands for in the story of the Buddha.',
  pairs: [
    ['An empty seat', 'Meditation'],
    ['A stupa', 'The passing away (mahaparinibbana)'],
    ['A wheel', 'The first sermon at Sarnath'],
    ['A tree', 'Enlightenment'],
  ],
  sol: 'Each symbol recalled an event without showing the Buddha in human form.',
}));
Q('mt_thinkers', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each teacher or group with the position that the accounts of the time attribute to it.',
  pairs: [
    ['Makkhali Gosala and the Ajivikas', 'Everything is fixed in advance and effort cannot change it'],
    ['Ajita Kesakambalin', 'The body returns to its elements at death and nothing survives'],
    ['Mahavira', 'Non-injury to every living being and release through renunciation'],
    ['The Upanishadic thinkers', 'Questions about the self (atman) and the ultimate reality (brahman)'],
  ],
  sol: 'Each position belongs to the teacher or tradition named.',
}));

// ---- ordering
Q('ord_chron', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these developments in chronological order, earliest first.',
  items: [
    'The hymns of the Rigveda are compiled',
    'The Buddha and Mahavira teach',
    'Ashoka orders stupas over relics',
    'Buddha images begin to be made at Mathura and Taxila',
    'The Dashavatara temple is built at Deogarh',
  ],
  sol: 'The Rigveda dates from about 1500 to 1000 BCE, the two teachers from the sixth and fifth centuries BCE, Ashoka from the third century BCE, the first images from the first century CE and Deogarh from about the fifth century CE.',
}));
Q('ord_clues', ord({
  t: 4, d: 2, c: 'application', marks: 1,
  stem: 'Four undated discoveries are made. Using what you know of how images and temples developed, arrange them from probably earliest to probably latest. (W) A gateway panel shows a wheel on a pillar and no human figure of the Buddha. (X) A workshop makes a Buddha statue in human form. (Y) A small square shrine with a single doorway and no tower is built. (Z) A shrine with a tall tower over the sanctum and carved walls is built.',
  items: ['Panel W', 'Statue X', 'Shrine Y', 'Shrine Z'],
  sol: 'Symbols came before images; human images began from about the first century CE; temples began as plain rooms and acquired towers afterwards, so Y precedes Z.',
}));

// ================================================================ short answers (2 marks)
Q('s2_gateways', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The decision of the ruler of Bhopal kept the original gateways at Sanchi. Give two ways in which this decision helps historians who study the stupa today.',
  model: '(1) The **panels can be studied in their original order and setting**, in relation to the mound and to one another. (2) The **donor inscriptions stay beside the parts they record**, so gifts can be linked to particular pillars or panels.',
  sol: 'Two benefits: study in setting, and inscriptions kept with their parts.',
  scheme: [['First sound benefit', 1], ['Second sound benefit', 1]],
}));
Q('s2_sites', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Two imagined stupas have both lost their railings. At Site A the railings were left lying beside the mound; at Site B they were sold and carried to three cities. Which site would be easier for a historian to study, and why?',
  model: '**Site A.** (1) Its railings remain **close to their original position**, so the order and arrangement of the panels can still be worked out. (2) At Site B the pieces are **scattered**, so their setting is lost and some parts may be hard to trace.',
  sol: 'Site A, with a reason from position and one from scattering.',
  scheme: [['Site A chosen with the reason of position', 1], ['Scattering at Site B makes study harder', 1]],
}));
Q('s2_appeal', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the Buddha\'s teaching could appeal to people from different social groups.',
  model: '(1) He taught that **social institutions were made by humans**, not by divine will, so birth did not fix a person\'s worth. (2) The **sangha** treated its members as equal, and people from many groups, from kings to slaves, joined it.',
  sol: 'One reason from the teaching and one from the community.',
  scheme: [['A reason from the teaching', 1], ['A reason from the sangha', 1]],
}));
Q('s2_sangha', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two features of the sangha.',
  model: '(1) It was an **organisation of monks (bhikkhus)** and, later, also of **nuns (bhikkhunis)**. (2) Its members were regarded as **equal** within it, and they lived by the rules recorded in the Vinaya Pitaka.',
  sol: 'Any two features of the community.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s2_vedika', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Only the railing and one gateway survive from an imagined stupa; the mound has gone. What two things can a historian still learn about how the stupa was used or paid for?',
  model: '(1) The **railing marked off a sacred space** round which devotees walked, in pradakshina, so the layout of worship can be traced. (2) **Inscriptions on pillars and cross-bars** show who paid for which parts.',
  sol: 'One point about use and one about funding.',
  scheme: [['How the stupa was used', 1], ['Who paid, from the inscriptions', 1]],
}));
Q('s2_king', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A catalogue states: The Sanchi stupa was built by the king. Using what is known of donors, say what is partly right and what is incomplete.',
  model: '**Partly right:** kings, such as the Satavahanas, did give money for stupas. **Incomplete:** inscriptions also record gifts from guilds, merchants, ordinary women and men, bhikkhus and bhikkhunis, so building rested on **many donors**, not on one ruler.',
  sol: 'What the claim gets right about royal gifts and what it leaves out.',
  scheme: [['What is partly right', 1], ['What is incomplete, with the evidence', 1]],
}));
Q('s2_panels', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined gateway carries two panels: one shows a prince giving away his possessions, the other a woman holding the branch of a tree. Which panel could an art historian identify more easily from the texts, and why?',
  model: 'The **prince panel**: a story of a generous prince can be matched with a **Jataka tale**, such as the Vessantara Jataka. The **woman with the branch** is a shalabhanjika, thought to come from **popular traditions**, so no single text may explain her.',
  sol: 'The panel that matches a story, and why the other is harder.',
  scheme: [['Prince panel, matched with a Jataka', 1], ['Branch figure from popular traditions', 1]],
}));
Q('s2_avatar', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by an avatar in Vaishnavism? Name two avatars.',
  model: 'An **avatar** is a form in which Vishnu is believed to have come to the world; tradition counts **ten**. Examples are **Varaha**, the boar, and **Narasimha**, the lion-headed form; **Rama** and **Krishna** are also counted.',
  sol: 'The meaning of the term and two examples.',
  scheme: [['Meaning of avatar', 1], ['Two avatars named', 1]],
}));
Q('s2_deogarh', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student writes: The Dashavatara temple at Deogarh shows that Vaishnavism began in the fifth century CE. Say what is partly right and what is wrong.',
  model: '**Partly right:** by about the fifth century CE, Vishnu was worshipped in a **built stone temple** with sculpture of his avatars. **Wrong:** the date of one building shows when it was made, not when the tradition began, and worship of Vishnu and his stories were **already known earlier**.',
  sol: 'What the date shows about worship and what it cannot show.',
  scheme: [['What is partly right', 1], ['What is wrong: a building date is not the start of a tradition', 1]],
}));
Q('s2_relief', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A large relief at Mahabalipuram is read by some as the descent of the Ganga and by others as the penance of Arjuna. Suggest one feature for each reading and say why the debate is not settled.',
  model: '**Descent of the Ganga:** a cleft that may stand for a flowing river, with serpent figures. **Penance of Arjuna:** a lone ascetic doing penance. The debate remains open because the relief carries **no label** and each story can be matched with some of its parts.',
  sol: 'One feature for each reading and the lack of a decisive clue.',
  scheme: [['One feature for each reading', 1], ['No label, so the debate is open', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_begums', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the part played by the Begums of Bhopal in preserving Sanchi.',
  model: '(1) **Shahjehan Begum** was asked by the French and the English for a gateway; both accepted plaster casts, so the originals stayed. (2) She and her successor **Sultan Jehan Begum** gave money for the preservation of the site. (3) Sultan Jehan Begum funded a **museum and a guesthouse**, where John Marshall lived and wrote, and paid for the **publication of his volumes** on Sanchi.',
  sol: 'The gateway request, the money for preservation and the museum with Marshall\'s volumes.',
  scheme: [['Gateway request handled with casts', 1], ['Money for preservation', 1], ['Museum, guesthouse and Marshall\'s volumes', 1]],
}));
Q('s3_readings', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A visitor who has read no Buddhist text says that the trees and serpents carved at Sanchi show that people worshipped trees and serpents. A guide disagrees. Explain how each reading arises and what evidence could decide between them.',
  model: 'The visitor\'s reading rests on **motifs seen without texts**, as James Fergusson once argued. The guide reads the scenes with the help of **Buddhist stories and symbols**, such as the tree for enlightenment. Evidence that could decide: **donor inscriptions** naming the sangha and panels that **match known stories** point to a Buddhist setting, while a cult setting would need separate proof.',
  sol: 'Origin of each reading and the kinds of evidence that bear on it.',
  scheme: [['How the first reading arises', 1], ['How the second reading arises', 1], ['Evidence that could decide', 1]],
}));
Q('s3_teachings', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three teachings of the Buddha as found in the Sutta Pitaka.',
  model: '(1) The world is **transient (anicca)** and has no permanent soul **(anatta)**, and sorrow **(dukkha)** is part of existence. (2) The **middle path** lies between severe penance and self-indulgence. (3) People can escape rebirth and reach **nibbana** by their own effort and right action; social institutions are human creations, not divine will.',
  sol: 'Three teachings drawn from the Sutta Pitaka.',
  scheme: [['Transience, soullessness and sorrow', 1], ['Middle path', 1], ['Individual effort towards nibbana', 1]],
}));
Q('s3_extremes', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Two teachers in an imagined town give advice. One tells his disciples to fast for weeks and live without shelter; the other tells his followers to enjoy every comfort and give no thought to conduct. How would a follower of the Buddha\'s teaching judge each?',
  model: '(1) The first teacher goes to the extreme of **severe penance**, which the middle path does not ask for. (2) The second goes to the other extreme of **self-indulgence** and ignores the stress on **right action**. (3) Both miss the **middle path**, which avoids both extremes and rests on one\'s own effort towards release.',
  sol: 'Each teacher placed against the middle path, and the common failing.',
  scheme: [['First teacher: severe penance', 1], ['Second teacher: self-indulgence and conduct', 1], ['Both miss the middle path', 1]],
}));
Q('s3_stupas', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The Ashokavadana says that Ashoka divided relics of the Buddha among important towns and ordered stupas over them. Explain three reasons why a historian would want other evidence before accepting this account.',
  model: '(1) The text was **composed long after Ashoka**, so it may rest on memory and legend. (2) It was written by Buddhists who **honoured him**, so it may enlarge his role. (3) The **dating of early stupas, relic caskets and railing inscriptions** is needed to check where and when stupas were actually raised.',
  sol: 'Distance in time, the attitude of the writers and the need for physical dating.',
  scheme: [['Composed long after the events', 1], ['Authors honoured the king', 1], ['Physical evidence needed to check', 1]],
}));
Q('s3_puranas', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how the Puranas helped Vaishnavism and Shaivism to reach a wider audience.',
  model: '(1) The Puranas contained **stories of gods and goddesses**, such as Vishnu and Shiva, which made devotion vivid. (2) They were composed in **simple Sanskrit**, so more people could follow them. (3) They were meant to be **read aloud**, so everyone, including women and Shudras, could hear them.',
  sol: 'Stories, simple language and reading aloud.',
  scheme: [['Stories of gods and goddesses', 1], ['Simple Sanskrit', 1], ['Read aloud to all', 1]],
}));
Q('s3_relief', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined relief closely matches a story known from a text, but it adds an animal that the story does not mention and leaves out a character that the text names. How should an art historian proceed?',
  model: '(1) Treat the match as a **likely identification**, not a certainty, because the main events agree. (2) Note the **differences** and ask whether the sculptors knew another version of the story or added details of their own. (3) Look for **other evidence**, such as inscriptions or neighbouring panels, before settling the identification.',
  sol: 'A cautious identification, attention to differences and a search for further evidence.',
  scheme: [['Likely but not certain identification', 1], ['Weigh the differences', 1], ['Seek further evidence', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_survival', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'To what extent did the actions of the rulers of Bhopal, rather than other factors, explain the survival of the Sanchi stupa?',
  model: '1. **Their actions:** Shahjehan Begum was approached for the eastern gateway, and Sultan Jehan Begum later funded a museum, a guesthouse and Marshall\'s volumes.\n2. **A compromise:** the French and the English accepted plaster casts, so removal did not happen.\n3. **A contrast:** the stupa at Amaravati was dismantled and its sculptures scattered, so survival was not automatic.\n4. **Other factors:** the willingness of the foreign parties to take casts, and a growing view, voiced by H. H. Cole, that remains should stay in place, also mattered.\n5. **Judgement:** the rulers\' decisions and money were a major cause, but not the only one.',
  sol: 'Their actions, the compromise, the contrast, other factors and a judgement.',
  scheme: [['Actions of the rulers', 1], ['Casts as a compromise', 1], ['Amaravati as contrast', 1], ['Other factors', 1], ['Reasoned judgement', 1]],
}));
Q('l_appeal', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Examine how the Buddha\'s teachings and the sangha helped Buddhism to attract people from different social groups.',
  model: '1. **Teachings:** the world is transient and sorrow is part of life, but release is possible through one\'s own effort and right action.\n2. **Social ideas:** social institutions were treated as human creations, so birth did not fix a person\'s worth.\n3. **Sangha:** an organisation of monks and later nuns, whose members were regarded as equal; followers ranged from kings to slaves.\n4. **Women:** Mahapajapati Gotami was the first woman ordained, after Ananda spoke for her, and the Therigatha preserves verses by bhikkhunis.\n5. **Limits:** most of this evidence comes from Buddhist texts, so it shows the ideal of the community more clearly than daily practice.',
  sol: 'Teachings, social ideas, the sangha, women and a limit of the evidence.',
  scheme: [['Teachings', 1], ['Social ideas', 1], ['The sangha and equality', 1], ['Women in the sangha', 1], ['Limits of the evidence', 1]],
}));
Q('l_vedic', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'To what extent did the new teachers of about 600 BCE break with the sacrificial tradition of the Vedas?',
  model: '1. **Continuity:** the Upanishads, which began around this time, belong to the Vedic tradition and raised questions about the atman and brahman.\n2. **Rival voices:** Makkhali Gosala and Ajita Kesakambalin put forward fatalist and materialist views.\n3. **Jainism:** Mahavira taught non-injury to all living beings and release through renunciation.\n4. **Buddhism:** the Buddha stressed individual effort and treated social institutions as human creations.\n5. **Judgement:** the break was partial; some teachers questioned sacrifice and rank, while Brahmana priests continued to perform rites.',
  sol: 'Continuity, rival voices, two new traditions and a balanced judgement.',
  scheme: [['Continuity within the Vedic tradition', 1], ['Rival voices', 1], ['Jaina ideas', 1], ['Buddhist ideas', 1], ['Reasoned judgement', 1]],
}));
Q('l_stupa', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the structure of a stupa and explain how its building was paid for.',
  model: '1. **Mound:** the **anda**, a hemispherical mound, covered the relics.\n2. **Top:** the **harmika**, a balcony-like structure regarded as the abode of the gods, carried the **yashti**, a mast with a **chhatri**, or umbrella.\n3. **Railing and gateways:** a **vedika** separated the sacred space, and **toranas**, richly carved at Sanchi, gave entry.\n4. **Use:** devotees walked round it clockwise.\n5. **Donors:** inscriptions record gifts from kings, guilds, merchants, ordinary women and men, bhikkhus and bhikkhunis.',
  sol: 'The parts of a stupa, its use and the donors.',
  scheme: [['Anda', 1], ['Harmika, yashti and chhatri', 1], ['Vedika and toranas', 1], ['Pradakshina', 1], ['Donors', 1]],
}));
Q('l_sculpture', long({
  t: [3, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Assess how far the sculpture at Sanchi can be read as an illustration of Buddhist ideas.',
  model: '1. **For:** early sculptors showed the Buddha through symbols, an empty seat, a stupa, a wheel and a tree, and many scenes can be matched with Jataka stories.\n2. **Texts help:** art historians use texts to identify scenes.\n3. **Against:** some figures, such as the shalabhanjika, may come from popular traditions.\n4. **Debates:** the woman with lotuses and elephants is read as Maya by some and as Gajalakshmi by others; Fergusson, without consulting Buddhist texts, saw tree and serpent worship.\n5. **Judgement:** much of the carving is Buddhist in setting, but each image needs careful identification.',
  sol: 'Evidence for, the use of texts, evidence against, the debates and a judgement.',
  scheme: [['Symbols and Jatakas', 1], ['Use of texts', 1], ['Popular traditions', 1], ['Debated readings', 1], ['Reasoned judgement', 1]],
}));
Q('l_temples', long({
  t: 4, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Trace the development of temple architecture in the early centuries, with examples.',
  model: '1. **Beginning:** early temples were small square rooms, the **garbhagriha**, with a single doorway.\n2. **Later additions:** a tall **shikhara** was built over the central shrine, and the walls were carved with sculpture.\n3. **Example at Deogarh:** the Dashavatara temple in Uttar Pradesh dates from about the fifth century CE.\n4. **Rock-cut forms:** the Barabar caves in Bihar were cut for the Ajivikas in Ashoka\'s time, and the Kailashnatha temple at Ellora, of the eighth century CE, was carved from a single rock.\n5. **Link:** these shrines housed images of the gods of Puranic traditions.',
  sol: 'Early plan, later additions, an example, rock-cut forms and the link with worship.',
  scheme: [['Early plan', 1], ['Shikhara and carving', 1], ['Deogarh', 1], ['Rock-cut examples', 1], ['Link with Puranic worship', 1]],
}));

// ================================================================ source-based (4 marks each)
Q('sb_diary', source({
  t: [1, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a clerk with a survey party and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a clerk with a survey party (imagined), Sanchi, cold season**\n\nDay 4. Our leader, Mr Hale, asked an officer of the Begum\'s court for leave to carry one carved gateway to a museum overseas. The officer replied that so great a matter must be put to the Begum herself. Meanwhile he led us to a trench where labourers, by her order, were clearing fallen stones and undergrowth from the foot of the mound.\n\nDay 6. Word has come that Mr Hale will take plaster casts of the gateway panels instead. The plaster-maker needs three days for each panel. Mr Hale grumbles that a cast is a poor thing, but he admits that it will show every figure.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Whose permission did the officer say had to be sought for the removal of the gateway?', model: 'The **Begum\'s**, the ruler of Bhopal.', sol: 'Read the officer\'s reply on Day 4.', scheme: [['The Begum', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Mr Hale grumbles that a cast is a poor thing but admits that it will show every figure. What does this suggest about why he accepted casts?', model: 'He **could not obtain the original**, and he judged that a cast would still **serve as a record of the carvings**.', sol: 'Combine the refusal to hand over the gateway with his admission about casts.', scheme: [['No original available; cast still a useful record', 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The diary was written by a clerk in a party that wanted the gateway. Give two points a historian should keep in mind before accepting its account of the officer\'s attitude.', model: '(1) The clerk belonged to the **party that wanted the gateway**, so he may describe events from its side. (2) The diary is **one person\'s private record** of a few days and cannot show what the Begum herself decided or why.', sol: 'Two cautions about the author\'s position and the limits of one diary.', scheme: [['Author\'s position', 1], ['One record cannot show the ruler\'s decision', 1]] }),
    [short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two kinds of evidence, not found in this diary, that would help a historian learn what happened to the gateway request.', model: '(1) **Letters or court records** of Bhopal showing the Begum\'s reply. (2) **Records of the museum or party** that received the casts, and the gateways themselves, still standing at the site.', sol: 'Two kinds of evidence from other sources.', scheme: [['Records of the court', 1], ['Records of the party, and the gateways', 1]] })]),
  ],
}));
Q('sb_vinaya', source({
  t: [2, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a summary of one part of the Buddhist texts, and answer the questions that follow. ${SUM}`,
  passage: '**What one collection of Buddhist texts records (summary)**\n\nThis summary describes one of the three collections of Buddhist texts. It sets out how members of the sangha should live. Monks are to depend on alms for food, to own very few things, and to meet regularly to admit their faults. It tells how a new member is admitted, what to do when members quarrel, and where monks may stay during the rains. It also contains rules for nuns. The collection was put together after the Buddha\'s death.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the collection (Pitaka) that this summary describes.', model: 'The **Vinaya Pitaka**.', sol: 'Rules for the sangha belong in this collection.', scheme: [['Vinaya Pitaka', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'What does the existence of rules for settling quarrels suggest about the sangha?', model: 'That it was an **organised community** in which **disagreements arose** and had to be handled by agreed procedures.', sol: 'A rule for quarrels implies that quarrels occurred and that the community was organised.', scheme: [['Organised, with disagreements handled by procedure', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): A historian wants to use this text to describe the daily life of the Buddha himself. Give two cautions.', model: '(1) The collection was **put together after his death**, so its account may be shaped by later memory. (2) A rule-book shows **how members were meant to live**, not necessarily how they did, and it says little about the Buddha\'s own routine.', sol: 'A caution about date and a caution about the kind of text.', scheme: [['Compiled after his death', 1], ['Rules show ideals, not practice', 1]] }),
    [short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two other kinds of evidence, not found in this summary, that would show how lay people supported monks and nuns.', model: '(1) **Donor inscriptions** on stupa railings and gateways recording gifts from townspeople. (2) The **remains of monastery buildings** and the places where they stood in relation to towns.', sol: 'Two kinds of evidence of lay support.', scheme: [['Donor inscriptions', 1], ['Monastery remains and their setting', 1]] })]),
  ],
}));
Q('sb_panel', source({
  t: [3, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source from an imagined museum guide's notes and answer the questions that follow. ${IMAG}`,
  passage: '**Museum guide\'s notes on a gateway panel (imagined)**\n\nPanel 2, northern gateway of an imagined stupa. A leafy tree rises over a plain stone seat on which no one sits. Men and women stand around it with folded hands, and some carry garlands. At the left edge, a wheel is set on top of a pillar. No inscription names the scene. On the base, a cut line records a gift for the stupa by a metal-worker\'s wife and her son.\n\nVisitors often ask why the main figure is missing. Scholars who read the panel with the help of the texts say that the empty seat and the tree are a way of showing presence without showing a body.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name one symbol on the panel that early sculptors used for the Buddha\'s presence.', model: 'A **tree**, an **empty seat** or a **wheel** (any one).', sol: 'Read the first paragraph of the notes.', scheme: [['One symbol named', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'The panel shows no human figure of the Buddha. What does this suggest about when it was probably carved?', model: 'Probably **before the Buddha began to be shown in human form**, that is, before about the first century CE, when sculptors relied on symbols.', sol: 'Link the absence of a human figure to the date at which images began.', scheme: [['Before human images, about the first century CE', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): A visitor who has read no Buddhist text says that the panel shows worship of a tree. Give two points from the panel that a historian could use to question this view.', model: '(1) The worshippers bow towards the **empty seat**, not only the tree, which suggests that a person is honoured through it. (2) The **wheel on the pillar** and the **gift recorded for the stupa** fit a Buddhist setting, in which symbols stand for events in the Buddha\'s life.', sol: 'Two features of the panel that point to a Buddhist reading.', scheme: [['Empty seat and gestures of respect', 1], ['Wheel and the gift for the stupa', 1]] }),
    [short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The base records a gift by a metal-worker\'s wife and her son. Give two things that this adds to what we know about how stupas were built.', model: '(1) **Ordinary townspeople**, including a woman, took part in funding stupas, not only kings. (2) Donors **recorded their names and family ties** in inscriptions, which gives historians evidence about people who left no other record.', sol: 'Two points about donors and about the evidence the record preserves.', scheme: [['Ordinary people and women gave', 1], ['Inscriptions preserve names and ties', 1]] })]),
  ],
}));
Q('sb_donors', source({
  t: [3, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a summary of what donor inscriptions on stupas usually record, and answer the questions that follow. ${SUM}`,
  passage: '**What donor inscriptions on early stupas usually record (summary)**\n\nShort inscriptions cut on the railings and gateways of early stupas follow a similar pattern. Most give the name of the donor and, often, the town from which the donor came. Some name a parent, spouse or child, and some add an occupation, such as metal-worker, weaver or householder. Many say which part was given: a pillar, a cross-bar, a panel or a whole gateway. A few are by monks and nuns, and a few by officials or kings.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name one thing that a donor inscription usually records.', model: 'The donor\'s **name**, **home town**, **family tie**, **occupation** or the **part** given (any one).', sol: 'Read the second to fourth sentences.', scheme: [['One detail named', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Several records name a guild as the donor. What does this suggest about craft workers in the towns near the stupa?', model: 'That they were **organised in groups** and had **enough wealth** to make gifts to a stupa.', sol: 'A guild is a group, and giving needs resources.', scheme: [['Organised and able to give', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): A historian counts the occupations named in the records. Give two reasons why the count may not show the true mix of people in the towns.', model: '(1) Only people who **chose to have a gift recorded** appear, so those who gave without an inscription, or who gave nothing, are missed. (2) The records cover **donors to one religious site**, who may differ from townspeople who followed other traditions.', sol: 'Two limits: who chose to record and which people used the site.', scheme: [['Only recorded gifts appear', 1], ['Donors to one site are not all townspeople', 1]] }),
    [short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest one question about the society of the time that these records can help answer and one that they cannot.', model: '**Can answer:** which kinds of workers and which families gave money, and from which towns. **Cannot answer:** how wealthy donors were compared with the rest, or what rights women had, since the records show only that a gift was made.', sol: 'One answerable question and one beyond the evidence.', scheme: [['A question the records can answer', 1], ['A question they cannot answer, with the reason', 1]] })]),
  ],
}));
Q('sb_letter', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined letter by a pilgrim and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a pilgrim to her sister (imagined)**\n\nDear Rani, we have reached the town below the hill. The new shrine of Vishnu stands at its edge, a small square room of stone with a single doorway and a porch held up by pillars; there is no tower. On its outer wall are panels that show the god in different forms: a boar lifting the earth, a lion-headed figure and a prince with a bow.\n\nIn the evening a priest reads stories of the gods from a book, in plain Sanskrit that even we could follow, and farmers, potters and women with children sit and listen together. Not far away is a mound where monks live, and I saw our people leaving garlands there too.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name one form of Vishnu shown on the walls of the shrine.', model: '**Varaha** (the boar), **Narasimha** (the lion-headed form) or **Rama** (any one).', sol: 'Read the first paragraph.', scheme: [['One form named', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'The shrine has a single doorway and no tower. What does this suggest about its date compared with temples that have a tall shikhara?', model: 'It was probably built **earlier**, since towers over the sanctum came in **later** temples.', sol: 'Use the order in which temple features developed.', scheme: [['Earlier, since towers came later', 1]] })),
    child('c', short({ t: [4, 5], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): The letter shows farmers, potters and women listening together. What can a historian infer from this about who Puranic traditions reached, and what can she not infer?', model: '**Infer:** the readings reached **people of several occupations and women**, not only priests. **Cannot infer:** whether they sat as **equals** or had the same standing, since the letter is one pilgrim\'s view of one evening.', sol: 'An inference about reach and a limit about status.', scheme: [['Inference about who was reached', 1], ['A limit on what the letter shows', 1]] }),
    [short({ t: [4, 5], d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): A student says that Buddhism and Puranic traditions were rivals in this town because a mound and a shrine stand close together. Give two reasons why this claim is unsafe.', model: '(1) The pilgrim says **her own people** left garlands at the mound, so the same people may have honoured both. (2) Standing **side by side** shows only that both existed; it does not show **conflict**, and one letter cannot speak for the whole town.', sol: 'Two reasons: shared devotion and the limits of one letter.', scheme: [['People honoured both', 1], ['Closeness is not conflict; one letter is thin evidence', 1]] })]),
  ],
}));
