/**
 * Notes body (Server Component): a reading layout (learn-mode, 2026-10-29). Header (breadcrumb, title, sections,
 * reading time), the contents (inline on phones, a sticky sidebar with the section being read from 1024 px), a
 * sticky reader bar on phones (section, reading progress, "Sections" sheet), the sections (body, visuals,
 * formulas and key terms as callouts, a report button), exam tips as a callout, then "what next" (back to the
 * chapter, flashcards / practice). Markdown, KaTeX and diagrams are rendered here (no client JS); only the
 * contents, the reader bar and "Report a mistake" are client islands. schema.org LearningResource data.
 * Section ids (#s1 …, #exam-tips) are stable for the contents and links.
 */
import Link from 'next/link';
import type { ChapterNotes } from '@/platform/shared/api-client';
import type { Visual as VisualData } from '@/platform/shared/content/visual';
import { StructuredData } from '@/components/seo/StructuredData';
import { cx } from '@/components/platform/ui/cx';
import { SITE_NAME, SITE_URL } from '@/lib/seo/config';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { Markdown } from '@/components/platform/ui/render/Markdown';
import { MathBlock } from '@/components/platform/ui/render/MathBlock';
import { Visual } from '@/components/platform/ui/visual/Visual';
import { examLabel } from '../lib/catalog';
import { ReportMistake } from '../report/ReportMistake';
import { InterestPing } from '../lib/InterestPing';
import type { ChapterRoute } from '../server/chapter-route';
import { PageHeader } from '../shell/PageHeader';
import { NOTES_ARTICLE_ID, NotesReaderBar, NotesToc } from './NotesToc';
import { readingMinutes, tocItems } from './toc-model';
import shell from '../shell/shell.module.css';
import s from './notes.module.css';

export function NotesView({ route, notes }: { route: ChapterRoute; notes: ChapterNotes }) {
  const { hub, base, lang, chapterId, board, classLevel } = route;
  const path = `${base}/notes`;
  const hi = lang === 'hi';
  const tips = notes.exam_tips_md.trim();
  const items = tocItems(
    notes.sections.map((sec) => sec.heading),
    tips ? (hi ? 'परीक्षा सुझाव' : 'Exam tips') : null,
  );
  const minutes = readingMinutes(
    [
      ...notes.sections.flatMap((sec) => [sec.heading, sec.body_md, ...sec.key_terms.flatMap((t) => [t.term, t.definition_md])]),
      notes.exam_tips_md,
    ].join(' '),
  );
  const next = hub.assets.flashcards.available
    ? { href: `${base}/flashcards`, label: hi ? 'आगे: फ़्लैशकार्ड' : 'Next: Flashcards', note: hi ? 'जो पढ़ा, उसे याद करें' : 'Check what you remember' }
    : hub.assets.practice.available
      ? { href: `${base}/practice`, label: hi ? 'आगे: अभ्यास' : 'Next: Practice', note: hi ? 'प्रश्न हल करें' : 'Answer questions on this chapter' }
      : null;
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
    timeRequired: `PT${minutes}M`,
  };

  return (
    <div className={shell.page}>
      <StructuredData data={ld} />
      <div className={s.layout}>
        <div className={s.head}>
          <PageHeader crumbs={[...route.crumbs, { name: hi ? 'नोट्स' : 'Notes', path }]} title={notes.title} lang={lang}>
            <p className={s.meta}>
              <span>
                <Icon name="list" size={16} /> {notes.sections.length} sections
              </span>
              <span>
                <Icon name="clock" size={16} /> {minutes} min read
              </span>
              {notes.reviewStatus === 'beta' && (
                <Badge tone="warning" title="Checked automatically; a teacher review is coming.">
                  Beta
                </Badge>
              )}
            </p>
          </PageHeader>
        </div>

        <div className={s.aside}>
          <NotesToc items={items} lang={lang} title={hi ? 'विषय-सूची' : 'Contents'} />
        </div>

        <div className={s.main}>
          <NotesReaderBar items={items} lang={lang} sheetTitle={hi ? 'खंड' : 'Sections'} />
          <article className={s.notes} id={NOTES_ARTICLE_ID} lang={lang} data-testid="notes">
            {notes.sections.map((sec, i) => {
              const visuals = [sec.visual, ...(sec.visuals ?? [])].filter((v): v is NonNullable<typeof v> => !!v) as VisualData[];
              return (
                <section key={i} id={`s${i + 1}`} className={s.section} aria-labelledby={`s${i + 1}-h`}>
                  <h2 id={`s${i + 1}-h`} className={s.heading}>
                    {sec.heading}
                  </h2>
                  <div className={s.prose}>
                    <Markdown lang={lang} headingOffset={2}>
                      {sec.body_md}
                    </Markdown>
                  </div>
                  {visuals.map((v, k) => (
                    <Visual key={k} visual={v} />
                  ))}
                  {sec.formulas.length > 0 && (
                    <div className={s.callout} data-kind="formulas">
                      <h3 id={`s${i + 1}-f`} className={s.calloutTitle}>
                        <Icon name="layers" size={18} /> {hi ? 'सूत्र' : 'Formulas'}
                      </h3>
                      <ul className={s.formulas}>
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
                    <div className={s.callout} data-kind="terms">
                      <h3 id={`s${i + 1}-k`} className={s.calloutTitle}>
                        <Icon name="book" size={18} /> {hi ? 'मुख्य शब्द' : 'Key terms'}
                      </h3>
                      <dl className={s.terms}>
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
            {tips && (
              <section id="exam-tips" className={cx(s.section, s.callout)} data-kind="tips" aria-labelledby="exam-tips-h">
                <h2 id="exam-tips-h" className={s.calloutTitle}>
                  <Icon name="spark" size={20} /> {hi ? 'परीक्षा सुझाव' : 'Exam tips'}
                </h2>
                <div className={s.prose}>
                  <Markdown lang={lang}>{notes.exam_tips_md}</Markdown>
                </div>
              </section>
            )}
          </article>

          <nav className={s.endNav} aria-label={hi ? 'आगे क्या' : 'What next'} lang={lang}>
            <Link href={base} className={s.endBack}>
              <Icon name="chevronLeft" size={18} /> {hi ? 'अध्याय पर वापस' : 'Back to chapter'}
            </Link>
            {next && (
              <Link href={next.href} className={s.endNext} data-testid="notes-next">
                <span className={s.endNextText}>
                  <span className={s.endNextLabel}>{next.label}</span>
                  <span className={s.endNextNote}>{next.note}</span>
                </span>
                <Icon name="chevronRight" size={20} />
              </Link>
            )}
          </nav>
          <footer className={s.footer}>
            <ReportMistake target={{ chapterId, contentType: 'notes' }} what="these notes" />
          </footer>
        </div>
      </div>
      <InterestPing name="notes_open" />
    </div>
  );
}

