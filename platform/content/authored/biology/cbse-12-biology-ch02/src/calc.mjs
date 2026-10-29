// Counting rules for ch02, used for worked-example numbers and to re-solve bank items.
// One primary spermatocyte → 2 secondary spermatocytes → 4 spermatids → 4 sperms; one primary oocyte → 1 ovum.
// Human diploid number 46, haploid 23.

export const HUMAN = { diploid: 46, haploid: 23 };

export function spermatogenesis(primary) {
  return { primary, secondary: 2 * primary, spermatids: 4 * primary, sperms: 4 * primary };
}
export const oogenesis = (primary) => ({ primary, ova: primary });

/** Seminiferous tubules: `lobules` lobules per testis, 1–3 tubules per lobule. */
export function tubuleRange(lobules, testes = 1) {
  return { min: lobules * 1 * testes, max: lobules * 3 * testes };
}

/** Semen quality: total (millions), % of normal shape and % of vigorous motility. */
export function semen(totalMillions, normalPct, motilePct) {
  return { total: totalMillions, normal: (totalMillions * normalPct) / 100, motile: (totalMillions * motilePct) / 100 };
}

/** Probability that all of k children are of one given sex (each birth independent, 1/2). */
export const allSameSex = (k) => 1 / 2 ** k;
