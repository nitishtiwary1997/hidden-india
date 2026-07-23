'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { samplePlaces, featuredStates } from '@/lib/data/mockData';
import { 
  Search, 
  Mic, 
  MicOff, 
  X, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Mountain, 
  Landmark, 
  Utensils 
} from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Voice Search via Web Speech API
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice search is not supported in your current browser. Try Chrome or Edge.');
      return;
    }

    try {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
        (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    } catch (err) {
      console.error('Voice search error:', err);
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const matchedStates = featuredStates.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.capital.toLowerCase().includes(query.toLowerCase())
  );

  const matchedPlaces = samplePlaces.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.districtName.toLowerCase().includes(query.toLowerCase()) ||
      p.stateName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type state (e.g. Kerala), place (e.g. Gandikota) or temple..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 text-base focus:outline-none"
          />

          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                : 'bg-slate-800 text-slate-400 hover:text-amber-400 border-slate-700'
            }`}
            title="Voice Search"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-semibold uppercase text-[10px]">Popular:</span>
          {['Rajasthan', 'Waterfalls', 'Varanasi', 'Kedarnath', 'Dal Baati'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {query.trim() === '' ? (
            <div className="text-center py-8 space-y-3 text-slate-500">
              <Sparkles className="w-8 h-8 text-amber-400/40 mx-auto" />
              <p className="text-xs">Type anything to explore India’s 28 States, 765 Districts, Temples & Hidden Spots.</p>
            </div>
          ) : (
            <>
              {/* States Results */}
              {matchedStates.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">States</div>
                  <div className="space-y-1">
                    {matchedStates.map((state) => (
                      <Link
                        key={state.id}
                        href={`/explore/${state.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold text-white group-hover:text-amber-400">{state.name}</span>
                          <span className="text-xs text-slate-400">Capital: {state.capital}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Places Results */}
              {matchedPlaces.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Destinations & Temples</div>
                  <div className="space-y-1">
                    {matchedPlaces.map((place) => (
                      <Link
                        key={place.id}
                        href={`/place/${place.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Mountain className="w-4 h-4 text-cyan-400" />
                          <div>
                            <div className="font-semibold text-white group-hover:text-amber-400">{place.title}</div>
                            <div className="text-xs text-slate-400">{place.districtName}, {place.stateName}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedStates.length === 0 && matchedPlaces.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No places found for &quot;{query}&quot;. Try searching for Rajasthan, Varanasi, or Gandikota.
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
