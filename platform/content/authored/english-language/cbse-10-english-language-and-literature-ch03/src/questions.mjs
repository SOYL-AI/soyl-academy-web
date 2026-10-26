// CBSE 10 English Language and Literature, ch03 Writing Skills — question bank.
// Every task, data set, name and address is invented for SOYL; no board-paper or textbook task is reused.
// Line breaks inside letters use Markdown hard breaks (two spaces before the newline).
import { Q, mcq, fb, short, long, tf, ar, match, ord, writing, caseQ, child, table, bars } from '../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs';

const BR = '  \n';
const letter = (parts) => parts.join('\n\n');
const lines = (...l) => l.join(BR);

// SOYL rubrics, modelled on the CBSE marking pattern for Section B writing (5 marks).
export const LETTER_RUBRIC = [
  ['Format', 1, "Sender's address, date, receiver's address, subject, salutation, complimentary close and name, in order (deduct 0.5 for one or two missing or misplaced parts)."],
  ['Content', 2, 'All the cues are covered with relevant, specific details; the purpose is clear in the first paragraph and the action requested in the last.'],
  ['Organisation and expression', 1, 'Three clear paragraphs, logical order, linking words and a polite, formal register throughout.'],
  ['Accuracy', 1, 'Grammar, spelling and punctuation are correct; within the word limit.'],
];
export const PARA_RUBRIC = [
  ['Content', 3, 'Introduction naming the input, an overview of the main trend, key figures with correct units, and at least one comparison; a conclusion that follows from the data.'],
  ['Organisation and expression', 1, 'Logical order (overview → details → conclusion), varied trend and comparison language, linking words.'],
  ['Accuracy', 1, 'Grammar, spelling and figures quoted correctly; no opinions beyond the data; within the word limit.'],
];

const W_LETTER = { format: 'letter-formal', wl: [100, 120], marks: 5, rubric: LETTER_RUBRIC, d: 3, c: 'application', t: 1 };
const W_PARA = { format: 'paragraph', wl: [100, 120], marks: 5, rubric: PARA_RUBRIC, d: 3, c: 'analysis', t: 2 };

// ================================================================ letters (writing, 5 marks)
Q('let_table', writing({
  ...W_LETTER, d: 2,
  stem: 'You are **Riya Sharma**, 14 Shanti Nagar, Jaipur 302006. You ordered a study table from Furnish Home Pvt Ltd, Koramangala, Bengaluru 560034 (Order No. FH20817). It arrived with a cracked top and missing drawer handles. Write a letter in **100–120 words** to the Customer Relations Manager complaining about it and asking for a replacement or refund.',
  model: letter([
    lines('14 Shanti Nagar', 'Jaipur 302006'),
    '27 October 2026',
    lines('The Customer Relations Manager', 'Furnish Home Pvt Ltd', 'Koramangala, Bengaluru 560034'),
    '**Subject: Complaint about a damaged study table (Order No. FH20817)**',
    'Sir/Madam,',
    'I am writing to complain about a study table I ordered from your website on 15 October. It was delivered yesterday in a damaged condition.',
    'The tabletop has a deep crack along one edge, and two drawer handles and their screws were missing from the box. Since I paid the full amount in advance, this is very disappointing.',
    'I request you to replace the table within a week or refund the full amount of ₹6,499. I have kept the packing and the invoice for your inspection.',
    lines('Yours faithfully', 'Riya Sharma'),
  ]),
  sol: '**Plan:** P1 purpose (complaint, order details) → P2 the defects (crack, missing handles) → P3 action wanted (replacement or refund, time limit) and evidence kept. The tone stays firm but polite; the order number appears in the subject line so the company can trace it.',
}));
Q('let_garbage', writing({
  ...W_LETTER,
  stem: 'You are **Aman Verma**, Head Boy, Green Valley School, Sector 9, Rohini, Delhi 110085. Garbage bins outside the school gate overflow for days and stray animals scatter the waste. Write a letter in **100–120 words** to the Sanitation Officer, Municipal Corporation (Rohini Zone), Delhi, complaining about the problem and suggesting a solution.',
  model: letter([
    lines('Green Valley School', 'Sector 9, Rohini', 'Delhi 110085'),
    '27 October 2026',
    lines('The Sanitation Officer', 'Municipal Corporation, Rohini Zone', 'Delhi 110085'),
    '**Subject: Overflowing garbage bins outside Green Valley School**',
    'Sir/Madam,',
    'I wish to bring to your notice the unhygienic condition outside our school gate, where the garbage bins have not been cleared for over a week.',
    'Waste spills onto the road, stray animals scatter it further and the stench reaches our classrooms. More than a thousand students pass this spot daily, and several have complained of nausea.',
    'I request you to arrange daily clearing of the bins and to replace them with larger, covered ones. Prompt action will protect the health of students and residents alike.',
    lines('Yours faithfully', 'Aman Verma', 'Head Boy'),
  ]),
  sol: '**Plan:** P1 the problem and where; P2 its effects (spill, animals, smell, number of students affected); P3 two specific actions (daily clearing, covered bins) and why they matter. The designation (Head Boy) is added under the name because he writes on behalf of the school.',
}));
Q('let_editor_noise', writing({
  ...W_LETTER, d: 3, c: 'analysis',
  stem: 'You are **Sneha / Sahil Iyer**, 7 Gandhi Road, Nagpur 440010. Loudspeakers at late-night functions in your area disturb students preparing for board exams. Write a letter in **100–120 words** to the Editor, *The City Chronicle*, Nagpur, highlighting the problem and suggesting measures.',
  model: letter([
    lines('7 Gandhi Road', 'Nagpur 440010'),
    '27 October 2026',
    lines('The Editor', 'The City Chronicle', 'Nagpur 440001'),
    '**Subject: Late-night loudspeakers disturbing students**',
    'Sir/Madam,',
    'Through the columns of your newspaper, I wish to draw attention to the noise from loudspeakers at late-night functions in our locality.',
    'With the board exams only weeks away, students cannot study or sleep properly. Elderly residents and patients suffer too, and the noise often continues well past ten at night.',
    'The authorities should strictly enforce the time limits on amplified sound and act quickly on complaints. Organisers, too, could keep the volume low and end on time.',
    lines('Yours faithfully', 'Sneha Iyer'),
  ]),
  sol: '**Plan:** P1 the issue (addressed to the public through the editor); P2 who is affected and how (students, elderly, patients; timing); P3 suggestions for authorities **and** citizens. A letter to the editor is written for readers, so it argues the public interest rather than a personal grievance.',
}));
Q('let_editor_library', writing({
  ...W_LETTER, d: 4, c: 'evaluation', bloom: 'create',
  stem: 'You are **Meera / Manav Das**, 23 Station Road, Siliguri 734001. Your town has no public library or reading room for young people. Write a letter in **100–120 words** to the Editor, *North Bengal Times*, explaining why the town needs one and what it should offer.',
  model: letter([
    lines('23 Station Road', 'Siliguri 734001'),
    '27 October 2026',
    lines('The Editor', 'North Bengal Times', 'Siliguri 734001'),
    '**Subject: Need for a public library for young people in Siliguri**',
    'Sir/Madam,',
    'I wish to highlight, through your newspaper, that our growing town still has no public library or reading room for students.',
    'Many families cannot afford reference books or a quiet place to study, and children spend hours on phones for want of better options. A library would build reading habits and support exam preparation.',
    'I suggest that the municipality convert an unused hall into a library with reference books, newspapers, computers with internet and an evening study room. Local businesses could donate books.',
    lines('Yours faithfully', 'Meera Das'),
  ]),
  sol: '**Plan:** P1 the gap; P2 reasons it matters (cost of books, no quiet space, screen time; benefits); P3 a practical proposal (where, what it should offer, how to fund it). Evaluation shows in choosing realistic, specific suggestions rather than general complaints.',
}));
Q('let_order_books', writing({
  ...W_LETTER, d: 2,
  stem: 'You are **Kavita / Kunal Rao**, Librarian, Sunrise Public School, Mysuru 570009. Write a letter in **100–120 words** to the Sales Manager, Vidya Book House, Sayyaji Rao Road, Mysuru 570001, placing an order for books for the school library. Mention titles, quantities, delivery date and mode of payment.',
  model: letter([
    lines('Sunrise Public School', 'Mysuru 570009'),
    '27 October 2026',
    lines('The Sales Manager', 'Vidya Book House', 'Sayyaji Rao Road, Mysuru 570001'),
    '**Subject: Order for library books**',
    'Sir/Madam,',
    'We would like to place an order for the following books for our school library:',
    '1. Oxford Student Atlas for India (latest edition) — 10 copies  \n2. Wings of Fire by A. P. J. Abdul Kalam — 5 copies  \n3. Concise English–Hindi Dictionary — 8 copies',
    'Kindly deliver the books by 10 November and ensure that they are in good condition. Payment will be made by cheque on delivery. Please allow the usual educational discount.',
    lines('Yours faithfully', 'Kavita Rao', 'Librarian'),
  ]),
  sol: '**Plan:** P1 purpose (placing an order); P2 the order as a numbered list (title, edition, quantity) so nothing is ambiguous; P3 terms — delivery date, condition, payment mode, discount. Order letters are short and exact; no complaints or stories.',
}));
Q('let_order_sports', writing({
  ...W_LETTER,
  stem: 'You are **Arjun / Anjali Singh**, Sports Captain, Kendriya Vidyalaya, Bhatinda Cantonment, Bathinda 151004. Write a letter in **100–120 words** to the Manager, Champion Sports, Mall Road, Ludhiana 141001, ordering sports equipment for the annual sports meet. Ask about discount and delivery.',
  model: letter([
    lines('Kendriya Vidyalaya', 'Bhatinda Cantonment', 'Bathinda 151004'),
    '27 October 2026',
    lines('The Manager', 'Champion Sports', 'Mall Road, Ludhiana 141001'),
    '**Subject: Order for sports equipment**',
    'Sir/Madam,',
    'Our school wishes to order the following items for its annual sports meet:',
    '1. Footballs, size 5 — 6  \n2. Badminton rackets (carbon frame) — 12  \n3. Shuttlecock tubes (nylon) — 10  \n4. Relay batons — 8',
    'Please deliver the goods to the school office by 20 November. Kindly let us know whether you offer a discount on bulk orders for schools. Payment will be made through bank transfer on receipt of the bill.',
    lines('Yours faithfully', 'Arjun Singh', 'Sports Captain'),
  ]),
  sol: '**Plan:** P1 purpose; P2 list with specifications and quantities; P3 delivery place and date, the discount question, payment mode. A list keeps the body short and inside the word limit.',
}));
Q('let_enquiry_camp', writing({
  ...W_LETTER, d: 2,
  stem: 'You are **Nisha / Nikhil Paul**, 5 Marine Drive, Kochi 682031. You saw an advertisement for a summer coding camp run by ByteBridge Academy, MG Road, Kochi 682016. Write a letter in **100–120 words** to the Director enquiring about the courses, duration, fees, timings and transport.',
  model: letter([
    lines('5 Marine Drive', 'Kochi 682031'),
    '27 October 2026',
    lines('The Director', 'ByteBridge Academy', 'MG Road, Kochi 682016'),
    '**Subject: Enquiry about the summer coding camp**',
    'Sir/Madam,',
    'I read your advertisement in yesterday\'s newspaper about a summer coding camp for school students, and I would like some details before enrolling.',
    'Kindly let me know which courses are offered for Class 10 students, how long each course runs and what the daily timings are. I would also like to know the fee, whether it can be paid in instalments, and whether you provide transport from Marine Drive.',
    'I would be grateful if you could send me a brochure as well.',
    lines('Yours faithfully', 'Nisha Paul'),
  ]),
  sol: '**Plan:** P1 source of information and purpose; P2 the questions, grouped (courses → duration → timings → fee → transport); P3 request for a brochure. Enquiry letters ask polite indirect questions (*Kindly let me know which…*), not direct ones.',
}));
Q('let_enquiry_tour', writing({
  ...W_LETTER, d: 3,
  stem: 'You are **Farah / Faizan Khan**, Head Girl / Head Boy, Crescent School, Bhopal 462001. Your school plans a four-day educational tour to Rajasthan for 40 students and 4 teachers. Write a letter in **100–120 words** to the Manager, Desert Trails Travels, MI Road, Jaipur 302001, enquiring about the package.',
  model: letter([
    lines('Crescent School', 'Bhopal 462001'),
    '27 October 2026',
    lines('The Manager', 'Desert Trails Travels', 'MI Road, Jaipur 302001'),
    '**Subject: Enquiry about a four-day educational tour package**',
    'Sir/Madam,',
    'Our school is planning a four-day educational tour of Rajasthan in December for 40 students and 4 teachers, and we would like details of a suitable package.',
    'Please let us know the places covered, the mode of travel, the type of accommodation and meals, and the total cost per student. We would also like to know what safety arrangements and guides you provide.',
    'Kindly send us your brochure along with the booking terms at the earliest.',
    lines('Yours faithfully', 'Farah Khan', 'Head Girl'),
  ]),
  sol: '**Plan:** P1 who is travelling, when and how many; P2 the questions (places, travel, stay and meals, cost per student, safety and guides); P3 request for brochure and booking terms.',
}));

// ================================================================ analytical paragraphs (writing, 5 marks)
export const vMuseum = bars(
  { x: { min: 2018, max: 2026, label: 'Year' }, y: { min: 0, max: 7, label: 'Visitors (lakh)' }, label: 'Visitors (lakh)', points: [[2019, 4.2], [2020, 1.1], [2021, 1.8], [2022, 3.5], [2023, 4.8], [2024, 5.6], [2025, 6.1]] },
  'Bar chart of visitors to the State Heritage Museum: 4.2 lakh in 2019, 1.1 lakh in 2020, 1.8 lakh in 2021, 3.5 lakh in 2022, 4.8 lakh in 2023, 5.6 lakh in 2024 and 6.1 lakh in 2025.',
  'Visitors to the State Heritage Museum, 2019–2025 (illustrative data)',
);
Q('par_museum', writing({
  ...W_PARA, d: 3,
  assets: [vMuseum],
  stem: 'The bar chart shows the number of visitors to the State Heritage Museum from 2019 to 2025. Write an analytical paragraph in **100–120 words** describing and analysing the data.',
  model: 'The bar chart shows the number of visitors to the State Heritage Museum between 2019 and 2025. Overall, visitor numbers collapsed in 2020 but then recovered steadily, finally exceeding the 2019 level. In 2019 the museum received 4.2 lakh visitors. This figure plunged to just 1.1 lakh in 2020, roughly a quarter of the previous year\'s total. Recovery was slow at first, with 1.8 lakh visitors in 2021, before numbers nearly doubled to 3.5 lakh in 2022. By 2023 attendance (4.8 lakh) had overtaken the 2019 figure, and it went on rising to a peak of 6.1 lakh in 2025, almost one and a half times the 2019 level. In conclusion, the museum has more than recovered from its sharp fall.',
  sol: '**Plan:** introduce the chart → overview (fall, then recovery beyond the start) → details in time order with figures (4.2 → 1.1 → 1.8 → 3.5 → 4.8 → 6.1) → comparisons (a quarter; nearly doubled; one and a half times) → conclusion. Check: 1.1 ÷ 4.2 ≈ 0.26 (about a quarter); 3.5 ÷ 1.8 ≈ 1.9 (nearly doubled); 6.1 ÷ 4.2 ≈ 1.45. No reasons are invented: the chart does not say why numbers fell.',
}));
export const vTravel = table(
  ['Mode of travel to school', '2016 (%)', '2026 (%)'],
  [['Walk', '35', '18'], ['Bicycle', '30', '22'], ['School bus', '20', '28'], ['Private car / two-wheeler', '10', '24'], ['Public transport', '5', '8']],
  'Table of how 400 students of a Pune school travel to school: walking fell from 35 to 18 percent, bicycles from 30 to 22, school bus rose from 20 to 28, private vehicles from 10 to 24, and public transport from 5 to 8 percent between 2016 and 2026.',
  'Survey of 400 students, Vidya Niketan, Pune (illustrative data)',
);
Q('par_travel', writing({
  ...W_PARA, d: 4,
  assets: [vTravel],
  stem: 'The table shows how students of Vidya Niketan, Pune, travelled to school in 2016 and 2026. Write an analytical paragraph in **100–120 words** describing the changes.',
  model: 'The table compares how the students of Vidya Niketan, Pune, travelled to school in 2016 and in 2026. The clear trend is a shift away from walking and cycling towards motorised transport. Walking, the most common mode in 2016 at 35 per cent, almost halved to 18 per cent, while cycling fell from 30 to 22 per cent. In contrast, the share of students using private cars or two-wheelers more than doubled, from 10 to 24 per cent, and the school bus rose from 20 to 28 per cent, becoming the most popular choice. Public transport grew only slightly, from 5 to 8 per cent. Overall, students today depend far more on vehicles than they did a decade ago.',
  sol: '**Plan:** introduce → overview (from walking/cycling to vehicles) → falls (walk 35 → 18, about half; cycle 30 → 22) → rises (private 10 → 24, more than double; bus 20 → 28, now the largest) → small change (public transport 5 → 8) → conclusion. Grouping falls and rises is better than listing all ten numbers in table order.',
}));
const vRain = bars(
  { x: { min: 5, max: 13, label: 'Month (6 = June … 12 = December)' }, y: { min: 0, max: 400, label: 'Rainfall (mm)' }, label: 'Average rainfall (mm)', points: [[6, 50], [7, 90], [8, 120], [9, 125], [10, 280], [11, 350], [12, 140]] },
  'Bar chart of average monthly rainfall in a coastal town: June 50 mm, July 90, August 120, September 125, October 280, November 350 and December 140 mm.',
  'Average monthly rainfall, June–December, a coastal town in Tamil Nadu (illustrative data)',
);
Q('par_rain', writing({
  ...W_PARA, d: 4,
  assets: [vRain],
  stem: 'The bar chart shows the average monthly rainfall from June to December in a coastal town in Tamil Nadu. Write an analytical paragraph in **100–120 words** describing the pattern.',
  model: 'The bar chart presents the average rainfall in a coastal town in Tamil Nadu from June to December. The most striking feature is that the heaviest rain falls late in the year, in October and November, rather than in the June–September months. Rainfall is lowest in June at 50 mm and rises gradually through July (90 mm) and August (120 mm) before levelling off at 125 mm in September. It then more than doubles to 280 mm in October and peaks at 350 mm in November, seven times the June figure. December sees a sharp fall to 140 mm. In short, the town depends mainly on the October–November rains, and these two months account for well over half the rainfall shown.',
  sol: '**Plan:** introduce → overview (peak in Oct–Nov, not Jun–Sep) → gradual rise Jun–Sep with figures → jump and peak (280, 350; 350 ÷ 50 = 7) → fall in December → conclusion. Check the last claim: total = 50 + 90 + 120 + 125 + 280 + 350 + 140 = 1155 mm; October + November = 630 mm ≈ 55 per cent, "well over half".',
}));
const vScreen = table(
  ['Use of screen time', 'Share (%)'],
  [['Social media', '30'], ['Study apps and online classes', '25'], ['Gaming', '20'], ['Video streaming', '20'], ['Others', '5']],
  'Table of how 250 Class 10 students in Lucknow divide their daily screen time: social media 30 percent, study apps 25, gaming 20, video streaming 20 and others 5 percent.',
  'Survey of 250 Class 10 students, Lucknow (illustrative data); average screen time 4 hours a day',
);
Q('par_screen', writing({
  ...W_PARA, d: 3,
  assets: [vScreen],
  stem: 'The table shows how Class 10 students in Lucknow divide their screen time (average 4 hours a day). Write an analytical paragraph in **100–120 words** analysing the data.',
  model: 'The table shows how 250 Class 10 students in Lucknow divide their average daily screen time of four hours. Broadly, three-quarters of this time goes to activities other than study. Social media takes the largest share at 30 per cent, which is about 72 minutes a day. Study apps and online classes come second with 25 per cent, or an hour. Gaming and video streaming take 20 per cent each, so together these two forms of entertainment fill 96 minutes, more than the time given to study. The remaining 5 per cent goes to other uses. Clearly, only a quarter of the students\' screen time supports their learning.',
  sol: '**Plan:** introduce (sample, average) → overview (75 per cent non-study) → largest share with its time (30 per cent of 240 min = 72 min) → study (25 per cent = 60 min) → gaming + streaming (40 per cent = 96 min) → others → conclusion.',
}));
Q('par_millets', writing({
  ...W_PARA, d: 3, c: 'application',
  stem: 'Write an analytical paragraph in **100–120 words** on **"Millets return to Indian plates"** using the cues below.\n\n- 2023 declared International Year of Millets\n- rich in fibre, iron and calcium; need less water than rice\n- some states add millets to school meals\n- farmers get better prices\n- challenges: unfamiliar taste, fewer ready-to-cook products',
  model: 'Millets such as ragi, jowar and bajra are returning to Indian plates. Their revival gained momentum when 2023 was declared the International Year of Millets. Nutritionally, they are rich in fibre, iron and calcium, and as crops they need far less water than rice, which makes them suited to dry regions. Several states have begun adding millets to school meals, so children are growing up with them, and farmers who grow them are now getting better prices. However, the change is not complete. Many people still find the taste unfamiliar, and ready-to-cook millet products are fewer than those made from rice or wheat. On the whole, millets offer health and environmental benefits, but wider acceptance will need time and better products.',
  sol: '**Plan:** introduce the topic with the 2023 cue → benefits (nutrition, water) → spread (school meals, farmers) → contrast with challenges (*However*) → balanced conclusion. Every cue is used once; nothing beyond the cues is claimed as fact except the names of common millets.',
}));
export const vVillage = table(
  ['Facility in Sundarpur', '2006', '2026'],
  [['School', 'primary school up to Class 5', 'senior secondary school up to Class 12'], ['Drinking water', 'one hand pump', 'piped water to 80% of homes'], ['Health care', 'none; nearest clinic 15 km away', 'primary health centre in the village'], ['Road', 'kutcha track', 'paved road to the highway'], ['Internet', 'none', 'mobile tower and a library with Wi-Fi']],
  'Table comparing facilities in Sundarpur village in 2006 and 2026: school, drinking water, health care, road and internet all improved.',
  'Village development plan, Sundarpur (illustrative data)',
);
Q('par_village', writing({
  ...W_PARA, d: 3,
  assets: [vVillage],
  stem: 'The table, based on the village development plan, compares facilities in Sundarpur in 2006 and 2026. Write an analytical paragraph in **100–120 words** describing the changes.',
  model: 'The table compares the facilities available in Sundarpur village in 2006 and in 2026. Over these twenty years, the village has improved in every area shown. In 2006 children could study only up to Class 5, but today a senior secondary school takes them up to Class 12. Drinking water, once drawn from a single hand pump, now reaches 80 per cent of homes through pipes. Similarly, residents who earlier had to travel 15 km to a clinic now have a primary health centre in the village. Transport and communication have changed too: a kutcha track has become a paved road to the highway, and a mobile tower and a library with Wi-Fi connect the village to the internet. Clearly, Sundarpur has transformed.',
  sol: '**Plan:** introduce → overview (improvement in every area) → then-vs-now pairs grouped by theme (education; water and health; road and internet) with linkers (*but, similarly, too*) → conclusion. Use the past for 2006 and the present / present perfect for 2026.',
}));
const vEV = bars(
  { x: { min: 2020, max: 2026, label: 'Year' }, y: { min: 0, max: 30, label: 'Sales (thousand)' }, label: 'Electric two-wheelers sold (thousand)', points: [[2021, 2], [2022, 5], [2023, 11], [2024, 19], [2025, 26]] },
  'Bar chart of electric two-wheeler sales in Indore: 2 thousand in 2021, 5 thousand in 2022, 11 thousand in 2023, 19 thousand in 2024 and 26 thousand in 2025.',
  'Electric two-wheelers sold in Indore, 2021–2025 (illustrative data)',
);
Q('par_ev', writing({
  ...W_PARA, d: 2,
  assets: [vEV],
  stem: 'The bar chart shows the number of electric two-wheelers sold in Indore from 2021 to 2025. Write an analytical paragraph in **100–120 words** on the data.',
  model: 'The bar chart illustrates the sales of electric two-wheelers in Indore from 2021 to 2025. Overall, sales rose every single year, growing thirteen-fold over the period. In 2021 only 2 thousand vehicles were sold, but the figure more than doubled to 5 thousand in 2022. The following year sales again more than doubled, reaching 11 thousand. Growth continued in 2024, when 19 thousand were sold, and in 2025 sales climbed to 26 thousand. Although the yearly increase was largest between 2023 and 2024 (8 thousand), the rate of growth slowed after 2023, as each rise was a smaller share of the previous total. In conclusion, electric two-wheelers have moved from a rare choice to a common one in Indore.',
  sol: '**Plan:** introduce → overview (continuous rise; 26 ÷ 2 = 13-fold) → year-by-year with figures (2 → 5 → 11 → 19 → 26) → analysis (largest absolute rise 2023–24: +8; percentage growth falling: +150%, +120%, +73%, +37%) → conclusion.',
}));
const vPower = table(
  ['Source of electricity', '2015 (%)', '2025 (%)'],
  [['Coal', '70', '52'], ['Solar', '3', '20'], ['Wind', '7', '12'], ['Hydro', '15', '12'], ['Others', '5', '4']],
  'Table of the share of electricity sources in a state: coal fell from 70 to 52 percent, solar rose from 3 to 20, wind rose from 7 to 12, hydro fell from 15 to 12 and others from 5 to 4 percent between 2015 and 2025.',
  'Share of electricity generated by source in one state (illustrative data)',
);
Q('par_power', writing({
  ...W_PARA, d: 4, c: 'evaluation',
  assets: [vPower],
  stem: 'The table shows the share of electricity generated from different sources in a state in 2015 and 2025. Write an analytical paragraph in **100–120 words** analysing the changes.',
  model: 'The table shows the share of electricity a state generated from different sources in 2015 and 2025. Although coal remained the largest source, the decade saw a clear move towards renewable energy. Coal\'s share fell from 70 to 52 per cent, a drop of 18 percentage points. The biggest gain was in solar power, which rose from just 3 per cent to 20 per cent, more than six times its earlier share. Wind also grew, from 7 to 12 per cent. By contrast, hydro power slipped from 15 to 12 per cent, and other sources fell slightly from 5 to 4 per cent. Taken together, solar and wind now supply almost a third of the state\'s electricity, compared with a tenth in 2015.',
  sol: '**Plan:** introduce → overview (coal still largest, but shift to renewables) → biggest change first (coal −18 points; solar 3 → 20, 20 ÷ 3 ≈ 6.7) → other changes (wind up; hydro and others down) → evaluative conclusion (solar + wind: 3 + 7 = 10 per cent → 20 + 12 = 32 per cent, "almost a third"). Note *percentage points* for a difference between two percentages.',
}));

// ================================================================ objective items: format and register (t01)
Q('fmt_order', ord({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Arrange the parts of a formal letter in the correct order.',
  items: ["Sender's address", 'Date', "Receiver's address", 'Subject', 'Salutation', 'Body', 'Complimentary close', 'Name (and designation)'],
  sol: 'The CBSE format runs top to bottom: sender\'s address → date → receiver\'s address → subject → salutation → body → complimentary close → name. The subject comes **before** the salutation.',
}));
Q('fmt_subject', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Which is the most effective subject line for a letter complaining about a faulty geyser bought last week?',
  opts: ['Subject: Complaint about a defective geyser (Invoice No. 4471)', 'Subject: Very angry customer', 'Subject: Geyser', 'Subject: Please read this letter immediately'],
  sol: 'A good subject line states the **purpose and the topic** briefly and gives a reference the company can trace. The others are emotional, vague or say nothing about the problem.',
}));
Q('fmt_close', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which complimentary close is suitable for a formal letter that begins with "Sir/Madam"?',
  opts: ['Yours faithfully', 'Your loving friend', 'Lots of love', 'See you soon'],
  sol: 'Formal letters to an official whose name you do not use close with *Yours faithfully* (*Yours sincerely* is also accepted in CBSE answers). The others are informal.',
}));
Q('fmt_register', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Choose the most suitable sentence for the closing paragraph of a letter of complaint.',
  opts: ['I request you to look into the matter and take prompt action.', 'Fix this right now or else!', 'Hope you get what I am saying, lol.', 'I am totally fed up with your useless service.'],
  sol: 'A formal letter stays **polite but firm**. The other options are threatening, slangy or rude, which costs marks for expression.',
}));
Q('fmt_editor_open', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which opening sentence suits a **letter to the editor**?',
  opts: ['Through the columns of your newspaper, I wish to draw attention to the poor condition of our parks.', 'I am writing to order twenty copies of your newspaper.', 'Dear friend, I hope you are fine.', 'I would like to know the fee for your coaching classes.'],
  sol: 'A letter to the editor raises a **public issue** for readers. The other openings belong to an order letter, an informal letter and an enquiry.',
}));
Q('fmt_purpose', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What should the **first paragraph** of a formal letter do?',
  opts: ['State the purpose of writing briefly', 'List every detail of the problem', 'Thank the reader in advance', 'Describe the writer\'s family'],
  sol: 'The first paragraph tells the reader at once **why** you are writing. Details go in the second paragraph; the request and thanks come last.',
}));
Q('fmt_enquiry_q', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which sentence is the best way to ask a question in an **enquiry letter**?',
  opts: ['Kindly let me know whether the course fee can be paid in instalments.', 'Can I pay in instalments or not?', 'Tell me about instalments.', 'Why don\'t you allow instalments?'],
  sol: 'Enquiry letters use **polite indirect questions** (*Kindly let me know whether…*). The others are blunt, demanding or accusing.',
}));
Q('fmt_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Where is the **date** written in a formal letter in the CBSE format?',
  opts: ["Below the sender's address", 'Below the subject line', 'After the complimentary close', 'At the end of the body'],
  sol: 'The date comes immediately after the sender\'s address and before the receiver\'s address.',
}));
Q('fmt_order_detail', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A student ordering 15 science kits writes: "Please send some kits soon." What is the main weakness?',
  opts: ['It gives no quantity, specification or delivery date.', 'It is too formal.', 'It should begin with "Dear friend".', 'It uses the word "please".'],
  sol: 'An order letter must be **exact**: item, specification, quantity, delivery date and payment. "Some kits soon" leaves the supplier guessing.',
}));
Q('fmt_fb_phrase', fb({
  t: 1, d: 2, c: 'recall', marks: 1,
  stem: 'Complete the formal phrases.\n\n"I wish to bring to your ___ the irregular water supply in our area. I hope you will take ___ action."',
  acc: [['notice', 'attention'], ['prompt', 'immediate', 'urgent', 'necessary', 'suitable', 'quick']],
  sol: 'Fixed formal phrases: *bring to your **notice / attention***; *take **prompt / immediate / necessary** action*.',
  scheme: [['Blank 1: notice / attention', 0.5], ['Blank 2: prompt / immediate / necessary action', 0.5]],
}));
Q('fmt_fb_close', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Fill in the blank.\n\nA formal letter that begins "Sir/Madam," usually ends with "Yours ___," followed by the writer\'s name.',
  acc: [['faithfully', 'sincerely']],
  sol: '*Yours faithfully* is the standard close; CBSE also accepts *Yours sincerely*. Note the spelling and the small *f / s*.',
}));
Q('fmt_match', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each type of formal letter with its main purpose.',
  pairs: [
    ['Letter of complaint', 'to report a problem and ask for it to be put right'],
    ['Letter to the editor', 'to raise a public issue for readers and authorities'],
    ['Letter placing an order', 'to request goods with exact quantities and terms'],
    ['Letter of enquiry', 'to ask for information before deciding'],
  ],
  sol: 'Each type has one job: complain and seek redress; raise a public issue; order goods exactly; ask for information.',
}));
Q('fmt_match_register', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each informal expression with its formal equivalent.',
  pairs: [
    ['Fix it ASAP.', 'Kindly resolve the matter at the earliest.'],
    ['Can you tell me…?', 'I would be grateful if you could inform me…'],
    ['Thanks a lot!', 'Thank you for your kind attention.'],
    ['It\'s really bad.', 'The situation is a matter of serious concern.'],
  ],
  sol: 'Formal register avoids abbreviations, contractions and exclamations, and uses polite, complete forms.',
}));
Q('fmt_tf_contractions', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'True or false: contractions such as *don\'t* and *I\'m* are best avoided in a formal letter.',
  ans: true,
  sol: 'Formal letters use full forms (*do not, I am*). Contractions make the tone conversational.',
}));
Q('fmt_tf_dear', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'True or false: in a letter to the editor, the body should mainly describe the writer\'s personal feelings.',
  ans: false,
  sol: 'A letter to the editor addresses a **public** issue: it states the problem, its effects on people, and suggestions. Personal feelings may appear briefly but are not the focus.',
}));
Q('fmt_ar', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'In a letter placing an order, the items are best given as a numbered list.',
  r: 'A list shows each item, its specification and quantity clearly, so the supplier cannot misread the order.',
  key: 'a',
  sol: 'Both are true, and R is the reason a list is preferred: clarity of items and quantities.',
}));
Q('fmt_ar2', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'The subject line of a formal letter comes after the salutation.',
  r: 'The subject line tells the reader at a glance what the letter is about.',
  key: 'd',
  sol: 'A is false: in the CBSE format the subject line comes **before** the salutation. R is true; that is why the subject line is placed early.',
}));
Q('fmt_short_subject', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: [10, 30],
  stem: 'You are writing to the Station Superintendent, Patna Junction, about the lack of drinking water on platform 4. Write a suitable **subject line** and **opening sentence**.',
  model: '**Subject:** Shortage of drinking water on platform 4.\n\nI wish to bring to your notice that the drinking water taps on platform 4 have not been working for the past week.',
  sol: 'The subject names the problem and place briefly; the opening sentence states the purpose at once with a formal phrase (*bring to your notice*) and a specific detail (one week).',
  scheme: [['Subject line: specific and brief', 1], ['Opening sentence: states the purpose formally', 1]],
}));
Q('fmt_short_rewrite', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [15, 40],
  stem: 'Rewrite the informal sentences in a formal register suitable for a letter of complaint.\n\n"Your delivery guy was super rude. Also the stuff came 5 days late!!"',
  model: 'I regret to inform you that your delivery person was discourteous. Moreover, the goods were delivered five days after the promised date.',
  sol: 'Replace slang (*guy, super, stuff*) with neutral words; avoid exclamation marks; use linking words (*Moreover*) and factual detail (*five days after the promised date*).',
  scheme: [['First sentence formal and accurate', 1], ['Second sentence formal, linked, no exclamation', 1]],
}));
Q('fmt_short_errors', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: [20, 50],
  stem: 'A student ends a formal letter like this:\n\n"Hoping for a reply soon!! Thank you so much.  \nYours lovingly,  \nRahul"\n\nIdentify **two** problems and rewrite the closing correctly.',
  model: 'Problems: the exclamation marks and gushing tone are informal, and *Yours lovingly* is a close for personal letters. Corrected: *I look forward to an early reply. Yours faithfully, Rahul*.',
  sol: 'A formal close is calm and conventional: one polite closing sentence, then *Yours faithfully / sincerely* and the name.',
  scheme: [['Two problems identified (tone/punctuation; wrong close)', 1], ['Correct formal closing written', 1]],
}));
Q('fmt_short3_para', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: [40, 50],
  stem: 'Write the **middle paragraph** (40–50 words) of a letter to the Municipal Commissioner, Guwahati, about potholes on Zoo Road that have caused accidents and waterlogging.',
  model: 'Zoo Road is now dotted with deep potholes, some nearly a foot wide. During the recent rain they filled with water, making them invisible to riders, and at least three two-wheeler accidents took place last week. Schoolchildren and elderly people find it especially dangerous to walk there.',
  sol: 'The middle paragraph gives **facts and effects**: what the problem is, how bad it is (size, rain, accidents) and who suffers. The request for action is kept for the last paragraph.',
  scheme: [['Specific description of the problem', 1], ['Effects with at least one concrete detail', 1], ['Formal register, accurate language, within limit', 1]],
}));

// ================================================================ objective items: analytical paragraph (t02)
Q('ap_overview', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A line graph shows that a town\'s population rose from 2 lakh in 2000 to 5 lakh in 2020. Which sentence is the best **overview** for the paragraph?',
  opts: ['Overall, the town\'s population grew substantially, more than doubling over the twenty years.', 'In 2000 the population was 2 lakh.', 'I think the town has become too crowded.', 'Population is an important topic for all of us.'],
  sol: 'An overview gives the **big picture** of the data in one sentence (direction and size of change). The second is a detail, the third an opinion and the fourth a vague generalisation.',
}));
Q('ap_verb', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A graph shows sales staying at about 400 units every month from March to July. Which phrase describes this best?',
  opts: ['remained stable', 'rose sharply', 'fluctuated wildly', 'plummeted'],
  sol: '*Remained stable* (also *levelled off, stayed constant*) describes little or no change.',
}));
Q('ap_adverb', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Exports rose from 100 tonnes to 104 tonnes in a year. Which description is accurate?',
  opts: ['Exports rose slightly.', 'Exports soared.', 'Exports rose dramatically.', 'Exports doubled.'],
  sol: 'A 4 per cent rise is small, so *slightly* (or *marginally*) is accurate. *Soared* and *dramatically* exaggerate; *doubled* is false.',
}));
Q('ap_opinion', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Which sentence should **not** appear in an analytical paragraph on a chart of rainfall?',
  opts: ['I personally love rainy days because I can eat pakoras.', 'Rainfall peaked at 350 mm in November.', 'June was the driest month shown.', 'Rainfall more than doubled between September and October.'],
  sol: 'Analytical paragraphs report and compare the **data**; personal opinions and anecdotes do not belong.',
}));
Q('ap_compare', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Shop A sold 300 umbrellas and Shop B sold 100. Which comparison is correct?',
  opts: ['Shop A sold three times as many umbrellas as Shop B.', 'Shop A sold three times more fewer umbrellas.', 'Shop B sold twice as many umbrellas as Shop A.', 'Shop A sold as many umbrellas as Shop B.'],
  sol: '300 ÷ 100 = 3, so *three times as many*. The second option is ungrammatical; the others are false.',
}));
Q('ap_percentpoint', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A party\'s vote share rose from 20 per cent to 30 per cent. Which statement is accurate?',
  opts: ['It rose by 10 percentage points, an increase of 50 per cent.', 'It rose by 10 per cent.', 'It rose by 30 percentage points.', 'It rose by 50 percentage points.'],
  sol: 'The difference between two percentages is in **percentage points**: 30 − 20 = 10 points. As a proportion of the original, 10 ÷ 20 = 0.5, a 50 per cent increase.',
}));
Q('ap_conclusion', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'A table shows that a school library\'s monthly book issues fell from 900 to 450 after a gaming zone opened nearby. Which conclusion stays closest to the data?',
  opts: ['Book issues halved in the period shown, after the gaming zone opened.', 'The gaming zone has destroyed reading among all students.', 'Students no longer care about books.', 'The library should be closed.'],
  sol: 'A conclusion must follow from the figures: issues **halved** (900 → 450) after the opening. The others overclaim causes or make recommendations the data cannot support.',
}));
Q('ap_peak', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The highest point reached on a graph is called its…',
  opts: ['peak', 'plateau', 'dip', 'trough'],
  sol: '*Peak* = the highest point. *Plateau* = a flat stretch; *dip* and *trough* = a fall or the lowest point.',
}));
Q('ap_fb_by_to', fb({
  t: 2, d: 3, c: 'application', marks: 1,
  stem: 'Fill in the blanks with *by* or *to*.\n\nThe price of tomatoes rose ___ ₹20, ___ ₹60 a kilo.',
  acc: [['by'], ['to']],
  sol: '*Rose **by** ₹20* gives the size of the change; *rose **to** ₹60* gives the final value (₹40 + ₹20 = ₹60).',
  scheme: [['Blank 1: by', 0.5], ['Blank 2: to', 0.5]],
}));
Q('ap_fb_noun', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Complete the sentence with the noun form of the verb in brackets.\n\nThere was a sharp ___ (fall) in the number of road accidents after speed cameras were installed.',
  acc: [['fall', 'decline', 'drop', 'decrease']],
  sol: 'After *a sharp* we need a noun: **fall** (also *decline, drop, decrease*). Trend words often have verb and noun forms: *rise / a rise, fall / a fall, increase / an increase*.',
}));
Q('ap_fb_fraction', fb({
  t: 2, d: 3, c: 'application',
  stem: 'Complete the sentence.\n\nOf the 200 students surveyed, 50 walk to school. In other words, ___ of the students walk.',
  acc: [['a quarter', 'one quarter', 'one-fourth', 'one fourth', '25 per cent', '25%', '25 percent']],
  sol: '50 ÷ 200 = 0.25, so **a quarter** (one-fourth, 25 per cent). Using fractions and proportions varies your language.',
}));
Q('ap_fb_majority', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Complete the sentence with one word.\n\nSince 68 per cent of the respondents preferred online classes, the ___ of them chose that option.',
  acc: [['majority']],
  sol: 'More than half = **the majority**. (*Minority* = fewer than half.)',
}));
Q('ap_order', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the parts of an analytical paragraph in the best order.',
  items: ['Introduction: what the chart shows, place and period', 'Overview: the main trend in one sentence', 'Key details with figures, in a logical order', 'Comparisons and exceptions', 'Conclusion drawn from the data'],
  sol: 'Introduce → give the big picture → support it with figures → compare and note exceptions → conclude.',
}));
Q('ap_order_sent', ord({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: 'Arrange the sentences to form a coherent analytical paragraph about a school\'s solar panels.',
  items: [
    'The bar chart shows the electricity a school\'s solar panels produced each month from January to June.',
    'Overall, output increased as the days grew longer and sunnier.',
    'Production was lowest in January at 800 units.',
    'It rose steadily to reach a peak of 1,400 units in May.',
    'In June, however, output dipped slightly to 1,300 units.',
    'In short, the panels worked best in late spring.',
  ],
  sol: 'Introduction → overview → lowest point → rise to the peak → the exception (*however*) → conclusion. The linking words (*Overall, It, however, In short*) signal the order.',
}));
Q('ap_match', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each trend phrase with what the graph shows.',
  pairs: [
    ['rose steadily', 'a gradual climb at a constant rate'],
    ['plummeted', 'a very sudden, steep fall'],
    ['fluctuated', 'repeated ups and downs'],
    ['levelled off', 'stopped changing after a rise or fall'],
  ],
  sol: 'Choose trend words that match the **shape and speed** of the change.',
}));
Q('ap_tf_all', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'True or false: a good analytical paragraph quotes every number in the chart, in the order they appear.',
  ans: false,
  sol: 'Select the **key** figures (highest, lowest, biggest change, exceptions) and group them; listing every number is description without analysis.',
}));
Q('ap_tf_units', tf({
  t: 2, d: 1, c: 'recall',
  stem: 'True or false: figures quoted in an analytical paragraph should carry their units (per cent, lakh, mm, tonnes).',
  ans: true,
  sol: 'A number without its unit is unclear and can lose the accuracy mark.',
}));
Q('ap_tf_tense', tf({
  t: 2, d: 3, c: 'understanding',
  stem: 'True or false: when describing data for past years (for example 2019–2023), the simple past is generally used.',
  ans: true,
  sol: 'Past data → simple past (*rose, fell, peaked*). Use the present for what the chart *shows* (*The chart shows…*) and for predictions or current facts.',
}));
Q('ap_ar', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'An analytical paragraph should give an overview near the beginning.',
  r: 'Figures quoted in an analytical paragraph should carry their units.',
  key: 'b',
  sol: 'Both statements are true, but R (about units) does not explain why the overview comes early; the reason is that it gives the reader the main trend before the details.',
}));
Q('ap_ar2', ar({
  t: 2, d: 4, c: 'evaluation',
  a: 'If a chart shows that ice-cream sales and drowning cases both rose in summer, the paragraph should state that ice cream causes drowning.',
  r: 'An analytical paragraph may compare two sets of data shown together.',
  key: 'd',
  sol: 'A is false: two figures rising together does not prove that one causes the other; the paragraph should only say they rose together. R is true.',
}));
Q('ap_ar3', ar({
  t: 2, d: 2, c: 'understanding',
  a: 'An analytical paragraph should begin by stating what the chart, graph or table shows.',
  r: 'An analytical paragraph needs a salutation and a signature, like a letter.',
  key: 'c',
  sol: 'A is true: the introduction names the input, place and period. R is false: there is no letter format (a short title is optional).',
}));
Q('ap_short_overview', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: [20, 40],
  stem: 'A table shows the number of trees planted in a district: 2021 — 12,000; 2022 — 18,000; 2023 — 15,000; 2024 — 30,000. Write an **introduction and overview** (two sentences) for an analytical paragraph.',
  model: 'The table shows the number of trees planted in the district each year from 2021 to 2024. Overall, planting increased over the period despite a dip in 2023, and the 2024 figure was two and a half times that of 2021.',
  sol: 'Sentence 1 names the input, place and period. Sentence 2 gives the big picture: a general rise (12,000 → 30,000; 30 ÷ 12 = 2.5) with one exception (the 2023 dip). No details beyond what the overview needs.',
  scheme: [['Introduction names input, place and period', 1], ['Overview gives the main trend accurately (rise, with the 2023 dip)', 1]],
}));
Q('ap_short_compare', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [20, 40],
  stem: 'In a survey, 120 students chose cricket, 60 chose football and 20 chose chess as their favourite sport. Write **two sentences** comparing the figures, using different comparison structures.',
  model: 'Cricket was by far the most popular sport, chosen by twice as many students as football. Chess, chosen by only 20 students, attracted a sixth of the number who picked cricket.',
  sol: '120 ÷ 60 = 2 (*twice as many*); 20 ÷ 120 = 1/6 (*a sixth of*). Varying structures (*by far the most, twice as many as, a sixth of*) shows control of comparison language.',
  scheme: [['Accurate comparison 1 (twice as many / double)', 1], ['Accurate comparison 2 with a different structure (a sixth / far fewer)', 1]],
}));
Q('ap_short_conclusion', short({
  t: 2, d: 4, c: 'evaluation', marks: 2, wl: [20, 40],
  stem: 'A chart shows that the share of households in a city using LPG for cooking rose from 55 per cent in 2015 to 92 per cent in 2025, while the use of firewood fell from 30 to 3 per cent. Write a **concluding sentence or two** that stays within the data.',
  model: 'In conclusion, LPG has become the main cooking fuel for almost all households in the city, while firewood, used by nearly a third of homes in 2015, has almost disappeared.',
  sol: 'A conclusion sums up the overall change (LPG 92 per cent ≈ almost all; firewood 30 → 3 per cent) without inventing causes or giving advice the chart cannot support.',
  scheme: [['Summarises the main change accurately', 1], ['Stays within the data; no invented causes or opinions', 1]],
}));
Q('ap_short3_desc', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: [40, 50],
  stem: 'Monthly visitors to a hill station (thousands): March 20, April 45, May 80, June 75, July 15. In **40–50 words**, describe the main pattern and the most striking change.',
  model: 'Visitor numbers climbed sharply from 20 thousand in March to a peak of 80 thousand in May, four times the March figure. They stayed high in June at 75 thousand, but then plummeted to just 15 thousand in July, the lowest level of the five months.',
  sol: 'Pattern: rise to a May peak (80 ÷ 20 = 4), a high plateau in June, then a sudden fall in July (75 → 15). The most striking change is the July drop, so it is described with a strong verb (*plummeted*).',
  scheme: [['Rise to the peak with figures', 1], ['June level and July fall with figures', 1], ['Apt trend language; accurate; within limit', 1]],
}));
Q('ap_long_compare', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: [80, 100],
  stem: 'Two schools recorded the percentage of students scoring above 90 in Class 10 English: **School P** — 2023: 12%, 2024: 15%, 2025: 21%; **School Q** — 2023: 25%, 2024: 22%, 2025: 20%. In **80–100 words**, compare the performance of the two schools and draw a conclusion.',
  model: 'The data compares the share of Class 10 students scoring above 90 in English at two schools from 2023 to 2025. The two schools moved in opposite directions. School P improved every year, from 12 per cent to 15 per cent and then to 21 per cent, a rise of 9 percentage points. School Q, in contrast, began well ahead at 25 per cent but declined steadily to 22 and then 20 per cent. As a result, the gap between them narrowed from 13 points to just one. If these trends continue, School P may soon overtake School Q.',
  sol: 'Introduction → overview (opposite trends) → School P with figures (+9 points) → School Q with figures (−5 points) → the changing gap (25 − 12 = 13; 21 − 20 = 1) → a cautious conclusion (*If these trends continue…*, *may*), which is a reasonable inference, not a certainty.',
  scheme: [['Introduction and overview of opposite trends', 1], ['School P described with figures', 1], ['School Q described with figures', 1], ['Comparison of the gap (13 → 1 point)', 1], ['Cautious, data-based conclusion; accurate language', 1]],
}));

// ================================================================ case-based
Q('case_draft_letter', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read a student\'s draft of a letter of complaint and answer the questions.',
  passage: '12 Lake Road, Bhopal 462001\n\nThe Manager, QuickFix Electronics, New Market, Bhopal 462003\n\nDear Manager,\n\n**Subject: Complaint**\n\nHi! I bought a mixer-grinder from your shop on 2 October. From day one it makes a terrible noise and the jar leaks. I\'m super upset. I want my money back right now. Pls do something.\n\nYour loving customer,\nTarun',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'analysis', stem: 'Which part of the format is **missing** from the draft?', opts: ['the date', 'the receiver\'s address', 'the sender\'s address', 'the subject line'], sol: 'The draft has both addresses and a subject line but no date, which should follow the sender\'s address.' })),
    child('b', mcq({ t: 1, d: 2, c: 'analysis', stem: 'What is wrong with the position of the subject line?', opts: ['It should come before the salutation.', 'It should come after the complimentary close.', 'It should come before the sender\'s address.', 'Nothing; it is correctly placed.'], sol: 'In the CBSE format the subject line comes after the receiver\'s address and **before** the salutation.' })),
    child('c', mcq({ t: 1, d: 2, c: 'application', stem: 'Which is the best replacement for "Subject: Complaint"?', opts: ['Subject: Defective mixer-grinder bought on 2 October', 'Subject: Very bad', 'Subject: Mixer', 'Subject: Read this now'], sol: 'A subject line should name the specific problem and a reference (product, date).' })),
    child('d', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Rewrite "I want my money back right now. Pls do something." in a formal register.', model: 'I request you to refund the full amount or replace the mixer-grinder at the earliest.', sol: 'Replace demands and abbreviations with a polite, specific request (refund or replacement, a time frame).', scheme: [['Polite, formal request with a specific remedy', 1]] })),
    child('e', fb({ t: 1, d: 2, c: 'application', stem: 'Replace "Your loving customer," with the correct complimentary close: Yours ___,', acc: [['faithfully', 'sincerely']], sol: 'Formal letters close with *Yours faithfully* (or *Yours sincerely*).' })),
  ],
  sol: 'Check the draft against the format (eight parts in order) and the register (no slang, contractions, exclamations or emotional demands).',
}));
const vCanteen = table(
  ['Item sold at the school canteen', 'Monday', 'Wednesday', 'Friday'],
  [['Samosa', '120', '110', '150'], ['Fruit cup', '40', '60', '55'], ['Idli', '80', '85', '70'], ['Cold drink', '90', '70', '30']],
  'Table of canteen sales on three days: samosas 120, 110 and 150; fruit cups 40, 60 and 55; idlis 80, 85 and 70; cold drinks 90, 70 and 30.',
  'Sales in the week after a "healthy choices" poster campaign (illustrative data)',
);
Q('case_canteen', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  assets: [vCanteen],
  stem: 'Study the table of canteen sales recorded in the week after a "healthy choices" poster campaign, and answer the questions.',
  passage: 'The table (shown with this question) gives the number of four items sold at a school canteen on Monday, Wednesday and Friday of one week. The poster campaign encouraged students to choose fruit and steamed food over fried snacks and sugary drinks.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which item had the highest sale on a single day?', opts: ['Samosa on Friday', 'Cold drink on Monday', 'Idli on Wednesday', 'Fruit cup on Wednesday'], sol: 'Samosa sales reached 150 on Friday, the largest figure in the table.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which item showed a steady fall across the three days?', opts: ['Cold drink', 'Samosa', 'Fruit cup', 'Idli'], sol: 'Cold drinks fell 90 → 70 → 30. Samosas dipped then rose; fruit cups rose then dipped; idlis rose then fell.' })),
    child('c', fb({ t: 2, d: 3, c: 'application', stem: 'Cold drink sales on Friday were ___ of the Monday figure.', acc: [['a third', 'one third', 'one-third', '1/3']], sol: '30 ÷ 90 = 1/3, so **a third** (one-third).' })),
    child('d', short({ t: 2, d: 4, c: 'evaluation', marks: 2, wl: [25, 45], stem: 'Did the campaign fully succeed? Answer in 25–45 words, using figures from the table.', model: 'Only partly. Cold drink sales fell sharply from 90 to 30 and fruit cups rose from 40 to 55, but samosa sales actually grew to 150 on Friday, so fried snacks remained the most popular item.', sol: 'An evaluative answer weighs evidence on both sides with figures (cold drinks −60; fruit +15; samosas up to 150) and reaches a balanced verdict.', scheme: [['Balanced verdict (partly)', 1], ['Supported by at least two accurate figures from the table', 1]] })),
  ],
  sol: 'Read rows (items) across columns (days); look for highest values, steady trends and exceptions before judging.',
}));
Q('case_draft_para', caseQ({
  t: 2, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read a student\'s draft analytical paragraph on a bar chart of **metro ridership in a city (2021: 1.5 lakh daily riders; 2022: 2.4 lakh; 2023: 3.1 lakh; 2024: 3.0 lakh; 2025: 3.9 lakh)** and answer the questions.',
  passage: 'Metro is very good and I use it every day. In 2021 there were 1.5 lakh riders. In 2022 there were 2.4 lakh riders. In 2023 there were 3.1 lakh riders. In 2024 there were 3.0 lakh riders. In 2025 there were 3.9 lakh riders. The government must build more metro lines everywhere.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'analysis', stem: 'What is the biggest weakness of the first sentence?', opts: ['It gives a personal opinion instead of introducing the chart.', 'It is too long.', 'It uses the past tense.', 'It quotes too many figures.'], sol: 'The opening should introduce the input (what, where, when), not the writer\'s experience.' })),
    child('b', mcq({ t: 2, d: 3, c: 'analysis', stem: 'Which important feature of the data does the draft fail to point out?', opts: ['the small dip in 2024 within an overall rise', 'the figure for 2021', 'the figure for 2025', 'the unit, lakh'], sol: 'The draft lists all five figures but never comments on the pattern: a steady rise interrupted by a slight fall in 2024.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Write an overview sentence the student could add.', model: 'Overall, daily ridership grew strongly, from 1.5 lakh to 3.9 lakh, with only a slight dip in 2024.', sol: 'The overview states the direction and size of change and the one exception.', scheme: [['Accurate overview with the overall rise and the 2024 dip', 1]] })),
    child('d', mcq({ t: 2, d: 3, c: 'evaluation', stem: 'Why is the last sentence unsuitable as a conclusion?', opts: ['It makes a recommendation that the data cannot support.', 'It is too short.', 'It uses the word "metro".', 'It repeats the 2025 figure.'], sol: 'A conclusion sums up what the data shows; it should not demand government action the chart says nothing about.' })),
  ],
  sol: 'Judge the draft against the rubric: introduction, overview, selected figures with comparisons, data-based conclusion, no opinions.',
}));
