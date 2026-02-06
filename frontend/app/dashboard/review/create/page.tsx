import React from "react";
import CreatePost from "../components/CreateReview";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateReview from "../components/CreateReview";

export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Review</CardTitle>
            </CardHeader>
      <CreateReview />
      </Card>
    </div>
  );
}
