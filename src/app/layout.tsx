import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HiddenIndia.online — AI Powered Travel & Local Discovery Platform',
  description:
    'Discover unexplored places, ancient temples, waterfalls, local food, heritage sites, and villages across every state and district in India with AI Trip Planner.',
  keywords: [
    'Hidden India',
    'Travel India',
    'Incredible India',
    'Unexplored India',
    'AI Travel Planner',
    'Indian Temples',
    'Waterfalls in India',
    'Local Discovery',
  ],
  authors: [{ name: 'Hidden India Team' }],
  openGraph: {
    title: 'HiddenIndia.online — World-Class Travel & Local Discovery',
    description: 'Explore every state, district, city, village and hidden gem in India with AI assistance.',
    url: 'https://hiddenindia.online',
    siteName: 'HiddenIndia.online',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${outfit.variable} ${jakarta.variable}`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
