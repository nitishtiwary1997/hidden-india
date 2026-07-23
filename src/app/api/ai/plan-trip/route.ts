import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { state, days, budget } = await req.json();

    const stateName = state.charAt(0).toUpperCase() + state.slice(1);

    const generatedDays = Array.from({ length: days || 3 }).map((_, i) => ({
      day: i + 1,
      heading: `Exploring ${stateName} Circuit Part ${i + 1}`,
      activities: `Morning visit to top local heritage sites in ${stateName}. Afternoon local lunch featuring traditional spices. Evening sunset at hidden scenic point.`,
    }));

    return NextResponse.json({
      success: true,
      itinerary: {
        title: `${days}-Day ${stateName} AI Curated Experience`,
        estimatedCost: budget === 'BUDGET' ? '₹3,500 - ₹5,000 / person' : '₹8,000 - ₹15,000 / person',
        days: generatedDays,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate AI trip' }, { status: 500 });
  }
}
