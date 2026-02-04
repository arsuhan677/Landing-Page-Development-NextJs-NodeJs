"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroListPage() {
  const [heroes, setHeroes] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero")
      .then(res => res.json())
      .then(data => setHeroes(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hero Sections</h1>
        <Link href="/dashboard/herotitle/create">
          <Button>Create Hero</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {heroes.map(hero => (
          <Card key={hero.id}>
            <CardContent className="p-4 space-y-2">
              <img src={hero.image} className="rounded-lg" />
              <h2 className="text-xl font-semibold">{hero.title}</h2>
              <p className="text-sm text-muted-foreground">{hero.subtitle}</p>
              <p className="text-sm">{hero.description}</p>

              <div className="flex justify-between text-sm font-medium">
                <span>{hero.price}</span>
                <span>⭐ {hero.rating}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

