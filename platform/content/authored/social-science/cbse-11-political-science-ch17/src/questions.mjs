// CBSE 11 Political Science, ch17 Nationalism: question bank. Every country, group, school, debate, report, letter and
// constitution in a scenario (Veldan, Ostira, Dornel, Kessar, Marenth, the Sorrel and Hallow communities, the Greenfield
// school debate, the Kessar constitution and every person named) is imagined and written by SOYL. No NCERT text, boxed
// source, cartoon, quotation of any thinker, speech, court judgment or board/sample-paper item is reused (D-036). No real
// separatist, secessionist or autonomy movement, region or country is named.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: nations and nationalism
Q('m_nation_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In political theory, a nation is best described as',
  opts: ['a large group of people who see themselves as one community with a shared identity and who wish to govern themselves', 'any group of people who happen to live inside the same borders', 'a group of people who all belong to a single race', 'the government and the officials of a country'],
  sol: 'A nation is a large group who regard themselves as a community with a shared identity and a wish to govern themselves. Living inside borders does not make people a nation, race is not the test, and a government is only one institution of a state.',
}));
Q('m_nation_not', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The people of the imagined country of Veldan speak three languages and follow four faiths, yet most of them feel that they belong to one Veldanese nation with a common homeland. What does this show?',
  opts: ['A nation need not be a single language group or a single religious community', 'Veldan cannot be a nation because it has several languages', 'A nation must always share one faith', 'Nations are formed only by people of one race'],
  sol: 'Veldan shows that a nation can contain several languages and faiths, so it is not the same as a language group, a religion or a race. The other statements wrongly treat language, faith or race as a necessary condition.',
}));
Q('m_imagined_who', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The description of a nation as an imagined community is associated with',
  opts: ['Benedict Anderson', 'T. H. Marshall', 'Isaiah Berlin', 'John Rawls'],
  sol: 'The phrase imagined community is associated with Benedict Anderson. Marshall is linked with the theory of citizenship rights, Berlin with the idea of two kinds of liberty and Rawls with the theory of justice.',
}));
Q('m_imagined_why', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Why is a nation sometimes called an imagined community?',
  opts: ['Because members never meet most of the other members, yet they feel that they belong together', 'Because nations exist only in stories and have no real effect', 'Because the members of a nation all know each other personally', 'Because nations are invented by their governments overnight'],
  sol: 'The phrase points out that in a large nation people cannot know most of their fellow members, but they still feel part of one community. It does not mean that nations are unreal, nor that members know one another, nor that governments invent them overnight.',
}));
Q('m_elements', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which list gives elements through which a nation is commonly described?',
  opts: ['Shared beliefs, history, territory, shared political ideals and a common political identity', 'Shared surname, shared occupation and shared income', 'A single race, a single language and a single religion in every case', 'An army, a currency and a flag only'],
  sol: 'Shared beliefs, history, territory, political ideals and a common political identity are the usual elements. A shared surname or income is not one, and a single race, language or religion is not required in every nation. An army or a flag may be symbols of a state but do not by themselves make a nation.',
}));
Q('m_territory_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Corlen traders live scattered across five different countries. They share a language and many customs, but they have no land that they all regard as a common homeland. Which element of a nation do they lack most clearly?',
  opts: ['A shared territory or homeland', 'A shared language', 'A shared set of customs', 'A shared occupation'],
  sol: 'The traders have a language and customs in common, but no territory that they regard as a homeland, which is one of the usual elements of a nation. The other options are things they do have.',
}));
Q('m_unify', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In the nineteenth century, nationalism helped to bring together several smaller states into new unified states in',
  opts: ['Germany and Italy, completed about 1870 and 1871', 'Britain and Spain, completed about 1500', 'Egypt and Persia, completed about 1900', 'Brazil and Chile, completed about 1920'],
  sol: 'The unification of Germany and Italy, completed about 1870 and 1871, is the standard example from nineteenth-century Europe. The other pairs and dates are not examples of unification through nationalism in this period.',
}));
Q('m_empires', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which large empires broke up after the First World War, in a period when nationalism was a strong force?',
  opts: ['The Austro-Hungarian and Ottoman empires', 'The Roman and Mongol empires', 'The Mughal and Maurya empires', 'The British and French empires, completely, by 1919'],
  sol: 'The Austro-Hungarian and Ottoman empires broke up after the war of 1914 to 1918. The Roman, Mongol, Mughal and Maurya empires belong to much earlier times, and the British and French empires did not end in 1919.',
}));
Q('m_anticolonial', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined colony of Kelvar, ruled for a century by a distant foreign power, people of many faiths begin a movement saying that they are one nation and must govern themselves. Which historical development does this movement resemble?',
  opts: ['An anti-colonial movement of the kind found in Asia and Africa, such as India\'s freedom struggle', 'The unification of states in nineteenth-century Europe', 'The break-up of the Austro-Hungarian empire', 'A movement to extend the rule of a colonial power'],
  sol: 'A people under foreign rule who demand self-government as a nation resemble the anti-colonial movements of Asia and Africa, including India\'s freedom struggle. Unification joined existing states, the Austro-Hungarian break-up was the end of an empire in Europe, and the movement does not seek to extend foreign rule.',
}));
Q('m_conflict_neutral', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Two students in the imagined Greenfield school debate nationalism. Tessa says it has only ever brought freedom. Imre says it has only ever brought war. Which comment is the most accurate?',
  opts: ['Nationalism has helped to unify states and to win freedom, and it has also been linked with conflict and wars', 'Tessa is correct, because nationalism has never been linked with conflict', 'Imre is correct, because nationalism has never helped any people', 'Nationalism has had no effect on history'],
  sol: 'History shows both sides: nationalism helped to unify states and to power freedom struggles, and it has also been linked with conflicts and wars. A claim that it has only one effect ignores the other, and it has certainly affected history.',
}));
Q('m_selfdet_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'National self-determination is the claim of a nation to',
  opts: ['govern itself and have its own state', 'conquer its neighbours', 'be governed by a foreign power', 'abolish all borders'],
  sol: 'National self-determination is the claim of a nation to govern itself and to have its own state. It is not a claim to conquest, to rule by a foreign power or to abolish borders.',
}));
Q('m_selfdet_after', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'After the First World War the idea of national self-determination became important mainly because it',
  opts: ['was used to argue that each national group should have its own state, an idea sometimes put as one culture, one state', 'was meant to remove all minorities from every state', 'ended the need for any state', 'was written into the laws of every country at once'],
  sol: 'After the war, people argued that each national group should have its own state, an idea often summed up as one culture, one state. It did not remove minorities or the need for states, and it was not adopted at once as law by every country.',
}));
Q('m_selfdet_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined country of Ostira, the Hallow people, who regard themselves as a distinct nation, ask for a state of their own in which they alone make the laws. Their demand is an example of',
  opts: ['a claim to national self-determination', 'a claim to naturalisation', 'a claim to universal adult franchise', 'a claim to judicial review'],
  sol: 'A national group that asks to govern itself and to have its own state is making a claim to national self-determination. Naturalisation concerns foreigners, franchise is the right to vote and judicial review is the power of courts to examine laws.',
}));
Q('m_minorities_problem', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Why is it not practical to give every national group its own state?',
  opts: ['Almost every state contains minorities, so new states would still contain minorities, and ever smaller states are neither practical nor peaceful', 'Because no group is ever large enough to form a state', 'Because every state already has just one kind of people', 'Because states cannot change their borders by any means'],
  sol: 'Peoples are mixed, so almost every state has minorities, and new states would soon have minorities of their own. Ever smaller states are not practical or peaceful. It is not true that all states have one kind of people or that no border can ever change.',
}));
Q('m_smaller', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The imagined country of Dornel is divided into two new states to satisfy two groups. Each new state still has a sizeable group of people who belong to the other community. What does this show about the aim of one culture, one state?',
  opts: ['Dividing states again and again may still leave minorities in every new state, so it cannot settle the matter', 'It is easy to achieve, because the groups can always be separated completely', 'Minorities disappear once a state is divided', 'A new state never contains more than one group'],
  sol: 'The new states each still contain a minority, which shows that division does not remove diversity and could be repeated without end. Groups cannot always be separated completely, minorities do not vanish, and new states may contain several groups.',
}));
Q('m_race_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A pamphlet in the imagined country of Dornel says that only people of one ancestry may call themselves Dornelian. Which idea does this contradict?',
  opts: ['A nation is not the same as a race, and many nations include people of different backgrounds', 'A nation has a homeland', 'A nation has a shared history', 'A nation may wish to govern itself'],
  sol: 'The pamphlet treats nation and ancestry as one, but a nation is not the same as a race and may include people of many backgrounds. The other statements are accepted features of a nation, so the pamphlet does not contradict them.',
}));
Q('m_political_ideals_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Citizens of the imagined country of Marenth belong to many faiths and speak several languages, but they hold common political ideals such as equal rights and a government chosen by all. Which element of a nation does this describe?',
  opts: ['Shared political ideals, which help to give a common political identity', 'A shared race', 'A shared religion', 'A shared surname'],
  sol: 'Common ideals such as equal rights and an elected government are the shared political ideals that give people a common political identity. They are shown to hold even where faith and language differ, so race, religion and surnames are not the source of the unity here.',
}));
Q('m_ostira_belief', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Villagers in the imagined country of Ostira who live far from one another all celebrate the same harvest festival and tell the same stories about a founding hero. Which statement about their unity is most accurate?',
  opts: ['Shared belief and a shared history help them to feel part of one community even though they never meet', 'Festivals cannot create any feeling of community', 'Only the army can unite people who live far apart', 'Stories about the past have no connection with nations'],
  sol: 'Shared beliefs and a shared history are elements that help members of a large community to feel that they belong together without meeting, which is the point of calling it imagined. Festivals and stories do help, so the denials are wrong, and an army is not the only means of unity.',
}));

// ---------------------------------------------------------------- t02: nationalism and pluralism
Q('m_accommodate', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'One way in which a democratic state can accommodate diversity is by',
  opts: ['recognising and protecting the identities of minorities, for example through constitutional rights', 'requiring every citizen to give up his or her language', 'refusing to recognise any group', 'removing all minority institutions'],
  sol: 'A democratic state can accommodate diversity by recognising and protecting minority identities, such as through constitutional rights. Forcing people to give up a language, refusing recognition or removing institutions do the opposite.',
}));
Q('m_group_rights', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A law of the imagined country of Marenth lets the small Daravi community hold its own festivals and teach its own songs in its schools, while every Marenthi also has equal rights before the law. The first part of the law is best called',
  opts: ['a group right, protecting the culture of a community', 'an individual right to vote', 'a duty to pay taxes', 'a right of governments to control culture'],
  sol: 'Protecting the festivals and songs of a community as a community is a group right, and it sits beside the individual right of equal treatment. Voting is a different individual right, paying taxes is a duty and the law does not give governments control over culture.',
}));
Q('m_lang_reorg', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In India, the reorganisation of states mainly along linguistic lines was carried out in',
  opts: ['1956', '1850', '1935', '2005'],
  sol: 'The States Reorganisation Act of 1956 reorganised states mainly on linguistic lines. The other years do not mark this reorganisation.',
}));
Q('m_art29', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'Article 29 of the Constitution of India protects',
  opts: ['the right of any section of citizens with a distinct language, script or culture to conserve it', 'the right to move freely throughout the country', 'the right to vote at eighteen', 'the power of the President to dissolve the Lok Sabha'],
  sol: 'Article 29 protects the interests of minorities by allowing a section of citizens with a distinct language, script or culture to conserve it. Free movement, the voting age and the President\'s powers are provided elsewhere.',
}));
Q('m_art30', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'Article 30 of the Constitution of India gives religious and linguistic minorities the right to',
  opts: ['establish and administer educational institutions of their choice', 'form a separate army', 'issue their own currency', 'make laws for the whole country'],
  sol: 'Article 30 gives minorities, whether religious or linguistic, the right to set up and run educational institutions of their choice. It does not give any group an army, a currency or the power to legislate for the country.',
}));
Q('m_art_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Parents belonging to a linguistic minority in an imagined town in India open a primary school that teaches in their own language. Which constitutional provision does this activity most closely relate to?',
  opts: ['Article 30, on educational institutions of minorities', 'Article 19, on freedom of speech', 'Article 14, on equality before the law', 'Article 368, on amendment of the Constitution'],
  sol: 'Setting up a school that conserves a minority language relates to Article 30, which gives minorities the right to establish and administer educational institutions, and to Article 29 on conserving language and culture. The other Articles deal with different matters.',
}));
Q('m_pluralism_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Pluralism is the idea that',
  opts: ['a nation can include many cultures and identities, and unity need not mean uniformity', 'every citizen must follow one culture', 'only the majority has a culture', 'a nation can have no identity at all'],
  sol: 'Pluralism holds that many cultures and identities can exist within one nation and that unity does not require sameness. It is the opposite of insisting on one culture, and it does not deny that a nation can have an identity.',
}));
Q('m_unity_uniformity', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'What is the difference between unity and uniformity?',
  opts: ['Unity is people feeling bound together, while uniformity is everyone being the same in culture or language', 'They are the same thing', 'Unity needs one language, while uniformity needs several', 'Unity means no laws, while uniformity means many laws'],
  sol: 'Unity is a bond among people, which can exist even when they differ, while uniformity means that everyone is made the same. They are not the same, and neither is defined by the number of languages or laws.',
}));
Q('m_uniform_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'The government of the imagined country of Veldan orders that every school must teach in the Veldanic language only and that minority festivals must not be held in public. Which view of nationhood does this order reflect, and what criticism might be made?',
  opts: ['A view that unity requires one culture; critics say it ignores the identities and rights of minorities', 'A pluralist view; critics say it gives minorities too much', 'A view that nations do not exist; critics say it is too weak', 'A view that all states should be abolished; critics say it is too short'],
  sol: 'An order that allows one language and one set of customs reflects the view that unity needs uniformity, and critics argue it ignores the identities and rights of minorities. It is not pluralist, since it denies difference, and it does not claim that nations or states do not exist.',
}));
Q('m_group_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined constitution of Kessar says that every community may run its own schools and festivals, and that every individual also has equal rights before the law. This combines',
  opts: ['group rights alongside individual rights', 'group rights with the abolition of individual rights', 'individual rights without any group recognition', 'neither group rights nor individual rights'],
  sol: 'Allowing communities to keep their schools and festivals protects group rights, and equal rights before the law protects individuals, so the two are combined. The other options describe constitutions that drop one side or both.',
}));
Q('m_tagore', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Rabindranath Tagore\'s criticism of narrow nationalism held that',
  opts: ['patriotism should not be placed above humanity', 'nationalism is the highest value, above everything else', 'the freedom struggle was a mistake', 'nations should have no culture'],
  sol: 'Tagore valued the freedom struggle but held that love of one\'s country should not override concern for humanity. He did not rank the nation above all else, he did not call the freedom struggle a mistake and he did not say that nations should have no culture.',
}));
Q('m_tagore_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'At the imagined Greenfield school debate, Rohan says that love of the country means welcoming only people who think like him and ignoring the suffering of others abroad. Which reply fits Tagore\'s criticism of narrow nationalism?',
  opts: ['Love of one\'s country is compatible with concern for humanity, and should not make us blind to the suffering of others', 'Rohan is right, since nothing outside the country matters', 'Rohan should abandon his country altogether', 'Tagore believed that debate is wrong'],
  sol: 'Tagore\'s criticism was that narrow nationalism puts the nation above humanity, so the fitting reply is that patriotism should go along with concern for others. Saying nothing outside the country matters repeats the narrow view, and Tagore did not ask people to abandon their country or oppose debate.',
}));
Q('m_views_unity', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'At an imagined meeting in Ostira, one speaker says that strong national unity needs a shared culture. Another says that unity is best built by respecting diversity. Which response is the most balanced?',
  opts: ['Both are positions in a real debate, and each should be judged with reasons and evidence', 'Only the first speaker deserves a hearing', 'Only the second speaker deserves a hearing', 'The matter is settled by law everywhere'],
  sol: 'Both claims are held by thoughtful people, so a balanced response weighs the reasons for each. It does not silence either speaker, and no law everywhere settles the question.',
}));
Q('m_lang_reorg_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A student in the imagined Greenfield school says that organising states on linguistic lines in 1956 showed that India chose to recognise the diversity of its languages rather than impose one language on everyone. Which is the best reading of this remark?',
  opts: ['It illustrates how a democratic state can accommodate diversity by recognising language groups within the nation', 'It shows that India had no diversity', 'It shows that all states must have the same language', 'It shows that the Constitution forbids the use of any language'],
  sol: 'The remark treats linguistic reorganisation as a way of accommodating diversity inside one nation. The reorganisation did not mean there was no diversity, and it neither required one language for all states nor forbade languages.',
}));
Q('m_unity_in_diversity', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The minister of imagined Marenth says: our three language communities each take part in the council, run their own evening classes and still celebrate one national day together. Which view of unity does the minister hold?',
  opts: ['The pluralist view: a nation can be strong when its communities feel that they have a fair place in it', 'The view that a nation is strong only if all citizens use one language', 'The view that no community should ever be mentioned in the law', 'The view that minorities must be removed for unity'],
  sol: 'Giving each community a fair place while keeping a common national day is the pluralist view, which builds unity by respecting diversity. The other options require sameness, silence about communities or removal.',
}));

// ================================================================ assertion-reason
Q('ar_not_race', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A nation is not the same as a race or a religion.',
  r: 'Many nations include people of different languages, faiths and backgrounds who still see themselves as one community.',
  sol: 'Both are true, and R explains A: since many nations contain people of different languages and faiths who feel part of one community, nation cannot be identical with race or religion.',
}));
Q('ar_imagined', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A nation is sometimes described as an imagined community.',
  r: 'Its members never meet most of the other members, yet they feel that they belong together.',
  sol: 'Both are true, and R explains A: the description rests on the fact that people feel part of a community of strangers whom they never meet.',
}));
Q('ar_europe_empires', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Nationalism helped to unify Germany and Italy about 1870 and 1871.',
  r: 'The Austro-Hungarian and Ottoman empires broke up after the First World War.',
  sol: 'Both statements are true, but R does not explain A: the break-up of the empires came decades later and does not give the reason for the earlier unifications.',
}));
Q('ar_selfdet_all', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Giving every national group its own state is not a practical or peaceful solution.',
  r: 'Every state in the world contains people of one culture only.',
  sol: 'A is true because almost every state has minorities and ever smaller states are neither practical nor peaceful. R is false: almost every state has more than one community, which is why A holds.',
}));
Q('ar_pluralism', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'In a pluralist nation, unity need not mean uniformity.',
  r: 'A nation can include many cultures and identities while its citizens still feel bound together.',
  sol: 'Both are true, and R explains A: when many identities can live in one nation with a common bond, sameness is not required for unity.',
}));
Q('ar_tagore', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Rabindranath Tagore rejected the freedom struggle.',
  r: 'He valued the freedom struggle but held that patriotism should not override humanity.',
  sol: 'A is false: Tagore valued the freedom struggle. R is true and states his actual position, so it contradicts A.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_not_race', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A nation is always the same thing as a race or a language group.',
  sol: 'A nation need not be a race or a language group. Many nations include people of several languages and faiths.',
}));
Q('tf_unity', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'Supporters of pluralism hold that a nation can be united without all its citizens being the same in language, religion or customs.',
  sol: 'This is the pluralist claim: unity need not mean uniformity.',
}));
Q('tf_selfdet', tf({
  t: 1, d: 3, c: 'application', ans: false,
  stem: 'A radio host in the imagined country of Dornel says that if Dornel is split into one state for each of its seven communities, no community will ever be a minority anywhere again.',
  sol: 'The claim is false. Peoples live mixed together, so each new state would still contain minorities, and ever smaller states are not practical or peaceful.',
}));
Q('tf_tagore', tf({
  t: 2, d: 3, c: 'recall', ans: false,
  stem: 'Tagore argued that love of country should always be placed above concern for humanity.',
  sol: 'Tagore held the opposite: patriotism should not override humanity.',
}));
Q('fb_selfdet', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The claim of a nation to govern itself and have its own state is called national ___-determination.',
  acc: [['self']],
  sol: 'The claim is called national self-determination.',
}));
Q('fb_pluralism', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The idea that a nation can include many cultures and that unity need not mean uniformity is called ___.',
  acc: [['pluralism']],
  sol: 'This idea is called pluralism.',
}));
Q('fb_anderson', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The phrase imagined community is associated with Benedict ___.',
  acc: [['Anderson']],
  sol: 'The phrase is associated with Benedict Anderson.',
}));
Q('mt_articles', match({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each provision or measure with what it does in India.',
  pairs: [
    ['Article 29', 'Lets a section of citizens with a distinct language, script or culture conserve it'],
    ['Article 30', 'Lets religious and linguistic minorities set up and run educational institutions of their choice'],
    ['Reorganisation of states, 1956', 'Redrew state boundaries mainly on linguistic lines'],
    ['Pluralism', 'Holds that a nation can include many cultures and identities'],
  ],
  sol: 'Article 29 conserves language, script or culture, Article 30 concerns minority educational institutions, the reorganisation of 1956 was mainly linguistic and pluralism is the idea that many identities can belong to one nation.',
}));
Q('mt_elements', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each element of a nation with the imagined example from the country of Veldan.',
  pairs: [
    ['Shared beliefs', 'Veldanese of every faith revere the same river as a symbol of their land'],
    ['Shared history', 'Veldanese recall a common struggle to end foreign rule'],
    ['Territory', 'Veldanese regard the mountains and plains within their borders as their homeland'],
    ['Shared political ideals', 'Veldanese value an elected government and equal rights'],
  ],
  sol: 'Reverence for a symbol is shared belief, recalling a common struggle is shared history, regarding a land as home is territory and valuing elected government and equal rights are shared political ideals.',
}));
Q('ord_timeline', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these developments in the history of nationalism in their order of time.',
  items: [
    'Germany and Italy are unified, about 1870 and 1871',
    'The First World War is fought, from 1914 to 1918',
    'The idea of one culture, one state gains force after the war, about 1919',
    'India becomes independent, in 1947',
  ],
  sol: 'The unification of Germany and Italy came first, then the First World War, then the post-war arguments about self-determination around 1919, and then India\'s independence in 1947.',
}));
Q('ord_ostira_steps', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in a sensible order for how the imagined country of Ostira might respond peacefully to a demand from the Hallow people for recognition.',
  items: [
    'Hear the representatives of the Hallow people and record their claims',
    'Study which rights and institutions the community actually lacks',
    'Draft constitutional protections for language, culture and schools',
    'Review in public, after some years, whether the protections work',
  ],
  sol: 'The state first hears the community, then studies what it lacks, then drafts protections, and later reviews whether the protections are working.',
}));

// ================================================================ short answers (2 marks)
Q('s_nation_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by a nation? Name one element of a nation.',
  model: 'A **nation** is a large group of people who see themselves as one **community** with a shared identity and who wish to govern themselves. Its elements include shared **beliefs**, **history**, **territory** and political ideals.',
  sol: 'Definition and an element.',
  scheme: [['A large group who see themselves as one community with a shared identity and a wish to govern themselves', 1], ['One element named', 1]],
}));
Q('s_imagined', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who is associated with the description of a nation as an imagined community, and what does the description mean?',
  model: 'The description is associated with **Benedict Anderson**. It means that members of a nation never meet most of the other members, yet they feel that they **belong together** as one community.',
  sol: 'Name and meaning.',
  scheme: [['Benedict Anderson named', 1], ['Members never meet most others yet feel they belong together', 1]],
}));
Q('s_not_race', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined country of Veldan has citizens of three languages and four faiths. Why does this show that a nation is not the same as a language group or a religion?',
  model: 'Veldan\'s citizens differ in **language** and **faith**, yet many feel that they belong to one **nation** with a common homeland and shared ideals. So a nation can include several languages and religions.',
  sol: 'Diversity and shared belonging.',
  scheme: [['Citizens differ in language and faith', 1], ['Yet they form one nation with a common homeland or ideals', 1]],
}));
Q('s_unify_history', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two ways in which nationalism has shaped history in Europe in the nineteenth and early twentieth centuries.',
  model: 'In the nineteenth century nationalism helped to **unify** Germany and Italy, about 1870 and 1871. After the **First World War** it contributed to the break-up of the Austro-Hungarian and Ottoman empires.',
  sol: 'Two developments.',
  scheme: [['Unification of Germany and Italy about 1870 and 1871', 1], ['Break-up of the Austro-Hungarian and Ottoman empires after the First World War', 1]],
}));
Q('s_anticolonial', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did nationalism influence peoples under foreign rule in Asia and Africa?',
  model: 'Nationalism inspired **anti-colonial movements**. Peoples under foreign rule came to see themselves as nations entitled to govern themselves, and they demanded **freedom**, as in India\'s freedom struggle.',
  sol: 'Anti-colonial movements and freedom.',
  scheme: [['Inspired anti-colonial movements', 1], ['Demand for self-rule and freedom, as in India', 1]],
}));
Q('s_selfdet', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is national self-determination, and after which event did it become especially important?',
  model: '**National self-determination** is the claim of a nation to govern itself and to have its own **state**. It became especially important after the **First World War**, when the idea of one culture, one state gained force.',
  sol: 'Meaning and event.',
  scheme: [['Claim of a nation to govern itself and have its own state', 1], ['After the First World War', 1]],
}));
Q('s_minorities', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does the presence of minorities make it hard to give each national group a separate state?',
  model: 'Peoples live **mixed together**, so almost every state has **minorities**. A new state for one group would leave other groups as minorities in it, and the process could go on without end.',
  sol: 'Minorities remain in every state.',
  scheme: [['Almost every state has minorities', 1], ['New states would still contain minorities, so the process has no end', 1]],
}));
Q('s_pluralism', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is pluralism? Explain the difference between unity and uniformity.',
  model: '**Pluralism** holds that many cultures and identities can live together in a single nation. **Unity** is a bond between people, while **uniformity** is sameness; pluralists say a nation can be united without being uniform.',
  sol: 'Pluralism and the difference.',
  scheme: [['Pluralism: many cultures and identities in one nation', 1], ['Unity need not mean uniformity', 1]],
}));
Q('s_art29_30', short({
  t: 2, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'State in your own words what Article 29 and Article 30 of the Constitution of India provide for minorities.',
  model: '**Article 29** protects the right of citizens who have a distinct language, script or culture to **conserve** it. **Article 30** gives religious and linguistic minorities the right to start and **manage schools and colleges** of their choice.',
  sol: 'Articles 29 and 30.',
  scheme: [['Article 29: conserve a distinct language, script or culture', 1], ['Article 30: minorities set up and run educational institutions', 1]],
}));
Q('s_tagore', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'In what way did Rabindranath Tagore criticise narrow nationalism?',
  model: 'Tagore valued the **freedom struggle**, but he held that **patriotism** should not override **humanity**. A nationalism that puts the nation above everything else and shuts out others was, in his view, too narrow.',
  sol: 'Patriotism and humanity.',
  scheme: [['He valued the freedom struggle', 1], ['Patriotism should not override humanity', 1]],
}));
Q('s_linguistic', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the linguistic reorganisation of states in 1956 reflect the accommodation of diversity?',
  model: 'In **1956**, state boundaries in India were redrawn mainly along **linguistic lines**. This recognised language groups within one nation, so that diversity was accommodated and unity was not made to mean one language.',
  sol: 'Language groups recognised.',
  scheme: [['States reorganised mainly on linguistic lines in 1956', 1], ['Recognised language groups within one nation; unity without one language', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_elements', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain any three elements through which a nation is commonly described, with an imagined example from Veldan for each.',
  model: '**Shared beliefs**: Veldanese of every faith revere one river as a symbol of the land. **Shared history**: they recall a common struggle to end foreign rule. **Territory**: they regard the plains and mountains within their borders as a homeland. Shared **political ideals** and a common political identity also matter.',
  sol: 'Three elements with examples.',
  scheme: [['First element with an example', 1], ['Second element with an example', 1], ['Third element with an example', 1]],
}));
Q('s3_history', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three ways in which nationalism has shaped modern history, stating the consequences neutrally.',
  model: 'Nationalism helped to **unify** states, as in Germany and Italy about 1870 and 1871. It contributed to the **break-up of empires** after the First World War and powered **anti-colonial movements** in Asia and Africa. It has also been linked with **conflict** and wars.',
  sol: 'Unification, break-up, anti-colonial movements and conflict.',
  scheme: [['Unification of states, with the example', 1], ['Break-up of empires or anti-colonial movements', 1], ['Also linked with conflict and wars, stated factually', 1]],
}));
Q('s3_selfdet_problem', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why national self-determination raises problems, using the imagined country of Dornel as an example.',
  model: 'Almost every state contains **minorities**. If Dornel is divided to give each group a state, each new state may still contain minorities, so the process may continue. **Ever smaller states** are neither practical nor peaceful, so other means of protecting minorities are needed.',
  sol: 'Minorities and endless division.',
  scheme: [['Almost every state has minorities', 1], ['Division may leave minorities in every new state', 1], ['Ever smaller states are impractical; other protections needed', 1]],
}));
Q('s3_accommodate', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three ways in which a democratic state can accommodate diversity.',
  model: 'It can **recognise and protect** the identities of minorities. It can write **constitutional rights** for language, faith and culture into its constitution. It can guarantee **group rights** beside individual rights, as India did through the **linguistic reorganisation** of states in 1956 and Articles 29 and 30.',
  sol: 'Recognition, constitutional rights, group rights.',
  scheme: [['Recognition and protection of minority identities', 1], ['Constitutional rights for linguistic, religious and cultural groups', 1], ['Group rights alongside individual rights, with an Indian example', 1]],
}));
Q('s3_two_views', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present the two views on whether national unity needs a shared culture, without taking a side.',
  model: 'Some argue that strong **national unity** needs a shared culture, because common language and customs make people feel they belong together. Others argue that unity is best built by **respecting diversity**, since people feel loyal when they have a fair place. The student should weigh the reasons.',
  sol: 'Both views with reasons.',
  scheme: [['View that unity needs shared culture, with a reason', 1], ['View that unity is built by respecting diversity, with a reason', 1], ['Both weighed without taking a side', 1]],
}));
Q('s3_tagore', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Explain, using an imagined example, why Tagore thought that patriotism should not override humanity.',
  model: 'Tagore valued the **freedom struggle** but feared a **narrow nationalism** that treats the nation as supreme. For example, if imagined Veldan ignored a famine in a neighbouring land only because its people are foreign, it would put the nation above **humanity**. Patriotism should go with concern for all.',
  sol: 'His view, an example and the point.',
  scheme: [['Tagore valued the freedom struggle but criticised narrow nationalism', 1], ['A suitable imagined example', 1], ['Patriotism should go with concern for humanity', 1]],
}));
Q('s3_group_rights', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'What are group rights? Why do some argue that they are needed alongside individual rights?',
  model: '**Group rights** protect the language, religion or culture of a community. Some argue that they are needed because a small community may lose its **identity** if only individual rights exist, and the majority\'s culture may dominate. So group rights work **alongside** individual rights.',
  sol: 'Meaning, reason and link to individual rights.',
  scheme: [['Group rights protect a community\'s language, religion or culture', 1], ['Reason: a small community might lose its identity or be dominated', 1], ['Work alongside individual rights', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_nation', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain what a nation is, how it differs from a race, a language group or a religion, and why it is called an imagined community.',
  model: '1. A **nation** is a large group of people who see themselves as one community with a shared identity and who wish to govern themselves.\n2. Its elements include shared **beliefs**, **history**, **territory**, shared political ideals and a common political identity.\n3. A nation differs from a **race**, a **language group** and a **religion**, since one nation can contain several languages and faiths.\n4. It is called an **imagined community**, an idea associated with Benedict Anderson.\n5. Members never meet most other members, yet they feel they belong together.',
  sol: 'Definition, elements, distinction, imagined community.',
  scheme: [['Definition of a nation', 1], ['Elements named', 1], ['Not the same as race, language group or religion', 1], ['Imagined community, with Anderson named', 1], ['Reason: members never meet most others yet feel they belong together', 1]],
}));
Q('l_history', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the part played by nationalism in history, giving examples from Europe, from the break-up of empires and from Asia and Africa, and say how it has been linked with conflict.',
  model: '1. In the nineteenth century nationalism helped to **unify** states; Germany and Italy were unified about 1870 and 1871.\n2. After the **First World War** it contributed to the break-up of the Austro-Hungarian and Ottoman empires.\n3. In **Asia and Africa** it powered anti-colonial movements.\n4. India\'s **freedom struggle** is one such movement.\n5. Nationalism has also been linked with **conflict** and wars, so it has had both unifying and divisive effects.',
  sol: 'Unification, break-up, anti-colonial movements, conflict.',
  scheme: [['Unification of Germany and Italy about 1870 and 1871', 1], ['Break-up of the Austro-Hungarian and Ottoman empires', 1], ['Anti-colonial movements in Asia and Africa', 1], ['India\'s freedom struggle as an example', 1], ['Linked also with conflict and wars, stated factually', 1]],
}));
Q('l_selfdet', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain national self-determination and discuss why it is difficult to apply, using an imagined country as an example.',
  model: '1. **Self-determination** means that a nation claims the right to rule itself and to possess its own state.\n2. It gained importance after the **First World War**, summed up as one culture, one state.\n3. In imagined Ostira the Hallow people may ask for a state of their own.\n4. But almost every state has **minorities**, so new states would still contain minorities.\n5. **Ever smaller states** are neither practical nor peaceful, so democratic protection of minorities is needed.',
  sol: 'Meaning, history, example, minorities, alternative.',
  scheme: [['Meaning of self-determination', 1], ['Importance after the First World War, one culture, one state', 1], ['An imagined example', 1], ['Almost every state has minorities', 1], ['Smaller states impractical; protections needed', 1]],
}));
Q('l_accommodate', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how a democratic state can accommodate diversity, with examples from India.',
  model: '1. A democratic state can accommodate diversity by **recognising and protecting** the identities of minorities.\n2. It can write **constitutional rights** for language, faith and culture into its constitution.\n3. It can combine **group rights** with individual rights.\n4. In India, state boundaries were redrawn mainly on **linguistic lines** in 1956.\n5. **Article 29** protects the culture and language of minorities and **Article 30** their educational institutions.',
  sol: 'Recognition, constitutional rights, group rights, Indian examples.',
  scheme: [['Recognising and protecting minority identities', 1], ['Constitutional rights for linguistic, religious and cultural groups', 1], ['Group rights alongside individual rights', 1], ['Linguistic reorganisation of states, 1956', 1], ['Articles 29 and 30', 1]],
}));
Q('l_pluralism_views', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain pluralism and discuss the two views on whether national unity needs a shared culture.',
  model: '1. **Pluralism** holds that many cultures and identities can live together in one nation.\n2. It adds that **unity** need not mean **uniformity**.\n3. Some argue that strong national unity needs a **shared culture**, since common language and customs bind people.\n4. Others argue that unity is best built by **respecting diversity**, since people are loyal when they have a fair place.\n5. A student should weigh both views and give reasons for a judgement.',
  sol: 'Pluralism, unity versus uniformity, both views, judgement.',
  scheme: [['Pluralism defined', 1], ['Unity need not mean uniformity', 1], ['View that unity needs a shared culture', 1], ['View that unity is built by respecting diversity', 1], ['Reasoned judgement', 1]],
}));
Q('l_tagore', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain Rabindranath Tagore\'s criticism of narrow nationalism and say how it relates to pluralism.',
  model: '1. Tagore valued the **freedom struggle** and the wish of a people to be free.\n2. He held that **patriotism** should not override **humanity**.\n3. A **narrow nationalism** that puts the nation above all else may shut out other peoples.\n4. It may also overlook minorities inside the nation.\n5. His view fits **pluralism**: a nation can respect many cultures and keep concern for all human beings.',
  sol: 'His view, the danger of narrow nationalism, link to pluralism.',
  scheme: [['Tagore valued the freedom struggle', 1], ['Patriotism should not override humanity', 1], ['Danger of narrow nationalism for other peoples', 1], ['Danger for minorities inside the nation', 1], ['Link to pluralism', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_debate', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the extract and answer the questions that follow. *(An imagined school debate written by SOYL for practice; the Greenfield school, the countries and the students are not real.)*',
  passage: '**From the Greenfield school debate on the motion "Every nation should have its own state", imagined**\n\nTessa: In the old empires, peoples were ruled by outsiders. Nations should govern themselves.\nImre: Look at Dornel. Every town there has more than one community. If we redraw the borders to match each community, new minorities appear in every new state.\nLeena: Then perhaps the answer is to protect every community inside the existing state.\nTessa: That depends on whether the state keeps its promises.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which claim of a nation does Tessa\'s first remark refer to?', model: '**National self-determination**: the claim of a nation to govern itself.', sol: 'Self-determination.', scheme: [['National self-determination', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which difficulty with self-determination does Imre point out?', model: 'That almost every state has **minorities**, so new states would still contain minorities.', sol: 'Minorities remain.', scheme: [['Minorities remain in every state', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why Leena\'s suggestion may be more practical than creating ever smaller states.', model: 'Protecting every community inside the existing state, through **rights** for language and culture, avoids the **endless division** that leaves minorities in every new state. It is more practical and more likely to be **peaceful**.', sol: 'Protection within the state.', scheme: [['Protection through rights avoids endless division', 1], ['More practical and peaceful', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why does Tessa say that Leena\'s suggestion depends on whether the state keeps its promises?', model: 'Protections such as **constitutional rights** help only if the state **honours** them in practice. If it does not, minorities may still feel excluded, so the **promises** must be kept for the suggestion to work.', sol: 'Promises must be kept.', scheme: [['Rights help only if honoured', 1], ['Otherwise minorities may feel excluded', 1]] }),
    ]),
  ],
}));
Q('c_report', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the report and answer the questions that follow. *(An imagined newspaper report written by SOYL for practice; Ostira, the Hallow people and everyone named are not real.)*',
  passage: '**From the Ostira Gazette, imagined**\n\nIn the hill districts of Ostira, the Hallow community has asked the national assembly for recognition of its language in schools and courts. Some speakers in the capital say that the Hallow are a separate nation and should have their own state. Others point out that Hallow families live in many towns across Ostira, and that many non-Hallow families live in the hill districts. A committee member said that the assembly should examine what protections the community needs.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the claim made by those who say that the Hallow should have their own state.', model: 'The claim of **national self-determination**.', sol: 'Self-determination.', scheme: [['National self-determination', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'What fact in the report suggests that a separate state would not end the problem of minorities?', model: 'Hallow families live in **many towns** and non-Hallow families live in the hill districts, so **minorities** would remain.', sol: 'Mixed populations.', scheme: [['Mixed populations would leave minorities in any new state', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): State one protection that the assembly might consider for the Hallow community, and one reason for it.', model: 'The assembly might recognise the Hallow **language** in schools and courts. This protects the community\'s **identity** within the existing state, so it may feel that it has a fair place.', sol: 'A protection and a reason.', scheme: [['A suitable protection such as language recognition', 1], ['A reason linked to identity and a fair place', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one argument for and one argument against the view that the Hallow should have their own state.', model: 'For: a community that sees itself as a nation may wish to **govern itself**. Against: **minorities** would remain in any new state, and ever smaller states are not practical or peaceful.', sol: 'Both sides.', scheme: [['An argument for, linked to self-rule', 1], ['An argument against, linked to minorities or practicality', 1]] }),
    ]),
  ],
}));
Q('c_kessar', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined constitution written by SOYL for practice; Kessar and its clauses are not real.)*',
  passage: '**Minority clauses of the imagined Constitution of Kessar**\n\n| Clause | What it provides |\n|---|---|\n| 1 | Every citizen has equal rights before the law |\n| 2 | Any community may keep its language and script and teach it |\n| 3 | Any religious or language minority may set up and run its own schools |\n| 4 | Public offices are open to every citizen without regard to community |',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which clause protects the rights of individuals as citizens?', model: '**Clause 1** (and also Clause 4).', sol: 'Equal rights before the law.', scheme: [['Clause 1', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which clause is closest to Article 30 of the Constitution of India?', model: '**Clause 3**.', sol: 'Minority schools.', scheme: [['Clause 3', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the clauses show group rights alongside individual rights.', model: 'Clauses 2 and 3 protect **communities**, their language and schools, which are **group rights**. Clauses 1 and 4 give equal rights and open offices to every **individual**. Together they accommodate diversity.', sol: 'Group and individual rights.', scheme: [['Clauses 2 and 3 as group rights', 1], ['Clauses 1 and 4 as individual rights', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might clause 2 help national unity rather than weaken it?', model: 'When communities may keep their **language** and script, they feel that the nation gives them a fair place. This can build **loyalty** to the nation, which fits the view that unity is built by respecting **diversity**.', sol: 'Respect for diversity builds loyalty.', scheme: [['Communities feel they have a fair place', 1], ['Respect for diversity can build loyalty and unity', 1]] }),
    ]),
  ],
}));
Q('c_classroom', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the extract and answer the questions that follow. *(An imagined classroom discussion written by SOYL for practice; the class and the students are not real.)*',
  passage: '**From a classroom discussion on nationalism, imagined**\n\nMira: Our country should unite behind one culture. Then nobody would feel divided.\nKofi: But our country has many languages and festivals. If we make everyone the same, some will feel pushed out.\nMira: Patriotism means putting the nation first, always.\nKofi: Tagore valued the freedom struggle but said that patriotism should not override humanity. Perhaps we can love our country and still respect everyone.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which view of national unity does Mira express?', model: 'That unity needs a **shared culture**, or uniformity.', sol: 'Unity through shared culture.', scheme: [['Unity needs a shared culture', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name the idea that Kofi\'s first reply supports.', model: '**Pluralism**.', sol: 'Respect for many identities.', scheme: [['Pluralism', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): How does Kofi use Tagore\'s view to answer Mira?', model: 'Kofi notes that Tagore valued the **freedom struggle** but held that **patriotism** should not override **humanity**. So one can love the country without putting it above respect for all people.', sol: 'Patriotism and humanity.', scheme: [['Tagore valued the freedom struggle', 1], ['Patriotism should not override humanity, so respect for all is compatible with love of country', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason for Mira\'s view and one reason for Kofi\'s view on unity.', model: 'Mira: a **shared culture** may give people common customs that bind them. Kofi: if everyone must be the same, some may feel **excluded**, while respect for diversity can build loyalty.', sol: 'A reason for each.', scheme: [['A reason for Mira\'s view', 1], ['A reason for Kofi\'s view', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Marenth, the Daravi school and the writer are not real.)*',
  passage: '**Imagined letter to the Marenth Herald**\n\nI teach at a small school in Marenth where the children speak three home languages. When the education board allowed each language community to run its own evening classes alongside the common curriculum, I feared that the country would split. Instead, the children now take pride in both their own language and in Marenth. Some of my colleagues still think a single language would unite us better. I wonder how a country should reason about this.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which idea does the writer\'s experience support?', model: '**Pluralism**: unity need not mean uniformity.', sol: 'Pluralism.', scheme: [['Pluralism', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name the view held by the writer\'s colleagues.', model: 'That a **single language** would unite the country better, that is, unity needs a shared culture.', sol: 'Shared culture view.', scheme: [['Unity needs one language or shared culture', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): State the argument of the writer and of the colleagues without taking a side.', model: 'The writer argues that allowing **each language community** its classes has built pride in both language and country. The colleagues argue that a **single language** would unite people better. Both should be tested with evidence.', sol: 'Both arguments.', scheme: [['The writer: respect for languages built pride and unity', 1], ['The colleagues: one language would unite better', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one piece of evidence that could help decide between the two views.', model: 'One could compare **surveys** of how safe and included children feel in schools with and without such classes, and how far they **feel loyalty** to the country. Such evidence would help to judge the views.', sol: 'A suitable piece of evidence.', scheme: [['A suitable piece of evidence such as a survey of inclusion or loyalty', 1], ['How it bears on the two views', 1]] }),
    ]),
  ],
}));
