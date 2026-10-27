/**
 * Stage 1: load and validate the catalog in platform/catalog/ (ARCHITECTURE §7.1, D-020):
 *   <board>/subjects.yaml                         every subject of that board
 *   cbse/<class>/<slug>/syllabus.yaml             CBSE syllabus
 *   cisce/<icse|isc>-<class>/<slug>/syllabus.yaml CISCE syllabus
 *   **\/blueprints/*.yaml                         blueprints (subject-level or board/class defaults)
 */
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import {
  Blueprint,
  SubjectsFile,
  SyllabusFile,
  type Subject,
  type SyllabusChapter,
} from '@soyl/shared/content/index';
import { familyForSubject } from '../config/families';

export interface CatalogIssue {
  severity: 'error' | 'warning';
  file: string;
  message: string;
}

export interface Catalog {
  dir: string;
  subjects: Subject[];
  subjectsById: Map<string, Subject>;
  syllabi: Map<string, SyllabusFile>;
  blueprints: Blueprint[];
  issues: CatalogIssue[];
}

/** Relative directory of a subject in the catalog. */
export function subjectDir(subjectId: string): string {
  const [exam, cls, ...rest] = subjectId.split('-');
  const slug = rest.join('-');
  return exam === 'cbse' ? path.join('cbse', cls!, slug) : path.join('cisce', `${exam}-${cls}`, slug);
}

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function readYaml(file: string): unknown {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function zodIssues(error: { issues: { path: PropertyKey[]; message: string }[] }, max = 5): string {
  const shown = error.issues.slice(0, max).map((i) => `${i.path.map(String).join('.') || '(root)'}: ${i.message}`);
  return shown.join('; ') + (error.issues.length > max ? ` (+${error.issues.length - max} more)` : '');
}

export function loadCatalog(dir: string): Catalog {
  const issues: CatalogIssue[] = [];
  const rel = (f: string) => path.relative(dir, f).split(path.sep).join('/');
  const err = (file: string, message: string) => issues.push({ severity: 'error', file: rel(file), message });
  const warn = (file: string, message: string) => issues.push({ severity: 'warning', file: rel(file), message });

  const subjects: Subject[] = [];
  const subjectsById = new Map<string, Subject>();
  const boards = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== 'sources') : [];
  if (!boards.length) err(dir, 'no board directories found');

  for (const board of boards) {
    const file = path.join(dir, board.name, 'subjects.yaml');
    if (!fs.existsSync(file)) {
      err(file, 'missing subjects.yaml');
      continue;
    }
    let parsed;
    try {
      parsed = SubjectsFile.safeParse(readYaml(file));
    } catch (e) {
      err(file, `YAML: ${(e as Error).message.split('\n')[0]}`);
      continue;
    }
    if (!parsed.success) {
      err(file, zodIssues(parsed.error));
      continue;
    }
    if (parsed.data.board && parsed.data.board !== board.name) err(file, `board "${parsed.data.board}" but directory is ${board.name}`);
    for (const s of parsed.data.subjects) {
      if (s.board !== board.name) err(file, `${s.id}: board ${s.board} in ${board.name}/subjects.yaml`);
      if (subjectsById.has(s.id)) err(file, `${s.id}: duplicate across subjects files`);
      subjectsById.set(s.id, s);
      subjects.push(s);
      if (familyForSubject(s).matchedBy === 'unknown') warn(file, `${s.id}: no family rule (content-pipeline/config/families.ts); using "other"`);
    }
  }

  const syllabi = new Map<string, SyllabusFile>();
  const blueprints: Blueprint[] = [];
  const seenIds = new Map<string, string>();

  for (const board of boards) {
    const files = walk(path.join(dir, board.name));
    for (const file of files.filter((f) => path.basename(f) === 'syllabus.yaml')) {
      let parsed;
      try {
        parsed = SyllabusFile.safeParse(readYaml(file));
      } catch (e) {
        err(file, `YAML: ${(e as Error).message.split('\n')[0]}`);
        continue;
      }
      if (!parsed.success) {
        err(file, zodIssues(parsed.error));
        continue;
      }
      const syl = parsed.data;
      const expectedDir = subjectDir(syl.subject_id);
      if (path.normalize(path.relative(dir, path.dirname(file))) !== path.normalize(expectedDir))
        err(file, `subject_id ${syl.subject_id} belongs in ${expectedDir.split(path.sep).join('/')}`);
      if (!subjectsById.has(syl.subject_id)) err(file, `subject ${syl.subject_id} is not in ${board.name}/subjects.yaml`);
      if (syllabi.has(syl.subject_id)) err(file, `second syllabus for ${syl.subject_id}`);
      syllabi.set(syl.subject_id, syl);
      const unitNames = new Set(syl.units.map((u) => u.name));
      syl.chapters.forEach((ch, i) => {
        if (ch.number !== i + 1) err(file, `${ch.id}: number ${ch.number} at position ${i + 1}`);
        if (!ch.id.endsWith(`-ch${String(ch.number).padStart(2, '0')}`)) err(file, `${ch.id}: id does not match number ${ch.number}`);
        if (ch.unit && unitNames.size && !unitNames.has(ch.unit)) err(file, `${ch.id}: unit "${ch.unit}" not in units[]`);
        for (const id of [ch.id, ...ch.topics.map((t) => t.id)]) {
          const prev = seenIds.get(id);
          if (prev && prev !== file) err(file, `${id} also defined in ${rel(prev)}`);
          seenIds.set(id, file);
        }
        const noOutcomes = ch.topics.filter((t) => !t.learning_outcomes.length).length;
        if (noOutcomes) warn(file, `${ch.id}: ${noOutcomes} topic(s) without learning outcomes`);
      });
    }

    // Subject blueprints: <subject>/blueprints/*.yaml; board/class defaults: <board>/blueprints/<class>/*.yaml.
    for (const file of files.filter((f) => /[\\/]blueprints[\\/](?:\d{1,2}[\\/])?[^\\/]+\.ya?ml$/.test(f))) {
      let parsed;
      try {
        parsed = Blueprint.safeParse(readYaml(file));
      } catch (e) {
        err(file, `YAML: ${(e as Error).message.split('\n')[0]}`);
        continue;
      }
      if (!parsed.success) {
        err(file, zodIssues(parsed.error));
        continue;
      }
      const bp = parsed.data;
      if (bp.board !== board.name) err(file, `blueprint board ${bp.board} under ${board.name}/`);
      if (bp.subject_id) {
        if (!subjectsById.has(bp.subject_id)) err(file, `blueprint subject ${bp.subject_id} not in subjects.yaml`);
        else {
          const s = subjectsById.get(bp.subject_id)!;
          if (s.class !== bp.class || s.exam !== bp.exam) err(file, `blueprint class/exam ${bp.exam}-${bp.class} ≠ subject ${s.id}`);
          const v = bp.variant;
          if (v && !s.variants.some((sv) => sv.name === v.name && sv.code === v.code))
            err(file, `blueprint variant ${v.name} (${v.code ?? 'no code'}) is not one of ${s.id}'s variants in subjects.yaml`);
        }
        const expected = path.join(subjectDir(bp.subject_id), 'blueprints');
        if (path.normalize(path.relative(dir, path.dirname(file))) !== path.normalize(expected))
          warn(file, `subject blueprint usually lives in ${expected.split(path.sep).join('/')}`);
      }
      if (blueprints.some((b) => b.id === bp.id)) err(file, `duplicate blueprint id ${bp.id}`);
      blueprints.push(bp);
    }
  }

  return { dir, subjects, subjectsById, syllabi, blueprints, issues };
}

export interface ChapterRef {
  subject: Subject;
  syllabus: SyllabusFile;
  chapter: SyllabusChapter;
}

export function findChapter(catalog: Catalog, unit: string): ChapterRef | null {
  const subjectId = unit.replace(/-ch\d{2}$/, '');
  const subject = catalog.subjectsById.get(subjectId);
  const syllabus = catalog.syllabi.get(subjectId);
  const chapter = syllabus?.chapters.find((c) => c.id === unit);
  return subject && syllabus && chapter ? { subject, syllabus, chapter } : null;
}

/** Blueprints that apply to a subject: its own, else board/class defaults (subject_id null). */
export function blueprintsFor(catalog: Catalog, subject: Subject): Blueprint[] {
  const own = catalog.blueprints.filter((b) => b.subject_id === subject.id);
  if (own.length) return own;
  return catalog.blueprints.filter((b) => b.subject_id === null && b.board === subject.board && b.class === subject.class && b.exam === subject.exam);
}

export interface Scope {
  board?: string;
  class?: number;
  subject?: string;
  chapter?: number;
}

/** Subjects in scope; `subject` accepts a slug ("science") or a full id ("cbse-10-science"). */
export function subjectsInScope(catalog: Catalog, scope: Scope): Subject[] {
  return catalog.subjects.filter((s) => {
    if (scope.board && s.board !== scope.board && s.exam !== scope.board) return false;
    if (scope.class !== undefined && s.class !== scope.class) return false;
    if (scope.subject && s.id !== scope.subject && s.id.split('-').slice(2).join('-') !== scope.subject) return false;
    return true;
  });
}

/** Chapters (units) in scope. Subjects without a syllabus file have no units yet. */
export function unitsInScope(catalog: Catalog, scope: Scope): ChapterRef[] {
  const out: ChapterRef[] = [];
  for (const subject of subjectsInScope(catalog, scope)) {
    const syllabus = catalog.syllabi.get(subject.id);
    if (!syllabus) continue;
    for (const chapter of syllabus.chapters) {
      if (scope.chapter !== undefined && chapter.number !== scope.chapter) continue;
      out.push({ subject, syllabus, chapter });
    }
  }
  return out;
}
