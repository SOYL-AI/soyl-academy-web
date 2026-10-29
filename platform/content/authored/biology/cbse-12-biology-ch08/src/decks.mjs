// ch08 Microbes in Human Welfare — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { STP, BOD, BIOGAS } from './svgs.mjs';
import { pctFall, pct, oxygenDemand, STAGES } from './calc.mjs';

export const V = {
  stp: svgV(STP, 'Flow of a sewage treatment plant from primary to secondary treatment, settling tank, sludge digester and treated effluent'),
  bod: svgV(BOD, 'Bar chart of BOD falling from raw sewage through primary and secondary treatment'),
  biogas: svgV(BIOGAS, 'Biogas plant with inlet for dung slurry, digester tank, floating gas cover, gas outlet and spent slurry outlet', 'Schematic, not to scale.'),
};

// ---------------------------------------------------------------- computed numbers
const PRIM = pctFall(STAGES[0][1], STAGES[1][1]);
const ALL = pctFall(STAGES[0][1], STAGES[2][1]);
const OD = oxygenDemand(STAGES[0][1], 1000) / 1000;
const ODT = oxygenDemand(STAGES[2][1], 1000) / 1000;
const YIELD = { fields: 40, before: 2.5, after: 3.0 };
YIELD.rise = Math.round(((YIELD.after - YIELD.before) / YIELD.before) * 1000) / 10;
const SPRAY = { before: 8, after: 3 };
SPRAY.fall = pctFall(SPRAY.before, SPRAY.after);

export const deck1 = deck({
  part: 1,
  title: 'Microbes in Human Welfare — Part 1: Microbes in the home and in industry',
  goals: [
    'Give examples of microbes used to make household foods',
    'Name microbes used to produce beverages, antibiotics, acids and enzymes',
    'Describe bioactive molecules such as streptokinase, cyclosporin A and statins',
  ],
  slides: [
    sl('title', 'Microbes in Human Welfare', {
      b: 'Part 1 — microbes are not only germs: many make our food, drinks, medicines and industrial chemicals.',
      v: flow('LR', [['h', 'Household foods'], ['b', 'Beverages'], ['a', 'Antibiotics'], ['c', 'Acids and enzymes'], ['m', 'Bioactive molecules']], [['h', 'b'], ['b', 'a'], ['a', 'c'], ['c', 'm']], 'Flow of uses of microbes from household foods to industrial bioactive molecules'),
      n: 'Microbes are everywhere, in soil, water and air, and inside our bodies. Some cause disease, but many are extremely useful. People have used microbes to make curd, bread and idli for thousands of years, and today industries use them to make medicines, chemicals and enzymes on a huge scale.',
    }),
    sl('concept', 'Microbes in household products', {
      b: 'Fermentation by microbes changes the taste, texture and nutrition of foods.',
      v: table(['Product', 'Microbe', 'What it does'], [['Curd', 'Lactic acid bacteria (Lactobacillus)', 'Produce acids that coagulate and partly digest milk proteins; increase vitamin B₁₂; check disease-causing microbes in the stomach'], ['Dosa and idli dough', 'Bacteria', 'Fermentation releases CO₂, which puffs up the dough'], ['Bread dough', 'Baker’s yeast (Saccharomyces cerevisiae)', 'Fermentation releases CO₂ that makes the dough rise'], ['Toddy', 'Microbes in palm sap', 'Ferment the sap into a traditional drink'], ['Swiss cheese', 'Propionibacterium sharmanii', 'CO₂ makes the large holes'], ['Roquefort cheese', 'Specific fungi', 'Ripening gives a particular flavour']], 'Table of household products with the microbes that make them'),
      n: 'A spoonful of curd added to warm milk contains millions of lactic acid bacteria. They make acids that set the milk into curd and add vitamin B twelve. Dosa and idli batter rises overnight because bacteria release carbon dioxide; bread rises because of yeast. Even the holes in Swiss cheese are made by a bacterium releasing gas.',
    }),
    sl('example', 'Worked example 1: what makes the dough rise?', {
      b: 'Two bowls of bread dough are kept warm. Bowl A has yeast; bowl B has no yeast. After two hours, only A has risen. A third bowl C has yeast but is kept in a refrigerator; it rises very little. Explain.',
      ul: [
        'Step 1 — Only the bowls with **yeast** can ferment sugars, so the yeast causes the rise (A vs B).',
        'Step 2 — Yeast releases **CO₂** during fermentation; the gas is trapped in the dough, which puffs up.',
        'Step 3 — Fermentation is an **enzyme-driven** process that slows down at low temperature, so C rises little.',
        'Conclusion — a living microbe, working best at a suitable temperature, raises the dough.',
      ],
      v: table(['Bowl', 'Yeast', 'Temperature', 'Rise'], [['A', 'Yes', 'Warm', 'Large'], ['B', 'No', 'Warm', 'None'], ['C', 'Yes', 'Cold', 'Very little']], 'Worked table: dough rises only with yeast and warmth'),
      n: 'Compare the bowls in pairs. A and B differ only in yeast, so yeast is needed. A and C differ only in temperature, so warmth is needed too. This is a controlled experiment, and it shows that the rising is caused by living yeast cells fermenting sugar and releasing carbon dioxide.',
    }),
    sl('check', 'Quick check: curd', {
      b: 'Which microbes convert milk into curd?',
      n: 'Quick check. Think of the acid these bacteria make.',
      chk: 'lab-mcq',
    }),
    sl('concept', 'Fermented beverages', {
      b: '**Brewer’s yeast (Saccharomyces cerevisiae)** ferments malted cereals and fruit juices to produce **ethanol**. Different raw materials and processing give different beverages.',
      v: table(['Beverage', 'Processing after fermentation'], [['Wine, beer', 'No distillation'], ['Whisky, brandy, rum', 'Fermented broth is distilled']], 'Table of beverages made with and without distillation'),
      n: 'The same yeast used in bread is used in industry to ferment sugars from grains and fruits into ethanol. Some drinks are bottled straight after fermentation, while others are distilled to concentrate the alcohol. We study this as an industrial process; alcohol itself is harmful to health, especially for young people.',
    }),
    sl('concept', 'Antibiotics: the story of penicillin', {
      b: '**Antibiotics** are chemicals made by some microbes that kill or retard the growth of other, disease-causing microbes. **Alexander Fleming** noticed that a mould, **Penicillium notatum**, growing on a culture of **Staphylococci** stopped the bacteria from growing around it. **Ernst Chain and Howard Florey** later established its full potential as an antibiotic.',
      v: flow('LR', [['o', 'Mould contaminates a Staphylococcus culture'], ['z', 'Clear zone: bacteria cannot grow near the mould'], ['p', 'Penicillin identified'], ['u', 'Mass production; used to treat wounded soldiers in World War II'], ['n', 'Nobel Prize (1945)']], [['o', 'z'], ['z', 'p'], ['p', 'u'], ['u', 'n']], 'Flow of the discovery and development of penicillin'),
      n: 'Fleming’s observation was an accident: a mould spoiled one of his bacterial plates, but around the mould no bacteria grew. He identified the chemical responsible and named it penicillin. Chain and Florey purified it and proved its value, and it saved countless soldiers in the Second World War. Antibiotics have since greatly reduced deaths from plague, whooping cough, diphtheria and leprosy.',
    }),
    sl('concept', 'Organic acids and enzymes', {
      b: 'Microbes are used to manufacture chemicals and enzymes in industry.',
      v: table(['Product', 'Microbe', 'Use'], [['Citric acid', 'Aspergillus niger (fungus)', 'Food and drinks'], ['Acetic acid', 'Acetobacter aceti (bacterium)', 'Vinegar'], ['Butyric acid', 'Clostridium butylicum (bacterium)', 'Industry'], ['Lactic acid', 'Lactobacillus (bacterium)', 'Food industry'], ['Ethanol', 'Saccharomyces cerevisiae (yeast)', 'Industrial alcohol'], ['Lipases', 'Microbes', 'Detergent formulations: remove oily stains'], ['Pectinases and proteases', 'Microbes', 'Clear bottled fruit juices']], 'Table of organic acids and enzymes made by microbes with their uses'),
      n: 'Fungi and bacteria are tiny chemical factories. A fungus makes citric acid, bacteria make acetic, butyric and lactic acids, and yeast makes ethanol. Microbial enzymes are useful too: lipases in detergents break down oily stains, and pectinases and proteases make fruit juices clear instead of cloudy.',
    }),
    sl('check', 'Quick check: citric acid', {
      b: 'Which microbe is used for the commercial production of citric acid?',
      n: 'Quick check. It is a fungus.',
      chk: 'citric-mcq',
    }),
    sl('concept', 'Bioactive molecules', {
      b: 'Some microbial products act as powerful medicines.',
      v: table(['Molecule', 'Microbe', 'Use'], [['Streptokinase', 'Streptococcus (modified by genetic engineering)', '“Clot buster”: removes clots from blood vessels of patients who have had a myocardial infarction (heart attack)'], ['Cyclosporin A', 'Trichoderma polysporum (fungus)', 'Immunosuppressive agent in organ-transplant patients'], ['Statins', 'Monascus purpureus (yeast)', 'Lower blood cholesterol by competitively inhibiting an enzyme of cholesterol synthesis']], 'Table of bioactive molecules, the microbes that make them and their uses'),
      n: 'Streptokinase from a bacterium dissolves blood clots in heart-attack patients. Cyclosporin A from a fungus suppresses the immune system so that a transplanted organ is not rejected. Statins from a yeast lower blood cholesterol by blocking an enzyme the body uses to make it. Each began as a molecule made by a microbe.',
    }),
    sl('example', 'Worked example 2: choosing the right microbial product', {
      b: 'Match each need to a microbial product, and name the microbe.',
      ul: [
        'A patient has just had a heart attack caused by a blood clot → **streptokinase** (Streptococcus).',
        'A patient has received a kidney transplant → **cyclosporin A** (Trichoderma polysporum), to prevent rejection.',
        'A patient has very high blood cholesterol → **statins** (Monascus purpureus).',
        'A detergent company wants to remove oily stains → **lipases**.',
      ],
      v: table(['Need', 'Product', 'Microbe'], [['Dissolve a clot', 'Streptokinase', 'Streptococcus'], ['Prevent transplant rejection', 'Cyclosporin A', 'Trichoderma polysporum'], ['Lower cholesterol', 'Statins', 'Monascus purpureus'], ['Remove oily stains', 'Lipases', 'Microbes']], 'Worked table matching four needs to microbial products'),
      n: 'Link each product to what it does. Streptokinase dissolves clots. Cyclosporin A suppresses immunity, which is exactly what a transplant patient needs. Statins block cholesterol synthesis. Lipases digest fats, which is why they work on oily stains. Learning the use with the product makes the microbe names easier to remember.',
    }),
    sl('check', 'Quick check: penicillin', {
      b: 'Judge the assertion and the reason about Fleming’s discovery.',
      n: 'Quick check. What did Fleming see around the mould?',
      chk: 'fleming-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Household: curd (lactic acid bacteria, vitamin B₁₂), dosa and idli (bacteria, CO₂), bread (Saccharomyces cerevisiae), toddy, cheese (Propionibacterium sharmanii for Swiss cheese).',
        'Beverages: Saccharomyces cerevisiae; wine and beer without distillation; whisky, brandy and rum with distillation.',
        'Antibiotics: penicillin from Penicillium notatum (Fleming; Chain and Florey).',
        'Acids: citric (Aspergillus niger), acetic (Acetobacter aceti), butyric (Clostridium butylicum), lactic (Lactobacillus); ethanol (yeast). Enzymes: lipases, pectinases, proteases.',
        'Bioactive molecules: streptokinase, cyclosporin A (Trichoderma polysporum), statins (Monascus purpureus).',
      ],
      v: table(['Microbe', 'Product'], [['Aspergillus niger', 'Citric acid'], ['Acetobacter aceti', 'Acetic acid'], ['Penicillium notatum', 'Penicillin'], ['Trichoderma polysporum', 'Cyclosporin A'], ['Monascus purpureus', 'Statins']], 'Summary table of microbes and products'),
      n: 'To recap: microbes make our curd, bread and cheese; ferment sugars into alcohol; give us antibiotics like penicillin; and produce acids, enzymes and medicines such as streptokinase, cyclosporin A and statins. Learn each microbe with its product and use.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn **microbe–product–use** as a triple.',
        'Write scientific names correctly (genus capitalised).',
        'For curd, mention **vitamin B₁₂** and protection in the stomach.',
        'Know which drinks are **distilled**.',
      ],
      n: 'Exam tips. Learn each microbe together with its product and use. Write scientific names carefully. For curd, mention vitamin B twelve and protection against harmful microbes. And remember which beverages are distilled.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Microbes in Human Welfare — Part 2: Sewage treatment and biogas',
  goals: [
    'Describe primary and secondary treatment of sewage',
    'Explain BOD and how it measures pollution',
    'Describe the production of biogas and the role of methanogens',
  ],
  slides: [
    sl('title', 'Microbes clean our water and give us fuel', {
      b: 'Part 2 — how microbes treat sewage, and how they produce biogas.',
      v: flow('LR', [['s', 'Sewage'], ['t', 'Microbial treatment'], ['c', 'Cleaner water'], ['g', 'Biogas from sludge']], [['s', 't'], ['t', 'c'], ['t', 'g']], 'Flow from sewage through microbial treatment to cleaner water and biogas'),
      n: 'Cities produce huge volumes of waste water, called sewage, full of organic matter and microbes, many of them pathogenic. It cannot be released directly into rivers. Sewage treatment plants use microbes themselves to clean it, and the leftover sludge can produce biogas, a useful fuel.',
    }),
    sl('diagram', 'A sewage treatment plant', {
      b: 'Treatment happens in two stages: **primary** (physical) and **secondary** (biological).',
      v: V.stp,
      n: 'Follow the flow. First, solids are removed physically. Then the remaining liquid is treated by microbes in aeration tanks. The microbial flocs settle in a tank as activated sludge; some returns as a starter, and the rest goes to digesters that produce biogas. Finally, the cleaned effluent is released into a river.',
    }),
    sl('concept', 'Primary treatment', {
      b: '**Primary treatment** is the physical removal of particles. Floating debris is removed by **sequential filtration**; grit (soil and small pebbles) is removed by **sedimentation**. The settled solids form **primary sludge**; the liquid above is the **effluent**.',
      v: table(['Step', 'Removes'], [['Filtration', 'Floating debris'], ['Sedimentation', 'Grit, soil, small pebbles'], ['Output', 'Primary sludge (solids) and effluent (liquid)']], 'Table of the steps of primary sewage treatment'),
      n: 'Primary treatment works like a sieve and a settling pond. Large floating objects are filtered out, and heavy particles sink to the bottom. What sinks is primary sludge; the liquid that remains, the effluent, still contains a lot of dissolved organic matter and goes on to secondary treatment.',
    }),
    sl('concept', 'Secondary (biological) treatment', {
      b: 'The effluent is passed into large **aeration tanks** and agitated mechanically while air is pumped in. Useful **aerobic microbes** grow into **flocs** (masses of bacteria with fungal filaments) and consume most of the organic matter, greatly reducing the **BOD**.',
      v: flow('TB', [['a', 'Aeration tank: aerobic microbes form flocs'], ['b', 'Organic matter consumed: BOD falls'], ['s', 'Settling tank: flocs settle as activated sludge'], ['i', 'Small part returned to aeration tank as inoculum'], ['d', 'Most sludge pumped to anaerobic digesters']], [['a', 'b'], ['b', 's'], ['s', 'i'], ['s', 'd']], 'Flow of secondary treatment from aeration tanks through settling to inoculum and digesters'),
      n: 'Pumping in air lets aerobic bacteria and fungi flourish. They clump into flocs and feed on the dissolved organic matter, cleaning the water. When the BOD has fallen enough, the liquid is moved to a settling tank, where the flocs sink as activated sludge. A little sludge is recycled as a starter culture; the rest is digested anaerobically.',
    }),
    sl('concept', 'BOD: measuring organic pollution', {
      b: '**BOD (biochemical oxygen demand)** is the amount of oxygen that would be consumed if all the organic matter in **one litre of water** were oxidised by bacteria. The **greater the BOD**, the **more polluted** the water with organic matter.',
      v: V.bod,
      n: 'BOD tells us how much food for bacteria the water contains. Bacteria use oxygen as they break down organic matter, so more organic matter means more oxygen used. Untreated sewage has a high BOD; after secondary treatment it is much lower. High-BOD water released into rivers would use up the oxygen that fish need.',
    }),
    sl('example', 'Worked example 1: how much does treatment help?', {
      b: `Using the model values (BOD ${STAGES.map(([, v]) => v).join(', ')} mg per litre for raw sewage, after primary and after secondary treatment), find the percentage fall in BOD after primary treatment and after the whole treatment. How much oxygen would bacteria use in 1000 litres before and after treatment?`,
      ul: [
        r`Step 1 — Primary: $\dfrac{${STAGES[0][1]} - ${STAGES[1][1]}}{${STAGES[0][1]}} \times 100 \approx ${PRIM}$ percent.`,
        r`Step 2 — Overall: $\dfrac{${STAGES[0][1]} - ${STAGES[2][1]}}{${STAGES[0][1]}} \times 100 = ${ALL}$ percent.`,
        r`Step 3 — Oxygen in 1000 L: raw $${STAGES[0][1]} \times 1000\ \text{mg} = ${OD}\ \text{g}$; treated $${STAGES[2][1]} \times 1000\ \text{mg} = ${ODT}\ \text{g}$.`,
      ],
      v: table(['Stage', 'BOD (mg/L)', 'Oxygen used per 1000 L'], STAGES.map(([s, v]) => [s, String(v), `${(v * 1000) / 1000} g`]), `Worked table: BOD falls ${PRIM} percent after primary and ${ALL} percent overall`),
      n: 'Primary treatment removes about a third of the BOD, because it removes only particles. Secondary treatment does most of the work, bringing the overall fall to ninety percent. In terms of oxygen, a thousand litres of raw sewage would use three hundred grams, but treated effluent only thirty grams, which a river can handle.',
    }),
    sl('check', 'Quick check: BOD', {
      b: 'A water sample has a very high BOD. What does this indicate?',
      n: 'Quick check. Link BOD to the amount of organic matter.',
      chk: 'bod-mcq',
    }),
    sl('concept', 'Anaerobic sludge digestion and clean rivers', {
      b: 'In **anaerobic sludge digesters**, other bacteria digest the bacteria and fungi of the sludge, producing a mixture of gases — **methane, hydrogen sulphide and carbon dioxide** — that forms **biogas**. The treated effluent is released into rivers. The Ministry of Environment and Forests began the **Ganga Action Plan** and **Yamuna Action Plan** to build STPs and stop untreated sewage entering rivers.',
      v: table(['Programme', 'Aim'], [['Ganga Action Plan', 'Treat sewage before it enters the Ganga'], ['Yamuna Action Plan', 'Treat sewage before it enters the Yamuna']], 'Table of two river-cleaning programmes and their aims'),
      n: 'Even the sludge is useful. In closed tanks without air, anaerobic bacteria break it down and release biogas, which can be used as fuel. Building enough treatment plants is a huge task, so national programmes like the Ganga and Yamuna Action Plans aim to treat sewage before it reaches our great rivers.',
    }),
    sl('diagram', 'Biogas plants', {
      b: '**Biogas** is mainly **methane**. **Methanogens** such as **Methanobacterium** grow anaerobically on cellulose material and produce methane, with CO₂ and H₂. They are found in anaerobic sludge and in the **rumen** of cattle, so cattle dung (gobar) is rich in them. The technology for rural biogas plants was developed in India by **IARI** and **KVIC**.',
      v: V.biogas,
      n: 'A biogas plant is a deep concrete tank fed with a slurry of dung and water. Methanogens digest it without air, producing gas that collects under a floating cover. The cover rises as gas builds up, and the gas is piped out for cooking and lighting. The leftover slurry is an excellent fertiliser.',
    }),
    sl('example', 'Worked example 2: why put dung in a biogas plant?', {
      b: 'A village uses cattle dung either as dried cakes for burning or in a biogas plant. Compare the two uses.',
      ul: [
        'Step 1 — Dung is rich in **methanogens** from the cattle rumen and in cellulose.',
        'Step 2 — In a biogas plant, methanogens produce **methane-rich biogas**, a cleaner fuel for cooking and lighting.',
        'Step 3 — The **spent slurry** is returned to fields as **fertiliser**.',
        'Conclusion — the biogas plant gives fuel **and** fertiliser, and less smoke indoors than burning dung cakes.',
      ],
      v: table(['Use of dung', 'Fuel', 'Fertiliser', 'Indoor smoke'], [['Dried dung cakes', 'Yes', 'No (burnt)', 'High'], ['Biogas plant', 'Yes (methane)', 'Yes (slurry)', 'Low']], 'Worked table comparing dung cakes with a biogas plant'),
      n: 'Burning dung cakes gives heat but wastes the nutrients and fills homes with smoke. In a biogas plant, microbes turn the dung into a clean-burning gas, and the slurry still goes back to the fields as manure. So one material gives two benefits, which is why biogas plants are encouraged in rural areas.',
    }),
    sl('check', 'Quick check: methanogens', {
      b: 'Judge the assertion and the reason about cattle dung.',
      n: 'Quick check. Where do methanogens live in cattle?',
      chk: 'dung-ar',
    }),
    sl('check', 'Quick check: activated sludge', {
      b: 'What is done with most of the activated sludge from the settling tank?',
      n: 'Quick check. Follow the arrow from the settling tank in the diagram.',
      chk: 'sludge-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Primary treatment: filtration and sedimentation; primary sludge and effluent.',
        'Secondary treatment: aeration tanks, aerobic microbes form flocs, BOD falls; settling tank gives activated sludge; part returned as inoculum.',
        'BOD: oxygen consumed if all organic matter in 1 litre were oxidised by bacteria; higher BOD = more polluted.',
        'Anaerobic sludge digesters produce biogas (methane, H₂S, CO₂). Ganga and Yamuna Action Plans.',
        'Biogas: methanogens (Methanobacterium) in sludge and cattle rumen; dung biogas plants (IARI, KVIC); slurry as fertiliser.',
      ],
      v: table(['Stage', 'Nature'], [['Primary', 'Physical'], ['Secondary', 'Biological (aerobic)'], ['Sludge digestion', 'Biological (anaerobic)']], 'Summary table of treatment stages'),
      n: 'To recap: primary treatment removes solids physically; secondary treatment uses aerobic microbes to cut the BOD; anaerobic bacteria digest the sludge and produce biogas. Methanogens in cattle dung make biogas in village plants, giving fuel and fertiliser.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Define **BOD** exactly, with “one litre of water”.',
        'Describe **flocs** and **activated sludge** and what happens to it.',
        'Name **Methanobacterium** and the **rumen** as its home.',
        'Give the composition of **biogas** (methane, CO₂, H₂S).',
      ],
      n: 'Exam tips. Define BOD carefully. Describe flocs and activated sludge. Name Methanobacterium and where it lives. And give the main components of biogas.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Microbes in Human Welfare — Part 3: Biocontrol agents, biofertilisers and judicious use of antibiotics',
  goals: [
    'Explain biological control of pests and diseases with examples',
    'Name bacterial, fungal and cyanobacterial biofertilisers and how they help',
    'Explain why antibiotics must be used judiciously',
  ],
  slides: [
    sl('title', 'Microbes for greener farming', {
      b: 'Part 3 — using living organisms instead of chemicals to protect crops and enrich soil, and using antibiotics wisely.',
      v: flow('LR', [['c', 'Chemical pesticides and fertilisers'], ['p', 'Pollution and harm to useful organisms'], ['b', 'Biocontrol and biofertilisers'], ['o', 'Organic farming']], [['c', 'p'], ['p', 'b', 'alternative'], ['b', 'o']], 'Flow from chemical inputs and their problems to biological alternatives and organic farming'),
      n: 'Chemical pesticides and fertilisers raise yields, but overuse pollutes soil and water and kills useful organisms. Biological methods use living organisms, often microbes, to control pests and supply nutrients. This is the basis of organic farming, which aims to keep the farm a healthy, balanced ecosystem.',
    }),
    sl('concept', 'Biological control of pests', {
      b: '**Biocontrol** uses biological methods to control plant diseases and pests. The organic farmer aims not to eradicate every “pest” but to keep them at manageable levels within a **balanced ecosystem**.',
      v: table(['Agent', 'Controls'], [['Ladybird beetles', 'Aphids'], ['Dragonflies', 'Mosquitoes'], ['Bacillus thuringiensis (Bt)', 'Butterfly caterpillars'], ['Trichoderma (fungus)', 'Several plant pathogens in the root zone'], ['Baculoviruses (Nucleopolyhedrovirus)', 'Insects and other arthropods']], 'Table of biocontrol agents and the pests they control'),
      n: 'Nature has its own pest controllers. Ladybirds eat aphids and dragonflies eat mosquitoes. Spores of the bacterium Bacillus thuringiensis are sprayed on plants; caterpillars that eat them are killed by a toxin released in their gut, while other insects are spared. The fungus Trichoderma protects roots from disease.',
    }),
    sl('concept', 'Why narrow-spectrum control is better', {
      b: '**Baculoviruses** are **species-specific, narrow-spectrum** insecticides with **no negative impact** on plants, mammals, birds, fish or even non-target insects. They suit **integrated pest management (IPM)**, especially in ecologically sensitive areas.',
      v: table(['', 'Broad-spectrum chemical pesticide', 'Narrow-spectrum biocontrol'], [['Targets', 'Many insects, useful and harmful', 'Only the pest species'], ['Effect on predators and pollinators', 'Killed too', 'Spared'], ['Residues', 'Toxic residues in soil, water and food', 'Little or none'], ['Long-term', 'Pests may return with no natural enemies', 'Balance maintained']], 'Table comparing broad-spectrum pesticides with narrow-spectrum biocontrol'),
      n: 'A broad chemical spray kills the pest, but also the ladybirds, bees and other useful insects. With no natural enemies left, the pest can bounce back. Narrow-spectrum agents like baculoviruses attack only the target, so the rest of the ecosystem, including the pest’s natural enemies, stays intact.',
    }),
    sl('example', 'Worked example 1: comparing pest control in two fields', {
      b: `In two cotton fields, farmer A sprays a chemical insecticide ${SPRAY.before} times a season; farmer B uses Bt spores and protects ladybirds and needs only ${SPRAY.after} sprays of any kind. By what percentage has B reduced spraying, and what other benefits might follow?`,
      ul: [
        r`Step 1 — Reduction $= \dfrac{${SPRAY.before} - ${SPRAY.after}}{${SPRAY.before}} \times 100 \approx ${SPRAY.fall}$ percent.`,
        'Step 2 — Fewer chemical sprays mean fewer residues in soil, water and food, and lower cost.',
        'Step 3 — Natural enemies such as ladybirds survive and keep pests in check.',
      ],
      v: table(['', 'Farmer A', 'Farmer B'], [['Sprays per season', String(SPRAY.before), String(SPRAY.after)], ['Natural enemies', 'Reduced', 'Protected'], ['Residues', 'High', 'Low']], `Worked table: spraying reduced by about ${SPRAY.fall} percent`),
      n: 'Farmer B sprays five fewer times, about sixty-three percent less. The benefits go beyond cost: less chemical in the environment and in food, and a farm where useful predators thrive. Over several seasons, a balanced field often needs fewer interventions.',
    }),
    sl('check', 'Quick check: Bt', {
      b: 'Which biocontrol agent is used to control butterfly caterpillars?',
      n: 'Quick check. It is a bacterium whose spores are sprayed on plants.',
      chk: 'bt-mcq',
    }),
    sl('concept', 'Biofertilisers', {
      b: '**Biofertilisers** are organisms that enrich the nutrient quality of the soil. The main sources are **bacteria, fungi and cyanobacteria**.',
      v: table(['Biofertiliser', 'Example', 'How it helps'], [['Symbiotic bacteria', 'Rhizobium in root nodules of legumes', 'Fix atmospheric nitrogen into organic forms'], ['Free-living bacteria', 'Azospirillum, Azotobacter', 'Fix nitrogen in the soil'], ['Fungi (mycorrhiza)', 'Glomus', 'Absorb phosphorus for the plant; give resistance to root pathogens, salinity and drought'], ['Cyanobacteria (blue-green algae)', 'Anabaena, Nostoc, Oscillatoria', 'Fix nitrogen, especially in paddy fields; add organic matter']], 'Table of biofertilisers with examples and how they help'),
      n: 'Rhizobium bacteria live in nodules on the roots of pea, gram and other legumes and fix nitrogen from the air. Azotobacter and Azospirillum do the same while living freely in soil. Mycorrhizal fungi such as Glomus help roots absorb phosphorus and resist disease and drought. In rice fields, cyanobacteria fix nitrogen and add organic matter.',
    }),
    sl('example', 'Worked example 2: does the biofertiliser work?', {
      b: `A cooperative of ${YIELD.fields} paddy farmers began adding cyanobacterial biofertiliser. Average yield rose from ${YIELD.before} to ${YIELD.after} tonnes per hectare. Find the percentage increase and suggest a reason.`,
      ul: [
        r`Step 1 — Increase $= \dfrac{${YIELD.after} - ${YIELD.before}}{${YIELD.before}} \times 100 = ${YIELD.rise}$ percent.`,
        'Step 2 — Cyanobacteria such as Anabaena and Nostoc **fix atmospheric nitrogen** in the flooded fields and add **organic matter**.',
        'Caution — other factors (weather, seed) may also differ between years; a fair test needs control plots without biofertiliser.',
      ],
      v: table(['', 'Yield (t/ha)'], [['Before', String(YIELD.before)], ['After', String(YIELD.after)], ['Increase', `${YIELD.rise} percent`]], `Worked table: yield rose ${YIELD.rise} percent`),
      n: 'Half a tonne extra on two and a half is a twenty percent increase. Cyanobacteria are well suited to paddy fields because they thrive in standing water and fix nitrogen. A careful scientist would still compare with control plots, because yields also depend on rain, seeds and other conditions.',
    }),
    sl('check', 'Quick check: mycorrhiza', {
      b: 'Judge the assertion and the reason about mycorrhizae.',
      n: 'Quick check. Which nutrient does the fungus help the plant absorb?',
      chk: 'myco-ar',
    }),
    sl('concept', 'Using antibiotics judiciously', {
      b: 'Antibiotics are among the greatest gifts of microbes, but **misuse** — taking them without prescription, for viral infections, or stopping the course early — selects **resistant bacteria**, which then spread.',
      v: table(['Good practice', 'Why'], [['Use only when prescribed by a doctor', 'Antibiotics do not act on viruses such as those causing the common cold'], ['Complete the full course', 'Stopping early lets the toughest bacteria survive and multiply'], ['Do not share or reuse old antibiotics', 'Wrong drug or dose encourages resistance'], ['Avoid unnecessary use in animals', 'Resistant bacteria can pass to people']], 'Table of good practices for antibiotic use with reasons'),
      n: 'Every time antibiotics are used, sensitive bacteria die and the few resistant ones survive. Overuse speeds up this natural selection, and infections become harder to treat. So antibiotics must be used only when a doctor prescribes them, at the right dose, for the full course. They never cure viral illnesses like colds.',
    }),
    sl('check', 'Quick check: antibiotic resistance', {
      b: 'Why does stopping a course of antibiotics early encourage resistance?',
      n: 'Quick check. Which bacteria are left alive when the course is cut short?',
      chk: 'course-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Biocontrol: ladybirds (aphids), dragonflies (mosquitoes), Bacillus thuringiensis (caterpillars), Trichoderma (root pathogens), baculoviruses (Nucleopolyhedrovirus; narrow-spectrum, IPM).',
        'Organic farming keeps pests at manageable levels in a balanced ecosystem.',
        'Biofertilisers: Rhizobium (legume nodules), Azospirillum and Azotobacter (free-living), mycorrhiza (Glomus: phosphorus, resistance), cyanobacteria (Anabaena, Nostoc, Oscillatoria in paddy).',
        'Judicious antibiotic use: only on prescription, full course, never for viral infections.',
      ],
      v: table(['Group', 'Example'], [['Biocontrol bacterium', 'Bacillus thuringiensis'], ['Biocontrol fungus', 'Trichoderma'], ['Biocontrol virus', 'Nucleopolyhedrovirus'], ['Biofertiliser fungus', 'Glomus'], ['Biofertiliser cyanobacterium', 'Anabaena']], 'Summary table of biocontrol agents and biofertilisers'),
      n: 'To recap: living organisms can control pests and diseases with little harm to the environment, and microbes can enrich soil with nitrogen and phosphorus. These are the foundations of organic farming. And antibiotics, our most valuable microbial products, must be used wisely to keep them working.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **one example for each type** of biocontrol agent and biofertiliser.',
        'Explain **why** narrow-spectrum agents suit IPM.',
        'State **two benefits of mycorrhiza** beyond phosphorus.',
        'Link antibiotic misuse to **natural selection of resistance**.',
      ],
      n: 'Exam tips. Have one example ready for each kind of biocontrol agent and biofertiliser. Explain the advantage of narrow-spectrum control. Remember the extra benefits of mycorrhiza. And explain antibiotic resistance as natural selection.',
    }),
  ],
});
