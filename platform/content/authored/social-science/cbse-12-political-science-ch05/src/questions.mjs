// CBSE 12 Political Science, ch05 Security in the Contemporary World — question bank. Every scenario,
// country, document and speaker is imagined and written by SOYL (labelled as such); no NCERT text, box,
// cartoon or exercise and no board/sample-paper item is reused (D-036). Real-world facts are limited to
// stable, verifiable ones: treaty years (NPT 1968, BWC 1972, ABM 1972, CWC 1992), India's nuclear tests
// (1974, 1998), and broad, undisputed descriptions of threats. Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Traditional notions: external and internal
Q('m_core_question', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In its most basic sense, what does "security" in world politics mean?',
  opts: [
    'Freedom from threats to the core values of a country or people',
    'The total amount a country spends on its army in a year',
    'The number of allies a country has in a military pact',
    'The ability of a country to export more than it imports',
  ],
  sol: 'Security is about being free from threats to core values (survival, territory, a way of life). Defence spending, alliances and trade surpluses are means or unrelated measures, not the meaning itself.',
}));
Q('m_grave_threat', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why do scholars limit the term "security" to very grave threats only?',
  opts: [
    'Because calling every problem a security issue would make the idea too wide to be useful',
    'Because small threats are always handled by the United Nations',
    'Because only military threats can ever endanger a country',
    'Because governments are not allowed to discuss minor problems',
  ],
  sol: 'If every difficulty (a traffic jam, a price rise) were a security issue, the concept would lose meaning. So it is kept for dangers that could seriously harm core values if not dealt with. The other options are false claims.',
}));
Q('m_deterrence', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined country Veloria announces that any attack on it will be met with a response so costly that the attacker will regret it. Which component of traditional security is Veloria relying on?',
  opts: ['Deterrence', 'Defence', 'Balance of power', 'Alliance building'],
  sol: 'Deterrence aims to **prevent** a war by making the cost of attacking too high. Defence is about limiting or ending a war once it has begun; balance of power and alliances are about the distribution of strength among states.',
}));
Q('m_defence', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'After its border posts are attacked, the imagined country Karvel moves troops to repel the attackers and push them back. This is an example of',
  opts: ['defence', 'deterrence', 'disarmament', 'confidence building'],
  sol: 'Defence means limiting or ending a war that has already started by defeating the attacking forces. Deterrence works before an attack; disarmament and confidence building are forms of cooperation, not fighting.',
}));
Q('m_bop', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Two imagined neighbours, Arvania and Belmora, are roughly equal in strength. Arvania\'s economy and army suddenly start growing much faster. Under the traditional view, how is Belmora most likely to respond?',
  opts: [
    'Build up its own strength or seek partners so that the balance is not tilted against it',
    'Disband its army because a stronger neighbour makes war impossible',
    'Ignore the change, since power never affects security',
    'Ask Arvania to join its own military alliance immediately',
  ],
  sol: 'States watch the **balance of power** closely: if a neighbour grows much stronger, the other tries to restore the balance by building its own capabilities or forming alliances. Disbanding or ignoring the change runs against this logic.',
}));
Q('m_alliance_basis', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Alliances in traditional security are usually based on',
  opts: [
    'national interests, so they can change when those interests change',
    'permanent friendship that never changes',
    'a common religion shared by all members',
    'orders from the United Nations Security Council',
  ],
  sol: 'An alliance is a coalition of states formed to deter or defend against attack, and it rests on national interest. When interests shift, alliances shift too, so they are not permanent or based on faith or UN orders.',
}));
Q('m_new_states', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Many countries that became independent in Asia and Africa after 1945 faced a security challenge different from that of most Western European states. What was it?',
  opts: [
    'They faced threats both from neighbours and from separatist movements inside their borders',
    'They faced no external threats because the Cold War protected them',
    'They faced only internal threats and never had border disputes',
    'They were barred from building their own armies',
  ],
  sol: 'Newly independent states often had border disputes with neighbours **and** internal movements seeking separate states, so external and internal security were linked. The other options are untrue.',
}));
Q('m_just_war', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which idea from the tradition of limiting violence in war is part of traditional security thinking?',
  opts: [
    'Force should spare non-combatants and be used only in proportion to the threat',
    'Any amount of force is acceptable once a war has started',
    'Prisoners of war have no protection at all',
    'Wars should be fought only by private armies',
  ],
  sol: 'Traditional security also accepts limits on the use of force: protecting civilians and unarmed or surrendering soldiers, and using force proportionately and as a last resort.',
}));
Q('ar_choices', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'In the traditional view, the greatest danger to a country comes from military threats.',
  r: 'Military action by another country can endanger the territory, sovereignty and lives of ordinary people.',
  sol: 'Both are true, and R explains A: military force threatens the core of sovereignty (territory, independence) and also the lives of civilians, which is why the traditional view ranks it highest.',
}));
Q('ar_internal', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'After the Second World War, internal security was less of a concern for most Western powers.',
  r: 'All newly independent countries of Asia and Africa had no internal conflicts.',
  sol: 'A is true: the stable Western democracies mostly had internal peace, so they focused on external threats. R is false: many new states faced separatist and internal conflicts.',
}));
Q('tf_surrender', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? In the traditional view, a government facing a threat of war has three basic choices: to surrender, to prevent the attack by raising its cost, or to defend itself once war begins.',
  sol: 'These are the three classic options; deterrence covers the second and defence the third. Surrender is rarely chosen but remains a logical option.',
}));
Q('fb_bop', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Trying to prevent a rival country from becoming much stronger than one\'s own is called maintaining the ___ of power.',
  acc: [['balance']],
  sol: 'This is the balance of power: states try to keep the distribution of strength from tilting sharply against them.',
}));
Q('mt_components', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each component of traditional external security with what an imagined government does under it.',
  pairs: [
    ['Deterrence', 'Warns that an attack will bring unacceptable losses to the attacker'],
    ['Defence', 'Fights to drive back forces that have already crossed the border'],
    ['Balance of power', 'Expands its own capabilities when a neighbour grows much stronger'],
    ['Alliance building', 'Signs a mutual-defence pact with two like-minded countries'],
  ],
  sol: 'Deterrence prevents war; defence ends or limits it; balance of power watches relative strength; alliances pool strength through a coalition.',
}));
Q('s_deter_defence', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does deterrence differ from defence in traditional security? Give one point for each.',
  model: '1. **Deterrence** works **before** a war: a country makes clear that an attacker would suffer unbearable costs, so the attack never happens.\n2. **Defence** works **after** fighting begins: the country uses force to limit the damage, repel the attacker and end the war.',
  sol: 'One point on the timing and purpose of each.',
  scheme: [['Deterrence: preventing war by raising its cost', 1], ['Defence: limiting or ending a war once started', 1]],
}));
Q('s_alliances', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are alliances in traditional security described as temporary? Give two reasons.',
  model: '1. Alliances are formed to serve **national interests**, such as deterring a common rival; when that rival weakens or interests diverge, the reason for the alliance disappears.\n2. A former **opponent** may later become a partner, so countries **switch** sides as circumstances change.',
  sol: 'Link alliances to interests and show that changing interests change alliances.',
  scheme: [['Based on national interest', 1], ['Interests and partners change over time', 1]],
}));
Q('s3_traditional_coop', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Traditional security is mainly about force, yet it also recognises cooperation. Explain three forms of such cooperation between states.',
  model: '1. **Disarmament:** states agree to give up certain kinds of weapons altogether, for example biological or chemical weapons.\n2. **Arms control:** states accept limits on how weapons are acquired, developed or deployed, such as caps on missile defences.\n3. **Confidence building:** rivals share information about military plans and exercises so that neither side misreads the other and goes to war by mistake.',
  sol: 'Name and explain disarmament, arms control and confidence building.',
  scheme: [['Disarmament explained', 1], ['Arms control explained', 1], ['Confidence building explained', 1]],
}));
Q('l_traditional', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the four components of the traditional notion of external security. Why do states rely on these means?',
  model: '1. **Deterrence:** a state prevents war by convincing a rival that an attack would cost far more than it could gain.\n2. **Defence:** if war comes, the state fights to limit damage and push the attacker back.\n3. **Balance of power:** states keep a watch on relative strength and build their own capabilities when a rival grows much stronger.\n4. **Alliance building:** states form coalitions to add to their combined strength; these follow national interest and can change.\n5. **Why:** in the traditional view there is **no world government** to protect a country, so each state must rely on its own power and partners to safeguard its sovereignty.',
  sol: 'Four components, each explained, and a closing point on why states depend on them.',
  scheme: [['Deterrence', 1], ['Defence', 1], ['Balance of power', 1], ['Alliance building', 1], ['Reason: self-help in the absence of a world authority', 1]],
}));

// ---------------------------------------------------------------- arms control and disarmament (t01)
Q('m_bwc', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which international agreement of 1972 banned the production and possession of biological weapons?',
  opts: ['The Biological Weapons Convention', 'The Chemical Weapons Convention', 'The Nuclear Non-Proliferation Treaty', 'The Anti-Ballistic Missile Treaty'],
  sol: 'The Biological Weapons Convention dates from 1972. The Chemical Weapons Convention is from 1992, the NPT from 1968, and the ABM Treaty (1972) limited missile defence systems, not biological weapons.',
}));
Q('m_abm', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'The Anti-Ballistic Missile Treaty of 1972 between the United States and the Soviet Union is an example of',
  opts: ['arms control', 'complete disarmament', 'humanitarian intervention', 'cooperative security led by NGOs'],
  sol: 'The treaty did not abolish weapons; it **limited** missile defence systems so that neither side would feel safe enough to strike first. That is arms control, not disarmament.',
}));
Q('m_npt', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why is the Nuclear Non-Proliferation Treaty (1968) described as arms control rather than disarmament?',
  opts: [
    'It allowed the countries that had tested nuclear weapons before 1967 to keep them, while others agreed not to acquire them',
    'It required every country in the world to destroy all its nuclear weapons at once',
    'It banned only biological and chemical weapons',
    'It was signed only by the United States and the Soviet Union',
  ],
  sol: 'The NPT regulated **who** could hold nuclear weapons: the states that had tested them before 1 January 1967 kept them and the rest gave up the option. It did not abolish them, so it is arms control.',
}));
Q('ar_npt', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'India has not signed the Nuclear Non-Proliferation Treaty.',
  r: 'India has regarded the treaty as discriminatory because it divides countries into those allowed and those not allowed to hold nuclear weapons.',
  sol: 'Both are true and R gives India\'s stated reason for staying out: it sees the treaty as unequal, favouring the countries that already had nuclear weapons.',
}));
Q('ord_treaties', ord({
  t: 1, d: 2, c: 'recall', marks: 1,
  stem: 'Arrange these arms-control and disarmament agreements in the order in which they were concluded, earliest first.',
  items: [
    'Nuclear Non-Proliferation Treaty',
    'Biological Weapons Convention and the Anti-Ballistic Missile Treaty',
    'Chemical Weapons Convention',
  ],
  sol: 'NPT 1968, then the BWC and ABM Treaty in 1972, then the CWC in 1992.',
}));
Q('fb_cwc', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The ___ Weapons Convention of 1992 bans the making, stockpiling and use of chemical weapons.',
  acc: [['Chemical']],
  sol: 'The Chemical Weapons Convention (1992) is a disarmament agreement covering chemical weapons.',
}));
Q('s_disarm_control', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Two imagined rivals agree (i) to stop all production of a deadly nerve gas and destroy their stocks, and (ii) to cap the number of missile launchers each may keep. Classify each step and give a reason.',
  model: '(i) is **disarmament**: a whole category of weapon is **given up** and destroyed.\n(ii) is **arms control**: the weapons stay, but their **number is limited** by agreement so that the rivalry stays stable.',
  sol: 'Abolishing a weapon type = disarmament; capping or regulating = arms control.',
  scheme: [['(i) disarmament with reason', 1], ['(ii) arms control with reason', 1]],
}));
Q('s_confidence', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The armies of two imagined neighbours, Sorun and Teval, inform each other in advance before large exercises near their border. What is this practice called, and how does it help security?',
  model: 'It is **confidence building**. By sharing information in advance, each side knows the exercise is not preparation for an attack, so **misunderstanding and accidental war** become less likely and trust grows.',
  sol: 'Name the practice and link it to reducing mistrust.',
  scheme: [['Confidence building', 1], ['Reduces misperception and the risk of war by mistake', 1]],
}));

// ================================================================ t02 Non-traditional notions
Q('m_nontrad_whose', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Non-traditional notions of security differ from traditional ones mainly because they',
  opts: [
    'focus on the security of people and of humanity as a whole, not only of states',
    'deal only with threats from foreign armies',
    'reject any role for international cooperation',
    'apply only to the largest military powers',
  ],
  sol: 'The non-traditional view widens the "referent" of security from the state to human beings and the whole planet, and widens threats beyond military ones.',
}));
Q('m_human_narrow', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Supporters of the **narrow** concept of human security focus mainly on protecting individuals from',
  opts: ['violence', 'all forms of want, including hunger and disease', 'loss of national prestige', 'trade deficits'],
  sol: 'The narrow concept is about protecting people from violence, much of it by their own state or armed groups. The broad concept adds threats such as hunger, disease and disasters.',
}));
Q('m_freedom_want', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined charter says that people must be free both from violence and from hunger, disease and the effects of disasters. Which idea of security does this charter reflect?',
  opts: ['The broad concept of human security', 'The narrow concept of human security', 'Traditional external security', 'Balance of power'],
  sol: 'Covering hunger, disease and disasters along with violence ("freedom from want" as well as "freedom from fear") is the broad concept of human security.',
}));
Q('m_global_sec', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which of these threats is the best example of a **global security** concern?',
  opts: [
    'A rise in sea level that endangers low-lying coastal countries everywhere',
    'A quarrel between two villages over a grazing field',
    'A dispute between two firms over a contract',
    'A single country\'s decision to change its school syllabus',
  ],
  sol: 'Global security deals with threats that no single state can solve and that affect people across borders, such as rising seas from global warming. The others are local or private matters.',
}));
Q('m_own_govt', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A key reason scholars developed the idea of human security was the observation that',
  opts: [
    'in many cases people have been killed or harmed by their own governments rather than by foreign armies',
    'foreign invasions stopped completely after 1945',
    'states no longer have armies to protect their people',
    'only economic growth matters to ordinary citizens',
  ],
  sol: 'A secure state does not always mean secure people: governments have sometimes turned violence against their own citizens. Human security puts people at the centre to address this.',
}));
Q('ar_human_state', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Human security gives priority to the protection of people over the protection of states.',
  r: 'Global security threats such as global warming cannot be tackled by a single country acting alone.',
  sol: 'Both statements are true, but R is about global security (threats needing international cooperation), not the reason human security centres on people. So R does not explain A.',
}));
Q('tf_narrow_broad', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Supporters of the narrow and the broad concepts of human security disagree about whether individuals, rather than states, should be protected.',
  sol: 'Both camps agree that **individuals** are to be protected. They differ only on **which threats** count: violence alone (narrow) or also hunger, disease and disasters (broad).',
}));
Q('s_human_vs_trad', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between the traditional notion of security and human security.',
  model: '1. **Whose security:** traditional security protects the **state** (territory, sovereignty); human security protects **individual people**.\n2. **Which threats:** traditional security looks mainly at **military** threats; human security also includes violence by one\'s own state, hunger, disease and disasters.',
  sol: 'Contrast the object protected and the range of threats.',
  scheme: [['Object of security: state vs people', 1], ['Range of threats: military vs wider', 1]],
}));
Q('s3_global_why', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why is "global security" a separate idea from national security? Explain with two examples of global threats.',
  model: 'Global security covers dangers that **cross borders** and that **no single state can handle alone**, so cooperation among countries is needed.\n1. **Global warming:** rising temperatures and sea levels affect many countries at once, whoever caused the emissions.\n2. **Health epidemics:** a new infectious disease can travel through trade and travel to every continent within weeks.',
  sol: 'Define the idea (cross-border, needs cooperation) and give two explained examples.',
  scheme: [['Meaning: cross-border threats needing cooperation', 1], ['First example explained', 1], ['Second example explained', 1]],
}));

// ================================================================ t03 New sources of threat
Q('m_terror_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Terrorism refers to political violence that',
  opts: [
    'deliberately targets civilians, without discrimination, to create fear',
    'is used only by regular armies in declared wars',
    'is always approved by the United Nations',
    'never crosses national borders',
  ],
  sol: 'Terrorism is political violence aimed deliberately and indiscriminately at civilians in order to spread fear and pressure governments. It is not conventional war and often crosses borders.',
}));
Q('m_terror_aim', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What is the usual aim of a terrorist group that attacks crowded public places?',
  opts: [
    'To use the fear created among people to force a change in a political situation',
    'To capture and govern the territory where the attack took place',
    'To win a declared war against another country\'s army',
    'To earn money from the people who are attacked',
  ],
  sol: 'Terrorists use violence against ordinary people to spread fear and so pressure governments or societies into political change. They usually cannot win a conventional war or govern territory directly.',
}));
Q('m_rights_types', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'People in the imagined country Mirvana demand clean water, health care and a minimum wage. Which category of human rights are they asking for?',
  opts: ['Economic and social rights', 'Political rights', 'Rights of colonised peoples', 'Rights of states to self-defence'],
  sol: 'Water, health care and wages are economic and social rights. Political rights cover free speech and assembly; the third category concerns colonised peoples and indigenous minorities.',
}));
Q('m_intervention', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Why is "humanitarian intervention" by outside powers to stop rights abuses in another country a matter of debate?',
  opts: [
    'Some argue it protects people, while others worry that powerful states may use it selectively to suit their own interests',
    'Everyone agrees it should happen automatically whenever a government is criticised',
    'International law forbids any discussion of human rights',
    'It is only about trade and has nothing to do with rights',
  ],
  sol: 'One side holds that the world must act to protect people from grave abuse; the other points out that interventions can override sovereignty and that strong states choose when and where to act according to their own interests.',
}));
Q('m_refugee', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Fighting forces a family in the imagined country Tarvania to flee across the border into a neighbouring country. In world politics this family is described as',
  opts: ['refugees', 'internally displaced persons', 'economic migrants', 'non-combatant soldiers'],
  sol: 'People who flee war, persecution or disaster **across an international border** are refugees. If they had fled within Tarvania\'s own borders, they would be internally displaced persons.',
}));
Q('m_idp', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'After floods and armed clashes, thousands of people in the imagined country Ondara leave their villages but stay inside Ondara, living in camps near the capital. They are',
  opts: ['internally displaced persons', 'refugees', 'migrant workers abroad', 'stateless citizens of another country'],
  sol: 'They have been forced from their homes but have **not crossed an international border**, so they are internally displaced persons, not refugees.',
}));
Q('m_poverty', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why is global poverty treated as a source of insecurity in world politics?',
  opts: [
    'Poverty in poorer regions is linked to conflict, migration and disease, which spill over borders',
    'Poor countries usually have the largest armies',
    'Poverty affects only the people concerned and has no wider effect',
    'Rich countries are always the cause of every war',
  ],
  sol: 'Widespread poverty and the gap between rich and poor regions feed conflicts, push people to migrate and weaken health systems, so the problems spread beyond any one country.',
}));
Q('m_epidemic', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why are health epidemics considered a threat to security and not only a medical problem?',
  opts: [
    'Diseases spread across borders through travel, trade and migration, and can disrupt whole societies and economies',
    'Epidemics affect only the country where a disease first appears',
    'Only military hospitals can treat infectious diseases',
    'Epidemics are always caused by deliberate attacks',
  ],
  sol: 'Infectious diseases move with people and goods; HIV/AIDS and later pandemics showed they can overload health systems, reduce working populations and disrupt economies far from where they began.',
}));
Q('ar_poverty_conflict', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Global poverty can become a source of insecurity beyond the countries where it is found.',
  r: 'Poverty and inequality can contribute to conflict and to large movements of people across borders.',
  sol: 'Both are true, and R explains A: through conflict and migration, poverty in one region affects neighbours and the wider world.',
}));
Q('ar_epidemic_isolate', ar({
  t: 3, d: 2, c: 'evaluation', key: 'd',
  a: 'A country can always protect itself from an epidemic by closing its own borders, without cooperating with others.',
  r: 'Infectious diseases spread through travel, trade and the movement of people.',
  sol: 'A is false: closed borders are never complete and diseases are best contained through shared information, research and health support, so cooperation is needed. R is true.',
}));
Q('tf_terror_war', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Terrorism is a form of conventional war fought between the regular armies of two countries.',
  sol: 'Terrorism is non-conventional political violence that deliberately targets civilians. It is usually carried out by groups, not by regular national armies facing each other in battle.',
}));
Q('mt_threats', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined news report with the new source of threat it describes.',
  pairs: [
    ['A bomb is set off in a busy market to frighten the public', 'Terrorism'],
    ['A government jails journalists who criticise it', 'Violation of human rights'],
    ['A new virus spreads to twelve countries in a month', 'Health epidemic'],
    ['Fifty thousand people cross a border to escape fighting', 'Refugee movement'],
  ],
  sol: 'Indiscriminate violence on civilians = terrorism; silencing critics = denial of political rights; cross-border disease = epidemic; fleeing across a border = refugees.',
}));
Q('fb_refugee', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'People who flee their homes but remain within their own country\'s borders are called internally ___ persons.',
  acc: [['displaced']],
  sol: 'They are internally displaced persons; they differ from refugees, who cross an international border.',
}));
Q('s_rights_categories', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the three broad categories into which human rights are commonly grouped in world politics, with one example of any two.',
  model: 'The three categories are **political rights**, **economic and social rights**, and the **rights of colonised peoples and of ethnic and indigenous minorities**. Examples: freedom of speech (political); the right to a fair wage or to health care (economic and social).',
  sol: 'All three categories named, with two examples.',
  scheme: [['Three categories named', 1], ['Two correct examples', 1]],
}));
Q('s_refugee_idp', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish between refugees and internally displaced persons, with an imagined example of each.',
  model: '**Refugees** flee war, persecution or disaster **across an international border**, e.g. villagers from an imagined Country A who escape into Country B. **Internally displaced persons** are forced from their homes but **stay within their own country**, e.g. flood victims who move to camps in their own state.',
  sol: 'The test is whether an international border is crossed.',
  scheme: [['Refugees: cross a border, with example', 1], ['IDPs: remain inside the country, with example', 1]],
}));
Q('s3_terror_threat', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why terrorism is called a "new" source of threat even though political violence is old.',
  model: '1. **Targets:** it deliberately and indiscriminately strikes **civilians** in markets, transport or offices rather than armies.\n2. **Actors:** it is often carried out by **groups that are not states**, which are hard to deter with traditional military power.\n3. **Reach:** many groups work **across borders** using modern communication, finance and travel, so no single country can deal with them alone.',
  sol: 'Three features that make it different from conventional threats.',
  scheme: [['Civilian targets', 1], ['Non-state actors hard to deter', 1], ['Transnational reach needing cooperation', 1]],
}));
Q('s3_migration', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How can large-scale migration become a security concern for both the people who move and the countries they move to? Give three points.',
  model: '1. **For migrants:** people fleeing conflict or disaster often lack food, shelter, health care and legal protection, so their own security is at risk.\n2. **For host countries:** a sudden inflow can strain housing, jobs and public services, especially in poorer border regions.\n3. **For relations between states:** disputes may arise over who should accept and support displaced people, which makes cooperation and international help important.',
  sol: 'One point on migrants\' own insecurity, one on pressures for hosts, one on interstate tension or the need for cooperation.',
  scheme: [['Insecurity of migrants themselves', 1], ['Pressure on host societies', 1], ['Interstate tension or need for cooperation', 1]],
}));
Q('l_new_threats', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain any five new sources of threat to security in the contemporary world.',
  model: '1. **Terrorism:** groups deliberately attack civilians to spread fear and force political change, often operating across borders.\n2. **Violation of human rights:** governments or armed groups may deny people political, economic or social rights, or attack their own citizens.\n3. **Global poverty:** poverty and the gap between rich and poor regions feed conflict, hunger and instability.\n4. **Migration and refugees:** wars and disasters drive people from their homes, within or across borders, straining both them and host areas.\n5. **Health epidemics:** diseases such as HIV/AIDS and later pandemics travel quickly and can disrupt societies and economies worldwide.',
  sol: 'Five distinct threats, each explained as a threat to people or states.',
  scheme: [['Terrorism', 1], ['Human rights violations', 1], ['Global poverty', 1], ['Migration and refugees', 1], ['Health epidemics', 1]],
}));
Q('l_rights_intervention', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Human rights are now seen as part of security. Explain the main categories of human rights and evaluate the debate over outside intervention to protect them.',
  model: '1. **Political rights:** freedom of speech, assembly and the vote.\n2. **Economic and social rights:** work, a fair wage, health care, education and food.\n3. **Rights of colonised peoples and minorities:** self-determination and protection of indigenous and ethnic groups.\n4. **For intervention:** supporters say the world cannot stand aside when a government commits grave abuses against its own people; human life matters more than borders.\n5. **Against or with caution:** critics say intervention can violate sovereignty, may be used **selectively** by powerful states for their own interests, and can worsen violence; so most argue it should be a last resort, decided collectively.',
  sol: 'Three categories, then both sides of the intervention debate and a balanced conclusion.',
  scheme: [['Political rights', 1], ['Economic and social rights', 1], ['Rights of colonised peoples and minorities', 1], ['Argument for intervention', 1], ['Concerns and a balanced conclusion', 1]],
}));

// ================================================================ t04 Cooperative security and India's strategy
Q('m_coop_why', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why do many non-traditional threats call for cooperative security rather than military force?',
  opts: [
    'Threats such as epidemics, poverty and global warming cannot be defeated by armies and need joint action by many actors',
    'Armies have been abolished in most countries',
    'Cooperation is cheaper than any other policy in every case',
    'International law forbids states from keeping armies',
  ],
  sol: 'You cannot fight a virus or rising sea levels with tanks; such threats need shared information, resources and policies among states, international bodies and others.',
}));
Q('m_coop_actors', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A medical charity, a group of neighbouring governments and a UN agency together run vaccination drives in an imagined region hit by an epidemic. This is an example of',
  opts: ['cooperative security involving state and non-state actors', 'traditional deterrence', 'balance of power politics', 'unilateral military defence'],
  sol: 'Cooperative security can be bilateral, regional or global and may include international organisations and non-governmental groups, as here.',
}));
Q('m_force_last', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'In cooperative security, what is the role of force?',
  opts: [
    'It may be used only as a last resort, ideally with collective approval, for example against terrorists or grave abuses',
    'It is the first and main tool for every threat',
    'It can never be used under any circumstances',
    'It can be used by any state whenever it wishes',
  ],
  sol: 'Cooperation is the main approach, but force is not ruled out: it is a last resort, preferably legitimised collectively, such as to deal with terrorists or to stop mass abuse.',
}));
Q('m_india_tests', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'India conducted nuclear tests in which years?',
  opts: ['1974 and 1998', '1962 and 1971', '1965 and 1999', '1980 and 2004'],
  sol: 'India\'s nuclear tests were held at Pokhran in 1974 and in 1998.',
}));
Q('m_india_component', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined government white paper says that lifting citizens out of poverty and reducing inequality is part of national security. Which component of India\'s security strategy does this match?',
  opts: [
    'Developing the economy so that people are not poor and deprived',
    'Strengthening military capabilities',
    'Strengthening international norms and institutions',
    'Building military alliances with great powers',
  ],
  sol: 'India\'s strategy includes economic development to remove poverty and inequality, on the view that a secure country needs secure, prosperous citizens.',
}));
Q('m_india_norms', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'India has supported universal and non-discriminatory nuclear disarmament and decolonisation, and has worked within the United Nations. Which component of its security strategy do these choices reflect?',
  opts: ['Strengthening international norms and institutions', 'Meeting internal security challenges', 'Strengthening military capabilities', 'Economic development'],
  sol: 'Backing global rules (disarmament, decolonisation), UN processes and similar efforts strengthens international norms and institutions.',
}));
Q('m_nfu', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'India describes its nuclear weapons policy as one of "credible minimum deterrence" with a commitment to',
  opts: ['no first use', 'first use whenever threatened', 'complete secrecy about its doctrine', 'sharing weapons with allies'],
  sol: 'India\'s stated doctrine is a minimum credible deterrent and no first use of nuclear weapons.',
}));
Q('ar_india_military', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'Strengthening military capabilities has been one component of India\'s security strategy.',
  r: 'India has been involved in conflicts with neighbours and is located in a region with nuclear-armed states.',
  sol: 'Both are true and R explains A: past conflicts and a difficult neighbourhood are reasons India gives for maintaining strong defence capabilities.',
}));
Q('tf_coop_only_states', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Cooperative security involves only national governments; international organisations and voluntary groups have no role in it.',
  sol: 'Cooperative security includes international bodies (such as UN agencies), regional groupings, NGOs, businesses and even well-known individuals, not just governments.',
}));
Q('s_coop_levels', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'At what levels can cooperative security operate? Give an imagined example of any one level.',
  model: 'It can be **bilateral** (two countries), **regional**, **continental** or **global**. Example: five neighbouring imagined countries share flood warnings and send rescue teams to each other during the monsoon, which is **regional** cooperation.',
  sol: 'Levels named, with one fitting example.',
  scheme: [['Levels named', 1], ['A fitting example', 1]],
}));
Q('s_india_internal', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How does India try to meet internal security challenges, according to its security strategy? Give two ways.',
  model: '1. It tries to deal with internal conflicts through **democratic** means: negotiation with groups that have grievances and giving them a voice.\n2. It uses **constitutional** arrangements such as protecting minority rights and sharing power with regions, while keeping law and order.',
  sol: 'Two ways that use democratic and constitutional means.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s3_india_strategy', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three components of India\'s security strategy.',
  model: '1. **Military capability:** India maintains armed forces and a nuclear deterrent because of past conflicts and its neighbourhood.\n2. **International norms and institutions:** it backs disarmament, a just world order and the UN system.\n3. **Development:** it treats economic growth and the removal of poverty and inequality as a basis of security.\n(Also: meeting internal challenges democratically.)',
  sol: 'Any three of the four components, each with a brief explanation.',
  scheme: [['First component', 1], ['Second component', 1], ['Third component', 1]],
}));
Q('s3_coop_vs_trad', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'An imagined student argues that "military power alone can keep a country secure today". Evaluate this view in three points.',
  model: '1. Military power is still needed against **external attack**, so it is part of security.\n2. But threats such as **epidemics, global warming, poverty and terrorism** cannot be defeated by armies alone.\n3. These need **cooperation** among states, international bodies and citizens, and development at home, so the view is only partly correct.',
  sol: 'A balanced evaluation: what military power can do, what it cannot, and the need for cooperation.',
  scheme: [['Role of military power acknowledged', 1], ['Limits shown with examples', 1], ['Need for cooperation; balanced judgement', 1]],
}));
Q('l_india_strategy', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the four components of India\'s security strategy. Which of these addresses non-traditional threats most directly? Explain.',
  model: '1. **Strengthening military capabilities:** India has faced conflicts with neighbours and lives in a nuclear-armed region; it tested nuclear devices in 1974 and 1998 and follows minimum deterrence.\n2. **Strengthening international norms and institutions:** support for universal disarmament, decolonisation and the UN system.\n3. **Meeting internal security challenges:** handling internal conflicts through democratic, constitutional means.\n4. **Developing the economy:** reducing poverty, inequality and deprivation.\n5. **Non-traditional threats:** economic development speaks most directly to **human security**, because it tackles hunger, disease and want that make people insecure.',
  sol: 'Four components and a reasoned choice of the one closest to non-traditional security.',
  scheme: [['Military capabilities', 1], ['International norms and institutions', 1], ['Internal security challenges', 1], ['Economic development', 1], ['Reasoned link to non-traditional threats', 1]],
}));
Q('l_coop_security', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Non-traditional threats demand cooperative security." Evaluate this statement with examples.',
  model: '1. **Nature of the threats:** global warming, epidemics, terrorism and refugee flows cross borders, so no single state can deal with them.\n2. **Many actors:** cooperation may be bilateral, regional or global and can include international bodies, NGOs and businesses, each bringing resources and knowledge.\n3. **Example:** controlling an epidemic needs shared data, vaccines and health workers across countries.\n4. **Role of force:** force is not ruled out, but is a **last resort**, ideally approved collectively, for example against terrorists.\n5. **Judgement:** the statement is largely valid, though states still keep militaries for traditional threats; the two approaches work side by side.',
  sol: 'Why cooperation is needed, who takes part, an example, the limited role of force, and a balanced conclusion.',
  scheme: [['Cross-border nature of the threats', 1], ['Range of actors and levels', 1], ['A suitable example', 1], ['Force as last resort', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ source-based (Section D pattern)
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';
Q('sb_minister', source({
  t: [1, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source on the imagined defence review of Veloria and answer the questions that follow. ${IMAG}`,
  passage: '**From the defence review of the imagined Republic of Veloria**\n\nOur neighbour has doubled its missile force in five years. We will not match it weapon for weapon, but we will keep enough strength to make any attack too costly to try. We have also agreed with two nearby states that an attack on one will be treated as an attack on all three. At the same time, our officers will continue to tell our neighbour in advance about every large exercise near the border, and we will press for a regional agreement to cap the number of missile launchers.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line shows Veloria relying on deterrence?', model: '"We will keep **enough strength to make any attack too costly** to try."', sol: 'Deterrence = preventing attack by raising its cost.', scheme: [['Correct line identified', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the component of traditional security shown by the agreement with two nearby states.', model: '**Alliance building**: three states agree to treat an attack on one as an attack on all.', sol: 'A mutual-defence pact is an alliance.', scheme: [['Alliance building', 1]] })),
    child('c', short({ t: [1, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two forms of cooperation within traditional security that appear in the last sentence, and explain each.', model: '(1) **Confidence building**: telling the neighbour about exercises in advance so that they are not mistaken for an attack. (2) **Arms control**: seeking a regional cap on missile launchers, which limits weapons without abolishing them.', sol: 'Advance notice = confidence building; a cap = arms control.', scheme: [['Confidence building explained', 1], ['Arms control explained', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why does Veloria choose not to "match it weapon for weapon"? Suggest two reasons.', model: '(1) An **arms race** is very costly and would take money from development. (2) Matching every weapon could make the neighbour feel threatened and **raise tension**, while a smaller, sufficient force still deters.', sol: 'Any two sensible reasons linked to cost or stability.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_relief', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from a relief worker's diary in the imagined border town of Kesmara and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a relief worker, Kesmara camp (imagined)**\n\nMonday. Two thousand more people arrived today from across the river, after fighting reached their villages. Many walked for four days. Another group came from inside this country, from the hill district where floods washed away their homes. We have one doctor for every five thousand people. Children are falling ill with fever and we fear an outbreak. The local market has doubled its prices and some townspeople say the camp should be moved. A team from an international medical charity is expected on Thursday with vaccines.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Who among the new arrivals are refugees, and who are internally displaced persons?', model: 'People from **across the river** fleeing fighting are **refugees**; the flood-hit people from the **hill district** of the same country are **internally displaced persons**.', sol: 'Crossing a border decides the term.', scheme: [['Both groups correctly identified', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify one other new source of threat, besides migration, that appears in the diary.', model: 'A **health epidemic**: children are falling ill and an **outbreak** is feared, with very few doctors.', sol: 'The fever and feared outbreak point to epidemics.', scheme: [['Health epidemic identified', 1]] })),
    child('c', short({ t: [3, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the diary show that migration can create insecurity for both migrants and the host community?', model: 'Migrants face **illness, hunger and lack of doctors** after long journeys. The host town faces **higher prices and pressure on services**, and some residents want the camp moved, so tension grows on both sides.', sol: 'One effect on migrants, one on hosts.', scheme: [['Insecurity of migrants', 1], ['Pressure on the host community', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which idea of security, traditional or human, best explains the work of the relief camp? Give a reason.', model: '**Human security** (in its broad sense): the camp protects **individuals** from hunger, disease and the effects of war and floods, rather than protecting a state\'s territory.', sol: 'Name human security and link it to protecting people from want and disease.', scheme: [['Human security named', 1], ['Reason linked to the source', 1]] }),
    ]),
  ],
}));
Q('sb_whitepaper', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined white paper of Dravidia and answer the questions that follow. ${IMAG}`,
  passage: '**Extract from a national security white paper, imagined Republic of Dravidia**\n\nSecurity is not only about our borders. A citizen who cannot afford medicine, or a family that loses its harvest to drought, is not secure. Our plan therefore rests on four pillars: an army strong enough to deter attack; active work in the United Nations for fair rules on disarmament and trade; patient dialogue with groups at home who feel left out; and steady growth that brings jobs and schools to the poorest districts.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which notion of security does the first two sentences reflect?', model: '**Human security** (non-traditional security): the security of **individual citizens** from want and disease.', sol: 'The focus is on people\'s well-being, not only borders.', scheme: [['Human or non-traditional security', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which pillar of Dravidia\'s plan matches "strengthening international norms and institutions"?', model: '**Active work in the United Nations for fair rules** on disarmament and trade.', sol: 'Working through the UN for rules = norms and institutions.', scheme: [['Correct pillar identified', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Compare Dravidia\'s four pillars with the components of India\'s security strategy.', model: 'They correspond closely: (1) a deterrent army = **strengthening military capability**; (2) UN work = **international norms and institutions**; (3) dialogue at home = **meeting internal challenges democratically**; (4) growth for the poorest = **developing the economy** to remove poverty.', sol: 'Map each pillar to a component.', scheme: [['At least two pillars correctly matched', 1], ['All four matched', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Do you agree that "security is not only about our borders"? Give two reasons.', model: 'Yes, largely. (1) Many threats such as **epidemics, drought and poverty** harm people without any army crossing a border. (2) A country whose citizens are poor and excluded is open to **internal conflict**, so development and inclusion are part of security.', sol: 'Agreement (or qualified agreement) with two reasons.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_debate', source({
  t: [2, 3], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source from an imagined school debate in Pune and answer the questions that follow. ${IMAG}`,
  passage: '**Notes from a Class 12 debate (imagined): "Is the world safer than it was fifty years ago?"**\n\nSpeaker A said the danger of a war between the great powers has fallen and that arms-control treaties have reduced some weapons. Speaker B replied that ordinary people now face dangers that armies cannot stop: groups that attack crowded places, viruses that spread through airports, and storms that are growing stronger as the planet warms. Speaker C argued that both were right, and that the real question is whose security we are talking about.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Speaker A\'s argument is based on which notion of security?', model: '**Traditional** security: wars between states and arms control.', sol: 'Wars between powers and treaties are traditional concerns.', scheme: [['Traditional security', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name any two new sources of threat mentioned by Speaker B.', model: '**Terrorism** (attacks on crowded places) and **health epidemics** (viruses spreading through airports); global warming is also mentioned.', sol: 'Any two of terrorism, epidemics, global warming.', scheme: [['Two correct threats', 1]] })),
    child('c', short({ t: [2, 3], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain what Speaker C means by "whose security we are talking about".', model: 'The answer depends on the **referent** of security. For **states**, the risk of great-power war may be lower; for **individuals**, new threats such as terrorism and disease may have grown. So the traditional view and the human-security view can reach different answers.', sol: 'Contrast the security of states with that of people.', scheme: [['States vs people as the object of security', 1], ['Different conclusions explained', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which speaker\'s view do you find most convincing? Support your choice with one argument and one example.', model: 'Speaker C is most convincing: **both** kinds of threat exist. For example, treaties have limited some weapons between powers, yet a fast-spreading virus can still disrupt the lives of millions, so security must be judged for states **and** people.', sol: 'Any view is acceptable if supported by a sound argument and example.', scheme: [['Reasoned choice', 1], ['Supporting example', 1]] }),
    ]),
  ],
}));
Q('sb_charter', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source on the imagined Saurya Islands health accord and answer the questions that follow. ${IMAG}`,
  passage: '**Joint statement after a regional meeting, imagined Saurya Islands group**\n\nThe five island governments agree to share data on any new infectious disease within 48 hours of detection. A regional laboratory will be funded jointly. Two international medical charities will train nurses in every island. Fishing companies will help carry medicines to remote islands. The governments note that closing ports alone cannot stop a disease that travels with sailors, traders and tourists.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'At which level is the cooperation in this statement taking place?', model: '**Regional** level: five island governments of one region.', sol: 'Neighbouring governments in one region.', scheme: [['Regional', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name two kinds of non-state actors who take part.', model: '**International medical charities** (NGOs) and **fishing companies** (businesses).', sol: 'Charities and companies are non-state actors.', scheme: [['Both named', 1]] })),
    child('c', short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why do the governments say that "closing ports alone cannot stop a disease"?', model: 'Diseases move with **people and goods**: sailors, traders and tourists. Total closure is hard to enforce and harms trade, so **shared data, laboratories and trained staff**, which is cooperation, are needed to control spread.', sol: 'Cross-border spread; need for joint action.', scheme: [['How disease spreads', 1], ['Why cooperation works better', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Show how this accord is an example of cooperative security.', model: 'It deals with a **non-traditional threat** (an epidemic) through **joint action** rather than force, at a **regional** level, and brings in **non-state actors** (charities, companies) along with governments.', sol: 'Name the threat, the method and the actors.', scheme: [['Threat and non-military method', 1], ['Levels and actors', 1]] }),
    ]),
  ],
}));
