const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allIndianStates = [
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', code: 'AP', capital: 'Amaravati', description: 'Home to Gandikota canyon, Tirupati Balaji shrine, Araku Valley, and pristine coastal beaches.', bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', code: 'AR', capital: 'Itanagar', description: 'Land of the Dawn-Lit Mountains, Tawang Monastery, Ziro Valley, and orchids.', bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Assam', slug: 'assam', code: 'AS', capital: 'Dispur', description: 'Land of one-horned rhinos in Kaziranga, Brahmaputra river islands, and tea gardens.', bannerImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Bihar', slug: 'bihar', code: 'BR', capital: 'Patna', description: 'Cradle of Buddhism & Jainism, Mahabodhi Temple, Nalanda University, and Kakolat falls.', bannerImage: 'https://images.unsplash.com/photo-1622308644420-a7d25e0b6b23?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Chhattisgarh', slug: 'chhattisgarh', code: 'CG', capital: 'Raipur', description: 'Niagara of India (Chitrakote Falls), tribal culture, and Bastar rainforests.', bannerImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Goa', slug: 'goa', code: 'GA', capital: 'Panaji', description: 'Pristine golden beaches, Portuguese heritage churches, Dudhsagar falls, and spice farms.', bannerImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Gujarat', slug: 'gujarat', code: 'GJ', capital: 'Gandhinagar', description: 'Rann of Kutch white desert, Gir Asiatic Lions, Somnath Jyotirlinga, and Dwarka.', bannerImage: 'https://images.unsplash.com/photo-1609946782701-d85a153282b0?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Haryana', slug: 'haryana', code: 'HR', capital: 'Chandigarh', description: 'Historic battlefield of Mahabharata in Kurukshetra, Morni Hills, and Sultanpur sanctuary.', bannerImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Himachal Pradesh', slug: 'himachal-pradesh', code: 'HP', capital: 'Shimla', description: 'Snow-capped Himalayas, serene Spiti valley, ancient monasteries, and trekking trails.', bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Jharkhand', slug: 'jharkhand', code: 'JH', capital: 'Ranchi', description: 'Land of Waterfalls (Hundru, Dassam, Jonha), Parasnath Jain hills, and Betla National Park.', bannerImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Karnataka', slug: 'karnataka', code: 'KA', capital: 'Bengaluru', description: 'Hampi ruins, Coorg coffee hills, Gokarna beaches, and Mysore palace.', bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Kerala', slug: 'kerala', code: 'KL', capital: 'Thiruvananthapuram', description: 'God’s Own Country featuring emerald backwaters, Munnar tea estates, and Ayurveda.', bannerImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh', code: 'MP', capital: 'Bhopal', description: 'Heart of India with Khajuraho temples, Sanchi Stupa, Mahakaleshwar Ujjain, and tiger reserves.', bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Maharashtra', slug: 'maharashtra', code: 'MH', capital: 'Mumbai', description: 'Ajanta & Ellora caves, Western Ghats hill stations, Maratha sea forts, and Gateway of India.', bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Manipur', slug: 'manipur', code: 'MN', capital: 'Imphal', description: 'Jewel of India famous for Loktak floating lake, Sangai dancing deer, and Kangla Fort.', bannerImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Meghalaya', slug: 'meghalaya', code: 'ML', capital: 'Shillong', description: 'Abode of Clouds, living root bridges, Dawki crystal clear river, and Nohkalikai falls.', bannerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Mizoram', slug: 'mizoram', code: 'MZ', capital: 'Aizawl', description: 'Land of Rolling Hills, Reiek peak, Tamdil lake, and bamboo dance heritage.', bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Nagaland', slug: 'nagaland', code: 'NL', capital: 'Kohima', description: 'Land of Festivals, Dzukou Valley trek, Hornbill cultural festival, and Naga heritage.', bannerImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Odisha', slug: 'odisha', code: 'OD', capital: 'Bhubaneswar', description: 'Puri Lord Jagannath Temple, Konark Sun Temple chariot, Chilika Lake, and tribal art.', bannerImage: 'https://images.unsplash.com/photo-1609946782701-d85a153282b0?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Punjab', slug: 'punjab', code: 'PB', capital: 'Chandigarh', description: 'Golden Temple Amritsar, Wagah Border retreat, rich agricultural heartland, and Bhangra.', bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Rajasthan', slug: 'rajasthan', code: 'RJ', capital: 'Jaipur', description: 'Land of royal palaces, ancient forts, golden sand dunes, and vibrant folk music.', bannerImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sikkim', slug: 'sikkim', code: 'SK', capital: 'Gangtok', description: 'Majestic Kanchenjunga peaks, Nathula pass, sacred Gurudongmar lake, and monasteries.', bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', code: 'TN', capital: 'Chennai', description: 'Madurai Meenakshi Temple, Mahabalipuram shore temples, Ooty hill station, and Chola heritage.', bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Telangana', slug: 'telangana', code: 'TG', capital: 'Hyderabad', description: 'Historic Charminar, Golconda Fort, Ramappa UNESCO temple, and Thousand Pillar temple.', bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tripura', slug: 'tripura', code: 'TR', capital: 'Agartala', description: 'Ujjayanta royal palace, Neermahal water palace, and Unakoti rock carvings.', bannerImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh', code: 'UP', capital: 'Lucknow', description: 'Spiritual heartland of India, Kashi Vishwanath, Ayodhya Ram Temple, Taj Mahal, and Mathura.', bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Uttarakhand', slug: 'uttarakhand', code: 'UK', capital: 'Dehradun', description: 'Land of Gods (Devbhoomi), Kedarnath & Badrinath shrines, Rishikesh yoga, and Valley of Flowers.', bannerImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80' },
  { name: 'West Bengal', slug: 'west-bengal', code: 'WB', capital: 'Kolkata', description: 'Cultural capital Kolkata, Darjeeling tea hills, Sundarbans mangrove tigers, and Bishnupur terracotta.', bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Delhi', slug: 'delhi', code: 'DL', capital: 'New Delhi', description: 'National Capital Territory featuring Red Fort, Qutub Minar, Humayun Tomb, and Lotus Temple.', bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Jammu & Kashmir', slug: 'jammu-and-kashmir', code: 'JK', capital: 'Srinagar / Jammu', description: 'Paradise on Earth, Dal Lake houseboats, Gulmarg snow slopes, and Vaishno Devi shrine.', bannerImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Ladakh', slug: 'ladakh', code: 'LA', capital: 'Leh', description: 'Land of High Passes, Pangong Tso crystal lake, Nubra valley sand dunes, and Hemis monastery.', bannerImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80' },
];

const initialPlaces = [
  {
    title: 'Gandikota Grand Canyon',
    slug: 'gandikota-grand-canyon',
    type: 'HIDDEN_PLACE',
    stateSlug: 'andhra-pradesh',
    districtName: 'Kadapa',
    shortDesc: 'India’s own Grand Canyon formed by Pennar river cutting through Erramala hills.',
    fullDesc: 'Gandikota is a small village in Kadapa district of Andhra Pradesh, known for its breathtaking gorge.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March',
    travelBudget: 'BUDGET',
  },
  {
    title: 'Kakolat Waterfall',
    slug: 'kakolat-waterfall',
    type: 'WATERFALL',
    stateSlug: 'bihar',
    districtName: 'Nawada',
    shortDesc: 'Picturesque 160-feet cold water cascade hidden in the forested hills of Nawada.',
    fullDesc: 'Kakolat waterfall is a famous waterfall in Nawada district of Bihar surrounded by lush green hills.',
    coverImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
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
    fullDesc: 'The Mahabodhi Temple Complex is one of the four holy sites related to the life of Lord Buddha.',
    coverImage: 'https://images.unsplash.com/photo-1609946782701-d85a153282b0?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'November to February',
    travelBudget: 'FREE',
  },
  {
    title: 'Nohkalikai Waterfalls',
    slug: 'nohkalikai-waterfalls',
    type: 'WATERFALL',
    stateSlug: 'meghalaya',
    districtName: 'East Khasi Hills',
    shortDesc: 'Tallest plunge waterfall in India dropping 1,115 feet into a turquoise blue pool.',
    fullDesc: 'Nohkalikai Falls is the tallest plunge waterfall in India near Sohra (Cherrapunji).',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'September to May',
    travelBudget: 'BUDGET',
  },
  {
    title: 'Dudhsagar Waterfalls',
    slug: 'dudhsagar-waterfalls',
    type: 'WATERFALL',
    stateSlug: 'goa',
    districtName: 'South Goa',
    shortDesc: 'Four-tiered spectacular milk-like waterfall cascading down 1,017 feet along railway tracks.',
    fullDesc: 'Dudhsagar Falls is a four-tiered waterfall located on Mandovi River in Goa.',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'July to December',
    travelBudget: 'MODERATE',
  },
  {
    title: 'Kashi Vishwanath Temple',
    slug: 'kashi-vishwanath-temple',
    type: 'TEMPLE',
    stateSlug: 'uttar-pradesh',
    districtName: 'Varanasi',
    shortDesc: 'One of the most sacred 12 Jyotirlinga shrines of Lord Shiva on the banks of Ganga.',
    fullDesc: 'Kashi Vishwanath Temple is one of the most famous Shiva temples in Varanasi.',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'All Year',
    travelBudget: 'FREE',
  },
  {
    title: 'Golden Temple',
    slug: 'golden-temple-amritsar',
    type: 'TEMPLE',
    stateSlug: 'punjab',
    districtName: 'Amritsar',
    shortDesc: 'Preeminent spiritual gurdwara of Sikhism surrounded by the Amrit Sarovar lake.',
    fullDesc: 'Sri Harmandir Sahib covered in gold leaf serving free community meals 24/7.',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'All Year',
    travelBudget: 'FREE',
  },
  {
    title: 'Kedarnath Dham Temple',
    slug: 'kedarnath-dham-temple',
    type: 'TEMPLE',
    stateSlug: 'uttarakhand',
    districtName: 'Rudraprayag',
    shortDesc: 'Sacred Himalayan shrine dedicated to Lord Shiva situated at 11,755 ft elevation.',
    fullDesc: 'Kedarnath Temple set amidst Himalayan peaks in Rudraprayag, Uttarakhand.',
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'May to October',
    travelBudget: 'MODERATE',
  },
  {
    title: 'Authentic Dal Baati Churma',
    slug: 'dal-baati-churma',
    type: 'FOOD_DESTINATION',
    stateSlug: 'rajasthan',
    districtName: 'Jaipur',
    shortDesc: 'Traditional Rajasthani delicacy baked in fuel dipped in pure desi ghee.',
    fullDesc: 'Dal Baati Churma is an iconic Rajasthani delicacy with spicy lentils, baati, and churma.',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'All Year',
    travelBudget: 'BUDGET',
  },
  {
    title: 'Bihari Litti Chokha',
    slug: 'bihari-litti-chokha',
    type: 'FOOD_DESTINATION',
    stateSlug: 'bihar',
    districtName: 'Patna',
    shortDesc: 'Roasted sattu stuffed wheat balls served with smoky eggplant & potato chokha.',
    fullDesc: 'Litti Chokha is the iconic authentic dish of Bihar with sattu stuffing and ghee.',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'All Year',
    travelBudget: 'BUDGET',
  },
];

async function main() {
  console.log('🌱 Syncing all 28 States & Places in Database...');

  for (const st of allIndianStates) {
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
    console.log(`✓ State synced: ${state.name} (${state.code})`);
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

    await prisma.place.upsert({
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
  }

  console.log('🚀 All 28 States, Districts, and Places synced successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
