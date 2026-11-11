// CBSE 12 History, ch02 Kings, Farmers and Towns: Early States and Economies (c. 600 BCE-600 CE) — question bank.
// Originality rules (D-036): every source passage is either an imagined document or a SOYL summary written in
// SOYL's own words, and is labelled as such; no NCERT text, source box, translation of an inscription or
// chronicle, exercise, caption or board/sample-paper item is reused; no quotation or translation of any
// inscription (including the Prayaga prashasti, which is only described); no invented quote is put in the
// mouth of a real person. Real people (Prinsep, Chandragupta, Ashoka, Megasthenes, Harishena, Samudragupta,
// Prabhavati Gupta) are named only for facts. No map items (OA-23): places are named in words only.
// Competency tags are honest (owner rule): wrapper scenarios are understanding, not application.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUMM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Prinsep and Piyadassi; the mahajanapadas
Q('m_epigraphy', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The study of inscriptions, writing cut into stone, metal and other hard surfaces, is called',
  opts: ['Epigraphy', 'Numismatics', 'Archaeobotany', 'Genealogy'],
  sol: 'Numismatics is the study of coins and archaeobotany the study of ancient plant remains. Genealogy traces family descent.',
}));
Q('m_prinsep_who', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which officer of the East India Company\'s mint deciphered the Brahmi and Kharosthi scripts in the 1830s?',
  opts: ['James Prinsep', 'Alexander Cunningham', 'John Marshall', 'Mortimer Wheeler'],
  sol: 'Prinsep worked at the mint and read Brahmi and Kharosthi, which opened up the early inscriptions. Cunningham and Marshall are linked with Harappan archaeology, and Wheeler with twentieth-century excavation.',
}));
Q('m_piyadassi', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Prinsep found that most inscriptions he read named a king as Piyadassi, a word meaning "pleasant to behold". How could this king be identified with Ashoka?',
  opts: [
    'An inscription naming Ashoka was found, and other inscriptions used the same royal epithets',
    'Ashoka signed his personal name at the end of every rock edict',
    'A Greek traveller wrote that Piyadassi was the name of Ashoka\'s father',
    'Piyadassi turned out to be the name of the script in which Ashoka wrote',
  ],
  sol: 'The name of the king did not appear on most inscriptions. The link was made when an inscription that named Ashoka was found, alongside the shared royal titles.',
}));
Q('m_script_region', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Most Ashokan inscriptions were composed in Prakrit. Which script was used for them in the north-west of the subcontinent?',
  opts: ['Kharosthi', 'Brahmi', 'Devanagari', 'The Roman alphabet'],
  sol: 'Brahmi was used across most of the subcontinent, while Kharosthi was used in the north-west. Devanagari and the Roman alphabet came into use much later.',
}));
Q('m_gana', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which feature best marks off a gana or sangha, such as the Vajji, from a kingdom ruled by a monarch?',
  opts: [
    'Power was shared among a group of men instead of being held by a single king',
    'It had no capital town and no army',
    'It was ruled by a Brahmana chosen by the Dharmasutras',
    'It paid no taxes and had no neighbours',
  ],
  sol: 'In a gana or sangha, rule lay with a body of men. Such states were not defined by the absence of towns or armies, and the Dharmasutras were rules for kings, who were expected to be Kshatriyas.',
}));
Q('m_imagined_kingdom', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'An imagined kingdom of the fifth century BCE has rich river plains, but no iron ore inside its borders and no forests with elephants nearby, while its neighbour has both. Using the reasons that explain Magadha\'s strength, which disadvantage is this kingdom most likely to face in a long war?',
  opts: [
    'It would find it hard to equip its soldiers with iron weapons and to field elephants unless it traded for them or conquered the neighbour',
    'Its fertile plains would make its farmers unable to pay any tax at all',
    'It would be unable to use rivers for travel and communication',
    'It would be unable to build a fortified capital of any kind',
  ],
  sol: 'Magadha gained from iron mines for tools and weapons and from forests that supplied elephants. A state lacking both would depend on others for them. Fertile land and rivers are advantages, not weaknesses, and nothing in the case prevents fortification.',
}));
Q('m_dating_capital', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined, undated traveller\'s note describes a Magadhan capital as newly built beside a great river, with the king leaving his old fortified settlement among the hills. Which period does the note most probably describe?',
  opts: [
    'The fourth century BCE, when the capital moved from Rajagaha to Pataliputra',
    'The first century CE, when the Kushanas issued gold coins',
    'The sixth century CE, when fewer gold coins are found',
    'The nineteenth century, when Brahmi was deciphered',
  ],
  sol: 'A hill-fortress capital replaced by a new capital on a great river fits the move from Rajagaha to Pataliputra. The other periods have no link with a change of Magadhan capital.',
}));
Q('m_prinsep_evidence', mcq({
  t: [1, 5], d: 3, c: 'understanding',
  stem: 'An imagined epigraphist finds a pillar inscription in Prakrit that opens with the royal epithet devanampiya Piyadassi. The king\'s personal name is nowhere on it. Which conclusion is the most careful?',
  opts: [
    'It was probably issued by the same king as other inscriptions with these epithets, but calling him Ashoka needs evidence such as an inscription that carries his name',
    'It must be a record made by Prinsep\'s team in the 1830s',
    'It proves that the king ruled the whole subcontinent',
    'It cannot be read because Prakrit was never written down',
  ],
  sol: 'The shared epithets are a good clue to the same issuer, yet the epithets are titles and do not by themselves name the person. The other options go beyond, or against, the evidence.',
}));
Q('ar_capital', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The capital of Magadha was shifted from Rajagaha to Pataliputra in the fourth century BCE.',
  r: 'Magadha had access to iron mines in present-day Jharkhand.',
  sol: 'Both statements are true, but R does not explain A. The iron mines were one reason for Magadha\'s general strength; they do not account for the choice of a new capital site.',
}));
Q('ar_scripts', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'All of Ashoka\'s inscriptions in Afghanistan were written in Kharosthi.',
  r: 'Aramaic and Greek were used for some of Ashoka\'s inscriptions in Afghanistan.',
  sol: 'R is true, and it shows that A is false: some inscriptions in that region used Aramaic and Greek, not Kharosthi.',
}));
Q('ar_gana', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The Vajji state was ruled by a group of men and not by a single king.',
  r: 'All the sixteen mahajanapadas were ruled by groups of men and none had a king.',
  sol: 'A is true. R is false, because most of the sixteen were monarchies and only some were ganas or sanghas.',
}));
Q('tf_prinsep', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? James Prinsep, who deciphered Brahmi and Kharosthi, served in the mint of the East India Company.',
  sol: 'Prinsep was an officer of the Company\'s mint in Calcutta; his decipherment was done alongside that work.',
}));
Q('ord_empires', ord({
  t: [1, 2, 3], d: 1, c: 'understanding', marks: 1,
  stem: 'Arrange these developments of early India, between c. 600 BCE and c. 600 CE, in the order in which they happened.',
  items: [
    'Sixteen mahajanapadas are named in Buddhist and Jaina texts',
    'Chandragupta Maurya founds the Mauryan empire',
    'Kushana rulers issue gold coins on a large scale',
    'The Gupta rulers rise to power',
  ],
  sol: 'Sixth century BCE, c. 321 BCE, first century CE, then the fourth century CE.',
}));
Q('s_epigraphy', short({
  t: [1, 5], d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define epigraphy and name the two scripts in which most Ashokan inscriptions in the subcontinent were written.',
  model: 'Epigraphy is the study of inscriptions, writing cut into hard surfaces such as rock, pillars and metal plates. Most Ashokan inscriptions were written in Brahmi, which was used over most of the subcontinent, and in Kharosthi, which was used in the north-west.',
  sol: 'A correct meaning, then both scripts.',
  scheme: [['Meaning of epigraphy', 1], ['Brahmi and Kharosthi named', 1]],
}));
Q('s_piyadassi', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did Prinsep\'s reading of the royal epithet Piyadassi help historians to place Ashoka in early Indian history?',
  model: 'Prinsep found that most of the early inscriptions he read named a king as Piyadassi, meaning pleasant to behold. Once an inscription naming Ashoka was found, historians could connect this king with Ashoka and use the edicts as Ashoka\'s own evidence.',
  sol: 'The common epithet, then the link to Ashoka and its use.',
  scheme: [['Piyadassi in most inscriptions', 1], ['Link to Ashoka; edicts used as evidence', 1]],
}));
Q('s_gana', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Compare a kingdom and a gana or sangha of the sixth century BCE on any two points.',
  model: 'A kingdom had a single ruler, and the Dharmasutras expected such rulers to be Kshatriyas. A gana or sangha was ruled by a group of men who shared power, as in the Vajji state. Magadha was a kingdom; the Vajji were a gana.',
  sol: 'One mark for each side of the comparison, with an example.',
  scheme: [['Kingdom: single ruler, with a supporting detail', 1], ['Gana or sangha: rule by a group, with example', 1]],
}));
Q('s3_mahajanapadas', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three features of the mahajanapadas of the sixth century BCE.',
  model: '1. Buddhist and Jaina texts of the time list sixteen mahajanapadas, including Magadha, Koshala, Kuru, Panchala, Gandhara, Avanti and Vajji.\n2. Most were ruled by kings, but some, such as the Vajji, were ganas or sanghas ruled by a group of men.\n3. Capitals were often fortified, and rulers collected taxes and tribute, raided neighbours and kept armies.',
  sol: 'Any three distinct features.',
  scheme: [['Sixteen named in the texts', 1], ['Kings and ganas', 1], ['Fortified capitals, taxes, armies', 1]],
}));
Q('s3_new_inscription', short({
  t: [1, 5], d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined epigraphist finds a worn pillar inscription with an unfamiliar royal title and a damaged last line. Describe three steps a careful historian should take before using it as evidence.',
  model: '1. Compare the readable letters and words with other inscriptions in the same script, as Prinsep did with Brahmi.\n2. Record clearly which letters are damaged or uncertain and avoid guessing the meaning of missing words.\n3. Check the reading against other evidence, such as an inscription that names the ruler, before drawing conclusions.',
  sol: 'Method applied to a new find: compare, record doubts, cross-check.',
  scheme: [['Compare with other inscriptions', 1], ['Mark uncertain parts, no guesswork', 1], ['Cross-check with other evidence', 1]],
}));
Q('l_prinsep', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the work of James Prinsep on early inscriptions and explain how it changed the study of early Indian history.',
  model: '1. **Prinsep**, an officer of the East India Company\'s mint, deciphered Brahmi and Kharosthi in the 1830s; Ashokan Brahmi was read by 1838.\n2. Most Ashokan inscriptions were in Prakrit, in Brahmi across most of the subcontinent and Kharosthi in the north-west, with Aramaic and Greek in Afghanistan.\n3. He found that most inscriptions named a king as Piyadassi, meaning pleasant to behold, and some used the epithet devanampiya.\n4. An inscription naming Ashoka allowed the king to be identified.\n5. Early inscriptions became readable evidence in the rulers\' own words, and epigraphy became a major source for political history.',
  sol: 'Who and when, the scripts, Piyadassi, the identification, and the consequence.',
  scheme: [['Prinsep and the decipherment', 1], ['Scripts and languages', 1], ['Piyadassi and devanampiya', 1], ['Identification with Ashoka', 1], ['Wider effect on history', 1]],
}));
Q('l_magadha', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain why Magadha became the most powerful mahajanapada between the sixth and fourth centuries BCE. Do you find natural advantages or the actions of rulers the more convincing explanation? Give a reason.',
  model: '1. **Land:** fertile land supported farming, a large population and revenue.\n2. **Resources:** iron mines in present-day Jharkhand gave tools and weapons, and forests supplied elephants.\n3. **Communication:** the Ganga and its tributaries made movement easy.\n4. **Rulers:** Buddhist and Jaina writers credited ambitious kings such as Bimbisara, Ajatasattu and Mahapadma Nanda, helped by ministers; the capital shifted from Rajagaha to Pataliputra.\n5. **Judgement:** nature offered the opportunity, but other regions also had fertile land and rivers, so rulers who used these gifts were probably decisive. Either view, with a reason, is acceptable.',
  sol: 'Land, resources, communication, rulers, and a reasoned judgement.',
  scheme: [['Fertile land', 1], ['Iron and elephants', 1], ['Communication', 1], ['Ambitious rulers and ministers', 1], ['Reasoned judgement', 1]],
}));
Q('sb_notebook', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined notebook of a copyist working for a scholar in Calcutta, and answer the questions that follow. ${IMAG}`,
  passage: '**Notebook of a copyist working for a Calcutta scholar (imagined), 1836**\n\nThe pillar copy has now been set beside three others. Each begins with the same royal title, one that means pleasant to behold, and beside it stands a second title, which my master reads as beloved of the gods. He says all four may speak for one king, though no personal name appears. The lower lines of the third copy are too worn to read. He has forbidden me to fill the gaps by guesswork. The royal name, he says, must wait until some text turns up that gives it plainly.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'What feature of the four copies led the scholar to suspect that one king was meant?', model: 'Each copy began with the same royal title meaning pleasant to behold, with a second title beside it.', sol: 'The shared opening titles.', scheme: [['Shared titles', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'analysis', marks: 1, stem: 'What does the scholar\'s ban on filling gaps by guesswork show about how historians should treat a damaged text?', model: 'A reading should rest on what can be seen and checked, and uncertain parts should be marked as uncertain.', sol: 'Evidence before conjecture.', scheme: [['Reading must rest on checkable evidence', 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the notebook, explain two difficulties of reading early inscriptions.', model: '(1) Damage: lines can be so worn that letters are lost and gaps remain. (2) Missing information: the king\'s titles appear but no personal name, so he cannot be named until another text supplies it.', sol: 'Two difficulties drawn from the notebook.', scheme: [['First difficulty', 1], ['Second difficulty', 1]] }), [
      short({ t: [1, 5], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the scholar right to wait for a text naming the king before calling him Ashoka? Give two reasons.', model: '(1) The titles alone could fit more than one possibility, so naming a king needs plain evidence. (2) A wrong identification would mislead later readers, whereas waiting lets later finds confirm or correct the reading.', sol: 'A judged answer with two reasons.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 The Mauryan empire and Ashoka's dhamma
Q('m_chandragupta', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Who founded the Mauryan empire around 321 BCE?',
  opts: ['Chandragupta Maurya', 'Bimbisara', 'Mahapadma Nanda', 'Ajatasattu'],
  sol: 'Bimbisara, Ajatasattu and Mahapadma Nanda were earlier rulers of Magadha. Ashoka was the grandson of Chandragupta.',
}));
Q('m_centres', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which one of the following was NOT among the five major political centres of the Mauryan empire?',
  opts: ['Puhar', 'Taxila', 'Ujjayini', 'Suvarnagiri'],
  sol: 'The centres were Pataliputra (the capital), Taxila, Ujjayini, Tosali and Suvarnagiri. Puhar, also called Kaveripattinam, is known as a port town of the Tamil country.',
}));
Q('m_megasthenes', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which statement about Megasthenes\' account of the Mauryan empire is correct?',
  opts: [
    'It was written by a Greek ambassador at Chandragupta\'s court and survives only in fragments',
    'It survives complete on a single set of copper plates found at Pataliputra',
    'It was cut on Ashokan pillars in the Brahmi script',
    'It is a Buddhist text composed long after the empire ended',
  ],
  sol: 'Megasthenes was a contemporary and an outsider; his work is known from fragments. The other statements describe different kinds of source.',
}));
Q('m_dhamma_content', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which instruction, if found in a newly discovered edict, would fit LEAST with Ashoka\'s dhamma as known from other edicts?',
  opts: [
    'An order that all subjects must give up the practices of their own sects and follow those of the king',
    'A direction that officers should explain why elders deserve respect',
    'A plea for generosity to Brahmanas and renouncers',
    'A call for kindness to servants and slaves',
  ],
  sol: 'Dhamma included respect for the beliefs and traditions of others, so an order to abandon one\'s own practices would contradict it. The other instructions match principles known from the edicts.',
}));
Q('m_dhamma_evidence', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined student claims that Ashoka\'s dhamma was a religious doctrine forced on all his subjects. Which feature of dhamma best exposes the flaw in this claim?',
  opts: [
    'It was a set of general moral principles that included respect for the beliefs of others, not a creed with rituals of its own',
    'It was announced only in Aramaic and Greek',
    'It was explained to the people by officers called dhamma mahamattas',
    'It was inscribed on rocks and pillars',
  ],
  sol: 'A doctrine that asks people to respect other traditions is not imposing one creed. Officers and inscriptions were means of spreading dhamma, which could support the student\'s claim as easily as refute it, so they do not expose the flaw.',
}));
Q('m_control_limits', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Ashoka\'s inscriptions are found at places far apart, from Afghanistan in the north-west to the Deccan in the south. Which reading of this spread is the most careful?',
  opts: [
    'It shows how far the king\'s message and officials reached, but not that his control was equally strong everywhere',
    'It proves that every village between those places obeyed him equally',
    'It shows that the empire had no centres of administration',
    'It shows that all the inscriptions were copied from a single stone',
  ],
  sol: 'The spread of the edicts shows reach. Strength of control is a different matter and needs other evidence, which suggests that authority was stronger near centres than away from them.',
}));
Q('m_inscr_inference', mcq({
  t: [2, 5], d: 3, c: 'application',
  stem: 'An imagined museum label summarises a new rock inscription: it addresses the people at large, uses the epithet devanampiya, asks officers to explain moral principles including respect for other beliefs, and is in Prakrit written in Kharosthi at a site in the north-west. Which judgement is best?',
  opts: [
    'It is probably an Ashokan edict of the Mauryan period, with a script suited to the north-west, but it should be compared with other edicts',
    'It is a Gupta prashasti, because it addresses the king\'s praise to the people',
    'It is a donor record of a guild of merchants',
    'It must be a forgery, because Kharosthi was never used for Prakrit',
  ],
  sol: 'The epithet, the moral message, the officers and the language all point to the Ashokan edicts, and Kharosthi suits the north-west. A prashasti praises a king and a donor record notes a gift, which this does not.',
}));
Q('ar_mahamatta', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'Ashoka appointed special officers called dhamma mahamattas.',
  r: 'He wanted the message of dhamma to reach people across his large empire.',
  sol: 'Both are true, and R explains A: the officers were appointed to carry the principles of dhamma to the people.',
}));
Q('ar_megasthenes', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Mauryan administrative control was strongest around Pataliputra and the provincial centres.',
  r: 'Megasthenes\' account of the Mauryan empire survives only in fragments.',
  sol: 'Both statements are true, but R does not explain A. Control was uneven because of distance and communication, whereas the fragmentary survival of one text concerns what evidence we have, not how the empire worked.',
}));
Q('tf_dhamma', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Ashoka\'s dhamma was a new religion with its own priests and rituals.',
  sol: 'Dhamma was a body of moral principles, including respect for the beliefs of others, spread by officers and inscriptions.',
}));
Q('fb_mahamatta', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Ashoka appointed special officers called dhamma ___ to spread his message.',
  acc: [['mahamattas', 'mahamatta']],
  sol: 'They were the dhamma mahamattas.',
}));
Q('mt_sources', match({
  t: 2, d: 2, c: 'recall',
  stem: 'Match each item connected with the Mauryan empire with its description.',
  pairs: [
    ['Megasthenes', 'A Greek ambassador whose account survives only in fragments'],
    ['Arthashastra', 'A text whose parts were probably composed by Kautilya or Chanakya'],
    ['Dhamma mahamattas', 'Officers appointed to spread the principles of dhamma'],
    ['Pataliputra', 'The capital of the Mauryan empire'],
  ],
  sol: 'Each item is paired with its standard description.',
}));
Q('s_sources_maurya', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A historian wants to know how the Mauryan army was organised. Would Megasthenes\' account or Ashoka\'s inscriptions be more useful? Give one reason and one limitation of the source you choose.',
  model: 'Megasthenes\' account would be more useful, because it mentions a committee with six subcommittees that coordinated military activity, including the navy, horses and elephants. Its limitation is that it survives only in fragments and gives an outsider\'s view, so it needs checking against other evidence.',
  sol: 'A source chosen with a reason, and one limit of that source.',
  scheme: [['Source chosen with a reason', 1], ['A limitation of that source', 1]],
}));
Q('s_dhamma', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two principles of Ashoka\'s dhamma.',
  model: 'Ashoka\'s dhamma asked people to respect their elders and to treat servants and slaves kindly. It also urged generosity to Brahmanas and renouncers and respect for the religions and traditions of other people.',
  sol: 'Any two of the principles, stated correctly.',
  scheme: [['First principle', 1], ['Second principle', 1]],
}));
Q('s3_maurya_admin', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three features of the administration of the Mauryan empire.',
  model: '1. The empire had five main political centres: the capital Pataliputra and, besides it, Taxila, Ujjayini, Tosali and Suvarnagiri.\n2. Control was strongest around the capital and the provincial centres, and communication ran along land and river routes.\n3. Megasthenes mentions a committee with six subcommittees that coordinated military activity, such as the navy, transport and supplies, foot soldiers, horses, chariots and elephants.',
  sol: 'Centres, uneven control and communication, and the military committee.',
  scheme: [['Five political centres', 1], ['Uneven control; routes of communication', 1], ['Committee with six subcommittees', 1]],
}));
Q('s3_dhamma', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Was Ashoka\'s dhamma a new religion? Give three points in support of your answer.',
  model: '1. No. Dhamma was a set of moral principles, such as respect for elders, kindness to servants and slaves, and generosity to Brahmanas and renouncers.\n2. It asked people to respect the beliefs and traditions of others, which shows it was not tied to one faith.\n3. It was spread by special officers, the dhamma mahamattas, and by inscriptions, and not by priests or rituals of its own.',
  sol: 'A clear answer, supported by principles, tolerance and the means of spread.',
  scheme: [['Moral principles named', 1], ['Respect for other beliefs', 1], ['Means of spreading it', 1]],
}));
Q('l_dhamma', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Assess the importance of Ashoka\'s dhamma. How far was it a means of holding together a large empire?',
  model: '1. **Meaning:** dhamma was a set of moral principles: respect for elders, generosity to Brahmanas and renouncers, kind treatment of servants and slaves, and respect for the traditions of others.\n2. **Spread:** dhamma mahamattas were appointed to carry the message, and it was inscribed on rocks and pillars in Prakrit and in other scripts and languages.\n3. **For the empire:** a shared moral message could reach peoples of many regions and customs, and may have eased tensions among groups.\n4. **Limits:** the edicts are Ashoka\'s own statements, so they do not prove that people followed dhamma; control was also uneven.\n5. **Judgement:** dhamma was probably one tool among several, with officers and armies, and not the only one.',
  sol: 'Meaning, spread, value to the empire, limits of the evidence, and a weighed judgement.',
  scheme: [['Principles of dhamma', 1], ['How it was spread', 1], ['How it could help the empire', 1], ['Limits of the evidence', 1], ['Weighed judgement', 1]],
}));
Q('l_compare_sources', long({
  t: [2, 5], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare Ashoka\'s inscriptions and Megasthenes\' account as sources for the history of the Mauryan empire. Which is more useful for understanding the king\'s policies? Give reasons.',
  model: '1. **Inscriptions:** cut on rocks and pillars, they preserve the king\'s own words, in Prakrit and other languages, and speak of dhamma.\n2. **Megasthenes:** a Greek ambassador at Chandragupta\'s court; his account survives only in fragments, but mentions a committee with six subcommittees for military activity.\n3. **Strength:** the inscriptions show what the king wished to announce; Megasthenes gives an outsider\'s view of the court and army.\n4. **Weakness:** the inscriptions leave out much of ordinary life, and Megasthenes is incomplete.\n5. **Judgement:** for policy, the inscriptions are more direct, but they give only the king\'s view, so both should be combined with archaeology and later texts.',
  sol: 'Each source described, strengths and weaknesses compared, and a reasoned choice.',
  scheme: [['Inscriptions described', 1], ['Megasthenes described', 1], ['Strengths compared', 1], ['Weaknesses compared', 1], ['Reasoned choice', 1]],
}));
Q('sb_edict', source({
  t: [2, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of a kind of Ashokan edict, and answer the questions that follow. ${SUMM}`,
  passage: '**SOYL summary of a kind of Ashokan edict**\n\nMany of Ashoka\'s edicts on rocks and pillars speak to the people at large. They advise respect for elders, kindness towards servants and slaves, generosity to Brahmanas and renouncers, and respect for the beliefs and customs of others. Some mention officers appointed to explain these ideas. The edicts are issued in the king\'s name and are mostly in Prakrit.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the officers who, according to the summary, were appointed to explain these ideas.', model: 'The dhamma mahamattas.', sol: 'The officers for spreading dhamma.', scheme: [['Dhamma mahamattas', 1]] })),
    child('b', short({ t: [2, 5], d: 2, c: 'application', marks: 1, stem: 'Give one question about the Mauryan empire that these edicts, as summarised, are poorly placed to answer, and say why.', model: 'How the army was organised or how much farmers paid, because the edicts as summarised are moral advice to the people and not records of administration.', sol: 'An absence in the evidence, with the reason.', scheme: [['Question and reason', 1]] })),
    child('c', short({ t: [2, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The edicts speak to the people at large and are mostly in Prakrit. What does this suggest about whom Ashoka wanted to reach, and how could a historian test whether the message reached them? Give one point on each.', model: '(1) It suggests he wanted to reach ordinary people in many regions, and not only officials and the court, through a widely understood language. (2) A historian could look at where the edicts stand and at other evidence, such as later texts or archaeology, for signs that the principles were followed.', sol: 'An inference about the audience and a way of testing it.', scheme: [['Inference about the audience', 1], ['A way to test whether it reached them', 1]] }), [
      short({ t: [2, 5], d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Does a king\'s own announcement of a policy prove that his subjects followed it? Give two reasons.', model: '(1) The edicts show what the king wanted people to do, not what they actually did. (2) They were issued in his name and give his viewpoint, so other evidence is needed to see their effect.', sol: 'Two reasons about the reliability of a ruler\'s own record.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 New notions of kingship; changing rural society
Q('m_kushana_title', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which title did the Kushana kings adopt to claim a high, god-like status?',
  opts: ['Devaputra', 'Piyadassi', 'Mahamatta', 'Gahapati'],
  sol: 'Devaputra means son of god. Piyadassi is the epithet found in Ashokan inscriptions, a mahamatta was an officer, and a gahapati was a household head.',
}));
Q('m_samanta', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which group of powerful local lords was important to the working of Gupta rule?',
  opts: ['Samantas', 'Vellalar', 'Satthavahas', 'Dhamma mahamattas'],
  sol: 'The Guptas depended on samantas. Vellalar were large landowners of the Tamil country, satthavahas were traders, and the mahamattas served Ashoka.',
}));
Q('m_jatakas', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'For which question would a land-grant inscription be more useful to a historian than a Jataka story?',
  opts: [
    'Who received rights over a village\'s produce after a royal gift',
    'How villagers felt about a king\'s heavy taxes',
    'What peasants said to one another at harvest time',
    'The exact pay of Mauryan soldiers',
  ],
  sol: 'A grant records who was given what, so it can show who held rights over the produce of the village after the gift. Stories hint at feelings and tensions; neither source gives the exact pay of soldiers.',
}));
Q('m_production', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The iron-tipped ploughshare spread in the Ganga and Kaveri valleys, but in drier regions the hoe stayed in use. What does this best suggest?',
  opts: [
    'New techniques spread unevenly, depending on soil and conditions, so production did not rise in the same way everywhere',
    'The hoe was a more advanced tool than the iron ploughshare',
    'Farmers in drier regions did not grow any crops',
    'Iron ploughshares came into use in every region at the same time',
  ],
  sol: 'Different tools suited different land, so gains in production varied from place to place. The other options contradict the evidence or claim far more than it shows.',
}));
Q('m_prashasti_use', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A prashasti says a king defeated every ruler of a region, yet coins of one of those rulers go on being issued for many years afterwards. What is the best interpretation?',
  opts: [
    'The claim may be exaggerated, or that ruler may have continued under the king as a subordinate, so the poem cannot be taken at face value',
    'The coins must be later forgeries',
    'The poem proves that the ruler was never defeated',
    'Coins and poems can never be compared with each other',
  ],
  sol: 'Two kinds of evidence disagree, so a historian looks for an explanation that fits both: praise that overstates, or a defeated ruler who stayed in place as a subordinate. Neither forgery nor a refusal to compare is justified.',
}));
Q('m_prabhavati_use', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined student argues that in early India women never controlled land or made grants. Which evidence from this period best challenges that claim?',
  opts: [
    'An inscription recording a land grant made by Prabhavati Gupta, daughter of Chandragupta II, who married into the Vakataka family',
    'The Prayaga prashasti composed by Harishena for Samudragupta',
    'A hoard of punch-marked silver coins',
    'A fragment of Northern Black Polished Ware',
  ],
  sol: 'A single grant made by a woman is enough to challenge the word never. The prashasti, the coins and the pottery do not concern a woman\'s control of land.',
}));
Q('m_land_interp', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which of these statements about land grants is an interpretation by historians, and not a detail normally recorded in the grants themselves?',
  opts: [
    'Kings made grants to win allies and extend their influence where their control was weak',
    'The grant was made to a Brahmana or a religious institution',
    'The grant was engraved on copper plates',
    'The grant names the ruler who made the gift',
  ],
  sol: 'The plates record who gave what to whom. Why a king gave land is inferred, and is debated; the three other statements describe contents or form of the record.',
}));
Q('fb_sangam', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'In the Tamil Sangam texts, large landowners were called ___ and ploughmen were called ___.',
  acc: [['vellalar'], ['uzhavar']],
  sol: 'The Sangam texts call large landowners vellalar and ploughmen uzhavar; slaves were called adimai.',
}));
Q('mt_terms', match({
  t: [3, 4], d: 2, c: 'recall',
  stem: 'Match each term from the study of early rural society and towns with its meaning.',
  pairs: [
    ['Gahapati', 'A Pali term for a household head who controlled its land and workers'],
    ['Vellalar', 'Large landowners in the Tamil country'],
    ['Agrahara', 'Land granted to Brahmanas'],
    ['Shreni', 'A guild of craftspeople or merchants'],
  ],
  sol: 'Each term is paired with its usual meaning in the chapter.',
}));
Q('s_land_reason', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why do historians disagree about the reasons for land grants? Give two explanations they offer.',
  model: 'Grants are recorded, but their reasons are often not stated, so historians infer them. Some think grants helped extend agriculture to new areas; others think kings made them to win allies and to show their power over a region.',
  sol: 'The cause of the disagreement, then two views.',
  scheme: [['Why there is disagreement', 1], ['Two explanations', 1]],
}));
Q('s_kushana', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe two ways in which the Kushana kings tried to claim a high status.',
  model: 'Kushana rulers adopted the title devaputra, or son of god, to suggest a link with the divine. They also had colossal statues of themselves installed at a shrine at Mat near Mathura and in Afghanistan.',
  sol: 'The title, and the statues.',
  scheme: [['Title devaputra', 1], ['Colossal statues in shrines', 1]],
}));
Q('s3_rural', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why did the iron ploughshare and the transplanting of paddy not benefit all groups in rural society equally? Explain with reference to three groups.',
  model: '1. Large landholders, such as the vellalar or the gahapati, gained most, since higher yields from their land and workers raised their wealth.\n2. Small peasants gained only if they had land, ploughs and water to use the new methods.\n3. Landless labourers and slaves such as the adimai worked harder for the gain of others, so differences in the countryside grew.',
  sol: 'Three groups, each linked to how far it gained from better production.',
  scheme: [['Large landholders', 1], ['Small peasants', 1], ['Landless labourers and slaves', 1]],
}));
Q('l_land', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the evidence for land grants in early India. To what extent do they show that kings were extending agriculture?',
  model: '1. **Evidence:** from about the beginning of the Common Era, inscriptions, often on copper plates, record grants to Brahmanas and religious institutions; land given to Brahmanas was called agrahara.\n2. **Example:** Prabhavati Gupta, daughter of Chandragupta II and married into the Vakataka family, granted land.\n3. **First view:** grants brought new land under the plough.\n4. **Second view:** kings made grants to win allies and display power, perhaps where their control was weak.\n5. **Judgement:** the plates record the gift but rarely the motive, so neither view is certain, and both purposes may have worked together.',
  sol: 'Evidence, example, two views, and a judgement on how far the evidence allows a conclusion.',
  scheme: [['Evidence of grants', 1], ['An example', 1], ['First view', 1], ['Second view', 1], ['Judgement on the evidence', 1]],
}));
Q('sb_plates', source({
  t: [3, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined museum guide's notes on an exhibit, and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of a museum guide (imagined), describing an exhibit: a set of copper plates**\n\nThe plates are tied together with a ring. They record that a ruler gave a village, with its fields, wells and tanks, to a group of Brahmanas. The text names the ruler, lists the boundaries of the village and says the recipients may enjoy its produce. Visitors often ask why a king would give away a village. I tell them that historians disagree: some think such gifts helped bring new land under cultivation, others think kings used gifts to win the support of influential groups. The plates themselves say what was given, but not why.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Who received the village according to the guide\'s notes?', model: 'A group of Brahmanas.', sol: 'The recipients named in the notes.', scheme: [['Brahmanas', 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'application', marks: 1, stem: 'Name one kind of evidence, other than the plates, that could help a historian test whether grants really brought new land under cultivation.', model: 'Archaeological or other written evidence showing whether the land was waste or forest before the grant and farmed afterwards.', sol: 'Evidence of land use before and after.', scheme: [['A suitable kind of evidence', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: '**Either** (i): A second plate records a grant of forested land to a temple. Which of the two views would this support more, and why? Give two points.', model: '(1) It would support the first view, that grants helped bring new land under cultivation, because forested land was not yet farmed. (2) It would not prove it, as the plate does not say that farming followed or what the king intended.', sol: 'A view chosen, with the limit of the evidence.', scheme: [['View chosen and why', 1], ['Limit of the evidence', 1]] }), [
      short({ t: [3, 5], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which of the two views would a king with weak control over a distant area be more likely to act on, and why? Give two points.', model: '(1) The second view, because giving land to influential groups could win allies where control was weak. (2) The recipients would then have a stake in the king\'s success and could support his power locally.', sol: 'A view chosen and reasoned from the situation.', scheme: [['View chosen', 1], ['Reasoning', 1]] }),
    ]),
  ],
}));
Q('sb_prashasti', source({
  t: [3, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of a kind of royal praise-poem, and answer the questions that follow. ${SUMM}`,
  passage: '**SOYL summary of a kind of royal praise-poem**\n\nIn the Gupta age, kings had poems of praise cut into stone. One famous example was composed by the court poet Harishena for Samudragupta and is cut on a pillar at Prayaga. Poems of this kind describe the king\'s qualities and the rulers and peoples he is said to have overcome. The poet belonged to the court and wrote with the king\'s approval in mind. Historians read such poems for what they say, but they also ask who wrote them and why.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name the poet and the king mentioned in the summary.', model: 'The poet was Harishena and the king was Samudragupta.', sol: 'Poet and king as named.', scheme: [['Harishena and Samudragupta', 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'application', marks: 1, stem: 'Historians ask who wrote such poems and why. Applying that question, what kind of event would such a poem be likely to leave out?', model: 'Defeats, setbacks or the point of view of the rulers who were overcome, since a poet writing to praise the king would not stress them.', sol: 'The question of authorship applied to what is left out.', scheme: [['A suitable omission with the reason', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: '**Either** (i): Suggest two other kinds of evidence a historian could use to check the claims of such a poem.', model: '(1) Coins of the king and of neighbouring rulers, which may show where each was active. (2) Inscriptions or texts from other regions that mention the same events or rulers.', sol: 'Two sources for cross-checking.', scheme: [['First kind of evidence', 1], ['Second kind of evidence', 1]] }), [
      short({ t: [3, 5], d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The poem has survived on stone for many centuries. Does that make it a reliable record? Give two reasons.', model: '(1) Survival shows only that the text lasted, not that its claims are true. (2) The poem still reflects the poet\'s aim of praising the king, so it needs checking against other evidence.', sol: 'Survival is not reliability.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Towns and trade; coins and kings
Q('m_puhar', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which of the following was a coastal trading town of the Tamil country, also called Kaveripattinam?',
  opts: ['Puhar', 'Pataliputra', 'Ujjayini', 'Mathura'],
  sol: 'Puhar was a port town. Pataliputra, Ujjayini and Mathura were important cities, but they were not on the Tamil coast.',
}));
Q('m_nbpw', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Northern Black Polished Ware, found at many urban sites, is',
  opts: ['A fine, glossy pottery', 'A kind of iron tool', 'A type of coin', 'A script used on rock edicts'],
  sol: 'Northern Black Polished Ware is a fine, glossy pottery. It is an archaeological find, not a tool, coin or script.',
}));
Q('m_coin_dating', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined museum label describes a copper coin stamped with small symbols but bearing no ruler\'s name and no portrait. Which judgement is best supported?',
  opts: [
    'It is probably a punch-marked coin, of a type used from about the sixth century BCE, and not an Indo-Greek or Kushana issue',
    'It is probably an Indo-Greek coin, because those carry symbols but no names',
    'It is probably a Kushana gold coin of the first century CE',
    'It must be a Gupta coin, since the Guptas never named themselves',
  ],
  sol: 'Indo-Greek coins were the first to carry rulers\' names and images, and the Kushanas issued gold coins on a large scale. A copper coin with only symbols matches the punch-marked type.',
}));
Q('m_hoard', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A hoard of Roman gold coins is found at a river-mouth town in south India. Which conclusion is best supported by this evidence?',
  opts: [
    'Goods from the region reached Roman markets and were paid for, at least in part, with coins, but the find does not show that Romans ruled the area',
    'The Roman Empire governed the southern coast',
    'Roman traders were the only merchants in the town',
    'The town had no trade with any other region',
  ],
  sol: 'Coins found in a hoard show that such coins reached the place, which fits trade in valued goods such as pepper. Rule, exclusive trade and the absence of other trade are all claims beyond the find.',
}));
Q('m_find_spot', mcq({
  t: 4, d: 4, c: 'application',
  stem: 'Coins of one king are found in large numbers at a market town far from his capital. Which inference is the most careful?',
  opts: [
    'The coins circulated there, probably through trade or payments, but his control over the town needs other evidence',
    'He certainly ruled the town directly',
    'The town had no trade with other places',
    'The coins must have been made at that town',
  ],
  sol: 'The place where coins are found shows where they travelled, which can happen without political control. A claim of rule needs support from inscriptions or texts.',
}));
Q('m_few_gold', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'Which further evidence would best help historians decide whether fewer gold coins after about 600 CE reflect a decline in trade?',
  opts: [
    'Evidence from ports and towns of the same period, such as fewer imported goods or shrinking urban sites',
    'The purity of Gupta gold coins',
    'The number of mahajanapadas named in Buddhist texts',
    'The date on which Prinsep deciphered Brahmi',
  ],
  sol: 'Trade can be tested against other traces of exchange and town life from the same period. The other options do not bear on trade after 600 CE.',
}));
Q('ar_roman', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Finding many coins of a king at a distant town does not prove that he ruled the town.',
  r: 'Coins could move from place to place through trade and payments.',
  sol: 'Both are true, and R explains A: since coins travel, where they turn up shows where they went and not necessarily where their issuer ruled.',
}));
Q('ar_gold', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Not all historians accept the fall in gold coin finds from about 600 CE as proof of declining trade.',
  r: 'Gupta gold coins are remarkable for their purity.',
  sol: 'Both statements are true, but R does not explain A. The purity of Gupta gold coins is a fact about their quality, whereas the doubt arises because a smaller number of finds can be explained in more than one way.',
}));
Q('tf_roman', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Hoards of Roman coins found in south India prove that the Roman Empire governed the region.',
  sol: 'The coins point to trade contacts, not to political rule.',
}));
Q('ord_coins', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these stages in the history of early Indian coins in the order in which they appear.',
  items: [
    'Punch-marked silver and copper coins',
    'Indo-Greek coins with the names and images of rulers',
    'Gold coins issued on a large scale by the Kushanas',
    'Fewer gold coins are found',
  ],
  sol: 'Punch-marked coins from c. 6th century BCE, Indo-Greek coins next, Kushana gold in the first century CE, and fewer gold coins from about the sixth century CE.',
}));
Q('s_numismatics', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A coin carries a ruler\'s portrait and name on one side and a deity on the other. State two things a historian can infer from it and one thing it cannot show.',
  model: 'The coin suggests that the ruler issued coins in his own name and image, so he had authority to mint, and that religious symbols mattered in how rulers presented themselves. It cannot show how far his rule extended, since coins travel through trade.',
  sol: 'Two inferences and one limit.',
  scheme: [['Two inferences', 1], ['One thing it cannot show', 1]],
}));
Q('s_donor', short({
  t: [4, 5], d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'What can short donor inscriptions at urban sites tell us about a town, and what can they not tell us?',
  model: 'They name donors such as weavers, scribes, carpenters, potters, goldsmiths, blacksmiths, officials and merchants, so they show the range of occupations in a town. They cannot tell us how many people followed each trade or how most townspeople lived.',
  sol: 'What the donors reveal, and the limit.',
  scheme: [['Range of occupations', 1], ['What they cannot show', 1]],
}));
Q('s_few_gold', short({
  t: 4, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Fewer gold coins are found from about the sixth century CE. Give two reasons why historians hesitate to treat this as proof that trade declined.',
  model: 'Historians disagree about what the fall means. Coins that survive and are found are only a sample, so fewer finds need not mean less trade. Other forms of exchange may also have been used, so coins alone cannot settle the question.',
  sol: 'Two cautions about the evidence.',
  scheme: [['Finds are only a sample', 1], ['Other explanations; debate', 1]],
}));
Q('s3_coins', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined hoard holds punch-marked silver coins and two Indo-Greek coins bearing rulers\' portraits and names, but no gold coins. What is the earliest period in which it could have been buried? Give two reasons and one limit of this dating.',
  model: '1. No earlier than the time of the Indo-Greek issues, around the second century BCE, since a hoard cannot be buried before its latest coin was made.\n2. The punch-marked silver coins are older, so they were still in use alongside the later ones.\n3. Limit: the absence of Kushana gold does not prove burial before the first century CE, because the owner may simply not have held any gold.',
  sol: 'The latest coin gives the earliest date; older coins can stay in circulation; absence is weak evidence.',
  scheme: [['Earliest date from the latest coin', 1], ['Older coins still in use', 1], ['Limit of the dating', 1]],
}));
Q('l_coins', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'How far do coins help historians to reconstruct the economy and politics of early India? Support your answer with examples.',
  model: '1. **Early coins:** punch-marked silver and copper coins, from about the sixth century BCE, bear symbols but not rulers\' names.\n2. **Rulers shown:** Indo-Greek coins first bore rulers\' names and images; the Kushanas issued gold coins on a large scale; Gupta gold coins were remarkably pure.\n3. **Trade:** hoards of Roman coins in south India point to trade, including in pepper.\n4. **Politics:** tribal republics such as the Yaudheyas of Punjab and Haryana issued copper coins.\n5. **Limits:** finds are only a sample, and fewer gold coins after about 600 CE may or may not mean less trade, so coins need other evidence.',
  sol: 'Examples from different periods, then limits that qualify the answer.',
  scheme: [['Early coins', 1], ['Rulers on coins', 1], ['Evidence of trade', 1], ['Evidence of politics', 1], ['Limits', 1]],
}));
Q('sb_diary', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source, an imagined diary of an excavation assistant, and answer the questions that follow. ${IMAG}`,
  passage: '**Field diary of an excavation assistant (imagined), a mound beside a river**\n\nThe lower layer of today\'s trench gave fine, glossy black pottery and a handful of silver coins stamped with small symbols but no names. In the same layer we found beads of a stone that does not occur anywhere near the mound. A small stone slab with a few lines of writing was lifted from the middle layer; the supervisor says it records a gift made by a family of weavers. Near the top, a coin bearing a king\'s head and a name turned up and was bagged separately.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'What are coins stamped with small symbols but without rulers\' names called?', model: 'Punch-marked coins.', sol: 'The early coin type.', scheme: [['Punch-marked coins', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Why should the coin with a king\'s head and name not be used to date the glossy pottery in the lower layer?', model: 'It lay in the top, later layer, and coins with rulers\' heads and names came after punch-marked types, so it is younger than the pottery.', sol: 'Layers and coin types both give relative dates.', scheme: [['Later layer and later coin type', 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: '**Either** (i): Using two finds from the diary, explain how historians might infer that the town had trade links.', model: '(1) Beads of a stone that does not occur near the mound must have been brought from elsewhere. (2) Silver coins in the same layer suggest that coined money was used in exchange, and coins travel between places.', sol: 'Two finds, each linked to trade.', scheme: [['First find and inference', 1], ['Second find and inference', 1]] }), [
      short({ t: [4, 5], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What can the slab recording a gift by weavers tell us about the town, and what can it not tell us?', model: '(1) It tells us that weavers lived in the town and had enough resources to make a donation. (2) It cannot tell us how many weavers there were or how most townspeople lived, since it records only one gift.', sol: 'What it shows and what it cannot.', scheme: [['What it tells', 1], ['What it cannot tell', 1]] }),
    ]),
  ],
}));

// ================================================================ t05 Sources: inscriptions (limits of the evidence)
Q('m_epig_bias', mcq({
  t: [2, 5], d: 2, c: 'application',
  stem: 'For which of these questions would Ashoka\'s inscriptions be the most useful source?',
  opts: [
    'What moral ideas the king wanted his subjects to follow',
    'How much a potter earned in Pataliputra',
    'What villagers thought of Mauryan officials',
    'How many soldiers served in the army',
  ],
  sol: 'The edicts announce the king\'s own message. They are poorly placed to answer questions about earnings, popular feeling or army size.',
}));
Q('m_donors', mcq({
  t: [4, 5], d: 2, c: 'application',
  stem: 'At an imagined urban site, short inscriptions record gifts from a washerman\'s family, a scribe, a potter, a goldsmith and a merchant. Which conclusion is best supported?',
  opts: [
    'The town had people in many crafts and occupations, though the inscriptions alone cannot say how large each group was',
    'All the donors belonged to one rich family',
    'The town had no merchants',
    'The town was ruled by a gana',
  ],
  sol: 'Different donors point to different occupations. The inscriptions record gifts, not the size of each group, and they say nothing about the form of government.',
}));
Q('tf_inscr', tf({
  t: 5, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Inscriptions give a complete and neutral record of life in the past.',
  sol: 'Many have been lost or damaged, and they record what their makers wished to say.',
}));
Q('s3_inscr_limits', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three difficulties that historians face in using inscriptions as evidence.',
  model: '1. Letters may be faintly engraved, damaged or missing, so a reading can be uncertain.\n2. Some words have uncertain meanings, and a number of inscriptions have not yet been deciphered or translated.\n3. Many more inscriptions existed than survive, and they record what their makers wished to say, so everyday life is often left out.',
  sol: 'Any three difficulties, each explained.',
  scheme: [['Damage or missing letters', 1], ['Uncertain meanings; not all read', 1], ['Survival and the makers\' aims', 1]],
}));
