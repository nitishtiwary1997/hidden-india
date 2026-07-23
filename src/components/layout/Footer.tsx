import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Globe, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  const topStates = [
    { name: 'Rajasthan', href: '/explore/rajasthan' },
    { name: 'Himachal Pradesh', href: '/explore/himachal-pradesh' },
    { name: 'Kerala', href: '/explore/kerala' },
    { name: 'Uttarakhand', href: '/explore/uttarakhand' },
    { name: 'Goa', href: '/explore/goa' },
    { name: 'Madhya Pradesh', href: '/explore/madhya-pradesh' },
    { name: 'Varanasi (UP)', href: '/explore/uttar-pradesh/varanasi' },
    { name: 'Ladakh', href: '/explore/ladakh' },
  ];

  const categories = [
    { name: 'Hidden Places', href: '/hidden-places' },
    { name: 'Ancient Temples', href: '/temples' },
    { name: 'Unexplored Waterfalls', href: '/waterfalls' },
    { name: 'Street Food & Heritage', href: '/food' },
    { name: 'Hill Stations', href: '/hill-stations' },
    { name: 'Culture & Festivals', href: '/festivals' },
    { name: 'Wildlife & Forests', href: '/wildlife' },
    { name: 'AI Itinerary Planner', href: '/ai-planner' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1 & 2: Brand Overview & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Hidden<span className="gold-gradient-text">India</span>.online
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              भारत की पहली AI-Powered Local Discovery प्लेटफॉर्म जो भारत के हर राज्य, जिला, शहर, गांव, मंदिर, झरने और अनसुलझे पर्यटन स्थलों को दुनिया के सामने लाती है।
            </p>

            {/* Newsletter Box */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Subscribe for Weekly Hidden Gem Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 shadow-md">
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Top States */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Explore States</span>
            </h3>
            <ul className="space-y-2.5">
              {topStates.map((state) => (
                <li key={state.name}>
                  <Link
                    href={state.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{state.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Discover</span>
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Platform Info</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Hidden India</Link>
              </li>
              <li>
                <Link href="/ai-travel-assistant" className="hover:text-amber-400 transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-amber-400 transition-colors">Travel Community</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-amber-400 transition-colors">XML Sitemap</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HiddenIndia.online — All rights reserved. Crafted for Incredible India.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for 1.4 Billion Explorers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
