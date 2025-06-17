"use server";

import Destination from "@/model/Destination";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import mongoose from "mongoose";
import Review from "@/model/Review";

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
    averageRating: getRandomRating(),
  }));

  try {
    await dbConnect();
    await Destination.deleteMany({});
    await Destination.insertMany(destinations);
    console.log("✅ 50 Nepali destinations seeded with refined region format!");
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
    firstDestination.averageRating = (totalRatings / reviews.length);
    await firstDestination.save();

    console.log("✅ 50 reviews seeded!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};
