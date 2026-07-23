import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { featuredStates, sampleDistricts, samplePlaces } from '@/lib/data/mockData';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schemaGenerator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLdScript from '@/components/common/JsonLdScript';
import WeatherWidget from '@/components/common/WeatherWidget';
import MapWidget from '@/components/common/MapWidget';
import FaqAccordion from '@/components/common/FaqAccordion';
import PlaceCard from '@/components/cards/PlaceCard';
import { MapPin, Building2, Mountain, Compass, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ state: string; district: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);
  const districtName = districtSlug ? (districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1)) : 'District';

  return {
    title: `${districtName} Travel Guide 2026 — Top Places, Temples & Weather (${stateData?.name || 'India'}) | HiddenIndia.online`,
    description: `Explore ${districtName} district in ${stateData?.name || 'India'}. Discover top tourist attractions, hidden waterfalls, temples, street food & travel guide.`,
    alternates: {
      canonical: `https://hiddenindia.online/explore/${stateSlug || 'india'}/${districtSlug || 'all'}`,
    },
  };
}

export default async function DistrictDetailPage({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const stateData = featuredStates.find((s) => s.slug === stateSlug);

  const districtName = districtSlug ? (districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1)) : 'District';
  const stateName = stateData ? stateData.name : 'India';

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: stateName, href: `/explore/${stateSlug || 'india'}` },
    { label: districtName, href: `/explore/${stateSlug || 'india'}/${districtSlug || 'all'}` },
  ];

  const districtPlaces = samplePlaces.filter(
    (p) => (districtSlug && p.districtName.toLowerCase() === districtSlug.toLowerCase()) || p.stateName.toLowerCase() === stateName.toLowerCase()
  );

  const faqs = [
    {
      question: `What are the top attractions in ${districtName}?`,
      answer: `${districtName} features historical forts, ancient temples, local markets, and hidden scenic spots.`,
    },
    {
      question: `How to reach ${districtName}?`,
      answer: `${districtName} is well connected by state highway buses and train services.`,
    },
  ];

  const jsonLd = [
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <JsonLdScript data={jsonLd} />

      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        
        <Breadcrumbs items={breadcrumbs} />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>District Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {districtName} <span className="gold-gradient-text">District Travel Guide</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Welcome to {districtName}, {stateName}. Discover top attractions, hidden spots, sacred temples, local food trails, and travel guidance.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <section className="space-y-6">
              <div className="border-b border-slate-800/80 pb-3">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-amber-400" />
                  <span>Places to Visit in {districtName}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {districtPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6">
            <WeatherWidget locationName={districtName} />
            <MapWidget title={`${districtName} District Map`} locationName={`${districtName}, ${stateName}`} />
          </div>
        </div>

        <FaqAccordion faqs={faqs} title={`FAQs for ${districtName}`} />

      </div>
    </div>
  );
}
