/**
 * Text rules for student-facing content: no external links, no HTML in markdown, no contact
 * details, no profanity (list in config/pipeline.ts, extendable by file), and for literature
 * chapters no reproduced text (CONTEXT §8): quoted runs over the limit, or runs of short lines
 * that look like verse.
 */
import fs from 'node:fs';
import { BANNED, LITERATURE } from '../../config/pipeline';
import { extractMath } from './math';

export interface TextIssue {
  rule: string;
  severity: 'error' | 'warning';
  message: string;
}

/** Removes maths spans and inline code so `<` in `$a<b$` is not read as HTML. */
export function stripMathAndCode(md: string): string {
  let out = md.replace(/`[^`]*`/g, ' ');
  const { spans } = extractMath(out);
  for (const s of spans) out = out.replace(s.display ? `$$${s.tex}$$` : `$${s.tex}$`, ' ');
  return out;
}

const HTML_RE = /<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\/?>|<!--|<!\[CDATA\[|&lt;\s*script/i;
const URL_RE = /\b(?:https?|ftp):\/\/\S+|\bwww\.[a-z0-9-]+\.[a-z]{2,}\S*|\b[a-z0-9-]+\.(?:com|in|org|net|edu|gov|io|co|info|ly)\/\S*/i;
const MD_LINK_RE = /!?\[[^\]]*\]\([^)]*\)|<(?:https?|mailto):[^>]*>|\[[^\]]+\]:\s*\S+/i;
const SCHEME_RE = /\b(?:javascript|vbscript|data|mailto|tel):/i;
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
/** Indian mobile numbers (with or without +91) and other long international numbers. */
const PHONE_RE = /(?:\+91[\s-]?|\b0)?(?<![\d.])[6-9]\d{4}[\s-]?\d{5}(?![\d.])|\+\d{1,3}[\s-]?\d{3,5}[\s-]?\d{3,5}[\s-]?\d{2,5}(?!\d)/;

let profanityCache: { key: string; re: RegExp | null } | null = null;

export function profanityPattern(env: Record<string, string | undefined> = process.env): RegExp | null {
  const file = env[BANNED.profanityEnv];
  const key = file ?? '';
  if (profanityCache?.key === key) return profanityCache.re;
  const words: string[] = [...BANNED.profanity];
  if (file && fs.existsSync(file)) words.push(...fs.readFileSync(file, 'utf8').split(/\r?\n/).map((w) => w.trim()).filter(Boolean));
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = escaped.length ? new RegExp(`(?<![\\p{L}])(?:${escaped.join('|')})(?![\\p{L}])`, 'iu') : null;
  profanityCache = { key, re };
  return re;
}

export function checkText(text: string, kind: 'md' | 'plain'): TextIssue[] {
  const issues: TextIssue[] = [];
  if (!text) return issues;
  const body = kind === 'md' ? stripMathAndCode(text) : text;
  if (HTML_RE.test(body)) issues.push({ rule: 'banned.html', severity: 'error', message: 'contains HTML; markdown must be plain CommonMark without raw HTML' });
  if (URL_RE.test(body) || MD_LINK_RE.test(body)) issues.push({ rule: 'banned.url', severity: 'error', message: 'contains an external link or URL (student content must not link out)' });
  else if (SCHEME_RE.test(body)) issues.push({ rule: 'banned.url', severity: 'error', message: 'contains a javascript:/data:/mailto:/tel: link' });
  if (EMAIL_RE.test(body)) issues.push({ rule: 'banned.contact', severity: 'error', message: 'contains an email address' });
  if (PHONE_RE.test(body)) issues.push({ rule: 'banned.contact', severity: 'error', message: 'contains a phone number' });
  const prof = profanityPattern();
  const hit = prof?.exec(body);
  if (hit) issues.push({ rule: 'banned.profanity', severity: 'error', message: `contains a word on the profanity list ("${hit[0]}")` });
  return issues;
}

const QUOTE_RE = /“([^”]*)”|"([^"]*)"|‘([^’]*)’|«([^»]*)»/g;

const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/u).length : 0);

/** Literature reproduction heuristic: long quotations and verse-like runs of short lines. */
export function checkLiterature(text: string): TextIssue[] {
  const issues: TextIssue[] = [];
  for (const m of text.matchAll(QUOTE_RE)) {
    const inner = m[1] ?? m[2] ?? m[3] ?? m[4] ?? '';
    const n = countWords(inner);
    if (n > LITERATURE.maxQuotedWords)
      issues.push({ rule: 'literature.quote', severity: 'error', message: `quotes ${n} consecutive words (max ${LITERATURE.maxQuotedWords}); summarise instead of reproducing the text` });
  }
  const blockquote = text
    .split(/\r?\n/)
    .filter((l) => /^\s*>/.test(l))
    .map((l) => l.replace(/^\s*>\s?/, ''))
    .join(' ');
  if (countWords(blockquote) > LITERATURE.maxQuotedWords)
    issues.push({ rule: 'literature.quote', severity: 'error', message: `block quotation of ${countWords(blockquote)} words (max ${LITERATURE.maxQuotedWords})` });

  let run = 0;
  let longest = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^\s*>\s?/, '').trim();
    const isListOrHeading = /^([-*+]|\d+[.)]|#{1,6}\s|\|)/.test(line);
    if (line && !isListOrHeading && countWords(line) <= LITERATURE.verseLineMaxWords) {
      run++;
      longest = Math.max(longest, run);
    } else run = 0;
  }
  if (longest > LITERATURE.maxVerseLines)
    issues.push({ rule: 'literature.verse', severity: 'error', message: `${longest} consecutive short lines look like reproduced verse (max ${LITERATURE.maxVerseLines})` });
  return issues;
}
