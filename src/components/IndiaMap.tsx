"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info, ArrowRight, HelpCircle } from "lucide-react";
import { MockDatabase } from "@/lib/mockDatabase";

interface MapState {
  id: string;
  name: string;
  slug: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  paths?: string; // Standard SVG path representation
  stats: {
    districts: number;
    waterfalls: number;
    temples: number;
    villages: number;
  };
}

export const IndiaMap: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<MapState | null>(null);

  // Stylized geographic mapping coordinates (designed for a clean, grid-based modern map of India)
  const states: MapState[] = [
    {
      id: "st-himachal",
      name: "Himachal Pradesh",
      slug: "himachal-pradesh",
      x: 180,
      y: 60,
      width: 70,
      height: 45,
      rx: 10,
      stats: { districts: 2, waterfalls: 0, temples: 2, villages: 0 }
    },
    {
      id: "st-rajasthan",
      name: "Rajasthan",
      slug: "rajasthan",
      x: 80,
      y: 130,
      width: 95,
      height: 70,
      rx: 12,
      stats: { districts: 2, waterfalls: 0, temples: 0, villages: 1 }
    },
    {
      id: "st-meghalaya",
      name: "Meghalaya",
      slug: "meghalaya",
      x: 440,
      y: 160,
      width: 75,
      height: 40,
      rx: 8,
      stats: { districts: 2, waterfalls: 2, temples: 0, villages: 1 }
    },
    {
      id: "st-karnataka",
      name: "Karnataka",
      slug: "karnataka",
      x: 140,
      y: 330,
      width: 75,
      height: 80,
      rx: 14,
      stats: { districts: 2, waterfalls: 1, temples: 1, villages: 0 }
    },
    {
      id: "st-kerala",
      name: "Kerala",
      slug: "kerala",
      x: 155,
      y: 430,
      width: 45,
      height: 90,
      rx: 10,
      stats: { districts: 2, waterfalls: 1, temples: 0, villages: 1 }
    },
    // Background states to complete the aesthetic shape of India map
    {
      id: "st-j&k",
      name: "Jammu & Kashmir",
      slug: "#",
      x: 175,
      y: 10,
      width: 80,
      height: 40,
      rx: 10,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    },
    {
      id: "st-gujarat",
      name: "Gujarat",
      slug: "#",
      x: 30,
      y: 210,
      width: 85,
      height: 55,
      rx: 10,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    },
    {
      id: "st-mp",
      name: "Madhya Pradesh",
      slug: "#",
      x: 185,
      y: 190,
      width: 100,
      height: 65,
      rx: 12,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    },
    {
      id: "st-up",
      name: "Uttar Pradesh",
      slug: "#",
      x: 230,
      y: 125,
      width: 100,
      height: 55,
      rx: 10,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    },
    {
      id: "st-maharashtra",
      name: "Maharashtra",
      slug: "#",
      x: 135,
      y: 260,
      width: 95,
      height: 60,
      rx: 12,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    },
    {
      id: "st-tn",
      name: "Tamil Nadu",
      slug: "#",
      x: 210,
      y: 430,
      width: 60,
      height: 80,
      rx: 12,
      stats: { districts: 0, waterfalls: 0, temples: 0, villages: 0 }
    }
  ];

  return (
    <div className="w-full relative py-8 px-4 rounded-3xl glass shadow-premium overflow-hidden bg-white/40 dark:bg-slate-900/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Info Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-teal-500/10 dark:text-teal-400">
            <GlobeIcon className="w-3.5 h-3.5" /> Interactive State Map
          </div>
          <h3 className="font-poppins font-bold text-2xl text-slate-800 dark:text-slate-100 leading-tight">
            Click a State to Begin the Search
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Hover over highlighted regions to preview hidden treasures, and click on any state card to dive into local folklore, traditional cuisine, and secret routes.
          </p>

          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-primary/80" />
              <span>Gems available (Meghalaya, Kerala, Rajasthan, Himachal)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800" />
              <span>Other States (Adding soon in community updates)</span>
            </div>
          </div>

          {/* Quick Info card when hovered */}
          <div className="h-[140px] relative">
            <AnimatePresence mode="wait">
              {hoveredState ? (
                <motion.div
                  key={hoveredState.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-primary/5 dark:bg-teal-900/15 border border-primary/20 dark:border-teal-900/30 flex flex-col justify-between h-full"
                >
                  <div>
                    <h4 className="font-poppins font-bold text-lg text-primary dark:text-teal-300">
                      {hoveredState.name}
                    </h4>
                    {hoveredState.slug !== "#" ? (
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-slate-600 dark:text-slate-300">
                        <div>
                          <span className="font-semibold text-primary dark:text-teal-400">
                            {hoveredState.stats.waterfalls}
                          </span>{" "}
                          Waterfalls
                        </div>
                        <div>
                          <span className="font-semibold text-primary dark:text-teal-400">
                            {hoveredState.stats.temples}
                          </span>{" "}
                          Temples
                        </div>
                        <div>
                          <span className="font-semibold text-primary dark:text-teal-400">
                            {hoveredState.stats.villages}
                          </span>{" "}
                          Villages
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 mt-2">
                        Crowdsourced details are currently being curated by local historians.
                      </p>
                    )}
                  </div>
                  {hoveredState.slug !== "#" && (
                    <Link
                      href={`/india/${hoveredState.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary-dark mt-2"
                    >
                      Explore State Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </motion.div>
              ) : (
                <div className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-center h-full">
                  <div className="text-slate-400 dark:text-slate-500 text-xs">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                    Hover over a map area to view local facts.
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="lg:col-span-8 flex justify-center items-center">
          <div className="w-full max-w-[550px] aspect-[1/1.05] relative bg-slate-500/5 dark:bg-slate-500/2 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 sm:p-4">
            <svg
              viewBox="0 0 540 550"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full select-none"
            >
              {/* Decorative grid pattern */}
              <defs>
                <pattern
                  id="grid"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="rgba(15, 118, 110, 0.03)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* State Shapes */}
              {states.map((state) => {
                const hasGems = state.slug !== "#";
                const isHovered = hoveredState?.id === state.id;

                return (
                  <Link
                    key={state.id}
                    href={hasGems ? `/india/${state.slug}` : "#"}
                    onClick={(e) => {
                      if (!hasGems) e.preventDefault();
                    }}
                  >
                    <motion.rect
                      x={state.x}
                      y={state.y}
                      width={state.width}
                      height={state.height}
                      rx={state.rx || 8}
                      className="cursor-pointer"
                      fill={
                        isHovered
                          ? "#0F766E"
                          : hasGems
                          ? "rgba(15, 118, 110, 0.15)"
                          : "rgba(100, 116, 139, 0.05)"
                      }
                      stroke={
                        isHovered
                          ? "#F59E0B"
                          : hasGems
                          ? "rgba(15, 118, 110, 0.5)"
                          : "rgba(100, 116, 139, 0.2)"
                      }
                      strokeWidth={isHovered ? 2 : 1}
                      whileHover={{ scale: 1.03 }}
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    
                    {/* State Text Label */}
                    <text
                      x={state.x + state.width / 2}
                      y={state.y + state.height / 2 + 4}
                      textAnchor="middle"
                      className={`font-poppins pointer-events-none font-semibold select-none text-[8.5px] tracking-wide ${
                        isHovered
                          ? "fill-white font-bold"
                          : hasGems
                          ? "fill-primary dark:fill-teal-300"
                          : "fill-slate-400 dark:fill-slate-600"
                      }`}
                    >
                      {state.name.split(" ")[0]}
                    </text>
                  </Link>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);
export default IndiaMap;
