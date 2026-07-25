import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { featuredStates } from '@/lib/data/mockData';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { targetType, idOrSlug, stateSlug, newImageUrl } = data;

    if (!idOrSlug || !newImageUrl) {
      return NextResponse.json(
        { error: 'idOrSlug and newImageUrl are required' },
        { status: 400 }
      );
    }

    if (targetType === 'STATE') {
      const stateData = featuredStates.find((s) => s.slug === idOrSlug);
      await prisma.state.upsert({
        where: { slug: idOrSlug },
        update: { bannerImage: newImageUrl },
        create: {
          name: stateData?.name || idOrSlug,
          slug: idOrSlug,
          code: stateData?.code || idOrSlug.substring(0, 2).toUpperCase(),
          capital: stateData?.capital || 'Capital',
          description: stateData?.description || `Explore attractions in ${idOrSlug}`,
          bannerImage: newImageUrl,
        },
      });
    } else if (targetType === 'DISTRICT') {
      const parentStateSlug = stateSlug || (idOrSlug.includes('-') ? idOrSlug.split('-')[0] : '');
      let state = parentStateSlug ? await prisma.state.findUnique({ where: { slug: parentStateSlug } }) : null;
      if (!state) {
        state = await prisma.state.findFirst();
      }

      if (state) {
        // Clean district name from slug or idOrSlug
        const rawDistrictName = idOrSlug.startsWith(`${state.slug}-`)
          ? idOrSlug.replace(`${state.slug}-`, '')
          : idOrSlug;

        const cleanDistrictName = rawDistrictName
          .split('-')
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        await prisma.district.upsert({
          where: {
            stateId_name: {
              stateId: state.id,
              name: cleanDistrictName,
            },
          },
          update: { image: newImageUrl, slug: idOrSlug },
          create: {
            name: cleanDistrictName,
            slug: idOrSlug,
            stateId: state.id,
            image: newImageUrl,
            description: `District of ${cleanDistrictName} in ${state.name}`,
          },
        });
      }
    } else if (targetType === 'PLACE') {
      const placeCount = await prisma.place.count({ where: { slug: idOrSlug } });
      if (placeCount > 0) {
        await prisma.place.updateMany({
          where: { slug: idOrSlug },
          data: { coverImage: newImageUrl },
        });
      } else {
        const cleanTitle = idOrSlug
          .split('-')
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        let state = await prisma.state.findFirst();
        let district = await prisma.district.findFirst();

        if (state && district) {
          await prisma.place.create({
            data: {
              title: cleanTitle,
              slug: idOrSlug,
              coverImage: newImageUrl,
              stateId: state.id,
              districtId: district.id,
              shortDesc: `Tourist attraction in ${cleanTitle}`,
              fullDesc: `Explore ${cleanTitle}`,
              type: 'HIDDEN_PLACE',
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, targetType, idOrSlug, newImageUrl });
  } catch (err) {
    console.error('Error updating image in admin API:', err);
    return NextResponse.json(
      { error: 'Failed to update image in database' },
      { status: 500 }
    );
  }
}
