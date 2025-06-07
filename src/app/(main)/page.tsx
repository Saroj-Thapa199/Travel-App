import AddDestinationCTA from "@/components/AddDestinationCTA";
import DestinationsSection from "@/components/DestinationsSection";
import Hero from "@/components/Hero";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full xl:container">
        <DestinationsSection />
        <AddDestinationCTA />
        <WhyChooseUsSection />
      </div>
    </>
  );
}
