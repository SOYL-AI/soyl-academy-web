/**
 * Deterministic rule sets for minors' safety (local stand-in for Content Safety, and the always-on
 * topic guard). English, Hindi (Devanagari) and romanised Hindi/Hinglish. Starter lists: they catch
 * the obvious cases in tests and local use; Azure Content Safety does the real classification in
 * production. Extend the lists here (config-like); every list has tests.
 *
 * Educational phrases that contain sensitive words (sexual reproduction, sex chromosomes, sexually
 * transmitted diseases — CBSE Class 10 Science ch "How do organisms reproduce?") are removed before
 * matching, so syllabus questions are never refused.
 */
import type { HarmCategory } from './types';

/** Lower-case, NFKC, zero-width removed, common leetspeak folded, whitespace collapsed. */
export function normalizeForRules(text: string): string {
  return text
    .normalize('NFKC')
    .replace(/[​-‍⁠﻿]/g, '')
    .toLowerCase()
    .replace(/[@4](?=[a-z])/g, 'a')
    .replace(/(?<=[a-z])3(?=[a-z])/g, 'e')
    .replace(/(?<=[a-z])[1!](?=[a-z])/g, 'i')
    .replace(/(?<=[a-z])0(?=[a-z])/g, 'o')
    .replace(/(?<=[a-z])\$(?=[a-z])/g, 's')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Syllabus phrases that must never trip the sexual/violence rules. */
const EDUCATIONAL_PHRASES: RegExp[] = [
  /\ba?sexual(ly)? reproduc\w*/g,
  /\bsex(ual)? (chromosome|organ|cell|hormone|determination|ratio|linked|education)s?\b/g,
  /\bsexually transmitted (disease|infection)s?\b/g,
  /\bsexual (health|harassment|abuse) (act|law|awareness)\b/g,
  /\bsex ratio\b/g,
  /\bbomb calorimeter\b/g,
  /\batom(ic)? bomb(ing)? (of|on|in) (hiroshima|nagasaki)\b/g,
  /\bsuicide (bomb|squad|mission)s? in (history|the war)\b/g,
  /\bdurkheim\W?s? (theory of )?suicide\b/g,
];

export function stripEducational(normalized: string): string {
  return EDUCATIONAL_PHRASES.reduce((t, re) => t.replace(re, ' '), normalized);
}

interface Rule {
  category: HarmCategory;
  severity: number;
  pattern: RegExp;
}

/** Harm rules (severity on the Content Safety scale: 2 low, 4 medium, 6 high). */
export const HARM_RULES: Rule[] = [
  // Sexual content (minors' audience: block at low).
  { category: 'sexual', severity: 6, pattern: /\b(porn\w*|xxx|hentai|onlyfans|nudes?|naked (pic|photo|video)s?|sexting|sext)\b/ },
  { category: 'sexual', severity: 6, pattern: /\b(have|having|had) sex\b|\bsex (video|chat|story|stories|position)s?\b|\bmake love\b|\bhorny\b|\bblow ?job\b|\bboobs?\b|\bdick pic\b|\bpussy\b/ },
  { category: 'sexual', severity: 6, pattern: /\b(chudai|sexy video|nangi|nanga photo|chut\b|lund\b)/ },
  { category: 'sexual', severity: 6, pattern: /(अश्लील|नंगी|चुदाई|सेक्सी वीडियो)/ },
  // Not a bare "sex": "the sex of a child" is a syllabus question (sex determination).
  { category: 'sexual', severity: 2, pattern: /\bsexy\b/ },
  // Self-harm (first person or method-seeking).
  { category: 'self_harm', severity: 6, pattern: /\b(kill(ing)? my ?self|end(ing)? my (own )?life|take my (own )?life|want to die|wanna die|don'?t want to live|cut(ting)? my ?self|hurt(ing)? my ?self|self[- ]?harm)\b/ },
  { category: 'self_harm', severity: 6, pattern: /\b(i|i'm|im|me|my)\b[^.?!]{0,30}\bsuicid\w*|\bsuicid\w*[^.?!]{0,30}\b(i|me|myself)\b|\bhow (to|do i|can i) (commit suicide|overdose|hang myself)\b/ },
  { category: 'self_harm', severity: 6, pattern: /\b(marna chahta|marna chahti|mar jaana chahta|mar jana chahti|khudkushi|aatmhatya|atmahatya|jeena nahi chahta|jeena nahi chahti)\b/ },
  { category: 'self_harm', severity: 6, pattern: /(आत्महत्या|मरना चाहता|मरना चाहती|ख़ुदकुशी|खुदकुशी|जीना नहीं चाहता|जीना नहीं चाहती)/ },
  // Violence and dangerous instructions (block at medium).
  { category: 'violence', severity: 6, pattern: /\b(how (to|do i|can i)|steps to|teach me to|help me) (make|build|create|get|buy) (a |an )?(bomb|explosive|ied|gun|pistol|katta|weapon|poison|meth|drugs?)\b/ },
  { category: 'violence', severity: 6, pattern: /\b(how (to|do i|can i)|help me|i want to|i will|i'?m going to) (kill|murder|stab|shoot|poison|beat up) (someone|somebody|him|her|them|my|a |the )/ },
  { category: 'violence', severity: 4, pattern: /\b(buy|get|sell|smoke|inject) (weed|ganja|charas|cocaine|heroin|mdma|lsd|meth|drugs)\b/ },
  { category: 'violence', severity: 6, pattern: /(बम कैसे बनाए|बम बनाना|ज़हर कैसे|जहर कैसे|किसी को मारना)/ },
  // Hate (slurs and dehumanising phrases; a starter list).
  { category: 'hate', severity: 6, pattern: /\b(n[i1]gg(er|a)s?|chink|paki|kike|faggot|tranny|retard(ed)?)\b/ },
  { category: 'hate', severity: 4, pattern: /\b(all|these) (muslims|hindus|christians|sikhs|dalits|biharis|tamils|bengalis|women|girls) (are|should) (dirty|animals|terrorists|die|be killed|inferior|stupid)\b/ },
  { category: 'hate', severity: 6, pattern: /\b(chamar|bhangi|chura|katua|mulla|kafir)\b/ },
];

/** Jailbreak / direct injection attempts in the student's own message. */
export const JAILBREAK_RULES: RegExp[] = [
  /\b(ignore|disregard|forget|override|bypass) (all |any |the |your |previous |prior |above |earlier )*(instructions|rules|prompts?|guidelines|guardrails|restrictions|system message)\b/,
  /\b(system prompt|developer mode|dan mode|jailbreak|do anything now|god mode|unfiltered mode|no restrictions)\b/,
  /\b(reveal|show|print|repeat|tell me) (me )?(your|the) (system |hidden |secret |initial )?(prompt|instructions|rules)\b/,
  /\b(you are now|from now on you are|pretend (you are|to be)|act as|roleplay as|role-play as|be my) (my |an? )?(unrestricted|evil|dan|girlfriend|boyfriend|lover|wife|husband|partner|hacker)\b/,
  /\b(sab (instructions|niyam) bhool jao|niyam todo)\b/,
  /(सारे निर्देश भूल जाओ|निर्देशों को अनदेखा|सिस्टम प्रॉम्प्ट)/,
];

/** Indirect injection inside documents (uploaded paper text, answers being evaluated). */
export const DOCUMENT_ATTACK_RULES: RegExp[] = [
  ...JAILBREAK_RULES,
  /\b(award|give|grant|assign|mark) (this( answer)?|me|the student|full|maximum|max|all|\d+) ?(full |maximum |max |all )?(marks?|points?|score|credits?)\b/,
  /\b(full|maximum|max) marks (to|for) (this|me|the student)\b/,
  /\b(ignore|skip|override) (the )?(marking scheme|rubric|model answer)\b/,
  /\b(grader|evaluator|examiner|assistant|ai)[,:]? (you must|please|must) (give|award|mark|assign)\b/,
  /\b(as an ai|as the ai|ai model), (give|award|output)\b/,
  /(पूरे अंक दो|पूरे नंबर दो|full marks do)/,
];

/** Clearly off-topic requests for a school tutor (topic guard). */
export const OFF_TOPIC_RULES: RegExp[] = [
  /\b(be my (girlfriend|boyfriend|gf|bf)|date me|go on a date|i love you|love you baby|propose to (a|my) (girl|boy))\b/,
  /\b(betting|satta|casino|gambling|lottery (tips|number)|dream11 (team|tips)|rummy)\b/,
  /\b(crypto|bitcoin|forex|stock) (tips|trading|signals|pump)\b/,
  /\b(hack|crack) (into )?(instagram|facebook|whatsapp|snapchat|wifi|wi-fi|someone'?s|an? account|password|phone)\b/,
  /\b(free fire|bgmi|pubg|minecraft|roblox) (diamonds?|uc|hack|cheats?|mod apk)\b/,
  /\b(celebrity|actor|actress|bollywood) (gossip|affairs?|girlfriend|boyfriend)\b/,
];

export interface RuleHit {
  severities: Record<HarmCategory, number>;
  jailbreak: boolean;
  documentAttack: boolean;
  offTopic: boolean;
}

export function harmSeverities(text: string): Record<HarmCategory, number> {
  const t = stripEducational(normalizeForRules(text));
  const out: Record<HarmCategory, number> = { hate: 0, sexual: 0, self_harm: 0, violence: 0 };
  for (const r of HARM_RULES) if (r.pattern.test(t)) out[r.category] = Math.max(out[r.category], r.severity);
  return out;
}

export function isJailbreak(text: string): boolean {
  const t = normalizeForRules(text);
  return JAILBREAK_RULES.some((re) => re.test(t));
}

export function isDocumentAttack(text: string): boolean {
  const t = normalizeForRules(text);
  return DOCUMENT_ATTACK_RULES.some((re) => re.test(t));
}

export function isOffTopic(text: string): boolean {
  const t = normalizeForRules(text);
  return OFF_TOPIC_RULES.some((re) => re.test(t));
}
