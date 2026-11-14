// ch24 Aromatic Hydrocarbons: Benzene — two decks. Part 1 (t01–t02): nomenclature, Kekulé structures, resonance, stability, aromaticity (Hückel),
// preparation and physical properties. Part 2 (t03–t05): electrophilic substitution with mechanisms, directive influence, oxidation, ozonolysis,
// addition, pyrolysis, hazards and uses.
import { sl, deck, table, chem, svgV } from './lib.mjs';
import { KEKULE, ORBITALS, ENERGY, MECH, HUB, DIRECT, ADDITION } from './svgs.mjs';

export const V = {
  kekule: svgV(KEKULE, 'Two Kekulé structures of benzene joined by a double-headed arrow, the resonance hybrid drawn with a circle, and a bar chart comparing the benzene carbon-carbon bond length 139 picometres with 154 and 134'),
  orbitals: svgV(ORBITALS, 'Side view of benzene showing six parallel p orbitals overlapping into two ring-shaped pi clouds above and below the plane of the ring'),
  energy: svgV(ENERGY, 'Enthalpy diagram: benzene releases 208 kilojoules per mole on hydrogenation instead of the 360 expected for three isolated double bonds, so it is 152 kilojoules per mole more stable'),
  mech: svgV(MECH, 'Mechanism of nitration of benzene: formation of the nitronium ion, slow attack of benzene on it to give the arenium ion with three resonance forms, and fast loss of a proton to give nitrobenzene'),
  hub: svgV(HUB, 'Benzene and its five electrophilic substitution products: chlorobenzene, nitrobenzene, benzenesulfonic acid, methylbenzene and phenylethanone, with reagents'),
  direct: svgV(DIRECT, 'Bar charts of the approximate isomer distribution on nitration of toluene, mainly ortho and para, and of nitrobenzene, mainly meta, with the statistical distribution marked'),
  addition: svgV(ADDITION, 'Benzene converted to cyclohexane with hydrogen and nickel, to hexachlorocyclohexane with chlorine in ultraviolet light, to glyoxal by ozonolysis, and to biphenyl by pyrolysis'),
};

// worked example 1 (deck 1): resonance energy of benzene and of cyclohexa-1,3-diene (computed once)
const dH = { ene: -120, diene: -232, benz: -208 };
const mn = (x) => String(x).replace('-', '−'); // typographic minus sign in printed numbers
const exTriene = 3 * dH.ene; // -360
const exRE = dH.benz - exTriene; // 152
const exDiene = 2 * dH.ene; // -240
const exREdiene = dH.diene - exDiene; // 8
// worked example 2 (deck 2): yield of nitrobenzene (computed once)
const mB = '11.7';
const yld = '70.0';
const nB = Number(mB) / 78; // 0.150
const mTh = nB * 123; // 18.45
const mAct = (mTh * Number(yld)) / 100; // 12.915
const mHNO3 = nB * 63; // 9.45

export const deck1 = deck({
  part: 1,
  title: 'Aromatic Hydrocarbons: Benzene — Part 1: Structure, aromaticity, preparation and properties',
  goals: [
    'Name benzene derivatives by the IUPAC system, using ortho, meta, para and numbering',
    'Describe the structure of benzene by Kekulé structures and resonance, and explain its stability with hydrogenation data',
    "Apply Hückel's rule to decide whether a ring is aromatic",
    'Prepare benzene from sodium benzoate and from phenol, and state its physical properties',
  ],
  slides: [
    sl('title', 'Benzene and the aromatic hydrocarbons', {
      b: '**Aromatic hydrocarbons (arenes)** contain a benzene ring or a ring with similar properties. **Benzene, C₆H₆**, is the parent. It is a planar, cyclic molecule with a **delocalised π system**, so it behaves very differently from the alkenes it seems to resemble: it prefers **substitution** to addition.',
      v: table(['Arene', 'Formula', 'Structure in words'], [['Benzene', 'C₆H₆', 'Six-carbon ring, one H on each carbon'], ['Methylbenzene (toluene)', 'C₇H₈', 'Benzene with one CH₃'], ['Dimethylbenzenes (xylenes)', 'C₈H₁₀', 'Benzene with two CH₃'], ['Naphthalene', 'C₁₀H₈', 'Two fused benzene rings']], 'Table of four aromatic hydrocarbons with formula and a description of the structure'),
      n: 'Welcome to the chapter on benzene. Aromatic hydrocarbons contain a benzene ring or a ring that behaves in the same way. Benzene is the parent compound. It is a flat ring of six carbon atoms with a delocalised system of pi electrons. This makes it very different from the alkenes: it prefers substitution to addition. In this part we study its naming, structure, aromaticity, preparation and physical properties.',
    }),
    sl('concept', 'Naming monosubstituted benzenes', {
      b: 'Most monosubstituted compounds are named **substituent + benzene**: chlorobenzene, nitrobenzene, ethylbenzene. Some keep **parent names** that include the group: **phenol** (–OH), **aniline** (aminobenzene, –NH₂), **benzoic acid** (–COOH), **benzaldehyde** (–CHO), **toluene** (methylbenzene) and **styrene** (ethenylbenzene). **C₆H₅–** is the **phenyl** group; **C₆H₅CH₂–** is **benzyl**.',
      v: table(['Structure', 'IUPAC name', 'Common name'], [['C₆H₅CH₃', 'Methylbenzene', 'Toluene'], ['C₆H₅OH', 'Phenol (hydroxybenzene)', 'Phenol'], ['C₆H₅NH₂', 'Aminobenzene (benzenamine)', 'Aniline'], ['C₆H₅COOH', 'Benzoic acid', 'Benzoic acid'], ['C₆H₅CH=CH₂', 'Ethenylbenzene', 'Styrene'], ['C₆H₅NO₂', 'Nitrobenzene', 'Nitrobenzene']], 'Table of six monosubstituted benzenes with structural formula, IUPAC name and common name'),
      n: 'A simple derivative is named by writing the substituent followed by benzene, as in chlorobenzene or nitrobenzene. Some compounds keep special names that include the functional group. Hydroxybenzene is phenol, aminobenzene is aniline, and the benzene ring carrying a carboxylic acid group is benzoic acid. The group made of a benzene ring minus one hydrogen is called phenyl, and the group with an extra methylene is called benzyl.',
    }),
    sl('concept', 'Ortho, meta, para and numbering', {
      b: 'Two groups on a ring are **1,2 (ortho, o-)**, **1,3 (meta, m-)** or **1,4 (para, p-)**. With three or more substituents, **number** the ring to give the **lowest locants**; cite substituents **alphabetically**. If the ring carries a group that gives a parent name (phenol, benzoic acid, aniline), that carbon is **C-1**.',
      v: table(['Structure', 'IUPAC name'], [['Two CH₃ groups on adjacent carbons', '1,2-Dimethylbenzene (o-xylene)'], ['CH₃ and NO₂ on carbons 1 and 4', '1-Methyl-4-nitrobenzene (p-nitrotoluene)'], ['Br and NO₂ on carbons 1 and 3', '1-Bromo-3-nitrobenzene'], ['OH at C-1, three NO₂ at 2, 4, 6', '2,4,6-Trinitrophenol (picric acid)'], ['COOH at C-1, Br at C-2, NO₂ at C-4', '2-Bromo-4-nitrobenzoic acid'], ['Three CH₃ on carbons 1, 3, 5', '1,3,5-Trimethylbenzene']], 'Table of six substituted benzenes described by position of groups with their IUPAC names'),
      n: 'When there are two substituents, the positions one and two are called ortho, one and three are meta, and one and four are para. With three or more groups, number the ring so that the locants are as low as possible and cite the substituents in alphabetical order. If one group gives a parent name, such as phenol or benzoic acid, that carbon is number one and the other groups are numbered from it.',
    }),
    sl('diagram', 'Structure of benzene: Kekulé structures and resonance', {
      b: 'Kekulé proposed a six-membered ring with **alternating single and double bonds**. Two such structures exist, differing only in the **positions of the double bonds**. Neither is correct alone: benzene is a **resonance hybrid** of both. All six C–C bonds are **equal (139 pm)**, between C–C (154 pm) and C=C (134 pm), and the ring is a **regular planar hexagon** (all angles 120°).',
      v: V.kekule,
      n: 'Kekulé suggested a ring of six carbons with alternate single and double bonds. Two such structures can be drawn, differing only in where the double bonds are placed. Neither alone describes benzene. The real molecule is a resonance hybrid of the two. All six carbon carbon bonds are identical, with a length between that of a single and a double bond, and the ring is a flat regular hexagon with all bond angles one hundred and twenty degrees.',
    }),
    sl('diagram', 'The delocalised π cloud of benzene', {
      b: 'Each carbon is **sp² hybridised**: three σ bonds (two C–C, one C–H) in one plane, and one **p orbital perpendicular to the ring**. The six p orbitals overlap sideways all round the ring, so the **six π electrons are delocalised** in two ring-shaped clouds above and below the plane. Benzene has **12 σ bonds** and six delocalised π electrons.',
      v: V.orbitals,
      n: 'In the orbital picture, each carbon is sp two hybridised. Three hybrid orbitals form sigma bonds in the plane of the ring. The fourth orbital, a p orbital, stands at right angles to the ring. The six p orbitals overlap sideways all the way round, so the six pi electrons are not held between particular pairs of carbons but are delocalised in two ring shaped clouds, one above and one below the plane of the ring.',
    }),
    sl('check', 'Quick check: why resonance?', {
      b: 'Link each observation to the delocalised structure.',
      n: 'Quick check. Decide which observation about benzene is explained by resonance between the two Kekulé structures.',
      chk: 'kekule-mcq',
    }),
    sl('concept', 'Evidence for the structure and stability of benzene', {
      b: 'A single Kekulé triene would behave like an alkene with three isolated C=C bonds. Benzene does not: it **does not decolourise bromine water** or acidified KMnO₄ under ordinary conditions, gives **only one** monosubstituted product and **only one** 1,2-disubstituted product, has **equal C–C lengths**, and is **far more stable** than the triene (its hydrogenation is much less exothermic).',
      v: table(['Observation', 'Expected for an isolated triene', 'Found for benzene'], [['Bromine water', 'Decolourised (addition)', 'No reaction'], ['C₆H₅Br isomers', '1', '1'], ['C₆H₄Br₂ (1,2-dibromo) isomers', '2', '1'], ['C–C bond lengths', '154 and 134 pm alternating', 'All 139 pm'], ['Enthalpy of hydrogenation', '−360 kJ mol⁻¹', '−208 kJ mol⁻¹']], 'Table comparing five observations for an isolated triene with those found for benzene'),
      n: 'If benzene were a simple triene it would behave like an alkene with three isolated double bonds, but it does not. It does not decolourise bromine water or permanganate under ordinary conditions. It gives only one monosubstituted product and only one product with two neighbouring substituents. All its carbon carbon bonds are equal in length. And it is far more stable than expected, as its heat of hydrogenation shows.',
    }),
    sl('diagram', 'Resonance energy from hydrogenation data', {
      b: 'Hydrogenating **cyclohexene** releases **120 kJ mol⁻¹**. A hypothetical cyclohexa-1,3,5-triene would release 3 × 120 = **360 kJ mol⁻¹**, but benzene releases only **208 kJ mol⁻¹**. Benzene is therefore **152 kJ mol⁻¹ more stable** than the triene: the **resonance (delocalisation) energy, about 150 kJ mol⁻¹**.',
      v: V.energy,
      n: 'The extra stability of benzene can be measured. Hydrogenation of cyclohexene releases one hundred and twenty kilojoules per mole. A triene with three separate double bonds should therefore release three hundred and sixty. Benzene releases only two hundred and eight. The difference, one hundred and fifty two kilojoules per mole, is the resonance energy. It is the extra stability that comes from delocalisation of the pi electrons.',
    }),
    sl('example', 'Worked example: resonance energy', {
      b: `**Problem.** The enthalpies of hydrogenation to cyclohexane are: cyclohexene ${mn(dH.ene)} kJ mol⁻¹, cyclohexa-1,3-diene ${mn(dH.diene)} kJ mol⁻¹ and benzene ${mn(dH.benz)} kJ mol⁻¹. Find the stabilisation of each of the last two relative to isolated C=C bonds.\n\n**Solution.** Benzene: expected 3 × (${mn(dH.ene)}) = ${mn(exTriene)}; observed ${mn(dH.benz)}; stabilisation = ${mn(dH.benz)} − (${mn(exTriene)}) = **${mn(exRE)} kJ mol⁻¹**. Cyclohexa-1,3-diene: expected 2 × (${mn(dH.ene)}) = ${mn(exDiene)}; observed ${mn(dH.diene)}; stabilisation = ${mn(dH.diene)} − (${mn(exDiene)}) = **${mn(exREdiene)} kJ mol⁻¹**. Delocalisation over a ring of six π electrons is far more stabilising than over a simple conjugated diene.`,
      v: table(['Compound', 'Expected (kJ mol⁻¹)', 'Observed (kJ mol⁻¹)', 'Stabilisation (kJ mol⁻¹)'], [['Cyclohexa-1,3-diene', mn(exDiene), mn(dH.diene), mn(exREdiene)], ['Benzene', mn(exTriene), mn(dH.benz), mn(exRE)]], 'Table of expected and observed enthalpies of hydrogenation and the stabilisation of cyclohexa-1,3-diene and benzene'),
      n: 'For each compound, multiply the cyclohexene value by the number of double bonds to get the expected heat release, then subtract it from the observed value. For the diene the difference is small, only a few kilojoules per mole. For benzene it is one hundred and fifty two. So the extra stability of benzene is not just the effect of two double bonds being conjugated, but the special stability of the closed ring of six delocalised electrons.',
    }),
    sl('concept', "Aromaticity and Hückel's rule", {
      b: "A compound is **aromatic** if its ring is **planar, cyclic, fully conjugated** (a continuous ring of p orbitals) and has **(4n + 2) π electrons** (n = 0, 1, 2, …): 2, 6, 10, … (**Hückel's rule**). With **4n** π electrons a planar ring is **antiaromatic** and unstable. Non-planar rings such as cyclooctatetraene are not aromatic.",
      v: table(['Species', 'π electrons', 'Planar, conjugated?', 'Verdict'], [['Benzene', '6', 'Yes', 'Aromatic (n = 1)'], ['Naphthalene', '10', 'Yes', 'Aromatic (n = 2)'], ['Cyclobutadiene', '4', 'Yes', 'Antiaromatic (4n)'], ['Cyclooctatetraene', '8', 'No (tub-shaped)', 'Not aromatic'], ['Cyclopentadienyl anion', '6', 'Yes', 'Aromatic'], ['Cyclohexene', '2 (isolated)', 'No conjugated ring', 'Not aromatic']], 'Table applying Hückel rule to six ring compounds with pi electron count, planarity and verdict'),
      n: 'Aromatic compounds follow Hückel rule. The ring must be flat, cyclic and fully conjugated, with a continuous ring of p orbitals, and it must contain four n plus two pi electrons, where n is zero or a whole number. Benzene has six and naphthalene has ten. A flat ring with four n electrons, such as cyclobutadiene, is antiaromatic and unstable. Cyclooctatetraene is tub shaped, so it is not conjugated all round and is not aromatic.',
    }),
    sl('example', "Worked example: using Hückel's rule", {
      b: '**Problem.** Decide whether (a) the cyclopentadienyl cation C₅H₅⁺, (b) the cyclopentadienyl anion C₅H₅⁻ and (c) the tropylium cation C₇H₇⁺ are aromatic, if each is planar with a ring of p orbitals.\n\n**Solution.** Count the π electrons. (a) Four sp² carbons each give one π electron, and the fifth, a carbocation, gives none, so **4** π electrons: this is 4n (n = 1), **antiaromatic**. (b) The extra negative charge adds a pair: 4 + 2 = **6** π electrons = 4n + 2 (n = 1): **aromatic**. (c) Seven carbons with a + charge: 7 − 1 = **6** π electrons: **aromatic**.',
      v: table(['Species', 'Ring carbons', 'π electrons', 'Verdict'], [['C₅H₅⁺', '5', '4', 'Antiaromatic'], ['C₅H₅⁻', '5', '6', 'Aromatic'], ['C₇H₇⁺', '7', '6', 'Aromatic']], 'Table of three ring ions with ring size, pi electron count and verdict'),
      n: 'Count the pi electrons in each ring. The cyclopentadienyl cation has four, which fits four n and makes it antiaromatic. The anion has gained an electron pair, giving six, which fits four n plus two with n equal to one, so it is aromatic. The tropylium cation has seven ring carbons but one of them has no electron because of the positive charge, so there are six pi electrons and the ion is aromatic.',
    }),
    sl('check', "Quick check: Hückel's rule", {
      b: 'Count the π electrons and check planarity.',
      n: 'Quick check. For each ring, count the pi electrons and check that the ring is planar and fully conjugated.',
      chk: 'huckel-mcq',
    }),
    sl('concept', 'Physical properties of benzene', {
      b: 'Benzene is a **colourless, mobile liquid** with a characteristic smell, **insoluble in water** (it floats, density 0.879 g mL⁻¹) but miscible with organic solvents; it is itself a good solvent. It is non-polar (zero dipole moment). It burns with a **sooty flame** (92.3% carbon). Its **high melting point** (5.5 °C) compared with methylbenzene (−95 °C) reflects its **symmetry**, which allows close packing in the crystal; likewise p-xylene melts higher than o- and m-xylene.',
      v: table(['Compound', 'Melting point (°C)', 'Boiling point (°C)', 'Remark'], [['Benzene', '5.5', '80.1', 'Symmetrical'], ['Methylbenzene', '−95', '110.6', 'Less symmetrical'], ['Cyclohexane', '6.5', '80.7', 'Similar boiling point'], ['p-Xylene', '13', '138', 'Highest mp of the xylenes'], ['o-Xylene', '−25', '144', ''], ['m-Xylene', '−48', '139', '']], 'Table of melting and boiling points of benzene, methylbenzene, cyclohexane and the three xylenes'),
      n: 'Benzene is a colourless liquid with a characteristic smell. It does not mix with water and floats on it, but it mixes with organic solvents and is itself a good solvent. It is non polar. It burns with a sooty flame because of its high carbon content. Its melting point is much higher than that of methylbenzene because the symmetrical molecules pack closely in the crystal. In the same way, para xylene melts higher than its ortho and meta isomers.',
    }),
    sl('concept', 'Preparation of benzene', {
      b: '**From sodium benzoate:** heating with **soda lime** (NaOH + CaO) removes the carboxyl group (**decarboxylation**): $\\ce{C6H5COONa + NaOH -> C6H6 + Na2CO3}$. **From phenol:** phenol vapour is passed over **heated zinc dust**, which removes the oxygen as zinc oxide: $\\ce{C6H5OH + Zn -> C6H6 + ZnO}$. (Benzene is also formed by passing ethyne through a red-hot iron tube.)',
      v: chem('C6H5COONa + NaOH ->[CaO][heat] C6H6 + Na2CO3', 'Heating sodium benzoate with soda lime gives benzene and sodium carbonate', 'Decarboxylation of sodium benzoate'),
      n: 'Benzene can be prepared in the laboratory in two ways. Sodium benzoate is heated with soda lime, a mixture of sodium hydroxide and calcium oxide. The carboxylate group is lost as carbonate, which is called decarboxylation. Alternatively, phenol vapour is passed over heated zinc dust. The zinc removes the oxygen as zinc oxide, and benzene is formed. Benzene is also obtained from ethyne in a red hot iron tube.',
    }),
    sl('check', 'Quick check: preparing benzene', {
      b: 'Match the starting material to the reagent.',
      n: 'Quick check. Decide which starting material and reagent give benzene directly.',
      chk: 'prep-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Names: substituent + benzene; phenol, aniline, benzoic acid; ortho, meta, para and lowest locants.',
        'Structure: two Kekulé structures; resonance hybrid; planar hexagon, all C–C 139 pm; six delocalised π electrons.',
        'Stability: hydrogenation −208 kJ mol⁻¹ against −360 expected; resonance energy about 150 kJ mol⁻¹.',
        "Aromatic: planar, cyclic, conjugated, (4n + 2) π electrons (Hückel).",
        'Preparation: sodium benzoate + soda lime; phenol vapour over zinc dust. Insoluble in water; symmetrical, so a high melting point.',
      ],
      v: table(['Feature', 'Benzene'], [['Hybridisation', 'sp² (all six carbons)'], ['σ and π', '12 σ; 6 delocalised π electrons'], ['C–C length', '139 pm (all equal)'], ['Resonance energy', 'About 150 kJ mol⁻¹'], ['Preparation', 'Soda lime on sodium benzoate; Zn on phenol']], 'Summary table of structural features and preparations of benzene'),
      n: 'To sum up Part one. Benzene derivatives are named with ortho, meta, para or lowest locants. Benzene is a resonance hybrid of two Kekulé structures, a flat hexagon with six delocalised pi electrons and equal carbon carbon bonds of one hundred and thirty nine picometres. Its resonance energy is about one hundred and fifty kilojoules per mole. A ring is aromatic if it is flat, conjugated and has four n plus two pi electrons. Benzene is prepared from sodium benzoate or phenol.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Do not describe benzene as a ring with alternating single and double bonds that interconvert; it is one hybrid structure.',
        "In Hückel's rule, count π electrons (not carbons) and state that the ring is planar and conjugated.",
        'Calculate resonance energy as observed minus expected, with the sign and unit.',
        'Write the conditions with each preparation: soda lime, heat; zinc dust, heat.',
      ],
      v: table(['Slip', 'Fix'], [['Benzene has three C=C and three C–C bonds', 'All six bonds are equal (139 pm)'], ['4n + 2 refers to the number of carbons', 'It refers to π electrons'], ['Resonance energy is the heat of hydrogenation', 'It is the difference from the expected value']], 'Table of three common slips about benzene with corrections'),
      n: 'Tips for the exam. Do not describe benzene as having alternating single and double bonds that swap places, because the real structure is one resonance hybrid. In Hückel rule, count pi electrons, and say that the ring is flat and fully conjugated. Calculate resonance energy as the observed value minus the expected value, with the sign and the unit. And give the reagent and condition with each preparation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Aromatic Hydrocarbons: Benzene — Part 2: Reactions, directive effects and hazards',
  goals: [
    'Write the mechanism of electrophilic substitution, using the nitration of benzene as the model',
    'Write the conditions and equations for halogenation, nitration, sulphonation and Friedel–Crafts alkylation and acylation',
    'Predict the position of the second substituent from the directive influence of the first',
    'Write the addition, oxidation, ozonolysis and pyrolysis reactions of benzene and state its hazards',
  ],
  slides: [
    sl('title', 'Why benzene undergoes substitution', {
      b: 'Addition would destroy the **delocalised π system** and lose about **150 kJ mol⁻¹** of resonance energy, whereas **substitution keeps the ring intact**. The π cloud also attracts **electrophiles**, so the typical reaction of benzene is **electrophilic substitution**: an H is replaced by an electrophile E⁺.',
      v: table(['Reagent', 'Cyclohexene (an alkene)', 'Benzene'], [['Bromine water', 'Decolourised at once (addition)', 'No reaction'], ['Br₂ with FeBr₃ catalyst', 'Addition', 'Substitution: bromobenzene + HBr'], ['Cold dilute KMnO₄', 'Decolourised (diol)', 'No reaction'], ['Conc. HNO₃ + conc. H₂SO₄', 'Oxidised / complex mixture', 'Nitrobenzene']], 'Table comparing the reactions of cyclohexene and benzene with four reagents'),
      n: 'Addition would destroy the delocalised pi system and lose the resonance energy of about one hundred and fifty kilojoules per mole. Substitution keeps the ring intact, so it is the typical reaction of benzene. The pi cloud above and below the ring attracts electron seeking species, called electrophiles, so the usual reaction is electrophilic substitution, in which a hydrogen is replaced by an electrophile.',
    }),
    sl('diagram', 'Mechanism of electrophilic substitution: nitration', {
      b: 'Conc. HNO₃ + conc. H₂SO₄ (323–333 K) makes the **nitronium ion NO₂⁺**: $\\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$. **Step 1 (slow):** the π electrons attack NO₂⁺, forming the **arenium ion (σ complex)**, a resonance-stabilised carbocation with the + shared by C-2, C-4, C-6. **Step 2 (fast):** loss of H⁺ restores the aromatic ring, giving **nitrobenzene**. Every electrophilic substitution follows this two-step pattern.',
      v: V.mech,
      n: 'Here is the mechanism of nitration. Concentrated nitric acid and concentrated sulphuric acid form the nitronium ion, the electrophile. In the slow first step, the pi electrons of benzene attack the nitronium ion, forming the arenium ion, a carbocation whose positive charge is spread over three carbons by resonance. In the fast second step, a proton is lost from the carbon that bears the nitro group, the ring becomes aromatic again, and nitrobenzene is formed.',
    }),
    sl('concept', 'Halogenation and sulphonation', {
      b: '**Halogenation:** Cl₂ or Br₂ with a Lewis acid (**FeCl₃ or FeBr₃**, or iron), in the dark, gives **chlorobenzene** or **bromobenzene**: $\\ce{C6H6 + Cl2 ->[FeCl3] C6H5Cl + HCl}$; the catalyst polarises the halogen to make the electrophile. **Sulphonation:** conc. H₂SO₄ or **oleum** (electrophile **SO₃**) gives **benzenesulphonic acid**: $\\ce{C6H6 + H2SO4 -> C6H5SO3H + H2O}$. Sulphonation is **reversible**: heating with dilute acid or steam removes the –SO₃H group.',
      v: table(['Reaction', 'Reagent and conditions', 'Electrophile', 'Product'], [['Chlorination', 'Cl₂, FeCl₃, dark', 'Cl⁺ (polarised Cl–Cl···FeCl₃)', 'Chlorobenzene'], ['Bromination', 'Br₂, FeBr₃, dark', 'Br⁺ (polarised)', 'Bromobenzene'], ['Sulphonation', 'Conc. H₂SO₄ or oleum, heat', 'SO₃', 'Benzenesulphonic acid']], 'Table of halogenation and sulphonation of benzene with reagents, electrophile and product'),
      n: 'In halogenation, chlorine or bromine reacts with benzene in the presence of an iron halide catalyst, in the dark, and chlorobenzene or bromobenzene is formed. The catalyst polarises the halogen molecule to make the electrophile. Sulphonation uses concentrated sulphuric acid or oleum, and the electrophile is sulphur trioxide. The product is benzenesulphonic acid. Sulphonation is reversible, so the sulphonic acid group can be removed again by heating with dilute acid or steam.',
    }),
    sl('concept', 'Friedel–Crafts alkylation and acylation', {
      b: '**Alkylation:** an alkyl halide with **anhydrous AlCl₃** gives an alkylbenzene, e.g. $\\ce{C6H6 + CH3Cl ->[AlCl3] C6H5CH3 + HCl}$; the electrophile is a **carbocation** (R⁺). Limits: **polyalkylation** (the alkyl group activates the ring) and **rearrangement** of the carbocation. **Acylation:** an acyl chloride with AlCl₃ gives a **ketone**: $\\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$ (phenylethanone); the electrophile is the **acylium ion CH₃CO⁺**, and the product is deactivated, so **no further acylation** occurs.',
      v: chem('C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl', 'Friedel-Crafts acylation: benzene with ethanoyl chloride and anhydrous aluminium chloride gives phenylethanone and hydrogen chloride', 'Friedel–Crafts acylation'),
      n: 'In Friedel Crafts alkylation, benzene reacts with an alkyl halide in the presence of anhydrous aluminium chloride, and the electrophile is a carbocation. The alkyl group activates the ring, so more than one alkyl group may enter, and the carbocation may rearrange. In Friedel Crafts acylation, an acid chloride with aluminium chloride gives a ketone through the acylium ion. The ketone group deactivates the ring, so the reaction stops after one substitution.',
    }),
    sl('diagram', 'The five electrophilic substitutions at a glance', {
      b: 'In each case the ring keeps its **six π electrons** and one **H is replaced** by the electrophile. Memorise the **reagent and the electrophile**: Cl⁺ (Cl₂/FeCl₃), **NO₂⁺**, **SO₃**, **R⁺** and **RCO⁺** (with AlCl₃). Friedel–Crafts reactions need **anhydrous** conditions because AlCl₃ reacts with water.',
      v: V.hub,
      n: 'This diagram collects the five substitutions. In each, the ring keeps its six pi electrons and one hydrogen is replaced. Halogenation uses a halogen and an iron halide, nitration uses concentrated nitric and sulphuric acids, sulphonation uses concentrated sulphuric acid or oleum, and the two Friedel Crafts reactions use an alkyl halide or an acid chloride with anhydrous aluminium chloride. These conditions must be dry, because aluminium chloride reacts with water.',
    }),
    sl('check', 'Quick check: the electrophile in nitration', {
      b: 'Identify the species that attacks the ring.',
      n: 'Quick check. Identify the electrophile formed from concentrated nitric acid and concentrated sulphuric acid.',
      chk: 'eas-mcq',
    }),
    sl('example', 'Worked example: yield of nitrobenzene', {
      b: `**Problem.** ${mB} g of benzene is nitrated with excess mixed acid and the yield of nitrobenzene is ${yld}%. Find the mass of nitrobenzene obtained and the minimum mass of HNO₃ needed. (C = 12, H = 1, N = 14, O = 16)\n\n**Solution.** $\\ce{C6H6 + HNO3 -> C6H5NO2 + H2O}$, 1 : 1 : 1. n(C₆H₆) = ${mB} ÷ 78 = ${nB.toFixed(3)} mol. Theoretical mass of C₆H₅NO₂ = ${nB.toFixed(3)} × 123 = ${mTh.toFixed(2)} g; at ${yld}% yield: ${mTh.toFixed(2)} × ${yld}/100 = **${mAct.toFixed(1)} g**. Minimum HNO₃ = ${nB.toFixed(3)} × 63 = **${mHNO3.toFixed(2)} g**.`,
      v: table(['Quantity', 'Value'], [['n(benzene)', `${nB.toFixed(3)} mol`], ['Theoretical mass of nitrobenzene', `${mTh.toFixed(2)} g`], [`Actual mass at ${yld}% yield`, `${mAct.toFixed(1)} g`], ['Minimum mass of HNO₃', `${mHNO3.toFixed(2)} g`]], 'Table of moles of benzene, theoretical and actual mass of nitrobenzene and minimum mass of nitric acid'),
      n: 'Write the balanced equation first. One mole of benzene gives one mole of nitrobenzene and needs one mole of nitric acid. The molar mass of benzene is seventy eight, so the sample is point one five zero mole. Multiplying by the molar mass of nitrobenzene gives the theoretical mass. The actual mass is that figure multiplied by the percentage yield. The minimum mass of nitric acid is the moles multiplied by sixty three.',
    }),
    sl('concept', 'Directive influence of substituents', {
      b: 'A group already on the ring decides **where** the next electrophile enters and **how fast**. **Ortho/para directors** (and activating) donate electrons: **–OH, –NH₂, –OCH₃, –CH₃ and other alkyl groups**. The **halogens** are ortho/para directing but **deactivating**. **Meta directors** (deactivating) withdraw electrons: **–NO₂, –CN, –COOH, –CHO, –COR, –SO₃H**. Ease of substitution: phenol > methylbenzene > benzene > nitrobenzene.',
      v: table(['Group', 'Electronic effect', 'Directs to', 'Ring reactivity'], [['–OH, –NH₂', '+M (strong), −I', 'ortho, para', 'Strongly activated'], ['–CH₃, –C₂H₅', '+I, hyperconjugation', 'ortho, para', 'Activated'], ['–Cl, –Br', '−I > +M', 'ortho, para', 'Deactivated'], ['–NO₂, –CN', '−I, −M', 'meta', 'Strongly deactivated'], ['–COOH, –CHO', '−I, −M', 'meta', 'Deactivated']], 'Table of substituents with electronic effect, directing position and effect on ring reactivity'),
      n: 'A group already on the ring controls where the next substituent goes and how fast the reaction is. Groups that donate electrons, such as hydroxyl, amino and alkyl groups, direct to the ortho and para positions and make the ring more reactive. Halogens direct ortho and para but make the ring less reactive. Groups that withdraw electrons, such as nitro, cyano, carboxyl and carbonyl groups, direct to the meta position and make the ring less reactive.',
    }),
    sl('diagram', 'Why? Resonance and product distribution', {
      b: '**Donor group (CH₃, OH):** for **ortho/para** attack, one resonance form of the arenium ion puts the + **on the carbon bearing the donor**, which stabilises it. **Withdrawing group (NO₂):** for ortho/para attack, that form puts the + **next to the electron-poor N⁺**, which is very unfavourable; **meta** attack avoids it, so meta is the least bad (and the ring is deactivated overall). Experimentally: toluene gives about **58% o, 4% m, 38% p**; nitrobenzene gives about **93% m**.',
      v: V.direct,
      n: 'To explain the directive effect, look at the arenium ion. With a donor group such as methyl, attack at the ortho or para position gives a resonance form in which the positive charge sits on the carbon carrying the donor, which stabilises it. With a withdrawing group such as nitro, the same attack puts the positive charge next to the electron poor nitrogen, which is very unfavourable, so meta attack, which avoids this, is preferred. The product ratios confirm it.',
    }),
    sl('example', 'Worked example: predicting the products', {
      b: '**Problem.** Give the main products when (a) methylbenzene is brominated with Br₂/FeBr₃ and (b) nitrobenzene is brominated under the same conditions. Which reacts faster than benzene?\n\n**Solution.** (a) –CH₃ is an **ortho/para director and activating**: the products are **2-bromo-1-methylbenzene (o-bromotoluene) and 4-bromo-1-methylbenzene (p-bromotoluene)**; the reaction is **faster than** with benzene. (b) –NO₂ is a **meta director and deactivating**: the product is **1-bromo-3-nitrobenzene**; the reaction is **slower than** with benzene and needs more vigorous conditions.',
      v: table(['Substrate', 'Directing effect', 'Main product(s)', 'Rate relative to benzene'], [['Methylbenzene', 'ortho, para; activating', '2- and 4-bromomethylbenzene', 'Faster'], ['Nitrobenzene', 'meta; deactivating', '1-Bromo-3-nitrobenzene', 'Slower']], 'Table of the bromination of methylbenzene and nitrobenzene with directing effect, main products and rate relative to benzene'),
      n: 'First classify the group already on the ring. Methyl donates electrons, so it directs ortho and para and makes the ring more reactive than benzene. The products of bromination are the ortho and para bromomethylbenzenes. The nitro group withdraws electrons, so it directs meta and makes the ring less reactive, and the product is one bromo three nitrobenzene, formed more slowly and under harsher conditions.',
    }),
    sl('check', 'Quick check: the directing effect', {
      b: 'Decide whether the group donates or withdraws electrons.',
      n: 'Quick check. Decide whether the group on the ring donates or withdraws electrons, and which positions it directs to.',
      chk: 'direct-mcq',
    }),
    sl('concept', 'Oxidation and ozonolysis of benzene', {
      b: 'The ring resists oxidants: benzene does **not decolourise KMnO₄**. It **burns** with a sooty flame: $\\ce{2C6H6 + 15O2 -> 12CO2 + 6H2O}$. Vapour mixed with air over **V₂O₅ at about 773 K** gives **maleic anhydride** (the ring breaks). **Ozonolysis:** benzene adds three O₃ to give a triozonide, which on reduction with Zn and water gives **three molecules of glyoxal** (OHC–CHO): $\\ce{C6H6 + 3O3 -> C6H6O9}$, then $\\ce{C6H6O9 + 3Zn + 3H2O -> 3OHCCHO + 3Zn(OH)2}$.',
      v: table(['Reagent', 'Result with benzene', 'Compare with cyclohexene'], [['Hot or cold KMnO₄', 'No change (ring resists)', 'Decolourised'], ['O₂ (excess), burning', '12 CO₂ + 6 H₂O; sooty flame', 'Burns, less soot'], ['O₂, V₂O₅, 773 K', 'Maleic anhydride', '–'], ['O₃ then Zn, H₂O', 'Three glyoxal (OHC–CHO)', 'Hexanedial']], 'Table of the oxidation and ozonolysis products of benzene compared with cyclohexene'),
      n: 'The benzene ring resists oxidation, and it does not decolourise potassium permanganate. It burns in air with a sooty flame to give carbon dioxide and water. Vapour passed with air over vanadium pentoxide at about seven hundred and seventy three kelvin is oxidised to maleic anhydride. With ozone, benzene forms a triozonide, and reduction with zinc and water gives three molecules of glyoxal, the dialdehyde ethanedial.',
    }),
    sl('diagram', 'Addition and pyrolysis', {
      b: 'Only under forcing conditions does benzene add reagents. **H₂/Ni, 473 K** gives **cyclohexane**: $\\ce{C6H6 + 3H2 -> C6H12}$. **Cl₂ in UV light or sunlight (no catalyst)** adds three Cl₂, giving **benzene hexachloride (BHC, hexachlorocyclohexane)** $\\ce{C6H6 + 3Cl2 -> C6H6Cl6}$; Br₂ with UV gives C₆H₆Br₆. **Pyrolysis** (benzene vapour through a red-hot tube) gives **biphenyl**: $\\ce{2C6H6 -> C12H10 + H2}$.',
      v: V.addition,
      n: 'Benzene adds reagents only under forcing conditions. With hydrogen and nickel at four hundred and seventy three kelvin it forms cyclohexane. With chlorine in ultraviolet light and no catalyst, three molecules of chlorine add, giving benzene hexachloride, also called hexachlorocyclohexane. Bromine behaves in the same way. When benzene vapour is passed through a red hot tube, two molecules join with loss of hydrogen, and biphenyl is formed.',
    }),
    sl('concept', 'Hazards, precautions and uses', {
      b: 'Benzene is **toxic and carcinogenic**: long exposure damages the **bone marrow** and causes **leukaemia**; vapour causes dizziness and headache, and it passes through the skin. It is also **highly flammable**. **Precautions:** work in a fume cupboard, wear gloves, avoid skin contact and inhalation, and replace it with less harmful solvents such as **methylbenzene** where possible. **Uses:** solvent; manufacture of **styrene, phenol, aniline**, cyclohexane (for nylon), detergents (alkylbenzenes), dyes and drugs; BHC insecticide.',
      v: table(['Aspect', 'Details'], [['Health hazards', 'Carcinogenic (leukaemia), bone-marrow damage, headache, dizziness, skin absorption'], ['Fire hazard', 'Highly flammable, vapour forms explosive mixtures with air'], ['Precautions', 'Fume cupboard, gloves, ventilation, substitute methylbenzene'], ['Uses', 'Solvent; raw material for styrene, phenol, aniline, dyes, detergents']], 'Table of the hazards, precautions and uses of benzene'),
      n: 'Benzene is toxic and carcinogenic. Long exposure damages the bone marrow and can cause leukaemia, and short exposure causes dizziness and headache. The liquid is absorbed through the skin and the vapour is highly flammable. It must be handled in a fume cupboard with gloves, and a less harmful solvent such as methylbenzene should be used where possible. Benzene is a raw material for styrene, phenol, aniline, dyes and detergents.',
    }),
    sl('check', 'Quick check: hazards of benzene', {
      b: 'Recall the long-term health effect of benzene vapour.',
      n: 'Quick check. Recall the main long term health effect of breathing benzene vapour.',
      chk: 'hazard-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Electrophilic substitution: slow attack of π electrons on E⁺ gives the arenium ion; fast loss of H⁺ restores the ring.',
        'Nitration (NO₂⁺, mixed acid), halogenation (X₂, FeX₃), sulphonation (SO₃, reversible), Friedel–Crafts alkylation (R⁺) and acylation (RCO⁺) with AlCl₃.',
        'Directive influence: –OH, –NH₂, alkyl: o/p, activating; halogens: o/p, deactivating; –NO₂, –COOH, –CHO, –CN: meta, deactivating.',
        'Addition (forcing): H₂/Ni to cyclohexane; Cl₂/UV to BHC. Ozonolysis: three glyoxal. Pyrolysis: biphenyl.',
        'Benzene is carcinogenic and toxic: use a fume cupboard.',
      ],
      v: table(['Reaction', 'Reagent', 'Product'], [['Nitration', 'Conc. HNO₃ + conc. H₂SO₄', 'Nitrobenzene'], ['Chlorination', 'Cl₂, FeCl₃', 'Chlorobenzene'], ['Sulphonation', 'Conc. H₂SO₄ / oleum', 'Benzenesulphonic acid'], ['Acylation', 'CH₃COCl, AlCl₃', 'Phenylethanone'], ['Addition', 'Cl₂, UV light', 'BHC']], 'Summary table of five reactions of benzene with reagent and product'),
      n: 'To sum up Part two. Benzene undergoes electrophilic substitution in two steps, with the arenium ion as the intermediate. Nitration, halogenation, sulphonation and the two Friedel Crafts reactions each have a specific electrophile. Donor groups direct ortho and para and activate the ring, while withdrawing groups direct meta and deactivate it. Under forcing conditions benzene adds hydrogen or chlorine, and it can be ozonised or pyrolysed. It is a carcinogen.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the mechanism in three parts: generation of the electrophile, attack to form the arenium ion (with the three resonance forms), loss of H⁺.',
        'Give the reagent, catalyst and temperature with every reaction; Friedel–Crafts needs anhydrous AlCl₃.',
        'To justify a directive effect, draw the arenium ion for ortho, meta and para attack and say where the + charge lies.',
        'Do not confuse substitution (FeCl₃, dark) with addition (UV light, no catalyst) for chlorine.',
      ],
      v: table(['Slip', 'Fix'], [['Chlorine and iron(III) chloride give hexachlorocyclohexane', 'FeCl₃ gives chlorobenzene (substitution)'], ['Halogens are meta directing', 'Halogens direct ortho/para (but deactivate)'], ['Sulphonation is irreversible', 'It reverses on heating with dilute acid or steam']], 'Table of three common slips about benzene reactions with corrections'),
      n: 'Tips for Part two. Draw the mechanism in three parts: forming the electrophile, attack on the ring to give the arenium ion, and loss of the proton. Always give the reagent, catalyst and temperature, and remember that Friedel Crafts reactions need anhydrous aluminium chloride. To justify a directive effect, show where the positive charge lies in the arenium ion. And do not confuse substitution, with an iron halide in the dark, with addition in ultraviolet light.',
    }),
  ],
});
