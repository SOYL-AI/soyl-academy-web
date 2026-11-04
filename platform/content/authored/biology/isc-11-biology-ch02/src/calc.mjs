// ISC 11 Biology ch02 Biological Classification: Domains, Kingdoms and Monera. Every count, growth figure, magnification and
// percentage used in a stem, answer, table or slide is computed here and asserted with eq().
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;

// ---------------------------------------------------------------- three domains (Woese, 1990)
export const DOM = [
  { d: 'Archaea', cell: 'Prokaryotic', wall: 'No peptidoglycan', lipid: 'Ether-linked, branched lipids', where: 'Often extreme habitats: salty lakes, hot acid springs, oxygen-free mud' },
  { d: 'Bacteria', cell: 'Prokaryotic', wall: 'Peptidoglycan present', lipid: 'Ester-linked lipids', where: 'Almost everywhere: soil, water, air, bodies of other organisms' },
  { d: 'Eukarya', cell: 'Eukaryotic', wall: 'Cellulose, chitin or none', lipid: 'Ester-linked lipids', where: 'All habitats; protists, fungi, plants and animals' },
];
eq(DOM.length, 3, 'three domains');
eq(DOM.filter((x) => x.cell === 'Prokaryotic').map((x) => x.d), ['Archaea', 'Bacteria'], 'two prokaryotic domains');

// ---------------------------------------------------------------- five kingdoms (Whittaker, 1969)
export const KING = [
  { k: 'Monera', cell: 'Prokaryotic', body: 'Unicellular', wall: 'Peptidoglycan (absent in Mycoplasma)', food: 'Autotrophic and heterotrophic', het: false, auto: true },
  { k: 'Protista', cell: 'Eukaryotic', body: 'Unicellular', wall: 'Present in some, absent in others', food: 'Autotrophic and heterotrophic', het: false, auto: true },
  { k: 'Fungi', cell: 'Eukaryotic', body: 'Multicellular (yeast unicellular)', wall: 'Chitin', food: 'Heterotrophic, absorptive', het: true, auto: false },
  { k: 'Plantae', cell: 'Eukaryotic', body: 'Multicellular, tissues and organs', wall: 'Cellulose', food: 'Autotrophic', het: false, auto: true },
  { k: 'Animalia', cell: 'Eukaryotic', body: 'Multicellular, tissues and organs', wall: 'Absent', food: 'Heterotrophic, ingestive', het: true, auto: false },
];
export const nEuk = KING.filter((x) => x.cell === 'Eukaryotic').length;
export const hetOnly = KING.filter((x) => x.het).map((x) => x.k);
export const autoAny = KING.filter((x) => x.auto).length;
eq(KING.length, 5, 'five kingdoms');
eq(nEuk, 4, 'four eukaryotic kingdoms');
eq(hetOnly, ['Fungi', 'Animalia'], 'kingdoms that are wholly heterotrophic');
eq(autoAny, 3, 'kingdoms with autotrophs');
eq(KING.filter((x) => x.wall === 'Absent').map((x) => x.k), ['Animalia'], 'only Animalia has no wall');
export const YEAR = { woese: 1990, whittaker: 1969, gram: 1884 };
eq(YEAR.woese - YEAR.whittaker, 21, 'years between Whittaker and Woese');

// ---------------------------------------------------------------- size and magnification (micrometres)
export const mag = (sizeUm, times) => sizeUm * times;
export const toMm = (um) => um / 1000;
export const SIZE = { bacillus: 2, mycoplasma: 0.1, coccus: 1 };
eq(toMm(mag(SIZE.bacillus, 1000)), 2, 'a 2 um bacillus under 1000 times shows 2 mm');
eq(mag(SIZE.mycoplasma, 1000), 100, 'Mycoplasma at 1000 times is 100 um');
eq(SIZE.bacillus / SIZE.mycoplasma, 20, 'bacillus is twenty times longer than Mycoplasma');

// ---------------------------------------------------------------- binary fission growth
/** Number of cells after t minutes from n0 cells with generation time g minutes (t must be a whole number of generations). */
export const growth = (n0, g, t) => {
  if (t % g) throw new Error('growth: not a whole number of generations');
  return n0 * 2 ** (t / g);
};
export const generations = (g, t) => t / g;
eq(generations(40, 240), 6, 'six generations in four hours at 40 minutes');
eq(growth(500, 40, 240), 32000, 'curd starter growth');
eq(growth(500, 40, 40), 1000, 'one generation doubles');
eq(growth(800, 30, 180), 51200, 'case: 800 cells, 30 minutes, 3 hours');
eq(growth(1, 30, 150), 32, 'one cell, 30 minutes, 2.5 hours');
export const GROWTH_ROWS = [0, 1, 2, 3, 4, 5, 6].map((i) => [i * 40, growth(500, 40, i * 40)]);
eq(GROWTH_ROWS[6], [240, 32000], 'growth table end');

// ---------------------------------------------------------------- Gram smear
export const GRAM = { total: 90, purple: 54 };
export const pct = (a, b) => round((a / b) * 100, 1);
eq(pct(GRAM.purple, GRAM.total), 60, 'purple cells are 60 percent');
eq(GRAM.total - GRAM.purple, 36, 'pink cells');

// ---------------------------------------------------------------- biogas (illustrative yield)
export const BIOGAS_PER_KG = 0.04;
export const biogas = (kg) => round(kg * BIOGAS_PER_KG, 2);
eq(biogas(25), 1, '25 kg dung gives 1 cubic metre of gas');
eq(biogas(60), 2.4, '60 kg dung gives 2.4 cubic metres');
