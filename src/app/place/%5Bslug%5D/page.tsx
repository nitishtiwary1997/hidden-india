import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { samplePlaces } from '@/lib/data/mockData';
import { generatePlaceMetadata } from '@/lib/seo/metaGenerator';
import { generateTouristAttractionSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/schemaGenerator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLdScript from '@/components/common/JsonLdScript';
import WeatherWidget from '@/components/common/WeatherWidget';
import MapWidget from '@/components/common/MapWidget';
import FaqAccordion from '@/components/common/FaqAccordion';
import { formatPlaceType, formatBudgetBadge } from '@/lib/utils';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  Compass, 
  Star, 
  ShieldAlert, 
  Navigation, 
  Heart, 
  Share2, 
  Building2,
  Landmark,
  Utensils
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const place = samplePlaces.find((p) => p.slug === slug);
  if (!place) return { title: 'Place Not Found — HiddenIndia.online' };
  return generatePlaceMetadata(place);
}

export default async function PlaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const place = samplePlaces.find((p) => p.slug === slug);

  if (!place) {
    notFound();
  }

  const budgetBadge = formatBudgetBadge(place.travelBudget);

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: place.stateName, href: `/explore/${place.stateName.toLowerCase().replace(/\s+/g, '-')}` },
    { label: place.districtName, href: `/explore/${place.stateName.toLowerCase().replace(/\s+/g, '-')}/${place.districtName.toLowerCase().replace(/\s+/g, '-')}` },
    { label: place.title, href: `/place/${place.slug}` },
  ];

  const jsonLd = [
    generateTouristAttractionSchema(place),
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(place.faqs),
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <JsonLdScript data={jsonLd} />

      {/* Hero Cover */}
      <div className="relative h-[480px] w-full overflow-hidden">
        <Image
          src={place.coverImage}
          alt={place.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 z-10">
          <Breadcrumbs items={breadcrumbs} />

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wide">
              {formatPlaceType(place.type)}
            </span>
            <span className={`px-3 py-1 rounded-lg font-semibold text-xs border ${budgetBadge.color}`}>
              {budgetBadge.label}
            </span>
            {place.rating && (
              <span className="px-3 py-1 rounded-lg bg-slate-900/80 text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {place.rating.toFixed(1)} / 5.0
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            {place.title}
          </h1>

          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{place.districtName}, {place.stateName}, India</span>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Full Description & Specifications */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Overview & History</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                {place.fullDesc}
              </p>
            </section>

            {/* Key Tourist Info Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {place.bestTimeToVisit && (
                <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">Best Time to Visit</h3>
                    <p className="text-sm font-bold text-white mt-1">{place.bestTimeToVisit}</p>
                  </div>
                </div>
              )}

              {place.openingTime && (
                <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">Timings</h3>
                    <p className="text-sm font-bold text-white mt-1">{place.openingTime} - {place.closingTime}</p>
                  </div>
                </div>
              )}

              {place.entryFee && (
                <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">Entry Fee</h3>
                    <p className="text-sm font-bold text-white mt-1">{place.entryFee}</p>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase">Location</h3>
                  <p className="text-sm font-bold text-white mt-1">{place.districtName}, {place.stateName}</p>
                </div>
              </div>
            </section>

            {/* Temple Specific Details */}
            {place.type === 'TEMPLE' && (
              <section className="p-6 rounded-2xl glass-panel border border-amber-500/30 space-y-4 bg-amber-500/5">
                <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                  <Landmark className="w-5 h-5" />
                  <span>Sacred Temple Information</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {place.templeDeity && (
                    <div>
                      <span className="text-xs text-slate-400">Presiding Deity</span>
                      <p className="font-bold text-white">{place.templeDeity}</p>
                    </div>
                  )}

                  {place.templeArchitecture && (
                    <div>
                      <span className="text-xs text-slate-400">Architectural Style</span>
                      <p className="font-bold text-white">{place.templeArchitecture}</p>
                    </div>
                  )}

                  {place.darshanTiming && (
                    <div>
                      <span className="text-xs text-slate-400">Darshan Timings</span>
                      <p className="font-bold text-white">{place.darshanTiming}</p>
                    </div>
                  )}

                  {place.dressCode && (
                    <div>
                      <span className="text-xs text-slate-400">Recommended Dress Code</span>
                      <p className="font-bold text-white">{place.dressCode}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* How to reach */}
            {place.howToReach && (
              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <span>How to Reach {place.title}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed glass-panel p-5 rounded-2xl border border-slate-800">
                  {place.howToReach}
                </p>
              </section>
            )}

            {/* Safety Advice */}
            {place.safetyInfo && (
              <section className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold uppercase text-amber-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Travel Safety Advice</span>
                </div>
                <p className="leading-relaxed">{place.safetyInfo}</p>
              </section>
            )}

            {/* FAQs */}
            {place.faqs && place.faqs.length > 0 && (
              <FaqAccordion faqs={place.faqs} title={`Frequently Asked Questions about ${place.title}`} />
            )}

          </div>

          {/* Right Sidebar Widgets */}
          <div className="space-y-6">
            <WeatherWidget locationName={place.districtName} />
            <MapWidget title={place.title} locationName={`${place.districtName}, ${place.stateName}`} mapUrl={place.googleMapUrl} />

            {/* Quick Action Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">Save or Share Destination</h4>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
