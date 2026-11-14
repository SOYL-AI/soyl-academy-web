// CBSE 11 English Core, ch03 Creative Writing: question bank.
// Every prompt, situation, name, address, phone number and model answer is invented for SOYL and plainly fictional.
// Phone numbers use the masked form 98XXXXXX10; no email addresses (the content lint rejects them).
// Line breaks inside advertisements and posters use Markdown hard breaks (two spaces before the newline).
import { Q, mcq, fb, short, tf, match, ord, writing, caseQ, child } from '../../cbse-11-english-core-ch01/src/lib.mjs';

const BR = '  \n';
const lines = (...l) => l.join(BR);
const paras = (...p) => p.join('\n\n');

// SOYL rubrics, modelled on the school paper's marking of creative writing (confirm the split against the school's own scheme).
export const AD_RUBRIC = [
  ['Format and layout', 0.5, 'A suitable heading in capitals (FOR SALE, TO LET, SITUATION VACANT, LOST, FOUND, TUITION) and a contact line at the end; compact classified layout.'],
  ['Content', 1.5, 'Every essential detail for the category (item or post, key features, price or terms, place, how to respond); nothing that contradicts the brief.'],
  ['Expression', 1, 'Telegraphic, economical wording with no wasted words; correct grammar and spelling; within 50 words.'],
];
export const POSTER_RUBRIC = [
  ['Format and layout', 0.5, 'A bold title, a slogan, the facts on separate short lines and the organiser named, so the poster reads at a glance.'],
  ['Content', 1.5, 'The event or message is clear; date, time, venue, who may join and how to contact are given; the appeal suits the target audience.'],
  ['Expression', 1, 'A catchy, original slogan; crisp phrases; correct language; within 50 words.'],
];
export const SPEECH_RUBRIC = [
  ['Format', 1, 'Salutation, a hook in the opening, a body, a conclusion and thanks, in that order.'],
  ['Content', 2, 'Relevant points, each developed with a fact, example or suggestion; suits the audience and the occasion.'],
  ['Expression', 2, 'Clear spoken style, rhetorical devices used with care, linking words, correct grammar; 120-150 words.'],
];
export const DEBATE_RUBRIC = [
  ['Format', 1, 'Addresses the chair, judges and opponents; states the stand; arguments; rebuttal; concluding appeal and thanks.'],
  ['Content', 2, 'At least two developed arguments with support, and at least one rebuttal of a point from the other side.'],
  ['Expression', 2, 'Persuasive but respectful tone, signposting words, accurate language; 120-150 words.'],
];

const W_AD = { format: 'advertisement', wl: [30, 50], marks: 3, rubric: AD_RUBRIC, d: 2, c: 'application', t: 1 };
const W_POSTER = { format: 'other', wl: [30, 50], marks: 3, rubric: POSTER_RUBRIC, d: 3, c: 'application', t: 2 };
const W_SPEECH = { format: 'speech', wl: [120, 150], marks: 5, rubric: SPEECH_RUBRIC, d: 3, c: 'application', t: 3 };
const W_DEBATE = { format: 'speech', wl: [120, 150], marks: 5, rubric: DEBATE_RUBRIC, d: 3, c: 'application', t: 4 };

// ================================================================ classified advertisements (writing, 3 marks)
Q('ad_sale', writing({
  ...W_AD, d: 2,
  stem: 'You are **Tarun / Tanvi Joshi**, 22 Sector 14, Panchkula. Your younger brother has outgrown his 21-speed geared bicycle, bought a year ago. Draft a classified advertisement for the For Sale column of *The Hill Tribune* in **not more than 50 words**. Fix a price and give a contact number in the form 98XXXXXX10.',
  model: lines('**FOR SALE**', 'Blue 21-speed geared bicycle, one year old, excellent condition, well maintained. Helmet and lock free. ₹6,500, slightly negotiable. Genuine buyers only. Viewing daily, 5 to 7 pm, at 22 Sector 14, Panchkula.', 'Contact: Tarun, 98XXXXXX10'),
  sol: '**Plan:** heading, then item and features, condition, extras, price, where to view, contact. Cut every word the reader can do without (no greetings, no story of how it was used). The heading tells the reader the category before anything else.',
}));
Q('ad_tolet', writing({
  ...W_AD, d: 2,
  stem: 'You are **Dev Malhotra**, 8 Lotus Colony, Indore 452001. The first floor of your house has two bedrooms, a modular kitchen and parking, and is close to a market and a bus stop. Draft a classified advertisement for the To Let column of a local daily in **not more than 50 words**. Fix the rent and terms yourself.',
  model: lines('**TO LET**', 'Spacious 2BHK flat, first floor, Lotus Colony, Indore. Modular kitchen, parking, 24-hour water. Near market and bus stop. Rent ₹14,000 monthly; two months\' deposit. Small family preferred. No brokers, please.', 'Contact: Dev Malhotra, 98XXXXXX10'),
  sol: '**Plan:** category heading; size and floor; locality; facilities; rent and deposit; tenant preference; contact. A to-let reader decides on size, place and rent first, so those facts lead.',
}));
Q('ad_vacancy', writing({
  ...W_AD, d: 3,
  stem: 'The manager of **Sunrise Dental Clinic**, Station Road, Nashik, needs a receptionist who speaks English and Marathi and can use a computer. Draft the classified advertisement for the Situations Vacant column in **not more than 50 words**. Add the qualification, salary and the way to apply.',
  model: lines('**SITUATION VACANT**', 'Receptionist wanted at Sunrise Dental Clinic, Nashik. Graduate with fluent English and Marathi, basic computer skills. Experience preferred. Salary ₹18,000 monthly. Apply in person with CV, Monday, 10 am, Station Road, Nashik.', 'Contact: Manager, 98XXXXXX10'),
  sol: '**Plan:** heading; post and employer; qualifications and skills; experience; salary; how, when and where to apply; contact. A job seeker needs to know whether they qualify and what to do next.',
}));
Q('ad_lost', writing({
  ...W_AD, d: 2,
  stem: 'You are **Anita Rao**. Your eight-month-old brown-and-white spaniel puppy, Coco, wearing a red collar, went missing near Civil Lines Park, Jabalpur, on Sunday evening. Draft a Lost advertisement in **not more than 50 words**, offering a reward.',
  model: lines('**LOST**', 'Brown-and-white spaniel, 8 months old, red collar, answers to Coco. Lost near Civil Lines Park, Jabalpur, on Sunday evening. Very friendly; needs medicine daily. Finder will be rewarded ₹2,000. Please call Anita Rao, 98XXXXXX10.'),
  sol: '**Plan:** heading; a description precise enough for a stranger to recognise the animal; where and when it was lost; a reason to act quickly; the reward; contact. Description and place matter most in a lost-and-found notice.',
}));
Q('ad_found', writing({
  ...W_AD, d: 2,
  stem: 'You are **Imran Qureshi**. On Friday morning you found a blue school backpack with Class 9 books and a geometry box at Gandhi Chowk bus stop, Kota. Draft a Found advertisement in **not more than 50 words** so that the owner can claim it.',
  model: lines('**FOUND**', 'Blue school backpack with Class 9 books and a geometry box, found at Gandhi Chowk bus stop, Kota, on Friday morning. Owner may claim it by describing the contents and showing identification.', 'Contact: Imran Qureshi, 98XXXXXX10'),
  sol: '**Plan:** heading; what was found and where; when; the way to prove ownership; contact. A finder keeps back one detail (the contents) so that only the true owner can answer correctly.',
}));
Q('ad_tuition', writing({
  ...W_AD, d: 3,
  stem: 'You teach mathematics to senior students in Model Town, Ludhiana. Draft a classified advertisement for the Tuition column in **not more than 50 words** to attract students of Classes 9 to 12. Use details of your own that would make parents trust the classes.',
  model: lines('**TUITION**', 'Mathematics classes for CBSE Classes 9 to 12 by an experienced teacher. Small batches of eight, weekly tests, doubt-clearing sessions. First class free. Admissions open for the new session. Model Town, Ludhiana.', 'Contact: Ms Gill, 98XXXXXX10'),
  sol: '**Plan:** heading; subject and classes; what makes the teaching reliable (experience, batch size, tests); an inducement (free first class); place; contact. Parents look for evidence of quality in a few words.',
}));

// ================================================================ posters (writing, 3 marks)
Q('poster_blood', writing({
  ...W_POSTER, d: 2,
  stem: 'The **Youth Service Club** of Ambedkar College, Jaipur, is holding a blood donation camp on 14 December from 9 am to 3 pm in the College Auditorium, Shivaji Nagar. Design a poster in **not more than 50 words** to bring in donors. Present it as text, line by line.',
  model: lines('**BLOOD DONATION CAMP**', '*One hour of yours, a lifetime of theirs*', 'Date: 14 December, 9 am to 3 pm', 'Venue: College Auditorium, Shivaji Nagar', 'Donors aged 18 to 60 welcome. Bring photo ID. Refreshments provided.', 'Organised by: Youth Service Club', 'Contact: 98XXXXXX10'),
  sol: '**Plan:** bold title; an original slogan that appeals to the donor; date and time; venue; who may take part and what to bring; organiser; contact. Each fact sits on its own line so a passer-by can read it quickly.',
}));
Q('poster_water', writing({
  ...W_POSTER, d: 3,
  stem: 'The **Eco Club** of Navjyoti School is holding a Water Week from 3 to 9 February to make people in the neighbourhood save water. A pledge booth and a rally will be held at Civil Lines Park at 8 am. Design a poster in **not more than 50 words**. Present it as text, line by line.',
  model: lines('**SAVE WATER, SAVE TOMORROW**', '*Every drop you spare is a drop we share*', 'Water Week: 3 to 9 February', 'Pledge booth and rally: Civil Lines Park, 8 am', 'Fix leaks. Close taps. Reuse water.', 'Eco Club, Navjyoti School'),
  sol: '**Plan:** a title that states the message; a slogan; the dates; the place and time of the event; three short actions the public can take; organiser. An awareness poster must tell people what to do, not only what the problem is.',
}));
Q('poster_fair', writing({
  ...W_POSTER, d: 2,
  stem: 'Greenfield School is holding the **Curious Minds Science Fair** on Friday 6 March, 10 am to 4 pm, in the School Hall. Classes 6 to 12 will display working models; a quiz and a robot demonstration are planned; entry is free. Design a poster in **not more than 50 words**.',
  model: lines('**CURIOUS MINDS SCIENCE FAIR**', '*Come and see ideas that move*', 'Friday, 6 March, 10 am to 4 pm', 'School Hall, Greenfield School', 'Working models, robot show, quiz. Entry free.', 'Classes 6 to 12 exhibit', 'Contact: 98XXXXXX10'),
  sol: '**Plan:** title; slogan; day, date and time; venue; attractions that draw visitors; the free entry; organiser or contact. Putting the attractions in one short line keeps the poster within the limit.',
}));
Q('poster_plastic', writing({
  ...W_POSTER, d: 3,
  stem: 'The Residents\' Welfare Association of Maple Enclave, Pune, will observe a **Plastic-Free Week** from 10 to 16 April and will collect old carry bags at the society gate every evening. Design a poster in **not more than 50 words** to persuade residents to take part.',
  model: lines('**PLASTIC-FREE WEEK**', '*Carry a cloth bag, not a burden*', '10 to 16 April', 'Drop old plastic bags at the society gate, 6 to 8 pm daily', 'Use cloth bags. Say no to straws and wrappers.', 'Maple Enclave Residents\' Welfare Association', 'Contact: 98XXXXXX10'),
  sol: '**Plan:** title; slogan; dates; the collection point and time; two or three clear actions; organiser; contact. The poster gives people something specific to do that week.',
}));
Q('poster_road', writing({
  ...W_POSTER, d: 3,
  stem: 'Your school is observing **Road Safety Week** from 5 to 11 January. A rally will leave the school gate at 8 am on 5 January, and a traffic police demonstration will be held in the playground on 8 January. Design a poster in **not more than 50 words** for students and parents.',
  model: lines('**ROAD SAFETY WEEK**', '*Arrive alive: slow down, buckle up*', '5 to 11 January', 'Rally: school gate, 8 am, 5 January', 'Traffic police demonstration: playground, 8 January', 'Wear helmets. Use seat belts. Never use phones while driving.', 'Student Council'),
  sol: '**Plan:** title; slogan; dates; the two events with place and time; three safe-driving reminders; organiser. Parents are part of the audience, so the reminders speak to drivers.',
}));

// ================================================================ speeches (writing, 5 marks)
Q('sp_reading', writing({
  ...W_SPEECH, d: 3,
  stem: 'You are **Kabir / Kavya Menon**, Class 11. Write a speech for the morning assembly, in **120–150 words**, persuading your schoolmates to build a daily reading habit.',
  model: paras(
    'A very good morning to our respected Principal, teachers and my dear friends.',
    'How many of us finished a book last month? Please raise your hands. I see only a few. That is why I am speaking today about the joy of reading.',
    'A book needs no charger, yet it carries us to deserts, oceans and distant centuries. Reading widens our vocabulary, sharpens our concentration and teaches us to see through another person\'s eyes. Students who read regularly write better answers and speak with confidence.',
    'So here is a simple plan. Read twenty pages every night, borrow one book a week from our library, and share your favourite with a friend.',
    'Let every bag in this school carry a book beside the lunch box. Thank you.',
  ),
  sol: '**Plan:** salutation; a hook (a question to the audience); the topic; two benefits; a practical plan; a closing image; thanks. Raising a hand-count question wakes the audience and is cheap in words.',
}));
Q('sp_farewell', writing({
  ...W_SPEECH, d: 3,
  stem: 'Class 12 is leaving the school. On behalf of Class 11, write a farewell speech in **120–150 words** to be delivered at the farewell function. Include thanks, one shared memory and good wishes.',
  model: paras(
    'Good afternoon, respected Principal, teachers, dear seniors and friends.',
    'Today we stand here with smiling faces and heavy hearts. For two years you were the elder brothers and sisters of this campus. You guided us in the library, cheered us on the sports field and showed us that hard work and humour can live together.',
    'We shall remember the Annual Day you led, when you stayed back to hang every banner, and the way you shared your notes before our unit tests. You never made us feel small.',
    'As you step into a wider world, we wish you success in your examinations and courage in every choice. These corridors will always be your home.',
    'On behalf of Class 11, thank you, seniors. Come back often. Good luck.',
  ),
  sol: '**Plan:** salutation including the seniors; the mood of the occasion; thanks with two concrete qualities; one shared memory; wishes; a closing line that welcomes them back. A farewell speech is warm and specific, never a list of complaints or jokes at anyone\'s cost.',
}));
Q('sp_sports', writing({
  ...W_SPEECH, d: 2,
  stem: 'You are the **Sports Captain** of Rainbow Public School. Write the welcome speech for the Annual Sports Day in **120–150 words**. Welcome the chief guest, a former national hockey player, along with parents and students, share a thought on sportsmanship, and thank everyone.',
  model: paras(
    'Good morning, respected chief guest, Principal, teachers, parents and dear friends.',
    'It is my privilege to welcome you to the Annual Sports Day of Rainbow Public School. We are honoured to have our chief guest, a former national hockey player, who has shown us what discipline and teamwork can achieve.',
    'For months our athletes have woken before sunrise to practise. Today they will run, jump and throw, not only to win medals but to test themselves. Winning is a pleasure; playing fair is a habit. Let us cheer the last runner as loudly as the first, because every medal began with one early morning.',
    'I thank our teachers for their guidance, the parents for their support and the volunteers who prepared the grounds.',
    'Let the games begin. Thank you.',
  ),
  sol: '**Plan:** salutation in order of rank; a welcome naming the chief guest and why the guest is honoured; the effort behind the day; the message on fair play; thanks; a formal start. A welcome speech stays short and warm so that the event can begin.',
}));
Q('sp_screen', writing({
  ...W_SPEECH, d: 4, c: 'analysis',
  stem: 'You are the **School Captain**. At the parents\' meeting you must speak in **120–150 words** about students\' screen time. Your audience is parents, not classmates, so your salutation, examples, tone and requests must suit them.',
  model: paras(
    'Good evening, respected Principal, teachers and dear parents.',
    'Let me begin with a scene familiar to every home: a family around the dinner table, each person looking at a different screen. We students often do not notice how much time we give to devices, so I speak to you as a friend of your children.',
    'Screens help us learn, but late-night scrolling steals our sleep and our concentration. Children copy what they see, so when parents put phones away at mealtimes, we follow.',
    'May I make three requests? Keep a fixed hour for devices, charge phones outside the bedroom, and ask us about our day instead of our scores.',
    'Your guidance, not your anger, will help us, and a little planning at home will do more than any rule from school. Thank you for listening.',
  ),
  sol: '**Plan:** a salutation for adults; a scene they recognise; the problem from a student\'s point of view; parent-level actions (not student-level advice); a polite, concrete request; thanks. The audience decides what examples, tone and requests are right, which is why the same topic needs a different speech here.',
}));

// ================================================================ debates (writing, 5 marks)
Q('db_phone', writing({
  ...W_DEBATE, d: 3,
  stem: 'Motion: **"Mobile phones should be allowed in schools."** You are speaking **for** the motion. Write your speech in **120–150 words**, with at least two arguments and a rebuttal of the other side\'s likely point.',
  model: paras(
    'Respected Chairperson, esteemed judges, worthy opponents and fellow students.',
    'I rise to support the motion that mobile phones should be allowed in schools.',
    'First, a phone is a dictionary, a calculator and a library in one pocket. A student who meets an unfamiliar word can look it up at once. Second, phones keep children safe. A parent can reach a child who is stranded after a late bus.',
    'My opponents will say that phones distract. But distraction is a question of rules, not of devices. With phones kept in bags during lessons and used only with permission, we gain the benefits without the harm. We do not ban pencils because someone doodles.',
    'Schools prepare us for the world, and in that world every citizen carries a phone. Let us teach responsible use instead of pretending the phone does not exist.',
    'I urge the House to support the motion. Thank you.',
  ),
  sol: '**Plan:** address the chair, judges and opponents; state the stand; argument 1 with an example; argument 2 with an example; rebuttal of the expected objection; concluding appeal and thanks. A rebuttal that offers a workable rule is stronger than a bare denial.',
}));
Q('db_online', writing({
  ...W_DEBATE, d: 3,
  stem: 'Motion: **"Online classes are better than classroom teaching."** You are speaking **against** the motion. Write your speech in **120–150 words** with at least two arguments and a rebuttal.',
  model: paras(
    'Honourable Chairperson, respected judges, dear opponents and friends.',
    'I stand firmly against the motion that online classes are better than classroom teaching.',
    'First, a classroom is a community. When a student frowns, a teacher sees it and slows down; a screen with a hundred small squares cannot do that. Second, practical learning needs real hands. No video can replace the experiment in the laboratory or the match on the field.',
    'The other side will say that online classes save travel time. That is true, but time saved is not learning gained. A child with a weak connection or a noisy home loses far more than the minutes saved on the road.',
    'Online tools are a useful support, not a substitute for the classroom.',
    'I therefore urge the House to oppose the motion. Thank you.',
  ),
  sol: '**Plan:** address the audience; state the stand against the motion; two arguments with concrete examples; rebuttal that concedes a true point and then shows why it is not enough; a balanced conclusion; thanks. Conceding the smaller truth makes the rebuttal sound fair.',
}));
Q('db_homework', writing({
  ...W_DEBATE, d: 4, c: 'analysis',
  stem: 'Motion: **"This House believes that homework should be abolished up to Class 8."** You are proposing the motion. A speaker from the other side has just said, "Without homework, children will forget what they learn." Write your speech in **120–150 words**, rebutting this point and giving at least one argument of your own.',
  model: paras(
    'Respected Chairperson, learned judges, worthy opponents and friends in the audience.',
    'I speak for the motion that homework should be abolished up to Class 8.',
    'The previous speaker fears that children will forget what they learn. But memory comes from understanding and use, not from copying pages at ten at night. A child who has played with fractions while cooking remembers them better than one who has finished twenty sums half asleep. Short revision in class, and reading for pleasure, keep learning alive.',
    'Now consider the cost. Young children need play, rest and family time to grow. Heavy homework turns learning into a chore and sometimes into a quarrel at home.',
    'Let our schoolrooms teach well and let our evenings belong to childhood.',
    'I urge the House to support the motion. Thank you.',
  ),
  sol: '**Plan:** address the audience; state the stand; answer the given claim first (what really makes memory last); then add your own argument (the cost to childhood); close with an appeal and thanks. The rebuttal must meet the claim that was made, not a weaker version of it.',
}));
Q('db_exams', writing({
  ...W_DEBATE, d: 4,
  stem: 'Motion: **"Competitive entrance examinations do more harm than good."** You are speaking **for** the motion. Write your speech in **120–150 words**, with two arguments and a reply to the claim that such examinations reward merit.',
  model: paras(
    'Respected Chairperson, honourable judges, my worthy opponents and dear friends.',
    'I support the motion that competitive entrance examinations do more harm than good.',
    'First, they narrow education. Students spend years drilling questions of one pattern, and curiosity, art and sport are set aside. Second, they damage health. Many young people carry stress and fear of failure long before they reach adulthood.',
    'My opponents claim that these examinations reward merit. But a single three-hour paper cannot measure patience, creativity or character, and families that can pay for expensive coaching start with a clear advantage.',
    'A fair system would use many measures, not one terrifying day. Let talent be discovered across many years, not guessed in three hours.',
    'For these reasons, I urge the House to support the motion. Thank you.',
  ),
  sol: '**Plan:** address the audience; state the stand; two arguments on education and health; rebuttal of the merit claim with two points (limits of one paper, unequal access to coaching); conclusion proposing something better; thanks.',
}));

// ================================================================ multiple-choice items
Q('m_heading', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A newspaper column carries the heading **TO LET**. Which advertisement belongs under it?',
  opts: ['A two-room flat available on monthly rent', 'A used scooter offered at a fixed price', 'A teacher needed for a coaching centre', 'A lost wallet with a reward for the finder'],
  sol: 'To let means offered for rent, so a flat or shop available on rent belongs under it. The other three would appear under For Sale, Situations Vacant and Lost.',
}));
Q('m_limit', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Up to how many words does the school paper allow for a classified advertisement or a poster?',
  opts: ['Up to 50 words', 'Up to 80 words', 'Up to 120 words', 'Up to 150 words'],
  sol: 'Both the advertisement and the poster are written in up to 50 words; the speech and the debate are longer, at 120 to 150 words.',
}));
Q('m_unneeded', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which detail is **unnecessary** in a classified advertisement for a second-hand sofa set?',
  opts: ['How the family chose the sofa and who liked it most', 'The material and condition of the sofa', 'The price asked', 'The seller\'s contact number'],
  sol: 'A classified advertisement carries only the facts a buyer needs: what, in what condition, at what price, and how to reach the seller. The family\'s story costs words and helps no buyer.',
}));
Q('m_salute', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which is the most suitable salutation for a speech at the school assembly?',
  opts: ['Respected Principal, teachers and dear friends', 'Dear Sir or Madam', 'Hello guys, what is up', 'To whom it may concern'],
  sol: 'A speech greets the audience present, in order of rank and in a polite register. The other forms belong to letters or to casual talk.',
}));
Q('m_house', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In a debate, the speaker says, "I urge the House to agree." Here **the House** means',
  opts: ['the audience and judges to whom the case is put', 'the building in which the debate is held', 'the team that opposes the motion', 'the speaker who presides over the debate'],
  sol: 'In debating language, the House is the assembly that listens and decides, so a speaker appeals to it. The person who presides is the chairperson, and the opposing team is simply the opposition.',
}));
Q('m_rebuttal_def', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In a debate speech, a **rebuttal** is',
  opts: ['a reply that answers a point made by the other side', 'the first line that greets the audience', 'a list of statistics placed at the end', 'a joke told to relax the audience'],
  sol: 'To rebut is to answer and weaken a point from the opposing side, giving a reason why it fails.',
}));
Q('m_poster_ess', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which of these is **least** necessary on a poster announcing a school music evening?',
  opts: ['A paragraph on the history of Indian music', 'The date and time', 'The venue', 'The name of the organiser'],
  sol: 'A poster must be read in seconds, so it carries only essential information. A history lesson takes space and does not tell anyone when or where to come.',
}));
Q('m_motion', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The statement on which a debate is held, for example "Homework does more harm than good", is called',
  opts: ['the motion', 'the rebuttal', 'the slogan', 'the salutation'],
  sol: 'The proposition put before the House is the motion; speakers either support it or oppose it.',
}));
Q('m_headline_size', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Why is the title of a poster printed in large, bold letters?',
  opts: ['So that a passer-by can grasp the subject at a glance', 'Because the school paper requires capital letters', 'To add to the word count', 'So that the date need not be mentioned'],
  sol: 'A poster is seen briefly and from a distance. The title carries the main message, and the smaller lines hold the details.',
}));
Q('m_rhetq', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which device does this sentence from a speech use? "Can we call a river clean when fish cannot live in it?"',
  opts: ['A rhetorical question', 'A simile', 'Alliteration', 'An exclamation'],
  sol: 'The speaker asks a question that needs no answer, to make the audience think and agree. That is a rhetorical question.',
}));
Q('m_triplet', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A speaker says, "We must read, we must reflect, and we must respond." The speaker is using',
  opts: ['repetition in a group of three', 'a rhetorical question', 'a personal attack', 'a statistic'],
  sol: 'Repeating a pattern three times gives rhythm and emphasis, which helps a listener remember a point.',
}));
Q('m_closing', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which sentence makes the best **last line** of a speech on road safety?',
  opts: ['So tomorrow, before you start your engine, fasten your helmet; thank you for listening.', 'In conclusion, I shall now discuss the cost of helmets.', 'That is all I know about road safety.', 'Many people disagree with me, and that is also fine.'],
  sol: 'A conclusion leaves the audience with one action or image and ends with thanks. A new topic, a shrug or a vague remark does none of this.',
}));
Q('m_abbr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which abbreviation would readers understand at once in a To Let advertisement?',
  opts: ['2BHK', 'flt. 2 bdrm', 'bhk2', 'tw.rm.fl'],
  sol: 'Standard shorthand such as 2BHK is acceptable because readers know it. Invented abbreviations save a word but make readers guess.',
}));
Q('m_address_order', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A debater begins, "Respected Chairperson, honourable judges, worthy opponents and friends." Why is this a suitable opening?',
  opts: ['It greets those who matter to the debate, in order of importance', 'It states the motion', 'It begins the rebuttal', 'It announces the speaker\'s marks'],
  sol: 'A debate opening acknowledges the chair first, then the judges, then the other side and the audience, politely and in order.',
}));
Q('m_cost', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A newspaper charges ₹25 per word for a classified advertisement, but the heading is free. Anil has ₹800. What is the greatest number of words he can use after the heading?',
  opts: ['32', '40', '25', '50'],
  sol: 'Divide the budget by the rate: 800 ÷ 25 = 32 words. The 50-word limit is only a ceiling; his money is the real limit.',
}));
Q('m_better_ad', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Two advertisements are offered for a second-hand study table. **X:** "Study table for sale. Very good. Call me." **Y:** "**FOR SALE** Wooden study table, three drawers, 4 ft by 2 ft, light scratches. ₹2,200. Pick-up from Green Park, Raipur. Contact: 98XXXXXX10." Which is stronger, and why?',
  opts: ['Y, because it gives specific features, price and place without wasting words', 'X, because shorter advertisements always score higher', 'Y, because it uses more words than X', 'X, because hiding the price attracts more calls'],
  sol: 'Strength in a classified advertisement comes from specific facts, not from length. Y has a category heading, features, price, place and contact; X gives the reader nothing to decide on.',
}));
Q('m_tolet_compare', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Two To Let advertisements for different flats: **P:** "Spacious flat, all facilities, excellent locality, reasonable rent." **Q:** "1BHK, second floor, Bapu Nagar, ₹9,000 monthly, no lift." Which feature of Q best shows that it is the better advertisement?',
  opts: ['Specific facts, even an honest drawback, let a reader decide before calling', 'It is shorter than P', 'It avoids numbers', 'It praises the flat more strongly'],
  sol: 'P is made of words that every landlord uses and that no one can check. Q names size, floor, place, rent and a drawback, so only genuinely interested readers call, which serves the advertiser too.',
}));
Q('m_opening_young', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'You must open a speech to Class 6 students about keeping the campus clean. Which opening suits them best?',
  opts: ['Good morning, dear friends! Imagine our playground with not a single wrapper on it. Who will help me make that picture real?', 'Esteemed gathering, it is axiomatic that municipal hygiene is a prerequisite of civilisation.', 'Listen, you children keep dropping rubbish and I am tired of it.', 'The statistics of annual waste generation in metropolitan India are alarming.'],
  sol: 'The opening should be friendly, simple and picture-making for young listeners, and it should invite them to join in. The other openings are too heavy, too scolding or too statistical.',
}));
Q('m_rebuttal_choice', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Motion: "Schools should replace printed textbooks with tablets." The opposing speaker says, "Tablets distract students with games." Which reply, from a speaker for the motion, is the strongest rebuttal?',
  opts: ['Distraction depends on management: with games locked by the school and a teacher watching, one device holds every textbook and lightens the bag.', 'Tablets are very expensive, so schools should think twice.', 'My opponent has clearly never used a tablet in his life.', 'Games are fun, and children deserve fun.'],
  sol: 'A strong rebuttal accepts the worry and then shows, with a workable condition, why it does not defeat the motion. The weaker replies change the subject, attack the person or agree with the opposition.',
}));
Q('m_remove_detail', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A poster reads: **FREE EYE CHECK-UP CAMP** / *See clearly, live well* / Date: 9 August, 10 am to 1 pm / Venue: Community Hall, Gokul Colony / Organised by: Gokul Welfare Association. Which detail, if removed, would make the poster least useful to someone who wants to attend?',
  opts: ['The venue', 'The slogan', 'The name of the organiser', 'The word FREE'],
  sol: 'Without the venue a willing visitor cannot reach the camp at all. The slogan and the organiser\'s name add appeal and trust, and the word free adds attraction, but none of them is needed to find the place.',
}));
Q('m_trim', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Reena\'s draft poster for a Reading Week has 64 words, and the limit is 50. Her lines are: title; slogan; dates; venue; "We have organised this week for the past ten years with great success and enthusiasm."; "Come, join and enjoy with your family, friends and neighbours." Which cut keeps the most useful content?',
  opts: ['Delete the sentence about ten years of success and shorten the last invitation', 'Delete the dates and the venue', 'Delete the title and the slogan', 'Delete every line except the invitation'],
  sol: 'The self-praise tells readers nothing they can act on, and the closing invitation can be shortened. The dates, venue, title and slogan are the content a poster exists to give.',
}));
Q('m_register_debate', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which phrase is out of place in a formal debate speech?',
  opts: ['You people are talking nonsense', 'With due respect to the other side', 'My worthy opponent has overlooked one fact', 'Honourable judges, consider this example'],
  sol: 'A debater attacks arguments, never people. Courteous phrasing keeps the register formal and the audience on the speaker\'s side.',
}));
Q('m_flaw_close', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A speaker ends: "Thank you, friends. Before I sit down, I must tell you that fast food causes heart disease, and that is why our canteen must change." What is the main flaw in this ending?',
  opts: ['It brings in a fresh argument after the thanks, so the speech has no real closing', 'It uses the words thank you', 'It is too polite', 'It mentions the canteen'],
  sol: 'A conclusion pulls the speech together and the thanks come last. A new argument after the thanks is unsupported and leaves the audience with a loose end.',
}));
Q('m_strongest_arg', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Motion: "School should start at 9 am instead of 8 am." Four arguments are offered for the motion. Which is the strongest?',
  opts: ['Adolescents need roughly eight to ten hours of sleep, and a later start lets those who study late come closer to it.', 'Some of us like to sleep late on weekdays.', 'A school in another city is said to do it.', 'Mornings in winter are cold.'],
  sol: 'The strongest argument is relevant to the aim of schooling, rests on a general fact and links the fact to the proposal. The others are personal preference, an unnamed example or a minor discomfort.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_fullsent', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'A classified advertisement is normally written in full, flowing paragraphs.',
  sol: 'It is written in short phrases, because every word costs money and space is limited.',
}));
Q('tf_attack', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'In a debate, a speaker may call an opponent foolish when the opponent\'s argument seems very weak.',
  sol: 'A debater may attack the argument but never the person; calling someone foolish loses the audience and the marks for tone.',
}));
Q('tf_newarg', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'A speech should not introduce a brand-new argument in its conclusion.',
  sol: 'The conclusion gathers what has been said and ends with a call to action and thanks; a new argument there would be undeveloped.',
}));
Q('fb_salute', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A speech begins with a ___ that greets the audience.',
  acc: [['salutation', 'greeting']],
  sol: 'The opening greeting of a speech is its salutation, for example Respected Principal, teachers and friends.',
}));
Q('fb_chair', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The person who presides over a debate and keeps order is called the ___.',
  acc: [['chairperson', 'chair', 'moderator', 'chairman']],
  sol: 'The chairperson (or moderator) presides, and every speaker addresses the chair first.',
}));
Q('fb_slogan', fb({
  t: 2, d: 1, c: 'understanding',
  stem: 'A short, catchy line on a poster that is easy to remember is its ___.',
  acc: [['slogan', 'tagline']],
  sol: 'The slogan sums up the message in a few memorable words.',
}));
Q('match_cat', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each column of classified advertisements with the details a reader needs most.',
  pairs: [
    ['For Sale', 'the item, its condition and the price'],
    ['To Let', 'size, locality, rent and facilities'],
    ['Situations Vacant', 'the post, qualifications, salary and how to apply'],
    ['Lost and Found', 'a clear description, the place and time, and how to reach the owner or finder'],
  ],
  sol: 'Each category answers its reader\'s first questions: a buyer asks about condition and cost, a tenant about space and rent, a job seeker about eligibility and pay, and an owner about recognising the lost item.',
}));
Q('match_terms', match({
  t: 3, d: 1, c: 'recall',
  stem: 'Match each term used in speeches, debates and posters with its meaning.',
  pairs: [
    ['Salutation', 'the greeting at the start of a speech'],
    ['Motion', 'the statement on which a debate is held'],
    ['Rebuttal', 'a reply to a point made by the other side'],
    ['Slogan', 'a short catchy line on a poster'],
  ],
  sol: 'These four terms are used across the chapter: the greeting opens a speech, the motion is the subject of a debate, the rebuttal answers the opposition, and the slogan sells a poster.',
}));
Q('ord_speech', ord({
  t: 3, d: 2, c: 'understanding',
  stem: 'Arrange the parts of a speech in the order in which they are delivered.',
  items: ['Salutation to the audience', 'An attention-grabbing opening', 'Body: points with examples', 'Conclusion with a call to action', 'Thanks to the audience'],
  sol: 'A speech greets first, hooks the listeners, develops its points, closes with an appeal and ends with thanks.',
}));
Q('ord_debate', ord({
  t: 4, d: 2, c: 'understanding',
  stem: 'Arrange the parts of a debate speech in the order in which they are usually delivered.',
  items: ['Address the chairperson, judges and the House', 'State your stand on the motion', 'Present arguments with support', 'Answer the points of the opposing side', 'Restate your stand, appeal and thank the House'],
  sol: 'A debater greets, declares a stand, argues, rebuts and then closes with an appeal.',
}));

// ================================================================ short answers (2 marks)
Q('s2_fixad', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [20, 40],
  stem: 'A student wrote: "I am very happy to tell everybody that I am selling my old guitar which I do not use now. It is quite good and plays nicely. If anybody wants it, he should contact me on phone." Rewrite it as a classified advertisement in **not more than 35 words**, adding suitable details and a contact line (98XXXXXX10).',
  model: lines('**FOR SALE**', 'Acoustic six-string guitar, good condition, hardly used. Carry case included. ₹3,500, negotiable.', 'Contact: Kabir, 98XXXXXX10'),
  sol: 'The rewrite replaces the chatty opening with a heading, names the item, its condition, a price and the case, and ends with a contact line.',
  scheme: [['Suitable heading in capitals', 0.5], ['Item, condition and price in short phrases', 1], ['Contact line at the end', 0.5]],
}));
Q('s2_wordy', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [15, 30],
  stem: 'Reduce this to a classified advertisement of **25 words or fewer** without losing a key fact: "We are glad to inform you that a spacious three-bedroom house in Sunder Nagar, Surat, which has a garden and a garage, is available for rent at ₹22,000 a month, and interested families may get in touch with Mr Shah."',
  model: lines('**TO LET**', '3-bedroom house, Sunder Nagar, Surat. Garden, garage. ₹22,000 monthly. Families preferred.', 'Contact: Mr Shah'),
  sol: 'Drop the polite opening and the connecting words; keep size, place, facilities, rent and the person to contact. The heading replaces the whole announcing sentence.',
  scheme: [['Suitable heading', 0.5], ['All key facts kept (size, place, facilities, rent)', 1], ['Contact; telegraphic style within the limit', 0.5]],
}));
Q('s2_poster_lack', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [30, 50],
  stem: 'A poster reads only: "ANNUAL DAY! Come and enjoy! Fun for all! Organised by Class 10." Name **two** essential items it lacks and say why each matters (30–50 words).',
  model: 'It lacks the date and time, so readers do not know when to attend. It also has no venue, so they cannot find the place. Contact details or entry information would help as well. The poster raises interest, but without these facts it cannot bring anyone to the event.',
  sol: 'The essentials are what, when and where, plus a way to enquire. Naming any two missing items with the reason each matters earns the marks.',
  scheme: [['Two missing essentials named', 1], ['Reason given for each', 1]],
}));
Q('s2_debate_open', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: [15, 35],
  stem: 'Write a strong **opening sentence**, including the address to the audience (not more than 30 words), for a speaker **against** the motion "Social media does more good than harm."',
  model: 'Respected Chairperson, honourable judges and friends, a tool that rewards what is loud instead of what is true cannot be called a friend of society.',
  sol: 'A strong opening addresses the chair and judges, takes a clear stand against the motion and gives the audience a thought to remember.',
  scheme: [['Correct address to chair and judges', 0.5], ['Clear stand against the motion', 0.5], ['An engaging, specific hook', 1]],
}));
Q('s2_why_short', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [30, 50],
  stem: 'Give **two** reasons why classified advertisements are written in short phrases rather than full sentences (30–50 words).',
  model: 'Newspapers charge by the word or the line, so every extra word costs the advertiser money. Space on a page is also limited, and readers scan many advertisements quickly, so short phrases carrying key facts are easier to take in than long sentences.',
  sol: 'The two reasons are cost and space; ease of scanning is a related benefit for the reader.',
  scheme: [['Reason 1 (cost per word)', 1], ['Reason 2 (limited space or quick reading)', 1]],
}));
Q('s2_rebut', short({
  t: 4, d: 4, c: 'analysis', marks: 2, wl: [30, 50],
  stem: 'Motion: "Examinations should be replaced by projects." A speaker against the motion says, "Projects can be copied from the internet, so they cannot test real ability." Write a **two-sentence rebuttal** for the motion (30–50 words).',
  model: 'My opponent is right that careless projects can be copied, but that is a fault of design, not of projects. Viva questions, drafts shown in class and tasks on local topics make copying difficult and test real understanding.',
  sol: 'A good rebuttal accepts what is true in the claim, then shows with a practical fix why the conclusion does not follow.',
  scheme: [['Acknowledges and answers the exact claim', 1], ['Gives a workable counter-point', 1]],
}));
Q('s2_close_rewrite', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: [30, 50],
  stem: 'A speech on water conservation ends: "That is all I wanted to say. Bye." Rewrite the ending in 30–50 words with a call to action and thanks.',
  model: 'Friends, water is not ours to waste. Tomorrow, mend one leaking tap in your home and persuade one neighbour to do the same. Together, our small acts will keep our wells full for the next generation. Thank you for listening patiently.',
  sol: 'A strong ending names one clear action, gives a reason that looks to the future and finishes with thanks, in a spoken style.',
  scheme: [['A specific call to action', 1], ['A closing thought and thanks in a suitable register', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_compare_posters', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: [50, 80],
  stem: 'Two posters for a school book fair. **P:** "BOOK FAIR / Come and buy books / At school / Best fair ever!!!" **Q:** "READ. SWAP. DISCOVER / Greenfield School Book Fair / 12 to 14 March, 9 am to 4 pm, School Library Hall / Second-hand book exchange; author talk on 13 March / Entry free". Which is better? Give three reasons (50–80 words).',
  model: 'Poster Q is better. First, it gives complete facts: dates, time, venue and free entry, whereas P does not say when or where. Second, it offers reasons to come, an exchange and an author talk. Third, its three-word slogan is catchy and sets the mood, while P relies on exclamation marks and a boast.',
  sol: 'Judge both against the essentials of a poster (facts, appeal, slogan) and decide with reasons.',
  scheme: [['Correct verdict (Q)', 1], ['Reason 1 with evidence', 1], ['Reasons 2 and 3 with evidence', 1]],
}));
Q('s3_body', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: [50, 80],
  stem: 'Write the **body paragraph** of a speech for Class 9 students on the topic "Be kind online" (50–80 words). Give two points and one example.',
  model: 'Words typed on a screen hurt as much as words spoken in a corridor, and they travel further. First, think before you post: ask whether you would say it to the person\'s face. Second, stand up for a classmate who is mocked; a single kind comment can turn a lonely day around. Last year, one friendly message was enough to bring a withdrawn boy back into the group chat.',
  sol: 'A body paragraph in a speech states its points clearly, links them with signposting words and supports at least one with a short example.',
  scheme: [['Two clear points', 1], ['A relevant example', 1], ['Spoken style and signposting', 1]],
}));
Q('s3_structure', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: [50, 80],
  stem: 'Explain how a debate speech differs from an ordinary speech in its structure and in whom it addresses (50–80 words).',
  model: 'A debate speech takes a firm stand on a stated motion and addresses the chairperson, the judges and the opponents. Besides its arguments it includes a rebuttal that answers the other side. It ends by restating the stand. An ordinary speech informs or inspires its audience without opposing anyone, so it needs no rebuttal.',
  sol: 'The differences are the fixed stand on a motion, the layered address, the rebuttal and the closing restatement.',
  scheme: [['Stand on a motion and layered address', 1], ['Rebuttal included', 1], ['Contrast with an ordinary speech', 1]],
}));
Q('s3_rebuttal_par', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: [50, 80],
  stem: 'Motion: "Every student should learn a musical instrument." The opposing speaker says, "Students already have too much to study; a new activity is only a burden." Write a **rebuttal paragraph** for the motion (50–80 words) with the claim, a counter-point and an example.',
  model: 'My opponent speaks of burden, but music is not a burden; it is relief. A student who practises the flute for twenty minutes returns to algebra calmer and more focused. Learning an instrument also teaches patience and regular practice, habits that help every subject. A busy timetable needs a balancing activity, and music is one that rewards effort quickly.',
  sol: 'Take the claim of burden seriously, turn it with a reason (music as relief and discipline) and support it with a concrete example.',
  scheme: [['Addresses the claim of burden directly', 1], ['A reasoned counter-point', 1], ['A concrete example', 1]],
}));
Q('s3_adapt', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: [50, 80],
  stem: 'A student opens a speech to classmates with: "Hey guys, we all know exams are stressful, right?" Rewrite the opening for the **parents** at an annual function, and say in one sentence what you changed and why (50–80 words).',
  model: 'Respected parents, teachers and guests, good evening. Many of you have sat beside a tired child at midnight, and you know how heavy examination season can feel. I changed the casual greeting into a formal salutation and spoke from the parents\' own experience, because adults expect respect and respond to what they have lived.',
  sol: 'Adapting for a new audience changes the salutation, the register and the shared experience used for the hook.',
  scheme: [['Formal salutation for the new audience', 1], ['A hook drawn from the parents\' experience', 1], ['Explains the change', 1]],
}));

// ================================================================ case-based (4 marks, four 1-mark parts)
Q('case_ad_draft', caseQ({
  t: 1, d: 2, c: 'understanding', origin: 'soyl-original',
  stem: 'Read a student\'s draft advertisement and answer the questions.',
  passage: '**WANTED**\n\nI am looking for a tutor. I am a student of Class 8 and I live in Vasant Vihar, which is a very nice colony with a big park. The tutor must teach everything well and I will pay whatever is right. Kindly call me.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which essential detail is **missing** from the advertisement?', opts: ['The subjects, timings and a contact number', 'The age of the student', 'A description of the colony', 'A greeting to the reader'], sol: 'A reader cannot respond without knowing what is to be taught, when, and how to reach the writer. The draft gives none of these.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Which sentence adds the **least** value and should be deleted first?', opts: ['The description of the colony and its park', 'The mention of Class 8', 'The mention of the locality', 'The request to call'], sol: 'Only the locality matters to a tutor; praise of the colony costs words and gives no useful fact.' })),
    child('c', mcq({ t: 1, d: 2, c: 'understanding', stem: 'Why is "I will pay whatever is right" a weak phrase in an advertisement?', opts: ['It leaves the fee vague, so tutors cannot decide whether to reply', 'It is too polite', 'It is too short', 'It uses the word pay'], sol: 'A vague fee wastes the reader\'s time; a stated fee or range lets the right people respond.' })),
    child('d', short({ t: 1, d: 3, c: 'application', marks: 1, wl: [15, 30], stem: 'Rewrite the whole draft as an advertisement of **not more than 30 words**.', model: lines('**TUTOR WANTED**', 'For Class 8 mathematics and science, Vasant Vihar, evenings. ₹3,000 monthly.', 'Contact: Ria, 98XXXXXX10'), sol: 'A heading, the subjects and level, the place, time and fee, and a contact line make the advertisement complete in few words.', scheme: [['Specific heading, subjects, place, fee and contact within the limit', 1]] })),
  ],
  sol: 'Check the draft against the checklist for a classified advertisement: category heading, what is wanted, key details, terms, contact, and no wasted words.',
}));
Q('case_debate_draft', caseQ({
  t: 4, d: 3, c: 'understanding', origin: 'soyl-original',
  stem: 'Read a student\'s draft debate speech on the motion "Sports should be a compulsory subject up to Class 10", spoken **for** the motion, and answer the questions.',
  passage: 'Hello everyone. I am for the motion. Sports are good. My opponent, who has clearly never held a bat, says sports waste time, which is stupid. Sports keep us fit. Everyone knows that. Therefore sports should be compulsory.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Which part of the draft is a personal attack rather than a rebuttal?', opts: ['The remark that the opponent has clearly never held a bat', 'The remark that sports keep us fit', 'The statement that the speaker is for the motion', 'The final sentence beginning "Therefore"'], sol: 'A rebuttal answers the claim; the remark about the bat mocks the person and gives no reason.' })),
    child('b', mcq({ t: 4, d: 2, c: 'understanding', stem: 'What is missing from the opening of the draft?', opts: ['The address to the chairperson, judges and opponents', 'The speaker\'s name', 'A list of statistics', 'A joke'], sol: 'A debate begins with a formal address in order of importance; the draft opens with a casual greeting.' })),
    child('c', mcq({ t: 4, d: 3, c: 'analysis', stem: 'Why is "Sports keep us fit. Everyone knows that." a weak argument?', opts: ['It asserts a claim without a reason, an example or evidence', 'It is too long', 'It uses the word fit', 'It is too formal'], sol: '"Everyone knows" is not evidence. A strong argument explains how and gives an example.' })),
    child('d', short({ t: 4, d: 2, c: 'application', marks: 1, wl: [8, 25], stem: 'Rewrite the final sentence to restate the stand and thank the House.', model: 'For these reasons, I urge the House to support the motion. Thank you.', sol: 'The closing restates the stand with a formal appeal and ends with thanks.', scheme: [['Restates the stand, appeals and thanks the House', 1]] })),
  ],
  sol: 'Check the draft against the debate structure: formal address, stand, supported arguments, a rebuttal that answers the claim, and a closing appeal with thanks.',
}));
