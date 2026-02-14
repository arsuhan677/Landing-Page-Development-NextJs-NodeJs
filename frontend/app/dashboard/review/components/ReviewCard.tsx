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
import { Review } from "@/types/review";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface ReviewCartProps {
  review: Review;
  refetch?: () => void;
}

export function ReviewCard({ review, refetch }: ReviewCartProps) {
  return (
    <Card className="flex items-center gap-4 border-b px-4 py-3 hover:bg-muted/50 border">

      <div className="w-full flex items-center justify-between">
        {/* Name */}
      <div className="flex flex-col">
        <p className="font-semibold text-lg">{review.name}</p>
        <p className="text-sm text-muted-foreground">
          {review.title}
        </p>
      </div>

      {/* Description */}
      <div className="flex justify-center">
        <p className="text-sm text-muted-foreground max-w-md">
          {review.description}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 font-medium">
        <span>{review.rating}</span>
        <span>⭐</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <EditButton id={review.id} />
        <DeleteButton id={review.id} onSuccess={refetch} />
      </div>
      </div>

    </Card>
  );
}




// export function ProductCard({ product, refetch }: ProductCardProps) {
//   return (
//     <div className="flex items-center gap-4 border-b px-4 py-3 hover:bg-muted/50">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="h-12 w-12 rounded-md object-cover"
//       />

//       <div className="flex-1">
//         <p className="font-medium">{product.name}</p>
//         <p className="text-sm text-muted-foreground line-clamp-1">
//           {product.description}
//         </p>
//       </div>

//       <Badge variant={product.stock ? "default" : "destructive"}>
//         {product.stock ? "In Stock" : "Out of Stock"}
//       </Badge>

//       <div className="w-28 text-right">
//         <p className="font-semibold">৳{product.price}</p>
//         {product.discount && (
//           <p className="text-xs text-red-500">{product.discount}% off</p>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <EditButton id={product.id} />
//         <DeleteButton id={product.id} onSuccess={refetch} />
//       </div>
//     </div>
//   );
// }
