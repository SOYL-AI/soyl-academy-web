// ISC 12 Biology ch15 Biotechnology and its Applications — question bank in ISC style.
// Plantlet numbers, insulin arithmetic, protein yields and percentages are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { plantlets, INSULIN, insulinTotal, grams, pct, pctChange } from './calc.mjs';
import { BT, RNAI } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const btFig = svgV(BT, 'How Bt toxin is activated in the insect gut and kills the larva');
const rnaiFig = svgV(RNAI, 'RNA interference silencing a nematode gene in transgenic tobacco');

// ---------------------------------------------------------------- t01 tissue culture and GM crops
add('meristem-mcq', mcq({
  stem: 'A sugarcane variety is infected with a virus. Why do growers culture its apical meristems to obtain healthy plants?',
  right: 'The meristems are usually free of virus even when the rest of the plant is infected.',
  wrong: ['Meristem cells produce antibodies against viruses.', 'Viruses cannot survive the nutrient medium.', 'Meristems contain no DNA for the virus to attack.'],
  sol: 'Apical and axillary meristems are virus-free, so plants raised from them are healthy — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('somatic-mcq', mcq({
  stem: 'To fuse a tomato cell with a potato cell, a scientist first treats both with enzymes. Which enzymes, and why?',
  right: 'Cellulase and pectinase, to remove the cell walls and obtain protoplasts',
  wrong: ['Lysozyme and protease, to break the nuclei', 'Restriction enzymes, to cut the chromosomes', 'DNA ligase, to join the two cells'],
  sol: 'Cell walls must be digested before protoplasts can fuse — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('somaclone-mcq', mcq({
  stem: 'Thousands of banana plants raised by micropropagation from one high-yielding plant all give fruit of the same quality. Why?',
  right: 'They are somaclones, genetically identical to the parent plant.',
  wrong: ['They are hybrids of two varieties.', 'They were all grown from seeds of one fruit.', 'They are transgenic plants with a new gene.'],
  sol: 'Micropropagation produces genetically identical plants — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gmadv-mcq', mcq({
  stem: 'In a region where crops often fail because of long dry spells and saline soil, which advantage of GM crops would help farmers most?',
  right: 'Greater tolerance to abiotic stresses such as drought and salt',
  wrong: ['Reduced post-harvest losses during storage', 'Production of pharmaceuticals in leaves', 'Resistance to cotton bollworms'],
  sol: 'GM crops can be made tolerant to drought and salinity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('totipotency-fill', fill({
  stem: 'The capacity of a single plant cell or explant to regenerate a whole plant is called ______.',
  acc: [['totipotency']],
  sol: 'Totipotency.',
  d: 1, c: 'recall', t: [1],
}));
{
  const n = plantlets(2, 5, 3);
  add('plantlet-num', num({
    stem: 'A laboratory starts with 2 explants of an orchid. At each subculture every shoot gives 5 new shoots. How many plantlets will there be after 3 subcultures?',
    value: n,
    sol: r`Plantlets $= 2 \times 5^{3} = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 250 || 'value');
}
add('meristem-short', short({
  marks: 1,
  stem: 'Give a reason: potato growers buy “meristem-cultured” seed tubers even though they cost more.',
  model: 'Plants raised from **meristems** are **virus-free**, so the crop is healthier and gives **higher yield**.',
  sol: 'Virus-free.',
  scheme: [['Virus-free, higher yield', 1]],
  d: 2, c: 'application', t: [1],
}));
add('microprop-short', short({
  marks: 2,
  stem: 'What is micropropagation? Give two of its advantages.',
  model: '**Micropropagation** is the production of a **large number of plants** in a short time by **tissue culture** of explants on a sterile nutrient medium with growth regulators. Advantages: the plants are **genetically identical (somaclones)** to a good parent; **many plants** are obtained **quickly**, at any season, and from little material.',
  sol: 'Definition and advantages.',
  scheme: [['Definition', 1], ['Two advantages', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('somatic-short', short({
  marks: 3,
  stem: 'Describe the steps of somatic hybridisation and name one somatic hybrid.',
  model: 'Single cells of two plants are isolated, and their walls are digested with **cellulase and pectinase** to give naked **protoplasts**. Protoplasts of the **two varieties or species** are **fused** (for example with polyethylene glycol) to form **hybrid protoplasts**. These are cultured on a nutrient medium to regenerate a **somatic hybrid** plant. Example: the **pomato**, from **tomato and potato**.',
  sol: 'Protoplasts, fusion, regeneration.',
  scheme: [['Walls removed: protoplasts', 1], ['Fusion to hybrid protoplast', 1], ['Regeneration; pomato', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('gm-short', short({
  marks: 3,
  stem: 'A state agriculture department is deciding whether to promote GM crops. Give three benefits of GM crops it should consider, with an example of each.',
  model: '(i) **Tolerance to abiotic stresses** — varieties tolerant to **drought, salt, cold or heat**. (ii) **Less use of chemical pesticides** — **Bt cotton** resists bollworms. (iii) **Higher nutritional value** — **golden rice** rich in vitamin A. (Also: fewer **post-harvest losses**, more efficient **mineral use**, **alternative resources** such as starch and fuels.)',
  sol: 'Three benefits.',
  scheme: [['First benefit with example', 1], ['Second', 1], ['Third', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('tissue-long', long({
  stem: '(a) What is meant by totipotency? [1]\n(b) Describe micropropagation and explain how meristem culture gives virus-free plants. [2]\n(c) A nursery needs 1000 identical plantlets of a rare tree from one explant; each shoot gives 4 new shoots per subculture. How many subcultures are needed at least? [2]',
  model: `(a) **Totipotency** is the capacity of a plant cell or explant to **regenerate a whole plant**.\n\n(b) Explants are grown on a **sterile nutrient medium** with **growth regulators**; shoots form and are **subcultured** repeatedly, then **rooted** and **hardened** to give many **somaclones**. Although an infected plant carries virus, its **apical and axillary meristems are free of virus**, so plants raised from them are **virus-free**.\n\n(c) After k subcultures there are $4^{k}$ plantlets: $4^{4} = ${plantlets(1, 4, 4)} < 1000$ and $4^{5} = ${plantlets(1, 4, 5)} \\ge 1000$, so **5 subcultures** are needed.`,
  sol: 'Totipotency; micropropagation; calculation.',
  scheme: [['(a) Definition', 1], ['(b) Micropropagation', 1], ['(b) Meristem culture', 1], ['(c) Power of 4', 1], ['(c) 5 subcultures', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}), () => (plantlets(1, 4, 4) < 1000 && plantlets(1, 4, 5) >= 1000) || 'subcultures');

// ---------------------------------------------------------------- t02 Bt crops, RNAi, golden rice
add('cry-ar', ar({
  a: 'Bacillus thuringiensis is not killed by its own insecticidal protein.',
  r: 'The protein exists in the bacterium as an inactive protoxin, which becomes active only in the alkaline gut of an insect.',
  key: 'a',
  sol: 'Both are true, and the inactive protoxin explains why the bacterium is unharmed — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('bollworm-mcq', mcq({
  stem: 'Which cry genes are introduced into cotton to protect it against bollworms?',
  right: 'cryIAc and cryIIAb',
  wrong: ['cryIAb only', 'ADA and lacZ', 'ampᴿ and tetᴿ'],
  sol: 'cryIAc and cryIIAb control cotton bollworms; cryIAb controls corn borer — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('cornborer-fill', fill({
  stem: 'The cry gene used to protect maize against the corn borer is cry______.',
  acc: [['IAb', 'Iab', '1Ab']],
  sol: 'cryIAb.',
  d: 2, c: 'recall', t: [2],
}));
add('gutph-mcq', mcq({
  stem: 'An insect species with an acidic midgut feeds on Bt cotton leaves without being harmed, although bollworms die. Which is the best explanation?',
  right: 'The Cry protoxin is not solubilised and activated in an acidic gut, so no active toxin forms.',
  wrong: ['The insect lacks a midgut altogether.', 'Bt cotton makes the toxin only in roots.', 'The acid converts the toxin into a vitamin.'],
  sol: 'Activation of the crystal protoxin needs the alkaline pH of the insect gut — option (@K).',
  d: 4, c: 'analysis', t: [2],
  assets: [btFig],
}));
add('rnai-mcq', mcq({
  stem: 'In transgenic tobacco resistant to Meloidogyne incognita, what actually stops the nematode from surviving?',
  right: 'Double-stranded RNA silences a specific mRNA of the nematode.',
  wrong: ['A Cry protein makes pores in the nematode gut.', 'The plant produces antibodies against the nematode.', 'The roots secrete restriction enzymes.'],
  sol: 'RNA interference silences a vital nematode gene — option (@K).',
  d: 2, c: 'understanding', t: [2],
  assets: [rnaiFig],
}));
add('nematode-mcq', mcq({
  stem: 'The nematode Meloidogyne incognita, controlled by RNA interference in a transgenic crop, infects the roots of',
  right: 'tobacco',
  wrong: ['cotton', 'rice', 'maize'],
  sol: 'It infects tobacco roots — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('goldenrice-mcq', mcq({
  stem: 'Many children in a rice-eating community suffer from night blindness. Which GM crop was developed to address this problem?',
  right: 'Golden rice, rich in β-carotene',
  wrong: ['Bt cotton', 'RNAi tobacco', 'Flavr Savr tomato'],
  sol: 'β-carotene is converted to vitamin A, preventing night blindness — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('antisense-ar', ar({
  a: 'Transgenic tobacco designed against Meloidogyne produces both sense and antisense RNA of a nematode gene.',
  r: 'Agrobacterium is a pathogen of dicot plants.',
  key: 'b',
  sol: 'Both are true, but Agrobacterium being a pathogen does not explain why sense and antisense RNA are made (they form dsRNA for RNAi) — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('bt-short', short({
  marks: 2,
  stem: 'Explain how the Bt toxin kills a bollworm larva that feeds on Bt cotton.',
  model: 'The larva swallows **Cry protein crystals** in the form of an **inactive protoxin**. The **alkaline pH** of its gut **solubilises** the crystals and converts them to the **active toxin**, which binds the **midgut epithelial cells** and creates **pores**, causing the cells to **swell and lyse**; the larva dies.',
  sol: 'Activation and pore formation.',
  scheme: [['Protoxin activated in alkaline gut', 1], ['Pores; swelling, lysis, death', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('goldenrice-short', short({
  marks: 2,
  stem: 'Why would golden rice be especially useful in poor communities that depend on rice, and what nutrient does it supply?',
  model: 'Ordinary rice grains contain almost **no β-carotene**, so people who eat mainly rice and little vegetables suffer **vitamin A deficiency** and **night blindness**. Golden rice makes **β-carotene (provitamin A)** in its grains, which the body converts to **vitamin A**, through a food they already eat.',
  sol: 'β-carotene; vitamin A.',
  scheme: [['Vitamin A deficiency in rice diets', 1], ['Golden rice supplies β-carotene', 1]],
  d: 2, c: 'application', t: [2],
}));
add('rnai-short', short({
  marks: 3,
  stem: 'A tobacco farmer’s crop is stunted by root-knot nematodes (Meloidogyne incognita). Scientists offer her a transgenic tobacco variety whose roots the nematode cannot survive in. Explain the RNA-interference strategy behind this variety.',
  model: 'Using ***Agrobacterium*** vectors, **nematode-specific genes** were introduced into tobacco. The transgenic plant produced **both sense and antisense RNA** of these genes. The two complementary RNAs formed **double-stranded RNA (dsRNA)**, which started **RNA interference** and **silenced** the specific **mRNA of the nematode**. The nematode could not make a vital protein and **could not survive** in the transgenic host.',
  sol: 'Vector, dsRNA, silencing.',
  scheme: [['Agrobacterium introduces nematode genes', 1], ['Sense and antisense RNA form dsRNA', 1], ['Nematode mRNA silenced; parasite dies', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gmcrop-long', long({
  stem: '(a) Describe the mode of action of the Bt toxin, naming the cry genes used for cotton and maize. [3]\n(b) Explain how RNA interference protects tobacco from a nematode. [2]',
  model: '(a) ***Bacillus thuringiensis*** forms **crystals** of an **inactive protoxin**. In the **alkaline gut** of an insect larva the crystals **dissolve** and the protoxin becomes the **active toxin**, which binds the **midgut epithelium** and makes **pores**; the cells **swell and lyse** and the larva dies. **cryIAc** and **cryIIAb** protect **cotton** against **bollworms**; **cryIAb** protects **maize** against the **corn borer**.\n\n(b) Nematode-specific genes are introduced by ***Agrobacterium*** so that the plant makes **sense and antisense RNA**; these form **dsRNA**, which triggers **RNAi** and **silences** a vital **nematode mRNA**, so ***Meloidogyne incognita*** cannot survive.',
  sol: 'Bt; RNAi.',
  scheme: [['(a) Protoxin activated in alkaline gut', 1], ['(a) Pores and lysis', 1], ['(a) cry genes', 1], ['(b) dsRNA from sense and antisense', 1], ['(b) Nematode mRNA silenced', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 insulin, vaccines, stem cells
add('proinsulin-mcq', mcq({
  stem: 'Insulin is first made in the pancreas as proinsulin. Which part is removed to give mature insulin?',
  right: 'The C peptide',
  wrong: ['Chain A', 'Chain B', 'The disulphide bridges'],
  sol: 'The C peptide is removed during maturation — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('lilly-mcq', mcq({
  stem: 'Why did Eli Lilly make the A and B chains of human insulin separately in E. coli instead of making proinsulin?',
  right: 'Producing the two chains separately and joining them avoided the need to remove the C peptide.',
  wrong: ['E. coli cannot make any protein longer than 30 amino acids.', 'Chain A is toxic to bacteria.', 'Disulphide bridges form only inside bacteria.'],
  sol: 'The chains were joined chemically by disulphide bonds, skipping C-peptide removal — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('allergy-mcq', mcq({
  stem: 'Before 1983, some diabetic patients reacted badly to their insulin injections. What was the main reason?',
  right: 'The insulin came from cattle and pigs and was a foreign protein that could trigger allergies.',
  wrong: ['The insulin contained Bt toxin.', 'The insulin was made by E. coli and contained bacteria.', 'The insulin lacked chain A.'],
  sol: 'Animal insulin can provoke allergic or immune reactions — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('yeastvac-mcq', mcq({
  stem: 'A child is given a hepatitis B vaccine made by yeast cells carrying a viral gene. Why is this vaccine considered safe?',
  right: 'It contains only a viral surface protein, not the infectious virus.',
  wrong: ['The yeast kills the virus inside the child.', 'It contains antibodies from another person.', 'It is made from dead hepatitis patients’ blood.'],
  sol: 'A recombinant antigenic protein cannot cause infection — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('stemcell-mcq', mcq({
  stem: 'Which property makes embryonic stem cells more versatile than adult stem cells?',
  right: 'They are pluripotent and can form almost any cell type.',
  wrong: ['They cannot divide.', 'They have already become nerve cells.', 'They contain no DNA.'],
  sol: 'Embryonic stem cells are pluripotent; adult stem cells are multipotent — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cordblood-mcq', mcq({
  stem: 'Parents store their newborn’s umbilical cord blood in a bank. What is the main purpose?',
  right: 'It is a rich source of stem cells that may later be used to treat blood disorders.',
  wrong: ['It supplies insulin for diabetes.', 'It provides Bt toxin for vaccines.', 'It is used to make golden rice.'],
  sol: 'Cord blood contains stem cells for future therapy — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const bonds = (INSULIN.A - 1) + (INSULIN.B - 1);
  add('insulin-num', num({
    stem: 'Chain A of insulin has 21 amino acids and chain B has 30. How many peptide bonds are there in the two chains together?',
    value: bonds,
    sol: r`A chain of $n$ amino acids has $n - 1$ peptide bonds: $(${INSULIN.A} - 1) + (${INSULIN.B} - 1) = ${bonds}$.`,
    scheme: [[`${bonds}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 49 || 'value');
}
add('stemcell-short', short({
  marks: 2,
  stem: 'What are stem cells? Distinguish embryonic from adult stem cells.',
  model: '**Stem cells** are **undifferentiated** cells that can **renew themselves** and **differentiate** into specialised cells. **Embryonic** stem cells, from the early embryo, are **pluripotent** and can form almost any cell type. **Adult** stem cells, as in **bone marrow** or cord blood, are **multipotent** and form a limited range of cells.',
  sol: 'Definition; two types.',
  scheme: [['Definition', 1], ['Embryonic vs adult', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('insulin-short', short({
  marks: 3,
  stem: 'Describe how human insulin was produced by recombinant DNA technology, and give one advantage over insulin from animals.',
  model: 'In **1983 Eli Lilly** prepared **two DNA sequences** coding for **chains A and B** of human insulin. These were introduced into **plasmids** of ***E. coli***, which produced the **two chains separately**. The chains were **extracted** and **combined by creating disulphide bonds**, giving human insulin. Advantage: it is **identical to human insulin**, so it does not cause the **allergic reactions** that some patients had to **cattle or pig insulin**, and it can be made in **large amounts**.',
  sol: 'Steps; advantage.',
  scheme: [['Two DNA sequences for A and B', 1], ['Made in E. coli; joined by disulphide bonds', 1], ['Advantage', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 gene therapy and molecular diagnosis
add('ada-mcq', mcq({
  stem: 'The first clinical gene therapy, in 1990, treated a girl who lacked which enzyme?',
  right: 'Adenosine deaminase (ADA)',
  wrong: ['β-galactosidase', 'Reverse transcriptase', 'Taq polymerase'],
  sol: 'ADA deficiency causes SCID — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('scid-mcq', mcq({
  stem: 'Why does a deficiency of adenosine deaminase lead to severe combined immunodeficiency?',
  right: 'ADA is crucial for the immune system; without it lymphocytes do not function properly.',
  wrong: ['ADA digests all bacteria in the blood.', 'ADA is a hormone that controls blood sugar.', 'ADA makes red blood cells carry oxygen.'],
  sol: 'Lack of ADA damages immune cells, causing SCID — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('retro-mcq', mcq({
  stem: 'In gene therapy for ADA deficiency, which vector was used to introduce the functional ADA cDNA into the patient’s lymphocytes?',
  right: 'A retroviral vector',
  wrong: ['The Ti plasmid of Agrobacterium', 'A yeast artificial chromosome', 'A Bt crystal'],
  sol: 'A disarmed retrovirus delivered the gene — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('permanent-mcq', mcq({
  stem: 'Doctors want a permanent cure for ADA deficiency instead of repeated infusions of corrected lymphocytes. Which approach would achieve this?',
  right: 'Introducing the ADA gene into bone-marrow stem cells at an early stage',
  wrong: ['Giving more antibiotics', 'Infusing corrected red blood cells', 'Vaccinating the child against SCID'],
  sol: 'Corrected stem cells keep producing functional lymphocytes — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('probe-mcq', mcq({
  stem: 'A radioactive probe complementary to a normal gene is hybridised with DNA from several clones. On the autoradiograph, one clone shows no band. What does this suggest?',
  right: 'That clone carries a mutated gene to which the probe cannot pair.',
  wrong: ['That clone has the most copies of the normal gene.', 'The probe was destroyed by that clone.', 'That clone is the positive control.'],
  sol: 'A probe binds only complementary sequences; a mutated gene gives no signal — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('pcrdiag-mcq', mcq({
  stem: 'A person exposed to HIV a few weeks ago has no symptoms and a negative antibody test. Which technique could detect the virus at this early stage?',
  right: 'PCR, which amplifies very small amounts of viral nucleic acid',
  wrong: ['Urine analysis', 'Gel electrophoresis without amplification', 'Micropropagation'],
  sol: 'PCR detects pathogens at very low concentrations — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('elisadiag-fill', fill({
  stem: 'ELISA detects infection through the interaction between an antigen and an ______.',
  acc: [['antibody']],
  sol: 'Antibody.',
  d: 1, c: 'recall', t: [4],
}));
{
  const p = pct(45, 300);
  add('lymph-num', num({
    stem: 'In a gene-therapy trial, 300 million of a patient’s lymphocytes were treated with the vector and 45 million expressed the ADA gene. What percentage of the treated cells were corrected?',
    value: p, unit: '%',
    sol: r`$\dfrac{45}{300} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 15 || 'value');
}
add('diag-short', short({
  marks: 2,
  stem: 'Why are molecular methods better than conventional methods for early diagnosis of infection? Name two such methods.',
  model: 'Conventional methods such as **serum and urine analysis** detect a pathogen only after it has **multiplied** and caused **symptoms**. Molecular methods detect it at **very low concentrations**, **before symptoms appear**, so treatment can start early. Examples: **PCR** and **ELISA** (also DNA or RNA **probes**).',
  sol: 'Early detection; examples.',
  scheme: [['Detect at low concentration, early', 1], ['Two methods', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('gene-short', short({
  marks: 3,
  stem: 'Describe the gene therapy given to a child with ADA deficiency, and explain why it is not a permanent cure.',
  model: '**Lymphocytes** are taken from the patient’s **blood** and grown in **culture**. A functional **ADA cDNA** is introduced into them using a **retroviral vector**, and the corrected lymphocytes are **returned** to the patient, where they make ADA and restore immunity. It is **not permanent** because these lymphocytes are **not immortal**; they die and **periodic infusions** are needed. A permanent cure would need the gene introduced into **bone-marrow stem cells** at an early stage.',
  sol: 'Steps; not permanent.',
  scheme: [['Lymphocytes cultured', 1], ['ADA cDNA by retroviral vector; returned', 1], ['Not immortal; repeated', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('probe-short', short({
  marks: 3,
  stem: 'A family has a history of a single-gene disorder. Explain how a labelled DNA probe and autoradiography could show which relatives carry the mutated gene.',
  model: 'A **single-stranded DNA probe** complementary to the **normal gene** is labelled with a **radioactive** molecule. DNA from each relative is allowed to **hybridise** with the probe and the result is exposed to film (**autoradiography**). Where the gene is **normal**, the probe **pairs** and a **band** appears; where both copies are **mutated**, the probe **cannot pair**, so **no band** appears (a reduced signal in a carrier). Relatives can thus be identified **before** symptoms appear.',
  sol: 'Probe hybridisation; missing band.',
  scheme: [['Labelled complementary probe', 1], ['Hybridisation and autoradiography', 1], ['Mutation: no signal', 1]],
  d: 3, c: 'application', t: [4],
}));
add('gene-long', long({
  stem: '(a) What is gene therapy? [1]\n(b) Describe the first clinical gene therapy, naming the disorder and the vector used. [2]\n(c) Explain how PCR and a labelled probe help in early molecular diagnosis. [2]',
  model: '(a) **Gene therapy** is the correction of a gene defect by **delivering a normal gene** into a person’s cells to compensate for a non-functional one.\n\n(b) In **1990** a four-year-old girl with **ADA deficiency** (causing **SCID**) was treated: her **lymphocytes** were grown in culture, a functional **ADA cDNA** was introduced with a **retroviral vector**, and the cells were **returned** to her; infusions were **repeated** because lymphocytes are not immortal.\n\n(c) **PCR** amplifies **very small amounts** of a pathogen’s nucleic acid, detecting infection (such as **HIV**) or **mutations** before symptoms. A **radioactive single-stranded probe** hybridises with complementary DNA; after **autoradiography**, a **mutated** gene gives **no signal** because the probe cannot pair.',
  sol: 'Definition; ADA therapy; diagnosis.',
  scheme: [['(a) Definition', 1], ['(b) ADA, SCID, lymphocytes', 1], ['(b) Retroviral vector; repeated', 1], ['(c) PCR', 1], ['(c) Probe', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 transgenic animals
add('alpha-mcq', mcq({
  stem: 'Which human protein produced by transgenic animals is used to treat emphysema?',
  right: 'α-1-antitrypsin',
  wrong: ['α-lactalbumin', 'Insulin', 'Adenosine deaminase'],
  sol: 'α-1-antitrypsin is used for emphysema — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('rosie-mcq', mcq({
  stem: 'Rosie, the first transgenic cow (1997), produced milk enriched with which human protein?',
  right: 'α-lactalbumin',
  wrong: ['α-1-antitrypsin', 'Insulin', 'Cry protein'],
  sol: 'Rosie’s milk contained human α-lactalbumin — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('polio-mcq', mcq({
  stem: 'Before a new batch of polio vaccine is used on children, it is tested on specially developed mice. What is the purpose?',
  right: 'To check the safety of the vaccine using transgenic animals',
  wrong: ['To make the mice produce the vaccine in their milk', 'To cure polio in mice', 'To obtain insulin from the mice'],
  sol: 'Transgenic mice are used to test vaccine safety — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('toxicity-mcq', mcq({
  stem: 'A company uses transgenic mice carrying genes that make them extra sensitive to toxic substances to test a new chemical. What is the advantage?',
  right: 'Toxic effects show up faster, so results are obtained in less time.',
  wrong: ['The mice destroy the chemical completely.', 'No animals are needed at all.', 'The chemical becomes safe for humans.'],
  sol: 'Sensitive transgenic animals speed up toxicity testing — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('mice-mcq', mcq({
  stem: 'About what proportion of all existing transgenic animals are mice?',
  right: 'Over 95 percent',
  wrong: ['About 10 percent', 'About 50 percent', 'Less than 1 percent'],
  sol: 'Over 95 percent of transgenic animals are mice — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
{
  const g = grams(2.4, 12);
  add('rosie-num', num({
    stem: 'Milk from a transgenic cow contains 2.4 g of a human protein per litre. How many grams of the protein are in 12 litres of milk?',
    value: g, tol: 0.01, unit: 'g',
    sol: r`$2.4 \times 12 = ${g}$ g.`,
    scheme: [[`${g} g`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => Math.abs(q.answer.value - 28.8) < 1e-9 || 'value');
}
add('transgenic-short', short({
  marks: 2,
  stem: 'What are transgenic animals? State two ways in which they help in studying human diseases or making medicines.',
  model: '**Transgenic animals** carry and express an **extra (foreign) gene** introduced by manipulating their DNA. They serve as **models** of human diseases such as **cancer, cystic fibrosis and Alzheimer’s disease**, so treatments can be studied; and they **produce human proteins** such as **α-1-antitrypsin** (for emphysema) in their milk.',
  sol: 'Definition; two uses.',
  scheme: [['Definition', 1], ['Two uses', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('transgenic3-short', short({
  marks: 3,
  stem: 'A pharmaceutical company plans to produce a scarce human enzyme in the milk of transgenic goats. Explain why this is attractive, and name two other uses of transgenic animals.',
  model: 'Making complex human proteins chemically or in cell cultures is **expensive**; a transgenic goat carrying the **human gene** secretes the protein into its **milk**, which can be collected **continuously without harming** the animal (as Rosie’s milk carried **α-lactalbumin**). Other uses: testing **vaccine safety** (for example polio vaccine in transgenic mice) and **toxicity testing** of chemicals; also **disease models** and study of **normal physiology**.',
  sol: 'Pharming; other uses.',
  scheme: [['Protein secreted in milk cheaply', 1], ['First other use', 1], ['Second other use', 1]],
  d: 3, c: 'application', t: [5],
}));
add('transgenic-long', long({
  stem: '(a) Define transgenic animals and name the animal most commonly used. [1]\n(b) Describe four uses of transgenic animals with examples. [3]\n(c) What was special about the milk of Rosie? [1]',
  model: '(a) Animals whose DNA has been manipulated to **carry and express a foreign gene**; **mice** (over 95 percent).\n\n(b) **Normal physiology and development** — studying how genes regulate body functions; **study of disease** — models for **cancer, cystic fibrosis, rheumatoid arthritis, Alzheimer’s**; **biological products** — **α-1-antitrypsin** for emphysema; **vaccine safety** — polio vaccine tested on transgenic mice; **chemical safety** — toxicity testing with sensitive animals.\n\n(c) It contained **human α-lactalbumin** (about **2.4 g per litre**), making it **nutritionally more balanced** for human babies.',
  sol: 'Definition; uses; Rosie.',
  scheme: [['(a) Definition and mice', 1], ['(b) Four uses', 3], ['(c) α-lactalbumin', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 biosafety and ethics
add('geac-mcq', mcq({
  stem: 'In India, which body decides on the validity of GM research and the safety of introducing GM organisms for public use?',
  right: 'Genetic Engineering Appraisal Committee (GEAC)',
  wrong: ['National AIDS Control Organisation', 'Indian Agricultural Research Institute', 'US Patent and Trademark Office'],
  sol: 'GEAC regulates GM research and release — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('basmati-mcq', mcq({
  stem: 'Why was the 1997 American patent on a basmati rice variety criticised in India?',
  right: 'The variety was derived from Indian farmers’ varieties without authorisation or benefit to them.',
  wrong: ['Basmati is not grown in India.', 'The variety was a transgenic Bt crop.', 'The patent was granted by GEAC.'],
  sol: 'It was seen as biopiracy of Indian bio-resources — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('biopiracy-ar', ar({
  a: 'The patenting of a basmati variety by a foreign company in 1997 was described as biopiracy.',
  r: 'India has no documented varieties of basmati rice of its own.',
  key: 'c',
  sol: 'A is true; R is false: India has about 27 documented basmati varieties developed by its farmers — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('biopatent-fill', fill({
  stem: 'A patent granted for a biological entity or for a product or process derived from it is called a ______.',
  acc: [['biopatent', 'bio-patent']],
  sol: 'Biopatent.',
  d: 1, c: 'recall', t: [6],
}));
add('ethics-short', short({
  marks: 2,
  stem: 'A company wants to release a new GM maize in India. Name the body whose approval it needs and give two concerns that body would consider.',
  model: 'Approval of the **Genetic Engineering Appraisal Committee (GEAC)**. Concerns: possible **unpredictable effects** on the **ecosystem**, such as gene transfer to wild relatives or harm to **non-target organisms**; and **safety** for **human and animal health**, such as **allergies**.',
  sol: 'GEAC; concerns.',
  scheme: [['GEAC', 1], ['Two concerns', 1]],
  d: 2, c: 'application', t: [6],
}));
add('biopiracy-short', short({
  marks: 3,
  stem: 'Distinguish between a biopatent and biopiracy, and describe one case of biopiracy involving India.',
  model: 'A **biopatent** is a **patent** granted for **biological entities** or for products and processes derived from them. **Biopiracy** is the **use of bio-resources** by multinational companies or other organisations **without proper authorisation** from the countries and people concerned and **without compensation**. Case: in **1997** an American company obtained a **US patent** on a **basmati rice** variety derived from **Indian farmers’ varieties**; patents on uses of **turmeric** and **neem** were also challenged by India.',
  sol: 'Definitions; case.',
  scheme: [['Biopatent', 1], ['Biopiracy', 1], ['Indian case', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const D = { yieldNon: 1500, yieldBt: 1860, sprayNon: 12, sprayBt: 4 };
  const yInc = pctChange(D.yieldNon, D.yieldBt);
  add('btfield-case', mk.case({
    passage: `Farmers in a district grew ordinary cotton and Bt cotton (with cryIAc) side by side for a season.\n\n| Crop | Yield (kg per hectare) | Insecticide sprays per season |\n|---|---|---|\n| Ordinary cotton | ${D.yieldNon} | ${D.sprayNon} |\n| Bt cotton | ${D.yieldBt} | ${D.sprayBt} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By what percentage was the yield of Bt cotton higher than that of ordinary cotton?',
        value: yInc, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${D.yieldBt} - ${D.yieldNon}}{${D.yieldNon}} \times 100 = ${yInc}$ percent.`,
        scheme: [[`${yInc}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Why did Bt cotton still need some insecticide sprays?',
        right: 'Its Cry toxin acts mainly on bollworms, not on sucking pests such as aphids.',
        wrong: ['The Bt gene works only in the first week.', 'Bt cotton attracts more bollworms.', 'Cry toxin is destroyed by sunlight in the leaves.'],
        sol: 'Cry proteins are specific to certain insect groups — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Give two benefits to the farmers and the environment shown by the data.',
        model: '**Higher yield** per hectare means more income. **Fewer insecticide sprays** reduce **cost**, protect farmers’ **health**, and cause less **pollution** of soil and water and less harm to **useful insects**.',
        sol: 'Yield; fewer sprays.',
        scheme: [['Higher yield', 1], ['Fewer sprays: cost and pollution', 1]],
        d: 2, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Suggest why scientists advise growing some ordinary cotton next to Bt cotton (a “refuge”).',
          model: 'Bollworms feeding on ordinary cotton are **not selected** for resistance; they **mate** with any rare resistant insects from the Bt field, **diluting resistance alleles**, so the **Bt toxin stays effective** for longer.',
          sol: 'Delay resistance.',
          scheme: [['Susceptible insects survive in refuge', 1], ['Dilutes resistance; delays it', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 24 || 'value');
}
add('probe-case', mk.case({
  passage: 'DNA from four members of a family was tested with a radioactive probe complementary to the normal form of a gene. Results after autoradiography:\n\n| Person | Signal on film |\n|---|---|\n| Father | Strong |\n| Mother | Weak (about half) |\n| Son | Strong |\n| Daughter | None |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which person most probably has two mutated copies of the gene?',
      right: 'Daughter',
      wrong: ['Father', 'Mother', 'Son'],
      sol: 'No signal means the probe found no complementary normal gene — option (@K).',
      d: 3, c: 'analysis', t: [4],
    })),
    part('b', mcq({
      stem: 'What does the weak signal of the mother suggest?',
      right: 'She has one normal and one mutated copy (a carrier).',
      wrong: ['She has two normal copies.', 'She has three copies of the gene.', 'The probe was damaged in her sample.'],
      sol: 'Half the signal fits one normal copy — option (@K).',
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why does a mutated gene give no signal with this probe?',
      model: 'The probe is **complementary to the normal gene**. A **mutated** sequence is **not complementary**, so the probe **cannot hybridise** to it; no radioactive probe stays bound, and **no band** appears on the film.',
      sol: 'No hybridisation.',
      scheme: [['Probe complementary to normal gene only', 1], ['No hybridisation, no signal', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Suggest how gene therapy might help the daughter if the disorder were ADA deficiency.',
        model: 'Her **lymphocytes** could be cultured, given a functional **ADA cDNA** using a **retroviral vector**, and **returned** to her; better still, the gene could be put into **bone-marrow stem cells** for a **lasting** cure.',
        sol: 'ADA gene therapy.',
        scheme: [['Lymphocytes with ADA cDNA via retrovirus', 1], ['Stem cells for lasting cure', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}));
