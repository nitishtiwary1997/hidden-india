import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      title,
      slug,
      type,
      stateName,
      districtName,
      shortDesc,
      fullDesc,
      coverImage,
      travelBudget,
      bestTimeToVisit,
    } = data;

    // 1. Ensure State exists or create
    const stateSlug = stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let state = await prisma.state.findUnique({ where: { slug: stateSlug } });
    if (!state) {
      state = await prisma.state.create({
        data: {
          name: stateName,
          slug: stateSlug,
          code: stateName.substring(0, 2).toUpperCase(),
          capital: 'Capital',
          description: `Explore attractions and hidden places in ${stateName}.`,
          bannerImage: coverImage || 'https://images.unsplash.com/photo-1622308644420-a7d25e0b6b23?auto=format&fit=crop&w=1600&q=80',
        },
      });
    }

    // 2. Ensure District exists or create
    const districtSlug = districtName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let district = await prisma.district.findUnique({ where: { slug: districtSlug } });
    if (!district) {
      district = await prisma.district.create({
        data: {
          name: districtName,
          slug: districtSlug,
          stateId: state.id,
          description: `District of ${districtName} in ${stateName}.`,
        },
      });
    }

    // 3. Create Place in Database
    const newPlace = await prisma.place.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type: type || 'HIDDEN_GEM',
        shortDesc,
        fullDesc: fullDesc || shortDesc,
        coverImage,
        stateId: state.id,
        districtId: district.id,
        travelBudget: travelBudget || 'BUDGET',
        bestTimeToVisit: bestTimeToVisit || 'All Year',
      },
    });

    return NextResponse.json({ success: true, place: newPlace });
  } catch (err) {
    console.error('Error creating place:', err);
    return NextResponse.json({ error: 'Failed to create place in database' }, { status: 500 });
  }
}
