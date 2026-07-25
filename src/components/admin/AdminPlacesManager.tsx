'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  PlaceCardProps, 
  StateSummary, 
  DistrictSummary, 
  TravelStorySummary, 
  AdminUserInfo 
} from '@/types';
import PlaceCard from '@/components/cards/PlaceCard';
import StateCard from '@/components/cards/StateCard';
import DistrictCard from '@/components/cards/DistrictCard';
import { 
  Search, 
  Plus, 
  Mountain, 
  Landmark, 
  UtensilsCrossed, 
  Layers,
  Building2,
  Filter,
  MapPin,
  Waves,
  BookOpen,
  Users,
  Shield,
  Eye,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminPlacesManagerProps {
  places: PlaceCardProps[];
  states: StateSummary[];
  districts: DistrictSummary[];
  stories: TravelStorySummary[];
  users: AdminUserInfo[];
}

export default function AdminPlacesManager({
  places,
  states,
  districts,
  stories,
  users,
}: AdminPlacesManagerProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'ALL';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialTab);
  const [selectedState, setSelectedState] = useState<string>('ALL_STATES');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL_DISTRICTS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedCategory(tab);
    }
  }, [searchParams]);

  // Categories Config
  const categories = [
    { id: 'ALL', label: 'All Places', icon: Layers },
    { id: 'STATES', label: 'States Directory', icon: MapPin },
    { id: 'DISTRICTS', label: 'Districts & Cities', icon: Building2 },
    { id: 'HIDDEN_PLACE', label: 'Hidden Places', icon: Mountain },
    { id: 'TEMPLE', label: 'Temples & Shrines', icon: Landmark },
    { id: 'WATERFALL', label: 'Waterfalls & Nature', icon: Waves },
    { id: 'HISTORICAL', label: 'Historical & Forts', icon: Building2 },
    { id: 'FOOD_DESTINATION', label: 'Food & Cuisine', icon: UtensilsCrossed },
    { id: 'STORIES', label: 'Travel Stories', icon: BookOpen },
    { id: 'USERS', label: 'Users & Roles', icon: Users },
  ];

  // Helper count getter
  const getCategoryCount = (catId: string) => {
    if (catId === 'ALL') return places.length;
    if (catId === 'STATES') return states.length;
    if (catId === 'DISTRICTS') return districts.length;
    if (catId === 'STORIES') return stories.length;
    if (catId === 'USERS') return users.length;
    if (catId === 'WATERFALL') {
      return places.filter(p => p.type === 'WATERFALL' || p.type === 'HILL_STATION' || p.type === 'BEACH' || p.type === 'WILDLIFE_SANCTUARY').length;
    }
    if (catId === 'HISTORICAL') {
      return places.filter(p => p.type === 'HISTORICAL' || p.type === 'HERITAGE_SITE' || p.type === 'MUSEUM').length;
    }
    return places.filter((p) => p.type === catId).length;
  };

  // Unique States list for dropdown filter
  const stateNamesList = Array.from(
    new Set([
      ...states.map(s => s.name),
      ...places.map(p => p.stateName),
      ...districts.map(d => d.stateName),
    ])
  ).sort();

  // District list filtered by selected state
  const filteredDistrictNames = Array.from(
    new Set(
      districts
        .filter(d => selectedState === 'ALL_STATES' || d.stateName.toLowerCase() === selectedState.toLowerCase())
        .map(d => d.name)
    )
  ).sort();

  // Filtered Places
  const filteredPlaces = places.filter((p) => {
    // Category filter
    let categoryMatch = false;
    if (selectedCategory === 'ALL') categoryMatch = true;
    else if (selectedCategory === 'WATERFALL') {
      categoryMatch = ['WATERFALL', 'HILL_STATION', 'BEACH', 'WILDLIFE_SANCTUARY'].includes(p.type);
    } else if (selectedCategory === 'HISTORICAL') {
      categoryMatch = ['HISTORICAL', 'HERITAGE_SITE', 'MUSEUM', 'MARKET'].includes(p.type);
    } else {
      categoryMatch = p.type === selectedCategory;
    }

    // State filter
    const stateMatch =
      selectedState === 'ALL_STATES' ||
      p.stateName.toLowerCase().includes(selectedState.toLowerCase());

    // District filter
    const districtMatch =
      selectedDistrict === 'ALL_DISTRICTS' ||
      p.districtName.toLowerCase().includes(selectedDistrict.toLowerCase());

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    const searchMatch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.stateName.toLowerCase().includes(q) ||
      p.districtName.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q);

    return categoryMatch && stateMatch && districtMatch && searchMatch;
  });

  // Filtered States
  const filteredStates = states.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch = selectedState === 'ALL_STATES' || s.name.toLowerCase() === selectedState.toLowerCase();
    const searchMatch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q);
    return stateMatch && searchMatch;
  });

  // Filtered Districts
  const filteredDistricts = districts.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch = selectedState === 'ALL_STATES' || d.stateName.toLowerCase() === selectedState.toLowerCase();
    const districtMatch = selectedDistrict === 'ALL_DISTRICTS' || d.name.toLowerCase() === selectedDistrict.toLowerCase();
    const searchMatch = !q || d.name.toLowerCase().includes(q) || d.stateName.toLowerCase().includes(q);
    return stateMatch && districtMatch && searchMatch;
  });

  // Filtered Stories
  const filteredStories = stories.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    return !q || s.title.toLowerCase().includes(q) || s.authorName.toLowerCase().includes(q) || s.content.toLowerCase().includes(q);
  });

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch = selectedState === 'ALL_STATES' || (u.state && u.state.toLowerCase() === selectedState.toLowerCase());
    const searchMatch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    return stateMatch && searchMatch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Multi-Filter Control Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, state, district, city, author..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* State Filter Dropdown */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('ALL_DISTRICTS');
              }}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 max-w-[180px]"
            >
              <option value="ALL_STATES">All States (सभी राज्य)</option>
              {stateNamesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 max-w-[180px]"
            >
              <option value="ALL_DISTRICTS">All Districts (सभी जिले)</option>
              {filteredDistrictNames.map((dst) => (
                <option key={dst} value={dst}>
                  {dst}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Item Button */}
          <Link
            href="/admin/places/new"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add New Content</span>
          </Link>
        </div>

        {/* Active Filters Display Tag */}
        {(selectedState !== 'ALL_STATES' || selectedDistrict !== 'ALL_DISTRICTS' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 flex-wrap text-xs">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> Active Filters:
            </span>
            {selectedState !== 'ALL_STATES' && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                State: {selectedState}
              </span>
            )}
            {selectedDistrict !== 'ALL_DISTRICTS' && (
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                District: {selectedDistrict}
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                Search: &quot;{searchQuery}&quot;
              </span>
            )}
            <button
              onClick={() => {
                setSelectedState('ALL_STATES');
                setSelectedDistrict('ALL_DISTRICTS');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline font-bold text-[11px] ml-auto"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Category Scrollable Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 shadow-md'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Render Switching */}
      <div>
        {/* 1. STATES TAB */}
        {selectedCategory === 'STATES' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>States & Union Territories Directory ({filteredStates.length})</span>
              </h2>
            </div>
            {filteredStates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStates.map((st) => (
                  <StateCard key={st.id} state={st} />
                ))}
              </div>
            ) : (
              <NoResultsFound message="No states found matching your criteria." />
            )}
          </div>
        )}

        {/* 2. DISTRICTS & CITIES TAB */}
        {selectedCategory === 'DISTRICTS' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>Districts & Cities Directory ({filteredDistricts.length})</span>
              </h2>
            </div>
            {filteredDistricts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDistricts.map((d) => (
                  <DistrictCard key={d.id} district={d} />
                ))}
              </div>
            ) : (
              <NoResultsFound message="No districts found matching your selected state or search." />
            )}
          </div>
        )}

        {/* 3. TRAVEL STORIES TAB */}
        {selectedCategory === 'STORIES' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Community Travel Stories ({filteredStories.length})</span>
              </h2>
            </div>
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStories.map((story) => (
                  <div key={story.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Published
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {story.createdAt}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{story.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{story.content}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">By: {story.authorName}</span>
                      <Link
                        href={`/community`}
                        className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>View Community</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoResultsFound message="No travel stories match your search." />
            )}
          </div>
        )}

        {/* 4. REGISTERED USERS TAB */}
        {selectedCategory === 'USERS' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Registered Users & Access Roles ({filteredUsers.length})</span>
              </h2>
            </div>
            {filteredUsers.length > 0 ? (
              <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3.5">User Profile</th>
                        <th className="px-5 py-3.5">Email Address</th>
                        <th className="px-5 py-3.5">Role</th>
                        <th className="px-5 py-3.5">Location</th>
                        <th className="px-5 py-3.5">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-extrabold text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <span>{user.name}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-400">{user.email}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              user.role === 'ADMIN' 
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : user.role === 'EDITOR'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-400">
                            {user.city ? `${user.city}, ${user.state}` : user.state || 'India'}
                          </td>
                          <td className="px-5 py-4 text-slate-500">{user.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoResultsFound message="No users match your query." />
            )}
          </div>
        )}

        {/* 5. PLACE CATEGORY TABS (ALL, HIDDEN_PLACE, TEMPLE, WATERFALL, HISTORICAL, FOOD_DESTINATION) */}
        {!['STATES', 'DISTRICTS', 'STORIES', 'USERS'].includes(selectedCategory) && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mountain className="w-5 h-5 text-emerald-400" />
                <span>
                  {categories.find(c => c.id === selectedCategory)?.label || 'Places'} ({filteredPlaces.length})
                </span>
              </h2>
            </div>

            {filteredPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <NoResultsFound 
                message={`No items found matching your filters in category "${selectedCategory}".`} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NoResultsFound({ message }: { message: string }) {
  return (
    <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4">
      <Filter className="w-12 h-12 text-slate-600 mx-auto" />
      <div>
        <h3 className="text-lg font-bold text-white">No content found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          {message}
        </p>
      </div>
    </div>
  );
}
