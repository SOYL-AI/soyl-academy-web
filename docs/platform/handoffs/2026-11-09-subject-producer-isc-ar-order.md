# subject-producer — ISC assertion-reason option order — 2026-11-09

Status: done

Branch: `platform/subject-producer/isc-ar-order` (fast-forwarded to `platform/main` 54643166 first). Resumed from a previous producer's uncommitted work (81 files: chemistry, accounts and maths libs/questions), which was reviewed item by item against the specimens before it was kept.

## Verified A-R order per subject (specimen PDFs downloaded and read on 2026-11-09)

| Subject (live chapters) | Specimen used | (a) | (b) | (c) | (d) | Needed changes? |
|---|---|---|---|---|---|---|
| ISC 12 Mathematics (ch01–ch17) | ISC 2027 Mathematics 860 | both true, R explains | both true, R does not explain | A true, R false | **A false, R true** | wording only (no key change) |
| ISC 11 Mathematics (ch01–ch10) | ISC 2027 Mathematics 860 (no Class XI Mathematics specimen has A-R items) | same as 860 | | | | wording only (no key change) |
| ISC 12 Physics (ch01–ch21) | ISC 2027 Physics 861 | both true, R explains | both true, R does not explain | A true, R false | **A false, R true** | no — already the specimen order and wording |
| ISC 12 Chemistry (ch01–ch22) | ISC 2027 Chemistry 862 | both true, R explains | both true, R does not explain | A true, R false | **both false** | **yes** — lib used the CBSE (d) "A false, R true"; 20 items re-keyed/rewritten |
| ISC 12 Biology (ch01–ch18) | ISC 2027 Biology 863 | both true, R explains | both true, R does not explain | A true, R false | **both false** | no |
| ISC 11 Biology (ch01–ch21) | ISC 2027 Biology 863 (no Class XI Biology specimen has A-R items) | same as 863 | | | | no |
| ISC 12 Accounts (ch01–ch14) | 858 Accounts, ISC 2026 (latest Class XII Accounts specimen; none for 2027) | both true and R explains | both true but R does not explain | A true, R false | **both false** | **yes** — lib used the CBSE (d); 19 items re-keyed/rewritten |
| ISC 12 Commerce (ch01–ch16) | 857 Commerce, ISC 2026 (carried into 2027 by circular) | both true and R explains | both true but R does not explain | A true, R false | **both false** | no |
| ISC 12 Economics (ch01–ch20) | ISC 2027 Economics 856 | both true, R explains | both true, R does not explain | A true **but** R false | **both false** | no |

Exact option wording is recorded as one "A-R order" fact under each specimen anchor in `platform/catalog/sources/cisce.md` (860, 861, 862, 863, 856, 857; the 858 Accounts fact sits under the `isc-2026-specimen-papers` index anchor, which links it, because there is no Accounts specimen anchor).

**ISC 11 Chemistry should use the ISC 2027 Chemistry specimen (862) options exactly:** (a) Both Assertion and Reason are true, and Reason is the correct explanation for Assertion. (b) Both Assertion and Reason are true, but Reason is not the correct explanation for Assertion. (c) Assertion is true and Reason is false. (d) Both Assertion and Reason are false. (The 2025 Class XI Chemistry specimen has no A-R items.) **ISC 11 Mathematics** uses the 860 options: (a) Both Assertion and Reason are true, and Reason is the correct explanation of Assertion. (b) Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion. (c) Assertion is true and Reason is false. (d) Assertion is false and Reason is true.

## What changed

- `isc-12-chemistry-ch01..ch22` (commit 341bf7e2): lib options to 862 wording with (d) both false. Every item keyed (d) under the old order (A false, R true) has no answer under the new order, so each was rewritten keeping its idea: either the assertion was corrected so both are true (key a, or b where R does not explain — ch11 chlorophyll, ch22 RNA), or the reason was made false so both are false (key d: ch05, ch09, ch10, ch14, ch18, ch21). Solutions and schemes updated; README key lines updated and a dated note added. ch16/ch17 had no (d) item (lib change only).
- `isc-12-accounts-ch01..ch14` (bf0cd432): lib options to the 858 wording; the 19 (d)-keyed items rewritten the same way. Producer change to the previous draft: ch03 `ar_existing` was a (b) whose "R does not explain" was arguable (AS 26 is often cited as the reason); it is now a clean both-false item.
- `isc-12-mathematics-ch01..ch17` (13dca001; ch02–ch17 import ch01's lib) and `isc-11-mathematics-ch01..ch10` (2aaf65ca): option wording to 860; order and keys unchanged.
- `platform/catalog/sources/cisce.md` (04485e25): the A-R facts above (the only catalog edit).
- Every touched chapter's `tests.json` is byte-identical (no tests.json in any commit: same items in the same slots); `release.json` and README changed.

## How to verify

From `platform/` (lock `_tools/heavy.sh`, log `C:/Users/Prabhu/soyl-wt/isc-ar-order-gates1.log`, run 02:58–03:17 IST, after the final build):
- 63 chapters rebuilt twice with `npx tsx content/authored/<family>/<unit>/src/build.mjs`: all exit 0, no `.wip.json`, second build byte-identical (md5 check), `git diff` shows no tests.json change.
- `npm test -w @soyl/content-templates`: 4649/4649 passed.
- `npm run content -- lint --exemplars`: 664 units, 0 errors (warnings only on pre-existing CBSE 10 units).
- `npm run content -- verify --board cisce --class 11 --authored`: 31 units, 2443 questions, 0 blocking. `--class 12`: 128 units, 8871 questions, 0 blocking.
- `npm run content -- originality --authored`: 664 units, 0 errors.
- `npx vitest run --root db test/db6-split.test.ts` 8/8; `--root api test/content.test.ts` 13/13; `--root content-pipeline test/series.test.ts` 41/41.
- Consistency scan (scratch script over every ISC release.json): every A-R item carries its subject's specimen options (5 distinct option sets, one per specimen wording); in both-false subjects no (d) solution says "R is true" and no (c) solution says R is true; in Maths/Physics no item needs "both false"; every "option (x)" in a solution matches the key.

## Tests added
None (content only).

## Known gaps / follow-ups
- Key balance shifted towards (a) in chemistry (65 a / 22 b / 26 c / 6 d) and accounts (40 / 21 / 24 / 7), because most old (d) items were turned into true assertions; a later pass could convert some to (b)/(d).
- ICSE 10 A-R fix (merged earlier) recorded no specimen facts in cisce.md; not done here (out of scope).

## Decisions made
None new. Accounts uses the 2026 Class XII specimen, the latest published (the 2026/10 `858-ACCOUNTANCY-SQP-AK.pdf` is the Class XI paper; its (d) is also "both false").

## Needs from owner
None.
