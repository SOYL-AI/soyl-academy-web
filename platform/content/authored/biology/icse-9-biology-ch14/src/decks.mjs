// ICSE 9 Biology ch14 Aids to Health and Health Organisations — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { VACC, DEFENCE, LINING } from './svgs.mjs';
import { PEAK1, PEAK1_DAY, PEAK2, PEAK2_DAY, PEAK_RATIO, TIME1, TIME2, BOOSTER_DAY, COURSE, COURSE_ALL, COURSE_TAKEN, COURSE_LEFT, COURSE_LEFT_PCT, MIX, MIX_TOTAL, MIX_PCT, BREATH, BREATH_PASS, BREATH_PCT } from './calc.mjs';

export const V = {
  vacc: svgV(VACC, 'Graph of antibody level after a first dose of a vaccine and after a booster dose, which gives a faster and higher rise'),
  defence: svgV(DEFENCE, 'Outline of the body showing tears, nose hairs and mucus, saliva, mucus in the windpipe, stomach acid and skin as first-line defences'),
  lining: svgV(LINING, 'Section of the lining of the windpipe with cilia sweeping mucus that holds trapped dust and germs'),
};

export const deck1 = deck({
  part: 1,
  title: 'Aids to Health — Part 1: Vaccines, antitoxins, serums and antibiotics',
  goals: [
    'Explain how a vaccine produces immunity and distinguish vaccination from immunisation',
    'Explain when an antitoxin or serum is given instead of a vaccine',
    'State what antibiotics act against and why they must be used carefully',
  ],
  slides: [
    sl('title', 'Aids to Health', {
      b: 'Part 1 — medicines and injections that protect us from germs.',
      v: flow('LR', [['g', 'Germs enter'], ['a', 'Body makes antibodies'], ['m', 'Memory remains']], [['g', 'a'], ['a', 'm']], 'Flow from germs entering the body to antibodies being made and a memory remaining'),
      n: 'Our body can fight germs on its own, and we can help it. Vaccines train the body before the germs arrive. Serums give ready-made help in an emergency. Antibiotics kill bacteria. In this part we learn when each one is used.',
    }),
    sl('concept', 'How the body fights a germ', {
      v: table(['Term', 'Meaning'], [['Antigen', 'A germ, or part of a germ, that the body treats as foreign'], ['Antibody', 'A protein made by white blood cells that fights one kind of germ'], ['Memory cells', 'White blood cells that remember a germ, so that the next attack is met quickly'], ['Immunity', 'Resistance of the body to a disease']], 'Table of the terms antigen, antibody, memory cells and immunity with their meanings'),
      n: 'When a germ enters the body, white blood cells make antibodies against it. Some of these cells remain as memory cells. If the same germ comes again, the body answers quickly. This resistance is called immunity.',
    }),
    sl('concept', 'What a vaccine is', {
      v: table(['A vaccine may contain', 'Why it is safe'], [['Weakened living germs', 'Too weak to cause the disease'], ['Killed germs', 'Dead, so they cannot multiply'], ['A harmless form of a poison made by the germ', 'It cannot poison, but the body still makes antibodies'], ['A harmless part of the germ', 'It cannot cause the disease']], 'Table of the kinds of material in a vaccine and why each is safe'),
      n: 'A vaccine is made from weakened germs, killed germs, a harmless form of a germ poison or a harmless part of a germ. It cannot cause the disease, yet it makes the body produce antibodies and memory cells. So the body is ready before the real germ comes.',
    }),
    sl('diagram', 'Antibodies after a first dose and a booster', {
      b: 'A second dose, a **booster**, gives a faster and higher response.',
      v: V.vacc,
      n: 'This graph shows antibody level. After the first dose the level rises slowly and stays low. After the booster dose it rises much sooner and much higher, because the memory cells remember the vaccine.',
    }),
    sl('check', 'Quick check: what a vaccine does', {
      b: 'A vaccine protects a person because it makes the body produce',
      chk: 'chk-vaccine',
      n: 'The body prepares before the real germ arrives.',
    }),
    sl('concept', 'Vaccination and immunisation', {
      v: table(['', 'Vaccination', 'Immunisation'], [['Meaning', 'Giving a vaccine to a person, by injection or by drops in the mouth', 'The process by which a person becomes immune to a disease'], ['What it is', 'The method', 'The result, or the whole process'], ['Is a vaccine always used?', 'Yes, it is the giving of a vaccine', 'No; immunity may also come from ready-made antibodies or from having the disease'], ['Example', 'A child is given drops against polio', 'The child is now protected against polio']], 'Table distinguishing vaccination from immunisation by meaning, nature, use of a vaccine and example'),
      n: 'Vaccination means giving a vaccine. Immunisation is the process by which the person becomes immune. Vaccination is the method, and immunisation is the result. A person can also become immune by being given ready-made antibodies.',
    }),
    sl('example', 'Worked example 1: reading the booster graph', {
      b: `First dose on day 0, booster on day ${BOOSTER_DAY}. The highest level after the first dose is ${PEAK1} on day ${PEAK1_DAY}; after the booster it is ${PEAK2} on day ${PEAK2_DAY}. How many times higher is the second peak, and how many times sooner was it reached?`,
      ul: [`Step 1: height ratio = ${PEAK2} ÷ ${PEAK1} = **${PEAK_RATIO}** times higher.`, `Step 2: time to first peak = ${TIME1} days; time to second peak = ${PEAK2_DAY} − ${BOOSTER_DAY} = **${TIME2}** days.`, `Step 3: ${TIME1} ÷ ${TIME2} = **2** times sooner. The memory cells made the faster, stronger response.`],
      v: table(['', 'First dose', 'Booster'], [['Highest level', String(PEAK1), String(PEAK2)], ['Days to reach it', String(TIME1), String(TIME2)]], 'Worked table comparing the highest antibody level and the days taken after the first dose and the booster'),
      n: 'Divide the second peak by the first. Seventy-two divided by eight is nine, so nine times higher. The first peak took fourteen days. The second took only seven days after the booster, which is twice as fast. Memory cells explain both.',
    }),
    sl('concept', 'Diseases for which vaccines are given', {
      v: table(['Disease', 'Cause', 'Note'], [['Tuberculosis', 'Bacterium', 'A vaccine is given to infants'], ['Polio', 'Virus', 'Given as drops in the mouth or by injection'], ['Measles', 'Virus', 'Given in childhood'], ['Diphtheria, whooping cough and tetanus', 'Bacteria', 'Often given together in one injection'], ['Hepatitis B', 'Virus', 'Given in infancy']], 'Table of diseases for which vaccines are given, with cause and note'),
      n: 'Vaccines are given against many diseases. These include tuberculosis, polio, measles, hepatitis B, and diphtheria, whooping cough and tetanus together. The exact schedule of doses is decided by health authorities and is updated from time to time.',
    }),
    sl('concept', 'Antitoxins and serums', {
      v: table(['', 'Antitoxin', 'Serum'], [['What it is', 'An antibody that neutralises a poison made by germs', 'The clear part of blood holding ready-made antibodies'], ['Where it comes from', 'From an immunised animal or person', 'From an immunised animal, often a horse, or from a recovered person'], ['When it is used', 'To treat diphtheria or tetanus after the poison is already at work', 'When quick help is needed, or for a bite or sting, or after exposure'], ['How long it protects', 'A short time, because the body made no antibodies of its own', 'A short time']], 'Table comparing antitoxin and serum by what they are, source, use and length of protection'),
      n: 'An antitoxin neutralises the poison made by germs. A serum is the part of blood with ready-made antibodies, often taken from an immunised horse. They work at once, but only for a short time, because the person has not made antibodies himself.',
    }),
    sl('check', 'Quick check: ready-made help', {
      b: 'A person who has already been exposed to dangerous germs needs protection at once. The best choice is',
      chk: 'chk-serum',
      n: 'A vaccine needs days to work.',
    }),
    sl('concept', 'Why a serum, not a vaccine, in an emergency', {
      v: table(['', 'Vaccine', 'Serum or antitoxin'], [['Gives', 'The germ, made harmless', 'Ready-made antibodies'], ['Body makes antibodies?', 'Yes', 'No'], ['Speed', 'Slow: days or weeks', 'Immediate'], ['Memory cells?', 'Yes', 'No'], ['Protection lasts', 'Long', 'Short'], ['Best used', 'Before exposure', 'After exposure or in an emergency']], 'Table comparing a vaccine with a serum or antitoxin by speed, antibodies, memory and best use'),
      n: 'A vaccine makes the body build its own antibodies, which takes days or weeks, but the protection lasts long. A serum gives antibodies at once but they fade soon. So a vaccine is for prevention and a serum is for an emergency.',
    }),
    sl('concept', 'Antibiotics', {
      v: table(['Point', 'Detail'], [['What they are', 'Chemicals made by living things such as moulds and bacteria, now also made in factories'], ['They act against', 'Bacteria; they do not act on viruses'], ['Examples', 'Penicillin, streptomycin, tetracycline'], ['Use carefully', 'Only on a doctor\'s advice, in the right dose, for the full course'], ['Misuse', 'Bacteria become resistant; useful bacteria in the gut are killed; some people are allergic']], 'Table of what antibiotics are, what they act against, examples and care in their use'),
      n: 'Antibiotics kill bacteria or stop them from growing. They do not act on viruses, so they do not help against a cold. They should be taken only on a doctor\'s advice and for the full course. Misuse makes bacteria resistant.',
    }),
    sl('example', 'Worked example 2: stopping the course too early', {
      b: `A doctor prescribes ${COURSE.perDay} tablets a day for ${COURSE.days} days. The patient feels better and stops after ${COURSE.stopAfter} days. What percentage of the course is left untaken?`,
      ul: [`Step 1: full course = ${COURSE.perDay} × ${COURSE.days} = **${COURSE_ALL}** tablets.`, `Step 2: taken = ${COURSE.perDay} × ${COURSE.stopAfter} = ${COURSE_TAKEN}; left = ${COURSE_ALL} − ${COURSE_TAKEN} = **${COURSE_LEFT}**.`, `Step 3: left = ${COURSE_LEFT} ÷ ${COURSE_ALL} × 100 = **${COURSE_LEFT_PCT} per cent**. Some bacteria may survive and become resistant.`],
      v: table(['Quantity', 'Value'], [['Tablets in the full course', String(COURSE_ALL)], ['Tablets taken', String(COURSE_TAKEN)], ['Tablets left', String(COURSE_LEFT)], ['Left (per cent)', String(COURSE_LEFT_PCT)]], 'Worked table: thirty tablets in the course, twelve taken, eighteen left, sixty per cent'),
      n: 'The full course is three tablets a day for ten days, which is thirty tablets. After four days the patient has taken twelve, so eighteen are left. That is sixty per cent of the course. The bacteria that survive may become resistant.',
    }),
    sl('check', 'Quick check: what antibiotics act on', {
      b: 'Antibiotics are useful against diseases caused by',
      chk: 'chk-antibiotic',
      n: 'A cold and influenza are not in this group.',
    }),
    sl('summary', 'Summary', {
      ul: ['Vaccine: harmless germ material; the body makes antibodies and memory cells; long protection.', 'Vaccination is giving the vaccine; immunisation is becoming immune.', 'Antitoxin and serum: ready-made help for an emergency; short protection.', 'Antibiotics act on bacteria, not viruses; take the full course on a doctor\'s advice.'],
      v: table(['Aid', 'Acts', 'Protection'], [['Vaccine', 'Before exposure', 'Long'], ['Serum or antitoxin', 'After exposure', 'Short'], ['Antibiotic', 'Treats bacterial disease', 'Treatment only']], 'Summary table of vaccine, serum or antitoxin and antibiotic by when they act and how long they protect'),
      n: 'To recap. A vaccine trains the body and gives long protection. Vaccination is the giving, and immunisation is becoming immune. Serums and antitoxins give ready-made help for a short time. Antibiotics act on bacteria and must be taken for the full course.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Say that a vaccine makes the body **produce its own antibodies** and **memory cells**.', 'Say that a **serum gives ready-made antibodies**, so it works **at once** but only **for a short time**.', 'Do not write that antibiotics act on **viruses**.', 'Give a **reason** for finishing the course: surviving bacteria may become **resistant**.'],
      n: 'Exam tips. For a vaccine, say that the body makes its own antibodies and memory cells. For a serum, say that the antibodies are ready-made, so it acts at once but only for a short time. Antibiotics do not act on viruses. Finish the course to avoid resistance.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Aids to Health — Part 2: Antiseptics, disinfectants, local defences and health organisations',
  goals: [
    'Distinguish antiseptics from disinfectants with examples',
    'Describe the first-line defences of the body and their merits',
    'List the major activities of the Red Cross and the World Health Organization',
  ],
  slides: [
    sl('title', 'Keeping Germs Out', {
      b: 'Part 2 — chemicals that clean, the body\'s own defences, and organisations that look after health.',
      v: flow('LR', [['c', 'Chemicals: antiseptics and disinfectants'], ['b', 'Body: first-line defences'], ['o', 'Organisations: Red Cross and WHO']], [['c', 'b'], ['b', 'o']], 'Flow from chemicals through the body defences to health organisations'),
      n: 'Besides vaccines and antibiotics, we use chemicals to destroy germs outside the body. Our body also has its own defences that work all the time. Finally, we look at two organisations that work for health around the world.',
    }),
    sl('concept', 'Antiseptics', {
      v: table(['Point', 'Detail'], [['What they are', 'Mild chemicals that kill germs or stop them from growing'], ['Used on', 'Living tissue: cuts, wounds, skin and hands'], ['Why mild', 'A strong chemical would damage the living cells'], ['Examples', 'Dilute hydrogen peroxide, tincture of iodine, boric acid, antiseptic creams and soaps']], 'Table of what antiseptics are, where they are used, why they are mild and examples'),
      n: 'Antiseptics are mild chemicals that kill germs or stop them growing. They are used on living tissue such as cuts, wounds and hands. They must be mild, or they would harm living cells. Dilute hydrogen peroxide and boric acid are examples.',
    }),
    sl('concept', 'Disinfectants', {
      v: table(['Point', 'Detail'], [['What they are', 'Strong chemicals that kill germs'], ['Used on', 'Non-living things: floors, drains, toilets, clothes and instruments'], ['Why not on skin', 'They are strong enough to harm living cells'], ['Examples', 'Phenyl floor cleaner, bleaching powder, formalin, chlorine tablets in water']], 'Table of what disinfectants are, where they are used, why not on skin and examples'),
      n: 'Disinfectants are strong chemicals that kill germs on things that are not alive, such as floors, drains and instruments. They are too strong to be used on the skin. Phenyl, bleaching powder and chlorine are examples.',
    }),
    sl('concept', 'Antiseptic, disinfectant and antibiotic compared', {
      v: table(['', 'Antiseptic', 'Disinfectant', 'Antibiotic'], [['Used on', 'Living tissue outside the body', 'Non-living things', 'Inside the body'], ['Strength', 'Mild', 'Strong', 'Prescribed dose'], ['Acts on', 'Many germs', 'Many germs', 'Bacteria only'], ['Example', 'Boric acid', 'Bleaching powder', 'Penicillin']], 'Table comparing antiseptic, disinfectant and antibiotic by use, strength, action and example'),
      n: 'An antiseptic is mild and used on living tissue outside the body. A disinfectant is strong and used on things that are not alive. An antibiotic is taken inside the body and acts on bacteria. Each has its own place.',
    }),
    sl('check', 'Quick check: for a floor', {
      b: 'A chemical that is strong enough to clean a hospital floor but would harm the skin is a',
      chk: 'chk-disinfectant',
      n: 'It is used on things that are not alive.',
    }),
    sl('example', 'Worked example 1: making an antiseptic solution', {
      b: `A nurse mixes ${MIX.conc} mL of an antiseptic concentrate with ${MIX.water} mL of clean water. What is the volume of the solution and its strength in per cent?`,
      ul: [`Step 1: volume = ${MIX.conc} + ${MIX.water} = **${MIX_TOTAL} mL**.`, `Step 2: strength = ${MIX.conc} ÷ ${MIX_TOTAL} × 100 = **${MIX_PCT} per cent**.`, 'Step 3: diluting makes it **mild enough** for living tissue.'],
      v: table(['Quantity', 'Value'], [['Concentrate (mL)', String(MIX.conc)], ['Water (mL)', String(MIX.water)], ['Solution (mL)', String(MIX_TOTAL)], ['Strength (per cent)', String(MIX_PCT)]], 'Worked table: twenty millilitres of concentrate in two hundred millilitres gives a ten per cent solution'),
      n: 'Add the two volumes. Twenty plus one hundred eighty gives two hundred millilitres. The concentrate is twenty out of two hundred, which is ten per cent. Dilution makes the solution mild enough to use on a wound.',
    }),
    sl('diagram', 'The first line of defence', {
      b: 'Many barriers keep germs out before any medicine is needed.',
      v: V.defence,
      n: 'The body has barriers all over. The skin is a tough covering. Tears and saliva wash the eyes and mouth. The nose and windpipe trap germs in mucus. Acid in the stomach kills many germs that are swallowed.',
    }),
    sl('concept', 'First-line defences of the body', {
      v: table(['Defence', 'How it works'], [['Skin', 'The horny layer is a tough barrier; oil and sweat make the surface unfriendly to germs'], ['Mucus and hairs in the nose', 'Trap dust and germs before they reach the lungs'], ['Cilia in the windpipe', 'Hair-like structures that sweep mucus with trapped germs up to the throat'], ['Tears and saliva', 'Wash the surface and hold an enzyme that kills many bacteria'], ['Acid in the stomach', 'Kills most germs that are swallowed with food and water'], ['Sneezing and coughing', 'Blow out germs and dust']], 'Table of the first-line defences of the body and how each works'),
      n: 'The skin is a barrier. Mucus and hairs in the nose trap dust and germs. Cilia in the windpipe sweep the mucus upward. Tears and saliva wash and kill bacteria. Stomach acid kills germs that are swallowed. Sneezing and coughing blow them out.',
    }),
    sl('diagram', 'The lining of the windpipe', {
      b: 'Mucus catches germs, and the **cilia** sweep it upward.',
      v: V.lining,
      n: 'The lining of the windpipe has cells with tiny hairs called cilia. A layer of sticky mucus covers them and traps dust and germs. The cilia beat together and sweep the mucus up towards the throat, where it is swallowed or coughed out.',
    }),
    sl('check', 'Quick check: the sweeping hairs', {
      b: 'In the windpipe, the tiny hair-like structures that sweep mucus upward are called',
      chk: 'chk-cilia',
      n: 'They beat together in one direction.',
    }),
    sl('example', 'Worked example 2: how many germs get past the nose?', {
      b: `Of ${BREATH.in} dust particles and germs breathed in, the mucus in the nose traps ${BREATH.trapped}. How many get past, and what percentage is trapped?`,
      ul: [`Step 1: past the nose = ${BREATH.in} − ${BREATH.trapped} = **${BREATH_PASS}**.`, `Step 2: trapped = ${BREATH.trapped} ÷ ${BREATH.in} × 100 = **${BREATH_PCT} per cent**.`, 'Step 3: the windpipe traps many of the rest, so very few reach the lungs.'],
      v: table(['Quantity', 'Value'], [['Breathed in', String(BREATH.in)], ['Trapped in the nose', String(BREATH.trapped)], ['Get past the nose', String(BREATH_PASS)], ['Trapped (per cent)', String(BREATH_PCT)]], 'Worked table: of one thousand particles, nine hundred fifty are trapped in the nose, which is ninety-five per cent'),
      n: 'One thousand minus nine hundred fifty leaves fifty particles that get past the nose. The nose traps nine hundred fifty out of one thousand, which is ninety-five per cent. The windpipe then traps many of the remaining fifty.',
    }),
    sl('concept', 'Merits of the body\'s local defences', {
      v: table(['Merit', 'Meaning'], [['Immediate', 'They are always in place and act at once'], ['General', 'They act against all kinds of germs, not one kind only'], ['Natural', 'No injection or medicine is needed'], ['Protective', 'They stop most germs from getting in at all']], 'Table of the merits of the first-line defences of the body'),
      n: 'The first-line defences are always ready, so they act at once. They work against all kinds of germs, not just one. They need no medicine. And they stop most germs from ever getting inside the body.',
    }),
    sl('concept', 'The Red Cross', {
      v: table(['Point', 'Detail'], [['Founder', 'Henry Dunant, who started the movement in the year eighteen sixty-three'], ['Emblem', 'A red cross on a white background'], ['Aim', 'To protect life and health and to relieve suffering without taking sides'], ['Major activities', 'First aid and ambulance work; relief in wars, floods and earthquakes; blood donation camps and blood banks; health and first-aid training; care of the injured and prisoners of war']], 'Table of the founder, emblem, aim and major activities of the Red Cross'),
      n: 'The Red Cross was started by Henry Dunant. Its emblem is a red cross on a white background. It gives first aid, ambulance service and relief in wars and disasters. It runs blood donation camps and trains people in first aid.',
    }),
    sl('concept', 'The World Health Organization', {
      v: table(['Point', 'Detail'], [['What it is', 'The health agency of the United Nations, with its headquarters in Geneva'], ['Founded', 'Nineteen forty-eight; its day, World Health Day, is on the seventh of April'], ['Aim', 'The highest possible level of health for all people'], ['Major activities', 'Fighting communicable diseases and immunisation drives; responding to epidemics; research and sharing of health information; setting standards for medicines and food; training health workers; promoting clean water, sanitation and nutrition']], 'Table of what the World Health Organization is, when it was founded, its aim and major activities'),
      n: 'The World Health Organization is the health agency of the United Nations, based in Geneva. It was founded in nineteen forty-eight. It fights communicable diseases, runs immunisation drives, responds to epidemics, and shares research. It also promotes clean water and good nutrition.',
    }),
    sl('check', 'Quick check: a world body', {
      b: 'The United Nations agency that works for the highest possible level of health for all people is the',
      chk: 'chk-who',
      n: 'Its headquarters are in Geneva.',
    }),
    sl('summary', 'Summary', {
      ul: ['Antiseptics are mild and used on living tissue; disinfectants are strong and used on non-living things.', 'First-line defences: skin, mucus, cilia, tears, saliva, stomach acid.', 'Their merits: immediate, general, natural and protective.', 'Red Cross: relief, first aid and blood banks. WHO: fights disease and sets standards.'],
      v: table(['Topic', 'Key point'], [['Antiseptic', 'Mild, on living tissue'], ['Disinfectant', 'Strong, on non-living things'], ['Local defence', 'Skin, mucus, cilia, tears, saliva, stomach acid'], ['Red Cross and WHO', 'Relief and first aid; world health and standards']], 'Summary table of antiseptics, disinfectants, local defences, the Red Cross and the World Health Organization'),
      n: 'To recap. Antiseptics are mild and used on living tissue. Disinfectants are strong and used on things that are not alive. The first-line defences are the skin, mucus, cilia, tears, saliva and stomach acid. The Red Cross gives relief, and the World Health Organization works for health worldwide.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give **use on living tissue** for antiseptics and **use on non-living things** for disinfectants, with one example each.', 'For each defence, write **where** it is and **what it does**.', 'Learn **two or three activities** of the Red Cross and of the WHO, and do not mix them.', 'Where a date or programme is asked, give only well-known facts.'],
      n: 'Exam tips. For antiseptics say living tissue and for disinfectants say non-living things, with an example each. For every defence say where it is and what it does. Learn two or three activities for each organisation and do not mix them up.',
    }),
  ],
});
