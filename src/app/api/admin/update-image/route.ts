import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { featuredStates } from '@/lib/data/mockData';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { targetType, idOrSlug, newImageUrl } = data;

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
      const existingDistrict = await prisma.district.findFirst({
        where: { slug: idOrSlug },
      });

      if (existingDistrict) {
        await prisma.district.update({
          where: { id: existingDistrict.id },
          data: { image: newImageUrl },
        });
      } else {
        const stateSlug = idOrSlug.split('-')[0];
        let state = await prisma.state.findUnique({ where: { slug: stateSlug } });
        if (!state) {
          state = await prisma.state.findFirst();
        }
        if (state) {
          const dName = idOrSlug
            .split('-')
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

          await prisma.district.upsert({
            where: {
              stateId_name: {
                stateId: state.id,
                name: dName,
              },
            },
            update: { image: newImageUrl, slug: idOrSlug },
            create: {
              name: dName,
              slug: idOrSlug,
              stateId: state.id,
              image: newImageUrl,
              description: `District of ${dName}`,
            },
          });
        }
      }
    } else if (targetType === 'PLACE') {
      const existingPlace = await prisma.place.findUnique({ where: { slug: idOrSlug } });
      if (existingPlace) {
        await prisma.place.update({
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
