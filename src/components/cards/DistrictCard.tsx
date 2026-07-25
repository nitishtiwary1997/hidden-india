'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DistrictSummary } from '@/types';
import { getDistrictImage } from '@/lib/data/allIndianDistricts';
import { Building2, ArrowRight, Mountain, MapPin } from 'lucide-react';

export default function DistrictCard({ district }: { district: DistrictSummary }) {
  const initialImage =
    district.image && !district.image.includes('photo-1599661046827')
      ? district.image
      : getDistrictImage(district.name);

  const [imgSrc, setImgSrc] = useState(initialImage);

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col h-full group relative border border-slate-800">
      
      {/* District Header Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <Image
          src={imgSrc}
          alt={district.name}
          fill
          onError={() => setImgSrc(getDistrictImage(district.name))}
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Parent State Tag */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[11px] font-extrabold border border-slate-800 flex items-center gap-1 shadow-lg">
          <MapPin className="w-3 h-3 text-cyan-400" />
          {district.stateName}
        </span>

        {/* District Name */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
            {district.name} District
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
          {district.description || `Explore tourist places, temples, waterfalls, and local heritage in ${district.name}.`}
        </p>

        {/* Places Counter */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <span>Indexed Attractions:</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold">
            {district.totalPlaces || 4} Places
          </span>
        </div>

        {/* Action Link */}
        <Link
          href={`/explore/${district.stateSlug}/${district.slug}`}
          className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>View {district.name} Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
