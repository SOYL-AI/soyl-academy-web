import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function FinalCta() {
  return (
    <section className="w-full bg-white section-padding-lg">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Portrait — narrow, tall, deliberately not a landscape card */}
          <ScrollReveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-lg">
                <Image
                  src="/images/student_thinking_portrait.jpg"
                  alt="A student pausing mid-thought over her notebook"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="hidden sm:flex absolute -bottom-8 right-0 lg:-right-12 items-end gap-2 pointer-events-none select-none rotate-[-4deg]">
                <svg
                  width="52"
                  height="34"
                  viewBox="0 0 60 40"
                  fill="none"
                  className="text-teacher-red shrink-0 mb-1"
                  aria-hidden="true"
                >
                  <path
                    d="M50 22 C 40 6, 20 6, 10 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 13 L 9 21 L 18 22"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-editorial italic text-[19px] leading-tight text-teacher-red max-w-[15ch]">
                  The future still needs people who can think.
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="text-eyebrow text-ink-light mb-7">SOYL Academy</p>
            <h2 className="text-headline text-ink mb-8 max-w-[14ch]">
              Build learning worth doing.
            </h2>
            <p className="text-lead text-ink-light mb-12 max-w-[42ch]">
              For educators, schools and students who believe an assignment
              should show more than whether it was submitted.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 bg-ink text-white text-[15px] font-medium rounded-sm transition-colors duration-300 hover:bg-cobalt"
              >
                Bring SOYL to your school
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 text-[15px] font-medium text-ink border-b border-transparent transition-colors duration-300 hover:border-ink self-start sm:self-auto"
              >
                Talk to us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
