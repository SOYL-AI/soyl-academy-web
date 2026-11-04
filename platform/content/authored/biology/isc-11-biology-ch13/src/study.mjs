// ISC 11 Biology ch13 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GLU, GLU4, GLU_WATER, GRAD_FOLD, GRAD, PR_LOSS, C4_VS_C3, LIM, plateauAt } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Photosynthesis in Higher Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Photosynthesis, the chloroplast, pigments and spectra',
      `**Photosynthesis** is the **autotrophic** mode of nutrition in which green plants use **light energy** to make organic food from **carbon dioxide and water**, releasing **oxygen**. The overall change is 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O; the oxygen released comes from **water**, not from carbon dioxide.

**Site:** mainly the **mesophyll cells** of leaves. Each **chloroplast** has a **double membrane** (outer and inner), a fluid **stroma** and a system of flattened sacs, the **thylakoids**. Thylakoids are stacked into **grana** and joined by **stroma lamellae**. The **light reaction** (photochemical phase) takes place on the thylakoid membranes; the **biosynthetic phase** (Calvin cycle) takes place in the stroma.

**Pigments:** **chlorophyll a** (bright or blue-green) is the main pigment and the only one in a reaction centre. **Chlorophyll b** (yellow-green), **xanthophylls** (yellow) and **carotenoids** (yellow to yellow-orange) are **accessory pigments**: they absorb other wavelengths, pass the energy to chlorophyll a, and **protect** chlorophyll from photo-oxidation in strong light.

**Spectra:** an **absorption spectrum** plots the light a pigment absorbs against wavelength (chlorophyll a peaks near 430 and 662 nm; chlorophyll b near 453 and 642 nm; all absorb green weakly). An **action spectrum** plots the **rate of photosynthesis** (for example oxygen release) against wavelength. The action spectrum follows the combined absorption of the pigments, so light absorbed by the pigments is the light that drives photosynthesis.

**Engelmann’s experiment:** he lit a filament of the green alga **Cladophora**, placed with **aerobic bacteria**, using a prism spectrum. The bacteria collected where the alga released most oxygen, in the **violet-blue and red** regions, and were few in green. This was the first demonstration of an action spectrum.`,
      [kt('Chlorophyll a', 'Primary pigment; found in the reaction centres.'), kt('Accessory pigments', 'Chlorophyll b, xanthophylls and carotenoids; pass energy to chlorophyll a and protect it.'), kt('Absorption spectrum', 'Graph of light absorbed against wavelength.'), kt('Action spectrum', 'Graph of rate of photosynthesis against wavelength.'), kt('Engelmann', 'Used Cladophora and aerobic bacteria to show that blue and red light drive photosynthesis most.')],
      V.spectra,
      [1],
      [V.chloro, V.engelmann],
    ),
    sec(
      '2. Photochemical phase and chemiosmosis',
      `The pigments in the thylakoid membrane form **two photosystems**. Each has a **light-harvesting complex (LHC)**, also called the antenna: hundreds of chlorophyll and carotenoid molecules held by proteins, which absorb light and pass the energy to a single **reaction-centre** chlorophyll a. In **photosystem I (PS I)** the reaction centre absorbs best at **700 nm (P700)**; in **photosystem II (PS II)** at **680 nm (P680)**. PS II lies mainly in the grana thylakoids; PS I lies in the stroma lamellae and the edges of the grana.

**Non-cyclic photophosphorylation (Z-scheme):** light excites P680; its electrons pass through **pheophytin**, **plastoquinone (PQ)**, the **cytochrome b6-f complex** and **plastocyanin (PC)** to P700. Energy released on this downhill path makes **ATP**. Light excites P700; its electrons pass to **ferredoxin** and then, through **NADP reductase**, to **NADP⁺**, which becomes **NADPH**. The electrons lost by P680 are replaced by the **splitting of water**, which gives O₂ and H⁺. The path is called the Z-scheme from its shape when drawn against energy level. Products: **ATP, NADPH and oxygen**.

**Cyclic photophosphorylation:** only **PS I** works. Excited electrons pass to ferredoxin and return to the cytochrome b6-f complex and on to P700, so there is a **loop**. Only **ATP** is made; there is **no NADPH, no water splitting and no oxygen**. It happens in the stroma lamellae, especially when NADPH is not needed.

**Chemiosmotic hypothesis (Peter Mitchell, 1961):** ATP is made by the flow of protons down a gradient. Protons accumulate in the **thylakoid lumen** because (i) **water is split** on the lumen side; (ii) as electrons pass through the chain, **plastoquinone carries H⁺ from the stroma into the lumen**; and (iii) **NADP reductase** on the stroma side **removes H⁺** from the stroma when NADPH is formed. The lumen becomes acidic and the stroma less so (for example pH ${GRAD.lumen} against ${GRAD.stroma}, a ${GRAD_FOLD}-fold difference in H⁺). Protons flow back through the **CF₀ channel** of **ATP synthase**; the **CF₁ knob**, projecting into the stroma, uses the energy to make ATP from ADP and Pi.

**Arithmetic:** each NADPH takes 2 electrons and each water gives 2, so the ${GLU.nadph} NADPH needed for one glucose require ${GLU_WATER} water molecules to be split, releasing ${GLU_WATER / 2} O₂.`,
      [kt('LHC', 'Light-harvesting complex: antenna of pigments that funnels energy to the reaction centre.'), kt('P680 and P700', 'Reaction-centre chlorophyll a of PS II and PS I.'), kt('Photophosphorylation', 'Making of ATP using light energy.'), kt('Chemiosmosis', 'ATP synthesis driven by proton flow down a gradient; proposed by Mitchell.'), kt('ATP synthase', 'Enzyme with CF₀ channel and CF₁ knob that makes ATP.')],
      V.z,
      [2],
      [V.chemio],
    ),
    sec(
      '3. Biosynthetic phase: the Calvin (C3) cycle',
      `The **biosynthetic phase** does not need light directly, but uses the **ATP and NADPH** of the light reaction; it takes place in the **stroma**. Melvin Calvin traced it with radioactive carbon (¹⁴C) in the alga *Chlorella*. The first stable product is the three-carbon **3-phosphoglyceric acid (PGA)**, so this is the **C3 cycle**. It occurs in **all** photosynthetic plants.

**Stages:**
1. **Carboxylation** — CO₂ combines with the five-carbon acceptor **RuBP** (ribulose 1,5-bisphosphate) to give two PGA; catalysed by **RuBisCO**.
2. **Reduction** — PGA is converted to **triose phosphate (G3P)** using **ATP and NADPH**.
3. **Regeneration** — most G3P is rearranged to regenerate **RuBP**, using **ATP**. A small part leaves the cycle to make glucose, sucrose and starch.

**Energy and carbon bookkeeping:** each CO₂ fixed needs **3 ATP and 2 NADPH**. One glucose needs **6 turns**: **${GLU.atp} ATP and ${GLU.nadph} NADPH**. In six turns, 6 RuBP (30 C) and 6 CO₂ give 12 PGA; 12 G3P are formed; **2** leave (6 C, one glucose) and **10** regenerate **6 RuBP**.

**RuBisCO** (ribulose bisphosphate carboxylase-oxygenase) is the most abundant enzyme on Earth; it is a carboxylase in the Calvin cycle and an oxygenase in photorespiration.`,
      [kt('RuBP', 'Five-carbon CO₂ acceptor of the Calvin cycle.'), kt('PGA', 'First stable product, three carbons.'), kt('RuBisCO', 'Enzyme that fixes CO₂ (and, with O₂, starts photorespiration).'), kt('Regeneration', 'Remaking of RuBP from G3P using ATP.')],
      V.calvin,
      [3],
    ),
    sec(
      '4. C4 pathway and Kranz anatomy',
      `In **C4 plants** (maize, sugarcane, sorghum) the first stable product is the four-carbon **oxaloacetic acid (OAA)**. The pathway was worked out by **M. D. Hatch and C. R. Slack** (Hatch and Slack pathway).

**Steps:** (1) in **mesophyll cells**, **PEP carboxylase (PEPcase)** fixes CO₂ on to **PEP** (3 C) to give **OAA** (4 C); (2) OAA is converted to **malate** (or aspartate), which moves into the **bundle sheath cells**; (3) there it is broken down to **pyruvate and CO₂**; the CO₂ enters the **Calvin cycle** (RuBisCO); (4) pyruvate returns to the mesophyll and is converted to PEP using **ATP** (2 extra ATP per CO₂). So a C4 plant needs **5 ATP and 2 NADPH per CO₂**: **${GLU4.atp} ATP and ${GLU4.nadph} NADPH per glucose**.

**Kranz anatomy** (Kranz means wreath): large **bundle sheath cells** with many chloroplasts form a ring around each vascular bundle; mesophyll cells lie outside. The Calvin cycle is confined to the bundle sheath. The C4 pathway acts as a **CO₂ pump**, raising CO₂ around RuBisCO.

**Why C4 plants do better in hot, bright conditions:** PEPcase does not bind oxygen and has a high affinity for CO₂, so fixation continues when stomata are partly closed; CO₂ is concentrated in the bundle sheath, so RuBisCO does not act as an oxygenase and **photorespiration is negligible**; they have a higher temperature optimum and do not saturate at full sunlight.

| Feature | C3 | C4 |
|---|---|---|
| First product | PGA | OAA |
| Anatomy | no Kranz | Kranz |
| Carboxylating enzyme | RuBisCO | PEPcase, then RuBisCO |
| Photorespiration | present | negligible |
| Temperature optimum | ${C4_VS_C3.c3opt} °C | ${C4_VS_C3.c4opt} °C |
| ATP per CO₂ | 3 | 5 |`,
      [kt('Hatch and Slack pathway', 'The C4 pathway of CO₂ fixation.'), kt('PEP carboxylase', 'Enzyme of mesophyll cells that fixes CO₂ on to PEP.'), kt('Kranz anatomy', 'Ring of bundle sheath cells around the vascular bundle.'), kt('OAA', 'Four-carbon first product of the C4 pathway.')],
      V.c4,
      [4],
      [V.kranz],
    ),
    sec(
      '5. Photorespiration',
      `**Photorespiration** is the light-dependent uptake of **O₂ and release of CO₂** by the chloroplast–peroxisome–mitochondrion pathway. It occurs when **O₂ is high and CO₂ is low** (hot, bright, dry conditions in C3 plants): **RuBisCO** then acts as an **oxygenase**. RuBP + O₂ gives **one PGA** and **one phosphoglycolate** (2 C); phosphoglycolate becomes **glycolate**, which leaves the chloroplast to the **peroxisome** and becomes **glycine**; in the **mitochondrion** two glycine give **one serine, one CO₂ and ammonia**; serine returns to the chloroplast.

**Significance:** it is **wasteful**. No ATP or NADPH is made — the pathway uses them — and no sugar is made; CO₂ already fixed is lost (in the glycine step, ${PR_LOSS} percent of the carbon of two glycolate molecules). It lowers the yield of C3 crops. It does **not** occur in C4 plants, because CO₂ is concentrated around RuBisCO in the bundle sheath. Some books say it may protect the chloroplast from light damage when CO₂ is short; this is a suggested role only.`,
      [kt('Photorespiration', 'Light-dependent O₂ uptake and CO₂ release by RuBisCO oxygenase activity.'), kt('Phosphoglycolate', 'Two-carbon product of RuBP oxygenation.'), kt('Peroxisome', 'Organelle where glycolate is converted to glycine.')],
      table(['Feature', 'Calvin cycle', 'Photorespiration'], [['RuBisCO acts as', 'Carboxylase', 'Oxygenase'], ['ATP and NADPH', 'Used; sugar made', 'Used; no sugar'], ['CO₂', 'Fixed', 'Released'], ['Organelles', 'Chloroplast', 'Chloroplast, peroxisome, mitochondrion']], 'Table comparing the Calvin cycle with photorespiration'),
      [5],
    ),
    sec(
      '6. Blackman’s law of limiting factors and the factors affecting photosynthesis',
      `**Blackman (1905):** when a process depends on several factors, its rate is limited by the factor that is **nearest its minimum value**. Raising a factor that is not limiting does not raise the rate.

**Light:** the rate rises with light intensity, then **saturates**; C3 leaves are usually light-saturated at about a tenth of full sunlight, C4 plants do not saturate in full sunlight. Quality matters (violet-blue and red are best). **CO₂:** the atmosphere has about 0.03–0.04 percent; the rate rises with CO₂ concentration, and C3 plants respond to higher CO₂ than C4 plants, which saturate lower. **Temperature:** the dark reactions are enzymatic, so the rate rises with temperature to an **optimum** and then falls as enzymes are denatured (optimum ${C4_VS_C3.c3opt} °C for C3 and ${C4_VS_C3.c4opt} °C for C4 plants). **Water:** a shortage closes the stomata, reducing CO₂ entry, and also affects the leaf’s water balance and enzymes.

**Graph reading (model data):** at low CO₂ the curve rises up to ${plateauAt(LIM.capLow)} klux and then flattens, so beyond that CO₂ is limiting; with more CO₂ the curve flattens only at ${plateauAt(LIM.capHigh)} klux.`,
      [kt('Law of limiting factors', 'Rate is set by the factor nearest its minimum (Blackman, 1905).'), kt('Light saturation', 'Light intensity beyond which the rate no longer rises.'), kt('Optimum temperature', 'Temperature at which the rate is highest.')],
      V.blackman,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the oxygen released comes from carbon dioxide (it comes from water).
- Mixing up absorption and action spectra.
- Drawing the Z-scheme with P700 before P680, or leaving out water, ATP or NADPH.
- Saying cyclic photophosphorylation makes NADPH (it makes only ATP).
- Giving the Calvin cycle as 3 ATP and 2 NADPH per glucose (it is per CO₂; for glucose it is ${GLU.atp} and ${GLU.nadph}).
- Placing the Calvin cycle of a C4 plant in the mesophyll (it is in the bundle sheath).
- Saying photorespiration makes ATP (it uses energy and makes none).

**How marks are usually awarded**
- 1-mark subparts: accessory pigment, reaction centre, enzyme, first product, a limiting factor, assertion-reason on cyclic and non-cyclic.
- 2–3-mark questions: absorption versus action spectrum; cyclic versus non-cyclic; chemiosmosis; Calvin stages; C3 versus C4; why photorespiration is wasteful.
- 5-mark questions in parts: chloroplast diagram with sites; Z-scheme with explanation; Calvin cycle with energy count; C4 pathway with Kranz anatomy.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Source of the oxygen released in photosynthesis?', 'Water.', 'fact', 1),
    fc(2, 'Where does the light reaction occur?', 'On the thylakoid membranes of grana and stroma lamellae.', 'fact', 1),
    fc(3, 'Primary photosynthetic pigment?', 'Chlorophyll a.', 'fact', 1),
    fc(4, 'Colour of chlorophyll b on a chromatogram?', 'Yellow-green.', 'fact', 1),
    fc(5, 'Two roles of carotenoids?', 'Accessory absorption and protection of chlorophyll from photo-oxidation.', 'concept', 1),
    fc(6, 'Absorption spectrum versus action spectrum?', 'Light absorbed by a pigment against wavelength; rate of photosynthesis against wavelength.', 'exam-tip', 1),
    fc(7, 'Organism and indicator in Engelmann’s experiment?', 'Cladophora; aerobic bacteria.', 'fact', 1),
    fc(8, 'What did Engelmann find?', 'Bacteria gathered at violet-blue and red regions, where oxygen release is highest.', 'concept', 1),
    fc(9, 'What is an LHC?', 'Antenna of pigments that funnels energy to the reaction centre.', 'definition', 2),
    fc(10, 'Reaction centres of PS II and PS I?', 'P680 and P700.', 'fact', 2),
    fc(11, 'Which photosystem splits water?', 'PS II.', 'fact', 2),
    fc(12, 'Products of non-cyclic photophosphorylation?', 'ATP, NADPH and oxygen.', 'fact', 2),
    fc(13, 'Product of cyclic photophosphorylation?', 'ATP only.', 'fact', 2),
    fc(14, 'Who proposed the chemiosmotic hypothesis?', 'Peter Mitchell (1961).', 'fact', 2),
    fc(15, 'Three causes of the proton gradient in the lumen?', 'Water splitting, PQ carrying H+, NADP reductase removing H+ from stroma.', 'exam-tip', 2),
    fc(16, 'Parts of ATP synthase?', 'CF0 channel in the membrane; CF1 knob in the stroma.', 'fact', 2),
    fc(17, 'First stable product of the Calvin cycle?', 'PGA (three carbons).', 'fact', 3),
    fc(18, 'CO2 acceptor in the Calvin cycle?', 'RuBP (five carbons).', 'fact', 3),
    fc(19, 'Three stages of the Calvin cycle?', 'Carboxylation, reduction, regeneration.', 'exam-tip', 3),
    fc(20, 'ATP and NADPH per CO2 in the Calvin cycle?', '3 ATP and 2 NADPH.', 'fact', 3),
    fc(21, 'ATP and NADPH for one glucose (C3)?', `${GLU.atp} ATP and ${GLU.nadph} NADPH.`, 'exam-tip', 3),
    fc(22, 'Who worked out the C4 pathway?', 'Hatch and Slack.', 'fact', 4),
    fc(23, 'First product and enzyme in C4 plants?', 'OAA; PEP carboxylase.', 'fact', 4),
    fc(24, 'Meaning of Kranz?', 'Wreath: ring of bundle sheath cells around the vascular bundle.', 'definition', 4),
    fc(25, 'ATP per glucose in C4 plants?', `${GLU4.atp}.`, 'fact', 4),
    fc(26, 'Why do C4 plants lack photorespiration?', 'CO2 is concentrated around RuBisCO in the bundle sheath.', 'concept', 4),
    fc(27, 'Define photorespiration.', 'Light-dependent O2 uptake and CO2 release by RuBisCO acting as an oxygenase.', 'definition', 5),
    fc(28, 'Organelles in photorespiration?', 'Chloroplast, peroxisome, mitochondrion.', 'fact', 5),
    fc(29, 'State Blackman’s law.', 'The rate is limited by the factor nearest its minimum.', 'definition', 6),
    fc(30, 'Effect of high temperature on photosynthesis?', 'Rate falls beyond the optimum as enzymes are denatured.', 'concept', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
