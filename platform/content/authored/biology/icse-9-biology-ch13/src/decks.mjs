// ICSE 9 Biology ch13 Diseases and their Transmission — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { FLY, MALARIA } from './svgs.mjs';
import { USUAL, SURGE, SURGE_RATIO, SURGE_EXTRA, WARD, RATE_P, RATE_Q, RATE_RATIO, FEVER_DAYS, FEVER_GAP, FEVER_NEXT, POTS, LARVAE_BEFORE, POTS_LEFT, LARVAE_AFTER, LARVAE_DROP, LARVAE_PCT } from './calc.mjs';

export const V = {
  fly: svgV(FLY, 'A housefly feeds on open waste, carries germs on its legs and body to uncovered food, which a person then eats'),
  malaria: svgV(MALARIA, 'An infected person is bitten by a female Anopheles mosquito, which then bites a healthy person and lays eggs in stagnant water'),
};

export const deck1 = deck({
  part: 1,
  title: 'Diseases and their Transmission — Part 1: Kinds of disease, spread, and bacterial diseases',
  goals: [
    'Classify diseases as communicable or non-communicable, and use the terms endemic, epidemic, pandemic and sporadic',
    'Explain how diseases spread through air, water and insect vectors',
    'State the symptoms and control of cholera, typhoid and tuberculosis',
  ],
  slides: [
    sl('title', 'Diseases and their Transmission', {
      b: 'Part 1 — what a disease is, how it spreads, and three bacterial diseases.',
      v: flow('LR', [['g', 'Pathogen'], ['r', 'Route of spread'], ['h', 'New host falls ill']], [['g', 'r'], ['r', 'h']], 'Flow from a pathogen through a route of spread to a new host who falls ill'),
      n: 'A disease is a condition that stops the body from working properly. Many diseases are caused by tiny living things called pathogens. In this part we see how pathogens travel from one person to another, and we study three diseases caused by bacteria.',
    }),
    sl('concept', 'Communicable and non-communicable diseases', {
      v: table(['', 'Communicable', 'Non-communicable'], [['Cause', 'A pathogen such as a bacterium, virus, protozoan or worm', 'Not a pathogen: lifestyle, deficiency, heredity or ageing'], ['Spread', 'Passes from a sick person or animal to a healthy person', 'Does not pass from person to person'], ['Examples', 'Cholera, tuberculosis, malaria, chicken pox', 'Diabetes, scurvy, cancer, heart disease']], 'Table comparing communicable and non-communicable diseases by cause, spread and examples'),
      n: 'Communicable diseases are caused by pathogens and can pass from one living thing to another. Non-communicable diseases cannot be caught. They arise from causes such as poor diet, heredity or a body part wearing out. Cholera is communicable, while diabetes is not.',
    }),
    sl('concept', 'Endemic, epidemic, pandemic and sporadic', {
      v: table(['Term', 'Meaning', 'Example of a situation'], [['Endemic', 'Always present in a particular area or population', 'A disease found in every year in one district'], ['Epidemic', 'Suddenly affects many people in an area at the same time', 'A sharp rise in cholera in a town'], ['Pandemic', 'Epidemic that spreads over many countries or continents', 'A flu that spreads across the world'], ['Sporadic', 'A few scattered cases at irregular times, no common source', 'A few typhoid cases in different towns']], 'Table of the four patterns of occurrence of a disease with meaning and example'),
      n: 'These four words describe how a disease occurs. Endemic means always present in one area. Epidemic means a sudden rise in cases in an area. Pandemic means an epidemic spread across many countries. Sporadic means a few scattered cases with no common source.',
    }),
    sl('check', 'Quick check: a sudden rise', {
      b: 'A disease that suddenly affects a large number of people in one area at the same time is',
      chk: 'chk-epidemic',
      n: 'Think about the word that means a sudden rise in one area.',
    }),
    sl('example', 'Worked example 1: is it an epidemic?', {
      b: `A town normally records ${USUAL} cases of a disease in a month. In one month it records ${SURGE} cases. How many times the usual number is this, and what is the pattern?`,
      ul: [`Step 1: times the usual = ${SURGE} ÷ ${USUAL} = **${SURGE_RATIO}**.`, `Step 2: extra cases = ${SURGE} − ${USUAL} = **${SURGE_EXTRA}**.`, 'Step 3: a sudden rise in one area far above the usual is an **epidemic**.'],
      v: table(['Quantity', 'Value'], [['Usual cases a month', String(USUAL)], ['Cases this month', String(SURGE)], ['Times the usual', String(SURGE_RATIO)], ['Extra cases', String(SURGE_EXTRA)], ['Pattern', 'Epidemic']], 'Worked table: ninety-two cases is twenty-three times the usual four, an epidemic'),
      n: 'Divide this month by the usual number. Ninety-two divided by four gives twenty-three, so there are twenty-three times as many cases as usual. That is eighty-eight extra cases. A sudden jump in one town is an epidemic.',
    }),
    sl('concept', 'How pathogens travel', {
      v: table(['Route', 'How it happens', 'Diseases'], [['Air', 'Droplets from a cough or sneeze are breathed in', 'Tuberculosis, chicken pox'], ['Water and food', 'Pathogens in drinking water or uncovered food are swallowed', 'Cholera, typhoid, amoebic dysentery'], ['Vectors', 'An animal, usually an insect, carries the pathogen', 'Malaria, filariasis, sleeping sickness'], ['Contact and body fluids', 'Touch, blood, needles or sexual contact', 'AIDS, hepatitis B, chicken pox blisters']], 'Table of four routes by which pathogens travel with diseases for each'),
      n: 'Pathogens travel in several ways. Through the air in droplets from a cough. Through water and food that has been contaminated. Through vectors, which are animals that carry them. And through contact, blood or body fluids.',
    }),
    sl('diagram', 'A housefly as a carrier', {
      b: 'A fly that feeds on waste and then sits on food leaves germs behind.',
      v: V.fly,
      n: 'A housefly feeds on waste and dirt. Germs stick to its legs and body. When the fly lands on uncovered food, the germs are left behind, and the person who eats the food may fall ill.',
    }),
    sl('concept', 'Vectors: housefly, mosquito and cockroach', {
      v: table(['Vector', 'How it spreads disease', 'Diseases', 'Control'], [['Housefly', 'Carries germs on legs and body from waste to food', 'Cholera, typhoid, dysentery', 'Cover food, dispose of waste safely, keep drains closed'], ['Mosquito', 'Bites a sick person, then a healthy one; breeds in stagnant water', 'Malaria, filariasis', 'Drain stagnant water, use nets and repellents'], ['Cockroach', 'Walks over waste, then over food and utensils', 'Food poisoning, dysentery, typhoid', 'Keep kitchens clean and food covered']], 'Table of the vectors housefly, mosquito and cockroach with how they spread disease and the control'),
      n: 'The housefly and the cockroach carry germs on their bodies from waste to food. The mosquito bites a sick person and then a healthy one, and it breeds in stagnant water. Control means clean surroundings, covered food and no standing water.',
    }),
    sl('check', 'Quick check: a vector', {
      b: 'An animal that carries a pathogen from one host to another, without itself being the cause of the disease, is a',
      chk: 'chk-vector',
      n: 'The mosquito and the housefly are examples.',
    }),
    sl('example', 'Worked example 2: tracing the source', {
      b: `Ward P (${WARD.P.pop} people) drinks from a broken pipe and has ${WARD.P.cases} cases of typhoid. Ward Q (${WARD.Q.pop} people) uses a covered well and has ${WARD.Q.cases} cases. Which ward points to a contaminated water source?`,
      ul: [`Step 1: cases per 1000 in P = ${WARD.P.cases} ÷ ${WARD.P.pop} × 1000 = **${RATE_P}**.`, `Step 2: cases per 1000 in Q = ${WARD.Q.cases} ÷ ${WARD.Q.pop} × 1000 = **${RATE_Q}**.`, `Step 3: P has **${RATE_RATIO} times** the rate of Q, so the **broken pipe** is the likely source.`],
      v: table(['Ward', 'People', 'Cases', 'Cases per 1000'], [['P (broken pipe)', String(WARD.P.pop), String(WARD.P.cases), String(RATE_P)], ['Q (covered well)', String(WARD.Q.pop), String(WARD.Q.cases), String(RATE_Q)]], 'Worked table comparing cases per thousand people in ward P and ward Q'),
      n: 'Compare the wards by cases in every thousand people, not by raw numbers, because the wards differ in size. Ward P has twenty-four in every thousand. Ward Q has two. The rate in P is twelve times higher, which points to the broken pipe.',
    }),
    sl('concept', 'Cholera and typhoid', {
      v: table(['', 'Cholera', 'Typhoid'], [['Pathogen', 'Bacterium', 'Bacterium'], ['Spread', 'Contaminated water and food; flies', 'Contaminated water and food; flies'], ['Symptoms', 'Sudden, severe watery diarrhoea, vomiting, cramps, loss of water from the body', 'Long-lasting fever that rises step by step, headache, weakness, stomach pain'], ['Control', 'Boiled or chlorinated water, oral rehydration, clean food, safe disposal of waste, vaccine', 'Boiled water, hygiene, clean food, fly control, vaccine, antibiotics on a doctor\'s advice']], 'Table comparing cholera and typhoid by pathogen, spread, symptoms and control'),
      n: 'Cholera and typhoid are both caused by bacteria and spread through contaminated water and food. Cholera causes sudden severe watery diarrhoea and loss of body water. Typhoid causes a long fever, headache and weakness. Boiled water and clean food help control both.',
    }),
    sl('concept', 'Tuberculosis', {
      v: table(['Feature', 'Detail'], [['Pathogen', 'Bacterium that mainly infects the lungs'], ['Spread', 'Through the air, in droplets from the cough of a patient'], ['Symptoms', 'Cough lasting weeks, sometimes with blood, chest pain, tiredness, weight loss, evening fever'], ['Control', 'Cover the mouth when coughing, good ventilation, vaccine in childhood, full course of the prescribed antibiotics']], 'Table of the pathogen, spread, symptoms and control of tuberculosis'),
      n: 'Tuberculosis is caused by a bacterium that mainly infects the lungs. It spreads through the air in droplets from the cough of a patient. A cough lasting weeks, weight loss and tiredness are signs. A full course of medicine is essential.',
    }),
    sl('check', 'Quick check: an airborne disease', {
      b: 'Which of these diseases spreads mainly through droplets in the air?',
      chk: 'chk-tb',
      n: 'Think about the lungs.',
    }),
    sl('summary', 'Summary', {
      ul: ['Communicable diseases are caused by pathogens and can spread; non-communicable diseases cannot.', 'Endemic, epidemic, pandemic and sporadic describe how a disease occurs.', 'Routes: air, water and food, vectors, contact.', 'Cholera and typhoid: water and food. Tuberculosis: air.'],
      v: table(['Disease', 'Route', 'Key control'], [['Cholera', 'Water and food', 'Safe water, rehydration'], ['Typhoid', 'Water and food', 'Safe water, vaccine'], ['Tuberculosis', 'Air', 'Full course of medicine, vaccine']], 'Summary table of cholera, typhoid and tuberculosis with route and key control'),
      n: 'To recap. Communicable diseases are caused by pathogens and can spread. Endemic, epidemic, pandemic and sporadic describe how a disease occurs. Pathogens travel by air, water and food, vectors and contact. Cholera and typhoid spread in water and food, and tuberculosis spreads in the air.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give an **example** with every term: **endemic, epidemic, pandemic, sporadic**.', 'Name the **route of spread** for each disease and the **vector** where there is one.', 'Write **symptoms** and **control measures** as separate short points.', 'Do not write scientific names of the pathogens; the syllabus does not ask for them.'],
      n: 'Exam tips. Give an example with each term. Name the route of spread for each disease, and the vector where there is one. Write symptoms and control as separate short points. Scientific names of pathogens are not needed.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Diseases and their Transmission — Part 2: Viral, protozoan and helminthic diseases',
  goals: [
    'State the symptoms, spread and control of AIDS, chicken pox and hepatitis',
    'State the symptoms and control of malaria, amoebic dysentery and sleeping sickness',
    'State the symptoms and control of ascariasis, taeniasis and filariasis',
  ],
  slides: [
    sl('title', 'Viruses, Protozoans and Worms', {
      b: 'Part 2 — nine more diseases, grouped by the kind of pathogen.',
      v: flow('LR', [['v', 'Viruses'], ['p', 'Protozoans'], ['w', 'Worms']], [['v', 'p'], ['p', 'w']], 'Flow showing the three groups of pathogens in this part: viruses, protozoans and worms'),
      n: 'This part covers nine diseases in three groups. Three are caused by viruses, three by single-celled protozoans, and three by worms. For each one we learn how it spreads, what its signs are and how it is controlled.',
    }),
    sl('concept', 'AIDS', {
      v: table(['Feature', 'Detail'], [['Pathogen', 'A virus that attacks the white blood cells of the immune system'], ['Effect', 'The body can no longer fight many germs, so common infections become serious'], ['Symptoms', 'Long fever, weight loss, swollen glands, long diarrhoea, repeated infections'], ['Control', 'Safe blood, new or sterilised needles, safe sexual practices, medical care in pregnancy, awareness']], 'Table of the pathogen, effect, symptoms and control of AIDS'),
      n: 'AIDS is caused by a virus that attacks the white blood cells of the immune system. The body then cannot fight even common germs. Signs include long fever, weight loss and swollen glands. It is controlled by safe blood, clean needles and awareness.',
    }),
    sl('concept', 'How AIDS spreads and how it does not', {
      v: table(['Spreads by', 'Does not spread by'], [['Unprotected sexual contact with an infected person', 'Hugging, shaking hands or sitting together'], ['Infected blood in a transfusion', 'Sharing food, utensils or a toilet'], ['Shared or unsterilised needles', 'Mosquito or other insect bites'], ['From an infected mother to her baby', 'Coughing, sneezing or swimming together']], 'Table contrasting the ways AIDS spreads with ways it does not spread'),
      n: 'The virus passes through certain body fluids, mainly in blood and in sexual contact, and from a mother to her baby. It does not spread through hugging, shared food, toilets, coughs or mosquitoes. Knowing this helps us support patients without fear.',
    }),
    sl('check', 'Quick check: the target of the virus', {
      b: 'The virus that causes AIDS mainly damages the body\'s',
      chk: 'chk-aids',
      n: 'The virus attacks the defence system.',
    }),
    sl('concept', 'Chicken pox and hepatitis', {
      v: table(['', 'Chicken pox', 'Hepatitis'], [['Pathogen', 'Virus', 'Viruses of several types'], ['Part affected', 'Skin', 'Liver'], ['Spread', 'Air droplets; touching the fluid of blisters', 'Type A: food and water; type B: blood, needles, body fluids'], ['Symptoms', 'Mild fever, then itchy red spots that become fluid-filled blisters and scab', 'Tiredness, loss of appetite, yellow skin and eyes (jaundice), dark urine'], ['Control', 'Isolate the patient, rest, hygiene, vaccine', 'Boiled water and clean food, vaccine, safe blood, sterile needles']], 'Table comparing chicken pox and hepatitis by pathogen, organ, spread, symptoms and control'),
      n: 'Chicken pox and hepatitis are viral. Chicken pox affects the skin and gives itchy blisters, and it spreads through the air and by touch. Hepatitis affects the liver and causes yellow skin and eyes. Type A spreads through food and water, and type B through blood.',
    }),
    sl('check', 'Quick check: yellow skin', {
      b: 'Yellowing of the skin and eyes is a typical sign of a disease of the',
      chk: 'chk-hepatitis',
      n: 'This sign is called jaundice.',
    }),
    sl('diagram', 'Malaria: how the mosquito spreads it', {
      b: 'A **female Anopheles mosquito** carries the parasites from a patient to a healthy person.',
      v: V.malaria,
      n: 'A female Anopheles mosquito bites a person with malaria and sucks blood with the parasites. When it bites a healthy person it passes the parasites on. The mosquito lays its eggs in stagnant water, where the young develop.',
    }),
    sl('concept', 'Malaria: symptoms and control', {
      v: table(['Feature', 'Detail'], [['Pathogen', 'A protozoan that lives in red blood cells and the liver'], ['Symptoms', 'Chills, then high fever and sweating, repeating at regular intervals; headache; weakness; anaemia'], ['Control of the vector', 'Drain stagnant water, spray oil or insecticide, keep fish that eat larvae, use nets and screens'], ['Treatment', 'Medicines for malaria, on a doctor\'s advice']], 'Table of the pathogen, symptoms, vector control and treatment of malaria'),
      n: 'Malaria is caused by a protozoan that lives in the liver and red blood cells. The patient has chills, then high fever and sweating, repeating at regular intervals. We control it by removing stagnant water, using nets and treating patients early.',
    }),
    sl('example', 'Worked example 1: the rhythm of the fever', {
      b: `A malaria patient has fever peaks on days ${FEVER_DAYS[0]}, ${FEVER_DAYS[1]} and ${FEVER_DAYS[2]}. How many days apart are the peaks and on which day is the next expected?`,
      ul: [`Step 1: gap = ${FEVER_DAYS[1]} − ${FEVER_DAYS[0]} = **${FEVER_GAP}** days; ${FEVER_DAYS[2]} − ${FEVER_DAYS[1]} = **${FEVER_GAP}** days as well.`, `Step 2: next peak = ${FEVER_DAYS[2]} + ${FEVER_GAP} = **day ${FEVER_NEXT}**.`, 'Step 3: fever returning at regular intervals is a feature of **malaria**.'],
      v: table(['Peak', '1st', '2nd', '3rd', 'Next'], [['Day', String(FEVER_DAYS[0]), String(FEVER_DAYS[1]), String(FEVER_DAYS[2]), String(FEVER_NEXT)]], 'Worked table of fever peaks on days three, six and nine with the next expected on day twelve'),
      n: 'Find the gap between peaks. Six minus three is three, and nine minus six is three. The peaks are three days apart. Add three to nine, and the next peak is expected on day twelve. Regular fever is typical of malaria.',
    }),
    sl('example', 'Worked example 2: draining the breeding places', {
      b: `A colony has ${POTS.n} water containers with ${POTS.larvae} mosquito larvae in each. Residents empty ${POTS.emptied} of them. By what percentage do the larvae fall?`,
      ul: [`Step 1: before = ${POTS.n} × ${POTS.larvae} = **${LARVAE_BEFORE}**.`, `Step 2: containers left = ${POTS.n} − ${POTS.emptied} = ${POTS_LEFT}; larvae after = ${POTS_LEFT} × ${POTS.larvae} = **${LARVAE_AFTER}**.`, `Step 3: fall = ${LARVAE_DROP} ÷ ${LARVAE_BEFORE} × 100 = **${LARVAE_PCT} per cent**.`],
      v: table(['Quantity', 'Value'], [['Larvae before', String(LARVAE_BEFORE)], ['Containers left', String(POTS_LEFT)], ['Larvae after', String(LARVAE_AFTER)], ['Fall (per cent)', String(LARVAE_PCT)]], 'Worked table: six hundred larvae fall to one hundred fifty, a fall of seventy-five per cent'),
      n: 'Before, twelve containers with fifty larvae each hold six hundred larvae. After emptying nine, three containers remain, so one hundred fifty larvae are left. The fall is four hundred fifty out of six hundred, which is seventy-five per cent.',
    }),
    sl('concept', 'Amoebic dysentery and sleeping sickness', {
      v: table(['', 'Amoebic dysentery', 'Sleeping sickness'], [['Pathogen', 'Protozoan living in the large intestine', 'Protozoan living in the blood and later the brain'], ['Spread', 'Food and water with the resting stage; flies', 'Bite of the tsetse fly, found in parts of Africa'], ['Symptoms', 'Diarrhoea with blood and mucus, stomach cramps', 'Fever, headache, swollen glands, then constant sleepiness'], ['Control', 'Boiled water, washed hands, covered food, safe disposal of faeces, fly control, medicines', 'Control of tsetse flies, early treatment']], 'Table comparing amoebic dysentery and sleeping sickness by pathogen, spread, symptoms and control'),
      n: 'Amoebic dysentery is caused by a protozoan in the large intestine. It spreads through food and water and gives diarrhoea with blood and mucus. Sleeping sickness is caused by a protozoan carried by the tsetse fly. It brings fever and then constant sleepiness.',
    }),
    sl('check', 'Quick check: the sleeping sickness vector', {
      b: 'Sleeping sickness is spread by the bite of the',
      chk: 'chk-tsetse',
      n: 'This fly is found in parts of Africa.',
    }),
    sl('concept', 'Helminthic diseases: worms', {
      v: table(['Disease', 'Worm and where it lives', 'Spread', 'Symptoms', 'Control'], [['Ascariasis', 'Roundworm in the small intestine', 'Eggs in soil, water and unwashed vegetables', 'Stomach pain, poor growth, anaemia, worms in stool', 'Wash hands and vegetables, safe latrines, medicine'], ['Taeniasis', 'Tapeworm in the intestine', 'Undercooked meat holding the larvae', 'Stomach discomfort, weight loss, pieces of worm in stool', 'Cook meat well, meat inspection, medicine'], ['Filariasis', 'Thread-like worms in the lymph vessels', 'Bite of the Culex mosquito', 'Fever, swelling of legs and other parts (elephantiasis)', 'Mosquito control, nets, medicine']], 'Table of ascariasis, taeniasis and filariasis with the worm, spread, symptoms and control'),
      n: 'Three diseases are caused by worms. Ascariasis is caused by a roundworm whose eggs reach us in soil, water and unwashed vegetables. Taeniasis comes from a tapeworm in undercooked meat. Filariasis is caused by thread-like worms, spread by mosquitoes, and causes swollen legs.',
    }),
    sl('check', 'Quick check: swollen limbs', {
      b: 'A disease in which worms block the lymph vessels and cause great swelling of the legs is',
      chk: 'chk-helminth',
      n: 'The mosquito is the vector.',
    }),
    sl('summary', 'Summary', {
      ul: ['Viral: AIDS (white blood cells), chicken pox (skin), hepatitis (liver).', 'Protozoan: malaria (mosquito), amoebic dysentery (food and water), sleeping sickness (tsetse fly).', 'Helminthic: ascariasis (roundworm), taeniasis (tapeworm), filariasis (mosquito).'],
      v: table(['Group', 'Diseases', 'Main control'], [['Viral', 'AIDS, chicken pox, hepatitis', 'Safe blood and needles, vaccine, hygiene'], ['Protozoan', 'Malaria, amoebic dysentery, sleeping sickness', 'Vector control, safe water'], ['Helminthic', 'Ascariasis, taeniasis, filariasis', 'Clean food, cooked meat, mosquito control']], 'Summary table of the three groups with their diseases and main control'),
      n: 'To recap. AIDS, chicken pox and hepatitis are viral. Malaria, amoebic dysentery and sleeping sickness are protozoan. Ascariasis, taeniasis and filariasis are caused by worms. For each, link the pathogen, the way it spreads and the control.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **female Anopheles** for malaria and **Culex** for filariasis when the vector is asked.', 'For AIDS, say what it **does** (attacks white blood cells) and how it **spreads and does not spread**.', 'Give **two control measures** for each disease, and match them to the route.', 'Do not say that antibiotics cure viral diseases.'],
      n: 'Exam tips. Name the vector when it is asked, the female Anopheles mosquito for malaria. For AIDS say what the virus does, and how it spreads and does not spread. Give two control measures that match the route. Do not say that antibiotics cure viral diseases.',
    }),
  ],
});
