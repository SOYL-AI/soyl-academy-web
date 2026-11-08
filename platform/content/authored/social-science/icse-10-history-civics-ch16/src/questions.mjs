// ICSE 10 History & Civics, ch16 The Second World War and the Cold War — question bank. Every diary, letter, note and
// quiz scenario is imagined and written by SOYL and labelled as imagined; no textbook text, box or exercise and no
// specimen or board-paper item is reused (D-036). No speech, treaty text or writing of any historical person is quoted:
// ideas and terms are paraphrased. Wording about every country and people is neutral, and the human cost of the war
// is described without casualty figures. Facts are stable, widely taught dates and names, listed in the README.
import assert from "node:assert/strict";
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from "../../icse-10-history-civics-ch01/src/lib.mjs";

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = "*(Imagined document written by SOYL for practice; the people in it are not real.)*";

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1919, "Treaty of Versailles"],
  [1931, "Japan invades Manchuria"],
  [1933, "Hitler in power"],
  [1935, "Italy invades Abyssinia"],
  [1936, "Rhineland remilitarised"],
  [1937, "Japan invades China"],
  [1938, "Anschluss; Munich"],
  [1939, "Poland invaded; war begins"],
  [1941, "Pearl Harbour"],
  [1945, "Atomic bombs; war ends; UN"],
  [1949, "NATO formed"],
  [1955, "Warsaw Pact"],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] > EVENTS[i - 1][0], "events in date order");
export const yearsBetween = (a, b) => b - a;
export const VERSAILLES = 1919;
export const POLAND = 1939;
export const MANCHURIA = 1931;
export const PEARL = 1941;
export const WAR_END = 1945;
export const NATO = 1949;
export const WARSAW = 1955;
assert.equal(yearsBetween(VERSAILLES, POLAND), 20); // twenty years from the peace treaty to the new war
assert.equal(yearsBetween(MANCHURIA, POLAND), 8);
assert.equal(yearsBetween(POLAND, WAR_END), 6); // the war lasted about six years
assert.equal(yearsBetween(NATO, WARSAW), 6);
// Day arithmetic inside 1939 and 1945 (same month).
export const PACT_DAY = 23; // 23 August 1939
export const POLAND_DAY = 1; // 1 September 1939
export const DECLARE_DAY = 3; // 3 September 1939
assert.equal(31 - PACT_DAY + POLAND_DAY, 9); // nine days from the pact to the invasion
assert.equal(DECLARE_DAY - POLAND_DAY, 2); // Britain and France declared war two days later
export const HIROSHIMA_DAY = 6;
export const NAGASAKI_DAY = 9;
assert.equal(NAGASAKI_DAY - HIROSHIMA_DAY, 3); // three days apart in August 1945

/** Two Cold War blocs, drawn as boxes (theme colours only). */
export function blocsSvg(alt, caption) {
  const s = new Svg(720, 300);
  s.rect(20, 20, 300, 230, { rx: 12, fill: "blue", fillOpacity: 0.12, color: "blue", sw: 2 });
  s.text(170, 44, "Western bloc (led by the USA)", { size: 13, bold: true, color: "blue" });
  ["NATO, 1949", "USA, Britain, France,", "Canada and others"].forEach((c, i) => {
    s.rect(60, 70 + i * 56, 220, 40, { rx: 8, fill: "fill", color: "muted", sw: 1.2 });
    s.text(170, 90 + i * 56, c, { size: 12 });
  });
  s.rect(400, 20, 300, 230, { rx: 12, fill: "red", fillOpacity: 0.12, color: "red", sw: 2 });
  s.text(550, 44, "Eastern bloc (led by the USSR)", { size: 13, bold: true, color: "red" });
  ["Warsaw Pact, 1955", "USSR, Poland,", "Hungary and others"].forEach((c, i) => {
    s.rect(440, 70 + i * 56, 220, 40, { rx: 8, fill: "fill", color: "muted", sw: 1.2 });
    s.text(550, 90 + i * 56, c, { size: 12 });
  });
  s.line(330, 135, 390, 135, { sw: 2, dash: true, color: "accent" });
  s.text(360, 120, "rivalry", { size: 11, color: "accent" });
  s.text(360, 280, "Schematic, drawn by SOYL", { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** A horizontal timeline from 1915 to 1960 with labels in lanes. */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 800, H = 400, x0 = 40, x1 = 760, y = 200, a = 1915, b = 1960;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1920, 1930, 1940, 1950, 1960]) s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: "muted" });
  s.text(X(1920), y + 18, "1920", { size: 11, muted: true });
  s.text(X(1950), y - 18, "1950", { size: 11, muted: true });
  const lanes = [-34, 40, -66, 72, -98, 104, -130, 136, -34, 40, -162, 168];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i % lanes.length];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: "muted" });
    s.dot(px, y, 4, i % 2 ? "blue" : "accent");
    const anchor = px > 600 ? "end" : px < 200 ? "start" : "middle";
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? "blue" : "accent", anchor });
  });
  return s.visual(alt, caption);
}

export const TL_ALT = "Timeline from 1915 to 1960 marking: 1919 Treaty of Versailles, 1931 Japan invades Manchuria, 1933 Hitler in power, 1935 Italy invades Abyssinia, 1936 Rhineland remilitarised, 1937 Japan invades China, 1938 Anschluss and the Munich Agreement, 1939 Poland invaded and war begins, 1941 Pearl Harbour, 1945 atomic bombs, end of the war and the United Nations, 1949 NATO formed, 1955 Warsaw Pact";
export const BLOCS_ALT = "Two boxes: the Western bloc led by the USA, with NATO of 1949 and members such as the USA, Britain, France and Canada, and the Eastern bloc led by the USSR, with the Warsaw Pact of 1955 and members such as the USSR, Poland and Hungary, joined by a dashed line marked rivalry";

// ================================================================ t01 Versailles, dictatorships, appeasement
Q("m_versailles_grievance", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "Which grievance about the peace of 1919 did Hitler use most to win German support in the 1930s?",
  opts: ["That the Treaty of Versailles had humiliated Germany through war guilt, reparations and lost territory", "That Germany had been given too many colonies", "That the treaty had made Germany's army too large", "That Germany had been forced to join the League of Nations in 1919"],
  sol: "Many Germans resented the war-guilt clause, reparations and loss of land, and Hitler promised to overturn the treaty. Germany lost its colonies, its army was cut, and it was kept out of the League at first.",
}));
Q("m_dictators_link", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "How did the rise of Fascism in Italy and Nazism in Germany add to the danger of a second world war?",
  opts: ["Both regimes glorified force and sought to expand their territory", "Both regimes reduced their armies to the minimum", "Both regimes worked closely with the League to settle disputes", "Both regimes gave up all claims to colonies"],
  sol: "Mussolini and Hitler praised war and national expansion, rearmed and pursued conquests. The other options describe the opposite of their policies.",
}));
Q("m_appease_meaning", mcq({
  t: 1, d: 1, c: "recall",
  stem: "In the 1930s, Britain and France gave in to some of Hitler's demands in the hope of avoiding war. This policy is called",
  opts: ["appeasement", "collective security", "non-alignment", "containment"],
  sol: "Appeasement meant satisfying an aggressive power's demands to keep the peace. Collective security was the League's principle; non-alignment and containment belong to the Cold War period.",
}));
Q("m_rhineland_year", mcq({
  t: 1, d: 2, c: "recall",
  stem: "In which year did German troops march into the demilitarised Rhineland, breaking the Treaty of Versailles?",
  opts: ["1936", "1933", "1938", "1939"],
  sol: "Germany remilitarised the Rhineland in March 1936. Britain and France protested but took no action, an early example of appeasement.",
}));
Q("m_anschluss", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "What was the Anschluss of March 1938?",
  opts: ["The union of Austria with Germany, which the Treaty of Versailles had forbidden", "The German occupation of the Rhineland", "The handing over of the Sudetenland to Germany", "The German invasion of Poland"],
  sol: "Anschluss means union: Germany annexed Austria in March 1938, though the peace treaties had forbidden it. The Rhineland was 1936, the Sudetenland followed in September 1938, and Poland in 1939.",
}));
Q("m_sudeten", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "The Munich Agreement of September 1938 allowed Germany to take over which area?",
  opts: ["The Sudetenland, a German-speaking border region of Czechoslovakia", "The Polish Corridor", "Alsace-Lorraine", "The whole of Austria"],
  sol: "At Munich, Britain, France, Germany and Italy agreed that Germany could take the Sudetenland from Czechoslovakia. Czechoslovakia itself was not consulted.",
}));
Q("m_munich_who", mcq({
  t: 1, d: 3, c: "understanding",
  stem: "Which four powers took part in the Munich Agreement of 1938?",
  opts: ["Britain, France, Germany and Italy", "Britain, France, the USSR and Czechoslovakia", "Germany, Italy, Japan and the USSR", "Britain, the USA, France and Poland"],
  sol: "The leaders of Britain, France, Germany and Italy met at Munich. Neither Czechoslovakia nor the USSR was invited, which deepened Soviet distrust of the western powers.",
}));
Q("m_czech_1939", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "Why is Germany's occupation of the rest of Czechoslovakia in March 1939 seen as the end of appeasement?",
  opts: ["It showed that Hitler's aims went beyond German-speaking lands, so Britain and France promised to defend Poland", "It was approved by the League of Nations", "It returned the Sudetenland to Czechoslovakia", "It ended the Treaty of Versailles by agreement"],
  sol: "By taking non-German lands, Hitler broke his Munich promise. Britain and France now guaranteed Poland's independence, abandoning appeasement. The League did not approve it, and the Sudetenland was not returned.",
}));
Q("ar_munich", ar({
  t: 1, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The Munich Agreement encouraged Hitler to make further demands.",
  r: "At Munich, Britain and France gave in to Hitler's claim to the Sudetenland without a fight.",
  sol: "Both are true, and R explains A: seeing that Britain and France would yield, Hitler expected further gains without war, and he soon occupied the rest of Czechoslovakia and turned to Poland.",
}));
Q("ar_versailles_resent", ar({
  t: 1, d: 3, c: "analysis", verdict: "both-true-not-explains",
  a: "Many Germans wanted the Treaty of Versailles to be overturned.",
  r: "The League of Nations had its headquarters at Geneva.",
  sol: "Both statements are true, but R does not explain A. German resentment came from war guilt, reparations and lost land; the League's location has nothing to do with it.",
}));
Q("tf_rhineland_resist", tf({
  t: 1, d: 2, c: "understanding", ans: false,
  stem: "True or false? When German troops entered the Rhineland in 1936, Britain and France sent their armies to drive them out.",
  sol: "False. Britain and France protested but took no military action, which encouraged Hitler to take further steps.",
}));
Q("s_versailles_two", short({
  t: 1, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Give two ways in which German resentment of the 1919 peace settlement prepared the ground for the war of 1939.",
  model: "1. The **war-guilt** clause, **reparations** and loss of **land** made many Germans want the treaty **overturned**.\n2. **Hitler** used this anger to win support, then broke the treaty by **rearming** and seizing territory.",
  sol: "Two linked points: resentment and its use by Hitler.",
  scheme: [["Resentment of the terms", 1], ["Hitler used it to break the treaty", 1]],
}));
Q("s_appease_two", short({
  t: 1, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "State two reasons why Britain and France followed a policy of appeasement towards Germany.",
  model: "1. Memories of the **First World War** made people afraid of another war, and the two countries were **not ready** to fight.\n2. Some leaders thought Germany's grievances over **Versailles** were partly **fair** and saw Germany as a barrier to **communism**.",
  sol: "Any two reasons.",
  scheme: [["First reason", 1], ["Second reason", 1]],
}));
Q("s_fascism_link", short({
  t: 1, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "How did the friendship between Fascist Italy and Nazi Germany change the balance of power in Europe in the 1930s?",
  model: "Italy and Germany drew together in the **Rome–Berlin Axis** of **1936**, later joined by **Japan**. This created a group of **aggressive powers** acting together against the **League** and the western democracies.",
  sol: "The Axis and its effect.",
  scheme: [["Rome-Berlin Axis named", 1], ["Effect on the balance of power", 1]],
}));
Q("s3_appease_steps", short({
  t: 1, d: 3, c: "analysis", marks: 3, wl: S3,
  stem: "Describe three steps between 1936 and 1938 at which Britain and France allowed Germany to break the Treaty of Versailles.",
  model: "1. **1936:** German troops entered the **demilitarised Rhineland**, and Britain and France only protested.\n2. **March 1938:** Germany annexed **Austria** (the **Anschluss**), which had been forbidden, without resistance.\n3. **September 1938:** at **Munich**, Britain and France agreed that Germany could take the **Sudetenland** from Czechoslovakia.",
  sol: "Rhineland; Anschluss; Munich.",
  scheme: [["Rhineland", 1], ["Anschluss", 1], ["Munich and the Sudetenland", 1]],
}));
Q("l_causes_europe", long({
  t: 1, d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Answer the following about the European causes of the Second World War.\n\n(i) How did the Treaty of Versailles leave Germany dissatisfied? **[3]**\n(ii) How did the rise of Fascism and Nazism threaten peace? **[3]**\n(iii) Explain how the policy of appeasement made a general war more likely. **[4]**",
  model: "(i) Germany had to accept **war guilt** and pay **reparations**, lost **Alsace-Lorraine**, the **Polish Corridor** and its colonies, and its **army** was cut to a small force. Germans saw it as a **dictated** peace and wanted it overturned.\n\n(ii) **Mussolini** in Italy and **Hitler** in Germany set up dictatorships that **glorified force**. They **rearmed**, rejected the League, and sought **new territory**; in 1936 they drew together in the **Rome–Berlin Axis**.\n\n(iii) Britain and France let Hitler **remilitarise the Rhineland** (1936), annex **Austria** (March 1938) and take the **Sudetenland** at **Munich** (September 1938). Each success **strengthened** Germany and convinced Hitler that the democracies would **not fight**, so he went on to occupy the rest of Czechoslovakia and to demand Polish territory. When he invaded **Poland**, Britain and France could no longer give way.",
  sol: "Versailles; dictatorships; appeasement and its results.",
  scheme: [["(i) Terms that caused resentment", 2], ["(i) Dictated peace", 1], ["(ii) Glorified force and rearmed", 2], ["(ii) Axis", 1], ["(iii) Rhineland, Austria, Munich", 2], ["(iii) Why it encouraged further aggression", 2]],
}));
Q("l_appeasement", long({
  t: 1, d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "With reference to the years 1936 to 1939, answer the following.\n\n(i) What was meant by appeasement, and which two countries followed it? **[3]**\n(ii) What did the Munich Agreement of 1938 decide, and who was left out of the talks? **[3]**\n(iii) Give arguments on both sides: did appeasement buy time for peace, or did it make war certain? **[4]**",
  model: "(i) Appeasement meant **giving in** to some of an aggressor's demands in the hope of **avoiding war**. It was followed mainly by **Britain** and **France** towards Hitler's Germany in the late 1930s.\n\n(ii) At **Munich** in **September 1938**, Britain, France, Germany and Italy agreed that Germany could take the **Sudetenland**, a German-speaking region of **Czechoslovakia**. **Czechoslovakia** itself and the **USSR** were not part of the talks.\n\n(iii) **For buying time:** Britain and France were not ready for war in 1938, and the delay let them **rearm**; public opinion still feared a repeat of 1914–18. **For making war certain:** each concession **strengthened** Germany and taught Hitler that the democracies would **not resist**; it lost **Czechoslovakia** as an ally and made the USSR **distrust** the West. A balanced conclusion is that appeasement **delayed** war but on worse terms for the democracies.",
  sol: "Meaning; Munich; balanced evaluation.",
  scheme: [["(i) Meaning", 2], ["(i) Britain and France", 1], ["(ii) Sudetenland to Germany", 2], ["(ii) Czechoslovakia and the USSR left out", 1], ["(iii) Argument for", 2], ["(iii) Argument against with conclusion", 2]],
}));

// ================================================================ t02 Japan, the League, Poland
Q("m_manchuria", mcq({
  t: 2, d: 1, c: "recall",
  stem: "In which year did Japan invade Manchuria, a province of China?",
  opts: ["1931", "1937", "1941", "1919"],
  sol: "Japan seized Manchuria in 1931. It launched a full-scale war on China in 1937 and attacked Pearl Harbour in 1941.",
}));
Q("m_japan_leaves", mcq({
  t: 2, d: 3, c: "understanding",
  stem: "How did Japan respond when the League of Nations condemned its occupation of Manchuria?",
  opts: ["It left the League in 1933 and kept Manchuria", "It returned Manchuria to China at once", "It asked the League to send an army", "It joined the Triple Entente"],
  sol: "Japan walked out of the League in 1933 and kept Manchuria. The League could only condemn; it had no army, which exposed its weakness.",
}));
Q("m_china_1937", mcq({
  t: 2, d: 4, c: "analysis",
  stem: "An imagined chronology reads: 1931, Japan seizes Manchuria; the League condemns it; 1933, Japan leaves the League and keeps Manchuria; 1937, Japan begins a full-scale war on the rest of China. A student writes that the League's condemnation of 1933 caused the war of 1937. Which statement is best supported by the chronology?",
  opts: ["Japan paid no real price for keeping Manchuria, which made further expansion look safe; the chronology suggests encouragement, not a cause proved by the condemnation", "The condemnation itself provoked the war, since Japan attacked China in order to answer the League", "The war began because the League had imposed strict sanctions on Japan in 1933, which Japan resisted", "The war shows that the League had defeated Japan in Manchuria and Japan wished to take revenge"],
  sol: "The League condemned Japan but did nothing effective, and Japan left it and kept Manchuria; that failure encouraged later aggression, though the chronology alone does not prove a single cause. The League imposed no sanctions on Japan and never defeated it, and a condemnation is not itself an act that provokes war.",
}));
Q("m_abyssinia", mcq({
  t: 2, d: 2, c: "understanding",
  stem: "Which country did Mussolini's Italy invade in 1935, testing the League of Nations once again?",
  opts: ["Abyssinia (Ethiopia)", "Manchuria", "Poland", "Austria"],
  sol: "Italy invaded Abyssinia in October 1935. The League's economic sanctions were limited and did not stop the conquest.",
}));
Q("m_league_sanctions", mcq({
  t: 2, d: 3, c: "analysis",
  stem: "Why did the League's sanctions against Italy over Abyssinia fail to stop the invasion?",
  opts: ["They did not cover vital goods such as oil and were not firmly enforced by the leading members", "Italy was not a member of the League", "The League sent an army that was defeated", "The USA enforced them too strictly"],
  sol: "The sanctions left out key goods like oil, and Britain and France did not want to push Italy into war or into Germany's arms. The League had no army, and the USA was not a member.",
}));
Q("m_pact_ussr", mcq({
  t: 2, d: 2, c: "understanding",
  stem: "Which agreement, signed on 23 August 1939, cleared the way for Germany's attack on Poland?",
  opts: ["The Nazi-Soviet Non-Aggression Pact between Germany and the USSR", "The Munich Agreement", "The Treaty of Versailles", "The North Atlantic Treaty"],
  sol: "In the Non-Aggression Pact, Germany and the USSR promised not to fight each other, so Hitler no longer feared a war on two fronts. Munich was 1938; the North Atlantic Treaty came in 1949.",
}));
Q("m_poland_date", mcq({
  t: 2, d: 1, c: "recall",
  stem: "On which date did Germany invade Poland, the immediate cause of the Second World War?",
  opts: ["1 September 1939", "3 September 1939", "23 August 1939", "7 December 1941"],
  sol: "Germany invaded Poland on 1 September 1939. Britain and France declared war on 3 September; the Nazi-Soviet Pact was signed on 23 August; Pearl Harbour was attacked on 7 December 1941.",
}));
Q("m_declare_date", mcq({
  t: 2, d: 2, c: "recall",
  stem: "Britain and France declared war on Germany two days after the invasion of Poland. On which date was this?",
  opts: ["3 September 1939", "1 September 1939", "28 June 1919", "6 August 1945"],
  sol: "They declared war on 3 September 1939, two days after the invasion began on 1 September.",
}));
Q("ar_league_fail", ar({
  t: 2, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The League of Nations failed to stop Japan in Manchuria and Italy in Abyssinia.",
  r: "The League had no army of its own and its leading members were unwilling to use force.",
  sol: "Both are true, and R explains A: without an army and without firm action by Britain and France, the League could only protest and impose weak sanctions.",
}));
Q("ar_poland", ar({
  t: 2, d: 3, c: "analysis", verdict: "A-true-R-false",
  a: "Britain and France declared war on Germany in September 1939.",
  r: "Germany had attacked Britain directly in August 1939.",
  sol: "A is true. R is false: Germany had not attacked Britain; Britain and France declared war because Germany invaded Poland, whose independence they had promised to defend.",
}));
Q("tf_league_army", tf({
  t: 2, d: 1, c: "recall", ans: false,
  stem: "True or false? In the 1930s the League of Nations used its own army to drive Japan out of Manchuria.",
  sol: "False. The League had no army. It condemned Japan, which left the League in 1933 and kept Manchuria.",
}));
Q("s_japan_two", short({
  t: 2, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "State two acts of Japanese aggression in China during the 1930s and how the League responded.",
  model: "1. Japan seized **Manchuria** in **1931**; the League **condemned** it, and Japan **left the League** in **1933**.\n2. Japan began a **full-scale war** on **China** in **1937**, and the League took **no effective action**.",
  sol: "Two acts with the League's response.",
  scheme: [["Manchuria and the League's response", 1], ["War on China, 1937", 1]],
}));
Q("s_league_two", short({
  t: 2, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Give two reasons why the failure of the League of Nations in the 1930s encouraged aggressive states.",
  model: "1. Aggressors like **Japan** and **Italy** saw that the League could only **protest**, since it had **no army**.\n2. Its leading members **Britain** and **France** would not act firmly, so **collective security** collapsed.",
  sol: "Two reasons.",
  scheme: [["No army", 1], ["Members unwilling to act", 1]],
}));
Q("s_pact_two", short({
  t: 2, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Why did the Non-Aggression Pact between Germany and the USSR in August 1939 make an attack on Poland easier for Hitler?",
  model: "Hitler no longer feared that the **USSR** would fight him in the **east** while Britain and France fought in the **west**. Germany could invade **Poland** without the risk of a **two-front war**.",
  sol: "Removed the danger of a two-front war.",
  scheme: [["USSR neutralised", 1], ["No two-front war", 1]],
}));
Q("s3_poland_chain", short({
  t: 2, d: 3, c: "analysis", marks: 3, wl: S3,
  stem: "Explain three steps by which the crisis over Poland turned into a general war in 1939.",
  model: "1. Germany and the **USSR** signed a **Non-Aggression Pact** on **23 August 1939**, freeing Hitler from fear of the east.\n2. **Germany invaded Poland** on **1 September 1939**.\n3. **Britain and France**, which had promised to defend Poland, **declared war** on Germany on **3 September 1939**.",
  sol: "Pact; invasion; declarations.",
  scheme: [["The pact", 1], ["Invasion of Poland", 1], ["Britain and France declare war", 1]],
}));
Q("l_league_japan", long({
  t: 2, d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "With reference to aggression in Asia and Africa in the 1930s, answer the following.\n\n(i) Describe Japan's aggression against China between 1931 and 1937. **[3]**\n(ii) How did Italy challenge the League over Abyssinia? **[3]**\n(iii) Explain how the failure of the League in these crises helped to bring about the Second World War. **[4]**",
  model: "(i) In **1931** Japan seized **Manchuria**, a resource-rich province of **China**. When the League condemned this, Japan **left the League** in **1933** and kept the territory. In **1937** Japan began a **full-scale war** against China.\n\n(ii) In **1935** Mussolini's Italy invaded **Abyssinia** (Ethiopia), a fellow member of the League. The League imposed **economic sanctions**, but they left out **oil** and were weakly enforced, and Italy completed its conquest.\n\n(iii) The League had **no army** and depended on its members, but **Britain** and **France** would not use force. Its failure showed aggressors that they could **break the rules** without punishment, destroyed faith in **collective security**, and drew **Japan**, **Italy** and **Germany** closer together. Each unpunished act of aggression encouraged the next, ending in the attack on **Poland** in **1939**.",
  sol: "Japan; Italy; why the League's failure mattered.",
  scheme: [["(i) Manchuria 1931 and leaving the League", 2], ["(i) War on China 1937", 1], ["(ii) Abyssinia 1935", 1], ["(ii) Weak sanctions", 2], ["(iii) No army, unwilling members", 2], ["(iii) Encouraged further aggression", 2]],
}));
Q("l_poland", long({
  t: 2, d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Answer the following about the outbreak of war in 1939.\n\n(i) What was the Nazi-Soviet Non-Aggression Pact, and why was it signed? **[3]**\n(ii) Describe the immediate cause of the Second World War. **[3]**\n(iii) Why could Britain and France no longer follow appeasement in 1939? **[4]**",
  model: "(i) On **23 August 1939** Germany and the **USSR** agreed **not to attack** each other. Hitler wanted to avoid a **war on two fronts** before attacking Poland; Stalin, distrustful of Britain and France after **Munich**, wanted time and safety.\n\n(ii) On **1 September 1939** Germany **invaded Poland**. Britain and France had promised to defend Poland, so on **3 September 1939** they **declared war** on Germany, and the Second World War began.\n\n(iii) In **March 1939** Hitler had occupied the rest of **Czechoslovakia**, breaking his **Munich** promise and showing that his aims went far beyond German-speaking lands. British and French leaders now saw that concessions only **encouraged** him, public opinion had turned against **giving way**, and they had **guaranteed Poland's** independence. To keep their word and stop further conquests, they had to **fight**.",
  sol: "The pact; Poland; end of appeasement.",
  scheme: [["(i) Date and meaning", 1], ["(i) Reasons for signing", 2], ["(ii) Invasion of Poland", 2], ["(ii) Declarations of war", 1], ["(iii) Occupation of Czechoslovakia", 2], ["(iii) Guarantee and change of policy", 2]],
}));

// ================================================================ t03 Pearl Harbour; Hiroshima and Nagasaki
Q("m_pearl_date", mcq({
  t: 3, d: 1, c: "recall",
  stem: "On which date did Japan attack the American naval base at Pearl Harbour?",
  opts: ["7 December 1941", "1 September 1939", "6 August 1945", "24 October 1945"],
  sol: "Japan attacked Pearl Harbour, in Hawaii, on 7 December 1941. The other dates are the invasion of Poland, the bombing of Hiroshima and the founding of the United Nations.",
}));
Q("m_pearl_effect", mcq({
  t: 3, d: 2, c: "understanding",
  stem: "What was the most important result of the Japanese attack on Pearl Harbour?",
  opts: ["The United States entered the war against Japan and its Axis partners", "Japan withdrew from China", "The League of Nations was revived", "Germany made peace with Britain"],
  sol: "The attack brought the USA into the war, turning a European and Asian conflict into a truly world war.",
}));
Q("m_hiroshima_date", mcq({
  t: 3, d: 2, c: "recall",
  stem: "On which dates were atomic bombs dropped on Hiroshima and Nagasaki?",
  opts: ["6 August and 9 August 1945", "7 December and 8 December 1941", "1 September and 3 September 1939", "8 May and 9 May 1945"],
  sol: "The USA dropped atomic bombs on Hiroshima on 6 August 1945 and on Nagasaki on 9 August 1945, three days apart.",
}));
Q("m_atomic_result", mcq({
  t: 3, d: 4, c: "application",
  stem: "An imagined Indian soldier serving in Burma writes home in late August 1945 that fighting in Asia has suddenly stopped, days after two cities were destroyed by a new kind of bomb. His friend says: 'So the bombs ended the whole Second World War.' Which correction is best?",
  opts: ["The war in Europe had already ended with Germany's surrender in May, so the bombs can be linked only to the end of the war in Asia", "Nothing needs correcting, because Germany surrendered in the same week as Japan", "The bombs ended the war in Europe only, because Japan fought on until the United Nations was founded in October", "Nothing needs correcting, because the surrender of Japan ended the war in Europe too, as Germany's ally"],
  sol: "Germany surrendered in May 1945, three months before the bombs, so the war in Europe was already over. Japan announced its surrender in August and signed in early September, which ended the war in Asia. Germany did not surrender in August, and the UN's founding in October 1945 came after Japan's surrender.",
}));
Q("ar_pearl", ar({
  t: 3, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The USA joined the Second World War in December 1941.",
  r: "Japan attacked the American naval base at Pearl Harbour on 7 December 1941.",
  sol: "Both are true, and R explains A: the surprise attack led the USA to declare war on Japan, and Germany and Italy then declared war on the USA.",
}));
Q("tf_hiroshima_city", tf({
  t: 3, d: 1, c: "recall", ans: true,
  stem: "True or false? Hiroshima and Nagasaki, the two cities struck by atomic bombs in 1945, are in Japan.",
  sol: "True. Both are Japanese cities; the bombings caused very heavy loss of life and lasting suffering from radiation.",
}));
Q("s_pearl_two", short({
  t: 3, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Write two consequences of the Japanese attack on Pearl Harbour in December 1941.",
  model: "1. The **USA** declared war on **Japan** and, with Germany and Italy declaring war on it, joined the **Allies**.\n2. The war became a truly **world war**, fought across **Europe**, **Asia** and the **Pacific**.",
  sol: "Two consequences.",
  scheme: [["USA enters the war", 1], ["The war becomes global", 1]],
}));
Q("s_atomic_two", short({
  t: 3, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Why are the atomic bombings of Hiroshima and Nagasaki seen as a turning point in world history? Give two reasons.",
  model: "1. They brought the war in **Asia** to a quick end, as **Japan** surrendered within days.\n2. They showed the terrible power of **nuclear weapons**, causing very heavy **loss of life**, and began the **nuclear age** and arms race.",
  sol: "End of the war; nuclear age.",
  scheme: [["Ended the war in Asia", 1], ["Nuclear age and its dangers", 1]],
}));

// ================================================================ t04 Consequences
Q("m_germany_surrender", mcq({
  t: 4, d: 4, c: "application",
  stem: "An imagined London diary entry of May 1945 records crowds celebrating that the war in Europe is over, while the writer's brother is still fighting in Asia. Which of these statements could the diarist NOT truthfully have written that month?",
  opts: ["Japan has surrendered after the atomic bombs", "Germany has surrendered and the war in Europe is over", "The USA has been at war for more than three years", "Japan is still fighting in Asia and the Pacific"],
  sol: "The atomic bombs were dropped in August 1945, and Japan surrendered after them, so a diarist writing in May could not have known of either. Germany had surrendered in May, the USA had been at war since December 1941, and Japan was still fighting.",
}));
Q("m_un_date", mcq({
  t: 4, d: 1, c: "recall",
  stem: "The United Nations came into existence after the Second World War on which date?",
  opts: ["24 October 1945", "10 January 1920", "4 April 1949", "7 December 1941"],
  sol: "The UN came into existence on 24 October 1945. The League began work in January 1920, and NATO was founded in April 1949.",
}));
Q("m_superpowers", mcq({
  t: 4, d: 2, c: "understanding",
  stem: "Which two countries emerged from the Second World War as the world's leading powers, often called superpowers?",
  opts: ["The USA and the USSR", "Britain and France", "Germany and Japan", "Italy and China"],
  sol: "The war weakened Britain and France and defeated Germany, Italy and Japan; the USA and the USSR emerged as the two superpowers.",
}));
Q("m_axis_members", mcq({
  t: 4, d: 2, c: "recall",
  stem: "Which three powers formed the Axis that was defeated in the Second World War?",
  opts: ["Germany, Italy and Japan", "Britain, France and the USSR", "Germany, the USSR and Poland", "Japan, China and the USA"],
  sol: "The Axis powers were Germany, Italy and Japan. Britain, France, the USSR, the USA and China were among the Allies.",
}));
Q("ar_un", ar({
  t: 4, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The United Nations was set up in 1945.",
  r: "The League of Nations had failed to prevent a second world war.",
  sol: "Both are true, and R explains A: the League's failure led the Allies to create a stronger international body to keep the peace after the war.",
}));
Q("s_consequences_two", short({
  t: 4, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Mention two political consequences of the Second World War for the world.",
  model: "1. The **Axis** powers, **Germany**, **Italy** and **Japan**, were **defeated**, and Germany was occupied and later divided.\n2. The **United Nations** was formed in **1945**, and the **USA** and **USSR** emerged as **superpowers**.",
  sol: "Any two consequences.",
  scheme: [["First consequence", 1], ["Second consequence", 1]],
}));
Q("s3_consequences", short({
  t: 4, d: 3, c: "analysis", marks: 3, wl: S3,
  stem: "Explain three ways in which the world after 1945 was different from the world before the Second World War.",
  model: "1. **Britain** and **France** were weakened, while the **USA** and the **USSR** became **superpowers**.\n2. A new body, the **United Nations**, replaced the failed **League of Nations**.\n3. Rivalry between the two superpowers began the **Cold War**, dividing much of the world into two **blocs**.",
  sol: "Three changes.",
  scheme: [["Superpowers", 1], ["United Nations", 1], ["Cold War", 1]],
}));
Q("l_consequences", long({
  t: [3, 4], d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "With reference to the end of the Second World War, answer the following.\n\n(i) How did the war end in Europe and in Asia? **[3]**\n(ii) State three consequences of the war for the world order. **[3]**\n(iii) Explain how the war led to the Cold War between the USA and the USSR. **[4]**",
  model: "(i) In Europe, **Germany** surrendered unconditionally in **May 1945**. In Asia, after the USA dropped atomic bombs on **Hiroshima** (**6 August**) and **Nagasaki** (**9 August 1945**), **Japan** announced its surrender, which was signed in early **September 1945**.\n\n(ii) The **Axis** powers were **defeated**; the **United Nations** came into existence on **24 October 1945**; and the **USA** and the **USSR** emerged as **superpowers**, while Britain and France were weakened.\n\n(iii) The two superpowers had been **allies** only against a common enemy. After the war their **ideologies** clashed: the USA stood for **capitalism** and multi-party democracy, the USSR for **communism**. Each **distrusted** the other, especially over **Eastern Europe**, which came under Soviet influence, and each built up **nuclear** and other weapons. This rivalry, fought through **alliances**, an **arms race** and propaganda rather than direct war, became the **Cold War**.",
  sol: "End of the war; consequences; origin of the Cold War.",
  scheme: [["(i) Germany, May 1945", 1], ["(i) Atomic bombs and Japan's surrender", 2], ["(ii) Three consequences", 3], ["(iii) Clash of ideologies", 2], ["(iii) Distrust, arms race, Cold War", 2]],
}));

// ================================================================ t05 Cold War, NATO and the Warsaw Pact (meaning only)
Q("m_coldwar_meaning", mcq({
  t: 5, d: 2, c: "understanding",
  stem: "Why was the rivalry between the USA and the USSR after 1945 called a cold war?",
  opts: ["The two superpowers competed through alliances, an arms race and propaganda without fighting each other directly", "It was fought only in the polar regions", "It was a war that took place in winter", "It ended within one year"],
  sol: "Cold means there was no direct full-scale war between the two superpowers; they competed through alliances, weapons and propaganda.",
}));
Q("m_nato_meaning", mcq({
  t: 5, d: 1, c: "recall",
  stem: "NATO, formed in 1949, was",
  opts: ["a military alliance of the USA and western European countries for mutual defence", "an alliance of the USSR and eastern European states", "an agency of the United Nations for health", "a group of non-aligned countries"],
  sol: "The North Atlantic Treaty Organisation (1949) joined the USA, Canada and western European countries, promising to defend one another. The Warsaw Pact was the Soviet-led alliance.",
}));
Q("m_warsaw_year", mcq({
  t: 5, d: 3, c: "recall",
  stem: "An imagined factory newsletter from Poland in 1955 announces that the country has joined a new military alliance led by the Soviet Union and signed in the Polish capital. Which alliance is meant?",
  opts: ["The Warsaw Pact", "NATO", "The Rome-Berlin Axis", "The League of Nations"],
  sol: "The Warsaw Pact of 1955, named after the Polish capital, joined the USSR and the communist states of eastern Europe. NATO was the western alliance.",
}));
Q("m_nato_year", mcq({
  t: 5, d: 3, c: "recall",
  stem: "An imagined Canadian sailor writes in 1950 that his country joined, the year before, an alliance with the USA and western Europe in which an attack on one member is treated as an attack on all. Which alliance is it?",
  opts: ["The North Atlantic Treaty Organisation", "The Warsaw Pact", "The Rome-Berlin Axis", "The Triple Entente"],
  sol: "NATO was formed in April 1949 by the USA, Canada and western European countries for mutual defence. The Warsaw Pact was the Soviet-led alliance of 1955.",
}));
Q("m_app_pact_cartoon", mcq({
  t: 2, d: 4, c: "analysis",
  stem: "An imagined cartoon of late August 1939 shows two dictators who had long attacked each other in speeches shaking hands over a map of the country lying between them. A student says: 'The handshake proves that Germany and the USSR had become lasting friends.' Which reply is best supported by what happened next?",
  opts: ["It was a convenience: it protected Germany's eastern side while it attacked Poland, and Germany itself invaded the USSR in 1941", "The student is right, because the two states fought side by side against Britain until 1945", "The student is right, because the pact made the USSR a member of the Axis with Italy and Japan", "The student is wrong, because the pact was signed to stop Germany attacking Poland"],
  sol: "The Non-Aggression Pact of 23 August 1939 freed Hitler from a war on two fronts when he invaded Poland on 1 September, but it did not end the hostility: Germany invaded the USSR in 1941, and the USSR then fought on the Allied side. It never joined the Axis, and it did not prevent the attack on Poland.",
}));
Q("m_app_aid_offers", mcq({
  t: 5, d: 4, c: "understanding",
  stem: "In an imagined case of 1956, a newly independent country receives offers of loans and weapons from both superpowers. Its leaders fear that taking arms from one will make the other treat it as an opponent. Which course would best protect its independence?",
  opts: ["Stay outside both military alliances and accept help from either on its own terms (non-alignment)", "Join the alliance of the superpower that offered the larger loan", "Join both alliances at once, so that neither superpower can object", "Refuse all foreign help permanently, whatever the cost to its development"],
  sol: "Staying outside both blocs, while dealing with both on its own terms, keeps the country free of obligations to either superpower. Joining one bloc invites the opposition of the other, the two alliances were rivals and could not both be joined, and refusing all help would ignore the country's need for development.",
}));
Q("s_app_sanctions_letter", short({
  t: 2, d: 3, c: "application", marks: 2, wl: S2,
  stem: "An imagined Abyssinian envoy writes to the League in 1936 that its sanctions on Italy shut the front door but left the back door open. Explain what the envoy means.",
  model: "The sanctions banned some trade but **left out oil** and other vital goods, so Italy could still supply its armies. Because members did not **enforce** them firmly, Italy **completed** its conquest of Abyssinia.",
  sol: "Weak sanctions; conquest completed.",
  scheme: [["Vital goods left out", 1], ["Italy completed the conquest", 1]],
}));
Q("ar_coldwar", ar({
  t: 5, d: 3, c: "analysis", verdict: "both-true-not-explains",
  a: "The Cold War divided much of the world into two rival blocs.",
  r: "The United Nations came into existence in 1945.",
  sol: "Both are true, but R does not explain A. The blocs grew from the rivalry and distrust between the USA and the USSR, not from the founding of the United Nations.",
}));
Q("ar_warsaw", ar({
  t: 5, d: 3, c: "analysis", verdict: "A-false-R-true",
  a: "The Warsaw Pact was an alliance led by the United States.",
  r: "The Warsaw Pact was formed in 1955.",
  sol: "A is false: the Warsaw Pact was led by the USSR. R is true: it was formed in 1955.",
}));
Q("tf_coldwar_direct", tf({
  t: 5, d: 2, c: "understanding", ans: false,
  stem: "True or false? During the Cold War, the armies of the USA and the USSR fought a full-scale war directly against each other.",
  sol: "False. The two superpowers never fought each other directly in a full-scale war; they competed through alliances, an arms race and propaganda.",
}));
Q("fb_warsaw", fb({
  t: 5, d: 1, c: "recall",
  stem: "The military alliance formed in 1955 by the USSR and the communist countries of eastern Europe was called the ___ Pact.",
  acc: [["Warsaw"]],
  sol: "It was the Warsaw Pact.",
}));
Q("s_coldwar_meaning", short({
  t: 5, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "What is meant by the Cold War? Name the two powers that led it.",
  model: "The Cold War was the long **rivalry** after **1945** in which the two sides competed through **alliances**, an **arms race** and **propaganda**, without fighting each other **directly**. It was led by the **USA** and the **USSR**.",
  sol: "Meaning; the two powers.",
  scheme: [["Meaning", 1], ["USA and USSR", 1]],
}));
Q("s_warsaw_two", short({
  t: 5, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "What were NATO and the Warsaw Pact? State the year in which each was formed.",
  model: "**NATO** (**1949**) was a **military alliance** of the **USA** and western countries for mutual defence. The **Warsaw Pact** (**1955**) was the rival alliance of the **USSR** and the **communist** states of eastern Europe.",
  sol: "Meaning and year of each.",
  scheme: [["NATO and 1949", 1], ["Warsaw Pact and 1955", 1]],
}));
Q("s_nato_two", short({
  t: 5, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "How did the formation of NATO and then the Warsaw Pact deepen the division between East and West?",
  model: "Each alliance bound its members to **defend** one another, so Europe was split into two armed **blocs** facing each other. Fear of the other bloc led to an **arms race** and deeper **suspicion**.",
  sol: "Rival armed blocs; arms race.",
  scheme: [["Two armed blocs", 1], ["Arms race and suspicion", 1]],
}));
Q("l_coldwar", long({
  t: [4, 5], d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "With reference to the Cold War, answer the following.\n\n(i) What is meant by the Cold War, and why did it begin after 1945? **[3]**\n(ii) What were NATO and the Warsaw Pact? **[3]**\n(iii) Evaluate how the Cold War affected the newly independent countries of Asia and Africa. **[4]**",
  model: "(i) The Cold War was the rivalry between the **USA** and the **USSR** in which they competed through **alliances**, an **arms race** and **propaganda** without fighting each other directly. It began because their **ideologies** clashed, capitalism against **communism**, and each **distrusted** the other after the war, especially over **Eastern Europe**.\n\n(ii) **NATO** (**1949**) was a **military alliance** of the **USA**, **Canada** and western European countries for **mutual defence**. The **Warsaw Pact** (**1955**) was the rival military alliance of the **USSR** and the communist states of **eastern Europe**.\n\n(iii) Both blocs tried to win **new nations** as allies, offering **aid** and **weapons**. This brought **pressure** on new states to take sides and sometimes drew them into **conflicts**. On the other hand, the rivalry let them seek **help** from both sides, and many, including **India**, chose to stay **non-aligned**, keeping their freedom of action while working for **peace**.",
  sol: "Meaning and origin; the two alliances; effect on new nations.",
  scheme: [["(i) Meaning", 2], ["(i) Why it began", 1], ["(ii) NATO", 2], ["(ii) Warsaw Pact", 1], ["(iii) Pressure on new nations", 2], ["(iii) Benefits and non-alignment", 2]],
}));

// ================================================================ cross-topic
Q("match_ch16", match({
  t: [1, 2, 3, 5], d: 2, c: "understanding", marks: 2,
  stem: "Match each event or term from the years 1936 to 1955 with its description.",
  pairs: [
    ["Anschluss", "Union of Austria with Germany, 1938"],
    ["Munich Agreement", "Sudetenland handed to Germany, 1938"],
    ["Pearl Harbour", "Japanese attack that brought the USA into the war, 1941"],
    ["Warsaw Pact", "Military alliance of the USSR and eastern European states, 1955"],
  ],
  sol: "The Anschluss joined Austria to Germany; Munich gave Germany the Sudetenland; Pearl Harbour brought the USA into the war; the Warsaw Pact was the Soviet-led alliance.",
}));
Q("ord_ch16", ord({
  t: [1, 2, 3, 4, 5], d: 2, c: "understanding", marks: 1,
  stem: "Arrange these events connected with the Second World War and its aftermath in the order in which they happened.",
  items: [
    "Japan seizes Manchuria",
    "The Munich Agreement",
    "Germany invades Poland",
    "Japan attacks Pearl Harbour",
    "Formation of NATO",
  ],
  sol: "Manchuria (1931), Munich (1938), Poland (1939), Pearl Harbour (1941), NATO (1949).",
}));
Q("l_timeline", long({
  t: [1, 2, 3, 4, 5], d: 3, c: "application", marks: 10, wl: L10,
  stem: "Study the timeline from 1919 to 1955 drawn by SOYL and answer the questions that follow.\n\n(i) Identify three acts of aggression on the timeline between 1931 and 1938. **[3]**\n(ii) How many years separate the Treaty of Versailles from the outbreak of the Second World War? Why do some historians link the two events? **[3]**\n(iii) Using the events of 1945, 1949 and 1955, explain how the end of the war led to a new kind of conflict. **[4]**",
  model: `(i) **1931:** Japan seized **Manchuria**. **1935:** Italy invaded **Abyssinia**. **1936:** Germany remilitarised the **Rhineland** (and in **1938** annexed **Austria** and took the **Sudetenland**).\n\n(ii) **${yearsBetween(VERSAILLES, POLAND)} years** (${POLAND} − ${VERSAILLES}). Historians link them because German **resentment** of the treaty's **war guilt**, **reparations** and lost land helped **Hitler** rise to power and win support for overturning it by force.\n\n(iii) In **1945** the war ended with the **atomic bombs** and the defeat of the Axis, and the **United Nations** was formed. But the **USA** and the **USSR**, former allies, now became rival **superpowers**. In **1949** the West formed **NATO**, and in **1955** the USSR answered with the **Warsaw Pact**. Europe was divided into two armed **blocs**, and the rivalry, fought by alliances, arms and propaganda rather than direct war, became the **Cold War**.`,
  sol: "Three acts of aggression; the gap and the link; 1945, 1949 and 1955.",
  scheme: [["(i) Three acts", 3], ["(ii) Correct number of years", 1], ["(ii) The link through resentment", 2], ["(iii) 1945", 1], ["(iii) Superpower rivalry", 1], ["(iii) NATO and the Warsaw Pact", 2]],
  assets: [timelineSvg(TL_ALT, "Schematic timeline drawn by SOYL; label positions are for legibility only.")],
}));
Q("l_blocs_picture", long({
  t: [4, 5], d: 3, c: "application", marks: 10, wl: L10,
  stem: "Study the diagram of the two Cold War blocs drawn by SOYL and answer the questions.\n\n(i) Name the two blocs shown, their leaders and their military alliances. **[3]**\n(ii) Why did the two former allies of the war become rivals? **[3]**\n(iii) Explain four features of the Cold War that the diagram does not show directly. **[4]**",
  model: "(i) The **Western bloc**, led by the **USA**, with **NATO** (**1949**); and the **Eastern bloc**, led by the **USSR**, with the **Warsaw Pact** (**1955**).\n\n(ii) The USA and the USSR had fought together only against a **common enemy**. After the war their **ideologies** clashed, **capitalism** against **communism**; the West feared Soviet influence in **Eastern Europe**, and the USSR feared the West's **atomic** power and its support for western Europe.\n\n(iii) There was an **arms race** in nuclear and other weapons; each side spread **propaganda** against the other; the superpowers competed for **allies** among new nations with **aid**; and they sometimes backed opposite sides in **local conflicts** while avoiding a direct war with each other.",
  sol: "Blocs; reasons for rivalry; features.",
  scheme: [["(i) Western bloc and NATO", 1], ["(i) Eastern bloc and Warsaw Pact", 2], ["(ii) Ideological clash", 2], ["(ii) Mutual fear", 1], ["(iii) Four features", 4]],
  assets: [blocsSvg(BLOCS_ALT, "Cold War blocs in Europe (schematic, drawn by SOYL; members shown are examples only).")],
}));

// ================================================================ source-based (imagined documents)
Q("sb_munich_diary", source({
  t: 1, d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from the imagined diary of a newspaper typist and answer the questions that follow. ${IMAG}`,
  passage: "**Diary of an imagined newspaper typist in London, autumn 1938**\n\nThe crowds outside the office cheered today when the news came from the Bavarian city: the four leaders have agreed, and the German-speaking border lands of the young central European republic will pass to Germany. My editor did not cheer. He said that the republic whose land was given away had not even been asked, and that each time we give way the man in Berlin simply asks for more. My brother, who fought in the last war, said only that he was glad his son would not have to.",
  parts: [
    child("a", short({ t: 1, d: 1, c: "recall", marks: 1, stem: "Name the agreement the crowds were cheering and the region it handed over.", model: "The **Munich Agreement** (1938); the **Sudetenland**.", sol: "Munich; Sudetenland.", scheme: [["Munich and Sudetenland", 1]] })),
    child("b", short({ t: 1, d: 2, c: "application", marks: 1, stem: "Which country is the young central European republic that had not been asked?", model: "**Czechoslovakia**.", sol: "Czechoslovakia.", scheme: [["Czechoslovakia", 1]] })),
    child("c", short({ t: 1, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): Which policy does the editor criticise, and what danger does he see in it?", model: "**Appeasement**. He fears that each **concession** only **encourages** Hitler to make **further demands**, as happened when Germany took the rest of Czechoslovakia in 1939.", sol: "Appeasement and its danger.", scheme: [["Policy named", 1], ["Danger explained", 1]] }), [
      short({ t: 1, d: 3, c: "evaluation", marks: 2, stem: "**Or** (ii): Why might the brother, a soldier of the last war, have supported the agreement? Give two reasons.", model: "He remembered the terrible **suffering** of **1914–18** and wanted to **avoid** another war; many people also felt Britain was **not ready** to fight in 1938.", sol: "Two reasons for support.", scheme: [["Fear of another war", 1], ["Not ready to fight", 1]] }),
    ]),
  ],
}));
Q("sb_harbour_letter", source({
  t: [2, 3], d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: "**Letter from an imagined clerk in Singapore to his sister in Madras, mid-December 1941**\n\nThe wireless here talks of nothing else. Last Sunday morning aircraft of the empire that has been fighting in China for four years struck the great American fleet at its island base in the Pacific. The Americans, who had stayed out of the war for over two years, are now in it. Our office manager says the war has become truly worldwide, and that the fighting may soon reach these shores.",
  parts: [
    child("a", short({ t: 3, d: 1, c: "recall", marks: 1, stem: "Name the attack described and the country that carried it out.", model: "The attack on **Pearl Harbour** (7 December 1941), carried out by **Japan**.", sol: "Pearl Harbour; Japan.", scheme: [["Pearl Harbour and Japan", 1]] })),
    child("b", short({ t: 2, d: 2, c: "application", marks: 1, stem: "In which year had this empire begun its full-scale war in China, about four years before the letter?", model: "**1937**.", sol: "1937.", scheme: [["1937", 1]] })),
    child("c", short({ t: 3, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): Why does the office manager say the war has become truly worldwide?", model: "With the **USA** now fighting **Japan**, and Germany and Italy at war with the USA, the war spread across **Europe**, **Asia** and the **Pacific**, involving all the major powers.", sol: "USA enters; war spreads.", scheme: [["USA enters", 1], ["Spread across continents", 1]] }), [
      short({ t: 3, d: 3, c: "analysis", marks: 2, stem: "**Or** (ii): The letter says the Americans had stayed out for over two years. When had the war begun in Europe, and what event began it?", model: "On **1 September 1939**, when **Germany invaded Poland**; Britain and France declared war two days later.", sol: "Poland, 1939.", scheme: [["Date", 1], ["Invasion of Poland", 1]] }),
    ]),
  ],
}));
Q("sb_geneva_lecture", source({
  t: [4, 5], d: 4, c: "evaluation", origin: "soyl-original",
  stem: `Read the extract from the imagined notes of a student and answer the questions that follow. ${IMAG}`,
  passage: "**Notes of an imagined Indian college student at a public lecture in Delhi, 1956**\n\nThe speaker said the world had escaped one great war only to fall into a long quarrel of a new kind. The two giants that defeated the Axis now distrust each other. One leads an alliance of western countries formed seven years ago; the other answered last year with an alliance of its own in eastern Europe. They do not fight each other directly, but they race to build weapons and compete for friends. He said that new nations like ours need not join either camp.",
  parts: [
    child("a", short({ t: 4, d: 1, c: "recall", marks: 1, stem: "Name the two giants the speaker refers to.", model: "The **USA** and the **USSR**.", sol: "The two superpowers.", scheme: [["USA and USSR", 1]] })),
    child("b", short({ t: 5, d: 2, c: "application", marks: 1, stem: "Name the two alliances described in the notes.", model: "**NATO** (formed **1949**) and the **Warsaw Pact** (**1955**).", sol: "NATO; Warsaw Pact.", scheme: [["Both alliances", 1]] })),
    child("c", short({ t: 5, d: 4, c: "evaluation", marks: 2, stem: "**Either** (i): Why is this quarrel of a new kind called the Cold War? Use two features from the notes.", model: "There was **no direct war** between the two superpowers; instead they competed through an **arms race** and rivalry for **allies** and influence.", sol: "No direct war; arms race and rivalry.", scheme: [["No direct war", 1], ["Arms race or rivalry for friends", 1]] }), [
      short({ t: 5, d: 4, c: "evaluation", marks: 2, stem: "**Or** (ii): Give one advantage and one risk for a new nation that decided to join neither camp.", model: "**Advantage:** it kept its **freedom** to decide its own policies and could seek help from both sides. **Risk:** it might face **pressure** from both blocs and lack the protection of an alliance.", sol: "One advantage, one risk.", scheme: [["Advantage", 1], ["Risk", 1]] }),
    ]),
  ],
}));

// ================================================================ application items (imagined scenarios)
Q("m_app_poster", mcq({
  t: 1, d: 4, c: "analysis",
  stem: "An imagined German poster of 1936 shows soldiers crossing a bridge over a great western river, with the words 'our own land again'. A student says the poster shows Germany recovering territory that the Treaty of Versailles had taken away. Which correction is best?",
  opts: ["The Rhineland had stayed German; the treaty only banned troops there, so the poster describes the breaking of a restriction as if it were a recovery of land", "The student is right, because the treaty had handed the Rhineland to France", "The student is right, because the treaty had placed the Rhineland under League of Nations rule, as it did with the Saar", "The student is wrong, because the poster must show the Anschluss of 1938"],
  sol: "The Rhineland remained part of Germany; the treaty demilitarised it, so German troops entering in March 1936 broke a restriction and did not regain lost land. It was not given to France, the Saar (not the Rhineland) was placed under the League for a time, and the Anschluss concerned Austria.",
}));
Q("m_app_radio", mcq({
  t: 2, d: 4, c: "analysis",
  stem: "An imagined radio broadcast in London on a Sunday morning in September 1939 says the country is at war because a promise to an eastern European ally has been broken. A listener asks why Britain went to war over Poland in 1939 but had not done so over Austria in 1938. Which explanation fits best?",
  opts: ["After March 1939 Britain and France had given Poland a guarantee, so an attack on it broke a promise; they had made no such promise to Austria", "The Treaty of Versailles had created Poland, so Britain was bound by that treaty to defend it", "Poland was a member of the League of Nations, whereas Austria was not", "Germany had left the League of Nations in 1933, so any later attack automatically meant war"],
  sol: "Britain and France guaranteed Poland's independence in March 1939, after Germany occupied the rest of Czechoslovakia; Hitler's attack on 1 September broke that guarantee and they declared war on 3 September. Poland did owe its re-creation to the 1919 settlement, but that created no duty to defend it. Austria was a League member too, and leaving the League did not bring war.",
}));
Q("m_app_map", mcq({
  t: 1, d: 4, c: "understanding",
  stem: "A student's imagined sketch map of Europe in 1938 shades Austria in the same colour as Germany, and the student writes beneath it: 'Germany conquered Austria in a war.' Which correction fits the facts?",
  opts: ["Austria was joined to Germany in March 1938 without a war, by the Anschluss, which broke the Versailles ban on such a union and met no armed response from Britain or France", "Austria was handed to Germany by the Munich Agreement in September 1938", "Austria was joined to Germany after the League of Nations voted for the union", "Austria was conquered in 1939 in the same campaign as Poland"],
  sol: "German troops entered Austria in March 1938 and it was declared part of Germany; there was no war, and the union broke the ban in the treaties of 1919 while Britain and France protested but took no military action. Munich in September 1938 concerned the Sudetenland. The League never approved the union, and Poland was invaded in 1939, not Austria.",
}));
Q("m_app_sanctions", mcq({
  t: 2, d: 4, c: "analysis",
  stem: "An imagined shipping clerk in 1936 notes that oil tankers are still sailing to an Italian port although Italy is under League sanctions. A historian claims: 'Had the League simply added oil to its list, Italy's campaign would have been stopped.' Which qualification is soundest?",
  opts: ["An oil ban could have hampered Italy, but only if the main oil suppliers, including countries outside the League such as the USA, also stopped selling", "No qualification is needed, since Italy produced no oil and the League members supplied all of it", "An oil ban would have made no difference, because Italy produced all the oil it needed", "An oil ban would have forced the League to send its own army, which would have ended the war at once"],
  sol: "Oil was left out of the sanctions, but a ban could work only if the major suppliers, including non-members such as the USA, joined it; otherwise Italy could buy elsewhere. Italy imported most of its oil, and the League had no army of its own.",
}));
Q("m_app_arms", mcq({
  t: 5, d: 4, c: "analysis",
  stem: "An imagined news report of 1953 says that each of two rival powers has tested a more powerful bomb, and that each fears falling behind the other. A student concludes: 'So a direct full-scale war between them is now certain.' Which reply is best?",
  opts: ["Overstated: the race raised fear and rivalry, but the terrible power of the weapons made direct war risky for both, and the Cold War was carried on through rivalry and alliances", "Correct: the Cold War was itself a direct full-scale war fought between their armies from 1945", "Mistaken: only one of the two powers was building bombs, so there was no race", "Mistaken: the race had already ended when NATO was formed in 1949"],
  sol: "Competing to build ever stronger weapons was the arms race, which deepened mistrust, but the Cold War stayed a rivalry without a direct full-scale war between the USA and the USSR. Both were building weapons, and the race continued well after 1949.",
}));
Q("m_app_un_choice", mcq({
  t: 4, d: 4, c: "application",
  stem: "In an imagined school debate in 1946, a student says a new world body will not succeed merely because it is new. Using the League's record in the 1930s, which condition for success is best supported?",
  opts: ["Its leading members must be ready to back its decisions with real action, since the League had no army and its sanctions were weakly enforced", "It must hold its meetings at Geneva, as the League did", "It must rely on condemning aggressors, as the League had done successfully over Manchuria", "It must admit only states that have never broken a treaty"],
  sol: "The League failed over Manchuria and Abyssinia because it had no army of its own and its leading members would not enforce sanctions firmly, so a new body needs members ready to act. The League's home at Geneva was not the cause of failure, its condemnation of Japan did not succeed, and a rule excluding all treaty-breakers is not suggested by that record.",
}));
Q("s_app_wrong_claim", short({
  t: [1, 2], d: 3, c: "application", marks: 2, wl: S2,
  stem: "A student writes that the invasion of Poland alone caused the Second World War. Correct this view in two points.",
  model: "1. The invasion of **Poland** was only the **immediate cause**.\n2. The **long-term causes** were already present: resentment of **Versailles**, the rise of **Fascism** and **Nazism**, **appeasement**, Japanese aggression and the **failure** of the League.",
  sol: "Immediate versus long-term causes.",
  scheme: [["Immediate cause only", 1], ["Long-term causes", 1]],
}));

// ================================================================ deck checks (objective; not used in tests)
Q("m_chk_axis", mcq({
  t: 1, d: 1, c: "recall",
  stem: "Which agreement of 1936 brought Fascist Italy and Nazi Germany together?",
  opts: ["The Rome-Berlin Axis", "The North Atlantic Treaty", "The Warsaw Pact", "The Treaty of Versailles"],
  sol: "The Rome-Berlin Axis of 1936 linked Italy and Germany; Japan later joined them.",
}));
Q("tf_chk_munich", tf({
  t: 1, d: 1, c: "recall", ans: true,
  stem: "True or false? Under the Munich Agreement of 1938, Germany was allowed to take the Sudetenland.",
  sol: "True. Britain, France, Germany and Italy agreed to hand the Sudetenland to Germany.",
}));
Q("fb_chk_poland", fb({
  t: 2, d: 1, c: "recall",
  stem: "The Second World War began when Germany invaded ___ on 1 September 1939.",
  acc: [["Poland"]],
  sol: "Germany invaded Poland on 1 September 1939.",
}));
Q("m_chk_abyssinia", mcq({
  t: 2, d: 2, c: "recall",
  stem: "Which country invaded Abyssinia in 1935?",
  opts: ["Italy", "Japan", "Germany", "Britain"],
  sol: "Mussolini's Italy invaded Abyssinia in 1935.",
}));
Q("m_chk_pearl", mcq({
  t: 3, d: 1, c: "recall",
  stem: "The attack on Pearl Harbour in 1941 was carried out by",
  opts: ["Japan", "Germany", "Italy", "the USSR"],
  sol: "Japan attacked the American base at Pearl Harbour on 7 December 1941.",
}));
Q("fb_chk_un", fb({
  t: 4, d: 1, c: "recall",
  stem: "The United Nations came into existence on 24 October ___.",
  acc: [["1945"]],
  sol: "The United Nations came into existence on 24 October 1945.",
}));
Q("tf_chk_nato", tf({
  t: 5, d: 1, c: "recall", ans: false,
  stem: "True or false? The USSR was a member of NATO.",
  sol: "False. NATO was the western alliance led by the USA; the USSR led the rival Warsaw Pact.",
}));
Q("m_chk_hiroshima", mcq({
  t: 3, d: 2, c: "recall",
  stem: "On which Japanese city was the first atomic bomb dropped, on 6 August 1945?",
  opts: ["Hiroshima", "Nagasaki", "Tokyo", "Osaka"],
  sol: "The first atomic bomb was dropped on Hiroshima on 6 August 1945; the second on Nagasaki on 9 August.",
}));
