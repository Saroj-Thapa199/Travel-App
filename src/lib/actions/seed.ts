"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import Review from "@/model/Review";
import slugify from "slugify";

// Dummy images and utilities
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

const personalVehicleSamples = [
  {
    startingPoint: "Kathmandu",
    route: "Kathmandu - Dhulikhel",
    approxTime: "1.5 hrs",
    roadCondition: "Good",
  },
  {
    startingPoint: "Pokhara",
    route: "Pokhara - Sarangkot",
    approxTime: "45 mins",
    roadCondition: "Paved",
  },
  {
    startingPoint: "Chitwan",
    route: "Chitwan - Sauraha",
    approxTime: "30 mins",
    roadCondition: "Gravel",
  },
  {
    startingPoint: "Butwal",
    route: "Butwal - Lumbini",
    approxTime: "1 hr",
    roadCondition: "Moderate",
  },
];

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

    const publicTransport = [
      {
        from: "Kathmandu",
        to: loc.name,
        approxTime: "3 hrs",
        fare: 300,
        busTypes: ["Deluxe", "Local"],
        lastDeparture: "6:00 PM",
        note: "Hourly departures from the main bus park.",
      },
      {
        from: "Pokhara",
        to: loc.name,
        approxTime: "4 hrs",
        fare: 500,
        busTypes: ["Tourist Bus", "Local"],
        lastDeparture: "5:30 PM",
        note: "Limited service on weekends.",
      },
    ];

    const personalVehicle = [...personalVehicleSamples]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const trek =
      categories.includes("Mountain") || categories.includes("Adventure")
        ? {
            startingPoint: "Base Camp",
            duration: "3 days",
            distance: 25,
            difficulty: "Moderate",
            altitudeGain: 1500,
            maxAltitude: 4000,
            trailDescription:
              "The trail passes through dense forests, rivers, and mountain ridges.",
            checkpoints: ["Checkpoint 1", "Checkpoint 2"],
            permits: ["TIMS", "Annapurna Permit"],
            note: "Best done in spring or autumn.",
          }
        : undefined;

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
      destinationRoute: {
        publicTransport,
        personalVehicle,
        trek,
      },
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

const reviewsData = [
  "A bit pricey for food but the quality was good.",
  "Spending a week here was a life-changing experience. The combination of breathtaking natural beauty, peaceful atmosphere, and warm hospitality from locals made this destination unforgettable. I especially loved the morning hikes, where the mist over the valleys created an almost mystical feeling.",
  "I was amazed by the richness of the local culture and traditions. The guided tour took us through several small villages where we met artisans and learned about their crafts. The food was authentic and delicious, and the people were incredibly welcoming. Definitely a place that touches your heart.",
  "Found some amazing spots for meditation and reflection.",
  "The weather was perfect during my visit.",
  "The night skies here are spectacular. I spent several evenings stargazing and was amazed by the clarity and number of stars visible.",
  "The guide was knowledgeable and friendly.",
  "The flora and fauna were incredible to observe.",
  "A true hidden gem. Despite its beauty, the place remains uncrowded, which made the experience all the more special.",
  "While the journey to get here was a bit tough, every step was worth it. The trails wind through dense forests, across clear streams, and up to viewpoints that offer jaw-dropping vistas of the Himalayan peaks. The local guides were knowledgeable and made sure we had a safe and enjoyable trip.",
  "I visited during the spring bloom and was amazed by the vibrant rhododendrons covering the hillsides. Nature lovers will find this place a paradise.",
  "This place offers a perfect escape from the hustle and bustle of everyday life. The serene environment and the panoramic mountain views provided a perfect backdrop for relaxation and reflection. The hiking trails were well-maintained and offered varying levels of difficulty, which was great for our group.",
  "The hikes were challenging but rewarding. Each viewpoint offered new perspectives on the majestic mountain range. The experience felt both adventurous and peaceful at the same time.",
  "It felt like stepping into a postcard.",
  "Perfect place to disconnect from technology and reconnect with nature. I left feeling more grounded and at peace than I have in years.",
  "Can’t wait to come back next season!",
  "The serene atmosphere here is unmatched. Waking up to birdsong and fresh mountain air was so refreshing. I spent hours just soaking in the views and felt completely rejuvenated by the end of my stay.",
  "The friendly guides and locals made all the difference. Their stories and kindness added so much value to my trip.",
  "Perfect spot for nature lovers and photographers.",
  "Plenty of wildlife sightings along the way.",
  "The local cuisine was a delicious surprise. Fresh, hearty meals that fueled my hikes and left me eager to explore more.",
  "Could spend days just exploring the area.",
  "The peaceful atmosphere was exactly what I needed.",
  "Found the perfect spot for a picnic with friends.",
  "Loved the variety of wildflowers in bloom.",
  "The views of the Himalayas were simply awe-inspiring.",
  "The locals were friendly and welcoming.",
  "The combination of pristine nature, challenging hikes, and spiritual landmarks makes this destination truly special. The temple on the hilltop was a peaceful place to meditate, and the views from the summit are some of the best I have ever seen. I plan to return every year to recharge my mind and soul.",
  "Exploring the villages around was a highlight. I loved learning about the traditional crafts and sharing meals with local families. It made the trip so authentic and memorable.",
  "The wildlife sightings were incredible — from colorful birds to shy mountain goats. Every day was a new discovery.",
  "The historical sites added a lot of depth to the visit.",
  "The waterfalls in the area were a highlight.",
  "The sunset views were breathtaking!",
  "Loved the fresh mountain air and quiet surroundings.",
  "The signage on trails could be better.",
  "Could hear birds chirping all day long.",
  "The temples nearby added a spiritual touch.",
  "Not very crowded, which made the experience more enjoyable.",
  "The village nearby had some charming little shops.",
  "Great place to disconnect and relax.",
  "Would definitely recommend to friends and family.",
  "Roads getting there were rough but manageable.",
  "The accommodations were cozy and clean.",
  "The air felt so clean and refreshing.",
  "Perfect place to capture sunrise photos.",
  "A peaceful retreat from the city hustle.",
  "Ideal place for a weekend getaway.",
  "The quietness allowed me to reconnect with myself.",
  "Felt very safe throughout the trip.",
  "Wish there were more food options nearby.",
];
export const seedReviews = async () => {
  try {
    const session = await auth();
    if (!session) return;
    await dbConnect();
    const firstDestination = await Destination.findOne();
    if (!firstDestination) {
      throw Error("No any destinations");
    }
    let ratings: number[] = [];
    const reviews = reviewsData.map((review) => {
      const randomRating = Math.floor(Math.random() * 5 + 1);
      ratings.push(randomRating);
      return {
        user: session.user.id,
        destination: firstDestination._id,
        rating: randomRating,
        comment: review,
      };
    });
    await Review.deleteMany();
    await Review.insertMany(reviews);
    const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    firstDestination.reviewCount = reviews.length;
    firstDestination.averageRating = totalRatings / reviews.length;
    await firstDestination.save();
    console.log("✅ 50 reviews seeded!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};
