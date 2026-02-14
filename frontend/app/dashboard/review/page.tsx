"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/review";
import { ReviewCard } from "./components/ReviewCard";

export default function Page() {
  const [review, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await fetch("http://localhost:5000/api/review");
      const data: Review[] = await res.json();
      setReviews(data);
    };

    fetchReview();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Coustomer Review</h2>
          <p className="text-sm">
            This is the all customer review's
          </p>
        </div>
        <div>
          <Link href="/dashboard/review/create">
        <Button>Create review</Button>
      </Link>
        </div>
      </div>

      {review.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
}

