// ch11 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { N, CALVIN, C4 } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Photosynthesis in Higher Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Site and pigments of photosynthesis',
      `Photosynthesis is the process by which green plants use **light energy** to make **carbohydrates from carbon dioxide and water**, releasing **oxygen**. In green plants it takes place mainly in the **leaves**, in the **chloroplasts**. A chloroplast has a **double membrane** enclosing the **stroma**; in the stroma lie the **grana**, stacks of flattened sacs called **thylakoids**, joined by **stroma lamellae**. The **light reaction** takes place on the thylakoid membranes of the grana; the stroma holds the enzymes of the **Calvin cycle**. The membranes of the stroma lamellae lack photosystem II and NADP reductase.

Four kinds of pigment are found in the leaf and can be separated by **paper chromatography**: **chlorophyll a** (bright or blue green), **chlorophyll b** (yellow green), **xanthophylls** (yellow) and **carotenoids** (yellow to yellow-orange). On the paper the carotenoids travel farthest and chlorophyll b least. **Chlorophyll a is the chief pigment**; the others are **accessory pigments** that absorb light at other wavelengths and pass the energy to chlorophyll a, so enabling a wider range of wavelengths to be used, and that also **protect chlorophyll a from photo-oxidation**. In chromatography the retention factor is $R_f$ = distance moved by the pigment divided by distance moved by the solvent front.

Chlorophyll a absorbs mostly in the **violet-blue and red** regions of the spectrum. The **absorption spectrum** shows the light absorbed at each wavelength; the **action spectrum** shows the rate of photosynthesis at each wavelength, and it closely follows the absorption of the pigments together. Green light is the least effective.

(The Rf values and band positions in the figures are illustrative; the order of bands depends on the solvent used, and the textbook order is quoted.)`,
      [kt('Granum', 'A stack of thylakoids in the chloroplast; site of the light reaction.'), kt('Stroma', 'The matrix of the chloroplast, where the Calvin cycle takes place.'), kt('Accessory pigment', 'Chlorophyll b, xanthophyll or carotenoid: absorbs light and passes the energy to chlorophyll a.'), kt('Action spectrum', 'Graph of the rate of photosynthesis against wavelength of light.')],
      V.chloroplast,
      [1],
      [V.chrom, V.spectrum],
      [{ label: 'Retention factor', latex: r`R_f = \dfrac{\text{distance moved by the pigment}}{\text{distance moved by the solvent front}}` }],
    ),
    sec(
      '2. Light reaction: cyclic and non-cyclic photophosphorylation',
      `The pigments are organised into **light-harvesting complexes (LHC)** within **photosystem I (PS I)** and **photosystem II (PS II)**. Each photosystem has an **antenna** of hundreds of pigment molecules bound to proteins; all of them except one chlorophyll a molecule pass the energy to this single molecule, the **reaction centre**. The reaction centre of **PS I is P700** (absorption peak 700 nm) and of **PS II is P680** (680 nm).

**Non-cyclic photophosphorylation (the Z scheme).** In **PS II** the reaction-centre chlorophyll absorbs 680 nm red light; electrons are excited and transferred to an electron acceptor and then **downhill** through **plastoquinone**, the **cytochrome b₆f complex** and **plastocyanin** to **PS I**. The electrons lost from PS II are replaced by **splitting of water** (on the lumen side, associated with PS II): $2\\,\\text{H}_2\\text{O} \\to 4\\,\\text{H}^+ + \\text{O}_2 + 4\\,e^-$. This is the source of the **oxygen** released. In **PS I** the electrons are excited again, passed to an acceptor of greater redox potential and move downhill through **ferredoxin** to **NADP reductase** (on the stroma side), which reduces **NADP⁺ to NADPH + H⁺**. The result is **ATP, NADPH and oxygen**, and the electrons do not return to PS II.

**Cyclic photophosphorylation.** Only **PS I** acts: the excited electron passes to an acceptor, then down a chain through the **cytochrome b₆f complex** and **plastocyanin** and returns to PS I. Because PS II is not involved, there is **no water splitting, no oxygen and no NADPH**; only **ATP** is made. It occurs in the **stroma lamellae**, when only light of wavelengths longer than 680 nm is available.

**Chemiosmotic hypothesis.** ATP synthesis is linked to the **proton gradient across the thylakoid membrane**, with **protons accumulating in the lumen**. Three events raise the proton concentration in the lumen: (i) **splitting of water** inside the lumen releases protons; (ii) as electrons move through the photosystems, the carrier **plastoquinone** removes protons from the **stroma** and releases them in the lumen; (iii) **NADP reductase** uses protons from the **stroma** to reduce NADP⁺, further lowering the proton concentration in the stroma. ATP synthase has a transmembrane channel, **CF₀**, and a knob, **CF₁**, on the stroma side. Breakdown of the gradient as protons flow out through CF₀ causes a conformational change in CF₁ that makes **ATP**.

**Count.** The overall equation for one glucose is 6 CO₂ + 12 H₂O → glucose + 6 O₂ + 6 H₂O, so 12 water molecules are split: that gives 6 O₂ and 24 electrons, enough for 12 NADPH, as the Calvin cycle needs.`,
      [kt('Reaction centre', 'The single chlorophyll a molecule in a photosystem to which the antenna pigments pass energy: P700 in PS I, P680 in PS II.'), kt('Non-cyclic photophosphorylation', 'Electron flow from water through PS II and PS I to NADP⁺, making ATP, NADPH and oxygen.'), kt('Cyclic photophosphorylation', 'Electron flow from and back to PS I only, making ATP alone.'), kt('Chemiosmosis', 'Making ATP using the energy of a proton gradient across a membrane, here the thylakoid membrane.'), kt('ATP synthase', 'Enzyme complex with a channel (CF₀) and a knob (CF₁) that makes ATP as protons flow through it.')],
      V.thylakoid,
      [2],
      [V.z],
      [{ label: 'Overall equation', latex: r`6\,\text{CO}_2 + 12\,\text{H}_2\text{O} \xrightarrow{\text{light}} \text{C}_6\text{H}_{12}\text{O}_6 + 6\,\text{O}_2 + 6\,\text{H}_2\text{O}` }],
    ),
    sec(
      '3. Calvin cycle, C4 pathway and photorespiration',
      `**Calvin cycle (C₃ pathway).** The cycle takes place in the **stroma** of all photosynthetic plants. Melvin Calvin found, using radioactive carbon, that the first stable product of CO₂ fixation is a **3-carbon acid, 3-phosphoglyceric acid (PGA)**. It has three stages. **Carboxylation:** CO₂ combines with the 5-carbon **ribulose bisphosphate (RuBP)**, catalysed by **RuBisCO** (the most abundant enzyme on Earth), giving two molecules of PGA. **Reduction:** PGA is phosphorylated and reduced to **triose phosphate (G3P)**, using **${CALVIN.reductionAtp} ATP and ${CALVIN.reductionNadph} NADPH per CO₂**. **Regeneration:** RuBP is regenerated, which needs **${CALVIN.regenAtp} ATP**. So for every CO₂ fixed the cycle uses **${CALVIN.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH**, and **six turns** (six CO₂) are needed to make one glucose: **${N.atp6} ATP and ${N.nadph6} NADPH**. In three turns, 3 RuBP (15 C) and 3 CO₂ give 6 PGA (18 C), then 6 G3P; five G3P regenerate 3 RuBP and one G3P is the net gain.

**C₄ pathway.** Plants adapted to dry tropical regions (such as maize and sugarcane) have the C₄ pathway. They have **Kranz anatomy**: large **bundle sheath cells** around the vascular bundles with **thick walls impervious to gases** and no intercellular spaces. The primary acceptor of CO₂ is **phosphoenol pyruvate (PEP, 3-carbon)** in the **mesophyll cells**; the enzyme is **PEP carboxylase (PEPcase)** and the first product is the 4-carbon **oxaloacetic acid (OAA)**, converted to **malic or aspartic acid**. These C₄ acids move to the **bundle sheath cells**, where they are broken down to release **CO₂** and a 3-carbon molecule. The CO₂ enters the **Calvin cycle** (RuBisCO is present only in the bundle sheath), and the 3-carbon molecule returns to the mesophyll to regenerate PEP, which costs ${C4.extraAtp} ATP. C₄ plants therefore need **${C4.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH per CO₂** (${N.atp6c4} ATP per glucose). They **tolerate higher temperatures, respond to high light, lack photorespiration and have greater biomass productivity**.

**Photorespiration.** The active site of **RuBisCO** can bind **CO₂ or O₂** depending on their relative concentrations. In a high O₂, low CO₂ situation, RuBP binds O₂ and forms **one PGA and one phosphoglycolate (a 2-carbon molecule)** instead of two PGA. In this pathway, which involves the **chloroplast, peroxisome and mitochondrion**, **no sugar and no ATP or NADPH is made; CO₂ is released and energy is used**, so it is a **wasteful** process. It occurs in **C₃ plants**; **C₄ plants avoid it** because CO₂ is concentrated at RuBisCO in the bundle sheath, and PEP carboxylase has no affinity for O₂. The biological function of photorespiration is not clearly known.`,
      [kt('RuBisCO', 'Ribulose bisphosphate carboxylase-oxygenase: fixes CO₂ onto RuBP, and in high O₂ binds O₂ instead (photorespiration).'), kt('Kranz anatomy', 'Ring of large, thick-walled bundle sheath cells around the vascular bundles of C₄ leaves.'), kt('PEP carboxylase', 'Enzyme of the mesophyll cells of C₄ plants that fixes CO₂ onto PEP to give oxaloacetate.'), kt('Photorespiration', 'Wasteful pathway started by RuBisCO acting on O₂; no sugar, ATP or NADPH is made.')],
      V.calvin,
      [3],
      [V.c4],
      [{ label: 'Cost of one glucose (C₃)', latex: r`6 \times 3 = 18 \text{ ATP}, \quad 6 \times 2 = 12 \text{ NADPH}` }],
    ),
    sec(
      '4. Factors affecting photosynthesis',
      `The rate of photosynthesis is affected by **internal factors** (number, size, age and orientation of leaves, mesophyll cells and chloroplasts, internal CO₂ concentration, and the amount of chlorophyll) and by **external factors**: light, carbon dioxide, temperature and water.

**Blackman's law of limiting factors (1905):** if a chemical process is affected by more than one factor, its rate is determined by the factor that is **nearest to its minimal value**; it is the factor that directly affects the process if its quantity is changed.

**Light.** At low light intensity the rate of photosynthesis rises with it; at higher intensities the rate does not increase further because other factors become limiting. Light saturation occurs at about **10 percent of full sunlight**, except in plants of shade; light quality and duration also matter. **Carbon dioxide** is the major limiting factor: its concentration in the atmosphere is very low (**0.03 to 0.04 percent**), and increasing it up to about 0.05 percent raises the rate. At high light, both C₃ and C₄ plants respond, but **C₄ plants saturate at about 360 µL per L** whereas **C₃ plants respond to increases up to about 450 µL per L**, so present CO₂ levels limit C₃ plants; **tomato and bell pepper** grown in CO₂-enriched greenhouses give higher yields. **Temperature.** The dark (Calvin cycle) reactions are enzymatic and temperature controlled; the light reactions are less sensitive. **C₄ plants have a higher temperature optimum** than C₃ plants, and the optimum relates to the plant's habitat (tropical plants have a higher optimum than temperate plants). **Water.** Its effect is largely through the plant: **water stress closes stomata, reducing CO₂ availability**, and wilting reduces leaf area and metabolic activity.

(The rates in the graph are in arbitrary units from a simple minimum-of-factors model that illustrates the law; real curves are smoother.)`,
      [kt('Limiting factor', 'The factor nearest its minimum value, which therefore sets the rate of a process (Blackman).'), kt('Light saturation', 'The light intensity (about 10 percent of full sunlight) above which more light does not raise the rate.')],
      V.blackman,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the oxygen released comes from carbon dioxide (it comes from the splitting of water).
- Saying cyclic photophosphorylation makes NADPH or oxygen (it makes only ATP and involves only PS I).
- Reversing the sides of the thylakoid: protons accumulate in the **lumen**; NADP reductase and ATP synthase's knob are on the **stroma** side.
- Writing the Calvin cycle needs 2 ATP per CO₂ (it is 3 ATP: 2 for reduction and 1 for regeneration) or forgetting that glucose needs **6 turns**.
- Saying C₄ plants have no Calvin cycle (they fix CO₂ twice: PEP carboxylase first, then RuBisCO in the bundle sheath).
- Describing photorespiration as useful: no sugar, ATP or NADPH is formed.
- Naming the wrong limiting factor from a graph: the plateau shows that something other than the plotted variable is limiting.

**How marks are usually awarded**
- 1-mark items: a pigment colour, P680 or P700, the enzyme (RuBisCO, PEPcase), the first product (PGA or OAA), a site (stroma or lumen), Blackman's law.
- 2–3-mark answers: cyclic versus non-cyclic; chemiosmosis; the stages of the Calvin cycle; C₃ versus C₄; photorespiration; the factors affecting photosynthesis.
- 5-mark answers: light reaction with the Z scheme; Calvin cycle with energy count; C₄ pathway with Kranz anatomy.
- Numericals: Rf from a chromatogram; ATP and NADPH for n CO₂; turns for glucose; water, oxygen and electrons; reading limiting factors from rate data.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Where in the cell does photosynthesis take place?', 'In chloroplasts: light reaction on thylakoids of the grana, Calvin cycle in the stroma.', 'fact', 1),
    fc(2, 'Name the four leaf pigments and their colours.', 'Chlorophyll a (bright or blue green), chlorophyll b (yellow green), xanthophylls (yellow), carotenoids (yellow to yellow-orange).', 'fact', 1),
    fc(3, 'Chief and accessory pigments?', 'Chlorophyll a is chief; chlorophyll b, xanthophylls and carotenoids are accessory.', 'concept', 1),
    fc(4, 'Why are accessory pigments useful?', 'They widen the range of light used, pass energy to chlorophyll a, and protect it from photo-oxidation.', 'concept', 1),
    fc(5, 'Rf formula?', 'Distance moved by the pigment divided by distance moved by the solvent front.', 'formula', 1),
    fc(6, 'Action spectrum versus absorption spectrum?', 'Action: rate of photosynthesis at each wavelength. Absorption: light absorbed. The action spectrum follows the combined absorption.', 'concept', 1),
    fc(7, 'Which parts of the spectrum does chlorophyll a absorb most?', 'Violet-blue and red.', 'fact', 1),
    fc(8, 'Structure of a photosystem?', 'Antenna of pigment molecules (light-harvesting complex) plus one chlorophyll a reaction centre.', 'concept', 2),
    fc(9, 'Reaction centres of PS I and PS II?', 'PS I: P700. PS II: P680.', 'fact', 2),
    fc(10, 'Where does water splitting occur and what does it give?', 'On the lumen side of PS II: 2 H₂O → 4 H⁺ + O₂ + 4 e⁻.', 'concept', 2),
    fc(11, 'Order of carriers in the Z scheme?', 'PS II, plastoquinone, cytochrome b₆f, plastocyanin, PS I, ferredoxin, NADP reductase.', 'concept', 2),
    fc(12, 'Products of non-cyclic photophosphorylation?', 'ATP, NADPH and oxygen.', 'fact', 2),
    fc(13, 'Cyclic photophosphorylation: photosystem, product, place?', 'PS I only; ATP only; stroma lamellae.', 'concept', 2),
    fc(14, 'Which enzyme makes NADPH and on which side?', 'NADP reductase, on the stroma side of the thylakoid membrane.', 'fact', 2),
    fc(15, 'Three events that build the proton gradient?', 'Water splitting in the lumen; plastoquinone moving H⁺ from stroma to lumen; NADP reductase using H⁺ from the stroma.', 'concept', 2),
    fc(16, 'Parts of ATP synthase?', 'CF₀ channel in the membrane and CF₁ knob on the stroma side.', 'fact', 2),
    fc(17, 'First stable product of the Calvin cycle?', '3-phosphoglyceric acid (PGA), a 3-carbon acid.', 'fact', 3),
    fc(18, 'Name the three stages of the Calvin cycle.', 'Carboxylation, reduction, regeneration.', 'fact', 3),
    fc(19, 'Enzyme of carboxylation and the acceptor?', 'RuBisCO; ribulose bisphosphate (RuBP, 5C).', 'fact', 3),
    fc(20, 'ATP and NADPH per CO₂ in the Calvin cycle?', '3 ATP (2 for reduction, 1 for regeneration) and 2 NADPH.', 'formula', 3),
    fc(21, 'ATP and NADPH for one glucose (C3)?', '6 turns: 18 ATP and 12 NADPH.', 'formula', 3),
    fc(22, 'CO₂ acceptor and enzyme in mesophyll of C4 plants?', 'PEP (3C); PEP carboxylase; first product oxaloacetate (4C).', 'fact', 3),
    fc(23, 'What is Kranz anatomy?', 'Large, thick-walled bundle sheath cells around the vascular bundles.', 'definition', 3),
    fc(24, 'ATP per CO₂ in C4 plants?', '5 ATP (2 extra to regenerate PEP) and 2 NADPH.', 'formula', 3),
    fc(25, 'Features of C4 plants?', 'Kranz anatomy; higher temperature optimum; respond to high light; no photorespiration; greater productivity.', 'concept', 3),
    fc(26, 'What is photorespiration?', 'RuBisCO binds O₂ instead of CO₂: RuBP gives PGA and phosphoglycolate; no sugar, ATP or NADPH; CO₂ released; wasteful.', 'definition', 3),
    fc(27, 'State Blackman’s law of limiting factors.', 'When several factors affect a process, its rate is set by the factor nearest its minimum value.', 'definition', 4),
    fc(28, 'Light saturation point?', 'About 10 percent of full sunlight.', 'fact', 4),
    fc(29, 'Response of C3 and C4 plants to CO₂?', 'C4 saturate near 360 µL per L; C3 respond up to about 450 µL per L.', 'fact', 4),
    fc(30, 'Effects of temperature and water?', 'Dark reactions are temperature sensitive (C4 optimum higher); water stress closes stomata and cuts CO₂ supply.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
