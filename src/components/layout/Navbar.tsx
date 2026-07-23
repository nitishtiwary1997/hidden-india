'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  Heart, 
  Menu, 
  X, 
  Landmark, 
  UtensilsCrossed, 
  Mountain,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';
import SearchModal from '@/components/home/SearchModal';
import { getStoredSession, clearStoredSession, UserSession } from '@/lib/auth/authStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUserSession(getStoredSession());
  }, []);

  const handleLogout = () => {
    clearStoredSession();
    setUserSession(null);
    router.push('/');
  };

  const navLinks = [
    { label: 'Explore India', href: '/explore', icon: Compass },
    { label: 'Hidden Places', href: '/hidden-places', icon: Mountain, badge: 'Popular' },
    { label: 'Temples', href: '/temples', icon: Landmark },
    { label: 'Food & Culture', href: '/food', icon: UtensilsCrossed },
    { label: 'AI Planner', href: '/ai-planner', icon: Sparkles, badge: 'AI' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  Hidden<span className="gold-gradient-text">India</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                  Local Discovery Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 relative group"
                  >
                    <Icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        link.badge === 'AI' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Quick Search Button */}
              <button 
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-all text-xs"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded text-slate-500 border border-slate-700">⌘K</kbd>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-rose-400 transition-colors relative"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Auth User Section */}
              {userSession ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <Link href="/admin" className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400">
                      <Image src={userSession.image} alt={userSession.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">{userSession.name}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-md shadow-orange-500/20 transition-all transform active:scale-95 flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-slate-950" />
                  <span>Sign In</span>
                </Link>
              )}

            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-800"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
            <div className="mb-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-400 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search state, city, waterfall...</span>
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-amber-400" />
                      <span className="font-medium text-sm">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2">
              {userSession ? (
                <button
                  onClick={handleLogout}
                  className="w-full whitespace-nowrap py-3 rounded-xl text-sm font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({userSession.name})</span>
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full whitespace-nowrap block text-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-md shadow-orange-500/20 transition-all"
                >
                  Sign In with Google
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AI Search & Voice Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
