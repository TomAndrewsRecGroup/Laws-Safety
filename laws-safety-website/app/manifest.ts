import { MetadataRoute } from 'next';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: `The health and safety record of ${PERSON_NAME}: disciplines, sectors and places across London and the South East.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a1426',
    theme_color: '#0a1426',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['business', 'safety'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'About Stephen', short_name: 'About', description: 'Who Stephen Laws is', url: '/about', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Expertise', short_name: 'Expertise', description: 'The disciplines Stephen has delivered', url: '/expertise', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Get in touch', short_name: 'Contact', description: 'Get in touch with Stephen', url: '/contact', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    ],
    lang: 'en-GB',
    dir: 'ltr',
  };
}
