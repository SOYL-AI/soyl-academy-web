// ICSE 9 Biology ch14 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T), });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Aids to Health and Health Organisations — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Vaccination and immunisation',
      `**How the body fights a germ.** A germ, or a part of it, that the body treats as foreign is an **antigen**. White blood cells make **antibodies** against it. Some of these cells stay as **memory cells**, so that a second attack is met faster and more strongly. Resistance to a disease is called **immunity**.

**A vaccine** is a preparation that makes the body produce antibodies and memory cells **without causing the disease**. It may contain:
- **weakened** living germs,
- **killed** germs,
- a harmless form of a **poison (toxin)** made by the germ, or
- a harmless **part** of the germ.

A **booster dose** (a later second dose) works faster and gives a much higher antibody level because of the memory cells (see the graph).

| | **Vaccination** | **Immunisation** |
|---|---|---|
| Meaning | **Giving** a vaccine (by injection or drops) | The **process of becoming immune** to a disease |
| Nature | The method | The result (or the whole process) |
| Vaccine always used? | Yes | No: immunity can also come from ready-made antibodies |

Vaccines are given against tuberculosis, polio, measles, diphtheria, whooping cough, tetanus and hepatitis B, among others. Vaccines **prevent** disease; they give **active** immunity that lasts long. The exact schedule of doses is decided by health authorities and is revised from time to time (as of 2026); schedules are not part of this syllabus.

Textbooks sometimes use the two words "vaccination" and "immunisation" almost as one; for an examination, give the distinction above.`,
      [kt('Vaccine', 'A preparation that makes the body make antibodies without causing the disease.'), kt('Antibody', 'A protein made by white blood cells that fights one kind of germ.'), kt('Booster dose', 'A later dose of a vaccine that gives a faster and higher response.'), kt('Immunisation', 'The process by which a person becomes immune to a disease.')],
      V.vacc,
      [1],
    ),
    sec(
      '2. Antitoxins, serums and antibiotics',
      `**Antitoxin:** an antibody that **neutralises a poison (toxin)** made by germs, for example in diphtheria or tetanus. **Serum:** the clear part of blood that holds **ready-made antibodies**, taken from an immunised animal (often a horse) or from a person who has recovered. Serums are also used for animal bites and stings.

**Why a serum instead of a vaccine?** A vaccine makes the body build its own antibodies, which takes days or weeks. A person who has already been exposed, or who is already ill and needs help at once, is given ready-made antibodies.

| | **Vaccine** | **Serum or antitoxin** |
|---|---|---|
| Gives | The germ made harmless | Ready-made antibodies |
| Body makes antibodies? | Yes | No |
| Speed | Slow | Immediate |
| Memory cells | Yes | No |
| Protection | Long | Short |
| Best used | Before exposure | After exposure, or in an emergency |

**Antibiotics** are chemicals made by living things such as moulds and bacteria (many are now made in factories) that **kill bacteria or stop their growth**. Examples: penicillin, streptomycin, tetracycline. They **do not act on viruses**, so they do not help against a cold, influenza or chicken pox.

**Use carefully:** only on a doctor's advice, in the correct dose, and for the **full course**. Misuse allows bacteria to become **resistant**, kills useful bacteria in the gut and may cause allergies.`,
      [kt('Antitoxin', 'An antibody that neutralises a toxin made by germs.'), kt('Serum', 'The part of blood that holds ready-made antibodies.'), kt('Antibiotic', 'A chemical that kills bacteria or stops their growth.'), kt('Resistance (of bacteria)', 'The ability of bacteria to survive an antibiotic.')],
      null,
      [2],
    ),
    sec(
      '3. Antiseptics and disinfectants',
      `| | **Antiseptic** | **Disinfectant** |
|---|---|---|
| Strength | **Mild** | **Strong** |
| Used on | **Living tissue**: cuts, wounds, skin, hands | **Non-living things**: floors, drains, toilets, instruments, clothes |
| Why | Must not damage living cells | Too strong for living tissue |
| Examples | Dilute hydrogen peroxide, tincture of iodine, boric acid, antiseptic soaps and creams | Phenyl floor cleaner, bleaching powder, formalin, chlorine tablets |

The same chemical may act as an antiseptic when **dilute** and as a disinfectant when **strong**; this is why the dilution matters. Antiseptics and disinfectants are used **outside** the body and act on many kinds of germs. **Antibiotics** are taken **inside** the body and act on bacteria only.`,
      [kt('Antiseptic', 'A mild chemical that kills germs or stops their growth and is safe on living tissue.'), kt('Disinfectant', 'A strong chemical used to kill germs on non-living things.')],
      null,
      [3],
    ),
    sec(
      '4. The body\'s local defence system and its merits',
      `The first line of defence stops germs from getting in.

| Defence | How it works |
|---|---|
| **Skin** | The horny layer is a tough, waterproof barrier; oil and sweat make the surface unfriendly to germs |
| **Mucus and hairs in the nose** | Trap dust and germs before they reach the lungs |
| **Cilia in the windpipe** | Hair-like structures that sweep mucus with trapped germs up to the throat, where it is swallowed or coughed out |
| **Tears and saliva** | Wash the surface and contain an enzyme that kills many bacteria |
| **Acid in the stomach** | Kills most germs swallowed with food and water |
| **Sneezing and coughing** | Blow out germs and dust |

**Merits:** the defences are **immediate** (always in place), **general** (they act against all kinds of germs), **natural** (no injection or medicine) and **protective** (they stop most germs from entering at all). Germs that pass these barriers are met by white blood cells and antibodies (the second line, not part of this chapter).`,
      [kt('Mucus', 'A sticky fluid that traps dust and germs.'), kt('Cilia', 'Tiny hair-like structures that beat to sweep mucus along.'), kt('First line of defence', 'The barriers that keep germs out of the body.')],
      V.defence,
      [4],
      [V.lining],
    ),
    sec(
      '5. Health organisations: the Red Cross and the WHO',
      `**The Red Cross** (a world-wide movement; in India, the Indian Red Cross Society)
- Started by **Henry Dunant** after he saw the suffering of wounded soldiers in a battle; the movement began in **1863**.
- Emblem: a **red cross on a white background**.
- Aim: to protect life and health and to relieve suffering, without taking sides.
- **Major activities:** first aid and ambulance service; relief to the victims of wars, floods, earthquakes and other disasters (food, shelter, blankets, medical care); **blood donation camps and blood banks**; training in first aid, nursing and health; care of the wounded and of prisoners of war; helping to trace missing family members.

**The World Health Organization (WHO)**
- The **health agency of the United Nations**, with its headquarters in **Geneva**; founded in **1948** (World Health Day is on 7 April).
- Aim: the **highest possible level of health for all people**.
- **Major activities:** fighting communicable diseases and running immunisation drives (it announced the worldwide end of smallpox in 1980); responding to epidemics; **research** and sharing health information; setting **standards** for medicines and food; **training** health workers; promoting clean water, sanitation, nutrition and mother and child health.

Details of current programmes, the number of member countries and the policies of both bodies change with time; only stable points are in this chapter (as of 2026).`,
      [kt('Red Cross', 'A movement that gives relief, first aid and care in wars and disasters.'), kt('WHO', 'The World Health Organization, the health agency of the United Nations.')],
      null,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that a vaccine gives **ready-made antibodies**; that is a **serum**.
- Saying antibiotics cure **viral** diseases such as a cold or influenza.
- Confusing **antiseptic** (mild, living tissue) with **disinfectant** (strong, non-living things).
- Leaving out **memory cells** when explaining how a vaccine gives long protection.
- Mixing up the activities of the **Red Cross** (relief, first aid, blood banks) and the **WHO** (disease control, standards, research).

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two points, one use and one example, or a difference.
- 3 marks: a three-row comparison, three defences with their role, or three activities.
- 10-mark structured question: a short situation or diagram with parts of 2 to 4 marks; one part is a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is an antibody?', 'A protein made by white blood cells that fights one kind of germ.', 'definition', 1),
    fc(2, 'What are memory cells?', 'White blood cells that remember a germ so that the next attack is met quickly.', 'definition', 1),
    fc(3, 'What is a vaccine?', 'A preparation that makes the body make antibodies without causing the disease.', 'definition', 1),
    fc(4, 'Four kinds of material in vaccines?', 'Weakened germs, killed germs, harmless toxin, harmless part of a germ.', 'fact', 1),
    fc(5, 'What is a booster dose?', 'A later dose of a vaccine that gives a faster and higher response.', 'definition', 1),
    fc(6, 'Vaccination?', 'The giving of a vaccine to a person.', 'definition', 1),
    fc(7, 'Immunisation?', 'The process by which a person becomes immune to a disease.', 'definition', 1),
    fc(8, 'Does a vaccine give long or short protection?', 'Long, because memory cells are formed.', 'fact', 1),
    fc(9, 'Name two diseases for which vaccines are given.', 'Tuberculosis, polio, measles, hepatitis B, tetanus (any two).', 'fact', 1),
    fc(10, 'What is an antitoxin?', 'An antibody that neutralises a toxin made by germs.', 'definition', 2),
    fc(11, 'What is a serum?', 'The part of blood that holds ready-made antibodies.', 'definition', 2),
    fc(12, 'Where does a serum often come from?', 'An immunised animal such as a horse, or a recovered person.', 'fact', 2),
    fc(13, 'Why is a serum used instead of a vaccine in an emergency?', 'It gives ready-made antibodies at once; a vaccine takes days or weeks.', 'concept', 2),
    fc(14, 'How long does a serum protect?', 'Only a short time; the body makes no memory cells.', 'fact', 2),
    fc(15, 'What are antibiotics?', 'Chemicals that kill bacteria or stop their growth.', 'definition', 2),
    fc(16, 'Name two antibiotics.', 'Penicillin, streptomycin, tetracycline (any two).', 'fact', 2),
    fc(17, 'Do antibiotics act on viruses?', 'No, only on bacteria.', 'fact', 2),
    fc(18, 'Why take the full course of an antibiotic?', 'Surviving bacteria may become resistant.', 'concept', 2),
    fc(19, 'Two harms of misusing antibiotics?', 'Bacteria become resistant; useful gut bacteria are killed; allergy.', 'concept', 2),
    fc(20, 'What is an antiseptic?', 'A mild chemical used on living tissue to kill germs.', 'definition', 3),
    fc(21, 'What is a disinfectant?', 'A strong chemical used on non-living things to kill germs.', 'definition', 3),
    fc(22, 'Two examples of antiseptics?', 'Dilute hydrogen peroxide, tincture of iodine, boric acid (any two).', 'fact', 3),
    fc(23, 'Two examples of disinfectants?', 'Phenyl, bleaching powder, formalin, chlorine (any two).', 'fact', 3),
    fc(24, 'Why is a disinfectant not used on the skin?', 'It is strong enough to harm living cells.', 'concept', 3),
    fc(25, 'Name three first-line defences of the body.', 'Skin, mucus in the nose, tears (also saliva, stomach acid, cilia).', 'fact', 4),
    fc(26, 'What do cilia in the windpipe do?', 'Sweep mucus with trapped germs up to the throat.', 'fact', 4),
    fc(27, 'What kills germs swallowed with food?', 'The acid in the stomach.', 'fact', 4),
    fc(28, 'Two merits of the body\'s local defences?', 'They act at once and against all kinds of germs.', 'concept', 4),
    fc(29, 'Three activities of the Red Cross?', 'First aid and ambulance, disaster relief, blood banks (also training).', 'fact', 5),
    fc(30, 'Three activities of the WHO?', 'Fights communicable diseases, immunisation drives, research and standards.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
