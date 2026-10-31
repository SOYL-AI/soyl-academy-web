// ISC 12 Biology ch15 Biotechnology and its Applications — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { BT, INSULIN_SVG, RNAI, MICROPROP, SOMATIC, RATE, ROUNDS } from './svgs.mjs';
import { plantlets, INSULIN, insulinTotal, grams, pct } from './calc.mjs';

export const V = {
  bt: svgV(BT, 'How Bt toxin is activated in the insect gut and kills the larva'),
  insulin: svgV(INSULIN_SVG, 'Proinsulin with chains A, B and C, and mature insulin with A and B joined by disulphide bridges'),
  rnai: svgV(RNAI, 'RNA interference silencing a nematode gene in transgenic tobacco'),
  microprop: svgV(MICROPROP, 'Plantlet numbers rising at each subculture in micropropagation'),
  somatic: svgV(SOMATIC, 'Protoplast fusion of tomato and potato cells to give a somatic hybrid'),
};

// ---------------------------------------------------------------- computed numbers
export const PLANTS = plantlets(1, RATE, ROUNDS);
export const PLANTS6 = plantlets(3, 4, 6);
export const ROSIE = { gPerL: 2.4, litres: 15 };
export const ROSIE_G = grams(ROSIE.gPerL, ROSIE.litres);
export const LYMPH = { total: 200, corrected: 30 };
export const LYMPH_PCT = pct(LYMPH.corrected, LYMPH.total);

export const deck1 = deck({
  part: 1,
  title: 'Biotechnology and its Applications — Part 1: Agriculture and medicine',
  goals: [
    'Describe micropropagation, meristem culture and somatic hybridisation',
    'List the advantages of GM crops and explain Bt crops, RNA interference and golden rice',
    'Explain the production of human insulin, recombinant vaccines and the uses of stem cells',
  ],
  slides: [
    sl('title', 'Biotechnology at work', {
      b: 'Part 1 — how biotechnology is used to grow better crops and make medicines.',
      v: flow('LR', [['t', 'Tissue culture'], ['g', 'GM crops'], ['m', 'Medicines and vaccines'], ['s', 'Stem cells']], [['t', 'g'], ['g', 'm'], ['m', 's']], 'Flow from tissue culture to GM crops to medicines and stem cells'),
      n: 'Biotechnology helps farmers raise more food with fewer chemicals and helps doctors treat disease. We begin with plant tissue culture and genetically modified crops, then turn to medicines made by engineered microbes.',
    }),
    sl('concept', 'Plant tissue culture', {
      b: 'Any plant cell or tissue (**explant**) can regenerate a whole plant — **totipotency**. Growing explants on a sterile medium with nutrients and plant hormones allows **micropropagation**: thousands of **genetically identical** plants (**somaclones**) in a short time.',
      v: table(['Technique', 'Use'], [['Micropropagation', 'Mass production of identical plants: tomato, banana, apple'], ['Meristem culture', 'Virus-free plants from apical or axillary meristems, which are free of virus: banana, sugarcane, potato'], ['Somatic hybridisation', 'Fusion of protoplasts of two species to combine traits: pomato']], 'Table of plant tissue culture techniques and uses'),
      n: 'Because each plant cell carries the full set of genes, a tiny piece of tissue can give a whole new plant. Even an infected plant can yield healthy offspring, because its meristems are usually free of virus.',
    }),
    sl('diagram', 'Micropropagation multiplies plants fast', {
      b: `If each shoot gives **${RATE}** new shoots at every subculture, one explant gives **${PLANTS}** plantlets after **${ROUNDS}** rounds.`,
      v: V.microprop,
      n: 'Growth is multiplied at every round of subculture, so numbers rise steeply. The plantlets are then rooted, hardened in a greenhouse and planted out in fields.',
    }),
    sl('example', 'Worked example 1: how many plantlets?', {
      b: 'A nursery starts with 3 explants of a banana variety. Each shoot gives 4 new shoots at every subculture. How many plantlets are obtained after 6 subcultures?',
      ul: [
        r`Plantlets $= 3 \times 4^{6}$.`,
        r`$4^{6} = 4096$, so plantlets $= 3 \times 4096 = ${PLANTS6}$.`,
        'All are **somaclones**, genetically identical to the parent.',
      ],
      v: table(['Subcultures', 'Plantlets'], [0, 2, 4, 6].map((k) => [String(k), String(plantlets(3, 4, k))]), `Worked table: ${PLANTS6} plantlets after 6 subcultures`),
      n: 'Multiply the starting number by four for every subculture. After six rounds three explants have become more than twelve thousand plantlets, which is why tissue culture can supply whole plantations quickly.',
    }),
    sl('diagram', 'Somatic hybridisation', {
      b: 'Cell walls of two plants are digested with **cellulase and pectinase** to give **protoplasts**. Protoplasts of two species are **fused**, and the hybrid protoplast is grown into a **somatic hybrid** — for example the **pomato** (tomato × potato).',
      v: V.somatic,
      n: 'Somatic hybridisation can combine plants that cannot be crossed sexually. The pomato did not have all the hoped-for features, but the method shows how traits of distant species can be brought together.',
    }),
    sl('concept', 'Genetically modified crops', {
      b: 'Plants whose genes have been altered by manipulation are **genetically modified organisms (GMOs)**.',
      v: table(['Advantage', 'Example'], [['Tolerance to abiotic stresses', 'Cold, drought, salt and heat'], ['Less use of chemical pesticides', 'Pest-resistant Bt crops'], ['Fewer post-harvest losses', 'Delayed ripening'], ['Better use of minerals', 'Prevents early exhaustion of soil fertility'], ['Higher nutritional value', 'Golden rice rich in vitamin A'], ['Alternative resources', 'Starch, fuels and pharmaceuticals']], 'Table of advantages of GM crops'),
      n: 'Genetic modification can make crops tolerate drought, salt or cold, resist pests without sprays, keep longer after harvest and carry more nutrients.',
    }),
    sl('diagram', 'Bt crops', {
      b: '**Bacillus thuringiensis** makes **Cry proteins** as inactive **protoxin crystals**. In the **alkaline gut** of an insect larva they dissolve and become **active toxin**, which binds the **midgut** lining and makes **pores**, so cells swell and **lyse** and the insect dies. The bacterium is not harmed because the protoxin is inactive inside it.',
      v: V.bt,
      n: 'Genes for Cry proteins have been put into crops. The genes cry one A c and cry two A b protect cotton against bollworms, and cry one A b protects maize against the corn borer. The crop now makes its own insecticide.',
    }),
    sl('diagram', 'RNA interference against a nematode', {
      b: 'The nematode **Meloidogyne incognita** infects tobacco roots. Using **Agrobacterium** vectors, nematode-specific genes were introduced into tobacco so that it made both **sense and antisense RNA**. These form **double-stranded RNA**, which triggers **RNA interference (RNAi)** and **silences** a vital nematode mRNA, so the parasite cannot survive.',
      v: V.rnai,
      n: 'RNA interference is a natural defence in eukaryotes. Double-stranded RNA binds and destroys a matching messenger RNA, stopping translation. The transgenic tobacco turns this mechanism against the parasite.',
    }),
    sl('check', 'Quick check: meristem culture', {
      b: 'Why are meristems used to obtain virus-free plants?',
      n: 'Quick check. Do viruses usually reach the growing tips?',
      chk: 'meristem-mcq',
    }),
    sl('concept', 'Golden rice', {
      b: '**Golden rice** is a GM variety rich in **β-carotene** (**provitamin A**), which the body converts to **vitamin A**. It was developed to reduce **vitamin A deficiency**, which causes night blindness, in populations depending on rice.',
      v: table(['Point', 'Detail'], [['Added nutrient', 'β-carotene (provitamin A)'], ['Colour', 'Golden-yellow grains'], ['Purpose', 'Prevent vitamin A deficiency and night blindness']], 'Table about golden rice'),
      n: 'Ordinary rice grains contain almost no beta-carotene. Golden rice makes it in the grain, so a staple food also supplies a vital vitamin.',
    }),
    sl('diagram', 'Genetically engineered insulin', {
      b: 'Insulin has **two chains, A and B**, linked by **disulphide bridges**. In the body it is made as **proinsulin** with an extra **C peptide**, which is removed. In **1983 Eli Lilly** prepared two DNA sequences for chains **A and B**, put them into **E. coli plasmids**, produced the chains **separately**, and joined them by **disulphide bonds**.',
      v: V.insulin,
      n: 'Insulin used to come from the pancreas of slaughtered cattle and pigs, and some patients reacted to the foreign protein. Human insulin made by bacteria avoids that problem and can be produced in large amounts.',
    }),
    sl('example', 'Worked example 2: the insulin molecule', {
      b: 'Chain A of insulin has 21 amino acids and chain B has 30. How many amino acids does mature insulin have, and why was the C peptide not made in the genetically engineered method?',
      ul: [
        r`Mature insulin $= ${INSULIN.A} + ${INSULIN.B} = ${insulinTotal()}$ amino acids.`,
        'The **A and B chains** were made **separately** and joined chemically, so the **C peptide**, which is removed during maturation in the body, was **not needed**.',
      ],
      v: table(['Chain', 'Amino acids'], [['A', String(INSULIN.A)], ['B', String(INSULIN.B)], ['Mature insulin', String(insulinTotal())]], `Worked table: mature insulin has ${insulinTotal()} amino acids`),
      n: 'Adding the two chains gives fifty one amino acids. Making the chains separately skipped the step in which the body cuts out the C peptide from proinsulin.',
    }),
    sl('concept', 'Vaccines and stem cells', {
      b: 'Recombinant DNA technology makes **safer vaccines**, such as the **hepatitis B vaccine** produced in **yeast**. **Stem cells** are **undifferentiated** cells that can **renew themselves** and **differentiate** into specialised cells.',
      v: table(['Type of stem cell', 'Source', 'Uses'], [['Embryonic (pluripotent)', 'Early embryo', 'Can form almost any cell type; research'], ['Adult (multipotent)', 'Bone marrow, umbilical cord blood', 'Bone-marrow transplant for leukaemia; repairing damaged tissue'], ['Applications', '—', 'Replacing damaged tissues, research on spinal-cord injury and diabetes']], 'Table of stem cells, sources and uses'),
      n: 'Stem cells could replace cells lost through injury or disease. Bone-marrow stem cells are already used to treat leukaemia, and stored umbilical cord blood is a rich source of them.',
    }),
    sl('check', 'Quick check: Bt toxin', {
      b: 'Judge the assertion and the reason about Bt toxin.',
      n: 'Quick check. Where is the inactive protoxin activated?',
      chk: 'cry-ar',
    }),
    sl('check', 'Quick check: insulin', {
      b: 'Which part of proinsulin is removed to form mature insulin?',
      n: 'Quick check. It is the third peptide between chains A and B.',
      chk: 'proinsulin-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Tissue culture: totipotency; micropropagation (somaclones); meristem culture (virus-free); somatic hybridisation (pomato).',
        'GM crops: stress tolerance, fewer pesticides, less post-harvest loss, better mineral use, nutrition, alternative resources.',
        'Bt crops: Cry protoxins activated in the alkaline insect gut; cryIAc, cryIIAb (cotton), cryIAb (corn borer).',
        'RNAi tobacco against Meloidogyne incognita; golden rice with β-carotene.',
        'Insulin (Eli Lilly, 1983; chains A and B in E. coli); hepatitis B vaccine in yeast; embryonic and adult stem cells.',
      ],
      v: table(['Product', 'Organism used'], [['Human insulin', 'E. coli'], ['Hepatitis B vaccine', 'Yeast'], ['Bt cotton', 'Bacillus thuringiensis genes'], ['RNAi tobacco', 'Agrobacterium vector']], 'Summary table of products and organisms'),
      n: 'To recap: tissue culture multiplies and rescues plants, genetic modification gives crops new traits, and engineered microbes make human insulin and vaccines. Stem cells offer new ways to repair the body.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain **why** Bt protoxin does not kill the bacterium but kills the insect.',
        'Describe **RNAi** with sense, antisense and double-stranded RNA.',
        'Give the **steps** of insulin production by Eli Lilly.',
        'Distinguish **embryonic** and **adult** stem cells.',
      ],
      n: 'Exam tips. Explain why the Bt toxin acts only in the insect gut. Describe RNA interference step by step. Learn how Eli Lilly made insulin. And compare embryonic and adult stem cells.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biotechnology and its Applications — Part 2: Gene therapy, diagnosis, transgenic animals and ethics',
  goals: [
    'Describe gene therapy for ADA deficiency (SCID)',
    'Explain molecular diagnosis by PCR, ELISA and DNA or RNA probes',
    'Give the uses of transgenic animals, and explain the role of GEAC, biopiracy and biopatents',
  ],
  slides: [
    sl('title', 'Healing, testing and the questions it raises', {
      b: 'Part 2 — correcting faulty genes, detecting disease early, using transgenic animals, and the ethics of it all.',
      v: flow('LR', [['g', 'Gene therapy'], ['d', 'Molecular diagnosis'], ['t', 'Transgenic animals'], ['e', 'Biosafety and ethics']], [['g', 'd'], ['d', 't'], ['t', 'e']], 'Flow from gene therapy to diagnosis to transgenic animals to ethics'),
      n: 'Biotechnology can now correct some genetic defects, find infections before symptoms appear, and use animals to make medicines. These powers also raise questions of safety, fairness and ownership.',
    }),
    sl('concept', 'Gene therapy for ADA deficiency', {
      b: '**Gene therapy** corrects a gene defect by delivering a **normal gene** into a person. The first clinical gene therapy (**1990**) treated a four-year-old girl with **adenosine deaminase (ADA) deficiency**, which causes **severe combined immunodeficiency (SCID)**.',
      v: flow('TB', [['a', 'Collect lymphocytes from the patient’s blood'], ['b', 'Grow them in culture'], ['c', 'Introduce functional ADA cDNA with a retroviral vector'], ['d', 'Return the lymphocytes to the patient']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of gene therapy for ADA deficiency'),
      n: 'Lymphocytes do not live for ever, so the treatment must be repeated periodically. If the normal ADA gene is put into bone-marrow cells at an early embryonic stage, it could give a permanent cure.',
    }),
    sl('example', 'Worked example 1: how many cells were corrected?', {
      b: `In a gene-therapy trial, ${LYMPH.total} million lymphocytes were treated with the retroviral vector and ${LYMPH.corrected} million took up the functional ADA gene. What percentage was corrected, and why must the treatment be repeated?`,
      ul: [
        r`Corrected $= \dfrac{${LYMPH.corrected}}{${LYMPH.total}} \times 100 = ${LYMPH_PCT}$ percent.`,
        'Mature lymphocytes are **not immortal**, so the corrected cells die out and fresh infusions are needed.',
      ],
      v: table(['Cells', 'Millions'], [['Treated', String(LYMPH.total)], ['Took up ADA gene', String(LYMPH.corrected)], ['Percent corrected', String(LYMPH_PCT)]], `Worked table: ${LYMPH_PCT} percent of lymphocytes corrected`),
      n: 'Only a fraction of cells take up the gene, but even these can restore some immune function. Because they eventually die, the patient needs repeated treatment unless stem cells are corrected.',
    }),
    sl('concept', 'Molecular diagnosis', {
      b: 'Early diagnosis is not possible by conventional methods such as serum and urine analysis. Molecular methods detect pathogens or mutations **when they are still few**.',
      v: table(['Method', 'Principle', 'Example'], [['PCR', 'Amplifies very small amounts of DNA or RNA', 'HIV in suspected AIDS patients; mutations in suspected cancer'], ['ELISA', 'Antigen–antibody interaction', 'Detects the pathogen’s antigens or antibodies against it'], ['DNA or RNA probe', 'Labelled single-stranded nucleic acid hybridises with its complement', 'Detects a mutated gene: no signal on autoradiography where the probe cannot pair']], 'Table of methods of molecular diagnosis'),
      n: 'PCR can find a pathogen before symptoms appear. A radioactive probe binds only to a complementary sequence; if a gene is mutated, the probe cannot pair, and the band is missing from the photographic film.',
    }),
    sl('check', 'Quick check: ADA', {
      b: 'Deficiency of which enzyme was treated by the first clinical gene therapy?',
      n: 'Quick check. Its lack causes severe combined immunodeficiency.',
      chk: 'ada-mcq',
    }),
    sl('concept', 'Transgenic animals', {
      b: '**Transgenic animals** have had their DNA manipulated to carry and express an **extra (foreign) gene**. Over 95 percent of existing transgenic animals are **mice**; others include rats, rabbits, pigs, sheep, cows and fish.',
      v: table(['Use', 'Example'], [['Normal physiology and development', 'How genes regulate body functions'], ['Study of disease', 'Models for cancer, cystic fibrosis, rheumatoid arthritis, Alzheimer’s disease'], ['Biological products', 'α-1-antitrypsin to treat emphysema; human α-lactalbumin in milk'], ['Vaccine safety', 'Polio vaccine tested on transgenic mice'], ['Chemical safety', 'Toxicity testing with animals sensitive to toxic substances']], 'Table of uses of transgenic animals'),
      n: 'Transgenic animals let scientists see how a gene works inside a living body, and test new treatments. Some make valuable human proteins in their milk, which can be collected without harming the animal.',
    }),
    sl('example', 'Worked example 2: Rosie the cow', {
      b: `In **1997** the first transgenic cow, **Rosie**, produced milk with human **α-lactalbumin** at about **${ROSIE.gPerL} g per litre** — nutritionally more balanced for human babies. How much of the protein was in ${ROSIE.litres} litres of her milk?`,
      ul: [
        r`Protein $= ${ROSIE.gPerL} \times ${ROSIE.litres} = ${ROSIE_G}$ g.`,
        'The milk could be used to feed **human babies** better than ordinary cow milk.',
      ],
      v: table(['Milk (L)', 'α-lactalbumin (g)'], [[String(1), String(ROSIE.gPerL)], [String(ROSIE.litres), String(ROSIE_G)]], `Worked table: ${ROSIE_G} grams in ${ROSIE.litres} litres`),
      n: 'Multiply the concentration by the volume. Animals such as Rosie act as living factories for human proteins, which is sometimes called pharming.',
    }),
    sl('concept', 'Biosafety, GEAC and biopatents', {
      b: 'Genetic modification raises **ethical** and **safety** questions. In India, the **Genetic Engineering Appraisal Committee (GEAC)** decides on the **validity of GM research** and the **safety of introducing GM organisms** for public services.',
      v: table(['Issue', 'Meaning'], [['Biosafety', 'Unpredictable effects of GM organisms on the ecosystem and health'], ['Biopatent', 'A patent granted for biological entities, products or processes'], ['Biopiracy', 'Use of bio-resources by companies without proper authorisation or compensation to the countries and people concerned']], 'Table of biosafety and ethical issues'),
      n: 'Patents encourage research, but they can also let companies claim ownership of plants and knowledge that communities developed over centuries. Laws are needed so that the people who preserved these resources share the benefits.',
    }),
    sl('concept', 'Cases of biopiracy', {
      b: 'Several Indian bio-resources have been patented abroad.',
      v: table(['Resource', 'What happened'], [['Basmati rice', 'In 1997 an American company obtained a patent through the US Patent and Trademark Office on a new variety derived from Indian farmers’ varieties'], ['Turmeric', 'Patents on its medicinal use were challenged by India'], ['Neem', 'Patents on its uses were challenged by India']], 'Table of cases of biopiracy'),
      n: 'India has around twenty seven documented varieties of basmati, developed by farmers over generations. The Indian Parliament has amended the Indian Patents Bill to deal with such issues and to protect traditional knowledge.',
    }),
    sl('check', 'Quick check: transgenic products', {
      b: 'Which protein from transgenic animals is used to treat emphysema?',
      n: 'Quick check. Its name begins with alpha one.',
      chk: 'alpha-mcq',
    }),
    sl('check', 'Quick check: biopiracy', {
      b: 'Judge the assertion and the reason about biopiracy.',
      n: 'Quick check. Were the original owners asked or paid?',
      chk: 'biopiracy-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Gene therapy: 1990, ADA deficiency (SCID); lymphocytes cultured, ADA cDNA added by retroviral vector, returned; repeated; permanent cure via early stem cells.',
        'Diagnosis: PCR (low concentrations; HIV, cancer mutations), ELISA (antigen–antibody), probes with autoradiography.',
        'Transgenic animals: physiology, disease models, α-1-antitrypsin, α-lactalbumin (Rosie, 1997), vaccine and chemical safety.',
        'GEAC regulates GM research and release in India.',
        'Biopatents and biopiracy: basmati, turmeric, neem.',
      ],
      v: table(['Term', 'Key example'], [['Gene therapy', 'ADA deficiency'], ['Transgenic cow', 'Rosie'], ['Biopiracy', 'Basmati rice']], 'Summary table of key examples'),
      n: 'To recap: gene therapy can correct a defective gene, molecular methods detect disease early, and transgenic animals help research and make medicines. GEAC regulates this work, and India guards its bio-resources against biopiracy.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe **ADA gene therapy** step by step and say why it must be **repeated**.',
        'Explain how a **probe** reveals a **mutated** gene.',
        'Give **three uses** of transgenic animals with examples.',
        'Define **biopiracy** and quote the **basmati** case.',
      ],
      n: 'Exam tips. Describe gene therapy for A D A deficiency and why it is repeated. Explain how a missing probe signal shows a mutation. Give three uses of transgenic animals. And define biopiracy with the basmati example.',
    }),
  ],
});
