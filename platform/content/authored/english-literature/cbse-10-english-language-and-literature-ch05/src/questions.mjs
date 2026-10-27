// CBSE 10 English Language and Literature, ch05 "Nelson Mandela: Long Walk to Freedom" — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the extract appears
// here. Passages are SOYL commentary about an episode or idea (passage_origin: soyl-commentary); stems refer
// to events and ideas in SOYL's own words. Students read the extract itself in their textbook, First Flight.
// Topics: t01 context and summary · t02 themes and message · t03 exam practice (long answers, extrapolation).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the chapter, not an extract from it. Read the chapter itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the chapter (event, idea or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the chapter', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the chapter, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the chapter', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_ceremony', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Mandela opens this part of his autobiography by looking outward, at the guests rather than at himself. Leaders and dignitaries from more than 140 countries have travelled to Pretoria, and their presence tells South Africans that the nation once kept at arm\'s length by the world is now welcomed by it. The ceremony follows a careful order: the two deputy presidents take their oaths first, and only then does Mandela take his. In his address he looks back on the apartheid years as a catastrophe now behind the country and forward to a nation built on justice and dignity for all. A personal triumph is deliberately turned into a shared one.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where was the inauguration held?', opts: ['at the Union Buildings in Pretoria', 'in a sports stadium in Johannesburg', 'in the parliament building in Cape Town', 'in the prison yard on Robben Island'], sol: 'The ceremony took place in the amphitheatre of the Union Buildings in Pretoria.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'Mandela was sworn in as President on 10 ___ 1994.', acc: [['May']], sol: 'The inauguration was on 10 **May** 1994.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Who took their oaths before Mandela did?', opts: ['Mr de Klerk and Thabo Mbeki, as deputy presidents', 'the chiefs of the army and the police', 'Oliver Tambo and Walter Sisulu', 'the leaders of the foreign delegations'], sol: 'Mr de Klerk was sworn in as second deputy president and Thabo Mbeki as first deputy president before Mandela took the presidential oath.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean when it says a personal triumph is *turned into a shared one*?', model: 'Mandela presents the day as a victory for all South Africans and for justice, not as his own success.', sol: 'He speaks of the victory as belonging to the whole nation and to the ideals of justice and dignity.', scheme: [['Victory presented as the nation\'s, not his own', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'According to the commentary, why is the presence of so many foreign leaders important?', opts: ['It shows that the world now accepts and honours the new South Africa.', 'It shows that foreign countries chose the new President.', 'It shows that South Africa needed foreign soldiers for protection.', 'It shows that the ceremony was held outside South Africa.'], sol: 'A country once kept at arm\'s length is now welcomed by the world; the guests\' presence signals that acceptance.' })),
  ],
  sol: 'Parts (a)–(c) are facts from the chapter; parts (d) and (e) are answered from the commentary\'s interpretation.',
}));
Q('src_display', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Two moments in the ceremony carry special weight. The first is military. Jets, helicopters and troop carriers pass over the Union Buildings, and the heads of the defence force and police salute the new President and promise to serve him. Mandela reminds the reader that, not many years earlier, these same officers would have arrested him. The display is not a show of force; it is the armed forces accepting a government that every citizen had a vote in choosing. The second moment is musical. Each community sings the anthem that used to belong to the other. The singing may be uncertain, but the gesture says more than any speech could.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What did the flypast of jets and helicopters show, according to the commentary?', opts: ['the loyalty of the armed forces to a freely elected government', 'a threat to the countries that had sent guests', 'the army\'s plan to take over the government', 'a celebration of the country\'s victory in a war'], sol: 'The commentary calls it the armed forces accepting a government every citizen helped to choose: loyalty to democracy, not a show of force.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which anthem did the black South Africans sing at the ceremony?', opts: ['*Die Stem*', '*Nkosi Sikelel\' iAfrika*', '*God Save the King*', '*Jana Gana Mana*'], sol: 'Black South Africans sang *Die Stem*, the old anthem of the Republic, while white South Africans sang *Nkosi Sikelel\' iAfrika*.' })),
    child('c', fb({ t: 1, d: 2, c: 'understanding', stem: 'The generals who saluted Mandela would, some years earlier, have ___ him.', acc: [['arrested']], sol: 'Not many years before, the same officers would have **arrested** him.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the exchange of anthems *says more than any speech could*?', model: 'Singing the other community\'s anthem is an act of respect and unity that people perform, not just hear about.', sol: 'An action shared by both communities proves reconciliation better than words.', scheme: [['The shared action shows respect and unity more powerfully than words', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does Mandela mention that the generals would once have arrested him?', opts: ['to show how completely the country had changed', 'to warn the generals that he would punish them', 'to complain that the army had been unfair to him', 'to explain why he refused their salute'], sol: 'The contrast between past and present measures how far South Africa had travelled.' })),
  ],
  sol: 'Separate what the commentary interprets (a, d) from facts in the chapter (b, c) and from the effect of a contrast (e).',
}));
Q('src_history', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The ceremony makes most sense when it is placed against the history Mandela recalls. Racial domination in South Africa was older than Mandela himself. It was built by the country\'s white communities in the early twentieth century, soon after the Anglo-Boer War, and it lasted for most of that century. By the time it was overturned, Mandela was in his seventies. This is why he refuses to treat the day as his own achievement. It was paid for by thousands of men and women who suffered and died, and it saddens him that those who paid the highest price are not there to share it.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'When was the system of racial domination first built, according to the chapter?', opts: ['in the first decade of the twentieth century', 'in the 1990s, just before the inauguration', 'in the eighteenth century', 'during Mandela\'s years in prison'], sol: 'It was set up early in the twentieth century, a few years after the Anglo-Boer War and before Mandela was born.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The system was set up soon after the Anglo-___ War.', acc: [['Boer']], sol: 'It came after the Anglo-**Boer** War.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why does Mandela refuse to treat the day as his own achievement?', opts: ['It was made possible by the sacrifices of thousands of people.', 'He did not want to become President.', 'The foreign guests had organised it.', 'He believed the day was a failure.'], sol: 'He credits the thousands who suffered and died for freedom.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What saddens Mandela on this day, as the commentary describes it?', model: 'Many of those who suffered and died for freedom are not alive to share the day they made possible.', sol: 'His sorrow is for those who paid the highest price and are absent from the celebration.', scheme: [['Those who sacrificed most are not there to share it', 1]] })),
    child('e', mcq({ t: 1, d: 3, c: 'analysis', stem: 'What point does the commentary make by noting that racial domination was *older than Mandela himself*?', opts: ['The injustice had lasted so long that its end was a historic event.', 'Mandela was too old to be President.', 'Mandela had helped to create the system.', 'The system was harmless because it was old.'], sol: 'An injustice that outlasted a lifetime makes its overthrow all the more momentous.' })),
  ],
  sol: 'For history questions, link the length of the injustice to the importance of the day.',
}));
Q('src_courage', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Mandela makes a surprising claim: the long years of oppression did not only damage South Africa; they also produced its finest people. He names leaders of the struggle such as Oliver Tambo, Walter Sisulu, Chief Luthuli, Yusuf Dadoo, Bram Fischer and Robert Sobukwe, and treats people of their quality as the country\'s true strength. From comrades like these he learnt that fear and courage can exist side by side: what makes a person brave is what they do while afraid. This is a hopeful lesson for ordinary readers, because it means courage is a choice open to anyone.',
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'recall', stem: 'Which of these people does Mandela name as a hero of the struggle?', opts: ['Walter Sisulu', 'Abraham Lincoln', 'Winston Churchill', 'Napoleon Bonaparte'], sol: 'Walter Sisulu is among the comrades Mandela names; the others are not mentioned in the chapter.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, what does courage mean for Mandela?', opts: ['acting rightly in spite of fear', 'never feeling any fear', 'avoiding all danger', 'fighting with weapons'], sol: 'Fear may still be present; bravery lies in what a person does while afraid.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Mandela claims that the years of oppression also produced the country\'s finest ___.', acc: [['people', 'men and women', 'leaders']], sol: 'Oppression produced remarkable **people**, leaders of great courage.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary call this a *hopeful lesson for ordinary readers*?', model: 'If brave people also feel fear, then anyone who controls fear can be brave; courage becomes a choice, not a rare gift.', sol: 'Courage is open to everyone, because feeling fear does not rule it out.', scheme: [['Courage is a choice open to anyone who masters fear', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What is surprising about Mandela\'s claim regarding the years of oppression?', opts: ['He finds something positive in them: they produced people of rare courage.', 'He says the oppression was justified.', 'He says nobody resisted the oppression.', 'He says the oppression ended before he was born.'], sol: 'Instead of seeing only damage, he points to the courageous people the struggle created.' })),
  ],
  sol: 'Distinguish the names (a fact) from the commentary\'s interpretation of courage (b, d, e).',
}));
Q('src_love', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'One of the most hopeful ideas in the extract concerns hatred. Mandela argues that hatred is not inborn: a baby has no opinion about skin colour or faith, so prejudice has to be taught. If it can be learnt, it can be unlearnt, and people can be taught to love instead, which he believes suits human nature better. His evidence comes from his own life. In prison, at the darkest moments, a guard would sometimes show a small act of decency, and that was enough to keep his belief in human goodness alive. For a man who suffered so much under the system, this refusal to hate is remarkable.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to Mandela, how does a person come to hate others because of their colour?', opts: ['The hatred is learnt from others.', 'People are born with it.', 'It is caused by poverty alone.', 'It comes from reading books.'], sol: 'Nobody is born hating; hatred is taught and learnt.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did Mandela see signs of goodness in the people who opposed him?', opts: ['in some of his prison guards', 'in the foreign leaders at the ceremony', 'in the newspapers of the time', 'in his school teachers'], sol: 'In prison, the occasional decency of a guard kept his faith in human goodness alive.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Mandela believes that people can be taught to ___, because it comes more naturally to them than hatred.', acc: [['love']], sol: 'People can be taught to **love**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call Mandela\'s refusal to hate *remarkable*?', model: 'He suffered greatly at the hands of the system, yet he still believed in the goodness of his opponents.', sol: 'Given his long suffering, choosing not to hate shows great generosity of spirit.', scheme: [['Great suffering, yet no hatred', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which situation best illustrates Mandela\'s idea that hatred is learnt?', opts: ['A child repeats insults about another community that she has heard at home.', 'A baby cries when it is hungry.', 'A student forgets the date of an exam.', 'A boy is afraid of thunder.'], sol: 'The child has picked up prejudice from adults; she was not born with it.' })),
  ],
  sol: 'Part (e) applies the idea to a new situation; the rest are answered from the commentary.',
}));
Q('src_duties', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Mandela describes every person as carrying two kinds of duty: one to the family that raised and depends on them, and one to the wider community and nation. Under a just government, he suggests, nobody would have to choose between the two. In apartheid South Africa, a Black man who tried to serve his people was treated as a criminal and separated from his home. Mandela did not begin by choosing his people over his family; the system forced that choice on him. The result was painful. The more he gave to the struggle, the less he could be present for his parents, his wife or his children.',
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'recall', stem: 'What are the two duties every person has, according to Mandela?', opts: ['to the family and to the community and country', 'to the government and to the army', 'to the school and to the workplace', 'to friends and to strangers'], sol: 'One duty is to family (parents, partner, children); the other is to people, community and country.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why was it nearly impossible for Mandela to fulfil both duties?', opts: ['Apartheid treated a Black man who served his people as a criminal.', 'His family did not want him to work.', 'He lived too far from his community.', 'He was too busy with his law studies.'], sol: 'Serving his people made him an outlaw in the eyes of the state, so he was separated from his family.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Under a just government, the commentary says, nobody would have to ___ between the two duties.', acc: [['choose', 'decide']], sol: 'Nobody would have to **choose** between family and nation.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Did Mandela *choose* to neglect his family? Answer in one sentence, using the commentary.', model: 'No; the system forced the choice on him, because serving his people meant being cut off from his home.', sol: 'The commentary stresses that the choice was imposed by apartheid, not freely made.', scheme: [['No: apartheid forced the choice', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary suggest about the price Mandela paid?', opts: ['His service to the nation cost him his family life.', 'He lost his law degree.', 'He gave up his wealth to the government.', 'He had to leave South Africa forever.'], sol: 'The more he gave to the struggle, the less he could be present for those closest to him.' })),
  ],
  sol: 'The key idea: in an unjust society the two duties clash; in a fair one they need not.',
}));
Q('src_freedom', source({
  t: [2, 1], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Mandela shows that his idea of freedom grew in stages. As a boy in the countryside he felt entirely free, provided he respected his father and the customs of his community. As a student he wanted freedoms for himself alone, such as choosing how to spend his time. As a young man in Johannesburg he wanted the ordinary rights of an adult: a career, an income and a family life without interference. Only later did he see that his people were no freer than he was, and a private longing grew into a cause. He ends with a striking point: even those who hold power over others are not truly free.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'As a boy, on what condition did Mandela feel free?', opts: ['as long as he obeyed his father and followed the customs of his community', 'as long as he stayed in school', 'as long as he lived in the city', 'as long as he worked for the government'], sol: 'His boyhood freedom held as long as he respected his father and tribal customs.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What turned Mandela\'s private longing for freedom into a cause?', opts: ['realising that his people were not free either', 'losing his job in Johannesburg', 'being elected President', 'reading about other countries'], sol: 'Seeing that his people were also unfree made his personal wish a struggle for all.' })),
    child('c', fb({ t: 2, d: 3, c: 'analysis', stem: 'Mandela argues that the oppressor, too, needs to be ___, because hatred and prejudice limit him as well.', acc: [['freed', 'liberated', 'set free']], sol: 'The oppressor must also be **freed** (liberated).' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does Mandela say that those who hold power over others are not truly free?', model: 'Someone who denies others their freedom is ruled by hatred and prejudice, so he cannot live as a full, free human being.', sol: 'Oppression damages both sides: the oppressor is ruled by his own hatred.', scheme: [['The oppressor is ruled by hatred / prejudice', 1]] })),
    child('e', mcq({ t: 1, d: 3, c: 'analysis', stem: 'In Johannesburg, what kind of freedom did the young Mandela want?', opts: ['the freedom to live an ordinary, honourable adult life', 'the freedom to become rich and famous', 'the freedom to leave South Africa', 'the freedom to avoid all responsibility'], sol: 'He wanted the basic rights of an adult: to work, earn and have a family without interference.' })),
  ],
  sol: 'Track the stages: boyhood → student → young man → the cause of his people → freedom for the oppressor too.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_anthems', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'Two anthems were sung at the inauguration. What was unusual about the way they were sung, and what did it signify? Answer in 40–50 words.',
  model: 'White South Africans sang *Nkosi Sikelel\' iAfrika* and black South Africans sang *Die Stem*, the old anthem of the Republic. Each community sang the song that had belonged to the other. This exchange signified mutual respect, reconciliation and the beginning of one united nation.',
  sol: 'The fact (each group sang the other\'s anthem) + what it signified (respect, unity, a new shared nation).',
}));
Q('sa_generals', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why does Mandela draw attention to the salute he received from the generals? Answer in 40–50 words.',
  model: 'Mandela notes that the generals who saluted him and pledged loyalty would once have arrested him. The salute showed that the armed forces now served a democratic government, not a racial minority. The contrast measures how completely South Africa had changed in a few years.',
  sol: 'The fact (the same officers would have arrested him) + the meaning (loyalty to democracy) + the effect (shows the scale of change).',
}));
Q('sa_guests', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why was the presence of leaders from so many countries significant for South Africa? Answer in 40–50 words.',
  model: 'For decades South Africa had been isolated because of apartheid. Leaders from more than 140 countries attending the inauguration showed that the world now accepted the new democratic nation. It was also a shared victory for justice and human dignity, which the guests had come to celebrate.',
  sol: 'Past isolation + the guests as a sign of acceptance + a common victory for justice.',
}));
Q('sa_lasting_harm', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Mandela believes the harm done by apartheid would take a long time to undo, yet he also finds something of value in those years. Explain both points. Answer in 40–50 words.',
  model: 'Apartheid hurt the nation so deeply that recovery might take generations. Yet the long oppression also produced people of remarkable bravery and character, such as Tambo, Sisulu and Luthuli. Mandela sees such people as the country\'s real strength, so even dark years left something precious behind.',
  sol: 'The lasting damage + the unexpected gain (courageous leaders) + why he values it.',
}));
Q('sa_courage', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What did Mandela learn about courage, and from whom did he learn it? Answer in 40–50 words.',
  model: 'Mandela learnt courage from his comrades in the struggle, who risked everything for freedom. He saw that brave people are not free of fear. They felt afraid, yet they kept going. For Mandela, being brave means controlling fear, and his comrades taught him this by example.',
  sol: 'Source (comrades in the struggle) + the lesson (bravery means mastering fear, not feeling none).',
}));
Q('sa_duties', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What two obligations does Mandela say every person has, and why could a Black man in South Africa not fulfil both? Answer in 40–50 words.',
  model: 'Every person owes a duty to his own family and a duty to his people and nation. Under apartheid, a Black man who served his people was treated as an outlaw, so serving the nation meant losing his place at home and the chance to care for his family.',
  sol: 'The two obligations + why apartheid made them clash.',
}));
Q('sa_join_struggle', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'What led Mandela to give his life to the freedom struggle? Answer in 40–50 words.',
  model: 'At first Mandela wanted freedom only for himself: to study, work and raise a family without hindrance. Then he realised that all his people were equally unfree. His personal wish became a desire for their freedom, which led him to join the African National Congress.',
  sol: 'Personal freedom first → realisation that his people were not free → commitment to the struggle (the ANC).',
}));
Q('sa_love_taught', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Why does Mandela believe that people can be taught to love, and what experience supports his belief? Answer in 40–50 words.',
  model: 'Mandela argues that hatred is learnt, since nobody is born hating others for their colour. What is learnt can be replaced, and love suits human nature better. In prison, small acts of decency by some guards convinced him that goodness survives even in hard hearts.',
  sol: 'Argument (hate is learnt, love is natural) + evidence (decent guards in prison).',
}));
Q('sa_oppressor', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Mandela claims that the oppressor is as much in need of liberation as the oppressed. Do you agree? Answer in 40–50 words.',
  model: 'I agree. A person who denies others their freedom is ruled by hatred and prejudice, and cannot see people as equals. He lives in fear and suspicion and becomes less than fully human. Freeing the oppressed therefore frees the oppressor too, because both regain their dignity.',
  sol: 'A clear stand + reasons (hatred and prejudice confine the oppressor; both lose humanity) + a conclusion. A reasoned partial disagreement can also earn full marks.',
}));
Q('sa_symbol', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'Name three things the inauguration ceremony stood for in the history of South Africa. Answer in 40–50 words.',
  model: 'First, it marked the end of apartheid and the birth of a democracy chosen by all citizens. Second, it showed reconciliation, as the generals saluted and each community sang the other\'s anthem. Third, it signalled that the world now welcomed South Africa back.',
  sol: 'Any three well-explained points: end of apartheid / democracy; reconciliation and unity; international acceptance; a victory for justice and dignity.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 1], d: 4, c: 'evaluation',
  stem: 'Is *Long Walk to Freedom* a suitable title for Mandela\'s story? Give your view in 40–50 words.',
  model: 'Yes. Freedom came after a struggle lasting most of the century and most of Mandela\'s own life, including decades in prison. His idea of freedom also grew slowly, from boyhood freedom to freedom for all. A walk suggests steady, patient effort, which fits his journey well.',
  sol: 'A stand + the length of the struggle + the gradual growth of his idea of freedom + why *walk* fits.',
}));
Q('sa_grief', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'On the day of his triumph Mandela also feels sorrow. What is the cause of his sorrow? Answer in 40–50 words.',
  model: 'Mandela remembers the thousands of men and women who suffered and died so that South Africa could be free. It pains him that the people who paid the highest price are absent from the celebration they made possible. So his joy is mixed with grief and gratitude.',
  sol: 'Whom he remembers + why he feels sorrow (they are absent from the day they made possible).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_when_where', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'When and where did Mandela become President of South Africa? Answer in 30–40 words.',
  model: 'Mandela was sworn in on 10 May 1994 in the amphitheatre of the Union Buildings in Pretoria. He became the first Black President of South Africa, heading the first government elected by citizens of all races.',
  sol: 'Date (10 May 1994) + place (Union Buildings, Pretoria) + significance (first Black President).',
}));
Q('sb_deputies', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who were sworn in as deputy presidents at the ceremony, and in what order? Answer in 30–40 words.',
  model: 'Mr de Klerk was sworn in first, as second deputy president. Thabo Mbeki was sworn in next, as first deputy president. Only after them did Mandela take the oath as President.',
  sol: 'De Klerk (second deputy) first, then Mbeki (first deputy), then Mandela.',
}));
Q('sb_apartheid', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'What was apartheid? Answer in 30–40 words.',
  model: 'Apartheid was South Africa\'s system of racial segregation and discrimination, which kept power in white hands. Black and other non-white people were denied equal rights, separated by law and treated as inferior in daily life.',
  sol: 'Definition (racial segregation and discrimination by law) + its effect (white rule; non-white people denied rights).',
}));
Q('sb_ideals', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'In his inaugural address, what did Mandela promise to free South Africans from? Answer in 30–40 words.',
  model: 'Mandela promised to work to end the poverty and hardship many South Africans lived in, and every kind of discrimination, including discrimination against women. His aim was a just society where every citizen lives with dignity.',
  sol: 'What he promised to end (poverty, hardship, discrimination of every kind, including against women) + the aim.',
}));
Q('sb_guards', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'How did some prison guards help Mandela keep his faith in human goodness? Answer in 30–40 words.',
  model: 'Even in the hardest times in prison, an occasional guard showed a little kindness or humanity. These small moments convinced Mandela that goodness survives even in people who serve an unjust system, and they kept him going.',
  sol: 'What the guards did (small acts of decency) + its effect on Mandela.',
}));
Q('sb_monk', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'Mandela was a man who loved life and family, yet he spent decades away from both. What does this tell you about him? Answer in 30–40 words.',
  model: 'It shows that his commitment to his people was stronger than his wish for comfort. He accepted great personal loss, including prison and separation from his family, because he believed freedom for all mattered more.',
  sol: 'An inference about his character (commitment, sacrifice) + the evidence (decades of separation and hardship).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_character', long({
  ...LA, t: [3, 2], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Nelson Mandela as he appears in this chapter, supporting each quality with evidence. Answer in 100–120 words.',
  model: 'Mandela emerges as a humble leader. On the greatest day of his life he credits the thousands who suffered and died for freedom, not himself. He is forgiving: he refuses to hate his opponents and believes that even his prison guards had goodness in them. He is courageous in his own definition, mastering fear rather than never feeling it. He is self-sacrificing, accepting separation from his family to serve his people. He is also wise and far-sighted, seeing that the oppressor must be freed along with the oppressed. Finally, he is a unifier, welcoming the anthems of both communities and a government for all. His greatness lies in his generosity of spirit.',
  sol: 'Four or five qualities, each with evidence in your own words: humble (credits others), forgiving (no hatred; the guards), courageous (mastering fear), self-sacrificing (duty to people over family), wise (freeing the oppressor), unifying (anthems). End with an overall judgement.',
}));
Q('la_freedom', long({
  ...LA, t: [2, 3], d: 4, c: 'analysis',
  stem: 'Trace how Mandela\'s understanding of freedom changed over his life, as described in the chapter. Answer in 100–120 words.',
  model: 'As a boy, Mandela believed he was completely free, as long as he obeyed his father and the customs of his community. As a student, he wanted personal freedoms, such as deciding how to spend his own time. As a young man in Johannesburg, he wanted the basic rights of an adult: to work, earn a living and raise a family without obstruction. Then he realised that his people were no freer than he was, and his personal longing became a longing for the freedom of all. This is what made him join the African National Congress. Finally, he understood that freedom must be shared by all: the oppressor, ruled by hatred, must be freed as well.',
  sol: 'The stages in order: boyhood → student → young man in Johannesburg → his people\'s freedom (ANC) → freedom for the oppressor too. Each stage explained in your own words; conclude with his final understanding.',
}));
Q('la_courage', long({
  ...LA, t: [2, 3], d: 4, c: 'application',
  stem: 'Mandela learnt that brave people are not those who feel no fear. How does this idea apply to the life of a student today? Answer in 100–120 words.',
  model: 'Mandela saw that his comrades felt fear like anyone else but refused to let it control them; their courage lay in mastering it. This idea is useful to students. Before a board exam, nervousness is natural, but a brave student prepares steadily instead of avoiding study. A student who sees a classmate being bullied may feel afraid to speak up, yet courage means speaking up anyway. Even standing on stage for a debate takes the same kind of bravery. Fear is not a weakness; giving in to it is. If we accept that courage is a choice, not a gift, then every student can be brave. Mandela\'s lesson makes courage ordinary and possible for everyone.',
  sol: 'State Mandela\'s idea and where it comes from (his comrades) + two or three real student situations (exams, bullying, stage fright) + a conclusion linking back to the chapter.',
}));
Q('la_duties', long({
  ...LA, t: [2, 3], d: 4, c: 'evaluation',
  stem: 'Mandela says every person has an obligation to family and an obligation to the nation. Was he right to put his people before his family? Give your view in 100–120 words.',
  model: 'I believe Mandela was right, though the choice was painful. He explains that in a fair society a person can serve both family and nation, but apartheid made that impossible for a Black man. Serving his people meant arrest, punishment and isolation from his home. Had he chosen only his family, millions, including his own children, would have remained unfree. So his sacrifice served his family too, in the long run. Still, the cost was real: his parents, wife and children lost his presence for decades. The fault lies with the unjust system that forced the choice, not with Mandela. His decision shows rare courage and selflessness.',
  sol: 'A clear stand + the chapter\'s idea of two obligations + why apartheid made them clash + the cost to his family + a conclusion. A reasoned opposite view (family should come first) can also earn full marks.',
}));
Q('la_diary', long({
  ...LA, t: [3, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are a young South African who attended the inauguration on 10 May 1994. Write a diary entry describing the day and what it meant to you, in 100–120 words.',
  model: '10 May 1994, night\n\nI can hardly believe what I saw today in Pretoria. Leaders from all over the world had come for our new President. When Mr de Klerk and Thabo Mbeki were sworn in, and then Nelson Mandela, the crowd went silent and then exploded with joy. Jets and helicopters flew over the Union Buildings, and the generals saluted the man they once hunted. Most moving of all, white people tried to sing our anthem and we sang theirs. My grandfather wept. He said he never thought he would vote, let alone see this. Tonight I feel free, but also responsible. This country belongs to all of us now.',
  sol: 'Diary format (date, first person, past tense, feelings). Content must fit the chapter: the guests, the oaths in order, the flypast, the generals\' salute, the anthems. Personal reflection consistent with the historic meaning of the day.',
}));
Q('la_letter', long({
  ...LA, t: [3, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Write a letter to a friend explaining why Mandela believed that hatred is learnt and love can be taught, and how this idea could help in your school or neighbourhood. Answer in 100–120 words.',
  model: 'Dear Aarav,\n\nThis week we read Nelson Mandela\'s autobiography, and one idea has stayed with me. Mandela says prejudice is not something we are born with. Hatred is picked up from others, so it can also be replaced by love, which comes more naturally to people. He saw proof in prison, where even some guards showed small acts of kindness. I think this applies to our school. When juniors tease a new student for her accent, they are repeating what they have heard. If seniors set a better example, that habit can change. Let us start with our own class.\n\nYour friend,\nMeera',
  sol: 'Informal letter format. Content: Mandela\'s idea (hatred learnt, love natural) + his evidence (guards) + application to a real school or neighbourhood situation + a suggestion. Tone personal and sincere.',
}));
Q('la_inauguration', long({
  ...LA, t: [2, 1], d: 3, c: 'analysis',
  stem: 'How did the inauguration ceremony reflect the change from apartheid to democracy in South Africa? Answer in 100–120 words.',
  model: 'The inauguration on 10 May 1994 showed the change in every detail. For decades, a white minority had ruled through apartheid, and South Africa had been isolated. Now leaders from more than 140 countries came to Pretoria to honour a Black President chosen by all citizens. The oaths of a former white President as deputy and of Mandela as President showed a peaceful transfer of power. Jets and troop carriers flew past, and the generals who might once have arrested Mandela saluted him, showing the army\'s loyalty to democracy. Finally, each community sang the other\'s anthem. The ceremony turned a long history of division into a public promise of unity and equality.',
  sol: 'Contrast past and present: isolation → world leaders; white minority rule → a President chosen by all; hostile army → loyal generals; division → shared anthems. Conclude with what the ceremony promised.',
}));

// ================================================================ objective items
Q('mc_genre', mcq({ t: 1, d: 1, c: 'recall', stem: 'The chapter *Nelson Mandela: Long Walk to Freedom* is taken from…', opts: ['Mandela\'s autobiography', 'a biography written by a journalist', 'a history textbook', 'a novel based on Mandela\'s life'], sol: 'It is an extract from Mandela\'s autobiography *Long Walk to Freedom*, written in the first person.' }));
Q('mc_first', mcq({ t: 1, d: 1, c: 'recall', stem: 'On 10 May 1994, Mandela became…', opts: ['the first Black President of South Africa', 'the Prime Minister of Britain', 'the second deputy president of South Africa', 'the head of the South African army'], sol: 'He became South Africa\'s first Black President, heading its first democratic government.' }));
Q('mc_dekl', mcq({ t: 1, d: 2, c: 'recall', stem: 'At the inauguration, Mr de Klerk was sworn in as…', opts: ['second deputy president', 'President', 'first deputy president', 'chief of the army'], sol: 'De Klerk became second deputy president; Thabo Mbeki became first deputy president.' }));
Q('mc_countries', mcq({ t: 1, d: 1, c: 'recall', stem: 'Leaders and dignitaries from roughly how many countries attended the inauguration?', opts: ['more than 140', 'about 14', 'exactly 50', 'only 2'], sol: 'Guests came from more than 140 countries.' }));
Q('mc_flypast_meaning', mcq({ t: 2, d: 2, c: 'understanding', stem: 'The display of jets, helicopters and troop carriers was meant to show…', opts: ['the military\'s loyalty to democracy', 'the strength of South Africa\'s enemies', 'a rehearsal for war', 'the wealth of the old government'], sol: 'It demonstrated that the armed forces now supported a government chosen by all citizens.' }));
Q('mc_courage_def', mcq({ t: 2, d: 2, c: 'understanding', stem: 'For Mandela, a brave person is someone who…', opts: ['feels fear but overcomes it', 'never feels any fear', 'avoids every risk', 'fights without thinking'], sol: 'Fear does not rule out bravery; overcoming it is what counts.' }));
Q('mc_hate_learnt', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to Mandela, people who hate others because of their skin colour…', opts: ['have learnt that hatred', 'were born with that hatred', 'cannot ever change', 'are always the oppressed'], sol: 'Hatred is learnt; therefore it can be unlearnt, and love can be taught.' }));
Q('mc_duty_clash', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why could a man of Mandela\'s colour not fulfil both his obligations in apartheid South Africa?', opts: ['Serving his people led to punishment and separation from his family.', 'His family refused to support him.', 'The law required him to live abroad.', 'He was not interested in his family.'], sol: 'The system punished anyone who served his people, tearing him away from home.' }));
Q('mc_anc', mcq({ t: 1, d: 2, c: 'recall', stem: 'Which organisation did Mandela join when his wish for personal freedom became a wish for his people\'s freedom?', opts: ['the African National Congress', 'the South African army', 'the United Nations', 'the Anglo-Boer Council'], sol: 'He joined the African National Congress (ANC).' }));
Q('mc_oppressor', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does Mandela say the oppressor must also be freed?', opts: ['His hatred and prejudice keep him from being fully human and free.', 'The oppressor is usually poor.', 'The oppressor has been put in jail.', 'The oppressor wants to leave the country.'], sol: 'Denying others their freedom leaves the oppressor ruled by hatred; neither side is fully free.' }));
Q('mc_tone', mcq({ t: 1, d: 3, c: 'analysis', stem: 'Which word best describes the tone of the chapter?', opts: ['reflective and dignified', 'comic and light-hearted', 'angry and revengeful', 'fearful and doubtful'], sol: 'Mandela looks back thoughtfully and speaks with dignity; there is no bitterness or revenge.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does the chapter most strongly suggest?', opts: ['Freedom is incomplete unless it is shared by everyone, including former oppressors.', 'Power should stay with those who already hold it.', 'Personal comfort matters more than public duty.', 'Old wrongs should be answered with revenge.'], sol: 'Mandela sees freedom as indivisible: the oppressed and the oppressor must both be freed.' }));
Q('mc_apply_courage', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'Which situation shows courage in Mandela\'s sense?', opts: ['Riya is terrified of speaking on stage but still presents her project to the school.', 'Karan has never been afraid of anything in his life.', 'Sameer avoids the debate so that he will not feel nervous.', 'Neha laughs at a friend who is scared of the dark.'], sol: 'Riya feels fear and acts anyway, which is exactly Mandela\'s definition of courage.' }));
Q('mc_wealth', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'What does Mandela consider to be South Africa\'s greatest strength?', opts: ['its army and air force', 'its mines and factories', 'its people, especially those of courage and character', 'its foreign friends'], sol: 'He values people of courage and character above any material wealth.' }));

Q('fb_date', fb({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Mandela was sworn in as President on 10 May ___ in the city of ___.', acc: [['1994'], ['Pretoria']], sol: 'On 10 May **1994**, in **Pretoria**.', scheme: [['1994', 0.5], ['Pretoria', 0.5]] }));
Q('fb_policy', fb({ t: 1, d: 1, c: 'recall', stem: 'The system of racial segregation that kept power in white hands in South Africa was called ___.', acc: [['apartheid']], sol: 'It was called **apartheid**.' }));
Q('fb_mbeki', fb({ t: 1, d: 2, c: 'recall', stem: 'At the inauguration, Thabo ___ was sworn in as first deputy president.', acc: [['Mbeki']], sol: 'Thabo **Mbeki** became first deputy president.' }));
Q('fb_obligations', fb({ t: 2, d: 2, c: 'understanding', stem: 'Mandela\'s two obligations are to one\'s own ___ and to one\'s people and nation.', acc: [['family']], sol: 'The first obligation is to the **family**: parents, wife and children.' }));

Q('ar_anthems', ar({ t: 1, d: 3, c: 'analysis', a: 'At the inauguration, white South Africans sang *Nkosi Sikelel\' iAfrika*.', r: 'Leaders and dignitaries from more than 140 countries attended the ceremony.', key: 'b', sol: 'Both are true, but the presence of foreign guests does not explain the choice of anthem; the exchange of anthems expressed reconciliation between the communities.' }));
Q('ar_generals', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'The generals of the defence force saluted Mandela at the ceremony.', r: 'Mandela had served as a general in the South African army.', key: 'c', sol: 'A is true. R is false: Mandela was never an army officer; the same generals would once have arrested him.' }));
Q('ar_free_boy', ar({ t: 2, d: 3, c: 'analysis', a: 'Mandela says that as a boy he did not long for freedom.', r: 'As a boy he already felt free, as long as he obeyed his father and his community\'s customs.', key: 'a', sol: 'Both are true, and R explains A: he felt no longing for freedom because he believed he already had it.' }));
Q('ar_love', ar({ t: 2, d: 3, c: 'understanding', a: 'Mandela believes people can never unlearn hatred.', r: 'Mandela saw small acts of humanity in some of his prison guards.', key: 'd', sol: 'A is false: he believes hatred is learnt and can be replaced by love. R is true.' }));

Q('tf_isolated', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: in apartheid South Africa, a Black man who tried to serve his people was rewarded by the government.', ans: false, sol: 'He was treated as a criminal and separated from his home, not rewarded.' }));
Q('tf_mbeki', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Mandela took the oath before both deputy presidents.', ans: false, sol: 'De Klerk and Mbeki were sworn in first; Mandela took the oath after them.' }));
Q('tf_regret', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: Mandela regrets that many who sacrificed for freedom did not live to see it.', ans: true, sol: 'He is saddened that those who paid the highest price are absent from the celebration.' }));
Q('tf_born_hate', tf({ t: 2, d: 1, c: 'recall', stem: 'True or false: Mandela believes some people are born hating others because of their skin colour.', ans: false, sol: 'He believes nobody is born hating; hatred is learnt.' }));

Q('ord_ceremony', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events of the inauguration day in the order in which the chapter presents them.',
  items: ['Mr de Klerk is sworn in as second deputy president.', 'Thabo Mbeki is sworn in as first deputy president.', 'Mandela takes the oath as President.', 'Mandela addresses the gathering.', 'Jets, helicopters and troop carriers fly over the Union Buildings.'],
  sol: 'De Klerk → Mbeki → Mandela\'s oath → his address → the flypast.',
}));
Q('ord_freedom', ord({
  t: [2, 1], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the stages in the growth of Mandela\'s idea of freedom.',
  items: ['A boy who feels free as long as he follows his father and his community.', 'A student who wants freedoms for himself alone.', 'A young man in Johannesburg who wants to work, earn and raise a family.', 'A man who wants freedom for all his people.', 'A leader who sees that the oppressor must be freed too.'],
  sol: 'Boyhood → student → young man → his people → the oppressor as well.',
}));

Q('mt_people', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each person with the role the chapter gives them.',
  pairs: [['Nelson Mandela', 'sworn in as President'], ['Thabo Mbeki', 'first deputy president'], ['Mr de Klerk', 'second deputy president'], ['Oliver Tambo', 'a hero of the freedom struggle']],
  sol: 'Roles as presented in the chapter.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word from the Mandela chapter with its meaning.',
  pairs: [['inauguration', 'a formal ceremony to begin a term of office'], ['dignitaries', 'people holding high positions'], ['oppression', 'cruel and unjust use of power'], ['emancipation', 'freedom from restriction or control']],
  sol: 'Key words for this chapter with their meanings.',
}));
Q('mt_ideas', match({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each idea from the chapter with what it means.',
  pairs: [['Courage', 'controlling fear and acting anyway'], ['Two obligations', 'duty to family and duty to nation'], ['Hatred', 'something learnt that can be unlearnt'], ['The oppressor', 'also unfree, ruled by his own prejudice']],
  sol: 'Each of Mandela\'s ideas, in SOYL\'s words.',
}));
