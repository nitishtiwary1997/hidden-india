import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function MapWidget({
  title,
  locationName,
  mapUrl,
}: {
  title: string;
  locationName: string;
  mapUrl?: string;
}) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Location & Route Map</span>
        </h4>
        <span className="text-xs text-slate-400">{locationName}</span>
      </div>

      {/* Map Placeholder Container */}
      <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="relative z-10 text-center space-y-2 p-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-[11px] text-slate-400">{locationName}</p>
        </div>
      </div>

      <a
        href={mapUrl || `https://maps.google.com/?q=${encodeURIComponent(title + ' ' + locationName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Navigation className="w-3.5 h-3.5" />
        <span>Open Directions in Google Maps</span>
      </a>
    </div>
  );
}
