import Link from "next/link";
import DestinationCard from "./DestinationCard";
import img1 from "@/assets/hero-image-3.jpg";
import Image from "next/image";
import { Button } from "./ui/button";

const DestinationsSection = () => {
  return (
    <section
      className="mx-auto my-14 scroll-mt-20 px-4 sm:px-8"
      id="destinations"
    >
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-xl font-semibold sm:text-3xl">
          Nature Retreats in Nepal
        </h1>
        <Link href={"/destinations"} className="text-sm hover:underline">
          View all destinations
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((destination, index) => (
          <DestinationCard
            key={index}
            name="Bethanchowk Narayanthan"
            region="Destination, Nepal"
            description="Serene hilltop with panoramic Himalayan views, pristine forests, and spiritual significance."
            ratings={3.6}
          />
        ))}
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-start">
          <h1 className="my-4 text-xl font-semibold sm:text-3xl">
            Discover by Season
          </h1>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Link href={"#"} key={index}>
              <div className="group relative overflow-clip rounded-lg shadow-sm dark:shadow-gray-800">
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

        <div className="hidden max-sm:flex gap-6 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
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
      DestinationsSection
    </section>
  );
};

export default DestinationsSection;
