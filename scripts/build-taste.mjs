#!/usr/bin/env node
/**
 * Builds content/taste.generated.ts: the homepage "Try it for ten seconds" miniatures (plan §3.2, screen 3),
 * one set per board and class, taken from the authored chapters in platform/content/authored (read only;
 * that folder belongs to the content agents).
 *
 *   node scripts/build-taste.mjs        then review the diff and commit it
 *
 * For each board and class it picks one chapter (subjects in the order below; the lowest chapter that has
 * enough plain-text material) and takes, verbatim:
 *   - three consecutive lesson slides (heading and text; slides that need maths rendering or a diagram to make
 *     sense are skipped, so the homepage never ships the maths renderer),
 *   - one flashcard,
 *   - one practice question, shown as a doubt a student might ask,
 * and, for the door (content/door-questions.generated.ts), one objective question from the same subject: four
 * plain-text options, one right, an authored explanation. It also counts the chapters released for each class
 * (SyllabusCount).
 * A class with no authored chapter yet borrows the nearest class of the same board, and says so.
 *
 * It is a snapshot, not a build step: the homepage never depends on the content folder at build time.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AUTHORED = join(ROOT, 'platform', 'content', 'authored');
const OUT = join(ROOT, 'content', 'taste.generated.ts');
const OUT_DOOR = join(ROOT, 'content', 'door-questions.generated.ts');

const BOARDS = ['cbse', 'cisce'];
const CLASSES = [7, 8, 9, 10, 11, 12];
const examFor = (board, cls) => (board === 'cbse' ? 'cbse' : cls <= 10 ? 'icse' : 'isc');
/** Subjects tried in this order: a science first (it reads well as slides), then maths. */
const SUBJECT_ORDER = ['science', 'physics', 'biology', 'chemistry', 'mathematics', 'geography', 'history-civics', 'economics'];
/** When a class has nothing yet, borrow from these (same board), nearest first. */
const BORROW = { 7: [9, 10], 8: [9, 10], 9: [10], 10: [9], 11: [12], 12: [11] };

// Plain text only: no LaTeX, no markdown tables or images, nothing that points at a diagram.
const PLAIN = (s) =>
  typeof s === 'string' && s.trim() !== '' && !/[$\\|<>]|!\[|```/.test(s) && !/\b(diagram|figure|shown|on the screen|below|above|graph|picture)\b/i.test(s);
const clip = (s, n) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n)).trimEnd()}…`);
const unbold = (s) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|\s)_([^_]+)_(?=\s|[.,;?]|$)/g, '$1$2');
const clean = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();

function chapters() {
  const out = [];
  for (const family of readdirSync(AUTHORED, { withFileTypes: true })) {
    if (!family.isDirectory()) continue;
    for (const dir of readdirSync(join(AUTHORED, family.name), { withFileTypes: true })) {
      const m = /^(cbse|icse|isc)-(\d+)-([a-z-]+)-ch(\d{2})$/.exec(dir.name);
      const file = join(AUTHORED, family.name, dir.name, 'release.json');
      if (m && existsSync(file)) out.push({ id: dir.name, exam: m[1], cls: Number(m[2]), subject: m[3], ch: Number(m[4]), file });
    }
  }
  return out;
}

/** The board catalogs (platform/catalog/<board>/subjects.yaml): subject id → display name and tier. */
const catalog = (() => {
  const subjects = {};
  for (const board of BOARDS) {
    // The catalog files may have Windows line endings; names lose their paper codes ("History & Civics (H.C.G. Paper 1)").
    const yaml = readFileSync(join(ROOT, 'platform', 'catalog', board, 'subjects.yaml'), 'utf8').replace(/\r\n/g, '\n');
    for (const entry of yaml.split(/\n  - id: /).slice(1)) {
      const id = entry.slice(0, entry.indexOf('\n')).trim();
      const name = /\n\s+name: "?([^"\n]+?)"?\n/.exec(entry)?.[1];
      const tier = /\n\s+tier: (\w+)/.exec(entry)?.[1] ?? 'elective';
      if (name) subjects[id] = { board, name: name.replace(/\s*\([^)]*\)\s*$/, '').trim(), tier };
    }
  }
  return subjects;
})();
const subjectNames = Object.fromEntries(Object.entries(catalog).map(([id, s]) => [id, s.name]));

/** Chapters in a subject's 2026-27 syllabus (platform/catalog/.../syllabus.yaml), or null when there is no syllabus file. */
function syllabusChapters(board, exam, cls, slug) {
  const dir = board === 'cbse' ? String(cls) : `${exam}-${cls}`;
  const file = join(ROOT, 'platform', 'catalog', board, dir, slug, 'syllabus.yaml');
  if (!existsSync(file)) return null;
  const yaml = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const ids = new Set([...yaml.matchAll(/\n\s+- id: ([a-z0-9-]+-ch\d{2})\n/g)].map((m) => m[1]));
  return ids.size || null;
}

function pick(release) {
  const deck = release.decks?.[0];
  if (!deck) return null;
  const slides = [];
  for (const [i, s] of (deck.slides ?? []).entries()) {
    if (slides.length === 0 && i > 6) break; // the taste is the opening of a lesson, not its summary
    const body = s.body_md && PLAIN(s.body_md) ? clean(s.body_md) : '';
    const bullets = (s.bullets ?? []).filter(PLAIN).map(clean).slice(0, 3);
    const ok =
      PLAIN(s.heading) &&
      (body || bullets.length) &&
      s.layout !== 'quiz' &&
      !s.check_question_id &&
      !/^(summary|exam tips|recap|check|quick check)\b/i.test(s.heading);
    if (ok) {
      slides.push({ heading: clean(s.heading), body: body ? clip(body, 230) : '', bullets: bullets.map((b) => clip(b, 90)) });
      if (slides.length === 3) break;
    } else if (slides.length) {
      slides.length = 0; // keep the three consecutive
    }
  }
  if (slides.length < 3) return null;
  const card = (release.flashcards?.cards ?? []).find((c) => PLAIN(c.front_md) && PLAIN(c.back_md) && c.back_md.length <= 220);
  // A doubt is something a student would type: an open question (short or long answer) that ends in "?" and
  // makes sense without options.
  const q = (release.questions ?? []).find(
    (x) =>
      (x.type === 'short' || x.type === 'long') &&
      PLAIN(x.stem_md) &&
      x.stem_md.length <= 150 &&
      x.stem_md.trim().endsWith('?') &&
      !/\b(following|these|this table|given below|options?)\b/i.test(x.stem_md)
  );
  if (!card || !q) return null;
  return {
    deckTitle: clean(deck.title ?? ''),
    slides,
    flashcard: { front: clean(card.front_md), back: clean(card.back_md) },
    doubt: clean(q.stem_md),
  };
}

/**
 * The door's question (plan §3.2, phase 6): one objective question per class, from the same subject. A single-answer
 * multiple-choice question with four plain-text options, short enough to sit inside the ring, with an authored
 * explanation that does not need maths rendering. Easier questions first.
 */
function doorQuestion(all, exam, cls, subject) {
  const mine = all.filter((c) => c.exam === exam && c.cls === cls && c.subject === subject).sort((a, b) => a.ch - b.ch);
  for (const c of mine) {
    const qs = JSON.parse(readFileSync(c.file, 'utf8')).questions ?? [];
    const ok = qs
      .filter(
        (x) =>
          x.type === 'mcq' &&
          (x.options ?? []).length === 4 &&
          (x.answer?.option_ids ?? []).length === 1 &&
          PLAIN(x.stem_md) &&
          x.stem_md.length <= 130 &&
          x.options.every((o) => PLAIN(o.text_md) && o.text_md.length <= 70) &&
          PLAIN(x.solution_md) &&
          x.solution_md.length <= 320 &&
          !/\b(all of the above|none of the above|both)\b/i.test(x.options.map((o) => o.text_md).join(' '))
      )
      // A real question (ends in "?") before a sentence to complete; then the easiest.
      .sort((a, b) => Number(!a.stem_md.trim().endsWith('?')) - Number(!b.stem_md.trim().endsWith('?')) || (a.difficulty ?? 3) - (b.difficulty ?? 3));
    const x = ok[0];
    if (x) {
      return {
        id: x.id,
        chapterId: c.id,
        stem: unbold(clean(x.stem_md)),
        options: x.options.map((o) => ({ id: o.id, text: unbold(clean(o.text_md)) })),
        answer: x.answer.option_ids[0],
        // Authored explanations name the option letter ("so (b).", ", option (c).", "— option (d)."); the ring shows
        // the options without letters, so the letter goes.
        explanation: unbold(clean(x.solution_md))
          .replace(/\s*(?:[,;—-]\s*)?(?:so\s+)?(?:the answer is\s+)?(?:option\s+)?\(([a-d])\)(?=[.\s]|$)/gi, '')
          .replace(/\s+\./g, '.')
          .replace(/,\s*so\.$/, '.')
          .replace(/\.\.$/, '.'),
      };
    }
  }
  return null;
}

/**
 * Your syllabus, counted (plan §4, device 3), for one class: per subject, the chapters in the 2026-27 syllabus and
 * the chapters with a release so far. Subjects: every one with a released chapter, then the class's core subjects
 * from the catalog (so a class with nothing yet still shows what is coming). Most written first.
 */
function written(all, board, exam, cls) {
  const mine = all.filter((c) => c.exam === exam && c.cls === cls);
  const slugs = new Set(mine.map((c) => c.subject));
  for (const [id, sub] of Object.entries(catalog)) {
    const m = new RegExp(`^${exam}-${cls}-([a-z0-9-]+)$`).exec(id);
    if (m && sub.tier === 'core' && !m[1].endsWith('-thailand')) slugs.add(m[1]);
  }
  const subjects = [...slugs]
    .map((slug) => {
      const inSyllabus = syllabusChapters(board, exam, cls, slug);
      const done = mine.filter((c) => c.subject === slug).length;
      return {
        name: subjectNames[`${exam}-${cls}-${slug}`] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase()),
        written: inSyllabus === null ? done : Math.min(done, inSyllabus),
        syllabus: inSyllabus,
      };
    })
    .filter((x) => x.written > 0 || x.syllabus !== null)
    .sort((a, b) => b.written - a.written || (b.syllabus ?? 0) - (a.syllabus ?? 0) || a.name.localeCompare(b.name));
  return { chapters: subjects.reduce((n, x) => n + x.written, 0), subjects };
}

function bestFor(all, exam, cls) {
  const mine = all.filter((c) => c.exam === exam && c.cls === cls);
  const rank = (c) => {
    const i = SUBJECT_ORDER.findIndex((s) => c.subject === s || c.subject.startsWith(`${s}`));
    return (i === -1 ? 99 : i) * 100 + c.ch;
  };
  for (const c of mine.sort((a, b) => rank(a) - rank(b))) {
    const picked = pick(JSON.parse(readFileSync(c.file, 'utf8')));
    if (picked) return { chapter: c, ...picked };
  }
  return null;
}

const all = chapters();
const entries = {};
const questions = {};
const report = [];
for (const board of BOARDS) {
  for (const cls of CLASSES) {
    let found = bestFor(all, examFor(board, cls), cls);
    let fromClass = cls;
    for (const alt of found ? [] : BORROW[cls]) {
      found = bestFor(all, examFor(board, alt), alt);
      if (found) {
        fromClass = alt;
        break;
      }
    }
    const key = `${board}-${cls}`;
    if (!found) {
      report.push(`${key}: nothing`);
      continue;
    }
    const subjectId = `${found.chapter.exam}-${found.chapter.cls}-${found.chapter.subject}`;
    const question = doorQuestion(all, found.chapter.exam, found.chapter.cls, found.chapter.subject);
    const ownExam = examFor(board, cls);
    entries[key] = {
      board,
      classLevel: cls,
      fromClass,
      exam: found.chapter.exam,
      subjectId,
      subjectSlug: found.chapter.subject,
      subject: subjectNames[subjectId] ?? found.chapter.subject.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      chapterId: found.chapter.id,
      chapter: found.deckTitle,
      slides: found.slides,
      flashcard: found.flashcard,
      doubt: found.doubt,
      // Your syllabus, counted (plan §4, device 3): chapters with a release for THIS class (not the borrowed one),
      // and the subjects they belong to, most chapters first. Counted from disk, never typed by hand.
      count: written(all, board, ownExam, cls),
    };
    if (question) {
      questions[key] = { ...question, board, classLevel: cls, fromClass, exam: found.chapter.exam, subject: entries[key].subject };
    }
    report.push(
      `${key}: ${found.chapter.id}${fromClass !== cls ? ` (borrowed from class ${fromClass})` : ''}; question ${question ? question.id : 'NONE'}; ` +
        `${entries[key].count.chapters} chapters written; ` +
        entries[key].count.subjects.map((x) => `${x.name} ${x.written}/${x.syllabus ?? '?'}`).join(', ')
    );
  }
}

const header = `/**
 * GENERATED by scripts/build-taste.mjs from platform/content/authored (${new Date().toISOString().slice(0, 10)}).
 * Do not edit by hand: change the script or the content, run it again, review the diff.
 * Text is verbatim from the authored chapters (origin: human, D-026).
 */
`;
const body = `export interface TasteSlide {
  heading: string;
  body: string;
  bullets: string[];
}

export interface TasteEntry {
  board: 'cbse' | 'cisce';
  classLevel: number;
  /** The class the material comes from: the same as classLevel unless this class has no chapter yet. */
  fromClass: number;
  exam: 'cbse' | 'icse' | 'isc';
  subjectId: string;
  subjectSlug: string;
  subject: string;
  chapterId: string;
  chapter: string;
  slides: TasteSlide[];
  flashcard: { front: string; back: string };
  doubt: string;
  /**
   * Your syllabus, counted: chapters released so far for THIS class (not the borrowed one), and per subject the
   * chapters written and the chapters in the 2026-27 syllabus (null when the catalog has no syllabus file).
   */
  count: { chapters: number; subjects: { name: string; written: number; syllabus: number | null }[] };
}

export const TASTE: Record<string, TasteEntry> = ${JSON.stringify(entries, null, 2)};
`;
writeFileSync(OUT, header + body);

// The door's question lives in its own small file: the hero ships it on every visit, flag on or off, and should
// not carry the whole taste snapshot with it.
const doorBody = `export interface DoorQuestion {
  /** The authored question's id (platform/content/authored/<family>/<chapterId>/release.json). */
  id: string;
  chapterId: string;
  board: 'cbse' | 'cisce';
  classLevel: number;
  /** The class the question comes from: the same as classLevel unless this class has no chapter yet. */
  fromClass: number;
  exam: 'cbse' | 'icse' | 'isc';
  subject: string;
  stem: string;
  /** Four options, in the authored order. */
  options: { id: string; text: string }[];
  /** The id of the right option. */
  answer: string;
  /** The authored explanation, without the option letter. */
  explanation: string;
}

export const DOOR_QUESTIONS: Record<string, DoorQuestion> = ${JSON.stringify(questions, null, 2)};
`;
writeFileSync(OUT_DOOR, header + doorBody);
console.log(report.join('\n'));
console.log(`wrote ${OUT}`);
console.log(`wrote ${OUT_DOOR}`);
