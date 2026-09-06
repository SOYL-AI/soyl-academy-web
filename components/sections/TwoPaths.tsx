import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function TwoPaths() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-12">
      {/* FOR SCHOOLS — the weighted half, full-bleed ink */}
      <div className="lg:col-span-7 bg-ink text-white flex flex-col justify-between">
        <ScrollReveal className="px-6 md:px-14 lg:px-16 pt-20 md:pt-28 pb-14">
          <div className="max-w-[34ch]">
            <p className="text-eyebrow text-highlighter mb-7">For Schools</p>
            <h2 className="text-headline mb-8">Change what homework means.</h2>
            <p className="text-lead text-white/70 mb-12">
              Bring outcome-based learning into classrooms without asking
              teachers to reinvent every lesson from scratch.
            </p>
            <Link
              href="/schools"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-white text-ink text-[15px] font-medium rounded-sm transition-colors duration-300 hover:bg-highlighter"
            >
              SOYL for Schools
              <svg
                width="13"
                height="13"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/students_presenting.jpg"
            alt="A student explaining her group's proposal at the whiteboard"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>

      {/* FOR STUDENTS — the lighter half, paper */}
      <div className="lg:col-span-5 bg-paper text-ink flex items-center">
        <ScrollReveal className="px-6 md:px-14 lg:px-14 py-20 md:py-28 w-full">
          <div className="max-w-[30ch]">
            <p className="text-eyebrow text-cobalt mb-7">For Students</p>
            <h2 className="text-headline mb-8">Learn beyond the answer.</h2>
            <p className="text-lead text-ink-light mb-12">
              Practice applying, explaining and challenging what you know — even
              if your school doesn&rsquo;t use SOYL yet.
            </p>
            <Link
              href="/students"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-ink text-white text-[15px] font-medium rounded-sm transition-colors duration-300 hover:bg-cobalt"
            >
              SOYL for Students
              <svg
                width="13"
                height="13"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
