'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StateCard from '@/components/cards/StateCard';
import PlaceCard from '@/components/cards/PlaceCard';
import InteractiveIndiaMap from '@/components/home/InteractiveIndiaMap';
import SearchModal from '@/components/home/SearchModal';
import { 
  featuredStates, 
  featuredHiddenPlaces, 
  featuredTemples, 
  featuredFoods 
} from '@/lib/data/mockData';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Globe, 
  Mountain, 
  Landmark, 
  UtensilsCrossed, 
  ArrowRight,
  Compass,
  Star,
  Award,
  ShieldCheck
} from 'lucide-react';

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'hidden' | 'temples' | 'food'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const filteredHiddenPlaces = featuredHiddenPlaces.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.districtName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pb-24 bg-slate-950 text-slate-100">
      
      {/* Hero Section with High-Resolution Backdrop Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=2000&q=90"
            alt="Incredible India Heritage"
            fill
            priority
            className="object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-2xl badge-glow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Powered Local Travel & Discovery</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] hero-title-shadow tracking-tight">
            Discover Incredible India&apos;s <br />
            <span className="gold-gradient-text italic font-serif">Unexplored Wonders</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal opacity-90">
            Explore 28 States, 765 Districts, 10,000+ Hidden Gems, Ancient Temples, Waterfalls & Local Cuisines with AI Travel Planning.
          </p>

          {/* Luxury Search Bar Bar */}
          <div className="max-w-3xl mx-auto bg-slate-950/90 backdrop-blur-xl p-3 rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
            
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-3 px-4 text-slate-400 flex-1 w-full text-left py-2.5 group"
            >
              <Search className="w-5 h-5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-slate-300 text-sm font-medium">
                Search state, district, hidden place or temple...
              </span>
            </button>

            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI Search</span>
            </button>

          </div>

          {/* Quick Search Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs pt-2">
            <span className="text-slate-400 font-semibold">Popular:</span>
            {['Rajasthan', 'Gandikota Canyon', 'Kashi Vishwanath', 'Living Root Bridges', 'Dal Baati'].map((tag) => (
              <button
                key={tag}
                onClick={() => setIsSearchModalOpen(true)}
                className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/80 backdrop-blur-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Floating Key Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass-card p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">28 States</div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-1">& 8 Union Territories</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">765+</div>
            <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mt-1">Districts Indexed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">10,000+</div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1">Hidden Spots</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100% Free</div>
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mt-1">AI Travel Guides</div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-24 relative z-10">
        
        {/* Category Navigation Pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-lg ${
              activeTab === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/25 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('hidden')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-lg ${
              activeTab === 'hidden'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/25 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Mountain className="w-4 h-4" />
            <span>Hidden Places</span>
          </button>

          <button
            onClick={() => setActiveTab('temples')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-lg ${
              activeTab === 'temples'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/25 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Sacred Temples</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-lg ${
              activeTab === 'food'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/25 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Food & Heritage</span>
          </button>
        </div>

        {/* Interactive Map Component */}
        {activeTab === 'all' && (
          <InteractiveIndiaMap />
        )}

        {/* Section 1: Explore Indian States Grid */}
        {activeTab === 'all' && (
          <section className="space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>State & District Ecosystem</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                  Explore India By State
                </h2>
              </div>
              
              <Link
                href="/explore"
                className="text-xs font-extrabold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 group px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30"
              >
                <span>View All 28 States</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStates.map((state) => (
                <StateCard key={state.id} state={state} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Featured Hidden Places */}
        {(activeTab === 'all' || activeTab === 'hidden') && (
          <section className="space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-cyan-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Mountain className="w-4 h-4 text-cyan-400" />
                  <span>Unexplored Wonders</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                  Featured Hidden Places
                </h2>
              </div>

              <Link
                href="/hidden-places"
                className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30"
              >
                <span>Discover 10,000+ Hidden Places</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHiddenPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Sacred Temples */}
        {(activeTab === 'all' || activeTab === 'temples') && (
          <section className="space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>Spiritual Heritage</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                  Ancient Temples of India
                </h2>
              </div>

              <Link
                href="/temples"
                className="text-xs font-extrabold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 group px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30"
              >
                <span>Browse Temple Directory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTemples.map((temple) => (
                <PlaceCard key={temple.id} place={temple} />
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Authentic Regional Food */}
        {(activeTab === 'all' || activeTab === 'food') && (
          <section className="space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                  <span>Culinary Heritage</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                  Famous Regional Food & Dishes
                </h2>
              </div>

              <Link
                href="/food"
                className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 group px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30"
              >
                <span>Explore Food Trail</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFoods.map((food) => (
                <PlaceCard key={food.id} place={food} />
              ))}
            </div>
          </section>
        )}

        {/* AI Trip Planner Feature Banner */}
        <section className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/80 via-slate-950 to-slate-950 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-extrabold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Travel Assistant</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-serif">
              Plan Your Dream Trip Across India in 30 Seconds
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              आपकी बजट, दिन की संख्या और पसंद के अनुसार AI स्वचालित रूप से दिन-प्रतिदिन का ट्रेवल प्लान तैयार करता है।
            </p>
          </div>

          <Link
            href="/ai-planner"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-purple-500/30 transition-all flex items-center gap-2.5 shrink-0 transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Try AI Trip Planner Free</span>
          </Link>
        </section>

      </div>

      {/* AI Search & Voice Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  );
}
