import { describe, expect, it } from 'vitest';
import { segmentNarration } from '@/components/platform/ui/slides/segment';
import { applyNav, audioMime, audioUrl, isInteractiveTarget, keyAction, mountedWindow, startsInHorizontalScroller, swipeAction, wordAtTime } from '../lesson/player-logic';
import { defaultPart, lessonHref, parsePart } from '../lib/lesson-links';
import { lessonPartRewrite } from '../server/lesson-rewrite';

describe('player navigation', () => {
  it('maps keys', () => {
    expect(keyAction('ArrowRight')).toBe('next');
    expect(keyAction('ArrowLeft')).toBe('prev');
    expect(keyAction(' ')).toBe('next');
    expect(keyAction(' ', true)).toBe('prev');
    expect(keyAction('Home')).toBe('first');
    expect(keyAction('End')).toBe('last');
    expect(keyAction('a')).toBeNull();
  });
  it('clamps at both ends', () => {
    expect(applyNav('next', 4, 5)).toBe(4);
    expect(applyNav('prev', 0, 5)).toBe(0);
    expect(applyNav('last', 0, 5)).toBe(4);
    expect(applyNav(null, 2, 5)).toBe(2);
  });
  it('detects horizontal swipes only', () => {
    expect(swipeAction(-80, 10)).toBe('next');
    expect(swipeAction(80, -5)).toBe('prev');
    expect(swipeAction(-30, 0)).toBeNull();
    expect(swipeAction(-80, 70)).toBeNull();
  });
  it('mounts previous, current and the next two slides', () => {
    expect(mountedWindow(0, 20)).toEqual([0, 1, 2]);
    expect(mountedWindow(5, 20)).toEqual([4, 5, 6, 7]);
    expect(mountedWindow(19, 20)).toEqual([18, 19]);
  });
  it('ignores keys typed into controls and swipes on scrollers', () => {
    const input = document.createElement('input');
    const div = document.createElement('div');
    const btn = document.createElement('button');
    expect(isInteractiveTarget(input)).toBe(true);
    expect(isInteractiveTarget(btn)).toBe(true);
    expect(isInteractiveTarget(div)).toBe(false);
    const math = document.createElement('div');
    math.setAttribute('data-math', 'display');
    const inner = document.createElement('span');
    math.appendChild(inner);
    expect(startsInHorizontalScroller(inner)).toBe(true);
    expect(startsInHorizontalScroller(div)).toBe(false);
  });
});

describe('narration audio', () => {
  it('builds CDN URLs only for https bases and well-formed keys (WEB-1)', () => {
    expect(audioUrl('audio/cbse-10-science-ch01/deck-1/s01-ab12.ogg', 'https://cdn.soylai.com/public')).toBe('https://cdn.soylai.com/public/audio/cbse-10-science-ch01/deck-1/s01-ab12.ogg');
    expect(audioUrl('audio/x/y.ogg', 'https://cdn.soylai.com/')).toBe('https://cdn.soylai.com/audio/x/y.ogg');
    expect(audioUrl('audio/x/y.ogg', 'http://cdn.soylai.com')).toBeNull();
    expect(audioUrl('audio/../secret.ogg', 'https://cdn.soylai.com')).toBeNull();
    expect(audioUrl('https://evil.example/a.ogg', 'https://cdn.soylai.com')).toBeNull();
    expect(audioUrl('audio/x/y.ogg', '')).toBeNull();
    expect(audioUrl(null, 'https://cdn.soylai.com')).toBeNull();
  });
  it('picks the MIME type to test', () => {
    expect(audioMime('audio/a.ogg')).toBe('audio/ogg; codecs="opus"');
    expect(audioMime('audio/a.mp3')).toBe('audio/mpeg');
    expect(audioMime('audio/a.webm')).toMatch(/webm/);
  });
  it('maps audio time to the word being spoken, monotonically, Hindi too', () => {
    const s = segmentNarration('Plants make food. They use sunlight.');
    expect(wordAtTime(s, 0, 10)).toBe(0);
    expect(wordAtTime(s, 10, 10)).toBe(5);
    let last = -1;
    for (let t = 0; t <= 10; t += 0.5) {
      const w = wordAtTime(s, t, 10)!;
      expect(w).toBeGreaterThanOrEqual(last);
      last = w;
    }
    const hi = segmentNarration('पौधे भोजन बनाते हैं। वे धूप का उपयोग करते हैं।');
    expect(wordAtTime(hi, 9.9, 10)).toBe(9);
    expect(wordAtTime([], 1, 10)).toBeNull();
    expect(wordAtTime(s, 1, 0)).toBeNull();
  });
});

describe('lesson parts and ?part= rewrite (ADR-013)', () => {
  const parts = [{ part: 1 }, { part: 2 }];
  it('links the first part plainly and the others with ?part=', () => {
    expect(defaultPart(parts)).toBe(1);
    expect(defaultPart([{ part: 0 }])).toBe(0);
    expect(lessonHref('/learn/cbse/10/science/ch01', parts, 1)).toBe('/learn/cbse/10/science/ch01/lesson');
    expect(lessonHref('/learn/cbse/10/science/ch01', parts, 2)).toBe('/learn/cbse/10/science/ch01/lesson?part=2');
    expect(lessonHref('/learn/cbse/10/hindi-a/ch02', [{ part: 0 }], 0)).toBe('/learn/cbse/10/hindi-a/ch02/lesson');
  });
  it('parses only listed parts', () => {
    expect(parsePart('2', parts)).toBe(2);
    expect(parsePart('3', parts)).toBeNull();
    expect(parsePart('1e0', parts)).toBeNull();
    expect(parsePart(undefined, parts)).toBeNull();
  });
  it('rewrites only exact lesson URLs with one numeric part', () => {
    const q = (s: string) => new URLSearchParams(s);
    expect(lessonPartRewrite('/learn/cbse/10/science/ch01/lesson', q('part=2'))).toBe('/learn/cbse/10/science/ch01/lesson/2');
    expect(lessonPartRewrite('/learn/cisce/12/hindi/ch03/lesson', q('part=02'))).toBe('/learn/cisce/12/hindi/ch03/lesson/2');
    expect(lessonPartRewrite('/learn/cbse/10/science/ch01/lesson', q(''))).toBeNull();
    expect(lessonPartRewrite('/learn/cbse/10/science/ch01/lesson', q('part=../x'))).toBeNull();
    expect(lessonPartRewrite('/learn/cbse/10/science/ch01/lesson', q('part=1&part=2'))).toBeNull();
    expect(lessonPartRewrite('/learn/cbse/10/science/ch01/notes', q('part=2'))).toBeNull();
    expect(lessonPartRewrite('/about/lesson', q('part=2'))).toBeNull();
  });
});
