import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Hero } from "@/types/hero"
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";


interface HeroTitleProps {
  hero: Hero;
  refetch?: () => void;
}

export default function HeroTitle({ hero, refetch }: HeroTitleProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={hero.image}
        alt={hero.title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{hero.title}</Badge>
          <Badge variant="secondary">{hero.subtitle}</Badge>
        </CardAction>

        <CardTitle>{hero.description}</CardTitle>

        <CardDescription>
          Price: ৳{hero.price}
          {hero.discount && (
            <span className="text-red-500 ml-2">Discount: {hero.discount}%</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <EditButton id={hero.id} />
        <DeleteButton id={hero.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}
