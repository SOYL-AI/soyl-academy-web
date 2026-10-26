/**
 * Notes body (Server Component): contents list, sections (body, key terms, formulas, visuals), exam tips,
 * and schema.org LearningResource data. Headings get stable ids (#s1 …) for the contents list and links.
 */
import type { ChapterNotes } from '@/platform/shared/api-client';
import type { Visual as VisualData } from '@/platform/shared/content/visual';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME, SITE_URL } from '@/lib/seo/config';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Markdown } from '@/components/platform/ui/render/Markdown';
import { MathBlock } from '@/components/platform/ui/render/MathBlock';
import { Visual } from '@/components/platform/ui/visual/Visual';
import { examLabel } from '../lib/catalog';
import { ReportMistake } from '../report/ReportMistake';
import type { ChapterRoute } from '../server/chapter-route';
import { PageHeader } from '../shell/PageHeader';
import shell from '../shell/shell.module.css';
import s from './notes.module.css';

export function NotesView({ route, notes }: { route: ChapterRoute; notes: ChapterNotes }) {
  const { hub, base, lang, chapterId, board, classLevel } = route;
  const path = `${base}/notes`;
  const hi = lang === 'hi';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${SITE_URL}${path}#notes`,
    name: notes.title,
    url: `${SITE_URL}${path}`,
    inLanguage: notes.language === 'hi' ? 'hi-IN' : 'en-IN',
    learningResourceType: 'Revision notes',
    educationalLevel: `${examLabel(board, classLevel)} Class ${classLevel}`,
    isAccessibleForFree: true,
    about: { '@type': 'Thing', name: `${hub.subject.name}: ${hub.chapter.titleEn ?? hub.chapter.title}` },
    teaches: hub.chapter.topics.map((t) => t.titleEn ?? t.title),
    hasPart: notes.sections.map((sec, i) => ({ '@type': 'CreativeWork', name: sec.heading, url: `${SITE_URL}${path}#s${i + 1}` })),
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    version: notes.version,
  };

  return (
    <div className={shell.page}>
      <StructuredData data={ld} />
      <PageHeader crumbs={[...route.crumbs, { name: hi ? 'नोट्स' : 'Notes', path }]} title={notes.title} lang={lang}>
        <p className={s.meta}>
          {notes.sections.length} sections
          {notes.reviewStatus === 'beta' && (
            <Badge tone="warning" title="Checked automatically; a teacher review is coming.">
              Beta
            </Badge>
          )}
        </p>
      </PageHeader>

      <nav aria-labelledby="notes-contents" className={s.toc}>
        <h2 id="notes-contents" className={s.tocTitle}>
          {hi ? 'विषय-सूची' : 'Contents'}
        </h2>
        <ol lang={lang}>
          {notes.sections.map((sec, i) => (
            <li key={i}>
              <a href={`#s${i + 1}`}>{sec.heading}</a>
            </li>
          ))}
          {notes.exam_tips_md.trim() && (
            <li>
              <a href="#exam-tips">{hi ? 'परीक्षा सुझाव' : 'Exam tips'}</a>
            </li>
          )}
        </ol>
      </nav>

      <article className={s.notes} lang={lang} data-testid="notes">
        {notes.sections.map((sec, i) => {
          const visuals = [sec.visual, ...(sec.visuals ?? [])].filter((v): v is NonNullable<typeof v> => !!v) as VisualData[];
          return (
            <section key={i} id={`s${i + 1}`} className={s.section} aria-labelledby={`s${i + 1}-h`}>
              <h2 id={`s${i + 1}-h`} className={s.heading}>
                {sec.heading}
              </h2>
              <Markdown lang={lang} headingOffset={2}>
                {sec.body_md}
              </Markdown>
              {visuals.map((v, k) => (
                <Visual key={k} visual={v} />
              ))}
              {sec.formulas.length > 0 && (
                <div className={s.formulas}>
                  <h3 className={s.subheading}>{hi ? 'सूत्र' : 'Formulas'}</h3>
                  <ul>
                    {sec.formulas.map((f, k) => (
                      <li key={k}>
                        {f.label && <span className={s.formulaLabel}>{f.label}</span>}
                        <MathBlock tex={f.latex} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sec.key_terms.length > 0 && (
                <div className={s.terms}>
                  <h3 className={s.subheading}>{hi ? 'मुख्य शब्द' : 'Key terms'}</h3>
                  <dl>
                    {sec.key_terms.map((t, k) => (
                      <div key={k} className={s.term}>
                        <dt>
                          <Markdown inline lang={lang}>
                            {t.term}
                          </Markdown>
                        </dt>
                        <dd>
                          <Markdown lang={lang}>{t.definition_md}</Markdown>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <div className={s.sectionFooter} lang="en">
                <ReportMistake target={{ chapterId, contentType: 'notes', itemRef: String(i) }} what={`section ${i + 1} of the notes`} compact />
              </div>
            </section>
          );
        })}
        {notes.exam_tips_md.trim() && (
          <section id="exam-tips" className={`${s.section} ${s.tips}`} aria-labelledby="exam-tips-h">
            <h2 id="exam-tips-h" className={s.heading}>
              {hi ? 'परीक्षा सुझाव' : 'Exam tips'}
            </h2>
            <Markdown lang={lang}>{notes.exam_tips_md}</Markdown>
          </section>
        )}
      </article>
      <footer className={s.footer}>
        <ReportMistake target={{ chapterId, contentType: 'notes' }} what="these notes" />
      </footer>
    </div>
  );
}
