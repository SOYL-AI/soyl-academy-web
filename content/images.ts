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

import heroCollab from '@/public/images/hero_students_collaborating.jpg';
import classroomWide from '@/public/images/classroom_wide_establishing.jpg';
import classroomMaking from '@/public/images/classroom_wide_making.jpg';
import teacherMentoring from '@/public/images/teacher_mentoring.jpg';
import studentThinking from '@/public/images/student_thinking_portrait.jpg';
import studentsBuilding from '@/public/images/students_building_project.jpg';
import studentsDebating from '@/public/images/students_debating.jpg';
import studentsPresenting from '@/public/images/students_presenting.jpg';
import traditionalClassroom from '@/public/images/traditional_classroom.jpg';
import fbPresentation from '@/public/images/future-builders/hero_presentation.jpg';
import fbIot from '@/public/images/future-builders/iot_wiring.jpg';
import fbSoftware from '@/public/images/future-builders/software_coding.jpg';
import fbAi from '@/public/images/future-builders/ai_classifier.jpg';
import fbPitch from '@/public/images/future-builders/entrepreneurship_pitch.jpg';
import pupilsReading from '@/public/images/stock/pupils-reading.jpg';
import boyWriting from '@/public/images/stock/boy-writing.jpg';
import notebookOutdoors from '@/public/images/stock/notebook-outdoors.jpg';
import lateNightStudy from '@/public/images/stock/late-night-study.jpg';
import lampHomework from '@/public/images/stock/lamp-homework.jpg';
import handsSquaredPaper from '@/public/images/stock/hands-squared-paper.jpg';
import handsBreadboard from '@/public/images/stock/hands-breadboard.jpg';
import parentReading from '@/public/images/stock/parent-reading.jpg';
import parentTablet from '@/public/images/stock/parent-tablet.jpg';
import teacherCircle from '@/public/images/stock/teacher-circle.jpg';
import teacherLeaning from '@/public/images/stock/teacher-leaning.jpg';
import teacherOneToOne from '@/public/images/stock/teacher-one-to-one.jpg';
import schoolVerandah from '@/public/images/stock/school-verandah.jpg';
import schoolAssembly from '@/public/images/stock/school-assembly.jpg';
import emptyClassroom from '@/public/images/stock/empty-classroom.jpg';
import walkToSchool from '@/public/images/stock/walk-to-school.jpg';
import magnifier from '@/public/images/stock/magnifier.jpg';
import groupOnGrass from '@/public/images/stock/group-on-grass.jpg';
import deskPencils from '@/public/images/stock/desk-pencils.jpg';

export interface EditorialImage {
  src: StaticImageData;
  /** Describes what is in the picture. No names, schools or outcomes. */
  alt: string;
  /** CSS object-position for tight crops, e.g. "50% 30%". */
  focus?: string;
}

export const images = {
  heroCollab: {
    src: heroCollab,
    alt: 'Three secondary-school students around a desk, one explaining a model bridge they are building',
    focus: '40% 40%',
  },
  classroomWide: {
    src: classroomWide,
    alt: 'A busy classroom where small groups of students work at tables while their teacher moves between them',
  },
  classroomMaking: {
    src: classroomMaking,
    alt: 'Students building and sketching in groups while a teacher leans in to help one table',
  },
  teacherMentoring: {
    src: teacherMentoring,
    alt: 'A teacher talking through a model with four students at a shared table',
    focus: '45% 50%',
  },
  studentThinking: {
    src: studentThinking,
    alt: 'A student pausing to think, pen in hand, over an open notebook',
    focus: '50% 35%',
  },
  studentsBuilding: {
    src: studentsBuilding,
    alt: 'Four students building a model tower from card and string, working from a sketch',
  },
  studentsDebating: {
    src: studentsDebating,
    alt: 'A student making a point with his hands while three classmates listen closely',
    focus: '40% 50%',
  },
  studentsPresenting: {
    src: studentsPresenting,
    alt: 'A student at the whiteboard explaining her design sketches to classmates',
    focus: '65% 40%',
  },
  traditionalClassroom: {
    src: traditionalClassroom,
    alt: 'Over a student’s shoulder: a worked maths proof in a notebook, a phone beside it, and a teacher at the board',
    focus: '55% 60%',
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
  // Stock photography (Pexels License, ADR-034; credits in public/images/stock/CREDITS.md). Placeholders until
  // consented SOYL photography exists; same rules as above.
  pupilsReading: {
    src: pupilsReading,
    alt: 'Two pupils in light-blue school uniforms bent over their books at a shared desk',
    focus: '55% 45%',
  },
  boyWriting: { src: boyWriting, alt: 'Close-up of a boy leaning over his desk, writing intently', focus: '50% 40%' },
  notebookOutdoors: { src: notebookOutdoors, alt: 'A boy sitting outdoors by green fields, writing in a notebook on his lap', focus: '55% 45%' },
  lateNightStudy: { src: lateNightStudy, alt: 'A student working late at a table under a single desk lamp in a dark room', focus: '45% 50%' },
  lampHomework: { src: lampHomework, alt: 'A child working through an exercise book under a warm lamp at night', focus: '60% 45%' },
  handsSquaredPaper: { src: handsSquaredPaper, alt: 'Close-up of a pupil’s hands drawing on squared paper with a pencil' },
  handsBreadboard: { src: handsBreadboard, alt: 'Hands pushing jumper wires into a breadboard on a workbench' },
  parentReading: { src: parentReading, alt: 'A mother and her teenage daughter sitting close on a sofa, reading together', focus: '45% 40%' },
  parentTablet: { src: parentTablet, alt: 'A mother and her son on a patterned rug, looking at a tablet together', focus: '50% 60%' },
  teacherCircle: { src: teacherCircle, alt: 'A teacher explaining something to a circle of pupils in a room with a carved stone screen', focus: '55% 45%' },
  teacherLeaning: { src: teacherLeaning, alt: 'A teacher leaning over a desk to help two pupils with their work', focus: '60% 45%' },
  teacherOneToOne: { src: teacherOneToOne, alt: 'A teacher sitting across a desk from a pupil, going through a notebook together', focus: '55% 50%' },
  schoolVerandah: { src: schoolVerandah, alt: 'A long, empty school verandah with painted arches and classroom doors' },
  schoolAssembly: { src: schoolAssembly, alt: 'Rows of schoolgirls in uniform seen from behind at a morning assembly' },
  emptyClassroom: { src: emptyClassroom, alt: 'An empty classroom with rows of wooden desks and benches in morning light' },
  walkToSchool: { src: walkToSchool, alt: 'Four schoolgirls in uniform walking along a quiet tree-lined road' },
  magnifier: { src: magnifier, alt: 'A schoolgirl studying a white flower through a magnifying glass', focus: '60% 45%' },
  groupOnGrass: { src: groupOnGrass, alt: 'Five students sitting on the grass with books and a laptop, talking through their work' },
  deskPencils: { src: deskPencils, alt: 'Overhead view of pencils, an eraser and a ruler beside a lined notebook' },
} satisfies Record<string, EditorialImage>;

export type ImageKey = keyof typeof images;
