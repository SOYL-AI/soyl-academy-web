// Build CBSE 11 Political Science ch17 Nationalism. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch17/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch17', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Table with alt text generated from its own cells.
const T = (title, headers, rows, caption) =>
  table(headers, rows, `Table on ${title}. Columns: ${headers.join(', ')}. ` + rows.map((r) => r.join('; ')).join('. '), caption);

// ---------------------------------------------------------------- SVG figures (no maps)
const vWeb = (() => {
  const s = new Svg(760, 450);
  const box = (x, y, w, name, l1, l2, c) => {
    s.rect(x, y, w, 80, { color: c, sw: 2.5 });
    s.text(x + w / 2, y + 22, name, { bold: true, size: 15, color: c });
    s.text(x + w / 2, y + 48, l1, { size: 12 });
    s.text(x + w / 2, y + 66, l2, { size: 12 });
  };
  box(10, 10, 220, 'Shared belief', 'Imagined: Veldanese revere', 'one river as a symbol', 'blue');
  box(270, 10, 220, 'Shared history', 'Imagined: Veldanese recall', 'a common struggle', 'green');
  box(530, 10, 220, 'Territory', 'Imagined: a homeland of', 'plains and mountains', 'brown');
  s.rect(240, 180, 280, 70, { color: 'accent', sw: 3 });
  s.text(380, 206, 'A nation', { bold: true, size: 18, color: 'accent' });
  s.text(380, 232, 'An imagined community', { size: 14 });
  s.arrow(330, 180, 150, 92, { sw: 2 });
  s.arrow(380, 180, 380, 92, { sw: 2 });
  s.arrow(430, 180, 640, 92, { sw: 2 });
  box(90, 330, 260, 'Shared political ideals', 'Imagined: elected government', 'and equal rights for all', 'blue');
  box(410, 330, 260, 'Common political identity', 'Imagined: all see themselves', 'as citizens of Veldan', 'green');
  s.arrow(330, 250, 220, 328, { sw: 2 });
  s.arrow(430, 250, 540, 328, { sw: 2 });
  s.text(380, 434, 'None of these needs one race, one language or one religion', { size: 13, bold: true });
  return s.visual('Web of the elements of a nation, with a nation as an imagined community at the centre. Shared belief, for example imagined Veldanese revering one river as a symbol. Shared history, for example recalling a common struggle. Territory, for example a homeland of plains and mountains. Shared political ideals, for example an elected government and equal rights for all. Common political identity, for example all seeing themselves as citizens of Veldan. None of these needs one race, one language or one religion', 'Elements of a nation, with imagined examples from Veldan.');
})();

const vTimeline = (() => {
  const s = new Svg(760, 320);
  s.line(30, 120, 730, 120, { sw: 3 });
  const pts = [
    [110, 'About 1870-71', ['Germany and Italy', 'are unified'], 'blue'],
    [290, '1914-18', ['First World War;', 'Austro-Hungarian and', 'Ottoman empires', 'break up afterwards'], 'green'],
    [470, 'About 1919', ['Post-war settlement;', 'one culture, one state', 'gains force'], 'brown'],
    [650, '1947', ['India becomes independent,', 'one of many anti-colonial', 'movements in Asia and Africa'], 'accent'],
  ];
  pts.forEach(([x, yr, lines, c]) => {
    s.dot(x, 120, 8, c);
    s.text(x, 90, yr, { bold: true, size: 16, color: c });
    s.line(x, 128, x, 160, { sw: 1.5, color: 'muted' });
    s.rect(x - 86, 160, 172, 120, { color: c, sw: 2.5 });
    lines.forEach((ln, j) => s.text(x, 184 + j * 22, ln, { size: 12 }));
  });
  s.text(380, 304, 'Not drawn to scale', { size: 12, muted: true });
  return s.visual('Timeline of nationalism in history, not drawn to scale. About 1870 to 1871: Germany and Italy are unified. 1914 to 1918: the First World War, after which the Austro-Hungarian and Ottoman empires break up. About 1919: the post-war settlement, when the idea of one culture, one state gains force. 1947: India becomes independent, one of many anti-colonial movements in Asia and Africa', 'Nationalism in history: a timeline.');
})();

const vDilemma = (() => {
  const s = new Svg(760, 500);
  const box = (y, l1, l2, c) => {
    s.rect(120, y, 520, 58, { color: c, sw: 2.5 });
    s.text(380, y + 20, l1, { bold: true, size: 14, color: c });
    s.text(380, y + 42, l2, { size: 13 });
  };
  const ys = [8, 90, 172, 254, 336, 418];
  box(ys[0], 'A nation claims self-determination', 'Imagined: the Hallow people of Ostira ask for a state', 'blue');
  box(ys[1], 'Give each group its own state?', 'It seems fair, but look at how people actually live', 'green');
  box(ys[2], 'Peoples live mixed together', 'Hallow and non-Hallow families share many towns', 'brown');
  box(ys[3], 'A new state would have its own minorities', 'The same question returns inside the new state', 'blue');
  box(ys[4], 'Division could repeat again and again', 'Ever smaller states: not practical, not peaceful', 'green');
  box(ys[5], 'A democratic answer', 'Protect minority identities by rights inside the state', 'accent');
  ys.slice(0, 5).forEach((y) => s.arrow(380, y + 58, 380, y + 82, { sw: 2 }));
  return s.visual('Flow chart of the self-determination dilemma. A nation claims self-determination, for example the imagined Hallow people of Ostira asking for a state. Should each group get its own state? It seems fair, but peoples live mixed together, with Hallow and non-Hallow families sharing many towns. A new state would have its own minorities, so the same question returns. Division could repeat again and again, with ever smaller states that are not practical or peaceful. A democratic answer is to protect minority identities by rights inside the state', 'The self-determination dilemma.');
})();

const vCompare = (() => {
  const s = new Svg(760, 450);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 360, 290, { color: c, sw: 2.5 });
    s.text(x + 180, 38, name, { bold: true, size: 17, color: c });
    lines.forEach((ln, j) => s.text(x + 180, 78 + j * 30, ln, { size: 13, bold: j === 0 }));
  };
  col(10, 'Unity needs a shared culture', 'blue', ['Some argue:', 'Common language and customs', 'A shared bond for everyone', 'Fewer lines of division', 'Risk: minorities may feel pushed out', 'Imagined: Veldan teaches in', 'one language only']);
  col(390, 'Unity is built by respecting diversity', 'green', ['Others argue:', 'Many cultures in one nation', 'Loyalty grows when all have a fair place', 'Group rights beside individual rights', 'Risk: groups may feel apart', 'Imagined: Marenth keeps evening', 'classes in three languages']);
  s.rect(10, 330, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 358, 'Unity is not the same as uniformity', { bold: true, size: 16, color: 'accent' });
  s.text(380, 386, 'Both views are held with reasons', { size: 14 });
  s.text(380, 410, 'A student weighs the evidence, then judges', { size: 14 });
  return s.visual('Comparison chart of two views on national unity. Some argue that unity needs a shared culture: common language and customs, a shared bond, fewer lines of division, with the risk that minorities may feel pushed out, for example imagined Veldan teaching in one language only. Others argue that unity is built by respecting diversity: many cultures in one nation, loyalty grows when all have a fair place, group rights beside individual rights, with the risk that groups may feel apart, for example imagined Marenth keeping evening classes in three languages. Unity is not the same as uniformity; a student weighs the evidence, then judges', 'Two views on unity compared.');
})();

// ---------------------------------------------------------------- tables: Part 1
const tNation = T('what a nation is', ['Point', 'Nation'], [
  ['Standard definition', 'A large group of people who see themselves as a community with a shared identity, and who wish to govern themselves'],
  ['What they share', 'Beliefs, a history, a homeland or territory and political ideals'],
  ['What it is not', 'Not simply a race, a language group or a religion'],
  ['Imagined case', 'The people of Veldan, who speak three languages and follow four faiths, still see themselves as one nation'],
], 'Veldan is imagined.');
const tNotRace = T('a nation compared with a race, a language group and a religion', ['Term', 'Standard meaning', 'Why a nation is different'], [
  ['Race', 'A group classed together by supposed common ancestry', 'Nations include people of many backgrounds'],
  ['Language group', 'People who speak the same language', 'A nation may have several languages'],
  ['Religion', 'People who share a faith', 'A nation may include many faiths'],
  ['Nation', 'A community with a shared identity and a wish to govern itself', 'Rests on belief, history, territory and ideals'],
], 'Uniformity and pluralism compared.');
const tImagined = T('the imagined community', ['Point', 'Imagined community'], [
  ['The phrase', 'A nation is sometimes called an imagined community'],
  ['Associated with', 'Benedict Anderson'],
  ['Meaning', 'Members never meet most of the other members, yet they feel that they belong together'],
  ['Does it mean unreal?', 'No. The community is real in its effects; it is imagined because it rests on a shared feeling and not on personal contact'],
  ['Imagined case', 'Villagers in Ostira who live far apart share a festival and stories, and feel part of one nation'],
], 'Ostira is imagined.');
const tClassify = T('classifying imagined groups', ['Imagined group', 'Does it fit the idea of a nation?', 'Reason'], [
  ['The people of Veldan, with several languages and shared ideals', 'Yes', 'A large community with shared identity that wishes to govern itself'],
  ['The scattered Corlen traders, with no common homeland', 'Not clearly', 'They share language and customs but lack a territory they all call home'],
  ['A school chess club', 'No', 'Not a large community with a homeland or a political aim'],
  ['The Hallow people, who see themselves as distinct and ask for self-rule', 'They claim to be one', 'The claim rests on belief and history; it raises the question of self-determination'],
], 'All groups and countries are imagined.');
const tHistory = T('nationalism in history', ['Period', 'What nationalism did'], [
  ['Nineteenth century, Europe', 'Helped to unify states; Germany and Italy were unified about 1870 and 1871'],
  ['After the First World War, 1914 to 1918', 'Contributed to the break-up of the Austro-Hungarian and Ottoman empires'],
  ['Twentieth century, Asia and Africa', 'Powered anti-colonial movements, including India\'s freedom struggle'],
  ['Across history', 'Has also been linked with conflict and wars'],
]);
const tConflict = T('nationalism and conflict', ['Point', 'A neutral account'], [
  ['Unifying and freeing', 'It has bound people together and helped them win freedom'],
  ['Linked with conflict', 'It has also been linked with wars and with the exclusion of some groups'],
  ['Why both are true', 'The same feeling of belonging can include some people and shut out others'],
  ['What a student does', 'Give examples of both effects and avoid a one-sided claim'],
]);
const tSelfDet = T('national self-determination', ['Point', 'Self-determination'], [
  ['Meaning', 'The claim of a nation to govern itself and to have its own state'],
  ['Importance', 'Became important after the First World War'],
  ['A popular idea', 'One culture, one state: each national group should have its own state'],
  ['Imagined case', 'The Hallow people of Ostira ask for a state in which they make the laws'],
], 'The Hallow people and Ostira are imagined.');
const tApply = T('applying self-determination to an imagined case', ['Step', 'Imagined case: the Hallow people of Ostira'], [
  ['1. The claim', 'The Hallow ask for a state of their own in which they govern themselves'],
  ['2. The principle', 'Self-determination: a nation may claim to govern itself'],
  ['3. The difficulty', 'Hallow and non-Hallow families live side by side in many towns of Ostira'],
  ['4. The consequence', 'A new state would contain minorities of its own, and division could repeat'],
  ['5. A fair approach', 'Hear the Hallow, then consider constitutional protection of language, culture and schools'],
], 'The case is imagined; no real group is meant.');
const tProblems = T('problems of self-determination', ['Problem', 'Explanation'], [
  ['Minorities everywhere', 'Almost every state contains minorities, because peoples live mixed together'],
  ['Division may not end', 'A new state creates new minorities, and the same demand could be made again'],
  ['Practical and peaceful limits', 'Ever smaller states are neither practical nor peaceful'],
  ['Another path', 'Democratic states can protect the identities of minorities by rights'],
]);
const tPlan1 = T('planning a five mark answer on nations and self-determination', ['Step of a 5-mark answer', 'Imagined plan for: nation and self-determination'], [
  ['1. Define a nation', 'Large community, shared identity, wish to govern itself'],
  ['2. Elements', 'Belief, history, territory, political ideals; not the same as race, language or religion'],
  ['3. Imagined community', 'Anderson; members never meet most others'],
  ['4. Self-determination', 'Meaning, importance after the First World War'],
  ['5. The problem', 'Minorities and ever smaller states; democratic protection'],
], 'A plan, to be written in your own words.');
const tSum1 = T('summary of Part 1', ['Topic', 'Key points'], [
  ['Nation', 'A large group with a shared identity who wish to govern themselves'],
  ['Not the same as', 'A race, a language group or a religion'],
  ['Imagined community', 'Associated with Benedict Anderson; members never meet most others'],
  ['History', 'Unification about 1870 and 1871; empires broke up after 1914 to 1918; anti-colonial movements'],
  ['Conflict', 'Also linked with wars; state both effects'],
  ['Self-determination', 'A nation governs itself; problems of minorities and smaller states'],
]);
const tTips1 = T('common mistakes in Part 1', ['Common mistake', 'Write instead'], [
  ['Saying a nation is a race or a religion', 'Say that nations include people of different languages and faiths'],
  ['Calling imagined community unreal', 'Explain that members never meet most others yet feel they belong together'],
  ['Calling nationalism only good or only bad', 'Give both effects with examples'],
  ['Saying every group should get a state', 'Explain minorities and the limits of ever smaller states'],
]);

// ---------------------------------------------------------------- tables: Part 2
const tDiversity = T('diversity within nations', ['Point', 'Diversity in nations'], [
  ['The fact', 'Many nations include people of several languages, faiths and cultures'],
  ['The question', 'How can a democratic state keep such a nation together fairly?'],
  ['The answer in this chapter', 'By recognising and protecting identities, not by forcing sameness'],
  ['Imagined case', 'Marenth has three home languages among its children'],
], 'Marenth is imagined.');
const tWays = T('ways to accommodate diversity', ['Way', 'How it works'], [
  ['Recognise identities', 'The state accepts that minorities have their own language, religion and culture'],
  ['Constitutional rights', 'Linguistic, religious and cultural groups are given rights in the constitution'],
  ['Group rights beside individual rights', 'Communities are protected, and every individual keeps equal rights'],
  ['Fair share in public life', 'Offices and institutions are open to all communities'],
]);
const tGroup = T('individual rights and group rights', ['Point', 'Individual rights', 'Group rights'], [
  ['Who holds them', 'Each person', 'A community, as a community'],
  ['Purpose', 'Protect equal treatment of each person', 'Protect a community\'s language, religion or culture'],
  ['Imagined example', 'Equal rights before the law in Kessar', 'The right of any community in Kessar to teach its own language'],
  ['Relationship', 'Both are needed', 'Group rights work alongside individual rights'],
], 'Kessar and its clauses are imagined.');
const tLang = T('linguistic reorganisation of states in India', ['Point', 'Reorganisation of states, 1956'], [
  ['What happened', 'State boundaries in India were redrawn mainly along linguistic lines in 1956'],
  ['The idea', 'Recognise language groups within one nation'],
  ['Why it matters', 'It shows that unity need not mean one language for all'],
  ['Debated point', 'Some argue that such recognition strengthens unity; others stress the need to guard against division'],
]);
const tArt = T('Articles 29 and 30', ['Article', 'What it provides, in brief'], [
  ['Article 29', 'Any section of citizens with a distinct language, script or culture may conserve it'],
  ['Article 30', 'Religious and linguistic minorities may establish and administer educational institutions of their choice'],
  ['Imagined use', 'Parents of a linguistic minority in an imagined town open a school that teaches in their language'],
], 'The town is imagined.');
const tKessar = T('imagined minority clauses of Kessar', ['Imagined clause of Kessar', 'Kind of right', 'Reason'], [
  ['Every citizen has equal rights before the law', 'Individual right', 'Held by each person'],
  ['Any community may keep its language and script', 'Group right', 'Protects a community\'s identity'],
  ['Any minority may run its own schools', 'Group right', 'Protects culture through education'],
  ['Public offices are open to every citizen', 'Individual right', 'Equal opportunity for each person'],
], 'Kessar and its clauses are imagined.');
const tPluralism = T('pluralism', ['Point', 'Pluralism'], [
  ['Meaning', 'The idea that a nation can include many cultures and identities'],
  ['Unity and uniformity', 'Unity is a bond among people; uniformity is being the same; unity need not mean uniformity'],
  ['What it asks of a state', 'To give every community a fair place'],
  ['Imagined case', 'Marenth lets each language community hold evening classes beside the common curriculum'],
], 'Marenth is imagined.');
const tViews = T('two views on national unity', ['View', 'Reasons', 'Possible risk'], [
  ['Unity needs a shared culture', 'Common language and customs give a shared bond', 'Minorities may feel pushed out'],
  ['Unity is built by respecting diversity', 'People are loyal when they have a fair place', 'Groups may feel apart'],
  ['The student\'s task', 'Present both with reasons', 'Then judge with evidence'],
]);
const tTagore = T('Rabindranath Tagore on narrow nationalism', ['Point', 'Tagore'], [
  ['Who', 'Rabindranath Tagore, a poet and thinker of the freedom-struggle period'],
  ['His view in outline', 'He valued the freedom struggle'],
  ['His criticism', 'He held that patriotism should not override humanity'],
  ['Why it matters', 'A narrow nationalism may shut out other peoples and overlook minorities'],
], 'Tagore on narrow nationalism.');
const tTagoreEx = T('an imagined school debate and Tagore', ['Speaker at the imagined Greenfield debate', 'Point made', 'Link'], [
  ['Mira', 'Unity needs one shared culture', 'The shared culture view'],
  ['Kofi', 'We can love our country and respect everyone', 'Pluralism and Tagore\'s concern for humanity'],
  ['Rohan', 'Nothing outside the country matters', 'A narrow nationalism that Tagore criticised'],
  ['Leena', 'Concern for others fits love of country', 'Close to Tagore\'s view'],
], 'The debate and speakers are imagined.');
const tLink = T('linking the ideas of the chapter', ['Idea', 'Meaning', 'Link'], [
  ['Nationalism', 'A strong feeling of belonging to a nation', 'Has unified, freed and also divided'],
  ['Self-determination', 'A nation\'s claim to govern itself', 'Raises the problem of minorities'],
  ['Pluralism', 'Many identities in one nation', 'A way to accommodate diversity'],
]);
const tPlan2 = T('planning a five mark answer on pluralism', ['Step of a 5-mark answer', 'Imagined plan for: nationalism and pluralism'], [
  ['1. Diversity', 'Nations contain many languages, faiths and cultures'],
  ['2. Accommodation', 'Recognition, constitutional rights, group rights beside individual rights'],
  ['3. India', 'Linguistic reorganisation 1956; Articles 29 and 30'],
  ['4. Pluralism and views', 'Unity need not mean uniformity; both views on shared culture'],
  ['5. Tagore', 'Patriotism should not override humanity'],
], 'A plan, to be written in your own words.');
const tSum2 = T('summary of Part 2', ['Topic', 'Key points'], [
  ['Accommodating diversity', 'Recognise and protect minority identities'],
  ['Group rights', 'Beside individual rights'],
  ['India', 'Linguistic reorganisation 1956; Articles 29 and 30'],
  ['Pluralism', 'Unity need not mean uniformity'],
  ['Two views', 'Shared culture, or respect for diversity'],
  ['Tagore', 'Patriotism should not override humanity'],
]);
const tTips2 = T('common mistakes in Part 2', ['Common mistake', 'Write instead'], [
  ['Treating unity and uniformity as the same', 'Explain that unity can exist with many identities'],
  ['Mixing up Articles 29 and 30', 'Article 29: conserve language, script, culture; Article 30: minority institutions'],
  ['Backing one view on shared culture', 'Give both views with reasons, then judge'],
  ['Quoting Tagore\'s words', 'State his view in your own words'],
]);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Nationalism, Part 1: Nations and Nationalism',
  goals: [
    'State the standard definition of a nation and name its elements',
    'Distinguish a nation from a race, a language group and a religion',
    'Explain the description of a nation as an imagined community',
    'Describe the role of nationalism in history, including its link with conflict',
    'Explain national self-determination and the problems of applying it',
  ],
  slides: [
    sl('title', 'Nationalism: Nations and Nationalism', {
      b: 'Part 1: **nation**, **imagined community**, **history** and **self-determination**.',
      v: flow('LR', ['What a nation is', 'Elements', 'Nationalism in history', 'Self-determination', 'The problem'], 'Route map of Part 1: what a nation is, elements, nationalism in history, self-determination and the problem', 'Part 1 at a glance'),
      n: 'What makes a group of people a nation? In this part we define a nation and its elements, see why it is called an imagined community, look at the role of nationalism in history, and ask why giving every group its own state is hard.',
    }),
    sl('concept', 'What a nation is', {
      v: tNation,
      n: 'A nation is a large group of people who see themselves as a community with a shared identity, and who wish to govern themselves. They share beliefs, a history, a homeland or territory, and political ideals. In imagined Veldan, people speak three languages and follow four faiths, yet most see themselves as one nation.',
    }),
    sl('diagram', 'Elements of a nation', {
      v: vWeb,
      n: 'This web shows the elements of a nation. They are shared belief, shared history, territory, shared political ideals, and a common political identity. Each has an imagined example from Veldan. None of these needs one race, one language or one religion.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Which statement describes a nation?',
      chk: 'm_nation_def',
      n: 'Recall the standard definition of a nation.',
    }),
    sl('concept', 'A nation is not a race, a language group or a religion', {
      v: tNotRace,
      n: 'A nation is not the same as a race, a language group or a religion. A race is classed by supposed common ancestry, a language group shares a language, and a religion shares a faith. A nation may include people of many backgrounds, languages and faiths, and rests on belief, history, territory and ideals.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about nations is true or false.',
      chk: 'tf_not_race',
      n: 'Think about whether a nation can include several languages.',
    }),
    sl('concept', 'An imagined community', {
      v: tImagined,
      n: 'A nation is sometimes called an imagined community, a phrase associated with Benedict Anderson. Members never meet most of the other members, yet they feel that they belong together. This does not mean the nation is unreal. It is imagined because it rests on a shared feeling and not on personal contact.',
    }),
    sl('example', 'Worked example 1: is it a nation?', {
      b: 'Test four imagined groups against the standard definition.',
      bl: ['Is it a **large community** with a shared identity?', 'Does it have a **homeland** and a **political aim**?'],
      v: tClassify,
      n: 'Let us test four imagined groups. The people of Veldan fit the idea of a nation. The scattered Corlen traders share language and customs but have no common homeland, so they fit only partly. A school chess club is not a nation. The Hallow people see themselves as distinct, and their claim raises the question of self-determination.',
    }),
    sl('concept', 'Nationalism in history', {
      v: tHistory,
      n: 'Nationalism has shaped history in several ways. In nineteenth century Europe it helped to unify states, and Germany and Italy were unified about eighteen seventy and eighteen seventy one. After the First World War it contributed to the break up of the Austro Hungarian and Ottoman empires. In Asia and Africa it powered anti colonial movements, including India\'s freedom struggle.',
    }),
    sl('diagram', 'A timeline of nationalism', {
      v: vTimeline,
      n: 'This timeline is not drawn to scale. Germany and Italy were unified about eighteen seventy and eighteen seventy one. The First World War was fought from nineteen fourteen to nineteen eighteen, and two large empires broke up afterwards. About nineteen nineteen the idea of one culture, one state gained force. India became independent in nineteen forty seven.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange these developments in the order of time.',
      chk: 'ord_timeline',
      n: 'Think about which development came first and which last.',
    }),
    sl('concept', 'Nationalism and conflict', {
      v: tConflict,
      n: 'Nationalism has bound people together and helped them win freedom. It has also been linked with wars and with the exclusion of some groups. Both are true, because the same feeling of belonging can include some people and shut out others. A student should give examples of both effects and avoid a one sided claim.',
    }),
    sl('concept', 'National self-determination', {
      v: tSelfDet,
      n: 'National self determination is the claim of a nation to govern itself and to have its own state. It became important after the First World War, when many people held the idea of one culture, one state. In an imagined case, the Hallow people of Ostira ask for a state in which they make the laws.',
    }),
    sl('example', 'Worked example 2: the Hallow people of Ostira', {
      b: 'Apply the idea to an imagined case.',
      bl: ['State the **claim** and the **principle**', 'Weigh the **difficulty** and a **fair approach**'],
      v: tApply,
      n: 'The imagined Hallow people ask for a state of their own. The principle is self determination. The difficulty is that Hallow and non Hallow families live side by side in many towns, so a new state would contain minorities of its own, and division could repeat. A fair approach is to hear the Hallow and consider constitutional protection of language, culture and schools.',
    }),
    sl('diagram', 'The self-determination dilemma', {
      v: vDilemma,
      n: 'This flow shows the dilemma. A nation claims self determination. Giving each group its own state seems fair, but peoples live mixed together. A new state would have its own minorities. Division could repeat again and again, and ever smaller states are neither practical nor peaceful. A democratic answer is to protect minority identities by rights inside the state.',
    }),
    sl('concept', 'Why it is hard to apply', {
      v: tProblems,
      n: 'Almost every state contains minorities, because peoples live mixed together. A new state creates new minorities, and the same demand could be made again. Ever smaller states are neither practical nor peaceful. Another path is for democratic states to protect the identities of minorities by rights.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on self-determination.',
      chk: 'fb_selfdet',
      n: 'Recall the first word of the term.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on nation and self-determination.',
      bl: ['Start with the **definition** and the **elements**', 'End with the **problem** and a **democratic answer**'],
      v: tPlan1,
      n: 'To plan a five mark answer, begin with the definition of a nation. Give the elements, and say that a nation is not the same as a race, a language group or a religion. Mention the imagined community and Benedict Anderson. Then explain self determination, and end with the problem of minorities. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To sum up. A nation is a large group with a shared identity who wish to govern themselves. It is not the same as a race, a language group or a religion. It is an imagined community. Nationalism has unified states, ended empires, powered freedom struggles, and been linked with conflict. Self determination raises the problem of minorities.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define a **nation** first', 'Name the **elements**', 'Give **both effects** of nationalism', 'Explain **minorities** in a self-determination answer'],
      v: tTips1,
      n: 'A few tips. Define a nation first, and name its elements. Remember that a nation is not a race or a religion. When writing about nationalism in history, give both its unifying and its divisive effects. In an answer on self determination, explain the problem of minorities. Support each point with a short imagined example.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Nationalism, Part 2: Nationalism and Pluralism',
  goals: [
    'Explain how democratic states can accommodate diversity',
    'Describe group rights alongside individual rights',
    'State the linguistic reorganisation of 1956 and Articles 29 and 30',
    'Explain pluralism and the difference between unity and uniformity',
    'Present Tagore\'s criticism of narrow nationalism and the two views on national unity',
  ],
  slides: [
    sl('title', 'Nationalism and Pluralism', {
      b: 'Part 2: **diversity**, **group rights**, **pluralism** and **Tagore**.',
      v: flow('LR', ['Diversity in nations', 'Ways to accommodate it', 'India\'s examples', 'Pluralism', 'Tagore and two views'], 'Route map of Part 2: diversity in nations, ways to accommodate it, India\'s examples, pluralism, Tagore and two views', 'Part 2 at a glance'),
      n: 'In Part one we saw that giving every group its own state is hard. Now we ask how democratic states can keep diverse nations together fairly. We look at rights, at examples from India, at pluralism, and at the view of Rabindranath Tagore.',
    }),
    sl('concept', 'Diversity within nations', {
      v: tDiversity,
      n: 'Many nations include people of several languages, faiths and cultures. The question is how a democratic state can keep such a nation together fairly. The answer in this chapter is by recognising and protecting identities, not by forcing sameness. In imagined Marenth, children have three home languages.',
    }),
    sl('concept', 'Ways to accommodate diversity', {
      v: tWays,
      n: 'A democratic state can accommodate diversity in several ways. It can recognise that minorities have their own language, religion and culture. It can give constitutional rights to linguistic, religious and cultural groups. It can protect group rights alongside individual rights. And it can keep public offices and institutions open to all communities.',
    }),
    sl('check', 'Quick check: accommodating diversity', {
      b: 'Which statement describes one way of accommodating diversity?',
      chk: 'm_accommodate',
      n: 'Think about what a democratic state recognises and protects.',
    }),
    sl('concept', 'Group rights and individual rights', {
      v: tGroup,
      n: 'Individual rights are held by each person and protect equal treatment. Group rights are held by a community as a community and protect its language, religion or culture. Both are needed, and group rights work alongside individual rights. In imagined Kessar, every citizen has equal rights, and every community may teach its own language.',
    }),
    sl('concept', 'Linguistic reorganisation of states', {
      v: tLang,
      n: 'In nineteen fifty six, state boundaries in India were redrawn mainly along linguistic lines. The idea was to recognise language groups within one nation. It shows that unity need not mean one language for all. Some argue that such recognition strengthens unity, while others stress the need to guard against division.',
    }),
    sl('concept', 'Articles twenty nine and thirty', {
      v: tArt,
      n: 'Article twenty nine of the Constitution allows any section of citizens with a distinct language, script or culture to conserve it. Article thirty allows religious and linguistic minorities to establish and administer educational institutions of their choice. In an imagined case, parents of a linguistic minority open a school that teaches in their language.',
    }),
    sl('check', 'Quick check: match', {
      b: 'Match each provision or measure with what it does.',
      chk: 'mt_articles',
      n: 'Pair each provision with its description.',
    }),
    sl('example', 'Worked example 1: the clauses of imagined Kessar', {
      b: 'Sort the imagined clauses into group and individual rights.',
      bl: ['Is the right held by **each person** or by a **community**?', 'Does it protect **equal treatment** or **identity**?'],
      v: tKessar,
      n: 'Look at four imagined clauses of Kessar. Equal rights before the law is an individual right. The right of a community to keep its language and script is a group right. The right of a minority to run its own schools is also a group right. Open public offices are an individual right. Together they accommodate diversity.',
    }),
    sl('concept', 'Pluralism', {
      v: tPluralism,
      n: 'Pluralism is the idea that a nation can include many cultures and identities. Unity is a bond among people, while uniformity is being the same, and pluralists hold that unity need not mean uniformity. A pluralist state gives every community a fair place. Imagined Marenth lets each language community hold evening classes beside the common curriculum.',
    }),
    sl('diagram', 'Two views on unity', {
      v: vCompare,
      n: 'This chart compares two views. Some argue that unity needs a shared culture, because common language and customs give a shared bond. Others argue that unity is built by respecting diversity, because people are loyal when they have a fair place. Each view has a possible risk, and a student should weigh both.',
    }),
    sl('concept', 'Weighing the two views', {
      v: tViews,
      n: 'The first view says that unity needs a shared culture, but minorities may feel pushed out. The second says that unity is built by respecting diversity, but groups may feel apart. A student should present both views with reasons, and then judge with evidence rather than with a slogan.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about pluralism is true or false.',
      chk: 'tf_unity',
      n: 'Think about what supporters of pluralism say about unity.',
    }),
    sl('concept', 'Tagore on narrow nationalism', {
      v: tTagore,
      n: 'Rabindranath Tagore valued the freedom struggle. But he held that patriotism should not override humanity. A narrow nationalism that puts the nation above everything may shut out other peoples and overlook minorities within the nation. A student should state his view in her own words.',
    }),
    sl('example', 'Worked example 2: the Greenfield school debate', {
      b: 'Link each imagined speaker with an idea from the chapter.',
      bl: ['Which speaker holds the **shared culture** view?', 'Which one is close to **Tagore**?'],
      v: tTagoreEx,
      n: 'At the imagined Greenfield school debate, Mira says unity needs one shared culture. Kofi says we can love our country and respect everyone, which fits pluralism. Rohan says nothing outside the country matters, which is the narrow nationalism that Tagore criticised. Leena says concern for others fits love of country, close to Tagore.',
    }),
    sl('concept', 'Linking the ideas', {
      v: tLink,
      n: 'Nationalism is a strong feeling of belonging to a nation. It has unified, freed and also divided. Self determination is a nation\'s claim to govern itself, and it raises the problem of minorities. Pluralism holds that many identities can live in one nation, and it is a way to accommodate diversity.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on pluralism.',
      chk: 'fb_pluralism',
      n: 'Recall the name for the idea that unity need not mean uniformity.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on nationalism and pluralism.',
      bl: ['Start with **diversity** and ways to accommodate it', 'End with **both views** and **Tagore**'],
      v: tPlan2,
      n: 'To plan a five mark answer, begin with diversity within nations. Describe recognition, constitutional rights and group rights beside individual rights. Give India\'s examples, the reorganisation of states in nineteen fifty six and Articles twenty nine and thirty. Explain pluralism and both views on shared culture, and end with Tagore. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To sum up. Democratic states can accommodate diversity by recognising and protecting minority identities. Group rights work beside individual rights. India reorganised states on linguistic lines in nineteen fifty six, and Articles twenty nine and thirty protect minorities. Pluralism holds that unity need not mean uniformity. There are two views on shared culture, and Tagore held that patriotism should not override humanity.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Keep **unity** and **uniformity** apart', 'Do not mix **Article 29** and **Article 30**', 'Give **both views**, then judge', 'State Tagore\'s view **in your own words**'],
      v: tTips2,
      n: 'A few tips. Keep unity and uniformity apart. Do not mix up Article twenty nine, which is about conserving language, script and culture, with Article thirty, which is about minority educational institutions. Give both views on shared culture with reasons before you judge. State Tagore\'s view in your own words, and support each point with an example.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Nationalism: Notes',
  sections: [
    {
      h: '1. What a nation is',
      t: 1,
      b: 'A **nation** is a large group of people who see themselves as a **community** with a shared identity, and who wish to **govern themselves**. The elements commonly named are shared **beliefs**, **history**, **territory**, shared **political ideals** and a **common political identity**.\n\nA nation is **not the same** as a race, a language group or a religion; many nations include people of different languages and faiths.',
      terms: [
        ['Nation', 'A large group of people who see themselves as a community with a shared identity, and who wish to govern themselves.'],
        ['Territory', 'The land that the members of a nation regard as their homeland.'],
        ['Common political identity', 'The shared sense of belonging together as citizens of one political community.'],
      ],
      v: vWeb,
      vs: [tNation, tNotRace, tClassify],
    },
    {
      h: '2. The imagined community',
      t: 1,
      b: 'A nation is sometimes described as an **imagined community**, a phrase associated with **Benedict Anderson**. Members never meet most of the other members, yet they feel that they **belong together**. The community is real in its effects; it is imagined because it rests on shared feeling and not on personal contact.',
      terms: [
        ['Imagined community', 'A description of a nation as a community whose members never meet most of the others, yet feel that they belong together.'],
      ],
      v: tImagined,
    },
    {
      h: '3. Nationalism in history',
      t: 1,
      b: 'Nationalism helped to **unify** states in nineteenth-century Europe; **Germany** and **Italy** were unified about **1870 and 1871**. After the **First World War** (1914 to 1918) it contributed to the break-up of the **Austro-Hungarian** and **Ottoman** empires. It powered **anti-colonial movements** in Asia and Africa, including India\'s freedom struggle. It has also been linked with **conflict** and wars.',
      terms: [
        ['Nationalism', 'A strong sense of belonging to a nation and loyalty to its identity and aims.'],
        ['Anti-colonial movement', 'A movement in which a people under foreign rule demands freedom and self-government.'],
      ],
      v: vTimeline,
      vs: [tHistory, tConflict],
    },
    {
      h: '4. National self-determination',
      t: 1,
      b: '**National self-determination** is the claim of a nation to **govern itself** and have its **own state**. It became important after the First World War, when the idea of **one culture, one state** gained force.\n\nThe difficulty is that almost every state has **minorities**. Giving each group its own state would create new minorities, and **ever smaller states** are neither practical nor peaceful. Democratic states can instead protect minority identities by rights.',
      terms: [
        ['National self-determination', 'The claim of a nation to govern itself and to have its own state.'],
        ['Minority', 'A group within a state that differs from the majority in language, religion or culture.'],
      ],
      v: vDilemma,
      vs: [tSelfDet, tApply, tProblems, tPlan1],
    },
    {
      h: '5. Accommodating diversity',
      t: 2,
      b: 'A democratic state can accommodate diversity by **recognising and protecting** the identities of minorities, through **constitutional rights** for linguistic, religious and cultural groups, and **group rights** alongside individual rights.\n\nIn India, states were reorganised mainly on **linguistic lines in 1956**. **Article 29** lets a section of citizens with a distinct language, script or culture conserve it. **Article 30** lets religious and linguistic minorities establish and administer educational institutions of their choice.',
      terms: [
        ['Group rights', 'Rights that protect the language, religion or culture of a community as a community, alongside the rights of individuals.'],
        ['Individual rights', 'Rights held by each person, which protect equal treatment.'],
      ],
      v: tWays,
      vs: [tDiversity, tGroup, tLang, tArt, tKessar],
    },
    {
      h: '6. Pluralism, unity and Tagore',
      t: 2,
      b: '**Pluralism** is the idea that a nation can include many cultures and identities, and that **unity need not mean uniformity**.\n\nSome argue that strong national unity needs a **shared culture**. Others argue that unity is best built by **respecting diversity**. A student presents both with reasons and then judges.\n\n**Rabindranath Tagore** valued the freedom struggle but held that **patriotism should not override humanity**; a narrow nationalism may shut out others and overlook minorities.',
      terms: [
        ['Pluralism', 'The idea that a nation can include many cultures and identities, and that unity need not mean uniformity.'],
        ['Uniformity', 'The condition of everyone being the same in language, culture or custom.'],
        ['Narrow nationalism', 'A nationalism that places the nation above all else, including concern for humanity.'],
      ],
      v: vCompare,
      vs: [tPluralism, tViews, tTagore, tTagoreEx, tLink, tPlan2],
    },
  ],
  tips: '**Common mistakes**\n- Saying a nation is a race or a religion: nations include people of different languages and faiths.\n- Calling an imagined community unreal: it is real in its effects but rests on shared feeling.\n- Calling nationalism only good or only bad: state both its unifying and its divisive effects.\n- Saying every group should get a state: explain minorities and the limits of ever smaller states.\n- Treating unity and uniformity as the same.\n- Mixing up Articles 29 and 30.\n- Quoting Tagore: state his view in your own words.\n\n**Tips:** begin with the standard definition; give a short imagined example; present both views, then judge with reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **nation**?', 'A large group of people who see themselves as a community with a shared identity, and who wish to govern themselves.', 'definition', 1],
  ['Name the elements commonly used to describe a nation', 'Shared beliefs, history, territory, shared political ideals and a common political identity.', 'fact', 1],
  ['Is a nation the same as a race?', 'No. Many nations include people of different backgrounds.', 'concept', 1],
  ['Is a nation the same as a language group?', 'No. A nation may have several languages.', 'concept', 1],
  ['Is a nation the same as a religion?', 'No. A nation may include many faiths.', 'concept', 1],
  ['What is an **imagined community**?', 'A description of a nation as a community whose members never meet most of the others, yet feel they belong together.', 'definition', 1],
  ['With whom is the phrase **imagined community** associated?', 'Benedict Anderson.', 'fact', 1],
  ['Does imagined mean unreal?', 'No. The community is real in its effects; it rests on shared feeling and not on personal contact.', 'concept', 1],
  ['What is **territory** as an element of a nation?', 'The land that members regard as their homeland.', 'definition', 1],
  ['What is a **common political identity**?', 'The shared sense of belonging together as citizens of one political community.', 'definition', 1],
  ['What is **nationalism**?', 'A strong sense of belonging to a nation and loyalty to its identity and aims.', 'definition', 1],
  ['Which two states were unified in Europe about 1870 and 1871?', 'Germany and Italy.', 'fact', 1],
  ['Which empires broke up after the First World War?', 'The Austro-Hungarian and Ottoman empires.', 'fact', 1],
  ['When was the First World War fought?', 'From 1914 to 1918.', 'fact', 1],
  ['What role did nationalism play in Asia and Africa?', 'It powered anti-colonial movements, including India\'s freedom struggle.', 'concept', 1],
  ['What is an **anti-colonial movement**?', 'A movement in which a people under foreign rule demands freedom and self-government.', 'definition', 1],
  ['Is nationalism only a force for good or only for harm?', 'Neither. It has unified and freed people and has also been linked with conflict and wars.', 'concept', 1],
  ['What is **national self-determination**?', 'The claim of a nation to govern itself and to have its own state.', 'definition', 1],
  ['What idea gained force after the First World War?', 'One culture, one state: each national group should have its own state.', 'concept', 1],
  ['What is a **minority**?', 'A group within a state that differs from the majority in language, religion or culture.', 'definition', 1],
  ['Why is a state for every group hard to achieve?', 'Almost every state has minorities, and ever smaller states are neither practical nor peaceful.', 'concept', 1],
  ['How can a democratic state accommodate diversity?', 'By recognising and protecting the identities of minorities, through constitutional rights and group rights beside individual rights.', 'concept', 2],
  ['What are **group rights**?', 'Rights that protect the language, religion or culture of a community as a community, alongside individual rights.', 'definition', 2],
  ['What are **individual rights**?', 'Rights held by each person, protecting equal treatment.', 'definition', 2],
  ['What happened to states in India in 1956?', 'They were reorganised mainly along linguistic lines.', 'fact', 2],
  ['What does **Article 29** provide, in brief?', 'Any section of citizens with a distinct language, script or culture may conserve it.', 'fact', 2],
  ['What does **Article 30** provide, in brief?', 'Religious and linguistic minorities may establish and administer educational institutions of their choice.', 'fact', 2],
  ['What is **pluralism**?', 'The idea that a nation can include many cultures and identities, and that unity need not mean uniformity.', 'definition', 2],
  ['What is the difference between unity and uniformity?', 'Unity is a bond among people; uniformity is being the same. Unity need not mean uniformity.', 'concept', 2],
  ['What view says unity needs a shared culture?', 'The view that common language and customs give people a shared bond.', 'concept', 2],
  ['What view says unity is built by respecting diversity?', 'The view that people are loyal when every community has a fair place.', 'concept', 2],
  ['What was Rabindranath Tagore\'s criticism of narrow nationalism?', 'He valued the freedom struggle but held that patriotism should not override humanity.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Nationalism',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_political_ideals_app', 'm_art_app', 'm_group_app', 'ar_not_race'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_not_race', 's_art29_30', 's3_selfdet_problem'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_selfdet', 'l_accommodate'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_debate'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Nationalism',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_nation_not', 'm_territory_app', 'm_unify', 'm_selfdet_app', 'm_smaller', 'm_uniform_app', 'm_tagore_app', 'm_views_unity', 'ar_imagined', 'ar_pluralism'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_imagined', 's_minorities', { attempt: 1, keys: ['s_pluralism', 's_anticolonial'] }, 's3_elements', { attempt: 1, keys: ['s3_two_views', 's3_tagore'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_history', { attempt: 1, keys: ['l_pluralism_views', 'l_tagore'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_kessar', 'c_classroom'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch17 only (nations and nationalism, elements of a nation, imagined community, nationalism in history, national self-determination; accommodating diversity, group rights, Articles 29 and 30, linguistic reorganisation 1956, pluralism, Tagore on narrow nationalism, two views on national unity)',
    originality: 'every country, group, school, debate, report, letter, constitution and table is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no quotation of any thinker, no board item reused (D-036)',
    facts: 'stable facts only: Germany and Italy unified about 1870 and 1871; First World War 1914 to 1918 and the break-up of the Austro-Hungarian and Ottoman empires afterwards; anti-colonial movements in Asia and Africa including India\'s freedom struggle, independence 1947; imagined community associated with Benedict Anderson; reorganisation of states on linguistic lines 1956; Articles 29 and 30 paraphrased; Rabindranath Tagore on narrow nationalism paraphrased',
    neutrality: 'no map; no real separatist, secessionist or autonomy movement, region or country named; no claim about any region of India; nationalism and conflict stated neutrally; shared culture versus respect for diversity presented as some argue, others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
