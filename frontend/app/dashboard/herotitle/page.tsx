"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Dummy Hero data (replace with real API / DB fetch later)
const heroes = [
  {
    title: "Superman",
    subtitle: "The Man of Steel",
    description: "Fights for truth and justice",
    rating: 4.8,
    price: 100,
    discount: 10,
    image: "/heroes/superman.jpg",
  },
  {
    title: "Batman",
    subtitle: "The Dark Knight",
    description: "Protector of Gotham",
    rating: 4.5,
    price: 120,
    discount: 15,
    image: "/heroes/batman.jpg",
  },
  {
    title: "Wonder Woman",
    subtitle: "Amazonian Warrior",
    description: "Champion of peace",
    rating: 4.9,
    price: 150,
    discount: 5,
    image: "/heroes/wonderwoman.jpg",
  },
];

export default function HeroTitlePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hero Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Heroes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{heroes.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              {(heroes.reduce((acc, hero) => acc + hero.rating, 0) / heroes.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              $
              {heroes
                .reduce((acc, hero) => acc + hero.price - hero.price * (hero.discount / 100), 0)
                .toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Hero</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              {heroes.reduce((top, hero) => (hero.rating > top.rating ? hero : top), heroes[0]).title}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hero List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroes.map((hero, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={hero.image} alt={hero.title} />
                <AvatarFallback>{hero.title[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{hero.title}</CardTitle>
                <CardDescription>{hero.subtitle}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{hero.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Rating: {hero.rating}</Badge>
                <p className="font-semibold">
                  ${hero.price - hero.price * (hero.discount / 100)}
                </p>
              </div>
              <Button variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
