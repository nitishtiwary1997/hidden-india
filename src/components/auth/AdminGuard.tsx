'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, LogIn, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getStoredSession, isUserAdmin, UserSession } from '@/lib/auth/authStore';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const syncSession = () => {
      setSession(getStoredSession());
      setIsChecking(false);
    };
    syncSession();

    window.addEventListener('storage', syncSession);
    window.addEventListener('auth-session-change', syncSession);
    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('auth-session-change', syncSession);
    };
  }, []);

  const handleQuickAdminLogin = () => {
    const adminSession: UserSession = {
      id: 'usr-admin-1',
      name: 'Nitish Tiwary (Admin)',
      email: 'nitish.tiwary1995@gmail.com',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      role: 'ADMIN',
    };
    localStorage.setItem('hiddenindia_user_session', JSON.stringify(adminSession));
    window.dispatchEvent(new Event('auth-session-change'));
    setSession(adminSession);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-amber-400 font-semibold text-sm">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  const isAdmin = isUserAdmin(session);

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center relative bg-slate-950 text-slate-100">
        <div className="hero-glow" />

        <div className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative z-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Admin Control Center Portal</span>
            </span>
            <h1 className="text-2xl font-extrabold text-white">Enter Admin Control Center</h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
              Welcome to HiddenIndia Enterprise CMS (<span className="text-amber-400 font-mono">nitish.tiwary1995@gmail.com</span>). Manage states, 789+ districts, places, and photos.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            {/* 1-Click Quick Enter Admin Button */}
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-slate-950" />
              <span>Quick Enter Admin Control Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/auth/signin"
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>Sign In with Admin Google Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
