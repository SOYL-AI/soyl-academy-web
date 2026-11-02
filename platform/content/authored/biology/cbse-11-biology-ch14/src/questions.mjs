// ch14 Breathing and Exchange of Gases — question bank. AR keys: a c d b c.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { RESP_Q } from './svgs.mjs';
import { PP, GRAD, ATM, round, PER100, Q, CASE, capacities } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const respFig = svgV(RESP_Q, 'Unlabelled respiratory system with five parts marked A to E');

// ---------------------------------------------------------------- t01 respiratory organs and the human respiratory system
add('trachea-insect-mcq', mcq({
  stem: 'A grasshopper’s blood carries very little oxygen, yet its flight muscles receive plenty while it jumps and flies. Which feature of its respiratory system explains this?',
  right: 'A network of tracheal tubes that carries air directly into the body',
  wrong: ['A pair of lungs opening at the mouth', 'Feathery gills folded under the abdomen', 'A moist cuticle richly supplied with blood vessels'],
  sol: 'Insects have a network of tubes (tracheal tubes) that carry atmospheric air within the body, so the blood need not transport oxygen — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('earthworm-mcq', mcq({
  stem: 'After a heavy shower, an earthworm crawls onto a sunny concrete path and dies within an hour as its body surface dries. How is this linked to the way it exchanges gases?',
  right: 'It respires through its moist cuticle, which cannot exchange gases once dry.',
  wrong: ['Its gills collapse when they are out of water.', 'Its lungs fill with dust from the dry path.', 'Its tracheal tubes close in strong sunlight.'],
  sol: 'Earthworms use their moist cuticle for exchange of gases; a dry cuticle stops diffusion — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('frog-mcq', mcq({
  stem: 'A frog spends the cold months buried in damp mud, hardly using its lungs at all. Which respiratory surface keeps it alive?',
  right: 'Its moist skin (cutaneous respiration)',
  wrong: ['Its gills (branchial respiration)', 'Its tracheal tubes', 'Its swim bladder'],
  sol: 'Amphibians such as frogs can respire through their moist skin — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('epiglottis-mcq', mcq({
  stem: 'Which structure covers the glottis during swallowing so that food does not enter the larynx?',
  right: 'Epiglottis',
  wrong: ['Pleura', 'Diaphragm', 'Tracheal cartilage ring'],
  sol: 'The epiglottis, a thin elastic cartilaginous flap, covers the glottis during swallowing — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bifurcate-mcq', mcq({
  stem: 'At the level of which vertebra does the human trachea divide into the right and left primary bronchi?',
  right: 'The fifth thoracic vertebra',
  wrong: ['The first cervical vertebra', 'The twelfth thoracic vertebra', 'The third lumbar vertebra'],
  sol: 'The trachea extends up to the mid-thoracic cavity and divides at the level of the fifth thoracic vertebra — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('conducting-mcq', mcq({
  stem: 'After throat surgery, a patient breathes for some days through a tube placed directly in the trachea, so inhaled air bypasses the nose. Which normal function of the conducting part is she most likely to lose?',
  right: 'Humidifying the air and bringing it to body temperature',
  wrong: ['Exchange of oxygen with the blood in the alveoli', 'Binding of oxygen to haemoglobin in red blood cells', 'Contraction of the diaphragm during inspiration'],
  sol: 'The conducting part from the nostrils clears, humidifies and warms the air; gas exchange, oxygen binding and the diaphragm are not functions of the bypassed airway — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('fig-trachea-mcq', mcq({
  stem: 'The figure shows the human respiratory system with five parts marked A to E. Which letter marks the straight tube that is held open by incomplete cartilaginous rings and divides at the level of the fifth thoracic vertebra?',
  right: 'C',
  wrong: ['B', 'D', 'E'],
  sol: 'A is the epiglottis, B the larynx, C the trachea, D a primary bronchus and E the diaphragm. The trachea, supported by incomplete cartilaginous rings, divides into the two primary bronchi — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [respFig],
}));
add('fig-diaphragm-mcq', mcq({
  stem: 'In the same figure, a thin dome-shaped sheet of muscle forms the floor of the air-tight thoracic chamber and flattens when it contracts. Which letter marks it?',
  right: 'E',
  wrong: ['A', 'B', 'D'],
  sol: 'E is the diaphragm, the lower boundary of the thoracic chamber; its contraction flattens it and enlarges the chest in the antero-posterior axis — option (@K).',
  d: 2, c: 'application', t: [1, 2],
  assets: [respFig],
}));
add('pleura-ar', ar({
  a: 'Each human lung is covered by a double-layered pleura with fluid between the two layers.',
  r: 'The pleural fluid reduces friction on the lung surface.',
  key: 'a',
  sol: 'Both are true, and reducing friction as the lungs move is the role of the fluid-filled double pleura — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('museum-match', match({
  stem: 'A museum display groups four animals by the way they exchange gases. Match each animal (column I) with its main respiratory surface or organ (column II).',
  pairs: [
    ['Earthworm', 'Moist cuticle'],
    ['Cockroach', 'Network of tracheal tubes'],
    ['Rohu (a freshwater fish)', 'Gills'],
    ['Pigeon', 'Lungs'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Earthworm: moist cuticle; cockroach (an insect): tracheal tubes; fish: gills; bird: lungs.',
  d: 1, c: 'recall', t: [1],
}));
add('chamber-fill', fill({
  stem: 'The floor of the air-tight thoracic chamber is formed by the dome-shaped ______.',
  acc: [['diaphragm']],
  sol: 'The diaphragm forms the lower side of the thoracic chamber.',
  d: 1, c: 'recall', t: [1],
}));
add('larynx-tf', tf({
  stem: 'The larynx is a cartilaginous box that helps in sound production and is therefore called the sound box.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('pathway-short3', short({
  marks: 3,
  stem: 'A child inhales a speck of chalk dust in class. Name, in order, the parts it would pass if it travelled from the external nostrils all the way to an alveolus, and say which part of the system normally stops such particles.',
  model: 'External nostrils → **nasal passage** → **nasal chamber** → **pharynx** → **larynx** (through the glottis) → **trachea** → **primary bronchus** → secondary and tertiary bronchi → **bronchioles** → **terminal bronchiole** → **alveolus**. Normally the **conducting part** (nostrils to terminal bronchioles) **clears inhaled air of foreign particles**, so the dust would usually be trapped long before reaching the alveoli.',
  sol: 'Correct sequence and role of the conducting part.',
  scheme: [['Nostrils to larynx in order', 1], ['Trachea to alveolus in order', 1], ['Conducting part clears particles', 1]],
  d: 2, c: 'application', t: [1],
}));
add('steps-short3', short({
  marks: 3,
  stem: 'List, in the correct order, the five steps involved in respiration, from breathing to the use of oxygen by cells.',
  model: '1. **Breathing (pulmonary ventilation):** atmospheric air is drawn in and carbon dioxide-rich alveolar air is released.\n2. **Diffusion** of oxygen and carbon dioxide across the **alveolar membrane**.\n3. **Transport** of the gases by the **blood**.\n4. **Diffusion** of oxygen and carbon dioxide between **blood and tissues**.\n5. **Utilisation of oxygen by cells** for catabolic reactions and release of carbon dioxide (**cellular respiration**).',
  sol: 'Five steps in order.',
  scheme: [['Breathing and alveolar diffusion', 1], ['Transport and tissue diffusion', 1], ['Cellular respiration; correct order', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('pleura-short2', short({
  marks: 2,
  stem: 'A knife wound lets outside air into the space between the two pleural layers on one side of the chest. Explain why the lung on that side stops filling with air even though the chest still moves.',
  model: 'Breathing works only because the **thoracic chamber is air-tight**, so a rise in thoracic volume is passed to the lung and **lowers the intra-pulmonary pressure**. With air in the pleural space the seal is broken: the chest expands but the **lung does not expand**, its pressure does not fall below atmospheric, and **no air is drawn in**.',
  sol: 'Air-tight chamber needed for the pressure fall.',
  scheme: [['Air-tight chamber passes volume change to lung', 1], ['Seal broken: no pressure fall, no inspiration', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('conducting-short2', short({
  marks: 2,
  stem: 'Distinguish between the conducting part and the exchange part of the human respiratory system, giving the extent and function of each.',
  model: '**Conducting part:** from the **external nostrils up to the terminal bronchioles**; it transports air to the alveoli, **clears** it of foreign particles, **humidifies** it and brings it to **body temperature**.\n\n**Exchange (respiratory) part:** the **alveoli and their ducts**, where oxygen and carbon dioxide actually **diffuse** between blood and air.',
  sol: 'Extent and function of each part.',
  scheme: [['Conducting: extent and functions', 1], ['Exchange: alveoli and ducts, diffusion', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('system-long', long({
  stem: 'Describe the structure of the human respiratory system from the external nostrils to the alveoli, including the thoracic chamber in which the lungs lie. Draw a labelled diagram.',
  model: '**Upper passages.** A pair of external nostrils opens above the upper lip and leads through the nasal passage into the nasal chamber, which opens into the pharynx, a common passage for food and air. The pharynx opens through the larynx into the trachea. The larynx is a cartilaginous box that helps in sound production (the sound box). During swallowing the glottis is covered by the epiglottis, a thin elastic cartilaginous flap, so food does not enter the larynx.\n\n**Airways.** The trachea is a straight tube reaching the mid-thoracic cavity, where it divides at the level of the fifth thoracic vertebra into right and left primary bronchi. These divide repeatedly into secondary and tertiary bronchi and bronchioles, ending in very thin terminal bronchioles. The trachea, bronchi and initial bronchioles are supported by incomplete cartilaginous rings. Each terminal bronchiole gives rise to many thin, irregular-walled, vascularised alveoli; bronchi, bronchioles and alveoli form the lungs.\n\n**Lungs and chest.** Each lung is covered by a double-layered pleura with pleural fluid that reduces friction. The lungs lie in the air-tight thoracic chamber, bounded by the vertebral column dorsally, the sternum ventrally, the ribs laterally and the dome-shaped diaphragm below, so changes in thoracic volume are passed to the lungs.\n\n**Parts.** The conducting part (nostrils to terminal bronchioles) cleans, humidifies and warms air; the exchange part (alveoli and their ducts) is the site of diffusion.\n\n*Diagram:* nostrils, nasal chamber, pharynx, larynx, epiglottis, trachea with rings, bronchi, bronchioles, alveoli, pleura, diaphragm.',
  sol: 'Passages, airways, lungs and chest, parts, diagram.',
  scheme: [['Nostrils to trachea with larynx and epiglottis', 1], ['Bronchi to alveoli with cartilage rings', 1], ['Pleura and thoracic chamber', 1], ['Conducting and exchange parts', 0.5], ['Labelled diagram', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('dust-long', long({
  stem: 'The owner of a granite-cutting workshop refuses to buy masks for his workers, arguing that “the nose and windpipe already filter out dust, so the lungs are safe”. Evaluate his argument, using what you know about the conducting part of the respiratory system and about occupational respiratory disorders, and recommend what should be done.',
  model: '**What is right in the argument.** The conducting part, from the external nostrils to the terminal bronchioles, does clear inhaled air of foreign particles, and it also humidifies the air and brings it to body temperature. In everyday life this protects the alveoli from most dust.\n\n**Why it fails here.** Stone-grinding and stone-breaking produce so much fine dust that the body’s defence mechanism cannot fully cope with it. Over long exposure dust reaches the lungs and causes inflammation, which leads to fibrosis, a proliferation of fibrous tissue. Fibrosis causes serious lung damage and makes breathing difficult; the damage builds up slowly, so workers may not notice it until it is serious. Such occupational respiratory disorders are well known in these industries.\n\n**Related risks.** Damaged lungs are less able to exchange gases, and irritants can also inflame the bronchi and bronchioles.\n\n**Judgement and recommendation.** The argument is unsound: natural filtering is enough for ordinary air, not for heavy industrial dust. The owner should provide protective masks and insist on their use, and should also reduce dust at its source, for example by wetting the stone while cutting and by ventilating the workshop. Regular health check-ups would detect lung damage early.',
  sol: 'Conducting part; why it is overwhelmed; fibrosis; masks.',
  scheme: [['Conducting part does filter ordinary air', 1], ['Heavy dust overwhelms defences', 1], ['Inflammation and fibrosis; lung damage', 1.5], ['Reasoned judgement with masks and other measures', 1.5]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 4],
}));

// ---------------------------------------------------------------- t02 mechanism of breathing and respiratory volumes
add('inspire-mcq', mcq({
  stem: 'A singer takes a deep breath before holding a long note. Which set of events happens in her chest during this inspiration?',
  right: 'The diaphragm and external intercostal muscles contract, and the pressure in the lungs falls below atmospheric pressure.',
  wrong: ['The diaphragm and external intercostal muscles relax, and the pressure in the lungs rises above atmospheric pressure.', 'The diaphragm relaxes while the ribs are lowered, and the pressure in the lungs stays the same.', 'The lungs expand by their own muscles, and the pressure in the chest rises above atmospheric pressure.'],
  sol: 'Contraction of the diaphragm and external intercostals enlarges the thorax and lungs, lowering the intra-pulmonary pressure below atmospheric so air enters — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('axis-mcq', mcq({
  stem: 'Contraction of the external intercostal muscles increases the volume of the thoracic chamber in which axis?',
  right: 'Dorso-ventral axis',
  wrong: ['Antero-posterior axis', 'Left–right axis only', 'No axis; it decreases the volume'],
  sol: 'The external intercostals lift the ribs and sternum, increasing the volume in the dorso-ventral axis; the diaphragm acts in the antero-posterior axis — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('expire-mcq', mcq({
  stem: 'Air flows out of the lungs during normal expiration because',
  right: 'the intra-pulmonary pressure becomes slightly higher than the atmospheric pressure',
  wrong: ['the intra-pulmonary pressure becomes lower than the atmospheric pressure', 'the diaphragm contracts and pushes the lungs downward', 'the alveoli actively squeeze out the air with their own muscles'],
  sol: 'Relaxation of the diaphragm and intercostals reduces the thoracic and pulmonary volume, raising the intra-pulmonary pressure above atmospheric — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('rate-mcq', mcq({
  stem: 'How many times a minute does a healthy adult breathe at rest?',
  right: '12–16',
  wrong: ['2–4', '30–40', '70–75'],
  sol: 'A healthy human breathes 12–16 times a minute — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('vc-mcq', mcq({
  stem: 'The maximum volume of air that a person can breathe out after a forced inspiration is the',
  right: 'vital capacity',
  wrong: ['total lung capacity', 'functional residual capacity', 'tidal volume'],
  sol: 'Vital capacity (ERV + TV + IRV) is the maximum volume breathed in after a forced expiration or out after a forced inspiration — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spirometer-mcq', mcq({
  stem: 'A doctor records a patient’s breathing with a spirometer, which measures only the air that moves in and out of the mouth. Which value can the spirometer NOT measure directly?',
  right: 'Residual volume',
  wrong: ['Tidal volume', 'Inspiratory reserve volume', 'Vital capacity'],
  sol: 'Residual volume remains in the lungs even after a forcible expiration, so it never passes through the spirometer; TV, IRV and VC are all breathed in or out — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('frc-mcq', mcq({
  stem: 'Which two volumes add up to the functional residual capacity?',
  right: 'Expiratory reserve volume and residual volume',
  wrong: ['Tidal volume and inspiratory reserve volume', 'Tidal volume and expiratory reserve volume', 'Inspiratory reserve volume and residual volume'],
  sol: 'FRC = ERV + RV, the air left in the lungs after a normal expiration — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('diaphragm-ar', ar({
  a: 'Contraction of the diaphragm helps in inspiration.',
  r: 'Contraction of the diaphragm decreases the volume of the thoracic chamber.',
  key: 'c',
  sol: 'A is true, but R is false: the contracting diaphragm increases the thoracic volume in the antero-posterior axis — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('tidal-fill', fill({
  stem: 'The volume of air inspired or expired during a normal respiration, about 500 mL, is called the ______ volume.',
  acc: [['tidal']],
  sol: 'Tidal volume.',
  d: 1, c: 'recall', t: [2],
}));
add('ec-tf', tf({
  stem: 'Expiratory capacity is the total volume of air a person can expire after a normal inspiration, and equals tidal volume plus expiratory reserve volume.',
  key: 't',
  sol: 'True: EC = TV + ERV.',
  d: 2, c: 'understanding', t: [2],
}));
add('ic-num', num({
  stem: `A spirometer shows that a boy’s tidal volume is ${Q.ic.TV} mL and his inspiratory reserve volume is ${Q.ic.IRV} mL. What is his inspiratory capacity in mL?`,
  value: Q.ic.ans, unit: 'mL',
  sol: r`$\text{IC} = \text{TV} + \text{IRV} = ${Q.ic.TV} + ${Q.ic.IRV} = ${Q.ic.ans}$ mL.`,
  scheme: [[`${Q.ic.ans} mL`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 3300 || 'value');
add('vc-num', num({
  stem: `A swimmer’s readings are tidal volume ${Q.vc.TV} mL, inspiratory reserve volume ${Q.vc.IRV} mL and expiratory reserve volume ${Q.vc.ERV} mL. Calculate her vital capacity in mL.`,
  value: Q.vc.ans, unit: 'mL',
  sol: r`$\text{VC} = \text{ERV} + \text{TV} + \text{IRV} = ${Q.vc.ERV} + ${Q.vc.TV} + ${Q.vc.IRV} = ${Q.vc.ans}$ mL.`,
  scheme: [[`${Q.vc.ans} mL`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4100 || 'value');
add('tlc-num', num({
  stem: `A man has a vital capacity of ${Q.tlc.VC} mL and a residual volume of ${Q.tlc.RV} mL. What is his total lung capacity in mL?`,
  value: Q.tlc.ans, unit: 'mL',
  sol: r`$\text{TLC} = \text{VC} + \text{RV} = ${Q.tlc.VC} + ${Q.tlc.RV} = ${Q.tlc.ans}$ mL.`,
  scheme: [[`${Q.tlc.ans} mL`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 5350 || 'value');
add('minute-num', num({
  stem: `While reading quietly, a girl breathes ${Q.minute.rate} times a minute with a tidal volume of ${Q.minute.tv} mL. How many mL of air does she breathe in each minute?`,
  value: Q.minute.ans, unit: 'mL',
  sol: r`$${Q.minute.tv} \times ${Q.minute.rate} = ${Q.minute.ans}$ mL per minute, inside the usual 6000–8000 mL.`,
  scheme: [[`${Q.minute.ans} mL`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 7500 || 'value');
add('irv-num', num({
  stem: `A lung-function report gives total lung capacity ${Q.irv.TLC} mL, functional residual capacity ${Q.irv.FRC} mL and tidal volume ${Q.irv.TV} mL. Find the inspiratory reserve volume in mL.`,
  value: Q.irv.ans, unit: 'mL',
  sol: r`TLC is FRC plus IC, so $\text{IC} = ${Q.irv.TLC} - ${Q.irv.FRC} = ${Q.irv.ic}$ mL. Since IC = TV + IRV, $\text{IRV} = ${Q.irv.ic} - ${Q.irv.TV} = ${Q.irv.ans}$ mL.`,
  scheme: [['IC = TLC − FRC', 0.5], [`IRV = ${Q.irv.ans} mL`, 0.5]],
  d: 4, c: 'application', t: [2],
}), (q) => q.answer.value === 3000 && capacities({ TV: 500, IRV: 3000, ERV: 1100, RV: 1200 }).TLC === 5800 || 'value');
add('diaphragm-short2', short({
  marks: 2,
  stem: 'Nerve damage leaves a patient’s diaphragm unable to contract. Explain how this affects inspiration and which muscles can still enlarge the chest.',
  model: 'Normally the **contracting diaphragm** flattens and increases thoracic volume in the **antero-posterior axis**; without it, inspiration is much **weaker**, as the volume and the fall in lung pressure are smaller. The **external intercostal muscles** can still lift the **ribs and sternum**, enlarging the chest in the **dorso-ventral axis**.',
  sol: 'Loss of antero-posterior enlargement; intercostals still act.',
  scheme: [['Diaphragm role lost: weaker inspiration', 1], ['External intercostals: dorso-ventral axis', 1]],
  d: 3, c: 'application', t: [2],
}));
add('expiration-short2', short({
  marks: 2,
  stem: 'Describe the sequence of events during normal, quiet expiration.',
  model: 'The **diaphragm and the intercostal muscles relax**, so the diaphragm returns to its dome shape and the ribs and sternum return to their normal positions. The **thoracic and pulmonary volumes decrease**, the **intra-pulmonary pressure rises** slightly above atmospheric pressure, and air is **expelled** from the lungs.',
  sol: 'Relaxation, volume fall, pressure rise, air out.',
  scheme: [['Muscles relax; diaphragm and sternum return', 1], ['Volume falls, pressure rises, air out', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('capacities-short3', short({
  marks: 3,
  stem: 'Define inspiratory capacity, functional residual capacity and total lung capacity, writing each as a sum of respiratory volumes.',
  model: '**Inspiratory capacity (IC):** the total volume of air a person can inspire after a normal expiration; **IC = TV + IRV**.\n\n**Functional residual capacity (FRC):** the volume of air that remains in the lungs after a normal expiration; **FRC = ERV + RV**.\n\n**Total lung capacity (TLC):** the total volume of air in the lungs at the end of a forced inspiration; **TLC = RV + ERV + TV + IRV**, or **VC + RV**.',
  sol: 'Three definitions with sums.',
  scheme: [['IC with sum', 1], ['FRC with sum', 1], ['TLC with sum', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('breath-short3', short({
  marks: 3,
  stem: 'Compare inspiration and expiration under three headings: the state of the diaphragm, the change in thoracic volume, and the intra-pulmonary pressure.',
  model: '**Diaphragm:** in inspiration it **contracts** and flattens; in expiration it **relaxes** and returns to its dome shape.\n\n**Thoracic volume:** in inspiration it **increases** (antero-posterior and dorso-ventral axes, with the external intercostals lifting the ribs and sternum); in expiration it **decreases**.\n\n**Intra-pulmonary pressure:** in inspiration it falls **below atmospheric pressure**, so air enters; in expiration it rises **above atmospheric pressure**, so air leaves.',
  sol: 'Three contrasts.',
  scheme: [['Diaphragm', 1], ['Thoracic volume', 1], ['Pressure and air movement', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('mechanism-long', long({
  stem: 'Explain the mechanism of breathing in humans. Describe the roles of the air-tight thoracic chamber, the diaphragm and the intercostal muscles, and how pressure changes move air in and out.',
  model: '**Principle.** Breathing has two stages, inspiration and expiration. Air moves because a pressure gradient is created between the lungs and the atmosphere: inspiration occurs when the intra-pulmonary pressure is less than atmospheric pressure (a negative pressure in the lungs), and expiration when it is higher than atmospheric pressure.\n\n**Air-tight chamber.** The lungs lie in the thoracic chamber, formed by the vertebral column, sternum, ribs and the dome-shaped diaphragm. It is anatomically air-tight, so any change in its volume is reflected in the pulmonary cavity. We cannot change the lung volume directly; we change the volume of the chest instead.\n\n**Inspiration.** The diaphragm contracts and flattens, increasing the volume of the thoracic chamber in the antero-posterior axis. The external intercostal muscles contract and lift the ribs and the sternum, increasing the volume in the dorso-ventral axis. The pulmonary volume rises, the intra-pulmonary pressure falls below atmospheric pressure, and air rushes into the lungs.\n\n**Expiration.** The diaphragm and the intercostal muscles relax, returning the diaphragm and sternum to their normal positions. The thoracic and pulmonary volumes fall, the intra-pulmonary pressure rises slightly above atmospheric pressure, and air is expelled.\n\n**Extra effort.** Additional abdominal muscles can increase the strength of inspiration and expiration. A healthy person breathes 12–16 times a minute, moving about 500 mL of air in each normal breath.',
  sol: 'Pressure gradient; air-tight chest; inspiration; expiration.',
  scheme: [['Pressure gradient principle', 1], ['Air-tight thoracic chamber', 1], ['Inspiration: diaphragm and external intercostals, axes', 1.5], ['Expiration', 1], ['Abdominal muscles or rate', 0.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 exchange, transport and regulation
add('gradient-mcq', mcq({
  stem: 'Which pair of partial pressures drives carbon dioxide out of the blood arriving at the lungs and into the alveolar air?',
  right: `pCO₂ ${PP.deoxy.co2} mm Hg in the blood and ${PP.alveoli.co2} mm Hg in the alveoli`,
  wrong: [`pCO₂ ${PP.alveoli.co2} mm Hg in the blood and ${PP.deoxy.co2} mm Hg in the alveoli`, `pCO₂ ${PP.air.co2} mm Hg in the blood and ${PP.alveoli.co2} mm Hg in the alveoli`, `pCO₂ ${PP.oxy.o2} mm Hg in the blood and ${PP.alveoli.o2} mm Hg in the alveoli`],
  sol: `Deoxygenated blood has pCO₂ ${PP.deoxy.co2} and alveoli ${PP.alveoli.co2} mm Hg, so carbon dioxide diffuses from blood to alveoli — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('layers-mcq', mcq({
  stem: 'Which of these is NOT one of the three major layers of the diffusion membrane in the lungs?',
  right: 'The inner pleural membrane',
  wrong: ['The thin squamous epithelium of the alveoli', 'The endothelium of the alveolar capillaries', 'The basement substance between them'],
  sol: 'The diffusion membrane is made of alveolar squamous epithelium, capillary endothelium and the basement substance; the pleura covers the whole lung — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('o2plasma-mcq', mcq({
  stem: 'About what percentage of the oxygen carried in blood is dissolved in the plasma?',
  right: '3 percent',
  wrong: ['97 percent', '70 percent', '25 percent'],
  sol: 'About 97 percent of oxygen is carried by RBCs and the remaining 3 percent is dissolved in plasma — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('co2form-mcq', mcq({
  stem: 'In which form is the largest share of carbon dioxide carried in the blood?',
  right: 'As bicarbonate, about 70 percent',
  wrong: ['As carbamino-haemoglobin, about 70 percent', 'Dissolved in plasma, about 70 percent', 'As oxyhaemoglobin, about 20 percent'],
  sol: 'About 70 percent of carbon dioxide travels as bicarbonate, 20–25 percent as carbamino-haemoglobin and about 7 percent dissolved — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('carbamino-mcq', mcq({
  stem: 'Blood flows through the capillaries of an active thigh muscle, where pCO₂ is high and pO₂ is low. What happens to carbon dioxide binding with haemoglobin there?',
  right: 'More carbon dioxide binds to haemoglobin as carbamino-haemoglobin.',
  wrong: ['Carbon dioxide is released from carbamino-haemoglobin.', 'Haemoglobin binds oxygen more tightly instead.', 'Bicarbonate is converted back into carbon dioxide.'],
  sol: 'High pCO₂ and low pO₂, as in the tissues, favour binding of carbon dioxide to haemoglobin; release happens in the alveoli — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('shift-mcq', mcq({
  stem: 'During a sprint, the leg muscles become warmer and more acidic and produce extra carbon dioxide. What is the effect on the oxyhaemoglobin reaching those muscles?',
  right: 'It gives up more of its oxygen to the muscles.',
  wrong: ['It holds its oxygen more tightly than at rest.', 'It changes into carbamino-haemoglobin without losing oxygen.', 'It is unaffected, because only pO₂ matters.'],
  sol: 'Higher temperature, more H⁺ and high pCO₂ favour dissociation of oxygen from oxyhaemoglobin, releasing more oxygen to the working muscle — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('alveoli-favour-mcq', mcq({
  stem: 'Which set of conditions in the alveoli favours the formation of oxyhaemoglobin?',
  right: 'High pO₂, low pCO₂, fewer hydrogen ions and lower temperature',
  wrong: ['Low pO₂, high pCO₂, more hydrogen ions and higher temperature', 'High pO₂, high pCO₂, more hydrogen ions and higher temperature', 'Low pO₂, low pCO₂, fewer hydrogen ions and lower temperature'],
  sol: 'In the alveoli high pO₂, low pCO₂, lesser H⁺ concentration and lower temperature favour oxyhaemoglobin formation — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('anhydrase-mcq', mcq({
  stem: 'In an experiment, an inhibitor blocks the enzyme carbonic anhydrase inside red blood cells. Which form of carbon dioxide transport would fall the most?',
  right: 'Transport as bicarbonate',
  wrong: ['Transport as carbamino-haemoglobin', 'Transport dissolved in plasma', 'Transport bound to oxyhaemoglobin'],
  sol: 'Carbonic anhydrase speeds the conversion of carbon dioxide and water into carbonic acid and then bicarbonate; bicarbonate carries about 70 percent, so it falls most — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('centre-mcq', mcq({
  stem: 'The respiratory rhythm centre, primarily responsible for regulating breathing, is located in the',
  right: 'medulla',
  wrong: ['pons', 'cerebellum', 'hypothalamus'],
  sol: 'The respiratory rhythm centre is in the medulla; the pneumotaxic centre is in the pons — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chemo-mcq', mcq({
  stem: 'While holding her breath under water, a swimmer soon feels a strong urge to breathe. Which change is mainly detected to produce this urge?',
  right: 'A rise in carbon dioxide and hydrogen ions, sensed next to the rhythm centre',
  wrong: ['A fall in oxygen, sensed by the pneumotaxic centre in the pons', 'A rise in oxygen, sensed by stretch receptors in the alveoli', 'A fall in body temperature, sensed by the diaphragm muscle'],
  sol: 'The chemosensitive area next to the rhythm centre is highly sensitive to carbon dioxide and hydrogen ions; the role of oxygen in regulation is quite insignificant — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('solubility-ar', ar({
  a: 'For the same difference in partial pressure, oxygen diffuses across the alveolar membrane in larger amounts than carbon dioxide.',
  r: 'The solubility of carbon dioxide is 20–25 times higher than that of oxygen.',
  key: 'd',
  sol: 'A is false: because carbon dioxide is 20–25 times more soluble (R, true), much more carbon dioxide than oxygen diffuses per unit difference in partial pressure — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('transport-ar', ar({
  a: 'Nearly 97 percent of the oxygen in blood is carried by red blood cells.',
  r: 'About 70 percent of carbon dioxide is carried in the blood as bicarbonate.',
  key: 'b',
  sol: 'Both statements are true, but the transport of carbon dioxide does not explain how oxygen is carried — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('pneumo-ar', ar({
  a: 'The pneumotaxic centre can alter the rate of breathing.',
  r: 'The pneumotaxic centre is located in the medulla.',
  key: 'c',
  sol: 'A is true: its signal can shorten inspiration and so change the rate. R is false: the pneumotaxic centre is in the pons — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('carotid-fill', fill({
  stem: 'Receptors associated with the aortic arch and the ______ artery can recognise changes in carbon dioxide and hydrogen ion concentration.',
  acc: [['carotid']],
  sol: 'The carotid artery.',
  d: 2, c: 'recall', t: [3],
}));
add('sigmoid-tf', tf({
  stem: 'A plot of the percentage saturation of haemoglobin with oxygen against pO₂ gives a sigmoid curve.',
  key: 't',
  sol: 'True: this is the oxygen dissociation curve.',
  d: 1, c: 'recall', t: [3],
}));
add('deliver-num', num({
  stem: `Under normal conditions every 100 mL of oxygenated blood delivers about ${PER100.o2} mL of oxygen to the tissues. How many mL of oxygen are delivered when ${Q.deliver.flow} mL of blood passes through the tissues?`,
  value: Q.deliver.ans, unit: 'mL',
  sol: r`$\dfrac{${Q.deliver.flow}}{100} \times ${PER100.o2} = ${Q.deliver.ans}$ mL of oxygen.`,
  scheme: [[`${Q.deliver.ans} mL`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 300 || 'value');
add('atm-num', num({
  stem: `Dry air at sea level has a total pressure of ${ATM.p} mm Hg, and oxygen makes up ${round(ATM.f * 100, 1)} percent of it. Calculate the partial pressure of oxygen to the nearest whole number of mm Hg.`,
  value: round(ATM.o2), tol: 0.5, unit: 'mm Hg',
  sol: r`$\text{pO}_2 = ${ATM.p} \times ${ATM.f} = ${ATM.o2} \approx ${round(ATM.o2)}$ mm Hg, the value in the textbook table for atmospheric air.`,
  scheme: [[`${round(ATM.o2)} mm Hg`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 159 || 'value');
add('bicarb-num', num({
  stem: `In one minute the tissues of a resting man add ${Q.bicarb.co2} mL of carbon dioxide to the blood. If about ${Q.bicarb.pct} percent of it is carried as bicarbonate, how many mL is that?`,
  value: Q.bicarb.ans, unit: 'mL',
  sol: r`$${Q.bicarb.co2} \times \dfrac{${Q.bicarb.pct}}{100} = ${Q.bicarb.ans}$ mL.`,
  scheme: [[`${Q.bicarb.ans} mL`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 140 || 'value');
add('exchange-short2', short({
  marks: 2,
  stem: `At the lungs, the partial-pressure difference is ${GRAD.o2Lung} mm Hg for oxygen but only ${GRAD.co2Lung} mm Hg for carbon dioxide. Explain how carbon dioxide is still removed efficiently.`,
  model: 'The rate of diffusion depends not only on the pressure gradient but also on **solubility**. Carbon dioxide is **20–25 times more soluble** than oxygen, so far **more carbon dioxide diffuses per unit difference** in partial pressure. The very **thin diffusion membrane** also helps.',
  sol: 'Higher solubility of carbon dioxide; thin membrane.',
  scheme: [['Solubility 20–25 times higher', 1], ['More diffuses per unit pressure difference', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('oxygen-short2', short({
  marks: 2,
  stem: 'Describe how oxygen is carried in human blood, giving the percentages and the role of haemoglobin.',
  model: 'About **97 percent** of oxygen is carried by **red blood cells**, bound reversibly to **haemoglobin**, a red iron-containing pigment, as **oxyhaemoglobin**; each haemoglobin molecule carries up to **four** oxygen molecules. The remaining **3 percent** is **dissolved in plasma**.',
  sol: 'Percentages and haemoglobin.',
  scheme: [['97 percent as oxyhaemoglobin, up to four molecules', 1], ['3 percent dissolved in plasma', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('bicarb-short3', short({
  marks: 3,
  stem: 'Explain how carbon dioxide produced in the tissues is converted to bicarbonate and released again at the alveoli. Write the reaction and name the enzyme.',
  model: 'RBCs contain a high concentration of **carbonic anhydrase** (a little is in plasma), which speeds the reaction both ways:\n\n$$\\ce{CO2 + H2O <=> H2CO3 <=> HCO3- + H+}$$\n\nIn the **tissues**, pCO₂ is high, so carbon dioxide combines with water to form carbonic acid, which dissociates into **bicarbonate** and hydrogen ions. At the **alveoli**, pCO₂ is low, so the reaction runs **backwards**: bicarbonate forms carbonic acid, which gives carbon dioxide and water, and the **carbon dioxide is released** into alveolar air.',
  sol: 'Enzyme, equation, direction at each site.',
  scheme: [['Carbonic anhydrase in RBCs', 1], ['Equation', 1], ['Forward in tissues, reverse in alveoli', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('curve-short3', short({
  marks: 3,
  stem: 'What is the oxygen dissociation curve? Using it, explain why haemoglobin loads oxygen in the lungs but unloads it in a contracting muscle.',
  model: 'It is the **sigmoid** plot of the **percentage saturation of haemoglobin** with oxygen against **pO₂**.\n\nIn the **lungs**, high pO₂, low pCO₂, fewer H⁺ ions and lower temperature place haemoglobin near the top of the curve, so **oxyhaemoglobin forms**.\n\nIn a **contracting muscle**, pO₂ is low while pCO₂, H⁺ and temperature are high; saturation drops along the steep part of the curve, so **oxygen dissociates** and is released to the muscle.',
  sol: 'Definition; loading and unloading conditions.',
  scheme: [['Definition, sigmoid', 1], ['Loading conditions in lungs', 1], ['Unloading conditions in muscle', 1]],
  d: 3, c: 'application', t: [3],
}));
add('regulation-short3', short({
  marks: 3,
  stem: 'State the roles of the respiratory rhythm centre, the pneumotaxic centre and the chemosensitive area in regulating breathing.',
  model: '**Respiratory rhythm centre** (medulla): primarily responsible for regulating the rhythm of breathing.\n\n**Pneumotaxic centre** (pons): moderates the rhythm centre; its signal can **reduce the duration of inspiration** and thereby alter the respiratory rate.\n\n**Chemosensitive area** (beside the rhythm centre): highly sensitive to **carbon dioxide and hydrogen ions**; a rise activates it, and it signals the rhythm centre to adjust breathing so these are eliminated.',
  sol: 'Three roles with locations.',
  scheme: [['Rhythm centre, medulla', 1], ['Pneumotaxic centre, pons, shortens inspiration', 1], ['Chemosensitive area, carbon dioxide and H⁺', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('transport-long', long({
  stem: 'Explain how oxygen and carbon dioxide are exchanged at the alveoli and the tissues, and how each gas is transported in the blood.',
  model: '**Exchange.** Gases are exchanged by simple diffusion down partial-pressure gradients at the alveoli and at the tissues. Alveolar air has pO₂ 104 and pCO₂ 40 mm Hg; deoxygenated blood arriving has pO₂ 40 and pCO₂ 45, so oxygen diffuses into the blood and carbon dioxide into the alveoli. Oxygenated blood (pO₂ 95, pCO₂ 40) reaches tissues with pO₂ 40 and pCO₂ 45, so oxygen moves into the tissues and carbon dioxide into the blood. Carbon dioxide is 20–25 times more soluble than oxygen, and the diffusion membrane (alveolar squamous epithelium, basement substance and capillary endothelium) is much less than a millimetre thick, so diffusion is efficient.\n\n**Oxygen transport.** About 97 percent is carried by RBCs as oxyhaemoglobin, each haemoglobin carrying up to four oxygen molecules; 3 percent is dissolved in plasma. High pO₂, low pCO₂, fewer H⁺ ions and lower temperature in the alveoli favour loading; the opposite conditions in the tissues favour unloading, as the sigmoid oxygen dissociation curve shows. Each 100 mL of oxygenated blood delivers about 5 mL of oxygen.\n\n**Carbon dioxide transport.** About 20–25 percent travels as carbamino-haemoglobin, 70 percent as bicarbonate and 7 percent dissolved in plasma. Carbonic anhydrase in RBCs converts carbon dioxide and water to carbonic acid and then bicarbonate in the tissues, and reverses the reaction in the alveoli. Each 100 mL of deoxygenated blood delivers about 4 mL of carbon dioxide to the alveoli.',
  sol: 'Exchange with partial pressures; oxygen transport; carbon dioxide transport.',
  scheme: [['Exchange by diffusion with partial pressures', 1.5], ['Solubility and membrane', 0.5], ['Oxygen transport with conditions', 1.5], ['Carbon dioxide transport with carbonic anhydrase', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [3],
}));
add('regulation-long', long({
  stem: 'Ravi runs up four flights of stairs, and his breathing becomes faster and deeper within seconds. Explain how the neural system brings about this change, naming the centres and sensors involved, and say why a fall in oxygen is not the main trigger.',
  model: '**What changes.** Climbing stairs makes the leg muscles respire faster, so they release more carbon dioxide into the blood, and hydrogen ions rise with it.\n\n**Sensors.** A chemosensitive area situated next to the respiratory rhythm centre is highly sensitive to carbon dioxide and hydrogen ions. When these rise, the area is activated and signals the rhythm centre to make adjustments so that the extra carbon dioxide and hydrogen ions are eliminated. Receptors associated with the aortic arch and the carotid artery also recognise the changes and send signals to the rhythm centre.\n\n**Centres.** The respiratory rhythm centre in the medulla is primarily responsible for regulating breathing; it drives the diaphragm and intercostal muscles harder and more often. The pneumotaxic centre in the pons can moderate the rhythm centre: its signal can reduce the duration of inspiration and so alter the respiratory rate, helping Ravi take faster breaths.\n\n**Result.** Breathing becomes faster and deeper, more carbon dioxide is breathed out and more oxygen taken in, until the levels return to normal.\n\n**Why not oxygen.** The role of oxygen in regulating the respiratory rhythm is quite insignificant; breathing is adjusted mainly by carbon dioxide and hydrogen ions.',
  sol: 'Stimulus; sensors; centres; result; oxygen insignificant.',
  scheme: [['More carbon dioxide and H⁺ from muscles', 1], ['Chemosensitive area and aortic or carotid receptors', 1.5], ['Rhythm centre in medulla; pneumotaxic centre in pons', 1.5], ['Oxygen role insignificant', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 disorders
add('asthma-mcq', mcq({
  stem: 'Each spring, when trees release pollen, a boy has attacks of wheezing and difficulty in breathing because his bronchi and bronchioles become inflamed. Which disorder is this?',
  right: 'Asthma',
  wrong: ['Emphysema', 'An occupational respiratory disorder', 'Fibrosis of the alveoli from stone dust'],
  sol: 'Asthma is difficulty in breathing with wheezing, due to inflammation of the bronchi and bronchioles — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('emphysema-mcq', mcq({
  stem: 'A patient who smoked for thirty years is found to have damaged alveolar walls and a much reduced respiratory surface. Which disorder is this?',
  right: 'Emphysema',
  wrong: ['Asthma', 'Tetany', 'Hypertension'],
  sol: 'Emphysema is a chronic disorder in which alveolar walls are damaged and the respiratory surface decreases; cigarette smoking is a major cause — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('occupational-mcq', mcq({
  stem: 'Workers at a stone-crushing site develop inflammation and fibrosis of the lungs after years on the job. Which measure would best prevent this?',
  right: 'Wearing protective masks while working',
  wrong: ['Breathing faster to clear the dust', 'Drinking more water during shifts', 'Working only in the afternoons'],
  sol: 'Dust in stone-grinding and stone-breaking industries overwhelms the defences and causes fibrosis; workers should wear protective masks — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('disorder-short2', short({
  marks: 2,
  stem: 'Distinguish between asthma and emphysema, stating the part of the respiratory system affected in each.',
  model: '**Asthma:** difficulty in breathing with **wheezing**, caused by **inflammation of the bronchi and bronchioles**.\n\n**Emphysema:** a **chronic** disorder in which the **alveolar walls are damaged**, so the **respiratory surface decreases**; cigarette smoking is a major cause.',
  sol: 'Part affected and effect for each.',
  scheme: [['Asthma: inflamed bronchi and bronchioles, wheezing', 1], ['Emphysema: damaged alveolar walls, less surface', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('occupational-short2', short({
  marks: 2,
  stem: 'Why are people working in stone-grinding units at special risk of lung damage, and what precaution should they take?',
  model: 'Grinding and breaking stone release **so much dust** that the body’s **defence mechanism cannot fully cope**. Long exposure causes **inflammation** leading to **fibrosis** (proliferation of fibrous tissue), which seriously damages the lungs. Workers should wear **protective masks**.',
  sol: 'Dust overload, fibrosis, masks.',
  scheme: [['Dust overwhelms defences; inflammation and fibrosis', 1], ['Protective masks', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const s = CASE.spiro;
  add('spiro-case', mk.case({
    passage: `In a biology practical, Meera breathes into a spirometer. Her readings are:\n\n| Volume | mL |\n|---|---|\n| Tidal volume (TV) | ${s.TV} |\n| Inspiratory reserve volume (IRV) | ${s.IRV} |\n| Expiratory reserve volume (ERV) | ${s.ERV} |\n\nHer teacher adds that her residual volume (RV) is estimated at about ${s.RV} mL.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which of the four values could the spirometer not have measured directly?',
        right: 'Residual volume',
        wrong: ['Tidal volume', 'Inspiratory reserve volume', 'Expiratory reserve volume'],
        sol: 'Residual volume stays in the lungs even after forcible expiration, so it never reaches the spirometer — option (@K).',
        d: 2, c: 'understanding', t: [2],
      })),
      part('b', num({
        stem: 'Calculate Meera’s vital capacity in mL.',
        value: s.cap.VC, unit: 'mL',
        sol: r`$\text{VC} = \text{ERV} + \text{TV} + \text{IRV} = ${s.ERV} + ${s.TV} + ${s.IRV} = ${s.cap.VC}$ mL.`,
        scheme: [[`${s.cap.VC} mL`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Calculate her inspiratory capacity and functional residual capacity, showing which volumes you add.',
        model: r`$\text{IC} = \text{TV} + \text{IRV} = ${s.TV} + ${s.IRV} = ${s.cap.IC}$ mL, the most she can breathe in after a normal breath out. $\text{FRC} = \text{ERV} + \text{RV} = ${s.ERV} + ${s.RV} = ${s.cap.FRC}$ mL, the air left in her lungs after a normal expiration.`,
        sol: 'Two sums.',
        scheme: [[`IC = ${s.cap.IC} mL`, 1], [`FRC = ${s.cap.FRC} mL`, 1]],
        wl: [20, 50],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Find her total lung capacity and explain how it differs from her vital capacity.',
          model: r`$\text{TLC} = \text{VC} + \text{RV} = ${s.cap.VC} + ${s.RV} = ${s.cap.TLC}$ mL. Total lung capacity is all the air in the lungs at the end of a forced inspiration, while vital capacity **leaves out the residual volume**, which can never be breathed out.`,
          sol: 'TLC and the difference.',
          scheme: [[`TLC = ${s.cap.TLC} mL`, 1], ['VC excludes residual volume', 1]],
          wl: [20, 50],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 4700 || 'value');
}
{
  add('pressure-case', mk.case({
    passage: `A textbook table lists the partial pressures (mm Hg) of the two respiratory gases at five sites.\n\n| Site | pO₂ | pCO₂ |\n|---|---|---|\n| ${PP.air.name} | ${PP.air.o2} | ${PP.air.co2} |\n| ${PP.alveoli.name} | ${PP.alveoli.o2} | ${PP.alveoli.co2} |\n| ${PP.deoxy.name} | ${PP.deoxy.o2} | ${PP.deoxy.co2} |\n| ${PP.oxy.name} | ${PP.oxy.o2} | ${PP.oxy.co2} |\n| ${PP.tissues.name} | ${PP.tissues.o2} | ${PP.tissues.co2} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Among the sites inside the body, where is the partial pressure of oxygen highest?',
        right: 'Alveoli',
        wrong: ['Oxygenated blood', 'Deoxygenated blood', 'Tissues'],
        sol: `Alveoli have pO₂ ${PP.alveoli.o2} mm Hg, higher than oxygenated blood (${PP.oxy.o2}) — option (@K).`,
        d: 1, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'By how many mm Hg does pO₂ in oxygenated blood exceed pO₂ in the tissues?',
        value: GRAD.o2Tissue, unit: 'mm Hg',
        sol: r`$${PP.oxy.o2} - ${PP.tissues.o2} = ${GRAD.o2Tissue}$ mm Hg, so oxygen diffuses from blood into the tissues.`,
        scheme: [[`${GRAD.o2Tissue} mm Hg`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Using the table, state the direction in which carbon dioxide diffuses at the tissues and at the alveoli, and why.',
        model: `At the **tissues** pCO₂ is ${PP.tissues.co2}, higher than in oxygenated blood (${PP.oxy.co2}), so carbon dioxide diffuses **from tissues into blood**. At the **alveoli** deoxygenated blood has pCO₂ ${PP.deoxy.co2}, higher than alveolar air (${PP.alveoli.co2}), so it diffuses **from blood into alveoli**: always down its gradient.`,
        sol: 'Both directions with values.',
        scheme: [['Tissues to blood, with values', 1], ['Blood to alveoli, with values', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The difference in pCO₂ between deoxygenated blood and alveolar air is small. Why is this small gradient enough for carbon dioxide to leave the blood?',
          model: `The gradient is only ${PP.deoxy.co2} − ${PP.alveoli.co2} mm Hg, but carbon dioxide is **20–25 times more soluble** than oxygen, so a **much larger amount diffuses per unit difference** in partial pressure. The **diffusion membrane is very thin**, much less than a millimetre.`,
          sol: 'Solubility and thin membrane.',
          scheme: [['20–25 times more soluble', 1], ['More diffuses per unit difference; thin membrane', 1]],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 55 || 'value');
}
{
  const e = CASE.exercise;
  add('exercise-case', mk.case({
    passage: `A PE teacher measures breathing in a student before and during a fast run.\n\n| | Tidal volume (mL) | Breaths per minute |\n|---|---|---|\n| At rest | ${e.tvRest} | ${e.rateRest} |\n| Running | ${e.tvRun} | ${e.rateRun} |\n\nDuring the run the student’s leg muscles become warm, produce extra carbon dioxide and become more acidic.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which part of the brain detects the rise in carbon dioxide and hydrogen ions and passes the signal to the rhythm centre?',
        right: 'The chemosensitive area beside the rhythm centre',
        wrong: ['The pneumotaxic centre in the pons', 'The cerebellum', 'The hypothalamus'],
        sol: 'The chemosensitive area adjacent to the rhythm centre is highly sensitive to carbon dioxide and hydrogen ions — option (@K).',
        d: 2, c: 'understanding', t: [3],
      })),
      part('b', num({
        stem: 'How many mL of air does the student breathe in per minute while running?',
        value: e.run, unit: 'mL',
        sol: r`$${e.tvRun} \times ${e.rateRun} = ${e.run}$ mL per minute (at rest $${e.tvRest} \times ${e.rateRest} = ${e.rest}$ mL).`,
        scheme: [[`${e.run} mL`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'How do the conditions in the working leg muscles affect the release of oxygen from oxyhaemoglobin there?',
        model: 'In the working muscles **pO₂ is low**, while **pCO₂, hydrogen ion concentration and temperature are high**. These conditions favour the **dissociation of oxygen** from oxyhaemoglobin, so **more oxygen is released** to the muscles, shown by a right shift of the oxygen dissociation curve.',
        sol: 'Conditions favour dissociation.',
        scheme: [['Low pO₂, high pCO₂, H⁺, temperature', 1], ['More oxygen released', 1]],
        d: 3, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'During the run, how does the pneumotaxic centre help to raise the breathing rate, and where is it located?',
          model: 'The **pneumotaxic centre** lies in the **pons**. It moderates the respiratory rhythm centre in the medulla: its neural signal can **reduce the duration of inspiration**, so each breath is shorter and the **respiratory rate rises**.',
          sol: 'Pons; shortens inspiration.',
          scheme: [['Located in the pons', 1], ['Shortens inspiration, raising rate', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 45000 || 'value');
}
{
  const k = CASE.quarry;
  add('quarry-case', mk.case({
    passage: `A health team examines ${k.workers} workers at a granite quarry where stone is broken and ground without masks. Chest scans show that ${k.fibrosis} of them have fibrosis of the lungs. Most affected workers have worked there for more than ten years.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The lung problem found in these workers is best classed as',
        right: 'an occupational respiratory disorder',
        wrong: ['asthma caused by pollen', 'emphysema caused by smoking', 'a disorder of the respiratory rhythm centre'],
        sol: 'Long exposure to industrial dust causing inflammation and fibrosis is an occupational respiratory disorder — option (@K).',
        d: 1, c: 'application', t: [4],
      })),
      part('b', num({
        stem: 'What percentage of the workers examined has fibrosis?',
        value: k.pct, unit: '%',
        sol: r`$\dfrac{${k.fibrosis}}{${k.workers}} \times 100 = ${k.pct}$ percent.`,
        scheme: [[`${k.pct}%`, 1]],
        d: 1, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain how long exposure to quarry dust leads to fibrosis, and suggest one precaution for the workers.',
        model: 'Breaking and grinding stone produces **so much dust** that the body’s **defences cannot cope**. Dust reaching the lungs over many years causes **inflammation**, which leads to **fibrosis**, a proliferation of fibrous tissue that damages the lungs. Workers should wear **protective masks**.',
        sol: 'Dust, inflammation, fibrosis; masks.',
        scheme: [['Dust overload, inflammation, fibrosis', 1], ['Protective masks', 1]],
        d: 2, c: 'application', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'A worker who also smokes is found to have damaged alveolar walls. Name this second disorder and say how it reduces gas exchange.',
          model: 'This is **emphysema**, a chronic disorder in which the **alveolar walls are damaged**; cigarette smoking is a major cause. Damage to the alveolar walls **reduces the respiratory surface**, so less oxygen and carbon dioxide can diffuse between air and blood.',
          sol: 'Emphysema; less surface.',
          scheme: [['Emphysema', 1], ['Reduced respiratory surface, less exchange', 1]],
          d: 2, c: 'application', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 || 'value');
}
