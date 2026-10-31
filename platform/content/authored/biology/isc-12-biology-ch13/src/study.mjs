// ISC 12 Biology ch13 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, BOD_FALL } from './decks.mjs';
import { STAGES } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Microbes in Human Welfare — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Microbes in household products',
      `- **Curd:** micro-organisms such as ***Lactobacillus*** and others commonly called **lactic acid bacteria (LAB)** grow in milk and convert it to curd. They produce **acids** that **coagulate and partially digest milk proteins**. A small amount of curd added to fresh milk as **inoculum (starter)** contains millions of LAB, which multiply at a suitable temperature. LAB also **improve nutritional quality** by increasing **vitamin B₁₂**, and in our stomach they help **check disease-causing microbes**.
- **Dough** for idli and dosa is fermented by **bacteria**; the puffed-up appearance is due to **carbon dioxide**.
- **Bread:** dough is fermented by **baker’s yeast, *Saccharomyces cerevisiae***; carbon dioxide makes it rise.
- **Toddy**, a traditional drink of southern India, is made by fermenting **sap from palms**.
- **Cheese:** the large holes in **Swiss cheese** are due to a large amount of **CO₂** produced by the bacterium ***Propionibacterium sharmanii***; **Roquefort cheese** is ripened by growing specific **fungi** on it, which give it a particular flavour.`,
      [kt('Lactic acid bacteria', 'Bacteria such as Lactobacillus that make lactic acid and turn milk into curd.'), kt('Starter (inoculum)', 'Small amount of curd containing LAB, added to milk.'), kt('Fermentation', 'Breakdown of organic substances by microbes, often without oxygen.')],
      V.curd,
      [1],
    ),
    sec(
      '2. Microbes in industrial products',
      `Microbes are grown on a large scale in very large vessels called **fermentors**.

**Fermented beverages:** ***Saccharomyces cerevisiae*** (**brewer’s yeast**) ferments malted cereals and fruit juices to produce ethanol. **Wine and beer** are produced **without distillation**; **whisky, brandy and rum** are produced by **distillation** of the fermented broth.

**Antibiotics** are chemical substances produced by some microbes that can **kill or retard the growth** of other (disease-causing) microbes. **Penicillin** was the first antibiotic discovered — by **Alexander Fleming**, who saw that a mould, ***Penicillium notatum***, growing in an unwashed culture plate of ***Staphylococcus***, prevented the bacteria from growing around it. Its full potential as an effective antibiotic was established by **Ernst Chain and Howard Florey**; it was used extensively to treat soldiers in **World War II**. Antibiotics have greatly reduced deaths from diseases such as plague, whooping cough, diphtheria and leprosy.

**Chemicals, enzymes and other bioactive molecules:**
| Product | Microbe |
|---|---|
| **Citric acid** | ***Aspergillus niger*** (fungus) |
| **Acetic acid** | ***Acetobacter aceti*** (bacterium) |
| **Butyric acid** | ***Clostridium butylicum*** (bacterium) |
| **Lactic acid** | ***Lactobacillus*** (bacterium) |
| **Ethanol** | ***Saccharomyces cerevisiae*** (yeast) |

- **Lipases** are used in **detergent** formulations to remove **oily stains** from laundry.
- **Pectinases and proteases** make bottled **fruit juices clearer**.
- **Streptokinase**, produced by ***Streptococcus*** and modified by genetic engineering, is a **“clot buster”** that removes clots from blood vessels of patients who have had a **myocardial infarction (heart attack)**.
- **Cyclosporin A**, from the fungus ***Trichoderma polysporum***, is an **immunosuppressive agent** used in **organ-transplant** patients.
- **Statins**, from the yeast ***Monascus purpureus***, are **blood-cholesterol-lowering** agents; they **competitively inhibit** the enzyme responsible for cholesterol synthesis.`,
      [kt('Antibiotic', 'Chemical from a microbe that kills or retards other microbes.'), kt('Streptokinase', 'Clot-busting enzyme from Streptococcus.'), kt('Cyclosporin A', 'Immunosuppressant from Trichoderma polysporum.'), kt('Statins', 'Cholesterol-lowering agents from Monascus purpureus.')],
      table(['Medicine', 'Source', 'Use'], [['Penicillin', 'Penicillium notatum', 'Antibiotic'], ['Streptokinase', 'Streptococcus', 'Clot buster'], ['Cyclosporin A', 'Trichoderma polysporum', 'Immunosuppressant'], ['Statins', 'Monascus purpureus', 'Lower cholesterol']], 'Table of medicinal microbial products'),
      [2],
    ),
    sec(
      '3. Microbes in sewage treatment',
      `**Sewage** is municipal waste water containing large amounts of **organic matter** and microbes, many of them pathogenic. It is treated in **sewage treatment plants (STPs)** in two stages.

**Primary treatment** — physical removal of particles: **floating debris** is removed by **sequential filtration**; **grit** (soil and small pebbles) by **sedimentation**. All solids that settle form the **primary sludge**; the supernatant forms the **effluent**, which goes to secondary treatment.

**Secondary (biological) treatment** — the primary effluent is passed into large **aeration tanks**, where it is constantly agitated and air is pumped in. This allows vigorous growth of useful **aerobic microbes** into **flocs** — masses of **bacteria associated with fungal filaments** forming mesh-like structures. The microbes consume most of the organic matter, **significantly reducing the BOD**.

**BOD (biochemical oxygen demand)** is the amount of **oxygen** that would be consumed if all the **organic matter in one litre of water** were oxidised by bacteria. The greater the BOD, the greater the **polluting potential** (model plant: ${STAGES.map(([, v]) => v).join(' → ')} mg/L, a fall of ${BOD_FALL} percent).

When BOD has fallen enough, the effluent passes into a **settling tank**, where the flocs **sediment** as **activated sludge**. A small part is **pumped back** to the aeration tank as **inoculum**; the major part goes to **anaerobic sludge digesters**, where **anaerobic bacteria** digest the bacteria and fungi, producing gases such as **methane, hydrogen sulphide and carbon dioxide** — **biogas**. The treated effluent is released into rivers and streams. The Ministry of Environment and Forests began the **Ganga Action Plan** and **Yamuna Action Plan** to build STPs.`,
      [kt('Primary sludge', 'Solids that settle during primary treatment.'), kt('Flocs', 'Masses of bacteria with fungal filaments that digest organic matter.'), kt('BOD', 'Oxygen consumed by bacteria to oxidise the organic matter in one litre of water.'), kt('Activated sludge', 'Sediment of flocs in the settling tank.')],
      V.stp,
      [3],
      [V.bod],
    ),
    sec(
      '4. Biogas',
      `**Biogas** is a mixture of gases — **predominantly methane**, with **carbon dioxide** and **hydrogen sulphide** — produced by microbial activity and used as **fuel**.

**Methanogens**, such as ***Methanobacterium***, grow **anaerobically on cellulosic material** and produce large amounts of methane along with CO₂ and H₂. They are found in **anaerobic sludge** during sewage treatment and in the **rumen** of cattle, where they help break down the **cellulose** of the cattle’s food. Cattle **excreta (gobar)** are therefore rich in methanogens.

**Biogas plant:** a **concrete tank (10–15 feet deep)** in which bio-wastes are collected and a **slurry of dung** is fed. A **floating cover** is placed over the slurry; it **keeps rising** as gas is produced by microbial activity. The plant has an **outlet** connected to a **pipe** that supplies biogas to nearby houses for **cooking and lighting**. The **spent slurry** is removed through another outlet and used as **fertiliser**. The technology was developed in India mainly by the **Indian Agricultural Research Institute (IARI)** and the **Khadi and Village Industries Commission (KVIC)**.`,
      [kt('Methanogens', 'Anaerobic bacteria such as Methanobacterium that produce methane.'), kt('Biogas', 'Fuel gas, mainly methane, made by anaerobic microbes.'), kt('Gobar', 'Cattle dung, rich in methanogens.')],
      V.biogas,
      [4],
    ),
    sec(
      '5. Biocontrol agents and integrated pest management',
      `**Biocontrol** is the use of **biological methods** for controlling plant diseases and pests. An **organic farmer** holds that **eradicating** pests is undesirable, since predatory and parasitic insects that depend on them would also die; the aim is to keep pests at **manageable levels** through a balanced system.

**Examples:**
- **Ladybird** beetles feed on **aphids**; **dragonflies** feed on **mosquitoes**.
- ***Bacillus thuringiensis* (Bt)**: spores (available in sachets) are mixed with water and sprayed on plants such as brassicas and fruit trees; they are eaten by **caterpillars**, in whose gut the **toxin is released**, killing the larvae without harming other insects.
- ***Trichoderma***: free-living **fungi** common in root ecosystems, effective biocontrol agents against several **plant pathogens**.
- **Baculoviruses** (genus ***Nucleopolyhedrovirus***) attack insects and other arthropods; they are **species-specific** and **narrow-spectrum**, with **no negative impact** on plants, mammals, birds, fish or non-target insects — ideal for **integrated pest management (IPM)** in ecologically sensitive areas.

**Harmful effects of chemical pesticides:** they are **toxic** to humans and animals; they kill **useful and harmful** organisms indiscriminately; they **pollute** soil, water bodies and food (including by **biomagnification** in food chains); and pests develop **resistance**. **IPM** combines biocontrol, resistant varieties, crop rotation and minimal, targeted use of chemicals.`,
      [kt('Biocontrol', 'Use of living organisms to control pests and diseases.'), kt('Integrated pest management', 'Combined, mainly biological, control keeping pests below harmful levels.'), kt('Baculoviruses', 'Species-specific insect viruses used in biocontrol.')],
      V.biocontrol,
      [5],
    ),
    sec(
      '6. Biofertilisers',
      `**Biofertilisers** are organisms that **enrich the nutrient quality of the soil**; the main sources are **bacteria, fungi and cyanobacteria**. They reduce the use of chemical fertilisers.
- ***Rhizobium*** forms **nodules** on the roots of **leguminous** plants and fixes **atmospheric nitrogen** into organic forms usable by the plant (symbiotic).
- ***Azospirillum*** and ***Azotobacter*** are **free-living** bacteria that fix atmospheric nitrogen in the soil.
- **Mycorrhiza**: symbiotic associations of fungi, many of the genus ***Glomus***, with plant roots. The fungus **absorbs phosphorus** from the soil and passes it to the plant; mycorrhizal plants also show **resistance to root-borne pathogens**, **tolerance to salinity and drought**, and better growth.
- **Cyanobacteria** (blue-green algae) are **autotrophic** microbes, many of which fix atmospheric nitrogen — for example ***Anabaena, Nostoc, Oscillatoria***. In **paddy fields** they are important biofertilisers and also add **organic matter** to the soil.`,
      [kt('Biofertiliser', 'Organism that enriches soil nutrients, such as a nitrogen fixer.'), kt('Mycorrhiza', 'Symbiotic association of a fungus with plant roots.'), kt('Root nodule', 'Swelling on legume roots housing nitrogen-fixing Rhizobium.')],
      table(['Biofertiliser', 'Type', 'Benefit'], [['Rhizobium', 'Symbiotic bacterium', 'Nitrogen fixation in legumes'], ['Azotobacter', 'Free-living bacterium', 'Nitrogen fixation'], ['Glomus', 'Mycorrhizal fungus', 'Phosphorus uptake'], ['Anabaena', 'Cyanobacterium', 'Nitrogen fixation in paddy']], 'Table of biofertilisers with type and benefit'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing “Penicillium” as the bacterium in Fleming’s plate (the bacterium was Staphylococcus; the mould was Penicillium notatum).
- Mixing up the sources of cyclosporin A (Trichoderma polysporum) and statins (Monascus purpureus).
- Saying primary treatment is biological (it is physical; secondary is biological).
- Defining BOD as the oxygen in water (it is the oxygen consumed to oxidise the organic matter).
- Saying biogas is mainly carbon dioxide (it is mainly methane).
- Calling Glomus a nitrogen fixer (it helps phosphorus uptake).

**How marks are usually awarded**
- 1-mark subparts: a microbe for a product, a gas, a biofertiliser, a use of an enzyme.
- 2–3-mark questions: curd formation; primary vs secondary treatment; BOD; biogas plant; biocontrol examples; biofertilisers.
- 5-mark questions in parts: sewage treatment with diagram; biogas from methanogens to plant; organic farming with biocontrol and biofertilisers.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Bacteria that turn milk into curd?', 'Lactobacillus (lactic acid bacteria).', 'fact', 1),
    fc(2, 'Vitamin increased in curd?', 'Vitamin B₁₂.', 'fact', 1),
    fc(3, 'Yeast used in bread?', 'Saccharomyces cerevisiae.', 'fact', 1),
    fc(4, 'Cause of holes in Swiss cheese?', 'CO₂ from Propionibacterium sharmanii.', 'fact', 1),
    fc(5, 'What is toddy?', 'Fermented palm sap.', 'fact', 1),
    fc(6, 'Which beverages are distilled?', 'Whisky, brandy, rum.', 'exam-tip', 2),
    fc(7, 'Who discovered penicillin?', 'Alexander Fleming.', 'fact', 2),
    fc(8, 'Who developed penicillin as a drug?', 'Ernst Chain and Howard Florey.', 'fact', 2),
    fc(9, 'Source of citric acid?', 'Aspergillus niger.', 'fact', 2),
    fc(10, 'Source of acetic acid?', 'Acetobacter aceti.', 'fact', 2),
    fc(11, 'Source of butyric acid?', 'Clostridium butylicum.', 'fact', 2),
    fc(12, 'Enzyme in detergents?', 'Lipase.', 'fact', 2),
    fc(13, 'Enzymes that clarify juices?', 'Pectinases and proteases.', 'fact', 2),
    fc(14, 'Use of streptokinase?', 'Clot buster after a heart attack.', 'fact', 2),
    fc(15, 'Source and use of cyclosporin A?', 'Trichoderma polysporum; immunosuppressant.', 'fact', 2),
    fc(16, 'Source and use of statins?', 'Monascus purpureus; lower cholesterol.', 'fact', 2),
    fc(17, 'Primary treatment of sewage?', 'Filtration and sedimentation (physical).', 'concept', 3),
    fc(18, 'What are flocs?', 'Bacteria with fungal filaments in aeration tanks.', 'definition', 3),
    fc(19, 'Define BOD.', 'Oxygen used to oxidise organic matter in 1 L of water.', 'definition', 3),
    fc(20, 'What is activated sludge?', 'Settled flocs; part returned as inoculum.', 'definition', 3),
    fc(21, 'Gases from sludge digesters?', 'Methane, hydrogen sulphide, CO₂.', 'fact', 3),
    fc(22, 'Example of a methanogen?', 'Methanobacterium.', 'fact', 4),
    fc(23, 'Where are methanogens found?', 'Anaerobic sludge; rumen of cattle.', 'fact', 4),
    fc(24, 'Who developed biogas technology in India?', 'IARI and KVIC.', 'fact', 4),
    fc(25, 'Ladybird and dragonfly control?', 'Aphids and mosquitoes.', 'fact', 5),
    fc(26, 'How does Bt kill caterpillars?', 'Toxin released in the larval gut.', 'concept', 5),
    fc(27, 'Why are baculoviruses ideal for IPM?', 'Species-specific, narrow-spectrum.', 'concept', 5),
    fc(28, 'Free-living nitrogen fixers?', 'Azospirillum, Azotobacter.', 'fact', 6),
    fc(29, 'Role of Glomus?', 'Mycorrhiza: phosphorus uptake.', 'fact', 6),
    fc(30, 'Cyanobacteria used in paddy fields?', 'Anabaena, Nostoc, Oscillatoria.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
