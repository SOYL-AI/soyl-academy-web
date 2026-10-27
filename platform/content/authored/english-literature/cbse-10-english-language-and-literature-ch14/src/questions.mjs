// CBSE 10 English Language and Literature, ch14 "Fire and Ice" (Robert Frost) — question bank.
// LITERATURE RULE (CONTEXT §8): no line or phrase of the poem is reproduced. The poem is nine lines
// long, so even two-word runs of it are avoided; only the title and single words (fire, ice, desire,
// perish, suffice) appear. Passages are SOYL commentary (passage_origin: soyl-commentary).
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary on *Fire and Ice* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point about the poem', 1], ['Explanation or interpretation linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point about the poem', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: accurate points about the poem', 3], ['Interpretation / extrapolation: a clear, supported view', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (SOYL commentary)
Q('src_views', source({
  t: [4, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Frost opens his poem in the middle of an old argument. People have long wondered how everything will finally be destroyed, and the poem sets out the two popular answers almost at once: destruction by heat, or destruction by cold. Scientists and religious thinkers had offered both answers. But the poet is not really interested in astronomy or prophecy. Within a few lines he moves the question inside the human heart, where heat and cold become two feelings that can wreck lives as surely as any comet or frozen age.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Which two ways of destruction does the opening of *Fire and Ice* set out?', opts: ['by heat and by cold', 'by flood and by drought', 'by war and by disease', 'by earthquake and by storm'], sol: 'The poem begins with the two popular answers: heat (fire) and cold (ice).' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'The commentary says the poet moves the question inside the human ___.', acc: [['heart']], sol: 'He moves it inside the human **heart**: fire and ice become feelings.' })),
    child('c', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does the commentary mean when it says Frost is not really interested in astronomy?', opts: ['His real subject is human feeling, not science.', 'He disliked scientists.', 'He knew nothing about the stars.', 'He wanted to write a science textbook.'], sol: 'The cosmic question is only a starting point; the poem is about emotions.' })),
    child('d', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: 'Why might Frost begin *Fire and Ice* with a question many people had already argued about?', model: 'A familiar debate draws readers in at once, and he can then give it a surprising, personal twist.', sol: 'A known question hooks the reader before the poem turns it inward.', scheme: [['Familiar question hooks the reader; then a twist', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'According to the commentary, how quickly does the poem set out the two answers?', opts: ['almost at once', 'only in its last line', 'after a long story', 'never at all'], sol: 'The commentary says the two answers appear almost at once.' })),
  ],
  sol: 'Answer from the commentary; parts (a) and (c) also follow from your reading of the poem.',
}));
Q('src_fire', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The speaker does not consult books or experts before choosing a side. He consults his own experience. He describes desire as something he has sampled, the way one samples food, and what he has learnt from it makes him side with the people who expect a fiery end. Fire is a fitting picture for desire: it is hot, it spreads quickly, and it is never satisfied, consuming whatever it touches and then looking for more. Greed for money, land or power behaves in just this way, and so does unchecked ambition.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'On what does the speaker of *Fire and Ice* base his first choice?', opts: ['his own experience with desire', 'a scientist\'s report', 'an old religious book', 'a friend\'s advice'], sol: 'He relies on his own experience, not on experts.' })),
    child('b', fb({ t: 2, d: 2, c: 'understanding', stem: 'In the poem, fire stands for ___.', acc: [['desire', 'greed', 'passion']], sol: 'Fire symbolises **desire** (greed, passion, ambition).' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which quality of fire, named in the commentary, makes it a good symbol for desire?', opts: ['It is never satisfied and keeps spreading.', 'It is slow and silent.', 'It is cold to the touch.', 'It is easy to see through.'], sol: 'Like desire, fire consumes and then looks for more.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the speaker\'s way of describing desire, as something sampled like food, suggest?', model: 'That he has known desire personally and found how strongly it can grip a person.', sol: 'The image of tasting shows first-hand experience.', scheme: [['Personal, first-hand knowledge about desire', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which situation best shows the kind of fire the commentary describes?', opts: ['Two neighbours fight for years over a strip of land each wants.', 'A child shares lunch with a friend.', 'A farmer waits for the rain.', 'A student helps a classmate revise.'], sol: 'Greed for land that keeps growing into conflict is desire acting like fire.' })),
  ],
  sol: 'Link fire to desire, then explain which qualities they share.',
}));
Q('src_ice', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Having chosen fire, the speaker pauses to imagine a second ending. If the earth had to be destroyed one more time, he says in effect, hatred would do the job just as well. Ice makes a cold, quiet destroyer. It does not blaze; it hardens, numbs and cracks. Hatred works the same way: it makes people cold and indifferent to one another, it freezes sympathy, and over time it can break families, communities and nations. The speaker knows hatred well enough to judge its power, and he does not rank it below desire.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, what does ice stand for?', opts: ['hatred', 'love', 'courage', 'wisdom'], sol: 'Ice symbolises hatred: coldness and indifference.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'When does the speaker think about ice as a destroyer?', opts: ['when he imagines the earth being destroyed a second time', 'before he mentions fire at all', 'when he describes winter', 'when he gives up his first choice'], sol: 'He keeps fire as his first choice and imagines a second destruction by ice.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says ice does not blaze; instead it hardens, ___ and cracks.', acc: [['numbs']], sol: 'Ice hardens, **numbs** and cracks, as hatred does.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'Give one way in which hatred, according to the commentary, works like ice.', model: 'It makes people cold and indifferent (it freezes sympathy).', sol: 'Any one: coldness, indifference, frozen sympathy, slow breaking of ties.', scheme: [['Any one valid likeness from the commentary', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'How does the speaker rank hatred compared with desire as a destroyer?', opts: ['as equally capable', 'as far weaker', 'as harmless', 'as the only real danger'], sol: 'He does not rank it below desire: ice would do the job just as well.' })),
  ],
  sol: 'Explain ice as hatred and show how the speaker treats it as an equal danger.',
}));
Q('src_form', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem is tiny, a single stanza of nine lines, yet it is tightly built. Only three rhyme sounds run through it, interlocking in the pattern aba abc bcb, so that each new rhyme is introduced before the old one is dropped. Most lines are of a similar, moderate length, but three are very short, and the last two of these close the poem. Those short final lines slow the reader down and make the closing judgment land with quiet force. Form here is not decoration; it controls how calmly, and how chillingly, the poem ends.',
  parts: [
    child('a', fb({ t: 3, d: 1, c: 'recall', stem: '*Fire and Ice* is a single stanza of ___ lines.', acc: [['nine', '9']], sol: 'It has **nine** lines in one stanza.' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What is the rhyme scheme of *Fire and Ice*?', opts: ['aba abc bcb', 'aabb ccdd e', 'abab cdcd e', 'no rhyme'], sol: 'Three rhyme sounds interlock: aba abc bcb.' })),
    child('c', mcq({ t: 3, d: 2, c: 'recall', stem: 'How many rhyme sounds does the commentary say run through the poem?', opts: ['three', 'two', 'five', 'nine'], sol: 'Only three rhyme sounds are used.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'What effect do the short final lines of *Fire and Ice* have, according to the commentary?', model: 'They slow the reader down so the closing judgment lands with quiet force.', sol: 'The brevity makes the ending calm and chilling.', scheme: [['Slow the reader; closing judgment lands with force', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the commentary say form is not decoration in this poem?', opts: ['It shapes how calmly and chillingly the poem ends.', 'It makes the poem longer.', 'It hides the poem\'s meaning.', 'It was chosen at random.'], sol: 'Form controls the tone of the ending.' })),
  ],
  sol: 'For form questions, count lines, mark the rhymes as letters and notice line lengths.',
}));
Q('src_tone', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'What makes the poem unsettling is its tone. The speaker discusses the end of all things as calmly as a man discussing the weather. He uses plain words, offers his view almost casually, and closes with a word that means no more than "be enough". Claiming that hatred would be enough to destroy everything is a huge understatement, and the gap between the enormous subject and the mild word creates irony. The calm voice does not make the danger smaller; it makes it colder, as if the speaker has already accepted it.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How does the commentary describe the speaker\'s tone in *Fire and Ice*?', opts: ['calm and casual', 'loud and terrified', 'angry and bitter', 'joyful and excited'], sol: 'He speaks as calmly as if discussing the weather.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'Saying something huge in a deliberately mild way is called ___.', acc: [['understatement']], sol: 'This is **understatement**.' })),
    child('c', mcq({ t: 4, d: 2, c: 'recall', stem: 'The last word of *Fire and Ice* means…', opts: ['be enough', 'burn brightly', 'freeze slowly', 'be destroyed'], sol: 'Suffice means to be enough.' })),
    child('d', short({ t: 3, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the calm voice make the danger seem colder rather than smaller?', model: 'Because the speaker sounds as if he has already accepted the destruction, which is chilling.', sol: 'Calm acceptance of catastrophe is more frightening than panic.', scheme: [['Calm acceptance is chilling', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Where does the irony in the ending come from, according to the commentary?', opts: ['the gap between an enormous subject and a mild word', 'a sudden change of rhyme', 'a joke about the weather', 'a reference to another poem'], sol: 'A vast catastrophe described with a modest word creates irony.' })),
  ],
  sol: 'Tone questions: name the tone, then show how the word choice creates it.',
}));
Q('src_theme', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Read quickly, the poem sounds like a guess about the earth\'s future. Read slowly, it is a warning about the present. Neither comets nor frozen ages are needed to destroy us; ordinary human feelings, left unchecked, are enough. Wars over land and wealth grow from greed, and long feuds grow from hatred. The poem does not preach or offer a cure. It simply places the responsibility where it belongs, with us, and leaves the reader to draw the conclusion: whatever ends our world is most likely to be something we carry inside ourselves.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, what is *Fire and Ice* really a warning about?', opts: ['the danger of unchecked human feelings', 'the danger of comets', 'the coming of an ice age', 'the dangers of cold weather'], sol: 'Greed and hatred, left unchecked, are the real dangers.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Why does the commentary call the poem a warning about the present and not only the future?', opts: ['Greed and hatred are already at work around us today.', 'The poem gives a date for the end.', 'The poem describes today\'s weather.', 'The poet lived in the future.'], sol: 'Its warning applies to feelings people act on now.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the poem places the ___ with us, where it belongs.', acc: [['responsibility']], sol: 'It places the **responsibility** with human beings.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'The commentary says the poem does not preach. What does it do instead?', model: 'It lets readers draw the conclusion themselves.', sol: 'It leaves the conclusion to the reader.', scheme: [['Leaves the reader to conclude', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which news story would best illustrate the message of *Fire and Ice*?', opts: ['A long feud between two families ends in violence.', 'A new comet is spotted by astronomers.', 'A city records its coldest winter.', 'A forest fire is caused by lightning.'], sol: 'Human hatred causing destruction fits the poem; natural events do not.' })),
  ],
  sol: 'Theme questions: state the idea, then connect it to the speaker\'s two choices and to life today.',
}));
Q('src_speaker', source({
  t: [1, 2], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Who is speaking in this poem? We learn very little about him except the way he thinks. He listens to the common opinions, then judges them by what he has felt himself. He admits that he knows desire and hatred from the inside; he does not pretend to be above them. That honesty gives the poem its weight. A preacher might have condemned greed and hatred from a distance. Frost\'s speaker sounds instead like an ordinary, thoughtful person who has watched these feelings in himself and others, and who quietly reports what he has found.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which person is *Fire and Ice* spoken?', opts: ['the first person', 'the third person', 'the second person', 'as a dialogue'], sol: 'The speaker refers to himself and his own experience.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does the speaker judge the common opinions about the end?', opts: ['by what he has felt himself', 'by counting votes', 'by reading scripture', 'by asking his teacher'], sol: 'He weighs them against his own experience.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the speaker\'s ___ gives the poem its weight.', acc: [['honesty']], sol: 'His **honesty** about his own feelings gives the poem weight.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'How is the speaker of *Fire and Ice* different from a preacher, according to the commentary?', model: 'He does not condemn from a distance; he admits knowing these feelings himself.', sol: 'He speaks from experience, not from above.', scheme: [['Speaks from personal experience, not from a distance', 1]] })),
    child('e', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which word best describes the speaker as the commentary presents him?', opts: ['thoughtful', 'boastful', 'cruel', 'careless'], sol: 'He is an ordinary, thoughtful person reporting what he has found.' })),
  ],
  sol: 'Speaker questions rely on clues: how he thinks, what he admits, how he speaks.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_fire_symbol', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What does fire symbolise in *Fire and Ice*, and why is it a suitable symbol? Answer in 40–50 words.',
  model: 'Fire symbolises desire: greed, lust for power and endless wanting. It is a fitting symbol because fire spreads quickly, burns whatever it reaches and is never satisfied. Desire behaves the same way, growing as it is fed until it can destroy individuals and even whole societies.',
  sol: 'Name the symbol (desire) + two shared qualities + the destructive result.',
}));
Q('sa_ice_symbol', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'What does ice stand for in *Fire and Ice*, and how can it destroy? Answer in 40–50 words.',
  model: 'Ice stands for hatred. Like ice, hatred is cold and hard; it numbs feelings and makes people indifferent to one another. It works slowly and quietly, but it can break friendships, divide communities and lead to cruelty and war. So it is as destructive as fire.',
  sol: 'Name the symbol (hatred) + how ice and hatred are alike + the damage it causes.',
}));
Q('sa_why_fire_first', short({
  ...SA3, t: 1, d: 3, c: 'analysis',
  stem: 'Why does the speaker of *Fire and Ice* first side with fire? Answer in 40–50 words.',
  model: 'The speaker sides with fire because of his own experience. He has known desire personally and seen how strong and consuming it can be. Since fire stands for desire, he believes that greed and craving are powerful enough to bring about the destruction of everything.',
  sol: 'Reason (personal experience) + link (fire = desire) + conclusion (desire can destroy).',
}));
Q('sa_understatement', short({
  ...SA3, t: 3, d: 4, c: 'analysis',
  stem: 'How does Frost use understatement at the end of *Fire and Ice*? What is its effect? Answer in 40–50 words.',
  model: 'Frost ends by saying that ice would simply be enough to destroy everything, using a mild word for total destruction. This understatement contrasts sharply with the huge subject. Its effect is ironic and chilling: the calm phrasing makes hatred seem even colder and more dangerous.',
  sol: 'Identify the mild final word for a vast event + the contrast + the effect (irony, chill).',
}));
Q('sa_rhyme_form', short({
  ...SA3, t: 3, d: 2, c: 'understanding',
  stem: 'Describe the form and rhyme scheme of *Fire and Ice*. Answer in 40–50 words.',
  model: 'The poem is a single stanza of nine lines. Its rhyme scheme is aba abc bcb, so only three rhyme sounds interlock throughout. Most lines are of moderate length, but three are very short, including the final two, which slow the reader and give the ending emphasis.',
  sol: 'Stanza and lines + rhyme scheme + one more feature (short lines and their effect).',
}));
Q('sa_two_views', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What two opinions about the end of everything does *Fire and Ice* begin with, and what do they come to mean? Answer in 40–50 words.',
  model: 'The poem begins with two common beliefs: that everything will finally be destroyed either by burning heat or by freezing cold. As the poem continues, these become symbols. Fire comes to mean human desire and ice comes to mean human hatred, both capable of destruction.',
  sol: 'The two opinions (heat, cold) + how they turn into symbols of emotions.',
}));
Q('sa_tone', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe the tone of *Fire and Ice*. How does it suit the subject? Answer in 40–50 words.',
  model: 'The tone is calm, casual and conversational, though the subject is the destruction of everything. The speaker offers his opinion almost lightly and ends with a mild word. This calmness creates irony and makes the warning more unsettling, as if catastrophe were already accepted.',
  sol: 'Name the tone + contrast with the subject + effect on the reader.',
}));
Q('sa_message', short({
  ...SA3, t: 2, d: 3, c: 'evaluation',
  stem: 'What is the central message of *Fire and Ice*? Answer in 40–50 words.',
  model: 'The central message is that human emotions, not natural disasters, are the greatest threat to humanity. Uncontrolled desire, like fire, and deep hatred, like ice, can each destroy individuals and civilisations. The poem warns us to recognise and control these feelings before they ruin everything.',
  sol: 'The message + the two emotions as symbols + the warning it carries.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *Fire and Ice* a suitable title for the poem? Give reasons in 40–50 words.',
  model: 'Yes. The title names the two forces the poem weighs against each other. At first they seem to be physical forces of destruction, but they turn into symbols for desire and hatred. The short, contrasting title captures both the poem\'s debate and its hidden meaning.',
  sol: 'A clear view + link to the two forces + link to their symbolic meaning.',
}));
Q('sa_relevance_today', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'How is the warning in *Fire and Ice* relevant today? Answer in 40–50 words.',
  model: 'The warning is very relevant. Greed for resources, land and power still causes wars and damages the planet, while hatred based on religion, race or nationality divides people and fuels violence. The poem reminds us that controlling these feelings matters more than fearing distant disasters.',
  sol: 'Examples of greed today + examples of hatred today + link back to the poem.',
}));
Q('sa_tasted', short({
  ...SA3, t: 3, d: 4, c: 'analysis',
  stem: 'The speaker of *Fire and Ice* describes desire as something he has tasted. What does this metaphor suggest? Answer in 40–50 words.',
  model: 'The metaphor presents desire as something sampled, like food or drink. It suggests that the speaker knows desire from personal experience, not just from books. Tasting also hints at temptation: once tried, desire leaves one wanting more, which is exactly why it can grow destructive.',
  sol: 'Explain the metaphor + what it shows about the speaker + link to the danger desire poses.',
}));
Q('sa_personal', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'How does the speaker of *Fire and Ice* make a vast question personal? Answer in 40–50 words.',
  model: 'The speaker turns a cosmic question into a personal one by judging it through his own feelings. He speaks in the first person, relies on what he has known about desire and hatred, and offers his view modestly. The end of everything becomes a matter of human hearts.',
  sol: 'First-person voice + reliance on his experience + the shift from cosmic to human.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_poet', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who wrote *Fire and Ice*? Mention two facts about the poet in 30–40 words.',
  model: 'The poem was written by Robert Frost (1874–1963), an American poet. He is known for poems about rural New England in plain language with deeper meanings, and he won the Pulitzer Prize for Poetry four times.',
  sol: 'Name + any two facts (American; New England settings; four Pulitzer Prizes; dates).',
}));
Q('sb_two_ends', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'According to *Fire and Ice*, what are the two ways in which everything might end? Answer in 30–40 words.',
  model: 'The poem mentions two common beliefs. Some people expect everything to be destroyed by fire, through intense heat, while others expect destruction by ice, through freezing cold. The speaker then considers both possibilities.',
  sol: 'Fire (heat) and ice (cold), as two popular opinions.',
}));
Q('sb_desire_examples', short({
  ...SA2, t: 2, d: 2, c: 'application',
  stem: 'Give two examples from life today of the kind of craving that *Fire and Ice* calls fire. Answer in 30–40 words.',
  model: 'One example is a country going to war to seize another\'s land or oil. Another is a company polluting rivers to earn more profit. In both cases greed grows like fire and causes great destruction.',
  sol: 'Any two real-life examples of greed or craving + why they resemble fire.',
}));
Q('sb_hate_examples', short({
  ...SA2, t: 2, d: 2, c: 'application',
  stem: 'Give two examples of the kind of hatred that *Fire and Ice* calls ice. Answer in 30–40 words.',
  model: 'One example is communal hatred that turns neighbours against each other and leads to riots. Another is a family feud kept alive for generations. Both are cold and slow, yet they destroy lives and peace.',
  sol: 'Any two examples of hatred + why they resemble ice.',
}));
Q('sb_suffice', short({
  ...SA2, t: [3, 4], d: 3, c: 'understanding',
  stem: 'What does the last word of *Fire and Ice* mean, and why is it striking? Answer in 30–40 words.',
  model: 'The last word means to be enough. It is striking because it is a very mild word used for total destruction. This understatement makes the ending calm, ironic and chilling at the same time.',
  sol: 'Meaning (be enough) + why it is striking (understatement, irony).',
}));
Q('sb_contrast', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'How does *Fire and Ice* use contrast? Answer in 30–40 words.',
  model: 'The poem sets two opposites side by side: fire, which is hot, fast and fierce, and ice, which is cold, slow and numbing. Yet both lead to the same end, which shows that opposite emotions can be equally destructive.',
  sol: 'The opposites + their qualities + the shared result.',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_emotions_destroy', long({
  ...LA, t: 2, d: 3, c: 'analysis',
  stem: 'How does *Fire and Ice* suggest that human emotions, rather than natural forces, may destroy everything? Answer in 100–120 words.',
  model: 'Fire and Ice begins with an old question: will everything be destroyed by heat or by cold? Frost quickly turns this cosmic debate into a study of human feeling. Fire becomes desire, the greed and craving that spread fast and are never satisfied. Ice becomes hatred, the coldness that numbs sympathy and slowly breaks people apart. The speaker judges from his own experience, first siding with fire and then admitting that hatred would destroy just as effectively. The calm tone and the mild final word make the warning more chilling. The poem suggests that we need not fear comets or frozen ages; our own uncontrolled emotions are dangerous enough to end civilisation.',
  sol: 'The opening debate → fire as desire → ice as hatred → the speaker\'s judgment → tone → conclusion. Do not quote the poem.',
}));
Q('la_symbols', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'Discuss the symbolism of fire and ice in Frost\'s poem. Answer in 100–120 words.',
  model: 'Frost uses two everyday elements as symbols of human emotions. Fire stands for desire in all its forms: greed, lust, ambition and craving for power. Like fire, desire is hot and fast, spreads to everything near it and is never satisfied. Ice stands for hatred. Like ice, hatred is cold, hard and slow; it numbs feeling, freezes sympathy and cracks relationships apart. The two symbols are opposites, yet they lead to the same result, destruction. By choosing natural forces that everyone understands, Frost makes abstract emotions vivid and concrete. The symbols also allow the poem to begin as a debate about nature and end as a warning about the human heart.',
  sol: 'Fire: meaning + shared qualities → ice: meaning + shared qualities → opposites with the same result → why the symbols work.',
}));
Q('la_speech', long({
  ...LA, t: [2, 4], d: 4, c: 'application', bloom: 'create',
  stem: 'Using ideas from *Fire and Ice*, write a short speech for your school assembly on the topic: Greed and Hatred, the Real Dangers. Answer in 100–120 words.',
  model: 'Good morning, everyone. Today I want to talk about greed and hatred, the real dangers to our future. In his poem Fire and Ice, Robert Frost asks whether the earth will be destroyed by heat or by cold, and then shows that the true threats are human feelings. Fire stands for desire, which grows the more we feed it. Ice stands for hatred, which freezes kindness and divides us. Look around: wars over land and resources, quarrels that last for generations. Each of us can resist these forces in small ways, by sharing, by forgiving and by listening. Let us not wait for a disaster. Let us change our hearts. Thank you.',
  sol: 'Speech format (greeting, topic, closing); ideas from the poem in own words; examples from life; a call to action. No lines quoted.',
}));
Q('la_relevance', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: '*Fire and Ice* was written about a hundred years ago. Is its warning still relevant? Give a reasoned answer in 100–120 words.',
  model: 'Although Fire and Ice was written about a century ago, its warning is perhaps more relevant now than ever. The poem suggests that desire and hatred, not comets or ice ages, are the real threats to humanity. Today greed for oil, land and profit drives wars and is damaging the planet\'s climate. Hatred based on religion, caste, race or nationality still sparks violence and divides societies, often spreading faster through social media. Modern weapons make the consequences of both emotions far greater than in Frost\'s time. The poem therefore remains a timely reminder that the future depends on how well we control our own feelings, not just on nature.',
  sol: 'A clear view → the poem\'s warning in own words → modern examples of greed and hatred → why the stakes are higher → conclusion.',
}));
Q('la_article', long({
  ...LA, t: [2, 4], d: 3, c: 'application', bloom: 'create',
  stem: 'Write an article for your school magazine titled Small Fires, Slow Ice, showing how the ideas of *Fire and Ice* apply to everyday school life. Answer in 100–120 words.',
  model: 'Small Fires, Slow Ice\n\nRobert Frost\'s poem Fire and Ice warns that desire and hatred can destroy humanity. The same forces work on a smaller scale in our school. Fire appears as unhealthy competition: the craving to top every test, to own the latest phone or to win at any cost. It can turn friends into rivals. Ice appears as grudges, cold silences and groups that exclude others. Nobody shouts, yet friendships slowly freeze. Neither feeling seems dangerous at first, which is exactly why we should notice it early. Let us compete fairly, celebrate others\' success and settle quarrels quickly. Then neither fire nor ice will ruin our school years.',
  sol: 'Title + introduction to the poem in own words + fire and ice in school life + suggestions + conclusion.',
}));
Q('la_style', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'How do the brevity and calm style of *Fire and Ice* strengthen its serious theme? Answer in 100–120 words.',
  model: 'Fire and Ice is only nine lines long and uses plain, everyday words, yet it deals with the end of everything. This brevity is powerful. There is no description or drama; the speaker simply states two views, gives his own judgment and stops. The tightly interlocking rhyme scheme, aba abc bcb, makes the poem feel controlled and certain. The short final lines slow the reader and lead to a mild closing word that understates total destruction. This calm, almost casual voice creates irony: catastrophe is discussed like an everyday opinion. The result is chilling. Because the poem does not shout, its warning about desire and hatred stays with the reader longer.',
  sol: 'Length and diction → structure and rhyme → short lines and understatement → tone and irony → effect on the reader.',
}));

// ================================================================ objective items
Q('mc_poet', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the poet of *Fire and Ice*?', opts: ['Robert Frost', 'Leslie Norris', 'John Berryman', 'Carolyn Wells'], sol: 'Robert Frost, the American poet, who also wrote Dust of Snow. The others wrote other poems in the Class 10 textbook.' }));
Q('mc_lines', mcq({ t: 3, d: 1, c: 'recall', stem: 'How many lines does *Fire and Ice* have?', opts: ['nine', 'eight', 'twelve', 'fourteen'], sol: 'It is a single stanza of nine lines.' }));
Q('mc_scheme', mcq({ t: 3, d: 2, c: 'recall', stem: 'The rhyme scheme of *Fire and Ice* is…', opts: ['aba abc bcb', 'abab cdcd e', 'aabb ccdd e', 'abc abc abc'], sol: 'Three rhyme sounds interlock: aba abc bcb.' }));
Q('mc_fire_symbol', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, fire is a symbol of…', opts: ['desire', 'hatred', 'knowledge', 'peace'], sol: 'Fire stands for desire: greed, passion, craving.' }));
Q('mc_ice_symbol', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, what does ice symbolise?', opts: ['hatred', 'desire', 'purity', 'hope'], sol: 'Ice stands for hatred: coldness and indifference.' }));
Q('mc_first_choice', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which ending does the speaker of *Fire and Ice* support first, and why?', opts: ['fire, because of his experience with desire', 'ice, because he has seen cold winters', 'fire, because scientists proved it', 'neither, because he refuses to choose'], sol: 'He sides with fire on the basis of what he has known about desire.' }));
Q('mc_suffice', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, the word *suffice* means…', opts: ['be enough', 'suffer greatly', 'surprise', 'fall short'], sol: 'Suffice = be enough. It is often confused with suffer.' }));
Q('mc_perish', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, the word *perish* means…', opts: ['be destroyed', 'be rescued', 'grow larger', 'stay hidden'], sol: 'Perish = die or be destroyed.' }));
Q('mc_device_end', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Describing the destruction of everything as merely enough, as *Fire and Ice* does at its close, is an example of…', opts: ['understatement', 'hyperbole', 'onomatopoeia', 'personification'], sol: 'A mild expression for an enormous event is understatement.' }));
Q('mc_tone', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which word best describes the tone of the speaker of *Fire and Ice*?', opts: ['calm and ironic', 'hysterical and loud', 'cheerful and hopeful', 'bitter and mocking'], sol: 'He discusses catastrophe calmly; the understatement makes it ironic.' }));
Q('mc_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the central theme of *Fire and Ice*?', opts: ['Uncontrolled human emotions can destroy humanity.', 'Winter is more dangerous than summer.', 'Scientists can predict the future.', 'Fire is useful to human beings.'], sol: 'Desire and hatred, not nature, are the real dangers.' }));
Q('mc_apply', mcq({ t: 2, d: 3, c: 'application', stem: 'Which SOYL-written situation best illustrates the ice of Frost\'s *Fire and Ice*?', opts: ['Two cousins stop speaking for years over an old insult, and the family splits.', 'Riya saves money to buy a bicycle.', 'A village celebrates a good harvest.', 'Arjun practises the flute every evening.'], sol: 'Cold, lasting hatred that breaks a family matches the poem\'s ice.' }));
Q('mc_contrast', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does Frost pair two opposite forces in *Fire and Ice*?', opts: ['To show that opposite emotions can lead to the same destruction', 'To describe two seasons of the year', 'To compare two scientists', 'To show that one force cancels the other'], sol: 'Hot desire and cold hatred differ, yet both destroy.' }));
Q('mc_rhyme_sounds', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How many different rhyme sounds does *Fire and Ice* use?', fixed: true, key: 'c', opts: ['two', 'four', 'three', 'nine'], sol: 'The pattern aba abc bcb uses three sounds (a, b, c).' }));

Q('fb_lines', fb({ t: 3, d: 1, c: 'recall', marks: 1, stem: '*Fire and Ice* has ___ lines arranged in ___ stanza.', acc: [['nine', '9'], ['one', '1', 'a single', 'single']], sol: '**Nine** lines in **one** stanza.', scheme: [['nine', 0.5], ['one', 0.5]] }));
Q('fb_scheme', fb({ t: 3, d: 2, c: 'recall', stem: 'Write the rhyme scheme of *Fire and Ice*: ___', acc: [['aba abc bcb', 'aba, abc, bcb', 'abaabcbcb']], sol: 'Three rhyme sounds interlock: **aba abc bcb**.' }));
Q('fb_poet', fb({ t: 1, d: 1, c: 'recall', stem: 'Robert Frost, the poet of *Fire and Ice*, won the ___ Prize for Poetry four times.', acc: [['Pulitzer']], sol: 'He won the **Pulitzer** Prize for Poetry four times.' }));
Q('fb_ice', fb({ t: 2, d: 2, c: 'understanding', stem: 'In *Fire and Ice*, fire stands for desire and ice stands for ___.', acc: [['hatred', 'hate']], sol: 'Ice stands for **hatred**.' }));

Q('ar_symbol', ar({ t: 2, d: 3, c: 'analysis', a: 'In *Fire and Ice*, the speaker believes ice could destroy everything as effectively as fire.', r: 'Ice works as a cold, slow force, and the speaker first sides with fire.', key: 'b', sol: 'Both are true, but R does not explain A. A is explained by the speaker\'s knowledge of hatred, which ice stands for; R only describes ice and his first choice.' }));
Q('ar_fire', ar({ t: [2, 1], d: 3, c: 'analysis', a: 'The speaker of *Fire and Ice* sides with the people expecting a fiery end.', r: 'He has known desire, which fire symbolises, from his own experience.', key: 'a', sol: 'Both are true, and his experience with desire is exactly why he sides with fire.' }));
Q('ar_form', ar({ t: 3, d: 2, c: 'understanding', a: '*Fire and Ice* is written in a single stanza.', r: '*Fire and Ice* has no rhyme.', key: 'c', sol: 'A is true: one stanza of nine lines. R is false: the rhyme scheme is aba abc bcb.' }));
Q('ar_tone', ar({ t: 3, d: 3, c: 'analysis', a: 'The speaker of *Fire and Ice* describes the end of everything in a terrified, dramatic voice.', r: 'The poem ends with a mild word that understates total destruction.', key: 'd', sol: 'A is false: the voice is calm and casual. R is true: the closing word means only be enough.' }));

Q('tf_one_stanza', tf({ t: 3, d: 1, c: 'recall', stem: 'True or false: *Fire and Ice* is written in one stanza.', ans: true, sol: 'It is a single stanza of nine lines.' }));
Q('tf_rejects_fire', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: the speaker of *Fire and Ice* rejects fire and chooses only ice.', ans: false, sol: 'He sides with fire first and then says ice would also be enough.' }));
Q('tf_literal', tf({ t: 2, d: 3, c: 'analysis', stem: 'True or false: *Fire and Ice* is only about physical fire and ice destroying the earth.', ans: false, sol: 'Fire and ice are symbols for desire and hatred; the poem is about human emotions.' }));
Q('tf_first_person', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: *Fire and Ice* is spoken in the first person.', ans: true, sol: 'The speaker refers to himself and to his own experience.' }));

Q('ord_argument', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the speaker\'s argument in *Fire and Ice* in order (SOYL summary).',
  items: ['Two popular opinions about the final destruction are mentioned.', 'The speaker recalls his experience with desire.', 'He sides with the people expecting fire.', 'He imagines everything being destroyed a second time.', 'He recalls what he knows of hatred.', 'He concludes that ice would be just as effective.'],
  sol: 'Two views → desire → fire → a second destruction → hatred → ice would work too.',
}));
Q('ord_answer', ord({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps for writing a 40–50 word answer on the symbols of *Fire and Ice*.',
  items: ['Read the question and underline its key word.', 'Name what fire and ice stand for.', 'Explain one quality each symbol shares with its emotion.', 'Add the effect or the message.', 'Check the word count and remove any quoted lines.'],
  sol: 'Understand the question → name the symbols → explain the link → add the message → check length and originality.',
}));

Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word used in *Fire and Ice* with its meaning.',
  pairs: [['perish', 'be destroyed'], ['suffice', 'be enough'], ['desire', 'strong wanting'], ['destruction', 'complete ruin']],
  sol: 'Single words from the poem with their meanings.',
}));
Q('mt_symbols', match({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each element of *Fire and Ice* with what it stands for or suggests.',
  pairs: [['fire', 'desire and greed'], ['ice', 'hatred and coldness'], ['the speaker\'s experience', 'the basis of his judgment'], ['the mild last word', 'understatement of total ruin']],
  sol: 'Fire and ice are symbols; the experience and the last word explain how the speaker reaches and states his view.',
}));
Q('mt_devices', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of *Fire and Ice* with the correct term.',
  pairs: [['desire described as something sampled like food', 'metaphor'], ['a mild word for the end of everything', 'understatement'], ['hot and cold forces set side by side', 'contrast'], ['fire standing for greed', 'symbolism']],
  sol: 'Name the device by what it does in the poem.',
}));
