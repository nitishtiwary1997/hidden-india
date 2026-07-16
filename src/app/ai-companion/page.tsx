"use client";

import React, { useState, useEffect } from "react";
import { MockDatabase } from "@/lib/mockDatabase";
import { SEO } from "@/components/SEO";
import { 
  BrainCircuit, Sparkles, Send, MapPin, Calendar, 
  DollarSign, Activity, Compass, CheckCircle2, MessageSquare 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  tips: string;
}

export default function AICompanionPage() {
  // Trip Planner States
  const [selectedState, setSelectedState] = useState("meghalaya");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Mid-range");
  const [interest, setInterest] = useState("Waterfall");
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  // Chat Assistant States
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Namaste! I am your Hidden India travel guide. Ask me anything about offbeat routes, entry fees, transport schedules, or local traditions!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleGeneratePlan = () => {
    setGenerating(true);
    setItinerary(null);

    // Simulate AI computing
    setTimeout(() => {
      const places = MockDatabase.getPlaces()
        .filter((p) => p.stateSlug === selectedState && (interest === "All" || p.category === interest));
      
      const stateObj = MockDatabase.getState(selectedState);
      const foods = MockDatabase.getFoods().filter((f) => f.stateSlug === selectedState);

      const generatedPlan: ItineraryDay[] = Array.from({ length: days }).map((_, idx) => {
        const dayNum = idx + 1;
        const placeIdx = idx % (places.length || 1);
        const place = places[placeIdx];
        const foodIdx = idx % (foods.length || 1);
        const food = foods[foodIdx];

        if (place) {
          return {
            day: dayNum,
            title: `Unlocking ${place.districtName} Offbeat Wonders`,
            activities: [
              `Morning trek to ${place.name} — ${place.description.slice(0, 100)}...`,
              `Explore historical ruins and local surroundings of ${place.districtName}.`,
              `Engage with local guides to hear historical anecdotes of the region.`
            ],
            meals: [
              `Breakfast: Local tea stall delicacies`,
              `Lunch: Traditional meal featuring ${food ? food.name : "local specialties"}`,
              `Dinner: Organic home-style dining at a local homestay`
            ],
            tips: `Carry ₹${budget === "Budget" ? "500" : "1500"} cash for the day. ${place.travelTips[0] || "Wear comfy trekking shoes."}`
          };
        } else {
          return {
            day: dayNum,
            title: `Exploring Remote Village Valleys`,
            activities: [
              `Hike through pristine nature trails and organic fruit orchards.`,
              `Interact with tribal elders to document ancient folktales and legends.`,
              `Sunset viewpoint photography Session.`
            ],
            meals: [
              `Breakfast: Herbal brew and steamed buns`,
              `Lunch: Wood-fired local vegetable platters`,
              `Dinner: Fresh river fish curry (Malabar style or Khasi style)`
            ],
            tips: "Hire a local youth guide to support the rural valley economy."
          };
        }
      });

      setItinerary(generatedPlan);
      setGenerating(false);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMessages = [...messages, { sender: "user", text: userText }];
    setMessages(newMessages);
    setChatInput("");

    // Simulate AI matching query to database
    setTimeout(() => {
      let replyText = "That's a fascinating query! While I am continuously index-mapping India's remote districts, my knowledge indicates that the best offbeat treasures lie in the dense rainforests of Wayanad and the monolith stone reserves of West Jaintia Hills. Hire local village guides to navigate these safely.";

      const lower = userText.toLowerCase();
      if (lower.includes("bhangarh") || lower.includes("haunted") || lower.includes("ghost")) {
        replyText = "Bhangarh Fort in Alwar is legally closed from sunset to sunrise due to intense wildlife activity (panthers/boars) and historical folklore. The entry fee is ₹40 for Indians, and it is located near Sariska Tiger Sanctuary. Avoid carrying food packets inside to protect yourself from wild monkeys.";
      } else if (lower.includes("sawdong") || lower.includes("waterfall") || lower.includes("meghalaya")) {
        replyText = "Wei Sawdong Waterfall is a three-tiered plunge pool in Cherrapunji, Meghalaya. It requires climbing down vertical bamboo ladders which can be very slippery. Entry is ₹30, and it is open between 8:00 AM and 5:00 PM. Highly recommended between November and February when the water color turns turquoise.";
      } else if (lower.includes("siddu") || lower.includes("recipe") || lower.includes("food")) {
        replyText = "Siddu is a steamed wheat bun stuffed with a paste of poppy seeds, ground walnuts, and local spices. It is typical in Himachal Pradesh (such as Kaza or Shimla) and served soaked in warm desi ghee. You can buy it at local Pahadi Rasoi shops.";
      } else if (lower.includes("mummy") || lower.includes("gue") || lower.includes("monk")) {
        replyText = "The Gue Mummy Temple in Lahaul-Spiti, Himachal Pradesh, houses the 500-year-old mummified remains of monk Sangha Tenzin. It was preserved naturally through a process of meditation and slow diet reduction (self-mummification). No chemicals were used, and it is fully intact.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
    }, 1200);
  };

  const chatSuggestions = [
    "What is the story of Bhangarh Fort?",
    "How to reach Wei Sawdong waterfall?",
    "Tell me about the Gue monk mummy",
    "Traditional food in Spiti Valley"
  ];

  return (
    <>
      <SEO
        title="AI Travel Companion & Trip Planner"
        description="Plan your offbeat Indian adventure with AI. Generate custom district itineraries, calculate budgets, and ask our chat assistant about hidden temples, waterfalls, and stories."
        canonicalUrl="https://hiddenindia.com/ai-companion"
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:bg-teal-500/5 dark:text-teal-400">
              <BrainCircuit className="w-3.5 h-3.5" /> AI Suite Active
            </div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              AI Travel Companion
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Dynamically build offbeat itineraries, calculate travel budgets, and chat with an AI guide that knows the history of every hidden location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ITINERARY GENERATOR */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
                <h2 className="font-poppins font-bold text-xl text-slate-850 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> AI Offbeat Trip Planner
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Destination State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-150 focus:outline-none dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      <option value="meghalaya">Meghalaya</option>
                      <option value="kerala">Kerala</option>
                      <option value="himachal-pradesh">Himachal Pradesh</option>
                      <option value="rajasthan">Rajasthan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Trip Duration (Days)</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-150 focus:outline-none dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      <option value="3">3 Days (Weekend Getaway)</option>
                      <option value="5">5 Days (Detailed Exploration)</option>
                      <option value="7">7 Days (Full Adventure)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Travel Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-150 focus:outline-none dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      <option value="Budget">Budget Friendly</option>
                      <option value="Mid-range">Mid-range</option>
                      <option value="Premium">Premium Adventure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Core Interest</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-150 focus:outline-none dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      <option value="All">All Categories</option>
                      <option value="Waterfall">Waterfalls & Lagoons</option>
                      <option value="Temple">Ancient Shrines</option>
                      <option value="Village">Rural Communities</option>
                      <option value="Fort">Forgotten Forts</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePlan}
                  disabled={generating}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                  {generating ? "Computing Custom Route..." : "Generate AI Plan"}
                </button>
              </div>

              {/* Generated Itinerary Display */}
              <AnimatePresence mode="wait">
                {itinerary && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-slate-100">
                        Your Custom {days}-Day Itinerary
                      </h3>
                      <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                        Budget: {budget}
                      </span>
                    </div>

                    {itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3">
                          <h4 className="font-poppins font-bold text-base text-primary dark:text-teal-400">
                            Day {day.day}: {day.title}
                          </h4>
                        </div>

                        <div className="space-y-3.5 text-xs text-slate-655 dark:text-slate-350">
                          <div>
                            <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Morning & Afternoon Activities</span>
                            <ul className="list-disc list-inside space-y-1">
                              {day.activities.map((act, i) => (
                                <li key={i} className="leading-relaxed">{act}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-50 dark:border-slate-850">
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Local Dining Map</span>
                              <ul className="space-y-0.5 font-medium text-slate-800 dark:text-slate-200">
                                {day.meals.map((meal, i) => (
                                  <li key={i}>{meal}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] mb-1">AI Daily Travel Tip</span>
                              <p className="leading-relaxed text-amber-600 dark:text-amber-400 font-medium">
                                {day.tips}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: AI TRAVEL CHATBOT */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col justify-between h-[580px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl" />
                
                {/* Chat Header */}
                <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-teal-400" />
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-100">AI Assistant Chat</h3>
                    <span className="block text-[10px] text-teal-400 font-medium animate-pulse">● Regional Expert Connected</span>
                  </div>
                </div>

                {/* Chat Messages Logs */}
                <div className="flex-grow overflow-y-auto my-4 space-y-4 pr-1 text-xs scrollbar-thin scrollbar-thumb-slate-800">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line font-sans ${
                          msg.sender === "user"
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-slate-800 text-slate-205 rounded-tl-none border border-slate-700/50"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prompt Suggestions */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {chatSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChatInput(s)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-[10px] text-slate-400 hover:text-white transition-colors truncate max-w-[200px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-slate-800 pt-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about waterfalls, local guides, bus routes..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-teal-500 text-xs font-sans"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
