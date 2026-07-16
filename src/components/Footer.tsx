"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Heart, Globe, Shield, PhoneCall } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    explore: [
      { name: "Meghalaya Gems", href: "/india/meghalaya" },
      { name: "Kerala Highlands", href: "/india/kerala" },
      { name: "Himachal Deserts", href: "/india/himachal-pradesh" },
      { name: "Rajasthan Haunted Sites", href: "/india/rajasthan" },
    ],
    features: [
      { name: "Folklore Stories", href: "/stories" },
      { name: "Traditional Foods", href: "/food" },
      { name: "AI Travel Assistant", href: "/ai-companion" },
      { name: "Latest Travel Blogs", href: "/blog" },
    ],
    partners: [
      { name: "Hotel Booking", href: "/ai-companion" },
      { name: "Cab Rentals", href: "/ai-companion" },
      { name: "Local Guide Networks", href: "/#interactive-map" },
      { name: "Affiliate Gear Shop", href: "/blog" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Sitemap (XML)", href: "#" },
      { name: "Admin Dashboard", href: "/admin" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold text-lg">
                HI
              </span>
              <span className="font-poppins font-bold text-xl tracking-tight text-white">
                Hidden <span className="text-amber-400">India</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Discover the India beyond tourist maps. We help you explore untouched waterfalls, forgotten ancient temples, secret villages, and immersive folktales across every district.
            </p>
            
            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">
                Get Hidden Updates
              </h4>
              {subscribed ? (
                <div className="text-teal-400 text-sm font-medium animate-pulse">
                  ✓ Successfully subscribed! You will receive weekly secrets.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 pl-9 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Hidden Gems
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Experiences
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Resources & Partner
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Hidden India. Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for authentic Indian heritage.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> India</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Site</span>
            <span className="flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5" /> Toll-Free 1800-HIDDEN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
