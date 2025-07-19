"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import MotorableRoute from "@/model/MotorableRoute";

const motorableRoutesMock = [
  {
    from: "Kathmandu",
    to: "Pokhara",
    distance: 200,
    duration: "6-8 hours",
    availableServices: ["Tourist Bus", "Deluxe Bus", "Jeep"],
    fareRange: "Rs. 700 - Rs. 1500",
    bookingInfo: "Available at Gongabu Bus Park or online via travel sites",
    frequency: "Every 30-60 minutes from 6am to 5pm",
    landmarks: ["Mugling", "Damauli", "Prithvi Highway"],
    route: "Kathmandu → Naubise → Mugling → Pokhara",
    roadCondition: {
      type: "Fair",
      description: "Mostly blacktopped, but prone to landslides in monsoon.",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Fuel stations available every 40-60 km.",
      recommendedStops: ["Naubise", "Mugling"],
    },
    warnings: [
      "Traffic congestion near Mugling",
      "Road narrowing near Damauli",
    ],
    note: "Beautiful river views along the way",
  },
  {
    from: "Kathmandu",
    to: "Chitwan (Sauraha)",
    distance: 170,
    duration: "5-7 hours",
    availableServices: ["Tourist Bus", "Deluxe Bus", "Jeep", "Microbus"],
    fareRange: "Rs. 500 - Rs. 1200",
    bookingInfo: "From Kalanki Bus Park or online portals",
    frequency: "Frequent departures from early morning",
    landmarks: ["Mugling", "Narayanghat"],
    route: "Kathmandu → Naubise → Mugling → Narayanghat → Sauraha",
    roadCondition: {
      type: "Good",
      description: "Well-maintained highway",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Frequent stations",
      recommendedStops: ["Mugling", "Narayanghat"],
    },
    warnings: ["Occasional traffic jams at Mugling"],
    note: "Ideal route for wildlife lovers heading to Chitwan National Park",
  },
  {
    from: "Kathmandu",
    to: "Jiri",
    distance: 190,
    duration: "7-9 hours",
    availableServices: ["Local Bus", "Jeep"],
    fareRange: "Rs. 500 - Rs. 1000",
    bookingInfo: "Buses leave from Old Bus Park, Kathmandu",
    frequency: "Once or twice a day",
    landmarks: ["Charikot", "Bhimeshwor"],
    route: "Kathmandu → Bhaktapur → Charikot → Jiri",
    roadCondition: {
      type: "Poor",
      description: "Mostly rough and bumpy, especially past Charikot",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Limited beyond Charikot",
      recommendedStops: ["Charikot"],
    },
    warnings: ["Steep sections and landslide-prone areas"],
    note: "Gateway to classical Everest trek route",
  },
  {
    from: "Pokhara",
    to: "Baglung",
    distance: 75,
    duration: "2-3 hours",
    availableServices: ["Local Bus", "Microbus", "Jeep"],
    fareRange: "Rs. 150 - Rs. 400",
    bookingInfo: "Buses available from Prithvi Chowk, Pokhara",
    frequency: "Frequent departures",
    landmarks: ["Beni", "Kusma Bridge"],
    route: "Pokhara → Hemja → Kusma → Baglung",
    roadCondition: {
      type: "Fair",
      description: "Some newly blacktopped sections",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Available in most towns along the way",
      recommendedStops: ["Kusma"],
    },
    warnings: ["Narrow road with sharp turns"],
    note: "Suspension bridges visible en route",
  },
  {
    from: "Nepalgunj",
    to: "Surkhet",
    distance: 120,
    duration: "3-4 hours",
    availableServices: ["Local Bus", "Jeep", "Microbus"],
    fareRange: "Rs. 200 - Rs. 500",
    bookingInfo: "Local counters at Bus Park",
    frequency: "Every hour",
    landmarks: ["Kohalpur", "Chisapani"],
    route: "Nepalgunj → Kohalpur → Surkhet",
    roadCondition: {
      type: "Good",
      description: "Flat highway, recently repaired",
    },
    fuelAvailability: {
      hasStations: true,
      description: "No fuel shortage along the route",
      recommendedStops: ["Kohalpur"],
    },
    warnings: [],
    note: "Important for Karnali province connectivity",
  },
  {
    from: "Kathmandu",
    to: "Sindhuli",
    distance: 150,
    duration: "5-6 hours",
    availableServices: ["Local Bus", "Jeep"],
    fareRange: "Rs. 350 - Rs. 600",
    bookingInfo: "Buses from Koteshwor or Old Bus Park",
    frequency: "2-3 times a day",
    landmarks: ["BP Highway", "Khaniyakharka"],
    route: "Kathmandu → Dhulikhel → Khurkot → Sindhuli",
    roadCondition: {
      type: "Good",
      description: "BP highway is scenic and well-built",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Stations available in major towns",
      recommendedStops: ["Khurkot"],
    },
    warnings: ["Sharp hairpin bends"],
    note: "One of the most scenic highways in Nepal",
  },
  {
    from: "Butwal",
    to: "Tansen",
    distance: 35,
    duration: "1.5-2 hours",
    availableServices: ["Local Bus", "Jeep"],
    fareRange: "Rs. 100 - Rs. 250",
    bookingInfo: "Local counters at Butwal Bus Park",
    frequency: "Frequent in mornings",
    landmarks: ["Shivaghat", "Ridi"],
    route: "Butwal → Tansen",
    roadCondition: {
      type: "Fair",
      description: "Narrow hill road",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Available in both towns",
      recommendedStops: [],
    },
    warnings: ["Steep and curvy ascent"],
    note: "Tansen offers amazing hilltop views",
  },
  {
    from: "Pokhara",
    to: "Ghandruk (Jeep point)",
    distance: 60,
    duration: "2.5-3 hours",
    availableServices: ["Jeep"],
    fareRange: "Rs. 300 - Rs. 600",
    bookingInfo: "Local travel agencies or Lakeside Jeep stands",
    frequency: "Morning departures mostly",
    landmarks: ["Nayapul", "Kimche"],
    route: "Pokhara → Nayapul → Kimche → Ghandruk Jeep Stop",
    roadCondition: {
      type: "Poor",
      description: "Rough unpaved road past Nayapul",
    },
    fuelAvailability: {
      hasStations: false,
      description: "Fuel only available till Nayapul",
      recommendedStops: ["Nayapul"],
    },
    warnings: ["Bumpy road; not suitable for small cars"],
    note: "Access point for Ghandruk trek",
  },
  {
    from: "Dhangadhi",
    to: "Dadeldhura",
    distance: 120,
    duration: "4-5 hours",
    availableServices: ["Local Bus", "Jeep"],
    fareRange: "Rs. 250 - Rs. 600",
    bookingInfo: "Buses from Attariya Bus Station",
    frequency: "2-3 times daily",
    landmarks: ["Attariya", "Godawari"],
    route: "Dhangadhi → Attariya → Godawari → Dadeldhura",
    roadCondition: {
      type: "Fair",
      description: "Some steep sections but mostly paved",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Available in Dhangadhi and Attariya",
      recommendedStops: ["Attariya"],
    },
    warnings: ["Hilly terrain, sharp bends"],
    note: "Known for mid-hill scenic drives",
  },
  {
    from: "Kathmandu",
    to: "Ramechhap (Manthali Airport)",
    distance: 135,
    duration: "5-6 hours",
    availableServices: ["Jeep", "Microbus"],
    fareRange: "Rs. 400 - Rs. 1000",
    bookingInfo: "Available from Koteshwor",
    frequency: "Early morning departures for Lukla flights",
    landmarks: ["Khadi Chaur", "Mulkot"],
    route: "Kathmandu → Bhaktapur → Khadi Chaur → Manthali",
    roadCondition: {
      type: "Poor",
      description: "Mostly narrow and winding",
    },
    fuelAvailability: {
      hasStations: true,
      description: "Limited options, plan fuel ahead",
      recommendedStops: ["Khadi Chaur"],
    },
    warnings: ["Very early departure required for flights"],
    note: "Alternative to Kathmandu–Lukla flight due to air traffic",
  },
];

export const seedMotorableRoutes = async () => {
  try {
    const session = await auth();
    if (!session) return;
    await dbConnect();

    await MotorableRoute.deleteMany();
    await MotorableRoute.insertMany(motorableRoutesMock);

    console.log("✅ 10 motorable routes seeded!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};
