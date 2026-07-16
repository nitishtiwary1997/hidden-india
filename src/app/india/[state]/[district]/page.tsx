"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MockDatabase, District, Place, Food, Story } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { 
  ArrowLeft, MapPin, PhoneCall, ShieldAlert, Sparkles, 
  Map, Compass, Utensils, BookOpen, Route, CloudSun, DollarSign 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PageProps {
  params: {
    state: string;
    district: string;
  };
}

export default function DistrictPage({ params }: PageProps) {
  const [district, setDistrict] = useState<District | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Immersive story reader modal
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    MockDatabase.init();
    const dist = MockDatabase.getDistrict(params.state, params.district);
    if (dist) {
      setDistrict(dist);
      const distPlaces = MockDatabase.getPlacesByDistrict(dist.id);
      setPlaces(distPlaces);
      const distFoods = MockDatabase.getFoodsByDistrict(dist.id);
      setFoods(distFoods);
      const distStories = MockDatabase.getStoriesByDistrict(dist.id);
      setStories(distStories);
    }
    setLoading(false);
  }, [params.state, params.district]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!district) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100 mb-2">District Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Offbeat details for this district are currently in queue for review by our regional curators.</p>
        <Link href={`/india/${params.state}`} className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors">
          Return to State Page
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: district.stateName, item: `/india/${district.stateSlug}` },
    { name: district.name, item: `/india/${district.stateSlug}/${district.slug}` }
  ];

  return (
    <>
      <SEO
        title={`${district.name} Travel Guide | ${district.stateName}`}
        description={district.overview}
        canonicalUrl={`https://hiddenindia.com/india/${district.stateSlug}/${district.slug}`}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header breadcrumb & info */}
          <div className="space-y-4">
            <Link 
              href={`/india/${district.stateSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary dark:hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {district.stateName}
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight">
                  {district.name} District
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" /> {district.stateName}, India
                </p>
              </div>

              {/* Status badges */}
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400">
                  <CloudSun className="w-3.5 h-3.5" /> Weather: {district.weather}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:bg-amber-500/5 dark:text-amber-400">
                  <DollarSign className="w-3.5 h-3.5" /> Cost: {district.travelCost}
                </span>
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Overview, Places, Foods */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Overview */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-premium border border-slate-100 dark:border-slate-800 space-y-4">
                <h2 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" /> District Overview
                </h2>
                <p className="text-slate-655 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-line">
                  {district.overview}
                </p>
              </div>

              {/* HIDDEN PLACES LIST */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">
                    Secret Places in {district.name}
                  </h2>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full dark:bg-teal-500/15 dark:text-teal-400">
                    {places.length} Gems Discovered
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {places.map((place) => (
                    <motion.div
                      key={place.id}
                      whileHover={{ y: -5 }}
                      className="group rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between h-full"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                        <img
                          src={place.imageGallery[0]}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[10px] font-bold text-primary dark:text-teal-400">
                          {place.category}
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-poppins font-bold text-base text-slate-800 dark:text-slate-200 truncate">
                            {place.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {place.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4 border-t border-slate-50 dark:border-slate-800 pt-3 text-xs">
                          <span className="text-[10px] text-slate-400">Fee: {place.entryFee}</span>
                          <Link
                            href={`/india/${district.stateSlug}/${district.slug}/${place.slug}`}
                            className="font-bold text-primary dark:text-teal-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            Read Guide →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* LOCAL FOOD SPOTLIGHT */}
              {foods.length > 0 && (
                <div className="space-y-6">
                  <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Utensils className="w-6 h-6 text-primary" /> Local Cuisine & Delicacies
                  </h2>

                  <div className="space-y-6">
                    {foods.map((food) => (
                      <div
                        key={food.id}
                        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        <div className="md:col-span-1 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={food.images[0]}
                            alt={food.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-200">
                              {food.name}
                            </h3>
                            <span className="text-xs font-medium text-slate-400 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                              {food.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                            {food.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-50 dark:border-slate-855 animate-pulse-slow">
                            <div>
                              <span className="block font-semibold text-slate-400 mb-0.5">Recommended Shop:</span>
                              <p className="text-slate-700 dark:text-slate-300 font-medium">
                                {food.shops[0].name} ({food.shops[0].location})
                              </p>
                            </div>
                            <div>
                              <span className="block font-semibold text-slate-400 mb-0.5">Est. Price:</span>
                              <p className="text-slate-700 dark:text-slate-300 font-medium">
                                {food.shops[0].price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Culture, Stories, Transport, Emergency */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Culture Sidebar */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
                  District Traditions
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">Traditional Attire:</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{district.clothing}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">Folk Music:</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{district.music}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-400 uppercase tracking-wider mb-1">Key Festivals:</span>
                    <ul className="list-disc list-inside space-y-0.5 font-medium text-slate-700 dark:text-slate-300">
                      {district.localFestivals.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FOLKLORE STORIES SECTION */}
              {stories.length > 0 && (
                <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                  
                  <h3 className="font-poppins font-bold text-lg border-b border-slate-800 pb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-400" /> Folktales & Legends
                  </h3>

                  <div className="space-y-3">
                    {stories.map((story) => (
                      <div 
                        key={story.id}
                        onClick={() => setActiveStory(story)}
                        className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/30 transition-all cursor-pointer space-y-1.5"
                      >
                        <div className="flex justify-between items-center text-[10px] text-teal-400 font-semibold uppercase">
                          <span>{story.type}</span>
                          <span>by {story.author}</span>
                        </div>
                        <h4 className="font-semibold text-xs text-slate-200 line-clamp-1 leading-snug">
                          {story.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-400 line-clamp-2 font-sans">
                          {story.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TRANSPORT & LOGISTICS */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary" /> Travel Logistics
                </h3>
                <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-350">
                  <div>
                    <span className="block font-semibold text-slate-505 dark:text-slate-450 mb-0.5">By Bus Route:</span>
                    <p className="leading-relaxed">{district.transport.bus}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-505 dark:text-slate-450 mb-0.5">Nearest Railway:</span>
                    <p className="leading-relaxed">{district.transport.rail}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-505 dark:text-slate-450 mb-0.5">Local Transport:</span>
                    <p className="leading-relaxed">{district.transport.local}</p>
                  </div>
                </div>
              </div>

              {/* EMERGENCY CONTACTS */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <PhoneCall className="w-4.5 h-4.5 text-red-500" /> Emergency Helpline
                </h3>
                <div className="space-y-3 text-xs font-semibold text-slate-855 dark:text-slate-200">
                  <div className="flex justify-between p-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                    <span className="text-slate-400">Local Police:</span>
                    <span className="text-red-500">{district.emergencyContacts.police}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                    <span className="text-slate-400">Hospitals:</span>
                    <span className="text-red-500">{district.emergencyContacts.hospital}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                    <span className="text-slate-400">Tourist Help:</span>
                    <span className="text-primary dark:text-teal-400">{district.emergencyContacts.touristHelp}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* DETAILED FOLKLORE STORY MODAL */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="absolute inset-0 bg-slate-955/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center text-xs font-bold text-teal-400 uppercase mb-3">
                <span>{activeStory.type} Legend</span>
                <span>By {activeStory.author}</span>
              </div>
              
              <h3 className="font-poppins font-bold text-2xl text-white mb-6 border-b border-slate-800 pb-4">
                {activeStory.title}
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                {activeStory.content}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
