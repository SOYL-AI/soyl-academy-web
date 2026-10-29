// ch07 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Human Health and Disease — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Health and common diseases',
      `**Health** is a state of complete physical, mental and social well-being. It is affected by **genetic disorders**, **infections** and **lifestyle** (food and water, rest and exercise, habits). Disease-causing organisms are **pathogens**.

| Disease | Pathogen | Main symptoms | Spread |
|---|---|---|---|
| Typhoid | *Salmonella typhi* (bacterium) | Sustained high fever (39–40 °C), weakness, stomach pain, constipation, headache, loss of appetite; intestinal perforation in severe cases; **Widal test** | Contaminated food and water |
| Pneumonia | *Streptococcus pneumoniae*, *Haemophilus influenzae* | Alveoli fill with fluid; fever, chills, cough, headache; lips and nails grey to bluish in severe cases | Droplets, aerosols, shared glasses and utensils |
| Common cold | Rhinoviruses | Nose and respiratory passage (not lungs); congestion, discharge, sore throat, hoarseness, cough, headache; 3–7 days | Droplets; contaminated objects |
| Dengue | Dengue virus | High fever, severe headache, pain behind the eyes, muscle and joint pain, rash; bleeding when severe | *Aedes* mosquitoes |
| Chikungunya | Chikungunya virus | Fever with severe joint pain | *Aedes* mosquitoes |
| Malaria | *Plasmodium* (*P. vivax*, *P. malariae*, *P. falciparum*) | Haemozoin from burst RBCs: chill and high fever every 3–4 days; *P. falciparum* malignant | Female *Anopheles* mosquito |
| Amoebiasis | *Entamoeba histolytica* | Constipation, abdominal pain, cramps, stools with mucus and blood clots | Contaminated food and water; houseflies as carriers |
| Ascariasis | *Ascaris* (roundworm) | Internal bleeding, muscular pain, fever, anaemia, intestinal blockage | Eggs from faeces contaminate soil, water, vegetables |
| Filariasis (elephantiasis) | *Wuchereria bancrofti*, *W. malayi* | Chronic inflammation of lymphatic vessels of lower limbs; genital deformity | Bite of female mosquito vectors |
| Ringworm | *Microsporum*, *Trichophyton*, *Epidermophyton* (fungi) | Dry scaly lesions on skin, nails, scalp; intense itching; heat and moisture help | Soil; shared towels, clothes, combs |`,
      [kt('Pathogen', 'An organism that causes disease.'), kt('Haemozoin', 'Toxic substance released when RBCs infected with Plasmodium burst, causing chill and fever.')],
      table(['Pathogen group', 'Diseases'], [['Bacteria', 'Typhoid, pneumonia'], ['Viruses', 'Common cold, dengue, chikungunya'], ['Protozoans', 'Malaria, amoebiasis'], ['Helminths', 'Ascariasis, filariasis'], ['Fungi', 'Ringworm']], 'Table of pathogen groups and diseases'),
      [1],
    ),
    sec(
      '2. Malaria life cycle; prevention and control',
      `**Plasmodium** needs two hosts. Female *Anopheles* injects **sporozoites** → multiply in **liver cells** → attack **RBCs**, multiply, burst them (haemozoin: chill and fever every 3–4 days) → **gametocytes** form in RBCs → taken up by a female *Anopheles* → **fertilisation and development in the mosquito's stomach wall** → sporozoites stored in the **salivary glands** → injected at the next bite.

**Prevention and control:**
- **Personal hygiene:** clean body; safe drinking water, food, vegetables and fruits.
- **Public hygiene:** proper disposal of waste and excreta; periodic cleaning and disinfection of water reservoirs, pools, cesspools and tanks; standard practices in public catering.
- **Air-borne diseases:** avoid close contact with infected persons and their belongings.
- **Vector-borne diseases** (malaria, filariasis, dengue, chikungunya): avoid stagnant water near homes; clean household coolers regularly; use mosquito nets; introduce **Gambusia** fish that feed on mosquito larvae; spray insecticides in ditches, drainage areas and swamps; fit wire mesh on doors and windows.
- **Vaccination** and modern medicines have controlled many diseases; smallpox has been eradicated.`,
      [kt('Vector', 'An organism, such as a mosquito, that carries a pathogen from one host to another.'), kt('Gambusia', 'A fish that eats mosquito larvae; used in biological control.')],
      V.plasmodium,
      [1],
    ),
    sec(
      '3. Immunity',
      `**Innate immunity** (non-specific, present at birth): **physical** barriers (skin, mucus of respiratory, gastrointestinal and urogenital tracts); **physiological** (stomach acid, saliva, tears); **cellular** (PMNL-neutrophils, monocytes, natural killer lymphocytes, macrophages); **cytokine** (interferons from virus-infected cells).

**Acquired immunity** (pathogen-specific, with **memory**): primary response of low intensity; **secondary (anamnestic)** response highly intensified. **B-lymphocytes** produce **antibodies** (humoral immunity); **T-lymphocytes** help B cells and mediate **cell-mediated immunity** (CMI), which is responsible for **graft rejection** (hence tissue and blood-group matching and immunosuppressants).

**Antibody:** four polypeptide chains, two heavy and two light (**H₂L₂**); IgA, IgM, IgE, IgG.

**Active immunity:** the host makes antibodies after exposure to antigens (infection or vaccine); slow, long-lasting. **Passive immunity:** ready-made antibodies given — colostrum (IgA), antibodies through the placenta, anti-tetanus serum, snake antivenom; quick, short-lived.

**Vaccination:** antigenic proteins or inactivated/weakened pathogens produce memory B and T cells; a later exposure gives a rapid, massive response. **Recombinant DNA** technology allows antigens to be produced in bacteria or yeast (hepatitis B vaccine from yeast).

**Allergy:** exaggerated response to allergens (dust mites, pollen, animal dander); **IgE**; mast cells release **histamine and serotonin**; treated with anti-histamines, adrenalin, steroids. **Autoimmunity:** attack on self cells, e.g. **rheumatoid arthritis**.

**Lymphoid organs:** primary — **bone marrow, thymus**; secondary — **spleen, lymph nodes, tonsils, Peyer's patches, appendix**; **MALT** forms about half the lymphoid tissue.`,
      [kt('Antibody', 'Y-shaped protein of two heavy and two light chains that binds a specific antigen.'), kt('Active immunity', 'Immunity produced by the body’s own antibodies after exposure to an antigen.'), kt('Passive immunity', 'Immunity from ready-made antibodies given to the body.'), kt('Vaccine', 'Preparation of antigens or weakened or inactivated pathogens that induces immunity.')],
      V.antibody,
      [2],
      [V.response],
    ),
    sec(
      '4. AIDS',
      `**AIDS** (Acquired Immuno Deficiency Syndrome), first reported in **1981**, is caused by **HIV**, a **retrovirus** with an RNA genome. **Transmission:** sexual contact with an infected person; transfusion of contaminated blood or blood products; sharing infected needles; infected mother to child through the placenta. Not by casual contact. Time lag of **5–10 years** from infection to symptoms.

**How it acts:** HIV enters **macrophages**; RNA → viral DNA by **reverse transcriptase**; viral DNA incorporated into host DNA; infected cells make virus particles (macrophage as an **HIV factory**); HIV enters **helper T-lymphocytes**, replicates and destroys them; their number falls; immunodeficiency leads to **opportunistic infections** (Mycobacterium, viruses, fungi, *Toxoplasma*).

**Diagnosis:** **ELISA**. **Treatment:** antiretroviral drugs (partly effective; prolong life). **Prevention:** NACO and other organisations; disposable needles and syringes; screening of blood; condoms and safe practices; control of drug abuse; regular check-ups for susceptible groups; awareness and acceptance rather than stigma.`,
      [kt('Retrovirus', 'A virus with an RNA genome that is copied into DNA by reverse transcriptase.'), kt('Opportunistic infection', 'Infection by organisms that a healthy immune system would normally control.')],
      flow('LR', [['m', 'Macrophage infected'], ['r', 'Reverse transcription'], ['h', 'Helper T cells destroyed'], ['o', 'Opportunistic infections']], [['m', 'r'], ['r', 'h'], ['h', 'o']], 'Flow of HIV infection to AIDS'),
      [3],
    ),
    sec(
      '5. Cancer',
      `Normal cells show **contact inhibition**; cancer cells lose it and divide uncontrollably, forming **tumours**. **Benign** tumours stay confined and cause little damage. **Malignant** tumours grow rapidly, invade surrounding tissues and spread to distant sites through blood (**metastasis**).

**Causes (carcinogens):** physical — ionising radiations (X-rays, gamma rays) and non-ionising UV; chemical — tobacco smoke (major cause of lung cancer); biological — oncogenic viruses with viral oncogenes. **Cellular oncogenes (c-onc, proto-oncogenes)** in normal cells can be activated and cause cancer.

**Detection:** biopsy and histopathology; blood and bone marrow tests (leukaemia); radiography, CT (computed tomography) and MRI (magnetic resonance imaging); antibodies against cancer-specific antigens; molecular techniques to detect genes for inherited susceptibility.

**Treatment:** surgery, radiation therapy, chemotherapy (side effects such as hair loss and anaemia), immunotherapy with **biological response modifiers** such as **α-interferon**; usually a combination.`,
      [kt('Contact inhibition', 'Property of normal cells by which contact with other cells stops their division.'), kt('Metastasis', 'Spread of cancer cells through the blood to form new tumours at distant sites.'), kt('Carcinogen', 'An agent that causes cancer.')],
      table(['', 'Benign', 'Malignant'], [['Spread', 'Confined', 'Invades; metastasis'], ['Damage', 'Little', 'Severe']], 'Table comparing benign and malignant tumours'),
      [3],
    ),
    sec(
      '6. Drugs and alcohol abuse',
      `**Commonly abused drugs:**
- **Opioids** bind opioid receptors in the CNS and gut. **Heroin** (smack, diacetylmorphine) is made by acetylation of **morphine** from the latex of the poppy (*Papaver somniferum*); a depressant that slows body functions.
- **Cannabinoids** (marijuana, hashish, charas, ganja) from *Cannabis sativa*; affect the cardiovascular system.
- **Cocaine** from *Erythroxylum coca*; interferes with **dopamine** transport; stimulation and euphoria; excessive doses cause hallucinations. Other hallucinogens: *Atropa belladonna*, *Datura*. Medicines such as barbiturates, amphetamines and benzodiazepines are also misused.

**Tobacco:** **nicotine** stimulates the adrenal gland to release **adrenaline and nor-adrenaline**, raising blood pressure and heart rate. Smoking causes cancers of lung, urinary bladder and throat, bronchitis, emphysema, coronary heart disease and gastric ulcer; **CO** reduces oxygen bound to haemoglobin. Chewing tobacco causes oral cancer.

**Adolescence (12–18 years):** curiosity, adventure, experimentation, stress, peer pressure, media. Repeated use → **addiction** and **dependence**, with a **withdrawal syndrome** (anxiety, shakiness, nausea, sweating). **Effects:** reckless behaviour, vandalism, violence; overdose may cause coma and death; shared needles spread HIV and hepatitis B; chronic alcohol damages the nervous system and liver (cirrhosis) and harms the foetus. Misuse of **anabolic steroids** in sport causes hormonal and organ damage.

**Prevention:** avoid undue peer pressure; education and counselling; help from parents and peers; looking for danger signs; professional and medical help (de-addiction and rehabilitation).`,
      [kt('Addiction', 'Psychological attachment to the effects of a drug or alcohol.'), kt('Dependence', 'The body’s need for a drug, shown by withdrawal symptoms when it is stopped.'), kt('Withdrawal syndrome', 'Unpleasant symptoms (anxiety, shakiness, nausea, sweating) when regular drug use stops.')],
      table(['Drug', 'Source'], [['Heroin (via morphine)', 'Poppy, Papaver somniferum'], ['Cannabinoids', 'Cannabis sativa'], ['Cocaine', 'Erythroxylum coca']], 'Table of drugs and their plant sources'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying ringworm is caused by a worm (it is a fungal infection).
- Naming the male mosquito, or Culex, as the malaria vector (it is the female Anopheles).
- Saying HIV destroys B cells (it destroys helper T cells, after infecting macrophages).
- Mixing up active and passive immunity.
- Describing benign tumours as spreading (only malignant tumours metastasise).
- Saying nicotine lowers blood pressure.

**How marks are usually awarded**
- 1-mark items: pathogen, vector, test, term or example.
- 2–3-mark answers: cause + symptom + prevention; mechanism steps in order; comparison points.
- 5-mark answers: life cycle of Plasmodium, HIV and AIDS, or cancer (causes, detection, treatment), with a diagram or flow chart.
- Case-based items: outbreak data, antibody graphs or survey numbers, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define health.', 'A state of complete physical, mental and social well-being.', 'definition', 1),
    fc(2, 'Typhoid: pathogen and test?', 'Salmonella typhi; Widal test.', 'fact', 1),
    fc(3, 'Pneumonia: pathogens and organ?', 'Streptococcus pneumoniae, Haemophilus influenzae; alveoli of the lungs.', 'fact', 1),
    fc(4, 'Common cold: pathogen?', 'Rhinoviruses (nose and respiratory passage, not lungs).', 'fact', 1),
    fc(5, 'Dengue and chikungunya vector?', 'Aedes mosquitoes.', 'fact', 1),
    fc(6, 'Malaria: pathogen and vector?', 'Plasmodium; female Anopheles mosquito.', 'fact', 1),
    fc(7, 'What causes the chill and fever of malaria?', 'Haemozoin released when infected RBCs burst.', 'concept', 1),
    fc(8, 'Where does Plasmodium fertilisation occur?', 'In the stomach wall of the female Anopheles mosquito.', 'fact', 1),
    fc(9, 'Amoebiasis: pathogen and carrier?', 'Entamoeba histolytica; houseflies carry it.', 'fact', 1),
    fc(10, 'Filariasis: pathogen and organ?', 'Wuchereria; lymphatic vessels of the lower limbs.', 'fact', 1),
    fc(11, 'Ringworm: cause?', 'Fungi: Microsporum, Trichophyton, Epidermophyton.', 'fact', 1),
    fc(12, 'Biological control of mosquito larvae?', 'Gambusia fish.', 'example', 1),
    fc(13, 'Four barriers of innate immunity?', 'Physical, physiological, cellular, cytokine.', 'concept', 2),
    fc(14, 'Humoral vs cell-mediated immunity?', 'Antibodies from B cells vs action of T cells.', 'concept', 2),
    fc(15, 'Antibody structure?', 'H₂L₂: two heavy and two light chains.', 'diagram', 2),
    fc(16, 'Active vs passive immunity?', 'Own antibodies (slow, lasting) vs ready-made antibodies (quick, short).', 'concept', 2),
    fc(17, 'Example of passive immunity?', 'IgA in colostrum; anti-tetanus serum; snake antivenom.', 'example', 2),
    fc(18, 'How do vaccines work?', 'They produce memory B and T cells, so a later infection gets a fast, strong response.', 'concept', 2),
    fc(19, 'Allergy: antibody and chemicals?', 'IgE; histamine and serotonin from mast cells.', 'fact', 2),
    fc(20, 'Primary vs secondary lymphoid organs?', 'Bone marrow, thymus vs spleen, lymph nodes, tonsils, Peyer’s patches, appendix.', 'fact', 2),
    fc(21, 'HIV enzyme that copies RNA into DNA?', 'Reverse transcriptase.', 'fact', 3),
    fc(22, 'Which cells does HIV destroy?', 'Helper T-lymphocytes.', 'fact', 3),
    fc(23, 'Test for HIV?', 'ELISA.', 'fact', 3),
    fc(24, 'What property do cancer cells lose?', 'Contact inhibition.', 'concept', 3),
    fc(25, 'Benign vs malignant?', 'Confined vs invasive with metastasis.', 'concept', 3),
    fc(26, 'Three types of carcinogens?', 'Physical (radiation), chemical (tobacco smoke), biological (oncogenic viruses).', 'concept', 3),
    fc(27, 'Immunotherapy agent for cancer?', 'α-interferon (a biological response modifier).', 'fact', 3),
    fc(28, 'Source of heroin?', 'Morphine from the latex of the poppy (Papaver somniferum).', 'fact', 4),
    fc(29, 'How does nicotine act?', 'Stimulates the adrenal gland to release adrenaline and nor-adrenaline.', 'concept', 4),
    fc(30, 'Withdrawal symptoms?', 'Anxiety, shakiness, nausea, sweating.', 'fact', 4),
    fc(31, 'Chronic alcohol damages which organ?', 'Liver (cirrhosis) and the nervous system.', 'fact', 4),
    fc(32, 'Ways to prevent drug abuse?', 'Avoid peer pressure, education and counselling, help from parents and peers, watch danger signs, professional help.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
