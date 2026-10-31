// ISC 12 Biology ch15 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, PLANTS } from './decks.mjs';
import { RATE, ROUNDS } from './svgs.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biotechnology and its Applications — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Tissue culture, somatic hybridisation and GM crops',
      `**Plant tissue culture:** whole plants can be regenerated from **explants** (any part of a plant) grown in **sterile** conditions on special nutrient media — the capacity called **totipotency**. The medium provides a carbon source (sucrose), inorganic salts, vitamins, amino acids and **growth regulators** such as auxins and cytokinins.
- **Micropropagation** produces thousands of plants in a short time; each plant is genetically identical to the original — a **somaclone** (here, ${RATE} shoots per subculture give ${PLANTS} plantlets after ${ROUNDS} rounds). Used for tomato, banana, apple and others.
- **Meristem culture:** although a plant is infected with a virus, its **apical and axillary meristems are free of virus**; culturing them gives **virus-free plants** (banana, sugarcane, potato).
- **Somatic hybridisation:** single cells are isolated, their walls digested by **cellulase and pectinase** to give naked **protoplasts**, and protoplasts of two varieties or species are **fused** to give **hybrid protoplasts**, which are grown into **somatic hybrids** — for example the **pomato** (tomato + potato), though it did not combine all the desired traits.

**Genetically modified (GM) crops** — plants, bacteria, fungi and animals whose genes have been altered by manipulation are GMOs. GM plants: (i) are more **tolerant to abiotic stresses** (cold, drought, salt, heat); (ii) **reduce reliance on chemical pesticides** (pest-resistant crops); (iii) **reduce post-harvest losses**; (iv) **increase efficiency of mineral use** (preventing early exhaustion of soil fertility); (v) have **enhanced nutritional value** (golden rice); (vi) can provide **alternative resources** — starches, fuels and pharmaceuticals.`,
      [kt('Totipotency', 'Capacity of a plant cell to regenerate a whole plant.'), kt('Somaclone', 'Plant genetically identical to its source, produced by tissue culture.'), kt('Protoplast', 'Plant cell whose wall has been removed.'), kt('GMO', 'Organism whose genes have been altered by manipulation.')],
      V.microprop,
      [1],
      [V.somatic],
    ),
    sec(
      '2. Pest-resistant and nutritionally enhanced crops',
      `**Bt crops:** some strains of ***Bacillus thuringiensis*** produce proteins that kill certain insects such as **lepidopterans** (tobacco budworm, armyworm), **coleopterans** (beetles) and **dipterans** (flies, mosquitoes). The bacterium forms protein crystals containing a toxic **insecticidal protein** that exists as an **inactive protoxin**. When an insect ingests it, the **alkaline pH of the gut** solubilises the crystals and converts the protoxin to the **active toxin**, which binds to the **surface of midgut epithelial cells** and creates **pores**, causing **swelling and lysis** and death of the insect. The toxin is coded by **cry** genes: **cryIAc** and **cryIIAb** control **cotton bollworms**; **cryIAb** controls the **corn borer**. Bt cotton, Bt corn, rice, tomato, potato and soybean have been developed.

**RNA interference against nematodes:** the nematode ***Meloidogyne incognita*** infects the roots of **tobacco** and reduces yield. Using ***Agrobacterium*** vectors, nematode-specific genes were introduced into the host plant so that it produced **both sense and complementary antisense RNA**. These form **double-stranded RNA (dsRNA)**, which starts **RNAi** and **silences** the specific mRNA of the nematode; the parasite cannot survive in the transgenic host. RNAi is a method of **cellular defence** in all eukaryotes.

**Golden rice:** a GM variety containing **β-carotene (provitamin A)**, giving grains a golden colour, to combat **vitamin A deficiency** and night blindness.`,
      [kt('Cry protein', 'Bt insecticidal protein coded by cry genes; activated in the alkaline insect gut.'), kt('RNA interference', 'Silencing of a specific mRNA by complementary double-stranded RNA.'), kt('Golden rice', 'GM rice rich in β-carotene (provitamin A).')],
      V.bt,
      [2],
      [V.rnai],
    ),
    sec(
      '3. Insulin, vaccines and stem cells',
      `**Genetically engineered insulin:** insulin used for diabetes was earlier extracted from the **pancreas of slaughtered cattle and pigs**, and some patients developed **allergies** to the foreign protein. Insulin consists of **two short polypeptide chains, A and B**, linked by **disulphide bridges**. In mammals it is synthesised as a **pro-hormone (proinsulin)** with an extra stretch, the **C peptide**, which is removed during maturation. In **1983**, the American company **Eli Lilly** prepared **two DNA sequences** corresponding to chains **A and B** of human insulin and introduced them into **plasmids of *E. coli***; the chains were produced **separately**, extracted and **combined by creating disulphide bonds** to form human insulin.

**Vaccines:** recombinant DNA technology allows production of antigenic polypeptides in bacteria or yeast; for example the **hepatitis B vaccine** produced in **yeast**. Such vaccines are safer because they contain no live pathogen.

**Stem cells** are **undifferentiated** cells that can **renew themselves** by division and **differentiate** into specialised cells. **Embryonic stem cells** (from the inner cell mass of an early embryo) are **pluripotent** and can form almost any cell type. **Adult stem cells** (bone marrow, umbilical cord blood) are **multipotent**. Applications: **bone-marrow transplants** for leukaemia and other blood disorders, replacing **damaged tissues**, and research into **spinal-cord injuries, diabetes** and other diseases; **cord-blood banking** stores stem cells for future use.`,
      [kt('Proinsulin', 'Precursor of insulin containing an extra C peptide.'), kt('Stem cell', 'Undifferentiated cell that can self-renew and differentiate.'), kt('Pluripotent', 'Able to form almost any cell type.')],
      V.insulin,
      [3],
    ),
    sec(
      '4. Gene therapy and molecular diagnosis',
      `**Gene therapy** is a collection of methods that allows correction of a gene defect diagnosed in a child or embryo: genes are inserted into a person’s cells and tissues to treat a disease, a normal gene compensating for the non-functional one. The **first clinical gene therapy** was given in **1990** to a four-year-old girl with **adenosine deaminase (ADA) deficiency**. ADA is crucial for the immune system; its deletion causes **severe combined immunodeficiency (SCID)**. Treatment can be by bone-marrow transplantation or enzyme-replacement therapy (injection of functional ADA), but these are not completely curative. In gene therapy, **lymphocytes** from the patient’s blood are grown in culture, a functional **ADA cDNA** is introduced using a **retroviral vector**, and the cells are **returned** to the patient. As these cells are **not immortal**, periodic infusion is needed. If the gene isolated from **marrow cells** producing ADA is introduced into cells at **early embryonic stages**, it could be a **permanent cure**.

**Molecular diagnosis:** conventional methods (serum and urine analysis) cannot detect a pathogen early. Recombinant DNA technology, **PCR** and **ELISA** allow **early diagnosis**:
- **PCR** detects very **low concentrations** of a pathogen by amplifying its nucleic acid — used to detect **HIV** in suspected AIDS patients and **mutations** in genes of suspected cancer patients.
- A **single-stranded DNA or RNA probe**, tagged with a **radioactive** molecule, is allowed to **hybridise** to its complementary DNA in a clone of cells, followed by **autoradiography**; a clone with a **mutated** gene does **not** appear on the film, because the probe is not complementary to it.
- **ELISA** is based on **antigen–antibody interaction**; infection can be detected by the presence of **antigens** (proteins, glycoproteins) or of **antibodies** synthesised against the pathogen.`,
      [kt('Gene therapy', 'Correction of a gene defect by delivering a normal gene into cells.'), kt('SCID', 'Severe combined immunodeficiency, caused here by ADA deficiency.'), kt('Probe', 'Labelled single-stranded nucleic acid that binds a complementary sequence.')],
      table(['Method', 'Detects'], [['PCR', 'Very small amounts of pathogen DNA or RNA; mutations'], ['Probe + autoradiography', 'Presence or absence of a sequence; mutated genes'], ['ELISA', 'Antigens or antibodies']], 'Table of molecular diagnostic methods'),
      [4],
    ),
    sec(
      '5. Transgenic animals',
      `Animals that have had their DNA manipulated to possess and express an **extra (foreign) gene** are **transgenic animals**. Transgenic rats, rabbits, pigs, sheep, cows and fish have been produced, though **over 95 percent** of all existing transgenic animals are **mice**.

**Uses:**
- **Normal physiology and development:** studying how genes are regulated and how they affect body functions (for example, insulin-like growth factor).
- **Study of disease:** models for human diseases such as **cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer’s disease**, so that new treatments can be investigated.
- **Biological products:** medicines can be expensive to make; transgenic animals that produce useful products are introduced with the gene coding for the product — for example human protein **α-1-antitrypsin**, used to treat **emphysema**; products for **phenylketonuria (PKU)** and **cystic fibrosis** are being tried. In **1997** the first transgenic cow, **Rosie**, produced **human protein-enriched milk (2.4 g per litre)** containing **human α-lactalbumin**, nutritionally more balanced for human babies than natural cow milk.
- **Vaccine safety:** transgenic mice are used to test the safety of vaccines (for example **polio vaccine**) before use on humans.
- **Chemical safety testing (toxicity testing):** transgenic animals carrying genes that make them **more sensitive** to toxic substances give results in less time.`,
      [kt('Transgenic animal', 'Animal carrying and expressing a foreign gene.'), kt('α-1-antitrypsin', 'Human protein from transgenic animals used to treat emphysema.'), kt('Rosie', 'First transgenic cow (1997), producing milk with human α-lactalbumin.')],
      table(['Use', 'Example'], [['Disease model', 'Cancer, cystic fibrosis'], ['Product', 'α-1-antitrypsin; α-lactalbumin'], ['Safety testing', 'Polio vaccine; toxicity tests']], 'Table of uses of transgenic animals'),
      [5],
    ),
    sec(
      '6. Biosafety, ethics, biopiracy and biopatents',
      `Manipulation of living organisms raises **ethical** and **biosafety** concerns: GM organisms may have **unpredictable effects** when introduced into an ecosystem. The Indian Government has set up organisations such as **GEAC (Genetic Engineering Appraisal Committee)**, which makes decisions regarding the **validity of GM research** and the **safety of introducing GM organisms** for public services.

**Biopatents** are patents granted for biological entities and for products derived from them. Some companies have been granted patents on products and technologies that use genetic materials, plants and other biological resources **long identified, developed and used** by farmers and indigenous people of a country.

**Biopiracy** is the term used to refer to the **use of bio-resources by multinational companies** and other organisations **without proper authorisation** from the countries and people concerned and **without compensatory payment**.
- **Basmati rice:** India has about **27 documented varieties** of basmati, distinct for unique aroma and flavour. In **1997** an American company obtained patent rights on basmati rice through the **US Patent and Trademark Office**, for a “new” variety derived from Indian farmers’ varieties crossed with semi-dwarf varieties.
- Attempts have also been made to patent uses, products and processes based on Indian traditional herbal medicines such as **turmeric** and **neem**.
Most industrialised nations are rich financially but poor in biodiversity and traditional knowledge, while developing nations are rich in both. The Indian Parliament has cleared the second amendment of the **Indian Patents Bill** to take such issues into consideration, including emergency provisions and research and development initiatives.`,
      [kt('GEAC', 'Genetic Engineering Appraisal Committee, regulating GM research and release in India.'), kt('Biopatent', 'Patent on a biological entity, product or process.'), kt('Biopiracy', 'Use of bio-resources without authorisation or compensation.')],
      table(['Case', 'Issue'], [['Basmati (1997)', 'US patent on a variety derived from Indian varieties'], ['Turmeric', 'Patent on traditional medicinal use challenged'], ['Neem', 'Patent on traditional uses challenged']], 'Table of biopiracy cases'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Bt toxin is active inside the bacterium (it is an inactive protoxin until the alkaline insect gut).
- Mixing up the cry genes: cryIAc and cryIIAb (cotton bollworms), cryIAb (corn borer).
- Saying RNAi adds a protein to kill the nematode (it silences a nematode mRNA).
- Writing that genetically engineered insulin was made as proinsulin (chains A and B were made separately).
- Calling gene therapy for ADA permanent (lymphocytes die; repeated infusions are needed).
- Confusing biopatent with biopiracy.

**How marks are usually awarded**
- 1-mark subparts: a cry gene, a vector, an enzyme for protoplasts, GEAC in full, a transgenic product.
- 2–3-mark questions: micropropagation and meristem culture; Bt toxin action; RNAi; insulin production; gene therapy; probes.
- 5-mark questions in parts: GM crops with Bt and RNAi; medical applications; transgenic animals with ethics and biopiracy.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is totipotency?', 'A plant cell’s capacity to give a whole plant.', 'definition', 1),
    fc(2, 'What are somaclones?', 'Genetically identical plants from tissue culture.', 'definition', 1),
    fc(3, 'Why use meristems for virus-free plants?', 'Meristems are free of virus.', 'concept', 1),
    fc(4, 'Enzymes to make protoplasts?', 'Cellulase and pectinase.', 'fact', 1),
    fc(5, 'Example of a somatic hybrid?', 'Pomato.', 'fact', 1),
    fc(6, 'Three advantages of GM crops?', 'Stress tolerance, fewer pesticides, higher nutrition.', 'concept', 1),
    fc(7, 'Where is Bt protoxin activated?', 'In the alkaline gut of the insect.', 'fact', 2),
    fc(8, 'How does active Bt toxin kill?', 'Makes pores in midgut cells; they swell and lyse.', 'concept', 2),
    fc(9, 'cry genes for cotton bollworms?', 'cryIAc and cryIIAb.', 'fact', 2),
    fc(10, 'cry gene for corn borer?', 'cryIAb.', 'fact', 2),
    fc(11, 'Nematode controlled by RNAi in tobacco?', 'Meloidogyne incognita.', 'fact', 2),
    fc(12, 'What triggers RNAi?', 'Double-stranded RNA from sense and antisense RNA.', 'concept', 2),
    fc(13, 'What does golden rice contain?', 'β-carotene (provitamin A).', 'fact', 2),
    fc(14, 'Who made human insulin by rDNA, and when?', 'Eli Lilly, 1983.', 'fact', 3),
    fc(15, 'What is removed from proinsulin?', 'The C peptide.', 'fact', 3),
    fc(16, 'Amino acids in chains A and B?', '21 and 30.', 'fact', 3),
    fc(17, 'Vaccine made in yeast?', 'Hepatitis B vaccine.', 'fact', 3),
    fc(18, 'Embryonic vs adult stem cells?', 'Pluripotent vs multipotent.', 'concept', 3),
    fc(19, 'First clinical gene therapy?', '1990, ADA deficiency.', 'fact', 4),
    fc(20, 'Disease caused by ADA deficiency?', 'SCID.', 'fact', 4),
    fc(21, 'Vector used in ADA gene therapy?', 'Retroviral vector.', 'fact', 4),
    fc(22, 'Why is ADA gene therapy repeated?', 'Lymphocytes are not immortal.', 'concept', 4),
    fc(23, 'How does a probe reveal a mutation?', 'No hybridisation: band missing on autoradiograph.', 'concept', 4),
    fc(24, 'Percentage of transgenic animals that are mice?', 'Over 95 percent.', 'fact', 5),
    fc(25, 'Protein for emphysema from transgenic animals?', 'α-1-antitrypsin.', 'fact', 5),
    fc(26, 'Who was Rosie?', 'First transgenic cow (1997): human α-lactalbumin in milk.', 'fact', 5),
    fc(27, 'Vaccine tested on transgenic mice?', 'Polio vaccine.', 'fact', 5),
    fc(28, 'Role of GEAC?', 'Decides validity of GM research and safety of release.', 'fact', 6),
    fc(29, 'Define biopiracy.', 'Use of bio-resources without authorisation or compensation.', 'definition', 6),
    fc(30, 'Year of the basmati patent?', '1997.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
