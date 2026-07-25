import React from 'react';
import Link from 'next/link';
import { Mountain, ArrowLeft } from 'lucide-react';
import { getPlacesData } from '@/lib/db/getData';
import AdminGuard from '@/components/auth/AdminGuard';
import AdminPlacesManager from '@/components/admin/AdminPlacesManager';

export const dynamic = 'force-dynamic';

export default async function AdminPlacesPage() {
  const places = await getPlacesData();

  return (
    <AdminGuard>
      <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
        <div className="hero-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Mountain className="w-4 h-4 text-amber-400" />
                <span>Admin CMS Control Center</span>
              </span>
              <h1 className="text-3xl font-extrabold text-white">
                Content Manager & Heritage Places
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Categorized Places Manager Component */}
          <AdminPlacesManager places={places} />
        </div>
      </div>
    </AdminGuard>
  );
}
