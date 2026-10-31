// ISC 12 Biology ch12 Immunity, AIDS and Substance Abuse — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { ANTIBODY, RESPONSE, HIVCYCLE, ELISA, NEG, SAMPLES, RESULT } from './svgs.mjs';
import { series, peakIn, chains, packYears } from './calc.mjs';

export const V = {
  antibody: svgV(ANTIBODY, 'Y-shaped antibody with two heavy and two light chains'),
  response: svgV(RESPONSE, 'Primary and secondary antibody responses after two exposures'),
  hiv: svgV(HIVCYCLE, 'Replication of HIV inside a helper T-cell'),
  elisa: svgV(ELISA, 'ELISA plate with controls and six samples, positives marked'),
};

// ---------------------------------------------------------------- computed numbers
const PTS = series(70);
export const PEAK1 = peakIn(PTS, 0, 39);
export const PEAK2 = peakIn(PTS, 40, 70);
export const RATIO = Math.round((PEAK2 / PEAK1) * 10) / 10;
export const IGM = chains(5);
export const IGA = chains(2);
export const POSITIVES = SAMPLES.map((_, i) => (RESULT.positive[i] ? `S${i + 1}` : null)).filter(Boolean);
export const PY = packYears(15, 20);

export const deck1 = deck({
  part: 1,
  title: 'Immunity, AIDS and Substance Abuse — Part 1: Immunity',
  goals: [
    'Describe the physical, physiological, cellular and cytokine barriers of innate immunity',
    'Distinguish active and passive, and humoral and cell-mediated, immunity; name the lymphoid organs',
    'Describe antibody structure and the five classes of antibodies',
    'Explain vaccination, immunisation and autoimmunity',
  ],
  slides: [
    sl('title', 'Immunity', {
      b: 'Part 1 — how the body defends itself, from barriers we are born with to the targeted, remembering response we acquire.',
      v: flow('LR', [['i', 'Innate immunity (non-specific, present at birth)'], ['a', 'Acquired immunity (specific, with memory)'], ['v', 'Vaccination uses memory']], [['i', 'a'], ['a', 'v']], 'Flow from innate immunity to acquired immunity to vaccination'),
      n: 'Immunity is the ability of the body to fight disease-causing organisms. Some defences are present from birth and act against anything foreign. Others develop after we meet a particular pathogen, and remember it the next time.',
    }),
    sl('concept', 'Innate immunity: four kinds of barrier', {
      b: '**Innate immunity** is **non-specific** and present **at birth**.',
      v: table(['Barrier', 'Examples'], [['Physical', 'Skin; mucus lining the respiratory, digestive and urogenital tracts traps microbes'], ['Physiological', 'Acid in the stomach, saliva in the mouth, tears from the eyes'], ['Cellular', 'Leucocytes: neutrophils (PMNL), monocytes, natural killer cells; macrophages in tissues engulf microbes'], ['Cytokine', 'Virus-infected cells release interferons that protect nearby cells']], 'Table of the four barriers of innate immunity'),
      n: 'The skin is the main physical barrier. Acid in the stomach and enzymes in saliva and tears destroy microbes. White blood cells and macrophages swallow invaders, and infected cells send chemical signals that warn their neighbours.',
    }),
    sl('concept', 'Interferons', {
      b: '**Interferons** are proteins secreted by **virus-infected cells**. They act on **neighbouring, uninfected cells**, making them **resistant to further viral infection**. They are an example of the **cytokine barrier**.',
      v: table(['Point', 'Detail'], [['Made by', 'Cells infected with a virus'], ['Act on', 'Nearby healthy cells'], ['Effect', 'Block viral multiplication, limiting spread'], ['Use in medicine', 'α-interferon as a biological response modifier, for example in cancer therapy']], 'Table about interferons'),
      n: 'An infected cell may die, but before it does it releases interferons. These warn the cells around it, which then make proteins that stop the virus from multiplying if it arrives.',
    }),
    sl('diagram', 'Acquired immunity and memory', {
      b: '**Acquired immunity** is **specific** and has **memory**. The first encounter gives a **primary response** of **low intensity**; a later encounter with the same pathogen gives a highly intensified **secondary (anamnestic) response**.',
      v: V.response,
      n: 'After the first exposure, antibody levels rise slowly and stay low. Memory cells remain, so after a second exposure the response is faster and many times stronger. That memory is the basis of vaccination.',
    }),
    sl('example', 'Worked example 1: comparing the two responses', {
      b: 'From the graph, read the peak antibody levels of the primary and secondary responses, and find how many times stronger the secondary response is.',
      ul: [
        `Primary peak ≈ **${PEAK1}** units (days 0–39); secondary peak ≈ **${PEAK2}** units (days 40–70).`,
        r`Ratio $= \dfrac{${PEAK2}}{${PEAK1}} \approx ${RATIO}$.`,
        'The secondary response also **rises much faster**, because **memory B and T cells** are ready.',
      ],
      v: table(['Response', 'Peak (units)'], [['Primary', String(PEAK1)], ['Secondary', String(PEAK2)]], `Worked table: secondary response about ${RATIO} times the primary`),
      n: 'Reading the two peaks and dividing shows the second response is several times stronger, and it peaks within days rather than weeks. A vaccine aims to give us the first, mild response so that the real infection meets the strong second one.',
    }),
    sl('concept', 'Humoral and cell-mediated immunity', {
      b: 'Acquired immunity is carried out by two kinds of **lymphocytes**.',
      v: table(['Feature', 'Humoral (antibody-mediated)', 'Cell-mediated (CMI)'], [['Cells', 'B-lymphocytes', 'T-lymphocytes'], ['How it acts', 'Antibodies in blood and lymph neutralise antigens', 'T-cells attack infected cells and help B-cells'], ['Example', 'Response to bacterial toxins', 'Rejection of grafts and transplants']], 'Table comparing humoral and cell-mediated immunity'),
      n: 'B-cells release antibodies into body fluids, hence the name humoral. T-cells act directly. Because the body can tell self from non-self, a transplanted organ from a poorly matched donor is attacked by T-cells and rejected.',
    }),
    sl('concept', 'Active and passive immunity', {
      b: 'Immunity can be produced by the body itself or given ready-made.',
      v: table(['Feature', 'Active immunity', 'Passive immunity'], [['Antibodies', 'Made by the person’s own body', 'Received ready-made'], ['How gained', 'Natural infection or vaccination', 'Colostrum (IgA), placenta (IgG), injected antitoxin or antivenom'], ['Speed', 'Slow to develop', 'Immediate'], ['Duration', 'Long-lasting, with memory', 'Short-lived']], 'Table comparing active and passive immunity'),
      n: 'A child who has measles, or is vaccinated against it, develops active immunity. A baby fed colostrum, or a snake-bite victim given antivenom, receives passive immunity: immediate but temporary protection.',
    }),
    sl('concept', 'Lymphoid organs', {
      b: '**Lymphoid organs** are where lymphocytes form, mature and meet antigens.',
      v: table(['Type', 'Organs', 'Role'], [['Primary', 'Bone marrow, thymus', 'Lymphocytes are produced and mature into antigen-sensitive cells'], ['Secondary', 'Spleen, lymph nodes, tonsils, Peyer’s patches of the small intestine, appendix', 'Lymphocytes meet antigens and multiply'], ['MALT', 'Mucosa-associated lymphoid tissue of the respiratory, digestive and urogenital tracts', 'About half the lymphoid tissue of the body']], 'Table of primary and secondary lymphoid organs'),
      n: 'All lymphocytes are made in the bone marrow. T-cells mature in the thymus, which is large at birth and shrinks with age. Mature lymphocytes then move to secondary organs, such as lymph nodes and the spleen, where they meet antigens.',
    }),
    sl('check', 'Quick check: passive immunity', {
      b: 'Which is an example of passive immunity?',
      n: 'Quick check. Who made the antibodies: the person, or someone else?',
      chk: 'colostrum-mcq',
    }),
    sl('diagram', 'Antibody structure', {
      b: 'Each **antibody** is a **Y-shaped** protein of **four polypeptide chains**: **two heavy (H)** and **two light (L)** chains joined by **disulfide bonds** — written **H₂L₂**. The tips of the arms are the **antigen-binding sites**.',
      v: V.antibody,
      n: 'The two arms of the Y each bind an antigen, so one antibody can link two antigen particles. The stem determines the class of the antibody and how it interacts with other cells.',
    }),
    sl('concept', 'Five classes of antibodies', {
      b: 'Antibodies (immunoglobulins) are of five classes.',
      v: table(['Class', 'Occurrence and form', 'Main function'], [['IgG', 'Most abundant in blood (about 75–80 percent); monomer', 'Crosses the placenta; protects the foetus; secondary response'], ['IgA', 'In secretions: colostrum, saliva, tears, mucus; often a dimer', 'Protects body surfaces and the newborn’s gut'], ['IgM', 'Pentamer; largest', 'First antibody made in a primary response'], ['IgD', 'On the surface of B-cells', 'Antigen receptor that helps activate B-cells'], ['IgE', 'Least abundant; bound to mast cells', 'Allergic reactions; defence against parasitic worms']], 'Table of the five antibody classes with occurrence and function'),
      n: 'Remember them as G for the general blood antibody that crosses the placenta, A in secretions, M made first and largest, D on B-cells, and E in allergy and worm infections.',
    }),
    sl('example', 'Worked example 2: counting chains', {
      b: 'An IgM molecule is a pentamer of five basic antibody units, and secretory IgA is a dimer. How many heavy and light chains does each contain?',
      ul: [
        r`Each unit is $\mathrm{H_{2}L_{2}}$: 2 heavy + 2 light chains.`,
        r`IgM: $5 \times 2 = ${IGM.heavy}$ heavy and ${IGM.light} light chains, ${IGM.total} in all.`,
        r`IgA dimer: $2 \times 2 = ${IGA.heavy}$ heavy and ${IGA.light} light chains, ${IGA.total} in all.`,
      ],
      v: table(['Antibody', 'Units', 'Heavy', 'Light', 'Total'], [['IgG', '1', '2', '2', '4'], ['IgA (dimer)', '2', String(IGA.heavy), String(IGA.light), String(IGA.total)], ['IgM (pentamer)', '5', String(IGM.heavy), String(IGM.light), String(IGM.total)]], `Worked table: IgM has ${IGM.total} chains`),
      n: 'Multiply the number of basic units by two heavy and two light chains each. With ten antigen-binding arms, a single IgM molecule is very good at clumping antigens together, which suits its role early in an infection.',
    }),
    sl('concept', 'Vaccination, immunisation and autoimmunity', {
      b: '**Vaccination** introduces **inactivated or weakened pathogens** or their **antigenic proteins**, producing antibodies and **memory B and T cells**. **Immunisation** may be **active** (vaccines) or **passive** (ready-made antibodies such as anti-tetanus serum). **Autoimmunity** is when the immune system attacks **self** cells, as in **rheumatoid arthritis**.',
      v: table(['Term', 'Example'], [['Vaccine', 'Polio, measles, BCG; recombinant hepatitis B vaccine made in yeast'], ['Passive immunisation', 'Antitoxin for tetanus; antivenom for snake bite'], ['Autoimmune disease', 'Rheumatoid arthritis']], 'Table of vaccination, immunisation and autoimmunity examples'),
      n: 'A vaccine trains the immune system with a harmless version of the pathogen, so the real one meets a strong secondary response. Sometimes, because of genetic and other causes, the immune system loses its tolerance of self and attacks the body’s own cells.',
    }),
    sl('check', 'Quick check: antibody classes', {
      b: 'Which antibody crosses the placenta?',
      n: 'Quick check. It is the most abundant antibody in blood.',
      chk: 'igg-mcq',
    }),
    sl('check', 'Quick check: interferons', {
      b: 'Judge the assertion and the reason about interferons.',
      n: 'Quick check. Do interferons protect the infected cell, or its neighbours?',
      chk: 'interferon-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Innate: physical, physiological, cellular and cytokine (interferon) barriers.',
        'Acquired: specific, with memory; primary (low) and secondary (strong, fast) responses.',
        'Humoral (B-cells, antibodies) and cell-mediated (T-cells; graft rejection); active vs passive immunity.',
        'Primary lymphoid organs: bone marrow, thymus; secondary: spleen, lymph nodes, tonsils, Peyer’s patches, appendix, MALT.',
        'Antibody H₂L₂; IgG, IgA, IgM, IgD, IgE; vaccination, immunisation, autoimmunity.',
      ],
      v: table(['Class', 'Key fact'], [['IgG', 'Crosses placenta'], ['IgA', 'Colostrum, secretions'], ['IgM', 'First made; pentamer'], ['IgD', 'B-cell receptor'], ['IgE', 'Allergy']], 'Summary table of antibody classes'),
      n: 'To recap: innate barriers stop most invaders, and acquired immunity adds specific, remembered responses through B-cells and T-cells. Five classes of antibody play different roles, and vaccination uses immune memory to protect us.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **one example** for each of the four innate barriers.',
        'Compare **active vs passive** and **humoral vs cell-mediated** in table form.',
        'Draw the **antibody** with heavy and light chains, disulfide bonds and binding sites.',
        'Match each **Ig class** to its occurrence and function.',
      ],
      n: 'Exam tips. Learn an example for each innate barrier. Compare the kinds of acquired immunity in a table. Practise drawing and labelling an antibody. And link each antibody class to where it is found and what it does.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Immunity, AIDS and Substance Abuse — Part 2: AIDS, alcohol, smoking and drugs',
  goals: [
    'Describe HIV, its transmission, replication in the host, diagnosis by ELISA and prevention',
    'Give the sources and effects of opioids, cannabinoids, cocaine and barbiturates, and of alcohol and smoking',
    'Explain reasons for addiction and measures for its prevention and control',
  ],
  slides: [
    sl('title', 'AIDS and substance abuse', {
      b: 'Part 2 — a virus that destroys the immune system, and substances that damage body and mind.',
      v: flow('LR', [['h', 'HIV infection'], ['t', 'Helper T-cells destroyed'], ['o', 'Opportunistic infections'], ['p', 'Prevention by awareness']], [['h', 't'], ['t', 'o'], ['o', 'p']], 'Flow from HIV infection to loss of helper T-cells to opportunistic infections to prevention'),
      n: 'AIDS is not present at birth; it is acquired. It weakens the immune system by destroying the very cells that coordinate it. Drugs, alcohol and tobacco cause a different kind of harm, but both problems are best tackled by awareness and prevention.',
    }),
    sl('concept', 'AIDS and HIV', {
      b: '**AIDS (Acquired Immuno Deficiency Syndrome)**, first reported in **1981**, is caused by **HIV (Human Immunodeficiency Virus)**, a **retrovirus** with an **RNA** genome. There is a long **incubation period**, from a few months to many years (usually 5–10).',
      v: table(['Spread by', 'Not spread by'], [['Sexual contact with an infected person', 'Touch, hugging, sharing food'], ['Transfusion of contaminated blood', 'Mosquito bites'], ['Sharing infected needles and syringes', 'Coughs and sneezes'], ['Infected mother to child through the placenta', 'Swimming pools']], 'Table of ways HIV is and is not spread'),
      n: 'People at higher risk include those with multiple sexual partners, drug users who share needles, and those needing repeated blood transfusions. HIV does not spread by everyday contact, so people living with HIV should not be shunned.',
    }),
    sl('diagram', 'Replication of HIV in the host', {
      b: 'HIV enters **macrophages** and **helper T-lymphocytes (T_H cells)**. **Reverse transcriptase** copies its RNA into **viral DNA**, which is **integrated** into the host DNA. The infected cell then makes new viruses. Macrophages keep producing virus (an **HIV factory**), while helper T-cells are **destroyed**.',
      v: V.hiv,
      n: 'Because the virus writes its genes into the host’s own DNA, the infection cannot be cleared. As helper T-cells fall in number, the whole immune response weakens, and the patient falls ill with infections that a healthy person would resist.',
    }),
    sl('concept', 'Course of the disease', {
      b: 'As **helper T-cell numbers fall**, the person suffers **fever, diarrhoea and weight loss**, and then **opportunistic infections**.',
      v: table(['Stage', 'What happens'], [['Early infection', 'Few or no symptoms; HIV multiplies'], ['Latent period', 'Helper T-cell count falls slowly over years'], ['AIDS', 'Very low helper T-cell count; infections by Mycobacterium, viruses, fungi and Toxoplasma'], ['Treatment', 'Anti-retroviral drugs prolong life but do not cure']], 'Table of the course of HIV infection'),
      n: 'Opportunistic infections are caused by microbes that are normally kept in check. With the immune system weakened, tuberculosis, fungal infections and parasites like Toxoplasma can take hold.',
    }),
    sl('diagram', 'Diagnosis by ELISA', {
      b: '**ELISA (Enzyme-Linked Immunosorbent Assay)** detects **antibodies against HIV** in the blood. Antibodies bound in a well are revealed by an **enzyme-linked** second antibody that turns a substrate **coloured**; more colour means more antibody.',
      v: V.elisa,
      n: 'Each well holds a sample. Wells with HIV antibodies change colour, and a reader measures how much. Results are compared with a cut-off set from negative controls, and positives are usually confirmed by a second test.',
    }),
    sl('example', 'Worked example 1: reading an ELISA', {
      b: `Two negative controls gave absorbance ${NEG.join(' and ')}. The cut-off is 3 × their mean. Six samples gave ${SAMPLES.join(', ')}. Which are positive?`,
      ul: [
        r`Mean of negatives $= \dfrac{${NEG[0]} + ${NEG[1]}}{2} = ${Math.round(((NEG[0] + NEG[1]) / 2) * 1000) / 1000}$; cut-off $= 3 \times ${Math.round(((NEG[0] + NEG[1]) / 2) * 1000) / 1000} = ${RESULT.cutoff}$.`,
        `Samples **above ${RESULT.cutoff}**: **${POSITIVES.join(', ')}** are positive.`,
        `S5 (${SAMPLES[4]}) equals the cut-off but does not exceed it, so it is **not positive**; it would be retested.`,
      ],
      v: table(['Sample', 'Absorbance', 'Result'], SAMPLES.map((a, i) => [`S${i + 1}`, String(a), RESULT.positive[i] ? 'Positive' : 'Negative']), `Worked table: positives ${POSITIVES.join(', ')} above cut-off ${RESULT.cutoff}`),
      n: 'Compare each sample with the cut-off rather than with zero, because even negative wells give a little colour. A borderline result like sample five is repeated, and every positive is confirmed before anyone is told.',
    }),
    sl('concept', 'Prevention of AIDS', {
      b: 'There is **no cure** for AIDS, so **prevention** is the best option.',
      v: table(['Measure', 'Purpose'], [['Screening blood in blood banks', 'Prevents spread by transfusion'], ['Disposable needles and syringes', 'Prevents spread among drug users and in clinics'], ['Safe sex; free distribution of condoms', 'Prevents sexual transmission'], ['Awareness (NACO, NGOs; World AIDS Day, 1 December)', 'Education and reduced stigma'], ['Regular check-ups for high-risk groups', 'Early diagnosis and treatment']], 'Table of measures to prevent AIDS'),
      n: 'The National AIDS Control Organisation and many non-governmental organisations educate people about AIDS. Safe blood, sterile needles and safe sex break the main routes of spread.',
    }),
    sl('check', 'Quick check: HIV', {
      b: 'Which enzyme does HIV use to copy its RNA genome into DNA?',
      n: 'Quick check. Its name says that it reverses transcription.',
      chk: 'rt-hiv-mcq',
    }),
    sl('concept', 'Drugs of abuse', {
      b: 'Many drugs that are useful medicines are **misused** for their effects on the nervous system.',
      v: table(['Drug', 'Source', 'Effect'], [['Opioids (heroin, “smack”: diacetylmorphine)', 'Morphine from the latex of the poppy, Papaver somniferum', 'Depressant; binds opioid receptors in the brain and gut; slows body functions'], ['Cannabinoids (marijuana, hashish, charas, ganja)', 'Inflorescences of Cannabis sativa', 'Bind cannabinoid receptors in the brain; affect the heart and circulation'], ['Cocaine (coke, crack)', 'Coca plant, Erythroxylum coca', 'Stimulant; interferes with dopamine transport; euphoria; hallucinations in excess'], ['Barbiturates, amphetamines, benzodiazepines', 'Synthetic medicines', 'Prescribed for depression and insomnia; addictive when misused']], 'Table of drugs of abuse with sources and effects'),
      n: 'Heroin slows the body down, cocaine speeds it up, and cannabinoids alter perception and affect the heart. Medicines such as barbiturates help patients with insomnia or depression, but taken without medical supervision they become drugs of abuse.',
    }),
    sl('concept', 'Alcohol and smoking', {
      b: 'Alcohol and tobacco are legal but cause great harm.',
      v: table(['Substance', 'Effects'], [['Alcohol', 'Damages the liver (cirrhosis) and nervous system; heavy use in pregnancy harms the foetus; accidents and violence'], ['Tobacco (nicotine)', 'Nicotine stimulates release of adrenaline and noradrenaline, raising blood pressure and heart rate'], ['Smoking', 'Cancers of lung, throat and bladder; bronchitis, emphysema, heart disease, gastric ulcer'], ['Carbon monoxide in smoke', 'Binds haemoglobin, so less oxygen is carried']], 'Table of effects of alcohol and smoking'),
      n: 'Nicotine raises blood pressure and heart rate, and smoke delivers carbon monoxide and carcinogens to the lungs. Chewing tobacco raises the risk of mouth cancer. Alcohol, used heavily for years, scars the liver and damages nerves.',
    }),
    sl('example', 'Worked example 2: pack-years', {
      b: 'Doctors measure smoking exposure in **pack-years** = (cigarettes per day ÷ 20) × years smoked. A man smoked 15 cigarettes a day for 20 years. Find his pack-years.',
      ul: [
        r`Packs per day $= \dfrac{15}{20} = 0.75$.`,
        r`Pack-years $= 0.75 \times 20 = ${PY}$.`,
        'The risk of lung cancer and heart disease rises with pack-years; stopping smoking lowers it over time.',
      ],
      v: table(['Quantity', 'Value'], [['Cigarettes per day', '15'], ['Years', '20'], ['Pack-years', String(PY)]], `Worked table: ${PY} pack-years`),
      n: 'A pack holds twenty cigarettes, so fifteen a day is three quarters of a pack. Over twenty years that is fifteen pack-years, a level linked with a clearly raised risk of lung disease.',
    }),
    sl('concept', 'Addiction: reasons, dependence and prevention', {
      b: 'Most users first try drugs, alcohol or tobacco in **adolescence**. Repeated use leads to **addiction** and **dependence**; stopping suddenly causes **withdrawal symptoms**.',
      v: table(['Reasons for first use', 'Prevention and control'], [['Curiosity, adventure, excitement, experimentation', 'Avoid undue peer pressure; let children follow their own interests'], ['Peer pressure; wish to look “grown up”', 'Education and counselling about the effects'], ['Escape from stress, failure or family problems', 'Seek help from parents and trusted peers'], ['Family history or easy availability', 'Watch for danger signs; professional and medical help, de-addiction centres']], 'Table of reasons for addiction and measures for prevention'),
      n: 'Danger signs include falling grades, withdrawal from family and friends, and changes in sleep and appetite. Parents and teachers who notice early, and who listen rather than blame, can help a young person get counselling and medical help.',
    }),
    sl('check', 'Quick check: drugs', {
      b: 'Which drug is obtained from the latex of the poppy plant?',
      n: 'Quick check. It is processed into heroin.',
      chk: 'poppy-mcq',
    }),
    sl('check', 'Quick check: smoking', {
      b: 'Judge the assertion and the reason about smoking.',
      n: 'Quick check. What does carbon monoxide do to haemoglobin?',
      chk: 'co-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'AIDS: HIV, a retrovirus; spread by sex, blood, needles, mother to child; not by touch.',
        'HIV: reverse transcriptase, integration into host DNA; macrophages as HIV factories; helper T-cells destroyed; opportunistic infections.',
        'Diagnosis by ELISA; prevention by safe blood, disposable needles, safe sex, awareness (NACO).',
        'Opioids (poppy), cannabinoids (Cannabis), cocaine (coca), barbiturates; alcohol and tobacco.',
        'Addiction begins in adolescence; prevent by education, counselling, family support and medical help.',
      ],
      v: table(['Substance', 'Source'], [['Heroin', 'Papaver somniferum'], ['Cannabinoids', 'Cannabis sativa'], ['Cocaine', 'Erythroxylum coca'], ['Nicotine', 'Tobacco']], 'Summary table of substances and sources'),
      n: 'To recap: HIV destroys helper T-cells and is diagnosed by ELISA, and prevention depends on safe practices and awareness. Drugs, alcohol and tobacco have specific sources and damaging effects, and addiction is best prevented through education and support.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe **HIV replication** in steps, naming **reverse transcriptase** and **helper T-cells**.',
        'State **ELISA** in full and what it detects.',
        'Give **source and effect** for each drug.',
        'List **reasons** for addiction and **measures** to prevent it.',
      ],
      n: 'Exam tips. Describe how HIV multiplies, step by step. Expand ELISA and say what it detects. Give the source and effect of each drug. And learn the reasons for addiction alongside the ways to prevent it.',
    }),
  ],
});
