/**
 * Editorial photography.
 *
 * These are illustrative, stock-style images (restored from the October 2026
 * site). They set the scene; they are NOT SOYL pupils, pilot schools, cohorts or
 * results. Rules:
 * - never caption them with a name, a quote, a school or an outcome;
 * - never place them next to a testimonial or a number as if they were proof;
 * - real, consented photography replaces them via content/media.ts when it exists.
 *
 * Static imports give next/image the intrinsic size (no CLS) and a blur
 * placeholder; the optimiser serves AVIF/WebP at responsive widths.
 */
import type { StaticImageData } from 'next/image';

import studentThinking from '@/public/images/student_thinking_portrait.jpg';
import fbPresentation from '@/public/images/future-builders/hero_presentation.jpg';
import fbIot from '@/public/images/future-builders/iot_wiring.jpg';
import fbSoftware from '@/public/images/future-builders/software_coding.jpg';
import fbAi from '@/public/images/future-builders/ai_classifier.jpg';
import fbPitch from '@/public/images/future-builders/entrepreneurship_pitch.jpg';

export interface EditorialImage {
  src: StaticImageData;
  /** Describes what is in the picture. No names, schools or outcomes. */
  alt: string;
  /** CSS object-position for tight crops, e.g. "50% 30%". */
  focus?: string;
}

export const images = {
  studentThinking: {
    src: studentThinking,
    alt: 'A student pausing to think, pen in hand, over an open notebook',
    focus: '50% 35%',
  },
  fbPresentation: {
    src: fbPresentation,
    alt: 'A student holding up a small circuit board in front of a whiteboard sketch of the project',
    focus: '55% 45%',
  },
  fbIot: {
    src: fbIot,
    alt: 'Close-up of hands wiring LEDs and a sensor to a microcontroller on a breadboard',
  },
  fbSoftware: {
    src: fbSoftware,
    alt: 'Students writing code side by side in a computer lab',
  },
  fbAi: {
    src: fbAi,
    alt: 'A student’s laptop running an image classifier that has labelled a water bottle',
    focus: '35% 50%',
  },
  fbPitch: {
    src: fbPitch,
    alt: 'A student presenting a project poster to her class and teacher',
    focus: '55% 40%',
  },
} satisfies Record<string, EditorialImage>;

export type ImageKey = keyof typeof images;
