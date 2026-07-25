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
  ShieldCheck,
  Building2,
  Waves,
  Heart,
  ChevronRight,
  Zap,
  Bot
} from 'lucide-react';

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'hidden' | 'temples' | 'food'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const filterPlaces = () => {
    if (activeTab === 'temples') return featuredTemples;
    if (activeTab === 'food') return featuredFoods;
    if (activeTab === 'hidden') return featuredHiddenPlaces;
    return [...featuredHiddenPlaces, ...featuredTemples, ...featuredFoods].slice(0, 8);
  };

  const currentPlaces = filterPlaces();

  return (
    <div className="relative min-h-screen pb-24 bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="aurora-glow-1 top-10 left-1/4" />
      <div className="aurora-glow-2 top-96 right-10" />

      {/* Hero Section with High-Resolution Backdrop Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-2xl badge-glow">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>AI-POWERED LOCAL DISCOVERY • 789+ DISTRICTS INDEXED</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] hero-title-shadow tracking-tight">
            Explore Incredible India&apos;s <br />
            <span className="gold-gradient-text italic font-serif">Unexplored Gems & Culture</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-medium opacity-90">
            Discover all 31 States & UTs, 789+ Districts, Ancient Sacred Temples, Hidden Waterfalls, Local Street Food & Cultural Trails with AI Trip Planning.
          </p>

          {/* Luxury Search Bar */}
          <div className="max-w-3xl mx-auto bg-slate-950/90 backdrop-blur-xl p-3 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 flex flex-col sm:flex-row items-center gap-3">
            
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
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-95 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI Search</span>
            </button>

          </div>

          {/* Popular Search Tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs pt-2">
            <span className="text-slate-400 font-semibold">Popular Destinations:</span>
            {['Rajasthan Forts', 'Gandikota Canyon', 'Kashi Vishwanath', 'Living Root Bridges', 'Alleppey Backwaters', 'Spiti Valley'].map((tag) => (
              <button
                key={tag}
                onClick={() => setIsSearchModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/80 backdrop-blur-md transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Floating Key Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="glass-panel p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-amber-500/20 shadow-2xl">
          <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="text-2xl sm:text-4xl font-extrabold text-white">31</div>
            <div className="text-xs text-amber-400 font-extrabold uppercase tracking-wider mt-1">States & Union Territories</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400">789+</div>
            <div className="text-xs text-slate-300 font-extrabold uppercase tracking-wider mt-1">Official Districts</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400">10,000+</div>
            <div className="text-xs text-slate-300 font-extrabold uppercase tracking-wider mt-1">Hidden Gems & Temples</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400">100% Free</div>
            <div className="text-xs text-emerald-300 font-extrabold uppercase tracking-wider mt-1">AI Travel Planner</div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-24 relative z-10">
        
        {/* Category Navigation Pills */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Explore Curated Collections</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Must-Visit Destinations in India
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Places
              </button>
              <button
                onClick={() => setActiveTab('hidden')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'hidden' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hidden Gems
              </button>
              <button
                onClick={() => setActiveTab('temples')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'temples' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sacred Temples
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'food' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Food Trails
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>

        {/* AI Itinerary Planner Featured Banner */}
        <section className="relative glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 overflow-hidden group">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase">
                <Bot className="w-4 h-4 text-amber-400" />
                <span>AI Travel Assistant</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Plan Your Dream Trip to Any District with <span className="gold-gradient-text">HiddenIndia AI</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Get custom day-by-day itineraries, recommended food spots, best travel routes, entry fees, and weather forecasts tailored for your travel budget.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/ai-planner"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-2xl shadow-amber-500/20 transform group-hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Generate Free AI Itinerary</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Top States Directory Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>State Directories</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Explore Popular Indian States
              </h2>
            </div>

            <Link
              href="/explore"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <span>View All 31 States & UTs (789+ Districts)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStates.slice(0, 8).map((state) => (
              <StateCard key={state.id} state={state} />
            ))}
          </div>
        </section>

        {/* Interactive India Map Discovery Component */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Interactive Map Discovery</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore India State-by-State
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Click on any state on the map below to discover its official districts, secret waterfalls, ancient temples, and local cuisine.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800">
            <InteractiveIndiaMap />
          </div>
        </section>

      </div>

      {/* Global Search Modal */}
      {isSearchModalOpen && (
        <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      )}

    </div>
  );
}
