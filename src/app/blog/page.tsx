"use client";

import React, { useState, useEffect } from "react";
import { MockDatabase, Blog } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { BookOpen, Calendar, User, Search, Clock, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  useEffect(() => {
    MockDatabase.init();
    setBlogs(MockDatabase.getBlogs());
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Guides", "Tips", "Photography", "Food", "History"];

  return (
    <>
      <SEO
        title="Offbeat Travel Blogs & Photography Guides"
        description="Read detailed guides about packing checklists for Spiti, historical investigations of Bhangarh, and rainy itineraries in Meghalaya."
        canonicalUrl="https://hiddenindia.com/blog"
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-teal-500/10 dark:text-teal-400">
              <BookOpen className="w-3.5 h-3.5" /> Curators Logbook
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              Travel Blogs & Guides
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Read professional guides covering safety tips, landscape photography secrets, and gear recommendations for exploring India's offbeat districts.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-full md:w-1/3 relative flex items-center bg-slate-50 dark:bg-slate-850 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs by title, keywords..."
                className="w-full bg-transparent focus:outline-none text-xs text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === c
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md"
                      : "bg-slate-550 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveBlog(blog)}
                  className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-premium transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 dark:bg-slate-900/95 text-primary dark:text-teal-400">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-205 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-850 text-[10px] text-slate-405 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-primary" /> {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
              No articles match your search parameters.
            </div>
          )}

        </div>
      </div>

      {/* IMMERSIVE BLOG ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBlog(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-2xl z-10 font-sans"
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-800">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-teal-400 uppercase mb-3">
                <span>{activeBlog.category} Guide</span>
                <span>•</span>
                <span>By {activeBlog.author}</span>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
              </div>
              
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-6 border-b border-slate-800 pb-4">
                {activeBlog.title}
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap space-y-4">
                {activeBlog.content}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveBlog(null)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-505 text-white font-semibold transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
