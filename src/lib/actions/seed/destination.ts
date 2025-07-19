"use server";

import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import slugify from "slugify";

const imageUrls = [
  "https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYWtlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1747118435378-50b16d63dd4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717054493682-ffe9e25fd82f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHZpbGxhZ2UlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623492701360-fb4a1205c789?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const getRandomRating = () => parseFloat((Math.random() * 4 + 1).toFixed(1));

const categoriesPool = [
  "Mountain",
  "Hill Station",
  "City",
  "Village",
  "Pilgrimage",
  "Adventure",
  "Wildlife",
  "Cultural Heritage",
  "Natural Attraction",
] as const;

type Category = (typeof categoriesPool)[number];

const getRandomCategories = (): Category[] => {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...categoriesPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const destinationsList: { name: string; region: string }[] = [
  { name: "Kathmandu Durbar Square", region: "Kathmandu, Nepal" },
  { name: "Patan Durbar Square", region: "Lalitpur, Nepal" },
  { name: "Bhaktapur Durbar Square", region: "Bhaktapur, Nepal" },
  { name: "Nagarkot Sunrise Point", region: "Nagarkot, Bhaktapur, Nepal" },
  { name: "Phewa Lake", region: "Pokhara, Kaski, Nepal" },
  { name: "Annapurna Base Camp", region: "Annapurna Region, Nepal" },
  { name: "Maya Devi Temple", region: "Lumbini, Rupandehi, Nepal" },
  { name: "Langtang Valley", region: "Langtang, Rasuwa, Nepal" },
  { name: "Rara Lake", region: "Rara, Mugu, Nepal" },
  { name: "Bandipur Bazaar", region: "Bandipur, Tanahun, Nepal" },
];

export const seedDestinations = async () => {
  const destinations = destinationsList.map((loc, idx) => {
    const categories = getRandomCategories();

    return {
      name: loc.name,
      slug: slugify(loc.name, { lower: true }),
      region: loc.region,
      categories,
      shortDescription: `Discover the beauty of ${loc.name} in ${loc.region}.`,
      longDescription: `${loc.name} is a remarkable destination in ${loc.region}, offering travelers a unique blend of culture, nature, and unforgettable experiences. From scenic landscapes to deep spiritual roots, this location provides a perfect escape into the heart of Nepal's rich heritage. Whether you're an adventurer or a peace-seeker, ${loc.name} promises something memorable for every visitor.`,
      image: imageUrls[idx % imageUrls.length],
      averageRating: getRandomRating(),
      reviewCount: 0,
      featured: false,
    };
  });

  try {
    await dbConnect();
    await Destination.deleteMany({});
    await Destination.insertMany(destinations);
    console.log(
      "✅ Destinations seeded with public transport, personal vehicle, and trek data!",
    );
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};
