/**
 * Prompt templates (platform/content-templates/README.md): `prompts/<family>/<asset>.v<N>.md`
 * with YAML front matter and {{placeholders}}.
 *
 * Body sections: a line `## System` starts the system message and a line `## User` the user
 * message. Without those headings the whole body is the user message and a default system
 * message is used. Rendering is strict: an unknown placeholder fails at load, a missing value
 * fails at render, so a template never reaches a model half-filled.
 *
 * Resolution order for (family, asset): content-templates/prompts/<family>/, then the family's
 * short name (e.g. hindi-language → hindi), then related families (physics → science, …),
 * then prompts/other/, then the fallback templates shipped in this package
 * (content-pipeline/templates/, clearly marked fallback). The highest version wins.
 */
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { z } from 'zod/v4';
import { MODEL_TIERS } from '@soyl/shared/config/models';
import { GENERATION } from '../config/pipeline';
import type { Family } from '../config/families';

export const TEMPLATE_ASSETS = ['outline', 'deck', 'notes', 'flashcards', 'questions', 'case-passages', 'verify'] as const;
export type TemplateAsset = (typeof TEMPLATE_ASSETS)[number];

export const PLACEHOLDERS = [
  'board',
  'exam',
  'class',
  'subject_name',
  'language',
  'chapter_id',
  'chapter_title',
  'topics_yaml',
  'learning_outcomes',
  'exam_notes',
  'blueprint_yaml',
  'outline_json',
  'json_schema',
  'few_shot',
  'targets',
  /** The generated content a `verify` template checks (stage 5, M2). */
  'content_json',
  /** Question id prefix derived from the chapter id, e.g. q_cbse10sci_ch01 (src/ids.ts). */
  'id_prefix',
  /**
   * The specific instructions for this call (which deck part, exact question counts, ids). When a
   * template does not use {{task}}, the pipeline appends it to the end of the user message.
   */
  'task',
] as const;
export type Placeholder = (typeof PLACEHOLDERS)[number];
export type TemplateVars = Record<Placeholder, string>;

export const TemplateFrontMatter = z.object({
  id: z.string().min(1),
  asset: z.enum(TEMPLATE_ASSETS),
  family: z.string().min(1),
  version: z.number().int().positive(),
  model_tier: z.enum(MODEL_TIERS),
  max_output_tokens: z.number().int().positive(),
  temperature: z.number().min(0).max(2).optional(),
  reasoning_effort: z.enum(['minimal', 'low', 'medium', 'high']).optional(),
  few_shot: z.array(z.string()).default([]),
});
export type TemplateFrontMatter = z.infer<typeof TemplateFrontMatter>;

export interface PromptTemplate extends TemplateFrontMatter {
  system: string;
  user: string;
  file: string;
  /** True for the pipeline's built-in fallback templates. */
  fallback: boolean;
}

export const DEFAULT_SYSTEM =
  'You are a content author for SOYL Academy, writing original study material for Indian school students. ' +
  'Write original text only: never reproduce textbook, publisher or past-paper text, and never reproduce poems, stories or play text. ' +
  'Return only JSON that matches the given JSON Schema.';

const PLACEHOLDER_RE = /\{\{\s*([a-z_]+)\s*\}\}/g;

export class TemplateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemplateError';
  }
}

export function parseTemplate(text: string, file: string, fallback = false): PromptTemplate {
  const normalized = text.replace(/\r\n/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(normalized);
  if (!m) throw new TemplateError(`${file}: missing YAML front matter (--- ... ---)`);
  const fm = TemplateFrontMatter.safeParse(yaml.load(m[1]!));
  if (!fm.success) throw new TemplateError(`${file}: front matter: ${fm.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  const body = m[2]!;
  const unknown = [...body.matchAll(PLACEHOLDER_RE)].map((x) => x[1]!).filter((name) => !(PLACEHOLDERS as readonly string[]).includes(name));
  if (unknown.length) throw new TemplateError(`${file}: unknown placeholder(s) ${[...new Set(unknown)].map((u) => `{{${u}}}`).join(', ')}`);

  const sys = /^##\s*system\s*$/im.exec(body);
  const usr = /^##\s*user\s*$/im.exec(body);
  let system = DEFAULT_SYSTEM;
  let user = body.trim();
  if (sys && usr) {
    const [first, second] = sys.index < usr.index ? [sys, usr] : [usr, sys];
    const a = body.slice(first.index + first[0].length, second.index).trim();
    const b = body.slice(second.index + second[0].length).trim();
    system = first === sys ? a : b;
    user = first === sys ? b : a;
  } else if (usr) {
    user = body.slice(usr.index + usr[0].length).trim();
  }
  if (!user) throw new TemplateError(`${file}: empty user message`);
  return { ...fm.data, system, user, file, fallback };
}

export function renderString(template: string, vars: Partial<TemplateVars>, file = 'template'): string {
  return template.replace(PLACEHOLDER_RE, (_, name: string) => {
    const value = vars[name as Placeholder];
    if (value === undefined) throw new TemplateError(`${file}: no value for {{${name}}}`);
    return value;
  });
}

export function renderTemplate(tpl: PromptTemplate, vars: Partial<TemplateVars>): { system: string; user: string } {
  let user = renderString(tpl.user, vars, tpl.file);
  const usesTask = /\{\{\s*task\s*\}\}/.test(tpl.user) || /\{\{\s*task\s*\}\}/.test(tpl.system);
  if (!usesTask && vars.task) user = `${user}\n\n## Instructions for this call\n${vars.task}`;
  return { system: renderString(tpl.system, vars, tpl.file), user };
}

/** Template id@version, recorded on every generated item's provenance. */
export function templateRef(tpl: PromptTemplate): string {
  return `${tpl.id}@${tpl.version}`;
}

const RELATED: Partial<Record<Family, string[]>> = {
  physics: ['science'],
  chemistry: ['science'],
  biology: ['science'],
  science: ['physics', 'chemistry', 'biology'],
  'english-literature': ['english-language'],
  'english-language': ['english-literature'],
  'hindi-literature': ['hindi-language'],
  'hindi-language': ['hindi-literature'],
  'economics-commerce': ['social-science'],
};

function versionsIn(dir: string, asset: string): { file: string; version: number }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .map((name) => ({ name, m: new RegExp(`^${asset}\\.v(\\d+)\\.md$`).exec(name) }))
    .filter((x) => x.m)
    .map((x) => ({ file: path.join(dir, x.name), version: Number(x.m![1]) }))
    .sort((a, b) => b.version - a.version);
}

export function templateSearchDirs(family: Family, templatesDir: string): string[] {
  const names = [family, family.split('-')[0]!, ...(RELATED[family] ?? []), 'other'];
  return [...new Set(names)].map((n) => path.join(templatesDir, 'prompts', n));
}

export function resolveTemplate(family: Family, asset: TemplateAsset, dirs: { templatesDir: string; fallbackTemplatesDir: string }): PromptTemplate {
  for (const dir of templateSearchDirs(family, dirs.templatesDir)) {
    const best = versionsIn(dir, asset)[0];
    if (best) return parseTemplate(fs.readFileSync(best.file, 'utf8'), best.file, false);
  }
  const fb = versionsIn(dirs.fallbackTemplatesDir, asset)[0];
  if (!fb) throw new TemplateError(`no template for ${family}/${asset} and no fallback in ${dirs.fallbackTemplatesDir}`);
  return parseTemplate(fs.readFileSync(fb.file, 'utf8'), fb.file, true);
}

/**
 * few_shot references (paths relative to content-templates/):
 *
 *   exemplars/science/cbse-10-science-ch01/release.json#decks
 *   <file>.json#<fragment>[?<query>]       <file>.md (included as text, first 3,000 characters)
 *
 * fragment  `key`, a JSON pointer `a/0/b`, each segment optionally sliced `questions[0:8]`.
 * query     `type=case-based,source-based` keeps array items of those types;
 *           `sample=N` keeps N items stratified by `type` (one per type first, in file order).
 *
 * Default trimming (applied when the reference has no slice and no query), to save tokens:
 *   #decks      → the first deck, at most 12 slides: the first slide of each layout, then in order
 *   #questions  → asset questions: one item per non-case type, at most 12;
 *                 asset case-passages: only case-based/source-based items, at most 2;
 *                 any other asset: at most 6, stratified by type
 *   #notes      → the first 3 sections        #flashcards → the first 12 cards
 *   #tests      → the first test
 * The rendered examples are capped at GENERATION.fewShotMaxChars: whole examples are dropped from
 * the end first; a single example over the cap is cut with a marker.
 * Missing files are reported, not fatal: exemplars land in parallel with the pipeline.
 */
export function loadFewShot(
  refs: string[],
  templatesDir: string,
  asset: TemplateAsset | null = null,
  maxChars: number = GENERATION.fewShotMaxChars,
): { text: string; missing: string[] } {
  const parts: string[] = [];
  const missing: string[] = [];
  const root = path.resolve(templatesDir);
  for (const ref of refs) {
    const [relAndFragment, query = ''] = ref.split('?');
    const [rel, fragment = ''] = relAndFragment!.split('#');
    const file = path.resolve(templatesDir, rel!);
    if (file !== root && !file.startsWith(root + path.sep)) throw new TemplateError(`few_shot ${ref} points outside content-templates`);
    if (!fs.existsSync(file)) {
      missing.push(ref);
      continue;
    }
    const raw = fs.readFileSync(file, 'utf8');
    if (!file.endsWith('.json')) {
      parts.push(`Example (${ref}):\n${raw.slice(0, 3000)}${raw.length > 3000 ? '\n…' : ''}`);
      continue;
    }
    let value: unknown = JSON.parse(raw);
    if (fragment) value = selectFragment(value, fragment, ref);
    const explicit = !!query || /\[\d*:\d*\]/.test(fragment);
    if (query) value = applyQuery(value, query, ref);
    else if (!explicit) value = trimDefault(value, fragment.split('/').pop() ?? '', asset);
    parts.push(`Example (${ref}):\n${JSON.stringify(value, null, 1)}`);
  }
  let text = '';
  for (const part of parts) {
    if (!text) text = part.length > maxChars ? `${part.slice(0, maxChars)}\n… (example truncated)` : part;
    else if (text.length + part.length + 2 <= maxChars) text += `\n\n${part}`;
  }
  return { text: text || '(no worked example available for this family yet)', missing };
}

type Item = Record<string, unknown>;
const CASE = new Set(['case-based', 'source-based']);

/** One item per distinct `type` first (file order), then the rest in order, up to n. */
export function stratifiedSample<T>(items: T[], n: number): T[] {
  const seen = new Set<unknown>();
  const first: T[] = [];
  const rest: T[] = [];
  for (const it of items) {
    const t = (it as Item)?.type;
    if (!seen.has(t)) {
      seen.add(t);
      first.push(it);
    } else rest.push(it);
  }
  const chosen = new Set([...first, ...rest].slice(0, n));
  return items.filter((it) => chosen.has(it));
}

function applyQuery(value: unknown, query: string, ref: string): unknown {
  if (!Array.isArray(value)) throw new TemplateError(`few_shot ${ref}: query on a non-array`);
  let out = value as Item[];
  for (const pair of query.split('&')) {
    const [k, v = ''] = pair.split('=');
    if (k === 'type') {
      const types = new Set(v.split(','));
      out = out.filter((it) => types.has(String(it?.type)));
    } else if (k === 'sample') out = stratifiedSample(out, Number(v));
    else throw new TemplateError(`few_shot ${ref}: unknown query "${k}"`);
  }
  return out;
}

function trimDeck(deck: Item): Item {
  const slides = Array.isArray(deck.slides) ? (deck.slides as Item[]) : [];
  const firstOfLayout = new Set<Item>();
  const layouts = new Set<unknown>();
  for (const s of slides) if (!layouts.has(s.layout)) (layouts.add(s.layout), firstOfLayout.add(s));
  const chosen = new Set([...firstOfLayout, ...slides].slice(0, 12));
  return { ...deck, slides: slides.filter((s) => chosen.has(s)) };
}

function trimDefault(value: unknown, key: string, asset: TemplateAsset | null): unknown {
  if (!Array.isArray(value)) {
    if (key === 'notes' && value && typeof value === 'object' && Array.isArray((value as Item).sections))
      return { ...(value as Item), sections: ((value as Item).sections as unknown[]).slice(0, 3) };
    if (key === 'flashcards' && value && typeof value === 'object' && Array.isArray((value as Item).cards))
      return { ...(value as Item), cards: ((value as Item).cards as unknown[]).slice(0, 12) };
    return value;
  }
  const items = value as Item[];
  switch (key) {
    case 'decks':
      return items.slice(0, 1).map(trimDeck);
    case 'questions':
      if (asset === 'case-passages') return items.filter((q) => CASE.has(String(q.type))).slice(0, 2);
      if (asset === 'questions') return stratifiedSample(items.filter((q) => !CASE.has(String(q.type))), 12);
      return stratifiedSample(items, 6);
    case 'tests':
      return items.slice(0, 1);
    default:
      return value;
  }
}

export function selectFragment(value: unknown, fragment: string, ref = fragment): unknown {
  let current = value;
  for (const raw of fragment.replace(/^\//, '').split('/')) {
    const m = /^([^[\]]*)(?:\[(\d*):(\d*)\])?$/.exec(raw);
    if (!m) throw new TemplateError(`bad few_shot fragment in ${ref}`);
    const [, key, from, to] = m;
    if (key) {
      if (current === null || typeof current !== 'object' || !(key in (current as object))) throw new TemplateError(`few_shot ${ref}: no "${key}"`);
      current = (current as Record<string, unknown>)[key];
    }
    if (from !== undefined || to !== undefined) {
      if (!Array.isArray(current)) throw new TemplateError(`few_shot ${ref}: slice of a non-array`);
      current = current.slice(from ? Number(from) : 0, to ? Number(to) : undefined);
    }
  }
  return current;
}
