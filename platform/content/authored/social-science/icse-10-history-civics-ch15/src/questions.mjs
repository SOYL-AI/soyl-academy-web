// ICSE 10 History & Civics, ch15 Rise of Dictatorships — question bank. Every diary, letter, note, poster and quiz
// scenario is imagined and written by SOYL and labelled as imagined; no textbook text, box or exercise and no specimen or
// board-paper item is reused (D-036). No speech or writing of any dictator or other historical person is quoted, and no
// slogan is reproduced: ideas are paraphrased and described. The tone is strictly factual: the regimes are explained,
// never praised. Facts are stable, widely taught dates and names, listed for review in the README.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1919, 'Fascist movement founded at Milan'],
  [1922, 'March on Rome; Mussolini Prime Minister'],
  [1923, 'Hyperinflation in Germany'],
  [1929, 'Great Depression begins'],
  [1932, 'Nazis largest party in the Reichstag'],
  [1933, 'Hitler Chancellor; Enabling Act'],
  [1934, 'Hitler becomes Fuhrer'],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], 'events in date order');
export const yearsBetween = (a, b) => b - a;
export const MARCH_ON_ROME = 1922;
export const CHANCELLOR = 1933;
export const FUHRER = 1934;
export const VERSAILLES = 1919;
assert.equal(yearsBetween(MARCH_ON_ROME, CHANCELLOR), 11);
assert.equal(yearsBetween(VERSAILLES, CHANCELLOR), 14);
assert.equal(yearsBetween(CHANCELLOR, FUHRER), 1);

/** A horizontal timeline from 1917 to 1936 with labels in lanes (theme colours only). */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 800, H = 380, x0 = 50, x1 = 750, y = 190, a = 1917, b = 1936;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1920, 1925, 1930, 1935]) {
    s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: 'muted' });
  }
  s.text(X(1925), y + 18, '1925', { size: 11, muted: true });
  s.text(X(1935), y + 18, '1935', { size: 11, muted: true });
  const lanes = [-40, 46, -76, 82, -112, 118, -148];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: 'muted' });
    s.dot(px, y, 4, i % 2 ? 'blue' : 'accent');
    const anchor = px > 560 ? 'end' : px < 200 ? 'start' : 'middle';
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? 'blue' : 'accent', anchor });
  });
  s.text(W / 2, H - 12, 'Schematic, drawn by SOYL; not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Two overlapping boxes: features shared by Fascism and Nazism, with the main difference below. */
export function compareSvg(alt, caption) {
  const s = new Svg(720, 360);
  s.rect(20, 20, 220, 250, { rx: 12, fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 2 });
  s.text(130, 44, 'Fascism (Italy)', { size: 14, bold: true, color: 'accent' });
  s.text(130, 80, 'State above all', { size: 12 });
  s.text(130, 104, 'Corporate state', { size: 12 });
  s.rect(480, 20, 220, 250, { rx: 12, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 2 });
  s.text(590, 44, 'Nazism (Germany)', { size: 14, bold: true, color: 'blue' });
  s.text(590, 80, 'Racial doctrine', { size: 12 });
  s.text(590, 104, 'Antisemitism', { size: 12 });
  s.rect(250, 20, 220, 250, { rx: 12, fill: 'fill', color: 'muted', sw: 1.5 });
  s.text(360, 44, 'Shared features', { size: 14, bold: true });
  ['One-party state', 'Extreme nationalism', 'Cult of the leader', 'Glorified war', 'Anti-communism', 'No free press', 'Youth groups'].forEach((t, i) => s.text(360, 76 + i * 26, t, { size: 12 }));
  s.text(360, 300, 'The middle box lists features both shared', { size: 11, muted: true });
  s.text(360, 330, 'Schematic, drawn by SOYL', { size: 11, muted: true });
  return s.visual(alt, caption);
}

const TL_ALT = 'Timeline from 1917 to 1936 marking: 1919 fascist movement founded at Milan, 1922 March on Rome and Mussolini Prime Minister, 1923 hyperinflation in Germany, 1929 Great Depression begins, 1932 Nazis largest party in the Reichstag, 1933 Hitler Chancellor and the Enabling Act, 1934 Hitler becomes Fuhrer';
const CMP_ALT = 'Three boxes: Fascism in Italy (state above all, corporate state), Nazism in Germany (racial doctrine, antisemitism), and in the middle the shared features: one-party state, extreme nationalism, cult of the leader, glorified war, anti-communism, no free press, youth groups';

// ================================================================ t01 Fascism in Italy
Q('m_it_mutilated', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Many Italians after 1919 described their country\'s gains from the peace settlement as a "mutilated victory". What did they mean?',
  opts: ['Italy had been on the winning side but felt it received far less territory than it had expected', 'Italy had lost the war and been occupied', 'Italy had gained every territory it claimed', 'Italy had refused to sign any peace treaty'],
  sol: 'Italy fought on the winning side from 1915 but did not receive all the lands it hoped for, such as Dalmatia and Fiume, so many felt cheated. Italy was not defeated or occupied.',
}));
Q('m_it_fiume', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which two areas on the Adriatic coast did many Italian nationalists feel Italy had been wrongly denied in the peace settlement?',
  opts: ['Fiume and Dalmatia', 'Alsace and Lorraine', 'Danzig and the Saar', 'Bosnia and Serbia'],
  sol: 'Italian nationalists resented that Italy did not get Fiume and most of Dalmatia. Alsace-Lorraine, Danzig and the Saar concerned Germany; Bosnia and Serbia are in the Balkans.',
}));
Q('m_it_march', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'What did the March on Rome of October 1922 lead to?',
  opts: ['The King inviting Mussolini to form a government as Prime Minister', 'The election of Hitler as Chancellor', 'Italy leaving the League of Nations', 'The signing of the Treaty of Versailles'],
  sol: 'Faced with the threat of fascist squads marching on the capital, King Victor Emmanuel III invited Mussolini to become Prime Minister at the end of October 1922.',
}));
Q('m_it_economy', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which economic condition in Italy after the First World War helped the Fascists win support?',
  opts: ['Rising prices, unemployment and war debts', 'A long boom with full employment', 'Large gains of colonies with rich mines', 'The end of all taxes after the war'],
  sol: 'The war left Italy with debts, inflation and unemployment, especially among returning soldiers. Discontent made people listen to Mussolini\'s promises.',
}));
Q('m_it_coalitions', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why were Italian governments between 1919 and 1922 unable to deal firmly with the country\'s problems?',
  opts: ['They were weak coalitions of several parties that changed often', 'Italy had no parliament at that time', 'The army ruled the country directly', 'The League of Nations governed Italy'],
  sol: 'No party had a majority, so short-lived coalition governments followed one another and could not act firmly. Italy had a parliament, and neither the army nor the League ruled it.',
}));
Q('m_it_red_fear', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did many Italian landowners and factory owners support the Fascists in 1919–22?',
  opts: ['They feared a socialist or communist revolution after waves of strikes and occupations', 'They wanted Italy to join the Soviet Union', 'They wished to give their land to peasants', 'They wanted to restore the Treaty of Versailles'],
  sol: 'Strikes, factory occupations and peasant land seizures in 1919–20 alarmed the propertied classes, who saw the Fascists as a force against socialism and communism.',
}));
Q('m_app_it_strike', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined Turin factory owner in 1920 finds that workers have occupied his factory and raised a red flag. Which cause of the rise of Fascism does his fear illustrate?',
  opts: ['Fear of socialism and communism among the propertied classes', 'Dissatisfaction with the Treaty of Versailles in Germany', 'The Great Depression of 1929', 'The cult of the leader'],
  sol: 'Factory occupations in 1919–20 made owners fear a red revolution, and many turned to the Fascists, who promised order. The Depression came later, in 1929.',
}));
Q('m_app_it_veteran', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined Italian soldier returns home in 1919, finds no job and hears that Italy gained little from the war. Which two causes of Fascism does his situation combine?',
  opts: ['Economic hardship and dissatisfaction with the peace settlement', 'Hyperinflation of 1923 and the Enabling Act', 'The Great Depression and the Reichstag elections', 'Antisemitism and the Nuremberg Laws'],
  sol: 'Unemployment shows economic hardship, and "Italy gained little" reflects the feeling of a mutilated victory. The other options concern Germany.',
}));
Q('m_app_it_squads', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined report from 1921 says a group of men in black shirts broke up a socialist meeting in a Po valley town while the local police stood by. Which group is described?',
  opts: ['Fascist squads (the Blackshirts) of Mussolini', 'The Brownshirts (SA) of the Nazi Party', 'The Red Army', 'A League of Nations peace force'],
  sol: 'Mussolini\'s armed squads wore black shirts and attacked socialists; the weak response of the authorities helped them grow. The Brownshirts were German.',
}));
Q('m_app_it_landowners', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'An imagined Italian landowner in 1921 gives money to a fascist squad after peasants seize part of his estate. What does this suggest about who helped the Fascists rise?',
  opts: ['Propertied groups who feared losing their land and factories helped fund and protect them', 'The Fascists were supported only by the peasants', 'The Fascists rose without any outside help', 'Foreign powers alone created the Fascist Party'],
  sol: 'Landowners and industrialists, afraid of socialism, gave money and protection to the Fascists. The other options ignore this support from propertied classes.',
}));
Q('ar_it_peace', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Many Italians felt angry with their government after the First World War, although Italy had been on the winning side.',
  r: 'Italy did not receive all the territories it had hoped for, such as Fiume and Dalmatia.',
  sol: 'Both are true, and R explains A: the disappointment over territory (a "mutilated victory") turned many Italians against the governments that had accepted the settlement.',
}));
Q('fb_it_title', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Mussolini was called Il ___, meaning "the leader".',
  acc: [['Duce']],
  sol: 'His title was Il Duce, the leader.',
}));
Q('tf_it_majority', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Mussolini became Prime Minister in 1922 because the Fascist Party had won a majority of seats in parliament.',
  sol: 'False. The Fascists held only a small number of seats; Mussolini was appointed by the King after the March on Rome, as governments seemed too weak to resist.',
}));
Q('s_it_two_econ', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two economic difficulties of Italy after 1918 that helped Mussolini gain support.',
  model: '1. **Unemployment**, especially among soldiers returning from the front.\n2. **Rising prices** and heavy **war debts**, which hit workers and the middle class and made people look for a strong leader.',
  sol: 'Two economic difficulties.',
  scheme: [['First difficulty', 1], ['Second difficulty', 1]],
}));
Q('s_it_peace_two', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the peace settlement after the First World War make many Italians discontented? Give two reasons.',
  model: '1. Italy fought on the **winning side** and lost many soldiers, yet it did not get **Fiume** and most of **Dalmatia**.\n2. Nationalists called the result a **mutilated victory** and blamed the government for accepting it.',
  sol: 'Two reasons.',
  scheme: [['Territory denied', 1], ['Blame on government', 1]],
}));
Q('s_it_weak_govt', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the weakness of Italian governments in 1919–22 help the Fascists?',
  model: '1. Short-lived **coalition** governments could not solve **unemployment** or end **strikes**, so people lost faith in parliament.\n2. They failed to stop **fascist violence**, and in 1922 the King chose **Mussolini** rather than resist.',
  sol: 'Two points.',
  scheme: [['Failure to govern', 1], ['Failure to resist the Fascists', 1]],
}));
Q('s_it_march_two', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the March on Rome bring Mussolini to power although his party had few seats in parliament?',
  model: '1. Thousands of armed **Fascists** threatened the capital, and the weak **government** seemed unable to resist.\n2. **King Victor Emmanuel III**, fearing disorder or civil war, invited **Mussolini** to form a government in **October 1922**.',
  sol: 'Threat and the King\'s decision.',
  scheme: [['Threat of force', 1], ['King\'s invitation', 1]],
}));
Q('s3_it_three', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three causes of the rise of Fascism in Italy, with one fact for each.',
  model: '1. **Discontent with the peace settlement:** Italy did not receive **Fiume** and **Dalmatia**, so people spoke of a mutilated victory.\n2. **Economic crisis:** **unemployment**, rising **prices** and war **debts** caused hardship.\n3. **Fear of communism:** **strikes** and **factory occupations** in 1919–20 made landowners and industrialists back **Mussolini**.',
  sol: 'Three causes, each with a fact.',
  scheme: [['Peace settlement', 1], ['Economic crisis', 1], ['Fear of communism', 1]],
}));
Q('l_it_causes', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the rise of Fascism in Italy.\n\n(i) Explain why many Italians were disappointed with the peace settlement after the First World War. **[3]**\n(ii) Describe the economic and political conditions in Italy between 1919 and 1922 that weakened the government. **[3]**\n(iii) How did Mussolini come to power in 1922? Explain the role of the fear of communism. **[4]**',
  model: '(i) Italy joined the war on the winning side in **1915** and lost many soldiers. At the peace conference it did not receive **Fiume** and most of **Dalmatia**, which nationalists had expected. Many felt cheated and called it a **mutilated victory**, blaming their own leaders.\n\n(ii) The war left **unemployment**, rising **prices** and large **debts**. Returning soldiers found no work. In parliament no party had a majority, so weak **coalition** governments changed often and could not act firmly.\n\n(iii) In **1919–20** workers went on **strike** and occupied factories, and peasants seized land. **Landowners** and **industrialists**, fearing a communist revolution, gave money to Mussolini\'s **Blackshirt** squads, who attacked socialists. In **October 1922** the Fascists began the **March on Rome**; **King Victor Emmanuel III**, unwilling to resist, invited **Mussolini** to become **Prime Minister**.',
  sol: 'Peace settlement; conditions; path to power with fear of communism.',
  scheme: [['(i) Territory denied', 2], ['(i) Mutilated victory', 1], ['(ii) Economic crisis', 2], ['(ii) Weak coalitions', 1], ['(iii) Fear of communism and support for squads', 2], ['(iii) March on Rome and appointment', 2]],
}));
Q('l_it_rise_path', long({
  t: 1, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about Mussolini\'s rise.\n\n(i) State three facts about the founding and growth of the Fascist Party between 1919 and 1921. **[3]**\n(ii) Explain three ways in which Mussolini\'s leadership attracted support. **[3]**\n(iii) "Weak governments did as much as Mussolini to bring Fascism to power." Give two arguments for this view and two against it. **[4]**',
  model: '(i) **Mussolini** started the fascist movement at **Milan** in **1919**. Its armed squads, the **Blackshirts**, attacked socialists. In **1921** it became the **National Fascist Party**.\n\n(ii) He was a skilled **speaker** and journalist who promised **order** and national **greatness**. He offered strong action against **communism**, which pleased property owners. He used **parades**, uniforms and symbols to win the young and ex-soldiers.\n\n(iii) **For:** coalition governments failed to solve **unemployment** and **strikes**, and they did not stop **fascist violence**; the **King** chose to appoint Mussolini rather than use the army. **Against:** Mussolini built a disciplined **movement** and won the backing of **landowners** and **industrialists**; his **propaganda** and the **March on Rome** were his own actions.',
  sol: 'Founding facts; leadership; balanced evaluation.',
  scheme: [['(i) Three facts', 3], ['(ii) Three ways', 3], ['(iii) Two arguments for', 2], ['(iii) Two arguments against', 2]],
}));

// ================================================================ t02 Nazism in Germany
Q('m_de_versailles', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which term of the Treaty of Versailles did the Nazis use most to stir up anger, by calling the treaty a national humiliation?',
  opts: ['The war-guilt clause that blamed Germany for the war', 'The founding of the United Nations', 'The return of Fiume to Italy', 'The creation of the Weimar constitution'],
  sol: 'The war-guilt clause, with reparations and lost land, made many Germans feel humiliated; the Nazis promised to overturn the treaty. The United Nations came in 1945.',
}));
Q('m_de_weimar', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The democratic republic set up in Germany in 1919 was called the Weimar Republic. Which weakness did it face?',
  opts: ['Many small parties, so governments were unstable coalitions', 'It had no President or parliament', 'It was ruled directly by Britain and France', 'It had a single party with a huge majority'],
  sol: 'Proportional representation produced many parties, and governments were short-lived coalitions. The republic had a President and a parliament (the Reichstag).',
}));
Q('m_de_art48', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Article 48 of the Weimar constitution was later misused to weaken democracy. What did it allow?',
  opts: ['The President to rule by emergency decrees', 'The army to elect the Chancellor', 'Citizens to vote directly on every law', 'The League of Nations to approve German laws'],
  sol: 'Article 48 gave the President emergency powers to govern by decree. From 1930 governments relied on it, which weakened parliament and helped prepare the way for dictatorship.',
}));
Q('m_de_hyper', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year did German money lose almost all its value through hyperinflation?',
  opts: ['1923', '1914', '1929', '1939'],
  sol: 'Hyperinflation peaked in 1923, when the occupation of the Ruhr and the printing of money made the mark almost worthless.',
}));
Q('m_de_depression', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How did the Great Depression that began in 1929 help the Nazis?',
  opts: ['Mass unemployment and despair made many voters turn to a party promising jobs and strong rule', 'It made Germany so rich that people wanted change', 'It ended all political parties except the Nazis', 'It forced the League of Nations to appoint Hitler'],
  sol: 'After 1929 millions lost their jobs, and many Germans turned to the Nazis, who promised work, order and an end to the Versailles settlement. The Depression did not abolish parties.',
}));
Q('m_de_chancellor', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On which date was Hitler appointed Chancellor of Germany?',
  opts: ['30 January 1933', '28 June 1919', '1 September 1939', '2 August 1934'],
  sol: 'President Hindenburg appointed Hitler Chancellor on 30 January 1933. 2 August 1934 is Hindenburg\'s death, after which Hitler became Führer.',
}));
Q('m_de_who_appointed', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Who appointed Hitler Chancellor in January 1933?',
  opts: ['President Paul von Hindenburg', 'King Victor Emmanuel III', 'The League of Nations Council', 'The German people by a direct vote for Chancellor'],
  sol: 'The President of the Weimar Republic, Hindenburg, appointed him on the advice of conservative politicians. The Chancellor was not chosen by a direct popular vote.',
}));
Q('m_de_enabling', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What did the Enabling Act of March 1933 allow Hitler\'s government to do?',
  opts: ['Make laws without the approval of the Reichstag', 'Hold free elections every year', 'Join the League of Nations', 'Reduce the army to 100,000 men'],
  sol: 'The Enabling Act let the government make laws without parliament, opening the way to dictatorship. The 100,000 limit was a Versailles term.',
}));
Q('m_de_fuhrer', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'After which event in August 1934 did Hitler combine the offices of President and Chancellor as Führer?',
  opts: ['The death of President Hindenburg', 'The March on Rome', 'The Wall Street crash', 'The signing of the Treaty of Versailles'],
  sol: 'When Hindenburg died on 2 August 1934, Hitler merged the two offices and took the title Führer (leader).',
}));
Q('m_de_majority', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In the elections of 1932 the Nazi Party became the largest party in the Reichstag. What does this tell us about how Hitler came to power?',
  opts: ['The Nazis were the largest party but without a majority, and Hitler was then appointed through political deals', 'The Nazis won more than two-thirds of all votes', 'Hitler seized power by a successful army revolt in 1932', 'Hitler was elected President in 1932'],
  sol: 'The Nazis were the largest party but never won an absolute majority in a free election. Hitler became Chancellor by appointment in January 1933, after conservatives believed they could control him.',
}));
Q('m_app_de_wheelbarrow', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined German teacher in 1923 says her month\'s salary now buys only a loaf of bread, and people carry banknotes in baskets. Which crisis is she describing?',
  opts: ['Hyperinflation', 'The Great Depression of 1929', 'The Enabling Act', 'The Moroccan crisis'],
  sol: 'Money losing almost all its value in 1923 was hyperinflation. The Depression came after 1929 and caused mass unemployment rather than worthless money.',
}));
Q('m_app_de_unemployed', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined Hamburg dock worker has had no job since 1930 and in 1932 votes for a party promising work and bread. Which cause of the rise of Nazism does this show?',
  opts: ['Mass unemployment during the Great Depression', 'The March on Rome', 'Dissatisfaction with Italy\'s mutilated victory', 'The policy of appeasement'],
  sol: 'Unemployment from 1930 onwards came from the Great Depression, and the Nazis drew votes by promising jobs.',
}));
Q('m_app_de_coalitions', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined German newspaper of 1930 reports that the fifth government in two years has fallen because the parties could not agree. Which weakness of the Weimar Republic does it show?',
  opts: ['Unstable coalition governments formed from many parties', 'The power of the King', 'Control of Germany by the League of Nations', 'A one-party Nazi state'],
  sol: 'Weimar had many parties and short-lived coalitions, so governments fell often. Germany had no King after 1918.',
}));
Q('m_app_de_middle', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined retired clerk lost the savings of a lifetime in 1923 and lost his pension again after 1929. Which group\'s experience does he represent, and where did many of them turn?',
  opts: ['The middle class, many of whom turned to the Nazis', 'The army officers, who joined the Communists', 'The landowners of Italy, who joined the Fascists', 'Foreign bankers, who left Germany'],
  sol: 'Middle-class savers were ruined by hyperinflation and the Depression, and many lost faith in the republic and voted for the Nazis.',
}));
Q('m_app_de_rally', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'At an imagined Nazi rally in 1932 a speaker promises jobs, an end to the "shameful" peace treaty and protection from the Communists. Which three causes of Nazism do these promises appeal to?',
  opts: ['Unemployment, resentment of Versailles and fear of communism', 'Hyperinflation, the Moroccan crises and imperialism', 'The mutilated victory, the March on Rome and the corporate state', 'Collective security, disarmament and arbitration'],
  sol: 'Jobs answer Depression unemployment, the "shameful" treaty means Versailles, and protection from Communists plays on fear of revolution.',
}));
Q('ar_de_versailles', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Nazi promise to overturn the Treaty of Versailles won support among many Germans.',
  r: 'Many Germans regarded the treaty, with its war-guilt clause, reparations and loss of land, as a national humiliation.',
  sol: 'Both are true, and R explains A: because the treaty was widely resented, a promise to undo it attracted support.',
}));
Q('ar_de_chancellor', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Hitler became Chancellor in 1933 because the Nazi Party had won an absolute majority in a free election.',
  r: 'The Nazi Party became the largest party in the Reichstag in 1932.',
  sol: 'A is false: the Nazis never won an absolute majority in a free election; Hitler was appointed by President Hindenburg. R is true: they became the largest party in 1932.',
}));
Q('ar_de_hyper', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Many middle-class Germans lost faith in the Weimar Republic in the 1920s.',
  r: 'The hyperinflation of 1923 wiped out their savings.',
  sol: 'Both are true, and R explains A: people who saw their savings destroyed blamed the republic, which made them open to extreme parties.',
}));
Q('fb_de_article', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The article of the Weimar constitution that allowed the President to rule by emergency decree was Article ___.',
  acc: [['48', 'forty-eight']],
  sol: 'It was Article 48.',
}));
Q('tf_de_majority', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Nazi Party won more than half of all votes in a free German election before Hitler became Chancellor.',
  sol: 'False. The Nazis became the largest party in 1932 but never won an absolute majority in a free election; Hitler was appointed Chancellor in January 1933.',
}));
Q('s_de_versailles_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two ways in which the Treaty of Versailles helped the rise of Nazism.',
  model: '1. The **war-guilt** clause and **reparations** made Germans feel humiliated and blamed alone.\n2. Loss of **land** and limits on the **army** hurt national pride, and the **Nazis** promised to undo the treaty.',
  sol: 'Two ways.',
  scheme: [['Guilt and reparations', 1], ['Land, army and Nazi promise', 1]],
}));
Q('s_de_weimar_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two weaknesses of the Weimar Republic that the Nazis were able to exploit.',
  model: '1. **Many parties** meant short-lived **coalition** governments that could not act firmly.\n2. **Article 48** let the President rule by **decree**, so parliament was bypassed and democracy weakened.',
  sol: 'Two weaknesses.',
  scheme: [['Unstable coalitions', 1], ['Article 48', 1]],
}));
Q('s_de_depression_two', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did support for the Nazis rise sharply after 1929?',
  model: '1. The **Great Depression** threw **millions** of Germans out of work, and the republic seemed helpless.\n2. The **Nazis** promised **jobs**, bread and strong leadership, so desperate voters turned to them.',
  sol: 'Depression and Nazi promises.',
  scheme: [['Depression and unemployment', 1], ['Nazi promises', 1]],
}));
Q('s_de_enabling', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the Enabling Act of 1933, and why was it important for Hitler?',
  model: '1. Passed in **March 1933**, it let Hitler\'s government make **laws** without the **Reichstag**.\n2. It ended parliamentary control and became the **legal basis** of his **dictatorship**.',
  sol: 'Meaning and importance.',
  scheme: [['What it allowed', 1], ['Why important', 1]],
}));
Q('s_de_comm_fear', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did the fear of communism help Hitler come to power?',
  model: '1. **Industrialists**, landowners and the **middle class** feared a **communist revolution** and saw the Nazis as a barrier against it.\n2. **Conservative** politicians advised **Hindenburg** to appoint Hitler in **1933**, hoping to use him against the left.',
  sol: 'Two points.',
  scheme: [['Support of property owners', 1], ['Conservatives and the appointment', 1]],
}));
Q('s3_de_three', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three causes of the rise of Nazism in Germany, with one fact for each.',
  model: '1. **Treaty of Versailles:** the **war-guilt** clause, reparations and lost land were seen as a humiliation.\n2. **Economic crisis:** **hyperinflation** in **1923** and the **Great Depression** after **1929** brought ruin and mass unemployment.\n3. **Weak Weimar Republic:** unstable **coalitions** and rule by decree under **Article 48** made democracy look helpless.',
  sol: 'Three causes, each with a fact.',
  scheme: [['Versailles', 1], ['Economic crisis', 1], ['Weak republic', 1]],
}));
Q('l_de_causes', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the rise of Nazism in Germany.\n\n(i) How did the Treaty of Versailles create resentment that the Nazis could use? **[3]**\n(ii) Explain the weaknesses of the Weimar Republic. **[3]**\n(iii) How did the economic crises of 1923 and 1929 help the Nazis gain support? **[4]**',
  model: '(i) The treaty made Germany accept **war guilt** and pay **reparations**. Germany lost **land** and **colonies**, and its army was cut to **100,000**. It was a **dictated** peace, so many Germans felt humiliated, and the **Nazis** promised to tear it up.\n\n(ii) The republic had **many parties**, so governments were unstable **coalitions**. Many Germans linked it with defeat and the treaty. **Article 48** let the President rule by **decree**, and from **1930** governments relied on it, weakening parliament.\n\n(iii) In **1923** **hyperinflation** made money worthless and wiped out the **savings** of the middle class. After **1929** the **Great Depression** threw **millions** out of work. Desperate people lost faith in democracy. The **Nazis** promised **jobs**, order and national revival, and in **1932** they became the **largest party** in the **Reichstag**.',
  sol: 'Versailles; Weimar weaknesses; economic crises.',
  scheme: [['(i) Terms that caused resentment', 2], ['(i) Nazi use of it', 1], ['(ii) Coalitions and Article 48', 2], ['(ii) Link with defeat', 1], ['(iii) Hyperinflation', 2], ['(iii) Depression and Nazi gains', 2]],
}));
Q('l_de_power_path', long({
  t: 2, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about how Hitler gained and secured power.\n\n(i) Explain how Hitler became Chancellor in January 1933. **[3]**\n(ii) What was the Enabling Act, and how did it change Germany\'s government? **[3]**\n(iii) Describe how Hitler became Führer in 1934 and explain why the period 1933–34 is called the consolidation of the Nazi dictatorship. **[4]**',
  model: '(i) The Nazis became the **largest party** in the **Reichstag** in **1932** but had no majority. Conservative politicians believed they could control Hitler and persuaded **President Hindenburg** to appoint him **Chancellor** on **30 January 1933**.\n\n(ii) Passed in **March 1933**, the **Enabling Act** allowed the government to make **laws** without the **Reichstag**. Parliament lost its power, other parties were soon **banned**, and Germany became a **one-party state**.\n\n(iii) When **Hindenburg** died on **2 August 1934**, Hitler combined the offices of **President** and **Chancellor** and took the title **Führer**; the **army** swore loyalty to him personally. In just over a year he had moved from appointed Chancellor to **dictator**, removing **opposition**, **trade unions** and a free **press**, so these years mark the consolidation of his power.',
  sol: 'Appointment; Enabling Act; Führer and consolidation.',
  scheme: [['(i) Largest party, no majority', 1], ['(i) Appointment by Hindenburg', 2], ['(ii) What the Act allowed', 2], ['(ii) One-party state', 1], ['(iii) Führer in 1934', 2], ['(iii) Why consolidation', 2]],
}));
Q('l_de_economy', long({
  t: 2, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Study the timeline drawn by SOYL and answer the questions that follow.\n\n(i) Identify three events on the timeline that took place in Germany between 1923 and 1933. **[3]**\n(ii) How many years passed between the March on Rome and Hitler\'s appointment as Chancellor? Which dictator came to power first? **[3]**\n(iii) Using two events from the timeline, explain how economic crisis prepared the way for Nazi rule. **[4]**',
  model: `(i) **1923:** hyperinflation made German money almost worthless. **1932:** the Nazis became the largest party in the **Reichstag**, though without a majority. **1933:** Hitler was appointed **Chancellor** in January, and the **Enabling Act** was passed in March.\n\n(ii) **${yearsBetween(MARCH_ON_ROME, CHANCELLOR)} years** (${CHANCELLOR} − ${MARCH_ON_ROME}). **Mussolini** came to power first, after the March on Rome in **1922**; Hitler followed in **1933**.\n\n(iii) In **1923** **hyperinflation** destroyed the **savings** of the middle class, and many families blamed the republic and lost faith in democracy. After the **Depression** began in **1929**, factories closed and **unemployment** rose to millions, while weak governments could do little. Desperate voters turned to a party that promised jobs and order, so by **1932** the Nazis were the **largest party**. In **1933** Hitler took power and quickly set up a **dictatorship**.`,
  sol: 'Three German events; the gap; economic crises and Nazi rule.',
  scheme: [['(i) Three events', 3], ['(ii) Correct number of years', 2], ['(ii) Mussolini first', 1], ['(iii) Hyperinflation', 2], ['(iii) Depression and Nazi rise', 2]],
  assets: [timelineSvg(TL_ALT, 'Schematic timeline drawn by SOYL; label positions are for legibility only.')],
}));

// ================================================================ t03 Similarities of the ideologies
Q('m_sim_totalitarian', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Fascist Italy and Nazi Germany are both called totalitarian states. What does this mean?',
  opts: ['The state tried to control every part of people\'s lives, with one party and no opposition allowed', 'Power was shared among many parties and free courts', 'The states were governed by the League of Nations', 'Each region ruled itself without a central government'],
  sol: 'A totalitarian state controls political, economic and social life under one party, banning opposition and free expression.',
}));
Q('m_sim_leader', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Both regimes presented their leader as all-wise and always right, with his image everywhere. This feature is called',
  opts: ['the cult of the leader', 'collective security', 'parliamentary democracy', 'separation of powers'],
  sol: 'Glorifying the single leader, Il Duce or the Führer, was the cult of the leader. The other options belong to democracies or the League.',
}));
Q('m_sim_war', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which view of war was common to both Fascism and Nazism?',
  opts: ['War was glorified as a way to make the nation strong and great', 'War was to be avoided by settling every dispute through the League', 'Armies should be abolished', 'Only colonies should fight wars'],
  sol: 'Both glorified war and military strength as signs of national greatness and built up their armed forces.',
}));
Q('m_sim_anticomm', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which political idea did both Fascism and Nazism strongly oppose?',
  opts: ['Communism', 'Nationalism', 'Militarism', 'Dictatorship'],
  sol: 'Both were bitterly anti-communist and won support by promising to crush communism. They themselves were nationalist, militarist dictatorships.',
}));
Q('m_diff_race', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which feature was central to Nazism but much less important in Italian Fascism in its early years?',
  opts: ['A racial doctrine of a superior race, with hatred of Jews (antisemitism)', 'A one-party state', 'The use of propaganda', 'Opposition to communism'],
  sol: 'Nazism placed race at its centre and persecuted Jews, leading to the Holocaust. A one-party state, propaganda and anti-communism were shared by both.',
}));
Q('m_sim_youth', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why did both regimes organise boys and girls into official youth movements?',
  opts: ['To train the young in loyalty to the leader and the party from childhood', 'To prepare them for free elections', 'To teach them to criticise the government', 'To send them to study abroad'],
  sol: 'Youth organisations (such as the Hitler Youth) shaped the young to obey the leader, accept the party\'s ideas and be ready for military service.',
}));
Q('m_app_sim_poster', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined poster of 1936 shows a giant portrait of the national leader above cheering crowds, with the words "He is never wrong". Which feature of both ideologies does it show?',
  opts: ['The cult of the leader', 'Collective security', 'Free and fair elections', 'The separation of powers'],
  sol: 'Showing the leader as infallible and larger than life is the cult of the leader.',
}));
Q('m_app_sim_school', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined student in 1937 must join a uniformed youth group after school, sing songs praising the leader and practise marching. Which feature of dictatorship does this illustrate?',
  opts: ['Control of the young through official youth organisations', 'Freedom of association', 'Respect for the League of Nations', 'Rule by a coalition of parties'],
  sol: 'Compulsory, uniformed youth groups trained children in loyalty to the leader, a shared feature of both regimes.',
}));
Q('m_app_sim_newspaper', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined editor in 1934 is told that every article must be checked by a government office and that criticising the leader is a crime. Which common feature does this show?',
  opts: ['Suppression of civil liberties and control of the press', 'A free press protected by courts', 'Rule by the League of Nations', 'Separation of powers'],
  sol: 'Censorship and punishment of criticism show the suppression of free speech and the press under both regimes.',
}));
Q('ar_sim_parties', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Both Fascist Italy and Nazi Germany allowed only one political party.',
  r: 'Both Fascism and Nazism believed in parliamentary democracy and free elections.',
  sol: 'A is true: each became a one-party state. R is false: both rejected parliamentary democracy and free elections.',
}));
Q('ar_sim_propaganda', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Both regimes made heavy use of propaganda through newspapers, radio, films and rallies.',
  r: 'Mussolini became Prime Minister of Italy in 1922.',
  sol: 'Both are true, but R does not explain A. Propaganda was used to win and keep mass support and to glorify the leader; the date of Mussolini\'s appointment does not explain it.',
}));
Q('tf_sim_race', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A racial doctrine and hatred of Jews were central to Nazism, while in Italian Fascism the state rather than race was the central idea in its early years.',
  sol: 'True. Nazism was built on racial ideas and antisemitism; Italian Fascism placed the state at the centre (Italy adopted anti-Jewish laws only later, in 1938).',
}));
Q('mt_terms', match({
  t: [1, 2, 3], d: 2, c: 'understanding',
  stem: 'Match each term from the rise of the dictatorships with its meaning.',
  pairs: [
    ['Il Duce', 'Title of Mussolini as leader of Italy'],
    ['Führer', 'Title taken by Hitler in 1934'],
    ['Blackshirts', 'Armed fascist squads in Italy'],
    ['Enabling Act', 'Law of 1933 letting the government rule without parliament'],
  ],
  sol: 'Il Duce and Führer both mean "the leader"; the Blackshirts were Mussolini\'s squads; the Enabling Act of 1933 opened the way to Hitler\'s dictatorship.',
}));
Q('ord_ch15', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events from the rise of the dictatorships in the order in which they happened.',
  items: [
    'Fascist movement founded at Milan',
    'March on Rome',
    'Hyperinflation in Germany',
    'Beginning of the Great Depression',
    'Hitler appointed Chancellor',
    'Hitler takes the title Führer',
  ],
  sol: 'Fascist movement (1919), March on Rome (1922), hyperinflation (1923), Great Depression (1929), Hitler Chancellor (1933), Führer (1934).',
}));
Q('s_sim_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features common to the ideologies of Fascism and Nazism.',
  model: '1. A **totalitarian one-party state** in which no opposition or free elections were allowed.\n2. **Extreme nationalism** with the **glorification of war** and a **cult of the leader**.',
  sol: 'Two common features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_diff_one', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain one important difference between Nazism and Italian Fascism.',
  model: 'Nazism made **race** its central idea, claiming a superior race and spreading **antisemitism**, which led to the persecution of **Jews** and the **Holocaust**. Italian Fascism placed the **state** at the centre.',
  sol: 'Race versus state.',
  scheme: [['Nazi racial doctrine', 1], ['Fascist emphasis on the state', 1]],
}));
Q('s_sim_propaganda', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined radio in 1935 plays only speeches praising the government. Explain how such propaganda helped both dictatorships.',
  model: '1. Constant **propaganda** on radio, in films and **newspapers** made people believe the **leader** was always right.\n2. With no **free press**, opposing views were hidden, so the regime kept **mass support**.',
  sol: 'Two effects.',
  scheme: [['Belief in the leader', 1], ['Opposition silenced', 1]],
}));
Q('s3_sim_three', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe three similarities between the ideologies of Fascism and Nazism.',
  model: '1. **One-party rule:** both set up **totalitarian** states, banned other parties and ended free elections.\n2. **Extreme nationalism and militarism:** both glorified **war** and promised national **greatness**.\n3. **Cult of the leader:** **Il Duce** and the **Führer** were shown as all-wise, supported by **propaganda** and **youth organisations**.',
  sol: 'Three similarities.',
  scheme: [['One-party rule', 1], ['Nationalism and militarism', 1], ['Cult of the leader', 1]],
}));
Q('l_sim_full', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about the ideologies of Fascism and Nazism.\n\n(i) What is a totalitarian state? Give two ways in which both regimes controlled people\'s lives. **[3]**\n(ii) Explain the attitude of both ideologies to nationalism, war and communism. **[3]**\n(iii) Describe two further similarities and one major difference between the two ideologies. **[4]**',
  model: '(i) A **totalitarian** state seeks to control every part of life through **one party**. Both regimes banned other **parties** and **trade unions**, and used **censorship** and **secret police** to silence critics.\n\n(ii) Both preached **extreme nationalism**, placing the nation above the individual. They **glorified war** and built up armed forces. Both were fiercely **anti-communist** and won the support of property owners by promising to crush communism.\n\n(iii) **Similarities:** a **cult of the leader** (Il Duce and the Führer) and the use of **propaganda** and **youth organisations** to win loyalty. **Difference:** Nazism made **race** central, with **antisemitism** that led to the persecution of Jews and the **Holocaust**; Italian Fascism stressed the **state** above all.',
  sol: 'Totalitarianism; nationalism, war and communism; further similarities and a difference.',
  scheme: [['(i) Meaning', 1], ['(i) Two ways of control', 2], ['(ii) Nationalism and war', 2], ['(ii) Anti-communism', 1], ['(iii) Two further similarities', 2], ['(iii) One difference', 2]],
}));
Q('l_compare', long({
  t: [1, 2, 3], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Study the comparison chart drawn by SOYL and answer the questions that follow.\n\n(i) Name three features from the middle box and explain one of them. **[3]**\n(ii) The chart lists "anti-communism" as a shared feature. How did this feature help both leaders come to power? **[3]**\n(iii) Why were these dictatorships a danger to peace in Europe in the 1930s? Give four reasons. **[4]**',
  model: '(i) **One-party state**, **cult of the leader** and **youth groups**. For example, the **cult of the leader** presented Mussolini and Hitler as all-wise rulers whose word was law.\n\n(ii) In both countries **landowners**, **industrialists** and the **middle class** feared a **communist revolution**. They gave money and support to the **Fascists** and **Nazis**, and conservative leaders helped bring **Mussolini** (1922) and **Hitler** (1933) to power as a barrier against the left.\n\n(iii) Both regimes **glorified war** and built up large **armed forces**. Their **extreme nationalism** demanded new territory. Nazi Germany wanted to **overturn Versailles**. With no **free press** or parliament, no one at home could check the leaders\' aggressive plans.',
  sol: 'Features; anti-communism; danger to peace.',
  scheme: [['(i) Three features', 2], ['(i) One explained', 1], ['(ii) Fear among property owners', 2], ['(ii) Help to come to power', 1], ['(iii) Four reasons', 4]],
  assets: [compareSvg(CMP_ALT, 'Comparison chart drawn by SOYL (schematic).')],
}));

// ================================================================ source-based (imagined documents)
Q('sb_it_diary', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of an Italian railway clerk and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined railway clerk in Milan, 1921**\n\nMy brother came back from the mountains three years ago and still has no work. Bread costs twice what it did before the war. Last spring the metal workers held the factories for weeks and hung red flags from the gates. Now young men in black shirts march through the square, and the mill owners are said to pay them. My neighbour says the government in Rome changes so often that nobody remembers the minister\'s name.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Who were the "young men in black shirts" mentioned in the diary?', model: 'Members of Mussolini\'s **fascist squads** (the **Blackshirts**).', sol: 'Blackshirts.', scheme: [['Fascist squads', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which economic problem of post-war Italy does the first part of the diary show?', model: '**Unemployment** of returning soldiers and rising **prices**.', sol: 'Economic hardship.', scheme: [['Unemployment or prices', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why might "the mill owners" pay the men in black shirts? Use the diary in your answer.', model: 'After workers **occupied factories** under **red flags**, the owners feared a **communist revolution**; they paid the **Fascist squads** to break strikes and attack socialists.', sol: 'Fear of communism.', scheme: [['Factory occupations', 1], ['Fear of revolution and support for squads', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the neighbour\'s remark tell us about Italian government at this time, and how did it help Mussolini?', model: 'Short-lived **coalition** governments changed often and could not act firmly; people lost faith in **parliament** and turned to a **strong leader** like Mussolini.', sol: 'Weak governments.', scheme: [['Unstable coalitions', 1], ['Help to Mussolini', 1]] }),
    ]),
  ],
}));
Q('sb_de_letter', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from an imagined Berlin shopkeeper to her sister in Munich, 1932**\n\nThree years ago the shop had six assistants; now there is only me. Half the men on our street stand in the queue at the labour office each morning. Ten years ago we lost our savings when money became paper; now we may lose the shop. The parties in the Reichstag argue and the Chancellor rules by emergency orders. A man at the corner hands out leaflets promising work for everyone and an end to the treaty that shamed us. Many neighbours say they will vote for his party.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which crisis of "ten years ago" made money "become paper"?', model: 'The **hyperinflation** of **1923**.', sol: 'Hyperinflation.', scheme: [['Hyperinflation 1923', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which crisis explains the queue at the labour office in 1932?', model: 'The **Great Depression** that began in **1929**, causing mass **unemployment**.', sol: 'Depression.', scheme: [['Great Depression', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which party do the leaflets most likely come from, and which two of its promises appeal to the shopkeeper\'s neighbours?', model: 'The **Nazi Party**. It promises **work** for the unemployed and to **overturn the Treaty of Versailles**, which many Germans saw as a humiliation.', sol: 'Nazi promises.', scheme: [['Nazi Party', 1], ['Two promises', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which weakness of the Weimar Republic does the sentence about the Reichstag show, and why did it matter?', model: 'Quarrelling **parties** could not form stable governments, so the Chancellor ruled by **decree** under **Article 48**; democracy looked **helpless**, and people turned to extremists.', sol: 'Weak republic.', scheme: [['Weakness named', 1], ['Why it mattered', 1]] }),
    ]),
  ],
}));
Q('sb_sim_notes', source({
  t: 3, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from the imagined notes of a visiting student and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of an imagined Indian student travelling in Europe, 1937**\n\nIn Rome and in Munich the walls carry the same kind of poster: one man\'s face, larger than life. In both cities children march in uniform after school. I asked a bookseller in each city for a newspaper that criticised the government; both laughed and said none existed. In Munich a family I met had quietly packed their bags; they told me that people like them were losing their jobs and rights because of their religion and descent.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which shared feature of the two regimes do the posters show?', model: 'The **cult of the leader**.', sol: 'Cult of the leader.', scheme: [['Cult of the leader', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What do the booksellers\' answers show about both regimes?', model: '**Suppression** of the **free press** and of criticism (censorship).', sol: 'No free press.', scheme: [['Censorship', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the Munich family\'s experience reveal about a feature of Nazism that set it apart from early Italian Fascism?', model: 'Nazism\'s **racial doctrine** and **antisemitism**: Jews were stripped of **jobs** and **rights** (as under the Nuremberg Laws of **1935**), a persecution that later led to the **Holocaust**.', sol: 'Racial persecution.', scheme: [['Racial doctrine named', 1], ['Its effects', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did both regimes make children march in uniform after school?', model: 'To train the young in **obedience** to the **leader** and the party, and to prepare them for **military service** as loyal supporters of the regime.', sol: 'Control of youth.', scheme: [['Loyalty to the leader', 1], ['Preparation for service', 1]] }),
    ]),
  ],
}));

// ================================================================ deck checks (objective; not used in tests)
Q('m_chk_duce', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which country did Mussolini lead the Fascist Party?',
  opts: ['Italy', 'Germany', 'Spain', 'Austria'],
  sol: 'Mussolini led the Fascist Party in Italy.',
}));
Q('tf_chk_march', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The March on Rome took place in October 1922.',
  sol: 'True. After the March on Rome in October 1922, Mussolini became Prime Minister.',
}));
Q('fb_chk_founded', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Mussolini founded the fascist movement at the city of ___ in 1919.',
  acc: [['Milan']],
  sol: 'It was founded at Milan.',
}));
Q('m_chk_weimar', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What was the democratic German republic of 1919–33 commonly called?',
  opts: ['The Weimar Republic', 'The Third Republic', 'The Holy Roman Empire', 'The Soviet Republic'],
  sol: 'It was called the Weimar Republic, after the town where its constitution was drawn up.',
}));
Q('tf_chk_1923', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? German money became almost worthless in 1923.',
  sol: 'True. This was the hyperinflation of 1923.',
}));
Q('m_chk_hindenburg', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Whose death in August 1934 allowed Hitler to become Führer?',
  opts: ['President Hindenburg', 'Mussolini', 'King Victor Emmanuel III', 'Woodrow Wilson'],
  sol: 'President Hindenburg died on 2 August 1934, and Hitler combined the offices of President and Chancellor.',
}));
Q('m_chk_onepary', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'How many political parties were allowed in Nazi Germany once the dictatorship was established?',
  opts: ['Only one', 'Two', 'As many as people wished', 'None at all, not even the Nazi Party'],
  sol: 'Germany became a one-party state with only the Nazi Party allowed.',
}));
Q('fb_chk_fuhrer', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Hitler\'s title as leader of Germany from 1934 was the ___.',
  acc: [['Führer', 'Fuhrer', 'Fuehrer']],
  sol: 'His title was the Führer (Fuhrer), meaning the leader.',
}));
