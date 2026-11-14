'use client';

import './story.css';
import { useEffect, useRef, useState } from 'react';
import { film } from '@/content/film';
import { cn } from '@/lib/utils';

/**
 * "Watch a mission" (ADR-034): a play button that opens the film in a modal <dialog>. The video is not downloaded
 * until the dialog opens, plays with controls and sound only on request, and stops when the dialog closes
 * (Escape, the close button or a click on the backdrop). `variant="poster"` shows the still with a play button.
 */
export function Film({ variant = 'button', className, label = 'Watch a mission' }: { variant?: 'button' | 'poster'; className?: string; label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      video.current?.pause();
    };
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, []);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
    requestAnimationFrame(() => void video.current?.play().catch(() => {}));
  };

  const meta = film.placeholder ? 'Preview' : film.duration;

  return (
    <>
      {variant === 'poster' ? (
        <button type="button" onClick={show} className={cn('film-trigger group relative block w-full overflow-hidden bg-ink text-left', className)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- a fixed 16:9 still; next/image adds nothing here */}
          <img src={film.poster} alt="" loading="lazy" decoding="async" className="aspect-video w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="film-play grid h-20 w-20 place-items-center rounded-full bg-sheet text-ink shadow-xl">
              <PlayIcon />
            </span>
          </span>
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-sheet/95 px-3 py-1.5 text-[14px] font-semibold text-ink">
            {label}
            <span className="font-normal text-graphite">· {meta}</span>
          </span>
        </button>
      ) : (
        <button type="button" onClick={show} className={cn('film-trigger group inline-flex h-12 items-center gap-3 pr-2 font-semibold text-ink', className)}>
          <span className="film-play grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-sheet">
            <PlayIcon />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span>{label}</span>
            <span className="hand text-[0.95rem] font-normal text-graphite">{meta}</span>
          </span>
        </button>
      )}

      <dialog
        ref={dialog}
        aria-label={film.title}
        className="film-dialog m-auto w-[min(100vw-2rem,1100px)] max-w-none overflow-visible bg-transparent p-0"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute -top-12 right-0 inline-flex h-10 items-center gap-2 rounded-full bg-sheet px-4 text-[15px] font-semibold text-ink"
          >
            Close
          </button>
          {open && (
            <video ref={video} src={film.src} poster={film.poster} controls playsInline preload="metadata" className="aspect-video w-full rounded-[6px] bg-ink">
              {film.captions && <track kind="captions" src={film.captions} srcLang="en" label="English" default />}
            </video>
          )}
          <p className="mt-3 text-[15px] text-sheet/85">{film.title}</p>
        </div>
      </dialog>
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 4.8 C 7 4, 7.9 3.6, 8.5 4 L 19.2 11 C 19.8 11.4, 19.8 12.6, 19.2 13 L 8.5 20 C 7.9 20.4, 7 20, 7 19.2 Z" fill="currentColor" />
    </svg>
  );
}
