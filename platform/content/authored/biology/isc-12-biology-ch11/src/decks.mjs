// ISC 12 Biology ch11 Human Health and Disease: Infections, Cancer and Allergies — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { PLASMODIUM, FEVER, CONTACT, TUMOUR } from './svgs.mjs';
import { titre, bouts, doublings, cellsAfter, pct } from './calc.mjs';

export const V = {
  plasmodium: svgV(PLASMODIUM, 'Life cycle of Plasmodium in a human and a female Anopheles mosquito'),
  fever: svgV(FEVER, 'Temperature chart of vivax malaria with fever bouts every 48 hours'),
  contact: svgV(CONTACT, 'Normal cells forming one layer and cancer cells piling up in culture'),
  tumour: svgV(TUMOUR, 'A benign tumour in a capsule and a malignant tumour spreading through a blood vessel'),
};

// ---------------------------------------------------------------- computed numbers
export const DIL = [20, 40, 80, 160, 320, 640];
export const AGG = [true, true, true, true, false, false];
export const TITRE = titre(DIL, AGG);
export const BOUTS = bouts(150);
export const NEXT_BOUT = BOUTS[BOUTS.length - 1] + 48;
export const DOUBLE = doublings(1e9);
export const BIOPSY = { n: 240, malignant: 36 };
export const BIOPSY_PCT = pct(BIOPSY.malignant, BIOPSY.n);

export const deck1 = deck({
  part: 1,
  title: 'Human Health and Disease — Part 1: Infectious diseases',
  goals: [
    'Give the agent, transmission, symptoms and prevention of common viral and bacterial diseases',
    'Explain the Widal test for typhoid',
    'Describe amoebiasis, malaria with the life cycle of Plasmodium, ascariasis, filariasis and ringworm',
  ],
  slides: [
    sl('title', 'Infectious diseases', {
      b: 'Part 1 — diseases caused by viruses, bacteria, protozoa, worms and fungi, and how to prevent them.',
      v: flow('LR', [['p', 'Pathogen'], ['t', 'Transmission'], ['s', 'Symptoms'], ['c', 'Prevention and control']], [['p', 't'], ['t', 's'], ['s', 'c']], 'Flow from pathogen to transmission to symptoms to prevention'),
      n: 'Health is a state of complete physical, mental and social well-being. Infectious diseases are caused by pathogens that pass from one person to another, directly or through air, water, food or vectors. For each disease we ask: what causes it, how it spreads, what it does, and how to prevent it.',
    }),
    sl('concept', 'Viral diseases', {
      b: 'Viruses multiply only inside host cells; antibiotics do not act on them.',
      v: table(['Disease', 'Agent and spread', 'Main symptoms'], [['Common cold', 'Rhinoviruses; droplets, contaminated objects', 'Infects nose and airways, not lungs: congestion, sore throat, cough, headache for 3–7 days'], ['Chikungunya', 'Chikungunya virus; bite of Aedes mosquito', 'Fever with severe, lasting joint pain, rash'], ['Dengue', 'Dengue virus; day-biting Aedes aegypti', 'High fever, severe headache, pain behind the eyes, joint and muscle pain, rash, fall in platelets']], 'Table of viral diseases with agents, spread and symptoms'),
      n: 'The common cold stays in the nose and throat. Chikungunya and dengue are spread by the same day-biting Aedes mosquito, which breeds in clean, stagnant water in coolers, tyres and pots. Dengue can lower the platelet count dangerously.',
    }),
    sl('concept', 'Bacterial diseases', {
      b: 'Many bacterial diseases can be treated with antibiotics and prevented by vaccines and hygiene.',
      v: table(['Disease', 'Agent and spread', 'Main symptoms'], [['Typhoid', 'Salmonella typhi; contaminated food and water', 'Sustained high fever (39–40 °C), weakness, stomach pain, constipation, headache; intestinal perforation in severe cases'], ['Pneumonia', 'Streptococcus pneumoniae, Haemophilus influenzae; droplets, shared glasses', 'Alveoli fill with fluid; fever, chills, cough; lips and nails may turn bluish'], ['Diphtheria', 'Corynebacterium diphtheriae; droplets', 'Sore throat, fever, a tough membrane in the throat; toxin may damage the heart'], ['Plague', 'Yersinia pestis; bite of the rat flea', 'Fever, chills, swollen painful lymph nodes (buboes)']], 'Table of bacterial diseases with agents, spread and symptoms'),
      n: 'Typhoid spreads through food and water contaminated by faeces. Pneumonia and diphtheria spread through droplets in the air. Plague is carried by fleas from rats. Vaccines such as the D P T vaccine protect children against diphtheria.',
    }),
    sl('concept', 'Typhoid and the Widal test', {
      b: 'Typhoid is confirmed by the **Widal test**: the patient’s serum is diluted step by step and mixed with killed **Salmonella** antigens. If the serum has **antibodies**, the bacteria **clump (agglutinate)**. The **titre** is the highest dilution that still agglutinates.',
      v: table(['Point', 'Detail'], [['Principle', 'Antigen–antibody agglutination'], ['Positive result', 'Agglutination at a high dilution (often 1 : 160 or more)'], ['Carrier', 'A healthy person who sheds the bacteria (for example, “Typhoid Mary”, a cook)'], ['Prevention', 'Safe water, hygiene, vaccine']], 'Table about typhoid and the Widal test'),
      n: 'A high titre means the serum contains many antibodies against the typhoid bacterium, which is evidence of infection. Mary Mallon, a cook, was a healthy carrier who spread typhoid for years through the food she prepared.',
    }),
    sl('check', 'Quick check: typhoid', {
      b: 'Which test confirms typhoid fever?',
      n: 'Quick check. The test is named after Fernand Widal.',
      chk: 'typhoid-mcq',
    }),
    sl('example', 'Worked example 1: reading a Widal test', {
      b: `A patient’s serum was tested at dilutions of 1 : ${DIL.join(', 1 : ')}. Agglutination was seen up to 1 : ${TITRE} and not beyond. What is the titre, and what does it suggest?`,
      v: table(['Dilution', 'Agglutination'], DIL.map((d, i) => [`1 : ${d}`, AGG[i] ? 'Yes' : 'No']), `Worked table: titre 1 : ${TITRE}`),
      ul: [`The **titre** is the highest dilution showing agglutination: **1 : ${TITRE}**.`, 'A titre this high suggests **active typhoid infection**, to be confirmed with symptoms and a blood culture.'],
      n: 'Read down the table and stop at the last dilution that still clumps. The serum still had enough antibody at one in one hundred and sixty, which is high enough to suggest typhoid.',
    }),
    sl('concept', 'Amoebiasis', {
      b: '**Amoebiasis (amoebic dysentery)** is caused by the protozoan **Entamoeba histolytica**, a parasite of the **large intestine**.',
      v: table(['Feature', 'Detail'], [['Spread', 'Food and water contaminated by faeces; houseflies act as mechanical carriers'], ['Symptoms', 'Constipation, abdominal pain and cramps, stools with excess mucus and blood clots'], ['Prevention', 'Clean drinking water, covered food, control of flies, proper disposal of faeces']], 'Table about amoebiasis'),
      n: 'Houseflies do not themselves get the disease; they carry cysts on their bodies from faeces to food. Clean water, covered food and sanitation break the chain.',
    }),
    sl('diagram', 'Malaria and the life cycle of Plasmodium', {
      b: 'Malaria is caused by **Plasmodium** (P. vivax, P. malariae and the dangerous **P. falciparum**) and spread by the **female Anopheles** mosquito. The parasite needs **two hosts**: asexual stages in humans, sexual stages in the mosquito.',
      v: V.plasmodium,
      n: 'Sporozoites injected by the mosquito multiply first in liver cells, then in red blood cells. When the red cells burst they release a toxin, haemozoin, which causes chill and high fever. Some parasites become gametocytes; a mosquito that bites the patient takes them up, and fertilisation happens in its gut.',
    }),
    sl('diagram', 'The malaria fever cycle', {
      b: `In **vivax malaria**, red blood cells burst together every **48 hours**, so bouts of **chill and high fever** recur at hours ${BOUTS.join(', ')} and so on.`,
      v: V.fever,
      n: 'Between bouts the temperature returns almost to normal. Each spike matches a fresh wave of red blood cells bursting and releasing haemozoin. That regular pattern helps doctors recognise malaria.',
    }),
    sl('example', 'Worked example 2: predicting the next bout', {
      b: `A patient with vivax malaria had fever bouts at hours ${BOUTS.join(', ')} after the first one. When is the next bout expected, and why?`,
      ul: [
        r`Interval $= ${BOUTS[1]} - ${BOUTS[0]} = 48$ hours.`,
        r`Next bout $= ${BOUTS[BOUTS.length - 1]} + 48 = ${NEXT_BOUT}$ hours.`,
        'Each bout marks the **synchronised bursting of red blood cells** at the end of each 48-hour cycle of multiplication.',
      ],
      v: table(['Bout', 'Hour'], [...BOUTS, NEXT_BOUT].map((h, i) => [String(i + 1), String(h)]), `Worked table: next bout at hour ${NEXT_BOUT}`),
      n: 'The bouts are forty eight hours apart, so the next one should come forty eight hours after the last. Antimalarial drugs that stop the parasites multiplying in red cells break this cycle.',
    }),
    sl('concept', 'Worm and fungal diseases', {
      b: 'Parasitic worms (helminths) and fungi also cause common diseases.',
      v: table(['Disease', 'Agent and spread', 'Main effects'], [['Ascariasis', 'Roundworm Ascaris lumbricoides; eggs in soil, water and vegetables contaminated by faeces', 'Internal bleeding, muscle pain, fever, anaemia, blockage of the intestine'], ['Filariasis', 'Wuchereria bancrofti and W. malayi; bite of female Culex mosquito', 'Chronic inflammation of lymph vessels of the legs: elephantiasis'], ['Ringworm', 'Fungi Microsporum, Trichophyton, Epidermophyton; contact, towels, combs, soil', 'Dry, scaly, itchy patches on skin, nails and scalp, especially in warm, moist folds']], 'Table of worm and fungal diseases'),
      n: 'Ascaris eggs pass out in faeces and are swallowed with dirty food or water. Filarial worms block lymph vessels so the legs swell enormously. Ringworm is not a worm at all, but a fungus that thrives in warm, moist skin.',
    }),
    sl('concept', 'Prevention and control', {
      b: 'Most infectious diseases can be prevented by breaking the chain of transmission.',
      v: table(['Measure', 'Examples'], [['Personal hygiene', 'Clean body, safe water and food, washing hands'], ['Public hygiene', 'Proper disposal of waste and excreta, clean water supply'], ['Vector control', 'Draining stagnant water, mosquito nets, introducing Gambusia fish that eat larvae'], ['Vaccination', 'Vaccines against typhoid, diphtheria, pneumonia and others'], ['Treatment', 'Antibiotics for bacteria, antimalarial drugs']], 'Table of prevention and control measures'),
      n: 'Air-borne diseases need less crowding and covered coughs. Water-borne and food-borne diseases need clean water and sanitation. Vector-borne diseases need us to remove breeding places, for instance by draining standing water or releasing Gambusia fish.',
    }),
    sl('check', 'Quick check: vectors', {
      b: 'Judge the assertion and the reason about mosquitoes.',
      n: 'Quick check. Which mosquito spreads malaria, and which spreads dengue?',
      chk: 'vector-ar',
    }),
    sl('check', 'Quick check: haemozoin', {
      b: 'What causes the chill and high fever in malaria?',
      n: 'Quick check. It is released when red blood cells burst.',
      chk: 'haemozoin-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Viral: common cold (rhinoviruses), chikungunya and dengue (Aedes).',
        'Bacterial: typhoid (Salmonella typhi, Widal test), pneumonia, diphtheria, plague (rat flea).',
        'Protozoan: amoebiasis (Entamoeba histolytica, houseflies), malaria (Plasmodium, female Anopheles, haemozoin).',
        'Helminths: ascariasis (Ascaris), filariasis (Wuchereria, Culex); fungal: ringworm.',
        'Prevention: hygiene, vector control, vaccines, treatment.',
      ],
      v: table(['Vector', 'Disease'], [['Female Anopheles', 'Malaria'], ['Aedes', 'Dengue, chikungunya'], ['Female Culex', 'Filariasis'], ['Rat flea', 'Plague'], ['Housefly (mechanical)', 'Amoebiasis']], 'Summary table of vectors and diseases'),
      n: 'To recap: each disease has its own agent and route of spread. Knowing the route tells us how to break it, through hygiene, vector control, vaccines and treatment.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'For each disease, give **agent, mode of spread, symptoms and prevention**.',
        'Name the **vector** precisely: female Anopheles, Aedes, female Culex, rat flea.',
        'Describe the **Plasmodium life cycle** in both hosts, with **haemozoin**.',
        'Explain the **Widal test** with agglutination and titre.',
      ],
      n: 'Exam tips. Give the agent, spread, symptoms and prevention for each disease. Name each vector exactly. Trace the malaria parasite through both hosts. And explain the Widal test in terms of clumping and titre.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Human Health and Disease — Part 2: Cancer and allergies',
  goals: [
    'Distinguish benign and malignant tumours and describe the properties of cancer cells',
    'List the causes of cancer and its methods of diagnosis and treatment',
    'Define allergy and allergen, and state the general symptoms of allergy',
  ],
  slides: [
    sl('title', 'Cancer and allergies', {
      b: 'Part 2 — when cell division escapes control, and when the immune system over-reacts.',
      v: flow('LR', [['n', 'Normal regulated division'], ['t', 'Transformation by carcinogens'], ['c', 'Cancer cells'], ['m', 'Tumour and metastasis']], [['n', 't'], ['t', 'c'], ['c', 'm']], 'Flow from normal cells to transformation to cancer cells to tumour and metastasis'),
      n: 'In our bodies, cell growth and division are tightly controlled. Cancer begins when a cell escapes these controls and divides without limit. Allergy is a different problem: the immune system reacts too strongly to harmless substances.',
    }),
    sl('diagram', 'Contact inhibition', {
      b: 'Normal cells show **contact inhibition**: when they touch their neighbours, they **stop dividing**. **Cancer cells** have **lost** this property, so they keep dividing and pile up into a mass of cells, a **tumour**.',
      v: V.contact,
      n: 'In a culture dish, normal cells form a single neat layer and then stop. Cancer cells ignore their neighbours and heap up on top of each other. Loss of contact inhibition is one of the key properties of cancer cells.',
    }),
    sl('diagram', 'Benign and malignant tumours', {
      b: '**Benign tumours** stay confined to their original site, often inside a capsule, and do little damage. **Malignant tumours** are masses of **neoplastic** cells that grow rapidly, **invade** nearby tissue, starve normal cells, and spread through blood to distant sites — **metastasis**, the most feared property.',
      v: V.tumour,
      n: 'A benign tumour pushes on its surroundings but stays put. A malignant tumour sends cells into blood vessels, and they settle elsewhere to start new tumours. Metastasis is what makes cancer so dangerous.',
    }),
    sl('concept', 'Causes of cancer', {
      b: 'Agents that transform normal cells into cancer cells are **carcinogens**. They act by damaging DNA and activating **proto-oncogenes** (cellular oncogenes) into **oncogenes**.',
      v: table(['Type', 'Examples'], [['Physical', 'Ionising radiation (X-rays, gamma rays); non-ionising ultraviolet light'], ['Chemical', 'Tobacco smoke (major cause of lung cancer), some industrial chemicals'], ['Biological', 'Oncogenic viruses carrying viral oncogenes']], 'Table of carcinogens by type'),
      n: 'Ionising radiation and chemicals in tobacco smoke damage DNA directly. Some viruses carry their own cancer-causing genes. Normal cells also contain proto-oncogenes, which can turn into oncogenes when mutated.',
    }),
    sl('example', 'Worked example 1: how many divisions make a tumour?', {
      b: 'A tumour of about one billion cells (10⁹) is roughly one centimetre across. If it began from one cell that doubles at each division, how many rounds of division were needed?',
      ul: [
        r`After $k$ doublings there are $2^{k}$ cells.`,
        r`$2^{29} = ${cellsAfter(29)}$ is just short of $10^{9}$, and $2^{30} = ${cellsAfter(30)}$ exceeds it.`,
        `So about **${DOUBLE}** rounds of division were needed.`,
      ],
      v: table(['Doublings', 'Cells'], [[String(10), String(cellsAfter(10))], [String(20), String(cellsAfter(20))], [String(DOUBLE), String(cellsAfter(DOUBLE))]], `Worked table: about ${DOUBLE} doublings give 10 to the power 9 cells`),
      n: 'Doubling is powerful. Ten doublings give about a thousand cells, twenty about a million, and thirty about a billion. A lump that can just be felt may already have gone through thirty rounds of uncontrolled division.',
    }),
    sl('concept', 'Diagnosis of cancer', {
      b: 'Early detection allows successful treatment of many cancers.',
      v: table(['Method', 'What it shows'], [['Biopsy and histopathology', 'A piece of suspected tissue is stained and examined under a microscope'], ['Blood and bone-marrow tests', 'Increased cell counts in leukaemia'], ['Radiography, CT and MRI', 'X-rays, computed tomography (3-D X-ray images) and magnetic resonance imaging (strong magnetic fields) locate internal tumours'], ['Antibodies against cancer-specific antigens', 'Detect particular cancers'], ['Molecular biology', 'Genes that make a person likely to develop cancer']], 'Table of methods of cancer diagnosis'),
      n: 'A biopsy, looking at the tissue itself, is the surest test. Imaging methods find tumours deep inside the body without surgery, and molecular tests can identify people at higher risk before any tumour appears.',
    }),
    sl('concept', 'Treatment of cancer', {
      b: 'Treatment usually combines several methods.',
      v: table(['Method', 'How it works'], [['Surgery', 'Removes the tumour'], ['Radiation therapy', 'Kills tumour cells with lethal radiation, sparing surrounding tissue as far as possible'], ['Chemotherapy', 'Drugs kill dividing cells; side effects include hair loss and anaemia'], ['Immunotherapy', 'Biological response modifiers such as α-interferon activate the immune system against the tumour']], 'Table of methods of cancer treatment'),
      n: 'Chemotherapy drugs attack rapidly dividing cells, so they also affect hair follicles and bone marrow, which explains hair loss and anaemia. Tumour cells often avoid the immune system, so interferon is given to help the body destroy them.',
    }),
    sl('check', 'Quick check: contact inhibition', {
      b: 'Which property do cancer cells lose?',
      n: 'Quick check. What stops normal cells dividing when they meet their neighbours?',
      chk: 'contact-mcq',
    }),
    sl('example', 'Worked example 2: biopsy results', {
      b: `A hospital laboratory examined ${BIOPSY.n} biopsies from lumps in one month; ${BIOPSY.malignant} showed malignant cells. What percentage were malignant, and what were the rest likely to be?`,
      ul: [
        r`Malignant $= \dfrac{${BIOPSY.malignant}}{${BIOPSY.n}} \times 100 = ${BIOPSY_PCT}$ percent.`,
        `The other **${Math.round((100 - BIOPSY_PCT) * 10) / 10} percent** were not cancerous — many lumps are **benign tumours** or other swellings.`,
      ],
      v: table(['Result', 'Number', 'Percent'], [['Malignant', String(BIOPSY.malignant), String(BIOPSY_PCT)], ['Not malignant', String(BIOPSY.n - BIOPSY.malignant), String(Math.round((100 - BIOPSY_PCT) * 10) / 10)]], `Worked table: ${BIOPSY_PCT} percent malignant`),
      n: 'Most lumps examined turned out not to be cancer, which is why a biopsy is needed before deciding on treatment. Histopathology tells benign from malignant tissue by the appearance of the cells.',
    }),
    sl('concept', 'Allergies', {
      b: 'An **allergy** is the **exaggerated response** of the immune system to certain harmless substances in the environment, called **allergens** — such as **dust mites, pollen and animal dander**. The body makes **IgE** antibodies; **mast cells** release **histamine and serotonin**.',
      v: flow('LR', [['a', 'Allergen (pollen, mites)'], ['i', 'IgE antibodies made'], ['m', 'Mast cells release histamine and serotonin'], ['s', 'Symptoms']], [['a', 'i'], ['i', 'm'], ['m', 's']], 'Flow of an allergic reaction from allergen to IgE to mast cells to symptoms'),
      n: 'Symptoms include sneezing, watery eyes, a running nose and difficulty in breathing. Anti-histamines, adrenaline and steroids reduce them. Children in very clean modern homes may be more prone to allergies, perhaps because their immune systems meet fewer challenges early in life.',
    }),
    sl('check', 'Quick check: metastasis', {
      b: 'Judge the assertion and the reason about malignant tumours.',
      n: 'Quick check. How do cancer cells reach distant organs?',
      chk: 'metastasis-ar',
    }),
    sl('check', 'Quick check: allergens', {
      b: 'Which of these is an allergen?',
      n: 'Quick check. Think of a harmless substance that some people react to strongly.',
      chk: 'allergen-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Cancer cells lose contact inhibition and divide without control.',
        'Benign tumours stay put; malignant tumours invade and metastasise.',
        'Carcinogens: physical (radiation), chemical (tobacco), biological (oncogenic viruses); proto-oncogenes become oncogenes.',
        'Diagnosis: biopsy and histopathology, blood tests, X-ray, CT, MRI, antibodies, molecular tests. Treatment: surgery, radiation, chemotherapy, immunotherapy (α-interferon).',
        'Allergy: exaggerated response to allergens; IgE, histamine, serotonin; sneezing, watery eyes, breathing difficulty.',
      ],
      v: table(['Term', 'Meaning'], [['Contact inhibition', 'Normal cells stop dividing on contact'], ['Metastasis', 'Spread of cancer cells to new sites'], ['Allergen', 'Substance that triggers an allergy']], 'Summary table of key terms'),
      n: 'To recap: cancer is uncontrolled cell division, most dangerous when malignant cells metastasise. It has physical, chemical and biological causes, and is diagnosed and treated in several ways. Allergy is an over-reaction of the immune system to harmless allergens.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Contrast **benign** and **malignant** tumours in at least three points.',
        'Name **contact inhibition** and **metastasis** as properties of cancer cells.',
        'Give **one example** of each kind of carcinogen.',
        'For allergy, name **IgE**, **mast cells** and **histamine**.',
      ],
      n: 'Exam tips. Contrast benign and malignant tumours point by point. Use the terms contact inhibition and metastasis. Give an example of each kind of carcinogen. And for allergy, mention IgE, mast cells and histamine.',
    }),
  ],
});
