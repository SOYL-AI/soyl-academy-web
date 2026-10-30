// ch13 Polymers (formative assessment only) — two decks: Part 1 classification and types of polymerisation;
// Part 2 important polymers, copolymers, rubber, molecular mass and biodegradable polymers. Single topic t01.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { STRUCTURES, VULCAN } from './svgs.mjs';

export const V = {
  structures: svgV(STRUCTURES, 'Linear, branched and cross-linked polymer chains drawn as beads on strings'),
  vulcan: svgV(VULCAN, 'Rubber chains before and after vulcanisation, when sulfur bridges join the chains'),
};

export const deck1 = deck({
  part: 1,
  title: 'Polymers — Part 1: Classification and polymerisation',
  goals: [
    'Define polymer, monomer, repeating unit and degree of polymerisation',
    'Classify polymers by source, structure, mode of polymerisation and molecular forces',
    'Distinguish addition and condensation polymerisation, and homopolymers and copolymers',
    'Explain free radical addition polymerisation',
  ],
  slides: [
    sl('title', 'Polymers', {
      b: 'Part 1 — giant molecules built from small repeating units. (Formative assessment only; not in the board exam.)',
      v: table(['Everyday item', 'Polymer'], [['Carry bag', 'Polythene'], ['Non-stick pan coating', 'Teflon'], ['Toothbrush bristles, ropes', 'Nylon'], ['Saree, shirt fabric', 'Terylene (polyester)'], ['Switch, plug', 'Bakelite'], ['Car tyre', 'Vulcanised rubber, Buna-S']], 'Table of everyday items and the polymers they are made of'),
      n: 'Namaste! Look around: your carry bag, toothbrush, shirt, electrical switch and the tyres on a bus are all made of polymers. Polymers are giant molecules built by joining thousands of small molecules together. In this part we learn how polymers are classified and the two main ways they are made. This chapter is assessed in school, not in the board exam.',
    }),
    sl('concept', 'Monomers, polymers and repeating units', {
      b: 'A **polymer** is a very large molecule (molar mass about 10³–10⁷ g mol⁻¹) made of many **repeating structural units** derived from small molecules called **monomers**. The process is **polymerisation**. The number of repeating units in a chain is the **degree of polymerisation**.',
      m: [r`n\,\mathrm{CH_2{=}CH_2} \rightarrow \mathrm{-\!\!\left(CH_2-CH_2\right)\!\!-}_{n}`],
      v: table(['Polymer', 'Monomer', 'Repeating unit'], [['Polythene', 'CH₂=CH₂', '–CH₂–CH₂–'], ['PVC', 'CH₂=CHCl', '–CH₂–CHCl–'], ['Teflon', 'CF₂=CF₂', '–CF₂–CF₂–'], ['Polyacrylonitrile', 'CH₂=CHCN', '–CH₂–CH(CN)–']], 'Table of polymers with their monomers and repeating units'),
      n: 'A polymer is made of many identical units linked into a long chain, like beads on a necklace. The small molecules that join up are called monomers. Ethene, for example, joins with thousands of other ethene molecules to make polythene. The number of units in the chain is called the degree of polymerisation, and it can run into thousands.',
    }),
    sl('concept', 'Classification by source and structure', {
      b: '**By source:** natural (proteins, cellulose, starch, natural rubber), semi-synthetic (cellulose acetate, cellulose nitrate, vulcanised rubber), synthetic (polythene, nylon, Buna-S). **By structure:** linear, branched-chain and cross-linked (network).',
      v: V.structures,
      n: 'Polymers can be sorted by where they come from: natural ones like cellulose and rubber, semi-synthetic ones made by chemically modifying natural polymers, and fully synthetic ones like nylon. They can also be sorted by shape. Linear chains pack closely and are strong. Branched chains pack loosely, making softer, lower density plastics. Cross-linked networks are hard, rigid and do not melt.',
    }),
    sl('concept', 'Classification by molecular forces', {
      b: 'The strength of the forces between chains decides mechanical properties.',
      v: table(['Class', 'Intermolecular forces', 'Properties', 'Examples'], [['Elastomers', 'Weakest; a few cross-links', 'Stretch and spring back', 'Natural rubber, Buna-S, neoprene'], ['Fibres', 'Strongest; H-bonds or dipole forces, close packing', 'High tensile strength', 'Nylon 6,6, terylene'], ['Thermoplastics', 'Intermediate', 'Soften on heating, harden on cooling, repeatedly', 'Polythene, PVC, polystyrene'], ['Thermosetting', 'Extensive cross-linking on heating', 'Set permanently; cannot be remelted', 'Bakelite, melamine–formaldehyde']], 'Table classifying polymers by intermolecular forces with properties and examples'),
      n: 'Forces between the chains decide how a polymer behaves. Elastomers like rubber have weak forces and a few cross-links, so they stretch and spring back. Fibres like nylon have strong hydrogen bonds between closely packed chains, giving great strength. Thermoplastics like polythene soften on heating and can be remoulded. Thermosetting polymers like Bakelite form permanent cross-links when heated and cannot be melted again.',
    }),
    sl('example', 'Worked example: classifying polymers', {
      b: r`**Problem.** Classify each polymer by mode of polymerisation and by molecular forces: (a) polythene carry bag; (b) Bakelite switch; (c) nylon rope; (d) a rubber band.

**(a)** Addition; thermoplastic.

**(b)** Condensation; thermosetting.

**(c)** Condensation; fibre.

**(d)** Addition (polyisoprene); elastomer.`,
      v: table(['Item', 'Mode', 'Forces class'], [['Polythene bag', 'Addition', 'Thermoplastic'], ['Bakelite switch', 'Condensation', 'Thermosetting'], ['Nylon rope', 'Condensation', 'Fibre'], ['Rubber band', 'Addition', 'Elastomer']], 'Table classifying four polymer items by mode of polymerisation and forces'),
      n: 'Ask two questions about each polymer. How was it made: by adding monomers with no loss, or by condensation with loss of a small molecule? And how strong are the forces between chains? A polythene bag is an addition thermoplastic. A Bakelite switch is a condensation thermoset. A nylon rope is a condensation fibre. And a rubber band is an addition elastomer.',
    }),
    sl('check', 'Quick check: classification', {
      b: 'Classify a polymer by its source, structure or intermolecular forces.',
      n: 'Quick check. Think about whether the polymer can be remelted, stretched, or spun into strong fibres.',
      chk: 'thermoset-mcq',
    }),
    sl('concept', 'Addition polymerisation', {
      b: '**Addition (chain-growth) polymerisation:** monomers with double or triple bonds add to one another **without loss** of any small molecule; the repeating unit has the same composition as the monomer. A polymer from one kind of monomer is a **homopolymer** (polythene); from two different monomers, a **copolymer** (Buna-S).',
      v: table(['Homopolymer', 'Copolymer'], [['One kind of monomer', 'Two or more kinds of monomer'], ['Polythene, PVC, polystyrene, Teflon', 'Buna-S (1,3-butadiene + styrene), Buna-N (1,3-butadiene + acrylonitrile)'], ['Nylon 6 (from caprolactam alone)', 'Nylon 6,6; terylene (condensation copolymers)']], 'Table contrasting homopolymers and copolymers with examples'),
      n: 'In addition polymerisation, molecules with double bonds simply add to each other in a chain. Nothing is lost, so the polymer has the same composition as the monomer. If all the units come from one monomer, the product is a homopolymer, like polythene. If two different monomers are mixed in the chain, it is a copolymer, like Buna-S rubber made from butadiene and styrene.',
    }),
    sl('concept', 'Free radical mechanism', {
      b: 'Alkenes polymerise by a **free radical** chain mechanism, started by an initiator such as **benzoyl peroxide**. **Initiation:** the peroxide splits into radicals, which add to a monomer. **Propagation:** the new radical adds to monomer after monomer. **Termination:** two radicals combine.',
      m: [r`\mathrm{R^{\bullet}} + \mathrm{CH_2{=}CH_2} \rightarrow \mathrm{R{-}CH_2{-}CH_2^{\bullet}}`, r`\mathrm{R{-}(CH_2{-}CH_2)_{n}^{\bullet}} + \mathrm{CH_2{=}CH_2} \rightarrow \mathrm{R{-}(CH_2{-}CH_2)_{n+1}^{\bullet}}`],
      v: flow('LR', [['a', 'Initiation: R• from peroxide adds to monomer'], ['b', 'Propagation: radical adds monomer after monomer'], ['c', 'Termination: two radicals combine']], [['a', 'b'], ['b', 'b', 'repeats thousands of times'], ['b', 'c']], 'Flow of the three steps of free radical polymerisation'),
      n: 'How does the chain grow? A small amount of an initiator, such as benzoyl peroxide, splits into free radicals. A radical attacks the double bond of an ethene molecule, creating a bigger radical. This radical attacks another ethene molecule, and so on, thousands of times: that is propagation. The chain stops growing when two radicals meet and join, which is called termination.',
    }),
    sl('concept', 'Condensation polymerisation', {
      b: '**Condensation (step-growth) polymerisation:** monomers with **two functional groups** (bifunctional) react with **loss of a small molecule** such as water, HCl or an alcohol. The polymer grows step by step. Examples: nylon 6,6 (hexamethylenediamine + adipic acid), terylene (ethylene glycol + terephthalic acid), Bakelite (phenol + formaldehyde).',
      m: [r`n\,\mathrm{H_2N(CH_2)_6NH_2} + n\,\mathrm{HOOC(CH_2)_4COOH} \rightarrow \text{nylon 6,6} + 2n\,\mathrm{H_2O}`],
      v: table(['Feature', 'Addition', 'Condensation'], [['Monomers', 'Unsaturated (C=C)', 'Bifunctional (–OH, –COOH, –NH₂)'], ['Small molecule lost?', 'No', 'Yes (H₂O, HCl, CH₃OH)'], ['Growth', 'Chain growth', 'Step growth'], ['Repeat unit vs monomer', 'Same composition', 'Different (loses H₂O)'], ['Examples', 'Polythene, PVC, Teflon', 'Nylon 6,6, terylene, Bakelite']], 'Table comparing addition and condensation polymerisation'),
      n: 'In condensation polymerisation, each monomer has two reactive groups, one at each end. When two groups react, a small molecule like water is given off and a bond forms, and since each monomer has another group free, the chain can keep growing step by step. Nylon is made this way from a diamine and a dicarboxylic acid, losing water each time an amide link forms.',
    }),
    sl('example', 'Worked example: degree of polymerisation', {
      b: r`**Problem.** A sample of polypropene has an average molar mass of $84000\ \text{g mol}^{-1}$. Find the average degree of polymerisation. (Propene, $\ce{C3H6}$: $M = 42$)

**Step 1.** Addition polymer, so the repeating unit $\ce{C3H6}$ has $M = 42$.

**Step 2.** Degree of polymerisation $= 84000 \div 42 = 2000$.`,
      v: table(['Quantity', 'Value'], [['Molar mass of polymer', '84 000 g/mol'], ['Mass of repeating unit', '42 g/mol'], ['Degree of polymerisation', '2000']], 'Table of polymer molar mass, repeating unit mass and degree of polymerisation'),
      n: 'Because propene polymerises by addition, nothing is lost, and each repeating unit weighs the same as one propene molecule, forty two. Dividing the average molar mass of the polymer, eighty four thousand, by forty two gives two thousand. So an average chain contains about two thousand propene units.',
    }),
    sl('check', 'Quick check: addition or condensation', {
      b: 'Identify whether a polymer is formed by addition or condensation.',
      n: 'Quick check. Look at the monomers: does each have a double bond, or two reactive groups that release a small molecule?',
      chk: 'condensation-mcq',
    }),
    sl('concept', 'Homopolymer or copolymer?', {
      b: 'Decide from the **number of different monomers** in the chain, not from the method. Nylon 6 (from caprolactam only) is a homopolymer; nylon 6,6 (from two monomers) is a copolymer. Copolymers combine the properties of their monomers, e.g. Buna-S is tougher than polybutadiene.',
      v: table(['Polymer', 'Monomers', 'Type'], [['Polystyrene', 'Styrene', 'Homopolymer'], ['Nylon 6', 'Caprolactam', 'Homopolymer'], ['Nylon 6,6', 'Hexamethylenediamine + adipic acid', 'Copolymer'], ['Buna-S', '1,3-Butadiene + styrene', 'Copolymer'], ['Terylene', 'Ethylene glycol + terephthalic acid', 'Copolymer']], 'Table of polymers with their monomers and whether each is a homopolymer or copolymer'),
      n: 'To decide whether a polymer is a homopolymer or a copolymer, count the different monomers. Nylon six is made from a single monomer, caprolactam, so it is a homopolymer, even though it is a condensation polymer. Nylon six six and terylene each need two monomers, so they are copolymers. Copolymers let chemists blend properties, like the toughness of Buna-S tyres.',
    }),
    sl('check', 'Quick check: homopolymer or copolymer', {
      b: 'Decide whether a given polymer is a homopolymer or a copolymer.',
      n: 'Quick check. Count the different monomers that make up the chain.',
      chk: 'copolymer-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Polymers: many repeating units from monomers; degree of polymerisation = number of units.',
        'Sources: natural, semi-synthetic, synthetic; structures: linear, branched, cross-linked.',
        'Forces: elastomers < thermoplastics < fibres; thermosets cross-link on heating.',
        'Addition (chain growth, no loss) vs condensation (step growth, small molecule lost).',
        'Free radical mechanism: initiation, propagation, termination.',
        'Homopolymer: one monomer; copolymer: two or more.',
      ],
      v: table(['Question to ask', 'Classification'], [['Where does it come from?', 'Source'], ['What shape are the chains?', 'Structure'], ['Is a small molecule lost?', 'Mode of polymerisation'], ['How strong are the forces?', 'Molecular forces']], 'Summary table of the four ways of classifying polymers'),
      n: 'Let us sum up Part 1. Polymers are giant chains of repeating units. They are classified by source, structure, mode of polymerisation and the strength of forces between chains. Addition polymers form from unsaturated monomers with nothing lost, by a free radical chain mechanism. Condensation polymers form from bifunctional monomers with loss of a small molecule. And a copolymer contains more than one kind of monomer.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the monomer(s) whenever you name a polymer.',
        'Thermoplastics remelt; thermosets do not.',
        'Nylon 6 is a homopolymer; nylon 6,6 is a copolymer.',
        'Degree of polymerisation = polymer molar mass ÷ repeating unit mass.',
      ],
      v: table(['Slip', 'Fix'], [['Bakelite is a thermoplastic', 'It is thermosetting'], ['All condensation polymers are copolymers', 'Nylon 6 is a homopolymer'], ['Fibres have the weakest forces', 'Elastomers have the weakest']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few tips. Always name the monomers with the polymer. Remember that thermoplastics can be remoulded but thermosets cannot. Do not assume every condensation polymer is a copolymer: nylon six is made from one monomer. And for the degree of polymerisation, divide the molar mass of the polymer by the mass of its repeating unit.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Polymers — Part 2: Important polymers, rubber and biodegradable polymers',
  goals: [
    'Describe the preparation and uses of polythene, Teflon, polyacrylonitrile, nylons, terylene, Bakelite and melamine',
    'Explain natural rubber, vulcanisation and synthetic rubbers (neoprene, Buna-N, Buna-S)',
    'Calculate number-average and weight-average molar masses and the polydispersity index',
    'Describe biodegradable polymers such as PHBV and nylon-2–nylon 6',
  ],
  slides: [
    sl('title', 'Polymers in daily life', {
      b: 'Part 2 — the polymers we make, use and throw away.',
      v: flow('LR', [['a', 'Addition polymers'], ['b', 'Condensation polymers'], ['c', 'Rubbers'], ['d', 'Biodegradable polymers']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the groups of polymers studied in Part 2'),
      n: 'In this part we meet the polymers that shape daily life: plastics like polythene and Teflon, fibres like nylon and terylene, hard plastics like Bakelite, and natural and synthetic rubbers. We also see how chemists describe the size of polymer molecules, and how biodegradable polymers can help reduce the mountains of plastic waste.',
    }),
    sl('concept', 'Polythene, Teflon and polyacrylonitrile', {
      b: '**LDPE** (low density): ethene at 1000–2000 atm, 350–570 K with a peroxide initiator; highly **branched**, soft, used for squeeze bottles, carry bags, insulation. **HDPE** (high density): ethene at about 333–343 K and 6–7 atm with a **Ziegler–Natta** catalyst; **linear**, tougher, used for buckets, pipes. **Teflon** from tetrafluoroethene: chemically inert, used for non-stick coatings. **Polyacrylonitrile (PAN)** from acrylonitrile: fibre (orlon, acrilan) used as a wool substitute.',
      v: table(['Polymer', 'Monomer', 'Structure', 'Use'], [['LDPE', 'Ethene', 'Branched', 'Carry bags, squeeze bottles'], ['HDPE', 'Ethene', 'Linear', 'Buckets, pipes, dustbins'], ['Teflon', 'CF₂=CF₂', 'Linear', 'Non-stick pans, seals'], ['PAN', 'CH₂=CHCN', 'Linear', 'Acrylic fibres (wool substitute)'], ['PVC', 'CH₂=CHCl', 'Linear', 'Pipes, raincoats, flooring']], 'Table of addition polymers with monomers, structure and uses'),
      n: 'The same monomer can give different plastics. Ethene polymerised at very high pressure with a peroxide gives branched, low density polythene, which is soft and used for bags. With a Ziegler Natta catalyst at low pressure, it gives linear, high density polythene, which is stiffer and used for buckets. Teflon, made from tetrafluoroethene, resists almost all chemicals, which is why it coats non-stick pans.',
    }),
    sl('concept', 'Nylons and terylene', {
      b: '**Nylon 6,6:** hexamethylenediamine + adipic acid at high temperature (polyamide; amide links –CO–NH–); used in sheets, bristles, textiles. **Nylon 6:** from caprolactam heated with water. **Terylene (Dacron):** ethylene glycol + terephthalic acid at 420–460 K with a catalyst (polyester; ester links); used in crease-resistant fabrics and safety belts.',
      m: [r`\text{polyamide link: } \mathrm{-CO-NH-} \qquad \text{polyester link: } \mathrm{-CO-O-}`],
      v: table(['Polymer', 'Monomers', 'Link', 'Use'], [['Nylon 6,6', 'H₂N(CH₂)₆NH₂ + HOOC(CH₂)₄COOH', 'Amide', 'Bristles, ropes, fabrics'], ['Nylon 6', 'Caprolactam', 'Amide', 'Tyre cords, fabrics, ropes'], ['Terylene', 'HOCH₂CH₂OH + HOOC–C₆H₄–COOH', 'Ester', 'Clothes, sails, seat belts']], 'Table of nylon 6,6, nylon 6 and terylene with monomers, linkages and uses'),
      n: 'Nylons are polyamides: their units are joined by the same amide link found in proteins. Nylon six six is made from a six-carbon diamine and a six-carbon diacid, which is how it gets its name. Terylene, also called Dacron, is a polyester made from ethylene glycol and terephthalic acid; blended with cotton, it gives the crease-resistant fabric of many shirts.',
    }),
    sl('example', 'Worked example: the nylon 6,6 repeating unit', {
      b: r`**Problem.** Find the molar mass of the repeating unit of nylon 6,6. (Hexamethylenediamine $\ce{C6H16N2}$, $M = 116$; adipic acid $\ce{C6H10O4}$, $M = 146$; water $M = 18$)

**Step 1.** Each repeating unit forms from one diamine and one diacid, with **two** amide links per unit, so two $\ce{H2O}$ are lost.

**Step 2.** $M = 116 + 146 - 2 \times 18 = 226$, i.e. $\ce{C12H22N2O2}$.`,
      v: table(['Part', 'Molar mass'], [['Diamine', '116'], ['Diacid', '146'], ['Water lost (2)', '−36'], ['Repeating unit C₁₂H₂₂N₂O₂', '226']], 'Table of the molar masses used to find the nylon six six repeating unit'),
      n: 'One repeating unit of nylon six six contains one diamine and one diacid. Joining them into a chain forms two amide links per unit, one at each end, so two water molecules are lost per unit. Adding one hundred and sixteen and one hundred and forty six, then subtracting thirty six, gives two hundred and twenty six for the repeating unit.',
    }),
    sl('concept', 'Bakelite and melamine', {
      b: '**Bakelite:** phenol + formaldehyde with acid or base catalyst. First o- and p-hydroxymethylphenols form, which condense to **Novolac** (linear, used in paints); further heating with formaldehyde gives cross-linked **Bakelite** (thermoset) used for combs, switches, handles. **Melamine–formaldehyde** resin: unbreakable crockery.',
      v: flow('LR', [['a', 'Phenol + HCHO'], ['b', 'o- and p-Hydroxymethylphenol'], ['c', 'Novolac (linear)'], ['d', 'Bakelite (cross-linked)']], [['a', 'b', 'H⁺ or OH⁻'], ['b', 'c', 'condense'], ['c', 'd', 'heat with more HCHO']], 'Flow of the formation of Novolac and Bakelite from phenol and formaldehyde'),
      n: 'Bakelite was one of the first fully synthetic plastics. Phenol reacts with formaldehyde to give hydroxymethyl phenols, which join into linear chains called Novolac. Heating Novolac with more formaldehyde links the chains in every direction, giving a rigid, cross-linked network: Bakelite. Being thermosetting, it does not soften when hot, which suits electrical switches and pan handles.',
    }),
    sl('check', 'Quick check: polymers and monomers', {
      b: 'Match a polymer to its monomers or use.',
      n: 'Quick check. Recall the monomers of nylon six six, terylene and Bakelite.',
      chk: 'terylene-mcq',
    }),
    sl('diagram', 'Natural rubber and vulcanisation', {
      b: '**Natural rubber** is **cis-1,4-polyisoprene** (from latex); the cis double bonds keep chains coiled, held only by weak forces, so it is elastic. But it is soft and sticky when warm, brittle when cold, and swells in solvents. **Vulcanisation:** heating with **sulfur** (about 5%, at 373–415 K) forms **sulfur cross-links** at reactive sites, making rubber harder, stronger and more elastic over a wide temperature range. Tyre rubber has about 5% sulfur.',
      v: V.vulcan,
      n: 'Natural rubber, from the latex of rubber trees, is a polymer of isoprene with its chains coiled up. That makes it stretchy, but it becomes sticky in summer and brittle in winter. Charles Goodyear found that heating rubber with sulfur links the chains together with sulfur bridges. This vulcanised rubber is stronger, keeps its elasticity over a wide range of temperatures, and is used for tyres.',
    }),
    sl('concept', 'Synthetic rubbers', {
      b: 'Synthetic rubbers are vulcanisable polymers that stretch to twice their length and spring back.',
      v: table(['Rubber', 'Monomer(s)', 'Type', 'Special property, use'], [['Neoprene', 'Chloroprene (2-chloro-1,3-butadiene)', 'Homopolymer', 'Resists vegetable and mineral oils: hoses, gaskets'], ['Buna-N', '1,3-Butadiene + acrylonitrile', 'Copolymer', 'Resists petrol and oils: oil seals, tank linings'], ['Buna-S (SBR)', '1,3-Butadiene + styrene', 'Copolymer', 'Tough: tyres, footwear soles']], 'Table of synthetic rubbers with monomers, type and uses'),
      n: 'Chemists have made several synthetic rubbers. Neoprene, a polymer of chloroprene, resists oils, so it is used for hoses and gaskets. Buna-N, a copolymer of butadiene and acrylonitrile, resists petrol, so it lines fuel tanks and makes oil seals. Buna-S, from butadiene and styrene, is tough and wear-resistant, so it is widely used in tyres and shoe soles.',
    }),
    sl('check', 'Quick check: rubber', {
      b: 'Explain vulcanisation or identify a synthetic rubber.',
      n: 'Quick check. Recall what sulfur does to rubber chains, and which rubber is made from chloroprene.',
      chk: 'vulcan-mcq',
    }),
    sl('concept', 'Molecular mass of polymers', {
      b: r`A polymer sample contains chains of different lengths, so its molar mass is an **average**. **Number-average** $\overline{M}_n$ and **weight-average** $\overline{M}_w$ are defined below. The **polydispersity index** $\mathrm{PDI} = \overline{M}_w / \overline{M}_n$: equal to 1 for a sample with chains all the same size (**monodisperse**, typical of natural polymers), greater than 1 for synthetic polymers (**polydisperse**).`,
      m: [r`\overline{M}_n = \frac{\sum N_i M_i}{\sum N_i}`, r`\overline{M}_w = \frac{\sum N_i M_i^2}{\sum N_i M_i}`],
      v: table(['Average', 'Weights each chain by', 'Measured by'], [['Number-average', 'Number of molecules', 'Osmotic pressure'], ['Weight-average', 'Mass of molecules', 'Light scattering, ultracentrifuge'], ['PDI', 'Mw/Mn', '= 1 natural; > 1 synthetic']], 'Table of number-average and weight-average molar masses and the polydispersity index'),
      n: 'A polymer sample is a mixture of chains of different lengths, so we talk about average molar mass. The number average counts every molecule equally. The weight average gives more importance to heavier molecules. Their ratio, the polydispersity index, tells us how spread out the chain lengths are: exactly one for natural polymers like proteins, and more than one for synthetic polymers.',
    }),
    sl('example', 'Worked example: average molar masses', {
      b: r`**Problem.** A sample contains 30 molecules of molar mass $20000$ and 20 molecules of molar mass $40000$. Find $\overline{M}_n$, $\overline{M}_w$ and the PDI.

**Step 1.** $\overline{M}_n = (30 \times 20000 + 20 \times 40000) \div 50 = 1400000 \div 50 = 28000$.

**Step 2.** $\sum N_i M_i^2 = 30 \times 4 \times 10^{8} + 20 \times 16 \times 10^{8} = 4.4 \times 10^{10}$; $\overline{M}_w = 4.4 \times 10^{10} \div (1.4 \times 10^{6}) \approx 31429$.

**Step 3.** PDI $= 31429 \div 28000 \approx 1.12$.`,
      v: table(['Quantity', 'Value'], [['Mn', '28 000'], ['Mw', '31 429'], ['PDI', '1.12 (polydisperse)']], 'Table of number-average and weight-average molar masses and PDI for the sample'),
      n: 'For the number average, multiply each molar mass by the number of molecules, add, and divide by the total number of molecules: twenty eight thousand. For the weight average, use the squares of the molar masses on top and the same sum as before underneath: about thirty one thousand four hundred. The ratio, about one point one two, is more than one, as expected for a synthetic sample.',
    }),
    sl('concept', 'Biodegradable polymers', {
      b: 'Most synthetic polymers resist degradation and cause pollution. **Biodegradable polymers** have functional groups (often ester or amide links) that micro-organisms can break down. **PHBV** (poly-β-hydroxybutyrate-co-β-hydroxyvalerate): copolymer of 3-hydroxybutanoic and 3-hydroxypentanoic acids; used in packaging, orthopaedic devices, controlled drug release. **Nylon-2–nylon 6:** alternating copolymer of glycine and aminocaproic acid.',
      v: table(['Polymer', 'Monomers', 'Use'], [['PHBV', '3-Hydroxybutanoic acid + 3-hydroxypentanoic acid', 'Packaging, orthopaedic devices, drug capsules'], ['Nylon-2–nylon 6', 'Glycine + aminocaproic acid', 'Biodegradable polyamide']], 'Table of biodegradable polymers with monomers and uses'),
      n: 'Ordinary plastics like polythene can last for centuries in landfills and oceans. Biodegradable polymers are designed with links, usually esters or amides, that bacteria can break down, like those in natural polymers. PHBV, a polyester made by bacteria, is used for packaging and for medical devices that slowly dissolve in the body. Nylon two nylon six is a biodegradable polyamide made from glycine and aminocaproic acid.',
    }),
    sl('check', 'Quick check: molar mass and biodegradability', {
      b: 'Interpret a PDI value or identify a biodegradable polymer.',
      n: 'Quick check. A PDI of exactly one means all the chains are the same size.',
      chk: 'pdi-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'LDPE (branched, high pressure) and HDPE (linear, Ziegler–Natta); Teflon; PAN; PVC.',
        'Nylon 6,6 and nylon 6 (polyamides); terylene (polyester); Bakelite and melamine (thermosets).',
        'Natural rubber: cis-polyisoprene; vulcanisation with sulfur gives cross-links.',
        'Synthetic rubbers: neoprene, Buna-N, Buna-S.',
        'Mn, Mw and PDI; natural polymers monodisperse.',
        'Biodegradable polymers: PHBV, nylon-2–nylon 6.',
      ],
      v: table(['Need', 'Polymer'], [['Non-stick coating', 'Teflon'], ['Oil-resistant seal', 'Buna-N or neoprene'], ['Heat-resistant switch', 'Bakelite'], ['Dissolving surgical device', 'PHBV']], 'Summary table matching needs to polymers'),
      n: 'Let us sum up Part 2. Addition polymers include the two kinds of polythene, Teflon and acrylic fibres; condensation polymers include nylons, terylene and Bakelite. Vulcanisation with sulfur makes rubber useful, and synthetic rubbers add oil resistance or toughness. Polymer molar masses are averages, and the PDI tells us how uniform the chains are. Biodegradable polymers offer a way to reduce plastic pollution.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the monomers and conditions for each named polymer.',
        'LDPE is branched; HDPE is linear (Ziegler–Natta).',
        'Neoprene is a homopolymer; Buna-N and Buna-S are copolymers.',
        'In Mw use Mi squared in the numerator.',
      ],
      v: table(['Slip', 'Fix'], [['Vulcanisation adds hydrogen', 'It adds sulfur cross-links'], ['Natural rubber is trans-polyisoprene', 'It is cis-polyisoprene'], ['PDI < 1 for synthetic polymers', 'PDI ≥ 1; > 1 for synthetic']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. For every polymer, learn the monomers and one use. Remember which polythene is branched. Neoprene comes from one monomer, but the Buna rubbers come from two. In molar mass calculations, square the molar masses only in the numerator of the weight average. And the polydispersity index can never be less than one.',
    }),
  ],
});
