import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { BrushArt } from '@/components/brush/BrushArt';
import { Dab, Marked, Note } from '@/components/brush/marks';
import { KitSketch } from '@/components/future-builders/KitSketch';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { PriceCard, StatusCard } from '@/components/future-builders/Cards';
import { Curriculum } from '@/components/future-builders/Curriculum';
import { CtaTracker } from '@/components/future-builders/CtaTracker';
import { OfferBand } from '@/components/future-builders/OfferBand';
import { StickyCta } from '@/components/future-builders/StickyCta';
import { getFutureBuildersFaqs } from '@/content/future-builders-faqs';
import {
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  LIST_PRICE,
  STANDARD_OFFER,
  WHATSAPP_DISPLAY,
  campTimingLine,
  formatCohortDate,
  getActiveOffer,
  getCohortState,
  getOpenCohort,
  getUpcomingCohort,
  previewNow,
  rupees,
  today,
  whatsappLink,
  whatsappShareLink,
} from '@/content/future-builders';
import { ORGANIZATION_ID, SITE_URL, absoluteUrl } from '@/lib/seo/config';
import { createMetadata, ogImageUrl } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({
  path: '/future-builders',
  keywords: ['summer coding camp for kids', 'online summer camp India', 'robotics for students', 'AI course for teenagers', 'IoT for grades 7 to 12', 'entrepreneurship for students', 'Future Builders SOYL'],
});

// Registration state and the offer come from the date; re-check every 5 minutes so the offer
// price and theme go within minutes of the offer's end (the payment API prices by its own clock).
export const revalidate = 300;

const WHATSAPP_URL = whatsappLink('Hi, I have a question about the Future Builders summer camp');

/** Where a student starts, and what they can do by Demo Day. */
const CHANGES: [string, string][] = [
  ['Uses apps someone else built.', 'Writes Python that runs, and fixes it when it doesn’t.'],
  ['Hears about AI in the news.', 'Has trained a model to recognise images.'],
  ['Meets circuits in a textbook.', 'Has wired sensors and a motor to their own board.'],
  ['Has marks to show for the year.', 'Has code, a working device and a recorded pitch.'],
];

const HOW: [string, string][] = [
  ['Live, and recorded', 'Live video classes (IST) in the summer break. Missed one? Watch the recording.'],
  ['Teams of 3–4', 'Instructors review every student’s project. You meet them at orientation.'],
  ['What they need', 'A laptop or desktop with a USB port, and internet for a video call.'],
  ['What parents see', 'An invitation to Demo Day, the code on GitHub, and us on WhatsApp.'],
];
const HOW_INK = ['ultramarine', 'vermilion', 'ochre', 'sap'] as const;

const PORTFOLIO = [
  { title: 'A GitHub repository', line: 'Python, APIs and ESP32 firmware, with a README.' },
  { title: 'A recorded pitch', line: 'Three minutes on the build, the testing and the business case.' },
  { title: 'A working device', line: 'Live sensor data, theirs to keep improving.' },
  { title: 'A certificate', line: 'For the full programme, all four modules.' },
];

/**
 * Future Builders: the summer camp's sales page. One structure, four registration states from
 * content/future-builders.ts:
 *   open / closing-soon → pay (Razorpay, verified on the server) or request a call
 *   upcoming            → "notify me when registration opens" or request a call
 *   waitlist            → join the waitlist or request a call
 * and two offers by date: the early-bird (now the Children’s Day offer, with its theme, until 20 Nov 2026 23:59 IST), then
 * the standard fee. Nothing is stated unless it is in the config: no invented dates, timetable,
 * seat counts, hours or proof.
 */
export default function FutureBuildersPage() {
  const now = today();
  const state = getCohortState(now);
  const camp = getOpenCohort(now);
  const upcoming = camp ? null : getUpcomingCohort(now);
  const shown = camp ?? upcoming;
  const offer = getActiveOffer(now);
  const festive = Boolean(camp) && offer.theme === 'festive';
  const preview = previewNow();
  // eslint-disable-next-line react-hooks/purity -- dev preview only: aligns the countdown with COHORT_PREVIEW_DATE
  const offsetMs = preview ? preview.getTime() - Date.now() : undefined;
  const faqs = getFutureBuildersFaqs(state, now);
  const url = absoluteUrl('/future-builders');
  const price = rupees(offer.price);

  const primary = camp
    ? { label: `Register now · ${price}`, short: 'Register', track: 'enrol' }
    : upcoming
      ? { label: 'Notify me when registration opens', short: 'Notify me', track: 'notify' }
      : { label: 'Join the waitlist', short: 'Join waitlist', track: 'waitlist' };

  const chips = ['Live online', shown ? `${shown.months} summer camp` : 'Summer camp', 'Four modules', 'Grades 7–12', 'Kit shipped home'];

  // Course rich result: only facts that are true today. The offer and the course instance exist
  // only while registration is open; the instance is month-level until exact dates are set.
  const courseNode = {
    '@type': 'Course',
    '@id': `${url}#course`,
    name: 'Future Builders Summer Camp',
    description: 'A live online summer camp for Grades 7 to 12: software, AI, IoT robotics and entrepreneurship, with a hardware kit. Students build a working prototype in teams and pitch it on Demo Day.',
    url,
    image: ogImageUrl('/future-builders'),
    inLanguage: 'en-IN',
    provider: { '@id': ORGANIZATION_ID },
    educationalLevel: 'Grades 7 to 12',
    coursePrerequisites: 'None. Designed for complete beginners.',
    teaches: ['Python programming', 'APIs and SQLite databases', 'Machine learning and image recognition', 'ESP32 electronics, sensors and servos', 'Entrepreneurship and pitching'],
    educationalCredentialAwarded: 'Certificate of completion',
    ...(camp
      ? {
          offers: {
            '@type': 'Offer',
            category: 'Paid',
            name: offer.name,
            price: String(offer.price),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${url}#enroll`,
            validFrom: camp.registrationOpens,
            validThrough: offer.endsAt ?? camp.registrationCloses,
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            name: `Future Builders ${camp.name}`,
            courseMode: 'online',
            startDate: camp.dates?.classesStart ?? camp.startMonth,
            endDate: camp.dates?.ends ?? camp.endMonth,
          },
        }
      : {}),
  };

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/future-builders', mainEntityId: `${url}#course` }),
          breadcrumbNode('/future-builders', topLevelCrumbs('/future-builders')),
          courseNode,
          faqNode('/future-builders', faqs)
        )}
      />
      <CtaTracker state={state} />

      {festive && <OfferBand offer={offer} listPrice={LIST_PRICE} nextPrice={STANDARD_OFFER.price} offsetMs={offsetMs} />}

      <PageHero
        tone="yellow"
        label="Future Builders · Summer camp · Grades 7–12"
        title={
          <>
            Build a <span className="t-accent">real</span> product this summer.
          </>
        }
        intro="Live online: code in Python, train an AI model, wire a device that senses and acts, then pitch it on Demo Day. No coding experience needed."
        actions={
          <div id="hero-cta" className="flex w-full flex-col gap-6">
            <ul className="flex flex-wrap gap-2" aria-label="The programme in brief">
              {chips.map((chip) => (
                <li key={chip} className="sketch-soft bg-[#fffdf8] px-3 py-1 text-[0.9rem] text-ink">
                  {chip}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#enroll" size="lg" arrow data-track={primary.track} data-track-at="hero">
                {primary.label}
              </ButtonLink>
              <ButtonLink href="#talk" variant="secondary" size="lg" data-track="talk" data-track-at="hero">
                Talk to us
              </ButtonLink>
            </div>
            <p className="t-small max-w-[56ch] text-graphite">
              {camp
                ? 'Full refund if Session 1 isn’t right for your child; the kit is theirs to keep. Secure payment by Razorpay.'
                : upcoming
                  ? `Registration opens ${upcoming.registrationOpensLabel}. Getting notified is free and commits you to nothing. Prefer to chat?`
                  : 'Joining the waitlist is free and commits you to nothing. Prefer to chat?'}{' '}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine"
                data-track="whatsapp"
                data-track-at="hero"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>
        }
        aside={<StatusCard state={state} camp={camp} upcoming={upcoming} offer={offer} listPrice={LIST_PRICE} />}
      />

      {/* 01 · Before → by Demo Day */}
      <section className="section" aria-labelledby="change-heading">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              id="change-heading"
              layout="stack"
              label="What changes"
              num="01"
              title={
                <>
                  From using technology to <span className="t-accent">building</span> it.
                </>
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <div aria-hidden="true" className="hidden grid-cols-2 gap-8 pb-3 sm:grid">
              <span className="hand text-[1.2rem] text-graphite">Before</span>
              <span className="hand text-[1.2rem] text-ultramarine">By Demo Day</span>
            </div>
            <ul className="border-t-2 border-ink">
              {CHANGES.map(([before, after]) => (
                <li key={before} className="grid gap-1.5 border-b border-ink/15 py-5 sm:grid-cols-2 sm:gap-8">
                  <p className="text-graphite">
                    <span className="hand mb-1 block text-[1.05rem] sm:sr-only">Before</span>
                    <span className="line-through decoration-vermilion decoration-2">{before}</span>
                  </p>
                  <p className="font-serif text-[1.375rem] leading-snug text-ink">
                    <span className="hand mb-1 block text-[1.05rem] text-ultramarine sm:sr-only">By Demo Day</span>
                    {after}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 · The programme, module by module */}
      <Curriculum timing={shown ? `The ${shown.name} runs in ${shown.months}. Exact dates and the timetable are shared after registration` : undefined} />

      {/* 03 · How it works: the kit, and the practical facts, once each */}
      <section className="section" aria-labelledby="how-heading">
        <div className="page">
          <SectionHeader
            id="how-heading"
            label="How it works"
            num="03"
            title={
              <>
                Live, personal and <span className="t-accent">hands-on.</span>
              </>
            }
          />
          <div className="grid-12 mt-12 items-start gap-y-12 md:mt-16">
            <div className="col-span-12 lg:col-span-6" data-reveal>
              <KitSketch />
            </div>
            <dl className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              {HOW.map(([title, line], i) => (
                <div key={title} className="border-b border-ink/15 py-5 pl-7 first:border-t-2 first:border-t-ink">
                  <dt className="relative font-serif text-[1.45rem] leading-tight">
                    <Dab ink={HOW_INK[i]} className="absolute -left-7 top-2.5" />
                    {title}
                  </dt>
                  <dd className="mt-1 text-graphite">{line}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 04 · Outcomes */}
      <section className="section bg-sheet-deep" aria-labelledby="outcomes-heading">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <Label num="04" className="mb-5">
              What they leave with
            </Label>
            <h2 id="outcomes-heading" className="t-headline max-w-[12ch]">
              Proof of work, not just{' '}
              <Marked mark="strike" ink="vermilion">
                marks.
              </Marked>
            </h2>
            <p className="t-lead mt-6 max-w-[40ch] text-graphite">Four things to show admissions panels, scholarships and internships.</p>
          </div>
          <ul className="col-span-12 grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {PORTFOLIO.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties} className={`leaf p-6 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}>
                <span className="t-num font-serif text-[2rem] italic leading-none text-vermilion-ink">{i + 1}</span>
                <h3 className="mt-3 font-serif text-[1.5rem] leading-tight">{p.title}</h3>
                <p className="mt-1 text-graphite">{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bring a friend: only while there is something to register for */}
      {camp && (
        <section className="section-tight">
          <div className="page">
            <div className="sketch grid-12 items-center gap-y-6 bg-ochre-soft p-6 md:p-12" data-reveal>
              <div className="col-span-12 lg:col-span-8">
                <p className="hand mb-3 text-[1.3rem] text-vermilion-ink">Bring a friend</p>
                <h2 className="t-headline">You both save ₹{FRIEND_DISCOUNT}.</h2>
                <p className="mt-4 max-w-[52ch] text-ink">
                  Teams are 3–4, so it’s better with a friend. Use code{' '}
                  <strong className="rounded bg-ink px-1.5 py-0.5 font-mono text-[15px] text-sheet">{FRIEND_CODE}</strong> at checkout with your friend’s name
                  {festive ? `: ${rupees(offer.price - FRIEND_DISCOUNT)} instead of ${price} during the ${offer.name} offer` : ''}. Your friend gets ₹{FRIEND_DISCOUNT} too.
                </p>
              </div>
              <div className="col-span-12 flex flex-col items-start gap-3 lg:col-span-4 lg:items-stretch">
                <ButtonLink href={`/future-builders?coupon=${FRIEND_CODE}#enroll`} size="lg" data-track="enrol" data-track-at="friend">
                  Register with {FRIEND_CODE}
                </ButtonLink>
                <a
                  href={whatsappShareLink(
                    `Future Builders by SOYL Academy: a live online summer camp for Grades 7–12 (software, AI, IoT, with a hardware kit), ${camp.months}. Use code ${FRIEND_CODE} and we both save ₹${FRIEND_DISCOUNT}: ${SITE_URL}/future-builders?coupon=${FRIEND_CODE}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine"
                  data-track="share"
                  data-track-at="friend"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05 · Fee and registration / notify / waitlist: exactly one state */}
      <section id="enroll" className="section scroll-mt-16" aria-labelledby="enroll-heading">
        <div className="page grid-12 gap-y-10 lg:gap-y-8">
          <div className="col-span-12 lg:col-span-5 lg:row-start-1">
            <Label num="05" className="mb-5">
              {camp ? 'Fee and registration' : upcoming ? 'Registration opens soon' : 'Waitlist'}
            </Label>
            <h2 id="enroll-heading" className="t-headline max-w-[14ch]">
              {camp ? `Join the ${camp.name}.` : upcoming ? 'Be first when registration opens.' : 'Be first for the next camp.'}
            </h2>
            <p className="mt-5 max-w-[42ch] text-graphite">
              {camp
                ? `${campTimingLine(camp)}. Registration is open until ${formatCohortDate(camp.registrationCloses, true)}.`
                : upcoming
                  ? `The ${upcoming.name} runs in ${upcoming.months}. Registration opens ${upcoming.registrationOpensLabel}.`
                  : 'Waitlisted families hear the next camp’s dates and fee first.'}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <span id="talk" aria-hidden="true" className="block scroll-mt-24" />
            {camp ? (
              <FutureBuildersForm
                closesOn={formatCohortDate(camp.registrationCloses, true)}
                campName={camp.name}
                sourceTag={camp.sourceTag}
                listPrice={LIST_PRICE}
                offer={{ slug: offer.slug, name: offer.name, price: offer.price, endsLabel: offer.endsLabel }}
              />
            ) : upcoming ? (
              <WaitlistForm notify={{ cohortName: upcoming.name, opensLabel: upcoming.registrationOpensLabel }} source={upcoming.sourceTag} state={state} />
            ) : (
              <WaitlistForm source="fb_waitlist" state={state} />
            )}
          </div>
          <div className="col-span-12 lg:col-span-5 lg:row-start-2">
            <PriceCard
              mode={camp ? 'open' : upcoming ? 'upcoming' : 'waitlist'}
              campName={camp?.name ?? upcoming?.name}
              opensLabel={upcoming?.registrationOpensLabel}
              offer={offer}
              listPrice={LIST_PRICE}
            />
          </div>
        </div>
      </section>

      {/* 06 · Questions */}
      <Faq faqs={faqs} heading="Questions parents ask" num="06" className="bg-sheet-deep" />

      {/* Close */}
      <section id="final-cta" className="relative isolate overflow-hidden" aria-labelledby="final-heading">
        <BrushArt
          art="wash"
          options={{
            blooms: [
              { x: 0.05, y: 0.15, r: 0.6, pigment: 'ochre', opacity: 70 },
              { x: 0.96, y: 0.88, r: 0.66, pigment: 'ultramarine', opacity: 42 },
              { x: 0.8, y: 0.08, r: 0.2, pigment: 'vermilion', opacity: 50 },
            ],
          }}
          seed={4}
          stepMs={90}
          className="absolute inset-0 -z-10"
        />
        <div className="page section grid-12 items-end gap-y-10">
          <h2 id="final-heading" className="t-display col-span-12 max-w-[13ch] lg:col-span-8" data-reveal>
            This summer, one{' '}
            <Marked mark="under" ink="vermilion" weight={5}>
              real product.
            </Marked>
          </h2>
          <div className="col-span-12 lg:col-span-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="t-lead max-w-[40ch] text-ink">
              {camp
                ? `Registration for the ${camp.name} is open until ${formatCohortDate(camp.registrationCloses, true)}.${festive ? ` The ${offer.name} price of ${price} ends ${offer.endsLabel}.` : ''}`
                : upcoming
                  ? `Registration for the ${upcoming.name} opens ${upcoming.registrationOpensLabel}. Leave your details and we’ll tell you the day it does.`
                  : 'Dates for the next camp are being set. Join the waitlist to hear them first, or talk to us now.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="#enroll" size="lg" arrow data-track={primary.track} data-track-at="final">
                {upcoming ? 'Notify me' : primary.label}
              </ButtonLink>
              <ButtonLink href="#talk" variant="secondary" size="lg" data-track="talk" data-track-at="final">
                Talk to us
              </ButtonLink>
            </div>
            <p className="mt-6 text-[1.15rem]">
              <Note ink="graphite" tilt={-2}>
                Parents are invited to Demo Day.
              </Note>
            </p>
          </div>
        </div>
      </section>

      <StickyCta
        line={
          camp
            ? festive
              ? `${price} (${rupees(LIST_PRICE)}) · ${offer.label ?? offer.name} ends ${offer.endsLabel}`
              : `${price} · ${camp.months} summer camp`
            : upcoming
              ? `Opens ${upcoming.registrationOpensLabel}`
              : 'Next camp: dates soon'
        }
        label={primary.short}
        track={primary.track}
        after="hero-cta"
        hideOver={['enroll', 'final-cta']}
      />
    </>
  );
}
