// ch09 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biomolecules — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Chemical constituents of living cells',
      `**How to analyse.** A living tissue (a vegetable or a piece of liver) is ground in **trichloroacetic acid** with a mortar and pestle to a thick slurry and strained through cheesecloth. The **filtrate** is the **acid-soluble pool**; the **retentate** is the **acid-insoluble fraction**. Thousands of organic compounds are found in the acid-soluble pool. Elemental analysis shows that living matter has the same elements as the earth’s crust, but in different proportions: carbon and hydrogen are relatively more abundant in living organisms (carbon 18.5 percent of the human body against 0.03 percent of the crust; silicon 27.7 percent of the crust, negligible in the body). Inorganic constituents include ions of sodium, potassium, calcium and magnesium, water, and compounds such as sodium chloride, calcium carbonate, phosphate and sulphate.

**Amino acids** are organic compounds with an **amino group** and an acidic **carboxyl group** as substituents on the same carbon, the **α-carbon**; they are substituted methanes with four substituents: hydrogen, carboxyl, amino and a variable **R group**. R is H in **glycine**, a methyl group in **alanine** and hydroxymethyl in **serine**. Based on the number of amino and carboxyl groups, amino acids are **acidic** (glutamic acid), **basic** (lysine) or **neutral** (valine); **aromatic** amino acids include **tyrosine, phenylalanine and tryptophan**. Because the –NH2 and –COOH groups are ionisable, the structure of amino acids changes with pH, forming a **zwitterion** at a particular pH.

**Lipids** are generally water-insoluble. They may be simple **fatty acids**: a carboxyl group attached to an R group (methyl, ethyl or a chain of 1 to 19 carbons). **Palmitic acid** has 16 carbons including the carboxyl carbon; **arachidonic acid** has 20. Fatty acids are **saturated** (no double bond) or **unsaturated** (one or more C=C bonds). **Glycerol** is trihydroxy propane; fatty acids esterified with glycerol give **monoglycerides, diglycerides and triglycerides** (fats and oils, by melting point: oils such as gingelly oil have lower melting points and stay liquid in winter). **Phospholipids**, such as **lecithin**, contain phosphorus and a phosphorylated organic compound and occur in cell membranes; neural tissue has lipids with more complex structures.

**Nitrogen bases, nucleosides, nucleotides.** Heterocyclic rings: **adenine, guanine, cytosine, uracil, thymine**. Base + sugar = **nucleoside** (adenosine, guanosine, thymidine, uridine, cytidine); with a phosphate esterified to the sugar = **nucleotide** (adenylic, thymidylic, guanylic, uridylic and cytidylic acids). Nucleic acids such as DNA and RNA consist of nucleotides only.

**Metabolites.** **Primary metabolites** (amino acids, sugars and others) have identifiable functions in normal physiology. **Secondary metabolites** — pigments (carotenoids, anthocyanins), alkaloids (morphine, codeine), terpenoids, essential oils (lemon grass oil), toxins (abrin, ricin), lectins (concanavalin A), drugs (vinblastin, curcumin), polymeric substances (rubber, gums, cellulose) — occur mainly in plants, fungi and microbes; many are useful to human welfare.`,
      [kt('Acid-soluble pool', 'The filtrate after grinding tissue in trichloroacetic acid; it holds micromolecules.'), kt('Zwitterion', 'Form of an amino acid with both a positive and a negative charge, at a particular pH.'), kt('Nucleotide', 'A nitrogen base, a sugar and a phosphate joined together.'), kt('Secondary metabolite', 'A compound without a known role in basic physiology, such as an alkaloid or pigment.')],
      V.amino,
      [1],
      [V.lipids],
    ),
    sec(
      '2. Biomacromolecules and proteins',
      `Compounds in the acid-soluble pool have molecular weights of about **18 to 800 daltons**; those below 1000 Da are **micromolecules**. The acid-insoluble fraction has **proteins, nucleic acids, polysaccharides and lipids**; apart from lipids, these are above **ten thousand daltons** — the **biomacromolecules**. Lipids (below 800 Da) appear in the insoluble fraction because grinding breaks membranes into **vesicles that are not water-soluble**. The acid-soluble pool roughly represents the cytoplasmic composition. Average composition of cells (percent of total mass): **water 70–90, proteins 10–15, carbohydrates 3, lipids 2, nucleic acids 5–7, ions 1**.

**Proteins** are **polypeptides**: linear chains of amino acids linked by **peptide bonds**, formed between the **carboxyl group** of one amino acid and the **amino group** of the next with **loss of water** (dehydration). Proteins are **heteropolymers** of up to **20** kinds of amino acids. **Essential amino acids** must come from the diet; **non-essential** ones the body makes. Functions: transport across membranes, defence (antibodies fight infectious agents), hormones (insulin), enzymes (trypsin), structure (**collagen**, intercellular ground substance), receptors (smell, taste, hormones), **GLUT-4** (glucose transport into cells). **Collagen** is the most abundant protein in the animal world and **RuBisCO** in the whole biosphere.

**Structure of proteins.**
- **Primary:** the sequence of amino acids; the first is the **N-terminal** and the last the **C-terminal** amino acid.
- **Secondary:** parts of the chain arranged as a **helix** — only **right-handed** helices are observed in proteins — while other regions fold in other forms.
- **Tertiary:** the long chain folded upon itself like a hollow woollen ball, giving a 3-D view needed for many biological activities.
- **Quaternary:** an assembly of more than one polypeptide (subunit), as in adult human **haemoglobin** with **two α and two β** subunits.`,
      [kt('Biomacromolecule', 'A biomolecule of molecular weight above ten thousand daltons: protein, nucleic acid or polysaccharide.'), kt('Peptide bond', 'Bond between the carboxyl group of one amino acid and the amino group of the next, formed with loss of water.'), kt('Essential amino acid', 'An amino acid that must be obtained from the diet.'), kt('Quaternary structure', 'Arrangement of several polypeptide subunits in one protein.')],
      V.levels,
      [2],
      [V.peptide],
    ),
    sec(
      '3. Polysaccharides and nucleic acids',
      `**Polysaccharides** are long chains of sugars, the monosaccharides being joined by **glycosidic bonds** formed by dehydration between two carbon atoms of adjacent sugars. **Cellulose** is a **homopolymer** of glucose; **starch** is the store house of energy in plants and **glycogen** in animals; **inulin** is a polymer of **fructose**. In a polysaccharide chain such as glycogen, the **right end** is the **reducing end** and the **left end** the **non-reducing end**; glycogen is branched. **Starch** forms helical secondary structures that can hold **iodine** (blue colour); **cellulose** does not contain complex helices and cannot hold iodine. Plant cell walls are cellulose; paper from plant pulp and cotton fibre is cellulosic. **Complex polysaccharides** have amino-sugars and chemically modified sugars (glucosamine, N-acetyl galactosamine) as building blocks; the exoskeleton of arthropods is **chitin**, a heteropolymer.

**Nucleic acids** are **polynucleotides**. A nucleotide has a **heterocyclic nitrogenous base**, a **monosaccharide** and **phosphoric acid**. **Adenine and guanine** are substituted **purines**; **cytosine, uracil and thymine** are substituted **pyrimidines**. The sugar is **ribose** (in RNA) or **2′-deoxyribose** (in DNA). The **phosphate** links the **3′ carbon** of one sugar to the **5′ carbon** of the next: an ester bond on each side, the **phosphodiester bond**.

**DNA double helix** (Watson and Crick): two strands **antiparallel**, held by **hydrogen bonds** between bases; **A pairs with T** by **two** hydrogen bonds and **G with C** by **three**. In **B-DNA**, one full turn has **10 base pairs** and a pitch of **3.4 nm** (34 Å), so the rise per base pair is 0.34 nm.`,
      [kt('Glycosidic bond', 'Bond between two adjacent monosaccharides, formed by dehydration.'), kt('Phosphodiester bond', 'Phosphate link between the 3′ carbon of one sugar and the 5′ carbon of the next in a nucleic acid.'), kt('Homopolymer', 'A polymer of one kind of monomer, such as cellulose (glucose).'), kt('Purine', 'Adenine or guanine; pyrimidines are cytosine, uracil and thymine.')],
      V.polyNuc,
      [2],
      [V.dna],
    ),
    sec(
      '4. Enzymes',
      `**Nature.** Almost all enzymes are **proteins**; some nucleic acids that behave like enzymes are **ribozymes**. An enzyme has a **tertiary structure** whose backbone folds to form **crevices or pockets**, the **active site**, into which the substrate fits. **Inorganic catalysts** work efficiently at **high temperatures and pressures**; enzymes get damaged at high temperatures (say above **40 °C**), but enzymes from organisms of very hot habitats (hot vents, sulphur springs) are stable at **80–90 °C**.

**Rates.** A physical change alters shape without breaking bonds; a chemical reaction breaks and forms bonds. Rate = amount of product formed per unit time ($\\frac{\\delta P}{\\delta t}$). For chemical reactions the rate roughly **doubles or halves for every 10 °C** change. Catalysed reactions are vastly faster: **carbonic anhydrase** makes about **600,000** molecules of carbonic acid a **second**, against about **200** an **hour** uncatalysed — about **10 million times** faster. A **metabolic pathway** is a chain of such steps; glucose becomes two molecules of pyruvic acid in ten enzyme-catalysed steps, then lactic acid in skeletal muscle under anaerobic conditions or ethanol in yeast during fermentation.

**How enzymes work.** The substrate must pass through a high-energy **transition state**; the difference between its average energy and the transition state is the **activation energy**. Even if the product has less energy than the substrate (no heat needs to be supplied), the barrier remains; enzymes **lower** it. Steps: (1) substrate binds the **active site**; (2) binding **induces** the enzyme to change shape and fit more tightly (**induced fit**), forming the **ES complex**; (3) the active site breaks chemical bonds of the substrate, forming the **EP complex**; (4) products are released and the enzyme is free again.

**Factors.** Each enzyme has an **optimum temperature** and **optimum pH**, with activity declining on either side; **low temperature** keeps enzymes temporarily inactive, **high temperature** destroys activity by **denaturing** the protein. Velocity rises with **substrate concentration** and reaches a maximum, **Vmax**, because enzyme molecules are fewer than substrate molecules and become saturated. An **inhibitor** shuts off activity; a **competitive inhibitor** closely resembles the substrate and competes for the binding site — **malonate** inhibits **succinic dehydrogenase** by resembling **succinate**. Competitive inhibitors are often used to control bacterial pathogens.

**Classification (six classes):** **oxidoreductases/dehydrogenases** (oxidation–reduction between two substrates); **transferases** (transfer of a group other than hydrogen); **hydrolases** (hydrolysis of ester, ether, peptide, glycosidic, C–C, C–halide or P–N bonds); **lyases** (removal of groups by means other than hydrolysis, leaving double bonds); **isomerases** (inter-conversion of optical, geometric or positional isomers); **ligases** (linking two compounds, e.g. forming C–O, C–S, C–N, P–O bonds).

**Cofactors** are non-protein constituents that make an enzyme catalytically active; the protein part is the **apoenzyme**, and activity is lost if the cofactor is removed. **Prosthetic groups** are organic and tightly bound (**haem** in **peroxidase** and **catalase**, which break hydrogen peroxide into water and oxygen). **Coenzymes** are organic and bound only transiently during catalysis; many contain **vitamins** (**NAD and NADP** contain **niacin**). **Metal ions** form coordination bonds at the active site (**zinc** in **carboxypeptidase**).`,
      [kt('Active site', 'Crevice or pocket of an enzyme into which the substrate fits.'), kt('Activation energy', 'Energy needed to take the substrate to the transition state.'), kt('Induced fit', 'Change in enzyme shape on substrate binding, giving a tighter fit.'), kt('Competitive inhibitor', 'A substrate look-alike that competes for the active site.'), kt('Apoenzyme', 'The protein part of an enzyme that needs a cofactor.')],
      V.steps,
      [3],
      [V.energy, V.factors],
      [{ label: 'Rate of reaction: product formed per unit time', latex: '\\text{rate} = \\dfrac{\\delta P}{\\delta t}' }],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying all enzymes are proteins (ribozymes are nucleic acids).
- Placing lipids in the acid-soluble pool because they are small.
- Confusing nucleosides (base + sugar) with nucleotides (base + sugar + phosphate).
- Writing that cellulose turns blue with iodine (starch does).
- Saying enzymes change the energy of the product; they lower the activation energy.
- Giving collagen as the most abundant protein of the biosphere (that is RuBisCO; collagen leads in animals).
- Counting peptide bonds equal to the number of amino acids (it is one fewer per chain).

**How marks are usually awarded**
- 1-mark items: name an amino acid, polysaccharide, enzyme class, cofactor or bond; read a pH or temperature optimum.
- 2–3-mark answers: analysis with trichloroacetic acid; metabolites; levels of protein structure; polysaccharides; steps of enzyme action; cofactors; saturation and inhibition.
- 5-mark answers: chemical constituents; biomacromolecules; enzyme action and factors; classification and cofactors; evaluating a temperature prediction.
- Case-based items: a tissue analysis, a four-chain protein, a pH series or a competitive inhibitor, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is in the acid-soluble pool?', 'Micromolecules below about 1000 daltons: amino acids, sugars, nucleotides.', 'concept', 1),
    fc(2, 'Why are lipids in the acid-insoluble fraction?', 'Membranes break into insoluble vesicles on grinding.', 'concept', 1),
    fc(3, 'Four groups on the alpha carbon?', 'H, amino, carboxyl and R group.', 'concept', 1),
    fc(4, 'R groups of glycine, alanine, serine?', 'Hydrogen, methyl, hydroxymethyl.', 'fact', 1),
    fc(5, 'Three aromatic amino acids?', 'Tyrosine, phenylalanine, tryptophan.', 'fact', 1),
    fc(6, 'Carbons in palmitic and arachidonic acids?', '16 and 20, counting the carboxyl carbon.', 'fact', 1),
    fc(7, 'What is glycerol?', 'Trihydroxy propane.', 'definition', 1),
    fc(8, 'Example of a phospholipid?', 'Lecithin.', 'fact', 1),
    fc(9, 'Nucleoside versus nucleotide?', 'Base + sugar; base + sugar + phosphate.', 'definition', 1),
    fc(10, 'Two secondary metabolites?', 'Morphine (alkaloid), ricin (toxin), rubber, carotenoids and others.', 'fact', 1),
    fc(11, 'Average water content of cells?', '70 to 90 percent.', 'fact', 2),
    fc(12, 'How does a peptide bond form?', 'Carboxyl of one amino acid with amino of the next, losing water.', 'concept', 2),
    fc(13, 'Most abundant protein in the biosphere?', 'RuBisCO (collagen in the animal world).', 'fact', 2),
    fc(14, 'Function of GLUT-4?', 'Glucose transport into cells.', 'fact', 2),
    fc(15, 'Four levels of protein structure?', 'Primary, secondary, tertiary, quaternary.', 'concept', 2),
    fc(16, 'Subunits of adult haemoglobin?', 'Two alpha and two beta.', 'fact', 2),
    fc(17, 'Inulin is a polymer of?', 'Fructose.', 'fact', 2),
    fc(18, 'Why does starch turn blue with iodine?', 'Its helices hold iodine; cellulose has no such helices.', 'concept', 2),
    fc(19, 'Exoskeleton polysaccharide of arthropods?', 'Chitin, a heteropolymer.', 'fact', 2),
    fc(20, 'Purines and pyrimidines?', 'Purines: A, G; pyrimidines: C, U, T.', 'fact', 2),
    fc(21, 'Bond joining nucleotides?', 'Phosphodiester bond (3′ to 5′).', 'fact', 2),
    fc(22, 'B-DNA turn?', '10 base pairs, 3.4 nm.', 'fact', 2),
    fc(23, 'What are ribozymes?', 'Nucleic acids that act as enzymes.', 'definition', 3),
    fc(24, 'How do enzymes speed reactions?', 'They lower the activation energy.', 'concept', 3),
    fc(25, 'Induced fit?', 'Substrate binding makes the enzyme fit more tightly.', 'definition', 3),
    fc(26, 'Why does velocity plateau at Vmax?', 'All enzyme molecules are occupied by substrate.', 'concept', 3),
    fc(27, 'Classic competitive inhibition?', 'Malonate inhibits succinic dehydrogenase.', 'fact', 3),
    fc(28, 'Six enzyme classes?', 'Oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases.', 'concept', 3),
    fc(29, 'Three kinds of cofactor?', 'Prosthetic group (haem), coenzyme (NAD), metal ion (zinc).', 'concept', 3),
    fc(30, 'Carbonic anhydrase speed-up?', 'About 10 million times faster than uncatalysed.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
