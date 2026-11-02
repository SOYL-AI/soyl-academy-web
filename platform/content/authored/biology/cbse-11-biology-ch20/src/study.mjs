// ch20 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { PHYS, GROSS, PH } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Digestion and Absorption — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The alimentary canal',
      `*This chapter is CBSE reading material for formative (school-based) assessment only; it is not examined in a board paper.*

Food (carbohydrates, proteins, fats) must be broken into simple, absorbable substances by **digestion**, using mechanical and biochemical methods. The digestive system consists of the **alimentary canal** and the **associated glands**.

**Mouth and teeth.** The mouth leads to the **buccal (oral) cavity**. Each tooth is embedded in a socket of the jaw bone (**thecodont**). Humans form two sets of teeth — milk (deciduous) teeth replaced by permanent teeth (**diphyodont**). An adult has **32 permanent teeth** of four types (**heterodont**): incisors (I), canines (C), premolars (PM) and molars (M). Their arrangement in each half of the upper and lower jaw, in the order I, C, PM, M, is the **dental formula, 2123/2123** (8 per half jaw × 4 = 32). The hard chewing surface is **enamel**. The **tongue** is a freely movable muscular organ attached to the floor of the oral cavity by the **frenulum**; its upper surface has **papillae**, some bearing taste buds.

**Pharynx and oesophagus.** The short pharynx is a **common passage for food and air**; the oesophagus and trachea open into it. The cartilaginous **epiglottis** prevents food entering the glottis during swallowing. The thin, long **oesophagus** passes through the neck, thorax and diaphragm into the stomach; the **gastro-oesophageal sphincter** regulates its opening.

**Stomach.** A J-shaped bag in the upper left abdomen with a **cardiac** portion (where the oesophagus opens), a **fundic** region and a **pyloric** portion that opens into the small intestine, guarded by the **pyloric sphincter**.

**Small intestine.** C-shaped **duodenum**, long coiled **jejunum** and highly coiled **ileum**, which opens into the large intestine.

**Large intestine.** The **caecum**, a small blind sac with some symbiotic micro-organisms, from which the vestigial **vermiform appendix** arises; the **colon** — ascending, transverse, descending and sigmoid; and the **rectum**, opening out through the **anus**.`,
      [kt('Thecodont', 'Teeth embedded in sockets of the jaw bone.'), kt('Diphyodont', 'Having two sets of teeth in a lifetime: milk and permanent.'), kt('Heterodont', 'Having teeth of different types.'), kt('Dental formula', 'Number of each type of tooth (I, C, PM, M) in one half of the upper and lower jaw; 2123/2123 in adult humans.')],
      V.canal,
      [1],
      [V.teeth],
    ),
    sec(
      '2. The wall of the gut, villi and microvilli',
      `From the oesophagus to the rectum the wall has **four layers**:
- **Serosa** — outermost, a thin **mesothelium** (epithelium of visceral organs) with some connective tissue.
- **Muscularis** — smooth muscle, usually an **inner circular** and an **outer longitudinal** layer; an oblique layer in some regions.
- **Sub-mucosa** — loose connective tissue with **nerves, blood and lymph vessels**; in the duodenum it also has glands (Brunner’s glands).
- **Mucosa** — lines the lumen; forms irregular folds (**rugae**) in the stomach and finger-like **villi** in the small intestine. Cells lining the villi have **microvilli**, giving a **brush border**; these modifications increase the surface area enormously. Each villus has a network of **capillaries** and a large lymph vessel, the **lacteal**. **Goblet cells** secrete mucus for lubrication. The mucosa forms **gastric glands** in the stomach and **crypts** (crypts of Lieberkuhn) between the bases of villi in the intestine.

All four layers show modifications in different parts of the canal. (A simple model in this chapter multiplies the surface by 3 for folds, 10 for villi and 20 for microvilli, giving 600 times; published estimates vary.)`,
      [kt('Rugae', 'Irregular folds of the mucosa in the stomach.'), kt('Villi', 'Finger-like foldings of the mucosa in the small intestine.'), kt('Microvilli', 'Microscopic projections of villus cells forming a brush border.'), kt('Lacteal', 'The large lymph vessel inside each villus, which absorbs fats.')],
      V.wall,
      [1],
      [V.villus],
    ),
    sec(
      '3. Digestive glands',
      `**Salivary glands.** Saliva is mainly produced by three pairs: the **parotids** (cheek), the **sub-maxillary or sub-mandibular** glands (lower jaw) and the **sub-linguals** (below the tongue).

**Liver.** The **largest gland** of the body, about **1.2 to 1.5 kg** in an adult human, situated just below the diaphragm, with **two lobes**. **Hepatic lobules**, with hepatic cells arranged in cords, are its structural and functional units; each lobule is covered by a thin connective tissue sheath, **Glisson’s capsule**. Bile secreted by hepatic cells passes through the **hepatic ducts** and is stored and concentrated in the **gall bladder**. The **cystic duct** of the gall bladder and the hepatic duct form the **common bile duct**.

**Pancreas.** A compound (exocrine and endocrine) elongated organ between the limbs of the C-shaped duodenum. The **exocrine** part secretes alkaline **pancreatic juice** with enzymes; the **endocrine** part secretes the hormones **insulin and glucagon**.

The bile duct and the **pancreatic duct** open together into the duodenum as the **common hepato-pancreatic duct**, guarded by the **sphincter of Oddi**.`,
      [kt('Hepatic lobule', 'The structural and functional unit of the liver, covered by Glisson’s capsule.'), kt('Common bile duct', 'Duct formed by the cystic duct and the hepatic duct.'), kt('Sphincter of Oddi', 'Sphincter guarding the common hepato-pancreatic duct where it opens into the duodenum.')],
      V.ducts,
      [1],
    ),
    sec(
      '4. Digestion of food',
      `**Mouth.** Teeth and tongue, with saliva, **masticate** and mix food; mucus helps form a **bolus**, which is swallowed (**deglutition**) and moved down the oesophagus by **peristalsis**; the gastro-oesophageal sphincter controls its entry into the stomach. Saliva contains electrolytes (sodium, potassium, chloride and bicarbonate ions), **salivary amylase** and **lysozyme**. About **30 percent of starch** is hydrolysed in the mouth by salivary amylase (optimum **pH ${PH.saliva}**) into the disaccharide **maltose**. Lysozyme is an antibacterial agent.

**Stomach.** Gastric glands have **mucus neck cells** (mucus), **peptic or chief cells** (pepsinogen) and **parietal or oxyntic cells** (HCl and **intrinsic factor**, needed for absorption of vitamin B12). Food is stored for **4 to 5 hours** and, churned with acidic gastric juice, becomes **chyme**. HCl converts **pepsinogen** into **pepsin**, which converts proteins into **proteoses and peptones**; HCl provides the optimal **pH ${PH.stomach}**. Mucus and bicarbonates protect the mucosa from excoriation by the acid. **Rennin** in the gastric juice of infants helps digest milk proteins; small amounts of lipases are also secreted.

**Small intestine.** Muscular movements mix food with **bile, pancreatic juice and intestinal juice**.
- **Bile** has bile pigments (bilirubin, biliverdin), bile salts, cholesterol and phospholipids but **no enzymes**; it **emulsifies fats** into very small **micelles** and **activates lipases**.
- **Pancreatic juice** has inactive **trypsinogen, chymotrypsinogen, procarboxypeptidases**, and **amylases, lipases and nucleases**. **Enterokinase** from the intestinal mucosa activates trypsinogen to **trypsin**, which activates the other enzymes.
- **Succus entericus** (secretions of the brush border cells and goblet cells) contains disaccharidases (e.g. maltase), dipeptidases, lipases and nucleosidases. Mucus and bicarbonates from the pancreas give an alkaline medium (**pH ${PH.intestine}**); Brunner’s glands of the sub-mucosa help.

Breakdown of biomacromolecules occurs mainly in the **duodenum**; the simple products are absorbed in the **jejunum and ileum**. No significant digestion occurs in the **large intestine**. Gut activities are under **neural and hormonal control**: the sight, smell or presence of food stimulates saliva, and local hormones from the gastric and intestinal mucosa control the secretion of digestive juices.`,
      [kt('Bolus', 'Chewed food stuck together by mucus, ready to be swallowed.'), kt('Chyme', 'Food mixed with acidic gastric juice in the stomach.'), kt('Enterokinase', 'An intestinal enzyme that activates trypsinogen to trypsin.'), kt('Succus entericus', 'Intestinal juice: secretions of brush border and goblet cells.')],
      table(['Substrate', 'Enzyme (site)', 'Product'], [['Starch', 'Salivary amylase (mouth); pancreatic amylase (duodenum)', 'Maltose and other disaccharides'], ['Maltose; lactose; sucrose', 'Maltase; lactase; sucrase (succus entericus)', 'Glucose + glucose; glucose + galactose; glucose + fructose'], ['Proteins', 'Pepsin (stomach)', 'Proteoses and peptones'], ['Proteins, peptones, proteoses', 'Trypsin, chymotrypsin, carboxypeptidase (duodenum)', 'Dipeptides'], ['Dipeptides', 'Dipeptidases (succus entericus)', 'Amino acids'], ['Fats', 'Lipases with bile (duodenum, succus entericus)', 'Di- and monoglycerides, then fatty acids and glycerol'], ['Nucleic acids', 'Nucleases, nucleotidases, nucleosidases', 'Nucleotides, nucleosides, then sugars and bases']], 'Table of digestive enzymes with substrates, sites and products'),
      [1],
    ),
    sec(
      '5. Absorption, assimilation and egestion',
      `**Absorption** is the process by which end products of digestion pass through the intestinal mucosa into the **blood or lymph**, by passive, active or facilitated transport.
- **Simple diffusion:** small amounts of glucose, amino acids and chloride ions, down a concentration gradient.
- **Facilitated transport:** fructose and some amino acids, with the help of carrier ions such as sodium ions.
- **Osmosis:** water, along the osmotic gradient.
- **Active transport:** against the concentration gradient, using energy — amino acids, glucose, sodium ions.
- **Fats:** fatty acids and glycerol are insoluble, so they form **micelles**, move into the mucosa, are re-formed into protein-coated **chylomicrons**, and pass into the **lacteals**, which release them into the blood.

**Where:** mouth (certain drugs through the mucosa and under the tongue); stomach (water, simple sugars, alcohol); **small intestine** (principal organ: glucose, fructose, fatty acids, glycerol, amino acids); large intestine (water, some minerals and drugs).

**Assimilation** is the use of absorbed substances by the tissues. The large intestine also secretes **mucus**, which sticks waste particles together and lubricates them. Undigested material enters the caecum through the **ileo-caecal valve** (preventing back flow) and is stored in the rectum. Faeces there start a neural reflex causing an urge to remove them; **defaecation** (egestion) is a **voluntary** process carried out by a **mass peristaltic movement**.`,
      [kt('Facilitated transport', 'Absorption with the help of carrier ions such as sodium ions.'), kt('Chylomicrons', 'Protein-coated fat globules formed in the intestinal mucosa and carried into lacteals.'), kt('Assimilation', 'Use of absorbed substances by the tissues.'), kt('Defaecation', 'Voluntary egestion of faeces through the anus by a mass peristaltic movement.')],
      flow('LR', [['f', 'Fatty acids and glycerol'], ['m', 'Micelles'], ['c', 'Chylomicrons'], ['l', 'Lacteals'], ['b', 'Blood']], [['f', 'm'], ['m', 'c'], ['c', 'l'], ['l', 'b']], 'Flow of fat absorption from micelles to chylomicrons, lacteals and blood'),
      [1],
    ),
    sec(
      '6. Nutritional and digestive disorders',
      `**Calorific value of food.** Energy in food is measured in kilocalories (1 kcal = 4.184 kJ). Gross calorific values measured in a bomb calorimeter are about **${GROSS.carb}** (carbohydrate), **${GROSS.protein}** (protein) and **${GROSS.fat}** (fat) kcal per g; the energy the body actually obtains, the **physiological fuel values**, are about **${PHYS.carb}, ${PHYS.protein} and ${PHYS.fat}** kcal per g. (Values are rounded and vary slightly between sources.)

**Protein–energy malnutrition (PEM)** affects infants and children whose diets lack proteins and total calories:
- **Kwashiorkor** — protein deficiency with adequate calories, often when mother’s milk is replaced too early by a high-calorie, low-protein diet: wasting of muscles, thinning of limbs, failure of growth and brain development, extensive **oedema** and swelling.
- **Marasmus** — simultaneous deficiency of **proteins and calories**, usually in infants under a year when mother’s milk is replaced too early by food poor in both: impaired growth, extreme **emaciation**, thin limbs, dry, thin and wrinkled skin; growth and brain development impaired.

**Digestive disorders.** Inflammation of the intestinal tract from **bacterial or viral infections** is the most common ailment; intestinal parasites (tapeworm, roundworm, threadworm, hookworm, pinworm) also cause infection.
- **Jaundice:** the liver is affected; skin and eyes turn yellow from deposited **bile pigments**.
- **Vomiting:** ejection of stomach contents through the mouth; a **reflex** controlled by the **vomit centre in the medulla**; nausea usually precedes it.
- **Diarrhoea:** abnormal frequency of bowel movement and increased liquidity of faeces; **reduces absorption** of food.
- **Constipation:** faeces retained in the rectum as bowel movements occur irregularly.
- **Indigestion:** food not properly digested, a feeling of fullness; caused by inadequate enzyme secretion, anxiety, food poisoning, over-eating and spicy food.`,
      [kt('Kwashiorkor', 'Protein deficiency with adequate calories in children; oedema and wasting.'), kt('Marasmus', 'Combined protein and calorie deficiency in infants; extreme emaciation.'), kt('Jaundice', 'Yellowing of skin and eyes from deposited bile pigments when the liver is affected.')],
      table(['Disorder', 'Key feature'], [['Jaundice', 'Yellow skin and eyes; liver affected'], ['Vomiting', 'Reflex from the vomit centre in the medulla'], ['Diarrhoea', 'Frequent, liquid faeces; less absorption'], ['Constipation', 'Faeces retained in the rectum'], ['Indigestion', 'Feeling of fullness'], ['Kwashiorkor', 'Protein lack; oedema'], ['Marasmus', 'Protein and calorie lack; emaciation']], 'Table of nutritional and digestive disorders and their key features'),
      [2],
    ),
  ],
  exam_tips_md: `**Note:** this chapter is CBSE reading material for formative (school-based) assessment only; the items here follow the CBSE school-test pattern.

**Common mistakes**
- Writing the dental formula for the whole jaw (it is for one half of each jaw: 2123/2123, 32 teeth).
- Saying bile contains enzymes (it has none; it emulsifies fats and activates lipases).
- Saying pepsinogen is activated by enterokinase (HCl activates pepsinogen; enterokinase activates trypsinogen).
- Saying fats are absorbed directly into blood capillaries (they go as chylomicrons into lacteals).
- Placing most digestion in the large intestine (no significant digestion occurs there).
- Mixing up kwashiorkor (protein lack, oedema) and marasmus (protein and calorie lack, emaciation).

**How marks are usually awarded**
- 1-mark items: name a gland, enzyme, product, region, layer, duct or disorder.
- 2–3-mark answers: dental features; gastric gland cells; activation of trypsin; role of bile; absorption mechanisms; fat absorption; two disorders compared.
- 5-mark answers: the alimentary canal and its wall; the digestive glands; digestion of food; absorption, assimilation and egestion.
- Case-based items: dental charts, energy in a snack, a blocked bile duct or a malnutrition survey, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Thecodont, diphyodont, heterodont?', 'Teeth in sockets; two sets in life; teeth of different types.', 'definition', 1),
    fc(2, 'Adult human dental formula?', '2123/2123: 32 teeth.', 'formula', 1),
    fc(3, 'What attaches the tongue to the floor of the mouth?', 'The frenulum.', 'fact', 1),
    fc(4, 'What stops food entering the windpipe?', 'The epiglottis closes the glottis.', 'fact', 1),
    fc(5, 'Three regions of the stomach?', 'Cardiac, fundic, pyloric.', 'fact', 1),
    fc(6, 'Three regions of the small intestine?', 'Duodenum, jejunum, ileum.', 'fact', 1),
    fc(7, 'Parts of the large intestine?', 'Caecum (with vermiform appendix), colon, rectum.', 'fact', 1),
    fc(8, 'Four layers of the gut wall, outside in?', 'Serosa, muscularis, sub-mucosa, mucosa.', 'fact', 1),
    fc(9, 'What gives the brush border?', 'Microvilli on the cells lining the villi.', 'concept', 1),
    fc(10, 'What does a lacteal absorb?', 'Fats, as chylomicrons.', 'fact', 1),
    fc(11, 'Three pairs of salivary glands?', 'Parotids, sub-maxillary (sub-mandibular), sub-linguals.', 'fact', 1),
    fc(12, 'Mass of the adult liver?', 'About 1.2 to 1.5 kg.', 'fact', 1),
    fc(13, 'Sheath covering each hepatic lobule?', 'Glisson’s capsule.', 'fact', 1),
    fc(14, 'Where is bile stored?', 'In the gall bladder.', 'fact', 1),
    fc(15, 'What guards the hepato-pancreatic duct?', 'The sphincter of Oddi.', 'fact', 1),
    fc(16, 'Share of starch digested in the mouth?', 'About 30 percent, to maltose.', 'fact', 1),
    fc(17, 'Antibacterial agent in saliva?', 'Lysozyme.', 'fact', 1),
    fc(18, 'Secretions of parietal (oxyntic) cells?', 'HCl and intrinsic factor.', 'fact', 1),
    fc(19, 'What activates pepsinogen?', 'Hydrochloric acid.', 'fact', 1),
    fc(20, 'Enzyme in infants for milk proteins?', 'Rennin.', 'fact', 1),
    fc(21, 'What activates trypsinogen?', 'Enterokinase from the intestinal mucosa.', 'fact', 1),
    fc(22, 'Does bile contain enzymes?', 'No: it emulsifies fats and activates lipases.', 'concept', 1),
    fc(23, 'Optimum pH: saliva, stomach, intestine?', '6.8, 1.8, 7.8.', 'fact', 1),
    fc(24, 'Lactase products?', 'Glucose and galactose.', 'fact', 1),
    fc(25, 'Fructose is absorbed by…?', 'Facilitated transport with carrier ions such as sodium ions.', 'fact', 1),
    fc(26, 'Route of fat absorption?', 'Micelles → mucosa → chylomicrons → lacteals → blood.', 'concept', 1),
    fc(27, 'Main role of the large intestine?', 'Absorbs water, some minerals and drugs; secretes mucus.', 'fact', 1),
    fc(28, 'Physiological fuel values?', 'Carbohydrate 4, protein 4, fat 9 kcal per g.', 'fact', 2),
    fc(29, 'Kwashiorkor versus marasmus?', 'Protein lack with oedema; protein and calorie lack with emaciation.', 'concept', 2),
    fc(30, 'Cause of yellow skin in jaundice?', 'Deposits of bile pigments; liver affected.', 'fact', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
