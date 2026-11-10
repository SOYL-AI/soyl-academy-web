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
 *   - one practice question, shown as a doubt a student might ask.
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

const subjectNames = (() => {
  const names = {};
  for (const board of BOARDS) {
    const yaml = readFileSync(join(ROOT, 'platform', 'catalog', board, 'subjects.yaml'), 'utf8');
    for (const m of yaml.matchAll(/- id: ([a-z0-9-]+)\n(?:\s+[a-z_]+: .*\n)*?\s+name: "?([^"\n]+)"?/g)) names[m[1]] = m[2].trim();
  }
  return names;
})();

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
    };
    report.push(`${key}: ${found.chapter.id}${fromClass !== cls ? ` (borrowed from class ${fromClass})` : ''}`);
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
}

export const TASTE: Record<string, TasteEntry> = ${JSON.stringify(entries, null, 2)};
`;
writeFileSync(OUT, header + body);
console.log(report.join('\n'));
console.log(`wrote ${OUT}`);
