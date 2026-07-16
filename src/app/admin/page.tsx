"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MockDatabase, State, District, Place, Review } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { 
  LayoutDashboard, Plus, Check, Trash2, Eye, ShieldAlert, 
  MapPin, PlusCircle, Settings, Award, ShieldCheck, Database 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const { user, triggerRefresh } = useApp();
  
  // Tab states
  const [activeTab, setActiveTab] = useState<"dashboard" | "add-place" | "reviews" | "seo">("dashboard");
  
  // Database States for stats
  const [stats, setStats] = useState({
    statesCount: 0,
    districtsCount: 0,
    placesCount: 0,
    reviewsCount: 0,
  });
  
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Add Place Form States
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formState, setFormState] = useState("");
  const [formDistrict, setFormDistrict] = useState("");
  const [formCategory, setFormCategory] = useState("Waterfall");
  const [formDesc, setFormDesc] = useState("");
  const [formHistory, setFormHistory] = useState("");
  const [formEntry, setFormEntry] = useState("Free");
  const [formOpenTime, setFormOpenTime] = useState("9:00 AM - 5:00 PM");
  const [formBestTime, setFormBestTime] = useState("October to February");
  const [formTips, setFormTips] = useState("");
  const [formImage, setFormImage] = useState("");

  const [formSuccess, setFormSuccess] = useState(false);

  const loadAdminData = () => {
    MockDatabase.init();
    const allStates = MockDatabase.getStates();
    const allDists = MockDatabase.getDistricts();
    const allPlaces = MockDatabase.getPlaces();
    const allReviews = MockDatabase.getAllReviews();

    setStates(allStates);
    setDistricts(allDists);
    setStats({
      statesCount: allStates.length,
      districtsCount: allDists.length,
      placesCount: allPlaces.length,
      reviewsCount: allReviews.length
    });

    // In simulated admin mode, show all reviews for moderation
    setPendingReviews(allReviews);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formSlug || !formDistrict) return;

    const selectedDist = districts.find((d) => d.id === formDistrict);
    if (!selectedDist) return;

    const imgUrl = formImage.trim() || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80";

    MockDatabase.addPlace({
      districtId: selectedDist.id,
      districtName: selectedDist.name,
      stateSlug: selectedDist.stateSlug,
      districtSlug: selectedDist.slug,
      name: formName,
      slug: formSlug,
      category: formCategory,
      description: formDesc,
      history: formHistory,
      facts: ["Newly discovered location by community curator.", "Accessed via local footpaths."],
      howToReach: {
        air: "Nearest state capital airport",
        rail: "Nearest district junctions",
        road: `Drive to ${selectedDist.name} and request directions to local village guides.`
      },
      entryFee: formEntry,
      openingTime: formOpenTime,
      bestTime: formBestTime,
      travelTips: [formTips || "Hire local guide", "Wear waterproof hiking boots"],
      carryItems: ["Water", "Salt", "Torch"],
      safetyTips: ["Stay on marked trail", "Leave prior to twilight"],
      imageGallery: [imgUrl],
      videos: [],
      googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(formName)}`
    });

    // Refresh state
    loadAdminData();
    triggerRefresh();
    
    // Reset Form
    setFormName("");
    setFormSlug("");
    setFormDesc("");
    setFormHistory("");
    setFormEntry("Free");
    setFormOpenTime("9:00 AM - 5:00 PM");
    setFormBestTime("October to February");
    setFormTips("");
    setFormImage("");
    
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  const handleApproveReview = (id: string) => {
    MockDatabase.approveReview(id);
    loadAdminData();
    triggerRefresh();
  };

  const handleDeleteReview = (id: string) => {
    MockDatabase.deleteReview(id);
    loadAdminData();
    triggerRefresh();
  };

  // Restrict access if not logged in or not Admin (simulated)
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100 mb-2">Access Denied</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">You must sign in as an authorized admin to view analytics and manage community reviews.</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title="Admin Control Dashboard" />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <h1 className="font-poppins font-extrabold text-3xl text-slate-805 dark:text-slate-100 flex items-center gap-2.5">
                <LayoutDashboard className="w-8 h-8 text-primary" /> Admin Control panel
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Moderator: <span className="font-semibold text-primary dark:text-teal-400">{user.name}</span>
              </p>
            </div>
            
            {/* Tab navigation */}
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-155 dark:border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "dashboard" ? "bg-slate-905 text-white dark:bg-slate-100 dark:text-slate-950" : "text-slate-550 dark:text-slate-400"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("add-place")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "add-place" ? "bg-slate-905 text-white dark:bg-slate-100 dark:text-slate-950" : "text-slate-555 dark:text-slate-400"
                }`}
              >
                Add Spot
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "reviews" ? "bg-slate-905 text-white dark:bg-slate-100 dark:text-slate-950" : "text-slate-555 dark:text-slate-400"
                }`}
              >
                Reviews Queue
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "seo" ? "bg-slate-905 text-white dark:bg-slate-100 dark:text-slate-950" : "text-slate-555 dark:text-slate-400"
                }`}
              >
                SEO Settings
              </button>
            </div>
          </div>

          {/* TAB CONTENTS */}
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Dashboard Analytics */}
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 text-xs"
              >
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                    <span className="text-slate-400 font-medium">Mapped States</span>
                    <p className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">{stats.statesCount}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                    <span className="text-slate-400 font-medium">Districts Indexed</span>
                    <p className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">{stats.districtsCount}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                    <span className="text-slate-400 font-medium">Hidden Places</span>
                    <p className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">{stats.placesCount}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                    <span className="text-slate-400 font-medium">Community Reviews</span>
                    <p className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">{stats.reviewsCount}</p>
                  </div>
                </div>

                {/* System Diagnostics */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                  <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 flex items-center gap-2 border-b border-slate-50 dark:border-slate-850 pb-3">
                    <Database className="w-5 h-5 text-primary" /> Curators Registry Diagnostic
                  </h3>
                  
                  <div className="space-y-3 leading-relaxed text-slate-600 dark:text-slate-450">
                    <p>Database engine adapter status: <span className="text-emerald-500 font-bold">ACTIVE (Simulated Postgres/Prisma Client via LocalStorage)</span></p>
                    <p>Indexed districts coverage ratio: <span className="font-semibold text-slate-800 dark:text-slate-200">100% of targeted offbeat state matrices (Meghalaya, Kerala, Himachal, Rajasthan)</span></p>
                    <p>Server Cache Sync status: <span className="font-semibold text-slate-800 dark:text-slate-200">Synchronous. Automatically seeding core data tables on client initialization.</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Add Place CRUD */}
            {activeTab === "add-place" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                <form 
                  onSubmit={handleAddPlace}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4 text-xs"
                >
                  <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-50 dark:border-slate-850 pb-3 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-primary" /> Mapped Secret Place
                  </h3>

                  {formSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-pulse">
                      ✓ Place registered successfully! It is now live on states, districts, and search listings.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-450 mb-1.5">Place Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => {
                          setFormName(e.target.value);
                          setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                        }}
                        placeholder="e.g. Secret Blue Lagoon"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-455 mb-1.5">URL Slug (Auto Generated)</label>
                      <input
                        type="text"
                        required
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="secret-blue-lagoon"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-455 mb-1.5">District Association</label>
                      <select
                        required
                        value={formDistrict}
                        onChange={(e) => setFormDistrict(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>{d.name} ({d.stateName})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-455 mb-1.5">Spot Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-750 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="Waterfall">Waterfall</option>
                        <option value="Temple">Ancient Temple</option>
                        <option value="Village">Secret Village</option>
                        <option value="Fort">Forgotten Fort</option>
                        <option value="Nature Trail">Nature Trail</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-455 mb-1.5">Entry Ticket Fee</label>
                      <input
                        type="text"
                        value={formEntry}
                        onChange={(e) => setFormEntry(e.target.value)}
                        placeholder="e.g. ₹50 or Free"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-455 mb-1.5">Image URL</label>
                      <input
                        type="url"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-455 mb-1.5">Description Summary</label>
                    <textarea
                      required
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Detailed overview about what makes this place special and offbeat..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-805 dark:text-slate-100 focus:outline-none focus:border-primary font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-455 mb-1.5">History & Legends</label>
                    <textarea
                      required
                      rows={3}
                      value={formHistory}
                      onChange={(e) => setFormHistory(e.target.value)}
                      placeholder="Ancient folklore stories or historic references associated with the spot..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-805 dark:text-slate-100 focus:outline-none focus:border-primary font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-md shadow-primary/20"
                  >
                    Publish Gem to Site
                  </button>
                </form>
              </motion.div>
            )}

            {/* Tab 3: Reviews Queue */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100">
                  Reviews Moderation Queue
                </h3>

                {pendingReviews.length > 0 ? (
                  <div className="space-y-4 text-xs font-sans">
                    {pendingReviews.map((rev) => (
                      <div 
                        key={rev.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 dark:text-slate-105">{rev.userName}</span>
                            <span className="text-[10px] text-slate-400">• for {rev.placeName}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 pr-4">{rev.content}</p>
                          <div className="flex gap-1 items-center text-amber-500 text-[10px] pt-1">
                            <span>Rating: {rev.rating} ★</span>
                            <span>•</span>
                            <span className={rev.isApproved ? "text-emerald-500 font-bold" : "text-amber-500"}>
                              {rev.isApproved ? "Approved & Live" : "Pending Approval"}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {!rev.isApproved && (
                            <button
                              onClick={() => handleApproveReview(rev.id)}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors"
                              title="Approve Review"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-650 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
                    All reviews processed. Moderation queue clear!
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 4: SEO Configuration Settings */}
            {activeTab === "seo" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto"
              >
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-6 text-xs leading-relaxed">
                  <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-50 dark:border-slate-850 pb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" /> XML Sitemaps & robots.txt Configurator
                  </h3>

                  <div className="space-y-4 text-slate-600 dark:text-slate-400">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 font-mono text-[10px]">
                      <p className="font-bold text-primary dark:text-teal-400 mb-1"># robots.txt configuration</p>
                      <p>User-agent: *</p>
                      <p>Allow: /</p>
                      <p>Disallow: /admin</p>
                      <p className="mt-2">Sitemap: https://hiddenindia.com/sitemap.xml</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300">Schema.org JSON-LD Injectors</h4>
                      <p>The system automatically attaches standard JSON-LD structures to all dynamic endpoints, including breadcrumbs, FAQ panels, and TouristAttraction nodes for search indexing engines.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300">Lazy Loading & Image Optimization</h4>
                      <p>Next.js Image components use built-in lazy loading. All cards use standardized size attributes to prevent layout shifts, ensuring maximum Core Web Vitals marks.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
