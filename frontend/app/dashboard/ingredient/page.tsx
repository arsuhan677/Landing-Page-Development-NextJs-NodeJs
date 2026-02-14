"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/types/ingredient";
import IngredientPage from "./components/Ingredient";

export default function IngredientPageTitle() {
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredient = async () => {
      const res = await fetch("http://localhost:5000/api/ingredient");
      const data: Ingredient[] = await res.json();
      setIngredient(data);
    };

    fetchIngredient();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Ingreadient</h2>
          <p className="text-sm">This is the all ingredient's</p>
        </div>
        <div>
          <Link
            className="flex container mx-auto px-4"
            href="/dashboard/ingredient/create"
          >
            <Button>Add Ingredient</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4 grid grid-cals-2 container mx-auto px-4 ">
        {ingredient.map((item) => (
          <IngredientPage ingredient={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
