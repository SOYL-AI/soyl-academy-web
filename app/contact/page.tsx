import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { PageIntro } from '@/components/ink/PageIntro';
import { photo } from '@/content/credits';

/**
 * Contact, in Ink and wash (plan §3.3, phase 5): the quiet opener with the email address, then the form
 * (components/forms/ContactForm: fields, validation and action unchanged) with a real photograph beside it on wide
 * screens. Metadata and structured data are in ./layout.tsx.
 */
export default function ContactPage() {
  const notes = photo('notes-top');
  return (
    <>
      <PageIntro
        size="head"
        title="Talk to the SOYL team."
        lead={
          <>
            Questions about SOYL, partnerships or anything else. For a product walkthrough,{' '}
            <Link href="/book-a-demo" className="link">
              book a demo
            </Link>
            .
          </>
        }
        actions={
          <p className="text-graphite">
            Or email{' '}
            <a href="mailto:outreach@soyl.cloud" className="link">
              outreach@soyl.cloud
            </a>
          </p>
        }
        className="pb-8 md:pb-10"
      />

      <section aria-label="Contact form" className="pb-20 md:pb-28">
        <div className="page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <InkPhoto src={notes.src} alt={notes.alt} aspect="4 / 5" sizes="(min-width: 1320px) 400px, 31vw" />
          </div>
        </div>
      </section>
    </>
  );
}
