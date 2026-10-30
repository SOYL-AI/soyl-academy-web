// ch13 Polymers — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Polymers — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Polymers and their classification',
      r`**Polymer:** a macromolecule (about 10³–10⁷ g mol⁻¹) of many repeating structural units from **monomers**; **polymerisation** joins them. **Degree of polymerisation** = number of repeating units = polymer molar mass ÷ repeating-unit mass.

- **Source:** natural (proteins, cellulose, starch, natural rubber); semi-synthetic (cellulose acetate/rayon, cellulose nitrate, vulcanised rubber); synthetic (polythene, nylon, Buna-S).
- **Structure:** linear (HDPE, PVC), branched (LDPE), cross-linked/network (Bakelite, melamine).
- **Mode of polymerisation:** addition, condensation.
- **Molecular forces:** elastomers (weakest; rubber, Buna-S, neoprene), fibres (strongest, H-bonds; nylon 6,6, terylene), thermoplastics (intermediate; polythene, PVC, polystyrene), thermosetting (cross-link on heating, cannot be remelted; Bakelite, melamine).
- **Homopolymer:** one monomer (polythene, PVC, nylon 6). **Copolymer:** two or more monomers (Buna-S, Buna-N, nylon 6,6, terylene).`,
      [kt('Monomer', 'A small molecule that joins with many others to form a polymer.'), kt('Degree of polymerisation', 'The number of repeating units in a polymer chain.'), kt('Thermosetting polymer', 'A polymer that becomes permanently hard on heating because of extensive cross-linking.'), kt('Copolymer', 'A polymer formed from two or more different monomers.')],
      [fm(r`\text{degree of polymerisation} = \frac{M_\text{polymer}}{M_\text{repeating unit}}`, 'Degree of polymerisation')],
      V.structures,
      [1],
    ),
    sec(
      '2. Addition and condensation polymerisation',
      r`**Addition (chain-growth):** unsaturated monomers add without loss of any molecule; repeating unit = monomer composition. **Free radical mechanism** (initiator: benzoyl peroxide): initiation (R• adds to C=C), propagation (radical adds monomer after monomer), termination (two radicals combine).

**Condensation (step-growth):** bifunctional monomers react with loss of a small molecule (H₂O, HCl, CH₃OH): nylon 6,6, terylene, Bakelite.

| | Addition | Condensation |
|---|---|---|
| Monomer | Unsaturated | Bifunctional |
| By-product | None | H₂O, HCl, etc. |
| Growth | Chain | Step |
| Examples | Polythene, PVC, Teflon, PAN | Nylon 6,6, terylene, Bakelite |`,
      [kt('Addition polymerisation', 'Repeated addition of unsaturated monomers without loss of any small molecule.'), kt('Condensation polymerisation', 'Repeated reaction of bifunctional monomers with loss of a small molecule such as water.'), kt('Initiator', 'A substance, such as benzoyl peroxide, that forms free radicals to start chain polymerisation.')],
      [],
      table(['Step', 'What happens'], [['Initiation', 'Peroxide → radicals; radical adds to monomer'], ['Propagation', 'Radical adds monomer after monomer'], ['Termination', 'Two radicals combine']], 'Table of the three steps of free radical polymerisation'),
      [1],
    ),
    sec(
      '3. Important addition and condensation polymers',
      r`- **LDPE:** ethene, 1000–2000 atm, 350–570 K, peroxide initiator; branched; carry bags, squeeze bottles, insulation.
- **HDPE:** ethene, 333–343 K, 6–7 atm, Ziegler–Natta catalyst (triethylaluminium + TiCl₄); linear; buckets, pipes.
- **Teflon:** CF₂=CF₂, free radical or persulfate catalyst, high pressure; inert; non-stick coatings.
- **Polyacrylonitrile:** CH₂=CHCN, peroxide catalyst; acrylic fibres (orlon, acrilan).
- **Nylon 6,6:** H₂N(CH₂)₆NH₂ + HOOC(CH₂)₄COOH, high temperature; polyamide; bristles, fabrics. Repeating unit C₁₂H₂₂N₂O₂, $M = 116 + 146 - 36 = 226$.
- **Nylon 6:** caprolactam heated with water; tyre cords, ropes.
- **Terylene (Dacron):** ethylene glycol + terephthalic acid, 420–460 K, zinc acetate–antimony trioxide catalyst; polyester; fabrics, safety belts.
- **Bakelite:** phenol + formaldehyde → hydroxymethylphenols → Novolac (linear) → cross-linked Bakelite; combs, switches, handles.
- **Melamine–formaldehyde:** unbreakable crockery.`,
      [kt('Ziegler–Natta catalyst', 'Triethylaluminium with titanium tetrachloride, used to make linear high density polythene.'), kt('Polyamide', 'A polymer whose units are joined by amide links, –CO–NH–, e.g. nylons.'), kt('Polyester', 'A polymer whose units are joined by ester links, e.g. terylene.')],
      [],
      table(['Polymer', 'Monomer(s)', 'Mode'], [['LDPE, HDPE', 'Ethene', 'Addition'], ['Teflon', 'Tetrafluoroethene', 'Addition'], ['PAN', 'Acrylonitrile', 'Addition'], ['Nylon 6,6', 'Hexamethylenediamine + adipic acid', 'Condensation'], ['Nylon 6', 'Caprolactam', 'Condensation (ring opening)'], ['Terylene', 'Ethylene glycol + terephthalic acid', 'Condensation'], ['Bakelite', 'Phenol + formaldehyde', 'Condensation']], 'Table of important polymers with monomers and mode of polymerisation'),
      [1],
    ),
    sec(
      '4. Rubber',
      r`**Natural rubber:** cis-1,4-polyisoprene from latex; coiled chains, weak van der Waals forces → elastic. Drawbacks: soft and sticky above about 335 K, brittle below about 283 K, swells in non-polar solvents, poor abrasion resistance.

**Vulcanisation:** heating raw rubber with sulfur (and an additive such as zinc oxide) at 373–415 K; sulfur cross-links form at the reactive allylic sites, making rubber stiffer, stronger and elastic over a wider temperature range (tyre rubber about 5% sulfur).

**Synthetic rubbers:** neoprene (polychloroprene; homopolymer; oil resistant: hoses, gaskets); Buna-N (butadiene + acrylonitrile; copolymer; resists petrol: oil seals, tank linings); Buna-S (butadiene + styrene; copolymer; tough: tyres, soles).`,
      [kt('Vulcanisation', 'Heating rubber with sulfur to form sulfur cross-links between chains.'), kt('Elastomer', 'A rubber-like polymer that can be stretched and returns to its shape.')],
      [],
      V.vulcan,
      [1],
    ),
    sec(
      '5. Molecular mass and biodegradable polymers',
      r`Polymer samples contain chains of different lengths, so averages are used:
- **Number-average** $\overline{M}_n = \sum N_iM_i / \sum N_i$ (osmotic pressure).
- **Weight-average** $\overline{M}_w = \sum N_iM_i^2 / \sum N_iM_i$ (light scattering, ultracentrifugation).
- **PDI** $= \overline{M}_w / \overline{M}_n$: 1 for monodisperse natural polymers; greater than 1 for synthetic polymers.

**Biodegradable polymers** contain groups (ester, amide) that micro-organisms can hydrolyse: **PHBV** (3-hydroxybutanoic + 3-hydroxypentanoic acid; packaging, orthopaedic devices, controlled drug release); **nylon-2–nylon 6** (glycine + aminocaproic acid).`,
      [kt('Polydispersity index', 'Ratio of weight-average to number-average molar mass, Mw/Mn.'), kt('Biodegradable polymer', 'A polymer that micro-organisms can break down in the environment.')],
      [fm(r`\overline{M}_n = \frac{\sum N_i M_i}{\sum N_i}`, 'Number-average molar mass'), fm(r`\overline{M}_w = \frac{\sum N_i M_i^2}{\sum N_i M_i}`, 'Weight-average molar mass'), fm(r`\mathrm{PDI} = \frac{\overline{M}_w}{\overline{M}_n}`, 'Polydispersity index')],
      table(['Polymer', 'Biodegradable?', 'Why'], [['Polythene', 'No', 'Only C–C and C–H bonds'], ['PHBV', 'Yes', 'Ester links hydrolysed by microbes'], ['Nylon-2–nylon 6', 'Yes', 'Amide links from glycine units']], 'Table comparing biodegradability of three polymers'),
      [1],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling Bakelite a thermoplastic, or polythene a thermoset.
- Saying every condensation polymer is a copolymer (nylon 6 is a homopolymer).
- Forgetting that two water molecules are lost per nylon 6,6 repeating unit.
- Writing trans-polyisoprene for natural rubber.
- Using Mi instead of Mi² in the numerator of Mw.

**How marks are usually awarded**
- 1-mark items: monomer(s), type of polymer, a use.
- Preparations (2–3 marks): monomers, conditions or catalyst, and the type of polymerisation.
- Calculations: degree of polymerisation, repeating-unit mass, Mn, Mw and PDI.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Polymer?', 'A macromolecule made of many repeating units derived from monomers.', 'definition', 1),
    fc(2, 'Degree of polymerisation?', 'Number of repeating units = polymer molar mass ÷ repeating-unit mass.', 'formula', 1),
    fc(3, 'Two semi-synthetic polymers?', 'Cellulose acetate (rayon) and vulcanised rubber.', 'example', 1),
    fc(4, 'Linear, branched, cross-linked examples?', 'HDPE; LDPE; Bakelite.', 'example', 1),
    fc(5, 'Order of intermolecular forces?', 'Elastomers < thermoplastics < fibres.', 'concept', 1),
    fc(6, 'Thermoplastic vs thermoset?', 'Thermoplastic softens on heating repeatedly; thermoset cross-links and cannot be remelted.', 'concept', 1),
    fc(7, 'Addition polymerisation?', 'Unsaturated monomers add without loss of any molecule (chain growth).', 'definition', 1),
    fc(8, 'Condensation polymerisation?', 'Bifunctional monomers join with loss of a small molecule (step growth).', 'definition', 1),
    fc(9, 'Initiator for free radical polymerisation?', 'Benzoyl peroxide.', 'fact', 1),
    fc(10, 'Three steps of chain polymerisation?', 'Initiation, propagation, termination.', 'concept', 1),
    fc(11, 'Homopolymer vs copolymer?', 'One kind of monomer vs two or more kinds.', 'definition', 1),
    fc(12, 'LDPE conditions and structure?', '1000–2000 atm, 350–570 K, peroxide; branched.', 'fact', 1),
    fc(13, 'HDPE catalyst and structure?', 'Ziegler–Natta (Et₃Al + TiCl₄); linear.', 'fact', 1),
    fc(14, 'Monomer of Teflon?', 'Tetrafluoroethene, CF₂=CF₂.', 'fact', 1),
    fc(15, 'Monomer of PAN and use?', 'Acrylonitrile; acrylic fibres (wool substitute).', 'fact', 1),
    fc(16, 'Monomers of nylon 6,6?', 'Hexamethylenediamine and adipic acid.', 'fact', 1),
    fc(17, 'Monomer of nylon 6?', 'Caprolactam.', 'fact', 1),
    fc(18, 'Monomers of terylene?', 'Ethylene glycol and terephthalic acid.', 'fact', 1),
    fc(19, 'Monomers of Bakelite?', 'Phenol and formaldehyde.', 'fact', 1),
    fc(20, 'Novolac?', 'Linear phenol–formaldehyde polymer; cross-links to Bakelite on heating with more HCHO.', 'definition', 1),
    fc(21, 'Natural rubber?', 'cis-1,4-Polyisoprene.', 'fact', 1),
    fc(22, 'Vulcanisation?', 'Heating rubber with sulfur at 373–415 K to form S cross-links.', 'definition', 1),
    fc(23, 'Monomer of neoprene?', 'Chloroprene (2-chloro-1,3-butadiene).', 'fact', 1),
    fc(24, 'Buna-N vs Buna-S?', 'Buna-N: butadiene + acrylonitrile (oil resistant). Buna-S: butadiene + styrene (tyres).', 'concept', 1),
    fc(25, 'Number-average molar mass?', 'Mn = ΣNᵢMᵢ / ΣNᵢ.', 'formula', 1),
    fc(26, 'Weight-average molar mass?', 'Mw = ΣNᵢMᵢ² / ΣNᵢMᵢ.', 'formula', 1),
    fc(27, 'PDI of natural polymers?', 'Equal to 1 (monodisperse).', 'fact', 1),
    fc(28, 'PHBV?', 'Biodegradable copolymer of 3-hydroxybutanoic and 3-hydroxypentanoic acids.', 'definition', 1),
    fc(29, 'Nylon-2–nylon 6?', 'Biodegradable alternating copolymer of glycine and aminocaproic acid.', 'definition', 1),
    fc(30, 'Repeating-unit mass of nylon 6,6?', '226 g/mol (116 + 146 − 2 × 18).', 'formula', 1),
    fc(31, 'Exam tip: copolymer', 'Count the different monomers, not the method of polymerisation.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
