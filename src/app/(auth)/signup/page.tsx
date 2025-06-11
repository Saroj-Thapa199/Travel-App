import React from "react";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import signUpImage from "@/assets/hero-image-2.jpg";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="bg-card flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to TrekTome</h1>
            <p className="text-muted-foreground">
              Where you <span className="italic">discover, explore</span> and{" "}
              <span className="italic">experience</span> the most adventurous
              destinations.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href={"/login"} className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
          priority
        />
      </div>
    </main>
  );
};

export default page;
