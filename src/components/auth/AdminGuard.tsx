'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, LogIn, Lock, ArrowRight } from 'lucide-react';
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

        <div className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-rose-500/20 shadow-2xl relative z-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-rose-400 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Restricted Control Center</span>
            </span>
            <h1 className="text-2xl font-extrabold text-white">Admin Access Required</h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
              This CMS is restricted exclusively to authorized administrators (<span className="text-amber-400 font-mono">nitish.tiwary1995@gmail.com</span>).
            </p>
          </div>

          {session ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col gap-1 items-center">
              <span className="text-slate-400">Currently logged in as:</span>
              <span className="font-bold text-amber-400">{session.email}</span>
              <span className="text-[10px] text-rose-400 font-semibold uppercase mt-1">Status: Unauthorized for Admin CMS</span>
            </div>
          ) : null}

          <div className="pt-2 space-y-3">
            <Link
              href="/auth/signin"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-slate-950" />
              <span>Sign In with Admin Google Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="block text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
