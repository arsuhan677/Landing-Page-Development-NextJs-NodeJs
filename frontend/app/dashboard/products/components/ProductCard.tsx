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

import EditButton from "@/app/dashboard/products/components/EditButton"
import DeleteButton from "@/app/dashboard/products/components/DeleteButton"

import { Product } from "@/types/types"

interface ProductCardProps {
  product: Product;
  refetch?: () => void;
}

export function ProductCard({ product, refetch }: ProductCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={product.image}
        alt={product.name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{product.name}</Badge>
        </CardAction>

        <CardTitle>{product.description}</CardTitle>
        <p>{product.stock}</p>

        <CardDescription>
          Price: ৳{product.price}
          {product.discount && (
            <span className="text-red-500 ml-2">Discount: {product.discount}%</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <EditButton id={product.id} />
        <DeleteButton id={product.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}
