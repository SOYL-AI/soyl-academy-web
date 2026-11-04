// Computed values shared by decks and questions (ch02 Tissues). Illustrative data are labelled "(given)" where used.
import { near } from './lib.mjs';

// Worked example: xylem vessel drawn 15 mm wide at magnification 250.
export const XYL = { image_mm: 15, m: 250 };
XYL.actual_mm = XYL.image_mm / XYL.m;
XYL.actual_um = XYL.actual_mm * 1000;
if (!near(XYL.actual_um, 60, 1e-9)) throw new Error('xylem example');

// Worked example: calcium needs (illustrative; about 1000 mg a day is a common guideline for 13 to 15 year olds): 1000 mg a day; milk about 120 mg per 100 mL.
export const CALC = { need: 1000, per100: 120, glass_mL: 200 };
CALC.perGlass = (CALC.per100 * CALC.glass_mL) / 100; // 240 mg
CALC.glasses = CALC.need / CALC.perGlass; // 4.17
if (!near(CALC.perGlass, 240, 1e-9) || !near(CALC.glasses, 4.167, 0.001)) throw new Error('calcium example');
