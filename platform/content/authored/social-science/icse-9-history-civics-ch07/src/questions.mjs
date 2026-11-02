// ICSE 9 History & Civics, ch07 Jainism and Buddhism — question bank.
// Every diary, letter, exhibition label, school visit and town below is imagined by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no scripture is quoted (the
// teachings are paraphrased). Dates are the commonly taught approximate ones (Buddha born about 563 BCE, Mahavira about
// 540 BCE; books differ). The two faiths are treated neutrally and respectfully; neither is ranked above the other and
// the Vedic tradition is not disparaged: the new teachings "questioned" some practices while the older tradition continued.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const BORN = { buddha: 563, mahavira: 540 }; // years BCE, approximate
assert.ok(BORN.buddha > BORN.mahavira);

/** Timeline (years BCE, drawn to scale between 700 and 400 BCE). */
export function timelineFigure(alt, caption) {
  const s = new Svg(720, 270);
  const X = (bce) => 40 + ((700 - bce) * 640) / 300;
  s.rect(X(600), 118, X(500) - X(600), 44, { rx: 4, fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.2 });
  s.arrow(30, 140, 700, 140, { sw: 1.8 });
  [700, 600, 500, 400].forEach((y) => {
    s.line(X(y), 134, X(y), 146, { sw: 1.4 });
    s.text(X(y), 176, `${y} BCE`, { size: 12 });
  });
  s.line(X(BORN.buddha), 140, X(BORN.buddha), 92, { sw: 1.6, color: 'green' });
  s.dot(X(BORN.buddha), 140, 5, 'green');
  s.text(X(BORN.buddha), 72, 'Buddha born, about 563 BCE', { size: 14, bold: true });
  s.line(X(BORN.mahavira), 140, X(BORN.mahavira), 202, { sw: 1.6, color: 'blue' });
  s.dot(X(BORN.mahavira), 140, 5, 'blue');
  s.text(X(BORN.mahavira), 218, 'Mahavira born, about 540 BCE', { size: 14, bold: true });
  s.text(360, 20, 'The sixth century BCE is shaded (about 600 to 500 BCE)', { size: 12, muted: true });
  s.text(360, 252, 'Dates are approximate and vary between books', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of key sites. Positions are approximate and the picture is not to scale. */
export function mapFigure(alt, caption) {
  const s = new Svg(720, 300);
  const X = (lon) => 60 + (lon - 82.5) * 200;
  const Y = (lat) => 40 + (27.8 - lat) * 62;
  const ganga = [[82.5, 25.3], [83.0, 25.32], [83.57, 25.58], [84.0, 25.58], [85.1, 25.62], [85.5, 25.5]];
  s.polyline(ganga.map(([lo, la]) => [X(lo), Y(la)]), { sw: 2.2, color: 'blue' });
  s.text(X(84.45), Y(25.0) - 4, 'Ganga (schematic)', { size: 12, color: 'blue' });
  s.arrow(36, 110, 36, 56, { sw: 1.6 });
  s.text(36, 44, 'N', { size: 13, bold: true });
  const sites = [
    ['Lumbini', 83.3, 27.5, 'Birth of the Buddha (traditional)', 'green', 'start'],
    ['Kushinagar', 83.9, 26.7, 'Mahaparinirvana of the Buddha', 'green', 'start'],
    ['Kundagrama (near Vaishali)', 85.1, 26.0, 'Birth of Mahavira', 'blue', 'end'],
    ['Sarnath', 83.0, 25.4, 'First sermon of the Buddha', 'green', 'middle'],
    ['Bodh Gaya', 85.0, 24.7, 'Enlightenment of the Buddha', 'green', 'end'],
  ];
  sites.forEach(([name, lo, la, note, col, anchor]) => {
    const x = X(lo);
    const y = Y(la);
    s.dot(x, y, 6, col);
    if (anchor === 'start') {
      s.text(x + 12, y - 7, name, { size: 14, bold: true, anchor: 'start' });
      s.text(x + 12, y + 10, note, { size: 12, anchor: 'start' });
    } else if (anchor === 'end') {
      s.text(x - 12, y - 7, name, { size: 14, bold: true, anchor: 'end' });
      s.text(x - 12, y + 10, note, { size: 12, anchor: 'end' });
    } else {
      s.text(x, y - 32, name, { size: 14, bold: true });
      s.text(x, y - 16, note, { size: 12 });
    }
  });
  s.text(360, 288, 'Schematic, not to scale; positions are approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Jainism and Buddhism compared in three boxes: Jainism, both, Buddhism. */
export function compareFigure(alt, caption) {
  const s = new Svg(720, 250);
  const cols = [
    ['Jainism', 'blue', ['Mahavira; 24 Tirthankaras', 'Tri-ratnas and five vows', 'Very strict ahimsa', 'Strong stress on austerity', 'Texts: the Angas']],
    ['Both', 'accent', ['Arose in the 6th century BCE', 'Questioned costly rituals', 'Karma and rebirth', 'Ahimsa taught', 'Prakrit or Pali used']],
    ['Buddhism', 'green', ['Siddhartha Gautama, the Buddha', 'Four Noble Truths', 'Eightfold Path; Middle Path', 'Goal: Nirvana; the Sangha', 'Texts: the Tripitakas']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 10 + i * 238;
    s.rect(x, 12, 224, 226, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 112, 38, title, { size: 17, bold: true });
    s.line(x + 14, 54, x + 210, 54, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 112, 84 + k * 31, t, { size: 13 }));
  });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources: Angas, Tripitakas, Jatakas
Q('m_angas_diary', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined diary, Meera writes that the librarian of a Jain temple library in the imagined town of Ratnapur showed her bundles of manuscripts and called them the Angas. What are the Angas?',
  opts: [
    'Sacred texts of Jainism, twelve in number according to tradition',
    'The three baskets of Buddhist teaching, written in Pali',
    'Stories about the earlier births of the Buddha',
    'Rules that applied only to the kings of Magadha',
  ],
  sol: 'The Angas are the Jain canon, twelve in tradition. The three baskets are the Tripitakas, the stories of earlier births are the Jatakas, and the Angas were not royal rules.',
}));
Q('m_pitaka_vinaya', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A card at an imagined school exhibition in Chandrapur reads: the part of the Buddhist canon that sets out rules of conduct for monks and nuns. Which Pitaka does it describe?',
  opts: ['The Vinaya Pitaka', 'The Sutta Pitaka', 'The Abhidhamma Pitaka', 'None of the three, since rules were never recorded'],
  sol: 'Rules of conduct for the monastic community belong to the Vinaya Pitaka. The Sutta Pitaka holds discourses and the Abhidhamma Pitaka deeper analysis, and rules were recorded.',
}));
Q('m_jataka_label', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A label at the imagined Vidya Mandir exhibition reads: tales in which a merchant, a monkey and a village headman appear, each told as an earlier birth of a great teacher. Which source does it describe?',
  opts: ['The Jatakas', 'The Angas', 'The Vinaya Pitaka', 'The Abhidhamma Pitaka'],
  sol: 'Tales told as earlier births of the Buddha are the Jatakas. The Angas are Jain texts, the Vinaya Pitaka gives monastic rules, and the Abhidhamma Pitaka is deeper analysis, not stories.',
}));
Q('ar_jataka', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A historian studying how traders and villagers lived in ancient times may find the Jatakas useful.',
  r: 'Many Jataka stories are set among merchants, villagers and travellers.',
  sol: 'Both are true. Because many tales are set among ordinary people, they give glimpses of everyday life, which explains their usefulness.',
}));
Q('tf_jataka_jain', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? A label at an imagined exhibition in Kaveripur says that the Jatakas are Jain texts which record the life of Mahavira.',
  sol: 'The Jatakas are Buddhist stories of the Buddha\'s earlier births, not Jain texts about Mahavira.',
}));
Q('fb_angas', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A guide in the imagined library at Ratnapur says that the twelve sacred texts of the Jains, as counted in tradition, are called the ___.',
  acc: [['Angas', 'Anga', 'Angas.']],
  sol: 'The twelve Jain texts are the Angas.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'At an imagined school exhibition, each card below must be paired with its description. Match them.',
  pairs: [
    ['Angas', 'Sacred Jain texts, twelve in tradition'],
    ['Vinaya Pitaka', 'Rules of conduct for monks and nuns'],
    ['Sutta Pitaka', 'Discourses and teachings of the Buddha'],
    ['Jatakas', 'Stories of the Buddha\'s earlier births'],
  ],
  sol: 'Angas are Jain; the Vinaya holds rules; the Sutta Pitaka holds discourses; the Jatakas are birth stories.',
}));
Q('s_angas', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A student at the imagined Jain library in Ratnapur asks what the Angas are and when they were compiled. Answer in two points.',
  model: 'The **Angas** form the Jain canon, **twelve** in the count of tradition. They were handed down by memory for generations and then written up at the **Council of Valabhi**, about the **fifth to sixth century CE**.',
  sol: 'Jain texts; compiled at Valabhi.',
  scheme: [['Angas as sacred Jain texts, twelve in tradition', 1], ['Compiled at Valabhi, about the 5th to 6th century CE', 1]],
}));
Q('s3_pitakas', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the three Pitakas of the Buddhist Tripitakas and say in a line what each holds. Mention the language of the texts.',
  model: '1. **Vinaya Pitaka:** rules of conduct for monks and nuns.\n2. **Sutta Pitaka:** discourses and teachings attributed to the Buddha.\n3. **Abhidhamma Pitaka:** deeper philosophical analysis of the teachings. The texts were composed in **Pali**.',
  sol: 'Three Pitakas with contents.',
  scheme: [['Vinaya Pitaka with contents', 1], ['Sutta Pitaka with contents', 1], ['Abhidhamma Pitaka with contents; Pali', 1]],
}));

// ================================================================ t02 Causes for the rise of new faiths
Q('m_cause_ritual', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Rudra, an imagined villager of Shravastipur, writes that a rite in his village now needs many priests, costly offerings and chants in a language none of the villagers follow. Which cause of the rise of new faiths does this illustrate best?',
  opts: [
    'Religious: complex and costly rituals, and a language ordinary people did not understand',
    'Economic: the arrival of coined money in the village markets',
    'Political: the end of every kingdom in the region',
    'Social: the abolition of all social groups',
  ],
  sol: 'Costly ceremonies and chants in a language the villagers could not follow are religious causes. Coins, the end of kingdoms or the abolition of social groups are not described in the letter.',
}));
Q('m_cause_vaishya', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Dhanapal, an imagined caravan trader of Chandrapur, has grown wealthy, yet he is told that his birth keeps him below others in rank. Which cause of the rise of new faiths does his situation show?',
  opts: [
    'Social: Vaishyas who gained wealth wanted a standing that birth alone did not allow',
    'Religious: priests had stopped all ceremonies',
    'Political: the king had ordered all traders to leave the town',
    'Economic: there was no trade in the towns',
  ],
  sol: 'A rich trader held back by birth shows the social cause: the ambition of Vaishyas for higher standing. He is a trader in a trading town, so there was trade, and no ceremonies or royal order are mentioned.',
}));
Q('m_cause_cattle', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Farmers in the imagined village of Gokulpur depend on their oxen to plough the fields and note that large sacrifices use up many animals. Which feature of the new teachings would appeal to them for economic reasons?',
  opts: [
    'The stress on ahimsa, which discouraged killing animals',
    'A rule that every household must offer animals',
    'A rule that fields must never be ploughed',
    'A demand that all wealth be given up at once',
  ],
  sol: 'An agricultural economy needed cattle, so the stress on ahimsa suited farmers. A duty to offer animals or a ban on ploughing would harm them, and giving up all wealth was not asked of householders.',
}));
Q('m_language', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A teacher in the imagined town of Kosalapur speaks in the everyday language of the region, not in Sanskrit. What was the likely effect?',
  opts: [
    'More ordinary people could understand and follow the teaching',
    'The teaching was kept from ordinary people',
    'Only the learned could follow the teaching',
    'The teaching could not be remembered at all',
  ],
  sol: 'Prakrit and Pali were close to common speech, so listeners understood directly. The other options reverse this effect.',
}));
Q('m_not_cause', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A group project in an imagined Class IX lists causes of the rise of Jainism and Buddhism in the sixth century BCE. Which entry does NOT belong on the list?',
  opts: [
    'A ban on farming imposed by every kingdom',
    'The growth of trade and towns',
    'Dislike of complex and costly rituals',
    'Support from rulers of kingdoms such as Magadha',
  ],
  sol: 'No such ban on farming is known; farming was growing. Trade and towns, dislike of costly rituals and royal support are all causes historians discuss.',
}));
Q('m_framing', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'In an imagined debate at the Kaveripur History Club, a speaker says that new faiths arose because the older religion had nothing of value. Which reply is the most accurate and respectful for a history answer?',
  opts: [
    'These teachings questioned some practices and offered other paths, while the older tradition continued alongside them',
    'The speaker is right, and the older tradition vanished in the sixth century BCE',
    'The speaker is right, since only the new teachings valued non-violence',
    'The speaker is wrong, since nobody then questioned any practice',
  ],
  sol: 'History records that the new teachers questioned certain practices and offered other paths, but the older tradition continued. The other replies overstate, disparage or deny the evidence.',
}));
Q('ar_trade', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The growth of trade and towns encouraged many Vaishyas to support the new teachings.',
  r: 'Prosperous Vaishyas wanted a standing that birth alone did not give them.',
  sol: 'Both are true. Wealth from trade without matching social standing made Vaishyas welcome teachings that valued conduct, which explains their support.',
}));
Q('ar_cattle', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Peasants in the sixth century BCE valued their cattle for ploughing and carrying loads.',
  r: 'The new teaching of ahimsa encouraged farmers to give their cattle away in sacrifice.',
  sol: 'A is true. R is false: ahimsa discouraged the killing of animals, which is why farmers found the teaching attractive.',
}));
Q('tf_one_cause', tf({
  t: 2, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? In an imagined class debate, a student says that Jainism and Buddhism rose in the sixth century BCE only for religious reasons, with no social or economic causes.',
  sol: 'Historians point to religious, social, economic and political causes together, so the claim is false.',
}));
Q('fb_prakrit', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Jain teachers often used Prakrit, and the Buddhist texts were composed in a language of the people called ___.',
  acc: [['Pali', 'pali']],
  sol: 'The Buddhist canon was composed in Pali.',
}));
Q('s_causes_econ', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined farmer and an imagined trader of the sixth century BCE both welcome the new teachings. State one economic reason for each.',
  model: '**Farmer:** ploughing needed **cattle**, and the stress on **ahimsa** discouraged the killing of animals in large sacrifices. **Trader:** growing **trade and towns** brought wealth to Vaishyas, who gave gifts to the new teachers.',
  sol: 'Cattle for the farmer; trade and wealth for the trader.',
  scheme: [['Farmer: cattle and ahimsa', 1], ['Trader: trade, towns, gifts', 1]],
}));
Q('s_language', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did the use of Prakrit and Pali, rather than Sanskrit, help the new teachings to spread?',
  model: 'Prakrit and Pali were close to the **everyday speech** of ordinary people, so they could **understand** the teachers directly. Sanskrit was understood mainly by the learned, so local languages **widened the audience**.',
  sol: 'Understood by common people.',
  scheme: [['Local languages understood by ordinary people', 1], ['Wider audience than Sanskrit', 1]],
}));
Q('s3_religious', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Ravi, in an imagined history club, lists religious causes for the rise of new faiths in the sixth century BCE. Give three points he could include.',
  model: '1. Rituals and sacrifices had become **complex and costly**.\n2. **Priests** held a leading place in ceremonies, leaving ordinary people little say.\n3. **Sanskrit** was not understood by common people, while the new teachers used **Prakrit and Pali**.',
  sol: 'Costly rites; priests; language.',
  scheme: [['Complex, costly rituals', 1], ['Dominance of priests', 1], ['Sanskrit not understood; local languages', 1]],
}));
Q('s3_social_causes', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three social causes for the rise of Jainism and Buddhism.',
  model: '1. The **varna system** had become rigid, with rank decided by birth.\n2. **Kshatriyas** wished for a standing that matched their power.\n3. Wealthy **Vaishyas** wanted respect that birth did not give them, so teachings open to all groups attracted them.',
  sol: 'Rigid varna; Kshatriyas; Vaishyas.',
  scheme: [['Rigid, birth-based varna', 1], ['Kshatriya aspirations', 1], ['Vaishya aspirations', 1]],
}));

// ================================================================ t03 Jainism
Q('m_mahavira_label', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A label at an imagined exhibition says: born about 540 BCE at Kundagrama near Vaishali, and revered as the twenty-fourth Tirthankara. Whom does it describe?',
  opts: ['Vardhamana Mahavira', 'Siddhartha Gautama', 'Parshvanatha', 'Bimbisara, a king of Magadha'],
  sol: 'Vardhamana Mahavira is the twenty-fourth Tirthankara. Siddhartha Gautama is the Buddha, Parshvanatha is counted as the twenty-third, and Bimbisara was a king.',
}));
Q('m_parshva', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'At an imagined quiz held by the Ratnapur Junior Club, the host asks which Tirthankara is counted just before Mahavira. What is the answer?',
  opts: ['Parshvanatha', 'Rishabhanatha, the first Tirthankara', 'Siddhartha Gautama, the Buddha', 'Bimbisara, a king of Magadha'],
  sol: 'Parshvanatha is counted as the twenty-third Tirthankara. Rishabhanatha is the first, the Buddha belongs to the Buddhist tradition, and Bimbisara was a king.',
}));
Q('m_triratna_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Neha, in an imagined Jain study circle, (A) trusts the teachings of the Tirthankaras, (B) studies them carefully and (C) lives by them in daily conduct. Which option matches A, B and C with the Tri-ratnas?',
  opts: [
    'A: right faith; B: right knowledge; C: right conduct',
    'A: right conduct; B: right faith; C: right knowledge',
    'A: right knowledge; B: right conduct; C: right faith',
    'A: right faith; B: right conduct; C: right knowledge',
  ],
  sol: 'Trust is right faith, careful study is right knowledge and living by the teachings is right conduct. The other options mix these up.',
}));
Q('m_vows_asteya', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kamala, an imagined shopkeeper, finds that a customer left a silver coin behind by mistake and hurries after him to return it. Which Jain vow does her act best reflect?',
  opts: ['Asteya, not taking what is not given', 'Ahimsa, not harming living beings', 'Brahmacharya, self-restraint', 'Aparigraha, limiting attachment to possessions'],
  sol: 'Returning what belongs to another is asteya. Ahimsa is about harm, brahmacharya is about restraint, and aparigraha is about limiting possessions.',
}));
Q('m_aparigraha', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Harishankar, an imagined landowner, gives away the extra grain stored in his barns and keeps only what his household needs. Which vow does this show?',
  opts: ['Aparigraha, limiting attachment to possessions', 'Satya, speaking the truth', 'Ahimsa, protecting life', 'Asteya, not taking what is not given'],
  sol: 'Giving up surplus holdings is aparigraha. Satya concerns truth, ahimsa concerns harm, and asteya concerns not taking what belongs to others.',
}));
Q('m_fifth_vow', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'A student in the imagined Class IX-A writes that Parshvanatha taught four vows and a fifth was added by the twenty-fourth Tirthankara. Which vow was added?',
  opts: ['Brahmacharya', 'Ahimsa', 'Satya', 'Asteya'],
  sol: 'The four taught earlier were ahimsa, satya, asteya and aparigraha. Brahmacharya was the fifth, added by Mahavira.',
}));
Q('m_ahimsa_view', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A visitor to the imagined town of Sundarpur notices a Jain monk gently brushing the ground before each step. Which principle does this show?',
  opts: ['Ahimsa, extended even to the smallest living beings', 'Asteya, not taking what is not given', 'Satya, speaking the truth', 'Aparigraha, giving up all belongings'],
  sol: 'Brushing the path to avoid harming tiny creatures expresses ahimsa. The other vows concern stealing, truth and possessions.',
}));
Q('m_karma', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Ishaan, an imagined student, asks why Jains say that a person\'s deeds matter even after death. Which answer matches Jain teaching?',
  opts: [
    'Actions bind karma to the soul, which shapes rebirth until the soul is freed',
    'Deeds matter only if a priest performs a ritual afterwards',
    'Deeds do not matter, because the soul is never affected',
    'Deeds matter only to the king of the land',
  ],
  sol: 'In Jain belief actions attach karma to the soul and shape rebirth until the soul is freed. Rituals by others, indifference or royal concern are not Jain explanations.',
}));
Q('ar_vows', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Jain monks of the imagined town of Sundarpur sweep the ground before they walk.',
  r: 'Jain teaching holds that even very small creatures have souls and should not be harmed.',
  sol: 'Both are true. Because every living being is held to have a soul, even tiny creatures are protected, which explains the practice.',
}));
Q('ar_moksha', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'In Jainism, moksha is gained mainly through costly sacrifices performed by priests.',
  r: 'Jain teaching holds that liberation comes through right faith, right knowledge and right conduct.',
  sol: 'A is false: Jainism does not rely on costly sacrifices for moksha. R is true: the Tri-ratnas are the path to liberation.',
}));
Q('mt_vows', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'An imagined monk of the Sundarpur monastery practises each vow below. Match each vow with a way of practising it.',
  pairs: [
    ['Ahimsa', 'Refusing to harm even a small insect'],
    ['Satya', 'Speaking truthfully even when it is hard'],
    ['Asteya', 'Taking nothing that is not given'],
    ['Aparigraha', 'Keeping only the barest belongings'],
  ],
  sol: 'Ahimsa is not harming, satya is truth, asteya is not taking what is not given, aparigraha is limiting possessions.',
}));
Q('s_triratna', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the Tri-ratnas of Jainism and say what the three together lead to.',
  model: '**Right faith, right knowledge and right conduct** are the three jewels, or Tri-ratnas. Together they are the path by which the soul is freed from karma and reaches **moksha**.',
  sol: 'Three jewels; they lead to moksha.',
  scheme: [['Right faith, right knowledge, right conduct', 1], ['Lead to moksha', 1]],
}));
Q('s_karma', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Zoya, an imagined student, asks how karma is linked to rebirth in Jain belief. Explain briefly.',
  model: 'In Jain belief every **action** attaches **karma** to the soul. This karma decides the soul\'s **next birth**, so the soul is reborn again and again until it is freed from karma and attains **moksha**.',
  sol: 'Karma shapes rebirth until moksha.',
  scheme: [['Actions bind karma to the soul', 1], ['Karma shapes rebirth until moksha', 1]],
}));
Q('s_equality', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did Jain teachings reflect a belief in equality? Give two points.',
  model: '1. Jain teaching holds that **every living being has a soul**, so all deserve care.\n2. The path to liberation was open to **people of every group**; **conduct**, and not birth, decided progress.',
  sol: 'Souls in all beings; open to all groups.',
  scheme: [['Every living being has a soul', 1], ['Path open to all; conduct not birth', 1]],
}));
Q('s3_vows', short({
  t: 3, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'Name the five Jain vows and say which of them was added by Mahavira.',
  model: '1. The five vows are **ahimsa** (non-violence), **satya** (truth), **asteya** (not stealing), **aparigraha** (non-attachment) and **brahmacharya** (self-restraint).\n2. Parshvanatha had already taught the first four vows to his followers before the time of Mahavira.\n3. **Brahmacharya**, or self-restraint, was the vow that Mahavira added, so the number became five.',
  sol: 'Five vows; brahmacharya added.',
  scheme: [['Five vows named', 2], ['First four taught earlier by Parshvanatha', 0.5], ['Fifth vow added by Mahavira', 0.5]],
}));
Q('s3_mahavira', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Write three facts about Vardhamana Mahavira.',
  model: '1. He was born about **540 BCE** at **Kundagrama** near Vaishali.\n2. After years of austere practice he attained **kevala jnana**, or perfect knowledge, and was called **Jina**, the conqueror, and **Mahavira**.\n3. He is revered as the **twenty-fourth Tirthankara**, after Parshvanatha, and taught the five vows.',
  sol: 'Birth; kevala jnana; Tirthankara.',
  scheme: [['Birth about 540 BCE at Kundagrama', 1], ['Kevala jnana; Jina, Mahavira', 1], ['Twenty-fourth Tirthankara; five vows', 1]],
}));

// ================================================================ t04 Buddhism
Q('m_sarnath', mcq({
  t: 4, d: 1, c: 'application',
  stem: 'In an imagined pilgrimage diary, Kavya writes that her group stood at a place near Varanasi where the Buddha is traditionally said to have given his first sermon. Which place is it?',
  opts: ['Sarnath', 'Lumbini', 'Kushinagar', 'Bodh Gaya'],
  sol: 'The first sermon is traditionally placed at Sarnath. Lumbini is the birthplace, Kushinagar is where he passed away, and Bodh Gaya is where he attained enlightenment.',
}));
Q('m_first_truth', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined monk teaches that sickness, loss and old age touch every life. Which of the Four Noble Truths does this idea match?',
  opts: [
    'The first: life involves suffering',
    'The second: desire is the cause of suffering',
    'The third: suffering can come to an end',
    'The fourth: the Eightfold Path is the way',
  ],
  sol: 'The first truth says that life involves suffering. The second names desire as the cause, the third says suffering can end, and the fourth gives the way.',
}));
Q('m_second_truth', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Arnav, an imagined schoolboy, feels unhappy each time a friend gets a new toy, because he keeps wanting more. Which Noble Truth does this illustrate?',
  opts: [
    'Desire is the cause of suffering',
    'Suffering does not exist',
    'The Eightfold Path leads to wealth',
    'Suffering can be ended only by being born rich',
  ],
  sol: 'Constant wanting making him unhappy illustrates the second truth, that desire is the cause of suffering. The other options contradict Buddhist teaching.',
}));
Q('m_speech_step', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Sana, an imagined student, decides to speak only truthfully and kindly and to avoid gossip. Which step of the Eightfold Path does this match?',
  opts: ['Right speech', 'Right livelihood', 'Right view', 'Right concentration'],
  sol: 'Truthful and kind words are right speech. Right livelihood concerns earning a living, right view concerns understanding, and right concentration concerns training the mind.',
}));
Q('m_middle_path', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined traveller says he tried a life of great luxury, then went without food for weeks, and found that neither helped his peace of mind. Which approach would the Middle Path recommend?',
  opts: [
    'Avoiding both extreme indulgence and extreme self-denial',
    'Choosing extreme indulgence',
    'Choosing extreme self-denial',
    'Avoiding every teacher',
  ],
  sol: 'The Middle Path avoids both extremes. Extreme indulgence and extreme self-denial are the two things it avoids, and it does not ask people to avoid every teacher.',
}));
Q('m_nirvana', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'An imagined student writes that Nirvana is a rich kingdom reached after death. How should the answer be corrected?',
  opts: [
    'Nirvana is freedom from desire and from the cycle of rebirth, bringing suffering to an end',
    'Nirvana is the name of the Buddha\'s birthplace',
    'Nirvana is a council held at Valabhi',
    'Nirvana is the code of rules for monks',
  ],
  sol: 'Nirvana is release from desire and rebirth, which ends suffering. It is not a place such as the birthplace, a council, or the rules of the Vinaya.',
}));
Q('m_sangha', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A diorama in an imagined museum at Bodhipur shows figures in simple robes sitting together to study and to follow rules of conduct. What does the group represent?',
  opts: [
    'The Sangha, the community of Buddhist monks and nuns',
    'The Samiti, an assembly of the tribe',
    'The Tirthankaras, the ford-makers of Jainism',
    'The Angas, a set of Jain texts',
  ],
  sol: 'A community of robed monks following rules is the Sangha. The Samiti is a tribal assembly, the Tirthankaras are Jain teachers, and the Angas are texts, not a group.',
}));
Q('ar_places', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Buddha is traditionally said to have given his first sermon at Sarnath.',
  r: 'The Buddha is traditionally said to have attained enlightenment at Bodh Gaya.',
  sol: 'Both are true, but the place of enlightenment does not explain the place of the first sermon; they are two separate events.',
}));
Q('ar_nirvana', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In Buddhist teaching, Nirvana means freedom from desire and from the cycle of rebirth.',
  r: 'Nirvana means being reborn into a wealthy family.',
  sol: 'A is true. R is false: Nirvana is release from rebirth, so it cannot mean being reborn.',
}));
Q('tf_middle', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An imagined Class IX poster says that the Middle Path of the Buddha asks followers to avoid both extreme indulgence and extreme self-denial.',
  sol: 'The Middle Path is a balanced way between the two extremes.',
}));
Q('fb_sarnath', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'On an imagined school trip, the guide says that the Buddha gave his first sermon at ___.',
  acc: [['Sarnath', 'sarnath']],
  sol: 'The first sermon is traditionally placed at Sarnath.',
}));
Q('fb_eight', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'In an imagined quiz the host says that the path taught by the Buddha to end suffering is made of ___ steps.',
  acc: [['eight', 'Eight', '8']],
  sol: 'The path has eight steps, which is why it is called the Eightfold Path.',
}));
Q('mt_truths', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'A teacher in an imagined classroom at Bodhipur writes the Four Noble Truths on cards. Match each truth with its meaning.',
  pairs: [
    ['First truth', 'Life involves suffering'],
    ['Second truth', 'Desire is the cause of suffering'],
    ['Third truth', 'Suffering can come to an end'],
    ['Fourth truth', 'The Eightfold Path is the way'],
  ],
  sol: 'The truths in order: suffering, its cause, its end, and the way.',
}));
Q('mt_places', match({
  t: 4, d: 2, c: 'recall', marks: 2,
  stem: 'A tour guide in an imagined study tour names four sites. Match each site with the event traditionally linked with it.',
  pairs: [
    ['Lumbini', 'Birth of Siddhartha Gautama'],
    ['Bodh Gaya', 'Enlightenment'],
    ['Sarnath', 'First sermon'],
    ['Kushinagar', 'Mahaparinirvana'],
  ],
  sol: 'Birth at Lumbini, enlightenment at Bodh Gaya, first sermon at Sarnath, mahaparinirvana at Kushinagar.',
}));
Q('ord_life', ord({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'A guide on an imagined study tour arranges the stops in the order of events in the Buddha\'s life. Arrange them.',
  items: ['Birth at Lumbini', 'Enlightenment at Bodh Gaya', 'First sermon at Sarnath', 'Mahaparinirvana at Kushinagar'],
  sol: 'Birth, enlightenment, first sermon, mahaparinirvana.',
}));
Q('ord_eightfold', ord({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these four steps of the Eightfold Path in the order in which they are traditionally listed.',
  items: ['Right view', 'Right speech', 'Right livelihood', 'Right concentration'],
  sol: 'View, speech, livelihood, concentration.',
}));
Q('s_eightfold', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'List the eight steps of the Eightfold Path.',
  model: '**Right view, right resolve, right speech and right action**, followed by **right livelihood, right effort, right mindfulness and right concentration**. These eight steps form the way to end suffering.',
  sol: 'Eight steps.',
  scheme: [['First four steps', 1], ['Last four steps', 1]],
}));
Q('s_nirvana', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What did the Buddha mean by Nirvana?',
  model: '**Nirvana** is the state of **freedom from desire**, which the Buddha taught is the cause of suffering. It also means release from the **cycle of rebirth**, so that suffering comes to an end.',
  sol: 'Freedom from desire and rebirth.',
  scheme: [['Freedom from desire', 1], ['Release from the cycle of rebirth', 1]],
}));
Q('s_middle', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain the Middle Path using the example of an imagined runner of Vijaynagar who trains neither too little nor so harshly that she falls ill.',
  model: 'The **Middle Path** avoids two extremes: **indulgence** and **severe self-denial**. A runner who neither skips practice nor trains until she falls ill follows a balanced course, which the Buddha taught helps the search for peace.',
  sol: 'Avoid both extremes.',
  scheme: [['Avoids indulgence and severe self-denial', 1], ['Example linked to a balanced course', 1]],
}));
Q('s_sangha', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Sangha, and what did it do?',
  model: 'The **Sangha** was the **community of Buddhist monks and nuns**. It followed rules of conduct, studied and **preserved the teachings**, and helped to **spread** them among the people.',
  sol: 'Community of monks and nuns.',
  scheme: [['Community of monks and nuns', 1], ['Preserved and spread the teachings', 1]],
}));
Q('s3_four_truths', short({
  t: 4, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'State the Four Noble Truths taught by the Buddha.',
  model: '1. **First truth:** life involves suffering.\n2. **Second truth:** desire, or craving, is the cause of suffering.\n3. **Third truth:** suffering can be brought to an end.\n4. **Fourth truth:** the **Eightfold Path** is the way to end it.',
  sol: 'Four truths.',
  scheme: [['First and second truths', 1], ['Third truth', 1], ['Fourth truth: the Eightfold Path', 1]],
}));

// ================================================================ comparison (t02-t04)
Q('s3_similar', short({
  t: [3, 4], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three similarities between Jainism and Buddhism.',
  model: '1. Both arose in the **sixth century BCE** in the Ganga plains and **questioned costly rituals**.\n2. Both accepted **karma and rebirth** and taught **ahimsa**.\n3. Both used **Prakrit and Pali**, the languages of the people, and had **orders of monks**.',
  sol: 'Three similarities.',
  scheme: [['Same age and region; questioned costly rituals', 1], ['Karma, rebirth, ahimsa', 1], ['Local languages; monastic orders', 1]],
}));
Q('s3_differ', short({
  t: [3, 4], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three differences between Jainism and Buddhism.',
  model: '1. Jainism stresses **very strict ahimsa** and severe **austerity**, while Buddhism teaches the **Middle Path**.\n2. Jain ideas centre on the **Tri-ratnas and five vows**; Buddhist ideas on the **Four Noble Truths and Eightfold Path**.\n3. Jainism remained mainly within **India**, while Buddhism spread to many **lands of Asia** over time.',
  sol: 'Three differences.',
  scheme: [['Austerity versus Middle Path', 1], ['Tri-ratnas and vows versus Truths and Path', 1], ['Spread beyond India', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sources', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'The school archive of the imagined town of Ratnapur holds copies of the texts of two faiths.\n\n(i) Name the Jain texts and the Buddhist texts held there, and the language of the Buddhist texts. **[3]**\n(ii) Describe the three Pitakas of the Tripitakas. **[3]**\n(iii) Explain how the Jatakas and the Angas help a historian, and state one caution. **[4]**',
  model: '(i) The Jain texts are the **Angas**, twelve in tradition, compiled at the Council of Valabhi about the fifth to sixth century CE. The Buddhist texts are the **Tripitakas** and the **Jatakas**; the Tripitakas were composed in **Pali**.\n\n(ii) The **Vinaya Pitaka** has rules for monks and nuns, the **Sutta Pitaka** has discourses attributed to the Buddha, and the **Abhidhamma Pitaka** has deeper analysis of the teachings.\n\n(iii) The Angas and the Tripitakas preserve the **teachings and practices** of the faiths, while the Jatakas, set among merchants and villagers, give glimpses of **everyday life**. As the texts were first **handed down orally** and compiled later, and have a religious purpose, a historian reads them **with other sources**.',
  sol: 'Texts named; Pitakas described; use and caution.',
  scheme: [['(i) Angas', 1], ['(i) Tripitakas and Jatakas', 1], ['(i) Pali', 1], ['(ii) Three Pitakas', 3], ['(iii) Use of the texts', 2], ['(iii) Caution', 2]],
}));
Q('l_causes', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'In the sixth century BCE people of northern India listened with growing interest to new teachers such as Mahavira and the Buddha.\n\n(i) State three religious causes for the rise of Jainism and Buddhism. **[3]**\n(ii) Explain two social causes and one economic cause. **[3]**\n(iii) How did the political situation and the use of local languages help the new faiths to spread? **[4]**',
  model: '(i) Rituals and sacrifices had become **complex and costly**; **priests** had a leading place in ceremonies; and **Sanskrit**, the language of the rites, was **not understood** by ordinary people.\n\n(ii) Socially, the **varna system** had become rigid and birth-based, and **Kshatriyas** and **Vaishyas** wished for a higher standing. Economically, farming needed **cattle**, so large animal sacrifices worried farmers, who welcomed **ahimsa**.\n\n(iii) New **kingdoms**, such as those of Magadha, grew strong, and their rulers **supported** the new teachers with gifts and protection. The teachers spoke **Prakrit and Pali**, which people understood, so the message **reached many more**. These teachings questioned some practices, while the older tradition continued.',
  sol: 'Religious causes; social and economic causes; politics and language.',
  scheme: [['(i) Three religious causes', 3], ['(ii) Two social causes', 2], ['(ii) One economic cause', 1], ['(iii) Rise of kingdoms and royal support', 2], ['(iii) Local languages', 2]],
}));
Q('l_causes_eval', long({
  t: [2], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'At an imagined meeting in the town hall of Kosalapur, three people speak: Dhanapal, a rich trader, Gopal, a farmer who needs every ox for ploughing, and Prince Raghav, a Kshatriya noble who admires a travelling teacher.\n\n(i) Name the cause of the rise of new faiths that each speaker best represents. **[3]**\n(ii) Explain why it mattered that the teacher spoke in the language of the people. **[3]**\n(iii) A listener says that the new faiths arose only because people rejected the older tradition. Evaluate this view. **[4]**',
  model: '(i) **Dhanapal** shows the **economic and social** cause: trade made Vaishyas rich, and they wanted a higher standing. **Gopal** shows the **economic** cause: farming needed cattle, so he welcomed **ahimsa**. **Prince Raghav** shows the **social and political** cause: Kshatriyas wanted standing, and rulers supported teachers.\n\n(ii) The **common language** meant that ordinary people could **understand** the teacher without a learned person to explain, so the teaching reached **more people** than Sanskrit would have.\n\n(iii) The view is **only partly fair**. The new teachers **questioned** some practices, but many causes worked together: **social, economic and political** changes as well as religious ones. The older tradition **continued** alongside, so it was not simply a rejection.',
  sol: 'Causes matched to speakers; value of local language; balanced evaluation.',
  scheme: [['(i) Dhanapal', 1], ['(i) Gopal', 1], ['(i) Prince Raghav', 1], ['(ii) Understood directly', 1.5], ['(ii) Wider reach', 1.5], ['(iii) Partly fair, with reason', 2], ['(iii) Many causes; older tradition continued', 2]],
}));
Q('l_jainism', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A teacher at an imagined Jain study camp near Sundarpur explains the main ideas of Mahavira.\n\n(i) Name and explain the Tri-ratnas. **[3]**\n(ii) Name the five vows. **[3]**\n(iii) Explain the Jain ideas of karma, equality and moksha. **[4]**',
  model: '(i) The **Tri-ratnas** are **right faith**, trust in the teachings; **right knowledge**, careful understanding of them; and **right conduct**, living by them.\n\n(ii) The five vows are **ahimsa** (non-violence), **satya** (truth), **asteya** (not stealing), **aparigraha** (limiting possessions) and **brahmacharya** (self-restraint), the last added by Mahavira.\n\n(iii) By the idea of **karma**, every action attaches karma to the soul and shapes rebirth. The belief in **equality** holds that all living beings have souls and that people of every group may follow the path. **Moksha** is liberation, when the soul is freed from karma and the cycle of birth through the Tri-ratnas and effort.',
  sol: 'Tri-ratnas; five vows; karma, equality, moksha.',
  scheme: [['(i) Three jewels named', 1.5], ['(i) Each explained', 1.5], ['(ii) Five vows named', 3], ['(iii) Karma', 1.5], ['(iii) Equality', 1], ['(iii) Moksha', 1.5]],
}));
Q('l_mahavira', long({
  t: 3, d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'In an imagined school play at Sundarpur, Mahavira is shown as a young man who leaves home to seek knowledge. In later scenes a shopkeeper returns a coin left by mistake, a landowner gives away surplus grain and a monk brushes the path before walking.\n\n(i) Write three facts about Mahavira. **[3]**\n(ii) Explain how karma, rebirth and moksha are linked in Jain teaching. **[3]**\n(iii) Name the vow shown in each of the three later scenes and explain it. **[4]**',
  model: '(i) Mahavira was born about **540 BCE** at **Kundagrama** near Vaishali. He left home, and after years of austere practice he attained **kevala jnana**, or perfect knowledge, and was called **Jina**, the conqueror, and **Mahavira**. He is revered as the **twenty-fourth Tirthankara**, after Parshvanatha, and he taught the five vows.\n\n(ii) Actions attach **karma** to the soul, and karma shapes the next birth, so the soul is **reborn** again and again. When karma is shed through the Tri-ratnas, that is right faith, right knowledge and right conduct, together with discipline, the soul reaches **moksha**, liberation from the cycle of birth.\n\n(iii) The shopkeeper practises **asteya**, which means not taking what is not given. The landowner practises **aparigraha**, which means limiting possessions and attachment. The monk practises **ahimsa**, which means avoiding harm even to tiny creatures.',
  sol: 'Facts about Mahavira; karma, rebirth, moksha; vows in the scenes.',
  scheme: [['(i) Three facts', 3], ['(ii) Karma shapes rebirth', 1.5], ['(ii) Moksha as freedom from karma', 1.5], ['(iii) Asteya', 1.5], ['(iii) Aparigraha', 1.5], ['(iii) Ahimsa', 1]],
}));
Q('l_buddhism', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A guide at an imagined museum of Buddhist teaching at Bodhipur asks visitors to explain the main ideas of the Buddha.\n\n(i) State the Four Noble Truths. **[3]**\n(ii) List the eight steps of the Eightfold Path. **[3]**\n(iii) Explain the Middle Path and the idea of Nirvana, and name the community that preserved the teachings. **[4]**',
  model: '(i) The **first** truth is that life involves suffering. The **second** is that desire is the cause of suffering. The **third** is that suffering can come to an end. The **fourth** is that the Eightfold Path is the way to end it.\n\n(ii) The eight steps are **right view, right resolve, right speech, right action, right livelihood, right effort, right mindfulness and right concentration**. Together they guide a person in understanding, conduct and the training of the mind.\n\n(iii) The **Middle Path** avoids both extreme indulgence and extreme self-denial, and follows a balanced course between them. **Nirvana** is freedom from desire and from the cycle of rebirth, and so the end of suffering. The teachings were kept alive by the **Sangha**, the community of monks and nuns, who followed the rules and shared the message with ordinary people.',
  sol: 'Four truths; eight steps; Middle Path, Nirvana, Sangha.',
  scheme: [['(i) Four truths', 3], ['(ii) Eight steps', 3], ['(iii) Middle Path', 1.5], ['(iii) Nirvana', 1.5], ['(iii) Sangha', 1]],
}));
Q('l_compare', long({
  t: [3, 4], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Two student groups in an imagined school at Kaveripur prepare a chart comparing Jainism and Buddhism.\n\n(i) Give three similarities. **[3]**\n(ii) Give three differences. **[3]**\n(iii) Explain why a trader and a farmer of the sixth century BCE could both be attracted to these teachings, without ranking one faith above the other. **[4]**',
  model: '(i) Both arose in the **sixth century BCE**, **questioned costly rituals**, accepted **karma and rebirth**, taught **ahimsa** and used **Prakrit and Pali**.\n\n(ii) Jainism stresses **strict ahimsa and austerity**, with the **Tri-ratnas and five vows**; Buddhism teaches the **Middle Path**, the **Four Noble Truths** and the **Eightfold Path**. Buddhism spread to many lands, while Jainism stayed mainly in India.\n\n(iii) A **trader** gained from trade and wished for a standing based on conduct, and both teachings valued conduct above birth. A **farmer** needed cattle and welcomed **ahimsa**. Both faiths offered these appeals in a similar way, so each can be studied on its own merits, with no ranking.',
  sol: 'Similarities; differences; appeal to trader and farmer.',
  scheme: [['(i) Three similarities', 3], ['(ii) Three differences', 3], ['(iii) Appeal to the trader', 2], ['(iii) Appeal to the farmer; no ranking', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_exhibition', source({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined exhibition labels and answer the questions that follow. ${IMAG}`,
  passage: '**Labels in the "Faiths of the Ganga Plains" corner of an imagined school exhibition at Bodhipur**\n\nLabel 1: Twelve sacred texts of a tradition that reveres twenty-four Tirthankaras; compiled at a council held at Valabhi about the fifth to sixth century CE.\n\nLabel 2: A set of three baskets of teaching in the Pali language: rules for the community, discourses, and deeper analysis.\n\nLabel 3: Stories in which a merchant, a deer and a king appear, each told as an earlier life of a great teacher.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the texts described on Label 1.', model: 'The **Angas**, the sacred texts of Jainism.', sol: 'The Angas.', scheme: [['Angas', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which Pitaka of Label 2 holds the rules for the community?', model: 'The **Vinaya Pitaka**.', sol: 'Vinaya Pitaka.', scheme: [['Vinaya Pitaka', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the source on Label 3 and explain how it helps a historian.', model: 'Label 3 describes the **Jatakas**. Because the tales are set among **merchants, animals and kings**, they give glimpses of **everyday life** in ancient times.', sol: 'Jatakas; glimpses of daily life.', scheme: [['Jatakas', 1], ['Glimpses of everyday life', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two differences between the texts on Label 1 and those on Label 2.', model: 'Label 1 is the **Jain** canon, the Angas, while Label 2 is the **Buddhist** canon, the Tripitakas. The Tripitakas are in **Pali** and have **three baskets**, while the Angas are **twelve** in tradition.', sol: 'Faith, language and arrangement.', scheme: [['Jain versus Buddhist', 1], ['Another difference: language or arrangement', 1]] }),
    ]),
  ],
}));
Q('sb_diary', source({
  t: [4], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined diary and answer the questions that follow. ${IMAG}`,
  passage: '**From the imagined pilgrimage diary of Kavya, a Class IX student on a study tour**\n\nDay 1: Our guide told us that a prince of the Shakya clan was born at the first stop on our trip, and that as a young man he saw sickness and old age and left his comfortable home.\n\nDay 2: At the second stop, under a great tree, our guide said he found his answer after trying severe fasting and then choosing a balanced way.\n\nDay 3: Near Varanasi, the guide said that he explained to five companions that life involves suffering, that desire is its cause, and that a path of eight steps can end it.\n\nDay 4: At the last stop, the guide spoke of the end of his earthly life, called mahaparinirvana.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the place visited on Day 3.', model: '**Sarnath**, where the first sermon was given.', sol: 'Sarnath.', scheme: [['Sarnath', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which Noble Truth is described as the cause of suffering on Day 3?', model: 'The **second** truth: desire is the cause of suffering.', sol: 'Second truth: desire.', scheme: [['Desire as the cause', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain how Day 2 refers to the Middle Path.', model: 'After **severe fasting**, he chose a **balanced way**. This is the **Middle Path**, which avoids both extreme indulgence and extreme self-denial.', sol: 'Balanced way between extremes.', scheme: [['Severe fasting and a balanced way', 1], ['Middle Path avoids both extremes', 1]] }), [
      short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the two Noble Truths on Day 3 that are not stated and give the first step of the path.', model: 'The unstated truths are that **suffering can end** (the third) and that the **Eightfold Path** is the way (the fourth). The path begins with **right view**.', sol: 'Third and fourth truths; right view.', scheme: [['Third and fourth truths', 1], ['Right view as the first step', 1]] }),
    ]),
  ],
}));
Q('sb_letter', source({
  t: [2, 3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Imagined letter from Dhanapal, a trader of the imagined town of Chandrapur, to his brother**\n\nBrother, my caravans now reach five towns and my storehouses are full, yet at the temple ceremonies I am seated behind men who have done less than I. I hear that a teacher at the edge of town, speaking in the plain speech of the people, says that worth depends on conduct and not on birth. Our village farmers, who cannot spare an ox, like his teaching that no creature should be harmed. The teacher follows the Jain way, and his monks live on alms and keep almost nothing. I have given a rest-house to his followers, and the king has also sent gifts.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which social cause is shown by Dhanapal\'s complaint about his seat at ceremonies?', model: 'The wish of wealthy **Vaishyas** for a **higher standing** than birth allowed.', sol: 'Vaishya aspirations.', scheme: [['Vaishya wish for standing', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Why do the village farmers in the letter like the teaching?', model: 'They **need their oxen** for ploughing, and the teaching of **ahimsa** says no creature should be harmed.', sol: 'Cattle and ahimsa.', scheme: [['Cattle needed; ahimsa', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give two reasons why a trader such as Dhanapal might support the new teacher.', model: 'The teacher says worth depends on **conduct, not birth**, which suits a wealthy trader held back by birth. He also speaks the **plain language** of the people, and the **king supports** him, so support is safe and respected.', sol: 'Conduct over birth; royal support or language.', scheme: [['Worth by conduct, not birth', 1], ['Another valid reason', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Which Jain vow does the monks\' way of keeping almost nothing reflect, and what does it mean?', model: 'It reflects **aparigraha**, which means **limiting attachment to possessions** and keeping only what one needs.', sol: 'Aparigraha; limiting possessions.', scheme: [['Aparigraha named', 1], ['Meaning: limiting possessions', 1]] }),
    ]),
  ],
}));
