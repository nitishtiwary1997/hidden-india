"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { MockDatabase, Place } from "@/lib/mockDatabase";
import { IndiaMap } from "@/components/IndiaMap";
import { SEO } from "@/components/SEO";
import { aiSemanticSearch, searchWithGemini, AISearchResult } from "@/lib/aiSearch";
import { 
  Search, Sparkles, Compass, Heart, MapPin, Star, 
  SlidersHorizontal, ArrowRight, CheckSquare, Eye, HelpCircle, Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { user, bookmarks, toggleBookmark, refreshCounter } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isAiMode, setIsAiMode] = useState(true); // AI Search mode enabled by default
  const [aiSearchResults, setAiSearchResults] = useState<AISearchResult[]>([]);
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Retrieve key on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = localStorage.getItem("geminiApiKey") || "";
      setGeminiApiKey(key);
    }
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSeason, setSelectedSeason] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [trendingPlaces, setTrendingPlaces] = useState<Place[]>([]);
  
  // Custom travel checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Waterproof backpacks & rain jackets", checked: false },
    { id: 2, text: " Leeches salt spray (essential for northeast)", checked: false },
    { id: 3, text: "Local currency (remotes have no digital pay)", checked: false },
    { id: 4, text: "Power banks & offline maps downloaded", checked: false },
    { id: 5, text: "First-aid kit & basic insect repellents", checked: false },
  ]);

  // Load trending places and filter search results
  useEffect(() => {
    MockDatabase.init();
    setTrendingPlaces(MockDatabase.getPlaces().slice(0, 3));
  }, [refreshCounter]);

  // Live multi-faceted search & filter handler
  useEffect(() => {
    const runSearch = async () => {
      if (isAiMode && searchQuery.trim()) {
        setIsAiLoading(true);
        try {
          const aiRes = await searchWithGemini(searchQuery, geminiApiKey);
          setAiSearchResults(aiRes);
          setSearchResults(aiRes.map((r) => r.place));
        } catch (e) {
          console.error(e);
        } finally {
          setIsAiLoading(false);
        }
        return;
      } else {
        setAiSearchResults([]);
      }

      let results = MockDatabase.getPlaces();
      
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.districtName.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.stateSlug.toLowerCase().includes(q)
        );
      }

      if (selectedCategory !== "All") {
        results = results.filter((p) => p.category === selectedCategory);
      }

      if (selectedBudget !== "All") {
        // Find matching districts for the cost filter
        const districts = MockDatabase.getDistricts().filter((d) => d.travelCost === selectedBudget);
        const districtIds = districts.map((d) => d.id);
        results = results.filter((p) => districtIds.includes(p.districtId));
      }

      setSearchResults(results);
    };

    runSearch();
  }, [searchQuery, selectedCategory, selectedBudget, isAiMode, geminiApiKey, refreshCounter]);

  const toggleChecklist = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRandomPlace = () => {
    const all = MockDatabase.getPlaces();
    if (all.length > 0) {
      const randomPlace = all[Math.floor(Math.random() * all.length)];
      router.push(`/india/${randomPlace.stateSlug}/${randomPlace.districtSlug}/${randomPlace.slug}`);
    }
  };

  const categories = [
    "All", "Waterfall", "Village", "Temple", "Fort", "Nature Trail"
  ];

  return (
    <>
      <SEO 
        title="Home" 
        description="Discover India's hidden gems that most tourists never know about. Explore waterfalls, ancient temples, local villages, and folklore stories."
        canonicalUrl="https://hiddenindia.com/"
      />
      
      <div className="w-full bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors duration-300">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Parallax Hero Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-1000"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1920&q=80')` 
            }}
          />

          {/* Glowing visual ambient effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-sm font-semibold shadow-premium">
                <Sparkles className="w-4 h-4 text-secondary animate-bounce" />
                <span>Explore the Uncharted Territories</span>
              </div>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-md">
                Hidden <span className="text-teal-400">India</span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Discover the India Beyond Tourist Maps. Dive deep into hidden waterfalls, ancient secret temples, forgotten forts, and ancient tribal legends.
              </p>
            </motion.div>

            {/* Premium Multi-tier Search Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-2xl mx-auto p-2 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/15 shadow-2xl space-y-2"
            >
              <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl px-4 py-3 shadow-inner">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by state, district, waterfall, temple, village..."
                  className="w-full bg-transparent focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-base"
                />
                
                <button
                  onClick={() => setIsAiMode(!isAiMode)}
                  className={`p-2.5 rounded-xl transition-all ml-2 flex items-center gap-1.5 text-xs font-bold ${
                    isAiMode 
                      ? "bg-gradient-to-r from-teal-600 to-amber-550 text-white shadow-md shadow-teal-550/15" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  }`}
                  title="Toggle AI Semantic Search"
                  type="button"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAiMode ? "animate-pulse" : ""}`} />
                  <span className="hidden sm:inline">AI Mode</span>
                </button>

                {isAiMode && (
                  <button
                    onClick={() => setShowKeyModal(true)}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-primary dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
                    title="Configure Gemini API Key"
                    type="button"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ml-2 ${
                    showFilters 
                      ? "bg-primary text-white" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  }`}
                  title="Toggle Advanced Filters"
                  type="button"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Advanced Filter Drawers */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-white/5 rounded-xl border border-white/5 p-4 text-left grid grid-cols-2 gap-4 text-xs text-white"
                  >
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Travel Budget (District Level)
                      </label>
                      <select
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-850 border border-slate-700 focus:outline-none text-slate-300 dark:bg-slate-800"
                      >
                        <option value="All">All Budgets</option>
                        <option value="Budget">Budget Friendly</option>
                        <option value="Mid-range">Mid-range</option>
                        <option value="Premium">Premium Adventure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                        Quick Category Filters
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-850 border border-slate-700 focus:outline-none text-slate-300 dark:bg-slate-800"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#interactive-map"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
              >
                Explore India Map
              </a>
              <button
                onClick={handleRandomPlace}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium backdrop-blur-sm transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                Random Hidden Place
              </button>
            </motion.div>
          </div>

          {/* Bottom Wave Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F8FAFC] to-transparent dark:from-[#0B0F19]" />
        </section>

        {/* SEARCH RESULTS OR POPULAR CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {searchQuery || selectedCategory !== "All" || selectedBudget !== "All" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">
                  Search Results ({searchResults.length})
                </h2>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedBudget("All");
                  }}
                  className="text-sm font-semibold text-primary dark:text-teal-400"
                >
                  Clear All Filters
                </button>
              </div>

              {isAiLoading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold animate-pulse font-sans">
                    Gemini AI Model is analyzing query data...
                  </p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((place) => {
                    const aiMatch = aiSearchResults.find((r) => r.place.id === place.id);
                    return (
                      <PlaceCard 
                        key={place.id} 
                        place={place} 
                        isBookmarked={bookmarks.includes(place.id)} 
                        onToggleBookmark={() => toggleBookmark(place.id)}
                        aiScore={aiMatch?.score}
                        aiReason={aiMatch?.matchReason}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 font-sans">No secret gems matched your search filters. Try searching for &ldquo;waterfall&rdquo; or &ldquo;Meghalaya&rdquo;.</p>
                </div>
              )}
            </div>
          ) : (
            /* POPULAR CATEGORIES LIST */
            <div className="space-y-6">
              <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 text-center">
                Browse by Category
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === c
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 hover:border-primary/30"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* INTERACTIVE INDIA MAP SECTION */}
        <section id="interactive-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100">
              Interactive Explorer Map
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Browse districts geographically. Select a state on the map below, drill down to its districts, and unlock deep cultural write-ups, traditional food shops, and local ghost stories.
            </p>
          </div>

          <IndiaMap />
        </section>

        {/* TRENDING PLACES / EDITOR'S PICKS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-100/50 dark:bg-slate-900/20 rounded-[40px] my-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:bg-amber-500/5 dark:text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> High Popularity
              </div>
              <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100">
                Trending Offbeat Discoveries
              </h2>
            </div>
            <Link 
              href="#interactive-map" 
              className="flex items-center gap-1.5 text-sm font-bold text-primary dark:text-teal-400 group"
            >
              Explore Map Registry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPlaces.map((place) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                isBookmarked={bookmarks.includes(place.id)} 
                onToggleBookmark={() => toggleBookmark(place.id)}
              />
            ))}
          </div>
        </section>

        {/* TRAVEL CHECKLIST & AI SUGGESTIONS PROMO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Checklist Widget */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass shadow-premium flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-primary dark:text-teal-400" />
                  Offbeat Travel Checklist
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Venturing off the beaten path requires specialized preparation. Tick off items before embarking:
                </p>

                <div className="space-y-3 pt-2">
                  {checklist.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}} // Controlled by div click
                        className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                      />
                      <span className={`text-sm ${item.checked ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                Tip: Remotest regions have no mobile tower receptions. Download maps offline!
              </div>
            </div>

            {/* AI Assistant Callout */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
              {/* background vector ambient lights */}
              <div className="absolute -top-1/4 -right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Sparkles className="w-3.5 h-3.5" /> AI Engine Active
                </div>
                <h3 className="font-poppins font-bold text-2xl text-white">
                  Meet Your AI Travel Companion
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Need a tailored itinerary covering Meghalaya's secret lagoons or the perfect packing checklist for high-altitude Spiti Valley? Ask our AI budget and itinerary assistant.
                </p>

                <ul className="space-y-2 text-sm text-slate-300 pt-2 list-disc list-inside">
                  <li>Custom Offbeat Itinerary Builder</li>
                  <li>District Weather & Road Condition Diagnostics</li>
                  <li>Local Food & Street Eatery Suggestions</li>
                  <li>Real-time Travel Budget Estimator</li>
                </ul>
              </div>

              <div className="pt-6 relative z-10">
                <Link
                  href="/ai-companion"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/10 w-full sm:w-auto"
                >
                  Launch AI Companion
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Gemini API Key Configuration Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKeyModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 z-10"
            >
              <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 mb-2">
                Configure Gemini API Key
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans leading-relaxed">
                Unlock real Google Gemini AI model matching! Enter your free Gemini API key below (get it from Google AI Studio). The key is stored safely in your local browser storage.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs font-sans"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem("geminiApiKey");
                      setGeminiApiKey("");
                      setShowKeyModal(false);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    type="button"
                  >
                    Clear Key
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem("geminiApiKey", geminiApiKey);
                      setShowKeyModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20"
                    type="button"
                  >
                    Save Key
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable card for places
interface PlaceCardProps {
  place: Place;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  aiScore?: number;
  aiReason?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place, isBookmarked, onToggleBookmark, aiScore, aiReason 
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group rounded-3xl overflow-hidden glass shadow-premium border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-all flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={place.imageGallery[0] || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-primary dark:text-teal-400 shadow-sm z-10">
          {place.category}
        </div>

        {/* AI Score Badge */}
        {aiScore !== undefined && (
          <div className="absolute top-4 left-24 px-2.5 py-1 rounded-full text-[9px] font-bold bg-gradient-to-r from-teal-600 to-amber-550 text-white shadow-md shadow-teal-550/15 z-10 animate-pulse-slow">
            ✨ {aiScore}% AI Match
          </div>
        )}

        {/* Bookmark Trigger */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleBookmark();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all shadow-sm z-10"
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Place"}
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? "text-red-500 fill-red-500" : ""}`} />
        </button>
      </div>

      {/* Card Contents */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{place.districtName}, {place.stateSlug.charAt(0).toUpperCase() + place.stateSlug.slice(1)}</span>
          </div>

          {/* Place Title */}
          <h3 className="font-poppins font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">
            {place.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {place.description}
          </p>

          {/* AI Matching Reason */}
          {aiReason && (
            <div className="mt-2.5 p-2 rounded-xl bg-teal-500/5 border border-teal-500/10 text-[9.5px] text-teal-600 dark:text-teal-450 italic leading-relaxed">
              🤖 &ldquo;{aiReason}&rdquo;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-xs">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>4.8 (Local Reviews)</span>
          </div>

          <Link
            href={`/india/${place.stateSlug}/${place.districtSlug}/${place.slug}`}
            className="inline-flex items-center gap-1 font-bold text-primary dark:text-teal-400 hover:underline"
          >
            Explore Guide <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
