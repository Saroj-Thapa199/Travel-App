import Link from "next/link";
import { Button } from "./ui/button";

const AddDestinationCTA = () => {
  return (
    <section className="mt-4 my-14 px-4 sm:px-8 scroll-mt-20" id="add-destination">
      <div className="bg-muted w-full rounded-lg p-10 relative overflow-hidden">
        <div className="max-w-3xl">
          <h2 className="mb-2.5 text-2xl font-bold md:mb-4 md:text-3xl">
            Know a beautiful spot others should visit?
          </h2>
          <p className="text-slightly-muted mb-6">
            Help fellow travelers discover Nepal's hidden natural retreats by
            sharing your favorite destinations. Your contribution can help
            others experience the beauty of Nepal beyond the tourist hotspots.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="rounded-sm px-5 py-5" asChild>
              <Link href="/destinations/add">Add a Destination</Link>
            </Button>
            <Button variant={"outline"} className="rounded-sm px-5 py-4">
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary h-full">
                <path
                  d="M96.4,17.2c-2.1-3.6-7.4-4.8-14.5-3.4c-5.4,1.1-11.2,3.2-13.5,3.9c-2.8-4.9-5.7-9.2-8.4-12.6C56.8,1.4,53.2,0,50.2,0
              c-3,0-6.6,1.4-9.8,5.1c-2.7,3.3-5.6,7.7-8.4,12.6c-2.3-0.8-8.1-2.9-13.5-3.9c-7.1-1.4-12.4-0.2-14.5,3.4
              c-2.1,3.6-0.9,8.7,3.2,14.6c3.2,4.5,7.4,8.9,10.5,11.8c-0.8,2.3-2.9,8.1-3.9,13.5c-1.4,7.1-0.2,12.4,3.4,14.5
              c1.2,0.7,2.5,1,4,1c3.5,0,7.8-1.4,10.6-4.2c4.5-3.2,8.9-7.4,11.8-10.5c2.9,3.1,7.3,7.3,11.8,10.5c2.8,2.8,7.1,4.2,10.6,4.2
              c1.5,0,2.8-0.3,4-1c3.6-2.1,4.8-7.4,3.4-14.5c-1.1-5.4-3.2-11.2-3.9-13.5c3.1-2.9,7.3-7.3,10.5-11.8
              C97.3,25.9,98.5,20.8,96.4,17.2z"
                />
              </svg>
            </div>
      </div>
    </section>
  );
};

export default AddDestinationCTA;
