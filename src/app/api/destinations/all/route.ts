import dbConnect from "@/lib/dbConnect";
import { DestinationType } from "@/lib/validation";
import Destination from "@/model/Destination";

export const dynamic = "force-static";

export const GET = async () => {
  try {
    await dbConnect();

    const destinationsDocs = await Destination.find();
    console.log({destinationsDocs})

    const destinations = destinationsDocs.map(doc => doc.toObject() as DestinationType)
    console.log({destinations})

    return Response.json({ destinations });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch destinations" },
      { status: 500 },
    );
  }
};
