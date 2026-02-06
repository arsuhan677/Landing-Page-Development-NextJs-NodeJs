import React from "react";
import CreatePost from "../components/CreatePost";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateGallery from "../components/CreatePost";

export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Product Gallery</CardTitle>
            </CardHeader>
        <CreateGallery />
      </Card>
    </div>
  );
}
