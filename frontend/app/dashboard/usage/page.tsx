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
      {ingredient.map((item) => (
        <UsagePage usage={item} key={item.id} />
      ))}

      <Link href="/dashboard/usage/create">
        <Button>Add Usages</Button>
      </Link>
    </div>
  );
}
