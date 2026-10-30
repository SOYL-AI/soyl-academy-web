// Counting and ploidy rules for ch01, used to compute worked-example numbers and to re-solve bank items.
// The rules, not the answers, are written here: one meiosis → 4 pollen grains but 1 functional megaspore;
// one pollen tube serves one ovule with 2 male gametes; zygote n + n, primary endosperm nucleus n + n + n.

export function ploidy(diploid) {
  if (diploid % 2) throw new Error('diploid number must be even');
  const n = diploid / 2;
  return { diploid, haploid: n, triploid: 3 * n };
}

export function pollenFromAnther({ sporangia, mmcPerSporangium }) {
  const totalMmc = sporangia * mmcPerSporangium;
  return { sporangia, mmc: mmcPerSporangium, totalMmc, pollen: totalMmc * 4 };
}

/** Minimum ovules, pollen grains, male gametes and meioses for `seeds` seeds (monosporic embryo sacs). */
export function seedsToMeioses(seeds) {
  const maleMeioses = Math.ceil(seeds / 4);
  return { seeds, pollen: seeds, gametes: 2 * seeds, femaleMeioses: seeds, maleMeioses, total: seeds + maleMeioses };
}

/** Nuclei in an embryo sac after k free-nuclear mitoses of the functional megaspore nucleus. */
export const sacNuclei = (k) => 2 ** k;
