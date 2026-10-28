/**
 * School capture contracts (backend-api, 2026-10-28). D-014: schools and cities are collected and shown
 * only for accounts whose consent is `granted` (consent feature `profile_school_city`); otherwise the
 * search answers 403 consent_required, setting a school answers 403 consent_required, and the school
 * is never returned (null). Limits: @soyl/shared/config/schools; validation: @soyl/shared/profile/school.
 */
import { z } from 'zod/v4';
import { INDIAN_STATES, SCHOOLS } from '@soyl/shared/config/schools';
import { BoardSchema } from '../schemas';

export const SchoolSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    city: z.string().nullable(),
    state: z.enum(INDIAN_STATES).nullable(),
    board: BoardSchema.nullable(),
    /** Confirmed by staff or an official list (UDISE+, CBSE affiliation). Schools added by students start unverified. */
    verified: z.boolean(),
  })
  .meta({ id: 'School', description: 'A school. Shown only to accounts whose consent is granted (D-014).' });

export const SchoolSearchQuery = z.strictObject({
  /** Name, or the start of any word of it (case, punctuation and common abbreviations ignored). */
  q: z.string().min(SCHOOLS.search.minQueryLength).max(SCHOOLS.search.maxQueryLength),
  /** Optional city filter (old names such as Bombay match Mumbai). */
  city: z.string().min(SCHOOLS.city.minLength).max(SCHOOLS.city.maxLength).optional(),
});

export const SchoolSearchResponse = z
  .object({ schools: z.array(SchoolSchema).max(SCHOOLS.search.maxResults) })
  .meta({ id: 'SchoolSearch', description: `At most ${SCHOOLS.search.maxResults} schools, best match first (name starts with the query, verified first).` });

/** PATCH /v1/me `school`: pick an existing school, add one (find-or-create, unverified), or null to clear. */
export const SchoolPick = z.strictObject({ schoolId: z.uuid() }).meta({ id: 'SchoolPick' });
export const SchoolCreate = z
  .strictObject({
    name: z.string().min(1).max(SCHOOLS.name.maxLength * 2),
    city: z.string().min(1).max(SCHOOLS.city.maxLength * 2),
    /** A state or union territory of India, exactly as listed (case-insensitive). */
    state: z.string().max(60).optional(),
    board: BoardSchema.optional(),
  })
  .meta({
    id: 'SchoolCreate',
    description:
      'Find-or-create by normalised name + city (an existing school with the same name in the same city is reused). Names must not contain emails, links, handles, phone numbers or blocked words.',
  });
export const SchoolInput = z.union([SchoolPick, SchoolCreate]).nullable();

export const SCHOOL_STATUSES = ['set', 'not_set', 'consent_required'] as const;
export const SchoolStatusSchema = z
  .enum(SCHOOL_STATUSES)
  .meta({ id: 'SchoolStatus', description: 'set: a school is saved; not_set: none yet (the UI may prompt); consent_required: consent is not granted, so no school can be saved or shown (D-014).' });

