import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beaconstudentfund.com';

  // Core public routes
  const routes = [
    '',
    '/apply',
    '/rates',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/careers',
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/rates' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/apply' ? 0.9 : 0.8,
  }));
}
