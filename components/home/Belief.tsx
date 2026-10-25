import { belief } from '@/content/home';

/** The belief, as a single static statement in the one cobalt block. */
export function Belief() {
  return (
    <section aria-label="What we believe" className="section-tight">
      <div className="page">
        <div className="bleed on-dark grid-12 bg-cobalt px-6 py-14 text-white md:px-12 md:py-20">
          <p className="t-label col-span-12 mb-8 flex items-center gap-2.5 self-start text-white md:col-span-3 md:mb-0 md:mt-4">
            <span aria-hidden="true" className="h-px w-5 bg-highlighter" />
            What we believe
          </p>
          <blockquote className="col-span-12 md:col-span-9">
            <p className="t-headline max-w-[22ch]">{belief.first}</p>
            <p className="t-headline mt-4 max-w-[24ch]">
              {belief.second.replace(/think\.$/, '')}
              <span className="underline decoration-highlighter decoration-[3px] underline-offset-[0.15em]">think.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
