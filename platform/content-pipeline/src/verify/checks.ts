/**
 * Stage 5 deterministic checks (no model, no SymPy — D-008: numeric checks in JS). They re-derive
 * what can be re-derived from a question's own text and compare it with the key:
 *
 *   numeric.arithmetic   every purely numeric `=` step inside solutions and model answers recomputes
 *                        (the exemplar-maths lesson: a correct key with a wrong number in the solution)
 *   numeric.final        numerical questions: the last numeric result in the solution equals the key
 *                        (within tolerance), and the key value appears in the solution at all
 *   chem.balance         every \ce{… -> …} in the key side (solution, model answer, correct options,
 *                        stem) balances unless the text marks it skeletal/unbalanced
 *   objective.options    duplicate option texts; assertion-reason has the 4 standard options
 *   objective.solution   the solution names a different option as the answer than the key
 *   objective.blanks     a fill-blank answer that the solution never mentions
 *   objective.match      every left item paired once; no right item used twice
 *   code.output          javascript code-output items are executed in a sandbox (node:vm, no I/O,
 *                        100 ms) and the normalised output must equal the key; other languages are
 *                        left to the independent solve
 * Each flag has a severity; critical/major flags make the item fail verification.
 */
import vm from 'node:vm';
import { codeBlocks, codeOutputMatches, type AlternativeQuestion, type Question } from '@soyl/shared/content/index';
import { checkArithmetic, numericValue } from '../lint/arith';
import { SKELETAL_CONTEXT, ceBodies, checkBalance } from '../lint/chem';
import { extractMath } from '../lint/math';

export type FlagSeverity = 'critical' | 'major' | 'minor';

export interface Flag {
  /** Question id (children: "<id>/<child id>"). */
  ref: string;
  check: string;
  severity: FlagSeverity;
  message: string;
  source: 'deterministic' | 'model' | 'originality';
}

type Part = AlternativeQuestion & { passage_md?: string; children?: (AlternativeQuestion & { alternatives?: AlternativeQuestion[] })[] };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').replace(/[.。।!?]+$/u, '').trim();

/** Every maths span in a Markdown text. */
function mathSpans(md: string): string[] {
  return extractMath(md).spans.map((s) => s.tex);
}

/** The right-most purely numeric side of the last `=` chain that has one. */
export function lastNumericResult(md: string): number | null {
  let last: number | null = null;
  for (const tex of mathSpans(md)) {
    for (const piece of tex.split(/\\approx|≈|,\s|;|\\quad|\\qquad/)) {
      const sides = piece.split(/(?<![<>!\\])=/);
      if (sides.length < 2) continue;
      for (let i = sides.length - 1; i >= 1; i--) {
        const v = numericValue(sides[i]!);
        if (v !== null) {
          last = v;
          break;
        }
      }
    }
  }
  return last;
}

/** Numbers written anywhere in a text (plain or in maths), commas between digit groups removed. */
function numbersIn(md: string): number[] {
  return [...md.replace(/(\d),(?=\d{2,3}\b)/g, '$1').matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}

const ANSWER_LETTER = /(?:correct\s+(?:answer|option)|answer|उत्तर)\s*(?:is|:|—|-|है)?\s*(?:option\s*)?\(?([a-d])\)/i;

function checkPart(q: Part, ref: string, flags: Flag[], parentContext: string) {
  const add = (check: string, severity: FlagSeverity, message: string) => flags.push({ ref, check, severity, message, source: 'deterministic' });
  const context = `${parentContext} ${q.passage_md ?? ''} ${q.stem_md}`;
  const a = q.answer;
  const keyTexts = [q.solution_md, ...('model_answer_md' in a ? [a.model_answer_md] : [])];

  // Arithmetic inside the worked solution and the model answer.
  for (const text of keyTexts)
    for (const tex of mathSpans(text))
      for (const slip of checkArithmetic(tex)) add('numeric.arithmetic', 'critical', `"${slip.left} = ${slip.right}" does not hold (${+slip.leftValue.toFixed(6)} vs ${+slip.rightValue.toFixed(6)})`);

  // Numerical answers: re-derive the final value from the solution.
  if (q.type === 'numerical' && 'value' in a) {
    const tol = Math.max(a.tolerance, 1e-9, Math.abs(a.value) * 0.005);
    const last = lastNumericResult(q.solution_md);
    if (last !== null && Math.abs(last - a.value) > tol && !numbersIn(q.solution_md).slice(-3).some((n) => Math.abs(n - a.value) <= tol))
      add('numeric.final', 'critical', `the solution's last computed value is ${+last.toFixed(6)}, the key is ${a.value}`);
    if (!numbersIn(q.solution_md).some((n) => Math.abs(n - a.value) <= tol)) add('numeric.final', 'major', `the solution never arrives at the key value ${a.value}`);
  }

  // Chemical equations on the key side must balance.
  const correct = new Set('option_ids' in a ? a.option_ids : []);
  const keySide = [q.stem_md, ...keyTexts, ...q.options.filter((o) => correct.has(o.id)).map((o) => o.text_md)];
  for (const text of keySide)
    for (const body of ceBodies(text)) {
      const r = checkBalance(body);
      if (r.kind === 'unbalanced' && !SKELETAL_CONTEXT.test(`${context} ${text}`)) add('chem.balance', 'critical', `"${body.slice(0, 60)}" is not balanced (${r.elements.join(', ')})`);
    }

  // Objective consistency.
  if (q.options.length) {
    const seen = new Map<string, string>();
    for (const o of q.options) {
      const t = norm(o.text_md);
      if (t && seen.has(t)) add('objective.options', 'major', `options ${seen.get(t)} and ${o.id} have the same text`);
      seen.set(t, o.id);
    }
  }
  if (q.type === 'assertion-reason' && q.options.length !== 4) add('objective.options', 'major', `assertion-reason has ${q.options.length} options (the board format has 4)`);
  if ((q.type === 'mcq' || q.type === 'assertion-reason') && 'option_ids' in a) {
    const m = ANSWER_LETTER.exec(q.solution_md);
    if (m && q.options.some((o) => o.id === m[1]!.toLowerCase()) && !a.option_ids.includes(m[1]!.toLowerCase()))
      add('objective.solution', 'critical', `the solution says the answer is (${m[1]}) but the key is (${a.option_ids.join(', ')})`);
  }
  if (q.type === 'fill-blank' && 'blanks' in a) {
    const sol = norm(`${q.solution_md}`);
    a.blanks.forEach((b, i) => {
      if (!b.accepted.some((x) => sol.includes(norm(x)))) add('objective.blanks', 'minor', `blank ${i + 1}: the solution never mentions an accepted answer (${b.accepted.join(' / ')})`);
    });
  }
  if (q.type === 'match' && 'pairs' in a) {
    const left = new Set<string>();
    const right = new Set<string>();
    for (const p of a.pairs) {
      if (left.has(p.left_id)) add('objective.match', 'critical', `left item ${p.left_id} is paired twice`);
      if (right.has(p.right_id)) add('objective.match', 'major', `right item ${p.right_id} is used twice`);
      left.add(p.left_id);
      right.add(p.right_id);
    }
    for (const o of q.options) if (!left.has(o.id)) add('objective.match', 'critical', `left item ${o.id} has no pair`);
  }
  if (q.type === 'code-output' && 'output' in a) {
    const block = codeBlocks(q.stem_md)[0];
    if (block?.language === 'javascript') {
      const run = runJavaScript(block.code);
      if (run.error) add('code.output', 'major', `the code does not run in the sandbox: ${run.error}`);
      else if (!codeOutputMatches(a.output, run.output)) add('code.output', 'critical', `running the code prints ${JSON.stringify(run.output.slice(0, 80))}, the key is ${JSON.stringify(a.output.slice(0, 80))}`);
    }
  }

  (q.children ?? []).forEach((c) => {
    checkPart(c as Part, `${ref}/${c.id}`, flags, context);
    (c.alternatives ?? []).forEach((alt) => checkPart(alt as Part, `${ref}/${c.id}/${alt.id}`, flags, context));
  });
}

/** Deterministic flags for one question (empty = passes). */
export function deterministicChecks(q: Question): Flag[] {
  const flags: Flag[] = [];
  checkPart(q as Part, q.id, flags, '');
  return flags;
}

/**
 * Runs a JavaScript snippet with console.log captured, in a fresh context whose global has a null
 * prototype and receives NO host object (console is defined inside the context; only a string comes
 * back), with a 100 ms timeout. node:vm is not a security boundary, so this only ever runs content
 * the pipeline itself produced, as a consistency check; it never runs student input.
 */
export function runJavaScript(code: string, timeoutMs = 100): { output: string; error: string | null } {
  if (code.length > 5000) return { output: '', error: 'code too long to check (> 5000 characters)' };
  const wrapped = `(function () {
  const __out = [];
  const __fmt = (x) => (typeof x === 'string' ? x : JSON.stringify(x) ?? String(x));
  const console = { log: (...a) => { __out.push(a.map(__fmt).join(' ')); } };
  let __err = '';
  try { (function () {\n${code}\n})(); } catch (e) { __err = String(e && e.message ? e.message : e); }
  return JSON.stringify([__out.join('\\n'), __err]);
})()`;
  try {
    const context = vm.createContext(Object.create(null), { codeGeneration: { strings: false, wasm: false } });
    const result = vm.runInContext(wrapped, context, { timeout: timeoutMs });
    const [output, err] = JSON.parse(typeof result === 'string' ? result : '["",""]') as [string, string];
    return { output, error: err || null };
  } catch (e) {
    return { output: '', error: (e as Error).message ?? String(e) };
  }
}

export const isBlocking = (f: Flag) => f.severity === 'critical' || f.severity === 'major';
