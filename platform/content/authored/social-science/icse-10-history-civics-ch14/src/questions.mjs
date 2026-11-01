// ICSE 10 History & Civics, ch14 The First World War — question bank. Every letter, diary, note and quiz scenario is
// imagined and written by SOYL and labelled as imagined; no textbook text, box or exercise and no specimen or
// board-paper item is reused (D-036). No speech, treaty text or writing of any historical person is quoted: terms and
// ideas are paraphrased. Wording about every country and people is neutral. Facts are stable, widely taught dates and
// names, listed for review in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1871, 'Alsace-Lorraine taken by Germany'],
  [1882, 'Triple Alliance'],
  [1894, 'Franco-Russian alliance'],
  [1904, 'Entente Cordiale'],
  [1906, 'HMS Dreadnought launched'],
  [1907, 'Triple Entente'],
  [1908, 'Austria-Hungary annexes Bosnia'],
  [1911, 'Second Moroccan crisis'],
  [1914, 'Sarajevo; war begins'],
  [1918, 'Armistice, 11 November'],
  [1919, 'Treaty of Versailles, 28 June'],
  [1920, 'League of Nations begins'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const yearsBetween = (a, b) => b - a;
export const ALLIANCE = 1882;
export const ENTENTE = 1907;
export const SARAJEVO = 1914;
export const VERSAILLES = 1919;
export const SAAR_YEARS = 15;
export const GERMAN_ARMY = 100000;
assert.equal(yearsBetween(ALLIANCE, ENTENTE), 25);
assert.equal(yearsBetween(SARAJEVO, VERSAILLES), 5); // signed on the fifth anniversary of Sarajevo (28 June)
assert.equal(yearsBetween(1871, VERSAILLES), 48); // Alsace-Lorraine held by Germany from 1871 to 1919
assert.equal(1920 + SAAR_YEARS, 1935); // Saar plebiscite year

/** Two rival blocs, drawn as boxes (theme colours only). */
export function blocsSvg(alt, caption) {
  const s = new Svg(720, 300);
  s.rect(20, 20, 300, 230, { rx: 12, fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 2 });
  s.text(170, 44, 'Triple Alliance (1882)', { size: 14, bold: true, color: 'accent' });
  ['Germany', 'Austria-Hungary', 'Italy'].forEach((c, i) => {
    s.rect(70, 70 + i * 56, 200, 40, { rx: 8, fill: 'fill', color: 'muted', sw: 1.2 });
    s.text(170, 90 + i * 56, c, { size: 13 });
  });
  s.rect(400, 20, 300, 230, { rx: 12, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 2 });
  s.text(550, 44, 'Triple Entente (1907)', { size: 14, bold: true, color: 'blue' });
  ['Britain', 'France', 'Russia'].forEach((c, i) => {
    s.rect(450, 70 + i * 56, 200, 40, { rx: 8, fill: 'fill', color: 'muted', sw: 1.2 });
    s.text(550, 90 + i * 56, c, { size: 13 });
  });
  s.line(330, 135, 390, 135, { sw: 2, dash: true, color: 'red' });
  s.text(360, 120, 'rivalry', { size: 11, color: 'red' });
  s.text(360, 280, 'Schematic, drawn by SOYL', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** A horizontal timeline from 1865 to 1925 with labels in lanes. */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 800, H = 400, x0 = 40, x1 = 760, y = 200, a = 1865, b = 1925;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1870, 1880, 1890, 1900, 1910, 1920]) s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
  s.text(X(1870), y + 18, '1870', { size: 11, muted: true });
  s.text(X(1890), y + 18, '1890', { size: 11, muted: true });
  const lanes = [-34, 40, -66, 72, -98, 104, -130, 136, -34, 40, -162, 168];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 600 ? 'end' : px < 200 ? 'start' : 'middle';
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  return s.visual(alt, caption);
}

const BLOCS_ALT = 'Two boxes: the Triple Alliance of 1882 with Germany, Austria-Hungary and Italy, and the Triple Entente of 1907 with Britain, France and Russia, joined by a dashed line marked rivalry';

// ================================================================ t01 Causes
Q('m_alliance_members', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which three powers made up the Triple Alliance formed in 1882?',
  opts: ['Germany, Austria-Hungary and Italy', 'Britain, France and Russia', 'Germany, Russia and Italy', 'France, Italy and Austria-Hungary'],
  sol: 'The Triple Alliance (1882) joined Germany, Austria-Hungary and Italy. Britain, France and Russia formed the rival Triple Entente by 1907.',
}));
Q('m_entente_year', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Triple Entente was completed when Britain reached an understanding with Russia. In which year did this happen?',
  opts: ['1907', '1882', '1894', '1914'],
  sol: 'The Anglo-Russian understanding of 1907 completed the Entente. 1882 is the Triple Alliance, 1894 the Franco-Russian alliance, and 1914 the start of the war.',
}));
Q('m_alsace', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did many French people before 1914 want to recover Alsace-Lorraine?',
  opts: ['Germany had taken these provinces from France after the war of 1870–71', 'They had been sold by France to Britain', 'Russia had seized them in 1907', 'They were part of Austria-Hungary'],
  sol: 'Germany took Alsace-Lorraine after defeating France in 1870–71. The wish to win them back (often called revanche, meaning revenge) kept French–German hostility alive.',
}));
Q('m_panslav', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The idea that all Slav peoples of eastern and south-eastern Europe should stand together, with Russia as their protector, was called',
  opts: ['Pan-Slavism', 'Pan-Germanism', 'Imperialism', 'Militarism'],
  sol: 'Pan-Slavism sought the unity of Slav peoples under Russian protection, which brought Russia into conflict with Austria-Hungary in the Balkans. Pan-Germanism sought the union of German-speaking peoples.',
}));
Q('m_morocco', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The crises of 1905 and 1911 between Germany and France arose mainly over control of which North African country?',
  opts: ['Morocco', 'Egypt', 'Libya', 'Algeria'],
  sol: 'Both crises were over Morocco, where Germany challenged French influence. They show how rivalry for colonies (imperialism) brought the powers close to war.',
}));
Q('m_dreadnought', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Britain launched a powerful new battleship called the Dreadnought in 1906. Which cause of the war does the race that followed best illustrate?',
  opts: ['The armament race', 'The Sarajevo crisis', 'The formation of the League of Nations', 'The war-guilt clause'],
  sol: 'Germany answered by building similar ships, and each side kept adding warships. This naval rivalry is part of the armament race before 1914.',
}));
Q('m_bloc_effect', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'How did the division of Europe into two armed camps make a general war more likely?',
  opts: ['A quarrel between two states could draw in their allies, turning a local conflict into a wider war', 'It forced every country to disarm completely', 'It removed all colonial rivalries', 'It placed Europe under a single government'],
  sol: 'Because each power was bound to support its partners, a dispute in one corner (such as the Balkans) could pull in all the allies. The blocs did not lead to disarmament or remove rivalries.',
}));
Q('m_italy_shift', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Italy was a member of the Triple Alliance, yet it did not fight beside Germany in 1914. Which statement best explains this?',
  opts: ['Italy stayed neutral in 1914 and joined the Entente side in 1915, as its own claims against Austria-Hungary mattered more to it', 'Italy had joined the Triple Entente in 1882', 'Italy had no army in 1914', 'Italy was occupied by France in 1914'],
  sol: 'Italy declared neutrality in 1914 and entered the war on the Entente side in 1915, hoping to gain lands held by Austria-Hungary. The other options are untrue.',
}));
Q('m_militarism', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Before 1914, most continental powers made young men serve in the army for a fixed period. This system is called',
  opts: ['conscription', 'reparation', 'mandate', 'plebiscite'],
  sol: 'Compulsory military service is conscription. It gave Europe huge standing armies ready for war, part of the armament race. Reparation, mandate and plebiscite belong to the peace settlement.',
}));
Q('ar_blocs', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A local quarrel in the Balkans in 1914 grew into a war involving most of Europe.',
  r: 'The great powers were divided into two alliances whose members had promised to support one another.',
  sol: 'Both are true, and R explains A: alliance obligations drew Russia, Germany, France and Britain into the dispute between Austria-Hungary and Serbia.',
}));
Q('ar_naval', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Britain and Germany competed to build larger battleships before 1914.',
  r: 'Germany had taken Alsace-Lorraine from France in 1871.',
  sol: 'Both statements are true, but R does not explain A. The naval race grew from Britain\'s wish to keep its sea power and Germany\'s naval ambitions; Alsace-Lorraine was a French–German grievance.',
}));
Q('fb_alliance_year', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Germany, Austria-Hungary and Italy formed the Triple Alliance in the year ___.',
  acc: [['1882']],
  sol: 'The Triple Alliance dates from 1882.',
}));
Q('s_nationalism_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two examples of aggressive nationalism in Europe that raised tension before 1914.',
  model: '1. **French revanchism:** France wanted to win back **Alsace-Lorraine**, taken by Germany in **1871**.\n2. **Pan-Slavism** in Russia clashed with **Austria-Hungary** over the Balkan Slavs, while **Pan-Germanism** pressed for German dominance.',
  sol: 'Any two clear examples.',
  scheme: [['First example', 1], ['Second example', 1]],
}));
Q('s_imperialism_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain in two points how competition for colonies added to the danger of war before 1914.',
  model: '1. Powers such as **Germany**, which had fewer colonies, demanded a larger share, angering **Britain** and **France**, which held the most.\n2. Disputes such as the **Moroccan crises** of **1905** and **1911** brought the powers to the **edge of war**.',
  sol: 'Two clear points.',
  scheme: [['Demand for colonies', 1], ['A crisis over colonies', 1]],
}));
Q('s_armament_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of the armament race in Europe before 1914.',
  model: '1. **Naval rivalry:** Britain and Germany raced to build **Dreadnought**-type battleships after **1906**.\n2. **Large armies:** the continental powers used **conscription** and kept millions of trained soldiers ready.',
  sol: 'Two features.',
  scheme: [['Naval rivalry', 1], ['Large armies or conscription', 1]],
}));
Q('s_entente_steps', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Name the steps by which Britain, France and Russia came together in the Triple Entente.',
  model: '1. **France and Russia** formed an alliance in **1894**, and **Britain and France** settled their differences in the **Entente Cordiale** of **1904**.\n2. The **Anglo-Russian** understanding of **1907** completed the Triple Entente.',
  sol: 'Three agreements in order.',
  scheme: [['1894 and 1904', 1], ['1907 completes it', 1]],
}));
Q('s3_four_causes', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did nationalism, imperialism and the armament race together prepare the ground for the First World War? Give one point on each.',
  model: '1. **Nationalism:** French anger over **Alsace-Lorraine** and the clash of **Pan-Slavism** with Austria-Hungary kept old enmities alive.\n2. **Imperialism:** rivalry for **colonies**, as in the **Moroccan crises**, made the powers suspicious of one another.\n3. **Armament race:** huge **armies** and the **naval race** made leaders ready to use force and spread fear.',
  sol: 'One point for each cause.',
  scheme: [['Nationalism', 1], ['Imperialism', 1], ['Armament race', 1]],
}));
Q('l_causes', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the long-term causes of the First World War.\n\n(i) Explain how aggressive nationalism created tension in Europe. **[3]**\n(ii) How did imperialism add to the rivalry among the great powers? **[3]**\n(iii) Describe the armament race and explain why it made war more likely. **[4]**',
  model: '(i) France wished to recover **Alsace-Lorraine**, lost to Germany in **1871**. **Pan-Slavism** made Russia the protector of Balkan Slavs, against **Austria-Hungary**, while **Pan-Germanism** encouraged German ambitions. Each nation placed its own greatness above peace.\n\n(ii) The powers competed for **colonies** for raw materials and markets. **Germany** wanted a larger share than it held, which alarmed **Britain** and **France**. Crises over **Morocco** in **1905** and **1911** brought them close to war.\n\n(iii) The continental powers built huge **conscript armies**, and Britain and Germany raced to build battleships after the **Dreadnought** of **1906**. Military plans assumed quick mobilisation. This spread **fear and suspicion**, encouraged leaders to rely on **force**, and meant that once a crisis began, armies were ready to march at once.',
  sol: 'Nationalism; imperialism; armament race and its effect.',
  scheme: [['(i) Alsace-Lorraine', 1], ['(i) Pan-Slavism and Pan-Germanism', 2], ['(ii) Colonial rivalry', 2], ['(ii) Moroccan crises', 1], ['(iii) Armies and navies', 2], ['(iii) Why it made war likely', 2]],
}));
Q('l_blocs', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Study the diagram of the two rival blocs drawn by SOYL and answer the questions.\n\n(i) Name the two blocs shown and the members of each. **[3]**\n(ii) Trace how Britain moved away from its earlier isolation to join one bloc. **[3]**\n(iii) Explain how the existence of the two blocs turned the Sarajevo crisis into a world war. **[4]**',
  model: '(i) The **Triple Alliance** (**1882**): **Germany, Austria-Hungary and Italy**. The **Triple Entente** (completed **1907**): **Britain, France and Russia**.\n\n(ii) Britain had long stayed out of European alliances. Alarmed by **German** naval and colonial ambitions, it settled its differences with **France** in the **Entente Cordiale** (**1904**) and with **Russia** in **1907**, completing the Entente.\n\n(iii) When **Austria-Hungary** declared war on **Serbia**, **Russia** mobilised to support the Serbs. **Germany**, Austria-Hungary\'s ally, declared war on **Russia** and then on **France**, Russia\'s ally, and invaded **Belgium**. **Britain** then declared war on Germany. Alliance promises drew one power after another into what began as a **local** quarrel.',
  sol: 'Blocs; British realignment; chain of alliances.',
  scheme: [['(i) Two blocs named', 1], ['(i) Members', 2], ['(ii) Britain\'s isolation and fears', 1], ['(ii) 1904 and 1907', 2], ['(iii) Russia and Germany drawn in', 2], ['(iii) France, Belgium and Britain', 2]],
  assets: [blocsSvg(BLOCS_ALT, 'Rival blocs of Europe before 1914 (schematic, drawn by SOYL).')],
}));

// ================================================================ t02 Sarajevo
Q('m_sarajevo_date', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On which date was Archduke Franz Ferdinand assassinated at Sarajevo?',
  opts: ['28 June 1914', '4 August 1914', '11 November 1918', '28 June 1919'],
  sol: 'The assassination took place on 28 June 1914. Britain entered the war on 4 August 1914, the armistice was signed on 11 November 1918, and the Treaty of Versailles on 28 June 1919.',
}));
Q('m_ferdinand_who', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Archduke Franz Ferdinand, killed at Sarajevo, was the heir to the throne of which empire?',
  opts: ['Austria-Hungary', 'Germany', 'Russia', 'the Ottoman Empire'],
  sol: 'Franz Ferdinand was heir to the throne of Austria-Hungary. His murder by a young Bosnian Serb gave Austria-Hungary its reason to act against Serbia.',
}));
Q('m_princip', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Who fired the shots that killed the Archduke and his wife at Sarajevo?',
  opts: ['Gavrilo Princip', 'Kaiser William II', 'Georges Clemenceau', 'Woodrow Wilson'],
  sol: 'Gavrilo Princip, a young Bosnian Serb nationalist, fired the shots. William II was the German emperor; Clemenceau and Wilson were leaders at the peace conference.',
}));
Q('m_bosnia_grievance', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why were Serb nationalists hostile to Austria-Hungary at the time of the Archduke\'s visit to Sarajevo?',
  opts: ['Austria-Hungary had annexed Bosnia in 1908, where many Serbs lived, blocking Serb hopes of uniting them', 'Austria-Hungary had joined the Triple Entente', 'Austria-Hungary had refused to trade with Britain', 'Austria-Hungary had founded the League of Nations'],
  sol: 'The annexation of Bosnia in 1908 angered Serbia and Serb nationalists, who wanted Bosnia\'s Serbs to join a Serb state. The other options are untrue.',
}));
Q('m_austria_declares', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What did Austria-Hungary do on 28 July 1914, after Serbia did not accept its ultimatum in full?',
  opts: ['It declared war on Serbia', 'It signed a peace treaty with Serbia', 'It joined the Triple Entente', 'It asked the League of Nations to judge the case'],
  sol: 'Austria-Hungary declared war on Serbia on 28 July 1914. The League of Nations did not yet exist.',
}));
Q('m_belgium', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Germany\'s plan to attack France required its armies to march through a neutral country. Which country was it, and whose entry into the war followed?',
  opts: ['Belgium; Britain declared war on Germany', 'Switzerland; Italy declared war on Germany', 'Netherlands; Russia declared war on Germany', 'Denmark; the USA declared war on Germany'],
  sol: 'German troops entered neutral Belgium, whose neutrality Britain had guaranteed. Britain declared war on Germany on 4 August 1914.',
}));
Q('m_russia_mobilise', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why did Russia begin to mobilise its army after Austria-Hungary declared war on Serbia?',
  opts: ['Russia saw itself as the protector of the Slav peoples, including the Serbs', 'Russia was a member of the Triple Alliance', 'Russia had been promised Alsace-Lorraine', 'Russia wanted to help Austria-Hungary'],
  sol: 'As protector of the Slavs (Pan-Slavism), Russia moved to support Serbia. That brought Germany, Austria-Hungary\'s ally, into the crisis.',
}));
Q('ar_sarajevo_spark', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The assassination at Sarajevo is called the immediate cause of the First World War.',
  r: 'Britain had launched the Dreadnought in 1906.',
  sol: 'Both are true, but R does not explain A. Sarajevo is called the immediate cause because it set off the chain of declarations in July–August 1914; the Dreadnought belongs to the long-term naval race.',
}));
Q('ar_belgium', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Britain declared war on Germany in August 1914.',
  r: 'Germany had attacked the British Isles in July 1914.',
  sol: 'A is true. R is false: Germany had not attacked Britain; Britain entered the war after Germany invaded neutral Belgium.',
}));
Q('tf_princip_serbian_army', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Archduke was killed by an officer of the regular Serbian army acting on official orders.',
  sol: 'False. He was killed by Gavrilo Princip, a young Bosnian Serb nationalist linked with a secret society, not an officer acting on official orders. Austria-Hungary nevertheless blamed Serbia.',
}));
Q('s_sarajevo_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who was killed at Sarajevo in June 1914, and why did Austria-Hungary hold Serbia responsible?',
  model: '**Archduke Franz Ferdinand**, heir to the Austro-Hungarian throne, and his wife were killed on **28 June 1914**. Austria-Hungary blamed **Serbia** because the assassin was a **Serb nationalist** and Serbia was seen as encouraging such groups.',
  sol: 'Victim and date; reason for blame.',
  scheme: [['Who was killed and when', 1], ['Why Serbia was blamed', 1]],
}));
Q('s_ultimatum_two', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did Austria-Hungary\'s ultimatum to Serbia lead to war within a week?',
  model: 'Austria-Hungary sent Serbia **harsh demands** that touched its **independence**. Serbia **accepted most** but not all of them, so Austria-Hungary **declared war** on **28 July 1914**.',
  sol: 'Ultimatum; partial acceptance; declaration.',
  scheme: [['Harsh demands', 1], ['Declaration of war', 1]],
}));
Q('s3_chain', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three steps by which the quarrel between Austria-Hungary and Serbia spread to the great powers in 1914.',
  model: '1. **Russia** began to mobilise to protect **Serbia** and the Slavs.\n2. **Germany**, Austria-Hungary\'s ally, declared war on **Russia** and then on **France**, Russia\'s ally.\n3. German armies marched through neutral **Belgium**, and **Britain** declared war on Germany on **4 August 1914**.',
  sol: 'Russia; Germany against Russia and France; Belgium and Britain.',
  scheme: [['Russia mobilises', 1], ['Germany declares war', 1], ['Belgium and Britain', 1]],
}));
Q('l_sarajevo', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'With reference to the outbreak of war in 1914, answer the following.\n\n(i) Why was the Balkan region tense in the years before 1914? **[3]**\n(ii) Describe the event at Sarajevo on 28 June 1914. **[3]**\n(iii) Explain how this event led to a general European war within six weeks. **[4]**',
  model: '(i) **Austria-Hungary** had annexed **Bosnia** in **1908**, angering **Serbia**, which hoped to unite the region\'s Serbs. **Russia**, the protector of the Slavs, backed Serbia, while **Germany** backed Austria-Hungary, so the Balkans became a meeting point of great-power rivalry.\n\n(ii) **Archduke Franz Ferdinand**, heir to the throne of Austria-Hungary, and his wife were **shot dead** at **Sarajevo**, the capital of Bosnia, by **Gavrilo Princip**, a young **Bosnian Serb** nationalist.\n\n(iii) Austria-Hungary blamed **Serbia**, sent it an **ultimatum** and declared war on **28 July 1914**. **Russia** mobilised; **Germany** declared war on Russia and **France**, and invaded **Belgium**; **Britain** declared war on **4 August 1914**. The **alliance system** turned a local crisis into a general war.',
  sol: 'Balkan tension; the assassination; the chain to general war.',
  scheme: [['(i) Bosnia and Serbia', 2], ['(i) Russia and Germany', 1], ['(ii) Victim, place, assassin', 3], ['(iii) Ultimatum and declaration', 1], ['(iii) Russia, Germany, France, Belgium', 2], ['(iii) Britain and the alliance system', 1]],
}));

// ================================================================ t03 Treaty of Versailles
Q('m_versailles_date', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Treaty of Versailles with Germany was signed on 28 June of which year?',
  opts: ['1919', '1918', '1920', '1914'],
  sol: 'It was signed on 28 June 1919, exactly five years after Sarajevo. The armistice ended the fighting in November 1918.',
}));
Q('m_war_guilt', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under which article of the Treaty of Versailles was Germany made to accept responsibility for the war?',
  opts: ['Article 231, the war-guilt clause', 'Article 32, the right to remedies', 'Article 1 of the League Covenant', 'Article 370'],
  sol: 'Article 231, the war-guilt clause, placed responsibility for the war and its losses on Germany and its allies. It was the basis for reparations.',
}));
Q('m_reparations', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The payments that Germany was required to make to the Allies for war damage were called',
  opts: ['reparations', 'mandates', 'tariffs', 'subsidies'],
  sol: 'Reparations were payments for war damage, linked to the war-guilt clause. Mandates were former colonies placed under other powers.',
}));
Q('m_army_limit', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'To what size did the Treaty of Versailles limit the German army?',
  opts: ['100,000 men', '1,000,000 men', '10,000 men', 'No limit was set'],
  sol: 'The German army was limited to 100,000 men, conscription was banned, and Germany was forbidden an air force.',
}));
Q('m_saar', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'What did the Treaty of Versailles decide about the Saar coal-mining region?',
  opts: ['It was placed under the League of Nations for 15 years, with its coal mines given to France', 'It was given permanently to Poland', 'It was made a free city like Danzig', 'It was handed to Italy'],
  sol: 'The Saar was run by the League of Nations for 15 years, and France received its coal mines; afterwards its people would vote on their future.',
}));
Q('m_rhineland', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The German region along the Rhine bordering France was to have no German troops or fortifications. This term of the treaty is called',
  opts: ['demilitarisation of the Rhineland', 'annexation of the Saar', 'creation of the Polish Corridor', 'the war-guilt clause'],
  sol: 'The Rhineland was demilitarised, protecting France from a sudden German attack.',
}));
Q('m_polish_corridor', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A student looking at a schematic map notices that East Prussia is cut off from the rest of Germany after 1919. Which term of the treaty explains this?',
  opts: ['The Polish Corridor gave Poland a strip of land to the sea, separating East Prussia from Germany', 'The Rhineland was demilitarised', 'Alsace-Lorraine was returned to France', 'The Saar was placed under the League'],
  sol: 'The Polish Corridor gave the new Poland access to the Baltic Sea, which separated East Prussia from the rest of Germany. The other terms concern Germany\'s western border.',
}));
Q('m_colonies_mandates', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What happened to Germany\'s overseas colonies under the peace settlement?',
  opts: ['They were taken away and given to the Allies to govern as mandates under the League', 'They were returned to Germany after five years', 'They were made into independent states at once', 'They were sold to the United States'],
  sol: 'Germany lost all its colonies. They were placed under Allied powers as mandates supervised by the League of Nations.',
}));
Q('m_treaty_feeling', mcq({
  t: 3, d: 3, c: 'evaluation',
  stem: 'Which statement best describes how many Germans regarded the Treaty of Versailles?',
  opts: ['As a dictated peace imposed on Germany without negotiation, which they resented', 'As a generous settlement that left Germany stronger', 'As a treaty that Germany had written itself', 'As an agreement that ended reparations'],
  sol: 'Germany was not allowed to negotiate the terms, and many Germans saw the treaty as a dictated peace; this resentment later fed extreme nationalism. The other options are untrue.',
}));
Q('ar_alsace_return', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Treaty of Versailles returned Alsace-Lorraine to France.',
  r: 'Germany had taken these provinces from France in 1871.',
  sol: 'Both are true, and R explains A: the treaty reversed Germany\'s gain of 1871 by giving the provinces back to France.',
}));
Q('ar_airforce', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The Treaty of Versailles allowed Germany to keep a large air force.',
  r: 'The treaty aimed to make Germany too weak to threaten its neighbours.',
  sol: 'A is false: Germany was forbidden to have an air force. R is true: the military terms aimed to keep Germany weak.',
}));
Q('tf_versailles_negotiated', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? German delegates took a full part in drafting the terms of the Treaty of Versailles.',
  sol: 'False. The terms were drawn up by the victorious Allies; Germany was presented with them and had to sign.',
}));
Q('fb_war_guilt', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The clause of the Treaty of Versailles that placed responsibility for the war on Germany is known as the war-___ clause.',
  acc: [['guilt']],
  sol: 'It is the war-guilt clause (Article 231).',
}));
Q('s_military_terms', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two military terms imposed on Germany by the Treaty of Versailles.',
  model: '1. The German **army** was limited to **100,000** men and **conscription** was banned.\n2. Germany was allowed **no air force**, only a **small navy**, and the **Rhineland** was **demilitarised**.',
  sol: 'Any two military terms.',
  scheme: [['First term', 1], ['Second term', 1]],
}));
Q('s_territorial_two', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Mention two losses of territory that Germany suffered under the Treaty of Versailles.',
  model: '1. **Alsace-Lorraine** was returned to **France**.\n2. The **Polish Corridor** was given to **Poland**, cutting off **East Prussia**; Germany also lost all its **colonies**, which became **mandates**.',
  sol: 'Any two territorial losses.',
  scheme: [['First loss', 1], ['Second loss', 1]],
}));
Q('s_saar_danzig', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What arrangements did the Treaty of Versailles make for the Saar and for Danzig?',
  model: '**Saar:** placed under the **League of Nations** for **15 years**, with its **coal mines** given to **France**.\n**Danzig:** made a **free city** under the **League**, so that **Poland** could use the port.',
  sol: 'Saar; Danzig.',
  scheme: [['Saar', 1], ['Danzig', 1]],
}));
Q('s_resentment', short({
  t: 3, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Why did many Germans resent the Treaty of Versailles? Give two reasons.',
  model: '1. It was a **dictated** peace: Germany had **no say** in its terms.\n2. The **war-guilt** clause and heavy **reparations**, together with losses of **land** and **colonies**, were seen as **humiliating** and harsh.',
  sol: 'Two reasons.',
  scheme: [['Dictated peace', 1], ['Guilt, reparations or losses', 1]],
}));
Q('s3_terms_three', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Classify the terms of the Treaty of Versailles into military, territorial and financial, giving one example of each.',
  model: '1. **Military:** the German army was limited to **100,000** men, with **no air force**.\n2. **Territorial:** **Alsace-Lorraine** was returned to **France**, and the **Polish Corridor** went to Poland.\n3. **Financial:** Germany had to pay **reparations** for war damage, based on the **war-guilt** clause.',
  sol: 'One term in each class.',
  scheme: [['Military', 1], ['Territorial', 1], ['Financial', 1]],
}));
Q('l_versailles', long({
  t: 3, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'With reference to the Treaty of Versailles, answer the following.\n\n(i) When and where was the treaty signed, and what was the war-guilt clause? **[3]**\n(ii) State three territorial terms of the treaty. **[3]**\n(iii) Describe the military terms and explain why Germany found the treaty hard to accept. **[4]**',
  model: '(i) The treaty was signed on **28 June 1919** in the **Palace of Versailles**, near Paris. Under the **war-guilt clause** (**Article 231**), Germany had to accept **responsibility** for the war and the losses it caused, which became the basis for **reparations**.\n\n(ii) **Alsace-Lorraine** was returned to **France**. The **Polish Corridor** gave Poland access to the sea, separating **East Prussia** from Germany, and **Danzig** became a **free city** under the League. Germany\'s **colonies** were given to the Allies as **mandates**.\n\n(iii) The army was limited to **100,000** men, conscription was banned, and Germany was allowed **no air force** and only a **small navy**; the **Rhineland** was **demilitarised**. Germany found the treaty hard to accept because it was **dictated** without negotiation, the **guilt** clause and **reparations** were humiliating, and the loss of land and colonies left a lasting **grievance**.',
  sol: 'Date, place, war guilt; territorial terms; military terms and resentment.',
  scheme: [['(i) Date and place', 1], ['(i) War-guilt clause', 2], ['(ii) Three territorial terms', 3], ['(iii) Military terms', 2], ['(iii) Reasons for resentment', 2]],
}));
Q('l_versailles_evaluate', long({
  t: [3, 4], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the peace settlement after the First World War.\n\n(i) What did the Allies hope to achieve by the military terms imposed on Germany? **[3]**\n(ii) Explain how the arrangements for the Saar and the Rhineland reflected French concerns. **[3]**\n(iii) "The peace settlement contained the seeds of future conflict." Give four reasons that support this view. **[4]**',
  model: '(i) The Allies wanted to make Germany **too weak to attack** its neighbours again. Limiting the army to **100,000** men, banning **conscription** and an **air force**, and allowing only a **small navy** were meant to remove its power to wage an offensive war.\n\n(ii) France had been invaded twice in fifty years. Demilitarising the **Rhineland** kept German troops away from the French border, and placing the **Saar** under the **League** for **15 years** with its **coal mines** given to France compensated France for war damage to its own mines.\n\n(iii) Germany saw the treaty as a **dictated peace**; the **war-guilt** clause and **reparations** created bitterness; the **Polish Corridor** and **Danzig** left Germans under foreign rule and became future disputes; and the **League** that was to keep the peace lacked the **USA** and had **no army** of its own.',
  sol: 'Aims of military terms; French security; seeds of conflict.',
  scheme: [['(i) Weaken Germany', 1], ['(i) Military limits', 2], ['(ii) Rhineland', 1], ['(ii) Saar', 2], ['(iii) Four reasons', 4]],
}));

// ================================================================ t04 League of Nations
Q('m_league_hq', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Where were the headquarters of the League of Nations?',
  opts: ['Geneva', 'New York', 'Paris', 'London'],
  sol: 'The League had its headquarters at Geneva in Switzerland. New York is the headquarters of the United Nations.',
}));
Q('m_league_year', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In which year did the League of Nations begin its work?',
  opts: ['1920', '1919', '1918', '1945'],
  sol: 'The League began work in January 1920, after the Treaty of Versailles came into force. Its Covenant was written into the peace treaties of 1919; 1945 is the year of the United Nations.',
}));
Q('m_league_usa', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which major power, whose President had proposed an association of nations, never joined the League of Nations?',
  opts: ['the United States of America', 'Britain', 'France', 'Italy'],
  sol: 'President Woodrow Wilson of the USA had proposed a league of nations, but the US Senate did not ratify the treaty, so the USA never joined. Britain, France and Italy were members.',
}));
Q('m_collective_security', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The League\'s principle that an attack on one member should be treated as a concern of all members is called',
  opts: ['collective security', 'balance of power', 'reparation', 'appeasement'],
  sol: 'Collective security meant that members would act together against an aggressor. Appeasement was the later policy of giving in to demands.',
}));
Q('m_league_dispute', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Two imagined neighbouring states quarrel over a border in 1925. According to its objectives, what would the League of Nations first urge them to do?',
  opts: ['Settle the dispute peacefully by arbitration or through the League instead of going to war', 'Form rival military alliances', 'Increase their armies', 'Ask one of them to annex the other'],
  sol: 'The League aimed to settle disputes peacefully, by arbitration, judicial settlement or enquiry by its Council, instead of war. The other options are exactly what it tried to prevent.',
}));
Q('m_league_labour', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A factory-workers\' union in an imagined member state wants international standards on working hours. Which aim of the League of Nations matches its demand?',
  opts: ['Securing fair and humane conditions of labour', 'Collecting reparations from Germany', 'Demilitarising the Rhineland', 'Building alliances against rival powers'],
  sol: 'One aim of the League was to secure fair and humane conditions of work, carried out through the International Labour Organisation. The other options are not League aims.',
}));
Q('ar_league_usa', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The League of Nations was weakened from the start.',
  r: 'The United States, one of the strongest powers, did not join it.',
  sol: 'Both are true, and R explains A: without the USA the League lacked a major power to support its decisions.',
}));
Q('ar_league_army', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The League of Nations aimed to maintain peace through collective security.',
  r: 'The League had a large permanent army of its own to punish aggressors.',
  sol: 'A is true. R is false: the League had no army of its own and depended on members to act together.',
}));
Q('tf_covenant', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Covenant of the League of Nations formed part of the peace treaties of 1919, including the Treaty of Versailles.',
  sol: 'True. The Covenant, the League\'s founding document, was included in the peace treaties of 1919.',
}));
Q('s_league_aims_two', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Write two aims for which the League of Nations was set up after the war of 1914–18.',
  model: '1. To **maintain peace** through **collective security**, so that members act together against an aggressor.\n2. To settle disputes by **arbitration** and to promote **disarmament** and **international cooperation**.',
  sol: 'Any two recognised aims.',
  scheme: [['First aim', 1], ['Second aim', 1]],
}));
Q('s_league_weak', short({
  t: 4, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Give two reasons why the League of Nations was weak from its early years.',
  model: '1. The **USA** never joined, and some major powers were **absent** at times.\n2. It had **no army** of its own and depended on members, who often put their **own interests** first.',
  sol: 'Two reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_league_formation', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the formation of the League of Nations: who proposed it, when it began and where it was based.',
  model: '1. It was proposed by **President Woodrow Wilson** of the **USA** as one of his peace aims.\n2. Its **Covenant** was written into the **peace treaties of 1919**, and it began work in **January 1920**.\n3. Its headquarters were at **Geneva**, Switzerland.',
  sol: 'Proposal; beginning; headquarters.',
  scheme: [['Proposed by Wilson', 1], ['Covenant and 1920', 1], ['Geneva', 1]],
}));
Q('l_league', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'With reference to the League of Nations, answer the following.\n\n(i) How did the League of Nations come into being? **[3]**\n(ii) State three of its objectives. **[3]**\n(iii) Explain four weaknesses that limited the League\'s ability to keep the peace. **[4]**',
  model: '(i) The idea of an **association of nations** was put forward by **President Woodrow Wilson** of the USA. Its **Covenant** was included in the **peace treaties of 1919**, and the League began work in **January 1920**, with its headquarters at **Geneva**.\n\n(ii) To **maintain peace** through **collective security**; to settle disputes by **arbitration** and **peaceful** means; and to promote **disarmament**, **international cooperation** and fair **conditions of labour**.\n\n(iii) The **USA** never joined; **Germany** and the **Soviet Union** were not members at first; the League had **no army** and relied on members to act; and decisions of its Assembly and Council needed **unanimity**, so action was slow.',
  sol: 'Formation; objectives; weaknesses.',
  scheme: [['(i) Wilson and the Covenant', 2], ['(i) 1920 and Geneva', 1], ['(ii) Three objectives', 3], ['(iii) Four weaknesses', 4]],
}));
Q('l_results', long({
  t: [3, 4], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the results of the First World War.\n\n(i) When and how did the fighting come to an end? **[3]**\n(ii) State three ways in which the peace settlement weakened Germany. **[3]**\n(iii) Why was a League of Nations set up, and how was it meant to prevent another war? **[4]**',
  model: '(i) The fighting ended with an **armistice** signed on **11 November 1918**, after Germany\'s armies were exhausted and its allies had collapsed. The peace terms with Germany were set out in the **Treaty of Versailles**, signed on **28 June 1919**.\n\n(ii) Germany lost **Alsace-Lorraine**, the **Polish Corridor** and all its **colonies**; its army was cut to **100,000** men with **no air force**; and it had to pay **reparations** under the **war-guilt** clause.\n\n(iii) The war had shown the danger of rival **alliances** and the **armament race**. The League was meant to replace them with **collective security**: members would act together against an aggressor, settle disputes by **arbitration**, and work for **disarmament** and **international cooperation**, so that another general war could be avoided.',
  sol: 'End of fighting; weakening of Germany; purpose of the League.',
  scheme: [['(i) Armistice date', 1], ['(i) Treaty of Versailles', 2], ['(ii) Three ways', 3], ['(iii) Why the League', 2], ['(iii) How it would keep peace', 2]],
}));

// ================================================================ cross-topic
Q('match_ch14', match({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term from the story of the First World War with its meaning.',
  pairs: [
    ['Revanche', 'French wish to recover Alsace-Lorraine'],
    ['Dreadnought', 'British battleship of 1906 that set off a naval race'],
    ['Reparations', 'Payments by Germany for war damage'],
    ['Collective security', 'Members acting together against an aggressor'],
  ],
  sol: 'Revanche was French revenge for 1871; the Dreadnought began a new naval race; reparations were payments for war damage; collective security was the League\'s principle.',
}));
Q('ord_ch14', ord({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events connected with the First World War in the order in which they happened.',
  items: [
    'Formation of the Triple Alliance',
    'Completion of the Triple Entente',
    'Assassination at Sarajevo',
    'Signing of the Treaty of Versailles',
    'League of Nations begins its work',
  ],
  sol: 'Triple Alliance (1882), Triple Entente (1907), Sarajevo (1914), Versailles (1919), League begins (1920).',
}));
Q('l_timeline', long({
  t: [1, 2, 3, 4], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the timeline from 1871 to 1920 drawn by SOYL and answer the questions that follow.\n\n(i) Identify three events on the timeline before 1914 that show Europe dividing into rival camps or arming. **[3]**\n(ii) How many years separate the assassination at Sarajevo from the signing of the Treaty of Versailles? What was special about the date of the signing? **[3]**\n(iii) Using the events of 1871, 1919 and 1920, explain how the peace settlement tried to settle old quarrels and prevent new wars. **[4]**',
  model: `(i) **1882:** the **Triple Alliance** of Germany, Austria-Hungary and Italy. **1906:** the **Dreadnought** launched, starting a naval race. **1907:** the **Triple Entente** of Britain, France and Russia completed.\n\n(ii) **${yearsBetween(SARAJEVO, VERSAILLES)} years** (${VERSAILLES} − ${SARAJEVO}). The treaty was signed on **28 June 1919**, exactly **five years** after the assassination of **28 June 1914**.\n\n(iii) In **1871** Germany had taken **Alsace-Lorraine** from France; the **1919** treaty returned it to **France**, settling an old French grievance, and limited Germany's **army** so that it could not attack again. In **1920** the **League of Nations** began work at **Geneva**, to replace rival alliances with **collective security** and to settle disputes by **arbitration** rather than war.`,
  sol: 'Three pre-1914 events; the gap and anniversary; 1871, 1919 and 1920.',
  scheme: [['(i) Three events', 3], ['(ii) Correct number of years', 1], ['(ii) The anniversary', 2], ['(iii) Alsace-Lorraine and the treaty', 2], ['(iii) The League', 2]],
  assets: [timelineSvg('Timeline from 1865 to 1925 marking: 1871 Alsace-Lorraine taken by Germany, 1882 Triple Alliance, 1894 Franco-Russian alliance, 1904 Entente Cordiale, 1906 HMS Dreadnought launched, 1907 Triple Entente, 1908 Austria-Hungary annexes Bosnia, 1911 second Moroccan crisis, 1914 Sarajevo and war begins, 1918 armistice on 11 November, 1919 Treaty of Versailles on 28 June, 1920 League of Nations begins', 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
}));

// ================================================================ source-based (imagined documents)
Q('sb_attache_diary', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a junior diplomat and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined junior diplomat at a European embassy, July 1914**\n\nThe news from the Bosnian capital has shaken every office. The heir to the old empire on the Danube is dead, shot in his motor car. This evening the ambassador said that Vienna will send Belgrade a note so severe that no proud state could accept all of it. If the Tsar stands by the Serbs, Berlin will stand by Vienna, and then Paris must stand by St Petersburg. "Every treaty we signed to keep the peace," he sighed, "may now carry us into war."',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Who is "the heir to the old empire on the Danube" who was killed?', model: '**Archduke Franz Ferdinand** of **Austria-Hungary**.', sol: 'The Archduke.', scheme: [['Franz Ferdinand', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What is the "note so severe" that Vienna will send to Belgrade?', model: 'The **ultimatum** from **Austria-Hungary** to **Serbia** (July 1914).', sol: 'The ultimatum.', scheme: [['Ultimatum to Serbia', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which long-term cause of the war does the ambassador\'s chain of capitals describe? Explain it briefly.', model: 'The **division of Europe into rival blocs**. Russia was bound to Serbia and France, Germany to Austria-Hungary, so a **local quarrel** could **draw in** all the allies.', sol: 'Alliance system.', scheme: [['Cause named', 1], ['Explanation', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the diary, explain why the events at Sarajevo are called the immediate cause of the war.', model: 'The killing gave **Austria-Hungary** a reason to act against **Serbia**; its **ultimatum** and declaration of war set off **Russian**, **German** and **French** moves within days, turning long tensions into **open war**.', sol: 'Spark of the war.', scheme: [['Austria acts against Serbia', 1], ['Chain to general war', 1]] }),
    ]),
  ],
}));
Q('sb_dock_letter', source({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined shipyard worker in a British port to his brother in Bombay, 1909**\n\nOur yard has never been busier. Since the great new battleship was launched three years ago, the government orders one heavy warship after another, and the papers say the Germans across the North Sea are doing the same. My foreman says that whoever has more of these ships will rule the seas and keep the colonies. Some of the men are glad of the wages; others say so many guns must one day be fired.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name "the great new battleship" launched about three years before the letter.', model: 'The **Dreadnought** (**1906**).', sol: 'HMS Dreadnought.', scheme: [['Dreadnought', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which cause of the First World War does the shipyard\'s work illustrate?', model: 'The **armament race**, especially the **naval rivalry** between **Britain** and **Germany**.', sol: 'Armament race.', scheme: [['Armament race', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the foreman\'s remark link the naval race with imperialism?', model: 'He says naval power would **rule the seas** and **keep the colonies**: a strong navy protected **trade routes** and **empires**, so the race for warships was tied to the **rivalry for colonies**.', sol: 'Navy and empire.', scheme: [['Sea power', 1], ['Link with colonies', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might the workers\' fear that "so many guns must one day be fired" be justified? Give two reasons.', model: 'A huge build-up of **arms** created **fear and suspicion** between rivals, and leaders with large forces were more ready to use **force** in a crisis, as happened in **1914**.', sol: 'Two reasons.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_geneva_notes', source({
  t: [3, 4], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from the imagined notes of a student visitor and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of an imagined Indian student visiting Switzerland, 1921**\n\nVisited the new international body in the lakeside city today. A clerk explained that member nations promise to settle quarrels by talking and judging, not fighting, and to stand together against any state that attacks another. I asked why the country whose President first proposed the body was not a member; he only shrugged. In the evening a German traveller told me bitterly that his country had been made to sign a peace it never discussed, and to pay for a war it alone was blamed for.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name the international body and the city described in the notes.', model: 'The **League of Nations**, at **Geneva**.', sol: 'League; Geneva.', scheme: [['League of Nations at Geneva', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which country is "the country whose President first proposed the body", and why was its absence important?', model: 'The **USA** (President **Woodrow Wilson**); without it the League **lacked a major power** to support its decisions.', sol: 'USA; weakness.', scheme: [['USA and the effect', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which two terms of the Treaty of Versailles does the German traveller complain about? Why did they cause resentment?', model: 'The **war-guilt** clause (Article 231) and **reparations**. Germans resented being **blamed alone** and made to **pay**, under a **dictated** peace they had **no part in negotiating**.', sol: 'Guilt and reparations.', scheme: [['Two terms named', 1], ['Reason for resentment', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which two objectives of the League does the clerk describe?', model: '**Peaceful settlement** of disputes by **arbitration** or judgement, and **collective security**, with members acting **together** against an **aggressor**.', sol: 'Two objectives.', scheme: [['Peaceful settlement', 1], ['Collective security', 1]] }),
    ]),
  ],
}));

// ================================================================ application items (imagined scenarios)
Q('m_app_poster', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined French poster of 1910 shows a map of two eastern provinces shaded in black, with the words "not forgotten". Which feeling does it express?',
  opts: ['Revanche: the wish to recover Alsace-Lorraine from Germany', 'Pan-Slavism: support for the Balkan Slavs', 'Pan-Germanism: the union of German speakers', 'Support for the League of Nations'],
  sol: 'Black-shaded eastern provinces stand for Alsace-Lorraine, lost to Germany in 1871; "not forgotten" expresses French revanche. The League did not exist in 1910.',
}));
Q('m_app_cartoon', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined drawing shows six men roped together on a mountain path; when one slips, all are pulled towards the edge. Which pre-war feature does it best represent?',
  opts: ['The alliance system binding the powers to each other', 'The League\'s collective security', 'The Treaty of Versailles', 'The Dreadnought race'],
  sol: 'Roped climbers pulled down together represent the alliance system, in which one power\'s quarrel dragged its allies into war.',
}));
Q('m_app_reparations', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined German shopkeeper in 1922 complains that heavy taxes and rising prices are partly due to payments the country must make abroad. Which term of the Treaty of Versailles is he blaming?',
  opts: ['Reparations', 'Demilitarisation of the Rhineland', 'The Polish Corridor', 'The free city of Danzig'],
  sol: 'Payments made abroad for war damage were reparations. The other terms are territorial or military.',
}));
Q('m_app_mandate', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined official report of 1923 says a former German territory in Africa is now governed by Britain under supervision. Under which arrangement was this done?',
  opts: ['The mandate system of the League of Nations', 'The Triple Entente', 'The Entente Cordiale', 'The war-guilt clause'],
  sol: 'Former German colonies were governed by Allied powers as mandates under League supervision.',
}));
Q('m_app_belgium_news', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined London newspaper of 5 August 1914 reports that "the promise of 1839 must be kept". Which event of 1914 is it referring to?',
  opts: ['Britain\'s entry into the war after Germany invaded neutral Belgium', 'The assassination at Sarajevo', 'Austria-Hungary\'s ultimatum to Serbia', 'The signing of the Treaty of Versailles'],
  sol: 'Britain had guaranteed Belgian neutrality by a treaty of 1839; the German invasion of Belgium brought Britain into the war on 4 August 1914.',
}));
Q('m_app_league_choice', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Two imagined members of the League in 1923 both claim a group of small islands. Which step would follow the League\'s methods most closely?',
  opts: ['Refer the dispute to the League Council or to the court at The Hague for a peaceful settlement', 'Send their navies to seize the islands', 'Sign a secret alliance against each other', 'Leave the League and settle it by force'],
  sol: 'The League asked members to submit disputes to its Council or to the Permanent Court of International Justice at The Hague instead of using force.',
}));
Q('s_app_essay_plan', short({
  t: [1, 2], d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A student writes that "Sarajevo alone caused the First World War". Correct this view in two points.',
  model: '1. Sarajevo was only the **immediate cause** or spark.\n2. The **long-term causes**—aggressive **nationalism**, **imperialism**, the **armament race** and the **rival blocs**—had already made Europe ready for war.',
  sol: 'Immediate vs long-term causes.',
  scheme: [['Immediate cause only', 1], ['Long-term causes', 1]],
}));

// ================================================================ deck checks (objective; not used in tests)
Q('m_chk_entente', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which country was NOT a member of the Triple Entente?',
  opts: ['Germany', 'Britain', 'France', 'Russia'],
  sol: 'Germany belonged to the Triple Alliance; Britain, France and Russia formed the Entente.',
}));
Q('tf_chk_morocco', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Germany and France came into conflict over Morocco in 1905 and 1911.',
  sol: 'True. The two Moroccan crises showed how colonial rivalry raised tension.',
}));
Q('fb_chk_princip', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The young Bosnian Serb who shot the Archduke at Sarajevo was Gavrilo ___.',
  acc: [['Princip']],
  sol: 'The assassin was Gavrilo Princip.',
}));
Q('m_chk_britain_date', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'On which date did Britain declare war on Germany?',
  opts: ['4 August 1914', '28 June 1914', '28 July 1914', '11 November 1918'],
  sol: 'Britain declared war on 4 August 1914, after Germany invaded Belgium.',
}));
Q('m_chk_versailles_place', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In which palace near Paris was the peace treaty with Germany signed in 1919?',
  opts: ['Versailles', 'Fontainebleau', 'Schönbrunn', 'Buckingham'],
  sol: 'The treaty was signed in the Palace of Versailles near Paris.',
}));
Q('tf_chk_alsace', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Treaty of Versailles returned Alsace-Lorraine to France.',
  sol: 'True. Germany had taken the provinces in 1871; the treaty returned them.',
}));
Q('fb_chk_geneva', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The headquarters of the League of Nations were at ___.',
  acc: [['Geneva']],
  sol: 'The League was based at Geneva.',
}));
Q('m_chk_usa', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Which of these powers never became a member of the League of Nations?',
  opts: ['the USA', 'Britain', 'France', 'Japan'],
  sol: 'The USA never joined; Britain, France and Japan were founding members.',
}));
