// ch10 Biotechnology and its Applications — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { BT, INSULIN_SVG, RNAI } from './svgs.mjs';
import { pctChange, grams, INSULIN, insulinTotal } from './calc.mjs';

export const V = {
  bt: svgV(BT, 'Steps by which Bt protoxin crystals become an active toxin in the insect gut and kill the insect'),
  insulin: svgV(INSULIN_SVG, 'Proinsulin with its C peptide and mature insulin with chains A and B joined by disulphide bridges'),
  rnai: svgV(RNAI, 'RNA interference in transgenic tobacco silencing a nematode’s messenger RNA'),
};

// ---------------------------------------------------------------- computed numbers
const COTTON = { before: 1.6, after: 2.1, spraysBefore: 9, spraysAfter: 3 };
COTTON.rise = pctChange(COTTON.before, COTTON.after);
COTTON.fall = -pctChange(COTTON.spraysBefore, COTTON.spraysAfter);
const ROSIE = { gPerL: 2.4, litres: 5 };
ROSIE.g = grams(ROSIE.gPerL, ROSIE.litres);

export const deck1 = deck({
  part: 1,
  title: 'Biotechnology and its Applications — Part 1: Applications in agriculture',
  goals: [
    'Explain the uses of genetically modified crops',
    'Explain how Bt toxin protects cotton from insect pests',
    'Explain how RNA interference protects tobacco from a nematode',
  ],
  slides: [
    sl('title', 'Biotechnology and its Applications', {
      b: 'Part 1 — how genetically modified crops can reduce losses and the use of chemical pesticides.',
      v: flow('LR', [['a', 'Agrochemical agriculture'], ['o', 'Organic agriculture'], ['g', 'Genetically engineered crops']], [['a', 'g', 'alternative'], ['o', 'g', 'alternative']], 'Flow showing three options for raising food production'),
      n: 'To grow more food, farmers can use more fertilisers and pesticides, farm organically, or use crops that are genetically engineered. Plants, bacteria, fungi and animals whose genes have been altered by manipulation are called genetically modified organisms, or GMOs. In this part we see how GM crops can help.',
    }),
    sl('concept', 'Why genetically modified crops?', {
      b: 'GM plants have been useful in many ways.',
      v: table(['Benefit', 'Example'], [['Tolerance to abiotic stresses', 'Cold, drought, salt, heat'], ['Reduced reliance on chemical pesticides', 'Pest-resistant crops'], ['Reduced post-harvest losses', 'Slower spoilage'], ['Increased efficiency of mineral use', 'Prevents early exhaustion of soil fertility'], ['Enhanced nutritional value', 'Golden rice, rich in vitamin A'], ['Industrial uses', 'Tailor-made plants supplying starches, fuels and pharmaceuticals']], 'Table of benefits of genetically modified crops with examples'),
      n: 'GM crops can be made to resist drought or salt, to fight off pests so less pesticide is sprayed, to keep longer after harvest, and to use soil minerals more efficiently. Golden rice was engineered to be rich in vitamin A. Tailor-made plants can also supply raw materials for industries.',
    }),
    sl('concept', 'Bt: a bacterial insecticide', {
      b: '***Bacillus thuringiensis*** (Bt) forms protein crystals containing an **insecticidal protein**. Bt toxins kill certain insects — **lepidopterans** (tobacco budworm, armyworm), **coleopterans** (beetles) and **dipterans** (flies, mosquitoes).',
      v: table(['Bt gene', 'Controls'], [['cryIAc, cryIIAb', 'Cotton bollworms'], ['cryIAb', 'Corn borer']], 'Table of cry genes and the pests they control'),
      n: 'The toxin genes, called cry genes, are taken from the bacterium and put into crop plants such as cotton. The plant now makes the insecticidal protein itself, so a caterpillar that feeds on it is killed. Different cry genes control different pests, which lets scientists choose the right gene for each crop.',
    }),
    sl('diagram', 'How Bt toxin kills', {
      b: 'The toxin exists as an **inactive protoxin**, so the bacterium is not harmed. In the insect gut, the **alkaline pH** solubilises the crystals and activates the toxin, which binds to **midgut epithelial cells**, makes **pores**, and causes the cells to **swell and lyse**.',
      v: V.bt,
      n: 'Why does the toxin not kill the bacterium that makes it? Because it is made in an inactive form. Only inside the alkaline gut of an insect is it switched on. The active toxin punches holes in the cells lining the gut, which swell and burst, and the insect dies. The human stomach is acidic, so this activation does not occur there.',
    }),
    sl('check', 'Quick check: protoxin', {
      b: 'Why does Bt toxin not kill the bacterium Bacillus thuringiensis itself?',
      n: 'Quick check. In what form does the bacterium store the toxin?',
      chk: 'protoxin-mcq',
    }),
    sl('example', 'Worked example 1: is Bt cotton worth it?', {
      b: `A farmer’s cotton yield rose from ${COTTON.before} to ${COTTON.after} tonnes per hectare after switching to Bt cotton, while insecticide sprays fell from ${COTTON.spraysBefore} to ${COTTON.spraysAfter} per season. Calculate both changes.`,
      ul: [
        r`Yield rise $= \dfrac{${COTTON.after} - ${COTTON.before}}{${COTTON.before}} \times 100 \approx ${COTTON.rise}$ percent.`,
        r`Spray reduction $= \dfrac{${COTTON.spraysBefore} - ${COTTON.spraysAfter}}{${COTTON.spraysBefore}} \times 100 \approx ${COTTON.fall}$ percent.`,
        'Interpretation — the plant protects itself from bollworms, so less insecticide is needed; other pests may still need control.',
      ],
      v: table(['', 'Before', 'After Bt cotton', 'Change'], [['Yield (t/ha)', String(COTTON.before), String(COTTON.after), `+${COTTON.rise}%`], ['Sprays per season', String(COTTON.spraysBefore), String(COTTON.spraysAfter), `−${COTTON.fall}%`]], `Worked table: yield up ${COTTON.rise} percent and sprays down ${COTTON.fall} percent`),
      n: 'The yield rose by about thirty-one percent and spraying fell by about sixty-seven percent. Fewer sprays save money and reduce harm to useful insects and to the farmer’s health. Bt protects only against certain insects, though, so farmers still need to watch for other pests.',
    }),
    sl('concept', 'Pest-resistant plants: the nematode problem', {
      b: 'A nematode, ***Meloidogyne incognita***, infects the roots of tobacco plants and causes a great reduction in yield. A novel strategy based on **RNA interference (RNAi)** prevents this infestation.',
      v: table(['RNAi feature', 'Detail'], [['Where it occurs', 'In all eukaryotic organisms, as a method of cellular defence'], ['What it does', 'Silences a specific mRNA because a complementary double-stranded RNA binds to it and prevents translation'], ['Natural source of dsRNA', 'Infection by RNA viruses, or mobile genetic elements (transposons) that replicate via an RNA intermediate']], 'Table of features of RNA interference'),
      n: 'RNA interference is a natural defence. When a double-stranded RNA matching a particular messenger RNA appears in a cell, it binds to that messenger and stops it from being translated. Scientists use this to switch off a chosen gene, here a gene the nematode needs to survive.',
    }),
    sl('diagram', 'RNAi protects tobacco', {
      b: 'Using ***Agrobacterium*** vectors, **nematode-specific genes** were introduced into tobacco so that the plant produces **both sense and antisense RNA**. These form **dsRNA**, which starts RNAi and **silences** the specific mRNA of the nematode.',
      v: V.rnai,
      n: 'The transgenic tobacco makes two RNA copies of a nematode gene that are complementary to each other, and they pair into double-stranded RNA. When the nematode feeds on the root, the double-stranded RNA silences the matching messenger RNA in the parasite. The parasite cannot make an essential protein and dies, so the transgenic plant is protected.',
    }),
    sl('example', 'Worked example 2: Bt or RNAi?', {
      b: 'Match each problem to a biotechnological solution and explain briefly.',
      ul: [
        'Bollworm caterpillars eating cotton bolls → **Bt cotton** with cryIAc/cryIIAb: toxin activated in the insect’s alkaline gut.',
        'Corn borer damaging maize → **Bt maize** with cryIAb.',
        'Nematodes infecting tobacco roots → **RNAi**: plant makes dsRNA that silences a nematode mRNA.',
        'Children short of vitamin A in a rice-eating region → **golden rice**, rich in vitamin A.',
      ],
      v: table(['Problem', 'Solution', 'Mechanism'], [['Cotton bollworm', 'Bt cotton', 'Toxin kills insect'], ['Corn borer', 'Bt maize (cryIAb)', 'Toxin kills insect'], ['Root nematode', 'RNAi tobacco', 'Silences parasite mRNA'], ['Vitamin A deficiency', 'Golden rice', 'Enhanced nutrition']], 'Worked table matching four problems to GM solutions'),
      n: 'Pick the solution by asking what the target is. Insects that chew leaves or bolls are killed by Bt toxins, and the right cry gene is chosen for each pest. Nematodes, which are worms, are tackled by silencing one of their genes with RNA interference. And nutritional problems can be addressed by crops with enhanced nutrients.',
    }),
    sl('check', 'Quick check: RNAi', {
      b: 'Judge the assertion and the reason about RNAi tobacco.',
      n: 'Quick check. What does the double-stranded RNA do to the nematode’s messenger RNA?',
      chk: 'rnai-ar',
    }),
    sl('check', 'Quick check: cry genes', {
      b: 'Which cry gene product controls the corn borer?',
      n: 'Quick check. Recall the table of cry genes.',
      chk: 'cry-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'GMOs: tolerance to abiotic stress, pest resistance, fewer post-harvest losses, better mineral use, enhanced nutrition (golden rice).',
        'Bt (Bacillus thuringiensis) toxin: inactive protoxin; activated by alkaline insect gut; binds midgut cells, forms pores, lysis.',
        'cry genes: cryIAc and cryIIAb (cotton bollworms), cryIAb (corn borer).',
        'RNAi: dsRNA silences a specific mRNA; nematode Meloidogyne incognita controlled in tobacco using sense and antisense RNA via Agrobacterium vectors.',
      ],
      v: table(['Technique', 'Target'], [['Bt toxin', 'Insect pests'], ['RNAi', 'Nematode']], 'Summary table of two pest-resistance techniques'),
      n: 'To recap: GM crops can raise yields and reduce pesticide use. Bt crops make an insect-killing toxin that is activated only in insect guts. RNA interference lets plants silence essential genes of pests such as nematodes.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain **why** the toxin does not harm the bacterium (protoxin) and **where** it is activated (alkaline gut).',
        'Name **cry genes** with the pests they control.',
        'Write the RNAi sequence: **genes in → sense + antisense RNA → dsRNA → mRNA silenced**.',
      ],
      n: 'Exam tips. Explain the protoxin and its activation in the alkaline gut. Learn the cry genes with their pests. And write the RNA interference steps in order.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biotechnology and its Applications — Part 2: Applications in medicine',
  goals: [
    'Explain how human insulin is produced by recombinant DNA technology',
    'Describe gene therapy with the example of ADA deficiency',
    'Describe molecular diagnosis using PCR, probes and ELISA',
    'State the idea of stem cell technology',
  ],
  slides: [
    sl('title', 'Biotechnology in medicine', {
      b: 'Part 2 — safer medicines, gene therapy and early diagnosis.',
      v: flow('LR', [['r', 'Recombinant therapeutics'], ['g', 'Gene therapy'], ['d', 'Molecular diagnosis'], ['s', 'Stem cell technology']], [['r', 'g'], ['g', 'd'], ['d', 's']], 'Flow of applications of biotechnology in medicine'),
      n: 'Recombinant DNA technology has changed health care. It enables mass production of safe and more effective medicines, which do not cause unwanted immune reactions as products from non-human sources may. About thirty recombinant therapeutics have been approved worldwide, and twelve of these are marketed in India.',
    }),
    sl('diagram', 'Insulin: two chains', {
      b: `Insulin is made of **two short polypeptide chains**, **A** (${INSULIN.A} amino acids) and **B** (${INSULIN.B} amino acids), linked by **disulphide bridges**. In the body it is synthesised as **proinsulin**, which has an extra **C peptide** that is removed during maturation.`,
      v: V.insulin,
      n: 'Insulin controls blood sugar and is needed by people with diabetes. Its structure is the challenge. The body makes it as one longer chain, proinsulin, and then cuts out a middle piece, the C peptide, leaving two chains joined by disulphide bridges. Bacteria cannot carry out this processing.',
    }),
    sl('concept', 'Making human insulin in bacteria', {
      b: 'Insulin from slaughtered cattle and pigs caused **allergic or other reactions** in some patients. In **1983**, **Eli Lilly**, an American company, prepared two DNA sequences for the **A and B chains**, introduced them into **plasmids of E. coli**, produced the chains **separately**, extracted them and **joined them by creating disulphide bonds**, forming human insulin (Humulin).',
      v: flow('TB', [['g', 'DNA for chain A and DNA for chain B'], ['p', 'Each inserted into an E. coli plasmid'], ['c', 'Chains A and B made separately'], ['e', 'Chains extracted and purified'], ['j', 'Combined by creating disulphide bonds'], ['h', 'Human insulin']], [['g', 'p'], ['p', 'c'], ['c', 'e'], ['e', 'j'], ['j', 'h']], 'Flow of recombinant production of human insulin'),
      n: 'Because bacteria cannot remove a C peptide, the trick was to make the two final chains separately. Each chain’s DNA was put into bacteria, the chains were collected and then joined chemically with disulphide bonds. The result is identical to human insulin and avoids the reactions caused by animal insulin.',
    }),
    sl('check', 'Quick check: insulin', {
      b: 'Why were chains A and B made separately in E. coli?',
      n: 'Quick check. Can bacteria remove the C peptide from proinsulin?',
      chk: 'insulin-mcq',
    }),
    sl('example', 'Worked example 1: counting insulin', {
      b: `(a) How many amino acids are there in one molecule of mature insulin? (b) Why is the C peptide not counted?`,
      ul: [
        r`(a) Chain A $+$ chain B $= ${INSULIN.A} + ${INSULIN.B} = ${insulinTotal()}$ amino acids.`,
        '(b) The C peptide is part of proinsulin but is **removed** during maturation, so it is not part of mature insulin.',
        'So recombinant production makes only the two final chains, which together contain all the amino acids of mature insulin.',
      ],
      v: table(['Part', 'Amino acids'], [['Chain A', String(INSULIN.A)], ['Chain B', String(INSULIN.B)], ['Mature insulin', String(insulinTotal())]], `Worked table: ${INSULIN.A} plus ${INSULIN.B} equals ${insulinTotal()} amino acids`),
      n: 'Add the two chains: twenty-one plus thirty gives fifty-one amino acids. The C peptide is cut away when proinsulin matures, so it is not counted. This is exactly why the manufacturers produced only chains A and B.',
    }),
    sl('concept', 'Gene therapy', {
      b: '**Gene therapy** corrects a gene defect diagnosed in a child or embryo by **inserting a normal gene** into the person’s cells to take over the function of the non-functional gene. The first clinical gene therapy was given in **1990** to a 4-year-old girl with **adenosine deaminase (ADA) deficiency**.',
      v: table(['Approach for ADA deficiency', 'Limitation'], [['Bone marrow transplantation', 'Not always possible'], ['Enzyme replacement therapy (injected ADA)', 'Not completely curative'], ['Gene therapy with patient’s lymphocytes', 'Cells are not immortal: periodic infusions needed'], ['Gene introduced into early embryonic cells (bone-marrow stem cells)', 'Could be a permanent cure']], 'Table of treatments for ADA deficiency and their limitations'),
      n: 'ADA is an enzyme crucial for the immune system to work. Its deficiency, caused by deletion of the gene, leaves the child unable to fight infections. Bone marrow transplants and enzyme injections help but do not fully cure. Gene therapy gives the child’s own cells a working copy of the gene.',
    }),
    sl('concept', 'How ADA gene therapy is done', {
      b: '**Lymphocytes** are taken from the patient’s blood and grown in culture. A functional **ADA cDNA** is introduced into them using a **retroviral vector**, and the cells are returned to the patient.',
      v: flow('LR', [['l', 'Lymphocytes taken from blood'], ['c', 'Grown in culture'], ['v', 'Functional ADA cDNA added with a retroviral vector'], ['r', 'Cells returned to the patient'], ['p', 'Repeated periodically']], [['l', 'c'], ['c', 'v'], ['v', 'r'], ['r', 'p']], 'Flow of gene therapy for ADA deficiency'),
      n: 'A disarmed retrovirus carries a working copy of the ADA gene into the lymphocytes. The corrected cells make ADA and help the immune system. Because these cells eventually die, the treatment must be repeated. A permanent cure may be possible if the gene is introduced into bone-marrow cells at an early embryonic stage.',
    }),
    sl('check', 'Quick check: gene therapy', {
      b: 'Why does gene therapy using a patient’s lymphocytes need to be repeated periodically?',
      n: 'Quick check. Do mature lymphocytes live for ever?',
      chk: 'periodic-mcq',
    }),
    sl('concept', 'Molecular diagnosis', {
      b: 'Early diagnosis is essential for effective treatment, but conventional methods (serum and urine analysis) cannot detect infection early. **PCR**, **recombinant DNA technology** and **ELISA** allow early diagnosis.',
      v: table(['Technique', 'How it helps'], [['PCR', 'Amplifies very small amounts of a pathogen’s DNA or RNA: detects HIV in suspected AIDS patients; detects mutations in suspected cancer patients and genetic disorders'], ['Labelled probe', 'A single-stranded DNA or RNA tagged with a radioactive molecule hybridises to its complementary DNA in a clone of cells; detected by autoradiography (a clone with a mutated gene does not appear on the film)'], ['ELISA', 'Based on antigen–antibody interaction: detects antigens of the pathogen or antibodies made against it']], 'Table of molecular diagnostic techniques and how each helps'),
      n: 'By the time a pathogen is numerous enough to cause symptoms, the disease may be advanced. PCR can detect even a few copies of a pathogen’s genes, so infections like HIV can be found very early. Probes find specific genes, and ELISA detects the antigen or antibodies to it.',
    }),
    sl('concept', 'Stem cell technology', {
      b: '**Stem cells** are unspecialised cells that can divide and give rise to many kinds of specialised cells. Stem cell technology aims to use them to **replace damaged cells or tissues** and to study disease.',
      v: table(['Idea', 'Example'], [['Stem cells can form many cell types', 'Cells of the inner cell mass of the early embryo'], ['Bone-marrow stem cells', 'Give rise to blood cells; used in bone marrow transplants'], ['Potential use', 'Repair or replace damaged tissues; gene therapy in early embryonic cells for a permanent cure']], 'Table of the main ideas of stem cell technology'),
      n: 'Stem cells are like blank cells that can become many different kinds. Bone-marrow stem cells, for example, make all our blood cells, which is why bone marrow transplants work. Scientists hope to use stem cells to repair damaged tissues, and introducing a corrected gene into such cells could give a lasting cure.',
    }),
    sl('example', 'Worked example 2: choosing a diagnostic test', {
      b: 'Suggest a suitable method for each situation and give a reason.',
      ul: [
        'A person exposed to HIV a short time ago, before antibodies are plentiful → **PCR** to detect viral genetic material at very low levels.',
        'Checking whether a cloned gene carries a known mutation → **labelled DNA probe** and autoradiography.',
        'Screening many blood samples for antibodies to a pathogen → **ELISA**.',
      ],
      v: table(['Situation', 'Method', 'Basis'], [['Very early HIV infection', 'PCR', 'Amplifies tiny amounts of nucleic acid'], ['Known mutation in a gene', 'Probe + autoradiography', 'Complementary hybridisation'], ['Many samples for antibodies', 'ELISA', 'Antigen–antibody interaction']], 'Worked table matching three diagnostic situations to methods'),
      n: 'Match the method to what is being detected. Nucleic acid in tiny amounts calls for PCR. A specific sequence or mutation calls for a labelled probe. Antigens or antibodies call for ELISA, which is also convenient for testing many samples.',
    }),
    sl('check', 'Quick check: ELISA', {
      b: 'Judge the assertion and the reason about ELISA.',
      n: 'Quick check. What interaction is ELISA based on?',
      chk: 'elisa-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'About 30 recombinant therapeutics approved worldwide; 12 marketed in India.',
        `Insulin: chains A (${INSULIN.A}) and B (${INSULIN.B}) with disulphide bridges; proinsulin has a C peptide. Eli Lilly (1983): chains made separately in E. coli and joined.`,
        'Gene therapy: first in 1990 for ADA deficiency; lymphocytes + ADA cDNA via retroviral vector; periodic infusions; permanent cure if gene is put into early embryonic cells.',
        'Molecular diagnosis: PCR (HIV, cancer mutations), radioactive probes with autoradiography, ELISA (antigen–antibody).',
        'Stem cells: unspecialised cells that can form many cell types; potential to repair tissues.',
      ],
      v: table(['Application', 'Example'], [['Recombinant therapeutic', 'Human insulin'], ['Gene therapy', 'ADA deficiency'], ['Diagnosis', 'PCR for HIV']], 'Summary table of medical applications'),
      n: 'To recap: recombinant insulin is made by producing chains A and B separately in bacteria. Gene therapy gives patients a working copy of a defective gene, first done for ADA deficiency. PCR, probes and ELISA allow early, precise diagnosis, and stem cells offer hope for repairing tissues.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain why **chains A and B** are made separately (C peptide).',
        'Describe **ADA gene therapy** step by step and why it is **not permanent**.',
        'Give **two uses of PCR** in diagnosis.',
        'State the **basis of ELISA**.',
      ],
      n: 'Exam tips. Explain the C peptide problem in insulin production. Describe ADA gene therapy and why it must be repeated. Give two diagnostic uses of PCR. And state that ELISA works through antigen and antibody interaction.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Biotechnology and its Applications — Part 3: Transgenic animals and ethical issues',
  goals: [
    'State the uses of transgenic animals with examples',
    'Explain the role of GEAC and the need for biosafety',
    'Explain biopiracy and patents with Indian examples',
  ],
  slides: [
    sl('title', 'Transgenic animals and ethical issues', {
      b: 'Part 3 — animals with foreign genes, and the rules and rights that should govern biotechnology.',
      v: flow('LR', [['t', 'Transgenic animals'], ['u', 'Research and products'], ['e', 'Ethical questions'], ['g', 'Regulation (GEAC) and patents']], [['t', 'u'], ['u', 'e'], ['e', 'g']], 'Flow from transgenic animals and their uses to ethical questions and regulation'),
      n: 'Animals whose DNA has been manipulated to possess and express an extra, foreign gene are called transgenic animals. Rats, rabbits, pigs, sheep, cows and fish have been made transgenic, but over ninety-five percent of all existing transgenic animals are mice. Their uses raise important ethical questions.',
    }),
    sl('concept', 'Uses of transgenic animals', {
      b: 'Transgenic animals are made to study biology and to produce useful substances.',
      v: table(['Use', 'Example'], [['Normal physiology and development', 'Study of genes for growth factors such as insulin-like growth factor'], ['Study of disease', 'Models for cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer’s disease'], ['Biological products', 'α-1-antitrypsin to treat emphysema; products for phenylketonuria and cystic fibrosis'], ['Vaccine safety', 'Transgenic mice to test the safety of polio vaccine'], ['Chemical safety (toxicity) testing', 'Animals with genes that make them more sensitive to toxic substances']], 'Table of uses of transgenic animals with examples'),
      n: 'Transgenic animals help us understand how genes control growth and how diseases develop, so that new treatments can be tested. They can also act as living factories, producing valuable human proteins in their milk. And they can make safety testing of vaccines and chemicals faster and more reliable.',
    }),
    sl('concept', 'Rosie, the transgenic cow', {
      b: 'In **1997**, the first transgenic cow, **Rosie**, produced **human protein-enriched milk** (**2.4 grams per litre**). The milk contained the human **alpha-lactalbumin** and was nutritionally a **more balanced product for human babies** than natural cow’s milk.',
      v: table(['Feature', 'Detail'], [['Year', '1997'], ['Protein', 'Human alpha-lactalbumin'], ['Amount', '2.4 g per litre of milk'], ['Benefit', 'Nutritionally more balanced for human babies']], 'Table of facts about Rosie the transgenic cow'),
      n: 'Rosie carried a human gene and produced milk containing a human protein. This shows how animals can be used to make proteins that would be hard or costly to make otherwise, by simply collecting their milk.',
    }),
    sl('example', 'Worked example 1: how much protein?', {
      b: `Rosie’s milk contained ${ROSIE.gPerL} g of human alpha-lactalbumin per litre. How much of the protein is present in ${ROSIE.litres} litres?`,
      ul: [
        r`Protein $= ${ROSIE.gPerL}\ \text{g/L} \times ${ROSIE.litres}\ \text{L} = ${ROSIE.g}\ \text{g}$.`,
        'Idea — collecting milk is a simple, non-invasive way to harvest a recombinant protein.',
      ],
      v: table(['Milk (L)', 'Protein (g)'], [['1', String(ROSIE.gPerL)], [String(ROSIE.litres), String(ROSIE.g)]], `Worked table: ${ROSIE.litres} litres contain ${ROSIE.g} grams`),
      n: 'Multiply the concentration by the volume: two point four grams per litre times five litres gives twelve grams. Animals that secrete a protein in their milk can supply it continuously, which is one reason transgenic animals are attractive for producing human proteins.',
    }),
    sl('check', 'Quick check: transgenic animals', {
      b: 'Which animals make up more than 95 percent of all existing transgenic animals?',
      n: 'Quick check. Think of the most common laboratory animal.',
      chk: 'mice-mcq',
    }),
    sl('concept', 'Biosafety and GEAC', {
      b: 'Genetic modification may have **unpredictable results** when such organisms are introduced into an ecosystem. The Indian Government set up the **Genetic Engineering Approval Committee (GEAC)**.',
      v: table(['GEAC decides on', 'Why'], [['The validity of GM research', 'To ensure research is responsible'], ['The safety of introducing GM organisms for public services', 'To protect people and ecosystems']], 'Table of the decisions made by GEAC and why'),
      n: 'Manipulating organisms raises ethical concerns. We cannot always predict how a GM organism will behave in the wild or affect other species. So GEAC examines whether GM research is valid and whether releasing a GM organism for public use is safe.',
    }),
    sl('concept', 'Patents and biopiracy', {
      b: 'Companies may seek **patents** on biological resources and on products derived from them. **Biopiracy** is the use of bio-resources by multinational companies and other organisations **without proper authorisation** from the countries and people concerned, **without compensatory payment**.',
      v: table(['Case', 'What happened'], [['Basmati rice', 'India has at least 27 documented varieties. In 1997 an American company got patent rights on basmati rice through the US Patent and Trademark Office, for a new variety derived from Indian farmers’ varieties crossed with semi-dwarf varieties'], ['Turmeric and neem', 'Attempts were made to patent uses, products and processes based on traditional Indian knowledge'], ['India’s response', 'The Indian Parliament cleared the second amendment of the Indian Patents Bill to address patent terms, emergency provisions and research and development initiatives']], 'Table of patent and biopiracy cases involving India'),
      n: 'Industrialised nations are rich financially but poor in biodiversity and traditional knowledge, while developing nations like India are rich in both. When companies patent products based on traditional knowledge or local varieties without permission or sharing benefits, it is biopiracy. India now protects its bio-resources and traditional knowledge through law.',
    }),
    sl('example', 'Worked example 2: is it biopiracy?', {
      b: 'Decide whether each case is biopiracy and give a reason.',
      ul: [
        'A foreign company patents a cream based on a traditional Indian medicinal plant use, without asking or paying the communities → **biopiracy**: unauthorised use without compensation.',
        'An Indian university develops a new rice variety with farmers, shares benefits and registers it legally → **not biopiracy**: authorised, with benefit sharing.',
        'A company crosses traditional basmati varieties with semi-dwarf rice and patents the result abroad without India’s consent → **biopiracy concern**: derived from Indian varieties without authorisation.',
      ],
      v: table(['Case', 'Authorised?', 'Benefits shared?', 'Biopiracy?'], [['Cream from traditional plant use', 'No', 'No', 'Yes'], ['University–farmer variety', 'Yes', 'Yes', 'No'], ['Basmati-derived patent', 'No', 'No', 'Yes (concern)']], 'Worked table judging three cases for biopiracy'),
      n: 'Check two things: was there proper authorisation from the country and people concerned, and were the benefits shared? If both are missing, it is biopiracy. Legal registration with consent and benefit sharing is not.',
    }),
    sl('check', 'Quick check: biopiracy', {
      b: 'Judge the assertion and the reason about biopiracy.',
      n: 'Quick check. What two things are missing in biopiracy?',
      chk: 'biopiracy-ar',
    }),
    sl('check', 'Quick check: GEAC', {
      b: 'What is the role of GEAC in India?',
      n: 'Quick check. Recall the two kinds of decisions it makes.',
      chk: 'geac-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Transgenic animals (over 95 percent mice): physiology, disease models, biological products (α-1-antitrypsin), vaccine safety (polio vaccine in mice), chemical safety.',
        'Rosie (1997): human alpha-lactalbumin in milk, 2.4 g per litre.',
        'GEAC: validity of GM research and safety of releasing GM organisms.',
        'Biopiracy: use of bio-resources without authorisation or compensation; basmati (1997), turmeric, neem; second amendment of the Indian Patents Bill.',
      ],
      v: table(['Term', 'Meaning'], [['Transgenic animal', 'Carries and expresses a foreign gene'], ['GEAC', 'Approves GM research and release'], ['Biopiracy', 'Unauthorised use without compensation']], 'Summary table of key terms'),
      n: 'To recap: transgenic animals help research and produce valuable proteins, like Rosie’s milk. Because GM organisms can have unpredictable effects, GEAC regulates research and release in India. And biopiracy, using bio-resources and traditional knowledge without permission or payment, is opposed through patent laws.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **five uses** of transgenic animals with an example each.',
        'Quote **Rosie** correctly: 1997, alpha-lactalbumin, 2.4 g per litre.',
        'Define **biopiracy** with both parts: no authorisation, no compensation.',
        'Name **GEAC** and its two roles.',
      ],
      n: 'Exam tips. Learn five uses of transgenic animals with examples. Quote the facts about Rosie accurately. Define biopiracy with both missing conditions. And name GEAC with its two roles.',
    }),
  ],
});
