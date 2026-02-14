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
    <div className="space-y-4 flex container mx-auto px-4">
      {hero.map((item) => (
        <HeroTitle hero={item} key={item.id} />
      ))}

      <Link href="/dashboard/herotitle/create">
        <Button>Add Hero Title</Button>
      </Link>
    </div>
  );
}
