// ISC 11 Biology ch11 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { M, D, AM, WATER, peptide, TRI, hydrolyse, GLYCEROL, triglyceride, KIN, KT, TCURVE, PCURVE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const hy = hydrolyse(171);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biomolecules — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Carbohydrates',
      `**Carbohydrates** are polyhydroxy aldehydes or ketones (or compounds that give them on hydrolysis) and are classified by the number of sugar units.

**Monosaccharides** cannot be hydrolysed further: **glucose** (the main fuel, mass ${M.glucose}), **ribose** and **deoxyribose** (sugars of RNA and DNA; deoxyribose has one oxygen fewer, ${M.ribose} against ${M.deoxyribose}), also fructose and galactose.

**Disaccharides** are two monosaccharides joined by a **glycosidic bond** with loss of a water molecule: **maltose** = glucose + glucose; **lactose** = glucose + galactose (milk sugar); **sucrose** = glucose + fructose (cane sugar). Each has a mass of ${D.maltose}. Maltose and lactose are **reducing sugars** (they reduce Benedict’s solution); sucrose is **non-reducing** until it is hydrolysed. Hydrolysis of ${171} g of sucrose takes up ${hy.water} g of water and gives ${hy.each} g of glucose and ${hy.each} g of fructose.

**Polysaccharides** are long chains of monosaccharides:
- **Starch** — reserve food of plants (glucose units).
- **Glycogen** — reserve food of animals, in liver and muscle; highly branched glucose polymer.
- **Cellulose** — structural polysaccharide of plant cell walls; glucose units joined differently from starch, so humans cannot digest it.
- **Inulin** — polymer of fructose; a reserve in tubers and roots such as dahlia and chicory.
- **Chitin** — polymer of an amino sugar; wall of fungi and exoskeleton of arthropods.`,
      [kt('Glycosidic bond', 'Bond joining two monosaccharides, formed with loss of water.'), kt('Reducing sugar', 'Sugar with a free aldehyde or ketone group that reduces Benedict’s solution.'), kt('Starch', 'Storage polysaccharide of plants.'), kt('Glycogen', 'Storage polysaccharide of animals.')],
      V.disacc,
      [1],
    ),
    sec(
      '2. Amino acids',
      `**Amino acids** are the monomers of proteins. Each has an **amino group**, a **carboxyl group**, a **hydrogen** atom and an **R group** attached to the same (alpha) carbon. They differ only in R: **glycine** (R = H, ${AM.glycine}), **alanine** (R = CH₃, ${AM.alanine}) and **serine** (R = CH₂OH, ${AM.serine}).

In water, the carboxyl group gives up a proton to the amino group, so the molecule carries both a positive (NH₃⁺) and a negative (COO⁻) charge and no net charge: a **zwitterion**. In acid it carries a net positive charge, and in alkali a net negative charge.

**Classes by R group:** **neutral** (glycine, alanine, serine, valine); **acidic** (aspartic acid and glutamic acid, with an extra carboxyl group); **basic** (lysine, arginine, histidine); **sulphur-containing** (cysteine, methionine). **Essential** amino acids cannot be made by the body and must come from food: valine, leucine, isoleucine, lysine, methionine, phenylalanine, threonine and tryptophan (histidine is also essential for infants). **Non-essential** ones such as glycine, alanine and serine can be made.

A peptide bond joins the carboxyl group of one amino acid to the amino group of the next, releasing water. The tripeptide of glycine, alanine and serine weighs ${peptide(TRI)} (${AM.glycine + AM.alanine + AM.serine} − 2 × ${WATER}).`,
      [kt('Zwitterion', 'Ion with a positive and a negative charge and no net charge.'), kt('Essential amino acid', 'Amino acid that the body cannot make.'), kt('Peptide bond', 'Bond between the carboxyl group of one amino acid and the amino group of the next.')],
      V.amino,
      [2],
      [V.zwitter],
    ),
    sec(
      '3. Proteins',
      `**Proteins** are polymers of amino acids. Four levels of structure:
- **Primary** — the sequence of amino acids joined by **peptide bonds** (covalent). A change of one amino acid can change the function of the protein.
- **Secondary** — regular folding of the chain into an **α-helix** or **β-pleated sheet**, held by **hydrogen bonds** between backbone groups.
- **Tertiary** — folding of the whole chain into a three-dimensional shape, held by hydrogen bonds, **ionic** and **hydrophobic** interactions and **disulphide bridges** between cysteines.
- **Quaternary** — association of two or more folded polypeptide chains (subunits) by weak bonds, as in haemoglobin.

**Denaturation** (by heat, acid or alkali) breaks the weak bonds and unfolds the protein, but the peptide bonds of the primary structure stay intact. **Functions:** enzymes, structure (collagen, keratin), transport (haemoglobin), hormones (insulin), defence (antibodies), contraction (actin, myosin), storage (casein).

A chain of n amino acids has n − 1 peptide bonds; a protein of 280 amino acids in 4 chains has 276.`,
      [kt('Primary structure', 'Amino-acid sequence of a protein.'), kt('Denaturation', 'Loss of the folded shape of a protein, with peptide bonds intact.'), kt('Subunit', 'One folded chain in a protein with quaternary structure.')],
      V.protein,
      [3],
    ),
    sec(
      '4. Lipids',
      `**Lipids** are insoluble in water and soluble in organic solvents. **Simple lipids:** **fats**, **oils** (esters of glycerol and fatty acids) and **waxes**. **Compound lipids:** **phospholipids** and glycolipids. **Derived lipids:** fatty acids, glycerol and **steroids** such as cholesterol.

A **triglyceride** is glycerol (mass ${GLYCEROL}) joined to three fatty acids by **ester bonds** with loss of three water molecules; tripalmitin weighs ${triglyceride('palmitic', 'palmitic', 'palmitic')}. **Saturated** fatty acids have no double bonds, so the chains pack closely and the **fat is solid** at room temperature (usually animal fats); **unsaturated** fatty acids have one or more double bonds that bend the chain, so the **oil is liquid** (usually plant oils).

**Functions:** energy store (about 9 kcal per gram, more than twice that of carbohydrate), insulation, protection of organs, waterproofing (wax), structure of membranes (phospholipids, cholesterol) and hormones (steroids).`,
      [kt('Triglyceride', 'Glycerol joined to three fatty acids by ester bonds.'), kt('Saturated fatty acid', 'Fatty acid with no double bond.'), kt('Phospholipid', 'Compound lipid that forms the bilayer of membranes.')],
      V.triglyceride,
      [4],
    ),
    sec(
      '5. Enzymes',
      `**Enzymes** are biological catalysts, almost all proteins. They **lower the activation energy**, are **specific** (active site), are **not used up**, act in small amounts under mild conditions and can act in both directions. Names usually end in **-ase** (substrate or reaction type).

**Six classes:** **oxidoreductases** (oxidation and reduction; lactate dehydrogenase), **transferases** (transfer of a group; hexokinase), **hydrolases** (hydrolysis; lipase, lactase), **lyases** (removal of a group without water; decarboxylase), **isomerases** (rearrangement; glucose phosphate isomerase), **ligases** (joining using ATP; DNA ligase).

**Cofactors.** The protein part is the **apoenzyme**; with its cofactor it is the **holoenzyme**. **Prosthetic group:** organic, tightly bound (haem in catalase). **Coenzyme:** organic, loosely bound, often from a vitamin (NAD from niacin). **Metal ions:** zinc, magnesium.

**Effects.** Activity rises with **temperature** to an optimum (about 37 °C for a human enzyme; ${TCURVE.human.join(', ')} per cent at 5, 10, 15, 20, 25, 30, 37, 45 and 55 °C in the model) and then falls as the enzyme is denatured; each enzyme has an **optimum pH** (pepsin about 2, trypsin about 8). With rising **substrate** the rate increases to a maximum (${KIN.vmax} units in the model; ${KT.map((k) => k.free).join(', ')} at substrate ${KT.map((k) => k.s).join(', ')}).

**Competitive inhibition.** An inhibitor resembling the substrate occupies the active site; the maximum rate is unchanged but a higher substrate concentration is needed (${KT.map((k) => k.inh).join(', ')} with the inhibitor). Example: **malonate** inhibits **succinic dehydrogenase** because it resembles succinate.`,
      [kt('Active site', 'Region of an enzyme to which the substrate binds.'), kt('Coenzyme', 'Loosely bound organic cofactor, often derived from a vitamin.'), kt('Prosthetic group', 'Organic cofactor tightly bound to the enzyme.'), kt('Competitive inhibitor', 'Substance resembling the substrate that blocks the active site.')],
      V.enzymes,
      [5],
      [V.inhibition],
    ),
    sec(
      '6. Secondary metabolites',
      `**Primary metabolites** (sugars, amino acids, lipids, nucleotides) take part in the basic life of the cell. **Secondary metabolites** are compounds that are **not directly needed for growth, development or reproduction**, but have ecological and economic importance.

**Examples:** **alkaloids** (morphine, quinine, nicotine, caffeine) — defence against herbivores and medicines; **pigments** (carotenoids, anthocyanins) — colour to attract pollinators and animals that spread seeds; **gums** (gum arabic) and resins — seal wounds; **terpenoids** such as essential oils, rubber; toxins (abrin, ricin) and drugs (vinblastin, curcumin).`,
      [kt('Secondary metabolite', 'Compound not directly needed for growth or reproduction but useful to the organism in other ways.'), kt('Alkaloid', 'Nitrogen-containing secondary metabolite such as morphine.')],
      table(['Group', 'Examples'], [['Alkaloids', 'Morphine, quinine, nicotine'], ['Pigments', 'Carotenoids, anthocyanins'], ['Gums', 'Gum arabic']], 'Table of secondary metabolites'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying sucrose is glucose plus glucose (it is glucose plus fructose; maltose is glucose plus glucose).
- Writing that a zwitterion has no charges (it has two, with no net charge).
- Giving hydrogen bonds for the primary structure (peptide bonds); or peptide bonds for the secondary structure.
- Saying that boiling breaks the peptide bonds of a protein (it unfolds the shape).
- Saying a competitive inhibitor lowers the maximum rate (it raises the substrate needed for half the maximum; the maximum is the same).
- Confusing a coenzyme (loosely bound) with a prosthetic group (tightly bound).

**How marks are usually awarded**
- 1-mark subparts: a monomer, a bond, a class of enzyme, a cofactor, give-a-reason and analogy.
- 2–3-mark questions: structures of glycine, alanine and serine; zwitterion; saturated and unsaturated fats; classes of enzymes; graphs of activity.
- 5-mark questions in parts: protein structure with bonds; enzyme properties with graphs; competitive inhibition with malonate.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Maltose is made of?', 'Glucose + glucose.', 'fact', 1),
    fc(2, 'Lactose is made of?', 'Glucose + galactose (milk sugar).', 'fact', 1),
    fc(3, 'Sucrose is made of?', 'Glucose + fructose.', 'fact', 1),
    fc(4, 'Bond between two monosaccharides?', 'Glycosidic bond, with loss of water.', 'definition', 1),
    fc(5, 'Reserve food of animals?', 'Glycogen.', 'fact', 1),
    fc(6, 'Polysaccharide of fructose?', 'Inulin.', 'fact', 1),
    fc(7, 'Chitin occurs in?', 'Fungal walls and arthropod exoskeleton.', 'fact', 1),
    fc(8, 'How does deoxyribose differ from ribose?', 'It has one oxygen atom fewer.', 'concept', 1),
    fc(9, 'Four groups on the alpha carbon?', 'Amino group, carboxyl group, hydrogen, R group.', 'exam-tip', 2),
    fc(10, 'R group of glycine?', 'Hydrogen.', 'fact', 2),
    fc(11, 'R group of alanine?', 'Methyl, CH₃.', 'fact', 2),
    fc(12, 'R group of serine?', 'Hydroxymethyl, CH₂OH.', 'fact', 2),
    fc(13, 'What is a zwitterion?', 'Ion with a positive and a negative charge; no net charge.', 'definition', 2),
    fc(14, 'Two sulphur-containing amino acids?', 'Cysteine and methionine.', 'fact', 2),
    fc(15, 'Essential amino acid?', 'One the body cannot make, e.g. lysine.', 'definition', 2),
    fc(16, 'Bond of the primary structure?', 'Peptide bond.', 'exam-tip', 3),
    fc(17, 'Bond of the secondary structure?', 'Hydrogen bond.', 'exam-tip', 3),
    fc(18, 'Bridge between two cysteines?', 'Disulphide bridge.', 'fact', 3),
    fc(19, 'Quaternary structure means?', 'Several folded chains together.', 'concept', 3),
    fc(20, 'What does boiling do to a protein?', 'Unfolds it; peptide bonds stay.', 'concept', 3),
    fc(21, 'Saturated fat: state at room temperature?', 'Solid.', 'fact', 4),
    fc(22, 'What bends an unsaturated chain?', 'A double bond.', 'concept', 4),
    fc(23, 'A triglyceride contains?', 'Glycerol + three fatty acids (ester bonds).', 'definition', 4),
    fc(24, 'Energy per gram: fat or carbohydrate?', 'Fat, about 9 kcal against 4.', 'fact', 4),
    fc(25, 'Six classes of enzymes?', 'Oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases.', 'exam-tip', 5),
    fc(26, 'Prosthetic group versus coenzyme?', 'Tightly bound versus loosely bound organic cofactor.', 'concept', 5),
    fc(27, 'Rate at S = Km?', 'Half of the maximum rate.', 'concept', 5),
    fc(28, 'Competitive inhibitor example?', 'Malonate on succinic dehydrogenase.', 'fact', 5),
    fc(29, 'Secondary metabolite: definition?', 'Not needed for basic growth; useful in other ways.', 'definition', 6),
    fc(30, 'Three groups of secondary metabolites?', 'Alkaloids, pigments, gums.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
void PCURVE;
