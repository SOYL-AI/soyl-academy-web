// ISC 12 Biology ch02 rules: ploidy of the products of double fertilisation and of the seed's tissues, and the
// counting rules for seeds (one ovule, one pollen grain, two male gametes per seed; monosporic embryo sacs).

export function ploidy(diploid) {
  if (diploid % 2) throw new Error('diploid number must be even');
  const n = diploid / 2;
  return { diploid, haploid: n, triploid: 3 * n };
}

/** Chromosomes in each tissue of a seed or fruit for a plant with 2n = `diploid`. */
export function seedTissues(diploid) {
  const { haploid: n } = ploidy(diploid);
  return {
    zygote: 2 * n, // egg n + male gamete n
    embryo: 2 * n,
    pen: 3 * n, // two polar nuclei + male gamete
    endosperm: 3 * n,
    perisperm: 2 * n, // persistent nucellus (maternal)
    seedCoat: 2 * n, // integuments (maternal)
    pericarp: 2 * n, // ovary wall (maternal)
    antipodal: n,
    synergid: n,
  };
}

/** Minimum ovules, pollen grains, male gametes and meioses for `seeds` seeds. */
export function seedsToMeioses(seeds) {
  const maleMeioses = Math.ceil(seeds / 4);
  return { seeds, ovules: seeds, pollen: seeds, gametes: 2 * seeds, femaleMeioses: seeds, maleMeioses, total: seeds + maleMeioses };
}

/** Male gametes used in double fertilisation for `seeds` seeds, and how many fuse with egg vs polar nuclei. */
export const gametesFor = (seeds) => ({ total: 2 * seeds, syngamy: seeds, tripleFusion: seeds });
