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
      {review.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}

      <Link href="/dashboard/review/create">
        <Button>Create review</Button>
      </Link>
    </div>
  );
}
