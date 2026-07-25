import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { featuredStates } from '@/lib/data/mockData';
import { getPlacesForDistrict } from '@/lib/data/allIndianDistricts';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schemaGenerator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLdScript from '@/components/common/JsonLdScript';
import WeatherWidget from '@/components/common/WeatherWidget';
import MapWidget from '@/components/common/MapWidget';
import FaqAccordion from '@/components/common/FaqAccordion';
import PlaceCard from '@/components/cards/PlaceCard';
import { MapPin, Building2, Mountain, Compass, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ state: string; district: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);
  const districtName = districtSlug
    ? districtSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'District';

  return {
    title: `${districtName} Travel Guide 2026 — Places to Visit, Temples & Weather (${stateData?.name || 'India'}) | HiddenIndia.online`,
    description: `Explore ${districtName} district in ${stateData?.name || 'India'}. Discover top tourist attractions, hidden waterfalls, sacred temples, food spots & local travel guide.`,
    alternates: {
      canonical: `https://hiddenindia.online/explore/${stateSlug || 'india'}/${districtSlug || 'all'}`,
    },
  };
}

export default async function DistrictDetailPage({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);

  const districtName = districtSlug
    ? districtSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'District';

  const stateName = stateData ? stateData.name : 'India';

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: stateName, href: `/explore/${stateSlug || 'india'}` },
    { label: districtName, href: `/explore/${stateSlug || 'india'}/${districtSlug || 'all'}` },
  ];

  // Guaranteed tourist places to visit for ANY district in India
  const districtPlaces = getPlacesForDistrict(districtSlug, stateName);

  const faqs = [
    {
      question: `What are the top places to visit in ${districtName}?`,
      answer: `${districtName} features historical temples, ancient heritage sites, scenic nature retreats, and local culinary food trails.`,
    },
    {
      question: `How to reach ${districtName}?`,
      answer: `${districtName} is well connected by state highways, local bus transport, and nearby railway junctions.`,
    },
    {
      question: `What is the best season to explore ${districtName}?`,
      answer: `The winter & monsoon months between October and March offer the best weather for sightseeing in ${districtName}.`,
    },
  ];

  const jsonLd = [
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="min-h-screen pb-20 relative bg-slate-950 text-slate-100">
      <JsonLdScript data={jsonLd} />

      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        
        <Breadcrumbs items={breadcrumbs} />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>District Tourist Destination</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {districtName} <span className="gold-gradient-text">Travel Guide & Attractions</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Welcome to {districtName}, {stateName}. Discover top attractions, hidden spots, sacred temples, local food trails, and travel guidance for your visit.
          </p>
        </div>

        {/* Places to Visit Grid & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <section className="space-y-6">
              <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-amber-400" />
                  <span>Places to Visit in {districtName} ({districtPlaces.length})</span>
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  All Spots Indexed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {districtPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>

          </div>

          {/* Widgets */}
          <div className="space-y-6">
            <WeatherWidget locationName={districtName} />
            <MapWidget title={`${districtName} District Map`} locationName={`${districtName}, ${stateName}`} />
          </div>
        </div>

        <FaqAccordion faqs={faqs} title={`Frequently Asked Questions about ${districtName}`} />

      </div>
    </div>
  );
}
