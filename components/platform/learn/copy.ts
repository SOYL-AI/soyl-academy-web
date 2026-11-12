/**
 * Copy tone per age stage for the Learn pages (DESIGN-LANGUAGE.md §6): junior (7–8) warmer and playful, middle
 * (9–10) balanced, senior (11–12) short and calm. Pure (server, client and tests). Stages change words only, never
 * what a student can do.
 */
import { byStage, type Stage } from '../shell/stage';

type Greet = 'Good morning' | 'Good afternoon' | 'Good evening';

/** "Hi Asha, ready to explore?" / "Good evening, Asha" / "Evening, Asha". */
export function stageGreeting(stage: Stage, greet: Greet, name: string | null): string {
  const n = name?.trim() || null;
  const short = greet.replace(/^Good (\w)/, (_, c: string) => c.toUpperCase());
  return byStage(stage, {
    junior: n ? `Hi ${n}, ready to explore?` : 'Hi, ready to explore?',
    middle: n ? `${greet}, ${n}` : greet,
    senior: n ? `${short}, ${n}` : greet,
  });
}

/** The line under a member's greeting on /learn. */
export function learnSubtitle(stage: Stage): string {
  return byStage(stage, {
    junior: 'Pick up where you left off, or try something new. It is all free.',
    middle: 'Lessons, notes, practice and tests for your subjects, all free.',
    senior: 'Your subjects, chapters and practice in one place.',
  });
}

/** The primary action to a chapter: "Let's go: Chapter 3" / "Continue Chapter 3" / "Continue: Electrostatics". */
export function chapterCta(stage: Stage, kind: 'start' | 'continue', chapter: { number: number; title: string }): string {
  if (kind === 'start')
    return byStage(stage, {
      junior: `Let's go: Chapter ${chapter.number}`,
      middle: `Start Chapter ${chapter.number}`,
      senior: `Start: ${chapter.title}`,
    });
  return byStage(stage, {
    junior: `Let's go: Chapter ${chapter.number}`,
    middle: `Continue Chapter ${chapter.number}`,
    senior: `Continue: ${chapter.title}`,
  });
}

/** The short pill on a ContinueCard. */
export function continuePill(stage: Stage, kind: 'start' | 'continue'): string {
  if (kind === 'start') return byStage(stage, { junior: "Let's go", middle: 'Start', senior: 'Start' });
  return byStage(stage, { junior: "Let's go", middle: 'Continue', senior: 'Continue' });
}

/** Empty "Your subjects" for a member without a class on the profile. */
export function noClassText(stage: Stage): string {
  return byStage(stage, {
    junior: 'Nothing here yet. Tell us your class and your subjects show up here.',
    middle: 'Add your board and class to your profile and your subjects appear here.',
    senior: 'Add your board and class to see your subjects.',
  });
}

/** The class hub's lead line. */
export function classLead(stage: Stage, ready: number, total: number, academicYear: string): string {
  const courses = `${ready} ${ready === 1 ? 'course is' : 'courses are'} ready to learn, free.`;
  if (ready === 0) return `${total} subjects for ${academicYear}. Lessons are on the way; every chapter list is already here.`;
  return byStage(stage, {
    junior: `${courses} Pick one and start exploring.`,
    middle: `${courses} ${total} subjects in the ${academicYear} syllabus.`,
    senior: `${courses} ${total} subjects · ${academicYear} syllabus.`,
  });
}
