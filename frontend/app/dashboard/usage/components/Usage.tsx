import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Usage } from "@/types/usage";


interface UsageProps {
  usage: Usage;
  refetch?: () => void;
}

export default function UsagePage({ usage, refetch }: UsageProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      
      <div className="absolute inset-0 z-30 pointer-events-none"/>
      <CardHeader>
        <CardAction>
        <CardTitle>{usage.title}</CardTitle>
        </CardAction>

      </CardHeader>
          <Badge variant="secondary">{usage.description}</Badge>

      <CardFooter className="flex gap-2">
        <EditButton id={usage.id} />
        <DeleteButton id={usage.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}
