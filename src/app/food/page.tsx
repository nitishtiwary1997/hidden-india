import React from 'react';
import PlaceCard from '@/components/cards/PlaceCard';
import { featuredFoods } from '@/lib/data/mockData';
import { UtensilsCrossed } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata = {
  title: 'Local Food & Culinary Heritage of India 2026 — Regional Dishes & Famous Eateries | HiddenIndia.online',
  description: 'Explore traditional Indian food, Rajasthani Dal Baati, Hyderabadi Biryani, Bihari Litti Chokha, street food origins, recipes & best restaurants.',
};

export default function FoodDirectory() {
  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: 'Food & Heritage', href: '/food' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Culinary Heritage Trail</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Traditional Food & <span className="gold-gradient-text">Local Cuisines of India</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            भारत के हर राज्य का प्रामाणिक स्वाद, व्यंजनों का इतिहास, मुख्य सामग्री और सबसे प्रसिद्ध भोजनालय।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFoods.map((food) => (
            <PlaceCard key={food.id} place={food} />
          ))}
        </div>
      </div>
    </div>
  );
}
