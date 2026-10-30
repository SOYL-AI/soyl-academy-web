// ch14 Chemistry in Everyday Life — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemistry in Everyday Life — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Drugs and their targets',
      r`**Drugs:** chemicals of low molecular mass (about 100–500 u) that interact with macromolecular targets to give a biological response. **Medicines:** drugs with a therapeutic effect, used for diagnosis, prevention or treatment; most are harmful in larger doses, so they are used only under medical supervision.

**Classification:** by pharmacological effect (analgesics, antiseptics), by drug action on a biochemical process (antihistamines), by chemical structure (sulphonamides), by molecular target (drugs acting on enzymes, receptors).

**Enzymes as targets:** drugs may block the active site (**competitive inhibitors**), bind at an **allosteric** site to change the active site’s shape, or bind covalently (**irreversible** inhibition).

**Receptors as targets:** membrane proteins that receive chemical messengers. **Agonists** mimic the messenger; **antagonists** block the receptor.`,
      [kt('Drug', 'A low-molecular-mass chemical that interacts with a macromolecular target in the body and produces a biological response.'), kt('Competitive inhibitor', 'A drug that competes with the natural substrate for the active site of an enzyme.'), kt('Antagonist', 'A drug that binds to a receptor and blocks the natural messenger without activating it.'), kt('Agonist', 'A drug that mimics the natural messenger and switches a receptor on.')],
      [],
      V.enzyme,
      [1],
      [V.receptor],
    ),
    sec(
      '2. Therapeutic classes I: antacids, antihistamines, tranquilisers, analgesics',
      r`- **Antacids:** NaHCO₃, Mg(OH)₂, Al(OH)₃ neutralise excess acid ($\ce{Mg(OH)2 + 2HCl -> MgCl2 + 2H2O}$). Insoluble bases are preferred: excess soluble base makes the stomach alkaline and triggers more acid. **H₂-receptor blockers** (cimetidine, ranitidine) stop histamine from stimulating acid release.
- **Antihistamines:** brompheniramine, terfenadine — block histamine receptors in allergy (they do not affect acid secretion).
- **Tranquilisers:** for stress and mental illness — equanil (depression, hypertension); barbiturates (veronal, amytal, seconal, nembutal) as hypnotics.
- **Analgesics:** relieve pain without impairing consciousness. Non-narcotic: aspirin (also antipyretic, anti-inflammatory, prevents platelet clotting), paracetamol. Narcotic: morphine, codeine (severe pain; sleep and addiction).`,
      [kt('Antacid', 'A substance that neutralises excess stomach acid.'), kt('Tranquiliser', 'A drug acting on the central nervous system to relieve stress, anxiety or mental illness.'), kt('Analgesic', 'A drug that reduces pain without causing loss of consciousness.')],
      [],
      table(['Class', 'Examples'], [['Antacids', 'Mg(OH)₂, Al(OH)₃, cimetidine, ranitidine'], ['Antihistamines', 'Brompheniramine, terfenadine'], ['Tranquilisers', 'Equanil, veronal, seconal'], ['Non-narcotic analgesics', 'Aspirin, paracetamol'], ['Narcotic analgesics', 'Morphine, codeine']], 'Table of drug classes with examples'),
      [1],
    ),
    sec(
      '3. Therapeutic classes II: antimicrobials and antifertility drugs',
      r`**Antimicrobials** destroy or check microbes: antibacterials, antifungals, antivirals, antiparasitics. Early synthetic antimicrobials: **salvarsan** (arsenic compound, for syphilis), **prontosil** (converted in the body to **sulphanilamide**; led to the sulpha drugs).

**Antibiotics:** chemicals (originally from micro-organisms, now also synthesised) that kill or inhibit microbes.
- **Bactericidal** (kill): penicillin, aminoglycosides, ofloxacin. **Bacteriostatic** (stop growth): erythromycin, tetracycline, chloramphenicol.
- **Broad-spectrum** (many bacteria): ampicillin, amoxycillin, chloramphenicol, vancomycin, ofloxacin. **Narrow-spectrum**: penicillin G. **Limited spectrum**: one organism or disease.

**Antiseptics** (living tissue): Dettol (chloroxylenol + terpineol), bithionol, iodine tincture (2–3% I₂ in alcohol–water), iodoform, boric acid (eyes). **Disinfectants** (non-living objects): 1% phenol, chlorine (0.2–0.4 ppm in water), low concentrations of SO₂. 0.2% phenol is an antiseptic.

**Antifertility drugs:** synthetic progesterone derivatives with oestrogen derivatives, e.g. norethindrone, ethynylestradiol (novestrol).`,
      [kt('Bactericidal', 'Describes an antibiotic that kills bacteria.'), kt('Bacteriostatic', 'Describes an antibiotic that stops the growth of bacteria.'), kt('Broad-spectrum antibiotic', 'An antibiotic effective against a wide range of bacteria.'), kt('Antiseptic', 'A chemical applied to living tissue to kill or prevent growth of micro-organisms.'), kt('Disinfectant', 'A chemical applied to non-living objects to kill micro-organisms.')],
      [],
      table(['Antiseptic', 'Disinfectant'], [['Living tissue', 'Non-living objects'], ['0.2% phenol, Dettol, iodine tincture', '1% phenol, chlorine in water'], ['Milder', 'Stronger']], 'Table contrasting antiseptics and disinfectants'),
      [1],
    ),
    sec(
      '4. Artificial sweetening agents',
      r`Natural sweeteners (sucrose, fructose) add calories. **Artificial sweeteners** give sweetness with little or no energy — useful for diabetics and for weight control.

| Sweetener | Sweetness (sucrose = 1) | Note |
|---|---|---|
| Aspartame | 100 | Unstable at cooking temperature; cold foods and soft drinks only |
| Saccharin | 550 | First popular sweetener; excreted unchanged in urine |
| Sucralose | 600 | Trichloro derivative of sucrose; heat-stable; no calories |
| Alitame | 2000 | High potency; sweetness hard to control |

Mass needed for equal sweetness $=$ mass of sucrose $\div$ relative sweetness.`,
      [kt('Artificial sweetener', 'A synthetic chemical that tastes sweet but provides little or no energy.')],
      [],
      table(['Sweetener', 'Heat-stable?'], [['Aspartame', 'No'], ['Saccharin', 'Yes'], ['Sucralose', 'Yes']], 'Table of sweeteners and their stability on heating'),
      [2],
    ),
    sec(
      '5. Food preservatives and antioxidants',
      r`**Food additives** preserve food, improve appeal or add nutrients (colours, flavours, sweeteners, emulsifiers, flour improvers, antioxidants, preservatives, vitamins and minerals). Apart from nutritional supplements, they have no nutritive value.

**Preservatives** prevent microbial spoilage: table salt, sugar and vegetable oils (traditional); **sodium benzoate** (small amounts; metabolised to hippuric acid and excreted), salts of sorbic acid and propanoic acid.

**Antioxidants** slow oxidation (rancidity) of fats by reacting with oxygen or free radicals more readily than the food: **BHT**, **BHA** (often with ascorbic or citric acid); **SO₂** and sulfites in wines, beers, sugar syrups and dried fruits.`,
      [kt('Preservative', 'A substance that prevents spoilage of food by micro-organisms.'), kt('Antioxidant', 'A substance that slows the oxidation of food, preventing rancidity.'), kt('Rancidity', 'Spoiling of fats and oils by oxidation, giving unpleasant smell and taste.')],
      [],
      table(['Additive', 'Example', 'Action'], [['Preservative', 'Sodium benzoate', 'Inhibits microbial growth'], ['Preservative', 'Salt, sugar', 'Dehydrate microbes by osmosis'], ['Antioxidant', 'BHA, BHT', 'React with O₂ or radicals first']], 'Table of preservatives and antioxidants with their actions'),
      [2],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Treating antiseptics and disinfectants as different chemicals rather than different uses or concentrations.
- Calling antihistamines antacids (they act on different histamine receptors).
- Mixing up bactericidal and bacteriostatic examples.
- Saying aspartame can be used in baked foods.
- Confusing preservatives (stop microbes) with antioxidants (stop oxidation).

**How marks are usually awarded**
- 1-mark items: class of a named drug or additive, one example.
- Explanations (2–3 marks): mode of action (enzyme, receptor), reason for a choice, with an example.
- Calculations: antacid neutralisation, sweetener equivalents, preservative limits.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Drug vs medicine?', 'A medicine is a drug used for a therapeutic purpose (diagnosis, prevention, treatment).', 'definition', 1),
    fc(2, 'Molar mass range of most drugs?', 'About 100–500 u.', 'fact', 1),
    fc(3, 'Competitive inhibitor?', 'A drug that competes with the substrate for an enzyme’s active site.', 'definition', 1),
    fc(4, 'Allosteric site?', 'A site other than the active site where a drug binds and changes the active site’s shape.', 'definition', 1),
    fc(5, 'Agonist vs antagonist?', 'Agonist mimics the messenger and activates a receptor; antagonist blocks it.', 'concept', 1),
    fc(6, 'Two simple antacids?', 'Mg(OH)₂ and Al(OH)₃ (also NaHCO₃).', 'example', 1),
    fc(7, 'Why are insoluble bases better antacids?', 'Excess soluble base makes the stomach alkaline and triggers more acid secretion.', 'concept', 1),
    fc(8, 'Cimetidine and ranitidine?', 'Antacids that block histamine at stomach receptors, reducing acid release.', 'fact', 1),
    fc(9, 'Two antihistamines?', 'Brompheniramine, terfenadine.', 'example', 1),
    fc(10, 'Tranquiliser for depression and hypertension?', 'Equanil.', 'fact', 1),
    fc(11, 'Barbiturates are used as…?', 'Hypnotics (sleep-producing tranquilisers), e.g. veronal, seconal.', 'fact', 1),
    fc(12, 'Non-narcotic analgesics?', 'Aspirin, paracetamol.', 'example', 1),
    fc(13, 'Extra uses of aspirin?', 'Reduces fever and inflammation; prevents platelet clotting.', 'fact', 1),
    fc(14, 'Narcotic analgesics?', 'Morphine, codeine — for severe pain; addictive.', 'fact', 1),
    fc(15, 'Bactericidal examples?', 'Penicillin, aminoglycosides, ofloxacin.', 'example', 1),
    fc(16, 'Bacteriostatic examples?', 'Erythromycin, tetracycline, chloramphenicol.', 'example', 1),
    fc(17, 'Broad-spectrum antibiotic?', 'Effective against many bacteria, e.g. chloramphenicol, ampicillin.', 'definition', 1),
    fc(18, 'Salvarsan?', 'Arsenic-based early synthetic drug for syphilis.', 'fact', 1),
    fc(19, 'Prontosil?', 'Converted in the body to sulphanilamide, the active antibacterial.', 'fact', 1),
    fc(20, 'Antiseptic vs disinfectant?', 'Antiseptic: living tissue. Disinfectant: non-living objects.', 'concept', 1),
    fc(21, 'Phenol as antiseptic and disinfectant?', '0.2% antiseptic; 1% disinfectant.', 'fact', 1),
    fc(22, 'Dettol contains…?', 'Chloroxylenol and terpineol.', 'fact', 1),
    fc(23, 'Antifertility drugs?', 'Synthetic steroid hormones, e.g. norethindrone, ethynylestradiol.', 'fact', 1),
    fc(24, 'Relative sweetness of saccharin?', 'About 550 times sucrose.', 'fact', 2),
    fc(25, 'Why is aspartame used only in cold foods?', 'It decomposes at cooking temperatures.', 'concept', 2),
    fc(26, 'Sucralose?', 'Trichloro derivative of sucrose, 600 times as sweet, heat-stable, no calories.', 'fact', 2),
    fc(27, 'Sweetest of the four listed sweeteners?', 'Alitame (about 2000).', 'fact', 2),
    fc(28, 'Sodium benzoate in the body?', 'Metabolised to hippuric acid and excreted.', 'fact', 2),
    fc(29, 'How do salt and sugar preserve food?', 'High concentrations draw water out of microbes by osmosis.', 'concept', 2),
    fc(30, 'BHA and BHT are…?', 'Antioxidants that delay rancidity of fats and oils.', 'fact', 2),
    fc(31, 'Exam tip: preservatives vs antioxidants', 'Preservatives stop microbes; antioxidants stop oxidation.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
