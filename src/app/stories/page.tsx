"use client";

import React, { useState, useEffect } from "react";
import { MockDatabase, Story } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { BookOpen, Search, MapPin, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  
  // Immersive Modal Reader State
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    MockDatabase.init();
    setStories(MockDatabase.getStories());
  }, []);

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.districtName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || story.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ["All", "FOLKLORE", "HISTORY", "GHOST", "FACT"];

  return (
    <>
      <SEO
        title="Folklore, Haunted Legends, & Untold Stories of India"
        description="Immerse yourself in India's regional oral storytelling traditions. Explore ghost stories of Bhangarh, ancient kingdom folklore, and local tribal legends."
        canonicalUrl="https://hiddenindia.com/stories"
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-teal-500/10 dark:text-teal-400">
              <BookOpen className="w-3.5 h-3.5" /> Oral Traditions Archive
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              Whispers of the Soil
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore ancient legends, scary ghost tales, and heroic local histories passed down strictly across generations of Indian tribes.
            </p>
          </div>

          {/* Search and Types Selectors */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-full md:w-1/3 relative flex items-center bg-slate-50 dark:bg-slate-850 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories by keyword, city, type..."
                className="w-full bg-transparent focus:outline-none text-xs text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedType === t
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md"
                      : "bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {t === "All" ? "All Narratives" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid Layout */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveStory(story)}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-premium cursor-pointer transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-primary dark:text-teal-400 uppercase">
                      <span>{story.type}</span>
                      <span>By {story.author}</span>
                    </div>

                    <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-200 line-clamp-2 leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-4 leading-relaxed font-sans">
                      {story.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-3 border-t border-slate-50 dark:border-slate-850">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Origin: {story.districtName}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">No regional legends match your search terms.</p>
            </div>
          )}

        </div>
      </div>

      {/* IMMERSIVE STORY READER MODAL */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-2xl z-10 font-sans"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-between items-center text-[10px] font-bold text-teal-400 uppercase mb-3">
                <span>{activeStory.type} Legend</span>
                <span>By {activeStory.author}</span>
              </div>
              
              <h3 className="font-poppins font-bold text-2xl text-white mb-6 border-b border-slate-800 pb-4 pr-6">
                {activeStory.title}
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap space-y-4">
                {activeStory.content}
              </div>

              <div className="mt-8 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> Origin: {activeStory.districtName}
                </span>
                <button
                  onClick={() => setActiveStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-505 text-white font-semibold transition-colors"
                >
                  Finished Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
