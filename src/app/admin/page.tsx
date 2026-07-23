import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Mountain, 
  Landmark, 
  Users, 
  Eye, 
  FileText, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';

export const metadata = {
  title: 'Admin Control Center — HiddenIndia.online',
};

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total States', val: '28', icon: GlobeIcon, color: 'text-amber-400' },
    { label: 'Districts Indexed', val: '765', icon: Building2, color: 'text-cyan-400' },
    { label: 'Hidden Places', val: '10,450', icon: Mountain, color: 'text-emerald-400' },
    { label: 'Registered Users', val: '12,890', icon: Users, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise CMS</span>
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              Admin Control Center
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/places/new"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Place</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">{s.label}</span>
                  <div className="text-2xl font-extrabold text-white mt-1">{s.val}</div>
                </div>
                <div className={`p-3 rounded-xl bg-slate-900 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Admin Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/places"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group"
          >
            <Mountain className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-1">Manage Places & Temples</h3>
            <p className="text-xs text-slate-400">Edit content, images, timings, entry fees, and route guides.</p>
          </Link>

          <Link
            href="/admin/seo"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group"
          >
            <FileText className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-1">SEO & Metadata Center</h3>
            <p className="text-xs text-slate-400">Manage titles, meta descriptions, canonical URLs, and sitemaps.</p>
          </Link>

          <Link
            href="/admin/users"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors group"
          >
            <Users className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-1">User & Review Approvals</h3>
            <p className="text-xs text-slate-400">Moderate travel stories, photos, and reviews submitted by users.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

function GlobeIcon(props: any) {
  return <MapPin {...props} />;
}
