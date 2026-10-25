/**
 * Identifier formats shared by the catalog, content, pipeline and API.
 *
 *   subject  cbse-10-science, icse-10-physics, isc-12-hindi
 *   chapter  cbse-10-science-ch06            (a "unit" in CONTEXT §15)
 *   topic    cbse-10-science-ch06-t02
 */
import { z } from 'zod/v4';

export const EXAMS = ['cbse', 'icse', 'isc'] as const;
export const CLASSES = [7, 8, 9, 10, 11, 12] as const;

export const Board = z.enum(['cbse', 'cisce']);
export type Board = z.infer<typeof Board>;

export const Exam = z.enum(EXAMS);
export type Exam = z.infer<typeof Exam>;

export const ClassLevel = z.union([
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10),
  z.literal(11),
  z.literal(12),
]);
export type ClassLevel = z.infer<typeof ClassLevel>;

const SLUG = '[a-z0-9]+(?:-[a-z0-9]+)*';
const SUBJECT = `(?:cbse|icse|isc)-(?:7|8|9|10|11|12)-${SLUG}`;

export const SubjectId = z.string().regex(new RegExp(`^${SUBJECT}$`), 'subject id like cbse-10-science');
export const ChapterId = z.string().regex(new RegExp(`^${SUBJECT}-ch\\d{2}$`), 'chapter id like cbse-10-science-ch06');
export const TopicId = z.string().regex(new RegExp(`^${SUBJECT}-ch\\d{2}-t\\d{2}$`), 'topic id like cbse-10-science-ch06-t02');

export type SubjectId = z.infer<typeof SubjectId>;
export type ChapterId = z.infer<typeof ChapterId>;
export type TopicId = z.infer<typeof TopicId>;

/** The exam implied by a board and class (CISCE: ICSE up to class 10, ISC for 11–12). */
export function examFor(board: Board, classLevel: ClassLevel): Exam {
  if (board === 'cbse') return 'cbse';
  return classLevel <= 10 ? 'icse' : 'isc';
}

/** Splits a chapter id into its subject id and chapter number. */
export function parseChapterId(id: string): { subjectId: string; number: number } {
  const match = /^(.*)-ch(\d{2})$/.exec(ChapterId.parse(id));
  if (!match) throw new Error(`Invalid chapter id: ${id}`);
  return { subjectId: match[1]!, number: Number(match[2]) };
}

export function chapterId(subjectId: string, number: number): string {
  return `${subjectId}-ch${String(number).padStart(2, '0')}`;
}
