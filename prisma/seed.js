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

const sampleDistrictsList = [
  { stateSlug: 'andhra-pradesh', name: 'Kadapa', description: 'Gandikota Grand Canyon and Belum Caves.' },
  { stateSlug: 'andhra-pradesh', name: 'Tirupati', description: 'Tirumala Venkateswara sacred temple shrine.' },
  { stateSlug: 'andhra-pradesh', name: 'Visakhapatnam', description: 'Araku Valley, Borra Caves, and RK Beach.' },
  { stateSlug: 'arunachal-pradesh', name: 'Tawang', description: 'Tawang Monastery and Sela Pass.' },
  { stateSlug: 'arunachal-pradesh', name: 'Lower Subansiri', description: 'Ziro Valley UNESCO tribal heritage.' },
  { stateSlug: 'assam', name: 'Golaghat', description: 'Kaziranga National Park rhino habitat.' },
  { stateSlug: 'assam', name: 'Kamrup Metropolitan', description: 'Guwahati Kamakhya Temple.' },
  { stateSlug: 'bihar', name: 'Nawada', description: 'Kakolat Waterfall and scenic hills.' },
  { stateSlug: 'bihar', name: 'Gaya', description: 'Bodh Gaya Mahabodhi Temple enlightenment place.' },
  { stateSlug: 'bihar', name: 'Nalanda', description: 'Ancient Nalanda University ruins and Rajgir.' },
  { stateSlug: 'chhattisgarh', name: 'Bastar', description: 'Chitrakote Falls Niagara of India.' },
  { stateSlug: 'goa', name: 'South Goa', description: 'Dudhsagar Waterfalls and Palolem Beach.' },
  { stateSlug: 'goa', name: 'North Goa', description: 'Fort Aguada, Calangute, and Panaji.' },
  { stateSlug: 'gujarat', name: 'Kutch', description: 'Great Rann of Kutch salt desert.' },
  { stateSlug: 'gujarat', name: 'Gir Somnath', description: 'Somnath Jyotirlinga and Gir Asiatic Lions.' },
  { stateSlug: 'haryana', name: 'Kurukshetra', description: 'Brahma Sarovar and Mahabharata land.' },
  { stateSlug: 'himachal-pradesh', name: 'Shimla', description: 'Mall Road, Jakhoo temple, and pine hills.' },
  { stateSlug: 'himachal-pradesh', name: 'Kullu', description: 'Manali, Solang Valley, and Rohtang Pass.' },
  { stateSlug: 'himachal-pradesh', name: 'Lahaul and Spiti', description: 'Spiti Valley, Key Monastery, and Chandratal.' },
  { stateSlug: 'jharkhand', name: 'Ranchi', description: 'Hundru, Dassam, and Jonha waterfalls.' },
  { stateSlug: 'karnataka', name: 'Vijayanagara', description: 'Hampi UNESCO Stone Chariot ruins.' },
  { stateSlug: 'karnataka', name: 'Hassan', description: 'Shettihalli Submerged Rosary Church.' },
  { stateSlug: 'karnataka', name: 'Kodagu', description: 'Coorg Abbey Falls and coffee plantations.' },
  { stateSlug: 'kerala', name: 'Alappuzha', description: 'Alleppey houseboat backwaters.' },
  { stateSlug: 'kerala', name: 'Idukki', description: 'Munnar tea gardens and Anamudi peak.' },
  { stateSlug: 'madhya-pradesh', name: 'Ujjain', description: 'Mahakaleshwar Jyotirlinga on Shipra river.' },
  { stateSlug: 'madhya-pradesh', name: 'Jabalpur', description: 'Bhedaghat Marble Rocks and Dhuandhar Falls.' },
  { stateSlug: 'maharashtra', name: 'Pune', description: 'Shaniwar Wada, Sinhagad Fort, and Misal Pav.' },
  { stateSlug: 'maharashtra', name: 'Chhatrapati Sambhajinagar', description: 'Ajanta & Ellora UNESCO Caves.' },
  { stateSlug: 'meghalaya', name: 'East Khasi Hills', description: 'Nohkalikai Falls and Sohra Cherrapunji.' },
  { stateSlug: 'odisha', name: 'Puri', description: 'Lord Jagannath Temple and Konark Sun Temple.' },
  { stateSlug: 'punjab', name: 'Amritsar', description: 'Golden Temple and Wagah Border.' },
  { stateSlug: 'rajasthan', name: 'Jaipur', description: 'Hawa Mahal, Amer Fort, and Pink City.' },
  { stateSlug: 'rajasthan', name: 'Udaipur', description: 'Lake Pichola and Taj Lake Palace.' },
  { stateSlug: 'rajasthan', name: 'Jaisalmer', description: 'Thar Desert and living Golden Fort.' },
  { stateSlug: 'sikkim', name: 'Mangan', description: 'Gurudongmar Lake and Yumthang Valley.' },
  { stateSlug: 'tamil-nadu', name: 'Madurai', description: 'Meenakshi Amman Temple Gopurams.' },
  { stateSlug: 'telangana', name: 'Hyderabad', description: 'Charminar, Golconda Fort, and Biryani.' },
  { stateSlug: 'uttar-pradesh', name: 'Varanasi', description: 'Kashi Vishwanath Dham and Ganga Ghats.' },
  { stateSlug: 'uttar-pradesh', name: 'Ayodhya', description: 'Ram Mandir and Saryu River Ghats.' },
  { stateSlug: 'uttar-pradesh', name: 'Agra', description: 'Taj Mahal and Agra Fort.' },
  { stateSlug: 'uttarakhand', name: 'Rudraprayag', description: 'Kedarnath Temple Himalayan shrine.' },
  { stateSlug: 'uttarakhand', name: 'Chamoli', description: 'Valley of Flowers and Badrinath Temple.' },
  { stateSlug: 'west-bengal', name: 'Darjeeling', description: 'Darjeeling Toy Train and Tea Gardens.' },
  { stateSlug: 'jammu-and-kashmir', name: 'Srinagar', description: 'Dal Lake Houseboats and Shalimar Bagh.' },
  { stateSlug: 'ladakh', name: 'Leh', description: 'Pangong Tso Crystal Lake and Nubra Valley.' },
];

async function main() {
  console.log('🌱 Syncing all 28 States, Districts, and Places in Database...');

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

  for (const dst of sampleDistrictsList) {
    const state = await prisma.state.findUnique({ where: { slug: dst.stateSlug } });
    if (!state) continue;

    const districtSlug = dst.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.district.upsert({
      where: { slug: districtSlug },
      update: {
        name: dst.name,
        description: dst.description,
      },
      create: {
        name: dst.name,
        slug: districtSlug,
        stateId: state.id,
        description: dst.description,
        image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
      },
    });
  }

  console.log('🚀 All 28 States and Districts synced successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
