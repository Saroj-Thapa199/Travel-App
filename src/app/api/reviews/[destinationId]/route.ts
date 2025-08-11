import dbConnect from "@/lib/dbConnect";
import Review from "@/model/Review";
import { IUserDocument } from "@/model/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ destinationId: string }>;

export const GET = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    await dbConnect();

    const params = await segmentData.params;
    const { destinationId } = params;

    const searchParams = request.nextUrl.searchParams;

    const cursorRatingRaw = searchParams.get("cursorRating");
    const cursorRating = cursorRatingRaw
      ? parseFloat(cursorRatingRaw)
      : undefined;
    const cursorId = searchParams.get("cursorId");

    const filter = searchParams.get("filter");
    const sortBy = searchParams.get("sortBy");
    const limit = Number(searchParams.get("limit")) || 5;

    const query: any = {};
    const andConditions: any[] = [];

    andConditions.push({ destination: destinationId });

    if (sortBy === "latest" || filter !== "all") {
      switch (filter) {
        case "5 stars":
          andConditions.push({ rating: 5 });
          break;
        case "4 stars":
          andConditions.push({ rating: 4 });
          break;
        case "3 stars":
          andConditions.push({ rating: 3 });
          break;
        case "2 stars":
          andConditions.push({ rating: 2 });
          break;
        case "1 star":
          andConditions.push({ rating: 1 });
          break;
      }
      if (cursorId) {
        andConditions.push({
          _id: { $lt: new mongoose.Types.ObjectId(cursorId) },
        });
      }
    } else if (sortBy === "rating-desc" || sortBy === "rating-asc") {
      if (cursorRating && !isNaN(cursorRating) && cursorId) {
        const id = new mongoose.Types.ObjectId(cursorId);
        const cursorCondition = {
          $or: [
            {
              rating:
                sortBy === "rating-desc"
                  ? { $lt: cursorRating }
                  : { $gt: cursorRating },
            },
            { rating: cursorRating, _id: { $lt: id } },
          ],
        };
        andConditions.push(cursorCondition);
      }
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    let sort: any = { _id: -1 }; // default: latest first
    if (sortBy === "rating-asc") {
      sort = { rating: 1, _id: -1 };
    } else if (sortBy === "rating-desc") {
      sort = { rating: -1, _id: -1 };
    }

    const results = await Review.find(query)
      .populate<{
        user: IUserDocument;
      }>("user", "name image")
      .sort(sort)
      .limit(limit + 1)
      .lean();

    const hasNextPage = results.length > limit;
    const reviews = hasNextPage ? results.slice(0, -1) : results;
    const nextCursor = hasNextPage
      ? {
          cursorId: results[results.length - 1]._id.toString(),
          cursorRating: results[results.length - 1].rating,
        }
      : null;

    return NextResponse.json({ reviews, nextCursor });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};
