// ISC 11 Biology ch16 Breathing and Exchange of Gases — two decks: Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { RESP, MECH, SPIRO, ODC, CLSHIFT } from './svgs.mjs';
import { P1, SHALLOW, DEEP, DEAD, BOYLE, BOYLE_P2, BOYLE_DROP, alveolarVent, minuteVent, ALT, PP, HB, ART_O2, VEN_O2, DELIVERED, FLOW, O2_MIN, CO2_MIN, co2Part, CO2_FORMS, satR, O2_FRAC } from './calc.mjs';

export const V = {
  resp: svgV(RESP, 'Labelled human respiratory system'),
  mech: svgV(MECH, 'Inspiration and expiration: diaphragm, ribs, volume and pressure'),
  spiro: svgV(SPIRO, 'Spirometer tracing with the volumes and capacities marked'),
  odc: svgV(ODC, 'Oxyhaemoglobin dissociation curves, normal and shifted'),
  cl: svgV(CLSHIFT, 'Carbon dioxide transport and the chloride shift at the tissues'),
};

export const deck1 = deck({
  part: 1,
  title: 'Breathing and Exchange of Gases — Part 1: organs, mechanism and volumes',
  goals: [
    'Name the respiratory organs of animals and label the human respiratory system',
    'Explain inspiration and expiration in terms of volume and pressure',
    'Define the pulmonary volumes and capacities and calculate them from a spirometer record',
  ],
  slides: [
    sl('title', 'Breathing and Exchange of Gases', {
      b: 'Part 1: how air reaches the lungs and how much of it moves.',
      v: flow('LR', [['n', 'Nostrils and nasal chamber'], ['p', 'Pharynx and larynx'], ['t', 'Trachea'], ['b', 'Bronchi and bronchioles'], ['a', 'Alveoli']], [['n', 'p'], ['p', 't'], ['t', 'b'], ['b', 'a']], 'Flow of the path of air from the nostrils to the alveoli'),
      n: 'Every cell needs oxygen and must get rid of carbon dioxide. Breathing moves air in and out of the lungs, and gas exchange takes place across the thin walls of the alveoli. This part covers the organs of breathing, the mechanism of breathing and the volumes of air that move.',
    }),
    sl('concept', 'Respiratory organs in animals', {
      b: 'The organ depends on the size, habitat and activity of the animal.',
      v: table(['Animals', 'Respiratory organ or surface'], [['Sponges, Hydra, flatworms', 'General body surface (simple diffusion)'], ['Earthworm', 'Moist cuticle (skin)'], ['Insects, such as cockroach', 'Network of tracheal tubes opening through spiracles'], ['Prawn, fishes', 'Gills (branchial respiration)'], ['Frog', 'Moist skin, buccal cavity and lungs'], ['Reptiles, birds, mammals', 'Lungs (pulmonary respiration)']], 'Table of animal groups and their respiratory organs'),
      n: 'Small and flat animals can simply let gases diffuse across the body surface. Insects carry air directly to tissues through tubes. Aquatic animals use gills, and land vertebrates use lungs. A frog uses all of skin, mouth lining and lungs.',
    }),
    sl('check', 'Quick check: respiratory surfaces', {
      b: 'Decide which animal needs no special respiratory organ.',
      n: 'Quick check. Think of a flat, thin animal with every cell close to the outside.',
      chk: 'surface-mcq',
    }),
    sl('diagram', 'The human respiratory system', {
      b: 'Air passes **nostrils → nasal chamber → pharynx → larynx → trachea → bronchi → bronchioles → alveoli**. The **right lung has three lobes** and the **left lung two**; each lung is wrapped in a **double-layered pleura** with fluid between the layers.',
      v: V.resp,
      n: 'Follow the air from the nostrils to the alveoli. The nasal chamber filters, warms and moistens it. The larynx has the epiglottis, which covers the opening during swallowing. The trachea divides into two bronchi, one for each lung, and these branch again and again into bronchioles that end in alveoli.',
    }),
    sl('concept', 'Parts and their functions', {
      b: 'The system has a **conducting part** and an **exchange part**.',
      v: table(['Part', 'Structure', 'Function'], [['Nasal chamber', 'Hairs, mucus, rich blood supply', 'Filters, warms and moistens air'], ['Larynx', 'Cartilage box with epiglottis', 'Sound production; closes the windpipe during swallowing'], ['Trachea', 'C-shaped cartilage rings, ciliated lining', 'Stays open; cilia sweep mucus and dust upward'], ['Bronchi, bronchioles', 'Branching tubes', 'Carry air into the lung lobes'], ['Alveoli', 'Thin-walled sacs wrapped by capillaries', 'Exchange of oxygen and carbon dioxide'], ['Pleura', 'Two layers with fluid', 'Reduces friction as the lungs move']], 'Table of parts of the respiratory system, their structure and function'),
      n: 'The conducting part only carries air. Gas exchange happens only in the alveoli. The incomplete rings of cartilage keep the trachea open without pressing on the food pipe behind it, and the pleural fluid lets the lungs slide smoothly against the chest wall.',
    }),
    sl('diagram', 'The mechanism of breathing', {
      b: 'Air moves because the **pressure in the lungs differs from the atmosphere**. The lungs lie in an air-tight chest, so when the chest changes volume the lungs change with it.',
      v: V.mech,
      n: 'In inspiration the diaphragm contracts and flattens, and the external intercostal muscles lift the ribs and the breastbone. The chest volume rises, the pressure in the lungs falls below the outside pressure, and air flows in. In expiration the muscles relax, the volume falls, the pressure rises, and air flows out.',
    }),
    sl('concept', 'Muscles used in breathing', {
      b: 'Quiet breathing uses little effort; deep breathing recruits more muscles.',
      v: table(['Type', 'Muscles', 'Notes'], [['Quiet inspiration', 'Diaphragm and external intercostals', 'Active'], ['Quiet expiration', 'None (muscles relax)', 'Passive recoil of the chest and lungs'], ['Forced inspiration', 'The above plus extra muscles of the chest and neck', 'Takes in the inspiratory reserve volume'], ['Forced expiration', 'Internal intercostals and abdominal muscles', 'Expels the expiratory reserve volume']], 'Table of muscles used in quiet and forced breathing'),
      n: 'Quiet expiration needs no muscle work. It is simply the return of the stretched chest and lungs to their resting size. Only in deep or forced breathing do the internal intercostal and abdominal muscles help to push more air out.',
    }),
    sl('example', 'Worked example 1: pressure and volume', {
      b: `A student blocks her nose and mouth and tries to breathe in. The gas in her lungs expands from ${BOYLE.v1} mL to ${BOYLE.v2} mL while the temperature stays constant. The pressure was ${BOYLE.p1} mm Hg (atmospheric). Find the new pressure.`,
      ul: [
        r`Use Boyle’s law for a fixed amount of gas: $p_1 V_1 = p_2 V_2$.`,
        r`$p_2 = \dfrac{${BOYLE.p1} \times ${BOYLE.v1}}{${BOYLE.v2}} = ${BOYLE_P2}$ mm Hg.`,
        r`The pressure falls by $${BOYLE.p1} - ${BOYLE_P2} = ${BOYLE_DROP}$ mm Hg, below atmospheric: if the airway were open, air would flow in.`,
      ],
      v: table(['Quantity', 'Value'], [['Volume before', `${BOYLE.v1} mL`], ['Volume after', `${BOYLE.v2} mL`], ['Pressure before', `${BOYLE.p1} mm Hg`], ['Pressure after', `${BOYLE_P2} mm Hg`]], `Worked table: pressure falls from ${BOYLE.p1} to ${BOYLE_P2} millimetres of mercury`),
      n: 'A bigger volume means a lower pressure, provided the amount of gas is fixed. With the airway blocked, the lungs cannot take in air, so the pressure falls. With the airway open, the fall in pressure is small, because air flows in at once and refills the lungs.',
    }),
    sl('check', 'Quick check: a model of the chest', {
      b: 'Match each part of a bell-jar model with the real structure.',
      n: 'Quick check. What do the rubber sheet and the balloon stand for?',
      chk: 'bell-mcq',
    }),
    sl('diagram', 'Measuring the volumes: the spirometer', {
      b: 'A **spirometer** records the air moving in and out of the mouth. Quiet breaths give the tidal volume; the largest breaths give the reserve volumes. Air left in the lungs after the strongest expiration cannot be measured by the spirometer.',
      v: V.spiro,
      n: 'The tracing rises with each inspiration and falls with each expiration. Quiet breaths make the small waves. A maximum breath in and then a maximum breath out show the reserve volumes. The air that remains below the lowest point, the residual volume, stays in the lungs.',
    }),
    sl('concept', 'Volumes and capacities', {
      b: 'A **capacity** is the sum of two or more volumes.',
      v: table(['Term', 'Meaning', 'Usual adult value'], [['Tidal volume (TV)', 'Air breathed in or out in one quiet breath', 'About 500 mL'], ['Inspiratory reserve volume (IRV)', 'Extra air that can be breathed in after a quiet inspiration', '2500 to 3000 mL'], ['Expiratory reserve volume (ERV)', 'Extra air that can be breathed out after a quiet expiration', '1000 to 1100 mL'], ['Residual volume (RV)', 'Air left after the strongest expiration', '1100 to 1200 mL'], ['Vital capacity (VC)', 'IRV + TV + ERV: the largest air breathed out after a deep inspiration', '3500 to 4500 mL'], ['Functional residual capacity (FRC)', 'ERV + RV: air left after a quiet expiration', 'About 2300 mL'], ['Total lung capacity (TLC)', 'VC + RV', '5000 to 6000 mL']], 'Table of respiratory volumes and capacities with typical adult values'),
      n: 'Learn the four volumes first. The capacities are sums. Vital capacity is the three measurable volumes added together. Add the residual volume to it and you have the total lung capacity. The residual volume is also part of the functional residual capacity.',
    }),
    sl('example', 'Worked example 2: capacities from a record', {
      b: `A spirometer test gives TV ${P1.tv} mL, IRV ${P1.irv} mL, ERV ${P1.erv} mL; the residual volume is ${P1.rv} mL. Find IC, EC, VC and TLC.`,
      ul: [
        r`Inspiratory capacity $= \text{TV} + \text{IRV} = ${P1.tv} + ${P1.irv} = ${P1.ic}$ mL.`,
        r`Expiratory capacity $= \text{TV} + \text{ERV} = ${P1.tv} + ${P1.erv} = ${P1.ec}$ mL.`,
        r`Vital capacity $= \text{IRV} + \text{TV} + \text{ERV} = ${P1.irv} + ${P1.tv} + ${P1.erv} = ${P1.vc}$ mL.`,
        r`Total lung capacity $= \text{VC} + \text{RV} = ${P1.vc} + ${P1.rv} = ${P1.tlc}$ mL.`,
      ],
      v: table(['Quantity', 'Sum', 'mL'], [['IC', 'TV + IRV', String(P1.ic)], ['EC', 'TV + ERV', String(P1.ec)], ['VC', 'IRV + TV + ERV', String(P1.vc)], ['TLC', 'VC + RV', String(P1.tlc)]], `Worked table: IC ${P1.ic}, EC ${P1.ec}, VC ${P1.vc}, TLC ${P1.tlc}`),
      n: 'Add the right volumes for each capacity. Inspiratory capacity is a quiet breath plus the inspiratory reserve. Vital capacity adds the expiratory reserve as well. Total lung capacity needs the residual volume, which only a special test can give.',
    }),
    sl('check', 'Quick check: functional residual capacity', {
      b: 'Add the volumes that stay in the lungs after a quiet expiration.',
      n: 'Quick check. Which two volumes remain after a quiet breath out?',
      chk: 'frc-num',
    }),
    sl('example', 'Worked example 3: ventilation', {
      b: `Pulmonary ventilation = tidal volume × breaths per minute. The conducting passages hold about ${DEAD} mL of air that never reaches the alveoli. Compare a girl breathing ${SHALLOW.rate} times a minute with TV ${SHALLOW.tv} mL, and a boy breathing ${DEEP.rate} times a minute with TV ${DEEP.tv} mL.`,
      ul: [
        r`Girl: $${SHALLOW.tv} \times ${SHALLOW.rate} = ${minuteVent(SHALLOW.tv, SHALLOW.rate)}$ mL per minute; reaching the alveoli: $(${SHALLOW.tv} - ${DEAD}) \times ${SHALLOW.rate} = ${alveolarVent(SHALLOW.tv, SHALLOW.rate)}$ mL.`,
        r`Boy: $${DEEP.tv} \times ${DEEP.rate} = ${minuteVent(DEEP.tv, DEEP.rate)}$ mL per minute; reaching the alveoli: $(${DEEP.tv} - ${DEAD}) \times ${DEEP.rate} = ${alveolarVent(DEEP.tv, DEEP.rate)}$ mL.`,
        'Same total, but **slow deep breathing** ventilates the alveoli better.',
      ],
      v: table(['', 'Girl', 'Boy'], [['Breaths per minute', String(SHALLOW.rate), String(DEEP.rate)], ['Tidal volume (mL)', String(SHALLOW.tv), String(DEEP.tv)], ['Air breathed per minute (mL)', String(minuteVent(SHALLOW.tv, SHALLOW.rate)), String(minuteVent(DEEP.tv, DEEP.rate))], ['Air reaching alveoli per minute (mL)', String(alveolarVent(SHALLOW.tv, SHALLOW.rate)), String(alveolarVent(DEEP.tv, DEEP.rate))]], 'Worked table comparing shallow fast breathing and deep slow breathing'),
      n: 'Both breathe the same total volume each minute. But in every breath the first one hundred and fifty millilitres only fill the air passages. The deep breather wastes this much only seven times a minute, so more fresh air reaches the alveoli.',
    }),
    sl('check', 'Quick check: air reaching the alveoli', {
      b: 'Find the volume of fresh air reaching the alveoli each minute.',
      n: 'Quick check. Subtract the air in the air passages from each breath.',
      chk: 'alv-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Organs: body surface, cuticle, tracheae, gills, skin and lungs; human lungs: three lobes right, two lobes left, pleura.',
        'Inspiration: diaphragm and external intercostals contract, volume rises, pressure falls; expiration is passive in quiet breathing.',
        'Volumes: TV, IRV, ERV, RV; capacities: IC, EC, FRC, VC, TLC.',
        'VC = IRV + TV + ERV; TLC = VC + RV; FRC = ERV + RV.',
        'Alveolar ventilation = (TV − dead space) × rate.',
      ],
      v: table(['Capacity', 'Formula'], [['IC', 'TV + IRV'], ['EC', 'TV + ERV'], ['FRC', 'ERV + RV'], ['VC', 'IRV + TV + ERV'], ['TLC', 'VC + RV']], 'Summary table of lung capacities and formulae'),
      n: 'To recap: air flows because muscles change the volume of the chest and so the pressure in the lungs. The spirometer measures the volumes, and the capacities are their sums. The residual volume is the one volume it cannot measure.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say **pressure falls because volume rises**, never just "air is sucked in".',
        'Write each capacity as a **sum of volumes**.',
        'Label a diagram with **lines that touch the part**; name the right lung as three-lobed.',
        'Remember that the **residual volume cannot be exhaled**, so the vital capacity excludes it.',
      ],
      v: table(['Mistake', 'Correction'], [['VC includes RV', 'VC = IRV + TV + ERV only'], ['Expiration needs muscles at rest', 'Quiet expiration is passive'], ['Left lung has three lobes', 'Left lung has two']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. Link every movement of air to a change of volume and pressure. Write capacities as sums. Draw label lines carefully. And keep the residual volume out of the vital capacity.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Breathing and Exchange of Gases — Part 2: gas exchange, transport and control',
  goals: [
    'Explain pulmonary exchange of gases using partial pressures',
    'Interpret the oxyhaemoglobin dissociation curve and the factors that shift it',
    'Explain the transport of carbon dioxide and the chloride shift',
    'Describe the regulation of breathing and the main respiratory disorders',
  ],
  slides: [
    sl('title', 'Exchange, transport and control', {
      b: 'Part 2: how gases cross membranes, travel in blood and are regulated.',
      v: flow('LR', [['a', 'Alveolar air'], ['b', 'Blood: oxygen carried by haemoglobin'], ['t', 'Tissue cells'], ['c', 'Carbon dioxide returns to the alveoli']], [['a', 'b'], ['b', 't'], ['t', 'c']], 'Flow of gas exchange between alveoli, blood and tissues'),
      n: 'Oxygen has to cross from the air in the alveoli into the blood, travel to the tissues and cross again into the cells. Carbon dioxide takes the opposite road. Gases move only by diffusion, so the whole story depends on differences in partial pressure.',
    }),
    sl('concept', 'Partial pressures and diffusion', {
      b: 'A gas diffuses from a region of **higher partial pressure** to one of **lower** partial pressure. The **diffusion membrane** (alveolar epithelium, capillary endothelium and the basement substance between them) is thinner than a millimetre.',
      v: table(['Site', 'pO₂ (mm Hg)', 'pCO₂ (mm Hg)'], [['Atmospheric air', String(PP.atmosphere.o2), String(PP.atmosphere.co2)], ['Alveolar air', String(PP.alveolar.o2), String(PP.alveolar.co2)], ['Deoxygenated blood', String(PP.deoxy.o2), String(PP.deoxy.co2)], ['Oxygenated blood', String(PP.oxy.o2), String(PP.oxy.co2)], ['Tissues', String(PP.tissue.o2), String(PP.tissue.co2)]], 'Table of partial pressures of oxygen and carbon dioxide at five sites'),
      n: 'Oxygen moves from alveolar air into the blood because its partial pressure is higher in the air. Carbon dioxide moves the other way. Although its gradient is small, carbon dioxide is far more soluble than oxygen, so its diffusion is still quick. At the tissues the directions reverse.',
    }),
    sl('example', 'Worked example 1: oxygen pressure and height', {
      b: `Dry air is ${O2_FRAC * 100} percent oxygen at every height, but the **barometric pressure** falls as we climb, so the **partial pressure of oxygen** falls too: $p\\mathrm{O_2} = ${O2_FRAC} \\times \\text{barometric pressure}$.`,
      ul: ALT.map((a) => r`${a.site}: $${O2_FRAC} \times ${a.baro} = ${a.po2}$ mm Hg.`),
      v: table(['Site', 'Barometric pressure (mm Hg)', 'pO₂ (mm Hg)'], ALT.map((a) => [a.site, String(a.baro), String(a.po2)]), 'Worked table of oxygen partial pressure at four heights'),
      n: 'The share of oxygen in air stays the same, but the whole air pressure drops with height. At the summit the partial pressure of oxygen is about one third of its sea level value, so the gradient into the blood is very small and climbers feel breathless.',
    }),
    sl('concept', 'Transport of oxygen', {
      b: 'Oxygen is carried by **haemoglobin** (Hb) in red cells. Each Hb molecule has four haem groups and can bind **four O₂ molecules**, forming **oxyhaemoglobin**.',
      v: table(['Form', 'Share of oxygen carried'], [['Bound to haemoglobin as oxyhaemoglobin', 'About 97 percent'], ['Dissolved in plasma', 'About 3 percent']], 'Table of the forms in which oxygen is carried'),
      n: 'Nearly all the oxygen travels bound to haemoglobin. Each molecule carries up to four oxygen molecules. Because the binding depends on the partial pressure of oxygen, haemoglobin loads oxygen in the lungs and unloads it in the tissues.',
    }),
    sl('diagram', 'The oxygen dissociation curve', {
      b: 'A plot of **% saturation of Hb with O₂ against pO₂** is **sigmoid (S-shaped)**. The curve is flat near the lungs and steep near the tissues, so a small fall in pO₂ at the tissues releases a lot of oxygen.',
      v: V.odc,
      n: 'At the lungs haemoglobin is nearly full. At the pressure found in resting tissues it is about three quarters full, so about a quarter of its load is released. The steep middle part of the curve is where small changes in pressure make large changes in saturation.',
    }),
    sl('check', 'Quick check: reading the curve', {
      b: 'Read a value from the curve.',
      n: 'Quick check. Find the saturation where the dotted line meets the curve.',
      chk: 'odc-read-mcq',
    }),
    sl('concept', 'Factors that shift the curve', {
      b: 'In active tissues several factors help **haemoglobin release oxygen**: they shift the curve to the **right** (the **Bohr effect**).',
      v: table(['Factor', 'Right shift (more O₂ released)', 'Left shift (more O₂ held)'], [['pCO₂', 'Higher', 'Lower'], ['Hydrogen ion concentration', 'Higher (more acid, lower pH)', 'Lower (less acid, higher pH)'], ['Temperature', 'Higher', 'Lower'], ['Other', 'Contracting muscle conditions', 'Foetal haemoglobin']], 'Table of factors that shift the oxygen dissociation curve'),
      n: 'Active muscle is warmer, more acidic and rich in carbon dioxide. All three move the curve to the right, so haemoglobin gives up more oxygen exactly where it is needed. In the lungs the opposite conditions favour loading.',
    }),
    sl('example', 'Worked example 2: how much oxygen is delivered', {
      b: `Blood has ${HB} g of haemoglobin in 100 mL, and 1 g binds 1.34 mL of oxygen. Arterial blood is ${satR(100)} percent saturated and blood leaving resting tissue ${satR(40)} percent. How much oxygen does ${FLOW} mL of blood deliver?`,
      ul: [
        r`Arterial blood: $${HB} \times 1.34 \times ${satR(100)}/100 \approx ${ART_O2}$ mL per 100 mL.`,
        r`Venous blood: $${HB} \times 1.34 \times ${satR(40)}/100 \approx ${VEN_O2}$ mL per 100 mL.`,
        r`Given up: $${ART_O2} - ${VEN_O2} = ${DELIVERED}$ mL per 100 mL; for ${FLOW} mL: $${DELIVERED} \times ${FLOW}/100 = ${O2_MIN}$ mL.`,
      ],
      v: table(['Blood', 'O₂ in 100 mL (mL)'], [['Arterial', String(ART_O2)], ['Venous', String(VEN_O2)], ['Given up', String(DELIVERED)]], `Worked table: ${DELIVERED} millilitres of oxygen given up per hundred millilitres`),
      n: 'Multiply the haemoglobin mass by what each gram can bind and by the saturation. The difference between arterial and venous blood is what the tissues take up. Textbooks often round this to five millilitres per hundred millilitres of blood.',
    }),
    sl('check', 'Quick check: a fever', {
      b: 'Predict how a high body temperature affects haemoglobin.',
      n: 'Quick check. Which way does the curve move when the temperature rises?',
      chk: 'bohr-fever-mcq',
    }),
    sl('diagram', 'Carbon dioxide transport and the chloride shift', {
      b: 'At the tissues, CO₂ enters the red cell. **Carbonic anhydrase** converts it to H₂CO₃, which splits to **H⁺ and HCO₃⁻**. HCO₃⁻ diffuses out into plasma, and **Cl⁻ moves in**: the **chloride shift** (Hamburger shift).',
      v: V.cl,
      n: 'The enzyme carbonic anhydrase, found in red cells, makes carbon dioxide and water combine at once. The bicarbonate ions leave the cell, and chloride ions enter to keep the electrical balance. Haemoglobin takes up the hydrogen ions, which prevents the blood from becoming too acidic.',
    }),
    sl('concept', 'The three forms of carbon dioxide', {
      b: 'About **4 mL of CO₂** is delivered to the alveoli by each **100 mL of deoxygenated blood**. At the lungs the sequence reverses, and CO₂ diffuses into alveolar air.',
      v: table(['Form', 'Share', 'Where'], [['Bicarbonate ions (HCO₃⁻)', `About ${CO2_FORMS.bicarbonate} percent`, 'Mostly in plasma, formed inside red cells'], ['Carbamino-haemoglobin', `About ${CO2_FORMS.carbamino} percent (20 to 25)`, 'CO₂ bound to Hb in red cells'], ['Dissolved in plasma', `About ${CO2_FORMS.dissolved} percent`, 'Plasma']], 'Table of the three forms of carbon dioxide in blood'),
      n: 'Most carbon dioxide travels as bicarbonate. About a quarter is carried by haemoglobin as carbamino compounds, which form more easily when haemoglobin has given up its oxygen. A small share is simply dissolved in plasma.',
    }),
    sl('example', 'Worked example 3: sharing out carbon dioxide', {
      b: `A resting person adds ${CO2_MIN} mL of carbon dioxide to the blood each minute. Divide it among the three forms.`,
      ul: [
        r`Bicarbonate: $${CO2_FORMS.bicarbonate}/100 \times ${CO2_MIN} = ${co2Part('bicarbonate')}$ mL.`,
        r`Carbamino-haemoglobin: $${CO2_FORMS.carbamino}/100 \times ${CO2_MIN} = ${co2Part('carbamino')}$ mL.`,
        r`Dissolved: $${CO2_FORMS.dissolved}/100 \times ${CO2_MIN} = ${co2Part('dissolved')}$ mL.`,
      ],
      v: table(['Form', 'Percent', 'mL per minute'], [['Bicarbonate', String(CO2_FORMS.bicarbonate), String(co2Part('bicarbonate'))], ['Carbamino-haemoglobin', String(CO2_FORMS.carbamino), String(co2Part('carbamino'))], ['Dissolved', String(CO2_FORMS.dissolved), String(co2Part('dissolved'))]], 'Worked table dividing carbon dioxide among its three forms'),
      n: 'Multiply the total by each share. The three parts add back to the whole amount. The figure of twenty three percent is a mid value of the range given in textbooks.',
    }),
    sl('check', 'Quick check: chloride shift', {
      b: 'Name the ion that moves into the red cell.',
      n: 'Quick check. What keeps the cell electrically balanced?',
      chk: 'cl-mcq',
    }),
    sl('concept', 'Regulation of breathing', {
      b: 'Breathing is controlled by the **respiratory rhythm centre** in the **medulla**, helped by the **pneumotaxic centre** in the **pons** and a **chemosensitive area** next to the rhythm centre. **Receptors in the aortic arch and carotid artery** also sense CO₂ and H⁺.',
      v: flow('LR', [['c', 'Rise in CO₂ and H⁺ in blood'], ['s', 'Chemosensitive area and aortic and carotid receptors'], ['m', 'Rhythm centre in the medulla'], ['p', 'Pneumotaxic centre moderates'], ['r', 'Faster, deeper breathing']], [['c', 's'], ['s', 'm'], ['m', 'p'], ['p', 'r']], 'Flow of the regulation of breathing after a rise in carbon dioxide'),
      n: 'Carbon dioxide and hydrogen ions in the blood are the main signals. When they rise, the chemosensitive area and the receptors on the large arteries send signals to the rhythm centre. The pneumotaxic centre can shorten inspiration and so change the rate. Oxygen has only a minor role.',
    }),
    sl('concept', 'Respiratory disorders', {
      b: 'Breathing problems arise from the airways, the alveoli or inhaled dust.',
      v: table(['Disorder', 'Cause', 'Effect'], [['Asthma', 'Inflammation of bronchi and bronchioles, often by an allergen', 'Wheezing and difficulty in breathing'], ['Emphysema', 'Damaged alveolar walls; cigarette smoking is a major cause', 'Fewer alveoli, less respiratory surface, breathlessness'], ['Occupational disorders (silicosis, asbestosis)', 'Long exposure to dust from grinding, stone-breaking or asbestos', 'Inflammation and fibrosis of lung tissue']], 'Table of respiratory disorders with causes and effects'),
      n: 'In asthma the airways narrow and the person wheezes. In emphysema the walls between alveoli break down, so the surface for exchange shrinks. Workers in stone, mining and asbestos industries can develop fibrosis, which is why dust masks and ventilation are required.',
    }),
    sl('check', 'Quick check: control of breathing', {
      b: 'Decide what happens when a person re-breathes the same air.',
      n: 'Quick check. Which gas builds up in the blood?',
      chk: 'chemo-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Gases diffuse down partial-pressure gradients across the thin diffusion membrane.',
        'Oxygen: about 97 percent as oxyhaemoglobin; the curve is sigmoid; higher pCO₂, acidity and temperature shift it right.',
        'Carbon dioxide: about 70 percent bicarbonate, about 23 percent carbamino-haemoglobin, about 7 percent dissolved; carbonic anhydrase; chloride shift.',
        'Breathing is controlled by the rhythm centre (medulla), the pneumotaxic centre (pons) and the chemosensitive area.',
        'Asthma, emphysema and occupational disorders.',
      ],
      v: table(['Gas', 'Main carrier', 'Key idea'], [['O₂', 'Haemoglobin', 'S-shaped curve; Bohr effect'], ['CO₂', 'Bicarbonate', 'Carbonic anhydrase; chloride shift']], 'Summary table of oxygen and carbon dioxide transport'),
      n: 'To recap: partial pressures drive diffusion in the lungs and tissues. Haemoglobin carries oxygen and releases it more freely in active tissues. Carbon dioxide is mainly carried as bicarbonate, and the chloride shift keeps the red cell balanced. Carbon dioxide level in the blood is the main drive to breathe.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe **direction** of diffusion by comparing partial pressures.',
        'For the curve, state both the **shape (sigmoid)** and the **direction of shift** with its cause.',
        'Name **carbonic anhydrase** and say **where** it works.',
        'Give **location and function** of each respiratory centre.',
      ],
      v: table(['Mistake', 'Correction'], [['Oxygen drives breathing in health', 'CO₂ and H⁺ are the main signals'], ['Chloride moves out with bicarbonate', 'Chloride moves in as bicarbonate moves out'], ['Asthma damages alveoli', 'That is emphysema']], 'Table of common mistakes and corrections'),
      n: 'Exam tips. Compare partial pressures to give a direction. Describe the curve shape and the cause of any shift. Name the enzyme and its location. And give the position and job of each centre in the brain.',
    }),
  ],
});
