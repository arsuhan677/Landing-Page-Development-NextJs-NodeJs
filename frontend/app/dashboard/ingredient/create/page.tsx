import React from "react";
// import CreatePost from "../components/CreatePost";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateIngredient from "../components/CreateIngredient";
// import CreateHero from "../components/CreatePost";

export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Ingredien</CardTitle>
            </CardHeader>
        <CreateIngredient />
      </Card>
    </div>
  );
}
