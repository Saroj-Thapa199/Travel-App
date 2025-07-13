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
} from "@/lib/RouteValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Footprints } from "lucide-react";
import { useForm } from "react-hook-form";
import { MotorableRouteForm } from "./motorable-route-form";
import { TrekRouteForm } from "./trek-route-form";

const RouteSegmentSection = () => {
  const motorableForm = useForm<Omit<MotorableRouteType, "_id">>({
    resolver: zodResolver(
      motorableRouteSchema.omit({
        _id: true,
      }),
    ),
    defaultValues: {
      from: "",
      to: "",
      availableServices: [],
      roadCondition: { type: "Good" },
      fuelAvailability: { hasStations: true, recommendedStops: [] },
    },
  });

  const trekForm = useForm<Omit<TrekRouteType, "_id">>({
    resolver: zodResolver(
      trekRouteSchema.omit({
        _id: true,
      }),
    ),
    defaultValues: {
      trekName: "",
      startingPoint: "",
      difficulty: "Moderate",
      teahouses: false,
    },
  });

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
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
          <MotorableRouteForm form={motorableForm} onCancel={() => {}} />
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
          <TrekRouteForm form={trekForm} onCancel={() => {}} />
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
