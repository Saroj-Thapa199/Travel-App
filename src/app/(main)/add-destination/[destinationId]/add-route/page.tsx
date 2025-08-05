import Destination from "@/model/Destination";
import AddRouteTabs from "./AddRouteTabs";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";

const page = async ({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) => {
  const { destinationId } = await params;

  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    return redirect("/");
  }

  dbConnect();

  const destination = await Destination.findById(destinationId, "name");

  if (!destination) {
    return redirect("/");
  }
  return (
    <main className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Add Routes</h1>
        <h2 className="text-muted-foreground text-lg">
          Help fellow travelers find their way to the destination by sharing
          your route.
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <AddRouteTabs
          destinationId={destinationId}
          destinationName={destination.name}
        />
      </div>
    </main>
  );
};

export default page;
