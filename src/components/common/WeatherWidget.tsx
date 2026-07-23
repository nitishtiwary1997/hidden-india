import React from 'react';
import { Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

export default function WeatherWidget({
  locationName,
  temp = '26°C',
  condition = 'Pleasant & Sunny',
  humidity = '65%',
  wind = '12 km/h',
}: {
  locationName: string;
  temp?: string;
  condition?: string;
  humidity?: string;
  wind?: string;
}) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Weather</span>
          <h4 className="text-lg font-bold text-white">{locationName}</h4>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white">{temp}</span>
        <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
          {condition}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5 text-rose-400" />
          <span>Humidity: <strong className="text-slate-200">{humidity}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          <span>Wind: <strong className="text-slate-200">{wind}</strong></span>
        </div>
      </div>
    </div>
  );
}
