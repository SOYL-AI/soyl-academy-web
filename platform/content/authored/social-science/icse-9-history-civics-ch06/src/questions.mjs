// ICSE 9 History & Civics, ch06 The Vedic Period — question bank.
// Every classroom role-play, museum label, diary and tribe below is imagined by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no hymn, verse or passage of
// any text is quoted or paraphrased closely. Dates are the commonly taught approximate ranges (Early Vedic about
// 1500 to 1000 BCE, Later Vedic about 1000 to 600 BCE; books differ). The origin of the Vedic people is not
// taken up; the epics are treated respectfully as literary sources with no claim about historicity either way.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const PERIODS = { early: [1500, 1000], later: [1000, 600] };
assert.equal(PERIODS.early[1], PERIODS.later[0]);
assert.ok(PERIODS.early[0] > PERIODS.early[1] && PERIODS.later[0] > PERIODS.later[1]);

/** The two periods as boxes drawn roughly to scale on one arrow (years BCE, approximate). */
export function periodsFigure(alt, caption) {
  const s = new Svg(720, 190);
  const px = 640 / (PERIODS.early[0] - PERIODS.later[1]);
  const w1 = (PERIODS.early[0] - PERIODS.early[1]) * px;
  const w2 = (PERIODS.later[0] - PERIODS.later[1]) * px;
  s.rect(40, 50, w1, 70, { rx: 8, fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.text(40 + w1 / 2, 76, 'Early (Rig) Vedic', { size: 15, bold: true });
  s.text(40 + w1 / 2, 100, 'about 1500 to 1000 BCE', { size: 13 });
  s.rect(40 + w1, 50, w2, 70, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(40 + w1 + w2 / 2, 76, 'Later Vedic', { size: 15, bold: true });
  s.text(40 + w1 + w2 / 2, 100, 'about 1000 to 600 BCE', { size: 13 });
  s.arrow(30, 150, 700, 150, { sw: 1.6 });
  s.text(360, 172, 'Dates are approximate and vary between books; drawn roughly to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Three assemblies side by side. */
export function assemblyFigure(alt, caption) {
  const s = new Svg(720, 250);
  const cols = [
    ['Sabha', 'accent', ['Smaller body', 'Elders and nobles', 'Advised the king', 'Heard some disputes']],
    ['Samiti', 'green', ['Larger assembly', 'The people of the tribe', 'Linked to choosing', 'and backing the king']],
    ['Vidatha', 'blue', ['Oldest assembly', 'Tribal gathering', 'Religious and war', 'matters discussed']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 235;
    s.rect(x, 15, 220, 220, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 110, 42, title, { size: 17, bold: true });
    s.line(x + 15, 60, x + 205, 60, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 110, 92 + k * 32, t, { size: 13 }));
  });
  return s.visual(alt, caption);
}

/** The four ashramas as rising steps. */
export function ashramaFigure(alt, caption) {
  const s = new Svg(720, 250);
  const steps = [
    ['Brahmacharya', 'student life', 'accent'],
    ['Grihastha', 'householder life', 'green'],
    ['Vanaprastha', 'gradual withdrawal', 'blue'],
    ['Sannyasa', 'life of renunciation', 'muted'],
  ];
  steps.forEach(([name, line, col], i) => {
    const x = 20 + i * 172;
    const h = 70 + i * 36;
    const y = 225 - h;
    s.rect(x, y, 160, h, { rx: 8, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + 80, y + 28, name, { size: 15, bold: true });
    s.text(x + 80, y + 52, line, { size: 12 });
    if (i < 3) s.arrow(x + 150, y - 8, x + 190, y - 8 - 18, { sw: 1.6, size: 8 });
  });
  s.text(360, 243, 'A pattern of ideal stages, shown in order from left to right', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources: the four Vedas and the epics
Q('m_sama', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A choir leader in a story set in ancient times is trained to sing verses to fixed tunes at ceremonies. Which Veda is closest to what the choir leader practises?',
  opts: ['The Sama Veda, a collection arranged for chanting to melodies', 'The Atharva Veda, a collection of spells', 'The Yajur Veda, a collection of battle plans', 'The Rig Veda, a collection of laws'],
  sol: 'The Sama Veda sets verses to melodies for singing. The Atharva Veda holds charms and everyday matters, the Yajur Veda ritual formulae, and the Rig Veda hymns, not laws or battle plans.',
}));
Q('m_yajur_label', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A label in an imagined museum corner at Vidya Niketan school reads: "Instructions the priest speaks while each step of a sacrifice is carried out." Which Veda does the label describe?',
  opts: ['The Yajur Veda', 'The Sama Veda', 'The Rig Veda', 'The Atharva Veda'],
  sol: 'The Yajur Veda holds the formulae and rules spoken at each step of a sacrifice. The Sama Veda is for chanting, the Rig Veda is hymns of praise, and the Atharva Veda is about charms and daily life.',
}));
Q('m_atharva_label', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Students of Class IX-C find that one Veda has verses about healing a fever, protecting a home and winning a friend. Which Veda is it most likely to be?',
  opts: ['The Atharva Veda', 'The Sama Veda', 'The Yajur Veda', 'The Rig Veda'],
  sol: 'Spells, charms, healing and everyday concerns are typical of the Atharva Veda. The Sama Veda is melodies, the Yajur Veda ritual formulae, and the Rig Veda mostly hymns to the gods.',
}));
Q('m_epic_sources', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A teacher at an imagined school in Kaveripur asks which additional literary works help a student studying Later Vedic society after the Rig Veda. Which answer is most suitable?',
  opts: [
    'The Ramayana and the Mahabharata, whose stories reflect the society and values of that age',
    'The accounts of travellers from a much later age only',
    'Newspaper reports from the last century',
    'Only the Sama Veda, since it is the largest Veda',
  ],
  sol: 'The two epics, treated as literary sources, give a picture of family life, kingship and values of the Later Vedic age. Later travellers and modern papers are too far removed, and the Sama Veda is about chanting.',
}));
Q('m_one_source', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A student in an imagined history club says, "The Rig Veda alone can tell us everything about life in every Vedic age." Which reply is the most accurate?',
  opts: [
    'It mainly reflects the Early Vedic period, so other texts and the epics help to learn about Later Vedic life',
    'It is correct, because the Rig Veda is the only Vedic source',
    'It is wrong, because the Rig Veda says nothing about society',
    'It is correct, because every Veda was composed in a single year',
  ],
  sol: 'The Rig Veda is the chief source for the Early period; for the Later period historians also use the other Vedas, the Brahmanas, the Upanishads and the epics. It does describe society, and the Vedas were not composed in a single year.',
}));
Q('ar_epics', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Ramayana and the Mahabharata are used as literary sources for Later Vedic society.',
  r: 'The epics give the exact date and the exact place of every event they describe.',
  sol: 'A is true: the epics help to picture social life and ideas. R is false: they are works of literature and do not supply exact dates or places for every event.',
}));
Q('fb_four', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The four Vedas are the Rig Veda, the Sama Veda, the ___ Veda and the Atharva Veda.',
  acc: [['Yajur', 'Yajurveda', 'Yajur Veda']],
  sol: 'The third Veda is the Yajur Veda.',
}));
Q('mt_vedas', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each Veda with what it mainly contains.',
  pairs: [
    ['Rig Veda', 'Hymns of praise in ten books'],
    ['Sama Veda', 'Verses set to melodies for chanting'],
    ['Yajur Veda', 'Formulae and rules for sacrifices'],
    ['Atharva Veda', 'Charms, spells and everyday concerns'],
  ],
  sol: 'The Rig Veda is hymns, the Sama Veda melodies, the Yajur Veda ritual formulae and the Atharva Veda charms and daily life.',
}));
Q('s_epics_imp', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are the Ramayana and the Mahabharata useful to a student of Later Vedic society?',
  model: 'The two epics are **literary sources** whose stories show **family life, kingship and social values** of the later age. They help us picture society, though they are not exact records of dates.',
  sol: 'Literary sources; picture of society.',
  scheme: [['Literary sources of the Later Vedic age', 1], ['Show social life and values; not exact records', 1]],
}));
Q('s_veda_contents', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A museum label in an imagined gallery says, "Verses meant to be sung to tunes at a ceremony." Name the Veda described and name one other Veda with its contents.',
  model: 'The label describes the **Sama Veda**, verses set to melodies for chanting. Another is the **Yajur Veda**, which has **formulae and rules** for performing sacrifices.',
  sol: 'Sama Veda and one other Veda.',
  scheme: [['Sama Veda identified', 1], ['Another Veda with its contents', 1]],
}));
Q('s3_epics_caution', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A group in the imagined Class IX-A uses a story from the Mahabharata to describe Later Vedic society. State two things such a source can tell us and one caution a historian must keep in mind.',
  model: '1. It shows **how people lived**, such as family ties and the duties of rulers.\n2. It reveals **values and beliefs** admired in that age.\n3. **Caution:** the epic is a work of **literature**, composed and retold over time, so it must be read with other sources and not as an exact record of dates.',
  sol: 'Two uses and one caution.',
  scheme: [['First use', 1], ['Second use', 1], ['Caution: literature, read with other sources', 1]],
}));

// ================================================================ t02 Early Vedic family and king
Q('m_rajan_role', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which description best fits the rajan of the Early Vedic tribe?',
  opts: [
    'A leader who protected the tribe and led it in war, but did not rule without checks',
    'An absolute ruler who made every decision alone',
    'A priest who took no part in war',
    'A trader who ran markets in towns',
  ],
  sol: 'The rajan protected the tribe and led in battle, while assemblies and customs limited him. He was not absolute, he was not mainly a priest, and towns and markets belong more to the Later period.',
}));
Q('m_senani', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined role-play of a tribe called the Devapura jana, the rajan must pick someone to command the fighting men before a cattle raid. Which officer takes this role?',
  opts: ['The senani', 'The purohita', 'The gramani', 'The vidatha'],
  sol: 'The senani led the army. The purohita was the priest and adviser, the gramani headed a village, and the vidatha was an assembly, not an officer.',
}));
Q('m_purohita', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In the same imagined role-play, one character blesses the rajan before a journey and advises him in important matters. Which official does this character represent?',
  opts: ['The purohita', 'The senani', 'The gramani', 'The vis'],
  sol: 'The purohita was the chief priest and adviser of the rajan. The senani commanded the army, the gramani led a village, and the vis was a division of the tribe, not an official.',
}));
Q('m_not_absolute', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following is the strongest reason why the Early Vedic king cannot be called an absolute ruler?',
  opts: [
    'Assemblies of the tribe and the advice of officials limited his decisions',
    'He did not own any cattle',
    'He lived outside the tribe',
    'He was chosen by a foreign power',
  ],
  sol: 'The Sabha, the Samiti and the Vidatha, together with the counsel of officers such as the purohita, checked the rajan. The other options are not true of the tribal king.',
}));
Q('m_bali', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In Early Vedic society the people gave the rajan offerings called bali. What does this show about the king?',
  opts: [
    'He was supported by gifts from the tribe in return for protecting it, rather than by a fixed regular tax',
    'He had no duties towards the people',
    'He collected a fixed tax from every house every month',
    'He ruled a large empire with a paid army',
  ],
  sol: 'Bali was an offering made by the people, which fits the picture of a protector supported by his tribe. A fixed monthly tax or a vast empire belongs to a later and more developed state.',
}));
Q('ar_king', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The rajan of the Early Vedic tribe was expected to protect his people.',
  r: 'He led the tribe in war and defended its cattle and land.',
  sol: 'Both are true. Leading in war and defending the tribe are exactly the ways in which the rajan protected his people.',
}));
Q('fb_jana', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In the Early Vedic period the largest social unit, the tribe, was called the ___.',
  acc: [['jana', 'Jana']],
  sol: 'The tribe was the jana.',
}));
Q('ord_units', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these Early Vedic social units from the smallest to the largest.',
  items: ['Kula (family)', 'Grama (village)', 'Vis (group of villages)', 'Jana (tribe)'],
  sol: 'Family, village, group of villages, tribe.',
}));
Q('s_king_duties', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two duties of the king in the Early Vedic period.',
  model: '1. He **protected the tribe**, its people, cattle and land.\n2. He **led the tribe in war** against raiders and rival tribes.',
  sol: 'Two duties.',
  scheme: [['Protection of the tribe', 1], ['Leadership in war', 1]],
}));
Q('s_officials', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two officials who helped the Early Vedic king and state what each did.',
  model: 'The **purohita** was the priest and adviser of the king. The **senani** commanded the army. (The **gramani** headed a village.)',
  sol: 'Two officials with their roles.',
  scheme: [['First official with role', 1], ['Second official with role', 1]],
}));
Q('s_role_play', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined role-play, a rajan says he alone will decide whether the tribe moves its herds to a new valley. Explain why a student playing a historian could say this does not match the Early Vedic idea of kingship.',
  model: 'In the Early period the rajan was a **protector and war leader**, not an absolute ruler. **Assemblies** of the tribe and the advice of **officials** shared in important decisions, so he could not decide alone.',
  sol: 'Protector, not absolute; assemblies and advisers.',
  scheme: [['Rajan as protector and war leader, not absolute', 1], ['Assemblies and advisers shared decisions', 1]],
}));
Q('s3_family_king', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the Early Vedic family and the position of the king in three points.',
  model: '1. The **family (kula)** was the basic unit and was **patriarchal**, headed by the father.\n2. Families formed a **grama**, villages a **vis**, and these made up the **jana**, or tribe.\n3. The **rajan** protected the tribe and led it in war, but **assemblies** and officials limited his power.',
  sol: 'Family, units, king.',
  scheme: [['Patriarchal family as basic unit', 1], ['Chain of units up to the jana', 1], ['Position of the king, with limits', 1]],
}));

// ================================================================ t03 Assemblies
Q('m_vidatha', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which assembly is considered the oldest, dealing with tribal, religious and military matters?',
  opts: ['The Vidatha', 'The Sabha', 'The Samiti', 'The Brahmana'],
  sol: 'The Vidatha is regarded as the oldest assembly, with tribal, religious and military functions. The Sabha and the Samiti are other assemblies, and a Brahmana is a text or a varna, not an assembly.',
}));
Q('m_assembly_scenario', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined role-play at Class IX-B, a rajan wishes to start a long war, but all the senior elders and nobles gathered in a small meeting advise against it. Which assembly do they represent?',
  opts: ['The Sabha', 'The Samiti', 'The Gurukul', 'The Kula'],
  sol: 'A small body of elders and nobles giving advice is the Sabha. The Samiti is the larger assembly of the people; a gurukul is a school and a kula is a family.',
}));
Q('m_samiti_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In another imagined role-play, hundreds of members of the Devapura jana gather in an open field to hear and voice opinions on who should be their next rajan. Which assembly is this?',
  opts: ['The Samiti', 'The Sabha', 'The Aranyaka', 'The Senani'],
  sol: 'A large gathering of the tribe, linked to choosing and backing the king, is the Samiti. The Sabha is small, the aranyaka is a text, and the senani is an army commander.',
}));
Q('m_check_power', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'How did the assemblies act as a check on the power of the Early Vedic king?',
  opts: [
    'They discussed matters and advised or backed him, so he needed their support to rule',
    'They removed the army from his control permanently',
    'They gave the king the right to collect any tax he liked',
    'They decided the date of every festival only',
  ],
  sol: 'Assemblies advised the king and gave or withheld support, which restrained one-man rule. They did not take away the army forever, licence unlimited taxes, or deal only with festivals.',
}));
Q('m_assembly_mismatch', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A student notes in an imagined project: "Sabha: whole tribe; Samiti: elders only; Vidatha: oldest assembly." Which correction is right?',
  opts: [
    'The Sabha was the smaller body of elders and the Samiti the larger assembly of the people',
    'The Sabha and the Samiti were the same body',
    'The Vidatha was the newest assembly',
    'The Samiti never met the king',
  ],
  sol: 'The student has swapped the Sabha and the Samiti. The Vidatha is called the oldest, so it was not the newest, and the Samiti and the Sabha were distinct bodies that both dealt with the king.',
}));
Q('ar_assemblies', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Vidatha is regarded as the oldest of the Early Vedic assemblies.',
  r: 'The Sabha was a smaller body of elders.',
  sol: 'Both are true, but the size of the Sabha does not explain why the Vidatha is called the oldest assembly.',
}));
Q('tf_assembly_check', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? If an imagined rajan found that both the Sabha and the Samiti opposed a plan, he would have found it hard to carry the plan through.',
  sol: 'Because the assemblies could advise and give or withhold support, their joint opposition would limit the king.',
}));
Q('fb_assemblies', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The two best known Early Vedic assemblies are the Sabha and the ___, and the oldest one is the Vidatha.',
  acc: [['Samiti', 'samiti']],
  sol: 'The other well-known assembly was the Samiti.',
}));
Q('mt_assemblies', match({
  t: 3, d: 3, c: 'understanding', marks: 3,
  stem: 'Match each assembly with its description.',
  pairs: [
    ['Sabha', 'Smaller body of elders and nobles'],
    ['Samiti', 'Larger assembly of the people'],
    ['Vidatha', 'Oldest assembly with tribal, religious and military matters'],
  ],
  sol: 'Sabha, small body of elders; Samiti, large assembly; Vidatha, the oldest assembly.',
}));
Q('s_sabha_samiti', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the Sabha and the Samiti.',
  model: 'The **Sabha** was a **small body of elders and nobles** that gave the king advice. The **Samiti** was a **large gathering of the people of the tribe**.',
  sol: 'Small body of elders versus large assembly.',
  scheme: [['Sabha: smaller body of elders', 1], ['Samiti: larger assembly of the people', 1]],
}));
Q('s_check_example', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined tribe the rajan proposes to move the herds to a new valley, and the elders object. How does this show an assembly acting as a check?',
  model: 'The **elders** of the **Sabha** advise against the plan, and the king needs their **support** to proceed. The assembly thus **limits** the king and prevents him from acting **alone**.',
  sol: 'Elders object; king needs support.',
  scheme: [['Assembly advises or objects', 1], ['King needs support; limited', 1]],
}));
Q('s3_checks_king', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'In three points, explain how the assemblies checked the power of the king in the Early Vedic period.',
  model: '1. The **Sabha** of elders **advised** the king, so he did not decide alone.\n2. The **Samiti** of the people could **back or withhold support**, which mattered for his position.\n3. The **Vidatha** gave a **tribal forum** for religious and war matters, so these were not settled by one man.',
  sol: 'Three assemblies, three checks.',
  scheme: [['Sabha as adviser', 1], ['Samiti as support', 1], ['Vidatha as forum', 1]],
}));

// ================================================================ t04 Women and economy
Q('m_cattle_wealth', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'In the Early Vedic period, which of the following was the most important form of wealth?',
  opts: ['Cattle', 'Iron tools', 'Large towns', 'Coins in a treasury'],
  sol: 'The economy was mainly pastoral, so cattle were wealth. Iron tools and towns grew in the Later period, and a coin treasury does not describe the Early age.',
}));
Q('m_women_early', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which statement best describes the position of women in the Early Vedic period?',
  opts: [
    'Women were relatively respected and could be educated and take part in rituals and assemblies',
    'Women were barred from all education and religion',
    'Women alone ruled every tribe',
    'Women could not take part in any family decision',
  ],
  sol: 'The Early period shows women as relatively well regarded: education, participation in rituals and assemblies, and some choice in marriage. They did not rule every tribe, nor were they shut out of everything.',
}));
Q('m_composer', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Which of these names is traditionally associated with a woman who composed hymns in the Early Vedic age?',
  opts: ['Lopamudra', 'Valmiki, traditional author of the Ramayana', 'Vyasa, traditional author of the Mahabharata', 'The senani of an imagined tribe'],
  sol: 'Lopamudra, along with Ghosha and Apala, is traditionally named as a woman composer of hymns. Valmiki and Vyasa are traditional authors of the epics, and a senani is an army commander.',
}));
Q('m_women_later', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A historian in an imagined seminar notes that women in the Later Vedic age were seldom seen in assemblies and faced more restrictions. What does this show about the Later period?',
  opts: [
    'A decline in the position of women compared with the Early period',
    'An improvement in the position of women',
    'No change at all in the position of women',
    'That women began to lead every assembly',
  ],
  sol: 'Exclusion from assemblies and growing restrictions point to a lower status than in the Early period. It was not an improvement or a constant, and women did not lead every assembly.',
}));
Q('m_iron', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why did the use of iron, from about 1000 BCE in some areas, matter for Later Vedic society?',
  opts: [
    'Iron tools helped to clear forests and plough heavy soil, so settled agriculture grew',
    'Iron replaced all cattle in the economy at once',
    'Iron ended all trade',
    'Iron was used only to make coins',
  ],
  sol: 'Iron axes and ploughs made it easier to clear land and farm it, supporting settled agriculture. Cattle remained valuable, trade grew rather than ended, and iron was not used only for coins.',
}));
Q('m_later_econ', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined museum case shows an iron ploughshare, a potter\'s wheel and traders\' weights. To which period does the case most likely belong?',
  opts: ['The Later Vedic period', 'The Early Vedic period', 'The Stone Age', 'The period of the Harappan cities'],
  sol: 'Iron tools, crafts and trade suggest the Later Vedic economy of settled farming and growing crafts. The Early period was mainly pastoral, and the other periods are earlier.',
}));
Q('m_compare_label', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Two imagined museum labels read: Label 1, "Herds were counted as riches; fields were small." Label 2, "Villages depended on ploughed fields and crafts; towns were beginning." Which pairing is correct?',
  opts: [
    'Label 1 is Early Vedic and Label 2 is Later Vedic',
    'Label 1 is Later Vedic and Label 2 is Early Vedic',
    'Both labels are Early Vedic',
    'Both labels are Later Vedic',
  ],
  sol: 'Herds as wealth with small fields belong to the pastoral Early period, while ploughed fields, crafts and early towns belong to the Later period. The other pairings reverse or ignore this contrast.',
}));
Q('m_economy_cause', mcq({
  t: 4, d: 4, c: 'evaluation',
  stem: 'Which statement best explains the link between the changing economy and the lower position of women in the Later Vedic age, as some historians suggest?',
  opts: [
    'As settled farming grew, property and family roles became more fixed, and women\'s public role narrowed',
    'The invention of coins made all women wealthy',
    'The assemblies were closed to men',
    'The tribes stopped living in families',
  ],
  sol: 'Some historians link settled agriculture and property with more rigid roles and fewer public opportunities for women. The other options do not match the evidence, and this is an interpretation, not a settled fact.',
}));
Q('ar_economy', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Settled agriculture grew in the Later Vedic period.',
  r: 'The use of iron tools made it easier to clear land and plough the soil.',
  sol: 'Both are true. Iron tools helped farmers clear and plough land, which is a main reason settled agriculture spread.',
}));
Q('tf_early_pastoral', tf({
  t: 4, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The economy of the Early Vedic period was mainly pastoral, with agriculture as a lesser activity.',
  sol: 'Cattle-rearing was the mainstay of the Early period, and farming was less important.',
}));
Q('mt_compare', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each feature with what it points to in Vedic history.',
  pairs: [
    ['Cattle as the chief wealth', 'Pastoral economy of the Early period'],
    ['Iron tools and ploughs', 'Settled agriculture of the Later period'],
    ['Ghosha, Apala and Lopamudra', 'Women associated with composing hymns'],
    ['Exclusion from assemblies', 'Decline in the position of women'],
  ],
  sol: 'Cattle point to the pastoral Early economy, iron to Later settled agriculture, the three names to women hymn-composers, and exclusion from assemblies to the later decline in the position of women.',
}));
Q('s_women_early', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two ways in which women were relatively respected in the Early Vedic period.',
  model: '1. Women could receive **education**; some composed **hymns**, such as **Ghosha, Apala and Lopamudra**.\n2. They could take part in **rituals and assemblies** and had some **choice in marriage**.',
  sol: 'Any two.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s_women_decline', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the position of women change in the Later Vedic period?',
  model: 'It **declined**. Women were largely **excluded from assemblies** and faced more **restrictions** on education and freedom than in the Early period.',
  sol: 'Decline, with a sign.',
  scheme: [['Declined relative to the Early period', 1], ['One sign: exclusion from assemblies or restrictions', 1]],
}));
Q('s_iron_effect', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined village in the Later Vedic age receives iron axes and ploughshares. State two effects this could have on its economy.',
  model: '1. **Forests could be cleared** and heavy soil ploughed, so **settled agriculture** expanded.\n2. A surplus of grain could support **crafts and trade**, helping the beginnings of **towns**.',
  sol: 'Two effects.',
  scheme: [['Clearing land and settled agriculture', 1], ['Surplus supporting crafts, trade and towns', 1]],
}));
Q('s3_women_compare', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the position of women in the Early and Later Vedic periods in three points.',
  model: '1. **Early:** women were relatively respected and could receive **education**; some, like **Ghosha**, composed hymns.\n2. **Early:** they took part in **rituals and assemblies**; **Later:** they were largely **excluded** from assemblies.\n3. **Later:** the position **declined**, with more **restrictions** on their freedom.',
  sol: 'Education; assemblies; overall change.',
  scheme: [['Early: respect and education', 1], ['Assemblies: Early versus Later', 1], ['Later decline and restrictions', 1]],
}));
Q('s3_economy_compare', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the Early and the Later Vedic economy on wealth, farming and crafts.',
  model: '1. **Wealth:** in the Early period **cattle** were the chief wealth; in the Later period **land and produce** mattered more.\n2. **Farming:** **pastoral** economy with some farming, then **settled agriculture** with iron tools.\n3. **Crafts:** limited at first, then **crafts, trade and the beginnings of towns** grew.',
  sol: 'Three contrasts.',
  scheme: [['Wealth', 1], ['Farming', 1], ['Crafts and trade', 1]],
}));
Q('s3_change_reasons', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some historians link the changes in the Later Vedic economy to changes in society. Give three such links, and say why they are interpretations.',
  model: '1. Settled **agriculture** and **iron** supported more **permanent villages** and early towns.\n2. Growing **property** and **crafts** made roles in society more **fixed**.\n3. Some link this to the **narrowing of women\'s public role**. These are **interpretations**: the sources are literary and historians **weigh them differently**.',
  sol: 'Three links and the caution.',
  scheme: [['Agriculture and iron: settlement', 1], ['Property and crafts: fixed roles', 1], ['Women\'s role; the caution of interpretation', 1]],
}));

// ================================================================ t05 Varnas, ashramas and education
Q('m_varna_four', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Which list gives the four varnas of Vedic society?',
  opts: [
    'Brahmanas, Kshatriyas, Vaishyas and Shudras',
    'Brahmacharis, Grihasthas, Vanaprasthas and Sannyasis',
    'Rig, Sama, Yajur and Atharva',
    'Kula, grama, vis and jana',
  ],
  sol: 'The four varnas were the Brahmanas, Kshatriyas, Vaishyas and Shudras. The second list gives the ashramas, the third the Vedas, and the fourth the social units.',
}));
Q('m_varna_early', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'How is the varna system described in the Early Vedic period?',
  opts: [
    'It was fairly flexible and linked mainly to occupation',
    'It was fixed by birth from the start',
    'It did not exist in any form',
    'It was limited to one tribe',
  ],
  sol: 'In the Early period divisions were fairly flexible and tied to work, and only later hardened. They were not fixed by birth from the start, and they were not absent or limited to one tribe.',
}));
Q('m_varna_later', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined historian explains that, in the Later Vedic period, a child belonged to the varna of the family into which the child was born, whatever work the child chose. What change in the varna system is being described?',
  opts: [
    'The system became rigid and birth-based',
    'The system became more flexible',
    'The system ended',
    'The system became based on wealth alone',
  ],
  sol: 'Membership by birth irrespective of occupation is what historians mean by a rigid, birth-based system. It had not become more flexible, ended or turned into a wealth-based division.',
}));
Q('m_ashrama_scenario', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'In an imagined role-play, a character runs a home, raises a family and earns a living. Which ashrama does the character represent?',
  opts: ['Grihastha', 'Brahmacharya', 'Vanaprastha', 'Sannyasa'],
  sol: 'The householder stage is Grihastha. Brahmacharya is student life, Vanaprastha a gradual withdrawal from worldly duties, and Sannyasa a life of renunciation.',
}));
Q('m_gurukul_method', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'How did students mainly learn in the gurukul of the Vedic age?',
  opts: [
    'Orally: by listening, reciting and memorising under the teacher',
    'By reading printed textbooks silently',
    'Only by writing on paper',
    'Through examinations set by the king',
  ],
  sol: 'Learning was oral: students listened, recited and memorised. Printed books, paper and royal examinations did not exist in this form.',
}));
Q('m_hierarchy', mcq({
  t: 5, d: 4, c: 'evaluation',
  stem: 'Which statement about the later varna hierarchy is the most balanced for a history exam?',
  opts: [
    'As a rigid, birth-based hierarchy it created inequality, and historians study it to understand how society changed',
    'It gave equal rights to every group and was therefore fair to all',
    'It should be praised as a perfect system',
    'It should be ignored because it had no effect on society',
  ],
  sol: 'A neutral account says the system hardened into a birth-based order that produced inequality, and historians examine this to understand social change. Praising or ignoring it, or calling it equal, does not fit the evidence.',
}));
Q('m_ashrama_sequence', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A student in an imagined class says that a person who has left home to live a simple life in the forest, handing worldly duties to the next generation, is in the stage just after Grihastha. Which stage is this?',
  opts: ['Vanaprastha', 'Brahmacharya', 'Sannyasa', 'Gurukul'],
  sol: 'Vanaprastha follows Grihastha, with a gradual withdrawal from worldly duties. Brahmacharya comes first, Sannyasa is the final stage of renunciation, and a gurukul is a school, not an ashrama.',
}));
Q('ar_varna', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In the Later Vedic period the varna divisions became rigid and birth-based.',
  r: 'In the Later period a person could freely change varna by changing occupation.',
  sol: 'A is true. R is false: the hardening of the system meant that birth, not occupation, fixed a person\'s varna.',
}));
Q('fb_ashrama', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The stage of life in which a student lived with a teacher and studied was called ___.',
  acc: [['Brahmacharya', 'brahmacharya']],
  sol: 'The student stage was Brahmacharya.',
}));
Q('ord_ashrama', ord({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the four ashramas in the order in which they were ideally followed.',
  items: ['Brahmacharya (student)', 'Grihastha (householder)', 'Vanaprastha (withdrawal)', 'Sannyasa (renunciation)'],
  sol: 'Student, householder, withdrawal, renunciation.',
}));
Q('s_varna_change', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the varna system change between the Early and the Later Vedic periods?',
  model: 'In the **Early** period it was **flexible** and linked to **occupation**. In the **Later** period it became **rigid and birth-based**, which led to a **hierarchy**.',
  sol: 'Flexible to rigid.',
  scheme: [['Early: flexible, occupation', 1], ['Later: rigid, birth-based hierarchy', 1]],
}));
Q('s_gurukul_desc', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the gurukul system in two points.',
  model: '1. Students **lived with the teacher** (guru) and served the household while learning.\n2. Learning was **oral**: listening, **reciting** and **memorising** texts.',
  sol: 'Residence with teacher; oral learning.',
  scheme: [['Living with the teacher', 1], ['Oral learning', 1]],
}));
Q('s3_varna_duties', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State the work usually associated with each of the four varnas.',
  model: '1. **Brahmanas:** study, teaching and priestly work.\n2. **Kshatriyas:** ruling and protecting the people; **Vaishyas:** farming, cattle-rearing and trade.\n3. **Shudras:** service to the other groups. This became a **hierarchy** that later caused **inequality**.',
  sol: 'Work of the four varnas.',
  scheme: [['Brahmanas', 1], ['Kshatriyas and Vaishyas', 1], ['Shudras and the note on hierarchy', 1]],
}));
Q('s3_education', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe Vedic education under three heads: the place, the method and the subjects.',
  model: '1. **Place:** the **gurukul**, where students lived with the teacher.\n2. **Method:** **oral** learning by listening, reciting and memorising.\n3. **Subjects:** the **Vedas** and rituals, language and grammar, and skills linked to a student\'s occupation, such as warfare for future warriors.',
  sol: 'Place, method, subjects.',
  scheme: [['Place: gurukul', 1], ['Method: oral', 1], ['Subjects', 1]],
}));
Q('s3_ashrama_scenario', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In an imagined play, a character is shown (a) studying with a teacher, (b) running a household and (c) leaving home for a simple forest life. Name the ashrama in each scene and say what it stands for.',
  model: '1. (a) **Brahmacharya**: the student stage, when a young person lives with a teacher and studies.\n2. (b) **Grihastha**: the householder stage, when a person earns a living and raises a family.\n3. (c)**Vanaprastha**: a gradual **withdrawal** from worldly duties to a simpler life, advising others.',
  sol: 'Three ashramas with meanings.',
  scheme: [['Brahmacharya with meaning', 1], ['Grihastha with meaning', 1], ['Vanaprastha with meaning', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sources', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'The history of the Vedic period is learnt mainly from literature.\n\n(i) Name the four Vedas. **[3]**\n(ii) State what the Rig Veda and any one other Veda contain. **[3]**\n(iii) Explain the importance of the Ramayana and the Mahabharata as sources for the Later Vedic period, with one caution. **[4]**',
  model: '(i) The four Vedas are the **Rig Veda**, the **Sama Veda**, the **Yajur Veda** and the **Atharva Veda**; the **Rig Veda** is the oldest.\n\n(ii) The **Rig Veda** is a collection of **hymns** in ten books called mandalas. The **Sama Veda** has verses arranged as **melodies** for chanting (the Yajur Veda has ritual formulae, the Atharva Veda charms and everyday matters).\n\n(iii) The epics are **literary sources** that show **family life, kingship and values** of the Later Vedic age, so they help to picture society beyond the Vedas. A historian must be cautious: they are works of **literature**, composed and retold over time, so they are read **together with other sources** and not taken as exact records of dates.',
  sol: 'Four Vedas; contents of two; importance of the epics with a caution.',
  scheme: [['(i) Four Vedas named', 3], ['(ii) Rig Veda contents', 1.5], ['(ii) One other Veda', 1.5], ['(iii) Importance of the epics', 2], ['(iii) Caution', 2]],
}));
Q('l_society', long({
  t: 2, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Early Vedic society was organised around the family and the tribe.\n\n(i) Describe the Early Vedic family and arrange the social units from the smallest to the largest. **[3]**\n(ii) State the duties of the rajan. **[3]**\n(iii) Why was the king not an absolute ruler? Name two officials who helped him. **[4]**',
  model: '(i) The **family (kula)** was **patriarchal**, headed by the father. Families formed a **grama** (village), villages a **vis**, and these made up the **jana**, the tribe.\n\n(ii) The **rajan** was the **protector of the tribe**, defending its people, cattle and land, and the **leader in war**. He also took part in the ceremonies of the tribe.\n\n(iii) He was not absolute because **assemblies** such as the Sabha and the Samiti advised him and could withhold support, and because **customs** guided him. The **purohita**, the priest and adviser, and the **senani**, the commander of the army, helped him; the **gramani** headed a village.',
  sol: 'Family and units; duties; limits and officials.',
  scheme: [['(i) Patriarchal family', 1], ['(i) Chain of units', 2], ['(ii) Protector of the tribe', 1.5], ['(ii) Leader in war', 1.5], ['(iii) Checks on the king', 2], ['(iii) Two officials', 2]],
}));
Q('l_assemblies', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Early Vedic tribe had assemblies as well as a king.\n\n(i) Name the three assemblies and say which one is regarded as the oldest. **[3]**\n(ii) Describe the Sabha and the Samiti, showing how they differed. **[3]**\n(iii) Explain how the assemblies checked the power of the king. **[4]**',
  model: '(i) The three assemblies were the **Sabha**, the **Samiti** and the **Vidatha**; the **Vidatha** is regarded as the **oldest**.\n\n(ii) The **Sabha** was a **small body of elders and nobles** that gave the king advice. The **Samiti** was a **wider assembly of the people of the tribe**, associated with choosing and backing the king. They differed in size and membership.\n\n(iii) The king needed the **support** of the assemblies. The Sabha **advised** him, so he did not decide alone; the Samiti could **back or withhold** support; and the Vidatha gave the tribe a **forum** for religious and war matters. Together they **limited one-man rule** and made the king **answerable** to the tribe.',
  sol: 'Three assemblies; two compared; checks on the king.',
  scheme: [['(i) Three assemblies named', 2], ['(i) Oldest identified', 1], ['(ii) Sabha described', 1], ['(ii) Samiti described', 1], ['(ii) The difference', 1], ['(iii) Role of each assembly', 2], ['(iii) Overall limit on the king', 2]],
}));
Q('l_women_economy', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Society and economy changed from the Early to the Later Vedic period.\n\n(i) Compare the economy of the two periods in three points. **[3]**\n(ii) Describe the position of women in the Early period. **[3]**\n(iii) How did the position of women change in the Later period, and why do historians offer different reasons for this change? **[4]**',
  model: '(i) **Early:** mainly **pastoral**, with **cattle** as wealth and little farming. **Later:** **settled agriculture** with **iron tools** became important, and **crafts, trade** and the beginnings of **towns** grew.\n\n(ii) Women were **relatively respected**: they could receive **education**, some composed **hymns** (Ghosha, Apala, Lopamudra), took part in **rituals and assemblies**, and had some **choice in marriage**.\n\n(iii) In the Later period their position **declined**: they were largely **excluded from assemblies** and faced more **restrictions**. Historians offer **different reasons**: some point to **settled agriculture and property**, others to changes in ritual and law. The sources are **literary**, so the evidence is read in more than one way.',
  sol: 'Economy compared; women in the Early period; change and interpretations.',
  scheme: [['(i) Three contrasts', 3], ['(ii) Respect and education', 1.5], ['(ii) Participation and choice', 1.5], ['(iii) Decline described', 2], ['(iii) Different reasons', 2]],
}));
Q('l_varna_ashrama', long({
  t: 5, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Vedic society was shaped by the varnas and the ashramas.\n\n(i) Name the four varnas and explain how the system changed from the Early to the Later period. **[3]**\n(ii) Name the four ashramas in order and describe any two. **[3]**\n(iii) Describe the gurukul system of education: its place, method and subjects. **[4]**',
  model: '(i) The varnas were the **Brahmanas, Kshatriyas, Vaishyas and Shudras**. In the **Early** period the divisions were **flexible** and linked to **occupation**; in the **Later** period they became **rigid and birth-based**, a hierarchy that later caused inequality.\n\n(ii) The ashramas were **Brahmacharya, Grihastha, Vanaprastha and Sannyasa**. In **Brahmacharya** the person was a **student**; in **Grihastha** a **householder**, earning a living and raising a family.\n\n(iii) **Place:** the **gurukul**, where students lived with the teacher. **Method:** **oral**, by listening, reciting and memorising. **Subjects:** the **Vedas** and rituals, language and grammar, and skills linked to a student\'s work, such as warfare for future warriors.',
  sol: 'Varnas and change; ashramas; gurukul.',
  scheme: [['(i) Four varnas', 1], ['(i) Change from flexible to rigid', 2], ['(ii) Four ashramas in order', 1.5], ['(ii) Two described', 1.5], ['(iii) Place', 1], ['(iii) Method', 1.5], ['(iii) Subjects', 1.5]],
}));
Q('l_early_later', long({
  t: [2, 4], d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'Two imagined museum rooms show the Vedic world. Room A displays herds, a rajan with a purohita and a senani, and women chanting hymns at an assembly. Room B displays iron ploughshares, a pottery workshop, a market scene and a household in which women stay indoors.\n\n(i) Identify the period of each room with one reason each. **[3]**\n(ii) Explain what Room A tells us about the king and the family. **[3]**\n(iii) Explain what the change from Room A to Room B shows about the economy and the position of women. **[4]**',
  model: '(i) Room A is **Early Vedic**: herds point to a **pastoral** economy and women at assemblies to their respect. Room B is **Later Vedic**: **iron ploughshares**, crafts and markets show settled agriculture and trade.\n\n(ii) The rajan is a **protector and leader in war**, advised by the **purohita** and the **senani**, so he is not absolute. The family is **patriarchal** but women take part in **ritual and assembly**.\n\n(iii) The economy moved from **cattle-rearing** to **settled agriculture, crafts and trade**. The position of women **declined**, as they were **excluded from assemblies** and faced restrictions; some historians link the two changes, while others stress other causes.',
  sol: 'Periods with reasons; Room A on king and family; change in economy and women.',
  scheme: [['(i) Room A with reason', 1.5], ['(i) Room B with reason', 1.5], ['(ii) King', 1.5], ['(ii) Family and women', 1.5], ['(iii) Economy', 2], ['(iii) Women and linking', 2]],
}));
Q('l_evaluate', long({
  t: [1, 3, 5], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student in an imagined debate says: "Because we know of the Vedic age only from texts, we cannot say anything reliable about its society."\n\n(i) Name the kinds of texts that give us information about the Vedic age. **[3]**\n(ii) Give two features of Early Vedic government that these texts describe. **[3]**\n(iii) Evaluate the student\'s view: how far is it fair, and how should a historian use such texts? **[4]**',
  model: '(i) The **four Vedas** (above all the **Rig Veda**), the **Brahmanas, Aranyakas and Upanishads**, and the **epics**, the Ramayana and the Mahabharata, for the Later age.\n\n(ii) The **rajan** as protector and war leader, helped by officials such as the **purohita** and the **senani**; and **assemblies**, the Sabha, the Samiti and the Vidatha, which checked him.\n\n(iii) The view is **partly fair**: the texts are literary, mostly religious, and composed and retold over time, so they give a **partial** picture and are hard to date exactly. But they are **not useless**: read **together**, compared with each other and with other evidence, they show **consistent features** of society. A historian therefore uses them **carefully**, notes their **limits** and says **about** when giving dates.',
  sol: 'Kinds of texts; two features; balanced evaluation.',
  scheme: [['(i) Vedas', 1.5], ['(i) Other texts and the epics', 1.5], ['(ii) King and officials', 1.5], ['(ii) Assemblies', 1.5], ['(iii) Why partly fair', 2], ['(iii) How to use the texts', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_museum', source({
  t: [1, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined museum labels and answer the questions that follow. ${IMAG}`,
  passage: '**Labels in the Vedic corner of the Vidya Niketan school museum (imagined)**\n\nLabel 1: A bundle of palm leaves with verses meant to be sung to tunes at a ceremony.\n\nLabel 2: A clay model of a herd with a few small plots beside it. People of this age measured riches by the number of animals they owned.\n\nLabel 3: An iron blade and a clay pot, showing that farmers and craftworkers of a later age worked with new tools.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which Veda is Label 1 most likely to describe?', model: 'The **Sama Veda**, whose verses are set to melodies for chanting.', sol: 'Verses sung to tunes: Sama Veda.', scheme: [['Sama Veda', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'To which period does Label 2 belong?', model: 'The **Early Vedic** period, when the economy was mainly pastoral.', sol: 'Herds as wealth: Early period.', scheme: [['Early Vedic', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does Label 3 show about the Later Vedic economy? Give two points.', model: 'The **iron blade** shows the use of **iron tools** that helped clear land and expand **settled agriculture**. The **clay pot** points to **crafts**, so the economy had farming and craft work.', sol: 'Iron, farming, crafts.', scheme: [['Iron tools and agriculture', 1], ['Crafts', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Compare the economy shown in Label 2 with the economy shown in Label 3.', model: 'Label 2 shows a **pastoral** economy with **cattle** as wealth. Label 3 shows **iron tools** and **crafts**, which suggest **settled agriculture** and skilled work, a more settled way of life.', sol: 'Pastoral versus settled.', scheme: [['Pastoral, cattle wealth', 1], ['Iron, crafts, settled life', 1]] }),
    ]),
  ],
}));
Q('sb_roleplay', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined script of a Class IX role-play and answer the questions that follow. ${IMAG}`,
  passage: '**Role-play script, Class IX-B, "A Tribal Meeting" (imagined)**\n\nThe rajan of the Devapura jana says that the herds must cross the river before the monsoon. The purohita agrees and offers to bless the journey. The senani says the fighting men are ready to guard the crossing. Then an elder rises in a small gathering of nobles and says the river is too high this year. The rajan asks the whole tribe to meet in the open field, and many people speak before he decides.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which official is ready to guard the crossing?', model: 'The **senani**, the commander of the army.', sol: 'Senani.', scheme: [['Senani', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the assembly shown when the whole tribe meets in the field.', model: 'The **Samiti**, the larger assembly of the people.', sol: 'Samiti.', scheme: [['Samiti', 1]] })),
    child('c', short({ t: [2, 3], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does the script show that the rajan was not an absolute ruler?', model: 'The rajan **consults** his **officials** and an **elder** of the small gathering (the **Sabha**), and then calls the **Samiti**. He listens to **many voices** before he decides, so his power was **checked**.', sol: 'Consultation with officials and assemblies.', scheme: [['Consults officials and the Sabha', 1], ['Calls the Samiti; power checked', 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the small gathering of nobles in the script and state one difference between it and the full meeting.', model: 'It is the **Sabha**, a **smaller body of elders and nobles**. The full meeting, the **Samiti**, is **larger** and includes the **people** of the tribe.', sol: 'Sabha; difference in size and members.', scheme: [['Sabha named', 1], ['A difference stated', 1]] }),
    ]),
  ],
}));
Q('sb_diary', source({
  t: [4, 5], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined diary page and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the imagined diary of Devadatta, a student in a gurukul**\n\nI live in the teacher\'s house and wake before dawn to fetch water and tend the fire. After that we sit in a circle and repeat the verses after the teacher until each line is firm in memory. My brother has finished his studies and now runs the family household. Our grandfather has moved to a hut at the forest edge and gives advice but few orders. My teacher says a student should learn the skills needed for the work that his family does.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which method of learning does the diary describe?', model: '**Oral** learning: repeating verses until they are memorised.', sol: 'Oral learning.', scheme: [['Oral learning', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Name the ashrama of the brother, who runs the family household.', model: '**Grihastha**, the householder stage.', sol: 'Grihastha.', scheme: [['Grihastha', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify the ashrama of the grandfather and explain what it means.', model: 'The grandfather is in **Vanaprastha**, the stage of **gradual withdrawal** from worldly duties, giving advice rather than orders and living apart from the household.', sol: 'Vanaprastha with meaning.', scheme: [['Vanaprastha', 1], ['Meaning: gradual withdrawal', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Describe two features of the gurukul shown in the diary.', model: 'Devadatta **lives in the teacher\'s house** and serves it by fetching water and tending the fire. Learning is **oral**, by repeating verses, and also includes **skills** linked to the family\'s work.', sol: 'Two features.', scheme: [['Residence and service', 1], ['Oral learning or skills', 1]] }),
    ]),
  ],
}));
