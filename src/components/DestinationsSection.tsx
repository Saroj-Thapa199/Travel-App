import Link from "next/link";
import DestinationCard from "./DestinationCard";
import img1 from "@/assets/hero-image-3.jpg";
import Image from "next/image";
import { Button } from "./ui/button";
import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import { z } from "zod";
import { destinationSchema } from "@/lib/validations/destination";

const DestinationsSection = async() => {
  await dbConnect();

    const data = await Destination.aggregate([
      { $sample: { size: 6 } },
    ]);

    const destinations = z.array(destinationSchema).parse(data)
  return (
    <section
      className="mx-auto my-16 scroll-mt-20 px-4 sm:px-8 md:px-14 lg:px-20"
      id="destinations"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-2xl">
          Nature Retreats in Nepal
        </h1>
        <Link href={"/destinations"} className="text-sm hover:underline">
          View all destinations
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map(destination => (
          <DestinationCard
            key={destination._id}
            name={destination.name}
            region={destination.region}
            image={destination.image}
            shortDescription={destination.shortDescription}
            rating={destination.averageRating}
            reviewCount={destination.reviewCount}
            slug={destination.slug}
          />
        ))}
        {/* {[1, 2, 3, 4, 5, 6].map((destination, index) => (
          <DestinationCard
            key={index}
            name="Bethanchowk Narayanthan"
            region="Destination, Nepal"
            shortDescription="Serene hilltop with panoramic Himalayan views, pristine forests, and spiritual significance."
            rating={3.6}
            reviewCount={0}
            slug="#"
          />
        ))} */}
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-start">
          <h1 className="my-6 text-2xl font-bold sm:text-2xl">
            Discover by Season
          </h1>
        </div>
        <div className="hidden grid-cols-2 gap-3 sm:grid md:gap-4 lg:grid-cols-4 lg:gap-5">
          {[1, 2, 3, 4].map((_, index) => (
            <Link href={"#"} key={index}>
              <div className="group relative overflow-clip rounded-lg shadow-sm dark:shadow-gray-800">
                <Image
                  src={img1}
                  alt="season-image"
                  className="h-64 w-full object-cover brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h1 className="text-xl font-bold">Winter Wonderlands</h1>
                  <p className="mb-2 leading-relaxed">
                    Snow-capped mountains and cozy retreats
                  </p>
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="border-primary/20 w-fit border px-3.5 py-5"
                  >
                    Explore Winter
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="scrollbar-hide hidden snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth max-sm:flex">
          {[1, 2, 3, 4].map((_, index) => (
            <Link
              href={"#"}
              key={index}
              className="w-full flex-shrink-0 snap-start"
            >
              <div className="group relative h-full overflow-clip rounded-lg shadow-sm dark:shadow-gray-800">
                <Image
                  src={img1}
                  alt="season-image"
                  className="h-full w-full object-cover brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h1 className="text-xl font-bold">Winter Wonderlands</h1>
                  <p className="mb-2 leading-relaxed">
                    Snow-capped mountains and cozy retreats
                  </p>
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="border-primary/20 w-fit border px-3.5 py-5"
                  >
                    Explore Winter
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
