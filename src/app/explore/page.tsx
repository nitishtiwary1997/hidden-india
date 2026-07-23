import React from 'react';
import Link from 'next/link';
import StateCard from '@/components/cards/StateCard';
import { featuredStates } from '@/lib/data/mockData';
import { Compass, MapPin, Search, Sparkles } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>State & Union Territory Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Explore <span className="gold-gradient-text">28 States & 8 Union Territories</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            भारत के हर राज्य, उसकी राजधानी, कुल जिलों और अनसुलझे पर्यटन स्थलों की सूची। अपने पसंदीदा राज्य का चयन करें और एक्सप्लोर करें।
          </p>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStates.map((state) => (
            <StateCard key={state.id} state={state} />
          ))}
        </div>
      </div>
    </div>
  );
}
