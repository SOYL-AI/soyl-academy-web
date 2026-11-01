// Build ICSE 10 History & Civics ch15 Rise of Dictatorships. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch15/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch15', 'social-science');
const { timelineSvg, compareSvg, EVENTS, MARCH_ON_ROME, CHANCELLOR, FUHRER, VERSAILLES, yearsBetween } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(yearsBetween(MARCH_ON_ROME, CHANCELLOR), 11);
assert.equal(yearsBetween(VERSAILLES, CHANCELLOR), 14);
assert.ok(EVENTS.some(([y]) => y === FUHRER));

// ---------------------------------------------------------------- figures
const TL_ALT = 'Timeline from 1917 to 1936 marking: 1919 fascist movement founded at Milan, 1922 March on Rome and Mussolini Prime Minister, 1923 hyperinflation in Germany, 1929 Great Depression begins, 1932 Nazis largest party in the Reichstag, 1933 Hitler Chancellor and the Enabling Act, 1934 Hitler becomes Fuhrer';
const vTimeline = timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.');
const vCompare = compareSvg('Three boxes: Fascism in Italy (state above all, corporate state), Nazism in Germany (racial doctrine, antisemitism), and in the middle the shared features: one-party state, extreme nationalism, cult of the leader, glorified war, anti-communism, no free press, youth groups', 'What the two ideologies shared, and where they differed (schematic, drawn by SOYL).');
const vRoute1 = flow('LR', ['Italy after the war', 'Mutilated victory', 'Economic crisis', 'Weak governments', 'Fear of communism', 'March on Rome, 1922'], 'Route map of Part 1: Italy after the war, the mutilated victory, economic crisis, weak governments, fear of communism, and the March on Rome in 1922', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Weimar Republic', 'Versailles resentment', 'Crises of 1923 and 1929', 'Hitler in power, 1933', 'Shared ideas of the dictatorships'], 'Route map of Part 2: the Weimar Republic, resentment of Versailles, the crises of 1923 and 1929, Hitler in power in 1933, and the shared ideas of the dictatorships', 'Part 2 at a glance');
const vItalyPost = table(['Fact', 'Effect'], [
  ['Italy joined the war in 1915 on the Allied side', 'Expected rewards in land'],
  ['Heavy losses of soldiers and money', 'Debts and grief'],
  ['Peace conference of 1919', 'Fiume and most of Dalmatia not given'],
  ['Feeling among nationalists', 'A "mutilated victory"'],
], 'Table of Italy after the First World War: it joined the Allies in 1915 expecting land, suffered heavy losses, was not given Fiume and most of Dalmatia in 1919, and nationalists spoke of a mutilated victory');
const vMutilated = table(['Hoped for', 'Result'], [
  ['Land on the Adriatic coast (Dalmatia)', 'Mostly not received'],
  ['The port of Fiume', 'Not received in 1919'],
  ['Honour as a victor', 'Felt ignored by the big powers'],
], 'Table of the mutilated victory: Italians hoped for Dalmatia, Fiume and honour as a victor, but mostly did not receive them and felt ignored', 'Why many Italians felt cheated.');
const vEconomy = table(['Problem', 'Who suffered'], [
  ['Unemployment', 'Returning soldiers and workers'],
  ['Rising prices', 'Wage earners and the middle class'],
  ['War debts', 'Government and taxpayers'],
  ['Strikes and land seizures', 'Owners of factories and estates'],
], 'Table of economic problems in Italy after 1918: unemployment of returning soldiers and workers, rising prices hurting wage earners and the middle class, war debts, and strikes and land seizures that alarmed owners');
const vWeakGovt = flow('TB', ['No party with a majority', 'Short-lived coalition governments', 'Problems left unsolved', 'People lose faith in parliament', 'Demand for a strong leader'], 'Flow of political weakness in Italy: no party had a majority, so short-lived coalitions followed one another, problems were left unsolved, people lost faith in parliament and wanted a strong leader', 'Weak governments, 1919–22.');
const vRedFear = table(['Event', 'Reaction'], [
  ['1919–20: strikes and factory occupations', 'Owners feared a revolution'],
  ['Peasants seized estates', 'Landowners alarmed'],
  ['Fascist movement founded at Milan, 1919', 'Squads (Blackshirts) attacked socialists'],
  ['Owners funded the squads', 'Fascists grew quickly'],
], 'Table of the fear of communism in Italy: strikes and factory occupations in 1919 and 1920 and land seizures alarmed owners; the fascist movement founded at Milan in 1919 used Blackshirt squads against socialists and was funded by owners');
const vMarch = flow('TB', ['October 1922: fascist squads gather to march on Rome', 'Government cannot resist', 'King Victor Emmanuel III refuses to use the army', 'Mussolini invited to become Prime Minister'], 'Flow of the March on Rome: in October 1922 fascist squads gathered to march on Rome, the government could not resist, King Victor Emmanuel III refused to use the army, and Mussolini was invited to become Prime Minister', 'Power without a majority.');
const vLeader = table(['Method', 'Example'], [
  ['Promise of order', 'Strong action against strikes and communism'],
  ['National greatness', 'Talk of a glorious Italy'],
  ['Spectacle', 'Uniforms, parades and symbols'],
  ['Title', 'Il Duce, the leader'],
], 'Table of how Mussolini won support: promising order against strikes and communism, talking of national greatness, using uniforms, parades and symbols, and the title Il Duce');
const vPlanIt = table(['Part', 'Marks', 'What to write'], [
  ['(i) Peace settlement', '3', 'Allied side 1915; Fiume and Dalmatia denied; mutilated victory'],
  ['(ii) Conditions', '3', 'Unemployment; prices and debts; weak coalitions'],
  ['(iii) Path to power', '4', 'Strikes; owners fund squads; March on Rome; King invites Mussolini'],
], 'Worked example table planning a ten-mark answer on the rise of Fascism: three points on the peace settlement, three on conditions, and four on the path to power', 'One point for each mark.');
const vClassify = table(['Clue in the source', 'Cause it shows'], [
  ['Brother still without work', 'Economic crisis'],
  ['Red flags on factory gates', 'Fear of communism'],
  ['Government changes often', 'Weak coalitions'],
  ['Men in black shirts paid by owners', 'Fascist squads backed by property owners'],
], 'Worked example table matching clues in an imagined source to causes: no work shows economic crisis, red flags show fear of communism, frequent changes of government show weak coalitions, and paid men in black shirts show fascist squads backed by owners', 'Read the clue, name the cause.');
const vSum1 = flow('TB', ['Mutilated victory: Fiume and Dalmatia', 'Economic crisis: jobs, prices, debts', 'Weak coalition governments', 'Fear of communism; Blackshirt squads', `March on Rome, ${MARCH_ON_ROME}: Mussolini Prime Minister`], `Summary flow of Part 1: the mutilated victory, economic crisis, weak coalitions, fear of communism with the Blackshirt squads, and the March on Rome in ${MARCH_ON_ROME} that made Mussolini Prime Minister`, 'Part 1 in five lines.');
const vWeimar = table(['Weakness', 'Why it mattered'], [
  ['Born in defeat (1919)', 'Linked by many Germans with the hated treaty'],
  ['Many parties', 'Unstable coalitions'],
  ['Article 48', 'President could rule by decree'],
  ['Enemies on left and right', 'Communists and nationalists both attacked it'],
], 'Table of the weaknesses of the Weimar Republic: born in defeat in 1919 and linked with the treaty, many parties and unstable coalitions, Article 48 allowing rule by decree, and enemies on the left and right');
const vVersailles = flow('TB', ['War-guilt clause', 'Reparations', 'Loss of land and colonies', 'Army cut to 100,000', 'Sense of national humiliation', 'Nazi promise to overturn the treaty'], 'Flow from the Treaty of Versailles to Nazi support: the war-guilt clause, reparations, loss of land and colonies and the small army created a sense of humiliation, which the Nazis used by promising to overturn the treaty', 'Resentment the Nazis could use.');
const vHyper = table(['Point', 'Fact'], [
  ['Year', '1923'],
  ['Trigger', 'Ruhr occupied by France and Belgium; money printed'],
  ['Result', 'Money almost worthless'],
  ['Who lost most', 'Middle-class savers and pensioners'],
], 'Table of the hyperinflation of 1923: the Ruhr was occupied by France and Belgium and money was printed, so money became almost worthless and middle-class savers and pensioners lost most');
const vDepression = flow('TB', ['October 1929: crash in New York', 'American loans to Germany called back', 'Factories close; millions unemployed', 'Governments rule by decree', 'Nazi votes rise; largest party in 1932'], 'Flow of the Great Depression in Germany: the crash of October 1929 in New York led to American loans being recalled, factories closed and millions lost jobs, governments ruled by decree, and Nazi votes rose until they were the largest party in 1932', 'From crash to crisis.');
const vPlanDe = table(['Part', 'Marks', 'What to write'], [
  ['(i) Versailles', '3', 'War guilt and reparations; land and army; Nazi promise'],
  ['(ii) Weimar', '3', 'Many parties; coalitions; Article 48'],
  ['(iii) Economy', '4', '1923 hyperinflation; 1929 Depression; unemployment; Nazi gains'],
], 'Worked example table planning a ten-mark answer on the rise of Nazism: three points on Versailles, three on the Weimar Republic, and four on the economic crises', 'Plan, then write.');
const vPower = flow('TB', ['1932: Nazis largest party, no majority', '30 January 1933: Hindenburg appoints Hitler Chancellor', 'March 1933: Enabling Act', 'Other parties and trade unions banned', '2 August 1934: Hindenburg dies; Hitler becomes Fuhrer'], 'Flow of Hitler\'s path to power: in 1932 the Nazis were the largest party without a majority; on 30 January 1933 Hindenburg appointed Hitler Chancellor; the Enabling Act followed in March 1933; other parties and trade unions were banned; on 2 August 1934 Hindenburg died and Hitler became Fuhrer', 'From Chancellor to dictator.');
const vEnabling = table(['Step', 'What changed'], [
  ['Enabling Act (March 1933)', 'Government could make laws without the Reichstag'],
  ['Parties banned (1933)', 'Germany became a one-party state'],
  ['Free trade unions abolished', 'Workers lost independent bodies'],
  ['Fuhrer (August 1934)', 'Offices of President and Chancellor combined'],
], 'Table of how Hitler secured power: the Enabling Act of March 1933 let the government make laws without the Reichstag, parties were banned in 1933, free trade unions were abolished, and in August 1934 he combined the offices of President and Chancellor as Fuhrer');
const vScenario = table(['Imagined clue', 'Feature it shows'], [
  ['One face on every wall', 'Cult of the leader'],
  ['Only one party on the ballot', 'One-party state'],
  ['Every article checked by an office', 'Censorship; no free press'],
  ['Children march in uniform', 'Youth organisations'],
  ['Families losing jobs for their descent', 'Nazi racial doctrine'],
], 'Worked example table matching imagined clues to features: one face on every wall shows the cult of the leader, one party on the ballot a one-party state, checked articles censorship, marching children youth organisations, and families losing jobs for their descent the Nazi racial doctrine', 'Spot the feature.');
const vSum2 = flow('TB', ['Weak Weimar Republic and Versailles resentment', 'Hyperinflation 1923; Depression from 1929', `Hitler Chancellor ${CHANCELLOR}; Enabling Act`, `Fuhrer ${FUHRER}`, 'Shared ideas: one party, nationalism, war, leader cult, anti-communism'], `Summary flow of Part 2: a weak Weimar Republic and resentment of Versailles, hyperinflation in 1923 and the Depression from 1929, Hitler Chancellor in ${CHANCELLOR} with the Enabling Act, Fuhrer in ${FUHRER}, and the shared ideas of the two dictatorships`, 'Part 2 in five lines.');
const vTips2 = table(['Date', 'Event'], [
  ['1923', 'Hyperinflation'],
  ['1929', 'Great Depression begins'],
  ['30 January 1933', 'Hitler appointed Chancellor'],
  ['March 1933', 'Enabling Act'],
  ['2 August 1934', 'Hindenburg dies; Hitler Fuhrer'],
], 'Table of key German dates: 1923 hyperinflation, 1929 Great Depression, 30 January 1933 Hitler appointed Chancellor, March 1933 Enabling Act, and 2 August 1934 Hindenburg dies and Hitler becomes Fuhrer');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Rise of Dictatorships — Part 1: Fascism in Italy',
  goals: [
    'Explain why many Italians were discontented after the First World War',
    'Describe the economic and political conditions that weakened Italy',
    'Explain how Mussolini came to power in 1922',
  ],
  slides: [
    sl('title', 'Why did democracy fail in Italy?', {
      b: 'Part 1 — the causes of **Fascism** and **Mussolini\'s** rise to power.',
      v: vRoute1,
      n: 'After the First World War, democracy collapsed in several European countries and dictators took power. The first was Italy. In this part we look at why many Italians were angry after the war, why their governments were weak, and how Benito Mussolini and his Fascist Party came to power in nineteen twenty-two.',
    }),
    sl('diagram', 'Dates to remember', {
      b: 'From the **fascist movement (1919)** to **Hitler as Führer (1934)**.',
      v: vTimeline,
      n: 'This timeline covers both dictatorships. Mussolini started the fascist movement in nineteen nineteen and came to power in nineteen twenty-two. Germany suffered hyperinflation in nineteen twenty-three and the Depression from nineteen twenty-nine. Hitler became Chancellor in nineteen thirty-three and Führer in nineteen thirty-four.',
    }),
    sl('concept', 'Italy after the war', {
      b: 'A **winner** that felt like a **loser**.',
      v: vItalyPost,
      n: 'Italy joined the war in nineteen fifteen on the side of Britain and France, hoping to gain territory. It lost many soldiers and spent huge sums. At the peace conference of nineteen nineteen, however, it did not receive all it had hoped for. Many Italians felt their sacrifice had been wasted.',
    }),
    sl('check', 'Quick check: the country', {
      b: 'In which country did Mussolini lead the Fascist Party?',
      chk: 'm_chk_duce',
      n: 'Begin with the basics. Which country did Mussolini lead?',
    }),
    sl('diagram', 'A "mutilated victory"', {
      b: '**Fiume** and most of **Dalmatia** were not given to Italy.',
      v: vMutilated,
      n: 'Italian nationalists expected land on the Adriatic coast, especially Dalmatia, and the port of Fiume. Neither was given to Italy in nineteen nineteen. They described the result as a mutilated victory and blamed their own government for accepting it. This anger became fuel for Mussolini.',
    }),
    sl('diagram', 'Economic crisis', {
      b: '**Unemployment**, rising **prices** and **war debts**.',
      v: vEconomy,
      n: 'The war left Italy poor. Soldiers came home to find no jobs. Prices rose faster than wages, and the government carried heavy war debts. Workers struck for better pay, and in some areas peasants took over land. Hardship made many people ready to listen to anyone who promised a way out.',
    }),
    sl('diagram', 'Weak governments', {
      b: '**Coalitions** that came and went.',
      v: vWeakGovt,
      n: 'In parliament no party had a majority, so governments were coalitions of several parties. They quarrelled and fell quickly. Between nineteen nineteen and nineteen twenty-two such governments could not solve unemployment or stop the strikes. Many Italians lost faith in parliament and began to want a strong leader instead.',
    }),
    sl('concept', 'Fear of communism and the fascist squads', {
      b: 'Strikes and occupations of **1919–20**; the **Blackshirts**.',
      v: vRedFear,
      n: 'In nineteen nineteen and nineteen twenty, workers occupied factories and raised red flags, and peasants seized estates. Owners feared a revolution like the one in Russia. Mussolini had started the fascist movement at Milan in nineteen nineteen. His armed squads, the Blackshirts, attacked socialists, and many owners paid them.',
    }),
    sl('check', 'Quick check: where it began', {
      b: 'Mussolini founded the fascist movement at the city of ___ in 1919.',
      chk: 'fb_chk_founded',
      n: 'Where did the fascist movement begin? Complete the name of the city.',
    }),
    sl('example', 'Worked example 1: planning a ten-mark answer', {
      b: 'Plan **3 + 3 + 4** marks on the rise of Fascism.',
      bl: ['(i) The peace settlement: three facts.', '(ii) Economic and political conditions: three facts.', '(iii) The path to power: four steps.'],
      v: vPlanIt,
      n: 'Here is a plan for a ten-mark answer. For the peace settlement, give three facts: Italy joined the Allies, it was denied Fiume and Dalmatia, and people spoke of a mutilated victory. For conditions, give three: jobs, prices and weak coalitions. For the four-mark part, trace four steps to power.',
    }),
    sl('diagram', 'The March on Rome, 1922', {
      b: 'Power by **threat**, not by a majority.',
      v: vMarch,
      n: 'In October nineteen twenty-two, thousands of Fascists gathered to march on Rome. The government wanted to use the army, but King Victor Emmanuel the Third refused. Instead he invited Mussolini to become Prime Minister. Mussolini came to power although his party had only a small number of seats in parliament.',
    }),
    sl('check', 'Quick check: the march', {
      b: 'True or false: the March on Rome took place in October 1922.',
      chk: 'tf_chk_march',
      n: 'Recall the date of the March on Rome. Is the statement true?',
    }),
    sl('concept', 'Mussolini\'s leadership', {
      b: 'Order, greatness and **spectacle**.',
      v: vLeader,
      n: 'Mussolini was a powerful speaker and a former journalist. He promised order, strong action against communism and a return to national greatness. Uniforms, parades and symbols attracted young people and former soldiers. He took the title Il Duce, meaning the leader, and later turned Italy into a one-party state.',
    }),
    sl('example', 'Worked example 2: reading clues in a source', {
      b: 'Match clues in an imagined diary to the **causes** they show.',
      bl: ['Step 1: underline each clue.', 'Step 2: ask which cause it points to.', 'Step 3: name the cause and quote the clue.'],
      v: vClassify,
      n: 'Source questions give clues, not answers. Suppose an imagined diary mentions a brother with no work, red flags on factory gates, a government that changes often, and men in black shirts paid by owners. Each clue points to a cause: economic crisis, fear of communism, weak coalitions, and fascist squads backed by owners.',
    }),
    sl('check', 'Quick check: the squads', {
      b: 'An imagined report of 1921 describes men in black shirts breaking up a socialist meeting. Who were they?',
      chk: 'm_app_it_squads',
      n: 'Apply what you know. Which group wore black shirts and attacked socialists?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part One. Italians felt cheated by a mutilated victory. Unemployment, rising prices and debts brought hardship. Weak coalition governments could not cope, and fear of communism drove owners to back Mussolini\'s Blackshirts. After the March on Rome in nineteen twenty-two, the King invited Mussolini to become Prime Minister.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Fascist movement: **Milan, 1919**.', 'March on Rome: **October 1922**; appointed by **King Victor Emmanuel III**.', 'Mutilated victory: **Fiume** and **Dalmatia**.', 'Fear of communism: strikes and factory occupations of **1919–20**.', 'Mussolini was **appointed**, not elected with a majority.'],
      v: vRedFear,
      n: 'A few tips. Learn the founding of the movement at Milan in nineteen nineteen and the March on Rome in October nineteen twenty-two. Link the mutilated victory with Fiume and Dalmatia. Remember the fear of communism after the strikes. And note that Mussolini was appointed by the King, not voted in with a majority.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Rise of Dictatorships — Part 2: Nazism in Germany and the Shared Ideas',
  goals: [
    'Explain the causes of the rise of Nazism in Germany',
    'Describe how Hitler came to power and became a dictator',
    'Compare the ideologies of Fascism and Nazism',
  ],
  slides: [
    sl('title', 'How did Hitler come to power?', {
      b: 'Part 2 — the causes of **Nazism**, Hitler\'s path to power, and what the two ideologies shared.',
      v: vRoute2,
      n: 'Germany had become a democratic republic after the war. Yet in nineteen thirty-three Adolf Hitler, leader of the Nazi Party, came to power and soon became a dictator. In this part we study the causes, the steps by which he took control, and the ideas that Nazism shared with Italian Fascism.',
    }),
    sl('diagram', 'The Weimar Republic', {
      b: 'A democracy **born in defeat**.',
      v: vWeimar,
      n: 'The new German republic was set up in nineteen nineteen and is called the Weimar Republic. Many Germans linked it with defeat and the hated peace treaty. Proportional voting produced many parties, so governments were unstable coalitions. Article forty-eight let the President rule by emergency decree, a power later misused.',
    }),
    sl('check', 'Quick check: the republic', {
      b: 'What was the democratic German republic of 1919–33 commonly called?',
      chk: 'm_chk_weimar',
      n: 'What name do historians give to Germany\'s democratic republic after the war?',
    }),
    sl('diagram', 'Resentment of Versailles', {
      b: '**War guilt**, **reparations**, lost **land**.',
      v: vVersailles,
      n: 'The Treaty of Versailles blamed Germany for the war, demanded reparations, took away land and colonies and cut its army to one hundred thousand men. Many Germans felt humiliated. The Nazis called the treaty a national disgrace and promised to overturn it, which won them support.',
    }),
    sl('diagram', 'Hyperinflation, 1923', {
      b: 'Money became almost **worthless**.',
      v: vHyper,
      n: 'In nineteen twenty-three, after France and Belgium occupied the Ruhr industrial region, the German government printed huge amounts of money. Prices rose by the hour and the mark became almost worthless. Middle-class families lost their savings and pensions, and many never trusted the republic again.',
    }),
    sl('check', 'Quick check: worthless money', {
      b: 'True or false: German money became almost worthless in 1923.',
      chk: 'tf_chk_1923',
      n: 'Recall the crisis of the early twenties. Is the statement true?',
    }),
    sl('diagram', 'The Great Depression', {
      b: 'From **1929**: millions **unemployed**.',
      v: vDepression,
      n: 'In October nineteen twenty-nine prices on the New York stock market crashed. American loans to Germany were called back, factories closed and millions of Germans lost their jobs. Governments could not agree and ruled by decree. Desperate voters turned to the Nazis, who in nineteen thirty-two became the largest party in the Reichstag.',
    }),
    sl('example', 'Worked example 1: planning a ten-mark answer on Nazism', {
      b: 'Plan **3 + 3 + 4** marks on the causes.',
      bl: ['(i) Versailles: guilt, reparations, land and army, Nazi promise.', '(ii) Weimar: parties, coalitions, Article 48.', '(iii) Economy: 1923 and 1929, with the Nazi rise.'],
      v: vPlanDe,
      n: 'Plan a ten-mark answer on the causes of Nazism. For Versailles, give the terms and the Nazi promise to overturn them. For the Weimar Republic, give its many parties, weak coalitions and Article forty-eight. For the four-mark part, explain the hyperinflation of nineteen twenty-three and the Depression after nineteen twenty-nine.',
    }),
    sl('diagram', 'From largest party to Chancellor', {
      b: '**Appointed** on **30 January 1933**.',
      v: vPower,
      n: 'The Nazis were the largest party in nineteen thirty-two but never won a majority in a free election. Conservative politicians believed they could control Hitler and persuaded President Hindenburg to appoint him Chancellor on the thirtieth of January nineteen thirty-three. Within eighteen months he had made himself dictator.',
    }),
    sl('check', 'Quick check: the President', {
      b: 'Whose death in August 1934 allowed Hitler to become Führer?',
      chk: 'm_chk_hindenburg',
      n: 'Which President\'s death let Hitler combine the two highest offices?',
    }),
    sl('concept', 'The Enabling Act and the Führer', {
      b: 'From Chancellor to **dictator**.',
      v: vEnabling,
      n: 'In March nineteen thirty-three the Enabling Act let Hitler\'s government make laws without parliament. Other parties were banned and free trade unions abolished, so Germany became a one-party state. When President Hindenburg died in August nineteen thirty-four, Hitler combined the offices of President and Chancellor and took the title Führer.',
    }),
    sl('diagram', 'What the two ideologies shared', {
      b: 'Seven **shared features** and one major **difference**.',
      v: vCompare,
      n: 'Fascism and Nazism shared many ideas. Both created one-party states and banned opposition. Both preached extreme nationalism, glorified war and built a cult of the leader. Both were bitterly anti-communist, controlled the press and organised the young. The main difference was Nazism\'s racial doctrine.',
    }),
    sl('check', 'Quick check: how many parties?', {
      b: 'How many political parties were allowed in Nazi Germany once the dictatorship was established?',
      chk: 'm_chk_onepary',
      n: 'Think about the one-party state. How many parties were allowed?',
    }),
    sl('two-column', 'Shared ideas and the main difference', {
      cols: ['**Shared**\n\n- Totalitarian **one-party** state\n- **Extreme nationalism**; glorified **war**\n- **Cult of the leader**\n- **Anti-communism**; no free **press**; **youth** groups', '**Different**\n\n- Nazism: a **racial doctrine** and **antisemitism**, leading to persecution and the **Holocaust**\n- Early Italian Fascism: the **state**, not race, at the centre'],
      n: 'Compare the two lists. On the left are the features both dictatorships shared. On the right is the key difference. Nazism made race its central idea and persecuted Jews, and millions of Jews and others were later murdered in the Holocaust. Early Italian Fascism placed the state, rather than race, at the centre.',
    }),
    sl('example', 'Worked example 2: spotting features in a scenario', {
      b: 'Name the **feature** each imagined clue shows.',
      bl: ['Step 1: read each clue.', 'Step 2: match it to a feature of dictatorship.', 'Step 3: decide whether it was shared or only Nazi.'],
      v: vScenario,
      n: 'Practise with imagined clues. One face on every wall shows the cult of the leader. Only one party on the ballot shows a one-party state. Articles checked by an office show censorship. Children marching in uniform show youth organisations. Families losing jobs because of their descent show the Nazi racial doctrine.',
    }),
    sl('check', 'Quick check: the title', {
      b: 'Hitler\'s title as leader of Germany from 1934 was the ___.',
      chk: 'fb_chk_fuhrer',
      n: 'Complete Hitler\'s title from nineteen thirty-four.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part Two. The weak Weimar Republic was blamed for the treaty. Hyperinflation in nineteen twenty-three and the Depression from nineteen twenty-nine ruined millions. Hitler was appointed Chancellor in nineteen thirty-three, passed the Enabling Act and became Führer in nineteen thirty-four. Both dictatorships shared one-party rule, nationalism and a leader cult.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Know **1923**, **1929**, **30 January 1933**, **March 1933** and **August 1934**.', 'Hitler was **appointed**, not elected with a majority.', 'Give **three** shared features and **one** difference in comparison answers.', 'Describe the regimes in **factual** terms; do not quote their leaders.'],
      v: vTips2,
      n: 'A few tips. Learn the five German dates on this table. Remember that Hitler was appointed, not elected with a majority. In comparison answers, give clear shared features and the main difference. And describe these regimes in factual terms; you do not need to quote their leaders to earn marks.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Rise of Dictatorships — notes',
  sections: [
    {
      h: '1. Italy after the First World War',
      t: 1,
      b: '- Italy joined the **Allies** in **1915** and suffered heavy losses.\n- **Mutilated victory:** at the peace of **1919** it did not get **Fiume** and most of **Dalmatia**; nationalists blamed the government.\n- **Economic crisis:** unemployment of ex-soldiers, inflation, war debts.\n- **Weak governments:** no majority party; coalitions rose and fell.',
      terms: [['Mutilated victory', 'The feeling that Italy had won the war but lost the peace.'], ['Coalition', 'A government formed by several parties together.']],
      v: vItalyPost,
      vs: [vMutilated, vEconomy],
    },
    {
      h: '2. Fear of communism and Mussolini\'s rise',
      t: 1,
      b: `- **1919–20:** strikes, factory occupations and land seizures alarmed owners.\n- **Fascist movement:** founded by **Mussolini** at **Milan** in **1919**; National Fascist Party from **1921**; armed **Blackshirt** squads.\n- **Support:** landowners and industrialists funded the squads; ex-soldiers and the middle class joined.\n- **March on Rome:** **October ${MARCH_ON_ROME}**; **King Victor Emmanuel III** invited Mussolini to be **Prime Minister**.\n- Title: **Il Duce** (the leader).`,
      terms: [['Blackshirts', 'The armed squads of the Italian Fascist movement.'], ['Il Duce', 'Mussolini\'s title, meaning the leader.']],
      v: vRedFear,
      vs: [vMarch, vLeader],
    },
    {
      h: '3. Germany: the Weimar Republic and Versailles',
      t: 2,
      b: '- **Weimar Republic (1919):** linked with defeat; many parties; unstable **coalitions**.\n- **Article 48:** emergency rule by decree, used heavily from **1930**.\n- **Treaty of Versailles:** war guilt, reparations, loss of land and colonies, army of **100,000**; seen as humiliation.\n- The **Nazis** promised to overturn it.',
      terms: [['Weimar Republic', 'Germany\'s democratic republic of 1919–33.'], ['Article 48', 'The emergency-decree power of the German President.']],
      v: vWeimar,
      vs: [vVersailles],
    },
    {
      h: '4. Economic crises: 1923 and 1929',
      t: 2,
      b: '- **1923:** after the occupation of the **Ruhr**, the government printed money; **hyperinflation** destroyed savings.\n- **1929:** the **Great Depression**; American loans withdrawn; **millions unemployed** by 1932.\n- Desperate voters turned to extremes; the **Nazis** became the **largest party** in **1932**.',
      terms: [['Hyperinflation', 'Extremely fast rise in prices that makes money almost worthless.'], ['Great Depression', 'The world economic collapse that began in 1929.']],
      v: vHyper,
      vs: [vDepression],
    },
    {
      h: '5. Hitler takes power',
      t: 2,
      b: `- **30 January ${CHANCELLOR}:** **President Hindenburg** appointed Hitler **Chancellor**; the Nazis had no majority.\n- **March 1933:** **Enabling Act**: laws without the **Reichstag**.\n- **1933:** other parties banned; free trade unions abolished.\n- **2 August ${FUHRER}:** Hindenburg died; Hitler became **Führer**.`,
      terms: [['Enabling Act', 'The 1933 law that let the government make laws without parliament.'], ['Führer', 'Hitler\'s title from 1934, meaning the leader.']],
      v: vPower,
      vs: [vEnabling],
    },
    {
      h: '6. Fascism and Nazism compared',
      t: 3,
      b: '- **Shared:** totalitarian **one-party** state; **extreme nationalism**; glorification of **war**; **cult of the leader**; **anti-communism**; suppression of opposition and **civil liberties**; **propaganda**; **youth** organisations.\n- **Difference:** Nazism\'s **racial doctrine** and **antisemitism** (the **Nuremberg Laws** of **1935** took away the rights of Jews); persecution led to the **Holocaust**, in which millions of Jews and others were murdered. Early Italian Fascism placed the **state** at the centre.',
      terms: [['Totalitarian state', 'A state that tries to control every part of life under one party.'], ['Antisemitism', 'Hostility to and persecution of Jews.']],
      v: vCompare,
      vs: [vScenario],
    },
  ],
  tips: '**Common mistakes**\n- Saying Mussolini or Hitler **won a majority**: both were **appointed**.\n- Mixing **1923** (hyperinflation) with **1929** (Depression).\n- Calling the Blackshirts German (they were **Italian**; the Nazi stormtroopers wore brown).\n- Listing **race** as a shared feature: it was **central to Nazism**.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks you to explain or evaluate.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Mutilated victory', 'Italian feeling that the war was won but the peace lost.', 'definition', 1],
  ['Lands Italy was denied', '**Fiume** and most of **Dalmatia**.', 'fact', 1],
  ['Italy enters the war', '**1915**, on the Allied side.', 'fact', 1],
  ['Fascist movement founded', '**Milan**, **1919**, by Mussolini.', 'fact', 1],
  ['Blackshirts', 'Armed fascist squads in Italy.', 'definition', 1],
  ['Two red years', 'Strikes and factory occupations of **1919–20** in Italy.', 'fact', 1],
  ['March on Rome', '**October 1922**.', 'fact', 1],
  ['Who appointed Mussolini?', '**King Victor Emmanuel III**.', 'fact', 1],
  ['Il Duce', 'Mussolini\'s title: the leader.', 'definition', 1],
  ['Why owners backed Fascism', 'Fear of a communist revolution.', 'concept', 1],
  ['Weimar Republic', 'German democratic republic, **1919–33**.', 'definition', 2],
  ['Article 48', 'President could rule by **emergency decree**.', 'fact', 2],
  ['Weimar weakness', 'Many parties; unstable coalitions.', 'concept', 2],
  ['Versailles grievances', 'War guilt; reparations; lost land; army of 100,000.', 'concept', 2],
  ['Hyperinflation', '**1923**: money almost worthless; savings lost.', 'fact', 2],
  ['Ruhr occupation', '**1923**, by France and Belgium.', 'fact', 2],
  ['Great Depression', 'Began **1929**; millions unemployed in Germany.', 'fact', 2],
  ['Nazis largest party', '**1932**, but no majority.', 'fact', 2],
  ['Hitler Chancellor', '**30 January 1933**, appointed by **Hindenburg**.', 'fact', 2],
  ['Enabling Act', '**March 1933**: laws without the Reichstag.', 'fact', 2],
  ['Führer', '**August 1934**, after Hindenburg\'s death.', 'fact', 2],
  ['How Hitler gained power', 'Appointed, then made himself dictator.', 'exam-tip', 2],
  ['Totalitarian state', 'One party controls every part of life.', 'definition', 3],
  ['Cult of the leader', 'Leader shown as all-wise and always right.', 'concept', 3],
  ['Shared attitude to war', 'Glorified as a sign of national strength.', 'concept', 3],
  ['Shared enemy', '**Communism**.', 'fact', 3],
  ['Youth organisations', 'Trained the young in loyalty to the leader.', 'concept', 3],
  ['Main difference', 'Nazism\'s **racial doctrine** and **antisemitism**.', 'concept', 3],
  ['Nuremberg Laws', '**1935**: took away the rights of German Jews.', 'fact', 3],
  ['Comparison answers', 'Give shared features first, then the difference.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Rise of Dictatorships',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_it_fiume', 'm_it_march', 'm_de_chancellor', 'm_de_hyper', 'm_sim_totalitarian', 'ar_de_versailles', 's_it_two_econ', 's_sim_two'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_it_causes', 'l_de_causes'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Rise of Dictatorships',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_it_mutilated', 'm_it_red_fear', 'm_it_economy', 'm_de_art48', 'm_de_enabling', 'm_de_depression', 'm_de_fuhrer', 'm_sim_leader', 'm_diff_race', 'ar_sim_parties', 's_it_peace_two', 's_de_versailles_two', 's_de_weimar_two', 's_de_enabling', 's_diff_one'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_it_rise_path', 'l_de_power_path', 'l_sim_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-10-history-civics-ch15 only (causes of Fascism in Italy; causes of Nazism in Germany; similarities of the ideologies)',
    originality: 'every diary, letter, note, poster and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no dictator or other historical person quoted, ideas paraphrased',
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(', ')}); ${CHANCELLOR} − ${MARCH_ON_ROME} = ${yearsBetween(MARCH_ON_ROME, CHANCELLOR)}; ${CHANCELLOR} − ${VERSAILLES} = ${yearsBetween(VERSAILLES, CHANCELLOR)}`,
    facts: 'Italy joined the Allies 1915; Fiume and Dalmatia; fascist movement Milan 1919, National Fascist Party 1921; strikes and occupations 1919–20; March on Rome October 1922; King Victor Emmanuel III; Weimar Republic 1919; Article 48; Ruhr occupation and hyperinflation 1923; Great Depression from October 1929; Nazis largest party 1932 without a majority; Hitler appointed Chancellor by Hindenburg 30 January 1933; Enabling Act March 1933; Hindenburg died 2 August 1934, Hitler Führer; Nuremberg Laws 1935; Italian anti-Jewish laws 1938; Holocaust stated without figures',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
