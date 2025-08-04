import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewType } from "@/lib/validations/review";
import axios from "axios";
import { MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ReviewsTab = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      const res = await axios.get<ReviewType[]>("/api/reviews/user-reviews");
      console.log(res.data);
      setReviews(res.data);
    };

    fetchUserReviews();
  }, []);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Reviews</h2>
        <Button>
          <Link href="/destinations">Write a Review</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="md:w-1/4">
                    <h3 className="mb-2 text-lg font-bold">
                      {review.destination}
                    </h3>
                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    {/* <p className="text-muted-foreground text-sm">{review.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}</p> */}
                  </div>

                  <div className="md:w-3/4">
                    <p className="text-muted-foreground">{review.comment}</p>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {reviews.length === 0 && (
          <div className="bg-muted/30 rounded-lg border border-dashed py-12 text-center">
            <MessageSquare className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
            <h3 className="mb-2 text-lg font-medium">No Reviews Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't written any reviews yet. Share your experiences to
              help other travelers!
            </p>
            <Button>Write Your First Review</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewsTab;
