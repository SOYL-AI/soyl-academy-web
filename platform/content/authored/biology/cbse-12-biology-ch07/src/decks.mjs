// ch07 Human Health and Disease — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { PLASMODIUM, ANTIBODY, RESPONSE } from './svgs.mjs';
import { pct, pctChange, chains, series, peakIn } from './calc.mjs';

export const V = {
  plasmodium: svgV(PLASMODIUM, 'Life cycle of Plasmodium in humans and in the female Anopheles mosquito'),
  antibody: svgV(ANTIBODY, 'Y-shaped antibody with two heavy chains, two light chains, disulfide bonds and two antigen-binding sites'),
  response: svgV(RESPONSE, 'Antibody levels showing a slow, low primary response and a fast, high secondary response'),
};

// ---------------------------------------------------------------- computed numbers
const LARVAE = { before: 480, after: 72 };
LARVAE.fall = -pctChange(LARVAE.before, LARVAE.after);
const CH = chains(3);
const PTS = series(70);
const P1 = peakIn(PTS, 0, 39);
const P2 = peakIn(PTS, 40, 70);
const RATIO = Math.round((P2 / P1) * 10) / 10;
const TH = { before: 900, after: 350 };
TH.fall = -pctChange(TH.before, TH.after);
const SMOKE = { teens: 60, tried: 18 };
SMOKE.pct = pct(SMOKE.tried, SMOKE.teens);

export const deck1 = deck({
  part: 1,
  title: 'Human Health and Disease — Part 1: Common diseases in humans',
  goals: [
    'Explain what health means and what affects it',
    'Describe the pathogens, symptoms and spread of common bacterial, viral, protozoan, helminth and fungal diseases',
    'Trace the life cycle of Plasmodium',
    'Explain how these diseases can be prevented and controlled',
  ],
  slides: [
    sl('title', 'Human Health and Disease', {
      b: 'Part 1 — what health is, and the common infectious diseases, their causes and their prevention.',
      v: flow('LR', [['p', 'Pathogen'], ['t', 'Transmission'], ['h', 'Host infected'], ['s', 'Symptoms'], ['c', 'Prevention and control']], [['p', 't'], ['t', 'h'], ['h', 's'], ['c', 't', 'breaks the chain']], 'Flow from pathogen to transmission, infection and symptoms, with prevention breaking the chain'),
      n: 'Health is not simply the absence of disease. It is a state of complete physical, mental and social well-being. Health is affected by our genes, by infections and by our lifestyle, including food, rest, exercise and habits. In this part we look at common infectious diseases and how to break their chains of spread.',
    }),
    sl('concept', 'What affects health', {
      b: 'Good health keeps people efficient and productive, increases longevity and reduces infant and maternal mortality. **Balanced diet, personal hygiene and regular exercise** help maintain it.',
      v: table(['Factor', 'Example'], [['Genetic disorders', 'Deficiencies with which a child is born'], ['Infections', 'Diseases caused by pathogens'], ['Lifestyle', 'Food and water, rest and exercise, habits']], 'Table of three kinds of factors that affect health with examples'),
      n: 'Some threats to health come from our genes, some from infections, and many from the way we live. Infectious diseases spread from one person to another; non-infectious ones, such as cancer, do not. Awareness, vaccination, safe food and water, and clean surroundings protect whole communities.',
    }),
    sl('concept', 'Bacterial diseases: typhoid and pneumonia', {
      b: 'Disease-causing organisms are **pathogens**. Two important bacterial diseases:',
      v: table(['', 'Typhoid', 'Pneumonia'], [['Pathogen', 'Salmonella typhi', 'Streptococcus pneumoniae, Haemophilus influenzae'], ['Organ affected', 'Small intestine first, then other organs via blood', 'Alveoli of the lungs (fill with fluid)'], ['Symptoms', 'Sustained high fever (39–40 °C), weakness, stomach pain, constipation, headache, loss of appetite; intestinal perforation in severe cases', 'Fever, chills, cough, headache; in severe cases lips and fingernails turn grey to bluish'], ['Spread', 'Contaminated food and water', 'Droplets or aerosols from an infected person; shared glasses and utensils'], ['Note', 'Confirmed by the Widal test', 'Severe breathing problems possible']], 'Table comparing typhoid and pneumonia: pathogen, organ affected, symptoms, spread and notes'),
      n: 'Typhoid spreads through contaminated food and water. The bacteria settle in the small intestine and spread through the blood, causing a long high fever. A famous case was a cook called Mary Mallon, a healthy carrier who spread typhoid for years. Pneumonia bacteria infect the tiny air sacs of the lungs, which fill with fluid, making breathing hard.',
    }),
    sl('concept', 'Viral and fungal diseases', {
      b: 'Viruses and fungi also cause common diseases.',
      v: table(['Disease', 'Pathogen', 'Main features', 'Spread'], [['Common cold', 'Rhinoviruses', 'Infects nose and respiratory passage, not lungs; nasal congestion and discharge, sore throat, hoarseness, cough, headache; lasts 3–7 days', 'Droplets; contaminated objects such as pens, books, cups, doorknobs, keyboards'], ['Dengue', 'Dengue virus', 'High fever, severe headache, pain behind the eyes, muscle and joint pain, rash; bleeding in severe cases', 'Bite of Aedes mosquitoes'], ['Chikungunya', 'Chikungunya virus', 'Fever with severe joint pain', 'Bite of Aedes mosquitoes'], ['Ringworm', 'Fungi (Microsporum, Trichophyton, Epidermophyton)', 'Dry, scaly lesions on skin, nails or scalp with intense itching; favoured by heat and moisture', 'Soil; sharing towels, clothes or combs']], 'Table of the common cold, dengue, chikungunya and ringworm with pathogen, features and spread'),
      n: 'The common cold is caused by rhinoviruses that infect the nose and throat but not the lungs, and it usually clears in a week. Dengue and chikungunya are viral fevers spread by Aedes mosquitoes, which breed in clean stagnant water around homes. Ringworm is not a worm at all but a fungal infection of the skin that thrives in warm, moist places.',
    }),
    sl('concept', 'Protozoan and helminth diseases', {
      b: 'Protozoans and parasitic worms (helminths) cause serious diseases.',
      v: table(['Disease', 'Pathogen', 'Main features', 'Spread'], [['Amoebiasis (amoebic dysentery)', 'Entamoeba histolytica (protozoan)', 'In the large intestine: constipation, abdominal pain and cramps, stools with excess mucus and blood clots', 'Contaminated food and water; houseflies carry the parasite'], ['Ascariasis', 'Ascaris (roundworm)', 'Internal bleeding, muscular pain, fever, anaemia, blockage of the intestinal passage', 'Eggs in faeces contaminate soil, water and plants; contaminated vegetables, fruits and water'], ['Filariasis (elephantiasis)', 'Wuchereria (W. bancrofti, W. malayi)', 'Live in the lymphatic vessels of the lower limbs; chronic inflammation and swelling; genital organs may be deformed', 'Bite of female mosquito vectors']], 'Table of amoebiasis, ascariasis and filariasis with pathogen, features and spread'),
      n: 'Amoebiasis is caused by a protozoan that lives in the large intestine; houseflies can carry it to food. Ascaris, a roundworm, spreads when its eggs from faeces contaminate soil and vegetables. Filarial worms live for years in lymph vessels of the legs, causing the huge swellings called elephantiasis; mosquitoes carry them from person to person.',
    }),
    sl('diagram', 'Malaria and the life cycle of Plasmodium', {
      b: '**Malaria** is caused by **Plasmodium** (P. vivax, P. malariae, P. falciparum; **P. falciparum** causes the most serious, malignant malaria). The parasite needs **two hosts**: humans and the **female Anopheles** mosquito.',
      v: V.plasmodium,
      n: 'An infected female Anopheles mosquito injects sporozoites with its bite. They multiply first in liver cells, then in red blood cells. When the red cells burst, they release a toxic substance called haemozoin, causing chills and high fever that recur every three to four days. Some parasites form gametocytes, which a mosquito takes up when it bites; fertilisation happens in the mosquito, and new sporozoites collect in its salivary glands.',
    }),
    sl('check', 'Quick check: Plasmodium', {
      b: 'In which host does fertilisation of Plasmodium gametes take place?',
      n: 'Quick check. Follow the gametocytes after they leave the human blood.',
      chk: 'plasmodium-mcq',
    }),
    sl('example', 'Worked example 1: linking pathogen, spread and prevention', {
      b: 'A district has outbreaks of typhoid, malaria and the common cold. For each, identify the type of pathogen, the route of spread and one targeted preventive step.',
      ul: [
        'Typhoid → **bacterium**; contaminated food and water → **safe drinking water and hygienic food handling**.',
        'Malaria → **protozoan**; female Anopheles mosquito → **remove stagnant water, mosquito nets, Gambusia fish in ponds**.',
        'Common cold → **virus**; droplets and contaminated objects → **cover coughs and sneezes, wash hands, avoid sharing cups**.',
        'Principle — prevention works best when it blocks the **specific route** of spread.',
      ],
      v: table(['Disease', 'Pathogen type', 'Route', 'Targeted prevention'], [['Typhoid', 'Bacterium', 'Food and water', 'Safe water, hygienic food'], ['Malaria', 'Protozoan', 'Mosquito vector', 'Vector control'], ['Common cold', 'Virus', 'Droplets, objects', 'Cough etiquette, hand washing']], 'Worked table linking three diseases to pathogen type, route of spread and targeted prevention'),
      n: 'Ask three questions for every disease: what causes it, how does it travel, and how can we block that route? Food and water diseases need clean water and hygiene. Vector-borne diseases need mosquito control. Droplet infections need cough etiquette and clean hands. Matching the measure to the route is what makes prevention efficient.',
    }),
    sl('concept', 'Preventing and controlling infectious diseases', {
      b: 'Prevention combines **personal hygiene**, **public hygiene** and **vector control**.',
      v: table(['Measure', 'Examples'], [['Personal hygiene', 'Clean body; safe drinking water, food, vegetables and fruits'], ['Public hygiene', 'Proper disposal of waste and excreta; periodic cleaning and disinfection of water reservoirs, pools, cesspools and tanks; standard practices in public catering'], ['Air-borne diseases', 'Avoid close contact with infected persons and their belongings'], ['Vector control (malaria, filariasis, dengue, chikungunya)', 'Avoid stagnant water around homes; clean household coolers regularly; use mosquito nets; introduce fish such as Gambusia that eat larvae; spray insecticides in ditches, drains and swamps; fit wire mesh on doors and windows']], 'Table of preventive measures for infectious diseases with examples'),
      n: 'Clean water, safe food and proper sanitation prevent typhoid, amoebiasis and ascariasis. For mosquito-borne diseases, the key is to stop mosquitoes breeding: do not let water stand in coolers, pots or tyres, use mosquito nets and screens, and stock ponds with Gambusia fish, which eat mosquito larvae. Vaccination and better medicines have also controlled many diseases, and smallpox has been eradicated.',
    }),
    sl('example', 'Worked example 2: does the fish work?', {
      b: `A village pond had about ${LARVAE.before} mosquito larvae per sample. Two months after Gambusia fish were introduced, the count fell to ${LARVAE.after}. By what percentage did the larvae decrease?`,
      ul: [
        r`Step 1 — Fall $= ${LARVAE.before} - ${LARVAE.after} = ${LARVAE.before - LARVAE.after}$.`,
        r`Step 2 — Percentage decrease $= \dfrac{${LARVAE.before - LARVAE.after}}{${LARVAE.before}} \times 100 = ${LARVAE.fall}$ percent.`,
        'Conclusion — biological control with larva-eating fish greatly reduces breeding of mosquitoes, without chemicals.',
      ],
      v: table(['', 'Larvae per sample'], [['Before Gambusia', String(LARVAE.before)], ['After two months', String(LARVAE.after)], ['Decrease', `${LARVAE.fall} percent`]], `Worked table: larvae fell from ${LARVAE.before} to ${LARVAE.after}, a ${LARVAE.fall} percent decrease`),
      n: 'The fall is four hundred and eight larvae. Dividing by the starting count and multiplying by one hundred gives eighty-five percent. Fewer larvae means fewer adult mosquitoes, and so fewer cases of malaria, filariasis and dengue. Using fish to eat larvae is an example of biological control.',
    }),
    sl('check', 'Quick check: vectors', {
      b: 'Which disease is spread by the bite of Aedes mosquitoes?',
      n: 'Quick check. Recall the mosquito linked with dengue and chikungunya.',
      chk: 'aedes-mcq',
    }),
    sl('check', 'Quick check: ringworm', {
      b: 'Judge the assertion and the reason about ringworm.',
      n: 'Quick check. What kind of organism causes ringworm, and where does it grow best?',
      chk: 'ringworm-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Health: complete physical, mental and social well-being; affected by genes, infections and lifestyle.',
        'Bacteria: typhoid (Salmonella typhi; Widal test), pneumonia (Streptococcus pneumoniae, Haemophilus influenzae).',
        'Viruses: common cold (rhinoviruses); dengue and chikungunya (Aedes). Fungi: ringworm (Microsporum, Trichophyton, Epidermophyton).',
        'Protozoans: malaria (Plasmodium; female Anopheles; haemozoin), amoebiasis (Entamoeba histolytica). Helminths: ascariasis (Ascaris), filariasis (Wuchereria).',
        'Prevention: personal and public hygiene, vector control (no stagnant water, nets, Gambusia, insecticides, wire mesh), vaccination.',
      ],
      v: table(['Pathogen group', 'Diseases'], [['Bacteria', 'Typhoid, pneumonia'], ['Viruses', 'Common cold, dengue, chikungunya'], ['Protozoans', 'Malaria, amoebiasis'], ['Helminths', 'Ascariasis, filariasis'], ['Fungi', 'Ringworm']], 'Summary table of pathogen groups and their diseases'),
      n: 'To recap: each infectious disease has a pathogen and a route of spread. Bacteria cause typhoid and pneumonia; viruses cause colds, dengue and chikungunya; protozoans cause malaria and amoebiasis; worms cause ascariasis and filariasis; fungi cause ringworm. Blocking the route, through hygiene and vector control, prevents most of them.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn **pathogen + symptom + spread** for each disease as a set.',
        'For malaria, name **haemozoin**, the **female Anopheles** and the **two hosts**.',
        'Typhoid is confirmed by the **Widal test**.',
        'Name **Gambusia** as a biological control of mosquito larvae.',
      ],
      n: 'Exam tips. Memorise each disease as a set of pathogen, symptoms and spread. For malaria, mention haemozoin and both hosts. Remember the Widal test for typhoid. And give Gambusia as an example of biological control.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Human Health and Disease — Part 2: Immunity and vaccines',
  goals: [
    'Distinguish innate and acquired immunity, and active and passive immunity',
    'Describe the structure of an antibody and the roles of B and T lymphocytes',
    'Explain primary and secondary immune responses and how vaccines work',
    'Explain allergies and autoimmunity and name the lymphoid organs',
  ],
  slides: [
    sl('title', 'Immunity', {
      b: 'Part 2 — how the body defends itself, and how vaccines prepare it in advance.',
      v: flow('LR', [['i', 'Innate immunity: barriers'], ['a', 'Acquired immunity: specific, with memory'], ['v', 'Vaccines train acquired immunity']], [['i', 'a'], ['a', 'v']], 'Flow from innate immunity to acquired immunity and vaccines'),
      n: 'We meet pathogens every day, yet we are usually healthy. That is because of immunity, the overall ability of the body to fight disease-causing organisms. Some defences are present from birth; others are learned after meeting a pathogen and remembered for years. Vaccines use that memory.',
    }),
    sl('concept', 'Innate immunity', {
      b: '**Innate immunity** is **non-specific** and present at **birth**. It consists of four kinds of barriers.',
      v: table(['Barrier', 'Examples'], [['Physical', 'Skin; mucus coating of the respiratory, gastrointestinal and urogenital tracts'], ['Physiological', 'Acid in the stomach, saliva in the mouth, tears from the eyes'], ['Cellular', 'Leucocytes: PMNL-neutrophils, monocytes and natural killer lymphocytes; macrophages, which engulf microbes'], ['Cytokine', 'Interferons secreted by virus-infected cells protect non-infected cells']], 'Table of the four barriers of innate immunity with examples'),
      n: 'Innate immunity is our first line of defence and treats all invaders the same way. Skin and mucus keep microbes out; stomach acid, saliva and tears kill or wash them away; white blood cells such as neutrophils and macrophages swallow them; and virus-infected cells release interferons that warn their neighbours.',
    }),
    sl('concept', 'Acquired immunity', {
      b: '**Acquired immunity** is **pathogen-specific** and has **memory**. The first encounter gives a low-intensity **primary response**; a later encounter with the same pathogen gives a highly intensified **secondary (anamnestic) response**.',
      v: table(['Cells', 'Role'], [['B-lymphocytes', 'Produce antibodies into the blood: humoral (antibody-mediated) immunity'], ['T-lymphocytes', 'Help B cells produce antibodies; carry out cell-mediated immunity (CMI), including graft rejection'], ['Memory cells', 'Remember the pathogen, giving a faster, stronger secondary response']], 'Table of the roles of B-lymphocytes, T-lymphocytes and memory cells'),
      n: 'Acquired immunity is like a trained army. B lymphocytes make proteins called antibodies that attack a particular pathogen. T lymphocytes help them and also attack infected cells directly. After the first fight, memory cells remain, so a second attack by the same pathogen is met quickly and strongly.',
    }),
    sl('diagram', 'Primary and secondary responses', {
      b: `After a second exposure, antibodies rise **faster** and much **higher** — in this model about ${RATIO} times the primary peak.`,
      v: V.response,
      n: 'The graph shows antibody levels over time. After the first exposure, the level rises slowly and stays low. After the second exposure to the same antigen, memory cells respond at once and the level rises quickly to a much higher peak. This is why a second infection with the same pathogen is often mild or unnoticed.',
    }),
    sl('diagram', 'Structure of an antibody', {
      b: 'Each antibody molecule has **four polypeptide chains**: **two heavy (H)** and **two light (L)** chains, hence **H₂L₂**. Types include **IgA, IgM, IgE and IgG**.',
      v: V.antibody,
      n: 'An antibody is shaped like the letter Y. Two long heavy chains and two short light chains are joined by disulfide bonds. The tips of the two arms are the antigen-binding sites, which fit a particular antigen like a lock and key. Different classes of antibodies, such as IgA, IgM, IgE and IgG, have different roles.',
    }),
    sl('example', 'Worked example 1: counting chains and comparing responses', {
      b: `(a) How many heavy and light chains are present in three antibody molecules? (b) In the model graph, the primary peak is about ${P1} units and the secondary peak about ${P2}. How many times larger is the secondary peak?`,
      ul: [
        r`(a) Each molecule is H₂L₂: heavy $= 2 \times 3 = ${CH.heavy}$, light $= 2 \times 3 = ${CH.light}$, total ${CH.total} chains.`,
        r`(b) Ratio $= \dfrac{${P2}}{${P1}} \approx ${RATIO}$.`,
        'Interpretation — memory cells make the secondary response several times stronger.',
      ],
      v: table(['Quantity', 'Value'], [['Heavy chains in 3 antibodies', String(CH.heavy)], ['Light chains in 3 antibodies', String(CH.light)], ['Secondary ÷ primary peak', `about ${RATIO}`]], `Worked table: ${CH.heavy} heavy and ${CH.light} light chains; secondary peak about ${RATIO} times the primary`),
      n: 'Each antibody has two heavy and two light chains, so three antibodies have six of each, twelve chains in all. For the graph, divide the secondary peak by the primary peak; the secondary response here is several times stronger. Real values vary, but the pattern is always the same: faster and stronger the second time.',
    }),
    sl('check', 'Quick check: antibody structure', {
      b: 'An antibody molecule is represented as',
      n: 'Quick check. Count the heavy and light chains.',
      chk: 'h2l2-mcq',
    }),
    sl('concept', 'Active and passive immunity', {
      b: 'Immunity can be built by the body itself or given ready-made.',
      v: table(['', 'Active immunity', 'Passive immunity'], [['How', 'Body makes its own antibodies after exposure to antigens (infection or vaccine)', 'Ready-made antibodies are given'], ['Speed', 'Slow to develop', 'Immediate'], ['Duration', 'Long-lasting (memory)', 'Short-lived'], ['Examples', 'Natural infection; vaccination', 'IgA in colostrum; antibodies passing through the placenta to the foetus; anti-tetanus serum; snake antivenom']], 'Table comparing active and passive immunity with examples'),
      n: 'Active immunity takes time to develop, but it lasts because memory cells form. Passive immunity works at once but fades, because borrowed antibodies are eventually broken down. A baby gets passive immunity from its mother, through the placenta and through colostrum. A person bitten by a snake needs ready-made antibodies quickly, so they get antivenom.',
    }),
    sl('concept', 'Vaccination and immunisation', {
      b: 'A **vaccine** contains **antigenic proteins** of a pathogen or **inactivated or weakened** pathogens. It triggers a primary response and **memory B and T cells**, so a later infection meets a fast secondary response. **Recombinant DNA** technology allows antigens to be made in bacteria or yeast, for example the **hepatitis B vaccine** produced in yeast.',
      v: flow('LR', [['v', 'Vaccine: weakened or inactivated pathogen, or its antigens'], ['p', 'Primary response'], ['m', 'Memory B and T cells'], ['i', 'Later infection: rapid, strong secondary response']], [['v', 'p'], ['p', 'm'], ['m', 'i']], 'Flow of how a vaccine leads to memory cells and a rapid response to later infection'),
      n: 'A vaccine is a safe rehearsal. It shows the immune system the pathogen’s antigens without causing the disease. The body makes antibodies and memory cells. When the real pathogen arrives, the memory cells recognise it and respond strongly before it can cause illness. Mass vaccination has controlled many deadly diseases and eradicated smallpox.',
    }),
    sl('check', 'Quick check: passive immunity', {
      b: 'Which is an example of passive immunity?',
      n: 'Quick check. Look for ready-made antibodies given from outside.',
      chk: 'passive-mcq',
    }),
    sl('concept', 'When immunity misfires: allergy and autoimmunity', {
      b: 'An **allergy** is an exaggerated response to certain antigens (**allergens**) such as dust mites, pollen and animal dander. **IgE** antibodies are produced; **mast cells** release chemicals such as **histamine and serotonin**. **Autoimmunity** is when the body attacks its own cells, as in **rheumatoid arthritis**.',
      v: table(['Condition', 'What happens', 'Treatment or example'], [['Allergy', 'IgE made against allergens; mast cells release histamine and serotonin; sneezing, watery eyes, running nose, difficulty in breathing', 'Anti-histamines, adrenalin and steroids reduce symptoms'], ['Autoimmunity', 'Immune system attacks self cells', 'Rheumatoid arthritis']], 'Table of allergy and autoimmunity with what happens and treatment or example'),
      n: 'In allergies, the immune system overreacts to harmless substances like pollen or dust mites. IgE antibodies trigger mast cells to release histamine, causing sneezing and watery eyes. Modern lifestyles may lower immunity and increase sensitivity to allergens. In autoimmune diseases, the body’s defences attack its own tissues, as in rheumatoid arthritis.',
    }),
    sl('concept', 'The immune system’s organs', {
      b: '**Lymphoid organs** are where lymphocytes originate, mature and multiply.',
      v: table(['Type', 'Organs', 'Role'], [['Primary', 'Bone marrow, thymus', 'Lymphocytes are formed and mature; antigen-sensitive cells develop'], ['Secondary', 'Spleen, lymph nodes, tonsils, Peyer’s patches of the small intestine, appendix', 'Lymphocytes meet antigens and multiply'], ['MALT', 'Mucosa-associated lymphoid tissue in the linings of the respiratory, digestive and urogenital tracts', 'About half the lymphoid tissue of the body']], 'Table of primary and secondary lymphoid organs and MALT with their roles'),
      n: 'Lymphocytes are born in the bone marrow; T cells mature in the thymus. They then move to secondary organs, such as the spleen, lymph nodes and tonsils, where they meet antigens and multiply. Lymph nodes trap microbes from the lymph. The thymus is large at birth and shrinks with age.',
    }),
    sl('example', 'Worked example 2: active or passive?', {
      b: 'Classify each as active or passive immunity, and natural or artificial.',
      ul: [
        'A child recovers from measles and does not get it again → **active, natural**.',
        'A girl receives the hepatitis B vaccine → **active, artificial**.',
        'A newborn gets antibodies through colostrum → **passive, natural**.',
        'An injured farmer receives anti-tetanus serum → **passive, artificial**.',
      ],
      v: table(['Case', 'Active or passive', 'Natural or artificial'], [['Measles infection', 'Active', 'Natural'], ['Hepatitis B vaccine', 'Active', 'Artificial'], ['Colostrum', 'Passive', 'Natural'], ['Anti-tetanus serum', 'Passive', 'Artificial']], 'Worked table classifying four cases of immunity'),
      n: 'Ask two questions. Did the body make its own antibodies? Then it is active; if they were supplied, passive. Did it happen through normal life events, or through a medical procedure? That decides natural or artificial. So recovering from measles is active and natural, while anti-tetanus serum is passive and artificial.',
    }),
    sl('check', 'Quick check: secondary response', {
      b: 'Judge the assertion and the reason about the secondary immune response.',
      n: 'Quick check. Which cells explain the faster response?',
      chk: 'memory-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Innate immunity: physical, physiological, cellular and cytokine (interferon) barriers.',
        'Acquired immunity: specific, with memory; primary and secondary (anamnestic) responses; B cells (humoral), T cells (cell-mediated).',
        'Antibody H₂L₂; IgA, IgM, IgE, IgG.',
        'Active (own antibodies, slow, lasting) vs passive (ready-made, quick, short). Vaccines create memory; hepatitis B vaccine from yeast.',
        'Allergy (IgE, mast cells, histamine), autoimmunity (rheumatoid arthritis); lymphoid organs: primary (bone marrow, thymus), secondary (spleen, lymph nodes, tonsils, Peyer’s patches, appendix); MALT.',
      ],
      v: table(['Immunity', 'Key feature'], [['Innate', 'Non-specific, from birth'], ['Acquired', 'Specific, with memory'], ['Active', 'Body makes antibodies'], ['Passive', 'Antibodies given']], 'Summary table of types of immunity'),
      n: 'To recap: innate immunity gives general protection from birth; acquired immunity is specific and remembers. Antibodies are Y-shaped proteins of four chains made by B cells. Vaccines train the immune system in advance, while passive immunity gives instant but temporary help. Sometimes the system overreacts, causing allergies, or attacks the body itself.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw and label an **antibody** (H₂L₂, antigen-binding sites).',
        'Give **examples of each innate barrier**.',
        'Contrast **active and passive** immunity with examples.',
        'Name **IgE, mast cells, histamine** for allergy.',
      ],
      n: 'Exam tips. Practise drawing the antibody with its chains and binding sites. Learn one example for each innate barrier. Contrast active and passive immunity clearly. And for allergies, name IgE, mast cells and histamine.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Human Health and Disease — Part 3: AIDS, cancer, and drugs and alcohol',
  goals: [
    'Explain how HIV is transmitted and how it causes AIDS, and how AIDS is prevented',
    'Explain how cancer arises, its causes, detection and treatment',
    'Describe the effects of drug and alcohol abuse, especially in adolescence',
    'Suggest ways to prevent drug and alcohol abuse',
  ],
  slides: [
    sl('title', 'AIDS, cancer, drugs and alcohol', {
      b: 'Part 3 — two major diseases and a major social health problem, with the science needed to prevent them.',
      v: flow('LR', [['h', 'HIV and AIDS'], ['c', 'Cancer'], ['d', 'Drug and alcohol abuse'], ['p', 'Prevention through knowledge and support']], [['h', 'p'], ['c', 'p'], ['d', 'p']], 'Flow showing AIDS, cancer and drug abuse all linked to prevention through knowledge and support'),
      n: 'In this part we study AIDS and cancer, two diseases that are major causes of death, and the misuse of drugs and alcohol, which harms many young people. In each case, scientific understanding helps us prevent harm and support those affected with care rather than blame.',
    }),
    sl('concept', 'HIV and its spread', {
      b: '**AIDS** (Acquired Immuno Deficiency Syndrome), first reported in **1981**, is caused by **HIV**, a **retrovirus** with an RNA genome. There is usually a gap of **5–10 years** between infection and symptoms.',
      v: table(['HIV spreads by', 'HIV does not spread by'], [['Sexual contact with an infected person', 'Touching, hugging or shaking hands'], ['Transfusion of contaminated blood or blood products', 'Sharing food, water or a classroom'], ['Sharing infected needles', 'Mosquito bites'], ['Infected mother to child through the placenta', 'Coughing or sneezing']], 'Table of ways HIV does and does not spread'),
      n: 'HIV spreads only through certain body fluids: by sexual contact, infected blood, shared needles, and from an infected mother to her baby. It does not spread by everyday contact. People at higher risk include those with multiple sexual partners, drug users who share needles, and people who need repeated blood transfusions. Infected people must not be discriminated against.',
    }),
    sl('concept', 'How HIV causes AIDS', {
      b: 'HIV enters **macrophages**, where its RNA is copied into viral DNA by **reverse transcriptase**. The viral DNA joins the host DNA, so infected cells produce new viruses: the macrophage becomes an **HIV factory**. HIV then enters **helper T-lymphocytes**, multiplies, and destroys them.',
      v: flow('TB', [['e', 'HIV enters a macrophage'], ['r', 'Reverse transcriptase: viral RNA → viral DNA'], ['i', 'Viral DNA joins host DNA; virus particles made'], ['t', 'HIV attacks helper T-lymphocytes'], ['d', 'Helper T-cell count falls'], ['o', 'Immunodeficiency: opportunistic infections']], [['e', 'r'], ['r', 'i'], ['i', 't'], ['t', 'd'], ['d', 'o']], 'Flow of how HIV infects macrophages and helper T cells, leading to immunodeficiency and opportunistic infections'),
      n: 'As helper T cells are destroyed one after another, the immune system weakens. The person suffers repeated fevers, diarrhoea and weight loss, and cannot fight infections that a healthy body controls easily, such as Mycobacterium, other viruses, fungi and parasites like Toxoplasma. These are called opportunistic infections. HIV is diagnosed by the ELISA test, and antiretroviral drugs can prolong life but cannot cure it.',
    }),
    sl('example', 'Worked example 1: helper T-cell count', {
      b: `A person’s helper T-cell count falls from ${TH.before} to ${TH.after} cells per microlitre of blood over several years of untreated HIV infection. By what percentage did it fall, and what does this mean?`,
      ul: [
        r`Step 1 — Fall $= ${TH.before} - ${TH.after} = ${TH.before - TH.after}$.`,
        r`Step 2 — Percentage fall $= \dfrac{${TH.before - TH.after}}{${TH.before}} \times 100 \approx ${TH.fall}$ percent.`,
        'Step 3 — With fewer helper T cells, B cells make fewer antibodies and cell-mediated immunity weakens: the risk of opportunistic infections rises.',
      ],
      v: table(['', 'Helper T cells per microlitre'], [['Earlier', String(TH.before)], ['Later', String(TH.after)], ['Fall', `about ${TH.fall} percent`]], `Worked table: helper T cells fell from ${TH.before} to ${TH.after}, about ${TH.fall} percent`),
      n: 'The count dropped by five hundred and fifty cells, which is about sixty-one percent of the starting value. Helper T cells coordinate the whole acquired immune response, so losing most of them leaves the body open to infections. Antiretroviral treatment slows this fall, which is why early testing matters.',
    }),
    sl('concept', 'Preventing AIDS', {
      b: 'Since AIDS has **no cure**, **prevention** is the best option. In India, the **National AIDS Control Organisation (NACO)** and other organisations educate people.',
      v: table(['Measure', 'Purpose'], [['Ensure use of disposable needles and syringes', 'Block blood-borne spread'], ['Screen blood in blood banks for HIV', 'Safe transfusions'], ['Free distribution of condoms; safe sexual practices', 'Block sexual spread'], ['Control drug abuse', 'Reduce needle sharing'], ['Regular check-ups for susceptible groups', 'Early detection'], ['Awareness and acceptance', 'Remove stigma so people seek testing and treatment']], 'Table of measures for preventing AIDS with their purposes'),
      n: 'Prevention works by blocking each route: safe needles, screened blood, condoms and safe practices, and control of drug abuse. Equally important is ending stigma. If people fear being shunned, they avoid testing. Treating HIV-positive people with dignity helps everyone, because it encourages early testing and treatment.',
    }),
    sl('check', 'Quick check: HIV', {
      b: 'Which cells does HIV mainly destroy, leading to immunodeficiency?',
      n: 'Quick check. Which T cells coordinate the immune response?',
      chk: 'th-mcq',
    }),
    sl('concept', 'Cancer: cells out of control', {
      b: 'Normal cells show **contact inhibition**: contact with other cells stops their division. **Cancer cells lose this property**, divide without control and form **tumours**.',
      v: table(['', 'Benign tumour', 'Malignant tumour'], [['Growth', 'Stays confined to its original location', 'Grows rapidly and invades surrounding tissues'], ['Spread', 'Does not spread', 'Spreads to distant sites through blood: metastasis'], ['Harm', 'Little damage', 'Most feared; can be fatal']], 'Table comparing benign and malignant tumours'),
      n: 'Normally, our cells divide only as needed and stop when they touch neighbours. Cancer cells ignore these signals. Benign tumours stay in one place. Malignant tumours are made of neoplastic cells that invade nearby tissues, starve normal cells of nutrients, and can travel through the blood to form new tumours far away. This spread, called metastasis, makes cancer so dangerous.',
    }),
    sl('concept', 'Causes, detection and treatment of cancer', {
      b: '**Carcinogens** transform normal cells into cancer cells. Genes called **cellular oncogenes (proto-oncogenes)** can become activated and cause cancer.',
      v: table(['Aspect', 'Details'], [['Physical carcinogens', 'Ionising radiations (X-rays, gamma rays) and non-ionising radiation (UV)'], ['Chemical carcinogens', 'Tobacco smoke (main cause of lung cancer) and other chemicals'], ['Biological', 'Oncogenic viruses carrying viral oncogenes'], ['Detection', 'Biopsy and histopathology; blood and bone-marrow tests for leukaemia; X-rays, CT and MRI; antibodies against cancer-specific antigens; molecular tests for inherited susceptibility'], ['Treatment', 'Surgery, radiation therapy, chemotherapy (side effects such as hair loss, anaemia), immunotherapy with biological response modifiers such as α-interferon']], 'Table of the causes, detection and treatment of cancer'),
      n: 'Cancer can be triggered by radiation, by chemicals such as those in tobacco smoke, and by some viruses. Early detection saves lives: doctors use biopsies, scans like CT and MRI, blood tests and molecular tests. Treatment usually combines surgery, radiation and drugs, and some therapies boost the patient’s own immune system to destroy the tumour.',
    }),
    sl('check', 'Quick check: metastasis', {
      b: 'Judge the assertion and the reason about tumours.',
      n: 'Quick check. What lets cancer cells form tumours far from the original one?',
      chk: 'metastasis-ar',
    }),
    sl('concept', 'Commonly abused drugs', {
      b: 'Drugs are often obtained from plants or fungi. Their misuse harms the body and mind.',
      v: table(['Drug group', 'Source', 'Effect'], [['Opioids, such as heroin (smack, diacetylmorphine)', 'Morphine from the latex of the poppy, Papaver somniferum', 'Bind opioid receptors in the brain and gut; heroin is a depressant that slows body functions'], ['Cannabinoids (marijuana, hashish, charas, ganja)', 'Inflorescences of Cannabis sativa', 'Affect the cardiovascular system'], ['Coca alkaloid, cocaine', 'Coca plant, Erythroxylum coca', 'Interferes with dopamine transport; stimulation and false euphoria; excessive use causes hallucinations'], ['Other hallucinogens', 'Datura, Atropa belladonna', 'Hallucinations']], 'Table of commonly abused drugs with their sources and effects'),
      n: 'Many drugs come from plants. Heroin is made from morphine, which comes from the poppy. Marijuana and similar drugs come from Cannabis. Cocaine comes from the coca plant and interferes with a brain chemical called dopamine. Some medicines, such as barbiturates, amphetamines and benzodiazepines, are also misused. All of them change how the brain works and can be very harmful.',
    }),
    sl('concept', 'Tobacco and alcohol', {
      b: '**Tobacco** contains the alkaloid **nicotine**, which stimulates the adrenal gland to release **adrenaline and nor-adrenaline**, raising blood pressure and heart rate. **Alcohol** damages the nervous system and liver.',
      v: table(['Habit', 'Harm'], [['Smoking', 'Cancers of the lung, urinary bladder and throat; bronchitis, emphysema, coronary heart disease, gastric ulcer; carbon monoxide reduces oxygen carried by haemoglobin'], ['Chewing tobacco', 'Oral cancer'], ['Chronic alcohol use', 'Damage to the nervous system and liver (cirrhosis); harm to the foetus during pregnancy']], 'Table of harms of smoking, chewing tobacco and chronic alcohol use'),
      n: 'Tobacco smoke carries nicotine and carbon monoxide. Nicotine raises blood pressure and heart rate, and carbon monoxide reduces the oxygen the blood can carry. Smoking causes cancers and lung and heart diseases. Alcohol, taken regularly, damages the brain and liver. Many habits that start in the teenage years become hard to break later.',
    }),
    sl('concept', 'Adolescence, addiction and dependence', {
      b: '**Adolescence** (about **12–18 years**) is a vulnerable period. Curiosity, the need for adventure and excitement, experimentation, stress, peer pressure and media influence can lead to first use. Repeated use can cause **addiction** (psychological attachment) and **dependence**, with a **withdrawal syndrome** (anxiety, shakiness, nausea, sweating) when use stops.',
      v: table(['Warning signs of misuse', 'Harms'], [['Drop in academic performance; absence from school', 'Reckless behaviour, vandalism, violence'], ['Loss of interest in hobbies and hygiene', 'Overdose can cause coma and death (respiratory or heart failure, brain haemorrhage)'], ['Withdrawal from friends and family; mood changes', 'Sharing needles spreads HIV and hepatitis B'], ['Changes in sleep and eating', 'Anabolic steroids misused in sport cause hormonal and organ damage']], 'Table of warning signs of drug misuse and its harms'),
      n: 'Adolescents may try drugs or alcohol out of curiosity, to fit in with friends, or to escape stress. The brain soon starts to depend on them, and stopping causes unpleasant withdrawal symptoms. Families and teachers can watch for warning signs, such as falling grades and withdrawal from friends, and offer support early.',
    }),
    sl('example', 'Worked example 2: reading a survey', {
      b: `In a survey of ${SMOKE.teens} students, ${SMOKE.tried} said they had tried smoking because friends pressured them. What percentage is this, and what does it suggest for prevention?`,
      ul: [
        r`Step 1 — Percentage $= \dfrac{${SMOKE.tried}}{${SMOKE.teens}} \times 100 = ${SMOKE.pct}$ percent.`,
        'Step 2 — Nearly one in three cited peer pressure.',
        'Conclusion — programmes should build skills to say no, involve peers and parents, and offer counselling, not just give information.',
      ],
      v: table(['', 'Number'], [['Students surveyed', String(SMOKE.teens)], ['Tried smoking due to peer pressure', String(SMOKE.tried)], ['Percentage', `${SMOKE.pct} percent`]], `Worked table: ${SMOKE.tried} of ${SMOKE.teens} students, ${SMOKE.pct} percent`),
      n: 'Eighteen out of sixty is thirty percent. If peer pressure is such a common reason, prevention should focus on helping young people resist it: confidence, support from friends and family, and easy access to counselling. Information alone is not enough.',
    }),
    sl('concept', 'Prevention and control of drug and alcohol abuse', {
      b: 'Prevention is better than cure, and it starts at home and school.',
      v: table(['Measure', 'How it helps'], [['Avoid undue peer pressure', 'Respect each child’s choices and pace; do not push them beyond their abilities'], ['Education and counselling', 'Teach how to face problems, stress and failure; channel energy into sports, music, reading and other activities'], ['Seek help from parents and peers', 'Trusted adults and friends can guide and support'], ['Look for danger signs', 'Parents and teachers notice early and act'], ['Seek professional and medical help', 'Psychologists, psychiatrists, de-addiction and rehabilitation programmes help recovery']], 'Table of measures to prevent and control drug and alcohol abuse'),
      n: 'Many problems can be prevented when young people feel supported. Parents and teachers should avoid putting undue pressure on children, encourage healthy activities, and talk openly. Anyone struggling with drugs or alcohol can recover with professional help from counsellors, doctors and de-addiction programmes. Asking for help is a sign of strength.',
    }),
    sl('check', 'Quick check: nicotine', {
      b: 'How does nicotine raise blood pressure and heart rate?',
      n: 'Quick check. Which gland does nicotine stimulate?',
      chk: 'nicotine-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'AIDS: HIV (retrovirus); spread by sexual contact, blood, needles, mother to child; enters macrophages (reverse transcriptase), destroys helper T cells; opportunistic infections; ELISA; antiretroviral drugs; prevention via NACO measures and ending stigma.',
        'Cancer: loss of contact inhibition; benign vs malignant (metastasis); carcinogens (radiation, chemicals, oncogenic viruses), proto-oncogenes; detection (biopsy, CT, MRI, molecular tests); treatment (surgery, radiation, chemotherapy, immunotherapy with α-interferon).',
        'Drugs: opioids (heroin from morphine, poppy), cannabinoids, cocaine; tobacco (nicotine, CO), alcohol (liver cirrhosis).',
        'Adolescence (12–18 years): curiosity, peer pressure; addiction, dependence, withdrawal; prevention through support, education, counselling, professional help.',
      ],
      v: table(['Topic', 'Key word'], [['AIDS', 'Helper T cells destroyed'], ['Cancer', 'Loss of contact inhibition; metastasis'], ['Drug abuse', 'Addiction, dependence, withdrawal']], 'Summary table of key words for AIDS, cancer and drug abuse'),
      n: 'To recap: HIV destroys helper T cells, causing AIDS; prevention and kindness are our best tools. Cancer arises when cells lose control of division; early detection and combined treatment save lives. Drugs, tobacco and alcohol harm the body and mind, especially in adolescence, and support from family, friends and professionals is the best prevention.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **sequence of HIV infection** in order: macrophage → reverse transcriptase → HIV factory → helper T cells.',
        'Contrast **benign and malignant** tumours; define **metastasis**.',
        'Give **three types of carcinogens** with examples.',
        'For drug-abuse questions, include **causes, effects and prevention**.',
      ],
      n: 'Exam tips. Learn the HIV sequence in order. Contrast benign and malignant tumours and define metastasis. Give examples for physical, chemical and biological carcinogens. And in drug-abuse answers, cover causes, effects and prevention.',
    }),
  ],
});
