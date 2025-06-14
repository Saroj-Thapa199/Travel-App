import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const limit = Number(searchParams.get("limit")) || 12;
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortBy = searchParams.get("sortBy");
    const cursorRatingRaw = searchParams.get("cursorRating");
    const cursorRating = cursorRatingRaw
      ? parseFloat(cursorRatingRaw)
      : undefined;

    const cursorId = searchParams.get("cursorId");

    const query: any = {};

    const andConditions: any[] = [];

    if (searchTerm) {
      andConditions.push({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { region: { $regex: searchTerm, $options: "i" } },
        ],
      });
    }

    if (
      sortBy !== "default" &&
      typeof cursorRating === "number" &&
      !isNaN(cursorRating) &&
      cursorId
    ) {
      console.log("first true");
      const id = new mongoose.Types.ObjectId(cursorId);
      const cursorCondition =
        sortBy === "rating-desc"
          ? {
              $or: [
                { averageRating: { $lt: cursorRating } },
                { averageRating: cursorRating, _id: { $gt: id } },
              ],
            }
          : {
              $or: [
                { averageRating: { $gt: cursorRating } },
                { averageRating: cursorRating, _id: { $gt: id } },
              ],
            };
      andConditions.push(cursorCondition);
    } else if (cursorId && sortBy === "default") {
      console.log("second true");
      andConditions.push({
        _id: { $gt: new mongoose.Types.ObjectId(cursorId) },
      });
    }

    // if (cursor) {
    //   andConditions.push({ _id: { $gt: new mongoose.Types.ObjectId(cursor) } });
    // }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    let sort: any = { _id: 1 };
    if (sortBy === "rating-asc") {
      sort = { averageRating: 1, _id: 1 };
    } else if (sortBy === "rating-desc") {
      sort = { averageRating: -1, _id: 1 };
    }

    // console.dir(query, { depth: null, colors: true });
    console.log(JSON.stringify(query, null, 2))

    const results = await Destination.find(query)
      .sort(sort)
      .limit(limit + 1)
      .lean();

    const hasNextPage = results.length > limit;
    const destinations = hasNextPage ? results.slice(0, -1) : results;
    const lastItem = destinations[destinations.length - 1];
    const nextCursor =
      hasNextPage && lastItem
        ? {
            cursorRating: lastItem.averageRating,
            cursorId: lastItem._id.toString(),
          }
        : null;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      destinations,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch destinations" },
      { status: 500 },
    );
  }
};
