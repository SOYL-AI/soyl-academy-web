// ch08 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

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
      `- **Curd:** *Lactobacillus* and other **lactic acid bacteria (LAB)** grow in milk, produce acids that coagulate and partially digest milk proteins, **increase vitamin B₁₂**, and check disease-causing microbes in the stomach. A small amount of curd added to fresh milk acts as the inoculum.
- **Dosa and idli:** dough fermented by **bacteria**; CO₂ makes it puff up.
- **Bread:** dough fermented by **baker's yeast (*Saccharomyces cerevisiae*)**.
- **Toddy:** traditional drink made by fermenting palm sap.
- **Cheese:** large holes in **Swiss cheese** from CO₂ produced by ***Propionibacterium sharmanii***; **Roquefort cheese** ripened by specific fungi for flavour.`,
      [kt('Fermentation', 'Breakdown of sugars by microbes, often without oxygen, producing acids, alcohol or gases.'), kt('Inoculum', 'A small quantity of microbes added to start a culture or fermentation.')],
      table(['Product', 'Microbe'], [['Curd', 'Lactic acid bacteria'], ['Bread', 'Saccharomyces cerevisiae'], ['Swiss cheese', 'Propionibacterium sharmanii']], 'Table of household products and microbes'),
      [1],
    ),
    sec(
      '2. Microbes in industry',
      `**Beverages:** brewer's yeast (*Saccharomyces cerevisiae*) ferments malted cereals and fruit juices to ethanol. **Wine and beer** are produced **without distillation**; **whisky, brandy and rum** by **distilling** the fermented broth.

**Antibiotics:** chemicals produced by some microbes that kill or retard the growth of disease-causing microbes. **Penicillin** — discovered by **Alexander Fleming** while working on *Staphylococci*: a mould, ***Penicillium notatum***, prevented their growth; its full potential was established by **Ernst Chain and Howard Florey**; used for wounded soldiers in World War II; Nobel Prize 1945. Antibiotics have greatly improved treatment of plague, whooping cough, diphtheria and leprosy.

**Chemicals and enzymes:**
| Product | Microbe |
|---|---|
| Citric acid | *Aspergillus niger* (fungus) |
| Acetic acid | *Acetobacter aceti* (bacterium) |
| Butyric acid | *Clostridium butylicum* (bacterium) |
| Lactic acid | *Lactobacillus* (bacterium) |
| Ethanol | *Saccharomyces cerevisiae* (yeast) |

**Lipases** in detergents remove oily stains; **pectinases and proteases** clarify bottled juices.

**Bioactive molecules:** **streptokinase** (from *Streptococcus*, modified by genetic engineering) — "clot buster" for patients who have had a myocardial infarction; **cyclosporin A** (from *Trichoderma polysporum*) — immunosuppressant for organ-transplant patients; **statins** (from the yeast *Monascus purpureus*) — lower blood cholesterol by competitively inhibiting an enzyme of cholesterol synthesis.`,
      [kt('Antibiotic', 'A chemical produced by a microbe that kills or retards the growth of other (disease-causing) microbes.'), kt('Statins', 'Microbial products that lower blood cholesterol by competitively inhibiting an enzyme of its synthesis.')],
      flow('LR', [['f', 'Fleming: Penicillium on Staphylococcus plate'], ['c', 'Chain and Florey: full potential'], ['w', 'Used in World War II']], [['f', 'c'], ['c', 'w']], 'Flow of the discovery of penicillin'),
      [1],
    ),
    sec(
      '3. Sewage treatment',
      `**Sewage** (municipal waste water) contains large amounts of organic matter and microbes, many pathogenic; it is treated in **sewage treatment plants (STPs)** before release into natural water bodies.

**Primary treatment** (physical): floating debris removed by sequential **filtration**; grit (soil, small pebbles) by **sedimentation**. Settled solids = **primary sludge**; supernatant = **effluent**.

**Secondary (biological) treatment:** effluent passed into large **aeration tanks**, agitated and pumped with air; useful aerobic microbes grow into **flocs** (bacteria associated with fungal filaments in mesh-like structures), which consume most of the organic matter, significantly reducing the **BOD**. Then the effluent goes to a **settling tank**, where flocs sediment as **activated sludge**; a small part is pumped back into the aeration tank as **inoculum**; the major part goes to **anaerobic sludge digesters**, where other bacteria digest the bacteria and fungi, producing **biogas** (methane, hydrogen sulphide, CO₂). The treated effluent is released into rivers.

**BOD (biochemical oxygen demand):** the amount of oxygen that would be consumed if all the organic matter in **one litre of water** were oxidised by bacteria; **higher BOD = more polluting potential**.

The **Ministry of Environment and Forests** initiated the **Ganga Action Plan** and **Yamuna Action Plan** to save these rivers from pollution.`,
      [kt('BOD', 'Oxygen that would be consumed if all organic matter in one litre of water were oxidised by bacteria; a measure of organic pollution.'), kt('Flocs', 'Masses of bacteria associated with fungal filaments that form in aeration tanks.'), kt('Activated sludge', 'Sediment of flocs in the settling tank; partly reused as inoculum.')],
      V.stp,
      [2],
      [V.bod],
    ),
    sec(
      '4. Biogas',
      `**Biogas** is a mixture of gases, predominantly **methane**, produced by microbial activity; it is used as fuel. **Methanogens** such as ***Methanobacterium*** grow anaerobically on cellulosic material and produce large amounts of methane, with CO₂ and H₂. They occur in anaerobic sludge and in the **rumen** of cattle (where they help digest cellulose), so **cattle dung (gobar)** is rich in them.

**Biogas plant:** a concrete tank (10–15 feet deep) into which bio-wastes and a **slurry of dung** are fed; a **floating cover** over the slurry rises as gas is produced; an outlet pipe supplies gas for **cooking and lighting**; spent slurry is removed through another outlet and used as **fertiliser**. The technology was developed in India mainly by **IARI** (Indian Agricultural Research Institute) and **KVIC** (Khadi and Village Industries Commission).`,
      [kt('Methanogens', 'Anaerobic microbes such as Methanobacterium that produce methane.'), kt('Biogas', 'A fuel gas, mainly methane, produced by microbial digestion of organic matter.')],
      V.biogas,
      [2],
    ),
    sec(
      '5. Biocontrol agents and biofertilisers; judicious use of antibiotics',
      `**Biocontrol** uses biological methods to control plant diseases and pests, reducing dependence on chemicals that are toxic to humans and animals and pollute the environment. Organic farmers aim to keep pests at manageable levels through a balanced ecosystem.
- **Ladybird** beetles (aphids) and **dragonflies** (mosquitoes).
- ***Bacillus thuringiensis* (Bt):** spores sprayed on plants; caterpillars that eat them are killed by a toxin released in their gut; other insects are unharmed.
- ***Trichoderma*:** free-living fungi in the root ecosystem; biocontrol of several plant pathogens.
- **Baculoviruses** (genus ***Nucleopolyhedrovirus***): species-specific, narrow-spectrum insecticides with no negative impact on plants, mammals, birds, fish or non-target insects; useful in **integrated pest management (IPM)**.

**Biofertilisers** enrich the nutrient quality of soil:
- **Rhizobium** — symbiotic in root nodules of leguminous plants; fixes atmospheric nitrogen.
- **Azospirillum, Azotobacter** — free-living nitrogen fixers in soil.
- **Mycorrhiza** (fungi of genus ***Glomus***) — absorb **phosphorus** from soil for the plant; also give resistance to root pathogens and tolerance to salinity and drought.
- **Cyanobacteria** (***Anabaena, Nostoc, Oscillatoria***) — fix nitrogen, especially in **paddy fields**; add organic matter.

**Judicious use of antibiotics:** use only on prescription, at the correct dose, for the full course; never for viral infections; misuse selects resistant bacteria.`,
      [kt('Biocontrol', 'Use of living organisms to control pests and plant diseases.'), kt('Biofertiliser', 'An organism that enriches the nutrient quality of the soil.'), kt('Mycorrhiza', 'Symbiotic association of a fungus (such as Glomus) with plant roots that helps absorb phosphorus.')],
      table(['Biofertiliser', 'Nutrient benefit'], [['Rhizobium', 'Nitrogen (symbiotic)'], ['Azotobacter, Azospirillum', 'Nitrogen (free-living)'], ['Glomus (mycorrhiza)', 'Phosphorus'], ['Anabaena, Nostoc', 'Nitrogen in paddy fields']], 'Table of biofertilisers and their nutrient benefits'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying wine is distilled (wine and beer are not; whisky, brandy and rum are).
- Giving the wrong microbe for an acid (citric acid — Aspergillus niger; acetic acid — Acetobacter aceti).
- Defining BOD without "one litre of water", or saying high BOD means clean water.
- Calling primary treatment biological (it is physical).
- Saying methanogens are aerobic (they are anaerobic).
- Saying antibiotics cure colds (they do not act on viruses).

**How marks are usually awarded**
- 1-mark items: microbe, product, term or definition.
- 2–3-mark answers: microbe + product + use; steps of a process in order.
- 5-mark answers: sewage treatment with BOD and biogas, or biocontrol and biofertilisers with examples and advantages.
- Case-based items: BOD data, field trials or products, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Which microbes make curd, and what vitamin increases?', 'Lactic acid bacteria (Lactobacillus); vitamin B₁₂.', 'fact', 1),
    fc(2, 'What makes bread dough rise?', 'CO₂ from fermentation by baker’s yeast, Saccharomyces cerevisiae.', 'concept', 1),
    fc(3, 'Holes in Swiss cheese are made by…?', 'CO₂ from Propionibacterium sharmanii.', 'fact', 1),
    fc(4, 'Which drinks are distilled?', 'Whisky, brandy and rum (not wine or beer).', 'fact', 1),
    fc(5, 'Who discovered penicillin, and from which mould?', 'Alexander Fleming; Penicillium notatum.', 'fact', 1),
    fc(6, 'Who established penicillin’s potential?', 'Ernst Chain and Howard Florey.', 'fact', 1),
    fc(7, 'Citric acid is made by…?', 'Aspergillus niger.', 'fact', 1),
    fc(8, 'Acetic acid is made by…?', 'Acetobacter aceti.', 'fact', 1),
    fc(9, 'Butyric acid is made by…?', 'Clostridium butylicum.', 'fact', 1),
    fc(10, 'Use of lipases?', 'In detergents, to remove oily stains.', 'fact', 1),
    fc(11, 'Use of pectinases and proteases?', 'Clarifying bottled fruit juices.', 'fact', 1),
    fc(12, 'Streptokinase: source and use?', 'Streptococcus; clot buster after a heart attack.', 'fact', 1),
    fc(13, 'Cyclosporin A: source and use?', 'Trichoderma polysporum; immunosuppressant for transplant patients.', 'fact', 1),
    fc(14, 'Statins: source and action?', 'Monascus purpureus; inhibit an enzyme of cholesterol synthesis.', 'fact', 1),
    fc(15, 'Primary sewage treatment?', 'Physical: filtration and sedimentation; gives primary sludge and effluent.', 'concept', 2),
    fc(16, 'What are flocs?', 'Masses of bacteria with fungal filaments in aeration tanks.', 'definition', 2),
    fc(17, 'Define BOD.', 'Oxygen consumed if all organic matter in 1 litre of water were oxidised by bacteria.', 'definition', 2),
    fc(18, 'High BOD means…?', 'Water is highly polluted with organic matter.', 'exam-tip', 2),
    fc(19, 'What happens to activated sludge?', 'A small part returns as inoculum; most goes to anaerobic digesters.', 'concept', 2),
    fc(20, 'Gases in biogas?', 'Methane (mainly), CO₂, H₂S (and H₂).', 'fact', 2),
    fc(21, 'Name a methanogen and where it lives.', 'Methanobacterium; anaerobic sludge and the rumen of cattle.', 'fact', 2),
    fc(22, 'Who developed biogas technology in India?', 'IARI and KVIC.', 'fact', 2),
    fc(23, 'River action plans?', 'Ganga Action Plan and Yamuna Action Plan.', 'fact', 2),
    fc(24, 'Biocontrol for aphids and mosquitoes?', 'Ladybird beetles and dragonflies.', 'example', 3),
    fc(25, 'How does Bt kill caterpillars?', 'A toxin released in the caterpillar’s gut after it eats the spores.', 'concept', 3),
    fc(26, 'Trichoderma as biocontrol?', 'Free-living fungi that control plant pathogens in the root zone.', 'fact', 3),
    fc(27, 'Why are baculoviruses good for IPM?', 'Narrow-spectrum; no harm to non-target organisms.', 'concept', 3),
    fc(28, 'Symbiotic N-fixing biofertiliser?', 'Rhizobium in legume root nodules.', 'example', 3),
    fc(29, 'Free-living N-fixers?', 'Azospirillum and Azotobacter.', 'example', 3),
    fc(30, 'Benefits of mycorrhiza (Glomus)?', 'Phosphorus absorption; resistance to root pathogens; tolerance to salinity and drought.', 'concept', 3),
    fc(31, 'Cyanobacterial biofertilisers?', 'Anabaena, Nostoc, Oscillatoria (paddy fields).', 'example', 3),
    fc(32, 'Why complete an antibiotic course?', 'Stopping early lets the more resistant bacteria survive and spread.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
