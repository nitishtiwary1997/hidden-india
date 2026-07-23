import { Metadata } from 'next';
import { PlaceCardProps, StateSummary } from '@/types';

const SITE_NAME = 'HiddenIndia.online';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hiddenindia.online';

export function generateStateMetadata(state: StateSummary): Metadata {
  const title = `${state.name} Travel Guide 2026 — Places to Visit, Map & Weather | ${SITE_NAME}`;
  const description = `Explore ${state.name} (${state.capital}) across ${state.totalDistricts} districts. Discover ${state.totalHiddenPlaces}+ hidden places, ancient temples, local food, weather & travel guides.`;
  const url = `${BASE_URL}/explore/${state.slug}`;

  return {
    title,
    description,
    keywords: [
      `${state.name} tourism`,
      `places to visit in ${state.name}`,
      `hidden places in ${state.name}`,
      `${state.name} travel guide`,
      `${state.name} districts`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: state.bannerImage,
          width: 1200,
          height: 630,
          alt: `${state.name} Tourism Banner`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [state.bannerImage],
    },
  };
}

export function generatePlaceMetadata(place: PlaceCardProps & { fullDesc?: string }): Metadata {
  const typeLabel = place.type.replace('_', ' ').toLowerCase();
  const title = `${place.title}, ${place.districtName} (${place.stateName}) — Complete Guide, Timings & Route | ${SITE_NAME}`;
  const description = `${place.title} is a famous ${typeLabel} in ${place.districtName}, ${place.stateName}. ${place.shortDesc} Best time to visit: ${place.bestTimeToVisit || 'All Year'}.`;
  const url = `${BASE_URL}/place/${place.slug}`;

  return {
    title,
    description,
    keywords: [
      place.title,
      `${place.title} ${place.districtName}`,
      `${place.title} travel guide`,
      `hidden places in ${place.stateName}`,
      `${typeLabel} in ${place.stateName}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: place.coverImage,
          width: 1200,
          height: 630,
          alt: place.title,
        },
      ],
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [place.coverImage],
    },
  };
}
