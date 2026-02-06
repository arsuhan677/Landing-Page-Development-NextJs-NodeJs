import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EditButton from "@/app/dashboard/products/components/EditButton";
import DeleteButton from "@/app/dashboard/products/components/DeleteButton";

import { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
  refetch?: () => void;
}

export function ProductCard({ product, refetch }: ProductCardProps) {
  return (
    <div className="flex items-center gap-4 border-b px-4 py-3 hover:bg-muted/50">
      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 rounded-md object-cover"
      />

      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>
      </div>

      <Badge variant={product.stock ? "default" : "destructive"}>
        {product.stock ? "In Stock" : "Out of Stock"}
      </Badge>

      <div className="w-28 text-right">
        <p className="font-semibold">৳{product.price}</p>
        {product.discount && (
          <p className="text-xs text-red-500">{product.discount}% off</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <EditButton id={product.id} />
        <DeleteButton id={product.id} onSuccess={refetch} />
      </div>
    </div>
  );
}
