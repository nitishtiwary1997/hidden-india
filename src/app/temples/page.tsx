import React from 'react';
import PlaceCard from '@/components/cards/PlaceCard';
import { featuredTemples } from '@/lib/data/mockData';
import { Landmark } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata = {
  title: 'Ancient Temples of India 2026 — Jyotirlinga, Char Dham & Heritage Shrines | HiddenIndia.online',
  description: 'Explore 25,000+ ancient Hindu temples, Jyotirlingas, Chola dynasty granite marvels, and mountain shrines across India with darshan timings & rules.',
};

export default function TemplesDirectory() {
  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: 'Sacred Temples', href: '/temples' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Spiritual Heritage Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Sacred & Ancient <span className="gold-gradient-text">Temples of India</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            भारत के 12 ज्योतिर्लिंग, चार धाम, चोल एवं द्रविड़ स्थापत्य कला के ऐतिहासिक मंदिर, दर्शन समय और ड्रेस कोड गाइड।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemples.map((temple) => (
            <PlaceCard key={temple.id} place={temple} />
          ))}
        </div>
      </div>
    </div>
  );
}
