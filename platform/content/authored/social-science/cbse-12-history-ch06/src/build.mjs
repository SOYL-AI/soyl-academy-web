// Build CBSE 12 History ch06 Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts (c. 8th-18th centuries).
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch06', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(680, 350);
  const X = (y) => 190 + ((y - 500) / 1200) * 470;
  const AX = 312;
  for (let yr = 500; yr <= 1700; yr += 100) s.line(X(yr), 10, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(180, AX, 672, AX, { sw: 1.8 });
  for (let yr = 500; yr <= 1700; yr += 100) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 12, muted: true });
  }
  const lane = (i, name) => {
    const y = 24 + i * 26;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    return y;
  };
  const bar = (i, name, a, b) => { const y = lane(i, name); s.rect(X(a), y - 7, X(b) - X(a), 14, { rx: 3, fill: 'fill', color: 'accent', sw: 1.6 }); return y; };
  const dot = (i, name, yr) => { const y = lane(i, name); s.dot(X(yr), y, 5, 'accent'); return y; };
  let y = bar(0, 'Alvars and Nayanars', 550, 800);
  s.text(X(800) + 8, y, 'from about the 6th century', { anchor: 'start', size: 12 });
  y = bar(1, 'Chola rule', 800, 1300);
  s.text(X(1300) + 8, y, '9th to 13th centuries', { anchor: 'start', size: 12 });
  y = bar(2, 'Basavanna, Virashaivas', 1106, 1168);
  s.text(X(1168) + 8, y, 'about 1106 to 1168', { anchor: 'start', size: 12 });
  y = dot(3, 'Arab forces conquer Sind', 711);
  s.text(X(711) + 12, y, '711', { anchor: 'start', size: 12 });
  y = dot(4, 'Delhi Sultanate set up', 1250);
  s.text(X(1250) + 12, y, '13th century', { anchor: 'start', size: 12 });
  y = dot(5, 'Muinuddin Chishti dies', 1235);
  s.text(X(1235) + 12, y, '1235', { anchor: 'start', size: 12 });
  y = bar(6, 'Kabir', 1300, 1500);
  s.text(X(1300) - 8, y, '14th and 15th centuries', { anchor: 'end', size: 12 });
  y = bar(7, 'Baba Guru Nanak', 1469, 1539);
  s.text(X(1469) - 8, y, '1469 to 1539', { anchor: 'end', size: 12 });
  y = bar(8, 'Mirabai', 1400, 1600);
  s.text(X(1400) - 8, y, '15th and 16th centuries', { anchor: 'end', size: 12 });
  y = dot(9, 'Adi Granth compiled', 1604);
  s.text(X(1604) - 10, y, '1604', { anchor: 'end', size: 12 });
  y = dot(10, 'Khalsa Panth founded', 1699);
  s.text(X(1699) - 10, y, '1699', { anchor: 'end', size: 12 });
  s.text(340, 342, 'Years CE. Bars show spans and dots show single dates; the century dates are approximate.', { size: 12, muted: true });
  return s.visual('Timeline from 500 to 1700 CE in eleven rows: the Alvars and Nayanars from about the sixth century; Chola rule in the ninth to thirteenth centuries; Basavanna about 1106 to 1168; Arab forces conquer Sind in 711; the Delhi Sultanate set up in the thirteenth century; Muinuddin Chishti dies in 1235; Kabir in the fourteenth and fifteenth centuries; Baba Guru Nanak 1469 to 1539; Mirabai in the fifteenth and sixteenth centuries; the Adi Granth compiled in 1604; the Khalsa Panth founded in 1699', 'Devotional traditions across twelve centuries');
})();

const vGreatLittle = (() => {
  const s = new Svg(680, 270);
  s.rect(20, 20, 230, 130, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(135, 44, 'Great tradition', { bold: true, size: 14 });
  ['Sanskritic and Puranic texts', 'priests and large temples', 'major deities'].forEach((t, i) => s.text(135, 74 + i * 22, t, { size: 12 }));
  s.rect(430, 20, 230, 130, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(545, 44, 'Little traditions', { bold: true, size: 14 });
  ['local deities and goddesses', 'village festivals and songs', 'local names and customs'].forEach((t, i) => s.text(545, 74 + i * 22, t, { size: 12 }));
  s.arrow(254, 66, 426, 66, { sw: 1.8 });
  s.text(340, 50, 'names and adopts', { size: 12 });
  s.arrow(426, 112, 254, 112, { sw: 1.8 });
  s.text(340, 130, 'brings in local practice', { size: 12 });
  s.text(340, 188, 'Example: Jagannatha at Puri, a local deity identified with Vishnu', { size: 13, bold: true });
  s.text(340, 214, 'Example: local goddesses identified with consorts such as Parvati or Lakshmi', { size: 13 });
  s.text(340, 246, 'Exchange went in both directions', { size: 12, muted: true });
  return s.visual('Diagram of two boxes joined by two arrows in opposite directions: a great tradition of Sanskritic and Puranic texts, priests, large temples and major deities, and little traditions of local deities, village festivals, songs and local names; the arrows say that the great tradition names and adopts local figures and that local practice is brought into the great tradition; examples are Jagannatha at Puri identified with Vishnu and local goddesses identified with consorts such as Parvati or Lakshmi', 'Great and little traditions exchanged ideas in both directions');
})();

const vSilsila = (() => {
  const s = new Svg(700, 282);
  const names = [
    'Khwaja Muinuddin Chishti, Ajmer',
    'Shaikh Qutbuddin Bakhtiyar Kaki, Delhi',
    'Shaikh Fariduddin Ganj-i Shakar, Ajodhan',
    'Shaikh Nizamuddin Auliya, Ghiyaspur',
    'Shaikh Nasiruddin Chiragh-i Delhi',
  ];
  names.forEach((t, i) => {
    const y = 12 + i * 54;
    s.rect(14, y, 340, 38, { sw: i === 3 ? 2.4 : 1.6, color: i === 3 ? 'accent' : undefined, fill: i === 3 ? 'fill' : undefined });
    s.text(184, y + 19, t, { size: 12 });
    if (i < names.length - 1) s.arrow(184, y + 38, 184, y + 52, { sw: 1.6 });
  });
  ['Silsila: a chain of teachers', 'that links each disciple back', 'to the Prophet.'].forEach((t, i) => s.text(384, 40 + i * 22, t, { anchor: 'start', size: 13 }));
  ['Khanqah: a hospice led by a', 'shaikh (pir or murshid) with', 'his disciples (murids).'].forEach((t, i) => s.text(384, 130 + i * 22, t, { anchor: 'start', size: 13 }));
  s.text(384, 225, 'Arrows run from teacher to disciple.', { anchor: 'start', size: 12, muted: true });
  return s.visual('Vertical chain of five boxes joined by downward arrows, running from teacher to disciple: Khwaja Muinuddin Chishti of Ajmer, Shaikh Qutbuddin Bakhtiyar Kaki of Delhi, Shaikh Fariduddin Ganj-i Shakar of Ajodhan, Shaikh Nizamuddin Auliya of Ghiyaspur, and Shaikh Nasiruddin Chiragh-i Delhi; beside it a note that a silsila is a chain of teachers linking a disciple to the Prophet and that a khanqah is a hospice led by a shaikh with his murids', 'A Chishti silsila');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = flow('LR', ['A mosaic of beliefs', 'Great and little traditions', 'Alvars and Nayanars', 'Chola patronage', 'Virashaivas'], 'Route map of Part 1: a mosaic of beliefs, great and little traditions, the Alvars and Nayanars, Chola patronage, and the Virashaivas', 'Part 1 at a glance');
const vMosaic = table(
  ['Strand', 'What it was'],
  [
    ['Many deities and cults', 'Local gods and goddesses, village shrines and regional festivals'],
    ['Puranic traditions', 'Sanskritic worship of major deities, taught by priests and in temples'],
    ['Tantric practices', 'Widespread; open to women and men'],
    ['Devotion in regional languages', 'Hymns and songs sung and composed in local speech'],
  ],
  'Table of four strands of the religious mosaic: many deities and cults; Puranic traditions; Tantric practices open to women and men; and devotion in regional languages',
  'The religious mosaic',
);
const vJag = table(
  ['Local figure', 'How it was linked', 'Example'],
  [
    ['A local deity', 'Identified with a major deity', 'Jagannatha at Puri identified with Vishnu'],
    ['Local goddesses', 'Identified with consorts of major deities', 'Parvati or Lakshmi'],
  ],
  'Table of integration: a local deity identified with a major deity, as Jagannatha at Puri with Vishnu, and local goddesses identified with consorts of major deities such as Parvati or Lakshmi',
  'How local cults were integrated',
);
const vTantra = table(
  ['Feature of Tantric practice', 'Note'],
  [
    ['Who could take part', 'Women and men'],
    ['Attitude to caste and class', 'Often ignored them'],
    ['Spread', 'Widespread in the period'],
    ['Reaction', 'Debates and tensions also existed'],
  ],
  'Table of Tantric practices: open to women and men, often ignoring caste and class, widespread, and met with debates and tensions',
);
const vShrineEx = table(
  ['Step', 'Imagined shrine of the Lake Mother'],
  [
    ['Great tradition', 'Priests recite Sanskrit hymns that call her a form of Lakshmi'],
    ['Little tradition', 'Fisher families bring offerings of fish and sing in their own speech'],
    ['Overlap', 'Both groups use the same shrine and the same festival day'],
    ['What is missing', 'Which name is older; check inscriptions and festival songs'],
  ],
  'Table applying four steps to an imagined shrine of the Lake Mother: priests recite Sanskrit hymns calling her a form of Lakshmi, fisher families bring offerings and sing in their own speech, both use the same shrine and festival day, and it is not known which name is older',
);
const vTamil = table(
  ['Group', 'Devoted to', 'Hymn collection', 'Tradition counts'],
  [
    ['Alvars', 'Vishnu', 'Nalayira Divyaprabandham', 'Twelve saints'],
    ['Nayanars', 'Shiva', 'Tevaram', 'Sixty-three saints'],
  ],
  'Table of the Tamil saints: the Alvars, devoted to Vishnu, with the Nalayira Divyaprabandham, counted by tradition as twelve; the Nayanars, devoted to Shiva, with the Tevaram, counted by tradition as sixty-three',
  'Alvars and Nayanars',
);
const vTamilFeat = table(
  ['Feature', 'Detail'],
  [
    ['Way of life', 'Travelled from shrine to shrine composing hymns in Tamil'],
    ['Background', 'Some came from cultivator, artisan and so-called untouchable castes'],
    ['Caste', 'Some compositions opposed caste distinctions; historians debate how far'],
    ['Women', 'Andal (Alvar) and Karaikkal Ammaiyar (Nayanar)'],
    ['Rivals', 'Some compositions are hostile to Buddhists and Jainas'],
  ],
  'Table of features of the Tamil saints: they travelled from shrine to shrine composing Tamil hymns; some came from cultivator, artisan and so-called untouchable castes; some compositions opposed caste distinctions, a point that historians debate; women among them were Andal and Karaikkal Ammaiyar; and some compositions are hostile to Buddhists and Jainas',
  'Who the saints were',
);
const vChola = table(
  ['Chola support', 'Examples'],
  [
    ['Land grants', 'Gifts of land to temples'],
    ['Temples', 'Chidambaram, Thanjavur and Gangaikondacholapuram'],
    ['Art', 'Fine bronze images of Shiva'],
  ],
  'Table of Chola support for bhakti traditions: land grants to temples, temples at Chidambaram, Thanjavur and Gangaikondacholapuram, and fine bronze images of Shiva',
  'The Cholas and bhakti',
);
const vPlan5 = table(
  ['Mark', 'Point to write'],
  [
    ['1', 'Who the saints were: groups, castes, women'],
    ['2', 'What the compositions said about birth and rank'],
    ['3', 'Limits: hymns state ideals; compiled later; historians debate'],
    ['4', 'Patronage by rulers and temple setting'],
    ['5', 'A judgement that weighs the two sides'],
  ],
  'Table planning a 5-mark answer on the Tamil saints and rank: who the saints were, what the compositions said, the limits of the evidence, patronage, and a weighed judgement',
  'Five headed points earn five marks',
);
const vVira = table(
  ['Feature', 'Detail'],
  [
    ['Place and time', 'Karnataka, twelfth century'],
    ['Leader', 'Basavanna (about 1106 to 1168), a minister at a Kalachuri court'],
    ['Worship', 'Shiva as a linga, often worn by followers'],
    ['Teachers', 'Jangama, wandering monks'],
    ['Challenges', 'Caste, pollution and belief in rebirth'],
    ['Social practice', 'Post-puberty marriage, widow remarriage, burial of the dead'],
    ['Compositions', 'Vachanas in Kannada'],
  ],
  'Table of the Virashaivas: Karnataka in the twelfth century; led by Basavanna, about 1106 to 1168, a minister at a Kalachuri court; worship of Shiva as a linga often worn by followers; jangama as wandering monks; challenges to caste, pollution and rebirth; post-puberty marriage, widow remarriage and burial; and vachanas in Kannada',
  'The Virashaivas',
);
const vCompare = table(
  ['', 'Tamil saints', 'Virashaivas'],
  [
    ['Region', 'Tamil region', 'Karnataka'],
    ['Deity', 'Vishnu (Alvars), Shiva (Nayanars)', 'Shiva as a linga'],
    ['Language', 'Tamil hymns', 'Kannada vachanas'],
    ['Social challenge', 'Caste distinctions (debated)', 'Caste, pollution, rebirth'],
    ['Link with rulers', 'Chola patronage', 'Basavanna at a Kalachuri court'],
  ],
  'Table comparing the Tamil saints and the Virashaivas on region, deity, language, social challenge and link with rulers',
  'Two southern traditions compared',
);
const vGrantEx = table(
  ['Question', 'For an imagined grant record'],
  [
    ['Who issued it?', 'A Chola-period ruler, recorded by a temple clerk'],
    ['To whom?', 'A temple of Vishnu in an imagined town'],
    ['What does it show?', 'Royal support for temple worship through land'],
    ['What is missing?', 'The views of worshippers and of the Alvars themselves'],
  ],
  'Table reading an imagined grant record: issued by a Chola-period ruler and recorded by a temple clerk, to a temple of Vishnu, showing royal support for worship through land, with the views of worshippers and of the Alvars missing',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Mosaic', 'Many cults; Puranic traditions and local cults exchanged ideas'],
    ['Integration', 'Jagannatha with Vishnu; goddesses with consorts; great and little traditions (Redfield)'],
    ['Tantric', 'Open to women and men; often ignored caste and class'],
    ['Tamil saints', 'Alvars (Vishnu), Nayanars (Shiva); hymns in Tamil; caste a debated question'],
    ['Cholas', 'Land grants, temples, bronzes'],
    ['Virashaivas', 'Basavanna; linga; jangama; vachanas; challenges to caste and pollution'],
  ],
  'Summary table of Part 1: the mosaic, integration, Tantric practice, the Tamil saints, the Cholas, and the Virashaivas',
);
const vTips1 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Treating integration as one-way', 'Say that exchange went both ways'],
    ['Mixing Alvars and Nayanars', 'Alvars: Vishnu; Nayanars: Shiva'],
    ['Stating that the saints ended caste', 'Say that some compositions opposed it and that historians debate how far'],
    ['Describing hostility as a general rule', 'Mention it briefly as rivalry, including for royal support'],
  ],
  'Table of exam mistakes and corrections: integration went both ways; Alvars were devoted to Vishnu and Nayanars to Shiva; the saints opposed caste in some compositions and historians debate how far; hostility to Buddhists and Jainas should be mentioned briefly as rivalry',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = flow('LR', ['Islamic traditions', 'Sufism and silsilas', 'The Chishtis', 'Kabir, Guru Nanak, Mirabai', 'Sources'], 'Route map of Part 2: Islamic traditions, Sufism and silsilas, the Chishtis, Kabir, Baba Guru Nanak and Mirabai, and sources', 'Part 2 at a glance');
const vIslam = table(
  ['Point', 'Note'],
  [
    ['Trade', 'Arab merchants traded along the western coast'],
    ['Sind', 'Conquered by Arab forces in 711 (Muhammad Qasim)'],
    ['Delhi Sultanate', 'Set up in the thirteenth century'],
    ['Zimmis', 'Non-Muslim subjects, called protected people, who paid jizya; practice varied'],
    ['Jizya', 'Abolished by Akbar; reimposed by Aurangzeb'],
  ],
  'Table of Islamic rule and settlement: Arab merchants on the western coast; Sind conquered in 711; the Delhi Sultanate set up in the thirteenth century; zimmis as protected non-Muslim subjects who paid jizya, with practice varying; and jizya abolished by Akbar and reimposed by Aurangzeb',
  'Islam and the state',
);
const vPillars = table(
  ['Pillar', 'Meaning'],
  [
    ['Shahada', 'Declaration of faith'],
    ['Namaz (salat)', 'Prayer'],
    ['Zakat', 'Charity'],
    ['Sawm (roza)', 'Fasting'],
    ['Hajj', 'Pilgrimage to Mecca'],
  ],
  'Table of the five pillars of Islam: shahada, the declaration of faith; namaz or salat, prayer; zakat, charity; sawm or roza, fasting; and hajj, pilgrimage to Mecca',
  'Five pillars',
);
const vRegional = table(
  ['Group or feature', 'Local form'],
  [
    ['Khojahs (Ismailis)', 'Ginan, devotional songs in local languages'],
    ['Mappilas of Malabar', 'Adopted Malayalam and local customs'],
    ['Mosques', 'Universal: orientation to Mecca, mihrab, minbar'],
    ['Mosque styles', 'Sloping roofs in Kerala; brick in Bengal'],
    ['Names for people', 'By place or language, for example Turushka, Tajika, Yavana'],
  ],
  'Table of regional forms: the Khojahs used ginan in local languages; the Mappilas adopted Malayalam and local customs; mosques share orientation to Mecca, the mihrab and the minbar; styles vary, with sloping roofs in Kerala and brick in Bengal; and people were named by place or language, for example Turushka, Tajika and Yavana',
  'Shared faith, regional forms',
);
const vSufiRise = flow('LR', ['Early centuries of Islam', 'Protest against materialism', 'Asceticism and mysticism', 'Khanqahs by the eleventh century', 'Silsilas of teachers'], 'Flow of the rise of Sufism: the early centuries of Islam, protest against the materialism of the Caliphate, a turn to asceticism and mysticism, khanqahs by the eleventh century, and silsilas of teachers', 'How Sufism grew');
const vKhanqah = table(
  ['Feature', 'At the Chishti khanqah'],
  [
    ['Kitchen', 'Open kitchen (langar) run on unasked gifts (futuh)'],
    ['Visitors', 'People of all backgrounds'],
    ['Gatherings', 'Sama' + String.fromCharCode(39) + ' (music) and zikr (remembrance of God)'],
    ['Language', 'Local speech, including Hindavi'],
    ['Poet-disciple', 'Amir Khusrau, associated with the qaul'],
  ],
  'Table of life at Nizamuddin Auliya\'s khanqah: an open kitchen run on unasked gifts, visitors of all backgrounds, musical gatherings and remembrance of God, local speech including Hindavi, and Amir Khusrau, a poet and disciple associated with the qaul',
  'Inside a Chishti khanqah',
);
const vDargah = table(
  ['Term', 'Meaning'],
  [
    ['Dargah', 'Tomb of a Sufi master'],
    ['Ziyarat', 'Pilgrimage to the tomb'],
    ['Urs', 'Death anniversary, seen as union with God'],
    ['Ba-shari' + String.fromCharCode(39) + 'a', 'Sufis who followed the rules of Islamic law'],
    ['Be-shari' + String.fromCharCode(39) + 'a', 'Qalandars, madaris, malangs, haidaris, who ignored rituals'],
  ],
  'Table of terms: dargah, the tomb of a Sufi master; ziyarat, pilgrimage to the tomb; urs, the death anniversary seen as union with God; ba-shari\'a, Sufis who followed Islamic law; and be-shari\'a, qalandars, madaris, malangs and haidaris who ignored rituals',
  'Shrines and orders',
);
const vState = table(
  ['Chishtis and the state', 'Evidence'],
  [
    ['Distance from power', 'Khanqah ran on unasked gifts'],
    ['Some acceptance', 'Accepted some donations and grants'],
    ['Rulers\' interest', 'Muhammad bin Tughlaq first sultan recorded at Ajmer; Akbar visited many times'],
    ['Tension', 'Disputes over precedence'],
  ],
  'Table of the Chishtis and the state: distance from power, with a khanqah run on unasked gifts; some acceptance of donations and grants; rulers\' interest, with Muhammad bin Tughlaq the first sultan recorded at Ajmer and Akbar visiting many times; and tension over precedence',
);
const vSamaEx = table(
  ['Question', 'For an imagined note on a musical gathering'],
  [
    ['Who wrote it?', 'A merchant who stayed one evening at a khanqah'],
    ['What did he notice?', 'Songs in local speech; visitors of many kinds'],
    ['What stands out?', 'Music as part of devotion'],
    ['What is missing?', 'How often it was held; what the shaikh thought; check a malfuzat'],
  ],
  'Table reading an imagined note on a musical gathering at a khanqah: the writer is a merchant who stayed one evening; he noticed songs in local speech and visitors of many kinds; music stood out as part of devotion; missing are how often it was held and what the shaikh thought, which a malfuzat could show',
);
const vKabir = table(
  ['Point', 'Detail'],
  [
    ['Date', 'Fourteenth and fifteenth centuries'],
    ['Collections', 'Bijak (Kabirpanth, Varanasi), Kabir Granthavali (Rajasthan), Guru Granth Sahib'],
    ['Ideas', 'Divine reality with many names, formless (nirguna); paradoxical sayings (ulatbansi)'],
    ['Birth', 'Hagiographies disagree: a debate'],
    ['Transmission', 'Many compositions attributed to him; oral, then written'],
  ],
  'Table about Kabir: fourteenth and fifteenth centuries; poems survive in the Bijak, the Kabir Granthavali and the Guru Granth Sahib; the divine described with many names and as formless, with paradoxical sayings called ulatbansi; hagiographies disagree on his birth; and many compositions are attributed to him, passed on orally and later written down',
  'Kabir at a glance',
);
const vNanak = table(
  ['Point', 'Detail'],
  [
    ['Life', 'Born 1469 near Nankana Sahib; died 1539; set up a centre at Kartarpur on the Ravi'],
    ['Teaching', 'A formless Absolute without gender; remembering the divine name'],
    ['Set aside', 'Sacrifices, ritual baths, image worship, austerities'],
    ['Hymns', 'Sabad in Punjabi, sung in ragas; Mardana played the rabab'],
    ['Granth', 'Adi Granth compiled 1604 by Guru Arjan; Khalsa Panth 1699'],
  ],
  'Table about Baba Guru Nanak: born in 1469 near Nankana Sahib, died 1539, set up a centre at Kartarpur on the Ravi; taught a formless Absolute without gender and remembering the divine name; set aside sacrifices, ritual baths, image worship and austerities; composed hymns called sabad in Punjabi, sung in ragas, with Mardana on the rabab; the Adi Granth compiled in 1604 by Guru Arjan and the Khalsa Panth founded in 1699',
  'Baba Guru Nanak at a glance',
);
const vMira = table(
  ['Point', 'Detail'],
  [
    ['Background', 'Rajput princess from Merta, married into the Sisodia clan of Mewar'],
    ['Devotion', 'To Krishna, whom she regarded as her lover'],
    ['Defiance', 'Of her husband\'s family'],
    ['Guru', 'By tradition, Ravidas, a leather worker'],
    ['Songs', 'Passed on orally; sung by Bhils and other groups'],
    ['Caution', 'Details come largely from later traditions'],
  ],
  'Table about Mirabai: a Rajput princess from Merta married into the Sisodia clan of Mewar; devoted to Krishna, whom she regarded as her lover; defied her husband\'s family; by tradition had Ravidas, a leather worker, as her guru; her songs were passed on orally and sung by Bhils and other groups; and details of her life come largely from later traditions',
  'Mirabai at a glance',
);
const vNirgunaEx = table(
  ['Criterion', 'For an imagined song summary'],
  [
    ['Form of the divine', 'None: a formless Lord addressed by many names'],
    ['Ritual', 'Sets aside pilgrimage and austerity'],
    ['Verdict', 'Nirguna'],
    ['Limit', 'The author cannot be named from themes alone'],
  ],
  'Table applying criteria to an imagined song summary: the divine has no form and is addressed by many names; ritual such as pilgrimage and austerity is set aside; the verdict is nirguna; and the author cannot be named from themes alone',
);
const vSources = table(
  ['Source', 'What it is', 'Caution'],
  [
    ['Tazkira', 'Life of a Sufi saint written by followers', 'Written to honour; miracles'],
    ['Malfuzat', 'Conversations of a saint, compiled by a disciple', 'Compiled later; from memory'],
    ['Maktubat', 'Letters of a saint', 'Selected and preserved by disciples'],
    ['Vachanas and Tamil hymns', 'Collections of devotional compositions', 'Later compilation; attribution'],
    ['Kabir and Mirabai collections', 'Oral songs written down later', 'Many attributed to famous names'],
  ],
  'Table of sources: tazkira, a life of a Sufi saint written by followers, written to honour; malfuzat, conversations compiled by a disciple, compiled later; maktubat, letters preserved by disciples; vachanas and Tamil hymn collections, compiled later with attribution problems; and Kabir and Mirabai collections, oral songs written down later and often attributed to famous names',
  'Kinds of devotional source',
);
const vChronoEx = table(
  ['Clue in an imagined note', 'Points to', 'Period'],
  [
    ['The saint of Ajmer has died and his tomb is visited', 'After Muinuddin Chishti died', '1235 or later'],
    ['A disciple of Fariduddin teaches at Ghiyaspur', 'Nizamuddin Auliya', 'Fourteenth century'],
    ['A hymn sung with the rabab at Kartarpur', 'Baba Guru Nanak', '1469 to 1539'],
    ['The Khalsa Panth is founded', 'Guru Gobind Singh', '1699'],
  ],
  'Table of clues and periods: a visited tomb of the saint of Ajmer points to 1235 or later; a disciple of Fariduddin teaching at Ghiyaspur points to Nizamuddin Auliya in the fourteenth century; a hymn sung with the rabab at Kartarpur points to Baba Guru Nanak, 1469 to 1539; and the founding of the Khalsa Panth points to Guru Gobind Singh in 1699',
  'Clues to a chronology',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Islam in the subcontinent', 'Arab merchants; Sind in 711; the Sultanate; zimmis; regional forms'],
    ['Sufism', 'Khanqah, shaikh, murids, silsila; dargah, ziyarat, urs'],
    ['Chishtis', 'Muinuddin; Nizamuddin; langar, futuh, sama\', zikr; distance from the state'],
    ['Kabir', 'Nirguna; Bijak, Kabir Granthavali; birth debated'],
    ['Baba Guru Nanak', 'Formless Absolute; Kartarpur; Adi Granth in 1604'],
    ['Mirabai', 'Krishna as lover; later traditions; songs sung by many groups'],
    ['Sources', 'Tazkira, malfuzat, maktubat, vachanas; check them against other evidence'],
  ],
  'Summary table of Part 2: Islam in the subcontinent, Sufism, the Chishtis, Kabir, Baba Guru Nanak, Mirabai and the sources',
);
const vTips2 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Reading Hindu and Muslim in the modern sense for early texts', 'People were named by place or language'],
    ['Saying the Chishtis shunned all contact with rulers', 'They kept a distance but accepted some gifts'],
    ['Stating Kabir\'s birth as settled', 'Present it as a debate'],
    ['Saying Guru Nanak founded the Khalsa', 'Guru Gobind Singh founded it in 1699'],
    ['Treating a hagiography as a record of events', 'Use it as evidence of belief and check the events'],
  ],
  'Table of exam mistakes and corrections: do not read Hindu and Muslim in the modern sense for early texts; the Chishtis kept a distance from rulers but accepted some gifts; Kabir\'s birth is a debate; Guru Gobind Singh founded the Khalsa Panth in 1699; and a hagiography is evidence of belief to be checked',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Bhakti–Sufi Traditions — Part 1: A Mosaic of Beliefs and the Southern Poets',
  goals: [
    'Explain how Puranic traditions and local cults were integrated, and what great and little traditions mean',
    'Describe the Alvars, Nayanars and Virashaivas, and the debate on their attitude to caste',
    'Explain how the Chola state related to the Tamil bhakti tradition',
    'Plan a 5-mark answer, read a grant record and sort evidence in an imagined shrine',
  ],
  slides: [
    sl('title', 'Bhakti–Sufi Traditions', {
      b: 'Part 1: a **mosaic of beliefs**, the **integration of cults** and the poets of **south India**.',
      v: vRoute1,
      n: 'Between the eighth and the eighteenth centuries, worship in the subcontinent changed in many ways. In this part we look at the mixing of local cults and Puranic traditions, then at the Alvars, the Nayanars and the Virashaivas of the south. We treat every tradition as historians do: carefully, respectfully and with attention to evidence.',
    }),
    sl('concept', 'A mosaic of religious beliefs', {
      b: 'The period shows **many strands** side by side, each with its own deities, practices and languages.',
      v: vMosaic,
      n: 'Think of the religious life of these centuries as a mosaic. There were many local deities and cults, Puranic traditions with their priests and temples, Tantric practices, and devotion sung in regional languages. These strands did not live apart. They met, borrowed from each other and sometimes disagreed, and that meeting is the story of this chapter.',
    }),
    sl('diagram', 'Great and little traditions', {
      v: vGreatLittle,
      n: 'Historians, following the sociologist Robert Redfield, speak of a great tradition and little traditions. The great tradition is the Sanskritic worship of priests and large temples. The little traditions are the local cults of communities. The diagram shows exchange in both directions: local figures were named and adopted, and local practice was brought into temple worship.',
    }),
    sl('check', 'Quick check: a term', {
      b: 'Historians use the terms great tradition and little traditions, an idea associated with the sociologist Robert ___.',
      chk: 'fb_redfield',
      n: 'Recall the name of the sociologist whose idea historians use.',
    }),
    sl('concept', 'How cults were integrated', {
      b: 'A local deity could be **identified with a major deity**, and local goddesses with **consorts**.',
      v: vJag,
      n: 'Integration took the form of identification. At Puri, in Odisha, the local deity Jagannatha came to be identified with Vishnu. Local goddesses were often identified with the consorts of major deities, such as Parvati or Lakshmi. In each case an older local worship was brought inside a wider framework, while villagers often kept their own ways of honouring the deity.',
    }),
    sl('concept', 'Tantric practices and debates', {
      b: 'Tantric practices were **open to women and men** and often ignored **caste and class**.',
      v: vTantra,
      n: 'Tantric practices were widespread in this period. They were open to women and men and often ignored distinctions of caste and class. Not everyone welcomed them, and debates and tensions existed between different religious groups. A balanced answer will mention both the appeal of these practices and the disagreement about them, without judging any tradition.',
    }),
    sl('example', 'Worked example 1: sorting evidence at a shrine', {
      b: 'Imagined shrine: *Priests call the Lake Mother a form of Lakshmi; fisher families bring fish offerings and sing in their own speech.*',
      bl: [
        'Step 1 — Find the **great tradition** elements.',
        'Step 2 — Find the **little tradition** elements.',
        'Step 3 — Note where they **overlap**.',
        'Step 4 — Say what is **missing** before you decide.',
      ],
      v: vShrineEx,
      n: 'Take an imagined shrine of the Lake Mother. The priests who call her a form of Lakshmi show the great tradition. The fisher families who sing in their own speech show a little tradition. Both use the same festival day, so they overlap. What is missing is any evidence of which name came first, so a careful historian would look for older inscriptions and songs.',
    }),
    sl('concept', 'The Alvars and Nayanars', {
      b: 'Tamil devotees of **Vishnu** and **Shiva**, whose hymns were later compiled.',
      v: vTamil,
      n: 'From about the sixth century, Tamil devotees composed hymns of love for their gods. The Alvars, immersed in devotion to Vishnu, are counted by tradition as twelve. The Nayanars, devotees of Shiva, are counted as sixty three. The hymns of the Alvars were compiled in the Nalayira Divyaprabandham, often called the Tamil Veda, and those of the Nayanars in the Tevaram.',
    }),
    sl('check', 'Quick check: the collections', {
      b: 'The hymns of the Alvars were compiled in the ___, often called the Tamil Veda, and those of the Nayanars in the ___.',
      chk: 'fb_tamil',
      n: 'Recall the two hymn collections.',
    }),
    sl('diagram', 'The saints in time', {
      v: vTimeline,
      n: 'This timeline places the devotional traditions of the chapter across the centuries. Look at the first rows. The Tamil saints begin about the sixth century, Chola rule runs through the ninth to the thirteenth centuries, and Basavanna belongs to the twelfth. Later rows show the northern poets and the Sufi events, which we study in the next part.',
    }),
    sl('concept', 'Who the saints were', {
      b: 'They **travelled**, sang in **Tamil**, and came from many castes; their view of caste is **debated**.',
      v: vTamilFeat,
      n: 'The Alvars and Nayanars travelled from shrine to shrine, composing hymns in Tamil. Some came from cultivator, artisan and so called untouchable castes. Some compositions opposed caste distinctions, though historians debate how far. Andal was an Alvar and Karaikkal Ammaiyar a Nayanar. Some compositions are hostile to Buddhists and Jainas, a sign of rivalry that included competition for the support of rulers.',
    }),
    sl('check', 'Quick check: names and roles', {
      b: 'Match each name with the correct description.',
      chk: 'mt_tamil',
      n: 'Link each name with its tradition and role.',
    }),
    sl('concept', 'The Cholas and bhakti', {
      b: 'The Cholas gave **land**, built **temples** and patronised **bronzes**.',
      v: vChola,
      n: 'From the ninth to the thirteenth centuries the Chola rulers supported Brahmanical and bhakti traditions. They made land grants and built temples, for example at Chidambaram, Thanjavur and Gangaikondacholapuram. Fine bronze images of Shiva were made in this period. So the saints' + String.fromCharCode(39) + ' devotion and royal patronage were closely linked in the same temples.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Examine how far the Tamil saints challenged ideas of rank.*',
      bl: [
        'Step 1 — **Who** they were.',
        'Step 2 — What the **compositions** said.',
        'Step 3 — The **limits** of the evidence.',
        'Step 4 — **Patronage**, then a **judgement**.',
      ],
      v: vPlan5,
      n: 'To plan a five mark answer, give one point to who the saints were, one to what the compositions said, and one to the limits of the evidence. Add one point on the support of rulers and finish with a judgement that weighs both sides. Headed lines of about twenty words each will fill the space well.',
    }),
    sl('concept', 'The Virashaivas', {
      b: 'Basavanna, a **Kalachuri** minister, and worship of Shiva as a **linga**.',
      v: vVira,
      n: 'In twelfth century Karnataka, Basavanna, a minister at a Kalachuri court, led the Virashaiva tradition. Followers worshipped Shiva as a linga, often worn on the body, and had wandering monks called jangama. They challenged caste, the idea of pollution and belief in rebirth, supported marriage after puberty and widow remarriage, and buried their dead. Their compositions are vachanas in Kannada.',
    }),
    sl('concept', 'Two southern traditions compared', {
      b: 'Compare on **region**, **deity**, **language**, **challenge** and **link with rulers**.',
      v: vCompare,
      n: 'A good comparison uses criteria. The Tamil saints belong to the Tamil region, devoted to Vishnu and Shiva, and sang in Tamil. The Virashaivas belong to Karnataka, worshipped Shiva as a linga, and composed vachanas in Kannada. Both challenged social ideas, though the Virashaivas were more direct about pollution and rebirth. Both were linked with the courts of their time.',
    }),
    sl('check', 'Quick check: travelling saints', {
      b: 'True or false? The Alvars and Nayanars stayed within a single temple and did not travel.',
      chk: 'tf_travel',
      n: 'Think about how the saints spread their hymns.',
    }),
    sl('example', 'Worked example 3: reading a grant record', {
      b: 'Imagined record: *A Chola-period ruler gives land to a temple of Vishnu in an imagined town; a clerk records it.*',
      bl: [
        'Step 1 — **Who** issued it?',
        'Step 2 — **To whom** was it given?',
        'Step 3 — What does it **show**?',
        'Step 4 — What is **missing**?',
      ],
      v: vGrantEx,
      n: 'Read an imagined grant record in four steps. A Chola period ruler issued it, through a temple clerk. It was given to a temple of Vishnu. It shows royal support for worship through land. What is missing is the voice of worshippers and of the saints themselves, so the record alone cannot tell us how ordinary devotees felt.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The period was a mosaic of beliefs in which Puranic traditions and local cults exchanged ideas, as with Jagannatha and Vishnu. The Alvars and Nayanars sang in Tamil and some opposed caste, though historians debate the extent. The Cholas supported temples and bronzes. The Virashaivas, led by Basavanna, challenged caste, pollution and rebirth.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say that integration went in **both directions**.',
        '**Alvars: Vishnu. Nayanars: Shiva.**',
        'Present caste as a **debate**, not as a settled change.',
        'Mention hostility to Buddhists and Jainas **briefly and neutrally**.',
        'In source questions ask: who wrote it, for whom, and what is missing?',
      ],
      v: vTips1,
      n: 'Some tips. Say that integration went in both directions. Keep the Alvars with Vishnu and the Nayanars with Shiva. Present the saints and caste as a debate, not a settled change. Mention the hostility to Buddhists and Jainas briefly and neutrally. In source questions, ask who wrote, for whom, and what is missing.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Bhakti–Sufi Traditions — Part 2: Sufis, Northern Poets and Sources',
  goals: [
    'Describe Islamic traditions in the subcontinent, regional forms and the growth of Sufism',
    'Explain silsilas, khanqahs, dargahs and the life of the Chishtis, including their relations with the state',
    'Compare the paths of Kabir, Baba Guru Nanak and Mirabai',
    'Use hagiographies, malfuzat and collections of compositions as sources with care',
  ],
  slides: [
    sl('title', 'Sufis, Northern Poets and Sources', {
      b: 'Part 2: **Islamic traditions** and **Sufism**, then **Kabir**, **Baba Guru Nanak** and **Mirabai**, and how to use the **sources**.',
      v: vRoute2,
      n: 'In this part we study Islamic traditions in the subcontinent and the growth of Sufism, with a close look at the Chishtis. Then we turn to Kabir, Baba Guru Nanak and Mirabai, and finally learn how historians use devotional literature as evidence. Throughout, we describe every tradition respectfully and present debates as debates.',
    }),
    sl('concept', 'Islam in the subcontinent', {
      b: 'Arab merchants, **Sind in 711**, the **Delhi Sultanate**, and the position of **zimmis**.',
      v: vIslam,
      n: 'Arab merchants traded along the western coast. Arab forces conquered Sind in 711, and the Delhi Sultanate was set up in the thirteenth century. Rulers dealt with non Muslim subjects as zimmis, protected people who paid a tax called jizya, though practice varied. Akbar abolished the tax and Aurangzeb reimposed it. Treat these as facts about rule, not as judgements of any faith.',
    }),
    sl('concept', 'Shared faith, regional forms', {
      b: 'The **five pillars** were shared; communities used **local languages** and customs.',
      v: vPillars,
      n: 'Muslims everywhere shared the five pillars: the declaration of faith, prayer, charity, fasting and the pilgrimage to Mecca. Yet communities adapted to their regions. The Khojahs used ginan, devotional songs in local languages. The Mappilas of Malabar adopted Malayalam and local customs. Faith was shared, but its expression was regional.',
    }),
    sl('concept', 'Mosques and names', {
      b: 'Mosques share **universal features** but show **regional styles**; people were named by **place or language**.',
      v: vRegional,
      n: 'Mosques share universal features: they face Mecca and have a mihrab and a minbar. But they also show regional styles, such as sloping roofs in Kerala and brick in Bengal. At that time people were usually named by place of origin or language, for example Turushka, Tajika or Yavana. The words Hindu and Muslim were not used in the modern sense.',
    }),
    sl('concept', 'The rise of Sufism', {
      b: 'Sufis stressed **love and devotion** and a **personal reading** of the Quran.',
      v: vSufiRise,
      n: 'Sufism arose in the early centuries of Islam. Some people turned to asceticism and mysticism in protest against the growing materialism of the Caliphate. They stressed love and devotion to God and a reading of the Quran through personal experience. By the eleventh century, Sufis were organised in khanqahs, or hospices, led by a shaikh, also called a pir or murshid, with his disciples, the murids.',
    }),
    sl('diagram', 'A Chishti silsila', {
      v: vSilsila,
      n: 'A silsila is a chain of teachers that links a disciple back to the Prophet. Here is a Chishti line. Khwaja Muinuddin Chishti of Ajmer, then Shaikh Qutbuddin Bakhtiyar Kaki of Delhi, then Shaikh Fariduddin Ganj i Shakar of Ajodhan, then Shaikh Nizamuddin Auliya of Ghiyaspur, and finally Shaikh Nasiruddin Chiragh i Delhi. Arrows run from teacher to disciple.',
    }),
    sl('check', 'Quick check: the order of teachers', {
      b: 'Arrange these Chishti shaikhs in the order of their silsila, from the earliest teacher to the latest disciple.',
      chk: 'ord_silsila',
      n: 'Follow the arrows from teacher to disciple.',
    }),
    sl('concept', 'Life in a Chishti khanqah', {
      b: 'An open **kitchen**, **unasked gifts**, **music** and **remembrance**, in local speech.',
      v: vKhanqah,
      n: 'Nizamuddin Auliya' + String.fromCharCode(39) + 's khanqah at Ghiyaspur ran an open kitchen, the langar, on gifts that were not asked for, called futuh. Visitors of all backgrounds came. There were musical gatherings, called sama, and zikr, the remembrance of God. Local speech, including Hindavi, was used. Amir Khusrau, a poet and disciple, is associated with the qaul.',
    }),
    sl('concept', 'Dargahs and orders', {
      b: 'A **dargah** is a tomb; **ziyarat** is the visit; the **urs** is the death anniversary.',
      v: vDargah,
      n: 'After a master died, his tomb, the dargah, became a place of pilgrimage, called ziyarat. The urs, his death anniversary, was seen as his union with God and drew large gatherings. Some mystics, such as qalandars, madaris, malangs and haidaris, ignored rituals and are called be shari a, in contrast to the ba shari a Sufis who followed the law.',
    }),
    sl('example', 'Worked example 1: reading a note on a gathering', {
      b: 'Imagined note: *A merchant stayed one evening at a khanqah and wrote of songs in local speech and visitors of many kinds.*',
      bl: [
        'Step 1 — **Who** wrote it?',
        'Step 2 — What did he **notice**?',
        'Step 3 — What **stands out**?',
        'Step 4 — What is **missing**, and where could it be found?',
      ],
      v: vSamaEx,
      n: 'Read the note in four steps. A merchant wrote it after a single evening. He noticed songs in local speech and visitors of many kinds. Music stands out as part of devotion. Missing are how often such evenings were held and what the shaikh thought, which a malfuzat, a collection of conversations, might show.',
    }),
    sl('concept', 'Chishtis and the state', {
      b: 'A **distance** from power, **some gifts**, rulers who sought **blessings**, and **tension**.',
      v: vState,
      n: 'The Chishtis kept a distance from power, yet accepted some donations and grants. Rulers sought their blessings and the legitimacy they gave. Muhammad bin Tughlaq was the first sultan recorded as visiting the dargah at Ajmer, and Akbar visited it many times. Disputes over precedence show that the relationship was not simple.',
    }),
    sl('check', 'Quick check: a first visit', {
      b: 'True or false? Sultan Muhammad bin Tughlaq is the first sultan recorded as having visited the dargah of Khwaja Muinuddin Chishti at Ajmer.',
      chk: 'tf_ajmer',
      n: 'Recall which ruler is recorded first.',
    }),
    sl('concept', 'Kabir', {
      b: 'A poet of the **fourteenth and fifteenth centuries**; **nirguna**; his **birth is debated**.',
      v: vKabir,
      n: 'Kabir lived in the fourteenth and fifteenth centuries. His compositions survive in the Bijak, the Kabir Granthavali and the Guru Granth Sahib. He described the ultimate reality by many names and as formless, and used paradoxical sayings. Hagiographies disagree about his birth, so we present it as a debate. Many compositions are attributed to him and were passed on orally.',
    }),
    sl('concept', 'Baba Guru Nanak', {
      b: 'A **formless Absolute**, the **divine name**, **Kartarpur**, and the **Adi Granth**.',
      v: vNanak,
      n: 'Baba Guru Nanak was born in 1469 near Nankana Sahib and died in 1539. He travelled widely and set up a centre at Kartarpur on the Ravi. He taught a formless Absolute without gender and set aside sacrifices, ritual baths, image worship and austerities. His hymns, in Punjabi, were sung in ragas, with Mardana on the rabab. Historians note that he did not set out to found a new religion.',
    }),
    sl('check', 'Quick check: the Adi Granth', {
      b: 'Guru Arjan compiled the Adi Granth in ___, and Guru Gobind Singh later added compositions of Guru Tegh Bahadur.',
      chk: 'fb_adigranth',
      n: 'Recall the year of the compilation.',
    }),
    sl('concept', 'Mirabai', {
      b: 'A Rajput princess devoted to **Krishna**; her life is known mostly from **later traditions**.',
      v: vMira,
      n: 'Mirabai was a Rajput princess from Merta, married into the Sisodia clan of Mewar. She was devoted to Krishna, whom she regarded as her lover, and defied her husband' + String.fromCharCode(39) + 's family. Tradition says her guru was Ravidas, a leather worker. Her songs were passed on orally and sung by Bhils and other groups. Historical details are uncertain and come largely from later traditions.',
    }),
    sl('example', 'Worked example 2: nirguna or saguna?', {
      b: 'Imagined song summary: *a formless Lord with many names; pilgrimage and austerity are set aside.*',
      bl: [
        'Step 1 — Does the divine have a **form**?',
        'Step 2 — What does it say about **ritual**?',
        'Step 3 — State the **verdict**.',
        'Step 4 — Note the **limit**: who composed it?',
      ],
      v: vNirgunaEx,
      n: 'Sort an imagined song summary by criteria. The Lord has no form and many names, so the divine is formless. Pilgrimage and austerity are set aside. The verdict is nirguna. The limit is that the author cannot be named from themes alone, since several poets shared them and many compositions were attributed to famous names.',
    }),
    sl('concept', 'Sources: devotional literature', {
      b: 'Each kind of source has a **use** and a **caution**.',
      v: vSources,
      n: 'Historians use tazkiras, which are lives of Sufi saints; malfuzat, which are conversations compiled by disciples, for example by Amir Hasan Sijzi in the fourteenth century for Nizamuddin Auliya; maktubat, which are letters; and collections of vachanas, Tamil hymns, and the poems of Kabir and Mirabai. Each was compiled later, shaped by devotion, and often attributed to famous names.',
    }),
    sl('example', 'Worked example 3: a chronology from clues', {
      b: 'Clue: *A hymn is sung with the rabab at Kartarpur.* Where does it belong?',
      bl: [
        'Step 1 — Match each **clue** to a person.',
        'Step 2 — Recall the **period**.',
        'Step 3 — Order the notes **earliest first**.',
        'Step 4 — State what each clue **cannot** show.',
      ],
      v: vChronoEx,
      n: 'To build a chronology from clues, match each clue to a person. A visited tomb of the saint of Ajmer points to 1235 or later. A disciple teaching at Ghiyaspur points to Nizamuddin Auliya in the fourteenth century. A hymn sung with the rabab points to Baba Guru Nanak, between 1469 and 1539. The founding of the Khalsa Panth points to 1699.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Islamic traditions in the subcontinent shared one faith and took regional forms. Sufis organised khanqahs and silsilas; the Chishtis ran open kitchens, kept a distance from power yet accepted some gifts. Kabir and Guru Nanak spoke of a formless divine, while Mirabai was devoted to Krishna. Sources are valuable but need cross checking.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'People were named by **place or language**, not as modern Hindus or Muslims.',
        'The Chishtis kept a **distance** but accepted **some gifts**.',
        'Present Kabir\'s birth and Mirabai\'s life as **debated or uncertain**.',
        '**Guru Gobind Singh** founded the Khalsa in 1699.',
        'Use a hagiography as evidence of **belief**, then check it.',
      ],
      v: vTips2,
      n: 'Some tips. Remember that people were named by place or language. The Chishtis kept a distance but accepted some gifts. Present Kabir\'s birth and Mirabai\'s life as debated or uncertain. Guru Gobind Singh founded the Khalsa in 1699. And use a hagiography as evidence of belief, then check its claims against other sources.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Bhakti–Sufi Traditions — Notes',
  sections: [
    {
      h: '1. A mosaic of beliefs and the integration of cults',
      t: 1,
      b: 'Between about the eighth and the eighteenth centuries the subcontinent had **many religious ideas and practices** side by side: local deities and cults, Puranic traditions with their priests and temples, Tantric practices, and devotion in regional languages.\n\n**Integration:** Puranic traditions took in local deities and customs. At **Puri** in Odisha the local deity **Jagannatha** came to be identified with **Vishnu**; local goddesses were identified with consorts of major deities, such as **Parvati** or **Lakshmi**. Historians, following the sociologist **Robert Redfield**, speak of a **great tradition** (Sanskritic and Puranic) and **little traditions** (local cults) that influenced each other in both directions.\n\n**Tantric practices** were widespread and open to women and men, and often ignored caste and class. Debates and tensions also existed between groups.',
      terms: [
        ['Great tradition', 'The Sanskritic, Puranic worship of priests and large temples.'],
        ['Little traditions', 'The many local cults and customs of communities.'],
      ],
      v: vGreatLittle,
      vs: [vMosaic, vJag],
    },
    {
      h: '2. Poems of prayer: the Alvars and Nayanars',
      t: 2,
      b: 'From about the sixth century CE Tamil devotees composed hymns. The **Alvars**, said to be immersed in devotion to **Vishnu**, are counted by tradition as twelve; the **Nayanars**, devotees of **Shiva**, as sixty-three. They went **from shrine to shrine** composing hymns in Tamil. The Alvars\' hymns were compiled as the **Nalayira Divyaprabandham**, often called the Tamil Veda, and the Nayanars\' as the **Tevaram**.\n\nSome came from cultivator, artisan and so-called untouchable castes, and some compositions opposed caste distinctions; **historians debate how far**. Women among them were **Andal** (Alvar) and **Karaikkal Ammaiyar** (Nayanar). Some compositions show hostility to Buddhists and Jainas, a sign of rivalry that included competition for the support of rulers.\n\n**The Chola state** (ninth to thirteenth centuries) supported Brahmanical and bhakti traditions with land grants and temples at places such as Chidambaram, Thanjavur and Gangaikondacholapuram; fine bronze images of Shiva were made in this period.',
      terms: [
        ['Nalayira Divyaprabandham', 'The compilation of the Alvars\' Tamil hymns.'],
        ['Tevaram', 'The compilation of the Nayanars\' Tamil hymns.'],
      ],
      v: vTamilFeat,
      vs: [vTamil, vChola, vTimeline],
    },
    {
      h: '3. The Virashaivas',
      t: 2,
      b: 'In twelfth-century Karnataka the **Virashaiva** (Lingayat) tradition grew under **Basavanna** (about 1106 to 1168), a minister at the court of a **Kalachuri** king. Followers worship **Shiva as a linga**, often worn on the body. Their wandering monks are called **jangama**.\n\nThey challenged **caste, the idea of pollution and belief in rebirth**; they encouraged marriage after puberty and the remarriage of widows, and they bury their dead. Their compositions are the **vachanas**, in Kannada, made by composers from many walks of life. The collections that survive were arranged by later followers.',
      terms: [
        ['Linga', 'The emblem in which Virashaivas worship Shiva.'],
        ['Vachana', 'A saying in Kannada composed by a Virashaiva saint.'],
      ],
      v: vVira,
      vs: [vCompare],
    },
    {
      h: '4. Islamic traditions in the subcontinent',
      t: 3,
      b: 'Arab merchants traded along the **western coast**; **Sind** was conquered by Arab forces in **711** (Muhammad Qasim); the **Delhi Sultanate** was set up in the thirteenth century. Rulers dealt with non-Muslim subjects as **zimmis** (protected people) who paid **jizya**; practice varied, and Akbar abolished the tax while Aurangzeb reimposed it.\n\nMuslims shared the **five pillars**: shahada, namaz (salat), zakat, sawm (roza) and hajj. Communities took **regional forms**: the **Khojahs** (Ismailis) used **ginan** in local languages; the **Mappilas** of Malabar adopted Malayalam and local customs. Mosques share universal features (orientation towards Mecca, **mihrab**, **minbar**) but show regional styles, such as sloping roofs in Kerala and brick in Bengal.\n\nAt this time people were usually named by **place of origin or language**, for example Turushka, Tajika or Yavana; the words **Hindu** and **Muslim** were not used in the modern sense.',
      terms: [
        ['Zimmi', 'A non-Muslim subject of a Muslim ruler, regarded as protected and liable to jizya.'],
        ['Ginan', 'Devotional songs in local languages used by the Khojahs.'],
      ],
      v: vRegional,
      vs: [vIslam, vPillars],
    },
    {
      h: '5. Sufism and the Chishtis in India',
      t: 3,
      b: '**Sufism** arose in the early centuries of Islam among people who turned to **asceticism and mysticism** in protest against the growing materialism of the Caliphate. Sufis stressed **love and devotion** to God and the reading of the Quran through personal experience. By the eleventh century they were organised in **khanqahs** (hospices) under a **shaikh** (pir or murshid) with disciples (**murids**). A **silsila** is a chain of teachers linking a disciple back to the Prophet. A master\'s tomb, the **dargah**, became a place of pilgrimage (**ziyarat**), especially at the **urs**, his death anniversary, seen as union with God. Some mystics (qalandars, madaris, malangs, haidaris) ignored rituals and are called **be-shari\'a**, as against **ba-shari\'a**.\n\n**The Chishtis:** Khwaja Muinuddin Chishti (Ajmer, died 1235), Qutbuddin Bakhtiyar Kaki (Delhi), Fariduddin Ganj-i Shakar (Ajodhan), Nizamuddin Auliya (Ghiyaspur, Delhi, fourteenth century) and Nasiruddin Chiragh-i Delhi. At Nizamuddin\'s khanqah an open kitchen (**langar**) ran on unasked gifts (**futuh**); visitors of all backgrounds came; there were **sama\'** (music) and **zikr**; local languages, including Hindavi, were used; **Amir Khusrau**, poet and disciple, is associated with the qaul.\n\n**The state:** the Chishtis kept a distance from power but accepted some donations and grants; rulers sought their blessings and legitimacy. Muhammad bin Tughlaq is the first sultan recorded at the Ajmer dargah, and Akbar visited it many times; tensions over precedence also occurred.',
      terms: [
        ['Silsila', 'A chain of teachers linking a Sufi disciple back to the Prophet.'],
        ['Khanqah', 'A hospice where a Sufi shaikh lived and taught with his disciples.'],
      ],
      v: vSilsila,
      vs: [vKhanqah, vDargah, vState],
    },
    {
      h: '6. New devotional paths: Kabir, Baba Guru Nanak and Mirabai',
      t: 4,
      b: '**Kabir** (fourteenth and fifteenth centuries): his compositions survive in the **Bijak** (Kabirpanth, Varanasi), the **Kabir Granthavali** (Rajasthan) and the **Guru Granth Sahib**; many are attributed to him and were passed on orally before being written down. He described the ultimate reality by many names (Rama, Hari, Allah, Khuda) and as **formless (nirguna)**, and used paradoxical sayings (**ulatbansi**). Hagiographies disagree about his birth and background, for example whether he was born into a Muslim weaver family or was a disciple of Ramananda; this is a **debate**.\n\n**Baba Guru Nanak** (1469 to 1539) was born at Nankana Sahib (Talwandi) near the Ravi, travelled widely and set up a centre at **Kartarpur**. He taught a **formless Absolute** (rab) without gender, to be remembered through the divine name, and set aside sacrifices, ritual baths, image worship and austerities. His hymns (**sabad**) in Punjabi were sung in ragas with Mardana on the rabab. **Guru Arjan** compiled the **Adi Granth** in 1604; **Guru Gobind Singh** added the compositions of Guru Tegh Bahadur, and the book is called the **Guru Granth Sahib**; he founded the **Khalsa Panth** in 1699. Historians note that Guru Nanak did not set out to found a new religion.\n\n**Mirabai** (fifteenth and sixteenth centuries) was a Rajput princess from Merta, married into the Sisodia clan of Mewar. She was devoted to **Krishna**, whom she regarded as her lover, and defied her husband\'s family; tradition says her guru was **Ravidas**. Her songs were passed on orally and sung by Bhils and other groups. Historical details are uncertain and come largely from later traditions. In Assam, Shankaradeva (late fifteenth century) was another devotional teacher.',
      terms: [
        ['Nirguna bhakti', 'Devotion to a divine reality without form or gender.'],
        ['Saguna bhakti', 'Devotion to a divine being with a form, such as Krishna.'],
      ],
      v: vKabir,
      vs: [vNanak, vMira],
    },
    {
      h: '7. Sources: devotional literature',
      t: 5,
      b: 'Devotional literature was composed, often passed on **orally**, and compiled later. Historians use **tazkiras** (lives of Sufi saints written by followers), **malfuzat** (conversations of saints, for example the fourteenth-century collection of Nizamuddin Auliya\'s conversations by Amir Hasan Sijzi), **maktubat** (letters), **vachanas** and Tamil hymn collections.\n\n**Problems:** later compilation, a devotional purpose, and the attribution of many compositions to famous names. **Method:** ask who wrote or compiled the text and when; whether the writer shared the community of the saint; which details can be checked against other evidence such as chronicles, inscriptions and letters; and whether two accounts are independent or one copies the other. State a conclusion with its limits.\n\nIn SOYL practice, source passages are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
      terms: [
        ['Hagiography', 'A life of a saint written to honour him, often with miracles.'],
        ['Malfuzat', 'Collections of the conversations of a saint, compiled by disciples.'],
      ],
      v: vSources,
      vs: [vChronoEx],
    },
  ],
  tips: '**Common mistakes**\n- Treating integration as one-way, from Puranic to local only.\n- Mixing the Alvars (Vishnu) with the Nayanars (Shiva).\n- Stating that the Tamil saints ended caste; some compositions opposed it and historians debate how far.\n- Reading the words Hindu and Muslim in the modern sense for early texts.\n- Writing that the Chishtis avoided all contact with rulers, when they kept a distance but accepted some gifts.\n- Stating Kabir\'s birth or Mirabai\'s life details as settled facts; they are debated or uncertain.\n- Crediting Guru Nanak with founding the Khalsa Panth, which Guru Gobind Singh founded in 1699.\n- Treating a hagiography as a record of events instead of evidence of belief.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess and evaluate questions need evidence on more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Where did Jagannatha become a major deity, and with whom was he identified?', 'At **Puri** in Odisha; a local deity identified with **Vishnu**.', 'fact', 1],
  ['Great tradition and little traditions', 'Sanskritic, Puranic worship of priests and temples, and the many local cults; they influenced each other in both directions (Robert Redfield).', 'concept', 1],
  ['How were local goddesses integrated?', 'They were identified with consorts of major deities, such as **Parvati** or **Lakshmi**.', 'fact', 1],
  ['Tantric practices', 'Widespread; open to women and men; often ignored caste and class; debates and tensions existed.', 'fact', 1],
  ['**Integration of cults**', 'The process by which Puranic traditions and local cults took in each other\'s deities and practices.', 'definition', 1],
  ['A common error on integration', 'Writing that exchange was one-way; say that it went in both directions.', 'exam-tip', 1],
  ['**Alvars**', 'Tamil devotees of Vishnu; tradition counts twelve; hymns in the **Nalayira Divyaprabandham**.', 'definition', 2],
  ['**Nayanars**', 'Tamil devotees of Shiva; tradition counts sixty-three; hymns in the **Tevaram**.', 'definition', 2],
  ['Women among the Tamil saints', '**Andal** (Alvar) and **Karaikkal Ammaiyar** (Nayanar).', 'fact', 2],
  ['How did the Tamil saints spread their message?', 'They travelled from shrine to shrine composing hymns in Tamil.', 'concept', 2],
  ['The saints and caste', 'Some came from cultivator, artisan and so-called untouchable castes; some compositions opposed caste; historians debate how far.', 'concept', 2],
  ['Why do some Tamil compositions criticise Buddhists and Jainas?', 'A sign of rivalry that included competition for royal support; mention briefly and neutrally.', 'concept', 2],
  ['Chola support for bhakti', 'Land grants and temples at Chidambaram, Thanjavur and Gangaikondacholapuram; bronze images of Shiva.', 'fact', 2],
  ['**Virashaivas**', 'Karnataka, twelfth century; led by **Basavanna** (about 1106 to 1168), a minister at a Kalachuri court.', 'definition', 2],
  ['Virashaiva beliefs and practices', 'Shiva as a linga; jangama; challenged caste, pollution and rebirth; post-puberty marriage, widow remarriage, burial.', 'fact', 2],
  ['Vachanas', 'Compositions of the Virashaivas in Kannada, collected and arranged by later followers.', 'fact', 2],
  ['Zimmis and jizya', 'Non-Muslim subjects regarded as protected; they paid jizya; practice varied (Akbar abolished it, Aurangzeb reimposed it).', 'fact', 3],
  ['Regional Islamic communities', 'Khojahs used **ginan**; Mappilas of Malabar adopted Malayalam and local customs.', 'fact', 3],
  ['Mosque features', 'Universal: facing Mecca, mihrab, minbar. Regional: sloping roofs in Kerala, brick in Bengal.', 'fact', 3],
  ['Names for people in the early period', 'By place of origin or language, such as Turushka, Tajika, Yavana; not Hindu and Muslim in the modern sense.', 'concept', 3],
  ['Origin of Sufism', 'Asceticism and mysticism in protest against the materialism of the Caliphate; love and devotion to God.', 'concept', 3],
  ['**Silsila**', 'A chain of teachers linking a disciple back to the Prophet.', 'definition', 3],
  ['**Khanqah**', 'A hospice headed by a shaikh (pir or murshid) with disciples (murids).', 'definition', 3],
  ['**Dargah, ziyarat, urs**', 'The tomb of a master; the pilgrimage to it; his death anniversary, seen as union with God.', 'definition', 3],
  ['The Chishti line', 'Muinuddin (Ajmer, died 1235), Qutbuddin Bakhtiyar Kaki, Fariduddin Ganj-i Shakar, Nizamuddin Auliya, Nasiruddin Chiragh-i Delhi.', 'fact', 3],
  ['Life at Nizamuddin Auliya\'s khanqah', 'Langar on unasked gifts (futuh); visitors of all backgrounds; sama\' and zikr; Hindavi; Amir Khusrau.', 'fact', 3],
  ['Chishtis and the state', 'Kept a distance but accepted some gifts; rulers sought blessings; Muhammad bin Tughlaq first sultan recorded at Ajmer.', 'exam-tip', 3],
  ['Where do Kabir\'s compositions survive?', 'The **Bijak**, the **Kabir Granthavali** and the **Guru Granth Sahib**; many are attributed to him.', 'fact', 4],
  ['What is debated about Kabir?', 'His birth and background, such as a Muslim weaver family or discipleship to Ramananda.', 'concept', 4],
  ['Baba Guru Nanak\'s teaching', 'A formless Absolute without gender; the divine name; sacrifices, ritual baths, image worship and austerities set aside.', 'concept', 4],
  ['Adi Granth and Guru Granth Sahib', 'Compiled by Guru Arjan in 1604; Guru Gobind Singh added Guru Tegh Bahadur\'s compositions; Khalsa Panth in 1699.', 'fact', 4],
  ['Mirabai', 'Rajput princess from Merta, devoted to Krishna; her life is known largely from later traditions.', 'fact', 4],
  ['Reading a hagiography', 'Use it as evidence of what followers believed, and check events against other sources.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Bhakti–Sufi Traditions',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_goddess_case', 'm_bronze_fit', 'm_urs_date', 'ar_nanak'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_tamil_apply', 's_nirguna_apply', 's3_cult_test'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_tamil_assess', 'l_chishti_state'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_dargah'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Bhakti–Sufi Traditions',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_cult_two_way', 'm_vira_basavanna', 'm_caste_limit', 'm_mosque_apply', 'm_silsila_inf', 'm_nirguna_class', 'm_nanak_weaken', 'm_attrib', 'ar_mosque', 'ar_hagio'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_cult_explain', 's_dargah', { attempt: 1, keys: ['s_bronze_apply', 's_attrib'] }, 's3_sufi_state', { attempt: 1, keys: ['s3_mira_caution', 's3_sources_new'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_cults', { attempt: 1, keys: ['l_north', 'l_hagio'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_kabir', 'sb_vachana'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch06 only (a mosaic of beliefs and integration of cults; Alvars, Nayanars and Virashaivas; Islamic traditions and Sufism; Kabir, Baba Guru Nanak and Mirabai; source-based practice)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no verse of any saint or poet and no Sufi text is quoted, translated or closely paraphrased; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Alvars (12 by tradition) and Nayanars (63 by tradition); Nalayira Divyaprabandham and Tevaram; Cholas 9th to 13th centuries; Basavanna c. 1106 to 68 at a Kalachuri court; Sind 711; Muinuddin Chishti died 1235; Guru Nanak 1469 to 1539; Adi Granth 1604; Khalsa 1699; no maps (OA-23)',
    neutrality: 'every tradition described respectfully and factually; hostility to Buddhists and Jainas mentioned briefly as rivalry; debates (caste, Kabir\'s birth, Mirabai\'s life) presented as debates; Guru Nanak and the Sikh Gurus referred to respectfully',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
