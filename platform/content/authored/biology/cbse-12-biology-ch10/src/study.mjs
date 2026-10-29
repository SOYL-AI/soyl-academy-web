// ch10 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { INSULIN, insulinTotal } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biotechnology and its Applications — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Biotechnological applications in agriculture',
      `Three options for increasing food production: **agrochemical-based agriculture**, **organic agriculture** and **genetically engineered crop-based agriculture**. Plants, bacteria, fungi and animals whose genes have been altered by manipulation are **genetically modified organisms (GMOs)**.

**Uses of GM plants:** tolerance to abiotic stresses (cold, drought, salt, heat); reduced reliance on chemical pesticides (pest-resistant crops); reduced post-harvest losses; increased efficiency of mineral use (prevents early exhaustion of soil fertility); enhanced nutritional value (**golden rice**, rich in vitamin A); tailor-made plants supplying alternative resources to industries (starches, fuels, pharmaceuticals).

**Bt crops.** *Bacillus thuringiensis* forms protein crystals with an insecticidal protein. The Bt toxin kills **lepidopterans** (tobacco budworm, armyworm), **coleopterans** (beetles) and **dipterans** (flies, mosquitoes).
- The toxin is an **inactive protoxin**, so the bacterium is not killed.
- In the insect gut the **alkaline pH** solubilises the crystals and activates the toxin.
- The active toxin binds to the surface of **midgut epithelial cells** and creates **pores**, causing **swelling and lysis**; the insect dies.
- The toxin is coded by **cry genes**: **cryIAc** and **cryIIAb** control **cotton bollworms**; **cryIAb** controls **corn borer**.

**Pest-resistant plants by RNA interference (RNAi).** The nematode ***Meloidogyne incognita*** infects tobacco roots and reduces yield. RNAi occurs in all eukaryotes as a method of cellular defence: it silences a specific mRNA because a complementary **double-stranded RNA (dsRNA)** binds to it and prevents translation. Natural sources of dsRNA are infection by RNA viruses and mobile genetic elements (transposons) that replicate via an RNA intermediate.
- Using ***Agrobacterium*** vectors, **nematode-specific genes** were introduced into the host plant.
- The plant produced **both sense and antisense RNA**, which formed dsRNA and started RNAi.
- The specific mRNA of the nematode was silenced, so the parasite **could not survive** in the transgenic host.`,
      [kt('GMO', 'An organism whose genes have been altered by manipulation.'), kt('Protoxin', 'The inactive form in which Bt toxin is made; it is activated in the alkaline gut of an insect.'), kt('cry genes', 'Genes of Bacillus thuringiensis that code for the insecticidal crystal proteins.'), kt('RNA interference', 'Silencing of a specific mRNA by a complementary double-stranded RNA that prevents its translation.')],
      V.bt,
      [1],
      [V.rnai],
    ),
    sec(
      '2. Biotechnological applications in medicine',
      `Recombinant DNA technology allows mass production of **safe and more effective** therapeutic drugs that do not cause unwanted immunological responses, as similar products from non-human sources can. About **30 recombinant therapeutics** have been approved for human use worldwide; **12** are marketed in India.

**Genetically engineered insulin.** Insulin from the pancreas of slaughtered cattle and pigs caused allergy or other reactions in some patients.
- Mature insulin has **two short polypeptide chains, A and B**, linked by **disulphide bridges** (chain A ${INSULIN.A} and chain B ${INSULIN.B} amino acids, ${insulinTotal()} in all).
- In mammals it is made as a **prohormone (proinsulin)** with an extra stretch, the **C peptide**, which is removed during maturation. Bacteria cannot carry out this step.
- In **1983**, **Eli Lilly** prepared two DNA sequences for chains A and B, introduced them into **plasmids of E. coli**, produced the chains separately, extracted them and combined them by creating disulphide bonds to form human insulin.

**Gene therapy** corrects a gene defect diagnosed in a child or embryo: genes are inserted into the person’s cells and tissues, and a normal gene compensates for the non-functional one.
- First clinical use: **1990**, a **4-year-old girl** with **adenosine deaminase (ADA) deficiency**. ADA is crucial for the immune system; the disorder results from **deletion of the ADA gene**.
- Other treatments: bone marrow transplantation; enzyme replacement therapy (functional ADA by injection) — neither is completely curative.
- Method: **lymphocytes** from the patient’s blood are grown in culture; a functional **ADA cDNA** is introduced using a **retroviral vector**; the cells are returned to the patient. Lymphocytes are **not immortal**, so periodic infusions are needed.
- If the gene isolated from marrow cells producing ADA is introduced into cells at **early embryonic stages**, it **could be a permanent cure**.

**Molecular diagnosis.** Conventional methods (serum and urine analysis) cannot detect a disease early.
- **PCR** amplifies very low concentrations of a pathogen’s nucleic acid: used to detect **HIV** in suspected AIDS patients and **mutations** in suspected cancer patients; also used to identify many other genetic disorders.
- A single-stranded DNA or RNA tagged with a **radioactive molecule (probe)** hybridises to its complementary DNA in a clone of cells and is detected by **autoradiography**; a clone with a mutated gene does not appear on the photographic film because the probe is not complementary to it.
- **ELISA** works on the principle of **antigen–antibody interaction**: it detects antigens of the pathogen, or antibodies made against it.

**Stem cell technology.** Stem cells are unspecialised cells that can divide and form many kinds of specialised cells (for example, bone-marrow stem cells form blood cells). They hold promise for repairing or replacing damaged tissues and, with gene therapy in early embryonic cells, for lasting cures.`,
      [kt('Proinsulin', 'The precursor of insulin, with an extra C peptide that is removed during maturation.'), kt('Gene therapy', 'Correction of a gene defect by inserting a normal gene into a person’s cells.'), kt('ADA deficiency', 'An immune disorder caused by deletion of the gene for adenosine deaminase.'), kt('ELISA', 'Enzyme-linked immunosorbent assay: a test based on antigen–antibody interaction.'), kt('Stem cell', 'An unspecialised cell that can divide and give rise to many specialised cell types.')],
      V.insulin,
      [2],
      [flow('LR', [['l', 'Lymphocytes cultured'], ['v', 'ADA cDNA added (retroviral vector)'], ['r', 'Cells returned to patient'], ['p', 'Repeated periodically']], [['l', 'v'], ['v', 'r'], ['r', 'p']], 'Flow of gene therapy for ADA deficiency')],
    ),
    sec(
      '3. Transgenic animals',
      `Animals whose DNA has been manipulated to possess and express an extra (foreign) gene are **transgenic animals**. Transgenic rats, rabbits, pigs, sheep, cows and fish have been produced, but **over 95 percent** of all existing transgenic animals are **mice**.

**Uses:**
- **Normal physiology and development** — study of how genes are regulated and how their products affect body functions and development, e.g. insulin-like growth factor.
- **Study of disease** — models for human diseases such as **cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer’s disease**, so that new treatments can be investigated.
- **Biological products** — medicines made from biological products can be expensive; transgenic animals that produce useful products can be made, e.g. human protein **α-1-antitrypsin** used to treat **emphysema**; attempts for products to treat phenylketonuria and cystic fibrosis.
- **Vaccine safety** — transgenic mice are used to test the safety of the **polio vaccine** before it is used on humans.
- **Chemical safety (toxicity) testing** — animals carrying genes that make them more sensitive to toxic substances give results in less time.

**Rosie (1997):** the first transgenic cow; produced human protein-enriched milk (**2.4 grams per litre**) containing human **alpha-lactalbumin**, nutritionally more balanced for human babies than natural cow milk.`,
      [kt('Transgenic animal', 'An animal whose DNA has been manipulated to carry and express a foreign gene.'), kt('α-1-antitrypsin', 'A human protein produced by transgenic animals and used to treat emphysema.')],
      table(['Use', 'Example'], [['Physiology', 'Insulin-like growth factor'], ['Disease models', 'Cancer, cystic fibrosis, Alzheimer’s'], ['Biological products', 'α-1-antitrypsin (emphysema); Rosie’s milk'], ['Vaccine safety', 'Polio vaccine tested in mice'], ['Chemical safety', 'More sensitive animals for toxicity tests']], 'Table of uses of transgenic animals with examples'),
      [3],
    ),
    sec(
      '4. Ethical issues',
      `Manipulation of living organisms needs regulation, because genetic modification may have **unpredictable results** when such organisms enter an ecosystem.

**GEAC.** The Indian Government set up the **Genetic Engineering Approval Committee**, which makes decisions on the **validity of GM research** and the **safety of introducing GM organisms** for public services.

**Patents and biopiracy.**
- There is growing public anger that certain companies are granted **patents** for products and technologies that use genetic materials, plants and other biological resources long identified, developed and used by farmers and indigenous people.
- **Basmati rice:** India has an estimated **200 000** varieties of rice, including at least **27** documented varieties of basmati. In **1997** an American company got patent rights on basmati rice through the US Patent and Trademark Office, for a new variety derived from Indian farmers’ varieties crossed with semi-dwarf varieties; it was claimed as an invention.
- Other traditional Indian products, such as **turmeric** and **neem**, have also been subjects of patent attempts.
- **Biopiracy:** the use of bio-resources by multinational companies and other organisations **without proper authorisation** from the countries and people concerned, **without compensatory payment**.
- Industrialised nations are rich financially but poor in biodiversity and traditional knowledge; developing and under-developed nations are rich in both. Some nations are developing laws to prevent unauthorised exploitation of bio-resources and traditional knowledge.
- The Indian Parliament has cleared the **second amendment of the Indian Patents Bill**, which takes such issues into consideration, including patent terms, emergency provisions, and research and development initiatives.`,
      [kt('GEAC', 'Genetic Engineering Approval Committee: decides on the validity of GM research and the safety of releasing GM organisms.'), kt('Patent', 'A right granted by a government to an inventor to prevent others from commercially using the invention.'), kt('Biopiracy', 'Use of bio-resources without proper authorisation from the countries and people concerned and without compensatory payment.')],
      table(['Issue', 'Example', 'Response'], [['Biosafety', 'Unpredictable effects in ecosystems', 'GEAC approval'], ['Biopiracy', 'Basmati, turmeric, neem', 'Indian Patents Bill (second amendment)']], 'Table of ethical issues with examples and responses'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Bt toxin is active inside the bacterium (it is an inactive protoxin).
- Saying the toxin is activated by acidic pH (the insect gut is alkaline).
- Mixing up the cry genes for cotton bollworm and corn borer.
- Saying insulin was made in E. coli as proinsulin (chains A and B were made separately).
- Forgetting why gene therapy with lymphocytes must be repeated (lymphocytes are not immortal).
- Defining biopiracy without both conditions: no authorisation and no compensation.

**How marks are usually awarded**
- 1-mark items: organism, gene, year, enzyme, committee.
- 2–3-mark answers: mechanism of Bt toxin; RNAi steps; insulin production; uses of transgenic animals.
- 5-mark answers: Bt cotton and RNAi together; gene therapy for ADA deficiency with molecular diagnosis; ethical issues with Indian examples.
- Case-based items: field data on Bt crops, insulin production, diagnosis choices or a biopiracy scenario, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a GMO?', 'An organism whose genes have been altered by manipulation.', 'definition', 1),
    fc(2, 'Name four uses of GM plants.', 'Abiotic-stress tolerance, less pesticide use, fewer post-harvest losses, better mineral use, enhanced nutrition.', 'concept', 1),
    fc(3, 'Golden rice is rich in?', 'Vitamin A.', 'fact', 1),
    fc(4, 'Source of Bt toxin?', 'The bacterium Bacillus thuringiensis.', 'fact', 1),
    fc(5, 'Why does Bt toxin not kill the bacterium?', 'It is made as an inactive protoxin.', 'concept', 1),
    fc(6, 'What activates the Bt protoxin?', 'The alkaline pH of the insect gut.', 'concept', 1),
    fc(7, 'How does active Bt toxin kill?', 'Binds midgut epithelial cells, creates pores; cells swell and lyse.', 'concept', 1),
    fc(8, 'cry genes for cotton bollworms?', 'cryIAc and cryIIAb.', 'fact', 1),
    fc(9, 'cry gene for corn borer?', 'cryIAb.', 'fact', 1),
    fc(10, 'Insect groups killed by Bt toxins?', 'Lepidopterans, coleopterans and dipterans.', 'fact', 1),
    fc(11, 'Nematode that infects tobacco roots?', 'Meloidogyne incognita.', 'fact', 1),
    fc(12, 'What is RNA interference?', 'Silencing of a specific mRNA by a complementary dsRNA.', 'definition', 1),
    fc(13, 'How was RNAi tobacco made?', 'Nematode genes put in with Agrobacterium; plant makes sense and antisense RNA → dsRNA.', 'concept', 1),
    fc(14, 'Natural sources of dsRNA?', 'RNA virus infection; transposons replicating via an RNA intermediate.', 'fact', 1),
    fc(15, 'Recombinant therapeutics: world and India?', 'About 30 approved worldwide; 12 marketed in India.', 'fact', 2),
    fc(16, 'Structure of mature insulin?', `Chains A (${INSULIN.A}) and B (${INSULIN.B}) linked by disulphide bridges.`, 'fact', 2),
    fc(17, 'What is the C peptide?', 'The extra stretch in proinsulin removed during maturation.', 'definition', 2),
    fc(18, 'How did Eli Lilly make human insulin (1983)?', 'Chains A and B made separately in E. coli, then joined by disulphide bonds.', 'concept', 2),
    fc(19, 'First clinical gene therapy?', '1990, a 4-year-old girl with ADA deficiency.', 'fact', 2),
    fc(20, 'Why repeat ADA gene therapy?', 'Engineered lymphocytes are not immortal.', 'exam-tip', 2),
    fc(21, 'Vector used in ADA gene therapy?', 'A retroviral vector carrying ADA cDNA.', 'fact', 2),
    fc(22, 'Two diagnostic uses of PCR?', 'Detecting HIV in suspected AIDS patients; detecting mutations in suspected cancer patients.', 'concept', 2),
    fc(23, 'Principle of ELISA?', 'Antigen–antibody interaction.', 'concept', 2),
    fc(24, 'Why does a mutated clone not show with a probe?', 'The probe is not complementary to the mutated gene.', 'concept', 2),
    fc(25, 'What are stem cells?', 'Unspecialised cells that can form many specialised cell types.', 'definition', 2),
    fc(26, 'Most common transgenic animal?', 'Mice (over 95 percent).', 'fact', 3),
    fc(27, 'α-1-antitrypsin treats?', 'Emphysema.', 'fact', 3),
    fc(28, 'Which vaccine is tested in transgenic mice?', 'Polio vaccine.', 'fact', 3),
    fc(29, 'Rosie the cow?', '1997; milk with human alpha-lactalbumin, 2.4 g per litre.', 'fact', 3),
    fc(30, 'Role of GEAC?', 'Decides on validity of GM research and safety of releasing GM organisms.', 'concept', 4),
    fc(31, 'Define biopiracy.', 'Use of bio-resources without authorisation and without compensatory payment.', 'definition', 4),
    fc(32, 'Indian examples of patent disputes?', 'Basmati rice (1997), turmeric, neem.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
