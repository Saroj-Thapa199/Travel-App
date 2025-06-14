"use server"

import Destination from "@/model/Destination";
import dbConnect from "../dbConnect";


const imageUrls = [
  "https://5yeh6d47mm.ufs.sh/f/tVQQQp1yyJVmoFYcdF1hAl0tn5eV4GcH2zZRJakNQOiwLBbr",
  "https://5yeh6d47mm.ufs.sh/f/tVQQQp1yyJVmMZ6xnfv7JrTDHf0yWvus1A5hq9zaeLVgQiOc",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getRandomRating(): number {
  const num = Math.floor(Math.random() * 51) / 10; // gives 0.0 to 5.0 in 0.1 steps
  return num % 1 === 0 ? num : parseFloat(num.toFixed(1));
}


export const seedDestinations = async () => {
  const list: { name: string; region: string }[] = [
    { name: "Kathmandu Durbar Square", region: "Kathmandu, Kathmandu, Nepal" },
    { name: "Patan Durbar Square", region: "Lalitpur, Lalitpur, Nepal" },
    { name: "Bhaktapur Durbar Square", region: "Bhaktapur, Bhaktapur, Nepal" },
    { name: "Nagarkot Sunrise Point", region: "Nagarkot, Bhaktapur, Nepal" },
    {
      name: "Dhulikhel View Tower",
      region: "Dhulikhel, Kavrepalanchok, Nepal",
    },
    {
      name: "Chandragiri Hills Cable Car",
      region: "Thankot, Kathmandu, Nepal",
    },
    { name: "Shivapuri Peak", region: "Budhanilkantha, Kathmandu, Nepal" },
    { name: "Chitwan National Park", region: "Chitwan, Chitwan, Nepal" },
    { name: "Phewa Lake, Pokhara", region: "Pokhara, Kaski, Nepal" },
    { name: "Sarangkot Hill", region: "Sarangkot, Kaski, Nepal" },
    { name: "Begnas Lake", region: "Begnas Lake, Kaski, Nepal" },
    { name: "Gosaikunda Lake", region: "Gosaikunda, Rasuwa, Nepal" },
    { name: "Langtang Valley", region: "Langtang, Rasuwa, Nepal" },
    { name: "Syabrubesi", region: "Syabrubesi, Rasuwa, Nepal" },
    { name: "Everest Base Camp", region: "Everest Region, Solukhumbu, Nepal" },
    { name: "Namche Bazaar", region: "Namche Bazaar, Solukhumbu, Nepal" },
    { name: "Gokyo Lakes", region: "Gokyo, Solukhumbu, Nepal" },
    { name: "Muktinath Temple", region: "Muktinath, Mustang, Nepal" },
    { name: "Jomsom Valley", region: "Jomsom, Mustang, Nepal" },
    { name: "Upper Mustang", region: "Lo Manthang, Mustang, Nepal" },
    { name: "Tilicho Lake", region: "Tilicho, Manang, Nepal" },
    { name: "Manang Village", region: "Manang, Manang, Nepal" },
    { name: "Annapurna Base Camp", region: "Annapurna Region, Nepal" },
    { name: "Ghandruk", region: "Ghandruk, Kaski, Nepal" },
    { name: "Bandipur Bazaar", region: "Bandipur, Tanahun, Nepal" },
    { name: "Maya Devi Temple, Lumbini", region: "Lumbini, Rupandehi, Nepal" },
    { name: "Janaki Temple, Janakpur", region: "Janakpur, Dhanusha, Nepal" },
    { name: "Chandragiri Temple, Dharan", region: "Dharan, Sunsari, Nepal" },
    { name: "Bardiya National Park", region: "Thakurdwara, Bardiya, Nepal" },
    { name: "Rara Lake", region: "Rara, Mugu, Nepal" },
    { name: "Khaptad National Park", region: "Khaptad, Doti, Nepal" },
    { name: "Makalu Base Camp", region: "Makalu Barun, Sankhuwasabha, Nepal" },
    { name: "Taplejung Bazaar", region: "Taplejung, Taplejung, Nepal" },
    { name: "Ilām Tea Gardens", region: "Ilam, Ilam, Nepal" },
    { name: "Panchthar Bazaar", region: "Panchthar, Panchthar, Nepal" },
    { name: "Dhorpatan Hunting Reserve", region: "Dhorpatan, Myagdi, Nepal" },
    { name: "Tansen Bazaar", region: "Tansen, Palpa, Nepal" },
    { name: "Palpa Bazaar", region: "Palpa, Palpa, Nepal" },
    { name: "Dhankuta Bazaar", region: "Dhankuta, Dhankuta, Nepal" },
    { name: "Tsum Valley", region: "Tsum Valley, Gorkha, Nepal" },
    { name: "Gorkha Durbar", region: "Gorkha Bazaar, Gorkha, Nepal" },
    { name: "Besisahar Gate", region: "Besisahar, Lamjung, Nepal" },
    {
      name: "Muktinath Temple Trail",
      region: "Besisahar–Jomsom, Lamjung/Manang, Nepal",
    },
    { name: "Kakani View Point", region: "Kakani, Nuwakot, Nepal" },
    { name: "Nuwakot Durbar", region: "Nuwakot, Nuwakot, Nepal" },
    { name: "Rasuwa Gadhi Checkpoint", region: "Rasuwa Gadhi, Rasuwa, Nepal" },
    { name: "Barpak Village", region: "Barpak, Gorkha, Nepal" },
    { name: "Halesi Mahadev Temple", region: "Halesi, Khotang, Nepal" },
  ];

  const destinations = list.map((loc, idx) => ({
    name: loc.name,
    slug: slugify(loc.name),
    region: loc.region,
    shortDescription: `Discover the beauty of ${loc.name} in ${loc.region}.`,
    longDescription: `Explore ${loc.name}, located in ${loc.region}. Enjoy the blend of cultural richness, scenic beauty, and unforgettable experiences.`,
    image: imageUrls[idx % imageUrls.length],
    averageRating: getRandomRating()
  }));

  try {
    await dbConnect();
    await Destination.deleteMany({});
    await Destination.insertMany(destinations);
    console.log("✅ 50 Nepali destinations seeded with refined region format!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
}

export const seedReviews = async () => {
    console.log("reviews seeded")
}
