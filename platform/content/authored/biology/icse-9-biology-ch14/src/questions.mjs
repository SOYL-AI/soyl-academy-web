// ICSE 9 Biology ch14 Aids to Health and Health Organisations — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { LEVEL, PEAK1, PEAK1_DAY, PEAK2, PEAK2_DAY, PEAK_RATIO, TIME1, TIME2, TIME_RATIO, BOOSTER_DAY, FALL_AFTER, LEVEL_AT_BOOSTER, COURSE, COURSE_ALL, COURSE_TAKEN, COURSE_LEFT, COURSE_LEFT_PCT, MIX, MIX_TOTAL, MIX_PCT, BREATH, BREATH_PASS, BREATH_PCT, HANDS, HANDS_LEFT, CAMP, CAMP_ML, CAMP_L, RELIEF, RELIEF_BLANKETS, RELIEF_RICE, DATES, YEARS_TO_SMALLPOX, YEARS_BETWEEN, TWO_STAGE, TWO_AFTER_NOSE, TWO_TRAPPED_WIND, TWO_REACH } from './calc.mjs';
import { VACC, DEFENCE_LETTERED, LINING_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const vaccFig = svgV(VACC, 'Graph of antibody level against days after a first dose on day 0 and a booster on day 28');
const defFig = svgV(DEFENCE_LETTERED, 'Outline of a head and body with five defences lettered A to E');
const linFig = svgV(LINING_LETTERED, 'Section of the lining of the windpipe with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-vaccine', mcq({
  stem: 'A vaccine protects a person because it makes the body produce',
  right: 'its own antibodies and memory cells', wrong: ['ready-made antibodies from a horse', 'a poison that kills the germs', 'extra red blood cells'],
  sol: 'A vaccine trains the body to make antibodies and memory cells — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-serum', mcq({
  stem: 'A person who has already been exposed to dangerous germs needs protection at once. The best choice is',
  right: 'a serum holding ready-made antibodies', wrong: ['a vaccine, because it lasts longer', 'a disinfectant on the skin', 'extra vitamins'],
  sol: 'A serum acts at once; a vaccine needs days or weeks — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-antibiotic', mcq({
  stem: 'Antibiotics are useful against diseases caused by',
  right: 'bacteria', wrong: ['viruses', 'worms', 'a lack of vitamins'],
  sol: 'Antibiotics act on bacteria, not on viruses — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-disinfectant', mcq({
  stem: 'A chemical that is strong enough to clean a hospital floor but would harm the skin is a',
  right: 'disinfectant', wrong: ['antiseptic', 'vaccine', 'antibiotic'],
  sol: 'Strong chemicals for non-living things are disinfectants — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-cilia', mcq({
  stem: 'In the windpipe, the tiny hair-like structures that sweep mucus upward are called',
  right: 'cilia', wrong: ['villi', 'platelets', 'antibodies'],
  sol: 'Cilia beat together and sweep mucus up towards the throat — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-who', mcq({
  stem: 'The United Nations agency that works for the highest possible level of health for all people is the',
  right: 'World Health Organization', wrong: ['Food and Agriculture Organization', 'International Court of Justice', 'Indian Medical Association'],
  sol: 'The WHO is the health agency of the United Nations — option (@K).',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 vaccination and immunisation
add('mem-mcq', mcq({
  stem: 'A girl is given a second dose of the same vaccine four weeks after the first. Her body now makes antibodies much faster because it has',
  right: 'memory cells that remember the first dose', wrong: ['stored ready-made antibodies from the first dose', 'lost all her white blood cells', 'destroyed the vaccine in her stomach'],
  sol: 'Memory cells formed after the first dose give a quick, strong response — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('weak-mcq', mcq({
  stem: 'A vaccine made from weakened germs can be injected into a healthy child because the weakened germs',
  right: 'cannot cause the disease but still make the body produce antibodies', wrong: ['kill the white blood cells of the child', 'carry ready-made antibodies for the child', 'cause the disease but only for a very short time'],
  sol: 'A vaccine is harmless but is recognised by the body as foreign — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('bcg-mcq', mcq({
  stem: 'A newborn baby in a hospital is given a vaccine that protects against a bacterial disease of the lungs. The disease is',
  right: 'tuberculosis', wrong: ['polio', 'measles', 'hepatitis B'],
  sol: 'The vaccine given to infants against a lung disease protects against tuberculosis — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('immun-mcq', mcq({
  stem: 'Which statement correctly separates vaccination from immunisation?',
  right: 'Vaccination is giving the vaccine; immunisation is the person becoming immune', wrong: ['Vaccination is becoming immune; immunisation is giving the vaccine', 'Vaccination gives ready-made antibodies; immunisation gives a vaccine', 'Both mean taking an antibiotic'],
  sol: 'Vaccination is the method; immunisation is the result — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('figV-mcq', mcq({
  stem: 'The graph shows the antibody level of a child after two doses of a vaccine. What was the highest level reached after the first dose?',
  right: '8 units', wrong: ['3 units', '5 units', '72 units'],
  sol: `The level rose to ${PEAK1} by day ${PEAK1_DAY} after the first dose — option (@K).`,
  d: 1, c: 'application', t: [1],
  assets: [vaccFig],
}));
add('figV2-mcq', mcq({
  stem: 'In the graph, the second rise in antibody level is much faster and higher than the first because',
  right: 'memory cells made after the first dose respond quickly', wrong: ['the first dose of vaccine was too weak to be harmless', 'the white blood cells were destroyed after day 28', 'a serum was injected on day 28'],
  sol: 'Memory cells give a quick and strong response to the second dose — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [vaccFig],
}));
add('ar-vacc', ar({
  a: 'A vaccine can protect a person from a disease before the person meets the germs.',
  r: 'A vaccine makes the body form antibodies and memory cells without causing the disease.',
  key: 'c',
  sol: 'Both are true, and the formation of antibodies and memory cells without the disease explains the early protection — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('boost-tf', tf({
  stem: 'A second dose of a vaccine produces a faster response than the first dose.',
  key: 't',
  sol: 'True. Memory cells formed after the first dose respond quickly.',
  d: 1, c: 'understanding', t: [1],
}));
add('term-vaccine', term({
  stem: 'Give the biological term: a preparation of harmless germ material that makes the body produce antibodies without causing the disease.',
  model: '**Vaccine.**', sol: 'Vaccine.', sch: 'Vaccine',
  d: 1, c: 'recall', t: [1],
}));
add('odd-vacc', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Polio drops, BCG, Measles vaccine, Antitoxin.',
  model: '**Antitoxin**; the others are **vaccines**.', sol: 'Antitoxin is ready-made antibody.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1, 2],
}));
add('reason-boost', term({
  stem: 'Give reason: a second dose of a vaccine gives a stronger response than the first dose.',
  model: '**Memory cells** formed after the first dose **remember the germ**, so the body makes antibodies **faster and in greater amount**.', sol: 'Memory cells.', sch: 'Memory cells respond',
  d: 2, c: 'understanding', t: [1],
}));
add('peak-num', num({
  stem: `The antibody level reaches ${PEAK1} units after a first dose and ${PEAK2} units after a booster dose. How many times higher is the second peak than the first?`,
  value: PEAK_RATIO, unit: 'times',
  sol: `${PEAK2} ÷ ${PEAK1} = ${PEAK_RATIO} times.`,
  scheme: [[`${PEAK_RATIO} times`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 9 || 'value');
add('fall-num', num({
  stem: `In the graph the antibody level is ${PEAK2} units at its second peak on day ${PEAK2_DAY} and ${LEVEL[7]} units on day 49. By how many units has it fallen?`,
  value: FALL_AFTER,
  sol: `${PEAK2} − ${LEVEL[7]} = ${FALL_AFTER} units.`,
  scheme: [[`${FALL_AFTER}`, 1]],
  d: 2, c: 'application', t: [1],
  assets: [vaccFig],
}), (q) => q.answer.value === 24 || 'value');
add('vacc-short2', short({
  marks: 2,
  stem: 'Explain how a vaccine gives protection against a disease.',
  model: 'A vaccine holds **harmless germ material**, so it **cannot cause the disease**. It makes the white blood cells produce **antibodies** and **memory cells**, which respond quickly if the real germ enters later.',
  sol: 'Harmless; antibodies and memory cells.',
  scheme: [['Harmless, cannot cause the disease', 1], ['Antibodies and memory cells formed', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('vi-short2', short({
  marks: 2,
  stem: 'Differentiate between vaccination and immunisation.',
  model: '**Vaccination** is the **giving of a vaccine** to a person. **Immunisation** is the **process of becoming immune** to a disease, which may also happen by ready-made antibodies.',
  sol: 'Giving vaccine; becoming immune.',
  scheme: [['Vaccination: giving the vaccine', 1], ['Immunisation: becoming immune', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('boost-short2', short({
  marks: 2,
  stem: 'What is a booster dose and why is it given?',
  model: 'A **booster dose** is a **later dose** of the same vaccine. It is given so that the **memory cells** respond and the antibody level becomes **higher and lasts longer**.',
  sol: 'Later dose; higher, longer protection.',
  scheme: [['Later dose of the vaccine', 1], ['Reason: stronger, longer protection', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vacc-short3', short({
  marks: 3,
  stem: 'Describe, in three steps, how a vaccine gives long-lasting protection.',
  model: '1. The **vaccine**, made harmless, is given by injection or drops.\n2. The white blood cells **make antibodies** against it, and some remain as **memory cells**.\n3. If the **real germ** enters later, the memory cells make antibodies **quickly**, so the disease does not develop.',
  sol: 'Vaccine given; antibodies and memory cells; quick response to the real germ.',
  scheme: [['Vaccine given', 1], ['Antibodies and memory cells', 1], ['Quick response later', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vacc-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between vaccination and immunisation.',
  model: '| Vaccination | Immunisation |\n|---|---|\n| **Giving** a vaccine | **Becoming immune** |\n| The **method** | The **result** or whole process |\n| A vaccine is **always** used | May also use **ready-made antibodies** |',
  sol: 'Meaning; nature; use of a vaccine.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 antitoxins, serums, antibiotics
add('toxin-mcq', mcq({
  stem: 'The substance that neutralises the poison made by the germs of diphtheria in a patient\'s body is a(n)',
  right: 'antitoxin', wrong: ['antiseptic', 'vaccine', 'disinfectant'],
  sol: 'An antitoxin is an antibody that neutralises a toxin — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('dog-mcq', mcq({
  stem: 'A farmer is bitten by a stray dog that may have rabies. The doctor injects ready-made antibodies at once because',
  right: 'a vaccine alone would need days to make the body form its own antibodies', wrong: ['a vaccine would cause rabies in him', 'ready-made antibodies give life-long protection', 'antibiotics cannot be given to people'],
  sol: 'Ready-made antibodies act at once; a vaccine is slow — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('misuse-mcq', mcq({
  stem: 'A student keeps leftover antibiotic tablets and takes them for every fever. This is unwise because',
  right: 'many fevers are caused by viruses, and misuse makes bacteria resistant', wrong: ['antibiotics cause all fevers', 'antibiotics act only on viruses', 'the tablets become stronger as they age'],
  sol: 'Antibiotics do not act on viruses, and careless use gives resistant bacteria — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('source-mcq', mcq({
  stem: 'The first antibiotic, penicillin, was obtained from',
  right: 'a mould', wrong: ['a virus', 'a flowering plant', 'a worm'],
  sol: 'Penicillin is made by a mould — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gut-mcq', mcq({
  stem: 'A patient who takes antibiotics for a long time may get loose stools, because the antibiotic also kills',
  right: 'useful bacteria in the intestine', wrong: ['white blood cells in the intestine', 'cells of the intestine wall only', 'viruses in the intestine'],
  sol: 'Antibiotics do not distinguish useful from harmful bacteria — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-antib', ar({
  a: 'Antibiotics are the right treatment for influenza.',
  r: 'Influenza is caused by a virus.',
  key: 'b',
  sol: 'The assertion is false, because antibiotics do not act on viruses. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-viral', ar({
  a: 'Antibiotics kill bacteria.',
  r: 'Antibiotics act on viruses as well as on bacteria.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: antibiotics do not act on viruses — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('ser-tf', tf({
  stem: 'A serum gives protection that lasts for many years.',
  key: 'f',
  sol: 'False. The antibodies in a serum are ready-made and fade soon; no memory cells are formed.',
  d: 2, c: 'understanding', t: [2],
}));
add('term-serum', term({
  stem: 'Give the biological term: the part of blood that holds ready-made antibodies.',
  model: '**Serum.**', sol: 'Serum.', sch: 'Serum',
  d: 1, c: 'recall', t: [2],
}));
add('reason-ser', term({
  stem: 'Give reason: the protection given by a serum lasts only for a short time.',
  model: 'The antibodies are **ready-made** and are used up or removed; the body **makes no memory cells**.', sol: 'No memory cells.', sch: 'No memory cells',
  d: 2, c: 'understanding', t: [2],
}));
add('reason-course', term({
  stem: 'Give reason: a patient must finish the full course of an antibiotic even after feeling better.',
  model: 'Some **bacteria may still be alive**; they can **multiply** and may become **resistant** to the antibiotic.', sol: 'Surviving bacteria become resistant.', sch: 'Surviving bacteria',
  d: 2, c: 'application', t: [2],
}));
add('course-num', num({
  stem: `A doctor prescribes ${COURSE.perDay} tablets a day for ${COURSE.days} days. A patient stops after ${COURSE.stopAfter} days. How many tablets are left untaken?`,
  value: COURSE_LEFT,
  sol: `Full course = ${COURSE.perDay} × ${COURSE.days} = ${COURSE_ALL}; taken = ${COURSE.perDay} × ${COURSE.stopAfter} = ${COURSE_TAKEN}; left = ${COURSE_LEFT}.`,
  scheme: [[`${COURSE_LEFT}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 18 || 'value');
add('serum-short2', short({
  marks: 2,
  stem: 'Why is a serum given, and not a vaccine, to a person who needs protection at once?',
  model: 'A **serum** holds **ready-made antibodies**, so it **acts at once**. A vaccine makes the body build its own antibodies, which **takes days or weeks**.',
  sol: 'Ready-made antibodies act at once; vaccine is slow.',
  scheme: [['Serum has ready-made antibodies and acts at once', 1], ['Vaccine takes days or weeks', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('antitoxin-short2', short({
  marks: 2,
  stem: 'What is an antitoxin and for which kind of disease is it used?',
  model: 'An **antitoxin** is an **antibody that neutralises a poison (toxin)** made by germs. It is used in diseases in which the germs make a toxin, such as **diphtheria** or **tetanus**.',
  sol: 'Antibody neutralising a toxin; diphtheria or tetanus.',
  scheme: [['Neutralises the toxin', 1], ['A disease such as diphtheria or tetanus', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('antib-short2', short({
  marks: 2,
  stem: 'State what antibiotics act against and name one antibiotic.',
  model: 'Antibiotics act against **bacteria** (they kill them or stop their growth) and **not against viruses**. One antibiotic is **penicillin** (or streptomycin, tetracycline).',
  sol: 'Bacteria; an antibiotic named.',
  scheme: [['Act against bacteria', 1], ['A named antibiotic', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('misuse-short2', short({
  marks: 2,
  stem: 'State two harms of using antibiotics carelessly.',
  model: 'Bacteria become **resistant** to the antibiotic, and the antibiotic **kills useful bacteria** in the gut. (It may also cause an **allergy**.)',
  sol: 'Any two harms.',
  scheme: [['First harm', 1], ['Second harm', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('antib-short3', short({
  marks: 3,
  stem: 'State three precautions to be followed when a doctor prescribes an antibiotic.',
  model: '1. Take it **only on the doctor\'s advice**, not for a cold or any fever.\n2. Take the **correct dose** at the right times.\n3. **Complete the full course**, even after feeling better.',
  sol: 'Doctor\'s advice; correct dose; full course.',
  scheme: [['Doctor\'s advice', 1], ['Correct dose', 1], ['Full course', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ab-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between a vaccine and an antitoxin.',
  model: '| Vaccine | Antitoxin |\n|---|---|\n| Makes the body form **its own antibodies** | Gives **ready-made antibodies** |\n| **Slow** to protect | Acts **at once** |\n| **Long-lasting** protection | **Short** protection |',
  sol: 'Source of antibodies; speed; length of protection.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 antiseptics and disinfectants
add('antis-mcq', mcq({
  stem: 'A boy falls and scrapes his knee. The best chemical to clean the wound is a',
  right: 'dilute antiseptic such as boric acid solution', wrong: ['strong phenyl solution', 'bleaching powder solution', 'formalin'],
  sol: 'A mild antiseptic is safe on living tissue — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('disinf-mcq', mcq({
  stem: 'A hospital washes its floors and drains with a strong chemical. Which of these is suitable for the purpose?',
  right: 'Bleaching powder', wrong: ['Boric acid', 'Penicillin', 'Dilute hydrogen peroxide'],
  sol: 'Bleaching powder is a disinfectant for non-living surfaces — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('strong-mcq', mcq({
  stem: 'A disinfectant should not be applied to a cut on the skin because it',
  right: 'is strong enough to harm living cells', wrong: ['is made from bacteria', 'works only on viruses', 'makes the blood clot too fast'],
  sol: 'Disinfectants are too strong for living tissue — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('dilute-mcq', mcq({
  stem: 'A nurse mixes an antiseptic concentrate with water before using it on a wound. Dilution is done to',
  right: 'make it mild enough for living tissue', wrong: ['turn it into a disinfectant', 'make it act on viruses', 'give it the action of an antibiotic'],
  sol: 'Dilution makes the chemical safe for skin — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('term-antiseptic', term({
  stem: 'Give the biological term: a mild chemical used on living tissue to kill germs or stop their growth.',
  model: '**Antiseptic.**', sol: 'Antiseptic.', sch: 'Antiseptic',
  d: 1, c: 'recall', t: [3],
}));
add('odd-chem', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Phenyl, Bleaching powder, Formalin, Boric acid.',
  model: '**Boric acid**; the others are **disinfectants** (boric acid is a mild antiseptic).', sol: 'Boric acid is an antiseptic.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3],
}));
add('reason-wound', term({
  stem: 'Give reason: a strong disinfectant is not applied to a wound.',
  model: 'It is **strong** and **harms the living cells** of the skin and the wound.', sol: 'Harms living cells.', sch: 'Harms living cells',
  d: 2, c: 'understanding', t: [3],
}));
add('mix-num', num({
  stem: `A nurse mixes ${MIX.conc} mL of antiseptic concentrate with ${MIX.water} mL of water. What is the strength of the solution, in per cent of concentrate?`,
  value: MIX_PCT, unit: 'per cent',
  sol: `Volume = ${MIX.conc} + ${MIX.water} = ${MIX_TOTAL} mL; strength = ${MIX.conc} ÷ ${MIX_TOTAL} × 100 = ${MIX_PCT} per cent.`,
  scheme: [[`${MIX_PCT} per cent`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 10 || 'value');
add('hands-num', num({
  stem: `There are ${HANDS.before} bacteria on a pair of hands. An antiseptic soap kills ${HANDS.killedPct} per cent of them. How many bacteria are left?`,
  value: HANDS_LEFT,
  sol: `Killed = ${HANDS.before} × ${HANDS.killedPct} ÷ 100 = ${HANDS.before - HANDS_LEFT}; left = ${HANDS_LEFT}.`,
  scheme: [[`${HANDS_LEFT}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 100 || 'value');
add('ex-short2', short({
  marks: 2,
  stem: 'Name one antiseptic and one disinfectant, and state where each is used.',
  model: '**Boric acid** (or dilute hydrogen peroxide) is an **antiseptic**, used on **wounds and skin**. **Bleaching powder** (or phenyl) is a **disinfectant**, used on **floors and drains**.',
  sol: 'Antiseptic and use; disinfectant and use.',
  scheme: [['Antiseptic with use', 1], ['Disinfectant with use', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('antdis-short2', short({
  marks: 2,
  stem: 'Distinguish between an antiseptic and a disinfectant on the basis of strength and place of use.',
  model: 'An **antiseptic** is **mild** and is used on **living tissue**. A **disinfectant** is **strong** and is used on **non-living things** such as floors and drains.',
  sol: 'Mild, living tissue; strong, non-living things.',
  scheme: [['Antiseptic: mild, living tissue', 1], ['Disinfectant: strong, non-living things', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('antdis-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between an antiseptic and a disinfectant.',
  model: '| Antiseptic | Disinfectant |\n|---|---|\n| **Mild** | **Strong** |\n| Used on **living tissue** such as wounds | Used on **non-living things** such as floors and instruments |\n| Example: **boric acid** | Example: **phenyl** or **bleaching powder** |',
  sol: 'Strength; use; example.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('chem-short3', short({
  marks: 3,
  stem: 'State where each of these is used: (i) an antiseptic, (ii) a disinfectant, (iii) an antibiotic.',
  model: '(i) An **antiseptic** is used on **living tissue** outside the body, such as a wound. (ii) A **disinfectant** is used on **non-living things** such as floors and drains. (iii) An **antibiotic** is taken **inside the body**, on a doctor\'s advice, to treat a bacterial disease.',
  sol: 'Living tissue; non-living things; inside the body.',
  scheme: [['Antiseptic', 1], ['Disinfectant', 1], ['Antibiotic', 1]],
  d: 2, c: 'application', t: [2, 3],
}));

// ---------------------------------------------------------------- t04 the body's local defence system
add('tears-mcq', mcq({
  stem: 'Dust enters a child\'s eye and tears flow. Tears help to protect the eye because they',
  right: 'wash the surface and contain an enzyme that kills bacteria', wrong: ['contain ready-made antibodies from a horse', 'make the cornea thick', 'carry vitamins to the eye'],
  sol: 'Tears wash and contain an enzyme that kills many bacteria — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('stomach-mcq', mcq({
  stem: 'Many germs swallowed with food are destroyed before they can cause disease. This is mainly due to',
  right: 'the acid in the stomach', wrong: ['the bile in the liver', 'the mucus in the nose', 'the cilia in the windpipe'],
  sol: 'Stomach acid kills most swallowed germs — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('nose-mcq', mcq({
  stem: 'People who live in dusty places breathe through the nose rather than the mouth. The hairs and mucus in the nose',
  right: 'trap dust and germs before they reach the lungs', wrong: ['make antibodies against the germs', 'kill the germs with acid', 'carry the germs to the stomach'],
  sol: 'Hairs and sticky mucus trap particles — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cilia-mcq', mcq({
  stem: 'A germ trapped in the mucus lining the windpipe is most likely to',
  right: 'be swept up to the throat and swallowed or coughed out', wrong: ['be carried down to the lungs by the cilia', 'be killed at once by the mucus alone', 'enter the blood through the mucus'],
  sol: 'Cilia sweep the mucus upward — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('merit-mcq', mcq({
  stem: 'Which is a merit of the first-line defences of the body?',
  right: 'They act at once against many kinds of germs', wrong: ['They act only against one kind of germ', 'They need a doctor\'s injection', 'They work only after a person has fallen ill'],
  sol: 'First-line defences are immediate and general — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('figDefB-mcq', mcq({
  stem: 'In the figure, which letter marks the part that traps dust with hairs and sticky mucus?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the nose; A is the eye with tears, C the windpipe, D the stomach and E the skin — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [defFig],
}));
add('figDefD-mcq', mcq({
  stem: 'In the figure, which letter marks the organ in which acid kills germs that have been swallowed?',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is the stomach — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [defFig],
}));
add('figLinC-mcq', mcq({
  stem: 'In the figure of the lining of the windpipe, which letter marks the structures that beat to sweep the mucus along?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C marks the cilia; A is the mucus layer, B a trapped germ and D a lining cell — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [linFig],
}));
add('ar-tears', ar({
  a: 'Tears protect the eye from infection.',
  r: 'Tears contain water and salts.',
  key: 'd',
  sol: 'Both are true, but the water and salts do not explain the protection, which is due to the enzyme in tears and the washing action — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('term-mucus', term({
  stem: 'Give the biological term: the sticky fluid in the nose and windpipe that traps dust and germs.',
  model: '**Mucus.**', sol: 'Mucus.', sch: 'Mucus',
  d: 1, c: 'recall', t: [4],
}));
add('odd-def', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Skin, Tears, Mucus, Serum.',
  model: '**Serum**; the others are **first-line defences of the body** (serum holds ready-made antibodies).', sol: 'Serum is not a first-line defence.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2, 4],
}));
add('reason-mouth', term({
  stem: 'Give reason: breathing through the nose is healthier than breathing through the mouth.',
  model: 'The **hairs and mucus** in the nose **trap dust and germs**, so the air that reaches the lungs is cleaner.', sol: 'Nose traps dust and germs.', sch: 'Nose traps dust and germs',
  d: 2, c: 'application', t: [4],
}));
add('breath-num', num({
  stem: `A person breathes in ${BREATH.in} particles of dust and germs. The mucus in the nose traps ${BREATH.trapped} of them. How many particles get past the nose?`,
  value: BREATH_PASS,
  sol: `${BREATH.in} − ${BREATH.trapped} = ${BREATH_PASS}.`,
  scheme: [[`${BREATH_PASS}`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 50 || 'value');
add('twostage-num', num({
  stem: `A person breathes in ${TWO_STAGE.in} particles. The nose traps ${TWO_STAGE.nose} of them. The windpipe then traps ${TWO_STAGE.windpipePct} per cent of the particles that got past the nose. How many particles reach the lungs?`,
  value: TWO_REACH,
  sol: `Past the nose = ${TWO_STAGE.in} − ${TWO_STAGE.nose} = ${TWO_AFTER_NOSE}; trapped in the windpipe = ${TWO_AFTER_NOSE} × ${TWO_STAGE.windpipePct} ÷ 100 = ${TWO_TRAPPED_WIND}; reach the lungs = ${TWO_AFTER_NOSE} − ${TWO_TRAPPED_WIND} = ${TWO_REACH}.`,
  scheme: [[`${TWO_REACH}`, 1]],
  d: 4, c: 'analysis', t: [4],
}), (q) => q.answer.value === 10 && TWO_AFTER_NOSE === 50 || 'value');
add('skin-short2', short({
  marks: 2,
  stem: 'State two ways in which the skin protects the body from germs.',
  model: 'The **horny layer** is a **tough, waterproof barrier** that germs cannot easily cross. The **oil and sweat** on its surface make it **unfriendly to germs**.',
  sol: 'Tough barrier; oil and sweat.',
  scheme: [['Tough barrier', 1], ['Oil and sweat', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('local-short2', short({
  marks: 2,
  stem: 'Name two first-line defences in the nose and windpipe and state the role of each.',
  model: '**Mucus** (with hairs in the nose) **traps dust and germs**. **Cilia** in the windpipe **sweep the mucus upward** to the throat.',
  sol: 'Mucus traps; cilia sweep.',
  scheme: [['Mucus and its role', 1], ['Cilia and their role', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('stom-short2', short({
  marks: 2,
  stem: 'State how (i) tears and (ii) the stomach acid protect the body.',
  model: '(i) **Tears** wash the eye and contain an **enzyme that kills bacteria**. (ii) The **acid in the stomach kills** most germs that are swallowed with food and water.',
  sol: 'Tears wash and kill; acid kills swallowed germs.',
  scheme: [['Tears', 1], ['Stomach acid', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('defence-short3', short({
  marks: 3,
  stem: 'Describe how the skin, the mucus in the nose and the tears help to keep germs out of the body.',
  model: 'The **skin** is a **tough barrier** that germs cannot cross. The **mucus** in the nose **traps dust and germs**. **Tears** wash the eye and hold an **enzyme that kills bacteria**.',
  sol: 'Skin barrier; mucus traps; tears wash and kill.',
  scheme: [['Skin', 1], ['Mucus', 1], ['Tears', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('merits-short3', short({
  marks: 3,
  stem: 'State three merits of the first-line defences of the body.',
  model: '1. They are **always in place** and act **at once**.\n2. They act against **all kinds of germs**, not just one kind.\n3. They are **natural**: no injection or medicine is needed. (They also stop most germs from getting in.)',
  sol: 'Immediate; general; natural.',
  scheme: [['First merit', 1], ['Second merit', 1], ['Third merit', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 Red Cross and WHO
add('rcact-mcq', mcq({
  stem: 'After a flood, a team gives first aid, food and blankets to the families who have lost their homes. This is typical work of the',
  right: 'Red Cross', wrong: ['World Health Organization only', 'a drug factory', 'a municipal sweepers\' union'],
  sol: 'First aid and relief in disasters are major activities of the Red Cross — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('who-mcq', mcq({
  stem: 'A worldwide campaign led by an agency of the United Nations led to the declaration in 1980 that smallpox had been wiped out. The agency was the',
  right: 'World Health Organization', wrong: ['Red Cross', 'Indian Council of Medical Research', 'International Court of Justice'],
  sol: 'The WHO led the campaign against smallpox — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('founder-mcq', mcq({
  stem: 'The Red Cross movement was started by',
  right: 'Henry Dunant', wrong: ['Edward Jenner', 'Louis Pasteur', 'Robert Koch'],
  sol: 'Henry Dunant founded the Red Cross — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('blood-mcq', mcq({
  stem: 'A camp where people give blood, which is stored in a blood bank for patients, is an activity of the',
  right: 'Red Cross', wrong: ['police department', 'a pharmaceutical shop', 'a textile mill'],
  sol: 'Blood donation camps and blood banks are Red Cross activities — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('standard-mcq', mcq({
  stem: 'An international body fixes standards for the safety of medicines and food and trains health workers in many countries. It is the',
  right: 'World Health Organization', wrong: ['Red Cross', 'a local municipal office', 'a school health club'],
  sol: 'Setting standards and training are WHO activities — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('who-tf', tf({
  stem: 'The World Health Organization is an agency of the United Nations.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [5],
}));
add('odd-act', term({
  stem: 'Choose the odd one out and name the organisation to which the other three belong: Blood donation camp, Ambulance service, Disaster relief, Setting standards for medicines.',
  model: '**Setting standards for medicines** (a WHO activity); the others are activities of the **Red Cross**.', sol: 'Setting standards is WHO.', sch: 'Odd one and organisation',
  d: 2, c: 'analysis', t: [5],
}));
add('term-dunant', term({
  stem: 'Name the person who started the Red Cross movement.',
  model: '**Henry Dunant.**', sol: 'Henry Dunant.', sch: 'Henry Dunant',
  d: 1, c: 'recall', t: [5],
}));
add('camp-num', num({
  stem: `At a blood donation camp, ${CAMP.donors} donors each give ${CAMP.ml} mL of blood. How many litres of blood are collected?`,
  value: CAMP_L, unit: 'litres',
  sol: `${CAMP.donors} × ${CAMP.ml} = ${CAMP_ML} mL = ${CAMP_L} litres.`,
  scheme: [[`${CAMP_L} litres`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 14 && CAMP_ML === 14000 || 'value');
add('relief-num', num({
  stem: `A relief team gives each of ${RELIEF.families} flood-hit families ${RELIEF.blankets} blankets. How many blankets are needed?`,
  value: RELIEF_BLANKETS,
  sol: `${RELIEF.families} × ${RELIEF.blankets} = ${RELIEF_BLANKETS}.`,
  scheme: [[`${RELIEF_BLANKETS}`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => q.answer.value === 960 && RELIEF_RICE === 2880 || 'value');
add('years-num', num({
  stem: `The World Health Organization was founded in ${DATES.who}, and smallpox was declared wiped out in ${DATES.smallpox}. How many years later was that?`,
  value: YEARS_TO_SMALLPOX, unit: 'years',
  sol: `${DATES.smallpox} − ${DATES.who} = ${YEARS_TO_SMALLPOX} years.`,
  scheme: [[`${YEARS_TO_SMALLPOX} years`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => q.answer.value === 32 && YEARS_BETWEEN === 85 || 'value');
add('rc-short2', short({
  marks: 2,
  stem: 'State two major activities of the Red Cross.',
  model: 'It gives **first aid** and runs **ambulance services**; it gives **relief** to the victims of wars and disasters; it runs **blood donation camps** and **blood banks** (any two).',
  sol: 'Any two activities.',
  scheme: [['First activity', 1], ['Second activity', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('who-short2', short({
  marks: 2,
  stem: 'State two major activities of the World Health Organization.',
  model: 'It **fights communicable diseases** through immunisation drives; it **responds to epidemics**; it does **research** and sets **standards** for medicines and food; it **trains health workers** (any two).',
  sol: 'Any two activities.',
  scheme: [['First activity', 1], ['Second activity', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('rc-short3', short({
  marks: 3,
  stem: 'State three major activities of the Red Cross.',
  model: '1. It gives **first aid** and ambulance service to the injured.\n2. It gives **relief** (food, shelter, medical care) in wars, floods and earthquakes.\n3. It runs **blood donation camps** and **blood banks**. (It also trains people in first aid.)',
  sol: 'Any three activities.',
  scheme: [['First activity', 1], ['Second activity', 1], ['Third activity', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('org-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between the Red Cross and the World Health Organization.',
  model: '| Red Cross | World Health Organization |\n|---|---|\n| Started by **Henry Dunant** | A **United Nations** agency |\n| Gives **first aid and relief** in wars and disasters | Fights **diseases**, sets **standards**, does **research** |\n| Emblem: a **red cross** on white | Headquarters in **Geneva** |',
  sol: 'Origin; main work; emblem or base.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('fill-aids', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [vaccine, serum, antibiotic, antiseptic, disinfectant, cilia, mucus, antitoxin]\n\nA preparation that makes the body produce antibodies without causing the disease is a (a) ______. The part of blood that holds ready-made antibodies is (b) ______. A mild chemical used on a wound is an (c) ______. A chemical taken in the body to kill bacteria is an (d) ______. Tiny hair-like structures that sweep mucus up the windpipe are (e) ______.',
  acc: [['vaccine'], ['serum'], ['antiseptic'], ['antibiotic'], ['cilia']],
  sol: '(a) vaccine; (b) serum; (c) antiseptic; (d) antibiotic; (e) cilia.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));
add('match5', match({
  marks: 5,
  stem: 'Study the diagram of the lining of the windpipe and match each lettered part with its description.',
  pairs: [
    ['A', 'Sticky layer that holds dust and germs'],
    ['B', 'Particle that is held in the sticky layer'],
    ['C', 'Hair-like structures that beat to sweep the layer along'],
    ['D', 'Cells that carry the hair-like structures'],
    ['E', 'Direction in which the trapped germs are carried'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'A mucus; B trapped germ; C cilia; D lining cell; E direction of sweeping, up towards the throat.',
  d: 2, c: 'application', t: [4],
  assets: [linFig],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('vaccgraph-long', long({
  marks: 10, wl: null,
  stem: `The graph shows the antibody level in the blood of a child after a first dose of a vaccine on day 0 and a second dose on day ${BOOSTER_DAY}.\n\n(a) State the highest level reached after the first dose and after the second dose. [2]\n\n(b) Explain why the rise after the second dose is faster and higher. [2]\n\n(c) Name the type of cell that is responsible for this response and the name given to the second dose. [2]\n\n(d) Draw a neat flow diagram showing how a vaccine protects a person from a disease, with four labelled steps. [4]`,
  model: `**(a)** First dose: **${PEAK1} units** (day ${PEAK1_DAY}); second dose: **${PEAK2} units** (day ${PEAK2_DAY}).\n\n**(b)** The **memory cells** formed after the first dose **remember** the vaccine, so the body makes **more antibodies, faster**.\n\n**(c)** **Memory cells** (white blood cells); the second dose is a **booster dose**.\n\n**(d)** **Vaccine given** → **white blood cells make antibodies** → **memory cells remain** → **real germ is met and destroyed quickly**; four labelled steps joined by arrows.`,
  sol: `${PEAK1} and ${PEAK2} units; memory cells respond; memory cells, booster; flow diagram.`,
  scheme: [[`${PEAK1} units`, 1], [`${PEAK2} units`, 1], ['Memory cells remember', 1], ['More antibodies, faster', 1], ['Memory cells', 1], ['Booster dose', 1], ['Flow diagram drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1],
  assets: [vaccFig],
}), () => PEAK1 === 8 && PEAK2 === 72 && LEVEL_AT_BOOSTER === 3 && TIME1 === 14 && TIME2 === 7 && TIME_RATIO === 2 || 'graph');
add('lining-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of the lining of the windpipe. Parts are lettered A to E.\n\n(a) Name the parts A, C and D. [3]\n\n(b) State the function of C and say what happens to the germ B. [2]\n\n(c) Name two other first-line defences of the body. [2]\n\n(d) Draw a neat, labelled diagram of the inside of the nose showing hairs and mucus, with three labels. [3]',
  model: '**(a)** A is the **mucus layer**, C the **cilia** and D a **lining cell**.\n\n**(b)** The **cilia sweep the mucus upward**; the trapped germ B is **carried up to the throat** and is swallowed or coughed out.\n\n**(c)** **Skin**, **tears**, **saliva**, or **acid in the stomach** (any two).\n\n**(d)** A **nostril** with **hairs** at the opening, a **mucus-covered lining** and the **passage** leading backward; three labels.',
  sol: 'Mucus, cilia, lining cell; sweep mucus, germ carried to throat; two defences; labelled nose.',
  scheme: [['A mucus layer', 1], ['C cilia', 1], ['D lining cell', 1], ['Cilia sweep mucus upward', 1], ['Germ carried to throat', 1], ['First defence', 1], ['Second defence', 1], ['Nose drawn', 1], ['Three labels', 2]],
  d: 2, c: 'application', t: [4],
  assets: [linFig],
}));
add('antis-long', long({
  marks: 10, wl: null,
  stem: `In a school clinic a nurse mixes ${MIX.conc} mL of an antiseptic concentrate with ${MIX.water} mL of clean water to clean a student's scraped elbow. The floor of the clinic is washed with a stronger chemical.\n\n(a) Calculate the volume of the solution and its strength in per cent. [2]\n\n(b) Explain why the concentrate is diluted before it is used on the elbow. [2]\n\n(c) Name one disinfectant and state why it is not used on the skin. [2]\n\n(d) Draw a neat, labelled diagram of a first-aid box showing four items. [4]`,
  model: `**(a)** Volume = ${MIX.conc} + ${MIX.water} = **${MIX_TOTAL} mL**; strength = ${MIX.conc} ÷ ${MIX_TOTAL} × 100 = **${MIX_PCT} per cent**.\n\n**(b)** The concentrate is **strong**; diluted, it is **mild enough** not to harm the **living cells** of the skin, but still kills germs.\n\n**(c)** **Bleaching powder** (or phenyl); it is **too strong** and would **damage living tissue**.\n\n**(d)** A **box** with a lid showing, for example, an **antiseptic bottle**, **cotton wool**, a **bandage** and **adhesive plasters**; four labels.`,
  sol: `${MIX_TOTAL} mL, ${MIX_PCT} per cent; dilution makes it mild; a disinfectant, too strong; labelled first-aid box.`,
  scheme: [[`${MIX_TOTAL} mL`, 1], [`${MIX_PCT} per cent`, 1], ['Concentrate is strong', 1], ['Mild enough for living cells', 1], ['A disinfectant named', 1], ['Too strong for skin', 1], ['Box drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
}), () => MIX_TOTAL === 200 && MIX_PCT === 10 || 'mix');
add('antib-long', long({
  marks: 10, wl: null,
  stem: `A doctor prescribes ${COURSE.perDay} antibiotic tablets a day for ${COURSE.days} days to a boy with a bacterial throat infection. He feels better and stops after ${COURSE.stopAfter} days. Later, his brother with a cold asks for the same tablets.\n\n(a) Calculate the number of tablets in the full course and the percentage of the course left untaken. [2]\n\n(b) Explain why the full course should be completed. [2]\n\n(c) Explain why the tablets will not help the brother's cold. [2]\n\n(d) Draw a neat flow diagram showing how careless use of an antibiotic can lead to resistant bacteria, with four labelled steps. [4]`,
  model: `**(a)** Full course = ${COURSE.perDay} × ${COURSE.days} = **${COURSE_ALL} tablets**; left = ${COURSE_LEFT} ÷ ${COURSE_ALL} × 100 = **${COURSE_LEFT_PCT} per cent**.\n\n**(b)** Some **bacteria may still be alive**; they can **multiply** and may become **resistant**.\n\n**(c)** A cold is caused by a **virus**, and antibiotics **do not act on viruses**.\n\n**(d)** **Antibiotic stopped early** → **some bacteria survive** → **they multiply** → **a resistant infection**; four labelled steps joined by arrows.`,
  sol: `${COURSE_ALL} tablets, ${COURSE_LEFT_PCT} per cent left; survivors multiply and may become resistant; a cold is viral; flow diagram.`,
  scheme: [[`${COURSE_ALL} tablets`, 1], [`${COURSE_LEFT_PCT} per cent`, 1], ['Some bacteria survive', 1], ['They may become resistant', 1], ['Cold is caused by a virus', 1], ['Antibiotics do not act on viruses', 1], ['Flow diagram drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [2],
}), () => COURSE_ALL === 30 && COURSE_LEFT_PCT === 60 || 'course');
add('serum-long', long({
  marks: 10, wl: null,
  stem: 'A farmer is bitten by a stray dog that may have rabies. At the hospital he is given a liquid that holds ready-made antibodies, as well as a vaccine.\n\n(a) Name the liquid and state where its antibodies may come from. [2]\n\n(b) Explain why ready-made antibodies are given in addition to the vaccine. [2]\n\n(c) Explain why the protection given by the liquid does not last long. [2]\n\n(d) Draw a neat flow diagram showing how a serum may be prepared from an animal, with four labelled steps. [4]',
  model: '**(a)** A **serum**; the antibodies come from an **immunised animal** such as a horse (or from a recovered person).\n\n**(b)** The serum **acts at once**, while the vaccine takes **days or weeks** to make the body form its own antibodies.\n\n**(c)** The antibodies are **ready-made** and fade soon; the body **forms no memory cells**.\n\n**(d)** **Harmless dose of germ or toxin injected into a horse** → **horse makes antibodies** → **blood collected** → **serum separated and purified**; four labelled steps joined by arrows.',
  sol: 'Serum, from an immunised animal; acts at once; no memory cells; flow diagram.',
  scheme: [['Serum', 1], ['From an immunised animal', 1], ['Acts at once', 1], ['Vaccine is slow', 1], ['Ready-made antibodies fade', 1], ['No memory cells', 1], ['Flow diagram drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1, 2],
}));
add('org-long', long({
  marks: 10, wl: null,
  stem: `After an earthquake, a relief team of the Red Cross gives ${RELIEF.blankets} blankets to each of ${RELIEF.families} families. A health agency of the United Nations sends experts to check the drinking water and to prevent an outbreak of disease.\n\n(a) Calculate the number of blankets needed. [2]\n\n(b) State two other activities of the Red Cross. [2]\n\n(c) Name the agency of the United Nations and state three of its major activities. [3]\n\n(d) Draw the emblem of the Red Cross and label the colour of the cross and the colour of the background. [3]`,
  model: `**(a)** ${RELIEF.families} × ${RELIEF.blankets} = **${RELIEF_BLANKETS} blankets**.\n\n**(b)** **First aid and ambulance service**, **blood donation camps and blood banks**, training in first aid (any two).\n\n**(c)** The **World Health Organization (WHO)**. It **fights communicable diseases** (immunisation drives), **responds to epidemics**, does **research**, sets **standards** for medicines and food, **trains health workers** (any three).\n\n**(d)** A **red cross** on a **white background**, with both colours labelled.`,
  sol: `${RELIEF_BLANKETS} blankets; two Red Cross activities; WHO and three activities; emblem.`,
  scheme: [['Working', 1], [`${RELIEF_BLANKETS}`, 1], ['First activity', 1], ['Second activity', 1], ['WHO named', 1], ['Two activities', 1], ['Third activity', 1], ['Emblem drawn', 1], ['Colour of cross and of background', 2]],
  d: 3, c: 'application', t: [5],
}), () => RELIEF_BLANKETS === 960 || 'relief');
