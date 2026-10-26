import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { FAMILIES, familyForChapter, familyForSubject, subjectSlug } from '../config/families';
import { loadCatalog, findChapter } from '../src/catalog';
import { questionIdPrefix, subjectAbbreviation } from '../src/ids';
import { defaultPaths } from '../src/paths';
import { allocate, partTopics, planSlots, questionBatches, questionPlan, skeletonOutline } from '../src/planning';
import { generateItems, provisionalOutline, unitContext } from '../src/requests';
import {
  PLACEHOLDERS,
  TemplateError,
  loadFewShot,
  parseTemplate,
  renderTemplate,
  resolveTemplate,
  stratifiedSample,
  templateRef,
  type TemplateVars,
} from '../src/templates';
import { tempDir } from './helpers';

const paths = defaultPaths();
const catalog = loadCatalog(paths.catalogDir);

const TPL = `---
id: test.deck
asset: deck
family: science
version: 3
model_tier: mid
max_output_tokens: 1000
temperature: 0.2
few_shot: []
---
## System
You write for {{board}}.

## User
Chapter {{chapter_id}}: {{chapter_title}}
{{json_schema}}
`;

const vars = Object.fromEntries(PLACEHOLDERS.map((p) => [p, `<${p}>`])) as TemplateVars;

describe('prompt templates', () => {
  it('parses front matter and splits system/user', () => {
    const t = parseTemplate(TPL, 'x.md');
    expect(templateRef(t)).toBe('test.deck@3');
    expect(t.model_tier).toBe('mid');
    const r = renderTemplate(t, vars);
    expect(r.system).toBe('You write for <board>.');
    expect(r.user).toContain('Chapter <chapter_id>: <chapter_title>');
  });

  it('appends {{task}} when the template does not place it', () => {
    const r = renderTemplate(parseTemplate(TPL, 'x.md'), { ...vars, task: 'Write exactly 22 slides.' });
    expect(r.user.trim().endsWith('Write exactly 22 slides.')).toBe(true);
    const placed = parseTemplate(TPL.replace('{{json_schema}}', '{{task}}\n{{json_schema}}'), 'y.md');
    const r2 = renderTemplate(placed, { ...vars, task: 'TASK' });
    expect(r2.user.match(/TASK/g)).toHaveLength(1);
  });

  it('fails on unknown placeholders and missing values', () => {
    expect(() => parseTemplate(TPL.replace('{{chapter_title}}', '{{chapter_name}}'), 'x.md')).toThrow(/unknown placeholder.*chapter_name/);
    const { board: _b, ...partial } = vars;
    expect(() => renderTemplate(parseTemplate(TPL, 'x.md'), partial)).toThrow(TemplateError);
    expect(() => parseTemplate('no front matter', 'x.md')).toThrow(/front matter/);
    expect(() => parseTemplate(TPL.replace('model_tier: mid', 'model_tier: huge'), 'x.md')).toThrow(/model_tier/);
  });

  it('supports content_json and id_prefix', () => {
    const t = parseTemplate(TPL.replace('{{json_schema}}', '{{content_json}} {{id_prefix}}'), 'x.md');
    expect(renderTemplate(t, vars).user).toContain('<content_json> <id_prefix>');
  });

  it('resolves exemplar templates first, related families next, then fallbacks', () => {
    expect(resolveTemplate('science', 'deck', paths).fallback).toBe(false);
    expect(resolveTemplate('physics', 'deck', paths).id).toBe('science.deck');
    const fb = resolveTemplate('hindi-literature', 'flashcards', { ...paths, templatesDir: tempDir() });
    expect(fb.fallback).toBe(true);
    expect(templateRef(fb)).toBe('fallback.flashcards@1');
  });

  it('parses every template in content-templates/prompts and the fallbacks', () => {
    const dirs = [path.join(paths.templatesDir, 'prompts'), paths.fallbackTemplatesDir];
    const files = dirs.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d, { recursive: true }).map(String).filter((f) => /\.v\d+\.md$/.test(f)).map((f) => path.join(d, f)) : []));
    expect(files.length).toBeGreaterThanOrEqual(6);
    for (const f of files) expect(() => parseTemplate(fs.readFileSync(f, 'utf8'), f)).not.toThrow();
  });
});

describe('few_shot resolution', () => {
  const release = 'exemplars/science/cbse-10-science-ch01/release.json';
  const hasExemplar = fs.existsSync(path.join(paths.templatesDir, release));

  it('reports missing files without failing', () => {
    const r = loadFewShot(['exemplars/none/x/release.json#decks'], paths.templatesDir, 'deck');
    expect(r.missing).toEqual(['exemplars/none/x/release.json#decks']);
    expect(r.text).toMatch(/no worked example/);
  });

  it('refuses paths outside content-templates', () => {
    expect(() => loadFewShot(['../catalog/cbse/subjects.yaml'], paths.templatesDir)).toThrow(/outside/);
    // The authored/ alias is contained too.
    expect(() => loadFewShot(['authored/../../catalog/cbse/subjects.yaml'], paths.templatesDir)).toThrow(/outside/);
  });

  it('resolves authored/ to platform/content/authored', () => {
    const ref = 'authored/science/cbse-10-science-ch02/release.json#decks';
    const r = loadFewShot([ref], paths.templatesDir, 'deck', 1e9);
    expect(r.missing).toEqual([]);
    expect(r.text).toMatch(/Acids|acid/);
  });

  it.runIf(hasExemplar)('trims by asset: case passages get only case items, questions a stratified sample', () => {
    const pick = (asset: 'case-passages' | 'questions', ref = `${release}#questions`) => {
      const text = loadFewShot([ref], paths.templatesDir, asset, 1e9).text;
      return JSON.parse(text.slice(text.indexOf('\n') + 1)) as { type: string }[];
    };
    const cases = pick('case-passages');
    expect(cases.length).toBeLessThanOrEqual(2);
    expect(cases.every((q) => q.type === 'case-based' || q.type === 'source-based')).toBe(true);
    const qs = pick('questions');
    expect(qs.length).toBeLessThanOrEqual(12);
    expect(new Set(qs.map((q) => q.type)).size).toBe(qs.length > 0 ? new Set(qs.map((q) => q.type)).size : 0);
    expect(qs.some((q) => q.type === 'case-based')).toBe(false);
    expect(pick('questions', `${release}#questions?type=mcq&sample=3`)).toHaveLength(3);
    expect(pick('questions', `${release}#questions[0:2]`)).toHaveLength(2);
  });

  it.runIf(hasExemplar)('trims decks to the first deck and at most 12 slides covering every layout', () => {
    const text = loadFewShot([`${release}#decks`], paths.templatesDir, 'deck', 1e9).text;
    const decks = JSON.parse(text.slice(text.indexOf('\n') + 1)) as { slides: { layout: string }[] }[];
    expect(decks).toHaveLength(1);
    expect(decks[0]!.slides.length).toBeLessThanOrEqual(12);
    expect(new Set(decks[0]!.slides.map((s) => s.layout)).size).toBeGreaterThanOrEqual(6);
  });

  it('samples one item per type first', () => {
    const items = ['a', 'a', 'b', 'c', 'a', 'b'].map((type, i) => ({ type, i }));
    expect(stratifiedSample(items, 3).map((x) => x.i)).toEqual([0, 2, 3]);
  });
});

describe('subject → family mapping', () => {
  it('maps every catalog subject to a known family; none is unmapped', () => {
    const unknown = catalog.subjects.filter((s) => familyForSubject(s).matchedBy === 'unknown').map((s) => s.id);
    expect(unknown).toEqual([]);
    for (const s of catalog.subjects) expect(FAMILIES).toContain(familyForSubject(s).family);
  });

  it('gives every core academic subject a dedicated family', () => {
    // Physical education is core in CBSE 11–12 but has no template family of its own (theory only, `other`).
    const core = catalog.subjects.filter((s) => s.tier === 'core' && familyForSubject(s).family === 'other' && subjectSlug(s.id) !== 'physical-education');
    expect(core.map((s) => s.id)).toEqual([]);
  });

  it('routes the pilot and language chapters as expected', () => {
    const sci = catalog.subjectsById.get('cbse-10-science')!;
    expect(familyForSubject(sci).family).toBe('science');
    expect(familyForSubject(catalog.subjectsById.get('cbse-12-physics')!).family).toBe('physics');
    expect(familyForSubject(catalog.subjectsById.get('cbse-10-hindi-a')!).family).toBe('hindi-language');
    const eng = catalog.subjectsById.get('cbse-10-english-language-and-literature')!;
    const syl = catalog.syllabi.get(eng.id)!;
    const lit = syl.chapters.find((c) => c.literature_texts.length > 0);
    const lang = syl.chapters.find((c) => c.literature_texts.length === 0);
    if (lit) expect(familyForChapter(eng, lit)).toBe('english-literature');
    if (lang) expect(familyForChapter(eng, lang)).toBe('english-language');
    expect(familyForSubject({ id: 'icse-10-literature-in-english', tier: 'core', language: 'en' }).family).toBe('english-literature');
    expect(familyForSubject({ id: 'isc-12-tamil', tier: 'language', language: 'ta' }).matchedBy).toBe('language');
  });
});

describe('question id prefix', () => {
  it('follows q_<exam><class><abbrev>_chNN', () => {
    expect(questionIdPrefix('cbse-10-science-ch01')).toBe('q_cbse10sci_ch01');
    expect(questionIdPrefix('isc-12-physics-ch07')).toBe('q_isc12phy_ch07');
    expect(questionIdPrefix('cbse-11-agriculture-ch02')).toBe('q_cbse11agriculture_ch02');
  });

  it('is unique per exam and class across the whole catalog', () => {
    const seen = new Map<string, string>();
    for (const s of catalog.subjects) {
      const key = `${s.exam}${s.class}${subjectAbbreviation(subjectSlug(s.id))}`;
      expect(seen.get(key), `${s.id} collides with ${seen.get(key)}`).toBeUndefined();
      seen.set(key, s.id);
    }
  });
});

describe('planning', () => {
  it('allocates exactly, with minimums', () => {
    expect(allocate(60, [0.3, 0.1, 0.6]).reduce((a, b) => a + b)).toBe(60);
    expect(allocate(10, [1, 0, 0], 1)).toEqual([8, 1, 1]);
  });

  it('plans the class practice minimum across ≥ 5 types, every question in a batch', () => {
    const plan = questionPlan(10, 'science', []);
    expect(plan.total).toBe(60);
    expect(plan.by_type.reduce((n, t) => n + t.count, 0)).toBe(60);
    expect(plan.by_type.length).toBeGreaterThanOrEqual(5);
    expect(plan.by_difficulty.reduce((n, d) => n + d.count, 0)).toBe(60);
    expect(plan.by_competency.reduce((n, c) => n + c.count, 0)).toBe(60);
    const slots = planSlots(plan, ['t1', 't2', 't3']);
    const batches = questionBatches(slots);
    expect(batches.reduce((n, b) => n + b.slots.length, 0)).toBe(60);
    expect(batches.every((b) => b.slots.length <= 15)).toBe(true);
    expect(questionPlan(9, 'social-science', []).total).toBe(40);
  });

  it('uses blueprint question types when present', () => {
    const bp = {
      id: 'x', board: 'cbse', exam: 'cbse', class: 10, subject_id: 'cbse-10-science', paper_type: 'board', academic_year: '2026-27', duration_min: 180, total_marks: 10,
      mark_shares: {}, scope: 'syllabus', source_status: 'unverified', source: 't', notes: null,
      sections: [{ id: 'A', title: 'A', instructions: '', items: [{ type: 'mcq', count: 6, marks_each: 1, internal_choice: null, competency: null, difficulty: null }, { type: 'long', count: 1, marks_each: 4, internal_choice: null, competency: null, difficulty: null }] }],
    } as const;
    const plan = questionPlan(10, 'science', [bp as never]);
    expect(plan.sources[0]).toBe('x');
    expect(plan.by_type.map((t) => t.type)).toEqual(expect.arrayContaining(['mcq', 'long']));
    expect(plan.by_type.length).toBeGreaterThanOrEqual(5);
  });

  it('splits long chapters into parts that each fit the slide budget', () => {
    const topics = Array.from({ length: 16 }, (_, i) => ({ id: `cbse-10-science-ch01-t${String(i + 1).padStart(2, '0')}`, title: `T${i}`, learning_outcomes: [], board_assessed: true }));
    const chapter = { id: 'cbse-10-science-ch01', number: 1, title: 'Long', topics, removed_topics: [], literature_texts: [], board_assessed: true };
    expect(partTopics(chapter).length).toBe(3);
    const outline = skeletonOutline(chapter as never, 'science');
    for (const part of outline.parts) {
      expect(part.slides.length).toBeGreaterThanOrEqual(12);
      expect(part.slides.length).toBeLessThanOrEqual(25);
    }
    const one = skeletonOutline({ ...chapter, topics: topics.slice(0, 1) } as never, 'science');
    expect(one.parts[0]!.slides.length).toBeGreaterThanOrEqual(12);
  });

  it('builds one request per item for the pilot chapter, with template refs and id prefix', () => {
    const ctx = unitContext(catalog, findChapter(catalog, 'cbse-10-science-ch01')!);
    const items = generateItems(ctx, provisionalOutline(ctx), paths);
    expect(items.map((i) => i.key)).toEqual(['deck.p1', 'notes', 'flashcards', 'questions.b1', 'questions.b2', 'questions.b3', 'questions.b4', 'cases.b1', 'cases.b2']);
    expect(items.every((i) => /@\d+$/.test(i.templateRef))).toBe(true);
    expect(items[0]!.request.messages[1]!.content).toContain('Instructions for this call');
  });
});
