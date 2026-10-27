// CBSE 10 English Language and Literature, ch30 "Bholi" (K. A. Abbas) — question bank.
// LITERATURE RULE (CONTEXT §8, D-036): the story is in copyright. Everything here is written in SOYL's own
// words at the level of events and ideas; no sentence, phrase or line of dialogue of the story appears,
// and speech is reported. Passages are SOYL commentary (passage_origin: soyl-commentary). Students read
// the story in Footprints without Feet.
// SENSITIVITY: Bholi's disability, her appearance after smallpox, her stammer, dowry and the neglect of
// girls are treated with respect and age-appropriately. Her condition is described plainly and never
// used as a label; mockery is presented as wrong; dowry is identified as a crime under Indian law.
// BOARD PATTERN: the supplementary reader is examined through 3-mark short answers (40–50 words) and a
// 6-mark long answer (100–120 words) on character, theme and values, not through extracts. The bank is
// weighted that way (14 three-mark, 9 long); the 5 commentary passages fill the generic chapter-test
// blueprint's Section A slots.
// Topics: t01 context and summary · t02 themes (education and confidence; dowry and gender discrimination)
// · t03 Bholi's transformation · t04 exam practice.
// Facts deliberately left out (cannot be confirmed without the text): Bholi's age at each stage, the number
// of her brothers and sisters, the year the school opened, Bishamber's age, what Bholi did with the
// wedding garland, and the exact words of the teacher, the mother and Bholi.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = "*(This passage is SOYL's commentary on the story, not an extract from it. Read the chapter itself in your supplementary reader, Footprints without Feet.)*";
const SRC_STEM = `*Bholi* (K. A. Abbas): read the commentary and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point from the story (event or detail)', 1], ['Explanation or inference linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point from the story', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: relevant points from the story, accurately used', 3], ['Interpretation / extrapolation: a clear view on character, theme or values, supported by the story', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ commentary passages (blueprint Section A slots)
Q('src_neglect', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Abbas begins by showing us a child the world has written off. Sulekha, a daughter of Ramlal, a village official, is known to everyone by a nickname, Bholi, that means a simple one. A fall in infancy affected her development, and an attack of smallpox left deep marks on her face. She stammers, so other children mock her, and she speaks less and less. Even at home she is treated as a burden: her sisters are married off, while her parents quietly assume no one will ever want her. The story asks us to notice how much of Bholi's silence is caused not by her condition but by the way people treat her.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'What was Bholi’s real name?', opts: ['Sulekha', 'Lakshmi', 'Radha', 'Mangla'], sol: 'Her real name was Sulekha; Bholi was a nickname.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'Bholi’s face carried deep marks left by an attack of ___ when she was small.', acc: [['smallpox']], sol: 'An attack of **smallpox** marked her face.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Why did Bholi speak very little as a child?', opts: ['She stammered and other children mocked her.', 'She was not allowed to speak at home.', 'She spoke a different language.', 'She was always busy with work.'], sol: 'Her stammer drew mockery, so she withdrew.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'According to the commentary, what is the main cause of Bholi’s silence?', model: 'The way people treat her: mockery and neglect, rather than her condition itself, push her into silence.', sol: 'Society’s treatment, not her condition, silences her.', scheme: [['Others’ mockery and neglect, not the condition itself', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'How does the story want readers to see the mockery Bholi faces?', opts: ['as cruel and harmful', 'as harmless fun', 'as her own fault', 'as a good way to make her stronger'], sol: 'The story shows how mockery wounds and silences a child.' })),
  ],
  sol: 'Parts (a)–(c) recall her childhood; (d) and (e) ask what the story suggests about how she was treated.',
}));
Q('src_school_sent', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Bholi reaches school almost by accident. When a primary school for girls opens in the village, the Tehsildar who comes to open it tells Ramlal that, as an official, he should set an example by sending his daughters. Ramlal's wife resists: she fears that schooling will harm the marriage chances of her other daughters. Bholi, however, is a different matter. Since her parents believe nobody will marry her anyway, they decide that she is the one who can be spared. The decision is made for the wrong reasons, yet it opens the only door that leads Bholi out of her silence.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Who told Ramlal to set an example by sending his daughters to school?', opts: ['the Tehsildar', 'the teacher', 'Bishamber Nath', 'the village priest'], sol: 'The Tehsildar, opening the school, urged him to set an example.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Bholi’s mother not want her other daughters to go to school?', opts: ['She feared it would spoil their chances of marriage.', 'She thought the school was too far.', 'She needed them to look after the cattle.', 'She did not trust the teacher.'], sol: 'She feared educated girls would be harder to marry off.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'Bholi was sent to school because her parents thought no one would ___ her.', acc: [['marry']], sol: 'They believed no one would **marry** her.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary say the decision was made for the wrong reasons?', model: 'Her parents sent her not because they valued her education but because they had given up hope of her marriage.', sol: 'She was sent because she was considered unmarriageable, not to help her learn.', scheme: [['Sent out of neglect, not belief in her education', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'What attitude towards girls does this episode expose?', opts: ['that marriage mattered more than a girl’s education', 'that girls should be the first to study', 'that schools were only for wealthy families', 'that teachers were feared in the village'], sol: 'Girls’ education was seen as a threat to marriage, not a right.' })),
  ],
  sol: 'An official’s pressure and a parent’s neglect combine to send Bholi to school.',
}));
Q('src_teacher', source({
  t: [1, 3], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Bholi arrives at school frightened. Her mother had bathed her, oiled her hair and dressed her in clean clothes, and Bholi, remembering that the family cow had been cleaned up in the same way before being sold, wonders where she is being sent. In the classroom, though, she meets something new: a teacher who speaks to her gently and patiently. When Bholi struggles to say her name, the teacher does not laugh. She encourages her, gives her a book full of pictures, and promises that if Bholi keeps coming and learning, she will one day speak without stammering and be respected by everyone. For the first time, someone expects something good of her.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'Why was Bholi frightened when she was bathed and dressed for school?', opts: ['The family cow had been cleaned up like that before being sold.', 'She thought she was going to a hospital.', 'She disliked new clothes.', 'Her sisters had warned her about the teacher.'], sol: 'She feared she too was being sent away, like the cow.' })),
    child('b', fb({ t: 1, d: 2, c: 'recall', stem: 'The teacher gave Bholi a book full of ___.', acc: [['pictures', 'illustrations', 'colourful pictures']], sol: 'It was a book full of **pictures**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'How did the teacher respond when Bholi stammered over her name?', opts: ['She spoke gently and encouraged her.', 'She laughed with the class.', 'She sent her home.', 'She scolded her for being slow.'], sol: 'The teacher was patient and kind.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why is the teacher’s promise so important to Bholi?', model: 'It is the first time anyone has believed in her, and it gives her hope that she can speak freely and be respected.', sol: 'Belief and hope from another person.', scheme: [['First experience of someone believing in her; gives hope', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the story suggest through the teacher’s treatment of Bholi?', opts: ['Kindness and education can awaken a neglected child.', 'Strict discipline is the best teacher.', 'Some children cannot learn at all.', 'Books matter more than teachers.'], sol: 'Patience and encouragement transform Bholi.' })),
  ],
  sol: 'Contrast her fear at home (a) with the kindness at school (c–e).',
}));
Q('src_proposal', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "Years later a proposal arrives that Bholi's parents think they cannot refuse. Bishamber Nath, a prosperous grocer from another village, is willing to marry her. He is much older, he walks with a limp, and he already has grown-up children from an earlier marriage, but he has asked for no dowry. To Ramlal and his wife this seems like a lucky escape from a lifelong worry. Nobody asks Bholi what she thinks. The arrangement shows how her parents still see her: not as a person with a voice, but as a problem to be settled as cheaply and quickly as possible.",
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who was Bishamber Nath?', opts: ['a prosperous grocer from another village', 'Bholi’s teacher’s brother', 'the Tehsildar', 'a young farmer from Bholi’s village'], sol: 'He was a well-off grocer from another village.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why did Bholi’s parents accept Bishamber’s proposal so readily?', opts: ['He had not asked for a dowry, and they feared no one else would marry her.', 'He was young and handsome.', 'Bholi had chosen him herself.', 'The teacher had arranged it.'], sol: 'No dowry was demanded, and they had given up hope of any other match.' })),
    child('c', fb({ t: 1, d: 2, c: 'recall', stem: 'Bishamber was much older than Bholi, walked with a ___, and had grown-up children.', acc: [['limp']], sol: 'He walked with a **limp**.' })),
    child('d', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the commentary mean by *a problem to be settled*?', model: 'Her parents treat her marriage as a burden to get rid of, not as a choice that concerns her own happiness.', sol: 'She is treated as a burden, not a person.', scheme: [['Marriage seen as disposing of a burden, not her happiness', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which social problem does the proposal episode highlight?', opts: ['girls being married off without being asked', 'too many schools in villages', 'grocers charging high prices', 'people refusing to travel'], sol: 'Bholi’s consent is never sought.' })),
  ],
  sol: 'Part (d) links the arrangement to how girls were valued.',
}));
Q('src_refusal', source({
  t: [1, 3], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: "The wedding becomes the story's turning point. When Bishamber sees the marks on Bholi's face, he suddenly demands a large dowry of 5,000 rupees before he will go ahead. Ramlal pleads with him and humbles himself before the guests, then brings the money. At that moment Bholi, who has hardly spoken in front of others all her life, refuses to marry such a greedy man. She speaks clearly and without stammering. When her father worries about her future, she calmly answers that she will look after her parents in their old age and teach at the school where she learnt. In the background, her teacher watches with quiet pride.",
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'recall', stem: 'What did Bishamber demand at the wedding?', opts: ['a dowry of 5,000 rupees', 'a house in the town', 'a new shop', 'an apology from Bholi'], sol: 'He suddenly demanded 5,000 rupees as dowry.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'At the wedding Bholi spoke clearly and without ___.', acc: [['stammering', 'a stammer', 'stuttering']], sol: 'She spoke without **stammering**.' })),
    child('c', mcq({ t: 3, d: 2, c: 'understanding', stem: 'What did Bholi say she would do after refusing to marry Bishamber?', opts: ['care for her parents and teach at her school', 'leave the village for the city', 'marry someone her teacher chose', 'open a grocery shop'], sol: 'She planned to look after her parents and teach.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Was Bholi right to refuse the marriage? Give one reason.', model: 'Yes; a man who demanded dowry and mocked her face would never respect her, so marrying him would mean a life of humiliation.', sol: 'Reward a supported view; most answers will agree, citing greed or self-respect.', scheme: [['A view with one reason from the story', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the teacher watch with quiet pride?', opts: ['Bholi’s courage shows the success of her teaching.', 'She is glad the wedding has ended.', 'She wanted Bishamber to leave.', 'She will receive the dowry money.'], sol: 'The confident Bholi is the result of years of education and encouragement.' })),
  ],
  sol: 'Part (d) has no single right answer; reward a supported view.',
}));

// ================================================================ short answers, 3 marks (40–50 words) — the board's Q9 form
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_neglected', short({
  ...SA3, t: [1, 3], d: 2, c: 'understanding',
  stem: 'Why was Bholi neglected by her family and others as a child? Answer in 40–50 words.',
  model: 'A fall in infancy affected Bholi’s development, smallpox left marks on her face, and she stammered. Other children mocked her, and her parents saw her as unlikely ever to marry. Treated as a burden rather than a child with feelings, she grew quiet, fearful and withdrawn.',
  sol: 'Her condition (fall, smallpox, stammer) + how others reacted (mockery, low expectations) + the effect on her.',
}));
Q('sa_why_school', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'How did Bholi come to be sent to school? Answer in 40–50 words.',
  model: 'When a girls’ school opened in the village, the Tehsildar urged Ramlal, as an official, to set an example by sending his daughters. His wife feared schooling would spoil the other girls’ marriage chances, so they sent Bholi, believing nobody would marry her anyway.',
  sol: 'The Tehsildar’s advice + the mother’s fear + the reason Bholi was chosen.',
}));
Q('sa_cow', short({
  ...SA3, t: [1, 3], d: 3, c: 'analysis',
  stem: 'Why was Bholi afraid when her mother bathed and dressed her for school? What does this show about her life? Answer in 40–50 words.',
  model: 'Bholi had seen the family cow cleaned and decorated before it was sold, so she feared she too was being sent away. Being bathed and given clean clothes was so unusual for her that it alarmed her, which shows how little care she normally received.',
  sol: 'The comparison with the cow + why it frightened her + what it reveals (neglect).',
}));
Q('sa_teacher_role', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'What part did the teacher play in changing Bholi’s life? Answer in 40–50 words.',
  model: 'The teacher treated Bholi with a gentleness she had never known. She did not laugh at her stammer, gave her a picture book and promised that learning would help her speak freely and earn respect. Her patience and belief gave Bholi hope, confidence and, later, a voice.',
  sol: 'How the teacher treated her + what she gave and promised + the lasting effect.',
}));
Q('sa_transformation', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Trace Bholi’s transformation from a frightened child to a confident young woman. Answer in 40–50 words.',
  model: 'At first Bholi was silent, fearful and mocked, believed by everyone to be worthless. At school a kind teacher encouraged her, and years of learning slowly built her confidence. By her wedding day she could speak clearly and stand up for herself, refusing a greedy bridegroom before everyone.',
  sol: 'Before (silent, fearful) + the turning point (school, teacher) + after (confident, outspoken).',
}));
Q('sa_proposal', short({
  ...SA3, t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why did Bholi’s parents accept Bishamber Nath’s proposal? Answer in 40–50 words.',
  model: 'Bishamber was a prosperous grocer who had asked for no dowry. Although he was much older, walked with a limp and had grown-up children, Bholi’s parents feared no one else would ever marry her. They saw the proposal as a lucky chance and never asked Bholi’s opinion.',
  sol: 'His apparent advantages (wealth, no dowry) + his drawbacks + the parents’ fear + Bholi not consulted.',
}));
Q('sa_dowry_scene', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'What happened at Bholi’s wedding when Bishamber saw her face? Answer in 40–50 words.',
  model: 'Seeing the smallpox marks on her face, Bishamber suddenly demanded a dowry of 5,000 rupees before going ahead. Ramlal begged him and humbled himself before the guests, then brought the money. At that point Bholi refused to marry such a greedy man.',
  sol: 'The demand and its cause + Ramlal’s pleading and payment + Bholi’s refusal.',
}));
Q('sa_refusal', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Why did Bholi refuse to marry Bishamber, and what does her refusal show? Answer in 40–50 words.',
  model: 'Bholi refused because Bishamber was greedy and had humiliated her father by demanding dowry. He clearly did not respect her. Her refusal shows the self-respect and courage that education had given her. The girl who once could barely speak now stood up publicly for herself.',
  sol: 'Reasons (greed, humiliation of her father, lack of respect) + what it shows (self-respect, courage, effect of education).',
}));
Q('sa_ramlal', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'What kind of father is Ramlal? Give evidence from *Bholi*. Answer in 40–50 words.',
  model: 'Ramlal cares about his family’s standing more than about Bholi’s happiness. He sends her to school only under the Tehsildar’s pressure, and he accepts an unsuitable groom without asking her. Yet he is not cruel: at the wedding he humbles himself to protect her, and he worries about her future.',
  sol: 'A judgement + evidence (school under pressure, the proposal, pleading at the wedding, his worry).',
}));
Q('sa_mother', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'How does Bholi’s mother’s attitude reflect the thinking of her society? Answer in 40–50 words.',
  model: 'Bholi’s mother believed that education would spoil a girl’s chances of marriage, and that a girl’s worth lay in being married off. She was ready to send Bholi to school only because she thought no one would marry her. Her views reflect a society that undervalued girls.',
  sol: 'Her beliefs about girls, school and marriage + how they reflect wider attitudes.',
}));
Q('sa_dowry_evil', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'How does *Bholi* expose the evil of dowry? Answer in 40–50 words.',
  model: 'The story shows dowry as greed dressed up as custom. Bishamber demands money at the last moment, knowing the family cannot back out, and Ramlal is humiliated before everyone. By having Bholi reject such a man, Abbas shows that dowry degrades both the bride and her family.',
  sol: 'The demand + the humiliation + Bholi’s rejection + the message about dowry.',
}));
Q('sa_education', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Education gave Bholi a voice. Do you agree? Answer in 40–50 words.',
  model: 'Yes. Before school Bholi stammered, felt worthless and barely spoke. At school a patient teacher and the habit of learning built her confidence. By her wedding day she could speak clearly, refuse a greedy groom and plan an independent future as a teacher. Education gave her a voice.',
  sol: 'A stand + before school + what school gave her + her voice at the wedding and her plans.',
}));
Q('sa_bholi_future', short({
  ...SA3, t: 3, d: 3, c: 'application',
  stem: 'What future did Bholi choose for herself, and why is this choice significant? Answer in 40–50 words.',
  model: 'Bholi chose to care for her parents in their old age and to teach at the village school where she had learnt. The choice is significant because she is no longer waiting to be married off. She becomes independent and useful, passing on the education that changed her life.',
  sol: 'Her plans + why they matter (independence, giving back, rejection of marriage as her only future).',
}));
Q('sa_title', short({
  ...SA3, t: [2, 4], d: 3, c: 'evaluation',
  stem: 'Is *Bholi* a suitable title for K. A. Abbas’s story? Give reasons in 40–50 words.',
  model: 'Yes. The nickname, meaning a simple one, shows how others saw her: as someone who did not matter. The story proves that view wrong. By the end the girl they called simple is the wisest person present, so the title becomes ironic and makes readers question such labels.',
  sol: 'A stand + what the nickname shows + how the story overturns it (irony).',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_name', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'What was Bholi’s real name, and why was she called Bholi? Answer in 30–40 words.',
  model: 'Her real name was Sulekha. People called her Bholi, meaning a simple one, because a childhood injury had affected her development and she was slow to speak. The nickname showed how little they thought of her.',
  sol: 'Real name + meaning and reason for the nickname.',
}));
Q('sb_tehsildar', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'Why did the Tehsildar want Ramlal to send his daughters to school? Answer in 30–40 words.',
  model: 'Ramlal was an official in the village, so the Tehsildar felt that if he sent his daughters to the new girls’ school, other villagers would follow his example and educate their girls too.',
  sol: 'Ramlal’s position + the idea of setting an example.',
}));
Q('sb_first_day', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Bholi feel on her first day at school, and why did this change? Answer in 30–40 words.',
  model: 'At first Bholi was frightened and tearful among strangers. Her fear eased when the teacher spoke to her kindly, did not mock her stammer, and gave her a picture book and hope.',
  sol: 'Initial fear + the teacher’s kindness that changed it.',
}));
Q('sb_pleads', short({
  ...SA2, t: [1, 3], d: 2, c: 'understanding',
  stem: 'How did Ramlal respond to Bishamber’s dowry demand? Answer in 30–40 words.',
  model: 'Ramlal begged Bishamber not to humiliate the family before the guests and humbled himself at his feet. When Bishamber would not relent, Ramlal brought the money to save the wedding.',
  sol: 'His pleading + his giving in.',
}));
Q('sb_teacher_watch', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'Why is it fitting that Bholi’s teacher watches her refusal at the end? Answer in 30–40 words.',
  model: 'The confident young woman who refuses Bishamber is the result of the teacher’s years of patience. Her presence reminds us that education and encouragement, not luck, have given Bholi her voice and her courage.',
  sol: 'The teacher’s role in Bholi’s change + what her presence underlines.',
}));
Q('sb_law', short({
  ...SA2, t: 2, d: 3, c: 'application',
  stem: 'What does Indian law say about dowry, and how does this connect with *Bholi*? Answer in 30–40 words.',
  model: 'Giving or taking dowry is a crime in India under the Dowry Prohibition Act of 1961. Bishamber’s demand was therefore not only greedy but illegal, which makes Bholi’s refusal even more justified.',
  sol: 'The law (dowry is a crime) + the link to Bishamber’s demand.',
}));

// ================================================================ long answers, 6 marks (100–120 words) — the board's long-answer form
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_bholi_sketch', long({
  ...LA, t: [4, 3], d: 3, c: 'analysis',
  stem: 'Trace the development of Bholi’s character from childhood to her wedding day. Answer in 100–120 words.',
  model: 'As a child, Bholi is silent and fearful. A fall in infancy has affected her development, smallpox has marked her face, and she stammers. Mocked by other children and treated as a burden by her parents, she withdraws. She is sent to school only because no one expects her to marry. There, a gentle teacher changes everything. Instead of laughing, she encourages Bholi, gives her a picture book and promises that learning will bring her a voice and respect. Years of education slowly build Bholi’s confidence. On her wedding day, when the groom demands dowry, she speaks clearly, refuses him and chooses an independent future. Bholi grows from a neglected child into a strong, self-respecting woman.',
  sol: 'Stages: childhood (silence, neglect) → school (the teacher’s encouragement) → the wedding (courage, refusal, independence). Conclude with the nature of the change.',
}));
Q('la_education_theme', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Education is the key to empowering girls. Discuss with reference to *Bholi*. Answer in 100–120 words.',
  model: 'Bholi’s story shows how education can empower a girl whom everyone has written off. Before school she cannot speak without stammering, feels worthless and is treated as a burden. Her parents send her to school only because they think nobody will marry her. Yet school gives her what her home never did: respect, patience and a belief that she can improve. Learning builds her confidence and her voice. On her wedding day she is able to judge Bishamber for what he is, refuse a greedy, dishonest marriage and plan to support herself as a teacher. Education does not simply teach Bholi to read; it gives her the courage and independence to decide her own future.',
  sol: 'A stand + Bholi before school + what school gave her + the wedding as proof + a general conclusion about girls’ education.',
}));
Q('la_dowry_essay', long({
  ...LA, t: [4, 2], d: 4, c: 'evaluation',
  stem: 'Dowry is a social evil that must be ended. Write your view with reference to *Bholi*, in 100–120 words.',
  model: 'Dowry turns marriage into a business deal and treats a girl as a burden to be paid for. Bholi’s story shows this clearly. Bishamber agrees to marry her without dowry, but at the wedding, seeing the marks on her face, he demands 5,000 rupees, knowing her family will feel trapped. Her father is forced to beg before the guests and then pay. Such demands humiliate families and hurt girls’ dignity. Although dowry has been a crime in India since 1961, it continues in many places. Ending it needs strict enforcement of the law, but also courage like Bholi’s. When educated girls and their families refuse greedy grooms, dowry loses its power.',
  sol: 'A stand + the dowry scene as evidence + the harm to girls and families + the law + how it can be ended (law, education, courage).',
}));
Q('la_teacher_tribute', long({
  ...LA, t: [4, 3], d: 4, c: 'analysis',
  stem: 'A good teacher can change a child’s life. Discuss the role of Bholi’s teacher in the story, in 100–120 words.',
  model: 'Bholi’s teacher is the turning point of her life. When Bholi first arrives at school, she is frightened and expects to be mocked, because that is all she has known. The teacher responds with gentleness. She does not laugh at Bholi’s stammer; she speaks kindly, gives her a picture book and promises that if she keeps learning, she will speak freely and be respected. For the first time someone expects something good of Bholi. Over the years this patient belief builds her confidence. On her wedding day Bholi’s courage is the fruit of that teaching, and the teacher watches with pride. The story shows that one caring teacher can give a neglected child a new life.',
  sol: 'The teacher’s approach (gentle, encouraging, hopeful) + its effect over the years + the wedding as proof + a general point about teachers.',
}));
Q('la_diary_bholi', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are Bholi. Write a diary entry on the night of your wedding day. Answer in 100–120 words.',
  model: 'Night\n\nToday my wedding was stopped, and I stopped it. When the groom saw my face, he demanded money from my father before he would marry me. I watched Father beg and pay, and something inside me rose up. I spoke before everyone, clearly, without stumbling once. I told them I would not marry a greedy man who did not respect us. Father asked who would marry me now. I told him I would care for him and Mother when they are old and teach at my school. My teacher was there, smiling. Years ago she told me I could learn to speak without fear. Tonight I know she was right. I am not a burden.',
  sol: 'Diary format (first person, feelings, reflection). Content consistent with the story: the demand, her father’s humiliation, her refusal, her plans, the teacher. Reported speech, not the story’s dialogue.',
}));
Q('la_ramlal_letter', long({
  ...LA, t: [4, 1], d: 4, c: 'application', bloom: 'create',
  stem: 'As Bholi’s teacher, write a letter to Ramlal a few days after the wedding, explaining why you are proud of Bholi and how he can support her. Answer in 100–120 words.',
  model: 'Respected Ramlal ji,\n\nI write about Bholi, whom I have watched grow since her first frightened day in my class. At the wedding, many saw only a broken arrangement. I saw a young woman who had found her voice. She refused a man who demanded dowry and shamed your family, and she spoke clearly before everyone. Please do not think of her refusal as a misfortune. Bholi is intelligent and kind, and she wishes to teach at our school and care for you both. I would be glad to have her help me with the younger girls. With your support she will be a source of pride to your family and our village.\n\nYours sincerely,\nThe teacher',
  sol: 'Formal letter format. Content consistent with the story: her growth, the refusal, her courage, her plans. A persuasive request for support.',
}));
Q('la_gender', long({
  ...LA, t: [4, 2], d: 4, c: 'analysis',
  stem: 'How does *Bholi* show discrimination against girls in society? Discuss in 100–120 words.',
  model: 'The story shows discrimination against girls at every step. Bholi’s parents regard daughters chiefly as people to be married off. Her mother believes that schooling will spoil a girl’s marriage chances, so education is seen as a risk rather than a right. Bholi is sent to school only because her parents think no one will marry her. When a proposal comes, nobody asks for her opinion, and she is matched with a much older man simply because he asks no dowry. At the wedding, the groom demands money on seeing her face, treating her as goods to be priced. Abbas shows how such attitudes silence girls, and how education can help them answer back.',
  sol: 'Examples: views on girls and marriage, education seen as a risk, no consent sought, dowry treating her as goods. Conclude with the story’s answer (education).',
}));
Q('la_bholi_speech', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Years later, Bholi is invited to speak to parents at the opening of a new girls’ school. Write her speech in 100–120 words.',
  model: 'Respected parents and dear children, when I was a child, people believed I would never amount to anything. I stammered, my face was marked, and I was mocked. My family sent me to school only because they thought nobody would marry me. Yet that school changed my life. A patient teacher believed in me, and learning gave me the courage to speak. When a bridegroom demanded dowry at my wedding, I could say no. Today I teach in that same school. Please send your daughters to study, not because they are a burden but because they are a gift. An educated girl can stand up for herself and help her whole family. Thank you.',
  sol: 'Speech format (address, body, close). Content consistent with the story: her childhood, school, the teacher, the refusal, her teaching. A clear appeal to parents.',
}));
Q('la_title_long', long({
  ...LA, t: [4, 2], d: 3, c: 'evaluation',
  stem: 'Would *Sulekha* be a better title than *Bholi* for K. A. Abbas’s story? Give your view in 100–120 words.',
  model: 'Both titles have merit, but I think Bholi is the stronger choice. The nickname, meaning a simple one, captures how her family and village saw her: a girl who did not matter. Using it as the title makes us share that view at first, so that the ending, when she proves to be the wisest person at her wedding, strikes us with greater force. The title becomes ironic. Sulekha, her real name, would honour the self she finally claims, and an argument can be made that she deserves to be called by it. However, it would hide the prejudice the story attacks. Bholi keeps that prejudice in front of us and then overturns it.',
  sol: 'A clear stand + the meaning and irony of the nickname + what the real name would gain and lose + conclusion. A reasoned case for Sulekha can also earn full marks.',
}));

// ================================================================ objective items
Q('mc_author', mcq({ t: 1, d: 1, c: 'recall', stem: '*Bholi* was written by…', opts: ['K. A. Abbas', 'Ruskin Bond', 'R. K. Narayan', 'Premchand'], sol: 'The story is by Khwaja Ahmad Abbas.' }));
Q('mc_meaning', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What does the nickname Bholi suggest about how people saw Sulekha?', opts: ['that she was simple and did not matter', 'that she was clever and quick', 'that she was rich', 'that she was the eldest daughter'], sol: 'The nickname means a simple one and reflects their low opinion of her.' }));
Q('mc_father', mcq({ t: 1, d: 2, c: 'recall', stem: 'What was the position of Bholi’s father, Ramlal, in the village?', opts: ['a village official', 'a schoolteacher', 'a grocer', 'a doctor'], sol: 'Ramlal held an official position in the village.' }));
Q('mc_cow', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does Bholi’s memory of the cow being sold matter in the story?', opts: ['It shows that she felt treated like property, not a person.', 'It shows that she loved animals more than people.', 'It explains why she disliked school.', 'It shows her family was very rich.'], sol: 'She associated being cleaned up with being disposed of.' }));
Q('mc_teacher', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which word best describes Bholi’s teacher?', opts: ['encouraging', 'strict', 'careless', 'mocking'], sol: 'She was gentle, patient and encouraging.' }));
Q('mc_bishamber', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which quality does Bishamber show at the wedding?', opts: ['greed', 'generosity', 'humility', 'patience'], sol: 'He demanded money at the last moment.' }));
Q('mc_confidence', mcq({ t: [2, 3], d: 3, c: 'analysis', stem: 'What is the main source of Bholi’s confidence at the end of the story?', opts: ['her education and her teacher’s encouragement', 'the money her father gave her', 'advice from Bishamber', 'the support of the Tehsildar'], sol: 'Years of learning and encouragement gave her a voice.' }));
Q('mc_message', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Which message does *Bholi* most strongly convey?', opts: ['Education gives girls dignity and the courage to resist injustice.', 'Girls should obey every decision made for them.', 'Marriage is the only goal of a girl’s life.', 'Village schools are of little use.'], sol: 'Education transforms Bholi and lets her reject a greedy groom.' }));
Q('mc_apply', mcq({ t: [2, 3], d: 3, c: 'application', stem: 'A classmate who stammers is laughed at in your class. Which response follows the example of Bholi’s teacher?', opts: ['speaking to her patiently and encouraging her to take part', 'laughing along to fit in', 'ignoring her completely', 'asking her never to speak in class'], sol: 'The teacher’s patience and encouragement helped Bholi find her voice.' }));
Q('mc_law', mcq({ t: 2, d: 2, c: 'recall', fixed: true, key: 'c', stem: 'Under Indian law, demanding dowry, as Bishamber does in *Bholi*, is…', opts: ['a duty', 'a religious requirement', 'a crime', 'allowed if both families agree'], sol: 'Dowry has been illegal in India since 1961.' }));
Q('mc_irony', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'b', stem: 'What is ironic about the ending of *Bholi*?', opts: ['Bishamber becomes Bholi’s teacher.', 'The girl everyone called simple shows the most wisdom and courage.', 'The Tehsildar marries Bholi.', 'Bholi forgets how to read.'], sol: 'The one dismissed as simple judges best of all.' }));
Q('mc_narration', mcq({ t: 2, d: 3, c: 'analysis', fixed: true, key: 'd', stem: 'How is *Bholi* narrated?', opts: ['by Bholi, in the first person', 'by the teacher, as a letter', 'by Ramlal, as a diary', 'by a third-person narrator who tells the events'], sol: 'An outside narrator tells the story, sharing Bholi’s fears and feelings.' }));

Q('fb_cow', fb({ t: 1, d: 2, c: 'recall', stem: 'The family cow that had been cleaned up before being sold was called ___.', acc: [['Lakshmi', 'Laxmi']], sol: 'The cow was **Lakshmi**.' }));
Q('fb_groom', fb({ t: 1, d: 1, c: 'recall', stem: 'The grocer who proposed to marry Bholi was ___ Nath.', acc: [['Bishamber', 'Bishambar']], sol: 'He was **Bishamber** Nath.' }));
Q('fb_dowry', fb({ t: 1, d: 2, c: 'recall', stem: 'At the wedding the groom demanded a dowry of ___ rupees.', acc: [['5,000', '5000', 'five thousand']], sol: 'He demanded **5,000** rupees.' }));
Q('fb_plans', fb({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'After refusing the marriage, Bholi said she would care for her ___ and teach at the ___.', acc: [['parents'], ['school', 'village school']], sol: 'She would look after her **parents** and teach at the **school**.', scheme: [['parents', 0.5], ['school', 0.5]] }));

Q('ar_refuse', ar({ t: [2, 3], d: 3, c: 'analysis', a: 'Bholi refused to marry Bishamber.', r: 'Bishamber demanded a dowry and humiliated her father.', key: 'a', sol: 'Both are true, and R explains A.' }));
Q('ar_school', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'Bholi was sent to the new girls’ school.', r: 'Her parents believed education was the most important thing for every daughter.', key: 'c', sol: 'A is true. R is false: they sent her because they thought no one would marry her.' }));
Q('ar_stammer', ar({ t: 1, d: 3, c: 'analysis', a: 'Bholi stammered as a child.', r: 'A girls’ primary school was opened in her village.', key: 'b', sol: 'Both are true, but the opening of the school does not explain her stammer.' }));
Q('ar_teacher_mock', ar({ t: 3, d: 3, c: 'understanding', a: 'Bholi’s teacher laughed at her stammer on the first day.', r: 'Bholi’s teacher gave her a book full of pictures.', key: 'd', sol: 'A is false: the teacher was gentle. R is true.' }));

Q('tf_real_name', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: Bholi’s real name was Sulekha.', ans: true, sol: 'Bholi was a nickname.' }));
Q('tf_consulted', tf({ t: 2, d: 2, c: 'understanding', stem: 'True or false: Bholi’s parents asked her opinion before accepting Bishamber’s proposal.', ans: false, sol: 'Nobody asked her.' }));
Q('tf_stammer_end', tf({ t: 3, d: 2, c: 'understanding', stem: 'True or false: at her wedding, Bholi spoke without stammering.', ans: true, sol: 'She spoke clearly before everyone.' }));
Q('tf_married', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: at the end of the story Bholi marries Bishamber Nath.', ans: false, sol: 'She refuses to marry him.' }));

Q('ord_events', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these events from *Bholi* in the order in which they happen.',
  items: ['A girls’ school opens in the village.', 'Bholi is bathed and dressed and taken to school.', 'The teacher gives Bholi a picture book.', 'Bishamber Nath’s proposal is accepted.', 'Bishamber demands a dowry at the wedding.', 'Bholi refuses to marry him.'],
  sol: 'The school opens → Bholi is taken there → the picture book → the proposal → the dowry demand → the refusal.',
}));
Q('ord_growth', ord({
  t: [3, 2], d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the stages of Bholi’s transformation in order.',
  items: ['Mocked for her stammer, Bholi barely speaks.', 'She is frightened on her first day at school.', 'A kind teacher gives her hope.', 'Years of learning build her confidence.', 'She speaks out boldly at her wedding.'],
  sol: 'Silence → fear → hope → confidence → courage.',
}));

Q('mt_people', match({
  t: [1, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each character in *Bholi* with their part in the story.',
  pairs: [['Ramlal', 'Bholi’s father, a village official'], ['the Tehsildar', 'urged Ramlal to send his daughters to school'], ['the teacher', 'encouraged Bholi and gave her hope'], ['Bishamber Nath', 'demanded dowry at the wedding']],
  sol: 'Each character’s role.',
}));
Q('mt_words', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match these words used when studying *Bholi* with their meanings.',
  pairs: [['stammer', 'to speak with involuntary pauses and repeated sounds'], ['dowry', 'money or goods demanded from a bride’s family'], ['Tehsildar', 'a revenue officer in charge of a tehsil'], ['transformation', 'a complete change in character or condition']],
  sol: 'Key words for discussing this chapter.',
}));
Q('mt_traits', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each moment in *Bholi* with what it reveals.',
  pairs: [['Bholi fears she is being sold like the cow', 'how neglected she felt'], ['The teacher speaks gently to her', 'patience and kindness'], ['Bishamber demands money on seeing her face', 'greed and disrespect'], ['Bholi refuses him before the guests', 'courage and self-respect']],
  sol: 'Each moment and what it shows.',
}));
