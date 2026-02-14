import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Ingredient } from "@/types/ingredient";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface IngredientProps {
  ingredient: Ingredient;
  refetch?: () => void;
}

export default function IngredientPage({
  ingredient,
  refetch,
}: IngredientProps) {
  return (
    <Card className="flex items-center border-b px-4 py-3 hover:bg-muted/50">
      <div className="w-full flex items-center justify-between">
        {/* Name */}
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{ingredient.title}</p>
        </div>

        {/* Description */}
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground max-w-md">
            {ingredient.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <EditButton id={ingredient.id} />
          <DeleteButton id={ingredient.id} onSuccess={refetch} />
        </div>
      </div>
    </Card>
  );
}
