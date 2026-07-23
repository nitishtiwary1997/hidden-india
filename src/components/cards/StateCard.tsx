import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StateSummary } from '@/types';
import { MapPin, ArrowRight, Compass, Mountain, Building2 } from 'lucide-react';

export default function StateCard({ state }: { state: StateSummary }) {
  return (
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-full group relative">
      
      {/* Banner Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={state.bannerImage}
          alt={state.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* State Code Badge */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-extrabold border border-slate-800 shadow-lg">
          {state.code}
        </span>

        {/* State Name & Capital overlay */}
        <div className="absolute bottom-3.5 left-4 right-4">
          <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
            <span>{state.name}</span>
          </h3>
          <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Capital: {state.capital}</span>
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
          {state.description}
        </p>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="font-extrabold text-white">{state.totalDistricts}</div>
              <div className="text-[10px] text-slate-400">Districts</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
            <Mountain className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-extrabold text-amber-400">{state.totalHiddenPlaces}+</div>
              <div className="text-[10px] text-slate-400">Hidden Spots</div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <Link
          href={`/explore/${state.slug}`}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 text-slate-200 hover:text-slate-950 border border-slate-800 hover:border-amber-500/50 text-xs font-extrabold flex items-center justify-center gap-2 transition-all duration-300 shadow-md group/btn"
        >
          <Compass className="w-4 h-4 text-amber-400 group-hover/btn:text-slate-950" />
          <span>Explore {state.name}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
