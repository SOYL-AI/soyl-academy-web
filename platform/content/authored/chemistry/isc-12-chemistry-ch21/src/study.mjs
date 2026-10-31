// ISC 12 Chemistry ch21 Carbohydrates — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Carbohydrates — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Definition and classification',
      r`**Carbohydrates:** optically active polyhydroxy aldehydes or ketones, or compounds giving them on hydrolysis. The formula Cₓ(H₂O)ᵧ is only a rough guide (rhamnose C₆H₁₂O₅ is a carbohydrate; ethanoic acid C₂H₄O₂ is not).

**By hydrolysis:** monosaccharides (glucose, fructose, ribose) → oligosaccharides (2–10 units: sucrose, maltose, lactose) → polysaccharides (starch, cellulose, glycogen). **Aldoses** (–CHO) and **ketoses** (C=O), named by carbon count (aldohexose, ketohexose, aldopentose). Mono- and disaccharides are sweet, soluble **sugars**; polysaccharides are **non-sugars**.

**Reducing sugars** reduce Tollens’ and Fehling’s (free aldehyde or α-hydroxy ketone, or a ring that opens to one): all monosaccharides, maltose, lactose. **Non-reducing:** sucrose, polysaccharides.

**Importance:** energy (glucose, starch, glycogen), structure (cellulose), materials (cotton, paper, ethanol), ribose and deoxyribose in nucleic acids.`,
      [kt('Monosaccharide', 'A carbohydrate that cannot be hydrolysed to a simpler sugar.'), kt('Reducing sugar', 'A sugar that reduces Tollens’ reagent and Fehling’s solution because it has a free (or potentially free) carbonyl group.')],
      [fm(r`\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}`, 'A disaccharide gives two monosaccharides')],
      table(['Class', 'Example', 'Reducing?'], [['Monosaccharide', 'Glucose', 'Yes'], ['Disaccharide', 'Sucrose', 'No'], ['Disaccharide', 'Maltose', 'Yes'], ['Polysaccharide', 'Starch', 'No']], 'Table of four carbohydrates with class and reducing behaviour'),
      [1],
    ),
    sec(
      '2. Structure of glucose',
      r`**Open chain** HOCH₂(CHOH)₄CHO (aldohexose; C2–C5 chiral; 2⁴ = 16 stereoisomers). Evidence:

| Reagent | Product | Shows |
|---|---|---|
| HI, prolonged heating | n-Hexane | Straight C₆ chain |
| NH₂OH / HCN | Oxime / cyanohydrin | C=O group |
| Br₂ water | Gluconic acid (C₆) | C=O is –CHO |
| (CH₃CO)₂O | Pentaacetate | Five –OH, on different carbons |
| HNO₃ | Saccharic acid HOOC(CHOH)₄COOH | Primary –CH₂OH |
| C₆H₅NHNH₂ (1 mol / 3 mol) | Phenylhydrazone / osazone | C=O; C1 and C2 react |

**Cyclic (pyranose) structure:** C5–OH adds to C1–CHO (hemiacetal). Explains: no Schiff’s test, no NaHSO₃ adduct, pentaacetate unreactive to NH₂OH, two crystalline forms, two methyl glucosides. C1 is the **anomeric carbon**: **α** (+111°, m.p. 419 K) and **β** (+19.2°, 423 K); **mutarotation** to +52.5° (about 36% α, 64% β).

**D/L:** –OH on the lowest chiral carbon (C5) right = D, left = L (relative to glyceraldehyde); independent of (+)/(−).`,
      [kt('Anomers', 'Cyclic stereoisomers of a sugar that differ only in configuration at the anomeric carbon (C1 of glucose).'), kt('Mutarotation', 'The gradual change in specific rotation of a freshly prepared solution of one anomer to a constant equilibrium value.')],
      [fm(r`\ce{C6H12O6 + 3C6H5NHNH2 -> C18H22N4O4 + C6H5NH2 + NH3 + 2H2O}`, 'Osazone formation'), fm(r`\ce{C6H12O6 + 5(CH3CO)2O -> C6H7O(OCOCH3)5 + 5CH3COOH}`, 'Pentaacetate')],
      table(['Form', 'Rotation'], [['α-D-Glucose', '+111°'], ['β-D-Glucose', '+19.2°'], ['Equilibrium', '+52.5°']], 'Table of rotations of the glucose anomers'),
      [2],
    ),
    sec(
      '3. Fructose and the bromine-water test',
      r`**Fructose:** ketohexose HOCH₂CO(CHOH)₃CH₂OH, C=O at **C2**; gives n-hexane with HI; cyanohydrin → hydrolysis → HI gives **2-methylhexanoic acid** (glucose gives heptanoic acid). Ring: C5–OH + C2 → five-membered **furanose** (α and β anomers). **D-(−)**, −92.4°.

Fructose reduces Tollens’ and Fehling’s (it isomerises in alkali), and gives the **same osazone** as glucose. **Bromine water** (mild, not alkaline) oxidises **glucose** (decolourised) but **not fructose**:

$\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$`,
      [kt('Furanose', 'A five-membered ring form of a sugar containing four carbons and one oxygen.'), kt('Ketose', 'A monosaccharide containing a ketone group.')],
      [fm(r`\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}`, 'Bromine water oxidises glucose')],
      table(['Test', 'Glucose', 'Fructose'], [['Bromine water', 'Decolourised', 'No change'], ['Fehling’s', 'Positive', 'Positive']], 'Table of bromine-water and Fehling’s results for glucose and fructose'),
      [3],
    ),
    sec(
      '4. Disaccharides',
      r`**Glycosidic linkage:** C–O–C link formed between the anomeric –OH of one sugar and an –OH of another, with loss of water.

| Disaccharide | Units | Link | Reducing? |
|---|---|---|---|
| Sucrose | α-D-glucose + β-D-fructose | C1 (Glc) – C2 (Fru), α1→β2 | No |
| Maltose | 2 α-D-glucose | α-1,4 | Yes |
| Lactose | β-D-galactose + D-glucose | β-1,4 | Yes |

Sucrose (+66.5°) hydrolyses (H⁺ or invertase) to an equimolar glucose + fructose mixture of rotation about −20°: **invert sugar**. Maltose comes from starch (diastase) and lactose from milk.`,
      [kt('Glycosidic linkage', 'The ether (C–O–C) link joining two monosaccharide units through an anomeric carbon.'), kt('Invert sugar', 'The equimolar mixture of glucose and fructose formed by hydrolysis of sucrose; laevorotatory although sucrose is dextrorotatory.')],
      [fm(r`\ce{C12H22O11 + H2O ->[maltase] 2C6H12O6}`, 'Hydrolysis of maltose')],
      table(['Sugar', 'Link'], [['Sucrose', 'α1 → β2'], ['Maltose', 'α1 → 4'], ['Lactose', 'β1 → 4']], 'Table of disaccharide links'),
      [4],
    ),
    sec(
      '5. Polysaccharides',
      r`**Starch** (plants): **amylose** 15–20% (unbranched α-1,4, water-soluble, blue with I₂) + **amylopectin** 80–85% (α-1,4 chains branched by α-1,6 about every 20–25 units, insoluble). Hydrolysis: starch → dextrins → maltose → glucose.

**Cellulose** (cell walls, cotton): unbranched **β-1,4** chains, hydrogen-bonded into fibres; not digested by humans (no enzyme for β-links); digested by ruminants with gut microbes.

**Glycogen** (liver, muscle): α-1,4 with α-1,6 branches about every 8–12 units — more branched than amylopectin.

Mass relation: each chain unit C₆H₁₀O₅ (162) gives one glucose (180).`,
      [kt('Amylopectin', 'The branched, water-insoluble component of starch with α-1,4 and α-1,6 links.'), kt('Glycogen', 'The highly branched glucose polymer that stores energy in animals.')],
      [fm(r`\ce{(C6H10O5)_{n} + nH2O -> nC6H12O6}`, 'Complete hydrolysis of starch')],
      table(['Polysaccharide', 'Link', 'Role'], [['Starch', 'α-1,4 (+ α-1,6)', 'Plant store'], ['Cellulose', 'β-1,4', 'Structure'], ['Glycogen', 'α-1,4 + α-1,6', 'Animal store']], 'Table comparing three polysaccharides'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using Fehling’s solution to distinguish glucose from fructose (both are positive; use bromine water).
- Calling α- and β-glucose enantiomers (they are anomers, differing at C1 only).
- Linking D with (+).
- Writing lactose as glucose + glucose, or giving cellulose α-links.

**How marks are usually awarded**
- Evidence for glucose structure (1 mark per reaction): reagent, product and conclusion.
- Disaccharide structure (2 marks): units, carbons joined, α/β, reducing or not.
- Polysaccharide comparisons (3 marks): one point each for unit, link/branching and function.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define carbohydrate.', 'Optically active polyhydroxy aldehyde or ketone, or a compound that gives one on hydrolysis.', 'definition', 1),
    fc(2, 'Aldose vs ketose?', 'Aldose has –CHO; ketose has C=O (ketone).', 'concept', 1),
    fc(3, 'Oligosaccharide?', 'Gives 2–10 monosaccharide units on hydrolysis.', 'definition', 1),
    fc(4, 'Reducing sugar?', 'Reduces Tollens’ and Fehling’s: free or potentially free carbonyl group.', 'definition', 1),
    fc(5, 'Name a non-reducing disaccharide.', 'Sucrose.', 'fact', 1),
    fc(6, 'Glucose + HI (prolonged heating)?', 'n-Hexane: straight C₆ chain.', 'fact', 2),
    fc(7, 'Glucose + bromine water?', 'Gluconic acid: proves –CHO.', 'fact', 2),
    fc(8, 'Glucose + acetic anhydride?', 'Pentaacetate: five –OH.', 'fact', 2),
    fc(9, 'Glucose + nitric acid?', 'Saccharic acid: proves –CH₂OH end.', 'fact', 2),
    fc(10, 'Glucose + excess phenylhydrazine?', 'Osazone (C1 and C2 react).', 'fact', 2),
    fc(11, 'Facts not explained by open-chain glucose?', 'No Schiff’s test, no NaHSO₃ adduct, pentaacetate inert to NH₂OH, two anomers.', 'concept', 2),
    fc(12, 'Ring in glucose?', 'Six-membered pyranose: C5–OH adds to C1.', 'fact', 2),
    fc(13, 'Anomers?', 'α and β forms differing only at C1 (anomeric carbon).', 'definition', 2),
    fc(14, 'Mutarotation?', 'Change of rotation of a fresh anomer solution to +52.5° at equilibrium.', 'definition', 2),
    fc(15, 'D or L?', 'From the –OH on the lowest chiral carbon: right = D.', 'concept', 2),
    fc(16, 'Stereoisomers of an aldohexose?', '2⁴ = 16.', 'fact', 2),
    fc(17, 'Carbonyl position in fructose?', 'C2 (ketone).', 'fact', 3),
    fc(18, 'Ring in fructose?', 'Five-membered furanose (C5–OH + C2).', 'fact', 3),
    fc(19, 'Test to tell glucose from fructose?', 'Bromine water: only glucose decolourises it.', 'fact', 3),
    fc(20, 'Why does fructose reduce Fehling’s?', 'It isomerises in alkali (enediol) to aldoses.', 'concept', 3),
    fc(21, 'Glucose and fructose osazones?', 'Identical.', 'fact', 3),
    fc(22, 'Glycosidic linkage?', 'C–O–C link through an anomeric carbon, with loss of H₂O.', 'definition', 4),
    fc(23, 'Sucrose link?', 'α-Glucose C1 – β-fructose C2.', 'fact', 4),
    fc(24, 'Maltose link?', 'α-1,4 between two glucose units.', 'fact', 4),
    fc(25, 'Lactose units?', 'β-D-Galactose + D-glucose (β-1,4).', 'fact', 4),
    fc(26, 'Invert sugar?', 'Glucose + fructose from sucrose; rotation (+) → (−).', 'definition', 4),
    fc(27, 'Amylose vs amylopectin?', 'Amylose unbranched α-1,4; amylopectin branched by α-1,6.', 'concept', 5),
    fc(28, 'Cellulose link?', 'β-1,4 (unbranched).', 'fact', 5),
    fc(29, 'Glycogen?', 'Highly branched α-glucose polymer in liver and muscle.', 'fact', 5),
    fc(30, 'Why can’t humans digest cellulose?', 'No enzyme for β-glycosidic links.', 'concept', 5),
    fc(31, 'Exam tip: evidence questions', 'Give reagent, product and conclusion for each reaction.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
