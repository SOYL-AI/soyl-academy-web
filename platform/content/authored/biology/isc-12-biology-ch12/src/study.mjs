// ISC 12 Biology ch12 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, PEAK1, PEAK2, IGM } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Immunity, AIDS and Substance Abuse — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Innate immunity',
      `**Immunity** is the overall ability of the host to fight disease-causing organisms. **Innate immunity** is **non-specific** and **present at birth**. It consists of four kinds of barriers:
1. **Physical barriers** — **skin** prevents entry of microbes; **mucus** lining the respiratory, gastrointestinal and urogenital tracts traps microbes.
2. **Physiological barriers** — **acid in the stomach**, **saliva** in the mouth and **tears** from the eyes prevent microbial growth.
3. **Cellular barriers** — certain **leucocytes**: **polymorpho-nuclear leucocytes (PMNL-neutrophils)**, **monocytes** and **natural killer** lymphocytes in blood, and **macrophages** in tissues, **phagocytose** and destroy microbes.
4. **Cytokine barriers** — **virus-infected cells** secrete proteins called **interferons**, which protect **non-infected cells** from further viral infection.

**Interferons** limit the spread of viruses; α-interferon is also used as a biological response modifier in cancer treatment.`,
      [kt('Innate immunity', 'Non-specific defence present at birth.'), kt('Interferons', 'Proteins secreted by virus-infected cells that protect neighbouring cells from viral infection.'), kt('Phagocytosis', 'Engulfing and destroying of microbes by cells such as macrophages.')],
      table(['Barrier', 'Example'], [['Physical', 'Skin, mucus'], ['Physiological', 'Stomach acid, saliva, tears'], ['Cellular', 'Neutrophils, monocytes, NK cells, macrophages'], ['Cytokine', 'Interferons']], 'Table of innate barriers with examples'),
      [1],
    ),
    sec(
      '2. Acquired immunity and lymphoid organs',
      `**Acquired immunity** is **pathogen-specific** and is characterised by **memory**. The first encounter produces a **primary response** of **low intensity**; a subsequent encounter with the same pathogen produces a highly intensified **secondary (anamnestic) response** (in the model graph, peaks of about ${PEAK1} and ${PEAK2} units).

Two kinds of **lymphocytes** carry it out:
- **B-lymphocytes** produce **antibodies** into blood and lymph — **humoral (antibody-mediated) immune response**.
- **T-lymphocytes** do not secrete antibodies but help B-cells and attack infected cells — **cell-mediated immunity (CMI)**. CMI is responsible for **graft rejection**: the body distinguishes **self from non-self**, so tissue and blood-group matching are essential before transplants, and patients take **immunosuppressants**.

**Active immunity** — the host’s own body produces antibodies on exposure to antigens (live or dead microbes or proteins), by **natural infection** or **vaccination**; it is **slow** but **long-lasting**.
**Passive immunity** — **ready-made antibodies** are given: **colostrum** supplies **IgA** to the newborn; the foetus receives **IgG** through the **placenta**; injected **antitoxins** (tetanus) and **antivenom** (snake bite). It is **immediate** but **short-lived**.

**Lymphoid organs:** **primary** — **bone marrow** (all blood cells, including lymphocytes, are produced) and **thymus** (T-lymphocytes mature; it is large at birth and shrinks with age); lymphocytes become antigen-sensitive here. **Secondary** — **spleen** (filters blood, reservoir of erythrocytes), **lymph nodes** (trap microbes in lymph), **tonsils**, **Peyer’s patches** of the small intestine and the **appendix**; here lymphocytes interact with antigens and proliferate. **MALT** (mucosa-associated lymphoid tissue) lines the respiratory, digestive and urogenital tracts and makes up about **50 percent** of lymphoid tissue.`,
      [kt('Acquired immunity', 'Specific defence that develops after exposure and has memory.'), kt('Humoral immunity', 'Antibody-mediated defence by B-lymphocytes.'), kt('Cell-mediated immunity', 'Defence by T-lymphocytes; responsible for graft rejection.'), kt('Passive immunity', 'Protection by ready-made antibodies.')],
      V.response,
      [2],
    ),
    sec(
      '3. Antibodies, vaccination and autoimmunity',
      `**Antibody structure:** each antibody molecule has **four polypeptide chains** — **two heavy** and **two light** — joined by **disulfide bonds**, written **H₂L₂**. The molecule is **Y-shaped**; the tips of its arms are **antigen-binding sites**.

**Classes of antibodies (immunoglobulins):**
- **IgG** — most abundant in serum (about 75–80 percent); monomer; **crosses the placenta**, giving passive immunity to the foetus; main antibody of the secondary response.
- **IgA** — in body **secretions**: **colostrum**, saliva, tears, mucus; usually a dimer; protects body surfaces and the newborn’s gut.
- **IgM** — **pentamer** (5 units, ${IGM.total} chains), the largest; **first** antibody formed in a primary response; efficient at agglutination.
- **IgD** — on the **surface of B-cells**; acts as an **antigen receptor** that helps activate B-cells.
- **IgE** — least abundant; binds **mast cells** and basophils; involved in **allergic reactions** and defence against **parasitic worms**.

**Vaccination and immunisation:** a vaccine is a preparation of **antigenic proteins** of a pathogen or **inactivated/weakened** pathogen. It generates antibodies and **memory B and T cells**, so the real pathogen meets a rapid, intense secondary response. **Recombinant DNA technology** produces antigenic polypeptides in bacteria or yeast (for example the **hepatitis B vaccine** made in yeast). **Active immunisation** uses vaccines; **passive immunisation** gives pre-formed antibodies or antitoxins (tetanus antitoxin, snake antivenom) when a quick response is needed.

**Autoimmunity:** due to genetic and other unknown reasons, the body sometimes attacks **self-cells**, resulting in damage — **autoimmune diseases** such as **rheumatoid arthritis**.`,
      [kt('H₂L₂', 'Two heavy and two light chains of an antibody.'), kt('IgG', 'Most abundant antibody; crosses the placenta.'), kt('Vaccine', 'Preparation of antigens that induces immunity and memory.'), kt('Autoimmunity', 'Immune attack on the body’s own cells.')],
      V.antibody,
      [3],
    ),
    sec(
      '4. AIDS',
      `**AIDS (Acquired Immuno Deficiency Syndrome)** is a deficiency of the immune system acquired during life; first reported in **1981**, it has spread worldwide. It is caused by **HIV (Human Immunodeficiency Virus)**, a **retrovirus** with an **RNA** genome and an envelope.

**Transmission:** (a) **sexual contact** with an infected person; (b) **transfusion of contaminated blood** and blood products; (c) **sharing infected needles** (intravenous drug users); (d) from **infected mother to child through the placenta**. It does **not** spread by touch or physical contact. There is a long **incubation period** (a few months to many years, usually 5–10).

**Replication of HIV:** the virus enters **macrophages**, where its **RNA** is copied into **viral DNA** by **reverse transcriptase**. The viral DNA is **integrated into the host cell’s DNA** and directs the infected cell to make virus particles; the macrophage continues to produce virus — an **HIV factory**. HIV also enters **helper T-lymphocytes (T_H)**, replicates and produces progeny viruses that attack other helper T-cells. The **number of helper T-lymphocytes falls progressively**; the patient has **fever, diarrhoea and weight loss**, and becomes prone to **opportunistic infections** by bacteria (*Mycobacterium*), viruses, fungi and parasites such as *Toxoplasma*.

**Diagnosis:** **ELISA (Enzyme-Linked Immunosorbent Assay)** detects antibodies against HIV; the colour produced in a well is compared with a cut-off from negative controls.

**Treatment and prevention:** **anti-retroviral drugs** are only partially effective, prolonging life. Prevention: **NACO** and NGOs educate people; **blood is screened** in blood banks; **disposable needles and syringes**; **free distribution of condoms**; avoiding drug abuse; regular check-ups for susceptible groups; **World AIDS Day** on **1 December**.`,
      [kt('Retrovirus', 'RNA virus that copies its genome into DNA with reverse transcriptase.'), kt('Opportunistic infection', 'Infection by microbes that a healthy immune system would control.'), kt('ELISA', 'Enzyme-Linked Immunosorbent Assay; used to detect HIV antibodies.')],
      V.hiv,
      [4],
      [V.elisa],
    ),
    sec(
      '5. Alcohol, smoking and drugs',
      `**Commonly abused drugs:**
- **Opioids** bind **opioid receptors** in the central nervous system and gastrointestinal tract. **Heroin** (“smack”, **diacetylmorphine**) is a white, odourless, bitter crystalline compound made by acetylation of **morphine**, extracted from the **latex of the poppy, *Papaver somniferum***. It is a **depressant** and slows down body functions.
- **Cannabinoids** interact with **cannabinoid receptors** in the brain. Natural cannabinoids come from the **inflorescences of *Cannabis sativa***; marijuana, hashish, charas and ganja are inhaled or taken orally and affect the **cardiovascular system**.
- **Cocaine** (coke, crack) comes from the **coca plant, *Erythroxylum coca***, native to South America. It **interferes with the transport of dopamine** and has a potent **stimulating** action on the CNS, producing euphoria and increased energy; excessive doses cause **hallucinations**.
- **Barbiturates, amphetamines, benzodiazepines** and similar drugs, normally used as medicines for **depression and insomnia**, are often abused. Plants such as *Atropa belladonna* and *Datura* have hallucinogenic properties.

**Tobacco and smoking:** tobacco contains **nicotine**, an alkaloid that stimulates the **adrenal gland** to release **adrenaline and noradrenaline**, raising **blood pressure and heart rate**. Smoking is associated with cancers of the **lung, urinary bladder and throat**, **bronchitis, emphysema, coronary heart disease** and **gastric ulcer**; tobacco chewing with **oral cancer**. Smoke raises **carbon monoxide** in blood, reducing the oxygen carried by haemoglobin.

**Alcohol:** chronic use damages the **nervous system** and **liver (cirrhosis)**; use during pregnancy harms the **foetus**.

**Adolescence and addiction:** reasons include **curiosity, adventure, excitement, experimentation**, **peer pressure**, escape from **stress and failure**, family history and the false perception that it is “cool”. Repeated use causes **addiction** (psychological attachment) and **dependence**: when intake is stopped abruptly, **withdrawal syndrome** (anxiety, shakiness, nausea, sweating) appears.

**Prevention and control:** avoid **undue peer pressure**; **education and counselling**; **seek help from parents and peers**; look for **danger signs** (falling grades, withdrawal, changes in sleep and appetite); **professional and medical help** from de-addiction and rehabilitation centres.`,
      [kt('Opioid', 'Drug such as heroin that binds opioid receptors; a depressant.'), kt('Withdrawal syndrome', 'Unpleasant symptoms when a dependent person stops a drug abruptly.'), kt('Nicotine', 'Alkaloid in tobacco that raises blood pressure and heart rate.')],
      table(['Drug', 'Source', 'Action'], [['Heroin', 'Poppy latex (morphine)', 'Depressant'], ['Cannabinoids', 'Cannabis sativa', 'Affect heart and perception'], ['Cocaine', 'Erythroxylum coca', 'Stimulant; blocks dopamine transport']], 'Table of drugs with source and action'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling interferons antibodies (they are cytokines from virus-infected cells).
- Saying T-cells make antibodies (B-cells do; T-cells mediate CMI).
- Mixing primary (bone marrow, thymus) and secondary lymphoid organs.
- Saying IgA crosses the placenta (IgG does; IgA is in colostrum).
- Saying HIV is spread by touch or mosquitoes.
- Calling heroin a stimulant (it is a depressant; cocaine is the stimulant).

**How marks are usually awarded**
- 1-mark subparts: a barrier, a lymphoid organ, an antibody class, a drug source, ELISA in full.
- 2–3-mark questions: active vs passive; humoral vs CMI; antibody diagram; HIV replication; effects of smoking.
- 5-mark questions in parts: immunity with the response graph; antibody classes; AIDS from cause to prevention; drugs and adolescence.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Four barriers of innate immunity?', 'Physical, physiological, cellular, cytokine.', 'concept', 1),
    fc(2, 'Two physiological barriers?', 'Stomach acid; saliva or tears.', 'fact', 1),
    fc(3, 'Phagocytic cells of innate immunity?', 'Neutrophils, monocytes, macrophages (and NK cells).', 'fact', 1),
    fc(4, 'What are interferons?', 'Proteins from virus-infected cells protecting neighbours.', 'definition', 1),
    fc(5, 'Two features of acquired immunity?', 'Specificity and memory.', 'concept', 2),
    fc(6, 'Primary vs secondary response?', 'Low and slow vs strong and fast.', 'concept', 2),
    fc(7, 'Cells of humoral immunity?', 'B-lymphocytes (antibodies).', 'fact', 2),
    fc(8, 'Which immunity rejects grafts?', 'Cell-mediated (T-cells).', 'fact', 2),
    fc(9, 'Example of natural passive immunity?', 'IgA in colostrum; IgG across placenta.', 'exam-tip', 2),
    fc(10, 'Primary lymphoid organs?', 'Bone marrow and thymus.', 'fact', 2),
    fc(11, 'Name three secondary lymphoid organs.', 'Spleen, lymph nodes, tonsils (Peyer’s patches, appendix).', 'fact', 2),
    fc(12, 'What is MALT?', 'Mucosa-associated lymphoid tissue; about half of all lymphoid tissue.', 'definition', 2),
    fc(13, 'Antibody structure in symbols?', 'H₂L₂.', 'fact', 3),
    fc(14, 'Antibody that crosses the placenta?', 'IgG.', 'fact', 3),
    fc(15, 'Antibody in colostrum?', 'IgA.', 'fact', 3),
    fc(16, 'First antibody in a primary response?', 'IgM (pentamer).', 'fact', 3),
    fc(17, 'Antibody on B-cell surfaces?', 'IgD.', 'fact', 3),
    fc(18, 'Antibody in allergy?', 'IgE.', 'fact', 3),
    fc(19, 'Example of a recombinant vaccine?', 'Hepatitis B vaccine from yeast.', 'fact', 3),
    fc(20, 'Example of autoimmune disease?', 'Rheumatoid arthritis.', 'fact', 3),
    fc(21, 'Type of virus HIV is?', 'Retrovirus (RNA genome).', 'fact', 4),
    fc(22, 'Four routes of HIV spread?', 'Sex, blood, shared needles, mother to child.', 'fact', 4),
    fc(23, 'Cells destroyed by HIV?', 'Helper T-lymphocytes.', 'fact', 4),
    fc(24, 'Why are macrophages an HIV factory?', 'They keep producing virus without dying.', 'concept', 4),
    fc(25, 'Test for HIV antibodies?', 'ELISA.', 'fact', 4),
    fc(26, 'World AIDS Day?', '1 December.', 'fact', 4),
    fc(27, 'Source of heroin?', 'Morphine from the poppy, Papaver somniferum.', 'fact', 5),
    fc(28, 'How does cocaine act?', 'Interferes with dopamine transport; stimulant.', 'concept', 5),
    fc(29, 'Effect of nicotine?', 'Adrenaline release; higher blood pressure and heart rate.', 'fact', 5),
    fc(30, 'What is withdrawal syndrome?', 'Symptoms when a dependent user stops abruptly.', 'definition', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
