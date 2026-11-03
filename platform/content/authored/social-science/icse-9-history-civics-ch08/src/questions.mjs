// ICSE 9 History & Civics, ch08 The Mauryan Empire — question bank.
// Every museum guide note, traveller's letter, school report and classroom scene below is imagined by SOYL and labelled
// as imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No edict, no
// passage of the Arthashastra and no passage of the Indika is quoted: ideas are paraphrased. Dates are the commonly
// taught approximate ones (books differ): Chandragupta about 321-297 BCE, Bindusara about 297-273 BCE, Ashoka about
// 268-232 BCE, Kalinga War about 261 BCE.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const REIGNS = { chandragupta: [321, 297], bindusara: [297, 273], ashoka: [268, 232] };
assert.equal(REIGNS.chandragupta[1], REIGNS.bindusara[0]);
assert.ok(REIGNS.ashoka[0] < REIGNS.bindusara[1]);

/** The three rulers as boxes on one arrow, drawn roughly to scale (years BCE, approximate). */
export function rulersFigure(alt, caption) {
  const s = new Svg(720, 200);
  const px = 640 / (REIGNS.chandragupta[0] - REIGNS.ashoka[1]);
  const X = (yr) => 40 + (REIGNS.chandragupta[0] - yr) * px;
  const box = (r, name, col) => {
    const x = X(r[0]);
    const w = (r[0] - r[1]) * px;
    s.rect(x, 45, w, 80, { rx: 8, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + w / 2, 75, name, { size: 15, bold: true });
    s.text(x + w / 2, 100, `about ${r[0]} to ${r[1]} BCE`, { size: 13 });
  };
  box(REIGNS.chandragupta, 'Chandragupta', 'accent');
  box(REIGNS.bindusara, 'Bindusara', 'green');
  box(REIGNS.ashoka, 'Ashoka', 'blue');
  s.arrow(30, 150, 700, 150, { sw: 1.6 });
  s.text(360, 175, 'Drawn roughly to scale. Dates are approximate; books differ, so the small gap before Ashoka may vary', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Chart of Mauryan administration. */
export function adminFigure(alt, caption) {
  const s = new Svg(720, 335);
  s.rect(250, 12, 220, 42, { rx: 8, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.8 });
  s.text(360, 33, 'The king', { size: 17, bold: true });
  s.line(360, 54, 360, 70, { sw: 1.6 });
  s.rect(170, 70, 380, 42, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(360, 91, 'Council of ministers (mantriparishad)', { size: 14, bold: true });
  const cols = [
    ['Central officials', 'accent', ['Samaharta: revenue', 'Sannidhata: treasury', 'Army and spies']],
    ['Provinces', 'green', ['Ruled by princes', '(kumaras) from', 'Taxila, Ujjain, Tosali', 'and Suvarnagiri']],
    ['The city', 'blue', ['Pataliputra', 'Board of thirty in', 'six committees of five', '(as reported)']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 235;
    s.line(360, 112, x + 110, 135, { sw: 1.4, color: 'muted' });
    s.rect(x, 135, 220, 165, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 110, 160, title, { size: 16, bold: true });
    s.line(x + 15, 176, x + 205, 176, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 110, 200 + k * 25, t, { size: 13 }));
  });
  s.text(360, 320, 'Provinces were divided into districts and villages', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of some Mauryan places and edict sites. */
export function mapFigure(alt, caption) {
  const s = new Svg(720, 430);
  const pts = [
    [290, 90, 'Taxila', 'start', 'accent'],
    [420, 150, 'Sarnath', 'end', 'green'],
    [490, 170, 'Pataliputra', 'start', 'blue'],
    [385, 200, 'Sanchi', 'start', 'green'],
    [335, 225, 'Ujjain', 'end', 'accent'],
    [520, 235, 'Tosali (Kalinga)', 'start', 'accent'],
    [400, 320, 'Suvarnagiri', 'start', 'accent'],
  ];
  pts.forEach(([x, y, name, anchor, col]) => {
    s.dot(x, y, 6, col);
    s.text(x + (anchor === 'start' ? 12 : -12), y, name, { size: 14, anchor, bold: true });
  });
  s.text(360, 415, 'Schematic, not to scale. Positions are approximate and only some places are shown', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources
Q('m_arth_author', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A guide in an imagined museum at Patna describes a treatise on statecraft that advises kings on revenue, spies, war and justice. Who is traditionally named as its author?',
  opts: ['Kautilya, also called Chanakya, minister of Chandragupta', 'Megasthenes, envoy of Seleucus Nikator', 'James Prinsep, who deciphered the Brahmi script', 'Ashoka, who set up the pillars'],
  sol: 'The Arthashastra is attributed to Kautilya (Chanakya). Megasthenes wrote the Indika, James Prinsep deciphered the Brahmi script in 1837, and Ashoka issued the edicts; none of them wrote the Arthashastra.',
}));
Q('m_indika_author', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined letter, a Greek envoy at Pataliputra writes that he is collecting notes on the city, its rulers and its people for readers back home. Which known work, and which author, does his task resemble?',
  opts: ['The Indika by Megasthenes, envoy of Seleucus Nikator', 'The Arthashastra by Kautilya', 'The edicts of Ashoka', 'The carvings at Sanchi'],
  sol: 'Megasthenes was a Greek envoy at the court of Chandragupta who wrote the Indika. The Arthashastra is a treatise by an Indian minister, the edicts are royal messages, and Sanchi is a monument.',
}));
Q('m_prinsep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A guide at an imagined heritage walk says, "For centuries nobody could read the writing on the rock, until a scholar deciphered it in 1837." Why was that achievement important for the study of the Mauryas?',
  opts: [
    'It allowed historians to read the Ashokan Edicts, which are written in Brahmi script, and learn the ruler\'s own words and policies',
    'It proved that the Arthashastra was written in a single year',
    'It showed that Megasthenes had never visited India',
    'It created the Sanchi Stupa',
  ],
  sol: 'James Prinsep deciphered the Brahmi script in 1837, which opened the edicts to historians. The other options have no connection with the deciphering.',
}));
Q('m_edict_lang', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined guide notes that one Ashokan edict in the far north-west was carved in Greek and Aramaic, while most others use Prakrit in the Brahmi script. What can a historian infer?',
  opts: [
    'The ruler wished his messages to be understood by people of different languages in different regions',
    'Ashoka ruled only the north-west',
    'The edicts were all written by foreigners',
    'The edicts were meant to be read only by the king\'s ministers',
  ],
  sol: 'Using the local languages and scripts of a region shows that the messages were meant for the people there. It does not show a small realm or foreign authorship, and the edicts were public, not secret.',
}));
Q('m_sanchi', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Students visiting Sanchi in Madhya Pradesh are told by an imagined guide, "The stupa was begun in Ashoka\'s time, and the carved gateways were added much later." Which statement about Sanchi is correct?',
  opts: [
    'It is a Buddhist monument whose carvings help us learn about the religion and art of the period',
    'It is a palace in which Ashoka lived',
    'It is a city whose administration was run by a board of thirty',
    'It is a treatise on statecraft',
  ],
  sol: 'Sanchi Stupa is a Buddhist monument, and its carvings are evidence of belief and art. The palace, the city board and the treatise belong to other sources.',
}));
Q('m_arth_caution', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A student in an imagined history club says, "Every rule in the Arthashastra was followed exactly in Chandragupta\'s empire." Which reply is the most accurate?',
  opts: [
    'It is a treatise on how a state should be run, its date is debated and parts may be later, so it must be read with other sources',
    'The student is right, because the book was written by the emperor himself',
    'The student is right, because the book was found in Pataliputra in the Mauryan age',
    'The student is wrong, because the Arthashastra says nothing about government',
  ],
  sol: 'A treatise describes what a state ought to do; scholars debate its date and some parts may be later additions. It was not written by the emperor, and it does discuss government at length.',
}));
Q('tf_indika', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Megasthenes, the author of the Indika, was a minister of Chandragupta who wrote in Sanskrit.',
  sol: 'False. Megasthenes was a Greek envoy sent by Seleucus Nikator to the court of Chandragupta, and his work survives only through later Greek and Roman writers.',
}));
Q('fb_arth', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The treatise on statecraft called the Arthashastra is traditionally attributed to ___.',
  acc: [['Kautilya', 'kautilya', 'Chanakya', 'chanakya']],
  sol: 'It is attributed to Kautilya, also called Chanakya.',
}));
Q('fb_sanchi', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Sanchi Stupa is in the Indian state of ___.',
  acc: [['Madhya Pradesh', 'madhya pradesh', 'MP']],
  sol: 'Sanchi is in Madhya Pradesh.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each source of Mauryan history with what it is.',
  pairs: [
    ['Arthashastra', 'Treatise on statecraft attributed to Kautilya'],
    ['Indika', 'Account by the Greek envoy Megasthenes'],
    ['Ashokan Edicts', 'Royal messages carved on rocks and pillars'],
    ['Sanchi Stupa', 'Buddhist monument in Madhya Pradesh'],
  ],
  sol: 'The Arthashastra is a treatise by Kautilya, the Indika an account by Megasthenes, the edicts are carved royal messages, and Sanchi is a Buddhist monument.',
}));
Q('s_edicts_imp', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are the Ashokan Edicts considered a very valuable source of Mauryan history?',
  model: 'They were issued by **Ashoka himself** and carved on **rocks and pillars**, so they preserve his own words. They tell us about his **Dhamma**, the **Kalinga War** and his **welfare measures**.',
  sol: 'Issued by the ruler; tell of Dhamma and Kalinga.',
  scheme: [['Issued by Ashoka himself and carved in stone', 1], ['Information on Dhamma, Kalinga or welfare', 1]],
}));
Q('s_sanchi', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which the Sanchi Stupa helps a historian of the Mauryan age.',
  model: '1. It was **begun under Ashoka**, so it shows his **patronage of Buddhism**.\n2. Its **carved gateways** and railings show the **art and beliefs** of the age, including scenes from the Buddha\'s life.',
  sol: 'Patronage; art and belief.',
  scheme: [['Begun under Ashoka; patronage', 1], ['Carvings as evidence of art and belief', 1]],
}));
Q('s_indika', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined student reads a Greek writer who says he is quoting a lost account of Chandragupta\'s court. Name the lost work and say why a historian reads such a quotation with care.',
  model: 'The lost work is the **Indika** of **Megasthenes**. It survives only through **quotations** by later Greek and Roman writers, and Megasthenes was a **foreigner**, so he may have misunderstood things.',
  sol: 'Indika; survives in quotations; foreign observer.',
  scheme: [['Indika of Megasthenes named', 1], ['Reason for care: only quotations survive or foreign viewpoint', 1]],
}));
Q('s3_sources', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name three sources of Mauryan history and state one thing each tells us.',
  model: '1. The **Arthashastra** (attributed to Kautilya) tells us how a state was expected to be governed.\n2. The **Indika** (Megasthenes) describes Pataliputra and the Mauryan court as seen by a foreigner.\n3. The **Ashokan Edicts** record Ashoka\'s Dhamma and policies in his own words.',
  sol: 'Three sources with contributions.',
  scheme: [['Arthashastra and its use', 1], ['Indika and its use', 1], ['Edicts or Sanchi and its use', 1]],
}));

// ================================================================ t02 Rulers
Q('m_chandragupta_found', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On an imagined timeline game at Class IX Open Day, the card reads: "I overthrew the Nandas and founded the Mauryan Empire in about 321 BCE." Which ruler holds the card?',
  opts: ['Chandragupta Maurya', 'Bindusara', 'Ashoka', 'Seleucus Nikator'],
  sol: 'Chandragupta Maurya overthrew the Nandas and founded the empire. Bindusara and Ashoka ruled after him, and Seleucus Nikator was a Greek ruler, not a Mauryan.',
}));
Q('m_seleucus', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined museum panel reads: "A war between the Mauryan king and a Greek ruler in the north-west ended with a treaty, and an envoy then came to Pataliputra." Which pair of rulers fits the panel?',
  opts: ['Chandragupta Maurya and Seleucus Nikator, about 305 to 303 BCE', 'Bindusara and Seleucus Nikator, about 270 BCE', 'Ashoka and the rulers of Kalinga, about 261 BCE', 'Chandragupta Maurya and the Nandas, about 321 BCE'],
  sol: 'The conflict and treaty with Seleucus, followed by the arrival of Megasthenes as envoy, belong to Chandragupta\'s reign. Kalinga and the Nandas are different events.',
}));
Q('m_bindusara', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A family tree drawn by students of an imagined class shows three generations of Mauryan rulers. Which ruler stands in the middle, being the son of Chandragupta and the father of Ashoka?',
  opts: ['Bindusara', 'Seleucus Nikator', 'Kautilya', 'Mahendra'],
  sol: 'Bindusara ruled between Chandragupta and Ashoka. Seleucus was a Greek ruler, Kautilya a minister, and Mahendra is traditionally named as a son of Ashoka.',
}));
Q('m_dates_scenario', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A museum label at the imagined Anandpur Heritage Centre gives Ashoka\'s reign as about 268 to 232 BCE. About how many years did he rule?',
  opts: ['About 36 years', 'About 26 years', 'About 46 years', 'About 6 years'],
  sol: 'Years before the common era count downwards, so 268 minus 232 gives about 36 years. The other options come from adding, miscounting or dropping a digit.',
}));
Q('ar_kings', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Chandragupta Maurya is regarded as the founder of the Mauryan Empire.',
  r: 'Megasthenes came to Pataliputra as an envoy of Seleucus Nikator.',
  sol: 'Both are true, but the visit of Megasthenes does not explain why Chandragupta is called the founder; that rests on his overthrow of the Nandas and the building of the empire.',
}));
Q('tf_seleucus', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The conflict between Chandragupta Maurya and Seleucus Nikator ended with a treaty.',
  sol: 'True. The war of about 305 to 303 BCE was settled by a treaty, after which Megasthenes came to Pataliputra.',
}));
Q('ord_kings', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these rulers in chronological order, earliest first.',
  items: ['The Nandas (overthrown)', 'Chandragupta Maurya', 'Bindusara', 'Ashoka'],
  sol: 'The Nandas, then Chandragupta, Bindusara and Ashoka.',
}));
Q('s_chandragupta', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two achievements of Chandragupta Maurya.',
  model: '1. He **overthrew the Nandas** and founded the Mauryan Empire in about 321 BCE.\n2. He **defeated Seleucus Nikator** in the north-west and made a **treaty** with him, after which Megasthenes came as envoy.',
  sol: 'Overthrew the Nandas; treaty with Seleucus.',
  scheme: [['Overthrew the Nandas, founded the empire', 1], ['Conflict and treaty with Seleucus', 1]],
}));
Q('s_treaty', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined student says the treaty with Seleucus Nikator was a sign of weakness. Give two points showing how the settlement helped Chandragupta Maurya.',
  model: 'The treaty ended the war on the **north-western frontier** and left the empire **secure** in that region. It also brought a **Greek envoy**, Megasthenes, to Pataliputra, so Mauryan power was **recognised abroad**.',
  sol: 'Secure frontier; recognition abroad.',
  scheme: [['Security of the north-west frontier', 1], ['Recognition: envoy at Pataliputra', 1]],
}));
Q('s3_rulers', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the three major Mauryan rulers in order and give the approximate reign of each.',
  model: '1. **Chandragupta Maurya**, about 321 to 297 BCE, the founder of the empire.\n2. **Bindusara**, about 297 to 273 BCE, the son of Chandragupta, who held the empire together.\n3. **Ashoka**, about 268 to 232 BCE, the grandson of Chandragupta. Dates are approximate and vary between books.',
  sol: 'Three rulers with reigns.',
  scheme: [['Chandragupta with reign', 1], ['Bindusara with reign', 1], ['Ashoka with reign', 1]],
}));

// ================================================================ t03 Administration
Q('m_king_role', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In an imagined role-play of the Mauryan court, one student plays the king. Which description of his position best fits the Mauryan system?',
  opts: [
    'He was at the centre of the government and was helped by a council of ministers and many officials',
    'He had no officials and decided every village matter himself',
    'He was chosen every year by the people of Pataliputra',
    'He was only a priest with no control over the army',
  ],
  sol: 'The king stood at the centre of a large administration of ministers and officials. He did not do everything alone, was not chosen yearly, and controlled the army.',
}));
Q('m_samaharta', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined office chart at a school exhibition, a card reads: "I am in charge of collecting the revenue of the empire." Which Mauryan official does the card represent?',
  opts: ['The samaharta', 'The sannidhata', 'The kumara', 'The mantri'],
  sol: 'The samaharta was the chief revenue official, while the sannidhata kept the treasury. A kumara was a prince who governed a province, and a mantri was a minister.',
}));
Q('m_province_head', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined heritage trail says: "At Ujjain, a royal prince governed on behalf of the emperor." Which title is commonly taught for such a provincial governor?',
  opts: ['Kumara', 'Samaharta', 'Gramani', 'Dhamma-mahamatta'],
  sol: 'Provinces were commonly ruled by princes called kumaras. A samaharta handled revenue, a gramani headed a village in the Vedic age, and Dhamma-mahamattas were officers of Ashoka\'s Dhamma.',
}));
Q('m_city_board', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined traveller writes that Pataliputra was run by a board of thirty members divided into equal committees of five. How many committees did the board have?',
  opts: ['Six', 'Five', 'Three', 'Ten'],
  sol: 'Thirty members in committees of five make six committees. Five is the size of each committee, and three and ten do not divide thirty into groups of five.',
}));
Q('m_central_analysis', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A student in an imagined debate asks why the Mauryas could govern an empire stretching across much of the subcontinent. Which answer is the strongest?',
  opts: [
    'A network of officials from the king down to provinces, districts and villages, with revenue, an army and spies to keep him informed',
    'Every village chose its own ruler without reference to the king',
    'The empire had no army and no officials',
    'The king stayed in one village and sent no orders',
  ],
  sol: 'Layers of officials, a revenue system, an army and spies allowed orders and information to travel. The other options describe rule without a central system.',
}));
Q('ar_central', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Mauryan administration is often described as highly organised.',
  r: 'It had the king at the centre, a council of ministers, officials for revenue and the treasury, governors for provinces and a board for the capital.',
  sol: 'Both are true. The layers of officials listed in the reason are exactly what make the administration organised.',
}));
Q('ord_admin', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these levels of Mauryan government from the centre outwards.',
  items: ['The king and council of ministers', 'Province under a kumara', 'District', 'Village'],
  sol: 'King and ministers, province, district, village.',
}));
Q('mt_admin', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each term of Mauryan administration with its meaning.',
  pairs: [
    ['Mantriparishad', 'Council of ministers'],
    ['Samaharta', 'Chief of revenue collection'],
    ['Sannidhata', 'Keeper of the treasury'],
    ['Kumara', 'Prince ruling a province'],
  ],
  sol: 'Mantriparishad is the council of ministers, samaharta the revenue official, sannidhata the treasury keeper, and kumara a provincial prince.',
}));
Q('s_ministers', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the position of the king and the work of the ministers in the central administration of the Mauryas.',
  model: 'The **king** stood at the **centre** of the government and had the final authority. A **council of ministers (mantriparishad)** advised him, and officials such as the **samaharta** and **sannidhata** carried out the work of revenue and treasury.',
  sol: 'King at the centre; ministers and officials.',
  scheme: [['King at the centre with authority', 1], ['Council of ministers and officials', 1]],
}));
Q('s_prov', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'How were the provinces of the Mauryan Empire governed? Name two provincial capitals.',
  model: 'Provinces were commonly governed by **princes called kumaras**, on behalf of the emperor, and were divided into **districts and villages**. Capitals included **Taxila**, **Ujjain**, **Tosali** and **Suvarnagiri**.',
  sol: 'Princes; two capitals.',
  scheme: [['Provinces under kumaras; districts and villages', 1], ['Two capitals named', 1]],
}));
Q('s3_pataliputra', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined traveller says the capital, Pataliputra, had a board of thirty members. Describe the board and state two matters its committees looked after, as reported from Megasthenes.',
  model: '1. The city was run by a **board of thirty members** in **six committees of five**.\n2. One committee looked after **crafts and trade**.\n3. Another looked after matters such as **foreigners** or **births and deaths**. This account comes from the report of **Megasthenes** and is paraphrased.',
  sol: 'Board of thirty; two matters.',
  scheme: [['Board of thirty, six committees of five', 1], ['First matter', 1], ['Second matter', 1]],
}));
Q('s3_admin_levels', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain, in three points, how the Mauryas kept control of so large an empire.',
  model: '1. A **council of ministers** and officials such as the **samaharta** ran revenue and the treasury.\n2. **Provinces** under princes were divided into **districts and villages**, passing orders downwards.\n3. **Spies** reported on officials and a large **army** protected the empire.',
  sol: 'Ministers and officials; provinces; spies and army.',
  scheme: [['Ministers and officials', 1], ['Provinces, districts, villages', 1], ['Spies and army', 1]],
}));

// ================================================================ t04 Dhamma: principles
Q('m_kalinga_cause', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A student in an imagined classroom quiz is asked which event of about 261 BCE is linked with Ashoka\'s change of policy. What should the student answer?',
  opts: ['The Kalinga War', 'The treaty with Seleucus', 'The overthrow of the Nandas', 'The building of Sanchi'],
  sol: 'The Kalinga War of about 261 BCE is linked with Ashoka\'s adoption of Dhamma. The treaty with Seleucus and the overthrow of the Nandas belong to Chandragupta, and Sanchi was a monument.',
}));
Q('m_kalinga_turn', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'An imagined museum guide says, "Ashoka wrote that he felt deep sorrow for the suffering that followed the war in Kalinga." What did this change in his policy?',
  opts: [
    'He turned from expanding the empire by war to promoting Dhamma, a code of right conduct',
    'He gave up the throne and left no government behind',
    'He destroyed all the places of worship in Kalinga',
    'He began a new war in the north-west',
  ],
  sol: 'The edicts say that remorse led Ashoka to stress Dhamma and conquest by moral means instead of war. He did not give up the throne, harm places of worship, or start a new war.',
}));
Q('m_dhamma_meaning', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A teacher in an imagined Class IX lesson explains Ashoka\'s Dhamma. Which description would most scholars accept?',
  opts: [
    'A moral code of conduct meant for people of all sects, rather than a separate new religion',
    'A new religion founded to replace every other faith',
    'A tax collected from every household',
    'A military order for the army',
  ],
  sol: 'Most historians describe Dhamma as an ethical code addressed to all communities. It was not a tax or a military order, and it is not usually described as a separate religion.',
}));
Q('m_dhamma_tolerance', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In an imagined village, followers of two different sects quarrel over a festival ground. A royal officer urges both groups to respect one another\'s beliefs. Which principle of Dhamma is he promoting?',
  opts: ['Tolerance of all sects', 'Conquest by war', 'Collection of revenue', 'Training of spies'],
  sol: 'Respect for the beliefs of others is the principle of tolerance. War, revenue and spying are not principles of Dhamma.',
}));
Q('m_nonviolence', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In an imagined town square, a notice carved on stone asks people not to harm certain animals needlessly. Which principle of Ashoka\'s Dhamma does it show?',
  opts: ['Non-violence', 'Respect for elders and teachers', 'Kindness to servants', 'Tolerance of sects'],
  sol: 'Avoiding needless harm to living beings is non-violence. The other principles are real parts of Dhamma but concern elders, servants and other sects.',
}));
Q('m_elders', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A farmer in an imagined story listens carefully to his grandmother and treats his farmhands kindly. Which two principles of Dhamma does he follow?',
  opts: [
    'Respect for elders and kindness to servants',
    'Conquest of neighbours and collection of tribute',
    'Spying on officials and building roads',
    'Worship of kings and rejection of all other sects',
  ],
  sol: 'Respecting elders and being kind to servants are two Dhamma principles. The other pairs are not principles of Dhamma.',
}));
Q('m_mahamatta', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined museum card says: "These officers travelled among the people to explain right conduct and to look after the welfare of people of all sects." Which officers are described?',
  opts: ['Dhamma-mahamattas', 'Kumaras', 'Spies', 'Soldiers of the Greek army'],
  sol: 'Ashoka appointed Dhamma-mahamattas to spread Dhamma and look after welfare. Kumaras governed provinces, spies gathered information, and the Greek army was not Mauryan.',
}));
Q('ar_dhamma', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Ashoka gave great importance to Dhamma after the Kalinga War.',
  r: 'The edicts record his sorrow at the suffering caused by the war.',
  sol: 'Both are true, and the reason explains the assertion: his sorrow about the suffering led him to promote Dhamma.',
}));
Q('ar_dhamma_all', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Ashoka\'s Dhamma was addressed to people of all sects.',
  r: 'Dhamma ordered every subject to give up their own faith and follow one religion.',
  sol: 'A is true: Dhamma urged tolerance and conduct that all could share. R is false: it did not require anyone to abandon their own faith.',
}));
Q('tf_dhamma_religion', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Historians agree that Ashoka\'s Dhamma was a separate new religion that he forced his subjects to adopt.',
  sol: 'False. The view commonly taught is that Dhamma was a moral code for people of all faiths, and it was not forced on anyone as a new religion.',
}));
Q('fb_kalinga', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The Kalinga War was fought in about ___ BCE.',
  acc: [['261']],
  sol: 'The Kalinga War is dated to about 261 BCE.',
}));
Q('mt_dhamma', match({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined action with the principle of Dhamma it shows.',
  pairs: [
    ['A shopkeeper invites neighbours of every faith to his shop opening', 'Tolerance of all sects'],
    ['A hunter spares the animals of a forest pool', 'Non-violence'],
    ['A student bows to her teacher on entering the class', 'Respect for elders and teachers'],
    ['A landowner gives his farmhands a rest day', 'Kindness to servants'],
  ],
  sol: 'The invitation shows tolerance, sparing animals non-violence, bowing to the teacher respect for teachers, and the rest day kindness to servants.',
}));
Q('s_kalinga', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the Kalinga War influence Ashoka? Give two points.',
  model: 'The war caused great **suffering**, and the edicts record Ashoka\'s **remorse**. He then gave up **conquest by war** and began to promote **Dhamma**, a policy of moral conduct and welfare.',
  sol: 'Remorse at suffering; turn to Dhamma.',
  scheme: [['Suffering of the war and his remorse', 1], ['Turn from war to Dhamma', 1]],
}));
Q('s_principles', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any four principles of Ashoka\'s Dhamma.',
  model: 'Four principles were **tolerance of all sects**, **non-violence**, **respect for elders and teachers** and **kindness to servants**. Care for the **welfare** of people and animals was also taught.',
  sol: 'Any four principles.',
  scheme: [['Two principles named', 1], ['Two more principles named', 1]],
}));
Q('s_dhamma_view', short({
  t: 4, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Some students call Dhamma "Ashoka\'s own religion". Why do many historians prefer to call it a moral code?',
  model: 'Dhamma set out **common principles of conduct** such as tolerance and kindness for **people of all sects**. It did not set up a **new faith** or ask people to give up their own, so many historians call it a **moral code**.',
  sol: 'Common conduct for all; no new faith.',
  scheme: [['Common principles for people of all sects', 1], ['No new faith or rejection of other beliefs', 1]],
}));
Q('s3_dhamma', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three principles of Ashoka\'s Dhamma, with one line on each.',
  model: '1. **Tolerance:** respect for the beliefs of all sects.\n2. **Non-violence:** avoiding needless harm to people and animals.\n3. **Respect and kindness:** reverence for elders and teachers and kind treatment of servants.',
  sol: 'Three principles explained.',
  scheme: [['Tolerance explained', 1], ['Non-violence explained', 1], ['Respect and kindness explained', 1]],
}));
Q('s3_kalinga_edict', short({
  t: 4, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined student says the edicts show only victories. Using the Kalinga War, explain in three points how that is not so.',
  model: '1. The edicts tell of the **Kalinga War** of about 261 BCE.\n2. They describe the **suffering** it caused and Ashoka\'s **remorse**.\n3. They show that he then chose **Dhamma** over further conquest, so they record a **change of heart**, not only victory.',
  sol: 'War; remorse; Dhamma.',
  scheme: [['Kalinga War recorded', 1], ['Suffering and remorse', 1], ['Choice of Dhamma', 1]],
}));

// ================================================================ t05 Impact
Q('m_welfare', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'On an imagined study tour, students pass a road shaded by trees with a well and a rest-house at intervals, and are told it follows a Mauryan model. Which feature of Ashoka\'s rule does it illustrate?',
  opts: ['Welfare measures for travellers and people', 'Tax collection by spies', 'War against Kalinga', 'Rule by a Greek governor'],
  sol: 'Shaded roads, wells and rest-houses are the welfare measures recorded for Ashoka. The other options do not describe such facilities.',
}));
Q('m_mission', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'Which pair is traditionally named as carrying the Buddhist message to Sri Lanka in Ashoka\'s time?',
  opts: ['Mahendra and Sanghamitra', 'Chandragupta and Bindusara', 'Kautilya and Megasthenes', 'Seleucus and Prinsep'],
  sol: 'Mahendra and Sanghamitra are traditionally named as the missionaries to Sri Lanka. The other pairs are rulers, an author and an envoy, and a Greek ruler and a scholar.',
}));
Q('m_council', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'A guide at an imagined Buddhist heritage centre mentions that the Third Buddhist Council was held in Ashoka\'s reign. In which city was it held?',
  opts: ['Pataliputra', 'Taxila', 'Ujjain', 'Tosali'],
  sol: 'The Third Buddhist Council is traditionally held at Pataliputra. The other cities were provincial capitals.',
}));
Q('m_emblem', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A student in an imagined museum finds a model of a pillar topped by four lions, found at Sarnath. Which statement about it is correct?',
  opts: [
    'It is the Lion Capital of Sarnath, the source of the national emblem of India',
    'It is the gateway of Sanchi, written in Greek',
    'It is the board of thirty of Pataliputra',
    'It is the treaty with Seleucus Nikator',
  ],
  sol: 'The Sarnath Lion Capital is a pillar top from Ashoka\'s time, and India\'s national emblem is based on it. The other options are unrelated.',
}));
Q('m_admin_impact', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Which statement best shows how Dhamma affected Ashoka\'s administration?',
  opts: [
    'Officers such as the Dhamma-mahamattas were appointed to spread right conduct and look after the welfare of all sects',
    'The administration was closed and no orders were issued',
    'Dhamma ended all government and the army',
    'Revenue collection was handed to Greek envoys',
  ],
  sol: 'Special officers and welfare work show Dhamma shaping administration. The other options misstate the facts.',
}));
Q('m_weak_debate', mcq({
  t: 5, d: 4, c: 'evaluation',
  stem: 'An imagined seminar notes that the Mauryan Empire declined after Ashoka. Which statement is the most balanced?',
  opts: [
    'Some historians link the decline to his policies, while others point to weak successors, a vast empire and other causes',
    'All historians agree that Dhamma alone destroyed the empire',
    'The empire was never weakened',
    'The empire fell on the day Ashoka died',
  ],
  sol: 'The causes of decline are debated: some historians link it to Ashoka\'s policies, others stress other causes. Saying one cause is agreed, denying decline or fixing it to one day is not balanced.',
}));
Q('ar_welfare', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Ashoka\'s rule is remembered for its welfare measures.',
  r: 'The edicts record roads, wells, rest-houses and care for people and animals.',
  sol: 'Both are true, and the reason explains the assertion: these recorded measures are what is remembered as his welfare policy.',
}));
Q('ar_buddhism', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Buddhism spread beyond India during the time of Ashoka.',
  r: 'Missions, including that of Mahendra and Sanghamitra to Sri Lanka, were sent abroad.',
  sol: 'Both are true. The missions carried Buddhism overseas and so explain its spread.',
}));
Q('ar_weak', ar({
  t: 5, d: 4, c: 'evaluation', verdict: 'A-true-R-false',
  a: 'Some historians link the later weakening of the Mauryan Empire to Ashoka\'s policies.',
  r: 'All historians agree that these policies were the only cause of the decline.',
  sol: 'A is true: it is one debated view. R is false: other historians point to causes such as weak successors, the size of the empire and pressure on revenue.',
}));
Q('fb_sarnath', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The Lion Capital that gave India its national emblem was found at ___.',
  acc: [['Sarnath', 'sarnath']],
  sol: 'The Lion Capital was found at Sarnath.',
}));
Q('s_welfare', short({
  t: 5, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two welfare measures taken by Ashoka.',
  model: '1. He had **roads** built with shade trees, **wells** and **rest-houses** for travellers.\n2. He arranged care for **people and animals**, such as medical help and the growing of medicinal plants.',
  sol: 'Two measures.',
  scheme: [['Roads, wells or rest-houses', 1], ['Care for people and animals', 1]],
}));
Q('s_buddhism', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did Ashoka help the spread of Buddhism?',
  model: 'He supported the **Buddhist Sangha**, built **stupas** and held the **Third Buddhist Council** at Pataliputra. He sent **missions**, including **Mahendra and Sanghamitra** to Sri Lanka, to carry the message abroad.',
  sol: 'Patronage; missions.',
  scheme: [['Patronage: stupas or the Council', 1], ['Missions including Sri Lanka', 1]],
}));
Q('s_emblem', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined school poster shows India\'s national emblem. Name the Mauryan monument it is based on and say where it was found.',
  model: 'It is based on the **Lion Capital**, a pillar top from Ashoka\'s time. It was found at **Sarnath**, near Varanasi, and shows **four lions** standing back to back.',
  sol: 'Lion Capital; Sarnath.',
  scheme: [['Lion Capital named', 1], ['Sarnath as the place', 1]],
}));
Q('s3_impact', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the impact of Dhamma on administration, on Buddhism and on culture, one point each.',
  model: '1. **Administration:** Dhamma-mahamattas were appointed and officials were asked to look after the **welfare** of the people.\n2. **Buddhism:** royal support, missions and the Third Buddhist Council helped it **spread**.\n3. **Culture:** **stupas** and **pillars** such as the Lion Capital of Sarnath were built.',
  sol: 'Three impacts.',
  scheme: [['Administration', 1], ['Buddhism', 1], ['Culture', 1]],
}));
Q('s3_weakening', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Give three reasons offered by different historians for the weakening of the Mauryan Empire after Ashoka, and say why they are debated.',
  model: '1. Some link it to **Ashoka\'s policies**, such as a lessened stress on military power.\n2. Others point to **weak successors** and the **size** of the empire.\n3. Others cite **pressure on revenue**. They are **debated** because the evidence is limited and historians read it in different ways.',
  sol: 'Three reasons and the caution.',
  scheme: [['Ashoka\'s policies', 1], ['Weak successors or size', 1], ['Another cause and why debated', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sources', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Four main sources help us to study the Mauryan Empire.\n\n(i) Name the four sources. **[3]**\n(ii) Who wrote the Arthashastra and the Indika, and what does each tell us? **[3]**\n(iii) Explain why the Ashokan Edicts and the Sanchi Stupa are important. **[4]**',
  model: '(i) The four sources are the **Arthashastra**, the **Indika**, the **Ashokan Edicts** and the **Sanchi Stupa**.\n\n(ii) The **Arthashastra** is attributed to **Kautilya** (Chanakya), minister of Chandragupta, and tells us how a state was expected to be governed. The **Indika** was written by **Megasthenes**, a Greek envoy, and describes Pataliputra and the court as a foreigner saw them.\n\n(iii) The **edicts** were issued by Ashoka himself, carved on rocks and pillars, and record his **Dhamma**, the **Kalinga War** and welfare measures in his own words. The **Sanchi Stupa**, begun under Ashoka and enlarged later, shows **Buddhist art and belief** through its carved gateways.',
  sol: 'Four sources; authors and uses; importance of edicts and Sanchi.',
  scheme: [['(i) Four sources named', 3], ['(ii) Arthashastra: author and use', 1.5], ['(ii) Indika: author and use', 1.5], ['(iii) Importance of the edicts', 2], ['(iii) Importance of Sanchi', 2]],
}));
Q('l_rulers', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Mauryan Empire was built and ruled by three major kings.\n\n(i) List the three kings in order with approximate reigns. **[3]**\n(ii) Describe the achievements of Chandragupta Maurya. **[3]**\n(iii) Explain why Ashoka is remembered more than the other two rulers. **[4]**',
  model: '(i) **Chandragupta Maurya**, about 321 to 297 BCE; **Bindusara**, about 297 to 273 BCE; **Ashoka**, about 268 to 232 BCE. Dates vary between books.\n\n(ii) Chandragupta **overthrew the Nandas** and founded the empire. He fought **Seleucus Nikator** in the north-west and made a **treaty** with him, and the envoy **Megasthenes** came to Pataliputra.\n\n(iii) Ashoka is remembered for the **Kalinga War** and his turn to **Dhamma**. He issued **edicts** that survive in stone, set up **pillars** and **stupas**, supported **Buddhism** and organised **welfare**. Because his own words survive, we know more about him than about his predecessors.',
  sol: 'Rulers with reigns; achievements of Chandragupta; why Ashoka is remembered.',
  scheme: [['(i) Three rulers in order', 1.5], ['(i) Approximate reigns', 1.5], ['(ii) Overthrow of the Nandas', 1.5], ['(ii) Seleucus, treaty, envoy', 1.5], ['(iii) Kalinga and Dhamma', 2], ['(iii) Edicts and monuments', 2]],
}));
Q('l_admin', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Mauryas governed their empire through a well-organised administration.\n\n(i) Describe the position of the king and the council of ministers. **[3]**\n(ii) How were the provinces and districts governed? **[3]**\n(iii) Describe the administration of Pataliputra, and say how spies and the army helped the king. **[4]**',
  model: '(i) The **king** was at the **centre** of the government with the final authority. A **council of ministers (mantriparishad)** advised him, and officials such as the **samaharta** (revenue) and the **sannidhata** (treasury) carried out the work.\n\n(ii) **Provinces** were governed by **princes called kumaras**, with capitals such as **Taxila, Ujjain, Tosali** and **Suvarnagiri**. Provinces were divided into **districts and villages**, so orders reached the countryside.\n\n(iii) As reported from Megasthenes, **Pataliputra** was run by a **board of thirty** in **six committees of five**, looking after matters such as crafts, trade and foreigners. **Spies** reported to the king on officials and enemies, and a large **army** defended the empire and kept order.',
  sol: 'King and ministers; provinces and districts; Pataliputra, spies and army.',
  scheme: [['(i) King at the centre', 1], ['(i) Ministers and officials', 2], ['(ii) Provinces under kumaras with capitals', 2], ['(ii) Districts and villages', 1], ['(iii) Board of thirty in six committees', 2], ['(iii) Spies and army', 2]],
}));
Q('l_kalinga', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Kalinga War marked a turning point in the reign of Ashoka.\n\n(i) When was the war fought and what do the edicts say about its effect on Ashoka? **[3]**\n(ii) State any three principles of his Dhamma. **[3]**\n(iii) Explain how Dhamma was a moral code for all and not a new religion, and how officers helped to spread it. **[4]**',
  model: '(i) The war was fought in about **261 BCE**. The edicts describe the great **suffering** it caused and Ashoka\'s **remorse**, after which he turned away from conquest by war.\n\n(ii) Three principles were **tolerance of all sects**, **non-violence** and **respect for elders and teachers**. Kindness to servants and the welfare of people and animals were also taught.\n\n(iii) Dhamma set out **common conduct** that people of every faith could follow and did not ask anyone to give up their own beliefs, so many historians call it a **moral code**, not a separate religion. Ashoka appointed **Dhamma-mahamattas** who travelled among the people, explained right conduct and looked after the welfare of all sects.',
  sol: 'Kalinga and its effect; three principles; moral code and the Dhamma-mahamattas.',
  scheme: [['(i) Date of the war', 1], ['(i) Suffering, remorse and change', 2], ['(ii) Three principles', 3], ['(iii) A moral code, not a new religion', 2], ['(iii) Dhamma-mahamattas', 2]],
}));
Q('l_dhamma', long({
  t: 4, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined class prepares a wall display on Ashoka\'s Dhamma.\n\n(i) What was Dhamma, and which event led Ashoka to adopt it? **[3]**\n(ii) Give four principles of Dhamma, with an everyday example of any one. **[3]**\n(iii) The display says, "Dhamma was only a personal belief of the king." Explain why this is incomplete, with two points. **[4]**',
  model: '(i) **Dhamma** was a code of **right conduct**, not a separate religion according to most historians. The **Kalinga War** of about 261 BCE and the sorrow it caused led Ashoka to adopt it.\n\n(ii) Four principles were **tolerance**, **non-violence**, **respect for elders and teachers** and **kindness to servants**. For example, a student who listens respectfully to a teacher shows respect for teachers.\n\n(iii) The statement is incomplete because Ashoka made Dhamma a **policy of the state**: he appointed **Dhamma-mahamattas** to spread it and look after welfare, and he had it announced in **edicts** carved on rocks and pillars across his empire. It was therefore a public policy as well as a personal conviction.',
  sol: 'What Dhamma was and why adopted; four principles and an example; why the display is incomplete.',
  scheme: [['(i) Meaning of Dhamma', 1.5], ['(i) Kalinga as the cause', 1.5], ['(ii) Four principles', 2], ['(ii) One everyday example', 1], ['(iii) State policy and officers', 2], ['(iii) Edicts announcing it', 2]],
}));
Q('l_impact', long({
  t: 5, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Ashoka\'s Dhamma had effects on the empire and beyond.\n\n(i) Describe its effects on administration and on the welfare of the people. **[3]**\n(ii) Explain its effects on the spread of Buddhism and on culture. **[3]**\n(iii) Evaluate: some historians say Dhamma weakened the empire, but others disagree. Present both views. **[4]**',
  model: '(i) **Dhamma-mahamattas** were appointed, officials were asked to treat the people fairly, and **welfare** measures such as shaded roads, wells, rest-houses and care for animals were undertaken.\n\n(ii) Royal support, the **Third Buddhist Council** at Pataliputra and **missions** such as that of **Mahendra and Sanghamitra** to Sri Lanka helped **Buddhism** to spread. **Stupas** such as Sanchi, **pillars** such as the Lion Capital of Sarnath (the basis of India\'s national emblem) and the **edicts** left a lasting mark on culture.\n\n(iii) Some historians argue that stressing Dhamma and non-violence reduced the **military strength** of the empire. Others point to **weak successors**, the **size** of the empire and **financial strain** as the main causes. Because the evidence is limited, the question remains **debated**.',
  sol: 'Administration and welfare; Buddhism and culture; two views on decline.',
  scheme: [['(i) Administration', 1.5], ['(i) Welfare', 1.5], ['(ii) Spread of Buddhism', 1.5], ['(ii) Cultural effects', 1.5], ['(iii) One view with reason', 2], ['(iii) The other view and why debated', 2]],
}));
Q('l_weigh', long({
  t: [1, 5], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student in an imagined debate says: "We should trust the edicts more than any other source, because the king himself spoke in them."\n\n(i) Name two other sources of Mauryan history besides the edicts. **[3]**\n(ii) State two things the edicts tell us about Ashoka. **[3]**\n(iii) Evaluate the student\'s view: how far is it fair, and how should a historian use the edicts? **[4]**',
  model: '(i) Two other sources are the **Arthashastra** (attributed to Kautilya) and the **Indika** (Megasthenes); the **Sanchi Stupa** is a third.\n\n(ii) The edicts tell us of the **Kalinga War** and Ashoka\'s **remorse**, and of his **Dhamma**, with its principles and welfare measures.\n\n(iii) The view is **partly fair**: the edicts are **direct** and carved in stone, so they preserve his words and were not changed by later writers. But they are **royal messages**, so they present the king\'s own aims and say little about ordinary lives, the army or the empire\'s weaknesses. A historian therefore reads them **together with** other sources, such as the Indika and the Arthashastra, and notes what each can and cannot show.',
  sol: 'Other sources; what edicts tell; balanced evaluation.',
  scheme: [['(i) Two sources named', 3], ['(ii) Two things from the edicts', 3], ['(iii) Why partly fair', 2], ['(iii) How to use the edicts', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_letter', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined traveller's letter and answer the questions that follow. ${IMAG}`,
  passage: '**A page from an imagined letter written by Eudoros, a made-up visitor to Pataliputra**\n\nThe city is large and busy. Its affairs are managed by a board of thirty men, divided into equal groups of five. One group watches over craftworkers and the quality of goods; another registers foreigners such as myself and sees that we are safe; a third records births and deaths. I am told the king keeps many informants who report on officials. I cannot judge how all this works, for I am a stranger and see only a part of it.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which group of the board looks after foreigners such as Eudoros?', model: 'The group that **registers foreigners** and sees that they are safe.', sol: 'The group for foreigners.', scheme: [['Group for foreigners', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'How many groups does the board have, according to the letter?', model: '**Six** groups, since thirty members in groups of five make six.', sol: 'Six.', scheme: [['Six', 1]] })),
    child('c', short({ t: [1, 3], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give one reason why a historian should read this letter with care.', model: 'Eudoros is a **stranger** who says he sees only **part** of what happens, so his report may be **incomplete** or a **misunderstanding**.', sol: 'Foreign, partial view.', scheme: [['Foreign observer or partial view', 1], ['Why that limits the evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name a real work of this kind and its author, and say how it survives.', model: 'The **Indika** by **Megasthenes**, a Greek envoy. It does not survive complete: it is known from **quotations** in later Greek and Roman writers.', sol: 'Indika; Megasthenes; survives in quotations.', scheme: [['Indika and Megasthenes', 1], ['Survives through quotations', 1]] }),
    ]),
  ],
}));
Q('sb_guide', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined museum guide notes and answer the questions that follow. ${IMAG}`,
  passage: '**Guide notes for the model pillar in the Heritage Gallery of an imagined museum**\n\nAfter a terrible war in the east, the ruler felt great sorrow and gave up conquest by arms. He had his messages carved on stone pillars: people should respect their elders, treat servants kindly and honour the beliefs of every sect. Special officers travelled among the people to explain this code. Roads were planted with shade trees, and wells and rest-houses were set up for travellers.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the war to which the notes refer.', model: 'The **Kalinga War**, about 261 BCE.', sol: 'Kalinga War.', scheme: [['Kalinga War', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'recall', marks: 1, stem: 'What are the "special officers" called?', model: '**Dhamma-mahamattas**.', sol: 'Dhamma-mahamattas.', scheme: [['Dhamma-mahamattas', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name two principles of Dhamma found in the notes.', model: '**Respect for elders** and **kindness to servants**; also **tolerance** of the beliefs of every sect.', sol: 'Any two principles.', scheme: [['First principle', 1], ['Second principle', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name two welfare measures mentioned in the notes.', model: '**Shade trees** along the roads and **wells and rest-houses** for travellers.', sol: 'Two measures.', scheme: [['First measure', 1], ['Second measure', 1]] }),
    ]),
  ],
}));
Q('sb_report', source({
  t: [1, 5], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined school report and answer the questions that follow. ${IMAG}`,
  passage: '**Heritage Week report in the imagined newsletter of Vidya Sagar School**\n\nClass IX visited the stupa at Sanchi in Madhya Pradesh. The guide told us that the stupa was begun in the time of Ashoka and enlarged later, and that the carved gateways were added much later than his reign. Back in class a student asked whether the empire weakened because of Ashoka\'s policies. Our teacher said that some historians think so, while others stress other causes, and that we must weigh the evidence.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'In which state is the stupa visited by Class IX?', model: '**Madhya Pradesh**.', sol: 'Madhya Pradesh.', scheme: [['Madhya Pradesh', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'According to the guide, were the carved gateways built at the same time as the stupa? Answer in one line.', model: 'No: the stupa was begun under Ashoka but the **gateways were added much later**.', sol: 'No, added later.', scheme: [['Added later', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why did the teacher ask students to "weigh the evidence" about the weakening of the empire?', model: 'Because the **causes are debated**. Some historians blame **Ashoka\'s policies**, others **weak successors** or the **size** of the empire, so a student should compare the views.', sol: 'Debated causes; compare views.', scheme: [['The question is debated', 1], ['Compare different explanations', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Give two reasons why Sanchi is useful as a source of history.', model: 'It shows **Buddhist art and belief** through its carvings, and it was **begun under Ashoka**, showing his **patronage** of Buddhism.', sol: 'Art and belief; patronage.', scheme: [['Art and belief', 1], ['Begun under Ashoka', 1]] }),
    ]),
  ],
}));
