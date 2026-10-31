// ISC 12 Biology ch11 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, TITRE, DOUBLE } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Human Health and Disease: Infections, Cancer and Allergies — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Viral and bacterial diseases',
      `**Health** is a state of complete physical, mental and social well-being. **Infectious diseases** are caused by **pathogens** and spread from person to person.

**Viral diseases**
- **Common cold** — **rhinoviruses**; infect the **nose and respiratory passages, not the lungs**. Nasal congestion and discharge, sore throat, hoarseness, cough, headache and tiredness lasting **3–7 days**. Spread by **droplets** from coughs and sneezes and by **contaminated objects** (pens, books, door handles).
- **Chikungunya** — chikungunya virus, spread by the bite of the **Aedes** mosquito; fever with **severe, prolonged joint pain**, rash.
- **Dengue** — dengue virus, spread by the **day-biting Aedes aegypti**; sudden high fever, severe headache, **pain behind the eyes**, joint and muscle pain (“break-bone fever”), rash, **fall in platelet count**; severe forms cause bleeding.

**Bacterial diseases**
- **Typhoid** — ***Salmonella typhi***; enters the **small intestine** with **contaminated food and water** and spreads to other organs. Sustained high fever (**39–40 °C**), weakness, stomach pain, constipation, headache, loss of appetite; **intestinal perforation** and death in severe cases. Confirmed by the **Widal test**. **Mary Mallon** (“Typhoid Mary”), a cook, was a **carrier** who spread typhoid for years.
- **Pneumonia** — ***Streptococcus pneumoniae*** and ***Haemophilus influenzae***; infects the **alveoli**, which fill with fluid, reducing respiration. Fever, chills, cough, headache; in severe cases **lips and fingernails turn grey to bluish**. Spread by **droplets** or by sharing glasses and utensils.
- **Diphtheria** — ***Corynebacterium diphtheriae***; sore throat, fever, a tough grey **membrane** in the throat that may block breathing; its **toxin** can damage the heart and nerves. Prevented by the **DPT vaccine**.
- **Plague** — ***Yersinia pestis***; spread by the bite of the **rat flea**; fever, chills, painful **swollen lymph nodes (buboes)** in bubonic plague; controlled by rodent control and antibiotics.

**Widal test.** The patient’s serum is serially diluted (1 : 20, 1 : 40, 1 : 80 …) and mixed with killed *Salmonella* antigens. **Agglutination** (clumping) shows antibodies against the bacterium. The **titre** is the highest dilution that still agglutinates; a high titre (for example 1 : ${TITRE}) suggests active typhoid.`,
      [kt('Pathogen', 'Disease-causing organism.'), kt('Widal test', 'Agglutination test for antibodies against Salmonella typhi, confirming typhoid.'), kt('Carrier', 'Infected person without symptoms who can spread a disease.'), kt('Titre', 'Highest dilution of serum that still gives a positive reaction.')],
      table(['Disease', 'Agent'], [['Common cold', 'Rhinoviruses'], ['Dengue, chikungunya', 'Viruses (Aedes vector)'], ['Typhoid', 'Salmonella typhi'], ['Pneumonia', 'Streptococcus pneumoniae, Haemophilus influenzae'], ['Diphtheria', 'Corynebacterium diphtheriae'], ['Plague', 'Yersinia pestis (rat flea)']], 'Table of viral and bacterial diseases with agents'),
      [1],
    ),
    sec(
      '2. Protozoan, helminthic and fungal diseases; prevention',
      `**Amoebiasis (amoebic dysentery)** — the protozoan ***Entamoeba histolytica*** in the **large intestine**. Constipation, abdominal pain and cramps, **stools with excess mucus and blood clots**. **Houseflies** are **mechanical carriers** that transfer cysts from faeces to food and water.

**Malaria** — ***Plasmodium*** (*P. vivax*, *P. malariae*, *P. falciparum*; *P. falciparum* causes the most serious, malignant malaria). Vector: **female *Anopheles*** mosquito. **Life cycle (two hosts):**
1. An infected mosquito bites and injects **sporozoites** (infective stage).
2. Sporozoites multiply **asexually in liver cells**, then attack **red blood cells (RBCs)**, multiply there and burst them.
3. Bursting RBCs release the toxin **haemozoin**, which causes **chill and high fever**; in vivax malaria the bouts recur about every **48 hours** as RBCs burst together.
4. Some parasites develop into **gametocytes** in RBCs.
5. A female *Anopheles* takes up gametocytes with blood; **fertilisation** and development occur in the **mosquito’s stomach (gut) wall**.
6. **Sporozoites** formed there move to the mosquito’s **salivary glands**, ready to infect the next person.
The human is the **intermediate host** (asexual phase); the mosquito is the **definitive host** (sexual phase).

**Ascariasis** — the roundworm ***Ascaris lumbricoides*** in the intestine; internal bleeding, muscular pain, fever, **anaemia** and **blockage of the intestine**. Eggs passed in faeces contaminate soil, water and vegetables.

**Filariasis (elephantiasis)** — ***Wuchereria bancrofti*** and ***W. malayi***; live in **lymphatic vessels**, mostly of the **lower limbs**, causing chronic inflammation and gross swelling; genital organs may be affected. Spread by the bite of the **female *Culex*** mosquito.

**Ringworm** — fungi of the genera ***Microsporum***, ***Trichophyton*** and ***Epidermophyton***; **dry, scaly lesions** on skin, nails and scalp with intense **itching**; favoured by **heat and moisture** (groin, between toes); spread through soil and shared towels, clothes and combs.

**Prevention and control:** **personal hygiene** (clean body, safe food and water); **public hygiene** (proper disposal of waste and excreta, clean water reservoirs); for air-borne diseases, avoid close contact with patients; for **vector-borne** diseases, remove stagnant water, use **mosquito nets** and screens, spray insecticides and introduce **Gambusia** fish that feed on mosquito larvae; **vaccination** and **antibiotics**.`,
      [kt('Haemozoin', 'Toxin released when RBCs infected by Plasmodium burst; causes chill and fever.'), kt('Sporozoite', 'Infective stage of Plasmodium injected by the mosquito.'), kt('Gametocyte', 'Sexual stage of Plasmodium formed in RBCs and taken up by the mosquito.'), kt('Elephantiasis', 'Gross swelling of limbs due to filarial worms blocking lymph vessels.')],
      V.plasmodium,
      [2],
      [V.fever],
    ),
    sec(
      '3. Cancer',
      `**Cancer** is the uncontrolled division of cells. Normal cells show **contact inhibition**: contact with other cells stops their division. **Cancer cells lose contact inhibition**, divide continuously and form masses called **tumours**.

**Benign tumours** remain **confined** to their original location (often within a capsule), do not spread, and cause little damage. **Malignant tumours** are masses of proliferating **neoplastic** cells that grow rapidly, **invade** and damage surrounding tissue and compete with normal cells for nutrients. Cells sloughed from them reach distant sites through the **blood**, where they start new tumours: **metastasis**, the most feared property of malignant tumours. A tumour of about 10⁹ cells needs about **${DOUBLE}** doublings from one cell.

**Causes (carcinogens):** **physical** — **ionising** radiation (X-rays, gamma rays) and **non-ionising** UV light damage DNA; **chemical** — **tobacco smoke** (the major cause of lung cancer) and some industrial chemicals; **biological** — **oncogenic viruses** carrying **viral oncogenes**. Normal cells carry **proto-oncogenes (cellular oncogenes, c-onc)**; when activated under certain conditions they cause oncogenic transformation.

**Diagnosis:** **biopsy and histopathology** of tissue; **blood and bone-marrow tests** (increased cell counts in leukaemia); **radiography (X-rays)**, **computed tomography (CT)** and **magnetic resonance imaging (MRI)**; **antibodies against cancer-specific antigens**; **molecular biology** techniques to detect genes that make a person susceptible.

**Treatment:** **surgery**; **radiation therapy** (lethal irradiation of tumour cells, protecting normal tissue); **chemotherapy** (drugs, many with side effects such as hair loss and anaemia); **immunotherapy** with **biological response modifiers** such as **α-interferon**, which activate the immune system, since tumour cells often avoid detection.`,
      [kt('Contact inhibition', 'Stopping of cell division when cells touch their neighbours.'), kt('Metastasis', 'Spread of malignant tumour cells through blood to new sites.'), kt('Carcinogen', 'Agent that causes cancer.'), kt('Proto-oncogene', 'Normal cellular gene that can become a cancer-causing oncogene.')],
      V.tumour,
      [3],
      [V.contact],
    ),
    sec(
      '4. Allergies',
      `An **allergy** is the **exaggerated response of the immune system** to certain antigens present in the environment. The substances that cause it are **allergens** — common ones are **mites in dust, pollen and animal dander (fur and skin flakes)**.

The antibodies produced are of the **IgE** type. On a later exposure, allergens bind IgE on **mast cells**, which release chemicals such as **histamine and serotonin**.

**General symptoms:** **sneezing, watery eyes, running nose and difficulty in breathing** (as in asthma); skin rashes may occur.

**Relief:** drugs such as **anti-histamines, adrenaline and steroids** quickly reduce the symptoms. Modern, very protected lifestyles may lower immunity and increase sensitivity to allergens.`,
      [kt('Allergy', 'Exaggerated immune response to a harmless environmental antigen.'), kt('Allergen', 'Substance that causes an allergy, such as pollen or dust mites.'), kt('Histamine', 'Chemical released by mast cells, causing allergic symptoms.')],
      table(['Allergen', 'Common symptom'], [['Pollen', 'Sneezing, watery eyes'], ['Dust mites', 'Running nose, breathing difficulty'], ['Animal dander', 'Itchy eyes, wheezing']], 'Table of common allergens and symptoms'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the common cold infects the lungs (it affects the nose and airways).
- Calling Aedes the malaria vector (malaria: female Anopheles; dengue and chikungunya: Aedes; filariasis: female Culex).
- Saying houseflies cause amoebiasis (they are mechanical carriers).
- Naming haemoglobin instead of haemozoin as the malaria toxin.
- Calling ringworm a worm infection (it is fungal).
- Saying benign tumours metastasise (only malignant ones do).

**How marks are usually awarded**
- 1-mark subparts: an agent, a vector, a symptom, a test, a carcinogen.
- 2–3-mark questions: one disease in full; Widal test; benign vs malignant; causes or diagnosis of cancer; allergy.
- 5-mark questions in parts: life cycle of Plasmodium with diagram; comparison of diseases; cancer from cause to treatment.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Agent of the common cold?', 'Rhinoviruses.', 'fact', 1),
    fc(2, 'Does the common cold infect the lungs?', 'No: nose and respiratory passages only.', 'exam-tip', 1),
    fc(3, 'Vector of dengue and chikungunya?', 'Aedes mosquito (day-biting).', 'fact', 1),
    fc(4, 'Dengue sign seen in blood tests?', 'Fall in platelet count.', 'fact', 1),
    fc(5, 'Agent of typhoid?', 'Salmonella typhi.', 'fact', 1),
    fc(6, 'Test that confirms typhoid?', 'Widal test.', 'fact', 1),
    fc(7, 'Who was Typhoid Mary?', 'Mary Mallon, a cook who was a carrier.', 'fact', 1),
    fc(8, 'Agents of pneumonia?', 'Streptococcus pneumoniae, Haemophilus influenzae.', 'fact', 1),
    fc(9, 'Agent and vector of plague?', 'Yersinia pestis; rat flea.', 'fact', 1),
    fc(10, 'What is a Widal titre?', 'Highest serum dilution that agglutinates.', 'definition', 1),
    fc(11, 'Agent of amoebiasis?', 'Entamoeba histolytica.', 'fact', 2),
    fc(12, 'Role of houseflies in amoebiasis?', 'Mechanical carriers.', 'concept', 2),
    fc(13, 'Vector of malaria?', 'Female Anopheles mosquito.', 'fact', 2),
    fc(14, 'Infective stage of Plasmodium?', 'Sporozoite.', 'fact', 2),
    fc(15, 'Toxin causing malarial fever?', 'Haemozoin.', 'fact', 2),
    fc(16, 'Where does fertilisation of Plasmodium occur?', 'In the mosquito’s stomach wall.', 'fact', 2),
    fc(17, 'Most dangerous malaria parasite?', 'Plasmodium falciparum.', 'fact', 2),
    fc(18, 'Agent of ascariasis?', 'Ascaris lumbricoides.', 'fact', 2),
    fc(19, 'Agent and vector of filariasis?', 'Wuchereria; female Culex.', 'fact', 2),
    fc(20, 'Fungi causing ringworm?', 'Microsporum, Trichophyton, Epidermophyton.', 'fact', 2),
    fc(21, 'Fish used to control mosquito larvae?', 'Gambusia.', 'fact', 2),
    fc(22, 'What is contact inhibition?', 'Normal cells stop dividing on contact.', 'definition', 3),
    fc(23, 'What is metastasis?', 'Spread of malignant cells through blood to new sites.', 'definition', 3),
    fc(24, 'Benign vs malignant?', 'Confined vs invasive and spreading.', 'concept', 3),
    fc(25, 'Example of a chemical carcinogen?', 'Tobacco smoke.', 'fact', 3),
    fc(26, 'What are proto-oncogenes?', 'Normal genes that can become oncogenes.', 'definition', 3),
    fc(27, 'Surest test for cancer?', 'Biopsy and histopathology.', 'fact', 3),
    fc(28, 'Immunotherapy agent for cancer?', 'α-interferon.', 'fact', 3),
    fc(29, 'Antibody type in allergy?', 'IgE.', 'fact', 4),
    fc(30, 'Chemicals released by mast cells?', 'Histamine and serotonin.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
