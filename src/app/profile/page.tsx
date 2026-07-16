"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MockDatabase, Place, Journal } from "@/lib/mockDatabase";
import { useApp } from "@/context/AppContext";
import { SEO } from "@/components/SEO";
import { 
  User, Heart, CheckCircle2, BookOpen, Calendar, 
  MapPin, Plus, Trash2, ShieldAlert, Award, Star 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { user, bookmarks, visited, login, logout } = useApp();
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Place[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Place[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  
  // Journal Form States
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const [journalDate, setJournalDate] = useState("");
  const [journalImage, setJournalImage] = useState("");

  const refreshProfileData = () => {
    if (user) {
      const allPlaces = MockDatabase.getPlaces();
      const userBookmarks = MockDatabase.getBookmarks(user.id).map((b) => b.placeId);
      setBookmarkedPlaces(allPlaces.filter((p) => userBookmarks.includes(p.id)));

      const userVisited = MockDatabase.getVisited(user.id).map((v) => v.placeId);
      setVisitedPlaces(allPlaces.filter((p) => userVisited.includes(p.id)));

      const userJournals = MockDatabase.getJournals(user.id);
      setJournals(userJournals);
    }
  };

  useEffect(() => {
    MockDatabase.init();
    refreshProfileData();
  }, [user]);

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !journalTitle || !journalContent || !journalDate) return;

    const imgUrl = journalImage.trim() || "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80";

    MockDatabase.addJournal(user.id, journalTitle, journalContent, [imgUrl], journalDate);
    refreshProfileData();

    // Reset fields
    setJournalTitle("");
    setJournalContent("");
    setJournalDate("");
    setJournalImage("");
    setShowAddJournal(false);
  };

  const handleDeleteJournal = (id: string) => {
    MockDatabase.deleteJournal(id);
    refreshProfileData();
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-primary mb-4" />
        <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100 mb-2">Sign In Required</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Create a profile to unlock travel journals and wishlist collections.</p>
        <button
          onClick={() => login("traveler@hiddenindia.com", "Guest Traveler")}
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          Sign In Automatically
        </button>
      </div>
    );
  }

  // Gamified Badges calculation
  const badges = [];
  if (visitedPlaces.some((p) => p.category === "Waterfall")) {
    badges.push({ title: "Waterfall Hunter", desc: "Visited a secret plunge pool", color: "from-blue-400 to-indigo-500" });
  }
  if (visitedPlaces.some((p) => p.category === "Temple")) {
    badges.push({ title: "Monastery Mystic", desc: "Discovered an ancient shrine", color: "from-amber-400 to-orange-500" });
  }
  if (visitedPlaces.length >= 3) {
    badges.push({ title: "Offbeat Pioneer", desc: "Explored 3+ hidden gems", color: "from-teal-400 to-emerald-500" });
  }
  if (journals.length > 0) {
    badges.push({ title: "Folklore Scribe", desc: "Logged a travel journal entry", color: "from-purple-400 to-pink-500" });
  }

  return (
    <>
      <SEO
        title="Traveler Profile & Journal"
        description="Your offbeat India travel dashboard. View wishlisted places, track visited districts, and log personal travel logs."
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Profile Card Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-full border border-primary/20 object-cover shadow-md"
              />
              <div className="space-y-1">
                <h1 className="font-poppins font-extrabold text-2xl text-slate-800 dark:text-slate-100">
                  {user.name}
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500">{user.email} • Joined July 2026</p>
                <div className="flex gap-4 text-xs font-semibold text-slate-650 dark:text-slate-350 pt-1">
                  <span>Wishlist: <span className="text-primary">{bookmarkedPlaces.length}</span></span>
                  <span>Visited: <span className="text-teal-500">{visitedPlaces.length}</span></span>
                  <span>Journals: <span className="text-secondary">{journals.length}</span></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-xs font-semibold transition-colors"
            >
              Sign Out Account
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: WISHLIST & VISITED */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* GAMIFIED BADGES */}
              {badges.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Explorer Milestones
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {badges.map((b, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${b.color} text-white space-y-1 shadow-md`}
                      >
                        <h3 className="font-poppins font-bold text-sm">{b.title}</h3>
                        <p className="text-[10px] text-white/80">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BOOKMARKS LIST */}
              <div className="space-y-4">
                <h2 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Wishlist Collections
                </h2>
                
                {bookmarkedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bookmarkedPlaces.map((place) => (
                      <Link
                        key={place.id}
                        href={`/india/${place.stateSlug}/${place.districtSlug}/${place.slug}`}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 hover:border-primary/20 transition-all group"
                      >
                        <img
                          src={place.imageGallery[0]}
                          alt={place.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400 truncate">
                            {place.name}
                          </h4>
                          <p className="text-[9px] text-slate-400 truncate">{place.districtName}, {place.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                    Your offbeat wishlist is empty. Explore maps to bookmark secret waterfalls.
                  </div>
                )}
              </div>

              {/* VISITED HISTORY */}
              <div className="space-y-4">
                <h2 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" /> Visited Places Log
                </h2>
                
                {visitedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {visitedPlaces.map((place) => (
                      <Link
                        key={place.id}
                        href={`/india/${place.stateSlug}/${place.districtSlug}/${place.slug}`}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 hover:border-primary/20 transition-all group"
                      >
                        <img
                          src={place.imageGallery[0]}
                          alt={place.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400 truncate">
                            {place.name}
                          </h4>
                          <p className="text-[9px] text-slate-400 truncate">{place.districtName}, {place.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                    You haven't checked into any locations yet. Check off places you visit!
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: TRAVEL JOURNAL */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-secondary" /> Travel Journal
                </h2>
                
                <button
                  onClick={() => setShowAddJournal(!showAddJournal)}
                  className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary-hover text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Entry
                </button>
              </div>

              {/* Add Journal Form */}
              <AnimatePresence>
                {showAddJournal && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddJournal}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm space-y-3.5 overflow-hidden text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">Journal Title</label>
                      <input
                        type="text"
                        required
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                        placeholder="e.g. Crossing the Sohra root bridges"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">Visit Date</label>
                      <input
                        type="date"
                        required
                        value={journalDate}
                        onChange={(e) => setJournalDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">Photo URL (Optional)</label>
                      <input
                        type="url"
                        value={journalImage}
                        onChange={(e) => setJournalImage(e.target.value)}
                        placeholder="https://unsplash.com/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">Your Story</label>
                      <textarea
                        required
                        rows={4}
                        value={journalContent}
                        onChange={(e) => setJournalContent(e.target.value)}
                        placeholder="Describe the adventure, people met, and difficulties faced..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-secondary font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-secondary text-white font-bold shadow-sm"
                    >
                      Save Journal Entry
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Journal Entries List */}
              <div className="space-y-4">
                {journals.length > 0 ? (
                  journals.map((j) => (
                    <div 
                      key={j.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h4 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-100">{j.title}</h4>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-secondary" /> Visited on {new Date(j.visitedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteJournal(j.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Journal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed font-sans whitespace-pre-line">
                        {j.content}
                      </p>

                      {j.images[0] && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-850 shadow-inner">
                          <img
                            src={j.images[0]}
                            alt={j.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                    No journal logs created yet. Log your first secret path discovery details above!
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
