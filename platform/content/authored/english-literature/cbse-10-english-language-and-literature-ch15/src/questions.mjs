// CBSE 10 English Language and Literature, ch15 "A Tiger in the Zoo" (Leslie Norris) — question bank.
// LITERATURE RULE (CONTEXT §8): the poem is in copyright. No line or phrase of it is reproduced; only the
// title and a few single words (stalks, lurking, snarling, fangs, terrorising, patrolling) appear. Stanzas
// are described by what happens, never paraphrased line by line. Passages are SOYL commentary.
import { Q, mcq, fb, short, long, tf, ar, match, ord, source, child } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const NOTE = '*(This passage is SOYL\'s commentary on the poem, not lines from it. Read the poem itself in your textbook, First Flight.)*';
const SRC_STEM = `Read the commentary on *A Tiger in the Zoo* and answer the questions that follow. ${NOTE}`;
const SCHEME3 = [['Relevant point about the poem', 1], ['Explanation or interpretation linked to the question', 1], ['Expression and accuracy within 40–50 words', 1]];
const SCHEME2 = [['Correct point about the poem', 1], ['Explanation in own words within 30–40 words', 1]];
const LONG_SCHEME = [['Content: accurate points about the poem', 3], ['Interpretation / extrapolation: a clear, supported view', 1], ['Organisation and expression; within 100–120 words', 2]];

// ================================================================ extract-based (SOYL commentary)
Q('src_pacing', source({
  t: [4, 1], d: 2, c: 'understanding', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem opens inside the enclosure. A tiger moves up and down a space so small that a few strides take him from one wall to the other. His bold markings are on full display, and his paws fall without a sound. Yet beneath that silence the poet detects fury, an anger that cannot be expressed and so simmers quietly. The first picture is already a contradiction: a creature built for power and speed, reduced to pacing. Norris lets the reader feel the cramped space before he shows us what has been lost.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'Where is the tiger at the start of *A Tiger in the Zoo*?', opts: ['inside a small enclosure', 'in a forest clearing', 'near a village', 'beside a river'], sol: 'The poem opens inside the tiger\'s small enclosure in the zoo.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What is the tiger doing in the opening stanza, according to the commentary?', opts: ['pacing up and down', 'sleeping peacefully', 'eating its food', 'playing with visitors'], sol: 'He moves up and down the cramped space.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says the tiger\'s anger cannot be expressed and so ___ quietly.', acc: [['simmers']], sol: 'The anger **simmers** quietly beneath the silence.' })),
    child('d', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Why does the commentary call the first picture of the tiger a contradiction?', model: 'A creature made for power and speed is shown merely pacing in a tiny space.', sol: 'Strength and freedom versus confinement.', scheme: [['Power/speed contrasted with pacing in a small space', 1]] })),
    child('e', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What does the commentary say Norris makes the reader feel first?', opts: ['the cramped space', 'the beauty of the forest', 'the fear of the villagers', 'the joy of the visitors'], sol: 'He shows the cramped enclosure before showing what has been lost.' })),
  ],
  sol: 'Answer from the commentary; parts (a) and (b) also follow from your reading of the poem.',
}));
Q('src_wild', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'In the middle stanzas the poet stops describing and starts imagining. Twice he insists on what the tiger ought to be doing, and both pictures are full of life. In one, the tiger is a hidden hunter, silent and patient, waiting near water for prey. In the other, he prowls at the edge of the forest where people live, showing his teeth and claws and filling the villagers with fear. These stanzas are not cruel; they are simply true to the tiger\'s nature. A tiger is meant to be feared, not stared at.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'What do the middle stanzas of *A Tiger in the Zoo* describe?', opts: ['what the tiger ought to be doing in the wild', 'what the tiger did yesterday', 'how the zoo was built', 'what the visitors are saying'], sol: 'They imagine the tiger\'s proper life in the wild.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In the first of these pictures, the tiger is shown as…', opts: ['a hidden, patient hunter', 'a sleeping pet', 'a frightened animal', 'a circus performer'], sol: 'He waits silently near water for prey.' })),
    child('c', fb({ t: 2, d: 2, c: 'understanding', stem: 'In the second picture, the tiger fills the ___ with fear.', acc: [['villagers', 'village', 'people']], sol: 'He frightens the **villagers** at the forest\'s edge.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'Why does the commentary say these stanzas are not cruel?', model: 'Hunting and frightening people are simply part of the tiger\'s nature.', sol: 'They are true to what a tiger is.', scheme: [['They reflect the tiger\'s natural behaviour', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'analysis', stem: 'What does the commentary mean by a tiger is meant to be feared, not stared at?', opts: ['In the wild he commands respect; in the zoo he is a spectacle.', 'Tigers dislike being photographed.', 'Visitors should not look at tigers.', 'Tigers are harmless in zoos.'], sol: 'Captivity turns a powerful predator into an object of display.' })),
  ],
  sol: 'Contrast what the tiger should be doing with what he is doing.',
}));
Q('src_cell', source({
  t: [4, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The fourth stanza snaps the reader back to reality with a single word of contrast. The tiger is shut in a bare, hard enclosure, and all his power is held back by iron. Once again he paces from end to end. He pays no attention to the people who come to look at him. That indifference is not dullness; it is a kind of dignity. He will not perform for those who keep him prisoner, and he will not pretend that the cage is his home.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does the fourth stanza of *A Tiger in the Zoo* change the direction of the poem?', opts: ['It returns from the imagined wild to the reality of the zoo.', 'It describes a hunt in detail.', 'It tells how the tiger escapes.', 'It describes the zoo keeper.'], sol: 'A word of contrast brings us back to the cage.' })),
    child('b', mcq({ t: 1, d: 2, c: 'recall', stem: 'How does the tiger treat the visitors?', opts: ['He takes no notice of them.', 'He roars at them.', 'He begs them for food.', 'He plays with them.'], sol: 'He pays no attention to those who come to look.' })),
    child('c', fb({ t: 2, d: 3, c: 'analysis', stem: 'The commentary says the tiger\'s indifference is not dullness but a kind of ___.', acc: [['dignity']], sol: 'It is a kind of **dignity**.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What does the commentary suggest the tiger refuses to do?', model: 'He refuses to perform for his captors or to accept the cage as home.', sol: 'His indifference is a silent refusal.', scheme: [['Refuses to perform or accept the cage', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How is the tiger\'s strength described as being controlled in this stanza?', opts: ['It is held back by iron.', 'It is lost through old age.', 'It is used to entertain people.', 'It is weakened by hunger.'], sol: 'His power is restrained by the iron of the enclosure.' })),
  ],
  sol: 'Explain the return to reality and what the tiger\'s indifference shows.',
}));
Q('src_stars', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem ends after dark. The visitors have gone; the tiger listens to the final human sounds of the day and the vehicles that make their rounds of the grounds. Then he gazes upward at the stars. Norris uses the same shining adjective for the tiger\'s eyes and for the stars, linking them. The stars are free, distant and untouchable, like the life the tiger has lost. His eyes still shine, so his wild spirit has not been put out. The ending is quiet, lonely and full of longing, and it leaves the reader uneasy.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'recall', stem: 'At what time of day does *A Tiger in the Zoo* end?', opts: ['after dark', 'at dawn', 'at noon', 'at feeding time'], sol: 'The final stanza is set after dark.' })),
    child('b', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Why does the poet use the same adjective for the tiger\'s eyes and the stars?', opts: ['to link the tiger with the freedom the stars represent', 'to show that the tiger is blind', 'to describe the zoo lights', 'to make the poem rhyme'], sol: 'The shared brightness connects the tiger to the free, distant world.' })),
    child('c', fb({ t: 3, d: 2, c: 'understanding', stem: 'The commentary says the stars are free, distant and ___.', acc: [['untouchable']], sol: 'They are **untouchable**, like the life the tiger has lost.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What does it suggest that the tiger\'s eyes still shine?', model: 'That his wild spirit has not been destroyed by captivity.', sol: 'Captivity has not broken his inner nature.', scheme: [['Wild spirit still alive', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which words best describe the mood of the final stanza?', opts: ['quiet, lonely and full of longing', 'noisy and cheerful', 'angry and violent', 'busy and excited'], sol: 'The ending is quiet, lonely and longing.' })),
  ],
  sol: 'Explain the setting of the final stanza and what the stars stand for.',
}));
Q('src_structure', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'The poem has five stanzas of four lines, and its shape mirrors its argument. The first and fourth stanzas show the cage; the second and third, placed between them, show the wild. The wild stanzas are literally enclosed by the cage stanzas, just as the tiger\'s memory of freedom is enclosed by walls. The rhyme is loose: in most stanzas the second and fourth lines rhyme or nearly rhyme. The final stanza steps outside this pattern into the night, turning the poem from description to longing.',
  parts: [
    child('a', fb({ t: 3, d: 1, c: 'recall', stem: '*A Tiger in the Zoo* has ___ stanzas of four lines each.', acc: [['five', '5']], sol: 'It has **five** stanzas (quatrains).' })),
    child('b', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Which stanzas of *A Tiger in the Zoo* show the tiger in the wild, according to the commentary?', opts: ['the second and third', 'the first and fourth', 'only the fifth', 'all five'], sol: 'Stanzas 2 and 3 imagine the wild.' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'How does the poem\'s shape mirror its meaning, according to the commentary?', opts: ['The wild stanzas are enclosed by cage stanzas, as freedom is enclosed by walls.', 'Each stanza is longer than the final.', 'The stanzas get shorter as the tiger gets tired.', 'The stanzas follow the seasons.'], sol: 'Form imitates confinement.' })),
    child('d', short({ t: 3, d: 3, c: 'understanding', marks: 1, stem: 'Describe the rhyme of *A Tiger in the Zoo* in one sentence.', model: 'It is loose: in most stanzas the second and fourth lines rhyme or nearly rhyme.', sol: 'Loose rhyme, mainly in lines 2 and 4.', scheme: [['Loose rhyme in lines 2 and 4', 1]] })),
    child('e', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What change does the final stanza bring, according to the commentary?', opts: ['from description to longing', 'from sadness to joy', 'from the zoo to the jungle', 'from night to day'], sol: 'It steps outside the pattern into a mood of longing.' })),
  ],
  sol: 'For form questions, count stanzas and lines, mark the rhymes and link the structure to the meaning.',
}));
Q('src_devices', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Norris packs the opening stanza with sound. Repeated s sounds hiss through it, imitating the soft, restless movement of the tiger. He describes the paws through a comparison with a soft, rich fabric, so that we hear their silence. Most striking is a pair of words that seem to cancel each other out, one meaning silence and one meaning fury. Such a pairing is called an oxymoron. It perfectly captures an animal whose anger is real but has no outlet, a rage that must stay silent because there is nothing it can do.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'Repeated consonant sounds, like the s sounds in the opening stanza of *A Tiger in the Zoo*, are called…', opts: ['alliteration', 'personification', 'hyperbole', 'onomatopoeia'], sol: 'The repetition of s sounds is alliteration.' })),
    child('b', fb({ t: 3, d: 2, c: 'recall', stem: 'A pair of words with opposite meanings placed together is called an ___.', acc: [['oxymoron']], sol: 'It is an **oxymoron**.' })),
    child('c', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What does the comparison of the paws with a soft fabric suggest?', opts: ['that the tiger moves silently', 'that the tiger is wearing clothes', 'that the paws are injured', 'that the tiger is old'], sol: 'Soft, rich fabric suggests silent movement.' })),
    child('d', short({ t: 3, d: 4, c: 'analysis', marks: 1, stem: 'Why is an oxymoron suitable for the tiger\'s feelings?', model: 'His anger is real but has no outlet, so it must stay silent.', sol: 'Silent fury captures helpless anger.', scheme: [['Real anger with no outlet', 1]] })),
    child('e', mcq({ t: 3, d: 2, c: 'understanding', stem: 'According to the commentary, what do the hissing s sounds imitate?', opts: ['the tiger\'s soft, restless movement', 'the noise of visitors', 'the sound of rain', 'the roar of the tiger'], sol: 'They imitate soft, restless movement.' })),
  ],
  sol: 'Name each device, then explain what it shows about the tiger.',
}));
Q('src_message', source({
  t: [2, 4], d: 3, c: 'evaluation', origin: 'soyl-commentary',
  stem: SRC_STEM,
  passage: 'Norris never states an opinion about zoos. He does not need to. By placing the confined tiger beside the free one, he lets the contrast make the argument. Readers come away asking uncomfortable questions. Is it right to remove a wild animal from its home for our entertainment? Does a zoo protect animals or merely display them? Some modern zoos work to save endangered species, and readers may weigh that against the poem. But the poem\'s sympathy is clear: it stands with the tiger, and with every creature denied the life it was born for.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'How does Norris make his argument in *A Tiger in the Zoo*, according to the commentary?', opts: ['through contrast, not direct statement', 'through a long speech', 'through statistics', 'through a story about a zoo keeper'], sol: 'He places the caged and free tiger side by side.' })),
    child('b', fb({ t: 2, d: 2, c: 'understanding', stem: 'The commentary says the poem\'s ___ is clearly with the tiger.', acc: [['sympathy']], sol: 'Its **sympathy** is with the tiger.' })),
    child('c', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which question does the commentary say readers are left asking?', opts: ['whether it is right to remove wild animals for our entertainment', 'how much a zoo ticket costs', 'how old the tiger is', 'where the poet lived'], sol: 'The poem raises the ethics of captivity.' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 1, stem: 'What point in favour of zoos does the commentary mention?', model: 'Some modern zoos work to save endangered species.', sol: 'Conservation is the counter-argument.', scheme: [['Conservation of endangered species', 1]] })),
    child('e', mcq({ t: 2, d: 3, c: 'application', stem: 'Which action would best match the sympathy of *A Tiger in the Zoo*?', opts: ['supporting a wildlife sanctuary where tigers roam freely', 'buying a parrot to keep in a cage', 'visiting a circus with performing animals', 'keeping a fish in a small bowl'], sol: 'A sanctuary lets animals live naturally, which the poem values.' })),
  ],
  sol: 'Theme questions: state the idea, then connect it to the contrast in the poem and to life today.',
}));

// ================================================================ short answers, 3 marks (40–50 words)
const SA3 = { marks: 3, wl: [40, 50], scheme: SCHEME3, time: 240 };
Q('sa_contrast', short({
  ...SA3, t: 2, d: 2, c: 'understanding',
  stem: 'How does *A Tiger in the Zoo* contrast the tiger\'s life in the zoo with life in the wild? Answer in 40–50 words.',
  model: 'In the zoo the tiger paces a tiny enclosure, his power wasted and his anger silent, ignored by and ignoring the crowds. In the wild he would hunt unseen near water and frighten villagers at the forest edge. One life is confined and empty; the other is free and powerful.',
  sol: 'Zoo life (cramped, pacing, silent anger) + wild life (hunting, feared) + the conclusion.',
}));
Q('sa_rage', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'In the first stanza of *A Tiger in the Zoo*, the tiger\'s anger is described as silent. Why is his anger silent, and what device is used? Answer in 40–50 words.',
  model: 'The poet pairs a word meaning silence with a word meaning fury, an oxymoron. The tiger is furious at being caged, but his anger has no outlet: he cannot hunt, escape or attack. So the rage simmers inwardly as he paces, helpless and frustrated.',
  sol: 'Device (oxymoron) + reason for anger (captivity) + why it is silent (no outlet).',
}));
Q('sa_should_be', short({
  ...SA3, t: 1, d: 2, c: 'understanding',
  stem: 'According to *A Tiger in the Zoo*, where should the tiger be, and what should he be doing? Answer in 40–50 words.',
  model: 'The tiger should be in the forest, living by his instincts. He ought to be hiding silently near water, waiting to hunt deer, and prowling at the edge of the jungle near villages, showing his teeth and claws and frightening the people who live there.',
  sol: 'Place (the forest) + two activities (hunting, prowling near villages) in own words.',
}));
Q('sa_visitors', short({
  ...SA3, t: [1, 2], d: 3, c: 'analysis',
  stem: 'Why does the tiger in *A Tiger in the Zoo* ignore the visitors? Answer in 40–50 words.',
  model: 'The tiger ignores the visitors because they mean nothing to him and he resents being their entertainment. His indifference is a quiet form of protest and dignity. He refuses to perform for people who see him as a spectacle while he remains a prisoner.',
  sol: 'Reason (resentment, they mean nothing) + interpretation (protest, dignity).',
}));
Q('sa_stars', short({
  ...SA3, t: 3, d: 4, c: 'analysis',
  stem: 'Why does the tiger in *A Tiger in the Zoo* stare at the stars at the end? Answer in 40–50 words.',
  model: 'After dark, alone and unable to sleep, the tiger gazes at the stars, which stand for freedom and the open world he has lost. The same shining word describes his eyes and the stars, linking them. The image shows his longing and his unbroken wild spirit.',
  sol: 'What the stars stand for + the link between eyes and stars + what it reveals.',
}));
Q('sa_night_sounds', short({
  ...SA3, t: 1, d: 3, c: 'understanding',
  stem: 'What does the tiger in *A Tiger in the Zoo* hear after dark, and how does this add to the mood? Answer in 40–50 words.',
  model: 'After dark the tiger listens to the final human voices of the day and the vehicles patrolling the zoo grounds. These sounds remind him that he is guarded and surrounded by people, not by the jungle. They deepen the lonely, imprisoned mood of the ending.',
  sol: 'The sounds in own words + what they suggest (guarded, human world) + mood.',
}));
Q('sa_alliteration', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Give two sound devices used in *A Tiger in the Zoo* and explain their effect. Answer in 40–50 words.',
  model: 'First, alliteration: repeated s sounds in the opening stanza hiss softly, imitating the tiger\'s silent, restless pacing. Second, repetition: one shining adjective describes both the eyes and the stars, linking the tiger to freedom. Both devices make us hear and feel his situation more sharply.',
  sol: 'Two devices named + where they occur (described) + effect of each.',
}));
Q('sa_middle_stanzas', short({
  ...SA3, t: [2, 3], d: 3, c: 'analysis',
  stem: 'Why does the poet of *A Tiger in the Zoo* place the two wild stanzas between the two cage stanzas? Answer in 40–50 words.',
  model: 'The arrangement mirrors the tiger\'s situation. Just as the cage surrounds the tiger, the cage stanzas surround the stanzas about freedom. The wild life exists only in imagination, trapped between two pictures of confinement. The structure therefore makes the reader feel the tiger\'s imprisonment.',
  sol: 'The arrangement + what it mirrors + the effect on the reader.',
}));
Q('sa_title', short({
  ...SA3, t: [2, 3], d: 3, c: 'evaluation',
  stem: 'Is *A Tiger in the Zoo* a suitable title for the poem? Give reasons in 40–50 words.',
  model: 'Yes. The title states the poem\'s central situation plainly: a wild, powerful animal placed somewhere it does not belong. The word zoo signals captivity, while the poem imagines the tiger\'s true home. The simple title therefore introduces the contrast on which the whole poem is built.',
  sol: 'A clear view + link to the situation + link to the central contrast.',
}));
Q('sa_zoo_debate', short({
  ...SA3, t: 2, d: 4, c: 'evaluation',
  stem: 'Do you think *A Tiger in the Zoo* is against zoos? Give a reasoned answer in 40–50 words.',
  model: 'The poem never criticises zoos directly, but its sympathy clearly lies with the tiger. By contrasting his empty, cramped life with the rich life he should have, it suggests that keeping wild animals for display is cruel. It invites readers to judge captivity for themselves.',
  sol: 'A clear view + evidence from the contrast + the poem\'s method (it lets readers judge).',
}));
Q('sa_sympathy', short({
  ...SA3, t: 2, d: 3, c: 'application',
  stem: 'How might a visitor who has studied *A Tiger in the Zoo* look at a caged animal differently? Answer in 40–50 words.',
  model: 'Such a visitor would look past the animal\'s calm appearance and notice its restless pacing as a sign of frustration. Instead of treating it as entertainment, they would think about the wild life it has lost and might support sanctuaries or conservation work that protects animals\' habitats.',
  sol: 'Apply the poem\'s insight to a real visit + a practical response.',
}));
Q('sa_tone', short({
  ...SA3, t: 3, d: 3, c: 'analysis',
  stem: 'Describe the tone of *A Tiger in the Zoo* and how it changes. Answer in 40–50 words.',
  model: 'The tone is sympathetic throughout. In the cage stanzas it is sad and restrained; in the wild stanzas it becomes energetic and vivid, celebrating the tiger\'s power. In the final stanza it turns quiet, lonely and wistful as the tiger gazes at the stars, longing for freedom.',
  sol: 'Overall tone + change in the wild stanzas + change at the end.',
}));

// ================================================================ short answers, 2 marks (30–40 words)
const SA2 = { marks: 2, wl: [30, 40], scheme: SCHEME2, time: 150 };
Q('sb_poet', short({
  ...SA2, t: 1, d: 1, c: 'recall',
  stem: 'Who wrote *A Tiger in the Zoo*? Mention two facts about the poet in 30–40 words.',
  model: 'The poem was written by Leslie Norris (1921–2006), a Welsh poet. He wrote poems and short stories, and his work often shows a close, sympathetic attention to animals and the natural world.',
  sol: 'Name + any two facts (Welsh; 1921–2006; poet and short-story writer; nature and animals).',
}));
Q('sb_stanzas', short({
  ...SA2, t: 3, d: 1, c: 'recall',
  stem: 'Describe the stanza structure of *A Tiger in the Zoo*. Answer in 30–40 words.',
  model: 'The poem has five stanzas of four lines each. The first and fourth show the tiger in the zoo, the second and third imagine him in the wild, and the fifth shows him after dark.',
  sol: 'Number and size of stanzas + what each group describes.',
}));
Q('sb_villagers', short({
  ...SA2, t: 1, d: 2, c: 'understanding',
  stem: 'How would the tiger in *A Tiger in the Zoo* affect the villagers if he were free? Answer in 30–40 words.',
  model: 'If he were free, the tiger would prowl close to homes on the forest\'s edge, showing his teeth and claws. The villagers would be terrified of him, which is part of his natural, powerful identity.',
  sol: 'His behaviour close to villages + the villagers\' fear + link to his nature.',
}));
Q('sb_strength', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'What has happened to the tiger\'s strength in the zoo, according to *A Tiger in the Zoo*? Answer in 30–40 words.',
  model: 'In the zoo the tiger\'s great strength is wasted. It is held back by iron and has no purpose, since he cannot hunt or roam. All he can do with his power is pace from one end to the other.',
  sol: 'Strength restrained + no outlet + pacing.',
}));
Q('sb_eyes_stars', short({
  ...SA2, t: 3, d: 3, c: 'analysis',
  stem: 'What is the effect of describing the tiger\'s eyes and the stars with the same word in *A Tiger in the Zoo*? Answer in 30–40 words.',
  model: 'Using one shining word for both links the tiger with the stars. The stars are free and far away, so the link suggests his longing for freedom and shows that his wild spirit still burns.',
  sol: 'The link + what the stars stand for + what it shows about the tiger.',
}));
Q('sb_message', short({
  ...SA2, t: 2, d: 2, c: 'understanding',
  stem: 'State the central message of *A Tiger in the Zoo* in 30–40 words.',
  model: 'Wild animals belong in their natural homes, not in cages. Captivity robs them of their strength, freedom and dignity. The poem asks readers to feel for caged creatures and to question keeping them for display.',
  sol: 'The main idea + one supporting point (loss of freedom and dignity).',
}));

// ================================================================ long answers, 6 marks (100–120 words)
const LA = { marks: 6, wl: [100, 120], scheme: LONG_SCHEME, time: 720 };
Q('la_contrast', long({
  ...LA, t: 2, d: 3, c: 'analysis',
  stem: 'How does Leslie Norris use contrast in *A Tiger in the Zoo* to bring out the tiger\'s plight? Answer in 100–120 words.',
  model: 'A Tiger in the Zoo is built on contrast. The first stanza shows the tiger pacing a tiny enclosure, silent but furious. The next two stanzas imagine the life he ought to be living: hunting unseen near water and frightening villagers at the forest edge, powerful and feared. Then the fourth stanza returns to reality: a bare enclosure, strength held back by iron, visitors ignored. Finally, after dark, he gazes at the distant stars. By setting freedom beside confinement, Norris lets us feel what has been taken from the tiger without stating an opinion. The structure itself, with the wild stanzas enclosed by cage stanzas, reinforces the plight of a creature trapped far from home.',
  sol: 'Cage stanza → wild stanzas → cage stanza → night → how contrast makes the argument. Do not quote the poem.',
}));
Q('la_tiger_diary', long({
  ...LA, t: [4, 2], d: 4, c: 'application', bloom: 'create',
  stem: 'Imagine you are the tiger in *A Tiger in the Zoo*. Write a diary entry describing one day in the zoo and your memories of the forest, in 100–120 words.',
  model: 'Another endless day\n\nThe crowds came again this morning, pointing, shouting, tapping the glass. I turned my back on them. What are they to me? I walked my few metres, turned, walked back, a thousand times. My muscles ache for use. I remember the cool shade of the forest, the smell of water, the long wait before the leap. I remember how the villagers ran when I came near. There, everyone knew my name in fear. Here, I am a picture for children. Now the zoo is quiet. A guard\'s vehicle rolls past. Above the wall, the stars are out, as free as I once was. I watch them until morning.',
  sol: 'Diary format (first person, time marker). Content must fit the poem: pacing, ignoring the visitors, memories of hunting and villagers, night sounds, the stars. No lines quoted.',
}));
Q('la_zoo_debate', long({
  ...LA, t: 2, d: 4, c: 'evaluation',
  stem: 'Should wild animals be kept in zoos? Answer with reference to *A Tiger in the Zoo* and your own views, in 100–120 words.',
  model: 'A Tiger in the Zoo makes a strong case against keeping wild animals in cages. Its tiger paces a tiny enclosure, his power wasted and his anger silent, while the poem imagines the rich, free life he has lost. Watching him stare at the stars, we feel his longing. Many animals in zoos show similar signs of stress, such as pacing. Yet some modern zoos protect endangered species through breeding and research. In my view, animals should be kept only where conservation truly requires it, and then in large, natural enclosures. Wherever possible, protecting forests and sanctuaries is better than building cages. The poem reminds us that a wild animal is not entertainment.',
  sol: 'The poem\'s view in own words → evidence → the opposing argument (conservation) → a balanced personal view → conclusion.',
}));
Q('la_letter', long({
  ...LA, t: [2, 4], d: 3, c: 'application', bloom: 'create',
  stem: 'After reading *A Tiger in the Zoo*, write a letter to the editor of a newspaper suggesting how zoos in your city could improve the lives of their animals, in 100–120 words.',
  model: 'The Editor\nThe City Times\n\nSubject: Better lives for zoo animals\n\nSir,\n\nOur class recently read A Tiger in the Zoo by Leslie Norris, in which a caged tiger paces restlessly, ignores the crowds and gazes at the stars after dark. It made me think about our own zoo. Many enclosures there are small and bare, and several animals pace for hours. I suggest larger, natural enclosures with trees, water and hiding places; limits on noisy crowds; and trained keepers who watch for signs of stress. The zoo should also support breeding and release programmes. Animals deserve dignity, not just display.\n\nYours faithfully,\nAnanya Rao',
  sol: 'Formal letter format; reference to the poem in own words; specific suggestions; a closing appeal. No lines quoted.',
}));
Q('la_ending', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'Discuss the significance of the final stanza of *A Tiger in the Zoo*. Answer in 100–120 words.',
  model: 'The final stanza moves the poem into darkness. The crowds have gone, and the tiger hears only the final human voices and the vehicles patrolling the grounds, reminders that he is guarded. Then he looks up at the stars. The poet describes the tiger\'s eyes and the stars with the same shining word, linking the prisoner with the freest, most distant things in the sky. The stars stand for the open world he has lost, and his bright eyes show that his wild spirit has not been destroyed. The mood is quiet, lonely and full of longing. Ending on this image, rather than on anger, leaves the reader with sympathy and unease.',
  sol: 'Setting and sounds → the gaze at the stars → the shared adjective and its meaning → mood → why it is a powerful ending.',
}));
Q('la_devices', long({
  ...LA, t: 3, d: 4, c: 'analysis',
  stem: 'Discuss any three poetic devices used in *A Tiger in the Zoo* and show how they reveal the tiger\'s feelings. Answer in 100–120 words.',
  model: 'Leslie Norris uses several devices to show the tiger\'s feelings. First, an oxymoron in the opening stanza pairs a word for silence with a word for fury, capturing anger that has no outlet. Second, alliteration: repeated s sounds hiss through the first stanza, imitating the tiger\'s soft, restless pacing. Third, contrast: the cage stanzas surround the stanzas about the wild, so the tiger\'s imagined freedom is literally enclosed, as he is. The repeated shining adjective for his eyes and the stars adds a final link between the prisoner and the free sky. Together these devices let us hear his frustration, feel his confinement and sense his longing without the poet stating them directly.',
  sol: 'Three devices, each named, located (described) and linked to a feeling: frustration, restlessness, confinement, longing.',
}));

// ================================================================ objective items
Q('mc_poet', mcq({ t: 1, d: 1, c: 'recall', stem: 'Who is the poet of *A Tiger in the Zoo*?', opts: ['Leslie Norris', 'Robert Frost', 'Carolyn Wells', 'John Berryman'], sol: 'Leslie Norris, the Welsh poet. The others wrote other poems in the Class 10 textbook.' }));
Q('mc_nationality', mcq({ t: 1, d: 1, c: 'recall', stem: 'Leslie Norris, the poet of *A Tiger in the Zoo*, was from…', opts: ['Wales', 'India', 'the United States', 'Australia'], sol: 'Norris was Welsh.' }));
Q('mc_stanzas', mcq({ t: 3, d: 1, c: 'recall', stem: 'How many stanzas does *A Tiger in the Zoo* have?', opts: ['five', 'four', 'six', 'three'], sol: 'Five stanzas of four lines each.' }));
Q('mc_oxymoron', mcq({ t: 3, d: 2, c: 'understanding', stem: 'In the opening stanza of *A Tiger in the Zoo*, a word for silence is paired with a word for fury. This device is…', opts: ['oxymoron', 'simile', 'onomatopoeia', 'hyperbole'], sol: 'Opposites placed together form an oxymoron.' }));
Q('mc_wild_place', mcq({ t: 1, d: 2, c: 'understanding', stem: 'In *A Tiger in the Zoo*, where does the poet imagine the tiger hunting?', opts: ['hidden near water where deer come', 'inside a busy market', 'on a snowy mountain', 'in a fishing boat'], sol: 'He imagines the tiger waiting unseen near water for deer.' }));
Q('mc_visitors', mcq({ t: 1, d: 2, c: 'understanding', stem: 'How does the tiger in *A Tiger in the Zoo* respond to the visitors?', opts: ['He ignores them.', 'He roars at them.', 'He performs tricks.', 'He hides from them.'], sol: 'He takes no notice of them, a sign of dignity and resentment.' }));
Q('mc_stars', mcq({ t: 3, d: 3, c: 'analysis', stem: 'In *A Tiger in the Zoo*, the stars at the end most likely stand for…', opts: ['freedom and the lost wild world', 'the zoo lights', 'the visitors\' cameras', 'the tiger\'s food'], sol: 'Free and distant, the stars suggest the freedom he has lost.' }));
Q('mc_stalks', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *A Tiger in the Zoo*, the word *stalks* means…', opts: ['walks with stiff, angry strides', 'eats slowly', 'sleeps lightly', 'climbs a tree'], sol: 'To stalk is to walk in a stiff, proud or angry way (it can also mean to follow prey stealthily).' }));
Q('mc_lurking', mcq({ t: 4, d: 2, c: 'understanding', stem: 'In *A Tiger in the Zoo*, *lurking* means…', opts: ['waiting hidden, ready to attack', 'running fast', 'sleeping deeply', 'calling loudly'], sol: 'To lurk is to wait in hiding.' }));
Q('mc_theme', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which is the central theme of *A Tiger in the Zoo*?', opts: ['the cruelty of keeping wild animals captive', 'the beauty of zoo gardens', 'the danger of tigers to visitors', 'the life of a zoo keeper'], sol: 'The poem contrasts captivity with freedom and sympathises with the tiger.' }));
Q('mc_apply', mcq({ t: 2, d: 3, c: 'application', stem: 'Which SOYL-written situation is closest to the tiger\'s plight in *A Tiger in the Zoo*?', opts: ['A champion runner, injured and confined to bed, watches others race on TV.', 'A student enjoys a holiday at the beach.', 'A farmer harvests his crop.', 'A singer performs to a cheering crowd.'], sol: 'Great power with no outlet, watching a freedom one cannot have, mirrors the tiger.' }));
Q('mc_structure', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which stanzas of *A Tiger in the Zoo* describe the tiger in the zoo during the day?', opts: ['the first and fourth', 'the second and third', 'only the fifth', 'the third and fifth'], sol: 'Stanzas 1 and 4 show the cage; 2 and 3 the wild; 5 the night.' }));
Q('mc_tone', mcq({ t: 3, d: 3, c: 'analysis', stem: 'Which word best describes the poet\'s attitude to the tiger in *A Tiger in the Zoo*?', opts: ['sympathetic', 'mocking', 'indifferent', 'fearful'], sol: 'The poet feels for the tiger and his lost freedom.' }));
Q('mc_alliteration', mcq({ t: 3, d: 3, c: 'analysis', stem: 'What effect do the repeated s sounds in the opening stanza of *A Tiger in the Zoo* create?', fixed: true, key: 'c', opts: ['They show the tiger is sleepy.', 'They imitate the visitors\' laughter.', 'They imitate the tiger\'s soft, restless movement.', 'They make the stanza sound cheerful.'], sol: 'The hissing sounds suggest soft, restless pacing.' }));

Q('fb_stanzas', fb({ t: 3, d: 1, c: 'recall', marks: 1, stem: '*A Tiger in the Zoo* has ___ stanzas, each of ___ lines.', acc: [['five', '5'], ['four', '4']], sol: '**Five** stanzas of **four** lines each.', scheme: [['five', 0.5], ['four', 0.5]] }));
Q('fb_oxymoron', fb({ t: 3, d: 2, c: 'recall', stem: 'Placing two words of opposite meaning together, as *A Tiger in the Zoo* does to describe the tiger\'s anger, is called an ___.', acc: [['oxymoron']], sol: 'It is an **oxymoron**.' }));
Q('fb_poet', fb({ t: 1, d: 1, c: 'recall', stem: '*A Tiger in the Zoo* was written by the Welsh poet Leslie ___.', acc: [['Norris']], sol: 'The poet is Leslie **Norris**.' }));
Q('fb_sky', fb({ t: 1, d: 2, c: 'understanding', stem: 'At the end of *A Tiger in the Zoo*, the tiger gazes at the ___.', acc: [['stars', 'sky']], sol: 'He gazes at the **stars**.' }));

Q('ar_ignore', ar({ t: 2, d: 3, c: 'analysis', a: 'The tiger in *A Tiger in the Zoo* pays no attention to the visitors.', r: 'The tiger in *A Tiger in the Zoo* is shown pacing in his enclosure.', key: 'b', sol: 'Both are true, but R does not explain A. He ignores the visitors out of resentment and dignity, not because he paces.' }));
Q('ar_rage', ar({ t: 3, d: 3, c: 'analysis', a: 'The tiger\'s anger in the opening stanza of *A Tiger in the Zoo* is silent.', r: 'Confined in the zoo, the tiger has no way of acting on his fury.', key: 'a', sol: 'Both are true, and having no outlet is exactly why the anger stays silent.' }));
Q('ar_form', ar({ t: 3, d: 2, c: 'understanding', a: '*A Tiger in the Zoo* is written in five stanzas of four lines.', r: 'Every line of *A Tiger in the Zoo* rhymes with the next.', key: 'c', sol: 'A is true: five quatrains. R is false: the rhyme is loose, mainly in the second and fourth lines.' }));
Q('ar_free', ar({ t: [1, 2], d: 3, c: 'analysis', a: 'The tiger in *A Tiger in the Zoo* escapes from the zoo in the final stanza.', r: 'In the final stanza the tiger gazes at the stars after dark.', key: 'd', sol: 'A is false: he does not escape; he only gazes upward. R is true.' }));

Q('tf_wild_imagined', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false: the forest scenes in *A Tiger in the Zoo* describe what the tiger should be doing, not what he is doing.', ans: true, sol: 'Stanzas 2 and 3 imagine his proper life in the wild.' }));
Q('tf_happy', tf({ t: 2, d: 1, c: 'recall', stem: 'True or false: the tiger in *A Tiger in the Zoo* is content in his enclosure.', ans: false, sol: 'He is angry and restless, pacing his small space.' }));
Q('tf_direct', tf({ t: 2, d: 3, c: 'analysis', stem: 'True or false: Leslie Norris states his opinion of zoos directly in *A Tiger in the Zoo*.', ans: false, sol: 'He never states it; the contrast between cage and wild makes the point.' }));
Q('tf_night', tf({ t: 1, d: 1, c: 'recall', stem: 'True or false: the final stanza of *A Tiger in the Zoo* is set after dark.', ans: true, sol: 'The tiger listens to the night sounds and looks at the stars.' }));

Q('ord_stanzas', ord({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these SOYL descriptions of the five stanzas of *A Tiger in the Zoo* in the order of the poem.',
  items: ['The tiger paces his small enclosure, silently furious.', 'He ought to be hunting unseen near water.', 'He ought to be frightening villagers at the forest\'s edge.', 'He is shut in, his power held back, ignoring the crowds.', 'After dark he listens to the night sounds and gazes at the stars.'],
  sol: 'Cage → wild (hunting) → wild (village) → cage → night.',
}));
Q('ord_answer', ord({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps for writing a 40–50 word answer on the contrast in *A Tiger in the Zoo*.',
  items: ['Read the question and underline its key word.', 'State the contrast in one sentence.', 'Describe the zoo life in your own words.', 'Describe the wild life in your own words.', 'Check the word count and remove any quoted lines.'],
  sol: 'Understand the question → main point → zoo → wild → check length and originality.',
}));

Q('mt_words', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each word used in *A Tiger in the Zoo* with its meaning.',
  pairs: [['snarling', 'growling with bared teeth'], ['fangs', 'long, sharp teeth'], ['terrorising', 'filling with fear'], ['patrolling', 'going round to guard']],
  sol: 'Single words from the poem with their meanings.',
}));
Q('mt_stanzas', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each part of *A Tiger in the Zoo* with what it shows.',
  pairs: [['stanza 1', 'pacing in the enclosure'], ['stanza 2', 'hunting unseen near water'], ['stanza 3', 'frightening villagers'], ['stanza 5', 'gazing at the stars after dark']],
  sol: 'Cage, wild, wild, cage, night: stanza 4 (the return to the cage) is not listed.',
}));
Q('mt_devices', match({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'Match each feature of *A Tiger in the Zoo* with the correct term.',
  pairs: [['a word for silence paired with a word for fury', 'oxymoron'], ['repeated s sounds in the first stanza', 'alliteration'], ['cage stanzas set against wild stanzas', 'contrast'], ['paws compared to a soft, rich fabric', 'metaphor']],
  sol: 'Name the device by what it does in the poem.',
}));
