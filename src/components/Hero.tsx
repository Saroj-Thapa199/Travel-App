import Image from "next/image";
import HeroImage1 from "../assets/hero-image-4.jpg";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full min-h-[550px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage1}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="drk:from-white/20 absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 xl:container flex h-full items-center px-6 sm:px-8 mx-auto">
        <div className="max-w-2xl">
          <h1 className="via-muted w-fit bg-gradient-to-b from-white/70 to-black/20 bg-clip-text text-4xl leading-tight font-bold text-transparent sm:text-5xl md:text-7xl dark:text-white">
            Discover Nepal's
          </h1>
          <h1 className="via-muted tex-white bg-gradient-to-b from-white/70 to-black/20 bg-clip-text text-4xl leading-tight font-bold text-transparent sm:text-5xl md:text-6xl dark:text-black/90 dark:[text-shadow:_1px_1px_9px_white]">
            Natural Retreats
          </h1>
          <p className="mb-8 max-w-xl text-lg text-slate-300 sm:text-xl">
            Escape to serene landscapes, pristine forests, and therapeutic hot
            springs. Experience the tranquility of Nepal's hidden gems.
          </p>

          <div className="flex flex-col gap-5 rounded-sm sm:flex-row">
            <Button size="lg" variant="secondary" className="rounded-sm border-black border">
              <Link href={"#"}>Explore Destinations</Link>
            </Button>
            <Button
              variant={"outline"}
              size="lg" asChild
              className="rounded-sm border-white/20 bg-white/10 text-white hover:bg-white/20 gap-1"
            >
              <Link href={"#"}>
                Share Your Hidden Gem <ArrowRight size={4} />
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <img
                src="https://randomuser.me/api/portraits/women/22.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary hidden sm:inline"
              />
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center text-xs font-semibold text-primary">
                +2k
              </div>
            </div>
            <div className="text-white">
              <div className="font-medium">Trusted by thousands</div>
              <div className="text-sm text-white/70">Join our community of nature enthusiasts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
