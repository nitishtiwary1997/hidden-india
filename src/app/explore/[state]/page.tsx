import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { featuredStates, sampleDistricts, samplePlaces } from '@/lib/data/mockData';
import { generateStateMetadata } from '@/lib/seo/metaGenerator';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schemaGenerator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLdScript from '@/components/common/JsonLdScript';
import WeatherWidget from '@/components/common/WeatherWidget';
import FaqAccordion from '@/components/common/FaqAccordion';
import PlaceCard from '@/components/cards/PlaceCard';
import { MapPin, Building2, Mountain, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);
  if (!stateData) return { title: 'State Not Found — HiddenIndia.online' };
  return generateStateMetadata(stateData);
}

export default async function StateDetailPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);

  if (!stateData) {
    notFound();
  }

  const districts = sampleDistricts[stateSlug] || [
    {
      id: `dst-${stateSlug}-1`,
      name: `${stateData.name} Central District`,
      slug: `${stateSlug}-central`,
      stateName: stateData.name,
      stateSlug: stateData.slug,
      description: `Explore the vibrant capital and heritage sites of ${stateData.name}.`,
      image: stateData.bannerImage,
      totalPlaces: 28,
    },
  ];

  const statePlaces = samplePlaces.filter(
    (p) => p.stateName.toLowerCase() === stateData.name.toLowerCase()
  );

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: stateData.name, href: `/explore/${stateData.slug}` },
  ];

  const faqs = [
    {
      question: `What is the best time to visit ${stateData.name}?`,
      answer: `The ideal time to visit ${stateData.name} is generally between October and March when the weather is pleasant for sightseeing and outdoor activities.`,
    },
    {
      question: `How many districts are there in ${stateData.name}?`,
      answer: `${stateData.name} has a total of ${stateData.totalDistricts} districts, each offering unique cultural heritage, local food, and hidden tourist attractions.`,
    },
    {
      question: `What are the top hidden places in ${stateData.name}?`,
      answer: `${stateData.name} features over ${stateData.totalHiddenPlaces}+ unexplored places including ancient forts, serene waterfalls, tribal heritage villages, and historic temples.`,
    },
  ];

  const jsonLd = [
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <JsonLdScript data={jsonLd} />

      {/* Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={stateData.bannerImage}
          alt={stateData.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 z-10">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs">
              {stateData.code}
            </span>
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Capital: {stateData.capital}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            {stateData.name} <span className="gold-gradient-text">Tourism & Hidden Places</span>
          </h1>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16 relative z-10">
        
        {/* State Intro & Weather Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>About {stateData.name}</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {stateData.description}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">Total Districts</span>
                <div className="text-xl font-bold text-white mt-1">{stateData.totalDistricts}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">Hidden Spots</span>
                <div className="text-xl font-bold text-amber-400 mt-1">{stateData.totalHiddenPlaces}+</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400">Capital City</span>
                <div className="text-xl font-bold text-white mt-1">{stateData.capital}</div>
              </div>
            </div>
          </div>

          <div>
            <WeatherWidget locationName={stateData.capital} />
          </div>

        </div>

        {/* District List Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Districts in {stateData.name}</span>
            </h2>
            <span className="text-xs text-slate-400">{districts.length} Districts Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((district) => (
              <Link
                key={district.id}
                href={`/explore/${stateData.slug}/${district.slug}`}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 p-[1px] shrink-0">
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {district.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{district.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>{district.totalPlaces} Attractions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Places Grid */}
        {statePlaces.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Mountain className="w-5 h-5 text-amber-400" />
                <span>Top Tourist Attractions in {stateData.name}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statePlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <FaqAccordion faqs={faqs} title={`Frequently Asked Questions about ${stateData.name}`} />

      </div>
    </div>
  );
}
