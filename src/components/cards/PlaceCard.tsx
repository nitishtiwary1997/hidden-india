'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceCardProps } from '@/types';
import { formatPlaceType, formatBudgetBadge } from '@/lib/utils';
import { MapPin, Star, Calendar, ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function PlaceCard({ place }: { place: PlaceCardProps }) {
  const [isSaved, setIsSaved] = useState(false);
  const budgetInfo = formatBudgetBadge(place.travelBudget);

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-full group relative">
      
      {/* Cover Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={place.coverImage}
          alt={place.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Soft Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
        
        {/* Category Type Badge */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          {formatPlaceType(place.type)}
        </span>

        {/* Interactive Wishlist Heart Button */}
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 transform active:scale-75 ${
            isSaved 
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-110' 
              : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 border-slate-700/80'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Location & Rating Bar */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-200 font-medium flex items-center gap-1.5 backdrop-blur-md border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[150px]">{place.districtName}, {place.stateName}</span>
          </span>

          {place.rating && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-extrabold flex items-center gap-1 border border-amber-500/30 backdrop-blur-md shadow-md">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {place.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            {place.title}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {place.shortDesc}
          </p>
        </div>

        {/* Meta badges */}
        <div className="flex items-center justify-between gap-2 text-xs pt-3 border-t border-slate-800/80">
          {place.bestTimeToVisit ? (
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{place.bestTimeToVisit}</span>
            </span>
          ) : (
            <span className="text-slate-500">Year Round</span>
          )}

          <span className={`px-2.5 py-0.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border ${budgetInfo.color}`}>
            {budgetInfo.label}
          </span>
        </div>

        {/* View Details CTA */}
        <Link
          href={`/place/${place.slug}`}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 text-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-500/50 text-xs font-extrabold flex items-center justify-center gap-2 transition-all duration-300 shadow-md group/btn"
        >
          <span>View Complete Guide</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
