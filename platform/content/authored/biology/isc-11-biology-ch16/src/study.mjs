// ISC 11 Biology ch16 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { P1, DEAD, CO2_FORMS, P50, ALT, PP } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Breathing and Exchange of Gases — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Respiratory organs in animals and the human respiratory system',
      `**Respiration in animals (recall).** Animals take in oxygen and give out carbon dioxide by different organs: **sponges, Hydra and flatworms** by simple diffusion across the general body surface; the **earthworm** through its moist cuticle; **insects** through a network of **tracheal tubes** that open by spiracles; **prawns and fishes** by **gills** (branchial respiration); **amphibians** such as the frog by moist skin, buccal cavity and lungs; **reptiles, birds and mammals** by **lungs** (pulmonary respiration).

**The human respiratory system** has a **conducting part** and an **exchange part**. Air enters through the **external nostrils** into the **nasal chamber**, whose hairs, mucus and rich blood supply filter, warm and moisten it. It then passes the **pharynx** (a common passage for food and air), the **larynx** (the cartilaginous sound box; the **epiglottis** covers the glottis during swallowing), the **trachea** (a straight tube, held open by **incomplete C-shaped cartilage rings**, lined by ciliated epithelium that sweeps mucus and dust upward), and the **right and left primary bronchi**. Each bronchus divides repeatedly into secondary and tertiary bronchi and **bronchioles**, ending in thin-walled, vascularised **alveoli**, the sites of gas exchange.

The **lungs** lie in the air-tight **thoracic chamber**, bounded dorsally by the vertebral column, ventrally by the sternum, laterally by the ribs and below by the **diaphragm**. Each lung is covered by a **double-layered pleura** enclosing a little pleural fluid, which reduces friction. The **right lung has three lobes** and the **left lung two**. The alveoli are so numerous that the exchange surface is far larger than the body surface; textbooks give different figures, so no figure is needed in answers.

**Drawing.** In a labelled diagram show nostrils, nasal chamber, pharynx, larynx with epiglottis, trachea with rings, two bronchi, bronchioles, alveoli, both lungs with lobes, and the diaphragm.`,
      [kt('Conducting part', 'Passages that carry air to the alveoli without gas exchange: nostrils to bronchioles.'), kt('Alveolus', 'A thin-walled, vascularised sac at the end of a bronchiole where gases are exchanged.'), kt('Epiglottis', 'A cartilage flap that covers the glottis during swallowing so food does not enter the larynx.'), kt('Pleura', 'The double membrane around each lung; the fluid between its layers reduces friction.')],
      V.resp,
      [1],
      [table(['Animals', 'Respiratory organ'], [['Sponges, Hydra, flatworms', 'Body surface'], ['Earthworm', 'Moist cuticle'], ['Insects', 'Tracheal tubes'], ['Prawn, fishes', 'Gills'], ['Frog', 'Skin, buccal cavity, lungs'], ['Reptiles, birds, mammals', 'Lungs']], 'Table of respiratory organs in animals')],
    ),
    sec(
      '2. Mechanism of breathing, pulmonary volumes and capacities',
      `**Breathing** is the movement of air between the atmosphere and the alveoli, brought about by a difference in pressure. The lungs are in an air-tight chest, so a change in chest volume changes the volume of the lungs, and by **Boyle's law** (pressure falls as volume rises at constant temperature) the pressure inside them.

**Inspiration.** The **diaphragm contracts** and flattens, increasing the volume of the chest from top to bottom; the **external intercostal muscles contract**, lifting the ribs and sternum up and out and increasing the volume front to back. The **intra-pulmonary pressure falls below atmospheric pressure** and air flows in. **Expiration.** The diaphragm and external intercostals relax, the diaphragm returns to its dome shape and the ribs and sternum fall; the volume decreases, the pressure rises above atmospheric and air flows out. Quiet expiration is passive. **Forced inspiration** uses extra muscles of the chest and neck; **forced expiration** uses the **internal intercostals and abdominal muscles**. A healthy adult breathes about 12 to 16 times a minute.

**Volumes and capacities** are measured with a **spirometer**:
- **Tidal volume (TV):** air breathed in or out in one quiet breath, about 500 mL.
- **Inspiratory reserve volume (IRV):** extra air that can be breathed in after a quiet inspiration, 2500 to 3000 mL.
- **Expiratory reserve volume (ERV):** extra air that can be breathed out after a quiet expiration, 1000 to 1100 mL.
- **Residual volume (RV):** air left in the lungs after the strongest expiration, 1100 to 1200 mL; it keeps the alveoli from collapsing and cannot be measured by simple spirometry.
- **Inspiratory capacity (IC)** = TV + IRV. **Expiratory capacity (EC)** = TV + ERV. **Functional residual capacity (FRC)** = ERV + RV. **Vital capacity (VC)** = IRV + TV + ERV (3500 to 4500 mL). **Total lung capacity (TLC)** = VC + RV (5000 to 6000 mL).

**Worked values.** For a student with TV ${P1.tv}, IRV ${P1.irv}, ERV ${P1.erv} and RV ${P1.rv} mL: IC = ${P1.ic}, EC = ${P1.ec}, FRC = ${P1.frc}, VC = ${P1.vc} and TLC = ${P1.tlc} mL.

**Ventilation.** Pulmonary ventilation = TV × breaths per minute. Air in the conducting passages (about ${DEAD} mL, the dead space) does not reach the alveoli, so alveolar ventilation = (TV − dead space) × rate; slow deep breathing ventilates the alveoli better than fast shallow breathing.`,
      [kt('Tidal volume', 'Volume of air inspired or expired in one normal breath.'), kt('Vital capacity', 'The maximum air that can be breathed out after a maximum inspiration: IRV + TV + ERV.'), kt('Residual volume', 'Volume of air that remains in the lungs after the strongest expiration.'), kt('Functional residual capacity', 'ERV + RV: the air that stays in the lungs after a quiet expiration.')],
      V.mech,
      [2],
      [V.spiro, table(['Term', 'Value (mL)'], [['TV', String(P1.tv)], ['IRV', String(P1.irv)], ['ERV', String(P1.erv)], ['RV', String(P1.rv)], ['VC', String(P1.vc)], ['TLC', String(P1.tlc)]], 'Table of example lung volumes of a student')],
    ),
    sec(
      '3. Pulmonary exchange, transport of oxygen and carbon dioxide, chloride shift',
      `**Exchange of gases** takes place at the alveoli and at the tissues by **simple diffusion**, driven by differences in **partial pressure** (pO₂, pCO₂). The **diffusion membrane** has three thin layers: the squamous epithelium of the alveoli, the endothelium of the alveolar capillaries and the basement substance between them, together thinner than a millimetre. Textbook values (mm Hg): atmospheric air pO₂ ${PP.atmosphere.o2}, pCO₂ ${PP.atmosphere.co2}; alveolar air ${PP.alveolar.o2} and ${PP.alveolar.co2}; deoxygenated blood ${PP.deoxy.o2} and ${PP.deoxy.co2}; oxygenated blood ${PP.oxy.o2} and ${PP.oxy.co2}; tissues ${PP.tissue.o2} and ${PP.tissue.co2}. The gradient for CO₂ is small, but CO₂ is **20 to 25 times more soluble** than O₂, so the amounts diffused are large. The partial pressure of oxygen in air is 0.209 times the barometric pressure, so it falls with height (${ALT.map((a) => `${a.site.toLowerCase()}: ${a.po2} mm Hg`).join('; ')}).

**Transport of oxygen.** About **97 percent** is carried by **haemoglobin** in red cells as **oxyhaemoglobin**; about **3 percent** is dissolved in plasma. Each haemoglobin molecule can bind **four** oxygen molecules, and one gram of haemoglobin binds about 1.34 mL of oxygen (this figure is from physiology texts, not the syllabus).

**The oxyhaemoglobin dissociation curve** is a plot of **percentage saturation of haemoglobin against pO₂**. It is **sigmoid**: nearly full saturation in the lungs (about 97 percent at pO₂ 100 mm Hg), about 75 percent at the pO₂ of resting tissue (40 mm Hg), so a quarter of the oxygen is released there. The curve **shifts to the right** (haemoglobin gives up oxygen more easily, the **Bohr effect**) with **higher pCO₂, higher H⁺ concentration (lower pH) and higher temperature**, as in active muscle; it shifts to the **left** with the opposite conditions, and with **foetal haemoglobin**, which takes oxygen from the mother's blood. The curves in this chapter are drawn from a standard formula for illustration (half-saturation at about ${P50.normal}, ${P50.right} and ${P50.left} mm Hg); books show similar curves.

**Transport of carbon dioxide.** About **${CO2_FORMS.bicarbonate} percent** is carried as **bicarbonate ions**, about **20 to 25 percent** (here ${CO2_FORMS.carbamino}) as **carbamino-haemoglobin** and about **${CO2_FORMS.dissolved} percent** dissolved in plasma. In the red cells at the tissues, the enzyme **carbonic anhydrase** (also present in small amounts in plasma) speeds the reaction CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Haemoglobin buffers the H⁺. HCO₃⁻ diffuses out into plasma, and **Cl⁻ moves into the red cell** to keep it electrically neutral: the **chloride shift** (Hamburger shift). At the alveoli the reactions reverse and CO₂ diffuses out. Each 100 mL of deoxygenated blood delivers about 4 mL of CO₂ to the alveoli.`,
      [kt('Partial pressure', 'The pressure contributed by one gas in a mixture of gases.'), kt('Oxyhaemoglobin', 'Haemoglobin combined with oxygen.'), kt('Bohr effect', 'The shift of the dissociation curve to the right by higher pCO₂, acidity or temperature, so that more oxygen is released.'), kt('Chloride shift', 'Movement of chloride ions into red cells as bicarbonate ions move out, keeping the cell electrically neutral.'), kt('Carbonic anhydrase', 'The enzyme that speeds the combination of carbon dioxide with water in red cells.')],
      V.odc,
      [3],
      [V.cl, table(['Site', 'pO₂', 'pCO₂'], [['Alveolar air', String(PP.alveolar.o2), String(PP.alveolar.co2)], ['Deoxygenated blood', String(PP.deoxy.o2), String(PP.deoxy.co2)], ['Oxygenated blood', String(PP.oxy.o2), String(PP.oxy.co2)], ['Tissues', String(PP.tissue.o2), String(PP.tissue.co2)]], 'Table of partial pressures at four sites')],
    ),
    sec(
      '4. Regulation of breathing and respiratory disorders',
      `**Regulation.** The rhythm of breathing is set by the **respiratory rhythm centre** in the **medulla oblongata**. The **pneumotaxic centre** in the **pons** moderates it: it can reduce the duration of inspiration and so alter the rate. A **chemosensitive area**, close to the rhythm centre, is highly sensitive to **CO₂ and hydrogen ions**; an increase in either activates the centre to make a change that eliminates them (faster, deeper breathing). **Receptors in the aortic arch and carotid artery** also recognise changes in CO₂ and H⁺ and send signals to the rhythm centre. The role of oxygen in regulation is quite insignificant in health. Breathing can be held voluntarily for a short time, but rising CO₂ eventually forces a breath.

**Respiratory disorders.**
- **Asthma:** difficulty in breathing causing wheezing, due to **inflammation of bronchi and bronchioles**, often triggered by an allergen such as pollen or dust.
- **Emphysema:** a chronic disorder in which the **alveolar walls are damaged**, decreasing the respiratory surface; **cigarette smoking** is a major cause. Breathlessness and a barrel-shaped chest are common signs.
- **Occupational respiratory disorders:** long exposure to dust in industries such as grinding or stone-breaking (**silicosis**, from silica), **asbestosis** (asbestos fibre) and coal-mining lung disease cause inflammation and **fibrosis** of the upper parts of the lungs. Workers should wear protective masks and the workplace should be ventilated. Books name different examples, and the syllabus asks only for the cause and symptoms of such disorders.`,
      [kt('Respiratory rhythm centre', 'A centre in the medulla that sets the rhythm of breathing.'), kt('Pneumotaxic centre', 'A centre in the pons that moderates the rhythm centre by reducing the duration of inspiration.'), kt('Chemosensitive area', 'An area near the rhythm centre that is sensitive to CO₂ and H⁺.'), kt('Emphysema', 'A disorder in which damaged alveolar walls reduce the respiratory surface.'), kt('Asthma', 'Inflammation of the bronchi and bronchioles causing wheezing and difficulty in breathing.')],
      table(['Disorder', 'Part affected', 'Cause'], [['Asthma', 'Bronchi and bronchioles', 'Allergens, inflammation'], ['Emphysema', 'Alveoli', 'Smoking, damaged walls'], ['Occupational disorder', 'Lung tissue (fibrosis)', 'Dust at work']], 'Table of respiratory disorders'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying air is "sucked in" without stating that the volume rises and the pressure falls.
- Including the residual volume in the vital capacity, or leaving it out of the total lung capacity.
- Saying that quiet expiration needs muscle contraction.
- Writing that chloride ions leave the red cell with bicarbonate (they enter).
- Giving only the shape of the dissociation curve and not the cause and direction of a shift.
- Confusing asthma (airways) with emphysema (alveoli).

**How marks are usually awarded**
- 1-mark subparts: a definition, a term, a location, a give-a-reason, a sum of volumes.
- 2–3-mark questions: inspiration and expiration, volumes from a record, the chloride shift, factors shifting the curve, the three respiratory centres.
- 5-mark questions in parts: a labelled diagram of the respiratory system; capacities from a spirometer tracing; transport of oxygen and carbon dioxide; regulation and disorders.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Respiratory organ of the earthworm?', 'Moist cuticle (skin).', 'fact', 1),
    fc(2, 'Respiratory organ of insects?', 'Tracheal tubes opening by spiracles.', 'fact', 1),
    fc(3, 'Which part covers the glottis during swallowing?', 'The epiglottis.', 'fact', 1),
    fc(4, 'Why does the trachea not collapse?', 'Incomplete C-shaped cartilage rings hold it open.', 'concept', 1),
    fc(5, 'Lobes of the right and left lungs?', 'Right three, left two.', 'fact', 1),
    fc(6, 'Where does gas exchange take place in the human lung?', 'In the alveoli.', 'fact', 1),
    fc(7, 'Function of the pleural fluid?', 'Reduces friction between the lung and the chest wall.', 'concept', 1),
    fc(8, 'Which muscles bring about quiet inspiration?', 'Diaphragm and external intercostals.', 'fact', 2),
    fc(9, 'Pressure change during inspiration?', 'Intra-pulmonary pressure falls below atmospheric.', 'concept', 2),
    fc(10, 'Which muscles help forced expiration?', 'Internal intercostals and abdominal muscles.', 'fact', 2),
    fc(11, 'Tidal volume of a healthy adult?', 'About 500 mL.', 'fact', 2),
    fc(12, 'Define inspiratory reserve volume.', 'Extra air that can be breathed in after a quiet inspiration.', 'definition', 2),
    fc(13, 'Define residual volume.', 'Air left in the lungs after the strongest expiration.', 'definition', 2),
    fc(14, 'Vital capacity formula?', 'IRV + TV + ERV.', 'formula', 2),
    fc(15, 'Functional residual capacity formula?', 'ERV + RV.', 'formula', 2),
    fc(16, 'Total lung capacity formula?', 'VC + RV.', 'formula', 2),
    fc(17, 'Alveolar ventilation formula?', '(Tidal volume − dead space) × breaths per minute.', 'formula', 2),
    fc(18, 'Which direction does O₂ diffuse at the alveolus?', 'From alveolar air (higher pO₂) into the blood.', 'concept', 3),
    fc(19, 'Why does CO₂ diffuse well despite a small gradient?', 'It is 20 to 25 times more soluble than O₂.', 'concept', 3),
    fc(20, 'How is most oxygen carried?', 'As oxyhaemoglobin (about 97 percent).', 'fact', 3),
    fc(21, 'How many O₂ molecules can one Hb molecule bind?', 'Four.', 'fact', 3),
    fc(22, 'Shape of the oxygen dissociation curve?', 'Sigmoid (S-shaped).', 'fact', 3),
    fc(23, 'Three factors that shift the curve to the right?', 'Higher pCO₂, higher H⁺ concentration, higher temperature.', 'exam-tip', 3),
    fc(24, 'How is most CO₂ carried?', 'As bicarbonate ions (about 70 percent).', 'fact', 3),
    fc(25, 'Enzyme that speeds CO₂ + H₂O → H₂CO₃?', 'Carbonic anhydrase.', 'fact', 3),
    fc(26, 'What is the chloride shift?', 'Cl⁻ enters the red cell as HCO₃⁻ leaves it.', 'definition', 3),
    fc(27, 'Where is the respiratory rhythm centre?', 'In the medulla oblongata.', 'fact', 4),
    fc(28, 'Role of the pneumotaxic centre?', 'Moderates the rhythm centre by shortening inspiration (in the pons).', 'concept', 4),
    fc(29, 'Main cause of emphysema?', 'Damage to alveolar walls, commonly by cigarette smoking.', 'concept', 4),
    fc(30, 'What is asthma?', 'Inflammation of bronchi and bronchioles causing wheezing and difficulty in breathing.', 'definition', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
