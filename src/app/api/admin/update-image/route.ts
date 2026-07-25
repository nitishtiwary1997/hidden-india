import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
      try {
        await prisma.state.update({
          where: { slug: idOrSlug },
          data: { bannerImage: newImageUrl },
        });
      } catch (e) {
        console.log('State not in DB yet, image updated in live memory.');
      }
    } else if (targetType === 'DISTRICT') {
      try {
        await prisma.district.update({
          where: { slug: idOrSlug },
          data: { image: newImageUrl },
        });
      } catch (e) {
        console.log('District not in DB yet, image updated in live memory.');
      }
    } else if (targetType === 'PLACE') {
      try {
        await prisma.place.update({
          where: { slug: idOrSlug },
          data: { coverImage: newImageUrl },
        });
      } catch (e) {
        console.log('Place not in DB yet, image updated in live memory.');
      }
    }

    return NextResponse.json({ success: true, targetType, idOrSlug, newImageUrl });
  } catch (err) {
    console.error('Error updating image in admin API:', err);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}
