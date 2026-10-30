// ch13 Polymers — question bank (single topic t01). MCQ keys are placed by the builder (balanced);
// AR keys planned: a c b d a c. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const t = [1];

// ---------------------------------------------------------------- classification
add('thermoset-mcq', mcq({
  stem: 'An electrician needs a material for a switch body that will not soften when it gets hot. Which polymer is suitable, and why?',
  right: 'Bakelite, because it is a thermosetting polymer with a cross-linked network',
  wrong: ['Polythene, because it is a thermoplastic', 'Natural rubber, because it is an elastomer', 'PVC, because it softens on heating'],
  sol: 'Thermosets do not melt or soften on reheating — option (@K). Thermoplastics such as polythene (@1) and PVC (@3) soften.',
  d: 2, c: 'application', t,
}));
add('source-mcq', mcq({
  stem: 'Which of these is a semi-synthetic polymer?',
  right: 'Cellulose acetate',
  wrong: ['Starch', 'Polythene', 'Nylon 6,6'],
  sol: 'Cellulose acetate is made by chemically modifying natural cellulose — option (@K).',
  d: 1, c: 'recall', t,
}));
add('fibre-mcq', mcq({
  stem: 'Nylon 6,6 has high tensile strength and is used as a fibre mainly because:',
  right: 'its chains are held by strong hydrogen bonds between amide groups',
  wrong: ['it is cross-linked by sulfur bridges', 'its chains are highly branched', 'it has only weak van der Waals forces'],
  sol: 'N–H···O=C hydrogen bonds between closely packed chains give fibres their strength — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('elastomer-mcq', mcq({
  stem: 'Which class of polymers has the weakest intermolecular forces?',
  right: 'Elastomers',
  wrong: ['Fibres', 'Thermoplastics', 'Thermosetting polymers'],
  sol: 'Elastomers have weak forces and only a few cross-links, which let them stretch and recover — option (@K).',
  d: 1, c: 'recall', t,
}));
add('ldpe-mcq', mcq({
  stem: 'A factory wants a tough, rigid polythene for water tanks rather than a soft polythene for carry bags. It should use:',
  right: 'HDPE, made with a Ziegler–Natta catalyst, which has linear, closely packed chains',
  wrong: ['LDPE, made at very high pressure, which has branched chains', 'Teflon, made from tetrafluoroethene', 'Polythene made with benzoyl peroxide at 2000 atm'],
  sol: 'Linear chains pack closely, giving higher density and rigidity — option (@K). The high-pressure peroxide route gives branched LDPE (@1, @3).',
  d: 2, c: 'application', t,
}));
add('structure-match', match({
  stem: 'Match each polymer with its chain structure or class.',
  pairs: [
    ['LDPE', 'Branched chains'],
    ['Melamine–formaldehyde', 'Cross-linked network'],
    ['Buna-S', 'Elastomer'],
    ['PVC', 'Linear thermoplastic'],
  ],
  order: [2, 0, 3, 1],
  sol: 'LDPE → branched; melamine → network; Buna-S → elastomer; PVC → linear thermoplastic.',
  d: 2, c: 'understanding', t,
}));
add('thermo-tf', tf({
  stem: 'A thermoplastic can be softened by heating and reshaped many times.',
  key: 't',
  sol: 'True. Thermoplastics have intermediate forces and no permanent cross-links, so they soften on heating and harden on cooling repeatedly.',
  d: 1, c: 'understanding', t,
}));
add('class-ar', ar({
  a: 'Bakelite cannot be remoulded by heating.',
  r: 'On heating, Bakelite undergoes extensive cross-linking to form an infusible network.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t,
}));
add('class-short', short({
  marks: 2,
  stem: 'Distinguish between thermoplastic and thermosetting polymers, with one example of each.',
  model: 'Thermoplastics are linear or slightly branched polymers with intermediate forces between chains; they soften on heating and harden on cooling repeatedly, e.g. polythene or PVC. Thermosetting polymers form extensive cross-links when heated, giving a rigid network that cannot be melted or remoulded, e.g. Bakelite.',
  sol: 'Reversible softening vs permanent cross-linking.',
  scheme: [['Thermoplastic with example', 1], ['Thermoset with example', 1]],
  d: 2, c: 'understanding', t,
}));
add('forces-short3', short({
  marks: 3,
  stem: 'A rubber band, a nylon fishing line and a polythene bag behave very differently when pulled. Explain the differences in terms of the forces between the polymer chains.',
  model: 'The rubber band is an elastomer: its coiled chains are held by weak van der Waals forces with only a few cross-links, so they straighten when pulled and the cross-links pull them back when released. Nylon is a fibre: its chains are packed closely and held by strong hydrogen bonds, so the line resists stretching and has high tensile strength. Polythene is a thermoplastic with intermediate forces: it stretches and thins out permanently when pulled hard, because the chains slide past one another without returning.',
  sol: 'Elastomer, fibre, thermoplastic.',
  scheme: [['Rubber band: weak forces, few cross-links, recovery', 1], ['Nylon: strong H-bonds, high strength', 1], ['Polythene: intermediate forces, permanent stretch', 1]],
  d: 3, c: 'application', t,
}));

// ---------------------------------------------------------------- addition and condensation
add('condensation-mcq', mcq({
  stem: 'Which polymer is formed by condensation polymerisation?',
  right: 'Terylene',
  wrong: ['Polythene', 'Teflon', 'Polyacrylonitrile'],
  sol: 'Terylene forms from ethylene glycol and terephthalic acid with loss of water — option (@K). The others are addition polymers.',
  d: 1, c: 'understanding', t,
}));
add('copolymer-mcq', mcq({
  stem: 'Which of these is a homopolymer?',
  right: 'Nylon 6',
  wrong: ['Nylon 6,6', 'Buna-S', 'Terylene'],
  sol: 'Nylon 6 is made from a single monomer, caprolactam — option (@K). The others need two monomers.',
  d: 2, c: 'understanding', t,
}));
add('initiator-mcq', mcq({
  stem: 'In the free radical polymerisation of ethene, benzoyl peroxide is added. Its role is to:',
  right: 'produce free radicals that start the chain',
  wrong: ['stop the chain from growing', 'remove water formed in the reaction', 'act as a Ziegler–Natta catalyst'],
  sol: 'The peroxide decomposes into radicals, which add to the double bond in the initiation step — option (@K).',
  d: 1, c: 'understanding', t,
}));
add('monomer-mcq', mcq({
  stem: 'A polymer has the repeating unit –CH₂–CH(C₆H₅)–. Its monomer is:',
  right: 'styrene (phenylethene)',
  wrong: ['benzene', 'ethene and benzene', 'toluene'],
  sol: 'Removing the brackets and restoring the double bond gives CH₂=CH–C₆H₅, styrene; the polymer is polystyrene — option (@K).',
  d: 2, c: 'application', t,
}));
add('pvc-mcq', mcq({
  stem: 'A water pipe is made of a polymer with the repeating unit –CH₂–CHCl–. Which description is correct?',
  right: 'PVC, an addition homopolymer of vinyl chloride',
  wrong: ['PVC, a condensation copolymer of ethene and HCl', 'Neoprene, a polymer of chloroprene', 'Teflon, a polymer of a fluoroalkene'],
  sol: 'Restoring the double bond gives CH₂=CHCl, vinyl chloride; one monomer, no by-product — option (@K).',
  d: 2, c: 'application', t,
}));
add('unit-mcq', mcq({
  stem: 'Which statement about the repeating unit of an addition polymer is correct?',
  right: 'It has the same molecular formula as the monomer',
  wrong: ['It has one H₂O less than the monomer', 'It always contains an amide link', 'It is formed by step growth'],
  sol: 'No small molecule is lost in addition polymerisation — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('bifunctional-mcq', mcq({
  stem: 'A monomer that can undergo condensation polymerisation on its own must have:',
  right: 'two reactive functional groups that can react with each other, such as –NH₂ and –COOH',
  wrong: ['one C=C double bond only', 'a single –OH group', 'no functional groups'],
  sol: 'Each monomer must link at both ends, e.g. 6-aminohexanoic acid — option (@K).',
  d: 3, c: 'application', t,
}));
add('addition-fill', fill({
  stem: 'Polymerisation in which monomers join step by step with the loss of a small molecule such as water is called ___ polymerisation.',
  acc: [['condensation', 'step-growth', 'step growth']],
  sol: '**Condensation** (step-growth) polymerisation.',
  d: 1, c: 'recall', t,
}));
add('homo-tf', tf({
  stem: 'Every polymer made by condensation polymerisation is a copolymer.',
  key: 'f',
  sol: 'False. Nylon 6, from caprolactam alone, is a condensation homopolymer.',
  d: 2, c: 'analysis', t,
}));
add('addition-ar', ar({
  a: 'In addition polymerisation, the molar mass of the polymer is a whole-number multiple of the molar mass of the monomer.',
  r: 'Addition polymerisation takes place only between monomers of two different kinds.',
  key: 'c',
  sol: 'A is true (nothing is lost, ignoring end groups); R is false — homopolymers such as polythene come from one monomer — option (c).',
  d: 3, c: 'analysis', t,
}));
add('step-ar', ar({
  a: 'Nylon 6,6 is a condensation polymer.',
  r: 'Nylon 6,6 contains amide links like those in proteins.',
  key: 'b',
  sol: 'Both are true, but containing amide links does not by itself explain why it is a condensation polymer; the reason is that water is lost each time a link forms — option (b).',
  d: 3, c: 'analysis', t,
}));
add('dp-num', num({
  stem: r`A sample of PVC has an average molar mass of $1.25 \times 10^{5}\ \text{g mol}^{-1}$. What is its average degree of polymerisation? (Vinyl chloride, $\ce{C2H3Cl}$: $M = 62.5$)`,
  value: 2000, tol: 1, unit: null,
  sol: r`Degree of polymerisation $= 125000 \div 62.5 = 2000$.`,
  scheme: [['2000', 1]],
  d: 2, c: 'application', t,
}), () => near(125000 / 62.5, 2000) || 'dp');
add('ps-num', num({
  stem: r`A polystyrene sample has a number-average molar mass of $52000\ \text{g mol}^{-1}$. What is its average degree of polymerisation? (Styrene, $\ce{C8H8}$: $M = 104$)`,
  value: 500, tol: 1, unit: null,
  sol: r`Degree of polymerisation $= 52000 \div 104 = 500$.`,
  scheme: [['500', 1]],
  d: 2, c: 'application', t,
}), () => near(52000 / 104, 500) || 'ps');
add('teflon-num', num({
  stem: r`A Teflon chain contains 5000 repeating units. What is its molar mass in $\text{g mol}^{-1}$? ($\ce{C2F4}$: $M = 100$)`,
  value: 500000, tol: 10, unit: 'g/mol',
  sol: r`Molar mass $= 5000 \times 100 = 500000$, so $5.0 \times 10^{5}\ \text{g mol}^{-1}$.`,
  scheme: [['5.0 × 10⁵ g/mol', 1]],
  d: 1, c: 'application', t,
}), () => near(5000 * 100, 500000) || 'teflon');
add('mechanism-short3', short({
  marks: 3,
  stem: 'Describe the three steps of free radical polymerisation of ethene initiated by benzoyl peroxide.',
  model: 'Initiation: benzoyl peroxide decomposes on heating into phenyl (or benzoyloxy) free radicals; a radical adds to an ethene molecule, forming a new carbon radical, C₆H₅–CH₂–CH₂•. Propagation: this radical adds to another ethene molecule, forming a larger radical, and the process repeats thousands of times, so the chain grows. Termination: two growing radicals combine (or otherwise react), so the radicals are destroyed and the chain stops growing.',
  sol: 'Initiation, propagation, termination.',
  scheme: [['Initiation', 1], ['Propagation', 1], ['Termination', 1]],
  d: 2, c: 'understanding', t,
}));
add('compare-short', short({
  marks: 2,
  stem: 'Give two differences between addition and condensation polymerisation, with one example of each.',
  model: 'Addition polymerisation involves unsaturated monomers that add without losing any molecule, by chain growth, e.g. polythene from ethene. Condensation polymerisation involves bifunctional monomers that react step by step with loss of a small molecule such as water, e.g. nylon 6,6 from hexamethylenediamine and adipic acid.',
  sol: 'Monomer type, by-product, growth; examples.',
  scheme: [['Two differences', 1], ['One example of each', 1]],
  d: 2, c: 'understanding', t,
}));
add('identify-short', short({
  marks: 2,
  stem: 'A student makes a polymer from 6-aminohexanoic acid, H₂N(CH₂)₅COOH, and finds that water is formed. Classify the polymer by mode of polymerisation and by number of monomers, and name the linkage formed.',
  model: 'Water is lost as each –NH₂ reacts with a –COOH, so it is a condensation polymer. Only one kind of monomer is used, so it is a homopolymer. The link formed is an amide link, –CO–NH–; the product is a polyamide similar to nylon 6.',
  sol: 'Condensation homopolymer; amide link.',
  scheme: [['Condensation and homopolymer', 1], ['Amide link (polyamide)', 1]],
  d: 3, c: 'application', t,
}));

// ---------------------------------------------------------------- important polymers
add('terylene-mcq', mcq({
  stem: 'The monomers of terylene are:',
  right: 'ethylene glycol and terephthalic acid',
  wrong: ['hexamethylenediamine and adipic acid', 'phenol and formaldehyde', '1,3-butadiene and styrene'],
  sol: 'Terylene is a polyester of ethylene glycol and terephthalic acid — option (@K).',
  d: 1, c: 'recall', t,
}));
add('teflon-mcq', mcq({
  stem: 'Teflon is used to coat non-stick frying pans because it:',
  right: 'is chemically inert and stable to heat',
  wrong: ['dissolves food stains', 'is a good conductor of electricity', 'is biodegradable'],
  sol: 'Strong C–F bonds make Teflon unreactive and heat resistant — option (@K).',
  d: 1, c: 'understanding', t,
}));
add('nylon6-mcq', mcq({
  stem: 'Nylon 6 is prepared by:',
  right: 'heating caprolactam with water at high temperature',
  wrong: ['polymerising ethene with a Ziegler–Natta catalyst', 'condensing phenol with formaldehyde', 'heating adipic acid with ethylene glycol'],
  sol: 'Caprolactam ring-opens and polymerises — option (@K).',
  d: 2, c: 'recall', t,
}));
add('novolac-mcq', mcq({
  stem: 'A paint manufacturer uses a linear phenol–formaldehyde polymer. This polymer is:',
  right: 'Novolac',
  wrong: ['Bakelite', 'Melamine resin', 'Terylene'],
  sol: 'Novolac is the linear product; Bakelite (@1) is the cross-linked thermoset formed on further heating — option (@K).',
  d: 2, c: 'application', t,
}));
add('polymer-match', match({
  stem: 'Match each polymer with a typical use.',
  pairs: [
    ['Polyacrylonitrile', 'Wool substitute in sweaters'],
    ['Melamine–formaldehyde', 'Unbreakable crockery'],
    ['Terylene', 'Seat belts and sails'],
    ['Teflon', 'Non-stick coatings'],
  ],
  order: [3, 0, 2, 1],
  sol: 'PAN → acrylic wool substitute; melamine → crockery; terylene → seat belts, sails; Teflon → non-stick coatings.',
  d: 1, c: 'recall', t,
}));
add('nylon-num', num({
  marks: 2,
  stem: r`What is the molar mass of the repeating unit of terylene, formed from ethylene glycol ($\ce{C2H6O2}$, $M = 62$) and terephthalic acid ($\ce{C8H6O4}$, $M = 166$)? Two water molecules ($M = 18$) are lost per repeating unit.`,
  value: 192, tol: 0.5, unit: 'g/mol',
  sol: r`$M = 62 + 166 - 2 \times 18 = 192$, so $192\ \text{g mol}^{-1}$ ($\ce{C10H8O4}$).`,
  scheme: [['Add monomers, subtract 2 H₂O', 1], ['192 g/mol', 1]],
  d: 3, c: 'application', t,
}), () => (62 + 166 - 36 === 192) || 'terylene');
add('bakelite-short', short({
  marks: 2,
  stem: 'Explain how Bakelite is formed from phenol and formaldehyde, and why it is suitable for electrical switches.',
  model: 'Phenol and formaldehyde react with an acid or base catalyst to form o- and p-hydroxymethylphenols, which condense into linear chains called Novolac. On heating with more formaldehyde, the chains become extensively cross-linked, giving Bakelite. Being a thermosetting polymer and a good insulator, it does not soften when hot, so it is used for switches.',
  sol: 'Novolac then cross-linking; thermoset insulator.',
  scheme: [['Formation via Novolac and cross-linking', 1], ['Thermosetting, insulator, heat-resistant', 1]],
  d: 2, c: 'understanding', t,
}));
add('ldpe-short', short({
  marks: 2,
  stem: 'LDPE and HDPE are both made from ethene. Explain how differences in their preparation lead to differences in their properties.',
  model: 'LDPE is made at very high pressure with a peroxide initiator, which gives highly branched chains that pack loosely, so it is soft, flexible and of low density. HDPE is made at low pressure with a Ziegler–Natta catalyst, giving linear chains that pack closely, so it is denser and more rigid.',
  sol: 'Branched vs linear chains.',
  scheme: [['LDPE: conditions and branched chains, soft', 1], ['HDPE: Ziegler–Natta, linear, rigid', 1]],
  d: 3, c: 'application', t,
}));
add('fibre-short3', short({
  marks: 3,
  stem: 'Write the monomers and the type of linkage in (a) nylon 6,6 and (b) terylene. State one property that makes each suitable for its use.',
  model: '(a) Nylon 6,6 is made from hexamethylenediamine, H₂N(CH₂)₆NH₂, and adipic acid, HOOC(CH₂)₄COOH; its units are joined by amide links, –CO–NH–. Strong hydrogen bonding between chains gives high tensile strength, suitable for ropes, bristles and fabrics. (b) Terylene is made from ethylene glycol, HOCH₂CH₂OH, and terephthalic acid, HOOC–C₆H₄–COOH; its units are joined by ester links. It is strong and crease-resistant, suitable for shirts and seat belts.',
  sol: 'Monomers, links, properties.',
  scheme: [['Nylon 6,6 monomers and amide link', 1], ['Terylene monomers and ester link', 1], ['A property and use for each', 1]],
  d: 2, c: 'understanding', t,
}));

// ---------------------------------------------------------------- rubber
add('vulcan-mcq', mcq({
  stem: 'Natural rubber is heated with sulfur during vulcanisation in order to:',
  right: 'form sulfur cross-links between chains, making it harder and elastic over a wider temperature range',
  wrong: ['remove the double bonds completely by adding hydrogen', 'convert it into a thermoplastic that can be remelted', 'break the polymer into isoprene units'],
  sol: 'Sulfur bridges link neighbouring chains — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('rubber-mcq', mcq({
  stem: 'Natural rubber is a polymer of:',
  right: 'isoprene (2-methyl-1,3-butadiene), with cis double bonds',
  wrong: ['chloroprene', 'styrene', 'isoprene, with trans double bonds'],
  sol: 'Natural rubber is cis-1,4-polyisoprene — option (@K); the trans form (@3) is gutta-percha, which is not elastic.',
  d: 2, c: 'recall', t,
}));
add('oilseal-mcq', mcq({
  stem: 'A mechanic needs a rubber seal for a petrol pump that will not swell in petrol. The best choice is:',
  right: 'Buna-N',
  wrong: ['natural rubber', 'Buna-S', 'polystyrene'],
  sol: 'Buna-N, a copolymer of butadiene and acrylonitrile, resists petrol and oils — option (@K). Natural rubber swells in non-polar solvents (@1).',
  d: 2, c: 'application', t,
}));
add('neoprene-mcq', mcq({
  stem: 'Neoprene is obtained by polymerisation of:',
  right: 'chloroprene',
  wrong: ['isoprene', 'acrylonitrile and butadiene', 'vinyl chloride'],
  sol: 'Neoprene is polychloroprene, a homopolymer — option (@K).',
  d: 1, c: 'recall', t,
}));
add('rubber-fill', fill({
  stem: 'Buna-S is a copolymer of 1,3-butadiene and ___.',
  acc: [['styrene', 'phenylethene']],
  sol: '**Styrene**.',
  d: 1, c: 'recall', t,
}));
add('rubber-tf', tf({
  stem: 'Unvulcanised natural rubber becomes soft and sticky in hot weather.',
  key: 't',
  sol: 'True. Without cross-links, the chains slide easily when warm; vulcanisation fixes this.',
  d: 1, c: 'understanding', t,
}));
add('vulcan-ar', ar({
  a: 'Vulcanised rubber is more elastic and stronger than natural rubber.',
  r: 'During vulcanisation, sulfur forms cross-links between the polymer chains.',
  key: 'a',
  sol: 'Both are true; the cross-links stop chains slipping and pull them back after stretching — option (a).',
  d: 2, c: 'understanding', t,
}));
add('sulfur-num', num({
  stem: 'A tyre compound uses 100 kg of raw rubber and 5.0 kg of sulfur. What is the percentage of sulfur by mass in the mixture?',
  value: 4.76, tol: 0.02, unit: '%',
  sol: r`Percentage $= 5.0 \div 105 \times 100 = 4.76$, so $4.76\%$.`,
  scheme: [['4.76%', 1]],
  d: 2, c: 'application', t,
}), () => near((5 / 105) * 100, 4.76) || 'sulfur');
add('rubber-short', short({
  marks: 2,
  stem: 'Explain why natural rubber is elastic, and state two drawbacks that vulcanisation overcomes.',
  model: 'Natural rubber is cis-polyisoprene; the cis double bonds keep the chains coiled, and only weak van der Waals forces act between them, so the chains straighten when stretched and coil back when released. Raw rubber becomes soft and sticky when hot and brittle when cold, and has low tensile strength; vulcanisation overcomes these drawbacks.',
  sol: 'Coiled chains, weak forces; drawbacks.',
  scheme: [['Coiled cis chains, weak forces', 1], ['Two drawbacks', 1]],
  d: 2, c: 'understanding', t,
}));
add('rubber-short3', short({
  marks: 3,
  stem: 'Give the monomers of neoprene, Buna-N and Buna-S, state whether each is a homopolymer or copolymer, and suggest one use for each linked to its property.',
  model: 'Neoprene is made from chloroprene, 2-chloro-1,3-butadiene, and is a homopolymer; it resists vegetable and mineral oils, so it is used for hoses and gaskets. Buna-N is made from 1,3-butadiene and acrylonitrile, a copolymer; it resists petrol and oils, so it is used for oil seals and fuel-tank linings. Buna-S is made from 1,3-butadiene and styrene, a copolymer; it is tough and resists wear, so it is used in tyres and shoe soles.',
  sol: 'Monomers, type, use.',
  scheme: [['Neoprene', 1], ['Buna-N', 1], ['Buna-S', 1]],
  d: 2, c: 'application', t,
}));

// ---------------------------------------------------------------- molecular mass and biodegradable polymers
add('pdi-mcq', mcq({
  stem: 'A polymer sample has a polydispersity index (PDI) of exactly 1. This means that:',
  right: 'all the molecules have the same molar mass',
  wrong: ['the sample is a copolymer', 'the polymer is biodegradable', 'half the molecules are cross-linked'],
  sol: 'Mw = Mn only when every chain is the same size (monodisperse), as in many natural polymers — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('mw-mcq', mcq({
  stem: 'For a synthetic polymer sample, which relation between the average molar masses is correct?',
  right: 'Mw > Mn',
  wrong: ['Mw < Mn', 'Mw = Mn always', 'Mw = 2Mn always'],
  sol: 'The weight average gives more importance to heavier chains, so Mw exceeds Mn when chain lengths vary — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('bio-mcq', mcq({
  stem: 'Which polymer is biodegradable?',
  right: 'PHBV',
  wrong: ['Polythene', 'PVC', 'Teflon'],
  sol: 'PHBV is a bacterial polyester whose ester links are broken down by micro-organisms — option (@K).',
  d: 1, c: 'recall', t,
}));
add('bio-tf', tf({
  stem: 'Polythene is readily broken down by bacteria in soil.',
  key: 'f',
  sol: 'False. Polythene has only C–C and C–H bonds, which micro-organisms attack extremely slowly; it persists for a very long time.',
  d: 1, c: 'understanding', t,
}));
add('bio-ar', ar({
  a: 'PHBV is used to make capsules for controlled release of drugs.',
  r: 'PHBV is degraded in the environment and in the body by hydrolysis of its ester links.',
  key: 'a',
  sol: 'Both are true and R explains A: the capsule slowly breaks down, releasing the drug — option (a).',
  d: 3, c: 'analysis', t,
}));
add('pdi-ar', ar({
  a: 'The polydispersity index of a synthetic polymer can be less than 1.',
  r: 'Natural polymers such as proteins are usually monodisperse.',
  key: 'd',
  sol: 'A is false (Mw ≥ Mn, so PDI ≥ 1); R is true — option (d).',
  d: 2, c: 'understanding', t,
}));
add('mn-num', num({
  marks: 2,
  stem: 'A polymer sample contains 40 molecules of molar mass 10 000 g/mol and 10 molecules of molar mass 60 000 g/mol. Calculate the number-average molar mass, in g/mol.',
  value: 20000, tol: 5, unit: 'g/mol',
  sol: r`$\overline{M}_n = (40 \times 10000 + 10 \times 60000) \div 50 = 1000000 \div 50 = 20000$, so $20000\ \text{g mol}^{-1}$.`,
  scheme: [['Σ NᵢMᵢ = 1 000 000 and Σ Nᵢ = 50', 1], ['20 000 g/mol', 1]],
  d: 2, c: 'application', t,
}), () => near((40 * 10000 + 10 * 60000) / 50, 20000) || 'mn');
add('mw-num', num({
  marks: 2,
  stem: 'For the same sample (40 molecules of 10 000 g/mol and 10 molecules of 60 000 g/mol), calculate the weight-average molar mass, in g/mol.',
  value: 40000, tol: 5, unit: 'g/mol',
  sol: r`$\sum N_iM_i^2 = 40 \times 10^{8} + 10 \times 36 \times 10^{8} = 4.0 \times 10^{10}$; $\sum N_iM_i = 1.0 \times 10^{6}$; $\overline{M}_w = 4.0 \times 10^{10} \div 10^{6} = 40000$, so $40000\ \text{g mol}^{-1}$.`,
  scheme: [['Σ NᵢMᵢ² = 4.0 × 10¹⁰', 1], ['40 000 g/mol', 1]],
  d: 3, c: 'application', t,
}), () => near((40 * 1e8 + 10 * 36e8) / 1e6, 40000) || 'mw');
add('pdi-short', short({
  marks: 2,
  stem: 'Using the values Mn = 20 000 and Mw = 40 000 for a polymer sample, calculate its PDI and comment on what it shows about the sample.',
  model: 'PDI = Mw ÷ Mn = 40 000 ÷ 20 000 = 2.0. Since it is well above 1, the sample is polydisperse: its chains vary widely in length, as is typical of synthetic polymers.',
  sol: 'PDI 2.0; polydisperse.',
  scheme: [['PDI = 2.0', 1], ['Polydisperse; wide range of chain lengths', 1]],
  d: 2, c: 'application', t,
}));
add('bio-short', short({
  marks: 2,
  stem: 'Why do most synthetic polymers cause environmental problems, and how are biodegradable polymers designed to avoid them? Give one example.',
  model: 'Most synthetic polymers, such as polythene, have only strong C–C and C–H bonds that micro-organisms cannot break, so they persist for decades in soil and water. Biodegradable polymers contain groups like ester or amide links, similar to those in natural polymers, which microbes can hydrolyse; an example is PHBV or nylon-2–nylon 6.',
  sol: 'Persistence; hydrolysable links; example.',
  scheme: [['Synthetic polymers resist microbial attack', 1], ['Biodegradable: hydrolysable links, example', 1]],
  d: 2, c: 'understanding', t,
}));

// ---------------------------------------------------------------- long answers
add('class-long', long({
  stem: '(a) Classify polymers on the basis of (i) source and (ii) structure, with one example of each type.\n\n(b) Classify polymers on the basis of intermolecular forces, giving one example of each class.\n\n(c) Explain, with one example each, what homopolymers and copolymers are.',
  model: 'By source, polymers are natural (starch, natural rubber), semi-synthetic (cellulose acetate, vulcanised rubber) or synthetic (polythene, nylon). By structure, they are linear (HDPE, PVC), branched (LDPE) or cross-linked (Bakelite, melamine). By intermolecular forces, elastomers have the weakest forces and a few cross-links (Buna-S); fibres have the strongest forces, such as hydrogen bonds, and high tensile strength (nylon 6,6); thermoplastics have intermediate forces and soften on heating repeatedly (polythene); thermosetting polymers cross-link on heating and cannot be remoulded (Bakelite). A homopolymer is formed from one kind of monomer, e.g. polythene from ethene; a copolymer from two or more, e.g. Buna-S from butadiene and styrene.',
  sol: 'Source, structure, forces; homo/copolymers.',
  scheme: [['(a) Source and structure with examples', 2], ['(b) Four classes with examples', 2], ['(c) Homopolymer and copolymer', 1]],
  d: 2, c: 'understanding', t,
}));
add('poly-long', long({
  stem: '(a) Distinguish between addition and condensation polymerisation.\n\n(b) Describe the free radical mechanism of addition polymerisation of ethene.\n\n(c) Explain the formation of nylon 6,6 and calculate the molar mass of its repeating unit (diamine 116, diacid 146, water 18).',
  model: 'Addition polymerisation uses unsaturated monomers that join without loss of any molecule by chain growth; condensation polymerisation uses bifunctional monomers that join step by step with loss of a small molecule such as water. In free radical polymerisation, benzoyl peroxide forms radicals that add to ethene (initiation); the new radical adds to monomer after monomer (propagation); finally two radicals combine (termination). Nylon 6,6 forms when hexamethylenediamine and adipic acid are heated together: each –NH₂ reacts with a –COOH to form an amide link with loss of water, so the chain grows. Each repeating unit has two amide links, so two water molecules are lost: M = 116 + 146 − 36 = 226.',
  sol: 'Distinction; mechanism; nylon 6,6 and 226.',
  scheme: [['(a) Distinction', 1], ['(b) Three steps', 1.5], ['(c) Formation with amide links', 1.5], ['(c) 226 g/mol', 1]],
  d: 3, c: 'application', t,
}));
add('rubber-long', long({
  stem: '(a) What is natural rubber? Explain its elasticity and its drawbacks.\n\n(b) Describe vulcanisation and its effect on the properties of rubber.\n\n(c) Name two synthetic rubbers that are copolymers, give their monomers and one use of each.',
  model: 'Natural rubber is cis-1,4-polyisoprene obtained from latex. Its cis double bonds keep the chains coiled, and only weak van der Waals forces act between them, so it stretches and recovers. It becomes soft and sticky above about 335 K and brittle below about 283 K, has low tensile strength and swells in non-polar solvents. In vulcanisation, raw rubber is heated with sulfur and an additive such as zinc oxide at 373–415 K; sulfur cross-links form between the chains at reactive sites, making the rubber harder, stronger, less sticky and elastic over a wider temperature range. Buna-N, from 1,3-butadiene and acrylonitrile, resists petrol and is used for oil seals; Buna-S, from 1,3-butadiene and styrene, is tough and used in tyres.',
  sol: 'Natural rubber; vulcanisation; Buna-N and Buna-S.',
  scheme: [['(a) Structure, elasticity, drawbacks', 2], ['(b) Vulcanisation and effects', 1.5], ['(c) Two copolymer rubbers with monomers and uses', 1.5]],
  d: 2, c: 'understanding', t,
}));
add('mass-long', long({
  stem: 'A polymer sample contains three fractions: 100 molecules of molar mass 10 000, 200 molecules of 20 000 and 100 molecules of 40 000 g/mol.\n\n(a) Calculate Mn.\n\n(b) Calculate Mw.\n\n(c) Calculate the PDI and explain what it indicates. Why is Mw always at least as large as Mn?',
  model: 'Σ NᵢMᵢ = 100 × 10 000 + 200 × 20 000 + 100 × 40 000 = 1.0 × 10⁶ + 4.0 × 10⁶ + 4.0 × 10⁶ = 9.0 × 10⁶; Σ Nᵢ = 400; Mn = 9.0 × 10⁶ ÷ 400 = 22 500 g/mol. Σ NᵢMᵢ² = 100 × 10⁸ + 200 × 4 × 10⁸ + 100 × 16 × 10⁸ = 2.5 × 10¹¹; Mw = 2.5 × 10¹¹ ÷ 9.0 × 10⁶ ≈ 27 800 g/mol. PDI = 27 800 ÷ 22 500 ≈ 1.24, greater than 1, so the sample is polydisperse, typical of a synthetic polymer. Mw weights each chain by its mass, so heavier chains count more; it equals Mn only when all chains are the same size.',
  sol: 'Mn 22 500; Mw ≈ 27 800; PDI ≈ 1.24.',
  scheme: [['(a) Mn = 22 500', 1.5], ['(b) Mw ≈ 27 800', 1.5], ['(c) PDI ≈ 1.24, polydisperse', 1], ['(c) Reason Mw ≥ Mn', 1]],
  d: 4, c: 'application', t,
}));
add('everyday-long', long({
  stem: 'For each item, name a suitable polymer, its monomer(s) and the property that makes it suitable: (a) a non-stick frying pan; (b) a strong, crease-resistant shirt fabric; (c) a car tyre; (d) an electrical plug; (e) a capsule that slowly dissolves in the body to release a drug.',
  model: '(a) Teflon, from tetrafluoroethene; chemically inert and heat-stable, so food does not stick. (b) Terylene, from ethylene glycol and terephthalic acid; a strong polyester fibre that resists creasing. (c) Vulcanised rubber or Buna-S, from isoprene with sulfur cross-links, or from 1,3-butadiene and styrene; tough, elastic and wear-resistant. (d) Bakelite, from phenol and formaldehyde; a thermosetting, cross-linked insulator that does not soften when hot. (e) PHBV, from 3-hydroxybutanoic and 3-hydroxypentanoic acids; biodegradable, its ester links are slowly hydrolysed.',
  sol: 'Five polymers with monomers and properties.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 3, c: 'application', t,
}));

// ---------------------------------------------------------------- case-based
add('bag-case', mk.case({
  passage: 'A city municipality bans thin polythene carry bags after drains get blocked during the monsoon. Shopkeepers switch to thicker bags made of HDPE, to cloth bags of cotton blended with terylene, or to compostable bags. A chemistry teacher notes that the thin bags are LDPE, made from ethene at very high pressure, and that a typical LDPE molecule has a molar mass of about 1.4 × 10⁵ g mol⁻¹. (C = 12, H = 1)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why is LDPE soft and of low density compared with HDPE?',
      right: 'Its chains are highly branched and cannot pack closely',
      wrong: ['It is cross-linked', 'It contains chlorine atoms', 'It is a condensation polymer'],
      sol: 'Branching from the high-pressure radical process prevents close packing — option (@K).',
      d: 2, c: 'understanding', t,
    })),
    part('b', num({
      stem: 'Estimate the average number of ethene units in an LDPE molecule of molar mass 1.4 × 10⁵ g/mol.',
      value: 5000, tol: 1, unit: null,
      sol: r`Each repeating unit $\ce{C2H4}$ has $M = 28$; number $= 140000 \div 28 = 5000$.`,
      scheme: [['5000', 1]],
      d: 2, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Why do polythene bags persist in drains for many years, and what property should a compostable bag have?',
      model: 'Polythene has only strong C–C and C–H bonds and no groups that micro-organisms can attack, so it is not biodegraded. A compostable bag should be made of a biodegradable polymer with hydrolysable links, such as ester links in PHBV, which microbes can break down.',
      sol: 'Non-biodegradable; ester/amide links.',
      scheme: [['Polythene not attacked by microbes', 1], ['Biodegradable polymer with hydrolysable links', 1]],
      d: 2, c: 'application', t,
    }), [
      short({
        marks: 2,
        stem: 'Explain why HDPE bags are stronger than LDPE bags of the same thickness, with reference to how each is made.',
        model: 'HDPE is made with a Ziegler–Natta catalyst at low pressure and has linear chains that pack closely, giving stronger forces between chains and higher density. LDPE is made at very high pressure with a peroxide initiator and has branched chains that pack loosely, so it is weaker.',
        sol: 'Linear vs branched packing.',
        scheme: [['HDPE: Ziegler–Natta, linear, close packing', 1], ['LDPE: high pressure, branched, weaker', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => near(140000 / 28, 5000) || 'ldpe');
add('tyre-case', mk.case({
  passage: 'A tyre factory near Chennai blends natural rubber from Kerala plantations with Buna-S. The mixture is heated with about 5% sulfur, zinc oxide and carbon black. Before heating, the mixture is soft and sticky; after heating in the mould, the tyre is tough and springs back after being pressed. Workers find that natural rubber left in the sun becomes tacky, while a cold winter makes it stiff and brittle.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the main change that happens when the mixture is heated with sulfur?',
      right: 'Sulfur cross-links form between the polymer chains',
      wrong: ['The double bonds are hydrogenated', 'The rubber is depolymerised to isoprene', 'Styrene units are removed'],
      sol: 'This is vulcanisation — option (@K).',
      d: 1, c: 'understanding', t,
    })),
    part('b', mcq({
      stem: 'Buna-S is made from:',
      right: '1,3-butadiene and styrene',
      wrong: ['isoprene only', 'chloroprene only', '1,3-butadiene and acrylonitrile'],
      sol: 'Buna-S (SBR) is a copolymer of butadiene and styrene — option (@K).',
      d: 1, c: 'recall', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why natural rubber becomes tacky in the sun and brittle in winter, but the vulcanised tyre does not.',
      model: 'In raw rubber the chains are held only by weak forces; when warm they slide over each other, making it soft and tacky, and when cold the chains cannot move, so it becomes stiff and brittle. In vulcanised rubber, sulfur cross-links hold the chains in place, so it stays firm when hot and flexible when cold.',
      sol: 'Weak forces vs cross-links.',
      scheme: [['Raw rubber: weak forces, chains slide or freeze', 1], ['Cross-links keep properties over a wide range', 1]],
      d: 3, c: 'analysis', t,
    }), [
      short({
        marks: 2,
        stem: 'Why would the factory choose Buna-N instead of Buna-S or natural rubber for a fuel hose, and what type of polymer is Buna-N?',
        model: 'Buna-N, made from 1,3-butadiene and acrylonitrile, resists swelling in petrol and oils because of its polar nitrile groups, whereas natural rubber and Buna-S swell. Buna-N is a copolymer (an addition copolymer and an elastomer).',
        sol: 'Oil resistance; copolymer.',
        scheme: [['Resists petrol and oils', 1], ['Copolymer of butadiene and acrylonitrile', 1]],
        d: 3, c: 'application', t,
      }),
    ]),
  ],
}));
add('fabric-case', mk.case({
  passage: 'A textile mill in Surat produces two fabrics. Fabric X is spun from a polymer made by heating ethylene glycol with terephthalic acid at about 440 K with a catalyst; water is removed as it forms. Fabric Y is made from a polymer of acrylonitrile and feels warm and soft like wool. The quality lab measures the molar mass of the polymer for fabric X: Mn = 18 000 g/mol and Mw = 27 000 g/mol.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The polymer in fabric X is:',
      right: 'terylene, a polyester formed by condensation',
      wrong: ['nylon 6,6, a polyamide', 'polyacrylonitrile, an addition polymer', 'Bakelite, a thermoset'],
      sol: 'Ethylene glycol + terephthalic acid with loss of water gives terylene — option (@K).',
      d: 1, c: 'application', t,
    })),
    part('b', num({
      stem: 'Calculate the polydispersity index of the polymer for fabric X.',
      value: 1.5, tol: 0.01, unit: null,
      sol: r`PDI $= 27000 \div 18000 = 1.5$.`,
      scheme: [['1.5', 1]],
      d: 2, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Classify the polymer of fabric Y by mode of polymerisation and by number of monomers, and explain why water is removed during the making of fabric X.',
      model: 'Polyacrylonitrile is an addition homopolymer, formed from one monomer without loss of any molecule. For fabric X, water is a product of the condensation; removing it shifts the equilibrium towards the polymer, so long chains form.',
      sol: 'Addition homopolymer; removing water drives condensation.',
      scheme: [['Y: addition homopolymer', 1], ['Removing water favours polymer formation', 1]],
      d: 3, c: 'analysis', t,
    }), [
      short({
        marks: 2,
        stem: 'Explain what a PDI of 1.5 tells the quality lab, and why a natural fibre protein would give a different value.',
        model: 'A PDI of 1.5 means the chains vary in length (polydisperse), as expected for a synthetic step-growth polymer. A natural protein is made to an exact sequence and length, so all its molecules have the same molar mass and its PDI is 1 (monodisperse).',
        sol: 'Polydisperse vs monodisperse.',
        scheme: [['Polydisperse synthetic polymer', 1], ['Protein monodisperse, PDI = 1', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => near(27000 / 18000, 1.5) || 'pdi');
add('plastic-case', mk.case({
  passage: 'A school science club collects plastic items: a polythene bottle, a Bakelite switch, a nylon toothbrush and a PVC pipe. They heat a small piece of each in a fume cupboard. The polythene and PVC pieces soften and can be bent into new shapes, then harden on cooling; the Bakelite piece does not soften and eventually chars; the nylon bristles soften and melt at a fairly high temperature.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which item is made of a thermosetting polymer?',
      right: 'The Bakelite switch',
      wrong: ['The polythene bottle', 'The PVC pipe', 'The nylon toothbrush'],
      sol: 'Bakelite does not soften on heating because of its cross-linked network — option (@K).',
      d: 1, c: 'application', t,
    })),
    part('b', num({
      stem: 'A PVC pipe sample has an average degree of polymerisation of 1600. What is its average molar mass, in g/mol? (Vinyl chloride: M = 62.5)',
      value: 100000, tol: 10, unit: 'g/mol',
      sol: r`Molar mass $= 1600 \times 62.5 = 100000$, so $1.0 \times 10^{5}\ \text{g mol}^{-1}$.`,
      scheme: [['1.0 × 10⁵ g/mol', 1]],
      d: 2, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain, in terms of structure, why polythene and PVC can be reshaped on heating but Bakelite cannot.',
      model: 'Polythene and PVC are thermoplastics with linear or slightly branched chains held by intermediate forces; heating lets the chains slide, and cooling fixes the new shape. Bakelite has a rigid, three-dimensional cross-linked network of covalent bonds that heating cannot break without decomposing the polymer.',
      sol: 'Chains slide vs network.',
      scheme: [['Thermoplastics: chains slide when heated', 1], ['Bakelite: covalent network does not soften', 1]],
      d: 3, c: 'analysis', t,
    }), [
      short({
        marks: 2,
        stem: 'Nylon melts at a much higher temperature than polythene. Explain this using the forces between chains.',
        model: 'Nylon chains contain amide groups that form strong N–H···O=C hydrogen bonds between neighbouring chains, and the chains pack closely, as in a fibre. Polythene chains are held only by weaker van der Waals forces, so less energy is needed to separate them.',
        sol: 'Hydrogen bonds vs van der Waals forces.',
        scheme: [['Nylon: hydrogen bonds between amide groups', 1], ['Polythene: weaker van der Waals forces', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => near(1600 * 62.5, 100000) || 'pvc');
