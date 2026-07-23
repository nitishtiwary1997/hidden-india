import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Sparkles, Heart, MessageSquare, PlusCircle, Award } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata = {
  title: 'Travel Community & Stories — HiddenIndia.online',
  description: 'Join India’s largest travel discovery community. Share photos, hidden place reviews, and travel diaries.',
};

export default function CommunityPage() {
  const breadcrumbs = [
    { label: 'Community', href: '/community' },
  ];

  const sampleStories = [
    {
      id: 'st-1',
      title: 'Camping on the Canyon Edge of Gandikota at Sunset',
      author: 'Rajesh Kumar',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      coverImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      likes: 342,
      comments: 48,
      location: 'Gandikota, Andhra Pradesh',
    },
    {
      id: 'st-2',
      title: 'Boating Through the Submerged Ruins of Shettihalli Church',
      author: 'Ananya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      coverImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      likes: 512,
      comments: 76,
      location: 'Hassan, Karnataka',
    },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Users className="w-4 h-4" />
              <span>Explorers Hub</span>
            </span>
            <h1 className="text-4xl font-extrabold text-white">
              Travel Stories & <span className="gold-gradient-text">Community</span>
            </h1>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg">
            <PlusCircle className="w-4 h-4" />
            <span>Publish Travel Story</span>
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleStories.map((story) => (
            <div key={story.id} className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden space-y-4 p-5">
              <div className="relative h-60 w-full rounded-2xl overflow-hidden">
                <Image src={story.coverImg} alt={story.title} fill className="object-cover" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold border border-slate-800">
                  {story.location}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src={story.userAvatar} alt={story.author} fill className="object-cover" />
                  </div>
                  <span>Story by <strong className="text-white">{story.author}</strong></span>
                </div>

                <h3 className="text-xl font-bold text-white hover:text-amber-400 transition-colors">
                  {story.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>{story.likes} Likes</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>{story.comments} Comments</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
