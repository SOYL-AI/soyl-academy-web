// CBSE 10 English Language and Literature, ch07 "From the Diary of Anne Frank" — question bank.
// LITERATURE RULE (CONTEXT §8): no sentence, close paraphrase or distinctive phrase of the diary extract
// appears here. Passages are SOYL commentary (passage_origin: soyl-commentary); stems refer to events in
// SOYL's own words. The three essay titles are named as titles only. Students read the extract in First Flight.
// Topics: t01 context and summary · t02 themes (why a diary; friendship and loneliness) · t03 characters
// (Anne; Mr Keesing) · t04 narrative techniques (diary form, humour) · t05 exam practice.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the chapter, not an extract from the diary. Read the chapter itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the chapter (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the chapter', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the chapter, accurately used', 3], ['Interpretation / extrapolation: a clear view supported by the chapter', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (source-based, SOYL commentary)
Q('src_strange', source({
  t: [2, 4], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Anne begins by admitting that keeping a diary feels odd. She has never written anything of the kind, and she suspects nobody will ever want to read the reflections of a young girl. Still, the urge to write wins, because she has feelings she cannot share aloud. She recalls an old saying that compares the patience of paper with the patience of people, and decides it is true. Since she means to show the notebook to nobody, it can hold anything. The diary becomes a private room in which a talkative girl can at last be quiet and honest.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'How old was Anne when she began her diary?', opts: ['thirteen', 'ten', 'sixteen', 'eighteen'], sol: 'She was thirteen; the diary was a birthday present in June 1942.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why does keeping a diary feel strange to Anne at first?', opts: ['She has never written like this and doubts anyone will care about her thoughts.', 'Her parents have forbidden her to write.', 'She finds writing physically difficult.', 'She has to write it in a foreign language.'], sol: 'It is a new experience, and she doubts that a young girl\'s thoughts will interest anyone.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'The old saying Anne recalls compares the patience of paper with the patience of ___.', acc: [['people', 'humans', 'human beings']], sol: 'It compares paper with **people**: paper listens without tiring or judging.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by calling the diary *a private room*?', model: 'It is a safe, secret place where Anne can express her true feelings without anyone else hearing or judging.', sol: 'The diary offers privacy and freedom to be honest.', scheme: [['A safe, secret space for honest feelings', 1]] })),
    child('e', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Why can the notebook *hold anything*, according to the commentary?', opts: ['Anne intends to show it to nobody.', 'It has a very large number of pages.', 'Her teacher has asked her to fill it.', 'It will be published soon.'], sol: 'Because no one else will read it, nothing needs to be hidden.' })),
  ],
  sol: 'The key idea: the diary gives Anne privacy and patience that people do not.',
}));
Q('src_friend', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Seen from outside, Anne\'s life looks full. She has loving parents, an older sister, caring relatives, a comfortable home and a crowd of friends and admirers. Yet she insists that she has no true friend. With the people around her she talks only about everyday matters and having fun; nobody comes close enough to share secrets. She even wonders whether the fault is partly her own. This honest admission explains her decision. Rather than simply record events, she will treat the diary itself as the friend she lacks, and she gives that friend a name: Kitty.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What name does Anne give her diary?', opts: ['Kitty', 'Sanne', 'Margot', 'Kuperus'], sol: 'She names her diary Kitty and writes to it as to a friend.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does Anne feel is missing from her life?', opts: ['a true friend in whom she can confide', 'a loving family', 'a comfortable home', 'people to have fun with'], sol: 'She has company but no one close enough to share her inner thoughts.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'According to the commentary, with her friends Anne talks only about everyday matters and having ___.', acc: [['fun', 'a good time']], sol: 'Everyday matters and having **fun**; nothing deeper.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does Anne treat the diary as a friend rather than as a record of events?', model: 'She lacks a close friend, so she wants the diary to be the confidant to whom she can tell everything.', sol: 'The diary fills the gap left by the missing true friend.', scheme: [['The diary replaces the missing confidant', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'evaluation', stem: 'Anne wonders whether the lack of closeness is partly her own fault. This shows that she is…', opts: ['honest and self-aware', 'proud and boastful', 'careless and lazy', 'angry and bitter'], sol: 'She examines her own part in the problem instead of blaming others.' })),
  ],
  sol: 'Contrast the full life seen from outside with the loneliness Anne feels inside.',
}));
Q('src_sketch', source({
  t: [1, 4], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Before she starts confiding in Kitty, Anne gives a brief account of her life, because a new friend needs background. Her parents married when her father was thirty-six and her mother twenty-five. Margot was born in Frankfurt in 1926 and Anne in 1929. Because the family was Jewish, her father moved to Holland in 1933 to run a company that made products for jam-making, and the rest of the family followed over the next months, the girls staying for a while with their grandmother in Aachen. The account is short and factual, yet a reader who knows the history of those years feels a shadow over it.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'In which city was Anne born?', opts: ['Frankfurt', 'Amsterdam', 'Aachen', 'Berlin'], sol: 'Anne was born in Frankfurt, Germany, in 1929.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'Anne\'s father moved the family to Holland in 1933 because they were ___.', acc: [['Jewish', 'Jews']], sol: 'Because they were **Jewish** and faced persecution in Germany.' })),
    child('c', mcq({ t: 1, d: 2, c: 'recall', stem: 'Where did Anne and Margot stay while their parents settled in Holland?', opts: ['with their grandmother in Aachen', 'at a boarding school in Frankfurt', 'with Mr Keesing\'s family', 'with friends in Amsterdam'], sol: 'They stayed with their grandmother in Aachen before joining their parents.' })),
    child('d', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'What is the *shadow* that readers feel over this short account?', model: 'The persecution of Jews by the Nazis, which later forced the family into hiding and cost Anne her life.', sol: 'Readers know the history that Anne, writing in 1942, could not foresee.', scheme: [['Nazi persecution / later hiding and death', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Why does Anne include this sketch of her life in the diary?', opts: ['so that Kitty will understand the stories she tells later', 'because her teacher asked for an autobiography', 'to practise her handwriting', 'to send it to her grandmother'], sol: 'A friend needs to know your background before your stories make sense.' })),
  ],
  sol: 'Parts (a)–(c) are facts from the sketch; (d) needs the historical context; (e) explains the diary\'s design.',
}));
Q('src_school', source({
  t: [1, 4], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Anne\'s account of school is full of fun. The whole class is nervous about the teachers\' meeting that will decide who moves up to the next form. Half the class is betting on the outcome, and Anne and her friend G.Z. find two boys who have bet all their holiday savings endlessly comic. Anne is fairly confident about herself and her girlfriends; her only real worry is maths. The tone is light and teasing, the voice of a lively schoolgirl rather than a famous author, and that ordinariness is exactly what makes the diary so moving for readers who know what came later.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', stem: 'Why is the class nervous?', opts: ['The teachers are about to decide who will move up to the next form.', 'A new teacher is joining the school.', 'The school is closing for ever.', 'A sports competition is coming.'], sol: 'Promotion to the next form is about to be decided.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The only subject Anne is unsure about is ___.', acc: [['maths', 'mathematics', 'math']], sol: 'Her only worry is **maths**.' })),
    child('c', mcq({ t: 1, d: 2, c: 'recall', stem: 'What had the two boys bet on the result?', opts: ['all their holiday savings', 'their bicycles', 'their school books', 'a week of homework'], sol: 'They had bet all their holiday savings.' })),
    child('d', short({ t: [4, 2], d: 4, c: 'evaluation', marks: 1, stem: 'Why does the *ordinariness* of these school scenes make the diary moving?', model: 'Readers know that this cheerful, normal girl would soon be in hiding and would die, so her everyday fun feels precious.', sol: 'The contrast between a normal childhood and the tragedy to come gives the scenes their force.', scheme: [['Normal life contrasted with the tragedy to come', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Which words best describe the tone of Anne\'s account of school?', opts: ['light and teasing', 'gloomy and fearful', 'formal and serious', 'angry and bitter'], sol: 'The commentary calls the tone light and teasing.' })),
  ],
  sol: 'Answer from the commentary; part (d) asks you to combine it with what you know of Anne\'s fate.',
}));
Q('src_keesing', source({
  t: [3, 1], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Mr Keesing, Anne\'s maths teacher, has long been irritated by her chatter, and after several warnings he gives her an essay about being a chatterbox as a punishment. Anne turns the punishment into a debate. She argues that talking comes naturally to students, promises to try to talk less, and adds that she cannot simply give it up, since her mother talks just as much: the habit runs in the family. Mr Keesing is amused. But when she keeps on talking, a second essay follows, with a title that calls her a hopeless case. The contest between a strict teacher and a clever pupil has begun.',
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'recall', stem: 'Which subject did Mr Keesing teach?', opts: ['maths', 'history', 'English', 'music'], sol: 'Mr Keesing was Anne\'s maths teacher.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What was Anne\'s main argument in her first essay?', opts: ['Talking is natural to students, and she inherited the habit from her mother.', 'Talking in class helps teachers teach better.', 'Mr Keesing talks more than any student.', 'She never talks in class at all.'], sol: 'She claimed chatter is natural in students and runs in her family, so it cannot be cured.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'The title of the second essay was *An ___ Chatterbox*.', acc: [['Incorrigible']], sol: 'The second title was *An **Incorrigible** Chatterbox*.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean when it says Anne *turns the punishment into a debate*?', model: 'Instead of simply apologising, she builds clever arguments defending her talking.', sol: 'She uses the essay to argue her case rather than to accept blame.', scheme: [['She argues her case instead of apologising', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did Mr Keesing react to Anne\'s first essay?', opts: ['He was amused by her arguments.', 'He tore it up.', 'He sent her to the headmistress.', 'He gave her a lower mark in maths.'], sol: 'He laughed at her arguments, though he set another essay when she kept talking.' })),
  ],
  sol: 'Note Anne\'s three arguments and Mr Keesing\'s amused but firm response.',
}));
Q('src_poem', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The third punishment is the silliest yet: a title about a quacking Mistress Chatterback, which sets the whole class laughing. Anne laughs too, but she has run out of ideas about chatterboxes, so she accepts her friend Sanne\'s offer to help her write the whole thing in verse. In the poem, a swan father loses patience with his three noisy ducklings, whose mother is a duck, and kills them for their quacking. Anne turns the teacher\'s joke back on him. Mr Keesing, to his credit, enjoys it, reads it aloud to several classes, and from then on lets her talk freely.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who helped Anne write the third essay?', opts: ['her friend Sanne', 'her sister Margot', 'her father', 'G.Z.'], sol: 'Her friend Sanne, who was good at poetry, helped her.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'In Anne\'s poem, what happens to the three ducklings?', opts: ['Their swan father kills them because of their quacking.', 'They fly away to a new pond.', 'They learn to stop quacking.', 'Their mother hides them from the swan.'], sol: 'Their father, a swan, kills them for quacking.' })),
    child('c', fb({ t: 4, d: 2, c: 'understanding', stem: 'Anne wrote her third essay entirely in ___.', acc: [['verse', 'poetry', 'rhyme', 'the form of a poem']], sol: 'It was written in **verse**, as a poem.' })),
    child('d', short({ t: [3, 4], d: 4, c: 'analysis', marks: 1, stem: 'How does Anne turn the teacher\'s joke back on him?', model: 'The silly title was meant to tease her, but her poem hints that the strict father swan, like the teacher, overreacts to chatter.', sol: 'The poem playfully makes the punisher look harsh, so the joke is now on him.', scheme: [['The poem makes the teacher, like the swan, look harsh', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What happened after Mr Keesing read the poem?', opts: ['He let Anne talk and stopped giving her extra homework.', 'He gave her a fourth essay.', 'He complained to her parents.', 'He moved her to another class.'], sol: 'He took it in good humour, allowed her to talk and set no more punishments.' })),
  ],
  sol: 'The key idea: wit wins the contest, and the teacher shows he can take a joke.',
}));
Q('src_form', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Why does a schoolgirl\'s diary matter so much? Partly because of its form. A diary is written in the first person, entry by entry, for no audience but the writer, so it can be completely honest. Anne\'s diary adds a twist: it is addressed to an imaginary friend, which makes it warm and conversational. It also mixes the past, in her short life story, with the present, in the school news of the day. Readers today know what Anne could not know in June 1942: that within weeks her family would go into hiding, and that she would not survive the war.',
  parts: [
    child('a', mcq({ t: 4, d: 1, c: 'recall', stem: 'In which person is a diary usually written?', opts: ['first person', 'second person', 'third person', 'no person at all'], sol: 'A diary uses *I*: the first person.' })),
    child('b', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What twist does Anne add to the diary form?', opts: ['She addresses it to an imaginary friend.', 'She writes it as a play.', 'She lets her class read every entry.', 'She writes it entirely in verse.'], sol: 'She writes to Kitty, an imaginary friend.' })),
    child('c', fb({ t: 4, d: 2, c: 'understanding', stem: 'A diary is normally written for no audience except the ___.', acc: [['writer', 'diarist', 'author', 'person writing it']], sol: 'For no one but the **writer**.' })),
    child('d', short({ t: [4, 1], d: 3, c: 'analysis', marks: 1, stem: 'How does the reader\'s knowledge of what happened later change the way we read the extract?', model: 'We know Anne would hide and die, so her cheerful school stories and hopes feel sad and precious.', sol: 'The gap between Anne\'s knowledge and ours adds sorrow to light-hearted entries.', scheme: [['Knowledge of her fate makes the light entries poignant', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What two time periods does the extract combine?', opts: ['her past life story and the present school news', 'the future and the distant past of her country', 'her parents\' childhood and her own old age', 'only events from the war years'], sol: 'A sketch of her past and news of the present day.' })),
  ],
  sol: 'Link the features of the form (first person, private, addressed to Kitty, past and present) to their effects.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_why_diary', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'Why did Anne feel the need to keep a diary? Answer in 40–50 words.',
  model: 'Anne had many companions but no true friend in whom she could confide. With others she talked only of ordinary matters. She needed somewhere to pour out her real thoughts and feelings, and a diary, which would be read by nobody else, gave her that freedom.',
  sol: 'The gap (no true friend) + her need (a place for real feelings) + why a diary suits it (private).',
}));
Q('sa_lonely', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Anne seems to have everything a girl could want, yet she feels alone. Explain this contradiction. Answer in 40–50 words.',
  model: 'Anne has loving parents, a sister, relatives, a good home and plenty of friends and admirers. Yet none of these relationships is deep: she shares only fun and everyday chatter. Without one close friend who understands her inner self, she feels lonely in the middle of a crowd.',
  sol: 'What she has (family, home, friends) + what is missing (depth, a confidant) + why that causes loneliness.',
}));
Q('sa_kitty', short({
  ...SA3, t: [2, 4], d: 3, c: 'analysis',
  stem: 'Why does Anne give her diary a name and write to it as if to a person? Answer in 40–50 words.',
  model: 'Anne wants the diary to be the close friend she lacks, not just a record of facts. Naming it Kitty and addressing her directly makes writing feel like a real conversation. It also makes her entries warm, personal and honest, as if confiding in a trusted companion.',
  sol: 'Purpose (a friend, not a record) + effect on Anne (conversation) + effect on the writing (warm, honest).',
}));
Q('sa_saying', short({
  ...SA3, t: 2, d: 3, c: 'analysis',
  stem: 'Anne recalls an old saying comparing the patience of paper with that of people. What does she mean, and why does it appeal to her? Answer in 40–50 words.',
  model: 'She means that paper will accept whatever we write, without tiring, interrupting or judging, while people often lose patience. The idea appeals to her because she feels nobody truly listens to her. A diary can absorb all her thoughts and moods without complaint.',
  sol: 'Meaning (paper accepts all, people do not) + why it appeals (no one really listens to her).',
}));
Q('sa_sketch_why', short({
  ...SA3, t: [1, 4], d: 2, c: 'understanding',
  stem: 'Why does Anne write a short account of her life before telling Kitty her news? Give two facts it includes. Answer in 40–50 words.',
  model: 'Anne treats Kitty as a new friend who knows nothing about her, so her later stories would make no sense without background. The sketch tells us, for example, that she was born in Frankfurt in 1929 and that her Jewish family moved to Holland in 1933.',
  sol: 'Reason (a new friend needs background) + any two accurate facts from the sketch.',
}));
Q('sa_grandma', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'What does Anne\'s mention of her grandmother and of Mrs Kuperus reveal about her nature? Answer in 40–50 words.',
  model: 'Anne still thinks lovingly of her grandmother, who died in January 1942, and she recalls a tearful farewell with Mrs Kuperus, her headmistress. These memories show that beneath her chatter she is affectionate, loyal and deeply sensitive, holding on to the people she has lost.',
  sol: 'The two memories (grandmother; farewell with Mrs Kuperus) + the traits they reveal (affection, sensitivity, loyalty).',
}));
Q('sa_promotion', short({
  ...SA3, t: [1, 4], d: 2, c: 'understanding',
  stem: 'Describe the mood in Anne\'s class as the teachers\' meeting approached, and Anne\'s own attitude. Answer in 40–50 words.',
  model: 'The whole class was anxious about who would move up to the next form. Half the students were placing bets, and two boys had gambled all their holiday savings. Anne found them funny. She felt fairly confident about herself and her friends, worrying only about maths.',
  sol: 'Class mood (anxiety, betting) + an example (the two boys) + Anne\'s attitude (amused, confident, unsure only of maths).',
}));
Q('sa_essay1', short({
  ...SA3, t: [3, 1], d: 3, c: 'analysis',
  stem: 'How did Anne defend herself in her first essay for Mr Keesing? Answer in 40–50 words.',
  model: 'Anne argued that chatter comes naturally to students and promised to try to talk less. She added cleverly that she could never stop completely, because her mother talked just as much, and a habit passed down from a parent cannot simply be switched off.',
  sol: 'Her three arguments: chatter is natural to students; she will try to control it; it is inherited from her mother.',
}));
Q('sa_keesing_change', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'How did Mr Keesing\'s attitude towards Anne change during the extract? Answer in 40–50 words.',
  model: 'At first Mr Keesing was annoyed by Anne\'s constant talking and punished her with essays. After her clever poem, he saw the joke, read it to several classes and stopped punishing her. He began to allow her to talk and even joked with the class himself.',
  sol: 'Before (annoyed; punishments) → turning point (the poem) → after (amused, tolerant, joking).',
}));
Q('sa_poem_trick', short({
  ...SA3, t: [3, 4], d: 4, c: 'evaluation',
  stem: 'Was Anne\'s poem a clever reply to Mr Keesing\'s third punishment? Give your view in 40–50 words.',
  model: 'Yes. The ridiculous title was meant to make fun of her, but Anne answered with a witty poem about ducklings punished for quacking. It made the strict father swan, and so the teacher, look harsh. It was clever because it made him laugh instead of angry.',
  sol: 'A stand + what the poem did (answered mockery with wit; turned the joke) + why it worked (he laughed).',
}));
Q('sa_humour', short({
  ...SA3, t: 4, d: 3, c: 'analysis',
  stem: 'Give two examples of humour in the extract and say what they show about Anne. Answer in 40–50 words.',
  model: 'Anne laughs at two classmates who bet all their holiday savings on the promotion results. She also turns Mr Keesing\'s silly punishment titles into a witty contest, ending with a poem about quacking ducklings. The humour shows her sharp mind and cheerful, mischievous spirit.',
  sol: 'Two examples (the betting boys; the essays and poem) + what they show (wit, cheerfulness, mischief).',
}));
Q('sa_teacher_lesson', short({
  ...SA3, t: [3, 5], d: 3, c: 'application',
  stem: 'What can teachers today learn from the way Mr Keesing finally dealt with Anne? Answer in 40–50 words.',
  model: 'Teachers can learn that a sense of humour often works better than repeated punishment. When Mr Keesing enjoyed Anne\'s poem and read it to other classes, the conflict ended and she respected him. Recognising a pupil\'s talent can turn a troublemaker into a willing learner.',
  sol: 'The lesson (humour and recognition over punishment) + evidence from the chapter + an application to schools today.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_family', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Name the members of Anne\'s immediate family and say where Anne and Margot were born. Answer in 30–40 words.',
  model: 'Anne lived with her father, her mother, Edith, and her older sister, Margot. Both girls were born in Frankfurt in Germany: Margot in 1926 and Anne on 12 June 1929.',
  sol: 'Father, mother (Edith), sister Margot + birthplace (Frankfurt) with years.',
}));
Q('sb_holland', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did Anne\'s father move to Holland, and what work did he do there? Answer in 30–40 words.',
  model: 'Being Jewish, the family was not safe in Germany, so her father moved to Holland in 1933. There he became managing director of the Dutch Opekta Company, a firm whose products were used in jam-making.',
  sol: 'Reason (Jewish; danger in Germany) + work (managing director of a jam-products company).',
}));
Q('sb_school_years', short({
  ...SA2, t: 1, d: 2, c: 'recall',
  stem: 'Describe Anne\'s early schooling in Holland. Answer in 30–40 words.',
  model: 'Anne began her education at a Montessori nursery school and moved into the first form at the age of six. Years later, in the sixth form, she was taught by the headmistress, Mrs Kuperus.',
  sol: 'Montessori nursery school until six + first form + Mrs Kuperus in the sixth form.',
}));
Q('sb_kuperus', short({
  ...SA2, t: [1, 3], d: 3, c: 'analysis',
  stem: 'How did Anne and Mrs Kuperus part at the end of the school year, and what does it show? Answer in 30–40 words.',
  model: 'At the end of that school year, Anne and Mrs Kuperus parted in tears. The scene shows how warm the bond between pupil and headmistress had become, and it reveals Anne\'s sensitive, loving nature beneath her chatter.',
  sol: 'What happened (a tearful farewell) + what it shows (a close bond; Anne\'s sensitivity).',
}));
Q('sb_why_punished', short({
  ...SA2, t: 3, d: 1, c: 'recall',
  stem: 'Why did Mr Keesing keep giving Anne extra homework? Answer in 30–40 words.',
  model: 'Anne talked too much in his maths lessons. After several warnings had no effect, Mr Keesing punished her by setting essays on the subject of chatterboxes, each with a sillier title than the last.',
  sol: 'Cause (constant talking in class) + the form of the punishment (essays on chatterboxes).',
}));
Q('sb_after', short({
  ...SA2, t: 3, d: 2, c: 'understanding',
  stem: 'What changed in Mr Keesing\'s class after he read Anne\'s poem? Answer in 30–40 words.',
  model: 'After reading the poem to the class, Mr Keesing stopped punishing Anne. She was allowed to talk without being given extra homework, and the teacher himself became more relaxed and began joking with his pupils.',
  sol: 'The change for Anne (no more punishment; allowed to talk) + the change in the teacher (jokes).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_anne', long({
  ...LA, t: [3, 5], d: 3, c: 'analysis',
  stem: 'Write a character sketch of Anne Frank as she appears in this extract, supporting each quality with evidence. Answer in 100–120 words.',
  model: 'Anne is a lively, talkative girl of thirteen whose chatter gets her into trouble with her maths teacher. She is also intelligent and witty. When punished with essays, she builds clever arguments and finally answers a silly title with a poem that wins the teacher over. Beneath the fun she is thoughtful and sensitive. Despite many friends and a loving family, she feels she has no true friend, and she honestly asks whether the fault is partly hers. She remembers her grandmother with love and her farewell with Mrs Kuperus with tears. She is confident about her studies, worrying only about maths. Altogether, she is a cheerful yet deeply reflective young writer.',
  sol: 'Four or five traits with evidence in your own words: talkative; intelligent and witty (essays, poem); sensitive and reflective (loneliness, grandmother, Mrs Kuperus); honest (self-questioning); confident. End with an overall judgement.',
}));
Q('la_keesing', long({
  ...LA, t: [3, 4], d: 4, c: 'analysis',
  stem: 'Describe the relationship between Anne and Mr Keesing and how it changes over the extract. Answer in 100–120 words.',
  model: 'At first, Anne and Mr Keesing are in conflict. He is irritated by her non-stop talking in his maths lessons and, after several warnings, punishes her with an essay on being a chatterbox. Anne responds not with silence but with clever arguments, claiming that talking is natural for students and inherited from her mother. He laughs, yet sets a second essay, and then a third with a ridiculous title. Anne, helped by her friend Sanne, answers with a witty poem about quacking ducklings. This wins him over. He reads it to several classes, stops punishing her and even begins to joke himself. Their contest ends in mutual respect and good humour.',
  sol: 'Trace the stages: conflict (talking; warnings; essay 1) → Anne\'s clever reply → escalation (essays 2 and 3) → the poem → reconciliation (reads it aloud; no more punishment; jokes). Conclude on respect and humour.',
}));
Q('la_lonely_teens', long({
  ...LA, t: [2, 5], d: 4, c: 'evaluation',
  stem: 'Anne felt lonely despite having many friends. Is this feeling common among teenagers today? Discuss with reference to the extract, in 100–120 words.',
  model: 'Anne had a loving family and dozens of friends and admirers, yet she felt she had no one to confide in. I believe many teenagers today feel the same. Social media gives us hundreds of contacts, but most conversations stay on the surface: films, games and jokes. Real worries about studies, family or the future often go unspoken, because we fear being judged. Like Anne, we may even wonder whether we keep others at a distance ourselves. Anne\'s answer was a diary, which listened patiently. Today, writing, talking to a counsellor or building one honest friendship can help. Being surrounded by people is not the same as being understood.',
  sol: 'A stand + Anne\'s situation (many friends, no confidant) + parallels today (shallow contact, fear of judgement) + possible remedies (a diary, one close friend) + conclusion.',
}));
Q('la_form_humour', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How do the diary form and Anne\'s humour make this extract engaging? Answer in 100–120 words.',
  model: 'The diary form makes the extract intimate. Anne writes in the first person, for no one but herself, so she is completely honest about her loneliness and doubts. By addressing her diary as Kitty, an imaginary friend, she makes every entry feel like a conversation with the reader. The form also lets her move easily from her family history to the latest school news. Her humour keeps the writing lively. She laughs at two classmates who bet their holiday savings, and her battle of essays with Mr Keesing ends with a comic poem about ducklings. Honest feeling and playful wit together make Anne\'s voice so real that readers feel they know her personally.',
  sol: 'Features of the form (first person, private, addressed to Kitty, past and present) + examples of humour (the bets, the essays and poem) + their combined effect on the reader.',
}));
Q('la_keesing_diary', long({
  ...LA, t: [5, 3], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Mr Keesing. Write a diary entry on the evening you read Anne\'s poem to your class, in 100–120 words.',
  model: 'Thursday evening\n\nI must admit that young Anne Frank has beaten me. For weeks her chatter has disturbed my maths lessons, so I set her essays as punishment. The first argued, cheekily, that she inherited her talkativeness from her mother. The second gave me peace for two lessons. Today I set a ridiculous title about quacking, expecting her to give up. Instead she handed me a poem about a father swan and his noisy ducklings. I laughed out loud, and I read it to the class and to two others. Perhaps I have been too strict. A girl with such wit deserves to be heard. From tomorrow, no more punishments.',
  sol: 'Diary format (day/time, first person, reflection). Content consistent with the chapter: talking, essays, Anne\'s arguments, the silly third title, the poem, reading it to classes, the change of heart. Tone in character: strict but fair, with humour.',
}));
Q('la_diary_today', long({
  ...LA, t: [5, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Like Anne, address an imaginary friend in your diary. Write an entry about a day when you turned an awkward situation into something positive, in 100–120 words.',
  model: 'Dear Mira,\n\nToday began badly. In the English period I was caught whispering to Kavya, and Ms Rao told me to give a two-minute speech on silence in front of the class. My face burned. Then I remembered Anne Frank and her poem for Mr Keesing. So I walked up, stood quietly for a full minute, and then said that silence speaks loudest. The class burst out laughing, and even Ms Rao smiled. She said it was the cleverest punishment speech she had heard. I learnt that a little wit can soften even a strict teacher. Still, I promise you, I will whisper less tomorrow!\n\nYours always,\nTara',
  sol: 'Diary format addressed to an imaginary friend (as Anne addresses Kitty); first person; an original incident; a clear turn from awkward to positive; reflection. Any reasonable incident earns credit.',
}));
Q('la_value', long({
  ...LA, t: [2, 1], d: 3, c: 'analysis',
  stem: 'Why did Anne value her diary so much, and why does the world value it today? Answer in 100–120 words.',
  model: 'Anne valued her diary because it gave her what people could not. She had a loving family and many friends, but no one she could truly confide in. The diary, which she named Kitty, became that friend: private, patient and always ready to listen. In it she could be honest about her moods, her loneliness and her hopes. The world values it for another reason. Anne was a Jewish girl writing in 1942, weeks before her family went into hiding from the Nazis. She died in a concentration camp in 1945, and her father published the diary in 1947. Her ordinary, lively voice makes a huge historical tragedy personal and unforgettable.',
  sol: 'Anne\'s reasons (no confidant; privacy and patience of the diary; Kitty) + the world\'s reasons (historical context, her fate, publication by her father, a personal voice for a tragedy).',
}));

// ================================================================ objective items
Q('mc_genre', mcq({ t: [1, 4], d: 1, c: 'recall', stem: 'The chapter *From the Diary of Anne Frank* is an example of which form?', opts: ['a diary', 'a play', 'a short story', 'a biography'], sol: 'It consists of entries from Anne\'s personal diary.' }));
Q('mc_gift', mcq({ t: 1, d: 1, c: 'recall', stem: 'On which occasion did Anne receive the notebook she used as a diary?', opts: ['her thirteenth birthday', 'her first day at school', 'her sister\'s wedding', 'a school prize-giving'], sol: 'It was a present for her thirteenth birthday in June 1942.' }));
Q('mc_sister', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was the name of Anne\'s elder sister?', opts: ['Margot', 'Sanne', 'Kitty', 'Edith'], sol: 'Her sister was Margot, born in 1926. Edith was her mother; Kitty was the diary; Sanne a friend.' }));
Q('mc_no_friend', mcq({ t: 2, d: 2, c: 'understanding', stem: 'What does Anne mean when she says she has no friend, though she knows many people?', opts: ['She has no one close enough to share her real feelings with.', 'Nobody at school will speak to her.', 'She has just moved to a new country.', 'Her parents do not let her meet anyone.'], sol: 'She lacks a confidant, not company.' }));
Q('mc_keesing_trait', mcq({ t: 3, d: 2, c: 'analysis', stem: 'Which quality does Mr Keesing show when he reads Anne\'s poem to several classes?', opts: ['a sense of humour', 'jealousy', 'cruelty', 'carelessness'], sol: 'He takes the joke in good spirit and enjoys her wit.' }));
Q('mc_anne_trait', mcq({ t: 3, d: 2, c: 'analysis', stem: 'Anne\'s replies to her three punishments show that she is…', opts: ['witty and resourceful', 'shy and timid', 'lazy and careless', 'rude and disrespectful'], sol: 'She answers each punishment with clever arguments and finally a poem.' }));
Q('mc_incorrigible', mcq({ t: 4, d: 2, c: 'understanding', stem: 'An *incorrigible* chatterbox is one who…', opts: ['cannot be corrected or reformed', 'talks only in class', 'talks very softly', 'has stopped talking'], sol: '*Incorrigible* means impossible to correct or improve.' }));
Q('mc_holland_year', mcq({ t: 1, d: 2, c: 'recall', stem: 'In which year did Anne\'s father move the family\'s home to Holland?', opts: ['1933', '1926', '1942', '1945'], sol: 'He emigrated to Holland in 1933; the rest of the family followed over the next months.' }));
Q('mc_context', mcq({ t: 1, d: 3, c: 'understanding', stem: 'What happened to Anne\'s family a few weeks after these entries were written?', opts: ['They went into hiding from the Nazis.', 'They moved back to Frankfurt.', 'They emigrated to America.', 'They opened a school.'], sol: 'In July 1942 the family went into hiding in the Secret Annex in Amsterdam.' }));
Q('mc_tone', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Which description best fits the tone of the extract?', opts: ['candid and humorous, with moments of sadness', 'formal and impersonal', 'angry and complaining throughout', 'fearful and secretive throughout'], sol: 'Anne is honest and funny, with touches of loneliness and grief.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which idea does the extract most strongly suggest?', opts: ['Having many acquaintances is not the same as having a true friend.', 'Teachers should never punish students.', 'Writing diaries is a waste of time.', 'Children should not talk in class at all.'], sol: 'Anne\'s loneliness among many friends is the heart of the extract.' }));
Q('mc_apply_keesing', mcq({ t: [3, 5], d: 3, c: 'application', stem: 'A student keeps drawing cartoons in class. Which response is most like Mr Keesing\'s final approach?', opts: ['The teacher asks her to illustrate the class magazine, and the doodling stops being a problem.', 'The teacher tears up her notebook.', 'The teacher gives her extra homework every day for a month.', 'The teacher ignores the class completely.'], sol: 'Like Mr Keesing, the teacher recognises the talent and channels it with good humour.' }));
Q('mc_poem_form', mcq({ t: 4, d: 2, c: 'understanding', stem: 'How was Anne\'s third essay different from the first two?', opts: ['It was written in verse.', 'It was written in German.', 'It was only one line long.', 'It was written by Mr Keesing.'], sol: 'With Sanne\'s help, she wrote it as a poem.' }));
Q('mc_why_sketch', mcq({ t: 4, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'Why does Anne give a sketch of her life early in the diary?', opts: ['Her teacher asked for an autobiography.', 'She wanted to publish it immediately.', 'Kitty, as a new friend, needs background to understand her stories.', 'She was practising for an exam.'], sol: 'Treating the diary as a friend means introducing herself first.' }));

Q('fb_kitty', fb({ t: 2, d: 1, c: 'recall', stem: 'Anne named her diary ___.', acc: [['Kitty']], sol: 'She called it **Kitty**.' }));
Q('fb_born', fb({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Anne was born on 12 June ___ in the German city of ___.', acc: [['1929'], ['Frankfurt', 'Frankfurt am Main']], sol: 'On 12 June **1929**, in **Frankfurt**.', scheme: [['1929', 0.5], ['Frankfurt', 0.5]] }));
Q('fb_kuperus', fb({ t: 1, d: 2, c: 'recall', stem: 'In the sixth form, Anne\'s teacher was Mrs ___, the headmistress.', acc: [['Kuperus']], sol: 'Mrs **Kuperus**.' }));
Q('fb_sanne', fb({ t: 3, d: 2, c: 'recall', stem: 'Anne\'s friend ___, who was good at poetry, helped her write the third essay in verse.', acc: [['Sanne']], sol: 'Her friend **Sanne** helped.' }));

Q('ar_diary', ar({ t: 2, d: 3, c: 'analysis', a: 'Anne decides to make her diary her friend.', r: 'She feels she has no true friend in whom she can confide.', key: 'a', sol: 'Both are true, and R explains A: the diary fills the place of the missing confidant.' }));
Q('ar_keesing', ar({ t: 3, d: 3, c: 'analysis', a: 'Mr Keesing set Anne a second essay.', r: 'Mr Keesing taught Anne mathematics.', key: 'b', sol: 'Both are true, but teaching maths does not explain the second essay; she kept talking after the first.' }));
Q('ar_alone', ar({ t: 2, d: 3, c: 'analysis', a: 'Anne has no family or acquaintances to turn to.', r: 'Anne feels she lacks one close friend to share her inner thoughts with.', key: 'd', sol: 'A is false: she has a loving family and many friends. R is true: what she lacks is a confidant.' }));
Q('ar_poem', ar({ t: 3, d: 3, c: 'analysis', a: 'Mr Keesing read Anne\'s poem to several classes.', r: 'Mr Keesing was angry at being made fun of in the poem.', key: 'c', sol: 'A is true. R is false: he took the joke in good humour, which is why he shared it.' }));

Q('tf_maths', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: maths was the only subject Anne was unsure about passing.', ans: true, sol: 'She felt confident about everything except maths.' }));
Q('tf_hiding', tf({ t: 1, d: 3, c: 'understanding', stem: 'True or false: Anne wrote the entries in this extract while she was already in hiding.', ans: false, sol: 'They date from June 1942, a few weeks before the family went into hiding.' }));
Q('tf_essay1', tf({ t: 3, d: 2, c: 'recall', stem: 'True or false: Mr Keesing laughed at Anne\'s arguments in her first essay.', ans: true, sol: 'He was amused, though he punished her again when she kept talking.' }));
Q('tf_grandma', tf({ t: 1, d: 2, c: 'recall', stem: 'True or false: Anne\'s grandmother was alive and well when Anne began the diary.', ans: false, sol: 'Her grandmother had died in January 1942; Anne still thought of her with love.' }));

Q('ord_life', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events from Anne\'s life sketch in chronological order.',
  items: ['Margot is born in Frankfurt.', 'Anne is born in Frankfurt.', 'Anne\'s father moves to Holland.', 'Anne and Margot stay with their grandmother in Aachen.', 'Anne joins her family in Holland.', 'Anne starts at a Montessori nursery school.'],
  sol: '1926 Margot → 1929 Anne → 1933 father to Holland → the girls in Aachen → Anne joins the family → nursery school.',
}));
Q('ord_essays', ord({
  t: [3, 1], d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the events of Anne\'s contest with Mr Keesing in order.',
  items: ['Mr Keesing warns Anne several times about talking.', 'He sets an essay on being a chatterbox.', 'Anne argues that talking runs in her family.', 'He sets a second essay calling her incorrigible.', 'He sets a third, sillier title about quacking.', 'Anne and Sanne write a poem, which he reads to several classes.'],
  sol: 'Warnings → essay 1 → her arguments → essay 2 → essay 3 → the poem and its success.',
}));

Q('mt_people', match({
  t: [1, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each person with their description in the chapter.',
  pairs: [['Margot', 'Anne\'s elder sister'], ['Mr Keesing', 'the maths teacher who set the essays'], ['Mrs Kuperus', 'the headmistress who taught Anne in the sixth form'], ['Sanne', 'the friend who helped write the poem']],
  sol: 'People named in the chapter, in SOYL\'s words.',
}));
Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word with its meaning.',
  pairs: [['incorrigible', 'impossible to correct or reform'], ['listless', 'lacking energy or interest'], ['musings', 'quiet, thoughtful reflections'], ['fogey', 'an old-fashioned, dull person']],
  sol: 'Words from the chapter with their meanings.',
}));
Q('mt_features', match({
  t: [4, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of the extract with what it achieves.',
  pairs: [['Writing in the first person', 'honest, personal feelings'], ['Addressing the diary as Kitty', 'a warm, conversational tone'], ['The betting boys and the essays', 'humour and liveliness'], ['The sketch of her life', 'background for the reader']],
  sol: 'Each feature and its effect.',
}));
