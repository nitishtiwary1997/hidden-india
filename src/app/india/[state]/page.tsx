"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MockDatabase, State, District, Place } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { 
  MapPin, Calendar, Compass, BookOpen, Camera, Film, 
  ChevronRight, ArrowLeft, ShieldAlert, Star 
} from "lucide-react";
import { motion } from "framer-motion";

interface PageProps {
  params: {
    state: string;
  };
}

export default function StatePage({ params }: PageProps) {
  const [stateData, setStateData] = useState<State | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockDatabase.init();
    const state = MockDatabase.getState(params.state);
    if (state) {
      setStateData(state);
      const stateDists = MockDatabase.getDistrictsByState(state.id);
      setDistricts(stateDists);
      
      // Get all hidden places for these districts
      const allPlaces = MockDatabase.getPlaces();
      const statePlaces = allPlaces.filter((p) => p.stateSlug === state.slug);
      setPlaces(statePlaces);
    }
    setLoading(false);
  }, [params.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stateData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100 mb-2">State Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">We haven't indexed hidden spots for this region yet. Help us update the database by joining as a local guide!</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: stateData.name, item: `/india/${stateData.slug}` }
  ];

  return (
    <>
      <SEO 
        title={`${stateData.name} Travel Guide`}
        description={stateData.overview}
        canonicalUrl={`https://hiddenindia.com/india/${stateData.slug}`}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19]">
        {/* PARALLAX HERO HERO BANNER */}
        <div className="relative h-[55vh] flex items-end justify-start overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2)), url('${stateData.imageGallery[0]}')` 
            }}
          />
          <div className="absolute inset-0 bg-teal-950/10 mix-blend-overlay" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Map
            </Link>
            <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl text-white tracking-tight drop-shadow-md">
              {stateData.name}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>{districts.length} Offbeat Districts Indexed</span>
              <span>•</span>
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Best Season: {stateData.bestTime.split("(")[0]}</span>
            </p>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Overviews, Culture, History */}
            <div className="lg:col-span-8 space-y-10">
              {/* Overview */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-premium border border-slate-100 dark:border-slate-800 space-y-4">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" /> Overview
                </h2>
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {stateData.overview}
                </p>
              </div>

              {/* Culture & Heritage */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-premium border border-slate-100 dark:border-slate-800 space-y-4">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Local Culture & Heritage
                </h2>
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed">
                  {stateData.culture}
                </p>
              </div>

              {/* History */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-premium border border-slate-100 dark:border-slate-800 space-y-4">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Brief History
                </h2>
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed">
                  {stateData.history}
                </p>
              </div>

              {/* DISTRICTS SELECTOR */}
              <div className="space-y-6">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100">
                  Explore Districts of {stateData.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {districts.map((dist) => (
                    <Link
                      key={dist.id}
                      href={`/india/${stateData.slug}/${dist.slug}`}
                      className="group p-5 rounded-2xl glass hover:bg-primary/5 hover:border-primary/30 transition-all shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">
                          {dist.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 mt-1">
                          {dist.overview}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* PHOTO GALLERY */}
              <div className="space-y-4">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" /> Visual Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stateData.imageGallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm group">
                      <img
                        src={img}
                        alt={`${stateData.name} Gallery ${idx}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Travel Quick Facts Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Season & Tips Info */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl" />
                
                <h3 className="font-poppins font-bold text-lg border-b border-slate-800 pb-3">
                  Travel Essentials
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Best Time to Visit
                    </span>
                    <p className="text-slate-200">{stateData.bestTime}</p>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Pro Travel Tips
                    </span>
                    <p className="text-slate-350 leading-relaxed text-xs">{stateData.travelTips}</p>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Primary Gateways
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-350 space-y-1">
                      {stateData.nearbyAttractions.map((att, idx) => (
                        <li key={idx}>{att}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Top Hidden Places in the State */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-premium border border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
                  Top Hidden Discoveries
                </h3>
                
                <div className="space-y-4">
                  {places.slice(0, 3).map((place) => (
                    <Link
                      key={place.id}
                      href={`/india/${place.stateSlug}/${place.districtSlug}/${place.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <img
                        src={place.imageGallery[0]}
                        alt={place.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-xs text-slate-850 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors truncate">
                          {place.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                          {place.category} in {place.districtName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
