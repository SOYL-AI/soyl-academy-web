// ISC 12 Chemistry ch21 Carbohydrates — two decks: Part 1 (t01–t02) classification, reducing sugars and the
// structure of glucose (open-chain evidence, cyclic structure, anomers, D/L); Part 2 (t03–t05) fructose and the
// bromine-water test, disaccharides and glycosidic links, polysaccharides.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { GLUCOSE } from './svgs.mjs';

const V = {
  glucose: svgV(GLUCOSE, 'Fischer projection of open-chain D-glucose: six carbons in a vertical chain, aldehyde at carbon 1, hydroxyl on the right at carbons 2, 4 and 5 and on the left at carbon 3, CH2OH at carbon 6'),
};

export const deck1 = deck({
  part: 1,
  title: 'Carbohydrates — Part 1: Classification and the structure of glucose',
  goals: [
    'Classify carbohydrates by hydrolysis and by reducing power',
    'Explain how six reactions of glucose establish its open-chain structure',
    'Explain why glucose must also exist as a six-membered ring, and what anomers are',
    'Assign D or L configuration to a sugar from its Fischer projection',
  ],
  slides: [
    sl('title', 'Sugars, starch and fibre', {
      b: 'Part 1 — what makes a compound a carbohydrate, and how chemists proved the structure of glucose using nothing but test-tube reactions.',
      v: table(['Everyday material', 'Main carbohydrate'], [['Honey, grapes', 'Glucose and fructose'], ['Jaggery, table sugar', 'Sucrose'], ['Milk', 'Lactose'], ['Rice, wheat, potatoes', 'Starch'], ['Cotton, paper, jute', 'Cellulose']], 'Table of everyday materials and the carbohydrate each mainly contains'),
      n: 'Namaste! The rice on your plate, the cotton in your shirt and the jaggery in your tea are all carbohydrates. They supply most of our energy and much of the material plants are built from. In this part we classify them and then follow the classic detective story of how the structure of glucose was worked out from its reactions.',
    }),
    sl('concept', 'Definition and classification', {
      b: 'Carbohydrates are **optically active polyhydroxy aldehydes or ketones**, or substances that give them on hydrolysis. Many fit Cₓ(H₂O)ᵧ, but the formula is not a definition: rhamnose C₆H₁₂O₅ is a carbohydrate, while ethanoic acid C₂H₄O₂ is not. By hydrolysis: **monosaccharides** (no simpler sugar), **oligosaccharides** (2–10 units) and **polysaccharides** (many units). Monosaccharides are **aldoses** (–CHO) or **ketoses** (C=O), named by carbon count: aldopentose, ketohexose.',
      v: table(['Class', 'Units on hydrolysis', 'Examples', 'Taste and solubility'], [['Monosaccharide', 'Does not hydrolyse', 'Glucose, fructose, ribose', 'Sweet, soluble (sugars)'], ['Disaccharide', '2', 'Sucrose, maltose, lactose', 'Sweet, soluble (sugars)'], ['Trisaccharide', '3', 'Raffinose', 'Sweet, soluble'], ['Polysaccharide', 'Hundreds to thousands', 'Starch, cellulose, glycogen', 'Not sweet, mostly insoluble (non-sugars)']], 'Table classifying carbohydrates by the number of units obtained on hydrolysis, with examples, taste and solubility'),
      n: 'A carbohydrate is an optically active compound with several hydroxyl groups and an aldehyde or ketone group, or one that gives such compounds on hydrolysis. The old idea of a hydrate of carbon is only a rough guide, because some carbohydrates do not fit that formula and some non-carbohydrates do. We sort them by hydrolysis: monosaccharides cannot be split, disaccharides give two units, and polysaccharides give many. Monosaccharides are aldoses or ketoses, named by the number of carbon atoms.',
    }),
    sl('concept', 'Reducing and non-reducing sugars; importance', {
      b: 'A sugar that reduces **Tollens’ reagent** (silver mirror) or **Fehling’s solution** (red Cu₂O) is a **reducing sugar**: it has a free aldehyde or α-hydroxy ketone group, or a ring that can open to one. All monosaccharides are reducing. A disaccharide is **non-reducing** if both anomeric carbons are tied up in the glycosidic link (sucrose). **Importance:** energy source (glucose, starch, glycogen), structure (cellulose in plants), raw materials (cotton, paper, ethanol by fermentation), and the sugars ribose and deoxyribose in nucleic acids.',
      v: table(['Sugar', 'Tollens’ / Fehling’s', 'Classification'], [['Glucose', 'Positive', 'Reducing'], ['Fructose', 'Positive', 'Reducing'], ['Maltose', 'Positive', 'Reducing'], ['Lactose', 'Positive', 'Reducing'], ['Sucrose', 'Negative', 'Non-reducing'], ['Starch', 'Negative (practically)', 'Non-reducing']], 'Table of six carbohydrates with their response to Tollens’ and Fehling’s reagents and their classification as reducing or non-reducing'),
      n: 'Sugars that turn Tollens’ reagent into a silver mirror, or Fehling’s solution into a red precipitate, are reducing sugars. They contain a free aldehyde group, or a ring that can open to give one. Every simple sugar is reducing, but table sugar is not, because its two reactive carbons are locked together. Carbohydrates matter as fuel, as plant structure, as raw materials for cloth, paper and alcohol, and as part of nucleic acids.',
    }),
    sl('check', 'Quick check: classifying sugars', {
      b: 'Classify a carbohydrate from its hydrolysis products and its reaction with Fehling’s solution.',
      n: 'Quick check. Count the units given on hydrolysis, then ask whether a free reducing group remains.',
      chk: 'sugarclass-mcq',
    }),
    sl('diagram', 'Glucose: the open-chain structure', {
      b: 'Glucose, C₆H₁₂O₆, is an **aldohexose**: an unbranched chain of six carbons, –CHO at C1, secondary –OH on C2 to C5 and a primary –CH₂OH at C6. C2, C3, C4 and C5 are chiral, so 2⁴ = 16 stereoisomeric aldohexoses exist; natural glucose is one of them.',
      v: V.glucose,
      n: 'Here is glucose drawn as a Fischer projection. Carbon one is an aldehyde group. Carbons two, three, four and five each carry a hydroxyl group and are all chiral, and carbon six is a primary alcohol group. With four chiral carbons there are sixteen possible stereoisomers, and glucose is just one of them. Next we see the reactions that proved this structure.',
    }),
    sl('concept', 'Evidence 1: the chain and the carbonyl group', {
      b: '**Molecular formula** C₆H₁₂O₆ from analysis and molar mass. **Prolonged heating with HI** gives **n-hexane**: the six carbons are in a **straight chain**. **Hydroxylamine** gives an oxime and **HCN** a cyanohydrin: a **carbonyl group** is present. **Bromine water** (a mild oxidant) gives **gluconic acid**, C₆H₁₂O₇, with no loss of carbon: the carbonyl is an **aldehyde**.',
      m: [r`\ce{C6H12O6 + 14HI -> CH3(CH2)4CH3 + 6H2O + 7I2}`, r`\ce{HOCH2(CHOH)4CHO + NH2OH -> HOCH2(CHOH)4CH=NOH + H2O}`, r`\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}`],
      v: table(['Reagent', 'Product', 'Conclusion'], [['HI, heat', 'n-Hexane', 'Unbranched C₆ chain'], ['NH₂OH', 'Glucose oxime', 'C=O group present'], ['HCN', 'Glucose cyanohydrin', 'C=O group present'], ['Br₂ water', 'Gluconic acid (C₆)', 'The C=O is –CHO']], 'Table of four reagents, the products they give with glucose and the structural conclusion from each'),
      n: 'Heating glucose for a long time with hydrogen iodide strips away all the oxygen and gives normal hexane, so the six carbons form an unbranched chain. Glucose reacts with hydroxylamine to give an oxime and adds hydrogen cyanide, so it has a carbonyl group. Bromine water, a gentle oxidising agent, converts it into gluconic acid with the same six carbons, which can only happen if the carbonyl group is an aldehyde.',
    }),
    sl('concept', 'Evidence 2: hydroxyl groups and the ends of the chain', {
      b: '**Acetic anhydride** gives a **pentaacetate**: five –OH groups, on **different carbons** (the compound is stable; one carbon rarely holds two –OH). **Nitric acid** oxidises both ends to **saccharic acid**, HOOC(CHOH)₄COOH, as does nitric acid on gluconic acid: the second end is a **primary alcohol**, –CH₂OH. **Phenylhydrazine** (one mole) gives a phenylhydrazone; with **excess** (three moles) it gives a yellow crystalline **osazone**, involving C1 and C2.',
      m: [r`\ce{C6H12O6 + 5(CH3CO)2O -> C6H7O(OCOCH3)5 + 5CH3COOH}`, r`\ce{C6H12O6 + 3C6H5NHNH2 -> C18H22N4O4 + C6H5NH2 + NH3 + 2H2O}`],
      v: flow('LR', [['a', 'Glucose (CHO … CH₂OH)'], ['b', 'Gluconic acid (COOH … CH₂OH)'], ['c', 'Saccharic acid (COOH … COOH)']], [['a', 'b', 'Br₂ water'], ['b', 'c', 'HNO₃'], ['a', 'c', 'HNO₃']], 'Flow showing bromine water oxidising only the aldehyde end of glucose to give gluconic acid, and nitric acid oxidising both glucose and gluconic acid to saccharic acid'),
      n: 'Acetic anhydride converts glucose into a pentaacetate, so there are five hydroxyl groups, each on its own carbon. Nitric acid, a stronger oxidant, turns glucose into saccharic acid, which has an acid group at each end; since gluconic acid gives the same product, the far end must be a primary alcohol group. Phenylhydrazine first gives a phenylhydrazone, and with excess reagent a yellow osazone, in which both carbon one and carbon two have reacted.',
    }),
    sl('example', 'Worked example: assembling the structure', {
      b: r`**Problem.** A hexose X gives n-hexane with HI, an oxime with NH₂OH, a pentaacetate with acetic anhydride and a six-carbon monocarboxylic acid with bromine water. Deduce the open-chain structure of X.

**Step 1.** HI → n-hexane: unbranched chain $\ce{C-C-C-C-C-C}$.

**Step 2.** Oxime: one C=O; bromine water gives an acid with no loss of carbon, so the C=O is –CHO at C1.

**Step 3.** Pentaacetate: five –OH on C2–C6, one each; C6 must be –CH₂OH.

**Result.** $\ce{HOCH2-(CHOH)4-CHO}$, an aldohexose (glucose or one of its stereoisomers).`,
      v: flow('LR', [['a', 'Straight C₆ chain'], ['b', '–CHO at C1'], ['c', 'Five –OH, one per carbon'], ['d', 'HOCH₂(CHOH)₄CHO']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow combining three deductions into the open-chain aldohexose structure'),
      n: 'Put the clues together one at a time. Normal hexane from hydrogen iodide fixes an unbranched chain of six carbons. The oxime shows one carbonyl group, and oxidation without losing carbon puts it at the end as an aldehyde. Five acetyl groups mean five hydroxyl groups, one on each remaining carbon, so carbon six is a primary alcohol group. That gives the aldohexose structure, although these reactions cannot tell us the arrangement in space.',
    }),
    sl('check', 'Quick check: reading the evidence', {
      b: 'Match a reaction of glucose to what it proves.',
      n: 'Quick check. Decide which part of the molecule the reagent attacks and what the product tells us.',
      chk: 'hi-mcq',
    }),
    sl('concept', 'Cyclic structure and anomers', {
      b: 'Facts the open chain cannot explain: glucose gives **no Schiff’s test** and **no NaHSO₃ adduct**; the **pentaacetate does not react with NH₂OH**; glucose forms **two crystalline forms** with different rotations; and it forms two isomeric **methyl glucosides**. Explanation: the **C5 –OH adds to the C1 aldehyde**, giving a six-membered **pyranose** ring (a cyclic **hemiacetal**). C1 becomes a new chiral centre (the **anomeric carbon**), so there are two **anomers**, **α** and **β**, differing only at C1. In water each slowly changes to an equilibrium mixture with a trace of open chain: **mutarotation**.',
      v: table(['Form', 'C1 –OH (Haworth)', 'm.p.', 'Specific rotation'], [['α-D-Glucopyranose', 'Below the ring', '419 K', '+111°'], ['β-D-Glucopyranose', 'Above the ring', '423 K', '+19.2°'], ['Equilibrium in water', 'α ⇌ open chain ⇌ β', '—', '+52.5°']], 'Table comparing alpha and beta D-glucopyranose by position of the anomeric hydroxyl, melting point and specific rotation, and the equilibrium value in water'),
      n: 'Some facts do not fit the open chain. Glucose does not restore the colour of Schiff’s reagent, it forms no bisulfite compound, and its pentaacetate has no free aldehyde group. The explanation is that the hydroxyl on carbon five adds to the aldehyde group, closing a six-membered ring called a pyranose. Carbon one becomes a new chiral centre, so two forms exist, alpha and beta, called anomers. In water each slowly turns into the same equilibrium mixture, a change in rotation called mutarotation.',
    }),
    sl('concept', 'D and L configuration', {
      b: 'D and L describe configuration **relative to glyceraldehyde**. In a Fischer projection with the carbonyl group at the top, look at the **chiral carbon farthest from the C=O** (C5 in a hexose): –OH on the **right** → **D**; on the **left** → **L**. D/L is unrelated to the sign of rotation, which is shown separately as (+) or (−): D-(+)-glucose, but **D-(−)-fructose**.',
      v: table(['Compound', 'OH on lowest chiral C', 'Configuration', 'Rotation'], [['Glyceraldehyde (reference)', 'Right', 'D', '(+)'], ['Natural glucose', 'Right (C5)', 'D', '(+)'], ['Natural fructose', 'Right (C5)', 'D', '(−)'], ['Mirror image of natural glucose', 'Left (C5)', 'L', '(−)']], 'Table relating the position of the hydroxyl group on the lowest chiral carbon to D or L configuration and showing that the sign of rotation is independent'),
      n: 'The letters D and L compare a sugar with glyceraldehyde. Draw the sugar as a Fischer projection with the carbonyl group at the top and look at the chiral carbon farthest from it, which is carbon five in glucose. If its hydroxyl group points right, the sugar belongs to the D series; if left, to the L series. This says nothing about the direction of rotation: natural fructose is D, yet it rotates light to the left.',
    }),
    sl('example', 'Worked example: composition of the equilibrium mixture', {
      b: r`**Problem.** α-D-Glucose has $[\alpha]_D = +111^\circ$ and β-D-glucose $+19.2^\circ$. At equilibrium in water the rotation is $+52.5^\circ$. Ignoring the open chain, find the percentage of the β-anomer.

**Step 1.** Let the fraction of β be $x$: $111(1 - x) + 19.2x = 52.5$.

**Step 2.** $x = \dfrac{111 - 52.5}{111 - 19.2} = \dfrac{58.5}{91.8} = 0.637$.

**Answer.** About **63.7% β** and 36.3% α: the β-anomer, with every –OH equatorial, is more stable.`,
      v: table(['Quantity', 'Value'], [['Rotation of α', '+111°'], ['Rotation of β', '+19.2°'], ['Equilibrium rotation', '+52.5°'], ['Fraction β', '0.637']], 'Table of the rotations of the two anomers, the equilibrium rotation and the calculated fraction of the beta anomer'),
      n: 'The equilibrium rotation is a weighted average of the rotations of the two anomers. Call the fraction of beta x, so the fraction of alpha is one minus x. Solving gives x as fifty eight point five divided by ninety one point eight, which is about point six four. So roughly two thirds of dissolved glucose is the beta form, the more stable anomer.',
    }),
    sl('check', 'Quick check: the ring and its anomers', {
      b: 'Explain an observation using the cyclic structure of glucose.',
      n: 'Quick check. Think about which carbon becomes the new chiral centre when the ring closes.',
      chk: 'pyranose-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Carbohydrates: optically active polyhydroxy aldehydes or ketones; mono-, oligo- and polysaccharides; aldoses and ketoses.',
        'Reducing sugars reduce Tollens’ and Fehling’s; sucrose and polysaccharides do not.',
        'Glucose evidence: HI → n-hexane; NH₂OH, HCN → C=O; Br₂ water → gluconic acid (–CHO); pentaacetate (5 –OH); HNO₃ → saccharic acid (–CH₂OH); excess PhNHNH₂ → osazone.',
        'Cyclic pyranose (C5–OH + C1–CHO); α and β anomers at C1; mutarotation to +52.5°.',
        'D/L from the lowest chiral carbon, independent of (+)/(−).',
      ],
      v: table(['Reagent', 'Feature shown'], [['HI', 'Straight chain'], ['Br₂ water', 'Aldehyde'], ['(CH₃CO)₂O', 'Five –OH'], ['HNO₃', 'Primary alcohol']], 'Summary table of four reagents and the feature of glucose each shows'),
      n: 'Let us sum up Part 1. Carbohydrates are polyhydroxy aldehydes or ketones, classified by hydrolysis and by whether they reduce Tollens’ and Fehling’s reagents. Six reactions establish the open-chain structure of glucose. A few facts need the six-membered ring, which gives two anomers that interconvert in water. D and L describe configuration at the lowest chiral carbon, not the direction of rotation.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For each reaction, state the reagent, the product and the conclusion — all three earn marks.',
        'Bromine water distinguishes aldehyde from ketone; nitric acid proves the –CH₂OH end.',
        'Anomers differ only at C1; they are diastereomers, not enantiomers.',
        'Never link D with (+) or L with (−).',
      ],
      v: table(['Slip', 'Fix'], [['HI gives hexan-1-ol', 'HI gives n-hexane'], ['Pentaacetate shows six –OH', 'Five –OH'], ['α and β are mirror images', 'They differ at C1 only']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When asked about the evidence, give the reagent, the product and what it proves. Remember that bromine water picks out the aldehyde group and nitric acid the primary alcohol group. Alpha and beta glucose differ at carbon one only, so they are not mirror images. And keep the letters D and L separate from the plus and minus signs of rotation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Carbohydrates — Part 2: Fructose, disaccharides and polysaccharides',
  goals: [
    'Describe the open-chain and cyclic structures of fructose',
    'Use the bromine-water test to distinguish glucose from fructose',
    'Identify the units and glycosidic links in sucrose, maltose and lactose',
    'Compare starch, cellulose and glycogen in structure and function',
  ],
  slides: [
    sl('title', 'From fruit sugar to fibre', {
      b: 'Part 2 — the ketose fructose, the three common disaccharides and the giant glucose polymers.',
      v: flow('LR', [['a', 'Monosaccharides'], ['b', 'Disaccharides'], ['c', 'Polysaccharides']], [['a', 'b', 'glycosidic link, − H₂O'], ['b', 'c', 'many more links']], 'Flow showing monosaccharides joining by glycosidic links with loss of water to form disaccharides and then polysaccharides'),
      n: 'In Part 2 we meet fructose, the sugar of fruit and honey, and learn a simple test to tell it from glucose. Then we see how sugar units join through glycosidic links, losing water each time, to give the disaccharides sucrose, maltose and lactose, and finally the polysaccharides starch, cellulose and glycogen.',
    }),
    sl('concept', 'Fructose: open chain and ring', {
      b: '**Fructose**, C₆H₁₂O₆, is a **ketohexose**: HOCH₂–CO–(CHOH)₃–CH₂OH, with the ketone at **C2**. Like glucose it gives n-hexane with HI and a pentaacetate. Its cyanohydrin, hydrolysed and reduced with HI, gives **2-methylhexanoic acid**, which places the C=O at C2 (glucose gives straight-chain heptanoic acid). In solution the **C5 –OH adds to C2**, giving a five-membered **furanose** ring (a hemiketal) with α and β anomers. Natural fructose is **D-(−)**, laevorotatory, [α]D = −92.4°.',
      v: flow('LR', [['a', 'Fructose (C=O at C2)'], ['b', 'Cyanohydrin'], ['c', 'Hydroxy acid'], ['d', '2-Methylhexanoic acid']], [['a', 'b', 'HCN'], ['b', 'c', 'hydrolysis'], ['c', 'd', 'HI, heat']], 'Flow converting fructose through its cyanohydrin and hydroxy acid into 2-methylhexanoic acid, showing a branch at carbon 2'),
      n: 'Fructose has the same formula as glucose, but its carbonyl group is a ketone at carbon two. Adding hydrogen cyanide, hydrolysing and then reducing with hydrogen iodide gives two-methylhexanoic acid, with a branch at carbon two, while glucose gives an unbranched acid. In solution fructose closes a five-membered ring, called a furanose, by joining the hydroxyl on carbon five to carbon two. It is laevorotatory.',
    }),
    sl('concept', 'The bromine-water test', {
      b: '**Bromine water** is a mild oxidant that attacks **aldehydes** but not ketones (and it is not alkaline, so fructose cannot rearrange). **Glucose** decolourises the orange-brown bromine water, forming gluconic acid; **fructose** does not. Tollens’ and Fehling’s **cannot** distinguish them: in alkaline solution fructose isomerises (via an enediol) and so is also a reducing sugar. Both give the **same osazone**, because only C1 and C2 react and the two sugars have the same configuration at C3–C5.',
      m: [r`\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}`],
      v: table(['Test', 'Glucose', 'Fructose'], [['Bromine water', 'Decolourised (gluconic acid)', 'No change'], ['Fehling’s / Tollens’', 'Positive', 'Positive'], ['Excess phenylhydrazine', 'Glucosazone', 'Same osazone'], ['Rotation', 'D-(+)', 'D-(−)']], 'Table comparing glucose and fructose in four tests'),
      n: 'Bromine water is the way to tell glucose from fructose. It oxidises an aldehyde group but not a ketone, and because it is not alkaline, fructose cannot first rearrange into an aldose. So glucose decolourises bromine water and fructose leaves it orange. Fehling’s solution and Tollens’ reagent do not help, because both sugars reduce them, and both give the same osazone.',
    }),
    sl('example', 'Worked example: two unlabelled sugar solutions', {
      b: r`**Problem.** Bottles P and Q contain glucose and fructose solutions. Both give a red precipitate with Fehling’s solution. P decolourises bromine water; Q does not. Identify P and Q and write the equation for the positive test.

**Step 1.** Both are reducing sugars, so Fehling’s cannot separate them.

**Step 2.** Only an aldose is oxidised by bromine water: **P is glucose**, **Q is fructose**.

**Step 3.** $\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$`,
      v: table(['Bottle', 'Fehling’s', 'Bromine water', 'Sugar'], [['P', 'Red precipitate', 'Decolourised', 'Glucose'], ['Q', 'Red precipitate', 'Stays orange', 'Fructose']], 'Table of results for bottles P and Q and the sugar identified'),
      n: 'Both bottles give a red precipitate with Fehling’s solution, so that test alone cannot separate them. Bromine water oxidises only the aldehyde group, so the bottle that decolourises it, P, contains glucose, and Q contains fructose. The product from P is gluconic acid.',
    }),
    sl('check', 'Quick check: glucose or fructose?', {
      b: 'Choose the test or observation that distinguishes glucose from fructose.',
      n: 'Quick check. Remember which reagent attacks only aldehyde groups and is not alkaline.',
      chk: 'brwater-mcq',
    }),
    sl('concept', 'Sucrose', {
      b: 'Two monosaccharides join through a **glycosidic linkage**, C–O–C, formed from a hemiacetal –OH and an –OH of another sugar with loss of water. **Sucrose**, C₁₂H₂₂O₁₁: **α-D-glucopyranose (C1)** linked to **β-D-fructofuranose (C2)** — an **α1→β2** link joining the two anomeric carbons. No hemiacetal remains, so sucrose is **non-reducing** and shows no mutarotation. Hydrolysis (dilute acid or **invertase**) changes the rotation from +66.5° to about −20°: the product is **invert sugar**.',
      m: [r`\ce{C12H22O11 + H2O ->[invertase] C6H12O6 + C6H12O6}`],
      v: table(['Feature', 'Sucrose'], [['Units', 'α-D-Glucose + β-D-fructose'], ['Link', 'C1 (glucose) – C2 (fructose)'], ['Ring sizes', 'Pyranose + furanose'], ['Reducing?', 'No'], ['Rotation before / after hydrolysis', '+66.5° / about −20°']], 'Table of the units, link, ring sizes, reducing behaviour and rotation of sucrose'),
      n: 'Sugar units join through a glycosidic linkage, an oxygen bridge formed with loss of water. In sucrose, carbon one of alpha glucose is joined to carbon two of beta fructose, so both reducing carbons are used up. That is why cane sugar is non-reducing and shows no mutarotation. When it is hydrolysed, the rotation changes from positive to negative, so the product is called invert sugar.',
    }),
    sl('concept', 'Maltose and lactose', {
      b: '**Maltose** (malt sugar, from starch by the enzyme diastase): two **α-D-glucose** units, **C1 of one to C4 of the next** (α-1,4 link). **Lactose** (milk sugar): **β-D-galactose C1** linked to **C4 of D-glucose** (β-1,4 link). In both, the second unit keeps a free hemiacetal –OH at its C1, so both are **reducing** and show mutarotation.',
      m: [r`\ce{C12H22O11 + H2O ->[maltase] 2C6H12O6}`],
      v: table(['Disaccharide', 'Units', 'Link', 'Reducing?', 'Enzyme'], [['Sucrose', 'Glucose + fructose', 'α1 → β2', 'No', 'Invertase'], ['Maltose', 'Glucose + glucose', 'α1 → 4', 'Yes', 'Maltase'], ['Lactose', 'Galactose + glucose', 'β1 → 4', 'Yes', 'Lactase']], 'Table comparing sucrose, maltose and lactose by units, glycosidic link, reducing power and hydrolysing enzyme'),
      n: 'Maltose is formed when the enzyme diastase breaks down starch. It contains two alpha glucose units joined from carbon one of the first to carbon four of the second. Lactose, the sugar of milk, contains beta galactose joined from its carbon one to carbon four of glucose. In both, the second unit keeps a free hemiacetal group, so maltose and lactose are reducing sugars.',
    }),
    sl('example', 'Worked example: identifying a disaccharide', {
      b: r`**Problem.** A disaccharide Y reduces Tollens’ reagent. Enzymic hydrolysis gives only D-glucose, and the enzyme used acts only on α-glycosidic links. Identify Y and describe its link.

**Step 1.** Only glucose on hydrolysis: Y is maltose or a glucose–glucose disaccharide (not sucrose or lactose).

**Step 2.** Reducing: one anomeric carbon is free, so the link is C1 → C4, not C1 → C1.

**Step 3.** α-specific enzyme: the link is α.

**Answer.** Y is **maltose**, an α-1,4 glycosidic link between two D-glucose units.`,
      v: flow('LR', [['a', 'Only glucose formed'], ['b', 'Reducing: free C1'], ['c', 'α-specific enzyme'], ['d', 'Maltose (α-1,4)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow combining three observations to identify maltose'),
      n: 'Use each clue in turn. Getting only glucose rules out sucrose and lactose. Reducing Tollens’ reagent means one anomeric carbon is still free, so the link runs from carbon one to carbon four. An enzyme that cuts only alpha links shows the link is alpha. Together these identify maltose.',
    }),
    sl('check', 'Quick check: glycosidic links', {
      b: 'Identify the units or link in a disaccharide.',
      n: 'Quick check. Name the two units and the carbons joined, then decide whether a free anomeric carbon remains.',
      chk: 'linkage-mcq',
    }),
    sl('concept', 'Starch', {
      b: '**Starch**, (C₆H₁₀O₅)ₙ, is the energy store of plants: a mixture of **amylose** (15–20%; long **unbranched** chains of α-D-glucose with **α-1,4** links; soluble in hot water; deep **blue with iodine**) and **amylopectin** (80–85%; α-1,4 chains **branched by α-1,6 links** about every 20–25 units; insoluble; red-violet with iodine). Acid hydrolysis gives dextrins, then maltose, then glucose.',
      m: [r`\ce{(C6H10O5)_{n} + nH2O ->[H+] nC6H12O6}`],
      v: flow('LR', [['a', 'Starch'], ['b', 'Dextrins'], ['c', 'Maltose'], ['d', 'Glucose']], [['a', 'b', 'H⁺ or diastase'], ['b', 'c'], ['c', 'd', 'H⁺ or maltase']], 'Flow of the stepwise hydrolysis of starch through dextrins and maltose to glucose'),
      n: 'Starch is how plants store glucose. About a fifth is amylose, long unbranched chains of alpha glucose that give the deep blue colour with iodine. The rest is amylopectin, whose chains branch through carbon six roughly every twenty to twenty five units. Hydrolysis breaks starch down step by step into dextrins, then maltose, and finally glucose.',
    }),
    sl('concept', 'Cellulose and glycogen', {
      b: '**Cellulose**: unbranched chains of **β-D-glucose** joined by **β-1,4** links; neighbouring chains are held by many **hydrogen bonds** into strong fibres — the main material of plant cell walls (cotton is nearly pure cellulose). Humans lack the enzyme for β-links, so cellulose is dietary fibre; cattle digest it with the help of gut microbes. **Glycogen** (animal starch): α-D-glucose with α-1,4 chains and **α-1,6 branches about every 8–12 units**, more branched than amylopectin; stored in **liver and muscle** and quickly broken down to glucose.',
      v: table(['Property', 'Starch', 'Cellulose', 'Glycogen'], [['Unit', 'α-D-Glucose', 'β-D-Glucose', 'α-D-Glucose'], ['Links', 'α-1,4 (+ α-1,6)', 'β-1,4', 'α-1,4 + α-1,6'], ['Branching', 'None to moderate', 'None', 'High'], ['Role', 'Plant energy store', 'Plant structure', 'Animal energy store'], ['Digested by humans?', 'Yes', 'No', 'Yes']], 'Table comparing starch, cellulose and glycogen by unit, links, branching, role and digestibility'),
      n: 'Cellulose is also made of glucose, but beta glucose. Its straight chains lie side by side and hydrogen bond to one another, making tough fibres such as cotton. We have no enzyme for beta links, so cellulose passes through us as fibre, although cattle use gut microbes to digest it. Glycogen is the animal store, like amylopectin but even more branched, kept in the liver and muscles.',
    }),
    sl('example', 'Worked example: glucose from starch', {
      b: r`**Problem.** A mill hydrolyses $32.4\ \text{kg}$ of pure starch completely. What mass of glucose ($M = 180$) can be formed? (One chain unit, $\ce{C6H10O5}$, has $M = 162$.)

**Step 1.** Moles of units $= \dfrac{32400}{162} = 200\ \text{mol}$.

**Step 2.** Each unit gives one glucose: mass $= 200 \times 180 = 36000\ \text{g} = 36.0\ \text{kg}$.

The mass rises because each unit takes up one $\ce{H2O}$.`,
      v: table(['Quantity', 'Value'], [['Starch', '32.4 kg'], ['Moles of C₆H₁₀O₅ units', '200 mol'], ['Glucose formed', '36.0 kg']], 'Table of the starch mass, moles of chain units and mass of glucose formed'),
      n: 'Each unit in the starch chain has a mass of one hundred and sixty two. Thirty two point four kilograms is therefore two hundred moles of units, and each unit gains a water molecule to become a glucose molecule of mass one hundred and eighty. So the product weighs thirty six kilograms, more than the starch used.',
    }),
    sl('check', 'Quick check: starch, cellulose and glycogen', {
      b: 'Relate a property of a polysaccharide to its linkages or branching.',
      n: 'Quick check. Alpha links in starch and glycogen; beta links in cellulose.',
      chk: 'amylo-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Fructose: ketohexose, C=O at C2, furanose ring, D-(−); reducing; same osazone as glucose.',
        'Bromine water oxidises glucose (aldose) but not fructose (ketose).',
        'Sucrose: α-glucose C1 – β-fructose C2, non-reducing, gives invert sugar.',
        'Maltose: α-1,4 glucose–glucose; lactose: β-galactose C1 – glucose C4; both reducing.',
        'Starch (amylose + amylopectin, α-links), glycogen (highly branched), cellulose (β-1,4, fibres).',
      ],
      v: table(['Carbohydrate', 'Key link'], [['Sucrose', 'α1 → β2'], ['Maltose', 'α1 → 4'], ['Lactose', 'β1 → 4'], ['Cellulose', 'β1 → 4 (polymer)'], ['Amylopectin, glycogen', 'α1 → 4 and α1 → 6']], 'Summary table of key glycosidic links'),
      n: 'Let us sum up Part 2. Fructose is a ketose with a five-membered ring, told apart from glucose by bromine water. Sucrose joins both reducing carbons and so is non-reducing, while maltose and lactose keep a free one. Starch and glycogen use alpha links and are energy stores; cellulose uses beta links and forms strong fibres that we cannot digest.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For any disaccharide, name both units, the carbons joined and α or β.',
        'Explain reducing power by a free hemiacetal (anomeric) –OH.',
        'Use bromine water, not Fehling’s, to distinguish glucose and fructose.',
        'Cellulose differs from starch in the β-link, not in the monomer’s formula.',
      ],
      v: table(['Slip', 'Fix'], [['Fructose is non-reducing', 'It reduces Fehling’s'], ['Lactose is glucose + glucose', 'Galactose + glucose'], ['Cellulose has α-links', 'β-1,4 links']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Describe each disaccharide fully: the two units, which carbons are joined, and whether the link is alpha or beta. Explain reducing power by a free hemiacetal group. Use bromine water to tell glucose from fructose. And remember that starch and cellulose are both made of glucose; the difference lies in the type of link.',
    }),
  ],
});
