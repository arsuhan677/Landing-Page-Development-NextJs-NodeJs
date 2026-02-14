"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/types/hero";
import HeroTitle from "./components/HeroTitle";

export default function HeroPage() {
  const [hero, setHero] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch("http://localhost:5000/api/hero");
      const data: Hero[] = await res.json();
      setHero(data);
    };

    fetchHero();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All HeroTite</h2>
          <p className="text-sm">This is the all herotitle collection's</p>
        </div>
        <div>
          <Link href="/dashboard/herotitle/create">
            <Button>Add Hero Title</Button>
          </Link>
        </div>
      </div>
      {hero.length > 0 ? (
        hero.map((item) => <HeroTitle hero={item} key={item.id} />)
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}
