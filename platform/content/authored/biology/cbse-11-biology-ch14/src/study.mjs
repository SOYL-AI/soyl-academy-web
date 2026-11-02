// ch14 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { LOW, HIGH, CAP_LOW, CAP_HIGH, PP, O2_SHARE, CO2_SHARE, PER100, SOLUBILITY } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Breathing and Exchange of Gases — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Respiratory organs and the human respiratory system',
      `Organisms use oxygen to break down simple molecules such as glucose, amino acids and fatty acids for energy, and this releases harmful **carbon dioxide**. Exchange of atmospheric oxygen with the carbon dioxide produced by cells is called **breathing**, commonly known as respiration.

**Respiratory organs** vary with habitat and level of organisation:
- **Sponges, coelenterates and flatworms:** simple diffusion over the entire body surface.
- **Earthworms:** moist cuticle. **Insects:** a network of tubes (**tracheal tubes**) carrying atmospheric air within the body.
- **Most aquatic arthropods and molluscs:** special vascularised structures, **gills** (branchial respiration). **Terrestrial forms:** vascularised bags, **lungs** (pulmonary respiration).
- **Vertebrates:** fishes use gills; reptiles, birds and mammals respire through lungs; **amphibians** such as frogs use lungs and can also respire through their **moist skin** (cutaneous respiration).

**Human respiratory system.** A pair of **external nostrils** opens out above the upper lip and leads through the **nasal passage** to the **nasal chamber**, which opens into the **pharynx**, a common passage for food and air. The pharynx opens through the **larynx** into the **trachea**. The larynx is a cartilaginous box that helps in sound production and is called the **sound box**. During swallowing the glottis is covered by the **epiglottis**, a thin elastic cartilaginous flap, to prevent the entry of food into the larynx.

The **trachea** is a straight tube extending up to the mid-thoracic cavity, where it divides at the level of the **fifth thoracic vertebra** into right and left **primary bronchi**. Each bronchus undergoes repeated divisions into secondary and tertiary bronchi and **bronchioles**, ending in very thin **terminal bronchioles**. The tracheae, primary, secondary and tertiary bronchi and initial bronchioles are supported by **incomplete cartilaginous rings**. Each terminal bronchiole gives rise to many very thin, irregular-walled, vascularised bag-like structures called **alveoli**. The branching network of bronchi, bronchioles and alveoli makes up the **lungs**.

The two lungs are covered by a **double-layered pleura**, with **pleural fluid** between the layers that **reduces friction** on the lung surface. The outer pleural membrane is in close contact with the thoracic lining and the inner one with the lung surface.

- **Conducting part:** from the external nostrils up to the terminal bronchioles; transports air to the alveoli, clears it of foreign particles, **humidifies** it and brings it to **body temperature**.
- **Exchange (respiratory) part:** the **alveoli and their ducts**, the sites of actual diffusion of oxygen and carbon dioxide between blood and air.

The lungs lie in the **thoracic chamber**, which is **anatomically air-tight**: it is formed dorsally by the **vertebral column**, ventrally by the **sternum**, laterally by the **ribs** and on the lower side by the dome-shaped **diaphragm**. Any change in its volume is reflected in the lung (pulmonary) cavity, which is essential for breathing because we cannot directly alter the pulmonary volume.

**Steps of respiration:** (i) breathing or pulmonary ventilation; (ii) diffusion of gases (oxygen and carbon dioxide) across the alveolar membrane; (iii) transport of gases by the blood; (iv) diffusion of oxygen and carbon dioxide between blood and tissues; (v) utilisation of oxygen by the cells for catabolic reactions and the resultant release of carbon dioxide (cellular respiration).`,
      [kt('Epiglottis', 'A thin elastic cartilaginous flap that covers the glottis during swallowing, so that food does not enter the larynx.'), kt('Alveoli', 'Very thin, irregular-walled, vascularised bag-like structures at the ends of the terminal bronchioles; the sites of gas exchange.'), kt('Pleura', 'The double membrane around each lung, with pleural fluid between the layers that reduces friction.'), kt('Conducting part', 'The airway from the external nostrils to the terminal bronchioles, which cleans, humidifies and warms the air.')],
      V.resp,
      [1],
    ),
    sec(
      '2. Mechanism of breathing and respiratory volumes',
      `Breathing involves **inspiration**, during which atmospheric air is drawn in, and **expiration**, by which alveolar air is released. Air moves because a **pressure gradient** is created between the lungs and the atmosphere. **Inspiration** occurs when the pressure within the lungs (**intra-pulmonary pressure**) is **less than atmospheric pressure**, that is, when there is a negative pressure in the lungs with respect to the atmosphere. **Expiration** occurs when the intra-pulmonary pressure is **higher than atmospheric pressure**.

The **diaphragm** and a specialised set of muscles, the **external and internal intercostals** between the ribs, help to generate these gradients.
- **Inspiration:** the **diaphragm contracts**, increasing the volume of the thoracic chamber in the **antero-posterior axis**; the **external intercostal muscles contract**, lifting the ribs and the sternum and increasing the volume in the **dorso-ventral axis**. The increase in thoracic volume causes a similar increase in pulmonary volume, the intra-pulmonary pressure falls below atmospheric pressure, and air moves into the lungs.
- **Expiration:** the diaphragm and the intercostal muscles **relax**, returning the diaphragm and sternum to their normal positions; the thoracic and pulmonary volumes decrease, the intra-pulmonary pressure rises slightly above atmospheric pressure, and air is expelled.
- Additional muscles in the **abdomen** can increase the strength of inspiration and expiration.

A healthy human breathes **12–16 times a minute**. The volume of air involved in breathing movements can be estimated with a **spirometer**, which helps in the clinical assessment of pulmonary functions.

**Respiratory volumes** (typical adult values; individual values vary with age, sex, size and fitness):
- **Tidal volume (TV):** volume of air inspired or expired during a normal respiration, about **500 mL**; a healthy person can inspire or expire about **6000 to 8000 mL of air per minute**.
- **Inspiratory reserve volume (IRV):** additional volume a person can inspire by a forcible inspiration, about **2500–3000 mL**.
- **Expiratory reserve volume (ERV):** additional volume a person can expire by a forcible expiration, about **1000–1100 mL**.
- **Residual volume (RV):** volume of air remaining in the lungs even after a forcible expiration, about **1100–1200 mL**.

**Respiratory capacities** are sums of volumes (values with the lower and upper ends of the ranges):
- **Inspiratory capacity (IC)** = TV + IRV: total air a person can inspire after a normal expiration (${CAP_LOW.IC}–${CAP_HIGH.IC} mL).
- **Expiratory capacity (EC)** = TV + ERV: total air a person can expire after a normal inspiration (${CAP_LOW.EC}–${CAP_HIGH.EC} mL).
- **Functional residual capacity (FRC)** = ERV + RV: air that remains in the lungs after a normal expiration (${CAP_LOW.FRC}–${CAP_HIGH.FRC} mL).
- **Vital capacity (VC)** = ERV + TV + IRV: the maximum volume of air a person can breathe in after a forced expiration, or breathe out after a forced inspiration (${CAP_LOW.VC}–${CAP_HIGH.VC} mL).
- **Total lung capacity (TLC)** = RV + ERV + TV + IRV, or VC + RV: total air in the lungs at the end of a forced inspiration (${CAP_LOW.TLC}–${CAP_HIGH.TLC} mL).

The lower set uses TV ${LOW.TV}, IRV ${LOW.IRV}, ERV ${LOW.ERV}, RV ${LOW.RV} mL; the upper set uses TV ${HIGH.TV}, IRV ${HIGH.IRV}, ERV ${HIGH.ERV}, RV ${HIGH.RV} mL. Because residual volume never leaves the lungs, a spirometer cannot measure RV, FRC or TLC directly.`,
      [kt('Intra-pulmonary pressure', 'The pressure of the air inside the lungs; below atmospheric in inspiration and above it in expiration.'), kt('Tidal volume', 'The volume of air inspired or expired in a normal breath, about 500 mL.'), kt('Residual volume', 'The air left in the lungs even after a forcible expiration, about 1100–1200 mL.'), kt('Vital capacity', 'ERV + TV + IRV: the most air that can be breathed out after a forced inspiration.')],
      V.mech,
      [2],
      [V.spiro],
      [
        { label: 'Vital capacity', latex: '\\text{VC} = \\text{ERV} + \\text{TV} + \\text{IRV}' },
        { label: 'Total lung capacity', latex: '\\text{TLC} = \\text{VC} + \\text{RV}' },
      ],
    ),
    sec(
      '3. Exchange and transport of gases; regulation of respiration',
      `**Exchange of gases.** The **alveoli** are the primary sites of exchange of gases; exchange also occurs between blood and tissues. Oxygen and carbon dioxide are exchanged at these sites by **simple diffusion**, mainly based on pressure or concentration gradients. The **solubility** of the gases and the **thickness of the membranes** involved are also important.

The pressure contributed by an individual gas in a mixture is its **partial pressure**, written pO₂ for oxygen and pCO₂ for carbon dioxide.

| Gas | Atmospheric air | Alveoli | Deoxygenated blood | Oxygenated blood | Tissues |
|---|---|---|---|---|---|
| O₂ (mm Hg) | ${PP.air.o2} | ${PP.alveoli.o2} | ${PP.deoxy.o2} | ${PP.oxy.o2} | ${PP.tissues.o2} |
| CO₂ (mm Hg) | ${PP.air.co2} | ${PP.alveoli.co2} | ${PP.deoxy.co2} | ${PP.oxy.co2} | ${PP.tissues.co2} |

The data show a concentration gradient for oxygen from alveoli to blood and from blood to tissues, and the opposite gradient for carbon dioxide, from tissues to blood and from blood to alveoli. The solubility of carbon dioxide is **${SOLUBILITY[0]}–${SOLUBILITY[1]} times higher** than that of oxygen, so the amount of carbon dioxide that can diffuse through the diffusion membrane per unit difference in partial pressure is much higher than that of oxygen.

The **diffusion membrane** has three major layers: the thin **squamous epithelium of the alveoli**, the **endothelium of the alveolar capillaries** and the **basement substance** in between; its total thickness is **much less than a millimetre**. All the factors in our body are therefore favourable for diffusion of oxygen from alveoli to tissues and of carbon dioxide from tissues to alveoli.

**Transport of oxygen.** About **${O2_SHARE.rbc} percent** of oxygen is transported by the **RBCs** and the remaining **${O2_SHARE.plasma} percent** is carried in a dissolved state in the **plasma**. **Haemoglobin** is a red-coloured, iron-containing pigment in the RBCs. Oxygen binds with haemoglobin reversibly to form **oxyhaemoglobin**; each haemoglobin molecule can carry a maximum of **four** molecules of oxygen. Binding depends primarily on **pO₂**; **pCO₂**, **hydrogen ion concentration** and **temperature** also interfere. A plot of the percentage saturation of haemoglobin with oxygen against pO₂ gives a **sigmoid** curve, the **oxygen dissociation curve**. In the **alveoli**, high pO₂, low pCO₂, fewer H⁺ ions and lower temperature favour the **formation of oxyhaemoglobin**; in the **tissues**, low pO₂, high pCO₂, more H⁺ ions and higher temperature favour **dissociation** of oxygen. Every **100 mL** of oxygenated blood can deliver around **${PER100.o2} mL of oxygen** to the tissues under normal physiological conditions. (The saturation values printed on the curve, about 97 and 75 percent, come from a standard model and are illustrative.)

**Transport of carbon dioxide.** About **${CO2_SHARE.carbamino} percent** of carbon dioxide is carried by haemoglobin as **carbamino-haemoglobin**, about **${CO2_SHARE.bicarbonate} percent** as **bicarbonate**, and about **${CO2_SHARE.dissolved} percent** dissolved in plasma. Binding is related to pCO₂; pO₂ is a major factor that affects it. In the tissues, where pCO₂ is high and pO₂ low, more carbon dioxide binds; in the alveoli, where pCO₂ is low and pO₂ high, carbon dioxide dissociates from carbamino-haemoglobin. RBCs contain a very high concentration of the enzyme **carbonic anhydrase** (minute quantities are present in plasma), which catalyses the reaction in both directions:

$$\\ce{CO2 + H2O <=> H2CO3 <=> HCO3- + H+}$$

At the tissues carbon dioxide is trapped as bicarbonate; at the alveoli the reaction runs the opposite way and carbon dioxide is released. Every **100 mL** of deoxygenated blood delivers approximately **${PER100.co2} mL of carbon dioxide** to the alveoli.

**Regulation of respiration.** Humans can moderate the respiratory rhythm to suit the demands of the body tissues; this is done by the **neural system**.
- A specialised centre in the **medulla**, the **respiratory rhythm centre**, is primarily responsible for this regulation.
- The **pneumotaxic centre** in the **pons** can moderate the functions of the rhythm centre; its neural signal can reduce the duration of inspiration and thereby alter the respiratory rate.
- A **chemosensitive area** situated adjacent to the rhythm centre is highly sensitive to **carbon dioxide and hydrogen ions**; an increase in these activates it, and it signals the rhythm centre to make adjustments so that these substances are eliminated.
- **Receptors associated with the aortic arch and carotid artery** can also recognise changes in carbon dioxide and hydrogen ion concentration and send signals to the rhythm centre.
- The role of **oxygen** in the regulation of respiratory rhythm is **quite insignificant**.`,
      [kt('Partial pressure', 'The pressure contributed by one gas in a mixture of gases, for example pO₂ or pCO₂.'), kt('Diffusion membrane', 'Squamous epithelium of the alveolus, basement substance and capillary endothelium; much less than a millimetre thick.'), kt('Oxygen dissociation curve', 'The sigmoid plot of percentage saturation of haemoglobin with oxygen against pO₂.'), kt('Carbonic anhydrase', 'Enzyme, abundant in RBCs, that speeds up the interconversion of carbon dioxide and water with bicarbonate and hydrogen ions.'), kt('Pneumotaxic centre', 'Centre in the pons that can reduce the duration of inspiration and so change the breathing rate.')],
      V.alveolus,
      [3],
      [V.odc],
    ),
    sec(
      '4. Disorders of the respiratory system',
      `- **Asthma:** difficulty in breathing causing **wheezing**, due to **inflammation of the bronchi and bronchioles**.
- **Emphysema:** a **chronic** disorder in which the **alveolar walls are damaged**, due to which the **respiratory surface is decreased**. One of the major causes is **cigarette smoking**.
- **Occupational respiratory disorders:** in certain industries, especially those involving **grinding or stone-breaking**, so much dust is produced that the defence mechanism of the body cannot fully cope with it. Long exposure can give rise to **inflammation** leading to **fibrosis** (proliferation of fibrous tissues) and thus cause serious lung damage. Workers in such industries should wear **protective masks**.

The conducting part normally traps and clears foreign particles; these disorders appear when irritants inflame the airways, when the alveolar surface is destroyed, or when dust exposure overwhelms the body’s defences.`,
      [kt('Asthma', 'Difficulty in breathing with wheezing, caused by inflammation of the bronchi and bronchioles.'), kt('Emphysema', 'Chronic disorder in which alveolar walls are damaged and the respiratory surface decreases; smoking is a major cause.'), kt('Fibrosis', 'Proliferation of fibrous tissue, here in the lungs after long exposure to dust.')],
      table(['Disorder', 'Part affected', 'Main point'], [['Asthma', 'Bronchi and bronchioles', 'Inflammation; wheezing'], ['Emphysema', 'Alveolar walls', 'Less respiratory surface; smoking'], ['Occupational disorder', 'Lung tissue', 'Dust causes fibrosis; masks prevent it']], 'Table comparing three respiratory disorders'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the diaphragm **relaxes** during inspiration (it contracts and flattens).
- Mixing up the axes: diaphragm changes the **antero-posterior** axis, external intercostals the **dorso-ventral** axis.
- Calling vital capacity the total air in the lungs (that is total lung capacity; VC excludes residual volume).
- Claiming a spirometer measures residual volume.
- Writing that most carbon dioxide travels as carbamino-haemoglobin (most travels as **bicarbonate**, about 70 percent).
- Placing the pneumotaxic centre in the medulla (it is in the **pons**).
- Saying a low oxygen level is the main stimulus for breathing (carbon dioxide and H⁺ are; oxygen’s role is insignificant).

**How marks are usually awarded**
- 1-mark items: name a structure, a volume, a percentage, a centre or a disorder; assertion-reason on mechanism or transport.
- 2–3-mark answers: steps of respiration; conducting and exchange parts; capacities as sums; transport of carbon dioxide with the equation; asthma vs emphysema.
- 5-mark answers: the respiratory system with a diagram; the mechanism of breathing; exchange and transport of gases; regulation.
- Case-based items: spirometer readings, partial-pressure tables, exercise and breathing, dust exposure at work, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Respiratory surface of an earthworm?', 'Its moist cuticle.', 'fact', 1),
    fc(2, 'How do insects take air into the body?', 'Through a network of tracheal tubes.', 'fact', 1),
    fc(3, 'What is cutaneous respiration?', 'Exchange of gases through moist skin, as in frogs.', 'definition', 1),
    fc(4, 'Why is the larynx called the sound box?', 'It is a cartilaginous box that helps in sound production.', 'concept', 1),
    fc(5, 'Role of the epiglottis?', 'Covers the glottis during swallowing so food does not enter the larynx.', 'concept', 1),
    fc(6, 'Where does the trachea divide?', 'At the level of the fifth thoracic vertebra, into right and left primary bronchi.', 'fact', 1),
    fc(7, 'What supports the trachea and bronchi?', 'Incomplete cartilaginous rings.', 'fact', 1),
    fc(8, 'Functions of the conducting part?', 'Transports, cleans, humidifies and warms (to body temperature) the air.', 'concept', 1),
    fc(9, 'Boundaries of the thoracic chamber?', 'Vertebral column (dorsal), sternum (ventral), ribs (lateral), diaphragm (floor).', 'fact', 1),
    fc(10, 'Five steps of respiration?', 'Breathing, alveolar diffusion, transport, tissue diffusion, cellular respiration.', 'concept', 1),
    fc(11, 'When does inspiration occur?', 'When intra-pulmonary pressure is less than atmospheric pressure.', 'concept', 2),
    fc(12, 'Diaphragm in inspiration?', 'Contracts; increases volume in the antero-posterior axis.', 'concept', 2),
    fc(13, 'External intercostals in inspiration?', 'Contract; lift ribs and sternum; increase volume in the dorso-ventral axis.', 'concept', 2),
    fc(14, 'Normal breathing rate at rest?', '12–16 times a minute.', 'fact', 2),
    fc(15, 'Tidal volume?', 'About 500 mL; 6000–8000 mL of air per minute.', 'fact', 2),
    fc(16, 'IRV and ERV?', 'IRV 2500–3000 mL; ERV 1000–1100 mL.', 'fact', 2),
    fc(17, 'Residual volume?', 'About 1100–1200 mL; stays in the lungs after forcible expiration.', 'fact', 2),
    fc(18, 'Vital capacity?', 'ERV + TV + IRV.', 'formula', 2),
    fc(19, 'Functional residual capacity?', 'ERV + RV.', 'formula', 2),
    fc(20, 'Total lung capacity?', 'VC + RV (= RV + ERV + TV + IRV).', 'formula', 2),
    fc(21, 'pO₂ and pCO₂ in alveoli?', `${PP.alveoli.o2} and ${PP.alveoli.co2} mm Hg.`, 'fact', 3),
    fc(22, 'Three layers of the diffusion membrane?', 'Alveolar squamous epithelium, basement substance, capillary endothelium.', 'concept', 3),
    fc(23, 'How much more soluble is CO₂ than O₂?', '20–25 times.', 'fact', 3),
    fc(24, 'How is oxygen carried?', `About ${O2_SHARE.rbc} percent by RBCs (oxyhaemoglobin), ${O2_SHARE.plasma} percent dissolved in plasma.`, 'fact', 3),
    fc(25, 'Shape of the oxygen dissociation curve?', 'Sigmoid.', 'fact', 3),
    fc(26, 'How is carbon dioxide carried?', `20–25 percent carbamino-haemoglobin, ${CO2_SHARE.bicarbonate} percent bicarbonate, ${CO2_SHARE.dissolved} percent dissolved.`, 'fact', 3),
    fc(27, 'Enzyme for bicarbonate formation?', 'Carbonic anhydrase, abundant in RBCs.', 'fact', 3),
    fc(28, 'Location of the respiratory rhythm centre and pneumotaxic centre?', 'Rhythm centre in the medulla; pneumotaxic centre in the pons.', 'fact', 3),
    fc(29, 'What does the chemosensitive area respond to?', 'A rise in carbon dioxide and hydrogen ions.', 'concept', 3),
    fc(30, 'Asthma, emphysema, occupational disorder?', 'Inflamed bronchi and bronchioles; damaged alveolar walls; dust-induced fibrosis.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
