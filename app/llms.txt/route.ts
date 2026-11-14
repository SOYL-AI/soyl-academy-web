import { NextResponse } from 'next/server';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo/config';
import { PAGES } from '@/lib/seo/pages';

export async function GET() {
  const sortedPages = Object.values(PAGES).sort((a, b) => b.priority - a.priority);

  const content = `# ${SITE_NAME}
> ${SITE_DESCRIPTION}

## About
SOYL (Story of Your Life) Academy replaces assignments with missions. A mission is one continuous scene of at most 60 minutes, designed for about 45, in five stages: Spark, Build, Defend, Fix and Reflect. Every pupil takes their own path through a teacher-approved pool, and leaves with a Thoughtprint: what they can now do, where their thinking turned and what was fixed. Teachers set outcomes, approve every mission, and see their class grouped by misconception on a Monday screen; a seven-day recheck shows whether it stuck, and every Thoughtprint joins the pupil's Story.

## Pages
${sortedPages.map((page) => `- [${page.label}](${SITE_URL}${page.path}): ${page.description}`).join('\n')}

## Full Documentation
For the complete, concatenated knowledge base including our methodology and journal articles, see [llms-full.txt](${SITE_URL}/llms-full.txt).
`;

  return new NextResponse(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
