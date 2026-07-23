export type Role = 'USER' | 'EDITOR' | 'ADMIN';

export type PlaceType =
  | 'HIDDEN_PLACE'
  | 'TEMPLE'
  | 'WATERFALL'
  | 'HILL_STATION'
  | 'HISTORICAL'
  | 'FOOD_DESTINATION'
  | 'FESTIVAL_LOCATION'
  | 'WILDLIFE_SANCTUARY'
  | 'HERITAGE_SITE'
  | 'BEACH'
  | 'MUSEUM'
  | 'MARKET';

export type Difficulty = 'EASY' | 'MODERATE' | 'HARD' | 'CHALLENGING';
export type PriceRange = 'FREE' | 'BUDGET' | 'MODERATE' | 'LUXURY';

export interface LocationBreadcrumb {
  label: string;
  href: string;
}

export interface StateSummary {
  id: string;
  name: string;
  slug: string;
  code: string;
  capital: string;
  description: string;
  bannerImage: string;
  totalDistricts: number;
  totalHiddenPlaces: number;
}

export interface DistrictSummary {
  id: string;
  name: string;
  slug: string;
  stateName: string;
  stateSlug: string;
  description: string;
  image?: string;
  totalPlaces: number;
}

export interface PlaceCardProps {
  id: string;
  title: string;
  slug: string;
  type: PlaceType;
  shortDesc: string;
  coverImage: string;
  stateName: string;
  districtName: string;
  rating?: number;
  bestTimeToVisit?: string;
  travelBudget?: PriceRange;
  featured?: boolean;
}

export interface SeoMetadata {
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  jsonLdSchema?: Record<string, unknown>;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon?: string;
}
