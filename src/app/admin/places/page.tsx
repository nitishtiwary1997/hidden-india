import React from 'react';
import Link from 'next/link';
import { Plus, Mountain, ArrowLeft } from 'lucide-react';
import { getPlacesData } from '@/lib/db/getData';
import PlaceCard from '@/components/cards/PlaceCard';

export const dynamic = 'force-dynamic';

export default async function AdminPlacesPage() {
  const places = await getPlacesData();

  return (
    <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Mountain className="w-4 h-4 text-amber-400" />
              <span>Admin Management</span>
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              Manage Places & Heritage
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>

            <Link
              href="/admin/places/new"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add New Place</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}
