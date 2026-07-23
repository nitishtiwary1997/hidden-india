'use client';

import React, { useState } from 'react';
import { featuredStates } from '@/lib/data/mockData';
import { Sparkles, Calendar, DollarSign, MapPin, Compass, CheckCircle2, Clock, Navigation } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function AiPlannerPage() {
  const [selectedState, setSelectedState] = useState('rajasthan');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('BUDGET');
  const [interests, setInterests] = useState<string[]>(['Hidden Places', 'Temples']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: selectedState, days, budget, interests }),
      });
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const breadcrumbs = [
    { label: 'AI Services', href: '/ai-planner' },
    { label: 'AI Trip Planner', href: '/ai-planner' },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Travel Assistant Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            AI Personalized <span className="gold-gradient-text">India Trip Planner</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            अपनी यात्रा का राज्य, दिन, बजट और पसंद चुनें — AI सेकंडों में आपके लिए दिन-प्रतिदिन का परफेक्ट इटीनररी (Travel Plan) तैयार करेगा।
          </p>
        </div>

        {/* Input Form Box */}
        <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Select State */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Destination State</span>
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {featuredStates.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Duration */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Trip Duration</span>
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value={2}>2 Days Weekend Trip</option>
                <option value={3}>3 Days Short Gateway</option>
                <option value={5}>5 Days Complete Circuit</option>
                <option value={7}>7 Days Full Explorer</option>
              </select>
            </div>

            {/* Select Budget */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Travel Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="BUDGET">Backpacker / Budget</option>
                <option value="MODERATE">Moderate / Family</option>
                <option value="LUXURY">Premium / Luxury</option>
              </select>
            </div>
          </div>

          {/* Travel Interests */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 block">
              What do you want to explore?
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {['Hidden Places', 'Sacred Temples', 'Waterfalls', 'Local Food Trails', 'Forts & Palaces', 'Wildlife'].map((item) => {
                const active = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-purple-500 via-indigo-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'AI Engine is Generating Custom Itinerary...' : 'Generate AI Day-by-Day Travel Plan'}</span>
          </button>

        </div>

        {/* Generated Itinerary Output */}
        {itinerary && (
          <div className="max-w-4xl mx-auto space-y-6 glass-panel p-8 rounded-3xl border border-amber-500/30 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>{itinerary.title}</span>
              </h2>
              <span className="text-xs text-amber-400 font-semibold">{itinerary.estimatedCost}</span>
            </div>

            <div className="space-y-6">
              {itinerary.days.map((d: any, idx: number) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Day {d.day}: {d.heading}</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{d.activities}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
