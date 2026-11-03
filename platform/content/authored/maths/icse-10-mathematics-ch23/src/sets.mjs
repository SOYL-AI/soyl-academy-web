// Data sets for ICSE 10 Mathematics ch23. All contexts are imagined. Every data set is a stat.mjs grouped distribution with
// CONTINUOUS classes (the discontinuous one is converted with cont()). Each set was chosen so that the median, both
// quartiles and (where a mode is drawn) the graphical mode are terminating decimals; gr.mjs throws otherwise.
import { G } from './gr.mjs';

export const S = {
  // deck 1
  typing: G(20, 10, [4, 6, 12, 9, 6, 3]), // typing speed (words per minute), 40 trainees
  ferryInc: G(10, 10, [4, 9, 12, 8, 5, 2], { inc: true }), // ages of 40 ferry passengers, 10-19, 20-29, ...
  mango: G(10, 5, [4, 8, 20, 12, 6]), // mass (kg) of 50 mango crates; modal bar 20-25
  // deck 2
  rounds: G(0, 10, [6, 10, 8, 8, 4, 4]), // minutes for one delivery round, 40 riders: Q1 14, median 25, Q3 37.5
  practical: G(20, 10, [6, 9, 15, 14, 10, 6]), // practical marks out of 80, 60 pupils: Q1 40, median 50, Q3 61
  // question bank
  carts: G(100, 50, [5, 7, 16, 20, 24, 8]), // daily sales (rupees) of 80 street-food carts: Q1 225, median 280, Q3 325
  toll: G(0, 20, [12, 20, 30, 26, 12]), // seconds spent at a toll plaza by 100 vehicles: Q1 33, median 52, Q3 70
  heights: G(150, 10, [7, 13, 20, 25, 20, 15]), // heights (cm) of 100 volleyball aspirants: Q1 172.5, median 184, Q3 195
  fitness: G(40, 10, [9, 20, 21, 20, 20, 10]), // fitness score of 100 trainees: Q1 58, median 70, Q3 82.5
  laps: G(0, 10, [4, 7, 12, 17, 20, 13, 7]), // seconds to finish a lap, 80 sprinters: Q1 27.5, median 40, Q3 50
  quiz: G(10, 5, [4, 12, 10, 8, 4, 2]), // quiz scores, 40 pupils: Q1 17.5, median 22, Q3 27.5, mode 19
  calls: G(10, 5, [3, 3, 8, 10, 12, 4]), // duration (min) of 40 helpline calls: Q1 22.5, median 28, Q3 32.5, mode 31
  speed: G(0, 4, [7, 10, 13, 12, 10, 8]), // cycling speed (km/h) of 60 riders: Q1 7.2, median 12, Q3 17.2, mode 11
  piano: G(20, 10, [9, 10, 11, 13, 10, 7]), // daily practice minutes, 60 pupils: Q1 36, median 50, Q3 62, mode 54
  weekly: G(20, 10, [6, 18, 15, 10, 8, 3]), // weekly study minutes, 60 pupils: Q1 35, median 44, Q3 56, mode 38
  seeds: G(0, 5, [4, 10, 12, 5, 5, 4]), // days for 40 seed trays to sprout: Q1 8, median 12.5, Q3 19
  stalls: G(0, 20, [8, 14, 20, 15, 3]), // customers per stall, 60 stalls: Q1 30, median 48, Q3 64
  kites: G(0, 5, [6, 8, 10, 6, 6, 4]), // flight times (minutes), 40 kites: Q1 7.5, median 13, Q3 20
};
