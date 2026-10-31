// ISC 12 Biology ch11 Human Health and Disease: Infections, Cancer and Allergies — question bank in ISC style.
// Widal titres, fever timings, doublings and percentages are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { titre, bouts, doublings, pct } from './calc.mjs';
import { PLASMODIUM, TUMOUR } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const plasmodiumFig = svgV(PLASMODIUM, 'Life cycle of Plasmodium in a human and a female Anopheles mosquito');
const tumourFig = svgV(TUMOUR, 'A benign tumour in a capsule and a malignant tumour spreading through a blood vessel');

// ---------------------------------------------------------------- t01 viral and bacterial diseases
add('typhoid-mcq', mcq({
  stem: 'Which laboratory test is used to confirm typhoid fever?',
  right: 'Widal test',
  wrong: ['ELISA for HIV', 'Biopsy and histopathology', 'Platelet count'],
  sol: 'The Widal test detects antibodies against Salmonella typhi by agglutination — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cold-mcq', mcq({
  stem: 'A student has nasal congestion, a sore throat and a hoarse voice for five days, but her chest examination and lungs are normal. Which is the most likely cause?',
  right: 'Rhinoviruses causing the common cold',
  wrong: ['Streptococcus pneumoniae causing pneumonia', 'Salmonella typhi causing typhoid', 'Plasmodium vivax causing malaria'],
  sol: 'The common cold affects the nose and airways but not the lungs — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dengue-mcq', mcq({
  stem: 'Several people in a colony have high fever, pain behind the eyes, joint pain and a falling platelet count. Mosquitoes that bite by day are breeding in water coolers. Which disease and vector are most likely?',
  right: 'Dengue, spread by Aedes aegypti',
  wrong: ['Malaria, spread by female Anopheles', 'Filariasis, spread by female Culex', 'Plague, spread by the rat flea'],
  sol: 'Day-biting Aedes in clean stored water; low platelets point to dengue — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('pneumonia-mcq', mcq({
  stem: 'In a child with severe pneumonia, the lips and fingernails turn bluish grey. What is the reason?',
  right: 'The alveoli fill with fluid, so too little oxygen enters the blood.',
  wrong: ['The bacteria produce a blue pigment in the skin.', 'The heart stops pumping blood to the hands.', 'Red blood cells burst and release haemozoin.'],
  sol: 'Fluid-filled alveoli reduce gas exchange, causing cyanosis — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('plague-mcq', mcq({
  stem: 'Plague caused by Yersinia pestis usually reaches humans through',
  right: 'the bite of the rat flea',
  wrong: ['the bite of the female Culex mosquito', 'contaminated water', 'houseflies sitting on food'],
  sol: 'Rat fleas carry Yersinia pestis from rodents to humans — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('diphtheria-mcq', mcq({
  stem: 'A tough grey membrane forming in the throat of a child with fever, which may block breathing, is typical of',
  right: 'diphtheria',
  wrong: ['common cold', 'typhoid', 'chikungunya'],
  sol: 'Corynebacterium diphtheriae forms a membrane in the throat — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('typhoid-ar', ar({
  a: 'A healthy-looking cook can spread typhoid to many people.',
  r: 'Carriers can shed Salmonella typhi in their faeces without showing any symptoms.',
  key: 'a',
  sol: 'Both are true, and the carrier state explains how a healthy cook spreads typhoid (as with Typhoid Mary) — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
{
  const D = [10, 20, 40, 80, 160, 320];
  const A = [true, true, true, true, false, false];
  const t = titre(D, A);
  add('widal-num', num({
    stem: 'A patient’s serum was tested in the Widal test at dilutions 1 : 10, 1 : 20, 1 : 40, 1 : 80, 1 : 160 and 1 : 320. Agglutination occurred in the first four tubes only. If the titre is written as 1 : n, what is n?',
    value: t,
    sol: r`The highest dilution with agglutination is 1 : 80, so $n = ${t}$.`,
    scheme: [[`${t}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 80 || 'titre');
}
add('cold-short', short({
  marks: 1,
  stem: 'Give a reason: antibiotics are of no use in treating the common cold.',
  model: 'The common cold is caused by **viruses (rhinoviruses)**; antibiotics act only on **bacteria**.',
  sol: 'Viral disease.',
  scheme: [['Viral cause; antibiotics act on bacteria', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('glass-short', short({
  marks: 1,
  stem: 'Give a reason: sharing drinking glasses with a pneumonia patient is risky.',
  model: 'Pneumonia bacteria spread through **droplets and aerosols** from an infected person, which can be left on **shared glasses and utensils**.',
  sol: 'Droplet transmission.',
  scheme: [['Droplets on shared utensils', 1]],
  d: 2, c: 'application', t: [1],
}));
add('cold-fill', fill({
  stem: 'The common cold is caused by a group of viruses called ______.',
  acc: [['rhinoviruses', 'rhinovirus']],
  sol: 'Rhinoviruses.',
  d: 1, c: 'recall', t: [1],
}));
add('aedes-fill', fill({
  stem: 'Dengue is spread by the day-biting mosquito Aedes ______.',
  acc: [['aegypti']],
  sol: 'Aedes aegypti.',
  d: 1, c: 'recall', t: [1],
}));
add('viral-short', short({
  marks: 2,
  stem: 'Compare dengue and chikungunya with respect to their vector and one distinctive symptom of each.',
  model: 'Both are **viral** diseases spread by the bite of **Aedes** mosquitoes (dengue mainly by **Aedes aegypti**). **Dengue:** high fever with **pain behind the eyes** and a **fall in platelet count**. **Chikungunya:** fever with **severe, long-lasting joint pain**.',
  sol: 'Same vector; different symptoms.',
  scheme: [['Aedes vector for both', 1], ['One symptom each', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bacterial-short', short({
  marks: 2,
  stem: 'Name the causative organism and the mode of transmission of (i) pneumonia and (ii) plague.',
  model: '(i) **Pneumonia** — ***Streptococcus pneumoniae*** (or *Haemophilus influenzae*); spread by **droplets/aerosols** from an infected person or by **sharing glasses and utensils**. (ii) **Plague** — ***Yersinia pestis***; spread by the **bite of the rat flea**.',
  sol: 'Agents and transmission.',
  scheme: [['Pneumonia agent and spread', 1], ['Plague agent and spread', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('typhoid-short', short({
  marks: 3,
  stem: 'Describe typhoid fever with respect to its causative agent, mode of spread, symptoms and confirmatory test.',
  model: 'Typhoid is caused by the bacterium ***Salmonella typhi***, which enters the **small intestine** with **contaminated food and water** and spreads to other organs. Symptoms are **sustained high fever (39–40 °C)**, weakness, stomach pain, **constipation**, headache and loss of appetite; **intestinal perforation** and death may occur in severe cases. It is confirmed by the **Widal test**, which detects antibodies by agglutination.',
  sol: 'Agent, spread, symptoms, test.',
  scheme: [['Agent and spread', 1], ['Symptoms', 1], ['Widal test', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('widal-short', short({
  marks: 3,
  stem: 'Explain the principle of the Widal test. Patient A’s serum agglutinates up to a dilution of 1 : 320; patient B’s serum does not agglutinate even at 1 : 20. Interpret both results.',
  model: 'The test is based on **antigen–antibody agglutination**: serum is **serially diluted** and mixed with killed ***Salmonella*** antigens; antibodies in the serum make the bacteria **clump**. The **titre** is the highest dilution that still agglutinates. **Patient A** has a **high titre (1 : 320)**, showing many antibodies — **likely typhoid**. **Patient B** has **no antibodies** against *Salmonella* — typhoid is **unlikely**.',
  sol: 'Principle; interpretation.',
  scheme: [['Agglutination principle and titre', 1], ['Patient A: likely typhoid', 1], ['Patient B: unlikely', 1]],
  d: 3, c: 'application', t: [1],
}));
add('infections-long', long({
  stem: '(a) State the causative agent and two symptoms of typhoid, and name the test used to confirm it. [2]\n(b) Explain how pneumonia affects the lungs and how it spreads. [2]\n(c) A family boils its drinking water but keeps uncovered water in a cooler. Which of typhoid and dengue are they protected from? Explain. [1]',
  model: '(a) ***Salmonella typhi***; **sustained high fever (39–40 °C)**, **weakness, stomach pain and constipation**; confirmed by the **Widal test**.\n\n(b) The bacteria (***Streptococcus pneumoniae***, *Haemophilus influenzae*) infect the **alveoli**, which **fill with fluid**, so less oxygen enters the blood; fever, chills and cough follow. It spreads by **droplets** and by **sharing glasses and utensils**.\n\n(c) Boiling protects them from **typhoid** (water-borne), but the **open cooler** lets **Aedes** breed, so they are **not** protected from **dengue**.',
  sol: 'Typhoid; pneumonia; prevention.',
  scheme: [['(a) Agent, symptoms, Widal', 2], ['(b) Alveoli fill with fluid', 1], ['(b) Droplet spread', 1], ['(c) Typhoid yes, dengue no', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 protozoan, helminthic and fungal diseases
add('haemozoin-mcq', mcq({
  stem: 'What causes the chill and high fever in a malaria patient?',
  right: 'Haemozoin released when infected red blood cells burst',
  wrong: ['Histamine released by mast cells', 'Haemoglobin made by the parasite', 'Sporozoites multiplying in the liver'],
  sol: 'Haemozoin is the toxin released from bursting RBCs — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('anopheles-mcq', mcq({
  stem: 'Which insect transmits malaria from one person to another?',
  right: 'Female Anopheles mosquito',
  wrong: ['Female Culex mosquito', 'Aedes aegypti', 'Housefly'],
  sol: 'Only female Anopheles transmit Plasmodium — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('sporozoite-mcq', mcq({
  stem: 'Which stage of Plasmodium is injected into the human body when an infected mosquito bites?',
  right: 'Sporozoite',
  wrong: ['Gametocyte', 'Merozoite released from red blood cells', 'Zygote'],
  sol: 'Sporozoites from the salivary glands are the infective stage — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fertil-mcq', mcq({
  stem: 'Where do the gametes of Plasmodium fuse during its life cycle?',
  right: 'In the stomach (gut) of the female Anopheles',
  wrong: ['In the human liver cells', 'In human red blood cells', 'In the salivary glands of the mosquito'],
  sol: 'Fertilisation takes place in the mosquito’s stomach; the mosquito is the definitive host — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vector-ar', ar({
  a: 'Removing stagnant water around homes helps to control both malaria and dengue.',
  r: 'The mosquitoes that spread these diseases lay their eggs and grow as larvae in water.',
  key: 'a',
  sol: 'Both are true, and removing breeding water reduces both Anopheles and Aedes, which explains the assertion — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('amoeba-mcq', mcq({
  stem: 'In a village where flies swarm over uncovered food, many people pass stools containing mucus and blood clots. Which disease is likely, and what role do the flies play?',
  right: 'Amoebiasis; the flies act as mechanical carriers of cysts',
  wrong: ['Typhoid; the flies are the definitive hosts', 'Malaria; the flies inject sporozoites', 'Ascariasis; the flies lay worm eggs in the gut'],
  sol: 'Entamoeba histolytica cysts are carried from faeces to food by houseflies — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('filaria-mcq', mcq({
  stem: 'A man in a coastal district has grossly swollen legs after years of infection by worms that live in his lymph vessels. Which vector spread the infection?',
  right: 'Female Culex mosquito',
  wrong: ['Female Anopheles mosquito', 'Aedes aegypti', 'Rat flea'],
  sol: 'Wuchereria is spread by female Culex; the swelling is elephantiasis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ringworm-mcq', mcq({
  stem: 'A footballer who shares towels develops dry, scaly, very itchy patches between his toes. Which group of organisms is most likely responsible?',
  right: 'Fungi such as Trichophyton',
  wrong: ['Roundworms such as Ascaris', 'Viruses such as rhinoviruses', 'Protozoa such as Entamoeba'],
  sol: 'Ringworm is a fungal infection favoured by heat and moisture — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ascaris-ar', ar({
  a: 'Ascariasis can cause anaemia and blockage of the intestine.',
  r: 'Ascaris is a virus transmitted by the bite of mosquitoes.',
  key: 'c',
  sol: 'A is true; R is false: Ascaris is a roundworm whose eggs are swallowed with contaminated food or water — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
{
  const b = bouts(48 * 4);
  const fifth = b[4];
  add('fever-num', num({
    stem: 'A patient with vivax malaria has the first bout of fever at hour 0, and bouts recur every 48 hours. At which hour is the fifth bout expected?',
    value: fifth, unit: 'hours',
    sol: r`Fifth bout $= 0 + 4 \times 48 = ${fifth}$ hours.`,
    scheme: [[`${fifth}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 192 || 'value');
}
add('falciparum-fill', fill({
  stem: 'The species of Plasmodium that causes the most serious, malignant malaria is Plasmodium ______.',
  acc: [['falciparum']],
  sol: 'Plasmodium falciparum.',
  d: 1, c: 'recall', t: [2],
}));
add('gambusia-short', short({
  marks: 1,
  stem: 'Give a reason: Gambusia fish are released into ponds in areas where malaria is common.',
  model: 'Gambusia **feed on mosquito larvae**, reducing the number of **Anopheles** that can spread malaria.',
  sol: 'Eat larvae.',
  scheme: [['Feed on mosquito larvae', 1]],
  d: 2, c: 'application', t: [2],
}));
add('mosquito-short', short({
  marks: 2,
  stem: 'Describe the part of the life cycle of Plasmodium that takes place inside the female Anopheles mosquito.',
  model: 'The mosquito takes up **gametocytes** with the blood of an infected person. In its **stomach**, gametes form and **fertilise**, and the zygote develops in the **stomach wall**. **Sporozoites** are produced, which move to the **salivary glands** and are injected at the **next bite**.',
  sol: 'Gametocytes to sporozoites.',
  scheme: [['Gametocytes taken up; fertilisation in stomach', 1], ['Sporozoites to salivary glands', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('helminth-short', short({
  marks: 2,
  stem: 'Name the causative agent and give one symptom of (i) ascariasis and (ii) filariasis.',
  model: '(i) **Ascariasis** — the roundworm ***Ascaris lumbricoides***; causes **internal bleeding, anaemia** or **blockage of the intestine**. (ii) **Filariasis** — ***Wuchereria bancrofti*** (or *W. malayi*); causes chronic inflammation of lymph vessels and gross **swelling of the legs (elephantiasis)**.',
  sol: 'Agents and symptoms.',
  scheme: [['Ascariasis', 1], ['Filariasis', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('malaria-short', short({
  marks: 3,
  stem: 'Describe the development of Plasmodium inside the human body after an infected mosquito bite.',
  model: 'The mosquito injects **sporozoites**, which reach the **liver** and multiply **asexually** in liver cells. Their products then invade **red blood cells**, multiply and **burst** them, releasing **haemozoin**, which causes **chill and high fever**; in vivax malaria this recurs about every **48 hours**. Some parasites in the red cells develop into **gametocytes**, which are taken up by a mosquito when it bites.',
  sol: 'Liver, RBCs, gametocytes.',
  scheme: [['Sporozoites multiply in liver', 1], ['RBCs burst; haemozoin; fever', 1], ['Gametocytes form', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('prevention-short', short({
  marks: 3,
  stem: 'A town reports outbreaks of malaria, amoebiasis and ringworm. Suggest one specific preventive measure for each disease, explaining how it breaks transmission.',
  model: '**Malaria:** drain stagnant water, use **mosquito nets** or release **Gambusia** — fewer **Anopheles** mosquitoes bite people. **Amoebiasis:** **cover food**, control **houseflies** and ensure **sanitation and clean water** — cysts no longer reach food and drink. **Ringworm:** keep skin **dry** and do **not share towels, combs or clothes** — fungal spores are not passed on.',
  sol: 'One measure each.',
  scheme: [['Malaria measure with reason', 1], ['Amoebiasis measure with reason', 1], ['Ringworm measure with reason', 1]],
  d: 3, c: 'application', t: [2],
}));
add('compare-short', short({
  marks: 3,
  stem: 'Compare malaria and filariasis with respect to the causative agent, the vector and the part of the body chiefly affected.',
  model: '**Agent:** malaria — the protozoan ***Plasmodium***; filariasis — the roundworms ***Wuchereria bancrofti*** and *W. malayi*. **Vector:** malaria — **female *Anopheles***; filariasis — **female *Culex***. **Part affected:** malaria — **liver cells and red blood cells**, causing recurring fever; filariasis — **lymphatic vessels**, mostly of the legs, causing **elephantiasis**.',
  sol: 'Three comparisons.',
  scheme: [['Agents', 1], ['Vectors', 1], ['Parts affected', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('plasmodium-long', long({
  stem: '(a) With the help of a labelled flow diagram, describe the life cycle of Plasmodium in its two hosts. [3]\n(b) Why does fever in vivax malaria recur at regular intervals? [1]\n(c) Why do only female Anopheles mosquitoes transmit malaria? [1]',
  model: '(a) **Human (asexual phase):** **sporozoites** injected by the mosquito → multiply in **liver cells** → invade **RBCs**, multiply and **burst** them, releasing **haemozoin** → some form **gametocytes**. **Mosquito (sexual phase):** female *Anopheles* takes up **gametocytes** → **fertilisation** in the **stomach** → development in the stomach wall → **sporozoites** move to the **salivary glands** → injected at the next bite.\n\n(b) Parasites in RBCs complete their multiplication **together**, so RBCs **burst at the same time** about every **48 hours**, releasing haemozoin each time.\n\n(c) Only **females suck blood** (for egg development), so only they take up and inject the parasite.',
  sol: 'Life cycle; periodicity; females.',
  scheme: [['(a) Human phase', 2], ['(a) Mosquito phase', 1], ['(b) Synchronous bursting', 1], ['(c) Only females feed on blood', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
  assets: [plasmodiumFig],
}));

// ---------------------------------------------------------------- t03 cancer
add('contact-mcq', mcq({
  stem: 'Which property of normal cells is lost in cancer cells, allowing them to pile up into a tumour?',
  right: 'Contact inhibition',
  wrong: ['Ability to make proteins', 'Ability to respire', 'Presence of a nucleus'],
  sol: 'Normal cells stop dividing on contact with neighbours; cancer cells do not — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('benign-mcq', mcq({
  stem: 'A lump removed from a patient’s breast was enclosed in a capsule, and no tumour cells were found in nearby lymph nodes or blood. The lump is best described as',
  right: 'a benign tumour that has not spread',
  wrong: ['a malignant tumour that has metastasised', 'an allergic swelling', 'a filarial swelling'],
  sol: 'Confinement within a capsule and no spread indicate a benign tumour — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('carcinogen-mcq', mcq({
  stem: 'A worker in a uranium mine developed lung cancer after many years. Which kind of carcinogen was most probably responsible?',
  right: 'A physical carcinogen: ionising radiation',
  wrong: ['A biological carcinogen: an oncogenic virus', 'An allergen such as pollen', 'A chemical in alcohol'],
  sol: 'Radioactive ores emit ionising radiation that damages DNA — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('biopsy-mcq', mcq({
  stem: 'A piece of suspected tissue is cut into thin sections, stained and examined under a microscope by a pathologist. This method of detecting cancer is called',
  right: 'biopsy and histopathology',
  wrong: ['radiography', 'computed tomography', 'immunotherapy'],
  sol: 'Histopathology of a biopsy sample is the surest diagnosis — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('mri-mcq', mcq({
  stem: 'Which imaging technique uses strong magnetic fields and non-ionising radiation to detect changes in living tissue?',
  right: 'Magnetic resonance imaging (MRI)',
  wrong: ['Computed tomography (CT)', 'Radiography with X-rays', 'Histopathology'],
  sol: 'MRI uses magnetic fields; CT and radiography use X-rays — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('interferon-mcq', mcq({
  stem: 'α-interferon is given to some cancer patients because it',
  right: 'activates the immune system to help destroy the tumour',
  wrong: ['kills all rapidly dividing cells directly', 'cuts the tumour out', 'blocks histamine'],
  sol: 'It is a biological response modifier used in immunotherapy — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('chemo-mcq', mcq({
  stem: 'Why do many patients lose their hair during chemotherapy for cancer?',
  right: 'The drugs attack rapidly dividing cells, including those of hair follicles.',
  wrong: ['The drugs are allergens that release histamine in the scalp.', 'The tumour spreads to the scalp.', 'The radiation used in surgery burns the hair.'],
  sol: 'Chemotherapy targets dividing cells, so hair follicles and bone marrow are also affected — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('metastasis-ar', ar({
  a: 'A malignant tumour can give rise to new tumours in organs far from where it began.',
  r: 'Cells sloughed from malignant tumours travel through the blood and start new tumours at distant sites.',
  key: 'a',
  sol: 'Both are true, and spread through blood (metastasis) explains distant tumours — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('oncogene-ar', ar({
  a: 'Tobacco smoke is a chemical carcinogen.',
  r: 'Lung cancer is common in many countries.',
  key: 'b',
  sol: 'Both are true, but how common lung cancer is does not explain why tobacco smoke causes cancer (its chemicals damage DNA) — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
{
  const k = doublings(1e6);
  add('doubling-num', num({
    stem: 'A transformed cell in a culture divides once a day, and every daughter cell keeps dividing. After how many days will the culture first contain at least one million (10⁶) cells?',
    value: k, unit: 'days',
    sol: r`$2^{19} = 524288 < 10^{6}$ and $2^{20} = 1048576 \ge 10^{6}$, so the smallest whole number of days is $k = ${k}$.`,
    scheme: [[`${k}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 20 || 'value');
}
add('leukaemia-fill', fill({
  stem: 'Raised counts of white blood cells in blood and bone-marrow tests point to ______, a cancer of blood-forming tissue.',
  acc: [['leukaemia', 'leukemia']],
  sol: 'Leukaemia.',
  d: 1, c: 'recall', t: [3],
}));
add('cancer-short', short({
  marks: 2,
  stem: 'Distinguish between benign and malignant tumours, giving two points of difference.',
  model: '**Benign tumours** stay **confined** to their original site, often within a capsule, and cause **little damage**. **Malignant tumours** grow **rapidly**, **invade** and damage nearby tissue, and **spread** to distant sites through blood (**metastasis**).',
  sol: 'Confined vs invasive and spreading.',
  scheme: [['Benign: confined, little damage', 1], ['Malignant: invasive, metastasis', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('carcinogen-short', short({
  marks: 2,
  stem: 'Name the three kinds of carcinogens and give one example of each.',
  model: '**Physical** carcinogens — **ionising radiation** such as X-rays and gamma rays, or UV light. **Chemical** carcinogens — **tobacco smoke**. **Biological** carcinogens — **oncogenic viruses** carrying viral oncogenes.',
  sol: 'Three kinds.',
  scheme: [['Two kinds with examples', 1], ['Third kind with example', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('diagnosis-short', short({
  marks: 3,
  stem: 'Describe three methods used to detect cancer, stating what each reveals.',
  model: '**Biopsy and histopathology:** a piece of suspected tissue is stained and examined under the microscope to see whether its cells are cancerous. **Blood and bone-marrow tests:** increased cell counts reveal **leukaemia**. **Imaging — radiography (X-rays), CT and MRI:** reveal the position and size of **internal tumours**. (Also antibodies against cancer-specific antigens and molecular tests for susceptibility genes.)',
  sol: 'Three methods.',
  scheme: [['Biopsy', 1], ['Blood and bone-marrow tests', 1], ['Imaging', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('treatment-short', short({
  marks: 3,
  stem: 'After surgery to remove a tumour, a few cancer cells may remain in a patient. Explain how radiation therapy, chemotherapy and immunotherapy could each help, mentioning one drawback or special feature of each.',
  model: '**Radiation therapy** irradiates the remaining tumour cells lethally; care is needed to **protect surrounding normal tissue**. **Chemotherapy** uses drugs that kill **dividing cells**; it has side effects such as **hair loss and anaemia**. **Immunotherapy** uses **biological response modifiers** such as **α-interferon** to **activate the patient’s immune system**, which tumour cells otherwise often escape.',
  sol: 'Three treatments.',
  scheme: [['Radiation with drawback', 1], ['Chemotherapy with side effects', 1], ['Immunotherapy with interferon', 1]],
  d: 3, c: 'application', t: [3],
}));
add('contactinh-short', short({
  marks: 3,
  stem: 'In a laboratory, cells from tissue X form a single layer in a dish and then stop dividing. Cells from tissue Y keep dividing and pile up in layers, and when injected into a mouse they produce tumours in its lungs and liver. Interpret these observations.',
  model: 'Tissue **X** cells show **contact inhibition**: on touching neighbours they stop dividing — they are **normal**. Tissue **Y** cells have **lost contact inhibition**, so they divide **without control** and form a mass — they are **cancer (transformed) cells**. Tumours appearing in **distant organs** show that Y cells can enter the blood and **metastasise**, so Y is **malignant**.',
  sol: 'Normal vs malignant.',
  scheme: [['X shows contact inhibition: normal', 1], ['Y lost contact inhibition: cancerous', 1], ['Distant tumours: metastasis, malignant', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('cancer-long', long({
  stem: '(a) Explain the terms contact inhibition and metastasis. [2]\n(b) Describe the three types of carcinogens with one example each. [2]\n(c) Why does giving up smoking reduce a person’s risk of lung cancer? [1]',
  model: '(a) **Contact inhibition** is the property of normal cells by which **contact with other cells stops their division**; cancer cells lose it and pile up into tumours. **Metastasis** is the spread of **cells from a malignant tumour** through the **blood** to distant sites, where they form **new tumours**.\n\n(b) **Physical:** **ionising radiation** (X-rays, gamma rays) and **UV light** damage DNA. **Chemical:** **tobacco smoke** and some industrial chemicals. **Biological:** **oncogenic viruses** with viral oncogenes.\n\n(c) Tobacco smoke contains **chemical carcinogens** that **damage DNA** in lung cells and can activate **proto-oncogenes**; stopping smoking **removes this exposure**.',
  sol: 'Terms; carcinogens; smoking.',
  scheme: [['(a) Contact inhibition', 1], ['(a) Metastasis', 1], ['(b) Three types with examples', 2], ['(c) Carcinogens in smoke removed', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 allergies
add('allergen-mcq', mcq({
  stem: 'Which of these is a common allergen?',
  right: 'Pollen grains of grasses',
  wrong: ['Haemozoin', 'Salmonella typhi', 'α-interferon'],
  sol: 'Pollen, dust mites and animal dander are common allergens — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ige-mcq', mcq({
  stem: 'The antibodies produced in an allergic reaction belong to the class',
  right: 'IgE',
  wrong: ['IgG', 'IgA', 'IgM'],
  sol: 'Allergic responses involve IgE antibodies — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('antihistamine-mcq', mcq({
  stem: 'Every spring, when certain trees flower, a teacher sneezes and has watery eyes. Her doctor prescribes an anti-histamine. How does the drug help?',
  right: 'It counters the histamine released by mast cells, reducing the symptoms.',
  wrong: ['It kills the bacteria causing the infection.', 'It destroys all the pollen in the air.', 'It makes her produce more IgE antibodies.'],
  sol: 'Allergic symptoms are caused by histamine; anti-histamines reduce its effect — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('allergy-ar', ar({
  a: 'Allergic reactions are caused mainly by IgG antibodies made by mast cells.',
  r: 'Histamine relieves sneezing and watery eyes.',
  key: 'd',
  sol: 'Both are false: allergy involves IgE (made by B-cells) binding to mast cells, and histamine causes, not relieves, the symptoms — option (d).',
  d: 3, c: 'understanding', t: [4],
}));
add('mast-fill', fill({
  stem: 'During an allergic reaction, mast cells release histamine and ______.',
  acc: [['serotonin']],
  sol: 'Serotonin.',
  d: 1, c: 'recall', t: [4],
}));
add('allergy-short', short({
  marks: 2,
  stem: 'Define allergy and allergen, and list three general symptoms of an allergic reaction.',
  model: 'An **allergy** is the **exaggerated response of the immune system** to certain antigens in the environment. The substances causing it are **allergens**, such as **pollen, dust mites and animal dander**. Symptoms include **sneezing, watery eyes, running nose** and **difficulty in breathing**.',
  sol: 'Definitions and symptoms.',
  scheme: [['Allergy and allergen defined', 1], ['Three symptoms', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('allergy-short3', short({
  marks: 3,
  stem: 'A boy sneezes and wheezes every spring but is free of symptoms in winter. Explain, step by step, what happens in his body from first contact with the allergen to the appearance of symptoms.',
  model: 'In spring the air carries **pollen**, an **allergen**. At **first exposure**, his immune system makes **IgE antibodies** against it, which attach to **mast cells**. On **later exposure**, pollen binds these IgE molecules, and the mast cells **release histamine and serotonin**, which cause **sneezing, watery eyes, a running nose and narrowing of airways (wheezing)**. In winter there is **little pollen**, so no reaction occurs.',
  sol: 'Sensitisation and reaction.',
  scheme: [['Pollen allergen; IgE made', 1], ['IgE on mast cells; histamine released', 1], ['Symptoms; seasonal pattern', 1]],
  d: 3, c: 'application', t: [4],
}));
add('allergy-long', long({
  stem: '(a) What is an allergy? Name three common allergens. [1]\n(b) Explain the roles of IgE, mast cells and histamine in an allergic reaction. [2]\n(c) Name two kinds of drugs used to relieve allergy symptoms. [1]\n(d) Suggest why children brought up in very protected, over-clean surroundings may be more prone to allergies. [1]',
  model: '(a) An **exaggerated immune response** to harmless environmental antigens; **pollen, dust mites, animal dander**.\n\n(b) The body makes **IgE antibodies** against the allergen; they **bind to mast cells**. On re-exposure the allergen links these IgE molecules and the **mast cells release histamine** (and serotonin), which **dilates blood vessels and narrows airways**, causing sneezing, watery eyes and breathing difficulty.\n\n(c) **Anti-histamines**, **adrenaline** and **steroids**.\n\n(d) Their immune systems meet **fewer microbes and antigens early in life**, so **immunity is lowered** and they become **more sensitive** to harmless allergens.',
  sol: 'Allergy; mechanism; drugs; lifestyle.',
  scheme: [['(a) Definition and allergens', 1], ['(b) IgE and mast cells', 1], ['(b) Histamine and effects', 1], ['(c) Two drugs', 1], ['(d) Reduced early exposure', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const P = [['P1', 'Yes', 'No', 'No'], ['P2', 'No', 'Yes', 'Yes'], ['P3', 'Yes', 'No', 'No'], ['P4', 'No', 'Yes', 'No']];
  const malignant = P.filter(([, cap, inv]) => cap === 'No' && inv === 'Yes').length;
  const p = pct(malignant, P.length);
  add('tumour-case', mk.case({
    passage: `A pathologist recorded these findings for four tumours removed by surgery.\n\n| Patient | Capsule present | Cells invading nearby tissue | Tumour cells in distant lymph nodes |\n|---|---|---|---|\n${P.map((row) => `| ${row.join(' | ')} |`).join('\n')}`,
    d: 3, c: 'analysis',
    assets: [tumourFig],
    children: [
      part('a', num({
        stem: 'What percentage of the four tumours were malignant (no capsule and invading tissue)?',
        value: p, unit: '%',
        sol: r`Malignant: P2 and P4, so $\dfrac{${malignant}}{4} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which patient’s tumour has already metastasised?',
        right: 'P2',
        wrong: ['P1', 'P3', 'P4'],
        sol: 'Only P2 has tumour cells in distant lymph nodes — option (@K).',
        d: 3, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why would the doctor advise further treatment for P4 even though no distant spread has been found yet?',
        model: 'P4’s tumour has **no capsule** and is **invading nearby tissue**, so it is **malignant**. Some cells may already have entered the **blood or lymph**, so **radiation or chemotherapy** is advised to kill remaining cells and **prevent metastasis**.',
        sol: 'Malignant; risk of spread.',
        scheme: [['P4 malignant', 1], ['Treat to prevent metastasis', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why are tumours of P1 and P3 considered less dangerous?',
          model: 'They are **enclosed in a capsule** and do **not invade** nearby tissue or spread, so they are **benign**; removing them by **surgery** usually cures the patient.',
          sol: 'Benign.',
          scheme: [['Capsule, no invasion', 1], ['Benign; surgery suffices', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 50 || 'value');
}
{
  const C = { typhoid: 48, dengue: 30, amoebiasis: 42 };
  const total = C.typhoid + C.dengue + C.amoebiasis;
  const water = pct(C.typhoid + C.amoebiasis, total);
  add('outbreak-case', mk.case({
    passage: `After heavy rains, a health centre recorded cases of three diseases in one month.\n\n| Disease | Cases |\n|---|---|\n| Typhoid | ${C.typhoid} |\n| Dengue | ${C.dengue} |\n| Amoebiasis | ${C.amoebiasis} |\n\nThe water pipelines had leaked into drains, and many houses had water stored in open containers.`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of all cases were of diseases spread mainly through contaminated food and water?',
        value: water, unit: '%',
        sol: r`Typhoid + amoebiasis $= ${C.typhoid + C.amoebiasis}$ of ${total}: $\dfrac{${C.typhoid + C.amoebiasis}}{${total}} \times 100 = ${water}$ percent.`,
        scheme: [[`${water}`, 1]],
        d: 2, c: 'application', t: [1, 2],
      })),
      part('b', mcq({
        stem: 'Which single observation best explains the dengue cases?',
        right: 'Water stored in open containers, where Aedes mosquitoes breed',
        wrong: ['Pipelines leaking into drains', 'Uncovered food attracting houseflies', 'Rat fleas in grain stores'],
        sol: 'Aedes breeds in clean stored water — option (@K).',
        d: 3, c: 'analysis', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Suggest two measures the town should take first, and explain which diseases each would reduce.',
        model: '**Repair the pipelines and chlorinate or boil drinking water** — reduces **typhoid and amoebiasis**, which spread through contaminated water. **Cover or empty stored water** and remove other breeding sites — reduces **dengue** by stopping **Aedes** from breeding.',
        sol: 'Water safety; breeding sites.',
        scheme: [['Safe water: typhoid, amoebiasis', 1], ['Remove breeding water: dengue', 1]],
        d: 3, c: 'analysis', t: [1, 2],
      }), [
        short({
          marks: 2,
          stem: 'Why might the number of typhoid cases go on rising for some time even after the pipelines are repaired?',
          model: 'Some people become **carriers** who shed ***Salmonella typhi*** without symptoms, and food handled by them can still spread infection; also cases already **incubating** appear later.',
          sol: 'Carriers and incubation.',
          scheme: [['Carriers', 1], ['Incubation period', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 75 || 'value');
}
