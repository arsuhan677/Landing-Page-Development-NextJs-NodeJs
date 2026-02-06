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
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      <div className="absolute inset-0 z-30 pointer-events-none" />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{review.name}</Badge>
        </CardAction>

        <CardTitle>{review.title}</CardTitle>

        <CardDescription>
          {review.description}
        </CardDescription>
        <CardDescription>
          {review.rating}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <EditButton id={review.id} />
        <DeleteButton id={review.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  );
}
