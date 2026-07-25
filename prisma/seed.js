const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const featuredStates = [
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    code: 'RJ',
    capital: 'Jaipur',
    description: 'Land of royal palaces, ancient forts, golden sand dunes, and vibrant folk music.',
    bannerImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    code: 'HP',
    capital: 'Shimla',
    description: 'Snow-capped Himalayas, serene valleys, ancient monasteries, and trekking trails.',
    bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    code: 'KL',
    capital: 'Thiruvananthapuram',
    description: 'God’s Own Country known for emerald backwaters, spice plantations, and Ayurvedic heritage.',
    bannerImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    code: 'UK',
    capital: 'Dehradun',
    description: 'Land of Gods (Devbhoomi), sacred rivers, majestic peaks, and holy pilgrimage shrines.',
    bannerImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    code: 'UP',
    capital: 'Lucknow',
    description: 'Spiritual heartland of India, home to Kashi Vishwanath, Taj Mahal, and ancient culture.',
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Bihar',
    slug: 'bihar',
    code: 'BR',
    capital: 'Patna',
    description: 'Ancient cradle of Buddhism & Jainism, Nalanda University, and rich cultural heritage.',
    bannerImage: 'https://images.unsplash.com/photo-1622308644420-a7d25e0b6b23?auto=format&fit=crop&w=1200&q=80',
  },
];

const initialPlaces = [
  {
    title: 'Kakolat Waterfall',
    slug: 'kakolat-waterfall',
    type: 'HIDDEN_GEM',
    stateSlug: 'bihar',
    districtName: 'Nawada',
    shortDesc: 'Picturesque 160-feet cold water cascade hidden in the forested hills of Nawada.',
    fullDesc: 'Kakolat waterfall is a famous waterfall in Nawada district of Bihar. Legend says an ancient king was cursed to turn into a python and lived inside this waterfall.',
    coverImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'October to March',
    travelBudget: 'BUDGET',
  },
  {
    title: 'Mahabodhi Temple',
    slug: 'mahabodhi-temple',
    type: 'TEMPLE',
    stateSlug: 'bihar',
    districtName: 'Bodh Gaya',
    shortDesc: 'UNESCO World Heritage site marking the location where Lord Buddha attained enlightenment.',
    fullDesc: 'The Mahabodhi Temple Complex is one of the four holy sites related to the life of the Lord Buddha, and particularly to the attaining of Enlightenment.',
    coverImage: 'https://images.unsplash.com/photo-1609946782701-d85a153282b0?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'November to February',
    travelBudget: 'FREE',
  },
  {
    title: 'Abhaneri Stepwell (Chand Baori)',
    slug: 'chand-baori-abhaneri',
    type: 'HERITAGE_SITE',
    stateSlug: 'rajasthan',
    districtName: 'Dausa',
    shortDesc: '13-storey deep architectural marvel with 3,500 narrow steps built in 800 AD.',
    fullDesc: 'Chand Baori is a stepwell built over a thousand years ago in the Abhaneri village of Rajasthan. It is one of the largest and deepest stepwells in the world.',
    coverImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'October to March',
    travelBudget: 'BUDGET',
  },
];

async function main() {
  console.log('🌱 Starting database seed script...');

  for (const st of featuredStates) {
    const state = await prisma.state.upsert({
      where: { slug: st.slug },
      update: {
        name: st.name,
        code: st.code,
        capital: st.capital,
        description: st.description,
        bannerImage: st.bannerImage,
      },
      create: st,
    });
    console.log(`✓ State synced: ${state.name}`);
  }

  for (const pl of initialPlaces) {
    const state = await prisma.state.findUnique({ where: { slug: pl.stateSlug } });
    if (!state) continue;

    const districtSlug = pl.districtName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let district = await prisma.district.findUnique({ where: { slug: districtSlug } });

    if (!district) {
      district = await prisma.district.create({
        data: {
          name: pl.districtName,
          slug: districtSlug,
          stateId: state.id,
          description: `District of ${pl.districtName} in ${state.name}.`,
        },
      });
    }

    const place = await prisma.place.upsert({
      where: { slug: pl.slug },
      update: {
        title: pl.title,
        shortDesc: pl.shortDesc,
        fullDesc: pl.fullDesc,
        coverImage: pl.coverImage,
        bestTimeToVisit: pl.bestTimeToVisit,
        travelBudget: pl.travelBudget,
      },
      create: {
        title: pl.title,
        slug: pl.slug,
        type: pl.type,
        shortDesc: pl.shortDesc,
        fullDesc: pl.fullDesc,
        coverImage: pl.coverImage,
        stateId: state.id,
        districtId: district.id,
        bestTimeToVisit: pl.bestTimeToVisit,
        travelBudget: pl.travelBudget,
      },
    });
    console.log(`✓ Place synced: ${place.title}`);
  }

  console.log('🚀 Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
