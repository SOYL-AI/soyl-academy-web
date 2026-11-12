// Build CBSE 12 History ch11 Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond.
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch11', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Helpers: a table or a flow with an alt text built from its own content.
const tb = (headers, rows, caption) => table(headers, rows, `Table, ${caption}. ${rows.map((r) => r.join(': ')).join('; ')}`, caption);
const fl = (labels, caption) => flow('LR', labels, `Flow chart, ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(700, 440);
  const X = (y) => 250 + ((y - 1913) / 36) * 430;
  const AX = 410;
  for (let yr = 1915; yr <= 1945; yr += 5) s.line(X(yr), 8, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(244, AX, 690, AX, { sw: 1.8 });
  for (let yr = 1915; yr <= 1945; yr += 5) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 11, muted: true });
  }
  const lane = (i, name) => {
    const y = 22 + i * 28;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    return y;
  };
  const dot = (i, name, yr, label, side = 'right') => {
    const y = lane(i, name);
    s.dot(X(yr), y, 5, 'accent');
    if (side === 'right') s.text(X(yr) + 12, y, label, { anchor: 'start', size: 12 });
    else s.text(X(yr) - 12, y, label, { anchor: 'end', size: 12 });
  };
  const bar = (i, name, a, b, label, side = 'right') => {
    const y = lane(i, name);
    s.rect(X(a), y - 7, Math.max(X(b) - X(a), 5), 14, { rx: 3, fill: 'fill', color: 'accent', sw: 1.6 });
    if (side === 'right') s.text(X(b) + 10, y, label, { anchor: 'start', size: 12 });
    else s.text(X(a) - 10, y, label, { anchor: 'end', size: 12 });
  };
  dot(0, 'Gandhi returns to India', 1915, '1915');
  bar(1, 'Champaran, Kheda, Ahmedabad', 1917, 1918, '1917 to 1918');
  dot(2, 'Jallianwala Bagh', 1919, '1919');
  bar(3, 'Non-Cooperation', 1920, 1922, '1920 to 1922');
  dot(4, 'Lahore session: purna swaraj', 1929, '1929');
  dot(5, 'Dandi March', 1930, '1930');
  dot(6, 'Gandhi-Irwin Pact', 1931, '1931');
  dot(7, 'Poona Pact', 1932, '1932');
  dot(8, 'Congress wins 8 of 11 provinces', 1937, '1937');
  bar(9, 'Quit India', 1942, 1944, '1942 to 1944', 'left');
  dot(10, 'Cabinet Mission, Direct Action Day', 1946, '1946', 'left');
  dot(11, 'Transfer of power', 1947, '1947', 'left');
  dot(12, 'Gandhi assassinated', 1948, '1948', 'left');
  s.text(350, 436, 'Years CE. Bars show spans and dots show single events.', { size: 12, muted: true });
  return s.visual('Timeline from 1915 to 1948 CE in thirteen rows: Gandhi returns to India in 1915; Champaran, Kheda and Ahmedabad in 1917 and 1918; Jallianwala Bagh in 1919; Non-Cooperation from 1920 to 1922; the Lahore session declaring purna swaraj in 1929; the Dandi March in 1930; the Gandhi-Irwin Pact in 1931; the Poona Pact in 1932; the Congress winning eight of eleven provinces in 1937; Quit India from 1942 to 1944; the Cabinet Mission and Direct Action Day in 1946; the transfer of power in 1947; and Gandhi assassinated in 1948', 'The chapter in time');
})();

const vSourceKinds = (() => {
  const s = new Svg(700, 330);
  const rows = [
    ['Speech or article', 'Made for: a public audience or readers', 'Watch for: a public script, chosen to persuade'],
    ['Private letter', 'Made for: one reader, often a colleague', 'Watch for: some were written knowing they might be printed'],
    ['Autobiography', 'Made for: readers, years after the events', 'Watch for: memory and purpose shape what is told'],
    ['Police report', 'Made for: officials, in secret', 'Watch for: the officials\' fears; events sometimes misread'],
    ['Newspaper', 'Made for: its own readers', 'Watch for: the paper\'s politics shapes what it reports'],
  ];
  rows.forEach(([name, a, b], i) => {
    const y = 8 + i * 63;
    s.rect(14, y, 672, 55, { rx: 8, fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(30, y + 27, name, { anchor: 'start', bold: true, size: 14 });
    s.text(230, y + 17, a, { anchor: 'start', size: 12 });
    s.text(230, y + 38, b, { anchor: 'start', size: 12 });
  });
  return s.visual('Diagram of five rows, one for each kind of source about Gandhi. Speech or article: made for a public audience or readers, a public script chosen to persuade. Private letter: made for one reader, though some were written knowing they might be printed. Autobiography: made for readers years after the events, so memory and purpose shape it. Police report: made for officials in secret, reflecting their fears and sometimes misreading events. Newspaper: made for its own readers, with the paper\'s politics shaping what it reports', 'Five kinds of source, and what to watch for');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = fl(['Gandhi comes home', 'Local campaigns, 1917 to 1918', 'Non-Cooperation, 1920 to 1922', 'Civil Disobedience and the dialogues'], 'Part 1 at a glance');
const vHome = tb(['Question', 'Answer'], [['Where from', 'South Africa, after about two decades; satyagraha, non-violent resistance, first used there'], ['When', 'January 1915'], ['Then', 'A year travelling across British India, on the advice of Gokhale'], ['February 1916', 'Speech at the opening of Banaras Hindu University: criticised the Indian elite for neglecting the poor']], 'Gandhi comes home');
const vLocal = tb(['Place and year', 'Who', 'What was sought'], [['Champaran, Bihar, 1917', 'Indigo peasants', 'Security of tenure and freedom to cultivate crops of choice; secured'], ['Kheda, Gujarat, 1918', 'Peasants after a crop failure', 'Remission of revenue'], ['Ahmedabad, 1918', 'Textile mill workers', 'Better working conditions and a wage rise']], 'Three local campaigns');
const vRowlatt = tb(['Event', 'Detail'], [['Rowlatt Act, 1919', 'Allowed detention without trial; Gandhi called a countrywide hartal'], ['13 April 1919', 'Troops under General Dyer fired on an unarmed crowd at Jallianwala Bagh, Amritsar; hundreds killed, with estimates varying']], 'Rowlatt Act and Jallianwala Bagh');
const vNCM = tb(['Feature', 'Detail'], [['Years', '1920 to 1922'], ['Joined with', 'The Khilafat movement, to restore the Caliphate after the defeat of Ottoman Turkey; it brought Hindus and Muslims together'], ['Forms', 'Boycott of schools, colleges, law courts, government jobs and foreign cloth; surrender of titles'], ['Constructive work', 'Khadi and the charkha; Hindu-Muslim unity; ending untouchability']], 'The Non-Cooperation Movement');
const vGroups = tb(['Reading of the movement', 'Example'], [['Non-payment of taxes', 'Peasants'], ['Forest laws defied', 'Tribal groups'], ['Rumours of miraculous powers', 'Villagers of Gorakhpur, studied by the historian Shahid Amin'], ['Support from business', 'Businessmen such as G. D. Birla backed the Congress']], 'How groups understood the movement');
const vChauri = fl(['Chauri Chaura, February 1922', 'Gandhi calls off the movement', 'Arrest, March 1922', 'Six years for sedition; released in 1924 on health grounds'], 'The end of Non-Cooperation');
const vEx1 = tb(['Clue in an imagined leaflet', 'What it tells'], [['Urges a boycott of law courts and foreign cloth', 'The programme of 1920 to 1922'], ['Names a Khilafat committee as a partner', 'The alliance still in force'], ['Says nothing about salt or Dandi', 'Before 1930'], ['Conclusion', 'About 1920 to 1922']], 'Dating an undated leaflet');
const vSimon = tb(['Date', 'Event'], [['1928', 'The all-British Simon Commission is boycotted'], ['December 1929', 'Lahore session under Jawaharlal Nehru declares purna swaraj, complete independence'], ['26 January 1930', 'Celebrated as Independence Day']], 'From the Simon Commission to Lahore');
const vSalt = fl(['Letter to the Viceroy, Lord Irwin', '12 March 1930: sets out from the Sabarmati ashram', 'About 240 miles on foot', '6 April 1930: makes salt at Dandi'], 'The march to Dandi');
const vSpread = tb(['Form', 'Detail'], [['Salt', 'Made in defiance of the state monopoly in many places'], ['Forest laws', 'Broken'], ['Taxes', 'Withheld in some areas'], ['Foreign cloth', 'Boycotted'], ['Women', 'Took part widely'], ['The state', 'Gandhi arrested in May 1930; foreign newspapers carried reports']], 'How civil disobedience spread');
const vDialogues = tb(['Date', 'Event'], [['November 1930', 'First Round Table Conference in London, without the Congress'], ['March 1931', 'Gandhi-Irwin Pact: civil disobedience called off, prisoners released, salt manufacture along the coast allowed'], ['Late 1931', 'Second Round Table Conference; Gandhi the Congress\'s sole representative; no agreement'], ['After', 'Civil disobedience resumed, then wound down']], 'The dialogues of 1930 to 1931');
const vPoona = tb(['Step', 'Detail'], [['1932', 'British announce separate electorates for the depressed classes, the Communal Award'], ['Gandhi', 'Fasts in opposition'], ['September 1932', 'Poona Pact with Ambedkar: reserved seats in the general electorates instead']], 'Separate electorates and the Poona Pact');
const vEx2 = tb(['Step', 'Weighing two arguments fairly'], [['1', 'State each argument as that side put it'], ['2', 'Name what each side feared'], ['3', 'Do not choose a side unless the evidence decides it'], ['4', 'Record the compromise reached']], 'Weighing two arguments');
const vAct = tb(['Date', 'Event'], [['1935', 'Government of India Act promises representative government'], ['1937', 'The Congress wins in 8 of the 11 provinces and forms ministries']], 'The Act of 1935 and the elections of 1937');
const vSum1 = tb(['Idea', 'Remember'], [['Emergence', 'Return in 1915; Champaran, Kheda, Ahmedabad'], ['Non-Cooperation', '1920 to 1922; Khilafat; boycott; Chauri Chaura'], ['Civil Disobedience', 'Lahore 1929; Dandi 1930; salt'], ['Dialogues', 'Pact 1931; failed conference; Poona Pact 1932'], ['Ministries', '8 of 11 provinces in 1937']], 'Summary of Part 1');
const vTips1 = tb(['Mistake to avoid', 'Better'], [['Saying satyagraha began in India', 'It was first used in South Africa'], ['Saying the movement was called off after Jallianwala Bagh', 'It was called off after Chauri Chaura, in 1922'], ['Taking one side in a dispute', 'State each side\'s argument'], ['Giving a single toll for Jallianwala Bagh', 'Say hundreds, and that estimates vary']], 'Common mistakes in Part 1');

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = fl(['War and Quit India', 'The last days, 1946 to 1948', 'Kinds of source', 'Reading sources with care'], 'Part 2 at a glance');
const vWar = tb(['Date', 'Event'], [['September 1939', 'The Second World War begins'], ['October and November 1939', 'Congress ministries resign: India declared at war without consulting Indians'], ['1940', 'The Muslim League at Lahore demands independent states for Muslim-majority areas']], 'War, resignations and Lahore 1940');
const vQI = fl(['Cripps Mission, 1942, fails', 'Resolution of 8 August 1942', 'Leaders arrested at once', 'Strikes and sabotage by young activists', 'Parallel governments in some places', 'Suppressed by 1943 and 1944'], 'Quit India');
const vParallel = tb(['Feature', 'Detail'], [['Leadership', 'Main leaders in jail from the first days'], ['Who acted', 'Young activists, local committees'], ['Forms', 'Strikes, sabotage, parallel governments'], ['Examples', 'Satara in Maharashtra; Medinipur in Bengal'], ['End', 'Suppressed by 1943 and 1944']], 'The course of Quit India');
const vAfter = tb(['Date', 'Event'], [['1944', 'Gandhi released; holds talks with Jinnah'], ['During the war', 'Subhas Chandra Bose forms the Indian National Army'], ['1946', 'The Cabinet Mission proposes a loose federation; the plan breaks down']], 'After Quit India');
const vLast = tb(['Date', 'Event'], [['16 August 1946', 'League calls Direct Action Day; violence in Calcutta, then in Noakhali, Bihar and Punjab'], ['From late 1946', 'Gandhi walks through Noakhali and works for peace in Bihar and Calcutta'], ['15 August 1947', 'Transfer of power; Gandhi is in Calcutta, working for harmony'], ['30 January 1948', 'Gandhi is assassinated in Delhi; his death is widely mourned']], 'The last days');
const vViews = tb(['Side', 'Its argument, in its own terms'], [['The Congress', 'It spoke for Indians of every community and held to one India'], ['The League', 'It represented Muslims, who in its view needed their own states or strong safeguards']], 'Two arguments in the 1940s');
const vVoices = tb(['Kind of source', 'What it can show'], [['Speech', 'What he chose to say in public'], ['Article in a journal such as Harijan', 'His public arguments for readers'], ['Private letter', 'Other feelings, but some were written knowing they might be printed']], 'Public voice and private script');
const vAutob = tb(['Feature', 'Detail'], [['Title', 'The Story of My Experiments with Truth'], ['Language', 'Written in Gujarati in the 1920s'], ['Kind', 'A retrospective account, shaped by memory and purpose'], ['Use', 'Valuable for how he understood his life; check dates and details elsewhere']], 'The autobiography');
const vPolice = tb(['Feature', 'Detail'], [['Records', 'Fortnightly reports of the police and the Home Department, kept secret'], ['Show', 'What officials feared and noticed'], ['Risk', 'Sometimes misread events; some reports played down the response to the Dandi March, which other evidence contradicts']], 'Government reports');
const vPress = tb(['Feature', 'Detail'], [['Languages', 'Papers in English and in Indian languages'], ['Did', 'Tracked his movements and reported what he said'], ['Risk', 'Shaped by the paper\'s politics and its readers; pro-British and nationalist papers differed']], 'Newspapers');
const vEx3a = tb(['Step', 'Reading an imagined police note on a market meeting'], [['Records', 'Crowd of about 150; a speech on spinning; an informer says the audience applauded; no disorder'], ['Shows', 'A meeting took place, was orderly and drew a crowd of that size, as the officer saw it'], ['Does not show', 'The speaker\'s exact words, the crowd\'s motives or the numbers if the officer stood far away'], ['Next', 'Compare with a newspaper report and a volunteer\'s account']], 'Reading a police note');
const vEx3b = tb(['Step', 'Two accounts of one village meeting in 1921'], [['Official record', 'Calls it a small gathering stirred up by outsiders'], ['Nationalist paper', 'Calls it a large and joyful assembly of villagers'], ['Question', 'Who saw what, and for whom did each write?'], ['Method', 'Look for a third account written by neither side\'s supporters']], 'Comparing two accounts');
const vEx3c = tb(['Mark', 'Point to write for a source question'], [['Part a, 1 mark', 'Recall a name, date or fact from outside the passage'], ['Part b, 1 mark', 'One inference the passage does not state'], ['Part c, 2 marks', 'Two linked points, each tied to the question']], 'Planning a source question');
const vSum2 = tb(['Idea', 'Remember'], [['War', 'Ministries resign in 1939; League at Lahore, 1940'], ['Quit India', '8 August 1942; leaders arrested; local action; suppressed'], ['After', 'Talks 1944; Cabinet Mission 1946; Direct Action Day'], ['Last days', 'Noakhali, Bihar, Calcutta; assassinated 30 January 1948'], ['Sources', 'Speeches, letters, autobiography, police reports, newspapers']], 'Summary of Part 2');
const vTips2 = tb(['Mistake to avoid', 'Better'], [['Blaming one community or party', 'State each side\'s argument and describe events briefly'], ['Treating one source as neutral', 'Ask who made it, for whom and why'], ['Calling Quit India a plan run from jail', 'Local activists organised much of it'], ['Giving the date of a source from its place in a book', 'Check the date with records made at the time']], 'Common mistakes in Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Mahatma Gandhi and the Nationalist Movement — Part 1: From Champaran to the dialogues',
  goals: [
    'Explain how Gandhi became a national leader through the campaigns of 1917 and 1918',
    'Describe the Non-Cooperation Movement, its forms, its supporters and how it ended',
    'Describe the Civil Disobedience Movement, the march to Dandi and the dialogues of 1930 to 1932',
    'Present the dispute over separate electorates by stating each side\'s argument',
  ],
  slides: [
    sl('title', 'Gandhi and the Nationalist Movement', {
      b: 'Part 1: **Champaran** to the **dialogues** of the early 1930s.',
      v: vRoute1,
      n: 'In this chapter we follow Mahatma Gandhi and the nationalist movement. In this part we begin with his return to India and the local campaigns that made him known. Then we study Non-Cooperation and the Salt March, and the talks that followed, always asking how historians know what they tell us.',
    }),
    sl('concept', 'Gandhi comes home', {
      b: 'Returned in **January 1915** after about two decades in **South Africa**.',
      v: vHome,
      n: 'Gandhi returned to India in January 1915, after about twenty years in South Africa, where he had first used satyagraha, or non violent resistance. On the advice of Gokhale he spent a year travelling across British India. In February 1916, at the opening of the Banaras Hindu University, he criticised the Indian elite for neglecting the poor.',
    }),
    sl('check', 'Quick check: the return', {
      b: 'In which year did Gandhi return to India?',
      chk: 'm_return',
      n: 'Recall the year of his return from South Africa.',
    }),
    sl('concept', 'Three local campaigns', {
      b: '**Champaran** (1917), **Kheda** and **Ahmedabad** (1918).',
      v: vLocal,
      n: 'In 1917 at Champaran in Bihar he took up the cause of indigo peasants, and secured security of tenure and freedom to grow crops of their choice. In 1918 in Kheda in Gujarat he asked the state to remit revenue after a crop failure. At Ahmedabad in 1918 he stood with textile mill workers who wanted better conditions and higher wages.',
    }),
    sl('check', 'Quick check: where satyagraha began', {
      b: 'True or false? Gandhi first used satyagraha at Champaran.',
      chk: 'tf_sa',
      n: 'Recall where he first used the method.',
    }),
    sl('diagram', 'The chapter in time', {
      v: vTimeline,
      n: 'This timeline sets the chapter in time. Gandhi returns in 1915. Non cooperation runs from 1920 to 1922. Purna swaraj is declared in 1929, the Salt March comes in 1930, and the Pact with Irwin in 1931. Quit India begins in 1942, the transfer of power comes in 1947, and Gandhi is assassinated in 1948.',
    }),
    sl('concept', 'Rowlatt Act and Jallianwala Bagh', {
      b: 'The **Rowlatt Act** of 1919; firing at **Jallianwala Bagh**, 13 April 1919.',
      v: vRowlatt,
      n: 'The Rowlatt Act of 1919 allowed detention without trial. Gandhi called a countrywide hartal against it. On 13 April 1919, at Jallianwala Bagh in Amritsar, troops under General Dyer fired on an unarmed crowd and killed hundreds. Historians give different estimates of the number, and we should say so rather than quote a single figure.',
    }),
    sl('concept', 'Non-Cooperation and Khilafat', {
      b: 'A movement of **1920 to 1922**, joined with the **Khilafat** cause.',
      v: vNCM,
      n: 'The Non Cooperation Movement ran from 1920 to 1922. It was combined with the Khilafat movement, which wanted the Caliphate restored after the defeat of Ottoman Turkey, to bring Hindus and Muslims together. People boycotted schools, colleges, courts, government jobs and foreign cloth, and gave up titles. Constructive work meant khadi, the charkha, unity and ending untouchability.',
    }),
    sl('concept', 'Who joined, and why', {
      b: 'Groups read the movement **in their own ways**.',
      v: vGroups,
      n: 'Different groups understood the movement in their own ways. Peasants withheld taxes. Tribal groups defied forest laws. Rumours of miraculous powers spread among villagers, as the historian Shahid Amin found in Gorakhpur. Gandhi dressed simply and spoke the language of ordinary people, and businessmen such as G D Birla supported the Congress.',
    }),
    sl('concept', 'Chauri Chaura and the end', {
      b: '**February 1922**: violence, then the movement is **called off**.',
      v: vChauri,
      n: 'In February 1922, at Chauri Chaura, a crowd set fire to a police station and policemen were killed. Gandhi called off the movement, because it was meant to be non violent. He was arrested in March 1922 and sentenced to six years for sedition, and was released in 1924 on grounds of health. Some leaders and followers were disappointed.',
    }),
    sl('check', 'Quick check: Chauri Chaura', {
      b: 'What happened at Chauri Chaura in February 1922?',
      chk: 'm_chauri',
      n: 'Recall the event that ended the movement.',
    }),
    sl('example', 'Worked example 1: dating a leaflet', {
      b: 'Imagined undated leaflet: urges a **boycott of courts and foreign cloth**, names a **Khilafat committee**, says **nothing of salt**.',
      bl: [
        'Step 1 — List the **programme** it urges.',
        'Step 2 — Note the **partners** it names.',
        'Step 3 — Note what it **leaves out**.',
        'Step 4 — Give a **range**, not one year.',
      ],
      v: vEx1,
      n: 'Take an imagined undated leaflet. It urges a boycott of courts and foreign cloth, which was the programme of Non Cooperation. It names a Khilafat committee as a partner, so that alliance was still alive. It says nothing of salt, so it comes before 1930. We date it to about 1920 to 1922, as a range.',
    }),
    sl('concept', 'Simon, Lahore and Independence Day', {
      b: 'Boycott of the **Simon Commission**; **purna swaraj** at Lahore in **1929**.',
      v: vSimon,
      n: 'In 1928 the all British Simon Commission was boycotted. In December 1929 the Congress met at Lahore, with Jawaharlal Nehru as president, and declared purna swaraj, complete independence, as its goal. The twenty sixth of January 1930 was celebrated as Independence Day. The stage was set for a new movement.',
    }),
    sl('concept', 'Salt and the march to Dandi', {
      b: 'Against the state\'s **monopoly on salt**: **12 March** to **6 April 1930**.',
      v: vSalt,
      n: 'Gandhi chose the salt law, the state monopoly on making and selling salt. He wrote to the Viceroy, Lord Irwin, in advance. On 12 March 1930 he set out from the Sabarmati ashram. After about two hundred and forty miles on foot he reached Dandi on the coast on 6 April and made salt. Foreign newspapers reported the march.',
    }),
    sl('concept', 'How civil disobedience spread', {
      b: 'Salt, forest laws, taxes, cloth, and **women** in large numbers.',
      v: vSpread,
      n: 'Civil disobedience spread across the country. Salt was made in many places. Forest laws were broken, taxes were withheld in some areas, and foreign cloth was boycotted. Women took part widely. The government answered with arrests, and Gandhi himself was arrested in May 1930. The movement had become a countrywide protest.',
    }),
    sl('check', 'Quick check: who was who', {
      b: 'Match each name with the correct description.',
      chk: 'mt_people',
      n: 'Link each person with an episode from 1919 to 1932.',
    }),
    sl('concept', 'The dialogues of 1930 to 1931', {
      b: 'Round Table Conferences and the **Gandhi-Irwin Pact**.',
      v: vDialogues,
      n: 'The First Round Table Conference met in London in November 1930, without the Congress. In March 1931 the Gandhi Irwin Pact called off civil disobedience, released prisoners and allowed salt manufacture along the coast. Gandhi then attended the Second Round Table Conference as the sole Congress representative. It failed, because others challenged the Congress claim to speak for everyone.',
    }),
    sl('two-column', 'Separate electorates: two arguments', {
      b: 'The dispute of **1932**: each side\'s argument.',
      cols: ['**Ambedkar:** the depressed classes needed their own representatives, chosen by their own voters, to have a real political voice.', '**Gandhi:** separate electorates would divide Hindu society for good; he fasted in opposition.'],
      v: vPoona,
      n: 'In 1932 the British announced separate electorates for the depressed classes. Ambedkar argued that they needed their own representatives, chosen by their own voters. Gandhi opposed this, fearing a lasting division of Hindu society, and he fasted. The Poona Pact of September 1932 settled the matter with reserved seats in the general electorates.',
    }),
    sl('example', 'Worked example 2: weighing two arguments', {
      b: 'Imagined question: *Who was right in 1932?* A historian\'s method, step by step.',
      bl: [
        'Step 1 — State each argument as that side put it.',
        'Step 2 — Name what each side **feared**.',
        'Step 3 — Do not choose a side without **evidence**.',
        'Step 4 — Record the **compromise**.',
      ],
      v: vEx2,
      n: 'When two leaders disagree, do not begin by taking a side. State each argument as that side put it. Name what each feared: one feared the lack of an own voice, the other a lasting division. Choose a side only if evidence decides the matter. Then record the compromise, here reserved seats in the general electorates.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Gandhi returned in 1915 and became known through Champaran, Kheda and Ahmedabad. Non cooperation, joined with Khilafat, ran from 1920 to 1922 and ended after Chauri Chaura. Purna swaraj in 1929, the march to Dandi in 1930, the pact of 1931, the failed conference and the Poona Pact of 1932 followed. The Congress won eight of eleven provinces in 1937.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say satyagraha was first used in **South Africa**.',
        'Name **Chauri Chaura**, not Jallianwala Bagh, as the reason for ending Non-Cooperation.',
        'State each side\'s **argument** in a dispute, without taking a side.',
        'Write **hundreds** killed at Jallianwala Bagh, and say estimates **vary**.',
        'Give **dates** with the month where you know it.',
      ],
      v: vTips1,
      n: 'Some tips. Say that satyagraha was first used in South Africa. Name Chauri Chaura, not Jallianwala Bagh, as the reason Non Cooperation ended. In a dispute, state each side argument without taking a side. At Jallianwala Bagh write that hundreds were killed and that estimates vary. Give dates, with the month where you know it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Mahatma Gandhi and the Nationalist Movement — Part 2: Quit India, the last days and sources',
  goals: [
    'Explain the Quit India movement and the events that led to it',
    'Describe the communal crisis of 1946 to 1947 and Gandhi\'s work for peace, factually and without blame',
    'Name the kinds of source for knowing Gandhi and say what each can and cannot show',
    'Answer source-based questions on speeches, letters, police reports and newspapers',
  ],
  slides: [
    sl('title', 'Quit India and the last days', {
      b: 'Part 2: **Quit India**, the **last days**, and **sources**.',
      v: vRoute2,
      n: 'In this part we follow the nationalist movement from the Second World War to Gandhi\'s death. We study the Quit India movement, then the troubled years of 1946 and 1947, described briefly and without blame. Last, we ask how we can know Gandhi at all: from which sources, and how should we read them.',
    }),
    sl('concept', 'War, resignations and Lahore 1940', {
      b: 'The war began in **1939**; the Congress ministries **resigned**.',
      v: vWar,
      n: 'The Second World War began in September 1939. The Viceroy declared India at war without consulting Indians, and the Congress ministries resigned in October and November 1939. In 1940, at Lahore, the Muslim League adopted a resolution demanding independent states for the areas where Muslims were in a majority. The two parties held different views of what India\'s future should be.',
    }),
    sl('concept', 'Quit India begins', {
      b: 'The **resolution of 8 August 1942**; leaders arrested at once.',
      v: vQI,
      n: 'The Cripps Mission of 1942 failed. In August 1942 the Congress adopted the Quit India resolution, on the eighth. Gandhi and other leaders were arrested at once. Young activists then organised strikes and sabotage across the country. The movement was suppressed by 1943 and 1944.',
    }),
    sl('concept', 'The course of the movement', {
      b: 'With the leaders in jail, **local people** carried it on.',
      v: vParallel,
      n: 'With the main leaders in jail from the first days, local activists and committees carried the movement forward. They called strikes and carried out sabotage. In some places they set up parallel governments, for example in Satara in Maharashtra and Medinipur in Bengal. The government suppressed the movement by 1943 and 1944.',
    }),
    sl('concept', 'After Quit India', {
      b: '**1944** talks; the **Cabinet Mission** of **1946**.',
      v: vAfter,
      n: 'Gandhi was released in 1944 and held talks with Jinnah. During the war Subhas Chandra Bose formed the Indian National Army. After the war, in 1946, the Cabinet Mission proposed a loose federation for India. The plan broke down, as the Congress and the League could not agree on how it should work.',
    }),
    sl('two-column', 'Two arguments in the 1940s', {
      b: 'Present a disagreement by stating **each side\'s argument**.',
      cols: ['**The Congress:** it spoke for Indians of every community and held to one India.', '**The League:** it represented Muslims, who in its view needed their own states or strong safeguards.'],
      v: vViews,
      n: 'When we describe the disagreement between the Congress and the League, we state each argument as that party put it. The Congress said that it spoke for Indians of every community and held to one India. The League said that it represented Muslims, who needed their own states or strong safeguards. We describe the arguments and do not blame either side.',
    }),
    sl('concept', 'The last days, 1946 to 1948', {
      b: 'Direct Action Day; **peace work**; **15 August 1947**; **30 January 1948**.',
      v: vLast,
      n: 'On 16 August 1946 the Muslim League called Direct Action Day. Violence followed in Calcutta, and then in Noakhali, Bihar and Punjab. Gandhi walked through the villages of Noakhali and later worked for peace in Bihar and Calcutta. On 15 August 1947 he was in Calcutta working for harmony. He was assassinated in Delhi on 30 January 1948 and his death was widely mourned.',
    }),
    sl('check', 'Quick check: order of events', {
      b: 'Arrange these events in chronological order, earliest first.',
      chk: 'ord_qi',
      n: 'Place the events from 1939 to 1946 in order.',
    }),
    sl('check', 'Quick check: the date', {
      b: 'When and where was Gandhi assassinated?',
      chk: 'm_assassin',
      n: 'Recall the date and the place.',
    }),
    sl('diagram', 'Five kinds of source', {
      v: vSourceKinds,
      n: 'How do we know Gandhi? From five kinds of source. Speeches and articles were made for the public. Private letters were for one reader, though some were written knowing they might be printed. The autobiography is a later look back. Police reports were made for officials. Newspapers were made for their own readers. Each kind has its own purpose and its own risks.',
    }),
    sl('concept', 'Public voice and private script', {
      b: 'Speeches and articles are for **the public**; letters may show **other feelings**.',
      v: vVoices,
      n: 'Gandhi\'s speeches and his articles in journals such as Harijan were meant for the public. They show what he chose to say. Private letters can reveal different feelings, but some were written with the knowledge that they might one day be published. So even a letter is not always an unguarded view.',
    }),
    sl('concept', 'The autobiography', {
      b: 'Written in **Gujarati** in the **1920s**: a **retrospective** account.',
      v: vAutob,
      n: 'The Story of My Experiments with Truth was written in Gujarati in the 1920s. It looks back on his life, so it is shaped by memory and by the purpose of the author. It tells us how he understood his life, which is valuable, but dates and details should be checked against records made at the time.',
    }),
    sl('check', 'Quick check: the language', {
      b: 'Fill in the blank: the autobiography was written in ___ in the 1920s.',
      chk: 'fb_autob',
      n: 'Recall the language of the autobiography.',
    }),
    sl('concept', 'Police and government reports', {
      b: 'Secret reports show **officials\' fears**, and sometimes **misread** events.',
      v: vPolice,
      n: 'The police and the Home Department kept fortnightly reports, which were secret. They show what the officials noticed and feared. They sometimes misread events. Some reports played down the public response to the Dandi March, while other evidence shows great enthusiasm. So a historian reads such reports with care, and checks them against other evidence.',
    }),
    sl('concept', 'Newspapers', {
      b: 'English and **Indian language** papers; shaped by **politics** and **readers**.',
      v: vPress,
      n: 'Newspapers in English and in Indian languages tracked Gandhi\'s movements and reported what he said. But what they printed was shaped by the politics of the paper and by its readers. Pro British papers and nationalist papers often told the same event differently. Historians compare them, and look for what each paper chose to stress.',
    }),
    sl('check', 'Quick check: police reports', {
      b: 'True or false? Police reports are neutral and need no checking.',
      chk: 'tf_police',
      n: 'Judge the statement about police reports.',
    }),
    sl('example', 'Worked example 1: reading a police note', {
      b: 'Imagined note: *a market meeting, a crowd of about 150, a speech on spinning, an informer says the audience applauded.*',
      bl: [
        'Step 1 — List what it **records**.',
        'Step 2 — Say what it **shows**.',
        'Step 3 — Say what it **cannot show**.',
        'Step 4 — Name a **second source** to compare.',
      ],
      v: vEx3a,
      n: 'Take an imagined police note on a market meeting. It records a crowd of about one hundred and fifty, a speech on spinning, and applause reported by an informer. It shows that an orderly meeting took place. It cannot show the exact words or the crowd\'s motives. We compare it with a newspaper report or a volunteer\'s account.',
    }),
    sl('example', 'Worked example 2: two accounts of one meeting', {
      b: 'An official record and a nationalist paper describe **one village meeting** in 1921 differently.',
      bl: [
        'Step 1 — Ask **who saw** what.',
        'Step 2 — Ask **for whom** each wrote.',
        'Step 3 — Look for a **third account**.',
        'Step 4 — Give a **careful** conclusion.',
      ],
      v: vEx3b,
      n: 'Suppose an official record calls a meeting small and stirred up by outsiders, and a nationalist paper calls it large and joyful. We ask who saw what and for whom each wrote. We look for a third account by neither side\'s supporters. Until then our conclusion must be careful: there was a meeting, and the two writers saw it differently.',
    }),
    sl('example', 'Worked example 3: planning a source question', {
      b: 'A four-mark question on a **letter or report**: parts a, b and c.',
      bl: [
        'Step 1 — Part a: **recall** one fact.',
        'Step 2 — Part b: one **inference**.',
        'Step 3 — Part c: **two linked points**.',
        'Step 4 — Write **only** what the question asks.',
      ],
      v: vEx3c,
      n: 'To plan a four mark source question, read the passage twice. In part a, recall one fact from outside the passage. In part b, make one inference that the passage does not state outright. In part c, give two linked points, each tied to what the question asks. Write only what is asked, and use the words of the passage sparingly.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The ministries resigned in 1939, and the League\'s Lahore resolution came in 1940. Quit India began on 8 August 1942, with leaders arrested and local activists carrying on. Talks, the Cabinet Mission and Direct Action Day followed. Gandhi worked for peace and was assassinated on 30 January 1948. Speeches, letters, the autobiography, police reports and newspapers must each be read with care.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Describe violence **briefly** and blame no community.',
        'State each party\'s **argument** in its own terms.',
        'For a source, ask **who made it, for whom and why**.',
        'In part b of a source question, make an **inference**.',
        'Never put quotation marks round words you did not read in the source.',
      ],
      v: vTips2,
      n: 'Some tips. Describe violence briefly and blame no community. State each party\'s argument in its own terms. For any source, ask who made it, for whom and why. In part b of a source question, make an inference. And write in your own words rather than copying the passage.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Mahatma Gandhi and the Nationalist Movement — Notes',
  sections: [
    {
      h: '1. Gandhi comes home: Champaran, Kheda and Ahmedabad',
      t: 1,
      b: 'Gandhi returned to India in **January 1915** after about **two decades in South Africa**, where he had first used **satyagraha**, a method of non-violent resistance. On the advice of **Gokhale** he spent a year travelling across British India. In **February 1916**, at the opening of the **Banaras Hindu University**, he spoke to an audience that included the Indian elite and criticised them for neglecting the poor.\n\nHe then took part in three local campaigns. At **Champaran** in Bihar (1917) he took up the cause of **indigo peasants** and secured **security of tenure** and **freedom to cultivate crops of their choice**. In **Kheda** in Gujarat (1918) he asked the state to **remit revenue** after a crop failure. At **Ahmedabad** (1918) he intervened for **textile mill workers** who wanted better working conditions and a wage rise. These made him known among peasants and workers in different regions.',
      terms: [
        ['Satyagraha', 'Non-violent resistance to what is held to be unjust, first used by Gandhi in South Africa.'],
        ['Remission of revenue', 'A reduction or waiver of the land revenue demanded from cultivators.'],
      ],
      v: vHome,
      vs: [vLocal],
    },
    {
      h: '2. The Rowlatt Act and the Non-Cooperation Movement',
      t: 2,
      b: 'The **Rowlatt Act (1919)** allowed **detention without trial**. Gandhi called a countrywide **hartal** (a day of suspended work and protest) against it. On **13 April 1919** at **Jallianwala Bagh** in Amritsar, troops under **General Dyer** fired on an unarmed crowd and killed hundreds; estimates of the number vary.\n\nThe **Non-Cooperation Movement (1920–22)** was combined with the **Khilafat movement**, which aimed to restore the Caliphate after the defeat of Ottoman Turkey, so as to bring Hindus and Muslims together. It involved the **boycott** of government schools, colleges, law courts, government jobs and foreign cloth, and the **surrender of titles**. **Constructive work** meant khadi and the charkha, Hindu–Muslim unity and ending untouchability.\n\nIn February 1922, at **Chauri Chaura**, a crowd set fire to a police station and policemen were killed. Gandhi **called off** the movement. He was arrested in March 1922 and sentenced to six years for sedition, and was released in 1924 on grounds of health. Some leaders and followers were disappointed by the decision.',
      terms: [
        ['Hartal', 'A countrywide or local suspension of work and business as a form of protest.'],
        ['Khilafat movement', 'A movement to restore the Caliphate after the defeat of Ottoman Turkey, joined to Non-Cooperation.'],
      ],
      v: vRowlatt,
      vs: [vNCM, vChauri],
    },
    {
      h: '3. Gandhi\'s appeal and the many readings of the movement',
      t: 2,
      b: 'Gandhi dressed and lived simply and spoke the language of ordinary people. **Rumours of miraculous powers** spread about him, as the historian **Shahid Amin** found in a study of **Gorakhpur**. Local leaders and the Congress organisation carried his message, and **businessmen** such as **G. D. Birla** supported the Congress.\n\nDifferent groups understood the movement in **their own ways**: peasants withheld taxes, tribal groups defied forest laws, and others gave swaraj a meaning of their own. So the movement was not simply what the Congress programme said it should be.',
      terms: [
        ['Swaraj', 'Self-rule; different groups gave the word different meanings.'],
        ['Khadi', 'Hand-spun, hand-woven cloth, promoted in place of foreign cloth.'],
      ],
      v: vGroups,
    },
    {
      h: '4. Civil Disobedience and the march to Dandi',
      t: 2,
      b: 'The all-British **Simon Commission** (1928) was boycotted. At **Lahore** in **December 1929**, with **Jawaharlal Nehru** as president, the Congress declared **purna swaraj**, complete independence, as its goal, and **26 January 1930** was celebrated as Independence Day.\n\nGandhi announced a march to break the **salt law**, the state\'s monopoly on making and selling salt, and wrote to the Viceroy, **Lord Irwin**, in advance. The **Dandi March** began on **12 March 1930** from the Sabarmati ashram and reached **Dandi** on the coast on **6 April 1930**, about 240 miles, where he made salt. Civil disobedience spread: salt was made in many places, **forest laws** were broken, **taxes** were withheld, **foreign cloth** was boycotted and **women** took part widely. Gandhi was arrested in May 1930. Foreign newspapers reported the march, which brought it world attention.',
      terms: [
        ['Purna swaraj', 'Complete independence, declared as the Congress\'s goal at Lahore in 1929.'],
        ['Civil disobedience', 'Open, non-violent breaking of a law, accepting the penalty.'],
      ],
      v: vSimon,
      vs: [vSalt, vSpread, vTimeline],
    },
    {
      h: '5. The dialogues, separate electorates and the elections of 1937',
      t: 2,
      b: 'The **First Round Table Conference** (London, November 1930) met without the Congress. The **Gandhi–Irwin Pact** (March 1931) called off civil disobedience, released prisoners and allowed salt manufacture along the coast. Gandhi attended the **Second Round Table Conference** (late 1931) as the **sole representative of the Congress**. It failed: the **Muslim League**, the **princes** and **B. R. Ambedkar**, for the depressed classes, challenged the Congress\'s claim to represent all. Civil disobedience resumed, then wound down.\n\nIn **1932** the British announced **separate electorates** for the depressed classes (the **Communal Award**). **Ambedkar** argued that they needed their own representatives, chosen by their own voters. **Gandhi** opposed this, fearing a lasting division of Hindu society, and fasted. The **Poona Pact** (September 1932) gave **reserved seats** in the general electorates instead.\n\nThe **Government of India Act of 1935** promised representative government. In the **1937** elections the Congress won in **8 of the 11 provinces** and formed ministries.',
      terms: [
        ['Separate electorates', 'Seats for which only the members of one group vote, choosing their own representatives.'],
        ['Poona Pact', 'The agreement of September 1932 giving the depressed classes reserved seats in the general electorates.'],
      ],
      v: vDialogues,
      vs: [vPoona, vEx2, vAct],
    },
    {
      h: '6. Quit India and the last days',
      t: 3,
      b: 'The Second World War began in **September 1939**. The Viceroy declared India at war without consulting Indians, and the **Congress ministries resigned** (October–November 1939). In **1940** the **Muslim League** at Lahore adopted a resolution demanding independent states for the areas where Muslims were in a majority. The **Cripps Mission** of 1942 failed.\n\nThe **Quit India movement** began in **August 1942** (resolution of **8 August**). **Gandhi and other leaders were arrested at once**. Young activists organised strikes and sabotage across the country, and **parallel governments** were set up in some places, such as **Satara** in Maharashtra and **Medinipur** in Bengal. The movement was suppressed by 1943–44. Gandhi was released in 1944 and held talks with **Jinnah**. **Subhas Chandra Bose** formed the **Indian National Army**.\n\nAfter the war the **Cabinet Mission (1946)** proposed a loose federation, which broke down. The League called **Direct Action Day** on **16 August 1946**, followed by violence in Calcutta and then elsewhere (Noakhali, Bihar, Punjab). Gandhi walked through **Noakhali** and later worked for peace in Bihar and Calcutta. On **15 August 1947** he was in Calcutta working for communal harmony, not at the celebrations in Delhi. He was **assassinated** on **30 January 1948** in Delhi; his death was widely mourned. The Congress and the League each gave its own arguments about India\'s future: the Congress spoke for Indians of every community, the League for Muslims who in its view needed their own states.',
      terms: [
        ['Quit India movement', 'The movement launched in August 1942 demanding an end to British rule.'],
        ['Parallel government', 'A local administration set up by people in place of the government\'s own.'],
      ],
      v: vWar,
      vs: [vQI, vParallel, vAfter, vLast, vViews],
    },
    {
      h: '7. Knowing Gandhi: sources and how to read them',
      t: [4, 5],
      b: '**Speeches** and **articles** (in journals such as **Harijan**) were meant for the public: a public voice. **Private letters** may show other feelings, but some were written with the knowledge that they might be published. His **autobiography**, *The Story of My Experiments with Truth*, written in **Gujarati** in the **1920s**, is a **retrospective** account shaped by memory and purpose.\n\n**Government records** include secret **fortnightly reports** of the police and the Home Department. They show the officials\' fears and sometimes **misread events**; some reports played down the response to the Dandi March, which other evidence contradicts. **Newspapers** in English and in Indian languages tracked Gandhi\'s movements and reported what he said, but they were shaped by the paper\'s **politics and readers**, so pro-British and nationalist papers differed.\n\nHistorians **compare** these sources. In a source question, ask: who made it, for whom and why; what it records; and what it leaves out. Part (a) is recall, part (b) an inference, part (c) two linked points.',
      terms: [
        ['Retrospective account', 'An account written long after the events, shaped by memory and by the writer\'s purpose.'],
        ['Fortnightly report', 'A secret official report on the state of a district, made every two weeks.'],
      ],
      v: vSourceKinds,
      vs: [vVoices, vAutob, vPolice, vPress, vEx3a, vEx3b, vEx3c],
    },
  ],
  tips: '**Common mistakes**\n- Writing that satyagraha began in India; it was first used in South Africa.\n- Saying that Non-Cooperation ended after Jallianwala Bagh; it was called off after Chauri Chaura in 1922.\n- Giving a single number killed at Jallianwala Bagh; write hundreds, with estimates varying.\n- Taking a side in the dispute over separate electorates or between the Congress and the League; state each side\'s argument.\n- Describing the violence of 1946–47 in detail or blaming one community.\n- Treating a police report, a newspaper or an autobiography as a neutral witness.\n\n**How marks are awarded**\n- **1 mark:** one correct fact, name or date.\n- **2 marks:** two points, each with a short explanation.\n- **3 marks:** three points or a reason with evidence.\n- **5 marks:** an introduction, developed points on each side where asked, and a judgement for assess questions.\n- **Source questions (4 marks):** (a) 1 mark for recall, (b) 1 mark for one inference, (c) 2 marks for two linked points, either of the two alternatives.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When did Gandhi return to India, and from where?', 'In January 1915, from South Africa, after about two decades there.', 'fact', 1],
  ['**Satyagraha**', 'Non-violent resistance to what is held to be unjust; Gandhi first used it in South Africa.', 'definition', 1],
  ['What did Gandhi do in his first year at home?', 'He travelled across British India, on Gokhale\'s advice.', 'fact', 1],
  ['What did Gandhi\'s speech at the Banaras Hindu University (February 1916) do?', 'It criticised the Indian elite for neglecting the poor.', 'fact', 1],
  ['What did the Champaran campaign (1917) secure?', 'For indigo peasants: security of tenure and freedom to cultivate crops of their choice.', 'fact', 1],
  ['Kheda (1918) and Ahmedabad (1918)', 'Kheda: remission of revenue after a crop failure. Ahmedabad: better working conditions and a wage rise for textile mill workers.', 'fact', 1],
  ['**Rowlatt Act (1919)**', 'Allowed detention without trial; Gandhi called a countrywide hartal against it.', 'definition', 2],
  ['What happened at Jallianwala Bagh?', 'On 13 April 1919 troops under General Dyer fired on an unarmed crowd in Amritsar, killing hundreds; estimates vary.', 'fact', 2],
  ['Why was the Khilafat cause joined to Non-Cooperation?', 'To bring Hindus and Muslims together; it aimed to restore the Caliphate after the defeat of Ottoman Turkey.', 'concept', 2],
  ['Forms of the Non-Cooperation Movement', 'Boycott of schools, colleges, courts, government jobs and foreign cloth; surrender of titles.', 'fact', 2],
  ['Constructive work', 'Khadi and the charkha, Hindu–Muslim unity and ending untouchability.', 'concept', 2],
  ['How did different groups read Non-Cooperation?', 'In their own ways: peasants withheld taxes, tribal groups defied forest laws.', 'concept', 2],
  ['Who studied rumours of Gandhi\'s powers in Gorakhpur?', 'The historian Shahid Amin.', 'fact', 2],
  ['What ended Non-Cooperation?', 'Chauri Chaura, February 1922: a crowd set fire to a police station and policemen were killed; Gandhi called it off.', 'fact', 2],
  ['What happened to Gandhi in 1922?', 'Arrested in March 1922; six years for sedition; released in 1924 on grounds of health.', 'fact', 2],
  ['What did the Lahore session (December 1929) declare?', 'Purna swaraj, complete independence, with Jawaharlal Nehru as president; 26 January 1930 was celebrated as Independence Day.', 'fact', 2],
  ['**Salt law**', 'The state\'s monopoly on making and selling salt, which Gandhi chose to break.', 'definition', 2],
  ['The Dandi March', 'From the Sabarmati ashram on 12 March 1930 to Dandi on 6 April 1930, about 240 miles; salt made there.', 'fact', 2],
  ['How did civil disobedience spread?', 'Salt made in many places, forest laws broken, taxes withheld, foreign cloth boycotted, women taking part widely.', 'concept', 2],
  ['The Gandhi–Irwin Pact (March 1931)', 'Civil disobedience called off, prisoners released, salt manufacture along the coast allowed.', 'fact', 2],
  ['Why did the Second Round Table Conference fail?', 'The League, the princes and Ambedkar challenged the Congress\'s claim to speak for all; Gandhi was the sole Congress representative.', 'concept', 2],
  ['The Poona Pact (September 1932)', 'Reserved seats in the general electorates for the depressed classes, in place of the separate electorates of the Communal Award.', 'fact', 2],
  ['A fair account of the 1932 dispute', 'State each side\'s argument: Ambedkar wanted their own representatives; Gandhi feared a lasting division of Hindu society.', 'exam-tip', 2],
  ['Quit India: when and what happened first?', 'Resolution of 8 August 1942; Gandhi and other leaders arrested at once.', 'fact', 3],
  ['Why did the Congress ministries resign in 1939?', 'The Viceroy declared India at war without consulting Indians.', 'concept', 3],
  ['The Muslim League\'s resolution of 1940', 'Adopted at Lahore, it demanded independent states for Muslim-majority areas.', 'fact', 3],
  ['Who carried Quit India forward?', 'Young activists and local committees; strikes, sabotage and parallel governments such as Satara and Medinipur.', 'concept', 3],
  ['Direct Action Day', '16 August 1946, called by the Muslim League; followed by violence in Calcutta and elsewhere.', 'fact', 3],
  ['Where was Gandhi on 15 August 1947?', 'In Calcutta, working for communal harmony, not at the celebrations in Delhi.', 'fact', 3],
  ['A public voice and a private script', 'Speeches and articles were for the public; letters may show other feelings but some were written knowing they might be printed.', 'concept', 4],
  ['Four cautions for sources on Gandhi', 'Autobiography: memory and purpose. Police reports: officials\' fears. Newspapers: the paper\'s politics and readers. Letters: possible publication.', 'exam-tip', 4],
  ['A source question\'s three parts', 'Part a: recall; part b: one inference; part c: two linked points, tied to the question.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Mahatma Gandhi and the Nationalist Movement',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_champ_weaken', 'm_arrest_table', 'm_dep_indep', 'ar_1939'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_early_diff', 's_qi_leaders', 's3_src_plan'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_emerge', 'l_calloff'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_qi'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Mahatma Gandhi and the Nationalist Movement',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_date_early', 'm_gorakhpur_src', 'm_boycott_clue', 'm_srtc_weaken', 'm_dandi_date', 'm_qi_date', 'm_calcutta_weaken', 'm_letter_pub_weaken', 'ar_cabinet', 'ar_poona'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_dyer', 's_new_evidence', { attempt: 1, keys: ['s_sep_elect', 's_date_diary'] }, 's3_ncm_features', { attempt: 1, keys: ['s3_rtc', 's3_cloth_table'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_cd_assess', { attempt: 1, keys: ['l_qi_assess', 'l_sources_eval'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_police', 'sb_autob'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch11 only (Gandhi\'s emergence; Non-Cooperation and Civil Disobedience with the dialogues; Quit India and the last days; knowing Gandhi: sources; source-based practice)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; nothing from any speech, letter, article, autobiography, police report or newspaper is quoted, translated or closely paraphrased; no NCERT text, source box, table, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Gandhi back in January 1915; BHU speech February 1916; Champaran 1917; Kheda and Ahmedabad 1918; Rowlatt Act 1919; Jallianwala Bagh 13 April 1919; Non-Cooperation 1920–22 with Khilafat; Chauri Chaura February 1922; arrest March 1922, six years, released 1924; Simon Commission 1928; Lahore December 1929; Independence Day 26 January 1930; Dandi 12 March to 6 April 1930, about 240 miles; arrest May 1930; First RTC November 1930; Gandhi–Irwin Pact March 1931; Second RTC late 1931; Communal Award and Poona Pact 1932; Act of 1935; Congress in 8 of 11 provinces 1937; ministries resign October–November 1939; League at Lahore 1940; Cripps 1942; Quit India 8 August 1942; Satara and Medinipur; released 1944; Cabinet Mission 1946; Direct Action Day 16 August 1946; Noakhali; 15 August 1947 in Calcutta; assassinated 30 January 1948',
    neutrality: 'Gandhi, other leaders, the League, the Congress and the British government presented factually; disagreements stated as each side\'s argument; communal violence described briefly without blaming any community',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
