import React from "react";

const WhyChooseUsSection = () => {
  return (
    <section className="my-14 px-4 sm:px-8">
      <h2 className="mb-6 text-2xl font-bold">Why Choose Us</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border-border/50 rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Verified Reviews</h3>
          </div>
          <p className="text-muted-foreground">
            All our reviews are from verified travelers who have experienced the
            destinations firsthand.
          </p>
        </div>

        <div className="bg-card border-border/50 rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">24/7 Support</h3>
          </div>
          <p className="text-muted-foreground">
            Our travel experts are available around the clock to assist you with
            any questions or issues.
          </p>
        </div>

        <div className="bg-card border-border/50 rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Best Price Guarantee</h3>
          </div>
          <p className="text-muted-foreground">
            Find a lower price elsewhere? We'll match it and give you an
            additional 10% discount.
          </p>
        </div>

        <div className="bg-card border-border/50 rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">
              Community Contributions
            </h3>
          </div>
          <p className="text-muted-foreground">
            Discover hidden gems shared by our community of travelers who know
            Nepal's best natural retreats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
