'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { featuredStates } from '@/lib/data/mockData';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function InteractiveIndiaMap() {
  const [selectedState, setSelectedState] = useState(featuredStates[0]);

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
      
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-slate-800/80">
        <div>
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive State Navigator</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Explore India by Interactive Map
          </h2>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click Any State to Explore</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* State Selection Grid Buttons */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {featuredStates.map((state) => {
            const isSelected = selectedState.id === state.id;
            return (
              <button
                key={state.id}
                onClick={() => setSelectedState(state)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {state.code}
                  </span>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                </div>
                
                <div className="mt-3">
                  <div className={`text-sm font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-amber-400'
                  }`}>
                    {state.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {state.totalHiddenPlaces}+ Hidden Places
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* State Preview Card */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800/90 space-y-5 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              {selectedState.code} — {selectedState.name}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Capital: {selectedState.capital}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            {selectedState.name}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {selectedState.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400">Total Districts</span>
              <div className="text-lg font-bold text-white mt-0.5">{selectedState.totalDistricts}</div>
            </div>
            <div>
              <span className="text-slate-400">Hidden Spots</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">{selectedState.totalHiddenPlaces}+</div>
            </div>
          </div>

          <Link
            href={`/explore/${selectedState.slug}`}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Explore Complete {selectedState.name} Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
