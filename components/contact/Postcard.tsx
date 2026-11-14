import { Photo } from '@/components/media/Photo';
import { Dab } from '@/components/brush/marks';
import { images } from '@/content/images';
import { cn } from '@/lib/utils';

/**
 * "Or write to us" as a postcard (ADR-034): a photo on one half, the address in handwriting on the other, with a
 * stamp of the four SOYL pigments and a postmark. Works in server and client pages.
 */
export function Postcard({ email, className }: { email: string; className?: string }) {
  return (
    <div className={cn('lift relative grid grid-cols-[42%_1fr] bg-[#fffdf7] shadow-[0_26px_50px_-30px_rgba(31,28,25,0.55)]', className)}>
      <div className="relative overflow-hidden">
        <Photo image={images.schoolVerandah} aspect="aspect-auto h-full min-h-[220px]" reveal={false} sizes="(min-width: 1024px) 180px, 40vw" className="rounded-none" />
      </div>
      <div className="relative flex flex-col justify-end gap-3 p-4 pt-16 md:p-5 md:pt-20">
        {/* The stamp. */}
        <span aria-hidden="true" className="absolute right-3 top-3 grid h-14 w-12 grid-cols-2 place-items-center gap-0.5 border-2 border-dashed border-ink/25 bg-sheet p-1.5">
          <Dab ink="ultramarine" className="h-3.5 w-3.5" />
          <Dab ink="vermilion" className="h-3.5 w-3.5" />
          <Dab ink="ochre" className="h-3.5 w-3.5" />
          <Dab ink="sap" className="h-3.5 w-3.5" />
        </span>
        {/* The postmark. */}
        <span aria-hidden="true" className="hand absolute right-12 top-9 grid h-14 w-14 rotate-[-14deg] place-items-center rounded-full border border-vermilion/60 text-center text-[0.7rem] leading-tight text-vermilion-ink">
          SOYL
          <br />
          Bengaluru
        </span>
        <p className="hand text-[1.15rem] leading-none text-graphite">or write to us</p>
        <p className="border-b border-ink/20 pb-1">
          <a href={`mailto:${email}`} className="hand break-all text-[1.2rem] leading-tight text-ultramarine underline decoration-ultramarine/40 underline-offset-4 hover:decoration-ultramarine">
            {email}
          </a>
        </p>
        <p aria-hidden="true" className="h-0 border-b border-ink/20 pt-5" />
      </div>
    </div>
  );
}
