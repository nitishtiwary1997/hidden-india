"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MockDatabase, Place, Review } from "@/lib/mockDatabase";
import { useApp } from "@/context/AppContext";
import { SEO } from "@/components/SEO";
import { 
  ArrowLeft, Heart, CheckCircle2, MapPin, Calendar, Clock, 
  DollarSign, Sparkles, Navigation, ShieldCheck, HelpCircle, 
  Star, MessageSquare, Send, User, ChevronRight, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PageProps {
  params: {
    state: string;
    district: string;
    place: string;
  };
}

export default function PlaceDetailPage({ params }: PageProps) {
  const { user, bookmarks, visited, toggleBookmark, toggleVisited } = useApp();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedPlaces, setRelatedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Form States
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    MockDatabase.init();
    const placeData = MockDatabase.getPlace(params.place);
    if (placeData) {
      setPlace(placeData);
      const placeReviews = MockDatabase.getReviews(placeData.id);
      setReviews(placeReviews);
      
      // Related offbeat places in the same category
      const related = MockDatabase.getPlacesByCategory(placeData.category)
        .filter((p) => p.id !== placeData.id)
        .slice(0, 2);
      setRelatedPlaces(related);
    }
    setLoading(false);
  }, [params.place]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!place) return;
    
    const reviewerName = user ? user.name : "Anonymous Traveler";
    
    MockDatabase.addReview({
      placeId: place.id,
      placeName: place.name,
      userName: reviewerName,
      rating: newRating,
      content: newComment
    });

    // Refresh reviews list
    const updatedReviews = MockDatabase.getReviews(place.id);
    setReviews(updatedReviews);
    
    setSubmitSuccess(true);
    setNewComment("");
    setNewRating(5);

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-slate-100 mb-2">Place Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">This hidden gem hasn't been listed yet. Help us update the database by submitting a place suggestion.</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(place.id);
  const isVisited = visited.includes(place.id);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: place.stateSlug.charAt(0).toUpperCase() + place.stateSlug.slice(1), item: `/india/${place.stateSlug}` },
    { name: place.districtName, item: `/india/${place.stateSlug}/${place.districtSlug}` },
    { name: place.name, item: `/india/${place.stateSlug}/${place.districtSlug}/${place.slug}` }
  ];

  // Dummy FAQs for FAQ schema generator
  const faqs = [
    {
      question: `What is the entry fee for ${place.name}?`,
      answer: `The entry fee for ${place.name} is ${place.entryFee || "free"}.`
    },
    {
      question: `What is the best season to visit ${place.name}?`,
      answer: `The best time to visit ${place.name} is during ${place.bestTime}.`
    },
    {
      question: `How do I reach ${place.name} by road?`,
      answer: place.howToReach.road
    }
  ];

  return (
    <>
      <SEO
        title={place.name}
        description={place.description}
        canonicalUrl={`https://hiddenindia.com/india/${place.stateSlug}/${place.districtSlug}/${place.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        placeData={{
          name: place.name,
          description: place.description,
          image: place.imageGallery[0],
          addressDistrict: place.districtName,
          addressState: place.stateSlug,
          entryFee: place.entryFee,
          openingHours: place.openingTime
        }}
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] pb-16">
        
        {/* PARALLAX HERO HERO BANNER */}
        <div className="relative h-[65vh] flex items-end justify-start overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.15)), url('${place.imageGallery[0]}')` 
            }}
          />
          <div className="absolute inset-0 bg-teal-950/15 mix-blend-overlay" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full z-10">
            <Link 
              href={`/india/${place.stateSlug}/${place.districtSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-350 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {place.districtName} District
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/25 border border-primary/40 text-teal-300">
                  {place.category}
                </span>
                <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-md">
                  {place.name}
                </h1>
                <p className="text-slate-350 text-sm sm:text-base flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>{place.districtName}, {place.stateSlug.charAt(0).toUpperCase() + place.stateSlug.slice(1)}</span>
                </p>
              </div>

              {/* Interaction Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleBookmark(place.id)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                    isBookmarked
                      ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-md shadow-red-500/10"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500" : ""}`} />
                  <span>{isBookmarked ? "Bookmarked" : "Wishlist"}</span>
                </button>

                <button
                  onClick={() => toggleVisited(place.id)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                    isVisited
                      ? "bg-teal-500/20 border-teal-500/50 text-teal-400 shadow-md shadow-teal-500/10"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVisited ? "Visited" : "Mark Visited"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Description, History, Guides */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Description */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                <h2 className="font-poppins font-bold text-xl text-slate-850 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> About this Hidden Gem
                </h2>
                <p className="text-slate-655 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-line">
                  {place.description}
                </p>
              </div>

              {/* History & Legends */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                <h2 className="font-poppins font-bold text-xl text-slate-855 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> History & Folktales
                </h2>
                <p className="text-slate-655 dark:text-slate-350 text-sm leading-relaxed">
                  {place.history}
                </p>
              </div>

              {/* Quick Facts Bulletins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <h3 className="font-poppins font-semibold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary" /> Interesting Facts
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    {place.facts.map((fact, idx) => (
                      <li key={idx} className="leading-relaxed">{fact}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <h3 className="font-poppins font-semibold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-500" /> Safety & Gear Checklist
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    {place.safetyTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed text-red-500/80 dark:text-red-400/80">{tip}</li>
                    ))}
                    {place.carryItems.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">Carry: {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HOW TO REACH */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-5">
                <h2 className="font-poppins font-bold text-xl text-slate-850 dark:text-slate-100 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" /> Route & How to Reach
                </h2>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">AIR</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{place.howToReach.air}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">RAIL</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{place.howToReach.rail}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">ROAD</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{place.howToReach.road}</p>
                  </div>
                </div>
              </div>

              {/* USER REVIEWS SECTION */}
              <div className="space-y-6">
                <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" /> Explorer Reviews ({reviews.length})
                </h2>

                {/* Submited reviews list */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div 
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2.5"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                            {rev.userName.slice(0, 2)}
                          </div>
                          <div>
                            <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                            <span className="block text-[10px] text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-500" : "text-slate-300 dark:text-slate-700"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-655 dark:text-slate-350 leading-relaxed pl-10 font-sans">
                        {rev.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Review Form */}
                <form 
                  onSubmit={handleReviewSubmit}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4"
                >
                  <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-200">
                    Write a Review
                  </h3>
                  
                  {submitSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium animate-pulse">
                      ✓ Review submitted successfully!
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Your Rating
                      </label>
                      <div className="flex gap-1.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setNewRating(i + 1)}
                            className="focus:outline-none hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Star 
                              className={`w-6 h-6 ${i < newRating ? "fill-amber-500" : "text-slate-300 dark:text-slate-700"}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Your Feedback
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share details about the route condition, guide rates, or crowd status..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Fees, Logistics Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Essential Log details */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                
                <h3 className="font-poppins font-bold text-lg border-b border-slate-800 pb-3">
                  Visitor Logistics
                </h3>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-0.5">Entry Ticket</span>
                      <p className="text-slate-100 font-medium">{place.entryFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <div>
                      <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-0.5">Opening Time</span>
                      <p className="text-slate-100 font-medium">{place.openingTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    <div>
                      <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-0.5">Ideal Months</span>
                      <p className="text-slate-100 font-medium">{place.bestTime}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Local Maps Registry</span>
                    <a
                      href={place.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300"
                    >
                      Open Google Maps Coordinates <Navigation className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Related offbeat locations */}
              {relatedPlaces.length > 0 && (
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-4">
                  <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
                    Similar Discoveries
                  </h3>

                  <div className="space-y-4">
                    {relatedPlaces.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/india/${rel.stateSlug}/${rel.districtSlug}/${rel.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={rel.imageGallery[0]}
                          alt={rel.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-xs text-slate-850 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors truncate">
                            {rel.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" /> {rel.districtName}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </>
  );
}
