import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Ingredient } from "@/types/ingredient";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";


interface IngredientProps {
  ingredient: Ingredient;
  refetch?: () => void;
}

export default function IngredientPage({ ingredient, refetch }: IngredientProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      
      <div className="absolute inset-0 z-30 pointer-events-none" />
      <CardHeader>
        <CardAction>
        <CardTitle>{ingredient.title}</CardTitle>
        </CardAction>

      </CardHeader>
          <Badge variant="secondary">{ingredient.description}</Badge>

      <CardFooter className="flex gap-2">
        <EditButton id={ingredient.id} />
        <DeleteButton id={ingredient.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}

