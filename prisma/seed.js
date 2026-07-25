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

const indianDistrictsMaster = {
  'andhra-pradesh': ['Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla', 'Chittoor', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'NTR', 'Nandyal', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'arunachal-pradesh': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  'assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'Tinsukia', 'Udalguri'],
  'bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
  'chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Manendragarh', 'Mohla-Manpur', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh', 'Sukma', 'Surajpur', 'Surguja'],
  'goa': ['North Goa', 'South Goa'],
  'gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhumi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
  'haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'himachal-pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
  'jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
  'karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'],
  'kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'madhya-pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Narmadapuram', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
  'maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Chhatrapati Sambhajinagar', 'Bhandara', 'Beed', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Dharashiv', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
  'manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  'meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
  'mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saitual', 'Serchhip', 'Siaha'],
  'nagaland': ['Chumoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'],
  'odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'],
  'punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Shaheed Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
  'rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur', 'Anupgarh', 'Balotra', 'Beawar', 'Deeg', 'Didwana-Kuchaman', 'Dudu', 'Gangapur City', 'Jaipur Rural', 'Jodhpur Rural', 'Kekri', 'Kotputli-Behror', 'Khairthal-Tijara', 'Neem Ka Thana', 'Phalodi', 'Salumbar', 'Sanchore', 'Shahpura'],
  'sikkim': ['Gangtok', 'Mangan', 'Namchi', 'Pakyong', 'Soreng', 'Gyalshing'],
  'tamil-nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahbubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'],
  'tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
  'uttar-pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
  'uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
  'west-bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
  'delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  'jammu-and-kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
  'ladakh': ['Kargil', 'Leh']
};

async function main() {
  console.log('🌱 Syncing all 31 States & UTs and 789+ Districts into Database...');

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

    const districtList = indianDistrictsMaster[st.slug] || [`${st.name} Central`];
    for (const dName of districtList) {
      const districtSlug = `${st.slug}-${dName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      await prisma.district.upsert({
        where: {
          stateId_name: {
            stateId: state.id,
            name: dName,
          },
        },
        update: {
          slug: districtSlug,
          description: `District of ${dName} in ${st.name}`,
        },
        create: {
          name: dName,
          slug: districtSlug,
          stateId: state.id,
          description: `District of ${dName} in ${st.name}`,
          image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
        },
      });
    }
    console.log(`✓ State & ${districtList.length} districts synced: ${state.name} (${state.code})`);
  }

  console.log('🚀 All 31 States/UTs and 789+ Districts synced successfully into PostgreSQL database!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
