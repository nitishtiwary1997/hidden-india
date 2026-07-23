'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  PlusCircle, 
  MapPin, 
  Sparkles, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft,
  Mountain,
  Landmark,
  UtensilsCrossed,
  DollarSign
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function NewPlaceAdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'HIDDEN_GEM',
    stateName: 'Bihar',
    districtName: 'Bodh Gaya',
    shortDesc: '',
    fullDesc: '',
    coverImage: '',
    travelBudget: 'BUDGET',
    bestTimeToVisit: 'October to March',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, title: value, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/admin/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg(`"${formData.title}" was added to database successfully!`);
        setFormData({
          title: '',
          slug: '',
          type: 'HIDDEN_GEM',
          stateName: 'Bihar',
          districtName: 'Bodh Gaya',
          shortDesc: '',
          fullDesc: '',
          coverImage: '',
          travelBudget: 'BUDGET',
          bestTimeToVisit: 'October to March',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'Add New Content', href: '/admin/places/new' },
  ];

  return (
    <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
      <div className="hero-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 relative z-10">
        
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Admin CMS Data Entry</span>
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              Add New Place, Temple or Food Item
            </h1>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          
          {/* Category Type */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">
              Content Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'HIDDEN_GEM', label: 'Hidden Place', icon: Mountain, color: 'border-cyan-500/40 text-cyan-300' },
                { id: 'TEMPLE', label: 'Sacred Temple', icon: Landmark, color: 'border-amber-500/40 text-amber-300' },
                { id: 'FOOD_DESTINATION', label: 'Regional Food', icon: UtensilsCrossed, color: 'border-emerald-500/40 text-emerald-300' },
              ].map((cat) => {
                const Icon = cat.icon;
                const active = formData.type === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: cat.id }))}
                    className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                      active
                        ? `bg-slate-900 ${cat.color} shadow-lg scale-105`
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                Title / Name *
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Mahabodhi Temple / Kakolat Waterfall"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                URL Slug (Auto-generated)
              </label>
              <input
                type="text"
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. mahabodhi-temple"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* State Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                State Name *
              </label>
              <input
                type="text"
                required
                name="stateName"
                value={formData.stateName}
                onChange={handleChange}
                placeholder="e.g. Bihar / Rajasthan"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* District Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                District Name *
              </label>
              <input
                type="text"
                required
                name="districtName"
                value={formData.districtName}
                onChange={handleChange}
                placeholder="e.g. Gaya / Nawada"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
              Image URL (Unsplash / Cloudinary / Image Link) *
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="url"
                required
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-1622308644420-a7d25e0b6b23?auto=format&fit=crop&w=1200&q=80"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
              Short Summary (1-2 sentences) *
            </label>
            <textarea
              required
              rows={2}
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="e.g. Sacred UNESCO World Heritage site where Lord Buddha attained enlightenment under the Bodhi tree."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
              Full Guide & History Description
            </label>
            <textarea
              rows={4}
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleChange}
              placeholder="Detailed history, route guidance, best time to visit, and cultural significance..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Budget & Best Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                Travel Budget Level
              </label>
              <select
                name="travelBudget"
                value={formData.travelBudget}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="FREE">Free Entry / ₹0</option>
                <option value="BUDGET">Budget Friendly (Under ₹500)</option>
                <option value="MODERATE">Moderate (₹500 - ₹2000)</option>
                <option value="LUXURY">Premium / Luxury</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
                Best Time To Visit
              </label>
              <input
                type="text"
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
                placeholder="e.g. October to March"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{isSubmitting ? 'Saving to Database...' : 'Publish to Live Database'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
