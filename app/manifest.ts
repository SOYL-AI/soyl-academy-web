import type { MetadataRoute } from 'next';
import { LOGO_PATH, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Thinking is the work`,
    short_name: 'SOYL',
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    lang: 'en-IN',
    categories: ['education'],
    icons: [
      { src: LOGO_PATH, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
