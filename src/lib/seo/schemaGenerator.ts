import { PlaceCardProps, LocationBreadcrumb } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hiddenindia.online';

export function generateBreadcrumbSchema(breadcrumbs: LocationBreadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${BASE_URL}${crumb.href}`,
    })),
  };
}

export function generateTouristAttractionSchema(place: PlaceCardProps & { latitude?: number; longitude?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: place.title,
    description: place.shortDesc,
    image: [place.coverImage],
    address: {
      '@type': 'PostalAddress',
      addressLocality: place.districtName,
      addressRegion: place.stateName,
      addressCountry: 'IN',
    },
    ...(place.latitude && place.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: place.latitude,
            longitude: place.longitude,
          },
        }
      : {}),
    ...(place.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: place.rating,
            reviewCount: 128,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HiddenIndia.online',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'India’s #1 AI-Powered Local Discovery & Travel Platform showcasing states, districts, villages, temples, and hidden spots.',
    sameAs: [
      'https://twitter.com/hiddenindiaonline',
      'https://facebook.com/hiddenindiaonline',
      'https://instagram.com/hiddenindiaonline',
    ],
  };
}
