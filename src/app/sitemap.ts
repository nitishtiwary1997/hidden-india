import { MetadataRoute } from 'next';
import { featuredStates, samplePlaces } from '@/lib/data/mockData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hiddenindia.online';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hidden-places`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/temples`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/food`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const stateRoutes: MetadataRoute.Sitemap = featuredStates.map((state) => ({
    url: `${BASE_URL}/explore/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const placeRoutes: MetadataRoute.Sitemap = samplePlaces.map((place) => ({
    url: `${BASE_URL}/place/${place.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...stateRoutes, ...placeRoutes];
}
