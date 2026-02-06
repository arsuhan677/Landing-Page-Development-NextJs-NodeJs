import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProduct from "../components/CreatePost";

export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Product</CardTitle>
            </CardHeader>
      <CreateProduct />
      </Card>
    </div>
  );
}
