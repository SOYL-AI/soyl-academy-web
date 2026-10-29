// ch10 Biotechnology and its Applications — question bank. AR keys: a b d c d a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { pctChange, pct, grams, INSULIN, insulinTotal } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 agriculture
add('protoxin-mcq', mcq({
  stem: 'Bacillus thuringiensis makes a protein that kills many insects. Why is the bacterium itself not killed by this protein?',
  right: 'It makes the protein as an inactive protoxin.',
  wrong: ['Its cell wall is made of chitin.', 'It makes the protein only after it dies.', 'Its cytoplasm is strongly alkaline.'],
  sol: 'The toxin is stored as an inactive protoxin and becomes active only in the alkaline gut of an insect — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cry-mcq', mcq({
  stem: 'A seed company wants to protect maize from the corn borer. Which Bt gene should it introduce?',
  right: 'cryIAb',
  wrong: ['cryIAc only', 'cryIIAb only', 'A gene for sense and antisense RNA of a nematode'],
  sol: 'The protein coded by cryIAb controls the corn borer; cryIAc and cryIIAb control cotton bollworms — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('alkaline-mcq', mcq({
  stem: 'Imagine an insect whose gut contents are acidic rather than alkaline. If it ate Bt toxin crystals, what would most likely happen?',
  right: 'The crystals would not be solubilised and activated, so the insect would survive.',
  wrong: ['The toxin would be activated faster and kill the insect sooner.', 'The toxin would kill the gut bacteria instead.', 'The crystals would multiply inside the gut.'],
  sol: 'Activation of the protoxin needs the alkaline pH of the insect gut; without it the toxin stays inactive — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('gmuse-mcq', mcq({
  stem: 'Which of the following is NOT a benefit claimed for genetically modified crops?',
  right: 'They make the soil permanently free of all pests.',
  wrong: ['They can tolerate abiotic stresses such as drought and salt.', 'They can reduce post-harvest losses.', 'They can have enhanced nutritional value.'],
  sol: 'GM crops can tolerate stress, reduce losses and improve nutrition, but none removes all pests from the soil — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('golden-fill', fill({
  stem: 'Golden rice is a genetically modified variety of rice that is rich in vitamin ______.',
  acc: [['A', 'vitamin A']],
  sol: 'Vitamin A.',
  d: 1, c: 'recall', t: [1],
}));
add('meloidogyne-mcq', mcq({
  stem: 'Which organism infects the roots of tobacco plants and was controlled by RNA interference?',
  right: 'The nematode Meloidogyne incognita',
  wrong: ['The bacterium Agrobacterium tumefaciens', 'The cotton bollworm', 'The corn borer'],
  sol: 'Meloidogyne incognita, a nematode, infects tobacco roots — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sense-mcq', mcq({
  stem: 'In a failed experiment, a tobacco plant was given a nematode gene that produced only sense RNA and no antisense RNA. Why was the plant not protected from the nematode?',
  right: 'No double-stranded RNA formed, so RNA interference was not triggered.',
  wrong: ['Sense RNA kills the plant cells.', 'The nematode digested the Agrobacterium vector.', 'Sense RNA activates the Bt toxin instead.'],
  sol: 'RNAi needs dsRNA, which forms only when complementary sense and antisense RNAs pair — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('dsrna-mcq', mcq({
  stem: 'Which of these could naturally trigger RNA interference in a eukaryotic cell?',
  right: 'Infection by an RNA virus that forms double-stranded RNA',
  wrong: ['Exposure to an alkaline pH', 'Uptake of a plasmid with an ampicillin-resistance gene', 'Synthesis of a single protein chain'],
  sol: 'Natural sources of dsRNA include RNA viruses and transposons that replicate through an RNA intermediate — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rnaitarget-mcq', mcq({
  stem: 'Scientists want to use RNA interference to protect a crop from a root-feeding worm. What should the transgenic crop be made to produce?',
  right: 'Both sense and antisense RNA of a gene essential to the worm',
  wrong: ['A Bt protoxin active in alkaline guts', 'Antibodies against the worm', 'Antisense RNA of one of its own genes only'],
  sol: 'Complementary sense and antisense RNAs of an essential worm gene pair into dsRNA, which silences the worm’s matching mRNA — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('insects-tf', tf({
  stem: 'Bt toxins can kill coleopterans (beetles) and dipterans (flies, mosquitoes) as well as lepidopterans.',
  key: 't',
  sol: 'True. Bt toxins kill certain lepidopterans, coleopterans and dipterans.',
  d: 1, c: 'recall', t: [1],
}));
add('rnai-ar', ar({
  a: 'Transgenic tobacco that produces double-stranded RNA matching a nematode gene is protected from Meloidogyne incognita.',
  r: 'The double-stranded RNA silences the matching mRNA of the nematode, so the parasite cannot make an essential protein.',
  key: 'a',
  sol: 'Both are true, and silencing of the nematode mRNA explains the protection — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('golden-ar', ar({
  a: 'Golden rice was developed to improve the nutritional value of a staple food.',
  r: 'Genes for Bt toxins make crop plants resistant to certain insect pests.',
  key: 'b',
  sol: 'Both statements are true, but insect resistance has nothing to do with the vitamin A content of golden rice — option (b).',
  d: 2, c: 'analysis', t: [1],
}));
add('btself-ar', ar({
  a: 'Bt toxin kills the bacterium Bacillus thuringiensis that produces it.',
  r: 'Bt toxin is produced as an inactive protoxin.',
  key: 'd',
  sol: 'The bacterium is not harmed because the toxin is made in an inactive form, so A is false and R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const b = 1.5, a = 1.95, rise = pctChange(b, a);
  add('yield-num', num({
    stem: `In a field trial, cotton yield rose from ${b} to ${a} tonnes per hectare when a farmer switched to Bt cotton. Calculate the percentage increase in yield.`,
    value: rise, unit: '%',
    sol: r`Increase $= \dfrac{${a} - ${b}}{${b}} \times 100 = \dfrac{0.45}{1.5} \times 100 = ${rise}$ percent.`,
    scheme: [[`${rise}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 30 || 'value');
}
{
  const s0 = 10, s1 = 3, fall = -pctChange(s0, s1);
  add('spray-num', num({
    stem: `After growing Bt cotton, a farmer reduced insecticide sprays from ${s0} to ${s1} per season. By what percentage did the number of sprays fall?`,
    value: fall, unit: '%',
    sol: r`Fall $= \dfrac{${s0} - ${s1}}{${s0}} \times 100 = ${fall}$ percent.`,
    scheme: [[`${fall}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 70 || 'value');
}
add('bt-short', short({
  marks: 2,
  stem: 'Explain why Bt toxin harms a bollworm feeding on Bt cotton but does not harm the bacterium that produces it.',
  model: 'The bacterium makes the toxin as an **inactive protoxin** in crystals, so it is not harmed. In the bollworm’s gut the **alkaline pH** dissolves the crystals and **activates** the toxin, which binds to **midgut epithelial cells**, creates **pores**, and makes them swell and burst, killing the insect.',
  sol: 'Protoxin; activation by alkaline gut and lysis of midgut cells.',
  scheme: [['Inactive protoxin protects the bacterium', 1], ['Alkaline activation, pores and lysis in the insect', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rnai-short', short({
  marks: 3,
  stem: 'Describe how RNA interference was used to make tobacco plants resistant to the nematode Meloidogyne incognita.',
  model: 'Using **Agrobacterium** vectors, **nematode-specific genes** were introduced into tobacco. The transgenic plant produced **both sense and antisense RNA** from these genes. Being complementary, they paired to form **double-stranded RNA (dsRNA)**, which started **RNA interference**. When the nematode fed on the roots, the dsRNA **silenced** its matching **mRNA**, so an essential protein was not made and the parasite **could not survive** in the transgenic host.',
  sol: 'Gene transfer, dsRNA formation, silencing of nematode mRNA.',
  scheme: [['Nematode genes introduced via Agrobacterium', 1], ['Sense and antisense RNA form dsRNA', 1], ['Nematode mRNA silenced; parasite dies', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('district-short', short({
  marks: 3,
  stem: 'A farming district faces three problems: frequent drought, heavy losses of grain in storage, and children short of vitamin A. Suggest how genetically modified crops could help with each problem.',
  model: '1. **Drought:** GM crops made **tolerant to abiotic stresses** such as drought could grow with less water.\n\n2. **Storage losses:** GM crops engineered to **reduce post-harvest losses** would spoil more slowly.\n\n3. **Vitamin A:** crops with **enhanced nutritional value**, such as **golden rice** rich in vitamin A, could improve children’s diets.',
  sol: 'Match each problem to a GM trait.',
  scheme: [['Abiotic-stress tolerance for drought', 1], ['Reduced post-harvest losses', 1], ['Enhanced nutrition, e.g. golden rice', 1]],
  wl: [40, 96],
  d: 2, c: 'application', t: [1],
}));
add('bt-long', long({
  stem: 'Explain how biotechnology has produced pest-resistant crops, using Bt cotton and RNAi tobacco as examples.',
  model: '**Bt cotton.** The soil bacterium Bacillus thuringiensis makes crystal proteins that kill certain insects. The toxin is coded by cry genes; cryIAc and cryIIAb control cotton bollworms and cryIAb controls corn borer. These genes were introduced into cotton, so the plant makes the toxin itself. The toxin is an inactive protoxin; when a bollworm eats the plant, the alkaline pH of its gut solubilises the crystals and activates the toxin. The active toxin binds to the midgut epithelial cells and creates pores, so the cells swell and lyse and the insect dies. Farmers therefore need fewer insecticide sprays.\n\n**RNAi tobacco.** The nematode Meloidogyne incognita infects tobacco roots and reduces yield. RNA interference is a cellular defence in eukaryotes in which a complementary double-stranded RNA silences a specific mRNA. Using Agrobacterium vectors, nematode-specific genes were introduced into tobacco so that the plant produced both sense and antisense RNA. These formed dsRNA, which silenced the nematode’s mRNA, so the parasite could not survive in the transgenic roots.',
  sol: 'Bt mechanism with cry genes; RNAi mechanism.',
  scheme: [['Bt toxin source and cry genes', 1], ['Protoxin, alkaline activation, pores and lysis', 1.5], ['RNAi principle', 1], ['Sense and antisense RNA, dsRNA, silencing of nematode mRNA', 1.5]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 medicine
add('insulin-mcq', mcq({
  stem: 'Why did Eli Lilly produce the A and B chains of human insulin separately in E. coli instead of producing proinsulin?',
  right: 'Bacteria cannot remove the C peptide to turn proinsulin into mature insulin.',
  wrong: ['The A chain is toxic to E. coli when produced alone.', 'Proinsulin is identical to mature insulin.', 'E. coli cannot make disulphide-containing proteins in any form.'],
  sol: 'Proinsulin must lose its C peptide to mature; bacteria cannot do this, so the two final chains were made separately and joined — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('periodic-mcq', mcq({
  stem: 'Gene therapy for ADA deficiency using the patient’s own lymphocytes has to be repeated periodically. Why?',
  right: 'The genetically engineered lymphocytes are not immortal.',
  wrong: ['The ADA gene is destroyed by the retrovirus.', 'Lymphocytes reject the ADA enzyme.', 'The ADA gene is lost from all body cells after a month.'],
  sol: 'The engineered lymphocytes die after some time, so fresh infusions are needed — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ada-mcq', mcq({
  stem: 'The first clinical gene therapy, given in 1990, treated a child with',
  right: 'adenosine deaminase (ADA) deficiency',
  wrong: ['type 1 diabetes', 'emphysema', 'cystic fibrosis'],
  sol: 'It was given to a 4-year-old girl with ADA deficiency — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('hiv-mcq', mcq({
  stem: 'A health worker was accidentally exposed to HIV a few days ago. Her antibody test is negative because antibodies have not yet formed in large amounts. Which test would best detect an early infection?',
  right: 'PCR to detect the virus’s genetic material',
  wrong: ['Urine analysis', 'A count of red blood cells', 'Gel electrophoresis of her serum proteins'],
  sol: 'PCR amplifies even very small amounts of viral nucleic acid, so it can detect infection before symptoms or abundant antibodies appear — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('probe-mcq', mcq({
  stem: 'A radioactive probe complementary to a normal gene is added to clones of cells, and the result is checked by autoradiography. One clone does not show up on the film. What is the most likely explanation?',
  right: 'That clone carries a mutated form of the gene, so the probe could not hybridise.',
  wrong: ['That clone has the normal gene in many copies.', 'The probe destroyed the DNA of that clone.', 'That clone has absorbed all the radioactivity.'],
  sol: 'A probe binds only to its complementary sequence; a mutated gene does not hybridise, so the clone is not seen — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('mutation-mcq', mcq({
  stem: 'A doctor suspects that a patient’s tumour carries a mutation in a particular gene, but the biopsy yields very little DNA. Which technique should be used first so that the gene can be examined?',
  right: 'PCR, to amplify the gene from the small amount of DNA',
  wrong: ['ELISA, to amplify the gene', 'Bone marrow transplantation', 'Enzyme replacement therapy'],
  sol: 'PCR amplifies very low amounts of DNA and is used to detect mutations in suspected cancer patients — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('animal-mcq', mcq({
  stem: 'What was the main drawback of insulin extracted from slaughtered cattle and pigs?',
  right: 'It caused allergy or other reactions in some patients.',
  wrong: ['It could not lower blood sugar at all.', 'It was made of a single chain without disulphide bridges.', 'It contained live bacteria.'],
  sol: 'Animal insulin could trigger allergic or other reactions to the foreign protein — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('permanent-mcq', mcq({
  stem: 'The parents of a child with ADA deficiency ask whether any approach could avoid lifelong repeated treatment. Which approach could offer a permanent cure?',
  right: 'Introducing the ADA gene from marrow cells into cells at an early embryonic stage',
  wrong: ['Monthly injections of the ADA enzyme', 'A single infusion of engineered lymphocytes', 'Antibiotic treatment of the bone marrow'],
  sol: 'Introducing the gene into early embryonic cells could make it permanent, unlike repeated enzyme injections or short-lived lymphocytes — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('stem-mcq', mcq({
  stem: 'Which statement best describes stem cells?',
  right: 'Unspecialised cells that can divide and give rise to many kinds of specialised cells',
  wrong: ['Fully specialised cells that can no longer divide', 'Cells found only in plant stems', 'Bacterial cells used to make recombinant proteins'],
  sol: 'Stem cells are unspecialised and can form many cell types — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('marrow-mcq', mcq({
  stem: 'A patient’s bone marrow is destroyed during cancer treatment. A transplant of healthy bone marrow later restores all types of blood cells. Which cells in the transplant make this possible?',
  right: 'Stem cells that can produce the different blood cell types',
  wrong: ['Mature red blood cells that divide rapidly', 'Antibodies that turn into cells', 'Platelets that change into lymphocytes'],
  sol: 'Bone-marrow stem cells are unspecialised and give rise to every type of blood cell — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cpeptide-tf', tf({
  stem: 'Mature human insulin contains the C peptide joining its two chains.',
  key: 'f',
  sol: 'False. The C peptide is present in proinsulin but is removed during maturation; the chains in mature insulin are joined by disulphide bridges.',
  d: 2, c: 'understanding', t: [2],
}));
add('therapeutics-fill', fill({
  stem: 'About 30 recombinant therapeutics have been approved for human use worldwide; ______ of these are marketed in India.',
  acc: [['12', 'twelve']],
  sol: 'Twelve.',
  d: 1, c: 'recall', t: [2],
}));
add('elisa-ar', ar({
  a: 'ELISA can detect an infection by finding either the pathogen’s antigens or the antibodies made against it.',
  r: 'ELISA works by amplifying small amounts of the pathogen’s DNA.',
  key: 'c',
  sol: 'A is true; R is false, because ELISA is based on antigen–antibody interaction, while amplification of DNA is done by PCR — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('lymph-ar', ar({
  a: 'A single infusion of genetically engineered lymphocytes cures ADA deficiency for life.',
  r: 'Genetically engineered lymphocytes are not immortal.',
  key: 'd',
  sol: 'Because the engineered lymphocytes die, periodic infusions are needed, so A is false while R is true — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('diagnosis-match', match({
  stem: 'Match each technique (column I) with its use in medicine (column II).',
  pairs: [
    ['PCR', 'Detects very small amounts of a pathogen’s nucleic acid'],
    ['ELISA', 'Detects antigens or antibodies through antigen–antibody interaction'],
    ['Radioactive probe', 'Finds a specific gene by hybridisation and autoradiography'],
    ['Retroviral vector', 'Delivers a functional gene into a patient’s cells'],
  ],
  order: [1, 3, 0, 2],
  sol: 'PCR — nucleic-acid detection; ELISA — antigen or antibody; probe — specific gene; retroviral vector — gene delivery.',
  d: 2, c: 'understanding', t: [2],
}));
{
  const total = insulinTotal();
  add('insulin-num', num({
    stem: `Chain A of human insulin has ${INSULIN.A} amino acids and chain B has ${INSULIN.B}. A recombinant factory produces the two chains separately and then joins one of each. How many amino acids are there in one molecule of the insulin produced?`,
    value: total,
    sol: r`Insulin $= ${INSULIN.A} + ${INSULIN.B} = ${total}$ amino acids (the C peptide is not part of mature insulin).`,
    scheme: [[`${total}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 51 || 'value');
}
add('insulin-short', short({
  marks: 3,
  stem: 'Describe how human insulin was produced by recombinant DNA technology, and why this insulin is preferred to insulin from animals.',
  model: 'Mature insulin has two chains, **A and B**, linked by **disulphide bridges**; it is made in the body as proinsulin with a **C peptide** that bacteria cannot remove. In **1983 Eli Lilly** prepared DNA sequences for **chains A and B**, put them into **plasmids of E. coli**, produced the two chains **separately**, extracted them and **joined them by disulphide bonds**. It is identical to human insulin, so it avoids the **allergic reactions** caused by animal insulin.',
  sol: 'Structure, process, advantage.',
  scheme: [['Two chains and C peptide problem', 1], ['Chains made separately in E. coli and joined', 1], ['No allergic reactions', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('genetherapy-short', short({
  marks: 3,
  stem: 'Describe the steps of gene therapy for ADA deficiency.',
  model: '**Lymphocytes** are taken from the patient’s blood and **grown in culture** outside the body. A functional **ADA cDNA** is introduced into them using a **retroviral vector**. The engineered lymphocytes are **returned to the patient**, where they make ADA and help the immune system work. Because these cells are not immortal, the patient needs **periodic infusions** of engineered lymphocytes.',
  sol: 'Culture, retroviral vector, return, repetition.',
  scheme: [['Lymphocytes taken and cultured', 1], ['ADA cDNA added by retroviral vector', 1], ['Returned; repeated periodically', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('diagnosis-short', short({
  marks: 2,
  stem: 'Why can conventional methods not detect many infections early, and how does PCR overcome this?',
  model: 'Conventional methods such as **serum and urine analysis** detect a disease only when the pathogen has multiplied and **symptoms appear**. **PCR amplifies** very small amounts of the pathogen’s **DNA or RNA**, so infections such as **HIV** can be detected while the pathogen is still scarce.',
  sol: 'Late detection; amplification by PCR.',
  scheme: [['Conventional methods need many pathogens or symptoms', 1], ['PCR amplifies tiny amounts of nucleic acid', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('elisa-short', short({
  marks: 2,
  stem: 'A blood bank wants to screen donated blood for an infection. Explain how ELISA could be used, stating its principle and the two kinds of molecules it could look for.',
  model: 'ELISA is based on **antigen–antibody interaction**. The blood bank could test each sample for the **antigens** of the pathogen, such as its proteins or glycoproteins, or for the **antibodies** that a donor’s body has made against the pathogen; a positive result marks the blood unsafe.',
  sol: 'Principle and two targets.',
  scheme: [['Antigen–antibody interaction', 1], ['Detects antigen or antibody', 1]],
  d: 2, c: 'application', t: [2],
}));
add('genetherapy-long', long({
  stem: 'A child is diagnosed with ADA deficiency. Explain the cause of the disorder, and compare the treatments available for it, judging which could give a permanent cure.',
  model: '**Cause.** Adenosine deaminase is an enzyme crucial for the immune system to function. The disorder is caused by deletion of the gene for ADA, so the child cannot make the enzyme and has a weak immune system.\n\n**Treatments.** Bone marrow transplantation can help, but a suitable donor is not always available. Enzyme replacement therapy supplies functional ADA by injection, but it must be continued and is not completely curative. In gene therapy, lymphocytes from the patient’s blood are grown in culture, a functional ADA cDNA is introduced into them with a retroviral vector, and the cells are returned to the patient. This treats the cause rather than replacing the enzyme, but the engineered lymphocytes are not immortal, so periodic infusions are needed.\n\n**Judgement.** None of these is permanent as usually given. A permanent cure could come only if the ADA gene isolated from marrow cells were introduced into cells at an early embryonic stage, so that all cells derived from them carry a working gene.',
  sol: 'Cause; three treatments with limitations; permanent cure.',
  scheme: [['Cause: ADA gene deletion and immune failure', 1], ['Bone marrow transplant and enzyme replacement with limits', 1], ['Gene therapy steps', 1.5], ['Need for repetition and permanent-cure approach', 1.5]],
  wl: [80, 220],
  d: 4, c: 'evaluation', t: [2],
}));
add('diagnosis-long', long({
  stem: 'Explain how recombinant DNA technology, PCR and ELISA help in the early diagnosis of disease.',
  model: '**Need.** Early diagnosis allows effective treatment, but conventional methods such as serum and urine analysis cannot detect a disease until the pathogen has multiplied and symptoms have appeared.\n\n**PCR.** The polymerase chain reaction amplifies very small amounts of a pathogen’s DNA or RNA to detectable levels. It is used to detect HIV in suspected AIDS patients and to detect mutations in genes of suspected cancer patients; it also helps identify many genetic disorders.\n\n**Probes.** A single-stranded DNA or RNA tagged with a radioactive molecule is allowed to hybridise with its complementary DNA in a clone of cells and is detected by autoradiography. A clone with a mutated gene does not appear on the film, because the probe is not complementary to it.\n\n**ELISA.** The enzyme-linked immunosorbent assay is based on antigen–antibody interaction. It can detect the antigens of a pathogen, or the antibodies made against it, in a sample.',
  sol: 'Need for early diagnosis; PCR, probes, ELISA.',
  scheme: [['Limits of conventional methods', 1], ['PCR with two uses', 1.5], ['Probe and autoradiography', 1.5], ['ELISA principle', 1]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 transgenic animals
add('mice-mcq', mcq({
  stem: 'More than 95 percent of all existing transgenic animals are',
  right: 'mice',
  wrong: ['cows', 'sheep', 'fish'],
  sol: 'Mice make up over 95 percent of transgenic animals — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('antitrypsin-mcq', mcq({
  stem: 'The human protein α-1-antitrypsin, produced by transgenic animals, is used to treat',
  right: 'emphysema',
  wrong: ['diabetes', 'ADA deficiency', 'polio'],
  sol: 'α-1-antitrypsin is used to treat emphysema — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('polio-mcq', mcq({
  stem: 'Before a batch of polio vaccine is used on children, its safety can be checked in',
  right: 'transgenic mice',
  wrong: ['Bt cotton plants', 'E. coli carrying pBR322', 'nematodes'],
  sol: 'Transgenic mice are used to test the safety of the polio vaccine — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('rosie-mcq', mcq({
  stem: 'The milk of Rosie, the first transgenic cow, was enriched with which human protein?',
  right: 'Alpha-lactalbumin',
  wrong: ['Insulin', 'α-1-antitrypsin', 'Adenosine deaminase'],
  sol: 'Rosie produced milk containing human alpha-lactalbumin — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('toxicity-mcq', mcq({
  stem: 'A company must find out quickly whether a new chemical is toxic. How could transgenic animals help?',
  right: 'Animals carrying genes that make them more sensitive to toxic substances would show effects in less time.',
  wrong: ['Transgenic animals cannot be harmed by any chemical.', 'Transgenic animals turn the chemical into a vaccine.', 'Transgenic animals produce the chemical in their milk.'],
  sol: 'Transgenic animals made more sensitive to toxins allow toxicity testing in less time — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('alzheimer-mcq', mcq({
  stem: 'Researchers want to test new drugs for Alzheimer’s disease before human trials. Which use of transgenic animals fits this aim?',
  right: 'Animals made to serve as models for the human disease',
  wrong: ['Animals that make human protein in their milk', 'Animals that test the safety of vaccines', 'Animals that study normal growth factors only'],
  sol: 'Transgenic animals are made as models for human diseases such as Alzheimer’s so that new treatments can be investigated — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('product-mcq', mcq({
  stem: 'A biotech firm wants a cheaper, continuous source of a human therapeutic protein. Which transgenic approach does this suggest?',
  right: 'An animal engineered to secrete the protein in its milk',
  wrong: ['A mouse engineered to be sensitive to toxins', 'A tobacco plant producing dsRNA', 'A Bt maize plant'],
  sol: 'Transgenic animals can be made to produce biological products such as human proteins, often collected in milk — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const L = 15, g = grams(2.4, L);
  add('rosie-num', num({
    stem: `Rosie’s milk contained 2.4 grams of human alpha-lactalbumin per litre. How many grams of this protein are present in ${L} litres of her milk?`,
    value: g, unit: 'g',
    sol: r`Protein $= 2.4 \times ${L} = ${g}$ g.`,
    scheme: [[`${g} g`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 36 || 'value');
}
add('transgenic-short', short({
  marks: 2,
  stem: 'What is a transgenic animal? Give two examples of useful products obtained from transgenic animals.',
  model: 'An animal whose DNA has been manipulated to **possess and express an extra (foreign) gene**. Products: human **α-1-antitrypsin** for treating **emphysema**; milk enriched with human **alpha-lactalbumin** from the transgenic cow **Rosie**.',
  sol: 'Definition; two products.',
  scheme: [['Definition', 1], ['Two products', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('rosie-short', short({
  marks: 2,
  stem: 'Rosie’s milk was described as nutritionally more balanced for human babies than ordinary cow milk. Explain why, and state what this shows about transgenic animals.',
  model: 'Rosie carried a human gene and produced milk containing human **alpha-lactalbumin** (**2.4 g per litre**), a protein of human milk, so it suited **human babies** better. It shows that transgenic animals can be used to **produce human proteins** that are hard or costly to make.',
  sol: 'Human protein in milk; animals as producers.',
  scheme: [['Human alpha-lactalbumin in milk', 1], ['Transgenic animals as producers of useful proteins', 1]],
  d: 2, c: 'application', t: [3],
}));
add('uses-short', short({
  marks: 3,
  stem: 'A university plans to set up a facility for transgenic animals. Suggest three different research or practical uses it could serve, with one example for each.',
  model: '1. **Study of normal physiology and development:** how genes such as **insulin-like growth factor** affect growth.\n\n2. **Models for human disease:** mice developed as models for **cancer**, **cystic fibrosis** or **Alzheimer’s disease** to test new treatments.\n\n3. **Vaccine and chemical safety:** testing the safety of **polio vaccine** in transgenic mice, or toxicity testing in sensitive animals.',
  sol: 'Any three uses with examples.',
  scheme: [['First use with example', 1], ['Second use with example', 1], ['Third use with example', 1]],
  d: 2, c: 'application', t: [3],
}));
add('transgenic-long', long({
  stem: 'What are transgenic animals? Describe five ways in which they are useful, with an example for each.',
  model: '**Transgenic animals** are animals whose DNA has been manipulated to possess and express an extra, foreign gene. Rats, rabbits, pigs, sheep, cows and fish have been made transgenic, but over 95 percent of all existing transgenic animals are mice.\n\n1. **Normal physiology and development:** they show how genes are regulated and how their products affect body functions, for example insulin-like growth factor.\n2. **Study of disease:** they serve as models for human diseases such as cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer’s disease, so that new treatments can be investigated.\n3. **Biological products:** they can produce useful human proteins, such as α-1-antitrypsin for emphysema; the cow Rosie produced milk with human alpha-lactalbumin.\n4. **Vaccine safety:** transgenic mice are used to test the safety of polio vaccine before use in humans.\n5. **Chemical safety testing:** animals carrying genes that make them more sensitive to toxic substances give toxicity results in less time.',
  sol: 'Definition; five uses with examples.',
  scheme: [['Definition', 1], ['Physiology and disease models', 1.5], ['Biological products', 1], ['Vaccine and chemical safety', 1.5]],
  wl: [80, 220],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 ethical issues
add('geac-mcq', mcq({
  stem: 'In India, which body decides on the validity of genetic modification research and the safety of introducing GM organisms for public services?',
  right: 'The Genetic Engineering Approval Committee (GEAC)',
  wrong: ['The US Patent and Trademark Office', 'The Indian Council of Medical Research', 'The World Health Organization'],
  sol: 'GEAC was set up by the Indian Government for these decisions — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('basmati-mcq', mcq({
  stem: 'In 1997, an American company obtained patent rights on basmati rice. Why did this cause concern in India?',
  right: 'The variety was derived from Indian farmers’ traditional varieties, without their authorisation or compensation.',
  wrong: ['Basmati rice is a GM crop banned in India.', 'The patent was granted by GEAC without trials.', 'Basmati rice cannot be grown outside India.'],
  sol: 'The patented variety came from crossing Indian farmers’ varieties with semi-dwarf varieties, so it used India’s bio-resources without consent or benefit sharing — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('pirate-mcq', mcq({
  stem: 'Which situation is an example of biopiracy?',
  right: 'A foreign firm patents a skin cream based on a traditional Indian plant remedy without permission from or payment to the communities that developed it.',
  wrong: ['An Indian institute registers a new rice variety developed with farmers who share its profits.', 'A university publishes research on neem with credit to local healers and their consent.', 'GEAC refuses permission to release a GM crop.'],
  sol: 'Biopiracy is the use of bio-resources or traditional knowledge without proper authorisation and without compensation — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('release-mcq', mcq({
  stem: 'A company wants to release a genetically modified fish into Indian rivers to increase fish catches. What should happen before release?',
  right: 'GEAC should assess the safety of introducing the GM organism, as its effects on the ecosystem may be unpredictable.',
  wrong: ['Nothing; GM organisms always behave predictably in nature.', 'The fish should be patented in another country first.', 'Only the price of the fish needs approval.'],
  sol: 'Genetic modification may have unpredictable results in an ecosystem, so GEAC must judge the safety of release — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('patentbill-tf', tf({
  stem: 'The Indian Parliament has cleared the second amendment of the Indian Patents Bill, which takes issues such as patent terms and emergency provisions into consideration.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('basmati-fill', fill({
  stem: 'India has at least ______ documented varieties of basmati rice.',
  acc: [['27', 'twenty-seven', 'twenty seven']],
  sol: '27.',
  d: 1, c: 'recall', t: [4],
}));
add('turmeric-tf', tf({
  stem: 'Turmeric and neem are traditional Indian resources that have been the subject of patent attempts by others.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('biopiracy-ar', ar({
  a: 'Patenting a product derived from traditional basmati varieties without India’s consent is regarded as biopiracy.',
  r: 'Biopiracy is the use of bio-resources without proper authorisation from the countries and people concerned and without compensatory payment.',
  key: 'a',
  sol: 'Both are true, and the definition in R explains why the act in A is biopiracy — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('geac-short', short({
  marks: 2,
  stem: 'A seed company wants to sell a new GM variety of mustard to farmers across India. Explain why its release must be regulated and which body would decide.',
  model: 'Genetic modification may have **unpredictable results** when a GM crop is grown in an open **ecosystem**, affecting other species or people. In India, the **Genetic Engineering Approval Committee (GEAC)** decides on the **validity of GM research** and the **safety of introducing GM organisms** for public use.',
  sol: 'Unpredictable effects; GEAC and its roles.',
  scheme: [['Unpredictable effects in ecosystems', 1], ['GEAC and its two roles', 1]],
  d: 2, c: 'application', t: [4],
}));
add('biopiracy-short', short({
  marks: 3,
  stem: 'Developing countries such as India are said to be more exposed to biopiracy than industrialised nations. Explain why, and state what India has done about it.',
  model: '**Biopiracy** is the use of bio-resources by multinational companies and other organisations **without proper authorisation** and **without compensatory payment**. Industrialised nations are rich financially but **poor in biodiversity and traditional knowledge**, while developing nations are **rich in both**, so their resources are the ones exploited, as with **basmati**, **turmeric** and **neem**. India’s Parliament has cleared the **second amendment of the Indian Patents Bill** to address such issues.',
  sol: 'Definition; imbalance of resources; Indian response.',
  scheme: [['Definition of biopiracy', 1], ['Biodiversity and knowledge imbalance with example', 1], ['Indian Patents Bill amendment', 1]],
  d: 3, c: 'application', t: [4],
}));
add('ethics-long', long({
  stem: 'Discuss the ethical issues raised by biotechnology, with reference to biosafety, patents and biopiracy. Use Indian examples and suggest how a country can protect its interests.',
  model: '**Biosafety.** Manipulating living organisms can have unpredictable results when GM organisms enter an ecosystem. India therefore set up the Genetic Engineering Approval Committee (GEAC) to decide on the validity of GM research and the safety of introducing GM organisms for public services.\n\n**Patents.** Companies seek patents on products and technologies that use genetic materials, plants and other biological resources. Many such resources were identified, developed and used for centuries by farmers and indigenous people. In 1997 an American company obtained patent rights on basmati rice through the US Patent and Trademark Office, for a variety derived from Indian farmers’ varieties crossed with semi-dwarf varieties, though India has at least 27 documented basmati varieties. Turmeric and neem have also faced patent attempts.\n\n**Biopiracy.** This is the use of bio-resources without proper authorisation from the countries and people concerned and without compensatory payment. It arises because industrialised nations are rich financially but poor in biodiversity and traditional knowledge, while developing nations are rich in both.\n\n**Protection.** A country can make laws against unauthorised exploitation of its bio-resources and traditional knowledge, insist on benefit sharing, and regulate GM release; India’s Parliament cleared the second amendment of the Indian Patents Bill for this purpose.',
  sol: 'Biosafety and GEAC; patents with basmati; biopiracy; protection.',
  scheme: [['Biosafety and GEAC', 1], ['Patents with the basmati example', 1.5], ['Biopiracy defined with reason', 1.5], ['Protection measures, Patents Bill amendment', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const y0 = 1.4, y1 = 1.75, rise = pctChange(y0, y1);
  add('bt-case', mk.case({
    passage: `An agricultural officer compared two neighbouring cotton fields for one season.\n\n| Field | Crop | Insecticide sprays | Yield (t/ha) |\n|---|---|---|---|\n| P | Ordinary cotton | 12 | ${y0} |\n| Q | Bt cotton (cryIAc) | 4 | ${y1} |\n\nBollworm damage was heavy in field P and very low in field Q, but sap-sucking insects were seen in both fields.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Why did bollworms feeding on field Q die?',
        right: 'The toxin made by the plant was activated in the alkaline gut of the bollworm and damaged its midgut cells.',
        wrong: ['The plant made antibodies against the bollworm.', 'The plant produced dsRNA against the bollworm.', 'The insecticide sprays alone killed them.'],
        sol: 'The cryIAc protein is a protoxin activated by the alkaline insect gut; it makes pores in midgut cells — option (@K).',
        d: 2, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'By what percentage was the yield of field Q higher than that of field P?',
        value: rise, unit: '%',
        sol: r`$\dfrac{${y1} - ${y0}}{${y0}} \times 100 = \dfrac{0.35}{1.4} \times 100 = ${rise}$ percent.`,
        scheme: [[`${rise}%`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Field Q still needed four sprays. Suggest why, and state one benefit of needing fewer sprays.',
        model: 'Bt toxins are **specific to certain insects** such as bollworms; **other pests**, like the sap-sucking insects seen, are not controlled, so some spraying is still needed. Fewer sprays mean **lower costs** and **less harm** to useful insects, the environment and the farmer’s health.',
        sol: 'Toxin specificity; benefit.',
        scheme: [['Toxin is specific; other pests remain', 1], ['One benefit of fewer sprays', 1]],
        d: 3, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The bacterium that is the source of the cryIAc gene is not harmed by its own toxin. Explain why.',
          model: 'Bacillus thuringiensis makes the toxin as an **inactive protoxin** stored in **crystals**. It becomes active only when the **alkaline pH** of an insect’s gut solubilises the crystals, so the bacterium itself is not affected.',
          sol: 'Inactive protoxin.',
          scheme: [['Inactive protoxin', 1], ['Activated only in alkaline insect gut', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 25 || 'value');
}
{
  const pb = pct(INSULIN.B, insulinTotal());
  add('insulin-case', mk.case({
    passage: `People with diabetes once received insulin extracted from the pancreas of cattle and pigs. In the human body, insulin is first made as proinsulin, which contains an extra stretch called the C peptide. During maturation the C peptide is removed, leaving chain A (${INSULIN.A} amino acids) and chain B (${INSULIN.B} amino acids) held together by disulphide bridges. In 1983 a company made human insulin by producing chains A and B separately in E. coli and then joining them.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which part of proinsulin is absent from mature insulin?',
        right: 'The C peptide',
        wrong: ['Chain A', 'Chain B', 'The disulphide bridges'],
        sol: 'The C peptide is removed during maturation — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of the amino acids of mature insulin are in chain B? Give your answer to one decimal place.',
        value: pb, tol: 0.05, unit: '%',
        sol: r`Total $= ${INSULIN.A} + ${INSULIN.B} = ${insulinTotal()}$; $\dfrac{${INSULIN.B}}{${insulinTotal()}} \times 100 = ${pb}$ percent.`,
        scheme: [[`${pb}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the company made chains A and B separately instead of making proinsulin in E. coli.',
        model: 'Proinsulin becomes active only after its **C peptide is removed**. **E. coli cannot carry out this processing**, so making proinsulin would not give mature insulin. Making the **two final chains separately** and **joining them by disulphide bonds** avoids this problem.',
        sol: 'Bacteria cannot remove the C peptide.',
        scheme: [['Bacteria cannot remove the C peptide', 1], ['Chains made separately and joined', 1]],
        d: 3, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Give two reasons why recombinant human insulin is preferred to insulin from cattle and pigs.',
          model: 'It is **identical to human insulin**, so it does not cause the **allergic or other reactions** to a foreign protein seen with animal insulin. It can be **mass-produced** in bacteria, giving a reliable supply that does not depend on slaughtered animals.',
          sol: 'No reactions; mass production.',
          scheme: [['No allergic reactions', 1], ['Mass production and reliable supply', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => Math.abs(q.children[1].answer.value - 58.8) < 1e-9 || 'value');
}
{
  const perDay = 20, g = grams(2.4, perDay);
  add('transgenic-case', mk.case({
    passage: `A research farm keeps a transgenic cow that, like Rosie, carries a human gene and secretes human alpha-lactalbumin in its milk at 2.4 grams per litre. The cow gives ${perDay} litres of milk a day. The same farm also keeps transgenic mice used to check vaccine batches.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What makes the cow “transgenic”?',
        right: 'Its DNA has been manipulated so that it carries and expresses a foreign (human) gene.',
        wrong: ['It was produced by crossing two breeds of cow.', 'It was fed on GM fodder.', 'It was vaccinated with a recombinant vaccine.'],
        sol: 'A transgenic animal possesses and expresses an extra, foreign gene — option (@K).',
        d: 1, c: 'recall', t: [3],
      })),
      part('b', num({
        stem: 'How many grams of human alpha-lactalbumin does the cow produce in one day?',
        value: g, unit: 'g',
        sol: r`$2.4 \times ${perDay} = ${g}$ g per day.`,
        scheme: [[`${g} g`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain how the transgenic mice on the farm help to protect children who receive the polio vaccine.',
        model: 'Each vaccine batch is first **tested on the transgenic mice**; if the mice show **no harmful effects**, the batch is judged **safe**. This checks the **safety of the polio vaccine** before it is given to children, and could replace the use of monkeys for such tests.',
        sol: 'Vaccine safety testing in mice.',
        scheme: [['Batches tested on transgenic mice', 1], ['Ensures safety before use in children', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Give two other uses of transgenic animals, apart from producing proteins and testing vaccines.',
          model: '1. **Models for human disease**, such as cancer, cystic fibrosis or Alzheimer’s disease, to investigate treatments.\n2. **Chemical safety testing**: animals made more sensitive to toxic substances give results in less time. (Also: study of normal physiology and development.)',
          sol: 'Any two other uses.',
          scheme: [['First use', 1], ['Second use', 1]],
          d: 1, c: 'recall', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 48 || 'value');
}
add('biopiracy-case', mk.case({
  passage: 'For generations, healers in a forest village have used a paste made from the leaves of a local plant to treat skin infections. A foreign company learns of the remedy from a visiting researcher, isolates the active compound, and obtains a patent abroad for a cream made from it. The village is neither asked nor paid. Meanwhile, an Indian firm applies to grow a GM version of the plant in open fields.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the company’s action an example of?',
      right: 'Biopiracy',
      wrong: ['Biosafety', 'Gene therapy', 'RNA interference'],
      sol: 'It uses a bio-resource and traditional knowledge without authorisation or compensation — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'Which body in India must decide whether the GM plant can be grown in open fields?',
      right: 'GEAC',
      wrong: ['The foreign company', 'The US Patent and Trademark Office', 'The village council alone'],
      sol: 'GEAC decides on the safety of introducing GM organisms for public use — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'State two things that should have been done for the company’s use of the remedy to be fair.',
      model: 'The company should have obtained **proper authorisation** from the **country and the village community** before using the plant and the knowledge, and it should have made a **compensatory payment** or **shared the benefits** from the cream with them.',
      sol: 'Authorisation and compensation.',
      scheme: [['Authorisation from country and people', 1], ['Compensation or benefit sharing', 1]],
      d: 2, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why is careful approval needed before the GM plant is grown in open fields?',
        model: 'Genetic modification may have **unpredictable results** once a GM organism enters an **ecosystem**, for example effects on other species. GEAC must therefore judge the **safety** of releasing the plant before it is grown in open fields.',
        sol: 'Unpredictable ecological effects.',
        scheme: [['Unpredictable effects in the ecosystem', 1], ['Safety assessment before release', 1]],
        d: 2, c: 'understanding', t: [4],
      }),
    ]),
  ],
}));
