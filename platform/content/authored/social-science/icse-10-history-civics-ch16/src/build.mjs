// Build ICSE 10 History & Civics ch16 The Second World War and the Cold War. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch16/src/build.mjs
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../icse-10-history-civics-ch01/src/lib.mjs";

setUnit("icse-10-history-civics-ch16", "social-science");
const { blocsSvg, timelineSvg, TL_ALT, BLOCS_ALT, EVENTS, VERSAILLES, POLAND, MANCHURIA, PEARL, WAR_END, NATO, WARSAW, yearsBetween } = await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(yearsBetween(VERSAILLES, POLAND), 20);
assert.equal(yearsBetween(POLAND, WAR_END), 6);
assert.equal(yearsBetween(NATO, WARSAW), 6);
assert.ok(EVENTS.some(([y]) => y === PEARL) && EVENTS.some(([y]) => y === MANCHURIA));

// ---------------------------------------------------------------- figures
const vTimeline = timelineSvg(TL_ALT, "Schematic timeline drawn by SOYL; label positions are for legibility only.");
const vBlocs = blocsSvg(BLOCS_ALT, "Cold War blocs in Europe (schematic, drawn by SOYL; members shown are examples only).");
const vRoute1 = flow("LR", ["Grievance over Versailles", "Dictators in Italy and Germany", "Appeasement", "Aggression in Asia and Africa", "Poland, 1939"], "Route map of Part 1: grievance over Versailles, dictators in Italy and Germany, appeasement, aggression in Asia and Africa, and the invasion of Poland in 1939", "Part 1 at a glance");
const vRoute2 = flow("LR", ["Pearl Harbour, 1941", "Hiroshima and Nagasaki, 1945", "Axis defeated", "United Nations, 1945", "Cold War: NATO 1949, Warsaw Pact 1955"], "Route map of Part 2: Pearl Harbour in 1941, Hiroshima and Nagasaki in 1945, defeat of the Axis, the United Nations in 1945, and the Cold War with NATO in 1949 and the Warsaw Pact in 1955", "Part 2 at a glance");
const vVersailles = table(["Term of 1919", "Why Germans resented it"], [
  ["War-guilt clause", "Blamed Germany alone for the war"],
  ["Reparations", "Heavy payments in hard times"],
  ["Lost land", "Alsace-Lorraine, Polish Corridor, colonies"],
  ["Small army", "Seen as leaving Germany defenceless"],
], "Table of terms of 1919 that Germans resented: the war-guilt clause, reparations, loss of Alsace-Lorraine, the Polish Corridor and colonies, and the small army");
const vDictators = table(["Country", "Leader", "Came to power", "Aims"], [
  ["Italy", "Benito Mussolini", "1922", "Glory through expansion, as in Abyssinia"],
  ["Germany", "Adolf Hitler", "1933", "Overturn Versailles, rearm, expand east"],
  ["Japan", "Military-led government", "1930s", "Empire in East Asia, beginning with China"],
], "Table of the aggressive powers: Italy under Mussolini from 1922 seeking expansion; Germany under Hitler from 1933 seeking to overturn Versailles, rearm and expand; Japan under a military-led government in the 1930s seeking an empire in East Asia");
const vAppease = flow("TB", ["1936: Rhineland remilitarised; no action", "March 1938: Anschluss with Austria", "September 1938: Munich gives the Sudetenland to Germany", "March 1939: rest of Czechoslovakia occupied", "Britain and France guarantee Poland"], "Flow of appeasement: the Rhineland remilitarised in 1936 with no action; the Anschluss in March 1938; Munich giving the Sudetenland to Germany in September 1938; the rest of Czechoslovakia occupied in March 1939; Britain and France then guarantee Poland", "Each step encouraged the next.");
const vAppeasePlan = table(["Part", "Marks", "What to write"], [
  ["(i) Versailles", "3", "War guilt; reparations and lost land; dictated peace"],
  ["(ii) Dictators", "3", "Mussolini and Hitler; force and rearmament; the Axis"],
  ["(iii) Appeasement", "4", "Rhineland, Austria, Munich; why it encouraged Hitler"],
], "Worked example table planning a ten-mark answer on the European causes: three points on Versailles, three on the dictators, and four on appeasement", "Plan before you write.");
const vLeagueFail = table(["Crisis", "Aggressor", "League's response", "Result"], [
  ["Manchuria, 1931", "Japan", "Condemned it", "Japan left the League, 1933"],
  ["Abyssinia, 1935", "Italy", "Weak sanctions, no oil ban", "Conquest completed"],
  ["China, 1937", "Japan", "No effective action", "War spread in Asia"],
], "Table of the League's failures: Manchuria in 1931, where Japan was condemned and left the League in 1933; Abyssinia in 1935, where Italy faced weak sanctions without an oil ban and completed its conquest; and China in 1937, where the League took no effective action");
const vPoland = flow("TB", ["23 August 1939: Nazi-Soviet Non-Aggression Pact", "1 September 1939: Germany invades Poland", "3 September 1939: Britain and France declare war"], "Flow of the outbreak of war: the Nazi-Soviet Non-Aggression Pact on 23 August 1939, Germany invading Poland on 1 September, and Britain and France declaring war on 3 September 1939", "Eleven days that began the war.");
const vCausesSort = table(["Long-term causes", "Immediate cause"], [
  ["Resentment of Versailles; dictatorships; appeasement", "German invasion of Poland, 1 September 1939"],
  ["Japanese and Italian aggression; failure of the League", "(the spark)"],
], "Table separating long-term causes, namely resentment of Versailles, dictatorships, appeasement, Japanese and Italian aggression and the League's failure, from the immediate cause, the German invasion of Poland on 1 September 1939");
const vPearl = table(["Question", "Answer"], [
  ["When?", "7 December 1941"],
  ["Where?", "American naval base at Pearl Harbour, Hawaii"],
  ["By whom?", "Japan"],
  ["Result", "The USA entered the war; it became a world war"],
], "Table about Pearl Harbour: on 7 December 1941 Japan attacked the American naval base at Pearl Harbour in Hawaii, and the USA entered the war, which became a world war");
const vSides = table(["Side", "Main members", "Where they fought"], [
  ["Axis", "Germany, Italy, Japan", "Europe, North Africa, Asia and the Pacific"],
  ["Allies", "Britain, the USSR (from 1941), the USA (from December 1941), China and others", "Europe, North Africa, Asia and the Pacific"],
], "Table of the two sides: the Axis of Germany, Italy and Japan, and the Allies including Britain, the USSR from 1941, the USA from December 1941 and China, fighting across Europe, North Africa, Asia and the Pacific", "The two sides after 1941.");
const vEnd = flow("TB", ["May 1945: Germany surrenders", "6 August 1945: atomic bomb on Hiroshima", "9 August 1945: atomic bomb on Nagasaki", "August to September 1945: Japan surrenders"], "Flow of the end of the war: Germany surrenders in May 1945; an atomic bomb falls on Hiroshima on 6 August and on Nagasaki on 9 August 1945; Japan surrenders in August to September 1945", "How the war ended.");
const vConseq = table(["Consequence", "Detail"], [
  ["Axis defeated", "Germany, Italy and Japan defeated; Germany occupied"],
  ["New world body", "United Nations, 24 October 1945"],
  ["New powers", "USA and USSR became superpowers"],
  ["New rivalry", "The Cold War between the two blocs"],
], "Table of consequences of the war: the Axis defeated and Germany occupied; the United Nations founded on 24 October 1945; the USA and USSR as superpowers; and the Cold War between two blocs");
const vConseqPlan = table(["Part", "Marks", "What to write"], [
  ["(i) How it ended", "3", "Germany, May 1945; Hiroshima and Nagasaki; Japan's surrender"],
  ["(ii) Consequences", "3", "Axis defeat; United Nations; superpowers"],
  ["(iii) Cold War", "4", "Ideologies; distrust; arms race; blocs"],
], "Worked example table planning a ten-mark answer on the end of the war: three facts on how it ended, three consequences, and four points on the Cold War", "One point for each mark.");
const vColdWar = table(["Feature", "Meaning"], [
  ["No direct war", "The two superpowers never fought each other in a full-scale war"],
  ["Arms race", "Competition in nuclear and other weapons"],
  ["Propaganda", "Each side spread its own ideas and attacked the other"],
  ["Rival alliances", "NATO (1949) and the Warsaw Pact (1955)"],
], "Table of Cold War features: no direct war between the superpowers, an arms race, propaganda, and rival alliances, NATO in 1949 and the Warsaw Pact in 1955");
const vAlliances = table(["Alliance", "Year", "Led by", "Meaning"], [
  ["NATO", `${NATO}`, "USA", "Western military alliance for mutual defence"],
  ["Warsaw Pact", `${WARSAW}`, "USSR", "Military alliance of the USSR and eastern European communist states"],
], `Table of the two Cold War alliances: NATO, ${NATO}, led by the USA, a western military alliance for mutual defence; and the Warsaw Pact, ${WARSAW}, led by the USSR, a military alliance of communist states of eastern Europe`, "Meaning only, as the syllabus requires.");
const vSum1 = flow("TB", ["Versailles resentment helps Hitler", "Dictators glorify force; Rome-Berlin Axis", "Appeasement: Rhineland, Austria, Munich", "League fails: Manchuria, Abyssinia, China", "Poland invaded, 1 September 1939"], "Summary flow of Part 1: resentment of Versailles helps Hitler; dictators glorify force and form the Axis; appeasement over the Rhineland, Austria and Munich; the League fails over Manchuria, Abyssinia and China; Poland is invaded on 1 September 1939", "Part 1 in five lines.");
const vSum2 = flow("TB", ["Pearl Harbour, 7 December 1941: USA enters", "Atomic bombs, 6 and 9 August 1945", "Axis defeated; United Nations, 24 October 1945", "USA and USSR become superpowers", `Cold War: NATO ${NATO}, Warsaw Pact ${WARSAW}`], `Summary flow of Part 2: Pearl Harbour on 7 December 1941 brings in the USA; atomic bombs on 6 and 9 August 1945; the Axis defeated and the United Nations formed on 24 October 1945; the USA and USSR become superpowers; the Cold War with NATO in ${NATO} and the Warsaw Pact in ${WARSAW}`, "Part 2 in five lines.");

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: "The Second World War — Part 1: Causes and the Outbreak of War",
  goals: [
    "Explain how resentment of Versailles and the rise of dictators threatened peace",
    "Describe the policy of appeasement and its results",
    "Explain the failure of the League and the invasion of Poland as the immediate cause",
  ],
  slides: [
    sl("title", "Why did war return in 1939?", {
      b: "Part 1 — the **long-term causes** and the **immediate cause** of the Second World War.",
      v: vRoute1,
      n: "Only twenty years after the peace of nineteen nineteen, the world was at war again. Why? In this part we look at German anger over the peace treaty, the rise of dictators, the policy of appeasement, aggression in Asia and Africa, and finally the invasion of Poland, which started the war.",
    }),
    sl("diagram", "The road to war, 1919 to 1955", {
      b: "Key dates from **Versailles** to the **Warsaw Pact**.",
      v: vTimeline,
      n: "This timeline gives the main dates of the chapter. Japan seized Manchuria in nineteen thirty-one. Germany moved into the Rhineland in nineteen thirty-six and took Austria and the Sudetenland in nineteen thirty-eight. The war began in nineteen thirty-nine, and ended in nineteen forty-five, after which two new alliances divided Europe.",
    }),
    sl("concept", "Dissatisfaction with Versailles", {
      b: "German anger over the **peace of 1919**.",
      v: vVersailles,
      n: "Many Germans hated the peace treaty of nineteen nineteen. It blamed Germany alone for the war, demanded heavy payments, took away land and colonies, and left only a small army. During the hard years that followed, Hitler promised to tear up the treaty, and this promise won him wide support.",
    }),
    sl("check", "Quick check: the Axis", {
      b: "Which agreement of 1936 brought Fascist Italy and Nazi Germany together?",
      chk: "m_chk_axis",
      n: "Two dictators drew together in nineteen thirty-six. Which agreement linked them?",
    }),
    sl("diagram", "The rise of the dictators", {
      b: "**Mussolini**, **Hitler** and a **military-led Japan**.",
      v: vDictators,
      n: "In Italy, Mussolini set up a Fascist dictatorship in the nineteen twenties. In Germany, Hitler and the Nazis took power in nineteen thirty-three. Both glorified force, rearmed and wanted new territory, and in nineteen thirty-six they drew together. In Japan, military leaders pushed for an empire in East Asia.",
    }),
    sl("diagram", "Appeasement, step by step", {
      b: "Britain and France **gave way** in the hope of keeping peace.",
      v: vAppease,
      n: "Britain and France followed appeasement, giving in to some of Hitler's demands. They did nothing when German troops entered the Rhineland in nineteen thirty-six or when Germany swallowed Austria in nineteen thirty-eight. At Munich they agreed to hand him the Sudetenland. When he seized the rest of Czechoslovakia in nineteen thirty-nine, the policy collapsed.",
    }),
    sl("check", "Quick check: Munich", {
      b: "True or false: under the Munich Agreement of 1938, Germany was allowed to take the Sudetenland.",
      chk: "tf_chk_munich",
      n: "Recall what the four leaders decided at Munich in nineteen thirty-eight.",
    }),
    sl("two-column", "Why appeasement? Two views", {
      cols: ["**Reasons it was followed**\n\n- Horror of another war like **1914–18**\n- Britain and France **not ready** to fight\n- Some felt German grievances were **partly fair**", "**Why critics condemned it**\n\n- Each concession **encouraged** further demands\n- **Czechoslovakia** was sacrificed\n- It made the **USSR** distrust the West"],
      n: "Compare the two views. Supporters of appeasement remembered the horror of the last war, knew their countries were not ready to fight, and felt some German complaints were fair. Critics said every concession only encouraged further demands, that Czechoslovakia was sacrificed, and that the Soviet Union came to distrust the West.",
    }),
    sl("example", "Worked example 1: planning a ten-mark answer on the causes", {
      b: "Plan a **3 + 3 + 4** answer on the European causes.",
      bl: ["(i) Versailles: war guilt, reparations and lost land, a dictated peace.", "(ii) Dictators: Mussolini and Hitler, force and rearmament, the Axis.", "(iii) Appeasement: three steps, then why it encouraged Hitler."],
      v: vAppeasePlan,
      n: "Here is a plan for a ten-mark answer in three parts. For Versailles, give three points: war guilt, payments and lost land, and the sense of a dictated peace. For the dictators, give three more. For the four-mark part on appeasement, name the Rhineland, Austria and Munich, then explain why each concession encouraged Hitler.",
    }),
    sl("diagram", "The League of Nations fails", {
      b: "**Manchuria**, **Abyssinia** and **China**.",
      v: vLeagueFail,
      n: "The League of Nations could not stop aggression. When Japan seized Manchuria in nineteen thirty-one, the League condemned it, and Japan simply left. When Italy invaded Abyssinia in nineteen thirty-five, the sanctions were weak and did not include oil. In nineteen thirty-seven Japan began a full war in China.",
    }),
    sl("check", "Quick check: Abyssinia", {
      b: "Which country invaded Abyssinia in 1935?",
      chk: "m_chk_abyssinia",
      n: "Which European dictatorship attacked Abyssinia in nineteen thirty-five?",
    }),
    sl("diagram", "Poland: the immediate cause", {
      b: "From the **pact** to the **declarations** of war.",
      v: vPoland,
      n: "On the twenty-third of August nineteen thirty-nine, Germany and the Soviet Union agreed not to attack each other. Freed from the fear of a war on two fronts, Hitler invaded Poland on the first of September. Two days later, on the third of September, Britain and France declared war on Germany.",
    }),
    sl("check", "Quick check: the first victim", {
      b: "The Second World War began when Germany invaded ___ on 1 September 1939.",
      chk: "fb_chk_poland",
      n: "Which country did Germany invade on the first of September nineteen thirty-nine?",
    }),
    sl("example", "Worked example 2: long-term and immediate causes", {
      b: "Sort the causes into **two** groups.",
      bl: ["Step 1: the **spark** is the invasion of **Poland**.", "Step 2: the **fuel** is Versailles, dictators, appeasement, aggression and the League's failure.", "Tip: never write that one event alone caused the war."],
      v: vCausesSort,
      n: "Practise sorting causes. The immediate cause, the spark, was the invasion of Poland on the first of September nineteen thirty-nine. The long-term causes, the fuel, were German resentment of Versailles, the dictators, appeasement, aggression by Japan and Italy, and the failure of the League. Always keep the two groups separate.",
    }),
    sl("summary", "Summary of Part 1", {
      v: vSum1,
      n: "To sum up Part One. Resentment of the peace of nineteen nineteen helped Hitler rise. Dictators in Italy and Germany glorified force and drew together. Appeasement let Germany grow stronger, and the League failed to stop Japan and Italy. The invasion of Poland on the first of September nineteen thirty-nine began the war.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["Rhineland **1936**; Anschluss **March 1938**; Munich **September 1938**.", "Manchuria **1931**; Abyssinia **1935**; China **1937**.", "Pact **23 August 1939**; Poland **1 September 1939**; declarations **3 September 1939**.", "Explain appeasement in your **own words**.", "Separate the **immediate** cause from the **long-term** causes."],
      v: vPoland,
      n: "A few tips. Learn the order of the steps of appeasement and the three acts of aggression outside Europe. Know the three dates of August and September nineteen thirty-nine. Explain appeasement in your own words. And in longer answers, always separate the immediate cause from the long-term causes.",
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: "The Second World War — Part 2: A World War, its End and the Cold War",
  goals: [
    "Explain how Pearl Harbour and the atomic bombings shaped the course and end of the war",
    "State the consequences of the Second World War",
    "Explain the meaning of the Cold War, NATO and the Warsaw Pact",
  ],
  slides: [
    sl("title", "From world war to cold war", {
      b: "Part 2 — **Pearl Harbour**, **Hiroshima and Nagasaki**, the **results** of the war and the **Cold War**.",
      v: vRoute2,
      n: "In this part we follow the war as it spread across the world, see how it ended in nineteen forty-five, and study its results. Then we meet a new kind of conflict, the Cold War, in which the two strongest powers competed without fighting each other directly.",
    }),
    sl("diagram", "Pearl Harbour, 7 December 1941", {
      b: "The attack that brought the **USA** into the war.",
      v: vPearl,
      n: "On the seventh of December nineteen forty-one, Japanese aircraft attacked the American naval base at Pearl Harbour in Hawaii. The United States, which had stayed out of the war, now declared war on Japan, and Germany and Italy declared war on the United States. The conflict became a true world war.",
    }),
    sl("check", "Quick check: the attacker", {
      b: "The attack on Pearl Harbour in 1941 was carried out by",
      chk: "m_chk_pearl",
      n: "Which country attacked the American base at Pearl Harbour?",
    }),
    sl("diagram", "Two sides in a world war", {
      b: "The **Axis** against the **Allies** after 1941.",
      v: vSides,
      n: "By the end of nineteen forty-one the two sides were clear. The Axis powers were Germany, Italy and Japan. Against them stood the Allies, including Britain, the Soviet Union, which Germany had invaded in nineteen forty-one, the United States and China. Fighting now stretched from Europe and North Africa to Asia and the Pacific.",
    }),
    sl("diagram", "How the war ended", {
      b: "**Germany** in May 1945; **Japan** after the atomic bombs.",
      v: vEnd,
      n: "The war in Europe ended when Germany surrendered in May nineteen forty-five. In Asia, the United States dropped atomic bombs on the Japanese cities of Hiroshima on the sixth of August and Nagasaki on the ninth of August. The bombs caused very heavy loss of life, and Japan surrendered soon after.",
    }),
    sl("check", "Quick check: the first atomic bomb", {
      b: "On which Japanese city was the first atomic bomb dropped, on 6 August 1945?",
      chk: "m_chk_hiroshima",
      n: "Two cities were struck in August nineteen forty-five. Which was the first?",
    }),
    sl("diagram", "Consequences of the war", {
      b: "**Axis defeated**, the **United Nations**, two **superpowers**.",
      v: vConseq,
      n: "The war changed the world. Germany, Italy and Japan were defeated, and Germany was occupied. To keep the peace, the United Nations came into existence on the twenty-fourth of October nineteen forty-five. Britain and France were weakened, while the United States and the Soviet Union rose as the two superpowers.",
    }),
    sl("check", "Quick check: a new world body", {
      b: "The United Nations came into existence on 24 October ___.",
      chk: "fb_chk_un",
      n: "In which year did the United Nations come into existence?",
    }),
    sl("example", "Worked example 1: planning a ten-mark answer on the end of the war", {
      b: "Plan **3 + 3 + 4** marks.",
      bl: ["(i) How the war ended in Europe and in Asia.", "(ii) Three consequences for the world order.", "(iii) Four points on how the Cold War began."],
      v: vConseqPlan,
      n: "Plan a ten-mark answer on the end of the war like this. For three marks, explain how the war ended in Europe and in Asia. For three more, give three consequences. For the four-mark part, explain how clashing ideas, distrust, the arms race and rival alliances led to the Cold War.",
    }),
    sl("concept", "What was the Cold War?", {
      b: "Rivalry **without** a direct war.",
      v: vColdWar,
      n: "After the war, the two superpowers, once allies, became rivals. The United States stood for capitalism and multi-party democracy, the Soviet Union for communism. Their contest is called the Cold War because they never fought each other in a full-scale war. Instead they competed through weapons, propaganda and alliances.",
    }),
    sl("diagram", "Two blocs in Europe", {
      b: "**Western** and **Eastern** blocs.",
      v: vBlocs,
      n: "Europe was divided into two camps. The western countries, led by the United States, stood on one side; the Soviet Union and the communist states of eastern Europe stood on the other. Each bloc feared the other, and each built up its armed strength.",
    }),
    sl("diagram", "NATO and the Warsaw Pact", {
      b: `**NATO (${NATO})** and the **Warsaw Pact (${WARSAW})**: meaning only.`,
      v: vAlliances,
      n: "Each bloc formed a military alliance. In nineteen forty-nine the United States, Canada and western European countries formed the North Atlantic Treaty Organisation, promising to defend one another. In nineteen fifty-five the Soviet Union and the communist states of eastern Europe answered with the Warsaw Pact.",
    }),
    sl("check", "Quick check: which alliance?", {
      b: "True or false: the USSR was a member of NATO.",
      chk: "tf_chk_nato",
      n: "Think about which bloc each alliance belonged to. Was the Soviet Union a member of the western alliance?",
    }),
    sl("example", "Worked example 2: spotting a Cold War feature", {
      b: "An imagined report says two rival powers each tested a bigger bomb. Which feature is this?",
      bl: ["Step 1: find the **key idea**: competing to build stronger weapons.", "Step 2: name the **feature**: the **arms race**.", "Step 3: explain why it is **cold**: no direct war, only competition."],
      v: vColdWar,
      n: "Practise identifying a feature. Suppose a report says two rival powers each tested a bigger bomb and feared falling behind. The key idea is competition in weapons, so the feature is the arms race. It belongs to the Cold War because the rivals competed fiercely but did not fight each other directly.",
    }),
    sl("summary", "Summary of Part 2", {
      v: vSum2,
      n: "To sum up Part Two. Pearl Harbour brought the United States into the war in nineteen forty-one. Germany surrendered in May nineteen forty-five, and Japan after the atomic bombs in August. The Axis was defeated, the United Nations was born, and the two superpowers began the Cold War, with rival alliances in nineteen forty-nine and nineteen fifty-five.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["Pearl Harbour **7 December 1941**; Hiroshima **6 August**, Nagasaki **9 August 1945**.", "Germany surrendered **May 1945**; United Nations **24 October 1945**.", `NATO **${NATO}**, Warsaw Pact **${WARSAW}**: learn their **meaning** only.`, "Cold War = rivalry **without direct war**.", "Write about the bombings **factually** and **humanely**."],
      v: vAlliances,
      n: "A few tips. Learn the dates of Pearl Harbour and of the two atomic bombings. Remember when Germany surrendered and when the United Nations was born. For the two alliances, the syllabus asks only what they were and when they were formed. And always write about the human cost of the war carefully and humanely.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "The Second World War and the Cold War — notes",
  sections: [
    {
      h: "1. Versailles and the rise of the dictators",
      t: 1,
      b: "- **Versailles (1919):** war guilt, reparations, lost land and a small army left Germans bitter; they saw it as a dictated peace.\n- **Mussolini** (Italy, from **1922**) and **Hitler** (Germany, from **1933**) built dictatorships that glorified force, rearmed and wanted new land.\n- **Rome–Berlin Axis (1936):** Italy and Germany drew together; **Japan** later joined them. The three became the **Axis** powers.",
      terms: [["Axis powers", "Germany, Italy and Japan, the aggressor states of the Second World War."], ["Dictated peace", "A settlement imposed on the defeated side without negotiation."]],
      v: vVersailles,
      vs: [vDictators],
    },
    {
      h: "2. Appeasement",
      t: 1,
      b: "- **Meaning:** satisfying an aggressor's demands in the hope of avoiding war; followed by **Britain** and **France** towards Hitler.\n- **Steps:** Rhineland remilitarised (**1936**); **Anschluss** with Austria (**March 1938**); **Munich Agreement** (**September 1938**) gave Germany the **Sudetenland**, without Czechoslovakia or the USSR at the table; rest of **Czechoslovakia** occupied (**March 1939**).\n- **End:** Britain and France then guaranteed **Poland**.",
      terms: [["Appeasement", "Giving way to an aggressor's demands to keep the peace."], ["Anschluss", "The union of Austria with Germany in March 1938."]],
      v: vAppease,
    },
    {
      h: "3. Aggression in Asia and Africa; the League fails",
      t: 2,
      b: "- **Manchuria (1931):** seized by Japan; condemned by the League; Japan **left** the League in **1933**.\n- **Abyssinia (1935):** invaded by Italy; League **sanctions** were weak and excluded **oil**.\n- **China (1937):** full-scale Japanese war.\n- The League had **no army**, and Britain and France would not use force; **collective security** collapsed.",
      terms: [["Sanctions", "Penalties, such as trade bans, imposed on a state that breaks the rules."]],
      v: vLeagueFail,
    },
    {
      h: "4. The immediate cause",
      t: 2,
      b: "- **23 August 1939:** Nazi-Soviet **Non-Aggression Pact**; Hitler no longer feared a two-front war.\n- **1 September 1939:** Germany **invaded Poland**.\n- **3 September 1939:** Britain and France **declared war** on Germany.",
      terms: [["Non-Aggression Pact", "An agreement between two states not to attack each other."]],
      v: vPoland,
      vs: [vCausesSort],
    },
    {
      h: "5. A world war and its end",
      t: [3, 4],
      b: `- **Pearl Harbour (7 December ${PEARL}):** Japan attacked the American naval base; the **USA** entered the war.\n- **Germany** surrendered in **May ${WAR_END}**.\n- Atomic bombs on **Hiroshima (6 August)** and **Nagasaki (9 August ${WAR_END})** caused very heavy loss of life; **Japan** surrendered soon after.\n- **Consequences:** Axis defeated; **United Nations** from **24 October ${WAR_END}**; the **USA** and **USSR** became **superpowers**; Britain and France weakened.`,
      terms: [["Superpower", "A state with far greater military and economic power than others; after 1945, the USA and the USSR."]],
      v: vEnd,
      vs: [vPearl, vConseq],
    },
    {
      h: "6. The Cold War",
      t: 5,
      b: `- **Meaning:** the rivalry between the **USA** and the **USSR** after 1945, carried on through **alliances**, an **arms race** and **propaganda**, without a direct full-scale war between them.\n- **NATO (${NATO}):** military alliance of the USA, Canada and western European states for mutual defence.\n- **Warsaw Pact (${WARSAW}):** military alliance of the USSR and the communist states of eastern Europe.\n- Only the **meaning** of NATO and the Warsaw Pact is required.`,
      terms: [["Cold War", "Superpower rivalry without direct war between the two sides."], ["Arms race", "Competition between states to build more and stronger weapons."]],
      v: vBlocs,
      vs: [vColdWar, vAlliances],
    },
  ],
  tips: "**Common mistakes**\n- Calling the invasion of Poland the **only** cause (it was the **immediate** cause).\n- Mixing up the **Anschluss** (Austria) and **Munich** (the Sudetenland).\n- Writing that the League **fought** Japan or Italy (it had no army).\n- Putting the USSR in **NATO** (it led the **Warsaw Pact**).\n- Dating the United Nations to **1919** or **1920** (that was the League).\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks you to explain or evaluate.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["German grievance", "War guilt, reparations, lost land: Versailles seen as a dictated peace.", "concept", 1],
  ["Rome-Berlin Axis", "**1936**: Italy and Germany; Japan joined later.", "fact", 1],
  ["Axis powers", "**Germany, Italy, Japan**.", "fact", 4],
  ["Appeasement", "Giving way to an aggressor's demands to avoid war.", "definition", 1],
  ["Rhineland remilitarised", "**1936**.", "fact", 1],
  ["Anschluss", "Union of **Austria** with Germany, **March 1938**.", "definition", 1],
  ["Munich Agreement", "**September 1938**: Sudetenland to Germany.", "fact", 1],
  ["End of appeasement", "Rest of Czechoslovakia occupied, **March 1939**.", "fact", 1],
  ["Manchuria", "Seized by Japan, **1931**.", "fact", 2],
  ["Japan leaves the League", "**1933**.", "fact", 2],
  ["Abyssinia", "Invaded by Italy, **1935**; weak sanctions, no oil ban.", "fact", 2],
  ["Japan's war on China", "Full-scale from **1937**.", "fact", 2],
  ["Why the League failed", "No army; members unwilling to use force.", "concept", 2],
  ["Nazi-Soviet Pact", "**23 August 1939**.", "fact", 2],
  ["Invasion of Poland", "**1 September 1939**: the immediate cause.", "fact", 2],
  ["Britain and France declare war", "**3 September 1939**.", "fact", 2],
  ["Pearl Harbour", "**7 December 1941**: Japan attacks; the USA enters the war.", "fact", 3],
  ["Hiroshima", "Atomic bomb, **6 August 1945**.", "fact", 3],
  ["Nagasaki", "Atomic bomb, **9 August 1945**.", "fact", 3],
  ["Germany surrenders", "**May 1945**.", "fact", 4],
  ["United Nations", "Came into existence **24 October 1945**.", "fact", 4],
  ["Superpowers", "The **USA** and the **USSR**.", "fact", 4],
  ["Cold War", "Rivalry without direct war: alliances, arms race, propaganda.", "definition", 5],
  ["NATO", `**${NATO}**: western military alliance led by the USA.`, "definition", 5],
  ["Warsaw Pact", `**${WARSAW}**: alliance of the USSR and eastern European communist states.`, "definition", 5],
  ["Arms race", "Competition to build more and stronger weapons.", "definition", 5],
  ["Immediate vs long-term causes", "Poland was the spark; Versailles, dictators, appeasement and the League's failure were the fuel.", "exam-tip", 2],
  ["Versailles to Poland", `**${yearsBetween(VERSAILLES, POLAND)} years** (${VERSAILLES} to ${POLAND}).`, "fact", 1],
  ["How long the war lasted", `About **${yearsBetween(POLAND, WAR_END)} years** (${POLAND} to ${WAR_END}).`, "fact", 4],
  ["NATO vs the League", "NATO is an alliance of one bloc; the League and the United Nations are world bodies.", "exam-tip", 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "icse-10-history-civics-chapter-test-short",
  title: "Chapter test (short) — The Second World War and the Cold War",
  duration: 30,
  sections: [
    { id: "I", title: "Part I — Compulsory (10 marks)", instr: "Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.", items: ["m_appease_meaning", "m_poland_date", "m_pearl_date", "m_un_date", "m_nato_meaning", "ar_munich", "s_versailles_two", "s_coldwar_meaning"] },
    { id: "II", title: "Part II — Structured question (10 marks)", instr: "Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 1, keys: ["l_causes_europe", "l_consequences"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "icse-10-history-civics-chapter-test-long",
  title: "Chapter test (long) — The Second World War and the Cold War",
  duration: 60,
  sections: [
    { id: "I", title: "Part I — Compulsory (20 marks)", instr: "Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.", items: ["m_rhineland_year", "m_anschluss", "m_sudeten", "m_manchuria", "m_abyssinia", "m_pact_ussr", "m_declare_date", "m_hiroshima_date", "m_superpowers", "ar_league_fail", "s_appease_two", "s_japan_two", "s_league_two", "s_pearl_two", "s_warsaw_two"] },
    { id: "II", title: "Part II — Structured questions (20 marks)", instr: "Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 2, keys: ["l_appeasement", "l_poland", "l_coldwar"] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: "topics t01–t05 of icse-10-history-civics-ch16 only (European causes and appeasement; Japan, the League and Poland; Pearl Harbour and the atomic bombings in brief; consequences; Cold War with NATO and the Warsaw Pact as meaning only)",
    originality: "every diary, letter, note and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no speech, treaty text or historical person quoted",
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(", ")}); ${POLAND} − ${VERSAILLES} = ${yearsBetween(VERSAILLES, POLAND)}; ${WAR_END} − ${POLAND} = ${yearsBetween(POLAND, WAR_END)}; ${WARSAW} − ${NATO} = ${yearsBetween(NATO, WARSAW)}; pact to invasion 9 days; Hiroshima to Nagasaki 3 days`,
    facts: "Mussolini 1922; Hitler 1933; Japan seizes Manchuria 1931 and leaves the League 1933; Italy invades Abyssinia 1935 (weak sanctions, no oil); Rhineland 1936; Rome-Berlin Axis 1936; Japan's war on China 1937; Anschluss March 1938; Munich September 1938 (Britain, France, Germany, Italy; Sudetenland); rest of Czechoslovakia March 1939; Nazi-Soviet Pact 23 August 1939; Poland 1 September 1939; Britain and France declare war 3 September 1939; Pearl Harbour 7 December 1941; Germany surrenders May 1945; Hiroshima 6 August and Nagasaki 9 August 1945; Japan surrenders August-September 1945; United Nations 24 October 1945; NATO 1949; Warsaw Pact 1955",
    gate: "schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter",
  },
});
