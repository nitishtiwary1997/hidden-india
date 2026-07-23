import { prisma } from '@/lib/prisma';
import { featuredStates, featuredHiddenPlaces } from '@/lib/data/mockData';

export async function getStatesData() {
  try {
    const dbStates = await prisma.state.findMany({
      include: {
        _count: {
          select: { districts: true, places: true },
        },
      },
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
    console.error('Database connection fallback:', e);
  }
  return featuredStates;
}

export async function getPlacesData() {
  try {
    const dbPlaces = await prisma.place.findMany({
      include: {
        state: true,
        district: true,
      },
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
    console.error('Database connection fallback:', e);
  }
  return featuredHiddenPlaces;
}
