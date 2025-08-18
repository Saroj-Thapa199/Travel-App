"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Collection from "@/model/Collection";
import Destination from "@/model/Destination";
import Favorite from "@/model/Favorite";
import slugify from "slugify";

const imageUrls = [
  "https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1747118435378-50b16d63dd4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1717054493682-ffe9e25fd82f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1623492701360-fb4a1205c789?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
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

// 🎯 Activities pool
const activitiesPool = [
  "Hiking",
  "Trekking",
  "Boating",
  "Wildlife Safari",
  "Cultural Tour",
  "Photography",
  "Camping",
  "Paragliding",
  "Sightseeing",
];

// Helper: random activities
const getRandomActivities = (): string[] => {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...activitiesPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 🎯 Highlights generator
const getHighlights = (name: string, region: string) => {
  const highlightTemplates = [
    `Breathtaking sunrise and sunset views at ${name}`,
    `Rich cultural and historical significance in ${region}`,
    `Panoramic Himalayan landscapes and natural beauty`,
    `Opportunities for adventure and exploration`,
    `Unique local traditions and warm hospitality`,
    `Perfect escape for peace-seekers and nature lovers`,
  ];
  const shuffled = [...highlightTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 3).map((h) => ({
    title: h.split(" ")[0] + " Highlight",
    description: h,
  }));
};

const destinationsList: {
  name: string;
  region: string;
  budget: string;
  bestSeason: string[];
}[] = [
  {
    name: "Nagarkot Sunrise Point",
    region: "Nagarkot, Bhaktapur, Nepal",
    budget: "NPR 2,000-3,500",
    bestSeason: ["Spring", "Autumn", "Winter"],
  },
  {
    name: "Phewa Lake",
    region: "Pokhara, Kaski, Nepal",
    budget: "NPR 3,000-5,000",
    bestSeason: ["Spring", "Autumn", "Winter"],
  },
  {
    name: "Annapurna Base Camp",
    region: "Annapurna Region, Nepal",
    budget: "NPR 10,000-15,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Maya Devi Temple",
    region: "Lumbini, Rupandehi, Nepal",
    budget: "NPR 3,000-4,000",
    bestSeason: ["Year-round"],
  },
  {
    name: "Langtang Valley",
    region: "Langtang, Rasuwa, Nepal",
    budget: "NPR 8,000-12,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Rara Lake",
    region: "Rara, Mugu, Nepal",
    budget: "NPR 12,000-20,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Bandipur Bazaar",
    region: "Bandipur, Tanahun, Nepal",
    budget: "NPR 2,000-4,000",
    bestSeason: ["Spring", "Autumn", "Winter"],
  },
  {
    name: "Gosaikunda Lake",
    region: "Langtang National Park, Rasuwa, Nepal",
    budget: "NPR 7,000-10,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Tilicho Lake",
    region: "Manang, Nepal",
    budget: "NPR 10,000-18,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Upper Mustang",
    region: "Mustang, Nepal",
    budget: "NPR 20,000-35,000",
    bestSeason: ["Spring", "Autumn", "Summer"],
  },
  {
    name: "Chitwan National Park",
    region: "Chitwan, Nepal",
    budget: "NPR 5,000-8,000",
    bestSeason: ["Winter", "Spring", "Autumn"],
  },
  {
    name: "Bardiya National Park",
    region: "Bardiya, Nepal",
    budget: "NPR 6,000-10,000",
    bestSeason: ["Winter", "Spring"],
  },
  {
    name: "Tansen Bazaar",
    region: "Palpa, Nepal",
    budget: "NPR 2,500-4,500",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Khaptad National Park",
    region: "Far-Western Nepal",
    budget: "NPR 8,000-15,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Phulchowki Hill",
    region: "Godawari, Lalitpur, Nepal",
    budget: "NPR 1,000-2,000",
    bestSeason: ["Spring", "Winter"],
  },
  {
    name: "Ilam Tea Gardens",
    region: "Ilam, Nepal",
    budget: "NPR 4,000-6,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Kalinchowk Bhagwati Temple",
    region: "Dolakha, Nepal",
    budget: "NPR 3,000-6,000",
    bestSeason: ["Winter", "Spring"],
  },
  {
    name: "Pathivara Temple",
    region: "Taplejung, Nepal",
    budget: "NPR 6,000-10,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Shree Antu Danda",
    region: "Ilam, Nepal",
    budget: "NPR 3,000-5,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Daman View Tower",
    region: "Makwanpur, Nepal",
    budget: "NPR 1,500-3,000",
    bestSeason: ["Spring", "Winter"],
  },
  {
    name: "Sailung Hill",
    region: "Dolakha/Ramechhap, Nepal",
    budget: "NPR 2,000-4,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Chandragiri Hills",
    region: "Kathmandu, Nepal",
    budget: "NPR 1,500-3,000",
    bestSeason: ["Year-round"],
  },
  {
    name: "Bhedetar",
    region: "Dhankuta, Nepal",
    budget: "NPR 3,000-5,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Kanyam Tea Garden",
    region: "Ilam, Nepal",
    budget: "NPR 3,000-5,000",
    bestSeason: ["Spring", "Autumn"],
  },
  {
    name: "Tharu Village Tour",
    region: "Chitwan, Nepal",
    budget: "NPR 3,000-5,000",
    bestSeason: ["Winter", "Spring"],
  },
];

export const seedDestinations = async () => {
  const session = await auth();
  if (!session || !session.user.id) return;

  const destinations = destinationsList.map((loc, idx) => {
    const categories = getRandomCategories();

    return {
      name: loc.name,
      user: session.user.id,
      slug: slugify(loc.name, { lower: true }),
      region: loc.region,
      categories,
      bestSeason: loc.bestSeason,
      shortDescription: `Discover the beauty of ${loc.name} in ${loc.region}.`,
      longDescription: `${loc.name} is a remarkable destination in ${loc.region}, offering travelers a unique blend of culture, nature, and unforgettable experiences. From scenic landscapes to deep spiritual roots, this location provides a perfect escape into the heart of Nepal's rich heritage. Whether you're an adventurer or a peace-seeker, ${loc.name} promises something memorable for every visitor.`,
      image: imageUrls[idx % imageUrls.length],
      budget: loc.budget,
      averageRating: getRandomRating(),
      reviewCount: 0,
      featured: false,
      activities: getRandomActivities(),
      highlights: getHighlights(loc.name, loc.region),
    };
  });

  try {
    await dbConnect();

    await Destination.deleteMany({});
    await Favorite.deleteMany();
    await Collection.deleteMany();

    const createdDestinations = await Destination.insertMany(destinations);

    const favorites = createdDestinations.map((destination) => ({
      user: session.user.id,
      destination: destination._id,
    }));

    await Favorite.insertMany(favorites);
    await Collection.create({
      name: "Sample Collection",
      description: "Description for sample collection",
      visibility: "public",
      destinations: createdDestinations.map((destination) => destination._id),
      user: session.user.id,
    });

    console.log("✅ Destinations seeded with activities and highlights!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};
