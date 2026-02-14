import { Card } from "@/components/ui/card";
import { Review } from "@/types/review";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface ReviewCartProps {
  review: Review;
  refetch?: () => void;
}

export function ReviewCard({ review, refetch }: ReviewCartProps) {
  return (
    <Card className="flex items-center border-b px-4 py-3 hover:bg-muted/50">
      <div className="w-full flex items-center justify-between">
        {/* Name */}
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{review.name}</p>
          <p className="text-sm text-muted-foreground">{review.title}</p>
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
