/**
 * Gate for hand-authored exemplars: schema-valid and meeting the editorial rules in CONTEXT §8
 * (targets in platform/shared/config/content-targets.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { ChapterRelease, SubjectsFile, SyllabusFile, TestDefinition, checkScriptRelease, parseChapterId, scriptForLanguage } from '@soyl/shared/content/index';
import { CONTENT_TARGETS } from '@soyl/shared/config/content-targets';

const here = path.dirname(fileURLToPath(import.meta.url));
/** Gold-standard exemplars, plus hand-authored production chapters (D-026), held to the same gate. */
const contentRoots = [path.join(here, 'exemplars'), path.join(here, '..', 'content', 'authored')];
const catalogDir = path.join(here, '..', 'catalog');

/** Families where "a visual at least every 3 slides" does not apply (CONTEXT §8: "where the subject allows"). */
const TEXT_FAMILIES = new Set(['hindi-language', 'hindi-literature', 'english-language', 'english-literature']);

function exemplarDirs(): { family: string; dir: string }[] {
  return contentRoots.filter((root) => fs.existsSync(root)).flatMap((root) =>
    fs
      .readdirSync(root)
      .filter((family) => fs.statSync(path.join(root, family)).isDirectory())
      .flatMap((family) =>
        fs
          .readdirSync(path.join(root, family))
          .map((name) => ({ family, dir: path.join(root, family, name) }))
          .filter((e) => fs.statSync(e.dir).isDirectory()),
      ),
  );
}

function syllabusFor(subjectId: string) {
  const [exam, cls, ...rest] = subjectId.split('-');
  const slug = rest.join('-');
  const file =
    exam === 'cbse'
      ? path.join(catalogDir, 'cbse', cls!, slug, 'syllabus.yaml')
      : path.join(catalogDir, 'cisce', `${exam}-${cls}`, slug, 'syllabus.yaml');
  return SyllabusFile.parse(yaml.load(fs.readFileSync(file, 'utf8')));
}

/** Subject id → { language, script } from catalog/<board>/subjects.yaml. */
const subjectScripts = new Map<string, { language: string; script: string }>();
for (const board of ['cbse', 'cisce']) {
  const file = path.join(catalogDir, board, 'subjects.yaml');
  if (!fs.existsSync(file)) continue;
  for (const s of SubjectsFile.parse(yaml.load(fs.readFileSync(file, 'utf8'))).subjects) subjectScripts.set(s.id, { language: s.language, script: s.script });
}

const dirs = exemplarDirs();

describe('exemplars', () => {
  it('directory exists (exemplars are added by exemplar-author)', () => {
    expect(Array.isArray(dirs)).toBe(true);
  });

  for (const { family, dir } of dirs) {
    describe(`${family}/${path.basename(dir)}`, () => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
      const parsed = ChapterRelease.safeParse(raw);

      it('is a valid ChapterRelease', () => {
        expect(parsed.success ? [] : parsed.error.issues.slice(0, 10)).toEqual([]);
      });
      if (!parsed.success) return;
      const release = parsed.data;
      const { subjectId } = parseChapterId(release.unit);
      const cls = Number(subjectId.split('-')[1]);

      it('is named after its chapter and has a README', () => {
        expect(path.basename(dir)).toBe(release.unit);
        expect(fs.existsSync(path.join(dir, 'README.md'))).toBe(true);
      });

      it('uses only topics from the chapter syllabus', () => {
        const chapter = syllabusFor(subjectId).chapters.find((c) => c.id === release.unit);
        expect(chapter, `chapter ${release.unit} in syllabus`).toBeTruthy();
        const topics = new Set(chapter!.topics.map((t) => t.id));
        const used = [
          ...release.questions.flatMap((q) => [...q.topic_ids, ...q.children.flatMap((c) => c.topic_ids)]),
          ...release.notes.sections.flatMap((s) => s.topic_ids),
          ...release.flashcards.cards.flatMap((c) => (c.topic_id ? [c.topic_id] : [])),
        ];
        expect(used.filter((t) => !topics.has(t))).toEqual([]);
      });

      it('decks meet the visual lesson rules', () => {
        for (const deck of release.decks) {
          const n = deck.slides.length;
          const layouts = deck.slides.map((s) => s.layout);
          const count = (l: string) => layouts.filter((x) => x === l).length;
          expect(n, 'slide count').toBeGreaterThanOrEqual(CONTENT_TARGETS.deckSlidesMin);
          expect(n, 'slide count').toBeLessThanOrEqual(CONTENT_TARGETS.deckSlidesMax);
          expect(count('summary'), 'summary slide').toBeGreaterThanOrEqual(1);
          expect(count('exam-tips'), 'exam-tips slide').toBeGreaterThanOrEqual(1);
          expect(count('check'), 'check slides').toBeGreaterThanOrEqual(CONTENT_TARGETS.checkQuestionsMin);
          expect(count('check'), 'check slides').toBeLessThanOrEqual(CONTENT_TARGETS.checkQuestionsMax);
          if (!TEXT_FAMILIES.has(family)) {
            expect(count('example'), 'worked examples').toBeGreaterThanOrEqual(CONTENT_TARGETS.workedExamplesMin);
            // No run of more than N slides without a visual.
            let gap = 0;
            for (const s of deck.slides) {
              gap = s.visual ? 0 : gap + 1;
              expect(gap, `slides without a visual before ${s.id}`).toBeLessThanOrEqual(CONTENT_TARGETS.visualEverySlides);
            }
          }
        }
      });

      it('has enough flashcards and practice questions', () => {
        expect(release.flashcards.cards.length).toBeGreaterThanOrEqual(CONTENT_TARGETS.flashcardsMin);
        expect(release.flashcards.cards.length).toBeLessThanOrEqual(CONTENT_TARGETS.flashcardsMax);
        expect(release.questions.length).toBeGreaterThanOrEqual(CONTENT_TARGETS.practiceQuestionsMin[cls]!);
        expect(new Set(release.questions.map((q) => q.type)).size, 'distinct question types').toBeGreaterThanOrEqual(5);
      });

      it('writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)', () => {
        // Generic by script (shared/content/script.ts, ported from the Hindi exemplar validator):
        // the subject's script from subjects.yaml, else the content language (hi → Deva, ta → Taml…).
        const subject = subjectScripts.get(subjectId);
        const script = scriptForLanguage(release.notes.language, subject?.script);
        if (!script) return;
        const errors = checkScriptRelease(release, script)
          .filter((i) => i.severity === 'error')
          .map((i) => `[${i.rule}] ${i.path}: ${i.message}`);
        expect(errors.slice(0, 20), `${errors.length} script error(s)`).toEqual([]);
      });

      it('has a short and a long chapter test drawn from its own questions', () => {
        const testsFile = JSON.parse(fs.readFileSync(path.join(dir, 'tests.json'), 'utf8'));
        const tests = (testsFile.tests as unknown[]).map((t) => TestDefinition.parse(t));
        expect(tests.map((t) => t.paper_type).sort()).toEqual(['chapter-test-long', 'chapter-test-short']);
        const versions = new Map(release.questions.map((q) => [q.id, q.version]));
        for (const t of tests) {
          expect(t.chapter_ids).toEqual([release.unit]);
          for (const item of t.sections.flatMap((s) => s.items)) {
            expect(versions.get(item.question_id), `question ${item.question_id}`).toBe(item.question_version);
            const q = release.questions.find((x) => x.id === item.question_id)!;
            expect(item.marks, `marks of ${item.question_id}`).toBe(q.marks);
          }
        }
      });
    });
  }
});
