import React from 'react';
import Link from 'next/link';
import PlaceCard from '@/components/cards/PlaceCard';
import { featuredHiddenPlaces } from '@/lib/data/mockData';
import { Heart, Compass, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata = {
  title: 'My Saved Wishlist — HiddenIndia.online',
  description: 'Your saved travel destinations, hidden places, and sacred temples across India.',
};

export default function WishlistPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Wishlist', href: '/wishlist' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Saved Travel List</span>
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              My Wishlist Destinations
            </h1>
          </div>
          <Link
            href="/explore"
            className="px-4 py-2 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 text-xs font-semibold flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Discover More Places</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHiddenPlaces.slice(0, 3).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}
