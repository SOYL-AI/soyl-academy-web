import Image from 'next/image';
import Link from 'next/link';
import { audiences } from '@/content/story';
import { images, type EditorialImage, type ImageKey } from '@/content/images';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { InkPath, type Ink } from '@/components/brush/marks';

/** The same story, read four ways (ADR-034): school leaders, teachers, parents, pupils, as taped prints that tilt. */
const ROT = ['-rotate-[1.6deg]', 'rotate-[1.2deg]', '-rotate-[0.8deg]', 'rotate-[1.8deg]'];

export function FourWays() {
  return (
    <section className="bg-sheet-deep">
      <div className="page py-20 md:py-28">
        <p className="hand text-[1.3rem] text-vermilion-ink">Who it’s for</p>
        <Kinetic as="h2" text={audiences.heading} className="t-headline mt-2 max-w-[16ch]" />
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.items.map((a, i) => {
            const photo: EditorialImage = images[a.image as ImageKey];
            return (
              <li key={a.href}>
                <Tilt>
                  <Link href={a.href} className={`group block bg-white p-2.5 pb-5 shadow-[0_24px_50px_-30px_rgba(31,28,25,0.55)] ${ROT[i % 4]}`}>
                    <span className="relative block aspect-[4/5] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: photo.focus }}
                      />
                    </span>
                    <span className="mt-4 block px-1.5">
                      <span className="relative inline-block font-serif text-[1.6rem] leading-none">
                        {a.title}
                        <InkPath mark="under" ink={a.ink as Ink} weight={4} className="ink-hover absolute -bottom-1.5 left-0 h-2.5 w-full" />
                      </span>
                      <span className="mt-2 block text-[15px] leading-snug text-graphite">{a.line}</span>
                    </span>
                  </Link>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
