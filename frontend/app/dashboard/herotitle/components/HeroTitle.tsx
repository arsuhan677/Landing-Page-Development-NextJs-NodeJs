import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Hero } from "@/types/hero";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface HeroTitleProps {
  hero: Hero;
  refetch?: () => void;
}

export default function HeroCard({ hero, refetch }: HeroTitleProps) {
  return (
    <div className="flex items-center justify-between gap-4 border shadow-sm container mx-auto px-4 rounded-sm py-3 hover:bg-muted/50">
      {/* Image */}
      <img
        src={hero.image}
        alt={hero.title}
        className="h-12 w-12 rounded-md object-cover"
      />

      {/* Content: title, subtitle, description */}
      <div className="flex flex flex-col justify-center gap-1">
        <p className="font-medium">{hero.title}</p>
        {hero.subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {hero.subtitle}
          </p>
        )}
      </div>

      <div>
        <p className="text-xs text-muted-foreground">{hero.description}</p>
      </div>

      {/* Price & discount */}
      <div className="flex flex-col items-end">
        <span className="font-semibold">৳{hero.price}</span>
        {hero.discount && (
          <span className="text-xs text-red-500">{hero.discount}% off</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <EditButton id={hero.id} />
        <DeleteButton id={hero.id} onSuccess={refetch} />
      </div>
    </div>
  );
}
