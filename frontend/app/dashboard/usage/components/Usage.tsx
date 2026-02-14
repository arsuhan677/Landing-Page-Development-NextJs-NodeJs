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

    <Card className="flex items-center border-b px-4 py-3 hover:bg-muted/50">
          <div className="w-full flex items-center justify-between">
            {/* Name */}
            <div className="flex flex-col">
              <p className="font-semibold text-lg">{usage.title}</p>
            </div>
    
            {/* Description */}
            <div className="flex justify-center">
              <p className="text-sm text-muted-foreground max-w-md">
                {usage.description}
              </p>
            </div>
    
            {/* Actions */}
            <div className="flex gap-3">
              <EditButton id={usage.id} />
              <DeleteButton id={usage.id} onSuccess={refetch} />
            </div>
          </div>
        </Card>
  )
}
