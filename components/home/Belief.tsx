import { belief } from '@/content/home';
import { VideoLoop } from '@/components/media/VideoLoop';
import poster from '@/public/video/soyl-loop-poster.jpg';

/** The belief, set over a quiet classroom loop. */
export function Belief() {
  return (
    <section aria-label="What we believe" className="section-tight">
      <div className="page">
        <div className="on-dark frame frame-lg relative bg-ink text-white" data-reveal="image">
          <VideoLoop
            src="/video/soyl-loop.mp4"
            poster={poster}
            alt="A worksheet lying on a classroom desk"
            sizes="(min-width: 1320px) 1210px, 100vw"
            className="absolute inset-0"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25" />
          <div className="relative flex min-h-[34rem] flex-col justify-end p-6 sm:p-10 md:min-h-[40rem] md:p-14 lg:p-20">
            <p className="t-eyebrow mb-6 text-white/75">What we believe</p>
            <blockquote>
              <p className="t-headline max-w-[20ch]">{belief.first}</p>
              <p className="t-headline mt-3 max-w-[22ch] text-white/90">
                {belief.second.replace(/think\.$/, '')}
                <span className="t-accent text-highlighter">think.</span>
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
