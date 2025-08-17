import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const limit = Number(searchParams.get("limit")) || 12;
    const category = searchParams.get("category") || "";
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortBy = searchParams.get("sortBy");

    const cursorRatingRaw = searchParams.get("cursorRating");
    const cursorRating = cursorRatingRaw
      ? parseFloat(cursorRatingRaw)
      : undefined;

    const cursorId = searchParams.get("cursorId");
    const cursorName = searchParams.get("cursorName");

    const query: any = {};
    const andConditions: any[] = [];

    // --- filters ---
    if (searchTerm) {
      andConditions.push({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { region: { $regex: searchTerm, $options: "i" } },
        ],
      });
    }

    if (category && category !== "all") {
      andConditions.push({
        categories: category,
      });
    }

    // --- cursor conditions ---
    if (
      sortBy !== "default" &&
      typeof cursorRating === "number" &&
      !isNaN(cursorRating) &&
      cursorId
    ) {
      // pagination for rating sorts
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
    } else if (sortBy === "default" && cursorId && cursorName) {
      // pagination for alphabetical sort
      const id = new mongoose.Types.ObjectId(cursorId);
      andConditions.push({
        $or: [
          { name: { $gt: cursorName } },
          { name: cursorName, _id: { $gt: id } },
        ],
      });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // sorting
    let sort: any = { name: 1 }; // default will be alphabetical from a to z
    if (sortBy === "rating-asc") {
      sort = { averageRating: 1, _id: 1 };
    } else if (sortBy === "rating-desc") {
      sort = { averageRating: -1, _id: 1 };
    }

    // running the queries
    const results = await Destination.find(query)
      .sort(sort)
      .limit(limit + 1)
      .lean();

    const hasNextPage = results.length > limit;
    const destinations = hasNextPage ? results.slice(0, -1) : results;
    const lastItem = destinations[destinations.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? sortBy === "default"
          ? {
              cursorName: lastItem.name,
              cursorId: lastItem._id.toString(),
            }
          : {
              cursorRating: lastItem.averageRating,
              cursorId: lastItem._id.toString(),
            }
        : null;

    return NextResponse.json({
      destinations,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 },
    );
  }
};
