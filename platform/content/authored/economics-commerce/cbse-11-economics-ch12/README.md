# CBSE Class 11 Economics, Chapter 12: Market Equilibrium

`cbse-11-economics-ch12` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Introductory Microeconomics) · every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch12/src/build.mjs` from `platform/`). Edit `src/`, not the JSON. Shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/`.

## Scope
Syllabus topics t01 and t02 only. t01: equilibrium price and quantity, excess demand and supply, the invisible hand, shifts of demand or supply with a fixed number of firms, simultaneous shifts (price unchanged, quantity unchanged), one line each on the labour market and on the long run with free entry and exit. t02: price ceiling and price floor, shortage and surplus, rationing, black market, buffer stock, minimum wage as a floor. Not taught: non-competitive markets, long-run equilibrium in depth, real prices or schemes.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 32 flashcards, 80 questions (142 marks; 4 case-based items) |
| `tests.json` | short test (20 marks, 40 min) and long test (40 marks, 90 min), class-default blueprints |
| `src/questions.mjs` | imagined markets (linear functions and schedules), asserted laws, question bank |
| `src/build.mjs` | six SVG figures, decks, notes, flashcards, tests |

- Questions: mcq 26, assertion-reason 5, true-false 2, fill-blank 2, match 2, ordering 2, numerical 16, short 2-mark 9, short 3-mark 6, long 5-mark 6, case-based 4. Application or above: 60%.
- Figures (all drawn from the same functions, no maps): equilibrium with excess demand and supply; demand rise and supply rise on two panels; equal shifts with price unchanged; demand up and supply down with quantity unchanged; price ceiling with shortage; price floor with surplus.
- Deck checks (not in tests): m_ed_price, n_m1_ex10, ord_adjust, tf_ed_price; n_find_shift, m_ceiling_def, n_m3_short, fb_floor, mt_effects.

## How verified
- Every equilibrium, excess, shifted equilibrium, shortage, surplus and spending figure is computed in code (`market`, `shifted`, `ceiling`, `floor`, `schedule`) and pinned with `check()`; `shifted()` asserts the signs of the price and quantity changes against the laws of shifts; every figure is computed with stats.mjs and asserted.
- Build: NO ERRORS, lint 0 errors 0 warnings; three builds give identical md5 for release.json and tests.json; no wip files.
- Near-duplicate scan 0 flags (after rewording one stem); SVG label scan 0 issues; the figures were rendered in Chromium and inspected.

## Facts for a reviewer
1. Equilibrium price: price at which quantity demanded equals quantity supplied; equilibrium quantity: quantity traded at that price.
2. Excess demand (qd > qs) at a price below equilibrium raises price; excess supply (qs > qd) above equilibrium lowers it.
3. Invisible hand: price adjusts through separate decisions of many buyers and sellers without central direction (stated in general terms only).
4. With a fixed number of firms: demand rises, price and quantity rise; demand falls, both fall; supply rises, price falls, quantity rises; supply falls, price rises, quantity falls.
5. Simultaneous shifts: effect depends on relative size; equal rises leave price unchanged; demand up and supply down by amounts with d*da + b*|dc| balanced leave quantity unchanged (here 50 and 40 with slopes 5 and 4).
6. Shifts are horizontal (a quantity added at every price) for linear curves.
7. Labour market: wage where labour demand equals labour supply. Long run: with free entry and exit price tends to minimum average cost (one line only).
8. Price ceiling: maximum price below equilibrium, shortage, rationing, ration cards, queues, possible black market, quality effects; a ceiling above equilibrium has no effect.
9. Price floor: minimum price above equilibrium, surplus, government purchase and buffer stock; a floor below equilibrium has no effect; minimum wage is a floor.
10. Black-market price indication: the highest price buyers would pay for the quantity actually supplied is read off the demand function (an indicator only).
11. All markets, units and figures are imagined.

## Unsure
- Quantity-unchanged case uses non-integer partial effects (22.2), so the text only says the effects cancel.
- Bank is at the upper limit of 80 questions.
