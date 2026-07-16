"use client";

import React, { useState, useEffect } from "react";
import { MockDatabase, Food } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { Utensils, MapPin, Search, Tag, DollarSign, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All");

  useEffect(() => {
    MockDatabase.init();
    setFoods(MockDatabase.getFoods());
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.districtName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || food.type === selectedType;
    const matchesState = selectedState === "All" || food.stateSlug === selectedState;
    return matchesSearch && matchesType && matchesState;
  });

  return (
    <>
      <SEO
        title="Traditional Indian Foods & Local Eateries"
        description="Explore the hidden culinary treasures of India. Discover street foods, sweet dishes, local recipes, and recommended shops across every district."
        canonicalUrl="https://hiddenindia.com/food"
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:bg-amber-500/5 dark:text-amber-400">
              <Utensils className="w-3.5 h-3.5" /> Culinary Explorer
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              India's Hidden Recipes
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              A sensory journey through tribal kitchens, ancient street corners, and local sweet-makers across every district.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="md:col-span-2 relative flex items-center bg-slate-50 dark:bg-slate-850 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food by name, ingredients, district..."
                className="w-full bg-transparent focus:outline-none text-xs text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none dark:bg-slate-850 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300"
              >
                <option value="All">All Types</option>
                <option value="TRADITIONAL">Traditional Main Dishes</option>
                <option value="STREET">Street Foods</option>
                <option value="SWEET">Sweet Delights</option>
              </select>
            </div>

            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none dark:bg-slate-850 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300"
              >
                <option value="All">All States</option>
                <option value="meghalaya">Meghalaya</option>
                <option value="kerala">Kerala</option>
                <option value="himachal-pradesh">Himachal Pradesh</option>
                <option value="rajasthan">Rajasthan</option>
              </select>
            </div>
          </div>

          {/* Food Cards Grid */}
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFoods.map((food) => (
                <motion.div
                  key={food.id}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row"
                >
                  {/* Photo */}
                  <div className="sm:w-1/3 aspect-[4/3] sm:aspect-auto relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src={food.images[0]}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[9px] font-bold text-primary dark:text-teal-400">
                      {food.type}
                    </div>
                  </div>

                  {/* Contents */}
                  <div className="p-6 sm:w-2/3 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>{food.districtName}, {food.stateSlug}</span>
                      </div>
                      <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-200">
                        {food.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {food.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-50 dark:border-slate-850">
                      <div className="text-xs">
                        <span className="font-semibold text-slate-400 block mb-0.5">Local Secret Shop:</span>
                        <p className="text-slate-700 dark:text-slate-250 font-semibold text-xs">
                          {food.shops[0].name} — <span className="text-slate-400 font-medium">{food.shops[0].location}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-semibold text-slate-400">Price Range:</span>
                        <span className="font-bold text-primary dark:text-teal-400 flex items-center">
                          {food.priceRange} ({food.shops[0].price})
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">No culinary secrets match your active search filters.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
