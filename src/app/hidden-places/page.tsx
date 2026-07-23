import React from 'react';
import PlaceCard from '@/components/cards/PlaceCard';
import { featuredHiddenPlaces } from '@/lib/data/mockData';
import { Mountain, Compass } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata = {
  title: 'Hidden Places in India 2026 — Unexplored Waterfalls, Valleys & Canyons | HiddenIndia.online',
  description: 'Discover 10,000+ unexplored hidden places in India including secret waterfalls, caves, grand canyons, living root bridges, and meteorite lakes.',
};

export default function HiddenPlacesDirectory() {
  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: 'Hidden Places', href: '/hidden-places' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Mountain className="w-4 h-4" />
            <span>Unexplored Gems Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            10,000+ <span className="gold-gradient-text">Hidden Places in India</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            भारत के गुप्त प्राकृतिक और ऐतिहासिक पर्यटन स्थल जो आम ट्रैवल ब्लॉग्स पर नहीं मिलते।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHiddenPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}
