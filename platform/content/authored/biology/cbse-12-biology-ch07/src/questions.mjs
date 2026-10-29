// ch07 Human Health and Disease — question bank. AR keys planned: a a a d c b.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { pct, pctChange, chains } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 common diseases
add('plasmodium-mcq', mcq({
  stem: 'In which host does fertilisation of Plasmodium gametes take place?',
  right: 'In the female Anopheles mosquito, in its stomach',
  wrong: ['In the human liver', 'In human red blood cells', 'In the male Anopheles mosquito'],
  sol: 'Gametocytes taken up by a female Anopheles fertilise and develop in the mosquito’s stomach wall — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('aedes-mcq', mcq({
  stem: 'Which disease is spread by the bite of Aedes mosquitoes?',
  right: 'Dengue',
  wrong: ['Typhoid', 'Amoebiasis', 'Ringworm'],
  sol: 'Dengue (and chikungunya) viruses are spread by Aedes mosquitoes — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ringworm-ar', ar({
  a: 'Ringworm infections are common in moist parts of the body such as the groin and between the toes.',
  r: 'Ringworm is caused by fungi that grow well in heat and moisture.',
  key: 'a',
  sol: 'Both are true; the fungi (Microsporum, Trichophyton, Epidermophyton) thrive in warm, moist conditions, which explains where infections occur — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('typhoid-mcq', mcq({
  stem: 'After drinking water from a contaminated source, a man has a sustained fever of 39–40 °C, weakness, stomach pain, constipation and loss of appetite for several days. A Widal test is positive. What is the disease, and what causes it?',
  right: 'Typhoid, caused by Salmonella typhi',
  wrong: ['Pneumonia, caused by Streptococcus pneumoniae', 'Malaria, caused by Plasmodium', 'Amoebiasis, caused by Entamoeba histolytica'],
  sol: 'These symptoms, the water-borne route and a positive Widal test indicate typhoid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pneumonia-mcq', mcq({
  stem: 'An elderly patient has fever, chills and cough, and in severe stages her lips and fingernails turn grey to bluish. The alveoli of her lungs are filled with fluid. Which disease is this?',
  right: 'Pneumonia',
  wrong: ['Common cold', 'Typhoid', 'Filariasis'],
  sol: 'Bacteria such as Streptococcus pneumoniae infect the alveoli, which fill with fluid; bluish lips and nails show poor oxygenation — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cold-mcq', mcq({
  stem: 'A student has a blocked, running nose, a sore throat, hoarseness and a mild cough for five days. A chest X-ray shows healthy lungs. What is the most likely disease and its cause?',
  right: 'Common cold, caused by rhinoviruses that infect the nose and respiratory passage but not the lungs',
  wrong: ['Pneumonia, caused by bacteria filling the alveoli', 'Typhoid, caused by Salmonella typhi', 'Filariasis, caused by Wuchereria'],
  sol: 'Nose and throat symptoms with clear lungs, lasting a few days, fit the common cold (rhinoviruses) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('amoeb-mcq', mcq({
  stem: 'In a hostel, cooked food is often left uncovered and many houseflies are seen near it. Several students develop abdominal pain and stools with mucus and blood clots. What is the most likely disease?',
  right: 'Amoebiasis, with houseflies as mechanical carriers',
  wrong: ['Malaria, spread by houseflies', 'Ringworm, spread by food', 'Common cold, spread by flies'],
  sol: 'Entamoeba histolytica causes amoebic dysentery; houseflies carry the parasite from faeces to food — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('fever-mcq', mcq({
  stem: 'A patient from a mosquito-infested area has chills followed by high fever that returns every three days. A blood smear shows parasites inside red blood cells. What is the diagnosis?',
  right: 'Malaria, caused by Plasmodium',
  wrong: ['Typhoid, caused by Salmonella typhi', 'Dengue, caused by a virus', 'Amoebiasis, caused by Entamoeba histolytica'],
  sol: 'Periodic chill and fever (haemozoin released as RBCs burst) and parasites in RBCs indicate malaria — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ascaris-tf', tf({
  stem: 'Ascariasis is spread by the bite of mosquitoes.',
  key: 'f',
  sol: 'False. Ascaris eggs passed in faeces contaminate soil, water and vegetables; people are infected by contaminated food and water.',
  d: 1, c: 'recall', t: [1],
}));
add('filaria-fill', fill({
  stem: 'Elephantiasis (filariasis) is caused by filarial worms of the genus ______.',
  acc: [['Wuchereria']],
  sol: 'Wuchereria (W. bancrofti, W. malayi).',
  d: 1, c: 'recall', t: [1],
}));
add('route-match', match({
  stem: 'Match each disease (column I) with how it spreads (column II).',
  pairs: [
    ['Malaria', 'Bite of a female Anopheles mosquito'],
    ['Dengue', 'Bite of an Aedes mosquito'],
    ['Typhoid', 'Contaminated food and water'],
    ['Common cold', 'Droplets and contaminated objects'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Malaria — female Anopheles; dengue — Aedes; typhoid — contaminated food and water; common cold — droplets and objects.',
  d: 2, c: 'understanding', t: [1],
}));
add('falciparum-mcq', mcq({
  stem: 'Which species of Plasmodium causes malignant malaria, the most serious form?',
  right: 'Plasmodium falciparum',
  wrong: ['Plasmodium vivax', 'Plasmodium malariae', 'Entamoeba histolytica'],
  sol: 'P. falciparum causes malignant malaria, which can be fatal — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cooler-mcq', mcq({
  stem: 'Dengue cases rise every monsoon in a housing colony where many homes use desert coolers. Which single step would most directly reduce the cases?',
  right: 'Emptying and cleaning coolers regularly and removing stagnant water around homes',
  wrong: ['Boiling drinking water', 'Washing hands before meals', 'Covering food to keep houseflies away'],
  sol: 'Aedes mosquitoes breed in clean stagnant water such as cooler tanks; removing breeding sites breaks the chain — option (@K). The other steps target food- and water-borne diseases.',
  d: 3, c: 'application', t: [1],
}));
add('carrier-ar', ar({
  a: 'A healthy-looking person can spread typhoid to others.',
  r: 'Some people carry Salmonella typhi and pass it on without showing symptoms themselves.',
  key: 'a',
  sol: 'Both are true; healthy carriers (like the cook known as Typhoid Mary) explain how a healthy-looking person spreads typhoid — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
{
  const fall = -pctChange(600, 150);
  add('gambusia-num', num({
    stem: 'After Gambusia fish were released into a pond, the number of mosquito larvae per sample fell from 600 to 150. What was the percentage decrease?',
    value: fall, unit: '%',
    sol: r`$\dfrac{600 - 150}{600} \times 100 = \dfrac{450}{600} \times 100 = ${fall}$ percent.`,
    scheme: [[`${fall}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 75 || 'value');
}
add('malaria-short', short({
  marks: 3,
  stem: 'Describe the stages of the life cycle of Plasmodium in the human body and explain why a malaria patient gets chill and high fever at regular intervals.',
  model: 'An infected female Anopheles injects **sporozoites**. They first **multiply in liver cells**, then **attack red blood cells**, where they multiply further and **burst the RBCs**. Some form **gametocytes** in the RBCs, which a mosquito can take up.\n\nWhen the RBCs burst, a toxic substance, **haemozoin**, is released; this causes **chill and high fever recurring every 3–4 days**, as each cycle of multiplication in RBCs ends.',
  sol: 'Liver → RBCs → rupture and haemozoin → gametocytes.',
  scheme: [['Sporozoites multiply in liver cells', 1], ['Attack and burst RBCs; gametocytes form', 1], ['Haemozoin causes recurring chill and fever', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('prevention-short', short({
  marks: 3,
  stem: 'A village has many cases of typhoid and malaria. Suggest three public-health measures for the village and explain how each helps.',
  model: '1. **Safe water supply**: chlorinating or boiling drinking water and cleaning wells and tanks blocks the **water-borne** spread of typhoid.\n\n2. **Sanitation**: proper disposal of sewage and waste and hygienic food handling prevent contamination of food and water.\n\n3. **Mosquito control**: removing stagnant water, using mosquito nets and wire mesh, releasing **Gambusia** fish and spraying insecticides in drains and swamps reduces **Anopheles** mosquitoes that spread malaria.',
  sol: 'Match measures to the routes of the two diseases.',
  scheme: [['Safe water with reason', 1], ['Sanitation and food hygiene with reason', 1], ['Mosquito control with reason', 1]],
  d: 3, c: 'application', t: [1],
}));
add('diseases-short', short({
  marks: 2,
  stem: 'Distinguish between typhoid and pneumonia on the basis of the organ first affected and the mode of spread.',
  model: '**Typhoid** (Salmonella typhi) first infects the **small intestine** and spreads to other organs through blood; it spreads through **contaminated food and water**. **Pneumonia** (Streptococcus pneumoniae, Haemophilus influenzae) infects the **alveoli of the lungs**; it spreads by **droplets or aerosols** and shared glasses or utensils.',
  sol: 'Organ and route for each.',
  scheme: [['Organs affected', 1], ['Modes of spread', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('ringworm-short', short({
  marks: 2,
  stem: 'A student who often borrows a friend’s towel develops dry, scaly, very itchy patches between his toes. Identify the likely infection and its cause, and suggest how to prevent it.',
  model: 'It is probably **ringworm**, a **fungal** infection (Microsporum, Trichophyton or Epidermophyton) spread by **sharing towels**, clothes or combs; heat and moisture help it grow. He should **not share towels**, keep the feet **clean and dry**, and see a doctor for treatment.',
  sol: 'Fungal infection; prevention by hygiene.',
  scheme: [['Ringworm, caused by fungi, spread by sharing', 1], ['Prevention: no sharing, keep dry, treatment', 1]],
  d: 2, c: 'application', t: [1],
}));
add('plasmodium-long', long({
  stem: 'Describe the life cycle of Plasmodium in its two hosts with the help of a labelled flow diagram. Suggest two measures to control malaria based on this life cycle.',
  model: '**In humans.** When an infected female Anopheles mosquito bites, it injects sporozoites, the infective stage. They multiply in the liver cells, then attack red blood cells, where they multiply further and cause the RBCs to burst. The rupture releases haemozoin, which causes chill and high fever recurring every three to four days. Some parasites develop into gametocytes in the RBCs.\n\n**In the mosquito.** When a female Anopheles bites an infected person, it takes up gametocytes with the blood. Fertilisation and development take place in the mosquito’s stomach, and the sporozoites formed move to its salivary glands, ready to be injected at the next bite.\n\n**Diagram:** sporozoites → liver cells → RBCs (haemozoin, fever) → gametocytes → mosquito stomach (fertilisation) → salivary glands → sporozoites.\n\n**Control.** Break the cycle at the mosquito: remove stagnant water, introduce Gambusia fish to eat larvae, spray insecticides in breeding areas, and use mosquito nets and wire mesh to prevent bites; treat patients early so that fewer gametocytes reach mosquitoes.',
  sol: 'Two hosts, stages in order, control based on the cycle.',
  scheme: [['Stages in humans', 1.5], ['Stages in the mosquito', 1.5], ['Flow diagram', 1], ['Two control measures linked to the cycle', 1]],
  wl: [80, 190],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 immunity
add('h2l2-mcq', mcq({
  stem: 'An antibody molecule is represented as',
  right: 'H₂L₂',
  wrong: ['H₄L₂', 'HL', 'H₂L₄'],
  sol: 'Each antibody has two heavy and two light polypeptide chains — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('passive-mcq', mcq({
  stem: 'Which is an example of passive immunity?',
  right: 'A newborn receiving IgA antibodies through colostrum',
  wrong: ['A child becoming immune after recovering from measles', 'A girl becoming immune after the hepatitis B vaccine', 'An adult becoming immune after chickenpox'],
  sol: 'Ready-made antibodies from the mother give passive immunity; the others are active — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('memory-ar', ar({
  a: 'A second infection by the same pathogen produces a faster and stronger immune response than the first.',
  r: 'Memory B and T cells formed during the primary response recognise the pathogen quickly.',
  key: 'a',
  sol: 'Both are true; memory cells explain the anamnestic (secondary) response — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('barrier-mcq', mcq({
  stem: 'Acid in the stomach, saliva in the mouth and tears from the eyes are examples of which barrier of innate immunity?',
  right: 'Physiological barriers',
  wrong: ['Physical barriers', 'Cellular barriers', 'Cytokine barriers'],
  sol: 'These secretions prevent microbial growth: physiological barriers. Skin and mucus are physical; leucocytes cellular; interferons cytokine — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('interferon-mcq', mcq({
  stem: 'Virus-infected cells secrete proteins that protect non-infected cells from further viral infection. These proteins are',
  right: 'interferons',
  wrong: ['antibodies', 'histamines', 'antivenoms'],
  sol: 'Interferons form the cytokine barrier of innate immunity — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('graft-mcq', mcq({
  stem: 'A patient’s body rejects a kidney received from an unrelated donor. Which part of the immune system is mainly responsible, and how do doctors reduce the risk?',
  right: 'Cell-mediated immunity by T-lymphocytes; tissue and blood-group matching and immunosuppressant drugs',
  wrong: ['Humoral immunity by IgE; antihistamines', 'Physical barriers of the skin; antibiotics', 'Interferons; vaccination before surgery'],
  sol: 'Graft rejection is due to cell-mediated immunity; matching tissues and blood groups and lifelong immunosuppressants reduce it — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('antivenom-mcq', mcq({
  stem: 'A farmer bitten by a venomous snake is given antivenom in hospital. Why is this treatment used rather than a vaccine?',
  right: 'Antivenom gives ready-made antibodies that act immediately (passive immunity); a vaccine would take too long.',
  wrong: ['Antivenom makes the farmer produce memory cells for life.', 'Vaccines cannot be given to adults.', 'Antivenom destroys the farmer’s helper T cells.'],
  sol: 'In an emergency, ready-made antibodies (passive immunity) neutralise the venom at once; active immunity from a vaccine develops slowly — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('tonsil-mcq', mcq({
  stem: 'During a throat infection, a child’s tonsils become swollen. What is the best explanation?',
  right: 'Tonsils are secondary lymphoid organs where lymphocytes meet antigens and multiply.',
  wrong: ['Tonsils are where all lymphocytes are first produced.', 'Tonsils store red blood cells.', 'Tonsils make interferons only.'],
  sol: 'Secondary lymphoid organs such as tonsils are sites where lymphocytes interact with antigens and proliferate, so they enlarge during infection — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('colostrum-tf', tf({
  stem: 'Colostrum gives the newborn active immunity.',
  key: 'f',
  sol: 'False. Colostrum supplies ready-made antibodies (IgA), so it gives passive immunity.',
  d: 2, c: 'understanding', t: [2],
}));
add('allergy-mcq', mcq({
  stem: 'Every spring, when pollen is abundant, a student suffers from sneezing, watery eyes and a running nose. Which explanation is correct?',
  right: 'Her IgE antibodies react to pollen, and mast cells release histamine; anti-histamines reduce the symptoms.',
  wrong: ['She has a viral cold each spring, treated with antibiotics.', 'Her immune system cannot make any antibodies.', 'Pollen destroys her helper T cells.'],
  sol: 'An allergy is an exaggerated response to allergens; IgE and mast-cell histamine cause the symptoms — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('hepb-mcq', mcq({
  stem: 'The hepatitis B vaccine is produced using recombinant DNA technology in',
  right: 'yeast',
  wrong: ['human blood', 'chicken eggs only', 'mosquitoes'],
  sol: 'Recombinant DNA technology allows the antigen to be produced in yeast — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
{
  const c = chains(5);
  add('chains-num', num({
    stem: 'How many polypeptide chains in total are present in five antibody molecules?',
    value: c.total,
    sol: r`Each antibody is H₂L₂, with 4 chains, so $5 \times 4 = ${c.total}$ chains.`,
    scheme: [[`${c.total}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 20 || 'value');
}
add('lymphoid-match', match({
  stem: 'Match each organ (column I) with its role in immunity (column II).',
  pairs: [
    ['Bone marrow', 'Main site where lymphocytes are produced'],
    ['Thymus', 'Site where T-lymphocytes mature'],
    ['Lymph node', 'Traps micro-organisms and antigens carried in lymph'],
    ['Peyer’s patches', 'Lymphoid tissue in the lining of the small intestine'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Bone marrow → lymphocyte production; thymus → T-cell maturation; lymph node → traps antigens in lymph; Peyer’s patches → intestinal lymphoid tissue.',
  d: 2, c: 'understanding', t: [2],
}));
add('autoimmune-fill', fill({
  stem: 'Rheumatoid arthritis, in which the immune system attacks the body’s own cells, is an example of an ______ disease.',
  acc: [['autoimmune', 'auto-immune']],
  sol: 'Autoimmune.',
  d: 1, c: 'recall', t: [2],
}));
add('vaccine-ar', ar({
  a: 'Vaccination protects a person against future infection by a pathogen.',
  r: 'Vaccines contain ready-made antibodies against the pathogen.',
  key: 'c',
  sol: 'A is true. R is false: vaccines contain antigens (weakened or inactivated pathogens or their proteins), which make the body produce antibodies and memory cells — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('immunity-short', short({
  marks: 3,
  stem: 'Give three differences between innate and acquired immunity.',
  model: '1. **Specificity:** innate immunity is **non-specific**; acquired immunity is **specific** to a pathogen.\n\n2. **Origin:** innate immunity is present **at birth**; acquired immunity develops **after exposure** to antigens during life.\n\n3. **Memory:** innate immunity has **no memory**; acquired immunity has **memory**, giving a stronger secondary response. (Also: innate uses barriers such as skin, acid, phagocytes and interferons; acquired uses B and T lymphocytes.)',
  sol: 'Specificity, timing, memory, mechanisms.',
  scheme: [['Specificity', 1], ['Present at birth vs acquired', 1], ['Memory', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('vaccine-short', short({
  marks: 3,
  stem: 'Explain the principle of vaccination and how recombinant DNA technology has helped vaccine production.',
  model: 'A vaccine contains **antigenic proteins** of a pathogen or **inactivated or weakened** pathogens. Introduced into the body, it triggers a **primary response** and produces **memory B and T cells**. When the real pathogen later infects, the memory cells recognise it and produce a rapid, **massive secondary response**, preventing disease.\n\n**Recombinant DNA technology** lets the antigen be produced in **bacteria or yeast** on a large scale, safely and cheaply, for example the **hepatitis B vaccine** made in yeast.',
  sol: 'Antigens → memory cells → fast response; rDNA production.',
  scheme: [['Vaccine contents', 1], ['Memory cells and secondary response', 1], ['rDNA example: hepatitis B in yeast', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('active-short', short({
  marks: 2,
  stem: 'A farmer injured by a rusty nail is given anti-tetanus serum, while his daughter receives a routine tetanus vaccine. Explain the type of immunity each receives and why each is appropriate.',
  model: 'The farmer gets **passive immunity**: ready-made antibodies act **immediately**, which he needs after the injury, though protection is short-lived. The daughter gets **active immunity**: her body makes its own antibodies and **memory cells**, which takes time but gives **long-lasting** protection.',
  sol: 'Passive for immediate need; active for lasting protection.',
  scheme: [['Farmer: passive, immediate', 1], ['Daughter: active, slow but lasting', 1]],
  d: 3, c: 'application', t: [2],
}));
add('allergy-short', short({
  marks: 2,
  stem: 'Explain what happens in the body during an allergic reaction, and name two kinds of drugs used to reduce its symptoms.',
  model: 'An allergy is an **exaggerated response** to allergens such as pollen or dust mites. **IgE** antibodies are produced, and **mast cells** release chemicals such as **histamine and serotonin**, causing sneezing, watery eyes, running nose and difficulty in breathing. **Anti-histamines, adrenalin and steroids** reduce the symptoms.',
  sol: 'IgE, mast cells, histamine; drugs.',
  scheme: [['IgE and mast-cell chemicals', 1], ['Two drugs', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('immunity-long', long({
  stem: 'Describe the barriers of innate immunity, the roles of B- and T-lymphocytes in acquired immunity, and the structure of an antibody with a labelled diagram.',
  model: '**Innate immunity** is non-specific and present at birth. Its barriers are physical (skin; mucus of the respiratory, gastrointestinal and urogenital tracts), physiological (stomach acid, saliva, tears), cellular (PMNL-neutrophils, monocytes, natural killer lymphocytes and macrophages, which engulf microbes) and cytokine (interferons from virus-infected cells, which protect other cells).\n\n**Acquired immunity** is pathogen-specific and has memory. B-lymphocytes produce antibodies into the blood, giving humoral immunity. T-lymphocytes help B cells to produce antibodies and carry out cell-mediated immunity, which also causes graft rejection. Memory cells formed in the primary response give a faster, stronger secondary response.\n\n**Antibody (diagram).** A Y-shaped molecule of four polypeptide chains, two heavy and two light (H₂L₂), joined by disulfide bonds; the tips of the arms are antigen-binding sites. Classes include IgA, IgM, IgE and IgG.',
  sol: 'Four barriers; B and T roles; H₂L₂ diagram.',
  scheme: [['Four innate barriers with examples', 2], ['B cells: humoral; T cells: help and cell-mediated', 1], ['Memory and secondary response', 0.5], ['Labelled antibody diagram (H₂L₂)', 1.5]],
  wl: [80, 190],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 AIDS and cancer
add('th-mcq', mcq({
  stem: 'Which cells does HIV mainly destroy, leading to immunodeficiency?',
  right: 'Helper T-lymphocytes',
  wrong: ['Red blood cells', 'B-lymphocytes only', 'Platelets'],
  sol: 'After multiplying in macrophages, HIV enters and destroys helper T-lymphocytes — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('metastasis-ar', ar({
  a: 'Benign tumours spread through the blood to form new tumours at distant sites.',
  r: 'Cells of malignant tumours can spread through the blood to form new tumours at distant sites.',
  key: 'd',
  sol: 'A is false: benign tumours stay confined to their original location. R is true: this spread (metastasis) is a feature of malignant tumours — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('hiv-route-mcq', mcq({
  stem: 'Which of these carries NO risk of HIV transmission?',
  right: 'Sharing a meal and a classroom with an HIV-positive person',
  wrong: ['Sharing an injection needle with an infected person', 'Receiving untested blood', 'Unprotected sexual contact with an infected person'],
  sol: 'HIV spreads through sexual contact, blood and needles, and from mother to child — not through casual contact — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('rt-mcq', mcq({
  stem: 'A drug blocks the enzyme reverse transcriptase. Which step of HIV infection does it stop?',
  right: 'It copies the viral RNA into DNA, which joins the host cell’s DNA.',
  wrong: ['It destroys the host cell’s DNA.', 'It makes antibodies against HIV.', 'It converts host DNA into viral RNA directly.'],
  sol: 'HIV is a retrovirus: reverse transcriptase makes viral DNA from its RNA genome, which is incorporated into host DNA; blocking it stops this step — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('elisa-mcq', mcq({
  stem: 'Which test is widely used to diagnose HIV infection?',
  right: 'ELISA',
  wrong: ['Widal test', 'Biopsy', 'MRI'],
  sol: 'ELISA detects HIV infection; the Widal test is for typhoid — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('carcinogen-mcq', mcq({
  stem: 'Long exposure to strong sunlight increases the risk of skin cancer. Into which category of carcinogen does ultraviolet radiation fall?',
  right: 'Physical carcinogen (non-ionising radiation)',
  wrong: ['Chemical carcinogen', 'Biological carcinogen (oncogenic virus)', 'It is not a carcinogen'],
  sol: 'Radiations — ionising (X-rays, gamma rays) and non-ionising (UV) — are physical carcinogens — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('biopsy-mcq', mcq({
  stem: 'In cancer detection, a biopsy involves',
  right: 'taking a piece of suspected tissue and examining thin stained sections under a microscope',
  wrong: ['injecting α-interferon into the tumour', 'counting helper T cells in the blood', 'treating the tumour with radiation'],
  sol: 'A biopsy with histopathological study examines the suspected tissue — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('scan-mcq', mcq({
  stem: 'A doctor wants to find out, without surgery, whether a patient’s lung tumour has spread to other organs. Which method is most suitable?',
  right: 'Imaging with CT or MRI scans',
  wrong: ['The Widal test', 'An ELISA test for HIV', 'Counting antibodies after a vaccine'],
  sol: 'CT and MRI give detailed images of internal organs and can show tumours that have spread — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('contact-tf', tf({
  stem: 'Normal cells show contact inhibition, which cancer cells have lost.',
  key: 't',
  sol: 'True. Contact with other cells stops normal cells dividing; cancer cells ignore this signal.',
  d: 1, c: 'recall', t: [3],
}));
{
  const fall = -pctChange(800, 300);
  add('th-num', num({
    stem: 'In an untreated HIV-positive person, the helper T-cell count falls from 800 to 300 cells per microlitre of blood. What is the percentage fall, to one decimal place?',
    value: fall, tol: 0.05, unit: '%',
    sol: r`$\dfrac{800 - 300}{800} \times 100 = \dfrac{500}{800} \times 100 = ${fall}$ percent.`,
    scheme: [[`${fall}%`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 62.5 || 'value');
}
add('hiv-short', short({
  marks: 3,
  stem: 'Explain, step by step, how HIV causes immunodeficiency in an infected person.',
  model: '1. HIV, a retrovirus, enters **macrophages**; its **reverse transcriptase** copies the viral RNA into **viral DNA**, which is **incorporated into the host DNA**. The macrophage keeps producing viruses (an **HIV factory**).\n\n2. The viruses enter **helper T-lymphocytes**, replicate and produce progeny that attack more helper T cells, whose number **steadily falls**.\n\n3. Without helper T cells, the immune response weakens (**immunodeficiency**), and the person suffers **opportunistic infections** by Mycobacterium, viruses, fungi and parasites such as Toxoplasma.',
  sol: 'Macrophage → helper T cells → immunodeficiency.',
  scheme: [['Infection of macrophages and reverse transcription', 1], ['Destruction of helper T cells', 1], ['Immunodeficiency and opportunistic infections', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cancer-short', short({
  marks: 3,
  stem: 'Name the three kinds of carcinogens with one example each, and state two methods used to detect cancer.',
  model: '**Physical:** ionising radiation such as **X-rays or gamma rays**, or non-ionising **UV**. **Chemical:** substances in **tobacco smoke**. **Biological:** **oncogenic viruses** carrying viral oncogenes.\n\n**Detection:** **biopsy and histopathology** of suspected tissue; **CT or MRI** scans (also X-rays, blood and bone-marrow tests, and antibodies against cancer-specific antigens).',
  sol: 'Three carcinogen types and two detection methods.',
  scheme: [['Physical and chemical carcinogens', 1], ['Biological carcinogen', 1], ['Two detection methods', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('benign-short', short({
  marks: 2,
  stem: 'Distinguish between benign and malignant tumours.',
  model: '**Benign** tumours remain **confined** to their original location, do not spread and cause **little damage**. **Malignant** tumours are masses of neoplastic cells that **grow rapidly, invade** surrounding tissues and **spread to distant sites** through blood (**metastasis**), so they are far more dangerous.',
  sol: 'Confined vs invasive and metastatic.',
  scheme: [['Benign: confined, little damage', 1], ['Malignant: invasive, metastasis', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cancer-long', long({
  stem: 'Explain how normal cells become cancerous, and describe the methods used to detect and treat cancer.',
  model: '**Transformation.** Normal cells show contact inhibition: contact with neighbouring cells stops their division. Cancer cells lose this property and divide uncontrollably, forming tumours. Benign tumours stay confined; malignant tumours invade tissues and spread through blood (metastasis). Carcinogens cause the change: physical (X-rays, gamma rays, UV), chemical (tobacco smoke) and biological (oncogenic viruses). Cellular oncogenes (proto-oncogenes) in normal cells can be activated under certain conditions and cause cancer.\n\n**Detection.** Biopsy and histopathological study of the suspected tissue; blood and bone-marrow tests for leukaemia; radiography (X-rays), CT and MRI to locate tumours; antibodies against cancer-specific antigens; molecular techniques to detect genes for inherited susceptibility.\n\n**Treatment.** Surgery to remove the tumour; radiation therapy to kill tumour cells while sparing normal tissue as far as possible; chemotherapy drugs, which have side effects such as hair loss and anaemia; and immunotherapy with biological response modifiers such as α-interferon, which help the immune system destroy the tumour. Most cancers are treated by a combination.',
  sol: 'Loss of contact inhibition and carcinogens; detection; treatment.',
  scheme: [['Loss of contact inhibition; benign vs malignant', 1], ['Carcinogens and oncogenes', 1], ['Detection methods', 1.5], ['Treatment methods', 1.5]],
  wl: [80, 200],
  d: 3, c: 'understanding', t: [3],
}));
add('aids-long', long({
  stem: 'A school considers excluding a student who is HIV-positive, saying it will protect the other students. Evaluate this proposal using what you know about HIV transmission, and suggest what the school should do instead.',
  model: '**How HIV spreads.** HIV is transmitted by sexual contact with an infected person, transfusion of contaminated blood or blood products, sharing infected needles, and from an infected mother to her child. It is not spread by touching, hugging, sharing food or water, classrooms, toilets or sports, or by mosquito bites.\n\n**Evaluation.** Excluding the student would not protect anyone, because ordinary school activities carry no risk of transmission. It would harm the student’s education and health, spread fear and stigma, and discourage others from getting tested, which makes the epidemic harder to control.\n\n**What the school should do.** Keep the student’s status confidential; educate students and staff about the real routes of transmission; follow standard first-aid hygiene, such as using gloves when handling blood, which protects everyone regardless of status; and support awareness programmes like those of NACO.\n\n**Conclusion.** The proposal is not justified; inclusion with education is both safe and fair.',
  sol: 'Routes; risk in school; harms of exclusion; better measures; verdict.',
  scheme: [['Correct routes of transmission', 1], ['No risk from ordinary school contact', 1], ['Harms of exclusion and stigma', 1], ['Constructive measures', 1], ['Clear verdict', 1]],
  wl: [80, 190],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- t04 drugs and alcohol
add('nicotine-mcq', mcq({
  stem: 'How does nicotine raise blood pressure and heart rate?',
  right: 'It stimulates the adrenal gland to release adrenaline and nor-adrenaline.',
  wrong: ['It destroys red blood cells.', 'It blocks the release of insulin.', 'It binds carbon monoxide in the blood.'],
  sol: 'Nicotine stimulates the adrenal gland; adrenaline and nor-adrenaline raise blood pressure and heart rate — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('heroin-mcq', mcq({
  stem: 'Heroin is obtained by chemical modification of',
  right: 'morphine from the latex of the poppy plant',
  wrong: ['cocaine from the coca plant', 'cannabinoids from Cannabis sativa', 'nicotine from tobacco'],
  sol: 'Heroin (diacetylmorphine) is made by acetylation of morphine from Papaver somniferum — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('cocaine-mcq', mcq({
  stem: 'Which drug interferes with the transport of the neurotransmitter dopamine, producing a false sense of euphoria and energy?',
  right: 'Cocaine',
  wrong: ['Heroin', 'Nicotine', 'Alcohol'],
  sol: 'Cocaine from Erythroxylum coca interferes with dopamine transport — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('cannabis-tf', tf({
  stem: 'Marijuana, hashish, charas and ganja are cannabinoids obtained from Cannabis sativa.',
  key: 't',
  sol: 'True. They come from the inflorescences of Cannabis sativa.',
  d: 1, c: 'recall', t: [4],
}));
add('withdrawal-mcq', mcq({
  stem: 'A man who has drunk alcohol heavily every day for years stops suddenly and becomes anxious, shaky and nauseous, and sweats a lot. What does this indicate?',
  right: 'Withdrawal syndrome, because his body has become dependent on alcohol',
  wrong: ['An allergy to alcohol', 'A viral infection', 'Normal recovery with no link to alcohol'],
  sol: 'Dependence makes the body need the drug; stopping abruptly causes withdrawal symptoms — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('steroid-mcq', mcq({
  stem: 'A male athlete misuses anabolic steroids to build muscle. Which set of side effects is he most likely to suffer?',
  right: 'Acne, aggressiveness and mood swings, reduced testis size and sperm production, liver and kidney problems',
  wrong: ['Improved fertility and lower blood pressure', 'Immunity to infections and faster recovery', 'Loss of muscle and lower aggression only'],
  sol: 'Anabolic steroid misuse causes hormonal, behavioural and organ damage in males, including those listed — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('smoke-ar', ar({
  a: 'Smoking reduces the supply of oxygen to body tissues.',
  r: 'Nicotine stimulates the adrenal gland to release adrenaline and nor-adrenaline.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: the lower oxygen supply is due to carbon monoxide in smoke binding to haemoglobin — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
{
  const p = pct(24, 80);
  add('survey-num', num({
    stem: 'In a survey of 80 adolescents who had tried smoking, 24 said they started because of pressure from friends. What percentage is this?',
    value: p, unit: '%',
    sol: r`$\dfrac{24}{80} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 30 || 'value');
}
add('peer-short', short({
  marks: 2,
  stem: 'Your friend says the older students at a party will tease him if he refuses a drink. Suggest two practical ways he can handle the situation, with reasons.',
  model: 'He can **refuse firmly and confidently** or make an excuse and stay with **friends who also do not drink**; real friends respect choices, and support from peers reduces pressure. He can also **talk to a parent, teacher or counsellor** beforehand or later; trusted adults can help him handle pressure and stay safe.',
  sol: 'Assertive refusal, supportive peers, trusted adults.',
  scheme: [['First practical strategy with reason', 1], ['Second practical strategy with reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('drugs-short', short({
  marks: 3,
  stem: 'Describe three harmful effects of drug and alcohol abuse.',
  model: '1. **Behavioural and social:** reckless behaviour, vandalism and violence; falling performance at school or work; problems with family and friends.\n\n2. **Physical:** overdose can cause **coma and death** due to respiratory failure, heart failure or brain haemorrhage; chronic alcohol damages the **nervous system and liver (cirrhosis)**.\n\n3. **Infections and pregnancy:** sharing needles spreads **HIV and hepatitis B**; drugs and alcohol during pregnancy **harm the foetus**.',
  sol: 'Behavioural, physical, infection-related or foetal effects.',
  scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('co-short', short({
  marks: 2,
  stem: 'Explain why a heavy smoker gets breathless easily, and name two diseases smoking can cause.',
  model: 'Smoke contains **carbon monoxide**, which binds to **haemoglobin** and reduces the oxygen the blood carries; smoking also damages the airways and lungs, so the smoker gets breathless. Diseases: **lung cancer, bronchitis, emphysema** or **coronary heart disease** (any two).',
  sol: 'CO and haemoglobin; two diseases.',
  scheme: [['Carbon monoxide reduces oxygen transport', 1], ['Two diseases', 1]],
  d: 2, c: 'application', t: [4],
}));
add('drugs-long', long({
  stem: 'Plan a programme for a secondary school to prevent drug and alcohol abuse among adolescents. Justify each part of your plan using what you know about why adolescents start using drugs and how dependence develops.',
  model: '**Why adolescents start.** Adolescence (about 12–18 years) is a time of curiosity, a wish for adventure and excitement, experimentation, stress from studies or family, peer pressure and media influence. Repeated use leads to addiction and dependence, with withdrawal symptoms that make stopping hard, so prevention before first use matters most.\n\n**Plan and justification.**\n1. Life-skills sessions on handling stress, failure and peer pressure, including practising refusal — because peer pressure and stress are common triggers.\n2. Accurate information on the effects of tobacco, alcohol and drugs (cancers, liver damage, overdose, HIV from shared needles) — because myths and curiosity encourage experimentation.\n3. Sports, arts, music and clubs — because they channel energy and offer healthy excitement.\n4. Parent and teacher workshops on avoiding undue pressure and spotting danger signs such as falling grades, withdrawal and mood changes — because early help prevents dependence.\n5. A confidential counsellor and links to doctors and de-addiction centres — because dependence needs professional help.\n\n**Evaluation.** Combining skills, information, healthy activities, adult support and professional help addresses each cause, so it is likely to work better than information alone.',
  sol: 'Causes; five justified measures; overall evaluation.',
  scheme: [['Reasons adolescents start, and dependence', 1], ['Life-skills and refusal training', 1], ['Information and healthy activities', 1], ['Parent and teacher roles; danger signs', 1], ['Counselling and professional help with a judgement', 1]],
  wl: [80, 220],
  d: 4, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const cases = { dengue: 64, malaria: 46, typhoid: 38, cold: 52 };
  const total = Object.values(cases).reduce((a, b) => a + b, 0);
  const vb = pct(cases.dengue + cases.malaria, total);
  add('outbreak-case', mk.case({
    passage: `A district health office recorded these cases in one monsoon month.\n\n| Disease | Cases | Notes from field workers |\n|---|---|---|\n| Dengue | ${cases.dengue} | Water collected in coolers, tyres and pots |\n| Malaria | ${cases.malaria} | Stagnant water in ditches near fields |\n| Typhoid | ${cases.typhoid} | Most patients drank water from one old well |\n| Common cold | ${cases.cold} | Spread within schools |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which two diseases in the table are spread by mosquitoes?',
        right: 'Dengue and malaria',
        wrong: ['Typhoid and common cold', 'Malaria and typhoid', 'Dengue and common cold'],
        sol: 'Dengue is spread by Aedes and malaria by female Anopheles mosquitoes — option (@K).',
        d: 1, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of all the cases recorded were mosquito-borne? Give one decimal place.',
        value: vb, tol: 0.05, unit: '%',
        sol: r`Mosquito-borne $= ${cases.dengue} + ${cases.malaria} = ${cases.dengue + cases.malaria}$; total $= ${total}$; $\dfrac{${cases.dengue + cases.malaria}}{${total}} \times 100 = ${vb}$ percent.`,
        scheme: [[`${vb}%`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Suggest two measures, based on the field notes, to reduce the mosquito-borne cases.',
        model: '**Remove breeding sites**: empty and clean coolers, tyres and pots regularly so Aedes cannot breed. **Treat ditches and drains**: drain stagnant water, spray insecticides and release **Gambusia** fish to eat Anopheles larvae; use mosquito nets and wire mesh.',
        sol: 'Target the breeding sites in the notes.',
        scheme: [['Measure for Aedes breeding sites', 1], ['Measure for Anopheles breeding sites', 1]],
        d: 3, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the typhoid cases were concentrated among people who drank from one old well, and what should be done.',
          model: 'Typhoid (Salmonella typhi) spreads through **contaminated water**; the old well was probably **contaminated with sewage**, so those drinking from it were infected. The well should be **closed or disinfected**, people given **safe, boiled or chlorinated water**, and patients treated.',
          sol: 'Common contaminated source.',
          scheme: [['Contaminated water source explains clustering', 1], ['Close or disinfect well; safe water', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => Math.abs(q.children[1].answer.value - Math.round(((64 + 46) / 200) * 1000) / 10) < 1e-9 || 'pct');
}
{
  const ratio = 120 / 20;
  add('response-case', mk.case({
    passage: 'A nurse recorded the antibody level (arbitrary units) of a child after two doses of the same vaccine.\n\n| Day | Event | Antibody level |\n|---|---|---|\n| 0 | First dose | 0 |\n| 14 | — | 20 |\n| 40 | Second (booster) dose | 8 |\n| 47 | — | 120 |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which statement describes the response after the booster dose?',
        right: 'It is faster and stronger than the response after the first dose.',
        wrong: ['It is slower and weaker than the first response.', 'It is identical to the first response.', 'It is a passive response.'],
        sol: 'The level reached 120 within a week of the booster, compared with 20 two weeks after the first dose — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many times higher was the antibody level on day 47 than on day 14?',
        value: ratio,
        sol: r`$\dfrac{120}{20} = ${ratio}$.`,
        scheme: [[`${ratio}`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain the difference between the two responses.',
        model: 'The first dose produced a **primary response**, slow and of low intensity, during which **memory B and T cells** formed. The booster met these memory cells, which responded **rapidly and strongly**: the **secondary (anamnestic) response**.',
        sol: 'Primary response creates memory; secondary uses it.',
        scheme: [['Primary response forms memory cells', 1], ['Secondary response is fast and strong', 1]],
        d: 3, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why do vaccination schedules often include booster doses?',
          model: 'Antibody levels **fall** with time after the first dose (8 units on day 40). A booster triggers the **memory cells**, raising antibody levels **quickly and much higher** and strengthening long-term **memory**, so protection lasts longer.',
          sol: 'Levels fall; boosters renew and strengthen memory.',
          scheme: [['Antibody levels fall over time', 1], ['Booster raises levels via memory cells; longer protection', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 6 || 'ratio');
}
{
  const fall = -pctChange(1000, 200);
  add('hiv-case', mk.case({
    passage: 'A doctor reviewed the records of a person living with HIV who did not take treatment for many years.\n\n| Year after infection | Helper T cells per microlitre | Notes |\n|---|---|---|\n| 0 | 1000 | No symptoms |\n| 3 | 800 | No symptoms |\n| 6 | 500 | Occasional fever |\n| 9 | 200 | Repeated infections, weight loss |',
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which cells, apart from helper T cells, act as the first “HIV factory” after the virus enters the body?',
        right: 'Macrophages',
        wrong: ['Red blood cells', 'Platelets', 'Mast cells'],
        sol: 'HIV first enters macrophages, which continue to produce virus particles — option (@K).',
        d: 2, c: 'recall', t: [3],
      })),
      part('b', num({
        stem: 'By what percentage did the helper T-cell count fall from year 0 to year 9?',
        value: fall, unit: '%',
        sol: r`$\dfrac{1000 - 200}{1000} \times 100 = ${fall}$ percent.`,
        scheme: [[`${fall}%`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why repeated infections began only in the later years.',
        model: 'HIV destroys **helper T cells** gradually; for years enough remain to coordinate immunity, so there are **no symptoms** (a time lag of 5–10 years). As the count falls very low, the immune system becomes **deficient**, and **opportunistic infections** by bacteria, viruses, fungi and parasites take hold.',
        sol: 'Gradual loss of helper T cells; threshold for immunodeficiency.',
        scheme: [['Gradual destruction of helper T cells; time lag', 1], ['Low count → immunodeficiency → opportunistic infections', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Suggest how early testing and treatment could have changed this record, and name the test used.',
          model: 'Early testing by **ELISA** would have detected the infection; **antiretroviral drugs** started early slow the virus, so the helper T-cell count would fall **much more slowly**, delaying or preventing opportunistic infections and **prolonging life**. Knowing his status would also help prevent **spread** to others.',
          sol: 'ELISA; antiretroviral treatment slows decline.',
          scheme: [['ELISA', 1], ['Antiretroviral drugs slow the fall and prolong life', 1]],
          d: 3, c: 'evaluation', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 80 || 'value');
}
{
  const reasons = { curiosity: 22, peer: 18, stress: 12, media: 8 };
  const n = Object.values(reasons).reduce((a, b) => a + b, 0);
  const p = pct(reasons.peer, n);
  add('drug-case', mk.case({
    passage: `A counsellor asked ${n} adolescents attending a de-addiction centre why they first tried drugs or alcohol.\n\n| Main reason | Number |\n|---|---|\n| Curiosity or experimentation | ${reasons.curiosity} |\n| Pressure from friends | ${reasons.peer} |\n| Stress about studies or family | ${reasons.stress} |\n| Influence of films and media | ${reasons.media} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What was the most common reason given?',
        right: 'Curiosity or experimentation',
        wrong: ['Pressure from friends', 'Stress about studies or family', 'Influence of films and media'],
        sol: `${reasons.curiosity} of ${n} gave curiosity, the largest group — option (@K).`,
        d: 1, c: 'understanding', t: [4],
      })),
      part('b', num({
        stem: 'What percentage of the adolescents named pressure from friends?',
        value: p, unit: '%',
        sol: r`$\dfrac{${reasons.peer}}{${n}} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Suggest two school-level measures that address the two most common reasons.',
        model: '**For curiosity:** give accurate, age-appropriate **education** about the real effects of drugs and alcohol, and offer **exciting healthy activities** such as sports and clubs. **For peer pressure:** run **life-skills sessions** on saying no and build supportive peer groups, with **counsellors** available.',
        sol: 'Measures matched to curiosity and peer pressure.',
        scheme: [['Measure for curiosity', 1], ['Measure for peer pressure', 1]],
        d: 3, c: 'application', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Explain what is meant by dependence and why it makes stopping difficult.',
          model: '**Dependence** is the tendency of the body to manifest a characteristic, unpleasant **withdrawal syndrome** (anxiety, shakiness, nausea, sweating) if regular use is **abruptly stopped**. These symptoms push the person to use the drug again, so stopping usually needs **medical and professional help**.',
          sol: 'Withdrawal drives continued use.',
          scheme: [['Definition with withdrawal symptoms', 1], ['Why stopping is hard; need for help', 1]],
          d: 2, c: 'understanding', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 30 || 'value');
}
