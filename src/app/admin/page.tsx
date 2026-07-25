import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Mountain, 
  Landmark, 
  Users, 
  UtensilsCrossed,
  BookOpen,
  Waves,
  ShieldCheck, 
  Plus,
  Layers,
  ArrowRight
} from 'lucide-react';
import AdminGuard from '@/components/auth/AdminGuard';
import { getAdminCategoryStats } from '@/lib/db/getData';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Control Center — HiddenIndia.online',
};

export default async function AdminDashboardPage() {
  const categoryStats = await getAdminCategoryStats();

  const statCards = [
    { label: 'States & UTs', val: categoryStats.totalStates, icon: MapPin, color: 'text-amber-400', tab: 'STATES' },
    { label: 'Districts & Cities', val: categoryStats.totalDistricts, icon: Building2, color: 'text-cyan-400', tab: 'DISTRICTS' },
    { label: 'Hidden Places', val: categoryStats.totalPlaces, icon: Mountain, color: 'text-emerald-400', tab: 'HIDDEN_PLACE' },
    { label: 'Temples & Shrines', val: categoryStats.totalTemples, icon: Landmark, color: 'text-rose-400', tab: 'TEMPLE' },
    { label: 'Food & Cuisine', val: categoryStats.totalFoodSpots, icon: UtensilsCrossed, color: 'text-orange-400', tab: 'FOOD_DESTINATION' },
    { label: 'Waterfalls & Nature', val: categoryStats.totalWaterfalls, icon: Waves, color: 'text-blue-400', tab: 'NATURE' },
    { label: 'Travel Stories', val: categoryStats.totalStories, icon: BookOpen, color: 'text-indigo-400', tab: 'STORIES' },
    { label: 'Registered Users', val: categoryStats.totalUsers, icon: Users, color: 'text-purple-400', tab: 'USERS' },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
        <div className="hero-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Content Management System</span>
              </span>
              <h1 className="text-3xl font-extrabold text-white">
                Admin Control Center & Category Directory
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage states, districts, cities, hidden places, temples, food spots, stories, and users.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/admin/places/new"
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-amber-400 hover:to-orange-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Content</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Category Stats Grid */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Category Live Metrics & Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={idx}
                    href={`/admin/places?tab=${s.tab}`}
                    className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-all group"
                  >
                    <div>
                      <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{s.label}</span>
                      <div className="text-2xl font-extrabold text-white mt-1">{s.val}</div>
                    </div>
                    <div className={`p-3 rounded-xl bg-slate-900 ${s.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Category Management Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/places?tab=STATES"
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group relative overflow-hidden"
            >
              <MapPin className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
                <span>State & District Directory</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </h3>
              <p className="text-xs text-slate-400">View and manage all 28 States, 8 Union Territories, and 765+ districts.</p>
            </Link>

            <Link
              href="/admin/places?tab=ALL"
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group relative overflow-hidden"
            >
              <Mountain className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
                <span>Places, Temples & Cuisine</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </h3>
              <p className="text-xs text-slate-400">Filter, edit, and organize places by category, state, district, or city.</p>
            </Link>

            <Link
              href="/admin/places?tab=STORIES"
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group relative overflow-hidden"
            >
              <Users className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
                <span>Community Stories & Users</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </h3>
              <p className="text-xs text-slate-400">Manage traveler reviews, community stories, and registered users.</p>
            </Link>
          </div>

        </div>
      </div>
    </AdminGuard>
  );
}
