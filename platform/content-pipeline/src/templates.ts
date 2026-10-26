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
  /** Pipeline extension: the specific instructions for this item (part, counts, ids). */
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
  return { system: renderString(tpl.system, vars, tpl.file), user: renderString(tpl.user, vars, tpl.file) };
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
 * Resolves few_shot references such as `exemplars/science/cbse-10-science-ch01/release.json#decks`
 * relative to content-templates/. Fragments: `#key`, `#a/0/b` (JSON pointer), `#questions[0:8]` (slice).
 * Missing files are reported, not fatal: exemplars land in parallel with the pipeline.
 */
export function loadFewShot(refs: string[], templatesDir: string, maxChars: number = GENERATION.fewShotMaxChars): { text: string; missing: string[] } {
  const parts: string[] = [];
  const missing: string[] = [];
  for (const ref of refs) {
    const [rel, fragment = ''] = ref.split('#');
    const file = path.resolve(templatesDir, rel!);
    if (!file.startsWith(path.resolve(templatesDir))) throw new TemplateError(`few_shot ${ref} points outside content-templates`);
    if (!fs.existsSync(file)) {
      missing.push(ref);
      continue;
    }
    let value: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (fragment) value = selectFragment(value, fragment, ref);
    parts.push(`Example (${ref}):\n${JSON.stringify(value, null, 1)}`);
  }
  let text = parts.join('\n\n');
  if (text.length > maxChars) text = `${text.slice(0, maxChars)}\n… (example truncated)`;
  return { text: text || '(no worked example available for this family yet)', missing };
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
