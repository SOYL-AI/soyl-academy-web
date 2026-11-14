import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { Arrow, Dab, Marked, Note } from '@/components/brush/marks';
import { LabNotebook } from '@/components/method/LabNotebook';
import { MediumIcon } from '@/components/method/MediumIcon';
import { MissionPath } from '@/components/method/MissionPath';
import { QuietClock } from '@/components/method/QuietClock';
import { methodFaqs } from '@/content/faqs';
import { after, bench, guide, media, pillars, rules, stages } from '@/content/method';
import { PRIMARY_CTA } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, methodTermSetNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/method' });

const INK_TEXT = {
  ochre: 'text-graphite',
  ultramarine: 'text-ultramarine',
  vermilion: 'text-vermilion-ink',
  sap: 'text-sap',
} as const;

/**
 * How missions work (ADR-033): the mission from the inside, from the SOYL Missions spec v1.2. The five stages and
 * the SOYL Method they carry, how pupils can work, the lab bench, the engine's rules, the guide, and what happens
 * after the hour. The SOYL Method's five pillars stay in the JSON-LD (DefinedTermSet) and on the stage cards.
 */
export default function MethodPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/method', mainEntityId: `${absoluteUrl('/method')}#method` }),
          breadcrumbNode('/method', topLevelCrumbs('/method')),
          methodTermSetNode(pillars),
          faqNode('/method', methodFaqs)
        )}
      />

      <PageHero
        tone="blue"
        label="How missions work"
        title={
          <>
            One scene. Five stages. <span className="t-accent">Every</span> path different.
          </>
        }
        intro="A mission replaces an assignment. It runs for about 45 minutes, never more than 60, and ends when the evidence is in, not when the questions run out."
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="#stages" variant="secondary" size="lg">
              The five stages
            </ButtonLink>
          </>
        }
        aside={<MissionPath />}
      />

      {/* The five stages, with the SOYL Method each one carries. */}
      <section id="stages" className="section bg-sheet-deep" aria-labelledby="stages-heading">
        <div className="page">
          <SectionHeader
            id="stages-heading"
            label="The stages"
            num="01"
            title="Same skeleton in every subject."
            intro="Spark, Build, Defend, Fix, Reflect. Each one carries a part of the SOYL Method, so the thinking shows the same way in every subject."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 md:mt-16">
            {stages.map((s, i) => (
              <li
                key={s.name}
                className={`leaf flex flex-col p-5 ${i % 2 ? 'lg:translate-y-6 lg:rotate-[0.6deg]' : 'lg:-rotate-[0.5deg]'}`}
                data-reveal
                style={{ '--d': `${i * 70}ms` } as React.CSSProperties}
              >
                <Dab ink={s.ink} className="h-4 w-4" />
                <h3 className="mt-3 font-serif text-[1.9rem] leading-none tracking-[-0.015em]">{s.name}</h3>
                <p className={`hand mt-1 text-[1.1rem] ${INK_TEXT[s.ink]}`}>{s.method}</p>
                <p className="mt-4 leading-snug">{s.pupil}</p>
                <p className="mt-3 text-[0.92rem] leading-snug text-graphite">{s.soyl}</p>
                <p className="mt-auto pt-5 text-[0.85rem] text-graphite">
                  <span className="t-eyebrow mr-1 text-[0.7rem] text-vermilion-ink">We measure</span> {s.measure}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How pupils can work. */}
      <section className="section" aria-labelledby="media-heading">
        <div className="page">
          <SectionHeader
            id="media-heading"
            label="Say it, type it, snap it"
            num="02"
            title="Pupils choose the medium."
            intro="Oral first where the skill is oral, mixed everywhere else. Boards are written exams, so writing still matters."
          />
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {media.map((m) => (
              <li key={m.title}>
                <MediumIcon name={m.icon} className="h-14 w-14 text-ink" />
                <p className="mt-3 font-serif text-[1.6rem] leading-none tracking-[-0.01em]">{m.title}</p>
                <p className="mt-2 leading-snug text-graphite">{m.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-[60ch] border-t border-ink/15 pt-6 text-graphite" data-reveal>
            Match, order, choose and label still appear, but only as{' '}
            <Marked mark="under" ink="ochre" weight={4}>
              small moments
            </Marked>{' '}
            inside the scene. Never a page of options.
          </p>
        </div>
      </section>

      {/* The lab bench. */}
      <section className="section bg-sheet-deep" aria-labelledby="bench-heading">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader id="bench-heading" label="In science" num="03" title="A real lab bench, not a tool." layout="stack" />
            <ul className="mt-8 space-y-5" data-reveal>
              {bench.points.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <Dab ink={(['ultramarine', 'vermilion', 'sap'] as const)[i]} className="mt-1.5" />
                  <span>
                    <span className="font-semibold">{p.title}.</span> <span className="text-graphite">{p.line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <div className="tilt-r">
              <LabNotebook />
            </div>
          </div>
        </div>
      </section>

      {/* The engine's rules. */}
      <section className="section" aria-labelledby="rules-heading">
        <div className="page">
          <SectionHeader
            id="rules-heading"
            label="The quiet clock"
            num="04"
            title="It plans to finish early, not to fill the hour."
          />
          <div className="mt-12 md:mt-16" data-reveal>
            <QuietClock />
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3" data-reveal>
            {rules.map((r) => (
              <li key={r.title} className="sketch-soft p-5 md:p-6">
                <p className="font-serif text-[1.5rem] leading-tight tracking-[-0.01em]">{r.title}</p>
                <p className="mt-2 leading-snug text-graphite">{r.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The guide. */}
      <section className="section bg-sheet-deep" aria-labelledby="guide-heading">
        <div className="page">
          <SectionHeader
            id="guide-heading"
            label="The guide"
            num="05"
            title="A guide, not a quiz host."
            intro="SOYL’s guide speaks to pupils in short bubbles. It asks, points and narrows. The pupil does the thinking."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal>
            <div className="leaf tape p-6 md:p-8" style={{ '--tape': 'var(--color-sap)' } as React.CSSProperties}>
              <p className="hand text-[1.5rem] text-sap">The guide does</p>
              <ul className="mt-4 space-y-3">
                {guide.does.map((g) => (
                  <li key={g} className="flex gap-3 leading-snug">
                    <Dab ink="sap" className="mt-1.5" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="leaf tape-r p-6 md:p-8" style={{ '--tape': 'var(--color-vermilion)' } as React.CSSProperties}>
              <p className="hand text-[1.5rem] text-vermilion-ink">The guide never</p>
              <ul className="mt-4 space-y-3">
                {guide.never.map((g) => (
                  <li key={g} className="flex gap-3 leading-snug">
                    <Dab ink="vermilion" className="mt-1.5" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-[1.15rem]">
            <Note ink="graphite" tilt={-1.5}>
              It never appears on teacher screens. Those stay calm and professional.
            </Note>
          </p>
        </div>
      </section>

      {/* After the hour. */}
      <section className="section" aria-labelledby="after-heading">
        <div className="page">
          <SectionHeader
            id="after-heading"
            label="After the hour"
            num="06"
            title="Proof that it stuck."
            intro="Teachers approve every mission before a pupil sees it. What comes back is evidence, not a mark."
          />
          <ol className="mt-12 grid items-start gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-3" data-reveal>
            {after.map((a, i) => (
              <li key={a.title} className="contents">
                <div className="leaf p-6">
                  <Dab ink={a.ink} className="h-4 w-4" />
                  <p className="mt-3 font-serif text-[1.8rem] leading-none tracking-[-0.015em]">{a.title}</p>
                  <p className="mt-3 leading-snug text-graphite">{a.line}</p>
                </div>
                {i < after.length - 1 && <Arrow to="right" ink="graphite" className="mx-auto hidden h-10 w-16 self-center md:block" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq faqs={methodFaqs} heading="Questions about missions" className="bg-sheet-deep" />
      <FinalCta />
    </>
  );
}
