// ICSE 9 Biology ch13 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Diseases and their Transmission — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Communicable and non-communicable diseases; how diseases occur',
      `A **disease** is a condition in which the body or a part of it does not work properly. Diseases are of two broad kinds.

| | **Communicable** | **Non-communicable** |
|---|---|---|
| Cause | A **pathogen** (bacterium, virus, protozoan, worm) | Not a pathogen: poor diet or lifestyle, deficiency, heredity, ageing |
| Spread | Passes from a sick person or animal to a healthy one | **Cannot** be caught from another person |
| Examples | Cholera, typhoid, tuberculosis, AIDS, malaria | Diabetes, scurvy, cancer, heart disease |

**How a disease occurs in a population**
- **Endemic**: always present in a particular area or population.
- **Epidemic**: a sudden rise in the number of cases in an area, in a short time.
- **Pandemic**: an epidemic that spreads over many countries or across the world.
- **Sporadic**: a few scattered cases at irregular times, with no common source.

Textbooks give different examples for these terms (for instance, which disease is called endemic in which place); what matters is the pattern, and an example should always agree with the meaning.`,
      [kt('Pathogen', 'An organism that causes disease.'), kt('Communicable disease', 'A disease that can spread from one living thing to another.'), kt('Epidemic', 'A sudden rise in the number of cases of a disease in an area.'), kt('Pandemic', 'An epidemic spread over many countries.')],
      null,
      [1],
    ),
    sec(
      '2. Modes of transmission: air, water and vectors',
      `Pathogens spread by four main routes.

| Route | How | Diseases in this chapter |
|---|---|---|
| **Air** | Tiny droplets from a cough or sneeze are breathed in | Tuberculosis, chicken pox |
| **Water and food** | Pathogens in unsafe water or uncovered food are swallowed | Cholera, typhoid, amoebic dysentery, hepatitis A, ascariasis |
| **Vectors** | An animal, usually an insect, carries the pathogen | Malaria, filariasis, sleeping sickness; flies and cockroaches for gut diseases |
| **Contact and body fluids** | Touch, blood, shared needles, sexual contact, mother to child | AIDS, hepatitis B, chicken pox (blisters) |

**Vectors**
- **Housefly:** feeds on waste; germs stick to its legs and body and are left on food.
- **Mosquito:** female **Anopheles** carries malaria; **Culex** carries filariasis. Mosquitoes breed in stagnant water.
- **Cockroach:** walks over waste, then over food and utensils.
- **Tsetse fly** carries sleeping sickness (parts of Africa).

**General control:** safe drinking water, covered food, hygienic disposal of waste, no standing water, cough hygiene and good ventilation.`,
      [kt('Vector', 'An animal that carries a pathogen from one host to another.'), kt('Droplet infection', 'Spread of a pathogen in tiny drops from a cough or sneeze.')],
      V.fly,
      [2],
    ),
    sec(
      '3. Bacterial diseases: cholera, typhoid and tuberculosis',
      `Scientific names of the pathogens are not required in this syllabus.

| | **Cholera** | **Typhoid** | **Tuberculosis** |
|---|---|---|---|
| Spread | Contaminated water and food; flies | Contaminated water and food; flies | Air, by droplets from a patient's cough |
| Symptoms | Sudden severe **watery diarrhoea**, vomiting, cramps, loss of body water (dehydration) | **Long-lasting fever** rising step by step, headache, weakness, stomach pain | **Cough lasting weeks**, sometimes with blood, chest pain, weight loss, evening fever, tiredness |
| Control | Boiled or chlorinated water, **oral rehydration**, clean food, safe disposal of waste, vaccine | Boiled water, hygiene, clean food, fly control, vaccine, antibiotics on a doctor's advice | Cover the mouth when coughing, ventilation, **vaccine** in childhood, a **full course** of the prescribed antibiotics |

In cholera the greatest danger is the loss of water and salts, so the patient is given a solution of salts and sugar in water (oral rehydration) while the doctor treats the infection. A tuberculosis patient must finish the whole course of medicine even after feeling better.

Vaccines against cholera and typhoid are used in some situations and their use is decided by health authorities (as of 2026); the safest general protection is safe water and clean food.`,
      [kt('Dehydration', 'Loss of too much water and salts from the body.'), kt('Oral rehydration', 'Giving water with salts and sugar by mouth to replace what is lost.')],
      null,
      [3],
    ),
    sec(
      '4. Viral diseases: AIDS, chicken pox and hepatitis',
      `| | **AIDS** | **Chicken pox** | **Hepatitis** |
|---|---|---|---|
| Pathogen | A virus that attacks the **white blood cells** of the immune system | A virus | Viruses of several types (A, B and others) |
| Organ affected | The immune system | The skin | The **liver** |
| Spread | Unprotected sexual contact, infected blood, shared needles, mother to baby | Air droplets; touching the fluid in the blisters | Type A: contaminated food and water; type B: blood, needles, body fluids |
| Symptoms | Long fever, weight loss, swollen glands, long diarrhoea, repeated infections | Mild fever, then itchy red spots that become fluid-filled **blisters** and form scabs | Tiredness, loss of appetite, **jaundice** (yellow skin and eyes), dark urine |
| Control | Screened blood, new or sterilised needles, safe sexual practices, awareness | Isolate the patient, rest, hygiene, vaccine | Boiled water, clean food, vaccine, screened blood, sterile needles |

**AIDS does not spread** by hugging, handshakes, sharing food or utensils, toilets, coughs, sneezes or mosquito bites. The virus makes the body unable to fight other infections, and it is these infections that make the patient seriously ill. Medicines can keep the virus under control but there is no cure (as of 2026). **Antibiotics do not act on viruses.**`,
      [kt('AIDS', 'A disease in which a virus damages the immune system so that the body cannot fight infections.'), kt('Jaundice', 'Yellowing of the skin and eyes, a sign of liver disease.')],
      null,
      [4],
    ),
    sec(
      '5. Protozoan diseases: malaria, amoebic dysentery and sleeping sickness',
      `| | **Malaria** | **Amoebic dysentery** | **Sleeping sickness** |
|---|---|---|---|
| Pathogen | A protozoan that lives in the liver and red blood cells | A protozoan that lives in the large intestine | A protozoan that lives in the blood and later the brain |
| Spread | Bite of the **female Anopheles** mosquito | Food and water contaminated with the resting stage; flies | Bite of the **tsetse fly** (parts of Africa) |
| Symptoms | **Chills, then high fever and sweating** at regular intervals; headache; weakness; anaemia | **Diarrhoea with blood and mucus**, stomach cramps | Fever, headache, swollen glands, then constant sleepiness and confusion |
| Control | Drain stagnant water, oil or insecticide on breeding places, fish that eat larvae, nets, screens, repellents, early treatment | Boiled water, washed hands and vegetables, covered food, safe disposal of faeces, fly control, medicines | Control of tsetse flies, early treatment |

Malaria is not caught by touching a patient; the mosquito must first bite a patient and then a healthy person. The regular rise of fever is a clue that points to malaria.`,
      [kt('Protozoan', 'A single-celled organism, some of which cause disease.')],
      V.malaria,
      [5],
    ),
    sec(
      '6. Helminthic diseases: ascariasis, taeniasis and filariasis',
      `Helminths are parasitic worms.

| | **Ascariasis** | **Taeniasis** | **Filariasis** |
|---|---|---|---|
| Worm | **Roundworm**, in the small intestine | **Tapeworm**, in the intestine | **Thread-like** filarial worms in the lymph vessels |
| Spread | Eggs in soil, water and unwashed vegetables; dirty hands | Eating **undercooked** meat that holds the larval stage | Bite of the **Culex** mosquito |
| Symptoms | Stomach pain, vomiting, poor growth, anaemia, worms in the stool | Stomach discomfort, weight loss, pieces of worm in the stool | Fever, swelling of the legs and other parts (**elephantiasis**) |
| Control | Wash hands and vegetables, safe latrines, boiled water, medicine | Cook meat well, meat inspection, medicine | Remove stagnant water, nets, repellents, medicine |

Books differ on the finer points of symptoms; the pattern to remember is the route (mouth for the first two, mosquito for the last), the organ affected and a control that blocks the route.`,
      [kt('Helminth', 'A parasitic worm.'), kt('Elephantiasis', 'Great swelling of a limb caused by blocked lymph vessels in filariasis.')],
      null,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up **epidemic** (sudden, one area) and **pandemic** (many countries).
- Saying a **vector causes** the disease; it only **carries** the pathogen.
- Writing that **AIDS spreads by touch**, hugging, food or mosquitoes.
- Saying that **antibiotics** cure viral diseases such as chicken pox or hepatitis.
- Giving **scientific names** of pathogens (not required); naming the **vector** (female Anopheles, Culex, tsetse fly) is required.

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a give-reason item.
- 2 marks: two symptoms, or two control measures, or a vector and the disease.
- 3 marks: a three-row comparison, or symptoms, spread and control.
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
    fc(1, 'What is a pathogen?', 'An organism that causes disease.', 'definition', 1),
    fc(2, 'Communicable disease?', 'A disease caused by a pathogen that can spread from one living thing to another.', 'definition', 1),
    fc(3, 'Two non-communicable diseases?', 'Diabetes, scurvy, cancer, heart disease (any two).', 'fact', 1),
    fc(4, 'Endemic disease?', 'One that is always present in a particular area or population.', 'definition', 1),
    fc(5, 'Epidemic?', 'A sudden rise in the number of cases of a disease in an area.', 'definition', 1),
    fc(6, 'Pandemic?', 'An epidemic that spreads over many countries or across the world.', 'definition', 1),
    fc(7, 'Sporadic disease?', 'A few scattered cases at irregular times with no common source.', 'definition', 1),
    fc(8, 'Four routes of spread of pathogens?', 'Air, water and food, vectors, contact and body fluids.', 'fact', 2),
    fc(9, 'What is a vector?', 'An animal that carries a pathogen from one host to another.', 'definition', 2),
    fc(10, 'How does a housefly spread disease?', 'Germs stick to its legs and body from waste and are left on food.', 'concept', 2),
    fc(11, 'Which mosquito spreads malaria?', 'The female Anopheles.', 'fact', 2),
    fc(12, 'Where do mosquitoes breed?', 'In stagnant water.', 'fact', 2),
    fc(13, 'Main danger in cholera?', 'Loss of water and salts (dehydration) from watery diarrhoea.', 'concept', 3),
    fc(14, 'Treatment given by mouth to replace lost water and salts?', 'Oral rehydration solution.', 'fact', 3),
    fc(15, 'Symptoms of typhoid?', 'Long-lasting fever rising step by step, headache, weakness, stomach pain.', 'fact', 3),
    fc(16, 'How does tuberculosis spread?', 'Through the air, in droplets from the cough of a patient.', 'fact', 3),
    fc(17, 'Why must a tuberculosis patient finish the medicine?', 'Stopping early can leave bacteria alive, and the disease may return.', 'concept', 3),
    fc(18, 'Which organ does tuberculosis mainly affect?', 'The lungs.', 'fact', 3),
    fc(19, 'What does the AIDS virus attack?', 'The white blood cells of the immune system.', 'fact', 4),
    fc(20, 'Four ways AIDS spreads?', 'Unprotected sexual contact, infected blood, shared needles, mother to baby.', 'fact', 4),
    fc(21, 'Does AIDS spread by hugging or mosquito bites?', 'No.', 'fact', 4),
    fc(22, 'Typical sign of chicken pox?', 'Itchy red spots that become fluid-filled blisters.', 'fact', 4),
    fc(23, 'Which organ does hepatitis affect, and what is its sign?', 'The liver; jaundice (yellow skin and eyes).', 'fact', 4),
    fc(24, 'Which type of hepatitis spreads by food and water?', 'Type A.', 'fact', 4),
    fc(25, 'Pattern of fever in malaria?', 'Chills, high fever and sweating at regular intervals.', 'fact', 5),
    fc(26, 'Symptoms of amoebic dysentery?', 'Diarrhoea with blood and mucus, stomach cramps.', 'fact', 5),
    fc(27, 'Vector of sleeping sickness?', 'The tsetse fly.', 'fact', 5),
    fc(28, 'How does ascariasis spread?', 'Eggs of the roundworm in soil, water and unwashed vegetables.', 'fact', 6),
    fc(29, 'How does taeniasis spread?', 'By eating undercooked meat that holds the larvae of the tapeworm.', 'fact', 6),
    fc(30, 'Which mosquito spreads filariasis, and what is the swelling called?', 'The Culex mosquito; elephantiasis.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
