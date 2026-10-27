import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Photo } from '@/components/media/Photo';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { getFutureBuildersFaqs } from '@/content/future-builders-faqs';
import {
  BASE_PRICE,
  COHORT as COHORT_DATA,
  CONTACT_HOURS,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  SCHEDULE,
  SEATS_TOTAL,
  VALUE_LINE,
  formatCohortDate,
  getCohortState,
  whatsappLink,
  whatsappShareLink,
  type CohortState,
} from '@/content/future-builders';
import { images, type EditorialImage } from '@/content/images';
import { ORGANIZATION_ID, SITE_URL, absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({
  path: '/future-builders',
  keywords: ['online coding classes for kids', 'robotics for students', 'AI course for teenagers', 'IoT for grades 7 to 12', 'entrepreneurship for students', 'Future Builders SOYL'],
});

// Registration state comes from today's date; re-check every hour.
export const revalidate = 3600;

const PRICE = `₹${BASE_PRICE.toLocaleString('en-IN')}`;

const MODULES: { weeks: string; title: string; desc: string; outcome: string; image: EditorialImage }[] = [
  { weeks: 'Weeks 1–4', title: 'Software and computing', desc: 'Python, APIs and SQLite databases. No prior coding needed.', outcome: 'A working Python tool and database backend for the capstone.', image: images.fbSoftware },
  { weeks: 'Weeks 5–6', title: 'AI and automation', desc: 'Machine learning, deep learning, RL agents and image processing.', outcome: 'Train a model and build a smart assistant into the product.', image: images.fbAi },
  { weeks: 'Weeks 7–9', title: 'IoT and robotics', desc: 'Low-voltage ESP32 electronics, sensors, servos and networking.', outcome: 'Wire sensors and a servo to give the software a physical body.', image: images.fbIot },
  { weeks: 'Weeks 10–12', title: 'Entrepreneurship', desc: 'Market discovery, customer interviews, cost sheets and Demo Day.', outcome: 'Pitch the finished prototype to parents, teachers and guests.', image: images.fbPitch },
];

const GLANCE = [
  ['Live online', `12 weeks, ${CONTACT_HOURS} contact hours, live on ${SCHEDULE.days}. Every session is recorded.`],
  ['Beginners welcome', 'Grades 7–12. No coding experience needed: students start with basic logic.'],
  ['Built in teams', 'Teams of 3–4 build a working prototype and present it on Demo Day.'],
  ['Hardware kit', 'A personal ESP32-C3 kit, shipped free across India around week 3 or 4. Theirs to keep.'],
  ['The fee', `${PRICE} covers all 12 weeks, the recordings and the kit.`],
  ['Try Session 1', 'Not the right fit? Ask for a full refund within 24 hours of Session 1 and keep the kit.'],
];

const PORTFOLIO = [
  { title: 'A public GitHub repository', line: 'Python, APIs and ESP32 firmware, documented with a README.' },
  { title: 'A recorded Demo Day pitch', line: 'Three minutes explaining the build, the testing and the business case.' },
  { title: 'A working device', line: 'A physical gadget with live sensor data that the student keeps improving.' },
  { title: 'A certificate of completion', line: `${CONTACT_HOURS} contact hours across software, AI, IoT and entrepreneurship.` },
];

function StatusBox({ state }: { state: CohortState }) {
  const COHORT = COHORT_DATA;
  if (state === 'waitlist' || !COHORT) {
    return (
      <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
        <p className="t-eyebrow mb-3 text-muted">Registration</p>
        <p className="t-title">Waitlist open</p>
        <p className="mt-3 text-muted">
          {COHORT ? `Registration for the ${COHORT.name} has closed. ` : ''}Dates for the next cohort are being set. Join the waitlist to hear first.
        </p>
        <ButtonLink href="#enroll" size="lg" className="mt-6 w-full" arrow>
          Join the waitlist
        </ButtonLink>
        <p className="t-small mt-4 text-muted">{PRICE} · {SEATS_TOTAL} seats per cohort · kit included</p>
      </div>
    );
  }

  const closing = state === 'closing-soon';
  return (
    <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
      <p className="t-eyebrow mb-3 text-muted">{COHORT.name}</p>
      <p className="t-title">
        {closing ? (
          <>
            Registration closes <span className="mark">{formatCohortDate(COHORT.registrationCloses)}</span>
          </>
        ) : (
          <>Registration open until {formatCohortDate(COHORT.registrationCloses)}</>
        )}
      </p>
      <dl className="t-small mt-5 grid grid-cols-2 gap-y-2 border-t border-rule pt-4">
        <dt className="text-muted">Orientation</dt>
        <dd className="t-num text-right">{formatCohortDate(COHORT.orientation, true)}</dd>
        <dt className="text-muted">Classes from</dt>
        <dd className="t-num text-right">{formatCohortDate(COHORT.classesStart, true)}</dd>
        <dt className="text-muted">Class times</dt>
        <dd className="text-right">{SCHEDULE.short}</dd>
        <dt className="text-muted">Seats</dt>
        <dd className="t-num text-right">{SEATS_TOTAL} per cohort</dd>
      </dl>
      <ButtonLink href="#enroll" size="lg" className="mt-6 w-full" arrow>
        Enrol now · {PRICE}
      </ButtonLink>
      <p className="t-small mt-4 text-muted">{VALUE_LINE}</p>
    </div>
  );
}

export default function FutureBuildersPage() {
  const state = getCohortState();
  const cohort = state !== 'waitlist' ? COHORT_DATA : null;
  const open = Boolean(cohort);
  const faqs = getFutureBuildersFaqs(state);
  const url = absoluteUrl('/future-builders');

  const programmeNode = {
    '@type': 'EducationalOrganization',
    '@id': `${url}#programme`,
    name: 'SOYL Academy Future Builders Programme',
    url,
    description: 'A 12-week live online programme for Grades 7 to 12 in software, AI, IoT robotics and entrepreneurship.',
    parentOrganization: { '@id': ORGANIZATION_ID },
  };
  const courseNode = {
    '@type': 'Course',
    '@id': `${url}#course`,
    name: 'Future Builders Programme',
    description: 'A 12-week builder’s workshop for Grades 7 to 12: software development, AI, IoT robotics and entrepreneurship.',
    provider: { '@id': `${url}#programme` },
    educationalCredentialAwarded: 'Certificate of completion',
    offers: { '@type': 'Offer', price: String(BASE_PRICE), priceCurrency: 'INR', category: 'Paid', url },
    ...(open
      ? {
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            startDate: cohort!.classesStart,
            endDate: cohort!.ends,
            courseSchedule: { '@type': 'Schedule', repeatFrequency: 'P1W', byDay: ['https://schema.org/Saturday', 'https://schema.org/Sunday'] },
          },
        }
      : {}),
  };

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/future-builders' }),
          breadcrumbNode('/future-builders', topLevelCrumbs('/future-builders')),
          programmeNode,
          courseNode,
          faqNode('/future-builders', faqs)
        )}
      />

      <PageHero
        tone="yellow"
        label="Future Builders · Grades 7–12"
        title={
          <>
            Build a <span className="t-accent">real</span> product.
          </>
        }
        intro={`12 weekends, ${CONTACT_HOURS} contact hours, one working prototype. A live online cohort covering software, AI, IoT robotics and entrepreneurship, with a hardware kit shipped home.`}
        actions={
          <a href={whatsappLink('Hi, I have a question about Future Builders')} target="_blank" rel="noopener noreferrer" className="arrow-link">
            Ask a question on WhatsApp
          </a>
        }
        aside={<StatusBox state={state} />}
        image={images.fbPresentation}
        imageLayout="wide"
      />

      {/* At a glance */}
      <section className="section">
        <div className="page">
          <SectionHeader label="At a glance" num="01" title="Everything a parent asks first." />
          <dl className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {GLANCE.map(([title, line], i) => (
              <div
                key={title}
                data-reveal
                style={{ '--d': `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="border-t border-rule-strong pb-8 pt-6"
              >
                <dt className="font-serif text-[1.625rem] leading-tight">{title}</dt>
                <dd className="mt-2 max-w-[38ch] text-muted">{line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section bg-paper">
        <div className="page">
          <SectionHeader label="Curriculum" num="02" title="Four modules, one product." intro={`${CONTACT_HOURS} hours of hands-on building over 12 weekends, from first Python program to a device that senses and acts.`} />
          <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m, i) => (
              <li key={m.title} className="flex flex-col" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <Photo image={m.image} aspect="aspect-[4/3]" reveal={false} sizes="(min-width: 1320px) 290px, (min-width: 768px) 45vw, 100vw" />
                <p className="t-label t-num mt-6 text-muted">{m.weeks}</p>
                <h3 className="t-title mt-2">{m.title}</h3>
                <p className="mt-2 text-muted">{m.desc}</p>
                <p className="t-small mt-auto border-t border-rule-strong pt-4 text-ink">
                  <span className="font-semibold">Outcome: </span>
                  {m.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What students leave with */}
      <section className="section">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <Label num="03" className="mb-6">For Grades 10–12</Label>
            <h2 className="t-headline max-w-[12ch]">
              Proof of work, not just <span className="t-accent">marks.</span>
            </h2>
            <p className="t-lead mt-6 max-w-[42ch]">
              Admissions panels and internship recruiters look for what a student has actually built. Every Future Builder leaves with four things to show.
            </p>
          </div>
          <ul className="col-span-12 border-t border-ink lg:col-span-6 lg:col-start-7">
            {PORTFOLIO.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties} className="flex gap-6 border-b border-rule py-6">
                <span className="t-num font-serif text-[2.25rem] leading-none text-cobalt">{i + 1}</span>
                <div>
                  <h3 className="t-subtitle">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bring a friend — only while there is something to enrol in */}
      {open && (
        <section className="section-tight">
          <div className="page">
            <div className="grid-12 items-center gap-y-6 rounded-[var(--radius-lg)] bg-highlighter p-6 md:p-12" data-reveal>
              <div className="col-span-12 lg:col-span-8">
                <p className="t-eyebrow mb-4 text-ink">Bring a friend</p>
                <h2 className="t-headline">You both save ₹{FRIEND_DISCOUNT}.</h2>
                <p className="mt-4 max-w-[52ch] text-ink">
                  Projects are built in teams of 3–4, so it’s better with a friend. Use code <strong className="rounded bg-ink px-1.5 py-0.5 font-mono text-[15px] text-white">{FRIEND_CODE}</strong> at checkout; your friend gets ₹{FRIEND_DISCOUNT} too.
                </p>
              </div>
              <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
                <ButtonLink href={`/future-builders?coupon=${FRIEND_CODE}#enroll`} size="lg">
                  Enrol with {FRIEND_CODE}
                </ButtonLink>
                <a
                  href={whatsappShareLink(`Future Builders by SOYL Academy: a 12-week online course for Grades 7–12 (software, AI, IoT, with a hardware kit). Use code ${FRIEND_CODE} and we both save ₹${FRIEND_DISCOUNT}: ${SITE_URL}/future-builders?coupon=${FRIEND_CODE}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link justify-center"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Faq faqs={faqs} heading="Questions from parents" num="04" />

      {/* Enrol or join the waitlist — exactly one state */}
      <section id="enroll" className="section scroll-mt-16 bg-paper">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <Label num="05" className="mb-6">{open ? 'Enrol' : 'Waitlist'}</Label>
            <h2 className="t-headline">{cohort ? `Join the ${cohort.name}.` : 'Be first in the next cohort.'}</h2>
            <p className="mt-5 max-w-[38ch] text-muted">
              {open
                ? `Only ${SEATS_TOTAL} students per cohort, so every project gets an instructor’s attention.`
                : `Each cohort has ${SEATS_TOTAL} seats. Waitlisted families hear about new dates before anyone else.`}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {cohort ? (
              <FutureBuildersForm
                closesOn={formatCohortDate(cohort.registrationCloses)}
                orientationOn={formatCohortDate(cohort.orientation)}
                cohortName={cohort.name}
              />
            ) : (
              <WaitlistForm />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
