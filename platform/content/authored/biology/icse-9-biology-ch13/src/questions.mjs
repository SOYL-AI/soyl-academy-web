// ICSE 9 Biology ch13 Diseases and their Transmission — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SCHOOL, SCHOOL_PCT, SCHOOL_WELL, WEEKLY, WEEK_TOTAL, PEAK, PEAK_WEEK, PEAK_OVER_FIRST, FALL_AFTER_PEAK, STOOLS, WATER_LOST_ML, WATER_LOST_L, NETS, NETS_PCT, NETS_WITHOUT, BLOOD, BLOOD_SAFE, WT, WT_LOSS, WT_PER_MONTH, TEMPS, TEMP_RISE, EGGS, EGGS_TOTAL, WASH, WASH_DROP, WASH_FACTOR, VIL, VIL_M, VIL_N, VIL_DIFF } from './calc.mjs';
import { MALARIA_LETTERED, FLY_LETTERED, EPI } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const malFig = svgV(MALARIA_LETTERED, 'A person with spots, a mosquito, a healthy person, an arrow and a pool of stagnant water lettered A to E');
const flyFig = svgV(FLY_LETTERED, 'A pile of waste, a fly, a plate of food and a person who eats lettered A to E');
const epiFig = svgV(EPI, 'Bar chart of new cases in each of six weeks of an outbreak');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-epidemic', mcq({
  stem: 'A disease that suddenly affects a large number of people in one area at the same time is',
  right: 'an epidemic', wrong: ['endemic', 'sporadic', 'non-communicable'],
  sol: 'A sudden rise in cases in one area is an epidemic — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-vector', mcq({
  stem: 'An animal that carries a pathogen from one host to another, without itself being the cause of the disease, is a',
  right: 'vector', wrong: ['parasite host', 'antibody', 'pathogen'],
  sol: 'A vector only carries the pathogen — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-tb', mcq({
  stem: 'Which of these diseases spreads mainly through droplets in the air?',
  right: 'Tuberculosis', wrong: ['Cholera', 'Malaria', 'Filariasis'],
  sol: 'Tuberculosis is breathed in from the cough of a patient — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-aids', mcq({
  stem: 'The virus that causes AIDS mainly damages the body\'s',
  right: 'defence system', wrong: ['digestive system', 'skin', 'bones'],
  sol: 'The virus attacks white blood cells of the immune system — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-hepatitis', mcq({
  stem: 'Yellowing of the skin and eyes is a typical sign of a disease of the',
  right: 'liver', wrong: ['lungs', 'kidneys', 'large intestine'],
  sol: 'Jaundice is a sign of liver disease such as hepatitis — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-tsetse', mcq({
  stem: 'Sleeping sickness is spread by the bite of the',
  right: 'tsetse fly', wrong: ['housefly', 'female Anopheles mosquito', 'cockroach'],
  sol: 'The tsetse fly carries the protozoan — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('chk-helminth', mcq({
  stem: 'A disease in which worms block the lymph vessels and cause great swelling of the legs is',
  right: 'filariasis', wrong: ['ascariasis', 'taeniasis', 'amoebic dysentery'],
  sol: 'Filariasis causes elephantiasis — option (@K).',
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- t01 communicable and non-communicable; patterns of occurrence
add('cat-mcq', mcq({
  stem: 'A man develops diabetes because of his diet and his family history. The disease is best described as',
  right: 'non-communicable', wrong: ['communicable', 'an epidemic', 'a vector-borne disease'],
  sol: 'Diabetes has no pathogen and cannot be caught from another person — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('endemic-mcq', mcq({
  stem: 'A fever is found every year, in all months, in the hill villages of one district and in no other district. The pattern of the disease is',
  right: 'endemic', wrong: ['pandemic', 'sporadic', 'an epidemic spread over many countries'],
  sol: 'A disease always present in one area is endemic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pandemic-mcq', mcq({
  stem: 'A new type of flu begins in one city and, within months, is reported in forty countries. This is',
  right: 'a pandemic', wrong: ['an endemic disease', 'a sporadic disease', 'a non-communicable disease'],
  sol: 'An epidemic that spreads across many countries is a pandemic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sporad-mcq', mcq({
  stem: 'In one year, three people in three far-apart towns fall ill with typhoid, and there is no link between them. The pattern is',
  right: 'sporadic', wrong: ['endemic', 'pandemic', 'epidemic'],
  sol: 'A few scattered cases with no common source are sporadic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-hug', ar({
  a: 'A person cannot catch AIDS by shaking hands with a patient.',
  r: 'The virus that causes AIDS passes only through blood, certain body fluids and from a mother to her child.',
  key: 'c',
  sol: 'Both are true, and the limited routes of the virus explain why a handshake is safe — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('ar-cause', ar({
  a: 'A mosquito is the cause of malaria.',
  r: 'The female Anopheles mosquito carries the malaria parasite from one person to another.',
  key: 'b',
  sol: 'The assertion is false: the cause is a protozoan, and the mosquito is only the vector. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [2, 5],
}));
add('ar-boil', ar({
  a: 'Boiling drinking water helps to control cholera.',
  r: 'Cholera is caused by a virus that spreads through the air.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: cholera is caused by a bacterium and spreads through water and food — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-net', ar({
  a: 'Sleeping under a mosquito net reduces the risk of filariasis.',
  r: 'Filariasis is caused by thread-like worms that live in the lymph vessels.',
  key: 'd',
  sol: 'Both are true, but the position of the worms does not explain why a net helps; the net stops the vector from biting — option (d).',
  d: 3, c: 'analysis', t: [2, 6],
}));
add('cat-tf', tf({
  stem: 'Scurvy, caused by a lack of vitamin C, is a communicable disease.',
  key: 'f',
  sol: 'False. It is a deficiency disease and cannot spread from person to person.',
  d: 1, c: 'recall', t: [1],
}));
add('term-endemic', term({
  stem: 'Give the biological term: a disease that is always present in a particular area or population.',
  model: '**Endemic disease.**', sol: 'Endemic.', sch: 'Endemic',
  d: 1, c: 'recall', t: [1],
}));
add('odd-class', term({
  stem: 'Cholera, typhoid, tuberculosis and diabetes: pick the one that differs from the rest and state the category of the other three.',
  model: '**Diabetes**; the others are **communicable diseases** (caused by bacteria).', sol: 'Diabetes is non-communicable.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1, 3],
}));
add('school-num', num({
  stem: `A boarding school has ${SCHOOL.pupils} pupils. In one month ${SCHOOL.cases} of them get chicken pox. What percentage of the pupils fell ill?`,
  value: SCHOOL_PCT, unit: 'per cent',
  sol: `${SCHOOL.cases} ÷ ${SCHOOL.pupils} × 100 = ${SCHOOL_PCT} per cent.`,
  scheme: [[`${SCHOOL_PCT} per cent`, 1]],
  d: 2, c: 'application', t: [1, 4],
}), (q) => q.answer.value === 9 || 'value');
add('epi-mcq', mcq({
  stem: 'The bar chart shows the number of new cases in each week of an outbreak. In which week was the number of new cases highest?',
  right: 'Week 4', wrong: ['Week 2', 'Week 3', 'Week 6'],
  sol: `The tallest bar, ${PEAK} cases, is in week ${PEAK_WEEK} — option (@K).`,
  d: 1, c: 'application', t: [1],
  assets: [epiFig],
}));
add('epi-num', num({
  stem: 'Use the bar chart of weekly new cases to find the total number of cases in the six weeks.',
  value: WEEK_TOTAL,
  sol: `${WEEKLY.join(' + ')} = ${WEEK_TOTAL}.`,
  scheme: [[`${WEEK_TOTAL}`, 1]],
  d: 2, c: 'application', t: [1],
  assets: [epiFig],
}), (q) => q.answer.value === 168 || 'value');
add('rate-num', num({
  stem: `Village M has ${VIL.M.pop} people and ${VIL.M.cases} cases of a disease. Village N has ${VIL.N.pop} people and ${VIL.N.cases} cases. By how many cases in every 1000 people is the rate in M higher than the rate in N?`,
  value: VIL_DIFF,
  sol: `M: ${VIL.M.cases} ÷ ${VIL.M.pop} × 1000 = ${VIL_M}. N: ${VIL.N.cases} ÷ ${VIL.N.pop} × 1000 = ${VIL_N}. Difference = ${VIL_DIFF}. (N has more cases, but M has the higher rate.)`,
  scheme: [[`${VIL_DIFF}`, 1]],
  d: 4, c: 'analysis', t: [1],
}), (q) => q.answer.value === 6 && VIL_M === 20 && VIL_N === 14 || 'value');
add('commnon-short2', short({
  marks: 2,
  stem: 'State one difference between a communicable and a non-communicable disease and give one example of each.',
  model: 'A **communicable** disease is caused by a **pathogen** and **can spread** from one person to another (for example, cholera). A **non-communicable** disease is **not caused by a pathogen** and cannot be caught (for example, diabetes).',
  sol: 'Pathogen and spread; one example each.',
  scheme: [['A valid difference', 1], ['An example of each', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('epipan-short2', short({
  marks: 2,
  stem: 'Differentiate between an epidemic and a pandemic.',
  model: 'An **epidemic** is a sudden rise in the number of cases of a disease in **one area**. A **pandemic** is an epidemic that spreads over **many countries** or the whole world.',
  sol: 'One area versus many countries.',
  scheme: [['Epidemic: one area, sudden rise', 1], ['Pandemic: many countries', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('epi-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between an endemic disease and a sporadic disease.',
  model: '| Endemic disease | Sporadic disease |\n|---|---|\n| **Always present** in an area | Appears **at irregular times** |\n| Affects **many people** over time in the same place | Affects **only a few** people |\n| Cases often have a **common cause** in the place | Cases are **scattered** with no common source |',
  sol: 'Presence in time; number affected; source.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 modes of transmission
add('cock-mcq', mcq({
  stem: 'A cockroach crawls over an open drain and then over a plate of uncovered food. The food becomes unsafe because the insect',
  right: 'carries germs on its body to the food', wrong: ['injects germs into the food', 'makes the food warm', 'digests the food'],
  sol: 'Germs stick to the cockroach and are left on the food — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tyre-mcq', mcq({
  stem: 'Rainwater collects in old tyres behind a house. This is a health risk mainly because it',
  right: 'gives mosquitoes a place to breed', wrong: ['makes the air too humid for people', 'attracts houseflies to lay eggs on food', 'brings tuberculosis bacteria to the house'],
  sol: 'Mosquitoes lay eggs in stagnant water — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cough-mcq', mcq({
  stem: 'A student with a bad cough sits very close to another student and does not cover his mouth. A germ is most likely to pass to the other student',
  right: 'in droplets in the air', wrong: ['through the water he drinks', 'by the bite of an insect', 'through his skin when they touch'],
  sol: 'Coughing sprays tiny droplets that are breathed in — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('boil-mcq', mcq({
  stem: 'A village well is found to be contaminated. The safest way to make the water fit to drink at home is to',
  right: 'boil it before use', wrong: ['cool it in the sun', 'stir it with a clean spoon', 'pour it through a cloth only'],
  sol: 'Boiling kills the pathogens in water — option (@K).',
  d: 2, c: 'application', t: [2, 3],
}));
add('figFlyE-mcq', mcq({
  stem: 'In the figure, which letter marks the part of the insect that carries the germs from the waste to the food?',
  right: 'E', wrong: ['A', 'C', 'D'],
  sol: 'E marks the legs and body of the fly where germs stick; A is the waste, C the food and D the person — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [flyFig],
}));
add('figFlyC-mcq', mcq({
  stem: 'In the figure, which letter marks the item that should be covered to stop the spread of disease?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the uncovered food; covering it keeps flies off — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [flyFig],
}));
add('vectors-short2', short({
  marks: 2,
  stem: 'Name two insect vectors and state one disease spread by each.',
  model: 'The **housefly** spreads **cholera** (or typhoid or dysentery). The **mosquito** spreads **malaria** (or filariasis). (The cockroach spreads food-borne diseases.)',
  sol: 'Two vectors with a disease each.',
  scheme: [['First vector with disease', 1], ['Second vector with disease', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('fly-short2', short({
  marks: 2,
  stem: 'Explain how a housefly can spread a disease of the intestine, and state one way of preventing it.',
  model: 'The fly feeds on **waste** and **germs stick to its legs and body**; it then lands on **uncovered food** and leaves the germs there. It is prevented by **covering food** or by disposing of waste safely.',
  sol: 'Germs carried from waste to food; cover food.',
  scheme: [['Germs carried on its body to food', 1], ['A preventive measure', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('routes-short3', short({
  marks: 3,
  stem: 'Name three routes by which pathogens spread and give one disease for each.',
  model: '1. Through the **air**, in droplets from a cough or sneeze, as in **tuberculosis**.\n2. Through **water and food** contaminated with pathogens, as in **cholera** or typhoid.\n3. Through a **vector** such as a mosquito, which carries the parasite from a patient, as in **malaria**. (Also **blood and body fluids**, as in AIDS.)',
  sol: 'Three routes with a disease each.',
  scheme: [['First route with disease', 1], ['Second route with disease', 1], ['Third route with disease', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('vector-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between a housefly and a mosquito as carriers of disease.',
  model: '| Housefly | Mosquito |\n|---|---|\n| Picks up germs on its **legs and body** from waste | Takes the pathogen in with **blood** from a patient |\n| Leaves them on **food** | Passes them by a **bite** |\n| Spreads **cholera**, typhoid | Spreads **malaria**, filariasis |',
  sol: 'How the germs are picked up; how they are passed on; diseases.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('term-vectorb', term({
  stem: 'Give the biological term: an organism that carries a pathogen from a sick host to a healthy host but does not cause the disease itself.',
  model: '**Vector.**', sol: 'Vector.', sch: 'Vector',
  d: 1, c: 'recall', t: [2],
}));
add('vector-tf', tf({
  stem: 'A vector is the organism that causes the disease.',
  key: 'f',
  sol: 'False. A vector only carries the pathogen; the pathogen causes the disease.',
  d: 1, c: 'understanding', t: [2],
}));
add('eggs-num', num({
  stem: `A female mosquito lays ${EGGS.batches} batches of ${EGGS.each} eggs on stagnant water. How many eggs does she lay in all?`,
  value: EGGS_TOTAL,
  sol: `${EGGS.batches} × ${EGGS.each} = ${EGGS_TOTAL}.`,
  scheme: [[`${EGGS_TOTAL}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 360 || 'value');

// ---------------------------------------------------------------- t03 bacterial diseases
add('ors-mcq', mcq({
  stem: 'A boy has passed many watery stools and looks weak, with sunken eyes. The first thing to give him by mouth is',
  right: 'a solution of salts and sugar in clean water', wrong: ['a glass of unboiled pond water', 'a fatty meal', 'a strong sweet pickle'],
  sol: 'Oral rehydration solution replaces the lost water and salts — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('typhoid-mcq', mcq({
  stem: 'A girl has a fever that is a little higher each evening for a week, with headache and weakness, after meals at a roadside stall. The disease is most likely',
  right: 'typhoid', wrong: ['chicken pox', 'filariasis', 'sleeping sickness'],
  sol: 'A long fever rising step by step, after unsafe food, suggests typhoid — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('tbcourse-mcq', mcq({
  stem: 'A man with tuberculosis feels well after one month of medicine and wants to stop it. The doctor should advise him to',
  right: 'complete the full course of medicine', wrong: ['stop, because the cough is gone', 'take the medicine only when he coughs', 'take double doses for a week and then stop'],
  sol: 'Stopping early can leave bacteria alive and the disease may return — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('lungs-mcq', mcq({
  stem: 'A man has a cough lasting several weeks, with blood in the sputum, and has lost weight. The organ most likely infected is the',
  right: 'lungs', wrong: ['liver', 'large intestine', 'skin'],
  sol: 'These are signs of tuberculosis of the lungs — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cholsym-short2', short({
  marks: 2,
  stem: 'State two symptoms of cholera and why it is dangerous.',
  model: 'Cholera causes sudden **watery diarrhoea** and **vomiting** (and cramps). It is dangerous because the body loses a great deal of **water and salts** (dehydration).',
  sol: 'Diarrhoea and vomiting; dehydration.',
  scheme: [['Two symptoms', 1], ['Dehydration', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('tb-short2', short({
  marks: 2,
  stem: 'State how tuberculosis spreads and one measure by which a patient can protect others.',
  model: 'It spreads through the **air** in **droplets** from the cough of a patient. A patient should **cover the mouth when coughing** (or take the full course of medicine).',
  sol: 'Droplets; cover the mouth.',
  scheme: [['Spreads in droplets in air', 1], ['A protective measure', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('typhoid-short3', short({
  marks: 3,
  stem: 'State how typhoid spreads, two of its symptoms and one measure of control.',
  model: 'It spreads through **contaminated water and food**, and by **flies**. Its symptoms are a **long-lasting fever** and **headache** (or weakness, stomach pain). It is controlled by **boiled water**, hygiene and clean food (or the vaccine).',
  sol: 'Contaminated water and food; fever and headache; boiled water.',
  scheme: [['Mode of spread', 1], ['Two symptoms', 1], ['One control measure', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bact-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between cholera and tuberculosis.',
  model: '| Cholera | Tuberculosis |\n|---|---|\n| Spreads through **water and food** | Spreads through **droplets in the air** |\n| Affects the **intestine**; watery diarrhoea | Affects the **lungs**; long cough |\n| **Oral rehydration** and safe water help | A **full course of medicine** and ventilation help |',
  sol: 'Spread; organ and symptom; control.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('reason-tbcover', term({
  stem: 'Give reason: a person with tuberculosis should cover the mouth and nose when coughing.',
  model: 'The germs leave the body in **droplets** that other people can **breathe in**, so covering the mouth stops them from spreading in the air.', sol: 'Droplets in the air.', sch: 'Droplets spread germs',
  d: 2, c: 'application', t: [3],
}));
add('reason-orsfluid', term({
  stem: 'Give reason: a patient with cholera is given plenty of fluid containing salts.',
  model: 'The watery diarrhoea makes the body **lose water and salts**, so they must be **replaced** to prevent dehydration.', sol: 'Replaces lost water and salts.', sch: 'Replace lost water and salts',
  d: 2, c: 'application', t: [3],
}));
add('water-num', num({
  stem: `A patient with cholera passes ${STOOLS.n} watery stools in a day, about ${STOOLS.ml} mL in each. How many litres of fluid does the body lose?`,
  value: WATER_LOST_L, unit: 'litres',
  sol: `${STOOLS.n} × ${STOOLS.ml} = ${WATER_LOST_ML} mL = ${WATER_LOST_L} litres.`,
  scheme: [[`${WATER_LOST_L} litres`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 4 && WATER_LOST_ML === 4000 || 'value');
add('temp-num', num({
  stem: `The evening temperature of a typhoid patient on four days is ${TEMPS.join(', ')} degrees Celsius. By how many degrees has it risen from the first to the fourth evening?`,
  value: TEMP_RISE,
  sol: `${TEMPS[3]} − ${TEMPS[0]} = ${TEMP_RISE} degrees.`,
  scheme: [[`${TEMP_RISE}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 1.5 || 'value');
add('wt-num', num({
  stem: `A tuberculosis patient weighs ${WT.start} kg at the start of three months and ${WT.end} kg at the end. What is the mean loss of weight each month, in kg?`,
  value: WT_PER_MONTH, unit: 'kg',
  sol: `Loss = ${WT.start} − ${WT.end} = ${WT_LOSS} kg; mean = ${WT_LOSS} ÷ ${WT.months} = ${WT_PER_MONTH} kg a month.`,
  scheme: [[`${WT_PER_MONTH} kg`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 2 || 'value');

// ---------------------------------------------------------------- t04 viral diseases
add('needle-mcq', mcq({
  stem: 'Which one of these actions carries a risk of passing on the virus that causes AIDS?',
  right: 'Sharing an unsterilised needle', wrong: ['Sharing a meal from the same dish', 'Hugging a friend who is a patient', 'Swimming in the same pool'],
  sol: 'The virus passes in blood, so a shared needle can carry it — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pox-mcq', mcq({
  stem: 'A child has a mild fever, then itchy spots that turn into blisters. To protect the other children at home, the best step is to',
  right: 'keep him apart from them until the blisters have dried', wrong: ['give him antibiotics so that he stops being infectious', 'let him share a towel with the others', 'tell him to scratch the blisters'],
  sol: 'Chicken pox spreads by droplets and by touching the blisters, so isolation helps — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('jaundice-mcq', mcq({
  stem: 'A patient has yellow eyes, dark urine and no appetite. The organ affected is the',
  right: 'liver', wrong: ['heart', 'pancreas', 'stomach'],
  sol: 'These are signs of hepatitis, an infection of the liver — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('antibio-mcq', mcq({
  stem: 'A doctor does not prescribe an antibiotic for chicken pox because',
  right: 'chicken pox is caused by a virus, on which antibiotics do not act', wrong: ['chicken pox is caused by a protozoan', 'antibiotics make the blisters bigger', 'chicken pox is not communicable'],
  sol: 'Antibiotics act on bacteria, not on viruses — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('blood-mcq', mcq({
  stem: 'Blood donated in a blood bank is tested for hepatitis B and the virus of AIDS before use, mainly because these infections',
  right: 'can pass to a patient through transfused blood', wrong: ['are caused by the blood group of the donor', 'spread only through the air', 'are cured by the transfusion'],
  sol: 'Screening makes the blood safe — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('aids-short2', short({
  marks: 2,
  stem: 'What does the AIDS virus attack, and why does the patient fall ill so easily?',
  model: 'It attacks the **white blood cells** of the **immune system**. The body can no longer fight germs, so even **common infections become serious**.',
  sol: 'White blood cells; cannot fight infections.',
  scheme: [['White blood cells or immune system', 1], ['Cannot fight infections', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('aidsnot-short2', short({
  marks: 2,
  stem: 'State two ways by which AIDS is spread.',
  model: 'AIDS is spread through **unprotected sexual contact**, **infected blood** in a transfusion, **shared needles**, and from an **infected mother to her baby** (any two).',
  sol: 'Any two routes.',
  scheme: [['First way', 1], ['Second way', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('pox-short2', short({
  marks: 2,
  stem: 'State two symptoms of chicken pox and one way in which it spreads.',
  model: 'Symptoms: **mild fever** and **itchy red spots** that become **fluid-filled blisters**. It spreads through **droplets in the air** or by touching the fluid of the blisters.',
  sol: 'Fever, itchy blisters; droplets.',
  scheme: [['Two symptoms', 1], ['One way of spread', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hep-short3', short({
  marks: 3,
  stem: 'Name the organ affected in hepatitis, state two of its symptoms and one way by which hepatitis A spreads.',
  model: 'Hepatitis is a disease of the **liver**. Its symptoms include **jaundice** (yellow skin and eyes), **dark urine**, tiredness and loss of appetite (any two). Hepatitis A spreads through **contaminated food and water**, for example food handled with unwashed hands.',
  sol: 'Liver; jaundice and dark urine; food and water.',
  scheme: [['Liver', 1], ['Two symptoms', 1], ['Mode of spread', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('viral-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between chicken pox and hepatitis.',
  model: '| Chicken pox | Hepatitis |\n|---|---|\n| Affects the **skin** | Affects the **liver** |\n| Itchy **blisters** that form scabs | **Jaundice** and dark urine |\n| Spreads by **droplets and blister fluid** | Spreads by **food and water** (type A) or **blood** (type B) |',
  sol: 'Organ; symptom; spread.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('term-jaundice', term({
  stem: 'Give the biological term: yellowing of the skin and eyes in a patient with liver disease.',
  model: '**Jaundice.**', sol: 'Jaundice.', sch: 'Jaundice',
  d: 1, c: 'recall', t: [4],
}));
add('odd-viral', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: AIDS, Chicken pox, Hepatitis, Malaria.',
  model: '**Malaria**; the others are **viral diseases** (malaria is protozoan).', sol: 'Malaria is protozoan.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [4, 5],
}));
add('aids-tf', tf({
  stem: 'A mosquito that bites a patient with AIDS can pass the disease to the next person it bites.',
  key: 'f',
  sol: 'False. The virus does not spread by insect bites.',
  d: 2, c: 'understanding', t: [4],
}));
add('blood-num', num({
  stem: `A blood bank screens ${BLOOD.screened} units of donated blood and finds ${BLOOD.infected} units infected. How many units pass the screening?`,
  value: BLOOD_SAFE,
  sol: `${BLOOD.screened} − ${BLOOD.infected} = ${BLOOD_SAFE}.`,
  scheme: [[`${BLOOD_SAFE}`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 498 || 'value');

// ---------------------------------------------------------------- t05 protozoan diseases
add('malaria-mcq', mcq({
  stem: 'A farmer has chills, then a high fever and sweating, and the same cycle returns every third day. The doctor suspects',
  right: 'malaria', wrong: ['typhoid', 'tuberculosis', 'taeniasis'],
  sol: 'Fever that returns at regular intervals is typical of malaria — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('dysentery-mcq', mcq({
  stem: 'A man passes loose stools with blood and mucus, with stomach cramps, after drinking untreated water. The cause is a protozoan in the',
  right: 'large intestine', wrong: ['lungs', 'liver only', 'skin'],
  sol: 'This is amoebic dysentery — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('net-mcq', mcq({
  stem: 'A family lives beside a pond. Sleeping under a bed net is useful because it',
  right: 'keeps mosquitoes from biting at night', wrong: ['kills the germs in the pond', 'kills the flies in the house', 'purifies the drinking water'],
  sol: 'A net acts as a barrier to the vector — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('figMalB-mcq', mcq({
  stem: 'In the figure, which letter marks the vector that carries the parasites from one person to another?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is the mosquito; A is the infected person, C the stagnant water and D the healthy person — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [malFig],
}));
add('figMalC-mcq', mcq({
  stem: 'In the figure, which letter marks the place where measures such as draining or covering would reduce the number of mosquitoes?',
  right: 'C', wrong: ['A', 'B', 'E'],
  sol: 'C is stagnant water, where mosquitoes lay eggs — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [malFig],
}));
add('malctrl-short2', short({
  marks: 2,
  stem: 'State two ways of controlling the spread of malaria in a village.',
  model: 'By **draining or covering stagnant water** (or spraying oil or insecticide) so that mosquitoes cannot breed, and by using **bed nets**, screens or repellents. (Fish that eat larvae may be put in ponds.)',
  sol: 'Any two measures.',
  scheme: [['First measure', 1], ['Second measure', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('dys-short2', short({
  marks: 2,
  stem: 'State two symptoms of amoebic dysentery and one way of preventing it.',
  model: 'Symptoms are **diarrhoea with blood and mucus** and **stomach cramps**. It is prevented by drinking **boiled water**, washing hands, covering food and controlling flies.',
  sol: 'Two symptoms; one preventive measure.',
  scheme: [['Two symptoms', 1], ['One preventive measure', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('malsym-short3', short({
  marks: 3,
  stem: 'Describe the symptoms of malaria and name the vector and the cause of the disease.',
  model: 'The patient has **chills, then a high fever and sweating**, repeating at regular intervals, with headache and weakness. The vector is the **female Anopheles mosquito**; the disease is caused by a **protozoan** that lives in red blood cells.',
  sol: 'Symptoms; vector; protozoan.',
  scheme: [['Symptoms', 1], ['Vector', 1], ['Cause is a protozoan', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('proto-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between malaria and sleeping sickness.',
  model: '| Malaria | Sleeping sickness |\n|---|---|\n| Spread by the **female Anopheles** mosquito | Spread by the **tsetse fly** |\n| **Regular chills and fever** | Fever, then **constant sleepiness** |\n| Found in many warm countries including India | Found in **parts of Africa** |',
  sol: 'Vector; symptom; place.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('term-protozoan', term({
  stem: 'Give the biological term: a single-celled organism that causes malaria.',
  model: '**Protozoan.**', sol: 'Protozoan.', sch: 'Protozoan',
  d: 1, c: 'recall', t: [5],
}));
add('odd-water', term({
  stem: 'Which of these does not belong with the rest: cholera, typhoid, amoebic dysentery, malaria? Give the group to which the others belong.',
  model: '**Malaria**; the others spread through **contaminated water and food**.', sol: 'Malaria is spread by a vector.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3, 5],
}));
add('nets-num', num({
  stem: `In a village of ${NETS.houses} houses, ${NETS.with} houses have bed nets. What percentage of the houses has nets?`,
  value: NETS_PCT, unit: 'per cent',
  sol: `${NETS.with} ÷ ${NETS.houses} × 100 = ${NETS_PCT} per cent (${NETS_WITHOUT} houses have no nets).`,
  scheme: [[`${NETS_PCT} per cent`, 1]],
  d: 2, c: 'application', t: [5, 6],
}), (q) => q.answer.value === 70 && NETS_WITHOUT === 45 || 'value');

// ---------------------------------------------------------------- t06 helminthic diseases
add('taenia-mcq', mcq({
  stem: 'A meat inspector rejects meat that holds the larvae of a worm, because eating such meat, if undercooked, can cause',
  right: 'taeniasis', wrong: ['ascariasis', 'filariasis', 'amoebic dysentery'],
  sol: 'Tapeworm larvae in undercooked meat cause taeniasis — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('ascar-mcq', mcq({
  stem: 'Children who play in soil and eat without washing their hands are most at risk of getting',
  right: 'ascariasis', wrong: ['filariasis', 'sleeping sickness', 'taeniasis'],
  sol: 'Roundworm eggs in the soil reach the mouth on unwashed hands — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('filar-mcq', mcq({
  stem: 'A man\'s leg has become greatly swollen and heavy. The disease is spread by the bite of a',
  right: 'Culex mosquito', wrong: ['tsetse fly', 'housefly', 'cockroach'],
  sol: 'Filariasis, which swells the leg, is spread by the Culex mosquito — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('wash-mcq', mcq({
  stem: 'Washing raw vegetables well before eating helps to prevent',
  right: 'ascariasis', wrong: ['filariasis', 'malaria', 'chicken pox'],
  sol: 'Washing removes the eggs of roundworms — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('helm-short2', short({
  marks: 2,
  stem: 'Name the worm that causes taeniasis and state how a person gets the disease.',
  model: 'Taeniasis is caused by a **tapeworm** that lives in the intestine. A person gets it by eating **undercooked meat** that holds the larvae of the worm.',
  sol: 'Tapeworm; undercooked meat.',
  scheme: [['Tapeworm', 1], ['Undercooked meat with larvae', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('filsym-short2', short({
  marks: 2,
  stem: 'Name the vector of filariasis and the swelling that the disease may cause.',
  model: 'The vector is the **Culex mosquito**. The disease may cause great swelling of the legs and other parts, called **elephantiasis**.',
  sol: 'Culex; elephantiasis.',
  scheme: [['Culex mosquito', 1], ['Elephantiasis', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('asc-short2', short({
  marks: 2,
  stem: 'State two measures that prevent ascariasis.',
  model: 'Wash the **hands** before eating and **wash vegetables** well, use **safe latrines** so that faeces do not contaminate soil and water, and drink **boiled water** (any two).',
  sol: 'Any two measures.',
  scheme: [['First measure', 1], ['Second measure', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('worm-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between ascariasis and taeniasis.',
  model: '| Ascariasis | Taeniasis |\n|---|---|\n| Caused by a **roundworm** in the small intestine | Caused by a **tapeworm** in the intestine |\n| Spread by **eggs** in soil, water and vegetables | Spread by **larvae** in undercooked meat |\n| Prevented by **washing hands and vegetables** | Prevented by **cooking meat well** |',
  sol: 'Worm; source; prevention.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('pond-short3', short({
  marks: 3,
  stem: 'A village has several stagnant pools. Name two diseases they may help to spread, and state two measures to deal with the pools.',
  model: 'Stagnant pools breed mosquitoes that spread **malaria** and **filariasis**. The pools should be **drained or filled**, and **oil or insecticide** sprayed or **larvae-eating fish** introduced where water must stay.',
  sol: 'Malaria and filariasis; two measures.',
  scheme: [['Two diseases', 1], ['First measure', 1], ['Second measure', 1]],
  d: 2, c: 'application', t: [2, 5, 6],
}));
add('odd-worm', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Ascariasis, Taeniasis, Filariasis, Chicken pox.',
  model: '**Chicken pox**; the others are **helminthic (worm) diseases**.', sol: 'Chicken pox is viral.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [4, 6],
}));
add('reason-meat', term({
  stem: 'Give reason: meat should be cooked thoroughly before it is eaten.',
  model: 'Thorough cooking **kills the larvae of the tapeworm** that may be present in the meat and so prevents taeniasis.', sol: 'Kills larvae.', sch: 'Kills larvae',
  d: 2, c: 'application', t: [6],
}));
add('wash-num', num({
  stem: `A sample of vegetables has ${WASH.before} roundworm eggs on it. After washing, ${WASH.after} eggs remain. How many times fewer eggs are there after washing?`,
  value: WASH_FACTOR, unit: 'times',
  sol: `${WASH.before} ÷ ${WASH.after} = ${WASH_FACTOR} times fewer (${WASH_DROP} eggs removed).`,
  scheme: [[`${WASH_FACTOR} times`, 1]],
  d: 2, c: 'application', t: [6],
}), (q) => q.answer.value === 10 && WASH_DROP === 72 || 'value');
add('fill-terms', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [vector, epidemic, jaundice, dehydration, pandemic, endemic, antibiotic, vaccine]\n\nA sudden rise in the number of cases in one town is an (a) ______. An epidemic that spreads over many countries is a (b) ______. An insect that carries a pathogen is a (c) ______. Loss of water and salts from the body in cholera is (d) ______. Yellow skin and eyes in a liver disease is called (e) ______.',
  acc: [['epidemic'], ['pandemic'], ['vector'], ['dehydration'], ['jaundice']],
  sol: '(a) epidemic; (b) pandemic; (c) vector; (d) dehydration; (e) jaundice.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));
add('match5', match({
  marks: 5,
  stem: 'Study the diagram of the spread of malaria and match each lettered part with its description.',
  pairs: [
    ['A', 'Person whose blood holds the parasites'],
    ['B', 'Vector that carries the parasites'],
    ['C', 'Place where eggs and larvae develop'],
    ['D', 'Person who becomes infected by a bite'],
    ['E', 'Route by which the parasites pass to a new person'],
  ],
  order: [3, 0, 4, 2, 1],
  sol: 'A infected person; B mosquito; C stagnant water; D healthy person; E the bite of the mosquito.',
  d: 2, c: 'application', t: [2, 5],
  assets: [malFig],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('epi-long', long({
  marks: 10, wl: null,
  stem: `The bar chart shows the number of new cases in each of six weeks in an outbreak of a disease in a town.\n\n(a) In which week were new cases highest, and how many were there? [2]\n\n(b) Calculate the total number of cases in the six weeks. [2]\n\n(c) Name the pattern of occurrence that this chart shows and give a reason for your answer. [2]\n\n(d) Draw a neat, labelled diagram showing how a housefly can carry germs from waste to food, naming four parts. [4]`,
  model: `**(a)** Week **${PEAK_WEEK}**, with **${PEAK}** new cases.\n\n**(b)** ${WEEKLY.join(' + ')} = **${WEEK_TOTAL}** cases.\n\n**(c)** An **epidemic**: the cases **rose suddenly** (from ${WEEKLY[0]} to ${PEAK} in a few weeks) in **one town**, then fell.\n\n**(d)** **Open waste**, a **housefly** with **germs on its legs and body**, **uncovered food**, and an arrow from waste to food; four labels.`,
  sol: `Week ${PEAK_WEEK}, ${PEAK}; ${WEEK_TOTAL}; epidemic with reason; labelled fly diagram.`,
  scheme: [[`Week ${PEAK_WEEK}`, 1], [`${PEAK} cases`, 1], ['Working', 1], [`${WEEK_TOTAL}`, 1], ['Epidemic', 1], ['Reason: sudden rise in one area', 1], ['Diagram drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1, 2],
  assets: [epiFig],
}), () => PEAK_WEEK === 4 && WEEK_TOTAL === 168 && PEAK_OVER_FIRST === 33 && FALL_AFTER_PEAK === 54 || 'chart');
add('malfig-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram, in which a person with a fever, a mosquito and a pool of water are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) Name the disease that spreads in this way and name the cause of the disease. [2]\n\n(c) State two ways in which the spread of this disease can be controlled. [2]\n\n(d) Draw a neat, labelled sketch of a village pond showing three measures that stop mosquitoes from breeding. [3]',
  model: '**(a)** A is the **infected person**, B the **(female Anopheles) mosquito** and C **stagnant water**.\n\n**(b)** **Malaria**; it is caused by a **protozoan** (a parasite that lives in red blood cells).\n\n**(c)** **Drain or cover stagnant water**; use **bed nets** or repellents (or spray oil; introduce larvae-eating fish).\n\n**(d)** A pond with **larvae-eating fish**, a film of **oil** on the water and a **drain** that carries standing water away; three labels.',
  sol: 'Infected person, mosquito, stagnant water; malaria and a protozoan; two control measures; labelled pond.',
  scheme: [['A infected person', 1], ['B mosquito', 1], ['C stagnant water', 1], ['Malaria', 1], ['Protozoan', 1], ['First control measure', 1], ['Second control measure', 1], ['Pond drawn', 1], ['Three labels', 2]],
  d: 2, c: 'application', t: [2, 5],
  assets: [malFig],
}));
add('flyfig-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram, in which a fly, waste, food and a person are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) Name the part E and state its role in the spread of a disease. [2]\n\n(c) Name two diseases that can spread in this way. [2]\n\n(d) Draw a neat, labelled diagram of a safe way of storing food, naming three parts. [3]',
  model: '**(a)** A is **open waste**, B a **housefly** and C **uncovered food**.\n\n**(b)** E is the **legs and body of the fly**; **germs stick to them** and are carried to the food.\n\n**(c)** **Cholera**, **typhoid**, or **amoebic dysentery** (any two).\n\n**(d)** A **plate of food under a lid or gauze cover**, a **shelf off the floor** and a **closed container**; three labels.',
  sol: 'Waste, fly, food; legs and body carry germs; two diseases; labelled covered food.',
  scheme: [['A open waste', 1], ['B housefly', 1], ['C uncovered food', 1], ['E legs and body', 1], ['Role: carry germs', 1], ['First disease', 1], ['Second disease', 1], ['Food store drawn', 1], ['Three labels', 2]],
  d: 2, c: 'application', t: [2, 3],
  assets: [flyFig],
}));
add('pox-long', long({
  marks: 10, wl: null,
  stem: `In a boarding school of ${SCHOOL.pupils} pupils, ${SCHOOL.cases} children get chicken pox in a month. The school sends them to a separate room.\n\n(a) Calculate the percentage of pupils who fell ill. [2]\n\n(b) State two ways in which chicken pox can spread. [2]\n\n(c) Give two reasons for keeping the patients in a separate room. [2]\n\n(d) Draw a neat, labelled diagram of the skin of a patient showing a red spot, a blister and a scab. [4]`,
  model: `**(a)** ${SCHOOL.cases} ÷ ${SCHOOL.pupils} × 100 = **${SCHOOL_PCT} per cent**.\n\n**(b)** Through **droplets in the air** from a cough or sneeze, and by **touching the fluid of the blisters**.\n\n**(c)** To **stop the virus spreading** to the ${SCHOOL_WELL} healthy pupils, and so that the patients can **rest** and get care.\n\n**(d)** A patch of skin with a **red spot**, a **fluid-filled blister** and a **scab**; three labels and a title.`,
  sol: `${SCHOOL_PCT} per cent; air droplets and blister fluid; prevent spread, rest; labelled skin.`,
  scheme: [['Working', 1], [`${SCHOOL_PCT} per cent`, 1], ['First way', 1], ['Second way', 1], ['First reason', 1], ['Second reason', 1], ['Skin drawn', 2], ['Three stages labelled', 2]],
  d: 3, c: 'application', t: [4],
}), () => SCHOOL_PCT === 9 && SCHOOL_WELL === 182 || 'pox');
add('cholera-long', long({
  marks: 10, wl: null,
  stem: `After a flood, many people in a village fall ill with sudden watery diarrhoea. One patient passes ${STOOLS.n} stools in a day, about ${STOOLS.ml} mL in each.\n\n(a) Calculate the volume of fluid lost in a day, in litres. [2]\n\n(b) Name the likely disease and state why the patient must be given a solution of salts and sugar in water. [3]\n\n(c) State two measures that the village should take to stop the spread. [2]\n\n(d) Draw a neat, labelled diagram of a protected village well, naming three parts. [3]`,
  model: `**(a)** ${STOOLS.n} × ${STOOLS.ml} = ${WATER_LOST_ML} mL = **${WATER_LOST_L} litres**.\n\n**(b)** **Cholera**. The body has lost **water and salts** (dehydration) and these must be **replaced** by **oral rehydration solution**.\n\n**(c)** **Boil or chlorinate drinking water** and **keep food covered**; dispose of waste safely and control flies (any two).\n\n**(d)** A **well with a raised wall and a lid**, a **pump or covered bucket** and a **drain taking spilt water away**; three labels.`,
  sol: `${WATER_LOST_L} litres; cholera, replace water and salts; two measures; labelled well.`,
  scheme: [['Working', 1], [`${WATER_LOST_L} litres`, 1], ['Cholera', 1], ['Dehydration', 1], ['Replaces water and salts', 1], ['First measure', 1], ['Second measure', 1], ['Well drawn', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [3],
}), () => WATER_LOST_L === 4 || 'cholera');
add('worm-long', long({
  marks: 10, wl: null,
  stem: `A health worker tests vegetables from a market. A sample has ${WASH.before} roundworm eggs before washing and ${WASH.after} after washing. In the same town, some families have a tapeworm infection and a few have swollen legs.\n\n(a) Calculate how many times fewer eggs there are after washing. [2]\n\n(b) Name the disease caused by the roundworm and state two symptoms. [2]\n\n(c) State how the families got the tapeworm infection and one way of preventing it. [2]\n\n(d) Draw a neat flow diagram showing how undercooked meat can lead to a tapeworm in the intestine, with four labelled steps. [4]`,
  model: `**(a)** ${WASH.before} ÷ ${WASH.after} = **${WASH_FACTOR} times** fewer.\n\n**(b)** **Ascariasis**; symptoms are **stomach pain** and **poor growth** (or vomiting, anaemia, worms in the stool).\n\n**(c)** By eating **undercooked meat** with larvae; prevented by **cooking meat well** (or meat inspection).\n\n**(d)** **Meat with larvae** → **undercooked meal eaten** → **larva grows in the intestine** → **adult tapeworm**; four labelled steps joined by arrows.`,
  sol: `${WASH_FACTOR} times; ascariasis and symptoms; undercooked meat and cooking; flow diagram.`,
  scheme: [['Working', 1], [`${WASH_FACTOR} times`, 1], ['Ascariasis', 1], ['Two symptoms', 1], ['Undercooked meat', 1], ['A preventive measure', 1], ['Flow diagram drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [6],
}), () => WASH_FACTOR === 10 || 'worm');
