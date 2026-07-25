'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StateSummary, DistrictSummary } from '@/types';
import DistrictCard from '@/components/cards/DistrictCard';
import { Search, MapPin, Building2, Filter, ArrowRight } from 'lucide-react';

interface DistrictDirectoryClientProps {
  states: StateSummary[];
  districts: DistrictSummary[];
}

export default function DistrictDirectoryClient({
  states,
  districts,
}: DistrictDirectoryClientProps) {
  const [selectedState, setSelectedState] = useState<string>('ALL_STATES');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sorted unique list of state names
  const stateNamesList = states.map((s) => s.name).sort();

  // Filtered districts based on state selection and live search
  const filteredDistricts = districts.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch =
      selectedState === 'ALL_STATES' ||
      d.stateName.toLowerCase() === selectedState.toLowerCase();
    const searchMatch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.stateName.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q);

    return stateMatch && searchMatch;
  });

  return (
    <div className="space-y-8">
      {/* Control Bar: Search & State Filter Dropdown */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search district name or state (e.g. Jaipur, Patna, Shimla, Varanasi)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* State Filter Dropdown */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 min-w-[200px]"
            >
              <option value="ALL_STATES">All 28 States & UTs (सभी राज्य)</option>
              {stateNamesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Filter Stats bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-amber-400">{filteredDistricts.length}</strong> of {districts.length} Districts</span>
            {selectedState !== 'ALL_STATES' && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                {selectedState}
              </span>
            )}
          </div>

          {(selectedState !== 'ALL_STATES' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedState('ALL_STATES');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline font-bold text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* District Cards Grid */}
      {filteredDistricts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((d) => (
            <DistrictCard key={d.id} district={d} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <Filter className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No district found</h3>
            <p className="text-xs text-slate-400 mt-1">
              No district matched &quot;{searchQuery}&quot; in {selectedState === 'ALL_STATES' ? 'India' : selectedState}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
