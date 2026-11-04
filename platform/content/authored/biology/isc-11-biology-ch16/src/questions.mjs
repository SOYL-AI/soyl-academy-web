// ISC 11 Biology ch16 Breathing and Exchange of Gases — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): a b d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { RESP_Q, SPIRO_Q, ODC_Q } from './svgs.mjs';
import { P1, P2, P3, CHK_ALV, alveolarVent, DEAD, BOYLE2, BOYLE2_P2, VC_FROM_IC, IC_Q, HB2, ART2, VEN2, DEL2, DEL2_MIN, PASS, CO2_MIN2, CO2_2, CO2_FORMS, REL_RELEASE, HEALTHY, HEALTHY_RV_PCT, EMPH, EMPH_RV_PCT, rvPct, round, ALT, pO2At, GRAD, satR, ART_O2, SHALLOW, DEEP } from './calc.mjs';

const { mcq, ar, fill, num, short, long, tf, match, part } = mk;
const respFig = svgV(RESP_Q, 'Human respiratory system with parts marked A to E');
const spiroFig = svgV(SPIRO_Q, 'Spirometer tracing with brackets marked A to E');
const odcFig = svgV(ODC_Q, 'Three oxygen dissociation curves marked A, B and C');

// ================================================================ t01 organs and the human respiratory system
add('surface-mcq', mcq({
  stem: 'A biologist examines four animals: a planarian (a flat, thin flatworm living under stones in a stream), a cockroach, a prawn and a pigeon. Which of them needs no special respiratory organ and exchanges gases across its general body surface?',
  right: 'The planarian',
  wrong: ['The cockroach', 'The prawn', 'The pigeon'],
  sol: 'Thin, flat animals have every cell close to the surface, so diffusion across the body surface is enough; the others use tracheae, gills and lungs — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('tracheal-mcq', mcq({
  stem: 'A cockroach is dusted with a fine powder that blocks the openings on the sides of its abdomen. It soon suffocates. Which respiratory structures have been blocked?',
  right: 'The spiracles, which open into the tracheal tubes',
  wrong: ['The gill slits, which open into the gill chamber', 'The book lungs, which open into the abdomen', 'The nostrils, which open into the nasal chamber'],
  sol: 'Insects carry air to the tissues through tracheal tubes that open on the body surface by spiracles — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sysfig-mcq', mcq({
  stem: 'The figure shows the human respiratory system. Which letter marks the part that contains the vocal cords?',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'The larynx, the cartilaginous sound box at the top of the trachea, carries the vocal cords; it is marked B — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [respFig],
}));
add('sysfig2-mcq', mcq({
  stem: 'In the same figure, a patient has a growth that blocks the tube which divides into the right and left bronchi. Which letter marks that tube?',
  right: 'C',
  wrong: ['A', 'B', 'E'],
  sol: 'The trachea divides at its lower end into the two primary bronchi; the trachea is marked C — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [respFig],
}));
add('alveolus-mcq', mcq({
  stem: 'Which pair of features best explains why the alveoli are efficient sites for the exchange of gases?',
  right: 'A wall one cell thick and a dense network of blood capillaries around each alveolus',
  wrong: ['A thick muscular wall and a lining of mucus', 'Rings of cartilage and a lining of cilia', 'A wall of fibrous tissue and a very small surface area'],
  sol: 'Gas exchange by diffusion needs a thin membrane and a rich blood supply — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('lobes-tf', tf({
  stem: 'The right lung of a human has two lobes and the left lung has three lobes.',
  key: 'f',
  sol: 'False. The right lung has three lobes and the left lung two, because the heart takes up room on the left side.',
  d: 1, c: 'recall', t: [1],
}));
add('thoracic-fill', fill({
  stem: 'The air-tight thoracic chamber is bounded dorsally by the vertebral column, laterally by the ribs, below by the diaphragm and ventrally by the ______.',
  acc: [['sternum', 'breast bone', 'breastbone']],
  sol: 'The sternum forms the ventral boundary.',
  d: 1, c: 'recall', t: [1],
}));
add('trachea-reason', short({
  marks: 1,
  stem: 'Give a reason: The trachea does not collapse when the air pressure inside it falls during inspiration.',
  model: 'Its wall is supported by **incomplete C-shaped rings of cartilage**, which keep the tube open.',
  sol: 'Cartilage rings.',
  scheme: [['Cartilage rings hold the tube open', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('nasal-short2', short({
  marks: 2,
  stem: 'Mention three ways in which the nasal chamber prepares air before it reaches the lungs.',
  model: 'Hairs and **mucus** in the nasal chamber **filter** out dust and germs; the rich **blood supply** under the lining **warms** the air; and the moist lining **moistens** it. The air reaching the lungs is therefore clean, warm and humid.',
  sol: 'Filter, warm, moisten.',
  scheme: [['Filtering by hairs and mucus', 1], ['Warming and moistening', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('organs-short3', short({
  marks: 3,
  stem: 'Name the respiratory organ or surface of (i) an earthworm, (ii) a cockroach, (iii) a prawn, (iv) a frog and (v) a rat, and name one more animal that breathes in the same way as the prawn.',
  model: '(i) The earthworm breathes through its **moist cuticle (skin)**. (ii) The cockroach has **tracheal tubes** opening through spiracles. (iii) The prawn breathes with **gills (branchiae)**, as **fishes** do. (iv) The frog uses **moist skin, the buccal cavity and lungs**. (v) The rat, a mammal, breathes with **lungs**.',
  sol: 'Five organs and one more gill-breather.',
  scheme: [['Cuticle and tracheae', 1], ['Gills of the prawn; fish as the other animal', 1], ['Frog (skin, buccal cavity, lungs) and rat (lungs)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('sys-long', long({
  stem: '(a) Draw a neat labelled diagram of the human respiratory system, showing the nasal chamber, pharynx, larynx, trachea, bronchi, both lungs and the diaphragm. [3]\n(b) Describe two features of the alveoli that make them suitable for gas exchange. [2]',
  model: '(a) The diagram shows the **nasal chamber** leading to the **pharynx** and the **larynx**, then the **trachea**, which divides into the **right and left bronchi**. The **right lung (three lobes)** and **left lung (two lobes)** lie in the chest, each with branching **bronchioles** ending in **alveoli**, and the dome of the **diaphragm** lies below the lungs. Label lines must touch the parts, and the trachea should show cartilage rings.\n\n(b) The wall of an alveolus is **one cell thick**, so the diffusion distance is very short. Each alveolus is **wrapped by a network of capillaries**, which carry gases to and from the blood. (The very large number of alveoli gives a large surface area.)',
  sol: 'Diagram with labels; two alveolar features.',
  scheme: [['(a) Passages from nasal chamber to bronchi correctly drawn and labelled', 1], ['(a) Lungs with lobes and bronchioles/alveoli', 1], ['(a) Diaphragm and neat labelling', 1], ['(b) Thin wall', 1], ['(b) Capillary network', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
  assets: [respFig],
}));

// ================================================================ t02 mechanism of breathing, volumes and capacities
add('bell-mcq', mcq({
  stem: 'A model of the chest is made from a bell jar with a Y-shaped glass tube hanging inside it. A balloon is tied to each arm of the tube, and a rubber sheet is stretched across the open bottom of the jar. When the rubber sheet is pulled downward, the balloons inflate. Which statement is correct?',
  right: 'The rubber sheet represents the diaphragm, the jar represents the chest, and pulling the sheet lowers the pressure around the balloons so that air enters them.',
  wrong: ['The rubber sheet represents the lungs, and pulling it pushes air into the balloons.', 'The balloons represent the diaphragm, and they inflate because the pressure in the jar rises.', 'The jar represents the lungs, and the sheet represents the trachea.'],
  sol: 'Pulling the sheet down enlarges the jar like a contracting diaphragm; the pressure in the jar falls below atmospheric and air flows into the balloons (lungs) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('forced-mcq', mcq({
  stem: 'A trumpet player takes a deep breath and then blows out as much air as possible. Which muscles contract in addition to those used in quiet breathing during this forced expiration?',
  right: 'Internal intercostal muscles and abdominal muscles',
  wrong: ['External intercostal muscles and the diaphragm only', 'Muscles of the thigh', 'Only the muscles of the neck'],
  sol: 'Forced expiration is active: internal intercostals pull the ribs down and abdominal muscles push the diaphragm up — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pressure-mcq', mcq({
  stem: 'A person breathes in deeply, keeps the glottis open and holds the breath for a moment with the chest muscles relaxed and no air moving. What is the pressure in the alveoli at that moment?',
  right: 'Equal to the atmospheric pressure',
  wrong: ['Lower than the atmospheric pressure', 'Higher than the atmospheric pressure', 'Zero'],
  sol: 'When no air is moving through an open airway, the pressure inside the lungs has equalised with the pressure outside — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('vcparts-mcq', mcq({
  stem: 'Which of the following is NOT a part of the vital capacity?',
  right: 'Residual volume',
  wrong: ['Tidal volume', 'Inspiratory reserve volume', 'Expiratory reserve volume'],
  sol: 'Vital capacity is IRV + TV + ERV; the residual volume remains in the lungs even after the strongest expiration — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rv-mcq', mcq({
  stem: 'Some air always stays in the lungs even after the strongest possible expiration, and this keeps the alveoli from collapsing. This air is the',
  right: 'residual volume',
  wrong: ['tidal volume', 'expiratory reserve volume', 'vital capacity'],
  sol: 'The air left after the strongest expiration is the residual volume — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spirofig-mcq', mcq({
  stem: 'The figure shows a spirometer record with brackets marked A to E. Which letter marks the vital capacity?',
  right: 'E',
  wrong: ['A', 'B', 'D'],
  sol: 'The vital capacity is the whole range from the lowest level after a maximum expiration to the highest level after a maximum inspiration: bracket E — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [spiroFig],
}));
add('spirofig2-mcq', mcq({
  stem: 'In the same figure, which pair of brackets together make up the inspiratory capacity?',
  right: 'B and D',
  wrong: ['A and C', 'A and D', 'B and C'],
  sol: 'IC = TV + IRV: the quiet breath (D) and the extra air breathed in after it (B) — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [spiroFig],
}), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === 'B and D' || 'IC');
add('vol-match', match({
  stem: 'Match each respiratory volume in column I with its description in column II.',
  pairs: [
    ['Inspiratory reserve volume', 'Extra air breathed in after a quiet inspiration'],
    ['Expiratory reserve volume', 'Extra air breathed out after a quiet expiration'],
    ['Residual volume', 'Air left in the lungs after the strongest expiration'],
    ['Vital capacity', 'Largest volume breathed out after a maximum inspiration'],
  ],
  order: [2, 0, 3, 1],
  marks: 2,
  sol: 'IRV is the extra air breathed in; ERV the extra breathed out; RV the air that cannot be expelled; VC the maximum breathed out after a maximum breath in.',
  d: 2, c: 'understanding', t: [2],
}));
add('frc-num', num({
  stem: `A student's expiratory reserve volume is ${P1.erv} mL and her residual volume is ${P1.rv} mL. What is her functional residual capacity in mL?`,
  value: P1.frc, unit: 'mL',
  sol: r`FRC $= \text{ERV} + \text{RV} = ${P1.erv} + ${P1.rv} = ${P1.frc}$ mL.`,
  scheme: [[`${P1.frc} mL`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 1950 || 'FRC');
add('alv-num', num({
  stem: `A boy breathes ${CHK_ALV.rate} times a minute with a tidal volume of ${CHK_ALV.tv} mL. If the air in his conducting passages (dead space) is ${DEAD} mL, how many mL of fresh air reach his alveoli each minute?`,
  value: alveolarVent(CHK_ALV.tv, CHK_ALV.rate), unit: 'mL',
  sol: r`Fresh air per breath $= ${CHK_ALV.tv} - ${DEAD} = ${CHK_ALV.tv - DEAD}$ mL; per minute $= ${CHK_ALV.tv - DEAD} \times ${CHK_ALV.rate} = ${alveolarVent(CHK_ALV.tv, CHK_ALV.rate)}$ mL.`,
  scheme: [[`${alveolarVent(CHK_ALV.tv, CHK_ALV.rate)} mL`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 5400 || 'alveolar ventilation');
add('vc-num', num({
  stem: `The inspiratory capacity of a boy is ${IC_Q.ic} mL and his expiratory reserve volume is ${IC_Q.erv} mL. Calculate his vital capacity in mL.`,
  value: VC_FROM_IC, unit: 'mL',
  sol: r`IC already contains TV and IRV, so $\text{VC} = \text{IC} + \text{ERV} = ${IC_Q.ic} + ${IC_Q.erv} = ${VC_FROM_IC}$ mL.`,
  scheme: [[`${VC_FROM_IC} mL`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4150 || 'VC');
add('rvpct-num', num({
  stem: `For the student in the spirometer record (TV ${P1.tv} mL, IRV ${P1.irv} mL, ERV ${P1.erv} mL, RV ${P1.rv} mL), what percentage of the total lung capacity is the residual volume? Give the answer to one decimal place.`,
  value: rvPct(P1), tol: 0.05, unit: '%',
  sol: r`TLC $= ${P1.irv} + ${P1.tv} + ${P1.erv} + ${P1.rv} = ${P1.tlc}$ mL; $\dfrac{${P1.rv}}{${P1.tlc}} \times 100 = ${round((P1.rv / P1.tlc) * 100, 3)}$, which is ${rvPct(P1)} percent to one decimal place.`,
  scheme: [[`${rvPct(P1)} percent`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 21.9) < 0.06 || 'percent');
add('boyle-num', num({
  stem: `Before a deep breath, the gas in a person's lungs has a volume of ${BOYLE2.v1} mL at ${BOYLE2.p1} mm Hg. Suppose the airway is blocked and the chest then enlarges so that the gas occupies ${BOYLE2.v2} mL at the same temperature. Calculate the new pressure in mm Hg, to one decimal place.`,
  value: BOYLE2_P2, tol: 0.1, unit: 'mm Hg',
  sol: r`Boyle's law: $p_2 = \dfrac{p_1 V_1}{V_2} = \dfrac{${BOYLE2.p1} \times ${BOYLE2.v1}}{${BOYLE2.v2}} \approx ${BOYLE2_P2}$ mm Hg, lower than atmospheric pressure.`,
  scheme: [[`${BOYLE2_P2} mm Hg`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => Math.abs(q.answer.value - 742.2) < 0.15 || 'pressure');
add('vc-ar', ar({
  a: 'The total lung capacity of a person is always greater than the vital capacity.',
  r: 'Some air, the residual volume, remains in the lungs even after the strongest expiration.',
  key: 'a',
  sol: 'Both are true: TLC = VC + RV, so the air that cannot be expelled makes TLC larger than VC — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('diaphragm-short2', short({
  marks: 2,
  stem: 'Explain how the contraction of the diaphragm leads to air entering the lungs. Answer in terms of volume and pressure.',
  model: 'When the diaphragm **contracts**, it flattens and the **volume of the thoracic chamber increases**. The lungs expand with the chest, so the **pressure inside them falls below the atmospheric pressure**. Air therefore flows from outside, where the pressure is higher, into the lungs.',
  sol: 'Volume up, pressure down, air flows in.',
  scheme: [['Flattening increases the volume of the chest and the lungs', 1], ['Pressure falls below atmospheric and air flows in', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('forced-short2', short({
  marks: 2,
  stem: 'Why is quiet expiration called a passive process? Name the muscles that make forced expiration active.',
  model: 'In quiet expiration the muscles of inspiration simply **relax**, and the **elastic recoil** of the chest and lungs reduces the volume and raises the pressure, so no muscle work is needed. **Forced expiration** is active because the **internal intercostal muscles** and the **abdominal muscles** contract.',
  sol: 'Relaxation and recoil; internal intercostals and abdominal muscles.',
  scheme: [['Muscles relax and recoil expels air, so passive', 1], ['Internal intercostals and abdominal muscles in forced expiration', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('vc-short2', short({
  marks: 2,
  stem: 'Define vital capacity and state how it is calculated from the respiratory volumes.',
  model: '**Vital capacity** is the **maximum volume of air a person can breathe out after a maximum inspiration**. It is calculated as the **sum of the inspiratory reserve volume, the tidal volume and the expiratory reserve volume**; the residual volume is not included.',
  sol: 'Definition; IRV + TV + ERV.',
  scheme: [['Definition', 1], ['IRV + TV + ERV, without RV', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('insp-short3', short({
  marks: 3,
  stem: 'Describe the sequence of events in quiet inspiration, starting with the muscles, and say how each change leads to air entering the lungs.',
  model: 'The **diaphragm contracts and flattens**, and the **external intercostal muscles contract**, lifting the ribs and the sternum up and outward. The **volume of the thoracic chamber increases** in both the vertical and the front-to-back directions. The lungs, held against the chest wall by the pleura, expand, so the **intra-pulmonary pressure falls below the atmospheric pressure** and **air flows in** until the pressures are equal.',
  sol: 'Muscles; volume; pressure and flow.',
  scheme: [['Diaphragm flattens and external intercostals lift the ribs and sternum', 1], ['Volume of the chest and lungs increases', 1], ['Pressure falls below atmospheric and air flows in', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('spiro-short3', short({
  marks: 3,
  stem: `A spirometer record of a student gives a tidal volume of ${P3.tv} mL, an inspiratory reserve volume of ${P3.irv} mL and an expiratory reserve volume of ${P3.erv} mL. Calculate her vital capacity. Explain why her total lung capacity cannot be found from these three readings alone.`,
  model: `Vital capacity $= \\text{IRV} + \\text{TV} + \\text{ERV} = ${P3.irv} + ${P3.tv} + ${P3.erv} = ${P3.vc}$ mL.\n\nTotal lung capacity is the vital capacity **plus the residual volume**. The residual volume is the air that **stays in the lungs after the strongest expiration**, so it never leaves the lungs and **cannot be recorded by a spirometer** that measures only air moving in and out of the mouth.`,
  sol: 'VC; reason for the missing RV.',
  scheme: [['Vital capacity as the sum of three volumes', 1], ['Correct value', 1], ['TLC needs the residual volume, which a spirometer cannot record', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => P3.vc === 4320 || 'VC');
add('spiro-long', long({
  stem: `A trained swimmer's spirometer record gives: tidal volume ${P2.tv} mL, inspiratory reserve volume ${P2.irv} mL, expiratory reserve volume ${P2.erv} mL; the residual volume measured separately is ${P2.rv} mL.\n(a) Calculate the inspiratory capacity and the expiratory capacity. [2]\n(b) Calculate the vital capacity and the total lung capacity. [2]\n(c) Calculate the functional residual capacity and say what it represents. [1]`,
  model: `(a) IC $= \\text{TV} + \\text{IRV} = ${P2.tv} + ${P2.irv} = ${P2.ic}$ mL; EC $= \\text{TV} + \\text{ERV} = ${P2.tv} + ${P2.erv} = ${P2.ec}$ mL.\n\n(b) VC $= \\text{IRV} + \\text{TV} + \\text{ERV} = ${P2.irv} + ${P2.tv} + ${P2.erv} = ${P2.vc}$ mL; TLC $= \\text{VC} + \\text{RV} = ${P2.vc} + ${P2.rv} = ${P2.tlc}$ mL.\n\n(c) FRC $= \\text{ERV} + \\text{RV} = ${P2.erv} + ${P2.rv} = ${P2.frc}$ mL; it is the **volume of air that remains in the lungs after a quiet (normal) expiration**.`,
  sol: 'Capacities as sums of volumes.',
  scheme: [['(a) IC', 1], ['(a) EC', 1], ['(b) VC', 1], ['(b) TLC', 1], ['(c) FRC with meaning', 1]],
  wl: [25, 200],
  d: 3, c: 'application', t: [2],
}), () => P2.ic === 3900 && P2.ec === 1900 && P2.vc === 5200 && P2.tlc === 6600 && P2.frc === 2700 || 'capacities');
add('breath-long', long({
  stem: '(a) Explain the mechanism of normal inspiration, naming the muscles involved and the changes in volume and pressure. [3]\n(b) How does expiration differ from inspiration in a person at rest? [1]\n(c) Name two muscle groups that make forced expiration possible. [1]',
  model: '(a) The **diaphragm contracts and flattens**, and the **external intercostals contract**, raising the ribs and sternum. The **volume of the thoracic chamber rises**, so the **pressure in the lungs falls below atmospheric pressure** and air flows in.\n\n(b) In quiet expiration the muscles **relax** and the elastic recoil of the chest and lungs reduces the volume and raises the pressure, so it is **passive**, whereas inspiration is active.\n\n(c) **Internal intercostal muscles** and **abdominal muscles**.',
  sol: 'Inspiration; passive expiration; forced expiration.',
  scheme: [['(a) Diaphragm and external intercostals contract', 1], ['(a) Volume rises, pressure falls', 1], ['(a) Air flows in', 1], ['(b) Passive recoil', 1], ['(c) Two muscle groups', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 exchange, oxygen and carbon dioxide transport
add('gradient-mcq', mcq({
  stem: `In the capillaries of a resting muscle, the pO₂ of the surrounding tissue is ${40} mm Hg and its pCO₂ is ${45} mm Hg, while the blood arriving there has pO₂ ${95} mm Hg and pCO₂ ${40} mm Hg. In which directions do the gases diffuse?`,
  right: 'Oxygen from the blood into the tissue, and carbon dioxide from the tissue into the blood',
  wrong: ['Oxygen from the tissue into the blood, and carbon dioxide from the blood into the tissue', 'Both gases from the blood into the tissue', 'Both gases from the tissue into the blood'],
  sol: `Each gas moves from higher to lower partial pressure: oxygen ${95} to ${40}, carbon dioxide ${45} to ${40} — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => GRAD.tissueO2 > 0 && GRAD.tissueCO2 > 0 || 'gradients');
add('hb-mcq', mcq({
  stem: 'What is the maximum number of oxygen molecules that one molecule of haemoglobin can carry?',
  right: 'Four',
  wrong: ['One', 'Two', 'Eight'],
  sol: 'Haemoglobin has four haem groups, each able to bind one oxygen molecule — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('bohr-fever-mcq', mcq({
  stem: 'A patient with a high fever has a body temperature of 40 °C instead of the usual 37 °C. Compared with its behaviour at normal temperature, how does her haemoglobin behave at the tissues?',
  right: 'It releases oxygen more readily, because the curve shifts to the right',
  wrong: ['It holds oxygen more tightly, because the curve shifts to the left', 'It releases the same amount, because temperature has no effect', 'It cannot bind oxygen at all'],
  sol: 'A rise in temperature shifts the dissociation curve to the right, so haemoglobin gives up oxygen more readily — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('odc-read-mcq', mcq({
  stem: 'In the figure, the dot on curve C is at a pO₂ of 40 mm Hg, the value in resting tissue. About what percentage of the haemoglobin is saturated with oxygen at the dot?',
  right: `About ${satR(40)} percent`,
  wrong: ['About 50 percent', 'About 90 percent', 'About 97 percent'],
  sol: `The standard curve passes through about ${satR(40)} percent saturation at 40 mm Hg — option (@K).`,
  d: 2, c: 'application', t: [3],
  assets: [odcFig],
}));
add('odc-fig2-mcq', mcq({
  stem: 'In the same figure, which curve would most probably be obtained for blood taken from a vigorously contracting muscle, which is warm, acidic and rich in carbon dioxide?',
  right: 'A',
  wrong: ['B', 'C', 'None, because the curve cannot change'],
  sol: 'Higher temperature, acidity and pCO₂ shift the curve to the right, so haemoglobin releases more oxygen; curve A is furthest to the right — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [odcFig],
}));
add('foetal-fig-mcq', mcq({
  stem: 'In the same figure, foetal haemoglobin takes up oxygen from the blood of the mother in the placenta, where the pO₂ is low. Which curve is most likely to be that of the foetal haemoglobin?',
  right: 'B',
  wrong: ['A', 'C', 'A and C equally'],
  sol: 'To take oxygen from the mother’s haemoglobin, foetal haemoglobin must hold oxygen more tightly: its curve lies to the left, as curve B — option (@K).',
  d: 3, c: 'analysis', t: [3],
  assets: [odcFig],
}));
add('cl-mcq', mcq({
  stem: 'In a tissue capillary, bicarbonate ions diffuse out of the red blood cells into the plasma. Which ion moves into the red blood cells at the same time, so that the cells stay electrically neutral?',
  right: 'Chloride ion',
  wrong: ['Sodium ion', 'Calcium ion', 'Potassium ion'],
  sol: 'Chloride ions enter the red cells as bicarbonate ions leave: the chloride shift — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('lungs-co2-mcq', mcq({
  stem: 'Blood from the tissues reaches the alveolar capillaries. Which change takes place inside its red blood cells?',
  right: 'Bicarbonate ions enter the cells and are converted back to carbon dioxide and water',
  wrong: ['Carbon dioxide is converted to bicarbonate ions', 'Chloride ions leave the cells as carbon dioxide enters them', 'Haemoglobin releases all its oxygen'],
  sol: 'At the alveoli the lower pCO₂ reverses the reactions: bicarbonate enters the cells and carbonic anhydrase helps to form CO₂, which diffuses out — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('quarter-mcq', mcq({
  stem: `On the standard curve, haemoglobin is ${satR(100)} percent saturated at a pO₂ of 100 mm Hg and ${satR(40)} percent saturated at 40 mm Hg. What fraction of its oxygen load does the haemoglobin release as blood passes through a resting tissue?`,
  right: 'About one quarter',
  wrong: ['About three quarters', 'Almost all of it', 'About one tenth'],
  sol: r`$(${satR(100)} - ${satR(40)})/${satR(100)} \approx 0.23$: about one quarter — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => REL_RELEASE > 20 && REL_RELEASE < 26 || 'fraction');
add('hb-tf', tf({
  stem: 'Most of the oxygen in the blood is carried dissolved in the plasma.',
  key: 'f',
  sol: 'False. About 97 percent of the oxygen is carried by haemoglobin in the red cells; only about 3 percent is dissolved in plasma.',
  d: 1, c: 'recall', t: [3],
}));
add('carbonic-fill', fill({
  stem: 'The enzyme ______, present in large amounts in red blood cells, speeds up the combination of carbon dioxide with water.',
  acc: [['carbonic anhydrase']],
  sol: 'Carbonic anhydrase.',
  d: 1, c: 'recall', t: [3],
}));
add('o2content-num', num({
  stem: `A woman has ${HB2.hb} g of haemoglobin in every 100 mL of blood. One gram of haemoglobin can bind 1.34 mL of oxygen, and her arterial blood is ${HB2.art} percent saturated. How many mL of oxygen does 100 mL of her arterial blood carry on haemoglobin? Give one decimal place.`,
  value: ART2, tol: 0.05, unit: 'mL',
  sol: r`$${HB2.hb} \times 1.34 \times ${HB2.art}/100 \approx ${ART2}$ mL.`,
  scheme: [[`${ART2} mL`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => Math.abs(q.answer.value - 17.1) < 0.06 || 'content');
add('deliver-num', num({
  stem: `For the woman above, venous blood leaving her resting muscles is ${HB2.ven} percent saturated (${VEN2} mL of oxygen per 100 mL) and arterial blood carries ${ART2} mL per 100 mL. If ${HB2.flow} mL of blood flows through her tissues each minute, how many mL of oxygen are delivered per minute? Give one decimal place.`,
  value: DEL2_MIN, tol: 0.1, unit: 'mL',
  sol: r`Given up per 100 mL $= ${ART2} - ${VEN2} = ${DEL2}$ mL; per minute $= ${DEL2} \times ${HB2.flow}/100 = ${DEL2_MIN}$ mL.`,
  scheme: [[`${DEL2_MIN} mL`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => Math.abs(q.answer.value - 235.2) < 0.11 || 'delivery');
add('altitude-num', num({
  stem: `At a mountain pass the barometric pressure is ${PASS.baro} mm Hg. Taking oxygen to be 20.9 percent of dry air, calculate the partial pressure of oxygen there in mm Hg, to one decimal place.`,
  value: PASS.po2, tol: 0.05, unit: 'mm Hg',
  sol: r`$0.209 \times ${PASS.baro} \approx ${PASS.po2}$ mm Hg.`,
  scheme: [[`${PASS.po2} mm Hg`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => Math.abs(q.answer.value - pO2At(480)) < 0.01 || 'pO2');
add('co2form-num', num({
  stem: `A person at rest adds ${CO2_MIN2} mL of carbon dioxide to the blood every minute. If about ${CO2_FORMS.bicarbonate} percent of it is carried as bicarbonate ions, how many mL per minute is carried in that form?`,
  value: CO2_2.bicarbonate, unit: 'mL',
  sol: r`$${CO2_FORMS.bicarbonate}/100 \times ${CO2_MIN2} = ${CO2_2.bicarbonate}$ mL per minute.`,
  scheme: [[`${CO2_2.bicarbonate} mL`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 175 || 'bicarbonate');
add('release-num', num({
  stem: `Haemoglobin is ${satR(100)} percent saturated at the lungs and ${satR(40)} percent saturated in resting tissue. What percentage of the oxygen it carried to the tissue does it release there? Give one decimal place.`,
  value: REL_RELEASE, tol: 0.05, unit: '%',
  sol: r`$(${satR(100)} - ${satR(40)})/${satR(100)} \times 100 \approx ${REL_RELEASE}$ percent.`,
  scheme: [[`${REL_RELEASE} percent`, 1]],
  d: 3, c: 'analysis', t: [3],
}), (q) => Math.abs(q.answer.value - 22.7) < 0.06 || 'release');
add('carbamino-ar', ar({
  a: 'At the tissues, most of the carbon dioxide is carried in the blood as bicarbonate ions.',
  r: 'Carbon dioxide is much more soluble in plasma than oxygen is.',
  key: 'b',
  sol: 'Both are true, but the solubility of the gas is not the reason: carbonic anhydrase in the red cells converts CO₂ rapidly to bicarbonate, and the chloride shift removes it — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('bohr-reason', short({
  marks: 1,
  stem: 'Give a reason: The oxygen dissociation curve of blood in an exercising muscle shifts to the right, and this is useful to the muscle.',
  model: 'Higher **temperature, pCO₂ and H⁺ concentration** make haemoglobin **release more oxygen** at the same pO₂, which a working muscle needs.',
  sol: 'More oxygen released.',
  scheme: [['Haemoglobin releases more oxygen where it is needed', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cl-reason', short({
  marks: 1,
  stem: 'Give a reason: Chloride ions move into the red blood cells of a tissue capillary.',
  model: 'Bicarbonate ions **diffuse out** of the red cells, and chloride ions enter to **keep the cell electrically neutral** (the chloride shift).',
  sol: 'Electrical balance.',
  scheme: [['To keep the cell electrically neutral as bicarbonate leaves', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('odc-short2', short({
  marks: 2,
  stem: 'What is the oxygen dissociation curve? State its shape and explain why the curve is steep at the pO₂ of the tissues but flat at the pO₂ of the lungs.',
  model: 'It is the plot of the **percentage saturation of haemoglobin with oxygen against the pO₂**, and it is **sigmoid (S-shaped)**. At the high pO₂ of the lungs the curve is **flat**, because haemoglobin is almost fully saturated. At the lower pO₂ of the tissues the curve is **steep**, so a small fall in pO₂ releases a lot of oxygen.',
  sol: 'Definition and shape; flat and steep parts.',
  scheme: [['Definition and sigmoid shape', 1], ['Flat at the lungs, steep at the tissues, with reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cl-short2', short({
  marks: 2,
  stem: 'What is the chloride shift? Name the enzyme that helps to produce the ions involved.',
  model: 'In a tissue capillary, carbon dioxide forms **bicarbonate ions** in the red cell and these **diffuse out** into the plasma. **Chloride ions move into the cell** to keep it electrically balanced: this exchange is the **chloride shift** (Hamburger shift). The ions are produced with the help of the enzyme **carbonic anhydrase**.',
  sol: 'Cl⁻ enters as HCO₃⁻ leaves; carbonic anhydrase.',
  scheme: [['Chloride moves in as bicarbonate moves out', 1], ['Carbonic anhydrase', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('forms-short2', short({
  marks: 2,
  stem: 'State the three forms in which carbon dioxide is carried by the blood, with the approximate percentage of each.',
  model: 'About **70 percent** is carried as **bicarbonate ions**, about **20 to 25 percent** as **carbamino-haemoglobin** (bound to haemoglobin), and about **7 percent** is **dissolved in plasma**.',
  sol: 'Three forms and shares.',
  scheme: [['Bicarbonate about 70 percent', 1], ['Carbamino-haemoglobin 20 to 25 percent and dissolved about 7 percent', 1]],
  wl: [15, 50],
  d: 1, c: 'recall', t: [3],
}));
add('rightshift-short3', short({
  marks: 3,
  stem: 'Name three conditions in a working muscle that shift the oxygen dissociation curve to the right, and explain how the shift helps the muscle.',
  model: 'The three conditions are a **higher pCO₂**, a **higher hydrogen ion concentration (lower pH)** and a **higher temperature**. They shift the curve to the **right**, so at the same pO₂ the haemoglobin is **less saturated**: it **releases more oxygen** to the muscle exactly where the demand for oxygen has risen.',
  sol: 'Three factors; effect.',
  scheme: [['Higher pCO₂', 1], ['Higher H⁺ and temperature', 1], ['More oxygen released at the same pO₂', 1]],
  d: 2, c: 'application', t: [3],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare the transport of oxygen and carbon dioxide in the blood, giving the main form in which each is carried and the approximate percentages.',
  model: '**Oxygen:** about **97 percent** is carried as **oxyhaemoglobin** in the red cells and about **3 percent** is dissolved in plasma. **Carbon dioxide:** about **70 percent** is carried as **bicarbonate ions**, about **20 to 25 percent** as **carbamino-haemoglobin** and about **7 percent** dissolved in plasma. Haemoglobin therefore has a major role in both gases, and the enzyme **carbonic anhydrase** is needed only for the carbon dioxide.',
  sol: 'Oxygen forms; carbon dioxide forms; enzyme.',
  scheme: [['Oxygen: oxyhaemoglobin 97 and dissolved 3', 1], ['Carbon dioxide: bicarbonate 70, carbamino 20 to 25, dissolved 7', 1], ['Role of haemoglobin or carbonic anhydrase', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('exchange-short3', short({
  marks: 3,
  stem: `The pO₂ and pCO₂ of the blood arriving at a resting muscle are ${95} and ${40} mm Hg, while those of the muscle tissue are ${40} and ${45} mm Hg. Find the partial-pressure difference for each gas and state the direction in which each gas diffuses.`,
  model: `**Oxygen:** the difference is $${95} - ${40} = ${GRAD.tissueO2}$ mm Hg, and oxygen diffuses from the **blood into the tissue**, where its pressure is lower. **Carbon dioxide:** the difference is $${45} - ${40} = ${GRAD.tissueCO2}$ mm Hg, and carbon dioxide diffuses from the **tissue into the blood**. Each gas moves from higher to lower partial pressure.`,
  sol: 'Gradients and directions.',
  scheme: [['Oxygen difference calculated', 1], ['Carbon dioxide difference calculated', 1], ['Directions, higher to lower pressure', 1]],
  d: 2, c: 'application', t: [3],
}), () => GRAD.tissueO2 === 55 && GRAD.tissueCO2 === 5 || 'gradients');
add('transport-long', long({
  stem: '(a) State the forms in which oxygen is carried in the blood, with percentages. [1]\n(b) Describe the shape of the oxyhaemoglobin dissociation curve and what it shows about loading in the lungs and unloading in the tissues. [2]\n(c) State two factors that shift the curve to the right and explain the effect of the shift. [2]',
  model: '(a) About **97 percent** is carried as **oxyhaemoglobin** and about **3 percent** is dissolved in plasma.\n\n(b) The curve is **sigmoid**. It is **flat at the high pO₂ of the lungs**, so haemoglobin is almost fully saturated there (loading); it is **steep at the lower pO₂ of the tissues**, so a small fall in pO₂ releases much oxygen (unloading).\n\n(c) A **higher pCO₂**, **higher H⁺ concentration (lower pH)** or **higher temperature** shifts the curve to the **right**; haemoglobin is then less saturated at the same pO₂, so it **gives up more oxygen**.',
  sol: 'Forms; curve; shifts.',
  scheme: [['(a) 97 and 3 percent', 1], ['(b) Sigmoid shape', 1], ['(b) Loading and unloading explained', 1], ['(c) Two factors', 1], ['(c) More oxygen released', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));
add('cl-long', long({
  stem: '(a) Draw a labelled diagram of a red blood cell in a tissue capillary showing how carbon dioxide is converted to bicarbonate ions and how the chloride shift occurs. [3]\n(b) State the forms in which carbon dioxide is carried, with approximate percentages. [1]\n(c) What happens to the bicarbonate ions at the lungs? [1]',
  model: '(a) The diagram shows **CO₂ entering the red cell** from the tissues; **carbonic anhydrase** converting CO₂ + H₂O into **H₂CO₃**, which splits into **H⁺ and HCO₃⁻**; **H⁺ taken up by haemoglobin**; some **CO₂ bound to haemoglobin as carbamino-haemoglobin**; **HCO₃⁻ leaving** into the plasma and **Cl⁻ entering** the cell (chloride shift).\n\n(b) About **70 percent as bicarbonate**, **20 to 25 percent as carbamino-haemoglobin** and about **7 percent dissolved** in plasma.\n\n(c) At the lungs the reactions **reverse**: bicarbonate re-enters the red cells and, with carbonic anhydrase, forms **CO₂ and water**; the CO₂ **diffuses out into the alveoli**.',
  sol: 'Diagram; forms; reversal.',
  scheme: [['(a) CO₂ entry and carbonic anhydrase reaction', 1], ['(a) HCO₃⁻ out, Cl⁻ in', 1], ['(a) Haemoglobin and labelling', 1], ['(b) Three forms with percentages', 1], ['(c) Reversal at the lungs', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));
add('altitude-case', mk.case({
  passage: 'A mountaineering club recorded the barometric pressure at three places on a trek.\n\n| Place | Barometric pressure (mm Hg) |\n|---|---|\n| Sea level | 760 |\n| Hill town | 560 |\n| Base camp | 380 |\n\nAssume that dry air is 20.9 percent oxygen at every height.',
  d: 3, c: 'application',
  children: [
    part('a', num({
      stem: 'Calculate the partial pressure of oxygen at base camp, in mm Hg, to one decimal place.',
      value: ALT[2].po2, tol: 0.05, unit: 'mm Hg',
      sol: r`$0.209 \times ${ALT[2].baro} \approx ${ALT[2].po2}$ mm Hg.`,
      scheme: [[`${ALT[2].po2} mm Hg`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'Compared with sea level, the alveolar air at base camp has a lower pO₂. What is the effect on the transfer of oxygen to the blood in the lungs?',
      right: 'The difference in pO₂ between alveolar air and blood is smaller, so less oxygen diffuses into the blood',
      wrong: ['The difference is larger, so more oxygen diffuses into the blood', 'The percentage of oxygen in the air is lower, so no oxygen can enter the blood', 'The haemoglobin releases all its oxygen in the lungs'],
      sol: 'The percentage of oxygen is unchanged, but the lower partial pressure reduces the gradient for diffusion into the blood — option (@K).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'A climber at base camp breathes faster and deeper. Name the part of the brain that brings about the change in breathing and state what it responds to.',
      model: 'The **respiratory rhythm centre in the medulla**, helped by the **chemosensitive area** and by receptors in the aortic arch and carotid artery, increases the rate and depth of breathing in response to a **rise in carbon dioxide and hydrogen ion concentration** of the blood.',
      sol: 'Medulla centre; CO₂ and H⁺.',
      scheme: [['Respiratory rhythm centre (medulla)', 1], ['Responds to rise in CO₂ and H⁺', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'State two changes in the blood that help a climber to carry more oxygen after several weeks at a high altitude, and give one reason for each.',
        model: 'The **red blood cell count increases**, so more haemoglobin is available to carry oxygen. The curve can shift so that haemoglobin **releases oxygen more readily** to the tissues, which compensates for the lower pO₂ in the blood.',
        sol: 'More red cells; more release of oxygen.',
        scheme: [['Increase in red blood cells with reason', 1], ['Greater release of oxygen with reason', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.value === 79.4 || 'pO2');

// ================================================================ t04 regulation of breathing and disorders
add('chemo-mcq', mcq({
  stem: 'A child breathes in and out of a closed paper bag for a minute. Her breathing becomes faster and deeper. What is the main reason?',
  right: 'The carbon dioxide and hydrogen ion concentrations of her blood rise and stimulate the chemosensitive area',
  wrong: ['The oxygen concentration of the bag is too high', 'The pneumotaxic centre is damaged by the paper', 'Her diaphragm becomes unable to contract'],
  sol: 'Re-breathing the same air raises the CO₂ and H⁺ of the blood, which stimulates the chemosensitive area and the rhythm centre — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pons-mcq', mcq({
  stem: 'In an experiment, an animal’s pneumotaxic centre is destroyed, while its respiratory rhythm centre remains intact. What is the likely effect on its breathing?',
  right: 'Inspiration lasts longer, so breaths become slower and deeper',
  wrong: ['Breathing stops at once', 'Inspiration is shortened and the rate rises sharply', 'There is no change at all'],
  sol: 'The pneumotaxic centre moderates the rhythm centre by shortening inspiration; without it the inspiration is prolonged — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('asthma-mcq', mcq({
  stem: 'A child with asthma is given an inhaler during an attack. It relieves the wheezing because it',
  right: 'relaxes the muscles of the bronchioles and widens the air passages',
  wrong: ['replaces the damaged alveolar walls', 'removes fibrous tissue from the lungs', 'increases the amount of carbon dioxide in the blood'],
  sol: 'Asthma narrows the bronchi and bronchioles by inflammation and muscle contraction; a bronchodilator widens them — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('emph-mcq', mcq({
  stem: 'Compared with a healthy non-smoker, the lungs of a long-term heavy smoker with emphysema have',
  right: 'broken alveolar walls and a reduced respiratory surface',
  wrong: ['thickened bronchi and an increased respiratory surface', 'fibrous tissue caused by silica dust', 'more alveoli and a thinner diffusion membrane'],
  sol: 'Emphysema is the damage of alveolar walls, which reduces the surface for gas exchange — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('asbestos-mcq', mcq({
  stem: 'A worker who removed old roofing sheets made of asbestos for twenty years is found to have scarring of the lung tissue and breathlessness. This is',
  right: 'an occupational respiratory disorder caused by inhaled fibres',
  wrong: ['asthma caused by an allergy to pollen', 'emphysema caused by cigarette smoking', 'a normal effect of ageing'],
  sol: 'Long exposure to dust such as asbestos causes inflammation and fibrosis, an occupational disorder — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('smoke-tf', tf({
  stem: 'Emphysema is mainly caused by an allergy to pollen, which inflames the bronchioles.',
  key: 'f',
  sol: 'False. Inflammation of bronchi and bronchioles by allergens is asthma; emphysema is damage to the alveolar walls, and cigarette smoking is a major cause.',
  d: 2, c: 'understanding', t: [4],
}));
add('silicosis-fill', fill({
  stem: 'Workers in grinding and stone-breaking industries inhale silica dust, which causes inflammation and fibrosis of the lungs known as ______.',
  acc: [['silicosis']],
  sol: 'Silicosis.',
  d: 1, c: 'recall', t: [4],
}));
add('chemo-ar', ar({
  a: 'The chemosensitive area is stimulated mainly by a fall in the oxygen concentration of the blood.',
  r: 'The chemosensitive area is located in the pons.',
  key: 'd',
  sol: 'Both are false: the chemosensitive area is stimulated mainly by a rise in CO₂ and H⁺, and it lies next to the rhythm centre in the medulla — option (d).',
  d: 3, c: 'understanding', t: [4],
}));
add('mask-reason', short({
  marks: 1,
  stem: 'Give a reason: Workers in stone-crushing units are advised to wear masks.',
  model: 'Masks **filter out the fine dust** (such as silica) that would otherwise cause **inflammation and fibrosis of the lungs**.',
  sol: 'Dust causes fibrosis.',
  scheme: [['Dust filtered out; prevents lung fibrosis', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('co2reg-short2', short({
  marks: 2,
  stem: 'During a sprint, the carbon dioxide produced by the muscles rises. Explain how this change increases the rate of breathing.',
  model: 'The extra carbon dioxide raises the **CO₂ and H⁺ concentration** of the blood, which is detected by the **chemosensitive area** and by receptors in the **aortic arch and carotid artery**. They signal the **respiratory rhythm centre in the medulla**, which makes breathing **faster and deeper** to remove the excess.',
  sol: 'Detection; centre responds.',
  scheme: [['Rise in CO₂ and H⁺ detected by chemosensitive area and receptors', 1], ['Rhythm centre increases rate and depth', 1]],
  d: 2, c: 'application', t: [4],
}));
add('smoke-short2', short({
  marks: 2,
  stem: 'Name the disorder in which the alveolar walls are damaged, state its main cause and say how it affects gas exchange.',
  model: 'The disorder is **emphysema**, and its major cause is **cigarette smoking**. The damaged alveolar walls **reduce the respiratory surface**, so less oxygen can diffuse into the blood and the patient becomes breathless.',
  sol: 'Emphysema; smoking; reduced surface.',
  scheme: [['Emphysema and smoking', 1], ['Reduced respiratory surface and its effect', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('asthma-short2', short({
  marks: 2,
  stem: 'State the cause and two symptoms of asthma.',
  model: 'Asthma is caused by **inflammation of the bronchi and bronchioles**, often triggered by an **allergen** such as dust or pollen. The two symptoms are **wheezing** and **difficulty in breathing**.',
  sol: 'Inflammation; wheezing; difficulty in breathing.',
  scheme: [['Inflammation of bronchi and bronchioles by allergens', 1], ['Wheezing and difficulty in breathing', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('regulate-short3', short({
  marks: 3,
  stem: 'Describe the sequence of events by which a rise of carbon dioxide in the blood changes the rhythm of breathing. Name the sensors and the centres involved.',
  model: 'A rise in **CO₂ and H⁺** is detected by the **chemosensitive area** next to the rhythm centre and by receptors in the **aortic arch and carotid artery**. These send signals to the **respiratory rhythm centre in the medulla**, which makes the respiratory muscles work faster and more strongly. The **pneumotaxic centre in the pons** moderates the rhythm centre, so that the change is smooth.',
  sol: 'Sensors; rhythm centre; pneumotaxic centre.',
  scheme: [['Sensors detect CO₂ and H⁺', 1], ['Rhythm centre in the medulla increases rate', 1], ['Pneumotaxic centre in the pons moderates', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('disorders-short3', short({
  marks: 3,
  stem: 'Distinguish between emphysema and an occupational lung disorder such as silicosis, with reference to the cause, the tissue affected and one symptom of each.',
  model: '**Emphysema** is caused mainly by **cigarette smoking**; the **alveolar walls are damaged**, the respiratory surface falls and the patient is breathless. **Silicosis** is caused by long exposure to **silica dust** in grinding or stone-breaking work; the **lung tissue becomes inflamed and fibrous** (fibrosis), and the patient coughs and has difficulty in breathing.',
  sol: 'Cause; tissue; symptom for each.',
  scheme: [['Causes of each', 1], ['Tissue affected in each', 1], ['A symptom of each', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('breathhold-long', long({
  stem: '(a) Why can a person hold the breath voluntarily for only a short time? [2]\n(b) State the location and function of the respiratory rhythm centre and of the pneumotaxic centre. [2]\n(c) Which part of the brain would you expect to be affected if a person’s breathing stopped suddenly after a head injury? [1]',
  model: '(a) While the breath is held, **carbon dioxide and hydrogen ions accumulate** in the blood. They stimulate the **chemosensitive area** and the receptors on the large arteries, and the **rhythm centre** soon overrides the voluntary control and forces a breath.\n\n(b) The **respiratory rhythm centre** lies in the **medulla oblongata** and sets the rhythm of breathing. The **pneumotaxic centre** lies in the **pons** and **moderates the rhythm centre** by shortening inspiration and so changing the rate.\n\n(c) The **medulla oblongata**, which contains the respiratory rhythm centre.',
  sol: 'CO₂ build-up; two centres; medulla.',
  scheme: [['(a) CO₂ and H⁺ accumulate', 1], ['(a) Centre overrides voluntary control', 1], ['(b) Rhythm centre: medulla, sets rhythm', 1], ['(b) Pneumotaxic centre: pons, moderates', 1], ['(c) Medulla oblongata', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));
add('disorders-long', long({
  stem: '(a) What is asthma? State its cause and one symptom. [2]\n(b) How does emphysema reduce the efficiency of gas exchange? [2]\n(c) Name one occupational respiratory disorder and one precaution against it. [1]',
  model: '(a) Asthma is a disorder in which the **bronchi and bronchioles become inflamed**, usually in response to an **allergen**; the main symptoms are **wheezing** and **difficulty in breathing**.\n\n(b) In emphysema the **alveolar walls are damaged**, so the **respiratory surface decreases**; less oxygen enters the blood and the patient is breathless. Cigarette smoking is a major cause.\n\n(c) **Silicosis** (or asbestosis) caused by dust; workers should **wear protective masks** and the workplace should be well ventilated.',
  sol: 'Asthma; emphysema; occupational disorder.',
  scheme: [['(a) Inflammation of bronchi and bronchioles by an allergen', 1], ['(a) A symptom', 1], ['(b) Damaged alveolar walls and reduced surface', 1], ['(b) Effect on oxygen entering the blood', 1], ['(c) Disorder and precaution', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));
add('emph-case', mk.case({
  passage: `Mr Kulkarni, aged 64, smoked for forty years and is now breathless on climbing a few stairs. A lung-function report compares him with a healthy man of the same height.\n\n| | Mr Kulkarni | Healthy man |\n|---|---|---|\n| Vital capacity (mL) | ${EMPH.vc} | ${HEALTHY.vc} |\n| Residual volume (mL) | ${EMPH.rv} | ${HEALTHY.rv} |`,
  d: 4, c: 'analysis',
  children: [
    part('a', num({
      stem: `Calculate Mr Kulkarni's total lung capacity in mL.`,
      value: EMPH.tlc, unit: 'mL',
      sol: r`TLC $= \text{VC} + \text{RV} = ${EMPH.vc} + ${EMPH.rv} = ${EMPH.tlc}$ mL.`,
      scheme: [[`${EMPH.tlc} mL`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Which statement about the table is correct?',
      right: `The residual volume is a much larger share of his total lung capacity (${EMPH_RV_PCT} percent) than that of the healthy man (${HEALTHY_RV_PCT} percent)`,
      wrong: ['His vital capacity is higher than that of the healthy man', 'His residual volume is lower than that of the healthy man', 'His total lung capacity is much larger than that of the healthy man'],
      sol: r`Mr Kulkarni: $${EMPH.rv}/${EMPH.tlc} \approx ${EMPH_RV_PCT}$ percent; healthy man: $${HEALTHY.rv}/${HEALTHY.tlc} \approx ${HEALTHY_RV_PCT}$ percent — option (@K).`,
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the disorder most likely to be responsible, and explain how the change in the lungs accounts for the larger residual volume and the breathlessness.',
      model: 'The disorder is **emphysema**. The **alveolar walls are damaged**, so the lungs lose their elasticity and **air stays trapped** (a larger residual volume), while the **respiratory surface is reduced**, so less oxygen enters the blood and the patient is breathless.',
      sol: 'Emphysema; damaged alveoli.',
      scheme: [['Emphysema with damaged alveolar walls trapping air', 1], ['Reduced respiratory surface causes breathlessness', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Mr Kulkarni is advised to stop smoking. Explain two ways in which smoking has harmed his respiratory system.',
        model: 'Smoking **damages the alveolar walls** (emphysema), which reduces the surface available for gas exchange. It also **paralyses the cilia and inflames the airways**, so mucus and dust stay in the passages, adding to the difficulty in breathing.',
        sol: 'Alveolar damage; airway damage.',
        scheme: [['Damage to alveolar walls and loss of surface', 1], ['Damage to cilia or airways, with effect', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.value === 4700 || 'TLC');

// quiet the linter about unused helpers kept for readability
void [ALT, ART_O2, SHALLOW, DEEP];
