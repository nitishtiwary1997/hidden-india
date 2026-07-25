'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Image as ImageIcon,
  CheckCircle,
  X,
  Sparkles,
  Save,
  Check,
  Calendar,
  Upload
} from 'lucide-react';

interface AdminPlacesManagerProps {
  places: PlaceCardProps[];
  states: StateSummary[];
  districts: DistrictSummary[];
  stories: TravelStorySummary[];
  users: AdminUserInfo[];
}

const PRESET_HD_IMAGES = [
  { label: 'Ancient Fort / Temple', url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Canyon / Gorge', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Himalayan Snow Peaks', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Waterfall / Stream', url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Spiritual River Ghats', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Golden Temple / Shrine', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Emerald Backwaters', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Indian Cuisine & Thali', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Golden Sand Desert', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Royal Lake Palace', url: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80' },
];

export default function AdminPlacesManager({
  places: initialPlaces,
  states: initialStates,
  districts: initialDistricts,
  stories,
  users,
}: AdminPlacesManagerProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'ALL';

  const [placesList, setPlacesList] = useState(initialPlaces);
  const [statesList, setStatesList] = useState(initialStates);
  const [districtsList, setDistrictsList] = useState(initialDistricts);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialTab);
  const [selectedState, setSelectedState] = useState<string>('ALL_STATES');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL_DISTRICTS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Image Upload / Edit Modal State
  const [activeImageModal, setActiveImageModal] = useState<{
    targetType: 'STATE' | 'DISTRICT' | 'PLACE';
    idOrSlug: string;
    name: string;
    currentImg: string;
  } | null>(null);

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState('');

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
    if (catId === 'ALL') return placesList.length;
    if (catId === 'STATES') return statesList.length;
    if (catId === 'DISTRICTS') return districtsList.length;
    if (catId === 'STORIES') return stories.length;
    if (catId === 'USERS') return users.length;
    if (catId === 'WATERFALL') {
      return placesList.filter(p => p.type === 'WATERFALL' || p.type === 'HILL_STATION' || p.type === 'BEACH' || p.type === 'WILDLIFE_SANCTUARY').length;
    }
    if (catId === 'HISTORICAL') {
      return placesList.filter(p => p.type === 'HISTORICAL' || p.type === 'HERITAGE_SITE' || p.type === 'MUSEUM').length;
    }
    return placesList.filter((p) => p.type === catId).length;
  };

  // Unique States list for dropdown filter
  const stateNamesList = Array.from(
    new Set([
      ...statesList.map(s => s.name),
      ...placesList.map(p => p.stateName),
      ...districtsList.map(d => d.stateName),
    ])
  ).sort();

  // District list filtered by selected state
  const filteredDistrictNames = Array.from(
    new Set(
      districtsList
        .filter(d => selectedState === 'ALL_STATES' || d.stateName.toLowerCase() === selectedState.toLowerCase())
        .map(d => d.name)
    )
  ).sort();

  // Filtered Places
  const filteredPlaces = placesList.filter((p) => {
    let categoryMatch = false;
    if (selectedCategory === 'ALL') categoryMatch = true;
    else if (selectedCategory === 'WATERFALL') {
      categoryMatch = ['WATERFALL', 'HILL_STATION', 'BEACH', 'WILDLIFE_SANCTUARY'].includes(p.type);
    } else if (selectedCategory === 'HISTORICAL') {
      categoryMatch = ['HISTORICAL', 'HERITAGE_SITE', 'MUSEUM', 'MARKET'].includes(p.type);
    } else {
      categoryMatch = p.type === selectedCategory;
    }

    const stateMatch =
      selectedState === 'ALL_STATES' ||
      p.stateName.toLowerCase().includes(selectedState.toLowerCase());

    const districtMatch =
      selectedDistrict === 'ALL_DISTRICTS' ||
      p.districtName.toLowerCase().includes(selectedDistrict.toLowerCase());

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
  const filteredStates = statesList.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch = selectedState === 'ALL_STATES' || s.name.toLowerCase() === selectedState.toLowerCase();
    const searchMatch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q);
    return stateMatch && searchMatch;
  });

  // Filtered Districts
  const filteredDistricts = districtsList.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    const stateMatch = selectedState === 'ALL_STATES' || d.stateName.toLowerCase() === selectedState.toLowerCase();
    const districtMatch = selectedDistrict === 'ALL_DISTRICTS' || d.name.toLowerCase() === selectedDistrict.toLowerCase();
    const searchMatch = !q || d.name.toLowerCase().includes(q) || d.stateName.toLowerCase().includes(q);
    return stateMatch && districtMatch && searchMatch;
  });

  // Open Image Modal
  const openImageModal = (targetType: 'STATE' | 'DISTRICT' | 'PLACE', idOrSlug: string, name: string, currentImg: string) => {
    setActiveImageModal({ targetType, idOrSlug, name, currentImg });
    setImageUrlInput(currentImg);
    setUpdateSuccessMsg('');
  };

  // Direct File Upload Handler (Mobile / Computer file selection)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    setIsUploadingFile(true);
    try {
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImageUrlInput(data.url);
      }
    } catch (err) {
      console.error('File upload error:', err);
    } finally {
      setIsUploadingFile(false);
    }
  };

  // Save New Image URL
  const handleSaveImage = async () => {
    if (!activeImageModal || !imageUrlInput.trim()) return;

    setIsUpdatingImage(true);
    try {
      const res = await fetch('/api/admin/update-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: activeImageModal.targetType,
          idOrSlug: activeImageModal.idOrSlug,
          newImageUrl: imageUrlInput.trim(),
        }),
      });

      if (res.ok) {
        if (activeImageModal.targetType === 'STATE') {
          setStatesList(prev => prev.map(s => s.slug === activeImageModal.idOrSlug ? { ...s, bannerImage: imageUrlInput.trim() } : s));
        } else if (activeImageModal.targetType === 'DISTRICT') {
          setDistrictsList(prev => prev.map(d => d.slug === activeImageModal.idOrSlug ? { ...d, image: imageUrlInput.trim() } : d));
        } else if (activeImageModal.targetType === 'PLACE') {
          setPlacesList(prev => prev.map(p => p.slug === activeImageModal.idOrSlug ? { ...p, coverImage: imageUrlInput.trim() } : p));
        }

        setUpdateSuccessMsg('Image updated successfully!');
        setTimeout(() => {
          setUpdateSuccessMsg('');
          setActiveImageModal(null);
        }, 1000);
      }
    } catch (e) {
      console.error('Image update error:', e);
    } finally {
      setIsUpdatingImage(false);
    }
  };

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
                  <div key={st.id} className="relative group">
                    <StateCard state={st} />
                    <button
                      onClick={() => openImageModal('STATE', st.slug, st.name, st.bannerImage || '')}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-amber-500 hover:text-slate-950 transition-all z-20"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Edit Image</span>
                    </button>
                  </div>
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
                  <div key={d.id} className="relative group">
                    <DistrictCard district={d} />
                    <button
                      onClick={() => openImageModal('DISTRICT', d.slug, d.name, d.image || '')}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-cyan-500 hover:text-slate-950 transition-all z-20"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Edit Image</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <NoResultsFound message="No districts found matching your selected state or search." />
            )}
          </div>
        )}

        {/* 3. PLACE CATEGORY TABS */}
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
                  <div key={place.id} className="relative group">
                    <PlaceCard place={place} />
                    <button
                      onClick={() => openImageModal('PLACE', place.slug, place.title, place.coverImage || '')}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-amber-500 hover:text-slate-950 transition-all z-20"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Change Image</span>
                    </button>
                  </div>
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

      {/* Admin Image Edit & Direct Upload Modal */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Image Manager ({activeImageModal.targetType})
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Update Image for {activeImageModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveImageModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Image Preview */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <Image
                src={imageUrlInput || activeImageModal.currentImg}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                Live Image Preview
              </span>
            </div>

            {/* 1. Direct File Upload Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Option 1: Upload Photo from Mobile / Computer</span>
                </span>
                {isUploadingFile && <span className="text-emerald-400 animate-pulse text-[11px]">Uploading file...</span>}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploadingFile}
                className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer bg-slate-900 rounded-xl p-1.5 border border-slate-800"
              />
            </div>

            {/* 2. Image Web URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Option 2: Or Paste Direct Web URL (Unsplash, ImgBB, PostImages, Cloudinary)
              </label>
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/photo-... or /uploads/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 3. Quick Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 block">
                Option 3: Or Pick from Curated Photography Collection:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {PRESET_HD_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrlInput(preset.url)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-[11px] text-slate-300 whitespace-nowrap shrink-0 hover:text-amber-300"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {updateSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{updateSuccessMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveImage}
                disabled={isUpdatingImage || isUploadingFile}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Save className="w-4 h-4" />
                <span>{isUpdatingImage ? 'Saving...' : 'Save & Apply Image'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
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
