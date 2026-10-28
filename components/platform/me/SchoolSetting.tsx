'use client';

/**
 * School on the profile (D-043, D-014). Only for accounts whose consent is `granted`: search-as-you-type
 * (`GET /v1/schools`, debounced), pick a result, or "Add my school" (name, city, optional state and board,
 * checked in the browser with the shared validator before `PATCH /v1/me { school }`), and remove it again.
 * Without consent nothing is shown but one line and the way to the approval flow, and no school request is
 * ever sent. The school is private: it is never shown to other students.
 */
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { isApiError, type Me, type School, type SchoolCreate } from '@/platform/shared/api-client';
import { INDIAN_STATES } from '@/platform/shared/config/schools';
import { canonicalState, schoolSearchKeys, validateCity, validateSchoolName } from '@/platform/shared/profile/school';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge } from '@/components/platform/ui/kit/Display';
import { TextInput } from '@/components/platform/ui/kit/Field';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, type BoardSlug } from '../lib/catalog';
import { problemMessage } from '../lib/problems';
import s from './me.module.css';

/** Wait this long after the last keystroke before searching. */
export const SCHOOL_SEARCH_DEBOUNCE_MS = 300;

export interface NewSchoolFields {
  name: string;
  city: string;
  state: string;
  board: BoardSlug | '';
}

export type NewSchoolErrors = Partial<Record<'name' | 'city' | 'state', string>>;

/** Browser-side check with the same rules the API applies (platform/shared/profile/school.ts). */
export function checkNewSchool(f: NewSchoolFields): { ok: true; body: SchoolCreate } | { ok: false; errors: NewSchoolErrors } {
  const errors: NewSchoolErrors = {};
  const name = validateSchoolName(f.name);
  const city = validateCity(f.city);
  if (!name.ok) errors.name = `The school name ${name.reason}.`;
  if (!city.ok) errors.city = `The city ${city.reason}.`;
  const state = f.state ? canonicalState(f.state) : null;
  if (f.state && !state) errors.state = 'Choose a state or union territory from the list.';
  if (!name.ok || !city.ok || errors.state) return { ok: false, errors };
  const body: SchoolCreate = { name: name.value, city: city.value };
  if (state) body.state = state;
  if (f.board) body.board = f.board;
  return { ok: true, body };
}

export function schoolPlace(school: Pick<School, 'city' | 'state'>): string {
  return [school.city, school.state].filter(Boolean).join(', ');
}

/** Maps the API's field errors (`body.school.name`) to the add form. */
function apiFieldErrors(err: unknown): NewSchoolErrors | null {
  if (!isApiError(err, 'validation_failed')) return null;
  const out: NewSchoolErrors = {};
  for (const e of err.problem?.errors ?? []) {
    if (e.path.endsWith('school.name')) out.name = 'Check the school name: no links, emails, phone numbers or rude words.';
    else if (e.path.endsWith('school.city')) out.city = 'Check the city: letters only.';
    else if (e.path.endsWith('school.state')) out.state = 'Choose a state or union territory from the list.';
  }
  return Object.keys(out).length ? out : null;
}

export function SchoolSetting({ me, onChange }: { me: Me; onChange: (me: Me) => void }) {
  if (me.consent !== 'granted') {
    return (
      <section className={s.subsection} aria-labelledby="school-title" id="school" data-testid="school-locked">
        <h3 id="school-title" className={s.subTitle}>
          School
        </h3>
        <p className={s.muted}>You can add your school after a parent approves extra features (or you confirm you are 18 or older).</p>
        <a className={s.textLink} href="/me/consent?next=%2Fme">
          Turn on extra features
        </a>
      </section>
    );
  }
  return <SchoolEditor me={me} onChange={onChange} />;
}

function SchoolEditor({ me, onChange }: { me: Me; onChange: (me: Me) => void }) {
  const toast = useToast();
  const [mode, setMode] = useState<'view' | 'search' | 'add'>(me.school ? 'view' : 'search');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(school: { schoolId: string } | SchoolCreate | null): Promise<unknown> {
    setBusy(true);
    setError(null);
    try {
      const next = await api.patch('/v1/me', { body: { school } });
      onChange(next);
      setMode(next.school ? 'view' : 'search');
      toast.show({ title: school === null ? 'School removed' : 'School saved', tone: 'success' });
      return null;
    } catch (err) {
      if (!apiFieldErrors(err)) setError(problemMessage(err));
      return err;
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={s.subsection} aria-labelledby="school-title" id="school" data-testid="school-setting" data-mode={mode}>
      <h3 id="school-title" className={s.subTitle}>
        School
      </h3>
      <p className={s.privateNote}>
        <Icon name="lock" size={16} /> Private: only you can see your school. It is never shown to other students.
      </p>
      {me.school && mode === 'view' && (
        <div className={s.schoolCurrent} data-testid="school-current">
          <p className={s.schoolName}>
            {me.school.name} {me.school.verified && <Badge tone="success">Verified</Badge>}
          </p>
          {schoolPlace(me.school) && <p className={s.muted}>{schoolPlace(me.school)}</p>}
          <div className={s.actions}>
            <Button variant="secondary" size="sm" onClick={() => setMode('search')} disabled={busy}>
              Change school
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void save(null)} loading={busy} data-testid="school-remove">
              Remove
            </Button>
          </div>
        </div>
      )}
      {mode === 'search' && (
        <SchoolSearchBox
          busy={busy}
          onPick={(school) => void save({ schoolId: school.id })}
          onAdd={() => setMode('add')}
          onCancel={me.school ? () => setMode('view') : undefined}
        />
      )}
      {mode === 'add' && <AddSchoolForm busy={busy} onSubmit={save} onCancel={() => setMode(me.school ? 'view' : 'search')} />}
      {error && (
        <p className={s.formError} role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

type SearchState = { status: 'idle' } | { status: 'loading' } | { status: 'done'; query: string; schools: School[] } | { status: 'error'; message: string };

function SchoolSearchBox({ busy, onPick, onAdd, onCancel }: { busy: boolean; onPick: (school: School) => void; onAdd: () => void; onCancel?: () => void }) {
  const [q, setQ] = useState('');
  const [search, setSearch] = useState<SearchState>({ status: 'idle' });
  const listId = useId();
  const aborter = useRef<AbortController | null>(null);
  const searchable = schoolSearchKeys(q).length > 0;

  useEffect(() => {
    aborter.current?.abort();
    if (!searchable) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing results when the query gets too short
      setSearch({ status: 'idle' });
      return;
    }
    const query = q.trim();
    const timer = window.setTimeout(() => {
      const ctrl = new AbortController();
      aborter.current = ctrl;
      setSearch({ status: 'loading' });
      api
        .get('/v1/schools', { query: { q: query }, signal: ctrl.signal })
        .then((res) => !ctrl.signal.aborted && setSearch({ status: 'done', query, schools: res.schools }))
        .catch((err: unknown) => {
          if (ctrl.signal.aborted || (err as { name?: string })?.name === 'AbortError') return;
          setSearch({ status: 'error', message: problemMessage(err) });
        });
    }, SCHOOL_SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [q, searchable]);

  useEffect(() => () => aborter.current?.abort(), []);

  return (
    <div className={s.schoolSearch} data-testid="school-search">
      <TextInput
        label="Find your school"
        hint="Type at least 2 letters of its name."
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoComplete="off"
        name="schoolQuery"
        aria-controls={listId}
      />
      <div id={listId} aria-live="polite" className={s.schoolResults}>
        {search.status === 'loading' && <p className={s.muted}>Searching…</p>}
        {search.status === 'error' && (
          <p className={s.formError} role="alert">
            {search.message}
          </p>
        )}
        {search.status === 'done' &&
          (search.schools.length === 0 ? (
            <p className={s.muted} data-testid="school-no-results">
              No school found for “{search.query}”.
            </p>
          ) : (
            <ul className={s.schoolList} aria-label="Schools found">
              {search.schools.map((school) => (
                <li key={school.id}>
                  <button type="button" className={s.schoolOption} onClick={() => onPick(school)} disabled={busy} data-testid="school-option">
                    <span className={s.schoolName}>{school.name}</span>
                    {schoolPlace(school) && <span className={s.muted}>{schoolPlace(school)}</span>}
                  </button>
                </li>
              ))}
            </ul>
          ))}
      </div>
      <div className={s.actions}>
        <Button variant="secondary" size="sm" onClick={onAdd} disabled={busy} data-testid="school-add">
          <Icon name="plus" size={16} /> Add my school
        </Button>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

function AddSchoolForm({ busy, onSubmit, onCancel }: { busy: boolean; onSubmit: (body: SchoolCreate) => Promise<unknown>; onCancel: () => void }) {
  const [f, setF] = useState<NewSchoolFields>({ name: '', city: '', state: '', board: '' });
  const [errors, setErrors] = useState<NewSchoolErrors>({});
  const stateId = useId();
  const boardId = useId();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const checked = checkNewSchool(f);
    if (!checked.ok) {
      setErrors(checked.errors);
      return;
    }
    setErrors({});
    const err = await onSubmit(checked.body);
    const fields = apiFieldErrors(err);
    if (fields) setErrors(fields);
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate data-testid="school-add-form">
      <TextInput label="School name" value={f.name} error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} name="schoolName" autoComplete="off" maxLength={120} required />
      <TextInput label="City or town" value={f.city} error={errors.city} onChange={(e) => setF({ ...f, city: e.target.value })} name="schoolCity" autoComplete="off" maxLength={60} required />
      <div className={s.row}>
        <div className={s.selectField}>
          <label htmlFor={stateId} className={s.label}>
            State (optional)
          </label>
          <select id={stateId} className={s.select} value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })} name="schoolState" aria-invalid={errors.state ? true : undefined}>
            <option value="">Not given</option>
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && <p className={s.formError}>{errors.state}</p>}
        </div>
        <div className={s.selectField}>
          <label htmlFor={boardId} className={s.label}>
            Board (optional)
          </label>
          <select id={boardId} className={s.select} value={f.board} onChange={(e) => setF({ ...f, board: e.target.value as BoardSlug | '' })} name="schoolBoard">
            <option value="">Not given</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {BOARD_NAMES[b]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className={s.muted}>Use the school’s full name. No phone numbers, emails or links.</p>
      <div className={s.actions}>
        <Button type="submit" loading={busy} data-testid="school-save">
          Save school
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
