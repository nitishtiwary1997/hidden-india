// Mock Database with rich, realistic seed data and LocalStorage syncing.

export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface State {
  id: string;
  name: string;
  slug: string;
  overview: string;
  culture: string;
  history: string;
  travelTips: string;
  bestTime: string;
  imageGallery: string[];
  videos: string[];
  nearbyAttractions: string[];
}

export interface District {
  id: string;
  stateId: string;
  stateName: string;
  stateSlug: string;
  name: string;
  slug: string;
  overview: string;
  localFestivals: string[];
  clothing: string;
  music: string;
  emergencyContacts: {
    police: string;
    hospital: string;
    touristHelp: string;
  };
  transport: {
    bus: string;
    train: string;
    local: string;
  };
  weather: string;
  travelCost: "Budget" | "Mid-range" | "Premium";
}

export interface Place {
  id: string;
  districtId: string;
  districtName: string;
  stateSlug: string;
  districtSlug: string;
  name: string;
  slug: string;
  category: string; // "Waterfall" | "Temple" | "Fort" | "Village" | "Cave" | "Lake" | "Nature Trail" | "Hill Station"
  description: string;
  history: string;
  facts: string[];
  howToReach: {
    air: string;
    rail: string;
    road: string;
  };
  entryFee: string;
  openingTime: string;
  bestTime: string;
  travelTips: string[];
  carryItems: string[];
  safetyTips: string[];
  imageGallery: string[];
  videos: string[];
  googleMapUrl: string;
  latitude?: number;
  longitude?: number;
}

export interface Review {
  id: string;
  placeId: string;
  placeName: string;
  userName: string;
  rating: number; // 1-5
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Journal {
  id: string;
  userId: string;
  title: string;
  content: string;
  images: string[];
  visitedDate: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  placeId: string;
}

export interface VisitedPlace {
  id: string;
  userId: string;
  placeId: string;
}

export interface Story {
  id: string;
  districtId: string;
  districtName: string;
  stateSlug: string;
  districtSlug: string;
  title: string;
  slug: string;
  content: string;
  type: "FOLKLORE" | "HISTORY" | "GHOST" | "FACT";
  author: string;
  createdAt: string;
}

export interface Food {
  id: string;
  districtId: string;
  districtName: string;
  stateSlug: string;
  districtSlug: string;
  name: string;
  type: "TRADITIONAL" | "STREET" | "SWEET";
  description: string;
  recipe: string;
  shops: { name: string; location: string; price: string }[];
  priceRange: "$" | "$$" | "$$$";
  images: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Guides" | "Tips" | "Photography" | "Food" | "History";
  image: string;
  author: string;
  readTime: string;
  createdAt: string;
}

// ==========================================
// SEED DATA
// ==========================================

const SEED_STATES: State[] = [
  {
    id: "st-meghalaya",
    name: "Meghalaya",
    slug: "meghalaya",
    overview: "Meghalaya, the 'Abode of Clouds', is a stunning highland state in Northeast India. Famous for receiving the highest rainfall on earth, it boasts lush rainforests, turquoise waterfalls, and ancient living root bridges hand-knitted by the indigenous Khasi and Jaintia tribes.",
    culture: "Matrilineal society where inheritance goes to the youngest daughter. Rich traditions of woodcraft, weaving, and oral storytelling exist alongside deep environmental respect.",
    history: "Inhabited by the Khasis, Jaintias, and Garos for centuries, it was a British hill station center before attaining full statehood in 1972.",
    travelTips: "Always carry an umbrella or raincoat. Respect local tribal rules, particularly in sacred groves where taking anything is forbidden.",
    bestTime: "September to May (avoid peak monsoon for heavy trekking, though monsoons showcase spectacular waterfalls).",
    imageGallery: [
      "https://images.unsplash.com/photo-1626125355702-861f2f81498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    nearbyAttractions: ["Guwahati, Assam", "Kaziranga National Park"]
  },
  {
    id: "st-kerala",
    name: "Kerala",
    slug: "kerala",
    overview: "Known as 'God's Own Country', Kerala is a tropical paradise situated along India's southwestern Malabar coast. While tourists crowd Alleppey and Munnar, its hidden treasures lie in the dense rainforests of Wayanad and the megalithic archaeological reserves of Idukki.",
    culture: "Traditional performing arts like Kathakali, martial art forms like Kalaripayattu, and wellness systems like Ayurveda define the cultural fabric.",
    history: "A prime international spice trade route for millennia, Kerala hosted Roman, Phoenician, Arab, Chinese, and European merchants.",
    travelTips: "Try the local spice-rich cuisine served on banana leaves. Pre-book local guides for deep forest trekking.",
    bestTime: "October to March for pleasant dry weather.",
    imageGallery: [
      "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    nearbyAttractions: ["Kanyakumari", "Coorg, Karnataka"]
  },
  {
    id: "st-himachal",
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    overview: "Himachal Pradesh, meaning 'Land of Snowy Mountains', is nestled in the Western Himalayas. Beyond the commercial hill towns of Shimla and Manali lie cold high-altitude deserts of Spiti Valley and prehistoric rock-cut shrines.",
    culture: "Distinctive Pahadi culture with colorful woolens, metal-based crafts, traditional Nati dance, and village-centric devta (deity) systems.",
    history: "Ruled by local hill chiefs and princely states until merging into the Union of India, later becoming a state in 1971.",
    travelTips: "Acclimatize to prevent Altitude Sickness in high passes. Check road conditions before travel.",
    bestTime: "March to June, and October to November.",
    imageGallery: [
      "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    nearbyAttractions: ["Ladakh", "Amritsar, Punjab"]
  },
  {
    id: "st-rajasthan",
    name: "Rajasthan",
    slug: "rajasthan",
    overview: "The 'Land of Kings' evokes images of desert fortresses, royal palaces, and vibrant festivals. However, Rajasthan is also home to tragic legends, abandoned haunted villages, and remote forest wildlife sanctuaries.",
    culture: "Explosion of colors in traditional attire (turbans and ghagras), puppet shows (Kathputli), Ghoomar dance, and heroic folklore.",
    history: "A tapestry of valiant Rajput clans who constructed majestic fortresses and resisted Mughal and British expansions.",
    travelTips: "Protect yourself from harsh sunlight and keep hydrated. Avoid traveling in summer months (April to July).",
    bestTime: "November to February when daytime temperature is highly pleasant.",
    imageGallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    nearbyAttractions: ["Agra, Uttar Pradesh", "Ahmedabad, Gujarat"]
  }
];

const SEED_DISTRICTS: District[] = [
  {
    id: "dist-east-khasi-hills",
    stateId: "st-meghalaya",
    stateName: "Meghalaya",
    stateSlug: "meghalaya",
    name: "East Khasi Hills",
    slug: "east-khasi-hills",
    overview: "The heart of Meghalaya, containing the capital Shillong and the wettest highlands on earth like Sohra (Cherrapunji). The district is dotted with sacred groves, pristine caves, and canyons.",
    localFestivals: ["Nongkrem Dance Festival", "Shad Suk Mynsiem"],
    clothing: "Jainsem (women) and Jymphong (men)",
    music: "Duitara (traditional stringed instrument) and tribal drums",
    emergencyContacts: {
      police: "0364-2222277",
      hospital: "0364-2520200",
      touristHelp: "0364-2224587"
    },
    transport: {
      bus: "MTC buses run from Shillong to Cherrapunji",
      train: "Nearest railway station is Guwahati (100km away)",
      local: "Shared yellow-and-black local taxis are highly popular"
    },
    weather: "Cool and rainy throughout summer, dry chilly winters",
    travelCost: "Mid-range"
  },
  {
    id: "dist-west-jaintia-hills",
    stateId: "st-meghalaya",
    stateName: "Meghalaya",
    stateSlug: "meghalaya",
    name: "West Jaintia Hills",
    slug: "west-jaintia-hills",
    overview: "Famed for its turquoise rivers, ancient monolithic stone fields, and organic farming (particularly Lakadong turmeric). It is less traveled and holds deep tribal Jaintia culture.",
    localFestivals: ["Behdeinkhlam Festival", "Laho Dance"],
    clothing: "Muga Silk Jainsem",
    music: "Traditional Jaintia wind instruments (Tangmuri)",
    emergencyContacts: {
      police: "03652-220025",
      hospital: "03652-220101",
      touristHelp: "1800-345-3855"
    },
    transport: {
      bus: "Buses available from Shillong to Jowai (district HQ)",
      train: "Nearest railway is Guwahati (160km away)",
      local: "Local shared cars and private tourist cabs"
    },
    weather: "Moderate temperatures, heavy rain during monsoon",
    travelCost: "Budget"
  },
  {
    id: "dist-wayanad",
    stateId: "st-kerala",
    stateName: "Kerala",
    stateSlug: "kerala",
    name: "Wayanad",
    slug: "wayanad",
    overview: "Wayanad is a mountainous plateau on the Western Ghats. It has prehistoric rock shelters, tribal reserves, aromatic coffee plantations, and deep reserve forests.",
    localFestivals: ["Theyyam Performance", "Valliyoorkavu Temple Festival"],
    clothing: "Mundu (men) and Kasavu Saree (women)",
    music: "Tribal wind pipe (Kuzhal) and hand percussion (Thudi)",
    emergencyContacts: {
      police: "04936-202525",
      hospital: "04936-220231",
      touristHelp: "04936-202234"
    },
    transport: {
      bus: "Well connected by KSRTC buses from Kozhikode and Bangalore",
      train: "Nearest railway station is Kozhikode (CLT - 85km)",
      local: "Auto-rickshaws and rental jeeps for forest roads"
    },
    weather: "Pleasant misty highlands, cool winter breezes",
    travelCost: "Mid-range"
  },
  {
    id: "dist-lahaul-spiti",
    stateId: "st-himachal",
    stateName: "Himachal Pradesh",
    stateSlug: "himachal-pradesh",
    name: "Lahaul and Spiti",
    slug: "lahaul-and-spiti",
    overview: "A cold desert mountain valley holding a stark, beautiful landscape. Sparsely populated, it is a holy land of Tibetan Buddhism, spectacular high passes, and isolated centuries-old villages.",
    localFestivals: ["Losar (Buddhist New Year)", "Ladarcha Fair"],
    clothing: "Woolen Pattu (shawls) and traditional fur-lined caps",
    music: "Tibetan horn pipe (Dungchen) and ritual drums",
    emergencyContacts: {
      police: "01900-222210",
      hospital: "01900-222211",
      touristHelp: "1900-112-001"
    },
    transport: {
      bus: "HRTC buses run through Atal Tunnel from Manali",
      train: "Nearest railway is Joginder Nagar (250km away)",
      local: "Private 4x4 vehicles are strongly recommended"
    },
    weather: "Sub-zero freezing winters, dry breezy cool summers",
    travelCost: "Premium"
  },
  {
    id: "dist-alwar",
    stateId: "st-rajasthan",
    stateName: "Rajasthan",
    stateSlug: "rajasthan",
    name: "Alwar",
    slug: "alwar",
    overview: "Nestled between the Aravalli hills, Alwar features ancient forts, deep stepwells, and a dense tiger sanctuary. It is also famous for holding India's most notorious haunted site.",
    localFestivals: ["Alwar Utsav", "Matsya Festival"],
    clothing: "Bandhani Turbans, Dhoti-Kurta, and Ghagra Choli",
    music: "Alghoza (double flute) and Bhapang instrumental solos",
    emergencyContacts: {
      police: "0144-2337451",
      hospital: "0144-2338200",
      touristHelp: "0144-2347348"
    },
    transport: {
      bus: "Regular Rajasthan Roadways buses from Delhi (150km) and Jaipur",
      train: "Alwar Railway Station (AWR) is well connected",
      local: "Auto-rickshaws and cycles for narrow market alleys"
    },
    weather: "Extremely hot summers, pleasant cool winters",
    travelCost: "Budget"
  }
];

const SEED_PLACES: Place[] = [
  {
    id: "pl-wei-sawdong",
    districtId: "dist-east-khasi-hills",
    districtName: "East Khasi Hills",
    stateSlug: "meghalaya",
    districtSlug: "east-khasi-hills",
    name: "Wei Sawdong Waterfall",
    slug: "wei-sawdong",
    category: "Waterfall",
    description: "Wei Sawdong is a rare, breathtaking three-tiered waterfall tucked away in the deep forests of Cherrapunji. The emerald-green water forms three distinct pools cascading from one to another. It is accessed by a challenging trek down vertical bamboo ladders built by local villagers.",
    history: "Historically known to locals but hidden from outer maps. The name translates from the Khasi language: 'Wei' means pool and 'Sawdong' means round or square, referencing the shape of the natural plunge pools.",
    facts: [
      "The waterfall is three-tiered and completely natural.",
      "The water color shifts from turquoise to deep emerald depending on sunlight.",
      "The local community maintains the bamboo step track to control ecological damage."
    ],
    howToReach: {
      air: "Shillong Airport (Umroi - 80km) or Guwahati Airport (145km)",
      rail: "Guwahati Railway Station (GHY - 140km)",
      road: "Drive from Shillong towards Sohra, then take the bypass road near Dainthlen Falls."
    },
    entryFee: "₹30 per person (funds go directly to village maintenance committee)",
    openingTime: "8:00 AM - 5:00 PM (Strictly closed after dark for safety)",
    bestTime: "October to February (Water is crystal clear and turquoise)",
    travelTips: [
      "Wear sturdy trekking shoes with strong grip; the trail is muddy and slick.",
      "Climbing down the bamboo ladders requires focus. Not recommended for elderly or small children.",
      "Carry zero-waste bags; plastic littering is strictly fined by the village council."
    ],
    carryItems: ["Waterproof bag", "Trekking shoes", "Camera", "Rain jacket", "Extra pair of clothes"],
    safetyTips: [
      "Do not attempt to swim in the deepest tier pool without a life jacket.",
      "Avoid the climb during heavy cloudbursts as rockfalls can occur."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    googleMapUrl: "https://maps.google.com/?q=Wei+Sawdong+Waterfalls",
    latitude: 25.2983,
    longitude: 91.6834
  },
  {
    id: "pl-mawlynnong",
    districtId: "dist-east-khasi-hills",
    districtName: "East Khasi Hills",
    stateSlug: "meghalaya",
    districtSlug: "east-khasi-hills",
    name: "Mawlynnong Village",
    slug: "mawlynnong-village",
    category: "Village",
    description: "Mawlynnong is award-winningly clean and famously dubbed 'Asia's Cleanest Village'. It is a cooperative community where every resident takes turns cleaning the streets. The village has flower-lined pathways, bamboo dustbins, solar streetlights, and a living root bridge in neighboring Riwai.",
    history: "The tradition of extreme hygiene was started over 100 years ago during a cholera outbreak, when Christian missionaries and village elders instituted strict sanitary rules.",
    facts: [
      "Has a 100% literacy rate.",
      "Every single house uses natural compost toilets.",
      "The surrounding living root bridges are constructed entirely by directing root growth of Ficus Elastica trees over decades."
    ],
    howToReach: {
      air: "Shillong Airport (90km)",
      rail: "Guwahati Railway Station (165km)",
      road: "Drive from Shillong via Dawki road. Turn off at the Riwai intersection."
    },
    entryFee: "₹50 village entry tax per vehicle",
    openingTime: "Open 24 hours (Day visits preferred, 9:00 AM - 6:00 PM)",
    bestTime: "June to September (Monsoons make the surrounding greenery explode)",
    travelTips: [
      "Stay in a local bamboo homestay to experience Khasi hospitality.",
      "Do not drop plastic wrappers; throw garbage only in the woven bamboo baskets.",
      "Purchase handmade local bamboo souvenirs to support the economy."
    ],
    carryItems: ["Cash (limited ATMs)", "Comfortable walking shoes", "Umbrella"],
    safetyTips: [
      "Be respectful of villagers' privacy. Do not enter homes without permission.",
      "The root bridges are slippery when wet; hold onto the rails."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    googleMapUrl: "https://maps.google.com/?q=Mawlynnong+Village",
    latitude: 25.2016,
    longitude: 91.9056
  },
  {
    id: "pl-krang-suri",
    districtId: "dist-west-jaintia-hills",
    districtName: "West Jaintia Hills",
    stateSlug: "meghalaya",
    districtSlug: "west-jaintia-hills",
    name: "Krang Suri Waterfall",
    slug: "krang-suri",
    category: "Waterfall",
    description: "Krang Suri is a hidden oasis near Jowai, characterized by its magical blue pool. A stone pathway constructed along the edge of the hill leads down to the waterfall, where water drops down from a wide ledge into a deep, clear turquoise pool.",
    history: "Historically a resting place for Jaintia travelers. The local district administration recently developed it carefully without installing concrete structures to preserve the pristine nature.",
    facts: [
      "The copper-rich river bed gives the water its distinct blue hue.",
      "It was featured in multiple Bollywood movies.",
      "Locals have run a mandatory life-vest rental program to ensure zero drownings."
    ],
    howToReach: {
      air: "Shillong Airport (105km)",
      rail: "Guwahati (180km)",
      road: "From Shillong, drive to Jowai, then head south towards the Dawki border. Look for signs for Krang Suri."
    },
    entryFee: "₹50 entrance, ₹50 optional life jacket rental",
    openingTime: "9:00 AM - 5:00 PM",
    bestTime: "September to April",
    travelTips: [
      "Renting a life vest is mandatory if you want to swim in the pool.",
      "There are basic changing rooms available near the pool.",
      "Visit early in the morning (around 9 AM) to avoid tourist groups and see the sun hit the turquoise pool."
    ],
    carryItems: ["Swimwear", "Towels", "Slippers", "Water bottle"],
    safetyTips: [
      "Do not jump off the high rocks into the water.",
      "Stay within the designated safe swimming zone marked by the lifeguards."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    videos: [],
    googleMapUrl: "https://maps.google.com/?q=Krang+Suri+Waterfall",
    latitude: 25.3475,
    longitude: 92.5422
  },
  {
    id: "pl-900-kandi",
    districtId: "dist-wayanad",
    districtName: "Wayanad",
    stateSlug: "kerala",
    districtSlug: "wayanad",
    name: "900 Kandi Canopy Walkway",
    slug: "900-kandi",
    category: "Nature Trail",
    description: "Deep inside the forests of Wayanad, Thollayiram (900) Kandi is an absolute jungle retreat. The highlight is a 400-meter elevated glass canopy walkway and suspension bridge suspended 100 feet above forest valleys.",
    history: "The name 'Thollayiram' means 900 in Malayalam, representing the 900 acres of ancestral cardamom and coffee estate lands that were later rewilded.",
    facts: [
      "Suspended over a deep canopy of evergreen trees.",
      "Accessible only by off-road 4x4 vehicles.",
      "Offers birds-eye view sightings of Hornbills and Nilgiri Langurs."
    ],
    howToReach: {
      air: "Calicut International Airport (95km)",
      rail: "Kozhikode Railway Station (90km)",
      road: "Drive to Meppadi village in Wayanad, then hire an off-road jeep to travel 9km up into the forest."
    },
    entryFee: "₹200 (includes glass bridge entry)",
    openingTime: "9:00 AM - 6:00 PM",
    bestTime: "October to May",
    travelTips: [
      "Do not attempt to take your own car; standard cars cannot clear the boulders and steep forest tracks.",
      "Keep an eye out for leeches, especially during and after rains; apply salt or Dettol.",
      "Combine this with a trek to Chembra Peak if time permits."
    ],
    carryItems: ["Salt/Leech spray", "Comfortable walking shoes", "Camera"],
    safetyTips: [
      "Do not jump or run on the suspension bridge.",
      "Follow the guide's path; wild elephants frequent the deeper zones."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
    ],
    videos: [],
    googleMapUrl: "https://maps.google.com/?q=900+Kandi+Wayanad",
    latitude: 11.5367,
    longitude: 76.1283
  },
  {
    id: "pl-gue-mummy",
    districtId: "dist-lahaul-spiti",
    districtName: "Lahaul and Spiti",
    stateSlug: "himachal-pradesh",
    districtSlug: "lahaul-and-spiti",
    name: "Gue Mummy Temple",
    slug: "gue-mummy",
    category: "Temple",
    description: "In the tiny Himalayan border village of Gue lies a small glass-chamber shrine housing the naturally mummified body of Sangha Tenzin, a 15th-century Buddhist monk. The mummy is fully intact with hair and teeth, preserved without any chemical agents.",
    history: "Sangha Tenzin reportedly underwent 'Sokushinbutsu' (self-mummification) by slow starvation and meditation to save the village from a devastating plague of crop-eating locusts. The mummy was discovered in 1975 when an earthquake damaged a local tomb.",
    facts: [
      "It is a natural mummy preserved solely by cold, dry, thin air.",
      "Skin and fingernails are still visible and intact.",
      "The mummy was found sitting upright in a yogic posture."
    ],
    howToReach: {
      air: "Bhuntar Airport, Kullu (280km)",
      rail: "Shimla Railway Station (320km)",
      road: "Drive from Kaza (Spiti) towards Tabo. Turn off near the Sumdo border post. The village is 8km from the main highway."
    },
    entryFee: "Free (donations accepted)",
    openingTime: "7:00 AM - 6:00 PM",
    bestTime: "June to September (summers when roads are clear of snow)",
    travelTips: [
      "Maintain absolute silence inside the temple; it is a sacred relic.",
      "Inner Line Permits are required for foreign nationals as this is near the China border.",
      "Bring cash; there is no network or digital payment services in Gue."
    ],
    carryItems: ["Heavy woolens", "Permit documents", "Cash", "ID Proof"],
    safetyTips: [
      "Do not touch the glass container enclosing the mummy.",
      "Gue sits at 10,500 feet. Rest for a day if you show signs of mountain sickness."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    videos: [],
    googleMapUrl: "https://maps.google.com/?q=Gue+Mummy+Temple+Spiti",
    latitude: 31.8906,
    longitude: 78.4892
  },
  {
    id: "pl-bhangarh-fort",
    districtId: "dist-alwar",
    districtName: "Alwar",
    stateSlug: "rajasthan",
    districtSlug: "alwar",
    name: "Bhangarh Haunted Fort",
    slug: "bhangarh-fort",
    category: "Fort",
    description: "Bhangarh Fort is a 17th-century fort ruins complex widely recognized as India's most haunted place. The ruins feature grand gates, royal palaces, temples, and markets. The Archaeological Survey of India (ASI) has placed a board forbidding entry after sunset and before sunrise.",
    history: "Built by Raja Madho Singh. According to legend, the fort was cursed by a dark magician, Singhia, who fell in love with Princess Ratnavati. When his love potion failed, he cursed the palace to crumble and its inhabitants to die, their souls trapped forever without rebirth.",
    facts: [
      "No house roofs exist inside Bhangarh; locals say any roof built collapses mysteriously.",
      "The ASI board explicitly makes entry at night a punishable legal offense.",
      "Wildlife like panthers and wild boars roam the ruins at night from the adjacent Sariska forest."
    ],
    howToReach: {
      air: "Jaipur International Airport (85km)",
      rail: "Alwar Railway Station (AWR - 90km)",
      road: "Drive from Jaipur via Gola ka Baas, or from Alwar via Thanagazi."
    },
    entryFee: "₹40 for Indians, ₹300 for foreigners",
    openingTime: "6:00 AM - 6:00 PM (strictly closed at night)",
    bestTime: "October to March",
    travelTips: [
      "Hire an official guide at the gate to hear the rich architectural details and legends.",
      "Watch out for the aggressive monkeys that populate the entrance temple.",
      "Leave the complex by 5:30 PM; guards start clearing out the area vigorously."
    ],
    carryItems: ["Sunscreen", "Water bottle", "Hat/Cap", "Comfortable walking shoes"],
    safetyTips: [
      "Do not try to hide inside or climb boundary walls at night; guards patrol with dogs, and wild animals roam.",
      "Be careful around old structural columns; do not lean on unstable brick walls."
    ],
    imageGallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627179068037-7757962c5545?auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    googleMapUrl: "https://maps.google.com/?q=Bhangarh+Fort",
    latitude: 27.0965,
    longitude: 76.2862
  }
];

const SEED_STORIES: Story[] = [
  {
    id: "st-bhangarh-curse",
    districtId: "dist-alwar",
    districtName: "Alwar",
    stateSlug: "rajasthan",
    districtSlug: "alwar",
    title: "The Curse of Princess Ratnavati and the Magician",
    slug: "curse-of-bhangarh-fort",
    content: "The haunting of Bhangarh is rooted in a legend of unrequited love and dark sorcery. Princess Ratnavati of Bhangarh was renowned for her ethereal beauty. A black magician named Singhia, who lived on the hill overlooking the fort, became obsessed with her.\n\nKnowing he stood no chance, Singhia decided to use his occult skills. One day, he saw the princess's maid buying scented oil in the market. Using black magic, he cast a spell on the oil so that upon touching the princess, she would be magnetically drawn to him.\n\nHowever, Ratnavati, who possessed some knowledge of the occult herself, sensed the trick. She took the bottle of oil and threw it onto a giant boulder nearby. The magic activated instantly, causing the boulder to roll and crush Singhia.\n\nAs he lay dying beneath the boulder, Singhia cursed the fort, declaring that Bhangarh would be ruined overnight, and no one would ever be able to live within its walls. The next year, a war broke out between Bhangarh and Ajabgarh. The palace was sacked, Princess Ratnavati died, and the city was completely abandoned. Local folklore holds that the ghosts of the princess and the magician still fight in the ruins under the moonlight.",
    type: "GHOST",
    author: "Arjun Dev",
    createdAt: "2026-06-15T12:00:00Z"
  },
  {
    id: "st-gue-mummy-legend",
    districtId: "dist-lahaul-spiti",
    districtName: "Lahaul and Spiti",
    stateSlug: "himachal-pradesh",
    districtSlug: "lahaul-and-spiti",
    title: "Sangha Tenzin: The Monk Who Died to Defeat a Locust Plague",
    slug: "monk-sangha-tenzin-mummy",
    content: "Gue is a remote border village that once lay on an ancient trade route. In the 15th century, the village fell victim to a devastating plague of crop-eating locusts. Desperate, the spiritual guide of the region, Lama Sangha Tenzin, made a supreme vow.\n\nHe decided to perform 'Sokushinbutsu', a rigorous self-mummification process. The monk entered a deep state of meditation called 'Samadhi'. Over several months, he slowly reduced his intake of food, eating only toxic seeds, nuts, and roots that eliminated body fat and poisoned his tissues, rendering his flesh toxic to decomposers.\n\nHe ran a bamboo tube into the ground to breathe while meditating. As his heartbeat slowed to a crawl, he chanted prayers for the village. On the day he passed away, legend says a giant rainbow appeared over Gue, and the locust plague vanished instantly.\n\nHis body was preserved in a small chamber under the earth. In 1975, a major earthquake struck Spiti Valley, cracking open the chamber. Border security forces patrolling the region spotted the mummy and brought it to light, discovering the monk still sitting upright in his meditative posture.",
    type: "FOLKLORE",
    author: "Tenzin Gyatso",
    createdAt: "2026-07-01T10:00:00Z"
  },
  {
    id: "st-root-bridge-origin",
    districtId: "dist-east-khasi-hills",
    districtName: "East Khasi Hills",
    stateSlug: "meghalaya",
    districtSlug: "east-khasi-hills",
    title: "The Living Root Bridges: Knitted Ancestral Wisdom",
    slug: "living-root-bridges-khasi-history",
    content: "For centuries, the Khasi tribes faced a massive logistical challenge during monsoons. The torrential rains would turn small forest streams into raging, impassable torrents. Wooden bridges would rot in the high humidity within a season, and bamboo structures were washed away.\n\nObserving the aerial root system of the Ficus elastica (Rubber tree), tribal elders devised an ingenious, long-term solution. Instead of cutting wood, they decided to 'grow' bridges.\n\nThey hollowed out betel nut tree trunks and placed them across the streams. They then directed the thin, tender aerial roots of rubber trees through these hollow trunks. Over 15 to 20 years, the roots crossed the stream, anchored themselves into the soil on the opposite bank, and grew thick and strong.\n\nTo make the walkway, they placed flat river stones between the interwoven roots. These bridges do not decay; instead, they grow stronger with age. Some of the living root bridges in East Khasi Hills are over 200 years old, capable of supporting the weight of 50 people at once. It is a monument to patience, passed down across generations.",
    type: "HISTORY",
    author: "Daphne Pyngrope",
    createdAt: "2026-05-20T14:30:00Z"
  }
];

const SEED_FOODS: Food[] = [
  {
    id: "fd-jadoh",
    districtId: "dist-east-khasi-hills",
    districtName: "East Khasi Hills",
    stateSlug: "meghalaya",
    districtSlug: "east-khasi-hills",
    name: "Jadoh (Khasi Red Rice & Meat)",
    type: "TRADITIONAL",
    description: "Jadoh is the ultimate comfort food of the Khasi tribe. It is a flavorful rice dish made with short-grained Jadoh red rice, cooked with pork or chicken stock, ginger, onions, black pepper, and sometimes traditional spices. It has a rich, earthy flavor.",
    recipe: "Red rice is washed and soaked. Pork fat or mustard oil is heated in a pot. Chopped ginger, onions, and black pepper are sautéed. Pork chunks are added and browned. The red rice is added and stirred with pork blood or stock. Water is poured, and it is simmered on woodfire until fully cooked and fluffy.",
    shops: [
      { name: "Trattoria Restaurant", location: "Police Bazar, Shillong", price: "₹120" },
      { name: "Jadoh Local Stall", location: "Sohra Market Road", price: "₹80" }
    ],
    priceRange: "$",
    images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "fd-siddu",
    districtId: "dist-lahaul-spiti",
    districtName: "Lahaul and Spiti",
    stateSlug: "himachal-pradesh",
    districtSlug: "lahaul-and-spiti",
    name: "Siddu (Steamed Stuffed Bread)",
    type: "TRADITIONAL",
    description: "Siddu is a traditional Himachali wheat bun stuffed with a paste of poppy seeds, walnuts, and local spices. It is steamed for hours and served hot, generously drenched in pure desi ghee.",
    recipe: "Wheat flour dough is kneaded with yeast and left to ferment for hours. A filling is made by grinding soaked poppy seeds, walnuts, green chilies, coriander, and spices. The dough is rolled, stuffed, sealed, and steamed. Served sliced, soaked in hot ghee.",
    shops: [
      { name: "Pahadi Rasoi", location: "Kaza Main Bazar", price: "₹60" }
    ],
    priceRange: "$",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "fd-kalakand",
    districtId: "dist-alwar",
    districtName: "Alwar",
    stateSlug: "rajasthan",
    districtSlug: "alwar",
    name: "Alwar Kalakand (Milk Cake)",
    type: "SWEET",
    description: "Alwar is globally famous for its Kalakand, a rich, grainy milk sweet made by curdling boiling milk and sweetening it. It is cooked slowly on traditional charcoal furnaces, giving it a caramelized dark brown core.",
    recipe: "Full fat milk is boiled and reduced. Citric acid is added in small quantities to curdle the milk partially to form grains. Sugar is added, and it is continuously stirred until sticky and thick. It is poured into deep moulds, wrapped to trap heat for slow cooling, which forms the signature brown center.",
    shops: [
      { name: "Baba Thakur Das & Sons", location: "Hope Circus, Alwar", price: "₹450/kg" }
    ],
    priceRange: "$$",
    images: ["https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80"]
  }
];

const SEED_BLOGS: Blog[] = [
  {
    id: "bl-meghalaya-monsoon",
    title: "Chasing Monsoons: 5 Days in the Rainiest Highlands",
    slug: "chasing-monsoons-meghalaya-guide",
    summary: "An intensive travel itinerary to witness Meghalaya's hidden waterfalls and rainforest root bridges at the peak of the monsoon season.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80",
    author: "Rohit Sen",
    readTime: "6 min read",
    createdAt: "2026-07-10T08:00:00Z",
    content: "Monsoon in Meghalaya is not just weather; it is an immersive experience. While conventional travel guides advise against visiting during rain, that is exactly when the waterfalls come alive. In this guide, we map out a 5-day route covering the hidden waterfalls of Cherrapunji, the cave systems of Mawsynram, and the quiet homestays in Mawlynnong village. Learn how to gear up, navigate muddy village stairs, and find local guides who know the paths through dense fog."
  },
  {
    id: "bl-bhangarh-safety",
    title: "Bhangarh Fort: Legends vs Reality of India's Most Haunted Site",
    slug: "bhangarh-fort-haunted-facts-guide",
    summary: "Is Bhangarh truly haunted? We explore the archaeological facts, historical records, and the dark sorcerer legends surrounding the ruins.",
    category: "History",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    author: "Anjali Sharma",
    readTime: "8 min read",
    createdAt: "2026-06-28T09:30:00Z",
    content: "Bhangarh is unique because the supernatural legends are actively supported by government warnings. In this article, we separate myth from history. We read the 17th-century court records of Raja Madho Singh, look at the brilliant town planning of the ruined city (including the dancers' bazaar and temples), and discuss the practical safety reasons behind the ASI ban on night entry, including wild animals and structure safety."
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    placeId: "pl-wei-sawdong",
    placeName: "Wei Sawdong Waterfall",
    userName: "Vikram Malhotra",
    rating: 5,
    content: "Absolutely magical! The descent is extremely steep, but the view of the three tiers is worth every single step. Water was chilly and crystal clear.",
    isApproved: true,
    createdAt: "2026-07-12T10:00:00Z"
  },
  {
    id: "rev-2",
    placeId: "pl-bhangarh-fort",
    placeName: "Bhangarh Haunted Fort",
    userName: "Priya Das",
    rating: 4,
    content: "Very impressive architecture. The temple carvings are beautiful. Didn't see any ghosts, but the monkeys near the entrance are definitely aggressive! Make sure to carry a stick.",
    isApproved: true,
    createdAt: "2026-07-05T14:20:00Z"
  }
];

// ==========================================
// CORE DATABASE OPERATIONS (localStorage check)
// ==========================================

export class MockDatabase {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  private static get<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(val);
  }

  private static set<T>(key: string, value: T): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Init/Reset Seed Data
  public static init(): void {
    this.get("states", SEED_STATES);
    this.get("districts", SEED_DISTRICTS);
    this.get("places", SEED_PLACES);
    this.get("stories", SEED_STORIES);
    this.get("foods", SEED_FOODS);
    this.get("blogs", SEED_BLOGS);
    this.get("reviews", MOCK_REVIEWS);
    this.get("journals", [] as Journal[]);
    this.get("bookmarks", [] as Bookmark[]);
    this.get("visited", [] as VisitedPlace[]);
    
    // Setup current user
    this.get("currentUser", {
      id: "usr-guest",
      email: "traveler@hiddenindia.com",
      name: "Abhinav Singh",
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      createdAt: new Date().toISOString()
    } as User);
  }

  // --- STATES ---
  public static getStates(): State[] {
    return this.get("states", SEED_STATES);
  }

  public static getState(slug: string): State | undefined {
    return this.getStates().find((s) => s.slug === slug);
  }

  public static addState(state: Omit<State, "id">): State {
    const states = this.getStates();
    const newState = { ...state, id: `st-${Date.now()}` };
    states.push(newState);
    this.set("states", states);
    return newState;
  }

  // --- DISTRICTS ---
  public static getDistricts(): District[] {
    return this.get("districts", SEED_DISTRICTS);
  }

  public static getDistrict(stateSlug: string, distSlug: string): District | undefined {
    return this.getDistricts().find((d) => d.stateSlug === stateSlug && d.slug === distSlug);
  }

  public static getDistrictsByState(stateId: string): District[] {
    return this.getDistricts().filter((d) => d.stateId === stateId);
  }

  public static addDistrict(dist: Omit<District, "id">): District {
    const districts = this.getDistricts();
    const newDist = { ...dist, id: `dist-${Date.now()}` };
    districts.push(newDist);
    this.set("districts", districts);
    return newDist;
  }

  // --- PLACES ---
  public static getPlaces(): Place[] {
    return this.get("places", SEED_PLACES);
  }

  public static getPlace(slug: string): Place | undefined {
    return this.getPlaces().find((p) => p.slug === slug);
  }

  public static getPlacesByDistrict(districtId: string): Place[] {
    return this.getPlaces().filter((p) => p.districtId === districtId);
  }

  public static getPlacesByCategory(category: string): Place[] {
    return this.getPlaces().filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  public static searchPlaces(query: string): Place[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.getPlaces().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.districtName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  public static addPlace(place: Omit<Place, "id">): Place {
    const places = this.getPlaces();
    const newPlace = { ...place, id: `pl-${Date.now()}` };
    places.push(newPlace);
    this.set("places", places);
    return newPlace;
  }

  // --- FOODS ---
  public static getFoods(): Food[] {
    return this.get("foods", SEED_FOODS);
  }

  public static getFoodsByDistrict(districtId: string): Food[] {
    return this.getFoods().filter((f) => f.districtId === districtId);
  }

  public static addFood(food: Omit<Food, "id">): Food {
    const foods = this.getFoods();
    const newFood = { ...food, id: `fd-${Date.now()}` };
    foods.push(newFood);
    this.set("foods", foods);
    return newFood;
  }

  // --- STORIES ---
  public static getStories(): Story[] {
    return this.get("stories", SEED_STORIES);
  }

  public static getStoriesByDistrict(districtId: string): Story[] {
    return this.getStories().filter((s) => s.districtId === districtId);
  }

  public static addStory(story: Omit<Story, "id">): Story {
    const stories = this.getStories();
    const newStory = { ...story, id: `st-${Date.now()}` };
    stories.push(newStory);
    this.set("stories", stories);
    return newStory;
  }

  // --- REVIEWS ---
  public static getReviews(placeId: string): Review[] {
    return this.get("reviews", MOCK_REVIEWS).filter((r) => r.placeId === placeId && r.isApproved);
  }

  public static getAllReviews(): Review[] {
    return this.get("reviews", MOCK_REVIEWS);
  }

  public static addReview(review: Omit<Review, "id" | "isApproved" | "createdAt">): Review {
    const reviews = this.get("reviews", MOCK_REVIEWS);
    const newReview = {
      ...review,
      id: `rev-${Date.now()}`,
      isApproved: true, // Auto-approve in mock mode for instant feedback
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    this.set("reviews", reviews);
    return newReview;
  }

  public static approveReview(reviewId: string): void {
    const reviews = this.getAllReviews();
    const idx = reviews.findIndex((r) => r.id === reviewId);
    if (idx > -1) {
      reviews[idx].isApproved = true;
      this.set("reviews", reviews);
    }
  }

  public static deleteReview(reviewId: string): void {
    const reviews = this.getAllReviews();
    const filtered = reviews.filter((r) => r.id !== reviewId);
    this.set("reviews", filtered);
  }

  // --- USER AUTHENTICATION ---
  public static getCurrentUser(): User | null {
    return this.get("currentUser", null as User | null);
  }

  public static loginUser(email: string, name: string): User {
    const user = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role: "USER" as Role,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString()
    };
    this.set("currentUser", user);
    return user;
  }

  public static logout(): void {
    this.set("currentUser", null);
  }

  // --- BOOKMARKS & VISITED ---
  public static getBookmarks(userId: string): Bookmark[] {
    return this.get("bookmarks", [] as Bookmark[]).filter((b) => b.userId === userId);
  }

  public static toggleBookmark(userId: string, placeId: string): boolean {
    const bookmarks = this.get("bookmarks", [] as Bookmark[]);
    const idx = bookmarks.findIndex((b) => b.userId === userId && b.placeId === placeId);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      this.set("bookmarks", bookmarks);
      return false; // Removed
    } else {
      bookmarks.push({ id: `bm-${Date.now()}`, userId, placeId });
      this.set("bookmarks", bookmarks);
      return true; // Added
    }
  }

  public static getVisited(userId: string): VisitedPlace[] {
    return this.get("visited", [] as VisitedPlace[]).filter((v) => v.userId === userId);
  }

  public static toggleVisited(userId: string, placeId: string): boolean {
    const visited = this.get("visited", [] as VisitedPlace[]);
    const idx = visited.findIndex((v) => v.userId === userId && v.placeId === placeId);
    if (idx > -1) {
      visited.splice(idx, 1);
      this.set("visited", visited);
      return false;
    } else {
      visited.push({ id: `vp-${Date.now()}`, userId, placeId });
      this.set("visited", visited);
      return true;
    }
  }

  // --- JOURNALS ---
  public static getJournals(userId: string): Journal[] {
    return this.get("journals", [] as Journal[]).filter((j) => j.userId === userId);
  }

  public static addJournal(userId: string, title: string, content: string, images: string[], visitedDate: string): Journal {
    const journals = this.get("journals", [] as Journal[]);
    const newJournal = {
      id: `jrn-${Date.now()}`,
      userId,
      title,
      content,
      images,
      visitedDate,
      createdAt: new Date().toISOString()
    };
    journals.unshift(newJournal);
    this.set("journals", journals);
    return newJournal;
  }

  public static deleteJournal(id: string): void {
    const journals = this.get("journals", [] as Journal[]);
    const filtered = journals.filter((j) => j.id !== id);
    this.set("journals", filtered);
  }

  // --- BLOGS ---
  public static getBlogs(): Blog[] {
    return this.get("blogs", SEED_BLOGS);
  }

  public static getBlog(slug: string): Blog | undefined {
    return this.getBlogs().find((b) => b.slug === slug);
  }
}
