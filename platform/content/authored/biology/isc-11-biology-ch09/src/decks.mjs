// ISC 11 Biology ch09 Structural Organisation in Animals: Frog — Part 1 (t01 morphology, t02 digestive, respiratory and circulatory
// systems), Part 2 (t03 excretory, nervous and reproductive systems).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { FROG_EXT, SEX, ALIMENTARY, BREATHING, HEART as HEART_SVG, UROGENITAL_MALE, UROGENITAL_FEMALE, BRAIN } from './svgs.mjs';
import { POND, MALES, FEMALES, VOCAL_SACS, FEED, INSECTS, GUT, GUT_RATIO_FROG, GUT_RATIO_TAD, GUT_TIMES, BEAT, OUTPUT_MIN, OUTPUT_HOUR, O2, O2_SKIN, O2_LUNG, O2_BUCCAL, CHAMBERS, SHEET, SHEET_TOTAL, GONADS, MALE_DUCTS, FEMALE_DUCTS, DUCTS, NERVE, NERVE_MS } from './calc.mjs';

export const V = {
  ext: svgV(FROG_EXT, 'A frog from above with eyes, nostrils, tympanum, forelimbs and webbed hind limbs'),
  sex: svgV(SEX, 'Vocal sacs and copulatory pad of the male frog compared with the female'),
  alim: svgV(ALIMENTARY, 'The alimentary canal of the frog in ventral view'),
  breath: svgV(BREATHING, 'The path of air from the nostril to the lungs of a frog'),
  heart: svgV(HEART_SVG, 'The three-chambered heart of the frog and the route of the blood'),
  male: svgV(UROGENITAL_MALE, 'The urinogenital system of the male frog'),
  female: svgV(UROGENITAL_FEMALE, 'The urinogenital system of the female frog'),
  brain: svgV(BRAIN, 'The brain of the frog in dorsal view'),
};

export const deck1 = deck({
  part: 1,
  title: 'Structural Organisation in Animals: Frog — Part 1: Morphology, digestion, respiration and circulation',
  goals: [
    'Describe the external features of a frog and distinguish a male from a female',
    'Trace the path of food through the alimentary canal and explain how a frog respires through skin, buccal cavity and lungs',
    'Describe the heart and the route of blood in the frog',
  ],
  slides: [
    sl('title', 'The frog', {
      b: 'Part 1 — the body of the common frog and its digestive, respiratory and circulatory systems.',
      v: flow('LR', [['m', 'Morphology'], ['d', 'Digestion'], ['r', 'Respiration'], ['c', 'Circulation']], [['m', 'd'], ['d', 'r'], ['r', 'c']], 'Morphology, digestion, respiration and circulation as the topics of part one'),
      n: 'The frog is an amphibian that lives both in water and on land. In this part we look at its outer form, how it digests food, how it breathes through skin, mouth and lungs, and how its three-chambered heart sends blood round the body.',
    }),
    sl('diagram', 'External features of the frog', {
      b: 'The body has a **head** and a **trunk**; there is **no neck and no tail**. The moist skin is olive green above with dark spots, and pale yellow below.',
      v: V.ext,
      n: 'Two bulging eyes and two nostrils lie on the top of the head, and a round tympanum behind each eye receives sound. The short forelimbs have four digits. The long hind limbs have five toes joined by webs, which make them powerful paddles.',
    }),
    sl('concept', 'Features and their uses', {
      b: 'Every external feature has a use on land or in water.',
      v: table(['Feature', 'Use'], [['Smooth, moist, slimy skin', 'Gas exchange, absorbing water; spots give camouflage'], ['Bulging eyes with a nictitating membrane', 'Wide view; the membrane protects the eye under water'], ['Tympanum', 'Receives sound (the ear)'], ['Long, strong, webbed hind limbs', 'Leaping, swimming, burrowing'], ['Short forelimbs', 'Support the body when it lands'], ['Cloacal aperture', 'Exit for faeces, urine and gametes']], 'Table of external features of the frog and their uses'),
      n: 'The skin must stay moist because the frog breathes through it. A clear nictitating membrane covers each eye under water. The hind legs are long and webbed for leaping and swimming. The cloacal opening at the rear lets out faeces, urine and gametes.',
    }),
    sl('diagram', 'Male and female frogs', {
      b: 'A **male** has **vocal sacs** that swell when he calls and a **copulatory pad** on the first digit of each forelimb. A **female** has neither.',
      v: V.sex,
      n: 'Males call to attract females, and the vocal sacs act as resonators that make the sound louder. The rough dark copulatory pad on the first finger helps the male to grip the female during mating. Females have smooth forelimbs and no vocal sacs.',
    }),
    sl('example', 'Worked example 1: a pond census', {
      b: `A pond has ${POND.frogs} frogs, males to females in the ratio ${POND.maleParts} to ${POND.femaleParts}. Each male has two vocal sacs. Find the numbers of males and females and of vocal sacs.`,
      ul: [
        `Parts = ${POND.maleParts} + ${POND.femaleParts} = 5; one part = ${POND.frogs} ÷ 5 = 24.`,
        `Males = ${POND.maleParts} × 24 = **${MALES}**; females = ${POND.femaleParts} × 24 = **${FEMALES}**.`,
        `Vocal sacs = ${MALES} × 2 = **${VOCAL_SACS}**; the females have none.`,
      ],
      v: table(['Quantity', 'Value'], [['Males', String(MALES)], ['Females', String(FEMALES)], ['Vocal sacs', String(VOCAL_SACS)]], `Worked table: ${MALES} males, ${FEMALES} females, ${VOCAL_SACS} vocal sacs`),
      n: 'Share the total in the given ratio. Add the parts, find the value of one part, then multiply. Only the males have vocal sacs, two each, so multiply the number of males by two.',
    }),
    sl('check', 'Quick check: male or female', {
      b: 'Which feature shows that a frog is a male?',
      n: 'Quick check. Look at the throat and at the first finger of the forelimb.',
      chk: 'ck-sex-mcq',
    }),
    sl('diagram', 'The alimentary canal', {
      b: 'The canal is **short**, as the frog is a **carnivore**: mouth, buccal cavity, pharynx, oesophagus, **stomach**, **duodenum**, **ileum**, **rectum** and **cloaca**.',
      v: V.alim,
      n: 'The frog catches insects with its sticky bilobed tongue, which is fixed at the front of the mouth and flicked out. Food passes through the buccal cavity, pharynx and oesophagus to the stomach, then the small intestine, the rectum and the cloaca.',
    }),
    sl('concept', 'Digestion and the digestive glands', {
      b: 'The liver, gall bladder and pancreas discharge into the duodenum.',
      v: table(['Part', 'Role'], [['Stomach', 'Hydrochloric acid and gastric juice begin digestion; food becomes chyme'], ['Liver', 'Makes bile'], ['Gall bladder', 'Stores bile'], ['Pancreas', 'Makes pancreatic juice with digestive enzymes'], ['Duodenum', 'Receives bile and pancreatic juice through a common duct'], ['Intestine', 'Final digestion; absorption by villi and microvilli'], ['Rectum and cloaca', 'Hold and expel undigested waste']], 'Table of parts of the alimentary canal and their roles'),
      n: 'Chyme leaves the stomach for the duodenum, where bile from the liver and pancreatic juice join it through one common duct. Digestion is completed in the intestine, and the digested food is absorbed through finger-like villi. Waste goes to the rectum and the cloaca.',
    }),
    sl('check', 'Quick check: the path of food', {
      b: 'In which part of the canal does food go immediately after the stomach?',
      n: 'Quick check. Where do bile and pancreatic juice enter?',
      chk: 'ck-path-mcq',
    }),
    sl('example', 'Worked example 2: feeding and gut length', {
      b: `(a) A frog eats ${FEED.perDay} insects a day. How many insects does it eat in ${FEED.days} days? (b) A frog ${GUT.frogBody} cm long has an intestine ${GUT.frogGut} cm long; a tadpole ${GUT.tadBody} cm long has an intestine ${GUT.tadGut} cm long. Compare the gut with the body length in each.`,
      ul: [
        `(a) ${FEED.perDay} × ${FEED.days} = **${INSECTS}** insects.`,
        `(b) Frog: ${GUT.frogGut} ÷ ${GUT.frogBody} = **${GUT_RATIO_FROG}**; tadpole: ${GUT.tadGut} ÷ ${GUT.tadBody} = **${GUT_RATIO_TAD}**.`,
        `The tadpole's gut is about ${GUT_TIMES} times longer in relation to its body: it eats plants, which are hard to digest, whereas the frog eats insects.`,
      ],
      v: table(['Animal', 'Gut length ÷ body length'], [['Frog', String(GUT_RATIO_FROG)], ['Tadpole', String(GUT_RATIO_TAD)]], `Worked table: ${GUT_RATIO_FROG} for the frog and ${GUT_RATIO_TAD} for the tadpole`),
      n: 'Multiply the daily number by the days. To compare gut lengths, divide the length of the gut by the length of the body. A plant eater needs a longer gut than a meat eater, and that is why the frog has a short canal.',
    }),
    sl('diagram', 'Respiration', {
      b: 'In **water** a frog breathes through its **skin**. On **land** it uses its **skin**, the **buccal cavity** and the **lungs**.',
      v: V.breath,
      n: 'On land, air enters through the nostrils into the buccal cavity. The floor of the mouth is raised, and this forces the air into the lungs, a pair of sac-like organs in the trunk. Gas exchange also goes on across the moist skin and the lining of the mouth.',
    }),
    sl('concept', 'Organs of respiration', {
      b: 'The frog uses three surfaces, depending on where it is.',
      v: table(['Surface', 'Where used', 'Notes'], [['Skin (cutaneous)', 'In water, and on land', 'Dissolved gases diffuse across moist skin; the main route under water'], ['Buccal cavity', 'On land', 'Thin moist lining exchanges some gas; also pumps air'], ['Lungs (pulmonary)', 'On land', 'Pair of sac-like organs in the thorax']], 'Table of the organs of respiration of the frog'),
      n: 'Under water a frog relies on its skin. On land it uses all three surfaces: skin, mouth lining and lungs. A frog also hibernates and aestivates, breathing through the skin alone during those periods.',
    }),
    sl('check', 'Quick check: respiration', {
      b: 'Which surface supplies most of the oxygen to a frog under water?',
      n: 'Quick check. Which organ stays moist and thin?',
      chk: 'ck-resp-mcq',
    }),
    sl('diagram', 'The heart and circulation', {
      b: 'The heart is **three-chambered**: two **atria** and one **ventricle**. Blood circulation is **closed**.',
      v: V.heart,
      n: 'Blood from the body enters the right atrium through the sinus venosus. Blood from the lungs enters the left atrium, while blood from the skin returns with the body veins. Both atria empty into the single ventricle, where the two kinds of blood mix. The ventricle pumps it out through the truncus arteriosus.',
    }),
    sl('example', 'Worked example 3: pumping and oxygen', {
      b: `(a) The heart beats ${BEAT.rate} times a minute and the ventricle pumps ${BEAT.strokeMl} ml each beat. How much blood does it pump in a minute and in an hour? (b) A frog on land takes up ${O2.total} ml of oxygen an hour: ${O2.skinPct} percent through the skin, ${O2.lungPct} percent through the lungs and the rest through the buccal cavity. Find each amount.`,
      ul: [
        `(a) ${BEAT.rate} × ${BEAT.strokeMl} = **${OUTPUT_MIN} ml** a minute; × 60 = **${OUTPUT_HOUR} ml** an hour.`,
        `(b) Skin: ${O2.total} × ${O2.skinPct} ÷ 100 = **${O2_SKIN} ml**; lungs: **${O2_LUNG} ml**; buccal cavity: **${O2_BUCCAL} ml**.`,
      ],
      v: table(['Quantity', 'Value'], [['Blood a minute', `${OUTPUT_MIN} ml`], ['Blood an hour', `${OUTPUT_HOUR} ml`], ['Oxygen through the skin', `${O2_SKIN} ml`], ['Oxygen through the lungs', `${O2_LUNG} ml`], ['Oxygen through the buccal cavity', `${O2_BUCCAL} ml`]], 'Worked table of blood pumped and oxygen taken up'),
      n: 'Multiply the number of beats by the volume of each beat to get the output in a minute, then by sixty for an hour. For the oxygen, take the given share of the total for each surface. The skin and the lungs together supply nearly all of it.',
    }),
    sl('check', 'Quick check: the heart', {
      b: 'How many chambers does the heart of a frog have?',
      n: 'Quick check. Count the atria and the ventricles.',
      chk: 'ck-heart-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Body: head and trunk, no neck or tail; moist skin; bulging eyes, tympanum; webbed hind limbs. Male: vocal sacs and copulatory pad.',
        'Alimentary canal: mouth, buccal cavity, pharynx, oesophagus, stomach, duodenum, ileum, rectum, cloaca; short because the frog is a carnivore. Liver, gall bladder and pancreas open into the duodenum.',
        'Respiration: skin in water; skin, buccal cavity and lungs on land.',
        'Heart: two atria and one ventricle; closed circulation; portal systems.',
      ],
      v: table(['System', 'Key point'], [['Digestive', 'Short canal; bile and pancreatic juice into duodenum'], ['Respiratory', 'Skin, buccal cavity, lungs'], ['Circulatory', 'Three-chambered heart, mixed blood in ventricle']], 'Summary table of digestive, respiratory and circulatory systems'),
      n: 'To recap: the frog has a smooth moist skin and webbed hind limbs; a short digestive tract with liver and pancreas pouring into the duodenum; three ways of breathing; and a three-chambered heart in which the blood mixes in the ventricle.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **order** of the alimentary canal without missing a part.',
        'Name **where bile and pancreatic juice enter**: the duodenum.',
        'Say that the heart has **two atria and one ventricle** and that blood **mixes** in the ventricle.',
        'Give the **three surfaces** for respiration and say which is used in water.',
      ],
      n: 'Exam tips. Write the parts of the canal in order. Say that bile and pancreatic juice enter the duodenum. Remember two atria and one ventricle, with mixing. And name the skin, mouth lining and lungs as the three surfaces for breathing.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Structural Organisation in Animals: Frog — Part 2: Excretion, nervous system and reproduction',
  goals: [
    'Describe the excretory organs and the urinogenital system of the male and the female frog',
    'Name the parts of the frog brain and its sense organs',
    'Describe fertilisation and development in the frog',
  ],
  slides: [
    sl('title', 'Excretion, control and reproduction', {
      b: 'Part 2 — how the frog removes waste, coordinates its body and reproduces.',
      v: flow('LR', [['e', 'Excretory system'], ['n', 'Nervous system'], ['r', 'Reproductive system']], [['e', 'n'], ['n', 'r']], 'Excretory, nervous and reproductive systems'),
      n: 'This part covers three systems. The kidneys remove nitrogenous waste. The brain, spinal cord and nerves coordinate the body. And the reproductive organs make gametes, which meet in water in external fertilisation.',
    }),
    sl('diagram', 'Excretion and the male urinogenital system', {
      b: 'The frog is **ureotelic**: its kidneys remove **urea**. In the male, the ureter acts as the **urinogenital duct**, carrying urine and sperms.',
      v: V.male,
      n: 'A pair of dark red kidneys lies on either side of the backbone. Each is made of many nephrons. A pair of yellowish testes is attached to the kidneys, and fine tubes carry sperms into them. The urinogenital duct carries both urine and sperms to the cloaca.',
    }),
    sl('concept', 'Urine and gametes reach the cloaca', {
      b: 'The **cloaca** is a common chamber for faeces, urine and gametes. The two sexes differ in the ducts that open into it.',
      v: table(['Feature', 'Male', 'Female'], [['Gonads', 'Pair of testes, attached to the kidneys', 'Pair of ovaries, no functional link with the kidneys'], ['Duct from the kidney', 'Ureter acts as urinogenital duct', 'Ureter carries urine only'], ['Duct for gametes', 'Same urinogenital duct carries sperms', 'Separate oviducts carry ova'], ['Urinary bladder', 'Present, opens into the cloaca', 'Present, opens into the cloaca']], 'Table comparing the ducts of the male and the female frog'),
      n: 'In the male, one duct carries both urine and sperms. In the female, the ureters carry urine and the oviducts carry ova, and they open separately into the cloaca. The urinary bladder lies in front of the rectum and opens into the cloaca in both sexes.',
    }),
    sl('check', 'Quick check: the ducts', {
      b: 'Which duct carries both urine and sperms in a male frog?',
      n: 'Quick check. Name the duct that leaves the kidney.',
      chk: 'ck-duct-mcq',
    }),
    sl('example', 'Worked example 1: a dissection sheet', {
      b: `A dissection sheet lists ${SHEET_TOTAL} frogs, ${SHEET.males} male and ${SHEET.females} female. Every frog has two gonads. Each male has two urinogenital ducts; each female has two ureters and two oviducts, and all of them open into the cloaca. Find the gonads and the ducts that open into cloacae.`,
      ul: [
        `Gonads = ${SHEET_TOTAL} × 2 = **${GONADS}**.`,
        `Male ducts = ${SHEET.males} × 2 = **${MALE_DUCTS}**.`,
        `Female ducts = ${SHEET.females} × (2 + 2) = **${FEMALE_DUCTS}**.`,
        `All ducts = ${MALE_DUCTS} + ${FEMALE_DUCTS} = **${DUCTS}**.`,
      ],
      v: table(['Quantity', 'Value'], [['Gonads', String(GONADS)], ['Male ducts', String(MALE_DUCTS)], ['Female ducts', String(FEMALE_DUCTS)], ['All ducts', String(DUCTS)]], `Worked table: ${GONADS} gonads and ${DUCTS} ducts`),
      n: 'Count the ducts sex by sex. A male has one duct on each side, so two. A female has a ureter and an oviduct on each side, so four. Multiply by the number of frogs of each sex and add the two totals.',
    }),
    sl('diagram', 'Female reproductive system', {
      b: 'A pair of **ovaries** near the kidneys; a pair of **oviducts** that open separately into the **cloaca**. Fertilisation is **external**.',
      v: V.female,
      n: 'The ovaries are large and full of ova, and they have no functional connection with the kidneys. Ova pass into the body cavity, are collected by the funnels of the oviducts and travel to the cloaca. A female can lay thousands of ova at a time.',
    }),
    sl('concept', 'Fertilisation and development', {
      b: 'Fertilisation is **external** and takes place in **water**; development is **indirect**, through a **tadpole**.',
      v: table(['Stage', 'What happens'], [['Mating', 'Male clasps the female; she lays ova, he sheds sperms'], ['Fertilisation', 'Outside the body, in water'], ['Embryo', 'Develops into a tadpole, which breathes by gills'], ['Metamorphosis', 'Tadpole changes into a young frog with lungs and limbs']], 'Table of fertilisation and development in the frog'),
      n: 'The female lays her ova in water and the male sheds sperms over them, so fertilisation is external. A large number of ova are laid because many are lost. The tadpole that hatches changes by metamorphosis into an adult frog.',
    }),
    sl('check', 'Quick check: fertilisation', {
      b: 'Where does fertilisation take place in a frog?',
      n: 'Quick check. Inside or outside the female body?',
      chk: 'ck-ferti-mcq',
    }),
    sl('diagram', 'The brain', {
      b: 'Forebrain: **olfactory lobes**, **cerebral hemispheres**, **diencephalon**. Midbrain: **optic lobes**. Hindbrain: **cerebellum** and **medulla oblongata**.',
      v: V.brain,
      n: 'The brain lies inside the cranium. The forebrain has the olfactory lobes for smell, the cerebral hemispheres and the diencephalon. The midbrain has two optic lobes. The hindbrain has the cerebellum, which balances, and the medulla oblongata, which continues as the spinal cord.',
    }),
    sl('concept', 'Nervous system and sense organs', {
      b: 'The nervous system has central, peripheral and autonomic parts.',
      v: table(['Part', 'Details'], [['Central nervous system', 'Brain and spinal cord'], ['Peripheral nervous system', 'Ten pairs of cranial nerves from the brain and spinal nerves'], ['Autonomic nervous system', 'Controls involuntary organs'], ['Sense organs', 'Touch, taste, smell, sight and hearing; the ear has a tympanum and an inner ear']], 'Table of the nervous system and sense organs of the frog'),
      n: 'The brain and spinal cord form the central nervous system. Ten pairs of cranial nerves arise from the brain. The sense organs include organs of touch, taste, smell, sight and hearing, and the ear consists of the tympanum and an internal ear.',
    }),
    sl('example', 'Worked example 2: nerve conduction', {
      b: `A nerve ${NERVE.lengthM} m long carries an impulse at ${NERVE.speed} m per second. How many milliseconds does the impulse take to travel along it?`,
      ul: [
        `Time = distance ÷ speed = ${NERVE.lengthM} ÷ ${NERVE.speed} = 0.005 second.`,
        `1 second = 1000 milliseconds, so the time is **${NERVE_MS} milliseconds**.`,
      ],
      v: table(['Step', 'Value'], [['Time in seconds', '0.005'], ['Time in milliseconds', String(NERVE_MS)]], `Worked table: ${NERVE_MS} milliseconds`),
      n: 'Divide the distance by the speed to get the time in seconds, then multiply by one thousand to change to milliseconds. The impulse crosses this short nerve in five thousandths of a second.',
    }),
    sl('check', 'Quick check: the brain', {
      b: 'Which part of the brain of a frog has a pair of optic lobes?',
      n: 'Quick check. Name the region of the brain between forebrain and hindbrain.',
      chk: 'ck-brain-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Kidneys remove urea (ureotelic); male ureter is a urinogenital duct; female ureter and oviduct open separately into the cloaca.',
        'Brain: forebrain (olfactory lobes, hemispheres, diencephalon), midbrain (optic lobes), hindbrain (cerebellum, medulla oblongata); ten pairs of cranial nerves.',
        'Reproduction: testes and ovaries; external fertilisation in water; tadpole and metamorphosis.',
      ],
      v: table(['System', 'Key point'], [['Excretory', 'Kidneys; urea'], ['Nervous', 'Brain, spinal cord, cranial nerves'], ['Reproductive', 'External fertilisation, tadpole']], 'Summary table of excretory, nervous and reproductive systems'),
      n: 'To recap: the frog excretes urea through its kidneys, its brain is divided into forebrain, midbrain and hindbrain, and it reproduces by external fertilisation in water, with a tadpole that undergoes metamorphosis.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say that the male **ureter carries sperms too** and that the female **oviducts open separately**.',
        'Give the **three regions** of the brain with two parts of each where you can.',
        'Write **external fertilisation in water**, and **indirect development**.',
        'Label diagrams of the urinogenital systems with the **cloaca** and the **urinary bladder**.',
      ],
      n: 'Exam tips. Remember that the male duct carries both urine and sperms, while the female oviducts open separately. Give the regions of the brain with their parts. Write external fertilisation and indirect development. And label the cloaca and the bladder.',
    }),
  ],
});
