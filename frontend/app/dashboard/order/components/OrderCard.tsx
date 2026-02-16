import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import DeleteButton from "./DeleteButton";

interface OrderCardProps {
  order: Order;
  refetch?: () => void;
}

export function OrderCard({ order, refetch }: OrderCardProps) {
  return (
    <div className="flex items-center gap-4 border shadow-sm container mx-auto px-4 rounded-sm py-3">
      <div className="flex-1">
        <p className="font-medium">{order.name}</p>
        <p className="text-sm text-muted-foreground">
          {order.address}, {order.district}
        </p>
        <p className="text-sm">📱 {order.mobile}</p>
      </div>

      <Badge>{order.status}</Badge>

      <div className="w-28 text-right">
        <p className="font-semibold">৳{order.total}</p>
        <p className="text-xs">Qty: {order.quantity}</p>
      </div>

      {/* Actions */}
            <div className="flex gap-2">
              <DeleteButton id={order.id} onSuccess={refetch} />
            </div>
    </div>
  );
}
