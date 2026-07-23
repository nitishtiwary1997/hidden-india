import { StateSummary, DistrictSummary, PlaceCardProps } from '@/types';

export interface PlaceDetailData extends PlaceCardProps {
  fullDesc: string;
  gallery: string[];
  googleMapUrl?: string;
  openingTime?: string;
  closingTime?: string;
  entryFee?: string;
  howToReach?: string;
  safetyInfo?: string;
  faqs: { question: string; answer: string }[];
  templeDeity?: string;
  templeArchitecture?: string;
  darshanTiming?: string;
  dressCode?: string;
  foodOrigin?: string;
  ingredients?: string[];
}

export const featuredStates: StateSummary[] = [
  {
    id: 'st-rj',
    name: 'Rajasthan',
    slug: 'rajasthan',
    code: 'RJ',
    capital: 'Jaipur',
    description: 'Land of royal palaces, ancient forts, golden sand dunes, and vibrant folk music.',
    bannerImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 50,
    totalHiddenPlaces: 340,
  },
  {
    id: 'st-hp',
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    code: 'HP',
    capital: 'Shimla',
    description: 'Snow-capped Himalayas, serene valleys, ancient monasteries, and trekking trails.',
    bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 12,
    totalHiddenPlaces: 280,
  },
  {
    id: 'st-kl',
    name: 'Kerala',
    slug: 'kerala',
    code: 'KL',
    capital: 'Thiruvananthapuram',
    description: 'God’s Own Country known for emerald backwaters, spice plantations, and Ayurvedic heritage.',
    bannerImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 14,
    totalHiddenPlaces: 210,
  },
  {
    id: 'st-uk',
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    code: 'UK',
    capital: 'Dehradun',
    description: 'Land of Gods (Devbhoomi), sacred rivers, majestic peaks, and holy pilgrimage shrines.',
    bannerImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 13,
    totalHiddenPlaces: 310,
  },
  {
    id: 'st-up',
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    code: 'UP',
    capital: 'Lucknow',
    description: 'Spiritual heartland of India, home to Kashi Vishwanath, Taj Mahal, and ancient culture.',
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 75,
    totalHiddenPlaces: 450,
  },
  {
    id: 'st-ga',
    name: 'Goa',
    slug: 'goa',
    code: 'GA',
    capital: 'Panaji',
    description: 'Pristine golden beaches, Portuguese heritage churches, and lush spice farms.',
    bannerImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    totalDistricts: 2,
    totalHiddenPlaces: 95,
  },
];

export const sampleDistricts: Record<string, DistrictSummary[]> = {
  rajasthan: [
    { id: 'dst-jp', name: 'Jaipur', slug: 'jaipur', stateName: 'Rajasthan', stateSlug: 'rajasthan', description: 'The Pink City famous for Hawa Mahal, Amer Fort, and royal heritage.', image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80', totalPlaces: 45 },
    { id: 'dst-ud', name: 'Udaipur', slug: 'udaipur', stateName: 'Rajasthan', stateSlug: 'rajasthan', description: 'City of Lakes surrounded by the Aravali hills and royal palaces.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', totalPlaces: 38 },
  ],
  'himachal-pradesh': [
    { id: 'dst-sm', name: 'Shimla', slug: 'shimla', stateName: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', description: 'Queen of Hills featuring British colonial architecture and pine forests.', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', totalPlaces: 32 },
    { id: 'dst-kl', name: 'Kullu', slug: 'kullu', stateName: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', description: 'Valley of Gods famous for Manali, Solang Valley, and river rafting.', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80', totalPlaces: 50 },
  ],
};

export const samplePlaces: PlaceDetailData[] = [
  {
    id: 'pl-1',
    title: 'Gandikota Grand Canyon',
    slug: 'gandikota-grand-canyon',
    type: 'HIDDEN_PLACE',
    shortDesc: 'India’s own Grand Canyon formed by Pennar river cutting through Erramala hills.',
    fullDesc: 'Gandikota is a small village in the Kadapa district of Andhra Pradesh, known for its breathtaking gorge formed by the river Pennar cutting through the Erramala hills. The fort at Gandikota acquired its name due to the gorge (Gandikota in Telugu means Gorge Fort). Perched on top of the canyon walls, the ancient Gandikota Fort constructed in the 13th century offers panoramic sunset vistas rivaling the Arizona Grand Canyon.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    ],
    stateName: 'Andhra Pradesh',
    districtName: 'Kadapa',
    rating: 4.8,
    bestTimeToVisit: 'October to March',
    travelBudget: 'BUDGET',
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    entryFee: 'Free Entry (Fort area)',
    howToReach: 'Nearest Railway Station: Jammalamadugu (18 km). Nearest Airport: Tirupati (220 km) or Bangalore (280 km). Local taxis and buses are readily available from Kadapa.',
    safetyInfo: 'Wear sturdy footwear as canyon rock edges do not have guard rails. Carry sufficient water as shops near the gorge are minimal.',
    faqs: [
      { question: 'What is the best time to visit Gandikota?', answer: 'Winter months between October and March are pleasant with mild temperatures.' },
      { question: 'Is camping allowed near Gandikota canyon?', answer: 'Yes, overnight camping in tents on the canyon cliff edge is very popular.' },
    ],
  },
  {
    id: 'pl-2',
    title: 'Shettihalli Submerged Rosary Church',
    slug: 'shettihalli-rosary-church',
    type: 'HISTORICAL',
    shortDesc: 'Mystical 160-year-old French Gothic church submerged under Hemavathi dam water.',
    fullDesc: 'Built in the 1860s by French missionaries, Shettihalli Rosary Church in Hassan, Karnataka, is a magnificent example of Gothic architecture. Following the construction of the Gorur Dam across the Hemavathi River in 1960, the village was relocated, leaving the church submerged every monsoon. Visitors can ride boats through the church ruins during high water level or walk through dry arches in summer.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'],
    stateName: 'Karnataka',
    districtName: 'Hassan',
    rating: 4.7,
    bestTimeToVisit: 'July to November (Submerged view)',
    travelBudget: 'FREE',
    openingTime: 'Open 24 Hours',
    closingTime: 'Open 24 Hours',
    entryFee: 'Free Entry',
    howToReach: 'Situated 22 km from Hassan city. Buses connect Hassan to Shettihalli village.',
    safetyInfo: 'Exercise caution near deep dam waters during peak monsoon season.',
    faqs: [
      { question: 'Why is Shettihalli Church submerged?', answer: 'It gets submerged due to water released into Hemavathi Reservoir during monsoons.' },
    ],
  },
  {
    id: 'tmp-1',
    title: 'Kashi Vishwanath Temple',
    slug: 'kashi-vishwanath-temple',
    type: 'TEMPLE',
    shortDesc: 'One of the most sacred 12 Jyotirlinga shrines of Lord Shiva on the banks of Ganga.',
    fullDesc: 'Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. Located in Varanasi, Uttar Pradesh, the temple stands on the western bank of the holy river Ganga. The temple is widely recognized as one of the most sacred places of worship in Hinduism, connected to Kashi Vishwanath Dham corridor inaugurated in 2021.',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'],
    stateName: 'Uttar Pradesh',
    districtName: 'Varanasi',
    rating: 5.0,
    bestTimeToVisit: 'All Year (Winter preferred)',
    travelBudget: 'FREE',
    openingTime: '03:00 AM',
    closingTime: '11:00 PM',
    entryFee: 'Free Entry (Sugam Darshan paid ticket option)',
    templeDeity: 'Lord Shiva (Vishwanatha - Ruler of the Universe)',
    templeArchitecture: 'Nagara Style with Gold Plated Spires (Shikhara)',
    darshanTiming: 'Mangala Aarti: 3 AM - 4 AM | General Darshan: 4 AM - 11 PM',
    dressCode: 'Traditional Indian attire recommended (Dhoti/Saree for special rituals)',
    faqs: [
      { question: 'Can mobile phones be taken inside Kashi Vishwanath?', answer: 'No, mobile phones and electronic devices are strictly prohibited inside the main temple premises. Lockers are available outside.' },
    ],
  },
  {
    id: 'fd-1',
    title: 'Authentic Dal Baati Churma',
    slug: 'dal-baati-churma',
    type: 'FOOD_DESTINATION',
    shortDesc: 'Traditional Rajasthani delicacy baked in cow dung fuel dipped in pure desi ghee.',
    fullDesc: 'Dal Baati Churma is an iconic Rajasthani dish comprising three distinct items: spicy mixed lentil Dal, hard wheat flour balls (Baati) baked over open coal/fuel, and sweet crushed wheat dessert (Churma) enriched with dry fruits and cardamom.',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'],
    stateName: 'Rajasthan',
    districtName: 'Jaipur',
    rating: 4.9,
    bestTimeToVisit: 'All Year',
    travelBudget: 'BUDGET',
    foodOrigin: 'Mewar Region, Rajasthan (13th Century)',
    ingredients: ['Wheat Flour', 'Toor & Chana Dal', 'Desi Ghee', 'Jaggery/Sugar', 'Spices'],
    faqs: [
      { question: 'Where is the best Dal Baati Churma in Jaipur?', answer: 'Chokhi Dhani, Rawat Mishthan Bhandar, and Laxmi Mishthan Bhandar (LMB) serve authentic versions.' },
    ],
  },
];

export const featuredHiddenPlaces: PlaceCardProps[] = samplePlaces.filter(
  (p) => p.type === 'HIDDEN_PLACE' || p.type === 'HISTORICAL'
);

export const featuredTemples: PlaceCardProps[] = samplePlaces.filter(
  (p) => p.type === 'TEMPLE'
);

export const featuredFoods: PlaceCardProps[] = samplePlaces.filter(
  (p) => p.type === 'FOOD_DESTINATION'
);
