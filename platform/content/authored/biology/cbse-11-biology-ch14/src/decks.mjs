// ch14 Breathing and Exchange of Gases — two decks: Part 1 (t01, t02), Part 2 (t03, t04).
import { sl, deck, table, flow, chem, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { RESP, ALVEOLUS, MECH, SPIROGRAM, ODCURVE } from './svgs.mjs';
import { HIGH, CAP_HIGH, LOW, CAP_LOW, PP, GRAD, O2_SHARE, CO2_SHARE, PER100, SOLUBILITY, WE1, WE2, WE3 } from './calc.mjs';

export const V = {
  resp: svgV(RESP, 'Labelled front view of the human respiratory system from the nasal chamber to the alveoli, with pleura and diaphragm'),
  alveolus: svgV(ALVEOLUS, 'Alveolus beside a capillary, showing oxygen diffusing into the blood, carbon dioxide diffusing out, partial pressures and the three-layered diffusion membrane'),
  mech: svgV(MECH, 'Chest during inspiration with a flattened diaphragm and raised ribs, and during expiration with a domed diaphragm'),
  spiro: svgV(SPIROGRAM, 'Spirogram trace with brackets for tidal, inspiratory reserve, expiratory reserve and residual volumes and the four capacities'),
  odc: svgV(ODCURVE, 'Sigmoid oxygen dissociation curve with points for alveoli and tissues and a right-shifted curve'),
};

const vt = (o) => `${o.TV}, ${o.IRV}, ${o.ERV}, ${o.RV}`;

export const deck1 = deck({
  part: 1,
  title: 'Breathing and Exchange of Gases — Part 1: Respiratory organs and the mechanism of breathing',
  goals: [
    'Relate the respiratory organs of different animals to their habitat and level of organisation',
    'Describe the human respiratory system and the conducting and exchange parts',
    'Explain inspiration and expiration in terms of muscles, volume and pressure',
    'Define the respiratory volumes and capacities and calculate one from the others',
  ],
  slides: [
    sl('title', 'Breathing and Exchange of Gases', {
      b: 'Part 1 — where animals take in oxygen, the human respiratory system, and how air is moved in and out of the lungs.',
      v: flow('LR', [['b', 'Breathing'], ['a', 'Diffusion at alveoli'], ['t', 'Transport by blood'], ['d', 'Diffusion at tissues'], ['c', 'Use of oxygen by cells']], [['b', 'a'], ['a', 't'], ['t', 'd'], ['d', 'c']], 'Flow of the five steps of respiration from breathing to the use of oxygen by cells'),
      n: 'Cells need oxygen to break down nutrients such as glucose for energy, and they release carbon dioxide, which is harmful and must be removed. Taking in atmospheric oxygen and giving out the carbon dioxide made by cells is called breathing, or more commonly, respiration.',
    }),
    sl('concept', 'Respiratory organs in animals', {
      b: 'The mechanism of breathing varies with the **habitat** and the **level of organisation** of the animal.',
      v: table(['Animals', 'Respiratory surface or organ'], [['Sponges, coelenterates, flatworms', 'Simple diffusion over the whole body surface'], ['Earthworms', 'Moist cuticle'], ['Insects', 'Network of tracheal tubes carrying air into the body'], ['Most aquatic arthropods and molluscs; fishes', 'Gills (branchial respiration)'], ['Terrestrial forms: amphibians, reptiles, birds, mammals', 'Lungs (pulmonary respiration); frogs also through moist skin (cutaneous respiration)']], 'Table of animal groups and their respiratory surfaces or organs'),
      n: 'Small and simple animals exchange gases over the whole body surface. An earthworm uses its moist cuticle and an insect sends air through tracheal tubes. Aquatic animals mostly use gills, while land vertebrates use lungs. A frog can also exchange gases through its moist skin.',
    }),
    sl('diagram', 'The human respiratory system', {
      b: 'Air passes from the **external nostrils** through the **nasal passage** and **nasal chamber** into the **pharynx**, a common passage for food and air, then through the **larynx** into the **trachea**. The trachea divides at the level of the **fifth thoracic vertebra** into the right and left **primary bronchi**, which branch into secondary and tertiary bronchi and **bronchioles**, ending in **alveoli**.',
      v: V.resp,
      n: 'The larynx is a cartilaginous box that helps in sound production, so it is called the sound box. During swallowing the glottis is covered by the epiglottis, a thin elastic flap of cartilage, so that food does not enter the larynx. The trachea, the bronchi and the first bronchioles are held open by incomplete rings of cartilage.',
    }),
    sl('concept', 'Conducting part and exchange part', {
      b: 'Each terminal bronchiole gives rise to many very thin, irregular-walled, vascularised bag-like **alveoli**. The branching network of bronchi, bronchioles and alveoli makes up the **lungs**.',
      v: table(['Part', 'Extent', 'Functions'], [['Conducting part', 'External nostrils up to the terminal bronchioles', 'Transports air to the alveoli, clears it of foreign particles, humidifies it and brings it to body temperature'], ['Exchange (respiratory) part', 'Alveoli and their ducts', 'Actual diffusion of oxygen and carbon dioxide between blood and air']], 'Table comparing the conducting and exchange parts of the respiratory system'),
      n: 'Most of the airway only conducts air. On the way it is cleaned, moistened and warmed or cooled to body temperature. Gases are exchanged with blood only in the alveoli and their ducts, the exchange part.',
    }),
    sl('check', 'Quick check: swallowing', {
      b: 'Which structure stops food from entering the larynx during swallowing?',
      n: 'Quick check. Think of the elastic flap above the glottis.',
      chk: 'epiglottis-mcq',
    }),
    sl('concept', 'The thoracic chamber and the pleura', {
      b: 'The lungs lie in the **thoracic chamber**, which is **anatomically air-tight**. Any change in its volume is reflected in the lung (pulmonary) cavity; we cannot directly alter the pulmonary volume.',
      v: table(['Boundary or covering', 'Formed by'], [['Dorsal side', 'Vertebral column'], ['Ventral side', 'Sternum'], ['Lateral sides', 'Ribs'], ['Lower side (floor)', 'Dome-shaped diaphragm'], ['Covering of each lung', 'Double-layered pleura with pleural fluid between the layers, which reduces friction on the lung surface']], 'Table of the boundaries of the thoracic chamber and the covering of the lungs'),
      n: 'The outer pleural membrane is in close contact with the lining of the thoracic chamber and the inner one with the lung surface. Because the chamber is sealed, changing its size changes the size of the lungs, and this is how we breathe.',
    }),
    sl('concept', 'Five steps of respiration', {
      b: 'Respiration involves the following steps.',
      v: flow('TB', [['1', 'Breathing (pulmonary ventilation): atmospheric air in, carbon dioxide-rich alveolar air out'], ['2', 'Diffusion of gases across the alveolar membrane'], ['3', 'Transport of gases by the blood'], ['4', 'Diffusion of oxygen and carbon dioxide between blood and tissues'], ['5', 'Utilisation of oxygen by cells for catabolic reactions and release of carbon dioxide (cellular respiration)']], [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']], 'Flow of the five steps of respiration'),
      n: 'Breathing only moves air. Gases then diffuse across the alveolar membrane, travel in the blood, diffuse again between blood and tissues, and finally oxygen is used by cells in cellular respiration, which is studied in another chapter.',
    }),
    sl('check', 'Quick check: pleura', {
      b: 'Judge the assertion and the reason about the covering of the lungs.',
      n: 'Quick check. What does the fluid between the two pleural layers do?',
      chk: 'pleura-ar',
    }),
    sl('diagram', 'Mechanism of breathing', {
      b: 'Breathing has two stages: **inspiration**, when air is drawn in, and **expiration**, when alveolar air is released. Air moves because of a **pressure gradient** between the lungs and the atmosphere, created with the help of the **diaphragm** and the **external and internal intercostal muscles** between the ribs.',
      v: V.mech,
      n: 'Inspiration happens when the pressure inside the lungs, the intra-pulmonary pressure, is less than atmospheric pressure, that is, when there is a negative pressure in the lungs. Expiration happens when the intra-pulmonary pressure is higher than atmospheric pressure.',
    }),
    sl('concept', 'Inspiration and expiration compared', {
      b: 'Increasing the thoracic volume increases the pulmonary volume, which lowers the intra-pulmonary pressure.',
      v: table(['Feature', 'Inspiration', 'Expiration'], [['Diaphragm', 'Contracts: volume rises in the antero-posterior axis', 'Relaxes and returns to its dome shape'], ['External intercostal muscles', 'Contract: lift ribs and sternum, volume rises in the dorso-ventral axis', 'Relax: ribs and sternum return'], ['Thoracic and pulmonary volume', 'Increase', 'Decrease'], ['Intra-pulmonary pressure', 'Falls below atmospheric pressure', 'Rises slightly above atmospheric pressure'], ['Air', 'Moves into the lungs', 'Moves out of the lungs']], 'Table comparing inspiration and expiration'),
      n: 'With the help of extra muscles in the abdomen we can make inspiration and expiration stronger. A healthy person at rest breathes twelve to sixteen times a minute.',
    }),
    sl('check', 'Quick check: intercostal muscles', {
      b: 'Contraction of the external intercostal muscles increases the volume of the thoracic chamber in which axis?',
      n: 'Quick check. The ribs and sternum are lifted. Which axis does that enlarge?',
      chk: 'axis-mcq',
    }),
    sl('diagram', 'Respiratory volumes and capacities', {
      b: 'The volume of air in breathing movements is estimated with a **spirometer**. Typical adult values (mL): tidal volume about **500**; inspiratory reserve volume **2500–3000**; expiratory reserve volume **1000–1100**; residual volume **1100–1200**. The spirogram is drawn with the upper values.',
      v: V.spiro,
      n: 'Tidal volume is the air moved in or out in one normal breath, about five hundred millilitres. Reserve volumes are the extra air we can forcibly breathe in or out. Residual volume stays in the lungs even after the most forcible expiration.',
    }),
    sl('concept', 'Capacities are sums of volumes', {
      b: `With the lower values (${vt(LOW)} mL for TV, IRV, ERV, RV) and the upper values (${vt(HIGH)} mL) the capacities are:`,
      v: table(['Capacity', 'Sum', 'Lower values (mL)', 'Upper values (mL)'], [['Inspiratory capacity (IC)', 'TV + IRV', String(CAP_LOW.IC), String(CAP_HIGH.IC)], ['Expiratory capacity (EC)', 'TV + ERV', String(CAP_LOW.EC), String(CAP_HIGH.EC)], ['Functional residual capacity (FRC)', 'ERV + RV', String(CAP_LOW.FRC), String(CAP_HIGH.FRC)], ['Vital capacity (VC)', 'ERV + TV + IRV', String(CAP_LOW.VC), String(CAP_HIGH.VC)], ['Total lung capacity (TLC)', 'RV + ERV + TV + IRV, or VC + RV', String(CAP_LOW.TLC), String(CAP_HIGH.TLC)]], 'Table of the five capacities with their sums and values'),
      n: 'Vital capacity is the most air a person can breathe in after a forced expiration, or breathe out after a forced inspiration. Total lung capacity is all the air in the lungs at the end of a forced inspiration, which is vital capacity plus residual volume.',
    }),
    sl('example', 'Worked example 1: capacities from readings', {
      b: `A student’s readings (mL) are TV ${WE1.TV}, IRV ${WE1.IRV}, ERV ${WE1.ERV}, and RV ${WE1.RV} (estimated, as a spirometer cannot measure it). Find her VC, TLC and FRC.`,
      ul: [
        r`$\text{VC} = \text{ERV} + \text{TV} + \text{IRV} = ${WE1.ERV} + ${WE1.TV} + ${WE1.IRV} = ${WE1.cap.VC}$ mL.`,
        r`$\text{TLC} = \text{VC} + \text{RV} = ${WE1.cap.VC} + ${WE1.RV} = ${WE1.cap.TLC}$ mL.`,
        r`$\text{FRC} = \text{ERV} + \text{RV} = ${WE1.ERV} + ${WE1.RV} = ${WE1.cap.FRC}$ mL.`,
      ],
      v: table(['Capacity', 'Value (mL)'], [['VC', String(WE1.cap.VC)], ['TLC', String(WE1.cap.TLC)], ['FRC', String(WE1.cap.FRC)]], `Worked table: VC ${WE1.cap.VC}, TLC ${WE1.cap.TLC}, FRC ${WE1.cap.FRC} mL`),
      n: 'Always write the sum first, then put in the numbers. Vital capacity adds the three volumes that can be breathed out. Total lung capacity adds the residual volume as well. Functional residual capacity is the air left after a normal breath out.',
    }),
    sl('example', 'Worked example 2: air breathed in a minute', {
      b: `A person at rest has a tidal volume of ${WE2.tv} mL and breathes ${WE2.rest} times a minute. While climbing stairs the rate rises to ${WE2.fast} a minute with the same tidal volume. How much air is moved in a minute in each case?`,
      ul: [
        r`At rest: $${WE2.tv} \times ${WE2.rest} = ${WE2.restMin}$ mL per minute.`,
        r`Climbing: $${WE2.tv} \times ${WE2.fast} = ${WE2.fastMin}$ mL per minute.`,
        'A healthy person can inspire or expire about 6000 to 8000 mL of air per minute at rest.',
      ],
      v: table(['Situation', 'Breaths per minute', 'Air per minute (mL)'], [['Rest', String(WE2.rest), String(WE2.restMin)], ['Climbing', String(WE2.fast), String(WE2.fastMin)]], `Worked table: ${WE2.restMin} and ${WE2.fastMin} mL of air per minute`),
      n: 'Multiply the tidal volume by the number of breaths in a minute. At rest this person moves seven thousand millilitres a minute, inside the usual range of six to eight thousand. Faster breathing moves ten thousand.',
    }),
    sl('check', 'Quick check: capacities', {
      b: 'Which two volumes add up to the functional residual capacity?',
      n: 'Quick check. It is the air left in the lungs after a normal expiration.',
      chk: 'frc-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Respiratory surfaces: body surface, moist cuticle, tracheal tubes, gills, lungs; frogs also use moist skin.',
        'Nostrils → nasal chamber → pharynx → larynx → trachea → bronchi → bronchioles → alveoli; epiglottis guards the glottis.',
        'Conducting part cleans, humidifies and warms air; alveoli are the exchange part.',
        'Thoracic chamber is air-tight; lungs covered by a double pleura with pleural fluid.',
        'Inspiration: diaphragm and external intercostals contract, volume up, pressure below atmospheric.',
        'Volumes: TV about 500, IRV 2500–3000, ERV 1000–1100, RV 1100–1200 mL; capacities are their sums.',
      ],
      v: table(['Stage', 'Volume of chest', 'Pressure in lungs'], [['Inspiration', 'Increases', 'Below atmospheric'], ['Expiration', 'Decreases', 'Above atmospheric']], 'Summary table of the two stages of breathing'),
      n: 'To recap: different animals use different respiratory surfaces. In humans, air is conducted to the alveoli, where exchange happens. We breathe by changing the volume of an air-tight chest. And the respiratory capacities are simply sums of the four respiratory volumes.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **respiratory system** with at least eight labels, including the **epiglottis** and **pleura**.',
        'Name the **axis** each muscle changes: diaphragm antero-posterior, external intercostals dorso-ventral.',
        'Write each **capacity as a sum** before putting in numbers; give units (mL).',
        'Remember a spirometer **cannot** measure residual volume.',
      ],
      n: 'Exam tips. Practise a labelled diagram of the respiratory system. Link the diaphragm and the intercostal muscles to the axis they change. Write each capacity as a sum before calculating. And remember that residual volume cannot be breathed out, so a spirometer cannot measure it.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Breathing and Exchange of Gases — Part 2: Exchange, transport, regulation and disorders',
  goals: [
    'Explain the exchange of gases at the alveoli and the tissues using partial pressures',
    'Describe the transport of oxygen and carbon dioxide and the oxygen dissociation curve',
    'Describe the neural and chemical regulation of breathing',
    'Describe asthma, emphysema and occupational respiratory disorders',
  ],
  slides: [
    sl('title', 'Exchange, transport and regulation', {
      b: 'Part 2 — how gases cross into and out of the blood, how blood carries them, how breathing is controlled, and what can go wrong.',
      v: flow('LR', [['x', 'Exchange by diffusion'], ['t', 'Transport by haemoglobin and plasma'], ['r', 'Regulation by the brain'], ['d', 'Disorders']], [['x', 't'], ['t', 'r'], ['r', 'd']], 'Flow of the topics of Part 2'),
      n: 'Alveoli are the primary sites of exchange of gases, and gases are also exchanged between blood and tissues. Both exchanges happen by simple diffusion, driven by differences in pressure or concentration.',
    }),
    sl('diagram', 'Exchange at the alveolus', {
      b: 'Oxygen and carbon dioxide diffuse across a **diffusion membrane** of three layers: the thin **squamous epithelium of the alveoli**, the **endothelium of the alveolar capillaries** and the **basement substance** between them. Its total thickness is much less than a millimetre.',
      v: V.alveolus,
      n: 'The pressure that one gas contributes in a mixture is its partial pressure. Oxygen moves from alveolar air, where its partial pressure is high, into the blood, where it is low. Carbon dioxide moves the other way, from the blood into the alveoli.',
    }),
    sl('concept', 'Partial pressures (mm Hg)', {
      b: 'Solubility of the gases and the thickness of the membranes also affect the rate of diffusion.',
      v: table(['Gas', PP.air.name, PP.alveoli.name, PP.deoxy.name, PP.oxy.name, PP.tissues.name], [['O₂', String(PP.air.o2), String(PP.alveoli.o2), String(PP.deoxy.o2), String(PP.oxy.o2), String(PP.tissues.o2)], ['CO₂', String(PP.air.co2), String(PP.alveoli.co2), String(PP.deoxy.co2), String(PP.oxy.co2), String(PP.tissues.co2)]], 'Table of the partial pressures of oxygen and carbon dioxide at five sites'),
      n: 'Read the table along each row. Oxygen falls from the alveoli to the tissues, so it diffuses from alveoli to blood and from blood to tissues. Carbon dioxide is highest in the tissues, so it diffuses from tissues to blood and from blood to the alveoli.',
    }),
    sl('example', 'Worked example 1: comparing the gradients', {
      b: 'From the table, find the partial-pressure difference for each gas between alveolar air and the deoxygenated blood reaching the lungs. Why is carbon dioxide still exchanged well?',
      ul: [
        r`Oxygen: $${PP.alveoli.o2} - ${PP.deoxy.o2} = ${GRAD.o2Lung}$ mm Hg, from alveoli to blood.`,
        r`Carbon dioxide: $${PP.deoxy.co2} - ${PP.alveoli.co2} = ${GRAD.co2Lung}$ mm Hg, from blood to alveoli.`,
        `The solubility of carbon dioxide is **${SOLUBILITY[0]}–${SOLUBILITY[1]} times** that of oxygen, so much more carbon dioxide diffuses for each unit of pressure difference.`,
      ],
      v: table(['Gas', 'Alveoli', 'Deoxygenated blood', 'Difference'], [['O₂', String(PP.alveoli.o2), String(PP.deoxy.o2), String(GRAD.o2Lung)], ['CO₂', String(PP.alveoli.co2), String(PP.deoxy.co2), String(GRAD.co2Lung)]], `Worked table: oxygen gradient ${GRAD.o2Lung}, carbon dioxide gradient ${GRAD.co2Lung} mm Hg`),
      n: 'The oxygen gradient is sixty-four, the carbon dioxide gradient only five. Even so, carbon dioxide is twenty to twenty-five times more soluble than oxygen, so it crosses the membrane readily. All the factors in our body favour oxygen moving from alveoli to tissues and carbon dioxide moving the opposite way.',
    }),
    sl('check', 'Quick check: solubility', {
      b: 'Judge the assertion and the reason about the diffusion of the two gases.',
      n: 'Quick check. Which gas is more soluble?',
      chk: 'solubility-ar',
    }),
    sl('concept', 'Transport of oxygen', {
      b: `Blood carries about **${O2_SHARE.rbc} percent** of oxygen in the **red blood cells** and the remaining **${O2_SHARE.plasma} percent** dissolved in the **plasma**. **Haemoglobin**, a red iron-containing pigment, binds oxygen reversibly to form **oxyhaemoglobin**; each haemoglobin molecule can carry at most **four** molecules of oxygen.`,
      v: table(['Condition', 'Effect on haemoglobin'], [['High pO₂, low pCO₂, fewer H⁺ ions, lower temperature (alveoli)', 'Formation of oxyhaemoglobin'], ['Low pO₂, high pCO₂, more H⁺ ions, higher temperature (tissues)', 'Dissociation of oxygen from oxyhaemoglobin']], 'Table of conditions favouring the binding and release of oxygen by haemoglobin'),
      n: 'Binding of oxygen to haemoglobin depends mainly on the partial pressure of oxygen. The partial pressure of carbon dioxide, hydrogen ion concentration and temperature can also interfere with this binding.',
    }),
    sl('diagram', 'Oxygen dissociation curve', {
      b: 'A plot of the **percentage saturation of haemoglobin** with oxygen against **pO₂** is a **sigmoid** curve, the **oxygen dissociation curve**. It shows how factors such as pCO₂ and H⁺ concentration affect binding.',
      v: V.odc,
      n: 'In the alveoli, haemoglobin is almost fully loaded with oxygen. In the tissues, where the partial pressure of oxygen is low and carbon dioxide, acidity and temperature are higher, oxygen dissociates and is released. The values on the curve come from a standard model and are only illustrative.',
    }),
    sl('check', 'Quick check: oxygen in plasma', {
      b: 'What share of the oxygen carried by blood is dissolved in the plasma?',
      n: 'Quick check. Almost all oxygen travels with haemoglobin. How much is left for the plasma?',
      chk: 'o2plasma-mcq',
    }),
    sl('concept', 'Transport of carbon dioxide', {
      b: `About **${CO2_SHARE.carbamino} percent** of carbon dioxide travels as **carbamino-haemoglobin**, about **${CO2_SHARE.bicarbonate} percent** as **bicarbonate** and about **${CO2_SHARE.dissolved} percent** dissolved in plasma. The enzyme **carbonic anhydrase**, present at high concentration in RBCs and in minute quantities in plasma, speeds up the reaction both ways.`,
      v: chem('CO2 + H2O <=> H2CO3 <=> HCO3- + H+', 'Carbon dioxide and water form carbonic acid, which forms bicarbonate and hydrogen ions, catalysed by carbonic anhydrase', 'Carbonic anhydrase speeds both directions'),
      m: [r`\ce{CO2 + H2O <=>[\text{carbonic anhydrase}] H2CO3 <=>[\text{carbonic anhydrase}] HCO3- + H+}`],
      n: 'In the tissues, where carbon dioxide is high, the reaction runs forward and bicarbonate forms. In the alveoli, where carbon dioxide is low, it runs backward and carbon dioxide is released. High carbon dioxide and low oxygen favour carbamino-haemoglobin in tissues; the opposite conditions in the alveoli release the carbon dioxide.',
    }),
    sl('example', 'Worked example 2: oxygen delivered to the tissues', {
      b: `Under normal conditions every 100 mL of oxygenated blood delivers about ${PER100.o2} mL of oxygen to the tissues, and every 100 mL of deoxygenated blood delivers about ${PER100.co2} mL of carbon dioxide to the alveoli. How much of each gas is exchanged when ${WE3.flow} mL of blood passes?`,
      ul: [
        r`Oxygen: $\dfrac{${WE3.flow}}{100} \times ${PER100.o2} = ${WE3.o2}$ mL.`,
        r`Carbon dioxide: $\dfrac{${WE3.flow}}{100} \times ${PER100.co2} = ${WE3.co2}$ mL.`,
        'Only part of the oxygen carried is unloaded at rest; the rest is a reserve.',
      ],
      v: table(['Gas', 'Per 100 mL blood', `Per ${WE3.flow} mL blood`], [['Oxygen to tissues', `${PER100.o2} mL`, `${WE3.o2} mL`], ['Carbon dioxide to alveoli', `${PER100.co2} mL`, `${WE3.co2} mL`]], `Worked table: ${WE3.o2} mL oxygen and ${WE3.co2} mL carbon dioxide`),
      n: 'Divide the blood volume by one hundred to find how many hundred-millilitre portions there are, then multiply by the amount each portion delivers. Five thousand millilitres of blood unloads about two hundred and fifty millilitres of oxygen and gives up about two hundred millilitres of carbon dioxide.',
    }),
    sl('concept', 'Regulation of respiration', {
      b: 'Humans can adjust the rhythm of breathing to the demands of the body tissues; this is done by the **neural system**.',
      v: flow('TB', [['c', 'Chemosensitive area beside the rhythm centre senses more CO₂ and H⁺'], ['k', 'Receptors at the aortic arch and carotid artery also sense CO₂ and H⁺'], ['r', 'Respiratory rhythm centre (medulla)'], ['p', 'Pneumotaxic centre (pons): can shorten inspiration and alter rate'], ['m', 'Breathing muscles adjust rate and depth']], [['c', 'r'], ['k', 'r'], ['p', 'r'], ['r', 'm']], 'Flow of the regulation of breathing by the medulla, the pons and chemical sensors'),
      n: 'The respiratory rhythm centre in the medulla is primarily responsible for regulation. The pneumotaxic centre in the pons can moderate it, reducing the duration of inspiration and thereby altering the rate. A rise in carbon dioxide and hydrogen ions activates the chemosensitive area. The role of oxygen in regulating the rhythm is quite insignificant.',
    }),
    sl('check', 'Quick check: rhythm centre', {
      b: 'Where is the respiratory rhythm centre located?',
      n: 'Quick check. It lies in the hindbrain, close to the spinal cord.',
      chk: 'centre-mcq',
    }),
    sl('concept', 'Disorders of the respiratory system', {
      b: 'Three disorders named in the syllabus.',
      v: table(['Disorder', 'What happens', 'Cause or risk'], [['Asthma', 'Difficulty in breathing with wheezing, due to inflammation of the bronchi and bronchioles', 'Often triggered by irritants such as pollen or dust'], ['Emphysema', 'A chronic disorder in which the alveolar walls are damaged, so the respiratory surface decreases', 'Cigarette smoking is one of the major causes'], ['Occupational respiratory disorders', 'Long exposure to dust causes inflammation and fibrosis (proliferation of fibrous tissue), with serious lung damage', 'Stone-grinding or stone-breaking industries; prevented by protective masks']], 'Table of asthma, emphysema and occupational respiratory disorders'),
      n: 'In some industries, especially stone grinding or breaking, so much dust is produced that the body’s defences cannot cope. Workers in such places should wear protective masks.',
    }),
    sl('check', 'Quick check: emphysema', {
      b: 'Which disorder is described: alveolar walls are damaged and the respiratory surface is reduced?',
      n: 'Quick check. Which chronic disorder is linked with smoking?',
      chk: 'emphysema-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Exchange by simple diffusion; diffusion membrane of three layers, much less than a millimetre thick.',
        `pO₂: alveoli ${PP.alveoli.o2}, tissues ${PP.tissues.o2}; pCO₂: alveoli ${PP.alveoli.co2}, tissues ${PP.tissues.co2} mm Hg; CO₂ is 20–25 times more soluble.`,
        `Oxygen: ${O2_SHARE.rbc} percent as oxyhaemoglobin, ${O2_SHARE.plasma} percent in plasma; sigmoid dissociation curve.`,
        `Carbon dioxide: 20–25 percent carbamino-haemoglobin, ${CO2_SHARE.bicarbonate} percent bicarbonate, ${CO2_SHARE.dissolved} percent dissolved; carbonic anhydrase.`,
        'Regulation: rhythm centre (medulla), pneumotaxic centre (pons), chemosensitive area; oxygen plays little part.',
        'Disorders: asthma, emphysema, occupational disorders (fibrosis; use masks).',
      ],
      v: table(['Gas', 'Main form in blood'], [['Oxygen', 'Oxyhaemoglobin in RBCs'], ['Carbon dioxide', 'Bicarbonate']], 'Summary table of the main transport form of each gas'),
      n: 'To recap: gases move by diffusion down their partial pressure gradients. Haemoglobin carries most of the oxygen, and most carbon dioxide travels as bicarbonate. The brain sets the rhythm of breathing, mainly in response to carbon dioxide and hydrogen ions.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Quote the **partial pressures** with units and say which way each gas diffuses.',
        'State the **three layers** of the diffusion membrane.',
        'Give the **percentages** for oxygen and carbon dioxide transport and the role of **carbonic anhydrase**.',
        'Name **where** each centre lies: rhythm centre in the medulla, pneumotaxic centre in the pons.',
      ],
      n: 'Exam tips. Quote partial pressures with their units and the direction of diffusion. Learn the three layers of the diffusion membrane. Give the shares of each gas carried in each form. And place the rhythm centre in the medulla and the pneumotaxic centre in the pons.',
    }),
  ],
});
