// Build ICSE 10 History & Civics ch14 The First World War. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch14/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch14', 'social-science');
const { blocsSvg, timelineSvg, EVENTS, SARAJEVO, VERSAILLES, ALLIANCE, ENTENTE, SAAR_YEARS, GERMAN_ARMY, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(yearsBetween(SARAJEVO, VERSAILLES), 5);
assert.equal(yearsBetween(ALLIANCE, ENTENTE), 25);
assert.ok(EVENTS.some(([y]) => y === VERSAILLES));

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from 1865 to 1925 marking: 1871 Alsace-Lorraine taken by Germany, 1882 Triple Alliance, 1894 Franco-Russian alliance, 1904 Entente Cordiale, 1906 HMS Dreadnought launched, 1907 Triple Entente, 1908 Austria-Hungary annexes Bosnia, 1911 second Moroccan crisis, 1914 Sarajevo and war begins, 1918 armistice on 11 November, 1919 Treaty of Versailles on 28 June, 1920 League of Nations begins';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vBlocs = blocsSvg('Two boxes: the Triple Alliance of 1882 with Germany, Austria-Hungary and Italy, and the Triple Entente of 1907 with Britain, France and Russia, joined by a dashed line marked rivalry', 'Rival blocs of Europe before 1914 (schematic, drawn by SOYL).');
const vRoute1 = flow('LR', ['Nationalism', 'Imperialism', 'Armament race', 'Rival blocs', 'Sarajevo, 1914'], 'Route map of Part 1: nationalism, imperialism, the armament race, the rival blocs, and the Sarajevo crisis of 1914', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Armistice, 1918', 'Treaty of Versailles, 1919', 'Military terms', 'Territorial terms', 'League of Nations, 1920'], 'Route map of Part 2: the armistice of 1918, the Treaty of Versailles of 1919, its military and territorial terms, and the League of Nations from 1920', 'Part 2 at a glance');
const vNationalism = table(['Form of nationalism', 'Who', 'Why it caused tension'], [
  ['Revanche', 'France', 'Wish to recover Alsace-Lorraine, lost to Germany in 1871'],
  ['Pan-Slavism', 'Russia and Balkan Slavs', 'Clashed with Austria-Hungary in the Balkans'],
  ['Pan-Germanism', 'Germany', 'Ambition for German dominance in Europe'],
  ['Serb nationalism', 'Serbia', 'Wished to unite Serbs living under Austria-Hungary'],
], 'Table of forms of nationalism before 1914: French revanche over Alsace-Lorraine, Russian and Balkan Pan-Slavism against Austria-Hungary, German Pan-Germanism, and Serb nationalism against Austria-Hungary');
const vImperialism = table(['Point', 'Fact'], [
  ['Aim', 'Colonies for raw materials, markets and prestige'],
  ['Late-comer', 'Germany wanted a larger share'],
  ['Crises', 'Morocco, 1905 and 1911 (Germany and France)'],
  ['Effect', 'Suspicion and near-war among the great powers'],
], 'Table about imperialism: colonies were sought for raw materials, markets and prestige; Germany as a late-comer wanted a larger share; the Moroccan crises of 1905 and 1911 set Germany against France; the result was suspicion and near-war', 'Imperialism in four lines.');
const vArms = table(['Kind', 'What happened'], [
  ['Navies', 'Britain launched the Dreadnought (1906); Germany built similar ships'],
  ['Armies', 'Conscription gave the continental powers millions of trained soldiers'],
  ['War plans', 'Plans assumed rapid mobilisation once a crisis began'],
  ['Effect', 'Fear, suspicion and readiness to use force'],
], 'Table of the armament race: the naval race after the Dreadnought of 1906, conscript armies on the continent, war plans built on rapid mobilisation, and the resulting fear and readiness to use force');
const vEntente = flow('TB', ['1894: France and Russia ally', '1904: Entente Cordiale (Britain and France)', '1907: Anglo-Russian understanding', 'Triple Entente complete'], 'Flow of how the Triple Entente formed: the Franco-Russian alliance of 1894, the Entente Cordiale between Britain and France in 1904, the Anglo-Russian understanding of 1907, completing the Triple Entente', 'From isolation to the Entente.');
const vChain = flow('TB', ['28 June 1914: Archduke killed at Sarajevo', 'Austria-Hungary sends Serbia an ultimatum', '28 July: Austria-Hungary declares war on Serbia', 'Russia mobilises to protect Serbia', 'Germany declares war on Russia and France; invades Belgium', '4 August: Britain declares war on Germany'], 'Flow of the July crisis of 1914: the Archduke killed at Sarajevo on 28 June; Austria-Hungary sends Serbia an ultimatum; declares war on 28 July; Russia mobilises; Germany declares war on Russia and France and invades Belgium; Britain declares war on Germany on 4 August', 'From one murder to a general war in six weeks.');
const vSarajevo = table(['Question', 'Answer'], [
  ['Who was killed?', 'Archduke Franz Ferdinand, heir to Austria-Hungary, and his wife'],
  ['Where and when?', 'Sarajevo, capital of Bosnia, 28 June 1914'],
  ['By whom?', 'Gavrilo Princip, a young Bosnian Serb nationalist'],
  ['Background', 'Austria-Hungary had annexed Bosnia in 1908, angering Serbia'],
], 'Table about Sarajevo: Archduke Franz Ferdinand, heir to Austria-Hungary, and his wife were killed at Sarajevo, the capital of Bosnia, on 28 June 1914 by Gavrilo Princip, a young Bosnian Serb nationalist; Austria-Hungary had annexed Bosnia in 1908');
const vCausePlan = table(['Part', 'Marks', 'What to write'], [
  ['(i) Nationalism', '3', 'Alsace-Lorraine; Pan-Slavism; Pan-Germanism'],
  ['(ii) Imperialism', '3', 'Colonial rivalry; Germany\'s demand; Moroccan crises'],
  ['(iii) Armament race', '4', 'Navies; armies; plans; why it made war likely'],
], 'Worked example table planning a ten-mark answer on causes: three points on nationalism, three on imperialism, and four on the armament race', 'Plan before you write.');
const vMilitary = table(['Military term', 'Detail'], [
  ['Army', `Limited to ${GERMAN_ARMY.toLocaleString('en-IN')} men; no conscription`],
  ['Air force', 'Not allowed'],
  ['Navy', 'Only a small navy; no submarines'],
  ['Rhineland', 'Demilitarised: no troops or forts'],
], `Table of the military terms of the Treaty of Versailles: army limited to ${GERMAN_ARMY} men with no conscription, no air force, a small navy with no submarines, and a demilitarised Rhineland`);
const vTerritory = table(['Area', 'Decision'], [
  ['Alsace-Lorraine', 'Returned to France'],
  ['Saar', `Under the League for ${SAAR_YEARS} years; coal mines to France`],
  ['Polish Corridor', 'Given to Poland; separated East Prussia'],
  ['Danzig', 'Free city under the League'],
  ['Colonies', 'Taken away; governed as mandates'],
], `Table of territorial terms: Alsace-Lorraine returned to France; the Saar under the League for ${SAAR_YEARS} years with coal mines to France; the Polish Corridor to Poland, separating East Prussia; Danzig a free city under the League; colonies taken away as mandates`);
const vGuilt = flow('TB', ['Article 231: Germany accepts responsibility for the war', 'Reparations for war damage', 'Dictated peace: no negotiation', 'Lasting resentment in Germany'], 'Flow of the financial and moral terms: Article 231 makes Germany accept responsibility; reparations for war damage follow; the peace was dictated without negotiation; lasting resentment in Germany', 'Guilt, payment and grievance.');
const vLeague = table(['Point', 'Fact'], [
  ['Proposed by', 'President Woodrow Wilson of the USA'],
  ['Founding document', 'Covenant, part of the peace treaties of 1919'],
  ['Began work', 'January 1920'],
  ['Headquarters', 'Geneva, Switzerland'],
  ['Did not join', 'The USA'],
], 'Table about the League of Nations: proposed by President Woodrow Wilson of the USA, founded by the Covenant written into the peace treaties of 1919, began work in January 1920, headquarters at Geneva, and the USA never joined');
const vLeagueAims = flow('TB', ['Maintain peace and security', 'Collective security against an aggressor', 'Settle disputes by arbitration', 'Promote disarmament', 'International cooperation; fair labour conditions'], 'Flow of the objectives of the League of Nations: maintaining peace and security, collective security against an aggressor, settling disputes by arbitration, promoting disarmament, and international cooperation with fair labour conditions', 'Objectives of the League (paraphrased).');
const vWeak = table(['Weakness', 'Why it mattered'], [
  ['USA absent', 'No support from a leading power'],
  ['No army', 'Depended on members to act'],
  ['Unanimity', 'Decisions were slow'],
  ['Seen as victors\' club', 'Defeated powers distrusted it'],
], 'Table of the League\'s weaknesses: the USA was absent, the League had no army, decisions needed unanimity, and it was seen as a club of the victors');
const vPlan = table(['Part', 'Marks', 'What to write'], [
  ['(i) Facts', '3', 'Date, place, war-guilt clause'],
  ['(ii) Terms', '3', 'Three separate territorial terms'],
  ['(iii) Explain', '4', 'Two military terms and two reasons for resentment'],
], 'Worked example table planning a ten-mark answer on the Treaty of Versailles: three facts, three territorial terms, and two military terms with two reasons for resentment', 'One point for each mark.');
const vSum1 = flow('TB', ['Nationalism: Alsace-Lorraine, Pan-Slavism', 'Imperialism: colonies, Morocco', 'Armament race: Dreadnought, conscription', `Blocs: Triple Alliance ${ALLIANCE}, Triple Entente ${ENTENTE}`, 'Sarajevo, 28 June 1914: the spark'], `Summary flow of Part 1: nationalism, imperialism, the armament race, the blocs of ${ALLIANCE} and ${ENTENTE}, and Sarajevo as the spark`, 'Part 1 in five lines.');
const vSum2 = flow('TB', ['Armistice, 11 November 1918', `Treaty of Versailles, 28 June ${VERSAILLES}`, 'War guilt, reparations, military limits', 'Lost land and colonies', 'League of Nations, Geneva, 1920'], `Summary flow of Part 2: the armistice of 11 November 1918, the Treaty of Versailles on 28 June ${VERSAILLES}, war guilt, reparations and military limits, the loss of land and colonies, and the League of Nations at Geneva from 1920`, 'Part 2 in five lines.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The First World War — Part 1: Causes and the Sarajevo Crisis',
  goals: [
    'Explain how nationalism and imperialism raised tension in Europe',
    'Describe the armament race and the two rival blocs',
    'Explain how the Sarajevo crisis became a general war',
  ],
  slides: [
    sl('title', 'Why did Europe go to war in 1914?', {
      b: 'Part 1 — four **long-term causes** and the **immediate cause** at **Sarajevo**.',
      v: vRoute1,
      n: 'In nineteen fourteen the great powers of Europe went to war with one another, and the war spread across the world. Why did it happen? In this part we study four long-term causes, nationalism, imperialism, the armament race and the rival alliances, and then the immediate cause, the murder at Sarajevo.',
    }),
    sl('diagram', 'Dates to remember', {
      b: 'From **1871** to the **League of Nations (1920)**.',
      v: vTimeline,
      n: 'This timeline shows the main dates. Germany took Alsace-Lorraine in eighteen seventy-one. The Triple Alliance came in eighteen eighty-two and the Triple Entente in nineteen hundred and seven. The war began in nineteen fourteen, the fighting ended in nineteen eighteen, the Treaty of Versailles was signed in nineteen nineteen, and the League of Nations began work in nineteen twenty.',
    }),
    sl('concept', 'Aggressive nationalism', {
      b: 'Each nation put its **own greatness** above peace.',
      v: vNationalism,
      n: 'Nationalism means love of one\'s nation, but before nineteen fourteen it often became aggressive. France wanted revenge for losing Alsace-Lorraine. Russia saw itself as protector of the Slav peoples, which brought it into conflict with Austria-Hungary. Germany dreamed of dominance, and Serb nationalists wanted to unite Serbs living under Austrian rule.',
    }),
    sl('check', 'Quick check: rival camps', {
      b: 'Which country was NOT a member of the Triple Entente?',
      chk: 'm_chk_entente',
      n: 'Think about the two camps. Which of these four countries was not part of the Triple Entente?',
    }),
    sl('diagram', 'Imperialism', {
      b: 'Rivalry for **colonies**: the **Moroccan crises** of **1905** and **1911**.',
      v: vImperialism,
      n: 'Imperialism means seeking colonies for raw materials, markets and prestige. Britain and France already held large empires. Germany, a late-comer, wanted a bigger share. Twice, in nineteen hundred and five and nineteen eleven, Germany and France clashed over Morocco, and Europe came close to war.',
    }),
    sl('diagram', 'The armament race', {
      b: 'The **Dreadnought** (1906), **conscription** and war plans.',
      v: vArms,
      n: 'The powers also raced to arm. After Britain launched a powerful battleship called the Dreadnought in nineteen hundred and six, Germany built similar ships. On the continent, conscription gave countries millions of trained soldiers, and war plans assumed rapid mobilisation. This spread fear and made leaders ready to use force.',
    }),
    sl('check', 'Quick check: Morocco', {
      b: 'True or false: Germany and France came into conflict over Morocco in 1905 and 1911.',
      chk: 'tf_chk_morocco',
      n: 'Recall the two crises in North Africa. Were they about Morocco?',
    }),
    sl('diagram', 'Two rival blocs', {
      b: `**Triple Alliance (${ALLIANCE})** against **Triple Entente (${ENTENTE})**.`,
      v: vBlocs,
      n: 'By nineteen hundred and seven Europe was divided into two armed camps. The Triple Alliance joined Germany, Austria-Hungary and Italy. The Triple Entente joined Britain, France and Russia. Each power promised to support its partners, so a quarrel between two states could pull in all the others.',
    }),
    sl('diagram', 'How the Entente formed', {
      b: '**1894**, **1904**, **1907**.',
      v: vEntente,
      n: 'Britain had long stayed out of European alliances. France and Russia allied in eighteen ninety-four. Worried by German ambitions, Britain settled its quarrels with France in the Entente Cordiale of nineteen hundred and four, and with Russia in nineteen hundred and seven. That completed the Triple Entente.',
    }),
    sl('example', 'Worked example 1: planning a ten-mark answer on causes', {
      b: 'Plan a **3 + 3 + 4** answer on the long-term causes.',
      bl: ['(i) Nationalism: Alsace-Lorraine, Pan-Slavism, Pan-Germanism.', '(ii) Imperialism: colonies, Germany\'s demand, Morocco.', '(iii) Armament race: navies, armies, plans, and why it made war likely.'],
      v: vCausePlan,
      n: 'Here is a plan for a ten-mark answer in three parts. For nationalism, give three facts: Alsace-Lorraine, Pan-Slavism and Pan-Germanism. For imperialism, give three: colonial rivalry, Germany\'s demand and the Moroccan crises. For the four-mark part, describe navies, armies and war plans, then explain why they made war more likely.',
    }),
    sl('diagram', 'Sarajevo, 28 June 1914', {
      b: 'The **immediate cause**: the murder of the **Archduke**.',
      v: vSarajevo,
      n: 'On the twenty-eighth of June nineteen fourteen, Archduke Franz Ferdinand, heir to the throne of Austria-Hungary, and his wife were shot dead at Sarajevo, the capital of Bosnia. The assassin was Gavrilo Princip, a young Bosnian Serb nationalist. Austria-Hungary had annexed Bosnia in nineteen hundred and eight, which had angered Serbia.',
    }),
    sl('check', 'Quick check: the assassin', {
      b: 'The young Bosnian Serb who shot the Archduke was Gavrilo ___.',
      chk: 'fb_chk_princip',
      n: 'Who fired the shots at Sarajevo? Complete his name.',
    }),
    sl('diagram', 'From Sarajevo to world war', {
      b: 'A **chain** of declarations in **six weeks**.',
      v: vChain,
      n: 'Austria-Hungary blamed Serbia and sent it a harsh ultimatum. When Serbia did not accept every demand, Austria-Hungary declared war on the twenty-eighth of July. Russia mobilised to protect Serbia. Germany declared war on Russia and France and marched through neutral Belgium. On the fourth of August Britain declared war on Germany.',
    }),
    sl('example', 'Worked example 2: immediate and long-term causes', {
      b: 'Correct the claim that "Sarajevo alone caused the war".',
      bl: ['Point 1: Sarajevo was the **spark**, the **immediate** cause.', 'Point 2: the **fuel** was already there: nationalism, imperialism, the armament race and the blocs.', 'Tip: always separate **immediate** from **long-term** causes.'],
      v: vChain,
      n: 'A common mistake is to say that the murder at Sarajevo alone caused the war. Correct it in two points. First, Sarajevo was only the spark, the immediate cause. Second, the fuel was already there in the long-term causes: nationalism, imperialism, the armament race and the rival alliances. Keep the two kinds of cause separate.',
    }),
    sl('check', 'Quick check: Britain enters', {
      b: 'On which date did Britain declare war on Germany?',
      chk: 'm_chk_britain_date',
      n: 'Britain entered the war after Germany invaded Belgium. On which date?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part One. Aggressive nationalism, rivalry for colonies and the armament race made the powers suspicious and ready to fight. The Triple Alliance and the Triple Entente divided Europe into two camps. The murder at Sarajevo on the twenty-eighth of June nineteen fourteen was the spark, and the alliance system turned a local quarrel into a general war.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Triple Alliance **1882**: Germany, Austria-Hungary, Italy.', 'Triple Entente **1907**: Britain, France, Russia.', 'Sarajevo: **28 June 1914**, **Franz Ferdinand**, **Gavrilo Princip**.', 'Britain entered on **4 August 1914** after Germany invaded **Belgium**.', 'Separate the **immediate** cause from the **long-term** causes.'],
      v: vBlocs,
      n: 'A few tips. Know the members and years of the two blocs. Learn the Sarajevo facts: the date, the victim and the assassin. Remember that Britain entered on the fourth of August after the invasion of Belgium. And in longer answers, always separate the immediate cause from the long-term causes.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The First World War — Part 2: The Treaty of Versailles and the League of Nations',
  goals: [
    'State the main terms of the Treaty of Versailles',
    'Explain why Germany resented the treaty',
    'Describe the formation and objectives of the League of Nations',
  ],
  slides: [
    sl('title', 'Making the peace', {
      b: 'Part 2 — the **Treaty of Versailles** and the **League of Nations**.',
      v: vRoute2,
      n: 'The fighting ended with an armistice on the eleventh of November nineteen eighteen. The victorious Allies met in Paris to make peace. In this part we study the treaty they made with Germany, signed at Versailles in nineteen nineteen, and the League of Nations, set up to prevent another war.',
    }),
    sl('diagram', 'Signing at Versailles', {
      b: `**28 June ${VERSAILLES}**, five years to the day after Sarajevo.`,
      v: vTimeline,
      n: 'The Treaty of Versailles was signed on the twenty-eighth of June nineteen nineteen in the Palace of Versailles near Paris, exactly five years after the murder at Sarajevo. Its terms were drawn up by the victorious Allies. Germany was presented with them and had to sign.',
    }),
    sl('concept', 'War guilt and reparations', {
      b: '**Article 231** and **payments** for war damage.',
      v: vGuilt,
      n: 'Under Article two hundred and thirty-one, the war-guilt clause, Germany had to accept responsibility for the war and the losses it caused. On this basis Germany was required to pay reparations for war damage. Because the peace was dictated without negotiation, these terms left deep resentment in Germany.',
    }),
    sl('check', 'Quick check: the palace', {
      b: 'In which palace near Paris was the treaty with Germany signed?',
      chk: 'm_chk_versailles_place',
      n: 'The treaty takes its name from the place where it was signed. Which palace was it?',
    }),
    sl('diagram', 'Military terms', {
      b: `Army of **${GERMAN_ARMY.toLocaleString('en-IN')}**; **no air force**; Rhineland **demilitarised**.`,
      v: vMilitary,
      n: 'The military terms were meant to keep Germany too weak to attack its neighbours. Its army was limited to one hundred thousand men, and conscription was banned. Germany could have no air force, only a small navy and no submarines. The Rhineland, next to France, was demilitarised, with no German troops or forts.',
    }),
    sl('diagram', 'Territorial terms', {
      b: 'Land lost in the **west**, the **east** and **overseas**.',
      v: vTerritory,
      n: 'Germany also lost land. Alsace-Lorraine went back to France. The Saar was placed under the League for fifteen years, with its coal mines given to France. The Polish Corridor gave Poland a route to the sea and cut off East Prussia. Danzig became a free city, and all German colonies became mandates.',
    }),
    sl('check', 'Quick check: Alsace-Lorraine', {
      b: 'True or false: the Treaty of Versailles returned Alsace-Lorraine to France.',
      chk: 'tf_chk_alsace',
      n: 'Germany had taken Alsace-Lorraine in eighteen seventy-one. What did the treaty decide?',
    }),
    sl('example', 'Worked example 1: a ten-mark answer on Versailles', {
      b: 'Plan **3 + 3 + 4** marks on the treaty.',
      bl: ['(i) Date, place and the war-guilt clause.', '(ii) Three separate territorial terms.', '(iii) Two military terms and two reasons for German resentment.'],
      v: vPlan,
      n: 'Plan a ten-mark answer on the treaty like this. For three marks, give the date, the place and the war-guilt clause. For three more, give three separate territorial terms. For the four-mark part, give two military terms and two reasons why Germans resented the treaty. One clear point earns each mark.',
    }),
    sl('two-column', 'How the two sides saw the treaty', {
      cols: ['**The Allies**\n\n- Germany must be **too weak** to attack again\n- **France** wanted security on its border\n- Losses should be **paid for**', '**Many Germans**\n\n- A **dictated** peace, not negotiated\n- **Blamed alone** for the war\n- Heavy **reparations** and lost **land**'],
      n: 'Compare the two views. The Allies wanted Germany too weak to attack again, France wanted security on its border, and the victors wanted their losses paid for. Many Germans saw a dictated peace that blamed them alone, demanded heavy payments and took away land. Present both views when you evaluate the treaty.',
    }),
    sl('diagram', 'The League of Nations', {
      b: 'Proposed by **Wilson**; began work in **1920**; based at **Geneva**.',
      v: vLeague,
      n: 'The idea of an association of nations to keep the peace was put forward by President Woodrow Wilson of the United States. The League\'s Covenant was written into the peace treaties of nineteen nineteen, and the League began work in January nineteen twenty, with its headquarters at Geneva in Switzerland.',
    }),
    sl('diagram', 'Objectives of the League', {
      b: '**Peace**, **collective security**, **arbitration**, **disarmament**, **cooperation**.',
      v: vLeagueAims,
      n: 'The League aimed to maintain peace and security. Its members promised collective security, acting together against any aggressor. Disputes were to be settled by arbitration or judgement, not war. It also worked for disarmament, for international cooperation and for fair conditions of labour through the International Labour Organisation.',
    }),
    sl('check', 'Quick check: headquarters', {
      b: 'The headquarters of the League of Nations were at ___.',
      chk: 'fb_chk_geneva',
      n: 'Where was the League based? Complete the name of the city.',
    }),
    sl('example', 'Worked example 2: matching a situation to an aim', {
      b: 'Two members quarrel over a border. What would the League urge?',
      bl: ['Step 1: identify the **danger**: a possible war.', 'Step 2: match it to an **objective**: peaceful settlement by **arbitration** or the League Council.', 'Step 3: add **collective security** if one side attacks.'],
      v: vLeagueAims,
      n: 'Practise matching a situation to an objective. Two members quarrel over a border. The danger is war, so the League would urge them to settle peacefully, by arbitration or through its Council. If one side attacked, collective security would apply, and all members were expected to act against the aggressor.',
    }),
    sl('diagram', 'Weaknesses of the League', {
      b: 'No **USA**, no **army**, slow **unanimous** decisions.',
      v: vWeak,
      n: 'The League had weaknesses from the start. The United States never joined. The League had no army and depended on its members to act. Its main decisions needed agreement of all, so action was slow. And the defeated powers saw it as a club of the victors.',
    }),
    sl('check', 'Quick check: the missing power', {
      b: 'Which of these powers never became a member of the League?',
      chk: 'm_chk_usa',
      n: 'One great power whose President had proposed the League never joined it. Which one?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part Two. The fighting ended in November nineteen eighteen. The Treaty of Versailles of June nineteen nineteen made Germany accept war guilt and pay reparations, limited its army and took away land and colonies. The League of Nations began in nineteen twenty at Geneva to keep the peace through collective security, but it was weak from the start.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Versailles: **28 June 1919**; war-guilt clause **Article 231**.', `Army **${GERMAN_ARMY.toLocaleString('en-IN')}**; no air force; Rhineland demilitarised.`, 'Alsace-Lorraine to **France**; Saar under the League **15 years**; **Polish Corridor**; **Danzig** free city.', 'League: **1920**, **Geneva**, proposed by **Wilson**; USA **never joined**.', 'Paraphrase objectives in your **own words**.'],
      v: vTerritory,
      n: 'A few tips. Learn the date of the treaty and the number of the war-guilt clause. Know the military limits and the main territorial terms. Remember that the League began in nineteen twenty at Geneva, proposed by Wilson, but the United States never joined. Always write objectives in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The First World War — notes',
  sections: [
    {
      h: '1. Nationalism and imperialism',
      t: 1,
      b: '- **Aggressive nationalism:** French **revanche** over **Alsace-Lorraine** (lost in **1871**); **Pan-Slavism** (Russia as protector of the Slavs) against **Austria-Hungary**; **Pan-Germanism**; **Serb** nationalism.\n- **Imperialism:** rivalry for **colonies**, raw materials and markets; **Germany** wanted a larger share; the **Moroccan crises** of **1905** and **1911** set Germany against France.',
      terms: [['Revanche', 'The French wish to win back Alsace-Lorraine from Germany.'], ['Pan-Slavism', 'The idea of uniting Slav peoples, with Russia as their protector.']],
      v: vNationalism,
      vs: [vImperialism],
    },
    {
      h: '2. The armament race and the rival blocs',
      t: 1,
      b: `- **Navies:** Britain launched the **Dreadnought** in **1906**; Germany built similar ships.\n- **Armies:** **conscription** gave the continental powers millions of soldiers; war plans relied on rapid mobilisation.\n- **Triple Alliance (${ALLIANCE}):** Germany, Austria-Hungary, Italy (Italy stayed neutral in 1914 and joined the other side in 1915).\n- **Triple Entente:** France–Russia (1894), **Entente Cordiale** Britain–France (1904), Britain–Russia (**${ENTENTE}**).`,
      terms: [['Conscription', 'Compulsory military service.'], ['Triple Entente', 'The grouping of Britain, France and Russia completed in 1907.']],
      v: vBlocs,
      vs: [vArms, vEntente],
    },
    {
      h: '3. Sarajevo: the immediate cause',
      t: 2,
      b: '- **28 June 1914:** **Archduke Franz Ferdinand**, heir to **Austria-Hungary**, and his wife were shot at **Sarajevo** by **Gavrilo Princip**, a Bosnian Serb nationalist.\n- **Background:** Austria-Hungary had annexed **Bosnia** in **1908**.\n- **July crisis:** ultimatum to Serbia; war declared on **28 July**; Russia mobilised; Germany declared war on **Russia** and **France** and invaded **Belgium**; **Britain** declared war on **4 August 1914**.',
      terms: [['Ultimatum', 'A final set of demands, with the threat of action if they are refused.']],
      v: vSarajevo,
      vs: [vChain],
    },
    {
      h: '4. The Treaty of Versailles',
      t: 3,
      b: `- Signed **28 June ${VERSAILLES}**, Palace of **Versailles**; terms drawn up by the Allies.\n- **War guilt:** Article **231**; **reparations** for war damage.\n- **Military:** army **${GERMAN_ARMY.toLocaleString('en-IN')}**, no conscription, **no air force**, small navy, **Rhineland demilitarised**.\n- **Territorial:** **Alsace-Lorraine** to France; **Saar** under the League for **${SAAR_YEARS}** years with coal mines to France; **Polish Corridor**; **Danzig** a free city; colonies as **mandates**.`,
      terms: [['Reparations', 'Payments for war damage.'], ['Mandate', 'A former colony governed by another power under League supervision.']],
      v: vTerritory,
      vs: [vMilitary, vGuilt],
    },
    {
      h: '5. Why Germany resented the treaty',
      t: 3,
      b: '- A **dictated peace**: Germany had **no say** in the terms.\n- **Blamed alone** through the war-guilt clause; heavy **reparations**.\n- Loss of **land**, **colonies** and military strength.\n- This resentment later fed **extreme nationalism** in Germany.',
      terms: [['Dictated peace', 'A settlement imposed on the defeated side without negotiation.']],
      v: vGuilt,
    },
    {
      h: '6. The League of Nations',
      t: 4,
      b: '- **Proposed** by **President Woodrow Wilson** (USA); **Covenant** part of the peace treaties of **1919**; began work in **January 1920**; headquarters **Geneva**.\n- **Objectives (paraphrased):** maintain **peace**; **collective security**; settle disputes by **arbitration**; **disarmament**; **international cooperation**; fair **labour** conditions.\n- **Weaknesses:** the **USA** never joined; **no army**; **unanimity** slowed decisions.',
      terms: [['Collective security', 'Members acting together against any aggressor.'], ['Covenant', 'The founding document of the League of Nations.']],
      v: vLeague,
      vs: [vLeagueAims, vWeak],
    },
  ],
  tips: '**Common mistakes**\n- Putting **Italy** in the Triple Entente (it was in the **Triple Alliance**).\n- Calling Sarajevo the **only** cause (it was the **immediate** cause).\n- Mixing up **28 June 1914** (Sarajevo) and **28 June 1919** (Versailles).\n- Saying the League had its own **army** (it had none).\n- Placing the League in **New York** (that is the United Nations; the League was at **Geneva**).\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks you to explain or evaluate.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Triple Alliance', `**${ALLIANCE}**: Germany, Austria-Hungary, Italy.`, 'fact', 1],
  ['Triple Entente', `Completed **${ENTENTE}**: Britain, France, Russia.`, 'fact', 1],
  ['Entente Cordiale', '**1904**: Britain and France.', 'fact', 1],
  ['Franco-Russian alliance', '**1894**.', 'fact', 1],
  ['Alsace-Lorraine', 'Taken by Germany in **1871**; returned to France in **1919**.', 'fact', 3],
  ['Revanche', 'French wish to recover Alsace-Lorraine.', 'definition', 1],
  ['Pan-Slavism', 'Unity of Slavs under Russian protection.', 'definition', 1],
  ['Moroccan crises', '**1905** and **1911**: Germany against France.', 'fact', 1],
  ['Dreadnought', 'British battleship of **1906**; began a naval race.', 'fact', 1],
  ['Conscription', 'Compulsory military service.', 'definition', 1],
  ['Why blocs were dangerous', 'A local quarrel could pull in all allies.', 'concept', 1],
  ['Bosnia', 'Annexed by Austria-Hungary in **1908**.', 'fact', 2],
  ['Sarajevo', '**28 June 1914**: Archduke **Franz Ferdinand** killed.', 'fact', 2],
  ['Assassin', '**Gavrilo Princip**, a Bosnian Serb nationalist.', 'fact', 2],
  ['Austria declares war on Serbia', '**28 July 1914**.', 'fact', 2],
  ['Britain enters the war', '**4 August 1914**, after Germany invaded **Belgium**.', 'fact', 2],
  ['Immediate vs long-term causes', 'Sarajevo was the spark; nationalism, imperialism, arms and blocs were the fuel.', 'exam-tip', 2],
  ['Armistice', '**11 November 1918**.', 'fact', 3],
  ['Treaty of Versailles', `Signed **28 June ${VERSAILLES}**.`, 'fact', 3],
  ['War-guilt clause', '**Article 231**: Germany accepts responsibility.', 'fact', 3],
  ['Reparations', 'Payments by Germany for war damage.', 'definition', 3],
  ['German army limit', `**${GERMAN_ARMY.toLocaleString('en-IN')}** men; no air force.`, 'fact', 3],
  ['Rhineland', '**Demilitarised**.', 'fact', 3],
  ['Saar', `Under the League for **${SAAR_YEARS}** years; coal mines to France.`, 'fact', 3],
  ['Polish Corridor', 'Gave Poland access to the sea; cut off East Prussia.', 'fact', 3],
  ['Danzig', '**Free city** under the League.', 'fact', 3],
  ['League of Nations: when and where', '**1920**, **Geneva**.', 'fact', 4],
  ['Who proposed the League?', '**President Woodrow Wilson** of the USA.', 'fact', 4],
  ['League objectives', 'Peace; collective security; arbitration; disarmament; cooperation; fair labour.', 'concept', 4],
  ['League weaknesses', 'No USA; no army; unanimity; seen as victors\' club.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The First World War',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_alliance_members', 'm_sarajevo_date', 'm_war_guilt', 'm_league_hq', 'm_dreadnought', 'ar_blocs', 's_sarajevo_two', 's_league_aims_two'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_causes', 'l_versailles'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The First World War',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_entente_year', 'm_alsace', 'm_morocco', 'm_ferdinand_who', 'm_belgium', 'm_army_limit', 'm_saar', 'm_polish_corridor', 'm_league_usa', 'ar_league_usa', 's_nationalism_two', 's_armament_two', 's_ultimatum_two', 's_military_terms', 's_league_weak'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_blocs', 'l_sarajevo', 'l_league'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-10-history-civics-ch14 only (causes; Sarajevo; Treaty of Versailles; League of Nations)',
    originality: 'every diary, letter, note and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no treaty text or historical person quoted, terms paraphrased',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); ${VERSAILLES} − ${SARAJEVO} = ${yearsBetween(SARAJEVO, VERSAILLES)}; ${ENTENTE} − ${ALLIANCE} = ${yearsBetween(ALLIANCE, ENTENTE)}; Saar 1920 + ${SAAR_YEARS} = 1935`,
    facts: 'Alsace-Lorraine 1871; Triple Alliance 1882; Franco-Russian alliance 1894; Entente Cordiale 1904; Dreadnought 1906; Triple Entente 1907; Bosnia annexed 1908; Moroccan crises 1905 and 1911; Sarajevo 28 June 1914 (Franz Ferdinand, Gavrilo Princip); Austria declares war 28 July 1914; Britain 4 August 1914 (Belgium, 1839 guarantee); Italy neutral 1914, joined the Entente side 1915; armistice 11 November 1918; Versailles 28 June 1919 (Article 231, reparations, army 100,000, no air force, Rhineland, Alsace-Lorraine, Saar 15 years, Polish Corridor, Danzig, mandates); League 1920, Geneva, Wilson, USA never joined, PCIJ at The Hague, ILO',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
