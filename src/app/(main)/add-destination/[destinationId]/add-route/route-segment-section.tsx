import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  motorableRouteSchema,
  MotorableRouteType,
  trekRouteSchema,
  TrekRouteType,
} from "@/lib/validations/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Footprints } from "lucide-react";
import { useForm } from "react-hook-form";
import { MotorableRouteForm } from "./motorable-route-form";
import { TrekRouteForm } from "./trek-route-form";
import { Dispatch, SetStateAction } from "react";

type RouteSegmentSectionProps = {
  setTab: Dispatch<SetStateAction<string>>;
};

const RouteSegmentSection = ({ setTab }: RouteSegmentSectionProps) => {
  const motorableForm = useForm<Omit<MotorableRouteType, "_id">>({
    resolver: zodResolver(
      motorableRouteSchema.omit({
        _id: true,
      }),
    ),
    defaultValues: {
      // from: "",
      // to: "",
      // duration: "",
      // availableServices: [],
      // fare: "",
      // frequency: "",
      // landmarks: [],
      // route: "",
      // roadCondition: { type: "Good" },
      // fuelAvailability: { hasStations: true, recommendedStops: [] },
      // warnings: [],
      from: "Kathmandu",
      to: "Pokhara",
      distance: 200,
      duration: "6-8 hours",
      availableServices: ["Tourist Bus", "Microbus"],
      fare: "NPR 500 - 1200",
      bookingInfo:
        "Tickets can be booked online via travel portals or bus stations.",
      frequency: "Every 30 minutes during peak hours",
      route:
        "Take the Prithvi Highway via Muglin and Damauli. Scenic route with river views.",
      roadCondition: {
        type: "Fair",
        description:
          "Occasional potholes around Muglin area; otherwise smooth.",
      },
      fuelAvailability: {
        hasStations: true,
        description: "Fuel available in Muglin and Damauli areas.",
        recommendedStops: ["Muglin", "Damauli"],
      },
      landmarks: ["Trishuli River", "Manakamana Cable Car"],
      warnings: [
        "Landslides possible during monsoon",
        "Heavy traffic in the morning",
      ],
      note: "Ideal to travel early morning to avoid traffic jams.",
    },
  });

  const trekForm = useForm<Omit<TrekRouteType, "_id">>({
    resolver: zodResolver(
      trekRouteSchema.omit({
        _id: true,
      }),
    ),
    defaultValues: {
      // trekName: "",
      // startingPoint: "",
      // duration: { oneWay: "", roundTrip: "" },
      // difficulty: "Moderate",
      // permits: [],
      // teahouses: false,
      // bestSeason: [],
      // highlights: [],
      // packingList: [],
      // safetyTips: [],
      trekName: "Everest Base Camp Trek",
      startingPoint: "Lukla",
      destinationPoint: "Everest Base Camp",
      duration: {
        roundTrip: "12-14 days",
        oneWay: "6-7 days",
      },
      difficulty: "Challenging",
      elevation: {
        start: 2860,
        max: 5364,
        gain: 2504,
      },
      permits: [
        {
          name: "Sagarmatha National Park Entry Permit",
          cost: "NPR 3000",
          where: "Available at Nepal Tourism Board Office or Monjo checkpoint",
        },
        {
          name: "Khumbu Pasang Lhamu Rural Municipality Permit",
          cost: "NPR 2000",
          where: "Issued at Lukla",
        },
      ],
      teahouses: {
        available: true,
        locations: [
          "Phakding",
          "Namche Bazaar",
          "Tengboche",
          "Dingboche",
          "Lobuche",
          "Gorak Shep",
        ],
      },
      bestSeason: ["Spring", "Autumn"],
      highlights: [
        "Panoramic views of Mount Everest and nearby peaks",
        "Cultural experience in Sherpa villages",
        "Visit to Tengboche Monastery",
        "Scenic flight to Lukla",
      ],
      packingList: [
        "Down jacket and thermal layers",
        "Trekking boots with good grip",
        "Sunscreen and sunglasses",
        "Water purification tablets",
        "First-aid kit",
      ],
      safetyTips: [
        "Ascend gradually to avoid altitude sickness",
        "Stay hydrated and carry purification tablets",
        "Listen to your guide and acclimatize properly",
      ],
      recommendedItinerary: [
        "Fly to Lukla and trek to Phakding",
        "Trek to Namche Bazaar",
        "Acclimatization day in Namche Bazaar",
        "Trek to Tengboche",
        "Trek to Dingboche",
        "Acclimatization day in Dingboche",
        "Trek to Lobuche",
        "Trek to Gorak Shep and hike to Everest Base Camp",
        "Hike to Kala Patthar and return to Pheriche",
        "Trek to Namche Bazaar",
        "Trek to Lukla",
        "Fly back to Kathmandu",
      ],
    },
  });

  return (
    <Accordion
      type="single"
      collapsible
      className="aria-invalid:ring-destructive/20 w-full"
      defaultValue="motorable-route-form"
    >
      <AccordionItem value="motorable-route-form">
        <AccordionTrigger className="text-xl font-semibold">
          <div className="flex items-center gap-2">
            <Car className="size-6" />
            Add Motorable Route
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <MotorableRouteForm form={motorableForm} setTab={setTab} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="trek-route-form">
        <AccordionTrigger className="text-xl font-semibold">
          <div className="flex items-center gap-2">
            <Footprints className="size-6" />
            Add Trek Route
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TrekRouteForm form={trekForm} setTab={setTab} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RouteSegmentSection;
