import React from 'react';
import Link from 'next/link';
import { getStatesData, getDistrictsData } from '@/lib/db/getData';
import DistrictDirectoryClient from './DistrictDirectoryClient';
import { Building2, Compass, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All 789+ Districts & Cities Directory of India — HiddenIndia.online',
  description: 'Browse complete list of official districts across all 28 States & 8 Union Territories in India. Explore local attractions, temples, and hidden spots.',
};

export default async function DistrictsPage() {
  const [states, districts] = await Promise.all([
    getStatesData(),
    getDistrictsData(),
  ]);

  return (
    <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 relative z-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Complete Official Indian District Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Explore All <span className="gold-gradient-text">{districts.length}+ Districts</span> in India
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            भारत के सभी 28 राज्यों और केंद्र शासित प्रदेशों के 789+ आधिकारिक जिलों की पूरी सूची। राज्य वार फ़िल्टर करें और हर जिले के प्रमुख पर्यटन स्थलों को एक्सप्लोर करें।
          </p>
        </div>

        {/* Interactive District Filtering & Grid Component */}
        <DistrictDirectoryClient states={states} districts={districts} />

      </div>
    </div>
  );
}
