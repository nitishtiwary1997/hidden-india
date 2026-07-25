import { prisma } from '@/lib/prisma';
import { featuredStates, featuredHiddenPlaces, sampleDistricts, samplePlaces } from '@/lib/data/mockData';
import { StateSummary, DistrictSummary, PlaceCardProps, TravelStorySummary, AdminUserInfo, CategoryStats } from '@/types';

export async function getStatesData(): Promise<StateSummary[]> {
  try {
    const dbStates = await prisma.state.findMany({
      include: {
        _count: {
          select: { districts: true, places: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    if (dbStates && dbStates.length > 0) {
      return dbStates.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        code: s.code,
        capital: s.capital || '',
        totalDistricts: s._count.districts || 0,
        totalHiddenPlaces: s._count.places || 0,
        bannerImage: s.bannerImage || 'https://images.unsplash.com/photo-1622308644420-a7d25e0b6b23?auto=format&fit=crop&w=1600&q=80',
        description: s.description || '',
      }));
    }
  } catch (e) {
    console.error('Database connection fallback for states:', e);
  }
  return featuredStates;
}

export async function getDistrictsData(): Promise<DistrictSummary[]> {
  try {
    const dbDistricts = await prisma.district.findMany({
      include: {
        state: true,
        _count: { select: { places: true } },
      },
      orderBy: { name: 'asc' },
    });
    if (dbDistricts && dbDistricts.length > 0) {
      return dbDistricts.map((d) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        stateName: d.state.name,
        stateSlug: d.state.slug,
        description: d.description || '',
        image: d.image || 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
        totalPlaces: d._count.places || 0,
      }));
    }
  } catch (e) {
    console.error('Database connection fallback for districts:', e);
  }

  // Flatten sampleDistricts mock data
  const result: DistrictSummary[] = [];
  Object.values(sampleDistricts).forEach((list) => {
    result.push(...list);
  });
  return result;
}

export async function getPlacesData(): Promise<PlaceCardProps[]> {
  try {
    const dbPlaces = await prisma.place.findMany({
      include: {
        state: true,
        district: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    if (dbPlaces && dbPlaces.length > 0) {
      return dbPlaces.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        type: p.type as any,
        shortDesc: p.shortDesc,
        fullDesc: p.fullDesc,
        coverImage: p.coverImage,
        gallery: p.gallery || [],
        stateName: p.state?.name || 'India',
        districtName: p.district?.name || 'Local',
        rating: 4.8,
        bestTimeToVisit: p.bestTimeToVisit || 'All Year',
        travelBudget: (p.travelBudget as any) || 'MODERATE',
      }));
    }
  } catch (e) {
    console.error('Database connection fallback for places:', e);
  }

  return samplePlaces.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    type: p.type,
    shortDesc: p.shortDesc,
    coverImage: p.coverImage,
    stateName: p.stateName,
    districtName: p.districtName,
    rating: p.rating,
    bestTimeToVisit: p.bestTimeToVisit,
    travelBudget: p.travelBudget,
  }));
}

export async function getCommunityStoriesData(): Promise<TravelStorySummary[]> {
  try {
    const dbStories = await prisma.travelStory.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    if (dbStories && dbStories.length > 0) {
      return dbStories.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        content: s.content,
        coverImg: s.coverImg,
        authorName: s.user?.name || 'Anonymous Traveler',
        createdAt: s.createdAt.toLocaleDateString(),
        published: s.published,
      }));
    }
  } catch (e) {
    console.error('Database connection fallback for travel stories:', e);
  }

  return [
    {
      id: 'st-1',
      title: 'Solo Monsoon Trek to Dudhsagar Waterfalls',
      slug: 'solo-monsoon-trek-dudhsagar',
      content: 'A thrilling journey across railway tracks and lush Western Ghats forest into the roar of Dudhsagar Waterfalls in Goa.',
      coverImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      authorName: 'Aarav Sharma',
      createdAt: '12 July 2026',
      published: true,
    },
    {
      id: 'st-2',
      title: 'Uncovering Secret Ghats & Morning Aarti in Varanasi',
      slug: 'secret-ghats-varanasi',
      content: 'Wandering through ancient narrow alleyways of Banaras and witnessing Subah-e-Banaras morning prayers.',
      coverImg: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      authorName: 'Priya Patel',
      createdAt: '18 July 2026',
      published: true,
    },
  ];
}

export async function getAdminUsersData(): Promise<AdminUserInfo[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    if (dbUsers && dbUsers.length > 0) {
      return dbUsers.map((u) => ({
        id: u.id,
        name: u.name || 'Explorer User',
        email: u.email || 'user@hiddenindia.online',
        role: u.role as any,
        state: u.state || 'India',
        city: u.city || 'Local',
        createdAt: u.createdAt.toLocaleDateString(),
      }));
    }
  } catch (e) {
    console.error('Database connection fallback for users:', e);
  }

  return [
    {
      id: 'usr-1',
      name: 'System Admin',
      email: 'admin@hiddenindia.online',
      role: 'ADMIN',
      state: 'New Delhi',
      city: 'Delhi',
      createdAt: '01 Jan 2026',
    },
    {
      id: 'usr-2',
      name: 'Content Editor',
      email: 'editor@hiddenindia.online',
      role: 'EDITOR',
      state: 'Rajasthan',
      city: 'Jaipur',
      createdAt: '15 Feb 2026',
    },
    {
      id: 'usr-3',
      name: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      role: 'USER',
      state: 'Himachal Pradesh',
      city: 'Shimla',
      createdAt: '10 March 2026',
    },
  ];
}

export async function getAdminCategoryStats(): Promise<CategoryStats> {
  const [states, districts, places, stories, users] = await Promise.all([
    getStatesData(),
    getDistrictsData(),
    getPlacesData(),
    getCommunityStoriesData(),
    getAdminUsersData(),
  ]);

  const totalTemples = places.filter((p) => p.type === 'TEMPLE').length;
  const totalFoodSpots = places.filter((p) => p.type === 'FOOD_DESTINATION').length;
  const totalHeritage = places.filter((p) => p.type === 'HERITAGE_SITE' || p.type === 'HISTORICAL').length;
  const totalWaterfalls = places.filter((p) => p.type === 'WATERFALL' || p.type === 'HILL_STATION' || p.type === 'BEACH' || p.type === 'WILDLIFE_SANCTUARY').length;

  return {
    totalStates: states.length,
    totalDistricts: districts.length,
    totalPlaces: places.length,
    totalTemples,
    totalFoodSpots,
    totalHeritage,
    totalWaterfalls,
    totalStories: stories.length,
    totalUsers: users.length,
  };
}
