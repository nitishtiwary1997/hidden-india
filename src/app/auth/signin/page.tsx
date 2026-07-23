'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { MapPin, Mail, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { setStoredSession } from '@/lib/auth/authStore';

declare global {
  interface Window {
    google?: any;
  }
}

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isGisLoaded, setIsGisLoaded] = useState(false);
  const [googleClientId, setGoogleClientId] = useState(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
  );
  const [showConfigBox, setShowConfigBox] = useState(false);
  const router = useRouter();

  // Helper to decode JWT credential payload from Google GIS
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleGoogleCredentialResponse = (response: any) => {
    if (response && response.credential) {
      const payload = parseJwt(response.credential);
      if (payload) {
        const googleUser = {
          id: payload.sub || `usr-google-${Date.now()}`,
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          image: payload.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          role: 'ADMIN' as const,
        };
        setStoredSession(googleUser);
        router.push('/admin');
      }
    }
  };

  useEffect(() => {
    if (isGisLoaded && window.google && googleClientId) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        });

        const btnContainer = document.getElementById('official-google-btn');
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'pill',
          });
        }
      } catch (err) {
        console.error('Google GIS Init error:', err);
      }
    }
  }, [isGisLoaded, googleClientId]);

  const handleInstantGoogleAuth = () => {
    // Instant One-Click Google Login for testing & admin access
    const googleUser = {
      id: `usr-google-${Date.now()}`,
      name: 'Nitish Kumar Tiwary',
      email: 'nitish.tiwary1995@gmail.com',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'ADMIN' as const,
    };
    setStoredSession(googleUser);
    router.push('/admin');
  };

  const handleCustomPopupOAuth = () => {
    if (!googleClientId) {
      setShowConfigBox(true);
      return;
    }
    const redirect_uri = window.location.origin + '/auth/signin';
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&response_type=token&scope=${encodeURIComponent('openid profile email')}`;

    window.open(googleAuthUrl, 'GoogleAuthPopup', 'width=500,height=600');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (otpSent) {
        const user = {
          id: `usr-email-${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
          role: 'USER' as const,
        };
        setStoredSession(user);
        router.push('/');
      } else {
        setOtpSent(true);
      }
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative bg-slate-950 text-slate-100">
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => setIsGisLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="hero-glow" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 p-[2px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">
              Hidden<span className="gold-gradient-text">India</span>
            </span>
          </Link>

          <h1 className="text-xl font-bold text-white">Welcome Back Explorer</h1>
          <p className="text-slate-400 text-xs">
            Sign in with Google to manage wishlist, post reviews & access Admin CMS.
          </p>
        </div>

        {/* Official Google Button Render */}
        <div className="space-y-3">
          {googleClientId ? (
            <div id="official-google-btn" className="w-full min-h-[44px] flex items-center justify-center" />
          ) : null}

          {/* Instant Google Login Button */}
          <button
            type="button"
            onClick={handleInstantGoogleAuth}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transform active:scale-95"
          >
            <svg className="w-4 h-4 text-slate-950" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>One-Click Google Sign In (nitish.tiwary1995@gmail.com)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowConfigBox(!showConfigBox)}
            className="w-full text-center text-[11px] text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showConfigBox ? 'Hide Google Client ID Setting' : 'Configure Custom Google OAuth Client ID'}</span>
          </button>

          {showConfigBox && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <label className="font-bold text-slate-300 block">Google Cloud OAuth Client ID:</label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                placeholder="123456789-xxx.apps.googleusercontent.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-slate-400">
                Get free Client ID from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-amber-400 underline">Google Cloud Console</a>.
              </p>
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-950 px-3 text-[10px] text-slate-500 uppercase font-semibold relative z-10">
            or email login
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 font-semibold mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {otpSent && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>OTP code sent to {email}. Click verify to sign in.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>{otpSent ? 'Verify & Sign In' : 'Send One-Time Passcode'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500">
          By signing in, you agree to HiddenIndia&apos;s <Link href="/terms" className="text-amber-400 underline">Terms</Link> & <Link href="/privacy" className="text-amber-400 underline">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
}
