"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Usage } from "@/types/usage";
import UsagePage from "./components/Usage";

export default function UsagePageTitle() {
  const [ingredient, setIngredient] = useState<Usage[]>([]);

  useEffect(() => {
    const fetchUsage = async () => {
      const res = await fetch("http://localhost:5000/api/usageguideline");
      const data: Usage[] = await res.json();
      setIngredient(data);
    };

    fetchUsage();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Usages</h2>
          <p className="text-sm">This is the all usage's</p>
        </div>
        <div>
          <Link href="/dashboard/usage/create">
            <Button>Add Usages</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {ingredient.map((item) => (
          <UsagePage usage={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
