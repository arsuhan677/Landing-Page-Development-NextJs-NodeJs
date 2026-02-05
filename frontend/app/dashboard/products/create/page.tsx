import React from "react";
import CreatePost from "../components/CreatePost";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Product</CardTitle>
            </CardHeader>
      <CreatePost />
      </Card>
    </div>
  );
}
