'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlaceCardProps } from '@/types';
import PlaceCard from '@/components/cards/PlaceCard';
import { 
  Search, 
  Plus, 
  Mountain, 
  Landmark, 
  UtensilsCrossed, 
  Sparkles, 
  Layers,
  Building2,
  Filter
} from 'lucide-react';

export default function AdminPlacesManager({ places }: { places: PlaceCardProps[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: 'All Content', icon: Layers },
    { id: 'HIDDEN_GEM', label: 'Hidden Places', icon: Mountain },
    { id: 'TEMPLE', label: 'Temples & Shrines', icon: Landmark },
    { id: 'FOOD_DESTINATION', label: 'Food & Culture', icon: UtensilsCrossed },
    { id: 'HERITAGE_SITE', label: 'Historical Heritage', icon: Building2 },
  ];

  const filteredPlaces = places.filter((p) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'ALL' ||
      p.type === selectedCategory ||
      (selectedCategory === 'FOOD_DESTINATION' && (p.type as string) === 'FOOD_SPOT') ||
      (selectedCategory === 'HERITAGE_SITE' && (p.type as string) === 'HERITAGE');

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const searchMatch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.stateName.toLowerCase().includes(query) ||
      p.districtName.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === 'ALL') return places.length;
    return places.filter(
      (p) =>
        p.type === catId ||
        (catId === 'FOOD_DESTINATION' && (p.type as string) === 'FOOD_SPOT') ||
        (catId === 'HERITAGE_SITE' && (p.type as string) === 'HERITAGE')
    ).length;
  };

  return (
    <div className="space-y-8">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-panel p-4 rounded-3xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search places by name, state, or district..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Add New Content CTA */}
        <Link
          href="/admin/places/new"
          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add New Content</span>
        </Link>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 shadow-md'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Section */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <Filter className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No content found</h3>
            <p className="text-xs text-slate-400 mt-1">
              No items match your search &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-bold border border-slate-800"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
